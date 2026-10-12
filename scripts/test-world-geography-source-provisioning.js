const assert = require('node:assert/strict');
const JSZip = require('jszip');
const manifest = require('../data/locations/source/world-geonames-source-manifest.json');
const {
  sha256,
  validateArchiveBuffer,
  validateTabularBuffer,
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
  }

  const archive = await createArchive('allCountries.txt', 'pinned GeoNames archive entry\n');
  const archiveDetails = await validateArchiveBuffer(archive, {
    ...manifest.allCountries,
    id: 'world-archive-test',
  });
  assert.equal(archiveDetails.archiveEntry, 'allCountries.txt');
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

  console.log(JSON.stringify({
    pinnedSources: sources.length,
    archiveEntryValidation: 'passed',
    countryAndAdministrativeTsvValidation: 'passed',
  }, null, 2));
}

main().catch((error) => {
  console.error(`test-world-geography-source-provisioning: ${error.stack || error.message}`);
  process.exitCode = 1;
});
