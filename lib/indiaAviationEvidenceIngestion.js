import {
  DGCA_CLASS1_AIR_FORCE_RENEWAL_STATIONS,
  DGCA_CLASS1_CAR_SOURCE,
  DGCA_CLASS1_CIVIL_CENTRES,
  DGCA_CLASS1_CENTRE_SOURCE,
  DGCA_CLASS1_CENTRES_AS_OF,
  DGCA_CLASS1_INITIAL_ISSUE_CENTRES,
} from '../data/location-seo/medical-centres.js';
import {
  DGCA_FTO_ROSTER_AS_OF,
  DGCA_FTO_ROSTER_BASES,
  DGCA_FTO_ROSTER_SOURCE,
} from '../data/location-seo/dgca-fto-roster.js';

const VERIFIED_AT = '2026-10-08';
const DGCA = 'Directorate General of Civil Aviation (DGCA)';
const PLACE_TYPES = ['city', 'town', 'populated-place', 'village', 'district', 'subdistrict'];
const PILOT_TRAINING_EVIDENCE_TYPES = new Set([
  'flight-school',
  'flying-club',
  'aviation-college',
  'aviation-academy',
  'pilot-training-organization',
  'airline-training-organization',
]);
const REGIONAL_STATION_NAMES = new Set([
  'No. 1 Aeromedical Training Centre, Air Force Station Hindan',
  'Air Force Station Palam',
  'Air Force Station Rajokri',
  'Air Force Station Chakeri',
  'Air Force Station Lohegaon',
  'Air Force Station Thane',
  'Air Force Station Tambaram',
  'Air Force Station Yelahanka',
  'Air Force Station Begumpet',
  'Air Force Station Hakimpet',
  'Air Force Station Barrackpore',
  'SMC, HQ SWAC (U) IAF, Chiloda',
]);

function normalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function slugify(value) {
  return normalizeName(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseSourcePlace(value) {
  const segments = String(value || '').split(',').map((part) => part.trim());
  return {
    name: segments[0] || '',
    state: segments.length > 1 ? segments.slice(1).join(', ') : null,
  };
}

function sourceRows() {
  const civilRows = DGCA_CLASS1_CIVIL_CENTRES.map((centre) => {
    const place = parseSourcePlace(centre.city);
    return {
      id: `aviation:medical:dgca-class1-civil:${slugify(`${centre.name}-${place.name}`)}`,
      name: centre.name,
      place,
      source: DGCA_CLASS1_CENTRE_SOURCE.label,
      sourceUrl: DGCA_CLASS1_CENTRE_SOURCE.url,
      sourceDate: '2026-08-27',
      sourceGroup: 'DGCA Class 1 civil centres',
      fact: `DGCA's Class 1 medical-centre inventory updated ${DGCA_CLASS1_CENTRES_AS_OF} lists ${centre.name} in ${centre.city}${centre.note ? ` (${centre.note})` : ''}. Confirm the applicable medical class and current appointment arrangements with DGCA and the centre.`,
    };
  });

  const renewalRows = DGCA_CLASS1_AIR_FORCE_RENEWAL_STATIONS.map((station) => {
    const geographicRelationship = REGIONAL_STATION_NAMES.has(station.name)
      ? 'regional-context'
      : 'located-within';
    return {
      id: `aviation:medical:dgca-class1-renewal:${slugify(`${station.name}-${station.city}`)}`,
      name: station.name,
      place: parseSourcePlace(station.city),
      source: DGCA_CLASS1_CAR_SOURCE.label,
      sourceUrl: DGCA_CLASS1_CAR_SOURCE.url,
      sourceDate: null,
      sourceGroup: 'DGCA CAR Appendix B Class 1 renewal stations',
      geographicRelationship,
      fact: geographicRelationship === 'regional-context'
        ? `DGCA CAR Appendix B lists ${station.name} among the Class 1 Air Force medical examination stations. The repository's city field associates this entry with ${station.city}; because the facility label names a distinct area, treat it as regional context only, not as a confirmed facility address within the city registry boundary.`
          + " The repository's source notes classify these stations for renewals, not initial issue."
        : `DGCA CAR Appendix B lists ${station.name} under the Class 1 Air Force medical examination stations associated with ${station.city}. The repository's source notes classify these stations for renewals, not initial issue.`,
    };
  });

  const initialRows = DGCA_CLASS1_INITIAL_ISSUE_CENTRES
    .filter((entry) => entry.includes(','))
    .map((entry) => {
      const lastComma = entry.lastIndexOf(',');
      const name = entry.slice(0, lastComma).trim();
      const city = entry.slice(lastComma + 1).trim();
      return {
        id: `aviation:medical:dgca-class1-initial:${slugify(`${name}-${city}`)}`,
        name,
        place: parseSourcePlace(city),
        source: DGCA_CLASS1_CENTRE_SOURCE.label,
        sourceUrl: DGCA_CLASS1_CENTRE_SOURCE.url,
        sourceDate: '2026-08-27',
        sourceGroup: 'DGCA Class 1 initial-issue centres',
        fact: `DGCA's Class 1 medical-centre inventory updated ${DGCA_CLASS1_CENTRES_AS_OF} lists ${name} in ${city} among the initial-issue centres. Confirm individual eligibility and the current route with DGCA.`,
      };
    });

  const flightTrainingRows = DGCA_FTO_ROSTER_BASES.flatMap((organization) => (
    organization.bases.map((base) => {
      const place = base.place ? {
        name: base.place,
        state: base.state,
      } : null;
      return {
        id: `aviation:fto:dgca-roster:${slugify(`${organization.name}-${base.place || base.base}`)}`,
        name: organization.name,
        type: organization.type,
        place,
        geographicType: base.geographicType || null,
        base: base.base,
        status: base.status || 'RESOLVE',
        statusReason: base.reason || null,
        source: DGCA_FTO_ROSTER_SOURCE.title,
        sourceTitle: DGCA_FTO_ROSTER_SOURCE.title,
        sourceDateBasis: DGCA_FTO_ROSTER_SOURCE.sourceDateBasis,
        sourceCreatedAt: DGCA_FTO_ROSTER_SOURCE.pdfCreatedAt,
        sourceLastModifiedAt: DGCA_FTO_ROSTER_SOURCE.objectLastModifiedAt,
        sourcePublisher: DGCA_FTO_ROSTER_SOURCE.publisher,
        sourceUrl: DGCA_FTO_ROSTER_SOURCE.url,
        sourceDate: DGCA_FTO_ROSTER_SOURCE.sourceDate,
        verificationDate: DGCA_FTO_ROSTER_SOURCE.verificationDate,
        sourceGroup: 'DGCA approved flying training organization roster',
        geographicRelationship: base.geographicRelationship || 'located-within',
        fact: base.statusNote
          ? `The DGCA roster dated ${DGCA_FTO_ROSTER_AS_OF} lists ${organization.name} at ${base.base}. The roster also states: ${base.statusNote} The entry is date-specific and does not establish current operations, admissions, course availability, or a relationship with We One Aviation.`
          : `The DGCA roster dated ${DGCA_FTO_ROSTER_AS_OF} lists ${organization.name} at ${base.base}. The entry is date-specific and does not establish current operations, admissions, course availability, or a relationship with We One Aviation.`,
      };
    })
  ));

  return [...civilRows, ...renewalRows, ...initialRows, ...flightTrainingRows];
}

function matchesExactPlace(location, name, state) {
  const nameKey = normalizeName(name);
  const names = [location.name, location.canonicalName, ...(location.aliases || [])]
    .map(normalizeName)
    .filter(Boolean);
  return names.includes(nameKey)
    && (!state || normalizeName(location.state) === normalizeName(state));
}

async function resolveExactPlace(source, resolveLocation) {
  if (source.status === 'AMBIGUOUS') {
    return {
      status: 'AMBIGUOUS',
      reason: source.statusReason || 'The source-listed geographic mapping is ambiguous.',
    };
  }
  if (!source.place?.name) {
    return {
      status: 'AMBIGUOUS',
      reason: 'The source row has no single exact geographic place to resolve.',
    };
  }
  const candidateTypes = source.geographicType ? [source.geographicType] : PLACE_TYPES;
  for (const type of candidateTypes) {
    let resolved;
    try {
      resolved = await resolveLocation(source.place.name, {
        type,
        ...(source.place.state ? { state: source.place.state } : {}),
      });
    } catch (error) {
      if (/is ambiguous/i.test(error.message)) {
        return {
          status: 'AMBIGUOUS',
          reason: `Exact ${type} name${source.place.state ? ' and state' : ''} has multiple registry matches.`,
        };
      }
      throw error;
    }

    if (!resolved?.location) continue;
    const { location, hierarchy } = resolved;
    if (!matchesExactPlace(location, source.place.name, source.place.state)
      || location.type !== type
      || location.countryCode !== 'IN'
      || location.country !== 'India'
      || !Array.isArray(hierarchy)
      || hierarchy.at(-1)?.id !== location.id
      || !hierarchy.some(({ type: parentType }) => parentType === 'state')) {
      return {
        status: 'INVALID_GEOGRAPHY',
        reason: 'The resolver result did not pass the exact India place, type, state, and hierarchy checks.',
      };
    }
    return { status: 'RESOLVED', location, hierarchy };
  }

  return {
    status: 'UNMATCHED',
    reason: `No exact ${PLACE_TYPES.join('/')} registry match${source.place.state ? ` in ${source.place.state}` : ''}.`,
  };
}

function existingEvidenceMatches(source, location, existingEvidence) {
  const expectedName = normalizeName(source.name);
  const expectedNameWithPlace = normalizeName(`${source.name} ${source.place?.name || ''}`);
  const evidenceType = source.type || 'medical-centre';
  return existingEvidence.some((existing) => {
    if (existing.locationId !== location.id
      || existing.countryCode !== 'IN'
      || existing.type !== evidenceType
      || existing.sourceUrl !== source.sourceUrl) {
      return false;
    }
    const existingName = normalizeName(existing.name);
    return existingName === expectedName || existingName === expectedNameWithPlace;
  });
}

export async function normalizeIndiaAviationEvidence({
  resolveLocation,
  existingEvidence = [],
}) {
  if (typeof resolveLocation !== 'function') {
    throw new TypeError('An exact India geography resolver is required.');
  }
  if (!Array.isArray(existingEvidence)) {
    throw new TypeError('Existing evidence must be an array.');
  }

  const records = [];
  const unmatched = [];
  const ambiguous = [];
  const duplicates = [];
  const invalidMappings = [];
  const seenEvidenceIds = new Set();

  for (const source of sourceRows()) {
    if (seenEvidenceIds.has(source.id)) {
      duplicates.push({ evidenceId: source.id, reason: 'Duplicate deterministic evidence ID.' });
      continue;
    }
    seenEvidenceIds.add(source.id);

    const result = await resolveExactPlace(source, resolveLocation);
    if (result.status !== 'RESOLVED') {
      const entry = {
        evidenceId: source.id,
        name: source.name,
        sourcePlace: source.place || null,
        sourceBase: source.base || null,
        sourceUrl: source.sourceUrl,
        sourcePublisher: source.sourcePublisher || source.source,
        reason: result.reason,
      };
      if (result.status === 'AMBIGUOUS') ambiguous.push(entry);
      else if (result.status === 'INVALID_GEOGRAPHY') invalidMappings.push(entry);
      else unmatched.push(entry);
      continue;
    }

    const { location, hierarchy } = result;
    const evidenceType = source.type || 'medical-centre';
    if (existingEvidenceMatches(source, location, existingEvidence)) {
      duplicates.push({
        evidenceId: source.id,
        existingEvidenceId: existingEvidence.find((existing) => (
          existing.locationId === location.id
          && existing.countryCode === 'IN'
          && existing.type === evidenceType
          && existing.sourceUrl === source.sourceUrl
          && [normalizeName(source.name), normalizeName(`${source.name} ${source.place?.name || ''}`)]
            .includes(normalizeName(existing.name))
        ))?.id || null,
        reason: `Same ${evidenceType} name, exact registry place, evidence type, and source URL already exist.`,
      });
      continue;
    }

    records.push({
      id: source.id,
      name: source.name,
      type: evidenceType,
      locationId: location.id,
      geographicName: location.canonicalName || location.name,
      geographicType: location.type,
      geographicState: location.state,
      geographicRelationship: source.geographicRelationship || 'located-within',
      relatedLocationIds: [],
      country: 'India',
      countryCode: 'IN',
      source: source.source,
      sourceTitle: source.sourceTitle || source.sourceGroup,
      sourcePublisher: source.sourcePublisher || source.source,
      sourceUrl: source.sourceUrl,
      sourceDate: source.sourceDate,
      ...(source.sourceDateBasis ? { sourceDateBasis: source.sourceDateBasis } : {}),
      ...(source.sourceCreatedAt ? { sourceCreatedAt: source.sourceCreatedAt } : {}),
      ...(source.sourceLastModifiedAt
        ? { sourceLastModifiedAt: source.sourceLastModifiedAt }
        : {}),
      verificationDate: source.verificationDate || VERIFIED_AT,
      verifiedAt: VERIFIED_AT,
      verificationStatus: 'primary-source-listed',
      regulatoryAuthority: DGCA,
      attributionNote: source.type === 'medical-centre'
        ? `${source.sourceGroup}; source location field is ${source.place.name}${source.place.state ? `, ${source.place.state}` : ''}. This is an independent DGCA-listed medical reference, not a We One Aviation facility, service, partnership, or training location.`
        : `${source.sourceGroup}; source-listed base: ${source.base}. This is an independent organization listed by DGCA, not a We One Aviation facility, service, partnership, or training location. The dated roster does not establish current operations or course availability.`,
      pilotTrainingRelevance: evidenceType === 'medical-centre'
        ? 'medical-support'
        : PILOT_TRAINING_EVIDENCE_TYPES.has(evidenceType)
          ? 'pilot-training'
          : 'supporting-infrastructure',
      fact: source.fact,
      supportingSourceUrls: [],
      sourcePlace: source.place,
      sourceBase: source.base || null,
      geographySlug: location.slug,
      hierarchy: hierarchy.map(({ id, name, type }) => ({ id, name, type })),
    });
  }

  return {
    records,
    unmatched,
    ambiguous,
    duplicates,
    invalidMappings,
    sourceRecordCount: sourceRows().length,
  };
}
