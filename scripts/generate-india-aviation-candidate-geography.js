import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AVIATION_MARKET_PAGE_CANDIDATES } from '../data/location-seo/aviation-market-pages.js';
import { loadIndiaGeographicRegistry } from '../lib/indiaGeographicRegistry.js';
import { resolveHierarchy } from '../lib/geographicData.js';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const outputPath = path.join(
  projectRoot,
  'data',
  'location-seo',
  'geography',
  'india-aviation-candidate-geography.js',
);

function normalize(value) {
  return String(value || '').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

const registry = await loadIndiaGeographicRegistry();
const selectedIds = new Set();
const candidateRecords = [];

for (const candidate of AVIATION_MARKET_PAGE_CANDIDATES.filter(
  ({ productionLocation }) => productionLocation.countryCode === 'IN',
)) {
  const { city, state, slug } = candidate.productionLocation;
  const namedMatches = registry.records.filter((record) => (
    normalize(record.name) === normalize(city)
    && normalize(record.state) === normalize(state)
    && ['city', 'populated-place'].includes(record.type)
  ));
  const cityMatches = namedMatches.filter(({ type }) => type === 'city');
  const matches = cityMatches.length ? cityMatches : namedMatches;
  if (matches.length !== 1) {
    throw new Error(
      `Expected one sourced India registry place for ${city}, ${state}; found ${matches.length}.`,
    );
  }
  const record = matches[0];
  const hierarchy = resolveHierarchy(record, registry.records);
  if (!hierarchy || hierarchy[0]?.type !== 'country'
    || !hierarchy.some(({ type }) => type === 'state')) {
    throw new Error(`India registry hierarchy is incomplete for "${city}".`);
  }
  hierarchy.forEach(({ id }) => selectedIds.add(id));
  candidateRecords.push({ marketSlug: slug, recordId: record.id });
}

const selectedRecords = registry.records.filter(({ id }) => selectedIds.has(id));
const payload = {
  datasetRole: 'Small generated hierarchy subset from the India registry for curated aviation-page promotion; not a separate geography source.',
  sourceRegistryRecordCount: registry.recordCount,
  candidates: candidateRecords,
  records: selectedRecords,
};
const source = `export const INDIA_AVIATION_CANDIDATE_GEOGRAPHY = Object.freeze(${JSON.stringify(payload, null, 2)});\n`;
fs.writeFileSync(outputPath, source);
console.log(JSON.stringify({
  outputPath: path.relative(projectRoot, outputPath),
  sourceRegistryRecordCount: registry.recordCount,
  curatedIndiaCandidates: candidateRecords.length,
  selectedHierarchyRecords: selectedRecords.length,
}, null, 2));
