import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_DIRECTORY = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'content',
);

export const PILOT_TRAINING_CATEGORIES = Object.freeze([
  { id: 'pilot_training_overview', label: 'Pilot training overview' },
  { id: 'pilot_training_stages', label: 'Pilot training stages' },
  { id: 'ground_school', label: 'Ground school' },
  { id: 'DGCA_exams', label: 'DGCA examinations' },
  { id: 'CPL_pathway', label: 'CPL pathway' },
  { id: 'medical_requirements', label: 'Medical requirements' },
  { id: 'FTO_stage', label: 'FTO stage' },
  { id: 'aviation_facilities', label: 'Aviation facilities' },
  { id: 'local_aviation_infrastructure', label: 'Local aviation infrastructure' },
  { id: 'pilot_training_process', label: 'Pilot training process' },
  { id: 'CPL_documents', label: 'CPL documents' },
  { id: 'FAQs', label: 'Frequently asked questions' },
  { id: 'We_One_Aviation_services', label: 'We One Aviation services' },
  { id: 'official_regulatory_sources', label: 'Official regulatory sources' },
]);

const SOURCE_CATEGORY_BY_FILE = Object.freeze({
  'aviation_facilities_guide.md': 'aviation_facilities',
  'cpl_pathway_guide.md': 'CPL_pathway',
  'dgca_cpl_document_checklist.md': 'CPL_documents',
  'dgca_pilot_exams_guide_2026.md': 'DGCA_exams',
  'dgca_pilot_training_requirements_guide.md': 'pilot_training_overview',
  'fto_stage_in_pilot_training_guide.md': 'FTO_stage',
  'ground_school_guide.md': 'ground_school',
  'local_aviation_infrastructure_pilot_pathway_guide.md': 'local_aviation_infrastructure',
  'medical_requirements_guide.md': 'medical_requirements',
  'official_aviation_regulatory_sources.md': 'official_regulatory_sources',
  'pilot_training_faqs.md': 'pilot_training_overview',
  'pilot_training_process_guide.md': 'pilot_training_process',
  'pilot_training_stages.md': 'pilot_training_stages',
  'we_one_aviation_services_guide.md': 'We_One_Aviation_services',
});

const INDIA_SERVICE_CONTENT = Object.freeze({
  'pilot-training': [
    ['pilot_training_overview', 'dgca_pilot_training_requirements_guide.md', 'Core Eligibility Criteria for DGCA Pilot Licenses'],
    ['CPL_pathway', 'cpl_pathway_guide.md', 'What is the CPL Pathway?'],
    ['ground_school', 'ground_school_guide.md', 'Core Subjects Covered in Ground School'],
    ['medical_requirements', 'medical_requirements_guide.md', 'Overview of DGCA Medical Examinations'],
    ['DGCA_exams', 'dgca_pilot_exams_guide_2026.md', '2. Subject Breakdown for CPL Ground Exams'],
    ['FTO_stage', 'fto_stage_in_pilot_training_guide.md', 'What is the FTO Stage in Commercial Pilot Training?'],
    ['We_One_Aviation_services', 'we_one_aviation_services_guide.md', '1. DGCA Ground Exam Preparation'],
  ],
  'dgca-ground-classes': [
    ['ground_school', 'ground_school_guide.md', 'Core Subjects Covered in Ground School'],
    ['DGCA_exams', 'dgca_pilot_exams_guide_2026.md', '2. Subject Breakdown for CPL Ground Exams'],
    ['medical_requirements', 'medical_requirements_guide.md', 'Overview of DGCA Medical Examinations'],
    ['We_One_Aviation_services', 'we_one_aviation_services_guide.md', '1. DGCA Ground Exam Preparation'],
  ],
  'commercial-pilot-training': [
    ['CPL_pathway', 'cpl_pathway_guide.md', 'What is the CPL Pathway?'],
    ['ground_school', 'ground_school_guide.md', 'Core Subjects Covered in Ground School'],
    ['medical_requirements', 'medical_requirements_guide.md', 'Overview of DGCA Medical Examinations'],
    ['FTO_stage', 'fto_stage_in_pilot_training_guide.md', 'What is the FTO Stage in Commercial Pilot Training?'],
    ['We_One_Aviation_services', 'we_one_aviation_services_guide.md', '3. Flight Training Placement & Flying Club Advisory'],
  ],
  'cpl-training': [
    ['CPL_pathway', 'cpl_pathway_guide.md', 'What is the CPL Pathway?'],
    ['ground_school', 'ground_school_guide.md', 'Core Subjects Covered in Ground School'],
    ['medical_requirements', 'dgca_pilot_training_requirements_guide.md', 'Medical Fitness Standards'],
    ['FTO_stage', 'fto_stage_in_pilot_training_guide.md', 'What is the FTO Stage in Commercial Pilot Training?'],
    ['We_One_Aviation_services', 'we_one_aviation_services_guide.md', '3. Flight Training Placement & Flying Club Advisory'],
  ],
});

const INTERNATIONAL_PILOT_TRAINING_CONTENT = [
  ['aviation_facilities', 'aviation_facilities_guide.md', 'Understanding Aviation Facility Classifications'],
  ['official_regulatory_sources', 'official_aviation_regulatory_sources.md', 'Why Primary Aviation Sources Matter'],
  ['We_One_Aviation_services', 'aviation_facilities_guide.md', 'How We One Aviation Supports Your Training Journey'],
];

export function getPilotTrainingKnowledgeSourceFiles() {
  return [...new Set([
    ...Object.values(INDIA_SERVICE_CONTENT).flatMap((selection) => (
      selection.map(([, sourceFile]) => sourceFile)
    )),
    ...INTERNATIONAL_PILOT_TRAINING_CONTENT.map(([, sourceFile]) => sourceFile),
  ])].sort();
}

let catalogCache;

function listMarkdownFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(absolutePath);
      return entry.isFile() && /\.md$/i.test(entry.name)
        ? [absolutePath]
        : [];
    });
}

function markdownSections(markdown, sourceFile) {
  const lines = markdown.split(/\r?\n/);
  const sections = [];
  const headingStack = [];
  let sectionStart = 0;

  const addSection = (end) => {
    const source = lines.slice(sectionStart, end).join('\n').trim();
    if (!source) return;
    sections.push({
      sourceFile,
      heading: headingStack.at(-1)?.text || null,
      headingPath: headingStack.map(({ text }) => text),
      depth: headingStack.at(-1)?.depth || 0,
      markdown: source,
    });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(lines[index]);
    if (!match) continue;
    addSection(index);
    const depth = match[1].length;
    headingStack.length = depth - 1;
    headingStack[depth - 1] = { depth, text: match[2] };
    sectionStart = index;
  }
  addSection(lines.length);
  return sections;
}

function sectionExcerpt(section) {
  const lines = section.markdown.split(/\r?\n/);
  let paragraph = [];
  const paragraphs = [];

  const flush = () => {
    const value = paragraph.join(' ').trim();
    if (value) paragraphs.push(value);
    paragraph = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    if (/^#{1,6}\s/.test(trimmed) || /^```/.test(trimmed) || /^\|/.test(trimmed)) {
      flush();
      continue;
    }
    if (/^(?:[-*+]\s|\d+[.)]\s|>\s)/.test(trimmed)) {
      flush();
      const listItem = trimmed.replace(/^(?:[-*+]\s|\d+[.)]\s|>\s)/, '');
      if (paragraphs.length) {
        paragraphs[paragraphs.length - 1] += ` ${listItem}`;
      } else if (listItem) {
        paragraphs.push(listItem);
      }
      continue;
    }
    paragraph.push(trimmed);
  }
  flush();

  const excerpt = paragraphs.find((value) => (
    !/^(?:SEO (?:Title|Metadata)|Meta Description|Primary Target Keyword|Secondary Keywords|H1(?: Tag)?):/i
      .test(value)
  ));
  if (!excerpt) return '';

  return excerpt
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
}

function sectionCategories(section, sourceCategory) {
  const categories = new Set([sourceCategory || 'unclassified_source_material']);
  const faqContext = section.headingPath.some((heading) => (
    /\b(?:FAQs?|Frequently Asked Questions)\b/i.test(heading)
  ));
  if (faqContext) categories.add('FAQs');
  if (/We One Aviation|We One Aviation Guidance|Role of We One Aviation/i.test(
    section.headingPath.join(' '),
  )) {
    categories.add('We_One_Aviation_services');
  }
  if (/\b(?:official )?(?:sources?|references?|regulatory framework)\b/i.test(
    section.headingPath.join(' '),
  )) {
    categories.add('official_regulatory_sources');
  }
  return [...categories];
}

function sectionId(section) {
  const fragment = section.headingPath
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${section.sourceFile}#${fragment || 'document'}`;
}

function loadCatalog() {
  if (catalogCache) return catalogCache;
  const files = listMarkdownFiles(CONTENT_DIRECTORY);
  const blocksByCategory = new Map(
    PILOT_TRAINING_CATEGORIES.map(({ id }) => [id, []]),
  );
  blocksByCategory.set('unclassified_source_material', []);
  const sources = [];
  const unclassifiedFiles = [];
  let blockCount = 0;

  for (const absolutePath of files) {
    const sourceFile = path.relative(CONTENT_DIRECTORY, absolutePath).replace(/\\/g, '/');
    const basename = path.basename(absolutePath);
    const sourceCategory = SOURCE_CATEGORY_BY_FILE[basename] || null;
    if (!sourceCategory) unclassifiedFiles.push(sourceFile);
    const markdown = fs.readFileSync(absolutePath, 'utf8');
    const sections = markdownSections(markdown, sourceFile);
    const indexedCategories = new Set();

    for (const section of sections) {
      const block = {
        id: sectionId(section),
        sourceFile,
        heading: section.heading || path.basename(sourceFile, path.extname(sourceFile)),
        headingPath: section.headingPath,
        depth: section.depth,
        excerpt: sectionExcerpt(section),
        markdown: section.markdown,
      };
      for (const categoryId of sectionCategories(section, sourceCategory)) {
        const categoryBlocks = blocksByCategory.get(categoryId);
        if (!categoryBlocks) {
          blocksByCategory.set(categoryId, []);
        }
        blocksByCategory.get(categoryId).push({ ...block, categoryId });
        indexedCategories.add(categoryId);
      }
      blockCount += 1;
    }

    if (sections.length === 0) {
      unclassifiedFiles.push(sourceFile);
    }
    sources.push({
      file: sourceFile,
      primaryCategory: sourceCategory || 'unclassified_source_material',
      sectionCount: sections.length,
      indexedCategories: [...indexedCategories],
    });
  }

  const categories = Object.fromEntries([
    ...PILOT_TRAINING_CATEGORIES.map(({ id, label }) => [
      id,
      { id, label, blocks: blocksByCategory.get(id) || [] },
    ]),
    ...(blocksByCategory.get('unclassified_source_material').length
      ? [['unclassified_source_material', {
        id: 'unclassified_source_material',
        label: 'Unclassified source material',
        blocks: blocksByCategory.get('unclassified_source_material'),
      }]]
      : []),
  ]);

  catalogCache = {
    sources,
    categories,
    unclassifiedFiles,
    blockCount,
  };
  return catalogCache;
}

export function getPilotTrainingKnowledgeCatalog() {
  return loadCatalog();
}

export function getPilotTrainingContentBlocks(categoryIds) {
  if (!Array.isArray(categoryIds) || categoryIds.some((id) => typeof id !== 'string')) {
    throw new TypeError('Pilot-training content category IDs must be provided as an array of strings.');
  }
  const { categories } = loadCatalog();
  const unknownCategories = categoryIds.filter((id) => !categories[id]);
  if (unknownCategories.length) {
    throw new Error(`Unknown pilot-training content categories: ${unknownCategories.join(', ')}.`);
  }
  return categoryIds.flatMap((categoryId) => categories[categoryId].blocks);
}

export function getLocationPilotTrainingContent({ countryCode, serviceSlug } = {}) {
  const indiaSelection = INDIA_SERVICE_CONTENT[serviceSlug];
  if (countryCode === 'IN' && !indiaSelection) return null;
  if (countryCode !== 'IN' && serviceSlug !== 'pilot-training') return null;
  const catalog = loadCatalog();
  const selection = countryCode === 'IN'
    ? indiaSelection
    : INTERNATIONAL_PILOT_TRAINING_CONTENT;
  const blocks = selection.map(([categoryId, sourceFile, heading]) => {
    const block = catalog.categories[categoryId]?.blocks.find((candidate) => (
      candidate.sourceFile === sourceFile && candidate.heading === heading
    ));
    if (!block || !block.excerpt) {
      throw new Error(
        `Missing selected pilot-training content block "${heading}" from ${sourceFile}.`,
      );
    }
    return block;
  });

  return {
    version: 1,
    countryCode,
    serviceSlug,
    categoryIds: selection.map(([categoryId]) => categoryId),
    blocks: blocks.map(({
      id,
      categoryId,
      sourceFile,
      heading,
      headingPath,
      excerpt,
      markdown,
    }) => ({
      id,
      categoryId,
      sourceFile,
      heading,
      headingPath,
      excerpt,
      markdown,
    })),
  };
}
