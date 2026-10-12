const ADMINISTRATIVE_TYPES = new Set([
  'state',
  'province',
  'region',
  'county',
  'district',
  'subdistrict',
  'territory',
]);
const PILOT_TRAINING_EVIDENCE_TYPES = new Set([
  'flight-school',
  'flying-club',
  'aviation-college',
  'aviation-academy',
  'pilot-training-organization',
  'airline-training-organization',
]);

function sourceLink(href, label, category) {
  return /^https:\/\//.test(href || '')
    ? { href, label, category }
    : null;
}

function section(category, title, paragraphs, sources = [], items = []) {
  const body = [
    ...paragraphs.filter(Boolean),
    ...items.flatMap(({ label, value }) => [label, value]),
  ].join(' ');
  return {
    category,
    title,
    paragraphs: paragraphs.filter(Boolean),
    items,
    body,
    verified: true,
    sourceLinks: [...new Map(sources.filter(Boolean).map((item) => [item.href, item])).values()],
  };
}

function aviationParagraphs({
  directAviationFacts,
  regionalAviationFacts,
  nearbyAirportRecords,
  hasCoordinates,
}) {
  const paragraphs = [];
  for (const fact of directAviationFacts) {
    paragraphs.push(`${fact.fact || fact.text}${fact.source ? ` Source: ${fact.source}.` : ''}`);
  }
  for (const fact of regionalAviationFacts) {
    const parent = fact.contextGeography?.name || fact.contextGeography?.type;
    paragraphs.push(
      `${parent ? `Regional context for ${parent}: ` : 'Regional context: '}${fact.fact || fact.text}${fact.attributionNote ? ` ${fact.attributionNote}` : ''}`,
    );
  }
  if (paragraphs.length === 0) {
    if (nearbyAirportRecords.length) {
      const airportPoints = nearbyAirportRecords.map(({ name, distanceKm }) => (
        `${name}${Number.isFinite(distanceKm) ? ` (${distanceKm} km straight-line)` : ''}`
      )).join('; ');
      paragraphs.push(
        `GeoNames has airport map points in its proximity results: ${airportPoints}. These are gazetteer references only; they do not verify airport operations, a training organization or travel distance.`,
      );
    } else {
      paragraphs.push(
        hasCoordinates
          ? 'No source-backed aviation or training-organization record is linked to this registry point. This evidence gap does not establish that none exists.'
          : 'No source-backed aviation record is linked to this place, and missing coordinates prevent a proximity lookup. Neither establishes whether facilities exist nearby.',
      );
    }
  }
  return paragraphs;
}

function evidenceLimit(level, directTrainingFacts, regionalTrainingFacts) {
  if (level === 'STRONG') return null;
  if (directTrainingFacts.length || regionalTrainingFacts.length) {
    return 'The reviewed sources include training-related listings, but the available evidence does not meet the STRONG location-specific profile. A listing does not confirm current operations, admissions or course availability; verify those details directly.';
  }
  if (level === 'MEDIUM') {
    return 'Some source-backed aviation context is available, but no pilot-training organization is verified for this place in the reviewed evidence. This limit does not establish that none exists.';
  }
  return 'The reviewed evidence does not establish local aviation or pilot-training provision. This gap does not prove that no provider exists.';
}

function applicantGuidance(record, hierarchy) {
  const name = record.canonicalName || record.name;
  const parent = hierarchy.at(-2);
  if (ADMINISTRATIVE_TYPES.has(record.type)) {
    return `${name} is an administrative ${record.type} under ${parent?.name || record.country}, not a provider address. Compare each provider's stated theory location and flight-training base with the applicant's actual starting point.`;
  }
  return `${name} is recorded as a ${record.type} within ${parent?.name || record.country}; use the applicant's actual starting point when comparing provider locations and flight-training bases.`;
}

function applicationSteps(regulator, directAviationFacts, regionalAviationFacts) {
  const trainingEvidence = [...directAviationFacts, ...regionalAviationFacts]
    .some(({ type, verificationStatus, evidenceId, geographicRelationship, sourceUrl, href }) => (
      PILOT_TRAINING_EVIDENCE_TYPES.has(type)
      && verificationStatus === 'primary-source-listed'
      && evidenceId
      && /^https:\/\//.test(sourceUrl || href || '')
      && ['located-within', 'regional-context'].includes(geographicRelationship)
    ));
  return [
    `Check ${regulator.authority}'s current eligibility, medical and examination requirements for the intended licence.`,
    trainingEvidence
      ? `For any listed organization, confirm current approval, scope and operating base with ${regulator.authority} and the organization.`
      : 'No training provider is verified for this place; do not infer one from a geographic airport point.',
  ];
}

function selectedMasterBlocks(masterContent) {
  const allowed = masterContent?.countryCode === 'IN'
    ? new Set(['pilot_training_overview'])
    : new Set(['aviation_facilities']);
  return (masterContent?.blocks || [])
    .filter(({ categoryId }) => allowed.has(categoryId))
    .slice(0, 1)
    .map(({ categoryId, heading, excerpt, sourceFile }) => ({
      categoryId,
      heading,
      excerpt,
      sourceFile,
    }));
}

function buildEvidenceProfile({
  record,
  hierarchy,
  regulator,
  directAviationFacts,
  regionalAviationFacts,
  aviationFaqs,
  nearbyAirportRecords,
}) {
  const validSource = (href) => /^https:\/\//.test(href || '');
  const primaryDirectFacts = directAviationFacts.filter((fact) => (
    fact.verificationStatus === 'primary-source-listed'
    && fact.geographicRelationship === 'located-within'
    && fact.evidenceId
    && validSource(fact.sourceUrl || fact.href || fact.evidence?.href)
    && Boolean(fact.fact || fact.text)
  ));
  const verifiedRegionalFacts = regionalAviationFacts.filter((fact) => (
    fact.verificationStatus === 'primary-source-listed'
    && fact.geographicRelationship === 'regional-context'
    && fact.evidenceId
    && validSource(fact.sourceUrl || fact.href || fact.evidence?.href)
    && Boolean(fact.fact || fact.text)
  ));
  const nonMedicalDirectFacts = primaryDirectFacts.filter(({ type }) => type !== 'medical-centre');
  const nonMedicalRegionalFacts = verifiedRegionalFacts.filter(({ type }) => type !== 'medical-centre');
  const directTrainingFacts = nonMedicalDirectFacts.filter(({ type, pilotTrainingRelevance }) => (
    PILOT_TRAINING_EVIDENCE_TYPES.has(type)
    && pilotTrainingRelevance !== 'historical-not-operational'
  ));
  const regionalTrainingFacts = nonMedicalRegionalFacts.filter(({ type, pilotTrainingRelevance }) => (
    PILOT_TRAINING_EVIDENCE_TYPES.has(type)
    && pilotTrainingRelevance !== 'historical-not-operational'
  ));
  const trainingFactIds = new Set([
    ...directTrainingFacts,
    ...regionalTrainingFacts,
  ].map(({ evidenceId }) => evidenceId));
  const linkedHierarchyNodes = hierarchy.filter((node) => (
    validSource(node.sourceUrl)
    || (node.sourceLinks || []).some(({ href }) => validSource(href))
  )).length;
  const regulatorVerified = Boolean(regulator.authority && validSource(regulator.source));
  const directFactIds = new Set(primaryDirectFacts.map(({ evidenceId }) => evidenceId));
  const locationFaqCount = aviationFaqs.filter(({ evidenceId }) => (
    directFactIds.has(evidenceId)
  )).length;
  const trainingFaqCount = aviationFaqs.filter(({ evidenceId }) => (
    trainingFactIds.has(evidenceId)
  )).length;
  const aviationSourceCount = new Set([
    ...nonMedicalDirectFacts.map((fact) => fact.sourceUrl || fact.href || fact.evidence?.href),
    ...nonMedicalRegionalFacts.map((fact) => fact.sourceUrl || fact.href || fact.evidence?.href),
  ].filter(validSource)).size;
  const distinctDirectTypes = new Set(nonMedicalDirectFacts.map(({ type }) => type).filter(Boolean)).size;
  const verifiedEvidence = [...primaryDirectFacts, ...verifiedRegionalFacts];
  const nonMedicalEvidence = verifiedEvidence.filter(({ type }) => type !== 'medical-centre');
  const distinctEvidenceTypes = new Set(nonMedicalEvidence.map(({ type }) => type).filter(Boolean)).size;
  const distinctEvidenceIds = new Set(nonMedicalEvidence.map(({ evidenceId }) => evidenceId).filter(Boolean)).size;
  const directTrainingTypes = new Set(directTrainingFacts.map(({ type }) => type));
  const regionalTrainingTypes = new Set(regionalTrainingFacts.map(({ type }) => type));
  const pilotTrainingEvidenceScore = Math.min(100, (
    trainingFactIds.size * 15
    + directTrainingFacts.length * 10
    + regionalTrainingFacts.length * 5
    + (directTrainingTypes.size + regionalTrainingTypes.size) * 10
    + (trainingFaqCount > 0 ? 10 : 0)
  ));
  const score = Math.min(100, (
    (regulatorVerified ? 15 : 0)
    + (hierarchy.length >= 3 && linkedHierarchyNodes >= 2 ? 10 : hierarchy.length >= 2 ? 5 : 0)
    + Math.min(35, nonMedicalDirectFacts.length ? 25 + Math.max(0, distinctDirectTypes - 1) * 10 : 0)
    + (regionalTrainingFacts.length ? 10 : 0)
    + (trainingFaqCount > 0 ? 10 : 0)
    + (directTrainingFacts.length && trainingFaqCount > 0 ? 10 : 0)
    + (aviationSourceCount ? 10 : 0)
  ));
  const strong = score >= 70
    && regulatorVerified
    && hierarchy.length >= 3
    && linkedHierarchyNodes >= 2
    && trainingFactIds.size > 0
    && trainingFaqCount > 0
    && nonMedicalEvidence.length > 0
    && distinctEvidenceIds >= 2
    && distinctEvidenceTypes >= 2
    && aviationSourceCount >= 2;
  const evidenceContextCount = primaryDirectFacts.length + verifiedRegionalFacts.length;
  const level = strong
    ? 'STRONG'
    : score >= 35 && evidenceContextCount > 0
      ? 'MEDIUM'
      : 'THIN';
  const reasons = level === 'THIN'
    ? ['Available evidence is limited to geographic identity, hierarchy, regulator mapping, generic training guidance, or unverified gazetteer points.']
    : level === 'MEDIUM'
      ? ['Some source-attributed aviation context exists, but the profile lacks the combination of direct, location-specific evidence needed for a strong page.']
      : [];
  return {
    level,
    score,
    eligibleForIndexabilityEvaluation: level === 'STRONG',
    reasons,
    criteria: {
      regulatorVerified,
      hierarchyDepth: hierarchy.length,
      linkedHierarchyNodeCount: linkedHierarchyNodes,
      primarySourceDirectAviationFactCount: primaryDirectFacts.length,
      primarySourceDirectPilotTrainingFactCount: directTrainingFacts.length,
      distinctDirectAviationTypes: distinctDirectTypes,
      primarySourceRegionalAviationFactCount: verifiedRegionalFacts.length,
      primarySourceRegionalPilotTrainingFactCount: regionalTrainingFacts.length,
      pilotTrainingEvidenceCount: trainingFactIds.size,
      pilotTrainingEvidenceScore,
      evidenceLinkedPilotTrainingFaqCount: trainingFaqCount,
      verifiedAviationEvidenceCount: distinctEvidenceIds,
      distinctAviationEvidenceTypes: distinctEvidenceTypes,
      evidenceLinkedLocationFaqCount: locationFaqCount,
      distinctAviationSourceCount: aviationSourceCount,
      gazetteerAirportRecordCount: nearbyAirportRecords.length,
    },
    locationId: record.id || null,
  };
}

function visibleTextForPage({
  breadcrumbs,
  eyebrow,
  h1,
  introduction,
  sections,
  masterBlocks,
  relationship,
  faqTitle,
  faqs,
  links,
  ctaLabel,
}) {
  return [
    'Home',
    ...breadcrumbs,
    eyebrow,
    h1,
    introduction,
    ...sections.flatMap(({ title, paragraphs, items, sourceLinks }) => [
      title,
      ...paragraphs,
      ...items.flatMap(({ label, value }) => [label, value]),
      ...sourceLinks.map(({ label }) => label),
    ]),
    ...(masterBlocks.length ? ['Pilot-training reference', ...masterBlocks.flatMap(({ heading, excerpt, sourceFile }) => [
      heading,
      excerpt,
      sourceFile,
    ])] : []),
    "We One Aviation's role",
    relationship,
    'FAQ',
    faqTitle,
    ...faqs.flatMap(({ question, answer }) => [question, answer]),
    'Related guidance',
      ...links.flatMap(({ context, label }) => [context, label]),
      ctaLabel,
    ].filter(Boolean);
}

export function buildLocationPilotTrainingPage({
  record,
  hierarchy,
  regulator,
  masterContent,
  serviceContent,
  directAviationFacts = [],
  regionalAviationFacts = [],
  aviationFaqs = [],
  nearbyAirportRecords = [],
  relationshipStatement,
  internalLinks = [],
  serviceShortName = 'Pilot training',
  h1,
  ctaLabel,
  breadcrumbLabels = [],
}) {
  if (!record || !Array.isArray(hierarchy) || !regulator) {
    throw new TypeError('A source location, resolved hierarchy and regulator are required.');
  }
  const name = record.canonicalName || record.name;
  const hasCoordinates = Number.isFinite(record.latitude) && Number.isFinite(record.longitude);
  const hierarchyNames = hierarchy.map(({ name: nodeName, type }) => `${nodeName} (${type})`);
  const locationSources = [
    sourceLink(record.sourceUrl, `${record.source || 'Geographic registry'} record for ${name}`, 'geography'),
  ];
  const regulatorSources = [
    sourceLink(regulator.source, `${regulator.authority} official information`, 'regulator'),
  ];
  const aviationSources = [
    ...directAviationFacts.map((fact) => sourceLink(
      fact.sourceUrl || fact.href || fact.evidence?.href,
      fact.source || fact.publisher || fact.name || 'Source-attributed aviation record',
      'aviation',
    )),
    ...regionalAviationFacts.map((fact) => sourceLink(
      fact.sourceUrl || fact.href || fact.evidence?.href,
      fact.source || fact.publisher || fact.name || 'Regional aviation source',
      'aviation',
    )),
    ...nearbyAirportRecords.map((airport) => sourceLink(
      airport.sourceUrl,
      `GeoNames record for ${airport.name}`,
      'gazetteer',
    )),
  ];
  const aviationDetails = aviationParagraphs({
    directAviationFacts,
    regionalAviationFacts,
    nearbyAirportRecords,
    hasCoordinates,
  });
  const evidenceProfile = buildEvidenceProfile({
    record,
    hierarchy,
    regulator,
    directAviationFacts,
    regionalAviationFacts,
    aviationFaqs,
    nearbyAirportRecords,
  });
  const directTrainingFacts = directAviationFacts.filter(({
    type,
    verificationStatus,
    geographicRelationship,
    evidenceId,
    sourceUrl,
    href,
  }) => (
    PILOT_TRAINING_EVIDENCE_TYPES.has(type)
    && verificationStatus === 'primary-source-listed'
    && geographicRelationship === 'located-within'
    && evidenceId
    && /^https:\/\//.test(sourceUrl || href || '')
  ));
  const regionalTrainingFacts = regionalAviationFacts.filter(({
    type,
    verificationStatus,
    geographicRelationship,
    evidenceId,
    sourceUrl,
    href,
  }) => (
    PILOT_TRAINING_EVIDENCE_TYPES.has(type)
    && verificationStatus === 'primary-source-listed'
    && geographicRelationship === 'regional-context'
    && evidenceId
    && /^https:\/\//.test(sourceUrl || href || '')
  ));
  evidenceProfile.indexabilityTreatment = (
    record.countryCode !== 'IN' || evidenceProfile.level === 'STRONG'
  )
    ? 'CURRENT_QUALITY_AND_APPROVAL_GATES_REQUIRED'
    : 'NOINDEX';
  const hierarchyItems = hierarchy.map(({ name: nodeName, type }) => ({
    label: type,
    value: nodeName,
  }));
  if (hasCoordinates) {
    hierarchyItems.push({
      label: 'registry reference point',
      value: `${record.latitude}, ${record.longitude} (source point, not a service address or travel distance)`,
    });
  }
  const locationSection = section(
    'LOCATION_HIERARCHY_CONTENT',
    `Recorded hierarchy for ${name}`,
    [
      `Geographic registry identity: ${record.type}; this hierarchy does not identify a training address.`,
    ],
    locationSources,
    hierarchyItems,
  );
  const regulatorySection = section(
    'REGULATORY_CONTENT',
    `${regulator.country}: ${regulator.authority} jurisdiction`,
    [
      `${regulator.authority} administers pilot licensing in ${regulator.country}; check current rules for the intended licence with the authority.`,
    ],
    regulatorSources,
  );
  const aviationSection = section(
    'LOCATION_AVIATION_EVIDENCE',
    evidenceProfile.level === 'STRONG'
      ? `Source-backed aviation and training records for ${name}`
      : `Aviation evidence limits for ${name}`,
    [
      ...aviationDetails,
      evidenceLimit(evidenceProfile.level, directTrainingFacts, regionalTrainingFacts),
    ],
    aviationSources,
  );
  const nextSteps = applicationSteps(regulator, directAviationFacts, regionalAviationFacts);
  const applicationSection = section(
    'LOCATION_APPLICATION_CONTENT',
    `Planning from this ${record.type}`,
    [
      applicantGuidance(record, hierarchy),
    ],
    locationSources,
    nextSteps.map((value, index) => ({
      label: ['Check licensing requirements', 'Verify the training base'][index],
      value,
    })),
  );
  const knowledgeBlocks = evidenceProfile.level === 'STRONG'
    ? selectedMasterBlocks(masterContent)
    : [];
  const countrySection = section(
    'COUNTRY_CONTENT',
    regulator.country === 'India' ? 'India pilot-training reference' : `${regulator.country} training reference`,
    knowledgeBlocks.map(({ excerpt }) => excerpt),
    [],
  );
  const sections = [
    locationSection,
    regulatorySection,
    aviationSection,
    applicationSection,
    ...(countrySection.paragraphs.length ? [countrySection] : []),
  ];
  const faqTitle = `${serviceShortName} questions for ${record.city || name}`;
  const parent = hierarchy.at(-2);
  const hasDirectTrainingEvidence = directTrainingFacts.length > 0;
  const hasRegionalTrainingEvidence = regionalTrainingFacts.length > 0;
  const placeFaq = {
    question: `Does this ${record.type} record identify a training base?`,
    answer: ADMINISTRATIVE_TYPES.has(record.type)
      ? `No. It records a ${record.type} under ${parent?.name || regulator.country}; it is a search area, not a provider address.`
      : `No. It records a ${record.type} within ${parent?.name || regulator.country}; it does not name a provider or training base.`,
  };
  const providerFaq = {
    question: `What should an applicant from ${name} verify before choosing a provider?`,
    answer: hasDirectTrainingEvidence
      ? `Check the listed organization’s current approval, licence scope, operating base and admissions directly with ${regulator.authority} and the organization. The source listing alone does not confirm current availability.`
      : hasRegionalTrainingEvidence
        ? `A source-listed training organization is recorded in the parent-region context, not as a provider in ${name}. Confirm the actual base, current approval and admissions directly with ${regulator.authority} and the organization.`
      : `Check ${regulator.authority}'s current approved-organization information, then confirm the provider's licence scope, actual operating base and admissions directly. No provider is verified for this place in the evidence reviewed here.`,
  };
  const sourceFaqIds = new Set(aviationFaqs
    .filter(({ question, answer, evidenceId }) => question && answer && evidenceId)
    .map(({ evidenceId }) => evidenceId));
  const sourcedFaqs = [...directTrainingFacts, ...regionalTrainingFacts]
    .filter(({ evidenceId }) => sourceFaqIds.has(evidenceId))
    .map((fact) => {
      const { evidenceId, name: organizationName } = fact;
      const sourceDate = fact.sourceDate ? ` The source is dated ${fact.sourceDate}.` : '';
      const regionalScope = fact.geographicRelationship === 'regional-context';
      const contextName = fact.contextGeography?.name
        || hierarchy.slice(0, -1).at(-1)?.name
        || regulator.country;
      return {
        question: regionalScope
          ? `What should applicants verify about the regional listing for ${organizationName}?`
          : `What should applicants verify about ${organizationName}'s source listing?`,
        answer: regionalScope
          ? `The source associates ${organizationName} with ${contextName}, not necessarily ${name}.${sourceDate} Confirm its current operating status, approval scope, actual base and admissions directly with ${regulator.authority} and the organization.`
          : `The source identifies ${organizationName} as a pilot-training organization associated with ${name}.${sourceDate} Confirm its current operating status, approval scope, base and admissions directly with ${regulator.authority} and the organization.`,
        evidenceId,
      };
    })
    .slice(0, 2);
  const faqs = [
    placeFaq,
    {
      question: `Which authority should an applicant check for pilot-training requirements in ${regulator.country}?`,
      answer: `${regulator.authority} is the authority mapped to ${regulator.country}. Confirm current licensing, medical and examination requirements with its official guidance.`,
    },
    providerFaq,
    ...sourcedFaqs,
  ];
  const selectedLinks = internalLinks.slice(0, 2);
  const eyebrow = hierarchyNames.join(' · ');
  const finalH1 = h1 || `Pilot training guidance for ${name}`;
  const finalIntroduction = evidenceProfile.level === 'THIN'
    ? `${name} is a ${record.type} under ${parent?.name || regulator.country} in ${regulator.country}. ${regulator.authority} administers pilot licensing. The reviewed evidence does not establish local aviation or training provision; use the official regulator guidance to check requirements and verify providers.`
    : `${name} is a ${record.type} under ${parent?.name || regulator.country} in ${regulator.country}. ${regulator.authority} administers pilot licensing. The cited aviation records below have stated geographic scope; verify current provider approval and training arrangements directly.`;
  const finalCtaLabel = ctaLabel || 'Ask about current training information';
  const page = {
    evidenceProfile: {
      ...evidenceProfile,
      nearbyAirportRecordCount: nearbyAirportRecords.length,
      hasCoordinates,
      hasTimeZone: Boolean(record.timezone),
      hasPopulation: Number.isFinite(record.population) && record.population > 0,
    },
    serviceShortName,
    breadcrumbs: breadcrumbLabels,
    eyebrow,
    h1: finalH1,
    introduction: finalIntroduction,
    sections,
    masterBlocks: knowledgeBlocks,
    countryKnowledgeSection: countrySection,
    relationship: relationshipStatement,
    faqTitle,
    faqs,
    links: selectedLinks,
    ctaLabel: finalCtaLabel,
  };
  page.visibleText = visibleTextForPage(page);
  return page;
}
