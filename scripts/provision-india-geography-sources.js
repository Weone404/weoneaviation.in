const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const JSZip = require('jszip');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'data', 'locations', 'source');
const manifest = require('../data/locations/source/india-geonames-source-manifest.json');
const provisionedDir = path.join(sourceDir, 'provisioned');

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function assertNotHtml(buffer, sourceName) {
  const prefix = buffer.subarray(0, 512).toString('utf8').replace(/^\uFEFF/, '').trimStart();
  if (/^(?:<!doctype\s+html\b|<html\b|<head\b|<body\b)/i.test(prefix)) {
    throw new Error(`${sourceName} returned an HTML error page instead of a GeoNames source.`);
  }
}

function decodeSourceText(buffer, sourceName) {
  assertNotHtml(buffer, sourceName);
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buffer);
  } catch (error) {
    throw new Error(`${sourceName} is not valid UTF-8 GeoNames data: ${error.message}`);
  }
}

function validateTabularBuffer(buffer, { sourceName, columns, countryColumn, countryCode }) {
  const text = decodeSourceText(buffer, sourceName);
  const rows = text.split(/\r?\n/).filter(Boolean);
  if (!rows.length) throw new Error(`${sourceName} is empty.`);
  for (let index = 0; index < rows.length; index += 1) {
    const fields = rows[index].split('\t');
    if (fields.length < columns) {
      throw new Error(`${sourceName} row ${index + 1} has ${fields.length} columns; expected at least ${columns}.`);
    }
    if (countryColumn !== undefined && fields[countryColumn] !== countryCode) {
      throw new Error(`${sourceName} row ${index + 1} is not for country ${countryCode}.`);
    }
  }
  return rows.length;
}

async function validateArchiveBuffer(buffer, source) {
  assertNotHtml(buffer, source.id);
  let archive;
  try {
    archive = await JSZip.loadAsync(buffer, { checkCRC32: true });
  } catch (error) {
    throw new Error(`${source.id} is not a valid GeoNames ZIP archive: ${error.message}`);
  }
  const entry = archive.file(source.archiveEntry);
  if (!entry || entry.dir) {
    throw new Error(`${source.id} archive does not contain required ${source.archiveEntry}.`);
  }
  const contents = await entry.async('nodebuffer');
  const rows = validateTabularBuffer(contents, {
    sourceName: `${source.id}:${source.archiveEntry}`,
    columns: source.columns,
    countryColumn: source.countryColumn,
    countryCode: source.countryCode,
  });
  return { rows, bytes: contents.length };
}

async function verifyPinnedArchive(source, filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required tracked GeoNames source is missing: ${filePath}`);
  }
  const buffer = fs.readFileSync(filePath);
  const actualHash = sha256(buffer);
  if (actualHash !== source.sha256) {
    throw new Error(
      `${source.id} checksum mismatch at ${filePath}: expected ${source.sha256}, received ${actualHash}. Review the source update; this file was not changed.`,
    );
  }
  return validateArchiveBuffer(buffer, { ...source, id: source.id });
}

async function downloadPinnedSource(source, filePath) {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath);
    const actualHash = sha256(existing);
    if (actualHash !== source.sha256) {
      throw new Error(
        `${source.id} cached checksum mismatch at ${filePath}: expected ${source.sha256}, received ${actualHash}. Remove or review the cache before provisioning; it was not overwritten.`,
      );
    }
    if (source.archiveEntry) {
      return validateArchiveBuffer(existing, { ...source, id: source.id });
    }
    return {
      rows: validateTabularBuffer(existing, { ...source, sourceName: source.id }),
      bytes: existing.length,
    };
  }

  let response;
  try {
    response = await fetch(source.url, { signal: AbortSignal.timeout(120_000) });
  } catch (error) {
    throw new Error(`${source.id} download failed from ${source.url}: ${error.message}`);
  }
  if (!response.ok) {
    throw new Error(`${source.id} download failed: HTTP ${response.status} from ${source.url}`);
  }
  if (/^text\/html(?:;|$)/i.test(response.headers.get('content-type') || '')) {
    throw new Error(`${source.id} download returned HTML instead of a GeoNames source: ${source.url}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  const details = source.archiveEntry
    ? await validateArchiveBuffer(buffer, { ...source, id: source.id })
    : {
      rows: validateTabularBuffer(buffer, { ...source, sourceName: source.id }),
      bytes: buffer.length,
    };
  const actualHash = sha256(buffer);
  if (actualHash !== source.sha256) {
    throw new Error(
      `${source.id} download checksum mismatch: expected ${source.sha256}, received ${actualHash}; source ${source.url} may have changed.`,
    );
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  if (fs.existsSync(temporaryPath)) {
    throw new Error(`Provisioning temporary file already exists; review it before retrying: ${temporaryPath}`);
  }
  fs.writeFileSync(temporaryPath, buffer, { flag: 'wx' });
  fs.renameSync(temporaryPath, filePath);
  return details;
}

async function main() {
  const postalPath = path.join(sourceDir, manifest.postal.repositoryFile);
  const postal = await verifyPinnedArchive({ ...manifest.postal, id: 'postal' }, postalPath);
  const provisioned = {};
  for (const id of ['gazetteer', 'admin1', 'admin2']) {
    const source = { ...manifest[id], id };
    const filePath = path.join(provisionedDir, source.provisionedFile);
    provisioned[id] = await downloadPinnedSource(source, filePath);
  }
  console.log(JSON.stringify({
    outputDirectory: path.relative(rootDir, provisionedDir),
    inputs: {
      postal: { ...postal, sha256: manifest.postal.sha256 },
      ...Object.fromEntries(Object.entries(provisioned).map(([id, details]) => [
        id,
        { ...details, sha256: manifest[id].sha256 },
      ])),
    },
  }, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`India geography source provisioning failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  sha256,
  validateArchiveBuffer,
  validateTabularBuffer,
};
