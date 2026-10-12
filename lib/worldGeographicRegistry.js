import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from '../data/location-seo/geography/global-pilot.js';

const INDEX_PATH = path.resolve(
  process.cwd(),
  'data',
  'location-seo',
  'geography',
  'world-geographic-index.sqlite',
);
const TYPE_PRIORITY = [
  'neighborhood',
  'locality',
  'city',
  'town',
  'village',
  'district',
  'state',
  'country',
];
const WORLDWIDE_PUBLISHABLE_COUNTRIES = Object.values(AVIATION_REGULATORY_CONTEXTS)
  .map(({ countryCode }) => countryCode)
  .filter((countryCode) => countryCode !== 'IN');
const REVIEWED_PILOT_ROUTE_SLUGS = [...new Set(
  GLOBAL_GEOGRAPHIC_PILOT.records.flatMap(({ slug, canonicalName, name, aliases = [] }) => (
    [slug, slugify(canonicalName || name), ...aliases.map(slugify)].filter(Boolean)
  )),
)];
let index;
const pilotRecordsById = new Map(
  GLOBAL_GEOGRAPHIC_PILOT.records.map((record) => [record.id, record]),
);

export class AmbiguousGeographicLocationError extends Error {
  constructor(slug) {
    super(`Geographic route "${slug}" resolves to multiple canonical places.`);
    this.name = 'AmbiguousGeographicLocationError';
    this.code = 'AMBIGUOUS_GEOGRAPHIC_LOCATION';
  }
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/^(?:state|province|region|territory|county|district) of\s+/, '');
}

function getIndex() {
  if (index) return index;
  if (!fs.existsSync(INDEX_PATH)) return null;
  const database = new DatabaseSync(INDEX_PATH, { readOnly: true });
  database.exec('PRAGMA query_only = ON');
  index = {
    database,
    routeCandidates: database.prepare(`
      SELECT l.id, l.type, n.is_slug AS isSlug
      FROM route_names n
      JOIN locations l ON l.id = n.location_id
      WHERE n.route_slug = ?
    `),
    getRecord: database.prepare(`
      SELECT id, slug, name, canonical_name AS canonicalName, aliases_json AS aliasesJson,
        type, parent_id AS parentId, country, country_code AS countryCode,
        latitude, longitude, timezone, feature_code AS featureCode,
        population, source, source_url AS sourceUrl, status
      FROM locations
      WHERE id = ?
    `),
    getMatchingPlaceCoordinates: database.prepare(`
      SELECT id, type, latitude, longitude, source_url AS sourceUrl
      FROM locations
      WHERE country_code = ?
        AND canonical_name = ?
        AND type IN ('city', 'town', 'village', 'locality', 'neighborhood')
        AND latitude IS NOT NULL
        AND longitude IS NOT NULL
    `),
    getAirportCandidates: database.prepare(`
      SELECT id, name, country_code AS countryCode, latitude, longitude, source_url AS sourceUrl
      FROM aviation_places
      WHERE country_code = ?
        AND latitude BETWEEN ? AND ?
        AND longitude BETWEEN ? AND ?
    `),
    iterateLocationIds: database.prepare(`
      SELECT l.id
      FROM locations l
      WHERE l.country_code IN (${WORLDWIDE_PUBLISHABLE_COUNTRIES.map(() => '?').join(', ')})
        AND l.slug NOT IN (${REVIEWED_PILOT_ROUTE_SLUGS.map(() => '?').join(', ')})
        AND l.type IN ('city', 'town', 'village', 'locality', 'neighborhood')
        AND EXISTS (
          SELECT 1 FROM route_names canonical
          WHERE canonical.location_id = l.id
            AND canonical.route_slug = l.slug
            AND canonical.is_slug = 1
        )
        AND NOT EXISTS (
          SELECT 1 FROM route_names collisions
          WHERE collisions.route_slug = l.slug
            AND collisions.location_id != l.id
        )
    `),
    countLocationCandidates: database.prepare(`
      SELECT COUNT(*) AS count
      FROM locations l
      WHERE l.country_code IN (${WORLDWIDE_PUBLISHABLE_COUNTRIES.map(() => '?').join(', ')})
        AND l.slug NOT IN (${REVIEWED_PILOT_ROUTE_SLUGS.map(() => '?').join(', ')})
        AND l.type IN ('city', 'town', 'village', 'locality', 'neighborhood')
        AND EXISTS (
          SELECT 1 FROM route_names canonical
          WHERE canonical.location_id = l.id
            AND canonical.route_slug = l.slug
            AND canonical.is_slug = 1
        )
        AND NOT EXISTS (
          SELECT 1 FROM route_names collisions
          WHERE collisions.route_slug = l.slug
            AND collisions.location_id != l.id
        )
    `),
    getRegistryMetadata: database.prepare(`
      SELECT record_count AS recordCount, airport_count AS airportCount
      FROM registry_metadata
      WHERE id = 1
    `),
  };
  return index;
}

function toLocation(row) {
  if (!row) return null;
  return {
    ...row,
    aliases: JSON.parse(row.aliasesJson),
    registryRecordId: row.id,
    registrySlug: row.slug,
    registryRecordStatus: row.status,
    registrySource: row.source === 'GeoNames' ? 'GeoNames' : null,
    relationship: 'informational',
    renderable: true,
    indexable: false,
    sitemapEligible: false,
    sourceLinks: [{
      href: row.sourceUrl,
      publisher: row.source,
      title: `${row.source} geographic record for ${row.canonicalName}`,
      scope: 'Gazetteer place and hierarchy reference; not evidence of aviation facilities or business services.',
      license: 'Creative Commons Attribution 4.0',
    }],
  };
}

function preferredCandidate(rows, slug) {
  const canonicalSlugRows = rows.filter(({ isSlug }) => Boolean(isSlug));
  const candidates = canonicalSlugRows.length ? canonicalSlugRows : rows;
  const preferredType = TYPE_PRIORITY.find((type) => candidates.some(
    (candidate) => candidate.type === type,
  ));
  const preferred = preferredType
    ? candidates.filter((candidate) => candidate.type === preferredType)
    : candidates;
  if (preferred.length > 1) throw new AmbiguousGeographicLocationError(slug);
  return preferred[0] || null;
}

function hierarchyFromIndex(location, registry) {
  const result = [];
  const visited = new Set();
  let current = location;
  while (current) {
    if (visited.has(current.id)) {
      const error = new Error(`Geographic hierarchy has a parent cycle at "${current.id}".`);
      error.code = 'INVALID_GEOGRAPHIC_HIERARCHY';
      throw error;
    }
    visited.add(current.id);
    result.unshift(current);
    if (!current.parentId) break;
    current = toLocation(registry.getRecord.get(current.parentId));
    if (!current) {
      const error = new Error(`Geographic parent "${result[0]?.parentId}" is missing.`);
      error.code = 'INVALID_GEOGRAPHIC_HIERARCHY';
      throw error;
    }
  }
  if (result.at(-1)?.id !== location.id) {
    const error = new Error('Geographic hierarchy does not terminate at the resolved record.');
    error.code = 'INVALID_GEOGRAPHIC_HIERARCHY';
    throw error;
  }
  return result;
}

function pilotResolution(slug, registry) {
  const matches = GLOBAL_GEOGRAPHIC_PILOT.records.filter((record) => (
    record.slug === slug
    || slugify(record.canonicalName || record.name) === slug
    || (record.aliases || []).some((alias) => slugify(alias) === slug)
  ));
  const preferredType = TYPE_PRIORITY.find((type) => matches.some(
    (record) => record.type === type,
  ));
  const preferred = preferredType
    ? matches.filter((record) => record.type === preferredType)
    : matches;
  if (preferred.length > 1) throw new AmbiguousGeographicLocationError(slug);
  const location = preferred[0] || null;
  if (!location) return null;
  if (registry && ['state', 'province', 'region', 'territory', 'district'].includes(location.type)) {
    const populatedPlaceTypes = new Set([
      'city',
      'town',
      'village',
      'locality',
      'neighborhood',
      'populated-place',
    ]);
    if (registry.routeCandidates.all(slug).some(({ type }) => populatedPlaceTypes.has(type))) {
      return null;
    }
  }
  const hierarchy = [];
  const visited = new Set();
  let current = location;
  while (current) {
    if (visited.has(current.id)) {
      const error = new Error(`Geographic hierarchy has a parent cycle at "${current.id}".`);
      error.code = 'INVALID_GEOGRAPHIC_HIERARCHY';
      throw error;
    }
    visited.add(current.id);
    hierarchy.unshift({
      ...current,
      registryRecordId: current.id,
      registrySlug: current.slug,
      registryRecordStatus: current.status,
      registrySource: current.source === 'GeoNames' ? 'GeoNames' : 'ReviewedGlobalPilot',
      relationship: 'informational',
    });
    current = current.parentId ? pilotRecordsById.get(current.parentId) : null;
  }
  return { location: hierarchy.at(-1), hierarchy, nearbyAviationPlaces: [] };
}

function distanceKm(latitude, longitude, otherLatitude, otherLongitude) {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(otherLatitude - latitude);
  const longitudeDelta = radians(otherLongitude - longitude);
  const a = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(radians(latitude))
      * Math.cos(radians(otherLatitude))
      * Math.sin(longitudeDelta / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function nearbyAviationPlaces(location, registry) {
  if (!Number.isFinite(location.latitude) || !Number.isFinite(location.longitude)) {
    return [];
  }
  const latitudeRadius = 1.5;
  const longitudeRadius = Math.min(
    10,
    latitudeRadius / Math.max(0.15, Math.cos((location.latitude * Math.PI) / 180)),
  );
  return registry.getAirportCandidates.all(
    location.countryCode,
    location.latitude - latitudeRadius,
    location.latitude + latitudeRadius,
    location.longitude - longitudeRadius,
    location.longitude + longitudeRadius,
  )
    .map((airport) => ({
      ...airport,
      distanceKm: Number(distanceKm(
        location.latitude,
        location.longitude,
        airport.latitude,
        airport.longitude,
      ).toFixed(1)),
    }))
    .filter(({ distanceKm: distance }) => distance <= 100)
    .sort((left, right) => left.distanceKm - right.distanceKm)
    .slice(0, 3)
    .map((airport) => ({
      ...airport,
      publisher: 'GeoNames',
      title: `GeoNames airport record for ${airport.name}`,
      scope: 'Airport name and coordinates are from the cited geographic database; distance is a straight-line estimate, not travel distance or evidence of a training provider.',
    }));
}

export function getNearbyAviationPlaces(location) {
  if (!location || !Number.isFinite(location.latitude) || !Number.isFinite(location.longitude)) {
    return [];
  }
  const registry = getIndex();
  if (!registry) {
    throw new Error(
      'The GeoNames world index is missing. Run "npm run build:world-geography" before resolving nearby aviation context.',
    );
  }
  return nearbyAviationPlaces(location, registry);
}

export function resolveWorldGeographicRoute(route) {
  const slug = slugify(route);
  if (!slug) return { location: null, hierarchy: null, nearbyAviationPlaces: [] };
  const registry = getIndex();
  const reviewedPilotResolution = pilotResolution(slug, registry);
  if (reviewedPilotResolution) {
    let location = reviewedPilotResolution.location;
    if (registry && !Number.isFinite(location.latitude)) {
      const matchingPlaces = registry.getMatchingPlaceCoordinates.all(
        location.countryCode,
        location.canonicalName || location.name,
      ).filter(({ id }) => {
        const indexedPlace = toLocation(registry.getRecord.get(id));
        const indexedHierarchy = hierarchyFromIndex(indexedPlace, registry);
        const pilotParents = reviewedPilotResolution.hierarchy
          .slice(1, -1)
          .map(({ name }) => normalizeName(name));
        return indexedHierarchy.slice(0, -1).some(({ name }) => (
          pilotParents.includes(normalizeName(name))
        ));
      });
      const preferredType = TYPE_PRIORITY.find((type) => matchingPlaces.some(
        (candidate) => candidate.type === type,
      ));
      const preferred = preferredType
        ? matchingPlaces.filter((candidate) => candidate.type === preferredType)
        : matchingPlaces;
      if (preferred.length === 1) {
        const [coordinateRecord] = preferred;
        location = {
          ...location,
          latitude: coordinateRecord.latitude,
          longitude: coordinateRecord.longitude,
          coordinateSourceUrl: coordinateRecord.sourceUrl,
        };
      }
    }
    return {
      ...reviewedPilotResolution,
      location,
      nearbyAviationPlaces: registry
        ? nearbyAviationPlaces(location, registry)
        : [],
    };
  }
  if (registry) {
    const candidate = preferredCandidate(registry.routeCandidates.all(slug), slug);
    if (candidate) {
      const location = toLocation(registry.getRecord.get(candidate.id));
      return {
        location,
        hierarchy: hierarchyFromIndex(location, registry),
        nearbyAviationPlaces: nearbyAviationPlaces(location, registry),
      };
    }
  }
  return { location: null, hierarchy: null, nearbyAviationPlaces: [] };
}

export function* iterateWorldGeographicRoutes() {
  const registry = getIndex();
  if (!registry) {
    throw new Error(
      'The GeoNames world index is missing. Run "npm run build:world-geography" before generating the sitemap.',
    );
  }
  for (const { id } of registry.iterateLocationIds.iterate(
    ...WORLDWIDE_PUBLISHABLE_COUNTRIES,
    ...REVIEWED_PILOT_ROUTE_SLUGS,
  )) {
    const location = toLocation(registry.getRecord.get(id));
    const hierarchy = hierarchyFromIndex(location, registry);
    yield {
      location,
      hierarchy,
      nearbyAviationPlaces: nearbyAviationPlaces(location, registry),
    };
  }
}

export function hasWorldGeographicIndex() {
  return Boolean(getIndex());
}

export function getWorldGeographicRegistrySummary() {
  const registry = getIndex();
  if (!registry) {
    throw new Error(
      'The GeoNames world index is missing. Run "npm run build:world-geographic-index" first.',
    );
  }
  const metadata = registry.getRegistryMetadata.get();
  if (!metadata) throw new Error('The GeoNames world index has no registry metadata.');
  return {
    recordCount: Number(metadata.recordCount),
    airportCount: Number(metadata.airportCount),
    supportedCountryCodes: [...WORLDWIDE_PUBLISHABLE_COUNTRIES].sort(),
    supportedLocationCount: Number(registry.countLocationCandidates.get(
      ...WORLDWIDE_PUBLISHABLE_COUNTRIES,
      ...REVIEWED_PILOT_ROUTE_SLUGS,
    ).count),
    supportedServiceCount: 1,
  };
}
