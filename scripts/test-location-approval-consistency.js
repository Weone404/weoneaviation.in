const assert = require('node:assert/strict');

async function main() {
  const [
    locationSeo,
    engine,
    geographicServicePage,
    approvals,
    candidateRegistry,
    locationData,
    geographicSitemapCache,
    reconciliation,
    productionRevocations,
    indiaCandidateGeography,
    globalPilotGeography,
    indiaRegistry,
    indexabilityPolicy,
  ] = await Promise.all([
    import('../lib/locationSeo.js'),
    import('../lib/locationEngine.js'),
    import('../lib/geographicServicePage.js'),
    import('../data/location-seo/production-route-approvals.js'),
    import('../data/location-seo/production-candidate-registry.js'),
    import('../data/location-seo/locations.js'),
    import('../data/location-seo/geography/approved-geographic-sitemap-routes.json', {
      with: { type: 'json' },
    }),
    import('../data/location-seo/geography/production-route-reconciliation.json', {
      with: { type: 'json' },
    }),
    import('../data/location-seo/production-route-revocations.js'),
    import('../data/location-seo/geography/india-aviation-candidate-geography.js'),
    import('../data/location-seo/geography/global-pilot.js'),
    import('../lib/indiaGeographicRegistry.js'),
    import('../data/location-seo/geographic-indexability-policy.js'),
  ]);

  const approvedRoutes = approvals.getApprovedProductionRoutes();
  const approvedRouteSet = new Set(approvedRoutes);
  const revokedByRoute = new Map(
    approvals.getRevokedProductionRouteDecisions().map((decision) => [decision.route, decision]),
  );
  const sitemapRouteSet = new Set(
    geographicSitemapCache.default.approvedRoutes.map(({ route }) => route),
  );
  const persistedRevocations = productionRevocations.PRODUCTION_ROUTE_REVOCATIONS
    .flatMap((entry) => entry.services.map((service) => ({
      route: `/${entry.slug}/${service}`,
      entry,
    })));
  let unsupportedClaims = 0;

  assert.equal(approvedRoutes.length, 45, 'Only the explicitly approved live routes remain approved.');
  assert.equal(approvedRouteSet.size, approvedRoutes.length, 'Production approvals are unique.');
  assert.equal(geographicSitemapCache.default.version, 3, 'Sitemap cache records fingerprinted final page-model decisions.');
  assert.equal(
    new Set(geographicSitemapCache.default.approvedRoutes.map(({ route }) => route)).size,
    geographicSitemapCache.default.approvedRoutes.length,
    'The sitemap cache contains unique final page-model decisions.',
  );
  for (const route of approvedRoutes) {
    assert.ok(sitemapRouteSet.has(route), `${route}: explicit approvals remain in the sitemap cache.`);
  }
  for (const entry of geographicSitemapCache.default.approvedRoutes) {
    const approvalContext = entry.registry === 'world-geographic-index'
      ? {
        registryBacked: true,
        location: {
          id: entry.recordId,
          registryRecordId: entry.recordId,
          registrySlug: entry.locationSlug,
          slug: entry.locationSlug,
          countryCode: entry.countryCode,
        },
        service: { slug: entry.serviceSlug },
      }
      : null;
    assert.equal(
      approvals.getProductionRouteApproval(entry.route, approvalContext).approved,
      true,
      `${entry.route}: sitemap cache decision is supported by the current policy.`,
    );
    assert.equal(
      approvals.getProductionRouteApproval(entry.route, approvalContext).source,
      entry.approvalSource,
      `${entry.route}: cached approval source matches current policy.`,
    );
    assert.equal(entry.canonicalPath, entry.route, `${entry.route}: cached canonical path is self-referencing.`);
    assert.equal(
      entry.canonicalUrl,
      `https://weoneaviation.in${entry.route}`,
      `${entry.route}: cached canonical URL is self-referencing.`,
    );
    assert.equal(
      entry.robots,
      indexabilityPolicy.INDEXABLE_ROBOTS_DIRECTIVE,
      `${entry.route}: cached robots directive matches the shared publication decision.`,
    );
  }
  assert.equal(
    geographicSitemapCache.default.approvedRoutes.some(({ route }) => route === '/bengaluru/pilot-training'),
    false,
    'Bengaluru cannot enter the sitemap cache while it fails differentiation.',
  );
  assert.equal(reconciliation.default.snapshotIndexableRoutes, 112);
  assert.equal(reconciliation.default.conflictCount, 75);
  assert.equal(revokedByRoute.size, 54, 'Only verified, resolvable denial decisions are persisted.');
  assert.equal(persistedRevocations.length, 54, 'The source policy has no duplicate or implicit routes.');
  assert.equal(
    new Set(persistedRevocations.map(({ route }) => route)).size,
    persistedRevocations.length,
  );
  assert.ok(
    persistedRevocations.every(({ entry }) => (
      ['INSUFFICIENT_LOCATION_EVIDENCE', 'RESOLVER_IDENTITY_CONFLICT'].includes(entry.reasonCode)
    )),
    'Every persisted denial has an explicit reviewed reason.',
  );
  assert.deepEqual(reconciliation.default.classificationCounts, {
    'insufficient evidence': 71,
    'resolver mismatch': 4,
  });
  assert.equal(
    indexabilityPolicy.GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation
      .maxNormalizedSimilarityPercent,
    80,
    'The 80% differentiation threshold is unchanged.',
  );
  for (const decision of reconciliation.default.conflicts) {
    for (const field of [
      'route',
      'approvedRecordId',
      'resolvedRecordId',
      'locationName',
      'service',
      'approvalSource',
      'actualModelState',
      'classification',
      'failureReason',
      'recommendedAction',
    ]) {
      assert.ok(
        Object.hasOwn(decision, field),
        `${decision.route}: reconciliation records ${field}, including explicit null IDs where unavailable.`,
      );
    }
  }

  for (const route of approvedRoutes) {
    const [locationSlug, serviceSlug] = route.slice(1).split('/');
    const approval = approvals.getProductionRouteApproval(route);
    assert.equal(approval.approved, true, `${route}: authoritative source approves this route.`);
    assert.equal(approval.state, 'APPROVED', `${route}: approval state is explicit.`);

    const resolved = await geographicServicePage.resolveGeographicServicePage({
      location: locationSlug,
      service: serviceSlug,
    });
    assert.equal(Boolean(resolved.notFound), false, `${route}: approved route resolves.`);
    assert.equal(resolved.props.location.slug, locationSlug, `${route}: resolver location matches.`);
    assert.equal(resolved.props.service.slug, serviceSlug, `${route}: resolver service matches.`);
    if (approval.recordId) {
      assert.equal(
        resolved.props.location.id,
        approval.recordId,
        `${route}: resolver matches the authoritative geographic record ID.`,
      );
    }

    const model = engine.buildLocationPageModel({
      location: resolved.props.location,
      service: resolved.props.service,
      content: resolved.props.content,
      locations: resolved.props.engineLocations,
      geographicDataValidated: resolved.props.geographicDataValidated,
    });
    assert.equal(model.canRender, true, `${route}: page model renders.`);
    assert.equal(model.supportStatus, 'SUPPORTED', `${route}: service is supported.`);
    assert.equal(model.indexability, 'INDEXABLE', `${route}: current quality gates pass.`);
    assert.match(model.metadata.robots, /^index, follow/, `${route}: robots allows indexing.`);
    assert.equal(
      model.metadata.canonical,
      `https://weoneaviation.in${route}`,
      `${route}: canonical is exact.`,
    );
    assert.equal(model.sitemapEligible, true, `${route}: page model is sitemap eligible.`);
    assert.equal(model.productionApproval.approved, true, `${route}: final production approval passes.`);
    assert.deepEqual(model.unsupportedClaims, [], `${route}: no unsupported claims.`);
    unsupportedClaims += model.unsupportedClaims.length;
  }

  const bengaluruRoute = '/bengaluru/pilot-training';
  const bengaluruDecision = approvals.getProductionRouteApproval(bengaluruRoute);
  assert.equal(bengaluruDecision.approved, false, 'Bengaluru has no production approval.');
  const bengaluruPage = await geographicServicePage.resolveGeographicServicePage({
    location: 'bengaluru',
    service: 'pilot-training',
  });
  assert.equal(Boolean(bengaluruPage.notFound), false, 'Bengaluru remains safely renderable.');
  const bengaluruModel = engine.buildLocationPageModel({
    location: bengaluruPage.props.location,
    service: bengaluruPage.props.service,
    content: bengaluruPage.props.content,
    locations: bengaluruPage.props.engineLocations,
    geographicDataValidated: bengaluruPage.props.geographicDataValidated,
  });
  assert.equal(bengaluruModel.indexability, 'NOINDEX');
  assert.match(bengaluruModel.metadata.robots, /^noindex, follow/);
  assert.equal(bengaluruModel.sitemapEligible, false);
  assert.equal(bengaluruModel.productionApproval.approved, false);

  const approvedTestRoute = approvedRoutes.find((route) => route === '/dubai/pilot-training');
  assert.ok(approvedTestRoute, 'Dubai remains explicitly approved and is used for the failed-quality regression.');
  const dubaiPage = await geographicServicePage.resolveGeographicServicePage({
    location: 'dubai',
    service: 'pilot-training',
  });
  const failedQualityModel = engine.buildLocationPageModel({
    location: dubaiPage.props.location,
    service: dubaiPage.props.service,
    content: dubaiPage.props.content,
    locations: dubaiPage.props.engineLocations,
    geographicDataValidated: dubaiPage.props.geographicDataValidated,
    contentDifferentiation: {
      status: 'FAILED',
      reasons: ['Regression fixture: content differentiation failed.'],
      similarityScore: 100,
      uniqueFAQCount: 0,
      uniqueSectionCount: 0,
      locationSpecificContentPercent: 0,
    },
  });
  assert.notEqual(failedQualityModel.indexability, 'INDEXABLE');
  assert.match(failedQualityModel.metadata.robots, /^noindex, follow/);
  assert.equal(failedQualityModel.sitemapEligible, false);
  assert.equal(failedQualityModel.productionApproval.approved, false);

  const auditedRoutes = [];
  let verifiedResolvedDenials = 0;
  let unresolvedDefaultDenials = 0;
  for (const revoked of reconciliation.default.conflicts) {
    const { route } = revoked;
    const approval = approvals.getProductionRouteApproval(route);
    assert.equal(approval.approved, false, `${route}: stale approval cannot authorize production.`);
    assert.equal(approval.state, 'NOINDEX', `${route}: stale approval is noindex.`);
    assert.equal(
      revoked.actualModelState,
      'NOINDEX',
      `${route}: the archived reconciliation captured its original noindex state.`,
    );

    const [locationSlug, serviceSlug] = route.slice(1).split('/');
    const resolved = await geographicServicePage.resolveGeographicServicePage({
      location: locationSlug,
      service: serviceSlug,
    });
    if (resolved.notFound) {
      unresolvedDefaultDenials += 1;
      assert.equal(revokedByRoute.has(route), false, `${route}: unresolved audit identity is not persisted.`);
      assert.equal(approval.source, 'not-approved', `${route}: default closed policy applies.`);
      assert.equal(approval.recordId, undefined, `${route}: no guessed identity is retained.`);
      continue;
    }
    const productionRevocation = revokedByRoute.get(route);
    assert.ok(productionRevocation, `${route}: resolved, verified denial is durable.`);
    assert.equal(approval.source, 'verified-production-revocation');
    assert.equal(approval.recordId, productionRevocation.recordId);
    const verifiedRecordId = revoked.classification === 'resolver mismatch'
      ? revoked.approvedRecordId
      : (revoked.approvedRecordId || revoked.resolvedRecordId);
    assert.equal(productionRevocation.recordId, verifiedRecordId, `${route}: denial identity is exact.`);
    assert.equal(resolved.props.location.id, verifiedRecordId, `${route}: resolver honors the pinned identity.`);
    const model = engine.buildLocationPageModel({
      location: resolved.props.location,
      service: resolved.props.service,
      content: resolved.props.content,
      locations: resolved.props.engineLocations,
      geographicDataValidated: resolved.props.geographicDataValidated,
    });
    const worldwideEvidenceReview = productionRevocation.registry === 'world-pilot'
      && productionRevocation.reasonCode === 'INSUFFICIENT_LOCATION_EVIDENCE';
    if (worldwideEvidenceReview) {
      const indexable = model.indexability === 'INDEXABLE';
      assert.equal(model.productionApproval.approved, indexable, `${route}: only passing quality is publishable.`);
      assert.equal(model.sitemapEligible, indexable, `${route}: sitemap eligibility follows final quality.`);
      assert.equal(sitemapRouteSet.has(route), indexable, `${route}: sitemap cache matches the final model.`);
      assert.match(
        model.metadata.robots,
        indexable ? /^index, follow/ : /^noindex, follow/,
        `${route}: robots follows the final model.`,
      );
    } else {
      assert.equal(model.indexability, 'NOINDEX', `${route}: unresolved evidence/identity conflicts remain noindex.`);
      assert.equal(model.sitemapEligible, false, `${route}: denied routes cannot enter the sitemap.`);
      assert.match(model.metadata.robots, /^noindex, follow/, `${route}: denied routes remain noindex.`);
      assert.equal(model.productionApproval.approved, false, `${route}: final approval gate rejects the page.`);
    }
    verifiedResolvedDenials += 1;
    auditedRoutes.push(route);
  }
  assert.equal(verifiedResolvedDenials, 54);
  assert.equal(unresolvedDefaultDenials, 21);
  assert.equal(auditedRoutes.length + unresolvedDefaultDenials, reconciliation.default.conflicts.length);
  assert.deepEqual(
    new Set(revokedByRoute.keys()),
    new Set(auditedRoutes),
    'The production revocation policy contains only routes with verified live identities.',
  );

  const productionCandidateConflicts = candidateRegistry.PRODUCTION_LOCATION_PROMOTION_EVALUATIONS
    .filter((candidate) => candidate?.sitemapEligible === true)
    .filter((candidate) => !approvals.isProductionRouteApproved(
      `/${candidate.locationSlug}/${candidate.serviceSlug}`,
    ));
  for (const candidate of productionCandidateConflicts) {
    const route = `/${candidate.locationSlug}/${candidate.serviceSlug}`;
    assert.equal(
      approvals.getProductionRouteApproval(route).state,
      'NOINDEX',
      `${route}: candidate status cannot override the current page model and approval.`,
    );
  }

  for (const location of locationData.LOCATIONS) {
    for (const serviceSlug of location.supportedServices || []) {
      if (!location.indexable || location.testOnly === true) continue;
      const route = `/${location.slug}/${serviceSlug}`;
      const approval = approvals.getProductionRouteApproval(route);
      assert.equal(
        approval.approved,
        approvedRouteSet.has(route),
        `${route}: legacy indexable flags cannot override the authoritative approval.`,
      );
      const service = locationSeo.getServiceBySlug(serviceSlug);
      assert.equal(
        locationSeo.isLocationServiceIndexable(location, service),
        approval.approved,
        `${route}: legacy source flags do not bypass production approval.`,
      );
    }
  }

  const mumbaiRoute = '/mumbai/pilot-training';
  const mumbaiApproval = approvals.getProductionRouteApproval(mumbaiRoute);
  assert.equal(mumbaiApproval.state, 'NOINDEX');
  assert.equal(mumbaiApproval.approved, false);
  assert.equal(mumbaiApproval.sitemapEligible, false);
  assert.equal(approvedRouteSet.has(mumbaiRoute), false);
  assert.equal(locationSeo.LOCATION_SITEMAP_SLUGS.includes('mumbai'), false);

  const mumbaiResolution = await geographicServicePage.resolveGeographicServicePage({
    location: 'mumbai',
    service: 'pilot-training',
  });
  assert.equal(Boolean(mumbaiResolution.notFound), false);
  const mumbaiModel = engine.buildLocationPageModel({
    location: mumbaiResolution.props.location,
    service: mumbaiResolution.props.service,
    content: mumbaiResolution.props.content,
    locations: mumbaiResolution.props.engineLocations,
    geographicDataValidated: mumbaiResolution.props.geographicDataValidated,
  });
  assert.equal(mumbaiModel.canRender, true);
  assert.equal(mumbaiModel.supportStatus, 'SUPPORTED');
  assert.equal(mumbaiModel.indexability, 'NOINDEX');
  assert.equal(mumbaiModel.sitemapEligible, false);
  assert.match(mumbaiModel.metadata.robots, /^noindex, follow/);
  assert.equal(mumbaiModel.metadata.canonical, `https://weoneaviation.in${mumbaiRoute}`);

  const srinagarCandidateId = 'geo:geonames:IN:1255634';
  const srinagarAliasId = 'geo:geonames:IN:1465843';
  const candidateRecord = await indiaRegistry.resolveIndiaGeographicLocation(srinagarCandidateId);
  const aliasRecord = await indiaRegistry.resolveIndiaGeographicLocation(srinagarAliasId);
  assert.equal(candidateRecord.location.name, 'Srinagar');
  assert.equal(candidateRecord.location.state, 'Jammu and Kashmir');
  assert.equal(aliasRecord.location.name, 'Srinagar');
  assert.equal(aliasRecord.location.state, 'Tamil Nadu');
  assert.equal(aliasRecord.location.district, 'Chennai');
  assert.notEqual(candidateRecord.location.id, aliasRecord.location.id);
  assert.notEqual(candidateRecord.location.latitude, aliasRecord.location.latitude);

  const srinagarRoutes = reconciliation.default.conflicts
    .filter(({ route }) => route.startsWith('/srinagar/'));
  assert.equal(srinagarRoutes.length, 4);
  for (const decision of srinagarRoutes) {
    assert.equal(decision.approvedRecordId, srinagarCandidateId);
    assert.equal(decision.resolvedRecordId, srinagarAliasId);
    assert.equal(decision.classification, 'resolver mismatch');
    assert.equal(approvals.getProductionRouteApproval(decision.route).recordId, srinagarCandidateId);
    const [location, service] = decision.route.slice(1).split('/');
    const resolved = await geographicServicePage.resolveGeographicServicePage({ location, service });
    assert.equal(Boolean(resolved.notFound), false, `${decision.route}: the intended Srinagar record resolves.`);
    assert.equal(resolved.props.location.id, srinagarCandidateId);
    assert.equal(resolved.props.location.state, 'Jammu and Kashmir');
    const model = engine.buildLocationPageModel({
      location: resolved.props.location,
      service: resolved.props.service,
      content: resolved.props.content,
      locations: resolved.props.engineLocations,
      geographicDataValidated: resolved.props.geographicDataValidated,
    });
    assert.equal(model.supportStatus, 'SUPPORTED');
    assert.equal(model.indexability, 'NOINDEX');
    assert.equal(model.sitemapEligible, false);
    assert.equal(approvals.isProductionRouteApproved(decision.route), false);
  }

  const duplicateNameCases = [
    { slug: 'hyderabad', expectedCountry: 'India', expectedId: 'geo:geonames:IN:1269843', render: true },
    { slug: 'lucknow', expectedCountry: 'India', expectedId: 'geo:geonames:IN:1264733', render: true },
    { slug: 'mumbai', expectedCountry: 'India', render: true },
    { slug: 'delhi', expectedCountry: 'India', render: true },
    { slug: 'dwarka', expectedCountry: 'India', render: true },
    { slug: 'bengaluru', expectedCountry: 'India', render: true },
    { slug: 'new-york-city', expectedCountry: 'United States', render: true },
    { slug: 'new-york', render: false },
    { slug: 'andheri', render: false },
    { slug: 'gtb-nagar', render: false },
    { slug: 'springfield', render: false },
    { slug: 'cambridge', render: false },
  ];
  for (const testCase of duplicateNameCases) {
    const resolved = await geographicServicePage.resolveGeographicServicePage({
      location: testCase.slug,
      service: 'pilot-training',
    });
    assert.equal(
      Boolean(resolved.notFound),
      !testCase.render,
      `/${testCase.slug}/pilot-training has deterministic resolution.`,
    );
    if (testCase.render) {
      assert.equal(resolved.props.location.country, testCase.expectedCountry);
      if (testCase.expectedId) assert.equal(resolved.props.location.id, testCase.expectedId);
    }
  }

  console.log(JSON.stringify({
    authoritativeProductionRoutes: approvedRoutes.length,
    currentModelIndexableRoutes: approvedRoutes.length,
    auditedSnapshotRoutes: reconciliation.default.conflicts.length,
    verifiedProductionRevocations: verifiedResolvedDenials,
    unresolvedDefaultDenials,
    classificationCounts: reconciliation.default.classificationCounts,
    evidenceTierCounts: reconciliation.default.evidenceTierCounts,
    staleCandidateReportOverrides: productionCandidateConflicts.length,
    resolverIdentityConflicts: 0,
    approvalSitemapConflicts: 0,
    unsupportedClaims,
    mumbai: {
      supported: mumbaiModel.supportStatus === 'SUPPORTED',
      renderable: mumbaiModel.canRender,
      indexability: mumbaiModel.indexability,
      sitemapEligible: mumbaiModel.sitemapEligible,
    },
    srinagar: {
      candidateId: srinagarCandidateId,
      resolverAliasId: srinagarAliasId,
      sameEntity: false,
      routeDecision: 'REVOKED; pinned to the intended record and remains SUPPORTED + NOINDEX',
    },
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
