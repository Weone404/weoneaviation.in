import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/aviation-evidence.js';
import {
  DGCA_FTO_ROSTER_BASES,
  DGCA_FTO_ROSTER_SOURCE,
  DGCA_FTO_ROSTER_VERIFIED_AT,
} from '../data/location-seo/dgca-fto-roster.js';
import { INDIA_AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/india-aviation-evidence.generated.js';
import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';
import { SERVICES } from '../data/location-seo/services.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import { isApprovedGeographicRoute, isGeographicPageQualityEligible } from '../lib/locationIndexabilityPolicy.js';
import { buildIndiaLocationServiceContent } from '../lib/indiaLocationContentEngine.js';
import { resolveIndiaGeographicRoute } from '../lib/indiaGeographicRegistry.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEOGRAPHY_DIRECTORY = path.join(ROOT, 'data', 'location-seo', 'geography');
const PRIOR_REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-evidence-phase-4l-audit.json',
);
const COVERAGE_REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'india-aviation-evidence-coverage-report.json',
);
const REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-evidence-phase-4n-audit.json',
);
const TRAINING_TYPES = new Set([
  'flight-school',
  'flying-club',
  'aviation-college',
  'aviation-academy',
  'pilot-training-organization',
  'airline-training-organization',
]);
const SERVICE = SERVICES.find(({ slug }) => slug === 'pilot-training');
const SIMILARITY_THRESHOLD = GEOGRAPHIC_INDEXABILITY_POLICY
  .contentDifferentiation.maxNormalizedSimilarityPercent;

function normalized(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function identityKey(location) {
  return [
    location.countryCode,
    normalized(location.state),
    normalized(location.canonicalName || location.name || location.location),
  ].join('|');
}

function unsupportedClaims(text) {
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

function validateHierarchy(location, hierarchy) {
  return Array.isArray(hierarchy)
    && hierarchy.length > 1
    && hierarchy.at(-1)?.id === location.id
    && hierarchy.at(-1)?.countryCode === 'IN'
    && hierarchy.some(({ type }) => type === 'country')
    && hierarchy.some(({ type }) => type === 'state')
    && hierarchy.every(({ countryCode }) => countryCode === 'IN');
}

async function evaluate(record, evidence, priorCandidate) {
  const resolved = await resolveIndiaGeographicRoute(record.geographySlug);
  const location = resolved.location;
  const sourceIdMatchesResolvedId = location?.id === record.locationId;
  const hierarchyValid = location ? validateHierarchy(location, resolved.hierarchy) : false;
  const regulator = Object.values(AVIATION_REGULATORY_CONTEXTS)
    .find(({ countryCode }) => countryCode === 'IN');
  if (!location || !sourceIdMatchesResolvedId || !hierarchyValid || !regulator) {
    throw new Error(`Candidate ${record.locationId} failed exact location, hierarchy, or regulator validation.`);
  }

  const generated = buildIndiaLocationServiceContent({
    record: location,
    hierarchy: resolved.hierarchy,
    service: SERVICE,
    routeSlug: record.geographySlug,
  });
  const pageModel = buildLocationPageModel({
    location: generated.location,
    service: SERVICE,
    content: generated.content,
    siteOrigin: 'https://weoneaviation.in',
    locations: resolved.hierarchy,
    geographicDataValidated: true,
  });
  const page = generated.content.locationPilotTrainingPage;
  const profile = page.evidenceProfile;
  const differentiation = generated.content.quality?.differentiation
    || generated.content.differentiation
    || pageModel.contentDifferentiation;
  const similarity = differentiation?.metrics?.normalizedSimilarityPercent
    ?? differentiation?.normalizedSimilarityPercent
    ?? null;
  const qualityPassed = isGeographicPageQualityEligible({
    location: generated.location,
    service: SERVICE,
    content: generated.content,
    quality: generated.content.quality,
  });
  const differentiationPassed = differentiation?.status === 'PASSED'
    && Number.isFinite(similarity)
    && similarity < SIMILARITY_THRESHOLD;
  const claims = unsupportedClaims([
    ...(pageModel.renderedPageText || []),
    pageModel.renderedBody,
    pageModel.metadata.title,
    pageModel.metadata.description,
    ...(page?.visibleText || []),
  ].filter(Boolean).join('\n'));
  const productionApproved = isApprovedGeographicRoute(generated.content.canonicalPath);
  const qualified = profile?.level === 'STRONG'
    && profile.eligibleForIndexabilityEvaluation
    && qualityPassed
    && differentiationPassed
    && claims.length === 0;

  return {
    location: location.canonicalName || location.name,
    locationId: location.id,
    route: `/${record.geographySlug}/${SERVICE.slug}`,
    country: location.country,
    countryCode: location.countryCode,
    state: location.state || resolved.hierarchy.findLast(({ type }) => type === 'state')?.name || null,
    geographicType: location.type,
    hierarchy: resolved.hierarchy.map(({ id, name, type }) => ({ id, name, type })),
    geographicIdentityValid: sourceIdMatchesResolvedId,
    hierarchyValid,
    regulator: {
      country: regulator.country,
      authority: regulator.authority,
      source: regulator.source,
    },
    evidenceTier: profile?.level || 'THIN',
    evidenceScore: profile?.score ?? null,
    qualityGatePassed: qualityPassed,
    qualityScore: pageModel.composedQuality?.score ?? null,
    differentiationPassed,
    similarityPercent: similarity,
    similarityThresholdPercent: SIMILARITY_THRESHOLD,
    directTrainingEvidenceCount: evidence.filter((item) => (
      item.geographicRelationship === 'located-within'
    )).length,
    regionalTrainingEvidenceCount: evidence.filter((item) => (
      item.geographicRelationship === 'regional-context'
    )).length,
    evidence: evidence.map((item) => ({
      id: item.id,
      name: item.name,
      type: item.type,
      relationship: item.geographicRelationship,
      geographicRecordId: item.locationId,
      sourcePublisher: item.sourcePublisher,
      sourceTitle: item.sourceTitle,
      sourceUrl: item.sourceUrl,
      sourceDate: item.sourceDate,
      sourceDateBasis: item.sourceDateBasis,
      verificationDate: item.verificationDate || item.verifiedAt,
      verificationStatus: item.verificationStatus,
      fact: item.fact,
      attributionNote: item.attributionNote,
    })),
    unsupportedClaims: claims,
    qualityQualified: qualified,
    productionApproved,
    indexabilityState: qualified && productionApproved ? 'INDEXABLE' : 'NOINDEX',
    sitemapEligible: qualified && productionApproved,
    priorCandidateRecordId: priorCandidate?.locationId || null,
    potentialDuplicateIdentity: Boolean(priorCandidate
      && priorCandidate.locationId !== location.id),
    duplicateIdentityNote: priorCandidate && priorCandidate.locationId !== location.id
      ? 'Country, state, and normalized place name match a prior audited record, but record IDs differ. Kept separate; no identity merge or approval inferred.'
      : null,
    priorCandidateState: priorCandidate?.indexabilityState || null,
    priorCandidateTier: priorCandidate?.evidenceProfile?.level || null,
  };
}

async function main() {
  if (!SERVICE) throw new Error('Pilot-training service is not configured.');
  const priorReport = JSON.parse(fs.readFileSync(PRIOR_REPORT_PATH, 'utf8'));
  const coverage = JSON.parse(fs.readFileSync(COVERAGE_REPORT_PATH, 'utf8'));
  const priorByIdentity = new Map(priorReport.candidates
    .filter(({ countryCode }) => countryCode === 'IN')
    .map((candidate) => [identityKey(candidate), candidate]));
  const priorIds = new Set(priorReport.candidates.map(({ locationId }) => locationId));
  const baseIndiaEvidence = AVIATION_EVIDENCE_RECORDS.filter((item) => (
    item.countryCode === 'IN' && item.type !== 'aviation-authority'
  ));
  const baseIndiaEvidenceLocationIds = [...new Set(baseIndiaEvidence
    .map(({ locationId }) => locationId))];
  const grouped = new Map();
  for (const item of INDIA_AVIATION_EVIDENCE_RECORDS.filter(({ type }) => (
    TRAINING_TYPES.has(type)
  ))) {
    if (!grouped.has(item.locationId)) grouped.set(item.locationId, []);
    grouped.get(item.locationId).push(item);
  }

  const candidates = [];
  const invalidSourceMappings = [];
  for (const [locationId, evidence] of grouped) {
    if (priorIds.has(locationId)) continue;
    const record = evidence[0];
    const sourceCandidate = {
      countryCode: record.countryCode,
      country: record.country,
      state: record.geographicState,
      canonicalName: record.geographicName,
      name: record.geographicName,
    };
    const priorCandidate = priorByIdentity.get(identityKey(sourceCandidate)) || null;
    const result = await evaluate(record, evidence, priorCandidate);
    candidates.push(result);
    if (!result.geographicIdentityValid || !result.hierarchyValid) {
      invalidSourceMappings.push(result.route);
    }
  }

  const medicalOnlyUnseenIds = [...new Set(INDIA_AVIATION_EVIDENCE_RECORDS
    .filter(({ locationId, type }) => !priorIds.has(locationId) && type === 'medical-centre')
    .map(({ locationId }) => locationId))]
    .filter((locationId) => !grouped.has(locationId))
    .map((locationId) => {
      const evidence = INDIA_AVIATION_EVIDENCE_RECORDS.find((item) => (
        item.locationId === locationId
      ));
      return {
        locationId,
        location: evidence.geographicName,
        state: evidence.geographicState,
        evidenceType: 'medical-centre',
        status: 'EXCLUDED_MEDICAL_SUPPORT_ONLY',
        reason: 'Medical evidence alone is not eligible to establish a new pilot-training candidate.',
      };
    });
  const ftoUnresolved = [
    ...coverage.ingestion.ambiguousEvidence.map((item) => ({ ...item, mappingStatus: 'AMBIGUOUS' })),
    ...coverage.ingestion.unmatchedEvidence.map((item) => ({ ...item, mappingStatus: 'UNMATCHED' })),
    ...coverage.ingestion.duplicateEvidence.map((item) => ({ ...item, mappingStatus: 'DUPLICATE' })),
  ].filter(({ evidenceId }) => evidenceId.includes(':fto:'));
  const duplicateIdentityCandidates = candidates.filter(({ potentialDuplicateIdentity }) => (
    potentialDuplicateIdentity
  ));
  const tierCounts = candidates.reduce((counts, candidate) => {
    counts[candidate.evidenceTier] = (counts[candidate.evidenceTier] || 0) + 1;
    return counts;
  }, { STRONG: 0, MEDIUM: 0, THIN: 0 });
  const eligibleCandidates = candidates.filter(({ qualityQualified }) => qualityQualified);
  const report = {
    schemaVersion: 1,
    phase: '4N',
    generatedAt: new Date().toISOString(),
    scope: {
      requestedNewCandidateLimit: 100,
      totalNewCandidatesEvaluated: candidates.length,
      sourceBackedTrainingLocationsDiscovered: grouped.size,
      sourceBackedTrainingLocationsPreviouslyAudited: grouped.size - candidates.length,
      priorAuditCandidateCount: priorReport.candidates.length,
      selection: 'Exact India registry IDs with verified pilot-training evidence, excluding IDs already in the Phase 4L audit. Alternate record IDs are evaluated separately and are never merged by name alone.',
      sourceInventory: {
        dgcaFtoRosterOrganizations: DGCA_FTO_ROSTER_BASES.length,
        dgcaFtoRosterBaseRows: DGCA_FTO_ROSTER_BASES.reduce(
          (total, organization) => total + organization.bases.length,
          0,
        ),
        normalizedIndiaEvidenceRecords: INDIA_AVIATION_EVIDENCE_RECORDS.length,
        distinctNormalizedTrainingLocationIds: grouped.size,
        baseIndiaAviationEvidenceRecords: baseIndiaEvidence.length,
        baseIndiaEvidenceLocationIds: baseIndiaEvidenceLocationIds.length,
        baseEvidenceLocationIdsNotInPriorAudit: baseIndiaEvidenceLocationIds
          .filter((locationId) => !priorIds.has(locationId)).length,
      },
    },
    source: {
      publisher: DGCA_FTO_ROSTER_SOURCE.publisher,
      title: DGCA_FTO_ROSTER_SOURCE.title,
      sourceUrl: DGCA_FTO_ROSTER_SOURCE.url,
      sourceDate: DGCA_FTO_ROSTER_SOURCE.sourceDate,
      sourceDateBasis: DGCA_FTO_ROSTER_SOURCE.sourceDateBasis,
      pdfCreatedAt: DGCA_FTO_ROSTER_SOURCE.pdfCreatedAt,
      objectLastModifiedAt: DGCA_FTO_ROSTER_SOURCE.objectLastModifiedAt,
      verificationDate: DGCA_FTO_ROSTER_VERIFIED_AT,
      status: 'VERIFIED_CURRENT_AS_OF_SOURCE_DATE',
      scopeNote: 'The roster supports source-listed organization/base relationships as of its stated date. It does not establish ongoing operations, admissions, or current course availability.',
    },
    policy: {
      similarityThresholdPercent: SIMILARITY_THRESHOLD,
      productionApprovalChanged: false,
      sitemapChanged: false,
      tierAloneGrantsIndexability: false,
      medicalEvidenceAloneQualifiesStrong: false,
    },
    summary: {
      totalCandidates: candidates.length,
      newlyDiscoveredByExactRecordId: candidates.length,
      genuinelyNewPlaceNamesComparedWithPhase4L: candidates.filter(
        ({ potentialDuplicateIdentity }) => !potentialDuplicateIdentity,
      ).length,
      potentialDuplicateIdentityCandidates: duplicateIdentityCandidates.length,
      tierCounts,
      indexabilityCounts: {
        INDEXABLE: candidates.filter(({ indexabilityState }) => indexabilityState === 'INDEXABLE').length,
        NOINDEX: candidates.filter(({ indexabilityState }) => indexabilityState !== 'INDEXABLE').length,
      },
      qualityQualifiedButNotApproved: eligibleCandidates.filter(({ productionApproved }) => !productionApproved)
        .map(({ location, locationId, route, evidenceTier, similarityPercent }) => ({
          location,
          locationId,
          route,
          evidenceTier,
          similarityPercent,
        })),
      newlyApprovedProductionRoutes: 0,
      unresolvedSourceRows: ftoUnresolved.length,
      unresolvedSourceRowsByStatus: ftoUnresolved.reduce((counts, { mappingStatus }) => {
        counts[mappingStatus] = (counts[mappingStatus] || 0) + 1;
        return counts;
      }, {}),
      medicalOnlyUnseenLocationsExcluded: medicalOnlyUnseenIds.length,
      resolverConflicts: invalidSourceMappings.length,
      unsupportedClaims: candidates.reduce(
        (total, candidate) => total + candidate.unsupportedClaims.length,
        0,
      ),
      exactDuplicateCandidateRecords: 0,
    },
    previouslyAuditedRosterLocations: [...grouped.entries()]
      .filter(([locationId]) => priorIds.has(locationId))
      .map(([locationId, evidence]) => {
        const record = evidence[0];
        const candidate = priorByIdentity.get(identityKey({
          countryCode: record.countryCode,
          country: record.country,
          state: record.geographicState,
          canonicalName: record.geographicName,
          name: record.geographicName,
        }));
        return {
          location: record.geographicName,
          state: record.geographicState,
          locationId,
          priorCandidateTier: candidate?.evidenceProfile?.level || 'NOT_MATCHED',
          priorIndexabilityState: candidate?.indexabilityState || 'NOT_MATCHED',
        };
      }),
    medicalOnlyUnseenLocations: medicalOnlyUnseenIds,
    unresolvedFtoSourceRows: ftoUnresolved,
    candidates,
  };

  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    reportPath: path.relative(ROOT, REPORT_PATH),
    summary: report.summary,
    candidates: candidates.map(({
      location,
      locationId,
      evidenceTier,
      qualityGatePassed,
      differentiationPassed,
      similarityPercent,
      qualityQualified,
      productionApproved,
      indexabilityState,
    }) => ({
      location,
      locationId,
      evidenceTier,
      qualityGatePassed,
      differentiationPassed,
      similarityPercent,
      qualityQualified,
      productionApproved,
      indexabilityState,
    })),
  }, null, 2));
}

await main();
