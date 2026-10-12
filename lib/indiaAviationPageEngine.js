import { AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/aviation-evidence.js';
import { INDIA_AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/india-aviation-evidence.generated.js';
import { AVIATION_MARKET_PAGE_CANDIDATES } from '../data/location-seo/aviation-market-pages.js';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from '../data/location-seo/geography/global-pilot.js';
import { SERVICES } from '../data/location-seo/services.js';
import { buildLocationPageModel } from './locationEngine.js';
import { loadIndiaGeographicRegistry } from './indiaGeographicRegistry.js';
import { resolveGeographicRecord, resolveHierarchy } from './geographicData.js';
import { buildLocationContentSnapshot, assessContentDifferentiation } from './locationContentDifferentiation.js';
import {
  getApprovedLocationServicePairs,
  getLocationEngineContext,
} from './locationSeo.js';

const SITE_ORIGIN = 'https://weoneaviation.in';
const REVIEWED_AT = '2026-10-03';
const CORE_INTENTS = Object.freeze([
  'pilot-training',
  'dgca-ground-classes',
  'commercial-pilot-training',
  'cpl-training',
]);
const TRAINING_EVIDENCE_CATEGORIES = new Set([
  'flying-school-fto',
  'flying-club',
  'pilot-training-organization',
  'aviation-academy',
  'aviation-college',
  'airline-training-organization',
]);
let pilotBatchPromise;
const registryRecordMaps = new WeakMap();
const INTENT_PHRASES = Object.freeze([
  { phrase: 'commercial pilot training in ', serviceSlug: 'commercial-pilot-training' },
  { phrase: 'dgca ground classes in ', serviceSlug: 'dgca-ground-classes' },
  { phrase: 'cpl training in ', serviceSlug: 'cpl-training' },
  { phrase: 'pilot training in ', serviceSlug: 'pilot-training' },
]);

function normalize(value) {
  return String(value || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function stateFor(location, hierarchy) {
  return hierarchy.findLast(({ type }) => type === 'state')?.name
    || location.state
    || null;
}

function evidenceCategory(type) {
  const categories = {
    airport: 'airport',
    aerodrome: 'aerodrome',
    'flight-school': 'flying-school-fto',
    'flying-club': 'flying-club',
    'pilot-training-organization': 'pilot-training-organization',
    'airline-training-organization': 'airline-training-organization',
    'aviation-college': 'aviation-college',
    'aviation-academy': 'aviation-academy',
    'medical-centre': 'aviation-medical-facility',
    'aviation-authority': 'dgca-regulatory-context',
    'examination-facility': 'aviation-examination-facility',
    'aviation-infrastructure': 'aviation-training-infrastructure',
    'aviation-organization': 'aviation-ecosystem',
  };
  return categories[type] || 'aviation-ecosystem';
}

function evidenceSignal(evidence) {
  return {
    id: evidence.id,
    name: evidence.name,
    category: evidenceCategory(evidence.type),
    source: evidence.source,
    sourceUrl: evidence.sourceUrl,
    sourceDate: evidence.sourceDate || null,
    reviewedAt: evidence.verifiedAt || REVIEWED_AT,
    confidence: evidence.verificationStatus === 'primary-source-listed'
      ? 'high'
      : 'unrated',
    geographicRelationship: evidence.geographicRelationship || 'unresolved',
    distanceKm: Number.isFinite(evidence.distanceKm) ? evidence.distanceKm : null,
    fact: evidence.fact || null,
    relationshipNote: evidence.attributionNote || null,
  };
}

function marketCandidateFor(location, state) {
  const matches = AVIATION_MARKET_PAGE_CANDIDATES.filter((candidate) => (
    normalize(candidate.productionLocation.city) === normalize(location.name)
    && normalize(candidate.productionLocation.state) === normalize(state)
  ));
  return matches.length === 1 ? matches[0] : null;
}

function getRegistryRecordMap(records) {
  let recordMap = registryRecordMaps.get(records);
  if (!recordMap) {
    recordMap = new Map(records.map((record) => [record.id, record]));
    registryRecordMaps.set(records, recordMap);
  }
  return recordMap;
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

function directEvidenceFor(location, state, hierarchy, registryRecordMap) {
  const locationType = normalize(location.type);
  const terminalPlaceTypes = new Set(['city', 'populated-place']);
  const locationIdentities = hierarchy.map((node) => ({
    type: normalize(node.type),
    name: normalize(node.name),
    terminal: node.id === location.id,
  }));
  const globalEvidence = AVIATION_EVIDENCE_RECORDS.filter((evidence) => {
    if (evidence.countryCode !== 'IN' || evidence.type === 'aviation-authority') return false;
    const sourceRecord = registryRecordMap.get(evidence.locationId);
    if (!sourceRecord) return false;
    const sourceNodes = sourceHierarchy(sourceRecord, registryRecordMap);
    const sourceState = sourceNodes.find(({ type }) => normalize(type) === 'state')?.name
      || sourceRecord.state
      || null;
    return sourceNodes.some((sourceNode) => locationIdentities.some((target) => {
      const exactLevel = normalize(sourceNode.type) === target.type;
      const terminalCityCrosswalk = target.terminal
        && terminalPlaceTypes.has(locationType)
        && terminalPlaceTypes.has(normalize(sourceNode.type));
      const matchingPlace = normalize(sourceNode.name) === target.name;
      const matchingState = !sourceState
        || normalize(sourceState) === normalize(state);
      return target.terminal
        && (exactLevel || terminalCityCrosswalk)
        && matchingPlace
        && matchingState;
    }));
  });
  const indiaEvidence = INDIA_AVIATION_EVIDENCE_RECORDS.flatMap((evidence) => {
    const sourceNode = hierarchy.find(({ id }) => id === evidence.locationId);
    if (!sourceNode
      || normalize(sourceNode.type) !== normalize(evidence.geographicType)
      || normalize(evidence.geographicState) !== normalize(state)) {
      return [];
    }
    const exactLocation = sourceNode.id === location.id;
    const remainsRegional = evidence.geographicRelationship === 'regional-context'
      || !exactLocation;
    return [{
      ...evidence,
      geographicRelationship: remainsRegional ? 'regional-context' : 'located-within',
      attributionNote: exactLocation || !remainsRegional
        ? evidence.attributionNote
        : `${evidence.attributionNote} The source record is associated with parent ${sourceNode.name}, not this ${location.type}.`,
    }];
  });
  return [...globalEvidence, ...indiaEvidence];
}

function marketLocationContent(candidate, service, location, state, hierarchy) {
  if (service.slug !== 'pilot-training') return null;
  const baseContent = candidate.productionLocation.serviceContent['pilot-training'];
  const relationship = candidate.serviceRelationship;
  const serviceFaq = {
    question: `What should students in ${location.name} check before choosing ${service.shortName.toLowerCase()}?`,
    answer: `${service.serviceExplanation} The listed aviation facilities are independent of We One Aviation. Confirm current admission, approval and delivery details with each relevant provider.`,
  };
  const facts = candidate.content.localFacts.map(({ fact, evidenceId }) => {
    const evidence = candidate.aviationEvidence.find((item) => item.id === evidenceId);
    return {
      text: fact,
      verified: true,
      source: evidence?.source || null,
      sourceUrl: evidence?.sourceUrl || null,
      sourceDate: evidence?.sourceDate || null,
    };
  });
  const indiaEvidenceIds = new Set(INDIA_AVIATION_EVIDENCE_RECORDS.map(({ id }) => id));
  const additionalMedicalEvidence = candidate.aviationEvidence.filter(({ id }) => (
    indiaEvidenceIds.has(id)
  ));
  facts.push(...additionalMedicalEvidence.map((evidence) => ({
    text: evidence.fact,
    verified: true,
    source: evidence.source,
    sourceUrl: evidence.sourceUrl,
    sourceDate: evidence.sourceDate || null,
  })));
  const sections = candidate.productionLocation.localSections.map((section) => ({
    ...section,
    evidenceIds: section.items
      ?.map(({ label }) => candidate.aviationEvidence.find((item) => item.name === label)?.id)
      .filter(Boolean) || [],
  }));
  const profile = candidate.content.localAviationProfile;
  const signals = candidate.aviationEvidence
    .filter(({ type }) => type !== 'aviation-authority')
    .map(evidenceSignal);
  const locationAviationContent = {
    geographicLevel: location.type,
    locationOverview: candidate.content.introduction,
    geographicContext: hierarchy.map(({ name, type, sourceLinks = [] }) => ({
      name,
      type,
      sources: sourceLinks.map(({ publisher, href }) => ({ publisher, href })),
    })),
    aviationRelevance: profile.aviationEcosystem,
    aviationFacts: facts,
    nearbyAviationHubs: signals.filter(
      ({ geographicRelationship }) => geographicRelationship === 'regional-context',
    ),
    airportContext: signals.filter(({ category }) => (
      ['airport', 'aerodrome'].includes(category)
    )),
    trainingInfrastructure: signals.filter(({ category }) => (
      TRAINING_EVIDENCE_CATEGORIES.has(category)
    )),
    medicalContext: signals.filter(({ category }) => (
      category === 'aviation-medical-facility'
    )),
    regulatoryContext: {
      country: candidate.regulatoryContext.country,
      authority: candidate.regulatoryContext.authority,
      source: candidate.regulatoryContext.source,
      reviewedAt: candidate.regulatoryContext.reviewedAt,
    },
    studentPathway: {
      explanation: service.serviceExplanation,
      dgcaPathway: service.dgcaPathway,
      eligibility: service.eligibility,
      flightTraining: service.flightTrainingPathway,
    },
    howStudentsFromLocationCanTrain: candidate.content.localApplication,
    physicalVsOnlineExplanation: candidate.serviceRelationship.statement,
    flightTrainingExplanation: profile.flightTrainingInfrastructure,
    ftoSelectionGuidance: profile.localTrainingConsiderations,
    localFaqs: [
      ...candidate.content.faqs,
      ...additionalMedicalEvidence.map((evidence) => ({
        question: `What does DGCA's medical-centre inventory list for ${evidence.name}?`,
        answer: evidence.fact,
        evidenceId: evidence.id,
      })),
    ],
    sourceLinks: [
      ...profile.sourceReferences,
      ...additionalMedicalEvidence.map((evidence) => ({
        title: evidence.name,
        publisher: evidence.source,
        href: evidence.sourceUrl,
      })),
    ],
    sourceDates: [
      ...profile.sourceReferences.map(({ title, href, sourceDate }) => ({
        title,
        href,
        sourceDate: sourceDate || null,
      })),
      ...additionalMedicalEvidence.map((evidence) => ({
        title: evidence.name,
        href: evidence.sourceUrl,
        sourceDate: evidence.sourceDate || null,
      })),
    ],
    confidence: {
      geography: location.confidence || null,
      aviationEvidence: signals.every(({ confidence }) => confidence === 'high')
        ? 'primary-source-listed'
        : 'mixed-or-unrated',
      evidenceCount: signals.length,
      sourceCount: new Set(signals.map(({ sourceUrl }) => sourceUrl)).size,
    },
  };

  return {
    location: {
      ...candidate.productionLocation,
      ...location,
      city: location.name,
      state,
      country: 'India',
      countryCode: 'IN',
      relationship: 'informational',
      physicalAcademy: false,
      physicalPresence: { verified: false },
      onlineTraining: false,
      flightTrainingGuidance: false,
      indexable: false,
      indexabilityState: 'RESEARCH_ONLY',
      renderable: true,
      supportedServices: [service.slug],
      verifiedFacts: facts,
      localSections: sections,
      sourceLinks: candidate.productionLocation.sourceLinks,
      locationAviationContent,
      serviceContent: {
        [service.slug]: {
          ...baseContent,
          seoTitle: `${service.shortName} in ${location.name} | We One Aviation`,
          seoDescription: `${service.shortName} guidance for students in ${location.name}, ${state}. Read source-linked aviation context and the separate Indian pilot-training pathway; no local We One Aviation branch is claimed.`,
          h1: `${service.shortName} guidance for students in ${location.name}`,
          breadcrumbLabel: `${service.shortName} in ${location.name}`,
          introduction: candidate.content.introduction,
          localApplication: [
            candidate.content.localApplication,
            service.serviceExplanation,
          ].filter(Boolean).join(' '),
          localContext: candidate.content.localContext,
          relationshipStatement: relationship.statement,
          faqs: [...candidate.content.faqs, serviceFaq],
          trainingMode: relationship.verifiedFact,
          internalLinks: baseContent.internalLinks,
          cta: baseContent.cta,
          locationAviationContent,
        },
      },
    },
    content: {
      ...baseContent,
      seoTitle: `${service.shortName} in ${location.name} | We One Aviation`,
      seoDescription: `${service.shortName} guidance for students in ${location.name}, ${state}. Read source-linked aviation context and the separate Indian pilot-training pathway; no local We One Aviation branch is claimed.`,
      h1: `${service.shortName} guidance for students in ${location.name}`,
      breadcrumbLabel: `${service.shortName} in ${location.name}`,
      introduction: candidate.content.introduction,
      localApplication: [
        candidate.content.localApplication,
        service.serviceExplanation,
      ].filter(Boolean).join(' '),
      localContext: candidate.content.localContext,
      relationshipStatement: relationship.statement,
      faqs: [...candidate.content.faqs, serviceFaq],
      trainingMode: relationship.verifiedFact,
      internalLinks: baseContent.internalLinks,
      cta: baseContent.cta,
      locationAviationContent,
    },
    relationshipEvidence: relationship,
    localAviationProfile: candidate.content.localAviationProfile,
    facts,
    sections,
  };
}

function evidenceOnlyLocationContent(location, state, service, evidence) {
  if (service.slug !== 'pilot-training') return null;
  const facts = evidence
    .filter(({ fact }) => typeof fact === 'string' && fact.trim())
    .map((item) => ({
      text: item.fact,
      verified: true,
      source: item.source,
      sourceUrl: item.sourceUrl,
      sourceDate: item.sourceDate || null,
    }));
  if (facts.length < 2) return null;

  const evidenceFaqs = evidence
    .filter(({ fact }) => fact)
    .map((item) => ({
      question: `What does the cited source report about ${item.name}?`,
      answer: item.fact,
    }));
  const sections = evidence
    .filter(({ fact }) => fact)
    .map((item) => ({
      title: item.type === 'flight-school'
        ? 'Independent flight-training organization'
        : `Aviation context: ${item.name}`,
      body: item.attributionNote || item.fact,
      items: [{ label: item.name, detail: item.fact }],
      evidenceIds: [item.id],
    }));
  const relationshipStatement = 'This is informational guidance only. We One Aviation does not claim a branch, classroom, instructor, service area or flying-school relationship at this location. The documented classroom is in Dwarka, Delhi; online availability should be confirmed with the academy.';
  const content = {
    seoTitle: `${service.shortName} in ${location.name} | We One Aviation`,
    seoDescription: `${service.shortName} guidance for ${location.name}, ${state}, with source-linked aviation facts. This does not claim a local We One Aviation branch or training facility.`,
    h1: `${service.shortName} guidance for ${location.name}`,
    breadcrumbLabel: `${service.shortName} in ${location.name}`,
    introduction: `${location.name} is recorded in ${state}, India. The aviation facts below describe independently sourced infrastructure or organizations; they do not establish local delivery by We One Aviation.`,
    localApplication: `${service.serviceExplanation} Students should confirm the current DGCA pathway and independently verify any training organization; no listed facility is represented as a We One Aviation partner.`,
    localContext: facts.map(({ text }) => text).join(' '),
    relationshipStatement,
    trainingMode: 'Informational guidance; no local delivery relationship is verified.',
    faqs: [
      ...evidenceFaqs,
      {
        question: `Does We One Aviation operate a ${location.name} branch or flying school?`,
        answer: 'No local branch or flying-school presence is claimed. The documented physical classroom is in Dwarka, Delhi; ask the academy directly about online ground-class availability.',
      },
    ],
    internalLinks: [
      {
        context: 'Review the Indian licensing route.',
        label: 'Pilot training in India',
        href: '/pilot-training-in-india',
      },
      {
        context: 'Compare the theory-training offer.',
        label: 'DGCA ground classes',
        href: '/dgca-ground-classes',
      },
    ],
    cta: { label: 'Contact We One Aviation', href: '/contact' },
  };
  return {
    location: {
      ...location,
      city: location.name,
      state,
      country: 'India',
      countryCode: 'IN',
      relationship: 'informational',
      physicalAcademy: false,
      physicalPresence: { verified: false },
      onlineTraining: false,
      flightTrainingGuidance: false,
      indexable: false,
      indexabilityState: 'RESEARCH_ONLY',
      renderable: true,
      supportedServices: [service.slug],
      verifiedFacts: facts,
      localSections: sections,
      sourceLinks: [...new Map(evidence.map((item) => [
        item.sourceUrl,
        { label: item.source, href: item.sourceUrl },
      ])).values()],
      serviceContent: { [service.slug]: content },
    },
    content,
    relationshipEvidence: {
      serviceSlug: service.slug,
      type: 'informational',
      verified: true,
      source: 'https://weoneaviation.in/about-us',
      verifiedAt: REVIEWED_AT,
      verifiedFact: relationshipStatement,
      physicalPresenceVerified: false,
      localServiceDeliveryVerified: false,
      statement: relationshipStatement,
    },
    localAviationProfile: null,
    facts,
    sections,
  };
}

function buildProductionComparisons() {
  return getApprovedLocationServicePairs().map(({ location, service }) => {
    const context = getLocationEngineContext(location);
    const model = buildLocationPageModel({
      location,
      service,
      locations: context.locations,
      geographicDataValidated: context.geographicDataValidated,
    });
    return buildLocationContentSnapshot({
      location,
      hierarchy: model.hierarchy,
      model,
      sections: (location.localSections || []).map((section) => ({
        ...section,
        verified: true,
      })),
    });
  });
}

function makeOutcome({
  record,
  hierarchy,
  service,
  registry,
  contentData,
  aviationEvidence = [],
  reason,
}) {
  if (!record) {
    return {
      location: null,
      service,
      supportStatus: 'NOT_SUPPORTED',
      renderStatus: 'NOT_RENDERABLE',
      indexability: 'REJECTED',
      classification: 'REJECTED',
      relationship: 'rejected',
      model: null,
      aviationRelevance: [],
      supportedServices: [],
      reason,
    };
  }

  const state = stateFor(record, hierarchy);
  const relationship = contentData ? 'informational' : 'research-only';
  const location = contentData?.location || {
    ...record,
    city: record.name,
    state,
    country: 'India',
    countryCode: 'IN',
    relationship,
    physicalAcademy: false,
    physicalPresence: { verified: false },
    onlineTraining: false,
    flightTrainingGuidance: false,
    indexable: false,
    indexabilityState: 'RESEARCH_ONLY',
    renderable: false,
    supportedServices: [],
    serviceContent: {},
    localSections: [],
    localFAQs: [],
  };
  const model = buildLocationPageModel({
    location,
    service,
    content: contentData?.content || null,
    siteOrigin: SITE_ORIGIN,
    locations: registry.records,
    geographicDataValidated: registry.validationErrors === 0,
  });
  const evidence = contentData?.evidence || aviationEvidence;
  const renderable = model.canRender === true;
  const differentiationPassed = contentData
    ? model.contentDifferentiation?.status === 'PASSED'
    : false;
  const classification = model.indexability === 'INDEXABLE'
    ? 'INDEXABLE'
    : renderable && differentiationPassed ? 'RENDERABLE' : 'RESEARCH';
  const signals = evidence.map(evidenceSignal);
  const regulatoryContext = AVIATION_REGULATORY_CONTEXTS.India;

  return {
    location,
    service,
    supportStatus: model.supportStatus,
    renderStatus: model.renderStatus,
    indexability: model.indexability,
    classification,
    relationship: model.relationship,
    model,
    hierarchy,
    aviationRelevance: signals,
    aviationContent: {
      locationId: record.id,
      aviationFacts: signals.filter(({ fact }) => fact),
      nearbyAviationHubs: signals.filter(
        ({ geographicRelationship }) => geographicRelationship === 'regional-context',
      ),
      airportInformation: signals.filter(
        ({ category }) => ['airport', 'aerodrome'].includes(category),
      ),
      medicalInformation: signals.filter(
        ({ category }) => category === 'aviation-medical-facility',
      ),
      regulatoryContext,
      studentPathway: {
        intent: service.searchIntent,
        serviceExplanation: service.serviceExplanation,
        eligibility: service.eligibility,
        dgcaPathway: service.dgcaPathway,
        flightTrainingPathway: service.flightTrainingPathway,
      },
      localSearchIntent: `${service.searchIntent} Location: ${record.name}, ${state}, India.`,
      nearbyTrainingOptions: signals.filter(({ category }) => (
        TRAINING_EVIDENCE_CATEGORIES.has(category)
      )),
      uniqueFAQs: model.faqs,
      sources: signals.map(({
        source,
        sourceUrl,
        sourceDate,
        reviewedAt,
        confidence,
        geographicRelationship,
        distanceKm,
      }) => ({
        source,
        sourceUrl,
        sourceDate,
        reviewedAt,
        confidence,
        geographicRelationship,
        distanceKm,
      })),
      relationship: relationship.toUpperCase().replace(/-/g, '_'),
      contentDifferentiation: model.contentDifferentiation,
    },
    locationAviationContent: contentData?.locationAviationContent || null,
    localAviationProfile: contentData?.localAviationProfile || null,
    supportedServices: location.supportedServices || [],
    reason: reason || (renderable
      ? model.indexabilityPipeline?.reason || 'A source-backed informational page model passed the rendering gate; indexation remains unapproved.'
      : 'No complete, source-backed location-specific aviation content model is available.'),
  };
}

function buildCandidateSnapshot(outcome) {
  return buildLocationContentSnapshot({
    location: outcome.location,
    hierarchy: outcome.hierarchy,
    model: outcome.model,
    sections: (outcome.location.localSections || []).map((section) => ({
      title: section.title,
      body: [
        section.body,
        section.closing,
        ...(section.items || []).flatMap(({ label, detail }) => [label, detail]),
      ].filter(Boolean).join(' '),
      verified: section.evidenceIds?.length > 0
        || section.items?.length > 0,
    })),
  });
}

function resolveInput(reference, registry, options = {}) {
  if (typeof reference !== 'string' || !reference.trim()) {
    return { record: null, status: 'REJECTED', reason: 'A geographic reference is required.' };
  }
  try {
    const record = resolveGeographicRecord(reference.trim(), registry.records, {
      ...options,
      country: 'India',
    });
    return record
      ? { record, status: 'RESOLVED', reason: null }
      : { record: null, status: 'NOT_FOUND', reason: `No India geography record matched "${reference}".` };
  } catch (error) {
    if (/is ambiguous/.test(error.message)) {
      return { record: null, status: 'AMBIGUOUS', reason: error.message };
    }
    throw error;
  }
}

export function getIndiaCoreAviationIntents() {
  return CORE_INTENTS.map((slug) => SERVICES.find((service) => service.slug === slug));
}

export function getIndiaPilotReferenceDefinitions() {
  return [
    { name: 'Laxmi Nagar', state: 'Delhi', type: 'neighborhood' },
    { name: 'GTB Nagar', state: 'Delhi', type: 'locality' },
    { name: 'Rohini', state: 'Delhi', type: 'locality' },
    { name: 'Janakpuri', state: 'Delhi', type: 'populated-place' },
    { name: 'Karol Bagh', state: 'Delhi', type: 'neighborhood' },
    { name: 'Pitampura', state: 'Delhi', type: 'populated-place' },
    { name: 'Rajouri Garden', state: 'Delhi', type: 'subdistrict' },
    { name: 'Saket', state: 'Delhi', type: 'neighborhood' },
    { name: 'Vasant Kunj', state: 'Delhi', type: 'neighborhood' },
    { name: 'Mayur Vihar', state: 'Delhi', type: 'subdistrict' },
    { name: 'Shahdara', state: 'Delhi', type: 'neighborhood' },
    { name: 'Noida', state: 'Uttar Pradesh', type: 'populated-place' },
    { name: 'Ghaziabad', state: 'Uttar Pradesh', type: 'city' },
    { name: 'Gurugram', state: 'Haryana', type: 'city' },
    { name: 'Faridabad', state: 'Haryana', type: 'city' },
    ...[
      ['Mumbai', 'Maharashtra', ['city']],
      ['Pune', 'Maharashtra', ['city', 'populated-place']],
      ['Nagpur', 'Maharashtra', ['city']],
      ['Lucknow', 'Uttar Pradesh', ['city']],
      ['Kanpur', 'Uttar Pradesh', ['populated-place'], 'Kanpur'],
      ['Varanasi', 'Uttar Pradesh', ['populated-place'], 'Varanasi'],
      ['Jaipur', 'Rajasthan', ['city']],
      ['Ahmedabad', 'Gujarat', ['city', 'populated-place']],
      ['Hyderabad', 'Telangana', ['city']],
      ['Bengaluru', 'Karnataka', ['city']],
      ['Chennai', 'Tamil Nadu', ['city']],
      ['Kolkata', 'West Bengal', ['city']],
      ['Thiruvananthapuram', 'Kerala', ['city']],
      ['Kochi', 'Kerala', ['city', 'populated-place']],
      ['Bhopal', 'Madhya Pradesh', ['city']],
      ['Indore', 'Madhya Pradesh', ['city', 'populated-place']],
      ['Patna', 'Bihar', ['city']],
      ['Bhubaneswar', 'Odisha', ['city']],
      ['Chandigarh', 'Chandigarh', ['city']],
      ['Dehradun', 'Uttarakhand', ['city']],
      ['Ranchi', 'Jharkhand', ['city']],
      ['Guwahati', 'Assam', ['city', 'populated-place']],
      ['Srinagar', 'Jammu and Kashmir', ['city']],
      ['Amritsar', 'Punjab', ['city', 'populated-place']],
    ].map(([name, state, types, district]) => ({
      name,
      state,
      types,
      ...(district ? { district } : {}),
    })),
  ];
}

function findPilotReference(reference, registry) {
  const types = reference.types || [reference.type];
  for (const type of types.filter(Boolean)) {
    const result = resolveInput(reference.name, registry, {
      country: 'India',
      state: reference.state,
      district: reference.district || null,
      type,
    });
    if (result.record || result.status === 'AMBIGUOUS') return result;
  }
  if (!types.some(Boolean)) {
    return resolveInput(reference.name, registry, {
      country: 'India',
      state: reference.state,
      district: reference.district || null,
    });
  }
  const contextualFallback = resolveInput(reference.name, registry, {
    country: 'India',
    state: reference.state,
    district: reference.district || null,
  });
  if (contextualFallback.record || contextualFallback.status === 'AMBIGUOUS') {
    return contextualFallback;
  }
  return {
    record: null,
    status: 'NOT_FOUND',
    reason: `No matching ${types.join('/')} record found for ${reference.name}, ${reference.state}.`,
  };
}

function representativeAdministrativeReferences(registry) {
  const firstOrderUnits = registry.records.filter(({ type }) => type === 'state');
  const recordsByState = new Map();
  for (const record of registry.records) {
    const stateKey = normalize(record.state);
    if (!stateKey) continue;
    if (!recordsByState.has(stateKey)) recordsByState.set(stateKey, []);
    recordsByState.get(stateKey).push(record);
  }
  const references = [];
  const availableLevelsByState = {};
  for (const state of firstOrderUnits) {
    const stateKey = normalize(state.name);
    const inState = recordsByState.get(stateKey) || [];
    const district = inState
      .filter(({ type }) => type === 'district')
      .sort((left, right) => left.name.localeCompare(right.name))[0];
    const subdistrict = inState
      .filter(({ type }) => type === 'subdistrict')
      .sort((left, right) => left.name.localeCompare(right.name))[0];
    const village = inState
      .filter(({ type }) => type === 'village')
      .sort((left, right) => left.name.localeCompare(right.name))[0];
    const town = inState
      .filter(({ type }) => type === 'town')
      .sort((left, right) => left.name.localeCompare(right.name))[0];
    availableLevelsByState[state.name] = {
      district: Boolean(district),
      subdistrict: Boolean(subdistrict),
      village: Boolean(village),
      town: Boolean(town),
    };
    if (district) references.push({ record: district, requestedAs: `representative district in ${state.name}` });
    if (subdistrict) references.push({ record: subdistrict, requestedAs: `representative sub-district in ${state.name}` });
    if (village) references.push({ record: village, requestedAs: `representative village in ${state.name}` });
    if (town) references.push({ record: town, requestedAs: `representative town in ${state.name}` });
  }
  return { references, availableLevelsByState };
}

async function createIndiaAviationPilotBatch() {
  const registry = await loadIndiaGeographicRegistry();
  const coreServices = getIndiaCoreAviationIntents();
  if (coreServices.some((service) => !service)) {
    throw new Error('One or more configured core India aviation intents are missing.');
  }
  const namedReferences = getIndiaPilotReferenceDefinitions();
  const namedResults = namedReferences.map((reference) => ({
    reference,
    ...findPilotReference(reference, registry),
  }));
  const administrative = representativeAdministrativeReferences(registry);
  const locationsById = new Map();
  for (const item of namedResults) {
    if (!item.record) continue;
    const current = locationsById.get(item.record.id) || {
      record: item.record,
      requestedAs: [],
      selectedFrom: [],
    };
    current.requestedAs.push(item.reference.name);
    current.selectedFrom.push('named-pilot-location');
    locationsById.set(item.record.id, current);
  }
  for (const item of administrative.references) {
    const current = locationsById.get(item.record.id) || {
      record: item.record,
      requestedAs: [],
      selectedFrom: [],
    };
    current.requestedAs.push(item.requestedAs);
    current.selectedFrom.push('state-ut-administrative-sample');
    locationsById.set(item.record.id, current);
  }

  const namedMissing = namedResults.filter(({ record }) => !record).map((item) => ({
    name: item.reference.name,
    state: item.reference.state,
    status: item.status,
    reason: item.reason,
  }));
  const rawLocations = [...locationsById.values()].map(({ record, ...selection }) => {
    const hierarchy = resolveHierarchy(record, registry.records);
    if (!hierarchy || hierarchy[0]?.type !== 'country'
      || !hierarchy.some(({ type }) => type === 'state')) {
      throw new Error(`Pilot location ${record.id} has no valid India/state hierarchy.`);
    }
    const state = stateFor(record, hierarchy);
    const marketCandidate = marketCandidateFor(record, state);
    const localEvidence = marketCandidate
      ? [
        ...marketCandidate.aviationEvidence.filter(({ type }) => type !== 'aviation-authority'),
        ...directEvidenceFor(
        record,
        state,
        hierarchy,
        getRegistryRecordMap(GLOBAL_GEOGRAPHIC_PILOT.records),
        ).filter(({ id }) => INDIA_AVIATION_EVIDENCE_RECORDS.some((item) => item.id === id)),
      ]
      : directEvidenceFor(
        record,
        state,
        hierarchy,
        getRegistryRecordMap(GLOBAL_GEOGRAPHIC_PILOT.records),
      );
    const signals = localEvidence.map(evidenceSignal);
    return {
      record,
      hierarchy,
      state,
      selection,
      marketCandidate: marketCandidate
        ? { ...marketCandidate, aviationEvidence: localEvidence }
        : null,
      evidence: localEvidence,
      signals,
    };
  });

  const firstOrderUnitNames = registry.records
    .filter(({ type }) => type === 'state')
    .map(({ name }) => name);
  const productionComparisons = buildProductionComparisons();
  const draftOutcomes = [];
  const pending = [];
  for (const entry of rawLocations) {
    for (const service of coreServices) {
      let contentData = null;
      if (entry.marketCandidate) {
        contentData = marketLocationContent(
          entry.marketCandidate,
          service,
          entry.record,
          entry.state,
          entry.hierarchy,
        );
        if (contentData) contentData.evidence = entry.evidence;
      } else {
        contentData = evidenceOnlyLocationContent(
          entry.record,
          entry.state,
          service,
          entry.evidence,
        );
        if (contentData) contentData.evidence = entry.evidence;
      }
      const outcome = makeOutcome({
        record: entry.record,
        hierarchy: entry.hierarchy,
        service,
        registry,
        contentData,
        aviationEvidence: entry.evidence,
        reason: contentData
          ? null
          : entry.evidence.length
            ? 'Aviation source signals exist, but they do not yet form a sufficiently complete location-specific content model.'
            : 'No location-matched aviation evidence and differentiated content package is recorded.',
      });
      draftOutcomes.push({
        ...outcome,
        pilotReference: entry,
        contentData,
        snapshot: outcome.model.canRender ? buildCandidateSnapshot(outcome) : null,
      });
    }
  }

  for (const outcome of draftOutcomes) {
    if (!outcome.snapshot) {
      pending.push(outcome);
      continue;
    }
    const comparisons = [
      ...productionComparisons.filter(({ slug }) => slug !== outcome.location.slug),
      ...draftOutcomes
        .filter((other) => (
          other !== outcome
          && other.service.slug === outcome.service.slug
          && other.snapshot
        ))
        .map(({ snapshot }) => snapshot),
    ];
    const differentiation = assessContentDifferentiation({
      candidate: outcome.snapshot,
      comparisons,
    });
    const rebuilt = makeOutcome({
      record: outcome.pilotReference.record,
      hierarchy: outcome.pilotReference.hierarchy,
      service: outcome.service,
      registry,
      contentData: outcome.contentData,
      aviationEvidence: outcome.pilotReference.evidence,
      reason: outcome.reason,
    });
    const pageModel = buildLocationPageModel({
      location: rebuilt.location,
      service: rebuilt.service,
      content: outcome.contentData.content,
      siteOrigin: SITE_ORIGIN,
      locations: registry.records,
      geographicDataValidated: registry.validationErrors === 0,
      contentDifferentiation: differentiation,
    });
    pending.push({
      ...rebuilt,
      model: pageModel,
      supportStatus: pageModel.supportStatus,
      renderStatus: pageModel.renderStatus,
      indexability: pageModel.indexability,
      classification: pageModel.indexability === 'INDEXABLE'
        ? 'INDEXABLE'
        : pageModel.canRender && differentiation.status === 'PASSED'
          ? 'RENDERABLE'
          : 'RESEARCH',
      differentiation,
      aviationContent: {
        ...rebuilt.aviationContent,
        contentDifferentiation: differentiation,
      },
      reason: pageModel.indexabilityPipeline?.reason || rebuilt.reason,
      aviationRelevance: outcome.contentData.evidence.map(evidenceSignal),
    });
  }

  const missingOutcomes = namedMissing.flatMap((missing) => coreServices.map((service) => ({
    location: null,
    locationName: missing.name,
    state: missing.state,
    service,
    supportStatus: 'NOT_SUPPORTED',
    renderStatus: 'NOT_RENDERABLE',
    indexability: 'REJECTED',
    classification: 'REJECTED',
    relationship: 'rejected',
    supportedServices: [],
    aviationRelevance: [],
    reason: missing.reason,
  })));

  return {
    registryRecordCount: registry.recordCount,
    registryCountsByType: registry.countsByType,
    registryCoverage: registry.coverage,
    services: coreServices,
    namedReferences,
    namedResults,
    namedMissing,
    firstOrderUnitNames,
    administrativeLevelCoverage: administrative.availableLevelsByState,
    locations: rawLocations,
    outcomes: [...pending, ...missingOutcomes],
    productionComparisons,
  };
}

export async function buildIndiaAviationPilotBatch() {
  if (!pilotBatchPromise) pilotBatchPromise = createIndiaAviationPilotBatch();
  return pilotBatchPromise;
}

export async function buildIndiaLocationServiceModel(reference, serviceSlug, options = {}) {
  const registry = await loadIndiaGeographicRegistry();
  const service = SERVICES.find(({ slug }) => slug === serviceSlug);
  if (!service) {
    return makeOutcome({
      record: null,
      hierarchy: null,
      service: { slug: serviceSlug || null },
      registry,
      contentData: null,
      reason: `Unknown aviation service intent "${serviceSlug || ''}".`,
    });
  }
  const resolution = resolveInput(reference, registry, options);
  if (!resolution.record) {
    return {
      ...makeOutcome({
        record: null,
        hierarchy: null,
        service,
        registry,
        contentData: null,
        reason: resolution.reason,
      }),
      geographicResolution: resolution.status,
    };
  }
  const pilotBatch = await buildIndiaAviationPilotBatch();
  const pilotOutcome = pilotBatch.outcomes.find((outcome) => (
    outcome.location?.id === resolution.record.id
    && outcome.service.slug === service.slug
  ));
  if (pilotOutcome) {
    return {
      ...pilotOutcome,
      geographicResolution: resolution.status,
    };
  }
  const hierarchy = resolveHierarchy(resolution.record, registry.records);
  const state = stateFor(resolution.record, hierarchy);
  const candidate = marketCandidateFor(resolution.record, state);
  const evidence = candidate
    ? candidate.aviationEvidence.filter(({ type }) => type !== 'aviation-authority')
    : directEvidenceFor(
      resolution.record,
      state,
      hierarchy,
      getRegistryRecordMap(GLOBAL_GEOGRAPHIC_PILOT.records),
    );
  const contentData = candidate
    ? marketLocationContent(candidate, service, resolution.record, state, hierarchy)
    : evidenceOnlyLocationContent(resolution.record, state, service, evidence);
  if (contentData) contentData.evidence = evidence;
  const outcome = makeOutcome({
    record: resolution.record,
    hierarchy,
    service,
    registry,
    contentData,
    aviationEvidence: evidence,
    reason: contentData
      ? null
      : evidence.length
        ? 'Aviation source signals exist, but they do not yet form a sufficiently complete location-specific content model.'
        : 'No location-matched aviation evidence and differentiated content package is recorded.',
  });
  return {
    ...outcome,
    geographicResolution: resolution.status,
  };
}

export async function resolveIndiaAviationSearch(query, options = {}) {
  if (typeof query !== 'string' || !query.trim()) {
    return {
      status: 'REJECTED',
      reason: 'A non-empty aviation search query is required.',
    };
  }
  const normalizedQuery = normalize(query);
  const intent = INTENT_PHRASES.find(({ phrase }) => normalizedQuery.startsWith(phrase));
  if (!intent) {
    return {
      status: 'REJECTED',
      reason: 'Search intent is not one of the configured India pilot-training services.',
    };
  }
  const locationName = query.trim().slice(intent.phrase.length).trim();
  if (!locationName) {
    return { status: 'REJECTED', reason: 'The search query does not contain a location.' };
  }
  const model = await buildIndiaLocationServiceModel(
    locationName,
    intent.serviceSlug,
    options,
  );
  return {
    status: model.geographicResolution === 'AMBIGUOUS'
      ? 'AMBIGUOUS'
      : model.classification,
    serviceSlug: intent.serviceSlug,
    locationName,
    ...model,
  };
}

export function assessIndiaPageDifferentiation(candidate, comparisons) {
  if (!candidate?.model?.canRender) {
    throw new TypeError('A renderable location page model is required for differentiation.');
  }
  const snapshot = buildCandidateSnapshot(candidate);
  return assessContentDifferentiation({ candidate: snapshot, comparisons });
}
