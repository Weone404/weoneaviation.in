import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { resolveGeographicServicePage } from '../lib/geographicServicePage.js';
import {
  resolveIndiaGeographicLocation,
  resolveIndiaGeographicRoute,
} from '../lib/indiaGeographicRegistry.js';
import { prepareLocationServicePageResult } from '../lib/locationPageProps.js';
import { resolveWorldGeographicRoute } from '../lib/worldGeographicRegistry.js';
import { INDEXABLE_ROBOTS_DIRECTIVE } from '../data/location-seo/geographic-indexability-policy.js';

const ROOT = process.cwd();
const SITE_URL = 'https://weoneaviation.in';
const GEOGRAPHY_DIR = path.join(ROOT, 'data', 'location-seo', 'geography');
const ROUTE_CACHE_PATH = path.join(GEOGRAPHY_DIR, 'approved-geographic-sitemap-routes.json');
const WORLD_INDEX_PATH = path.join(GEOGRAPHY_DIR, 'world-geographic-runtime-index.sqlite');
const INDIA_INDEX_PATH = path.join(GEOGRAPHY_DIR, 'india-geographic-runtime-index.sqlite');
const cache = JSON.parse(fs.readFileSync(ROUTE_CACHE_PATH, 'utf8'));
const worldRoutes = cache.approvedRoutes.filter(
  (entry) => entry.registry === 'world-geographic-index',
);
const indiaRoutes = cache.approvedRoutes.filter(
  (entry) => entry.registry === 'india' && entry.countryCode === 'IN',
);

function openIndex(indexPath) {
  assert.ok(fs.existsSync(indexPath), `Runtime geographic index is missing: ${indexPath}`);
  const database = new DatabaseSync(indexPath, { readOnly: true });
  database.exec('PRAGMA query_only = ON');
  assert.equal(database.prepare('PRAGMA integrity_check').get().integrity_check, 'ok');
  return database;
}

function assertCompleteHierarchy(database) {
  const result = database.prepare(`
    SELECT COUNT(*) AS count
    FROM locations child
    WHERE child.parent_id IS NOT NULL
      AND NOT EXISTS (SELECT 1 FROM locations parent WHERE parent.id = child.parent_id)
  `).get();
  assert.equal(Number(result.count), 0, 'Every runtime location parent must be present.');
}

async function assertCompleteIndiaHierarchy(database) {
  const ids = database.prepare('SELECT id FROM locations').all().map(({ id }) => id);
  const idSet = new Set(ids);
  for (const id of ids) {
    const resolved = await resolveIndiaGeographicLocation(id, { useRuntimeIndex: true });
    assert.ok(resolved.location, `India runtime location is missing: ${id}`);
    const parentId = resolved.location.parentId;
    if (parentId) {
      assert.ok(idSet.has(String(parentId)), `India runtime parent is missing: ${parentId}`);
    }
  }
}

async function assertIndexablePage(location) {
  const result = await resolveGeographicServicePage({
    location,
    service: 'pilot-training',
    useRuntimeIndex: true,
  });
  assert.ok(!result.notFound, `The approved ${location} route must resolve.`);
  const pageModel = prepareLocationServicePageResult(result, SITE_URL).props.pageModel;
  assert.equal(pageModel.metadata.robots, INDEXABLE_ROBOTS_DIRECTIVE);
  assert.equal(
    pageModel.metadata.canonical,
    `${SITE_URL}/${location}/pilot-training`,
  );
}

const worldDatabase = openIndex(WORLD_INDEX_PATH);
const indiaDatabase = openIndex(INDIA_INDEX_PATH);
try {
  const worldMetadata = worldDatabase.prepare(`
    SELECT source_fingerprint AS sourceFingerprint,
      published_route_count AS publishedRouteCount,
      location_count AS locationCount,
      airport_count AS airportCount
    FROM runtime_metadata
    WHERE id = 1
  `).get();
  const indiaMetadata = indiaDatabase.prepare(`
    SELECT source_fingerprint AS sourceFingerprint,
      published_route_count AS publishedRouteCount,
      record_count AS recordCount
    FROM runtime_metadata
    WHERE id = 1
  `).get();
  assert.ok(worldMetadata);
  assert.ok(indiaMetadata);
  assert.equal(worldMetadata.sourceFingerprint, cache.sourceFingerprint);
  assert.equal(indiaMetadata.sourceFingerprint, cache.sourceFingerprint);
  assert.equal(Number(worldMetadata.publishedRouteCount), worldRoutes.length);
  assert.equal(Number(indiaMetadata.publishedRouteCount), indiaRoutes.length);

  const hasWorldRoute = worldDatabase.prepare(`
    SELECT 1
    FROM route_names
    WHERE route_slug = ? AND location_id = ?
  `);
  let worldGeonamesRouteCount = 0;
  for (const entry of worldRoutes) {
    if (!entry.recordId.startsWith('geoname:')) continue;
    assert.ok(
      hasWorldRoute.get(entry.locationSlug, entry.recordId),
      `Approved worldwide route is absent from runtime index: ${entry.route}`,
    );
    worldGeonamesRouteCount += 1;
  }
  assert.ok(worldGeonamesRouteCount > 0);

  const hasIndiaRecord = indiaDatabase.prepare('SELECT 1 FROM locations WHERE id = ?');
  for (const entry of indiaRoutes) {
    if (entry.approvalSource === 'legacy-curated-approval') continue;
    assert.ok(
      hasIndiaRecord.get(entry.recordId),
      `Approved India route is absent from runtime index: ${entry.route}`,
    );
  }
  assertCompleteHierarchy(worldDatabase);
  await assertCompleteIndiaHierarchy(indiaDatabase);

  const londonRoute = worldRoutes.find((entry) => entry.locationSlug === 'london');
  const parisRoute = worldRoutes.find((entry) => entry.locationSlug === 'paris');
  const dubaiPilotRoute = cache.approvedRoutes.find((entry) => (
    entry.route === '/dubai/pilot-training' && entry.registry === 'world-pilot'
  ));
  assert.equal(londonRoute?.countryCode, 'GB');
  assert.equal(parisRoute?.countryCode, 'FR');
  assert.ok(dubaiPilotRoute, 'Dubai must remain an explicitly approved pilot route.');
  const london = await resolveWorldGeographicRoute('london', { useRuntimeIndex: true });
  assert.equal(london.location?.id, londonRoute?.recordId);
  assert.equal(london.hierarchy?.at(-1)?.id, london.location.id);
  const paris = await resolveWorldGeographicRoute('paris', { useRuntimeIndex: true });
  assert.equal(paris.location?.id, parisRoute?.recordId);
  assert.equal(paris.hierarchy?.at(-1)?.id, paris.location.id);
  const indiaRoute = indiaRoutes.find(
    (entry) => entry.locationSlug === 'agra' && entry.serviceSlug === 'pilot-training',
  );
  assert.ok(indiaRoute, 'Agra must remain an approved India runtime route.');
  const agra = await resolveIndiaGeographicRoute(indiaRoute.recordId, { useRuntimeIndex: true });
  assert.equal(agra.location?.id, indiaRoute.recordId);
  assert.equal(agra.hierarchy?.at(-1)?.id, indiaRoute.recordId);
  await assertIndexablePage('delhi');
  await assertIndexablePage('agra');
  await assertIndexablePage('london');
  await assertIndexablePage('paris');
  await assertIndexablePage('dubai');

  const mumbaiPage = await resolveGeographicServicePage({
    location: 'mumbai',
    service: 'pilot-training',
    useRuntimeIndex: true,
  });
  assert.ok(!mumbaiPage.notFound, 'The reviewed Mumbai noindex route must preserve its legacy response.');
  const mumbaiPageModel = prepareLocationServicePageResult(
    mumbaiPage,
    'https://weoneaviation.in',
  ).props.pageModel;
  assert.equal(mumbaiPageModel.metadata.robots, 'noindex, follow');
  assert.equal(
    mumbaiPageModel.metadata.canonical,
    'https://weoneaviation.in/mumbai/pilot-training',
  );
  const invalidPage = await resolveGeographicServicePage({
    location: 'not-a-real-place',
    service: 'pilot-training',
    useRuntimeIndex: true,
  });
  assert.equal(invalidPage.notFound, true);

  console.log(JSON.stringify({
    worldRoutes: worldRoutes.length,
    worldGeonamesRoutesVerified: worldGeonamesRouteCount,
    indiaRoutes: indiaRoutes.length,
    worldRuntimeIndexBytes: fs.statSync(WORLD_INDEX_PATH).size,
    indiaRuntimeIndexBytes: fs.statSync(INDIA_INDEX_PATH).size,
    representativeChecks: [
      'Delhi/indexable',
      'Agra/indexable',
      'London-GB/indexable',
      'Paris-FR/indexable',
      'Dubai-AE/curated-indexable',
      'Mumbai/noindex',
      'invalid/not-found',
    ],
  }, null, 2));
} finally {
  worldDatabase.close();
  indiaDatabase.close();
}
