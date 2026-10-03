const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');

async function main() {
  const [
    engine,
    locationSeo,
    servicesData,
    differentiation,
    indexabilityPolicy,
    globalGeography,
    aviationEvidence,
    productionCandidateRegistry,
    indiaValidation,
  ] = await Promise.all([
    import('../lib/locationEngine.js'),
    import('../lib/locationSeo.js'),
    import('../data/location-seo/services.js'),
    import('../lib/locationContentDifferentiation.js'),
    import('../data/location-seo/geographic-indexability-policy.js'),
    import('../data/location-seo/geography/global-pilot.js'),
    import('../data/location-seo/aviation-evidence.js'),
    import('../data/location-seo/production-candidate-registry.js'),
    import('../data/location-seo/india-deep-validation.js'),
  ]);

  const {
    LOCATIONS,
    LOCATION_SITEMAP_SLUGS,
  } = await import('../data/location-seo/locations.js');
  const { SERVICES } = servicesData;
  const { GEOGRAPHIC_INDEXABILITY_POLICY } = indexabilityPolicy;
  const { INDIA_DEEP_VALIDATION } = indiaValidation;
  const locationsBySlug = new Set(LOCATIONS.map(({ slug }) => slug));
  const dataErrors = locationSeo.validateLocationServiceData();
  assert.deepEqual(dataErrors, [], `Invalid production location data:\n${dataErrors.join('\n')}`);

  const geographicErrors = engine.validateGeographicNodes(globalGeography.GLOBAL_GEOGRAPHIC_PILOT.records);
  assert.deepEqual(geographicErrors, [], `Invalid global pilot geography:\n${geographicErrors.join('\n')}`);
  const evidenceErrors = aviationEvidence.validateAviationEvidence(
    aviationEvidence.AVIATION_EVIDENCE_RECORDS,
    globalGeography.GLOBAL_GEOGRAPHIC_PILOT.records,
  );
  assert.deepEqual(evidenceErrors, [], `Invalid aviation evidence:\n${evidenceErrors.join('\n')}`);

  const indexablePairs = locationSeo.getIndexableLocationServicePairs();
  const approvedPairs = locationSeo.getApprovedLocationServicePairs();
  const approvedRoutes = new Set(approvedPairs.map(({ location, service }) => (
    `/${location.slug}/${service.slug}`
  )));
  const explicitSitemapSlugs = new Set(LOCATION_SITEMAP_SLUGS);
  const promotedRoutes = new Set(
    productionCandidateRegistry.PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS
      .map(({ location, service }) => `/${location.slug}/${service.slug}`),
  );
  const differentiationExemptRoutes = new Set(
    GEOGRAPHIC_INDEXABILITY_POLICY.existingDifferentiationExemptRoutes,
  );
  const postalSlugs = new Set(globalGeography.GLOBAL_GEOGRAPHIC_PILOT.records
    .filter(({ type }) => type === 'postal-area')
    .map(({ slug }) => slug));
  const productionSources = [
    path.join(rootDir, 'lib', 'locationSeo.js'),
    path.join(rootDir, 'pages', '[location]', '[service].jsx'),
    path.join(rootDir, 'scripts', 'generate-sitemap.js'),
  ];

  let productionSourcesImportTestFixtures = false;
  for (const filePath of productionSources) {
    const source = fs.readFileSync(filePath, 'utf8');
    productionSourcesImportTestFixtures ||= /india-deep-validation|geography\/real-sample|scale-test-fixtures/.test(source);
    assert.doesNotMatch(
      source,
      /india-deep-validation|geography\/real-sample|scale-test-fixtures/,
      `${path.relative(rootDir, filePath)} must not import research or performance fixture data.`,
    );
  }
  assert.ok(
    LOCATIONS.every(({ slug }) => !postalSlugs.has(slug)),
    'Postal-area records must not be represented as production route locations.',
  );
  assert.ok(
    [...approvedRoutes].every((route) => !/(?:^|\/)(?:pin|postal|pincode)|(?:^|\/)\d{5,6}(?:\/|$)/i.test(route)),
    'Postal/PIN slugs must not be approved production routes.',
  );

  for (const route of differentiationExemptRoutes) {
    assert.ok(approvedRoutes.has(route), `Grandfathered production route was removed: ${route}`);
  }

  const pageEntries = indexablePairs.map(({ location, service }) => {
    const content = locationSeo.getLocationServiceContent(location, service);
    const engineContext = locationSeo.getLocationEngineContext(location);
    const hierarchy = engine.resolveLocationHierarchy(location, engineContext.locations) || [];
    assert.ok(
      hierarchy.some(({ type }) => type === 'country')
        && hierarchy.some(({ type }) => ['city', 'locality'].includes(type)),
      `${location.slug}/${service.slug} has no resolvable country-to-place hierarchy.`,
    );

    const model = engine.buildLocationPageModel({
      location,
      service,
      content,
      ...engineContext,
    });
    const sections = (location.localSections || []).map((section) => ({
      title: section.title,
      body: [
        section.body,
        section.closing,
        ...(section.items || []).flatMap(({ label, detail }) => [label, detail]),
      ].filter(Boolean).join(' '),
      verified: true,
    }));
    const snapshot = differentiation.buildLocationContentSnapshot({
      location,
      hierarchy,
      model,
      sections,
    });

    return { location, service, content, hierarchy, model, snapshot };
  });

  let differentiatedNewPairs = 0;
  for (const entry of pageEntries) {
    const { location, service, content, hierarchy, model } = entry;
    const route = `/${location.slug}/${service.slug}`;
    const isDifferentiationExempt = differentiationExemptRoutes.has(route);
    const assessment = isDifferentiationExempt
      ? null
      : differentiation.assessContentDifferentiation({
        candidate: entry.snapshot,
        comparisons: pageEntries
          .filter((other) => other !== entry && other.service.slug === service.slug)
          .map(({ snapshot }) => snapshot),
      });

    const qualifiedModel = assessment
      ? engine.buildLocationPageModel({
        location,
        service,
        content,
        contentDifferentiation: assessment,
        ...locationSeo.getLocationEngineContext(location),
      })
      : model;

    assert.equal(
      qualifiedModel.indexability,
      'INDEXABLE',
      `${route} is flagged indexable in data but failed the complete quality pipeline: ${qualifiedModel.indexabilityPipeline?.reason || 'indexability model rejected it.'}`,
    );
    if (promotedRoutes.has(route)) {
      const profile = content.localAviationProfile;
      for (const field of [
        'locationOverview',
        'aviationEcosystem',
        'flightTrainingInfrastructure',
        'pilotTrainingPathway',
        'licenceContext',
        'medicalRequirements',
        'examContext',
        'localTrainingConsiderations',
        'weOneRelationship',
        'nextSteps',
      ]) {
        assert.ok(profile[field], `${route} is missing ${field}.`);
      }
      assert.ok(profile.majorAirports.length + profile.aerodromes.length > 0);
      assert.ok(profile.aviationOrganizations);
      assert.ok(profile.aviationAuthority.authority);
      assert.equal(profile.aviationAuthority.authority, qualifiedModel.regulatoryContext.authority);
      assert.equal(profile.weOneRelationship, content.relationshipStatement);
      assert.ok(profile.sourceReferences.length >= 2);
      assert.ok(content.faqs.length >= 2);
      assert.ok(content.internalLinks.length >= 2);
      assert.deepEqual(qualifiedModel.unsupportedClaims, []);
      assert.equal(qualifiedModel.productionSitemapEligible, true);
    }

    if (!isDifferentiationExempt) {
      differentiatedNewPairs += 1;
      assert.equal(
        assessment.status,
        'PASSED',
        `${route} does not pass content differentiation: ${assessment.reasons.join(' ')}`,
      );
      assert.ok(
        qualifiedModel.regulatoryContext?.authority,
        `${route} has no resolved regulatory context.`,
      );
      assert.deepEqual(
        qualifiedModel.unsupportedClaims,
        [],
        `${route} contains unsupported business claims.`,
      );
    }

    if (approvedRoutes.has(route)) {
      assert.ok(
        explicitSitemapSlugs.has(location.slug) || promotedRoutes.has(route),
        `${route} is approved without an explicit location sitemap allowlist entry.`,
      );
      assert.equal(
        qualifiedModel.productionSitemapEligible,
        true,
        `${route} is approved for the sitemap but did not pass the complete sitemap policy.`,
      );
    } else {
      assert.equal(
        qualifiedModel.productionSitemapEligible,
        false,
        `${route} is not allowlisted but became sitemap eligible.`,
      );
    }
  }

  const indiaCandidates = INDIA_DEEP_VALIDATION;
  const internationalCandidates = locationSeo.INTERNATIONAL_LOCATION_CANDIDATES;
  const candidateStatusCounts = { SUPPORTED: 0, RESEARCH_ONLY: 0, REJECTED: 0 };
  const candidateCombinations = [];

  for (const candidate of [...indiaCandidates, ...internationalCandidates]) {
    assert.equal(candidate.indexable, false, `${candidate.slug} research data must remain non-indexable.`);
    assert.deepEqual(candidate.supportedServices || [], [], `${candidate.slug} cannot declare production services.`);
    assert.equal(locationsBySlug.has(candidate.slug), false, `${candidate.slug} must be explicitly migrated before production use.`);
    if (!promotedRoutes.has(`/${candidate.slug}/pilot-training`)) {
      assert.ok(
        ![...approvedRoutes].some((route) => route.startsWith(`/${candidate.slug}/`)),
        `${candidate.slug} research data entered the approved production routes.`,
      );
    }

    for (const service of SERVICES) {
      const indiaKey = {
        'pilot-training': 'pilotTraining',
        'dgca-ground-classes': 'dgcaGroundClasses',
        'commercial-pilot-training': 'commercialPilotTraining',
        'cpl-training': 'cplTraining',
      }[service.slug];
      let status;
      if (candidate.serviceMatrix) {
        status = service.slug === 'pilot-school'
          ? 'REJECTED'
          : candidate.serviceMatrix[indiaKey];
        assert.ok(status, `${candidate.slug} has no research status for ${service.slug}.`);
      } else {
        assert.ok(
          candidate.rejectedServices?.[service.slug],
          `${candidate.slug} has no explicit decision for ${service.slug}.`,
        );
        status = 'REJECTED';
      }
      assert.ok(
        Object.hasOwn(candidateStatusCounts, status),
        `${candidate.slug}/${service.slug} has unknown research status "${status}".`,
      );
      assert.notEqual(
        status,
        'SUPPORTED',
        `${candidate.slug}/${service.slug} must be migrated through production quality gates before approval.`,
      );
      candidateStatusCounts[status] += 1;
      candidateCombinations.push({ location: candidate.slug, service: service.slug, status });
    }
  }

  assert.equal(
    candidateCombinations.length,
    (indiaCandidates.length + internationalCandidates.length) * SERVICES.length,
  );
  const globalEvaluationStatusCounts = productionCandidateRegistry.GLOBAL_LOCATION_SERVICE_EVALUATIONS
    .reduce((counts, result) => {
      counts[result.status] = (counts[result.status] || 0) + 1;
      return counts;
    }, {});
  assert.ok(
    productionCandidateRegistry.PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS.length > 0,
    'Evidence-backed informational candidates should promote when every quality gate passes.',
  );
  assert.ok(
    productionCandidateRegistry.PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS.length <= 30,
    'The first production batch must remain controlled.',
  );
  assert.ok(
    productionCandidateRegistry.PRODUCTION_LOCATION_PROMOTION_EVALUATIONS
      .filter(({ status }) => status === 'SUPPORTED')
      .every(({ relationship }) => relationship === 'informational'),
    'The pilot must not imply unverified local service delivery.',
  );
  assert.equal(
    productionCandidateRegistry.GLOBAL_LOCATION_SERVICE_EVALUATIONS
      .filter(({ status }) => status === 'SUPPORTED').length,
    0,
    'Unreviewed evaluation candidates must not bypass the separate relationship gate.',
  );

  console.log(JSON.stringify({
    production: {
      validatedLocations: LOCATIONS.length,
      serviceIntents: SERVICES.length,
      indexableCombinations: indexablePairs.length,
      approvedProductionRoutes: approvedRoutes.size,
      newlyPromotedCombinations: promotedRoutes.size,
      differentiatedNewCombinations: differentiatedNewPairs,
      unchangedGrandfatheredRoutes: differentiationExemptRoutes.size,
    },
    productionPilot: {
      evaluatedCandidates: productionCandidateRegistry.PRODUCTION_LOCATION_PROMOTION_EVALUATIONS.length,
      promoted: productionCandidateRegistry.PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS
        .map(({ location, service }) => `${location.slug}/${service.slug}`),
      statusCounts: productionCandidateRegistry.PRODUCTION_LOCATION_PROMOTION_EVALUATIONS
        .reduce((counts, result) => {
          counts[result.status] = (counts[result.status] || 0) + 1;
          return counts;
        }, {}),
      failedCandidateReasons: productionCandidateRegistry.PRODUCTION_LOCATION_PROMOTION_EVALUATIONS
        .filter(({ status }) => status !== 'SUPPORTED')
        .map(({ locationSlug, reason, differentiation }) => ({
          locationSlug,
          reason,
          maxSimilarityPercent: differentiation?.normalizedSimilarityPercent ?? null,
        })),
    },
    expansionReview: {
      sourcedIndiaCandidates: indiaCandidates.length,
      internationalCandidates: internationalCandidates.length,
      evaluatedLocationServiceCombinations: candidateCombinations.length,
      statuses: candidateStatusCounts,
      promotedCombinations: candidateStatusCounts.SUPPORTED,
    },
    globalPilot: {
      geographicRecords: globalGeography.GLOBAL_GEOGRAPHIC_PILOT.records.length,
      countries: new Set(globalGeography.GLOBAL_GEOGRAPHIC_PILOT.records.map(({ country }) => country)).size,
      aviationEvidenceRecords: aviationEvidence.AVIATION_EVIDENCE_RECORDS.length,
      evaluatedLocationServiceCombinations:
        productionCandidateRegistry.GLOBAL_LOCATION_SERVICE_EVALUATIONS.length,
      statuses: globalEvaluationStatusCounts,
      automaticallyPromotedCombinations:
        productionCandidateRegistry.PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS.length,
    },
    geography: {
      sourcedReferenceRecords: globalGeography.GLOBAL_GEOGRAPHIC_PILOT.records.length,
      productionSourcesImportTestFixtures,
      postalAreasApprovedForRoutes: [...approvedRoutes].some((route) => (
        postalSlugs.has(route.split('/')[1])
      )),
    },
  }, null, 2));
}

main().catch((error) => {
  console.error(`validate-location-expansion: ${error.stack || error.message}`);
  process.exitCode = 1;
});
