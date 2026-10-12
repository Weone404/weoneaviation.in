import { buildLocationPageModel } from './locationEngine.js';
import {
  getRelatedLocations,
  getRelatedServices,
  isLocationServiceIndexable,
} from './locationSeo.js';

const RENDERED_MODEL_FIELDS = [
  'canRender',
  'supportStatus',
  'renderStatus',
  'indexability',
  'template',
  'renderable',
  'indexable',
  'sitemapEligible',
  'indexabilityState',
  'renderabilityState',
  'states',
  'state',
  'metadata',
  'relationship',
  'verifiedFacts',
  'regulatoryContext',
  'inheritedFactNotice',
  'serviceGuidance',
  'composedQuality',
  'qualityState',
  'indexabilityPipeline',
  'productionApproval',
  'unsupportedClaims',
  'productionSitemapEligible',
  'breadcrumbs',
  'links',
  'faqs',
];

const COMPOSED_BLOCK_FIELDS = [
  'id',
  'categoryId',
  'heading',
  'title',
  'excerpt',
  'description',
  'body',
  'sourceFile',
];

function selectDefinedFields(value, fields) {
  return Object.fromEntries(fields
    .filter((field) => value?.[field] !== undefined)
    .map((field) => [field, value[field]]));
}

function projectComposedBlocks(value) {
  if (!Array.isArray(value)) return value;
  return value.map((block) => (
    block && typeof block === 'object' && !Array.isArray(block)
      ? selectDefinedFields(block, COMPOSED_BLOCK_FIELDS)
      : block
  ));
}

function projectComposedPage(composedPage) {
  if (!composedPage) return undefined;

  const projected = selectDefinedFields(composedPage, [
    'introduction',
    'localApplication',
  ]);
  for (const field of [
    'pilotTrainingPathway',
    'cplPathway',
    'groundTraining',
    'medicalRequirements',
    'examinations',
    'flightTrainingFtoStage',
  ]) {
    if (composedPage[field] !== undefined) {
      projected[field] = projectComposedBlocks(composedPage[field]);
    }
  }

  if (composedPage.masterContent) {
    projected.masterContent = {
      blocks: projectComposedBlocks(composedPage.masterContent.blocks || []),
    };
  }
  if (composedPage.regulatoryContext) {
    projected.regulatoryContext = selectDefinedFields(
      composedPage.regulatoryContext,
      ['summary'],
    );
  }
  if (composedPage.weOneAviationRole) {
    projected.weOneAviationRole = selectDefinedFields(
      composedPage.weOneAviationRole,
      ['positioning', 'relationship'],
    );
  }

  return projected;
}

function projectLocationContent(content) {
  const projected = selectDefinedFields(content, [
    'cta',
    'introduction',
    'localApplication',
    'localContext',
    'relationshipStatement',
    'locationAviationContent',
    'serviceContent',
    'locationSpecificSections',
    'locationPilotTrainingPage',
  ]);
  const composedPage = projectComposedPage(content.composedPage);

  if (composedPage) {
    projected.composedPage = composedPage;
  }
  if (content.masterContent && !content.composedPage?.masterContent) {
    projected.masterContent = content.masterContent;
  }

  return projected;
}

function projectLocation(location) {
  const projected = selectDefinedFields(location, [
    'id',
    'slug',
    'city',
    'state',
    'country',
    'name',
    'physicalAcademy',
    'registryRecordId',
  ]);

  if (location.physicalPresence) {
    projected.physicalPresence = selectDefinedFields(
      location.physicalPresence,
      ['verified'],
    );
  }
  if (Array.isArray(location.localSections)) {
    projected.localSections = location.localSections.map((section) => ({
      ...selectDefinedFields(section, ['title', 'body', 'closing']),
      ...(Array.isArray(section.items)
        ? {
          items: section.items.map((item) => (
            selectDefinedFields(item, ['label', 'detail'])
          )),
        }
        : {}),
    }));
  }
  if (Array.isArray(location.sourceLinks)) {
    projected.sourceLinks = location.sourceLinks.map((source) => (
      selectDefinedFields(source, ['href', 'label'])
    ));
  }

  return projected;
}

function projectService(service) {
  return selectDefinedFields(service, [
    'slug',
    'shortName',
    'name',
    'serviceExplanation',
  ]);
}

function projectLocationPageModel(pageModel) {
  return selectDefinedFields(pageModel, RENDERED_MODEL_FIELDS);
}

export function prepareLocationServicePageResult(result, siteOrigin) {
  if (!result?.props) return result;

  const {
    location,
    service,
    content,
    engineLocations,
    geographicDataValidated,
    ...otherProps
  } = result.props;
  const relatedServices = getRelatedServices(service)
    .filter((relatedService) => isLocationServiceIndexable(location, relatedService))
    .map((relatedService) => projectService(relatedService));
  const relatedLocations = getRelatedLocations(location)
    .filter((relatedLocation) => isLocationServiceIndexable(relatedLocation, service))
    .map((relatedLocation) => selectDefinedFields(relatedLocation, ['slug', 'city']));
  const pageModel = buildLocationPageModel({
    location,
    service,
    content,
    siteOrigin,
    locations: engineLocations,
    geographicDataValidated,
  });

  return {
    ...result,
    props: {
      ...otherProps,
      location: projectLocation(location),
      service: projectService(service),
      content: projectLocationContent(content),
      pageModel: projectLocationPageModel(pageModel),
      relatedServices,
      relatedLocations,
    },
  };
}
