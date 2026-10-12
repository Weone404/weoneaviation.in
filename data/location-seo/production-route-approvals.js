import { PRODUCTION_ROUTE_REVOCATIONS } from './production-route-revocations.js';
import { getGeographicDynamicServicePolicy } from './world-dynamic-service-policies.js';

const LEGACY_APPROVED_ROUTES = new Set([
  '/delhi/pilot-training',
  '/delhi/dgca-ground-classes',
  '/delhi/commercial-pilot-training',
  '/delhi/cpl-training',
  '/dwarka/pilot-training',
  '/dwarka/dgca-ground-classes',
  '/dwarka/commercial-pilot-training',
  '/dwarka/cpl-training',
]);

const VERIFIED_GEOGRAPHIC_APPROVALS = [
  {
    slug: 'agra',
    recordId: 'geo:geonames:IN:1279259',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
  {
    slug: 'ahmedabad',
    recordId: 'geo:geonames:IN:1279233',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
  {
    slug: 'amritsar',
    recordId: 'geo:geonames:IN:1278710',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
  {
    slug: 'dehradun',
    recordId: 'geo:geonames:IN:1273313',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
  {
    slug: 'dubai',
    recordId: 'geo:city:dubai',
    registry: 'world-pilot',
    services: ['pilot-training'],
  },
  {
    slug: 'hyderabad',
    recordId: 'geo:geonames:IN:1269843',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
  {
    slug: 'kolkata',
    recordId: 'geo:geonames:IN:1275004',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
  {
    slug: 'lucknow',
    recordId: 'geo:geonames:IN:1264733',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
  {
    slug: 'ranchi',
    recordId: 'geo:geonames:IN:1258526',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
  {
    slug: 'thiruvananthapuram',
    recordId: 'geo:geonames:IN:1254163',
    registry: 'india',
    services: ['commercial-pilot-training', 'cpl-training', 'dgca-ground-classes', 'pilot-training'],
  },
];

const APPROVED_ROUTE_DECISIONS = new Map();
for (const approval of VERIFIED_GEOGRAPHIC_APPROVALS) {
  for (const service of approval.services) {
    const route = `/${approval.slug}/${service}`;
    APPROVED_ROUTE_DECISIONS.set(route, {
      route,
      state: 'APPROVED',
      approved: true,
      sitemapEligible: null,
      source: 'explicit-production-approval',
      registry: approval.registry,
      recordId: approval.recordId,
    });
  }
}
for (const route of LEGACY_APPROVED_ROUTES) {
  APPROVED_ROUTE_DECISIONS.set(route, {
    route,
    state: 'APPROVED',
    approved: true,
    sitemapEligible: null,
    source: 'legacy-curated-approval',
  });
}

const REVOKED_ROUTE_DECISIONS = new Map();
for (const revocation of PRODUCTION_ROUTE_REVOCATIONS) {
  for (const service of revocation.services) {
    const route = `/${revocation.slug}/${service}`;
    REVOKED_ROUTE_DECISIONS.set(route, {
      route,
      state: 'NOINDEX',
      approved: false,
      sitemapEligible: false,
      source: 'verified-production-revocation',
      registry: revocation.registry,
      recordId: revocation.recordId,
      reasonCode: revocation.reasonCode,
    });
  }
}
const EXPLICIT_NOINDEX_ROUTES = new Set([
  '/bengaluru/pilot-training',
  '/mumbai/pilot-training',
]);

function worldwideQualityGatedApproval(route, context) {
  const location = context?.location;
  const service = context?.service;
  const [, slug, serviceSlug, extra] = String(route || '').split('/');
  if (
    extra
    || !slug
    || !service
    || service.slug !== serviceSlug
    || service.slug !== 'pilot-training'
    || context.registryBacked !== true
    || location?.countryCode === 'IN'
    || location?.slug !== slug
    || location?.registrySlug !== slug
    || !location?.id
    || location.registryRecordId !== location.id
    || !getGeographicDynamicServicePolicy(service, location)
  ) {
    return null;
  }

  const revocation = REVOKED_ROUTE_DECISIONS.get(route);
  if (revocation && (
    revocation.reasonCode !== 'INSUFFICIENT_LOCATION_EVIDENCE'
    || revocation.recordId !== location.id
    || revocation.registry !== 'world-pilot'
  )) {
    return null;
  }

  return {
    route,
    state: 'QUALITY_GATED',
    approved: true,
    sitemapEligible: null,
    source: 'worldwide-quality-gated-policy',
    registry: 'world-geographic-index',
    recordId: location.id,
  };
}

function registryForRecordId(recordId) {
  if (recordId?.startsWith('geo:geonames:IN:')) return 'india';
  if (recordId?.startsWith('geo:osm:')) return 'india';
  if (recordId?.startsWith('geo:city:') || recordId?.startsWith('geo:locality:')) {
    return 'world-pilot';
  }
  return null;
}

export function getProductionRouteApproval(route, context = null) {
  if (EXPLICIT_NOINDEX_ROUTES.has(route)) {
    return {
      route,
      state: 'NOINDEX',
      approved: false,
      sitemapEligible: false,
      source: 'explicit-review-required',
      registry: 'india',
    };
  }

  const approval = APPROVED_ROUTE_DECISIONS.get(route);
  if (approval) return approval;

  const dynamicApproval = worldwideQualityGatedApproval(route, context);
  if (dynamicApproval) return dynamicApproval;

  const revoked = REVOKED_ROUTE_DECISIONS.get(route);
  if (revoked) {
    return {
      ...revoked,
      state: 'NOINDEX',
      approved: false,
      sitemapEligible: false,
      source: revoked.source,
      registry: revoked.registry || registryForRecordId(revoked.recordId),
      recordId: revoked.recordId,
    };
  }

  return {
    route,
    state: 'NOINDEX',
    approved: false,
    sitemapEligible: false,
    source: 'not-approved',
  };
}

export function finalizeProductionRouteApproval(route, {
  indexability,
  sitemapEligible,
  location,
  service,
  registryBacked,
}) {
  const approval = getProductionRouteApproval(route, {
    location,
    service,
    registryBacked,
  });
  const qualityPassed = indexability === 'INDEXABLE' && sitemapEligible === true;
  if (!approval.approved || !qualityPassed) {
    return {
      ...approval,
      state: 'NOINDEX',
      approved: false,
      sitemapEligible: false,
      qualityPassed,
      source: approval.approved ? 'quality-gate-failed' : approval.source,
    };
  }

  return {
    ...approval,
    state: 'APPROVED',
    approved: true,
    sitemapEligible: true,
    qualityPassed: true,
  };
}

export function isProductionRouteApproved(route, context = null) {
  return getProductionRouteApproval(route, context).approved;
}

export function getApprovedProductionRoutes() {
  return [...APPROVED_ROUTE_DECISIONS.keys()];
}

export function getRevokedProductionRouteDecisions() {
  return [...REVOKED_ROUTE_DECISIONS.values()];
}
