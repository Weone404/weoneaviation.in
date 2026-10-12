const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { Transform, Readable } = require('node:stream');
const { pipeline } = require('node:stream/promises');
const JSZip = require('jszip');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'data', 'locations', 'source');
const manifest = require('../data/locations/source/world-geonames-source-manifest.json');

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function sha256File(filePath) {
  const hash = createHash('sha256');
  for await (const chunk of fs.createReadStream(filePath)) hash.update(chunk);
  return hash.digest('hex');
}

function validateTabularBuffer(buffer, source) {
  const rows = buffer.toString('utf8').split(/\r?\n/).filter((line) => (
    line && !line.startsWith('#')
  ));
  if (!rows.length) throw new Error(`${source.id} is empty.`);
  for (let index = 0; index < rows.length; index += 1) {
    const fields = rows[index].split('\t');
    if (fields.length < source.columns) {
      throw new Error(
        `${source.id} row ${index + 1} has ${fields.length} columns; expected at least ${source.columns}.`,
      );
    }
    if (source.countryCodeColumn !== undefined
      && !/^[A-Z]{2}$/.test(fields[source.countryCodeColumn])) {
      throw new Error(`${source.id} row ${index + 1} has an invalid country code.`);
    }
    if (source.countryNameColumn !== undefined && !fields[source.countryNameColumn]) {
      throw new Error(`${source.id} row ${index + 1} has no country name.`);
    }
  }
  return rows.length;
}

async function validateArchiveBuffer(buffer, source) {
  let archive;
  try {
    archive = await JSZip.loadAsync(buffer, { checkCRC32: false });
  } catch (error) {
    throw new Error(`${source.id} is not a valid GeoNames ZIP archive: ${error.message}`);
  }
  const entry = archive.file(source.archiveEntry);
  if (!entry || entry.dir) {
    throw new Error(`${source.id} archive does not contain ${source.archiveEntry}.`);
  }
  return { archiveEntry: source.archiveEntry };
}

async function validateSourceFile(source, filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required GeoNames source is missing: ${filePath}`);
  }
  const actualHash = await sha256File(filePath);
  if (actualHash !== source.sha256) {
    throw new Error(
      `${source.id} checksum mismatch at ${filePath}: expected ${source.sha256}, received ${actualHash}. Review the source update; the file was not changed.`,
    );
  }
  const buffer = fs.readFileSync(filePath);
  const details = source.archiveEntry
    ? await validateArchiveBuffer(buffer, source)
    : { validatedRows: validateTabularBuffer(buffer, source) };
  return { bytes: buffer.length, sha256: actualHash, ...details };
}

async function downloadSource(source, filePath) {
  if (fs.existsSync(filePath)) return validateSourceFile(source, filePath);

  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  if (fs.existsSync(temporaryPath)) {
    throw new Error(`Provisioning temporary file already exists; review it before retrying: ${temporaryPath}`);
  }
  const response = await fetch(source.url, { signal: AbortSignal.timeout(600_000) });
  if (!response.ok || !response.body) {
    throw new Error(`${source.id} download failed: HTTP ${response.status} from ${source.url}`);
  }

  const hash = createHash('sha256');
  const hashingStream = new Transform({
    transform(chunk, encoding, callback) {
      hash.update(chunk);
      callback(null, chunk);
    },
  });
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  let ownsTemporaryFile = false;
  try {
    const fileDescriptor = fs.openSync(temporaryPath, 'wx');
    ownsTemporaryFile = true;
    await pipeline(
      Readable.fromWeb(response.body),
      hashingStream,
      fs.createWriteStream(temporaryPath, { fd: fileDescriptor, autoClose: true }),
    );
    const actualHash = hash.digest('hex');
    if (actualHash !== source.sha256) {
      throw new Error(
        `${source.id} download checksum mismatch: expected ${source.sha256}, received ${actualHash}; source ${source.url} may have changed.`,
      );
    }
    const details = await validateSourceFile({ ...source, sha256: actualHash }, temporaryPath);
    if (fs.existsSync(filePath)) {
      throw new Error(`GeoNames input appeared during provisioning; it was not overwritten: ${filePath}`);
    }
    fs.renameSync(temporaryPath, filePath);
    return details;
  } catch (error) {
    if (ownsTemporaryFile && fs.existsSync(temporaryPath)) fs.rmSync(temporaryPath);
    throw error;
  }
}

async function main() {
  const inputs = {};
  for (const [id, source] of Object.entries(manifest)) {
    if (id === 'version') continue;
    const filePath = path.join(sourceDir, source.file);
    inputs[id] = await downloadSource({ ...source, id }, filePath);
  }
  console.log(JSON.stringify({
    outputDirectory: path.relative(rootDir, sourceDir),
    inputs,
  }, null, 2));
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`World geography source provisioning failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = {
  sha256,
  validateArchiveBuffer,
  validateTabularBuffer,
};
