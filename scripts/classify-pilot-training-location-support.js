import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { once } from 'node:events';
import { finished } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { loadIndiaGeographicRegistry } from '../lib/indiaGeographicRegistry.js';

const ROOT = process.cwd();
const GEOGRAPHY_DIRECTORY = path.join(ROOT, 'data', 'location-seo', 'geography');
const WORLD_INDEX_PATH = path.join(GEOGRAPHY_DIRECTORY, 'world-geographic-index.sqlite');
const INDIA_INDEX_PATH = path.join(GEOGRAPHY_DIRECTORY, 'india-geographic-index.sqlite');
const DEFAULT_REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-support-classification.jsonl.gz',
);
const DEFAULT_SUMMARY_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-support-classification-summary.json',
);
const MAX_SAMPLE_COUNT = 20;
const EARTH_RADIUS_KM = 6371;
const GRID_CELL_DEGREES = 2;
const EVIDENCE_RADIUS_KM = 100;
const GEOGRAPHIC_LEVELS = new Set([
  'country',
  'state',
  'province',
  'region',
  'county',
  'district',
  'subdistrict',
  'territory',
  'city',
  'town',
  'village',
  'populated-place',
  'locality',
  'neighborhood',
  'postal-area',
]);

function regulatorByCountryCode() {
  return new Map(Object.values(AVIATION_REGULATORY_CONTEXTS)
    .filter(({ countryCode, authority, source }) => countryCode && authority && source)
    .map((context) => [context.countryCode, context]));
}

function createAirportGrid(database) {
  const grid = new Map();
  const rows = database.prepare(`
    SELECT country_code AS countryCode, latitude, longitude
    FROM aviation_places
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL
  `);
  let airportCount = 0;
  for (const airport of rows.iterate()) {
    const latitudeCell = Math.floor((airport.latitude + 90) / GRID_CELL_DEGREES);
    const longitudeCell = Math.floor((airport.longitude + 180) / GRID_CELL_DEGREES);
    const key = `${airport.countryCode}|${latitudeCell}|${longitudeCell}`;
    const bucket = grid.get(key) || [];
    bucket.push([airport.latitude, airport.longitude]);
    grid.set(key, bucket);
    airportCount += 1;
  }
  return { grid, airportCount };
}

function distanceKm(latitude, longitude, otherLatitude, otherLongitude) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(otherLatitude - latitude);
  const longitudeDelta = toRadians(otherLongitude - longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(toRadians(latitude))
      * Math.cos(toRadians(otherLatitude))
      * Math.sin(longitudeDelta / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function hasNearbyAirport(grid, countryCode, latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || !countryCode) return false;
  const latitudeRadius = (EVIDENCE_RADIUS_KM / EARTH_RADIUS_KM) * (180 / Math.PI);
  const cosine = Math.max(0.005, Math.cos((latitude * Math.PI) / 180));
  const longitudeRadius = Math.min(180, latitudeRadius / cosine);
  const minimumLatitudeCell = Math.floor((latitude - latitudeRadius + 90) / GRID_CELL_DEGREES);
  const maximumLatitudeCell = Math.floor((latitude + latitudeRadius + 90) / GRID_CELL_DEGREES);
  const minimumLongitude = longitude - longitudeRadius;
  const maximumLongitude = longitude + longitudeRadius;
  const longitudeCells = new Set();

  for (let current = Math.floor((minimumLongitude + 180) / GRID_CELL_DEGREES);
    current <= Math.floor((maximumLongitude + 180) / GRID_CELL_DEGREES);
    current += 1) {
    longitudeCells.add(((current % 180) + 180) % 180);
  }

  for (let latitudeCell = minimumLatitudeCell;
    latitudeCell <= maximumLatitudeCell;
    latitudeCell += 1) {
    for (const longitudeCell of longitudeCells) {
      const bucket = grid.get(`${countryCode}|${latitudeCell}|${longitudeCell}`) || [];
      if (bucket.some(([airportLatitude, airportLongitude]) => (
        distanceKm(latitude, longitude, airportLatitude, airportLongitude)
          <= EVIDENCE_RADIUS_KM
      ))) return true;
    }
  }
  return false;
}

function hierarchyForIndia(record, recordsById, cache) {
  const cached = cache.get(record.id);
  if (cached) return cached;
  const chain = [];
  const seen = new Set();
  let current = record;
  let reason = null;

  while (current) {
    if (seen.has(current.id)) {
      reason = `Geographic parent cycle at ${current.id}.`;
      break;
    }
    seen.add(current.id);
    chain.unshift(current);
    if (!current.parentId) break;
    current = recordsById.get(current.parentId);
    if (!current) {
      reason = `Geographic parent "${chain[0].parentId}" is missing.`;
      break;
    }
  }

  const country = chain[0];
  const hierarchyValid = !reason
    && chain.at(-1)?.id === record.id
    && country?.type === 'country'
    && country.countryCode === 'IN'
    && chain.every((item) => item.countryCode === 'IN' && item.country === 'India')
    && (record.type === 'country'
      ? chain.length === 1
      : chain.some(({ type }) => type === 'state'));
  if (!reason && !hierarchyValid) {
    reason = 'The parent chain does not resolve to a valid India country/state hierarchy.';
  }
  const result = {
    chain,
    hierarchyValid,
    country: hierarchyValid ? country : null,
    parentLocation: record.parentId
      ? recordsById.get(record.parentId)?.canonicalName
        || recordsById.get(record.parentId)?.name
        || null
      : null,
    reason,
  };
  cache.set(record.id, result);
  return result;
}

function classifyRecord({
  record,
  hierarchyValid,
  country,
  parentLocation,
  hierarchyReason,
  regulatorMap,
  evidenceAvailable,
  ambiguous = false,
}) {
  const regulator = country
    ? regulatorMap.get(country.countryCode || record.countryCode)
    : null;
  const isAmbiguous = ambiguous
    || record.resolutionStatus === 'AMBIGUOUS'
    || record.safetyStatus === 'ambiguous'
    || record.postalCodeAmbiguous === true;
  let status;
  let reason;

  if (isAmbiguous) {
    status = 'AMBIGUOUS';
    reason = 'The registry marks this location identity or postal assignment as ambiguous.';
  } else if (
    record.status !== 'sourced'
    || record.safetyStatus === 'rejected'
    || !record.id
    || !record.slug
    || !(record.canonicalName || record.name)
    || !GEOGRAPHIC_LEVELS.has(record.type)
    || !hierarchyValid
  ) {
    status = 'REJECTED';
    reason = record.status !== 'sourced'
      ? `Registry record status is "${record.status || 'missing'}".`
      : hierarchyReason || 'The location record is incomplete or its geographic hierarchy is invalid.';
  } else if (!regulator) {
    status = 'RESEARCH';
    reason = `No country-specific aviation regulatory context is configured for ${country?.country || record.country || 'this country'}.`;
  } else {
    status = 'SUPPORTED';
    reason = 'The sourced location has a valid country hierarchy and a configured national aviation regulator; support is informational only.';
  }

  return {
    locationId: record.id,
    locationName: record.canonicalName || record.name || null,
    slug: record.slug || null,
    country: country?.country || record.country || null,
    countryCode: country?.countryCode || record.countryCode || null,
    geographicLevel: record.type || null,
    parentLocation: parentLocation || null,
    pilotTrainingSupported: status === 'SUPPORTED',
    status,
    regulator: regulator?.authority || null,
    reason,
    evidenceAvailable,
  };
}

function createSummary() {
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    service: 'pilot-training',
    evidenceDefinition: 'A GeoNames airport point within 100 km of the location coordinates; this does not verify a training provider, approval, or We One Aviation presence.',
    totalLocationsEvaluated: 0,
    counts: {
      SUPPORTED: 0,
      NOT_SUPPORTED: 0,
      RESEARCH: 0,
      REJECTED: 0,
      AMBIGUOUS: 0,
    },
    countryWiseCounts: {},
    levelWiseCounts: {},
    regulatorCoverage: {},
    regulatorCountryCoverage: {},
    locationsWithMissingRegulator: 0,
    missingRegulatorSamples: [],
    locationsWithMissingEvidence: 0,
    missingEvidenceSamples: [],
    samples: {
      SUPPORTED: [],
      NOT_SUPPORTED: [],
      RESEARCH: [],
      REJECTED: [],
      AMBIGUOUS: [],
    },
    sourceRegistries: {},
  };
}

function sampleRow(row) {
  return {
    locationId: row.locationId,
    locationName: row.locationName,
    slug: row.slug,
    country: row.country,
    countryCode: row.countryCode,
    geographicLevel: row.geographicLevel,
    parentLocation: row.parentLocation,
    regulator: row.regulator,
    reason: row.reason,
    evidenceAvailable: row.evidenceAvailable,
  };
}

function addClassification(summary, row) {
  summary.totalLocationsEvaluated += 1;
  summary.counts[row.status] += 1;

  const countryKey = `${row.countryCode || 'UNKNOWN'}|${row.country || 'Unknown'}`;
  const countryCounts = summary.countryWiseCounts[countryKey] || {
    country: row.country,
    countryCode: row.countryCode,
    regulator: row.regulator,
    counts: {
      SUPPORTED: 0,
      NOT_SUPPORTED: 0,
      RESEARCH: 0,
      REJECTED: 0,
      AMBIGUOUS: 0,
    },
  };
  countryCounts.counts[row.status] += 1;
  summary.countryWiseCounts[countryKey] = countryCounts;

  const level = row.geographicLevel || 'unknown';
  const levelCounts = summary.levelWiseCounts[level] || {
    SUPPORTED: 0,
    NOT_SUPPORTED: 0,
    RESEARCH: 0,
    REJECTED: 0,
    AMBIGUOUS: 0,
  };
  levelCounts[row.status] += 1;
  summary.levelWiseCounts[level] = levelCounts;

  if (row.regulator) {
    const coverage = summary.regulatorCoverage[row.regulator] || {
      locations: 0,
      countries: new Set(),
    };
    coverage.locations += 1;
    coverage.countries.add(countryKey);
    summary.regulatorCoverage[row.regulator] = coverage;
    summary.regulatorCountryCoverage[countryKey] = row.regulator;
  } else {
    summary.locationsWithMissingRegulator += 1;
    if (summary.missingRegulatorSamples.length < MAX_SAMPLE_COUNT) {
      summary.missingRegulatorSamples.push(sampleRow(row));
    }
  }
  if (!row.evidenceAvailable) {
    summary.locationsWithMissingEvidence += 1;
    if (summary.missingEvidenceSamples.length < MAX_SAMPLE_COUNT) {
      summary.missingEvidenceSamples.push(sampleRow(row));
    }
  }
  if (summary.samples[row.status].length < MAX_SAMPLE_COUNT) {
    summary.samples[row.status].push(sampleRow(row));
  }
}

async function writeLine(stream, row) {
  if (!stream.write(`${JSON.stringify(row)}\n`)) await once(stream, 'drain');
}

async function main() {
  const reportPath = process.env.PILOT_TRAINING_CLASSIFICATION_REPORT
    || DEFAULT_REPORT_PATH;
  const summaryPath = process.env.PILOT_TRAINING_CLASSIFICATION_SUMMARY
    || DEFAULT_SUMMARY_PATH;
  const limitPerRegistry = process.env.PILOT_TRAINING_CLASSIFICATION_LIMIT_PER_REGISTRY
    ? Number(process.env.PILOT_TRAINING_CLASSIFICATION_LIMIT_PER_REGISTRY)
    : Infinity;
  if (!(limitPerRegistry === Infinity
    || (Number.isInteger(limitPerRegistry) && limitPerRegistry > 0))) {
    throw new TypeError('The optional per-registry limit must be a positive integer.');
  }
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.mkdirSync(path.dirname(summaryPath), { recursive: true });

  const regulatorMap = regulatorByCountryCode();
  const worldDatabase = new DatabaseSync(WORLD_INDEX_PATH, { readOnly: true });
  worldDatabase.exec('PRAGMA query_only = ON');
  const worldMetadata = worldDatabase.prepare(
    'SELECT record_count AS recordCount, airport_count AS airportCount FROM registry_metadata WHERE id = 1',
  ).get();
  const { grid: airportGrid, airportCount } = createAirportGrid(worldDatabase);
  const worldRecords = worldDatabase.prepare(`
    SELECT
      l.id, l.slug, l.canonical_name AS canonicalName, l.name, l.type,
      l.parent_id AS parentId, l.country, l.country_code AS countryCode,
      l.status, l.latitude, l.longitude,
      p.id AS resolvedParentId, p.canonical_name AS parentCanonicalName,
      p.name AS parentName, p.type AS parentType, p.country_code AS parentCountryCode,
      g.id AS grandparentId, g.type AS grandparentType,
      g.country_code AS grandparentCountryCode,
      gg.id AS greatGrandparentId, gg.type AS greatGrandparentType,
      gg.country_code AS greatGrandparentCountryCode,
      CASE
        WHEN p.type = 'country' THEN p.country
        WHEN g.type = 'country' THEN g.country
        WHEN gg.type = 'country' THEN gg.country
        ELSE NULL
      END AS countryAncestorRegistryName,
      CASE
        WHEN p.type = 'country' THEN p.canonical_name
        WHEN g.type = 'country' THEN g.canonical_name
        WHEN gg.type = 'country' THEN gg.canonical_name
        ELSE NULL
      END AS countryAncestorName
    FROM locations l
    LEFT JOIN locations p ON p.id = l.parent_id
    LEFT JOIN locations g ON g.id = p.parent_id
    LEFT JOIN locations gg ON gg.id = g.parent_id
    WHERE l.country_code <> 'IN'
  `);
  const summary = createSummary();
  summary.sourceRegistries = {
    india: { declaredRecordCount: null, evaluatedRecordCount: 0 },
    worldwide: { declaredRecordCount: worldMetadata.recordCount, evaluatedRecordCount: 0 },
    worldwideAirportPoints: airportCount,
    note: 'The India subset is excluded from the worldwide scan to prevent duplicate classifications.',
  };
  const compressedOutput = fs.createWriteStream(reportPath);
  const gzip = createGzip({ level: 6 });
  gzip.pipe(compressedOutput);
  const startedAt = Date.now();

  const classifyAndWrite = async (row) => {
    addClassification(summary, row);
    await writeLine(gzip, row);
    if (summary.totalLocationsEvaluated % 500000 === 0) {
      console.log(`Classified ${summary.totalLocationsEvaluated.toLocaleString()} locations.`);
    }
  };

  try {
    const indiaRegistry = await loadIndiaGeographicRegistry();
    const indiaRecords = indiaRegistry.records;
    const indiaRecordsById = new Map(indiaRecords.map((record) => [record.id, record]));
    const indiaHierarchyCache = new Map();
    const ambiguousIds = new Set();
    for (const record of indiaRecords) {
      if (record.resolutionStatus === 'AMBIGUOUS'
        || record.safetyStatus === 'ambiguous'
        || record.postalCodeAmbiguous === true) {
        ambiguousIds.add(record.id);
      }
    }
    summary.sourceRegistries.india.declaredRecordCount = indiaRegistry.recordCount;
    summary.sourceRegistries.india.evaluatedRecordCount = indiaRecords.length;

    let indiaCount = 0;
    for (const record of indiaRecords) {
      if (indiaCount >= limitPerRegistry) break;
      const hierarchy = hierarchyForIndia(record, indiaRecordsById, indiaHierarchyCache);
      const row = classifyRecord({
        record,
        hierarchyValid: hierarchy.hierarchyValid,
        country: hierarchy.country,
        parentLocation: hierarchy.parentLocation,
        hierarchyReason: hierarchy.reason,
        regulatorMap,
        evidenceAvailable: hasNearbyAirport(
          airportGrid,
          record.countryCode,
          record.latitude,
          record.longitude,
        ),
        ambiguous: ambiguousIds.has(record.id),
      });
      await classifyAndWrite(row);
      indiaCount += 1;
    }
    summary.sourceRegistries.india.evaluatedRecordCount = indiaCount;

    let worldCount = 0;
    for (const record of worldRecords.iterate()) {
      if (worldCount >= limitPerRegistry) break;
      const isCountry = record.type === 'country';
      const parentIsValid = isCountry
        ? record.parentId === null
        : Boolean(
          record.parentId
          && record.resolvedParentId === record.parentId
          && record.parentCountryCode === record.countryCode,
        );
      const ancestorCountries = [
        [record.resolvedParentId, record.parentType, record.parentCountryCode],
        [record.grandparentId, record.grandparentType, record.grandparentCountryCode],
        [record.greatGrandparentId, record.greatGrandparentType, record.greatGrandparentCountryCode],
      ].filter(([id, type, countryCode]) => (
        id && type === 'country' && countryCode === record.countryCode
      ));
      const permittedParentTypes = {
        state: new Set(['country']),
        district: new Set(['state', 'country']),
        city: new Set(['district', 'state', 'country']),
        locality: new Set(['district', 'state', 'country']),
        neighborhood: new Set(['district', 'state', 'country']),
      };
      const parentTypeValid = isCountry
        ? record.parentId === null
        : Boolean(permittedParentTypes[record.type]?.has(record.parentType));
      const hierarchyValid = isCountry
        ? parentIsValid && /^[A-Z]{2}$/.test(record.countryCode || '')
        : parentIsValid
          && parentTypeValid
          && ancestorCountries.length === 1
          && Boolean(record.countryAncestorRegistryName)
          && record.country === record.countryAncestorRegistryName
          && [record.parentCountryCode, record.grandparentCountryCode, record.greatGrandparentCountryCode]
            .filter((value) => value && value !== record.countryCode).length === 0;
      const country = hierarchyValid
        ? {
          country: record.countryAncestorName,
          countryCode: record.countryCode,
        }
        : null;
      const row = classifyRecord({
        record: {
          ...record,
          status: record.status,
          resolutionStatus: 'RESOLVABLE',
        },
        hierarchyValid,
        country,
        parentLocation: record.parentCanonicalName || record.parentName || null,
        hierarchyReason: hierarchyValid
          ? null
          : 'The worldwide registry parent chain does not resolve to exactly one same-country country record.',
        regulatorMap,
        evidenceAvailable: hasNearbyAirport(
          airportGrid,
          record.countryCode,
          record.latitude,
          record.longitude,
        ),
      });
      await classifyAndWrite(row);
      worldCount += 1;
    }
    summary.sourceRegistries.worldwide.evaluatedRecordCount = worldCount;
    summary.runtimeSeconds = Number(((Date.now() - startedAt) / 1000).toFixed(1));
    gzip.end();
    await Promise.all([finished(gzip), finished(compressedOutput)]);
    for (const coverage of Object.values(summary.regulatorCoverage)) {
      coverage.countries = [...coverage.countries].sort();
      coverage.countryCount = coverage.countries.length;
    }
    summary.reportFile = path.relative(ROOT, reportPath);
    summary.reportCompression = 'gzip-compressed JSON Lines; one object per registry location.';
    fs.writeFileSync(summaryPath, `${JSON.stringify(summary, null, 2)}\n`);
    console.log(JSON.stringify({
      reportFile: summary.reportFile,
      summaryFile: path.relative(ROOT, summaryPath),
      totalLocationsEvaluated: summary.totalLocationsEvaluated,
      counts: summary.counts,
      locationsWithMissingRegulator: summary.locationsWithMissingRegulator,
      locationsWithMissingEvidence: summary.locationsWithMissingEvidence,
      runtimeSeconds: summary.runtimeSeconds,
    }, null, 2));
  } catch (error) {
    gzip.destroy(error);
    compressedOutput.destroy(error);
    worldDatabase.close();
    throw error;
  } finally {
    worldDatabase.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
