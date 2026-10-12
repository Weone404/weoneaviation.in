import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';

function countUnique(values) {
  return new Set(values.filter(Boolean)).size;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function words(value) {
  return String(value || '').match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu) || [];
}

function sourceUrls(content) {
  return [...new Set((content.sourceReferences || [])
    .map(({ href }) => href)
    .filter((href) => typeof href === 'string' && /^https:\/\//.test(href)))];
}

function scoreIndiaLocationContent({
  record,
  hierarchy,
  service,
  content,
  differentiation,
  routeSlug = record?.slug,
  unsupportedClaims = [],
}) {
  const aviation = content.locationAviationContent;
  const serviceContent = content.serviceContent || {};
  const safetyViolations = [...unsupportedClaims];
  const invalidAviationFacts = [
    ...aviation.aviationFacts,
    ...aviation.nearbyAviationHubs,
  ].some((item) => (
    !item.evidenceId
    || !/^https:\/\//.test(item.evidence?.href || item.href || '')
  ));
  if (content.relationship !== 'informational'
    || aviation.relationship?.type !== 'informational'
    || aviation.relationship?.physicalPresenceVerified !== false
    || aviation.relationship?.localServiceDeliveryVerified !== false
    || aviation.serviceRelationship?.mode !== 'informational'
    || aviation.serviceRelationship?.localDeliveryVerified !== false) {
    safetyViolations.push('The page relationship is not explicitly informational.');
  }
  if (invalidAviationFacts) {
    safetyViolations.push('Aviation evidence lacks a source ID or HTTPS source.');
  }
  if (aviation.sourceLinks.some(({ href }) => !/^https:\/\//.test(href || ''))) {
    safetyViolations.push('A source link is not HTTPS.');
  }

  const hierarchyValid = record.type === 'country'
    ? hierarchy.length === 1 && hierarchy[0]?.id === record.id
    : hierarchy.length >= 2
      && hierarchy[0]?.type === 'country'
      && hierarchy.at(-1)?.id === record.id
      && hierarchy.some(({ type }) => type === 'state');
  const geographicIdentityValid = Boolean(
    record.id
    && record.slug
    && (record.canonicalName || record.name)
    && record.countryCode === 'IN'
    && record.source
    && /^https:\/\//.test(record.sourceUrl || ''),
  );
  const serviceValid = Boolean(
    service.slug
    && content.serviceRelationship?.serviceSlug === service.slug
    && serviceContent.serviceSlug === service.slug
    && serviceContent.explanation
    && serviceContent.eligibility
    && serviceContent.regulatoryPathway
    && serviceContent.trainingProcess?.length >= 2,
  );
  const directFactCount = aviation.aviationFacts.length;
  const regionalFactCount = aviation.nearbyAviationHubs.length;
  const geographicSourceCount = countUnique(
    hierarchy.flatMap(({ sourceLinks = [] }) => sourceLinks.map(({ href }) => href)),
  );
  const aviationSourceCount = countUnique([
    ...aviation.aviationFacts.map(({ evidence }) => evidence?.href),
    ...aviation.nearbyAviationHubs.map(({ href }) => href),
  ]);
  const sources = sourceUrls(content);
  const pilotTrainingPage = content.locationPilotTrainingPage;
  const visibleText = pilotTrainingPage
    ? pilotTrainingPage.visibleText.join(' ')
    : [
    content.seoTitle,
    content.seoDescription,
    content.h1,
    content.introduction,
    content.localApplication,
    content.relationshipStatement,
    aviation.locationOverview,
    aviation.aviationRelevance,
    ...aviation.geographicContext.map(({ name, type }) => `${type} ${name}`),
    ...aviation.aviationFacts.map(({ fact }) => fact),
    ...aviation.nearbyAviationHubs.map(({ fact, attributionNote }) => `${fact} ${attributionNote || ''}`),
    ...content.locationSpecificSections.flatMap(({ title, body }) => [title, body]),
    ...content.regionalContextSections.flatMap(({ title, body }) => [title, body]),
    ...content.faqs.flatMap(({ question, answer }) => [question, answer]),
    serviceContent.explanation,
    serviceContent.eligibility,
    serviceContent.regulatoryPathway,
    serviceContent.flightTrainingPathway,
    serviceContent.whyThisOption,
    ...serviceContent.trainingProcess.flatMap(({ title, description }) => [title, description]),
  ].filter(Boolean).join(' ');
  const visibleWordCount = words(visibleText).length;
  const differentiationMetrics = differentiation?.metrics || differentiation || {};
  const similarity = differentiationMetrics.normalizedSimilarityPercent
    ?? differentiation?.similarityScore;
  const closestComparison = differentiation?.comparisons
    ?.reduce((closest, comparison) => (
      !closest || comparison.normalizedSimilarityPercent > closest.normalizedSimilarityPercent
        ? comparison
        : closest
    ), null) || null;
  const differentiationScore = Number.isFinite(similarity)
    ? clampScore(100 - similarity)
    : 0;
  const factualSafetyScore = safetyViolations.length === 0 ? 100 : 0;
  const identityCheck = geographicIdentityValid;
  const hierarchyCheck = hierarchyValid;
  const serviceCheck = serviceValid;
  const contentCheck = Boolean(
    visibleWordCount >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minVisibleWords
    && content.introduction?.trim()
    && content.localApplication?.trim()
    && content.locationSpecificSections.length > 0,
  );
  const metadataCheck = Boolean(
    content.seoTitle?.includes(record.canonicalName || record.name)
    && content.seoTitle.toLowerCase().includes(service.shortName.toLowerCase())
    && content.seoDescription?.includes(record.canonicalName || record.name)
    && content.h1?.includes(record.canonicalName || record.name)
    && content.seoTitle !== content.h1,
  );
  const faqCheck = content.faqs.length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minFaqs;
  const regulatoryCheck = Boolean(
    aviation.regulatoryContext?.authority
    && /^https:\/\//.test(aviation.regulatoryContext?.source || ''),
  );
  const aviationContextCheck = Boolean(
    aviation.aviationRelevance?.trim()
    && (directFactCount + regionalFactCount > 0)
    && sources.length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minSourceCount,
  );
  const sourceCheck = sources.length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minSourceCount
    && sources.every((href) => /^https:\/\//.test(href));
  const linksCheck = content.internalLinks.length
    >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minInternalLinks;
  const canonicalCheck = content.canonicalPath === `/${routeSlug}/${service.slug}`;
  const jsonLdCheck = content.jsonLdReady === true;
  const differentiationCheck = differentiation?.status === 'PASSED'
    && differentiation?.differentiationStatus === 'DIFFERENTIATED'
    && differentiation?.exactDuplicate !== true
    && differentiation?.uniqueFAQCount >= GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.minUniqueFaqs
    && differentiation?.uniqueSectionCount >= GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.minUniqueSections
    && Number.isFinite(similarity)
    && similarity < GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.maxNormalizedSimilarityPercent;
  const checks = {
    locationIdentity: identityCheck,
    hierarchy: hierarchyCheck,
    country: record.countryCode === 'IN',
    service: serviceCheck,
    content: contentCheck,
    locationSpecificContent: content.locationSpecificSections.length > 0
      && differentiationMetrics.locationSpecificContentPercent
        >= GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation.minLocationSpecificContentPercent,
    uniqueTitleDescriptionH1: metadataCheck,
    meaningfulVisibleContent: visibleWordCount >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minVisibleWords,
    faqs: faqCheck,
    regulatoryContext: regulatoryCheck,
    aviationContext: aviationContextCheck,
    sourceEvidence: sourceCheck,
    internalLinks: linksCheck,
    canonical: canonicalCheck,
    jsonLd: jsonLdCheck,
    differentiation: differentiationCheck,
    unsupportedClaims: factualSafetyScore === 100,
    locationEvidenceProfile: !pilotTrainingPage
      || pilotTrainingPage.evidenceProfile?.level === 'STRONG',
  };
  const blockers = Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => `${name} did not meet the geographic page quality threshold.`);
  if (pilotTrainingPage && pilotTrainingPage.evidenceProfile?.level !== 'STRONG') {
    blockers.push(...(pilotTrainingPage.evidenceProfile?.reasons || []));
  }
  const evidenceScore = pilotTrainingPage?.evidenceProfile?.score ?? clampScore(
    (geographicIdentityValid ? 25 : 0)
      + (regulatoryCheck ? 15 : 0)
      + (sourceCheck ? 10 : 0)
      + (directFactCount + regionalFactCount > 0 ? 20 : 0)
      + (geographicSourceCount > 0 ? 15 : 0),
  );
  const usefulnessScore = clampScore(
    (hierarchy.length >= 3 ? 15 : hierarchy.length * 5)
      + (content.locationSpecificSections.length > 0 ? 15 : 0)
      + (serviceCheck ? 20 : 0)
      + (regulatoryCheck ? 10 : 0)
      + (faqCheck ? 15 : 0)
      + (linksCheck ? 10 : 0)
      + (content.localApplication ? 10 : 0)
      + (aviationContextCheck ? 5 : 0),
  );

  return {
    state: factualSafetyScore === 0 ? 'REJECTED' : blockers.length ? 'NOINDEX' : 'INDEXABLE',
    scores: {
      evidenceScore,
      usefulnessScore,
      differentiationScore,
      factualSafetyScore,
    },
    evidenceMetrics: {
      directAviationFactCount: directFactCount,
      regionalAviationFactCount: regionalFactCount,
      aviationSourceCount,
      geographicSourceCount,
      sourceCount: sources.length,
    },
    geographicIdentity: {
      valid: geographicIdentityValid,
      ambiguous: record.ambiguous === true || record.resolutionStatus === 'AMBIGUOUS',
    },
    geographicHierarchy: {
      valid: hierarchyValid,
      records: aviation.geographicContext,
    },
    checks,
    blockers,
    visibleWordCount,
    unsupportedClaims: safetyViolations,
    differentiation: differentiation
      ? {
        ...differentiation,
        normalizedSimilarityPercent: similarity ?? null,
        similarityScore: similarity ?? null,
        exactDuplicatePercent: differentiationMetrics.exactDuplicatePercent ?? null,
        uniqueSectionCount: differentiation.uniqueSectionCount
          ?? differentiationMetrics.uniqueSectionCount
          ?? 0,
        uniqueFAQCount: differentiation.uniqueFAQCount
          ?? differentiationMetrics.uniqueFAQCount
          ?? differentiationMetrics.uniqueFaqCount
          ?? 0,
        closestComparison: closestComparison
          ? {
            slug: closestComparison.slug,
            normalizedSimilarityPercent: closestComparison.normalizedSimilarityPercent,
            exactDuplicate: closestComparison.exactDuplicate,
          }
          : null,
      }
      : null,
    eligibleByQuality: blockers.length === 0,
  };
}

export { scoreIndiaLocationContent };
