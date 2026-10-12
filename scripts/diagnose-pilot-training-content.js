import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERVICES } from '../data/location-seo/services.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from '../data/location-seo/geography/global-pilot.js';
import { resolveHierarchy } from '../lib/geographicData.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import { buildIndiaLocationServiceContent } from '../lib/indiaLocationContentEngine.js';
import { buildWorldLocationServiceContent } from '../lib/worldLocationContentEngine.js';
import {
  getPilotTrainingContentBlocks,
  getPilotTrainingKnowledgeCatalog,
  PILOT_TRAINING_CATEGORIES,
} from '../lib/pilotTrainingKnowledge.js';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDirectory = path.join(rootDirectory, 'public', 'content');

function listMarkdownFiles(directory, baseDirectory = directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(absolutePath, baseDirectory);
      return entry.isFile() && /\.md$/i.test(entry.name)
        ? [path.relative(baseDirectory, absolutePath).replace(/\\/g, '/')]
        : [];
    })
    .sort();
}

const catalog = getPilotTrainingKnowledgeCatalog();
const discoveredFiles = listMarkdownFiles(contentDirectory);
const indexedFiles = catalog.sources.map(({ file }) => file).sort();
const expectedCategories = PILOT_TRAINING_CATEGORIES.map(({ id }) => id);

assert.ok(discoveredFiles.length > 0, 'Markdown source files were discovered.');
assert.deepEqual(indexedFiles, discoveredFiles, 'Every discovered Markdown file is indexed.');
assert.deepEqual(catalog.unclassifiedFiles, [], 'No source file is left unclassified.');
assert.ok(catalog.sources.every(({ sectionCount, indexedCategories }) => (
  sectionCount > 0 && indexedCategories.length > 0
)), 'Every source file contributes at least one categorized content block.');
assert.ok(expectedCategories.every((id) => catalog.categories[id]?.blocks.length > 0));

const faqBlocks = getPilotTrainingContentBlocks(['FAQs']);
assert.ok(faqBlocks.length > 0, 'FAQ blocks can be selected independently.');
assert.ok(faqBlocks.every(({ headingPath }) => (
  headingPath.some((heading) => /\b(?:FAQs?|Frequently Asked Questions)\b/i.test(heading))
)), 'FAQ blocks retain their source FAQ context.');

const service = SERVICES.find(({ slug }) => slug === 'pilot-training');
const geography = GLOBAL_GEOGRAPHIC_PILOT.records;
const record = geography.find(({ countryCode, type }) => (
  countryCode === 'US' && type === 'city'
));
assert.ok(service && record, 'A pilot-training service and world-location fixture are available.');

const generated = buildWorldLocationServiceContent({
  record,
  hierarchy: resolveHierarchy(record, geography),
  service,
  nearbyAviationPlaces: [],
});
const pageModel = buildLocationPageModel({
  location: generated.location,
  service,
  content: generated.content,
  siteOrigin: 'https://knowledge-layer.test',
  locations: resolveHierarchy(record, geography),
  geographicDataValidated: true,
});

assert.equal(generated.content.masterContent.blocks.length, 3);
assert.ok(generated.content.masterContent.blocks.every(({ markdown, excerpt, sourceFile }) => (
  markdown && excerpt && discoveredFiles.includes(sourceFile)
)), 'The page engine receives independent, source-attributed Markdown blocks.');
assert.equal(generated.content.canonicalPath, `/${record.slug}/${service.slug}`);
assert.equal(pageModel.renderable, true, 'The existing pilot-training page engine can render the page.');
assert.equal(pageModel.indexable, false, 'Master content does not independently approve indexability.');
assert.equal(pageModel.sitemapEligible, false, 'Master content does not add the route to a sitemap.');

const indiaRecord = geography.find(({ countryCode, slug }) => (
  countryCode === 'IN' && slug === 'mumbai'
));
assert.ok(indiaRecord, 'A sourced India page fixture is available.');
const indiaHierarchy = resolveHierarchy(indiaRecord, geography);
const indiaGenerated = buildIndiaLocationServiceContent({
  record: indiaRecord,
  hierarchy: indiaHierarchy,
  service,
});
const indiaPageModel = buildLocationPageModel({
  location: indiaGenerated.location,
  service,
  content: indiaGenerated.content,
  siteOrigin: 'https://knowledge-layer.test',
  locations: indiaHierarchy,
  geographicDataValidated: true,
});

assert.equal(indiaGenerated.content.canonicalPath, '/mumbai/pilot-training');
assert.deepEqual(indiaGenerated.content.masterContent.categoryIds, [
  'pilot_training_overview',
  'ground_school',
  'medical_requirements',
  'DGCA_exams',
  'FTO_stage',
  'We_One_Aviation_services',
]);
assert.equal(indiaPageModel.renderable, true, 'The India pilot-training page remains renderable.');

console.log(JSON.stringify({
  result: 'PASS',
  discoveredFiles,
  sourceFileCount: discoveredFiles.length,
  contentBlockCount: catalog.blockCount,
  contentCategories: Object.fromEntries(expectedCategories.map((id) => [
    id,
    catalog.categories[id].blocks.length,
  ])),
  unclassifiedFiles: catalog.unclassifiedFiles,
  independentFaqBlockCount: faqBlocks.length,
  engineIntegration: {
    route: generated.content.canonicalPath,
    rendered: pageModel.renderable,
    indexable: pageModel.indexable,
    sitemapEligible: pageModel.sitemapEligible,
    selectedCategories: generated.content.masterContent.categoryIds,
    selectedSourceFiles: generated.content.masterContent.blocks.map(({ sourceFile }) => sourceFile),
  },
  indiaPageEngineIntegration: {
    route: indiaGenerated.content.canonicalPath,
    rendered: indiaPageModel.renderable,
    indexable: indiaPageModel.indexable,
    selectedCategories: indiaGenerated.content.masterContent.categoryIds,
    selectedSourceFiles: indiaGenerated.content.masterContent.blocks.map(({ sourceFile }) => sourceFile),
  },
}, null, 2));
