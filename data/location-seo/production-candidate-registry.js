import { AVIATION_EVIDENCE_RECORDS } from './aviation-evidence.js';
import { AVIATION_MARKET_PAGE_CANDIDATES } from './aviation-market-pages.js';
import { GLOBAL_AVIATION_INTENTS } from './global-aviation-intents.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from './geography/global-pilot.js';
import { AVIATION_REGULATORY_CONTEXTS } from './aviation-regulatory-contexts.js';
import { SERVICES } from './services.js';
import { LOCATIONS } from './locations.js';
import {
  buildLocationPromotionSnapshot,
  evaluateLocationPromotions,
  promoteLocationCandidates,
} from '../../lib/locationPromotionPipeline.js';

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

const productionCandidateInputs = AVIATION_MARKET_PAGE_CANDIDATES.map((candidate) => ({
    location: candidate.location,
    service: GLOBAL_AVIATION_INTENTS.find(({ slug }) => slug === 'pilot-training'),
    geographicRecords: GLOBAL_GEOGRAPHIC_PILOT.records,
    aviationEvidence: candidate.aviationEvidence,
    serviceRelationship: candidate.serviceRelationship,
    regulatoryContext: candidate.regulatoryContext,
    content: candidate.content,
    comparisons: [],
    productionLocation: candidate.productionLocation,
    productionService: SERVICES.find(({ slug }) => slug === candidate.productionService.slug),
  }));
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

const productionPromotion = promoteLocationCandidates(PRODUCTION_LOCATION_PROMOTION_INPUTS, {
  geographicRecords: GLOBAL_GEOGRAPHIC_PILOT.records,
  aviationEvidence: AVIATION_EVIDENCE_RECORDS,
  availableProductionServiceSlugs: SERVICES.map(({ slug }) => slug),
});
export const PRODUCTION_LOCATION_PROMOTION_EVALUATIONS = Object.freeze(
  productionPromotion.evaluations,
);
export const PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS = Object.freeze(
  productionPromotion.promotedPairs.map((pair) => Object.freeze({
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
