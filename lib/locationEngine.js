import {
  getApprovedLocationServiceRoutes,
  getLocationServiceContent,
  isLocationServiceIndexable,
} from './locationSeo.js';
import { LOCATIONS } from '../data/location-seo/locations.js';
import { SERVICES } from '../data/location-seo/services.js';
import {
  GEOGRAPHIC_LEVELS as DATA_GEOGRAPHIC_LEVELS,
  LOCATION_RELATIONSHIPS as DATA_LOCATION_RELATIONSHIPS,
  POSTAL_TYPE_ALIASES as DATA_POSTAL_TYPE_ALIASES,
  resolveByAlias,
  resolveByPostalCode,
  resolveBySlug,
  resolveCity,
  resolveCountry,
  resolveCounty,
  resolveGeographicRecord,
  resolveHierarchy,
  resolveLocality,
  resolveState,
  validateGeographicData,
} from './geographicData.js';
import { evaluateLocationIndexabilityPipeline } from './locationIndexabilityPolicy.js';
import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';

export {
  resolveByAlias,
  resolveByPostalCode,
  resolveBySlug,
  resolveCity,
  resolveCountry,
  resolveCounty,
  resolveLocality,
  resolveState,
};

export const GEOGRAPHIC_LEVELS = DATA_GEOGRAPHIC_LEVELS;
export const POSTAL_TYPE_ALIASES = DATA_POSTAL_TYPE_ALIASES;
export const LOCATION_RELATIONSHIPS = DATA_LOCATION_RELATIONSHIPS;

export const LOCATION_TEMPLATE_TYPES = [
  'local-service',
  'aviation-location-information',
  'aviation-intent-guidance',
];

export const LOCATION_INDEXABILITY_STATES = [
  'INDEXABLE',
  'NOINDEX',
  'INFORMATIONAL',
  'NOT_SUPPORTED',
  'DRAFT',
  'RESEARCH_ONLY',
  'CONTENT_DIFFERENTIATION_REQUIRED',
];

const INDEXABLE_ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
const NON_INDEXABLE_ROBOTS = 'noindex, follow';
const GEOGRAPHIC_TYPE_ALIASES = {
  zip: 'postal-area',
  'zip-code': 'postal-area',
  pin: 'postal-area',
  'pin-code': 'postal-area',
  'postal-code': 'postal-area',
  postcode: 'postal-area',
};
function normalizeKey(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function normalizeGeographicType(type) {
  const normalized = normalizeKey(type);
  return GEOGRAPHIC_TYPE_ALIASES[normalized] || normalized;
}

function normalizeRelationship(relationship) {
  const normalized = normalizeKey(relationship).replace(/_/g, '-');
  return LOCATION_RELATIONSHIPS.includes(normalized) ? normalized : null;
}

export function resolveLocation(slug, locations = LOCATIONS) {
  return resolveGeographicRecord(slug, locations);
}

export function resolveServiceIntent(slug, services = SERVICES) {
  const key = normalizeKey(slug);
  return services.find((service) => normalizeKey(service.slug) === key) || null;
}

function resolveExplicitHierarchy(location, locations) {
  return resolveHierarchy(location, locations);
}

function legacyHierarchy(location) {
  const country = location.country || location.countryName;
  const region = location.province || location.state || location.region;
  const city = location.city || location.town;
  const terminalName = location.name || city || location.locality;
  const terminalType = location.geographicType
    || location.locationType
    || (location.postalCode ? 'postal-area' : 'city');

  if (!country || !terminalName) return [];
  const regulatoryContext = Object.values(AVIATION_REGULATORY_CONTEXTS)
    .find((context) => normalizeKey(context.country) === normalizeKey(country)) || null;

  const chain = [{
    id: `legacy-country:${normalizeKey(country)}`,
    slug: normalizeKey(country).replace(/\s+/g, '-'),
    name: country,
    type: 'country',
    regulatoryContext,
  }];

  const regionDiffersFromTerminal = region
    && normalizeKey(region) !== normalizeKey(terminalName);
  const terminalIsLocal = [
    'locality',
    'neighborhood',
    'postal-area',
    'postal-code',
    'postcode',
    'zip-code',
    'pin-code',
  ].includes(normalizeGeographicType(terminalType));

  if (regionDiffersFromTerminal || (region && terminalIsLocal)) {
    chain.push({
      id: `legacy-region:${normalizeKey(country)}:${normalizeKey(region)}`,
      slug: normalizeKey(region).replace(/\s+/g, '-'),
      name: region,
      type: location.regionType || (location.province ? 'province' : 'state'),
    });
  }

  if (terminalIsLocal && city && normalizeKey(city) !== normalizeKey(region)
    && normalizeKey(city) !== normalizeKey(terminalName)) {
    chain.push({
      id: `legacy-city:${normalizeKey(country)}:${normalizeKey(city)}`,
      slug: normalizeKey(city).replace(/\s+/g, '-'),
      name: city,
      type: 'city',
    });
  }

  if (normalizeKey(chain[chain.length - 1].name) !== normalizeKey(terminalName)
    || chain[chain.length - 1].type !== terminalType) {
    chain.push({
      id: location.id || `legacy-location:${normalizeKey(location.slug || terminalName)}`,
      slug: location.slug || normalizeKey(terminalName).replace(/\s+/g, '-'),
      name: terminalName,
      type: terminalType,
      parentId: chain[chain.length - 1].id,
    });
  }

  return chain;
}

export function resolveLocationHierarchy(locationOrSlug, locations = LOCATIONS) {
  const location = typeof locationOrSlug === 'string'
    ? resolveLocation(locationOrSlug, locations)
    : locationOrSlug;
  if (!location) return null;

  const hasExplicitParent = (location.parentId !== undefined && location.parentId !== null)
    || (location.parentSlug !== undefined && location.parentSlug !== null);
  const hasGeographicType = GEOGRAPHIC_LEVELS.includes(normalizeGeographicType(location.type));

  if (hasExplicitParent || hasGeographicType) {
    return resolveExplicitHierarchy(location, locations);
  }

  return legacyHierarchy(location);
}

export function validateGeographicNodes(locations) {
  return validateGeographicData(locations);
}

export function resolveLocationRelationship(location, locations = LOCATIONS) {
  const hierarchy = resolveLocationHierarchy(location, locations) || [];
  for (let index = hierarchy.length - 1; index >= 0; index -= 1) {
    const relationship = normalizeRelationship(hierarchy[index].relationship);
    if (relationship) return relationship;
  }
  return 'informational';
}

export function resolveRegulatoryContext(location, locations = LOCATIONS) {
  const hierarchy = resolveLocationHierarchy(location, locations) || [];
  const country = hierarchy.find(({ type }) => normalizeGeographicType(type) === 'country');
  for (let index = hierarchy.length - 1; index >= 0; index -= 1) {
    const context = hierarchy[index].regulatoryContext;
    if (context?.authority) {
      return {
        ...context,
        country: context.country || country?.name || hierarchy[index].name,
        countrySlug: country?.slug || null,
      };
    }
  }
  const context = AVIATION_REGULATORY_CONTEXTS[country?.name]
    || Object.values(AVIATION_REGULATORY_CONTEXTS)
      .find(({ countryCode }) => countryCode && countryCode === country?.countryCode);
  return context
    ? { ...context, countrySlug: country?.slug || null }
    : null;
}

export function resolveVerifiedLocationFacts(location, locations = LOCATIONS) {
  const hierarchy = resolveLocationHierarchy(location, locations) || [];
  return hierarchy.flatMap((node) => (
    (node.verifiedFacts || [])
      .filter((fact) => fact?.verified === true && typeof fact.text === 'string' && fact.text.trim())
      .map((fact) => ({
        ...fact,
        sourceLocation: node.name,
        sourceLocationSlug: node.slug,
        inherited: node.slug !== location?.slug,
      }))
  ));
}

function serviceMatchesJurisdiction(service, regulatoryContext, location, content) {
  const informationalMarketGuide = service.slug === 'pilot-training'
    && location?.relationship === 'informational'
    && content?.pagePurpose === 'aviation-location-information'
    && content.localAviationProfile?.aviationAuthority?.authority
      === regulatoryContext?.authority
    && content.localAviationProfile?.aviationAuthority?.countryCode
      === regulatoryContext?.countryCode
    && location.countryCode === regulatoryContext?.countryCode;
  if (informationalMarketGuide) return true;
  if (!service.regulatoryJurisdiction) return true;
  const expected = normalizeKey(service.regulatoryJurisdiction);
  return expected === normalizeKey(regulatoryContext?.country)
    || expected === normalizeKey(regulatoryContext?.countrySlug)
    || expected === normalizeKey(regulatoryContext?.jurisdiction);
}

function supportedCombination(location, service, content, locations = LOCATIONS) {
  const regulatoryContext = resolveRegulatoryContext(location, locations);
  const relationship = resolveLocationRelationship(location, locations);
  return Boolean(location && service
    && location.supportedServices?.includes(service.slug)
    && content
    && relationship !== 'unsupported'
    && serviceMatchesJurisdiction(service, regulatoryContext, location, content));
}

export function resolveIndexability(
  location,
  service,
  content,
  locations = LOCATIONS,
  contentDifferentiation = null,
) {
  if (!location || !service
    || location.renderable === false
    || service.renderable === false
    || !supportedCombination(location, service, content, locations)) {
    return 'NOT_SUPPORTED';
  }
  if (resolveLocationRelationship(location, locations) === 'research-only') {
    return 'RESEARCH_ONLY';
  }
  if (contentDifferentiation
    && contentDifferentiation.status !== 'PASSED') {
    return contentDifferentiation.status === 'RESEARCH_ONLY'
      ? 'RESEARCH_ONLY'
      : 'CONTENT_DIFFERENTIATION_REQUIRED';
  }

  const explicitState = String(
    location.indexabilityState
      || location.indexability
      || '',
  ).toUpperCase().replace(/-/g, '_');
  if (LOCATION_INDEXABILITY_STATES.includes(explicitState)) {
    return explicitState;
  }

  if (location.indexabilityReview?.status === 'research-only'
    || location.indexabilityReview?.status === 'RESEARCH_ONLY') {
    return 'RESEARCH_ONLY';
  }
  if (location.indexabilityReview?.status === 'draft'
    || location.indexabilityReview?.status === 'DRAFT') {
    return 'DRAFT';
  }
  if (service.indexable !== true) {
    return 'NOINDEX';
  }
  if (location.indexable === true && isLocationServiceIndexable(location, service)) {
    return 'INDEXABLE';
  }
  if (resolveLocationRelationship(location, locations) === 'informational') return 'INFORMATIONAL';
  return 'NOINDEX';
}

export function resolveLocationService(location, service, locations = LOCATIONS) {
  const content = getLocationServiceContent(location, service);
  const canRender = Boolean(location
    && service
    && location.renderable !== false
    && service.renderable !== false
    && supportedCombination(location, service, content, locations));
  const indexability = resolveIndexability(location, service, content, locations);

  return {
    canRender,
    supportStatus: canRender ? 'SUPPORTED' : 'NOT_SUPPORTED',
    renderStatus: canRender ? 'RENDERABLE' : 'NOT_RENDERABLE',
    indexability,
    content: canRender ? content : null,
    template: canRender ? resolveContentTemplate(location, service, locations) : null,
  };
}

export function resolveContentTemplate(location, service, locations = LOCATIONS) {
  const result = resolveLocationServiceWithoutTemplate(location, service, locations);
  if (!result.canRender) return null;

  if (LOCATION_TEMPLATE_TYPES.includes(service.templateType)) {
    return service.templateType;
  }
  const relationship = resolveLocationRelationship(location, locations);
  if (relationship === 'informational') {
    return 'aviation-location-information';
  }
  if (relationship !== 'physical'
    && (service.intentType === 'guidance' || service.slug === 'pilot-training')) {
    return 'aviation-intent-guidance';
  }
  return 'local-service';
}

function resolveLocationServiceWithoutTemplate(location, service, locations = LOCATIONS) {
  const content = getLocationServiceContent(location, service);
  return {
    canRender: Boolean(location
      && service
      && location.renderable !== false
      && service.renderable !== false
      && supportedCombination(location, service, content, locations)),
  };
}

function formatGeographicTemplate(template, location, hierarchy = [], service = null) {
  const ancestorOfType = (types) => [...hierarchy].reverse()
    .find(({ type }) => types.includes(normalizeGeographicType(type)))?.name || '';
  const locationType = normalizeGeographicType(location?.type || location?.locationType);
  const values = {
    city: location?.city || (locationType === 'city' ? location?.name : ''),
    county: ancestorOfType(['county', 'district']),
    locality: ['locality', 'neighborhood', 'postal-area'].includes(locationType)
      ? location?.name || ''
      : '',
    location: location?.name || location?.city || '',
    country: ancestorOfType(['country']) || location?.country || '',
    state: location?.state || ancestorOfType(['state', 'province', 'region']),
    service: service?.shortName || service?.name || '',
  };
  const locality = values.state && normalizeKey(values.state) !== normalizeKey(values.city)
    ? `${values.city}, ${values.state}`
    : values.city;
  return String(template || '')
    .replace(/\{city\},\s*\{state\}/gi, locality)
    .replace(/\{([a-z]+)\}/gi, (match, key) => (
    Object.hasOwn(values, key.toLowerCase()) ? values[key.toLowerCase()] : match
    ));
}

function hasVerifiedPhysicalPresence(location) {
  return location?.physicalAcademy === true
    || location?.physicalPresence?.verified === true;
}

export function findUnsupportedBusinessClaims(location, content) {
  const strings = [];
  const visit = (value) => {
    if (typeof value === 'string') strings.push(value);
    else if (Array.isArray(value)) value.forEach(visit);
    else if (value && typeof value === 'object') Object.values(value).forEach(visit);
  };
  visit(content);

  const text = strings.join('\n');
  const claims = [
    {
      type: 'branch',
      expression: /We One Aviation\s+(?:has|operates|runs|maintains)\s+(?:a|an)\s+(?:(?:physical|local)\s+)?branch\b/i,
      verified: location?.verifiedBusinessClaims?.includes('branch') === true,
    },
    {
      type: 'classroom',
      expression: /We One Aviation\s+(?:has|operates|runs|maintains)\s+(?:a|an)\s+(?:(?:physical|local)\s+)?classroom\b/i,
      verified: hasVerifiedPhysicalPresence(location),
    },
    {
      type: 'FTO',
      expression: /We One Aviation\s+(?:operates|runs|owns|maintains)\s+(?:a|an)?\s*(?:DGCA-approved\s+)?(?:FTO|flying training organis[sz]ation|flying school)\b/i,
      verified: location?.operatesFto === true
        && location?.verifiedBusinessClaims?.includes('fto') === true,
    },
  ];
  return claims
    .filter(({ expression, verified }) => expression.test(text) && !verified)
    .map(({ type }) => type);
}

function getRelationshipGuidance(location, relationship) {
  if (relationship === 'physical') {
    return hasVerifiedPhysicalPresence(location)
      ? 'A physical teaching relationship is recorded for this location; use only its verified premises details.'
      : 'The relationship is marked physical, but no verified premises details are attached. Do not infer a branch, classroom or flying school.';
  }
  if (relationship === 'online') {
    return 'This is an online service relationship; it does not imply a local office, classroom or flying school.';
  }
  if (relationship === 'service-area') {
    return 'This is a service-area relationship; it does not imply a local office, classroom or flying school.';
  }
  return 'This is location-specific informational guidance, not a claim of a local office, classroom or flying school.';
}

export function buildLocationMetadata({
  location,
  service,
  content = getLocationServiceContent(location, service),
  siteOrigin = 'https://weoneaviation.in',
  locations = LOCATIONS,
  contentDifferentiation = null,
}) {
  const hierarchy = resolveLocationHierarchy(location, locations) || [];
  const indexability = resolveIndexability(
    location,
    service,
    content,
    locations,
    contentDifferentiation,
  );
  const isSupported = indexability !== 'NOT_SUPPORTED';
  const title = !isSupported
    ? `${location?.name || 'Location'} aviation guidance | We One Aviation`
    : content?.seoTitle
    || (location && service
      ? formatGeographicTemplate(
        service.titleTemplate || `${service.shortName || service.name} in {location} | We One Aviation`,
        location,
        hierarchy,
        service,
      )
      : 'Aviation training guidance | We One Aviation');
  const description = !isSupported
    ? `Service availability for ${location?.name || 'this location'} has not been verified.`
    : content?.seoDescription
    || content?.introduction
    || (service?.descriptionTemplate && location
      ? formatGeographicTemplate(service.descriptionTemplate, location, hierarchy, service)
      : null)
    || 'Aviation training information from We One Aviation.';
  const h1 = !isSupported
    ? `Aviation guidance for ${location?.name || 'this location'}`
    : content?.h1
    || formatGeographicTemplate(
      service?.h1Template || '{service} guidance for {location}',
      location,
      hierarchy,
      service,
    );
  const route = location && service
    ? `/${location.slug}/${service.slug}`
    : '/';

  return {
    title,
    description,
    canonical: `${siteOrigin.replace(/\/+$/, '')}${route}`,
    robots: indexability === 'INDEXABLE' ? INDEXABLE_ROBOTS : NON_INDEXABLE_ROBOTS,
    indexability,
    h1,
  };
}

export function buildLocationPageModel({
  location,
  service,
  content = getLocationServiceContent(location, service),
  siteOrigin = 'https://weoneaviation.in',
  locations = LOCATIONS,
  contentDifferentiation = null,
  geographicDataValidated = false,
}) {
  const effectiveContentDifferentiation = contentDifferentiation
    || location?.contentDifferentiation
    || null;
  const resolution = resolveLocationService(location, service, locations);
  const hierarchy = resolveLocationHierarchy(location, locations) || [];
  const relationship = resolveLocationRelationship(location, locations);
  const verifiedFacts = resolveVerifiedLocationFacts(location, locations);
  const regulatoryContext = resolveRegulatoryContext(location, locations);
  const unsupportedClaims = findUnsupportedBusinessClaims(location, {
    content,
    service,
    localSections: location?.localSections,
    verifiedFacts,
  });
  if (unsupportedClaims.length) {
    throw new Error(
      `Unsupported We One Aviation business claims for "${location?.slug || 'unknown'}": ${unsupportedClaims.join(', ')}.`,
    );
  }
  const pageContent = resolution.canRender ? content : null;
  const metadata = buildLocationMetadata({
    location,
    service,
    content: pageContent,
    siteOrigin,
    locations,
    contentDifferentiation: effectiveContentDifferentiation,
  });
  const faqs = [
    ...(pageContent?.faqs || []),
    ...(location?.localFAQs || []),
  ].filter((faq, index, allFaqs) => (
    allFaqs.findIndex((item) => item.question === faq.question) === index
  ));
  const relationshipGuidance = getRelationshipGuidance(location, relationship);
  const hasDirectFacts = verifiedFacts.some((fact) => !fact.inherited);
  const inheritedFactNotice = !hasDirectFacts && verifiedFacts.length
    ? `No location-specific aviation facts are recorded for ${location.name || location.city}. The following verified context is inherited from ${[...new Set(verifiedFacts.map(({ sourceLocation }) => sourceLocation))].join(', ')}.`
    : null;
  const serviceGuidance = regulatoryContext?.country === 'India'
    ? [
      service.serviceExplanation,
      service.dgcaPathway,
      service.eligibility,
      ...(service.flightTrainingApplicable ? [service.flightTrainingPathway] : []),
    ].filter(Boolean)
    : [];
  const renderedBody = [
    metadata.h1,
    pageContent?.introduction,
    pageContent?.localApplication || pageContent?.localContext,
    ...serviceGuidance,
    pageContent?.relationshipStatement || relationshipGuidance,
    inheritedFactNotice,
    ...verifiedFacts.map(({ text }) => text),
    regulatoryContext?.authority
      ? `The aviation regulatory authority recorded for ${regulatoryContext.country} is ${regulatoryContext.authority}.`
      : null,
    ...faqs.flatMap(({ question, answer }) => [question, answer]),
  ].filter(Boolean);
  const routePath = location && service ? `/${location.slug}/${service.slug}` : '';
  const currentRouteAllowlisted = Boolean(
    resolution.canRender
    && routePath
    && getApprovedLocationServiceRoutes().includes(routePath)
    && isLocationServiceIndexable(location, service),
  );
  const isDifferentiationExemptRoute = GEOGRAPHIC_INDEXABILITY_POLICY
    .existingDifferentiationExemptRoutes.includes(routePath);
  const requiresDifferentiation = Boolean(effectiveContentDifferentiation)
    || (location?.testOnly !== true && !isDifferentiationExemptRoute);
  const indexabilityPipeline = requiresDifferentiation
    ? evaluateLocationIndexabilityPipeline({
      locationExists: Boolean(location),
      hierarchyValid: hierarchy.length > 0 && geographicDataValidated,
      serviceExists: Boolean(service),
      serviceCompatible: Boolean(
        content
        && location?.supportedServices?.includes(service?.slug)
        && serviceMatchesJurisdiction(service, regulatoryContext, location, content),
      ),
      relationshipValid: Boolean(normalizeRelationship(location?.relationship) || !location?.relationship),
      contentAvailable: Boolean(pageContent),
      contentDifferentiation: effectiveContentDifferentiation,
      businessClaimsValid: unsupportedClaims.length === 0,
      renderable: resolution.canRender,
      indexabilityApproved: metadata.indexability === 'INDEXABLE',
      researchOnly: metadata.indexability === 'RESEARCH_ONLY',
      sitemapAllowlisted: currentRouteAllowlisted,
    })
    : null;
  if (indexabilityPipeline) {
    metadata.indexability = indexabilityPipeline.status;
    metadata.robots = indexabilityPipeline.status === 'INDEXABLE'
      ? INDEXABLE_ROBOTS
      : NON_INDEXABLE_ROBOTS;
  }
  const productionSitemapEligible = Boolean(
    resolution.canRender
      && metadata.indexability === 'INDEXABLE'
      && currentRouteAllowlisted
      && (!requiresDifferentiation || indexabilityPipeline?.status === 'INDEXABLE')
  );

  return {
    ...resolution,
    indexability: metadata.indexability,
    metadata,
    relationship,
    relationshipGuidance,
    hierarchy,
    verifiedFacts,
    regulatoryContext,
    renderedBody,
    inheritedFactNotice,
    serviceGuidance,
    contentDifferentiation,
    indexabilityPipeline,
    unsupportedClaims,
    productionSitemapEligible,
    breadcrumbs: [
      {
        href: location?.authorityPath || '/pilot-training-in-india',
        label: location?.authorityLabel || location?.city || location?.name || 'Aviation',
      },
      {
        href: location && service ? `/${location.slug}/${service.slug}` : '/',
        label: pageContent?.breadcrumbLabel || service?.shortName || service?.name || 'Guidance',
      },
    ],
    links: pageContent?.internalLinks || [],
    faqs,
    schema: {
      pageType: 'WebPage',
      breadcrumbItems: [
        ...hierarchy.map(({ name }) => name),
        pageContent?.breadcrumbLabel || service?.shortName || service?.name || 'Guidance',
      ],
      faqItems: faqs,
      emitLocalBusiness: false,
    },
  };
}
