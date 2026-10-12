const fs = require('node:fs');
const { once } = require('node:events');
const path = require('node:path');
const zlib = require('node:zlib');
const JSZip = require('jszip');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'data', 'locations', 'source');
const provisionedSourceDir = path.join(sourceDir, 'provisioned');
const outputPath = path.join(
  rootDir,
  'data',
  'location-seo',
  'geography',
  'india-geography.json.gz',
);
const REVIEWED_AT = '2026-10-05';
const GEONAMES_URL = 'https://download.geonames.org/export/dump/';
const POSTAL_URL = 'https://download.geonames.org/export/zip/IN.zip';
const OSM_SOURCE = {
  href: 'https://nominatim.openstreetmap.org/',
  publisher: 'OpenStreetMap contributors via Nominatim',
  title: 'Delhi/NCR locality reference records',
  scope: 'Community-mapped place identity and representative coordinates; not an authoritative boundary, business service-area or aviation source.',
  reviewedAt: '2026-09-29',
  license: 'Open Database License 1.0',
};

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function slugify(value) {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function uniqueNames(values, canonicalName = '') {
  const names = new Map();
  for (const rawValue of values) {
    const value = String(rawValue || '').trim();
    const key = normalize(value);
    if (key && key !== normalize(canonicalName) && !names.has(key)) {
      names.set(key, value);
    }
  }
  return [...names.values()];
}

function parseTabRows(text, countryPrefix = 'IN.') {
  return text.split(/\r?\n/)
    .filter((line) => line.startsWith(countryPrefix))
    .map((line) => line.split('\t'));
}

function makeRecord({
  id,
  slug,
  name,
  type,
  parentId = null,
  adminCode,
  aliases = [],
  sourceDate = null,
  latitude = null,
  longitude = null,
  timezone = null,
  sourceAccuracy = null,
  sourceLinks,
}) {
  return {
    id,
    slug,
    name,
    canonicalName: name,
    aliases: uniqueNames(aliases, name).slice(0, 12),
    type,
    parentId,
    parentIds: [],
    country: 'India',
    countryCode: 'IN',
    postalCodes: [],
    latitude,
    longitude,
    timezone,
    source: 'GeoNames',
    sourceUrl: sourceLinks[0].href,
    sourceDate,
    sourceAttribution: 'GeoNames geographic database; Creative Commons Attribution 4.0.',
    sourceLinks,
    confidence: 'medium',
    allowAmbiguousAliases: true,
    ...(sourceAccuracy === null ? {} : { sourceAccuracy }),
    status: 'sourced',
    ...(adminCode ? { adminCode } : {}),
    relationship: 'research-only',
    resolutionStatus: 'RESOLVABLE',
    renderable: false,
    indexable: false,
    sitemapEligible: false,
  };
}

function buildAdministrativeRecords(admin1Text, admin2Text, gazetteerText, sourceLinks) {
  const countryId = 'geo:geonames:IN:country';
  const country = makeRecord({
    id: countryId,
    slug: 'india',
    name: 'India',
    type: 'country',
    aliases: ['Republic of India'],
    sourceLinks,
  });
  const states = new Map();
  const districts = new Map();
  const administrativeRecords = [];

  for (const [code, name, asciiName, geonameId] of parseTabRows(admin1Text)) {
    const adminCode = code.slice(3);
    if (!adminCode || !name || !geonameId) continue;
    const record = makeRecord({
      id: `geo:geonames:IN:admin1:${adminCode}`,
      slug: `india-${slugify(asciiName || name)}-${adminCode}`,
      name,
      type: 'state',
      parentId: countryId,
      adminCode,
      aliases: [asciiName],
      sourceLinks,
    });
    record.geonameId = geonameId;
    states.set(adminCode, record);
    administrativeRecords.push(record);
  }

  for (const [code, name, asciiName, geonameId] of parseTabRows(admin2Text)) {
    const [, stateCode, districtCode] = code.split('.');
    const state = states.get(stateCode);
    if (!state || !districtCode || !name || !geonameId) continue;
    const adminCode = `${stateCode}.${districtCode}`;
    const record = makeRecord({
      id: `geo:geonames:IN:admin2:${adminCode}`,
      slug: `india-${slugify(asciiName || name)}-${adminCode.replace(/\./g, '-')}`,
      name,
      type: 'district',
      parentId: state.id,
      adminCode,
      aliases: [asciiName],
      sourceLinks,
    });
    record.geonameId = geonameId;
    districts.set(adminCode, record);
    administrativeRecords.push(record);
  }

  let skippedSubdistricts = 0;
  const seenSubdistrictCodes = new Set();
  for (const line of gazetteerText.split(/\r?\n/)) {
    if (!line) continue;
    const columns = line.split('\t');
    if (columns[6] !== 'A' || columns[7] !== 'ADM3' || columns[8] !== 'IN') continue;
    const [, name, asciiName, alternateNames, latitudeValue, longitudeValue, , , , ,
      stateCode, districtCode, subdistrictCode, , , , , timezone, sourceDate] = columns;
    const adminCode = `${stateCode}.${districtCode}.${subdistrictCode}`;
    const district = districts.get(`${stateCode}.${districtCode}`);
    if (!district || !subdistrictCode || seenSubdistrictCodes.has(adminCode)) {
      skippedSubdistricts += 1;
      continue;
    }
    const latitude = Number(latitudeValue);
    const longitude = Number(longitudeValue);
    const coordinatesValid = Number.isFinite(latitude) && latitude >= -90 && latitude <= 90
      && Number.isFinite(longitude) && longitude >= -180 && longitude <= 180;
    const record = makeRecord({
      id: `geo:geonames:IN:admin3:${adminCode}`,
      slug: `india-${slugify(asciiName || name)}-${adminCode.replace(/\./g, '-')}`,
      name,
      type: 'subdistrict',
      parentId: district.id,
      adminCode,
      aliases: [asciiName, ...String(alternateNames || '').split(',')],
      sourceDate: /^\d{4}-\d{2}-\d{2}$/.test(sourceDate) ? sourceDate : null,
      latitude: coordinatesValid ? latitude : null,
      longitude: coordinatesValid ? longitude : null,
      timezone: timezone || null,
      sourceLinks,
    });
    record.geonameId = columns[0];
    seenSubdistrictCodes.add(adminCode);
    administrativeRecords.push(record);
  }

  return {
    country,
    administrativeRecords,
    states,
    districts,
    skippedSubdistricts,
  };
}

function buildPostalRecords(postalText, sourceAdapter, postalSourceLinks, administrative) {
  const postalDataset = sourceAdapter.parseGeoNamesPostalTsv(postalText);
  const legacyRecords = new Map(postalDataset.records.map((record) => [record.id, record]));
  const replacements = new Map();

  for (const record of postalDataset.records) {
    if (record.type === 'state') {
      const code = record.id.slice('geo:source:IN:state:'.length);
      const replacement = administrative.states.get(code)
        || [...administrative.states.values()].find((state) => (
          normalize(state.name) === normalize(record.name)
          || state.aliases.some((alias) => normalize(alias) === normalize(record.name))
        ));
      if (replacement) replacements.set(record.id, replacement.id);
    }
    if (record.type === 'district') {
      const [, , , , stateCode, districtCode] = record.id.split(':');
      const replacement = administrative.districts.get(`${stateCode}.${districtCode}`)
        || [...administrative.districts.values()].find((district) => (
          normalize(district.name) === normalize(record.name)
          && district.parentId === replacements.get(record.parentId)
        ));
      if (replacement) replacements.set(record.id, replacement.id);
    }
  }

  const postalAreas = [];
  let missingAdministrativeParent = 0;
  for (const record of postalDataset.records.filter(({ type }) => type === 'postal-area')) {
    const oldParent = legacyRecords.get(record.parentId);
    const oldParentReference = oldParent?.parentId || oldParent?.id;
    const parentId = replacements.get(record.parentId)
      || replacements.get(oldParentReference)
      || administrative.country.id;
    if (parentId === administrative.country.id) missingAdministrativeParent += 1;
    const pin = record.postalCode;
    postalAreas.push({
      ...record,
      id: `geo:geonames:IN:postal:${pin}`,
      slug: `india-postal-${slugify(pin)}`,
      parentId,
      parentIds: [],
      source: 'GeoNames',
      sourceUrl: POSTAL_URL,
      sourceDate: null,
      sourceAttribution: 'GeoNames India postal-code export; Creative Commons Attribution 4.0.',
      sourceLinks: postalSourceLinks,
      confidence: 'medium',
      coordinateConfidence: record.coordinateConfidence,
      allowAmbiguousAliases: true,
      relationship: 'research-only',
      resolutionStatus: 'RESOLVABLE',
      renderable: false,
      indexable: false,
      sitemapEligible: false,
    });
  }

  return {
    postalAreas,
    acceptedPostalCodes: postalDataset.acceptedPostalCodes,
    ambiguousPostalCodes: postalDataset.ambiguousPostalCodes,
    missingAdministrativeParent,
    rejectedRows: postalDataset.rejectedRows,
  };
}

function addOsmCandidates(records, candidateData) {
  const byId = new Map(records.map((record) => [record.id, record]));
  const states = records.filter(({ type }) => type === 'state');
  const districts = records.filter(({ type }) => type === 'district');
  const newRecords = [];
  let skippedOrphans = 0;
  let merged = 0;

  for (const candidate of candidateData.candidates) {
    const state = states.find((record) => (
      normalize(record.name) === normalize(candidate.state)
      || record.aliases.some((alias) => normalize(alias) === normalize(candidate.state))
    ));
    if (!state) {
      skippedOrphans += 1;
      continue;
    }
    const district = candidate.district
      ? districts.find((record) => (
        record.parentId === state.id
        && (normalize(record.name) === normalize(candidate.district)
          || record.aliases.some((alias) => normalize(alias) === normalize(candidate.district)))
      ))
      : null;
    const parentId = district?.id || state.id;
    const expectedType = {
      city: 'city',
      town: 'town',
      village: 'village',
      locality: 'locality',
      suburb: 'neighborhood',
      neighbourhood: 'neighborhood',
      neighborhood: 'neighborhood',
    }[normalize(candidate.localityType)] || 'locality';
    const existing = records.filter((record) => (
      normalize(record.name) === normalize(candidate.name)
      && record.parentIds?.includes(state.id)
      && (!district || record.parentIds.includes(district.id))
    ));
    const target = existing.length === 1 ? existing[0] : null;
    const osmSource = {
      ...OSM_SOURCE,
      href: candidate.searchUrl,
      title: `OSM Nominatim place ${candidate.osmType}/${candidate.osmId}`,
      scope: `OSM result labeled "${candidate.osmLabel}" as ${candidate.localityType}; returned coordinates are representative points, not verified administrative boundaries.`,
      reviewedAt: candidate.sourceDate || candidateData.source.retrievedAt,
    };

    if (target) {
      target.sourceLinks = [...target.sourceLinks, osmSource]
        .filter((source, index, sources) => (
          sources.findIndex(({ href }) => href === source.href) === index
        ));
      target.aliases = uniqueNames(
        [...target.aliases, candidate.name, ...(candidate.aliases || [])],
        target.name,
      );
      target.osmReferences = [...(target.osmReferences || []), {
        osmType: candidate.osmType,
        osmId: candidate.osmId,
        label: candidate.osmLabel,
        sourceUrl: candidate.searchUrl,
      }];
      merged += 1;
      continue;
    }

    const id = `geo:osm:${candidate.osmType}:${candidate.osmId}`;
    if (byId.has(id)) continue;
    const record = {
      id,
      slug: `india-${slugify(candidate.name)}-${candidate.osmId}`,
      name: candidate.name,
      canonicalName: candidate.name,
      aliases: uniqueNames(candidate.aliases || [], candidate.name),
      type: expectedType,
      parentId,
      parentIds: [],
      country: 'India',
      countryCode: 'IN',
      state: candidate.state,
      district: candidate.district || null,
      postalCodes: [],
      latitude: candidate.latitude,
      longitude: candidate.longitude,
      source: OSM_SOURCE.publisher,
      sourceUrl: candidate.searchUrl,
      sourceDate: candidateData.source.retrievedAt,
      sourceAttribution: 'OpenStreetMap contributors; Open Database License 1.0.',
      sourceLinks: [osmSource],
      confidence: candidate.geographicConfidence || 'low',
      allowAmbiguousAliases: true,
      status: 'sourced',
      osmType: candidate.osmType,
      osmId: candidate.osmId,
      osmLabel: candidate.osmLabel,
      relationship: 'research-only',
      resolutionStatus: 'RESOLVABLE',
      renderable: false,
      indexable: false,
      sitemapEligible: false,
    };
    byId.set(id, record);
    newRecords.push(record);
  }

  return { records: newRecords, skippedOrphans, merged };
}

function setHierarchyAndPlaceNames(records) {
  const byId = new Map(records.map((record) => [record.id, record]));
  for (const record of records) {
    const parentIds = [];
    let parent = record.parentId ? byId.get(record.parentId) : null;
    const visited = new Set();
    while (parent) {
      if (visited.has(parent.id)) throw new Error(`Parent cycle found at ${parent.id}.`);
      visited.add(parent.id);
      parentIds.unshift(parent.id);
      parent = parent.parentId ? byId.get(parent.parentId) : null;
    }
    record.parentIds = parentIds;
    const ancestors = parentIds.map((id) => byId.get(id)).filter(Boolean);
    record.state = ancestors.find(({ type }) => type === 'state')?.name || null;
    record.district = ancestors.find(({ type }) => type === 'district')?.name || null;
    record.relationship = 'research-only';
    record.resolutionStatus = 'RESOLVABLE';
    record.renderable = false;
    record.indexable = false;
    record.sitemapEligible = false;
  }
}

function removeAliasesConflictingWithReferences(records) {
  const references = new Map();
  for (const record of records) {
    references.set(normalize(record.id), record.id);
    references.set(normalize(record.slug), record.id);
  }
  let removed = 0;
  for (const record of records) {
    record.aliases = record.aliases.filter((alias) => {
      const owner = references.get(normalize(alias));
      if (owner && owner !== record.id) {
        removed += 1;
        return false;
      }
      return true;
    });
  }
  return removed;
}

function distanceInMeters(left, right) {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDelta = radians(right.latitude - left.latitude);
  const longitudeDelta = radians(right.longitude - left.longitude);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(radians(left.latitude))
      * Math.cos(radians(right.latitude))
      * Math.sin(longitudeDelta / 2) ** 2;
  return 6_371_000 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function mergeNearbyOsmDuplicates(records) {
  const baseRecordsByKey = new Map();
  const removedIds = new Set();
  let merged = 0;
  for (const record of records) {
    if (!record.id.startsWith('geo:osm:')) {
      const key = [
        normalize(record.name),
        normalize(record.state),
        normalize(record.type),
      ].join('|');
      const candidates = baseRecordsByKey.get(key) || [];
      candidates.push(record);
      baseRecordsByKey.set(key, candidates);
      continue;
    }

    if (!Number.isFinite(record.latitude) || !Number.isFinite(record.longitude)) continue;
    const key = [
      normalize(record.name),
      normalize(record.state),
      normalize(record.type),
    ].join('|');
    const candidates = (baseRecordsByKey.get(key) || []).filter((candidate) => (
      Number.isFinite(candidate.latitude)
      && Number.isFinite(candidate.longitude)
      && distanceInMeters(record, candidate) <= 5000
    ));
    if (candidates.length !== 1) continue;
    const target = candidates[0];
    target.sourceLinks = [...target.sourceLinks, ...record.sourceLinks]
      .filter((source, index, sources) => (
        sources.findIndex(({ href }) => href === source.href) === index
      ));
    target.aliases = uniqueNames(
      [...target.aliases, ...record.aliases],
      target.name,
    );
    target.osmReferences = [...(target.osmReferences || []), {
      osmType: record.osmType,
      osmId: record.osmId,
      label: record.osmLabel,
      sourceUrl: record.sourceUrl,
    }];
    removedIds.add(record.id);
    merged += 1;
  }
  return {
    records: records.filter((record) => !removedIds.has(record.id)),
    merged,
  };
}

async function main() {
  const gazetteerZipPath = path.join(provisionedSourceDir, 'geonames-india-gazetteer.zip');
  const postalZipPath = path.join(sourceDir, 'geonames-IN.zip');
  const admin1Path = path.join(provisionedSourceDir, 'geonames-admin1-codes.txt');
  const admin2Path = path.join(provisionedSourceDir, 'geonames-admin2-codes.txt');
  const localityPath = path.join(rootDir, 'data', 'local-seo', 'locality-geography-source.json');
  const localityOverlayPath = path.join(
    rootDir,
    'data',
    'location-seo',
    'geography',
    'india-locality-overlay.json',
  );

  for (const requiredPath of [
    gazetteerZipPath,
    postalZipPath,
    admin1Path,
    admin2Path,
    localityPath,
    localityOverlayPath,
  ]) {
    if (!fs.existsSync(requiredPath)) {
      const provisionHint = [gazetteerZipPath, admin1Path, admin2Path].includes(requiredPath)
        ? ' Run "npm run provision:india-geography-sources" first.'
        : '';
      throw new Error(`Required geographic source is missing: ${requiredPath}.${provisionHint}`);
    }
  }

  const sourceLinks = [{
    href: GEONAMES_URL,
    publisher: 'GeoNames',
    title: 'GeoNames India gazetteer and administrative codes',
    scope: 'Secondary place names, feature types, administrative codes, approximate coordinates and timezone data; not evidence of aviation services or business presence.',
    reviewedAt: REVIEWED_AT,
    license: 'Creative Commons Attribution 4.0',
  }];
  const postalSourceLinks = [{
    href: POSTAL_URL,
    publisher: 'GeoNames',
    title: 'GeoNames India postal-code export',
    scope: 'Secondary postal-place associations, administrative names and approximate coordinates; not India Post boundary or academy address verification.',
    reviewedAt: REVIEWED_AT,
    license: 'Creative Commons Attribution 4.0',
  }];
  const gazetteerZip = await JSZip.loadAsync(fs.readFileSync(gazetteerZipPath));
  const postalZip = await JSZip.loadAsync(fs.readFileSync(postalZipPath));
  const gazetteerFile = gazetteerZip.file('IN.txt');
  const postalFile = postalZip.file('IN.txt');
  if (!gazetteerFile || !postalFile) throw new Error('A GeoNames archive is missing its IN.txt file.');
  const [gazetteerText, postalText] = await Promise.all([
    gazetteerFile.async('string'),
    postalFile.async('string'),
  ]);

  const administrative = buildAdministrativeRecords(
    fs.readFileSync(admin1Path, 'utf8'),
    fs.readFileSync(admin2Path, 'utf8'),
    gazetteerText,
    sourceLinks,
  );
  const country = {
    ...administrative.country,
    source: 'GeoNames',
    sourceUrl: GEONAMES_URL,
    sourceLinks,
    status: 'sourced',
  };
  const allGazetteerLines = gazetteerText.split(/\r?\n/).filter(Boolean);
  const populationRowsWithoutState = allGazetteerLines.filter((line) => {
    const columns = line.split('\t');
    return columns[6] === 'P' && columns[8] === 'IN' && !columns[10];
  }).length;
  const populationLines = allGazetteerLines
    .filter((line) => {
      const columns = line.split('\t');
      return columns[6] === 'P' && columns[8] === 'IN' && Boolean(columns[10]);
    });
  const sourceAdapter = await import('../lib/geographicSourceAdapters.js');
  const geographicData = await import('../lib/geographicData.js');
  const gazetteer = sourceAdapter.parseGeoNamesAllCountriesTsv(populationLines.join('\n'), {
    countries: { IN: country },
    administrativeRecords: administrative.administrativeRecords,
    limit: 700000,
    maxAliasesPerRecord: 8,
  });

  for (const record of gazetteer.records) {
    record.relationship = 'research-only';
    record.resolutionStatus = 'RESOLVABLE';
    record.renderable = false;
    record.indexable = false;
    record.sitemapEligible = false;
    record.allowAmbiguousAliases = true;
  }

  const postal = buildPostalRecords(
    postalText,
    sourceAdapter,
    postalSourceLinks,
    administrative,
  );
  const candidateData = JSON.parse(fs.readFileSync(localityPath, 'utf8'));
  const localityOverlayData = JSON.parse(fs.readFileSync(localityOverlayPath, 'utf8'));
  const overlay = addOsmCandidates(gazetteer.records, candidateData);
  const explicitOverlay = addOsmCandidates(
    [...gazetteer.records, ...overlay.records],
    localityOverlayData,
  );
  const records = [
    ...gazetteer.records,
    ...postal.postalAreas,
    ...overlay.records,
    ...explicitOverlay.records,
  ];
  setHierarchyAndPlaceNames(records);
  const proximityMerge = mergeNearbyOsmDuplicates(records);
  const finalRecords = proximityMerge.records;
  const aliasesConflictingWithReferences = removeAliasesConflictingWithReferences(finalRecords);
  const validationErrors = geographicData.validateGeographicData(finalRecords);
  if (validationErrors.length) {
    throw new Error(`Generated India geography is invalid:\n${validationErrors.slice(0, 30).join('\n')}`);
  }

  const countsByType = finalRecords.reduce((counts, record) => {
    counts[record.type] = (counts[record.type] || 0) + 1;
    return counts;
  }, {});
  const dataset = {
    datasetKind: 'sourced-india-geographic-reference',
    generatedAt: new Date().toISOString(),
    reviewedAt: REVIEWED_AT,
    recordCount: finalRecords.length,
    countsByType,
    validationErrors: validationErrors.length,
    resolutionOnly: true,
    sourceFiles: [
      'data/locations/source/provisioned/geonames-india-gazetteer.zip',
      'data/locations/source/geonames-IN.zip',
      'data/locations/source/provisioned/geonames-admin1-codes.txt',
      'data/locations/source/provisioned/geonames-admin2-codes.txt',
      'data/local-seo/locality-geography-source.json',
      'data/location-seo/geography/india-locality-overlay.json',
    ],
    sourceLinks: [...sourceLinks, ...postalSourceLinks, OSM_SOURCE],
    coverage: {
      gazetteerAcceptedRecords: gazetteer.acceptedRecords,
      gazetteerRejectedRows: gazetteer.rejectedRows,
      populatedPlaceRowsWithoutState: populationRowsWithoutState,
      administrativeRecords: administrative.administrativeRecords.length,
      skippedSubdistricts: administrative.skippedSubdistricts,
      unambiguousPostalAreas: postal.acceptedPostalCodes,
      ambiguousPostalCodes: postal.ambiguousPostalCodes,
      postalRowsRejected: postal.rejectedRows,
      postalAreasMissingAdministrativeParent: postal.missingAdministrativeParent,
      osmLocalitiesAdded: overlay.records.length + explicitOverlay.records.length,
      osmRecordsMerged: overlay.merged + explicitOverlay.merged,
      osmRecordsSkippedOrphaned: overlay.skippedOrphans + explicitOverlay.skippedOrphans,
      osmRecordsMergedByCoordinateProximity: proximityMerge.merged,
      aliasesConflictingWithReferences,
    },
  };
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await writeCompressedDataset(outputPath, dataset, finalRecords);
  console.log(JSON.stringify({
    output: path.relative(rootDir, outputPath),
    compressedBytes: fs.statSync(outputPath).size,
    recordCount: finalRecords.length,
    countsByType,
    coverage: dataset.coverage,
    validationErrors: validationErrors.length,
  }, null, 2));
}

async function writeCompressedDataset(filePath, metadata, records) {
  const gzip = zlib.createGzip({ level: 9 });
  const output = fs.createWriteStream(filePath);
  const completed = new Promise((resolve, reject) => {
    output.once('finish', resolve);
    output.once('error', reject);
    gzip.once('error', reject);
  });
  gzip.pipe(output);
  const write = async (value) => {
    if (!gzip.write(value)) await once(gzip, 'drain');
  };

  await write(`${JSON.stringify(metadata)}\n`);
  for (let index = 0; index < records.length; index += 1) {
    await write(`${JSON.stringify(records[index])}\n`);
  }
  gzip.end();
  await completed;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
