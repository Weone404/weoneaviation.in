const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const JSZip = require('jszip');
const manifest = require('../data/locations/source/india-geonames-source-manifest.json');
const {
  sha256,
  validateArchiveBuffer,
  validateTabularBuffer,
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
  assert.throws(
    () => validateTabularBuffer(Buffer.from('<!doctype html><html><body>Not found</body></html>'), {
      sourceName: 'html-error-test',
      columns: 4,
    }),
    /HTML error page/,
  );
  assert.throws(
    () => validateTabularBuffer(Buffer.from([0xc3, 0x28]), {
      sourceName: 'invalid-utf8-test',
      columns: 4,
    }),
    /not valid UTF-8/,
  );
  await assert.rejects(
    validateArchiveBuffer(Buffer.from('not a zip'), {
      id: 'invalid-archive-test',
      archiveEntry: 'IN.txt',
      columns: 19,
    }),
    /not a valid GeoNames ZIP archive/,
  );
  await assert.rejects(
    validateArchiveBuffer(Buffer.from('<html><body>Gateway error</body></html>'), {
      id: 'html-archive-test',
      archiveEntry: 'IN.txt',
      columns: 19,
    }),
    /HTML error page/,
  );

  console.log(JSON.stringify({
    pinnedSources: sourceEntries.length,
    trackedPostalArchive: { bytes: postalBuffer.length, rows: postalDetails.rows },
    archiveAndTsvValidation: 'passed',
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
