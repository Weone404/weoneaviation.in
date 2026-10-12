import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync, gunzipSync } from 'node:zlib';
import { getWorldGeographicRegistrySummary } from './worldGeographicRegistry.js';

export const WORLDWIDE_PUBLICATION_INVENTORY_VERSION = 2;

const INVENTORY_FILE = path.join(
  'data',
  'location-seo',
  'geography',
  'worldwide-publication-inventory.json.gz',
);
const CHECKSUM_FILE = `${INVENTORY_FILE}.sha256`;
const EVALUATION_INPUTS = [
  'data/location-seo/aviation-evidence.js',
  'data/location-seo/aviation-regulatory-contexts.js',
  'data/location-seo/dgca-fto-roster.js',
  'data/location-seo/geographic-indexability-policy.js',
  'data/location-seo/geography/global-aviation-markets.js',
  'data/location-seo/geography/global-pilot.js',
  'data/location-seo/geography/real-sample.js',
  'data/location-seo/locations.js',
  'data/location-seo/production-route-approvals.js',
  'data/location-seo/production-route-revocations.js',
  'data/location-seo/services.js',
  'data/location-seo/world-dynamic-service-policies.js',
  'data/location-seo/geography/india-locality-overlay.json',
  'data/local-seo/locality-geography-source.json',
  'data/locations/source/india-geonames-source-manifest.json',
  'data/locations/source/world-geonames-source-manifest.json',
  'lib/locationContentComposer.js',
  'lib/locationContentDifferentiation.js',
  'lib/geographicServicePage.js',
  'lib/indiaGeographicRegistry.js',
  'lib/locationIndexabilityPolicy.js',
  'lib/locationPilotTrainingPage.js',
  'lib/locationTrainingContext.js',
  'lib/pilotTrainingKnowledge.js',
  'lib/worldGeographicRegistry.js',
  'lib/worldGeographicSitemap.js',
  'lib/worldLocationContentEngine.js',
  'lib/worldwidePublicationInventory.js',
  'scripts/build-world-geographic-index.js',
  'scripts/build-india-geography.js',
  'scripts/build-india-geographic-index.js',
  'scripts/cache-approved-geographic-sitemap-routes.js',
];

function contentFiles(directory) {
  if (!fs.existsSync(directory)) {
    throw new Error(`Worldwide publication content source is missing: ${directory}`);
  }
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return contentFiles(fullPath);
      return entry.isFile() && /\.md$/i.test(entry.name) ? [fullPath] : [];
    });
}

function evaluationInputPaths(rootDir) {
  const missing = EVALUATION_INPUTS.filter((relativePath) => (
    !fs.existsSync(path.join(rootDir, relativePath))
  ));
  if (missing.length) {
    throw new Error(`Worldwide publication evaluation inputs are missing: ${missing.join(', ')}.`);
  }
  return [
    ...EVALUATION_INPUTS.map((relativePath) => path.join(rootDir, relativePath)),
    ...contentFiles(path.join(rootDir, 'public', 'content')),
  ].sort();
}

export function computeWorldwidePublicationFingerprint(rootDir = process.cwd()) {
  const hash = createHash('sha256');
  hash.update(`node:${process.versions.node}\0`);
  for (const filePath of evaluationInputPaths(rootDir)) {
    const relativePath = path.relative(rootDir, filePath).split(path.sep).join('/');
    hash.update(relativePath).update('\0').update(fs.readFileSync(filePath)).update('\0');
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
    throw new Error(
      'The fingerprinted worldwide publication inventory is missing. '
      + 'Run "npm run cache:approved-geographic-sitemap -- --refresh" to regenerate it.',
    );
  }
  const compressed = fs.readFileSync(inventoryPath);
  const expectedChecksum = fs.readFileSync(checksumPath, 'utf8').trim().split(/\s+/)[0];
  const actualChecksum = createHash('sha256').update(compressed).digest('hex');
  if (!/^[a-f0-9]{64}$/.test(expectedChecksum) || actualChecksum !== expectedChecksum) {
    throw new Error('The worldwide publication inventory checksum does not match its manifest.');
  }

  let inventory;
  try {
    inventory = JSON.parse(gunzipSync(compressed).toString('utf8'));
  } catch (error) {
    throw new Error(`The worldwide publication inventory is unreadable: ${error.message}`);
  }
  if (inventory.version !== WORLDWIDE_PUBLICATION_INVENTORY_VERSION
    || inventory.provenance !== 'full-quality-evaluation'
    || !Number.isSafeInteger(inventory.evaluation?.evaluatedWorldwideRoutes)
    || !Number.isSafeInteger(inventory.evaluation?.rejectedWorldwideRoutes)
    || !Array.isArray(inventory.approvedRoutes)) {
    throw new Error('The worldwide publication inventory has an unsupported format.');
  }
  const current = computeWorldwidePublicationFingerprint(rootDir);
  if (inventory.sourceFingerprint !== current.fingerprint
    || JSON.stringify(inventory.registry) !== JSON.stringify(current.registry)) {
    throw new Error(
      'The worldwide publication inventory is stale for the current source, policy, or geographic registry. '
      + 'Run "npm run cache:approved-geographic-sitemap -- --refresh" to repeat the full quality evaluation.',
    );
  }
  return inventory;
}

export function writeWorldwidePublicationInventory(inventory, rootDir = process.cwd()) {
  const { inventoryPath, checksumPath } = getWorldwidePublicationInventoryPaths(rootDir);
  const compressed = gzipSync(Buffer.from(JSON.stringify(inventory)), { level: 9 });
  const checksum = createHash('sha256').update(compressed).digest('hex');
  fs.mkdirSync(path.dirname(inventoryPath), { recursive: true });

  for (const [filePath, contents] of [
    [inventoryPath, compressed],
    [checksumPath, Buffer.from(`${checksum}  ${path.basename(inventoryPath)}\n`)],
  ]) {
    const temporaryPath = `${filePath}.tmp-${process.pid}`;
    if (fs.existsSync(temporaryPath)) {
      throw new Error(`Inventory temporary file already exists; review it before retrying: ${temporaryPath}`);
    }
    fs.writeFileSync(temporaryPath, contents, { flag: 'wx' });
    try {
      fs.copyFileSync(temporaryPath, filePath);
    } finally {
      fs.unlinkSync(temporaryPath);
    }
  }
  return { inventoryPath, checksumPath, checksum, compressedBytes: compressed.length };
}
