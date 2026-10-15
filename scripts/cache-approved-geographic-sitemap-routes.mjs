import fs from 'node:fs';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import { SERVICES } from '../data/location-seo/services.js';
import {
  getApprovedProductionRoutes,
  getProductionRouteApproval,
  getRevokedProductionRouteDecisions,
} from '../data/location-seo/production-route-approvals.js';
import { INDEXABLE_ROBOTS_DIRECTIVE } from '../data/location-seo/geographic-indexability-policy.js';
import { iterateIndexableWorldLocationServicePairs } from '../lib/worldGeographicSitemap.js';
import { resolveGeographicServicePage } from '../lib/geographicServicePage.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import { getLocationEngineContext } from '../lib/locationSeo.js';
import { hasIndiaGeographicRouteSlug } from '../lib/indiaGeographicRegistry.js';
import {
  computeWorldwidePublicationFingerprint,
  getWorldwidePublicationInventoryPaths,
  readWorldwidePublicationInventory,
  writeWorldwidePublicationInventory,
  WORLDWIDE_PUBLICATION_INVENTORY_VERSION,
} from '../lib/worldwidePublicationInventory.js';

const OUTPUT_PATH = path.resolve(
  process.cwd(),
  'data',
  'location-seo',
  'geography',
  'approved-geographic-sitemap-routes.json',
);
const SITE_ORIGIN = 'https://weoneaviation.in';
const SERVICES_BY_SLUG = new Map(SERVICES.map((service) => [service.slug, service]));
const refreshRequested = process.argv.includes('--refresh');
const REFRESHABLE_INVENTORY_ERRORS = new Set([
  'WORLDWIDE_PUBLICATION_INVENTORY_MISSING',
  'WORLDWIDE_PUBLICATION_INVENTORY_STALE',
  'WORLDWIDE_PUBLICATION_INVENTORY_CORRUPT',
  'WORLDWIDE_PUBLICATION_INVENTORY_INVALID',
]);
if (process.argv.includes('--adopt-existing-cache')) {
  throw new Error(
    'Legacy cache adoption is disabled because it cannot establish evaluation provenance. '
    + 'Run "npm run cache:approved-geographic-sitemap -- --refresh" for a full quality evaluation.',
  );
}

function approvalContext(entry) {
  return {
    registryBacked: true,
    location: {
      id: entry.recordId,
      registryRecordId: entry.recordId,
      registrySlug: entry.locationSlug,
      slug: entry.locationSlug,
      countryCode: entry.countryCode,
    },
    service: { slug: entry.serviceSlug },
  };
}

function normalizeInventoryEntry(entry) {
  const route = entry?.route;
  const [, locationSlug, serviceSlug, extra] = typeof route === 'string'
    ? route.split('/')
    : [];
  if (extra
    || !/^\/[a-z0-9-]+\/pilot-training$/.test(route || '')
    || entry.registry !== 'world-geographic-index'
    || entry.state !== 'INDEXABLE'
    || entry.qualityPassed !== true
    || entry.locationSlug !== locationSlug
    || entry.serviceSlug !== serviceSlug
    || !entry.recordId
    || !entry.countryCode) {
    throw new Error(`Invalid entry in worldwide publication inventory: ${route || '(missing route)'}.`);
  }
  const approval = getProductionRouteApproval(route, approvalContext(entry));
  if (!approval.approved || approval.source !== entry.approvalSource) {
    throw new Error(`Worldwide inventory approval no longer matches policy: ${route}.`);
  }
  return {
    ...entry,
    robots: INDEXABLE_ROBOTS_DIRECTIVE,
    canonicalPath: route,
    canonicalUrl: `${SITE_ORIGIN}${route}`,
  };
}

async function buildExplicitApprovalEntries() {
  const entries = new Map();
  const rejectedCounts = { unresolved: 0, notIndexable: 0 };
  for (const route of getApprovedProductionRoutes()) {
    const [, slug, serviceSlug] = route.split('/');
    const service = SERVICES_BY_SLUG.get(serviceSlug);
    if (!service) {
      rejectedCounts.notIndexable += 1;
      continue;
    }
    const resolved = await resolveGeographicServicePage({
      location: slug,
      service: serviceSlug,
    });
    if (resolved.notFound) {
      rejectedCounts.unresolved += 1;
      continue;
    }
    const props = resolved.props;
    const explicitApproval = getProductionRouteApproval(route);
    const pageModel = buildLocationPageModel({
      location: props.location,
      service: props.service,
      content: props.content,
      locations: props.engineLocations,
      geographicDataValidated: props.geographicDataValidated,
      ...(!props.engineLocations ? getLocationEngineContext(props.location) : {}),
    });
    if (!pageModel.productionApproval.approved || !pageModel.sitemapEligible) {
      rejectedCounts.notIndexable += 1;
      continue;
    }
    if (pageModel.metadata.canonical !== `${SITE_ORIGIN}${route}`
      || pageModel.metadata.robots !== INDEXABLE_ROBOTS_DIRECTIVE) {
      throw new Error(`Explicit production route has inconsistent robots/canonical metadata: ${route}.`);
    }
    entries.set(route, {
      route,
      state: 'INDEXABLE',
      qualityPassed: true,
      registry: explicitApproval.registry
        || (props.location.countryCode === 'IN' ? 'india' : 'world-pilot'),
      recordId: explicitApproval.recordId || props.location.id,
      locationSlug: props.location.slug,
      countryCode: props.location.countryCode,
      serviceSlug: service.slug,
      approvalSource: pageModel.productionApproval.source,
      robots: pageModel.metadata.robots,
      canonicalPath: route,
      canonicalUrl: pageModel.metadata.canonical,
    });
  }
  return { entries, rejectedCounts };
}

async function buildPinnedWorldwideCollisionEntries() {
  const entries = new Map();
  for (const decision of getRevokedProductionRouteDecisions()) {
    if (decision.registry !== 'world-pilot'
      || decision.reasonCode !== 'INSUFFICIENT_LOCATION_EVIDENCE') continue;
    const [, slug, serviceSlug] = decision.route.split('/');
    if (!hasIndiaGeographicRouteSlug(slug)) continue;
    const resolved = await resolveGeographicServicePage({ location: slug, service: serviceSlug });
    if (resolved.notFound) continue;
    if (resolved.props.location.id !== decision.recordId) {
      throw new Error(`Pinned worldwide collision identity changed for ${decision.route}.`);
    }
    const pageModel = buildLocationPageModel({
      location: resolved.props.location,
      service: resolved.props.service,
      content: resolved.props.content,
      locations: resolved.props.engineLocations,
      geographicDataValidated: resolved.props.geographicDataValidated,
    });
    if (!pageModel.productionApproval.approved || !pageModel.sitemapEligible) continue;
    if (pageModel.metadata.canonical !== `${SITE_ORIGIN}${decision.route}`
      || pageModel.metadata.robots !== INDEXABLE_ROBOTS_DIRECTIVE) {
      throw new Error(`Pinned worldwide collision has inconsistent publication metadata: ${decision.route}.`);
    }
    entries.set(decision.route, {
      route: decision.route,
      state: 'INDEXABLE',
      qualityPassed: true,
      registry: 'world-geographic-index',
      recordId: resolved.props.location.id,
      locationSlug: resolved.props.location.slug,
      countryCode: resolved.props.location.countryCode,
      serviceSlug,
      approvalSource: pageModel.productionApproval.source,
      robots: pageModel.metadata.robots,
      canonicalPath: decision.route,
      canonicalUrl: pageModel.metadata.canonical,
    });
  }
  return entries;
}

async function evaluateFullInventory(fingerprint, registry) {
  const started = performance.now();
  const { entries, rejectedCounts } = await buildExplicitApprovalEntries();
  const pinnedWorldwideEntries = await buildPinnedWorldwideCollisionEntries();
  for (const [route, entry] of pinnedWorldwideEntries) {
    entries.set(route, entry);
  }
  let evaluatedWorldwideRoutes = 0;
  let rejectedWorldwideRoutes = 0;
  const approvedRoutes = [];
  let rejectedCrossRegistrySlugCollisions = 0;
  for (const candidate of iterateIndexableWorldLocationServicePairs({
    onDecision: ({ status, reason = '' }) => {
      evaluatedWorldwideRoutes += 1;
      if (status !== 'INDEXABLE') rejectedWorldwideRoutes += 1;
      if (reason.includes('also assigned to an Indian geographic record')) {
        rejectedCrossRegistrySlugCollisions += 1;
      }
    },
  })) {
    const route = `/${candidate.location.slug}/${candidate.service.slug}`;
    if (entries.has(route)) continue;
    const decision = candidate.publicationDecision;
    if (decision.status !== 'INDEXABLE') continue;
    if (decision.robots !== INDEXABLE_ROBOTS_DIRECTIVE
      || decision.canonical !== route
      || !decision.productionApproval.approved) {
      rejectedWorldwideRoutes += 1;
      continue;
    }
    approvedRoutes.push({
      route,
      state: 'INDEXABLE',
      qualityPassed: true,
      registry: 'world-geographic-index',
      recordId: candidate.location.id,
      locationSlug: candidate.location.slug,
      countryCode: candidate.location.countryCode,
      serviceSlug: candidate.service.slug,
      approvalSource: decision.productionApproval.source,
      robots: decision.robots,
      canonicalPath: route,
      canonicalUrl: `${SITE_ORIGIN}${route}`,
    });
  }
  for (const entry of pinnedWorldwideEntries.values()) {
    const normalized = normalizeInventoryEntry(entry);
    if (approvedRoutes.some(({ route }) => route === normalized.route)) {
      throw new Error(`Pinned worldwide route was also evaluated independently: ${normalized.route}.`);
    }
    approvedRoutes.push(normalized);
  }
  const elapsedMs = Number((performance.now() - started).toFixed(1));
  return {
    elapsedMs,
    inventory: {
      version: WORLDWIDE_PUBLICATION_INVENTORY_VERSION,
      sourceFingerprint: fingerprint,
      provenance: 'full-quality-evaluation',
      registry,
      evaluation: {
        evaluatedWorldwideRoutes,
        rejectedWorldwideRoutes,
        rejectedCrossRegistrySlugCollisions,
      },
      approvedRoutes: approvedRoutes.sort((left, right) => left.route.localeCompare(right.route)),
    },
    entries,
    rejectedCounts,
  };
}

async function main() {
  const { fingerprint, registry } = computeWorldwidePublicationFingerprint();
  const { inventoryPath, checksumPath } = getWorldwidePublicationInventoryPaths();
  let inventory;
  let explicitEntries;
  let rejectedCounts = { unresolved: 0, notIndexable: 0 };
  let evaluationElapsedMs = null;
  if (!refreshRequested && (fs.existsSync(inventoryPath) || fs.existsSync(checksumPath))) {
    try {
      inventory = readWorldwidePublicationInventory();
    } catch (error) {
      if (!REFRESHABLE_INVENTORY_ERRORS.has(error.code)) throw error;
      console.log(
        `Worldwide publication inventory is not reusable (${error.message}); `
        + 'rerunning the full quality evaluation.',
      );
    }
  }
  if (inventory) {
    const explicit = await buildExplicitApprovalEntries();
    explicitEntries = explicit.entries;
    rejectedCounts = explicit.rejectedCounts;
    for (const entry of inventory.approvedRoutes) {
      const pinnedApproval = getProductionRouteApproval(entry.route);
      const hasVerifiedPinnedIdentity = pinnedApproval.registry === 'world-pilot'
        && pinnedApproval.recordId === entry.recordId;
      if (hasIndiaGeographicRouteSlug(entry.locationSlug) && !hasVerifiedPinnedIdentity) {
        throw new Error(
          `Worldwide quality inventory contains an India route-slug collision: ${entry.route}. `
          + 'Only a route pinned to the same reviewed worldwide identity may disambiguate this collision.',
        );
      }
      const normalized = normalizeInventoryEntry(entry);
      if (explicitEntries.has(normalized.route)) continue;
      explicitEntries.set(normalized.route, normalized);
    }
  } else {
    const evaluated = await evaluateFullInventory(fingerprint, registry);
    inventory = evaluated.inventory;
    evaluationElapsedMs = evaluated.elapsedMs;
    explicitEntries = evaluated.entries;
    for (const entry of inventory.approvedRoutes) {
      const pinnedApproval = getProductionRouteApproval(entry.route);
      const hasVerifiedPinnedIdentity = pinnedApproval.registry === 'world-pilot'
        && pinnedApproval.recordId === entry.recordId;
      if (hasIndiaGeographicRouteSlug(entry.locationSlug) && !hasVerifiedPinnedIdentity) {
        throw new Error(
          `Worldwide quality inventory contains an India route-slug collision: ${entry.route}. `
          + 'Only a route pinned to the same reviewed worldwide identity may disambiguate this collision.',
        );
      }
      const normalized = normalizeInventoryEntry(entry);
      if (explicitEntries.has(normalized.route)) continue;
      explicitEntries.set(normalized.route, normalized);
    }
    rejectedCounts = evaluated.rejectedCounts;
    const result = writeWorldwidePublicationInventory(inventory);
    console.log(
      `Saved ${inventory.approvedRoutes.length} worldwide quality decisions to `
      + `${path.relative(process.cwd(), result.inventoryPath)} `
      + `(${result.compressedBytes} compressed bytes).`,
    );
    console.log(
      `Worldwide inventory preparation: ${evaluationElapsedMs} ms for `
      + `${inventory.evaluation.evaluatedWorldwideRoutes} decisions; `
      + `${inventory.approvedRoutes.length} routes passed quality.`,
    );
  }

  const approvedRoutes = [...explicitEntries.values()]
    .sort((left, right) => left.route.localeCompare(right.route));
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify({
    version: 3,
    generatedAt: new Date().toISOString(),
    source: 'final page-model decisions and fingerprinted worldwide quality evaluation',
    sourceFingerprint: fingerprint,
    registry: inventory.registry,
    evaluation: inventory.evaluation,
    approvedRoutes,
    rejectedCounts,
  })}\n`);
  console.log(
    `Cached ${approvedRoutes.length} indexable geographic routes `
    + `(${inventory.approvedRoutes.length} worldwide quality-approved; `
    + `${rejectedCounts.notIndexable} explicit quality failures; `
    + `${inventory.registry.supportedLocationCount} supported worldwide locations; `
    + `${inventory.registry.supportedServiceCount} supported worldwide service).`,
  );
}

main().catch((error) => {
  console.error('cache-approved-geographic-sitemap-routes: failed:', error);
  process.exitCode = 1;
});
