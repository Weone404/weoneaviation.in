export const INDIA_DYNAMIC_SERVICE_POLICIES = Object.freeze({
  'pilot-training': Object.freeze({
    countryCode: 'IN',
    mode: 'informational',
    localDeliveryClaimAllowed: false,
    contentSource: 'https://weoneaviation.in/pilot-training-in-india',
  }),
  'dgca-ground-classes': Object.freeze({
    countryCode: 'IN',
    mode: 'informational',
    localDeliveryClaimAllowed: false,
    contentSource: 'https://weoneaviation.in/dgca-ground-classes',
  }),
  'commercial-pilot-training': Object.freeze({
    countryCode: 'IN',
    mode: 'informational',
    localDeliveryClaimAllowed: false,
    contentSource: 'https://weoneaviation.in/commercial-pilot-license',
  }),
  'cpl-training': Object.freeze({
    countryCode: 'IN',
    mode: 'informational',
    localDeliveryClaimAllowed: false,
    contentSource: 'https://weoneaviation.in/commercial-pilot-license',
  }),
});

export function getIndiaDynamicServicePolicy(service, record) {
  if (!service || !record) return null;
  const policy = INDIA_DYNAMIC_SERVICE_POLICIES[service.slug];
  return policy && record.countryCode === policy.countryCode ? policy : null;
}
