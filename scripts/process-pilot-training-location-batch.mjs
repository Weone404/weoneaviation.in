import fs from 'node:fs';
import path from 'node:path';
import { createGunzip } from 'node:zlib';
import { createInterface } from 'node:readline';
import { createReadStream } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { resolveIndiaGeographicRoute } from '../lib/indiaGeographicRegistry.js';
import { resolveWorldGeographicRoute } from '../lib/worldGeographicRegistry.js';
import { buildIndiaLocationServiceContent } from '../lib/indiaLocationContentEngine.js';
import { buildWorldLocationServiceContent } from '../lib/worldLocationContentEngine.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import {
  buildLocationContentSnapshot,
  assessContentDifferentiation,
} from '../lib/locationContentDifferentiation.js';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { SERVICES } from '../data/location-seo/services.js';
import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';

const ROOT = process.cwd();
const GEOGRAPHY_DIRECTORY = path.join(ROOT, 'data', 'location-seo', 'geography');
const CLASSIFICATION_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-support-classification.jsonl.gz',
);
const CLASSIFICATION_SUMMARY_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-support-classification-summary.json',
);
const DEFAULT_REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-location-batch-1-report.json',
);
const DEFAULT_CANDIDATES_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-location-batch-1-approved-indexable-candidates.json',
);
const SERVICE = SERVICES.find(({ slug }) => slug === 'pilot-training');
const MAX_PEER_COMPARISONS = 20;
const PLACE_AND_ADMIN_TYPES = new Set([
  'state',
  'province',
  'region',
  'county',
  'district',
  'territory',
]);
const EMPTY_COUNTS = () => ({
  SUPPORTED: 0,
  INDEXABLE: 0,
  NOINDEX: 0,
  RESEARCH: 0,
  REJECTED: 0,
});

function batchSizeFromEnvironment() {
  const value = process.env.PILOT_TRAINING_LOCATION_BATCH_SIZE;
  const batchSize = value ? Number(value) : 10000;
  if (!Number.isSafeInteger(batchSize) || batchSize < 1) {
    throw new TypeError('PILOT_TRAINING_LOCATION_BATCH_SIZE must be a positive integer.');
  }
  return batchSize;
}

function stratumKey(row) {
  const registry = row.countryCode === 'IN' ? 'india' : 'worldwide';
  return `${registry}|${row.countryCode || 'UNKNOWN'}|${row.geographicLevel || 'unknown'}`;
}

async function* readClassification() {
  const lines = createInterface({
    input: createReadStream(CLASSIFICATION_PATH).pipe(createGunzip()),
    crlfDelay: Infinity,
  });
  for await (const line of lines) {
    if (line) yield JSON.parse(line);
  }
}

function apportion(entries, target) {
  const capacity = entries.reduce((total, [, count]) => total + count, 0);
  if (target > capacity) {
    throw new Error(`Cannot select ${target} records from a stratum capacity of ${capacity}.`);
  }
  const shares = entries.map(([key, count]) => {
    const exact = target * count / capacity;
    return { key, count, quota: Math.floor(exact), remainder: exact - Math.floor(exact) };
  });
  let unassigned = target - shares.reduce((total, item) => total + item.quota, 0);
  shares.sort((left, right) => (
    right.remainder - left.remainder || String(left.key).localeCompare(String(right.key))
  ));
  for (const item of shares) {
    if (!unassigned) break;
    if (item.quota < item.count) {
      item.quota += 1;
      unassigned -= 1;
    }
  }
  if (unassigned) throw new Error('Stratum quota apportionment did not reach the requested batch size.');
  return new Map(shares.map(({ key, quota }) => [key, quota]));
}

function quotasForBatch(stratumCounts, requestedSize) {
  const registryCounts = new Map([['india', 0], ['worldwide', 0]]);
  for (const [key, count] of stratumCounts) {
    const registry = key.split('|', 1)[0];
    registryCounts.set(registry, (registryCounts.get(registry) || 0) + count);
  }
  const totalSupported = [...registryCounts.values()].reduce((total, count) => total + count, 0);
  if (totalSupported < requestedSize) {
    throw new Error(
      `The classification contains only ${totalSupported} SUPPORTED records; ${requestedSize} were requested.`,
    );
  }

  let indiaTarget = Math.min(Math.floor(requestedSize / 2), registryCounts.get('india'));
  let worldwideTarget = Math.min(requestedSize - indiaTarget, registryCounts.get('worldwide'));
  let remaining = requestedSize - indiaTarget - worldwideTarget;
  if (remaining) {
    const extraIndia = Math.min(remaining, registryCounts.get('india') - indiaTarget);
    indiaTarget += extraIndia;
    remaining -= extraIndia;
  }
  if (remaining) {
    const extraWorldwide = Math.min(remaining, registryCounts.get('worldwide') - worldwideTarget);
    worldwideTarget += extraWorldwide;
    remaining -= extraWorldwide;
  }
  if (remaining) throw new Error('The registry quotas could not fill the requested batch.');

  const registryTargets = new Map([
    ['india', indiaTarget],
    ['worldwide', worldwideTarget],
  ]);
  const quotas = new Map();
  for (const [registry, target] of registryTargets) {
    const entries = [...stratumCounts].filter(([key]) => key.startsWith(`${registry}|`));
    for (const [key, quota] of apportion(entries, target)) quotas.set(key, quota);
  }
  return { quotas, registryTargets, registryCounts, totalSupported };
}

async function selectStratifiedBatch(requestedSize) {
  const classificationSummary = JSON.parse(fs.readFileSync(CLASSIFICATION_SUMMARY_PATH, 'utf8'));
  const stratumCounts = new Map();
  const classificationCounts = {};
  let sourceRows = 0;
  let supportedCount = 0;

  for await (const row of readClassification()) {
    sourceRows += 1;
    classificationCounts[row.status] = (classificationCounts[row.status] || 0) + 1;
    if (row.status !== 'SUPPORTED') continue;
    if (row.pilotTrainingSupported !== true) {
      throw new Error(`Supported classification row ${row.locationId} is not marked as pilot-training supported.`);
    }
    const key = stratumKey(row);
    stratumCounts.set(key, (stratumCounts.get(key) || 0) + 1);
    supportedCount += 1;
  }
  if (classificationCounts.SUPPORTED !== classificationSummary.counts?.SUPPORTED) {
    throw new Error('The support-classification JSONL and summary have different SUPPORTED totals.');
  }
  const { quotas, registryTargets, registryCounts } = quotasForBatch(stratumCounts, requestedSize);
  const selectedCounts = new Map();
  const seenCounts = new Map();
  const selected = [];

  for await (const row of readClassification()) {
    if (row.status !== 'SUPPORTED') continue;
    const key = stratumKey(row);
    const quota = quotas.get(key) || 0;
    if (!quota) continue;
    const seen = seenCounts.get(key) || 0;
    const alreadySelected = selectedCounts.get(key) || 0;
    const expectedPosition = Math.floor(((alreadySelected + 0.5) * stratumCounts.get(key)) / quota);
    if (seen === expectedPosition) {
      selected.push(row);
      selectedCounts.set(key, alreadySelected + 1);
    }
    seenCounts.set(key, seen + 1);
  }
  if (selected.length !== requestedSize) {
    throw new Error(`Stratified selection produced ${selected.length} records, not ${requestedSize}.`);
  }
  return {
    selected,
    sourceRows,
    supportedCount,
    classificationCounts,
    classificationSummary,
    strata: Object.fromEntries([...quotas].map(([key, quota]) => [
      key,
      { available: stratumCounts.get(key), selected: quota },
    ])),
    registryTargets: Object.fromEntries(registryTargets),
    registrySupportedCounts: Object.fromEntries(registryCounts),
  };
}

function validHierarchy(record, hierarchy) {
  return Boolean(
    Array.isArray(hierarchy)
    && hierarchy.at(-1)?.id === record.id
    && hierarchy[0]?.type === 'country'
    && hierarchy[0]?.countryCode === record.countryCode
    && hierarchy.every((node, index) => (
      node.countryCode === record.countryCode
      && (index === 0 || node.parentId === hierarchy[index - 1].id)
    ))
    && (record.type === 'country'
      || hierarchy.some(({ type }) => PLACE_AND_ADMIN_TYPES.has(type))),
  );
}

function regulatorFor(countryCode) {
  return Object.values(AVIATION_REGULATORY_CONTEXTS)
    .find(({ countryCode: supportedCode }) => supportedCode === countryCode) || null;
}

function wordCount(value) {
  return String(value || '').match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)?.length || 0;
}

function canonicalName(record) {
  return record?.canonicalName || record?.name || null;
}

function baseResult(row, selectionOrder) {
  return {
    selectionOrder,
    locationId: row.locationId,
    slug: row.slug,
    location: row.locationName,
    geographicLevel: row.geographicLevel,
    country: row.country,
    countryCode: row.countryCode,
    classificationStatus: row.status,
    classificationEvidenceAvailable: row.evidenceAvailable,
    status: 'REJECTED',
    reason: null,
    hierarchy: [],
    regulator: null,
    route: null,
    qualityScore: 0,
    differentiationScore: null,
    normalizedSimilarityPercent: null,
    visibleWordCount: 0,
    qualityState: null,
    indexabilityState: null,
    batchPeerComparisonCount: 0,
    exactDuplicate: false,
    nearDuplicate: false,
    claimsSafetyPassed: null,
  };
}

function isAmbiguousResolutionError(error) {
  return error?.code === 'AMBIGUOUS_GEOGRAPHIC_LOCATION'
    || /Geographic (?:slug|alias) ".*" is ambiguous\./i.test(error?.message || '');
}

function isKnownGeographyError(error) {
  return error?.code === 'INVALID_GEOGRAPHIC_HIERARCHY'
    || isAmbiguousResolutionError(error);
}

function finalStatus(indexability) {
  if (indexability === 'INDEXABLE') return 'INDEXABLE';
  if (indexability === 'NOINDEX' || indexability === 'CONTENT_DIFFERENTIATION_REQUIRED') {
    return 'NOINDEX';
  }
  if (['REJECTED', 'INVALID', 'AMBIGUOUS'].includes(indexability)) return 'REJECTED';
  return 'RESEARCH';
}

function resultReason(pageModel, content) {
  return pageModel.indexabilityPipeline?.reason
    || pageModel.quality?.blockers?.join(' ')
    || content.composedPage?.qualityDifferentiation?.reason
    || content.quality?.blockers?.join(' ')
    || 'The current page-quality engine did not approve indexation.';
}

async function evaluateLocation(row, selectionOrder) {
  const result = baseResult(row, selectionOrder);
  if (!row.locationId || !row.slug || !row.locationName || !row.countryCode) {
    result.reason = 'The support-classification row is missing canonical location data.';
    result.missingLocationData = true;
    return result;
  }

  const isIndia = row.countryCode === 'IN';
  let resolved;
  try {
    resolved = isIndia
      ? await resolveIndiaGeographicRoute(row.slug)
      : await resolveWorldGeographicRoute(row.slug);
  } catch (error) {
    if (isAmbiguousResolutionError(error)) {
      result.reason = error.message;
      result.ambiguous = true;
      return result;
    }
    if (error?.code === 'INVALID_GEOGRAPHIC_HIERARCHY') {
      result.reason = error.message;
      result.missingGeographicHierarchy = true;
      return result;
    }
    throw error;
  }

  const record = resolved.location;
  const hierarchy = resolved.hierarchy;
  if (!record) {
    result.reason = 'The canonical route did not resolve in its geographic registry.';
    result.missingLocationData = true;
    return result;
  }
  if (record.id !== row.locationId) {
    result.reason = `The route resolved to ${record.id}, not the classified record ${row.locationId}.`;
    result.ambiguous = true;
    return result;
  }
  if (record.slug !== row.slug) {
    result.reason = `The classified route is not canonical; registry canonical slug is ${record.slug}.`;
    return result;
  }
  if (record.countryCode !== row.countryCode || record.status !== 'sourced') {
    result.reason = 'Resolved location country or source status does not match the support classification.';
    return result;
  }
  result.location = canonicalName(record);
  result.country = record.country;
  result.countryCode = record.countryCode;
  result.geographicLevel = record.type;
  result.hierarchy = hierarchy.map(({ name, type }) => ({ name, type }));
  result.route = `/${record.slug}/${SERVICE.slug}`;
  result.missingLocationData = false;

  if (!validHierarchy(record, hierarchy)) {
    result.reason = 'The resolved record does not have a valid country-to-administrative hierarchy.';
    result.missingGeographicHierarchy = true;
    return result;
  }
  result.missingGeographicHierarchy = false;

  const regulator = regulatorFor(record.countryCode);
  if (!regulator) {
    result.reason = `No aviation regulator mapping exists for ${record.country} (${record.countryCode}).`;
    result.status = 'RESEARCH';
    result.missingRegulator = true;
    return result;
  }
  result.regulator = regulator.authority;
  result.missingRegulator = false;

  if (record.type === 'country') {
    result.status = 'RESEARCH';
    result.reason = 'Country-level records are not place-level pilot-training routes in the current dynamic page engine.';
    return result;
  }

  let generated;
  try {
    generated = isIndia
      ? buildIndiaLocationServiceContent({
        record,
        hierarchy,
        service: SERVICE,
        routeSlug: record.slug,
      })
      : buildWorldLocationServiceContent({
        record,
        hierarchy,
        service: SERVICE,
        nearbyAviationPlaces: resolved.nearbyAviationPlaces,
        routeSlug: record.slug,
      });
  } catch (error) {
    if (isKnownGeographyError(error)) {
      result.reason = error.message;
      result.missingGeographicHierarchy = true;
      return result;
    }
    if (error?.code === 'UNSUPPORTED_DYNAMIC_LOCATION_SERVICE') {
      result.status = 'RESEARCH';
      result.reason = error.message;
      return result;
    }
    throw error;
  }

  const content = generated.content;
  const location = generated.location;
  let pageModel;
  try {
    pageModel = buildLocationPageModel({
      location,
      service: SERVICE,
      content,
      siteOrigin: 'https://weoneaviation.in',
      locations: hierarchy,
      geographicDataValidated: true,
    });
  } catch (error) {
    if (error.message?.startsWith('Unsupported We One Aviation business claims for "')) {
      result.reason = error.message;
      result.claimsSafetyPassed = false;
      return result;
    }
    throw error;
  }
  const claimsSafetyPassed = pageModel.unsupportedClaims.length === 0
    && (content.quality?.unsupportedClaims || []).length === 0
    && content.relationship === 'informational'
    && content.serviceRelationship?.mode === 'informational'
    && content.serviceRelationship?.localDeliveryVerified === false;
  if (!claimsSafetyPassed) {
    result.reason = 'Generated claims or local-delivery relationship did not pass the safety gate.';
    result.claimsSafetyPassed = false;
    return result;
  }

  const snapshot = buildLocationContentSnapshot({
    location,
    hierarchy,
    model: { ...pageModel, service: SERVICE },
    sections: content.locationSpecificSections || [],
  });
  const quality = content.quality || {};
  const originalDifferentiation = quality.differentiation
    || pageModel.contentDifferentiation
    || null;
  const wordTotal = quality.visibleWordCount
    ?? quality.metrics?.visibleWordCount
    ?? wordCount(pageModel.renderedBody.join(' '));
  const composedQuality = pageModel.composedQuality
    || content.composedPage?.qualityDifferentiation
    || null;
  result.status = finalStatus(pageModel.indexability);
  result.reason = result.status === 'INDEXABLE' ? null : resultReason(pageModel, content);
  result.qualityScore = Number.isFinite(composedQuality?.score) ? composedQuality.score : 0;
  result.qualityState = composedQuality?.state || quality.state || null;
  result.indexabilityState = pageModel.indexability;
  result.visibleWordCount = wordTotal;
  result.claimsSafetyPassed = true;
  result.batchPeerComparisonCount = 0;
  result._snapshot = snapshot;
  result._quality = quality;
  result._originalDifferentiation = originalDifferentiation;
  result._engineIndexability = pageModel.indexability;
  return result;
}

function samplePeerIndexes(length, currentIndex, limit) {
  const count = Math.min(length - 1, limit);
  if (count <= 0) return [];
  if (length - 1 <= limit) {
    return Array.from({ length }, (_, index) => index).filter((index) => index !== currentIndex);
  }
  const indexes = new Set();
  for (let step = 1; indexes.size < count && step <= length * 2; step += 1) {
    const offset = Math.floor((step * length) / (count + 1));
    const index = (currentIndex + offset) % length;
    if (index !== currentIndex) indexes.add(index);
  }
  if (indexes.size !== count) {
    for (let offset = 1; indexes.size < count; offset += 1) {
      const index = (currentIndex + offset) % length;
      if (index !== currentIndex) indexes.add(index);
    }
  }
  return [...indexes];
}

function applyBatchDifferentiation(results) {
  const groups = new Map();
  for (const result of results) {
    if (!result._snapshot) continue;
    const key = `${result.countryCode}|${result.geographicLevel}`;
    const group = groups.get(key) || [];
    group.push(result);
    groups.set(key, group);
  }

  const fingerprints = new Set();
  let exactDuplicateCount = 0;
  let nearDuplicateCount = 0;
  let peerComparedCount = 0;
  let qualityFailureCount = 0;
  let differentiationFailureCount = 0;
  let wordCountTotal = 0;
  let generatedCount = 0;
  const differentiationScores = [];
  const reportsByResult = new Map();

  for (const group of groups.values()) {
    for (let index = 0; index < group.length; index += 1) {
      const result = group[index];
      const peerIndexes = samplePeerIndexes(group.length, index, MAX_PEER_COMPARISONS);
      const peers = peerIndexes.map((peerIndex) => group[peerIndex]._snapshot);
      const original = result._originalDifferentiation;
      const comparison = peers.length
        ? assessContentDifferentiation({
          candidate: result._snapshot,
          comparisons: peers,
        })
        : original;
      const similarity = Number.isFinite(comparison?.metrics?.normalizedSimilarityPercent)
        ? comparison.metrics.normalizedSimilarityPercent
        : Number.isFinite(comparison?.similarityScore)
          ? comparison.similarityScore
          : 100;
      const differentiationScore = Math.max(0, Math.min(100, 100 - similarity));
      const fingerprint = comparison?.differentiationFingerprint
        || original?.differentiationFingerprint
        || null;
      const exactDuplicate = Boolean(fingerprint && fingerprints.has(fingerprint));
      if (exactDuplicate) exactDuplicateCount += 1;
      if (fingerprint) fingerprints.add(fingerprint);
      const nearDuplicate = peers.length > 0
        && similarity >= GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.maxNormalizedSimilarityPercent;
      if (nearDuplicate) nearDuplicateCount += 1;
      if (peers.length) peerComparedCount += 1;
      const existingDifferentiationPassed = original?.status === 'PASSED';
      const peerDifferentiationPassed = !peers.length || comparison?.status === 'PASSED';
      const differentiationPassed = existingDifferentiationPassed
        && peerDifferentiationPassed
        && !exactDuplicate;
      const enginePassed = result._engineIndexability === 'INDEXABLE';
      if (!enginePassed) qualityFailureCount += 1;
      if (!differentiationPassed) differentiationFailureCount += 1;
      if (result.status === 'INDEXABLE' && (!differentiationPassed || exactDuplicate)) {
        result.status = 'NOINDEX';
        result.reason = exactDuplicate
          ? 'The generated page is an exact differentiation-fingerprint duplicate within this batch.'
          : comparison?.reasons?.join(' ')
            || original?.reasons?.join(' ')
            || 'The production or same-country batch differentiation gate did not pass.';
      }
      result.differentiationScore = Number(differentiationScore.toFixed(1));
      result.normalizedSimilarityPercent = Number(similarity.toFixed(1));
      result.exactDuplicate = exactDuplicate;
      result.nearDuplicate = nearDuplicate;
      result.batchPeerComparisonCount = peers.length;
      reportsByResult.set(result, {
        status: comparison?.status || 'NOT_ASSESSED',
        comparisonCount: comparison?.metrics?.comparisonCount ?? peers.length,
        reasons: comparison?.reasons || [],
      });
      differentiationScores.push(result.differentiationScore);
      wordCountTotal += result.visibleWordCount;
      generatedCount += 1;
    }
  }

  for (const result of results) {
    delete result._snapshot;
    delete result._quality;
    delete result._originalDifferentiation;
    delete result._engineIndexability;
  }

  const allStatuses = results.reduce((counts, result) => {
    counts[result.status] += 1;
    return counts;
  }, EMPTY_COUNTS());
  const scores = results.map(({ qualityScore }) => qualityScore);
  const histogram = {
    '0–20': 0,
    '20–40': 0,
    '40–60': 0,
    '60–70': 0,
    '70–80': 0,
    '80–90': 0,
    '90–100': 0,
  };
  for (const score of scores) {
    if (score <= 20) histogram['0–20'] += 1;
    else if (score <= 40) histogram['20–40'] += 1;
    else if (score <= 60) histogram['40–60'] += 1;
    else if (score <= 70) histogram['60–70'] += 1;
    else if (score <= 80) histogram['70–80'] += 1;
    else if (score <= 90) histogram['80–90'] += 1;
    else histogram['90–100'] += 1;
  }
  return {
    allStatuses,
    counts: {
      qualityFailures: qualityFailureCount,
      differentiationFailures: differentiationFailureCount,
      exactDuplicates: exactDuplicateCount,
      nearDuplicates: nearDuplicateCount,
      nearDuplicateRatePercent: peerComparedCount
        ? Number((nearDuplicateCount / peerComparedCount * 100).toFixed(2))
        : 0,
      peerComparedLocations: peerComparedCount,
      averageDifferentiationScore: differentiationScores.length
        ? Number((
          differentiationScores.reduce((total, score) => total + score, 0)
          / differentiationScores.length
        ).toFixed(2))
        : null,
      minimumDifferentiationScore: differentiationScores.length
        ? Math.min(...differentiationScores)
        : null,
      maximumDifferentiationScore: differentiationScores.length
        ? Math.max(...differentiationScores)
        : null,
      averageWordCount: Number((wordCountTotal / Math.max(1, generatedCount)).toFixed(1)),
      wordCountEvaluated: generatedCount,
      averageQualityScore: Number((
        scores.reduce((total, score) => total + score, 0) / Math.max(1, scores.length)
      ).toFixed(2)),
    },
    histogram,
    peerComparisons: reportsByResult,
  };
}

function resultForReport(result, peerComparison) {
  return {
    ...result,
    peerDifferentiation: peerComparison || null,
  };
}

function topExamples(results, status, limit = 20) {
  return results
    .filter((result) => result.status === status)
    .sort((left, right) => (
      right.qualityScore - left.qualityScore
      || right.differentiationScore - left.differentiationScore
      || String(left.location).localeCompare(String(right.location))
    ))
    .slice(0, limit);
}

function increment(object, key) {
  object[key] = (object[key] || 0) + 1;
}

async function main() {
  if (!SERVICE) throw new Error('The pilot-training service intent is not configured.');
  if (!fs.existsSync(CLASSIFICATION_PATH) || !fs.existsSync(CLASSIFICATION_SUMMARY_PATH)) {
    throw new Error('The existing pilot-training support classification and summary are required.');
  }
  const startedAt = performance.now();
  const batchSize = batchSizeFromEnvironment();
  const selection = await selectStratifiedBatch(batchSize);
  const results = [];
  const countryCounts = {};
  const geographicLevelCounts = {};
  const registryCounts = { india: 0, worldwide: 0 };
  let missingRegulatorCount = 0;
  let missingHierarchyCount = 0;
  let missingLocationDataCount = 0;
  let ambiguousCount = 0;
  let safetyFailureCount = 0;

  for (const [index, row] of selection.selected.entries()) {
    const result = await evaluateLocation(row, index + 1);
    results.push(result);
    increment(countryCounts, `${result.countryCode || row.countryCode}|${result.country || row.country}`);
    increment(geographicLevelCounts, result.geographicLevel || row.geographicLevel || 'unknown');
    increment(registryCounts, row.countryCode === 'IN' ? 'india' : 'worldwide');
    if (result.missingRegulator) missingRegulatorCount += 1;
    if (result.missingGeographicHierarchy) missingHierarchyCount += 1;
    if (result.missingLocationData) missingLocationDataCount += 1;
    if (result.ambiguous) ambiguousCount += 1;
    if (result.claimsSafetyPassed === false) safetyFailureCount += 1;
    if ((index + 1) % 500 === 0) {
      console.log(`Evaluated ${(index + 1).toLocaleString()} of ${batchSize.toLocaleString()} locations.`);
    }
  }

  const quality = applyBatchDifferentiation(results);
  const statusCounts = results.reduce((counts, result) => {
    counts[result.status] += 1;
    return counts;
  }, {
    INDEXABLE: 0,
    NOINDEX: 0,
    RESEARCH: 0,
    REJECTED: 0,
  });
  const finalResults = results.map((result) => resultForReport(
    result,
    quality.peerComparisons.get(result),
  ));
  const compareByLowestDifferentiation = (left, right) => (
    left.differentiationScore - right.differentiationScore
    || left.qualityScore - right.qualityScore
    || String(left.location).localeCompare(String(right.location))
  );
  const indexable = topExamples(finalResults, 'INDEXABLE');
  const candidates = finalResults
    .filter(({ status }) => status === 'INDEXABLE')
    .map((result) => ({
      locationId: result.locationId,
      slug: result.slug,
      route: result.route,
      location: result.location,
      hierarchy: result.hierarchy,
      country: result.country,
      countryCode: result.countryCode,
      regulator: result.regulator,
      qualityScore: result.qualityScore,
      differentiationScore: result.differentiationScore,
      normalizedSimilarityPercent: result.normalizedSimilarityPercent,
      visibleWordCount: result.visibleWordCount,
      claimsSafetyPassed: result.claimsSafetyPassed,
      approvedIndexableCandidate: true,
      addedToSitemap: false,
    }));
  const report = {
    schemaVersion: 1,
    batch: 1,
    generatedAt: new Date().toISOString(),
    selection: {
      method: 'Deterministic stratified selection from supported rows; 50% India and 50% worldwide, then proportional country/geographic-level quotas and systematic positions within each stratum.',
      requested: batchSize,
      evaluated: results.length,
      sourceClassification: path.relative(ROOT, CLASSIFICATION_PATH),
      sourceClassificationGeneratedAt: selection.classificationSummary.generatedAt,
      sourceClassificationRows: selection.sourceRows,
      sourceSupportedRows: selection.supportedCount,
      registrySupportedCounts: selection.registrySupportedCounts,
      registryTargets: selection.registryTargets,
      strata: selection.strata,
      evaluatedByRegistry: registryCounts,
      evaluatedByCountry: countryCounts,
      evaluatedByGeographicLevel: geographicLevelCounts,
    },
    metrics: {
      totalEvaluated: results.length,
      ...statusCounts,
      SUPPORTED: results.filter(({ classificationStatus }) => classificationStatus === 'SUPPORTED').length,
      AMBIGUOUS: ambiguousCount,
      missingRegulator: missingRegulatorCount,
      missingGeographicHierarchy: missingHierarchyCount,
      missingLocationData: missingLocationDataCount,
      qualityFailures: quality.counts.qualityFailures,
      differentiationFailures: quality.counts.differentiationFailures,
      exactDuplicates: quality.counts.exactDuplicates,
      nearDuplicates: quality.counts.nearDuplicates,
      nearDuplicateRatePercent: quality.counts.nearDuplicateRatePercent,
      nearDuplicateMethod: `Same-country and same-geographic-level comparisons, at most ${MAX_PEER_COMPARISONS} evenly distributed peers per generated page; threshold ${GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.maxNormalizedSimilarityPercent}% normalized token similarity.`,
      peerComparedLocations: quality.counts.peerComparedLocations,
      averageDifferentiationScore: quality.counts.averageDifferentiationScore,
      minimumDifferentiationScore: quality.counts.minimumDifferentiationScore,
      maximumDifferentiationScore: quality.counts.maximumDifferentiationScore,
      averageQualityScore: quality.counts.averageQualityScore,
      qualityDistribution: quality.histogram,
      averageWordCount: quality.counts.averageWordCount,
      wordCountEvaluated: quality.counts.wordCountEvaluated,
      safetyGateFailures: safetyFailureCount,
      qualityScoreDefinition: 'The existing location content composer quality score (0-100); unresolved/rejected records score 0.',
      differentiationScoreDefinition: '100 minus the maximum normalized token similarity against same-country/geographic-level peers. Differentiation aggregates and the lowest-score examples include only successfully generated pages; records without generated content receive quality score 0 but are not assigned a differentiation score.',
      sitemapModified: false,
    },
    examples: {
      INDEXABLE: indexable,
      NOINDEX: topExamples(finalResults, 'NOINDEX'),
      RESEARCH: topExamples(finalResults, 'RESEARCH'),
      REJECTED: topExamples(finalResults, 'REJECTED'),
      lowestDifferentiation: finalResults
        .filter(({ claimsSafetyPassed }) => claimsSafetyPassed === true)
        .sort(compareByLowestDifferentiation)
        .slice(0, 20),
    },
    locations: finalResults,
  };
  const reportPath = path.resolve(
    process.env.PILOT_TRAINING_LOCATION_BATCH_REPORT || DEFAULT_REPORT_PATH,
  );
  const candidatesPath = path.resolve(
    process.env.PILOT_TRAINING_LOCATION_BATCH_CANDIDATES || DEFAULT_CANDIDATES_PATH,
  );
  if (reportPath === candidatesPath) throw new Error('The report and candidate list paths must differ.');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.mkdirSync(path.dirname(candidatesPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(candidatesPath, `${JSON.stringify({
    schemaVersion: 1,
    batch: 1,
    generatedAt: report.generatedAt,
    selection: report.selection,
    totalCandidates: candidates.length,
    sitemapModified: false,
    candidates,
  }, null, 2)}\n`);
  console.log(JSON.stringify({
    reportPath: path.relative(ROOT, reportPath),
    candidatesPath: path.relative(ROOT, candidatesPath),
    metrics: report.metrics,
    elapsedSeconds: Number(((performance.now() - startedAt) / 1000).toFixed(1)),
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
