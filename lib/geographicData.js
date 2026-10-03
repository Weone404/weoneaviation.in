export const GEOGRAPHIC_LEVELS = [
  'country',
  'state',
  'province',
  'region',
  'county',
  'district',
  'subdistrict',
  'city',
  'town',
  'locality',
  'neighborhood',
  'postal-area',
];

export const POSTAL_TYPE_ALIASES = [
  'postal-code',
  'postcode',
  'zip-code',
  'pin-code',
  'zip',
  'pin',
];

export const LOCATION_RELATIONSHIPS = [
  'physical',
  'online',
  'service-area',
  'informational',
  'research-only',
  'unsupported',
];

const TYPE_ALIASES = Object.fromEntries(
  POSTAL_TYPE_ALIASES.map((type) => [type, 'postal-area']),
);
const indexes = new WeakMap();

function normalize(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function normalizeType(type) {
  const normalized = normalize(type);
  return TYPE_ALIASES[normalized] || normalized;
}

function postalKey(value) {
  return normalize(String(value ?? '')).replace(/[\s-]+/g, '');
}

function addToIndex(index, key, record) {
  if (!key) return;
  const matches = index.get(key);
  if (matches) {
    if (!matches.includes(record)) matches.push(record);
  } else {
    index.set(key, [record]);
  }
}

function resolveUnique(matches, kind, value) {
  if (matches.length > 1) failAmbiguous(kind, value);
  return matches[0] || null;
}

function getIndexes(records) {
  if (!Array.isArray(records)) return null;
  const cached = indexes.get(records);
  if (cached) return cached;

  const byId = new Map();
  const bySlug = new Map();
  const byNameOrAlias = new Map();
  const byPostalCode = new Map();
  const addName = (key, record) => {
    const normalized = normalize(key);
    if (!normalized) return;
    addToIndex(byNameOrAlias, normalized, record);
  };

  for (const record of records) {
    if (!record || typeof record !== 'object') continue;
    if (record.id !== undefined && record.id !== null) {
      addToIndex(byId, String(record.id), record);
    }
    if (typeof record.slug === 'string') addToIndex(bySlug, normalize(record.slug), record);
    addName(record.name, record);
    for (const alias of Array.isArray(record.aliases) ? record.aliases : []) addName(alias, record);
    const postalCodes = [
      ...(record.postalCode !== undefined && record.postalCode !== null
        ? [record.postalCode]
        : []),
      ...(Array.isArray(record.postalCodes) ? record.postalCodes : []),
    ];
    for (const postalCode of postalCodes) {
      const key = postalKey(postalCode);
      if (key) {
        addToIndex(byPostalCode, key, record);
      }
    }
  }

  const result = { byId, bySlug, byNameOrAlias, byPostalCode };
  indexes.set(records, result);
  return result;
}

function failAmbiguous(kind, value) {
  throw new Error(`Geographic ${kind} "${value}" is ambiguous.`);
}

export function resolveBySlug(slug, records = []) {
  if (typeof slug !== 'string' || !Array.isArray(records)) return null;
  return resolveUnique(getIndexes(records)?.bySlug.get(normalize(slug)) || [], 'slug', slug);
}

export function resolveByAlias(alias, records = [], { country = null, parentId = null } = {}) {
  if (typeof alias !== 'string' || !Array.isArray(records)) return null;
  const matches = getIndexes(records)?.byNameOrAlias.get(normalize(alias)) || [];
  const filtered = matches.filter((record) => (
    (!country || normalize(record.country) === normalize(country))
    && (!parentId || String(record.parentId ?? record.parentSlug) === String(parentId))
  ));
  return resolveUnique(filtered, 'alias', alias);
}

export function resolveByPostalCode(code, records = [], country = null) {
  if (code === undefined || code === null || !Array.isArray(records)) return null;
  const matches = getIndexes(records)?.byPostalCode.get(postalKey(code)) || [];
  const filtered = country
    ? matches.filter((record) => normalize(record.country) === normalize(country))
    : matches;
  return resolveUnique(filtered, 'postal code', code);
}

export function resolveGeographicRecord(reference, records = [], options = {}) {
  if (typeof reference !== 'string' || !Array.isArray(records)) return null;
  const index = getIndexes(records);
  const byId = resolveUnique(index?.byId.get(reference) || [], 'id', reference);
  const bySlug = resolveUnique(index?.bySlug.get(normalize(reference)) || [], 'slug', reference);
  const byReference = byId || bySlug;
  return byReference || resolveByAlias(reference, records, options);
}

export function resolveHierarchy(locationOrReference, records = []) {
  if (!Array.isArray(records)) {
    throw new TypeError('Geographic records must be an array.');
  }
  const location = typeof locationOrReference === 'string'
    ? resolveGeographicRecord(locationOrReference, records)
    : locationOrReference;
  if (!location) return null;

  const byId = getIndexes(records).byId;
  const bySlug = getIndexes(records).bySlug;
  const chain = [];
  const visited = new Set();
  let current = location;

  while (current) {
    const key = String(current.id ?? current.slug);
    if (visited.has(key)) throw new Error(`Geographic hierarchy contains a parent cycle at "${key}".`);
    visited.add(key);
    chain.unshift(current);

    const parentReference = current.parentId ?? current.parentSlug;
    if (parentReference === undefined || parentReference === null || parentReference === '') break;
    current = resolveUnique(
      byId.get(String(parentReference))
        || bySlug.get(normalize(String(parentReference)))
        || [],
      'parent reference',
      parentReference,
    );
    if (!current) {
      throw new Error(`Geographic parent "${parentReference}" for "${key}" was not found.`);
    }
  }

  return chain;
}

function resolveLevel(locationOrReference, records, allowedTypes) {
  const hierarchy = resolveHierarchy(locationOrReference, records) || [];
  return [...hierarchy].reverse().find(({ type }) => allowedTypes.includes(normalizeType(type))) || null;
}

export function resolveCountry(locationOrReference, records = []) {
  return resolveLevel(locationOrReference, records, ['country']);
}

export function resolveState(locationOrReference, records = []) {
  return resolveLevel(locationOrReference, records, ['state', 'province', 'region']);
}

export function resolveCounty(locationOrReference, records = []) {
  return resolveLevel(locationOrReference, records, ['county', 'district', 'subdistrict']);
}

export function resolveCity(locationOrReference, records = []) {
  return resolveLevel(locationOrReference, records, ['city', 'town']);
}

export function resolveLocality(locationOrReference, records = []) {
  return resolveLevel(locationOrReference, records, ['locality', 'neighborhood']);
}

const CHILD_TYPES = {
  country: ['state', 'province', 'region'],
  state: ['region', 'county', 'district', 'subdistrict', 'city', 'town', 'locality', 'neighborhood', 'postal-area'],
  province: ['region', 'county', 'district', 'subdistrict', 'city', 'town', 'locality', 'neighborhood', 'postal-area'],
  region: ['region', 'county', 'district', 'subdistrict', 'city', 'town', 'locality', 'neighborhood', 'postal-area'],
  county: ['subdistrict', 'city', 'town', 'locality', 'neighborhood', 'postal-area'],
  district: ['subdistrict', 'city', 'town', 'locality', 'neighborhood', 'postal-area'],
  subdistrict: ['city', 'town', 'locality', 'neighborhood', 'postal-area'],
  city: ['locality', 'neighborhood', 'postal-area'],
  town: ['locality', 'neighborhood', 'postal-area'],
  locality: ['locality', 'neighborhood', 'postal-area'],
  neighborhood: ['locality', 'neighborhood', 'postal-area'],
  'postal-area': [],
};

function sourceLinksAreValid(sourceLinks) {
  if (!Array.isArray(sourceLinks)) return false;
  return sourceLinks.every((link) => {
    if (!link || typeof link !== 'object' || typeof link.href !== 'string') return false;
    let parsedUrl;
    try {
      parsedUrl = new URL(link.href);
    } catch {
      return false;
    }
    const reviewedDate = /^\d{4}-\d{2}-\d{2}$/.test(link.reviewedAt)
      ? new Date(`${link.reviewedAt}T00:00:00.000Z`)
      : null;
    return parsedUrl.protocol === 'https:'
      && Boolean(parsedUrl.hostname)
      && typeof link.publisher === 'string'
      && Boolean(link.publisher.trim())
      && typeof link.title === 'string'
      && Boolean(link.title.trim())
      && typeof link.scope === 'string'
      && Boolean(link.scope.trim())
      && Boolean(reviewedDate)
      && !Number.isNaN(reviewedDate.getTime())
      && reviewedDate.toISOString().slice(0, 10) === link.reviewedAt;
  });
}

export function validateGeographicData(records) {
  if (!Array.isArray(records)) return ['Geographic dataset must be an array.'];
  const errors = [];
  const ids = new Map();
  const slugs = new Map();
  const postalCodes = new Map();
  const normalizedTypes = new Set([...GEOGRAPHIC_LEVELS, ...POSTAL_TYPE_ALIASES]);

  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      errors.push(`Geographic record at index ${index} must be an object.`);
      continue;
    }
    for (const key of ['id', 'slug', 'name', 'type', 'country']) {
      if (typeof record[key] !== 'string' || !record[key].trim()) {
        errors.push(`Geographic record at index ${index} needs a non-empty ${key}.`);
      }
    }
    if (typeof record.id === 'string' && record.id.trim()) {
      if (ids.has(record.id)) errors.push(`Duplicate geographic id "${record.id}".`);
      else ids.set(record.id, record);
    }
    const normalizedSlug = normalize(record.slug);
    if (normalizedSlug) {
      if (slugs.has(normalizedSlug)) errors.push(`Duplicate geographic slug "${record.slug}".`);
      else slugs.set(normalizedSlug, record);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(record.slug)) {
        errors.push(`Geographic record "${record.slug}" has an invalid slug.`);
      }
    }
    const type = normalizeType(record.type);
    if (!normalizedTypes.has(normalize(record.type)) && !GEOGRAPHIC_LEVELS.includes(type)) {
      errors.push(`Geographic record "${record.slug || index}" has an invalid type.`);
    }
    if (record.aliases !== undefined && (!Array.isArray(record.aliases)
      || record.aliases.some((alias) => typeof alias !== 'string' || !alias.trim()))) {
      errors.push(`Geographic record "${record.slug || index}" has invalid aliases.`);
    }
    if (Array.isArray(record.aliases)
      && new Set(record.aliases.map(normalize)).size !== record.aliases.length) {
      errors.push(`Geographic record "${record.slug || index}" has duplicate aliases.`);
    }
    if (!sourceLinksAreValid(record.sourceLinks)) {
      errors.push(`Geographic record "${record.slug || index}" has malformed source links.`);
    }
    if (record.testOnly !== true) {
      const sourceUrl = record.sourceUrl
        || (Array.isArray(record.sourceLinks) ? record.sourceLinks[0]?.href : null);
      const parsedSourceUrl = typeof sourceUrl === 'string'
        ? (() => {
          try {
            return new URL(sourceUrl);
          } catch {
            return null;
          }
        })()
        : null;
      if (!record.source || !parsedSourceUrl || parsedSourceUrl.protocol !== 'https:') {
        errors.push(`Geographic record "${record.slug || index}" is missing valid source attribution.`);
      }
      if (!record.countryCode || !record.canonicalName || !record.status) {
        errors.push(`Geographic record "${record.slug || index}" is missing canonical metadata.`);
      }
      if (record.sourceDate !== undefined
        && record.sourceDate !== null
        && (!/^\d{4}-\d{2}-\d{2}$/.test(record.sourceDate)
          || Number.isNaN(new Date(`${record.sourceDate}T00:00:00.000Z`).getTime())
          || new Date(`${record.sourceDate}T00:00:00.000Z`).toISOString().slice(0, 10) !== record.sourceDate)) {
        errors.push(`Geographic record "${record.slug || index}" has an invalid source date.`);
      }
      if (!Array.isArray(record.parentIds)) {
        errors.push(`Geographic record "${record.slug || index}" has invalid parentIds.`);
      }
      if (record.countryCode !== undefined
        && (typeof record.countryCode !== 'string' || !/^[A-Z]{2}$/.test(record.countryCode))) {
        errors.push(`Geographic record "${record.slug || index}" has an invalid country code.`);
      }
      if (record.status !== undefined
        && !['verified', 'sourced', 'needs-review'].includes(record.status)) {
        errors.push(`Geographic record "${record.slug || index}" has an invalid data status.`);
      }
      if (record.latitude !== undefined && record.latitude !== null
        && (typeof record.latitude !== 'number' || record.latitude < -90 || record.latitude > 90)) {
        errors.push(`Geographic record "${record.slug || index}" has an invalid latitude.`);
      }
      if (record.longitude !== undefined && record.longitude !== null
        && (typeof record.longitude !== 'number' || record.longitude < -180 || record.longitude > 180)) {
        errors.push(`Geographic record "${record.slug || index}" has an invalid longitude.`);
      }
      if (record.timezone !== undefined && record.timezone !== null) {
        if (typeof record.timezone !== 'string' || !record.timezone.trim()) {
          errors.push(`Geographic record "${record.slug || index}" has an invalid timezone.`);
        } else {
          try {
            new Intl.DateTimeFormat('en-US', { timeZone: record.timezone });
          } catch {
            errors.push(`Geographic record "${record.slug || index}" has an unknown IANA timezone.`);
          }
        }
      }
    }
    const inputPostalCodes = [
      ...(record.postalCode !== undefined && record.postalCode !== null
        ? [record.postalCode]
        : []),
      ...(Array.isArray(record.postalCodes) ? record.postalCodes : []),
    ];
    if (record.postalCodes !== undefined
      && (!Array.isArray(record.postalCodes)
        || record.postalCodes.some((code) => typeof code !== 'string' || !code.trim()))) {
      errors.push(`Geographic record "${record.slug || index}" has invalid postalCodes.`);
    }
    if (record.postalCodes !== undefined
      && Array.isArray(record.postalCodes)
      && new Set(record.postalCodes.map(postalKey)).size !== record.postalCodes.length) {
      errors.push(`Geographic record "${record.slug || index}" has duplicate postal codes.`);
    }
    const recordPostalCodes = [...new Map(inputPostalCodes
      .map((code) => [postalKey(code), code])).values()];
    for (const postalCode of recordPostalCodes) {
      if (typeof postalCode !== 'string' || !postalCode.trim()) {
        errors.push(`Geographic record "${record.slug || index}" has an invalid postal code.`);
      }
      const key = postalKey(postalCode);
      if (!key || !GEOGRAPHIC_LEVELS.includes(type) || type !== 'postal-area') {
        errors.push(`Geographic record "${record.slug || index}" has a postal code on a non-postal level.`);
      } else {
        const postalKeyWithCountry = `${normalize(record.country)}|${key}`;
        if (postalCodes.has(postalKeyWithCountry)) {
          errors.push(`Postal code "${postalCode}" is duplicated within ${record.country}.`);
        } else postalCodes.set(postalKeyWithCountry, record);
      }
    }
    if (type === 'postal-area' && recordPostalCodes.length === 0) {
      errors.push(`Postal geographic record "${record.slug || index}" needs a postal code.`);
    }
    if (type === 'country' && (record.parentId || record.parentSlug)) {
      errors.push(`Country "${record.slug || index}" cannot have a parent.`);
    }
  }

  const indexById = new Map(records
    .filter((record) => record && typeof record === 'object' && typeof record.id === 'string')
    .map((record) => [record.id, record]));
  const indexBySlug = new Map(records
    .filter((record) => record && typeof record === 'object' && typeof record.slug === 'string')
    .map((record) => [normalize(record.slug), record]));
  const allReferences = new Set([
    ...indexById.keys(),
    ...indexBySlug.keys(),
  ]);
  const normalizedReferences = new Map();
  for (const record of records) {
    if (!record || typeof record !== 'object') continue;
    for (const reference of [record.id, record.slug]) {
      if (typeof reference === 'string') {
        normalizedReferences.set(normalize(reference), record);
      }
    }
  }
  const aliasOwners = new Map();
  const entityKeys = new Set();

  for (const record of records) {
    if (!record || typeof record !== 'object') continue;
    if (record.childrenIds !== undefined
      && (!Array.isArray(record.childrenIds)
        || record.childrenIds.some((reference) => (
          typeof reference !== 'string'
          || !indexById.has(reference)
          || indexById.get(reference)?.parentId !== record.id
        )))) {
      errors.push(`Geographic record "${record.slug || record.id}" has invalid child references.`);
    }
    if (record.relatedLocationIds !== undefined
      && (!Array.isArray(record.relatedLocationIds)
        || record.relatedLocationIds.some((reference) => (
          typeof reference !== 'string' || !allReferences.has(reference)
        )))) {
      errors.push(`Geographic record "${record.slug || record.id}" has invalid related location references.`);
    }
    const parentReference = String(record.parentId ?? record.parentSlug ?? '');
    const entityKey = `${normalizeType(record.type)}|${parentReference}|${normalize(record.name)}`;
    if (entityKeys.has(entityKey)) {
      errors.push(`Geographic entity "${record.name}" is duplicated under the same parent.`);
    }
    entityKeys.add(entityKey);
    for (const alias of [record.name, ...(Array.isArray(record.aliases) ? record.aliases : [])]) {
      if (typeof alias !== 'string' || !alias.trim()) continue;
      const parentReference = String(record.parentId ?? record.parentSlug ?? '');
      const aliasKey = `${normalize(record.country)}|${parentReference}|${normalize(alias)}`;
      const previous = aliasOwners.get(aliasKey);
      if (previous && previous !== record) {
        errors.push(`Alias "${alias}" is ambiguous within ${record.country}.`);
      } else aliasOwners.set(aliasKey, record);
      const referenceOwner = normalizedReferences.get(normalize(alias));
      if (referenceOwner && referenceOwner !== record) {
        errors.push(`Geographic alias "${alias}" conflicts with another record reference.`);
      }
    }
  }

  const typeIndex = new Map(records
    .filter((record) => record && typeof record === 'object')
    .map((record) => [record, normalizeType(record.type)]));
  const hierarchyFor = (record) => {
    const chain = [];
    const visited = new Set();
    let current = record;
    while (current) {
      const reference = String(current.id ?? current.slug ?? '');
      if (visited.has(reference)) {
        errors.push(`Geographic hierarchy contains a parent cycle at "${reference}".`);
        return null;
      }
      visited.add(reference);
      chain.unshift(current);
      const parentReference = current.parentId ?? current.parentSlug;
      if (parentReference === undefined || parentReference === null || parentReference === '') break;
      const parent = indexById.get(String(parentReference))
        || indexBySlug.get(normalize(String(parentReference)));
      if (!parent) {
        errors.push(`Geographic record "${current.slug || current.id}" has a missing parent "${parentReference}".`);
        return null;
      }
      const parentType = typeIndex.get(parent);
      const childType = typeIndex.get(current);
      if (!CHILD_TYPES[parentType]?.includes(childType)) {
        errors.push(`Invalid hierarchy: "${parentType}" cannot contain "${childType}" (${current.slug || current.id}).`);
      }
      current = parent;
    }
    return chain;
  };

  for (const record of records) {
    if (!record || typeof record !== 'object') continue;
    const type = typeIndex.get(record);
    const hierarchy = hierarchyFor(record);
    if (!hierarchy) continue;
    if (Array.isArray(record.parentIds)) {
      const expectedParentIds = hierarchy.slice(0, -1).map(({ id }) => String(id));
      if (JSON.stringify(record.parentIds.map(String)) !== JSON.stringify(expectedParentIds)) {
        errors.push(`Geographic record "${record.slug || record.id}" has inconsistent parentIds.`);
      }
    }
    const countryNode = hierarchy.find((node) => typeIndex.get(node) === 'country');
    if (!countryNode) errors.push(`Geographic record "${record.slug || record.id}" has no country ancestor.`);
    else if (normalize(record.country) !== normalize(countryNode.name)) {
      errors.push(`Geographic record "${record.slug || record.id}" has a country/parent mismatch.`);
    }
    if (record.countryCode && countryNode?.countryCode
      && record.countryCode !== countryNode.countryCode) {
      errors.push(`Geographic record "${record.slug || record.id}" has a country code/parent mismatch.`);
    }
    if (type === 'country' && hierarchy.length !== 1) {
      errors.push(`Country "${record.slug || record.id}" has an invalid hierarchy.`);
    }

    const checks = [
      [['state', 'province', 'region'], ['state', 'province', 'region']],
      [['province'], ['province', 'state']],
      [['region'], ['region']],
      [['county'], ['county', 'district', 'subdistrict']],
      [['district'], ['district']],
      [['city'], ['city', 'town', 'state', 'province', 'region']],
      [['locality'], ['locality', 'neighborhood']],
    ];
    for (const [fields, allowedAncestorTypes] of checks) {
      for (const field of fields) {
        if (!record[field]) continue;
        const matchingAncestor = [...hierarchy].reverse().find((node) => (
          allowedAncestorTypes.includes(typeIndex.get(node))
        ));
        if (!matchingAncestor || normalize(record[field]) !== normalize(matchingAncestor.name)) {
          errors.push(`Geographic record "${record.slug || record.id}" has an inconsistent ${field} field.`);
        }
      }
    }
    if (record.relationship !== undefined && record.relationship !== null
      && record.relationship !== ''
      && !LOCATION_RELATIONSHIPS.includes(normalize(record.relationship).replace(/_/g, '-'))) {
      errors.push(`Geographic record "${record.slug || record.id}" has an unsupported relationship.`);
    }
  }

  return [...new Set(errors)];
}

export function findAmbiguousGeographicAliases(records) {
  if (!Array.isArray(records)) throw new TypeError('Geographic records must be an array.');
  const aliasOwners = new Map();
  for (const record of records) {
    if (!record || typeof record !== 'object') continue;
    const aliases = [record.name, ...(Array.isArray(record.aliases) ? record.aliases : [])];
    for (const alias of new Set(aliases.map(normalize).filter(Boolean))) {
      const key = `${normalize(record.country)}|${alias}`;
      const owners = aliasOwners.get(key) || new Map();
      owners.set(String(record.id ?? record.slug), record);
      aliasOwners.set(key, owners);
    }
  }
  return [...aliasOwners.entries()]
    .filter(([, owners]) => owners.size > 1)
    .map(([key, owners]) => ({
      alias: key.slice(key.indexOf('|') + 1),
      country: [...owners.values()][0].country,
      recordIds: [...owners.keys()],
    }));
}

export function composeLocationRecord({
  geographicRecord,
  locations,
  businessProfile = {},
  serviceProfile = {},
  regulatoryContext = null,
  indexabilityPolicy = {},
}) {
  if (!geographicRecord || !Array.isArray(locations)) {
    throw new TypeError('A geographic record and its location dataset are required.');
  }
  const hierarchy = resolveHierarchy(geographicRecord, locations);
  if (!hierarchy) throw new Error('The geographic record is not part of the supplied dataset.');
  const locationIndexes = getIndexes(locations);
  const ancestor = (types) => [...hierarchy].reverse().find(({ type }) => (
    types.includes(normalizeType(type))
  ));
  const related = (types) => (geographicRecord.relatedLocationIds || [])
    .map((reference) => resolveUnique(
      locationIndexes.byId.get(String(reference))
        || locationIndexes.bySlug.get(normalize(reference))
        || [],
      'related location reference',
      reference,
    ))
    .find((record) => types.includes(normalizeType(record?.type)));
  const country = ancestor(['country'])?.name || geographicRecord.country || null;
  const indexable = indexabilityPolicy.approved === true
    && businessProfile.indexable === true;
  const parentLocation = {
    country,
    state: ancestor(['state'])?.name || null,
    province: ancestor(['province'])?.name || null,
    region: ancestor(['region'])?.name || null,
    county: ancestor(['county'])?.name || null,
    district: ancestor(['district'])?.name || null,
    city: ancestor(['city'])?.name || related(['city'])?.name || null,
    town: ancestor(['town'])?.name || null,
    locality: ancestor(['locality'])?.name || null,
    neighborhood: ancestor(['neighborhood'])?.name || null,
    postalCode: ancestor(['postal-area'])?.postalCode
      || ancestor(['postal-area'])?.postalCodes?.[0]
      || null,
  };
  const sources = [
    ...(geographicRecord.sourceLinks || []),
    ...(businessProfile.sourceLinks || []),
  ];

  return {
    id: geographicRecord.id,
    slug: geographicRecord.slug,
    name: geographicRecord.name,
    canonicalName: geographicRecord.canonicalName || geographicRecord.name,
    type: geographicRecord.type,
    countryCode: geographicRecord.countryCode || null,
    parentId: geographicRecord.parentId || null,
    parentSlug: geographicRecord.parentSlug || null,
    parentIds: [...(geographicRecord.parentIds || [])],
    relatedLocationIds: [...(geographicRecord.relatedLocationIds || [])],
    ...parentLocation,
    aliases: [...(geographicRecord.aliases || [])],
    postalCodes: [...(geographicRecord.postalCodes || [])],
    latitude: geographicRecord.latitude ?? null,
    longitude: geographicRecord.longitude ?? null,
    source: geographicRecord.source || null,
    sourceUrl: geographicRecord.sourceUrl || null,
    sourceDate: geographicRecord.sourceDate ?? null,
    status: geographicRecord.status || 'needs-review',
    relationship: businessProfile.relationship || 'INFORMATIONAL',
    renderable: businessProfile.renderable === true,
    indexable,
    supportedServices: [...(serviceProfile.supportedServices || [])],
    regulatoryContext,
    verifiedFacts: [...(businessProfile.verifiedFacts || [])],
    sourceLinks: sources,
    indexabilityState: indexable ? 'INDEXABLE' : 'NOINDEX',
  };
}
