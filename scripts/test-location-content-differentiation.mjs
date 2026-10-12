import fs from 'node:fs';
import path from 'node:path';
import { resolveIndiaGeographicRoute } from '../lib/indiaGeographicRegistry.js';
import { resolveWorldGeographicRoute } from '../lib/worldGeographicRegistry.js';
import { buildIndiaLocationServiceContent } from '../lib/indiaLocationContentEngine.js';
import { buildWorldLocationServiceContent } from '../lib/worldLocationContentEngine.js';
import { buildLocationPageModel, resolveLocationService } from '../lib/locationEngine.js';
import { getApprovedLocationServicePairs, getLocationEngineContext } from '../lib/locationSeo.js';
import {
  buildLocationContentSnapshot,
  assessContentDifferentiation,
} from '../lib/locationContentDifferentiation.js';
import { buildLocationTrainingContext } from '../lib/locationTrainingContext.js';
import { composeLocationContent } from '../lib/locationContentComposer.js';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/aviation-evidence.js';
import { INDIA_AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/india-aviation-evidence.generated.js';
import {
  DGCA_FTO_ROSTER_SOURCE,
  DGCA_FTO_ROSTER_VERIFIED_AT,
} from '../data/location-seo/dgca-fto-roster.js';
import { GLOBAL_GEOGRAPHIC_PILOT } from '../data/location-seo/geography/global-pilot.js';
import { SERVICES } from '../data/location-seo/services.js';
import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';
import {
  isApprovedGeographicRoute,
  isGeographicPageQualityEligible,
} from '../lib/locationIndexabilityPolicy.js';

const ROOT = process.cwd();
const GEOGRAPHY_DIRECTORY = path.join(ROOT, 'data', 'location-seo', 'geography');
const BATCH_REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-location-batch-1-report.json',
);
const INDIA_AVIATION_COVERAGE_REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'india-aviation-evidence-coverage-report.json',
);
const DEFAULT_REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-location-differentiation-test.json',
);
const PHASE_4L_REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-evidence-phase-4l-audit.json',
);
const SERVICE = SERVICES.find(({ slug }) => slug === 'pilot-training');
const TEST_COUNT = 100;
const PHASE_4L_CANDIDATE_LIMIT = 100;
const PILOT_TRAINING_EVIDENCE_TYPES = new Set([
  'flight-school',
  'flying-club',
  'aviation-college',
  'aviation-academy',
  'pilot-training-organization',
  'airline-training-organization',
]);
const PHASE_4E_QUALIFIED_LOCATIONS = new Set([
  'IN|agra',
  'IN|dehradun',
  'AE|dubai',
  'IN|hyderabad',
  'IN|kolkata',
  'IN|lucknow',
  'IN|mumbai',
  'IN|ranchi',
  'IN|thiruvananthapuram',
]);
const PHASE_4K_STRONG_LOCATION_IDS = new Set([
  'geo:city:in-hyderabad',
  'geo:city:in-thiruvananthapuram',
  'geo:city:in-amritsar',
  'geo:city:lucknow',
]);
const SIMILARITY_THRESHOLD = GEOGRAPHIC_INDEXABILITY_POLICY
  .contentDifferentiation.maxNormalizedSimilarityPercent;

function wordCount(value) {
  return String(value || '').match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)?.length || 0;
}

function isValidCandidateIdentity(record, resolvedRecord) {
  const normalizeName = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
  return Boolean(
    record.id
    && resolvedRecord.id
    && record.countryCode === resolvedRecord.countryCode
    && normalizeName(record.canonicalName || record.name)
      === normalizeName(resolvedRecord.canonicalName || resolvedRecord.name),
  );
}

function isValidCandidateHierarchy(record, hierarchy) {
  return Boolean(
    hierarchy.length >= 2
    && hierarchy[0].type === 'country'
    && hierarchy[0].countryCode === record.countryCode
    && hierarchy.at(-1).id === record.id
    && hierarchy.some(({ type }) => ['state', 'province', 'region'].includes(type))
    && hierarchy.every((node, index) => (
      node.countryCode === record.countryCode
      && (index === 0 || node.parentId === hierarchy[index - 1].id)
    )),
  );
}

function unsupportedRenderedClaims(text) {
  const checks = [
    /\bWe One Aviation\s+(?:has|operates|runs|maintains)\s+(?:a\s+)?(?:local\s+)?(?:branch|office|classroom|flying school|aircraft|instructor)\b/gi,
    /\b(?:guaranteed|assured)\s+(?:jobs?|CPL|licen[cs]e|ranking|placement)\b/gi,
    /\b(?:airport|airfield)\s+(?:is|serves as)\s+(?:an?\s+)?(?:approved\s+)?(?:flight school|FTO|training base)\b/gi,
    /\bWe One Aviation\s+(?:is|has)\s+(?:an?\s+)?(?:FTO\s+)?partner(?:ship)?\s+(?:in|at|with)\b/gi,
    /\b(?:local|nearby)\s+reviews?\s+(?:say|show|rate)\b/gi,
  ];
  return checks.flatMap((pattern) => [...String(text || '').matchAll(pattern)]
    .map(([claim]) => claim));
}

function removeTrainingQuestions(faqs, trainingContext) {
  const generated = new Set(trainingContext.faqs.map(({ question }) => question));
  return faqs.filter(({ question }) => !generated.has(question));
}

function pilotTrainingIntroduction(record, hierarchy) {
  const name = record.canonicalName || record.name;
  const parent = hierarchy.at(-2)?.name || hierarchy[0]?.name || record.country;
  return `Students in ${name}, a ${record.type} within ${parent}, can use this pilot-training guide to plan the distinct eligibility, DGCA theory and flight-training stages. It separates verified local or parent-region aviation records from the national licensing pathway; it does not imply a local We One Aviation facility.`;
}

function legacyIndiaApplication(record, service, hierarchy) {
  const name = record.canonicalName || record.name;
  const parent = hierarchy.at(-2)?.name || hierarchy[0]?.name || record.country;
  return `${service.serviceExplanation} Students researching from ${name}, a ${record.type} within ${parent}, can use this guidance to plan the stated steps. It does not establish that this service is physically delivered in ${name}; confirm current online availability with the academy.`;
}

function legacyWorldContent({ record, hierarchy, regulator, nearbyAviationPlaces, content }) {
  const name = record.canonicalName || record.name;
  const country = hierarchy[0].name;
  const regionalContext = hierarchy.slice(1, -1)
    .filter(({ type }) => ['state', 'province', 'region', 'county', 'district', 'territory'].includes(type))
    .map(({ name: parentName, type }) => `${parentName} (${type})`)
    .join(', ');
  const locationScope = regionalContext ? `${name}, ${regionalContext}, ${country}` : `${name}, ${country}`;
  const parents = hierarchy.slice(0, -1)
    .map(({ name: parentName, type }) => `${parentName} (${type})`)
    .join(', ') || country;
  const airportText = nearbyAviationPlaces.length
    ? nearbyAviationPlaces.map(({ name: airport, distanceKm }) => (
      `${airport} (about ${distanceKm} km straight-line)`
    )).join('; ')
    : 'No nearby airport record was found in this gazetteer search.';
  const oldIntroduction = `This guide is for people researching pilot training from ${locationScope}. The geographic registry classifies ${name} as a ${record.type} and links it through ${parents}. Training rules belong to the licensing jurisdiction, not to the place-name; the applicable authority recorded here is ${regulator.authority}.`;
  const oldLocalApplication = `For someone based in or researching from ${locationScope}, first establish which country will issue the licence and apply its regulator’s requirements. Then compare where each theory, medical and flight-training stage is delivered, whether the provider holds approval for the intended licence, and what relocation or travel each stage entails. The geographic hierarchy helps identify the jurisdiction; it does not establish a school or training availability in ${name}.`;
  const oldAviationRelevance = nearbyAviationPlaces.length
    ? `GeoNames records the following airport location${nearbyAviationPlaces.length === 1 ? '' : 's'} near the coordinates for ${name}: ${nearbyAviationPlaces.map(({ name: airport, distanceKm }) => `${airport}, approximately ${distanceKm} km in a straight line from the gazetteer coordinates`).join('; ')}. These gazetteer entries establish neither current operational status nor flight-training approval, and the straight-line estimates are not road or travel distances.`
    : `Aviation training is regulated nationally. The location dataset used for this page did not return a nearby airport record for ${name}; that is a limit of the evidence search, not proof that no airport or aviation service exists.`;
  const legacyFaqs = [
    {
      question: `Which licensing jurisdiction applies to pilot-training research from ${name}?`,
      answer: `The registry places ${name} (${record.type}) in ${parents}. ${regulator.authority} is the aviation authority recorded for ${country}; check its current publications for licensing rules and approved organisations.`,
    },
    {
      question: `What airport information is recorded near ${name}?`,
      answer: nearbyAviationPlaces.length
        ? `GeoNames lists ${airportText}. The distances are approximate straight-line calculations from gazetteer coordinates; they do not establish travel time, airport operating status or training approval.`
        : `The geographic search used for this page did not find a nearby airport record. This is not proof that no airport exists near ${name}; check current official aeronautical information.`,
    },
    {
      question: `Does a nearby airport mean a flight school operates in ${name}?`,
      answer: `No. A geographic airport record is not evidence of an approved flying school or a local We One Aviation service. Confirm the provider, training base and current approval with ${regulator.authority}.`,
    },
    {
      question: `What should I verify before choosing pilot training near ${name}?`,
      answer: `Use the recorded ${record.type} to identify the jurisdiction (${locationScope}), then check the licence pathway, provider approval, training base, medical and education requirements, fees and refund terms directly with the provider and ${regulator.authority}.`,
    },
  ];
  const oldSections = content.locationSpecificSections.filter((section) => (
    !section.title.startsWith('Registry reference details')
    &&
    !section.title.startsWith('Geographic-to-training decision')
    && !section.title.startsWith(`${regulator.authority} licensing jurisdiction`)
    && !section.title.startsWith('Airport records and training limits')
    && !section.title.startsWith('Time-zone detail')
  ));
  return {
    introduction: oldIntroduction,
    localApplication: oldLocalApplication,
    faqs: legacyFaqs,
    sections: oldSections,
    aviationRelevance: oldAviationRelevance,
  };
}

function legacyIndiaContent({ record, hierarchy, service, content, location, trainingContext }) {
  const oldFaqs = removeTrainingQuestions(content.faqs, trainingContext);
  const oldSections = content.locationSpecificSections.filter((section) => (
    !section.title.startsWith('Registry reference details')
    &&
    !section.title.startsWith('Geographic-to-training decision')
    && !section.title.startsWith(`${content.locationAviationContent.regulatoryContext.authority} licensing jurisdiction`)
    && !section.title.startsWith('Airport records and training limits')
    && !section.title.startsWith('Time-zone detail')
  ));
  const oldBaseAviation = content.locationAviationContent.aviationRelevance
    .replace(` ${trainingContext.aviationSummary}`, '');
  const airportIds = new Set(trainingContext.matrix.nearbyAirportRecords.map(({ id }) => id));
  const airportUrls = new Set(trainingContext.matrix.nearbyAirportRecords.map(({ sourceUrl }) => sourceUrl));
  const name = record.canonicalName || record.name;
  const oldContent = {
    ...content,
    locationPilotTrainingPage: null,
    introduction: pilotTrainingIntroduction(record, hierarchy),
    localApplication: legacyIndiaApplication(record, service, hierarchy),
    faqs: oldFaqs,
    locationSpecificSections: oldSections,
    sourceReferences: content.sourceReferences.filter(({ href }) => !airportUrls.has(href)),
    locationAviationContent: {
      ...content.locationAviationContent,
      aviationRelevance: oldBaseAviation,
      howStudentsFromLocationCanTrain: legacyIndiaApplication(record, service, hierarchy),
      localFaqs: oldFaqs,
      locationTrainingMatrix: null,
      nearbyAviationHubs: content.locationAviationContent.nearbyAviationHubs
        .filter(({ evidenceId }) => !airportIds.has(evidenceId)),
      sourceLinks: content.locationAviationContent.sourceLinks
        .filter(({ href }) => !airportUrls.has(href)),
    },
  };
  const oldLocation = {
    ...location,
    sourceLinks: location.sourceLinks.filter(({ href }) => !airportUrls.has(href)),
    localFAQs: oldFaqs,
    locationAviationContent: oldContent.locationAviationContent,
  };
  oldContent.composedPage = composeLocationContent({
    location: oldLocation,
    hierarchy,
    service,
    regulatoryContext: oldContent.locationAviationContent.regulatoryContext,
    content: oldContent,
  });
  return {
    content: oldContent,
    location: oldLocation,
    introduction: oldContent.introduction,
    localApplication: oldContent.localApplication,
    faqs: oldFaqs,
    sections: oldSections,
  };
}

function summarizePeerDifferentiation(entries) {
  const results = entries.map((entry) => {
    const sameStratum = entries.filter((other) => (
      other !== entry
      && other.record.countryCode === entry.record.countryCode
      && other.record.type === entry.record.type
    ));
    const assessment = assessContentDifferentiation({
      candidate: entry.snapshot,
      comparisons: sameStratum.map(({ snapshot }) => snapshot),
    });
    const similarity = assessment.similarityScore;
    const fullPageSimilarity = assessment.metrics.fullPageNormalizedSimilarityPercent;
    const hasExactDuplicate = assessment.comparisons
      .some(({ exactDuplicate }) => exactDuplicate);
    const hasExactRenderedTextDuplicate = sameStratum
      .some((other) => other.snapshot.body === entry.snapshot.body);
    return {
      ...entry,
      assessment,
      similarity,
      fullPageSimilarity,
      differentiationScore: Math.max(0, 100 - similarity),
      exactDuplicate: hasExactDuplicate,
      exactRenderedTextDuplicate: hasExactRenderedTextDuplicate,
      nearDuplicate: similarity >= SIMILARITY_THRESHOLD,
      uniqueFaqCount: assessment.metrics.uniqueFaqCount,
      uniqueSectionCount: assessment.metrics.uniqueSectionCount,
      comparisonCount: sameStratum.length,
    };
  });
  const scores = results.map(({ differentiationScore }) => differentiationScore);
  const ordered = [...scores].sort((left, right) => left - right);
  const generated = results.length;
  const indexable = results.filter(({ finalState }) => finalState === 'INDEXABLE').length;
  const exactDuplicates = results.filter(({ exactDuplicate }) => exactDuplicate).length;
  const exactRenderedTextDuplicates = results
    .filter(({ exactRenderedTextDuplicate }) => exactRenderedTextDuplicate).length;
  const nearDuplicates = results.filter(({ nearDuplicate }) => nearDuplicate).length;
  const fullPageNearDuplicates = results.filter(({ assessment }) => (
    assessment.comparisons.some(({ fullPageNormalizedSimilarityPercent }) => (
      fullPageNormalizedSimilarityPercent >= SIMILARITY_THRESHOLD
    ))
  )).length;
  return {
    results,
    metrics: {
      testedLocations: generated,
      averageDifferentiation: Number((scores.reduce((sum, score) => sum + score, 0) / generated).toFixed(2)),
      medianDifferentiation: Number((
        (ordered[Math.floor((generated - 1) / 2)] + ordered[Math.floor(generated / 2)]) / 2
      ).toFixed(2)),
      minimumDifferentiation: Number(ordered[0].toFixed(1)),
      maximumDifferentiation: Number(ordered.at(-1).toFixed(1)),
      exactDuplicates,
      exactRenderedTextDuplicates,
      nearDuplicateLocations: nearDuplicates,
      nearDuplicatePercentage: Number((nearDuplicates / generated * 100).toFixed(2)),
      averageFullPageSimilarity: Number((
        results.reduce((sum, { fullPageSimilarity }) => sum + fullPageSimilarity, 0) / generated
      ).toFixed(2)),
      minimumFullPageSimilarity: Number(Math.min(...results.map(({ fullPageSimilarity }) => fullPageSimilarity)).toFixed(1)),
      maximumFullPageSimilarity: Number(Math.max(...results.map(({ fullPageSimilarity }) => fullPageSimilarity)).toFixed(1)),
      fullPageNearDuplicateLocations: fullPageNearDuplicates,
      fullPageNearDuplicatePercentage: Number((fullPageNearDuplicates / generated * 100).toFixed(2)),
      indexable,
      noindex: generated - indexable,
      averageSectionCount: Number((
        results.reduce((sum, { sectionCount }) => sum + sectionCount, 0) / generated
      ).toFixed(2)),
      averageUniqueSections: Number((
        results.reduce((sum, { uniqueSectionCount }) => sum + uniqueSectionCount, 0) / generated
      ).toFixed(2)),
      averageUniqueFaqs: Number((
        results.reduce((sum, { uniqueFaqCount }) => sum + uniqueFaqCount, 0) / generated
      ).toFixed(2)),
      averageVisibleWordCount: Number((
        results.reduce((sum, { visibleWordCount }) => sum + visibleWordCount, 0) / generated
      ).toFixed(1)),
      comparedLocationCount: results.filter(({ comparisonCount }) => comparisonCount > 0).length,
    },
  };
}

function sectionTokenSimilarity(left, right) {
  const tokens = (value) => new Set(String(value || '').toLowerCase().match(/[a-z0-9]+/g) || []);
  const leftTokens = tokens(left);
  const rightTokens = tokens(right);
  const union = new Set([...leftTokens, ...rightTokens]);
  if (!union.size) return 100;
  const intersection = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return intersection / union.size * 100;
}

function summarizeSectionSimilarity(entries) {
  const categories = [
    'GENERIC_MASTER_CONTENT',
    'COUNTRY_REGULATOR_CONTENT',
    'GEOGRAPHIC_HIERARCHY_CONTENT',
    'LOCATION_AVIATION_EVIDENCE',
    'LOCATION_PATHWAY_GUIDANCE',
    'LOCATION_FAQ',
    'WE_ONE_ACTUAL_SERVICE_POSITIONING',
  ];
  const pageSections = entries.map((entry) => {
    const sections = reportResult(entry).renderedSectionClassification;
    return {
      entry,
      textByCategory: categories.reduce((result, category) => {
        result[category] = sections
          .filter(({ category: sectionCategory }) => sectionCategory === category)
          .map(({ text }) => text)
          .join('\n');
        return result;
      }, {}),
    };
  });
  return categories.map((category) => {
    const similarities = [];
    for (let leftIndex = 0; leftIndex < pageSections.length; leftIndex += 1) {
      const left = pageSections[leftIndex];
      for (let rightIndex = leftIndex + 1; rightIndex < pageSections.length; rightIndex += 1) {
        const right = pageSections[rightIndex];
        if (left.entry.record.countryCode !== right.entry.record.countryCode
          || left.entry.record.type !== right.entry.record.type
          || !left.textByCategory[category]
          || !right.textByCategory[category]) continue;
        similarities.push(sectionTokenSimilarity(
          left.textByCategory[category],
          right.textByCategory[category],
        ));
      }
    }
    return {
      category,
      comparedPeerPairs: similarities.length,
      averageSimilarityPercent: similarities.length
        ? Number((similarities.reduce((sum, value) => sum + value, 0) / similarities.length).toFixed(1))
        : null,
      minimumSimilarityPercent: similarities.length
        ? Number(Math.min(...similarities).toFixed(1))
        : null,
      maximumSimilarityPercent: similarities.length
        ? Number(Math.max(...similarities).toFixed(1))
        : null,
    };
  });
}

function summarizeTierOutcomes(rows) {
  return ['STRONG', 'MEDIUM', 'THIN'].reduce((summary, tier) => {
    const tierRows = rows.filter(({ tier: rowTier }) => rowTier === tier);
    const similarities = tierRows
      .map(({ similarityPercent }) => similarityPercent)
      .filter(Number.isFinite);
    const exactDuplicates = tierRows.filter(({ exactDuplicate }) => exactDuplicate).length;
    const nearDuplicates = tierRows.filter(({ nearDuplicate }) => nearDuplicate).length;
    summary[tier] = {
      count: tierRows.length,
      averageSimilarityPercent: similarities.length
        ? Number((similarities.reduce((sum, value) => sum + value, 0) / similarities.length).toFixed(2))
        : null,
      minimumSimilarityPercent: similarities.length
        ? Number(Math.min(...similarities).toFixed(1))
        : null,
      maximumSimilarityPercent: similarities.length
        ? Number(Math.max(...similarities).toFixed(1))
        : null,
      exactDuplicates,
      nearDuplicateCount: nearDuplicates,
      nearDuplicateRatePercent: tierRows.length
        ? Number((nearDuplicates / tierRows.length * 100).toFixed(2))
        : null,
      indexable: tierRows.filter(({ finalState }) => finalState === 'INDEXABLE').length,
      noindex: tierRows.filter(({ finalState }) => finalState !== 'INDEXABLE').length,
    };
    return summary;
  }, {});
}

async function generateCurrentPage(batchRow) {
  const india = batchRow.countryCode === 'IN';
  const resolved = india
    ? await resolveIndiaGeographicRoute(batchRow.slug)
    : await resolveWorldGeographicRoute(batchRow.slug);
  if (!resolved.location || resolved.location.id !== batchRow.locationId) {
    throw new Error(`Sample route ${batchRow.route || batchRow.slug} no longer resolves to its Batch 1 record.`);
  }
  const generated = india
    ? buildIndiaLocationServiceContent({
      record: resolved.location,
      hierarchy: resolved.hierarchy,
      service: SERVICE,
      routeSlug: batchRow.slug,
    })
    : buildWorldLocationServiceContent({
      record: resolved.location,
      hierarchy: resolved.hierarchy,
      service: SERVICE,
      nearbyAviationPlaces: resolved.nearbyAviationPlaces,
      routeSlug: batchRow.slug,
    });
  const location = generated.location;
  const content = generated.content;
  const pageModel = buildLocationPageModel({
    location,
    service: SERVICE,
    content,
    siteOrigin: 'https://weoneaviation.in',
    locations: resolved.hierarchy,
    geographicDataValidated: true,
  });
  const snapshot = buildLocationContentSnapshot({
    location,
    hierarchy: resolved.hierarchy,
    model: { ...pageModel, service: SERVICE },
    sections: content.locationSpecificSections || [],
  });
  const trainingContext = buildLocationTrainingContext({
    record: resolved.location,
    hierarchy: resolved.hierarchy,
    regulator: india
      ? content.locationAviationContent.regulatoryContext
      : pageModel.regulatoryContext,
    nearbyAviationPlaces: india ? location.locationAviationContent.nearbyAviationHubs
      .filter(({ geographicRelationship }) => geographicRelationship === 'gazetteer-proximity')
      .map(({ evidenceId, title, href, fact }) => {
        const match = /^GeoNames records (.+) as an airport about ([\d.]+) km/.exec(fact);
        return {
          id: evidenceId,
          name: title,
          distanceKm: match ? Number(match[2]) : null,
          sourceUrl: href,
          publisher: 'GeoNames',
        };
      })
      : resolved.nearbyAviationPlaces,
  });
  const legacy = india
    ? legacyIndiaContent({
      record: resolved.location,
      hierarchy: resolved.hierarchy,
      service: SERVICE,
      content,
      location,
      trainingContext,
    })
    : {
      ...legacyWorldContent({
        record: resolved.location,
        hierarchy: resolved.hierarchy,
        regulator: pageModel.regulatoryContext,
        nearbyAviationPlaces: resolved.nearbyAviationPlaces,
        content,
      }),
      content: null,
      location: null,
    };
  const legacyLocation = legacy.location || location;
  const legacyContent = legacy.content || {
    ...content,
    locationPilotTrainingPage: null,
    introduction: legacy.introduction,
    localApplication: legacy.localApplication,
    faqs: legacy.faqs,
    locationSpecificSections: legacy.sections,
    locationAviationContent: {
      ...content.locationAviationContent,
      aviationRelevance: legacy.aviationRelevance,
      howStudentsFromLocationCanTrain: legacy.localApplication,
      localFaqs: legacy.faqs,
      locationTrainingMatrix: null,
    },
  };
  legacyContent.composedPage = composeLocationContent({
    location: legacyLocation,
    hierarchy: resolved.hierarchy,
    service: SERVICE,
    regulatoryContext: pageModel.regulatoryContext,
    content: legacyContent,
  });
  const legacyPageModel = buildLocationPageModel({
    location: legacyLocation,
    service: SERVICE,
    content: legacyContent,
    siteOrigin: 'https://weoneaviation.in',
    locations: resolved.hierarchy,
    geographicDataValidated: true,
  });
  const legacySnapshot = buildLocationContentSnapshot({
    location: legacyLocation,
    hierarchy: resolved.hierarchy,
    model: {
      ...legacyPageModel,
      service: SERVICE,
      renderedPageText: null,
      renderedPageSections: null,
      renderedFaqs: null,
    },
    sections: legacy.sections || legacyContent.locationSpecificSections || [],
  });
  return {
    record: resolved.location,
    hierarchy: resolved.hierarchy,
    content,
    location,
    pageModel,
    snapshot,
    legacy,
    legacySnapshot,
    trainingContext,
    visibleWordCount: wordCount(snapshot.body),
    finalState: pageModel.indexability === 'INDEXABLE' ? 'INDEXABLE' : 'NOINDEX',
    matrix: {
      ...trainingContext.matrix,
      selectedMasterSections: (content.masterContent?.blocks || []).map(({
        categoryId,
        heading,
        sourceFile,
      }) => ({ categoryId, heading, sourceFile })),
    },
  };
}

async function evaluateEvidenceLocation(sourceRecord) {
  const india = sourceRecord.countryCode === 'IN';
  const resolved = india
    ? await resolveIndiaGeographicRoute(sourceRecord.slug)
    : await resolveWorldGeographicRoute(sourceRecord.slug);
  if (!resolved.location
    || resolved.location.countryCode !== sourceRecord.countryCode
    || (resolved.location.canonicalName || resolved.location.name).normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '').toLowerCase()
      !== (sourceRecord.canonicalName || sourceRecord.name).normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').toLowerCase()) {
    throw new Error(`Evidence location ${sourceRecord.id} did not resolve to the same canonical place.`);
  }
  const generated = india
    ? buildIndiaLocationServiceContent({
      record: resolved.location,
      hierarchy: resolved.hierarchy,
      service: SERVICE,
      routeSlug: sourceRecord.slug,
    })
    : buildWorldLocationServiceContent({
      record: resolved.location,
      hierarchy: resolved.hierarchy,
      service: SERVICE,
      nearbyAviationPlaces: resolved.nearbyAviationPlaces,
      routeSlug: sourceRecord.slug,
    });
  const pageModel = buildLocationPageModel({
    location: generated.location,
    service: SERVICE,
    content: generated.content,
    siteOrigin: 'https://weoneaviation.in',
    locations: resolved.hierarchy,
    geographicDataValidated: true,
  });
  const differentiation = generated.content.quality?.differentiation
    || generated.content.differentiation
    || pageModel.contentDifferentiation;
  const qualityGatePassed = isGeographicPageQualityEligible({
    location: generated.location,
    service: SERVICE,
    content: generated.content,
    quality: generated.content.quality,
  });
  const productionRouteApproved = isApprovedGeographicRoute(
    generated.content.canonicalPath,
  );
  const similarity = differentiation?.metrics?.normalizedSimilarityPercent
    ?? differentiation?.normalizedSimilarityPercent
    ?? null;
  return {
    resolved,
    generated,
    pageModel,
    differentiation,
    similarity,
    qualityGatePassed,
    productionRouteApproved,
    unsupportedClaims: unsupportedRenderedClaims(
      (pageModel.renderedPageText || []).join('\n'),
    ),
  };
}

async function auditEvidenceRichLocations() {
  const recordsById = new Map(GLOBAL_GEOGRAPHIC_PILOT.records.map((record) => [
    record.id,
    record,
  ]));
  const locationIds = [...new Set(AVIATION_EVIDENCE_RECORDS
    .filter(({ type }) => type !== 'aviation-authority')
    .map(({ locationId }) => locationId))];
  const candidates = new Map();
  for (const locationId of locationIds) {
    const sourceRecord = recordsById.get(locationId);
    if (!sourceRecord) {
      throw new Error(`Aviation evidence references missing global geography "${locationId}".`);
    }
    const resolvedRoute = sourceRecord.countryCode === 'IN'
      ? await resolveIndiaGeographicRoute(sourceRecord.slug)
      : null;
    const registryId = resolvedRoute?.location
      && resolvedRoute.location.countryCode === sourceRecord.countryCode
      ? resolvedRoute.location.id
      : sourceRecord.id;
    const key = `${sourceRecord.countryCode}:${registryId}`;
    if (!candidates.has(key)) candidates.set(key, sourceRecord);
  }
  for (const evidence of INDIA_AVIATION_EVIDENCE_RECORDS) {
    const resolvedRoute = await resolveIndiaGeographicRoute(evidence.geographySlug);
    if (!resolvedRoute.location || resolvedRoute.location.id !== evidence.locationId) {
      throw new Error(`Ingested evidence ${evidence.id} no longer resolves to its exact registry ID.`);
    }
    const key = `IN:${evidence.locationId}`;
    if (!candidates.has(key)) candidates.set(key, resolvedRoute.location);
  }

  const evaluated = [];
  for (const sourceRecord of candidates.values()) {
    const page = await evaluateEvidenceLocation(sourceRecord);
    const aviationContent = page.generated.content.locationAviationContent || {};
    const evidence = [
      ...(aviationContent.localAviationFacts || []),
      ...(aviationContent.aviationFacts || []),
      ...(aviationContent.sourceAttributedAviationFacts || []),
      ...(aviationContent.sourceAttributedRegionalAviationFacts || []),
      ...(aviationContent.nearbyAviationHubs || []),
    ];
    const evidenceById = new Map([
      ...AVIATION_EVIDENCE_RECORDS,
      ...INDIA_AVIATION_EVIDENCE_RECORDS,
    ].map((item) => [item.id, item]));
    const evidenceDetails = evidence.map((item) => {
      const id = item.evidenceId || item.id;
      const evidenceRecord = evidenceById.get(id);
      return [id, {
        ...evidenceRecord,
        ...item,
        evidenceId: id,
        name: evidenceRecord?.name || item.name || item.title,
        type: item.type || evidenceRecord?.type,
        fact: item.fact || evidenceRecord?.fact,
        source: item.source || item.publisher || evidenceRecord?.source,
        sourceUrl: item.sourceUrl || item.href || evidenceRecord?.sourceUrl,
        geographicRelationship: item.geographicRelationship
          || evidenceRecord?.geographicRelationship,
        sourceTitle: item.sourceTitle || evidenceRecord?.sourceTitle,
        sourceDate: item.sourceDate || evidenceRecord?.sourceDate,
        sourceDateBasis: item.sourceDateBasis || evidenceRecord?.sourceDateBasis,
        sourceCreatedAt: item.sourceCreatedAt || evidenceRecord?.sourceCreatedAt,
        sourceLastModifiedAt: item.sourceLastModifiedAt
          || evidenceRecord?.sourceLastModifiedAt,
        verificationDate: item.verificationDate || item.verifiedAt
          || evidenceRecord?.verificationDate || evidenceRecord?.verifiedAt,
        verificationStatus: item.verificationStatus || evidenceRecord?.verificationStatus,
        attributionNote: item.attributionNote || evidenceRecord?.attributionNote,
      }];
    }).filter(([id]) => Boolean(id));
    const uniqueEvidence = [...new Map(evidenceDetails).values()];
    const profile = page.generated.content.locationPilotTrainingPage.evidenceProfile;
    const resolvedRecord = page.resolved.location;
    const hierarchyValid = isValidCandidateHierarchy(
      resolvedRecord,
      page.resolved.hierarchy,
    );
    const identityValid = isValidCandidateIdentity(sourceRecord, resolvedRecord)
      && page.generated.location.id === resolvedRecord.id;
    const regulator = page.generated.content.locationAviationContent?.regulatoryContext;
    const directSourceEvidence = uniqueEvidence.filter((item) => (
      item.verificationStatus === 'primary-source-listed'
      && item.geographicRelationship === 'located-within'
    ));
    const regionalSourceEvidence = uniqueEvidence.filter((item) => (
      item.verificationStatus === 'primary-source-listed'
      && item.geographicRelationship === 'regional-context'
    ));
    const auditedSourceEvidence = [...directSourceEvidence, ...regionalSourceEvidence];
    const evidenceTypes = [...new Set(auditedSourceEvidence.map(({ type }) => type).filter(Boolean))].sort();
    const sourceCount = new Set(auditedSourceEvidence
      .map(({ sourceUrl, href }) => sourceUrl || href)
      .filter((href) => /^https:\/\//.test(href || ''))).size;
    const directTrainingEvidence = directSourceEvidence.filter(({ type }) => (
      PILOT_TRAINING_EVIDENCE_TYPES.has(type)
    ));
    const regionalTrainingEvidence = regionalSourceEvidence.filter(({ type }) => (
      PILOT_TRAINING_EVIDENCE_TYPES.has(type)
    ));
    const mappedRegulator = Object.values(AVIATION_REGULATORY_CONTEXTS)
      .find(({ countryCode }) => countryCode === sourceRecord.countryCode);
    const differentiationPassed = page.differentiation?.status === 'PASSED'
      && Number.isFinite(page.similarity)
      && page.similarity < SIMILARITY_THRESHOLD;
    const qualified = profile.level === 'STRONG'
      && profile.eligibleForIndexabilityEvaluation
      && page.qualityGatePassed
      && differentiationPassed
      && page.unsupportedClaims.length === 0;
    evaluated.push({
      location: sourceRecord.canonicalName || sourceRecord.name,
      locationId: sourceRecord.id,
      slug: sourceRecord.slug,
      country: sourceRecord.country,
      countryCode: sourceRecord.countryCode,
      geographicType: sourceRecord.type,
      geographicIdentityValid: identityValid,
      hierarchyValid,
      regulator: regulator ? {
        country: regulator.country || null,
        countryCode: mappedRegulator?.countryCode || null,
        authority: regulator.authority || null,
        source: regulator.source || null,
        valid: Boolean(
          mappedRegulator
          && regulator.country === mappedRegulator.country
          && regulator.authority
          && regulator.authority === mappedRegulator.authority
          && /^https:\/\//.test(regulator.source || '')
          && regulator.source === mappedRegulator.source
        ),
      } : null,
      evidenceProfile: profile,
      directAviationEvidenceCount: directSourceEvidence.length,
      regionalAviationEvidenceCount: regionalSourceEvidence.length,
      directPilotTrainingEvidenceCount: directTrainingEvidence.length,
      regionalPilotTrainingEvidenceCount: regionalTrainingEvidence.length,
      evidenceTypes,
      sourceCount,
      evidence: uniqueEvidence.map((item) => ({
        id: item.evidenceId,
        geographicRecordId: item.locationId || sourceRecord.id,
        name: item.name,
        type: item.type,
        relationship: item.geographicRelationship,
        sourceTitle: item.sourceTitle || null,
        sourcePublisher: item.sourcePublisher || item.source,
        sourceDate: item.sourceDate || null,
        sourceDateBasis: item.sourceDateBasis || null,
        sourceCreatedAt: item.sourceCreatedAt || null,
        sourceLastModifiedAt: item.sourceLastModifiedAt || null,
        verificationDate: item.verificationDate || item.verifiedAt || null,
        jurisdiction: item.regulatoryAuthority || regulator?.authority || null,
        verificationStatus: item.verificationStatus || null,
        fact: item.fact,
        source: item.source,
        sourceUrl: item.sourceUrl,
        attributionNote: item.attributionNote || null,
      })),
      state: page.resolved.hierarchy.findLast(({ type }) => type === 'state')?.name
        || sourceRecord.state
        || null,
      usesPhase4FAddedEvidence: uniqueEvidence.some(({ evidenceId }) => (
        INDIA_AVIATION_EVIDENCE_RECORDS.some(({ id }) => id === evidenceId)
      )),
      differentiation: {
        status: page.differentiation?.status || 'NOT_ASSESSED',
        normalizedSimilarityPercent: page.similarity,
        differentiationScore: Number.isFinite(page.similarity)
          ? Number((100 - page.similarity).toFixed(1))
          : null,
        passed80PercentGate: differentiationPassed,
      },
      exactDuplicate: Boolean(page.differentiation?.comparisons?.some(({ exactDuplicate }) => (
        exactDuplicate
      ))),
      qualityGatePassed: page.qualityGatePassed,
      qualityScore: Number.isFinite(page.pageModel.composedQuality?.score)
        ? page.pageModel.composedQuality.score
        : null,
      productionRouteApproved: page.productionRouteApproved,
      indexabilityState: page.pageModel.indexability,
      qualifiedIndexabilityCandidate: qualified,
      unsupportedClaims: page.unsupportedClaims,
      reason: [
        `${profile.criteria.primarySourceDirectAviationFactCount} direct and ${profile.criteria.primarySourceRegionalAviationFactCount} regional source-listed records`,
        `${profile.criteria.distinctAviationEvidenceTypes} aviation evidence types across ${profile.criteria.distinctAviationSourceCount} source URLs`,
        profile.level === 'STRONG'
          ? 'meets evidence-tier requirements'
          : `evidence tier is ${profile.level}`,
        differentiationPassed
          ? 'passes the existing similarity/differentiation gate'
          : 'does not pass the existing similarity/differentiation gate',
        page.productionRouteApproved
          ? 'route is already explicitly approved'
          : 'route is not explicitly approved and remains NOINDEX',
      ].join('; '),
    });
  }
  return evaluated.sort((left, right) => (
      right.evidenceProfile.score - left.evidenceProfile.score
      || right.evidenceProfile.criteria.verifiedAviationEvidenceCount
        - left.evidenceProfile.criteria.verifiedAviationEvidenceCount
      || left.location.localeCompare(right.location)
    ));
}

function reportResult(result) {
  const { record, hierarchy, content, pageModel, trainingContext, matrix } = result;
  const renderedPage = content.locationPilotTrainingPage;
  return {
    locationId: record.id,
    slug: record.slug,
    route: `/${record.slug}/${SERVICE.slug}`,
    location: record.canonicalName || record.name,
    country: record.country,
    countryCode: record.countryCode,
    geographicLevel: record.type,
    hierarchy: hierarchy.map(({ name, type }) => ({ name, type })),
    regulator: matrix.licensingJurisdiction,
    nearbyAirportRecords: matrix.nearbyAirportRecords,
    timeZone: matrix.timeZone,
    localPlanningFocus: matrix.localPlanningFocus,
    introduction: content.introduction,
    pathway: content.localApplication,
    faqQuestions: content.faqs.map(({ question }) => question),
    sectionTitles: content.locationSpecificSections.map(({ title }) => title),
    sectionCount: content.locationSpecificSections.length,
    selectedMasterSections: matrix.selectedMasterSections,
    visibleWordCount: result.visibleWordCount,
    renderedPageText: renderedPage.visibleText,
    renderedSections: renderedPage.sections.map(({ category, title, paragraphs, items, sourceLinks }) => ({
      category,
      title,
      text: [
        ...paragraphs,
        ...items.flatMap(({ label, value }) => [label, value]),
        ...sourceLinks.map(({ label }) => label),
      ].join('\n'),
    })),
    renderedSectionClassification: [
      {
        category: 'GEOGRAPHIC_HIERARCHY_CONTENT',
        title: 'Breadcrumb and location hierarchy',
        text: ['Home', ...renderedPage.breadcrumbs, renderedPage.eyebrow].join('\n'),
      },
      {
        category: 'LOCATION_PATHWAY_GUIDANCE',
        title: renderedPage.h1,
        text: `${renderedPage.h1}\n${renderedPage.introduction}`,
      },
      {
        category: 'GENERIC_MASTER_CONTENT',
        title: 'Header call to action',
        text: renderedPage.ctaLabel,
      },
      ...renderedPage.sections.map(({ category, title, paragraphs, items, sourceLinks }) => ({
        category: ({
        LOCATION_HIERARCHY_CONTENT: 'GEOGRAPHIC_HIERARCHY_CONTENT',
        REGULATORY_CONTENT: 'COUNTRY_REGULATOR_CONTENT',
        LOCATION_AVIATION_EVIDENCE: 'LOCATION_AVIATION_EVIDENCE',
        LOCATION_APPLICATION_CONTENT: 'LOCATION_PATHWAY_GUIDANCE',
        COUNTRY_CONTENT: 'GENERIC_MASTER_CONTENT',
        })[category],
        title,
        text: [
        ...paragraphs,
        ...items.flatMap(({ label, value }) => [label, value]),
        ...sourceLinks.map(({ label }) => label),
        ].join('\n'),
      })),
      ...(renderedPage.masterBlocks.length ? [{
        category: 'GENERIC_MASTER_CONTENT',
        title: 'Pilot-training reference',
        text: renderedPage.masterBlocks.flatMap(({ heading, excerpt, sourceFile }) => [
          heading,
          excerpt,
          sourceFile,
        ]).join('\n'),
      }] : []),
      {
        category: 'LOCATION_FAQ',
        title: renderedPage.faqTitle,
        text: ['FAQ', renderedPage.faqTitle, ...renderedPage.faqs.flatMap(({ question, answer }) => [
          question,
          answer,
        ])].join('\n'),
      },
      {
        category: 'WE_ONE_ACTUAL_SERVICE_POSITIONING',
        title: "We One Aviation's role",
        text: renderedPage.relationship,
      },
      {
        category: 'GENERIC_MASTER_CONTENT',
        title: 'Related guidance',
        text: renderedPage.links.flatMap(({ context, label }) => [context, label]).join('\n'),
      },
    ],
    renderedFaqs: renderedPage.faqs,
    evidenceProfile: renderedPage.evidenceProfile,
    unsupportedRenderedClaims: unsupportedRenderedClaims(renderedPage.visibleText.join('\n')),
    qualityScore: pageModel.composedQuality?.score || 0,
    indexabilityState: pageModel.indexability,
    qualityState: pageModel.qualityState,
  };
}

function example(result, legacyScore, newScore) {
  const current = reportResult(result);
  const beforeSections = result.legacy.sections;
  return {
    route: current.route,
    location: current.location,
    hierarchy: current.hierarchy,
    before: {
      differentiationScore: Number(legacyScore.differentiationScore.toFixed(1)),
      normalizedSimilarityPercent: legacyScore.similarity,
      fullPageNormalizedSimilarityPercent: legacyScore.fullPageSimilarity,
      exactDuplicate: legacyScore.exactDuplicate,
      nearDuplicate: legacyScore.nearDuplicate,
      renderedContent: result.legacySnapshot.body,
      introduction: result.legacy.introduction,
      pathway: result.legacy.localApplication,
      faqQuestions: result.legacy.faqs.map(({ question }) => question),
      sectionCount: beforeSections?.length ?? result.legacySnapshot.sections.length,
    },
    after: {
      differentiationScore: Number(newScore.differentiationScore.toFixed(1)),
      normalizedSimilarityPercent: newScore.similarity,
      fullPageNormalizedSimilarityPercent: newScore.fullPageSimilarity,
      exactDuplicate: newScore.exactDuplicate,
      nearDuplicate: newScore.nearDuplicate,
      introduction: current.introduction,
      pathway: current.pathway,
      faqQuestions: current.faqQuestions,
      sectionCount: current.sectionCount,
      uniqueSectionCount: newScore.uniqueSectionCount,
      uniqueFaqCount: newScore.uniqueFaqCount,
      visibleWordCount: current.visibleWordCount,
      qualityScore: current.qualityScore,
      indexabilityState: newScore.finalState,
      renderedContent: current.renderedPageText.join('\n'),
      renderedSections: current.renderedSections,
      renderedFaqs: current.renderedFaqs,
      fullPageSimilarity: newScore.fullPageSimilarity,
      unsupportedRenderedClaims: current.unsupportedRenderedClaims,
    },
    matrix: current,
  };
}

async function main() {
  if (!SERVICE) throw new Error('The pilot-training service is not configured.');
  const batchReport = JSON.parse(fs.readFileSync(BATCH_REPORT_PATH, 'utf8'));
  const failed = batchReport.locations
    .filter(({ status, nearDuplicate }) => status === 'NOINDEX' && nearDuplicate)
    .slice(0, TEST_COUNT);
  if (failed.length !== TEST_COUNT) {
    throw new Error(`Batch 1 has only ${failed.length} failed near-duplicate records for the fixed test.`);
  }
  const beforeEntries = [];
  const afterEntries = [];
  for (const [index, batchRow] of failed.entries()) {
    const current = await generateCurrentPage(batchRow);
    const sectionNames = new Set(current.trainingContext.sections.map(({ title }) => title));
    const legacyFaqs = current.legacy.faqs;
    const legacySections = current.legacy.sections
      || current.content.locationSpecificSections.filter(({ title }) => !sectionNames.has(title));
    const legacyVisibleWords = wordCount([
      current.legacy.introduction,
      current.legacy.localApplication,
      current.legacySnapshot.body,
      ...(current.legacy.masterContent?.blocks || []).map(({ excerpt }) => excerpt),
    ].filter(Boolean).join(' '));
    const legacySnapshot = {
      ...current.legacySnapshot,
      sections: legacySections,
      faqs: legacyFaqs,
    };
    const afterSnapshot = current.snapshot;
    const sections = current.content.locationSpecificSections || [];
    afterEntries.push({
      ...current,
      selectionOrder: batchRow.selectionOrder,
      sectionCount: sections.length,
      finalState: current.finalState,
    });
    beforeEntries.push({
      record: current.record,
      snapshot: legacySnapshot,
      selectionOrder: batchRow.selectionOrder,
      sectionCount: legacySections.length,
      visibleWordCount: legacyVisibleWords || batchRow.visibleWordCount || 0,
      finalState: 'NOINDEX',
      differentiationScore: batchRow.differentiationScore,
      similarity: batchRow.normalizedSimilarityPercent,
      exactDuplicate: batchRow.exactDuplicate,
      nearDuplicate: batchRow.nearDuplicate,
      introduction: current.legacy.introduction,
      localApplication: current.legacy.localApplication,
      faqs: legacyFaqs,
    });
    if (!afterSnapshot || !legacySnapshot) {
      throw new Error(`Failed to create before/after content snapshots for ${batchRow.slug}.`);
    }
    if ((index + 1) % 10 === 0) {
      console.log(`Regenerated ${index + 1} of ${TEST_COUNT} fixed sample locations.`);
    }
  }

  const beforeComparison = summarizePeerDifferentiation(beforeEntries);
  const afterComparison = summarizePeerDifferentiation(afterEntries);
  for (const entry of afterEntries) {
    const profile = entry.content.locationPilotTrainingPage.evidenceProfile;
    if (profile.eligibleForIndexabilityEvaluation !== (profile.level === 'STRONG')) {
      throw new Error(`${entry.record.slug}: evidence eligibility does not match its deterministic tier.`);
    }
    if (profile.level !== 'STRONG' && entry.finalState === 'INDEXABLE') {
      throw new Error(`${entry.record.slug}: a ${profile.level} evidence page was incorrectly marked indexable.`);
    }
    if (profile.level === 'STRONG'
      && profile.criteria.pilotTrainingEvidenceCount < 1) {
      throw new Error(`${entry.record.slug}: medical or generic aviation evidence incorrectly qualified as STRONG pilot-training evidence.`);
    }
  }
  for (const [index, result] of afterComparison.results.entries()) {
    const original = afterEntries[index];
    if (original.finalState === 'INDEXABLE'
      && (result.assessment.status !== 'PASSED' || result.nearDuplicate || result.exactDuplicate)) {
      result.finalState = 'NOINDEX';
    }
  }
  afterComparison.metrics.indexable = afterComparison.results
    .filter(({ finalState }) => finalState === 'INDEXABLE').length;
  afterComparison.metrics.noindex = TEST_COUNT - afterComparison.metrics.indexable;
  afterComparison.metrics.evidenceTierCounts = afterEntries.reduce((counts, entry) => {
    const tier = entry.content.locationPilotTrainingPage.evidenceProfile.level;
    counts[tier] = (counts[tier] || 0) + 1;
    return counts;
  }, { STRONG: 0, MEDIUM: 0, THIN: 0 });
  afterComparison.metrics.evidenceEligibleForIndexabilityEvaluation = afterEntries
    .filter(({ content }) => (
      content.locationPilotTrainingPage.evidenceProfile.eligibleForIndexabilityEvaluation
    )).length;
  afterComparison.metrics.qualityGateIndexable = afterEntries
    .filter(({ finalState }) => finalState === 'INDEXABLE').length;
  afterComparison.metrics.qualityGateNoindex = TEST_COUNT - afterComparison.metrics.qualityGateIndexable;
  const productionPairs = getApprovedLocationServicePairs();
  const productionPairResults = productionPairs.map(({ location, service }) => {
    const context = getLocationEngineContext(location);
    const resolver = resolveLocationService(location, service, context.locations);
    const model = buildLocationPageModel({
      location,
      service,
      ...context,
    });
    const route = `/${location.slug}/${service.slug}`;
    const unsupportedClaims = unsupportedRenderedClaims([
      ...(model.renderedPageText || []),
      model.renderedBody,
      model.metadata.title,
      model.metadata.description,
    ].filter(Boolean).join('\n'));
    return {
      route,
      resolverSupport: resolver.supportStatus,
      resolverIndexability: resolver.indexability,
      renderable: model.renderable,
      state: model.state,
      indexability: model.indexability,
      canonical: model.metadata.canonical,
      robots: model.metadata.robots,
      sitemapEligible: model.sitemapEligible,
      unsupportedClaims,
      consistent: resolver.canRender === model.renderable
        && resolver.supportStatus === 'SUPPORTED'
        && resolver.supportStatus === model.supportStatus
        && resolver.indexability === model.indexability
        && model.state === 'INDEXABLE'
        && model.metadata.indexability === 'INDEXABLE'
        && model.metadata.canonical === `https://weoneaviation.in${route}`
        && model.metadata.robots.startsWith('index, follow')
        && model.sitemapEligible
        && model.sitemapEligible === model.productionSitemapEligible
        && unsupportedClaims.length === 0,
    };
  });
  if (productionPairResults.some(({ consistent }) => !consistent)) {
    throw new Error('An approved production pair failed the support/indexability/canonical/robots/sitemap consistency audit.');
  }
  const historicScores = failed.map(({ differentiationScore }) => differentiationScore);
  const historicOrdered = [...historicScores].sort((left, right) => left - right);
  const historicNearDuplicates = failed.filter(({ nearDuplicate }) => nearDuplicate).length;
  const historicExactDuplicates = failed.filter(({ exactDuplicate }) => exactDuplicate).length;
  const afterByOrder = new Map(afterComparison.results.map((result) => [
    result.selectionOrder,
    result,
  ]));
  const examples = failed.slice(0, 10).map((row, index) => {
    const generated = afterEntries[index];
    return example(
      generated,
      {
        differentiationScore: row.differentiationScore,
        similarity: row.normalizedSimilarityPercent,
        fullPageSimilarity: row.fullPageNormalizedSimilarityPercent,
        exactDuplicate: row.exactDuplicate,
        nearDuplicate: row.nearDuplicate,
      },
      afterByOrder.get(row.selectionOrder),
    );
  });
  const evidenceRichLocations = await auditEvidenceRichLocations();
  const aviationCoverageReport = JSON.parse(fs.readFileSync(
    INDIA_AVIATION_COVERAGE_REPORT_PATH,
    'utf8',
  ));
  const newlyQualifiedLocations = evidenceRichLocations.filter((candidate) => (
    candidate.qualifiedIndexabilityCandidate
    && !PHASE_4E_QUALIFIED_LOCATIONS.has(
      `${candidate.countryCode}|${candidate.location.toLowerCase()}`,
    )
  ));
  const evidenceCandidateSimilarities = evidenceRichLocations
    .map(({ differentiation }) => differentiation.normalizedSimilarityPercent)
    .filter(Number.isFinite);
  const cohortTierOutcomes = afterComparison.results.map((result) => {
    const generated = afterEntries.find((entry) => (
      entry.selectionOrder === result.selectionOrder
    ));
    return {
      tier: generated.content.locationPilotTrainingPage.evidenceProfile.level,
      similarityPercent: result.fullPageSimilarity,
      finalState: result.finalState,
      exactDuplicate: result.exactDuplicate,
      nearDuplicate: result.nearDuplicate,
    };
  });
  const evidenceTierOutcomes = evidenceRichLocations.map((candidate) => ({
    tier: candidate.evidenceProfile.level,
    similarityPercent: candidate.differentiation.normalizedSimilarityPercent,
    finalState: candidate.indexabilityState,
    exactDuplicate: candidate.exactDuplicate,
    nearDuplicate: Number.isFinite(candidate.differentiation.normalizedSimilarityPercent)
      && candidate.differentiation.normalizedSimilarityPercent >= SIMILARITY_THRESHOLD,
  }));
  const strongExamples = evidenceRichLocations
    .filter(({ evidenceProfile }) => evidenceProfile.level === 'STRONG')
    .sort((left, right) => (
      right.evidenceProfile.score - left.evidenceProfile.score
      || left.location.localeCompare(right.location)
    ))
    .slice(0, 3)
    .map((candidate) => ({
      route: `/${candidate.slug}/${SERVICE.slug}`,
      location: candidate.location,
      evidenceTier: candidate.evidenceProfile.level,
      trainingEvidence: candidate.evidence
        .filter(({ type }) => PILOT_TRAINING_EVIDENCE_TYPES.has(type))
        .map(({ name, type, relationship, sourcePublisher, sourceDate }) => ({
          name,
          type,
          relationship,
          sourcePublisher,
          sourceDate,
        })),
      similarityPercent: candidate.differentiation.normalizedSimilarityPercent,
      qualityResult: candidate.qualityGatePassed ? 'PASS' : 'FAIL',
      finalIndexabilityState: candidate.indexabilityState,
      alreadyApproved: candidate.productionRouteApproved,
      unsupportedClaims: candidate.unsupportedClaims,
    }));
  const thinExamples = afterEntries
    .filter(({ content }) => content.locationPilotTrainingPage.evidenceProfile.level === 'THIN')
    .slice(0, 3)
    .map((entry) => {
      const result = afterComparison.results.find((item) => (
        item.selectionOrder === entry.selectionOrder
      ));
      return {
        route: `/${entry.record.slug}/${SERVICE.slug}`,
        location: entry.record.canonicalName || entry.record.name,
        evidenceTier: entry.content.locationPilotTrainingPage.evidenceProfile.level,
        similarityPercent: result.fullPageSimilarity,
        finalIndexabilityState: result.finalState,
        aviationEvidenceExplanation: entry.content.locationPilotTrainingPage.sections
          .find(({ category }) => category === 'LOCATION_AVIATION_EVIDENCE')
          ?.paragraphs.at(-1) || null,
      };
    });
  const phase4LCandidates = evidenceRichLocations
    .slice(0, PHASE_4L_CANDIDATE_LIMIT);
  const phase4LStrong = phase4LCandidates.filter((candidate) => (
    candidate.evidenceProfile.level === 'STRONG'
  ));
  const phase4LReport = {
    schemaVersion: 1,
    phase: '4L',
    generatedAt: new Date().toISOString(),
    scope: {
      requestedCandidateLimit: PHASE_4L_CANDIDATE_LIMIT,
      availableSourceBackedCandidateLocations: evidenceRichLocations.length,
      evaluatedCandidates: phase4LCandidates.length,
      unfilledCandidateSlots: Math.max(
        0,
        PHASE_4L_CANDIDATE_LIMIT - phase4LCandidates.length,
      ),
      selection: 'All distinct locations resolvable from the current verified aviation evidence registries, ordered by evidence score, verified record count, then location name. Unmatched or ambiguous source rows are excluded from the location candidate count and reported separately by the ingestion coverage report.',
      sourceInventory: {
        baseEvidenceRecords: AVIATION_EVIDENCE_RECORDS.length,
        indiaNormalizedEvidenceRecords: INDIA_AVIATION_EVIDENCE_RECORDS.length,
        evidenceRegistryCandidateLocations: evidenceRichLocations.length,
      },
    },
    policy: {
      similarityThresholdPercent: SIMILARITY_THRESHOLD,
      approvalAuthorityChanged: false,
      STRONG: 'Eligible to proceed through existing content quality, differentiation, and explicit production approval gates; not indexable by tier alone.',
      MEDIUM: 'Renderable and NOINDEX unless existing gates pass; no automatic route promotion.',
      THIN: 'Renderable and NOINDEX; geographic, regulatory and evidence-gap context only.',
      airportGazetteerAloneQualifiesStrong: false,
      medicalEvidenceAloneQualifiesStrong: false,
    },
    evidenceExpansion: {
      netNewSourceBackedRecordsThisPhase: 0,
      note: 'All resolvable source rows in the current DGCA and aviation-evidence registries had already been ingested. This audit does not count regeneration or added sourceTitle metadata as new evidence.',
      normalizedDgcaRecordsWithExplicitSourceTitle: INDIA_AVIATION_EVIDENCE_RECORDS
        .filter(({ sourceTitle }) => Boolean(sourceTitle)).length,
      candidateEvidenceRecordsMissingExplicitSourceTitle: phase4LCandidates.reduce(
        (total, candidate) => total + candidate.evidence.filter(
          ({ sourceTitle, verificationStatus }) => (
            verificationStatus === 'primary-source-listed' && !sourceTitle
          ),
        ).length,
        0,
      ),
    },
    phase4MSourceReview: {
      status: 'VERIFIED_CURRENT_AT_AUDIT',
      sourceTitle: DGCA_FTO_ROSTER_SOURCE.title,
      sourcePublisher: DGCA_FTO_ROSTER_SOURCE.publisher,
      sourceUrl: DGCA_FTO_ROSTER_SOURCE.url,
      sourceDate: DGCA_FTO_ROSTER_SOURCE.sourceDate,
      sourceDateBasis: DGCA_FTO_ROSTER_SOURCE.sourceDateBasis,
      pdfCreatedAt: DGCA_FTO_ROSTER_SOURCE.pdfCreatedAt,
      objectLastModifiedAt: DGCA_FTO_ROSTER_SOURCE.objectLastModifiedAt,
      verificationDate: DGCA_FTO_ROSTER_VERIFIED_AT,
      verification: 'Official DGCA S3 object returned HTTP 200 on the verification date; the document heading and embedded PDF creation timestamp agree on the roster date.',
      scopeNote: 'Current as of the stated roster date; does not establish current operations, admissions, or course availability for every listed organization.',
    },
    summary: {
      tierCounts: phase4LCandidates.reduce((counts, { evidenceProfile }) => {
        counts[evidenceProfile.level] += 1;
        return counts;
      }, { STRONG: 0, MEDIUM: 0, THIN: 0 }),
      newlyQualifiedStrongLocations: phase4LStrong
        .filter(({ locationId }) => !PHASE_4K_STRONG_LOCATION_IDS.has(locationId))
        .map(({ location, locationId, slug }) => ({ location, locationId, slug })),
      existingApprovedStrongLocations: phase4LStrong
        .filter(({ productionRouteApproved, indexabilityState }) => (
          productionRouteApproved && indexabilityState === 'INDEXABLE'
        ))
        .map(({ location, locationId, slug }) => ({ location, locationId, slug })),
      indexableCount: phase4LCandidates.filter(
        ({ indexabilityState }) => indexabilityState === 'INDEXABLE',
      ).length,
      noindexCount: phase4LCandidates.filter(
        ({ indexabilityState }) => indexabilityState !== 'INDEXABLE',
      ).length,
      exactDuplicatesAmongIndexable: phase4LCandidates.filter(
        ({ indexabilityState, exactDuplicate }) => (
          indexabilityState === 'INDEXABLE' && exactDuplicate
        ),
      ).length,
      resolverOrIdentityConflicts: phase4LCandidates.filter(({
        geographicIdentityValid,
        hierarchyValid,
        regulator,
      }) => !geographicIdentityValid || !hierarchyValid || regulator?.valid !== true).length,
      unsupportedClaims: phase4LCandidates.reduce(
        (total, candidate) => total + candidate.unsupportedClaims.length,
        0,
      ),
    },
    candidates: phase4LCandidates,
  };
  fs.writeFileSync(PHASE_4L_REPORT_PATH, `${JSON.stringify(phase4LReport, null, 2)}\n`);
  const report = {
    schemaVersion: 1,
    batch: 1,
    test: 'phase-4a-fixed-100-failed-near-duplicate-locations',
    generatedAt: new Date().toISOString(),
    sample: {
      count: TEST_COUNT,
      source: path.relative(ROOT, BATCH_REPORT_PATH),
      selection: 'First 100 Batch 1 records with status NOINDEX and a same-country/geographic-level near-duplicate match, in batch order.',
      countryCounts: failed.reduce((counts, { countryCode }) => {
        counts[countryCode] = (counts[countryCode] || 0) + 1;
        return counts;
      }, {}),
      geographicLevelCounts: failed.reduce((counts, { geographicLevel }) => {
        counts[geographicLevel] = (counts[geographicLevel] || 0) + 1;
        return counts;
      }, {}),
      locationsWithNearbyAirportRecords: afterEntries.filter(({
        matrix: { nearbyAirportRecords },
      }) => nearbyAirportRecords.length > 0).length,
      locationsWithTimeZone: afterEntries.filter(({ matrix }) => Boolean(matrix.timeZone)).length,
      locationsWithRegistryIdentifiers: afterEntries.filter(({ matrix }) => (
        matrix.identityDetails.length > 0
      )).length,
      evidenceCoverage: {
        locationsWithCoordinates: afterEntries.filter(({ record }) => (
          Number.isFinite(record.latitude) && Number.isFinite(record.longitude)
        )).length,
        locationsWithTimeZone: afterEntries.filter(({ record }) => Boolean(record.timezone)).length,
        locationsWithPopulation: afterEntries.filter(({ record }) => (
          Number.isFinite(record.population) && record.population > 0
        )).length,
        locationsWithRegistryIdentifiers: afterEntries.filter(({ matrix }) => matrix.identityDetails.length > 0).length,
        locationsWithNearbyAirportRecords: afterEntries.filter(({ matrix }) => matrix.nearbyAirportRecords.length > 0).length,
      },
    },
    comparisonMethod: {
      before: 'Batch 1 recorded 20 stratified peer comparisons per generated page; the fixed test also reconstructs its former composition and recomputes before/after scores against the same tested peer groups.',
      after: 'Each tested page is compared to every other generated page in the same country and geographic-level group. The visible text array is shared by the registry JSX renderer and evaluator; the unchanged 80% token-Jaccard threshold is applied to that complete page-specific visible text, with no place-name normalization.',
      exactDuplicate: 'At least one same-group comparison has the same fingerprint after location names are normalized.',
      nearDuplicate: `A page is near-duplicate when its maximum same-group normalized similarity is at least ${SIMILARITY_THRESHOLD}%.`,
      indexability: 'Existing current page engine result, with any same-test differentiation failure, near-duplicate or exact-duplicate candidate forced to NOINDEX; thresholds are unchanged.',
    },
    evidenceTierPolicy: {
      STRONG: 'May proceed to current quality, differentiation, explicit production-approval and sitemap gates; evidence tier alone never makes a route indexable.',
      MEDIUM: 'Renderable and supported where existing service policy allows; always NOINDEX and excluded from the sitemap.',
      THIN: 'Renderable with factual geography, regulator guidance and evidence limitations only; always NOINDEX and excluded from the sitemap.',
    },
    diagnosis: {
      causes: [
        'The fixed cohort has mostly THIN evidence profiles, so many pages share the same country regulator, no-evidence status and cautious applicant guidance.',
        'Location hierarchy differs primarily by genuine place names and record type; where same-type records have no distinct sourced aviation facts, the available content cannot support deeper differences.',
        'The existing normalized exact-duplicate metric intentionally removes hierarchy place names, so it exposes pages whose non-name evidence and guidance are identical.',
      ],
      blocksPreviouslyReused: [
        'pilot_training_overview',
        'CPL_pathway',
        'ground_school',
        'medical_requirements',
        'DGCA_exams',
        'FTO_stage',
        'We_One_Aviation_services',
      ],
      masterContentChanged: false,
    },
    beforeBatch1: {
      averageDifferentiation: Number((historicScores.reduce((sum, score) => sum + score, 0) / TEST_COUNT).toFixed(2)),
      medianDifferentiation: Number((
        (historicOrdered[49] + historicOrdered[50]) / 2
      ).toFixed(2)),
      minimumDifferentiation: historicOrdered[0],
      maximumDifferentiation: historicOrdered.at(-1),
      exactDuplicates: historicExactDuplicates,
      nearDuplicatePercentage: Number((historicNearDuplicates / TEST_COUNT * 100).toFixed(2)),
      indexable: failed.filter(({ status }) => status === 'INDEXABLE').length,
      noindex: failed.filter(({ status }) => status !== 'INDEXABLE').length,
      averageDifferentiationFromSame100LegacyRecomposition: beforeComparison.metrics.averageDifferentiation,
      medianDifferentiationFromSame100LegacyRecomposition: beforeComparison.metrics.medianDifferentiation,
      minimumFromSame100LegacyRecomposition: beforeComparison.metrics.minimumDifferentiation,
      maximumFromSame100LegacyRecomposition: beforeComparison.metrics.maximumDifferentiation,
      nearDuplicatePercentageFromSame100LegacyRecomposition: beforeComparison.metrics.nearDuplicatePercentage,
      averageFullPageSimilarityFromLegacyRecomposition: beforeComparison.metrics.averageFullPageSimilarity,
      minimumFullPageSimilarityFromLegacyRecomposition: beforeComparison.metrics.minimumFullPageSimilarity,
      maximumFullPageSimilarityFromLegacyRecomposition: beforeComparison.metrics.maximumFullPageSimilarity,
      fullPageNearDuplicatePercentageFromLegacyRecomposition: beforeComparison.metrics.fullPageNearDuplicatePercentage,
      averageSectionCountFromLegacyRecomposition: beforeComparison.metrics.averageSectionCount,
      averageUniqueSectionsFromLegacyRecomposition: beforeComparison.metrics.averageUniqueSections,
      averageUniqueFaqsFromLegacyRecomposition: beforeComparison.metrics.averageUniqueFaqs,
      averageVisibleWordCountFromLegacyRecomposition: beforeComparison.metrics.averageVisibleWordCount,
    },
    after: afterComparison.metrics,
    similarityByEvidenceTier: {
      fixed100LocationCohort: summarizeTierOutcomes(cohortTierOutcomes),
      evidenceRegistryAudit: summarizeTierOutcomes(evidenceTierOutcomes),
    },
    tierExamples: {
      strong: strongExamples,
      thin: thinExamples,
    },
    sectionSimilarityAnalysis: summarizeSectionSimilarity(afterEntries),
    normalizedExactDuplicateExamples: afterComparison.results
      .filter(({ exactDuplicate }) => exactDuplicate)
      .map(({ record, matrix, content, finalState }) => ({
        route: `/${record.slug}/${SERVICE.slug}`,
        location: record.canonicalName || record.name,
        geographicType: record.type,
        hasCoordinates: Number.isFinite(record.latitude) && Number.isFinite(record.longitude),
        nearbyAirportRecordCount: matrix.nearbyAirportRecords.length,
        directAviationEvidenceCount: content.locationPilotTrainingPage.evidenceProfile
          .criteria.primarySourceDirectAviationFactCount,
        evidenceTier: content.locationPilotTrainingPage.evidenceProfile.level,
        finalState,
      })),
    improvement: {
      fullPageSimilarityReductionPercentagePoints: Number((
        beforeComparison.metrics.averageFullPageSimilarity
        - afterComparison.metrics.averageFullPageSimilarity
      ).toFixed(2)),
      averageUniqueFaqs: {
        before: beforeComparison.metrics.averageUniqueFaqs,
        after: afterComparison.metrics.averageUniqueFaqs,
      },
      averageUniqueSections: {
        before: beforeComparison.metrics.averageUniqueSections,
        after: afterComparison.metrics.averageUniqueSections,
      },
      averageVisibleWordCount: {
        before: beforeComparison.metrics.averageVisibleWordCount,
        after: afterComparison.metrics.averageVisibleWordCount,
      },
      interpretation: 'The current page model uses the same visible-text array for JSX rendering and full-page evaluation. The legacy body is reconstructed from the old content engine because the previous JSX renderer is no longer active; treat before/after similarity as a controlled content-model comparison, not archived browser-rendered HTML.',
    },
    indexabilityGate: {
      similarityThresholdPercent: SIMILARITY_THRESHOLD,
      thresholdChanged: false,
      usesCompleteRenderedPageText: true,
      requiresStrongEvidenceProfile: true,
      requiresExistingApprovedGeographicRoute: true,
    },
    evidencePolicy: {
      scoreMaximum: 100,
      tiers: {
        STRONG: 'Score >= 70 and requires a verified regulator, sourced hierarchy, at least one primary-source listed pilot-training organization record, a linked FAQ about that training evidence, at least two non-medical evidence records, two non-medical evidence types and two source URLs.',
        MEDIUM: 'Score >= 35 with some primary-source aviation context; renderable, normally NOINDEX pending quality and differentiation. Airports and medical records alone do not establish local pilot training.',
        THIN: 'Lower score or only geography/regulator/generic pathway/unverified gazetteer references; renderable but NOINDEX.',
      },
      medicalEvidenceCanQualifyStrong: false,
      gazetteerPointsCountAsVerifiedFacilities: false,
    },
    productionPairs: {
      approvedCount: productionPairResults.length,
      indexableCount: productionPairResults.filter(({ indexability }) => indexability === 'INDEXABLE').length,
      noindexCount: productionPairResults.filter(({ indexability }) => indexability !== 'INDEXABLE').length,
      consistentCount: productionPairResults.filter(({ consistent }) => consistent).length,
      unsupportedClaimCount: productionPairResults.reduce(
        (count, pair) => count + pair.unsupportedClaims.length,
        0,
      ),
      results: productionPairResults,
    },
    evidenceRichLocations: {
      evidenceRegistryLocationCount: new Set(AVIATION_EVIDENCE_RECORDS
        .filter(({ type }) => type !== 'aviation-authority')
        .map(({ locationId }) => locationId)).size,
      indiaEvidenceRecordCount: AVIATION_EVIDENCE_RECORDS
        .filter(({ countryCode, type }) => countryCode === 'IN' && type !== 'aviation-authority').length
        + INDIA_AVIATION_EVIDENCE_RECORDS.length,
      indiaEvidenceLocationCount: new Set(evidenceRichLocations
        .filter(({ countryCode }) => countryCode === 'IN')
        .map(({ locationId }) => locationId)).size,
      newlyEvidenceBackedLocationCount: aviationCoverageReport.coverage.after
        .newlyEvidenceBackedLocations,
      locationsUsingAddedEvidenceCount: evidenceRichLocations.filter(
        ({ usesPhase4FAddedEvidence }) => usesPhase4FAddedEvidence,
      ).length,
      indiaPilotTrainingEvidenceLocationCount: evidenceRichLocations.filter(({
        countryCode,
        evidenceProfile,
      }) => countryCode === 'IN' && evidenceProfile.criteria.pilotTrainingEvidenceCount > 0).length,
      candidateCount: evidenceRichLocations.filter(
        ({ qualifiedIndexabilityCandidate }) => qualifiedIndexabilityCandidate,
      ).length,
      phase4EQualifiedBaseline: PHASE_4E_QUALIFIED_LOCATIONS.size,
      phase4EBaselineQualifiedNames: [...PHASE_4E_QUALIFIED_LOCATIONS]
        .map((key) => key.split('|')[1])
        .sort(),
      newlyQualifiedLocationCount: newlyQualifiedLocations.length,
      newlyQualifiedButNotApprovedCount: newlyQualifiedLocations.filter(
        ({ productionRouteApproved }) => !productionRouteApproved,
      ).length,
      averageSimilarityPercent: Number((
        evidenceCandidateSimilarities.reduce((sum, value) => sum + value, 0)
        / evidenceCandidateSimilarities.length
      ).toFixed(2)),
      minimumSimilarityPercent: Number(Math.min(...evidenceCandidateSimilarities).toFixed(1)),
      maximumSimilarityPercent: Number(Math.max(...evidenceCandidateSimilarities).toFixed(1)),
      exactDuplicateCount: evidenceRichLocations.filter(
        ({ exactDuplicate }) => exactDuplicate,
      ).length,
      indexableExactDuplicateCount: evidenceRichLocations.filter(
        ({ indexabilityState, exactDuplicate }) => (
          indexabilityState === 'INDEXABLE' && exactDuplicate
        ),
      ).length,
      alreadyApprovedCandidateCount: evidenceRichLocations.filter(
        ({ qualifiedIndexabilityCandidate, productionRouteApproved }) => (
          qualifiedIndexabilityCandidate && productionRouteApproved
        ),
      ).length,
      pendingApprovalCandidateCount: evidenceRichLocations.filter(
        ({ qualifiedIndexabilityCandidate, productionRouteApproved }) => (
          qualifiedIndexabilityCandidate && !productionRouteApproved
        ),
      ).length,
      tierCounts: evidenceRichLocations.reduce((counts, { evidenceProfile }) => {
        counts[evidenceProfile.level] += 1;
        return counts;
      }, { STRONG: 0, MEDIUM: 0, THIN: 0 }),
      indiaTierCounts: evidenceRichLocations
        .filter(({ countryCode }) => countryCode === 'IN')
        .reduce((counts, { evidenceProfile }) => {
          counts[evidenceProfile.level] += 1;
          return counts;
        }, { STRONG: 0, MEDIUM: 0, THIN: 0 }),
      passed80PercentGateCount: evidenceRichLocations.filter(
        ({ differentiation }) => differentiation.passed80PercentGate,
      ).length,
      indexableCount: evidenceRichLocations.filter(
        ({ indexabilityState }) => indexabilityState === 'INDEXABLE',
      ).length,
      top50PilotTrainingEvidenceLocations: evidenceRichLocations
        .filter(({ countryCode, evidenceProfile }) => (
          countryCode === 'IN'
          && evidenceProfile.criteria.pilotTrainingEvidenceCount > 0
        ))
        .sort((left, right) => (
          right.evidenceProfile.criteria.pilotTrainingEvidenceScore
            - left.evidenceProfile.criteria.pilotTrainingEvidenceScore
          || right.evidenceProfile.score - left.evidenceProfile.score
          || left.location.localeCompare(right.location)
        ))
        .slice(0, 50)
        .map((candidate, index) => ({
          rank: index + 1,
          evidenceScore: candidate.evidenceProfile.score,
          evidenceTier: candidate.evidenceProfile.level,
          pilotTrainingEvidenceScore: candidate.evidenceProfile.criteria.pilotTrainingEvidenceScore,
          qualityResult: candidate.qualityGatePassed ? 'PASS' : 'FAIL',
          differentiationScore: candidate.differentiation.differentiationScore,
          finalIndexabilityState: candidate.indexabilityState,
          alreadyApproved: candidate.productionRouteApproved,
          ...candidate,
        })),
      top50NewlyQualifiedLocations: newlyQualifiedLocations
        .slice(0, 50)
        .map((candidate, index) => ({ rank: index + 1, ...candidate })),
      locationsUsingAddedEvidence: evidenceRichLocations.filter(
        ({ usesPhase4FAddedEvidence }) => usesPhase4FAddedEvidence,
      ),
    },
    phase4LAudit: {
      reportPath: path.relative(ROOT, PHASE_4L_REPORT_PATH),
      evaluatedCandidateCount: phase4LReport.scope.evaluatedCandidates,
      candidateLimit: PHASE_4L_CANDIDATE_LIMIT,
      unfilledCandidateSlots: phase4LReport.scope.unfilledCandidateSlots,
      tierCounts: phase4LReport.summary.tierCounts,
      newlyQualifiedStrongLocations: phase4LReport.summary.newlyQualifiedStrongLocations,
      existingApprovedStrongLocations: phase4LReport.summary.existingApprovedStrongLocations,
      indexableCount: phase4LReport.summary.indexableCount,
      noindexCount: phase4LReport.summary.noindexCount,
      exactDuplicatesAmongIndexable: phase4LReport.summary.exactDuplicatesAmongIndexable,
      resolverOrIdentityConflicts: phase4LReport.summary.resolverOrIdentityConflicts,
      unsupportedClaims: phase4LReport.summary.unsupportedClaims,
    },
    unsupportedClaims: {
      count: afterEntries.reduce((sum, { content }) => (
        sum + unsupportedRenderedClaims(content.locationPilotTrainingPage.visibleText.join('\n')).length
      ), 0),
      checks: [
        'Unsupported local We One premises/operations',
        'Guaranteed jobs, licensing, rankings or placements',
        'Airport-classified point represented as a school/FTO/training base',
        'Unsupported local partnership',
        'Invented local reviews',
      ],
      scope: 'Pattern checks on the generated visible page copy; the separate repository claims gate was run independently.',
    },
    examples,
    all100After: afterComparison.results.map((result) => {
      const generated = afterEntries.find((entry) => entry.selectionOrder === result.selectionOrder);
      return {
        selectionOrder: result.selectionOrder,
        route: `/${generated.record.slug}/${SERVICE.slug}`,
        status: result.finalState,
        differentiationScore: Number(result.differentiationScore.toFixed(1)),
        differentiationStatus: result.assessment.status,
        differentiationReasons: result.assessment.reasons,
        normalizedSimilarityPercent: result.similarity,
        fullPageNormalizedSimilarityPercent: result.fullPageSimilarity,
        exactDuplicate: result.exactDuplicate,
        nearDuplicate: result.nearDuplicate,
        sectionCount: generated.sectionCount,
        uniqueSectionCount: result.uniqueSectionCount,
        uniqueFaqCount: result.uniqueFaqCount,
        visibleWordCount: generated.visibleWordCount,
        matrix: generated.matrix,
      };
    }),
  };
  const reportPath = path.resolve(
    process.env.PILOT_TRAINING_DIFFERENTIATION_TEST_REPORT || DEFAULT_REPORT_PATH,
  );
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    reportPath: path.relative(ROOT, reportPath),
    before: report.beforeBatch1,
    after: report.after,
    improvement: report.improvement,
    examples: report.examples.map(({ route, before, after }) => ({
      route,
      beforeDifferentiation: before.differentiationScore,
      afterDifferentiation: after.differentiationScore,
      afterState: after.indexabilityState,
    })),
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
