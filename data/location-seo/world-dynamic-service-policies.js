import { AVIATION_REGULATORY_CONTEXTS } from './aviation-regulatory-contexts.js';
import { getIndiaDynamicServicePolicy } from './india-dynamic-service-policies.js';

const WORLDWIDE_INFORMATIONAL_SERVICE = Object.freeze({
  mode: 'informational',
  localDeliveryClaimAllowed: false,
  contentSource: 'https://weoneaviation.in/pilot-training-in-india',
});

export function getGeographicDynamicServicePolicy(service, location) {
  if (!service || !location?.countryCode) return null;
  if (location.countryCode === 'IN') {
    return getIndiaDynamicServicePolicy(service, location);
  }
  if (service.slug !== 'pilot-training') return null;
  const regulator = Object.values(AVIATION_REGULATORY_CONTEXTS)
    .find(({ countryCode }) => countryCode === location.countryCode);
  return regulator ? WORLDWIDE_INFORMATIONAL_SERVICE : null;
}
