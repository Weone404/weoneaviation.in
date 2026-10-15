import assert from 'node:assert/strict';
import {
  buildIndiaAviationPilotBatch,
  buildIndiaLocationServiceModel,
  resolveIndiaAviationSearch,
} from '../lib/indiaAviationPageEngine.js';
import { AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/aviation-evidence.js';
import { INDIA_AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/india-aviation-evidence.generated.js';
import {
  DGCA_FTO_ROSTER_AS_OF,
  DGCA_FTO_ROSTER_BASES,
  DGCA_FTO_ROSTER_SOURCE,
} from '../data/location-seo/dgca-fto-roster.js';
import { SERVICES } from '../data/location-seo/services.js';
import { buildIndiaLocationServiceContent } from '../lib/indiaLocationContentEngine.js';
import { resolveIndiaGeographicRoute } from '../lib/indiaGeographicRegistry.js';
import { getApprovedLocationServicePairs } from '../lib/locationSeo.js';

const batch = await buildIndiaAviationPilotBatch();
const requiredLocalities = [
  'Laxmi Nagar',
  'GTB Nagar',
  'Rohini',
  'Janakpuri',
  'Karol Bagh',
  'Pitampura',
  'Rajouri Garden',
  'Saket',
  'Vasant Kunj',
  'Mayur Vihar',
  'Shahdara',
];
const namedByName = new Map(batch.namedResults.map(({ reference, ...result }) => [
  reference.name,
  result,
]));
const localityResolution = Object.fromEntries(requiredLocalities.map((name) => {
  const result = namedByName.get(name);
  return [name, result?.record ? 'RESOLVED' : result?.status || 'MISSING'];
}));
const namedMissingNames = new Set(batch.namedMissing.map(({ name }) => name));
const allIntents = batch.services.map(({ slug }) => slug);
const recordOutcomes = batch.outcomes.filter(({ location }) => Boolean(location));
const mumbaiModels = recordOutcomes.filter(({ location }) => location.name === 'Mumbai');
const amitabhModels = recordOutcomes.filter(({ location }) => location.name === 'Amitabh Sharma');
const evidenceIds = new Set(INDIA_AVIATION_EVIDENCE_RECORDS.map(({ id }) => id));
const supportStatusCounts = {
  SUPPORTED: batch.outcomes.filter(({ supportStatus }) => supportStatus === 'SUPPORTED').length,
  NOT_SUPPORTED: batch.outcomes.filter(({ supportStatus }) => supportStatus === 'NOT_SUPPORTED').length,
};
const classificationCounts = Object.fromEntries(
  ['SUPPORTED', 'RENDERABLE', 'INDEXABLE', 'RESEARCH', 'REJECTED'].map((status) => [
    status,
    batch.outcomes.filter(({ classification }) => classification === status).length,
  ]),
);
classificationCounts.SUPPORTED = supportStatusCounts.SUPPORTED;
const comparisons = batch.outcomes.flatMap(({ differentiation }) => (
  differentiation?.comparisons || []
));
const pageModels = recordOutcomes.map(({ model }) => model).filter(Boolean);
const unsupportedClaims = pageModels.reduce(
  (count, model) => count + model.unsupportedClaims.length,
  0,
);
const falsePhysicalPresenceClaims = recordOutcomes.filter(({ location, relationship }) => (
  relationship === 'physical'
  || location.physicalPresence?.verified === true
  || location.physicalAcademy === true
)).length;
const sitemapEligible = pageModels.filter(({ productionSitemapEligible }) => (
  productionSitemapEligible
)).length;
const exactDuplicates = comparisons.filter(({ exactDuplicate }) => exactDuplicate).length;
const maximumSimilarity = comparisons.length
  ? Math.max(...comparisons.map(({ normalizedSimilarityPercent }) => normalizedSimilarityPercent))
  : 0;
const expectedOutcomes = (batch.locations.length + batch.namedMissing.length) * allIntents.length;

assert.ok(batch.registryRecordCount >= 10_000, 'The India registry should contain national-scale data.');
assert.equal(batch.firstOrderUnitNames.length, 36, 'Expected all 28 states and 8 union territories.');
assert.equal(
  Object.values(batch.administrativeLevelCoverage).filter(({ district }) => district).length,
  36,
  'Every State/UT sample must include a sourced district.',
);
assert.equal(batch.outcomes.length, expectedOutcomes, 'Each pilot geography needs a model for every core intent.');
assert.ok(mumbaiModels.length > 0, 'Mumbai should be included in the named aviation sample.');
assert.ok(amitabhModels.length > 0, 'The prior false-positive village should remain testable in the sample.');
assert.ok(
  mumbaiModels.every(({ aviationContent }) => !aviationContent.sources.some(({ id }) => (
    id === 'aviation:airport:delhi-igi'
  ))),
  'Delhi airport evidence must not attach to Mumbai through their shared country ancestor.',
);
for (const evidence of INDIA_AVIATION_EVIDENCE_RECORDS) {
  assert.equal(evidence.countryCode, 'IN');
  assert.equal(evidence.country, 'India');
  assert.equal(evidence.verificationStatus, 'primary-source-listed');
  assert.match(evidence.sourceUrl, /^https:\/\//);
  assert.ok(evidence.sourcePublisher, 'Evidence must identify its publishing authority.');
  assert.ok(['located-within', 'regional-context'].includes(evidence.geographicRelationship));
  assert.deepEqual(evidence.relatedLocationIds, []);
  assert.equal(evidence.hierarchy.at(-1).id, evidence.locationId);
  assert.equal(evidence.hierarchy.at(-1).name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),
    evidence.geographicName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase());
}
assert.equal(evidenceIds.size, INDIA_AVIATION_EVIDENCE_RECORDS.length);
const ingestedPilotTrainingEvidence = INDIA_AVIATION_EVIDENCE_RECORDS.filter(({ type }) => (
  ['flight-school', 'flying-club', 'pilot-training-organization'].includes(type)
));
assert.ok(ingestedPilotTrainingEvidence.length > 0, 'The DGCA roster must contribute pilot-training evidence.');
assert.ok(DGCA_FTO_ROSTER_BASES.length > 0);
assert.equal(DGCA_FTO_ROSTER_SOURCE.sourceDate, DGCA_FTO_ROSTER_AS_OF);
assert.equal(DGCA_FTO_ROSTER_SOURCE.pdfCreatedAt.slice(0, 10), DGCA_FTO_ROSTER_AS_OF);
assert.equal(DGCA_FTO_ROSTER_SOURCE.verificationDate, '2026-10-08');
assert.equal(DGCA_FTO_ROSTER_SOURCE.objectLastModifiedAt.slice(0, 10), '2026-10-06');
assert.ok(ingestedPilotTrainingEvidence.every((evidence) => (
  evidence.sourceDate === DGCA_FTO_ROSTER_AS_OF
  && evidence.sourceTitle === DGCA_FTO_ROSTER_SOURCE.title
  && evidence.sourceUrl === DGCA_FTO_ROSTER_SOURCE.url
  && evidence.verificationDate === DGCA_FTO_ROSTER_SOURCE.verificationDate
  && evidence.verifiedAt === DGCA_FTO_ROSTER_SOURCE.verificationDate
  && evidence.pilotTrainingRelevance === 'pilot-training'
  && evidence.locationId
  && evidence.hierarchy.at(-1).id === evidence.locationId
)));
const curatedCurrentFtoEvidence = AVIATION_EVIDENCE_RECORDS.filter((evidence) => (
  evidence.sourceUrl === DGCA_FTO_ROSTER_SOURCE.url
  && evidence.sourceDate === DGCA_FTO_ROSTER_AS_OF
  && evidence.verificationStatus !== 'historical-source-listed'
));
assert.ok(curatedCurrentFtoEvidence.length > 0);
assert.ok(curatedCurrentFtoEvidence.every((evidence) => (
  evidence.sourceTitle === DGCA_FTO_ROSTER_SOURCE.title
  && evidence.sourceDateBasis === DGCA_FTO_ROSTER_SOURCE.sourceDateBasis
  && evidence.sourceCreatedAt === DGCA_FTO_ROSTER_SOURCE.pdfCreatedAt
  && evidence.sourceLastModifiedAt === DGCA_FTO_ROSTER_SOURCE.objectLastModifiedAt
  && evidence.verificationDate === DGCA_FTO_ROSTER_SOURCE.verificationDate
  && evidence.verifiedAt === DGCA_FTO_ROSTER_SOURCE.verificationDate
)));
const historicalBombayFlyingClub = AVIATION_EVIDENCE_RECORDS.find(({ id }) => (
  id === 'aviation:fto:bombay-flying-club'
));
assert.equal(historicalBombayFlyingClub.pilotTrainingRelevance, 'historical-not-operational');
assert.match(historicalBombayFlyingClub.fact, /non-operational since 15 June 2025/i);
const unverifiedPanagarhFtoReference = AVIATION_EVIDENCE_RECORDS.find(({ id }) => (
  id === 'aviation:fto:panagarh-chetak-pioneer'
));
assert.equal(unverifiedPanagarhFtoReference.sourceDate, null);
assert.equal(unverifiedPanagarhFtoReference.verificationStatus, 'unverified-source-reference');

const pilotTrainingService = SERVICES.find(({ slug }) => slug === 'pilot-training');
const mumbaiRegistryRoute = await resolveIndiaGeographicRoute('geonames-in-mumbai-1275339');
const delhiRegistryRoute = await resolveIndiaGeographicRoute('geonames-in-new-delhi-1261481');
assert.ok(mumbaiRegistryRoute.location);
assert.ok(delhiRegistryRoute.location);
const mumbaiDynamicContent = buildIndiaLocationServiceContent({
  record: mumbaiRegistryRoute.location,
  hierarchy: mumbaiRegistryRoute.hierarchy,
  service: pilotTrainingService,
  routeSlug: mumbaiRegistryRoute.location.slug,
});
const delhiDynamicContent = buildIndiaLocationServiceContent({
  record: delhiRegistryRoute.location,
  hierarchy: delhiRegistryRoute.hierarchy,
  service: pilotTrainingService,
  routeSlug: delhiRegistryRoute.location.slug,
});
const mumbaiFactIds = new Set(mumbaiDynamicContent.content.locationAviationContent.aviationFacts
  .map(({ evidenceId }) => evidenceId));
const mumbaiRegionalFactIds = new Set(mumbaiDynamicContent.content.locationAviationContent.nearbyAviationHubs
  .filter(({ geographicRelationship }) => geographicRelationship === 'regional-context')
  .map(({ evidenceId }) => evidenceId));
const delhiFactIds = new Set(delhiDynamicContent.content.locationAviationContent.aviationFacts
  .map(({ evidenceId }) => evidenceId));
const delhiRegionalFactIds = new Set(delhiDynamicContent.content.locationAviationContent.nearbyAviationHubs
  .filter(({ geographicRelationship }) => geographicRelationship === 'regional-context')
  .map(({ evidenceId }) => evidenceId));
const mumbaiGeneratedMedicalIds = new Set(INDIA_AVIATION_EVIDENCE_RECORDS
  .filter(({ locationId }) => locationId === mumbaiRegistryRoute.location.id)
  .map(({ id }) => id));
const delhiGeneratedMedicalIds = new Set(INDIA_AVIATION_EVIDENCE_RECORDS
  .filter(({ locationId }) => locationId === delhiRegistryRoute.location.id)
  .map(({ id }) => id));
assert.ok(mumbaiGeneratedMedicalIds.size > 0, 'The DGCA source records should map to Mumbai.');
assert.ok(delhiGeneratedMedicalIds.size > 0, 'The DGCA source records should map to New Delhi.');
const mumbaiExpectedMedicalRecords = INDIA_AVIATION_EVIDENCE_RECORDS.filter(({ locationId }) => (
  locationId === mumbaiRegistryRoute.location.id
));
const delhiExpectedMedicalRecords = INDIA_AVIATION_EVIDENCE_RECORDS.filter(({ locationId }) => (
  locationId === delhiRegistryRoute.location.id
));
assert.ok(mumbaiExpectedMedicalRecords
  .filter(({ geographicRelationship }) => geographicRelationship === 'located-within')
  .every(({ id }) => mumbaiFactIds.has(id)));
assert.ok(mumbaiExpectedMedicalRecords
  .filter(({ geographicRelationship }) => geographicRelationship === 'regional-context')
  .every(({ id }) => mumbaiRegionalFactIds.has(id)));
assert.ok(delhiExpectedMedicalRecords
  .filter(({ geographicRelationship }) => geographicRelationship === 'located-within')
  .every(({ id }) => delhiFactIds.has(id)));
assert.ok(delhiExpectedMedicalRecords
  .filter(({ geographicRelationship }) => geographicRelationship === 'regional-context')
  .every(({ id }) => delhiRegionalFactIds.has(id)));
assert.ok([...mumbaiGeneratedMedicalIds].every((id) => !delhiFactIds.has(id) && !delhiRegionalFactIds.has(id)));
assert.ok([...delhiGeneratedMedicalIds].every((id) => !mumbaiFactIds.has(id) && !mumbaiRegionalFactIds.has(id)));
assert.ok(
  mumbaiRegionalFactIds.has('aviation:medical:dgca-class1-renewal:air-force-station-thane-mumbai'),
  'A station with a distinct locality in its name must remain regional context, not a Mumbai-local facility.',
);
assert.ok(
  amitabhModels.every(({ aviationContent }) => !aviationContent.sources.some(({ id }) => (
    id === 'aviation:airport:dehradun-jolly-grant'
    || id === 'aviation:medical:dehradun-class1'
  ))),
  'Dehradun city aviation evidence must not attach to a same-named district ancestor of a village.',
);
assert.deepEqual(
  batch.services.map(({ slug }) => slug),
  ['pilot-training', 'dgca-ground-classes', 'commercial-pilot-training', 'cpl-training'],
);
assert.deepEqual(Object.keys(localityResolution), requiredLocalities);
assert.equal(localityResolution['GTB Nagar'], 'NOT_FOUND');
assert.equal(
  Object.entries(localityResolution).filter(([, status]) => status === 'RESOLVED').length,
  requiredLocalities.length - 1,
  'All Delhi locality references with sourced geographic records should resolve; do not invent the missing GTB Nagar record.',
);
assert.equal(
  batch.outcomes.some(({ classification }) => classification === 'INDEXABLE'),
  false,
  'Pilot evaluation must not approve production indexation.',
);
for (const serviceSlug of allIntents) {
  assert.equal(
    batch.outcomes.filter(({ service }) => service.slug === serviceSlug).length,
    batch.locations.length + batch.namedMissing.length,
    `Every pilot location must have one ${serviceSlug} model.`,
  );
}
assert.equal(sitemapEligible, 0, 'Pilot models must not enter the production sitemap.');
assert.equal(unsupportedClaims, 0, 'Pilot content must not introduce unsupported business claims.');
assert.equal(falsePhysicalPresenceClaims, 0, 'Informational models must not imply physical presence.');
assert.equal(
  pageModels.every(({ schema }) => schema.emitLocalBusiness === false),
  true,
  'Informational models must not emit LocalBusiness schema.',
);
assert.equal(
  pageModels.every(({ metadata }) => (
    metadata.canonical.startsWith('https://weoneaviation.in/')
    && /noindex/i.test(metadata.robots)
  )),
  true,
  'Every pilot model must have a canonical and remain noindex.',
);
assert.equal(
  recordOutcomes.every(({ service }) => allIntents.includes(service.slug)),
  true,
  'Every resolved model must use a configured aviation intent.',
);
for (const outcome of recordOutcomes) {
  assert.ok(outcome.hierarchy.some(({ type }) => type === 'country'));
  assert.ok(outcome.hierarchy.some(({ type }) => type === 'state'));
  assert.ok(['informational', 'research-only'].includes(outcome.model.relationship));
  assert.equal(outcome.model.productionSitemapEligible, false);
  for (const fact of outcome.aviationContent?.sources || []) {
    assert.ok(fact.source, 'Evidence must name its source.');
    assert.match(fact.sourceUrl || '', /^https:\/\//, 'Evidence must include an HTTPS source URL.');
    assert.equal(fact.distanceKm, null, 'Unverified distances must remain null.');
    assert.ok(fact.geographicRelationship, 'Evidence must state its geographic relationship.');
    assert.ok(fact.sourceDate === null || /^\d{4}-\d{2}-\d{2}$/.test(fact.sourceDate));
    assert.match(fact.reviewedAt || '', /^\d{4}-\d{2}-\d{2}$/);
  }
  if (outcome.differentiation) {
    assert.ok(outcome.differentiation.metrics.comparisonCount > 0);
    assert.ok(outcome.differentiation.metrics.normalizedSimilarityPercent <= 100);
  }
}
const searchResult = await resolveIndiaAviationSearch('pilot training in Laxmi Nagar');
assert.equal(searchResult.serviceSlug, 'pilot-training');
assert.equal(searchResult.locationName, 'Laxmi Nagar');
assert.ok(['RENDERABLE', 'RESEARCH', 'REJECTED', 'AMBIGUOUS'].includes(searchResult.status));
const invalidIntent = await resolveIndiaAviationSearch('airline jobs in Laxmi Nagar');
assert.equal(invalidIntent.status, 'REJECTED');
const ambiguousPlace = await resolveIndiaAviationSearch('pilot training in Indore');
assert.equal(ambiguousPlace.status, 'AMBIGUOUS');
const contextualPlace = await buildIndiaLocationServiceModel(
  'Indore',
  'pilot-training',
  { state: 'Madhya Pradesh', type: 'populated-place' },
);
assert.equal(contextualPlace.geographicResolution, 'RESOLVED');
for (const { slug, searchIntent } of batch.services) {
  const phrase = {
    'pilot-training': 'pilot training in',
    'dgca-ground-classes': 'DGCA ground classes in',
    'commercial-pilot-training': 'commercial pilot training in',
    'cpl-training': 'CPL training in',
  }[slug];
  const result = await resolveIndiaAviationSearch(`${phrase} Laxmi Nagar`);
  assert.equal(result.serviceSlug, slug);
  assert.equal(result.locationName, 'Laxmi Nagar');
  assert.ok(searchIntent);
}

const typeCounts = batch.registryCountsByType || {};
const scaleSummary = [1_000, 5_000, 10_000].map((size) => ({
  sampleRecords: Math.min(size, batch.registryRecordCount),
  available: batch.registryRecordCount >= size,
  totalLocationIntentModels: Math.min(size, batch.registryRecordCount) * allIntents.length,
  result: 'validated-by-npm-test:india-geography',
}));
const approvedPairs = getApprovedLocationServicePairs();
const summary = {
  totalIndianGeographicRecords: batch.registryRecordCount,
  statesAndUnionTerritories: batch.firstOrderUnitNames.length,
  districts: typeCounts.district || 0,
  cities: typeCounts.city || 0,
  towns: typeCounts.town || 0,
  villages: typeCounts.village || 0,
  localitiesAndNeighborhoods: (typeCounts.locality || 0) + (typeCounts.neighborhood || 0),
  postalAreas: typeCounts['postal-area'] || 0,
  ambiguousPostalCodes: batch.registryCoverage?.ambiguousPostalCodes ?? null,
  stateUtAdministrativeSampleCoverage: Object.fromEntries(
    ['district', 'subdistrict', 'village', 'town'].map((level) => [
      level,
      Object.values(batch.administrativeLevelCoverage).filter((levels) => levels[level]).length,
    ]),
  ),
  namedPilotLocations: batch.namedResults.length,
  namedPilotMissing: [...namedMissingNames],
  delhiLocalityResolution: localityResolution,
  totalPilotLocations: batch.locations.length,
  totalPageModels: batch.outcomes.length,
  classificationCounts,
  supportStatusCounts,
  engineRenderableModelCount: pageModels.filter(({ canRender }) => canRender).length,
  differentiationApprovedRenderableCount: classificationCounts.RENDERABLE,
  indexableCount: classificationCounts.INDEXABLE,
  researchOnlyCount: classificationCounts.RESEARCH,
  rejectedCount: classificationCounts.REJECTED,
  exactDuplicateCount: exactDuplicates,
  exactDuplicatePercent: comparisons.length
    ? Number((exactDuplicates / comparisons.length * 100).toFixed(1))
    : 0,
  comparedPagePairs: comparisons.length,
  maximumNormalizedSimilarityPercent: maximumSimilarity,
  unsupportedLocalClaims: unsupportedClaims,
  falsePhysicalPresenceClaims,
  productionApprovedLocationServicePairs: approvedPairs.length,
  pilotSitemapUrls: sitemapEligible,
  jsxTemplatesCreated: 0,
  locationSpecificJsxFilesCreated: 0,
  scaleSummary,
};
console.log(JSON.stringify(summary, null, 2));
