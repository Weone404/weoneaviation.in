import assert from 'node:assert/strict';
import { buildLocationPageModel } from '../lib/locationEngine.js';
import { resolveGeographicServicePage } from '../lib/geographicServicePage.js';
import { prepareLocationServicePageResult } from '../lib/locationPageProps.js';
import {
  getRelatedLocations,
  getRelatedServices,
  isLocationServiceIndexable,
} from '../lib/locationSeo.js';

const ROUTES = [
  { location: 'ahmedabad', indexable: true },
  { location: 'gachibowli', indexable: false, registryBacked: true },
  { location: 'mumbai', indexable: false },
  {
    location: 'india-sikar-district-24-111',
    indexable: false,
    registryBacked: true,
  },
];
const MAX_STATIC_PROPS_BYTES = 128 * 1024;

function bytes(value) {
  return Buffer.byteLength(JSON.stringify(value));
}

function select(value, fields) {
  return Object.fromEntries(fields
    .filter((field) => value?.[field] !== undefined)
    .map((field) => [field, value[field]]));
}

for (const { location, indexable, registryBacked = false } of ROUTES) {
  const resolved = await resolveGeographicServicePage({
    location,
    service: 'pilot-training',
  });
  assert.ok(resolved.props, `Expected /${location}/pilot-training to resolve.`);

  const { location: record, service, content, engineLocations, geographicDataValidated } = resolved.props;
  const originalModel = buildLocationPageModel({
    location: record,
    service,
    content,
    siteOrigin: 'https://weoneaviation.in',
    locations: engineLocations,
    geographicDataValidated,
  });
  const prepared = prepareLocationServicePageResult(
    resolved,
    'https://weoneaviation.in',
  );
  const props = prepared.props;
  const pageModel = props.pageModel;

  assert.equal(pageModel.renderable, originalModel.renderable, location);
  assert.equal(pageModel.indexable, originalModel.indexable, location);
  assert.equal(pageModel.indexability, originalModel.indexability, location);
  assert.equal(pageModel.sitemapEligible, originalModel.sitemapEligible, location);
  assert.equal(pageModel.state, originalModel.state, location);
  assert.equal(pageModel.qualityState, originalModel.qualityState, location);
  assert.deepEqual(pageModel.metadata, originalModel.metadata, location);
  assert.deepEqual(pageModel.breadcrumbs, originalModel.breadcrumbs, location);
  assert.deepEqual(pageModel.faqs, originalModel.schema.faqItems, location);
  assert.deepEqual(pageModel.productionApproval, originalModel.productionApproval, location);
  assert.deepEqual(pageModel.indexabilityPipeline, originalModel.indexabilityPipeline, location);

  assert.deepEqual(
    props.location.localSections,
    record.localSections?.map((section) => ({
      ...select(section, ['title', 'body', 'closing']),
      ...(Array.isArray(section.items)
        ? { items: section.items.map((item) => select(item, ['label', 'detail'])) }
        : {}),
    })),
    location,
  );
  assert.deepEqual(
    props.location.sourceLinks,
    record.sourceLinks?.map((source) => select(source, ['href', 'label'])),
    location,
  );
  assert.deepEqual(
    props.service,
    select(service, ['slug', 'shortName', 'name', 'serviceExplanation']),
    location,
  );
  assert.deepEqual(
    props.relatedServices,
    getRelatedServices(service)
      .filter((relatedService) => isLocationServiceIndexable(record, relatedService))
      .map((relatedService) => select(relatedService, ['slug', 'shortName'])),
    location,
  );
  assert.deepEqual(
    props.relatedLocations,
    getRelatedLocations(record)
      .filter((relatedLocation) => isLocationServiceIndexable(relatedLocation, service))
      .map((relatedLocation) => select(relatedLocation, ['slug', 'city'])),
    location,
  );
  assert.deepEqual(props.content.cta, content.cta, location);
  assert.deepEqual(
    props.content.locationAviationContent,
    content.locationAviationContent,
    location,
  );
  assert.equal(
    Boolean(props.location.registryRecordId),
    Boolean(record.registryRecordId),
    location,
  );
  assert.equal(Boolean(props.content.locationPilotTrainingPage), registryBacked, location);
  assert.deepEqual(
    props.content.locationPilotTrainingPage,
    content.locationPilotTrainingPage,
    location,
  );
  if (content.composedPage) {
    assert.deepEqual(
      props.content.composedPage.masterContent.blocks.map(({ id, categoryId, heading, sourceFile }) => (
        { id, categoryId, heading, sourceFile }
      )),
      content.composedPage.masterContent.blocks.map(({ id, categoryId, heading, sourceFile }) => (
        { id, categoryId, heading, sourceFile }
      )),
      location,
    );
    assert.deepEqual(
      props.content.composedPage.weOneAviationRole,
      {
        positioning: content.composedPage.weOneAviationRole.positioning,
        relationship: content.composedPage.weOneAviationRole.relationship,
      },
      location,
    );
  }
  if (content.masterContent && content.composedPage?.masterContent) {
    assert.equal(
      JSON.stringify(content.masterContent),
      JSON.stringify(content.composedPage.masterContent),
      `${location}: fixture no longer has the expected duplicate masterContent data.`,
    );
  }
  assert.equal(Object.hasOwn(props.content, 'masterContent'), false, location);
  assert.equal(Object.hasOwn(props, 'engineLocations'), false, location);
  assert.equal(Object.hasOwn(props, 'geographicDataValidated'), false, location);
  assert.equal(pageModel.metadata.robots.includes('noindex'), !indexable, location);
  assert.ok(
    bytes(props) < bytes(resolved.props),
    `${location}: the projected props must be smaller than the unprojected props.`,
  );
  assert.ok(
    bytes(props) < MAX_STATIC_PROPS_BYTES,
    `${location}: props exceed 128 KiB.`,
  );

  console.log(JSON.stringify({
    route: `/${location}/pilot-training`,
    staticPropsBytes: bytes(props),
    canonical: pageModel.metadata.canonical,
    robots: pageModel.metadata.robots,
    indexability: pageModel.indexability,
    productionApproval: pageModel.productionApproval?.state || null,
    qualityState: pageModel.qualityState,
  }));
}
