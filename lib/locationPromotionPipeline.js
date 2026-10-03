import {
  resolveHierarchy,
  validateGeographicData,
} from './geographicData.js';
import { assessContentDifferentiation } from './locationContentDifferentiation.js';
import { AVIATION_EVIDENCE_TYPES } from '../data/location-seo/aviation-evidence.js';

const RELATIONSHIP_TYPES = new Set([
  'physical',
  'online',
  'service-area',
  'informational',
]);

function asReason(gates) {
  const failed = Object.entries(gates).find(([, passed]) => !passed);
  return failed
    ? `${failed[0]} gate failed.`
    : 'Every geographic, aviation, service, regulatory, content, safety, differentiation, and indexability gate passed.';
}

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

function isFirstPartyUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'weoneaviation.in';
  } catch {
    return false;
  }
}

function matchingEvidence(location, hierarchy, evidenceRecords, geographyById) {
  const hierarchyIds = new Set(hierarchy.map(({ id }) => id));
  const localRecordIds = new Set([location.id]);
  const descendantIds = new Set();
  for (const record of evidenceRecords) {
    if (hierarchyIds.has(record.locationId)) {
      localRecordIds.add(record.locationId);
      continue;
    }
    let current = geographyById.get(record.locationId);
    if (!current) continue;
    const visited = new Set();
    while (current?.parentId && !visited.has(current.id)) {
      if (current.parentId === location.id) {
        descendantIds.add(record.locationId);
        break;
      }
      visited.add(current.id);
      current = geographyById.get(current.parentId);
    }
  }
  const eligibleLocationIds = new Set([...localRecordIds, ...descendantIds]);
  return evidenceRecords.filter((record) => (
    eligibleLocationIds.has(record.locationId)
    || record.relatedLocationIds?.includes(location.id)
  ));
}

function buildSnapshot(candidate, hierarchy) {
  const content = candidate.content || {};
  const productionLocation = candidate.productionLocation || candidate.location;
  const service = candidate.productionService || candidate.service;
  const pageSections = productionLocation.localSections?.length
    ? productionLocation.localSections
    : content.sections || [];
  const sections = pageSections.map((section) => ({
    title: section.title,
    body: [
      section.body,
      section.closing,
      ...(section.items || []).flatMap(({ label, detail }) => [label, detail]),
    ].filter(Boolean).join(' '),
    verified: true,
  }));
  const faqs = [
    ...(content.faqs || []),
    ...(productionLocation.localFAQs || []),
  ].filter((faq, index, allFaqs) => (
    allFaqs.findIndex((item) => item.question === faq.question) === index
  ));
  const serviceGuidance = candidate.productionService
    && candidate.regulatoryContext?.country === 'India'
    ? [
      service.serviceExplanation,
      service.dgcaPathway,
      service.eligibility,
      ...(service.flightTrainingApplicable ? [service.flightTrainingPathway] : []),
    ].filter(Boolean)
    : [];
  const verifiedFacts = (productionLocation.verifiedFacts || [])
    .filter((fact) => fact?.verified === true && typeof fact.text === 'string')
    .map((fact) => ({ text: fact.text, inherited: false }));
  if (!verifiedFacts.length && !productionLocation.localSections?.length) {
    verifiedFacts.push(...(content.localFacts || []).map(({ fact }) => ({
      text: fact,
      inherited: false,
    })));
  }
  const body = [
    content.h1,
    content.introduction,
    content.localApplication || content.localContext,
    ...serviceGuidance,
    content.relationshipStatement,
    ...verifiedFacts.map(({ text }) => text),
    candidate.regulatoryContext?.authority
      ? `The aviation regulatory authority recorded for ${candidate.regulatoryContext.country} is ${candidate.regulatoryContext.authority}.`
      : content.regulatoryContext,
    ...faqs.flatMap(({ question, answer }) => [question, answer]),
  ].filter(Boolean).join('\n');
  return {
    slug: candidate.location.slug,
    name: candidate.location.name,
    body,
    locationNames: hierarchy.map(({ name }) => name),
    verifiedFacts,
    faqs,
    sections,
    regulatoryText: candidate.regulatoryContext?.authority || '',
  };
}

export function buildLocationPromotionSnapshot(candidate) {
  if (!candidate?.location || !Array.isArray(candidate.geographicRecords)) {
    throw new TypeError('A candidate location and geographic dataset are required.');
  }
  const hierarchy = resolveHierarchy(candidate.location, candidate.geographicRecords);
  if (!hierarchy) throw new Error(`No valid hierarchy exists for "${candidate.location.slug}".`);
  return buildSnapshot(candidate, hierarchy);
}

function hasUnsafeClaims(candidate) {
  const content = JSON.stringify({
    content: candidate.content || {},
    serviceRelationship: candidate.serviceRelationship || {},
  });
  const relationship = candidate.serviceRelationship || {};
  const physicalClaim = /\b(?:We One Aviation|the academy)\b.{0,80}\b(?:has|operates|runs|maintains|offers|provides|is based|is located)\b.{0,50}\b(?:branch|classroom|office|facility|flying base|instructor|campus)\b/i;
  const ftoClaim = /\bWe One Aviation\b.{0,80}\b(?:operates|owns|runs|maintains)\b.{0,30}\b(?:FTO|flying school|flying training organisation)\b/i;
  const positiveSentences = content.split(/[.!?\n]+/)
    .filter((sentence) => !/\b(?:not|no|never|doesn't|does not|isn't|is not)\b/i.test(sentence));

  if (positiveSentences.some((sentence) => ftoClaim.test(sentence))) return true;
  if (positiveSentences.some((sentence) => physicalClaim.test(sentence))
    && !(relationship.type === 'physical' && relationship.physicalPresenceVerified === true)) {
    return true;
  }
  if (relationship.type === 'physical' && relationship.physicalPresenceVerified !== true) return true;
  return false;
}

function validContent(candidate, relatedEvidence) {
  const content = candidate.content || {};
  const localFacts = content.localFacts || [];
  const sections = content.sections || [];
  const faqs = content.faqs || [];
  const evidenceIds = new Set(relatedEvidence.map(({ id }) => id));
  const checks = {
    requiredFields: Boolean(
      content.title
      && content.description
      && content.h1
      && content.introduction
      && content.relationshipStatement
      && content.regulatoryContext
    ),
    localFacts: localFacts.length >= 3
      && localFacts.every(({ fact, evidenceId }) => fact?.trim() && evidenceIds.has(evidenceId)),
    sections: sections.length >= 2
      && sections.every(({ title, body, evidenceIds: sectionEvidence }) => (
      title?.trim()
      && body?.trim()
      && Array.isArray(sectionEvidence)
      && sectionEvidence.length > 0
      && sectionEvidence.every((id) => evidenceIds.has(id))
      )),
    faqs: faqs.length >= 2
      && faqs.every(({ question, answer }) => question?.trim() && answer?.trim()),
    internalLinks: Array.isArray(content.internalLinks)
      && content.internalLinks.length >= 2
      && content.internalLinks.every(({ href, label }) => (
        /^\/[a-z0-9/_-]+$/i.test(href || '')
        && !href.startsWith('//')
        && label?.trim()
      )),
    localAviationProfile: content.pagePurpose !== 'aviation-location-information'
      || validLocalAviationProfile(
        content.localAviationProfile,
        content,
        relatedEvidence,
        candidate.location,
        candidate.regulatoryContext,
      ),
  };
  return Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name);
}

function validLocalAviationProfile(profile, content, relatedEvidence, location, regulatoryContext) {
  const requiredText = [
    'locationOverview',
    'aviationEcosystem',
    'flightTrainingInfrastructure',
    'pilotTrainingPathway',
    'licenceContext',
    'medicalRequirements',
    'examContext',
    'localTrainingConsiderations',
    'weOneRelationship',
    'nextSteps',
  ];
  const evidenceById = new Map(relatedEvidence.map((item) => [item.id, item]));
  const aviationFacilityEvidence = [...(profile?.majorAirports || []), ...(profile?.aerodromes || [])];
  return Boolean(
    profile
    && requiredText.every((key) => typeof profile[key] === 'string' && profile[key].trim())
    && Array.isArray(profile.majorAirports)
    && Array.isArray(profile.aerodromes)
    && aviationFacilityEvidence.length > 0
    && aviationFacilityEvidence.every(({ name, evidenceId }) => (
      name?.trim()
      && evidenceById.has(evidenceId)
      && ['airport', 'aerodrome'].includes(evidenceById.get(evidenceId).type)
    ))
    && Array.isArray(profile.aviationOrganizations)
    && profile.aviationOrganizations.every(({ name, evidenceId }) => (
      name?.trim() && evidenceById.has(evidenceId)
    ))
    && profile.aviationAuthority?.authority === regulatoryContext?.authority
    && profile.aviationAuthority?.countryCode === location?.countryCode
    && profile.aviationAuthority?.sourceUrl === regulatoryContext?.source
    && Array.isArray(profile.sourceReferences)
    && profile.sourceReferences.length >= 2
    && profile.sourceReferences.every(({ title, publisher, href }) => (
      title?.trim()
      && publisher?.trim()
      && isHttpsUrl(href)
      && (href === regulatoryContext?.source
        || isFirstPartyUrl(href)
        || relatedEvidence.some((item) => item.sourceUrl === href))
    ))
    && Array.isArray(profile.faqs)
    && profile.faqs.length >= 2
    && profile.faqs.every(({ question, answer }) => question?.trim() && answer?.trim())
    && profile.weOneRelationship === content.relationshipStatement
  );
}

function evidenceIsValid(evidenceRecords, relatedEvidence) {
  const relatedEvidenceIds = new Set(relatedEvidence.map(({ id }) => id));
  return evidenceRecords.some((record) => (
    AVIATION_EVIDENCE_TYPES.includes(record.type)
    && relatedEvidenceIds.has(record.id)
    && record.geographicRelationship === 'located-within'
    && record.verificationStatus === 'primary-source-listed'
    && isHttpsUrl(record.sourceUrl)
    && record.source
    && record.verifiedAt
    && record.countryCode
  ));
}

function serviceJurisdictionValid(service, location, regulatoryContext) {
  if (service.jurisdictionPolicy === 'local-authority') {
    return Boolean(regulatoryContext?.authority
      && regulatoryContext.countryCode === location.countryCode);
  }
  if (service.jurisdictionPolicy?.startsWith('country-code:')) {
    return service.jurisdictionPolicy.slice('country-code:'.length) === location.countryCode;
  }
  return false;
}

function createEvaluationContext(geographicRecords, aviationEvidence) {
  if (!Array.isArray(geographicRecords)) {
    throw new TypeError('Geographic records must be an array.');
  }
  if (!Array.isArray(aviationEvidence)) {
    throw new TypeError('Aviation evidence must be an array.');
  }
  return {
    geographyErrors: validateGeographicData(geographicRecords),
    geographyById: new Map(geographicRecords.map((record) => [record.id, record])),
    aviationEvidence,
  };
}

function evaluateWithContext(candidate, context) {
  const {
    location,
    service,
    serviceRelationship = null,
    regulatoryContext = null,
    content = null,
    comparisons = [],
    testOnly = false,
  } = candidate;
  if (!location || !service) {
    throw new TypeError('Location and service intent are required.');
  }
  const geographicRecords = candidate.geographicRecords;
  const aviationEvidence = candidate.aviationEvidence || context.aviationEvidence;
  const geographyErrors = context.geographyErrors;
  const hierarchy = geographyErrors.length ? [] : resolveHierarchy(location, geographicRecords) || [];
  const relatedEvidence = geographyErrors.length
    ? []
    : matchingEvidence(location, hierarchy, aviationEvidence, context.geographyById);
  const selectedEvidence = aviationEvidence.filter(({ id }) => (
    (serviceRelationship?.aviationEvidenceIds || []).includes(id)
  ));
  const evidenceForPage = selectedEvidence.length ? selectedEvidence : relatedEvidence;
  const localEvidence = evidenceForPage.filter(({ type }) => type !== 'aviation-authority');
  const relationshipValid = Boolean(
    serviceRelationship
    && RELATIONSHIP_TYPES.has(serviceRelationship.type)
    && serviceRelationship.verified === true
    && serviceRelationship.serviceSlug === service.slug
    && serviceRelationship.source
    && isHttpsUrl(serviceRelationship.source)
    && serviceRelationship.verifiedFact?.trim()
    && /^\d{4}-\d{2}-\d{2}$/.test(serviceRelationship.verifiedAt || '')
    && (serviceRelationship.type === 'informational'
      ? serviceRelationship.physicalPresenceVerified === false
        && serviceRelationship.localServiceDeliveryVerified === false
        && serviceRelationship.statement === content?.relationshipStatement
      : serviceRelationship.deliveryScope?.trim())
    && (serviceRelationship.type !== 'physical'
      || serviceRelationship.physicalPresenceVerified === true),
  );
  const relationshipEvidenceValid = Boolean(
    serviceRelationship
    && serviceRelationship.source
    && serviceRelationship.verifiedFact?.trim()
    && /^\d{4}-\d{2}-\d{2}$/.test(serviceRelationship.verifiedAt || '')
    && (serviceRelationship.type === 'informational'
      ? isFirstPartyUrl(serviceRelationship.source)
        && serviceRelationship.physicalPresenceVerified === false
        && serviceRelationship.localServiceDeliveryVerified === false
      : Array.isArray(serviceRelationship.aviationEvidenceIds)
        && serviceRelationship.aviationEvidenceIds.length > 0
        && serviceRelationship.aviationEvidenceIds.every((id) => (
          aviationEvidence.some((item) => item.id === id)
        ))),
  );
  const regulatorValid = Boolean(
    regulatoryContext
    && regulatoryContext.countryCode === location.countryCode
    && regulatoryContext.country === location.country
    && regulatoryContext.authority
    && isHttpsUrl(regulatoryContext.source)
    && serviceJurisdictionValid(service, location, regulatoryContext),
  );
  const contentFailures = validContent({
    location,
    content,
    regulatoryContext,
  }, relatedEvidence);
  const contentValid = contentFailures.length === 0;
  const unsafeClaims = hasUnsafeClaims({ content, serviceRelationship });
  const snapshot = content
    ? buildSnapshot(candidate, hierarchy)
    : null;
  const differentiation = snapshot
    ? assessContentDifferentiation({
      candidate: snapshot,
      comparisons,
    })
    : null;
  const metadataValid = Boolean(
    content?.title?.length <= 70
    && content?.description?.length <= 180
    && content?.canonicalPath === `/${location.slug}/${service.slug}`
    && content?.schema?.pageType === 'WebPage'
    && content?.schema?.breadcrumbItems?.length >= 2
    && content?.schema?.faqItems?.length === content?.faqs?.length,
  );
  const indexabilityValid = Boolean(
    content?.indexabilityApproved === true
    && !testOnly
    && location.testOnly !== true
    && content?.postalArea !== true
    && !['postal-area', 'neighborhood'].includes(location.type)
      ? location.status === 'verified' || location.status === 'sourced'
      : false,
  );

  const gates = {
    locationValid: geographyErrors.length === 0 && hierarchy.length >= 2,
    aviationRelevanceValid: evidenceIsValid(localEvidence, relatedEvidence),
    sourceEvidenceValid: localEvidence.length >= 1
      && localEvidence.every(({ sourceUrl, source, verifiedAt }) => (
        isHttpsUrl(sourceUrl) && source && verifiedAt
      )),
    relationshipValid,
    relationshipEvidenceValid,
    regulatoryContextValid: regulatorValid,
    contentDataAvailable: contentValid,
    contentDifferentiationValid: differentiation?.status === 'PASSED',
    claimsSafe: !unsafeClaims,
    metadataValid,
    internalLinksValid: Boolean(content?.internalLinks?.length >= 2),
    indexabilityValid,
  };

  const hardFailure = !gates.locationValid
    || !gates.regulatoryContextValid
    || !gates.claimsSafe;
  const passed = Object.values(gates).every(Boolean);
  const status = passed
    ? 'SUPPORTED'
    : hardFailure ? 'REJECTED' : 'RESEARCH';

  return {
    status,
    promotionStatus: passed ? 'PRODUCTION_CANDIDATE' : status,
    indexable: passed,
    sitemapEligible: passed,
    locationSlug: location.slug,
    serviceSlug: service.slug,
    relationship: serviceRelationship?.type || null,
    evidenceIds: localEvidence.map(({ id }) => id),
    gates,
    differentiation: differentiation?.metrics || null,
    reason: asReason(gates),
    contentFailures,
    ...(testOnly ? { testOnly: true } : {}),
  };
}

export function evaluateLocationPromotion(candidate) {
  if (!candidate || !Array.isArray(candidate.geographicRecords)) {
    throw new TypeError('A candidate and its geographic dataset are required.');
  }
  const context = createEvaluationContext(
    candidate.geographicRecords,
    candidate.aviationEvidence || [],
  );
  return evaluateWithContext(candidate, context);
}

export function evaluateLocationPromotions(candidates, {
  geographicRecords,
  aviationEvidence = [],
} = {}) {
  if (!Array.isArray(candidates)) throw new TypeError('Promotion candidates must be an array.');
  const context = createEvaluationContext(geographicRecords, aviationEvidence);
  return candidates.map((candidate) => evaluateWithContext({
    ...candidate,
    geographicRecords,
  }, context));
}

export function promoteLocationCandidates(candidates, {
  geographicRecords,
  aviationEvidence = [],
  availableProductionServiceSlugs = [],
} = {}) {
  const evaluations = evaluateLocationPromotions(candidates, {
    geographicRecords,
    aviationEvidence,
  });
  const promotedPairs = candidates.flatMap((candidate, index) => {
    let result = evaluations[index];
    const location = candidate.productionLocation;
    const service = candidate.productionService;
    const serviceContent = location?.serviceContent?.[service?.slug];
    const routeDataValid = Boolean(
      location
      && service
      && location.slug === candidate.location.slug
      && service.slug === candidate.service.slug
      && availableProductionServiceSlugs.includes(service.slug)
      && location.city
      && location.state
      && location.country
      && location.stateSlug
      && location.countrySlug
      && location.authorityPath?.startsWith('/')
      && location.authorityLabel
      && location.locationType
      && location.relationship === candidate.serviceRelationship?.type
      && typeof location.physicalAcademy === 'boolean'
      && typeof location.onlineTraining === 'boolean'
      && typeof location.flightTrainingGuidance === 'boolean'
      && location.indexable === true
      && service.indexable === true
      && location.supportedServices?.includes(service.slug)
      && availableProductionServiceSlugs.includes(service.slug)
      && location.rejectedServices
      && typeof location.rejectedServices === 'object'
      && !Array.isArray(location.rejectedServices)
      && availableProductionServiceSlugs.every((slug) => (
        slug === service.slug || Boolean(location.rejectedServices[slug])
      ))
      && Array.isArray(location.nearbyLocations)
      && Array.isArray(location.relatedLocations)
      && Array.isArray(location.localFAQs)
      && Array.isArray(location.sourcePages)
      && location.sourcePages.length > 0
      && Array.isArray(location.sourceLinks)
      && location.sourceLinks.length > 0
      && Array.isArray(location.localSections)
      && location.localSections.length >= 2
      && location.localSections.every(({ title, body, items }) => (
        title
        && body
        && Array.isArray(items)
        && items.length > 0
        && items.every(({ label, detail }) => label && detail)
      ))
      && serviceContent === candidate.content
      && serviceContent.seoTitle
      && serviceContent.seoDescription
      && serviceContent.h1
      && serviceContent.introduction
      && serviceContent.localContext
      && serviceContent.trainingMode
      && serviceContent.faqs?.length >= 2
      && serviceContent.internalLinks?.length >= 2
      && serviceContent.cta?.label
      && serviceContent.cta?.href
      && location.testOnly !== true,
    );
    if (result.status === 'SUPPORTED' && !routeDataValid) {
      result = {
        ...result,
        status: 'RESEARCH',
        promotionStatus: 'RESEARCH',
        indexable: false,
        sitemapEligible: false,
        gates: { ...result.gates, productionPageModelValid: false },
        reason: 'Production route data is incomplete for the shared location/service template.',
      };
      evaluations[index] = result;
    }
    if (result.status !== 'SUPPORTED'
      || !location
      || !service
      || !routeDataValid) {
      return [];
    }
    return [{
      location,
      service,
      content: candidate.content,
      promotion: result,
    }];
  });
  return { evaluations, promotedPairs };
}
