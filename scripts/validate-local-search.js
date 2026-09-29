const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const locationsDir = path.join(root, 'data', 'locations');
const localSeoDir = path.join(root, 'data', 'local-seo');
const enriched = readJson(path.join(locationsDir, 'enriched-locations.json'));
const sourceRecords = readJson(path.join(locationsDir, 'pin-records.json'));
const inventory = readJson(path.join(localSeoDir, 'localities.json'));
const academyGeo = readJson(path.join(localSeoDir, 'academy-geo.json'));
const localityCandidatesData = readJson(path.join(localSeoDir, 'locality-candidates.json'));
const indiaCityResearch = readJson(path.join(localSeoDir, 'india-city-research.json'));
const indiaLocalityResearch = readJson(path.join(localSeoDir, 'india-locality-research.json'));
const indiaResearchReport = readJson(path.join(localSeoDir, 'india-local-search-report.json'));
const pilot = readJson(path.join(localSeoDir, 'pilot-localities.json'));
const report = readJson(path.join(localSeoDir, 'local-search-report.json'));
const entityAudit = readJson(path.join(localSeoDir, 'business-entity-audit.json'));
const sitemapPath = path.join(root, '.generated-sitemap.xml');
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : '';
const buildPages = path.join(root, '.next', 'server', 'pages');
const prerenderManifestPath = path.join(root, '.next', 'prerender-manifest.json');
const prerenderManifest = fs.existsSync(prerenderManifestPath) ? readJson(prerenderManifestPath) : null;
const errors = [];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function fail(message) {
  errors.push(message);
}

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(value) {
  return decodeHtml(value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function getMeta(html, name) {
  const tag = (html.match(new RegExp(`<meta[^>]+name="${name}"[^>]*>`, 'i')) || [])[0];
  return tag ? decodeHtml((tag.match(/content="([^"]*)"/i) || [])[1] || '') : '';
}

function getPageHtml(route) {
  const pagePath = path.join(buildPages, ...route.split('/').filter(Boolean)) + '.html';
  return fs.existsSync(pagePath) ? fs.readFileSync(pagePath, 'utf8') : null;
}

function getPageDetails(route) {
  const html = getPageHtml(route);
  if (!html) return { missing: true, issues: ['missing-html'] };
  const titles = [...html.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)]
    .map((match) => stripHtml(match[1]));
  const descriptions = [...html.matchAll(/<meta[^>]+name="description"[^>]*>/gi)]
    .map((match) => decodeHtml((match[0].match(/content="([^"]*)"/i) || [])[1] || ''));
  const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/gi)]
    .map((match) => match[1]);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((match) => stripHtml(match[1]));
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((match) => stripHtml(match[1]));
  const body = stripHtml((html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || [])[1] || '');
  const schemaTypes = [];
  const schemas = [];
  const schemaErrors = [];
  for (const [index, match] of [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].entries()) {
    try {
      const parsed = JSON.parse(match[1]);
      schemas.push(...(Array.isArray(parsed) ? parsed : [parsed]));
    } catch (error) {
      schemaErrors.push(`JSON-LD ${index + 1}: ${error.message}`);
    }
  }
  for (const schema of schemas) {
    const types = Array.isArray(schema['@type']) ? schema['@type'] : [schema['@type']];
    schemaTypes.push(...types);
  }
  const canonical = canonicals[0] || '';
  const issues = [];
  if (titles.length !== 1) issues.push('title-count');
  if (descriptions.length !== 1) issues.push('description-count');
  if (canonicals.length !== 1) issues.push('canonical-count');
  if (h1s.length !== 1) issues.push('h1-count');
  if (canonical !== `https://weoneaviation.in${route}`) issues.push('canonical-not-self');
  if (getMeta(html, 'robots') !== 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    && getMeta(html, 'robots') !== 'noindex, follow') issues.push('robots-directive');
  if (!schemaTypes.includes('BreadcrumbList')) issues.push('breadcrumb-schema');
  if (!schemaTypes.includes('EducationalOrganization')) issues.push('organization-schema');
  if (schemaErrors.length) issues.push('invalid-json-ld');
  return {
    missing: false,
    issues,
    title: titles[0] || '',
    description: descriptions[0] || '',
    canonical,
    robots: getMeta(html, 'robots'),
    h1: h1s[0] || '',
    h2s,
    body,
    schemaTypes,
    schemaErrors,
    html,
  };
}

const enrichedByPin = new Map(enriched.map((record) => [record.pinCode, record]));
const pdfStatesByPin = new Map();
for (const record of sourceRecords) {
  const pin = String(record.pinCode).padStart(6, '0');
  const state = normalize(record.state);
  if (!state) continue;
  if (!pdfStatesByPin.has(pin)) pdfStatesByPin.set(pin, new Set());
  pdfStatesByPin.get(pin).add(state);
}
const pdfConflictPins = [...pdfStatesByPin]
  .filter(([, states]) => states.size > 1)
  .map(([pin]) => pin);
const conflictIssues = pdfConflictPins.filter((pin) => {
  const location = enrichedByPin.get(pin);
  return !location?.stateConflict
    || !location.conflicts?.pdfStateConflict
    || location.qualityStatus !== 'review'
    || location.fieldSources?.state?.confidence === 'high'
    || location.state !== null
    || (location.conflictingSourceStates || []).length < 2;
});
const provenanceIssues = enriched.filter((location) => (
  location.fieldSources?.pinCode?.source !== 'supplied-pdf'
  || location.fieldSources?.pinCode?.confidence !== 'high'
  || location.fieldSources?.postOfficeNames?.source !== 'supplied-pdf'
  || location.fieldSources?.postOfficeNames?.confidence !== 'high'
  || !['supplied-pdf+geonames-crosscheck', 'geonames-place-name', null].includes(location.fieldSources?.locality?.source)
  || (location.locality && !location.fieldSources?.locality?.confidence)
  || location.fieldSources?.district?.source !== (location.district ? 'geonames-admin2' : null)
  || location.fieldSources?.taluk?.source !== (location.taluk ? 'geonames-admin3' : null)
  || location.fieldSources?.state?.source !== (location.state || location.stateConflict ? 'supplied-pdf+geonames-crosscheck' : null)
));
const localityProvenanceIssues = enriched.filter((location) => {
  if (!location.locality || location.qualityStatus !== 'publish') return false;
  const expectedSource = location.qualityReasons?.includes('single-place-for-pin')
    ? 'geonames-place-name'
    : 'supplied-pdf+geonames-crosscheck';
  return location.fieldSources?.locality?.source !== expectedSource;
});
const cacheReadFiles = [
  'scripts/enrich-locations.js',
  'scripts/generate-local-search.js',
  'components/LocalitySearchPage.jsx',
  'pages/pilot-training-near/[locality].jsx',
].filter((relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8')
  .includes('india-post-cache.json'));

const oldPinRouteExists = fs.existsSync(path.join(root, 'pages', 'pilot-training', '[city]', '[locality].jsx'));
const currentSitemapRoutes = [...sitemap.matchAll(/<loc>https:\/\/weoneaviation\.in([^<]+)<\/loc>/g)]
  .map((match) => match[1]);
const pinRoutesInSitemap = currentSitemapRoutes.filter((route) => /^\/pilot-training\/[^/]+\/[^/]+$/.test(route));
const localityRoutesInSitemap = currentSitemapRoutes.filter((route) => route.startsWith('/pilot-training-near/'));
const authorityRoutes = [
  '/pilot-training-near',
  '/pilot-training-in-delhi',
  '/pilot-training-in-dwarka',
  '/commercial-pilot-license',
  '/dgca-ground-classes',
  '/contact',
  '/about-us',
];
const renderedAuthorityPages = authorityRoutes.map((route) => ({ route, ...getPageDetails(route) }));

if (oldPinRouteExists) fail('Legacy PIN route remains in pages/.');
if (!fs.existsSync(sitemapPath)) fail('Generated sitemap is missing; run npm run generate:sitemap.');
if (pinRoutesInSitemap.length) fail(`PIN-style routes appear in sitemap: ${pinRoutesInSitemap.join(', ')}`);
if (localityRoutesInSitemap.length) fail(`Unapproved locality routes appear in sitemap: ${localityRoutesInSitemap.join(', ')}`);
if (sitemap.includes('/pilot-training-near</loc>')) fail('Noindex locality hub appears in sitemap.');
if (cacheReadFiles.length) fail(`Current pipeline reads the legacy India Post cache: ${cacheReadFiles.join(', ')}`);
if (!entityAudit.googleBusinessProfile?.repositorySignal) fail('Business entity audit omits the Google Maps CID evidence.');
if (entityAudit.business?.verifiedPhysicalAddress?.postalCode !== '110077') fail('Canonical business PIN is not 110077.');
if (pilot.length !== 0) fail(`Locality pilot must be empty until service area is evidenced; found ${pilot.length}.`);
if (inventory.entities?.length !== report.geographicReferenceCount) fail('Geographic reference count does not match the inventory.');
const localityCandidates = localityCandidatesData.candidates || [];
const candidatesByRecommendation = localityCandidates.reduce((counts, candidate) => {
  counts[candidate.recommendation] = (counts[candidate.recommendation] || 0) + 1;
  return counts;
}, {});
const cityMarkets = indiaCityResearch.markets || [];
const stateCoverage = indiaCityResearch.stateAndUnionTerritoryCoverage || [];
const approvedRecommendations = new Set([
  'RESEARCH_ONLY',
  'POTENTIAL_CITY_PAGE',
  'POTENTIAL_LOCALITY_PAGE',
  'REFERENCE_ONLY',
  'NOT_JUSTIFIED',
  'NEEDS_VERIFICATION',
]);
if (!Number.isFinite(academyGeo.latitude) || !Number.isFinite(academyGeo.longitude)
  || academyGeo.coordinateSource?.type !== 'Google Maps place pin'
  || academyGeo.confidence?.coordinates !== 'medium') {
  fail('Academy geography must have sourced coordinates with the stated medium confidence.');
}
if (stateCoverage.length !== 36
  || new Set(stateCoverage.map((entry) => entry.name)).size !== 36
  || cityMarkets.length !== 58
  || new Set(cityMarkets.map((market) => market.city)).size !== cityMarkets.length) {
  fail('India-wide State/UT or city coverage does not match the declared research inventory.');
}
if (indiaCityResearch.cityCount !== cityMarkets.length
  || (indiaCityResearch.cities || []).length !== cityMarkets.length
  || (indiaCityResearch.queryTemplates || []).length !== 9) {
  fail('India-wide city research input/output or query-template counts are inconsistent.');
}
for (const market of cityMarkets) {
  const validResearchStatuses = [
    'FULLY_RESEARCHED',
    'PARTIALLY_RESEARCHED',
    'BLOCKED',
    'NOT_RESEARCHED',
  ];
  const validIntentTypes = [
    'LOCAL_BUSINESS',
    'LOCAL_SERVICE',
    'COURSE_RESEARCH',
    'INFORMATIONAL',
    'MIXED',
    'UNKNOWN',
  ];
  if (!market.city || !market.state || !market.stateCode
    || !['UNKNOWN', 'OBSERVED'].includes(market.searchIntentStatus)
    || !['HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'].includes(market.businessRelevance)
    || !approvedRecommendations.has(market.recommendation)
    || market.pageStatus !== 'RESEARCH_ONLY'
    || market.plannedQueries?.length !== 9
    || !validResearchStatuses.includes(market.researchStatus)
    || market.queryObservations?.some((query) => (
      !query.query
        || !query.engine
        || !['OBSERVED', 'BLOCKED_BY_GOOGLE_TRAFFIC_CHALLENGE', 'FAILED'].includes(query.status)
        || !validIntentTypes.includes(query.searchIntentType)
        || (query.status === 'OBSERVED' && !query.url)
    ))
    || !market.businessRelevanceEvidence
    || !market.contentValueEvidence
    || !market.recommendationRationale) {
    fail(`${market.city || 'City market'} has incomplete or unsupported research classification.`);
  }
}
if (localityCandidatesData.candidateCount !== localityCandidates.length
  || (indiaLocalityResearch.localities || []).length !== localityCandidates.length
  || localityCandidates.length !== 37
  || (indiaLocalityResearch.localityQueryTemplates || []).length !== 9) {
  fail('India-wide locality inventory or query-template counts are inconsistent.');
}
for (const candidate of localityCandidates) {
  if (!candidate.locality || !candidate.city || !candidate.state || !candidate.stateCode
    || !Array.isArray(candidate.geographicSources)
    || !['UNKNOWN', 'PARTIALLY_RESEARCHED', 'OBSERVED'].includes(candidate.searchIntentStatus)
    || !['HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'].includes(candidate.businessRelevance)
    || !approvedRecommendations.has(candidate.recommendation)
    || !['RESEARCH_ONLY', 'REFERENCE_ONLY'].includes(candidate.pageStatus)
    || candidate.searchQueries?.length !== 9
    || candidate.pinCode || candidate.postalCode) {
    fail(`${candidate.locality || 'Locality market'} has incomplete fields or is coupled to PIN/page generation.`);
  }
}
if (localityCandidatesData.pinDataUsedForSelection !== false
  || localityCandidates.some((candidate) => candidate.recommendation === 'POTENTIAL_LOCALITY_PAGE')
  || cityMarkets.some((market) => market.recommendation === 'POTENTIAL_CITY_PAGE')) {
  fail('PIN data must not select markets, and no page candidates are approved in the research phase.');
}
if (indiaResearchReport.geographicCoverage?.stateAndUnionTerritoryEntries !== 36
  || indiaResearchReport.geographicCoverage?.cities !== cityMarkets.length
  || indiaResearchReport.geographicCoverage?.localities !== localityCandidates.length
  || (indiaResearchReport.searchIntentResearch?.cityCoverageByResearchStatus?.FULLY_RESEARCHED || 0)
    !== (cityMarkets.filter((market) => market.researchStatus === 'FULLY_RESEARCHED').length || 0)
  || (indiaResearchReport.searchIntentResearch?.cityCoverageByResearchStatus?.PARTIALLY_RESEARCHED || 0)
    !== (cityMarkets.filter((market) => market.researchStatus === 'PARTIALLY_RESEARCHED').length || 0)
  || (indiaResearchReport.searchIntentResearch?.cityCoverageByResearchStatus?.BLOCKED || 0)
    !== (cityMarkets.filter((market) => market.researchStatus === 'BLOCKED').length || 0)
  || (indiaResearchReport.searchIntentResearch?.cityCoverageByResearchStatus?.NOT_RESEARCHED || 0)
    !== (cityMarkets.filter((market) => market.researchStatus === 'NOT_RESEARCHED').length || 0)
  || indiaResearchReport.prioritization?.pagesCreated !== 0
  || report.indiaWideLocalResearch?.pagesCreated !== 0) {
  fail('India-wide report coverage or zero-page status does not match the source inventories.');
}
const finalCandidateAnalysis = indiaResearchReport.finalCandidateAnalysis;
const candidateCategories = new Set([
  'EXISTING_AUTHORITY',
  'POTENTIAL_CITY_PAGE',
  'RESEARCH_ONLY',
  'REFERENCE_ONLY',
  'NEEDS_VERIFICATION',
  'NOT_JUSTIFIED',
]);
const expectedUniqueLocalities = new Set(localityCandidates.map((candidate) => [
  normalize(candidate.locality),
  normalize(candidate.city),
  normalize(candidate.state),
].join('|'))).size;
if (finalCandidateAnalysis?.status !== 'ANALYSIS_ONLY_NO_PAGES'
  || finalCandidateAnalysis.totalCitiesAnalyzed !== cityMarkets.length
  || finalCandidateAnalysis.cityCandidates?.length !== cityMarkets.length
  || finalCandidateAnalysis.localitySourceRecordCount !== localityCandidates.length
  || finalCandidateAnalysis.uniqueLocalitiesAnalyzed !== expectedUniqueLocalities
  || finalCandidateAnalysis.localityCandidates?.length !== expectedUniqueLocalities
  || finalCandidateAnalysis.potentialCityPageCount !== 0
  || finalCandidateAnalysis.potentialLocalityPageCount !== 0
  || finalCandidateAnalysis.pagesCreated !== 0
  || finalCandidateAnalysis.sitemapUrlsAdded !== 0
  || finalCandidateAnalysis.deploymentOrPushPerformed !== false
  || finalCandidateAnalysis.cityCandidates.some((candidate) => (
    !candidate.location
      || candidate.type !== 'CITY'
      || !candidate.state
      || !candidate.searchIntent
      || !candidate.serpEvidence
      || !candidate.businessRelationship
      || !candidate.uniqueContentOpportunity
      || !candidate.riskOfDoorway
      || !candidateCategories.has(candidate.recommendation)
      || (candidate.recommendation === 'POTENTIAL_CITY_PAGE' && !candidate.uniqueContentReason)
  ))
  || finalCandidateAnalysis.localityCandidates.some((candidate) => (
    !candidate.location
      || candidate.type !== 'LOCALITY'
      || !candidate.parentCity
      || !candidate.searchIntent
      || !candidate.serpEvidence
      || !candidate.businessRelationship
      || !candidate.uniqueContentOpportunity
      || !candidate.riskOfDoorway
      || !candidateCategories.has(candidate.recommendation)
  ))
  || finalCandidateAnalysis.domainOwnershipAssessment?.domain !== 'weoneaviation.com'
  || finalCandidateAnalysis.domainOwnershipAssessment?.status !== 'DOMAIN_OWNERSHIP_UNVERIFIED') {
  fail('Final candidate analysis must classify every city and unique locality, preserve domain uncertainty and approve no pages.');
}
const cityBatch = indiaCityResearch.cityResearchBatch;
const cityBatchMatrix = indiaResearchReport.searchIntentResearch?.cityBatchQueryMatrix || [];
const batchGoogleStatuses = cityBatchMatrix.reduce((counts, query) => {
  counts[query.google?.status] = (counts[query.google?.status] || 0) + 1;
  return counts;
}, {});
const batchBingStatuses = cityBatchMatrix.reduce((counts, query) => {
  counts[query.bing?.status] = (counts[query.bing?.status] || 0) + 1;
  return counts;
}, {});
const validBatchIntentTypes = [
  'LOCAL_BUSINESS',
  'LOCAL_SERVICE',
  'COURSE_RESEARCH',
  'INFORMATIONAL',
  'MIXED',
  'UNKNOWN',
];
if (cityBatch?.markets?.length !== 49
  || cityBatch?.queryTemplates?.length !== 4
  || cityBatchMatrix.length !== 196
  || batchGoogleStatuses.RENDERED !== 50
  || batchGoogleStatuses.CAPTCHA_OR_UNUSUAL_TRAFFIC !== 146
  || batchBingStatuses.RENDERED !== 148
  || batchBingStatuses.NOT_ATTEMPTED !== 48
  || cityBatchMatrix.some((query) => (
    !query.city
      || !query.query
      || !query.google?.url
      || !query.bing?.url
      || !validBatchIntentTypes.includes(query.searchIntentType)
      || !['RENDERED', 'CAPTCHA_OR_UNUSUAL_TRAFFIC', 'NOT_ATTEMPTED'].includes(query.google.status)
      || !['RENDERED', 'NOT_ATTEMPTED'].includes(query.bing.status)
      || !validBatchIntentTypes.includes(query.google.searchIntentType)
      || !validBatchIntentTypes.includes(query.bing.searchIntentType)
      || !Array.isArray(query.google.observedSerpComponents)
      || !Array.isArray(query.bing.observedSerpComponents)
      || (query.google.status === 'CAPTCHA_OR_UNUSUAL_TRAFFIC'
        && query.google.serpPattern !== 'NOT_AVAILABLE_CAPTCHA_OR_UNUSUAL_TRAFFIC')
      || (query.google.status === 'RENDERED'
        && !query.google.serpPattern)
      || (query.bing.status === 'RENDERED'
        && !query.bing.serpPattern)
  ))
  || !Array.isArray(indiaResearchReport.serpResearch?.cityBatchQueryMatrix)
  || indiaResearchReport.serpResearch.cityBatchQueryMatrix.length !== 196) {
  fail('49-city query matrix must preserve all 196 Google outcomes, Bing attempts, URLs and unknown-after-render details.');
}
const cityObservations = indiaCityResearch.serpObservations || [];
const localityObservations = indiaLocalityResearch.serpObservations || [];
const localityAttempts = indiaLocalityResearch.serpResearchAttempts || [];
if (cityObservations.some((observation) => !observation.city
  || (!observation.queries?.length && !observation.query))
  || localityObservations.length !== 3
  || localityObservations.some((observation) => !observation.queries?.length || !observation.serpFeatures)
  || localityAttempts.some((attempt) => !attempt.locality || !attempt.query || !attempt.status)) {
  fail('Direct SERP observations and blocked attempts must be evidenced and distinguished from unknown research.');
}
if (indiaResearchReport.serpResearch?.observedCityQueries?.length !== cityObservations.length
  || indiaResearchReport.serpResearch?.observedLocalityQueries?.length !== localityObservations.length
  || indiaResearchReport.serpResearch?.blockedAttempts?.length !== localityAttempts.length
  || indiaResearchReport.searchIntentResearch?.cityQueriesObserved !== new Set(cityMarkets
    .flatMap((market) => market.queryObservations || [])
    .filter((query) => query.status === 'OBSERVED')
    .map((query) => normalize(query.query))).size
  || indiaResearchReport.searchIntentResearch?.localityQueriesObserved !== new Set(localityCandidates
    .flatMap((candidate) => candidate.queryObservations || [])
    .filter((query) => query.status === 'OBSERVED')
    .map((query) => normalize(`${query.engine} ${query.query}`))).size
  || indiaResearchReport.serpResearch?.remainingMarkets?.some((market) => (
    market.status === 'PARTIALLY_RESEARCHED' && !market.remainingQueries?.length
  ))
  || indiaResearchReport.serpResearch?.remainingMarkets?.some((market) => (
    market.status === 'BLOCKED_BY_GOOGLE_TRAFFIC_CHALLENGE' && !market.blockedAttempt
  ))) {
  fail('India-wide SERP report does not preserve observation, blocked-attempt and unknown status separately.');
}
if (report.localityCandidateCount !== localityCandidates.length
  || report.approvedPilotCount !== 0
  || report.seoCandidateCount !== (candidatesByRecommendation.POTENTIAL_LOCALITY_PAGE || 0)
  || report.researchCandidateCount !== (candidatesByRecommendation.RESEARCH_ONLY || 0)
  || report.needsVerificationCount !== (candidatesByRecommendation.NEEDS_VERIFICATION || 0)
  || report.referenceOnlyCount !== (candidatesByRecommendation.REFERENCE_ONLY || 0)
  || report.rejectedCount !== (candidatesByRecommendation.NOT_JUSTIFIED || 0)
  || report.localityCandidates?.length !== localityCandidates.length
  || report.selectedPilotLocalities?.length
  || report.rejectedLocalities?.length !== (candidatesByRecommendation.NOT_JUSTIFIED || 0)) {
  fail('Locality recommendation totals do not match the India-wide candidate dataset.');
}
if (report.seoCandidateCount !== 0 || report.indexabilityStrategy?.localityRoutesGenerated !== 0
  || report.indexabilityStrategy?.localityRoutesIndexable !== 0) {
  fail('Locality SEO pages must not be generated or indexable during the research phase.');
}
const relevantNameMatches = (name, term) => {
  const normalizedName = normalize(name);
  return normalizedName === term || normalizedName.startsWith(`${term} `);
};
if (report.geographicReferenceExamples?.filter((record) => relevantNameMatches(record.name, 'lajpat nagar')).length < 1) {
  fail('Lajpat Nagar source record is not fully represented in the report.');
}
if (report.geographicReferenceExamples?.filter((record) => relevantNameMatches(record.name, 'laxmi nagar')).length !== 2) {
  fail('Expected the Laxmi Nagar source-record variants in the report.');
}
for (const locality of ['Laxmi Nagar', 'Lajpat Nagar']) {
  const candidate = localityCandidates.find((record) => normalize(record.locality) === normalize(locality));
  if (!candidate || candidate.recommendation !== 'NEEDS_VERIFICATION') {
    fail(`${locality} must remain a geographic research record pending verification, not an SEO candidate.`);
  }
}
if (report.laxmiNagarAssessment?.decision?.indexOf('NEEDS_VERIFICATION') !== 0
  || report.lajpatNagarAssessment?.decision?.indexOf('NEEDS_VERIFICATION') !== 0) {
  fail('Laxmi Nagar and Lajpat Nagar assessments must retain the verification gate.');
}
const alternateDomain = report.alternateDomainInvestigation;
if (alternateDomain?.domain !== 'weoneaviation.com'
  || alternateDomain.ownershipStatus !== 'UNVERIFIED'
  || !alternateDomain.liveHttpEvidence?.some((evidence) => (
    evidence.url === 'https://www.weoneaviation.com/laxmi-nagar/dgca-ground-classes'
      && evidence.status === 'FETCHED'
  ))
  || !alternateDomain.liveHttpEvidence?.some((evidence) => (
    evidence.url === 'https://weoneaviation.in/laxmi-nagar/dgca-ground-classes'
      && evidence.status === 'HTTP_404'
  ))
  || !alternateDomain.decision?.includes('Do not attribute')
  || alternateDomain.conflictingBusinessDetailsInPageSchema?.address?.indexOf('110075') === -1
  || !alternateDomain.liveHttpEvidence?.some((evidence) => (
    evidence.url === 'https://www.weoneaviation.com/sitemap.xml'
      && evidence.observation?.includes('268973')
  ))) {
  fail('Laxmi Nagar alternate-domain evidence must remain explicitly unverified and separate from the .in entity.');
}
const profileChecklist = entityAudit.googleBusinessProfile?.checklist || [];
if (!profileChecklist.length
  || profileChecklist.some((item) => !['VERIFIED', 'UNVERIFIED', 'NEEDS_ACTION'].includes(item.status))) {
  fail('Google Business Profile audit checklist is missing or uses an unsupported status.');
}
if (report.serviceArea?.actualServiceArea?.localityBoundaries?.length) {
  fail('Service area includes unsupported locality boundaries.');
}
if (report.indexabilityStatus?.indexableLocalityPages !== 0) fail('Report claims indexable locality pages.');
if (!report.localIntentCoverage?.noDedicatedNearMePage
  || !report.localIntentCoverage?.nearMeReality?.includes('cannot guarantee')) {
  fail('Report does not document near-me limitations.');
}
if (conflictIssues.length) fail(`${conflictIssues.length} PDF state-conflict groups are not safely held for review.`);
if (provenanceIssues.length) fail(`${provenanceIssues.length} enriched records have field-provenance issues.`);
if (localityProvenanceIssues.length) fail(`${localityProvenanceIssues.length} publishable locality values have incorrect provenance.`);
if (!report.oldPinRouteStatus || report.oldPinRouteStatus.sourceRouteExists || report.oldPinRouteStatus.routableByCurrentPagesSource) {
  fail('Report misstates the retired PIN route status.');
}
if (report.oldPinRouteStatus?.presentInCurrentSitemap
  || !report.oldPinRouteStatus?.indexedStatus?.includes('Not independently verified')) {
  fail('Report makes an unsupported claim about old route sitemap/index status.');
}
if (report.internalLinkingReport?.hubLinksFromAuthorityPages?.length !== 3) {
  fail('Expected report to identify the three authoritative pages linked to the noindex hub.');
}
if (!report.schemaReport?.localBusinessMisuse?.includes('Removed')) {
  fail('Schema audit omits the LocalBusiness removal.');
}
if (report.schemaReport?.localityPageSchemas?.includes('No locality pages generated') !== true) {
  fail('Schema report does not state that no locality pages are generated.');
}

if (!fs.existsSync(buildPages)) {
  fail('Production build output is missing; run npm run build before validation.');
}
if (!prerenderManifest) {
  fail('Production prerender manifest is missing; run npm run build before validation.');
}
const generatedLocalityPaths = Object.keys(prerenderManifest?.routes || {})
  .filter((route) => route.startsWith('/pilot-training-near/') && route !== '/pilot-training-near');
if (generatedLocalityPaths.length) {
  fail(`Unapproved locality page instances were generated: ${generatedLocalityPaths.join(', ')}`);
}
for (const page of renderedAuthorityPages) {
  if (page.missing || page.issues.length) {
    fail(`${page.route}: ${page.issues?.join(', ') || 'missing page output'}`);
  }
}

const noindexHub = renderedAuthorityPages.find(({ route }) => route === '/pilot-training-near');
if (noindexHub && !noindexHub.missing) {
  if (noindexHub.robots !== 'noindex, follow') fail('Local-search hub must be noindex, follow.');
  for (const target of [
    '/commercial-pilot-license',
    '/dgca-ground-classes',
    '/courses/ppl',
    '/courses/atpl',
    '/about-us',
    '/pilot-training-in-delhi',
    '/pilot-training-in-dwarka',
    '/contact',
  ]) {
    if (!noindexHub.html.includes(`href="${target}"`)) fail(`Local-search hub is missing internal link ${target}.`);
  }
}
for (const route of ['/pilot-training-in-delhi', '/pilot-training-in-dwarka', '/dgca-ground-classes']) {
  const page = renderedAuthorityPages.find((item) => item.route === route);
  if (page && !page.missing && !page.html.includes('href="/pilot-training-near"')) {
    fail(`${route} does not link to the local-search hub.`);
  }
}
if (noindexHub && !noindexHub.missing) {
  const hubSchema = [...noindexHub.html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => JSON.parse(match[1]))
    .flatMap((schema) => Array.isArray(schema) ? schema : [schema]);
  const webpage = hubSchema.find((schema) => schema['@type'] === 'WebPage');
  if (webpage?.publisher?.['@id'] !== 'https://weoneaviation.in/#organization') {
    fail('Local-search hub WebPage does not reference the canonical organization.');
  }
  if (hubSchema.some((schema) => schema['@type'] === 'LocalBusiness')) {
    fail('Local-search hub emits LocalBusiness schema.');
  }
}

const reportOutput = {
  generatedAt: new Date().toISOString(),
  sourceAudit: {
    totalEnrichedPins: enriched.length,
    pdfStateConflictPins: pdfConflictPins.length,
    conflictsMissingReview: conflictIssues.length,
    fieldProvenanceIssues: provenanceIssues.length,
    publishableLocalityProvenanceIssues: localityProvenanceIssues.length,
    legacyCacheUsedByCurrentPipeline: cacheReadFiles.length > 0,
    legacyCacheReaderFiles: cacheReadFiles,
  },
  localSeo: {
    geographicReferences: inventory.entities.length,
    actualLocalityCandidates: report.localityCandidateCount,
    candidatesByRecommendation,
    selectedPilotPages: pilot.length,
    indexableLocalityPages: report.indexabilityStatus?.indexableLocalityPages || 0,
    laxmiNagarRecords: report.geographicReferenceExamples.filter((record) => relevantNameMatches(record.name, 'laxmi nagar')).length,
    lajpatNagarRecords: report.geographicReferenceExamples.filter((record) => relevantNameMatches(record.name, 'lajpat nagar')).length,
    localityRouteTemplatePresent: fs.existsSync(path.join(root, 'pages', 'pilot-training-near', '[locality].jsx')),
    emittedLocalityRoutes: generatedLocalityPaths.length,
  },
  indiaWideResearch: {
    stateAndUnionTerritoryCount: stateCoverage.length,
    cityCount: cityMarkets.length,
    localityCount: localityCandidates.length,
    potentialCityCandidates: cityMarkets.filter((market) => market.recommendation === 'POTENTIAL_CITY_PAGE').length,
    potentialLocalityCandidates: candidatesByRecommendation.POTENTIAL_LOCALITY_PAGE || 0,
    referenceOnlyLocations: (candidatesByRecommendation.REFERENCE_ONLY || 0)
      + cityMarkets.filter((market) => market.recommendation === 'REFERENCE_ONLY').length,
    rejectedLocations: (candidatesByRecommendation.NOT_JUSTIFIED || 0)
      + cityMarkets.filter((market) => market.recommendation === 'NOT_JUSTIFIED').length,
    observedCityMarketSnapshots: indiaResearchReport.serpResearch.sampleSizeCities,
    observedCityQueryCount: indiaResearchReport.searchIntentResearch.cityQueriesObserved,
    observedLocalityMarketSnapshots: indiaResearchReport.serpResearch.sampleSizeLocalities,
    observedLocalityQueryCount: indiaResearchReport.searchIntentResearch.localityQueriesObserved,
    blockedLocalitySerpAttempts: indiaResearchReport.serpResearch.blockedAttempts.length,
    laxmiNagarAlternateDomain: {
      domain: alternateDomain.domain,
      classification: alternateDomain.classification,
      ownershipStatus: alternateDomain.ownershipStatus,
      verifiedSiteRouteStatus: '404',
      pagesAttributedToVerifiedBusiness: false,
      sitemapDeclaredPageCount: 268973,
      domainContentRisk: 'Potential legacy or compromised mass-published geo/service content; ownership and actual indexed count remain unverified.',
    },
    pagesCreated: indiaResearchReport.prioritization.pagesCreated,
  },
  sitemap: {
    totalRoutes: currentSitemapRoutes.length,
    pinStyleRoutes: pinRoutesInSitemap.length,
    localityRoutes: localityRoutesInSitemap.length,
    noindexHubIncluded: sitemap.includes('/pilot-training-near</loc>'),
  },
  oldPinRoute: {
    sourceRouteExists: oldPinRouteExists,
    publicSample: report.oldPinRouteStatus.liveSampleStatus,
    indexedStatus: report.oldPinRouteStatus.indexedStatus,
    redirectDecision: report.oldPinRouteStatus.redirectDecision,
  },
  existingPageQa: renderedAuthorityPages.map((page) => ({
    route: page.route,
    missing: page.missing,
    title: page.title || '',
    description: page.description || '',
    canonical: page.canonical || '',
    robots: page.robots || '',
    h1: page.h1 || '',
    h2Count: page.h2s?.length || 0,
    schemaTypes: page.schemaTypes || [],
    issues: page.issues || [],
  })),
  duplicateContent: report.duplicateContentReport,
  errors,
};

fs.writeFileSync(
  path.join(localSeoDir, 'locality-page-validation-report.json'),
  `${JSON.stringify(reportOutput, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(localSeoDir, 'content-quality-report.json'),
  `${JSON.stringify({
    generatedAt: reportOutput.generatedAt,
    totalGeographicReferences: inventory.entities.length,
    localityCandidates: localityCandidates.length,
    candidateRecommendationCounts: candidatesByRecommendation,
    localitySeoCandidates: report.seoCandidateCount,
    approvedPilotPages: 0,
    indexablePages: 0,
    pagesComparedForSimilarity: 0,
    records: [],
    note: 'This candidate model is separate from the PIN dataset. No locality page is generated until verified service relevance and unique editorial value are established.',
  }, null, 2)}\n`,
);
console.log(JSON.stringify(reportOutput, null, 2));
if (errors.length) process.exitCode = 1;
