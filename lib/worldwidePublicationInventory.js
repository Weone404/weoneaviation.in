import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { gzipSync, gunzipSync } from 'node:zlib';
import { getWorldGeographicRegistrySummary } from './worldGeographicRegistry.js';
import { getPilotTrainingKnowledgeSourceFiles } from './pilotTrainingKnowledge.js';

export const WORLDWIDE_PUBLICATION_INVENTORY_VERSION = 2;
export const WORLDWIDE_PUBLICATION_EVALUATION_COMPATIBILITY_VERSION = 1;

const INVENTORY_FILE = path.join(
  'data',
  'location-seo',
  'geography',
  'worldwide-publication-inventory.json.gz',
);
const CHECKSUM_FILE = `${INVENTORY_FILE}.sha256`;
const EVALUATION_INPUTS = [
  'data/location-seo/aviation-evidence.js',
  'data/location-seo/aviation-market-pages.js',
  'data/location-seo/aviation-regulatory-contexts.js',
  'data/location-seo/dgca-fto-roster.js',
  'data/location-seo/geographic-indexability-policy.js',
  'data/location-seo/geography/global-aviation-markets.js',
  'data/location-seo/geography/global-pilot.js',
  'data/location-seo/geography/india-aviation-candidate-geography.js',
  'data/location-seo/geography/india-locality-overlay.json',
  'data/location-seo/geography/real-sample.js',
  'data/location-seo/global-aviation-intents.js',
  'data/location-seo/india-aviation-evidence.generated.js',
  'data/location-seo/india-dynamic-service-policies.js',
  'data/location-seo/international-candidates.js',
  'data/location-seo/locations.js',
  'data/location-seo/medical-centres.js',
  'data/location-seo/production-candidate-registry.js',
  'data/location-seo/production-route-approvals.js',
  'data/location-seo/production-route-revocations.js',
  'data/location-seo/services.js',
  'data/location-seo/world-dynamic-service-policies.js',
  'data/local-seo/locality-geography-source.json',
  'data/local-seo/localities.json',
  'data/locations/source/india-geonames-source-manifest.json',
  'data/locations/source/world-geonames-source-manifest.json',
  'lib/geographicData.js',
  'lib/geographicSourceAdapters.js',
  'lib/geographicServicePage.js',
  'lib/indiaAviationEvidenceIngestion.js',
  'lib/indiaGeographicRegistry.js',
  'lib/indiaGeographicRouteSlug.js',
  'lib/indiaLocationContentEngine.js',
  'lib/indiaLocationQuality.js',
  'lib/locationContentComposer.js',
  'lib/locationContentDifferentiation.js',
  'lib/locationEngine.js',
  'lib/locationIndexabilityPolicy.js',
  'lib/locationPilotTrainingPage.js',
  'lib/locationPromotionPipeline.js',
  'lib/locationSeo.js',
  'lib/locationTrainingContext.js',
  'lib/pilotTrainingKnowledge.js',
  'lib/worldGeographicRegistry.js',
  'lib/worldGeographicSitemap.js',
  'lib/worldLocationContentEngine.js',
  'lib/worldwidePublicationInventory.js',
  'scripts/build-india-geography.js',
  'scripts/build-india-geographic-index.mjs',
  'scripts/build-world-geographic-index.mjs',
  'scripts/cache-approved-geographic-sitemap-routes.mjs',
  'scripts/generate-india-aviation-candidate-geography.mjs',
  'scripts/ingest-india-aviation-evidence.mjs',
];
const REGISTRY_INPUTS = [
  'data/locations/source/india-geonames-source-manifest.json',
  'data/locations/source/world-geonames-source-manifest.json',
];

export function normalizeWorldwidePublicationFingerprintPath(relativePath) {
  return relativePath.replace(/[\\/]+/g, '/');
}

function selectedContentFiles(directory) {
  if (!fs.existsSync(directory)) {
    throw new Error(`Worldwide publication content source is missing: ${directory}`);
  }
  return getPilotTrainingKnowledgeSourceFiles().map((sourceFile) => {
    const fullPath = path.join(directory, sourceFile);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Worldwide publication content source is missing: ${fullPath}`);
    }
    return fullPath;
  });
}

function evaluationInputPaths(rootDir) {
  const requiredInputs = [...new Set([...EVALUATION_INPUTS, ...REGISTRY_INPUTS])];
  const missing = requiredInputs.filter((relativePath) => (
    !fs.existsSync(path.join(rootDir, relativePath))
  ));
  if (missing.length) {
    throw new Error(`Worldwide publication evaluation inputs are missing: ${missing.join(', ')}.`);
  }
  const paths = [
    ...requiredInputs.map((relativePath) => path.join(rootDir, relativePath)),
    ...selectedContentFiles(path.join(rootDir, 'public', 'content')),
  ];
  return [...new Set(paths)].sort((left, right) => {
    const leftPath = normalizeWorldwidePublicationFingerprintPath(path.relative(rootDir, left));
    const rightPath = normalizeWorldwidePublicationFingerprintPath(path.relative(rootDir, right));
    return leftPath < rightPath ? -1 : leftPath > rightPath ? 1 : 0;
  });
}

export function getWorldwidePublicationFingerprintInputPaths(rootDir = process.cwd()) {
  return evaluationInputPaths(path.resolve(rootDir));
}

export function computeWorldwidePublicationFingerprint(rootDir = process.cwd()) {
  const resolvedRoot = path.resolve(rootDir);
  const hash = createHash('sha256');
  hash.update(`evaluation-compatibility:${WORLDWIDE_PUBLICATION_EVALUATION_COMPATIBILITY_VERSION}\0`);
  for (const filePath of evaluationInputPaths(resolvedRoot)) {
    const relativePath = normalizeWorldwidePublicationFingerprintPath(
      path.relative(resolvedRoot, filePath),
    );
    const contents = filePath.endsWith('.gz')
      ? fs.readFileSync(filePath)
      : fs.readFileSync(filePath, 'utf8').replace(/\r\n?/g, '\n');
    hash.update(relativePath).update('\0').update(contents).update('\0');
  }
  const registry = getWorldGeographicRegistrySummary();
  hash.update(JSON.stringify(registry));
  return { fingerprint: hash.digest('hex'), registry };
}

export function getWorldwidePublicationInventoryPaths(rootDir = process.cwd()) {
  return {
    inventoryPath: path.join(rootDir, INVENTORY_FILE),
    checksumPath: path.join(rootDir, CHECKSUM_FILE),
  };
}

export function readWorldwidePublicationInventory(rootDir = process.cwd()) {
  const { inventoryPath, checksumPath } = getWorldwidePublicationInventoryPaths(rootDir);
  if (!fs.existsSync(inventoryPath) || !fs.existsSync(checksumPath)) {
    const error = new Error(
      'The fingerprinted worldwide publication inventory is missing. '
      + 'Run "npm run cache:approved-geographic-sitemap -- --refresh" to regenerate it.',
    );
    error.code = 'WORLDWIDE_PUBLICATION_INVENTORY_MISSING';
    throw error;
  }
  const compressed = fs.readFileSync(inventoryPath);
  const checksumManifest = fs.readFileSync(checksumPath, 'utf8');
  const checksumMatch = /^([a-f0-9]{64})  ([^\r\n]+)\r?\n?$/.exec(checksumManifest);
  const actualChecksum = createHash('sha256').update(compressed).digest('hex');
  if (!checksumMatch
    || checksumMatch[2] !== path.basename(inventoryPath)
    || actualChecksum !== checksumMatch[1]) {
    const error = new Error('The worldwide publication inventory checksum does not match its manifest.');
    error.code = 'WORLDWIDE_PUBLICATION_INVENTORY_CORRUPT';
    throw error;
  }

  let inventory;
  try {
    inventory = JSON.parse(gunzipSync(compressed).toString('utf8'));
  } catch (error) {
    const unreadable = new Error(`The worldwide publication inventory is unreadable: ${error.message}`);
    unreadable.code = 'WORLDWIDE_PUBLICATION_INVENTORY_CORRUPT';
    throw unreadable;
  }
  if (!inventory
    || typeof inventory !== 'object'
    || Array.isArray(inventory)
    || inventory.version !== WORLDWIDE_PUBLICATION_INVENTORY_VERSION
    || inventory.provenance !== 'full-quality-evaluation'
    || !Number.isSafeInteger(inventory.evaluation?.evaluatedWorldwideRoutes)
    || !Number.isSafeInteger(inventory.evaluation?.rejectedWorldwideRoutes)
    || !Array.isArray(inventory.approvedRoutes)) {
    const error = new Error('The worldwide publication inventory has an unsupported format.');
    error.code = 'WORLDWIDE_PUBLICATION_INVENTORY_INVALID';
    throw error;
  }
  const current = computeWorldwidePublicationFingerprint(rootDir);
  if (inventory.sourceFingerprint !== current.fingerprint
    || JSON.stringify(inventory.registry) !== JSON.stringify(current.registry)) {
    const error = new Error(
      'The worldwide publication inventory is stale for the current source, policy, or geographic registry. '
      + 'Run "npm run cache:approved-geographic-sitemap -- --refresh" to repeat the full quality evaluation.',
    );
    error.code = 'WORLDWIDE_PUBLICATION_INVENTORY_STALE';
    throw error;
  }
  return inventory;
}

export function writeWorldwidePublicationInventory(inventory, rootDir = process.cwd()) {
  const { inventoryPath, checksumPath } = getWorldwidePublicationInventoryPaths(rootDir);
  const current = computeWorldwidePublicationFingerprint(rootDir);
  if (inventory.version !== WORLDWIDE_PUBLICATION_INVENTORY_VERSION
    || inventory.provenance !== 'full-quality-evaluation'
    || !Number.isSafeInteger(inventory.evaluation?.evaluatedWorldwideRoutes)
    || inventory.evaluation.evaluatedWorldwideRoutes < current.registry.supportedLocationCount
    || !Array.isArray(inventory.approvedRoutes)
    || inventory.sourceFingerprint !== current.fingerprint
    || JSON.stringify(inventory.registry) !== JSON.stringify(current.registry)) {
    throw new Error(
      'Refusing to cache worldwide publication decisions without a complete, current full quality evaluation.',
    );
  }
  const compressed = gzipSync(Buffer.from(JSON.stringify(inventory)), { level: 9 });
  const checksum = createHash('sha256').update(compressed).digest('hex');
  fs.mkdirSync(path.dirname(inventoryPath), { recursive: true });

  for (const [filePath, contents] of [
    [inventoryPath, compressed],
    [checksumPath, Buffer.from(`${checksum}  ${path.basename(inventoryPath)}\n`)],
  ]) {
    const temporaryPath = `${filePath}.tmp-${process.pid}-${randomUUID()}`;
    try {
      fs.writeFileSync(temporaryPath, contents, { flag: 'wx' });
      fs.renameSync(temporaryPath, filePath);
    } catch (error) {
      if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
      throw error;
    }
  }
  return { inventoryPath, checksumPath, checksum, compressedBytes: compressed.length };
}
