import fs from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline';
import { DatabaseSync } from 'node:sqlite';
import JSZip from 'jszip';

const SOURCE_DIRECTORY = path.resolve(process.cwd(), 'data', 'locations', 'source');
const ARCHIVE_PATH = path.join(SOURCE_DIRECTORY, 'geonames-allCountries.zip');
const COUNTRY_INFO_PATH = path.join(SOURCE_DIRECTORY, 'geonames-countryInfo.txt');
const REQUIRED_SOURCE_PATHS = [
  ARCHIVE_PATH,
  COUNTRY_INFO_PATH,
  path.join(SOURCE_DIRECTORY, 'geonames-admin1CodesASCII.txt'),
  path.join(SOURCE_DIRECTORY, 'geonames-admin2Codes.txt'),
];
const OUTPUT_PATH = path.resolve(
  process.cwd(),
  'data',
  'location-seo',
  'geography',
  'world-geographic-index.sqlite',
);
const TEMP_OUTPUT_PATH = `${OUTPUT_PATH}.tmp`;
const SOURCE_URL = 'https://download.geonames.org/export/dump/';
const ACTIVE_PLACE_CODES = new Set([
  'PPL',
  'PPLA',
  'PPLA2',
  'PPLA3',
  'PPLA4',
  'PPLC',
  'PPLG',
  'PPLL',
  'PPLR',
  'PPLS',
  'PPLX',
]);

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseCountryInfo() {
  const countries = new Map();
  const text = fs.readFileSync(COUNTRY_INFO_PATH, 'utf8');
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue;
    const fields = line.split('\t');
    const code = fields[0];
    if (!/^[A-Z]{2}$/.test(code) || !fields[4]) continue;
    countries.set(code, {
      code,
      name: fields[4],
      geonameId: fields[16] ? `geoname:${fields[16]}` : `country:${code}`,
    });
  }
  return countries;
}

function openArchiveEntry(archiveEntry, onLine, label) {
  return new Promise((resolve, reject) => {
    const lines = createInterface({
      input: archiveEntry.nodeStream(),
      crlfDelay: Infinity,
    });
    let count = 0;
    lines.on('line', (line) => {
      count += 1;
      if (line) onLine(line);
      if (count % 1000000 === 0) {
        console.log(`${label}: ${count.toLocaleString()} lines`);
      }
    });
    lines.on('close', () => resolve(count));
    lines.on('error', reject);
  });
}

function recordType(featureCode) {
  if (featureCode === 'ADM1') return 'state';
  if (featureCode === 'ADM2') return 'district';
  if (featureCode === 'PPLX') return 'neighborhood';
  if (featureCode === 'PPLL') return 'locality';
  if (featureCode === 'PPL4') return 'village';
  if (featureCode === 'PPL3') return 'town';
  return 'city';
}

function getArchiveRow(line) {
  const fields = line.split('\t');
  return {
    geonameId: fields[0],
    name: fields[1],
    asciiName: fields[2],
    latitude: Number(fields[4]),
    longitude: Number(fields[5]),
    featureClass: fields[6],
    featureCode: fields[7],
    countryCode: fields[8],
    admin1Code: fields[10],
    admin2Code: fields[11],
    population: Number(fields[14]) || 0,
    timezone: fields[17] || null,
  };
}

async function build() {
  for (const sourcePath of REQUIRED_SOURCE_PATHS) {
    if (!fs.existsSync(sourcePath)) {
      throw new Error(
        `Required GeoNames input is missing: ${sourcePath}. Run "npm run provision:world-geography-sources" first.`,
      );
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  if (fs.existsSync(TEMP_OUTPUT_PATH)) fs.rmSync(TEMP_OUTPUT_PATH);
  const archive = await JSZip.loadAsync(fs.readFileSync(ARCHIVE_PATH), {
    checkCRC32: false,
  });
  const archiveEntry = Object.values(archive.files)
    .find(({ name, dir }) => !dir && /(?:^|\/)allCountries\.txt$/.test(name));
  if (!archiveEntry) throw new Error('GeoNames archive does not contain allCountries.txt.');

  const countries = parseCountryInfo();
  const admin1Ids = new Map();
  const admin2Ids = new Map();
  const database = new DatabaseSync(TEMP_OUTPUT_PATH);
  database.exec(`
    PRAGMA journal_mode = OFF;
    PRAGMA synchronous = OFF;
    PRAGMA temp_store = MEMORY;
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
      is_slug INTEGER NOT NULL
    );
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
  `);

  const insertLocation = database.prepare(`
    INSERT OR REPLACE INTO locations
    (id, slug, name, canonical_name, aliases_json, type, parent_id, country,
     country_code, latitude, longitude, timezone, feature_code, population,
     source, source_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertRouteName = database.prepare(
    'INSERT INTO route_names (route_slug, location_id, is_slug) VALUES (?, ?, ?)',
  );
  const insertAirport = database.prepare(`
    INSERT OR REPLACE INTO aviation_places
    (id, name, country_code, latitude, longitude, source_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const inTransaction = (insertRows) => (rows) => {
    database.exec('BEGIN');
    try {
      insertRows(rows);
      database.exec('COMMIT');
    } catch (error) {
      database.exec('ROLLBACK');
      throw error;
    }
  };
  const insertLocationTransaction = inTransaction((rows) => {
    for (const row of rows) insertLocation.run(...row);
  });
  const insertRouteTransaction = inTransaction((rows) => {
    for (const row of rows) insertRouteName.run(...row);
  });
  const insertAirportTransaction = inTransaction((rows) => {
    for (const row of rows) insertAirport.run(...row);
  });

  const sourceRow = (row, type, parentId, country) => {
    const id = `geoname:${row.geonameId}`;
    const name = row.name.trim();
    const asciiName = row.asciiName.trim() || name;
    const slug = slugify(asciiName);
    const aliases = [...new Set([name, asciiName].filter((alias) => alias !== name))];
    const sourceUrl = `https://www.geonames.org/${row.geonameId}/`;
    return {
      id,
      slug,
      name,
      aliases,
      sourceUrl,
      location: [
        id,
        slug,
        name,
        name,
        JSON.stringify(aliases),
        type,
        parentId,
        country.name,
        country.code,
        Number.isFinite(row.latitude) ? row.latitude : null,
        Number.isFinite(row.longitude) ? row.longitude : null,
        row.timezone,
        row.featureCode,
        row.population,
        'GeoNames',
        sourceUrl,
        'sourced',
      ],
    };
  };

  const initialRows = [];
  const initialRouteRows = [];
  for (const country of countries.values()) {
    const name = country.name;
    const slug = slugify(name);
    const sourceUrl = `https://www.geonames.org/${country.geonameId.replace('geoname:', '')}/`;
    initialRows.push([
      country.geonameId,
      slug,
      name,
      name,
      '[]',
      'country',
      null,
      name,
      country.code,
      null,
      null,
      null,
      'PCLI',
      0,
      'GeoNames',
      sourceUrl,
      'sourced',
    ]);
    initialRouteRows.push([slug, country.geonameId, 1]);
  }
  insertLocationTransaction(initialRows);
  insertRouteTransaction(initialRouteRows);

  await openArchiveEntry(archiveEntry, (line) => {
    const row = getArchiveRow(line);
    if (row.featureClass !== 'A'
      || !['ADM1', 'ADM2'].includes(row.featureCode)
      || !row.countryCode
      || !row.geonameId) return;
    const code = row.featureCode === 'ADM1'
      ? `${row.countryCode}.${row.admin1Code}`
      : `${row.countryCode}.${row.admin1Code}.${row.admin2Code}`;
    if (row.featureCode === 'ADM1') admin1Ids.set(code, row.geonameId);
    else admin2Ids.set(code, row.geonameId);
  }, 'Indexing administrative parents');

  const locationBatch = [];
  const routeBatch = [];
  const airportBatch = [];
  let locationCount = initialRows.length;
  let airportCount = 0;
  const flush = () => {
    if (locationBatch.length) {
      const rows = locationBatch.splice(0);
      insertLocationTransaction(rows);
      locationCount += rows.length;
    }
    if (routeBatch.length) insertRouteTransaction(routeBatch.splice(0));
    if (airportBatch.length) {
      const rows = airportBatch.splice(0);
      insertAirportTransaction(rows);
      airportCount += rows.length;
    }
  };

  await openArchiveEntry(archiveEntry, (line) => {
    const row = getArchiveRow(line);
    if (!row.geonameId || !row.countryCode) return;
    const country = countries.get(row.countryCode);
    if (!country) return;
    if (row.featureClass === 'S' && row.featureCode === 'AIRP'
      && Number.isFinite(row.latitude) && Number.isFinite(row.longitude)
      && row.name) {
      airportBatch.push([
        `geoname:${row.geonameId}`,
        row.name,
        row.countryCode,
        row.latitude,
        row.longitude,
        `https://www.geonames.org/${row.geonameId}/`,
      ]);
      if (airportBatch.length >= 1000) flush();
      return;
    }

    const isAdmin = row.featureClass === 'A'
      && ['ADM1', 'ADM2'].includes(row.featureCode);
    const isActivePlace = row.featureClass === 'P'
      && ACTIVE_PLACE_CODES.has(row.featureCode);
    if (!isAdmin && !isActivePlace) return;

    let parentId = country.geonameId;
    if (row.featureCode === 'ADM2') {
      const admin1Id = admin1Ids.get(`${row.countryCode}.${row.admin1Code}`);
      if (admin1Id) parentId = `geoname:${admin1Id}`;
    } else if (isActivePlace) {
      const admin2Id = admin2Ids.get(
        `${row.countryCode}.${row.admin1Code}.${row.admin2Code}`,
      );
      const admin1Id = admin1Ids.get(`${row.countryCode}.${row.admin1Code}`);
      if (admin2Id) parentId = `geoname:${admin2Id}`;
      else if (admin1Id) parentId = `geoname:${admin1Id}`;
    }
    const record = sourceRow(
      row,
      isAdmin ? recordType(row.featureCode) : recordType(row.featureCode),
      parentId,
      country,
    );
    locationBatch.push(record.location);
    for (const alias of [record.name, ...record.aliases]) {
      const routeSlug = slugify(alias);
      if (routeSlug) routeBatch.push([routeSlug, record.id, routeSlug === record.slug ? 1 : 0]);
    }
    if (locationBatch.length >= 1000 || routeBatch.length >= 1000) flush();
  }, 'Building worldwide place index');
  flush();

  database.exec(`
    CREATE INDEX route_names_slug_idx ON route_names (route_slug);
    CREATE INDEX route_names_location_idx ON route_names (location_id);
    CREATE INDEX locations_parent_idx ON locations (parent_id);
    CREATE INDEX locations_country_idx ON locations (country_code, type);
    CREATE INDEX aviation_places_country_lat_idx
      ON aviation_places (country_code, latitude, longitude);
  `);
  database.prepare(`
    INSERT INTO registry_metadata
    (id, source, source_url, record_count, airport_count)
    VALUES (1, ?, ?, ?, ?)
  `).run('GeoNames', SOURCE_URL, locationCount, airportCount);
  database.close();
  fs.renameSync(TEMP_OUTPUT_PATH, OUTPUT_PATH);
  console.log(
    `Built ${locationCount.toLocaleString()} global geographic records and ${airportCount.toLocaleString()} airport references.`,
  );
  console.log(`Index: ${OUTPUT_PATH}`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
