import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';
import { createHash } from 'crypto';

function normalizeText(value, names = []) {
  let normalized = String(value || '').toLowerCase();
  for (const name of [...(Array.isArray(names) ? names : [])]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)) {
    normalized = normalized.replace(
      new RegExp(String(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
      '{geography}',
    );
  }
  return normalized.replace(/\s+/g, ' ').trim();
}

export function normalizeLocationContentText(value, names = []) {
  return normalizeText(value, names);
}

function tokenize(value) {
  return new Set(normalizeText(value).match(/[a-z0-9]+/g) || []);
}

function normalizedFacts(snapshot, inherited) {
  return [...new Set((snapshot.verifiedFacts || [])
    .filter((fact) => Boolean(fact.inherited) === inherited)
    .map(({ text }) => String(text || '')))]
    .join('\n');
}

function normalizeFaqs(snapshot) {
  return new Set((snapshot.faqs || [])
    .map(({ question, answer }) => normalizeText(
      `${question || ''} ${answer || ''}`,
      snapshot.locationNames,
    ))
    .filter(Boolean));
}

function normalizeSections(snapshot) {
  return new Set((snapshot.sections || [])
    .map(({ title, body }) => normalizeText(
      `${title || ''} ${body || ''}`,
      snapshot.locationNames,
    ))
    .filter(Boolean));
}

function contentFingerprint(snapshot) {
  const content = JSON.stringify({
    body: snapshot.body,
    title: snapshot.title || '',
    description: snapshot.description || '',
    h1: snapshot.h1 || '',
    serviceSlug: snapshot.serviceSlug || '',
    sourceUrls: snapshot.sourceUrls || [],
    verifiedFacts: snapshot.verifiedFacts || [],
    faqs: snapshot.faqs || [],
    sections: snapshot.sections || [],
    aviationContext: snapshot.aviationContext || '',
    geographicEvidence: snapshot.geographicEvidence || [],
  });
  return createHash('sha256').update(content).digest('hex');
}

function differentiationFingerprint(snapshot, faqs, sections) {
  const content = JSON.stringify({
    body: normalizeText(snapshot.body, snapshot.locationNames),
    serviceSlug: snapshot.serviceSlug || '',
    faqs: [...faqs].sort(),
    sections: [...sections].sort(),
  });
  return createHash('sha256').update(content).digest('hex');
}

const normalizedSnapshotCache = new WeakMap();
const comparisonIndexCache = new WeakMap();

function normalizedSnapshot(snapshot) {
  const cached = normalizedSnapshotCache.get(snapshot);
  if (cached) return cached;
  const normalizedBody = normalizeText(
    snapshot.body,
    snapshot.similarityLocationNames || snapshot.locationNames,
  );
  const faqs = normalizeFaqs(snapshot);
  const sections = normalizeSections(snapshot);
  const tokens = tokenize(normalizedBody);
  const result = {
    tokens,
    fullPageTokens: tokens,
    faqs,
    sections,
    differentiationFingerprint: differentiationFingerprint(snapshot, faqs, sections),
  };
  normalizedSnapshotCache.set(snapshot, result);
  return result;
}

function addPosting(postings, value, index) {
  let indexes = postings.get(value);
  if (!indexes) {
    indexes = [];
    postings.set(value, indexes);
  }
  indexes.push(index);
}

function getComparisonIndex(comparisons) {
  const cached = comparisonIndexCache.get(comparisons);
  if (cached) return cached;

  const tokenIds = new Map();
  const entries = [];
  const faqPostings = new Map();
  const sectionPostings = new Map();
  for (let index = 0; index < comparisons.length; index += 1) {
    const comparison = comparisons[index];
    const normalized = normalizedSnapshot(comparison);
    entries.push({ comparison, normalized, bitset: null });
    for (const token of normalized.tokens) {
      if (!tokenIds.has(token)) tokenIds.set(token, tokenIds.size);
    }
    for (const faq of normalized.faqs) addPosting(faqPostings, faq, index);
    for (const section of normalized.sections) addPosting(sectionPostings, section, index);
  }

  const wordCount = Math.ceil(tokenIds.size / 32);
  for (const entry of entries) {
    entry.bitset = new Uint32Array(wordCount);
    for (const token of entry.normalized.tokens) {
      const tokenId = tokenIds.get(token);
      entry.bitset[tokenId >>> 5] |= 1 << (tokenId & 31);
    }
  }
  const result = { entries, tokenIds, wordCount, faqPostings, sectionPostings };
  comparisonIndexCache.set(comparisons, result);
  return result;
}

function popcount(value) {
  let bits = value >>> 0;
  bits -= (bits >>> 1) & 0x55555555;
  bits = (bits & 0x33333333) + ((bits >>> 2) & 0x33333333);
  return (((bits + (bits >>> 4)) & 0x0f0f0f0f) * 0x01010101) >>> 24;
}

function countUniqueItems(items, postings, excludedIndexes) {
  let count = 0;
  for (const item of items) {
    const matchingIndexes = postings.get(item);
    if (!matchingIndexes || !matchingIndexes.every((index) => excludedIndexes.has(index))) {
      count += 1;
    }
  }
  return count;
}

export function buildLocationContentSnapshot({
  location,
  hierarchy = [],
  model,
  sections = [],
}) {
  if (!location || !model) throw new TypeError('Location and rendered page model are required.');
  const verifiedSections = sections.filter(({ verified, body: sectionBody }) => (
    verified === true && String(sectionBody || '').trim()
  ));
  const pageText = model.renderedPageText;
  const body = Array.isArray(pageText)
    ? pageText.join('\n')
    : [
      ...(model.renderedBody || []),
      ...verifiedSections.flatMap(({ title, body: sectionBody }) => [title, sectionBody]),
    ].join('\n');
  const renderedSections = model.renderedPageSections || verifiedSections;
  const renderedFaqs = model.renderedFaqs || model.faqs || [];
  const verifiedFacts = model.verifiedFacts || [];
  const sourceUrls = [...new Set([
    ...(location.sourceLinks || []).map(({ href }) => href),
    ...verifiedFacts.map(({ sourceUrl }) => sourceUrl),
    ...verifiedSections.flatMap(({ sourceLinks = [] }) => (
      sourceLinks.map(({ href }) => href)
    )),
  ].filter((url) => typeof url === 'string' && /^https:\/\//.test(url)))];
  return {
    slug: location.slug,
    name: location.name || location.city,
    body,
    title: model.metadata?.title || '',
    description: model.metadata?.description || '',
    h1: model.metadata?.h1 || '',
    serviceSlug: model.service?.slug || '',
    locationNames: hierarchy.map(({ name }) => name),
    similarityLocationNames: Array.isArray(pageText)
      ? []
      : [location.name || location.city].filter(Boolean),
    verifiedFacts,
    aviationFacts: verifiedFacts.filter((fact) => (
      fact.verified === true && !fact.inherited && Boolean(fact.sourceUrl)
    )),
    sourceUrls,
    faqs: renderedFaqs,
    sections: renderedSections,
    regulatoryText: model.regulatoryContext?.authority
      ? `${model.regulatoryContext.country} ${model.regulatoryContext.authority}`
      : '',
    regulatorySpecificity: model.regulatoryContext?.authority ? 1 : 0,
    geographicSpecificity: new Set(hierarchy.map(({ type }) => type)).size,
    aviationContext: model.aviationContext || '',
    geographicEvidence: hierarchy.map(({ id, type, sourceUrl }) => ({
      id,
      type,
      sourceUrl: sourceUrl || null,
    })),
  };
}

export function assessContentDifferentiation({
  candidate,
  comparisons = [],
  policy = GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation,
}) {
  if (!candidate || typeof candidate.body !== 'string') {
    throw new TypeError('A candidate content snapshot with a body is required.');
  }
  if (!Array.isArray(comparisons)
    || comparisons.some((comparison) => !comparison || typeof comparison.body !== 'string')) {
    throw new TypeError('Comparison snapshots must be an array with a body for each page.');
  }
  const normalizedCandidate = normalizedSnapshot(candidate);
  const index = getComparisonIndex(comparisons);
  const excludedIndexes = new Set();
  index.entries.forEach(({ comparison }, comparisonIndex) => {
    if (comparison.slug === candidate.slug) excludedIndexes.add(comparisonIndex);
  });
  const candidateBits = new Uint32Array(index.wordCount);
  for (const token of normalizedCandidate.tokens) {
    const tokenId = index.tokenIds.get(token);
    if (tokenId !== undefined) candidateBits[tokenId >>> 5] |= 1 << (tokenId & 31);
  }
  const comparisonResults = [];
  let exactDuplicateCount = 0;
  let maxNormalizedSimilarityPercent = 0;
  let maxFullPageNormalizedSimilarityPercent = 0;
  for (let comparisonIndex = 0; comparisonIndex < index.entries.length; comparisonIndex += 1) {
    if (excludedIndexes.has(comparisonIndex)) continue;
    const { comparison, normalized: normalizedComparison, bitset } = index.entries[comparisonIndex];
    let intersection = 0;
    for (let word = 0; word < index.wordCount; word += 1) {
      intersection += popcount(candidateBits[word] & bitset[word]);
    }
    const unionSize = normalizedCandidate.tokens.size + normalizedComparison.tokens.size - intersection;
    const similarityPercent = unionSize
      ? Number((intersection / unionSize * 100).toFixed(1))
      : 100;
    const exactDuplicate = normalizedCandidate.differentiationFingerprint
      === normalizedComparison.differentiationFingerprint;
    if (exactDuplicate) exactDuplicateCount += 1;
    maxNormalizedSimilarityPercent = Math.max(maxNormalizedSimilarityPercent, similarityPercent);
    maxFullPageNormalizedSimilarityPercent = Math.max(
      maxFullPageNormalizedSimilarityPercent,
      similarityPercent,
    );
    comparisonResults.push({
      slug: comparison.slug,
      exactDuplicate,
      normalizedSimilarityPercent: similarityPercent,
      fullPageNormalizedSimilarityPercent: similarityPercent,
    });
  }
  const bodyCharacters = Math.max(1, candidate.body.length);
  const inheritedCharacters = normalizedFacts(candidate, true).length;
  const directCharacters = normalizedFacts(candidate, false).length;
  const regulatoryCharacters = String(candidate.regulatoryText || '').length;
  const localSectionText = (candidate.sections || [])
    .filter(({ verified }) => verified === true)
    .map(({ body }) => String(body || ''))
    .join('\n');
  const locationSpecificCharacters = directCharacters + localSectionText.length;
  const classifiedCharacters = Math.min(
    bodyCharacters,
    inheritedCharacters + directCharacters + regulatoryCharacters + localSectionText.length,
  );
  const uniqueFaqCount = countUniqueItems(
    normalizedCandidate.faqs,
    index.faqPostings,
    excludedIndexes,
  );
  const uniqueSectionCount = countUniqueItems(
    normalizedCandidate.sections,
    index.sectionPostings,
    excludedIndexes,
  );
  const aviationFactCount = candidate.aviationFacts?.length
    ?? (candidate.verifiedFacts || []).filter((fact) => (
      fact.verified === true && !fact.inherited && Boolean(fact.sourceUrl)
    )).length;
  const sourceCount = new Set(candidate.sourceUrls || []).size;
  const locationSpecificSectionCount = (candidate.sections || []).filter(({ verified, body }) => (
    verified === true && String(body || '').trim()
  )).length;
  const exactDuplicatePercent = comparisonResults.length
    ? Number((exactDuplicateCount / comparisonResults.length * 100).toFixed(1))
    : 0;
  const exactDuplicate = exactDuplicateCount > 0;
  if (!comparisonResults.length) {
    maxNormalizedSimilarityPercent = 100;
    maxFullPageNormalizedSimilarityPercent = 100;
  }
  const metrics = {
    exactDuplicatePercent,
    normalizedSimilarityPercent: maxNormalizedSimilarityPercent,
    fullPageNormalizedSimilarityPercent: maxFullPageNormalizedSimilarityPercent,
    inheritedContentPercent: Number((Math.min(inheritedCharacters, bodyCharacters) / bodyCharacters * 100).toFixed(1)),
    directContentPercent: Number((Math.min(directCharacters, bodyCharacters) / bodyCharacters * 100).toFixed(1)),
    genericContentPercent: Number(((bodyCharacters - classifiedCharacters) / bodyCharacters * 100).toFixed(1)),
    locationSpecificContentPercent: Number((Math.min(locationSpecificCharacters, bodyCharacters) / bodyCharacters * 100).toFixed(1)),
    regulatoryContentPercent: Number((Math.min(regulatoryCharacters, bodyCharacters) / bodyCharacters * 100).toFixed(1)),
    uniqueFaqCount,
    uniqueSectionCount,
    locationSpecificSectionCount,
    aviationFactCount,
    sourceCount,
    regulatorySpecificity: candidate.regulatorySpecificity
      ?? (String(candidate.regulatoryText || '').trim() ? 1 : 0),
    geographicSpecificity: candidate.geographicSpecificity || 0,
    comparisonCount: comparisonResults.length,
  };
  const reasons = [];
  if (!comparisonResults.length) reasons.push('No comparison pages were supplied.');
  if (exactDuplicate) reasons.push('The generated page exactly duplicates a compared page.');
  if (metrics.normalizedSimilarityPercent >= policy.maxNormalizedSimilarityPercent) {
    reasons.push(`Normalized similarity is at or above ${policy.maxNormalizedSimilarityPercent}%.`);
  }
  if (uniqueFaqCount < policy.minUniqueFaqs) reasons.push('Not enough unique FAQs.');
  if (uniqueSectionCount < policy.minUniqueSections) reasons.push('Not enough unique sections.');
  if (metrics.locationSpecificContentPercent < policy.minLocationSpecificContentPercent) {
    reasons.push('Verified location-specific content is below the configured minimum.');
  }

  return {
    status: reasons.length ? 'CONTENT_DIFFERENTIATION_REQUIRED' : 'PASSED',
    differentiationStatus: reasons.length ? 'NOT_DIFFERENTIATED' : 'DIFFERENTIATED',
    contentFingerprint: contentFingerprint(candidate),
    differentiationFingerprint: normalizedCandidate.differentiationFingerprint,
    exactDuplicate,
    similarityScore: maxNormalizedSimilarityPercent,
    uniqueFAQCount: uniqueFaqCount,
    uniqueSectionCount,
    locationSpecificContentPercent: metrics.locationSpecificContentPercent,
    sitemapEligible: reasons.length === 0,
    metrics,
    comparisons: comparisonResults,
    reasons,
  };
}
