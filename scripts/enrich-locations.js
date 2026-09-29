const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');
const { getContentQualityStatus, buildLocationMetadata } = require('../lib/location-content');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_URL = 'https://download.geonames.org/export/zip/IN.zip';
const SOURCE_LICENSE_URL = 'https://download.geonames.org/export/zip/readme.txt';
const SOURCE_ZIP = path.join(ROOT, 'data', 'locations', 'source', 'geonames-IN.zip');
const OUTPUT_FILE = path.join(ROOT, 'data', 'locations', 'enriched-locations.json');
const REPORT_FILE = path.join(ROOT, 'data', 'locations', 'enrichment-report.json');
const EDITORIAL_CONTENT_FILE = path.join(ROOT, 'data', 'locations', 'editorial-content.json');
const REQUEST_TIMEOUT_MS = 45_000;
const DATASET_URL = process.env.GEONAMES_POSTAL_DATA_URL || SOURCE_URL;
const JSZipClass = JSZip.default || JSZip;

const STATE_ALIASES = new Map([
  ['orissa', 'odisha'],
  ['uttaranchal', 'uttarakhand'],
  ['utter pradesh', 'uttar pradesh'],
  ['tamilnadu', 'tamil nadu'],
  ['chattisgarh', 'chhattisgarh'],
  ['pondicherry', 'puducherry'],
  ['andaman and nicobar', 'andaman and nicobar islands'],
  ['nct of delhi', 'delhi'],
  ['jammu and kashmir', 'jammu and kashmir'],
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

function stateKey(value) {
  const key = normalize(value);
  return STATE_ALIASES.get(key) || key;
}

function titleCase(value) {
  return String(value || '').toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase());
}

function slugify(value) {
  return normalize(value).replace(/\s+/g, '-');
}

function readSourcePins() {
  const records = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'locations', 'pin-records.json'), 'utf8'));
  const groups = new Map();
  for (const record of records) {
    const pinCode = String(record.pinCode || '').replace(/\D/g, '').padStart(6, '0');
    if (!groups.has(pinCode)) groups.set(pinCode, []);
    groups.get(pinCode).push({ ...record, pinCode });
  }
  return { records, groups };
}

function readEditorialContent() {
  if (!fs.existsSync(EDITORIAL_CONTENT_FILE)) return {};
  const content = JSON.parse(fs.readFileSync(EDITORIAL_CONTENT_FILE, 'utf8'));
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    throw new Error('editorial-content.json must be an object keyed by location entity ID');
  }
  for (const [entityId, entry] of Object.entries(content)) {
    if (!entry || typeof entry !== 'object' || !Array.isArray(entry.sections)) {
      throw new Error(`Editorial content for ${entityId} must include a sections array`);
    }
    if (entry.sections.some((section) => (
      !section?.heading
      || !section?.source
      || !Array.isArray(section.paragraphs)
      || section.paragraphs.some((paragraph) => typeof paragraph !== 'string' || !paragraph.trim())
    ))) {
      throw new Error(`Editorial sections for ${entityId} require a heading, source, and non-empty paragraphs`);
    }
  }
  return content;
}

async function ensureDataset() {
  if (fs.existsSync(SOURCE_ZIP) && process.env.REFRESH_GEONAMES !== '1') return;
  fs.mkdirSync(path.dirname(SOURCE_ZIP), { recursive: true });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(DATASET_URL, { signal: controller.signal });
    if (!response.ok) throw new Error(`GeoNames dataset download failed: HTTP ${response.status}`);
    fs.writeFileSync(SOURCE_ZIP, Buffer.from(await response.arrayBuffer()));
  } finally {
    clearTimeout(timeout);
  }
}

async function readGeoNames() {
  await ensureDataset();
  const archive = await JSZipClass.loadAsync(fs.readFileSync(SOURCE_ZIP));
  const file = archive.file('IN.txt');
  if (!file) throw new Error('GeoNames archive does not contain IN.txt');
  const text = await file.async('string');
  const byPin = new Map();
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
    const [
      countryCode, rawPin, placeName, adminName1, adminCode1,
      adminName2, adminCode2, adminName3, adminCode3,
      latitude, longitude, accuracy,
    ] = line.split('\t');
    const pinCode = String(rawPin || '').replace(/\D/g, '').padStart(6, '0');
    if (countryCode !== 'IN' || !/^\d{6}$/.test(pinCode) || !placeName) continue;
    const item = {
      pinCode,
      placeName: titleCase(placeName),
      state: titleCase(adminName1),
      stateCode: adminCode1 || null,
      district: titleCase(adminName2),
      districtCode: adminCode2 || null,
      taluk: adminName3 && adminName3 !== 'NA' ? titleCase(adminName3) : null,
      talukCode: adminCode3 || null,
      latitude: Number(latitude) || null,
      longitude: Number(longitude) || null,
      coordinateAccuracy: Number(accuracy) || null,
    };
    if (!byPin.has(pinCode)) byPin.set(pinCode, []);
    byPin.get(pinCode).push(item);
  }
  return { byPin, sourceRecords: text.split(/\r?\n/).filter(Boolean).length };
}

function selectGeoRecord(records, sourceOffices) {
  const distinct = new Map();
  for (const record of records) {
    const key = normalize(record.placeName);
    if (!distinct.has(key) || record.coordinateAccuracy > distinct.get(key).coordinateAccuracy) {
      distinct.set(key, record);
    }
  }
  const candidates = [...distinct.values()];
  const exact = candidates.filter((candidate) =>
    sourceOffices.some((office) => normalize(office) === normalize(candidate.placeName)));
  if (exact.length === 1) return { record: exact[0], matchType: 'exact' };

  const contained = candidates.filter((candidate) =>
    sourceOffices.some((office) => {
      const officeKey = normalize(office);
      const placeKey = normalize(candidate.placeName);
      return officeKey.length >= 5 && (placeKey.startsWith(officeKey) || officeKey.startsWith(placeKey));
    }));
  if (contained.length === 1) return { record: contained[0], matchType: 'name-prefix' };
  if (candidates.length === 1) return { record: candidates[0], matchType: 'single-place-for-pin' };
  return { record: null, matchType: exact.length || contained.length ? 'conflicting-place-matches' : 'ambiguous-place-names' };
}

function fieldSource(source, confidence, value, extra = {}) {
  const { preserveSource = false, ...details } = extra;
  return {
    source: value || preserveSource ? source : null,
    confidence: value || preserveSource ? confidence : 'none',
    ...details,
  };
}

function enrichEntity(pinCode, sourceRecords, geoRecords, lookupTimestamp, editorialEntry) {
  const postOfficeNames = [...new Set(sourceRecords
    .map((record) => String(record.postOffice || '').replace(/\bPOST OFFICE NAME\b|\bPIN CODE\b/gi, '').trim())
    .filter(Boolean))].sort();
  const sourceStates = [...new Set(sourceRecords.map((record) => String(record.state || '').trim()).filter(Boolean))];
  const pdfStatesByKey = new Map(sourceStates.map((state) => [stateKey(state), titleCase(state)]));
  const pdfStateConflict = pdfStatesByKey.size > 1;
  const pdfState = pdfStateConflict ? null : [...pdfStatesByKey.values()][0] || null;
  const matchingStateRecords = geoRecords.filter((record) => pdfStatesByKey.has(stateKey(record.state)));
  const geoNamesPlaceNames = [...new Set(matchingStateRecords.map((record) => record.placeName).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  const geoNamesStates = [...new Set(geoRecords.map((record) => record.state).filter(Boolean))];
  const geoNamesStateConflict = !pdfStateConflict
    && Boolean(pdfState)
    && geoNamesStates.some((state) => stateKey(state) !== stateKey(pdfState));
  const selected = selectGeoRecord(matchingStateRecords, postOfficeNames);
  const place = selected.record;
  const validPin = /^\d{6}$/.test(pinCode) && !/^0+$/.test(pinCode);
  const stateConflict = pdfStateConflict || geoNamesStateConflict;
  const missingDistrict = !place?.district;
  const canonicalLocality = selected.matchType === 'exact' || selected.matchType === 'name-prefix'
    ? postOfficeNames.find((office) => {
      const officeKey = normalize(office);
      const placeKey = normalize(place.placeName);
      return officeKey === placeKey || placeKey.startsWith(officeKey) || officeKey.startsWith(placeKey);
    })
    : place?.placeName || null;
  const unambiguous = Boolean(place && canonicalLocality && !stateConflict && !missingDistrict);
  const status = !validPin || !postOfficeNames.length
    ? 'exclude'
    : unambiguous ? 'publish' : 'review';
  const entity = {
    locationEntityId: `IN-${pinCode}`,
    pinCode,
    pinCodes: [pinCode],
    postOfficeNames,
    sourceStates,
    geoNamesRecordCount: geoRecords.length,
    geoNamesStateMatchCount: matchingStateRecords.length,
    geoNamesPlaceNames,
    locality: canonicalLocality ? titleCase(canonicalLocality) : null,
    city: null,
    district: place?.district || null,
    taluk: place?.taluk || null,
    geoNamesPlaceName: place?.placeName || null,
    region: null,
    state: pdfState,
    stateConflict,
    conflictingSourceStates: pdfStateConflict ? sourceStates : [],
    latitude: place?.latitude ?? null,
    longitude: place?.longitude ?? null,
    coordinateAccuracy: place?.coordinateAccuracy ?? null,
    sourceConfidence: status === 'publish' ? 'medium' : 'low',
    geoVerified: Boolean(place && !stateConflict),
    contentReady: status === 'publish',
    indexable: false,
    published: false,
    pilotIncluded: false,
    editorialReview: editorialEntry?.review || null,
    editorialSections: editorialEntry?.sections || [],
    qualityStatus: status,
    qualityTier: status === 'publish' ? 'A' : status === 'exclude' ? 'D' : 'C',
    qualityReasons: status === 'publish'
      ? [
          'valid-pin',
          'state-cross-match',
          selected.matchType === 'single-place-for-pin' ? 'single-place-for-pin' : 'postal-name-place-match',
          'district-present',
        ]
      : [selected.matchType, ...(stateConflict ? ['state-conflict'] : []), ...(missingDistrict ? ['missing-district'] : [])],
    fieldSources: {
      pinCode: fieldSource('supplied-pdf', 'high', pinCode),
      postOfficeNames: fieldSource('supplied-pdf', 'high', postOfficeNames.length),
      locality: fieldSource(
        selected.matchType === 'single-place-for-pin' ? 'geonames-place-name' : 'supplied-pdf+geonames-crosscheck',
        'medium',
        canonicalLocality,
      ),
      city: fieldSource(null, 'none', null),
      district: fieldSource('geonames-admin2', 'medium', place?.district),
      taluk: fieldSource('geonames-admin3', 'medium', place?.taluk),
      geoNamesPlaceNames: fieldSource('geonames-place-name', 'medium', geoNamesPlaceNames.length),
      state: fieldSource(
        'supplied-pdf+geonames-crosscheck',
        stateConflict ? 'low' : place ? 'high' : 'medium',
        pdfState,
        {
          preserveSource: stateConflict,
          sourceValues: sourceStates,
          crossCheckValues: geoNamesStates,
          stateConflict,
        },
      ),
      latitude: fieldSource('geonames-estimated-coordinate', 'low', place?.latitude),
      longitude: fieldSource('geonames-estimated-coordinate', 'low', place?.longitude),
    },
    lookupTimestamp: place ? lookupTimestamp : null,
    sourcePages: [...new Set(sourceRecords.map((record) => record.sourcePage))],
    canonicalPath: null,
    serviceScope: 'nearby-service',
    metaTitle: null,
    metaDescription: null,
    ...(stateConflict ? {
      conflicts: {
        stateConflict: true,
        pdfStateConflict,
        geoNamesStateConflict,
        pdfStates: sourceStates,
        geoNamesStates,
      },
    } : {}),
  };

  if (status === 'publish' && entity.state) {
    const pathContext = entity.city || place.district || place.taluk || entity.state;
    const pathLocality = canonicalLocality;
    entity.canonicalPath = `/pilot-training/${slugify(pathContext)}/${slugify(pathLocality)}`;
    const metadata = buildLocationMetadata(entity);
    entity.metaTitle = metadata.title;
    entity.metaDescription = metadata.description;
  }
  entity.contentQualityStatus = getContentQualityStatus(entity);
  entity.indexable = entity.contentQualityStatus === 'PUBLISH_INDEXABLE';
  return entity;
}

async function main() {
  const { records, groups } = readSourcePins();
  const { byPin, sourceRecords } = await readGeoNames();
  const editorialContent = readEditorialContent();
  const timestamp = new Date().toISOString();
  let locations = [];
  for (const [pinCode, postalRecords] of groups) {
    const geoRecords = byPin.get(pinCode) || [];
    const entity = enrichEntity(
      pinCode,
      postalRecords,
      geoRecords,
      timestamp,
      editorialContent[`IN-${pinCode}`],
    );
    locations.push(entity);
  }

  const canonicalGroups = new Map();
  locations.filter((location) => location.qualityStatus === 'publish').forEach((location) => {
    if (!canonicalGroups.has(location.canonicalPath)) canonicalGroups.set(location.canonicalPath, []);
    canonicalGroups.get(location.canonicalPath).push(location);
  });
  for (const group of canonicalGroups.values()) {
    if (group.length < 2) continue;
    group.sort((a, b) => Number(b.coordinateAccuracy || 0) - Number(a.coordinateAccuracy || 0)
      || a.pinCode.localeCompare(b.pinCode));
    const canonical = group[0];
    canonical.pinCodes = [...new Set(group.map((location) => location.pinCode))].sort();
    canonical.postOfficeNames = [...new Set(group.flatMap((location) => location.postOfficeNames))].sort();
    canonical.pinCodes = [...new Set(group.map((location) => location.pinCode))].sort();
    canonical.mergedLocationEntityIds = group.map((location) => location.locationEntityId);
    group.slice(1).forEach((duplicate) => {
      duplicate.qualityStatus = 'exclude';
      duplicate.contentQualityStatus = 'EXCLUDE';
      duplicate.qualityTier = 'D';
      duplicate.indexable = false;
      duplicate.published = false;
      duplicate.contentReady = false;
      duplicate.canonicalPath = null;
      duplicate.excludedReason = `Duplicate canonical location; merged into ${canonical.locationEntityId}`;
    });
  }

  const qualityCounts = Object.fromEntries(['publish', 'review', 'exclude'].map((status) => [
    status,
    locations.filter((location) => location.qualityStatus === status).length,
  ]));
  const report = {
    sourceRecords: records.length,
    uniquePins: groups.size,
    duplicatePinGroups: [...groups.values()].filter((items) => items.length > 1).length,
    geoNamesPostalRecords: sourceRecords,
    geoNamesUniquePins: byPin.size,
    successfullyEnriched: locations.filter((location) => location.geoVerified).length,
    geoNamesSourceCoverage: locations.filter((location) => location.geoNamesRecordCount > 0).length,
    geoNamesNoMatch: locations.filter((location) => location.geoNamesRecordCount === 0).length,
    notConfidentlyEnriched: locations.filter((location) => !location.geoVerified).length,
    missingCity: locations.filter((location) => !location.city).length,
    missingDistrict: locations.filter((location) => !location.district).length,
    missingLocality: locations.filter((location) => !location.locality).length,
    missingState: locations.filter((location) => !location.state).length,
    missingRegion: locations.filter((location) => !location.region).length,
    stateConflicts: locations.filter((location) => location.conflicts?.stateConflict).length,
    pdfStateConflicts: locations.filter((location) => location.conflicts?.pdfStateConflict).length,
    geoNamesStateConflicts: locations.filter((location) => location.conflicts?.geoNamesStateConflict).length,
    pdfStateConflictGroups: locations.filter((location) => location.conflicts?.pdfStateConflict).length,
    conflictingPdfStatesOnPublishRecords: locations.filter((location) => (
      location.qualityStatus === 'publish' && location.conflicts?.pdfStateConflict
    )).length,
    localityGeoNamesFallbacks: locations.filter((location) => (
      location.fieldSources.locality.source === 'geonames-place-name'
    )).length,
    qualityCounts,
    contentQualityCounts: Object.fromEntries([
      'PUBLISH_INDEXABLE',
      'PUBLISH_NON_INDEXABLE',
      'REVIEW',
      'EXCLUDE',
    ].map((status) => [status, locations.filter((location) => location.contentQualityStatus === status).length])),
    lookupTimestamp: timestamp,
    source: SOURCE_URL,
    sourceCatalog: {
      ownerPdf: {
        name: 'India PIN Code List PDF supplied by the site owner',
        reference: 'data/locations/pin-records.json; sourcePage on each entity',
        fields: ['pinCode', 'postOfficeNames', 'state'],
      },
      geoNames: {
        name: 'GeoNames India Postal Code dataset',
        url: SOURCE_URL,
        licenseUrl: SOURCE_LICENSE_URL,
        license: 'Creative Commons Attribution 4.0',
        fields: ['placeName', 'adminName2 district', 'adminName3 taluk', 'latitude', 'longitude', 'accuracy'],
        limitations: 'Secondary source; provided as-is without accuracy, timeliness or completeness warranty; placeName is not a separate city field.',
      },
    },
    note: 'GeoNames is a secondary dataset; entries are not described as official India Post records. Coordinates are approximate and never rendered as an academy location.',
  };
  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(locations)}\n`);
  fs.writeFileSync(REPORT_FILE, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
