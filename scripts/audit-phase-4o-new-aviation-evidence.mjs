import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AVIATION_REGULATORY_CONTEXTS } from '../data/location-seo/aviation-regulatory-contexts.js';
import { AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/aviation-evidence.js';
import { INDIA_AVIATION_EVIDENCE_RECORDS } from '../data/location-seo/india-aviation-evidence.generated.js';
import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';
import { getIndiaDynamicServicePolicy } from '../data/location-seo/india-dynamic-service-policies.js';
import { SERVICES } from '../data/location-seo/services.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import { assessContentDifferentiation } from '../lib/locationContentDifferentiation.js';
import { isApprovedGeographicRoute, isGeographicPageQualityEligible } from '../lib/locationIndexabilityPolicy.js';
import { resolveGeographicServicePage } from '../lib/geographicServicePage.js';
import {
  loadIndiaGeographicRegistry,
  resolveIndiaGeographicLocation,
  resolveIndiaGeographicRoute,
} from '../lib/indiaGeographicRegistry.js';
import { getApprovedLocationServicePairs } from '../lib/locationSeo.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GEOGRAPHY_DIRECTORY = path.join(ROOT, 'data', 'location-seo', 'geography');
const PRIOR_REPORT_PATHS = [
  path.join(GEOGRAPHY_DIRECTORY, 'pilot-training-evidence-phase-4l-audit.json'),
  path.join(GEOGRAPHY_DIRECTORY, 'pilot-training-evidence-phase-4n-audit.json'),
];
const REPORT_PATH = path.join(
  GEOGRAPHY_DIRECTORY,
  'pilot-training-evidence-phase-4o-audit.json',
);
const AIP_BASE_URL = 'https://aim-india.aai.aero/eaip/eaip-v2-09-2026/eAIP/';
const RENDER_ORIGIN = process.env.LOCATION_AUDIT_RENDER_ORIGIN || 'http://localhost:3025';
const REQUESTED_CANDIDATES = 100;
const MAX_CONCURRENT_REQUESTS = 2;
const PLACE_TYPES = new Set([
  'city',
  'town',
  'populated-place',
  'village',
  'locality',
  'neighborhood',
]);
const PILOT_TRAINING_EVIDENCE_TYPES = new Set([
  'aviation-academy',
  'aviation-college',
  'flight-school',
  'flying-club',
  'pilot-training-organization',
  'airline-training-organization',
]);
const AIRPORT_EVIDENCE_TYPES = new Set([
  'official-aerodrome-record',
  'airport',
  'aerodrome',
]);
const SERVICE = SERVICES.find(({ slug }) => slug === 'pilot-training');
const DIFFERENTIATION_POLICY = GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation;
const INDIA_STATES_AND_UTS = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function hierarchyIdentityKey(candidate, hierarchy = candidate.hierarchy) {
  if (!Array.isArray(hierarchy) || hierarchy.length === 0) return null;
  return [
    candidate.countryCode || 'IN',
    ...hierarchy.map(({ id }) => id),
  ].join('|');
}

function coarseIdentityKey(candidate) {
  return [
    candidate.countryCode || 'IN',
    normalize(candidate.state || candidate.hierarchy?.find(({ type }) => type === 'state')?.name),
    normalize(candidate.geographicType || candidate.type),
    normalize(candidate.canonicalName || candidate.name || candidate.location),
  ].join('|');
}

function buildRegistryPlaceNameIndex(records) {
  const names = new Map();
  for (const record of records) {
    if (!PLACE_TYPES.has(record.type)) continue;
    for (const value of [record.canonicalName, record.name, ...(record.aliases || [])]) {
      const key = normalize(value);
      if (!key) continue;
      if (!names.has(key)) names.set(key, new Map());
      names.get(key).set(record.id, record);
    }
  }
  return names;
}

function validateResolvedSourceIdentity(name, state, location, nameIndex) {
  const records = [...(nameIndex.get(normalize(name))?.values() || [])]
    .filter((record) => !state || normalize(record.state) === normalize(state));
  if (records.length > 1) {
    return `Source place name "${name}" matches multiple geographic registry IDs${state ? ` in ${state}` : ''}: ${records.map(({ id }) => id).join(', ')}.`;
  }
  if (records.length === 1 && records[0].id !== location.id) {
    return `Resolved ID ${location.id} differs from the exact-name registry match ${records[0].id} for "${name}".`;
  }
  if (records.length === 0) {
    return `No exact locality name or alias match was verified for source place "${name}"${state ? ` in ${state}` : ''}.`;
  }
  return null;
}

function decodeHtml(value) {
  return String(value || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function htmlText(html) {
  return decodeHtml(String(html || '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function mainTextFromHtml(html) {
  const main = String(html || '').match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) throw new Error('Rendered page HTML has no <main> element.');
  return htmlText(main);
}

function extractAirportLinks(menuHtml) {
  const airports = new Map();
  for (const [, href, labelHtml] of String(menuHtml).matchAll(
    /<a\b[^>]*href=['"](IN-AD 2\.1[A-Z0-9]{4}-en-GB\.html)['"][^>]*>([\s\S]*?)<\/a>/gi,
  )) {
    const label = htmlText(labelHtml);
    const match = label.match(/\b(V[A-Z0-9]{3})\/(.+)$/);
    if (!match) continue;
    airports.set(href, {
      href,
      icao: match[1],
      airportName: match[2].trim(),
      label,
    });
  }
  return [...airports.values()];
}

function parseAipAirport(text, airport) {
  const code = airport.icao;
  const nameMatch = text.match(new RegExp(
    `${code}\\s*-\\s*(.+?)\\s+${code}\\s+AD 2\\.2`,
    'i',
  ));
  const ad22Start = text.indexOf(`${code} AD 2.2`);
  if (!nameMatch || ad22Start < 0) {
    throw new Error(`AAI AIP page ${airport.href} is missing AD 2.1/2.2 data.`);
  }
  const ad22 = text.slice(ad22Start);
  const locationField = ad22.match(/\s2\s+([\s\S]+?)\s+3\s+Aerodrome elevation/i)?.[1];
  const operatorField = ad22.match(/\s5\s+([\s\S]+?)\s+6\s+Types of traffic permitted/i)?.[1];
  if (!locationField) {
    throw new Error(`AAI AIP page ${airport.href} has no parseable AD 2.2 location field.`);
  }
  return {
    facilityName: nameMatch[1].trim(),
    locationField: locationField.replace(/\s+/g, ' ').trim(),
    operatorField: operatorField?.replace(/\s+/g, ' ').trim() || '',
  };
}

function stateFromOperatorField(operatorField) {
  const matches = INDIA_STATES_AND_UTS.filter((state) => (
    new RegExp(
      `(^|[^A-Za-z])${state.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`,
      'i',
    ).test(operatorField)
  ));
  return matches.length === 1 ? matches[0] : null;
}

function servedPlaceFromLocationField(locationField) {
  const prefix = locationField.replace(
    /^Direction and distance of (?:the )?aerodrome reference point from (?:the )?(?:center|centre) of the city or town which the aerodrome serves\s*/i,
    '',
  );
  let place = prefix.match(/\b(?:from|of)\s+(.+)$/i)?.[1] || prefix;
  place = place
    .replace(/^\s*airport is located\s*/i, '')
    .replace(/^\s*\d+(?:\.\d+)?\s*(?:km|nm|m)\s*/i, '')
    .replace(/^\s*\d{1,3}(?:\.\d+)?\s*(?:deg(?:ree)?[.,/]?\s*)?/i, '')
    .replace(/^\s*(?:(?:north|south|east|west)(?:[- ](?:east|west))?\s*)+/i, '')
    .replace(/\s+(?:railway(?:\s+sta(?:tion)?)?|junction|city|town|bus stand|airport).*$/i, '')
    .replace(/[.,;]+$/g, '')
    .trim();
  return place;
}

function effectiveDateToIso(value) {
  const monthNumbers = new Map([
    ['JAN', '01'],
    ['FEB', '02'],
    ['MAR', '03'],
    ['APR', '04'],
    ['MAY', '05'],
    ['JUN', '06'],
    ['JUL', '07'],
    ['AUG', '08'],
    ['SEP', '09'],
    ['OCT', '10'],
    ['NOV', '11'],
    ['DEC', '12'],
  ]);
  const match = String(value || '').match(/^(\d{2})\s+([A-Z]{3})\s+(\d{4})$/i);
  const month = monthNumbers.get(match?.[2]?.toUpperCase());
  if (!match || !month) throw new Error(`Invalid AAI eAIP effective date "${value}".`);
  return `${match[3]}-${month}-${match[1]}`;
}

async function resolveSettlementWithState(name, state) {
  const types = ['city', 'town', 'populated-place', 'village', 'locality'];
  for (const type of types) {
    try {
      const result = await resolveIndiaGeographicLocation(name, {
        country: 'India',
        state,
        type,
      });
      if (!result.location) continue;
      if (result.location.type !== type || normalize(result.location.state) !== normalize(state)) {
        continue;
      }
      return { result, type, ambiguous: false };
    } catch (error) {
      if (/Geographic (?:alias|slug) ".*" is ambiguous/.test(error.message)) {
        return { result: null, type, ambiguous: true, reason: error.message };
      }
      throw error;
    }
  }
  return { result: null, type: null, ambiguous: false };
}

function validateHierarchy(location, hierarchy) {
  return Array.isArray(hierarchy)
    && hierarchy.length > 1
    && hierarchy.at(-1)?.id === location.id
    && hierarchy[0]?.type === 'country'
    && hierarchy[0]?.countryCode === 'IN'
    && hierarchy.some(({ type }) => type === 'state')
    && hierarchy.every(({ countryCode }, index) => (
      countryCode === 'IN'
      && (index === 0 || hierarchy[index].parentId === hierarchy[index - 1].id)
    ));
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

function robotsAllowIndexing(robots) {
  return /^index,\s*follow(?:,|$)/i.test(String(robots || ''));
}

function parseMetaContent(html, nameOrProperty) {
  const tags = String(html || '').match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const key = tag.match(/\b(?:name|property)=["']([^"']+)["']/i)?.[1];
    if (key !== nameOrProperty) continue;
    return tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] || null;
  }
  return null;
}

function parseRenderedPage(html, route, expectedTemplate = null) {
  const source = String(html || '');
  const mainElements = [...source.matchAll(/<main\b([^>]*)>/gi)];
  if (!mainElements.length) throw new Error(`Rendered route ${route} has no <main> element.`);
  const selectedMain = mainElements.find((match) => (
    expectedTemplate
      ? new RegExp(`\\bdata-location-template=["']${expectedTemplate}["']`, 'i').test(match[1])
      : true
  ));
  if (!selectedMain) {
    throw new Error(`Route ${route} has no <main> element for template ${expectedTemplate}.`);
  }
  const markerElement = [...source.matchAll(/<(?:main|div)\b([^>]*)>/gi)].find((match) => (
    /\bdata-indexability-state=["'][^"']+["']/i.test(match[1])
    || (expectedTemplate
      && new RegExp(`\\bdata-location-template=["']${expectedTemplate}["']`, 'i').test(match[1]))
  ));
  const attributes = markerElement?.[1] || selectedMain[1];
  const contentStart = selectedMain.index + selectedMain[0].length;
  let depth = 1;
  let contentEnd = -1;
  for (const tag of source.slice(contentStart).matchAll(/<\/?main\b[^>]*>/gi)) {
    if (/^<\/main/i.test(tag[0])) depth -= 1;
    else depth += 1;
    if (depth === 0) {
      contentEnd = contentStart + tag.index;
      break;
    }
  }
  if (contentEnd < 0) throw new Error(`Rendered route ${route} has an unclosed <main> element.`);
  const mainContent = source.slice(contentStart, contentEnd);
  const state = attributes.match(/\bdata-indexability-state=["']([^"']+)["']/i)?.[1] || null;
  const template = attributes.match(/\bdata-location-template=["']([^"']+)["']/i)?.[1] || null;
  const evidenceTier = attributes.match(/\bdata-evidence-profile=["']([^"']+)["']/i)?.[1] || null;
  const h1 = mainContent.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '';
  const renderedText = htmlText(mainContent);
  const sections = [...mainContent.matchAll(
    /<article\b([^>]*)>([\s\S]*?)<\/article>/gi,
  )].flatMap(([, attributes, body]) => {
    const category = attributes.match(
      /\bdata-location-content-category=["']([^"']+)["']/i,
    )?.[1];
    const text = htmlText(body);
    return category && text ? [{ title: category, body: text, verified: true }] : [];
  });
  const faqs = [...mainContent.matchAll(
    /<button\b([^>]*)>([\s\S]*?)<\/button>/gi,
  )].flatMap(([, attributes, questionHtml]) => {
    const answerId = attributes.match(/\baria-controls=["']([^"']+)["']/i)?.[1];
    if (!answerId) return [];
    const escapedId = answerId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const answerHtml = mainContent.match(new RegExp(
      `<div\\b[^>]*\\bid=["']${escapedId}["'][^>]*>([\\s\\S]*?)<\\/div>`,
      'i',
    ))?.[1];
    const question = htmlText(questionHtml);
    const answer = htmlText(answerHtml);
    return question && answer ? [{ question, answer }] : [];
  });
  const categories = sections.map(({ title }) => title);
  if (expectedTemplate && template !== expectedTemplate) {
    throw new Error(`Route ${route} rendered template "${template}", expected ${expectedTemplate}.`);
  }
  return {
    state,
    template,
    evidenceTier,
    h1: htmlText(h1),
    renderedText,
    wordCount: renderedText.match(/\S+/g)?.length || 0,
    faqCount: faqs.length,
    faqs,
    sections,
    sectionCategories: [...new Set(categories)],
    robots: parseMetaContent(html, 'robots'),
    canonical: html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
      || html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]
      || null,
  };
}

async function fetchText(url, label) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${label}: HTTP ${response.status} for ${url}`);
  return response.text();
}

async function mapConcurrent(items, limit, callback) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) return;
      results[index] = await callback(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

function findPriorIdentityMatch(priorCandidates, location, hierarchy) {
  const currentHierarchyKey = hierarchyIdentityKey(location, hierarchy);
  for (const candidate of priorCandidates) {
    const priorIds = [
      candidate.locationId,
      candidate.evidenceProfile?.locationId,
      ...(candidate.evidence || []).map(({ geographicRecordId, locationId }) => (
        geographicRecordId || locationId
      )),
    ].filter(Boolean);
    if (priorIds.includes(location.id)) return { candidate, status: 'DUPLICATE' };
    const priorHierarchyKey = hierarchyIdentityKey(candidate);
    if (currentHierarchyKey && priorHierarchyKey === currentHierarchyKey) {
      return { candidate, status: 'DUPLICATE' };
    }
    const priorHierarchy = candidate.hierarchy;
    const sameParentPath = Array.isArray(priorHierarchy)
      && priorHierarchy.length === hierarchy.length
      && priorHierarchy.slice(0, -1).every(
        ({ id }, index) => id === hierarchy[index]?.id,
      );
    if (sameParentPath
      && priorHierarchy.at(-1)?.type === location.type
      && normalize(priorHierarchy.at(-1)?.name) === normalize(location.canonicalName || location.name)) {
      return { candidate, status: 'AMBIGUOUS' };
    }
  }

  const possibleMatch = priorCandidates.find((candidate) => (
    coarseIdentityKey(candidate) === coarseIdentityKey({
      countryCode: location.countryCode,
      state: location.state || hierarchy.find(({ type }) => type === 'state')?.name,
      geographicType: location.type,
      canonicalName: location.canonicalName || location.name,
    })
  ));
  if (possibleMatch && !hierarchyIdentityKey(possibleMatch)) {
    return { candidate: possibleMatch, status: 'AMBIGUOUS' };
  }
  return null;
}

async function selectSupplementalRegistryCandidates({
  count,
  priorCandidates,
  acceptedCandidates,
  registry,
}) {
  if (count <= 0) return [];
  const recordsById = new Map(registry.records.map((record) => [record.id, record]));
  const acceptedIdentityKeys = new Set(acceptedCandidates.map(({ location, hierarchy }) => (
    hierarchyIdentityKey(location, hierarchy)
  )));
  const productionIdentityKeys = new Set(getApprovedLocationServicePairs()
    .filter(({ service }) => service.slug === SERVICE.slug)
    .map(({ location }) => coarseIdentityKey({
      countryCode: location.countryCode || 'IN',
      state: location.state,
      geographicType: location.type || 'city',
      name: location.canonicalName || location.name || location.city,
    })));
  const candidatesByState = new Map();

  for (const record of registry.records) {
    if (record.countryCode !== 'IN'
      || !['city', 'town', 'populated-place'].includes(record.type)
      || !record.slug
      || !record.name) continue;
    const ancestors = [];
    let current = record;
    const seen = new Set();
    while (current && !seen.has(current.id)) {
      seen.add(current.id);
      ancestors.unshift(current);
      current = current.parentId ? recordsById.get(current.parentId) : null;
    }
    const hierarchy = ancestors.map(({ id, name, type, countryCode, parentId }) => ({
      id,
      name,
      type,
      countryCode,
      parentId,
    }));
    const state = ancestors.find(({ type }) => type === 'state')?.name;
    if (!state || !validateHierarchy(record, hierarchy)) continue;
    const candidate = {
      location: record,
      hierarchy,
      route: `/${record.slug}/${SERVICE.slug}`,
      countryCode: 'IN',
      state,
      resolutionMethod: 'registry-record-exact-id-supplement',
      aerodromes: [],
    };
    const identityKey = hierarchyIdentityKey(record, hierarchy);
    const coarseKey = coarseIdentityKey({
      countryCode: 'IN',
      state,
      geographicType: record.type,
      canonicalName: record.canonicalName || record.name,
    });
    if (acceptedIdentityKeys.has(identityKey)
      || productionIdentityKeys.has(coarseKey)
      || findPriorIdentityMatch(priorCandidates, record, hierarchy)) continue;
    if (!getIndiaDynamicServicePolicy(SERVICE, record)) continue;
    if (!candidatesByState.has(state)) candidatesByState.set(state, []);
    candidatesByState.get(state).push(candidate);
  }

  const typeOrder = new Map([['city', 0], ['town', 1], ['populated-place', 2]]);
  const pathEvidenceRank = (candidate) => {
    const pathIds = new Set(candidate.hierarchy.map(({ id }) => id));
    return [...AVIATION_EVIDENCE_RECORDS, ...INDIA_AVIATION_EVIDENCE_RECORDS]
      .filter(({ countryCode, verificationStatus, locationId, relatedLocationIds = [] }) => (
        countryCode === 'IN'
        && verificationStatus === 'primary-source-listed'
        && (pathIds.has(locationId) || relatedLocationIds.includes(candidate.location.id))
      ))
      .reduce((rank, record) => {
        const isMedical = record.type === 'medical-centre';
        const isAirport = AIRPORT_EVIDENCE_TYPES.has(record.type);
        const isTraining = PILOT_TRAINING_EVIDENCE_TYPES.has(record.type)
          && record.pilotTrainingRelevance !== 'historical-not-operational';
        const recordRank = isTraining
          ? record.locationId === candidate.location.id ? 4 : 3
          : isMedical ? 1 : isAirport ? 2 : 2;
        return Math.max(rank, recordRank);
      }, 0);
  };
  for (const candidates of candidatesByState.values()) {
    candidates.sort((left, right) => (
      pathEvidenceRank(right) - pathEvidenceRank(left)
      || typeOrder.get(left.location.type) - typeOrder.get(right.location.type)
      || normalize(left.location.name).localeCompare(normalize(right.location.name))
      || left.location.id.localeCompare(right.location.id)
    ));
  }

  const states = [...candidatesByState.keys()].sort((left, right) => (
    normalize(left).localeCompare(normalize(right))
  ));
  const selected = [];
  const selectedIdentities = new Set(acceptedIdentityKeys);
  const positions = new Map(states.map((state) => [state, 0]));
  while (selected.length < count) {
    let added = false;
    for (const state of states) {
      const candidates = candidatesByState.get(state);
      let position = positions.get(state);
      while (position < candidates.length
        && selectedIdentities.has(hierarchyIdentityKey(
          candidates[position].location,
          candidates[position].hierarchy,
        ))) position += 1;
      if (position >= candidates.length) {
        positions.set(state, position);
        continue;
      }
      const candidate = candidates[position];
      selected.push(candidate);
      selectedIdentities.add(hierarchyIdentityKey(candidate.location, candidate.hierarchy));
      positions.set(state, position + 1);
      added = true;
      if (selected.length === count) break;
    }
    if (!added) break;
  }
  if (selected.length !== count) {
    throw new Error(
      `Only ${selected.length} verified new registry identities were available; ${count} are required.`,
    );
  }
  return mapConcurrent(selected, MAX_CONCURRENT_REQUESTS, async (candidate) => {
    const resolved = await resolveIndiaGeographicRoute(candidate.location.slug);
    if (!resolved.location || resolved.location.id !== candidate.location.id
      || !validateHierarchy(resolved.location, resolved.hierarchy)) {
      throw new Error(`Selected registry identity failed exact route resolution: ${candidate.location.id}.`);
    }
    return {
      ...candidate,
      location: resolved.location,
      hierarchy: resolved.hierarchy,
    };
  });
}

function evidenceForCandidate(candidate, aipEvidence) {
  const pathIds = new Set(candidate.hierarchy.map(({ id }) => id));
  const sourceRecords = [...AVIATION_EVIDENCE_RECORDS, ...INDIA_AVIATION_EVIDENCE_RECORDS];
  const registryEvidence = sourceRecords
    .filter(({ countryCode, verificationStatus, locationId, relatedLocationIds = [] }) => (
      countryCode === 'IN'
      && verificationStatus === 'primary-source-listed'
      && (pathIds.has(locationId) || relatedLocationIds.includes(candidate.location.id))
    ))
    .map((record) => {
      const isMedical = record.type === 'medical-centre';
      const isAirport = AIRPORT_EVIDENCE_TYPES.has(record.type);
      const exactLocation = record.locationId === candidate.location.id;
      const relationship = isMedical
        ? 'SUPPORTING'
        : exactLocation && record.geographicRelationship !== 'regional-context'
          ? 'DIRECT'
          : 'REGIONAL_CONTEXT';
      return {
        geographicRecordId: candidate.location.id,
        country: candidate.location.country,
        stateProvince: candidate.state,
        districtRegion: candidate.hierarchy.find(({ type }) => type === 'district')?.name || null,
        cityTownLocality: candidate.location.canonicalName || candidate.location.name,
        evidenceId: record.id,
        evidenceOrganisation: record.name,
        organizationFacilityName: record.sourceBase || record.name,
        evidenceType: isAirport ? 'official-aerodrome-record' : record.type,
        sourceUrl: record.sourceUrl,
        sourceTitle: record.sourceTitle || record.source,
        sourceDate: record.sourceDate || null,
        sourceDateBasis: record.sourceDateBasis || null,
        verificationDate: record.verificationDate || record.verifiedAt || null,
        relationship,
        aviationRelevance: record.fact || record.attributionNote || '',
        pilotTrainingRelevance: record.pilotTrainingRelevance || null,
        verificationStatus: record.verificationStatus || null,
        regulatoryAuthority: record.regulatoryAuthority
          || AVIATION_REGULATORY_CONTEXTS.India.authority,
        sourceGeographicRecordId: record.locationId,
        factualStatement: record.fact || record.attributionNote || '',
      };
    });
  const allEvidence = [...aipEvidence, ...registryEvidence];
  return allEvidence.filter((record, index) => (
    allEvidence.findIndex(({ evidenceId }) => evidenceId === record.evidenceId) === index
  ));
}

async function fetchActualRoute(route, label, expectedTemplate = null) {
  const response = await fetch(`${RENDER_ORIGIN}${route}`);
  const html = await response.text();
  if (!response.ok) {
    throw new Error(`${label}: rendered route ${route} returned HTTP ${response.status}.`);
  }
  return parseRenderedPage(html, route, expectedTemplate);
}

async function main() {
  if (!SERVICE) throw new Error('Pilot-training service is not configured.');
  const registry = await loadIndiaGeographicRegistry();
  const registryPlaceNameIndex = buildRegistryPlaceNameIndex(registry.records);
  const priorCandidates = PRIOR_REPORT_PATHS.flatMap((reportPath) => {
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    return report.candidates || [];
  });
  const menuUrl = new URL('Menu-en-GB.html', AIP_BASE_URL).toString();
  const menuHtml = await fetchText(menuUrl, 'AAI India AIP menu');
  const menuText = htmlText(menuHtml);
  const effectiveDateText = menuText.match(
    /\bEffective\s+(\d{2}\s+[A-Z]{3}\s+\d{4})\s+-\s+PART 1\b/i,
  )?.[1];
  if (!effectiveDateText) throw new Error('AAI India AIP menu has no effective date.');
  const sourceDate = effectiveDateToIso(effectiveDateText);
  const airports = extractAirportLinks(menuHtml);
  if (!airports.length) throw new Error('AAI India AIP menu has no AD 2.1 aerodrome records.');

  const aipRecords = await mapConcurrent(airports, MAX_CONCURRENT_REQUESTS, async (airport) => {
    const sourceUrl = new URL(airport.href.replace(/ /g, '%20'), AIP_BASE_URL).toString();
    const sourceText = htmlText(await fetchText(sourceUrl, `AAI AIP ${airport.icao}`));
    const parsed = parseAipAirport(sourceText, airport);
    return {
      ...airport,
      sourceUrl,
      parsed,
      sourceState: stateFromOperatorField(parsed.operatorField),
    };
  });
  const accepted = new Map();
  const ambiguous = [];
  const unmatched = [];
  const previouslyAudited = [];
  const duplicateRecords = [];
  const rejected = [];

  for (const airport of aipRecords) {
    let resolved = null;
    let resolutionMethod = 'registry-exact-name';
    let ambiguityReason = null;
    if (airport.sourceState) {
      const stateMatch = await resolveSettlementWithState(
        airport.airportName,
        airport.sourceState,
      );
      if (stateMatch.result?.location) {
        resolved = stateMatch.result;
        resolutionMethod = `airport-name+source-state:${airport.sourceState}`;
        ambiguityReason = validateResolvedSourceIdentity(
          airport.airportName,
          airport.sourceState,
          resolved.location,
          registryPlaceNameIndex,
        );
        if (ambiguityReason) resolved = null;
      } else if (stateMatch.ambiguous) {
        ambiguityReason = stateMatch.reason;
      }
    } else {
      try {
        resolved = await resolveIndiaGeographicLocation(
          airport.airportName,
          { country: 'India' },
        );
        if (resolved?.location) {
          ambiguityReason = validateResolvedSourceIdentity(
            airport.airportName,
            null,
            resolved.location,
            registryPlaceNameIndex,
          );
          if (ambiguityReason) resolved = null;
        } else {
          resolved = null;
        }
      } catch (error) {
        if (/Geographic (?:alias|slug) ".*" is ambiguous/.test(error.message)) {
          ambiguityReason = error.message;
        } else {
          throw error;
        }
      }
    }

    if (resolved?.location && airport.sourceState
      && normalize(resolved.location.state) !== normalize(airport.sourceState)) {
      resolved = null;
      ambiguityReason = `Registry state does not match the AIP operator address state ${airport.sourceState}.`;
    }
    if (!resolved?.location) {
      const servedPlace = servedPlaceFromLocationField(airport.parsed.locationField);
      if (servedPlace) {
        if (airport.sourceState) {
          const servedMatch = await resolveSettlementWithState(
            servedPlace,
            airport.sourceState,
          );
          if (servedMatch.result?.location) {
            resolved = servedMatch.result;
            resolutionMethod = `aip-city-served:${servedPlace}+source-state:${airport.sourceState}`;
            ambiguityReason = validateResolvedSourceIdentity(
              servedPlace,
              airport.sourceState,
              resolved.location,
              registryPlaceNameIndex,
            );
            if (ambiguityReason) resolved = null;
            else ambiguityReason = null;
          } else if (servedMatch.ambiguous) {
            ambiguityReason = servedMatch.reason;
          }
        } else {
          try {
            resolved = await resolveIndiaGeographicLocation(servedPlace, { country: 'India' });
            if (resolved.location
              && !['city', 'town', 'populated-place', 'village', 'locality', 'neighborhood']
                .includes(resolved.location.type)) {
              resolved = null;
            }
            if (resolved?.location) {
              resolutionMethod = `aip-city-served:${servedPlace}`;
              ambiguityReason = validateResolvedSourceIdentity(
                servedPlace,
                null,
                resolved.location,
                registryPlaceNameIndex,
              );
              if (ambiguityReason) resolved = null;
              else ambiguityReason = null;
            }
          } catch (error) {
            if (/Geographic (?:alias|slug) ".*" is ambiguous/.test(error.message)) {
              ambiguityReason = error.message;
            } else {
              throw error;
            }
          }
        }
      }
    }
    if (!resolved?.location) {
      const details = {
        airport: airport.airportName,
        airportCode: airport.icao,
        sourceUrl: airport.sourceUrl,
        sourceState: airport.sourceState,
      };
      if (ambiguityReason) {
        ambiguous.push({ ...details, status: 'AMBIGUOUS', reason: ambiguityReason });
      } else {
        unmatched.push({
          ...details,
          status: 'UNMATCHED',
          reason: 'No exact registry identity resolved from the aerodrome name or AIP city/town-served field.',
        });
      }
      continue;
    }

    const { location, hierarchy } = resolved;
    const priorMatch = findPriorIdentityMatch(priorCandidates, location, hierarchy);
    if (priorMatch?.status === 'DUPLICATE') {
      previouslyAudited.push({
        airport: airport.airportName,
        airportCode: airport.icao,
        location: location.canonicalName || location.name,
        locationId: location.id,
        priorLocationId: priorMatch.candidate.locationId || location.id,
        state: location.state || null,
        sourceUrl: new URL(airport.href.replace(/ /g, '%20'), AIP_BASE_URL).toString(),
        status: 'ALREADY_AUDITED_IDENTITY',
      });
      continue;
    }
    if (priorMatch?.status === 'AMBIGUOUS') {
      ambiguous.push({
        airport: airport.airportName,
        airportCode: airport.icao,
        location: location.canonicalName || location.name,
        locationId: location.id,
        sourceUrl: new URL(airport.href.replace(/ /g, '%20'), AIP_BASE_URL).toString(),
        sourceState: airport.sourceState,
        status: 'AMBIGUOUS',
        reason: 'A prior audit contains the same name/state/type but lacks enough hierarchy to verify whether this registry ID is the same place.',
      });
      continue;
    }

    const key = hierarchyIdentityKey(location, hierarchy) || location.id;
    if (accepted.has(key)) {
      accepted.get(key).aerodromes.push(airport);
      duplicateRecords.push({
        airport: airport.airportName,
        airportCode: airport.icao,
        location: location.canonicalName || location.name,
        locationId: location.id,
        sourceUrl: new URL(airport.href.replace(/ /g, '%20'), AIP_BASE_URL).toString(),
        status: 'DUPLICATE_CANDIDATE_IDENTITY',
      });
      continue;
    }

    const canonical = await resolveIndiaGeographicRoute(location.slug);
    const hierarchyValid = canonical.location?.id === location.id
      && validateHierarchy(canonical.location, canonical.hierarchy);
    const servicePolicy = getIndiaDynamicServicePolicy(SERVICE, location);
    if (!hierarchyValid || !servicePolicy) {
      rejected.push({
        airport: airport.airportName,
        airportCode: airport.icao,
        location: location.canonicalName || location.name,
        locationId: location.id,
        sourceUrl: new URL(airport.href.replace(/ /g, '%20'), AIP_BASE_URL).toString(),
        status: !hierarchyValid ? 'INVALID_HIERARCHY_OR_RESOLVER' : 'UNSUPPORTED_SERVICE',
      });
      continue;
    }

    accepted.set(key, {
      location: canonical.location,
      hierarchy: canonical.hierarchy,
      route: `/${canonical.location.slug}/${SERVICE.slug}`,
      aerodromes: [airport],
      resolutionMethod,
      countryCode: canonical.location.countryCode,
      state: canonical.location.state
        || canonical.hierarchy.findLast(({ type }) => type === 'state')?.name
        || null,
    });
  }

  const aviationCandidates = [...accepted.values()].slice(0, REQUESTED_CANDIDATES);
  const supplementalCandidates = await selectSupplementalRegistryCandidates({
    count: Math.max(0, REQUESTED_CANDIDATES - aviationCandidates.length),
    priorCandidates,
    acceptedCandidates: aviationCandidates,
    registry,
  });
  const candidatePool = [...aviationCandidates, ...supplementalCandidates];
  const candidateIdentityKeys = candidatePool.map(({ location, hierarchy }) => (
    hierarchyIdentityKey(location, hierarchy)
  ));
  if (candidatePool.length !== REQUESTED_CANDIDATES
    || new Set(candidatePool.map(({ location }) => location.id)).size !== REQUESTED_CANDIDATES
    || new Set(candidateIdentityKeys).size !== REQUESTED_CANDIDATES) {
    throw new Error('The audit batch must contain exactly 100 distinct, exact-ID geographic identities.');
  }
  const candidateReports = await mapConcurrent(candidatePool, MAX_CONCURRENT_REQUESTS, async (candidate) => {
    const aipEvidence = await mapConcurrent(candidate.aerodromes, 2, async (airport) => {
      const { parsed, sourceUrl } = airport;
      return {
        geographicRecordId: candidate.location.id,
        country: candidate.location.country,
        stateProvince: candidate.state,
        districtRegion: candidate.hierarchy.find(({ type }) => type === 'district')?.name || null,
        cityTownLocality: candidate.location.canonicalName || candidate.location.name,
        evidenceId: `aai-aip:${airport.icao}:${candidate.location.id}`,
        evidenceOrganisation: 'Airports Authority of India (AAI)',
        facilityName: parsed.facilityName,
        organizationFacilityName: parsed.facilityName,
        evidenceType: 'official-aerodrome-record',
        sourceGeographicRecordId: candidate.location.id,
        sourceUrl,
        sourceTitle: `India AIP AD 2.1/2.2 — ${airport.icao} ${parsed.facilityName}`,
        sourceDate,
        sourceDateBasis: `AAI eAIP menu states Effective ${effectiveDateText}.`,
        verificationDate: new Date().toISOString().slice(0, 10),
        relationship: 'REGIONAL_CONTEXT',
        aviationRelevance: 'Official aerodrome location and published administrative context; not evidence of pilot-training approval or availability.',
        regulatoryAuthority: AVIATION_REGULATORY_CONTEXTS.India.authority,
        factualStatement: `The AAI India AIP identifies ${airport.icao} as ${parsed.facilityName} and records this AD 2.2 city/town relationship: "${parsed.locationField}". This is aerodrome context only; it does not establish a flying school, FTO or training base.`,
      };
    });
    const evidence = evidenceForCandidate(candidate, aipEvidence);

    const routeData = await resolveGeographicServicePage({
      location: candidate.location.slug,
      service: SERVICE.slug,
    });
    if (!routeData.props) {
      throw new Error(`Resolver did not return page props for ${candidate.route}.`);
    }
    const { location, service, content, engineLocations, geographicDataValidated } = routeData.props;
    if (location.id !== candidate.location.id
      || !validateHierarchy(location, candidate.hierarchy)) {
      throw new Error(`Resolver hierarchy changed for exact registry identity ${candidate.location.id}.`);
    }
    const pageModel = buildLocationPageModel({
      location,
      service,
      content,
      siteOrigin: 'https://weoneaviation.in',
      locations: engineLocations,
      geographicDataValidated,
    });
    const actual = await fetchActualRoute(
      candidate.route,
      'Candidate page',
      'registry-pilot-training',
    );
    const allText = actual.renderedText;
    const normalizedRenderedText = normalize(allText);
    const renderedEvidence = evidence.map((record) => ({
      ...record,
      visibleInRenderedPage: normalizedRenderedText.includes(
        normalize(record.evidenceOrganisation),
      ),
    }));
    const claims = unsupportedClaims(allText);
    const actualSnapshot = {
      slug: candidate.location.slug,
      name: candidate.location.canonicalName || candidate.location.name,
      body: allText,
      title: pageModel.metadata.title,
      description: pageModel.metadata.description,
      h1: actual.h1,
      serviceSlug: SERVICE.slug,
      locationNames: candidate.hierarchy.map(({ name }) => name),
      faqs: actual.faqs,
      sections: actual.sections,
    };
    const currentTier = content.locationPilotTrainingPage?.evidenceProfile?.level || 'THIN';
    const directPilotTrainingEvidenceCount = evidence.filter(({ evidenceType, relationship }) => (
      PILOT_TRAINING_EVIDENCE_TYPES.has(evidenceType)
      && relationship === 'DIRECT'
    )).length;
    const visibleDirectPilotTrainingEvidenceCount = renderedEvidence.filter((
      {
        evidenceType,
        relationship,
        visibleInRenderedPage,
        pilotTrainingRelevance,
      },
    ) => (
      PILOT_TRAINING_EVIDENCE_TYPES.has(evidenceType)
      && relationship === 'DIRECT'
      && visibleInRenderedPage
      && pilotTrainingRelevance !== 'historical-not-operational'
    )).length;
    const substantiveEvidence = renderedEvidence.filter(({
      evidenceType,
      relationship,
      pilotTrainingRelevance,
    }) => (
      !AIRPORT_EVIDENCE_TYPES.has(evidenceType)
      && evidenceType !== 'medical-centre'
      && relationship !== 'SUPPORTING'
      && pilotTrainingRelevance !== 'historical-not-operational'
    ));
    const visibleSubstantiveTypes = new Set(substantiveEvidence
      .filter(({ visibleInRenderedPage }) => visibleInRenderedPage)
      .map(({ evidenceType }) => evidenceType));
    const visibleTrainingEvidenceCount = renderedEvidence.filter(({
      evidenceType,
      visibleInRenderedPage,
      pilotTrainingRelevance,
    }) => (
      PILOT_TRAINING_EVIDENCE_TYPES.has(evidenceType)
      && visibleInRenderedPage
      && pilotTrainingRelevance !== 'historical-not-operational'
    )).length;
    const hierarchyVisible = candidate.hierarchy
      .filter(({ type }) => ['country', 'state', 'district', 'city', 'town', 'populated-place'].includes(type))
      .every(({ name }) => normalizedRenderedText.includes(normalize(name)));
    const regulatorVisible = normalizedRenderedText.includes(
      normalize(AVIATION_REGULATORY_CONTEXTS.India.authority),
    );
    const realisticPathwayVisible = /\b(?:CPL|commercial pilot|pilot licen[cs]ing|licen[cs]e requirements)\b/i
      .test(allText);
    const relationshipStatement = content.locationPilotTrainingPage?.relationship || '';
    const weOneRoleVisible = normalizedRenderedText.includes(
      normalize("We One Aviation's role"),
    ) && Boolean(relationshipStatement)
      && normalizedRenderedText.includes(normalize(relationshipStatement));
    const strongEvidenceVisible = currentTier === 'STRONG'
      && hierarchyVisible
      && regulatorVisible
      && realisticPathwayVisible
      && weOneRoleVisible
      && visibleTrainingEvidenceCount > 0
      && evidence.filter(({ evidenceType }) => !AIRPORT_EVIDENCE_TYPES.has(evidenceType)
        && evidenceType !== 'medical-centre').length >= 2
      && visibleSubstantiveTypes.size >= 2
      && substantiveEvidence.some(({ evidenceType }) => (
        PILOT_TRAINING_EVIDENCE_TYPES.has(evidenceType)
      ))
      && new Set(evidence.map(({ sourceUrl }) => sourceUrl)).size >= 2;
    const evidenceTier = strongEvidenceVisible
      ? 'STRONG'
      : evidence.some(({ evidenceType }) => !AIRPORT_EVIDENCE_TYPES.has(evidenceType))
        ? 'MEDIUM'
        : 'THIN';
    const qualityPassed = isGeographicPageQualityEligible({
      location,
      service,
      content,
      quality: content.quality,
    });
    const approved = isApprovedGeographicRoute(pageModel.metadata.canonical
      .replace('https://weoneaviation.in', ''));

    return {
      location: candidate.location.canonicalName || candidate.location.name,
      locationId: candidate.location.id,
      route: candidate.route,
      country: candidate.location.country,
      countryCode: candidate.location.countryCode,
      geographicType: candidate.location.type,
      geographySource: {
        publisher: candidate.location.source || null,
        sourceUrl: candidate.location.sourceLinks?.[0]?.href || candidate.location.sourceUrl || null,
        sourceTitle: candidate.location.sourceLinks?.[0]?.title || null,
        scope: candidate.location.sourceLinks?.[0]?.scope || candidate.location.sourceAttribution || null,
      },
      hierarchy: candidate.hierarchy.map(({ id, name, type }) => ({ id, name, type })),
      identityResolutionMethod: candidate.resolutionMethod,
      geographicIdentityValid: candidate.location.countryCode === 'IN',
      hierarchyValid: validateHierarchy(candidate.location, candidate.hierarchy),
      regulator: {
        authority: AVIATION_REGULATORY_CONTEXTS.India.authority,
        source: AVIATION_REGULATORY_CONTEXTS.India.source,
      },
      supportStatus: evidence.length ? 'AVIATION_SOURCE_BACKED' : 'GEOGRAPHY_ONLY',
      evidenceTier,
      evidenceTierReason: evidenceTier === 'STRONG'
        ? 'Direct DGCA pilot-training evidence or multiple distinct visible aviation evidence types are linked to this exact location; existing quality, differentiation, approval and indexability gates still apply.'
        : evidenceTier === 'MEDIUM'
          ? 'Location-specific pilot-training evidence exists at this place or its verified parent geography, but the evidence/content does not meet the STRONG qualification.'
          : evidence.some(({ evidenceType }) => AIRPORT_EVIDENCE_TYPES.has(evidenceType))
            ? 'Only official aerodrome evidence is linked; airport-only evidence remains THIN and cannot qualify as STRONG.'
            : 'No qualifying pilot-training evidence is linked to this exact registry identity; geography-only and medical-only evidence remain THIN.',
      currentEngineEvidenceTier: currentTier,
      evidence: renderedEvidence,
      sourceCount: new Set(evidence.map(({ sourceUrl }) => sourceUrl)).size,
      directAviationEvidenceCount: evidence.filter(({ relationship, evidenceType }) => (
        relationship === 'DIRECT' && evidenceType !== 'medical-centre'
      )).length,
      regionalAviationEvidenceCount: evidence.filter(
        ({ relationship }) => relationship === 'REGIONAL_CONTEXT',
      ).length,
      directPilotTrainingEvidenceCount,
      visibleDirectPilotTrainingEvidenceCount,
      strongContentChecks: {
        engineProfileStrong: currentTier === 'STRONG',
        hierarchyVisible,
        regulatorVisible,
        realisticPilotTrainingPathwayVisible: realisticPathwayVisible,
        actualWeOneRoleVisible: weOneRoleVisible,
        visibleTrainingEvidenceCount,
        distinctVisibleSubstantiveEvidenceTypes: visibleSubstantiveTypes.size,
      },
      airportOnlyEvidence: evidence.length > 0
        && evidence.every(({ evidenceType }) => AIRPORT_EVIDENCE_TYPES.has(evidenceType)),
      onlyMedicalEvidence: evidence.length > 0
        && evidence.every(({ evidenceType }) => evidenceType === 'medical-centre'),
      noVerifiedAviationEvidence: evidence.length === 0,
      qualityGatePassed: qualityPassed,
      qualityScore: pageModel.composedQuality?.score ?? null,
      engineDifferentiationStatus: content.quality?.differentiation?.status
        || content.differentiation?.status
        || null,
      engineDifferentiationScore: content.quality?.differentiation?.metrics?.normalizedSimilarityPercent
        ?? content.differentiation?.normalizedSimilarityPercent
        ?? null,
      renderedPage: {
        status: 200,
        template: actual.template,
        state: actual.state,
        evidenceTier: actual.evidenceTier,
        h1: actual.h1,
        robots: actual.robots,
        canonical: actual.canonical,
        sections: actual.sectionCategories,
        faqCount: actual.faqCount,
        wordCount: actual.wordCount,
        evidenceOrganisationsVisible: renderedEvidence
          .filter(({ visibleInRenderedPage }) => visibleInRenderedPage)
          .map(({ evidenceOrganisation }) => evidenceOrganisation),
      },
      renderedSnapshot: actualSnapshot,
      unsupportedClaims: claims,
      productionApproved: approved,
      currentPageModelState: pageModel.state,
      indexabilityState: pageModel.state,
      sitemapEligible: pageModel.sitemapEligible,
      pageModelIndexable: pageModel.indexable,
    };
  });

  const productionPairs = getApprovedLocationServicePairs()
    .filter(({ service }) => service.slug === SERVICE.slug);
  const productionPages = await mapConcurrent(productionPairs, MAX_CONCURRENT_REQUESTS, async ({
    location,
  }) => {
    const route = `/${location.slug}/${SERVICE.slug}`;
    const rendered = await fetchActualRoute(route, 'Approved production baseline');
    return {
      slug: location.slug,
      name: location.name || location.city,
      route,
      locationNames: [location.name, location.city, location.state].filter(Boolean),
      body: rendered.renderedText,
      renderedState: rendered.state,
      robots: rendered.robots,
      canonical: rendered.canonical,
      template: rendered.template,
      serviceSlug: SERVICE.slug,
      faqs: [],
      sections: [],
    };
  });

  const candidateSnapshots = candidateReports.map(({ renderedSnapshot }) => renderedSnapshot);
  const pairwiseScores = [];
  for (let leftIndex = 0; leftIndex < candidateSnapshots.length; leftIndex += 1) {
    const comparisons = [
      ...productionPages,
      ...candidateSnapshots.filter((_, rightIndex) => rightIndex !== leftIndex),
    ];
    const result = assessContentDifferentiation({
      candidate: candidateSnapshots[leftIndex],
      comparisons,
      policy: DIFFERENTIATION_POLICY,
    });
    candidateReports[leftIndex].actualRenderedDifferentiation = {
      status: result.status,
      passed: result.status === 'PASSED',
      score: result.metrics.normalizedSimilarityPercent,
      differentiationScore: Number((100 - result.metrics.normalizedSimilarityPercent).toFixed(1)),
      exactDuplicate: result.exactDuplicate,
      exactDuplicatePercent: result.metrics.exactDuplicatePercent,
      comparisonCount: result.metrics.comparisonCount,
      thresholdPercent: DIFFERENTIATION_POLICY.maxNormalizedSimilarityPercent,
      reasons: result.reasons,
    };
    for (const comparison of result.comparisons) {
      const rightIndex = candidateSnapshots.findIndex(({ slug }) => slug === comparison.slug);
      if (rightIndex <= leftIndex || rightIndex < 0) continue;
      pairwiseScores.push(comparison);
    }
  }

  for (const candidate of candidateReports) {
    const differentiationPassed = candidate.actualRenderedDifferentiation.passed;
    const currentPolicyPassed = candidate.evidenceTier === 'STRONG'
      && candidate.qualityGatePassed
      && differentiationPassed
      && candidate.unsupportedClaims.length === 0
      && candidate.productionApproved
      && candidate.pageModelIndexable
      && candidate.renderedPage.state === 'INDEXABLE'
      && robotsAllowIndexing(candidate.renderedPage.robots)
      && candidate.sitemapEligible;
    candidate.indexabilityState = currentPolicyPassed ? 'INDEXABLE' : 'NOINDEX';
    candidate.sitemapEligible = currentPolicyPassed;
  }
  const productionRouteConsistency = productionPages.map((page) => {
    const expectedCanonical = `https://weoneaviation.in${page.route}`;
    const passed = page.renderedState === 'INDEXABLE'
      && robotsAllowIndexing(page.robots)
      && page.canonical === expectedCanonical;
    return {
      route: page.route,
      status: passed ? 'PASSED' : 'FAILED',
      state: page.renderedState,
      robots: page.robots,
      canonical: page.canonical,
    };
  });
  const similarities = candidateReports.map(
    ({ actualRenderedDifferentiation }) => actualRenderedDifferentiation.score,
  );
  const differentiationScores = candidateReports.map(
    ({ actualRenderedDifferentiation }) => actualRenderedDifferentiation.differentiationScore,
  );
  const unsupported = candidateReports.flatMap(({ route, unsupportedClaims: claims }) => (
    claims.map((claim) => ({ route, claim }))
  ));
  const tierCounts = candidateReports.reduce((counts, candidate) => {
    counts[candidate.evidenceTier] += 1;
    return counts;
  }, { STRONG: 0, MEDIUM: 0, THIN: 0 });
  const evidenceRecords = candidateReports.flatMap(({ evidence }) => evidence);
  const sourceDomains = [...new Set(evidenceRecords.map(({ sourceUrl }) => (
    new URL(sourceUrl).hostname
  )))].sort();
  const evidenceTypes = [...new Set(evidenceRecords.map(({ evidenceType }) => evidenceType))].sort();
  const indexabilityCounts = candidateReports.reduce((counts, candidate) => {
    counts[candidate.indexabilityState] = (counts[candidate.indexabilityState] || 0) + 1;
    return counts;
  }, { INDEXABLE: 0, NOINDEX: 0 });
  const pairCount = pairwiseScores.length;
  const exactDuplicatePairs = pairwiseScores.filter(({ exactDuplicate }) => exactDuplicate);
  const nearDuplicatePairs = pairwiseScores.filter(({ normalizedSimilarityPercent }) => (
    normalizedSimilarityPercent >= DIFFERENTIATION_POLICY.maxNormalizedSimilarityPercent
  ));
  const qualityDistribution = {
    '0-20': 0,
    '20-40': 0,
    '40-60': 0,
    '60-70': 0,
    '70-80': 0,
    '80-90': 0,
    '90-100': 0,
  };
  for (const candidate of candidateReports) {
    const score = candidate.qualityScore;
    if (!Number.isFinite(score) || score < 0 || score > 100) continue;
    if (score < 20) qualityDistribution['0-20'] += 1;
    else if (score < 40) qualityDistribution['20-40'] += 1;
    else if (score < 60) qualityDistribution['40-60'] += 1;
    else if (score < 70) qualityDistribution['60-70'] += 1;
    else if (score < 80) qualityDistribution['70-80'] += 1;
    else if (score < 90) qualityDistribution['80-90'] += 1;
    else qualityDistribution['90-100'] += 1;
  }
  const report = {
    schemaVersion: 1,
    phase: '4O',
    generatedAt: new Date().toISOString(),
    scope: {
      requestedCandidateLimit: REQUESTED_CANDIDATES,
      officialAipAerodromesDiscovered: airports.length,
      newGeographicIdentitiesEvaluated: candidateReports.length,
      supplementalRegistryIdentitiesAdded: supplementalCandidates.length,
      unfilledCandidateSlots: Math.max(0, REQUESTED_CANDIDATES - candidateReports.length),
      completionStatus: candidateReports.length === REQUESTED_CANDIDATES
        ? 'COMPLETE_100_EVALUATED'
        : 'INCOMPLETE',
      selection: 'Prioritize new exact-identity AAI eAIP aerodrome evidence. Supplement with exact-ID city/town/populated-place registry identities not previously evaluated or production-approved, prioritizing location-linked aviation evidence from reviewed inventories. Do not merge same-name records; unresolved same-parent alternate IDs are AMBIGUOUS.',
      sourceLimitReason: candidateReports.length < REQUESTED_CANDIDATES
        ? `Only ${candidateReports.length} exact, new, resolvable registry identities were evaluated; the required batch size is ${REQUESTED_CANDIDATES}.`
        : null,
      sourceDate,
      sourceDateBasis: `AAI India eAIP menu states Effective ${effectiveDateText}.`,
      verificationDate: new Date().toISOString().slice(0, 10),
      renderOrigin: RENDER_ORIGIN,
    },
    policy: {
      differentiationThresholdPercent: DIFFERENTIATION_POLICY.maxNormalizedSimilarityPercent,
      productionApprovalChanged: false,
      productionApprovalsAdded: 0,
      sitemapChanged: false,
      airportOnlyEvidenceCanQualifyStrong: false,
      airportOnlyEvidenceTier: 'THIN',
      tierAloneGrantsIndexability: false,
      pageTemplateChanged: false,
      actualRenderedPageEvaluator: 'Next.js Pages Router SSR HTML from pages/[location]/[service].jsx; candidate comparison uses the actual <main> text.',
    },
    source: {
      publisher: 'Airports Authority of India (AAI), India eAIP',
      menuUrl,
      sourceDate,
      sourceDateBasis: `The official eAIP menu states Effective ${effectiveDateText}.`,
      pageSection: 'AD 2.1 and AD 2.2',
    },
    geographyRegistrySource: {
      publisher: 'GeoNames',
      url: 'https://download.geonames.org/export/dump/',
      scope: 'Geographic names, feature types, administrative codes and hierarchy only; not evidence of aviation services or business presence.',
    },
    summary: {
      candidatesEvaluated: candidateReports.length,
      genuinelyNewGeographicIdentities: new Set(candidateIdentityKeys).size,
      tierCounts,
      qualityQualifiedCount: candidateReports.filter(({ qualityGatePassed }) => qualityGatePassed).length,
      differentiationQualifiedCount: candidateReports.filter(
        ({ actualRenderedDifferentiation }) => actualRenderedDifferentiation.passed,
      ).length,
      indexabilityCounts,
      rejectedCount: rejected.length,
      ambiguousCount: ambiguous.length,
      duplicateOrAlternateIdCount: previouslyAudited.length + duplicateRecords.length,
      evidenceRecordCount: evidenceRecords.length,
      evidenceTypes,
      sourceDomains,
      candidatesWithDirectPilotTrainingEvidence: candidateReports.filter(
        ({ directPilotTrainingEvidenceCount }) => directPilotTrainingEvidenceCount > 0,
      ).length,
      candidatesWithRegionalPilotTrainingEvidence: candidateReports.filter(({ evidence }) => (
        evidence.some(({ evidenceType, relationship }) => (
          PILOT_TRAINING_EVIDENCE_TYPES.has(evidenceType)
          && relationship === 'REGIONAL_CONTEXT'
        ))
      )).length,
      candidatesWithOnlyAirportEvidence: candidateReports.filter(({ airportOnlyEvidence }) => airportOnlyEvidence).length,
      candidatesWithOnlyMedicalEvidence: candidateReports.filter(
        ({ onlyMedicalEvidence }) => onlyMedicalEvidence,
      ).length,
      candidatesWithNoVerifiedAviationEvidence: candidateReports.filter(
        ({ noVerifiedAviationEvidence }) => noVerifiedAviationEvidence,
      ).length,
      averageActualRenderedSimilarityPercent: similarities.length
        ? Number((similarities.reduce((sum, value) => sum + value, 0) / similarities.length).toFixed(1))
        : null,
      minimumActualRenderedSimilarityPercent: similarities.length ? Math.min(...similarities) : null,
      maximumActualRenderedSimilarityPercent: similarities.length ? Math.max(...similarities) : null,
      averageDifferentiationScore: differentiationScores.length
        ? Number((differentiationScores.reduce((sum, value) => sum + value, 0) / differentiationScores.length).toFixed(1))
        : null,
      minimumDifferentiationScore: differentiationScores.length ? Math.min(...differentiationScores) : null,
      maximumDifferentiationScore: differentiationScores.length ? Math.max(...differentiationScores) : null,
      exactDuplicatePairs: exactDuplicatePairs.length,
      nearDuplicatePairsAtOrAboveThreshold: nearDuplicatePairs.length,
      nearDuplicateRatePercent: pairCount
        ? Number((nearDuplicatePairs.length / pairCount * 100).toFixed(1))
        : 0,
      unsupportedClaimCount: unsupported.length,
      renderedEvidenceTierConflictCount: candidateReports.filter(
        ({ evidenceTier, renderedPage }) => evidenceTier !== renderedPage.evidenceTier,
      ).length,
      resolverOrHierarchyConflicts: candidateReports.filter(
        ({ geographicIdentityValid, hierarchyValid }) => !geographicIdentityValid || !hierarchyValid,
      ).length,
      approvalConflicts: candidateReports.filter(
        ({ productionApproved, indexabilityState }) => productionApproved
          && indexabilityState !== 'INDEXABLE',
      ).length,
      productionBaselineRouteCount: productionRouteConsistency.length,
      productionBaselineRoutesRendered: productionRouteConsistency.filter(
        ({ status }) => status === 'PASSED',
      ).length,
      averageVisibleWordCount: candidateReports.length
        ? Number((candidateReports.reduce(
          (sum, candidate) => sum + candidate.renderedPage.wordCount,
          0,
        ) / candidateReports.length).toFixed(1))
        : 0,
    },
    unresolved: {
      ambiguous,
      unmatched,
      previouslyAudited,
      duplicateRecords,
      rejected,
    },
    qualityDistribution,
    productionRouteConsistency,
    renderedEvidenceTierConflicts: candidateReports.flatMap((candidate) => (
      candidate.evidenceTier === candidate.renderedPage.evidenceTier
        ? []
        : [{
          location: candidate.location,
          locationId: candidate.locationId,
          route: candidate.route,
          auditTier: candidate.evidenceTier,
          renderedTier: candidate.renderedPage.evidenceTier,
          evidenceTypes: candidate.evidence.map(({ evidenceType }) => evidenceType),
        }]
    )),
    exactDuplicates: exactDuplicatePairs,
    strongCandidates: candidateReports.filter(({ evidenceTier }) => evidenceTier === 'STRONG')
      .map((candidate) => ({
        location: candidate.location,
        locationId: candidate.locationId,
        hierarchy: candidate.hierarchy,
        regulator: candidate.regulator,
        aviationEvidence: candidate.evidence,
        differentiationScore: candidate.actualRenderedDifferentiation.differentiationScore,
        qualityScore: candidate.qualityScore,
        finalRecommendation: candidate.indexabilityState,
      })),
    unsupportedClaims: unsupported,
    candidates: candidateReports.map(({ renderedSnapshot, ...candidate }) => candidate),
  };
  fs.writeFileSync(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify({
    report: path.relative(ROOT, REPORT_PATH),
    summary: report.summary,
    sourceLimit: report.scope.sourceLimitReason,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
