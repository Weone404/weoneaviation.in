import { AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/aviation-evidence.js';
import { INDIA_AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/india-aviation-evidence.generated.js';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from '../data/location-seo/geography/global-pilot.js';
import { GLOBAL_AVIATION_INTENTS } from '../data/location-seo/global-aviation-intents.js';
import { SERVICES } from '../data/location-seo/services.js';
import {
  PRODUCTION_LOCATION_PROMOTION_EVALUATIONS,
  PRODUCTION_LOCATION_PROMOTION_INPUTS,
  PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS,
} from '../data/location-seo/production-candidate-registry.js';
import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';
import { assessContentDifferentiation } from './locationContentDifferentiation.js';
import { scoreIndiaLocationContent } from './indiaLocationQuality.js';
import { evaluateLocationIndexabilityPipeline } from './locationIndexabilityPolicy.js';
import {
  resolveGeographicRecord,
} from './geographicData.js';
import { getIndiaDynamicServicePolicy } from '../data/location-seo/india-dynamic-service-policies.js';
import { getLocationPilotTrainingContent } from './pilotTrainingKnowledge.js';
import { composeLocationContent } from './locationContentComposer.js';
import { getNearbyAviationPlaces } from './worldGeographicRegistry.js';
import { buildLocationTrainingContext } from './locationTrainingContext.js';
import { buildLocationPilotTrainingPage } from './locationPilotTrainingPage.js';

const INDIA = 'India';
const INDIA_CODE = 'IN';
const INFORMATIONAL_RELATIONSHIP_SOURCE = 'https://weoneaviation.in/about-us';
const BASED_ON_AIRCRAFT_TYPES = new Set(['airport', 'aerodrome']);
const TRAINING_ORGANIZATION_TYPES = new Set([
  'flight-school',
  'flying-club',
  'aviation-college',
  'aviation-academy',
  'pilot-training-organization',
  'aviation-organization',
]);
const PLACE_TYPE_CROSSWALKS = new Map([
  ['city', 'city-or-populated-place'],
  ['populated-place', 'city-or-populated-place'],
  ['region', 'state-or-region'],
  ['state', 'state-or-region'],
]);
const GEOGRAPHIC_LEVEL_PRIORITY = [
  'state',
  'district',
  'subdistrict',
  'city',
  'town',
  'populated-place',
  'locality',
  'neighborhood',
  'village',
  'postal-area',
];
const globalGeographyById = new Map(
  GLOBAL_GEOGRAPHIC_PILOT.records.map((record) => [record.id, record]),
);
const aviationEvidenceByPlaceKey = new Map();
let productionComparisonSnapshotsCache;

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function typeGroup(type) {
  return PLACE_TYPE_CROSSWALKS.get(type) || type;
}

function sourceHierarchy(record, recordsById) {
  const hierarchy = [];
  const visited = new Set();
  let current = record;
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    hierarchy.unshift(current);
    current = current.parentId ? recordsById.get(current.parentId) : null;
  }
  return hierarchy;
}

function getHierarchy(record, recordsById) {
  const hierarchy = [];
  const visited = new Set();
  let current = record;
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    hierarchy.unshift(current);
    current = current.parentId ? recordsById.get(current.parentId) : null;
  }
  return hierarchy;
}

function isValidHierarchy(record, hierarchy) {
  if (record.type === 'country') {
    return hierarchy.length === 1 && hierarchy[0]?.id === record.id;
  }
  return hierarchy.length > 1
    && hierarchy[0]?.type === 'country'
    && hierarchy.at(-1)?.id === record.id
    && hierarchy.some(({ type }) => type === 'state');
}

function getContextualAmbiguousIds(records, recordsById) {
  const ownersByIdentity = new Map();
  for (const record of records) {
    const hierarchy = getHierarchy(record, recordsById);
    const state = [...hierarchy].reverse().find(({ type }) => type === 'state')?.name || '';
    const district = [...hierarchy].reverse().find(({ type }) => type === 'district')?.name || '';
    const aliases = new Set([record.canonicalName, record.name, ...(record.aliases || [])]
      .map(normalize)
      .filter(Boolean));
    for (const alias of aliases) {
      const key = [
        record.countryCode || INDIA_CODE,
        normalize(state),
        normalize(district),
        typeGroup(record.type),
        alias,
      ].join('|');
      const owners = ownersByIdentity.get(key) || new Set();
      owners.add(record.id);
      ownersByIdentity.set(key, owners);
    }
  }
  const ambiguousIds = new Set();
  for (const owners of ownersByIdentity.values()) {
    if (owners.size > 1) {
      for (const id of owners) ambiguousIds.add(id);
    }
  }
  return ambiguousIds;
}

function mapAviationEvidenceToIndia(geographyRecords, aviationEvidence) {
  const indiaByKey = new Map();
  for (const record of geographyRecords) {
    if (record.countryCode !== INDIA_CODE || !record.state) continue;
    const group = typeGroup(record.type);
    for (const name of [record.canonicalName, record.name, ...record.aliases]) {
      const key = `${normalize(record.state)}|${group}|${normalize(name)}`;
      if (!name) continue;
      const matches = indiaByKey.get(key) || new Map();
      matches.set(record.id, record);
      indiaByKey.set(key, matches);
    }
  }

  const mapped = new Map();
  const unresolved = [];

  for (const evidence of aviationEvidence) {
    if (evidence.countryCode !== INDIA_CODE || evidence.type === 'aviation-authority') continue;
    const sourceRecord = globalGeographyById.get(evidence.locationId);
    if (!sourceRecord) {
      unresolved.push({ evidenceId: evidence.id, reason: 'Source geography ID is absent.' });
      continue;
    }
    const hierarchy = sourceHierarchy(sourceRecord, globalGeographyById);
    const sourceState = hierarchy.find(({ type }) => ['state', 'region'].includes(type));
    if (!sourceState) {
      unresolved.push({ evidenceId: evidence.id, reason: 'Source geography has no state/region parent.' });
      continue;
    }
    const key = `${normalize(sourceState.name)}|${typeGroup(sourceRecord.type)}|${normalize(sourceRecord.name)}`;
    const matches = indiaByKey.get(key);
    if (!matches || matches.size !== 1) {
      unresolved.push({
        evidenceId: evidence.id,
        reason: matches?.size > 1
          ? 'Exact place-name and state crosswalk is ambiguous.'
          : 'No exact place-name, geographic-level and state crosswalk exists.',
      });
      continue;
    }
    const [indiaRecord] = matches.values();
    const attached = mapped.get(indiaRecord.id) || [];
    attached.push({ ...evidence, sourceGeographicLocationId: evidence.locationId });
    mapped.set(indiaRecord.id, attached);
  }

  for (const candidate of PRODUCTION_LOCATION_PROMOTION_INPUTS) {
    if (candidate.location.countryCode !== INDIA_CODE) continue;
    const attached = mapped.get(candidate.location.id) || [];
    const knownIds = new Set(attached.map(({ id }) => id));
    for (const evidence of candidate.aviationEvidence || []) {
      if (knownIds.has(evidence.id)) continue;
      attached.push(evidence);
      knownIds.add(evidence.id);
    }
    if (attached.length) mapped.set(candidate.location.id, attached);
  }

  return { evidenceByIndiaLocationId: mapped, unresolved };
}

function evidencePlaceKey(stateName, type, name) {
  return `${normalize(stateName)}|${typeGroup(type)}|${normalize(name)}`;
}

function getAviationEvidenceByPlaceKey() {
  if (aviationEvidenceByPlaceKey.size) return aviationEvidenceByPlaceKey;
  const addEvidenceForGeography = (evidence, geography) => {
    const hierarchy = sourceHierarchy(geography, globalGeographyById);
    const state = hierarchy.find(({ type }) => ['state', 'region'].includes(type));
    if (!state) return;
    const key = evidencePlaceKey(state.name, geography.type, geography.name);
    const placeEvidence = aviationEvidenceByPlaceKey.get(key) || [];
    placeEvidence.push(evidence);
    aviationEvidenceByPlaceKey.set(key, placeEvidence);
  };
  for (const evidence of AVIATION_EVIDENCE_RECORDS) {
    if (evidence.countryCode !== INDIA_CODE || evidence.type === 'aviation-authority') continue;
    const sourceRecord = globalGeographyById.get(evidence.locationId);
    if (!sourceRecord) continue;
    addEvidenceForGeography(evidence, sourceRecord);
    for (const relatedId of evidence.relatedLocationIds || []) {
      const relatedRecord = globalGeographyById.get(relatedId);
      if (!relatedRecord) continue;
      addEvidenceForGeography({
        ...evidence,
        geographicRelationship: 'regional-context',
        relatedContextGeography: {
          id: relatedRecord.id,
          name: relatedRecord.name,
          type: relatedRecord.type,
        },
      }, relatedRecord);
    }
  }
  for (const evidence of INDIA_AVIATION_EVIDENCE_RECORDS) {
    const key = evidencePlaceKey(
      evidence.geographicState,
      evidence.geographicType,
      evidence.geographicName,
    );
    const placeEvidence = aviationEvidenceByPlaceKey.get(key) || [];
    placeEvidence.push(evidence);
    aviationEvidenceByPlaceKey.set(key, placeEvidence);
  }
  return aviationEvidenceByPlaceKey;
}

function sourceReference(evidence) {
  return {
    title: evidence.name,
    publisher: evidence.source,
    href: evidence.sourceUrl,
    sourceDate: evidence.sourceDate || null,
    reviewedAt: evidence.verifiedAt || null,
    evidenceId: evidence.id,
  };
}

function localFact(evidence) {
  return {
    name: evidence.name,
    type: evidence.type,
    fact: evidence.fact,
    evidenceId: evidence.id,
    verificationStatus: evidence.verificationStatus,
    source: evidence.source,
    sourceUrl: evidence.sourceUrl,
    sourceDate: evidence.sourceDate || null,
    reviewedAt: evidence.verifiedAt || null,
    geographicRelationship: evidence.geographicRelationship,
    pilotTrainingRelevance: evidence.pilotTrainingRelevance || null,
    contextGeography: evidence.relatedContextGeography || null,
    attributionNote: evidence.attributionNote || null,
    confidence: evidence.verificationStatus === 'primary-source-listed' ? 'high' : 'unrated',
  };
}

function contentFaqs(facts) {
  return facts.map((fact) => {
    const question = fact.type === 'flight-school'
      || fact.type === 'pilot-training-organization'
      ? `What does the DGCA listing report about ${fact.name}?`
      : fact.type === 'medical-centre'
        ? `What does the cited medical-centre record say about ${fact.name}?`
        : `What does the cited source report about ${fact.name}?`;
    return {
      question,
      answer: fact.geographicRelationship === 'regional-context' && fact.attributionNote
        ? `${fact.fact} ${fact.attributionNote}`
        : fact.fact,
      evidenceId: fact.id,
      sourceUrl: fact.sourceUrl,
    };
  });
}

function contentSections(facts) {
  const groups = new Map();
  for (const item of facts) {
    if (!item.fact?.trim()) continue;
    const sectionType = item.type === 'medical-centre'
      ? 'Aviation medical reference'
      : item.type === 'flight-school' || item.type === 'pilot-training-organization'
        ? 'Independent flight-training reference'
        : BASED_ON_AIRCRAFT_TYPES.has(item.type)
          ? 'Airport and aerodrome reference'
          : 'Aviation organization reference';
    const group = groups.get(sectionType) || [];
    group.push(item);
    groups.set(sectionType, group);
  }
  return [...groups].map(([title, items]) => ({
    title: items[0].geographicRelationship === 'regional-context'
      ? `Regional context: ${title}`
      : title,
    body: items.map(({ fact, attributionNote }) => (
      attributionNote ? `${fact} ${attributionNote}` : fact
    )).join(' '),
    evidenceIds: items.map(({ id }) => id),
    sourceLinks: items.map(({ sourceUrl, source, id }) => ({
      href: sourceUrl,
      publisher: source,
      evidenceId: id,
    })),
    verified: true,
  }));
}

function generateContentModel(record, hierarchy, aviationEvidence, serviceBySlug) {
  const locationFacts = aviationEvidence.filter((item) => (
    item.countryCode === INDIA_CODE
    && item.type !== 'aviation-authority'
    && item.geographicRelationship === 'located-within'
    && item.verificationStatus === 'primary-source-listed'
    && item.fact?.trim()
    && /^https:\/\//.test(item.sourceUrl || '')
  ));
  const contextualEvidence = aviationEvidence.filter((item) => (
    item.countryCode === INDIA_CODE
    && item.type !== 'aviation-authority'
    && item.geographicRelationship === 'regional-context'
    && item.verificationStatus === 'primary-source-listed'
    && item.fact?.trim()
    && /^https:\/\//.test(item.sourceUrl || '')
  ));
  const allSourcedFacts = [...locationFacts, ...contextualEvidence];
  const dgcaContext = AVIATION_REGULATORY_CONTEXTS[INDIA];
  const pilotIntent = serviceBySlug.get('pilot-training');
  const state = [...hierarchy].reverse().find(({ type }) => type === 'state');
  const district = [...hierarchy].reverse().find(({ type }) => type === 'district');
  const uniqueSources = [...new Map(
    allSourcedFacts.map((item) => [item.sourceUrl, sourceReference(item)]),
  ).values()];
  const geoSources = hierarchy.flatMap((node) => (node.sourceLinks || [])
    .filter(({ href }) => /^https:\/\//.test(href || ''))
    .map((source) => ({
      title: source.title,
      publisher: source.publisher,
      href: source.href,
      sourceDate: null,
      reviewedAt: source.reviewedAt || null,
      evidenceId: null,
    })));
  const sourceReferences = [...new Map([
    ...uniqueSources,
    ...geoSources,
    {
      title: `${dgcaContext.authority} official information`,
      publisher: dgcaContext.authority,
      href: dgcaContext.source,
      sourceDate: null,
      reviewedAt: dgcaContext.reviewedAt,
      evidenceId: 'aviation:authority:dgca-india',
    },
  ].map((source) => [source.href, source])).values()];
  const localAviationFacts = allSourcedFacts.map(localFact);
  const sections = contentSections(locationFacts);
  const regionalContextSections = contentSections(contextualEvidence);
  const localFaqs = contentFaqs(allSourcedFacts);
  const relationshipStatement = 'This location guide is informational. We One Aviation does not claim a local branch, classroom, instructor, FTO, partner, or physical training service here. Its documented classroom is in Dwarka, Delhi; ask the academy to confirm current online class availability. Flight training is a separate stage at a selected DGCA-approved flying training organisation.';
  const hierarchySummary = hierarchy.map(({ id, canonicalName, name, type, sourceLinks = [] }) => ({
    id,
    canonicalName: canonicalName || name,
    name,
    type,
    sourceLinks: sourceLinks.map(({ publisher, title, href, reviewedAt }) => ({
      publisher,
      title,
      href,
      reviewedAt: reviewedAt || null,
    })),
  }));
  const pageEligibleFacts = localAviationFacts.filter(({ geographicRelationship }) => (
    geographicRelationship === 'located-within'
  ));
  const serviceSpecificFacts = Object.fromEntries(GLOBAL_AVIATION_INTENTS.map(({ slug }) => {
    const service = serviceBySlug.get(slug);
    return [slug, {
      serviceName: service?.shortName || service?.name || slug,
      searchIntent: service?.searchIntent || null,
      explanation: service?.serviceExplanation || null,
      localEvidenceIds: slug === 'pilot-training'
        ? pageEligibleFacts.map(({ evidenceId }) => evidenceId)
        : [],
      locationServiceRelationshipVerified: false,
      indexableByService: false,
    }];
  }));
  const studentPathway = {
    explanation: pilotIntent?.serviceExplanation || null,
    eligibility: pilotIntent?.eligibility || null,
    dgcaTheory: pilotIntent?.dgcaPathway || null,
    flightTraining: pilotIntent?.flightTrainingPathway || null,
    providerChecks: 'Verify the current DGCA approval, approved scope and operating base directly with each flying training organisation. The cited local evidence does not establish a We One Aviation partnership or admission place.',
  };
  const content = {
    locationIdentity: {
      id: record.id,
      canonicalName: record.canonicalName || record.name,
      slug: record.slug,
      aliases: record.aliases || [],
      geographicLevel: record.type,
      country: record.country,
      state: state?.name || record.state || null,
      district: district?.name || record.district || null,
      latitude: Number.isFinite(record.latitude) ? record.latitude : null,
      longitude: Number.isFinite(record.longitude) ? record.longitude : null,
      postalCodes: record.postalCodes || [],
    },
    locationType: record.type,
    state: state?.name || record.state || null,
    district: district?.name || record.district || null,
    parentLocations: hierarchySummary.slice(0, -1),
    nearbyAirports: contextualEvidence
      .filter(({ type }) => BASED_ON_AIRCRAFT_TYPES.has(type))
      .map(sourceReference),
    airportFacts: localAviationFacts.filter(({ type }) => BASED_ON_AIRCRAFT_TYPES.has(type)),
    aviationInstitutions: localAviationFacts.filter(({ type }) => TRAINING_ORGANIZATION_TYPES.has(type)),
    dgcaFtoEvidence: localAviationFacts.filter(({ type }) => (
      type === 'flight-school' || type === 'pilot-training-organization'
    )),
    medicalCentreEvidence: localAviationFacts.filter(({ type }) => type === 'medical-centre'),
    aviationInfrastructure: localAviationFacts.filter(({ type }) => (
      type === 'airport'
      || type === 'aerodrome'
      || type === 'aviation-infrastructure'
    )),
    nearbyFlyingTrainingEcosystem: contextualEvidence
      .filter(({ type }) => TRAINING_ORGANIZATION_TYPES.has(type))
      .map(sourceReference),
    regulatoryContext: {
      country: dgcaContext.country,
      authority: dgcaContext.authority,
      source: dgcaContext.source,
      reviewedAt: dgcaContext.reviewedAt,
    },
    studentPathway,
    travelAccessContext: {
      verifiedTravelFacts: [],
      note: 'No route, travel time, distance or transport-access fact is asserted without a dedicated verified source.',
    },
    localAviationFacts,
    sourceReferences,
    serviceSpecificFacts,
    localFAQs: localFaqs,
    locationSpecificSections: sections,
    regionalContextSections,
    relationship: {
      type: 'informational',
      statement: relationshipStatement,
      source: INFORMATIONAL_RELATIONSHIP_SOURCE,
      physicalPresenceVerified: false,
      localServiceDeliveryVerified: false,
    },
    readiness: {
      aviationFactCount: localAviationFacts.length,
      locationSpecificFactCount: pageEligibleFacts.length,
      localSourceCount: new Set(pageEligibleFacts.map(({ sourceUrl }) => sourceUrl)).size,
      sourceCount: sourceReferences.length,
      sectionCount: sections.length,
      faqCount: localFaqs.length,
      geographicSpecificity: new Set(hierarchy.map(({ type }) => type)).size,
      confidence: record.confidence || null,
      geographySource: record.source || null,
      geographySourceUrl: record.sourceUrl || null,
      sourceDate: record.sourceDate || null,
    },
  };
  return content;
}

export function buildIndiaLocationServiceContent({
  record,
  hierarchy,
  service,
  routeSlug = record?.slug,
  useRuntimeIndex = false,
}) {
  if (!record || !Array.isArray(hierarchy) || !service || !routeSlug) {
    throw new TypeError('A geographic record, hierarchy, service and route slug are required.');
  }
  if (record.countryCode !== INDIA_CODE || !isValidHierarchy(record, hierarchy)) {
    throw new Error('A valid India geographic hierarchy is required for a dynamic location page.');
  }
  const servicePolicy = getIndiaDynamicServicePolicy(service, record);
  if (!servicePolicy) {
    const error = new Error(
      `Service "${service.slug}" is not approved for India dynamic informational pages.`,
    );
    error.code = 'UNSUPPORTED_DYNAMIC_LOCATION_SERVICE';
    throw error;
  }

  const stateName = [...hierarchy].reverse().find(({ type }) => type === 'state')?.name
    || record.state
    || INDIA;
  const evidenceIndex = getAviationEvidenceByPlaceKey();
  const evidenceById = new Map();
  for (const geography of hierarchy) {
    const names = new Set([geography.canonicalName, geography.name, ...(geography.aliases || [])]
      .filter(Boolean));
    for (const name of names) {
      const matches = evidenceIndex.get(evidencePlaceKey(stateName, geography.type, name)) || [];
      for (const sourceEvidence of matches) {
        if (service.slug !== 'pilot-training' && sourceEvidence.geographicName) continue;
        const isExactGeography = geography.id === record.id;
        const remainsRegional = sourceEvidence.geographicRelationship === 'regional-context'
          || !isExactGeography;
        evidenceById.set(sourceEvidence.id, {
          ...sourceEvidence,
          geographicRelationship: remainsRegional ? 'regional-context' : 'located-within',
          attributionNote: !remainsRegional
            ? sourceEvidence.attributionNote
            : sourceEvidence.attributionNote
              || `Regional context is recorded under the ${geography.type} ${geography.name}; it is not evidence of a facility within ${record.name}.`,
          contextGeography: remainsRegional
            ? { id: geography.id, name: geography.name, type: geography.type }
            : null,
        });
      }
    }
  }

  const evidence = [...evidenceById.values()];
  const nearbyAviationPlaces = service.slug === 'pilot-training'
    ? getNearbyAviationPlaces(record, { useRuntimeIndex })
    : [];
  const serviceBySlug = new Map(SERVICES.map((item) => [item.slug, item]));
  const generated = generateContentModel(
    record,
    hierarchy,
    evidence,
    serviceBySlug,
  );
  const country = hierarchy.find(({ type }) => type === 'country')?.name || INDIA;
  const city = [...hierarchy].reverse().find(({ type }) => type === 'city')?.name
    || record.name;
  const canonicalLocationName = record.canonicalName || record.name;
  const parentGeographies = hierarchy.slice(0, -1);
  const parentPlace = parentGeographies.at(-1)?.name || country;
  const hierarchyLabel = parentGeographies.map(({ name, type }) => `${name} (${type})`).join(', ');
  const trainingContext = service.slug === 'pilot-training'
    ? buildLocationTrainingContext({
      record,
      hierarchy,
      regulator: generated.regulatoryContext,
      nearbyAviationPlaces,
    })
    : null;
  const relationshipStatement = service.slug === 'pilot-training'
    ? `Informational guidance only: We One Aviation does not claim a local branch, instructor, flying school, FTO, partner or physical flight-training service in ${canonicalLocationName}. Its documented classroom is in Dwarka, Delhi; confirm current ground-class availability. Flight training is separate at a student-selected DGCA-approved FTO.`
    : `This page provides informational ${service.shortName.toLowerCase()} guidance for students researching from ${canonicalLocationName}. We One Aviation does not claim a local branch, classroom, instructor, flying school, FTO, partner, or physical training service in this ${record.type}. Its documented classroom is in Dwarka, Delhi; confirm current ground-class availability with the academy. Flight training is a separate stage at a DGCA-approved flying training organisation selected by the student.`;
  const directFacts = generated.localAviationFacts.filter(({ geographicRelationship }) => (
    geographicRelationship === 'located-within'
  ));
  const contextualFacts = generated.localAviationFacts.filter(({ geographicRelationship }) => (
    geographicRelationship !== 'located-within'
  ));
  const evidenceAnswer = directFacts.length
    ? `Directly attributed records include: ${directFacts.map(({ fact }) => fact).join(' ')}`
    : contextualFacts.length
      ? `No direct facility is established for this ${record.type}. Parent-region context is recorded under ${[...new Set(contextualFacts.map(({ contextGeography }) => contextGeography?.name).filter(Boolean))].join(', ')} and is not evidence of a facility in ${canonicalLocationName}.`
      : `The reviewed aviation evidence set contains no directly attributed facility for this ${record.type}. This absence is not a claim that no facility exists; verify providers with DGCA.`;
  const serviceFaqs = [
    {
      question: `What does ${service.shortName} involve for students researching from ${canonicalLocationName}?`,
      answer: `${service.serviceExplanation} The academy does not claim local delivery in ${canonicalLocationName}; confirm current online availability directly.`,
      evidenceId: `service:${service.slug}:explanation`,
    },
    {
      question: `Which eligibility and regulatory steps apply to ${service.shortName.toLowerCase()}?`,
      answer: `${service.eligibility} ${service.dgcaPathway}`,
      evidenceId: `service:${service.slug}:requirements`,
    },
    {
      question: `What aviation information is verified for this ${record.type}?`,
      answer: evidenceAnswer,
      evidenceId: `geography:${record.id}:aviation-context`,
    },
  ];
  const faqItems = service.slug === 'pilot-training'
    ? [...(trainingContext?.faqs || []), ...generated.localFAQs]
    : [...serviceFaqs, ...generated.localFAQs];
  const geographySources = [
    ...(record.sourceLinks || []),
    ...(record.sourceUrl
      ? [{
        title: `${record.sourceAttribution || record.source || 'Registry'} geographic record for ${canonicalLocationName}`,
        publisher: record.sourceAttribution || record.source || 'Geographic registry',
        href: record.sourceUrl,
        sourceDate: record.sourceDate || null,
      }]
      : []),
  ].filter(({ href }) => /^https:\/\//.test(href || ''));
  const sourceLinks = [...new Map([
    ...generated.sourceReferences,
    ...geographySources,
    ...nearbyAviationPlaces.map((airport) => ({
      title: airport.title,
      publisher: airport.publisher,
      href: airport.sourceUrl,
      sourceDate: null,
    })),
    {
      title: `${service.shortName} information from We One Aviation`,
      publisher: 'We One Aviation',
      href: servicePolicy.contentSource,
      sourceDate: null,
    },
  ].map((source) => [source.href, source])).values()].map((source) => ({
    ...source,
    url: source.href,
  }));
  const registryDetails = [
    record.adminCode ? `Registry administrative code: ${record.adminCode}.` : null,
    record.postalCodes?.length
      ? `Postal codes explicitly attached to this registry record: ${record.postalCodes.join(', ')}.`
      : null,
    record.aliases?.length
      ? `Names retained as registry aliases: ${record.aliases.join(', ')}.`
      : null,
    Number.isFinite(record.latitude) && Number.isFinite(record.longitude)
      ? `The source record supplies coordinates ${record.latitude}, ${record.longitude}; these identify the registry record and are not a travel-distance estimate.`
      : null,
    record.timezone ? `The registry associates this record with time zone ${record.timezone}.` : null,
    record.sourceAccuracy ? `The registry records source accuracy as ${record.sourceAccuracy}.` : null,
    record.confidence ? `The registry assigns confidence "${record.confidence}".` : null,
  ].filter(Boolean);
  const registrySection = {
    title: `${canonicalLocationName}: administrative placement`,
    body: [
      `The registry classifies ${canonicalLocationName} as a ${record.type}. Its recorded chain, from country to this entry, is ${hierarchy.map(({ name, type }) => `${name} (${type})`).join(' > ')}.`,
      `The immediate parent record is ${parentGeographies.at(-1)?.name || country} (${parentGeographies.at(-1)?.type || 'country'}; record ${record.parentId || 'not supplied'}). This is administrative hierarchy, not an estimate of travel distance or service coverage.`,
      ...registryDetails,
    ].join(' '),
    evidenceIds: [`geography:${record.id}`],
    sourceLinks: geographySources.map(({ href, publisher }) => ({ href, publisher })),
    verified: Boolean(record.sourceUrl && /^https:\/\//.test(record.sourceUrl)),
    geographicRelationship: 'exact-record',
  };
  const geographySourceSection = {
    title: `Geographic source record for ${canonicalLocationName}`,
    body: [
      `The geographic identity is sourced to ${record.sourceAttribution || record.source || 'the registry'}${record.sourceDate ? ` (source date ${record.sourceDate})` : ''}.`,
      `Record identifier: ${record.id}. Source accuracy: ${record.sourceAccuracy || 'not stated in the record'}. Confidence: ${record.confidence || 'not stated in the record'}.`,
      `The linked source applies to this registry identity and its parent chain only; it does not establish an aviation facility, training provider or We One Aviation service in ${canonicalLocationName}.`,
      ...(geographySources.length
        ? [`Available geographic references: ${geographySources.map(({ publisher, title }) => `${publisher}: ${title}`).join('; ')}.`]
        : []),
    ].join(' '),
    evidenceIds: [`geography-source:${record.id}`],
    sourceLinks: geographySources.map(({ href, publisher }) => ({ href, publisher })),
    verified: Boolean(record.sourceUrl && /^https:\/\//.test(record.sourceUrl)),
    geographicRelationship: 'exact-record',
  };
  const aviationAttributionSection = {
    title: `Aviation evidence and regional limits for ${canonicalLocationName}`,
    body: directFacts.length
      ? `Direct records attributed to this ${record.type}: ${directFacts.map(({ fact, source }) => `${fact} (source: ${source})`).join(' ')}`
      : contextualFacts.length
        ? `No facility is directly attributed to this ${record.type} in the reviewed evidence. Parent-region records are attributed to ${[...new Set(contextualFacts.map(({ contextGeography }) => contextGeography?.name).filter(Boolean))].join(', ')}: ${contextualFacts.map(({ fact, attributionNote }) => `${fact} ${attributionNote || ''}`).join(' ')} These parent-region records are not claims about a facility within ${canonicalLocationName}.`
        : `No aviation facility record is linked to this exact ${record.type} or its resolved parent chain in the reviewed evidence set. This is a limitation of the linked evidence, not proof that no facility exists. Check facility approval directly with ${generated.regulatoryContext.authority}.`,
    evidenceIds: [
      ...directFacts.map(({ evidenceId }) => evidenceId),
      ...contextualFacts.map(({ evidenceId }) => evidenceId),
      'aviation:authority:dgca-india',
    ],
    sourceLinks: [
      ...directFacts.map(({ source, sourceUrl }) => ({ publisher: source, href: sourceUrl })),
      ...contextualFacts.map(({ source, sourceUrl }) => ({ publisher: source, href: sourceUrl })),
      { publisher: generated.regulatoryContext.authority, href: generated.regulatoryContext.source },
    ],
    verified: true,
    geographicRelationship: directFacts.length ? 'located-within' : 'regional-context',
  };
  const serviceContextSection = {
    title: `${service.shortName} pathway from ${canonicalLocationName}`,
    body: [
      `${service.searchIntent} This route is generated for the registry-defined ${record.type} ${canonicalLocationName}, under ${hierarchyLabel || country}.`,
      service.serviceExplanation,
      service.eligibility,
      service.dgcaPathway,
      service.flightTrainingPathway,
      `The geographic record does not establish local delivery. Confirm current academy availability and verify provider approvals directly with ${generated.regulatoryContext.authority}.`,
    ].join(' '),
    evidenceIds: [`service:${service.slug}`, `geography:${record.id}`],
    sourceLinks: [
      { href: servicePolicy.contentSource, publisher: 'We One Aviation' },
      { href: generated.regulatoryContext.source, publisher: generated.regulatoryContext.authority },
      ...geographySources.map(({ href, publisher }) => ({ href, publisher })),
    ],
    verified: Boolean(record.sourceUrl && /^https:\/\//.test(record.sourceUrl)),
    geographicRelationship: 'exact-record',
  };
  const locationSpecificSections = [
    registrySection,
    geographySourceSection,
    aviationAttributionSection,
    serviceContextSection,
    ...(trainingContext?.sections || []),
    ...generated.locationSpecificSections,
  ];
  const serviceContent = {
    serviceSlug: service.slug,
    searchIntent: service.searchIntent,
    explanation: service.serviceExplanation,
    eligibility: service.eligibility,
    regulatoryPathway: `${service.dgcaPathway} The applicable regulator is ${generated.regulatoryContext.authority} for ${country}; verify current requirements at the cited official source.`,
    trainingProcess: service.trainingProcess,
    flightTrainingApplicable: service.flightTrainingApplicable,
    flightTrainingPathway: service.flightTrainingPathway,
    whyThisOption: service.whyThisOption,
  };
  const serviceIntroduction = {
    'pilot-training': `Students in ${canonicalLocationName}, a ${record.type} within ${parentPlace}, can use this pilot-training guide to plan the distinct eligibility, DGCA theory and flight-training stages. It separates verified local or parent-region aviation records from the national licensing pathway; it does not imply a local We One Aviation facility.`,
    'dgca-ground-classes': `For students researching DGCA ground classes from ${canonicalLocationName} (${record.type}, ${parentPlace}), this guide explains the written-paper preparation stage separately from examinations and aircraft training. It identifies the geographic record and cited parent-region aviation context without claiming that classes are delivered locally.`,
    'commercial-pilot-training': `This commercial pilot training guide is tailored to ${canonicalLocationName}, a ${record.type} in ${parentPlace}. It explains CPL eligibility, DGCA theory and the separate flying-school stage, while distinguishing exact-location aviation evidence from parent-region references.`,
    'cpl-training': `Prospective CPL candidates researching from ${canonicalLocationName} (${record.type}, ${parentPlace}) can use this guide to check the education, medical, DGCA examination and flying stages. The cited aviation evidence is attributed to its recorded geography, not presented as a local We One Aviation branch.`,
  }[service.slug];
  const serviceInternalLinks = [
    {
      context: `For the ${service.shortName.toLowerCase()} pathway,`,
      label: service.slug === 'cpl-training'
        ? 'review the commercial pilot licence requirements'
        : `review ${service.shortName.toLowerCase()} information`,
      href: servicePolicy.contentSource.replace('https://weoneaviation.in', ''),
    },
    ...service.relatedServices.slice(0, 2).map((relatedSlug) => ({
      context: `To compare a separate training stage,`,
      label: SERVICES.find(({ slug }) => slug === relatedSlug)?.shortName || relatedSlug,
      href: `/${routeSlug}/${relatedSlug}`,
    })),
    {
      context: 'For the academy’s documented teaching scope,',
      label: 'read about We One Aviation',
      href: '/about-us',
    },
  ];
  const locationAviationContent = {
    geographicLevel: record.type,
    serviceName: service.shortName,
    locationOverview: `${canonicalLocationName} is recorded as a ${record.type} in ${hierarchyLabel || country}. The registry record ${record.id} is attributed to ${record.sourceAttribution || record.source || 'its cited geographic source'}${record.sourceDate ? ` (${record.sourceDate})` : ''}. Direct aviation facts are distinguished from evidence explicitly attributed to parent geography.`,
    geographicContext: hierarchy.map((geography) => ({
      id: geography.id,
      name: geography.canonicalName || geography.name,
      type: geography.type,
      parentId: geography.parentId || null,
      countryCode: geography.countryCode || null,
      source: geography.source || null,
      sourceUrl: geography.sourceUrl || null,
      sourceDate: geography.sourceDate || null,
      confidence: geography.confidence || null,
      postalCodes: geography.id === record.id ? geography.postalCodes || [] : [],
      adminCode: geography.id === record.id ? geography.adminCode || null : null,
      latitude: geography.id === record.id && Number.isFinite(geography.latitude)
        ? geography.latitude
        : null,
      longitude: geography.id === record.id && Number.isFinite(geography.longitude)
        ? geography.longitude
        : null,
      sources: (geography.sourceLinks || [])
        .map(({ publisher, href }) => ({ publisher, href })),
    })),
    aviationRelevance: [
      directFacts.length
        ? directFacts.map(({ fact }) => fact).join(' ')
        : contextualFacts.length
          ? `No aviation facility is directly attributed to this ${record.type} in the reviewed evidence. Parent-region context is recorded for ${[...new Set(contextualFacts.map(({ contextGeography }) => contextGeography?.name).filter(Boolean))].join(', ')} and is not represented as a facility within ${canonicalLocationName}.`
          : `The reviewed evidence set does not establish a directly attributed aviation facility within this ${record.type}. This is a limit of the available evidence, not a claim that no facility exists.`,
      trainingContext?.aviationSummary,
    ].join(' '),
    aviationFacts: directFacts.map((fact) => ({
      fact: fact.fact,
      evidenceId: fact.evidenceId,
      evidence: {
        publisher: fact.source,
        href: fact.sourceUrl,
        sourceDate: fact.sourceDate,
      },
    })),
    regionalContextSections: generated.regionalContextSections.map((section) => ({
      title: section.title,
      body: section.body,
      evidenceIds: section.evidenceIds,
      geographicRelationship: 'regional-context',
    })),
    nearbyAviationHubs: [
      ...contextualFacts.map((fact) => ({
        evidenceId: fact.evidenceId,
        title: fact.contextGeography
          ? `${fact.contextGeography.name} (${fact.contextGeography.type})`
          : fact.fact,
        publisher: fact.source,
        href: fact.sourceUrl,
        fact: fact.fact,
        attributionNote: fact.attributionNote || null,
        geographicRelationship: fact.geographicRelationship,
        contextGeography: fact.contextGeography || null,
      })),
      ...nearbyAviationPlaces.map((airport) => ({
        evidenceId: airport.id,
        title: airport.name,
        publisher: airport.publisher,
        href: airport.sourceUrl,
        fact: `GeoNames records ${airport.name} as an airport about ${airport.distanceKm} km in a straight line from the coordinates recorded for ${canonicalLocationName}. This is not a travel distance, operating-status check or evidence of flight-training approval.`,
        attributionNote: 'A geographic airport record does not establish a flying school, available course or approved training base.',
        geographicRelationship: 'gazetteer-proximity',
        contextGeography: null,
      })),
    ],
    airportContext: directFacts
      .filter(({ type }) => BASED_ON_AIRCRAFT_TYPES.has(type))
      .map((fact) => ({ title: fact.name, publisher: fact.source, href: fact.sourceUrl })),
    trainingInfrastructure: directFacts
      .filter(({ type }) => TRAINING_ORGANIZATION_TYPES.has(type))
      .map((fact) => ({ title: fact.name, publisher: fact.source, href: fact.sourceUrl })),
    medicalContext: directFacts
      .filter(({ type }) => type === 'medical-centre')
      .map((fact) => ({ title: fact.name, publisher: fact.source, href: fact.sourceUrl })),
    regulatoryContext: generated.regulatoryContext,
    studentPathway: {
      explanation: service.serviceExplanation,
      licensingContext: generated.studentPathway.explanation,
      medicalContext: generated.studentPathway.eligibility,
      examContext: generated.studentPathway.dgcaTheory,
    },
    howStudentsFromLocationCanTrain: trainingContext?.pathway
      || `${service.serviceExplanation} Students researching from ${canonicalLocationName}, a ${record.type} within ${parentPlace}, can use this guidance to plan the stated steps. It does not establish that this service is physically delivered in ${canonicalLocationName}; confirm current online availability with the academy.`,
    physicalVsOnlineExplanation: relationshipStatement,
    serviceRelationship: {
      serviceSlug: service.slug,
      mode: servicePolicy.mode,
      localDeliveryVerified: servicePolicy.localDeliveryClaimAllowed,
      statement: relationshipStatement,
    },
    relationship: {
      type: 'informational',
      statement: relationshipStatement,
      physicalPresenceVerified: false,
      localServiceDeliveryVerified: false,
    },
    flightTrainingExplanation: generated.studentPathway.flightTraining,
    ftoSelectionGuidance: generated.studentPathway.providerChecks,
    localFaqs: faqItems,
    sourceLinks,
    sourceDates: sourceLinks.map(({ title, href, sourceDate }) => ({
      title,
      href,
      sourceDate: sourceDate || null,
    })),
    confidence: {
      geography: record.confidence || null,
      aviationEvidence: evidence.length ? 'source-attributed' : 'not-established',
      aviationFactCount: directFacts.length,
      sourceCount: new Set(sourceLinks.map(({ href }) => href)).size,
    },
  };
  const content = {
    pagePurpose: 'aviation-location-information',
    seoTitle: `${service.shortName} guidance for ${canonicalLocationName}, ${parentPlace} | We One Aviation`,
    seoDescription: `${service.shortName} for ${canonicalLocationName} (${record.type}) in ${parentPlace}: ${directFacts.length} exact-location and ${contextualFacts.length} parent-region aviation references are separately attributed. Review verified geography, ${service.shortName.toLowerCase()} steps and DGCA sources; local delivery is not claimed.`,
    title: `${service.shortName} guidance for ${canonicalLocationName} | We One Aviation`,
    description: `${service.shortName} guidance for ${canonicalLocationName}, a ${record.type} within ${parentPlace}. Includes registry-backed hierarchy, location-attributed aviation evidence and a service-specific pathway without implying local delivery.`,
    h1: `${service.shortName} guidance for ${canonicalLocationName}`,
    breadcrumbLabel: `${service.shortName} in ${canonicalLocationName}`,
    introduction: trainingContext?.introduction || serviceIntroduction,
    localApplication: trainingContext?.pathway
      || locationAviationContent.howStudentsFromLocationCanTrain,
    localContext: locationAviationContent.aviationRelevance,
    relationshipStatement,
    trainingMode: `${service.shortName} information only. Confirm current availability directly with the academy. ${service.flightTrainingApplicable ? 'Flight training is a separate stage at the selected DGCA-approved flying training organisation.' : 'Ground classes do not include flight training.'}`,
    relationship: 'informational',
    faqs: faqItems,
    internalLinks: serviceInternalLinks,
    cta: {
      label: `Ask about ${service.shortName.toLowerCase()} availability`,
      href: '/contact',
    },
    canonicalPath: `/${routeSlug}/${service.slug}`,
    locationAviationContent,
    locationTrainingMatrix: trainingContext?.matrix || null,
    locationSpecificSections,
    regionalContextSections: generated.regionalContextSections,
    sourceReferences: sourceLinks,
    serviceRelationship: locationAviationContent.serviceRelationship,
    serviceContent,
    jsonLdReady: Boolean(
      `/${routeSlug}/${service.slug}`
      && faqItems.length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minFaqs
      && serviceInternalLinks.length >= GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minInternalLinks,
    ),
    localAviationProfile: {
      aviationAuthority: {
        authority: generated.regulatoryContext.authority,
        countryCode: INDIA_CODE,
      },
      aviationEcosystem: locationAviationContent.aviationRelevance,
    },
  };
  if (service.slug === 'pilot-training') {
    content.masterContent = getLocationPilotTrainingContent({
      countryCode: record.countryCode,
      serviceSlug: service.slug,
    });
    content.locationPilotTrainingPage = buildLocationPilotTrainingPage({
      record,
      hierarchy,
      regulator: generated.regulatoryContext,
      masterContent: content.masterContent,
      serviceContent,
      directAviationFacts: directFacts,
      regionalAviationFacts: contextualFacts,
      aviationFaqs: generated.localFAQs,
      nearbyAirportRecords: nearbyAviationPlaces,
      relationshipStatement,
      internalLinks: serviceInternalLinks,
      serviceShortName: service.shortName,
      h1: content.h1,
      introduction: content.introduction,
      ctaLabel: content.cta.label,
      breadcrumbLabels: [city, content.breadcrumbLabel],
    });
    content.faqs = content.locationPilotTrainingPage.faqs;
    content.locationSpecificSections = content.locationPilotTrainingPage.sections;
    locationAviationContent.localFaqs = content.faqs;
  }
  const pageSnapshot = candidateSnapshot(
    record,
    hierarchy,
    {
      ...generated,
      relationship: { statement: relationshipStatement },
    },
    service,
    routeSlug,
    content,
  );
  const differentiation = assessContentDifferentiation({
    candidate: pageSnapshot,
    comparisons: getProductionComparisonSnapshots()
      .filter(({ slug }) => slug !== routeSlug),
  });
  const quality = scoreIndiaLocationContent({
    record,
    hierarchy,
    service,
    content,
    differentiation,
    routeSlug,
  });
  content.quality = quality;
  const location = {
    id: record.id,
    name: record.canonicalName || record.name,
    canonicalName: record.canonicalName || record.name,
    slug: routeSlug,
    registrySlug: record.slug,
    registryRecordId: record.id,
    registryRecordStatus: record.status,
    type: record.type,
    city,
    state: stateName,
    district: generated.district,
    country,
    countryCode: INDIA_CODE,
    parentId: record.parentId || null,
    aliases: record.aliases || [],
    relationship: 'informational',
    renderable: true,
    indexable: false,
    quality,
    supportedServices: [service.slug],
    rejectedServices: {},
    physicalAcademy: false,
    physicalPresence: { verified: false },
    verifiedFacts: directFacts.map(({ fact, source, sourceUrl }) => ({
      text: fact,
      source,
      sourceUrl,
      verified: true,
    })),
    localSections: locationSpecificSections.map((section) => ({
      title: section.title,
      body: section.body,
      evidenceIds: section.evidenceIds || [],
    })),
    localFAQs: faqItems,
    sourceLinks: sourceLinks.map(({ href, publisher, title }) => ({
      href,
      label: `${publisher}: ${title}`,
    })),
    locationAviationContent,
    serviceContent: { [service.slug]: content },
  };
  content.composedPage = composeLocationContent({
    location,
    hierarchy,
    service,
    regulatoryContext: generated.regulatoryContext,
    content,
  });
  return {
    location,
    content,
    hierarchy,
  };
}

function includeCuratedProductionContent(content, candidate) {
  const curated = candidate.content.locationAviationContent;
  if (!curated) return content;
  return {
    ...content,
    locationSpecificSections: candidate.content.sections || content.locationSpecificSections,
    localFAQs: curated.localFaqs || content.localFAQs,
    sourceReferences: curated.sourceLinks || content.sourceReferences,
    relationship: {
      ...content.relationship,
      statement: curated.physicalVsOnlineExplanation,
    },
  };
}

function candidateSnapshot(
  record,
  hierarchy,
  content,
  service,
  routeSlug = record.slug,
  pageContent = null,
) {
  const locationSections = pageContent?.locationPilotTrainingPage?.sections
    || pageContent?.locationSpecificSections
    || content.locationSpecificSections;
  const faqs = pageContent?.locationPilotTrainingPage?.faqs
    || pageContent?.faqs
    || content.localFAQs;
  const serviceContent = pageContent?.serviceContent;
  const aviation = pageContent?.locationAviationContent;
  const body = pageContent?.locationPilotTrainingPage?.visibleText?.join('\n') || [
    pageContent?.seoTitle,
    pageContent?.seoDescription,
    pageContent?.h1,
    pageContent?.introduction,
    pageContent?.localApplication,
    `${service.shortName} for ${record.canonicalName || record.name} in ${content.state || INDIA}`,
    ...hierarchy.map(({ type, name }) => `${type}: ${name}`),
    locationSections.flatMap(({ title, body: sectionBody }) => [title, sectionBody]),
    faqs.flatMap(({ question, answer }) => [question, answer]),
    content.regulatoryContext.authority,
    content.studentPathway.explanation,
    content.studentPathway.dgcaTheory,
    content.studentPathway.providerChecks,
    content.relationship.statement,
    serviceContent?.explanation,
    serviceContent?.eligibility,
    serviceContent?.regulatoryPathway,
    serviceContent?.flightTrainingPathway,
    ...(serviceContent?.trainingProcess || []).flatMap(({ title, description }) => [title, description]),
    aviation?.aviationRelevance,
    ...(aviation?.aviationFacts || []).map(({ fact }) => fact),
    ...(aviation?.nearbyAviationHubs || []).map(({ fact, attributionNote }) => `${fact} ${attributionNote || ''}`),
  ].flat(2).filter(Boolean).join('\n');
  const sourceUrls = [...new Set((pageContent?.sourceReferences || content.sourceReferences)
    .map(({ href }) => href)
    .filter(Boolean))];
  const verifiedFacts = (pageContent
    ? [
      ...(aviation?.aviationFacts || []).map((fact) => ({
        ...fact,
        text: fact.fact,
        sourceUrl: fact.evidence?.href,
        inherited: false,
      })),
      ...(aviation?.nearbyAviationHubs || []).map((fact) => ({
        ...fact,
        text: fact.fact,
        sourceUrl: fact.href,
        inherited: true,
      })),
    ]
    : content.localAviationFacts).map((fact) => ({
    text: fact.fact,
    verified: true,
    inherited: fact.inherited ?? fact.geographicRelationship !== 'located-within',
    sourceUrl: fact.sourceUrl || fact.evidence?.href || fact.href,
  }));
  return {
    slug: routeSlug,
    name: record.canonicalName || record.name,
    body,
    title: pageContent?.seoTitle || '',
    description: pageContent?.seoDescription || '',
    h1: pageContent?.h1 || '',
    serviceSlug: service.slug,
    locationNames: hierarchy.map(({ name }) => name),
    similarityLocationNames: [record.canonicalName || record.name],
    verifiedFacts,
    aviationFacts: verifiedFacts.filter(({ inherited }) => !inherited),
    sourceUrls,
    faqs,
    sections: locationSections,
    regulatoryText: `${content.regulatoryContext.country} ${content.regulatoryContext.authority}`,
    regulatorySpecificity: 1,
    geographicSpecificity: content.readiness.geographicSpecificity,
    aviationContext: aviation?.aviationRelevance || '',
    geographicEvidence: hierarchy.map(({ id, type, sourceUrl }) => ({
      id,
      type,
      sourceUrl: sourceUrl || null,
    })),
  };
}

function buildProductionComparisonSnapshots() {
  return PRODUCTION_LOCATION_PROMOTION_INPUTS
    .filter(({ location }) => location.countryCode === INDIA_CODE)
    .map((candidate) => {
      const hierarchy = candidate.content.locationAviationContent?.geographicContext
        ?.map(({ id, name, type }) => ({ id, name, type }))
        || [];
      const content = generateContentModel(
        candidate.location,
        hierarchy,
        candidate.aviationEvidence || [],
        new Map(SERVICES.map((service) => [service.slug, service])),
      );
      return candidateSnapshot(
        candidate.location,
        hierarchy,
        includeCuratedProductionContent(content, candidate),
        candidate.service,
        candidate.location.slug,
      );
    });
}

function getProductionComparisonSnapshots() {
    if (!productionComparisonSnapshotsCache) {
      productionComparisonSnapshotsCache = buildProductionComparisonSnapshots();
    }
    return productionComparisonSnapshotsCache;
}

function readinessGates(record, hierarchy, content, service, differentiation, options) {
  const facts = content.localAviationFacts;
  const localFacts = facts.filter(({ geographicRelationship }) => (
    geographicRelationship === 'located-within'
  ));
  const localSources = new Set(localFacts.map(({ sourceUrl }) => sourceUrl));
  const postalOnly = record.type === 'postal-area';
  const gates = {
    locationIdentity: {
      passed: Boolean(record.id && record.slug && record.canonicalName && record.status === 'sourced'),
      reason: 'Registry identity is sourced and has an ID, canonical name and slug.',
    },
    geographicHierarchy: {
      passed: hierarchy.length > 1
        && hierarchy[0]?.type === 'country'
        && hierarchy.at(-1)?.id === record.id
        && hierarchy.some(({ type }) => type === 'state'),
      reason: 'Country, State/UT and terminal record form a validated parent chain.',
    },
    aviationEvidence: {
      passed: localFacts.length >= 2,
      reason: localFacts.length >= 2
        ? `${localFacts.length} source-backed facts are located within this exact record.`
        : `Only ${localFacts.length} source-backed facts are located within this exact record; at least two are needed for a useful local guide.`,
    },
    serviceSpecificity: {
      passed: Boolean(service.slug === 'pilot-training'
        && content.serviceSpecificFacts[service.slug].explanation
        && localFacts.length >= 2),
      reason: service.slug !== 'pilot-training'
        ? `No independently verified location-specific ${service.shortName.toLowerCase()} content is registered.`
        : localFacts.length >= 2
          ? 'Pilot-training guidance is supported by direct location-specific aviation facts.'
          : 'Pilot-training intent has no sufficient direct location-specific aviation facts.',
    },
    studentPathway: {
      passed: Boolean(content.studentPathway.explanation
        && content.studentPathway.eligibility
        && content.studentPathway.dgcaTheory
        && content.studentPathway.flightTraining),
      reason: 'The configured pilot-training service supplies the DGCA pathway, eligibility and separate flight-training guidance.',
    },
    regulatoryContext: {
      passed: Boolean(content.regulatoryContext.authority
        && /^https:\/\//.test(content.regulatoryContext.source)),
      reason: `The India regulatory authority and official source are ${content.regulatoryContext.authority}.`,
    },
    localFacts: {
      passed: localFacts.length >= 2,
      reason: `${localFacts.length} direct, source-attributed aviation facts are available.`,
    },
    sourceCoverage: {
      passed: localSources.size >= 1
        && localFacts.every(({ sourceUrl, source }) => source && /^https:\/\//.test(sourceUrl)),
      reason: `${localSources.size} distinct aviation source URLs support the local facts.`,
    },
    uniqueSections: {
      passed: content.locationSpecificSections.length >= 1
        && (differentiation?.metrics.uniqueSectionCount || 0) >= 1,
      reason: `${differentiation?.metrics.uniqueSectionCount || 0} location sections are unique against the candidate comparison set.`,
    },
    uniqueFAQs: {
      passed: content.localFAQs.length >= 1
        && (differentiation?.metrics.uniqueFaqCount || 0) >= 1,
      reason: `${differentiation?.metrics.uniqueFaqCount || 0} source-answer FAQs are unique against the comparison set.`,
    },
    geographicSpecificity: {
      passed: new Set(hierarchy.map(({ type }) => type)).size >= 3,
      reason: `${new Set(hierarchy.map(({ type }) => type)).size} geographic levels are represented in the verified hierarchy.`,
    },
    relationshipSafety: {
      passed: content.relationship.type === 'informational'
        && content.relationship.physicalPresenceVerified === false
        && content.relationship.localServiceDeliveryVerified === false
        && content.relationship.source === INFORMATIONAL_RELATIONSHIP_SOURCE,
      reason: 'First-party sourced informational relationship explicitly disclaims local physical or service delivery.',
    },
    differentiation: {
      passed: differentiation?.status === 'PASSED',
      reason: differentiation?.reasons?.join(' ')
        || 'The page passed the configured content differentiation checks.',
    },
    pinPagePolicy: {
      passed: !postalOnly,
      reason: postalOnly
        ? 'PIN/postal-only records are excluded from aviation landing-page content.'
        : 'The record is not a PIN/postal-only area.',
    },
    productionApproval: {
      passed: options.productionApproved === true,
      reason: options.productionApproved
        ? 'This exact location/service route passed the production promotion and allowlist checks.'
        : 'The generated candidate has no explicit production approval; it remains outside the route and sitemap allowlists.',
    },
  };
  return gates;
}

function candidateTier({ productionApproved, supported, facts, postalOnly }) {
  if (postalOnly) return 'REJECTED';
  if (productionApproved) return 'TOP_TIER';
  if (supported) return 'TOP_TIER';
  if (facts > 0) return 'SECONDARY';
  return 'RESEARCH_ONLY';
}

function routeModelsSignature() {
  return PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS
    .map(({ location, service }) => ({
      route: `/${location.slug}/${service.slug}`,
      canonicalPath: `/${location.slug}/${service.slug}`,
      robots: 'index, follow',
    }))
    .sort((left, right) => left.route.localeCompare(right.route));
}

export function buildIndiaLocationCandidateBatch({
  records,
  aviationEvidence = AVIATION_EVIDENCE_RECORDS,
  services = SERVICES.filter(({ slug }) => [
    'pilot-training',
    'dgca-ground-classes',
    'commercial-pilot-training',
    'cpl-training',
  ].includes(slug)),
  comparisons = [],
  approvedPairs = PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS,
  candidateLimit = 100,
} = {}) {
  if (!Array.isArray(records) || !records.length) {
    throw new TypeError('A non-empty India geography registry is required.');
  }
  if (!Array.isArray(aviationEvidence) || !Array.isArray(services)) {
    throw new TypeError('Aviation evidence and service intents must be arrays.');
  }
  if (!Number.isInteger(candidateLimit) || candidateLimit < 1) {
    throw new TypeError('Candidate report limit must be a positive integer.');
  }

  const registryById = new Map(records.map((record) => [record.id, record]));
  const { evidenceByIndiaLocationId, unresolved } = mapAviationEvidenceToIndia(
    records,
    aviationEvidence,
  );
  const contextuallyAmbiguousIds = getContextualAmbiguousIds(records, registryById);
  const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
  const approvedByLocationId = new Map(approvedPairs.map(({ location, service, promotion }) => [
    location.id,
    { location, service, promotion },
  ]));
  const indiaProductionInputs = PRODUCTION_LOCATION_PROMOTION_INPUTS
    .filter(({ location }) => location.countryCode === INDIA_CODE);
  const curatedById = new Map(indiaProductionInputs.map((candidate) => [
    candidate.location.id,
    candidate,
  ]));
  const productionEvaluationByRoute = new Map(
    PRODUCTION_LOCATION_PROMOTION_EVALUATIONS.map((evaluation) => [
      `/${evaluation.locationSlug}/${evaluation.serviceSlug}`,
      evaluation,
    ]),
  );
  const productionComparisonSnapshots = comparisons.length
    ? comparisons
    : buildProductionComparisonSnapshots();
  const drafts = [];
  const counters = {
    invalidHierarchy: 0,
    aviationEvidenceRecordsMatched: 0,
    directAviationFactLocations: 0,
    generatedContentModels: 0,
    ambiguousCanonicalNameCount: 0,
    byType: {},
  };
  const statusCountsByService = Object.fromEntries(services.map(({ slug }) => [slug, {
    SUPPORTED: 0,
    RESEARCH_ONLY: 0,
    REJECTED: 0,
    renderable: 0,
    indexable: 0,
    sitemapEligible: 0,
  }]));
  const blockers = new Map();
  const levelSummary = new Map();
  for (const record of records) {
    counters.byType[record.type] = (counters.byType[record.type] || 0) + 1;
  }
  for (const [type, locations] of Object.entries(counters.byType)) {
    levelSummary.set(type, {
      locations,
      aviationSupported: 0,
      contentReady: 0,
      renderable: 0,
      indexable: 0,
      sitemapEligible: 0,
      researchOnly: 0,
      rejected: 0,
    });
  }
  const candidatePool = [];
  const levelOrder = new Map(GEOGRAPHIC_LEVEL_PRIORITY.map((type, index) => [type, index]));
  const compareCandidate = (left, right) => {
    if (left.productionApproved !== right.productionApproved) {
      return left.productionApproved ? -1 : 1;
    }
    const leftSupported = left.status === 'SUPPORTED';
    const rightSupported = right.status === 'SUPPORTED';
    if (leftSupported !== rightSupported) {
      return leftSupported ? -1 : 1;
    }
    if (left.aviationEvidenceCount !== right.aviationEvidenceCount) {
      return right.aviationEvidenceCount - left.aviationEvidenceCount;
    }
    if (left.aviationSourceCount !== right.aviationSourceCount) {
      return right.aviationSourceCount - left.aviationSourceCount;
    }
    const leftLevel = levelOrder.get(left.geographicLevel) ?? Number.MAX_SAFE_INTEGER;
    const rightLevel = levelOrder.get(right.geographicLevel) ?? Number.MAX_SAFE_INTEGER;
    if (leftLevel !== rightLevel) return leftLevel - rightLevel;
    return left.slug.localeCompare(right.slug);
  };
  const addCandidateToPool = (candidate) => {
    let insertAt = candidatePool.findIndex((current) => compareCandidate(candidate, current) < 0);
    if (insertAt < 0) insertAt = candidatePool.length;
    if (insertAt >= candidateLimit) return;
    candidatePool.splice(insertAt, 0, candidate);
    if (candidatePool.length > candidateLimit) candidatePool.pop();
  };
  for (const record of records) {
    const hierarchy = getHierarchy(record, registryById);
    const hierarchyValid = isValidHierarchy(record, hierarchy);
    if (!hierarchyValid) counters.invalidHierarchy += 1;
    const candidate = curatedById.get(record.id);
    const evidence = evidenceByIndiaLocationId.get(record.id) || [];
    counters.aviationEvidenceRecordsMatched += evidence.length;
    const generatedContent = generateContentModel(record, hierarchy, evidence, serviceBySlug);
    const content = candidate
      ? includeCuratedProductionContent(generatedContent, candidate)
      : generatedContent;
    counters.generatedContentModels += 1;
    const directFacts = content.localAviationFacts.filter(({ geographicRelationship }) => (
      geographicRelationship === 'located-within'
    ));
    if (directFacts.length) counters.directAviationFactLocations += 1;
    const approvedRoute = approvedByLocationId.get(record.id);
    const productionApproved = approvedRoute?.service.slug === 'pilot-training';
    const routeSlug = approvedRoute?.location.slug || record.slug;
    const canonicalNameAmbiguous = contextuallyAmbiguousIds.has(record.id);
    if (canonicalNameAmbiguous) counters.ambiguousCanonicalNameCount += 1;
    if (!evidence.length) {
      const postalOnly = record.type === 'postal-area';
      const status = !hierarchyValid || postalOnly ? 'REJECTED' : 'RESEARCH_ONLY';
      const level = levelSummary.get(record.type);
      if (status === 'REJECTED') level.rejected += 1;
      else level.researchOnly += 1;
      addCandidateToPool({
        locationId: record.id,
        canonicalName: record.canonicalName || record.name,
        slug: record.slug,
        geographicLevel: record.type,
        state: content.state,
        district: content.district,
        parent: hierarchy.at(-2)?.name || null,
        aliases: record.aliases,
        ambiguousCanonicalName: canonicalNameAmbiguous,
        aviationEvidenceCount: 0,
        aviationSourceCount: 0,
        contentGenerated: true,
        contentReady: false,
        relationship: 'research-only',
        status,
        renderable: false,
        indexable: false,
        sitemapEligible: false,
        blockingGates: [{
          gate: postalOnly ? 'pinPagePolicy' : 'aviationEvidence',
          reason: postalOnly
            ? 'PIN/postal-only records are excluded from aviation landing-page content.'
            : 'No exact, source-backed aviation evidence is linked to this geographic record.',
        }],
        productionApproved,
        routeSlug,
      });
      const counts = statusCountsByService;
      for (const service of services) {
        const serviceStatus = counts[service.slug];
        if (!serviceStatus) continue;
        serviceStatus[status] += 1;
        const blocker = service.slug === 'pilot-training'
          ? {
            gate: 'aviationEvidence',
            reason: 'No exact, source-backed aviation evidence is linked to this geographic record.',
          }
          : {
            gate: 'serviceSpecificity',
            reason: `No independently verified location-specific ${service.shortName.toLowerCase()} content is registered.`,
          };
        const blockerKey = `${service.slug}|${blocker.gate}|${blocker.reason}`;
        blockers.set(blockerKey, (blockers.get(blockerKey) || 0) + 1);
      }
      continue;
    }

    const marketEvaluation = productionApproved
      ? productionEvaluationByRoute.get(`/${routeSlug}/pilot-training`)
      : null;
    const pageSnapshot = candidate
      ? candidateSnapshot(
        candidate.location,
        hierarchy,
        content,
        candidate.service,
        routeSlug,
      )
      : candidateSnapshot(record, hierarchy, content, serviceBySlug.get('pilot-training'));
    drafts.push({
      record,
      hierarchy,
      evidence,
      content,
      pageSnapshot,
      hierarchyValid,
      marketEvaluation,
      canonicalNameAmbiguous,
      productionApproved,
      routeSlug,
    });
  }

  const candidateSnapshots = drafts.map(({ pageSnapshot }) => pageSnapshot);
  const resultsByLocation = new Map();

  for (const draft of drafts) {
    const {
      record,
      hierarchy,
      content,
      pageSnapshot,
      hierarchyValid,
      marketEvaluation,
      canonicalNameAmbiguous,
      productionApproved,
      routeSlug,
    } = draft;
    const comparisonsForRecord = [
      ...productionComparisonSnapshots.filter(({ slug }) => slug !== routeSlug),
      ...candidateSnapshots.filter((snapshot) => (
        snapshot.slug !== record.slug && snapshot.slug !== pageSnapshot.slug
      )),
    ];
    const measuredDifferentiation = assessContentDifferentiation({
      candidate: pageSnapshot,
      comparisons: comparisonsForRecord,
    });
    const existingProductionPass = Boolean(
      productionApproved
      && marketEvaluation?.status === 'SUPPORTED'
      && marketEvaluation.indexable === true
      && marketEvaluation.sitemapEligible === true
      && Object.values(marketEvaluation.gates || {}).every(Boolean),
    );
    const differentiation = existingProductionPass
      ? {
        status: 'PASSED',
        metrics: marketEvaluation.differentiation,
        reasons: [marketEvaluation.reason],
      }
      : measuredDifferentiation;
    const locationApproved = productionApproved;
    const locationReadiness = readinessGates(
      record,
      hierarchy,
      content,
      serviceBySlug.get('pilot-training'),
      differentiation,
      { productionApproved: locationApproved },
    );
    if (existingProductionPass) {
      for (const gate of Object.values(locationReadiness)) {
        gate.passed = true;
        gate.reason = 'Preserved from the exact route’s authoritative production-promotion evaluation.';
      }
    }
    const researchStatus = record.relationship === 'research-only'
      || record.indexable !== true;
    const pipeline = evaluateLocationIndexabilityPipeline({
      locationExists: Boolean(record.id && record.slug),
      hierarchyValid,
      serviceExists: Boolean(serviceBySlug.get('pilot-training')),
      serviceCompatible: locationReadiness.serviceSpecificity.passed,
      relationshipValid: locationReadiness.relationshipSafety.passed,
      contentAvailable: locationReadiness.localFacts.passed
        && locationReadiness.studentPathway.passed
        && locationReadiness.regulatoryContext.passed,
      contentDifferentiation: differentiation,
      businessClaimsValid: locationReadiness.relationshipSafety.passed,
      renderable: locationReadiness.localFacts.passed
        && locationReadiness.sourceCoverage.passed
        && locationReadiness.uniqueSections.passed,
      indexabilityApproved: locationApproved
        && marketEvaluation?.status === 'SUPPORTED',
      researchOnly: researchStatus && !locationApproved,
      sitemapAllowlisted: locationApproved
        && approvedByLocationId.has(record.id),
    });
    const contentReady = Object.entries(locationReadiness)
      .filter(([key]) => !['productionApproval', 'pinPagePolicy'].includes(key))
      .every(([, gate]) => gate.passed);
    const renderable = locationReadiness.localFacts.passed
      && locationReadiness.sourceCoverage.passed
      && locationReadiness.uniqueSections.passed
      && locationReadiness.studentPathway.passed
      && locationReadiness.regulatoryContext.passed
      && !canonicalNameAmbiguous;
    const indexable = marketEvaluation?.status === 'SUPPORTED'
      && locationApproved
      && pipeline.status === 'INDEXABLE';
    const supported = contentReady && hierarchyValid && !canonicalNameAmbiguous;
    const postalOnly = record.type === 'postal-area';
    const locationStatus = !hierarchyValid
      ? 'REJECTED'
      : supported
        ? 'SUPPORTED'
        : postalOnly
          ? 'REJECTED'
          : 'RESEARCH_ONLY';
    const locationResult = {
      locationId: record.id,
      canonicalName: record.canonicalName || record.name,
      slug: record.slug,
      routeSlug,
      geographicLevel: record.type,
      state: content.state,
      district: content.district,
      parent: hierarchy.at(-2)?.name || null,
      aliases: record.aliases,
      ambiguousCanonicalName: canonicalNameAmbiguous,
      aviationEvidenceCount: content.localAviationFacts.length,
      aviationSourceCount: new Set(content.localAviationFacts.map(({ sourceUrl }) => sourceUrl)).size,
      contentGenerated: true,
      contentReady,
      relationship: content.relationship.type,
      differentiation: {
        status: differentiation.status,
        normalizedSimilarityPercent: differentiation.metrics.normalizedSimilarityPercent,
        exactDuplicatePercent: differentiation.metrics.exactDuplicatePercent,
        uniqueFAQCount: differentiation.metrics.uniqueFaqCount,
        uniqueSectionCount: differentiation.metrics.uniqueSectionCount,
        locationSpecificSectionCount: differentiation.metrics.locationSpecificSectionCount,
        aviationFactCount: differentiation.metrics.aviationFactCount,
        sourceCount: differentiation.metrics.sourceCount,
        regulatorySpecificity: differentiation.metrics.regulatorySpecificity,
        geographicSpecificity: differentiation.metrics.geographicSpecificity,
        comparedPageCount: differentiation.metrics.comparisonCount,
        reasons: differentiation.reasons,
      },
      status: locationStatus,
      productionApproved,
      renderable,
      indexable,
      sitemapEligible: Boolean(indexable && pipeline.sitemapEligible),
      blockingGates: Object.entries(locationReadiness)
        .filter(([, gate]) => !gate.passed)
        .map(([gate, value]) => ({ gate, reason: value.reason })),
      indexabilityPipeline: pipeline,
      content,
      _evidence: draft.evidence,
    };
    resultsByLocation.set(record.id, locationResult);

    const level = levelSummary.get(record.type) || {
      locations: 0,
      aviationSupported: 0,
      contentReady: 0,
      renderable: 0,
      indexable: 0,
      sitemapEligible: 0,
      researchOnly: 0,
      rejected: 0,
    };
    level.aviationSupported += locationResult.aviationEvidenceCount > 0 ? 1 : 0;
    level.contentReady += contentReady ? 1 : 0;
    level.renderable += renderable ? 1 : 0;
    level.indexable += indexable ? 1 : 0;
    level.sitemapEligible += locationResult.sitemapEligible ? 1 : 0;
    level.researchOnly += locationStatus === 'RESEARCH_ONLY' ? 1 : 0;
    level.rejected += locationStatus === 'REJECTED' ? 1 : 0;
    levelSummary.set(record.type, level);
    addCandidateToPool({
      ...locationResult,
      productionApproved: locationApproved,
    });

    for (const service of services) {
      const isPilotTraining = service.slug === 'pilot-training';
      const serviceCandidate = isPilotTraining
        ? locationResult
        : null;
      const serviceSupported = Boolean(isPilotTraining && supported);
      const serviceIndexable = Boolean(isPilotTraining && indexable);
      const serviceRenderable = Boolean(isPilotTraining && renderable);
      const serviceRejected = !hierarchyValid || postalOnly;
      const serviceClassification = serviceRejected
        ? 'REJECTED'
        : serviceSupported
          ? 'SUPPORTED'
          : 'RESEARCH_ONLY';
      const serviceStatus = statusCountsByService[service.slug];
      serviceStatus[serviceClassification] += 1;
      serviceStatus.renderable += serviceRenderable ? 1 : 0;
      serviceStatus.indexable += serviceIndexable ? 1 : 0;
      serviceStatus.sitemapEligible += Boolean(
        serviceCandidate?.sitemapEligible,
      ) ? 1 : 0;
      const blocker = serviceClassification === 'SUPPORTED'
        ? serviceCandidate?.blockingGates.find(({ gate }) => gate === 'productionApproval')
        : service.slug !== 'pilot-training'
          ? {
            gate: 'serviceSpecificity',
            reason: `No independently verified location-specific ${service.shortName.toLowerCase()} content is registered.`,
          }
          : serviceCandidate?.blockingGates[0];
      if (blocker) {
        const key = `${service.slug}|${blocker.gate}|${blocker.reason}`;
        blockers.set(key, (blockers.get(key) || 0) + 1);
      }
    }
  }

  const topCandidates = candidatePool.filter(({ geographicLevel }) => (
    geographicLevel !== 'postal-area'
  )).slice(0, candidateLimit).map((candidate, index) => ({
    rank: index + 1,
    tier: candidateTier({
      productionApproved: candidate.productionApproved,
      supported: candidate.status === 'SUPPORTED',
      facts: candidate.aviationEvidenceCount,
      postalOnly: false,
    }),
    ...candidate,
    content: undefined,
    _evidence: undefined,
  }));
  const levelTotals = [...levelSummary.values()].reduce((totals, level) => {
    for (const key of [
      'aviationSupported',
      'contentReady',
      'renderable',
      'indexable',
      'sitemapEligible',
    ]) {
      totals[key] += level[key];
    }
    return totals;
  }, {
    aviationSupported: 0,
    contentReady: 0,
    renderable: 0,
    indexable: 0,
    sitemapEligible: 0,
  });

  const allStatuses = Object.values(statusCountsByService)
    .reduce((totals, counts) => {
      for (const status of ['SUPPORTED', 'RESEARCH_ONLY', 'REJECTED']) {
        totals[status] = (totals[status] || 0) + counts[status];
      }
      return totals;
    }, {});
  const totalCombinations = records.length * services.length;
  if (Object.values(allStatuses).reduce((total, count) => total + count, 0) !== totalCombinations) {
    throw new Error('Location/service classifications do not cover the full India registry matrix.');
  }

  return {
    dataset: {
      recordCount: records.length,
      aviationEvidenceCandidateCount: drafts.length,
      locationServiceCombinationCount: totalCombinations,
      geographicLevels: counters.byType,
      invalidHierarchies: counters.invalidHierarchy,
      ambiguousCanonicalNameCount: counters.ambiguousCanonicalNameCount,
      aviationEvidenceRecordsMatched: counters.aviationEvidenceRecordsMatched,
      locationsWithDirectAviationFacts: counters.directAviationFactLocations,
      generatedContentModels: counters.generatedContentModels,
      unresolvedAviationEvidence: unresolved,
    },
    totals: {
      ...allStatuses,
      aviationSupportedLocations: levelTotals.aviationSupported,
      contentReadyLocations: levelTotals.contentReady,
      renderableLocations: levelTotals.renderable,
      indexableLocations: levelTotals.indexable,
      sitemapEligibleLocations: levelTotals.sitemapEligible,
    },
    byGeographicLevel: Object.fromEntries(levelSummary),
    byService: statusCountsByService,
    topBlockers: [...blockers]
      .map(([key, count]) => {
        const [service, gate, reason] = key.split('|');
        return { service, gate, reason, count };
      })
      .sort((left, right) => right.count - left.count)
      .slice(0, 20),
    topCandidates,
    internal: { resultsByLocation, evidenceByIndiaLocationId },
  };
}

export function resolveIndiaCandidateReference(reference, records) {
  if (!reference || typeof reference.name !== 'string' || !reference.name.trim()) {
    return { status: 'REJECTED', reason: 'A non-empty geographic name is required.' };
  }
  try {
    const record = resolveGeographicRecord(reference.name, records, {
      country: INDIA,
      ...(reference.state ? { state: reference.state } : {}),
      ...(reference.district ? { district: reference.district } : {}),
      ...(reference.type ? { type: reference.type } : {}),
    });
    if (!record) return { status: 'NOT_FOUND', record: null, reason: 'No sourced India registry record matched.' };
    if (record.type === 'postal-area') {
      return {
        status: 'POSTAL_ONLY',
        record,
        reason: 'The name matches only a postal/PIN record, not a verified locality identity.',
      };
    }
    return { status: 'RESOLVED', record, reason: null };
  } catch (error) {
    if (/is ambiguous/.test(error.message)) {
      return { status: 'AMBIGUOUS', record: null, reason: error.message };
    }
    throw error;
  }
}

export function summarizeIndiaLocationScale(records, {
  evidenceByIndiaLocationId,
  sampleSize,
  services = SERVICES.filter(({ slug }) => [
    'pilot-training',
    'dgca-ground-classes',
    'commercial-pilot-training',
    'cpl-training',
  ].includes(slug)),
} = {}) {
  if (!Array.isArray(records) || !Number.isInteger(sampleSize) || sampleSize < 1) {
    throw new TypeError('Registry records and a positive sample size are required.');
  }
  const groups = new Map();
  for (const record of records) {
    const group = groups.get(record.type) || [];
    group.push(record);
    groups.set(record.type, group);
  }
  const stratified = [];
  let cursor = 0;
  while (stratified.length < Math.min(sampleSize, records.length)) {
    let added = false;
    for (const group of groups.values()) {
      if (cursor < group.length && stratified.length < sampleSize) {
        stratified.push(group[cursor]);
        added = true;
      }
    }
    if (!added) throw new Error(`Unable to sample ${sampleSize} unique geography records.`);
    cursor += 1;
  }
  const requiredIds = new Set(PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS
    .filter(({ location }) => location.countryCode === INDIA_CODE)
    .map(({ location }) => location.id));
  const required = records.filter(({ id }) => requiredIds.has(id));
  const sampledIds = new Set(required.map(({ id }) => id));
  const sampled = [...required];
  for (const record of stratified) {
    if (sampled.length >= sampleSize) break;
    if (!sampledIds.has(record.id)) {
      sampled.push(record);
      sampledIds.add(record.id);
    }
  }

  const registryById = new Map(records.map((record) => [record.id, record]));
  const serviceBySlug = new Map(services.map((service) => [service.slug, service]));
  const productionCandidates = new Map(
    PRODUCTION_LOCATION_PROMOTION_INPUTS
      .filter(({ location }) => location.countryCode === INDIA_CODE)
      .map((candidate) => [candidate.location.id, candidate]),
  );
  const approvedByLocationId = new Map(PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS
    .filter(({ location }) => location.countryCode === INDIA_CODE)
    .map((pair) => [pair.location.id, pair]));
  const productionEvaluations = new Map(PRODUCTION_LOCATION_PROMOTION_EVALUATIONS
    .map((evaluation) => [
      `/${evaluation.locationSlug}/${evaluation.serviceSlug}`,
      evaluation,
    ]));
  const contextuallyAmbiguousIds = getContextualAmbiguousIds(sampled, registryById);
  const started = performance.now();
  const memoryBeforeBytes = process.memoryUsage().heapUsed;
  let resolved = 0;
  let hierarchyValid = 0;
  let aviationLookupStarted = 0;
  let aviationLookupEnded = 0;
  let aviationEvidenceLocations = 0;
  let contentGenerationStarted = 0;
  let contentGenerationEnded = 0;
  let generatedModels = 0;
  let renderable = 0;
  let indexable = 0;
  let supported = 0;
  let researchOnly = 0;
  let rejected = 0;
  let differentiated = 0;
  let differentiationNotReached = 0;
  let comparisonCount = 0;
  let exactDuplicates = 0;
  let maximumSimilarity = 0;
  const localContentSnapshots = [];
  const scaleEvidence = evidenceByIndiaLocationId || new Map();
  const productionComparisonSnapshots = buildProductionComparisonSnapshots();

  for (const record of sampled) {
    if (registryById.get(record.id) === record) resolved += 1;
    const hierarchy = getHierarchy(record, registryById);
    const validHierarchy = isValidHierarchy(record, hierarchy);
    if (validHierarchy) hierarchyValid += 1;

    aviationLookupStarted += performance.now();
    const evidence = scaleEvidence.get(record.id) || [];
    aviationLookupEnded += performance.now();
    const facts = evidence.filter(({ fact, type, geographicRelationship }) => (
      type !== 'aviation-authority'
      && geographicRelationship === 'located-within'
      && typeof fact === 'string'
      && fact.trim()
    ));
    if (facts.length) aviationEvidenceLocations += 1;

    contentGenerationStarted += performance.now();
    const generatedContent = generateContentModel(
      record,
      hierarchy,
      evidence,
      serviceBySlug,
    );
    const productionCandidate = productionCandidates.get(record.id);
    const content = productionCandidate
      ? includeCuratedProductionContent(generatedContent, productionCandidate)
      : generatedContent;
    generatedModels += 1;
    contentGenerationEnded += performance.now();
    if (facts.length >= 2 || productionCandidate) {
      const routeSlug = productionCandidate?.location.slug || record.slug;
      localContentSnapshots.push({
        record,
        hierarchy,
        content,
        productionCandidate,
        routeSlug,
        snapshot: candidateSnapshot(
          productionCandidate?.location || record,
          hierarchy,
          content,
          productionCandidate?.service || serviceBySlug.get('pilot-training'),
          routeSlug,
        ),
      });
    }
  }

  const snapshots = localContentSnapshots.map(({ snapshot }) => snapshot);
  const differentiationStarted = performance.now();
  for (const candidate of localContentSnapshots) {
    const comparisonPages = [
      ...productionComparisonSnapshots.filter(({ slug }) => slug !== candidate.routeSlug),
      ...snapshots.filter(({ slug }) => slug !== candidate.routeSlug),
    ];
    const measuredDifferentiation = assessContentDifferentiation({
      candidate: candidate.snapshot,
      comparisons: comparisonPages,
    });
    comparisonCount += comparisonPages.length;
    maximumSimilarity = Math.max(
      maximumSimilarity,
      measuredDifferentiation.metrics.normalizedSimilarityPercent || 0,
    );
    exactDuplicates += measuredDifferentiation.metrics.exactDuplicatePercent === 100
      ? 1
      : 0;
    const approvedRoute = approvedByLocationId.get(candidate.record.id);
    const productionEvaluation = approvedRoute
      ? productionEvaluations.get(`/${approvedRoute.location.slug}/pilot-training`)
      : null;
    const productionPass = Boolean(
      productionEvaluation?.status === 'SUPPORTED'
      && productionEvaluation.indexable === true
      && productionEvaluation.sitemapEligible === true
      && Object.values(productionEvaluation.gates || {}).every(Boolean),
    );
    const differentiation = productionPass
      ? {
        status: 'PASSED',
        metrics: productionEvaluation.differentiation,
        reasons: [productionEvaluation.reason],
      }
      : measuredDifferentiation;
    if (differentiation.status === 'PASSED') differentiated += 1;
    const readiness = readinessGates(
      candidate.record,
      candidate.hierarchy,
      candidate.content,
      serviceBySlug.get('pilot-training'),
      differentiation,
      { productionApproved: productionPass },
    );
    const contentGatesPassed = Object.entries(readiness)
      .filter(([name]) => !['productionApproval', 'pinPagePolicy'].includes(name))
      .every(([, gate]) => gate.passed);
    const supportedPilot = productionPass || (
      contentGatesPassed
      && candidate.hierarchy.length > 1
      && !contextuallyAmbiguousIds.has(candidate.record.id)
    );
    if (supportedPilot) supported += 1;
    const isRenderable = productionPass || (
      readiness.localFacts.passed
      && readiness.sourceCoverage.passed
      && readiness.uniqueSections.passed
      && readiness.studentPathway.passed
      && readiness.regulatoryContext.passed
      && !contextuallyAmbiguousIds.has(candidate.record.id)
    );
    renderable += isRenderable ? 1 : 0;
    indexable += productionPass ? 1 : 0;
  }
  const differentiationElapsedMs = Number((performance.now() - differentiationStarted).toFixed(2));
  differentiationNotReached = sampled.length - localContentSnapshots.length;
  rejected = sampled.filter((record) => {
    const hierarchy = getHierarchy(record, registryById);
    return record.type === 'postal-area' || !isValidHierarchy(record, hierarchy);
  }).length;
  researchOnly = sampled.length - supported - rejected;
  const memoryAfterBytes = process.memoryUsage().heapUsed;
  const totalElapsedMs = Number((performance.now() - started).toFixed(2));

  return {
    sampleRecords: sampled.length,
    geographyResolved: resolved,
    validHierarchy: hierarchyValid,
    aviationEvidenceLocations,
    generatedContentModels: generatedModels,
    contentGenerationElapsedMs: Number((contentGenerationEnded - contentGenerationStarted).toFixed(2)),
    aviationEvidenceLookupElapsedMs: Number((aviationLookupEnded - aviationLookupStarted).toFixed(2)),
    differentiationElapsedMs,
    differentiatedCandidates: differentiated,
    differentiationNotReached,
    locationServiceCombinations: sampled.length * services.length,
    supported,
    renderable,
    indexable,
    researchOnly,
    rejected,
    duplicateContent: {
      comparisons: comparisonCount,
      exactDuplicates,
      maximumNormalizedSimilarityPercent: Number(maximumSimilarity.toFixed(1)),
    },
    memory: {
      heapBeforeBytes: memoryBeforeBytes,
      heapAfterBytes: memoryAfterBytes,
      heapDeltaBytes: memoryAfterBytes - memoryBeforeBytes,
      measurementNote: 'Post-run heap delta; garbage collection may make this value negative.',
    },
    elapsedMs: totalElapsedMs,
  };
}
