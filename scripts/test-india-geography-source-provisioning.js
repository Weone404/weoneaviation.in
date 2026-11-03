const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const JSZip = require('jszip');
const manifest = require('../data/locations/source/india-geonames-source-manifest.json');
const {
  sha256,
  validateArchiveBuffer,
  validateTabularBuffer,
  downloadPinnedSource,
} = require('./provision-india-geography-sources');

async function createArchive(entryName, contents) {
  const archive = new JSZip();
  archive.file(entryName, contents);
  return archive.generateAsync({ type: 'nodebuffer' });
}

async function main() {
  const sourceEntries = Object.entries(manifest).filter(([, source]) => (
    source && typeof source === 'object'
  ));
  for (const [id, source] of sourceEntries) {
    const url = source.url || source.upstreamUrl;
    assert.match(url, /^https:\/\/download\.geonames\.org\//, `${id}: source URL is pinned.`);
    assert.match(source.sha256, /^[a-f0-9]{64}$/, `${id}: SHA-256 is pinned.`);
  }
  for (const id of ['gazetteer', 'admin1', 'admin2']) {
    assert.equal(
      manifest[id].checksumPolicy,
      'latest-validated',
      `${id}: the mutable GeoNames export is validated instead of treated as immutable.`,
    );
    assert.ok(manifest[id].minimumRows > 0, `${id}: a minimum row count is enforced.`);
  }

  const postalPath = path.join(__dirname, '..', 'data', 'locations', 'source', manifest.postal.repositoryFile);
  const postalBuffer = fs.readFileSync(postalPath);
  assert.equal(sha256(postalBuffer), manifest.postal.sha256, 'Tracked postal archive matches its immutable pin.');
  const postalDetails = await validateArchiveBuffer(postalBuffer, { ...manifest.postal, id: 'postal' });
  assert.ok(postalDetails.rows > 0, 'Tracked postal archive contains valid Indian rows.');

  const gazetteerRow = [
    '1', 'Example', 'Example', '', '28.0', '77.0', 'P', 'PPL', 'IN',
    '', '07', '001', '', '', '', '', '', 'Asia/Kolkata', '2024-01-01',
  ].join('\t');
  const gazetteerZip = await createArchive('IN.txt', `${gazetteerRow}\n`);
  const gazetteerDetails = await validateArchiveBuffer(gazetteerZip, {
    id: 'gazetteer-test',
    archiveEntry: 'IN.txt',
    columns: manifest.gazetteer.columns,
    countryColumn: manifest.gazetteer.countryColumn,
    countryCode: 'IN',
  });
  assert.equal(gazetteerDetails.rows, 1);
  await assert.rejects(
    validateArchiveBuffer(gazetteerZip, {
      id: 'short-gazetteer-test',
      archiveEntry: 'IN.txt',
      columns: manifest.gazetteer.columns,
      countryColumn: manifest.gazetteer.countryColumn,
      countryCode: 'IN',
      minimumRows: 2,
    }),
    /expected at least 2/,
  );

  const adminCodes = Buffer.from('IN.01\tState\tState\t1\n', 'utf8');
  assert.equal(
    validateTabularBuffer(adminCodes, { sourceName: 'admin1-test', columns: manifest.admin1.columns }),
    1,
  );
  assert.throws(
    () => validateTabularBuffer(Buffer.from('not\ttabular\n'), {
      sourceName: 'invalid-test',
      columns: 4,
    }),
    /expected at least 4/,
  );
  await assert.rejects(
    validateArchiveBuffer(Buffer.from('not a zip'), {
      id: 'invalid-archive-test',
      archiveEntry: 'IN.txt',
      columns: 19,
    }),
    /not a valid GeoNames ZIP archive/,
  );

  const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'india-geonames-provisioning-'));
  const cachePath = path.join(cacheDir, 'gazetteer.zip');
  const strictPath = path.join(cacheDir, 'strict-gazetteer.zip');
  const updatedRow = gazetteerRow.replace(/^1\t/, '2\t').replace('Example', 'Updated');
  const updatedArchive = await createArchive('IN.txt', `${gazetteerRow}\n${updatedRow}\n`);
  const baselineArchive = await createArchive('IN.txt', `${gazetteerRow}\n`);
  const source = {
    id: 'gazetteer-test',
    url: 'https://download.geonames.org/export/dump/IN.zip',
    sha256: sha256(baselineArchive),
    checksumPolicy: 'latest-validated',
    minimumRows: 1,
    archiveEntry: 'IN.txt',
    columns: manifest.gazetteer.columns,
    countryColumn: manifest.gazetteer.countryColumn,
    countryCode: manifest.gazetteer.countryCode,
  };
  const originalFetch = global.fetch;
  try {
    global.fetch = async () => new Response(Buffer.from('not a zip'), {
      status: 200,
      headers: { 'content-type': 'application/zip' },
    });
    await assert.rejects(downloadPinnedSource(source, cachePath), /not a valid GeoNames ZIP archive/);
    assert.equal(fs.existsSync(cachePath), false, 'An invalid download is not cached.');

    global.fetch = async () => new Response(updatedArchive, {
      status: 200,
      headers: { 'content-type': 'application/zip' },
    });
    const updatedDetails = await downloadPinnedSource(source, cachePath);
    assert.equal(updatedDetails.rows, 2);
    assert.equal(updatedDetails.sha256, sha256(updatedArchive));
    assert.deepEqual(fs.readFileSync(cachePath), updatedArchive, 'A changed source is cached after validation.');

    await assert.rejects(
      downloadPinnedSource({ ...source, checksumPolicy: undefined }, strictPath),
      /checksum mismatch/,
    );
    assert.equal(fs.existsSync(strictPath), false, 'Sources without the update policy retain strict checksum pinning.');
  } finally {
    global.fetch = originalFetch;
    fs.rmSync(cacheDir, { recursive: true, force: true });
  }

  console.log(JSON.stringify({
    pinnedSources: sourceEntries.length,
    trackedPostalArchive: { bytes: postalBuffer.length, rows: postalDetails.rows },
    archiveAndTsvValidation: 'passed',
    latestSourceUpdatePolicy: 'passed',
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
