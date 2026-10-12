const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const [
    { resolveGeographicServicePage },
    { buildLocationPageModel },
    approvals,
  ] = await Promise.all([
    import('../lib/geographicServicePage.js'),
    import('../lib/locationEngine.js'),
    import('../data/location-seo/production-route-approvals.js'),
  ]);
  const cases = [
    {
      slug: 'abu-dhabi',
      countryCode: 'AE',
      authority: 'United Arab Emirates General Civil Aviation Authority (GCAA)',
    },
    { slug: 'london', countryCode: 'GB', authority: 'UK Civil Aviation Authority (CAA)' },
    { slug: 'new-york-city', countryCode: 'US', authority: 'Federal Aviation Administration (FAA)' },
    { slug: 'toronto', countryCode: 'CA', authority: 'Transport Canada' },
    { slug: 'sydney', countryCode: 'AU', authority: 'Civil Aviation Safety Authority (CASA)' },
    {
      slug: 'paris',
      countryCode: 'FR',
      authority: 'Direction générale de l’aviation civile (DGAC), within the EASA framework',
    },
    { slug: 'tokyo', countryCode: 'JP', authority: 'Japan Civil Aviation Bureau (JCAB)' },
    {
      slug: 'singapore',
      countryCode: 'SG',
      authority: 'Civil Aviation Authority of Singapore (CAAS)',
      expectedIndexability: 'NOINDEX',
    },
    {
      slug: 'dubai',
      countryCode: 'AE',
      authority: 'United Arab Emirates General Civil Aviation Authority (GCAA)',
    },
  ];
  const indexableRoutes = [];

  for (const {
    slug,
    countryCode,
    authority,
    expectedIndexability = 'INDEXABLE',
  } of cases) {
    const resolved = await resolveGeographicServicePage({
      location: slug,
      service: 'pilot-training',
    });
    assert.equal(Boolean(resolved.notFound), false, `/${slug}/pilot-training must resolve.`);
    const { location, service, content, engineLocations, geographicDataValidated } = resolved.props;
    const model = buildLocationPageModel({
      location,
      service,
      content,
      locations: engineLocations,
      geographicDataValidated,
    });
    const route = `/${slug}/pilot-training`;
    const visibleText = model.renderedPageText?.join(' ') || model.renderedBody.join(' ');

    assert.equal(location.countryCode, countryCode, `${route}: country identity must match.`);
    assert.notEqual(location.physicalAcademy, true, `${route}: test location has no We One Aviation branch.`);
    assert.notEqual(
      location.physicalPresence?.verified,
      true,
      `${route}: no verified local premises are required for this worldwide page.`,
    );
    assert.equal(model.hierarchy[0]?.type, 'country', `${route}: hierarchy begins at the country.`);
    assert.equal(model.hierarchy.at(-1)?.id, location.id, `${route}: hierarchy ends at the resolved identity.`);
    assert.equal(model.regulatoryContext.authority, authority, `${route}: regulator must match the country.`);
    assert.equal(
      model.indexability,
      expectedIndexability,
      `${route}: publication follows the verified quality decision.`,
    );
    assert.match(
      model.metadata.robots,
      expectedIndexability === 'INDEXABLE' ? /^index, follow/ : /^noindex, follow/,
    );
    assert.equal(model.metadata.canonical, `https://weoneaviation.in${route}`);
    assert.equal(model.sitemapEligible, expectedIndexability === 'INDEXABLE');
    assert.equal(model.productionApproval.approved, expectedIndexability === 'INDEXABLE');
    if (expectedIndexability === 'INDEXABLE') {
      assert.equal(
        model.productionApproval.source,
        slug === 'dubai' ? 'explicit-production-approval' : 'worldwide-quality-gated-policy',
      );
    }
    assert.deepEqual(model.unsupportedClaims, []);
    assert.match(
      visibleText,
      /does not claim a [^.]+(?:branch|classroom|local partner)|does not offer or imply a local service/i,
      `${route}: visible copy must clearly disclaim local delivery and partnership.`,
    );
    if (expectedIndexability === 'INDEXABLE') indexableRoutes.push(route);

    const failedQualityModel = buildLocationPageModel({
      location,
      service,
      content,
      locations: engineLocations,
      geographicDataValidated,
      contentDifferentiation: {
        status: 'FAILED',
        reasons: ['Regression fixture: content differentiation failed.'],
        similarityScore: 100,
        uniqueFAQCount: 0,
        uniqueSectionCount: 0,
        locationSpecificContentPercent: 0,
      },
    });
    assert.notEqual(failedQualityModel.indexability, 'INDEXABLE', `${route}: failed quality cannot be indexable.`);
    assert.match(failedQualityModel.metadata.robots, /^noindex, follow/);
    assert.equal(failedQualityModel.sitemapEligible, false);
    assert.equal(failedQualityModel.productionApproval.approved, false);
  }

  const publicationCachePath = path.join(
    __dirname,
    '..',
    'data',
    'location-seo',
    'geography',
    'approved-geographic-sitemap-routes.json',
  );
  const publicationCache = JSON.parse(fs.readFileSync(publicationCachePath, 'utf8'));
  const { readWorldwidePublicationInventory } = await import('../lib/worldwidePublicationInventory.js');
  const publicationInventory = readWorldwidePublicationInventory();
  assert.equal(
    publicationInventory.provenance,
    'full-quality-evaluation',
    'Worldwide route decisions must come from a full current-input quality evaluation.',
  );
  assert.ok(
    publicationInventory.evaluation.evaluatedWorldwideRoutes
      >= publicationInventory.registry.supportedLocationCount,
    'The current quality evaluation must cover the supported worldwide location set.',
  );
  const abuDhabiDecision = publicationCache.approvedRoutes.find(
    ({ route }) => route === '/abu-dhabi/pilot-training',
  );
  assert.equal(abuDhabiDecision?.state, 'INDEXABLE', 'Abu Dhabi remains in the final page-model cache.');
  assert.equal(abuDhabiDecision?.qualityPassed, true, 'Abu Dhabi passed worldwide quality evaluation.');
  assert.equal(
    abuDhabiDecision?.approvalSource,
    'worldwide-quality-gated-policy',
    'Abu Dhabi approval is from the worldwide quality-gated policy.',
  );

  const { hasIndiaGeographicRouteSlug } = await import('../lib/indiaGeographicRegistry.js');
  const ambiguous = await resolveGeographicServicePage({
    location: 'new-york',
    service: 'pilot-training',
  });
  assert.equal(Boolean(ambiguous.notFound), true, 'Ambiguous New York aliases fail closed.');
  const unknown = await resolveGeographicServicePage({
    location: 'no-such-place',
    service: 'pilot-training',
  });
  assert.equal(Boolean(unknown.notFound), true, 'Unknown locations fail closed.');
  const unsupportedService = await resolveGeographicServicePage({
    location: 'london',
    service: 'dgca-ground-classes',
  });
  assert.equal(Boolean(unsupportedService.notFound), true, 'DGCA services are not offered outside India.');
  const unsupportedCountry = await resolveGeographicServicePage({
    location: 'cape-town',
    service: 'pilot-training',
  });
  assert.equal(Boolean(unsupportedCountry.notFound), true, 'Countries without verified regulator context fail closed.');
  assert.equal(hasIndiaGeographicRouteSlug('changi'), true, 'The route slug collision is present in the India registry.');
  const crossRegistryCollision = await resolveGeographicServicePage({
    location: 'changi',
    service: 'pilot-training',
  });
  assert.equal(
    Boolean(crossRegistryCollision.notFound),
    true,
    'Cross-registry route collisions fail closed and are excluded from publication.',
  );

  const london = await resolveGeographicServicePage({
    location: 'london',
    service: 'pilot-training',
  });
  const mismatchedApproval = approvals.getProductionRouteApproval('/london/pilot-training', {
    registryBacked: true,
    location: {
      ...london.props.location,
      id: 'geo:wrong:london',
      registryRecordId: 'geo:wrong:london',
    },
    service: london.props.service,
  });
  assert.equal(mismatchedApproval.approved, false, 'A route cannot override its verified registry identity.');

  const { iterateIndexableWorldLocationServicePairs } = await import('../lib/worldGeographicSitemap.js');
  const stopAfterInvalidCandidate = new Error('Stop after confirming iteration continues.');
  let invalidHierarchyDecision = null;
  let continuedAfterInvalidHierarchy = false;
  let firstYieldedCandidate = null;
  const yieldedSlugs = new Set();
  try {
    for (const candidate of iterateIndexableWorldLocationServicePairs({
      onDecision(decision) {
        if (decision.record.id === 'geoname:8477212') {
          invalidHierarchyDecision = decision;
        } else if (invalidHierarchyDecision) {
          continuedAfterInvalidHierarchy = true;
          throw stopAfterInvalidCandidate;
        }
      },
    })) {
      if (!firstYieldedCandidate) firstYieldedCandidate = candidate;
      yieldedSlugs.add(candidate.location.slug);
    }
  } catch (error) {
    if (error !== stopAfterInvalidCandidate) throw error;
  }
  assert.equal(
    invalidHierarchyDecision?.status,
    'NOINDEX',
    'An incomplete world-registry hierarchy must be rejected as NOINDEX.',
  );
  assert.equal(
    invalidHierarchyDecision?.record.id,
    'geoname:8477212',
    'The known incomplete GeoNames neighborhood must be rejected.',
  );
  assert.equal(
    continuedAfterInvalidHierarchy,
    true,
    'An invalid hierarchy must not abort evaluation of subsequent locations.',
  );
  assert.equal(yieldedSlugs.has('al-hoashi'), false, 'An invalid hierarchy cannot be yielded to the sitemap.');
  assert.ok(firstYieldedCandidate, 'The worldwide evaluator must yield an eligible route.');
  const firstCandidateModel = buildLocationPageModel({
    location: firstYieldedCandidate.location,
    service: firstYieldedCandidate.service,
    content: firstYieldedCandidate.content,
    locations: firstYieldedCandidate.hierarchy,
    geographicDataValidated: true,
  });
  assert.equal(firstCandidateModel.indexability, firstYieldedCandidate.publicationDecision.status);
  assert.equal(firstCandidateModel.sitemapEligible, true);
  assert.ok(firstCandidateModel.metadata.robots.startsWith(
    firstYieldedCandidate.publicationDecision.robots,
  ));
  assert.equal(
    firstCandidateModel.metadata.canonical,
    `https://weoneaviation.in${firstYieldedCandidate.publicationDecision.canonical}`,
  );
  assert.equal(firstCandidateModel.productionApproval.approved, true);

  console.log(JSON.stringify({
    routesTested: cases.length,
    indexableRoutes,
    validCountries: cases.map(({ countryCode }) => countryCode),
    invalidCases: [
      'ambiguous',
      'unknown',
      'unsupported-service',
      'unsupported-country',
      'cross-registry-collision',
    ].length,
    failedQualityRegression: 'NOINDEX and excluded',
    incompleteWorldHierarchyRegression: 'NOINDEX, excluded, and later candidates evaluated',
    localPresenceClaims: 'none',
  }, null, 2));
}

main().catch((error) => {
  console.error(`test-worldwide-location-publication: ${error.stack || error.message}`);
  process.exitCode = 1;
});
