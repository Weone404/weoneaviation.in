const GEONAMES_POSTAL_SOURCE = Object.freeze({
  href: 'https://download.geonames.org/export/zip/IN.zip',
  publisher: 'GeoNames',
  title: 'GeoNames India postal-code export',
  scope: 'Secondary postal-place associations, administrative names and approximate coordinates.',
  reviewedAt: '2026-10-03',
  license: 'Creative Commons Attribution 4.0',
});
const GEONAMES_POSTAL_SOURCE_LINKS = Object.freeze([GEONAMES_POSTAL_SOURCE]);

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
