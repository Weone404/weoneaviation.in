import { SERVICES } from './services.js';
import {
  DGCA_CLASS1_AIR_FORCE_RENEWAL_STATIONS,
  DGCA_CLASS1_CAR_SOURCE,
  DGCA_CLASS1_CENTRE_SOURCE,
  DGCA_CLASS1_CENTRES_AS_OF,
  DGCA_CLASS1_CIVIL_CENTRES,
} from './medical-centres.js';

export const INDIA_CANDIDATE_RESEARCH_AS_OF = '29 September 2026';
export const INDIA_CANDIDATE_RESEARCH_SOURCE =
  'data/local-seo/india-city-research.json';

const INDEXABILITY_REASON =
  'The repository has no verified city-specific We One Aviation classroom, cohort, partner or service commitment, and no sufficiently distinct local student pathway. Search-result snapshots and independent medical-centre listings do not establish service delivery or, by themselves, support an indexable training page.';

const SERVICE_REJECTION_REASONS = {
  'pilot-school':
    'We One Aviation does not operate a flying school. No candidate-city flying school or partner relationship is asserted by this dataset.',
  'pilot-training':
    'No city-specific training delivery or distinct, locally useful student pathway is verified. Generic online access and the national DGCA pathway do not establish a city service.',
  'dgca-ground-classes':
    'No local classroom, city-specific batch or locally distinct online cohort is verified for this city.',
  'commercial-pilot-training':
    'No city-specific commercial-training delivery or distinct local CPL pathway is verified; the national licensing sequence is already covered by authority pages.',
  'cpl-training':
    'No city-specific CPL delivery or distinct local eligibility, medical or flying pathway is verified; a city page would repeat national guidance.',
};

const CANDIDATE_CITIES = [
  { slug: 'ahmedabad', city: 'Ahmedabad', state: 'Gujarat' },
  { slug: 'chandigarh', city: 'Chandigarh', state: 'Chandigarh' },
  { slug: 'jaipur', city: 'Jaipur', state: 'Rajasthan', serpReview: 'FULLY_RESEARCHED' },
  { slug: 'lucknow', city: 'Lucknow', state: 'Uttar Pradesh', serpReview: 'FULLY_RESEARCHED' },
  { slug: 'kolkata', city: 'Kolkata', state: 'West Bengal', serpReview: 'FULLY_RESEARCHED' },
  { slug: 'kochi', city: 'Kochi', state: 'Kerala' },
  { slug: 'thiruvananthapuram', city: 'Thiruvananthapuram', state: 'Kerala' },
  { slug: 'bhopal', city: 'Bhopal', state: 'Madhya Pradesh' },
  { slug: 'indore', city: 'Indore', state: 'Madhya Pradesh' },
  { slug: 'nagpur', city: 'Nagpur', state: 'Maharashtra' },
  { slug: 'patna', city: 'Patna', state: 'Bihar' },
  { slug: 'bhubaneswar', city: 'Bhubaneswar', state: 'Odisha' },
  { slug: 'guwahati', city: 'Guwahati', state: 'Assam', serpReview: 'FULLY_RESEARCHED' },
  { slug: 'coimbatore', city: 'Coimbatore', state: 'Tamil Nadu' },
  { slug: 'visakhapatnam', city: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { slug: 'panaji', city: 'Panaji', state: 'Goa' },
  { slug: 'surat', city: 'Surat', state: 'Gujarat' },
  { slug: 'vadodara', city: 'Vadodara', state: 'Gujarat' },
  { slug: 'nashik', city: 'Nashik', state: 'Maharashtra' },
  { slug: 'mysuru', city: 'Mysuru', state: 'Karnataka' },
  { slug: 'mangaluru', city: 'Mangaluru', state: 'Karnataka' },
  { slug: 'dehradun', city: 'Dehradun', state: 'Uttarakhand' },
  { slug: 'ranchi', city: 'Ranchi', state: 'Jharkhand' },
  { slug: 'raipur', city: 'Raipur', state: 'Chhattisgarh' },
  { slug: 'varanasi', city: 'Varanasi', state: 'Uttar Pradesh' },
  { slug: 'amritsar', city: 'Amritsar', state: 'Punjab' },
  { slug: 'srinagar', city: 'Srinagar', state: 'Jammu and Kashmir' },
  { slug: 'jammu', city: 'Jammu', state: 'Jammu and Kashmir' },
  { slug: 'agra', city: 'Agra', state: 'Uttar Pradesh' },
  { slug: 'kanpur', city: 'Kanpur', state: 'Uttar Pradesh' },
];

const SERVICE_MATRIX_SLUGS = [
  'pilot-training',
  'dgca-ground-classes',
  'commercial-pilot-training',
  'cpl-training',
];

const LOCALIZED_SERVICES = SERVICES
  .filter((service) => SERVICE_MATRIX_SLUGS.includes(service.slug));

function cityMatches(recordCity, city) {
  return recordCity.toLowerCase().split(',')[0].trim() === city.toLowerCase();
}

function makeCandidate(cityRecord) {
  const civilMedicalCentres = DGCA_CLASS1_CIVIL_CENTRES
    .filter((centre) => cityMatches(centre.city, cityRecord.city));
  const airForceRenewalStations = DGCA_CLASS1_AIR_FORCE_RENEWAL_STATIONS
    .filter((station) => cityMatches(station.city, cityRecord.city));

  const evidence = {
    marketResearch: {
      source: INDIA_CANDIDATE_RESEARCH_SOURCE,
      observedAt: INDIA_CANDIDATE_RESEARCH_AS_OF,
      status: cityRecord.serpReview || 'QUERY_MATRIX_ONLY',
      searchIntentStatus: cityRecord.serpReview ? 'OBSERVED' : 'UNKNOWN',
      projectResearchStatus: cityRecord.serpReview || 'NOT_RESEARCHED',
      note: cityRecord.serpReview
        ? 'A four-query Google snapshot recorded local aviation/course listings. This indicates observed search results only, not demand, accuracy of the listings, or We One Aviation service availability.'
        : 'The market inventory records query-matrix observations, but no complete city-specific intent assessment is approved for this record. Search snapshots are not demand evidence.',
    },
    aviationEcosystem:
      'No city-specific aviation-ecosystem assessment from a primary aviation source is recorded in the location SEO data. Search-result listings are not verified operator, facility or approval evidence.',
    airportContext:
      'No airport-specific fact has been verified for this candidate in the location SEO source records; no airport or flying-base claim is used.',
    dgcaMedical: {
      source: civilMedicalCentres.length || airForceRenewalStations.length
        ? (civilMedicalCentres.length ? DGCA_CLASS1_CENTRE_SOURCE.url : DGCA_CLASS1_CAR_SOURCE.url)
        : null,
      asOf: civilMedicalCentres.length ? DGCA_CLASS1_CENTRES_AS_OF : null,
      civilCentres: civilMedicalCentres.map(({ name, city, note }) => ({ name, city, scope: note })),
      airForceRenewalStations: airForceRenewalStations.map(({ name, city }) => ({ name, city })),
      note: civilMedicalCentres.length || airForceRenewalStations.length
        ? 'A listed medical facility or renewal station is not a We One Aviation location, training provider, or evidence of a local training market.'
        : 'No exact city match was found in the currently transcribed DGCA Class 1 civil-centre and CAR Air Force renewal entries. This is not proof that no medical service exists there.',
    },
    trainingRelevance:
      'The academy’s documented classroom is in Dwarka, Delhi. Published online-batch information for students outside Delhi is general and does not verify city-specific delivery, enrolment, a local cohort, or a service area.',
    studentPathway:
      'The project documents the national DGCA licensing pathway, but no city-specific regulatory step or student requirement is recorded for this candidate.',
    contentAssessment:
      'The available evidence does not support a meaningfully distinct location-service page without relying on generic copy or unverified local claims.',
  };

  const rejectedServices = Object.fromEntries(
    LOCALIZED_SERVICES.map((service) => [
      service.slug,
      SERVICE_REJECTION_REASONS[service.slug],
    ]),
  );
  rejectedServices['pilot-school'] = SERVICE_REJECTION_REASONS['pilot-school'];

  return {
    slug: cityRecord.slug,
    city: cityRecord.city,
    state: cityRecord.state,
    country: 'India',
    stateSlug: cityRecord.state.toLowerCase().replace(/\s+/g, '-'),
    countrySlug: 'india',
    locationType: 'city',
    relationship: 'informational',
    physicalAcademy: false,
    onlineTraining: false,
    flightTrainingGuidance: false,
    nearbyLocations: [],
    evidenceSummary: [
      evidence.marketResearch.note,
      evidence.aviationEcosystem,
      evidence.airportContext,
      evidence.dgcaMedical.note,
      evidence.trainingRelevance,
      evidence.studentPathway,
    ].join(' '),
    evidence,
    sourceDate: INDIA_CANDIDATE_RESEARCH_AS_OF,
    geographicVerification:
      'Research-only geographic identity from data/local-seo/india-city-research.json; its report cautions that administrative names were not independently authenticated against the cited government schedules in that research session.',
    supportedServices: [],
    indexable: false,
    serviceMatrix: Object.fromEntries(
      LOCALIZED_SERVICES.map((service) => [
        service.slug,
        {
          supported: false,
          reason: SERVICE_REJECTION_REASONS[service.slug],
        },
      ]),
    ),
    rejectedServices,
    sourcePages: [
      '/pilot-training-in-india',
      '/dgca-class-2-class-1-medical',
      '/about-us',
    ],
    localFAQs: [],
    indexabilityReview: {
      status: 'not-approved',
      reviewedAt: INDIA_CANDIDATE_RESEARCH_AS_OF,
      reason: INDEXABILITY_REASON,
    },
  };
}

export const INDIA_LOCATION_CANDIDATES = CANDIDATE_CITIES.map(makeCandidate);

export const INDIA_LOCATION_CANDIDATE_SOURCES = [
  {
    name: 'Project India city and SERP research inventory',
    path: INDIA_CANDIDATE_RESEARCH_SOURCE,
    observedAt: INDIA_CANDIDATE_RESEARCH_AS_OF,
    limitation:
      'Market inclusion and localized result listings are research signals only; city intent classifications may remain unknown and do not verify service delivery.',
  },
  {
    name: 'DGCA Class 1 medical-centre inventory',
    url: DGCA_CLASS1_CENTRE_SOURCE.url,
    asOf: DGCA_CLASS1_CENTRES_AS_OF,
    limitation:
      'Only the currently transcribed city entries are exposed here; verify the live DGCA inventory before relying on a medical listing.',
  },
  {
    name: 'DGCA Civil Aviation Requirement, medical requirements',
    url: DGCA_CLASS1_CAR_SOURCE.url,
    verifiedOn: '17 September 2026',
    limitation:
      'Air Force station entries are classified as renewal stations in the project source; do not present them as a local training facility or general initial-issue option.',
  },
];
