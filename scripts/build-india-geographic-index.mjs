import fs from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';
import { createGunzip, gzipSync } from 'node:zlib';
import { createInterface } from 'node:readline';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(
  root,
  'data',
  'location-seo',
  'geography',
  'india-geography.json.gz',
);
const outputPath = path.join(
  root,
  'data',
  'location-seo',
  'geography',
  'india-geographic-index.sqlite',
);
const shardDirectory = path.join(
  root,
  'data',
  'location-seo',
  'geography',
  'india-geographic-index',
);
const temporaryShardDirectory = `${shardDirectory}.tmp`;
const temporaryPath = `${outputPath}.tmp`;
const cachePath = path.join(shardDirectory, '.build.json');
const temporaryCachePath = path.join(temporaryShardDirectory, '.build.json');
const RECORDS_PER_BLOCK = 5000;
const BUILD_FORMAT_VERSION = 1;
const PROGRESS_INTERVAL = 50000;
const fields = [
  'id',
  'slug',
  'name',
  'canonicalName',
  'aliases',
  'type',
  'parentId',
  'country',
  'countryCode',
  'postalCodes',
  'latitude',
  'longitude',
  'timezone',
  'source',
  'sourceUrl',
  'sourceDate',
  'sourceAttribution',
  'confidence',
  'allowAmbiguousAliases',
  'status',
  'adminCode',
  'relationship',
  'resolutionStatus',
  'renderable',
  'indexable',
  'sitemapEligible',
  'geonameId',
  'state',
  'district',
  'postalCodeAmbiguous',
  'sourceAccuracy',
  'safetyStatus',
];

function normalize(value) {
  return typeof value === 'string'
    ? value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    : '';
}

function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function createDatabase() {
  const database = new DatabaseSync(temporaryPath);
  database.exec(`
    PRAGMA journal_mode = OFF;
    PRAGMA synchronous = OFF;
    PRAGMA temp_store = MEMORY;
    CREATE TABLE registry_metadata (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      record_count INTEGER NOT NULL,
      source_metadata_json TEXT NOT NULL
    );
    CREATE TABLE source_bundles (
      id INTEGER PRIMARY KEY,
      links_json TEXT NOT NULL
    );
    CREATE TABLE locations (
      id TEXT PRIMARY KEY,
      block_id INTEGER NOT NULL,
      row_index INTEGER NOT NULL
    ) WITHOUT ROWID;
    CREATE TABLE route_names (
      route_slug TEXT NOT NULL,
      location_id TEXT NOT NULL,
      is_slug INTEGER NOT NULL,
      PRIMARY KEY (route_slug, location_id)
    ) WITHOUT ROWID;
  `);
  return database;
}

async function hashFile(filePath) {
  const hash = createHash('sha256');
  for await (const chunk of fs.createReadStream(filePath)) {
    hash.update(chunk);
  }
  return hash.digest('hex');
}

function reusableBuild(sourceSha256) {
  if (!fs.existsSync(cachePath)) return null;

  let cache;
  try {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    console.warn(`Ignoring invalid geographic-index cache manifest: ${error.message}`);
    return null;
  }

  if (!cache || typeof cache !== 'object' || Array.isArray(cache)) {
    console.warn('Ignoring geographic-index cache manifest with an invalid shape.');
    return null;
  }

  if (
    cache.formatVersion !== BUILD_FORMAT_VERSION
    || cache.sourceSha256 !== sourceSha256
    || !Number.isInteger(cache.records)
    || !Number.isInteger(cache.blocks)
    || !Array.isArray(cache.blockFiles)
    || !Number.isInteger(cache.indexSizeBytes)
    || !fs.existsSync(outputPath)
    || !fs.existsSync(shardDirectory)
  ) {
    return null;
  }

  if (fs.statSync(outputPath).size !== cache.indexSizeBytes) return null;
  const expectedNames = Array.from(
    { length: cache.blocks },
    (_, index) => `block-${String(index).padStart(4, '0')}.json.gz`,
  );
  const actualNames = fs.readdirSync(shardDirectory)
    .filter((name) => name !== '.build.json')
    .sort();
  if (
    actualNames.length !== expectedNames.length
    || expectedNames.some((name, index) => actualNames[index] !== name)
    || cache.blockFiles.length !== expectedNames.length
  ) {
    return null;
  }
  for (let index = 0; index < expectedNames.length; index += 1) {
    const file = cache.blockFiles[index];
    if (
      !file
      || file.name !== expectedNames[index]
      || !Number.isInteger(file.sizeBytes)
      || fs.statSync(path.join(shardDirectory, file.name)).size !== file.sizeBytes
    ) {
      return null;
    }
  }

  let database;
  try {
    database = new DatabaseSync(outputPath, { readOnly: true });
    const { recordCount } = database.prepare(
      'SELECT record_count AS recordCount FROM registry_metadata WHERE id = 1',
    ).get() || {};
    if (recordCount !== cache.records) return null;
  } catch (error) {
    console.warn(`Cannot validate existing geographic index; rebuilding: ${error.message}`);
    return null;
  } finally {
    if (database) database.close();
  }

  return cache;
}

async function main() {
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`India geography registry not found: ${sourcePath}`);
  }
  const sourceSha256 = await hashFile(sourcePath);
  const cachedBuild = reusableBuild(sourceSha256);
  if (cachedBuild) {
    console.log(JSON.stringify({
      outputPath: path.relative(root, outputPath),
      records: cachedBuild.records,
      blocks: cachedBuild.blocks,
      cache: 'up-to-date',
      totalBytes: cachedBuild.indexSizeBytes
        + cachedBuild.blockFiles.reduce((total, file) => total + file.sizeBytes, 0),
    }, null, 2));
    return;
  }

  console.log('Building the India geographic index from the current registry...');
  fs.rmSync(temporaryPath, { force: true });
  fs.rmSync(temporaryCachePath, { force: true });
  fs.rmSync(temporaryShardDirectory, { recursive: true, force: true });
  fs.mkdirSync(temporaryShardDirectory, { recursive: true });
  const database = createDatabase();
  const sourceBundles = new Map();
  let blockRows = [];
  let blockCount = 0;
  const flushBlock = () => {
    if (!blockRows.length) return;
    const blockPath = path.join(
      temporaryShardDirectory,
      `block-${String(blockCount).padStart(4, '0')}.json.gz`,
    );
    fs.writeFileSync(blockPath, gzipSync(blockRows.join('\n')));
    blockRows = [];
    blockCount += 1;
  };
  const insertLocation = database.prepare(`
    INSERT INTO locations (id, block_id, row_index)
    VALUES (?, ?, ?)
  `);
  const insertRouteName = database.prepare(`
    INSERT INTO route_names (route_slug, location_id, is_slug)
    VALUES (?, ?, ?)
    ON CONFLICT (route_slug, location_id)
    DO UPDATE SET is_slug = MAX(is_slug, excluded.is_slug)
  `);
  const insertSourceBundle = database.prepare(`
    INSERT INTO source_bundles (links_json) VALUES (?)
  `);

  let metadata = null;
  let recordCount = 0;
  const input = fs.createReadStream(sourcePath).pipe(createGunzip());
  const lines = createInterface({ input, crlfDelay: Infinity });
  database.exec('BEGIN');
  try {
    for await (const line of lines) {
      if (!line) continue;
      const record = JSON.parse(line);
      if (!metadata) {
        metadata = record;
        continue;
      }

      const linksJson = JSON.stringify(record.sourceLinks || []);
      let sourceBundleId = sourceBundles.get(linksJson);
      if (!sourceBundleId) {
        const result = insertSourceBundle.run(linksJson);
        sourceBundleId = Number(result.lastInsertRowid);
        sourceBundles.set(linksJson, sourceBundleId);
      }

      const rowIndex = blockRows.length;
      const recordData = fields.map((field) => record[field] ?? null);
      insertLocation.run(String(record.id), blockCount, rowIndex);
      blockRows.push(JSON.stringify([recordData, sourceBundleId]));

      const names = new Set([
        record.slug,
        record.canonicalName,
        record.name,
        ...(Array.isArray(record.aliases) ? record.aliases : []),
      ].map(slugify).filter(Boolean));
      const recordSlug = slugify(record.slug);
      for (const routeSlug of names) {
        insertRouteName.run(routeSlug, String(record.id), Number(routeSlug === recordSlug));
      }
      recordCount += 1;
      if (blockRows.length >= RECORDS_PER_BLOCK) flushBlock();
      if (recordCount % PROGRESS_INTERVAL === 0) {
        console.log(`Indexed ${recordCount.toLocaleString()} records...`);
      }
    }

    if (!metadata) throw new Error('The India geography registry has no metadata record.');
    flushBlock();
    if (recordCount !== metadata.recordCount) {
      throw new Error(
        `Indexed ${recordCount} records, but registry metadata declares ${metadata.recordCount}.`,
      );
    }
    database.prepare(`
      INSERT INTO registry_metadata (id, record_count, source_metadata_json)
      VALUES (1, ?, ?)
    `).run(recordCount, JSON.stringify(metadata));
    database.exec('COMMIT');
  } catch (error) {
    database.exec('ROLLBACK');
    throw error;
  } finally {
    database.close();
  }

  if (await hashFile(sourcePath) !== sourceSha256) {
    throw new Error('India geography registry changed while the index was being built.');
  }

  const indexSize = fs.statSync(temporaryPath).size;
  const blockFiles = fs.readdirSync(temporaryShardDirectory).sort().map((name) => ({
    name,
    sizeBytes: fs.statSync(path.join(temporaryShardDirectory, name)).size,
  }));
  const blockSize = blockFiles.reduce((total, file) => total + file.sizeBytes, 0);
  fs.writeFileSync(temporaryCachePath, JSON.stringify({
    formatVersion: BUILD_FORMAT_VERSION,
    sourceSha256,
    records: recordCount,
    blocks: blockCount,
    indexSizeBytes: indexSize,
    blockFiles,
  }));

  fs.rmSync(outputPath, { force: true });
  fs.renameSync(temporaryPath, outputPath);
  fs.rmSync(shardDirectory, { recursive: true, force: true });
  fs.renameSync(temporaryShardDirectory, shardDirectory);
  console.log(JSON.stringify({
    outputPath: path.relative(root, outputPath),
    records: recordCount,
    blocks: blockCount,
    sourceBundles: sourceBundles.size,
    cache: 'rebuilt',
    indexSizeBytes: indexSize,
    compressedRecordBlocksBytes: blockSize,
    totalBytes: indexSize + blockSize,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
