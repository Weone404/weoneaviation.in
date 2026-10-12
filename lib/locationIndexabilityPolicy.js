import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';
import { getGeographicDynamicServicePolicy } from '../data/location-seo/world-dynamic-service-policies.js';
import { isProductionRouteApproved } from '../data/location-seo/production-route-approvals.js';

export function isApprovedGeographicRoute(route, context = null) {
  return isProductionRouteApproved(route, context);
}

function nonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function sourceUrls(content) {
  return [...new Set((content?.sourceReferences || [])
    .map(({ href }) => href)
    .filter((href) => typeof href === 'string' && /^https:\/\//.test(href)))];
}

function geographicSignalsValid(location, content, quality) {
  const hierarchy = quality?.geographicHierarchy?.records
    || content?.locationAviationContent?.geographicContext
    || [];
  const hierarchyIds = hierarchy.map(({ id }) => id);
  const hierarchyLinksValid = hierarchy.every((node, index) => (
    typeof node.id === 'string'
    && nonEmpty(node.name)
    && (index === 0
      ? node.type === 'country' && node.countryCode === location?.countryCode
      : node.parentId === hierarchy[index - 1].id
        && node.countryCode === location?.countryCode)
  ));
  const trustedRegistrySource = location?.registrySource === 'GeoNames'
    ? location?.source === 'GeoNames'
      && /^https:\/\/www\.geonames\.org\/\d+\/$/.test(location?.sourceUrl || '')
    : location?.registrySource === 'ReviewedGlobalPilot'
      ? /^https:\/\//.test(location?.sourceUrl || '')
        && (location?.sourceLinks || []).some(({ href }) => /^https:\/\//.test(href || ''))
      : location?.registryRecordStatus === 'sourced'
        && hierarchy.some((node) => (
          node.id === location?.id
          && (/^https:\/\//.test(node.sourceUrl || '')
            || (node.sourceLinks || []).some(({ href }) => /^https:\/\//.test(href || '')))
        ));
  const administrativeTypes = new Set([
    'state',
    'province',
    'region',
    'county',
    'district',
    'territory',
  ]);
  return Boolean(
    quality?.geographicIdentity?.valid === true
    && quality?.geographicIdentity?.ambiguous !== true
    && quality?.geographicHierarchy?.valid === true
    && typeof location?.countryCode === 'string'
    && trustedRegistrySource
    && new Set(hierarchyIds).size === hierarchy.length
    && hierarchyLinksValid
    && (location.type === 'country'
      ? hierarchy.length === 1 && hierarchy[0]?.id === location.id
      : hierarchy.length >= 2
        && hierarchy[0]?.type === 'country'
        && hierarchy.at(-1)?.id === location.id
        && hierarchy.some(({ type }) => administrativeTypes.has(type))),
  );
}

function contentSignalsValid(location, service, content, quality) {
  const aviation = content?.locationAviationContent;
  const serviceContent = content?.serviceContent;
  const metadata = [content?.seoTitle, content?.seoDescription, content?.h1];
  const internalLinks = content?.internalLinks || [];
  const faqs = content?.faqs || [];
  const pilotTrainingPage = content?.locationPilotTrainingPage;
  const links = sourceUrls(content);
  const differentiation = quality?.differentiation;
  const minimumWords = GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minVisibleWords;
  const visibleText = pilotTrainingPage
    ? (pilotTrainingPage.visibleText || []).join(' ')
    : [
    ...metadata,
    content?.introduction,
    content?.localApplication,
    content?.relationshipStatement,
    aviation?.locationOverview,
    aviation?.aviationRelevance,
    ...(aviation?.aviationFacts || []).map(({ fact }) => fact),
    ...(aviation?.nearbyAviationHubs || []).map(({ fact, attributionNote }) => `${fact} ${attributionNote || ''}`),
    ...(content?.locationSpecificSections || []).flatMap(({ title, body }) => [title, body]),
    ...(content?.regionalContextSections || []).flatMap(({ title, body }) => [title, body]),
    ...faqs.flatMap(({ question, answer }) => [question, answer]),
    serviceContent?.explanation,
    serviceContent?.eligibility,
    serviceContent?.regulatoryPathway,
    serviceContent?.flightTrainingPathway,
    ...(serviceContent?.trainingProcess || []).flatMap(({ title, description }) => [title, description]),
  ].filter(nonEmpty).join(' ');
  const visibleWordCount = visibleText.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)?.length || 0;
  const expectedRoute = `/${location?.slug}/${service?.slug}`;
  const exactMetadata = new Set(metadata.map((value) => String(value || '').trim().toLowerCase()));
  const relationshipSafe = content?.relationship === 'informational'
    && content?.serviceRelationship?.serviceSlug === service?.slug
    && content?.serviceRelationship?.mode === 'informational'
    && content?.serviceRelationship?.localDeliveryVerified === false;

  return Boolean(
    location?.id
    && location?.registrySlug
    && service?.slug
    && getGeographicDynamicServicePolicy(service, location)
    && service?.renderable !== false
    && serviceContent?.serviceSlug === service.slug
    && content?.canonicalPath === expectedRoute
    && relationshipSafe
    && exactMetadata.size === metadata.length
    && metadata.every(nonEmpty)
    && metadata[0].includes(location.name)
    && metadata[0].toLowerCase().includes(service.shortName.toLowerCase())
    && visibleWordCount >= minimumWords
    && faqs.length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minFaqs
    && aviation?.geographicContext?.length >= (location.type === 'country' ? 1 : 2)
    && nonEmpty(aviation?.locationOverview)
    && nonEmpty(aviation?.aviationRelevance)
    && nonEmpty(aviation?.regulatoryContext?.authority)
    && /^https:\/\//.test(aviation?.regulatoryContext?.source || '')
    && sourceUrls(content).length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minSourceCount
    && links.length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minSourceCount
    && internalLinks.length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minInternalLinks
    && internalLinks.every(({ href }) => typeof href === 'string' && href.startsWith('/') && !href.startsWith('//'))
    && content?.jsonLdReady === true
    && differentiation?.status === 'PASSED'
    && differentiation?.differentiationStatus === 'DIFFERENTIATED'
    && differentiation?.exactDuplicate !== true
    && Number.isFinite(differentiation?.similarityScore)
    && differentiation.similarityScore < GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.maxNormalizedSimilarityPercent
    && differentiation.uniqueFAQCount >= GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.minUniqueFaqs
    && differentiation.uniqueSectionCount >= GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.minUniqueSections
    && differentiation.locationSpecificContentPercent
      >= GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.minLocationSpecificContentPercent
    && (service.slug !== 'pilot-training'
      || location?.countryCode !== 'IN'
      || pilotTrainingPage?.evidenceProfile?.level === 'STRONG')
    && quality?.unsupportedClaims?.length === 0
    && quality?.scores?.factualSafetyScore === 100
    && quality?.blockers?.length === 0
  );
}

export function isGeographicPageQualityEligible({ location, service, content, quality }) {
  return Boolean(
    geographicSignalsValid(location, content, quality)
    && contentSignalsValid(location, service, content, quality || content?.quality),
  );
}

export function isGeographicPageIndexable({ location, service, content, quality }) {
  return Boolean(
    isGeographicPageQualityEligible({ location, service, content, quality })
    && isApprovedGeographicRoute(content?.canonicalPath, {
      location,
      service,
      registryBacked: Boolean(location?.registryRecordId || location?.registrySlug),
    }),
  );
}

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
  registryBacked = false,
  location,
  service,
  content,
  quality,
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
    const failed = check(name, passed, registryBacked ? 'REJECTED' : 'NOT_SUPPORTED', reason);
    if (failed) return failed;
  }

  const differentiation = contentDifferentiation || quality?.differentiation;
  if (policy.requireContentDifferentiation && differentiation?.status !== 'PASSED') {
    const failed = check(
      'content-differentiation',
      false,
      registryBacked || !differentiation?.status
        ? 'NOINDEX'
        : 'CONTENT_DIFFERENTIATION_REQUIRED',
      differentiation?.reasons?.join(' ') || 'A passing similarity assessment is required.',
    );
    return failed;
  }
  stages.push({ name: 'content-differentiation', passed: true });

  const claimsFailed = check(
    'business-claims',
    businessClaimsValid === true && (quality?.unsupportedClaims || []).length === 0,
    registryBacked ? 'REJECTED' : 'NOT_SUPPORTED',
    'Business claims are not verified for this location.',
  );
  if (claimsFailed) return claimsFailed;

  const renderabilityFailed = check(
    'renderability',
    renderable === true,
    'REJECTED',
    'The location/service content is not approved for rendering.',
  );
  if (renderabilityFailed) return renderabilityFailed;

  if (registryBacked) {
    const geographyFailed = check(
      'geographic-identity-and-hierarchy',
      geographicSignalsValid(location, content, quality),
      quality?.geographicIdentity?.ambiguous ? 'AMBIGUOUS' : 'INVALID',
      'The registry identity, country or parent hierarchy is invalid.',
    );
    if (geographyFailed) return geographyFailed;

    if (!isGeographicPageQualityEligible({ location, service, content, quality })) {
      const blockers = quality?.blockers || [];
      const failed = check(
        'content-quality',
        false,
        quality?.state === 'REJECTED' ? 'REJECTED' : 'NOINDEX',
        blockers.join(' ') || 'Generated content does not meet the indexability quality threshold.',
      );
      return failed;
    }
    stages.push({ name: 'content-quality', passed: true });
    const approvalFailed = check(
      'production-route-approval',
      isApprovedGeographicRoute(content?.canonicalPath, {
        location,
        service,
        registryBacked,
      }),
      'NOINDEX',
      'Page did not satisfy the production publication policy.',
    );
    if (approvalFailed) return approvalFailed;
    stages.push({ name: 'indexability-policy', passed: true });
    stages.push({ name: 'sitemap-eligibility', passed: true });
    return {
      status: 'INDEXABLE',
      sitemapEligible: true,
      stages,
      reason: 'Registry identity, safety, generated content and differentiation passed the quality gate.',
    };
  }

  if (researchOnly || indexabilityApproved !== true) {
    const failed = check(
      'indexability-policy',
      false,
      researchOnly ? 'RESEARCH_ONLY' : 'NOINDEX',
      researchOnly
        ? 'The legacy candidate remains research-only.'
        : 'Legacy indexability requires its existing explicit approval.',
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
      ? 'Legacy approval and sitemap eligibility checks passed.'
      : 'Legacy page approval does not add it to the production sitemap allowlist.',
  };
}
