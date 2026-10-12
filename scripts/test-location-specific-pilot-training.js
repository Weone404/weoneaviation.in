import assert from 'node:assert/strict';
import { resolveGeographicServicePage } from '../lib/geographicServicePage.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import {
  assessContentDifferentiation,
  buildLocationContentSnapshot,
} from '../lib/locationContentDifferentiation.js';

const TEST_LOCATIONS = [
  ['gachibowli', 'IN'],
  ['mumbai', 'IN'],
  ['delhi', 'IN'],
  ['dwarka', 'IN'],
  ['bengaluru', 'IN'],
  ['ahmedabad', 'IN'],
  ['kolkata', 'IN'],
  ['thiruvananthapuram', 'IN'],
  ['ranchi', 'IN'],
  ['dehradun', 'IN'],
  ['srinagar', 'IN'],
  ['amritsar', 'IN'],
  ['agra', 'IN'],
  ['dubai', 'AE'],
  ['london', 'GB'],
  ['toronto', 'CA'],
  ['sydney', 'AU'],
  ['new-york-city', 'US'],
  ['hyderabad', 'IN'],
  ['lucknow', 'IN'],
];

const EXPECTED_REGULATORS = {
  IN: 'Directorate General of Civil Aviation (DGCA)',
  AE: 'United Arab Emirates General Civil Aviation Authority (GCAA)',
  GB: 'UK Civil Aviation Authority (CAA)',
  CA: 'Transport Canada',
  AU: 'Civil Aviation Safety Authority (CASA)',
  US: 'Federal Aviation Administration (FAA)',
};
const ORIGIN = 'https://weoneaviation.in';
const pages = [];

function fieldText(value) {
  if (!value) return '';
  if (!Array.isArray(value)) return String(value);
  return value.map((item) => (
    typeof item === 'string'
      ? item
      : [item.heading, item.title, item.excerpt, item.description, item.body]
        .filter(Boolean)
        .join(' ')
  )).join(' ');
}

function wordCount(value) {
  return String(value || '').match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)?.length || 0;
}

for (const [slug, countryCode] of TEST_LOCATIONS) {
  const result = await resolveGeographicServicePage({
    location: slug,
    service: 'pilot-training',
  });
  assert.ok(result.props, `Expected /${slug}/pilot-training to resolve.`);

  const props = result.props;
  const model = buildLocationPageModel({
    location: props.location,
    service: props.service,
    content: props.content,
    siteOrigin: ORIGIN,
    locations: props.engineLocations,
    geographicDataValidated: props.geographicDataValidated,
  });
  const { content, location, service } = props;
  const composer = content.composedPage;
  const qualityState = composer?.qualityDifferentiation?.state
    || content.quality?.state
    || model.qualityState;
  const differentiation = content.quality?.differentiation
    || location.contentDifferentiation
    || null;
  const normalizedSimilarity = differentiation?.similarityScore
    ?? differentiation?.metrics?.normalizedSimilarityPercent;

  assert.equal(model.regulatoryContext?.countryCode, countryCode, `${slug}: wrong country.`);
  assert.equal(
    model.regulatoryContext?.authority,
    EXPECTED_REGULATORS[countryCode],
    `${slug}: wrong regulator.`,
  );
  assert.equal(model.renderable, true, `${slug}: page must remain renderable.`);
  assert.ok(
    ['INDEXABLE', 'NOINDEX', 'NOT_SUPPORTED', 'REJECTED'].includes(qualityState),
    `${slug}: generated content must expose a supported quality state.`,
  );
  if (model.indexable) {
    assert.equal(qualityState, 'INDEXABLE', `${slug}: indexed content must pass quality.`);
  }
  assert.equal(
    model.metadata.canonical,
    `${ORIGIN}/${slug}/pilot-training`,
    `${slug}: canonical must match the requested dynamic route.`,
  );
  assert.equal(
    model.metadata.robots.includes('noindex'),
    !model.indexable,
    `${slug}: robots directives must follow indexability, not renderability.`,
  );
  assert.equal(
    model.sitemapEligible && !model.indexable,
    false,
    `${slug}: a non-indexable page cannot be sitemap-eligible.`,
  );
  assert.ok(model.hierarchy.length >= 2, `${slug}: location hierarchy is missing.`);
  assert.ok(model.faqs.length >= 3, `${slug}: location FAQs are missing.`);
  assert.ok(content.internalLinks?.length >= 2, `${slug}: relevant internal links are missing.`);
  assert.ok(
    model.indexabilityPipeline?.stages?.some(({ name, passed }) => (
      name === 'content-differentiation' && passed
    )) || !model.indexable,
    `${slug}: indexability must pass the content-differentiation gate.`,
  );
  assert.equal(
    composer?.qualityDifferentiation?.signals?.locationNameReplacementExcluded,
    true,
    `${slug}: name replacement must not count as differentiation.`,
  );
  for (const field of [
    'pilotTrainingPathway',
    'cplPathway',
    'groundTraining',
    'medicalRequirements',
    'examinations',
    'flightTrainingFtoStage',
  ]) {
    assert.ok(fieldText(composer?.[field]), `${slug}: composed ${field} content is missing.`);
  }
  assert.equal(
    (model.unsupportedClaims || []).length,
    0,
    `${slug}: unsupported We One Aviation presence claim detected.`,
  );

  if (countryCode !== 'IN') {
    const composerRegulatoryText = [
      composer?.groundTraining,
      composer?.medicalRequirements,
      composer?.examinations,
      composer?.cplPathway,
      composer?.flightTrainingFtoStage,
      composer?.regulatoryContext?.summary,
    ].flatMap((field) => (
      Array.isArray(field)
        ? field.map(({ excerpt, body, description }) => [excerpt, body, description].filter(Boolean).join(' '))
        : [field]
    )).filter(Boolean).join(' ');
    const regulatoryText = [
      content.serviceContent?.regulatoryPathway,
      content.serviceContent?.groundSchool,
      content.serviceContent?.medicalRequirements,
      content.serviceContent?.examinations,
      content.serviceContent?.cplPathway,
      composerRegulatoryText,
    ].filter(Boolean).join(' ');
    assert.ok(
      regulatoryText.includes(EXPECTED_REGULATORS[countryCode]),
      `${slug}: foreign pathway must use its country's regulator.`,
    );
    assert.doesNotMatch(
      regulatoryText,
      /DGCA (?:Class [12]|Computer Number|eGCA|written paper|examination syllabus)/i,
      `${slug}: Indian DGCA-specific requirements leaked into foreign content.`,
    );
  }

  const snapshot = buildLocationContentSnapshot({
    location,
    hierarchy: model.hierarchy,
    model,
    sections: content.locationSpecificSections || [],
  });
  const composedText = [
    composer.pilotTrainingPathway,
    composer.cplPathway,
    composer.groundTraining,
    composer.medicalRequirements,
    composer.examinations,
    composer.flightTrainingFtoStage,
    composer.weOneAviationRole?.positioning,
    composer.weOneAviationRole?.relationship,
  ].map(fieldText).join(' ');
  const aviationText = [
    content.locationAviationContent?.locationOverview,
    content.locationAviationContent?.aviationRelevance,
    content.locationAviationContent?.howStudentsFromLocationCanTrain,
    content.locationAviationContent?.flightTrainingExplanation,
    content.locationAviationContent?.ftoSelectionGuidance,
    content.locationAviationContent?.physicalVsOnlineExplanation,
  ].filter(Boolean).join(' ');
  const visibleWordCount = wordCount(`${model.renderedBody.join(' ')} ${aviationText} ${composedText}`);
  const faqSchema = {
    '@type': 'FAQPage',
    mainEntity: model.schema.faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
  assert.equal(faqSchema['@type'], 'FAQPage', `${slug}: FAQ JSON-LD is missing.`);
  assert.equal(
    faqSchema.mainEntity.length,
    model.schema.faqItems.length,
    `${slug}: FAQ JSON-LD does not match the visible FAQ collection.`,
  );

  if (model.indexable) {
    assert.ok(
      differentiation?.status === 'PASSED',
      `${slug}: an indexable route must have a passing differentiation assessment.`,
    );
  }

  pages.push({
    slug,
    url: `/${slug}/pilot-training`,
    location: location.name || location.city,
    country: location.country,
    countryCode: model.regulatoryContext.countryCode,
    regulator: model.regulatoryContext.authority,
    hierarchy: model.hierarchy.map(({ name }) => name).join(' > '),
    renderable: model.renderable,
    indexable: model.indexable,
    qualityState,
    qualityScore: composer?.qualityDifferentiation?.score ?? null,
    differentiationScore: Number.isFinite(normalizedSimilarity)
      ? Number((100 - normalizedSimilarity).toFixed(1))
      : null,
    title: model.metadata.title,
    h1: model.metadata.h1,
    wordCount: visibleWordCount,
    selectedMasterCategories: composer?.qualityDifferentiation?.masterCategoriesSelected || [],
    localEvidenceUsed: [
      ...(composer?.qualityDifferentiation?.localEvidence || []).map(({ name, id }) => name || id),
      ...(content.locationAviationContent?.aviationFacts || []).map(({ name }) => name),
      ...(content.locationAviationContent?.nearbyAviationHubs || []).map(({ title }) => title),
      ...(model.verifiedFacts || []).map(({ sourceLocation }) => sourceLocation),
    ].filter(Boolean)
      .filter((item, index, all) => all.indexOf(item) === index)
      .slice(0, 3)
      .map((item) => String(item).slice(0, 100)),
    reason: model.indexabilityPipeline?.reason
      || composer?.qualityDifferentiation?.reason
      || (model.indexable ? 'Existing content-differentiation approval passed.' : model.state),
    canonical: model.metadata.canonical,
    robots: model.metadata.robots,
    jsonLd: faqSchema['@type'],
    snapshot,
  });
}

const pairwiseResults = pages.map((page, index) => {
  const comparisons = pages
    .filter((_, comparisonIndex) => comparisonIndex !== index)
    .map(({ snapshot }) => snapshot);
  return assessContentDifferentiation({
    candidate: page.snapshot,
    comparisons,
  });
});
assert.equal(
  pairwiseResults.some(({ exactDuplicate }) => exactDuplicate),
  false,
  'Two requested location pages have identical normalized content.',
);

const foreignDgca = await resolveGeographicServicePage({
  location: 'dubai',
  service: 'dgca-ground-classes',
});
assert.equal(foreignDgca.props, undefined, 'Foreign DGCA-specific route must remain unsupported.');

const report = pages.map((page, index) => ({
  url: page.url,
  location: page.location,
  country: page.country,
  regulator: page.regulator,
  hierarchy: page.hierarchy,
  renderable: page.renderable,
  indexable: page.indexable,
  qualityState: page.qualityState,
  qualityScore: page.qualityScore,
  differentiationScore: Number.isFinite(page.differentiationScore)
    ? page.differentiationScore
    : Number((100 - pairwiseResults[index].similarityScore).toFixed(1)),
  title: page.title,
  h1: page.h1,
  wordCount: page.wordCount,
  selectedMasterCategories: page.selectedMasterCategories,
  localEvidenceUsed: page.localEvidenceUsed,
  canonical: page.canonical,
  robots: page.robots,
  jsonLd: page.jsonLd,
  reason: page.reason,
}));
console.log(JSON.stringify({
  passed: true,
  evaluated: report.length,
  indexable: report.filter(({ indexable }) => indexable).length,
  noindex: report.filter(({ indexable }) => !indexable).length,
  exactDuplicates: pairwiseResults.filter(({ exactDuplicate }) => exactDuplicate).length,
  foreignDgcaIntent: 'NOT_SUPPORTED',
  pages: report,
}, null, 2));
