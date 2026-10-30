import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { gunzipSync } from 'node:zlib';
import { GLOBAL_GEOGRAPHIC_PILOT } from '../data/location-seo/geography/global-pilot.js';
import { INDEXABLE_ROBOTS_DIRECTIVE } from '../data/location-seo/geographic-indexability-policy.js';
import { getExplicitNoindexProductionRoutes } from '../data/location-seo/production-route-approvals.js';
import { readWorldwidePublicationInventory } from '../lib/worldwidePublicationInventory.js';

const ROOT = process.cwd();
const GEOGRAPHY_DIR = path.join(ROOT, 'data', 'location-seo', 'geography');
const ROUTE_CACHE_PATH = path.join(GEOGRAPHY_DIR, 'approved-geographic-sitemap-routes.json');
const WORLD_SOURCE_PATH = path.join(GEOGRAPHY_DIR, 'world-geographic-index.sqlite');
const WORLD_OUTPUT_PATH = path.join(GEOGRAPHY_DIR, 'world-geographic-runtime-index.sqlite');
const INDIA_SOURCE_PATH = path.join(GEOGRAPHY_DIR, 'india-geographic-index.sqlite');
const INDIA_BLOCKS_DIR = path.join(GEOGRAPHY_DIR, 'india-geographic-index');
const INDIA_OUTPUT_PATH = path.join(GEOGRAPHY_DIR, 'india-geographic-runtime-index.sqlite');
const INDIA_RECORD_FIELDS = [
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
const PILOT_RECORDS_BY_ID = new Map(
  GLOBAL_GEOGRAPHIC_PILOT.records.map((record) => [record.id, record]),
);

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
const WORLD_LOCATION_COLUMNS = [
  'id',
  'slug',
  'name',
  'canonical_name',
  'aliases_json',
  'type',
  'parent_id',
  'country',
  'country_code',
  'latitude',
  'longitude',
  'timezone',
  'feature_code',
  'population',
  'source',
  'source_url',
  'status',
];
const WORLD_TABLES = `
  CREATE TABLE locations (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL,
    name TEXT NOT NULL,
    canonical_name TEXT NOT NULL,
    aliases_json TEXT NOT NULL,
    type TEXT NOT NULL,
    parent_id TEXT,
    country TEXT NOT NULL,
    country_code TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    timezone TEXT,
    feature_code TEXT NOT NULL,
    population INTEGER NOT NULL,
    source TEXT NOT NULL,
    source_url TEXT NOT NULL,
    status TEXT NOT NULL
  );
  CREATE TABLE route_names (
    route_slug TEXT NOT NULL,
    location_id TEXT NOT NULL,
    is_slug INTEGER NOT NULL,
    PRIMARY KEY (route_slug, location_id)
  ) WITHOUT ROWID;
  CREATE TABLE aviation_places (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    country_code TEXT NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    source_url TEXT NOT NULL
  );
  CREATE TABLE registry_metadata (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    source TEXT NOT NULL,
    source_url TEXT NOT NULL,
    record_count INTEGER NOT NULL,
    airport_count INTEGER NOT NULL
  );
  CREATE TABLE runtime_metadata (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    source_fingerprint TEXT NOT NULL,
    published_route_count INTEGER NOT NULL,
    location_count INTEGER NOT NULL,
    airport_count INTEGER NOT NULL
  );
`;

function assertRouteCache(cache, fingerprint, registry) {
  if (!cache
    || cache.version !== 3
    || cache.sourceFingerprint !== fingerprint
    || JSON.stringify(cache.registry) !== JSON.stringify(registry)
    || !Array.isArray(cache.approvedRoutes)) {
    throw new Error(
      'The approved geographic route cache is stale or malformed. '
      + 'Run "npm run generate:sitemap" before building runtime indexes.',
    );
  }
  for (const entry of cache.approvedRoutes) {
    const match = /^\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/.exec(entry.route || '');
    if (!match
      || entry.state !== 'INDEXABLE'
      || entry.qualityPassed !== true
      || entry.locationSlug !== match[1]
      || entry.serviceSlug !== match[2]
      || entry.canonicalPath !== entry.route
      || entry.canonicalUrl !== `https://weoneaviation.in${entry.route}`
      || entry.robots !== INDEXABLE_ROBOTS_DIRECTIVE
      || !['world-geographic-index', 'india', 'world-pilot'].includes(entry.registry)
      || (entry.registry !== 'world-pilot' && (!entry.recordId || !entry.countryCode))) {
      throw new Error(`Invalid published geographic route in cache: ${entry.route || '(missing)'}.`);
    }
  }
}

function createWorldIndex(sourceDatabase, cache, sourceFingerprint, temporaryPath) {
  const entries = cache.approvedRoutes.filter((entry) => (
    entry.registry === 'world-geographic-index'
  ));
  const sourceRecord = sourceDatabase.prepare(
    `SELECT ${WORLD_LOCATION_COLUMNS.join(', ')} FROM locations WHERE id = ?`,
  );
  const sourceParent = sourceDatabase.prepare('SELECT parent_id AS parentId FROM locations WHERE id = ?');
  const sourceRouteCandidates = sourceDatabase.prepare(`
    SELECT route_slug AS routeSlug, location_id AS locationId, is_slug AS isSlug
    FROM route_names
    WHERE route_slug = ?
  `);
  const records = new Map();
  const routeNames = new Map();
  const routeIds = new Map();

  function addRecordAndParents(id) {
    const visited = new Set();
    while (id && !records.has(id)) {
      if (visited.has(id)) throw new Error(`Worldwide location hierarchy has a cycle at "${id}".`);
      visited.add(id);
      const current = sourceRecord.get(id);
      if (!current) {
        throw new Error(`Worldwide location "${id}" has a missing parent record.`);
      }
      records.set(id, current);
      id = sourceParent.get(id)?.parentId || null;
    }
  }

  function matchesPilotRecord(entry) {
    const record = PILOT_RECORDS_BY_ID.get(entry.recordId);
    if (!record) return false;
    const names = [record.slug, record.canonicalName, record.name, ...(record.aliases || [])];
    return names.some((name) => slugify(name) === entry.locationSlug);
  }

  for (const entry of entries) {
    const slug = entry.locationSlug;
    const existingId = routeIds.get(slug);
    if (existingId && existingId !== entry.recordId) {
      throw new Error(`Published route slug "${slug}" has multiple registry identities.`);
    }
    routeIds.set(slug, entry.recordId);
    const candidates = sourceRouteCandidates.all(slug);
    const sourceRow = sourceRecord.get(entry.recordId);
    if (!sourceRow && !matchesPilotRecord(entry)) {
      throw new Error(`Published worldwide route "${entry.route}" has no registry identity.`);
    }
    if (sourceRow && !candidates.some(({ locationId }) => locationId === entry.recordId)) {
      throw new Error(`Published worldwide route "${entry.route}" has no matching GeoNames route name.`);
    }
    for (const candidate of candidates) {
      routeNames.set(`${candidate.routeSlug}\0${candidate.locationId}`, candidate);
      addRecordAndParents(candidate.locationId);
    }
  }

  const supportedCountries = [...new Set(
    entries.map(({ countryCode }) => countryCode).filter(Boolean),
  )].sort();
  const sourceAirports = sourceDatabase.prepare(
    `SELECT id, name, country_code AS countryCode, latitude, longitude, source_url AS sourceUrl
     FROM aviation_places
     WHERE country_code IN (${supportedCountries.map(() => '?').join(', ')})
     ORDER BY id`,
  );
  const airports = supportedCountries.length
    ? sourceAirports.all(...supportedCountries)
    : [];
  const metadata = sourceDatabase.prepare(`
    SELECT source, source_url AS sourceUrl,
      record_count AS recordCount, airport_count AS airportCount
    FROM registry_metadata
    WHERE id = 1
  `).get();
  if (!metadata) throw new Error('The full worldwide geographic index has no metadata.');

  fs.rmSync(temporaryPath, { force: true });
  const database = new DatabaseSync(temporaryPath);
  database.exec(`
    PRAGMA journal_mode = OFF;
    PRAGMA synchronous = OFF;
    PRAGMA temp_store = MEMORY;
    ${WORLD_TABLES}
    BEGIN;
  `);
  try {
    const insertLocation = database.prepare(
      `INSERT INTO locations (${WORLD_LOCATION_COLUMNS.join(', ')})
       VALUES (${WORLD_LOCATION_COLUMNS.map(() => '?').join(', ')})`,
    );
    for (const row of [...records.values()].sort((left, right) => left.id.localeCompare(right.id))) {
      insertLocation.run(...WORLD_LOCATION_COLUMNS.map((column) => row[column]));
    }
    const insertRoute = database.prepare(
      'INSERT INTO route_names (route_slug, location_id, is_slug) VALUES (?, ?, ?)',
    );
    for (const row of [...routeNames.values()].sort((left, right) => (
      left.routeSlug.localeCompare(right.routeSlug)
      || left.locationId.localeCompare(right.locationId)
    ))) {
      insertRoute.run(row.routeSlug, row.locationId, row.isSlug);
    }
    const insertAirport = database.prepare(`
      INSERT INTO aviation_places (id, name, country_code, latitude, longitude, source_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const airport of airports) {
      insertAirport.run(
        airport.id,
        airport.name,
        airport.countryCode,
        airport.latitude,
        airport.longitude,
        airport.sourceUrl,
      );
    }
    database.prepare(`
      INSERT INTO registry_metadata (id, source, source_url, record_count, airport_count)
      VALUES (1, ?, ?, ?, ?)
    `).run(metadata.source, metadata.sourceUrl, metadata.recordCount, metadata.airportCount);
    database.prepare(`
      INSERT INTO runtime_metadata
        (id, source_fingerprint, published_route_count, location_count, airport_count)
      VALUES (1, ?, ?, ?, ?)
    `).run(sourceFingerprint, routeIds.size, records.size, airports.length);
    database.exec('COMMIT;');
  } catch (error) {
    database.exec('ROLLBACK;');
    database.close();
    throw error;
  }
  database.exec(`
    CREATE INDEX aviation_places_country_lat_idx
      ON aviation_places (country_code, latitude, longitude);
    PRAGMA optimize;
  `);
  database.close();
  return { publishedRoutes: routeIds.size, locations: records.size, airports: airports.length };
}

function getIndiaRecord(id, database, blockCache) {
  const location = database.prepare(
    'SELECT block_id AS blockId, row_index AS rowIndex FROM locations WHERE id = ?',
  ).get(String(id));
  if (!location) return null;
  let rows = blockCache.get(location.blockId);
  if (!rows) {
    const blockPath = path.join(
      INDIA_BLOCKS_DIR,
      `block-${String(location.blockId).padStart(4, '0')}.json.gz`,
    );
    rows = gunzipSync(fs.readFileSync(blockPath)).toString('utf8').split('\n');
    blockCache.set(location.blockId, rows);
  }
  const encoded = rows[location.rowIndex];
  if (!encoded) throw new Error(`India geographic record "${id}" has no encoded block row.`);
  const [recordData, sourceBundleId] = JSON.parse(encoded);
  const bundle = database.prepare(
    'SELECT links_json AS linksJson FROM source_bundles WHERE id = ?',
  ).get(sourceBundleId);
  const record = Object.fromEntries(
    INDIA_RECORD_FIELDS.map((field, index) => [field, recordData[index]]),
  );
  record.sourceLinks = bundle ? JSON.parse(bundle.linksJson) : [];
  return { record, sourceBundleId };
}

function createIndiaIndex(sourceDatabase, cache, sourceFingerprint, temporaryPath) {
  const entries = cache.approvedRoutes.filter((entry) => (
    entry.registry === 'india' && entry.countryCode === 'IN'
  ));
  const blockCache = new Map();
  const records = new Map();
  const sourceBundleIds = new Set();
  const routeNames = new Map();
  const getRouteNames = sourceDatabase.prepare(`
    SELECT route_slug AS routeSlug, location_id AS locationId, is_slug AS isSlug
    FROM route_names
    WHERE location_id = ?
  `);
  const getCollisions = sourceDatabase.prepare(`
    SELECT route_slug AS routeSlug, location_id AS locationId, is_slug AS isSlug
    FROM route_names
    WHERE route_slug = ?
  `);
  const hasRecord = sourceDatabase.prepare('SELECT 1 FROM locations WHERE id = ?');

  function addRecord(id) {
    if (records.has(id)) return;
    const result = getIndiaRecord(id, sourceDatabase, blockCache);
    if (!result) {
      throw new Error(`Published India route refers to missing registry record "${id}".`);
    }
    records.set(id, result);
    sourceBundleIds.add(result.sourceBundleId);
    for (const row of getRouteNames.all(id)) {
      routeNames.set(`${row.routeSlug}\0${row.locationId}`, row);
    }
    if (result.record.parentId) addRecord(String(result.record.parentId));
  }

  const routeTargets = new Map();
  for (const entry of entries) {
    const routeSlug = entry.route.slice(1).split('/')[0];
    const existingId = routeTargets.get(routeSlug);
    if (existingId && existingId !== entry.recordId) {
      throw new Error(`Published India route slug "${routeSlug}" has multiple registry identities.`);
    }
    if (hasRecord.get(entry.recordId)) {
      routeTargets.set(routeSlug, entry.recordId);
      addRecord(entry.recordId);
    } else if (entry.approvalSource !== 'legacy-curated-approval') {
      throw new Error(`Published India route "${entry.route}" has no registry identity "${entry.recordId}".`);
    }
  }

  for (const routeSlug of routeTargets.keys()) {
    for (const collision of getCollisions.all(routeSlug)) {
      routeNames.set(`${collision.routeSlug}\0${collision.locationId}`, collision);
      addRecord(collision.locationId);
    }
  }

  for (const route of getExplicitNoindexProductionRoutes()) {
    const [, routeSlug, serviceSlug, extra] = route.split('/');
    if (extra || serviceSlug !== 'pilot-training') continue;
    for (const candidate of getCollisions.all(routeSlug)) {
      routeNames.set(`${candidate.routeSlug}\0${candidate.locationId}`, candidate);
      addRecord(candidate.locationId);
    }
  }

  const sourceMetadata = sourceDatabase.prepare(
    `SELECT record_count AS sourceRecordCount,
      source_metadata_json AS sourceMetadataJson
     FROM registry_metadata
     WHERE id = 1`,
  ).get();
  if (!sourceMetadata) throw new Error('The full India geographic index has no metadata.');

  fs.rmSync(temporaryPath, { force: true });
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
    CREATE TABLE record_blocks (
      block_id INTEGER PRIMARY KEY,
      rows_json TEXT NOT NULL
    );
    CREATE TABLE runtime_metadata (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      source_fingerprint TEXT NOT NULL,
      published_route_count INTEGER NOT NULL,
      record_count INTEGER NOT NULL
    );
    BEGIN;
  `);
  try {
    const orderedRecords = [...records.values()]
      .sort((left, right) => String(left.record.id).localeCompare(String(right.record.id)));
    const encodedRows = orderedRecords.map(({ record, sourceBundleId }) => [
      INDIA_RECORD_FIELDS.map((field) => record[field] ?? null),
      sourceBundleId,
    ]);
    database.prepare(
      'INSERT INTO record_blocks (block_id, rows_json) VALUES (0, ?)',
    ).run(encodedRows.map((row) => JSON.stringify(row)).join('\n'));

    const insertLocation = database.prepare(
      'INSERT INTO locations (id, block_id, row_index) VALUES (?, 0, ?)',
    );
    orderedRecords.forEach(({ record }, rowIndex) => {
      insertLocation.run(String(record.id), rowIndex);
    });
    const insertRoute = database.prepare(`
      INSERT INTO route_names (route_slug, location_id, is_slug)
      VALUES (?, ?, ?)
    `);
    for (const row of [...routeNames.values()].sort((left, right) => (
      left.routeSlug.localeCompare(right.routeSlug)
      || left.locationId.localeCompare(right.locationId)
    ))) {
      insertRoute.run(row.routeSlug, row.locationId, row.isSlug);
    }
    const getSourceBundle = sourceDatabase.prepare(
      'SELECT links_json AS linksJson FROM source_bundles WHERE id = ?',
    );
    const insertSourceBundle = database.prepare(
      'INSERT INTO source_bundles (id, links_json) VALUES (?, ?)',
    );
    for (const id of [...sourceBundleIds].sort((left, right) => left - right)) {
      const sourceBundle = getSourceBundle.get(id);
      if (!sourceBundle) throw new Error(`India source bundle "${id}" is missing.`);
      insertSourceBundle.run(id, sourceBundle.linksJson);
    }
    database.prepare(`
      INSERT INTO registry_metadata (id, record_count, source_metadata_json)
      VALUES (1, ?, ?)
    `).run(sourceMetadata.sourceRecordCount, sourceMetadata.sourceMetadataJson);
    database.prepare(`
      INSERT INTO runtime_metadata
        (id, source_fingerprint, published_route_count, record_count)
      VALUES (1, ?, ?, ?)
    `).run(sourceFingerprint, entries.length, records.size);
    database.exec('COMMIT;');
  } catch (error) {
    database.exec('ROLLBACK;');
    database.close();
    throw error;
  }
  database.exec('CREATE INDEX route_names_slug_idx ON route_names (route_slug); PRAGMA optimize;');
  database.close();
  return { publishedRoutes: entries.length, locations: routeTargets.size, records: records.size };
}

function main() {
  if (!fs.existsSync(ROUTE_CACHE_PATH)) {
    throw new Error('The approved geographic route cache is missing. Run "npm run generate:sitemap" first.');
  }
  const inventory = readWorldwidePublicationInventory();
  const fingerprint = inventory.sourceFingerprint;
  const { registry } = inventory;
  const cache = JSON.parse(fs.readFileSync(ROUTE_CACHE_PATH, 'utf8'));
  assertRouteCache(cache, fingerprint, registry);
  if (!fs.existsSync(WORLD_SOURCE_PATH) || !fs.existsSync(INDIA_SOURCE_PATH)) {
    throw new Error('Full India and worldwide indexes are required to create runtime indexes.');
  }

  const worldSource = new DatabaseSync(WORLD_SOURCE_PATH, { readOnly: true });
  const indiaSource = new DatabaseSync(INDIA_SOURCE_PATH, { readOnly: true });
  try {
    worldSource.exec('PRAGMA query_only = ON');
    indiaSource.exec('PRAGMA query_only = ON');
    const world = createWorldIndex(
      worldSource,
      cache,
      fingerprint,
      `${WORLD_OUTPUT_PATH}.tmp`,
    );
    const india = createIndiaIndex(
      indiaSource,
      cache,
      fingerprint,
      `${INDIA_OUTPUT_PATH}.tmp`,
    );
    fs.rmSync(WORLD_OUTPUT_PATH, { force: true });
    fs.renameSync(`${WORLD_OUTPUT_PATH}.tmp`, WORLD_OUTPUT_PATH);
    fs.rmSync(INDIA_OUTPUT_PATH, { force: true });
    fs.renameSync(`${INDIA_OUTPUT_PATH}.tmp`, INDIA_OUTPUT_PATH);
    console.log(JSON.stringify({
      sourceFingerprint: fingerprint,
      world,
      india,
      worldIndexBytes: fs.statSync(WORLD_OUTPUT_PATH).size,
      indiaIndexBytes: fs.statSync(INDIA_OUTPUT_PATH).size,
    }, null, 2));
  } finally {
    worldSource.close();
    indiaSource.close();
  }
}

main();
