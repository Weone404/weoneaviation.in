import { AVIATION_REGULATORY_CONTEXTS } from '../aviation-regulatory-contexts.js';
import { ENGINE_TEST_SERVICES } from '../location-engine-fixtures.js';

const EMPTY_ARRAY = Object.freeze([]);
const RELATIONSHIPS = ['physical', 'online', 'service-area', 'informational'];
const REGULATED_COUNTRIES = new Set([
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
]);
const SPRINGFIELD_ALIAS = Object.freeze(['Springfield']);

const COUNTRY_SPECS = [
  {
    name: 'India',
    slug: 'india',
    administrativeType: 'state',
    administrativeUnits: ['Maharashtra', 'Delhi', 'Karnataka', 'Uttar Pradesh', 'Tamil Nadu'],
  },
  {
    name: 'United States',
    slug: 'united-states',
    administrativeType: 'state',
    administrativeUnits: ['California', 'Texas', 'Florida', 'New York', 'Washington'],
  },
  {
    name: 'United Kingdom',
    slug: 'united-kingdom',
    administrativeType: 'region',
    administrativeUnits: ['England', 'Scotland', 'Wales', 'Northern Ireland', 'South East England'],
  },
  {
    name: 'Canada',
    slug: 'canada',
    administrativeType: 'province',
    administrativeUnits: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
  },
  {
    name: 'Australia',
    slug: 'australia',
    administrativeType: 'state',
    administrativeUnits: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia'],
  },
  {
    name: 'Singapore',
    slug: 'singapore',
    administrativeType: 'region',
    administrativeUnits: ['Central Region', 'East Region', 'North Region', 'North-East Region', 'West Region'],
  },
  {
    name: 'United Arab Emirates',
    slug: 'united-arab-emirates',
    administrativeType: 'region',
    administrativeUnits: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Fujairah'],
  },
  {
    name: 'France',
    slug: 'france',
    administrativeType: 'region',
    administrativeUnits: ['Ile-de-France', 'Normandy', 'Occitanie', 'Brittany', 'Grand Est'],
  },
  {
    name: 'Germany',
    slug: 'germany',
    administrativeType: 'region',
    administrativeUnits: ['Bavaria', 'Berlin', 'Hamburg', 'Hesse', 'Saxony'],
  },
  {
    name: 'Japan',
    slug: 'japan',
    administrativeType: 'region',
    administrativeUnits: ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido', 'Fukuoka'],
  },
];

const REQUESTED_CITIES = {
  'India|Maharashtra': 'Mumbai',
  'India|Delhi': 'Delhi',
  'United States|New York': 'New York City',
  'United Kingdom|England': 'London',
  'Canada|Ontario': 'Toronto',
  'Australia|New South Wales': 'Sydney',
  'Singapore|Central Region': 'Singapore',
  'United Arab Emirates|Dubai': 'Dubai',
  'France|Ile-de-France': 'Paris',
  'Germany|Berlin': 'Berlin',
  'Japan|Tokyo': 'Tokyo',
};

const TEST_CONTENT_BY_SERVICE = Object.freeze(Object.fromEntries(
  ENGINE_TEST_SERVICES.map((service) => [service.slug, Object.freeze({
    introduction: `Synthetic scale-test content for the ${service.name} intent. It makes no local business, regulatory, or availability claim.`,
    localContext: 'Synthetic scale-test content only; this is not evidence of a local service or business presence.',
    faqs: Object.freeze([Object.freeze({
      question: 'What does this synthetic location fixture establish?',
      answer: 'It establishes only that the geographic and aviation-intent test pipeline can evaluate this record.',
    })]),
    internalLinks: Object.freeze([
      Object.freeze({ href: '/pilot-training-in-india', label: 'Pilot training in India' }),
      Object.freeze({ href: '/contact', label: 'Contact We One Aviation' }),
    ]),
    cta: Object.freeze({ label: 'Contact the academy', href: '/contact' }),
  })]),
));

const SUPPORTED_COUNTRIES_BY_SERVICE = {
  'pilot-training': new Set(COUNTRY_SPECS.map(({ name }) => name)),
  'dgca-ground-classes': new Set(['India']),
  'commercial-pilot-training': new Set([
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  ]),
  'cpl-training': new Set([
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  ]),
  'pilot-medical': new Set(['India', 'United States', 'United Kingdom', 'Australia']),
  'dgca-exam': new Set(['India']),
  'flight-training-guidance': new Set([
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia',
  ]),
  'airline-pilot-preparation': new Set(['India', 'United States', 'United Kingdom']),
  'aviation-career-guidance': new Set(COUNTRY_SPECS.map(({ name }) => name)),
};
const SUPPORTED_SERVICES_BY_COUNTRY = new Map(COUNTRY_SPECS.map(({ name }) => [
  name,
  Object.freeze(ENGINE_TEST_SERVICES
    .filter(({ slug }) => SUPPORTED_COUNTRIES_BY_SERVICE[slug]?.has(name))
    .map(({ slug }) => slug)),
]));

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function makeRecord({
  id,
  slug,
  name,
  type,
  parentId = null,
  country,
  postalCode,
  aliases = EMPTY_ARRAY,
  relationship = 'informational',
  regulatoryContext = null,
  verifiedFacts = EMPTY_ARRAY,
  indexabilityState,
}) {
  return Object.freeze({
    id,
    slug,
    name,
    type,
    parentId,
    country,
    ...(postalCode ? { postalCode } : {}),
    aliases,
    relatedLocationIds: EMPTY_ARRAY,
    sourceLinks: EMPTY_ARRAY,
    relationship,
    regulatoryContext,
    verifiedFacts,
    renderable: true,
    indexable: false,
    ...(indexabilityState ? { indexabilityState } : {}),
    supportedServices: SUPPORTED_SERVICES_BY_COUNTRY.get(country),
    serviceContent: TEST_CONTENT_BY_SERVICE,
    testOnly: true,
  });
}

function createDataset() {
  const records = [];
  const citiesByCountry = new Map(COUNTRY_SPECS.map(({ name }) => [name, []]));
  const localities = [];
  const neighborhoods = [];
  let sequence = 0;

  const push = (record) => {
    records.push(record);
    return record;
  };

  for (const [countryIndex, spec] of COUNTRY_SPECS.entries()) {
    const countryId = `scale:country:${spec.slug}`;
    const regulatoryContext = REGULATED_COUNTRIES.has(spec.name)
      ? AVIATION_REGULATORY_CONTEXTS[spec.name]
      : null;
    const verifiedFacts = REGULATED_COUNTRIES.has(spec.name)
      ? Object.freeze([Object.freeze({
        text: `Scale-test-only inherited fixture for the ${spec.name} hierarchy; not a production aviation fact.`,
        verified: true,
        source: 'scale-test-fixture',
      })])
      : EMPTY_ARRAY;

    push(makeRecord({
      id: countryId,
      slug: `scale-${spec.slug}`,
      name: spec.name,
      type: 'country',
      country: spec.name,
      relationship: 'informational',
      regulatoryContext,
      verifiedFacts,
    }));

    for (const [unitIndex, unitName] of spec.administrativeUnits.entries()) {
      const unitId = `scale:admin:${spec.slug}:${unitIndex + 1}`;
      push(makeRecord({
        id: unitId,
        slug: `scale-${slugify(unitName)}-${spec.slug}`,
        name: unitName,
        type: spec.administrativeType,
        parentId: countryId,
        country: spec.name,
        relationship: RELATIONSHIPS[sequence % RELATIONSHIPS.length],
        indexabilityState: sequence % 19 === 0 ? 'RESEARCH_ONLY' : undefined,
      }));
      sequence += 1;

      for (let districtIndex = 0; districtIndex < 2; districtIndex += 1) {
        const districtNumber = countryIndex * 10 + unitIndex * 2 + districtIndex + 1;
        const districtId = `scale:district:${String(districtNumber).padStart(3, '0')}`;
        const districtType = spec.name === 'United States' ? 'county' : 'district';
        push(makeRecord({
          id: districtId,
          slug: `scale-${districtType}-${String(districtNumber).padStart(3, '0')}`,
          name: `Scale Test ${districtType} ${String(districtNumber).padStart(3, '0')}`,
          type: districtType,
          parentId: unitId,
          country: spec.name,
          relationship: RELATIONSHIPS[sequence % RELATIONSHIPS.length],
          indexabilityState: sequence % 19 === 0 ? 'RESEARCH_ONLY' : undefined,
        }));
        sequence += 1;

        for (let cityIndex = 0; cityIndex < 2; cityIndex += 1) {
          const cityNumber = districtNumber * 2 - 1 + cityIndex;
          const specialKey = `${spec.name}|${unitName}`;
          const requestedName = cityIndex === 0 && districtIndex === 0
            ? REQUESTED_CITIES[specialKey]
            : null;
          const cityName = requestedName || `Scale Test City ${String(cityNumber).padStart(3, '0')}`;
          const citySlug = `scale-${slugify(cityName)}-${String(cityNumber).padStart(3, '0')}`;
          const aliases = spec.name === 'United States' && cityIndex === 1 && unitIndex < 2
            ? SPRINGFIELD_ALIAS
            : EMPTY_ARRAY;
          const city = push(makeRecord({
            id: `scale:city:${String(cityNumber).padStart(3, '0')}`,
            slug: citySlug,
            name: cityName,
            type: 'city',
            parentId: districtId,
            country: spec.name,
            aliases,
            relationship: requestedName
              ? 'informational'
              : RELATIONSHIPS[sequence % RELATIONSHIPS.length],
            indexabilityState: sequence % 19 === 0 ? 'RESEARCH_ONLY' : undefined,
          }));
          citiesByCountry.get(spec.name).push(city);
          sequence += 1;
        }
      }
    }
  }

  const citiesPerCountry = citiesByCountry.values().next().value.length;
  const interleavedCities = Array.from(
    { length: citiesPerCountry },
    (_, index) => COUNTRY_SPECS
      .map(({ name }) => citiesByCountry.get(name)[index])
      .filter(Boolean),
  ).flat();
  for (let index = 0; index < 100; index += 1) {
    const parent = interleavedCities[index];
    push(makeRecord({
      id: `scale:town:${String(index + 1).padStart(3, '0')}`,
      slug: `scale-test-town-${String(index + 1).padStart(3, '0')}`,
      name: `Scale Test Town ${String(index + 1).padStart(3, '0')}`,
      type: 'town',
      parentId: parent.parentId,
      country: parent.country,
      relationship: RELATIONSHIPS[sequence % RELATIONSHIPS.length],
    }));
    sequence += 1;
  }

  for (let index = 0; index < 80; index += 1) {
    const parent = interleavedCities[index];
    const locality = push(makeRecord({
      id: `scale:locality:${String(index + 1).padStart(3, '0')}`,
      slug: `scale-test-locality-${String(index + 1).padStart(3, '0')}`,
      name: `Scale Test Locality ${String(index + 1).padStart(3, '0')}`,
      type: 'locality',
      parentId: parent.id,
      country: parent.country,
      relationship: RELATIONSHIPS[sequence % RELATIONSHIPS.length],
    }));
    localities.push(locality);
    sequence += 1;
  }

  for (let index = 0; index < 60; index += 1) {
    const parent = localities[index];
    const neighborhood = push(makeRecord({
      id: `scale:neighborhood:${String(index + 1).padStart(3, '0')}`,
      slug: `scale-test-neighborhood-${String(index + 1).padStart(3, '0')}`,
      name: `Scale Test Neighborhood ${String(index + 1).padStart(3, '0')}`,
      type: 'neighborhood',
      parentId: parent.id,
      country: parent.country,
      relationship: RELATIONSHIPS[sequence % RELATIONSHIPS.length],
    }));
    neighborhoods.push(neighborhood);
    sequence += 1;
  }

  for (const [countryIndex, spec] of COUNTRY_SPECS.entries()) {
    const countryCities = citiesByCountry.get(spec.name);
    const countryNeighborhoods = neighborhoods.filter(({ country }) => country === spec.name);
    for (let postalIndex = 0; postalIndex < 10; postalIndex += 1) {
      const parent = countryNeighborhoods[postalIndex] || countryCities[postalIndex];
      const postalNumber = countryIndex * 10 + postalIndex + 1;
      push(makeRecord({
        id: `scale:postal:${String(postalNumber).padStart(3, '0')}`,
        slug: `scale-test-postal-area-${String(postalNumber).padStart(3, '0')}`,
        name: `Scale Test Postal Area ${String(postalNumber).padStart(3, '0')}`,
        type: 'postal-area',
        parentId: parent.id,
        country: spec.name,
        postalCode: postalIndex === 0
          ? 'SCALE-0001'
          : `SCALE-${countryIndex + 1}-${String(postalIndex + 1).padStart(2, '0')}`,
        relationship: RELATIONSHIPS[sequence % RELATIONSHIPS.length],
      }));
      sequence += 1;
    }
  }

  return records;
}

const records = createDataset();

export const SCALE_TEST_GEOGRAPHIC_DATASET = Object.freeze({
  datasetKind: 'synthetic-geographic-scale-test-only',
  coverageNote: 'Deterministic synthetic hierarchy for resolver, page-model, and performance tests only. It is not a complete gazetteer and does not establish any business presence, service availability, or indexing approval.',
  records: Object.freeze(records),
});

export const SCALE_TEST_EXPECTED_RECORD_COUNT = 700;
