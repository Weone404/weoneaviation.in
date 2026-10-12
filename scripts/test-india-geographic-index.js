import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import {
  resolveIndiaGeographicLocation,
  resolveIndiaGeographicRoute,
} from '../lib/indiaGeographicRegistry.js';

function validHierarchy(location, hierarchy) {
  return Array.isArray(hierarchy)
    && hierarchy.length > 1
    && hierarchy[0]?.type === 'country'
    && hierarchy.at(-1)?.id === location.id
    && hierarchy.some(({ type }) => type === 'state');
}

async function main() {
  const memoryBefore = process.memoryUsage();
  const started = performance.now();

  const laxmiNagar = await resolveIndiaGeographicRoute('laxmi-nagar');
  assert.equal(laxmiNagar.location?.name, 'Laxmi Nagar');
  assert.equal(laxmiNagar.location?.type, 'neighborhood');
  assert.equal(laxmiNagar.registry.recordCount, 574432);
  assert.ok(validHierarchy(laxmiNagar.location, laxmiNagar.hierarchy));
  assert.ok(laxmiNagar.location.sourceLinks.length > 0);

  const mumbai = await resolveIndiaGeographicLocation('Mumbai', {
    state: 'Maharashtra',
    type: 'city',
  });
  assert.equal(mumbai.location?.name, 'Mumbai');
  assert.ok(validHierarchy(mumbai.location, mumbai.hierarchy));

  const missing = await resolveIndiaGeographicRoute('this-location-does-not-exist');
  assert.equal(missing.location, null);

  let gtbNagarAmbiguous = false;
  try {
    const gtbNagar = await resolveIndiaGeographicRoute('gtb-nagar');
    assert.equal(gtbNagar.location, null, 'An unresolved locality must not be guessed.');
  } catch (error) {
    assert.match(error.message, /Geographic alias "gtb-nagar" is ambiguous/);
    gtbNagarAmbiguous = true;
  }

  await assert.rejects(
    resolveIndiaGeographicRoute('rampur'),
    /Geographic alias "rampur" is ambiguous/,
  );

  const durationMs = performance.now() - started;
  const memoryAfter = process.memoryUsage();
  const heapGrowthBytes = Math.max(0, memoryAfter.heapUsed - memoryBefore.heapUsed);
  const residentGrowthBytes = Math.max(0, memoryAfter.rss - memoryBefore.rss);
  assert.ok(
    heapGrowthBytes < 100 * 1024 * 1024,
    `Indexed route resolution used too much JavaScript heap: ${heapGrowthBytes} bytes.`,
  );

  console.log(JSON.stringify({
    databaseBackedResolution: 'PASSED',
    registryRecords: laxmiNagar.registry.recordCount,
    checks: {
      localityAndHierarchy: 'PASSED',
      contextualCityResolution: 'PASSED',
      missingLocation: 'PASSED',
      gtbNagarUnresolvedWithoutGuessing: gtbNagarAmbiguous ? 'AMBIGUOUS' : 'UNRESOLVED',
      knownAmbiguousAliasRejected: 'PASSED',
      sourceAttributionRetained: 'PASSED',
    },
    durationMs: Number(durationMs.toFixed(2)),
    heapGrowthBytes,
    residentGrowthBytes,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
