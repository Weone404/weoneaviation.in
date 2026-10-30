import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createGunzip, gunzipSync } from 'node:zlib';
import { createInterface } from 'node:readline';

const INDIA_GEOGRAPHY_PATH = path.resolve(
  process.cwd(),
  'data',
  'location-seo',
  'geography',
  'india-geography.json.gz',
);
const INDIA_GEOGRAPHIC_INDEX_PATH = path.resolve(
  process.cwd(),
  'data',
  'location-seo',
  'geography',
  'india-geographic-index.sqlite',
);
const INDIA_GEOGRAPHIC_RUNTIME_INDEX_PATH = path.resolve(
  process.cwd(),
  'data',
  'location-seo',
  'geography',
  'india-geographic-runtime-index.sqlite',
);
const INDIA_GEOGRAPHIC_BLOCKS_PATH = path.resolve(
  process.cwd(),
  'data',
  'location-seo',
  'geography',
  'india-geographic-index',
);
let completeRegistryPromise;
let geographicIndex;
let runtimeGeographicIndex;
const recordBlockCache = new Map();
const MAX_CACHED_RECORD_BLOCKS = 4;

const RECORD_FIELDS = [
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

class GeographicHierarchyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GeographicHierarchyError';
    this.code = 'INVALID_GEOGRAPHIC_HIERARCHY';
  }
}

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

function resolveUnique(records, kind, value) {
  if (records.length > 1) {
    throw new Error(`Geographic ${kind} "${value}" is ambiguous.`);
  }
  return records[0] || null;
}

function getGeographicIndex(useRuntimeIndex = false) {
  const indexPath = useRuntimeIndex
    ? INDIA_GEOGRAPHIC_RUNTIME_INDEX_PATH
    : INDIA_GEOGRAPHIC_INDEX_PATH;
  const cachedIndex = useRuntimeIndex ? runtimeGeographicIndex : geographicIndex;
  if (cachedIndex) return cachedIndex;
  if (!fs.existsSync(indexPath)) {
    if (useRuntimeIndex) {
      throw new Error(
        'The approved India runtime index is missing. Run "npm run build:geographic-runtime-index" before serving dynamic location routes.',
      );
    }
    throw new Error(
      'The India geographic lookup index is missing. Run "npm run build:india-geographic-index" before serving dynamic location routes.',
    );
  }
  const database = new DatabaseSync(indexPath, { readOnly: true });
  database.exec('PRAGMA query_only = ON');
  const openedIndex = {
    database,
    runtime: useRuntimeIndex,
    getById: database.prepare(`
      SELECT block_id AS blockId, row_index AS rowIndex
      FROM locations
      WHERE id = ?
    `),
    getByRouteSlug: database.prepare(`
      SELECT n.location_id AS locationId, n.is_slug AS isSlug
      FROM route_names AS n
      WHERE n.route_slug = ?
    `),
    getSourceLinks: database.prepare(
      'SELECT links_json FROM source_bundles WHERE id = ?',
    ),
    getRecordCount: database.prepare(
      'SELECT record_count AS recordCount FROM registry_metadata WHERE id = 1',
    ),
    ...(useRuntimeIndex
      ? {
        getRecordBlock: database.prepare(
          'SELECT rows_json AS rowsJson FROM record_blocks WHERE block_id = ?',
        ),
      }
      : {}),
    getBlockPath(blockId) {
      return path.join(
        INDIA_GEOGRAPHIC_BLOCKS_PATH,
        `block-${String(blockId).padStart(4, '0')}.json.gz`,
      );
    },
  };
  if (useRuntimeIndex) runtimeGeographicIndex = openedIndex;
  else geographicIndex = openedIndex;
  return openedIndex;
}

const ROUTE_TYPE_PRIORITY = [
  'neighborhood',
  'locality',
  'city',
  'town',
  'village',
  'populated-place',
  'subdistrict',
  'district',
  'state',
  'postal-area',
  'country',
];

function getBlockRows(blockId, index) {
  const cacheKey = `${index.runtime ? 'runtime' : 'full'}:${blockId}`;
  if (recordBlockCache.has(cacheKey)) {
    const cachedRows = recordBlockCache.get(cacheKey);
    recordBlockCache.delete(cacheKey);
    recordBlockCache.set(cacheKey, cachedRows);
    return cachedRows;
  }

  const rows = index.runtime
    ? index.getRecordBlock.get(blockId)?.rowsJson.split('\n')
    : gunzipSync(fs.readFileSync(index.getBlockPath(blockId))).toString('utf8').split('\n');
  if (!rows) throw new Error(`India geographic record block "${blockId}" is missing.`);
  recordBlockCache.set(cacheKey, rows);
  if (recordBlockCache.size > MAX_CACHED_RECORD_BLOCKS) {
    recordBlockCache.delete(recordBlockCache.keys().next().value);
  }
  return rows;
}

function recordFromRow(row, index) {
  if (!row) return null;
  const rows = getBlockRows(row.blockId, index);
  const recordData = JSON.parse(rows[row.rowIndex]);
  const record = Object.fromEntries(
    RECORD_FIELDS.map((field, fieldIndex) => [field, recordData[0][fieldIndex]]),
  );
  const sourceRow = index.getSourceLinks.get(recordData[1]);
  record.sourceLinks = sourceRow ? JSON.parse(sourceRow.links_json) : [];
  return record;
}

function findRecordById(id, index) {
  return recordFromRow(index.getById.get(String(id)), index);
}

function findRecordsByRouteSlug(routeSlug, index) {
  return index.getByRouteSlug.all(routeSlug)
    .map(({ locationId, isSlug }) => ({ locationId, isSlug: Boolean(isSlug) }));
}

function resolveFromDatabase(reference, index, options = {}) {
  if (typeof reference !== 'string') return null;
  const byId = reference.includes(':') ? findRecordById(reference, index) : null;
  const routeRows = findRecordsByRouteSlug(slugify(reference), index);
  const slugMatches = routeRows
    .filter(({ isSlug }) => isSlug)
    .map(({ locationId }) => findRecordById(locationId, index));
  const direct = resolveUnique(
    byId ? [byId] : slugMatches,
    'slug',
    reference,
  );
  if (direct) return direct;

  const matches = routeRows
    .map(({ locationId }) => findRecordById(locationId, index))
    .filter((record) => (
      (!options.country || normalize(record.country) === normalize(options.country))
      && (!options.state || normalize(record.state) === normalize(options.state))
      && (!options.district || normalize(record.district) === normalize(options.district))
      && (!options.type || normalize(record.type) === normalize(options.type))
      && (!options.parentId || String(record.parentId) === String(options.parentId))
    ));
  const canonical = matches.filter(({ name }) => slugify(name) === slugify(reference));
  const exactName = matches.filter(({ name }) => (
    String(name || '').trim().toLowerCase() === reference.replace(/-/g, ' ').trim().toLowerCase()
  ));
  const candidates = exactName.length
    ? exactName
    : canonical.length
      ? canonical
      : matches;
  const preferredType = ROUTE_TYPE_PRIORITY.find((type) => (
    candidates.some((record) => record.type === type)
  ));
  const mostSpecific = preferredType
    ? candidates.filter(({ type }) => type === preferredType)
    : candidates;
  return resolveUnique(mostSpecific, 'alias', reference);
}

function hierarchyFromDatabase(record, index) {
  const chain = [];
  const visited = new Set();
  let current = record;
  while (current) {
    const identity = String(current.id || current.slug);
    if (visited.has(identity)) {
      throw new GeographicHierarchyError(
        `Geographic hierarchy contains a parent cycle at "${identity}".`,
      );
    }
    visited.add(identity);
    chain.unshift(current);
    if (!current.parentId) break;
    const parentId = current.parentId;
    current = findRecordById(parentId, index);
    if (!current) {
      throw new GeographicHierarchyError(`Geographic parent "${parentId}" was not found.`);
    }
  }
  return chain;
}

export async function loadIndiaGeographicRegistry({ limit = Infinity } = {}) {
  if (!(limit === Infinity || (Number.isInteger(limit) && limit > 0))) {
    throw new TypeError('The India geography record limit must be a positive integer or Infinity.');
  }
  if (limit === Infinity) {
    if (!completeRegistryPromise) completeRegistryPromise = readRegistry(limit);
    return completeRegistryPromise;
  }

  return readRegistry(limit);
}

async function readRegistry(limit) {
  const input = fs.createReadStream(INDIA_GEOGRAPHY_PATH);
  const lines = createInterface({
    input: input.pipe(createGunzip()),
    crlfDelay: Infinity,
  });
  let metadata = null;
  const records = [];

  for await (const line of lines) {
    if (!line) continue;
    if (!metadata) {
      metadata = JSON.parse(line);
      continue;
    }
    records.push(JSON.parse(line));
    if (records.length >= limit) break;
  }

  if (!metadata) throw new Error('The India geography registry has no metadata record.');
  return {
    ...metadata,
    records,
    recordsLoaded: records.length,
    complete: records.length === metadata.recordCount,
  };
}

export async function resolveIndiaGeographicLocation(reference, options = {}) {
  const { useRuntimeIndex = false, ...filters } = options;
  const index = getGeographicIndex(useRuntimeIndex);
  const location = resolveFromDatabase(reference, index, {
    country: 'India',
    ...filters,
  });
  const recordCount = index.getRecordCount.get()?.recordCount || 0;
  return location
    ? {
      location,
      hierarchy: hierarchyFromDatabase(location, index),
      registryRecordCount: recordCount,
    }
    : { location: null, hierarchy: null, registryRecordCount: recordCount };
}

export async function resolveIndiaGeographicRoute(slug, { useRuntimeIndex = false } = {}) {
  const index = getGeographicIndex(useRuntimeIndex);
  const location = resolveFromDatabase(slug, index, { country: 'India' });
  const recordCount = index.getRecordCount.get()?.recordCount || 0;
  const registry = { recordCount };
  if (!location) return { location: null, hierarchy: null, registry };
  return {
    location,
    hierarchy: hierarchyFromDatabase(location, index),
    registry,
  };
}

export function hasIndiaGeographicRouteSlug(slug, { useRuntimeIndex = false } = {}) {
  if (typeof slug !== 'string' || !slug) return false;
  return getGeographicIndex(useRuntimeIndex).getByRouteSlug.all(slug).length > 0;
}
