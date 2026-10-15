import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import {
  computeWorldwidePublicationFingerprint,
  getWorldwidePublicationFingerprintInputPaths,
  getWorldwidePublicationInventoryPaths,
  normalizeWorldwidePublicationFingerprintPath,
  readWorldwidePublicationInventory,
  writeWorldwidePublicationInventory,
} from '../lib/worldwidePublicationInventory.js';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function createFixture() {
  const fixtureDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'worldwide-publication-fingerprint-'),
  );
  for (const sourcePath of getWorldwidePublicationFingerprintInputPaths(rootDirectory)) {
    const relativePath = path.relative(rootDirectory, sourcePath);
    const targetPath = path.join(fixtureDirectory, relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
  }
  return fixtureDirectory;
}

function changeFile(fixtureDirectory, relativePath, update) {
  const filePath = path.join(fixtureDirectory, relativePath);
  const contents = fs.readFileSync(filePath);
  fs.writeFileSync(filePath, update(contents));
}

function assertFingerprintChanges(relativePath, update) {
  const fixtureDirectory = createFixture();
  try {
    const before = computeWorldwidePublicationFingerprint(fixtureDirectory).fingerprint;
    changeFile(fixtureDirectory, relativePath, update);
    const after = computeWorldwidePublicationFingerprint(fixtureDirectory).fingerprint;
    assert.notEqual(after, before, `${relativePath} must invalidate the inventory fingerprint.`);
  } finally {
    fs.rmSync(fixtureDirectory, { recursive: true, force: true });
  }
}

function testInventoryWrites(fixtureDirectory) {
  const current = computeWorldwidePublicationFingerprint(fixtureDirectory);
  const inventory = {
    version: 2,
    sourceFingerprint: current.fingerprint,
    provenance: 'full-quality-evaluation',
    registry: current.registry,
    evaluation: {
      evaluatedWorldwideRoutes: current.registry.supportedLocationCount,
      rejectedWorldwideRoutes: 0,
    },
    approvedRoutes: [],
  };
  const paths = getWorldwidePublicationInventoryPaths(fixtureDirectory);
  writeWorldwidePublicationInventory(inventory, fixtureDirectory);
  assert.equal(
    readWorldwidePublicationInventory(fixtureDirectory).sourceFingerprint,
    current.fingerprint,
    'A completed inventory write must pass checksum, provenance and fingerprint validation.',
  );
  writeWorldwidePublicationInventory(inventory, fixtureDirectory);
  assert.equal(
    readWorldwidePublicationInventory(fixtureDirectory).sourceFingerprint,
    current.fingerprint,
    'Atomic renames must safely replace an existing inventory on this platform.',
  );
  assert.deepEqual(
    fs.readdirSync(path.dirname(paths.inventoryPath))
      .filter((fileName) => fileName.includes('.tmp-')),
    [],
    'Successful writes must not leave temporary inventory files behind.',
  );
  fs.appendFileSync(paths.checksumPath, 'corruption');
  assert.throws(
    () => readWorldwidePublicationInventory(fixtureDirectory),
    (error) => error.code === 'WORLDWIDE_PUBLICATION_INVENTORY_CORRUPT',
    'An interrupted or corrupt inventory/checksum pair must fail closed.',
  );
  const invalidInventory = gzipSync(Buffer.from('null'));
  fs.writeFileSync(paths.inventoryPath, invalidInventory);
  const checksum = createHash('sha256').update(invalidInventory).digest('hex');
  fs.writeFileSync(
    paths.checksumPath,
    `${checksum}  ${path.basename(paths.inventoryPath)}\n`,
  );
  assert.throws(
    () => readWorldwidePublicationInventory(fixtureDirectory),
    (error) => error.code === 'WORLDWIDE_PUBLICATION_INVENTORY_INVALID',
    'A well-checksummed but structurally invalid inventory must fail closed.',
  );
}

function appendText(contents, value) {
  return Buffer.from(`${contents.toString('utf8')}${value}`, 'utf8');
}

function main() {
  assert.equal(
    normalizeWorldwidePublicationFingerprintPath('data\\location-seo/file.js'),
    'data/location-seo/file.js',
  );
  assert.equal(
    normalizeWorldwidePublicationFingerprintPath('data/location-seo/file.js'),
    normalizeWorldwidePublicationFingerprintPath('data\\location-seo\\file.js'),
  );

  const fixtureDirectory = createFixture();
  try {
    const baseline = computeWorldwidePublicationFingerprint(fixtureDirectory).fingerprint;
    for (const sourcePath of getWorldwidePublicationFingerprintInputPaths(fixtureDirectory)) {
      if (sourcePath.endsWith('.gz')) continue;
      const contents = fs.readFileSync(sourcePath, 'utf8');
      fs.writeFileSync(sourcePath, contents.replace(/\r\n?/g, '\n').replace(/\n/g, '\r\n'));
    }
    assert.equal(
      computeWorldwidePublicationFingerprint(fixtureDirectory).fingerprint,
      baseline,
      'Windows/Linux line-ending differences must not invalidate the inventory.',
    );

    const unrelatedPost = path.join(
      fixtureDirectory,
      'public',
      'content',
      'unrelated-blog-post.md',
    );
    fs.writeFileSync(unrelatedPost, 'Initial unrelated blog post.\n');
    const withUnrelatedPost = computeWorldwidePublicationFingerprint(fixtureDirectory).fingerprint;
    fs.writeFileSync(unrelatedPost, 'Edited unrelated blog post.\r\n');
    assert.equal(
      computeWorldwidePublicationFingerprint(fixtureDirectory).fingerprint,
      withUnrelatedPost,
      'Unselected blog Markdown must not invalidate the inventory.',
    );
  } finally {
    fs.rmSync(fixtureDirectory, { recursive: true, force: true });
  }

  assertFingerprintChanges(
    'data/location-seo/geographic-indexability-policy.js',
    (contents) => appendText(contents, '\n// policy change\n'),
  );
  assertFingerprintChanges(
    'public/content/ground_school_guide.md',
    (contents) => appendText(contents, '\nSource content change.\n'),
  );
  assertFingerprintChanges(
    'data/locations/source/world-geonames-source-manifest.json',
    (contents) => {
      const manifest = JSON.parse(contents.toString('utf8'));
      manifest.allCountries.sha256 = `${manifest.allCountries.sha256[0] === '0' ? '1' : '0'}`
        + manifest.allCountries.sha256.slice(1);
      return Buffer.from(`${JSON.stringify(manifest)}\n`, 'utf8');
    },
  );
  assertFingerprintChanges(
    'lib/locationContentDifferentiation.js',
    (contents) => appendText(contents, '\n// evaluator change\n'),
  );
  assertFingerprintChanges(
    'lib/locationEngine.js',
    (contents) => appendText(contents, '\n// publication decision dependency change\n'),
  );

  const writeFixture = createFixture();
  try {
    testInventoryWrites(writeFixture);
  } finally {
    fs.rmSync(writeFixture, { recursive: true, force: true });
  }

  console.log('Worldwide publication inventory fingerprint tests passed.');
}

main();
