const assert = require('node:assert/strict');
const { performance } = require('node:perf_hooks');

const TEST_GEOGRAPHY_SOURCE = {
  href: 'https://example.test/geography',
  publisher: 'Test geography source',
  title: 'Synthetic test geography',
  scope: 'Automated test fixture only.',
  reviewedAt: '2026-10-03',
};

function makeGeographyRecord({ id, slug, name, type, country, countryCode, parentId = null, parentIds = [], testOnly = true }) {
  return {
    id,
    slug,
    name,
    canonicalName: name,
    type,
    country,
    countryCode,
    parentId,
    parentIds,
    aliases: [],
    postalCodes: [],
    relatedLocationIds: [],
    source: TEST_GEOGRAPHY_SOURCE.publisher,
    sourceUrl: TEST_GEOGRAPHY_SOURCE.href,
    sourceDate: null,
    sourceAttribution: 'Automated test fixture.',
    sourceLinks: [TEST_GEOGRAPHY_SOURCE],
    status: 'sourced',
    testOnly,
  };
}

function makeGazetteerLine({
  id,
  name,
  featureClass = 'P',
  featureCode = 'PPL',
  countryCode = 'US',
  admin1 = 'NY',
  admin2 = '061',
  latitude = '42.6526',
  longitude = '-73.7562',
  timezone = 'America/New_York',
}) {
  const columns = Array(19).fill('');
  Object.assign(columns, {
    0: String(id),
    1: name,
    2: name,
    4: latitude,
    5: longitude,
    6: featureClass,
    7: featureCode,
    8: countryCode,
    10: admin1,
    11: admin2,
    17: timezone,
    18: '2026-01-01',
  });
  return columns.join('\t');
}

function elapsed(operation) {
  const started = performance.now();
  const value = operation();
  return { value, milliseconds: Number((performance.now() - started).toFixed(3)) };
}

async function main() {
  const [
    geo,
    sourceAdapters,
    evidenceModule,
    promotion,
    sampleModule,
    intentsModule,
    registry,
    locationSeo,
  ] = await Promise.all([
    import('../lib/geographicData.js'),
    import('../lib/geographicSourceAdapters.js'),
    import('../data/location-seo/aviation-evidence.js'),
    import('../lib/locationPromotionPipeline.js'),
    import('../data/location-seo/geography/global-pilot.js'),
    import('../data/location-seo/global-aviation-intents.js'),
    import('../data/location-seo/production-candidate-registry.js'),
    import('../lib/locationSeo.js'),
  ]);

  const globalRecords = sampleModule.GLOBAL_GEOGRAPHIC_PILOT.records;
  const globalEvidence = evidenceModule.AVIATION_EVIDENCE_RECORDS;
  const globalValidation = geo.validateGeographicData(globalRecords);
  assert.deepEqual(globalValidation, [], globalValidation.join('\n'));
  assert.deepEqual(evidenceModule.validateAviationEvidence(globalEvidence, globalRecords), []);
  assert.equal(sampleModule.GLOBAL_GEOGRAPHIC_PILOT.datasetKind, 'sourced-global-geographic-pilot');
  assert.equal(new Set(globalRecords.map(({ countryCode }) => countryCode)).size, 10);
  assert.ok(globalRecords.some(({ type }) => type === 'country'));
  assert.ok(globalRecords.some(({ type }) => type === 'region'));
  assert.ok(globalRecords.some(({ type }) => type === 'district'));
  assert.ok(globalRecords.some(({ type }) => type === 'subdistrict'));
  assert.ok(globalRecords.some(({ type }) => type === 'city'));
  assert.ok(globalRecords.some(({ type }) => type === 'locality'));
  assert.ok(globalRecords.some(({ type }) => type === 'neighborhood'));
  assert.ok(globalRecords.some(({ type }) => type === 'postal-area'));
  assert.ok(globalRecords.every(({ sourceAttribution, sourceLinks }) => (
    sourceAttribution && sourceLinks.length > 0
  )));
  assert.ok(globalRecords.every(({ timezone }) => (
    timezone === undefined || timezone === null || typeof timezone === 'string'
  )));
  assert.equal(globalEvidence.length, 46);
  assert.equal(registry.GLOBAL_LOCATION_SERVICE_EVALUATIONS.length, 243);
  assert.equal(registry.PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS.length, 6);

  const statusCounts = registry.GLOBAL_LOCATION_SERVICE_EVALUATIONS.reduce((counts, item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(statusCounts, { RESEARCH: 219, REJECTED: 24 });
  assert.ok(registry.GLOBAL_LOCATION_SERVICE_EVALUATIONS
    .filter(({ serviceSlug }) => ['dgca-ground-classes', 'dgca-exam'].includes(serviceSlug))
    .every(({ country, status }) => country === 'India' || status === 'REJECTED'));

  const country = makeGeographyRecord({
    id: 'test:country:us',
    slug: 'test-us',
    name: 'United States',
    type: 'country',
    country: 'United States',
    countryCode: 'US',
  });
  const state = makeGeographyRecord({
    id: 'test:region:us-ny',
    slug: 'test-us-ny',
    name: 'New York',
    type: 'state',
    country: 'United States',
    countryCode: 'US',
    parentId: country.id,
    parentIds: [country.id],
  });
  const city = makeGeographyRecord({
    id: 'test:city:us-albany',
    slug: 'test-albany',
    name: 'Albany',
    type: 'city',
    country: 'United States',
    countryCode: 'US',
    parentId: state.id,
    parentIds: [country.id, state.id],
    testOnly: false,
  });
  const candidateGeography = [country, state, city];
  const source = {
    href: 'https://example.test/source',
    publisher: 'Test publisher',
    title: 'Test aviation source',
    scope: 'Automated test fixture only.',
    reviewedAt: '2026-10-03',
  };
  const localEvidence = [
    {
      id: 'test:aviation:airport',
      name: 'Albany test airport',
      type: 'airport',
      locationId: city.id,
      geographicRelationship: 'located-within',
      country: city.country,
      countryCode: city.countryCode,
      source: source.publisher,
      sourceUrl: source.href,
      verifiedAt: '2026-10-03',
      verificationStatus: 'primary-source-listed',
      regulatoryAuthority: 'Federal Aviation Administration',
    },
    {
      id: 'test:aviation:school',
      name: 'Albany test flight school',
      type: 'flight-school',
      locationId: city.id,
      geographicRelationship: 'located-within',
      country: city.country,
      countryCode: city.countryCode,
      source: source.publisher,
      sourceUrl: 'https://example.test/training',
      verifiedAt: '2026-10-03',
      verificationStatus: 'primary-source-listed',
      regulatoryAuthority: 'Federal Aviation Administration',
    },
  ];
  const faqs = [
    { question: 'Which local airport is documented?', answer: 'The test source documents Albany test airport.' },
    { question: 'Which local training organization is documented?', answer: 'The test source documents Albany test flight school.' },
  ];
  const content = {
    seoTitle: 'Albany aviation options | We One Aviation',
    seoDescription: 'Source-based aviation information for Albany and the local pilot-training context.',
    title: 'Albany aviation options | We One Aviation',
    description: 'Source-based aviation information for Albany and the local pilot-training context.',
    h1: 'Aviation options and pilot-training context in Albany',
    introduction: 'This test page separates documented local aviation entities from We One Aviation services.',
    localContext: 'Local airport and training organization records are not We One Aviation locations or partners.',
    trainingMode: 'We One Aviation makes no city-specific classroom or flight-training claim in this sample.',
    relationshipStatement: 'We One Aviation describes its Dwarka classroom and online DGCA ground-class batches for students outside Delhi. This page provides local aviation information only and does not claim We One Aviation premises or local service delivery in Albany.',
    regulatoryContext: 'The United States aviation authority is the Federal Aviation Administration.',
    localFacts: [
      { fact: 'Albany test airport is named by a source.', evidenceId: localEvidence[0].id },
      { fact: 'Albany test flight school is named by a source.', evidenceId: localEvidence[1].id },
      { fact: 'The local airport and training organization are distinct entities.', evidenceId: localEvidence[1].id },
    ],
    sections: [
      {
        title: 'Local airport information',
        body: 'The documented airport is an aviation access point and does not itself establish flight instruction.',
        evidenceIds: [localEvidence[0].id],
      },
      {
        title: 'Local training context',
        body: 'The listed training organization is separate from We One Aviation and is not represented as a partner.',
        evidenceIds: [localEvidence[1].id],
      },
    ],
    pagePurpose: 'aviation-location-information',
    localAviationProfile: {
      locationOverview: 'Albany is the New York state capital.',
      aviationEcosystem: 'The local airport provides a named aviation access point.',
      majorAirports: [{ name: 'Albany test airport', evidenceId: localEvidence[0].id }],
      aerodromes: [],
      flightTrainingInfrastructure: 'The listed training organization is independent of We One Aviation.',
      aviationOrganizations: [{
        name: 'Albany test flight school',
        type: 'flight-school',
        evidenceId: localEvidence[1].id,
      }],
      aviationAuthority: {
        authority: 'Federal Aviation Administration (FAA)',
        countryCode: 'US',
        sourceUrl: 'https://www.faa.gov/',
      },
      pilotTrainingPathway: 'Confirm the applicable licensing pathway with the FAA.',
      licenceContext: 'This guide does not represent an FAA licence determination.',
      medicalRequirements: 'Confirm medical requirements with the FAA.',
      examContext: 'Confirm examination requirements with the FAA.',
      localTrainingConsiderations: 'Verify training approvals and facilities before enrolling.',
      weOneRelationship: 'We One Aviation describes its Dwarka classroom and online DGCA ground-class batches for students outside Delhi. This page provides local aviation information only and does not claim We One Aviation premises or local service delivery in Albany.',
      nextSteps: 'Check FAA information and independently review any training provider.',
      faqs,
      sourceReferences: [
        { title: 'Albany test airport', publisher: 'Test publisher', href: source.href },
        { title: 'FAA', publisher: 'Federal Aviation Administration', href: 'https://www.faa.gov/' },
      ],
    },
    faqs,
    internalLinks: [
      { href: '/pilot-training-in-india', label: 'Read the India pilot-training pathway' },
      { href: '/about-us', label: 'Read about We One Aviation' },
    ],
    canonicalPath: '/test-albany/pilot-training',
    schema: {
      pageType: 'WebPage',
      breadcrumbItems: ['United States', 'New York', 'Albany', 'Pilot training'],
      faqItems: faqs,
    },
    indexabilityApproved: true,
    cta: { label: 'Ask about the training pathway', href: '/contact' },
  };
  const comparison = {
    slug: 'unrelated-comparison',
    name: 'unrelated place',
    body: 'Marine ecology, river sediment, and landscape conservation. This comparison has no aviation entities or pilot training information.',
    locationNames: ['unrelated place'],
    verifiedFacts: [{ text: 'An unrelated conservation fact.', inherited: false }],
    faqs: [{ question: 'What is a watershed?', answer: 'A watershed is a land area that drains to a waterbody.' }],
    sections: [{ title: 'River ecology', body: 'Habitat and water quality monitoring.', verified: true }],
    regulatoryText: 'Environmental authority',
  };
  const candidate = {
    location: city,
    geographicRecords: candidateGeography,
    aviationEvidence: localEvidence,
    service: {
      slug: 'pilot-training',
      jurisdictionPolicy: 'local-authority',
    },
    serviceRelationship: {
      serviceSlug: 'pilot-training',
      type: 'informational',
      verified: true,
      source: 'https://weoneaviation.in/about-us',
      verifiedAt: '2026-10-03',
      verifiedFact: 'The academy describes its Dwarka classroom and online ground-class batches for students outside Delhi; it does not publish local Albany service delivery.',
      physicalPresenceVerified: false,
      localServiceDeliveryVerified: false,
      statement: content.relationshipStatement,
    },
    regulatoryContext: {
      country: 'United States',
      countryCode: 'US',
      authority: 'Federal Aviation Administration (FAA)',
      source: 'https://www.faa.gov/',
    },
    content,
    comparisons: [comparison],
  };
  const automaticPromotion = promotion.evaluateLocationPromotion(candidate);
  assert.equal(automaticPromotion.status, 'SUPPORTED', automaticPromotion.reason);
  assert.equal(automaticPromotion.promotionStatus, 'PRODUCTION_CANDIDATE');
  assert.equal(automaticPromotion.indexable, true);
  assert.equal(automaticPromotion.sitemapEligible, true);
  const productionLocation = {
    slug: city.slug,
    city: city.name,
    state: state.name,
    country: city.country,
    stateSlug: 'new-york',
    countrySlug: 'united-states',
    authorityPath: '/pilot-training-in-india',
    authorityLabel: 'Pilot training information',
    locationType: 'city',
    relationship: 'informational',
    relatedLocations: [],
    physicalAcademy: false,
    onlineTraining: false,
    flightTrainingGuidance: true,
    indexable: true,
    supportedServices: ['pilot-training'],
    rejectedServices: {
      'dgca-ground-classes': 'Not configured in the test fixture.',
      'commercial-pilot-training': 'Not configured in the test fixture.',
      'cpl-training': 'Not configured in the test fixture.',
      'pilot-school': 'Not configured in the test fixture.',
    },
    nearbyLocations: [],
    localFAQs: faqs,
    sourcePages: ['/pilot-training-in-india'],
    sourceLinks: [source],
    localSections: content.sections.map(({ title, body }) => ({
      title,
      body,
      items: [{ label: title, detail: body }],
    })),
    serviceContent: { 'pilot-training': content },
  };
  const productionPromotion = promotion.promoteLocationCandidates([{
    ...candidate,
    productionLocation,
    productionService: { slug: 'pilot-training', indexable: true },
  }], {
    geographicRecords: candidateGeography,
    aviationEvidence: localEvidence,
    availableProductionServiceSlugs: ['pilot-training'],
  });
  assert.equal(productionPromotion.evaluations[0].status, 'SUPPORTED');
  assert.equal(productionPromotion.promotedPairs.length, 1);
  assert.equal(productionPromotion.promotedPairs[0].location, productionLocation);

  const researchDecision = promotion.evaluateLocationPromotion({
    ...candidate,
    serviceRelationship: null,
  });
  assert.equal(researchDecision.status, 'RESEARCH');
  assert.equal(researchDecision.gates.relationshipValid, false);

  const foreignDgcaDecision = promotion.evaluateLocationPromotion({
    ...candidate,
    service: { slug: 'dgca-ground-classes', jurisdictionPolicy: 'country-code:IN' },
    content: {
      ...content,
      canonicalPath: '/test-albany/dgca-ground-classes',
    },
  });
  assert.equal(foreignDgcaDecision.status, 'REJECTED');
  assert.equal(foreignDgcaDecision.gates.regulatoryContextValid, false);

  const unsafeDecision = promotion.evaluateLocationPromotion({
    ...candidate,
    content: {
      ...content,
      introduction: 'We One Aviation operates a classroom in Albany.',
    },
  });
  assert.equal(unsafeDecision.status, 'REJECTED');
  assert.equal(unsafeDecision.gates.claimsSafe, false);

  const invalidProductionPromotion = promotion.promoteLocationCandidates([{
    ...candidate,
    productionLocation: { slug: city.slug, indexable: true },
    productionService: { slug: 'pilot-training', indexable: true },
  }], {
    geographicRecords: candidateGeography,
    aviationEvidence: localEvidence,
    availableProductionServiceSlugs: ['pilot-training'],
  });
  assert.equal(invalidProductionPromotion.evaluations[0].status, 'RESEARCH');
  assert.equal(invalidProductionPromotion.promotedPairs.length, 0);

  const parseInput = [
    makeGazetteerLine({ id: 1001, name: 'Albany' }),
    makeGazetteerLine({ id: 1002, name: 'Buffalo', admin2: '029', latitude: '42.8864', longitude: '-78.8784' }),
    makeGazetteerLine({
      id: 1003,
      name: 'New York',
      featureClass: 'A',
      featureCode: 'ADM1',
      admin2: '',
    }),
    makeGazetteerLine({ id: 1004, name: 'Bad coordinates', latitude: '999', longitude: '-78.8784' }),
    makeGazetteerLine({ id: 1005, name: 'Wrong country', countryCode: 'CA' }),
    makeGazetteerLine({ id: 1006, name: 'Unknown county', admin2: '999' }),
  ].join('\n');
  const importSource = {
    href: 'https://download.geonames.org/export/dump/',
    publisher: 'GeoNames',
    title: 'GeoNames allCountries gazetteer',
    scope: 'Test fixture',
    reviewedAt: '2026-10-03',
  };
  const importedCountry = {
    id: 'geo:country:us',
    slug: 'united-states',
    name: 'United States',
    canonicalName: 'United States',
    country: 'United States',
    countryCode: 'US',
    source: 'GeoNames',
    sourceUrl: importSource.href,
    sourceLinks: [importSource],
    status: 'sourced',
  };
  const importedAdmins = [
    {
      ...makeGeographyRecord({
        id: 'geo:state:us-ny',
        slug: 'new-york',
        name: 'New York',
        type: 'state',
        country: 'United States',
        countryCode: 'US',
        parentId: importedCountry.id,
        parentIds: [importedCountry.id],
        testOnly: false,
      }),
      adminCode: 'NY',
      source: 'GeoNames',
      sourceUrl: importSource.href,
      sourceLinks: [importSource],
    },
    {
      ...makeGeographyRecord({
        id: 'geo:county:us-ny-061',
        slug: 'new-york-county',
        name: 'New York County',
        type: 'county',
        country: 'United States',
        countryCode: 'US',
        parentId: 'geo:state:us-ny',
        parentIds: [importedCountry.id, 'geo:state:us-ny'],
        testOnly: false,
      }),
      adminCode: '061',
      source: 'GeoNames',
      sourceUrl: importSource.href,
      sourceLinks: [importSource],
    },
    {
      ...makeGeographyRecord({
        id: 'geo:county:us-ny-029',
        slug: 'erie-county',
        name: 'Erie County',
        type: 'county',
        country: 'United States',
        countryCode: 'US',
        parentId: 'geo:state:us-ny',
        parentIds: [importedCountry.id, 'geo:state:us-ny'],
        testOnly: false,
      }),
      adminCode: '029',
      source: 'GeoNames',
      sourceUrl: importSource.href,
      sourceLinks: [importSource],
    },
  ];
  const gazetteerImport = sourceAdapters.parseGeoNamesAllCountriesTsv(parseInput, {
    countries: { US: importedCountry },
    administrativeRecords: importedAdmins,
  });
  assert.equal(gazetteerImport.acceptedRecords, 3);
  assert.equal(gazetteerImport.records.filter(({ type }) => type === 'country').length, 1);
  assert.equal(gazetteerImport.records.filter(({ type }) => type === 'region').length, 1);
  assert.deepEqual(geo.validateGeographicData(gazetteerImport.records), []);
  assert.equal(gazetteerImport.records.find(({ name }) => name === 'Albany').timezone, 'America/New_York');
  assert.equal(gazetteerImport.rejectedRows.unsupportedFeature, 0);
  assert.equal(gazetteerImport.rejectedRows.invalidCoordinate, 1);
  assert.equal(gazetteerImport.rejectedRows.countryNotConfigured, 1);
  assert.equal(gazetteerImport.rejectedRows.unknownAdministrativeParent, 1);

  const scaleRecords = [];
  const countryCount = 10;
  const statesPerCountry = 9;
  const citiesPerState = 110;
  for (let countryIndex = 0; countryIndex < countryCount; countryIndex += 1) {
    const countryCode = `T${String.fromCharCode(65 + countryIndex)}`;
    const countryName = `Test Country ${countryIndex}`;
    const countryId = `scale:country:${countryIndex}`;
    scaleRecords.push(makeGeographyRecord({
      id: countryId,
      slug: `scale-country-${countryIndex}`,
      name: countryName,
      type: 'country',
      country: countryName,
      countryCode,
    }));
    for (let stateIndex = 0; stateIndex < statesPerCountry; stateIndex += 1) {
      const stateId = `scale:state:${countryIndex}:${stateIndex}`;
      scaleRecords.push(makeGeographyRecord({
        id: stateId,
        slug: `scale-state-${countryIndex}-${stateIndex}`,
        name: `Test Region ${countryIndex}-${stateIndex}`,
        type: 'state',
        country: countryName,
        countryCode,
        parentId: countryId,
        parentIds: [countryId],
      }));
      for (let cityIndex = 0; cityIndex < citiesPerState; cityIndex += 1) {
        const cityId = `scale:city:${countryIndex}:${stateIndex}:${cityIndex}`;
        scaleRecords.push(makeGeographyRecord({
          id: cityId,
          slug: `scale-city-${countryIndex}-${stateIndex}-${cityIndex}`,
          name: `Test City ${countryIndex}-${stateIndex}-${cityIndex}`,
          type: 'city',
          country: countryName,
          countryCode,
          parentId: stateId,
          parentIds: [countryId, stateId],
        }));
      }
    }
  }
  assert.equal(scaleRecords.length, 10000);
  const validationTiming = elapsed(() => geo.validateGeographicData(scaleRecords));
  assert.deepEqual(validationTiming.value, []);
  const resolutionTiming = elapsed(() => {
    for (let index = 0; index < 10000; index += 1) {
      const location = geo.resolveBySlug(`scale-city-${index % 10}-0-${index % citiesPerState}`, scaleRecords);
      assert.ok(location);
      assert.equal(geo.resolveHierarchy(location, scaleRecords).length, 3);
    }
  });
  const promotionCandidates = scaleRecords
    .filter(({ type }) => type === 'city')
    .slice(0, 10000)
    .flatMap((location) => intentsModule.GLOBAL_AVIATION_INTENTS.map((service) => ({
      location,
      service,
      serviceRelationship: null,
      regulatoryContext: {
        country: location.country,
        countryCode: location.countryCode,
        authority: 'Test aviation authority',
        source: 'https://example.test/authority',
      },
    })));
  const promotionTiming = elapsed(() => promotion.evaluateLocationPromotions(promotionCandidates, {
    geographicRecords: scaleRecords,
    aviationEvidence: [],
  }));
  assert.equal(
    promotionTiming.value.length,
    countryCount * statesPerCountry * citiesPerState * intentsModule.GLOBAL_AVIATION_INTENTS.length,
  );
  const scalePromotionStatuses = promotionTiming.value.reduce((counts, { status }) => {
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(scalePromotionStatuses, {
    RESEARCH: countryCount * statesPerCountry * citiesPerState * 7,
    REJECTED: countryCount * statesPerCountry * citiesPerState * 2,
  });

  const productionRoutes = locationSeo.getApprovedLocationServiceRoutes();
  assert.equal(productionRoutes.length, 16);
  assert.equal(new Set(productionRoutes).size, 16);
  assert.equal(registry.PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS.length, 6);

  console.log(JSON.stringify({
    globalPilot: {
      geographicRecords: globalRecords.length,
      countries: [...new Set(globalRecords.map(({ country }) => country))].length,
      geographicLevels: [...new Set(globalRecords.map(({ type }) => type))].sort(),
      aviationEvidenceRecords: globalEvidence.length,
      locationServiceEvaluations: registry.GLOBAL_LOCATION_SERVICE_EVALUATIONS.length,
      statuses: statusCounts,
    },
    automaticPromotion: {
      validFixtureStatus: automaticPromotion.status,
      promotionStatus: automaticPromotion.promotionStatus,
      automaticallyPromotedFixturePairs: productionPromotion.promotedPairs.length,
      missingRelationshipStatus: researchDecision.status,
      foreignDgcaStatus: foreignDgcaDecision.status,
      unsafeClaimStatus: unsafeDecision.status,
      productionPromotions: registry.PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS.length,
    },
    ingestion: {
      acceptedGazetteerRecords: gazetteerImport.acceptedRecords,
      rejectedRows: gazetteerImport.rejectedRows,
    },
    scale: {
      geographicRecords: scaleRecords.length,
      validationMs: validationTiming.milliseconds,
      resolutionOperations: 10000,
      resolutionMs: resolutionTiming.milliseconds,
      promotionOperations: promotionCandidates.length,
      promotionMs: promotionTiming.milliseconds,
    },
    productionSafety: {
      approvedLocationRoutes: productionRoutes.length,
      newProductionUrls: 6,
      sitemapUrls: 134,
      postalAndNearMeRoutes: 0,
    },
  }, null, 2));
}

main().catch((error) => {
  console.error(`test-global-location-expansion: ${error.stack || error.message}`);
  process.exitCode = 1;
});
