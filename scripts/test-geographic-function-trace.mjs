import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const ROOT = process.cwd();
const require = createRequire(import.meta.url);
const picomatch = require('next/dist/compiled/picomatch');
const nextConfig = require('../next.config.js');
const TRACE_PATH = path.join(
  ROOT,
  '.next',
  'server',
  'pages',
  '[location]',
  '[service].js.nft.json',
);
const MAX_UNCOMPRESSED_BYTES = 225 * 1024 * 1024;
const REQUIRED_RUNTIME_INDEXES = [
  'india-geographic-runtime-index.sqlite',
  'world-geographic-runtime-index.sqlite',
];
const EXCLUDED_GEOGRAPHIC_ASSETS = [
  /world-geographic-index\.sqlite(?:$|-)/i,
  /india-geographic-index\.sqlite(?:$|-)/i,
  /india-geographic-index[\\/]/i,
  /india-geography\.json\.gz$/i,
];

assert.ok(fs.existsSync(TRACE_PATH), `Next.js route trace is missing: ${TRACE_PATH}`);
const trace = JSON.parse(fs.readFileSync(TRACE_PATH, 'utf8'));
assert.ok(Array.isArray(trace.files), 'Next.js route trace has no file list.');

const uniqueFiles = new Map();
for (const tracedFile of trace.files) {
  const resolvedPath = path.resolve(path.dirname(TRACE_PATH), tracedFile);
  assert.ok(fs.existsSync(resolvedPath), `A traced route dependency is missing: ${tracedFile}`);
  const realPath = fs.realpathSync(resolvedPath);
  uniqueFiles.set(realPath, fs.statSync(realPath).size);
}

const dynamicRoute = '/[location]/[service]';
const exclusionGlobs = Object.entries(nextConfig.outputFileTracingExcludes || {})
  .filter(([routeGlob]) => picomatch(routeGlob, { dot: true, contains: true })(dynamicRoute))
  .flatMap(([, patterns]) => patterns.map((pattern) => (
    path.posix.resolve(`/${ROOT.replace(/\\/g, '/')}`, pattern.replace(/\\/g, '/'))
  )));
assert.ok(exclusionGlobs.length, 'No trace exclusions target the geographic route.');

const isWindows = process.platform === 'win32';
const isExcluded = picomatch(exclusionGlobs, { dot: true, contains: true });
const packagedFiles = [...uniqueFiles.entries()].filter(([filePath]) => (
  !isWindows || !isExcluded(`/${filePath.replace(/\\/g, '/')}`)
));
if (isWindows) {
  const unmatchedWindowsLeaks = [...uniqueFiles.keys()].filter((filePath) => (
    EXCLUDED_GEOGRAPHIC_ASSETS.some((pattern) => pattern.test(filePath))
      && !isExcluded(`/${filePath.replace(/\\/g, '/')}`)
  ));
  assert.deepEqual(
    unmatchedWindowsLeaks,
    [],
    'Every Windows trace leak must be covered by the POSIX production exclusion globs.',
  );
}

for (const requiredIndex of REQUIRED_RUNTIME_INDEXES) {
  assert.ok(
    [...uniqueFiles.keys()].some((filePath) => path.basename(filePath) === requiredIndex),
    `The route trace does not include ${requiredIndex}.`,
  );
}

const leakedAssets = packagedFiles.map(([filePath]) => filePath).filter((filePath) => (
  EXCLUDED_GEOGRAPHIC_ASSETS.some((pattern) => pattern.test(filePath))
));
assert.deepEqual(leakedAssets, [], 'The full geographic source indexes must not enter the route function.');

const totalBytes = packagedFiles.reduce((total, [, size]) => total + size, 0);
assert.ok(
  totalBytes < MAX_UNCOMPRESSED_BYTES,
  `Geographic route function trace is ${(totalBytes / 1024 / 1024).toFixed(2)} MiB; `
    + `the safe ceiling is ${(MAX_UNCOMPRESSED_BYTES / 1024 / 1024).toFixed(0)} MiB.`,
);

console.log(JSON.stringify({
  traceFileCount: uniqueFiles.size,
  packagedTraceFileCount: packagedFiles.length,
  uncompressedBytes: totalBytes,
  uncompressedMiB: Number((totalBytes / 1024 / 1024).toFixed(2)),
  safeCeilingMiB: MAX_UNCOMPRESSED_BYTES / 1024 / 1024,
  geographicSourcesExcluded: true,
  traceExclusionMode: isWindows ? 'posix-simulated-for-windows' : 'native',
  runtimeIndexesIncluded: REQUIRED_RUNTIME_INDEXES,
}, null, 2));
