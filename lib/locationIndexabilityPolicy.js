import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';

export function evaluateLocationIndexabilityPipeline({
  locationExists,
  hierarchyValid,
  serviceExists,
  serviceCompatible,
  relationshipValid,
  contentAvailable,
  contentDifferentiation,
  businessClaimsValid,
  renderable,
  indexabilityApproved,
  researchOnly = false,
  sitemapAllowlisted = false,
  policy = GEOGRAPHIC_INDEXABILITY_POLICY,
}) {
  const stages = [];
  const check = (name, passed, status, reason) => {
    stages.push({ name, passed });
    return passed ? null : {
      status,
      sitemapEligible: false,
      stages,
      reason,
    };
  };

  for (const [name, passed, reason] of [
    ['location-exists', locationExists === true, 'Location record is absent.'],
    ['hierarchy-valid', hierarchyValid === true, 'Location hierarchy is invalid.'],
    ['service-exists', serviceExists === true, 'Service intent is absent.'],
    ['service-compatible', serviceCompatible === true, 'Service is not valid for this jurisdiction.'],
    ['relationship-valid', relationshipValid === true, 'Business relationship is invalid.'],
    ['content-available', contentAvailable === true, 'Location/service content is unavailable.'],
  ]) {
    const failed = check(name, passed, 'NOT_SUPPORTED', reason);
    if (failed) return failed;
  }

  if (policy.requireContentDifferentiation
    && contentDifferentiation?.status !== 'PASSED') {
    const failed = check(
      'content-differentiation',
      false,
      researchOnly ? 'RESEARCH_ONLY' : 'CONTENT_DIFFERENTIATION_REQUIRED',
      contentDifferentiation?.reasons?.join(' ') || 'A passing similarity assessment is required.',
    );
    return failed;
  }
  stages.push({ name: 'content-differentiation', passed: true });

  const claimsFailed = check(
    'business-claims',
    businessClaimsValid === true,
    'NOT_SUPPORTED',
    'Business claims are not verified for this location.',
  );
  if (claimsFailed) return claimsFailed;

  const renderabilityFailed = check(
    'renderability',
    renderable === true,
    'NOINDEX',
    'The location/service content is not approved for rendering.',
  );
  if (renderabilityFailed) return renderabilityFailed;

  if (researchOnly) {
    const failed = check(
      'indexability-policy',
      false,
      'RESEARCH_ONLY',
      'The candidate remains research-only.',
    );
    return failed;
  }
  if (indexabilityApproved !== true) {
    const failed = check(
      'indexability-policy',
      false,
      'NOINDEX',
      'Indexability requires a separate explicit approval.',
    );
    return failed;
  }
  stages.push({ name: 'indexability-policy', passed: true });

  const sitemapEligible = policy.sitemapRequiresProductionAllowlist
    ? sitemapAllowlisted === true
    : true;
  stages.push({ name: 'production-sitemap-allowlist', passed: sitemapEligible });
  return {
    status: 'INDEXABLE',
    sitemapEligible,
    stages,
    reason: sitemapEligible
      ? 'All pipeline checks passed and the route is explicitly allowlisted.'
      : 'Page approval does not add it to the production sitemap allowlist.',
  };
}
