import { AVIATION_EVIDENCE_RECORDS } from './aviation-evidence.js';
import { AVIATION_MARKET_PAGE_CANDIDATES } from './aviation-market-pages.js';
import { GLOBAL_AVIATION_INTENTS } from './global-aviation-intents.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from './geography/global-pilot.js';
import { AVIATION_REGULATORY_CONTEXTS } from './aviation-regulatory-contexts.js';
import { SERVICES } from './services.js';
import { LOCATIONS } from './locations.js';
import { isProductionRouteApproved } from './production-route-approvals.js';
import { INDIA_AVIATION_CANDIDATE_GEOGRAPHY } from './geography/india-aviation-candidate-geography.js';
import {
  buildLocationPromotionSnapshot,
  evaluateLocationPromotions,
  promoteLocationCandidates,
} from '../../lib/locationPromotionPipeline.js';
import { resolveHierarchy } from '../../lib/geographicData.js';

const geographyById = new Map(
  GLOBAL_GEOGRAPHIC_PILOT.records.map((record) => [record.id, record]),
);
const pilotAviationEvidence = AVIATION_EVIDENCE_RECORDS
  .filter(({ type }) => type !== 'aviation-authority');
const uniqueLocations = new Map();
for (const evidence of pilotAviationEvidence) {
  const location = geographyById.get(evidence.locationId);
  if (location) uniqueLocations.set(location.id, location);
}

const candidateLocations = [...uniqueLocations.values()];
const authorityByCountry = new Map(
  AVIATION_EVIDENCE_RECORDS
    .filter(({ type }) => type === 'aviation-authority')
    .map((item) => [item.countryCode, item]),
);
const existingPilotTrainingComparisons = LOCATIONS.flatMap((location) => {
  const content = location.serviceContent?.['pilot-training'];
  if (!content) return [];
  const sections = (location.localSections || []).map(({ title, body, closing, items = [] }) => ({
    title,
    body: [
      body,
      closing,
      ...items.flatMap(({ label, detail }) => [label, detail]),
    ].filter(Boolean).join(' '),
  }));
  return [{
    slug: location.slug,
    name: location.name || location.city,
    body: [
      content.h1,
      content.introduction,
      content.relationshipStatement,
      content.regulatoryContext,
      ...sections.flatMap(({ title, body }) => [title, body]),
      ...(content.faqs || []).flatMap(({ question, answer }) => [question, answer]),
    ].filter(Boolean).join('\n'),
    locationNames: [location.city, location.state, location.country].filter(Boolean),
    verifiedFacts: [],
    faqs: content.faqs || [],
    sections: sections.map(({ title, body }) => ({ title, body, verified: true })),
    regulatoryText: location.country || '',
  }];
});

const evaluationInputs = candidateLocations.flatMap((location) => GLOBAL_AVIATION_INTENTS.map((service) => {
    const regulatoryRecord = authorityByCountry.get(location.countryCode);
    const regulatoryContext = AVIATION_REGULATORY_CONTEXTS[location.country] || null;
    const matchingEvidence = AVIATION_EVIDENCE_RECORDS.filter((item) => (
      item.countryCode === location.countryCode
      && (item.locationId === location.id || item.type === 'aviation-authority')
    ));
    return {
      location,
      geographicRecords: GLOBAL_GEOGRAPHIC_PILOT.records,
      aviationEvidence: matchingEvidence,
      service,
      regulatoryContext,
      registryDetails: {
        authorityEvidenceId: regulatoryRecord?.id || null,
      },
    };
  }));
const evaluationResults = evaluateLocationPromotions(evaluationInputs, {
  geographicRecords: GLOBAL_GEOGRAPHIC_PILOT.records,
  aviationEvidence: AVIATION_EVIDENCE_RECORDS,
});

export const GLOBAL_LOCATION_SERVICE_EVALUATIONS = Object.freeze(
  evaluationInputs.map((candidate, index) => Object.freeze({
      locationSlug: candidate.location.slug,
      locationName: candidate.location.name,
      geographicLevel: candidate.location.type,
      country: candidate.location.country,
      serviceSlug: candidate.service.slug,
      aviationEvidenceIds: candidate.aviationEvidence.map(({ id }) => id),
      ...evaluationResults[index],
      ...candidate.registryDetails,
    })),
);

function productionCandidateInput(candidate) {
  const selectedCandidate = INDIA_AVIATION_CANDIDATE_GEOGRAPHY.candidates
    .find(({ marketSlug }) => marketSlug === candidate.productionLocation.slug);
  const indiaRecord = selectedCandidate
    ? INDIA_AVIATION_CANDIDATE_GEOGRAPHY.records.find(({ id }) => (
      id === selectedCandidate.recordId
    ))
    : null;
  const service = GLOBAL_AVIATION_INTENTS.find(({ slug }) => slug === 'pilot-training');
  const productionService = SERVICES.find(({ slug }) => slug === candidate.productionService.slug);
  if (!indiaRecord) {
    return {
      location: candidate.location,
      service,
      geographicRecords: GLOBAL_GEOGRAPHIC_PILOT.records,
      aviationEvidence: candidate.aviationEvidence,
      serviceRelationship: candidate.serviceRelationship,
      regulatoryContext: candidate.regulatoryContext,
      content: candidate.content,
      comparisons: [],
      productionLocation: candidate.productionLocation,
      productionService,
    };
  }

  const indiaHierarchy = resolveHierarchy(
    indiaRecord,
    INDIA_AVIATION_CANDIDATE_GEOGRAPHY.records,
  );
  const stateRecord = indiaHierarchy.find(({ type }) => type === 'state');
  const districtRecord = indiaHierarchy.find(({ type }) => type === 'district');
  const registryLocation = (location) => ({
    ...location,
    id: indiaRecord.id,
    name: indiaRecord.name,
    canonicalName: indiaRecord.canonicalName,
    type: indiaRecord.type,
    parentId: indiaRecord.parentId,
    parentIds: indiaRecord.parentIds,
    country: indiaRecord.country,
    countryCode: indiaRecord.countryCode,
    state: stateRecord?.name || location.state,
    district: districtRecord?.name || location.district || null,
    geographicSource: indiaRecord.source,
    geographicSourceUrl: indiaRecord.sourceUrl,
    geographicSourceDate: indiaRecord.sourceDate,
    geographicConfidence: indiaRecord.confidence,
    geographicStatus: indiaRecord.status,
  });
  const location = registryLocation(candidate.location);
  const content = {
    ...candidate.content,
    geographicType: indiaRecord.type,
    geographicContext: indiaHierarchy.map(({ id, name, type, sourceLinks = [] }) => ({
      id,
      name,
      type,
      sourceLinks,
    })),
    locationAviationContent: {
      ...candidate.content.locationAviationContent,
      geographicLevel: indiaRecord.type,
      geographicContext: indiaHierarchy.map(({ id, name, type, sourceLinks = [] }) => ({
        id,
        name,
        type,
        sources: sourceLinks.map(({ publisher, href }) => ({ publisher, href })),
      })),
    },
    schema: {
      ...candidate.content.schema,
      breadcrumbItems: indiaHierarchy.map(({ name }) => name),
    },
  };
  const productionLocation = {
    ...registryLocation(candidate.productionLocation),
    locationType: indiaRecord.type,
    sourceLinks: [...new Map([
      ...(candidate.productionLocation.sourceLinks || []),
      ...(candidate.content.locationAviationContent?.sourceLinks || []).map(({
        href,
        publisher,
        title,
      }) => ({
        href,
        label: `${publisher}: ${title}`,
      })),
      ...(indiaRecord.sourceLinks || []).map(({ href, publisher, title }) => ({
        href,
        label: `${publisher}: ${title}`,
      })),
    ].map((source) => [source.href, source])).values()],
    serviceContent: {
      ...candidate.productionLocation.serviceContent,
      'pilot-training': content,
    },
  };
  const aviationEvidence = candidate.aviationEvidence.map((record) => ({
    ...record,
    locationId: record.locationId === candidate.location.id
      ? indiaRecord.id
      : record.locationId,
    relatedLocationIds: (record.relatedLocationIds || []).map((id) => (
      id === candidate.location.id ? indiaRecord.id : id
    )),
    sourceGeographicLocationId: record.locationId,
  }));
  return {
    location,
    service,
    geographicRecords: INDIA_AVIATION_CANDIDATE_GEOGRAPHY.records,
    aviationEvidence,
    serviceRelationship: candidate.serviceRelationship,
    regulatoryContext: candidate.regulatoryContext,
    content,
    comparisons: [],
    productionLocation,
    productionService,
  };
}

const productionCandidateInputs = AVIATION_MARKET_PAGE_CANDIDATES.map(
  productionCandidateInput,
);
const productionCandidateSnapshots = productionCandidateInputs.map(
  (candidate) => buildLocationPromotionSnapshot(candidate),
);
export const PRODUCTION_LOCATION_PROMOTION_INPUTS = Object.freeze(
  productionCandidateInputs.map((candidate, index) => Object.freeze({
    ...candidate,
    comparisons: [
      ...productionCandidateSnapshots.filter((_, comparisonIndex) => comparisonIndex !== index),
      ...existingPilotTrainingComparisons,
    ],
  })),
);

const promotionOptions = {
  aviationEvidence: AVIATION_EVIDENCE_RECORDS,
  availableProductionServiceSlugs: SERVICES.map(({ slug }) => slug),
};
const indiaPromotion = promoteLocationCandidates(
  PRODUCTION_LOCATION_PROMOTION_INPUTS.filter(({ location }) => location.countryCode === 'IN'),
  {
    ...promotionOptions,
    geographicRecords: INDIA_AVIATION_CANDIDATE_GEOGRAPHY.records,
  },
);
const internationalPromotion = promoteLocationCandidates(
  PRODUCTION_LOCATION_PROMOTION_INPUTS.filter(({ location }) => location.countryCode !== 'IN'),
  {
    ...promotionOptions,
    geographicRecords: GLOBAL_GEOGRAPHIC_PILOT.records,
  },
);
const evaluationsByRoute = new Map(
  [...indiaPromotion.evaluations, ...internationalPromotion.evaluations].map((evaluation) => [
    `/${evaluation.locationSlug}/${evaluation.serviceSlug}`,
    evaluation,
  ]),
);
const productionPromotion = {
  evaluations: PRODUCTION_LOCATION_PROMOTION_INPUTS.map((candidate) => (
    evaluationsByRoute.get(`/${candidate.location.slug}/${candidate.service.slug}`)
  )),
  promotedPairs: [
    ...indiaPromotion.promotedPairs,
    ...internationalPromotion.promotedPairs,
  ],
};
export const PRODUCTION_LOCATION_PROMOTION_EVALUATIONS = Object.freeze(
  productionPromotion.evaluations,
);
export const PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS = Object.freeze(
  productionPromotion.promotedPairs
    .filter(({ location, service }) => (
      isProductionRouteApproved(`/${location.slug}/${service.slug}`)
    ))
    .map((pair) => Object.freeze({
    ...pair,
    location: Object.freeze({
      ...pair.location,
      contentDifferentiation: Object.freeze({
        status: 'PASSED',
        sitemapEligible: true,
        metrics: pair.promotion.differentiation,
      }),
    }),
    })),
);
