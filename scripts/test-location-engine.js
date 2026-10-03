const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const [
    engine,
    locationSeo,
    locationData,
    fixtures,
    geographicData,
    realGeography,
    businessProfiles,
    regulatoryContexts,
    indexabilityPolicy,
    differentiation,
    indexabilityFlow,
  ] = await Promise.all([
    import('../lib/locationEngine.js'),
    import('../lib/locationSeo.js'),
    import('../data/location-seo/locations.js'),
    import('../data/location-seo/location-engine-fixtures.js'),
    import('../lib/geographicData.js'),
    import('../data/location-seo/geography/real-sample.js'),
    import('../data/location-seo/business-profiles.js'),
    import('../data/location-seo/aviation-regulatory-contexts.js'),
    import('../data/location-seo/geographic-indexability-policy.js'),
    import('../lib/locationContentDifferentiation.js'),
    import('../lib/locationIndexabilityPolicy.js'),
  ]);
  const { LOCATIONS, LOCATION_SITEMAP_SLUGS } = locationData;
  const { ENGINE_TEST_LOCATIONS, ENGINE_TEST_SERVICES } = fixtures;
  const { REAL_GEOGRAPHIC_SAMPLE } = realGeography;
  const realRecords = REAL_GEOGRAPHIC_SAMPLE.records;
  const ambiguousRealAliases = geographicData.findAmbiguousGeographicAliases(realRecords);
  const routeBaseline = [
    '/delhi/pilot-training',
    '/delhi/dgca-ground-classes',
    '/delhi/commercial-pilot-training',
    '/delhi/cpl-training',
    '/dwarka/pilot-training',
    '/dwarka/dgca-ground-classes',
    '/dwarka/commercial-pilot-training',
    '/dwarka/cpl-training',
    '/mumbai/pilot-training',
    '/bengaluru/pilot-training',
  ];

  assert.deepEqual(
    locationSeo.getIndexableLocationServiceRoutes().sort(),
    routeBaseline.sort(),
    'The geographic engine must preserve the ten production-approved routes.',
  );
  assert.deepEqual(
    [...indexabilityPolicy.GEOGRAPHIC_INDEXABILITY_POLICY.existingDifferentiationExemptRoutes].sort(),
    [...routeBaseline].sort(),
  );
  assert.equal(LOCATION_SITEMAP_SLUGS.length, 4);
  assert.equal(REAL_GEOGRAPHIC_SAMPLE.datasetKind, 'real-geographic-sample');
  assert.equal(geographicData.validateGeographicData(realRecords).length, 0);
  assert.equal(REAL_GEOGRAPHIC_SAMPLE.records.length, 32);
  assert.deepEqual([...new Set(realRecords.map(({ country }) => country))].sort(), [
    'Australia',
    'Canada',
    'India',
    'United Kingdom',
    'United States',
  ]);
  assert.ok(realRecords.every((record) => (
    record.canonicalName
    && record.countryCode
    && Array.isArray(record.parentIds)
    && record.source
    && record.sourceUrl
    && Object.hasOwn(record, 'sourceDate')
    && record.status
  )));
  assert.ok(realRecords.some(({ type }) => type === 'neighborhood'));
  assert.ok(realRecords.some(({ type, postalCodes }) => (
    type === 'postal-area' && postalCodes.includes('110075')
  )));
  assert.equal(ambiguousRealAliases.length, 0);
  assert.deepEqual(businessProfiles.REAL_GEOGRAPHIC_SAMPLE_BUSINESS_PROFILES, {});
  assert.equal(indexabilityPolicy.GEOGRAPHIC_INDEXABILITY_POLICY.defaultIndexable, false);
  assert.deepEqual(geographicData.validateGeographicData(ENGINE_TEST_LOCATIONS), []);
  assert.equal(ENGINE_TEST_LOCATIONS.every(({ testOnly }) => testOnly === true), true);
  assert.equal(REAL_GEOGRAPHIC_SAMPLE.records.some(({ testOnly }) => testOnly === true), false);

  const realAndheri = geographicData.resolveBySlug('andheri', realRecords);
  const realMumbaiGeo = geographicData.resolveByAlias('Bombay', realRecords);
  const realManhattan = geographicData.resolveByAlias('Manhattan', realRecords);
  assert.equal(realMumbaiGeo.slug, 'mumbai');
  assert.equal(realAndheri.parentId, 'geo:district:mumbai-suburban');
  assert.equal(realAndheri.relatedLocationIds.includes(realMumbaiGeo.id), true);
  assert.equal(realManhattan.type, 'locality');
  assert.equal(
    geographicData.resolveBySlug('new-york-county', realRecords)
      .relatedLocationIds.includes(realManhattan.id),
    true,
    'New York County is represented as related to Manhattan, not as its parent.',
  );
  assert.deepEqual(
    geographicData.resolveHierarchy('andheri', realRecords).map(({ name }) => name),
    ['India', 'Maharashtra', 'Mumbai Suburban District', 'Andheri'],
  );
  assert.equal(geographicData.resolveCountry('andheri', realRecords).name, 'India');
  assert.equal(geographicData.resolveState('andheri', realRecords).name, 'Maharashtra');
  assert.equal(geographicData.resolveCounty('andheri', realRecords).name, 'Andheri');
  assert.equal(geographicData.resolveCity('andheri', realRecords), null);
  assert.equal(geographicData.resolveCity('mumbai', realRecords).name, 'Mumbai');
  assert.equal(geographicData.resolveLocality('dwarka', realRecords).name, 'Dwarka');
  assert.equal(geographicData.resolveByPostalCode('110075', realRecords).slug, 'delhi-pin-110075');
  assert.equal(geographicData.resolveByPostalCode('400050', realRecords).slug, 'maharashtra-pin-400050');
  assert.equal(geographicData.resolveByPostalCode('10007', ENGINE_TEST_LOCATIONS).slug, 'fixture-zip-10007');
  assert.equal(
    geographicData.resolveByPostalCode('10007', ENGINE_TEST_LOCATIONS, 'United States').name,
    '10007',
  );
  assert.deepEqual(
    geographicData.resolveHierarchy({
      ...realAndheri,
      parentId: undefined,
      parentSlug: 'mumbai-suburban-district',
    }, realRecords).map(({ name }) => name),
    ['India', 'Maharashtra', 'Mumbai Suburban District', 'Andheri'],
  );
  const realHierarchyProof = {
    dwarka: ['India', 'Delhi', 'South West Delhi', 'Dwarka'],
    lucknow: ['India', 'Uttar Pradesh', 'Lucknow District', 'Lucknow'],
    pune: ['India', 'Maharashtra', 'Pune District', 'Pune'],
    'new-york-city': ['United States', 'New York', 'New York City'],
    'new-york-county': ['United States', 'New York', 'New York County'],
    manhattan: ['United States', 'New York', 'New York City', 'Manhattan'],
    london: ['United Kingdom', 'England', 'Greater London', 'London'],
    toronto: ['Canada', 'Ontario', 'Toronto'],
    sydney: ['Australia', 'New South Wales', 'Sydney'],
  };
  for (const [slug, expected] of Object.entries(realHierarchyProof)) {
    assert.deepEqual(
      geographicData.resolveHierarchy(slug, realRecords).map(({ name }) => name),
      expected,
      `Real sample hierarchy for ${slug} resolves from its country.`,
    );
  }
  assert.deepEqual(
    Object.fromEntries(Object.entries(regulatoryContexts.AVIATION_REGULATORY_CONTEXTS)
      .map(([country, context]) => [country, context.authority])),
    {
      India: 'Directorate General of Civil Aviation (DGCA)',
      'United States': 'Federal Aviation Administration (FAA)',
      'United Kingdom': 'UK Civil Aviation Authority (CAA)',
      Canada: 'Transport Canada',
      Australia: 'Civil Aviation Safety Authority (CASA)',
    },
  );
  for (const [slug, authority] of [
    ['toronto', 'Transport Canada'],
    ['sydney', 'Civil Aviation Safety Authority (CASA)'],
    ['london', 'UK Civil Aviation Authority (CAA)'],
    ['mumbai', 'Directorate General of Civil Aviation (DGCA)'],
    ['new-york-city', 'Federal Aviation Administration (FAA)'],
  ]) {
    assert.equal(
      engine.resolveRegulatoryContext(
        geographicData.resolveBySlug(slug, realRecords),
        realRecords,
      ).authority,
      authority,
      `${slug}: regulatory context resolves from geography country without a business overlay.`,
    );
  }

  const composedAndheri = geographicData.composeLocationRecord({
    geographicRecord: realAndheri,
    locations: realRecords,
    businessProfile: businessProfiles.REAL_GEOGRAPHIC_SAMPLE_BUSINESS_PROFILES.andheri,
    serviceProfile: { supportedServices: ['pilot-training'] },
    regulatoryContext: regulatoryContexts.AVIATION_REGULATORY_CONTEXTS.India,
    indexabilityPolicy: { approved: true },
  });
  assert.deepEqual(
    Object.keys(composedAndheri).sort(),
    [
      'aliases', 'canonicalName', 'city', 'country', 'countryCode', 'county', 'district', 'id',
      'indexabilityState', 'indexable', 'latitude', 'locality', 'longitude', 'name',
      'neighborhood', 'parentId', 'parentIds', 'parentSlug', 'postalCode', 'postalCodes',
      'province', 'region', 'relatedLocationIds', 'relationship', 'regulatoryContext',
      'renderable', 'slug', 'source', 'sourceDate', 'sourceLinks', 'sourceUrl', 'state',
      'status', 'supportedServices', 'town', 'type', 'verifiedFacts',
    ].sort(),
  );
  assert.equal(composedAndheri.renderable, false);
  assert.equal(composedAndheri.indexable, false);
  assert.equal(composedAndheri.indexabilityState, 'NOINDEX');
  assert.equal(composedAndheri.relationship, 'INFORMATIONAL');
  assert.equal(composedAndheri.city, 'Mumbai');
  assert.deepEqual(composedAndheri.supportedServices, ['pilot-training']);
  assert.equal(composedAndheri.regulatoryContext.authority, 'Directorate General of Civil Aviation (DGCA)');
  assert.equal(composedAndheri.countryCode, 'IN');
  assert.equal(composedAndheri.canonicalName, 'Andheri');
  assert.equal(composedAndheri.status, 'verified');

  const realMumbai = engine.resolveLocation('mumbai');
  const realPilotTraining = engine.resolveServiceIntent('pilot-training');
  const realMumbaiPage = engine.buildLocationPageModel({
    location: realMumbai,
    service: realPilotTraining,
    content: locationSeo.getLocationServiceContent(realMumbai, realPilotTraining),
  });
  assert.equal(realMumbaiPage.canRender, true);
  assert.ok(realMumbaiPage.links.length > 0);
  assert.equal(realMumbaiPage.schema.pageType, 'WebPage');
  assert.equal(realMumbaiPage.schema.emitLocalBusiness, false);
  assert.equal(realMumbaiPage.regulatoryContext.authority, 'Directorate General of Civil Aviation (DGCA)');
  assert.ok(realMumbaiPage.serviceGuidance.length > 0);
  const productionRouteModels = routeBaseline.map((route) => {
    const [locationSlug, serviceSlug] = route.slice(1).split('/');
    const location = engine.resolveLocation(locationSlug);
    const service = engine.resolveServiceIntent(serviceSlug);
    return engine.buildLocationPageModel({ location, service });
  });
  assert.equal(productionRouteModels.length, 10);
  assert.ok(productionRouteModels.every(({ productionSitemapEligible }) => productionSitemapEligible));
  assert.deepEqual(engine.validateGeographicNodes(ENGINE_TEST_LOCATIONS), []);
  assert.equal(new Set(ENGINE_TEST_LOCATIONS.map(({ id }) => id)).size, ENGINE_TEST_LOCATIONS.length);
  assert.equal(new Set(ENGINE_TEST_LOCATIONS.map(({ slug }) => slug)).size, ENGINE_TEST_LOCATIONS.length);
  for (const location of ENGINE_TEST_LOCATIONS) {
    for (const field of [
      'id', 'slug', 'name', 'type', 'parentId', 'country', 'state', 'county',
      'city', 'locality', 'postalCode', 'aliases', 'relationship', 'renderable',
      'indexable', 'supportedServices', 'regulatoryContext', 'verifiedFacts', 'sourceLinks',
    ]) {
      assert.ok(Object.hasOwn(location, field), `${location.slug}: data model field "${field}" exists.`);
    }
    assert.equal(location.renderable, true);
    assert.equal(location.indexable, false);
    assert.equal(location.testOnly, true);
    assert.equal(location.sourceLinks instanceof Array, true);
  }
  assert.equal(ENGINE_TEST_LOCATIONS.filter(({ type }) => type === 'country').length, 3);
  assert.ok(ENGINE_TEST_LOCATIONS.filter(({ type }) => ['state', 'province'].includes(type)).length >= 2);
  assert.ok(ENGINE_TEST_LOCATIONS.filter(({ type }) => ['county', 'district'].includes(type)).length >= 3);
  assert.ok(ENGINE_TEST_LOCATIONS.filter(({ type }) => ['city', 'town'].includes(type)).length >= 5);
  assert.ok(ENGINE_TEST_LOCATIONS.filter(({ type }) => ['locality', 'neighborhood'].includes(type)).length >= 5);
  assert.ok(ENGINE_TEST_LOCATIONS.filter(({ type }) => engine.POSTAL_TYPE_ALIASES.includes(type) || type === 'postal-area').length >= 5);
  assert.equal(engine.resolveLocation('Mumbai postal zone 400053', ENGINE_TEST_LOCATIONS).slug, 'fixture-pin-400053');
  const duplicateGeography = [
    { id: 'duplicate:country', slug: 'duplicate-country', name: 'Example', type: 'country', testOnly: true },
    { id: 'duplicate:city:one', slug: 'duplicate-city-one', name: 'Same City', type: 'city', parentId: 'duplicate:country', testOnly: true },
    { id: 'duplicate:city:two', slug: 'duplicate-city-two', name: 'Same City', type: 'city', parentId: 'duplicate:country', testOnly: true },
  ];
  assert.ok(engine.validateGeographicNodes(duplicateGeography).some((error) => /duplicated under the same parent/.test(error)));
  assert.throws(() => engine.resolveLocation('Same City', duplicateGeography), /ambiguous/);
  assert.throws(
    () => geographicData.resolveBySlug('duplicate-city-one', [
      ...duplicateGeography,
      {
        id: 'duplicate:city:three',
        slug: 'duplicate-city-one',
        name: 'Another City',
        type: 'city',
        parentId: 'duplicate:country',
        testOnly: true,
      },
    ]),
    /ambiguous/,
  );
  const cyclicGeography = [
    { id: 'cycle:a', slug: 'cycle-a', name: 'A', type: 'city', parentId: 'cycle:b' },
    { id: 'cycle:b', slug: 'cycle-b', name: 'B', type: 'district', parentId: 'cycle:a' },
  ];
  assert.ok(engine.validateGeographicNodes(cyclicGeography).some((error) => /cycle/i.test(error)));
  assert.ok(geographicData.validateGeographicData(null).some((error) => /must be an array/.test(error)));
  const invalidDataCases = [
    {
      label: 'duplicate ID',
      records: [...realRecords, { ...realRecords[0], slug: 'duplicate-id' }],
      message: /Duplicate geographic id/,
    },
    {
      label: 'duplicate slug',
      records: [...realRecords, { ...realRecords[0], id: 'geo:duplicate-slug' }],
      message: /Duplicate geographic slug/,
    },
    {
      label: 'invalid slug',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, slug: 'Lucknow City' }
        : record),
      message: /invalid slug/,
    },
    {
      label: 'missing parent',
      records: realRecords.map((record) => record.slug === 'andheri'
        ? { ...record, parentId: 'geo:missing-parent' }
        : record),
      message: /missing parent/,
    },
    {
      label: 'parent cycle',
      records: realRecords.map((record) => record.slug === 'maharashtra'
        ? { ...record, parentId: 'geo:subdistrict:andheri' }
        : record),
      message: /cycle/,
    },
    {
      label: 'invalid type',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, type: 'metropolis' }
        : record),
      message: /invalid type/,
    },
    {
      label: 'invalid hierarchy',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, parentId: 'geo:country:india' }
        : record),
      message: /cannot contain/,
    },
    {
      label: 'country mismatch',
      records: realRecords.map((record) => record.slug === 'andheri'
        ? { ...record, country: 'United States' }
        : record),
      message: /country\/parent mismatch/,
    },
    {
      label: 'state mismatch',
      records: realRecords.map((record) => record.slug === 'andheri'
        ? { ...record, state: 'New York' }
        : record),
      message: /inconsistent state field/,
    },
    {
      label: 'missing country',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, country: '' }
        : record),
      message: /needs a non-empty country/,
    },
    {
      label: 'invalid relationship',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, relationship: 'branch' }
        : record),
      message: /unsupported relationship/,
    },
    {
      label: 'invalid aliases',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, aliases: [''] }
        : record),
      message: /invalid aliases/,
    },
    {
      label: 'ambiguous aliases',
      records: [
        ...realRecords,
        {
          id: 'geo:city:mumbai-alias',
          slug: 'mumbai-alias',
          name: 'Greater Mumbai',
          type: 'city',
          parentId: 'geo:region:maharashtra',
          country: 'India',
          aliases: ['Mumbai'],
          sourceLinks: [],
        },
      ],
      message: /ambiguous/,
    },
    {
      label: 'repeated aliases',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, aliases: ['Lucknow City', 'Lucknow City'] }
        : record),
      message: /duplicate aliases/,
    },
    {
      label: 'malformed source',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, sourceLinks: [{ href: 'http://invalid.test' }] }
        : record),
      message: /malformed source links/,
    },
    {
      label: 'missing source attribution',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, source: null, sourceUrl: null, sourceLinks: [] }
        : record),
      message: /missing valid source attribution/,
    },
    {
      label: 'invalid coordinate',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, latitude: 91 }
        : record),
      message: /invalid latitude/,
    },
    {
      label: 'inconsistent parentIds',
      records: realRecords.map((record) => record.slug === 'lucknow'
        ? { ...record, parentIds: ['geo:country:india'] }
        : record),
      message: /inconsistent parentIds/,
    },
    {
      label: 'invalid related geography',
      records: realRecords.map((record) => record.slug === 'manhattan'
        ? { ...record, relatedLocationIds: ['geo:missing-related-place'] }
        : record),
      message: /invalid related location references/,
    },
    {
      label: 'duplicate postal code',
      records: [
        ...realRecords,
        {
          id: 'geo:postal:one',
          slug: 'postal-one',
          name: 'Postal One',
          type: 'postal-area',
          parentId: 'geo:subdistrict:andheri',
          country: 'India',
          postalCode: '400001',
          aliases: [],
          sourceLinks: [],
        },
        {
          id: 'geo:postal:two',
          slug: 'postal-two',
          name: 'Postal Two',
          type: 'postal-area',
          parentId: 'geo:subdistrict:andheri',
          country: 'India',
          postalCode: '400001',
          aliases: [],
          sourceLinks: [],
        },
      ],
      message: /duplicated within India/,
    },
    {
      label: 'missing postal code',
      records: [...realRecords, {
        id: 'geo:postal:missing-code',
        slug: 'postal-missing-code',
        name: 'Missing Code',
        type: 'postal-area',
        parentId: 'geo:subdistrict:andheri',
        country: 'India',
        aliases: [],
        sourceLinks: [],
      }],
      message: /needs a postal code/,
    },
    {
      label: 'invalid postal code type',
      records: realRecords.map((record) => record.slug === 'manhattan'
        ? { ...record, type: 'postal-area', postalCode: 12345 }
        : record),
      message: /invalid postal code/,
    },
  ];
  for (const { label, records, message } of invalidDataCases) {
    assert.ok(
      geographicData.validateGeographicData(records).some((error) => message.test(error)),
      `Geographic validator rejects ${label}.`,
    );
  }
  const crossCountryPostalRecords = [
    ...realRecords,
    {
      id: 'geo:postal:india-sample',
      slug: 'postal-india-sample',
      name: 'India postal sample',
      type: 'postal-area',
      parentId: 'geo:subdistrict:andheri',
      country: 'India',
      postalCode: 'X1',
      aliases: [],
      sourceLinks: [],
      testOnly: true,
    },
    {
      id: 'geo:postal:us-sample',
      slug: 'postal-us-sample',
      name: 'US postal sample',
      type: 'postal-area',
      parentId: 'geo:locality:manhattan',
      country: 'United States',
      postalCode: 'X1',
      aliases: [],
      sourceLinks: [],
      testOnly: true,
    },
  ];
  assert.deepEqual(geographicData.validateGeographicData(crossCountryPostalRecords), []);
  assert.equal(
    geographicData.resolveByPostalCode('X1', crossCountryPostalRecords, 'India').slug,
    'postal-india-sample',
  );
  assert.throws(
    () => geographicData.resolveByPostalCode('X1', crossCountryPostalRecords),
    /ambiguous/,
  );
  const repeatedCityNames = [
    {
      id: 'geo:country:example',
      slug: 'example-country',
      name: 'Example Country',
      type: 'country',
      country: 'Example Country',
      aliases: [],
      sourceLinks: [],
      testOnly: true,
    },
    {
      id: 'geo:state:one',
      slug: 'state-one',
      name: 'State One',
      type: 'state',
      parentId: 'geo:country:example',
      country: 'Example Country',
      aliases: [],
      sourceLinks: [],
      testOnly: true,
    },
    {
      id: 'geo:state:two',
      slug: 'state-two',
      name: 'State Two',
      type: 'state',
      parentId: 'geo:country:example',
      country: 'Example Country',
      aliases: [],
      sourceLinks: [],
      testOnly: true,
    },
    ...['one', 'two'].map((suffix) => ({
      id: `geo:city:springfield-${suffix}`,
      slug: `springfield-${suffix}`,
      name: 'Springfield',
      type: 'city',
      parentId: `geo:state:${suffix}`,
      country: 'Example Country',
      aliases: [],
      sourceLinks: [],
      testOnly: true,
    })),
  ];
  assert.deepEqual(geographicData.validateGeographicData(repeatedCityNames), []);
  assert.deepEqual(
    geographicData.findAmbiguousGeographicAliases(repeatedCityNames)
      .map(({ alias, recordIds }) => ({ alias, count: recordIds.length })),
    [{ alias: 'springfield', count: 2 }],
  );
  assert.throws(() => geographicData.resolveByAlias('Springfield', repeatedCityNames), /ambiguous/);
  assert.equal(
    geographicData.resolveByAlias('Springfield', repeatedCityNames, { parentId: 'geo:state:one' }).slug,
    'springfield-one',
  );
  assert.ok(!ENGINE_TEST_LOCATIONS.some(({ physicalAcademy, physicalPresence }) => (
    physicalAcademy === true || physicalPresence?.verified === true
  )));

  const routeSource = fs.readFileSync(
    path.join(__dirname, '..', 'pages', '[location]', '[service].jsx'),
    'utf8',
  );
  assert.match(routeSource, /function LocationServicePage\(/);
  assert.match(routeSource, /buildLocationPageModel\(/);
  assert.match(routeSource, /pageModel\.metadata\.h1/);
  assert.match(routeSource, /pageModel\.verifiedFacts/);
  assert.match(routeSource, /pageModel\.regulatoryContext/);
  assert.match(routeSource, /RelationshipNote location=\{location\} relationship=\{pageModel\.relationship\}/);
  assert.equal((routeSource.match(/function LocationServicePage\(/g) || []).length, 1);
  const sitemapGeneratorSource = fs.readFileSync(
    path.join(__dirname, 'generate-sitemap.js'),
    'utf8',
  );
  assert.doesNotMatch(routeSource, /real-sample|REAL_GEOGRAPHIC_SAMPLE/);
  assert.doesNotMatch(sitemapGeneratorSource, /real-sample|REAL_GEOGRAPHIC_SAMPLE/);

  const expectedPaths = {
    'fixture-mumbai': ['India', 'Maharashtra', 'Mumbai'],
    'fixture-andheri': ['India', 'Maharashtra', 'Mumbai', 'Andheri'],
    'fixture-delhi': ['India', 'Delhi'],
    'fixture-dwarka': ['India', 'Delhi', 'South West Delhi', 'Dwarka'],
    'fixture-lucknow': ['India', 'Uttar Pradesh', 'Lucknow'],
    'fixture-manhattan': ['United States', 'New York', 'New York County', 'New York City', 'Manhattan'],
    'fixture-london': ['United Kingdom', 'England', 'Greater London', 'London'],
    'fixture-pin-400053': ['India', 'Maharashtra', 'Mumbai', 'Andheri', '400053'],
    'fixture-pin-110077': ['India', 'Delhi', 'South West Delhi', 'Dwarka', '110077'],
    'fixture-postal-411001': ['India', 'Maharashtra', 'Pune District', 'Pune', 'Kothrud', '411001'],
    'fixture-zip-10007': ['United States', 'New York', 'New York County', 'New York City', 'Manhattan', '10007'],
    'fixture-postcode-w1a-1aa': ['United Kingdom', 'England', 'Greater London', 'London', 'Westminster', 'W1A 1AA'],
  };
  const serviceSlugs = ENGINE_TEST_SERVICES.map(({ slug }) => slug);

  for (const [slug, expectedNames] of Object.entries(expectedPaths)) {
    const location = engine.resolveLocation(slug, ENGINE_TEST_LOCATIONS);
    assert.ok(location, `${slug}: fixture location resolves.`);
    const hierarchy = engine.resolveLocationHierarchy(location, ENGINE_TEST_LOCATIONS);
    assert.deepEqual(hierarchy.map(({ name }) => name), expectedNames, `${slug}: full parent chain.`);
    assert.equal(hierarchy[0].type, 'country', `${slug}: country resolves.`);
    assert.equal(hierarchy.at(-1).slug, slug, `${slug}: terminal place resolves.`);
    assert.ok(engine.LOCATION_RELATIONSHIPS.includes(
      engine.resolveLocationRelationship(location, ENGINE_TEST_LOCATIONS),
    ));
    assert.ok(engine.resolveRegulatoryContext(location, ENGINE_TEST_LOCATIONS)?.authority);
  }
  const manhattanAsPhysicalFixture = {
    ...engine.resolveLocation('fixture-manhattan', ENGINE_TEST_LOCATIONS),
    relationship: 'PHYSICAL',
  };
  const foreignPhysicalPage = engine.buildLocationPageModel({
    location: manhattanAsPhysicalFixture,
    service: engine.resolveServiceIntent('pilot-training', ENGINE_TEST_SERVICES),
    locations: ENGINE_TEST_LOCATIONS,
  });
  assert.equal(foreignPhysicalPage.template, 'local-service');
  assert.equal(foreignPhysicalPage.serviceGuidance.length, 0);
  assert.ok(!foreignPhysicalPage.renderedBody.join(' ').includes('DGCA'));

  const summaries = [];
  const modelsByLocationAndService = new Map();
  const renderabilityByType = {};
  for (const location of ENGINE_TEST_LOCATIONS) {
    const locationSlug = location.slug;
    for (const serviceSlug of serviceSlugs) {
      const service = engine.resolveServiceIntent(serviceSlug, ENGINE_TEST_SERVICES);
      assert.ok(service, `${serviceSlug}: intent resolves from test catalog.`);
      const model = engine.buildLocationPageModel({
        location,
        service,
        siteOrigin: 'https://engine-fixture.invalid',
        locations: ENGINE_TEST_LOCATIONS,
      });
      const key = `${locationSlug}:${serviceSlug}`;
      modelsByLocationAndService.set(key, model);
      const type = location.type;
      renderabilityByType[type] ||= { total: 0, renderable: 0, notSupported: 0 };
      renderabilityByType[type].total += 1;
      renderabilityByType[type][model.canRender ? 'renderable' : 'notSupported'] += 1;
      assert.equal(model.supportStatus, model.canRender ? 'SUPPORTED' : 'NOT_SUPPORTED');
      assert.equal(model.renderStatus, model.canRender ? 'RENDERABLE' : 'NOT_RENDERABLE');

      assert.ok(model.metadata.title.includes(location.name), `${key}: title is location-specific.`);
      assert.ok(model.metadata.description.includes(location.name), `${key}: description is location-specific.`);
      assert.ok(model.metadata.h1.includes(location.name), `${key}: H1 is location-specific.`);
      assert.ok(model.schema.breadcrumbItems.includes(location.name), `${key}: breadcrumb schema includes target location.`);
      if (model.canRender) {
        assert.ok(model.faqs.some(({ question }) => question.includes(location.name)), `${key}: FAQ is location-specific.`);
      } else {
        assert.equal(model.faqs.length, 0, `${key}: unsupported content and FAQs are hidden.`);
      }
      assert.equal(model.productionSitemapEligible, false, `${key}: fixture is never sitemap eligible.`);
      assert.equal(model.unsupportedClaims.length, 0, `${key}: no unsupported business claims.`);

      const country = model.regulatoryContext.country;
      if (['United States', 'United Kingdom'].includes(country)) {
        assert.ok(model.regulatoryContext.authority !== 'Directorate General of Civil Aviation (DGCA)');
        assert.ok(
          !model.renderedBody.join(' ').includes('Indian DGCA jurisdiction'),
          `${key}: no Indian DGCA jurisdiction statement leaks into foreign content.`,
        );
      }
      if (['dgca-ground-classes', 'dgca-exam'].includes(serviceSlug)
        && country !== 'India') {
        assert.equal(model.canRender, false, `${key}: India-only DGCA intent must not render abroad.`);
        assert.equal(model.indexability, 'NOT_SUPPORTED');
        assert.equal(model.content, null, `${key}: unsupported jurisdiction content is not exposed to the renderer.`);
        assert.ok(!model.metadata.title.includes('DGCA'), `${key}: unsupported DGCA intent is omitted from metadata.`);
        assert.ok(!model.metadata.h1.includes('DGCA'), `${key}: unsupported DGCA intent is omitted from H1.`);
        assert.ok(!model.renderedBody.join(' ').includes('DGCA'), `${key}: unsupported DGCA intent is omitted from content.`);
      } else if (['dgca-ground-classes', 'dgca-exam'].includes(serviceSlug)) {
        assert.equal(model.canRender, true, `${key}: India-specific DGCA intent is supported in India.`);
      }
      if (serviceSlug === 'pilot-training' && country !== 'India') {
        assert.equal(model.canRender, true, `${key}: generic pilot-training guidance remains renderable abroad.`);
      }

      summaries.push({ location: location.name, country, service: serviceSlug, model });
    }
  }

  const andheriPilotModel = modelsByLocationAndService.get('fixture-andheri:pilot-training');
  assert.equal(andheriPilotModel.verifiedFacts.length, 1);
  assert.equal(andheriPilotModel.verifiedFacts[0].sourceLocation, 'Mumbai');
  assert.equal(andheriPilotModel.verifiedFacts[0].inherited, true);
  assert.match(andheriPilotModel.inheritedFactNotice, /inherited from Mumbai/);
  assert.equal(
    engine.resolveVerifiedLocationFacts(
      engine.resolveLocation('fixture-andheri', ENGINE_TEST_LOCATIONS),
      ENGINE_TEST_LOCATIONS,
    ).some(({ sourceLocationSlug }) => sourceLocationSlug === 'fixture-andheri'),
    false,
    'Andheri does not receive invented locality-specific facts.',
  );

  const dwarkaModel = modelsByLocationAndService.get('fixture-dwarka:pilot-training');
  assert.ok(dwarkaModel.verifiedFacts.some(
    ({ sourceLocation, inherited }) => sourceLocation === 'Delhi' && inherited,
  ));
  assert.match(dwarkaModel.inheritedFactNotice, /inherited from Delhi/);
  const postalMumbaiModel = modelsByLocationAndService.get('fixture-pin-400053:pilot-training');
  assert.ok(postalMumbaiModel.verifiedFacts.some(
    ({ sourceLocation, inherited }) => sourceLocation === 'Mumbai' && inherited,
  ));
  const manhattanModel = modelsByLocationAndService.get('fixture-manhattan:pilot-training');
  assert.ok(manhattanModel.verifiedFacts.some(
    ({ sourceLocation, inherited }) => sourceLocation === 'New York City' && inherited,
  ));

  const indexabilityProbeLocation = {
    ...engine.resolveLocation('fixture-mumbai', ENGINE_TEST_LOCATIONS),
    indexable: true,
  };
  const indexabilityProbeService = engine.resolveServiceIntent('pilot-training', ENGINE_TEST_SERVICES);
  const indexabilityProbe = engine.buildLocationPageModel({
    location: indexabilityProbeLocation,
    service: indexabilityProbeService,
    siteOrigin: 'https://engine-fixture.invalid',
    locations: ENGINE_TEST_LOCATIONS,
  });
  assert.equal(indexabilityProbe.canRender, true);
  assert.equal(indexabilityProbe.indexability, 'INDEXABLE');
  assert.equal(indexabilityProbe.productionSitemapEligible, false);
  const unassessedCandidate = engine.buildLocationPageModel({
    location: {
      ...indexabilityProbeLocation,
      testOnly: false,
    },
    service: indexabilityProbeService,
    siteOrigin: 'https://engine-fixture.invalid',
    locations: ENGINE_TEST_LOCATIONS,
    geographicDataValidated: true,
  });
  assert.equal(unassessedCandidate.indexability, 'CONTENT_DIFFERENTIATION_REQUIRED');
  assert.equal(unassessedCandidate.productionSitemapEligible, false);

  const statusCoverage = {
    'RENDERABLE + INDEXABLE': indexabilityProbe.canRender
      && indexabilityProbe.indexability === 'INDEXABLE',
    'RENDERABLE + NOINDEX': modelsByLocationAndService.get('fixture-andheri:pilot-training').canRender
      && modelsByLocationAndService.get('fixture-andheri:pilot-training').indexability === 'NOINDEX',
    'RENDERABLE + INFORMATIONAL': modelsByLocationAndService.get('fixture-mumbai:pilot-training').canRender
      && modelsByLocationAndService.get('fixture-mumbai:pilot-training').indexability === 'INFORMATIONAL',
    NOT_SUPPORTED: modelsByLocationAndService.get('fixture-manhattan:dgca-exam').indexability === 'NOT_SUPPORTED',
    RESEARCH_ONLY: modelsByLocationAndService.get('fixture-manhattan:pilot-training').indexability === 'RESEARCH_ONLY',
  };
  assert.ok(Object.values(statusCoverage).every(Boolean), 'All independent renderability/indexability states are covered.');

  const relationshipsCovered = [
    'PHYSICAL',
    'ONLINE',
    'SERVICE_AREA',
    'INFORMATIONAL',
    'RESEARCH_ONLY',
    'UNSUPPORTED',
  ].every((relationship) => engine.LOCATION_RELATIONSHIPS.includes(
    relationship.toLowerCase().replace(/_/g, '-'),
  ));
  assert.ok(relationshipsCovered);
  for (const relationship of ['RESEARCH_ONLY', 'UNSUPPORTED']) {
    assert.ok(engine.LOCATION_RELATIONSHIPS.includes(
      relationship.toLowerCase().replace(/_/g, '-'),
    ));
  }
  const londonFixture = engine.resolveLocation('fixture-london', ENGINE_TEST_LOCATIONS);
  const pilotTrainingIntent = engine.resolveServiceIntent('pilot-training', ENGINE_TEST_SERVICES);
  const researchOnlyModel = engine.buildLocationPageModel({
    location: { ...londonFixture, relationship: 'RESEARCH_ONLY', indexable: true },
    service: pilotTrainingIntent,
    locations: ENGINE_TEST_LOCATIONS,
  });
  assert.equal(researchOnlyModel.canRender, true);
  assert.equal(researchOnlyModel.indexability, 'RESEARCH_ONLY');
  assert.equal(researchOnlyModel.productionSitemapEligible, false);
  const unsupportedRelationshipModel = engine.buildLocationPageModel({
    location: { ...londonFixture, relationship: 'UNSUPPORTED', indexable: true },
    service: pilotTrainingIntent,
    locations: ENGINE_TEST_LOCATIONS,
  });
  assert.equal(unsupportedRelationshipModel.canRender, false);
  assert.equal(unsupportedRelationshipModel.indexability, 'NOT_SUPPORTED');
  assert.equal(unsupportedRelationshipModel.productionSitemapEligible, false);
  assert.equal(
    locationSeo.isLocationServiceIndexable(
      { ...londonFixture, relationship: 'RESEARCH_ONLY', indexable: true },
      pilotTrainingIntent,
    ),
    false,
  );
  assert.equal(modelsByLocationAndService.get('fixture-dwarka:pilot-training').template, 'local-service');
  assert.equal(modelsByLocationAndService.get('fixture-andheri:pilot-training').template, 'aviation-intent-guidance');
  assert.equal(modelsByLocationAndService.get('fixture-lucknow:pilot-training').template, 'aviation-intent-guidance');
  assert.equal(modelsByLocationAndService.get('fixture-mumbai:pilot-training').template, 'aviation-location-information');
  assert.match(
    modelsByLocationAndService.get('fixture-andheri:pilot-training').metadata.robots,
    /^noindex, follow/,
  );
  for (const slug of ['fixture-dwarka', 'fixture-andheri', 'fixture-lucknow']) {
    const model = modelsByLocationAndService.get(`${slug}:pilot-training`);
    assert.match(model.relationshipGuidance, /does not imply|Do not infer/);
    assert.equal(model.unsupportedClaims.length, 0);
  }

  const unsupportedClaimFixtures = [
    'We One Aviation has a branch in Manhattan.',
    'We One Aviation has a classroom in Manhattan.',
    'We One Aviation operates an FTO in Manhattan.',
  ];
  const claimResults = unsupportedClaimFixtures.map((introduction) => (
    engine.findUnsupportedBusinessClaims(
      engine.resolveLocation('fixture-manhattan', ENGINE_TEST_LOCATIONS),
      { introduction },
    )
  ));
  assert.deepEqual(claimResults, [['branch'], ['classroom'], ['FTO']]);
  for (const introduction of unsupportedClaimFixtures) {
    assert.throws(() => engine.buildLocationPageModel({
      location: engine.resolveLocation('fixture-manhattan', ENGINE_TEST_LOCATIONS),
      service: indexabilityProbeService,
      content: { introduction },
      locations: ENGINE_TEST_LOCATIONS,
    }), /Unsupported We One Aviation business claims/);
  }
  assert.deepEqual(
    engine.findUnsupportedBusinessClaims(
      { ...engine.resolveLocation('fixture-dwarka', ENGINE_TEST_LOCATIONS), physicalPresence: { verified: true } },
      { introduction: unsupportedClaimFixtures[1] },
    ),
    [],
    'A classroom statement requires explicit verified physical-presence data.',
  );

  const comparisonSlugs = [
    'fixture-mumbai',
    'fixture-andheri',
    'fixture-delhi',
    'fixture-dwarka',
    'fixture-new-york-city',
    'fixture-manhattan',
    'fixture-london',
  ];
  const comparisonPages = comparisonSlugs.map((slug) => {
    const location = engine.resolveLocation(slug, ENGINE_TEST_LOCATIONS);
    const model = modelsByLocationAndService.get(`${slug}:pilot-training`);
    const namesToNormalize = engine.resolveLocationHierarchy(location, ENGINE_TEST_LOCATIONS)
      .map(({ name }) => name)
      .sort((left, right) => right.length - left.length);
    let normalizedBody = model.renderedBody.join('\n').toLowerCase();
    for (const name of namesToNormalize) {
      normalizedBody = normalizedBody.replace(
        new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
        '{geography}',
      );
    }
    const bodyLength = Math.max(1, model.renderedBody.join('\n').length);
    const inheritedChars = model.verifiedFacts
      .filter(({ inherited }) => inherited)
      .reduce((total, { text }) => total + text.length, 0);
    const directChars = model.verifiedFacts
      .filter(({ inherited }) => !inherited)
      .reduce((total, { text }) => total + text.length, 0);
    return {
      slug,
      name: location.name,
      model,
      body: model.renderedBody.join('\n'),
      normalizedBody,
      inheritedContentPercent: Number((inheritedChars / bodyLength * 100).toFixed(1)),
      directLocationContentPercent: Number((directChars / bodyLength * 100).toFixed(1)),
    };
  });
  const similarityPairs = [];
  for (let first = 0; first < comparisonPages.length; first += 1) {
    for (let second = first + 1; second < comparisonPages.length; second += 1) {
      const left = comparisonPages[first];
      const right = comparisonPages[second];
      assert.notEqual(left.body, right.body, `${left.name} and ${right.name} must have distinct full bodies.`);
      const leftTokens = new Set(left.normalizedBody.match(/[a-z0-9]+/g) || []);
      const rightTokens = new Set(right.normalizedBody.match(/[a-z0-9]+/g) || []);
      const intersection = [...leftTokens].filter((token) => rightTokens.has(token)).length;
      const union = new Set([...leftTokens, ...rightTokens]).size;
      const similarity = union ? intersection / union : 1;
      similarityPairs.push({
        first: left.name,
        second: right.name,
        exactMatch: left.body === right.body,
        normalizedJaccardPercent: Number((similarity * 100).toFixed(1)),
      });
    }
  }
  const exactDuplicatePairs = similarityPairs.filter(({ exactMatch }) => exactMatch).length;
  const maxNormalizedSimilarity = Math.max(
    ...similarityPairs.map(({ normalizedJaccardPercent }) => normalizedJaccardPercent),
  );
  assert.equal(exactDuplicatePairs, 0);
  const weakDifferentiationThreshold = 80;
  const weakDifferentiation = similarityPairs
    .filter(({ normalizedJaccardPercent }) => normalizedJaccardPercent >= weakDifferentiationThreshold)
    .map((pair) => ({
      ...pair,
      flag: 'REVIEW BEFORE ANY INDEXABILITY APPROVAL',
    }));
  assert.ok(weakDifferentiation.length > 0, 'The test should report high-similarity pairs for review rather than hiding them.');
  assert.ok(weakDifferentiation.every(({ first, second }) => (
    comparisonPages
      .filter(({ name }) => name === first || name === second)
      .every(({ model }) => model.indexability !== 'INDEXABLE')
  )));
  const contentSnapshots = comparisonPages.map(({ slug, model }) => {
    const location = engine.resolveLocation(slug, ENGINE_TEST_LOCATIONS);
    return differentiation.buildLocationContentSnapshot({
      location,
      hierarchy: engine.resolveLocationHierarchy(location, ENGINE_TEST_LOCATIONS),
      model,
      sections: location.localSections || [],
    });
  });
  const contentDifferentiationReports = contentSnapshots.map((candidate) => (
    differentiation.assessContentDifferentiation({
      candidate,
      comparisons: contentSnapshots.filter(({ slug }) => slug !== candidate.slug),
    })
  ));
  assert.ok(contentDifferentiationReports.every(
    ({ status }) => status === 'CONTENT_DIFFERENTIATION_REQUIRED',
  ));
  assert.ok(contentDifferentiationReports.every(({ metrics }) => (
    Number.isFinite(metrics.exactDuplicatePercent)
    && Number.isFinite(metrics.normalizedSimilarityPercent)
    && Number.isFinite(metrics.inheritedContentPercent)
    && Number.isFinite(metrics.directContentPercent)
    && Number.isFinite(metrics.genericContentPercent)
    && Number.isFinite(metrics.locationSpecificContentPercent)
    && Number.isFinite(metrics.regulatoryContentPercent)
    && Number.isInteger(metrics.uniqueFaqCount)
    && Number.isInteger(metrics.uniqueSectionCount)
  )));
  const positiveDifferentiation = differentiation.assessContentDifferentiation({
    candidate: {
      slug: 'synthetic-aviation-example',
      name: 'Example City',
      body: 'Synthetic test-only local aviation evidence identifies a distinct airport access route and a local regulator office. Students should verify current service scope and appointments directly.',
      locationNames: ['Example City'],
      verifiedFacts: [{
        text: 'Synthetic test-only local aviation evidence identifies a distinct airport access route.',
        verified: true,
        inherited: false,
      }],
      regulatoryText: 'Example regulator',
      faqs: [{ question: 'Which local aviation records should a student confirm?' }],
      sections: [{
        title: 'Local airport access evidence',
        body: 'Synthetic test-only detail about the local airport access route.',
        verified: true,
      }],
    },
    comparisons: [{
      slug: 'synthetic-other-city',
      body: 'Separate synthetic content: the national regulator publishes general licensing requirements and advises applicants to check current requirements.',
      locationNames: ['Other City'],
      verifiedFacts: [],
      faqs: [{ question: 'What national licensing rules apply to applicants?' }],
      sections: [{
        title: 'National licensing overview',
        body: 'General regulatory information only.',
        verified: true,
      }],
    }],
  });
  assert.equal(positiveDifferentiation.status, 'PASSED');
  assert.equal(positiveDifferentiation.metrics.exactDuplicatePercent, 0);
  const locationNameOnlyDifference = differentiation.assessContentDifferentiation({
    candidate: {
      slug: 'north-city',
      body: 'Pilot training guidance for North City.',
      locationNames: ['North City'],
      faqs: [],
      sections: [],
    },
    comparisons: [{
      slug: 'south-city',
      body: 'Pilot training guidance for South City.',
      locationNames: ['South City'],
      faqs: [],
      sections: [],
    }],
  });
  assert.equal(locationNameOnlyDifference.metrics.exactDuplicatePercent, 0);
  assert.equal(locationNameOnlyDifference.metrics.normalizedSimilarityPercent, 100);
  assert.equal(locationNameOnlyDifference.status, 'CONTENT_DIFFERENTIATION_REQUIRED');
  const differentiationBlockedPage = engine.buildLocationPageModel({
    location: engine.resolveLocation('fixture-mumbai', ENGINE_TEST_LOCATIONS),
    service: engine.resolveServiceIntent('pilot-training', ENGINE_TEST_SERVICES),
    locations: ENGINE_TEST_LOCATIONS,
    contentDifferentiation: contentDifferentiationReports[0],
    geographicDataValidated: true,
  });
  assert.equal(differentiationBlockedPage.indexability, 'CONTENT_DIFFERENTIATION_REQUIRED');
  assert.equal(differentiationBlockedPage.metadata.robots, 'noindex, follow');
  assert.equal(differentiationBlockedPage.productionSitemapEligible, false);
  assert.equal(
    differentiationBlockedPage.indexabilityPipeline.status,
    'CONTENT_DIFFERENTIATION_REQUIRED',
  );

  const passedPipeline = indexabilityFlow.evaluateLocationIndexabilityPipeline({
    locationExists: true,
    hierarchyValid: true,
    serviceExists: true,
    serviceCompatible: true,
    relationshipValid: true,
    contentAvailable: true,
    contentDifferentiation: positiveDifferentiation,
    businessClaimsValid: true,
    renderable: true,
    indexabilityApproved: true,
    sitemapAllowlisted: false,
  });
  assert.equal(passedPipeline.status, 'INDEXABLE');
  assert.equal(passedPipeline.sitemapEligible, false);
  const failedHierarchyPipeline = indexabilityFlow.evaluateLocationIndexabilityPipeline({
    locationExists: true,
    hierarchyValid: false,
    serviceExists: true,
    serviceCompatible: true,
    relationshipValid: true,
    contentAvailable: true,
    contentDifferentiation: positiveDifferentiation,
    businessClaimsValid: true,
    renderable: true,
    indexabilityApproved: true,
    sitemapAllowlisted: true,
  });
  assert.equal(failedHierarchyPipeline.status, 'NOT_SUPPORTED');
  const noDifferentiationPipeline = indexabilityFlow.evaluateLocationIndexabilityPipeline({
    locationExists: true,
    hierarchyValid: true,
    serviceExists: true,
    serviceCompatible: true,
    relationshipValid: true,
    contentAvailable: true,
    businessClaimsValid: true,
    renderable: true,
    indexabilityApproved: true,
    sitemapAllowlisted: true,
  });
  assert.equal(noDifferentiationPipeline.status, 'CONTENT_DIFFERENTIATION_REQUIRED');

  for (const type of ['postal-area', ...engine.POSTAL_TYPE_ALIASES]) {
    const postalNode = {
      id: `test:${type}`,
      slug: `postal-${type}`,
      name: 'Test postal zone',
      type,
      parentId: 'test:city:mumbai',
      country: 'India',
      postalCode: `postal-${type}`,
      aliases: [],
      sourceLinks: [],
      testOnly: true,
    };
    const postalData = [...ENGINE_TEST_LOCATIONS, postalNode];
    assert.equal(engine.validateGeographicNodes(postalData).length, 0, `${type} is accepted.`);
    assert.equal(
      engine.resolveLocationHierarchy(postalNode, postalData).at(-1).type,
      type,
      `${type} remains identifiable in the hierarchy.`,
    );
  }

  const productionRoutesStillExact = locationSeo.getIndexableLocationServiceRoutes()
    .sort()
    .join('\n') === routeBaseline.sort().join('\n');
  assert.ok(productionRoutesStillExact);
  for (const fixture of ENGINE_TEST_LOCATIONS) {
    assert.equal(fixture.testOnly, true);
    assert.ok(!LOCATIONS.some(({ slug }) => slug === fixture.slug));
  }

  const normalizedMetadataExamples = ['fixture-mumbai', 'fixture-new-york-city', 'fixture-london']
    .map((slug) => {
      const location = engine.resolveLocation(slug, ENGINE_TEST_LOCATIONS);
      const model = modelsByLocationAndService.get(`${slug}:pilot-training`);
      return {
        location: location.name,
        template: model.template,
        title: model.metadata.title,
        description: model.metadata.description,
        h1: model.metadata.h1,
        breadcrumb: model.schema.breadcrumbItems,
        faq: model.faqs[0]?.question,
      };
    });
  assert.equal(new Set(normalizedMetadataExamples.map(({ title }) => title)).size, 3);
  assert.equal(new Set(normalizedMetadataExamples.map(({ description }) => description)).size, 3);
  assert.equal(new Set(normalizedMetadataExamples.map(({ h1 }) => h1)).size, 3);
  assert.equal(new Set(normalizedMetadataExamples.map(({ faq }) => faq)).size, 3);
  assert.equal(new Set(normalizedMetadataExamples.map(({ template }) => template)).size, 1);

  const indexabilityCounts = summaries.reduce((counts, { model }) => {
    counts[model.indexability] = (counts[model.indexability] || 0) + 1;
    counts.renderable = (counts.renderable || 0) + Number(model.canRender);
    counts.notRenderable = (counts.notRenderable || 0) + Number(!model.canRender);
    counts.sitemapEligible = (counts.sitemapEligible || 0) + Number(model.productionSitemapEligible);
    return counts;
  }, {});
  const locationServiceMatrixCounts = summaries.reduce((counts, { model }) => {
    counts.supportStatus[model.supportStatus] = (counts.supportStatus[model.supportStatus] || 0) + 1;
    counts.renderStatus[model.renderStatus] = (counts.renderStatus[model.renderStatus] || 0) + 1;
    counts.indexability[model.indexability] = (counts.indexability[model.indexability] || 0) + 1;
    return counts;
  }, { supportStatus: {}, renderStatus: {}, indexability: {} });
  const templateCounts = summaries.reduce((counts, { model }) => {
    if (model.template) counts[model.template] = (counts[model.template] || 0) + 1;
    return counts;
  }, {});
  assert.deepEqual(Object.keys(templateCounts).sort(), [...engine.LOCATION_TEMPLATE_TYPES].sort());
  const inheritedContentPercentages = comparisonPages.map(({ name, inheritedContentPercent }) => ({
    location: name,
    inheritedContentPercent,
  }));
  const directLocationContentPercentages = comparisonPages.map(({ name, directLocationContentPercent }) => ({
    location: name,
    directLocationContentPercent,
  }));
  assert.ok(indexabilityCounts.renderable > 0);
  assert.ok(indexabilityCounts.notRenderable > 0);
  assert.equal(indexabilityCounts.sitemapEligible, 0);
  assert.ok([...inheritedContentPercentages, ...directLocationContentPercentages]
    .every(({ inheritedContentPercent, directLocationContentPercent }) => (
      (inheritedContentPercent ?? directLocationContentPercent) >= 0
    )));

  console.log(JSON.stringify({
    reusablePageImplementation: {
      component: 'LocationServicePage',
      engineModel: 'buildLocationPageModel',
      singleComponentDefinition: true,
      fixtureGeographicNodes: ENGINE_TEST_LOCATIONS.length,
      comparisonLocations: comparisonSlugs.length,
      serviceIntents: serviceSlugs.length,
      evaluatedLocationServiceModels: summaries.length,
    },
    geographicDataLayer: {
      realSampleRecordCount: realRecords.length,
      syntheticTestRecordCount: ENGINE_TEST_LOCATIONS.length,
      countries: [...new Set(realRecords
        .filter(({ type }) => type === 'country')
        .map(({ name }) => name))],
      validatedRealSample: true,
      validatedSyntheticFixtures: true,
      sourceLinks: new Set(realRecords.flatMap(({ sourceLinks }) => (
        sourceLinks.map(({ href }) => href)
      ))).size,
      sourceUrls: [...new Set(realRecords.flatMap(({ sourceLinks }) => (
        sourceLinks.map(({ href }) => href)
      )))],
      coverageComplete: false,
      sampleFeedsRoutingOrSitemap: false,
      separatedDataSources: {
        geography: 'data/location-seo/geography/real-sample.js',
        business: 'data/location-seo/business-profiles.js',
        aviationRegulatoryContext: 'data/location-seo/aviation-regulatory-contexts.js',
        serviceIntent: 'data/location-seo/services.js',
        indexabilityPolicy: 'data/location-seo/geographic-indexability-policy.js',
      },
      realSampleDefaultRecord: {
        relationship: composedAndheri.relationship,
        renderable: composedAndheri.renderable,
        indexable: composedAndheri.indexable,
        supportedServices: composedAndheri.supportedServices,
      },
    },
    resolverCapabilities: [
      'resolveBySlug',
      'resolveByAlias',
      'resolveByPostalCode',
      'resolveHierarchy',
      'resolveCountry',
      'resolveState',
      'resolveCounty',
      'resolveCity',
      'resolveLocality',
    ],
    geographicValidation: {
      invalidCasesRejected: invalidDataCases.map(({ label }) => label),
      invalidInputFailsSafely: geographicData.validateGeographicData(null).length > 0,
    },
    geographicLevels: engine.GEOGRAPHIC_LEVELS,
    postalTypeAliases: engine.POSTAL_TYPE_ALIASES,
    geographicTypeCounts: ENGINE_TEST_LOCATIONS.reduce((counts, { type }) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {}),
    hierarchyProof: Object.fromEntries(Object.entries(expectedPaths)),
    relationshipsCovered: [
      'PHYSICAL',
      'ONLINE',
      'SERVICE_AREA',
      'INFORMATIONAL',
      'RESEARCH_ONLY',
      'UNSUPPORTED',
    ],
    indexabilityStateCoverage: statusCoverage,
    inheritance: {
      andheriInheritsFromMumbai: andheriPilotModel.verifiedFacts[0].inherited,
      dwarkaInheritsFromDelhi: dwarkaModel.verifiedFacts.some(
        ({ sourceLocation, inherited }) => sourceLocation === 'Delhi' && inherited,
      ),
      noInventedLocalFacts: true,
    },
    foreignRegulatoryContext: {
      Manhattan: engine.resolveRegulatoryContext(
        engine.resolveLocation('fixture-manhattan', ENGINE_TEST_LOCATIONS),
        ENGINE_TEST_LOCATIONS,
      ),
      London: engine.resolveRegulatoryContext(
        engine.resolveLocation('fixture-london', ENGINE_TEST_LOCATIONS),
        ENGINE_TEST_LOCATIONS,
      ),
      dgcaIntentsBlockedOutsideIndia: true,
    },
    unsupportedBusinessClaimsRejected: claimResults,
    duplicateContent: {
      comparedLocations: comparisonSlugs.length,
      pairCount: similarityPairs.length,
      exactDuplicatePairs: exactDuplicatePairs,
      exactDuplicatePercentage: Number((exactDuplicatePairs / similarityPairs.length * 100).toFixed(1)),
      maxNormalizedJaccardSimilarityPercent: maxNormalizedSimilarity,
      normalizedSimilarityMetric: 'token-set Jaccard after replacing each page hierarchy names',
      weakDifferentiationThresholdPercent: weakDifferentiationThreshold,
      weakDifferentiation,
      inheritedContentPercentages,
      directLocationContentPercentages,
      differentiatedContentGate: {
        thresholds: indexabilityPolicy.GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation,
        candidateAssessments: comparisonPages.map(({ name }, index) => ({
          location: name,
          status: contentDifferentiationReports[index].status,
          metrics: contentDifferentiationReports[index].metrics,
        })),
        syntheticUniqueContentPassStatus: positiveDifferentiation.status,
        missingAssessmentPipelineStatus: noDifferentiationPipeline.status,
        passingPipelineStages: passedPipeline.stages,
      },
    },
    metadataDifferentiation: normalizedMetadataExamples,
    renderabilityByGeographicType: renderabilityByType,
    templateResults: templateCounts,
    indexabilityAndSitemapCounts: indexabilityCounts,
    locationServiceMatrixCounts,
    currentProductionRoutes: {
      count: locationSeo.getIndexableLocationServiceRoutes().length,
      unchanged: productionRoutesStillExact,
      allTenRoutesStillSitemapEligible: productionRouteModels.every(
        ({ productionSitemapEligible }) => productionSitemapEligible,
      ),
      fixtureLocationsAddedToProductionData: false,
      fixtureSitemapEligibility: false,
      unassessedProductionCandidate: {
        indexability: unassessedCandidate.indexability,
        pipelineStatus: unassessedCandidate.indexabilityPipeline.status,
        sitemapEligible: unassessedCandidate.productionSitemapEligible,
      },
      sitemapAllowlistCount: LOCATION_SITEMAP_SLUGS.length,
    },
    representativePilotTrainingResults: comparisonPages.map(({ name, model }) => ({
      location: name,
      relationship: model.relationship,
      template: model.template,
      renderable: model.canRender,
      indexability: model.indexability,
      title: model.metadata.title,
      description: model.metadata.description,
      h1: model.metadata.h1,
      breadcrumbs: model.schema.breadcrumbItems,
      faqs: model.faqs,
      regulatoryAuthority: model.regulatoryContext.authority,
      verifiedFacts: model.verifiedFacts.map(({ sourceLocation, inherited, source }) => ({
        sourceLocation,
        relationship: inherited ? 'INHERITED' : 'DIRECT',
        source,
      })),
    })),
  }, null, 2));
}

main().catch((error) => {
  console.error(`test-location-engine: ${error.stack || error.message}`);
  process.exitCode = 1;
});
