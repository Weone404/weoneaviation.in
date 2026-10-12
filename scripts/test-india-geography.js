const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');

const rootDir = path.resolve(__dirname, '..');
const requiredIntents = [
  'pilot-training',
  'dgca-ground-classes',
  'commercial-pilot-training',
  'cpl-training',
];
const delhiLocalities = [
  ['Laxmi Nagar', 'neighborhood'],
  ['GTB Nagar', null],
  ['Rohini', 'locality'],
  ['Janakpuri', 'populated-place'],
  ['Karol Bagh', 'neighborhood'],
  ['Pitampura', 'populated-place'],
  ['Rajouri Garden', 'subdistrict'],
  ['Saket', 'neighborhood'],
  ['Vasant Kunj', 'neighborhood'],
  ['Mayur Vihar', 'subdistrict'],
  ['Shahdara', 'neighborhood'],
];
const exampleCities = [
  ['Noida', 'Uttar Pradesh', 'populated-place'],
  ['Ghaziabad', 'Uttar Pradesh', 'city'],
  ['Gurugram', 'Haryana', 'city'],
  ['Faridabad', 'Haryana', 'city'],
  ['Pune', 'Maharashtra', 'populated-place'],
  ['Mumbai', 'Maharashtra', 'city'],
  ['Nagpur', 'Maharashtra', 'city'],
  ['Lucknow', 'Uttar Pradesh', 'city'],
  ['Kanpur', 'Uttar Pradesh', 'populated-place', 'Kanpur'],
  ['Varanasi', 'Uttar Pradesh', 'populated-place'],
  ['Jaipur', 'Rajasthan', 'city'],
  ['Ahmedabad', 'Gujarat', 'populated-place'],
  ['Hyderabad', 'Telangana', 'city'],
  ['Bengaluru', 'Karnataka', 'city'],
  ['Chennai', 'Tamil Nadu', 'city'],
  ['Kolkata', 'West Bengal', 'city'],
];

function normalize(value) {
  return String(value || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function countBy(records, getKey) {
  return records.reduce((counts, record) => {
    const key = getKey(record);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function sampleByType(records, count) {
  const groups = new Map();
  for (const record of records) {
    const group = groups.get(record.type) || [];
    group.push(record);
    groups.set(record.type, group);
  }
  const types = [...groups.keys()];
  const sampled = [];
  let cursor = 0;
  while (sampled.length < count) {
    let added = false;
    for (const type of types) {
      const group = groups.get(type);
      if (cursor < group.length && sampled.length < count) {
        sampled.push(group[cursor]);
        added = true;
      }
    }
    if (!added) throw new Error(`Unable to select ${count} distinct geography records.`);
    cursor += 1;
  }
  return sampled;
}

function resolveStatus(reference, records, options) {
  try {
    const location = recordsApi.resolveGeographicRecord(reference, records, options);
    return location ? { status: 'RESOLVED', location } : { status: 'NOT_FOUND', location: null };
  } catch (error) {
    if (/is ambiguous/.test(error.message)) return { status: 'AMBIGUOUS', location: null };
    throw error;
  }
}

let recordsApi;

async function main() {
  const [
    registryApi,
    geographicData,
    engine,
    servicesModule,
    locationSeo,
  ] = await Promise.all([
    import('../lib/indiaGeographicRegistry.js'),
    import('../lib/geographicData.js'),
    import('../lib/locationEngine.js'),
    import('../data/location-seo/services.js'),
    import('../lib/locationSeo.js'),
  ]);
  recordsApi = geographicData;
  const registry = await registryApi.loadIndiaGeographicRegistry();
  const { records } = registry;
  assert.equal(registry.datasetKind, 'sourced-india-geographic-reference');
  assert.equal(registry.resolutionOnly, true);
  assert.equal(registry.complete, true);
  assert.equal(records.length, registry.recordCount);

  assert.equal(registry.validationErrors, 0);
  const ids = new Set();
  const invalidRecords = [];
  const aliasIndex = new Map();
  for (const record of records) {
    if (!record.id || !record.slug || !record.canonicalName || !record.name
      || !record.type || !record.country || !record.source
      || !record.sourceUrl || !record.sourceDate && !record.sourceLinks?.length
      || !record.confidence || (record.type !== 'country' && !record.parentId)
      || !Array.isArray(record.aliases)) {
      invalidRecords.push(record.id || record.name || '<missing id/name>');
    }
    if (ids.has(record.id)) invalidRecords.push(`duplicate:${record.id}`);
    ids.add(record.id);
    for (const name of [record.name, ...record.aliases]) {
      const key = normalize(name);
      if (!key) continue;
      const matches = aliasIndex.get(key) || new Set();
      matches.add(record.id);
      aliasIndex.set(key, matches);
    }
    assert.equal(record.relationship, 'research-only');
    assert.equal(record.renderable, false);
    assert.equal(record.indexable, false);
    assert.equal(record.sitemapEligible, false);
  }
  assert.deepEqual(invalidRecords, []);
  let fullResolutionCount = 0;
  let fullHierarchyCount = 0;
  for (const record of records) {
    if (geographicData.resolveGeographicRecord(record.id, records) === record) {
      fullResolutionCount += 1;
    }
    const hierarchy = geographicData.resolveHierarchy(record, records);
    if (hierarchy?.at(-1) === record
      && hierarchy[0]?.type === 'country'
      && (record.type === 'country' || hierarchy.some(({ type }) => type === 'state'))) {
      fullHierarchyCount += 1;
    }
  }
  assert.equal(fullResolutionCount, records.length);
  assert.equal(fullHierarchyCount, records.length);

  const aliasKeyCount = aliasIndex.size;
  const ambiguousAliasCount = [...aliasIndex.values()].filter((idsForName) => (
    idsForName.size > 1
  )).length;
  const states = records.filter(({ type }) => type === 'state');
  const districts = records.filter(({ type }) => type === 'district');
  const populatedPlaceStateCoverage = new Set(
    records
      .filter(({ type, state }) => (
        ['city', 'town', 'village', 'populated-place', 'locality', 'neighborhood'].includes(type)
        && state
      ))
      .map(({ state }) => normalize(state)),
  );
  const stateNames = new Set(states.map(({ name }) => normalize(name)));
  const districtsByState = new Set(
    districts.map(({ state }) => normalize(state)).filter(Boolean),
  );
  const typeCounts = countBy(records, ({ type }) => type);
  const services = requiredIntents.map((slug) => {
    const service = servicesModule.SERVICES.find((entry) => entry.slug === slug);
    assert.ok(service, `Missing configured aviation intent: ${slug}`);
    return service;
  });
  const intentMatrixStatuses = {
    SUPPORTED: 0,
    RENDERABLE: 0,
    INDEXABLE: 0,
    RESEARCH: 0,
    REJECTED: 0,
  };
  for (const record of records) {
    for (const service of services) {
      let status;
      if (record.relationship === 'research-only') {
        status = 'RESEARCH';
      } else if (!record.supportedServices?.includes(service.slug)
        || !record.serviceContent?.[service.slug]) {
        status = 'REJECTED';
      } else if (record.renderable !== true) {
        status = 'RESEARCH';
      } else if (record.indexable === true && service.indexable === true) {
        status = 'INDEXABLE';
      } else if (record.renderable === true) {
        status = 'RENDERABLE';
      } else {
        status = 'SUPPORTED';
      }
      intentMatrixStatuses[status] += 1;
    }
  }
  assert.equal(
    Object.values(intentMatrixStatuses).reduce((total, count) => total + count, 0),
    records.length * services.length,
  );

  const requestedLocations = [];
  for (const [name, type] of delhiLocalities) {
    const result = resolveStatus(name, records, { country: 'India', state: 'Delhi', type });
    requestedLocations.push({
      name,
      expectedRegion: 'Delhi',
      status: result.status,
      type: result.location?.type || null,
      source: result.location?.source || null,
    });
  }
  for (const [name, state, type, district] of exampleCities) {
    const result = resolveStatus(name, records, {
      country: 'India',
      state,
      type,
      district,
    });
    requestedLocations.push({
      name,
      expectedRegion: state,
      status: result.status,
      type: result.location?.type || null,
      source: result.location?.source || null,
    });
  }
  assert.deepEqual(
    requestedLocations
      .filter(({ name, status }) => (
        name === 'GTB Nagar' ? status !== 'NOT_FOUND' : status !== 'RESOLVED'
      ))
      .map(({ name, status }) => ({ name, status })),
    [],
  );
  const ambiguousPostalCodes = registry.coverage.ambiguousPostalCodes;
  const postalAreaRecords = records.filter(({ type }) => type === 'postal-area');
  assert.equal(postalAreaRecords.length, registry.coverage.unambiguousPostalAreas);

  const scaleResults = [];
  for (const count of [1000, 5000, 10000]) {
    const sample = sampleByType(records, count);
    const started = performance.now();
    const seenTypes = new Set();
    let resolved = 0;
    let hierarchyValid = 0;
    let supported = 0;
    let renderable = 0;
    let indexable = 0;
    let research = 0;
    let rejected = 0;
    let modelsGenerated = 0;
    let serviceCompatibilityBlocked = 0;
    let contentDifferentiationNotReached = 0;
    let aliasesChecked = 0;
    let ambiguousAliases = 0;
    let canonicalAliasPrecedence = 0;
    let metadataValid = true;

    for (const record of sample) {
      const found = geographicData.resolveGeographicRecord(record.id, records);
      if (found === record) resolved += 1;
      const hierarchy = geographicData.resolveHierarchy(record, records);
      if (hierarchy?.at(-1) === record
        && hierarchy[0]?.type === 'country'
        && (record.type === 'country' || hierarchy.some(({ type }) => type === 'state'))) {
        hierarchyValid += 1;
      }
      seenTypes.add(record.type);
      for (const alias of new Set([record.name, ...record.aliases])) {
        const aliasResult = resolveStatus(alias, records, {
          country: record.country,
          parentId: record.parentId,
          type: record.type,
        });
        aliasesChecked += 1;
        if (aliasResult.status === 'AMBIGUOUS') {
          ambiguousAliases += 1;
        } else if (aliasResult.status === 'RESOLVED'
          && aliasResult.location?.id !== record.id
          && normalize(alias) === normalize(aliasResult.location.name)) {
          canonicalAliasPrecedence += 1;
        } else if (aliasResult.status !== 'RESOLVED'
          || aliasResult.location?.id !== record.id) {
          throw new Error(
            `Alias "${alias}" for ${record.id} resolved incorrectly: ${aliasResult.status}.`,
          );
        }
      }

      for (const service of services) {
        const model = engine.buildLocationPageModel({
          location: record,
          service,
          locations: records,
          geographicDataValidated: true,
        });
        modelsGenerated += 1;
        if (model.supportStatus === 'SUPPORTED') supported += 1;
        if (model.canRender) renderable += 1;
        if (model.indexability === 'INDEXABLE') indexable += 1;
        const pipelineStages = model.indexabilityPipeline?.stages || [];
        const serviceCompatibilityStage = pipelineStages.find(({ name }) => (
          name === 'service-compatible'
        ));
        if (record.type === 'country') {
          assert.equal(
            serviceCompatibilityStage,
            undefined,
            `${record.id}/${service.slug}: country-level models fail an earlier hierarchy gate.`,
          );
        } else {
          assert.ok(serviceCompatibilityStage, `${record.id}/${service.slug}: compatibility gate is evaluated.`);
          assert.equal(serviceCompatibilityStage.passed, false);
          serviceCompatibilityBlocked += 1;
        }
        if (!pipelineStages.some(({ name }) => name === 'content-differentiation')) {
          contentDifferentiationNotReached += 1;
        }
        if (record.relationship === 'research-only') research += 1;
        else if (model.supportStatus !== 'SUPPORTED') rejected += 1;
        metadataValid = metadataValid
          && model.metadata.canonical === `https://weoneaviation.in/${record.slug}/${service.slug}`
          && model.metadata.robots.includes('noindex')
          && !model.productionSitemapEligible
          && model.indexability !== 'INDEXABLE'
          && model.relationship === 'research-only';
      }
    }
    const elapsedMs = Number((performance.now() - started).toFixed(2));
    assert.equal(resolved, count);
    assert.equal(hierarchyValid, count);
    assert.equal(supported, 0);
    assert.equal(renderable, 0);
    assert.equal(indexable, 0);
    assert.equal(research, count * services.length);
    assert.equal(rejected, 0);
    assert.equal(modelsGenerated, count * services.length);
    const countryLevelModels = sample.filter(({ type }) => type === 'country').length * services.length;
    assert.equal(serviceCompatibilityBlocked, modelsGenerated - countryLevelModels);
    assert.equal(contentDifferentiationNotReached, modelsGenerated);
    assert.equal(metadataValid, true);
    scaleResults.push({
      records: count,
      geographicTypesCovered: [...seenTypes].sort(),
      resolved,
      hierarchyValid,
      aliasesChecked,
      ambiguousAliases,
      canonicalAliasPrecedence,
      intentCombinations: modelsGenerated,
      supported,
      renderable,
      indexable,
      serviceCompatibilityBlocked,
      contentDifferentiationNotReached,
      research,
      rejected,
      metadataCanonicalRobotsRelationshipAndSitemapChecksPassed: metadataValid,
      elapsedMs,
    });
  }

  const generatedSitemapPath = path.join(rootDir, '.generated-sitemap.xml');
  const sitemap = fs.readFileSync(generatedSitemapPath, 'utf8');
  const sitemapCount = (sitemap.match(/<url>/g) || []).length;
  const productionRoutes = locationSeo.getIndexableLocationServiceRoutes();
  const registrySlugs = new Set(records.map(({ slug }) => slug));
  const registryRoutesInSitemap = [...registrySlugs].filter((slug) => (
    sitemap.includes(`/${slug}/`)
  ));
  const generatedPageModels = scaleResults.reduce(
    (total, result) => total + result.intentCombinations,
    0,
  );
  assert.equal(registryRoutesInSitemap.length, 0);
  assert.equal(records.some(({ relationship, renderable, indexable, sitemapEligible }) => (
    relationship !== 'research-only'
      || renderable !== false
      || indexable !== false
      || sitemapEligible !== false
  )), false);

  const report = {
    dataset: {
      totalRecords: records.length,
      resolved: fullResolutionCount,
      hierarchyValid: fullHierarchyCount,
      ambiguousAliasKeys: ambiguousAliasCount,
      invalid: invalidRecords.length,
      geographicTypes: typeCounts,
      statesAndUnionTerritories: states.length,
      districtCount: districts.length,
      statesWithPopulatedPlaces: populatedPlaceStateCoverage.size,
      statesWithDistricts: districtsByState.size,
      aliases: aliasKeyCount,
      postalAreas: postalAreaRecords.length,
      ambiguousPostalCodes,
      sourceCoverage: registry.coverage,
      registryValidationErrors: registry.validationErrors,
    },
    intentMatrix: {
      intents: requiredIntents,
      totalRecordsTimesIntents: records.length * services.length,
      statuses: intentMatrixStatuses,
      reason: 'All imported records are explicitly research-only, non-renderable, non-indexable, and have no aviation offer/content mapping.',
    },
    requestedLocationResolution: requestedLocations,
    scaleTests: scaleResults,
    productionSafety: {
      registryRoutesInProductionSitemap: registryRoutesInSitemap.length,
      generatedSitemapUrlCount: sitemapCount,
      registryRecordsAddedToIndexableProductionRoutes: productionRoutes.some((route) => (
        registrySlugs.has(route.split('/')[1])
      )),
      generatedPageModels,
      renderablePageModels: scaleResults.reduce(
        (total, result) => total + result.renderable,
        0,
      ),
      indexablePageModels: scaleResults.reduce(
        (total, result) => total + result.indexable,
        0,
      ),
      duplicateContent: {
        comparedPageBodies: 0,
        maximumNormalizedSimilarity: null,
        reason: 'No geographic page model was renderable, so no candidate page body exists to compare.',
      },
      unsupportedLocalPresenceClaims: records.filter((record) => (
        record.physicalAcademy === true || record.physicalPresence?.verified === true
      )).length,
      falsePhysicalPresenceClaims: records.filter((record) => (
        record.relationship === 'physical'
        && record.physicalAcademy !== true
        && record.physicalPresence?.verified !== true
      )).length,
      jsxTemplatesCreated: 0,
      locationSpecificJsxFilesCreated: 0,
    },
  };

  assert.equal(report.productionSafety.registryRecordsAddedToIndexableProductionRoutes, false);
  assert.equal(report.productionSafety.unsupportedLocalPresenceClaims, 0);
  assert.equal(report.productionSafety.falsePhysicalPresenceClaims, 0);
  assert.equal(
    report.productionSafety.generatedPageModels,
    [1000, 5000, 10000].reduce((total, count) => total + count * services.length, 0),
  );
  assert.equal(report.productionSafety.renderablePageModels, 0);
  assert.equal(report.productionSafety.indexablePageModels, 0);
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
