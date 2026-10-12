import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS,
  PRODUCTION_LOCATION_PROMOTION_EVALUATIONS,
} from '../data/location-seo/production-candidate-registry.js';
import { SERVICES } from '../data/location-seo/services.js';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import {
  getApprovedLocationServiceRoutes,
  getLocationEngineContext,
  getLocationServiceContent,
  isLocationServiceIndexable,
} from '../lib/locationSeo.js';
import { GEOGRAPHIC_INDEXABILITY_POLICY } from '../data/location-seo/geographic-indexability-policy.js';

const indiaCandidates = PROMOTED_PRODUCTION_LOCATION_SERVICE_PAIRS
  .filter(({ location }) => location.countryCode === 'IN');
const indiaRoutes = getApprovedLocationServiceRoutes();
const testedPages = [];
const supportedIntents = new Set([
  'pilot-training',
  'dgca-ground-classes',
  'commercial-pilot-training',
  'cpl-training',
]);

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function collectSchemaTypes(value, types = new Set()) {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSchemaTypes(item, types));
  } else if (value && typeof value === 'object') {
    if (typeof value['@type'] === 'string') types.add(value['@type']);
    if (Array.isArray(value['@type'])) value['@type'].forEach((type) => types.add(type));
    Object.values(value).forEach((item) => collectSchemaTypes(item, types));
  }
  return types;
}

function validateBuiltHtml(route, content) {
  const pagePath = path.join(
    process.cwd(),
    '.next',
    'server',
    'pages',
    `${route.slice(1)}.html`,
  );
  assert.ok(fs.existsSync(pagePath), `Missing built HTML for ${route}.`);
  const html = fs.readFileSync(pagePath, 'utf8');
  const canonicalTags = [...html.matchAll(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/gi)];
  const robotsTags = [...html.matchAll(/<meta\b(?=[^>]*\bname="robots")(?=[^>]*\bcontent="([^"]+)")[^>]*>/gi)];
  const descriptionTags = [...html.matchAll(/<meta\b(?=[^>]*\bname="description")(?=[^>]*\bcontent="([^"]+)")[^>]*>/gi)];
  const titleTags = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  const schemaBlocks = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];

  assert.equal(canonicalTags.length, 1, `${route} must emit one canonical tag.`);
  assert.equal(canonicalTags[0][1], `https://weoneaviation.in${route}`);
  assert.equal(robotsTags.length, 1, `${route} must emit one robots tag.`);
  assert.ok(!/\bnoindex\b/i.test(robotsTags[0][1]));
  assert.equal(descriptionTags.length, 1, `${route} must emit one description.`);
  assert.equal(titleTags.length, 1, `${route} must emit one title.`);
  assert.equal(titleTags[0][1], escapeHtml(content.title));
  assert.ok(html.includes(escapeHtml(content.h1)));
  assert.ok(html.length > 2_000, `${route} must render a substantial content body.`);
  assert.ok(schemaBlocks.length > 0, `${route} must emit JSON-LD.`);

  const schemaTypes = new Set();
  for (const [, json] of schemaBlocks) {
    collectSchemaTypes(JSON.parse(json), schemaTypes);
  }
  assert.ok(schemaTypes.has('FAQPage'), `${route} must emit FAQPage schema.`);
  assert.ok(schemaTypes.has('BreadcrumbList'), `${route} must emit BreadcrumbList schema.`);
  assert.ok(!schemaTypes.has('LocalBusiness'), `${route} must not invent a local business entity.`);

  for (const { href } of content.locationAviationContent.sourceLinks) {
    assert.ok(html.includes(href), `${route} must render the verified source ${href}.`);
  }
}

assert.ok(indiaCandidates.length >= 5 && indiaCandidates.length <= 20);

for (const { location, service, content, promotion } of indiaCandidates) {
  assert.equal(service.slug, 'pilot-training');
  assert.equal(promotion.status, 'SUPPORTED');
  assert.equal(promotion.sitemapEligible, true);
  assert.equal(location.relationship, 'informational');
  assert.notEqual(location.physicalAcademy, true);
  assert.notEqual(location.physicalPresence?.verified, true);

  const context = getLocationEngineContext(location);
  assert.equal(context.geographicDataValidated, true);
  const model = buildLocationPageModel({
    location,
    service,
    content,
    locations: context.locations,
    geographicDataValidated: context.geographicDataValidated,
  });
  const route = `/${location.slug}/${service.slug}`;
  assert.ok(indiaRoutes.includes(route), `${route} must be in the approved route set.`);
  assert.equal(model.indexability, 'INDEXABLE');
  assert.equal(model.productionSitemapEligible, true);
  assert.equal(model.metadata.canonical, `https://weoneaviation.in${route}`);
  assert.match(model.metadata.robots, /\bindex,\s*follow\b/);
  assert.ok(model.metadata.title.length <= 70);
  assert.ok(model.metadata.description.length <= 180);
  assert.ok(model.metadata.h1.includes(location.city));
  assert.equal(model.schema.pageType, 'WebPage');
  assert.equal(model.schema.emitLocalBusiness, false);
  assert.equal(model.schema.faqItems.length, model.faqs.length);
  assert.ok(model.faqs.length >= 2);
  assert.ok(model.links.length >= 2);
  assert.equal(model.unsupportedClaims.length, 0);

  const aviationContent = content.locationAviationContent;
  assert.ok(aviationContent);
  assert.ok(aviationContent.geographicContext.some(({ type }) => type === 'state'));
  assert.ok(aviationContent.geographicContext.some(({ type }) => type === location.type));
  assert.ok(aviationContent.aviationFacts.length >= 3);
  assert.ok(aviationContent.sourceLinks.length >= 2);
  assert.ok(aviationContent.sourceLinks.every(({ href }) => /^https:\/\//.test(href)));

  const thresholds = GEOGRAPHIC_INDEXABILITY_POLICY.contentDifferentiation;
  assert.ok(promotion.differentiation.normalizedSimilarityPercent
    < thresholds.maxNormalizedSimilarityPercent);
  assert.ok(promotion.differentiation.uniqueFaqCount >= thresholds.minUniqueFaqs);
  assert.ok(promotion.differentiation.uniqueSectionCount >= thresholds.minUniqueSections);
  assert.ok(promotion.differentiation.aviationFactCount >= 3);
  assert.ok(promotion.differentiation.sourceCount >= 2);
  assert.ok(promotion.differentiation.geographicSpecificity >= 3);

  for (const intentSlug of supportedIntents) {
    const intent = SERVICES.find(({ slug }) => slug === intentSlug);
    assert.ok(intent, `Missing configured service intent "${intentSlug}".`);
    const intendedContent = getLocationServiceContent(location, intent);
    assert.equal(
      isLocationServiceIndexable(location, intent),
      intentSlug === 'pilot-training',
      `${location.slug} must only expose service content that passed its own gates.`,
    );
    if (intentSlug !== 'pilot-training') assert.equal(intendedContent, null);
  }

  const visibleContent = [
    content.h1,
    content.introduction,
    content.localApplication,
    ...aviationContent.aviationFacts.map(({ fact }) => fact),
    ...(aviationContent.studentPathway
      ? Object.values(aviationContent.studentPathway)
      : []),
  ].join('\n');
  assert.match(visibleContent.toLowerCase(), new RegExp(location.city.toLowerCase()));
  assert.match(visibleContent.toLowerCase(), /pilot training/);
  if (process.argv.includes('--built')) validateBuiltHtml(route, content);
  testedPages.push({
    route,
    similarity: promotion.differentiation.normalizedSimilarityPercent,
    sources: aviationContent.sourceLinks.length,
    facts: aviationContent.aviationFacts.length,
  });
}

assert.equal(
  PRODUCTION_LOCATION_PROMOTION_EVALUATIONS.filter(({ status }) => status === 'SUPPORTED')
    .filter(({ locationSlug }) => indiaCandidates.some(({ location }) => location.slug === locationSlug))
    .length,
  indiaCandidates.length,
);

console.log(JSON.stringify({
  result: 'PASS',
  indiaIndexablePages: testedPages.length,
  pages: testedPages,
}, null, 2));
