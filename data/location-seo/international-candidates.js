import { SERVICES } from './services.js';

const notVerifiedReason =
  'No verified city-specific training delivery, partner, local regulatory source, or distinct student requirement is documented. The existing material explains the Indian DGCA pathway, not local training service in this city.';

export const INTERNATIONAL_LOCATION_CANDIDATES = [
  {
    slug: 'new-york-city',
    city: 'New York City',
    state: 'New York',
    country: 'United States',
  },
  {
    slug: 'dubai',
    city: 'Dubai',
    state: 'Dubai',
    country: 'United Arab Emirates',
  },
  {
    slug: 'london',
    city: 'London',
    state: 'England',
    country: 'United Kingdom',
  },
].map(({ slug, city, state, country }) => ({
  slug,
  city,
  state,
  country,
  stateSlug: state.toLowerCase().replace(/\s+/g, '-'),
  countrySlug: country.toLowerCase().replace(/\s+/g, '-'),
  locationType: 'city',
  relationship: 'informational',
  physicalAcademy: false,
  onlineTraining: false,
  flightTrainingGuidance: false,
  indexable: false,
  supportedServices: [],
  rejectedServices: Object.fromEntries(
    SERVICES.map((service) => [service.slug, notVerifiedReason]),
  ),
  nearbyLocations: [],
  relatedLocations: [],
  localFAQs: [],
  sourcePages: [
    '/pilot-training-in-india',
    '/pilot-training-abroad',
    '/blogs/foreign-national-nri-pilot-training-india',
  ],
  indexabilityReview: {
    status: 'not-approved',
    reason: notVerifiedReason,
    onlineAvailabilityVerified: false,
    physicalPresenceVerified: false,
  },
}));
