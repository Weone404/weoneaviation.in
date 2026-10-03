const GEONAMES_POSTAL_SOURCE = Object.freeze({
  href: 'https://download.geonames.org/export/zip/IN.zip',
  publisher: 'GeoNames',
  title: 'GeoNames India postal-code export',
  scope: 'Secondary postal-place associations, administrative names and approximate coordinates.',
  reviewedAt: '2026-10-03',
  license: 'Creative Commons Attribution 4.0',
});
const GEONAMES_POSTAL_SOURCE_LINKS = Object.freeze([GEONAMES_POSTAL_SOURCE]);
const GEONAMES_GAZETTEER_SOURCE = Object.freeze({
  href: 'https://download.geonames.org/export/dump/',
  publisher: 'GeoNames',
  title: 'GeoNames allCountries gazetteer',
  scope: 'Secondary gazetteer names, feature classes, administrative codes, coordinates and IANA timezone identifiers.',
  reviewedAt: '2026-10-03',
  license: 'Creative Commons Attribution 4.0',
});

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

function sourceFields(country, countryCode) {
  return {
    country,
    countryCode,
    source: 'GeoNames',
    sourceUrl: GEONAMES_POSTAL_SOURCE.href,
    sourceDate: null,
    sourceAttribution: 'GeoNames postal-code export; Creative Commons Attribution 4.0.',
    sourceLinks: GEONAMES_POSTAL_SOURCE_LINKS,
    status: 'sourced',
  };
}

function validCoordinate(latitude, longitude) {
  return Number.isFinite(latitude)
    && latitude >= -90
    && latitude <= 90
    && Number.isFinite(longitude)
    && longitude >= -180
    && longitude <= 180;
}

function addUnique(map, key, value) {
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(value);
}

function createParentIds(records) {
  const byId = new Map(records.map((record) => [record.id, record]));
  for (const record of records) {
    const parentIds = [];
    let parent = record.parentId ? byId.get(record.parentId) : null;
    while (parent) {
      parentIds.unshift(parent.id);
      parent = parent.parentId ? byId.get(parent.parentId) : null;
    }
    record.parentIds = parentIds;
  }
}

const GEONAMES_FEATURE_TYPES = Object.freeze({
  'A.ADM1': 'region',
  'A.ADM2': 'district',
  'A.ADM3': 'subdistrict',
  'P.PPLC': 'city',
  'P.PPLA': 'city',
  'P.PPLA2': 'city',
  'P.PPLA3': 'city',
  'P.PPLA4': 'city',
  'P.PPL': 'city',
  'P.PPLX': 'locality',
  'P.PPLS': 'town',
});

export function parseGeoNamesAllCountriesTsv(
  text,
  {
    countries,
    administrativeRecords = [],
    limit = 100000,
  } = {},
) {
  if (typeof text !== 'string') throw new TypeError('GeoNames gazetteer input must be text.');
  if (!countries || typeof countries !== 'object' || Array.isArray(countries)) {
    throw new TypeError('A country-code map is required for GeoNames gazetteer ingestion.');
  }
  if (!Array.isArray(administrativeRecords)) {
    throw new TypeError('Administrative geography records must be an array.');
  }
  if (!Number.isInteger(limit) || limit < 1) {
    throw new TypeError('The gazetteer record limit must be a positive integer.');
  }

  const countryByCode = new Map();
  for (const [code, country] of Object.entries(countries)) {
    if (!/^[A-Z]{2}$/.test(code) || !country?.id || !country?.name) {
      throw new TypeError(`Invalid country configuration for "${code}".`);
    }
    countryByCode.set(code, country);
  }
  const parentByAdminCode = new Map();
  for (const record of administrativeRecords) {
    if (!record?.id || !record?.adminCode || !record?.countryCode) {
      throw new TypeError('Administrative records need id, adminCode, and countryCode.');
    }
    const key = `${record.countryCode}.${record.adminCode}`;
    if (parentByAdminCode.has(key)) {
      throw new Error(`Duplicate administrative code mapping "${key}".`);
    }
    parentByAdminCode.set(key, record.id);
  }

  const records = [];
  const seenIds = new Set();
  const rejectedRows = {
    malformed: 0,
    unsupportedFeature: 0,
    countryNotConfigured: 0,
    unknownAdministrativeParent: 0,
    invalidCoordinate: 0,
  };
  const seenCountryCodes = new Set();

  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
    const columns = line.split('\t');
    if (columns.length < 19) {
      rejectedRows.malformed += 1;
      continue;
    }
    const [
      geonameId,
      nameValue,
      asciiName,
      ,
      latitudeValue,
      longitudeValue,
      featureClass,
      featureCode,
      countryCode,
      ,
      admin1Code,
      admin2Code,
      admin3Code,
      ,
      ,
      ,
      ,
      timezone,
    ] = columns;
    const type = GEONAMES_FEATURE_TYPES[`${featureClass}.${featureCode}`];
    if (!type) {
      rejectedRows.unsupportedFeature += 1;
      continue;
    }
    const country = countryByCode.get(countryCode);
    if (!country) {
      rejectedRows.countryNotConfigured += 1;
      continue;
    }
    const adminCodes = [admin1Code, admin2Code, admin3Code]
      .filter(Boolean)
      .map((code) => `${countryCode}.${code}`);
    let parentId = country.id;
    let parentMissing = false;
    for (const code of adminCodes) {
      const resolvedParent = parentByAdminCode.get(code);
      if (!resolvedParent) {
        parentMissing = true;
        break;
      }
      parentId = resolvedParent;
    }
    if (parentMissing) {
      rejectedRows.unknownAdministrativeParent += 1;
      continue;
    }
    const latitude = Number(latitudeValue);
    const longitude = Number(longitudeValue);
    if (!validCoordinate(latitude, longitude)) {
      rejectedRows.invalidCoordinate += 1;
      continue;
    }
    const id = `geo:geonames:${countryCode}:${geonameId}`;
    if (seenIds.has(id)) {
      rejectedRows.malformed += 1;
      continue;
    }
    const canonicalName = String(nameValue || asciiName || '').trim();
    if (!canonicalName) {
      rejectedRows.malformed += 1;
      continue;
    }
    seenIds.add(id);
    seenCountryCodes.add(countryCode);
    records.push({
      id,
      slug: `geonames-${countryCode.toLowerCase()}-${slugify(canonicalName)}-${geonameId}`,
      name: canonicalName,
      canonicalName,
      aliases: asciiName && normalize(asciiName) !== normalize(canonicalName) ? [asciiName] : [],
      country: country.name,
      countryCode,
      type,
      parentId,
      parentIds: [],
      relatedLocationIds: [],
      postalCodes: [],
      latitude,
      longitude,
      timezone: timezone || null,
      source: 'GeoNames',
      sourceUrl: GEONAMES_GAZETTEER_SOURCE.href,
      sourceDate: null,
      sourceAttribution: 'GeoNames allCountries gazetteer; Creative Commons Attribution 4.0.',
      sourceLinks: [GEONAMES_GAZETTEER_SOURCE],
      status: 'sourced',
    });
    if (records.length >= limit) break;
  }

  const recordsById = new Map(administrativeRecords.map((record) => [record.id, record]));
  for (const [code, country] of countryByCode) {
    if (seenCountryCodes.has(code) && !recordsById.has(country.id)) {
      recordsById.set(country.id, {
        ...country,
        country: country.name,
        countryCode: code,
        type: 'country',
        parentId: null,
        parentIds: [],
        aliases: country.aliases || [],
        postalCodes: [],
        source: country.source || 'GeoNames',
        sourceUrl: country.sourceUrl || GEONAMES_GAZETTEER_SOURCE.href,
        sourceDate: country.sourceDate ?? null,
        sourceAttribution: country.sourceAttribution
          || 'GeoNames allCountries gazetteer; Creative Commons Attribution 4.0.',
        sourceLinks: country.sourceLinks || [GEONAMES_GAZETTEER_SOURCE],
        status: country.status || 'sourced',
      });
    }
  }
  const allRecords = [...recordsById.values(), ...records];
  createParentIds(allRecords);
  return {
    records: allRecords,
    acceptedRecords: records.length,
    rejectedRows,
    source: GEONAMES_GAZETTEER_SOURCE,
    limits: { requested: limit, accepted: records.length },
  };
}

export function parseGeoNamesPostalTsv(
  text,
  {
    country = 'India',
    countryCode = 'IN',
    limit = Infinity,
  } = {},
) {
  if (typeof text !== 'string') throw new TypeError('GeoNames postal input must be text.');
  if (typeof country !== 'string' || !country.trim()) {
    throw new TypeError('A country name is required for GeoNames ingestion.');
  }
  if (typeof countryCode !== 'string' || !/^[A-Z]{2}$/.test(countryCode)) {
    throw new TypeError('A two-letter uppercase country code is required for GeoNames ingestion.');
  }
  if (!(limit === Infinity || (Number.isInteger(limit) && limit > 0))) {
    throw new TypeError('The postal record limit must be a positive integer or Infinity.');
  }

  const grouped = new Map();
  const rejectedRows = {
    malformed: 0,
    wrongCountry: 0,
    missingPostalCode: 0,
    missingPlaceName: 0,
  };
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
    const columns = line.split('\t');
    if (columns.length < 12) {
      rejectedRows.malformed += 1;
      continue;
    }
    const [
      rowCountryCode,
      postalCodeValue,
      placeNameValue,
      adminName1Value,
      adminCode1Value,
      adminName2Value,
      adminCode2Value,
      ,
      ,
      latitudeValue,
      longitudeValue,
      accuracyValue,
    ] = columns;
    if (rowCountryCode !== countryCode) {
      rejectedRows.wrongCountry += 1;
      continue;
    }
    const postalCode = String(postalCodeValue || '').trim();
    if (!postalCode) {
      rejectedRows.missingPostalCode += 1;
      continue;
    }
    const placeName = String(placeNameValue || '').trim();
    if (!placeName) {
      rejectedRows.missingPlaceName += 1;
      continue;
    }

    const adminName1 = String(adminName1Value || '').trim();
    const adminCode1 = String(adminCode1Value || '').trim();
    const adminName2 = String(adminName2Value || '').trim();
    const adminCode2 = String(adminCode2Value || '').trim();
    const parentKey = [
      adminCode1 || normalize(adminName1),
      adminCode2 || normalize(adminName2),
    ].join('|');
    const key = normalize(postalCode).replace(/[\s-]+/g, '');
    const latitude = Number(latitudeValue);
    const longitude = Number(longitudeValue);
    const accuracy = Number(accuracyValue);
    const entry = {
      postalCode,
      parentKey,
      adminName1,
      adminCode1,
      adminName2,
      adminCode2,
      placeName,
      latitude: validCoordinate(latitude, longitude) ? latitude : null,
      longitude: validCoordinate(latitude, longitude) ? longitude : null,
      accuracy: Number.isFinite(accuracy) ? accuracy : 0,
    };
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(entry);
  }

  const unambiguous = [...grouped.entries()]
    .map(([key, entries]) => ({
      key,
      entries,
      parentKeys: new Set(entries.map(({ parentKey }) => parentKey)),
    }))
    .filter(({ parentKeys }) => parentKeys.size === 1)
    .sort((left, right) => left.key.localeCompare(right.key, undefined, { numeric: true }))
    .slice(0, limit);
  const placeNameCounts = new Map();
  for (const { entries } of unambiguous) {
    for (const name of new Set(entries.map(({ placeName }) => normalize(placeName)))) {
      placeNameCounts.set(name, (placeNameCounts.get(name) || 0) + 1);
    }
  }
  const records = [];
  const countryId = `geo:source:${countryCode}:country`;
  records.push({
    id: countryId,
    slug: `geonames-${countryCode.toLowerCase()}-country`,
    canonicalName: country,
    name: country,
    type: 'country',
    parentId: null,
    parentIds: [],
    aliases: [],
    postalCodes: [],
    ...sourceFields(country, countryCode),
  });

  const states = new Map();
  const districts = new Map();
  for (const { entries } of unambiguous) {
    const selected = [...entries].sort((left, right) => (
      right.accuracy - left.accuracy || left.placeName.localeCompare(right.placeName)
    ))[0];
    const stateName = selected.adminName1;
    const stateCode = selected.adminCode1;
    const stateKey = stateCode || slugify(stateName);
    let parentId = countryId;

    if (stateName) {
      const stateId = `geo:source:${countryCode}:state:${stateKey}`;
      if (!states.has(stateId)) {
        const state = {
          id: stateId,
          slug: `geonames-${countryCode.toLowerCase()}-${slugify(stateName)}-${slugify(stateCode || 'state')}`,
          canonicalName: stateName,
          name: stateName,
          type: 'state',
          parentId: countryId,
          parentIds: [],
          aliases: [],
          postalCodes: [],
          ...sourceFields(country, countryCode),
        };
        states.set(stateId, state);
      }
      parentId = stateId;

      const districtName = selected.adminName2;
      const districtCode = selected.adminCode2;
      if (districtName) {
        const districtKey = districtCode || slugify(districtName);
        const districtId = `geo:source:${countryCode}:district:${stateKey}:${districtKey}`;
        if (!districts.has(districtId)) {
          districts.set(districtId, {
            id: districtId,
            slug: `geonames-${countryCode.toLowerCase()}-${slugify(stateName)}-${slugify(districtName)}`,
            canonicalName: districtName,
            name: districtName,
            type: 'district',
            parentId: stateId,
            parentIds: [],
            aliases: [],
            postalCodes: [],
            ...sourceFields(country, countryCode),
          });
        }
        parentId = districtId;
      }
    }

    const sourcePlaceNames = [...new Set(entries.map(({ placeName }) => placeName))]
      .sort((left, right) => left.localeCompare(right));
    const aliases = sourcePlaceNames.filter((name) => (
      placeNameCounts.get(normalize(name)) === 1
        && normalize(name) !== normalize(selected.postalCode)
    ));
    const coordinate = selected.latitude !== null && selected.longitude !== null
      ? { latitude: selected.latitude, longitude: selected.longitude, coordinateAccuracy: selected.accuracy }
      : {};
    records.push({
      id: `geo:source:${countryCode}:postal:${selected.postalCode}`,
      slug: `geonames-${countryCode.toLowerCase()}-postal-${slugify(selected.postalCode)}`,
      canonicalName: selected.postalCode,
      name: selected.postalCode,
      type: 'postal-area',
      parentId,
      parentIds: [],
      aliases,
      sourcePlaceNames,
      postalCode: selected.postalCode,
      postalCodes: [selected.postalCode],
      ...coordinate,
      ...sourceFields(country, countryCode),
    });
  }

  records.splice(1, 0, ...states.values(), ...districts.values());
  createParentIds(records);
  const acceptedPostalCodes = records.filter(({ type }) => type === 'postal-area').length;
  return {
    records,
    acceptedPostalCodes,
    ambiguousPostalCodes: grouped.size - [...grouped.values()]
      .filter((entries) => new Set(entries.map(({ parentKey }) => parentKey)).size === 1)
      .length,
    rejectedRows,
    source: GEONAMES_POSTAL_SOURCE,
  };
}
