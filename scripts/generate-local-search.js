const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const locationsDir = path.join(root, 'data', 'locations');
const localSeoDir = path.join(root, 'data', 'local-seo');
const enriched = JSON.parse(fs.readFileSync(path.join(locationsDir, 'enriched-locations.json'), 'utf8'));
const pdfRecords = JSON.parse(fs.readFileSync(path.join(locationsDir, 'pin-records.json'), 'utf8'));
const business = JSON.parse(fs.readFileSync(path.join(localSeoDir, 'business-location.json'), 'utf8'));
const academyGeo = JSON.parse(fs.readFileSync(path.join(localSeoDir, 'academy-geo.json'), 'utf8'));
const localityGeography = JSON.parse(fs.readFileSync(path.join(localSeoDir, 'locality-geography-source.json'), 'utf8'));
const indiaCityResearch = JSON.parse(fs.readFileSync(path.join(localSeoDir, 'india-city-research.json'), 'utf8'));
const indiaLocalityResearch = JSON.parse(fs.readFileSync(path.join(localSeoDir, 'india-locality-research.json'), 'utf8'));
const entityAudit = JSON.parse(fs.readFileSync(path.join(localSeoDir, 'business-entity-audit.json'), 'utf8'));
const legacyRoutePath = path.join(root, 'pages', 'pilot-training', '[city]', '[locality].jsx');
const sitemapPath = path.join(root, '.generated-sitemap.xml');
const existingSitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
const pilot = [];

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function slugify(value) {
  return normalize(value).replace(/\s+/g, '-');
}

function classifyObservedIntent(features = {}, status = 'OBSERVED') {
  if (status !== 'OBSERVED') return 'UNKNOWN';
  const localBusiness = /OBSERVED/.test([
    features.localPackOrPlaces,
    features.mapsEntry,
    features.mapsResults,
    features.aviationAcademyListings,
    features.aviationAcademyAndPilotTrainingListings,
    features.pilotTrainingListings,
    features.googlePlacesOrMap,
    features.bingMapOrBusinessPanel,
  ].join(' '));
  const courseResearch = /OBSERVED/.test(features.courseOrCityLandingPages || '')
    || (Array.isArray(features.courseOrCityPages) && features.courseOrCityPages.length > 0)
    || (Array.isArray(features.courseOrLocationPages) && features.courseOrLocationPages.length > 0);
  const informational = /OBSERVED/.test(features.informationalResults || '');
  const localService = /OBSERVED/.test([
    features.pilotTrainingListings,
    features.aviationAcademyAndPilotTrainingListings,
  ].join(' '));
  if (localBusiness && (courseResearch || informational)) return 'MIXED';
  if (localService) return 'LOCAL_SERVICE';
  if (localBusiness) return 'LOCAL_BUSINESS';
  if (courseResearch) return 'COURSE_RESEARCH';
  if (informational) return 'INFORMATIONAL';
  return 'UNKNOWN';
}

function getQueryObservations(observations) {
  return observations.flatMap((observation) => {
    const queries = observation.queries?.length
      ? observation.queries
      : observation.query
        ? [{
          intent: observation.query,
          url: observation.queryUrl,
          engine: observation.engine || 'Google',
          status: 'OBSERVED',
        }]
        : [];
    return queries.map((query) => {
      const status = query.status || 'OBSERVED';
      return {
        query: query.intent || observation.query,
        engine: query.engine || observation.engine || 'Google',
        observedAt: query.observedAt || observation.observedAt || observation.observationScope || null,
        url: query.url || observation.queryUrl || null,
        status,
        searchIntentType: classifyObservedIntent(observation.serpFeatures, status),
        serpFeatures: observation.serpFeatures || {},
        visibleExamples: observation.visibleExamples || [],
        limitations: observation.caveat || observation.interpretation || null,
      };
    });
  });
}

function aggregateSearchIntent(queryObservations) {
  const observedTypes = new Set(queryObservations
    .filter((query) => query.status === 'OBSERVED' && query.searchIntentType !== 'UNKNOWN')
    .map((query) => query.searchIntentType));
  if (!observedTypes.size) return 'UNKNOWN';
  if (observedTypes.size > 1 || observedTypes.has('MIXED')) return 'MIXED';
  return [...observedTypes][0];
}

function classifyCapturedPattern(pattern) {
  if (!pattern || pattern.includes('UNKNOWN_AFTER_RENDER') || pattern.startsWith('NOT_AVAILABLE')) {
    return { components: [], searchIntentType: 'UNKNOWN' };
  }
  const features = {
    localPackOrPlaces: /Places|Map\/local-business panel|business panel|business card|business-profile/i.test(pattern)
      ? 'OBSERVED'
      : '',
    mapsEntry: /Places|Map\/local-business panel|business panel/i.test(pattern) ? 'OBSERVED' : '',
    aviationAcademyListings: /aviation academy|aviation-institute|aviation-education|flying club/i.test(pattern)
      ? 'OBSERVED'
      : '',
    pilotTrainingListings: /pilot-training listings|pilot training listings|CPL institute|CPL training listings/i.test(pattern)
      ? 'OBSERVED'
      : '',
    courseOrCityLandingPages: /course page|course pages|course results|course material|pilot-training page|DGCA-ground-classes page|ground-class pages|CPL listings/i.test(pattern)
      ? 'OBSERVED'
      : '',
    informationalResults: /People also ask|AI Mode/i.test(pattern) ? 'OBSERVED' : '',
  };
  const components = [];
  if (features.localPackOrPlaces) components.push('PLACES_OR_MAP_OR_BUSINESS_PANEL');
  if (/Justdial|Sulekha|directory|category listing/i.test(pattern)) components.push('DIRECTORY_RESULTS');
  if (features.courseOrCityLandingPages) components.push('COURSE_OR_LOCATION_PAGES');
  if (features.informationalResults) components.push('INFORMATIONAL_SERP_FEATURES');
  if (/web results|organic results|organic result/i.test(pattern)) components.push('ORGANIC_WEB_RESULTS');
  if (/shooting range/i.test(pattern)) components.push('OBSERVED_NON_AVIATION_RESULT');
  return {
    components,
    searchIntentType: classifyObservedIntent(features),
  };
}

function getCityBatchQueries(city) {
  const batch = indiaCityResearch.cityResearchBatch;
  if (!batch || !batch.markets.some((market) => normalize(market) === normalize(city))) return [];

  const google = batch.engineCoverage.googleIndia;
  const googleRenderedMarkets = new Set(google.renderedMarketsAllFour.map(normalize));
  const googleBlockedMarkets = new Set(google.blockedMarketsAllFour.map(normalize));
  const bingRenderedMarkets = new Set([...google.blockedMarketsAllFour, 'Faridabad'].map(normalize));
  const googlePatterns = new Map();
  for (const record of batch.googlePatternObservations || []) {
    record.patterns.forEach((pattern, index) => {
      const query = batch.queryTemplates[index].replace('{city}', record.city);
      googlePatterns.set(normalize(query), pattern);
    });
  }
  const bingPatterns = new Map((batch.bingPatternObservations || [])
    .map((record) => [normalize(record.query), record.observed]));
  const templates = batch.queryTemplates;

  return templates.map((template, index) => {
    const query = template.replace('{city}', city);
    const faridabad = normalize(city) === 'faridabad';
    const googleRendered = googleRenderedMarkets.has(normalize(city))
      || (faridabad && index < 2);
    const googleStatus = googleRendered
      ? 'RENDERED'
      : googleBlockedMarkets.has(normalize(city)) || faridabad
        ? 'CAPTCHA_OR_UNUSUAL_TRAFFIC'
        : 'NOT_ATTEMPTED';
    const bingRendered = bingRenderedMarkets.has(normalize(city));
    const googlePattern = googlePatterns.get(normalize(query));
    const bingPattern = bingPatterns.get(normalize(query));
    const googleEvidence = classifyCapturedPattern(googlePattern);
    const bingEvidence = classifyCapturedPattern(bingPattern);
    const observedIntentTypes = [googleEvidence.searchIntentType, bingEvidence.searchIntentType]
      .filter((type) => type !== 'UNKNOWN');
    return {
      query,
      google: {
        status: googleStatus,
        url: `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en&gl=in`,
        serpPattern: googleStatus === 'CAPTCHA_OR_UNUSUAL_TRAFFIC'
          ? 'NOT_AVAILABLE_CAPTCHA_OR_UNUSUAL_TRAFFIC'
          : googlePattern || 'UNKNOWN_AFTER_RENDER',
        observedSerpComponents: googleEvidence.components,
        searchIntentType: googleEvidence.searchIntentType,
      },
      bing: {
        status: bingRendered ? 'RENDERED' : 'NOT_ATTEMPTED',
        url: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
        serpPattern: bingRendered ? bingPattern || 'UNKNOWN_AFTER_RENDER' : 'NOT_ATTEMPTED',
        observedSerpComponents: bingRendered ? bingEvidence.components : [],
        searchIntentType: bingRendered ? bingEvidence.searchIntentType : 'UNKNOWN',
      },
      searchIntentType: observedIntentTypes.length === 0
        ? 'UNKNOWN'
        : observedIntentTypes.length > 1 || observedIntentTypes.includes('MIXED')
          ? 'MIXED'
          : observedIntentTypes[0],
      queryCoverageStatus: googleRendered || bingRendered
        ? 'AT_LEAST_ONE_ENGINE_RENDERED'
        : 'NO_RENDERED_RESULT',
      hasQuerySpecificSerpDetail: [googlePattern, bingPattern]
        .some((pattern) => pattern && pattern !== 'UNKNOWN_AFTER_RENDER'),
    };
  });
}

const enrichedByPin = new Map(enriched.map((location) => [location.pinCode, location]));
const localityGroups = new Map();
const canonicalLocalityByNameAndState = new Map();
const postOfficeGroups = new Map();

for (const location of enriched) {
  if (!location.locality || !location.state || !location.district || location.qualityStatus !== 'publish') continue;
  const key = [normalize(location.locality), normalize(location.state), normalize(location.district)].join('|');
  canonicalLocalityByNameAndState.set(
    [normalize(location.locality), normalize(location.state)].join('|'),
    key,
  );
  if (!localityGroups.has(key)) {
    localityGroups.set(key, {
      locality: location.locality,
      state: location.state,
      district: location.district,
      pinCodes: new Set(),
      postOfficeNames: new Set(),
      geoNamesPlaceNames: new Set(),
      sourcePages: new Set(),
      fieldSources: location.fieldSources,
      sourceConfidence: location.sourceConfidence,
      stateConflict: false,
      entityType: 'verified-locality-cross-reference',
    });
  }
  const group = localityGroups.get(key);
  group.pinCodes.add(location.pinCode);
  location.postOfficeNames.forEach((name) => group.postOfficeNames.add(name));
  location.geoNamesPlaceNames.forEach((name) => group.geoNamesPlaceNames.add(name));
  location.sourcePages.forEach((page) => group.sourcePages.add(page));
  if (location.stateConflict) group.stateConflict = true;
}

for (const record of pdfRecords) {
  const pinCode = String(record.pinCode).padStart(6, '0');
  const location = enrichedByPin.get(pinCode);
  if (!location) continue;
  const sourceState = String(record.state || '').trim();
  const key = [normalize(record.postOffice), normalize(sourceState)].join('|');
  if (!postOfficeGroups.has(key)) {
    postOfficeGroups.set(key, {
      locality: record.postOffice,
      state: sourceState || null,
      district: null,
      pinCodes: new Set(),
      postOfficeNames: new Set(),
      geoNamesPlaceNames: new Set(),
      sourcePages: new Set(),
      fieldSources: {
        locality: { source: 'supplied-pdf-post-office-name', confidence: 'high' },
        pinCode: { source: 'supplied-pdf', confidence: 'high' },
        state: { source: 'supplied-pdf', confidence: sourceState ? 'high' : 'none' },
      },
      sourceConfidence: 'medium',
      stateConflict: location.stateConflict === true,
      entityType: 'postal-office-locality-candidate',
    });
  }
  const group = postOfficeGroups.get(key);
  group.pinCodes.add(pinCode);
  group.postOfficeNames.add(record.postOffice);
  group.sourcePages.add(record.sourcePage);
  location.geoNamesPlaceNames.forEach((name) => group.geoNamesPlaceNames.add(name));
  if (location.stateConflict) group.stateConflict = true;
}

const allGroups = new Map(localityGroups);
for (const [key, office] of postOfficeGroups) {
  const localityKey = canonicalLocalityByNameAndState.get(
    [normalize(office.locality), normalize(office.state)].join('|'),
  );
  if (localityKey) {
    const group = allGroups.get(localityKey);
    office.pinCodes.forEach((value) => group.pinCodes.add(value));
    office.postOfficeNames.forEach((value) => group.postOfficeNames.add(value));
    office.geoNamesPlaceNames.forEach((value) => group.geoNamesPlaceNames.add(value));
    office.sourcePages.forEach((value) => group.sourcePages.add(value));
    group.stateConflict = group.stateConflict || office.stateConflict;
    continue;
  }

  const districtCandidates = new Set();
  for (const pin of office.pinCodes) {
    const location = enrichedByPin.get(pin);
    if (location && location.qualityStatus === 'publish' && location.district) {
      districtCandidates.add(location.district);
    }
  }
  office.districtCandidates = [...districtCandidates].sort();
  office.district = districtCandidates.size === 1 ? [...districtCandidates][0] : null;
  office.geographicConfidence = office.district ? 'medium' : 'low';
  office.stateConflict = office.stateConflict || [...office.pinCodes].some((pin) => enrichedByPin.get(pin)?.stateConflict);
  office.reasonCode = office.stateConflict
    ? 'supporting-pin-state-conflict'
    : office.district
      ? 'postal-name-with-geonames-cross-reference'
      : 'administrative-association-unresolved';
  allGroups.set(`office|${key}`, office);
}

const geographicReferences = [...allGroups.values()]
  .map((group) => {
    const id = [
      slugify(group.locality),
      slugify(group.state || 'state-unresolved'),
      slugify(group.district || 'district-unresolved'),
    ].join('--');
    return {
      id,
      name: group.locality,
      city: null,
      district: group.district || null,
      districtCandidates: group.districtCandidates || (group.district ? [group.district] : []),
      state: group.state || null,
      postalCodes: [...group.pinCodes].sort(),
      postOfficeNames: [...group.postOfficeNames].sort((a, b) => a.localeCompare(b)),
      geoNamesPlaceNames: [...group.geoNamesPlaceNames].sort((a, b) => a.localeCompare(b)),
      sourcePages: [...group.sourcePages].sort((a, b) => a - b),
      localitySource: group.fieldSources?.locality?.source || 'supplied-pdf-post-office-name',
      fieldSources: group.fieldSources || {},
      geographicConfidence: group.geographicConfidence
        || group.fieldSources?.locality?.confidence
        || 'medium',
      stateConflict: group.stateConflict === true,
      entityType: group.entityType,
      datasetRole: 'geographic-reference-only',
      serviceAreaStatus: 'not-established',
      indexability: 'REVIEW',
      qualityStatus: 'REVIEW',
      reasonCode: group.reasonCode || 'no-verified-local-service-area-or-distinct-local-value',
    };
  })
  .sort((left, right) => left.id.localeCompare(right.id));

const distinctPins = new Set(pdfRecords.map((record) => String(record.pinCode).padStart(6, '0')));
const relevantNames = ['laxmi nagar', 'lajpat nagar'];
const relevantReferenceRecords = geographicReferences.filter((record) => (
  relevantNames.some((name) => {
    const normalizedName = normalize(record.name);
    return normalizedName === name || normalizedName.startsWith(`${name} `);
  })
));
const localityCandidates = localityGeography.candidates.map((source) => {
  const distanceKm = haversineKm(
    academyGeo.latitude,
    academyGeo.longitude,
    source.latitude,
    source.longitude,
  );
  const status = localityGeography.initialStatusBySlug[source.slug];
  const roundedDistanceKm = Number(distanceKm.toFixed(1));

  return {
    name: source.name,
    ...(source.aliases ? { aliases: source.aliases } : {}),
    slug: source.slug,
    city: source.city,
    state: source.state,
    district: source.district,
    localityType: source.localityType,
    distanceFromAcademy: {
      kilometres: roundedDistanceKm,
      measure: 'approximate straight-line distance',
    },
    distanceSource: 'Haversine calculation between the Google Maps academy pin and the OpenStreetMap Nominatim representative point; not road distance or travel time.',
    geographicConfidence: source.geographicConfidence,
    relationshipToAcademy: `${roundedDistanceKm} km approximate straight-line distance from the published Dwarka map pin. This indicates geographic proximity only, not an established service area or local facility.`,
    searchIntentRelevance: 'A person in this locality could plausibly research pilot-training options at a Delhi academy; this is a hypothesis from geography, not evidence of search volume, student origin or demand.',
    serviceAreaEvidence: {
      verifiedForThisLocality: false,
      knownDelivery: 'Classroom DGCA ground classes are stated at the Dwarka address; online batches are offered to students outside Delhi; flight training is arranged with partner flying schools.',
      evidenceGap: 'No locality-specific student, service-boundary or demand evidence is recorded.',
    },
    status,
    classificationRationale: status === 'RESEARCH_CANDIDATE'
      ? 'Retained as a preliminary Delhi/NCR geographic cross-check example; this does not define India-wide locality selection or imply service coverage.'
      : status === 'NEEDS_VERIFICATION'
        ? 'Retained as an explicit example for further locality-identity and service-relevance research; no page or service relationship is approved.'
        : status === 'REFERENCE_ONLY'
          ? 'Broad NCR city reference for geographic context; not a locality-level service area or page candidate.'
          : 'Not approved for locality SEO without separate evidence and editorial review.',
    geographicCenter: {
      latitude: source.latitude,
      longitude: source.longitude,
      source: localityGeography.source.name,
      osmType: source.osmType,
      osmId: source.osmId,
      osmLabel: source.osmLabel,
      sourceUrl: source.searchUrl,
    },
  };
});
const localityCandidateBySlug = new Map(localityCandidates.map((candidate) => [candidate.slug, candidate]));
const postalContextFor = (name) => relevantReferenceRecords
  .filter((record) => normalize(record.name) === normalize(name))
  .map((record) => ({
    name: record.name,
    state: record.state,
    postalCodes: record.postalCodes,
    district: record.district,
    districtCandidates: record.districtCandidates,
    source: record.localitySource,
  }));
const localityAssessment = (slug, postalName) => {
  const candidate = localityCandidateBySlug.get(slug);
  return {
    candidate,
    authoritativeIdentity: {
      currentBestAvailable: candidate.geographicCenter.osmLabel,
      provider: localityGeography.source.name,
      confidence: 'medium',
      limitation: 'OpenStreetMap is a community-mapped reference, not an official government locality-boundary source.',
    },
    geographicRelationship: candidate.relationshipToAcademy,
    meaningfulDistinctContentAvailable: false,
    serviceAreaEvidence: candidate.serviceAreaEvidence,
    postalReferenceContextOnly: postalContextFor(postalName),
    postalIdentityComparison: postalName === 'LAXMI NAGAR'
      ? 'The supplied PDF lists a Laxmi Nagar post office at PIN 110092; OSM maps the selected suburb representative point with postcode 110031. A post-office PIN is not a locality boundary, so retain both as separate-source references and verify official locality/postal identity before using them together.'
      : 'The supplied PDF lists a Lajpat Nagar post office at PIN 110024; OSM maps the selected suburb representative point with postcode 110065. A post-office PIN is not a locality boundary, so retain both as separate-source references and verify official locality/postal identity before using them together.',
    decision: 'NEEDS_VERIFICATION; do not create a locality page. Geographic proximity and a postal record do not establish that the academy serves this locality or provide enough distinct local information.',
  };
};
const geographicReferenceAuditCounts = geographicReferences.reduce((counts, record) => {
  counts.notUsedForLocalitySelection = (counts.notUsedForLocalitySelection || 0) + 1;
  if (record.stateConflict) counts.sourceStateConflict = (counts.sourceStateConflict || 0) + 1;
  if (!record.district) counts.districtUnresolved = (counts.districtUnresolved || 0) + 1;
  return counts;
}, {});

const cityResearchRecords = indiaCityResearch.cities.map((market) => {
  const isDelhi = market.stateCode === 'IN-DL';
  const plannedQueries = indiaCityResearch.queryTemplates
    .map((template) => template.replaceAll('{location}', market.city));
  const observedQueries = (indiaCityResearch.serpObservations || [])
    .filter((observation) => normalize(observation.city) === normalize(market.city));
  const queryObservations = getQueryObservations(observedQueries);
  const batchQueryMatrix = getCityBatchQueries(market.city);
  const detailedBatchQueryCount = batchQueryMatrix
    .filter((query) => query.hasQuerySpecificSerpDetail).length;
  const coreQueryPrefixes = [
    'aviation academy near ',
    'pilot training near ',
    'cpl training near ',
    'dgca ground classes near ',
  ];
  const observedCoreQueries = new Set(queryObservations
    .filter((query) => query.status === 'OBSERVED')
    .map((query) => normalize(query.query)));
  const blockedCoreQueries = new Set(queryObservations
    .filter((query) => query.status !== 'OBSERVED')
    .map((query) => normalize(query.query)));
  const missingCoreQueries = coreQueryPrefixes
    .map((prefix) => `${prefix}${market.city}`)
    .filter((query) => !observedCoreQueries.has(normalize(query)));
  const observedCoreCount = coreQueryPrefixes.length - missingCoreQueries.length;
  const blockedCoreCount = missingCoreQueries
    .filter((query) => blockedCoreQueries.has(normalize(query))).length;
  const researchStatus = observedCoreCount === coreQueryPrefixes.length
    ? 'FULLY_RESEARCHED'
    : observedCoreCount
      ? 'PARTIALLY_RESEARCHED'
      : blockedCoreCount
        ? 'BLOCKED'
        : 'NOT_RESEARCHED';
  const hasObservedPilotIntent = queryObservations.some((query) => (
    query.status === 'OBSERVED'
      && ['LOCAL_SERVICE', 'COURSE_RESEARCH', 'MIXED'].includes(query.searchIntentType)
  ));
  const businessRelevance = isDelhi
    ? 'HIGH'
    : researchStatus === 'NOT_RESEARCHED' || researchStatus === 'BLOCKED'
      ? 'UNKNOWN'
      : hasObservedPilotIntent
        ? 'MEDIUM'
        : 'LOW';
  return {
    ...market,
    geographicSources: [{
      name: 'OpenStreetMap Nominatim',
      url: `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(`${market.city}, ${market.state}, India`)}&format=jsonv2&addressdetails=1`,
      verification: 'Place-name lookup reference; the city feature and boundaries have not necessarily been resolved.',
    }],
    searchIntentStatus: observedCoreCount ? 'OBSERVED' : 'UNKNOWN',
    searchIntentClassification: aggregateSearchIntent(queryObservations),
    plannedQueries,
    queryObservations,
    batchQueryMatrix,
    batchQueryCoverageStatus: batchQueryMatrix.length
      ? batchQueryMatrix.every((query) => query.queryCoverageStatus === 'AT_LEAST_ONE_ENGINE_RENDERED')
        ? 'ALL_CORE_QUERIES_RENDERED_BY_AT_LEAST_ONE_ENGINE'
        : 'PARTIAL_CORE_QUERY_COVERAGE'
      : 'NOT_IN_49_CITY_BATCH',
    batchDetailedSerpQueryCount: detailedBatchQueryCount,
    batchSerpInterpretationStatus: batchQueryMatrix.length
      ? detailedBatchQueryCount === batchQueryMatrix.length
        ? 'QUERY_SPECIFIC_DETAILS_FOR_ALL_FOUR'
        : detailedBatchQueryCount
          ? 'PARTIAL_QUERY_SPECIFIC_DETAILS'
          : 'UNKNOWN_AFTER_RENDER_OR_BLOCKED'
      : 'NOT_IN_49_CITY_BATCH',
    missingCoreQueries,
    researchStatus,
    observedCoreQueryCount: observedCoreCount,
    blockedCoreQueryCount: blockedCoreCount,
    serpResearch: {
      status: researchStatus,
      observations: observedQueries,
    },
    businessRelevance,
    businessRelevanceEvidence: isDelhi
      ? 'The verified physical classroom is in Dwarka, Delhi; city-wide delivery beyond that address is not asserted.'
      : businessRelevance === 'MEDIUM'
        ? 'Observed SERPs include local pilot/aviation course intent, and the website documents online batches for students outside Delhi. It does not document city-specific student access, delivery, demand or local facilities.'
        : businessRelevance === 'LOW'
          ? 'Observed result pages did not establish a clear pilot-training service pattern relevant to the documented online delivery model.'
          : 'Online batches are documented for students outside Delhi, but this market has not been sufficiently researched to establish local relevance.',
    contentValue: isDelhi ? 'EXISTING_AUTHORITY_CONTENT' : 'NOT_ESTABLISHED',
    contentValueEvidence: isDelhi
      ? 'Existing /pilot-training-in-delhi and /pilot-training-in-dwarka pages cover documented Delhi/Dwarka training context; no additional city page is justified.'
      : 'General online access, the Dwarka classroom address and common course pathways would be substantially the same for every city. No verified city-specific access, geographic context or delivery detail currently creates distinct useful content.',
    pageStatus: 'RESEARCH_ONLY',
    recommendation: isDelhi ? 'REFERENCE_ONLY' : 'RESEARCH_ONLY',
    recommendationRationale: isDelhi
      ? 'Use the existing Delhi/Dwarka authority pages; do not create a competing city page.'
      : 'Retain as research only: documented online batches make non-Delhi access possible in general, but a generic city-name substitution would not provide distinct sourced value. No physical branch is inferred.',
  };
});

const indiaWideLocalityCandidates = indiaLocalityResearch.localities.map((source) => ({
  ...source,
  district: source.district || null,
  status: source.recommendation,
  geographicConfidence: 'UNVERIFIED',
  searchIntentStatus: (() => {
    const records = (indiaLocalityResearch.serpObservations || [])
      .filter((observation) => normalize(observation.locality) === normalize(source.locality));
    const queries = getQueryObservations(records);
    const observedCount = queries.filter((query) => query.status === 'OBSERVED').length;
    return observedCount
      ? observedCount >= 4 ? 'PARTIALLY_RESEARCHED' : 'PARTIALLY_RESEARCHED'
      : source.searchIntentStatus || 'UNKNOWN';
  })(),
  contentValue: source.locality === 'Dwarka' ? 'HIGH' : 'UNKNOWN',
  contentValueEvidence: source.locality === 'Dwarka'
    ? 'The existing Dwarka authority page covers the verified classroom location; no additional locality page is approved.'
    : source.contentValueEvidence || 'Unique locality-specific user value has not been established.',
  searchQueries: indiaLocalityResearch.localityQueryTemplates
    .map((template) => template.replaceAll('{locality}', source.locality)),
  serpResearchStatus: (indiaLocalityResearch.serpObservations || [])
    .some((observation) => normalize(observation.locality) === normalize(source.locality))
    ? 'PARTIALLY_RESEARCHED'
    : 'UNKNOWN',
  serpObservations: (indiaLocalityResearch.serpObservations || [])
    .filter((observation) => normalize(observation.locality) === normalize(source.locality)),
  queryObservations: getQueryObservations((indiaLocalityResearch.serpObservations || [])
    .filter((observation) => normalize(observation.locality) === normalize(source.locality))),
  searchIntentClassification: aggregateSearchIntent(getQueryObservations((indiaLocalityResearch.serpObservations || [])
    .filter((observation) => normalize(observation.locality) === normalize(source.locality)))),
  relationshipToAcademy: source.stateCode === 'IN-DL'
    ? 'In the same National Capital Territory as the verified Dwarka classroom; no locality-specific service relationship or distance is claimed.'
    : 'Outside the verified academy locality; online batches are documented for students outside Delhi, but city-specific access or service is not verified.',
  contentValueEvidence: source.contentValueEvidence
    || 'Unique locality-specific user value has not been established; do not create a page by substituting the locality name.',
  pageStatus: source.pageStatus || 'RESEARCH_ONLY',
}));

const localityObservationByName = new Map((indiaLocalityResearch.serpObservations || [])
  .map((observation) => [normalize(observation.locality), observation]));

function buildCityCandidateAnalysis(market) {
  const isDelhi = normalize(market.city) === 'delhi';
  const priorSnapshots = (indiaCityResearch.serpObservations || [])
    .filter((observation) => normalize(observation.city) === normalize(market.city));
  const specificQueries = market.batchQueryMatrix
    .filter((query) => query.hasQuerySpecificSerpDetail);
  const observedIntentTypes = [...new Set(market.batchQueryMatrix
    .map((query) => query.searchIntentType)
    .filter((type) => type !== 'UNKNOWN'))];
  const hasPriorObservedSearchIntent = priorSnapshots.some((observation) => (
    observation.serpFeatures?.localPackOrPlaces
    || observation.serpFeatures?.serpSatisfies
    || observation.serpFeatures?.mapsResults
  ));
  const hasObservedIntent = specificQueries.length > 0 || hasPriorObservedSearchIntent;
  const recommendation = isDelhi
    ? 'EXISTING_AUTHORITY'
    : specificQueries.length || priorSnapshots.length
      ? 'NOT_JUSTIFIED'
      : 'RESEARCH_ONLY';
  const serpEvidence = market.batchQueryMatrix.length
    ? `${specificQueries.length}/4 query records retain query-specific SERP details. Google: ${market.batchQueryMatrix.filter((query) => query.google.status === 'RENDERED').length} rendered, ${market.batchQueryMatrix.filter((query) => query.google.status === 'CAPTCHA_OR_UNUSUAL_TRAFFIC').length} blocked; Bing: ${market.batchQueryMatrix.filter((query) => query.bing.status === 'RENDERED').length} rendered. Observed types: ${observedIntentTypes.length ? observedIntentTypes.join(', ') : 'UNKNOWN'}. Remaining rendered pages are UNKNOWN_AFTER_RENDER; blocked pages provide no SERP evidence.`
    : priorSnapshots.length
      ? `Prior capture contains ${priorSnapshots.reduce((count, observation) => count + (observation.queries?.length || 1), 0)} query records across ${priorSnapshots.length} market snapshot(s); examples and aggregate features are in the source research records.`
      : 'No retained city-specific query result details are available in the research dataset.';
  const businessRelationship = isDelhi
    ? 'Verified physical classroom DGCA ground teaching is in Dwarka, Delhi; online batches are offered to students outside Delhi; flight training is arranged through partner flying schools. The city and Dwarka authority pages already cover this verified relationship.'
    : 'The only documented relationship is general online-batch availability for students outside Delhi. No city-specific student access, cohort, partner, in-person facility, local service boundary or city-specific application process is documented.';
  const uniqueContentOpportunity = isDelhi
    ? 'Existing Delhi and Dwarka authority pages already explain the verified location and training relationship. A second Delhi city page would duplicate or compete with those authorities.'
    : 'No verified city-specific access path, partner arrangement, education context, travel/access detail or student evidence is documented. Course choices and online-batch information would be the same across cities; city-name substitution would not add distinct value.';
  const recommendationReason = isDelhi
    ? 'EXISTING_AUTHORITY: retain /pilot-training-in-delhi and /pilot-training-in-dwarka as the relevant authorities; do not add a competing city page.'
    : recommendation === 'NOT_JUSTIFIED'
      ? 'NOT_JUSTIFIED for a city page at this time: retained SERP evidence shows local/course discovery intent, but search-result features do not establish We One Aviation service or user-specific value. The documented online offer is generic across non-Delhi markets, so a city page would repeat course information and risk becoming a doorway page. This is not a rejection based solely on lack of a physical branch.'
      : 'RESEARCH_ONLY: detailed query-level result patterns were not retained (UNKNOWN_AFTER_RENDER or blocked), and no city-specific first-party service/access evidence exists. Do not treat query attempts or rendered status as proof of demand or page value.';
  return {
    location: market.city,
    type: 'CITY',
    state: market.state,
    stateCode: market.stateCode,
    parentCity: null,
    geographicEntityStatus: 'Named city/state in curated research inventory; exact administrative boundary identity is not independently resolved for every market.',
    searchIntent: hasObservedIntent
      ? 'Observed local/course-intent result evidence exists in the retained Google/Bing or earlier market snapshots; query and capture limitations are stated in serpEvidence.'
      : 'UNKNOWN: retained detailed SERP patterns are insufficient to confirm which result types appeared.',
    serpEvidence,
    observableSearchIntent: hasObservedIntent ? 'OBSERVED' : 'UNKNOWN',
    businessRelationship,
    uniqueContentOpportunity,
    uniqueContentReason: recommendation === 'POTENTIAL_CITY_PAGE' ? uniqueContentOpportunity : null,
    riskOfDoorway: isDelhi
      ? 'Low incremental value for a second Delhi city landing page; likely authority duplication/cannibalization.'
      : 'High under current evidence: city-name substitution over the same courses, Dwarka address and general online-batch facts would not satisfy a distinct local need.',
    recommendation,
    recommendationReason,
    candidateGate: {
      observableLocalSearchIntent: hasObservedIntent ? 'SUPPORTED_BY_RETAINED_SNAPSHOT' : 'UNKNOWN',
      geographicEntity: 'CURATED_CITY_STATE_ENTRY; NOT_FULLY_BOUNDARY_VERIFIED',
      truthfulBusinessRelationship: isDelhi ? 'SUPPORTED_FOR_DELHI_DWARKA' : 'ONLY_GENERAL_ONLINE_OFFER_OUTSIDE_DELHI',
      relationshipSpecificToCity: isDelhi ? 'YES_EXISTING_AUTHORITY' : 'NO_DOCUMENTED_CITY_SPECIFIC_RELATIONSHIP',
      distinctUsefulContent: isDelhi ? 'ALREADY_COVERED_BY_EXISTING_AUTHORITIES' : 'NOT_ESTABLISHED',
      doorwayRiskAcceptable: isDelhi ? 'NOT_APPLICABLE_EXISTING_AUTHORITY' : 'NO',
      architectureFit: isDelhi ? 'EXISTING_AUTHORITY' : 'WOULD_DUPLICATE_EXISTING_COURSE_AUTHORITIES_WITHOUT_DISTINCT_VALUE',
      decision: recommendation,
    },
    evidenceReferences: {
      priorSnapshotCount: priorSnapshots.length,
      priorObservedQueryCount: priorSnapshots.reduce((count, observation) => (
        count + (observation.queries?.length || (observation.query ? 1 : 0))
      ), 0),
      currentBatchQueryCount: market.batchQueryMatrix.length,
      currentBatchQueriesWithSpecificDetails: specificQueries.length,
      currentBatchQueryMatrix: market.batchQueryMatrix,
    },
  };
}

function buildLocalityCandidateAnalysis(candidate) {
  const localityKey = normalize(candidate.locality);
  const observation = localityObservationByName.get(localityKey);
  const isDwarka = localityKey === 'dwarka';
  const isLaxmiOrLajpat = ['laxmi nagar', 'lajpat nagar'].includes(localityKey);
  const observedQueries = observation?.queries?.filter((query) => query.status === 'OBSERVED') || [];
  const recommendation = isDwarka
    ? 'EXISTING_AUTHORITY'
    : isLaxmiOrLajpat
      ? 'NEEDS_VERIFICATION'
      : 'RESEARCH_ONLY';
  const city = candidate.city;
  const businessRelationship = isDwarka
    ? 'The verified classroom is at the published Dwarka address; the existing Dwarka page is the authority. No additional locality page is recommended.'
    : candidate.stateCode === 'IN-DL'
      ? 'In Delhi, the same NCT as the verified Dwarka classroom, but no locality-specific service, distance, travel/access detail or student evidence is verified.'
      : 'Outside the verified Dwarka classroom locality. General online batches are offered to students outside Delhi; locality-specific access or physical service is not verified.';
  const distinctPurpose = isDwarka
    ? 'The locality is the verified physical academy location and already has an authority page.'
    : 'No distinct service or user purpose from the parent city is supported; parent-city/course intent and the common online offer substantially overlap.';
  const uniqueContentOpportunity = isDwarka
    ? 'Already covered by the Dwarka authority page and the verified classroom address.'
    : isLaxmiOrLajpat
      ? 'SERPs show locality-specific academy/course discovery, but no verified We One Aviation locality relationship or distinct application/access details. The .com result cannot be used as first-party proof while domain ownership remains unverified.'
      : 'No locality-specific SERP detail, We One Aviation service evidence or distinct content opportunity is retained.';
  const evidenceText = observation
    ? `${observedQueries.length} observed queries out of ${observation.queries?.length || 0} recorded query attempts. Captured features: ${(observation.serpFeatures?.serpSatisfies || 'SERP details not retained').replace(/[.\s]+$/, '')}. Examples: ${(observation.visibleExamples || []).join(', ') || 'none retained'}. ${observation.caveat || ''}`
    : 'No locality-specific SERP observation was retained; status remains UNKNOWN.';
  return {
    location: candidate.locality,
    type: 'LOCALITY',
    state: candidate.state,
    parentCity: city,
    searchIntent: observedQueries.length
      ? `Observed local/course discovery intent in ${observedQueries.length} retained query result(s); this does not establish We One Aviation relevance.`
      : 'UNKNOWN: no locality-specific SERP detail was retained.',
    serpEvidence: evidenceText,
    businessRelationship,
    distinctPurposeFromParentCity: distinctPurpose,
    uniqueContentOpportunity,
    riskOfDoorway: isDwarka
      ? 'No additional page proposed; an additional locality URL would duplicate the existing Dwarka authority.'
      : 'High unless verifiable locality-specific user information is added; otherwise duplicates parent-city course content and could act as a doorway page.',
    recommendation,
    recommendationReason: isDwarka
      ? 'EXISTING_AUTHORITY: preserve the existing Dwarka authority page; do not generate another locality page.'
      : isLaxmiOrLajpat
        ? `NEEDS_VERIFICATION: local-intent SERP evidence exists, but the relationship to the academy and unique user value are unverified.${localityKey === 'laxmi nagar' ? ' Do not rely on the unverified .com domain result.' : ''}`
        : 'RESEARCH_ONLY: the locality is an inventory entry, not an approved service area. No distinct intent, relationship or page value is documented.',
    candidateGate: {
      observableLocalSearchIntent: observedQueries.length ? 'OBSERVED' : 'UNKNOWN',
      geographicEntity: 'LOCALITY SEED; BOUNDARIES NOT INDEPENDENTLY VERIFIED',
      truthfulBusinessRelationship: isDwarka ? 'VERIFIED_LOCATION' : 'NOT_LOCALITY_SPECIFIC',
      distinctPurposeFromParentCity: isDwarka ? 'EXISTING_AUTHORITY' : 'NOT_ESTABLISHED',
      distinctUsefulContent: isDwarka ? 'ALREADY_COVERED' : 'NOT_ESTABLISHED',
      doorwayRiskAcceptable: 'NO_NEW_PAGE_APPROVED',
      decision: recommendation,
    },
  };
}

const cityCandidateAnalysis = cityResearchRecords.map(buildCityCandidateAnalysis);
const localityCandidateGroups = new Map();
for (const candidate of indiaWideLocalityCandidates) {
  const key = [
    normalize(candidate.locality),
    normalize(candidate.city),
    normalize(candidate.state),
  ].join('|');
  const group = localityCandidateGroups.get(key) || [];
  group.push(candidate);
  localityCandidateGroups.set(key, group);
}
const localityCandidateAnalysis = [...localityCandidateGroups.values()].map((group) => ({
  ...buildLocalityCandidateAnalysis(group[0]),
  sourceRecordCount: group.length,
}));
const candidateAnalysisCounts = (records) => records.reduce((counts, record) => {
  counts[record.recommendation] = (counts[record.recommendation] || 0) + 1;
  return counts;
}, {});
const domainOwnershipAssessment = {
  domain: 'weoneaviation.com',
  status: indiaLocalityResearch.alternateDomainInvestigation?.ownershipStatus === 'UNVERIFIED'
    ? 'DOMAIN_OWNERSHIP_UNVERIFIED'
    : 'UNVERIFIED',
  evidenceForPossibleAssociation: [
    'The .com homepage uses We One Aviation branding and links to pages about Delhi, Dwarka and CPL training.',
    'A Bing result displayed a Laxmi Nagar DGCA page under the .com domain.',
  ],
  evidencePreventingAttribution: [
    'No legal entity, registrar, DNS, hosting, account-control or first-party ownership evidence was available in the repository.',
    'The inspected .com contact page contained unrelated aircraft-charter/plumbing text.',
    'The .com locality page has conflicting address PIN, phone and email details compared with the canonical .in first-party record.',
    'The .com apex redirected to www for inspected URLs; no redirect to weoneaviation.in was observed.',
    'The .com Laxmi Nagar page is live and self-canonical but those technical signals do not prove ownership by the verified academy.',
  ],
  verifiedCanonicalDomain: 'https://weoneaviation.in/',
  repositoryDomainEvidence: 'Site schema and shared academy facts identify weoneaviation.in as canonical; no repository configuration establishes control of weoneaviation.com.',
  decision: 'Do not attribute .com content or LocalBusiness claims to We One Aviation and do not migrate, redirect, canonicalize or delete .com URLs without owner confirmation.',
};

const indiaCandidateStatusCounts = [...cityResearchRecords, ...indiaWideLocalityCandidates]
  .reduce((counts, record) => {
    counts[record.recommendation] = (counts[record.recommendation] || 0) + 1;
    return counts;
  }, {});
const cityResearchCoverage = cityResearchRecords.reduce((counts, record) => {
  counts[record.researchStatus] = (counts[record.researchStatus] || 0) + 1;
  return counts;
}, {});

function haversineKm(latitude1, longitude1, latitude2, longitude2) {
  const radians = Math.PI / 180;
  const deltaLatitude = (latitude2 - latitude1) * radians;
  const deltaLongitude = (longitude2 - longitude1) * radians;
  const haversine = Math.sin(deltaLatitude / 2) ** 2
    + Math.cos(latitude1 * radians)
      * Math.cos(latitude2 * radians)
      * Math.sin(deltaLongitude / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(haversine));
}

const report = {
  generatedAt: new Date().toISOString(),
  indiaWideLocalResearch: {
    statesAndUnionTerritories: indiaCityResearch.stateAndUnionTerritoryCoverage.length,
    cities: cityResearchRecords.length,
    localities: indiaWideLocalityCandidates.length,
    fullyResearchedCities: cityResearchCoverage.FULLY_RESEARCHED || 0,
    partiallyResearchedCities: cityResearchCoverage.PARTIALLY_RESEARCHED || 0,
    blockedCities: cityResearchCoverage.BLOCKED || 0,
    unresearchedCities: cityResearchCoverage.NOT_RESEARCHED || 0,
    potentialCityCandidates: cityResearchRecords.filter((record) => record.recommendation === 'POTENTIAL_CITY_PAGE').length,
    potentialLocalityCandidates: indiaWideLocalityCandidates.filter((record) => record.recommendation === 'POTENTIAL_LOCALITY_PAGE').length,
    referenceOnlyLocations: [...cityResearchRecords, ...indiaWideLocalityCandidates]
      .filter((record) => record.recommendation === 'REFERENCE_ONLY').length,
    rejectedLocations: [...cityResearchRecords, ...indiaWideLocalityCandidates]
      .filter((record) => record.recommendation === 'NOT_JUSTIFIED').length,
    pagesCreated: 0,
    cityResearchFile: 'data/local-seo/india-city-research.json',
    localityResearchFile: 'data/local-seo/india-locality-research.json',
    combinedResearchReport: 'data/local-seo/india-local-search-report.json',
    serpObservationStatus: 'See india-local-search-report.json; unknown is retained for markets/queries without direct observation.',
  },
  verifiedAcademyGeo: academyGeo,
  geographicCenter: {
    type: 'academy map pin',
    latitude: academyGeo.latitude,
    longitude: academyGeo.longitude,
    confidence: academyGeo.confidence.coordinates,
    source: academyGeo.coordinateSource.url,
    caveat: academyGeo.coordinateSource.verificationLimit,
  },
  geographicSources: [
    {
      source: 'Google Maps CID linked from the site footer',
      role: 'Academy map-pin coordinates only; the site address itself is verified from first-party pages.',
      url: academyGeo.coordinateSource.url,
      confidence: academyGeo.confidence.coordinates,
    },
    {
      source: indiaLocalityResearch.geographicSources[0].name,
      role: 'Representative localities and exact identity verification references for the India-wide research inventory.',
      licence: 'OpenStreetMap contributors, ODbL 1.0',
      limitations: indiaLocalityResearch.geographicSourcePolicy,
    },
    {
      source: 'Owner-supplied India PIN PDF and GeoNames postal data',
      role: 'Geographic reference/provenance only; excluded from locality candidate selection and distance calculation.',
      usedToSelectCandidates: false,
    },
  ],
  candidateSelectionPolicy: 'State/UT coverage plus major city/student-market and selected within-city locality research. No fixed radius or PIN filter. Inclusion is research scope only, not demand, service area or SEO approval.',
  verifiedBusinessLocation: {
    organizationName: business.name,
    address: business.address,
    physicalClassroom: business.training.classroomLocation,
    verifiedFrom: business.sourceFiles,
    verificationScope: business.verificationBasis,
    publishedPhones: business.contact.phoneNumbers,
    email: business.contact.email,
    googleMapsCidUrl: 'https://maps.google.com/?cid=10157212043930371020',
    googleBusinessProfile: {
      repositoryEvidence: 'A Google Maps CID link is present in the shared footer.',
      profileOwnershipOrCurrentDetailsIndependentlyVerified: false,
      noAdditionalProfileFactsInferred: true,
    },
  },
  serviceArea: {
    physicalBusinessLocation: {
      verifiedLocality: 'Dwarka, New Delhi',
      address: business.training.classroomLocation,
      delivery: 'Classroom DGCA ground teaching is stated to run in Dwarka.',
    },
    actualServiceArea: {
      verifiedScope: 'The website states that students outside Delhi can join online batches. Flight training is arranged with partner flying schools.',
      localityBoundaries: [],
      localityBoundariesVerified: false,
      nationwidePhysicalServiceClaimed: false,
      neighborhoodStudentsOrDemandVerified: false,
      nearbyLocalityCatchmentInferred: false,
      profileMapServiceAreasIndependentlyVerified: false,
    },
    localitySeoCandidates: localityCandidates
      .filter((candidate) => candidate.status === 'SEO_CANDIDATE')
      .map((candidate) => candidate.slug),
    geographicReferenceData: {
      file: 'data/local-seo/localities.json',
      count: geographicReferences.length,
      role: 'Postal/geographic reference only; excluded from candidate selection and not evidence of service area.',
    },
    candidateModel: 'The research inventory spans States and Union Territories, major city/student markets and selected within-city localities. PIN records are not used to select markets. City/locality inclusion is a research hypothesis only, not demand or service-area evidence.',
    decision: 'No city or locality pages are approved. India-wide city and locality research remains separate from the Dwarka service-area facts.',
  },
  localIntentCoverage: {
    nearMeReality: 'The website cannot guarantee rankings for “near me”. Google determines near-me results dynamically using the searcher’s location and other relevance and business signals. The site should provide consistent, truthful academy identity, location, service, course and locality context; no page is created for the phrase.',
    noDedicatedNearMePage: true,
    queryGroups: [
      {
        intent: 'aviation academy near [locality]',
        currentPage: '/pilot-training-in-dwarka',
        status: 'The actual academy location is represented by the Dwarka authority page. Candidate localities remain research-only until relevance and unique value are evidenced.',
      },
      {
        intent: 'pilot training near [locality] / pilot training academy near [locality]',
        currentPage: '/pilot-training-in-dwarka',
        status: 'The physical classroom and delivery model are described on the Dwarka authority page; locality candidates do not claim local delivery.',
      },
      {
        intent: 'CPL training near [locality]',
        currentPage: '/commercial-pilot-license',
        status: 'CPL information remains on the authoritative course page; no unverified locality variant is generated.',
      },
      {
        intent: 'aviation academy near me',
        currentPage: '/how-to-choose-an-aviation-academy',
        status: 'Covered as an academy-selection question; no fake near-me landing page and no ranking promise.',
      },
    ],
  },
  geographicReferenceCount: geographicReferences.length,
  localityCandidateCount: indiaWideLocalityCandidates.length,
  seoCandidateCount: indiaWideLocalityCandidates.filter((candidate) => candidate.recommendation === 'POTENTIAL_LOCALITY_PAGE').length,
  researchCandidateCount: indiaWideLocalityCandidates.filter((candidate) => candidate.recommendation === 'RESEARCH_ONLY').length,
  needsVerificationCount: indiaWideLocalityCandidates.filter((candidate) => candidate.recommendation === 'NEEDS_VERIFICATION').length,
  referenceOnlyCount: indiaWideLocalityCandidates.filter((candidate) => candidate.recommendation === 'REFERENCE_ONLY').length,
  rejectedCount: indiaWideLocalityCandidates.filter((candidate) => candidate.recommendation === 'NOT_JUSTIFIED').length,
  approvedPilotCount: pilot.length,
  localityCandidates: indiaWideLocalityCandidates,
  indiaCityResearch: cityResearchRecords,
  indiaWideCandidateStatusCounts: indiaCandidateStatusCounts,
  selectedPilotLocalities: pilot,
  rejectedLocalities: indiaWideLocalityCandidates
    .filter((candidate) => candidate.recommendation === 'NOT_JUSTIFIED'),
  rejectionReasons: {
    candidateRecommendations: indiaCandidateStatusCounts,
    geographicReferenceOnly: geographicReferenceAuditCounts,
  },
  rejectionPolicy: 'PIN/geographic reference records are not SEO candidates. India-wide city and locality inventories define research scope only; entries are not automatically promoted to service areas or SEO pages.',
  geographicReferenceExamples: relevantReferenceRecords,
  laxmiNagarAssessment: localityAssessment('laxmi-nagar', 'LAXMI NAGAR'),
  lajpatNagarAssessment: localityAssessment('lajpat-nagar', 'LAJPAT NAGAR'),
  alternateDomainInvestigation: indiaLocalityResearch.alternateDomainInvestigation,
  serviceAreaModel: {
    physicalBusinessLocation: business.training.classroomLocation,
    documentedTrainingDelivery: business.training.verifiedServiceArea,
    localityRelationship: 'Approximate straight-line distance from mapped locality point to academy map pin; proximity is not a catchment or service promise.',
    localitySpecificServiceAreaEvidence: false,
    onlineBatchStatement: 'The site states that students outside Delhi can join online batches; this does not establish locality-specific service or demand.',
    pilotFlyingDelivery: 'Flight training is arranged with partner flying schools; partner locations are not treated as academy branches.',
    decision: 'Maintain the verified classroom location and delivery facts. Do not claim all-Delhi service, a neighborhood catchment, or physical presence outside Dwarka.',
  },
  nearMeStrategy: {
    dedicatedNearMePage: false,
    explanation: '“Near me” is dynamically interpreted by Google using the searcher location and multiple relevance/business signals. The website cannot guarantee those rankings.',
    workOnTruthfulSignals: [
      'Consistent academy name, address, phone and website',
      'Accurate Google Business Profile and map pin after owner verification',
      'Clear Dwarka classroom and actual training-delivery details',
      'Useful Delhi and Dwarka authority pages and course/contact links',
    ],
  },
  businessProfileAudit: entityAudit.googleBusinessProfile,
  localityPageStrategy: {
    routePattern: '/pilot-training-near/[locality]',
    generatedPages: 0,
    purpose: 'One locality page may cover aviation academy, pilot training, pilot training academy and CPL training intent only after distinct locality value is verified.',
    currentDecision: 'Do not generate pages. Keep candidate records for research and approval only.',
    internalLinking: [
      '/pilot-training-in-dwarka',
      '/pilot-training-in-delhi',
      '/commercial-pilot-license',
      '/dgca-ground-classes',
      '/courses/ppl',
      '/courses/atpl',
      '/contact',
      '/about-us',
    ],
    doorwayPageGate: 'Require verified identity, a substantiated locality relationship, useful unique information and editorial approval; a locality keyword or PIN is insufficient.',
  },
  indexabilityStrategy: {
    localityRoutesGenerated: 0,
    localityRoutesIndexable: 0,
    allFutureLocalityRoutes: 'NOINDEX until explicit page approval; only approved indexable records may enter the sitemap.',
    noindexHub: '/pilot-training-near',
    noNearMeRoute: true,
  },
  oldPinRouteStatus: {
    sourceRouteExists: fs.existsSync(legacyRoutePath),
    routePattern: '/pilot-training/[city]/[locality]',
    routableByCurrentPagesSource: false,
    presentInCurrentSitemap: /<loc>https:\/\/weoneaviation\.in\/pilot-training\//.test(existingSitemap),
    liveSampleStatus: 'The corresponding public host URL returned HTTP 404. The previously shared localhost:3010 route stopped responding after the current build; no current public page was found.',
    indexedStatus: 'Not independently verified; no Search Console data is available in the repository.',
    redirectDecision: 'No blanket redirect added. Historical records were from an unlaunched pilot and the checked public sample returns 404. Add a route-specific 301 only if Search Console/backlink evidence identifies a URL with search value and an equivalent destination.',
    risk: 'No Search Console access was available to establish whether any old URL has impressions or backlinks; the checked public sample is 404.',
  },
  sitemapStatus: {
    localityRoutes: 'Only records with indexability PUBLISH_INDEXABLE and status publish are eligible.',
    currentApprovedLocalityRoutes: 0,
    pinRoutes: 'None; dynamic city/locality PIN route retired.',
    noindexHubExcluded: !existingSitemap.includes('<loc>https://weoneaviation.in/pilot-training-near</loc>'),
  },
  indexabilityStatus: {
    approvedPilotPages: 0,
    indexableLocalityPages: 0,
    pilotDirective: 'No locality pilot pages are emitted until a location passes business-specific relevance, user value, uniqueness and editorial review.',
    selectionGate: [
      'Verified geography and non-conflicting source provenance',
      'A verified relation to actual service or a substantiated local training use case',
      'Distinct locality-specific value not already covered by the Dwarka/Delhi pages',
      'Search-intent fit without representing a nonexistent local office or service',
      'Unique factual content and editorial approval',
    ],
  },
  duplicateContentReport: {
    pagesCompared: 0,
    comparison: 'No locality pages are currently generated, so there is no pairwise page similarity result to report.',
    priorFifteenPageDraft: 'Retired without publication. Its template substituted locality names without evidence of a locality-specific service or use case.',
    nextStep: 'Measure normalized rendered-body 5-word-shingle Jaccard similarity and repeated paragraphs, headings, FAQs, introductions and conclusions only after a candidate passes the service-area gate.',
  },
  internalLinkingReport: {
    localityPagesGenerated: 0,
    futureApprovedLocalityPageLinks: [
      '/commercial-pilot-license',
      '/dgca-ground-classes',
      '/courses/ppl',
      '/courses/atpl',
      '/contact',
      '/about-us',
      '/pilot-training-in-delhi',
      '/pilot-training-in-dwarka',
    ],
    hubLinksFromAuthorityPages: [
      '/pilot-training-in-delhi',
      '/pilot-training-in-dwarka',
      '/dgca-ground-classes',
    ],
    noindexHubInSitemap: existingSitemap.includes('<loc>https://weoneaviation.in/pilot-training-near</loc>'),
  },
  schemaReport: {
    organizationType: 'EducationalOrganization, emitted globally with stable #organization ID.',
    actualBusinessLocation: 'Shared organization address only; not repeated as a LocalBusiness claim on locality pages.',
    localityPageSchemas: 'No locality pages generated. Future approved pages use WebPage, BreadcrumbList, organization reference and relevant Course references; no LocalBusiness.',
    globalBreadcrumbs: 'BreadcrumbList emitted by shared Layout for applicable routes.',
    localBusinessMisuse: 'Removed from the legacy unused CityPageTemplate; no locality/PIN route creates LocalBusiness.',
  },
  addressConsistencyReport: {
    canonicalAddress: business.training.classroomLocation,
    cityNamingVariants: ['New Delhi', 'Delhi'],
    cityVariantAssessment: 'The repository uses both forms for the same Dwarka street and PIN; not evidence of a second address.',
    canonicalPin: '110077',
    stalePostalCodeAudit: 'A historical footer comment mentioned 110075; that obsolete comment was removed during this audit. No current address value uses it.',
    phoneNumbers: business.contact.phoneNumbers,
    unavailableNumbers: business.contact.unavailableNumbers,
    phoneIdentityStatus: 'Business owner confirmed primary +91 96673 70747 and active WhatsApp/lead number +91 93556 11996; +91 95552 91956 and +91 97179 77702 are unavailable.',
    inconsistentAddressValuesFound: [],
  },
  sourceRecordSummary: {
    sourcePdfRows: pdfRecords.length,
    uniquePins: distinctPins.size,
    geoNamesUsedAs: 'Secondary cross-reference for locality and administrative geography; never as proof of academy service area.',
    legacyIndiaPostCacheUsed: false,
  },
};

if (pilot.length) throw new Error('Locality SEO pilot must remain empty until relevant candidates are evidenced.');
if (relevantReferenceRecords.length < 2) throw new Error('Expected source records for both named locality examples.');
if (localityCandidates.some((candidate) => !['REFERENCE_ONLY', 'RESEARCH_CANDIDATE', 'SEO_CANDIDATE', 'REJECTED', 'NEEDS_VERIFICATION'].includes(candidate.status))) {
  throw new Error('A locality candidate has an unsupported status.');
}

fs.mkdirSync(localSeoDir, { recursive: true });
fs.writeFileSync(path.join(localSeoDir, 'localities.json'), `${JSON.stringify({
  source: 'Owner-supplied India PIN Code List PDF and GeoNames secondary geographic cross-reference',
  primaryKey: 'canonical locality name + state + district where available; never a route keyed by PIN',
  cityPolicy: 'City remains null unless a source separately identifies it.',
  datasetRole: 'Geographic reference only. This dataset does not establish a We One Aviation service area or SEO locality eligibility.',
  serviceAreaModel: 'See data/local-seo/business-location.json and data/local-seo/local-search-report.json.',
  entities: geographicReferences,
})}\n`);
fs.writeFileSync(path.join(localSeoDir, 'india-city-research.json'), `${JSON.stringify({
  ...indiaCityResearch,
  cityCount: cityResearchRecords.length,
  markets: cityResearchRecords,
}, null, 2)}\n`);
fs.writeFileSync(path.join(localSeoDir, 'india-locality-research.json'), `${JSON.stringify({
  ...indiaLocalityResearch,
  localityCount: indiaWideLocalityCandidates.length,
  researchRecords: indiaWideLocalityCandidates,
}, null, 2)}\n`);
fs.writeFileSync(path.join(localSeoDir, 'locality-candidates.json'), `${JSON.stringify({
  datasetPurpose: 'India-wide locality search research candidates; not a service-area list or page-approval list.',
  geographicSources: indiaLocalityResearch.geographicSources,
  candidateCount: indiaWideLocalityCandidates.length,
  recommendationCounts: indiaWideLocalityCandidates.reduce((counts, candidate) => {
    counts[candidate.recommendation] = (counts[candidate.recommendation] || 0) + 1;
    return counts;
  }, {}),
  pinDataUsedForSelection: false,
  candidates: indiaWideLocalityCandidates,
}, null, 2)}\n`);
fs.writeFileSync(path.join(localSeoDir, 'pilot-localities.json'), `${JSON.stringify(pilot, null, 2)}\n`);
fs.writeFileSync(path.join(localSeoDir, 'local-search-report.json'), `${JSON.stringify(report, null, 2)}\n`);
const observedCitySerpQueries = cityResearchRecords.flatMap((record) => record.serpResearch.observations);
const observedLocalitySerpQueries = indiaWideLocalityCandidates.flatMap((record) => record.serpObservations);
const observedCityQueryDetails = cityResearchRecords.flatMap((record) => record.queryObservations);
const observedLocalityQueryDetails = indiaWideLocalityCandidates.flatMap((record) => record.queryObservations);
const blockedLocalitySerpAttempts = indiaLocalityResearch.serpResearchAttempts || [];
const cityQueryEvidence = observedCitySerpQueries.flatMap((observation) => observation.queries || [{
  intent: observation.query,
  status: 'OBSERVED',
}]);
const localityQueryEvidence = observedLocalitySerpQueries.flatMap((observation) => observation.queries || []);
const uniqueObservedCityQueryCount = new Set(cityQueryEvidence
  .filter((query) => !query.status || query.status === 'OBSERVED')
  .map((query) => normalize(query.intent))).size;
const uniqueObservedLocalityQueryCount = new Set(localityQueryEvidence
  .filter((query) => query.status === 'OBSERVED')
  .map((query) => normalize(`${query.engine} ${query.intent}`))).size;
const uniqueBlockedQueryCount = new Set([
  ...cityQueryEvidence
    .filter((query) => query.status === 'BLOCKED_BY_GOOGLE_TRAFFIC_CHALLENGE')
    .map((query) => normalize(query.intent)),
  ...localityQueryEvidence
    .filter((query) => query.status === 'BLOCKED_BY_GOOGLE_TRAFFIC_CHALLENGE')
    .map((query) => normalize(`${query.engine} ${query.intent}`)),
  ...blockedLocalitySerpAttempts.map((attempt) => normalize(`${attempt.engine} ${attempt.query}`)),
]).size;
const citySearchIntentCounts = observedCityQueryDetails
  .filter((query) => query.status === 'OBSERVED')
  .reduce((counts, query) => {
    counts[query.searchIntentType] = (counts[query.searchIntentType] || 0) + 1;
    return counts;
  }, {});
const localitySearchIntentCounts = observedLocalityQueryDetails
  .filter((query) => query.status === 'OBSERVED')
  .reduce((counts, query) => {
    counts[query.searchIntentType] = (counts[query.searchIntentType] || 0) + 1;
    return counts;
  }, {});
const cityBatchQueryMatrix = cityResearchRecords.flatMap((record) => (
  record.batchQueryMatrix.map((query) => ({
    city: record.city,
    state: record.state,
    stateCode: record.stateCode,
    ...query,
  }))
));
const cityBatchEngineCounts = cityBatchQueryMatrix.reduce((counts, query) => {
  for (const engine of ['google', 'bing']) {
    const status = query[engine].status;
    counts[engine][status] = (counts[engine][status] || 0) + 1;
  }
  return counts;
}, { google: {}, bing: {} });
const cityBatchSerpDetailCounts = cityResearchRecords.reduce((counts, record) => {
  counts[record.batchSerpInterpretationStatus] = (counts[record.batchSerpInterpretationStatus] || 0) + 1;
  return counts;
}, {});
const cityBatchSearchIntentCounts = cityBatchQueryMatrix.reduce((counts, query) => {
  counts[query.searchIntentType] = (counts[query.searchIntentType] || 0) + 1;
  return counts;
}, {});
const hasObservedIntent = (plannedQuery, observations) => {
  const planned = normalize(plannedQuery);
  return observations.some((observation) => (observation.queries || []).some((query) => {
    if (query.status && query.status !== 'OBSERVED') return false;
    const intent = normalize(query.intent);
    return intent === planned || intent.startsWith(`${planned} `);
  }));
};
const combinedIndiaReport = {
  generatedAt: report.generatedAt,
  researchScope: 'India-wide city and locality research. No search-volume estimates or ranking promises.',
  geographicCoverage: {
    states: indiaCityResearch.stateAndUnionTerritoryCoverage.slice(0, 28).length,
    unionTerritories: indiaCityResearch.stateAndUnionTerritoryCoverage.slice(28).length,
    stateAndUnionTerritoryEntries: indiaCityResearch.stateAndUnionTerritoryCoverage.length,
    cities: cityResearchRecords.length,
    localities: indiaWideLocalityCandidates.length,
    cityScopeNote: 'Coverage markets are a curated research inventory, not a complete Indian place gazetteer or proof of search demand.',
  },
  businessDeliveryModel: {
    physicalAcademy: business.training.classroomLocation,
    classroom: 'DGCA ground classes at the Dwarka address.',
    online: 'The site states that online batches are available to students outside Delhi; city-by-city availability and demand are not independently verified.',
    flightTraining: 'Arranged through partner flying schools; partner location does not establish a We One Aviation branch or local facility.',
    unsupportedClaimsExcluded: ['local branch', 'local classroom', 'local instructor', 'local facility', 'local review', 'local student count', 'local flight school', 'service radius'],
  },
  searchIntentResearch: {
    queryTemplates: indiaCityResearch.queryTemplates,
    localityQueryTemplates: indiaLocalityResearch.localityQueryTemplates,
    cityQueriesObserved: uniqueObservedCityQueryCount,
    cityQueriesBlocked: new Set(cityQueryEvidence
      .filter((query) => query.status === 'BLOCKED_BY_GOOGLE_TRAFFIC_CHALLENGE')
      .map((query) => normalize(query.intent))).size,
    localityQueriesObserved: uniqueObservedLocalityQueryCount,
    localityQueriesBlocked: blockedLocalitySerpAttempts.length,
    queryResultsBlocked: uniqueBlockedQueryCount,
    cityCoverageByResearchStatus: cityResearchCoverage,
    cityBatchCoverage: {
      sourceCaptureDate: indiaCityResearch.cityResearchBatch?.capturedAt || null,
      markets: indiaCityResearch.cityResearchBatch?.markets.length || 0,
      coreQueryTemplatesPerMarket: indiaCityResearch.cityResearchBatch?.queryTemplates.length || 0,
      matrixQueryCount: cityBatchQueryMatrix.length,
      engineAttemptStatuses: cityBatchEngineCounts,
      marketsWithAllFourQueriesRenderedByAtLeastOneEngine: cityResearchRecords.filter((record) => (
        record.batchQueryCoverageStatus === 'ALL_CORE_QUERIES_RENDERED_BY_AT_LEAST_ONE_ENGINE'
      )).length,
      querySpecificSerpDetailMarketsByStatus: cityBatchSerpDetailCounts,
      querySpecificSerpDetailCount: cityBatchQueryMatrix
        .filter((query) => query.hasQuerySpecificSerpDetail).length,
      querySearchIntentClassificationCounts: cityBatchSearchIntentCounts,
      cityMarkets: cityResearchRecords
        .filter((record) => record.batchQueryMatrix.length)
        .map((record) => ({
          city: record.city,
          coverageStatus: record.batchQueryCoverageStatus,
          interpretationStatus: record.batchSerpInterpretationStatus,
          queriesWithSpecificSerpDetails: record.batchDetailedSerpQueryCount,
        })),
      interpretation: 'Rendered query pages are not treated as detailed SERP observations without retained page-specific features. UNKNOWN_AFTER_RENDER denotes missing captured detail, not an empty or irrelevant result page.',
    },
    cityBatchQueryMatrix,
    citySearchIntentClassificationCounts: citySearchIntentCounts,
    localitySearchIntentClassificationCounts: localitySearchIntentCounts,
    unobservedQueriesRemainUnknown: true,
    searchVolume: 'Not claimed; no reliable volume source was used.',
  },
  serpResearch: {
    capturedAt: indiaCityResearch.serpResearchCapturedAt || null,
    sampleSizeCities: new Set(observedCitySerpQueries.map((record) => normalize(record.city))).size,
    sampleSizeLocalities: new Set(observedLocalitySerpQueries.map((record) => normalize(record.locality))).size,
    uniqueObservedCityQueryCount,
    uniqueObservedLocalityQueryCount,
    uniqueBlockedQueryCount,
    observationMethod: 'Direct Google India query-result page inspection where available; Bing is separately named for any supplementary result. Blocked and failed queries are retained as unavailable. Findings are location/time-sensitive snapshots, not all-user results, demand, or ranking evidence.',
    observedCityQueries: observedCitySerpQueries,
    observedLocalityQueries: observedLocalitySerpQueries,
    observedCityQueryDetails,
    cityBatchQueryMatrix,
    observedLocalityQueryDetails,
    blockedAttempts: blockedLocalitySerpAttempts,
    remainingMarkets: [
      ...cityResearchRecords.map((record) => {
        const observations = record.serpResearch.observations;
        const remainingQueries = record.plannedQueries.filter(
          (query) => !hasObservedIntent(query, observations),
        );
        return {
          location: record.city,
          status: record.batchQueryMatrix.length
            ? record.batchSerpInterpretationStatus
            : remainingQueries.length === record.plannedQueries.length
            ? 'NOT_RESEARCHED'
            : remainingQueries.length
              ? 'PARTIALLY_RESEARCHED'
              : 'RESEARCHED',
          remainingQueries,
          ...(record.batchQueryMatrix.length ? {
            queryCoverageStatus: record.batchQueryCoverageStatus,
            batchQueryMatrix: record.batchQueryMatrix,
          } : {}),
        };
      }),
      ...indiaWideLocalityCandidates.map((record) => {
        const observations = record.serpObservations;
        const remainingQueries = record.searchQueries.filter(
          (query) => !hasObservedIntent(query, observations),
        );
        const blockedAttempt = blockedLocalitySerpAttempts.find(
          (attempt) => normalize(attempt.locality) === normalize(record.locality),
        );
        return {
          location: record.locality,
          status: remainingQueries.length === record.searchQueries.length
            ? blockedAttempt?.status || 'NOT_RESEARCHED'
            : remainingQueries.length
              ? 'PARTIALLY_RESEARCHED'
              : 'RESEARCHED',
          remainingQueries,
          ...(blockedAttempt ? { blockedAttempt: blockedAttempt.observation } : {}),
        };
      }),
    ],
  },
  prioritization: {
    cityRecommendations: cityResearchRecords.map((record) => ({
      state: record.state,
      city: record.city,
      searchIntentStatus: record.searchIntentStatus,
      searchIntentClassification: record.searchIntentClassification,
      researchStatus: record.researchStatus,
      observedCoreQueryCount: record.observedCoreQueryCount,
      blockedCoreQueryCount: record.blockedCoreQueryCount,
      missingCoreQueries: record.missingCoreQueries,
      queryObservations: record.queryObservations,
      batchQueryCoverageStatus: record.batchQueryCoverageStatus,
      batchSerpInterpretationStatus: record.batchSerpInterpretationStatus,
      batchQueryMatrix: record.batchQueryMatrix,
      serpPattern: record.serpResearch.status === 'NOT_RESEARCHED' ? 'NOT_RESEARCHED' : record.serpResearch.observations,
      businessRelevance: record.businessRelevance,
      businessRelevanceEvidence: record.businessRelevanceEvidence,
      contentValue: record.contentValue,
      contentValueEvidence: record.contentValueEvidence,
      recommendation: record.recommendation,
      recommendationRationale: record.recommendationRationale,
    })),
    localityRecommendations: indiaWideLocalityCandidates.map((record) => ({
      state: record.state,
      city: record.city,
      locality: record.locality,
      searchIntentStatus: record.searchIntentStatus,
      searchIntentClassification: record.searchIntentClassification,
      serpPattern: record.serpResearchStatus,
      queryObservations: record.queryObservations,
      businessRelevance: record.businessRelevance,
      contentValue: record.contentValue,
      recommendation: record.recommendation,
    })),
    potentialCityCandidates: cityResearchRecords.filter((record) => record.recommendation === 'POTENTIAL_CITY_PAGE').length,
    potentialLocalityCandidates: indiaWideLocalityCandidates.filter((record) => record.recommendation === 'POTENTIAL_LOCALITY_PAGE').length,
    referenceOnly: [...cityResearchRecords, ...indiaWideLocalityCandidates].filter((record) => record.recommendation === 'REFERENCE_ONLY').length,
    rejected: [...cityResearchRecords, ...indiaWideLocalityCandidates].filter((record) => record.recommendation === 'NOT_JUSTIFIED').length,
    pagesCreated: 0,
  },
  laxmiNagarAssessment: report.laxmiNagarAssessment,
  lajpatNagarAssessment: report.lajpatNagarAssessment,
  alternateDomainInvestigation: indiaLocalityResearch.alternateDomainInvestigation,
  nearMeStrategy: report.nearMeStrategy,
  siteArchitecture: {
    authorities: ['/commercial-pilot-license', '/dgca-ground-classes', '/pilot-training-in-delhi', '/pilot-training-in-dwarka', '/about-us', '/contact'],
    localityRoutePattern: '/pilot-training-near/[locality]',
    generatedLocalityPages: 0,
    noindexHub: '/pilot-training-near',
    futureLocalityIndexing: 'Noindex, follow and sitemap exclusion until separately approved.',
    nearMePage: 'None; near-me relevance is dynamic.',
  },
  recommendationPolicy: 'Potential pages require direct query/market research, verified delivery relevance and materially distinct supported content. If city and locality content would differ only by place-name substitution, reject the separate page.',
  finalCandidateAnalysis: {
    status: 'ANALYSIS_ONLY_NO_PAGES',
    decisionRules: [
      'POTENTIAL_CITY_PAGE requires observed local intent, a legitimate geographic entity, a truthful business relationship, distinct useful city-specific content, low doorway risk, an appropriate site-architecture position and support for rather than competition with course authorities.',
      'Online batches for students outside Delhi establish general online availability only. They do not by themselves establish city-specific access, service area, local demand or a reason for separate city pages.',
      'NOT_JUSTIFIED means retained evidence is sufficient to conclude that a page is not supported under current facts; RESEARCH_ONLY means query-level evidence or city-specific facts remain insufficient. Neither means a city is permanently excluded.',
      'UNKNOWN_AFTER_RENDER and CAPTCHA outcomes remain unknown; query attempts and rendered status are not treated as observed result features.',
    ],
    cityCounts: candidateAnalysisCounts(cityCandidateAnalysis),
    localityCounts: candidateAnalysisCounts(localityCandidateAnalysis),
    totalCitiesAnalyzed: cityCandidateAnalysis.length,
    localitySourceRecordCount: indiaWideLocalityCandidates.length,
    uniqueLocalitiesAnalyzed: localityCandidateAnalysis.length,
    duplicateLocalitySeedRecords: indiaWideLocalityCandidates.length - localityCandidateAnalysis.length,
    potentialCityPageCount: cityCandidateAnalysis
      .filter((candidate) => candidate.recommendation === 'POTENTIAL_CITY_PAGE').length,
    potentialLocalityPageCount: localityCandidateAnalysis
      .filter((candidate) => candidate.recommendation === 'POTENTIAL_LOCALITY_PAGE').length,
    cityCandidates: cityCandidateAnalysis,
    localityCandidates: localityCandidateAnalysis,
    cityVsLocalityPolicy: 'Prefer the parent-city authority when local intent overlaps. A locality page requires its own distinct verified purpose; geographic names, PIN records or nearby SERPs alone do not justify a separate URL.',
    localityDecisions: {
      laxmiNagar: localityCandidateAnalysis.find((candidate) => normalize(candidate.location) === 'laxmi nagar'),
      lajpatNagar: localityCandidateAnalysis.find((candidate) => normalize(candidate.location) === 'lajpat nagar'),
      otherLocalityCandidatesWithEvidence: localityCandidateAnalysis
        .filter((candidate) => candidate.recommendation === 'POTENTIAL_LOCALITY_PAGE'),
      otherLocalitiesWithRetainedSerpObservations: localityCandidateAnalysis
        .filter((candidate) => candidate.searchIntent.startsWith('Observed')),
      note: 'No locality-level page is approved. Existing Dwarka authority is retained; Laxmi Nagar and Lajpat Nagar need verification; other locality entries remain research-only.',
    },
    domainOwnershipAssessment,
    pagesCreated: 0,
    sitemapUrlsAdded: 0,
    deploymentOrPushPerformed: false,
  },
};
fs.writeFileSync(path.join(localSeoDir, 'india-local-search-report.json'), `${JSON.stringify(combinedIndiaReport, null, 2)}\n`);

console.log(JSON.stringify({
  geographicReferenceCount: geographicReferences.length,
  localityCandidateCount: report.localityCandidateCount,
  seoCandidateCount: report.seoCandidateCount,
  researchCandidateCount: report.researchCandidateCount,
  needsVerificationCount: report.needsVerificationCount,
  referenceOnlyCount: report.referenceOnlyCount,
  rejectedCandidateCount: report.rejectedCount,
  approvedPilotCount: report.approvedPilotCount,
  indexableLocalityCount: report.indexabilityStatus.indexableLocalityPages,
  stateAndTerritoryCount: indiaCityResearch.stateAndUnionTerritoryCoverage.length,
  indiaCityCount: cityResearchRecords.length,
  indiaLocalityCount: indiaWideLocalityCandidates.length,
  indiaCandidateStatusCounts,
  exampleGeographicRecords: relevantReferenceRecords.map((record) => ({
    name: record.name,
    state: record.state,
    district: record.district,
    postalCodes: record.postalCodes,
    localitySource: record.localitySource,
    stateConflict: record.stateConflict,
    role: record.datasetRole,
  })),
}, null, 2));
