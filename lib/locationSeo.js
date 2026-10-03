import {
  INDIA_CITY_MEDICAL_REFERENCE_SLUGS,
  INDIA_HUB_LOCATION_GUIDE_SLUGS,
  LOCATIONS,
  LOCATION_RELATIONSHIPS,
  LOCATION_SITEMAP_SLUGS,
  LOCATION_TYPES,
} from '../data/location-seo/locations.js';
import { SERVICES } from '../data/location-seo/services.js';
import { INTERNATIONAL_LOCATION_CANDIDATES } from '../data/location-seo/international-candidates.js';

export {
  INDIA_CITY_MEDICAL_REFERENCE_SLUGS,
  INDIA_HUB_LOCATION_GUIDE_SLUGS,
  LOCATION_SITEMAP_SLUGS,
};
export { INTERNATIONAL_LOCATION_CANDIDATES };

export function getLocationBySlug(slug) {
  return LOCATIONS.find((location) => location.slug === slug) || null;
}

export function getRelatedLocations(location) {
  if (!location || !Array.isArray(location.relatedLocations)) return [];
  return location.relatedLocations
    .map((slug) => getLocationBySlug(slug))
    .filter(Boolean);
}

export function getServiceBySlug(slug) {
  return SERVICES.find((service) => service.slug === slug) || null;
}

export function getRelatedServices(service) {
  if (!service || !Array.isArray(service.relatedServices)) return [];
  return service.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);
}

export function getLocationServiceContent(location, service) {
  if (!location || !service) return null;
  return location.serviceContent?.[service.slug] || null;
}

export function isLocationServiceIndexable(location, service) {
  if (!location || !service || location.indexable !== true || service.indexable !== true) {
    return false;
  }
  const relationship = String(location.relationship || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
  if (relationship === 'research-only' || relationship === 'unsupported') return false;

  return Array.isArray(location.supportedServices)
    && location.supportedServices.includes(service.slug)
    && Boolean(getLocationServiceContent(location, service));
}

export function getIndexableLocationServicePairs() {
  const errors = validateLocationServiceData();
  if (errors.length) {
    throw new Error(`Invalid location-service data:\n${errors.join('\n')}`);
  }

  return LOCATIONS.flatMap((location) => SERVICES
    .filter((service) => isLocationServiceIndexable(location, service))
    .map((service) => ({ location, service })));
}

export function getApprovedLocationServicePairs() {
  const approvedLocationSlugs = new Set(LOCATION_SITEMAP_SLUGS);
  return getIndexableLocationServicePairs()
    .filter(({ location }) => approvedLocationSlugs.has(location.slug));
}

export function getApprovedLocationServiceRoutes() {
  return getApprovedLocationServicePairs()
    .map(({ location, service }) => `/${location.slug}/${service.slug}`);
}

export function getIndexableLocationServiceRoutes() {
  return getIndexableLocationServicePairs()
    .map(({ location, service }) => `/${location.slug}/${service.slug}`);
}

export function getRejectedLocationServiceCombinations() {
  return LOCATIONS.flatMap((location) => SERVICES
    .filter((service) => !location.supportedServices.includes(service.slug))
    .map((service) => ({
      location,
      service,
      reason: location.rejectedServices[service.slug],
    })));
}

export function formatLocationServiceTemplate(template, location) {
  const locality = location.state.toLowerCase() === location.city.toLowerCase()
    ? location.city
    : `${location.city}, ${location.state}`;

  return template
    .replace(/\{city\},\s*\{state\}/g, locality)
    .replace(/\{city\}/g, location.city)
    .replace(/\{state\}/g, location.state)
    .replace(/\{country\}/g, location.country);
}

export function validateLocationServiceData() {
  const errors = [];
  const locationSlugs = new Set();
  const serviceSlugs = new Set();
  const validRelationships = new Set(LOCATION_RELATIONSHIPS);
  const validLocationTypes = new Set(LOCATION_TYPES);

  for (const service of SERVICES) {
    if (!service.slug || serviceSlugs.has(service.slug)) {
      errors.push(`Service slug "${service.slug || '(missing slug)'}" is missing or duplicated.`);
    }
    serviceSlugs.add(service.slug);

    if (!service.slug || !service.name || !service.shortName || !service.searchIntent
      || !service.titleTemplate || !service.descriptionTemplate || !service.h1Template
      || typeof service.indexable !== 'boolean'
      || !service.serviceExplanation || !service.dgcaPathway || !service.eligibility
      || !Array.isArray(service.trainingProcess)
      || service.trainingProcess.some((step) => !step.title || !step.description)
      || typeof service.flightTrainingApplicable !== 'boolean'
      || !service.flightTrainingPathway || !service.whyThisOption
      || !Array.isArray(service.relatedServices)) {
      errors.push(`Service "${service.slug || '(missing slug)'}" is missing required fields.`);
    }
  }

  for (const service of SERVICES) {
    if ((service.relatedServices || []).some((slug) => (
      slug === service.slug || !serviceSlugs.has(slug)
    ))) {
      errors.push(`Service "${service.slug}" references invalid related services.`);
    }
  }

  for (const location of LOCATIONS) {
    if (!location.slug || locationSlugs.has(location.slug)) {
      errors.push(`Location slug "${location.slug || '(missing slug)'}" is missing or duplicated.`);
    }
    locationSlugs.add(location.slug);

    if (!location.city || !location.state || !location.country || !location.stateSlug
      || !location.countrySlug || !location.authorityPath) {
      errors.push(`Location "${location.slug}" is missing geographic identity fields.`);
    }
    if (!validLocationTypes.has(location.locationType)) {
      errors.push(`Location "${location.slug}" has an unsupported locationType.`);
    }
    if (!validRelationships.has(location.relationship)) {
      errors.push(`Location "${location.slug}" has an unsupported relationship.`);
    }
    if (typeof location.physicalAcademy !== 'boolean'
      || typeof location.onlineTraining !== 'boolean'
      || typeof location.flightTrainingGuidance !== 'boolean'
      || typeof location.indexable !== 'boolean') {
      errors.push(`Location "${location.slug}" is missing boolean availability or indexability fields.`);
    }
    if (location.indexable === false
      && (location.supportedServices?.length !== 0
        || location.indexabilityReview?.status !== 'not-approved'
        || !location.indexabilityReview.reason)) {
      errors.push(`Non-indexable location "${location.slug}" must have no supported services and an explicit review reason.`);
    }
    if (location.indexable === true && location.indexabilityReview) {
      errors.push(`Indexable location "${location.slug}" must not carry a non-approved indexability review.`);
    }
    if (!Array.isArray(location.supportedServices)
      || location.supportedServices.some((slug) => !serviceSlugs.has(slug))) {
      errors.push(`Location "${location.slug}" references an unknown service.`);
    }
    if (!location.rejectedServices || typeof location.rejectedServices !== 'object') {
      errors.push(`Location "${location.slug}" must explain every unsupported service.`);
    } else {
      for (const serviceSlug of Object.keys(location.rejectedServices)) {
        if (!serviceSlugs.has(serviceSlug) || location.supportedServices?.includes(serviceSlug)
          || !location.rejectedServices[serviceSlug]) {
          errors.push(`Location "${location.slug}" has an invalid rejection reason for "${serviceSlug}".`);
        }
      }
      for (const service of SERVICES) {
        if (!location.supportedServices?.includes(service.slug)
          && !location.rejectedServices[service.slug]) {
          errors.push(`Location "${location.slug}" is missing a rejection reason for "${service.slug}".`);
        }
      }
    }

    if (!Array.isArray(location.nearbyLocations)) {
      errors.push(`Location "${location.slug}" must provide a nearbyLocations array.`);
    }
    if (!Array.isArray(location.relatedLocations)
      || location.relatedLocations.some((slug) => slug === location.slug || !LOCATIONS.some((candidate) => candidate.slug === slug))) {
      errors.push(`Location "${location.slug}" has invalid related locations.`);
    }
    if (!Array.isArray(location.localFAQs)
      || location.localFAQs.some((faq) => !faq.question || !faq.answer)) {
      errors.push(`Location "${location.slug}" must provide complete local FAQs.`);
    }
    if (location.indexable && (!Array.isArray(location.localSections)
      || location.localSections.length === 0
      || location.localSections.some((section) => !section.title || !section.body
        || (section.items && (!Array.isArray(section.items)
          || section.items.some((item) => !item.label || !item.detail)))))) {
      errors.push(`Indexable location "${location.slug}" must provide complete structured local-content sections.`);
    }
    if (location.indexable && location.relationship === 'informational'
      && (!Array.isArray(location.sourceLinks) || location.sourceLinks.length === 0
        || !location.localSections.some((section) => Array.isArray(section.items) && section.items.length > 0))) {
      errors.push(`Informational location "${location.slug}" needs source-linked local facts before indexing.`);
    }
    if (!Array.isArray(location.sourcePages)
      || location.sourcePages.some((sourcePage) => !sourcePage.startsWith('/'))) {
      errors.push(`Location "${location.slug}" must reference its supporting project pages.`);
    }
    if (location.sourceLinks && (!Array.isArray(location.sourceLinks)
      || location.sourceLinks.some((source) => !source.label || !/^https:\/\//.test(source.href)))) {
      errors.push(`Location "${location.slug}" has an invalid external source link.`);
    }

    for (const serviceSlug of location.supportedServices || []) {
      const content = location.serviceContent?.[serviceSlug];
      if (!content) {
        errors.push(`Location "${location.slug}" is missing content for supported service "${serviceSlug}".`);
        continue;
      }
      if (!content.introduction || !content.localContext || !content.trainingMode
        || !Array.isArray(content.faqs) || content.faqs.some((faq) => !faq.question || !faq.answer)
        || !Array.isArray(content.internalLinks)
        || content.internalLinks.some((link) => !link.context || !link.label || !link.href
          || !link.href.startsWith('/')
          || link.href.startsWith('//'))
        || !content.cta?.label || !content.cta?.href) {
        errors.push(`Location "${location.slug}" has incomplete content for service "${serviceSlug}".`);
      }
      if (content.seoTitle !== undefined && (!content.seoTitle || !content.seoDescription || !content.h1)) {
        errors.push(`Location "${location.slug}" has incomplete custom SEO metadata for "${serviceSlug}".`);
      }
    }

    for (const serviceSlug of Object.keys(location.serviceContent || {})) {
      if (!location.supportedServices?.includes(serviceSlug)) {
        errors.push(`Location "${location.slug}" has content for unsupported service "${serviceSlug}".`);
      }
    }

    for (const nearbySlug of location.nearbyLocations || []) {
      if (!locationSlugs.has(nearbySlug) && !LOCATIONS.some((candidate) => candidate.slug === nearbySlug)) {
        errors.push(`Location "${location.slug}" references unknown nearby location "${nearbySlug}".`);
      }
    }

    if (location.physicalAcademy && location.relationship !== 'physical') {
      errors.push(`Location "${location.slug}" claims a physical academy with a non-physical relationship.`);
    }
  }

  for (const candidate of INTERNATIONAL_LOCATION_CANDIDATES) {
    if (!candidate.slug || locationSlugs.has(candidate.slug)
      || INTERNATIONAL_LOCATION_CANDIDATES
        .filter((item) => item.slug === candidate.slug).length !== 1) {
      errors.push(`International candidate slug "${candidate.slug || '(missing slug)'}" is missing or duplicated.`);
    }
    if (!candidate.city || !candidate.state || !candidate.country
      || !candidate.stateSlug || !candidate.countrySlug
      || candidate.locationType !== 'city'
      || candidate.relationship !== 'informational'
      || candidate.physicalAcademy !== false
      || candidate.onlineTraining !== false
      || candidate.flightTrainingGuidance !== false
      || candidate.indexable !== false
      || !Array.isArray(candidate.supportedServices)
      || candidate.supportedServices.length !== 0
      || !Array.isArray(candidate.nearbyLocations)
      || !Array.isArray(candidate.relatedLocations)
      || !Array.isArray(candidate.localFAQs)
      || !Array.isArray(candidate.sourcePages)
      || !candidate.sourcePages.length) {
      errors.push(`International candidate "${candidate.slug}" has invalid or incomplete non-indexable fields.`);
    }
    if (candidate.indexabilityReview?.status !== 'not-approved'
      || !candidate.indexabilityReview.reason
      || candidate.indexabilityReview.onlineAvailabilityVerified !== false
      || candidate.indexabilityReview.physicalPresenceVerified !== false) {
      errors.push(`International candidate "${candidate.slug}" must explicitly document its non-indexable review.`);
    }
    if (!candidate.rejectedServices
      || SERVICES.some((service) => !candidate.rejectedServices[service.slug])
      || Object.keys(candidate.rejectedServices).some((slug) => !serviceSlugs.has(slug))) {
      errors.push(`International candidate "${candidate.slug}" must explain every rejected service.`);
    }
    if (LOCATION_SITEMAP_SLUGS.includes(candidate.slug)) {
      errors.push(`International candidate "${candidate.slug}" must not be allowed into the sitemap.`);
    }
  }

  for (const [label, slugs] of [
    ['sitemap', LOCATION_SITEMAP_SLUGS],
    ['India hub guide', INDIA_HUB_LOCATION_GUIDE_SLUGS],
    ['India city medical reference', INDIA_CITY_MEDICAL_REFERENCE_SLUGS],
  ]) {
    if (new Set(slugs).size !== slugs.length
      || slugs.some((slug) => !locationSlugs.has(slug))) {
      errors.push(`The ${label} location allowlist contains an unknown or duplicate slug.`);
    }
  }

  for (const slug of [...LOCATION_SITEMAP_SLUGS, ...INDIA_HUB_LOCATION_GUIDE_SLUGS]) {
    if (!getLocationBySlug(slug)?.indexable) {
      errors.push(`Location "${slug}" is listed for indexable routing despite its non-indexable status.`);
    }
  }

  for (const slug of INDIA_CITY_MEDICAL_REFERENCE_SLUGS) {
    const location = getLocationBySlug(slug);
    if (location?.relationship !== 'informational'
      || !Array.isArray(location.medicalCentres)
      || location.medicalCentres.length === 0
      || !location.medicalCentresAsOf) {
      errors.push(`India city medical reference "${slug}" is missing its dated medical-centre data.`);
    }
  }

  for (const slug of INDIA_HUB_LOCATION_GUIDE_SLUGS) {
    const location = getLocationBySlug(slug);
    if (!location.supportedServices.includes('pilot-training')
      || !getLocationServiceContent(location, getServiceBySlug('pilot-training'))?.localContext) {
      errors.push(`India hub location guide "${slug}" has no supported pilot-training content.`);
    }
  }

  return errors;
}
