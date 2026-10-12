import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadIndiaGeographicRegistry } from '../lib/indiaGeographicRegistry.js';
import {
  buildIndiaLocationCandidateBatch,
  resolveIndiaCandidateReference,
  summarizeIndiaLocationScale,
} from '../lib/indiaLocationContentEngine.js';
import { resolveHierarchy } from '../lib/geographicData.js';
import { getApprovedLocationServicePairs } from '../lib/locationSeo.js';
import {
  PRODUCTION_LOCATION_PROMOTION_EVALUATIONS,
  PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS,
} from '../data/location-seo/production-candidate-registry.js';
import { SERVICES } from '../data/location-seo/services.js';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const reportPath = path.join(
  rootDirectory,
  'data',
  'location-seo',
  'india-location-candidate-report.json',
);
const sitemapPath = path.join(rootDirectory, '.generated-sitemap.xml');
const siteOrigin = 'https://weoneaviation.in';
const serviceSlugs = [
  'pilot-training',
  'dgca-ground-classes',
  'commercial-pilot-training',
  'cpl-training',
];
const namedReferences = [
  { name: 'Laxmi Nagar', state: 'Delhi', type: 'neighborhood' },
  { name: 'GTB Nagar', state: 'Delhi' },
  { name: 'Rohini', state: 'Delhi', type: 'locality' },
  { name: 'Janakpuri', state: 'Delhi', type: 'populated-place' },
  { name: 'Karol Bagh', state: 'Delhi', type: 'neighborhood' },
  { name: 'Pitampura', state: 'Delhi', type: 'populated-place' },
  { name: 'Rajouri Garden', state: 'Delhi', type: 'subdistrict' },
  { name: 'Saket', state: 'Delhi', type: 'neighborhood' },
  { name: 'Vasant Kunj', state: 'Delhi', type: 'neighborhood' },
  { name: 'Mayur Vihar', state: 'Delhi', type: 'subdistrict' },
  { name: 'Shahdara', state: 'Delhi', type: 'neighborhood' },
  { name: 'Dwarka', state: 'Delhi' },
  { name: 'Noida', state: 'Uttar Pradesh' },
  { name: 'Ghaziabad', state: 'Uttar Pradesh' },
  { name: 'Gurugram', state: 'Haryana' },
  { name: 'Faridabad', state: 'Haryana' },
  { name: 'Andheri East', state: 'Maharashtra' },
  { name: 'Andheri West', state: 'Maharashtra' },
  { name: 'Mumbai', state: 'Maharashtra', type: 'city' },
  { name: 'Pune', state: 'Maharashtra' },
  { name: 'Nagpur', state: 'Maharashtra' },
  { name: 'Lucknow', state: 'Uttar Pradesh' },
  { name: 'Kanpur', state: 'Uttar Pradesh' },
  { name: 'Varanasi', state: 'Uttar Pradesh' },
  { name: 'Jaipur', state: 'Rajasthan' },
  { name: 'Ahmedabad', state: 'Gujarat' },
  { name: 'Hyderabad', state: 'Telangana' },
  { name: 'Gachibowli', state: 'Telangana' },
  { name: 'Bengaluru', state: 'Karnataka' },
  { name: 'Chennai', state: 'Tamil Nadu' },
  { name: 'Kolkata', state: 'West Bengal' },
  { name: 'Thiruvananthapuram', state: 'Kerala' },
  { name: 'Kochi', state: 'Kerala' },
  { name: 'Bhopal', state: 'Madhya Pradesh' },
  { name: 'Indore', state: 'Madhya Pradesh' },
  { name: 'Patna', state: 'Bihar' },
  { name: 'Bhubaneswar', state: 'Odisha' },
  { name: 'Chandigarh', state: 'Chandigarh' },
  { name: 'Dehradun', state: 'Uttarakhand' },
  { name: 'Ranchi', state: 'Jharkhand' },
  { name: 'Guwahati', state: 'Assam' },
  { name: 'Srinagar', state: 'Jammu and Kashmir' },
  { name: 'Amritsar', state: 'Punjab' },
];

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function sitemapRoutes(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, url]) => url);
}

function locationRoutes(urls) {
  return urls.map((url) => new URL(url).pathname)
    .filter((pathname) => {
      const [, , serviceSlug, extra] = pathname.split('/');
      return serviceSlugs.includes(serviceSlug) && !extra;
    })
    .sort();
}

function stateGeographyCoverage(records) {
  const byId = new Map(records.map((record) => [record.id, record]));
  const states = new Map(records
    .filter(({ type }) => type === 'state')
    .map((record) => [record.id, {
      id: record.id,
      name: record.name,
      availableLevels: new Set(['state']),
      sampleByLevel: {},
    }]));
  for (const record of records) {
    let parent = record.parentId ? byId.get(record.parentId) : null;
    const visited = new Set();
    while (parent && !visited.has(parent.id)) {
      visited.add(parent.id);
      if (parent.type === 'state') {
        const state = states.get(parent.id);
        if (state) {
          state.availableLevels.add(record.type);
          if (!state.sampleByLevel[record.type]) {
            state.sampleByLevel[record.type] = {
              id: record.id,
              name: record.canonicalName || record.name,
              slug: record.slug,
            };
          }
        }
        break;
      }
      parent = parent.parentId ? byId.get(parent.parentId) : null;
    }
  }
  return [...states.values()]
    .map(({ availableLevels, ...state }) => ({
      ...state,
      availableLevels: [...availableLevels].sort(),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function namedLocationResult(reference, records, batch, services) {
  const resolution = resolveIndiaCandidateReference(reference, records);
  if (!resolution.record) {
    return {
      reference,
      resolution: resolution.status,
      reason: resolution.reason,
      services: services.map(({ slug }) => ({
        service: slug,
        classification: resolution.status === 'REJECTED' ? 'REJECTED' : 'RESEARCH',
        reason: resolution.reason,
      })),
    };
  }

  const record = resolution.record;
  const hierarchy = resolveHierarchy(record, records);
  const locationResult = batch.internal.resultsByLocation.get(record.id);
  const invalidHierarchy = hierarchy.length <= 1
    || hierarchy[0]?.type !== 'country'
    || hierarchy.at(-1)?.id !== record.id
    || !hierarchy.some(({ type }) => type === 'state');
  return {
    reference,
    resolution: resolution.status,
    location: {
      id: record.id,
      canonicalName: record.canonicalName || record.name,
      slug: record.slug,
      type: record.type,
      parent: hierarchy.at(-2)?.name || null,
      state: locationResult?.state || record.state || null,
      district: locationResult?.district || record.district || null,
      hierarchy: hierarchy.map(({ id, name, type }) => ({ id, name, type })),
      aliases: record.aliases || [],
      ambiguity: locationResult?.ambiguousCanonicalName ? 'CONTEXTUAL_AMBIGUITY' : 'UNAMBIGUOUS',
    },
    aviation: locationResult
      ? {
        status: locationResult.status,
        evidenceCount: locationResult.aviationEvidenceCount,
        sources: locationResult.aviationSourceCount,
        renderable: locationResult.renderable,
        indexable: locationResult.indexable,
        sitemapEligible: locationResult.sitemapEligible,
        blockers: locationResult.blockingGates,
      }
      : {
        status: record.type === 'postal-area' || invalidHierarchy ? 'REJECTED' : 'RESEARCH_ONLY',
        evidenceCount: 0,
        sources: 0,
        renderable: false,
        indexable: false,
        sitemapEligible: false,
        blockers: [{
          gate: record.type === 'postal-area' ? 'pinPagePolicy' : 'aviationEvidence',
          reason: record.type === 'postal-area'
            ? 'Postal-only records are not aviation landing-page candidates.'
            : 'No exact source-backed aviation evidence is linked to this record.',
        }],
      },
    services: services.map(({ slug }) => {
      const rejected = record.type === 'postal-area' || invalidHierarchy;
      if (slug === 'pilot-training' && locationResult) {
        return {
          service: slug,
          classification: locationResult.status,
          renderable: locationResult.renderable,
          indexable: locationResult.indexable,
          sitemapEligible: locationResult.sitemapEligible,
          blockers: locationResult.blockingGates,
        };
      }
      return {
        service: slug,
        classification: rejected ? 'REJECTED' : 'RESEARCH_ONLY',
        renderable: false,
        indexable: false,
        sitemapEligible: false,
        blockers: [{
          gate: rejected ? 'geographicRecordPolicy' : 'serviceSpecificity',
          reason: rejected
            ? 'Postal-only or invalid-hierarchy locations are rejected.'
            : `No independent location-specific ${slug} content is approved.`,
        }],
      };
    }),
  };
}

async function main() {
  const initialSitemap = fs.readFileSync(sitemapPath, 'utf8');
  const initialSitemapHash = sha256(initialSitemap);
  const registry = await loadIndiaGeographicRegistry();
  const batch = buildIndiaLocationCandidateBatch({ records: registry.records });
  const services = SERVICES.filter(({ slug }) => serviceSlugs.includes(slug));
  const namedLocations = namedReferences.map((reference) => (
    namedLocationResult(reference, registry.records, batch, services)
  ));

  const scaleSamples = [1000, 5000, 10000].map((sampleSize) => (
    summarizeIndiaLocationScale(registry.records, {
      sampleSize,
      evidenceByIndiaLocationId: batch.internal.evidenceByIndiaLocationId,
    })
  ));
  for (const [index, scale] of scaleSamples.entries()) {
    assert.equal(scale.sampleRecords, [1000, 5000, 10000][index]);
    assert.equal(scale.geographyResolved, scale.sampleRecords);
    assert.equal(scale.generatedContentModels, scale.sampleRecords);
    assert.equal(scale.locationServiceCombinations, scale.sampleRecords * services.length);
  }

  const approvedRoutes = getApprovedLocationServicePairs()
    .map(({ location, service }) => `/${location.slug}/${service.slug}`)
    .sort();
  const initialUrls = sitemapRoutes(initialSitemap);
  const sitemapLocationPaths = locationRoutes(initialUrls);
  assert.deepEqual(
    sitemapLocationPaths,
    approvedRoutes,
    'Sitemap location/service routes must exactly match the existing allowlist.',
  );
  const indiaProductionRoutes = PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS
    .filter(({ location }) => location.countryCode === 'IN')
    .map(({ location, service }) => `/${location.slug}/${service.slug}`)
    .sort();
  const newlyIndexable = [...batch.internal.resultsByLocation.values()]
    .filter(({ indexable, productionApproved }) => indexable && !productionApproved);
  assert.equal(newlyIndexable.length, 0, 'Candidate evaluation must not promote new production routes.');
  assert.equal(batch.totals.indexableLocations, indiaProductionRoutes.length);
  assert.equal(batch.totals.sitemapEligibleLocations, indiaProductionRoutes.length);
  for (const service of services) {
    const counts = batch.byService[service.slug];
    assert.equal(
      counts.SUPPORTED + counts.RESEARCH_ONLY + counts.REJECTED,
      registry.recordCount,
      `${service.slug} must classify every record in the registry.`,
    );
  }

  const afterSitemap = fs.readFileSync(sitemapPath, 'utf8');
  assert.equal(sha256(afterSitemap), initialSitemapHash, 'Evaluation must not modify sitemap content.');
  const productionSimilarities = PRODUCTION_LOCATION_PROMOTION_EVALUATIONS
    .filter(({ locationSlug, serviceSlug }) => (
      serviceSlug === 'pilot-training'
      && indiaProductionRoutes.some((route) => route === `/${locationSlug}/${serviceSlug}`)
    ))
    .map(({ differentiation }) => differentiation?.normalizedSimilarityPercent)
    .filter(Number.isFinite);
  const productionEvaluations = PRODUCTION_LOCATION_PROMOTION_EVALUATIONS.filter((evaluation) => (
    indiaProductionRoutes.includes(`/${evaluation.locationSlug}/${evaluation.serviceSlug}`)
  ));
  const namedResolutionSummary = namedLocations.reduce((counts, item) => {
    counts[item.resolution] = (counts[item.resolution] || 0) + 1;
    return counts;
  }, {});
  const stateCoverage = stateGeographyCoverage(registry.records);
  assert.equal(stateCoverage.length, 36, 'All 28 States and 8 Union Territories must be represented.');
  const report = {
    generatedAt: new Date().toISOString(),
    objective: 'Evaluate India location candidates without publishing or modifying approved routes.',
    registry: {
      recordCount: registry.recordCount,
      recordsLoaded: registry.recordsLoaded,
      complete: registry.complete,
      statesAndUnionTerritories: registry.records.filter(({ type }) => type === 'state').length,
      districts: registry.records.filter(({ type }) => type === 'district').length,
      geographicLevels: batch.dataset.geographicLevels,
      statesAndUnionTerritoriesCoverage: stateCoverage,
    },
    candidateEngine: {
      ...batch.dataset,
      unresolvedAviationEvidenceCount: batch.dataset.unresolvedAviationEvidence.length,
      unresolvedAviationEvidence: batch.dataset.unresolvedAviationEvidence,
      totals: batch.totals,
      byGeographicLevel: batch.byGeographicLevel,
      byService: batch.byService,
      topBlockers: batch.topBlockers,
      top100: batch.topCandidates,
      newlyIndexableCandidates: newlyIndexable.length,
      aviationContentSupportedButNotIndexable: batch.totals.SUPPORTED
        - batch.totals.indexableLocations,
    },
    namedLocationTests: namedLocations,
    namedResolutionSummary,
    scale: {
      intent: 'pilot-training',
      sampledFromEveryGeographicLevel: true,
      samples: scaleSamples,
    },
    productionBaseline: {
      approvedLocationServiceRoutes: approvedRoutes.length,
      sitemapLocationServiceRoutes: sitemapLocationPaths.length,
      indiaProductionRoutes,
      sitemapUrlCount: initialUrls.length,
      sitemapSha256: initialSitemapHash,
      sitemapMatchesAllowlist: true,
      sitemapUnchangedDuringEvaluation: true,
      curatedProductionSimilarity: {
        count: productionSimilarities.length,
        averageNormalizedSimilarityPercent: productionSimilarities.length
          ? Number((productionSimilarities.reduce((sum, value) => sum + value, 0)
            / productionSimilarities.length).toFixed(1))
          : null,
        maximumNormalizedSimilarityPercent: productionSimilarities.length
          ? Math.max(...productionSimilarities)
          : null,
        exactDuplicates: productionEvaluations
          .filter(({ differentiation }) => differentiation?.exactDuplicatePercent === 100).length,
      },
      promotionQuality: {
        supportedRoutes: productionEvaluations.filter(({ status }) => status === 'SUPPORTED').length,
        claimSafetyGateFailures: productionEvaluations
          .filter(({ gates }) => gates.claimsSafe !== true).length,
        metadataGateFailures: productionEvaluations
          .filter(({ gates }) => gates.metadataValid !== true).length,
        differentiationGateFailures: productionEvaluations
          .filter(({ gates }) => gates.contentDifferentiationValid !== true).length,
      },
      newlyAddedSitemapUrls: 0,
      jsxTemplatesCreated: 0,
      locationSpecificJsxFilesCreated: 0,
    },
  };

  assert.equal(namedLocations.find(({ reference }) => reference.name === 'GTB Nagar')?.resolution, 'NOT_FOUND');
  assert.equal(
    namedLocations.find(({ reference }) => reference.name === 'Gachibowli')?.resolution,
    'POSTAL_ONLY',
    'A postal-name alias must not be promoted as a locality match.',
  );
  assert.equal(namedLocations.length, namedReferences.length);
  assert.equal(new Set(namedLocations.filter(({ location }) => location).map(({ location }) => location.id)).size,
    namedLocations.filter(({ location }) => location).length,
    'Named references should resolve to unique context-aware registry identities.');

  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(
    `Candidate report written: ${path.relative(rootDirectory, reportPath)}; `
    + `${registry.recordCount} records, ${indiaProductionRoutes.length} existing India production routes, `
    + `${batch.topCandidates.length} ranked candidates.`,
  );
  console.log(
    `Scale: ${scaleSamples.map(({ sampleRecords, elapsedMs }) => (
      `${sampleRecords} records/${elapsedMs} ms`
    )).join(', ')}.`,
  );
}

main().catch((error) => {
  console.error(`test-india-location-candidates: ${error.stack || error.message}`);
  process.exitCode = 1;
});
