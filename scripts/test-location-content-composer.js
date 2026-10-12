import assert from 'node:assert/strict';
import { SERVICES } from '../data/location-seo/services.js';
import { composeLocationContent } from '../lib/locationContentComposer.js';
import { resolveGeographicServicePage } from '../lib/geographicServicePage.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import { resolveIndiaGeographicRoute } from '../lib/indiaGeographicRegistry.js';
import { buildIndiaLocationServiceContent } from '../lib/indiaLocationContentEngine.js';

const pilotTraining = SERVICES.find(({ slug }) => slug === 'pilot-training');
const dgcaGroundClasses = SERVICES.find(({ slug }) => slug === 'dgca-ground-classes');
const samples = [
  ['mumbai', 'IN'],
  ['gachibowli', 'IN'],
  ['delhi', 'IN'],
  ['hyderabad', 'IN'],
  ['bengaluru', 'IN'],
  ['thiruvananthapuram', 'IN'],
  ['india-sikar-district-24-111', 'IN'],
  ['dubai', 'AE'],
  ['london', 'GB'],
  ['toronto', 'CA'],
  ['new-york-city', 'US'],
];
const reports = [];
const resolvedPages = new Map();
const hasContent = (value) => (
  Array.isArray(value)
    ? value.length > 0
    : typeof value === 'string' && value.trim().length > 0
);

for (const [slug, expectedCountryCode] of samples) {
  const result = await resolveGeographicServicePage({
    location: slug,
    service: 'pilot-training',
  });
  assert.ok(result.props, `Expected /${slug}/pilot-training to resolve.`);
  const { location, service, content, engineLocations } = result.props;
  const page = buildLocationPageModel({
    location,
    service,
    content,
    locations: engineLocations,
    geographicDataValidated: true,
  });
  const composed = content.composedPage;
  assert.ok(composed, `Expected /${slug}/pilot-training to have a composition.`);
  assert.equal(composed.regulatoryContext.countryCode, expectedCountryCode, slug);
  assert.ok(composed.title && composed.metaDescription && composed.h1, slug);
  assert.ok(composed.introduction && composed.locationAviationContext && composed.localApplication, slug);
  assert.ok(hasContent(composed.pilotTrainingPathway));
  assert.ok(hasContent(composed.cplPathway));
  assert.ok(hasContent(composed.groundTraining));
  assert.ok(hasContent(composed.medicalRequirements));
  assert.ok(hasContent(composed.examinations));
  assert.ok(hasContent(composed.flightTrainingFtoStage));
  assert.ok(Array.isArray(composed.locationSpecificFaqs));
  assert.ok(Array.isArray(composed.verifiedSources));
  assert.ok(composed.weOneAviationRole.positioning);
  assert.ok(composed.weOneAviationRole.relationship);
  assert.ok(composed.regulatoryContext?.authority);
  assert.ok(composed.qualityDifferentiation.score >= 0);
  assert.ok(composed.qualityDifferentiation.score
    <= composed.qualityDifferentiation.maximumScore);
  assert.ok(['INDEXABLE', 'NOINDEX', 'NOT_SUPPORTED', 'REJECTED'].includes(
    composed.qualityDifferentiation.state,
  ));
  assert.equal(page.renderable, true);
  assert.equal(page.indexable, page.indexability === 'INDEXABLE');
  assert.equal(page.metadata.title, composed.title);
  assert.equal(page.metadata.description, composed.metaDescription);
  assert.equal(page.metadata.h1, composed.h1);
  if (slug === 'gachibowli') {
    assert.equal(page.indexability, 'NOINDEX');
    assert.equal(page.sitemapEligible, false);
    assert.ok(composed.qualityDifferentiation.signals.localEvidenceCount > 0);
  }
  if (slug === 'mumbai') {
    assert.equal(page.indexability, 'NOINDEX');
    assert.equal(page.sitemapEligible, false);
  }
  if (expectedCountryCode !== 'IN') {
    assert.notEqual(composed.regulatoryContext.authority, 'Directorate General of Civil Aviation (DGCA)');
  }
  resolvedPages.set(slug, result.props);
  reports.push({
    url: `/${slug}/pilot-training`,
    country: composed.regulatoryContext.country,
    regulator: composed.regulatoryContext.authority,
    contentSections: composed.masterContent.categoryIds,
    localEvidence: composed.qualityDifferentiation.localEvidence,
    qualityScore: composed.qualityDifferentiation.score,
    qualityState: composed.qualityDifferentiation.state,
    indexability: page.indexability,
    reason: composed.qualityDifferentiation.reason,
  });
}

for (const slug of [
  'hyderabad',
  'lucknow',
  'thiruvananthapuram',
  'bengaluru',
  'india-sikar-district-24-111',
]) {
  const resolved = await resolveIndiaGeographicRoute(slug);
  assert.ok(resolved.location, `Expected registry route ${slug} to resolve.`);
  const generated = buildIndiaLocationServiceContent({
    record: resolved.location,
    hierarchy: resolved.hierarchy,
    service: pilotTraining,
    routeSlug: slug,
  });
  const page = buildLocationPageModel({
    location: generated.location,
    service: pilotTraining,
    content: generated.content,
    locations: resolved.hierarchy,
    geographicDataValidated: true,
  });
  const locationPage = generated.content.locationPilotTrainingPage;
  assert.ok(locationPage.faqs.length >= 3, slug);
  assert.equal(
    locationPage.evidenceProfile.indexabilityTreatment,
    locationPage.evidenceProfile.level === 'STRONG'
      ? 'CURRENT_QUALITY_AND_APPROVAL_GATES_REQUIRED'
      : 'NOINDEX',
    slug,
  );
  assert.ok(
    locationPage.sections.find(({ category }) => category === 'LOCATION_AVIATION_EVIDENCE')
      ?.paragraphs.some((paragraph) => /evidence|source/i.test(paragraph)),
    `${slug} must explain the scope or limitation of its aviation evidence.`,
  );
  assert.ok(!locationPage.faqs.some(({ question }) => /GeoNames airport/i.test(question)), slug);
  if (['hyderabad', 'lucknow', 'thiruvananthapuram'].includes(slug)) {
    assert.equal(locationPage.evidenceProfile.level, 'STRONG', slug);
    assert.equal(page.indexability, 'INDEXABLE', slug);
    assert.equal(page.sitemapEligible, true, slug);
    assert.ok(locationPage.faqs.some(({ question }) => /listing/i.test(question)), slug);
  }
  if (slug === 'bengaluru') {
    assert.equal(locationPage.evidenceProfile.level, 'MEDIUM');
    assert.equal(page.indexability, 'NOINDEX');
    assert.equal(page.sitemapEligible, false);
  }
  if (slug === 'india-sikar-district-24-111') {
    assert.equal(locationPage.evidenceProfile.level, 'THIN');
    assert.equal(page.indexability, 'NOINDEX');
    assert.equal(page.sitemapEligible, false);
    assert.ok(locationPage.sections.some(({ paragraphs }) => (
      paragraphs.some((paragraph) => /does not establish local aviation or pilot-training provision/i.test(paragraph))
    )));
  }
}

const indiaDgcaPage = await resolveGeographicServicePage({
  location: 'mumbai',
  service: 'dgca-ground-classes',
});
assert.equal(indiaDgcaPage.notFound, true);

const london = resolvedPages.get('london');
const foreignDgcaModel = buildLocationPageModel({
  ...london,
  service: dgcaGroundClasses,
  locations: london.engineLocations,
  geographicDataValidated: true,
});
assert.equal(foreignDgcaModel.indexability, 'NOT_SUPPORTED');
assert.equal(foreignDgcaModel.qualityState, 'NOT_SUPPORTED');
const foreignDgcaRoute = await resolveGeographicServicePage({
  location: 'london',
  service: 'dgca-ground-classes',
});
assert.equal(foreignDgcaRoute.notFound, true);
reports.push({
  url: '/london/dgca-ground-classes',
  country: london.location.country,
  regulator: london.content.composedPage.regulatoryContext.authority,
  contentSections: [],
  localEvidence: [],
  qualityScore: null,
  qualityState: foreignDgcaModel.qualityState,
  indexability: foreignDgcaModel.indexability,
  reason: 'Foreign locations do not support DGCA-specific services.',
});

const invalidRoute = await resolveGeographicServicePage({
  location: 'not-a-real-location',
  service: 'pilot-training',
});
assert.equal(invalidRoute.notFound, true);
const invalidComposition = composeLocationContent({
  location: { name: '', slug: '', countryCode: '' },
  service: pilotTraining,
});
assert.equal(invalidComposition.qualityDifferentiation.state, 'REJECTED');
reports.push({
  url: '/not-a-real-location/pilot-training',
  country: null,
  regulator: null,
  contentSections: [],
  localEvidence: [],
  qualityScore: invalidComposition.qualityDifferentiation.score,
  qualityState: invalidComposition.qualityDifferentiation.state,
  indexability: false,
  reason: invalidComposition.qualityDifferentiation.reason,
});

console.log(JSON.stringify({ result: 'PASS', reports }, null, 2));
