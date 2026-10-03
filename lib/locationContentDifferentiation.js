import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';

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

function tokenize(value) {
  return new Set(normalizeText(value).match(/[a-z0-9]+/g) || []);
}

function jaccard(left, right) {
  const leftTokens = tokenize(left);
  const rightTokens = tokenize(right);
  const union = new Set([...leftTokens, ...rightTokens]);
  if (!union.size) return 1;
  const intersection = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return intersection / union.size;
}

function normalizedFacts(snapshot, inherited) {
  return [...new Set((snapshot.verifiedFacts || [])
    .filter((fact) => Boolean(fact.inherited) === inherited)
    .map(({ text }) => String(text || '')))]
    .join('\n');
}

function normalizeFaqs(snapshot) {
  return new Set((snapshot.faqs || [])
    .map(({ question }) => normalizeText(question, snapshot.locationNames))
    .filter(Boolean));
}

function normalizeSections(snapshot) {
  return new Set((snapshot.sections || [])
    .map(({ title, body }) => normalizeText(`${title || ''} ${body || ''}`, snapshot.locationNames))
    .filter(Boolean));
}

function uniqueCount(own, others) {
  const union = new Set(others.flatMap((items) => [...items]));
  return [...own].filter((value) => !union.has(value)).length;
}

export function buildLocationContentSnapshot({
  location,
  hierarchy = [],
  model,
  sections = [],
}) {
  if (!location || !model) throw new TypeError('Location and rendered page model are required.');
  const body = (model.renderedBody || []).join('\n');
  return {
    slug: location.slug,
    name: location.name || location.city,
    body,
    locationNames: hierarchy.map(({ name }) => name),
    verifiedFacts: model.verifiedFacts || [],
    faqs: model.faqs || [],
    sections,
    regulatoryText: model.regulatoryContext?.authority
      ? `${model.regulatoryContext.country} ${model.regulatoryContext.authority}`
      : '',
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
  const comparisonResults = comparisons.map((comparison) => {
    const normalizedCandidate = normalizeText(candidate.body, candidate.locationNames);
    const normalizedComparison = normalizeText(comparison.body, comparison.locationNames);
    return {
      slug: comparison.slug,
      exactDuplicate: candidate.body.trim() === comparison.body.trim(),
      normalizedSimilarityPercent: Number(
        (jaccard(normalizedCandidate, normalizedComparison) * 100).toFixed(1),
      ),
    };
  });
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
  const uniqueFaqCount = uniqueCount(
    normalizeFaqs(candidate),
    comparisons.map(normalizeFaqs),
  );
  const uniqueSectionCount = uniqueCount(
    normalizeSections(candidate),
    comparisons.map(normalizeSections),
  );
  const exactDuplicatePercent = comparisonResults.length
    ? Number((
      comparisonResults.filter(({ exactDuplicate }) => exactDuplicate).length
      / comparisonResults.length * 100
    ).toFixed(1))
    : 0;
  const maxNormalizedSimilarityPercent = comparisonResults.length
    ? Math.max(...comparisonResults.map(({ normalizedSimilarityPercent }) => normalizedSimilarityPercent))
    : 100;
  const metrics = {
    exactDuplicatePercent,
    normalizedSimilarityPercent: maxNormalizedSimilarityPercent,
    inheritedContentPercent: Number((Math.min(inheritedCharacters, bodyCharacters) / bodyCharacters * 100).toFixed(1)),
    directContentPercent: Number((Math.min(directCharacters, bodyCharacters) / bodyCharacters * 100).toFixed(1)),
    genericContentPercent: Number(((bodyCharacters - classifiedCharacters) / bodyCharacters * 100).toFixed(1)),
    locationSpecificContentPercent: Number((Math.min(locationSpecificCharacters, bodyCharacters) / bodyCharacters * 100).toFixed(1)),
    regulatoryContentPercent: Number((Math.min(regulatoryCharacters, bodyCharacters) / bodyCharacters * 100).toFixed(1)),
    uniqueFaqCount,
    uniqueSectionCount,
    comparisonCount: comparisons.length,
  };
  const reasons = [];
  if (!comparisons.length) reasons.push('No comparison pages were supplied.');
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
    sitemapEligible: reasons.length === 0,
    metrics,
    comparisons: comparisonResults,
    reasons,
  };
}
