import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';

const SCORE_WEIGHTS = Object.freeze({
  localAviationEvidence: 20,
  locationSpecificFacts: 15,
  regulatorRelevance: 15,
  serviceRelevance: 15,
  uniqueLocalApplication: 10,
  uniqueFaqOpportunities: 10,
  sourceCoverage: 10,
  masterContentReuse: 5,
});

const MASTER_CATEGORY_FIELDS = Object.freeze({
  pilot_training_overview: 'pilotTrainingPathway',
  pilot_training_stages: 'pilotTrainingPathway',
  pilot_training_process: 'pilotTrainingPathway',
  CPL_pathway: 'cplPathway',
  ground_school: 'groundTraining',
  medical_requirements: 'medicalRequirements',
  DGCA_exams: 'examinations',
  FTO_stage: 'flightTrainingFtoStage',
});

function uniqueBy(items, keyFor) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFor(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sourceLinksFor(content, location) {
  return uniqueBy([
    ...(content.sourceReferences || []),
    ...(content.locationAviationContent?.sourceLinks || []),
    ...(location.sourceLinks || []),
    ...(location.verifiedFacts || []),
  ].filter((source) => /^https:\/\//.test(source.href || source.sourceUrl || '')), (source) => (
    source.href || source.sourceUrl
  ));
}

function collectLocalEvidence(content, location) {
  const aviation = content.locationAviationContent || {};
  const fromFacts = [
    ...(aviation.aviationFacts || []),
    ...(aviation.nearbyAviationHubs || []),
    ...(content.localEvidence || []).filter((item) => (
      item?.evidenceId && /^(?:aviation|geoname):/i.test(item.evidenceId)
    )),
  ].filter((item) => item && (item.verified !== false));
  const fromSections = fromFacts.length
    ? []
    : (content.locationSpecificSections || [])
      .filter((section) => (
        section.verified === true
        && /airport|aviation|aerodrome|flight.training/i.test(section.title || '')
        && !/regional limits|no aviation facility record|no nearby airport record|regulatory|authority|geographic placement/i
          .test(`${section.title || ''} ${section.body || ''}`)
      ))
      .flatMap((section) => (
        (section.evidenceIds || []).map((evidenceId) => ({
          evidenceId,
          fact: section.body,
          name: section.title,
        }))
      ));
  const legacyLocalSections = (location.localSections || [])
    .filter((section) => (
      /aviation|medical|flight|airport|aerodrome|training organization/i.test(section.title || '')
      && !/regional limits|no aviation facility record|no nearby airport record|authority|regulatory/i
        .test(`${section.title || ''} ${section.body || ''}`)
      && location.sourceLinks?.some(({ href }) => /^https:\/\//.test(href || ''))
    ))
    .flatMap((section) => {
      const source = location.sourceLinks.find(({ href }) => /^https:\/\//.test(href || ''));
      const items = section.items?.length ? section.items : [{ label: section.title, detail: section.body }];
      return items.map(({ label, detail }) => ({
        name: label,
        fact: [section.body, detail, section.closing].filter(Boolean).join(' '),
        sourceUrl: source.href,
        verified: true,
        geographicRelationship: 'located-within',
      }));
    });
  return uniqueBy([...fromFacts, ...fromSections, ...legacyLocalSections].filter((item) => (
    !/aviation:authority:/i.test(String(item.evidenceId || item.id || ''))
  )), (item) => item.evidenceId || item.id || item.fact || item.text);
}

function masterFields(masterContent) {
  const fields = {
    pilotTrainingPathway: [],
    cplPathway: [],
    groundTraining: [],
    medicalRequirements: [],
    examinations: [],
    flightTrainingFtoStage: [],
  };
  for (const block of masterContent?.blocks || []) {
    const field = MASTER_CATEGORY_FIELDS[block.categoryId];
    if (field) fields[field].push(block);
  }
  return fields;
}

function composedServiceFields({ content, location, regulatoryContext }) {
  const country = regulatoryContext?.country || location.country || 'the relevant country';
  const authority = regulatoryContext?.authority || 'the applicable aviation authority';
  const existing = content.serviceContent || {};
  return {
    pilotTrainingPathway: existing.explanation
      || `Pilot training combines licence eligibility, theoretical preparation, medical certification and practical flight training. Confirm the current sequence for ${country} with ${authority}.`,
    cplPathway: existing.cplPathway
      || `A Commercial Pilot Licence pathway generally includes eligibility, medical certification, theoretical knowledge, regulator-required flight experience, practical assessment and an application for issue. The exact sequence and requirements for ${country} must be confirmed with ${authority}.`,
    groundTraining: existing.groundSchool
      || `Ground or theory training covers the knowledge syllabus for the selected licence. Confirm the applicable subjects, exam format and approved training arrangements with ${authority}; requirements vary by jurisdiction.`,
    medicalRequirements: existing.medicalRequirements
      || `Aviation medical certification is required for pilot licensing. Medical classes, assessment routes and validity rules vary by licence and jurisdiction; confirm the applicable process for ${country} with ${authority} before committing to training.`,
    examinations: existing.examinations
      || `Written examinations, practical skill tests and radio-telephony requirements are set by the licensing authority. Use ${authority}'s current publications to identify the assessments for the licence sought; no exam subjects or passing thresholds are assumed here.`,
    flightTrainingFtoStage: existing.ftoStage || existing.flightTrainingPathway
      || `Practical flight training is completed through an organisation authorised for the intended licence by ${authority}. Verify its approval, training base and licence scope directly; an airport listing does not establish an approved school.`,
    regulatoryPathway: existing.regulatoryPathway
      || `${authority} is the aviation authority recorded for ${country}. Verify current licensing, medical, examination and training-organisation requirements directly with the authority.`,
  };
}

function scoreQuality({
  content,
  location,
  service,
  regulatoryContext,
  localEvidence,
  hierarchy,
  sources,
  faqs,
  masterContent,
}) {
  const scores = {};
  const exactEvidenceCount = localEvidence.filter((item) => (
    item.inherited !== true
    && !String(item.geographicRelationship || '').includes('regional')
    && !item.contextGeography
  )).length;
  const differentiation = content.quality?.differentiation
    || location.contentDifferentiation
    || null;
  const uniqueFaqCount = differentiation?.uniqueFAQCount
    ?? differentiation?.metrics?.uniqueFaqCount
    ?? 0;
  scores.localAviationEvidence = localEvidence.length
    ? SCORE_WEIGHTS.localAviationEvidence
    : 0;
  scores.locationSpecificFacts = hierarchy.length >= 3
    ? SCORE_WEIGHTS.locationSpecificFacts
    : 0;
  scores.regulatorRelevance = regulatoryContext?.authority
    && (regulatoryContext.source || regulatoryContext.href)
    ? SCORE_WEIGHTS.regulatorRelevance
    : 0;
  scores.serviceRelevance = service?.slug
    && (content.serviceContent?.[service.slug]
      || (masterContent?.serviceSlug === service.slug && masterContent.blocks?.length > 0)
      || content.explanation
      || content.studentPathway?.explanation
      || content.locationAviationContent?.studentPathway?.explanation)
    ? SCORE_WEIGHTS.serviceRelevance
    : 0;
  scores.uniqueLocalApplication = hierarchy.length >= 3
    && typeof content.localApplication === 'string'
    && content.localApplication.trim().length > 0
    ? SCORE_WEIGHTS.uniqueLocalApplication
    : 0;

  scores.uniqueFaqOpportunities = Math.min(
    SCORE_WEIGHTS.uniqueFaqOpportunities,
    uniqueFaqCount
      * Math.ceil(SCORE_WEIGHTS.uniqueFaqOpportunities / 2),
  );
  scores.sourceCoverage = sources.length
    ? Math.min(SCORE_WEIGHTS.sourceCoverage, sources.length * 2)
    : 0;
  scores.masterContentReuse = masterContent?.blocks?.length
    ? Math.min(SCORE_WEIGHTS.masterContentReuse, masterContent.blocks.length)
    : 0;

  const score = Object.values(scores).reduce((total, value) => total + value, 0);
  const existingQuality = content.quality || location.quality || {};
  const recordStatus = String(
    location.registryRecordStatus || location.status || '',
  ).toLowerCase();
  let state = 'NOINDEX';
  let reason = (existingQuality.blockers || []).join(' ') || null;
  const foreignDgcaService = service?.slug === 'dgca-ground-classes'
    && (location.countryCode || regulatoryContext?.countryCode) !== 'IN';
  const invalidLocation = recordStatus === 'rejected'
    || location.invalid === true
    || !location.slug
    || !(location.canonicalName || location.name || location.city)
    || !(location.countryCode || regulatoryContext?.countryCode);
  const qualityThresholdMet = score >= 70
    && scores.locationSpecificFacts > 0
    && scores.regulatorRelevance > 0
    && scores.serviceRelevance > 0
    && scores.uniqueFaqOpportunities > 0
    && scores.sourceCoverage > 0
    && differentiation?.status === 'PASSED';
  if (foreignDgcaService) {
    state = 'NOT_SUPPORTED';
    reason = 'DGCA-specific services are not supported for locations outside India.';
  } else if (invalidLocation || existingQuality.state === 'REJECTED') {
    state = 'REJECTED';
    reason = reason || 'The location record is rejected or lacks a canonical identity.';
  } else if (qualityThresholdMet) {
    state = 'INDEXABLE';
    reason = null;
  } else {
    reason = reason || 'The composer quality threshold requires a valid geographic hierarchy, relevant regulator and service content, source coverage, and passed differentiation checks.';
  }

  return {
    score,
    maximumScore: Object.values(SCORE_WEIGHTS).reduce((total, value) => total + value, 0),
    breakdown: Object.fromEntries(Object.entries(scores).map(([criterion, value]) => [
      criterion,
      { score: value, maximum: SCORE_WEIGHTS[criterion] },
    ])),
    state,
    indexable: state === 'INDEXABLE' && existingQuality.indexable === true,
    reason,
    signals: {
      localEvidenceCount: localEvidence.length,
      exactLocationEvidenceCount: exactEvidenceCount,
      hierarchyLevelCount: hierarchy.length,
      uniqueFaqCount,
      sourceCount: sources.length,
      masterBlockCount: masterContent?.blocks?.length || 0,
      locationNameReplacementExcluded: true,
    },
  };
}

export function composeLocationContent({
  location,
  hierarchy = [],
  service,
  regulatoryContext = null,
  content = {},
} = {}) {
  if (!location || !service) {
    throw new TypeError('A location and service are required to compose location content.');
  }

  const masterContent = content.masterContent || { categoryIds: [], blocks: [] };
  const sources = sourceLinksFor(content, location);
  const localEvidence = collectLocalEvidence(content, location);
  const faqs = content.faqs || content.localFAQs
    || content.locationAviationContent?.localFaqs || [];
  const selectedMaster = masterFields(masterContent);
  const mappedRegulator = Object.values(AVIATION_REGULATORY_CONTEXTS).find((context) => (
    (location.countryCode && context.countryCode === location.countryCode)
    || (location.country && context.country === location.country)
  ));
  const authority = regulatoryContext?.authority
    || content.locationAviationContent?.regulatoryContext?.authority
    || content.localAviationProfile?.aviationAuthority?.authority
    || mappedRegulator?.authority
    || null;
  const regulator = authority
    ? {
      ...mappedRegulator,
      ...regulatoryContext,
      authority,
      country: regulatoryContext?.country
        || content.locationAviationContent?.regulatoryContext?.country
        || mappedRegulator?.country
        || location.country
        || null,
      countryCode: regulatoryContext?.countryCode
        || content.locationAviationContent?.regulatoryContext?.countryCode
        || mappedRegulator?.countryCode
        || location.countryCode
        || null,
      source: regulatoryContext?.source
        || content.locationAviationContent?.regulatoryContext?.source
        || mappedRegulator?.source
        || null,
    }
    : null;
  const quality = scoreQuality({
    content,
    location,
    service,
    regulatoryContext: regulator,
    localEvidence,
    hierarchy,
    sources,
    faqs,
    masterContent,
  });
  const regionNames = hierarchy.map(({ name, type }) => ({ name, type }));
  const locationName = location.canonicalName || location.name || location.city || 'this location';
  const serviceName = service.shortName || service.name || service.slug;
  const serviceFields = composedServiceFields({
    content,
    location,
    regulatoryContext: regulator,
  });
  const metaDescription = content.seoDescription
    || content.description
    || `${serviceName} information for ${locationName}${location.country ? `, ${location.country}` : ''}. Check current requirements with ${authority || 'the applicable aviation authority'}; local service delivery is not implied.`;

  return {
    title: content.seoTitle
      || content.title
      || `${serviceName} guidance for ${locationName} | We One Aviation`,
    metaDescription,
    h1: content.h1 || `${serviceName} guidance for ${locationName}`,
    introduction: content.introduction || content.description || metaDescription,
    locationAviationContext: content.localContext
      || content.locationAviationContent?.aviationRelevance
      || '',
    pilotTrainingPathway: selectedMaster.pilotTrainingPathway.length
      ? selectedMaster.pilotTrainingPathway
      : serviceFields.pilotTrainingPathway,
    cplPathway: selectedMaster.cplPathway.length
      ? selectedMaster.cplPathway
      : serviceFields.cplPathway,
    groundTraining: selectedMaster.groundTraining.length
      ? selectedMaster.groundTraining
      : serviceFields.groundTraining,
    medicalRequirements: selectedMaster.medicalRequirements.length
      ? selectedMaster.medicalRequirements
      : serviceFields.medicalRequirements,
    examinations: selectedMaster.examinations.length
      ? selectedMaster.examinations
      : serviceFields.examinations,
    flightTrainingFtoStage: selectedMaster.flightTrainingFtoStage.length
      ? selectedMaster.flightTrainingFtoStage
      : serviceFields.flightTrainingFtoStage,
    regulatoryContext: {
      ...regulator,
      ...(!content.serviceContent?.regulatoryPathway
        ? { summary: serviceFields.regulatoryPathway }
        : {}),
    },
    locationHierarchy: regionNames,
    localApplication: content.localApplication
      || content.locationAviationContent?.howStudentsFromLocationCanTrain
      || `Students researching ${serviceName} from ${locationName} should verify current requirements with ${authority || 'the applicable aviation authority'} and confirm where each training stage is delivered. The available location record does not establish local service delivery.`,
    weOneAviationRole: {
      positioning: 'Published positioning: aviation groundwork and ground-school support, student mentoring, and training-pathway guidance. This statement does not establish local delivery.',
      relationship: content.relationshipStatement
        || content.locationAviationContent?.physicalVsOnlineExplanation
        || content.locationAviationContent?.serviceRelationship?.statement
        || 'Local We One Aviation delivery is not established by the available location evidence.',
      sourceBlocks: (masterContent.blocks || []).filter((block) => (
        block.categoryId === 'We_One_Aviation_services'
      )),
    },
    locationSpecificFaqs: faqs,
    verifiedSources: sources,
    masterContent,
    qualityDifferentiation: {
      ...quality,
      masterCategoriesSelected: masterContent.categoryIds || [],
      geographicHierarchy: regionNames,
      localEvidence: localEvidence.map(({ evidenceId, id, name, fact, text }) => ({
        id: evidenceId || id || null,
        name: name || null,
        fact: fact || text || null,
      })),
    },
  };
}
