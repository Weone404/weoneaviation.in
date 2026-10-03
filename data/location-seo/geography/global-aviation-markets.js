const GEO_NAMES_SOURCE = Object.freeze({
  href: 'https://download.geonames.org/export/dump/',
  publisher: 'GeoNames',
  title: 'GeoNames geographic database',
  scope: 'Secondary gazetteer reference for geographic names and hierarchy; it does not establish aviation activity.',
  reviewedAt: '2026-10-03',
  license: 'Creative Commons Attribution 4.0',
});

const ADMINISTRATIVE_SOURCES = Object.freeze({
  IN: Object.freeze({
    href: 'https://censusindia.gov.in/census.website/',
    publisher: 'Office of the Registrar General & Census Commissioner, India',
    title: 'Census of India',
    scope: 'Official administrative geography reference.',
    reviewedAt: '2026-10-03',
  }),
  US: Object.freeze({
    href: 'https://www.census.gov/programs-surveys/geography.html',
    publisher: 'United States Census Bureau',
    title: 'Geography program',
    scope: 'Official state and place geography reference.',
    reviewedAt: '2026-10-03',
  }),
  GB: Object.freeze({
    href: 'https://www.ons.gov.uk/methodology/geography',
    publisher: 'Office for National Statistics',
    title: 'Geography',
    scope: 'Official UK geography reference.',
    reviewedAt: '2026-10-03',
  }),
  CA: Object.freeze({
    href: 'https://www.statcan.gc.ca/en/subjects-start/geography',
    publisher: 'Statistics Canada',
    title: 'Geography',
    scope: 'Official Canadian geography reference.',
    reviewedAt: '2026-10-03',
  }),
  AU: Object.freeze({
    href: 'https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs',
    publisher: 'Australian Bureau of Statistics',
    title: 'Australian Statistical Geography Standard',
    scope: 'Official Australian geography reference.',
    reviewedAt: '2026-10-03',
  }),
  AE: Object.freeze({
    href: 'https://u.ae/en/about-the-uae/the-seven-emirates',
    publisher: 'United Arab Emirates Government',
    title: 'The seven emirates',
    scope: 'Official emirate geography reference.',
    reviewedAt: '2026-10-03',
  }),
});

const regions = [
  ['IN', 'India', 'geo:country:india', 'Karnataka', 'state'],
  ['IN', 'India', 'geo:country:india', 'Telangana', 'state'],
  ['IN', 'India', 'geo:country:india', 'Tamil Nadu', 'state'],
  ['IN', 'India', 'geo:country:india', 'West Bengal', 'state'],
  ['IN', 'India', 'geo:country:india', 'Gujarat', 'state'],
  ['IN', 'India', 'geo:country:india', 'Kerala', 'state'],
  ['IN', 'India', 'geo:country:india', 'Punjab', 'state'],
  ['IN', 'India', 'geo:country:india', 'Rajasthan', 'state'],
  ['IN', 'India', 'geo:country:india', 'Assam', 'state'],
  ['IN', 'India', 'geo:country:india', 'Uttarakhand', 'state'],
  ['IN', 'India', 'geo:country:india', 'Chhattisgarh', 'state'],
  ['IN', 'India', 'geo:country:india', 'Madhya Pradesh', 'state'],
  ['IN', 'India', 'geo:country:india', 'Goa', 'state'],
  ['IN', 'India', 'geo:country:india', 'Odisha', 'state'],
  ['IN', 'India', 'geo:country:india', 'Jammu and Kashmir', 'state'],
  ['IN', 'India', 'geo:country:india', 'Jharkhand', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'California', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Florida', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Texas', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Illinois', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Washington', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Colorado', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Arizona', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Georgia', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Massachusetts', 'state'],
  ['US', 'United States', 'geo:country:united-states', 'Nevada', 'state'],
  ['GB', 'United Kingdom', 'geo:region:england', 'Greater Manchester', 'region'],
  ['GB', 'United Kingdom', 'geo:region:england', 'West Midlands', 'region'],
  ['GB', 'United Kingdom', 'geo:country:united-kingdom', 'Scotland', 'region'],
  ['CA', 'Canada', 'geo:country:canada', 'British Columbia', 'province'],
  ['CA', 'Canada', 'geo:country:canada', 'Quebec', 'province'],
  ['CA', 'Canada', 'geo:country:canada', 'Alberta', 'province'],
  ['AU', 'Australia', 'geo:country:australia', 'Victoria', 'state'],
  ['AU', 'Australia', 'geo:country:australia', 'Queensland', 'state'],
  ['AU', 'Australia', 'geo:country:australia', 'Western Australia', 'state'],
  ['AU', 'Australia', 'geo:country:australia', 'South Australia', 'state'],
  ['AE', 'United Arab Emirates', 'geo:country:united-arab-emirates', 'Emirate of Sharjah', 'region'],
];

const cities = [
  ['IN', 'India', 'geo:state:in-karnataka', 'Bengaluru'],
  ['IN', 'India', 'geo:state:in-telangana', 'Hyderabad'],
  ['IN', 'India', 'geo:state:in-tamil-nadu', 'Chennai'],
  ['IN', 'India', 'geo:state:in-west-bengal', 'Kolkata'],
  ['IN', 'India', 'geo:state:in-gujarat', 'Ahmedabad'],
  ['IN', 'India', 'geo:state:in-kerala', 'Thiruvananthapuram'],
  ['IN', 'India', 'geo:state:in-kerala', 'Kochi'],
  ['IN', 'India', 'geo:state:in-rajasthan', 'Jaipur'],
  ['IN', 'India', 'geo:state:in-assam', 'Guwahati'],
  ['IN', 'India', 'geo:state:in-punjab', 'Amritsar'],
  ['IN', 'India', 'geo:state:in-tamil-nadu', 'Coimbatore'],
  ['IN', 'India', 'geo:state:in-west-bengal', 'Bagdogra'],
  ['IN', 'India', 'geo:state:in-west-bengal', 'Panagarh'],
  ['IN', 'India', 'geo:state:in-west-bengal', 'Barrackpore'],
  ['IN', 'India', 'geo:state:in-jharkhand', 'Ranchi'],
  ['IN', 'India', 'geo:state:in-jharkhand', 'Deoghar'],
  ['IN', 'India', 'geo:state:in-kerala', 'Kozhikode'],
  ['IN', 'India', 'geo:region:uttar-pradesh', 'Agra'],
  ['IN', 'India', 'geo:state:in-uttarakhand', 'Dehradun'],
  ['IN', 'India', 'geo:state:in-jammu-and-kashmir', 'Srinagar'],
  ['IN', 'India', 'geo:state:in-chhattisgarh', 'Raipur'],
  ['IN', 'India', 'geo:region:uttar-pradesh', 'Varanasi'],
  ['IN', 'India', 'geo:state:in-madhya-pradesh', 'Bhopal'],
  ['IN', 'India', 'geo:state:in-madhya-pradesh', 'Indore'],
  ['IN', 'India', 'geo:state:in-karnataka', 'Mangaluru'],
  ['IN', 'India', 'geo:region:maharashtra', 'Nagpur'],
  ['IN', 'India', 'geo:state:in-gujarat', 'Vadodara'],
  ['IN', 'India', 'geo:state:in-gujarat', 'Surat'],
  ['IN', 'India', 'geo:state:in-karnataka', 'Mysuru'],
  ['IN', 'India', 'geo:state:in-goa', 'Panaji'],
  ['IN', 'India', 'geo:state:in-odisha', 'Bhubaneswar'],
  ['US', 'United States', 'geo:state:us-california', 'Los Angeles'],
  ['US', 'United States', 'geo:state:us-florida', 'Miami'],
  ['US', 'United States', 'geo:state:us-texas', 'Dallas'],
  ['US', 'United States', 'geo:state:us-texas', 'Houston'],
  ['US', 'United States', 'geo:state:us-illinois', 'Chicago'],
  ['US', 'United States', 'geo:state:us-florida', 'Orlando'],
  ['US', 'United States', 'geo:state:us-california', 'San Francisco'],
  ['US', 'United States', 'geo:state:us-washington', 'Seattle'],
  ['US', 'United States', 'geo:state:us-colorado', 'Denver'],
  ['US', 'United States', 'geo:state:us-arizona', 'Phoenix'],
  ['US', 'United States', 'geo:state:us-georgia', 'Atlanta'],
  ['US', 'United States', 'geo:state:us-massachusetts', 'Boston'],
  ['US', 'United States', 'geo:state:us-nevada', 'Las Vegas'],
  ['GB', 'United Kingdom', 'geo:region:gb-greater-manchester', 'Manchester'],
  ['GB', 'United Kingdom', 'geo:region:gb-west-midlands', 'Birmingham'],
  ['GB', 'United Kingdom', 'geo:region:gb-scotland', 'Edinburgh'],
  ['GB', 'United Kingdom', 'geo:region:gb-scotland', 'Glasgow'],
  ['CA', 'Canada', 'geo:province:ca-british-columbia', 'Vancouver'],
  ['CA', 'Canada', 'geo:province:ca-quebec', 'Montreal'],
  ['CA', 'Canada', 'geo:province:ca-alberta', 'Calgary'],
  ['CA', 'Canada', 'geo:province:ontario', 'Ottawa'],
  ['AU', 'Australia', 'geo:state:au-victoria', 'Melbourne'],
  ['AU', 'Australia', 'geo:state:au-queensland', 'Brisbane'],
  ['AU', 'Australia', 'geo:state:au-western-australia', 'Perth'],
  ['AU', 'Australia', 'geo:state:au-south-australia', 'Adelaide'],
  ['AE', 'United Arab Emirates', 'geo:region:ae-emirate-of-sharjah', 'Sharjah'],
];

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function createRecord({ id, slug, name, country, countryCode, type, parentId }) {
  const sources = [GEO_NAMES_SOURCE, ADMINISTRATIVE_SOURCES[countryCode]];
  return {
    id,
    slug,
    name,
    canonicalName: name,
    aliases: [],
    country,
    countryCode,
    type,
    parentId,
    parentIds: [],
    relatedLocationIds: [],
    postalCodes: [],
    source: sources.map(({ publisher }) => publisher).join('; '),
    sourceUrl: GEO_NAMES_SOURCE.href,
    sourceDate: null,
    sourceAttribution: sources
      .map(({ publisher, title, license }) => `${publisher}: ${title}${license ? ` (${license})` : ''}`)
      .join('; '),
    sourceLinks: sources,
    status: 'sourced',
  };
}

const regionRecords = regions.map(([countryCode, country, parentId, name, type]) => {
  const slug = slugify(name);
  const countryPrefix = countryCode.toLowerCase();
  return createRecord({
    id: `geo:${type}:${countryPrefix}-${slug}`,
    slug: `${countryPrefix}-${slug}`,
    name,
    country,
    countryCode,
    type,
    parentId,
  });
});

const cityRecords = cities.map(([countryCode, country, parentId, name]) => {
  const slug = slugify(name);
  return createRecord({
    id: `geo:city:${countryCode.toLowerCase()}-${slug}`,
    slug,
    name,
    country,
    countryCode,
    type: 'city',
    parentId,
  });
});

export const GLOBAL_AVIATION_MARKET_GEOGRAPHY = Object.freeze([
  ...regionRecords,
  ...cityRecords,
]);
