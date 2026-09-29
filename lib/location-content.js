const crypto = require('crypto');

const INDEXABILITY_CRITERIA = {
  noStateConflict: true,
  verifiedPinPostOfficeStateDistrictAndLocality: true,
  meaningfulLocality: true,
  minimumVerifiedGeographicFacts: 5,
  minimumGeographicFactWordPercentage: 12,
  minimumUniqueEditorialWords: 120,
  editorialSourceRequiredPerSection: true,
  editorialApprovalRequired: true,
  distinctSearchIntentReviewRequired: true,
  lowDoorwayRiskReviewRequired: true,
  maximumReviewedPageSimilarity: 0.8,
  uniqueCanonicalRequired: true,
  factualLocationFaqsRequired: 2,
};

const COURSE_INFORMATION = [
  {
    key: 'dgca',
    title: 'DGCA ground classes',
    href: '/dgca-ground-classes',
    summary: 'Preparation for five DGCA written papers; RTR (A) is separate. Online and Dwarka classroom modes are listed.',
    source: 'https://weoneaviation.in/dgca-ground-classes',
  },
  {
    key: 'cpl',
    title: 'Commercial Pilot Licence (CPL) guide',
    href: '/commercial-pilot-license',
    summary: 'Guide to eligibility, examinations, medical requirements and flight-training milestones; sequencing varies by school and student.',
    source: 'https://weoneaviation.in/commercial-pilot-license',
  },
  {
    key: 'atpl',
    title: 'ATPL ground preparation',
    href: '/courses/atpl',
    summary: 'Ground-subject preparation for pilots progressing to ATPL after a CPL.',
    source: 'https://weoneaviation.in/courses/atpl',
  },
];

const NON_GEOGRAPHIC_WORDS = new Set([
  'and', 'area', 'code', 'district', 'for', 'from', 'india', 'near', 'office',
  'offices', 'place', 'pilot', 'postal', 'post', 'state', 'the', 'training',
]);

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function countWords(value) {
  return String(value || '').match(/\b[\w'-]+\b/g)?.length || 0;
}

function normalizeTemplateText(value) {
  return normalize(value)
    .replace(/\[location\]/g, '[location]')
    .replace(/\[number\]/g, '[number]')
    .replace(/\s+/g, ' ')
    .trim();
}

function meaningfulLocality(value) {
  const letters = String(value || '').match(/[a-z]/gi) || [];
  return letters.length >= 3 && normalize(value).split(' ').some((word) => word.length >= 3);
}

function hashText(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function replaceLocationValues(text, location) {
  const values = [
    location.locality,
    location.district,
    location.state,
    location.taluk,
    location.geoNamesPlaceName,
    ...(location.pinCodes || [location.pinCode]),
    ...(location.postOfficeNames || []),
    ...(location.geoNamesPlaceNames || []),
  ]
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  return values.reduce((output, value) => (
    output.replace(new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '[LOCATION]')
  ), text);
}

function buildLocationContent(location) {
  const locality = location.locality || '';
  const district = location.district || '';
  const state = location.state || '';
  const context = [district, state].filter(Boolean).join(', ');
  const pinCodes = location.pinCodes?.length ? location.pinCodes : [location.pinCode];
  const postOffices = [...new Set(location.postOfficeNames || [])].sort((a, b) => a.localeCompare(b));
  const geoNamesPlaceNames = [...new Set(location.geoNamesPlaceNames || [])].sort((a, b) => a.localeCompare(b));
  const visibleGeoNames = geoNamesPlaceNames;
  const remainingGeoNames = Math.max(0, geoNamesPlaceNames.length - visibleGeoNames.length);
  const source = location.fieldSources || {};
  const localityFromGeoNames = source.locality?.source === 'geonames-place-name';
  const localitySourceText = localityFromGeoNames
    ? `GeoNames supplies “${location.geoNamesPlaceName || locality}” as a place name associated with this PIN. The supplied PDF lists the post-office names shown below; it does not list this place name as a post office.`
    : `The locality “${locality}” was matched to a supplied-PDF post-office name and a GeoNames place-name record during enrichment. The match may use a normalized name-prefix; it is a geographic cross-reference, not an official settlement boundary or evidence of a We One Aviation facility.`;
  const summary = `${locality} (PIN ${pinCodes.join(', ')}) is associated with ${district} district, ${state}. The supplied PDF lists ${postOffices.length} post-office name${postOffices.length === 1 ? '' : 's'}; GeoNames provides the district${location.taluk ? ` and the admin-level-3 name ${location.taluk}` : ''}. These are postal and geographic source records, not evidence of academy service availability.`;
  const facts = [
    {
      key: 'pin',
      label: 'PIN code',
      value: pinCodes.join(', '),
      source: source.pinCode,
    },
    {
      key: 'post-offices',
      label: 'Post-office names in the supplied PDF',
      value: postOffices,
      source: source.postOfficeNames,
    },
    {
      key: 'locality',
      label: 'Locality cross-reference',
      value: locality,
      source: source.locality,
    },
    {
      key: 'district',
      label: 'District',
      value: district,
      source: source.district,
    },
    {
      key: 'state',
      label: 'State',
      value: state,
      source: source.state,
    },
    ...(location.taluk ? [{
      key: 'taluk',
      label: 'GeoNames third-level administrative name',
      value: location.taluk,
      source: source.taluk,
    }] : []),
    ...(geoNamesPlaceNames.length ? [{
      key: 'geonames-place-names',
      label: 'GeoNames place names associated with this PIN',
      value: geoNamesPlaceNames,
      source: source.geoNamesPlaceNames,
    }] : []),
  ];
  const geoNamesSentences = geoNamesPlaceNames.length
    ? [`GeoNames lists ${geoNamesPlaceNames.length} place-name entries for this PIN; these dataset records are not verified settlement boundaries.`]
    : [];
  const geographyParagraphs = [
    localitySourceText,
    `${district} is the district name in GeoNames admin level 2. The supplied PDF lists ${state} as the state.`,
    ...(location.taluk ? [`${location.taluk} is the GeoNames admin level 3 name. The source does not independently verify how the relevant local authority labels that unit.`] : []),
    ...geoNamesSentences,
  ];
  const courseFacts = COURSE_INFORMATION.filter((course) => ['dgca', 'cpl', 'atpl'].includes(course.key));
  const localPresenceNote = `The DGCA page lists online and classroom teaching, with classroom teaching identified in Dwarka, New Delhi. This PIN profile does not indicate a branch, office, campus, classroom or instructor in ${locality}.`;
  const postalSectionHeading = `Postal and geographic details for ${locality}`;
  const postOfficeHeading = `Post-office names listed for PIN ${pinCodes.join(', ')}`;
  const geoNamesHeading = `GeoNames place names associated with PIN ${pinCodes.join(', ')}`;
  const courseSectionHeading = `Pilot-training information for students researching ${locality}`;
  const faqSectionHeading = `Questions about ${locality}, PIN ${pinCodes.join(', ')}`;
  const faqs = [
    {
      question: `Which post-office names does the supplied list show for PIN ${pinCodes.join(', ')}?`,
      answer: postOffices.length
        ? `The supplied list shows ${postOffices.join('; ')}. These names are associated with a postal PIN and are not verified as separate settlement boundaries.`
        : `The supplied list contains no post-office name for PIN ${pinCodes.join(', ')} in this record.`,
      source: 'supplied-pdf',
    },
    {
      question: `Which district and administrative names are cross-referenced for ${locality}?`,
      answer: `GeoNames lists ${district} as the district. The supplied PDF lists ${state} as the state${location.taluk ? `; GeoNames also provides ${location.taluk} as its third-level administrative name` : ''}. GeoNames is a secondary source.`,
      source: 'supplied-pdf+geonames',
    },
    ...(geoNamesPlaceNames.length > 1 ? [{
      question: `What other GeoNames place names share PIN ${pinCodes.join(', ')}?`,
      answer: `${visibleGeoNames.join('; ')}${remainingGeoNames ? `; and ${remainingGeoNames} additional GeoNames place-name records` : ''}. These are source records associated with a PIN, not a verified list of distinct settlements.`,
      source: 'geonames',
    }] : []),
    {
      question: `Does this postal record identify a We One Aviation office or campus in ${locality}?`,
      answer: `No. The supplied PDF and GeoNames contain postal and geographic data, not a We One Aviation address. The website identifies classroom DGCA teaching in Dwarka, New Delhi; this record does not establish a local branch, office, campus, classroom or instructor in ${locality}.`,
      source: 'supplied-pdf+geonames+course-page',
    },
  ];
  const editorialSections = Array.isArray(location.editorialSections)
    ? location.editorialSections
      .filter((section) => section?.heading && section?.source && Array.isArray(section.paragraphs))
      .map((section) => ({
        heading: section.heading,
        paragraphs: section.paragraphs.filter((paragraph) => typeof paragraph === 'string' && paragraph.trim()),
        source: section.source,
      }))
      .filter((section) => section.paragraphs.length)
    : [];
  const pageHeading = `Pilot Training Near ${locality}, ${district}, ${state}`;
  const trainingIntro = `The linked course pages describe training scope and delivery; this postal profile does not establish a course offering in ${locality}.`;
  const coursePathway = '';
  const courseLinks = [
    { label: 'DGCA ground classes', href: '/dgca-ground-classes' },
    { label: 'Commercial Pilot Licence (CPL) guide', href: '/commercial-pilot-license' },
    { label: 'ATPL ground preparation', href: '/courses/atpl' },
  ];
  const sourcePages = [...new Set(location.sourcePages || [])].sort((a, b) => a - b);
  const sourcePageText = sourcePages.length
    ? `page${sourcePages.length === 1 ? '' : 's'} ${sourcePages.join(', ')}`
    : 'page not recorded';
  const sourceCitation = `Sources: supplied India PIN Code List PDF, ${sourcePageText}; GeoNames India Postal Code dataset. City is not separately identified in these records.`;
  const sections = [
    {
      key: 'geography',
      heading: postalSectionHeading,
      paragraphs: [summary, ...geographyParagraphs],
    },
    ...editorialSections.map((section, index) => ({
      key: `editorial-${index}`,
      heading: section.heading,
      paragraphs: section.paragraphs,
      source: section.source,
    })),
    {
      key: 'course-pathway',
      heading: courseSectionHeading,
      paragraphs: [trainingIntro, localPresenceNote],
    },
  ];
  const specificFactSentences = [
    `PIN ${pinCodes.join(', ')} is listed in the supplied PDF with post-office names ${postOffices.join('; ')}.`,
    localitySourceText,
    `GeoNames lists ${district} as district and ${state} is the state in the supplied PDF.`,
    ...(location.taluk ? [`GeoNames admin level 3 lists ${location.taluk}.`] : []),
    ...(geoNamesPlaceNames.length
      ? [`GeoNames has ${geoNamesPlaceNames.length} place-name records associated with this PIN: ${geoNamesPlaceNames.join('; ')}.`]
      : []),
  ];
  const visibleTextSegments = [
    'Home',
    'Pilot Training',
    ...context.split(', '),
    locality,
    'Postal-area information',
    pageHeading,
    ...sections.flatMap((section) => [section.heading, ...section.paragraphs, section.source].filter(Boolean)),
    ...facts
      .filter((fact) => fact.key !== 'geonames-place-names')
      .flatMap((fact) => [fact.label, ...(Array.isArray(fact.value) ? fact.value : [fact.value])].filter(Boolean)),
    ...(visibleGeoNames.length
      ? [geoNamesHeading, ...visibleGeoNames]
      : []),
    ...(remainingGeoNames ? [`${remainingGeoNames} additional GeoNames place-name records are associated with this PIN.`] : []),
    sourceCitation,
    'Course information',
    ...courseFacts.flatMap((course) => [course.title, course.summary]),
    ...courseLinks.map((course) => course.label),
    'Contact We One Aviation',
    faqSectionHeading,
    ...faqs.flatMap(({ question, answer }) => [question, answer]),
  ];
  const fullText = visibleTextSegments.join(' ');
  const geographyFactWords = countWords([
    ...facts.flatMap((fact) => Array.isArray(fact.value) ? fact.value : [fact.value]),
    ...specificFactSentences,
  ].join(' '));
  const uniqueGeographicWords = new Set(
    [
      locality,
      district,
      state,
      location.taluk,
      ...pinCodes,
      ...postOffices,
      ...geoNamesPlaceNames,
    ]
      .filter(Boolean)
      .flatMap((value) => normalize(value).split(' '))
      .filter((word) => word && !NON_GEOGRAPHIC_WORDS.has(word)),
  );
  const normalizedTemplate = replaceLocationValues(fullText, location)
    .replace(/\b\d+\b/g, '[NUMBER]')
    .replace(/\s+/g, ' ')
    .trim();
  const visibleHeadings = [
    pageHeading,
    postalSectionHeading,
    postOfficeHeading,
    ...(visibleGeoNames.length ? [geoNamesHeading] : []),
    courseSectionHeading,
    ...courseFacts.map((course) => course.title),
    ...editorialSections.map((section) => section.heading),
    faqSectionHeading,
    ...faqs.map((faq) => faq.question),
  ];
  const visibleParagraphs = [
    summary,
    ...geographyParagraphs,
    sourceCitation,
    ...(remainingGeoNames ? [`${remainingGeoNames} additional GeoNames place-name records are associated with this PIN.`] : []),
    trainingIntro,
    coursePathway,
    ...courseFacts.map((course) => course.summary),
    localPresenceNote,
    ...editorialSections.flatMap((section) => [...section.paragraphs, `Source: ${section.source}`]),
    ...faqs.map((faq) => faq.answer),
  ];

  return {
    context,
    pageHeading,
    pinCodes,
    postOffices,
    geoNamesPlaceNames,
    visibleGeoNames,
    remainingGeoNames,
    facts,
    summary,
    geographyParagraphs,
    localitySourceText,
    localPresenceNote,
    trainingIntro,
    coursePathway,
    courseFacts,
    courseLinks,
    localityMatchesGeoNames: normalize(locality) === normalize(location.geoNamesPlaceName),
    postalSectionHeading,
    postOfficeHeading,
    geoNamesHeading,
    courseSectionHeading,
    faqSectionHeading,
    sections,
    faqs,
    editorialSections,
    visibleHeadings,
    visibleParagraphs,
    editorialWordCount: countWords(editorialSections
      .flatMap((section) => [section.heading, ...section.paragraphs, section.source])
      .join(' ')),
    specificFactSentences,
    visibleTextSegments,
    contentWordCount: countWords(fullText),
    geographyFactWords,
    uniqueGeographicWords: [...uniqueGeographicWords].sort(),
    uniqueGeographicFactCount: specificFactSentences.length,
    uniqueContentPercentage: countWords(fullText)
      ? Math.round((geographyFactWords / countWords(fullText)) * 10000) / 100
      : 0,
    normalizedTemplate,
    templateSignature: hashText(normalizedTemplate),
  };
}

function getGeographicChecks(location) {
  const sources = location.fieldSources || {};
  const postOffices = location.postOfficeNames || [];
  const pdfVerified = sources.pinCode?.source === 'supplied-pdf'
    && /^\d{6}$/.test(String(location.pinCode || ''));
  const postOfficeVerified = sources.postOfficeNames?.source === 'supplied-pdf' && postOffices.length > 0;
  const stateVerified = Boolean(location.state)
    && sources.state?.source === 'supplied-pdf+geonames-crosscheck'
    && sources.state?.confidence === 'high'
    && !location.stateConflict;
  const districtVerified = Boolean(location.district)
    && sources.district?.source === 'geonames-admin2';
  const localityVerified = Boolean(location.locality)
    && ['supplied-pdf+geonames-crosscheck', 'geonames-place-name'].includes(sources.locality?.source);
  const meaningful = meaningfulLocality(location.locality);

  return {
    pdfPinVerified: pdfVerified,
    postOfficeVerified,
    stateVerified,
    districtVerified,
    localityVerified,
    localityMeaningful: meaningful,
    noStateConflict: !location.stateConflict,
    allCriticalGeographyVerified: pdfVerified && postOfficeVerified && stateVerified
      && districtVerified && localityVerified && meaningful && !location.stateConflict,
  };
}

function getContentQualityStatus(location, context = {}) {
  if (location.qualityStatus === 'exclude') return 'EXCLUDE';
  const checks = getGeographicChecks(location);
  if (location.qualityStatus !== 'publish' || !checks.allCriticalGeographyVerified) return 'REVIEW';

  const content = buildLocationContent(location);
  const review = location.editorialReview || {};
  const duplicateGate = Number.isFinite(context.maximumPageSimilarity)
    && context.maximumPageSimilarity <= INDEXABILITY_CRITERIA.maximumReviewedPageSimilarity;
  const factsGate = content.uniqueGeographicFactCount >= INDEXABILITY_CRITERIA.minimumVerifiedGeographicFacts
    && content.uniqueContentPercentage >= INDEXABILITY_CRITERIA.minimumGeographicFactWordPercentage;
  const editorialGate = review.approved === true
    && Boolean(review.reviewedBy && review.reviewedAt)
    && review.searchIntentValidated === true
    && review.doorwayRisk === 'low'
    && content.editorialSections.length > 0
    && content.editorialSections.every((section) => section.source)
    && content.editorialWordCount >= INDEXABILITY_CRITERIA.minimumUniqueEditorialWords;
  const faqGate = content.faqs.filter((faq) => faq.source).length
    >= INDEXABILITY_CRITERIA.factualLocationFaqsRequired;
  const canonicalGate = context.canonicalUnique === true;

  return factsGate && editorialGate && duplicateGate && faqGate && canonicalGate
    ? 'PUBLISH_INDEXABLE'
    : 'PUBLISH_NON_INDEXABLE';
}

function getLocationQualityAssessment(location, templateGroupSize = 1, context = {}) {
  const content = buildLocationContent(location);
  const checks = getGeographicChecks(location);
  const postOfficeCount = content.postOffices.length;
  const placeNameCount = content.geoNamesPlaceNames.length;
  const uniqueGeographicFactCount = content.uniqueGeographicFactCount;
  const qualityScore = {
    geographicVerification: [
      checks.pdfPinVerified,
      checks.postOfficeVerified,
      checks.stateVerified,
      checks.districtVerified,
      checks.localityVerified,
    ].filter(Boolean).length * 8,
    geographicSpecificity: [
      checks.localityMeaningful,
      Boolean(location.district),
      Boolean(location.state),
      Boolean(location.taluk),
      postOfficeCount > 1,
      placeNameCount >= 3,
    ].filter(Boolean).length * 3,
    contentUsefulness: Math.min(12, uniqueGeographicFactCount * 2)
      + (content.faqs.length >= 3 ? 4 : 0)
      + (content.courseLinks.length >= 3 ? 4 : 0),
    duplicateRisk: Math.max(0, 20 - Math.min(20, (templateGroupSize - 1) * 2)),
    canonicalUniqueness: location.canonicalPath ? 2 : 0,
  };
  qualityScore.total = Object.values(qualityScore)
    .filter((value) => typeof value === 'number')
    .reduce((sum, value) => sum + value, 0);

  const verifiedFacts = content.facts
    .filter((fact) => fact.value && fact.source?.source)
    .map((fact) => ({
      field: fact.key,
      value: fact.value,
      source: fact.source.source,
      confidence: fact.source.confidence,
    }));
  const reasons = [];
  if (!checks.allCriticalGeographyVerified) reasons.push('one or more critical geographic checks failed');
  if (location.stateConflict) reasons.push('unresolved source state conflict');
  if (content.uniqueGeographicFactCount < INDEXABILITY_CRITERIA.minimumVerifiedGeographicFacts) {
    reasons.push('insufficient distinct verified geographic facts');
  }
  if (content.uniqueContentPercentage < INDEXABILITY_CRITERIA.minimumGeographicFactWordPercentage) {
    reasons.push('verified geographic facts are below the required share of visible content');
  }
  if (!location.editorialReview?.approved) reasons.push('no approved, cited unique editorial material');
  if (content.editorialWordCount < INDEXABILITY_CRITERIA.minimumUniqueEditorialWords) {
    reasons.push('unique source-cited editorial content is below the minimum word count');
  }
  if (!location.editorialReview?.searchIntentValidated) reasons.push('distinct search intent has not been editorially validated');
  if (location.editorialReview?.doorwayRisk !== 'low') reasons.push('doorway risk has not been reviewed as low');
  if (content.faqs.filter((faq) => faq.source).length < INDEXABILITY_CRITERIA.factualLocationFaqsRequired) {
    reasons.push('insufficient source-backed location FAQs');
  }
  if (templateGroupSize > 1) reasons.push(`normalized content template is shared by ${templateGroupSize} candidates`);
  if (!Number.isFinite(location.editorialReview?.maximumPageSimilarity)) {
    reasons.push('page similarity has not been reviewed');
  } else if (location.editorialReview.maximumPageSimilarity > INDEXABILITY_CRITERIA.maximumReviewedPageSimilarity) {
    reasons.push('reviewed page similarity exceeds the maximum');
  }
  if (!location.canonicalPath) reasons.push('canonical path is missing');
  if (context.canonicalUnique !== true) reasons.push('canonical path is not confirmed unique among publishable records');

  const intentPatterns = location.locality && location.pinCode && location.district
    ? [
        `pilot training in ${location.locality}`,
        `pilot training near ${location.pinCode}`,
        `CPL course near ${location.locality}`,
        `pilot training in ${location.district}`,
        `CPL training near ${location.pinCode}`,
      ]
    : [];
  const status = getContentQualityStatus(location, {
    canonicalUnique: context.canonicalUnique === true,
    maximumPageSimilarity: context.maximumPageSimilarity ?? location.editorialReview?.maximumPageSimilarity,
  });

  return {
    qualityScore,
    geographicChecks: checks,
    geographicSpecificity: {
      meaningfulLocality: checks.localityMeaningful,
      districtAvailable: Boolean(location.district),
      stateAvailable: Boolean(location.state),
      talukAvailable: Boolean(location.taluk),
      postOfficeCount,
      geoNamesPlaceNameCount: placeNameCount,
      uniqueGeographicFactCount,
      uniqueGeographicWords: content.uniqueGeographicWords.length,
    },
    searchIntent: {
      classification: intentPatterns.length ? 'geographic-commercial-query-patterns' : 'not-assessed',
      queryPatterns: intentPatterns,
      searchVolumeAvailable: false,
    },
    contentUsefulness: {
      verifiedFactCount: verifiedFacts.length,
      verifiedFacts,
      usefulCourses: content.courseLinks.map(({ label, href }) => ({ label, href })),
      locationFaqCount: content.faqs.filter((faq) => faq.source).length,
      contentWordCount: content.contentWordCount,
      uniqueContentPercentage: content.uniqueContentPercentage,
      uniqueGeographicFactCount,
    },
    duplicateRisk: {
      normalizedTemplateGroupSize: templateGroupSize,
      exactTemplateSimilarity: templateGroupSize > 1 ? 1 : 0,
      distinctTemplate: templateGroupSize === 1,
    },
    qualityStatus: status,
    reasons: reasons.length ? reasons : ['all explicit indexability criteria passed'],
  };
}

function buildLocationMetadata(location) {
  const title = `Pilot Training Near ${location.locality}, ${location.district}, ${location.state} | We One Aviation`;
  const description = `Verified postal details for ${location.locality}, PIN ${location.pinCode}, ${location.district}, ${location.state}. Compare DGCA and CPL course guidance; no local branch is implied.`;
  return { title, description };
}

module.exports = {
  COURSE_INFORMATION,
  INDEXABILITY_CRITERIA,
  buildLocationContent,
  buildLocationMetadata,
  countWords,
  getContentQualityStatus,
  getGeographicChecks,
  getLocationQualityAssessment,
  meaningfulLocality,
  normalize,
  normalizeTemplateText,
  replaceLocationValues,
};
