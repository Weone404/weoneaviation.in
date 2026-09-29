const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const JSZip = require('jszip');
const { deduplicate, extractPdfRows } = require('./extract-pin-data');

const root = path.join(__dirname, '..');
const locationDir = path.join(root, 'data', 'locations');
const pdfPath = process.argv[2];
const seed = 'weone-aviation-location-source-audit-2026-09';
const JSZipClass = JSZip.default || JSZip;

function normalize(value) {
  const aliases = {
    orissa: 'odisha',
    uttaranchal: 'uttarakhand',
    pondicherry: 'puducherry',
    tamilnadu: 'tamil nadu',
    'utter pradesh': 'uttar pradesh',
    chattisgarh: 'chhattisgarh',
    'andaman and nicobar': 'andaman and nicobar islands',
  };
  const normalized = String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
  return aliases[normalized] || normalized;
}

function titleCase(value) {
  return String(value || '').toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase());
}

function parseGeoNames(text) {
  const byPin = new Map();
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
    const [
      countryCode, rawPin, placeName, , ,
      district, , taluk, , , , ,
    ] = line.split('\t');
    const pin = String(rawPin || '').replace(/\D/g, '').padStart(6, '0');
    if (countryCode !== 'IN' || !/^\d{6}$/.test(pin) || !placeName) continue;
    const record = {
      pin,
      placeName: titleCase(placeName),
      district: titleCase(district),
      taluk: taluk && taluk !== 'NA' ? titleCase(taluk) : null,
      state: titleCase(line.split('\t')[3]),
      coordinateAccuracy: Number(line.split('\t')[11]) || null,
    };
    if (!byPin.has(pin)) byPin.set(pin, []);
    byPin.get(pin).push(record);
  }
  return byPin;
}

function chooseGeoRecord(records, offices) {
  const distinct = new Map();
  for (const record of records) {
    const key = normalize(record.placeName);
    if (!distinct.has(key) || record.coordinateAccuracy > distinct.get(key).coordinateAccuracy) {
      distinct.set(key, record);
    }
  }
  const candidates = [...distinct.values()];
  const exact = candidates.filter((candidate) =>
    offices.some((office) => normalize(office) === normalize(candidate.placeName)));
  if (exact.length === 1) return { record: exact[0], matchType: 'exact' };

  const contained = candidates.filter((candidate) => offices.some((office) => {
    const officeKey = normalize(office);
    const placeKey = normalize(candidate.placeName);
    return officeKey.length >= 5 && (placeKey.startsWith(officeKey) || officeKey.startsWith(placeKey));
  }));
  if (contained.length === 1) return { record: contained[0], matchType: 'name-prefix' };
  if (candidates.length === 1) return { record: candidates[0], matchType: 'single-place-for-pin' };
  return { record: null, matchType: 'ambiguous-place-names' };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  if (!pdfPath || !fs.existsSync(pdfPath)) {
    throw new Error('Pass the original supplied PDF path: node scripts/verify-location-sample.js <pdf-path>');
  }

  const enriched = JSON.parse(fs.readFileSync(path.join(locationDir, 'enriched-locations.json'), 'utf8'));
  const extractedPdfRows = deduplicate(await extractPdfRows(pdfPath));
  const pdfByPin = new Map();
  for (const row of extractedPdfRows) {
    const pin = String(row.pinCode).padStart(6, '0');
    if (!pdfByPin.has(pin)) pdfByPin.set(pin, []);
    pdfByPin.get(pin).push(row);
  }

  const archivePath = path.join(locationDir, 'source', 'geonames-IN.zip');
  const archive = await JSZipClass.loadAsync(fs.readFileSync(archivePath));
  const sourceFile = archive.file('IN.txt');
  assert(sourceFile, 'GeoNames source ZIP does not contain IN.txt.');
  const geoNamesByPin = parseGeoNames(await sourceFile.async('string'));
  const publishable = enriched.filter((location) => (
    location.qualityStatus === 'publish' && !location.stateConflict
  ));
  const sample = [...publishable]
    .sort((left, right) => hash(`${seed}:${left.pinCode}`).localeCompare(hash(`${seed}:${right.pinCode}`)))
    .slice(0, 20);
  assert(sample.length === 20, `Expected 20 publishable geographic records, received ${sample.length}.`);

  const verifyRecord = (location) => {
    const errors = [];
    const pdfRows = pdfByPin.get(location.pinCode) || [];
    const pdfOffices = [...new Set(pdfRows.map((row) => row.postOffice))].sort();
    const pdfStates = [...new Set(pdfRows.map((row) => normalize(row.state)).filter(Boolean))];
    const rawGeoNames = geoNamesByPin.get(location.pinCode) || [];
    const matchingGeoNames = rawGeoNames.filter((record) => pdfStates.includes(normalize(record.state)));
    const expectedGeoNameSet = new Set(matchingGeoNames.map((record) => normalize(record.placeName)));
    const actualGeoNameSet = new Set((location.geoNamesPlaceNames || []).map(normalize));
    const selected = chooseGeoRecord(matchingGeoNames, pdfOffices);

    if (!pdfRows.length) errors.push('PIN missing from fresh PDF extraction');
    if (pdfStates.length !== 1) errors.push(`PDF states are not singular: ${pdfStates.join(', ')}`);
    if (location.stateConflict) errors.push('publishable sample contains a state conflict');
    if (normalize(location.state) !== pdfStates[0]) errors.push('state differs from the original PDF');
    if (!sameSet(pdfOffices.map(normalize), (location.postOfficeNames || []).map(normalize))) {
      errors.push('post-office names differ from the original PDF');
    }
    if (!sameSet([...expectedGeoNameSet], [...actualGeoNameSet])) {
      errors.push('GeoNames place-name rows differ from the source ZIP');
    }
    if (!selected.record) errors.push(`GeoNames selection is ambiguous (${selected.matchType})`);
    if (selected.record && normalize(location.district) !== normalize(selected.record.district)) {
      errors.push('district differs from selected GeoNames adminName2');
    }
    if (selected.record && normalize(location.taluk) !== normalize(selected.record.taluk)) {
      errors.push('admin-level-3 name differs from selected GeoNames adminName3');
    }
    const expectedLocalitySource = selected.matchType === 'single-place-for-pin'
      ? 'geonames-place-name'
      : 'supplied-pdf+geonames-crosscheck';
    if (location.fieldSources?.locality?.source !== expectedLocalitySource) {
      errors.push('locality provenance does not match the enrichment method');
    }
    if (expectedLocalitySource === 'geonames-place-name') {
      if (normalize(location.locality) !== normalize(selected.record?.placeName)) {
        errors.push('GeoNames-derived locality differs from the source place name');
      }
    } else if (!pdfOffices.some((office) => {
      const officeName = normalize(office);
      const placeName = normalize(selected.record?.placeName);
      return officeName === placeName || officeName.startsWith(placeName) || placeName.startsWith(officeName);
    })) {
      errors.push('PDF cross-check does not support the selected locality');
    }
    if (location.city !== null || location.fieldSources?.city?.source !== null) {
      errors.push('city is present despite no separate city source');
    }
    if (location.fieldSources?.pinCode?.source !== 'supplied-pdf'
      || location.fieldSources?.pinCode?.confidence !== 'high'
      || location.fieldSources?.postOfficeNames?.source !== 'supplied-pdf'
      || location.fieldSources?.postOfficeNames?.confidence !== 'high'
      || location.fieldSources?.state?.source !== 'supplied-pdf+geonames-crosscheck'
      || location.fieldSources?.state?.confidence !== 'high') {
      errors.push('PDF-field provenance or confidence is incorrect');
    }
    if (location.sourceConfidence !== 'medium'
      || location.fieldSources?.locality?.confidence !== 'medium') {
      errors.push('overall or locality confidence is incorrect');
    }
    if (location.fieldSources?.district?.source !== 'geonames-admin2'
      || location.fieldSources?.district?.confidence !== 'medium') {
      errors.push('district provenance or confidence is incorrect');
    }
    if (location.taluk && (
      location.fieldSources?.taluk?.source !== 'geonames-admin3'
      || location.fieldSources?.taluk?.confidence !== 'medium'
    )) {
      errors.push('admin-level-3 provenance or confidence is incorrect');
    }
    if (!location.taluk && location.fieldSources?.taluk?.source !== null) {
      errors.push('absent admin-level-3 value has non-null provenance');
    }
    if (pdfRows.some((row) => !location.sourcePages?.includes(row.sourcePage))) {
      errors.push('original PDF source-page reference is missing');
    }

    const localitySource = expectedLocalitySource === 'geonames-place-name'
      ? 'GeoNames place-name'
      : 'PDF post-office + GeoNames place-name cross-check';
    const source = `PIN/post office: supplied PDF; locality: ${localitySource}; district: GeoNames adminName2; state: PDF + GeoNames cross-check${location.taluk ? '; taluk: GeoNames adminName3' : ''}`;
    const confidence = `overall ${location.sourceConfidence}; PIN high; post office high; locality ${location.fieldSources?.locality?.confidence}; district medium; state high${location.taluk ? '; taluk medium' : ''}`;
    return {
      pin: location.pinCode,
      postOffice: pdfOffices.join('; '),
      locality: location.locality,
      city: location.city,
      district: location.district,
      state: location.state,
      taluk: location.taluk,
      source,
      sourceConfidence: confidence,
      sourcePages: [...new Set(pdfRows.map((row) => row.sourcePage))].sort((a, b) => a - b),
      passed: errors.length === 0,
      errors,
    };
  };
  const records = sample.map(verifyRecord);
  const failures = records.filter((record) => !record.passed);
  const report = {
    originalPdf: 'Site-owner supplied original PDF (parsed directly during this run)',
    pdfVerification: 'freshly parsed original PDF; source page numbers retained',
    geoNamesSource: 'data/locations/source/geonames-IN.zip, IN.txt',
    sampleSeed: seed,
    sampleSize: records.length,
    passed: records.length - failures.length,
    failed: failures.length,
    publishableRecordsAvailable: publishable.length,
    records,
  };
  fs.writeFileSync(
    path.join(locationDir, 'location-source-verification-sample.json'),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
}

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function sameSet(left, right) {
  return left.length === right.length && new Set(left).size === new Set(right).size
    && left.every((value) => new Set(right).has(value));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
