const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const validStatuses = new Set(['SUPPORTED', 'RESEARCH_ONLY', 'REJECTED']);
const matrixKeys = [
  'pilotTraining',
  'dgcaGroundClasses',
  'commercialPilotTraining',
  'cplTraining',
];
const evidenceKeys = [
  'airportContext',
  'aviationEcosystem',
  'dgcaTraining',
  'dgcaMedical',
  'studentPathway',
];
const routingFiles = [
  'lib/locationSeo.js',
  'pages/[location]/[service].jsx',
  'scripts/generate-sitemap.js',
];

async function main() {
  const { INDIA_LOCATION_CANDIDATES } = await import('../data/location-seo/india-candidates.js');
  const { INDIA_DEEP_VALIDATION } = await import('../data/location-seo/india-deep-validation.js');

  assert.equal(INDIA_DEEP_VALIDATION.length, 30, 'Deep validation must cover all 30 cities.');
  assert.deepEqual(
    INDIA_DEEP_VALIDATION.map(({ slug }) => slug).sort(),
    INDIA_LOCATION_CANDIDATES.map(({ slug }) => slug).sort(),
    'Deep-validation candidates must match the existing 30-city candidate registry.',
  );
  assert.equal(new Set(INDIA_DEEP_VALIDATION.map(({ slug }) => slug)).size, 30, 'Candidate slugs must be unique.');

  for (const city of INDIA_DEEP_VALIDATION) {
    assert.equal(city.country, 'India', `${city.slug} must identify India.`);
    assert.equal(city.relationship, 'informational', `${city.slug} must remain informational.`);
    assert.equal(city.indexable, false, `${city.slug} must remain non-indexable.`);
    assert.deepEqual(Object.keys(city.serviceMatrix).sort(), [...matrixKeys].sort(), `${city.slug} has an incomplete service matrix.`);

    for (const [service, status] of Object.entries(city.serviceMatrix)) {
      assert.ok(validStatuses.has(status), `${city.slug}/${service} has invalid status ${status}.`);
      assert.notEqual(status, 'SUPPORTED', `${city.slug}/${service} cannot be supported while the city remains unapproved.`);
    }

    for (const key of evidenceKeys) {
      assert.ok(Array.isArray(city.evidence[key]) && city.evidence[key].length > 0, `${city.slug} is missing ${key} evidence or an explicit evidence gap.`);
      for (const item of city.evidence[key]) {
        assert.ok(item.fact, `${city.slug}/${key} contains an empty fact.`);
        assert.match(item.source, /^https:\/\//, `${city.slug}/${key} must cite an HTTPS source.`);
        assert.ok(item.checkedAt, `${city.slug}/${key} must record its review date.`);
        assert.ok(item.cityRelevance, `${city.slug}/${key} must state geographic relevance.`);
        assert.ok(city.sources.some(({ url }) => url === item.source), `${city.slug}/${key} cites a source missing from its source list.`);
      }
    }

    assert.ok(city.sources.length > 0, `${city.slug} must include source references.`);
    assert.ok(city.sources.every(({ url }) => /^https:\/\//.test(url)), `${city.slug} contains an invalid source URL.`);
    assert.ok(city.contentUniqueness && Array.isArray(city.contentUniqueness.localFacts), `${city.slug} must record its uniqueness review.`);
    assert.ok(
      city.contentUniqueness.localFacts.every(({ fact, source }) => fact && /^https:\/\//.test(source)),
      `${city.slug} local facts must be individually sourced.`,
    );
    assert.ok(
      city.contentUniqueness.localFacts.every(({ source }) => city.sources.some((item) => item.url === source)),
      `${city.slug} local facts cite a source missing from its source list.`,
    );
    assert.ok(city.indexabilityReview.reason, `${city.slug} needs an explicit indexability reason.`);
    assert.equal(city.indexabilityReview.reviewedAt, '2026-10-03', `${city.slug} has a mismatched review date.`);
  }

  for (const file of routingFiles) {
    const content = fs.readFileSync(path.join(rootDir, file), 'utf8');
    assert.ok(
      !content.includes('india-deep-validation'),
      `${file} must not import or reference the research-only deep-validation dataset.`,
    );
  }

  console.log(`Validated ${INDIA_DEEP_VALIDATION.length} non-indexable candidate records; all service statuses, evidence arrays, citations, and routing isolation checks passed.`);
}

main().catch((error) => {
  console.error(`validate-india-deep-validation: ${error.message}`);
  process.exitCode = 1;
});
