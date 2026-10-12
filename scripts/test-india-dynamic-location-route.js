import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { loadIndiaGeographicRegistry, resolveIndiaGeographicRoute } from '../lib/indiaGeographicRegistry.js';
import { buildIndiaLocationServiceContent } from '../lib/indiaLocationContentEngine.js';
import { isCanonicalIndiaGeographicNameRoute } from '../lib/indiaGeographicRouteSlug.js';
import {
  normalizeLocationContentText,
} from '../lib/locationContentDifferentiation.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import { SERVICES } from '../data/location-seo/services.js';
import { INDIA_DYNAMIC_SERVICE_POLICIES } from '../data/location-seo/india-dynamic-service-policies.js';
import {
  getLocationBySlug,
  getLocationEngineContext,
  getLocationServiceContent,
  isLocationServiceIndexable,
} from '../lib/locationSeo.js';

const pilotTraining = SERVICES.find(({ slug }) => slug === 'pilot-training');
const testedServices = Object.keys(INDIA_DYNAMIC_SERVICE_POLICIES)
  .map((slug) => SERVICES.find((service) => service.slug === slug))
  .filter(Boolean);
assert.equal(testedServices.length, Object.keys(INDIA_DYNAMIC_SERVICE_POLICIES).length);

function hierarchyIsValid(record, hierarchy) {
  if (record.type === 'country') {
    return hierarchy.length === 1 && hierarchy[0]?.id === record.id;
  }
  return hierarchy.length > 1
    && hierarchy[0]?.type === 'country'
    && hierarchy.at(-1)?.id === record.id
    && hierarchy.some(({ type }) => type === 'state');
}

function roundRobinSample(records, limit) {
  const groups = new Map();
  for (const record of records) {
    const group = groups.get(record.type) || [];
    group.push(record);
    groups.set(record.type, group);
  }
  const types = [...groups.keys()];
  const selected = [];
  let offset = 0;
  while (selected.length < limit) {
    let found = false;
    for (const type of types) {
      const group = groups.get(type);
      if (offset < group.length && selected.length < limit) {
        selected.push(group[offset]);
        found = true;
      }
    }
    if (!found) throw new Error(`Cannot create a unique sample of ${limit} locations.`);
    offset += 1;
  }
  return selected;
}

function visiblePageText(page, model) {
  const { content } = page;
  const aviation = content.locationAviationContent || {};
  return [
    model.metadata.title,
    model.metadata.description,
    model.metadata.h1,
    ...(model.renderedBody || []),
    content.introduction,
    content.localApplication,
    content.localContext,
    content.relationshipStatement,
    aviation.locationOverview,
    aviation.aviationRelevance,
    ...(aviation.aviationFacts || []).map(({ fact }) => fact),
    ...(aviation.nearbyAviationHubs || []).map(({ fact, contextGeography }) => (
      `${fact} ${contextGeography?.type || ''} ${contextGeography?.name || ''}`
    )),
    ...Object.values(aviation.studentPathway || {}),
    content.serviceContent?.explanation,
    content.serviceContent?.eligibility,
    content.serviceContent?.regulatoryPathway,
    content.serviceContent?.flightTrainingPathway,
    content.serviceContent?.whyThisOption,
    ...(content.serviceContent?.trainingProcess || [])
      .flatMap(({ title, description }) => [title, description]),
    ...(aviation.localFaqs || []).flatMap(({ question, answer }) => [question, answer]),
    ...(content.locationSpecificSections || []).flatMap(({ title, body }) => [title, body]),
    ...(content.regionalContextSections || []).flatMap(({ title, body }) => [title, body]),
    ...(aviation.sourceLinks || []).map(({ title, publisher }) => `${title} ${publisher}`),
    ...(content.internalLinks || []).map(({ context, label, href }) => `${context} ${label} ${href}`),
  ].filter(Boolean).join('\n');
}

function contentFingerprint(page, model) {
  return crypto.createHash('sha256').update(visiblePageText(page, model)).digest('hex');
}

function sectionFingerprints(page, model) {
  const sections = [
    ...(page.content.locationSpecificSections || []),
    ...(page.content.regionalContextSections || []),
  ];
  return sections.map(({ title, body }) => crypto.createHash('sha256').update(
    `${title}\n${body}`,
  ).digest('hex'));
}

async function exerciseRecord(
  record,
  { measure = true, service = pilotTraining, routeSlug = record.slug } = {},
) {
  const started = performance.now();
  const resolved = await resolveIndiaGeographicRoute(routeSlug);
  const resolutionMs = performance.now() - started;
  if (!resolved.location) return { status: 'INVALID', resolutionMs };
  const validHierarchy = hierarchyIsValid(resolved.location, resolved.hierarchy);
  if (!validHierarchy) return { status: 'INVALID', resolutionMs };

  const generationStarted = performance.now();
  const page = buildIndiaLocationServiceContent({
    record: resolved.location,
    hierarchy: resolved.hierarchy,
    service,
    routeSlug,
  });
  const model = buildLocationPageModel({
    location: page.location,
    service,
    content: page.content,
    siteOrigin: 'https://weoneaviation.in',
    locations: page.hierarchy,
    geographicDataValidated: true,
  });
  const generationMs = performance.now() - generationStarted;
  const elapsedMs = performance.now() - started;
  if (!measure) return { status: 'RENDERED', elapsedMs, resolutionMs, generationMs, model, page };
  const differentiation = page.content.quality.differentiation;
  const faqFingerprint = crypto.createHash('sha256')
    .update(model.faqs.map(({ question, answer }) => `${question}\n${answer}`).join('\n'))
    .digest('hex');
  const visibleText = visiblePageText(page, model);
  return {
    status: model.state,
    httpStatus: model.renderable ? 200 : 404,
    renderable: model.renderable,
    indexable: model.indexable,
    sitemapEligible: model.sitemapEligible,
    indexability: model.indexability,
    canonical: model.metadata.canonical,
    robots: model.metadata.robots,
    title: model.metadata.title,
    description: model.metadata.description,
    h1: model.metadata.h1,
    contentLength: visibleText.length,
    jsonLd: page.content.jsonLdReady === true
      && model.schema.faqItems.length >= 3
      && model.breadcrumbs.length > 1,
    hierarchy: model.hierarchy.map(({ id, name, type, parentId }) => ({
      id,
      name,
      type,
      parentId: parentId || null,
    })),
    service: service.slug,
    noindex: /\bnoindex\b/i.test(model.metadata.robots),
    qualityState: page.content.quality.state,
    qualityScores: page.content.quality.scores,
    qualityBlockers: page.content.quality.blockers,
    indexabilityReason: model.indexabilityPipeline?.reason || null,
    indexabilityStages: model.indexabilityPipeline?.stages || [],
    unsupportedClaims: model.unsupportedClaims,
    relationship: model.relationship,
    differentiationPassed: differentiation?.status === 'PASSED',
    differentiationStatus: differentiation?.differentiationStatus,
    exactDuplicate: differentiation?.exactDuplicate,
    contentQuality: page.content.quality.checks,
    differentiationFailureReasons: differentiation?.reasons || [],
    normalizedSimilarityPercent: differentiation?.normalizedSimilarityPercent || 0,
    fingerprint: contentFingerprint(page, model),
    legacyFingerprint: legacyModelFingerprint(page.location, page.content, model),
    faqFingerprint,
    sectionFingerprints: sectionFingerprints(page, model),
    closestComparison: differentiation?.closestComparison || null,
    resolutionMs,
    generationMs,
    elapsedMs,
  };
}

async function exerciseRoute(path, registry, serviceBySlug) {
  const [, locationSlug, serviceSlug] = path.split('/');
  const service = serviceBySlug.get(serviceSlug);
  if (!service) {
    return { path, httpStatus: 404, status: 'REJECTED', service: serviceSlug };
  }

  try {
    const curatedLocation = getLocationBySlug(locationSlug);
    if (curatedLocation && isLocationServiceIndexable(curatedLocation, service)) {
      const content = getLocationServiceContent(curatedLocation, service);
      const { locations, geographicDataValidated } = getLocationEngineContext(curatedLocation);
      const model = buildLocationPageModel({
        location: curatedLocation,
        service,
        content,
        siteOrigin: 'https://weoneaviation.in',
        locations,
        geographicDataValidated,
      });
      const visibleText = visiblePageText({ content }, model);
      const differentiation = model.contentDifferentiation || content.quality?.differentiation;
      return {
        path,
        httpStatus: model.renderable ? 200 : 404,
        status: model.state,
        renderable: model.renderable,
        indexable: model.indexable,
        sitemapEligible: model.sitemapEligible,
        indexability: model.indexability,
        canonical: model.metadata.canonical,
        robots: model.metadata.robots,
        title: model.metadata.title,
        description: model.metadata.description,
        h1: model.metadata.h1,
        contentLength: visibleText.length,
        jsonLd: model.renderable && model.schema.faqItems.length > 0,
        hierarchy: model.hierarchy.map(({ id, name, type, parentId }) => ({
          id,
          name,
          type,
          parentId: parentId || null,
        })),
        service: service.slug,
        noindex: /\bnoindex\b/i.test(model.metadata.robots),
        qualityState: model.qualityState,
        qualityScores: model.quality?.scores || null,
        qualityBlockers: model.quality?.blockers || [],
        indexabilityReason: model.indexabilityPipeline?.reason || null,
        unsupportedClaims: model.unsupportedClaims,
        relationship: model.relationship,
        differentiationPassed: differentiation?.status === 'PASSED',
        differentiationStatus: differentiation?.differentiationStatus,
        exactDuplicate: differentiation?.exactDuplicate,
        contentQuality: model.quality?.checks || {},
        differentiationFailureReasons: differentiation?.reasons || [],
        normalizedSimilarityPercent: differentiation?.normalizedSimilarityPercent || 0,
        fingerprint: contentFingerprint({ content }, model),
        legacyFingerprint: contentFingerprint({ content }, model),
        closestComparison: differentiation?.closestComparison || null,
      };
    }

    const resolved = await resolveIndiaGeographicRoute(locationSlug);
    if (!resolved.location) {
      return { path, httpStatus: 404, status: 'INVALID', service: serviceSlug };
    }
    if (resolved.location.slug !== locationSlug
      && !isCanonicalIndiaGeographicNameRoute(locationSlug, resolved.location)) {
      const canonicalPage = await exerciseRecord(resolved.location, {
        measure: true,
        service,
        routeSlug: resolved.location.slug,
      });
      return {
        ...canonicalPage,
        path,
        httpStatus: 308,
        status: 'REDIRECT',
        redirectTo: canonicalPage.canonical,
        indexable: false,
        sitemapEligible: false,
        targetIndexable: canonicalPage.indexable,
        targetSitemapEligible: canonicalPage.sitemapEligible,
      };
    }
    const result = await exerciseRecord(resolved.location, {
      measure: true,
      service,
      routeSlug: locationSlug,
    });
    return {
      path,
      ...result,
      location: resolved.location.name,
    };
  } catch (error) {
    if (/ambiguous/i.test(error.message)) {
      return {
        path,
        httpStatus: 404,
        status: 'AMBIGUOUS',
        service: serviceSlug,
        reason: error.message,
      };
    }
    throw error;
  }
}

/* old test fingerprint omitted hierarchy and visible regional content */
function legacyModelFingerprint(location, content, model) {
  const payload = [
    location.name,
    location.type,
    content.introduction,
    content.localApplication,
    content.localContext,
    ...content.locationAviationContent.aviationFacts.map(({ fact }) => fact),
    ...content.locationAviationContent.nearbyAviationHubs.map(({ fact }) => fact),
    ...model.faqs.flatMap(({ question, answer }) => [question, answer]),
  ].join('\n');
  return crypto.createHash('sha256').update(payload).digest('hex');
}

function namedRecord(records, name, type, state = null) {
  const candidates = records.filter((record) => (
    record.type === type
    && [record.name, record.canonicalName, ...(record.aliases || [])]
      .some((value) => String(value || '').toLowerCase() === name.toLowerCase())
    && (!state || record.state === state)
  ));
  assert.equal(candidates.length, 1, `Expected exactly one ${type} record for ${name}.`);
  return candidates[0];
}

async function main() {
  const heapBeforeRegistryLoad = process.memoryUsage().heapUsed;
  const registryLoadStarted = performance.now();
  const registry = await loadIndiaGeographicRegistry();
  const registryLoadMs = performance.now() - registryLoadStarted;
  const heapAfterRegistryLoad = process.memoryUsage().heapUsed;
  assert.equal(registry.complete, true);
  assert.equal(registry.recordCount, 574430);
  const resolverWarmupStarted = performance.now();
  await resolveIndiaGeographicRoute(registry.records[0].slug);
  const resolverWarmupMs = performance.now() - resolverWarmupStarted;
  const heapAfterResolverWarmup = process.memoryUsage().heapUsed;

  const explicitCases = [
    ['Delhi', namedRecord(registry.records, 'Delhi', 'state')],
    ['South Delhi', namedRecord(registry.records, 'South Delhi', 'district')],
    ['Mumbai', namedRecord(registry.records, 'Mumbai', 'city', 'Maharashtra')],
    ['Town', registry.records.find(({ type }) => type === 'town')],
    ['Village', registry.records.find(({ type }) => type === 'village')],
    ['Laxmi Nagar', namedRecord(registry.records, 'Laxmi Nagar', 'neighborhood', 'Delhi')],
    ['Neighborhood', registry.records.find(({ type }) => type === 'neighborhood')],
    ['PIN', registry.records.find(({ type, postalCodeAmbiguous }) => (
      type === 'postal-area' && postalCodeAmbiguous !== true
    ))],
  ];
  const explicitResults = [];
  for (const [label, record] of explicitCases) {
    assert.ok(record, `The registry must contain a ${label} test record.`);
    const result = await exerciseRecord(record, { measure: false });
    assert.equal(result.status, 'RENDERED', `${label} should render from a valid record.`);
    assert.equal(result.model.renderable, true, `${label} must be renderable independently of indexability.`);
    assert.equal(result.model.metadata.canonical, `https://weoneaviation.in/${record.slug}/pilot-training`);
    assert.ok(result.model.metadata.h1.includes(record.name));
    assert.ok(result.page.content.locationAviationContent.geographicContext
      .some(({ type }) => type === record.type));
    assert.ok(result.page.content.locationAviationContent.regulatoryContext.authority);
    assert.ok(result.page.content.relationshipStatement.includes('does not claim a local branch'));
    assert.ok(result.page.content.locationAviationContent.sourceLinks.length > 0);
    assert.ok(result.model.schema.faqItems.length > 0);
    assert.equal(result.model.quality.scores.factualSafetyScore, 100);
    assert.equal(result.model.qualityState, result.page.content.quality.state);
    assert.equal(result.page.content.quality.scores.factualSafetyScore, 100);
    if (result.model.indexable) {
      assert.equal(result.model.sitemapEligible, true);
      assert.match(result.model.metadata.robots, /^index,\s*follow\b/i);
    } else {
      assert.match(result.model.metadata.robots, /\bnoindex,\s*follow\b/i);
      assert.ok(result.page.content.quality.blockers.length > 0);
    }
    explicitResults.push({
      label,
      recordType: record.type,
      slug: record.slug,
      resolved: true,
      renderable: result.model.renderable,
      indexable: result.model.indexable,
      sitemapEligible: result.model.sitemapEligible,
      quality: result.model.quality,
    });
  }

  const serviceMatrix = [];
  const serviceTestLocation = namedRecord(registry.records, 'Mumbai', 'city', 'Maharashtra');
  for (const service of testedServices) {
    const result = await exerciseRecord(serviceTestLocation, { measure: false, service });
    assert.equal(result.model.renderable, true, `${service.slug} should be informationally renderable in India.`);
    assert.equal(result.model.metadata.canonical, `https://weoneaviation.in/${serviceTestLocation.slug}/${service.slug}`);
    assert.equal(result.page.content.serviceRelationship.mode, 'informational');
    assert.equal(result.page.content.serviceRelationship.localDeliveryVerified, false);
    assert.equal(result.page.content.serviceContent.serviceSlug, service.slug);
    assert.ok(result.page.content.serviceContent.trainingProcess.length > 0);
    serviceMatrix.push({
      service: service.slug,
      renderable: true,
      indexable: result.model.indexable,
      sitemapEligible: result.model.sitemapEligible,
      h1: result.model.metadata.h1,
      introduction: result.page.content.introduction,
      faqCount: result.model.faqs.length,
      internalLinks: result.page.content.internalLinks.map(({ href }) => href),
    });
  }
  assert.equal(new Set(serviceMatrix.map(({ h1 }) => h1)).size, testedServices.length);
  assert.equal(new Set(serviceMatrix.map(({ introduction }) => introduction)).size, testedServices.length);

  const serviceBySlug = new Map(testedServices.map((service) => [service.slug, service]));
  const requestedPaths = [
    '/delhi/pilot-training',
    '/dwarka/pilot-training',
    '/mumbai/pilot-training',
    '/bengaluru/pilot-training',
    '/pune/pilot-training',
    '/hyderabad/pilot-training',
    '/lucknow/pilot-training',
    '/laxmi-nagar/pilot-training',
    '/gachibowli/pilot-training',
    '/pune/dgca-ground-classes',
    '/pune/commercial-pilot-training',
    '/pune/cpl-training',
  ];
  const requestedRouteResults = [];
  for (const route of requestedPaths) {
    const result = await exerciseRoute(route, registry, serviceBySlug);
    if (result.httpStatus === 200) {
      assert.ok(result.canonical.endsWith(route), `${route} must self-canonicalize.`);
      assert.ok(result.title && result.description && result.h1);
      assert.ok(result.contentLength > 0 && result.fingerprint);
      assert.ok(Array.isArray(result.hierarchy) && result.hierarchy.length > 1);
      assert.equal(result.jsonLd, true);
      assert.equal(result.service, route.split('/')[2]);
      assert.equal(result.sitemapEligible, result.indexable);
      assert.equal(/\bnoindex\b/i.test(result.robots), !result.indexable);
    }
    requestedRouteResults.push(result);
  }
  assert.ok(
    requestedRouteResults.some(({ indexable }) => indexable === true),
    'The requested geographic route sample must contain indexable pages.',
  );
  const unsupportedService = SERVICES.find(({ slug }) => slug === 'pilot-school');
  assert.ok(unsupportedService);
  const serviceTestResolution = await resolveIndiaGeographicRoute(serviceTestLocation.slug);
  assert.throws(
    () => buildIndiaLocationServiceContent({
      record: serviceTestLocation,
      hierarchy: serviceTestResolution.hierarchy,
      service: unsupportedService,
    }),
    { code: 'UNSUPPORTED_DYNAMIC_LOCATION_SERVICE' },
  );

  const regionalEvidenceCases = [
    ['Hyderabad', 'Telangana', 'aviation:fto:flytech-nadergul'],
    ['Lucknow', 'Uttar Pradesh', 'aviation:fto:igrua-fursatganj'],
    ['Kolkata', 'West Bengal', 'aviation:fto:panagarh-chetak-pioneer'],
  ];
  const regionalEvidenceResults = [];
  for (const [name, state, evidenceId] of regionalEvidenceCases) {
    const record = namedRecord(registry.records, name, 'city', state);
    const result = await exerciseRecord(record, { measure: false });
    const aviation = result.page.content.locationAviationContent;
    assert.ok(
      aviation.nearbyAviationHubs.some((item) => item.evidenceId === evidenceId),
      `${evidenceId} must remain visible as regional context for ${name}.`,
    );
    assert.ok(
      !aviation.aviationFacts.some((item) => item.evidenceId === evidenceId),
      `${evidenceId} must not be promoted to a direct-local fact for ${name}.`,
    );
    regionalEvidenceResults.push({ location: name, evidenceId, relationship: 'regional-context' });
  }

  const laxmiNagar = await resolveIndiaGeographicRoute('laxmi-nagar');
  assert.equal(laxmiNagar.location?.type, 'neighborhood');
  assert.equal(laxmiNagar.location?.name, 'Laxmi Nagar');
  let gtbNagar;
  try {
    gtbNagar = await resolveIndiaGeographicRoute('gtb-nagar');
  } catch (error) {
    assert.match(error.message, /ambiguous/i);
  }
  assert.equal(gtbNagar?.location || null, null, 'GTB Nagar must not be guessed.');
  const gachibowli = await resolveIndiaGeographicRoute('gachibowli');
  assert.equal(gachibowli.location?.type, 'postal-area');

  let ambiguous = 0;
  for (const reference of ['gtb-nagar', 'varanasi']) {
    try {
      const result = await resolveIndiaGeographicRoute(reference);
      if (!result.location) ambiguous += 1;
    } catch (error) {
      if (/ambiguous/i.test(error.message)) ambiguous += 1;
      else throw error;
    }
  }
  assert.ok(ambiguous >= 1, 'At least one unscoped ambiguous/missing locality must fail closed.');

  const scaleResults = [];
  const sampleSizes = process.argv.includes('--quick') ? [1000] : [1000, 10000, 100000];
  for (const sampleSize of sampleSizes) {
    const sample = roundRobinSample(registry.records, sampleSize);
    const fingerprintGroups = new Map();
    const legacyFingerprintGroups = new Map();
    const sectionCounts = new Map();
    const faqCounts = new Map();
    const nearestMatches = [];
    const metrics = {
      sampleSize,
      resolved: 0,
      renderable: 0,
      indexable: 0,
      noindex: 0,
      rejected: 0,
      invalid: 0,
      ambiguous: 0,
      unsupportedBusinessClaims: 0,
      falsePhysicalPresenceClaims: 0,
      invalidRegionalEvidence: 0,
      sitemapEligible: 0,
      differentiationFailures: 0,
      differentiated: 0,
      exactDuplicateModels: 0,
      duplicates: 0,
      highSimilarity: 0,
      legacyExactDuplicateModels: 0,
      exactDuplicatePairs: [],
      repeatedSectionKinds: 0,
      repeatedFaqKinds: 0,
      maximumNormalizedSimilarityPercent: 0,
      averageResolutionMs: 0,
      maximumResolutionMs: 0,
      averageModelGenerationMs: 0,
      maximumModelGenerationMs: 0,
      averageQualityScores: {
        evidenceScore: 0,
        usefulnessScore: 0,
        differentiationScore: 0,
        factualSafetyScore: 0,
      },
      qualityStates: {},
      topNoindexReasons: {},
      noindexExamples: [],
      similarityScores: [],
      heapBeforeBytes: process.memoryUsage().heapUsed,
      peakHeapObservedBytes: process.memoryUsage().heapUsed,
    };
    let totalElapsedMs = 0;
    let totalResolutionMs = 0;
    let totalGenerationMs = 0;
    for (let index = 0; index < sample.length; index += 1) {
      let result;
      try {
        result = await exerciseRecord(sample[index]);
      } catch (error) {
        if (/ambiguous/i.test(error.message)) {
          metrics.ambiguous += 1;
          continue;
        }
        throw error;
      }
      metrics.resolved += ['INVALID', 'AMBIGUOUS', 'NOT_FOUND'].includes(result.status) ? 0 : 1;
      metrics.renderable += result.renderable ? 1 : 0;
      metrics.indexable += result.indexable ? 1 : 0;
      metrics.noindex += result.noindex ? 1 : 0;
      if (!result.indexable && metrics.noindexExamples.length < 20) {
        metrics.noindexExamples.push({
          slug: sample[index].slug,
          state: result.status,
          qualityState: result.qualityState,
          reason: result.indexabilityReason,
          stages: result.indexabilityStages.filter(({ passed }) => !passed),
        });
      }
      metrics.rejected += result.status === 'REJECTED' ? 1 : 0;
      metrics.invalid += result.status === 'INVALID' ? 1 : 0;
      metrics.unsupportedBusinessClaims += result.unsupportedClaims?.length || 0;
      metrics.falsePhysicalPresenceClaims += (
        result.relationship === 'physical' ? 1 : 0
      );
      metrics.invalidRegionalEvidence += (
        result.qualityScores.factualSafetyScore < 100 ? 1 : 0
      );
      metrics.sitemapEligible += result.sitemapEligible ? 1 : 0;
      metrics.differentiationFailures += result.differentiationPassed ? 0 : 1;
      metrics.differentiated += result.differentiationStatus === 'DIFFERENTIATED' ? 1 : 0;
      metrics.maximumNormalizedSimilarityPercent = Math.max(
        metrics.maximumNormalizedSimilarityPercent,
        result.normalizedSimilarityPercent || 0,
      );
      metrics.similarityScores.push(result.normalizedSimilarityPercent || 0);
      metrics.highSimilarity += (
        result.normalizedSimilarityPercent >= 80 ? 1 : 0
      );
      for (const reason of result.qualityBlockers || []) {
        metrics.topNoindexReasons[reason] = (metrics.topNoindexReasons[reason] || 0) + 1;
      }
      if (!result.indexable && result.indexabilityReason) {
        metrics.topNoindexReasons[result.indexabilityReason] = (
          metrics.topNoindexReasons[result.indexabilityReason] || 0
        ) + 1;
      }
      for (const [name, value] of Object.entries(result.qualityScores)) {
        metrics.averageQualityScores[name] += value;
      }
      metrics.qualityStates[result.qualityState] = (metrics.qualityStates[result.qualityState] || 0) + 1;
      const fingerprintEntry = fingerprintGroups.get(result.fingerprint) || {
        count: 0,
        slugs: [],
      };
      if (fingerprintEntry.count) {
        metrics.exactDuplicateModels += 1;
        if (metrics.exactDuplicatePairs.length < 20) {
          metrics.exactDuplicatePairs.push({
            first: fingerprintEntry.slugs[0],
            second: sample[index].slug,
            reason: 'Normalized visible content matches after hierarchy names are removed.',
          });
        }
      }
      fingerprintEntry.count += 1;
      if (fingerprintEntry.slugs.length < 5) fingerprintEntry.slugs.push(sample[index].slug);
      fingerprintGroups.set(result.fingerprint, fingerprintEntry);
      if (legacyFingerprintGroups.has(result.legacyFingerprint)) {
        metrics.legacyExactDuplicateModels += 1;
      } else {
        legacyFingerprintGroups.set(result.legacyFingerprint, true);
      }
      for (const sectionFingerprint of new Set(result.sectionFingerprints)) {
        sectionCounts.set(sectionFingerprint, (sectionCounts.get(sectionFingerprint) || 0) + 1);
      }
      faqCounts.set(result.faqFingerprint, (faqCounts.get(result.faqFingerprint) || 0) + 1);
      if (result.closestComparison) {
        const match = {
          location: sample[index].slug,
          comparison: result.closestComparison,
        };
        nearestMatches.push(match);
        nearestMatches.sort((left, right) => (
          right.comparison.normalizedSimilarityPercent
          - left.comparison.normalizedSimilarityPercent
        ));
        if (nearestMatches.length > 20) nearestMatches.pop();
      }
      totalElapsedMs += result.elapsedMs;
      totalResolutionMs += result.resolutionMs;
      totalGenerationMs += result.generationMs;
      metrics.maximumResolutionMs = Math.max(metrics.maximumResolutionMs, result.resolutionMs);
      metrics.maximumModelGenerationMs = Math.max(metrics.maximumModelGenerationMs, result.generationMs);
      if (index % 1000 === 0) {
        metrics.peakHeapObservedBytes = Math.max(
          metrics.peakHeapObservedBytes,
          process.memoryUsage().heapUsed,
        );
      }
    }
    for (const key of Object.keys(metrics.averageQualityScores)) {
      metrics.averageQualityScores[key] = Number(
        (metrics.averageQualityScores[key] / sampleSize).toFixed(2),
      );
    }
    metrics.averageResolutionMs = Number((totalResolutionMs / sampleSize).toFixed(4));
    metrics.maximumResolutionMs = Number(metrics.maximumResolutionMs.toFixed(4));
    metrics.averageModelGenerationMs = Number((totalGenerationMs / sampleSize).toFixed(4));
    metrics.maximumModelGenerationMs = Number(metrics.maximumModelGenerationMs.toFixed(4));
    metrics.maximumNormalizedSimilarityPercent = Number(
      metrics.maximumNormalizedSimilarityPercent.toFixed(1),
    );
    metrics.averageSimilarityPercent = Number((
      metrics.similarityScores.reduce((sum, score) => sum + score, 0) / sampleSize
    ).toFixed(1));
    metrics.similarityScores.sort((left, right) => left - right);
    metrics.medianSimilarityPercent = metrics.similarityScores[
      Math.floor(metrics.similarityScores.length / 2)
    ] || 0;
    metrics.p95SimilarityPercent = metrics.similarityScores[
      Math.floor(metrics.similarityScores.length * 0.95)
    ] || 0;
    delete metrics.similarityScores;
    metrics.heapAfterBytes = process.memoryUsage().heapUsed;
    metrics.heapDeltaBytes = metrics.heapAfterBytes - metrics.heapBeforeBytes;
    metrics.peakHeapDeltaBytes = metrics.peakHeapObservedBytes - metrics.heapBeforeBytes;
    metrics.averageTotalElapsedMs = Number((totalElapsedMs / sampleSize).toFixed(4));
    metrics.repeatedSectionKinds = [...sectionCounts.values()].filter((count) => count > 1).length;
    metrics.repeatedFaqKinds = [...faqCounts.values()].filter((count) => count > 1).length;
    metrics.nearDuplicateComparisons = nearestMatches;
    metrics.exactDuplicateGroups = [...fingerprintGroups.entries()]
      .filter(([, group]) => group.count > 1)
      .slice(0, 20)
      .map(([, group]) => group);
    delete metrics.peakHeapObservedBytes;
    metrics.duplicates = metrics.exactDuplicateModels;
    metrics.topNoindexReasons = Object.entries(metrics.topNoindexReasons)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 12)
      .map(([reason, count]) => ({ reason, count }));
    scaleResults.push(metrics);
    console.log(
      `${sampleSize}: ${metrics.resolved} resolved, ${metrics.renderable} renderable, `
      + `${metrics.indexable} indexable, ${metrics.noindex} noindex, `
      + `${metrics.rejected} rejected, ${metrics.ambiguous} ambiguous, `
      + `${metrics.duplicates} duplicates, ${metrics.highSimilarity} high similarity.`,
    );
  }

  assert.deepEqual(scaleResults.map(({ sampleSize }) => sampleSize), sampleSizes);
  assert.ok(scaleResults.every(({ renderable }) => renderable > 0));
  assert.ok(scaleResults.every(({ indexable }) => indexable > 0));
  console.log(JSON.stringify({
    result: 'PASS',
    registryRecords: registry.recordCount,
    registryLoad: {
      elapsedMs: Number(registryLoadMs.toFixed(2)),
      heapDeltaBytes: heapAfterRegistryLoad - heapBeforeRegistryLoad,
      resolverIndexWarmupMs: Number(resolverWarmupMs.toFixed(2)),
      resolverIndexHeapDeltaBytes: heapAfterResolverWarmup - heapAfterRegistryLoad,
    },
    explicitGeographicLevelTests: explicitResults,
    namedAliasTests: {
      laxmiNagar: 'RESOLVED',
      gtbNagar: 'NOT_FOUND',
      gachibowli: 'POSTAL_ONLY',
      ambiguousOrMissingFailClosed: ambiguous,
    },
    serviceMatrix,
    requestedRouteResults,
    regionalEvidenceTests: regionalEvidenceResults,
    scale: scaleResults,
  }, null, 2));
}

main().catch((error) => {
  console.error(`test-india-dynamic-location-route: ${error.stack || error.message}`);
  process.exitCode = 1;
});
