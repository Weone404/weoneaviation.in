import { REAL_GEOGRAPHIC_SAMPLE } from './real-sample.js';
import { GLOBAL_AVIATION_MARKET_GEOGRAPHY } from './global-aviation-markets.js';

const REVIEWED_AT = '2026-10-03';
const GEONAMES_SOURCE = Object.freeze({
  href: 'https://download.geonames.org/export/dump/',
  publisher: 'GeoNames',
  title: 'GeoNames geographic database',
  scope: 'Secondary gazetteer reference for place names and geographic hierarchy; not evidence of aviation or business services.',
  reviewedAt: REVIEWED_AT,
  license: 'Creative Commons Attribution 4.0',
});

function officialSource(href, publisher, title, scope) {
  return Object.freeze({
    href,
    publisher,
    title,
    scope,
    reviewedAt: REVIEWED_AT,
  });
}

const COUNTRY_SOURCES = {
  Singapore: officialSource(
    'https://www.singstat.gov.sg/',
    'Singapore Department of Statistics',
    'Singapore official statistics',
    'Official national statistical reference; GeoNames supplies the sample place and coordinate records.',
  ),
  'United Arab Emirates': officialSource(
    'https://u.ae/en/about-the-uae/the-seven-emirates',
    'United Arab Emirates Government',
    'The seven emirates',
    'Official UAE government reference for emirate names; GeoNames supplies the sample place and coordinate records.',
  ),
  France: officialSource(
    'https://www.insee.fr/en/information/2114819',
    'INSEE, National Institute of Statistics and Economic Studies',
    'Geographical code',
    'Official French administrative geography reference; GeoNames supplies the sample place and coordinate records.',
  ),
  Germany: officialSource(
    'https://www.destatis.de/EN/Themes/Countries-Regions/Regional-Statistics/Regional-Statistics.html',
    'Federal Statistical Office of Germany',
    'Regional statistics',
    'Official German regional-statistics reference; GeoNames supplies the sample place and coordinate records.',
  ),
  Japan: officialSource(
    'https://www.stat.go.jp/english/data/handbook/c0117.html',
    'Statistics Bureau of Japan',
    'Administrative division',
    'Official Japanese statistical reference for administrative divisions; GeoNames supplies the sample place and coordinate records.',
  ),
};
const AMETHI_SOURCE = officialSource(
  'https://amethi.nic.in/',
  'Amethi District Administration',
  'Official Amethi district portal',
  'Official district reference; GeoNames supplies the Fursatganj place record.',
);

function record({
  id,
  slug,
  name,
  type,
  country,
  countryCode,
  parentId = null,
  aliases = [],
  latitude = null,
  longitude = null,
  timezone = null,
  sourceLinks,
}) {
  const sources = sourceLinks || [
    GEONAMES_SOURCE,
    ...(COUNTRY_SOURCES[country] ? [COUNTRY_SOURCES[country]] : []),
  ];
  return {
    id,
    slug,
    name,
    canonicalName: name,
    aliases,
    country,
    countryCode,
    type,
    parentId,
    parentIds: [],
    relatedLocationIds: [],
    latitude,
    longitude,
    timezone,
    source: sources.map(({ publisher }) => publisher).join('; '),
    sourceUrl: sources[0].href,
    sourceDate: null,
    sourceAttribution: sources
      .map(({ publisher, title, license }) => (
        `${publisher}: ${title}${license ? ` (${license})` : ''}`
      ))
      .join('; '),
    sourceLinks: sources,
    status: 'sourced',
  };
}

const additionalRecords = [
  record({
    id: 'geo:country:singapore',
    slug: 'singapore',
    name: 'Singapore',
    type: 'country',
    country: 'Singapore',
    countryCode: 'SG',
    aliases: ['Republic of Singapore'],
    timezone: 'Asia/Singapore',
    sourceLinks: [COUNTRY_SOURCES.Singapore, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:region:singapore-central',
    slug: 'singapore-central-region',
    name: 'Central Region',
    type: 'region',
    country: 'Singapore',
    countryCode: 'SG',
    parentId: 'geo:country:singapore',
    timezone: 'Asia/Singapore',
    sourceLinks: [COUNTRY_SOURCES.Singapore, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:singapore',
    slug: 'singapore-city',
    name: 'Singapore City',
    type: 'city',
    country: 'Singapore',
    countryCode: 'SG',
    parentId: 'geo:region:singapore-central',
    latitude: 1.3521,
    longitude: 103.8198,
    timezone: 'Asia/Singapore',
  }),
  record({
    id: 'geo:district:amethi',
    slug: 'amethi-district',
    name: 'Amethi District',
    type: 'district',
    country: 'India',
    countryCode: 'IN',
    parentId: 'geo:region:uttar-pradesh',
    sourceLinks: [AMETHI_SOURCE, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:town:fursatganj',
    slug: 'fursatganj',
    name: 'Fursatganj',
    type: 'town',
    country: 'India',
    countryCode: 'IN',
    parentId: 'geo:district:amethi',
    timezone: 'Asia/Kolkata',
    sourceLinks: [AMETHI_SOURCE, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:locality:singapore-changi',
    slug: 'changi',
    name: 'Changi',
    type: 'locality',
    country: 'Singapore',
    countryCode: 'SG',
    parentId: 'geo:city:singapore',
    latitude: 1.3644,
    longitude: 103.9915,
    timezone: 'Asia/Singapore',
  }),
  record({
    id: 'geo:country:united-arab-emirates',
    slug: 'united-arab-emirates',
    name: 'United Arab Emirates',
    type: 'country',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    aliases: ['UAE'],
    timezone: 'Asia/Dubai',
    sourceLinks: [COUNTRY_SOURCES['United Arab Emirates'], GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:region:uae-dubai',
    slug: 'dubai-emirate',
    name: 'Emirate of Dubai',
    type: 'region',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    parentId: 'geo:country:united-arab-emirates',
    timezone: 'Asia/Dubai',
    sourceLinks: [COUNTRY_SOURCES['United Arab Emirates'], GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:dubai',
    slug: 'dubai',
    name: 'Dubai',
    type: 'city',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    parentId: 'geo:region:uae-dubai',
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: 'Asia/Dubai',
  }),
  record({
    id: 'geo:region:uae-abu-dhabi',
    slug: 'abu-dhabi-emirate',
    name: 'Abu Dhabi Emirate',
    type: 'region',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    parentId: 'geo:country:united-arab-emirates',
    timezone: 'Asia/Dubai',
    sourceLinks: [COUNTRY_SOURCES['United Arab Emirates'], GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:abu-dhabi',
    slug: 'abu-dhabi',
    name: 'Abu Dhabi',
    type: 'city',
    country: 'United Arab Emirates',
    countryCode: 'AE',
    parentId: 'geo:region:uae-abu-dhabi',
    latitude: 24.4539,
    longitude: 54.3773,
    timezone: 'Asia/Dubai',
  }),
  record({
    id: 'geo:country:france',
    slug: 'france',
    name: 'France',
    type: 'country',
    country: 'France',
    countryCode: 'FR',
    aliases: ['French Republic'],
    timezone: 'Europe/Paris',
    sourceLinks: [COUNTRY_SOURCES.France, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:region:ile-de-france',
    slug: 'ile-de-france',
    name: 'Île-de-France',
    type: 'region',
    country: 'France',
    countryCode: 'FR',
    parentId: 'geo:country:france',
    aliases: ['Ile-de-France'],
    timezone: 'Europe/Paris',
    sourceLinks: [COUNTRY_SOURCES.France, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:paris',
    slug: 'paris',
    name: 'Paris',
    type: 'city',
    country: 'France',
    countryCode: 'FR',
    parentId: 'geo:region:ile-de-france',
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: 'Europe/Paris',
  }),
  record({
    id: 'geo:region:auvergne-rhone-alpes',
    slug: 'auvergne-rhone-alpes',
    name: 'Auvergne-Rhône-Alpes',
    type: 'region',
    country: 'France',
    countryCode: 'FR',
    parentId: 'geo:country:france',
    timezone: 'Europe/Paris',
    sourceLinks: [COUNTRY_SOURCES.France, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:lyon',
    slug: 'lyon',
    name: 'Lyon',
    type: 'city',
    country: 'France',
    countryCode: 'FR',
    parentId: 'geo:region:auvergne-rhone-alpes',
    latitude: 45.764,
    longitude: 4.8357,
    timezone: 'Europe/Paris',
  }),
  record({
    id: 'geo:country:germany',
    slug: 'germany',
    name: 'Germany',
    type: 'country',
    country: 'Germany',
    countryCode: 'DE',
    aliases: ['Federal Republic of Germany'],
    timezone: 'Europe/Berlin',
    sourceLinks: [COUNTRY_SOURCES.Germany, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:region:germany-berlin',
    slug: 'berlin-state',
    name: 'Berlin State',
    type: 'region',
    country: 'Germany',
    countryCode: 'DE',
    parentId: 'geo:country:germany',
    timezone: 'Europe/Berlin',
    sourceLinks: [COUNTRY_SOURCES.Germany, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:berlin',
    slug: 'berlin',
    name: 'Berlin',
    type: 'city',
    country: 'Germany',
    countryCode: 'DE',
    parentId: 'geo:region:germany-berlin',
    latitude: 52.52,
    longitude: 13.405,
    timezone: 'Europe/Berlin',
  }),
  record({
    id: 'geo:region:germany-bavaria',
    slug: 'bavaria',
    name: 'Bavaria',
    type: 'region',
    country: 'Germany',
    countryCode: 'DE',
    parentId: 'geo:country:germany',
    timezone: 'Europe/Berlin',
    sourceLinks: [COUNTRY_SOURCES.Germany, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:munich',
    slug: 'munich',
    name: 'Munich',
    type: 'city',
    country: 'Germany',
    countryCode: 'DE',
    parentId: 'geo:region:germany-bavaria',
    latitude: 48.1351,
    longitude: 11.582,
    timezone: 'Europe/Berlin',
  }),
  record({
    id: 'geo:country:japan',
    slug: 'japan',
    name: 'Japan',
    type: 'country',
    country: 'Japan',
    countryCode: 'JP',
    aliases: ['Nippon'],
    timezone: 'Asia/Tokyo',
    sourceLinks: [COUNTRY_SOURCES.Japan, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:region:japan-tokyo',
    slug: 'tokyo-metropolis',
    name: 'Tokyo Metropolis',
    type: 'region',
    country: 'Japan',
    countryCode: 'JP',
    parentId: 'geo:country:japan',
    timezone: 'Asia/Tokyo',
    sourceLinks: [COUNTRY_SOURCES.Japan, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:tokyo',
    slug: 'tokyo',
    name: 'Tokyo',
    type: 'city',
    country: 'Japan',
    countryCode: 'JP',
    parentId: 'geo:region:japan-tokyo',
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: 'Asia/Tokyo',
  }),
  record({
    id: 'geo:region:japan-osaka',
    slug: 'osaka-prefecture',
    name: 'Osaka Prefecture',
    type: 'region',
    country: 'Japan',
    countryCode: 'JP',
    parentId: 'geo:country:japan',
    timezone: 'Asia/Tokyo',
    sourceLinks: [COUNTRY_SOURCES.Japan, GEONAMES_SOURCE],
  }),
  record({
    id: 'geo:city:osaka',
    slug: 'osaka',
    name: 'Osaka',
    type: 'city',
    country: 'Japan',
    countryCode: 'JP',
    parentId: 'geo:region:japan-osaka',
    latitude: 34.6937,
    longitude: 135.5023,
    timezone: 'Asia/Tokyo',
  }),
];

function createAncestors(records) {
  const byId = new Map(records.map((item) => [item.id, item]));
  for (const item of records) {
    const parentIds = [];
    let parent = item.parentId ? byId.get(item.parentId) : null;
    while (parent) {
      parentIds.unshift(parent.id);
      parent = parent.parentId ? byId.get(parent.parentId) : null;
    }
    item.parentIds = parentIds;
  }
}

function createChildReferences(records) {
  const byId = new Map(records.map((item) => [item.id, { ...item, childrenIds: [] }]));
  for (const item of byId.values()) {
    if (item.parentId && byId.has(item.parentId)) {
      byId.get(item.parentId).childrenIds.push(item.id);
    }
  }
  return [...byId.values()].map((item) => ({
    ...item,
    childrenIds: item.childrenIds.sort(),
  }));
}

const combined = [
  ...REAL_GEOGRAPHIC_SAMPLE.records.map((item) => ({
    ...item,
    timezone: item.timezone || null,
    sourceAttribution: item.sourceAttribution
      || item.sourceLinks.map(({ publisher, title, license }) => (
        `${publisher}: ${title}${license ? ` (${license})` : ''}`
      )).join('; '),
  })),
  ...additionalRecords,
  ...GLOBAL_AVIATION_MARKET_GEOGRAPHY,
];
createAncestors(combined);
const records = createChildReferences(combined);

export const GLOBAL_GEOGRAPHIC_PILOT = Object.freeze({
  datasetKind: 'sourced-global-geographic-pilot',
  reviewedAt: REVIEWED_AT,
  coverageComplete: false,
  records: Object.freeze(records),
  attribution: 'GeoNames data is licensed CC BY 4.0; official country statistical sources are attributed per record.',
});
