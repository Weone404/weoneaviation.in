const ADMINISTRATIVE_AREA_TYPES = new Set([
  'state',
  'province',
  'region',
  'county',
  'district',
  'subdistrict',
  'territory',
]);

const POPULATED_PLACE_TYPES = new Set([
  'city',
  'town',
  'village',
  'populated-place',
  'locality',
  'neighborhood',
]);

function hierarchyLabel(hierarchy) {
  return hierarchy.map(({ name, type }) => `${name} (${type})`).join(' > ');
}

function localPlanningGuidance(record, hierarchy) {
  const parent = hierarchy.at(-2) || hierarchy[0];
  const parentLabel = parent ? `${parent.name} (${parent.type})` : record.country;

  if (ADMINISTRATIVE_AREA_TYPES.has(record.type)) {
    return {
      focus: 'administrative-area',
      summary: `The registry classifies this entry as a ${record.type}, nested under ${parentLabel}. It identifies an administrative area, not one address, airport or training base. A student should choose the actual origin point and compare each provider's approved training base and travel arrangements separately.`,
      question: `How should a student use a ${record.type} entry when comparing pilot training?`,
      answer: `This registry entry is a ${record.type} under ${parentLabel}; it is geographic context, not an aviation approval or a training location. Narrow the search to the student's actual starting place, then verify the provider's approved base and licence scope with ${record.country}'s aviation authority.`,
    };
  }

  if (POPULATED_PLACE_TYPES.has(record.type)) {
    return {
      focus: 'populated-place',
      summary: `The registry identifies this entry as a ${record.type} below ${parentLabel}. Use that distinction when comparing the student's home-place with a provider's separately verified ground-school address and flight-training base; this place record does not establish either one.`,
      question: `What does the ${record.type}-to-${parent.type} hierarchy tell a pilot-training applicant?`,
      answer: `It identifies the recorded place and its parent ${parent.type}; it does not show that a school or flight-training base is located there. Compare the student's actual starting point with provider addresses and confirm approvals with ${record.country}'s aviation authority.`,
    };
  }

  return {
    focus: 'other-geographic-level',
    summary: `The registry records this entry at the ${record.type} level, with ${parentLabel} as its immediate parent. Keep the exact hierarchy separate from the choice of school, training base and licensing authority; each provider's location and approval need independent confirmation.`,
    question: `How does this ${record.type} record relate to a pilot-training search?`,
    answer: `It supplies a geographic reference within ${parentLabel}, not evidence of a local school or training base. Confirm where each training stage is delivered and verify the provider's approval with ${record.country}'s aviation authority.`,
  };
}

function aviationEvidenceSummary(airports, country, locationName, coordinates) {
  const pointContext = coordinates
    ? `The gazetteer search is centered on the registry reference point ${coordinates.latitude}, ${coordinates.longitude}. This point does not represent every address in an administrative area.`
    : 'The gazetteer search uses the registry coordinates when available; it does not represent every address in an administrative area.';
  if (!airports.length) {
    return {
      section: `${pointContext} The gazetteer airport search did not return a listed airport within its 100 km straight-line search radius. This is a limit of the dataset and search, not evidence that no airport exists. It does not establish whether flight training is available.`,
      question: `Did the geographic search identify an airport within 100 km of ${locationName}?`,
      answer: `${pointContext} No listed airport was returned within the 100 km straight-line search radius. This is a dataset result, not proof that no airport exists, not a search from every address in the area, and not evidence about an approved flight school. Check current aeronautical information and confirm training approvals with ${country}'s aviation authority.`,
    };
  }

  const listed = airports.map(({ name, distanceKm }) => (
    `${name} (about ${distanceKm} km straight-line)`
  )).join('; ');
  return {
    section: `${pointContext} GeoNames lists these airport points within 100 km straight-line: ${listed}. The distances are estimates between gazetteer coordinates, not route or travel distances. These records establish neither current airport operation nor an approved flight-training provider.`,
    question: `What do the airport records near ${locationName} establish about flight training?`,
    answer: `${pointContext} GeoNames lists ${listed}. The point records and straight-line estimates do not establish current operating status, accessibility, a flying school or training approval. Verify the actual provider, base and licence scope with ${country}'s aviation authority.`,
  };
}

export function buildLocationTrainingContext({
  record,
  hierarchy,
  regulator,
  nearbyAviationPlaces = [],
}) {
  if (!record || !Array.isArray(hierarchy) || !regulator) {
    throw new TypeError('A location, its resolved hierarchy and regulator are required.');
  }
  const locationName = record.canonicalName || record.name;
  const geographicChain = hierarchyLabel(hierarchy);
  const parent = hierarchy.at(-2) || hierarchy[0];
  const planning = localPlanningGuidance(record, hierarchy);
  const aviation = aviationEvidenceSummary(
    nearbyAviationPlaces,
    regulator.country,
    locationName,
    Number.isFinite(record.latitude) && Number.isFinite(record.longitude)
      ? { latitude: record.latitude, longitude: record.longitude }
      : null,
  );
  const timeZone = record.timezone || null;
  const timeZoneSection = timeZone
    ? `The geographic record associates ${locationName} with the time zone ${timeZone}. Use that as a prompt to confirm the time zone shown for any online class or appointment; it does not establish a class schedule or local delivery.`
    : null;
  const timeZoneFaq = timeZone
    ? {
      question: `Which time zone is associated with the ${locationName} registry record?`,
      answer: `The geographic record lists ${timeZone}. Confirm the time zone on any provider's actual class or appointment schedule; this registry field does not establish availability.`,
    }
    : null;
  const jurisdiction = regulator.jurisdiction || regulator.country;
  const regulatorySection = `Pilot licensing for a plan associated with ${locationName} is a ${jurisdiction} matter, administered by ${regulator.authority}. The recorded ${record.type} and parent ${parent?.type || 'country'} identify geography; neither changes the licensing authority nor demonstrates local training provision. Confirm current licence, medical, examination and approved-organisation requirements in the authority's official guidance.`;
  const regulatoryFaq = {
    question: `Which authority governs a pilot licence sought from ${locationName}?`,
    answer: `${regulator.authority} is the authority mapped to ${regulator.country} (${jurisdiction}). The home-place hierarchy does not itself determine a licence; confirm the issuing jurisdiction and current requirements with the authority before choosing training.`,
  };
  const matrix = {
    place: {
      name: locationName,
      type: record.type,
      source: record.source || null,
      sourceUrl: record.sourceUrl || null,
      adminCode: record.adminCode || null,
    },
    hierarchy: hierarchy.map(({ id, name, type, parentId }) => ({
      id,
      name,
      type,
      parentId: parentId || null,
    })),
    hierarchyPath: geographicChain,
    licensingJurisdiction: {
      country: regulator.country,
      jurisdiction,
      authority: regulator.authority,
      source: regulator.source || null,
    },
    nearbyAirportRecords: nearbyAviationPlaces.map(({ id, name, distanceKm, sourceUrl }) => ({
      id,
      name,
      straightLineDistanceKm: distanceKm,
      sourceUrl,
      notEvidenceOfTrainingApproval: true,
    })),
    timeZone,
    localPlanningFocus: planning.focus,
  };
  const identityDetails = [
    record.adminCode ? `Administrative registry code: ${record.adminCode}.` : null,
    record.postalCodes?.length
      ? `Postal codes attached to this record: ${record.postalCodes.join(', ')}.` : null,
    Number.isFinite(record.latitude) && Number.isFinite(record.longitude)
      ? `Registry reference coordinates: ${record.latitude}, ${record.longitude}. These identify the source point, not a service address or travel distance.` : null,
    timeZone ? `Registry time zone: ${timeZone}.` : null,
    record.aliases?.length ? `Recorded aliases: ${record.aliases.join(', ')}.` : null,
  ].filter(Boolean);
  const identitySection = identityDetails.length ? {
    title: `Registry reference details for ${locationName}`,
    body: `${identityDetails.join(' ')} Use these sourced identifiers to check that the selected registry entry matches the intended starting area before comparing providers. They do not establish local training provision or service coverage.`,
    verified: Boolean(record.sourceUrl && /^https:\/\//.test(record.sourceUrl)),
    sourceLinks: record.sourceUrl
      ? [{ href: record.sourceUrl, publisher: record.source || 'Geographic registry' }]
      : [],
  } : null;
  const identityFaq = identityDetails.length ? {
    question: `Which registry details help identify the ${record.type} used in this training search?`,
    answer: `${identityDetails.join(' ')} They identify the geographic record only; compare a student's actual starting address with provider bases separately.`,
  } : null;
  matrix.identityDetails = identityDetails;
  const sections = [
    ...(identitySection ? [identitySection] : []),
    {
      title: `Geographic-to-training decision for ${record.type} records`,
      body: `${planning.summary} Recorded hierarchy: ${geographicChain}.`,
      verified: Boolean(record.sourceUrl && /^https:\/\//.test(record.sourceUrl)),
      sourceLinks: record.sourceUrl
        ? [{ href: record.sourceUrl, publisher: record.source || 'Geographic registry' }]
        : [],
    },
    {
      title: `${regulator.authority} licensing jurisdiction`,
      body: regulatorySection,
      verified: Boolean(regulator.source && /^https:\/\//.test(regulator.source)),
      sourceLinks: [{ href: regulator.source, publisher: regulator.authority }],
    },
    {
      title: `Airport records and training limits near ${locationName}`,
      body: aviation.section,
      verified: nearbyAviationPlaces.length > 0,
      sourceLinks: nearbyAviationPlaces.map(({ sourceUrl, publisher }) => ({
        href: sourceUrl,
        publisher: publisher || 'GeoNames',
      })),
    },
    ...(timeZoneSection ? [{
      title: `Time-zone detail for ${locationName}`,
      body: timeZoneSection,
      verified: Boolean(record.sourceUrl && /^https:\/\//.test(record.sourceUrl)),
      sourceLinks: record.sourceUrl
        ? [{ href: record.sourceUrl, publisher: record.source || 'Geographic registry' }]
        : [],
    }] : []),
  ];
  const faqs = [
    planning,
    regulatoryFaq,
    {
      question: aviation.question,
      answer: aviation.answer,
    },
    ...(identityFaq ? [identityFaq] : []),
    ...(timeZoneFaq ? [timeZoneFaq] : []),
  ];
  const introduction = `This pilot-training guide uses the geographic registry's ${record.type} record for ${locationName} and its resolved parent chain: ${geographicChain}. That distinction helps separate a student's home-place from the provider's training base. The applicable licensing authority is ${regulator.authority} for ${jurisdiction}; the location record does not establish a local school or service.`;
  const pathway = `${planning.summary} First identify the licence-issuing jurisdiction (${regulator.authority}), then check its current eligibility, medical and examination requirements. Next compare approved organisations, their actual ground-learning arrangements and flight-training bases against the student's own starting point. ${aviation.section}`;
  const differentiationText = [
    geographicChain,
    record.type,
    regulator.country,
    jurisdiction,
    regulator.authority,
    ...identityDetails,
    ...nearbyAviationPlaces.flatMap(({ name, distanceKm }) => [name, distanceKm]),
    timeZone,
  ].filter(Boolean).join('\n');

  return {
    matrix,
    introduction,
    pathway,
    differentiationText,
    sections,
    faqs,
    aviationSummary: aviation.section,
  };
}
