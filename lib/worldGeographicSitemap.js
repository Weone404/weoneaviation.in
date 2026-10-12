import { SERVICES } from '../data/location-seo/services.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from '../data/location-seo/geography/global-pilot.js';
import {
  getProductionRouteApproval,
} from '../data/location-seo/production-route-approvals.js';
import { getGeographicDynamicServicePolicy } from '../data/location-seo/world-dynamic-service-policies.js';
import { INDEXABLE_ROBOTS_DIRECTIVE } from '../data/location-seo/geographic-indexability-policy.js';
import { hasIndiaGeographicRouteSlug } from './indiaGeographicRegistry.js';
import { buildWorldLocationServiceContent } from './worldLocationContentEngine.js';
import {
  iterateWorldGeographicRoutes,
  resolveWorldGeographicRoute,
} from './worldGeographicRegistry.js';

const PILOT_TRAINING = SERVICES.find(({ slug }) => slug === 'pilot-training');

function buildCandidateContent(candidate, service, onDecision) {
  try {
    return buildWorldLocationServiceContent(candidate);
  } catch (error) {
    if (error.code !== 'INVALID_GEOGRAPHIC_HIERARCHY') throw error;
    onDecision?.({
      record: candidate.record,
      service,
      status: 'NOINDEX',
      reason: error.message,
    });
    return null;
  }
}

function isVerifiedWorldSlugCollision(location, service) {
  const approval = getProductionRouteApproval(`/${location.slug}/${service.slug}`);
  return approval.registry === 'world-pilot' && approval.recordId === location.id;
}

function hasUnresolvedIndiaSlugCollision(location, service) {
  return hasIndiaGeographicRouteSlug(location.slug)
    && !isVerifiedWorldSlugCollision(location, service);
}

function evaluateCandidate(location, hierarchy, service, nearbyAviationPlaces, onDecision) {
  const generated = buildCandidateContent({
    record: location,
    hierarchy,
    service,
    nearbyAviationPlaces,
    routeSlug: location.slug,
  }, service, onDecision);
  if (!generated) return null;
  const canonical = generated.content.canonicalPath;
  const productionApproval = getProductionRouteApproval(canonical, {
    location: generated.location,
    service,
    registryBacked: true,
  });
  const indexable = generated.quality.qualityGatePassed === true
    && generated.quality.productionRouteApproved === true
    && generated.quality.indexable === true
    && generated.quality.state === 'INDEXABLE'
    && generated.location.indexable === true
    && generated.location.sitemapEligible === true
    && productionApproval.approved === true
    && canonical === `/${location.slug}/${service.slug}`;
  onDecision?.({
    record: location,
    service,
    status: indexable ? 'INDEXABLE' : 'NOINDEX',
    reason: generated.quality.blockers?.join(' ')
      || productionApproval.source,
  });
  return indexable
    ? {
      ...generated,
      publicationDecision: {
        status: 'INDEXABLE',
        robots: INDEXABLE_ROBOTS_DIRECTIVE,
        canonical,
        productionApproval,
      },
    }
    : null;
}

export function* iterateIndexableWorldLocationServicePairs({
  onDecision = null,
} = {}) {
  if (!PILOT_TRAINING) throw new Error('The pilot-training service configuration is missing.');
  const seenSlugs = new Set();

  const candidates = GLOBAL_GEOGRAPHIC_PILOT.records
    .filter((location) => location.countryCode !== 'IN');
  for (const candidate of candidates) {
    if (seenSlugs.has(candidate.slug)) continue;
    if (hasUnresolvedIndiaSlugCollision(candidate, PILOT_TRAINING)) {
      onDecision?.({
        record: candidate,
        service: PILOT_TRAINING,
        status: 'AMBIGUOUS',
        reason: `The route slug "${candidate.slug}" is also assigned to an Indian geographic record.`,
      });
      continue;
    }
    let resolved;
    try {
      resolved = resolveWorldGeographicRoute(candidate.slug);
    } catch (error) {
      if (error.code !== 'AMBIGUOUS_GEOGRAPHIC_LOCATION') throw error;
      onDecision?.({
        record: candidate,
        service: PILOT_TRAINING,
        status: 'AMBIGUOUS',
        reason: error.message,
      });
      continue;
    }
    if (!resolved.location || resolved.location.id !== candidate.id) continue;
    const { location, hierarchy, nearbyAviationPlaces } = resolved;
    const service = PILOT_TRAINING;
    if (!getGeographicDynamicServicePolicy(service, location)) continue;
    const generated = evaluateCandidate(
      location,
      hierarchy,
      service,
      nearbyAviationPlaces,
      onDecision,
    );
    if (!generated) continue;
    seenSlugs.add(location.slug);
    yield {
      location: generated.location,
      service,
      content: generated.content,
      hierarchy,
      publicationDecision: generated.publicationDecision,
    };
  }

  for (const { location, hierarchy, nearbyAviationPlaces } of iterateWorldGeographicRoutes()) {
    if (seenSlugs.has(location.slug)) continue;
    const service = PILOT_TRAINING;
    if (!getGeographicDynamicServicePolicy(service, location)) continue;
    if (hasUnresolvedIndiaSlugCollision(location, service)) {
      onDecision?.({
        record: location,
        service,
        status: 'AMBIGUOUS',
        reason: `The route slug "${location.slug}" is also assigned to an Indian geographic record.`,
      });
      continue;
    }
    const generated = evaluateCandidate(
      location,
      hierarchy,
      service,
      nearbyAviationPlaces,
      onDecision,
    );
    if (!generated) continue;
    seenSlugs.add(location.slug);
    yield {
      location: generated.location,
      service,
      content: generated.content,
      hierarchy,
      publicationDecision: generated.publicationDecision,
    };
  }
}
