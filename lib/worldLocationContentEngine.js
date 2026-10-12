import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/aviation-evidence.js';
import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from '../data/location-seo/geography/global-pilot.js';
import { assessContentDifferentiation } from './locationContentDifferentiation.js';
import {
  isApprovedGeographicRoute,
  isGeographicPageQualityEligible,
} from './locationIndexabilityPolicy.js';
import { getLocationPilotTrainingContent } from './pilotTrainingKnowledge.js';
import { composeLocationContent } from './locationContentComposer.js';
import { buildLocationTrainingContext } from './locationTrainingContext.js';
import { buildLocationPilotTrainingPage } from './locationPilotTrainingPage.js';

const SERVICE_RELATIONSHIP_SOURCE = 'https://weoneaviation.in/about-us';
const SERVICE_INFORMATION_SOURCE = 'https://weoneaviation.in/pilot-training-in-india';
const REGULATOR_BY_COUNTRY = new Map(Object.values(AVIATION_REGULATORY_CONTEXTS)
  .map((regulator) => [regulator.countryCode, regulator]));
const GEOGRAPHY_BY_ID = new Map(GLOBAL_GEOGRAPHIC_PILOT.records.map((location) => [
  location.id,
  location,
]));
const DIRECT_EVIDENCE_BY_LOCATION = new Map();
const REGIONAL_EVIDENCE_BY_LOCATION = new Map();

for (const evidence of AVIATION_EVIDENCE_RECORDS) {
  if (evidence.type === 'aviation-authority'
    || evidence.verificationStatus !== 'primary-source-listed'
    || !/^https:\/\//.test(evidence.sourceUrl || '')) continue;
  if (evidence.geographicRelationship === 'located-within') {
    const records = DIRECT_EVIDENCE_BY_LOCATION.get(evidence.locationId) || [];
    records.push(evidence);
    DIRECT_EVIDENCE_BY_LOCATION.set(evidence.locationId, records);
  } else if (evidence.geographicRelationship === 'regional-context') {
    for (const locationId of evidence.relatedLocationIds) {
      const records = REGIONAL_EVIDENCE_BY_LOCATION.get(locationId) || [];
      records.push(evidence);
      REGIONAL_EVIDENCE_BY_LOCATION.set(locationId, records);
    }
  }
}

function regulatorFor(location) {
  return REGULATOR_BY_COUNTRY.get(location.countryCode) || null;
}

function words(value) {
  return String(value || '').match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)?.length || 0;
}

function sourceLink(href, publisher, title, scope) {
  return { href, publisher, title, scope, reviewedAt: null };
}

function sourceBackedFact(evidence, locationName) {
  return evidence.fact || (
    `${evidence.source} identifies ${evidence.name} as an aviation ${evidence.type.replaceAll('-', ' ')} associated with ${locationName}. `
    + 'This source record does not establish pilot-training approval or current course availability.'
  );
}

function aviationEvidenceForLocation(record) {
  const toFact = (evidence, geographicRelationship, contextGeography = null) => {
    const fact = sourceBackedFact(evidence, record.canonicalName || record.name);
    return {
      evidenceId: evidence.id,
      name: evidence.name,
      type: evidence.type,
      fact,
      text: fact,
      source: evidence.source,
      sourceUrl: evidence.sourceUrl,
      sourceDate: evidence.sourceDate || null,
      verificationStatus: evidence.verificationStatus,
      geographicRelationship,
      contextGeography,
      attributionNote: evidence.attributionNote || null,
      href: evidence.sourceUrl,
      evidence: {
        href: evidence.sourceUrl,
        publisher: evidence.source,
      },
    };
  };
  const directAviationFacts = (DIRECT_EVIDENCE_BY_LOCATION.get(record.id) || [])
    .map((evidence) => toFact(evidence, 'located-within'));
  const regionalAviationFacts = (REGIONAL_EVIDENCE_BY_LOCATION.get(record.id) || [])
    .map((evidence) => {
      const sourceLocation = GEOGRAPHY_BY_ID.get(evidence.locationId);
      return toFact(
        evidence,
        'regional-context',
        sourceLocation
          ? {
            id: sourceLocation.id,
            name: sourceLocation.canonicalName || sourceLocation.name,
            type: sourceLocation.type,
          }
          : null,
      );
    });
  return { directAviationFacts, regionalAviationFacts };
}

function buildComparisonSnapshot(record) {
  const regulator = regulatorFor(record);
  if (!regulator || record.type === 'country') return null;
  const hierarchy = GLOBAL_GEOGRAPHIC_PILOT.records;
  const chain = [];
  const visited = new Set();
  let current = record;
  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    chain.unshift(current);
    current = current.parentId
      ? hierarchy.find((item) => item.id === current.parentId)
      : null;
  }
  const context = chain.map(({ name, type }) => `${type}: ${name}`).join(', ');
  return {
    slug: record.slug,
    name: record.name,
    locationNames: chain.map(({ name }) => name),
    title: `Pilot Training Options Near ${record.name} | We One Aviation`,
    description: `Location and regulator context for pilot-training research near ${record.name}, ${record.country}.`,
    h1: `Pilot Training Options Near ${record.name}`,
    serviceSlug: 'pilot-training',
    body: [
      `Pilot Training Options Near ${record.name}.`,
      `The GeoNames reference places ${record.name} within ${context}.`,
      `The recorded civil aviation authority for ${regulator.country} is ${regulator.authority}. Check current licence and training requirements with that authority.`,
      'We One Aviation does not claim a branch, classroom, instructor, flying school or local training delivery at this place.',
      'Compare approved training organisations directly with the applicable regulator before enrolling.',
    ].join(' '),
    sourceUrls: [record.sourceUrl, regulator.source, SERVICE_INFORMATION_SOURCE],
    faqs: [{
      question: `Which authority should a student check near ${record.name}?`,
      answer: `${regulator.authority} publishes the applicable rules for ${regulator.country}.`,
    }],
    sections: [{
      title: `Geographic context for ${record.name}`,
      body: `The gazetteer identifies ${record.name} as a ${record.type} in ${record.country}.`,
      verified: true,
    }],
    verifiedFacts: [],
    aviationFacts: [],
    regulatoryText: `${regulator.country} ${regulator.authority}`,
    regulatorySpecificity: 1,
    geographicSpecificity: new Set(chain.map(({ type }) => type)).size,
  };
}

const COMPARISON_SNAPSHOTS = GLOBAL_GEOGRAPHIC_PILOT.records
  .map(buildComparisonSnapshot)
  .filter(Boolean);

function localContext(location, hierarchy, airports) {
  const parents = hierarchy.slice(0, -1);
  const parentDescription = parents.length
    ? parents.map(({ name, type }) => `${name} (${type})`).join(', ')
    : location.country;
  const airportDescription = airports.length
    ? airports.map(({ name, distanceKm }) => (
      `${name}, approximately ${distanceKm} km in a straight line from the gazetteer coordinates`
    )).join('; ')
    : 'No nearby airport record was found in this gazetteer search.';
  return { parentDescription, airportDescription };
}

export function buildWorldLocationServiceContent({
  record,
  hierarchy,
  service,
  nearbyAviationPlaces = [],
  routeSlug = record?.slug,
}) {
  if (!record || !Array.isArray(hierarchy) || !service || !routeSlug) {
    throw new TypeError('A global geographic record, hierarchy and service are required.');
  }
  const regulator = regulatorFor(record);
  if (!regulator || service.slug !== 'pilot-training') {
    const error = new Error(
      `Service "${service.slug}" is not supported for this country-specific information page.`,
    );
    error.code = 'UNSUPPORTED_DYNAMIC_LOCATION_SERVICE';
    throw error;
  }
  const trustedGeographySource = record.source === 'GeoNames'
    && /^https:\/\/www\.geonames\.org\/\d+\/$/.test(record.sourceUrl || '')
    && record.registrySource === 'GeoNames';
  const trustedReviewedSource = Boolean(
    record.source
    && /^https:\/\//.test(record.sourceUrl || '')
    && (record.sourceLinks || []).some(({ href }) => /^https:\/\//.test(href || '')),
  );
  if ((!trustedGeographySource && !trustedReviewedSource)
    || hierarchy.at(-1)?.id !== record.id
    || hierarchy[0]?.type !== 'country'
    || hierarchy[0]?.countryCode !== record.countryCode
    || (record.type === 'country'
      ? hierarchy.length !== 1 || hierarchy[0]?.id !== record.id
      : !hierarchy.some(({ type }) => (
        ['state', 'province', 'region', 'county', 'district', 'territory'].includes(type)
      )))
    || hierarchy.some((node, index) => (
      node.countryCode !== record.countryCode
      || (index > 0 && node.parentId !== hierarchy[index - 1].id)
    ))) {
    const error = new Error('A trusted source and complete country/administrative hierarchy are required.');
    error.code = 'INVALID_GEOGRAPHIC_HIERARCHY';
    throw error;
  }

  const name = record.canonicalName || record.name;
  const country = hierarchy[0].name;
  const regionalContext = hierarchy.slice(1, -1)
    .filter(({ type }) => (
      ['state', 'province', 'region', 'county', 'district', 'territory'].includes(type)
    ))
    .map(({ name: parentName, type }) => `${parentName} (${type})`)
    .join(', ');
  const locationScope = record.type === 'country'
    ? country
    : regionalContext
    ? `${name}, ${regionalContext}, ${country}`
    : `${name}, ${country}`;
  const locationSourceLinks = (record.sourceLinks || []).filter(
    ({ href }) => /^https:\/\//.test(href || ''),
  );
  const { directAviationFacts, regionalAviationFacts } = aviationEvidenceForLocation(record);
  const aviationFaqs = directAviationFacts.map((fact) => ({
    evidenceId: fact.evidenceId,
    question: `What does the cited aviation source report about ${fact.name}?`,
    answer: fact.fact,
    sourceUrl: fact.sourceUrl,
  }));
  const aviationSourceLinks = [...directAviationFacts, ...regionalAviationFacts]
    .map((fact) => sourceLink(
      fact.sourceUrl,
      fact.source,
      `${fact.name} source record`,
      fact.attributionNote
        || `Primary-source-listed ${fact.type.replaceAll('-', ' ')}; this does not establish We One Aviation presence or partnership.`,
    ));
  const regulatorSource = sourceLink(
    regulator.source,
    regulator.authority,
    `${regulator.authority} official aviation information`,
    `Regulatory source for ${regulator.country}; it does not verify We One Aviation services or local training providers.`,
  );
  const serviceSource = sourceLink(
    SERVICE_INFORMATION_SOURCE,
    'We One Aviation',
    'We One Aviation pilot-training information',
    'Describes the academy’s published India-focused training offer; it does not establish a branch or delivery in this location.',
  );
  const sourceReferences = [
    ...locationSourceLinks,
    ...aviationSourceLinks,
    ...(record.coordinateSourceUrl
      ? [sourceLink(
        record.coordinateSourceUrl,
        'GeoNames',
        `GeoNames coordinate reference for ${name}`,
        'Exact-name, same-country coordinate match used only to estimate straight-line proximity to listed airport records.',
      )]
      : []),
    regulatorSource,
    serviceSource,
    sourceLink(
      SERVICE_RELATIONSHIP_SOURCE,
      'We One Aviation',
      'About We One Aviation',
      'First-party relationship context; it does not establish a local presence.',
    ),
  ];
  const { parentDescription, airportDescription } = localContext(
    record,
    hierarchy,
    nearbyAviationPlaces,
  );
  const trainingContext = buildLocationTrainingContext({
    record,
    hierarchy,
    regulator,
    nearbyAviationPlaces,
  });
  const nearestAirportText = nearbyAviationPlaces.length
    ? nearbyAviationPlaces.map(({ name: airport, distanceKm }) => (
      `${airport} (about ${distanceKm} km straight-line)`
    )).join('; ')
    : 'No nearby airport is verified in the gazetteer results used for this page.';
  const title = record.type === 'country'
    ? `Pilot Training Guidance in ${country} | We One Aviation`
    : `Pilot Training near ${name}, ${country} | We One Aviation`;
  const description = `Pilot-training guidance for ${locationScope}: see its recorded hierarchy, ${regulator.authority} context and checks for theory, medical and flight-training stages. No local We One Aviation delivery is claimed.`;
  const h1 = `Pilot Training Guidance for ${name}, ${country}`;
  const introduction = trainingContext.introduction;
  const localApplication = trainingContext.pathway;
  const relationshipStatement = `This page is independent location and regulator guidance for people researching from ${name}. We One Aviation’s published training information is India-focused; this page does not offer or imply a local service, branch, office, classroom, instructor, aircraft, flying school, FTO, partner or approval in ${country}.`;
  const gazetteerAviationRelevance = nearbyAviationPlaces.length
    ? `GeoNames records the following airport location${nearbyAviationPlaces.length === 1 ? '' : 's'} near the coordinates for ${name}: ${airportDescription}. These gazetteer entries establish neither current operational status nor flight-training approval, and the straight-line estimates are not road or travel distances.`
    : `Aviation training is regulated nationally. The location dataset used for this page did not return a nearby airport record for ${name}; that is a limit of the evidence search, not proof that no airport or aviation service exists.`;
  const aviationRelevance = [
    gazetteerAviationRelevance,
    ...directAviationFacts.map(({ fact }) => fact),
    ...regionalAviationFacts.map(({ fact, attributionNote }) => (
      `${fact}${attributionNote ? ` ${attributionNote}` : ''}`
    )),
  ].join(' ');
  const airportFacts = nearbyAviationPlaces.map((airport) => ({
    evidenceId: airport.id,
    name: airport.name,
    fact: `GeoNames records ${airport.name} as an airport approximately ${airport.distanceKm} km in a straight line from the coordinates recorded for ${name}. This is not a travel-distance estimate and does not establish a training provider.`,
    href: airport.sourceUrl,
    publisher: airport.publisher,
    evidence: {
      href: airport.sourceUrl,
      publisher: airport.publisher,
    },
  }));
  const geographicContext = hierarchy.map((geography) => ({
    id: geography.id,
    name: geography.name,
    type: geography.type,
    parentId: geography.parentId,
    sources: (geography.sourceLinks || []).map(({ publisher, href }) => ({ publisher, href })),
  }));
  const locationSpecificSections = [
    ...trainingContext.sections,
    {
      title: `Geographic placement of ${name}`,
      body: `GeoNames classifies ${name} as a ${record.type}; its recorded parent chain is ${parentDescription}. This describes registry hierarchy, not a We One Aviation service area.`,
      verified: true,
      sourceLinks: locationSourceLinks,
    },
    {
      title: `Airport records near ${name}`,
      body: airportDescription,
      verified: nearbyAviationPlaces.length > 0,
      sourceLinks: nearbyAviationPlaces.map((airport) => ({
        href: airport.sourceUrl,
        publisher: airport.publisher,
      })),
    },
    {
      title: `${regulator.authority} context for ${country}`,
      body: `${regulator.authority} is the aviation authority recorded for ${country}. Confirm current licensing and training approval requirements directly with the authority.`,
      verified: true,
      sourceLinks: [regulatorSource],
    },
    {
      title: `Training decisions for ${locationScope}`,
      body: `The registry hierarchy places ${name} (${record.type}) within ${parentDescription}. For a student researching from this place, identify the intended licensing country first; compare the regulator's approved training organisations and the locations where their theory and practical stages take place. The hierarchy does not establish local training provision.`,
      verified: Boolean(record.sourceUrl && /^https:\/\//.test(record.sourceUrl)),
      sourceLinks: locationSourceLinks,
    },
  ];
  const medicalRequirements = `Medical certification is a licensing requirement, but medical classes, assessment routes and validity rules vary by authority and licence. Ask ${regulator.authority} which aviation medical examiner or approved assessment route applies before committing to a training contract.`;
  const groundSchool = `Ground or theory training develops the knowledge required by the chosen licence syllabus. Confirm the subjects, examination format, approved delivery arrangements and prerequisites with ${regulator.authority}; this page does not apply DGCA examinations to ${country}.`;
  const examinations = `Written examinations, practical skill tests and radio-telephony requirements are jurisdiction-specific. Use ${regulator.authority}'s current licensing material to identify the assessments for the licence you plan to pursue; no foreign exam subjects or passing thresholds are assumed here.`;
  const flightTrainingPathway = `The practical stage is completed through an organisation authorised for the relevant licence by ${regulator.authority}. Confirm the approved base, aircraft, instructors and training scope directly; a geographic airport listing is not evidence of an approved school or available course.`;
  const cplPathway = `A Commercial Pilot Licence pathway ordinarily combines eligibility, aviation medical fitness, theoretical knowledge, regulator-required flight experience, practical assessment and an application for issue. The required sequence, hours and documentation depend on the licensing authority. Confirm each current requirement with ${regulator.authority}; this guide does not import Indian DGCA rules into ${country}.`;
  const ftoStage = `Flight training takes place separately from classroom or theory preparation at a regulator-authorised training organisation. Before enrolment, verify the organisation's approval, approved training base and licence scope with ${regulator.authority}; neither a nearby airport record nor this location page confirms provider approval.`;
  const regulatoryPathway = `${regulator.authority} is the aviation authority recorded for ${country}. Use its current publications to verify licence requirements, medical standards, examinations and training-organisation approvals; this page does not substitute another country's rules.`;
  const serviceContent = {
    serviceSlug: service.slug,
    explanation: `Pilot training is a regulated pathway that combines eligibility checks, theory preparation, medical requirements and practical flight training. The authority responsible for the jurisdiction is ${regulator.authority}; confirm the current route and approved training organisations in its official guidance.`,
    eligibility: `Eligibility differs by licence and jurisdiction. Before paying a provider near ${name}, verify education, age, medical, language, examination and flight-hour requirements with ${regulator.authority} and the training organisation.`,
    regulatoryPathway,
    groundSchool,
    medicalRequirements,
    examinations,
    cplPathway,
    ftoStage,
    flightTrainingPathway,
    whyThisOption: `This is informational guidance for comparing pilot-training options around ${name}; it is not a local school listing or evidence of local We One Aviation delivery.`,
    trainingProcess: [
      {
        title: 'Choose the licence and jurisdiction',
        description: `Identify the licence sought and confirm its pathway with ${regulator.authority} before comparing providers.`,
      },
      {
        title: 'Verify eligibility and medical requirements',
        description: 'Check the current education, age, language, medical and examination requirements with the regulator.',
      },
      {
        title: 'Check provider approval and training location',
        description: `Confirm the provider’s approval, operating base and training arrangements directly with ${regulator.authority}; an airport listing alone does not verify a school.`,
      },
      {
        title: 'Compare the written offer',
        description: 'Request the course scope, costs, aircraft and instructor arrangements, timelines, refund terms and any additional licence requirements in writing.',
      },
    ],
  };
  const canonicalPath = `/${routeSlug}/${service.slug}`;
  const internalLinks = [
    {
      href: '/pilot-training-in-india',
      label: 'We One Aviation pilot-training information',
      context: 'For the academy’s published India-focused offer, see',
    },
    {
      href: '/contact-us',
      label: 'Contact We One Aviation',
      context: 'Confirm directly what the academy currently offers through',
    },
    {
      href: '/about-us',
      label: 'About We One Aviation',
      context: 'Read about the academy’s documented scope on',
    },
  ];
  const masterContent = getLocationPilotTrainingContent({
    countryCode: record.countryCode,
    serviceSlug: service.slug,
  });
  const locationPilotTrainingPage = buildLocationPilotTrainingPage({
    record,
    hierarchy,
    regulator,
    masterContent,
    serviceContent,
    directAviationFacts,
    regionalAviationFacts,
    aviationFaqs,
    nearbyAirportRecords: nearbyAviationPlaces,
    relationshipStatement,
    internalLinks,
    serviceShortName: service.shortName,
    h1,
    introduction,
    ctaLabel: 'Ask about current training information',
    breadcrumbLabels: [
      [...hierarchy].reverse().find(({ type }) => (
        ['city', 'town', 'locality', 'neighborhood', 'village'].includes(type)
      ))?.name || name,
      service.shortName,
    ],
  });
  const faqs = locationPilotTrainingPage.faqs;
  const body = locationPilotTrainingPage.visibleText.join('\n');
  const differentiation = assessContentDifferentiation({
    candidate: {
      slug: routeSlug,
      name,
      body,
      title,
      description,
      h1,
      serviceSlug: service.slug,
      locationNames: hierarchy.map(({ name: hierarchyName }) => hierarchyName),
      similarityLocationNames: [name],
      verifiedFacts: [
        ...directAviationFacts.map(({ fact, sourceUrl }) => ({
          text: fact,
          inherited: false,
          verified: true,
          sourceUrl,
        })),
        ...regionalAviationFacts.map(({ fact, sourceUrl }) => ({
          text: fact,
          inherited: true,
          verified: true,
          sourceUrl,
        })),
        ...airportFacts.map(({ fact }) => ({
          text: fact,
          inherited: false,
          verified: true,
          sourceUrl: nearbyAviationPlaces.find(({ id }) => (
            airportFacts.find((item) => item.fact === fact)?.evidenceId === id
          ))?.sourceUrl,
        })),
      ],
      aviationFacts: [
        ...directAviationFacts,
        ...regionalAviationFacts,
        ...airportFacts,
      ],
      sourceUrls: sourceReferences.map(({ href }) => href),
      faqs,
      sections: locationPilotTrainingPage.sections,
      regulatoryText: `${regulator.country} ${regulator.authority}`,
      regulatorySpecificity: 1,
      geographicSpecificity: new Set(hierarchy.map(({ type }) => type)).size,
      aviationContext: aviationRelevance,
      geographicEvidence: hierarchy.map(({ id, type, sourceUrl }) => ({
        id,
        type,
        sourceUrl: sourceUrl || null,
      })),
    },
    comparisons: COMPARISON_SNAPSHOTS,
  });
  const content = {
    seoTitle: title,
    seoDescription: description,
    h1,
    introduction,
    localApplication,
    localContext: localApplication,
    relationship: 'informational',
    relationshipStatement,
    serviceRelationship: {
      serviceSlug: service.slug,
      mode: 'informational',
      localDeliveryVerified: false,
      source: SERVICE_RELATIONSHIP_SOURCE,
    },
    canonicalPath,
    breadcrumbLabel: service.shortName,
    locationTrainingMatrix: trainingContext.matrix,
    locationPilotTrainingPage,
    locationSpecificSections: locationPilotTrainingPage.sections,
    regionalContextSections: [],
    faqs,
    internalLinks,
    sourceReferences,
    sourceLinks: sourceReferences,
    serviceContent,
    jsonLdReady: Boolean(
      /^\/[a-z0-9-]+\/pilot-training$/.test(canonicalPath)
      && faqs.length >= 3
      && sourceReferences.some(({ href }) => href === regulator.source)
      && sourceReferences.some(({ href }) => href === record.sourceUrl),
    ),
    locationAviationContent: {
      locationOverview: `${name} is recorded by GeoNames as a ${record.type} in ${country}. The registry hierarchy is ${parentDescription}.`,
      geographicContext,
      aviationRelevance,
      aviationFacts: airportFacts,
      sourceAttributedAviationFacts: directAviationFacts,
      sourceAttributedRegionalAviationFacts: regionalAviationFacts,
      nearbyAviationHubs: airportFacts.map((fact) => ({
        ...fact,
        attributionNote: 'GeoNames geographic airport reference only; this does not verify an operating training facility.',
        contextGeography: null,
      })),
      regulatoryContext: regulator,
      sourceLinks: sourceReferences.map(({ href, publisher, title: sourceTitle }) => ({
        href,
        publisher,
        title: sourceTitle,
        sourceDate: null,
      })),
      howStudentsFromLocationCanTrain: `Students researching from ${locationScope} should identify the licence-issuing jurisdiction and confirm where each training stage is delivered under ${regulator.authority}. This page does not establish a local school or We One Aviation classroom.`,
      studentPathway: {
        explanation: serviceContent.explanation,
        medicalContext: serviceContent.eligibility,
        licensingContext: serviceContent.regulatoryPathway,
      },
      flightTrainingExplanation: serviceContent.flightTrainingPathway,
      ftoSelectionGuidance: serviceContent.trainingProcess[2].description,
      physicalVsOnlineExplanation: relationshipStatement,
    },
    cta: {
      href: '/contact-us',
      label: 'Ask about current training information',
    },
    masterContent,
  };
  const visibleWords = words(body);
  const unsupportedClaims = [];
  const hierarchyValid = hierarchy.length >= 2
    && hierarchy[0].type === 'country'
    && hierarchy[0].countryCode === record.countryCode
    && hierarchy.at(-1).id === record.id
    && hierarchy.some(({ type }) => (
      ['state', 'province', 'region', 'county', 'district', 'territory'].includes(type)
    ))
    && hierarchy.every((node, index) => (
      node.countryCode === record.countryCode
      && (index === 0 || node.parentId === hierarchy[index - 1].id)
    ));
  const blockers = [];
  if (!hierarchyValid) blockers.push('The country/region hierarchy is incomplete.');
  if (!record.sourceUrl || !/^https:\/\//.test(record.sourceUrl)) {
    blockers.push('The place does not have an HTTPS geographic source.');
  }
  if (visibleWords < GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minVisibleWords) {
    blockers.push('Visible page content is below the minimum word count.');
  }
  if (faqs.length < GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minFaqs) {
    blockers.push('Fewer than three location-specific FAQs are available.');
  }
  if (new Set(sourceReferences.map(({ href }) => href)).size
    < GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minSourceCount) {
    blockers.push('Not enough distinct HTTPS sources are available.');
  }
  if (internalLinks.length < GEOGRAPHIC_INDEXABILITY_POLICY.contentQuality.minInternalLinks) {
    blockers.push('Not enough relevant internal links are available.');
  }
  if (record.countryCode === 'IN'
    && !locationPilotTrainingPage.evidenceProfile.eligibleForIndexabilityEvaluation) {
    blockers.push(...locationPilotTrainingPage.evidenceProfile.reasons);
  }
  if (differentiation.status !== 'PASSED') blockers.push(...differentiation.reasons);
  const quality = {
    state: blockers.length ? 'NOINDEX' : 'INDEXABLE',
    geographicIdentity: {
      valid: Boolean(record.id && (record.canonicalName || record.name) && record.sourceUrl),
      ambiguous: false,
    },
    geographicHierarchy: { valid: hierarchyValid, records: hierarchy },
    unsupportedClaims,
    scores: { factualSafetyScore: 100 },
    differentiation,
    blockers: [...new Set(blockers)],
    metrics: {
      visibleWordCount: visibleWords,
      airportEvidenceCount: airportFacts.length,
      evidenceProfile: locationPilotTrainingPage.evidenceProfile,
      sourceCount: new Set(sourceReferences.map(({ href }) => href)).size,
    },
  };
  content.quality = quality;

  const mostSpecificCity = [...hierarchy].reverse().find(({ type }) => (
    ['city', 'town', 'locality', 'neighborhood', 'village'].includes(type)
  ))?.name || name;
  const region = [...hierarchy].reverse().find(({ type }) => type === 'state')?.name
    || country;
  const location = {
    ...record,
    registryRecordId: record.id,
    registrySlug: record.slug,
    registryRecordStatus: record.status,
    registrySource: record.registrySource || (record.source === 'GeoNames' ? 'GeoNames' : null),
    name,
    city: mostSpecificCity,
    state: region,
    country,
    relationship: 'informational',
    supportedServices: [service.slug],
    serviceContent: { [service.slug]: content },
    renderable: true,
    indexable: false,
    sitemapEligible: false,
    physicalPresenceVerified: false,
  };
  const qualityGatePassed = isGeographicPageQualityEligible({
    location,
    service,
    content,
    quality,
  });
  const productionRouteApproved = isApprovedGeographicRoute(canonicalPath, {
    location,
    service,
    registryBacked: true,
  });
  quality.qualityGatePassed = qualityGatePassed;
  quality.productionRouteApproved = productionRouteApproved;
  quality.indexable = qualityGatePassed && productionRouteApproved;
  quality.state = quality.indexable ? 'INDEXABLE' : 'NOINDEX';
  if (qualityGatePassed && !productionRouteApproved) {
    quality.blockers.push(
      'Page passed its quality gate but is not in the existing approved geographic route list.',
    );
  } else if (!quality.indexable && !quality.blockers.length) {
    quality.blockers.push('The shared geographic content-quality gate did not pass.');
  }
  location.indexable = quality.indexable;
  location.sitemapEligible = quality.indexable;
  content.composedPage = composeLocationContent({
    location,
    hierarchy,
    service,
    regulatoryContext: regulator,
    content,
  });
  return { location, content, quality };
}
