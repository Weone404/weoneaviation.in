const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const JSZip = require('jszip');

const rootDir = path.resolve(__dirname, '..');

function measure(name, count, operation) {
  let minimumMs = Infinity;
  let maximumMs = 0;
  let totalMs = 0;

  for (let index = 0; index < count; index += 1) {
    const started = performance.now();
    operation(index);
    const elapsed = performance.now() - started;
    totalMs += elapsed;
    minimumMs = Math.min(minimumMs, elapsed);
    maximumMs = Math.max(maximumMs, elapsed);
  }

  return {
    name,
    operations: count,
    totalMs: Number(totalMs.toFixed(3)),
    averageMs: Number((totalMs / count).toFixed(6)),
    minimumMs: Number(minimumMs.toFixed(6)),
    maximumMs: Number(maximumMs.toFixed(6)),
  };
}

function oneShotTiming(name, elapsed) {
  const rounded = Number(elapsed.toFixed(3));
  return {
    name,
    operations: 1,
    totalMs: rounded,
    averageMs: rounded,
    minimumMs: rounded,
    maximumMs: rounded,
  };
}

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function expectedLevel(hierarchy, types) {
  return [...hierarchy].reverse().find(({ type }) => types.includes(type)) || null;
}

function countXmlUrls(xml) {
  return (xml.match(/<url>/g) || []).length;
}

function findNamedCity(records, name) {
  return records.find(({ type, name: recordName }) => (
    type === 'city' && recordName === name
  ));
}

async function main() {
  const heapBeforeDatasetLoad = process.memoryUsage().heapUsed;
  const importStarted = performance.now();
  const fixtureModule = await import('../data/location-seo/geography/scale-test-fixtures.js');
  const datasetLoadMs = performance.now() - importStarted;
  const heapAfterDatasetLoad = process.memoryUsage().heapUsed;
  const [
    engine,
    geographicData,
    locationSeo,
    productionData,
    servicesModule,
    differentiation,
    pipeline,
    sourceAdapter,
    realGeography,
  ] = await Promise.all([
    import('../lib/locationEngine.js'),
    import('../lib/geographicData.js'),
    import('../lib/locationSeo.js'),
    import('../data/location-seo/locations.js'),
    import('../data/location-seo/location-engine-fixtures.js'),
    import('../lib/locationContentDifferentiation.js'),
    import('../lib/locationIndexabilityPolicy.js'),
    import('../lib/geographicSourceAdapters.js'),
    import('../data/location-seo/geography/real-sample.js'),
  ]);
  const records = fixtureModule.SCALE_TEST_GEOGRAPHIC_DATASET.records;
  const services = servicesModule.ENGINE_TEST_SERVICES;
  const realGeographicRecords = realGeography.REAL_GEOGRAPHIC_SAMPLE.records;
  const countries = [...new Set(records
    .filter(({ type }) => type === 'country')
    .map(({ name }) => name))];
  const levels = countBy(records, ({ type }) => type);
  const sourcePath = path.join(rootDir, 'pages', '[location]', '[service].jsx');
  const routeSource = fs.readFileSync(sourcePath, 'utf8');
  const productionSourcePaths = [
    sourcePath,
    path.join(rootDir, 'data', 'location-seo', 'locations.js'),
    path.join(rootDir, 'data', 'location-seo', 'services.js'),
    path.join(rootDir, 'lib', 'locationSeo.js'),
    path.join(rootDir, 'scripts', 'generate-sitemap.js'),
  ];
  const productionSourcesBefore = productionSourcePaths.map((filePath) => (
    fs.readFileSync(filePath, 'utf8')
  ));
  const generatedSitemapPath = path.join(rootDir, '.generated-sitemap.xml');
  const generatedSitemapBefore = fs.readFileSync(generatedSitemapPath, 'utf8');
  const productionRoutesBefore = locationSeo.getIndexableLocationServiceRoutes().sort();
  const approvedRoutesBefore = locationSeo.getApprovedLocationServiceRoutes().sort();
  const sitemapGeneratorSource = fs.readFileSync(
    path.join(rootDir, 'scripts', 'generate-sitemap.js'),
    'utf8',
  );
  const productionLocationsSource = fs.readFileSync(
    path.join(rootDir, 'data', 'location-seo', 'locations.js'),
    'utf8',
  );
  const productionRouteHashBefore = JSON.stringify(productionRoutesBefore);
  const locationSitemapSlugsBefore = [...productionData.LOCATION_SITEMAP_SLUGS].sort();
  const sitemapCountBefore = countXmlUrls(generatedSitemapBefore);

  assert.equal(
    fixtureModule.SCALE_TEST_GEOGRAPHIC_DATASET.datasetKind,
    'synthetic-geographic-scale-test-only',
  );
  assert.equal(records.length, fixtureModule.SCALE_TEST_EXPECTED_RECORD_COUNT);
  assert.equal(records.length >= 500 && records.length <= 1000, true);
  assert.equal(countries.includes('India'), true);
  assert.equal(countries.includes('United States'), true);
  assert.equal(countries.includes('United Kingdom'), true);
  assert.deepEqual(
    [...new Set(realGeographicRecords.map(({ country }) => country))].sort(),
    ['Australia', 'Canada', 'India', 'United Kingdom', 'United States'],
  );
  assert.equal(records.every(({ testOnly }) => testOnly === true), true);
  const requestedRealPlaceNames = [
    'Delhi',
    'Dwarka',
    'Mumbai',
    'Andheri',
    'Pune',
    'Lucknow',
    'New York County',
    'New York City',
    'Manhattan',
    'London',
    'Toronto',
    'Sydney',
  ];
  assert.ok(requestedRealPlaceNames.every((name) => (
    realGeographicRecords.some((record) => record.name === name)
  )));
  assert.equal(routeSource.includes('buildLocationPageModel'), true);
  assert.equal(routeSource.includes('getApprovedLocationServicePairs()'), true);
  assert.equal(routeSource.includes('scale-test-fixtures'), false);
  assert.equal(sitemapGeneratorSource.includes('getApprovedLocationServicePairs()'), true);
  assert.equal(/extractCitySlugs|\[city\]/.test(sitemapGeneratorSource), false);
  assert.equal(/city\s*===\s*['"]Bengaluru['"]/.test(productionLocationsSource), false);
  assert.equal(approvedRoutesBefore.length, 16);
  assert.deepEqual(approvedRoutesBefore, productionRoutesBefore);
  const bengaluruMedicalGuide = productionData.LOCATIONS.find(({ slug }) => slug === 'bengaluru');
  assert.ok(bengaluruMedicalGuide.localSections.some(({ title, body }) => (
    title === 'A separate initial-issue route in Bengaluru'
      && body.includes('Institute of Aerospace Medicine (IAM)')
  )));
  assert.equal(
    fs.existsSync(path.join(rootDir, 'pages', 'pilot-training-in-delhi.jsx')),
    true,
  );
  assert.equal(
    fs.existsSync(path.join(rootDir, 'pages', 'pilot-training-in-dwarka.jsx')),
    true,
  );
  const sampleTestRecords = realGeographicRecords.map((record) => ({
    ...record,
    relationship: 'INFORMATIONAL',
    renderable: true,
    indexable: false,
    indexabilityState: 'NOINDEX',
    supportedServices: services.map(({ slug }) => slug),
    serviceContent: records[0].serviceContent,
    testOnly: true,
  }));
  const sampleTestTargets = sampleTestRecords.filter(({ name }) => (
    requestedRealPlaceNames.includes(name)
  ));
  const sampleTestCombinations = [];
  for (const location of sampleTestTargets) {
    for (const service of services) {
      const model = engine.buildLocationPageModel({
        location,
        service,
        siteOrigin: 'https://geographic-sample.invalid',
        locations: sampleTestRecords,
      });
      const foreignDgcaIntent = ['dgca-ground-classes', 'dgca-exam'].includes(service.slug)
        && location.country !== 'India';
      assert.equal(model.canRender, !foreignDgcaIntent);
      assert.notEqual(model.indexability, 'INDEXABLE');
      assert.equal(model.productionSitemapEligible, false);
      assert.ok(model.metadata.title);
      assert.ok(model.metadata.description);
      assert.ok(model.metadata.h1);
      assert.ok(model.schema.breadcrumbItems.includes(location.name));
      assert.ok(model.hierarchy.length > 0);
      assert.ok(model.relationshipGuidance);
      if (!foreignDgcaIntent) {
        assert.ok(model.faqs.length > 0);
        assert.ok(model.links.length > 0);
        assert.ok(model.regulatoryContext?.authority);
      } else {
        assert.equal(model.content, null);
        assert.ok(!model.renderedBody.join(' ').includes('DGCA'));
      }
      sampleTestCombinations.push({ location, service, model });
    }
  }
  assert.equal(sampleTestTargets.length, requestedRealPlaceNames.length);
  assert.equal(sampleTestCombinations.length, requestedRealPlaceNames.length * services.length);

  const validationStarted = performance.now();
  const validationErrors = geographicData.validateGeographicData(records);
  const validationMs = performance.now() - validationStarted;
  assert.deepEqual(validationErrors, [], validationErrors.join('\n'));

  const lookupBuildStarted = performance.now();
  assert.equal(geographicData.resolveBySlug(records[0].slug, records), records[0]);
  const lookupIndexBuildMs = performance.now() - lookupBuildStarted;

  const resolverSuccess = { valid: 0, invalidExpected: 0, ambiguous: 0, failed: 0 };
  const typeResolvers = [
    ['resolveCountry', geographicData.resolveCountry, ['country']],
    ['resolveState', geographicData.resolveState, ['state', 'province', 'region']],
    ['resolveCounty', geographicData.resolveCounty, ['county', 'district', 'subdistrict']],
    ['resolveCity', geographicData.resolveCity, ['city', 'town']],
    ['resolveLocality', geographicData.resolveLocality, ['locality', 'neighborhood']],
  ];
  const resolveAliasForRecord = (record) => {
    try {
      return geographicData.resolveByAlias(record.name, records, {
        country: record.country,
        parentId: record.parentId,
      });
    } catch (error) {
      if (error instanceof Error && /is ambiguous/.test(error.message)) return null;
      throw error;
    }
  };

  for (const record of records) {
    if (geographicData.resolveBySlug(record.slug, records)?.id === record.id) {
      resolverSuccess.valid += 1;
    } else {
      resolverSuccess.failed += 1;
    }
    const hierarchy = geographicData.resolveHierarchy(record.slug, records);
    const expectedHierarchy = (() => {
      const chain = [];
      let current = record;
      while (current) {
        chain.unshift(current);
        current = records.find(({ id }) => id === current.parentId) || null;
      }
      return chain;
    })();
    if (JSON.stringify(hierarchy.map(({ id }) => id))
      === JSON.stringify(expectedHierarchy.map(({ id }) => id))) resolverSuccess.valid += 1;
    else resolverSuccess.failed += 1;
    const aliasResult = resolveAliasForRecord(record);
    if (aliasResult?.id === record.id) resolverSuccess.valid += 1;
    else if (aliasResult === null && !record.parentId) resolverSuccess.ambiguous += 1;
    else resolverSuccess.failed += 1;
    for (const [, resolver, allowedTypes] of typeResolvers) {
      const expected = expectedLevel(hierarchy, allowedTypes);
      const actual = resolver(record.slug, records);
      if ((actual?.id || null) === (expected?.id || null)) resolverSuccess.valid += 1;
      else resolverSuccess.failed += 1;
    }

    if (record.postalCode) {
      if (geographicData.resolveByPostalCode(record.postalCode, records, record.country)?.id === record.id) {
        resolverSuccess.valid += 1;
      } else resolverSuccess.failed += 1;
    }
  }

  const invalidResolverProbes = [
    geographicData.resolveBySlug('missing-scale-record', records),
    geographicData.resolveByAlias('missing-scale-alias', records),
    geographicData.resolveByPostalCode('missing-scale-postal', records),
    geographicData.resolveHierarchy('missing-scale-hierarchy', records),
  ];
  assert.deepEqual(invalidResolverProbes, [null, null, null, null]);
  resolverSuccess.invalidExpected = invalidResolverProbes.length;

  const ambiguousAlias = () => geographicData.resolveByAlias(
    'Springfield',
    records,
    { country: 'United States' },
  );
  const ambiguousPostal = () => geographicData.resolveByPostalCode('SCALE-0001', records);
  assert.throws(ambiguousAlias, /is ambiguous/);
  assert.throws(ambiguousPostal, /is ambiguous/);

  const validationDiagnostics = {
    duplicate: geographicData.validateGeographicData([
      ...records,
      {
        ...records[1],
        id: records[1].id,
        slug: 'scale-duplicate-slug',
        name: 'Scale Test Duplicate Record',
      },
    ]),
    orphan: geographicData.validateGeographicData([
      ...records,
      {
        ...records[1],
        id: 'scale:orphan',
        slug: 'scale-orphan',
        name: 'Scale Test Orphan',
        parentId: 'scale:missing-parent',
      },
    ]),
    invalidHierarchy: geographicData.validateGeographicData([
      ...records,
      {
        ...records.find(({ type }) => type === 'city'),
        id: 'scale:invalid-hierarchy',
        slug: 'scale-invalid-hierarchy',
        name: 'Scale Test Invalid Hierarchy',
        parentId: records.find(({ type }) => type === 'country').id,
      },
    ]),
  };
  const cycleRecords = [
    ...records,
    {
      ...records.find(({ type }) => type === 'city'),
      id: 'scale:cycle:city',
      slug: 'scale-cycle-city',
      name: 'Scale Test Cycle City',
      parentId: 'scale:cycle:locality',
    },
    {
      ...records.find(({ type }) => type === 'locality'),
      id: 'scale:cycle:locality',
      slug: 'scale-cycle-locality',
      name: 'Scale Test Cycle Locality',
      parentId: 'scale:cycle:city',
    },
  ];
  validationDiagnostics.cycle = geographicData.validateGeographicData(cycleRecords);
  assert.ok(validationDiagnostics.duplicate.some((error) => /Duplicate geographic id/.test(error)));
  assert.ok(validationDiagnostics.orphan.some((error) => /missing parent/.test(error)));
  assert.ok(validationDiagnostics.invalidHierarchy.some((error) => /Invalid hierarchy/.test(error)));
  assert.ok(validationDiagnostics.cycle.some((error) => /parent cycle/.test(error)));
  assert.throws(
    () => geographicData.resolveHierarchy('scale-cycle-city', cycleRecords),
    /parent cycle/,
  );

  const namedCityResults = [
    'Mumbai',
    'New York City',
    'London',
    'Toronto',
    'Sydney',
    'Singapore',
    'Dubai',
    'Paris',
    'Berlin',
    'Tokyo',
  ].map((name) => findNamedCity(records, name));
  assert.equal(namedCityResults.every(Boolean), true);

  const servicesBySlug = new Map(services.map((service) => [service.slug, service]));
  const combinationSummaries = [];
  for (const location of records) {
    for (const service of services) {
      const result = engine.resolveLocationService(location, service, records);
      combinationSummaries.push({
        location,
        service,
        canRender: result.canRender,
        supportStatus: result.supportStatus,
        renderStatus: result.renderStatus,
        indexability: result.indexability,
      });
    }
  }
  const serviceCombinationStatuses = {
    support: countBy(combinationSummaries, ({ supportStatus }) => supportStatus),
    rendering: countBy(combinationSummaries, ({ renderStatus }) => renderStatus),
    indexability: countBy(combinationSummaries, ({ indexability }) => indexability),
  };
  const supportedCombinations = combinationSummaries.filter(({ canRender }) => canRender);
  assert.ok(supportedCombinations.length > 0);
  assert.ok(serviceCombinationStatuses.support.NOT_SUPPORTED > 0);
  assert.equal(serviceCombinationStatuses.indexability.INDEXABLE || 0, 0);

  const representativeLocations = [
    records.find(({ type }) => type === 'country'),
    records.find(({ type }) => type === 'state'),
    records.find(({ type }) => type === 'province'),
    records.find(({ type }) => type === 'region'),
    records.find(({ type }) => type === 'county'),
    records.find(({ type }) => type === 'district'),
    findNamedCity(records, 'Toronto'),
    records.find(({ type }) => type === 'town'),
    records.find(({ type }) => type === 'locality'),
    records.find(({ type }) => type === 'neighborhood'),
    records.find(({ type }) => type === 'postal-area'),
  ].filter(Boolean);

  const modelFor = (location, service, contentDifferentiation = null, modelRecords = records) => (
    engine.buildLocationPageModel({
      location,
      service,
      contentDifferentiation,
      locations: modelRecords,
      geographicDataValidated: true,
    })
  );

  const representativeModels = representativeLocations.map((location) => {
    const service = servicesBySlug.get('pilot-training');
    const model = modelFor(location, service);
    assert.equal(model.canRender, true, `${location.type} fixture should render.`);
    assert.ok(model.metadata.title);
    assert.ok(model.metadata.description);
    assert.ok(model.metadata.h1);
    assert.equal(model.breadcrumbs.length, 2);
    assert.equal(model.schema.breadcrumbItems.length, model.hierarchy.length + 1);
    assert.ok(model.faqs.length > 0);
    assert.ok(model.relationshipGuidance);
    assert.ok(Array.isArray(model.links));
    assert.ok(model.links.length > 0);
    assert.notEqual(model.indexability, 'INDEXABLE');
    assert.equal(model.productionSitemapEligible, false);
    if (['city', 'town', 'locality', 'neighborhood', 'postal-area'].includes(location.type)) {
      assert.ok(model.hierarchy.length > 1);
    }
    return { location, service, model };
  });
  assert.ok(representativeModels.some(({ model }) => model.regulatoryContext?.authority));
  assert.ok(representativeModels.some(({ model }) => model.inheritedFactNotice));

  const namedCityModels = namedCityResults.map((location) => {
    const service = servicesBySlug.get('pilot-training');
    const preliminaryModel = modelFor(location, service);
    const candidate = differentiation.buildLocationContentSnapshot({
      location,
      hierarchy: preliminaryModel.hierarchy,
      model: preliminaryModel,
    });
    const comparisons = namedCityResults
      .filter((comparison) => comparison.id !== location.id)
      .map((comparison) => {
        const comparisonModel = modelFor(comparison, service);
        return differentiation.buildLocationContentSnapshot({
          location: comparison,
          hierarchy: comparisonModel.hierarchy,
          model: comparisonModel,
        });
      });
    const assessment = differentiation.assessContentDifferentiation({
      candidate,
      comparisons,
    });
    const model = modelFor(location, service, assessment);
    assert.equal(model.indexability, 'CONTENT_DIFFERENTIATION_REQUIRED');
    assert.equal(model.productionSitemapEligible, false);
    return { location, candidate, assessment, model };
  });

  const similarityPairs = [];
  for (const { location, assessment } of namedCityModels) {
    for (const comparison of assessment.comparisons) {
      similarityPairs.push({
        left: location.name,
        right: namedCityResults.find(({ slug }) => slug === comparison.slug)?.name,
        exactDuplicate: comparison.exactDuplicate,
        normalizedSimilarityPercent: comparison.normalizedSimilarityPercent,
      });
    }
  }
  similarityPairs.sort((left, right) => (
    right.normalizedSimilarityPercent - left.normalizedSimilarityPercent
  ));
  const differentiationMetrics = {
    samplePages: namedCityModels.length,
    exactDuplicatePercent: Number((
      namedCityModels.reduce((sum, { assessment }) => (
        sum + assessment.metrics.exactDuplicatePercent
      ), 0) / namedCityModels.length
    ).toFixed(1)),
    averageNormalizedSimilarityPercent: Number((
      namedCityModels.reduce((sum, { assessment }) => (
        sum + assessment.metrics.normalizedSimilarityPercent
      ), 0) / namedCityModels.length
    ).toFixed(1)),
    maximumNormalizedSimilarityPercent: Math.max(
      ...namedCityModels.map(({ assessment }) => assessment.metrics.normalizedSimilarityPercent),
    ),
    genericContentPercent: Number((
      namedCityModels.reduce((sum, { assessment }) => (
        sum + assessment.metrics.genericContentPercent
      ), 0) / namedCityModels.length
    ).toFixed(1)),
    inheritedContentPercent: Number((
      namedCityModels.reduce((sum, { assessment }) => (
        sum + assessment.metrics.inheritedContentPercent
      ), 0) / namedCityModels.length
    ).toFixed(1)),
    directLocationContentPercent: Number((
      namedCityModels.reduce((sum, { assessment }) => (
        sum + assessment.metrics.directContentPercent
      ), 0) / namedCityModels.length
    ).toFixed(1)),
    regulatoryContentPercent: Number((
      namedCityModels.reduce((sum, { assessment }) => (
        sum + assessment.metrics.regulatoryContentPercent
      ), 0) / namedCityModels.length
    ).toFixed(1)),
    averageUniqueSections: Number((
      namedCityModels.reduce((sum, { assessment }) => (
        sum + assessment.metrics.uniqueSectionCount
      ), 0) / namedCityModels.length
    ).toFixed(2)),
    averageUniqueFaqs: Number((
      namedCityModels.reduce((sum, { assessment }) => (
        sum + assessment.metrics.uniqueFaqCount
      ), 0) / namedCityModels.length
    ).toFixed(2)),
    differentiationRequiredPages: namedCityModels.filter(({ assessment }) => (
      assessment.status === 'CONTENT_DIFFERENTIATION_REQUIRED'
    )).length,
    highestSimilarityPairs: similarityPairs.slice(0, 5),
  };
  assert.ok(differentiationMetrics.differentiationRequiredPages > 0);
  assert.ok(differentiationMetrics.maximumNormalizedSimilarityPercent
    >= differentiationMetrics.averageNormalizedSimilarityPercent);

  const promotedCity = findNamedCity(records, 'Toronto');
  const promotedRecord = Object.freeze({
    ...promotedCity,
    indexable: true,
    indexabilityState: undefined,
  });
  const promotedRecords = [...records.filter(({ id }) => id !== promotedCity.id), promotedRecord];
  const promoted = modelFor(
    promotedRecord,
    servicesBySlug.get('pilot-training'),
    {
      status: 'PASSED',
      sitemapEligible: true,
      metrics: {},
      comparisons: [],
      reasons: [],
    },
    promotedRecords,
  );
  assert.equal(promoted.indexability, 'INDEXABLE');
  assert.equal(promoted.productionSitemapEligible, false);
  const sitemapGateProof = pipeline.evaluateLocationIndexabilityPipeline({
    locationExists: true,
    hierarchyValid: true,
    serviceExists: true,
    serviceCompatible: true,
    relationshipValid: true,
    contentAvailable: true,
    contentDifferentiation: { status: 'PASSED' },
    businessClaimsValid: true,
    renderable: true,
    indexabilityApproved: true,
    sitemapAllowlisted: false,
  });
  assert.equal(sitemapGateProof.status, 'INDEXABLE');
  assert.equal(sitemapGateProof.sitemapEligible, false);

  const supportedForModels = supportedCombinations.map(({ location, service }) => ({
    location,
    service,
  }));
  const pageModel100 = measure('generate-100-page-models', 100, (index) => {
    const { location, service } = supportedForModels[index % supportedForModels.length];
    modelFor(location, service);
  });
  const pageModel1000 = measure('generate-1000-page-models', 1000, (index) => {
    const { location, service } = supportedForModels[index % supportedForModels.length];
    modelFor(location, service);
  });
  const resolution100 = measure('resolve-100-locations', 100, (index) => {
    const record = records[index % records.length];
    geographicData.resolveBySlug(record.slug, records);
    resolveAliasForRecord(record);
    geographicData.resolveHierarchy(record.slug, records);
    for (const [, resolver] of typeResolvers) resolver(record.slug, records);
  });
  const resolution1000 = measure('resolve-1000-locations', 1000, (index) => {
    const record = records[index % records.length];
    geographicData.resolveBySlug(record.slug, records);
    resolveAliasForRecord(record);
    geographicData.resolveHierarchy(record.slug, records);
    for (const [, resolver] of typeResolvers) resolver(record.slug, records);
  });
  const resolution10000 = measure('resolve-10000-operations', 10000, (index) => {
    const record = records[index % records.length];
    geographicData.resolveBySlug(record.slug, records);
  });

  const sourceHeapStart = process.memoryUsage().heapUsed;
  const geoNamesArchivePath = path.join(
    rootDir,
    'data',
    'locations',
    'source',
    'geonames-IN.zip',
  );
  if (!fs.existsSync(geoNamesArchivePath)) {
    throw new Error(`Required GeoNames source archive is missing: ${geoNamesArchivePath}`);
  }
  const sourceDataLoadStarted = performance.now();
  const geoNamesArchive = await JSZip.loadAsync(fs.readFileSync(geoNamesArchivePath));
  const geoNamesFile = geoNamesArchive.file('IN.txt');
  if (!geoNamesFile) throw new Error('GeoNames India source archive does not contain IN.txt.');
  const geoNamesPostalText = await geoNamesFile.async('string');
  const sourceDataLoadMs = performance.now() - sourceDataLoadStarted;
  const sourceScaleBenchmarks = [];
  let geoNamesTenThousand = null;
  for (const postalRecordLimit of [1000, 5000, 10000]) {
    const ingestionStarted = performance.now();
    const sourcedDataset = sourceAdapter.parseGeoNamesPostalTsv(geoNamesPostalText, {
      country: 'India',
      countryCode: 'IN',
      limit: postalRecordLimit,
    });
    const ingestionMs = performance.now() - ingestionStarted;
    assert.equal(
      sourcedDataset.acceptedPostalCodes,
      postalRecordLimit,
      `GeoNames source must provide ${postalRecordLimit} unambiguous postal records.`,
    );

    const sourcedValidationStarted = performance.now();
    const sourcedValidationErrors = geographicData.validateGeographicData(sourcedDataset.records);
    const sourcedValidationMs = performance.now() - sourcedValidationStarted;
    assert.deepEqual(
      sourcedValidationErrors,
      [],
      `GeoNames ${postalRecordLimit}-postal sample: ${sourcedValidationErrors.join('\n')}`,
    );

    const sourcedIndexBuildStarted = performance.now();
    assert.ok(geographicData.resolveBySlug(
      sourcedDataset.records[0].slug,
      sourcedDataset.records,
    ));
    const sourcedLookupIndexMs = performance.now() - sourcedIndexBuildStarted;
    sourceScaleBenchmarks.push({
      requestedPostalRecords: postalRecordLimit,
      acceptedPostalRecords: sourcedDataset.acceptedPostalCodes,
      totalGeographicRecords: sourcedDataset.records.length,
      skippedAmbiguousPostalRecords: sourcedDataset.ambiguousPostalCodes,
      ingestion: oneShotTiming(`ingest-${postalRecordLimit}`, ingestionMs),
      validation: oneShotTiming(`validate-${postalRecordLimit}`, sourcedValidationMs),
      lookupIndexBuild: oneShotTiming(`index-${postalRecordLimit}`, sourcedLookupIndexMs),
    });
    if (postalRecordLimit === 10000) geoNamesTenThousand = sourcedDataset;
  }
  if (!geoNamesTenThousand) throw new Error('The 10,000-record GeoNames benchmark did not run.');

  const sourcedPostals = geoNamesTenThousand.records
    .filter(({ type }) => type === 'postal-area');
  const sourcedResolution = (operationCount) => measure(
    `geonames-resolve-${operationCount}`,
    operationCount,
    (index) => {
      const record = sourcedPostals[index % sourcedPostals.length];
      assert.equal(
        geographicData.resolveBySlug(record.slug, geoNamesTenThousand.records).id,
        record.id,
      );
      assert.equal(
        geographicData.resolveByPostalCode(record.postalCode, geoNamesTenThousand.records, 'India').id,
        record.id,
      );
      geographicData.resolveHierarchy(record.slug, geoNamesTenThousand.records);
    },
  );
  const sourcedResolution100 = sourcedResolution(100);
  const sourcedResolution1000 = sourcedResolution(1000);
  const sourcedResolution10000 = sourcedResolution(10000);

  const sourcePostalTargets = sourcedPostals.slice(0, 1000);
  const sourceModelIds = new Set(sourcePostalTargets.flatMap(({ parentIds, id }) => [id, ...parentIds]));
  const sourceModelGeography = geoNamesTenThousand.records
    .filter(({ id }) => sourceModelIds.has(id));
  const testOnlyContent = records[0].serviceContent;
  const sourceModelLocations = sourceModelGeography.map((record) => ({
    ...record,
    relationship: 'INFORMATIONAL',
    renderable: true,
    indexable: false,
    indexabilityState: 'NOINDEX',
    supportedServices: ['pilot-training'],
    serviceContent: testOnlyContent,
    testOnly: true,
  }));
  const sourceModelLocationsById = new Map(sourceModelLocations.map((location) => [
    location.id,
    location,
  ]));
  const sourcePageTargets = sourcePostalTargets.map(({ id }) => sourceModelLocationsById.get(id));
  const pilotTrainingService = services.find(({ slug }) => slug === 'pilot-training');
  const sourcePageModel = (location) => engine.buildLocationPageModel({
    location,
    service: pilotTrainingService,
    siteOrigin: 'https://sourced-sample.invalid',
    locations: sourceModelLocations,
  });
  const sourcePageModel100 = measure('geonames-generate-100-page-models', 100, (index) => {
    const model = sourcePageModel(sourcePageTargets[index]);
    assert.equal(model.canRender, true);
    assert.notEqual(model.indexability, 'INDEXABLE');
    assert.equal(model.productionSitemapEligible, false);
  });
  const sourcePageModel1000 = measure('geonames-generate-1000-page-models', 1000, (index) => {
    const model = sourcePageModel(sourcePageTargets[index]);
    assert.equal(model.canRender, true);
    assert.notEqual(model.indexability, 'INDEXABLE');
    assert.equal(model.productionSitemapEligible, false);
  });
  const geonamesSourceObjects = geoNamesTenThousand.records
    .flatMap(({ sourceLinks }) => sourceLinks);
  const sourcedRecordReferences = new Set(geoNamesTenThousand.records);
  const nestedRecordReferences = geoNamesTenThousand.records.reduce((total, record) => (
    total + Object.values(record).filter((value) => (
      Array.isArray(value)
      && value.some((item) => item && typeof item === 'object' && sourcedRecordReferences.has(item))
    )).length
  ), 0);
  const storedAncestorIds = geoNamesTenThousand.records.flatMap(({ parentIds }) => parentIds);
  const sourceMemoryStructure = {
    totalGeographicRecords: geoNamesTenThousand.records.length,
    postalAreaRecords: sourcedPostals.length,
    duplicateRecordObjects: sourcedRecordReferences.size !== geoNamesTenThousand.records.length,
    sourceLinkEntries: geonamesSourceObjects.length,
    uniqueSourceObjects: new Set(geonamesSourceObjects).size,
    uniqueSourceLinkArrays: new Set(
      geoNamesTenThousand.records.map(({ sourceLinks }) => sourceLinks),
    ).size,
    nestedRecordReferences,
    recordsWithParentIds: geoNamesTenThousand.records
      .filter(({ parentIds }) => Array.isArray(parentIds)).length,
    uniqueParentIdsArrays: new Set(
      geoNamesTenThousand.records.map(({ parentIds }) => parentIds),
    ).size,
    storedAncestorIdEntries: storedAncestorIds.length,
    uniqueAncestorIdsReferenced: new Set(storedAncestorIds).size,
    heapDeltaBytesSinceSourcedLoadStart: process.memoryUsage().heapUsed - sourceHeapStart,
    heapMeasurementNote: 'Process heap delta includes zip parsing, source normalization, indexes, and model tests; garbage collection was not forced.',
  };
  assert.equal(sourceMemoryStructure.duplicateRecordObjects, false);
  assert.equal(sourceMemoryStructure.uniqueSourceObjects, 1);
  assert.equal(sourceMemoryStructure.uniqueSourceLinkArrays, 1);
  assert.equal(sourceMemoryStructure.nestedRecordReferences, 0);

  const validRecordSlugs = new Set(records.map(({ slug }) => slug));
  const duplicateSlugs = records.length - validRecordSlugs.size;
  const sourceObjects = records.flatMap(({ sourceLinks }) => sourceLinks);
  const sourceObjectIdentities = new Set(sourceObjects);
  const regulatoryObjects = records
    .map(({ regulatoryContext }) => regulatoryContext)
    .filter(Boolean);
  const regulatoryObjectIdentities = new Set(regulatoryObjects);
  const contentObjectIdentities = new Set(records.map(({ serviceContent }) => serviceContent));
  const supportedServiceArrayIdentities = new Set(
    records.map(({ supportedServices }) => supportedServices),
  );
  const sourceLinkArrayIdentities = new Set(records.map(({ sourceLinks }) => sourceLinks));
  const relatedLocationArrayIdentities = new Set(records.map(({ relatedLocationIds }) => (
    relatedLocationIds
  )));
  const aliasArrayIdentities = new Set(records.map(({ aliases }) => aliases));
  const recordsWithStoredHierarchy = records.filter(({ hierarchy }) => Array.isArray(hierarchy)).length;
  const memoryStructure = {
    recordCount: records.length,
    duplicateRecordCount: duplicateSlugs,
    duplicatedRecordObjects: new Set(records).size !== records.length,
    uniqueServiceContentMaps: contentObjectIdentities.size,
    repeatedServiceContentMapReferences: records.length - contentObjectIdentities.size,
    uniqueSupportedServiceArrays: supportedServiceArrayIdentities.size,
    repeatedSupportedServiceArrayReferences: records.length - supportedServiceArrayIdentities.size,
    sourceLinkEntries: sourceObjects.length,
    uniqueSourceObjects: sourceObjectIdentities.size,
    uniqueSourceLinkArrays: sourceLinkArrayIdentities.size,
    uniqueRelatedLocationArrays: relatedLocationArrayIdentities.size,
    uniqueAliasArrays: aliasArrayIdentities.size,
    regulatoryContextReferences: regulatoryObjects.length,
    uniqueRegulatoryContextObjects: regulatoryObjectIdentities.size,
    recordsWithStoredHierarchyArrays: recordsWithStoredHierarchy,
    heapDeltaDuringDatasetModuleLoadBytes: heapAfterDatasetLoad - heapBeforeDatasetLoad,
    supportedServiceEntries: records.reduce(
      (sum, { supportedServices }) => sum + supportedServices.length,
      0,
    ),
    heapMeasurementNote: 'Module-load delta includes test-fixture dependencies and was not isolated with forced garbage collection.',
  };

  assert.equal(duplicateSlugs, 0);
  assert.equal(memoryStructure.duplicatedRecordObjects, false);
  assert.equal(memoryStructure.uniqueServiceContentMaps, 1);
  assert.equal(memoryStructure.sourceLinkEntries, 0);
  assert.equal(records[0].testOnly, true);

  const routeSourceShowsProductionAllowlist = routeSource.includes('getApprovedLocationServicePairs()');
  const fixtureRoutesAbsent = records.every(({ slug }) => (
    !productionRoutesBefore.some((route) => route.startsWith(`/${slug}/`))
      && !generatedSitemapBefore.includes(`/${slug}/`)
  ));
  const productionRoutesAfter = locationSeo.getIndexableLocationServiceRoutes().sort();
  const approvedRoutesAfter = locationSeo.getApprovedLocationServiceRoutes().sort();
  const sitemapAfterScript = fs.readFileSync(generatedSitemapPath, 'utf8');
  const sourceRecordsAbsentFromProduction = geoNamesTenThousand.records.every(({ slug }) => (
    !productionRoutesBefore.some((route) => route.startsWith(`/${slug}/`))
      && !generatedSitemapBefore.includes(`/${slug}/`)
  ));
  const productionSourcesAfter = productionSourcePaths.map((filePath) => (
    fs.readFileSync(filePath, 'utf8')
  ));
  const productionDataSourcesUnchanged = productionSourcesBefore.every(
    (source, index) => source === productionSourcesAfter[index],
  );
  const productionSafety = {
    sharedPageComponent: 'pages/[location]/[service].jsx',
    routeSourceShowsProductionAllowlist,
    routeSourceImportsScaleFixture: routeSource.includes('scale-test-fixtures'),
    productionRoutesBefore: productionRoutesBefore.length,
    productionRoutesAfter: productionRoutesAfter.length,
    productionRoutesUnchanged: JSON.stringify(productionRoutesAfter) === productionRouteHashBefore,
    approvedRoutesBefore: approvedRoutesBefore.length,
    approvedRoutesAfter: approvedRoutesAfter.length,
    approvedRoutesUnchanged: JSON.stringify(approvedRoutesAfter) === JSON.stringify(approvedRoutesBefore),
    locationSitemapSlugsBefore,
    locationSitemapSlugsAfter: [...productionData.LOCATION_SITEMAP_SLUGS].sort(),
    generatedSitemapUrlsBefore: sitemapCountBefore,
    generatedSitemapUrlsAfter: countXmlUrls(sitemapAfterScript),
    generatedSitemapUnchanged: generatedSitemapBefore === sitemapAfterScript,
    testFixtureLocationsAbsentFromProductionRoutesAndSitemap: fixtureRoutesAbsent,
    sourcedGeographyAbsentFromProductionRoutesAndSitemap: sourceRecordsAbsentFromProduction,
    pinAndNearPagesInSitemap: (generatedSitemapBefore.match(
      /<loc>[^<]*(?:pin-code|postal-area|pilot-training-near)[^<]*<\/loc>/gi,
    ) || []).length,
    productionDataSourcesUnchanged,
    deployment: 'not performed',
    push: 'not performed',
    merge: 'not performed',
  };

  assert.equal(productionSafety.productionRoutesUnchanged, true);
  assert.equal(productionSafety.generatedSitemapUnchanged, true);
  assert.equal(productionSafety.productionDataSourcesUnchanged, true);
  assert.equal(productionSafety.testFixtureLocationsAbsentFromProductionRoutesAndSitemap, true);
  assert.equal(productionSafety.sourcedGeographyAbsentFromProductionRoutesAndSitemap, true);
  assert.equal(productionSafety.pinAndNearPagesInSitemap, 0);
  assert.equal(productionSafety.generatedSitemapUrlsBefore, 134);

  const resolverTotal = resolverSuccess.valid + resolverSuccess.failed + resolverSuccess.ambiguous;
  const output = {
    geographicDataset: {
      recordCount: records.length,
      countries,
      geographicLevels: levels,
      datasetKind: fixtureModule.SCALE_TEST_GEOGRAPHIC_DATASET.datasetKind,
      performanceFixtureOnly: true,
      sourcedReferenceSample: {
        recordCount: realGeographicRecords.length,
        countries: [...new Set(realGeographicRecords.map(({ country }) => country))].sort(),
        namedTestLocations: requestedRealPlaceNames,
        importedByProductionRoutesOrSitemap: false,
      },
    },
    aviationIntent: {
      intents: services.map(({ slug }) => slug),
      locationServiceCombinations: combinationSummaries.length,
      supportedCombinations: supportedCombinations.length,
      unsupportedCombinations: serviceCombinationStatuses.support.NOT_SUPPORTED,
      statuses: serviceCombinationStatuses,
      realSampleLocationServiceModels: sampleTestCombinations.length,
      realSamplePageModelsNonIndexable: sampleTestCombinations.every(
        ({ model }) => model.indexability !== 'INDEXABLE'
          && !model.productionSitemapEligible,
      ),
      foreignDgcaCombinationsNotRenderable: sampleTestCombinations
        .filter(({ location, service }) => (
          ['dgca-ground-classes', 'dgca-exam'].includes(service.slug)
            && location.country !== 'India'
        ))
        .every(({ model }) => !model.canRender && model.indexability === 'NOT_SUPPORTED'),
    },
    resolverTests: {
      expectedSuccessfulResolutions: resolverSuccess.valid,
      failedResolutions: resolverSuccess.failed,
      resolverCallsForFullDataset: resolverTotal,
      invalidReferencesRejected: resolverSuccess.invalidExpected,
      ambiguousAliasResolutions: resolverSuccess.ambiguous + 1,
      ambiguousPostalResolutions: 1,
      invalidHierarchyRecords: validationDiagnostics.invalidHierarchy.filter(
        (error) => /Invalid hierarchy/.test(error),
      ).length,
      orphanRecords: validationDiagnostics.orphan.filter((error) => /missing parent/.test(error)).length,
      duplicateRecordsDetected: validationDiagnostics.duplicate.filter(
        (error) => /Duplicate geographic id/.test(error),
      ).length,
      cycleDiagnosticErrors: validationDiagnostics.cycle.filter((error) => /parent cycle/.test(error)).length,
      cycleComponentsInjected: 1,
      validDatasetErrors: validationErrors.length,
      realSourcePostalSamples: sourceScaleBenchmarks.map((item) => ({
        postalRecords: item.acceptedPostalRecords,
        totalRecords: item.totalGeographicRecords,
        valid: true,
      })),
    },
    pageModels: {
      representativeModelsGenerated: representativeModels.length,
      namedRealGeographyModelsGenerated: sampleTestCombinations.length,
      sourcedPostalModelsGenerated: 1000,
      sourcedPostalModelsNonIndexable: sourcePageModel1000.operations === sourcePostalTargets.length,
      representativeGeographicTypes: representativeModels.map(({ location }) => location.type),
      namedDataOnlyLocationsResolved: namedCityResults.map(({ name, slug }) => ({ name, slug })),
      requestedModelFieldsVerified: [
        'title',
        'description',
        'H1',
        'breadcrumbs',
        'FAQs',
        'regulatory context',
        'relationship guidance',
        'inherited facts',
        'internal links',
        'indexability',
        'sitemap eligibility',
      ],
    },
    indexabilitySafety: {
      allScaleRecordsTestOnly: records.every(({ testOnly }) => testOnly),
      databasePresenceDidNotImplyIndexable: records.every(({ indexable }) => indexable === false),
      renderedModelCount: representativeModels.filter(({ model }) => model.canRender).length,
      renderedPagesAutomaticallyIndexable: representativeModels.some(
        ({ model }) => model.canRender && model.indexability === 'INDEXABLE',
      ),
      promotedPageIndexability: promoted.indexability,
      promotedPageSitemapEligible: promoted.productionSitemapEligible,
      sitemapAllowlistPipelineProof: sitemapGateProof,
      differentiationStatusCounts: countBy(
        namedCityModels,
        ({ model }) => model.indexability,
      ),
    },
    contentDifferentiation: differentiationMetrics,
    performance: {
      datasetLoad: {
        totalMs: Number(datasetLoadMs.toFixed(3)),
        averageMs: Number(datasetLoadMs.toFixed(3)),
        minimumMs: Number(datasetLoadMs.toFixed(3)),
        maximumMs: Number(datasetLoadMs.toFixed(3)),
      },
      datasetValidation: {
        totalMs: Number(validationMs.toFixed(3)),
        averageMs: Number(validationMs.toFixed(3)),
        minimumMs: Number(validationMs.toFixed(3)),
        maximumMs: Number(validationMs.toFixed(3)),
      },
      lookupIndexBuild: {
        totalMs: Number(lookupIndexBuildMs.toFixed(3)),
        averageMs: Number(lookupIndexBuildMs.toFixed(3)),
        minimumMs: Number(lookupIndexBuildMs.toFixed(3)),
        maximumMs: Number(lookupIndexBuildMs.toFixed(3)),
      },
      resolution100,
      resolution1000,
      resolution10000,
      pageModel100,
      pageModel1000,
      realSourcedDataset: {
        dataLoad: {
          totalMs: Number(sourceDataLoadMs.toFixed(3)),
          averageMs: Number(sourceDataLoadMs.toFixed(3)),
          minimumMs: Number(sourceDataLoadMs.toFixed(3)),
          maximumMs: Number(sourceDataLoadMs.toFixed(3)),
        },
        scales: sourceScaleBenchmarks,
        resolve100: sourcedResolution100,
        resolve1000: sourcedResolution1000,
        resolve10000: sourcedResolution10000,
        pageModel100: sourcePageModel100,
        pageModel1000: sourcePageModel1000,
        sourceUrl: geoNamesTenThousand.source.href,
        sourceLicense: geoNamesTenThousand.source.license,
        sourcePostalRows: geoNamesPostalText.split(/\r?\n/).filter(Boolean).length,
        countryCoverage: ['India'],
      },
    },
    memoryStructure,
    sourcedMemoryStructure: sourceMemoryStructure,
    productionSafety,
  };

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`test-location-scale: ${error.stack || error.message}\n`);
  process.exitCode = 1;
});
