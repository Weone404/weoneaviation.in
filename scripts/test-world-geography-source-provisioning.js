const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const JSZip = require('jszip');
const manifest = require('../data/locations/source/world-geonames-source-manifest.json');
const {
  sha256,
  validateArchiveBuffer,
  validateTabularBuffer,
  downloadSource,
} = require('./provision-world-geography-sources');

async function createArchive(entryName, contents) {
  const archive = new JSZip();
  archive.file(entryName, contents);
  return archive.generateAsync({ type: 'nodebuffer' });
}

async function main() {
  const sources = Object.entries(manifest).filter(([id]) => id !== 'version');
  for (const [id, source] of sources) {
    assert.match(source.url, /^https:\/\/download\.geonames\.org\/export\/dump\//, `${id}: official URL is pinned.`);
    assert.match(source.sha256, /^[a-f0-9]{64}$/, `${id}: SHA-256 is pinned.`);
    assert.ok(source.file, `${id}: provisioned filename is declared.`);
    assert.equal(
      source.checksumPolicy,
      'latest-validated',
      `${id}: the mutable GeoNames export is validated instead of treated as immutable.`,
    );
    assert.ok(source.minimumRows > 0, `${id}: a minimum row count is enforced.`);
  }

  const geonamesRow = [
    '1', 'Example', 'Example', '', '28.0', '77.0', 'P', 'PPL', 'IN',
    '', '07', '001', '', '', '', '', '', 'Asia/Kolkata', '2024-01-01',
  ].join('\t');
  const archive = await createArchive('allCountries.txt', `${geonamesRow}\n`);
  const archiveDetails = await validateArchiveBuffer(archive, {
    ...manifest.allCountries,
    id: 'world-archive-test',
    minimumRows: 1,
  });
  assert.equal(archiveDetails.archiveEntry, 'allCountries.txt');
  assert.equal(archiveDetails.validatedRows, 1);
  await assert.rejects(
    validateArchiveBuffer(archive, {
      ...manifest.allCountries,
      id: 'short-world-archive-test',
    }),
    /expected at least 12000000/,
  );
  await assert.rejects(
    validateArchiveBuffer(Buffer.from('not a zip'), {
      ...manifest.allCountries,
      id: 'invalid-archive-test',
    }),
    /not a valid GeoNames ZIP archive/,
  );
  await assert.rejects(
    validateArchiveBuffer(await createArchive('wrong.txt', 'content\n'), {
      ...manifest.allCountries,
      id: 'missing-entry-test',
    }),
    /does not contain allCountries.txt/,
  );

  const countryInfo = Array(17).fill('');
  countryInfo[0] = 'IN';
  countryInfo[4] = 'India';
  assert.equal(
    validateTabularBuffer(Buffer.from(`${countryInfo.join('\t')}\n`), {
      ...manifest.countryInfo,
      id: 'country-info-test',
      minimumRows: 1,
    }),
    1,
  );
  assert.throws(
    () => validateTabularBuffer(Buffer.from('short\trow\n'), {
      ...manifest.admin1,
      id: 'invalid-admin-test',
    }),
    /has 2 columns; expected at least 4/,
  );
  assert.notEqual(sha256(Buffer.from('source')), manifest.allCountries.sha256);

  const cacheDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'world-geonames-provisioning-'));
  const latestPath = path.join(cacheDirectory, 'latest.zip');
  const strictPath = path.join(cacheDirectory, 'strict.zip');
  const updatedArchive = await createArchive('allCountries.txt', `${geonamesRow}\n${geonamesRow.replace(/^1\t/, '2\t')}\n`);
  const source = {
    ...manifest.allCountries,
    id: 'world-archive-update-test',
    sha256: sha256(archive),
    minimumRows: 1,
  };
  const originalFetch = global.fetch;
  try {
    global.fetch = async () => new Response(updatedArchive, {
      status: 200,
      headers: { 'content-type': 'application/zip' },
    });
    const updatedDetails = await downloadSource(source, latestPath);
    assert.equal(updatedDetails.validatedRows, 2);
    assert.equal(updatedDetails.sha256, sha256(updatedArchive));
    assert.deepEqual(fs.readFileSync(latestPath), updatedArchive, 'A changed source is cached after validation.');

    await assert.rejects(
      downloadSource({ ...source, checksumPolicy: undefined }, strictPath),
      /checksum mismatch/,
    );
    assert.equal(fs.existsSync(strictPath), false, 'Sources without the update policy retain strict checksum pinning.');
  } finally {
    global.fetch = originalFetch;
    fs.rmSync(cacheDirectory, { recursive: true, force: true });
  }

  console.log(JSON.stringify({
    pinnedSources: sources.length,
    archiveContentAndRowValidation: 'passed',
    countryAndAdministrativeTsvValidation: 'passed',
    latestSourceUpdatePolicy: 'passed',
  }, null, 2));
}

main().catch((error) => {
  console.error(`test-world-geography-source-provisioning: ${error.stack || error.message}`);
  process.exitCode = 1;
});
