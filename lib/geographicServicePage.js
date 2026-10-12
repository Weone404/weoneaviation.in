import { getGeographicDynamicServicePolicy } from '../data/location-seo/world-dynamic-service-policies.js';
import { getIndiaDynamicServicePolicy } from '../data/location-seo/india-dynamic-service-policies.js';
import { isCanonicalIndiaGeographicNameRoute } from './indiaGeographicRouteSlug.js';
import {
  resolveIndiaGeographicLocation,
  resolveIndiaGeographicRoute,
} from './indiaGeographicRegistry.js';
import { buildIndiaLocationServiceContent } from './indiaLocationContentEngine.js';
import { getLocationForService, getLocationEngineContext, getLocationServiceContent, getServiceBySlug, isLocationServiceIndexable } from './locationSeo.js';
import { getProductionRouteApproval } from '../data/location-seo/production-route-approvals.js';
import { resolveWorldGeographicRoute } from './worldGeographicRegistry.js';
import { buildWorldLocationServiceContent } from './worldLocationContentEngine.js';
import { composeLocationContent } from './locationContentComposer.js';
import { getLocationPilotTrainingContent } from './pilotTrainingKnowledge.js';
import { resolveLocationHierarchy, resolveRegulatoryContext } from './locationEngine.js';

const ROUTE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;
const ADMINISTRATIVE_TYPES = new Set([
  'state',
  'province',
  'region',
  'county',
  'district',
  'territory',
]);

function hierarchyIsValid(record, hierarchy) {
  return Boolean(
    record
    && Array.isArray(hierarchy)
    && hierarchy.at(-1)?.id === record.id
    && hierarchy[0]?.type === 'country'
    && hierarchy[0]?.countryCode === record.countryCode
    && hierarchy.every((node, index) => (
      node.countryCode === record.countryCode
      && (index === 0 || node.parentId === hierarchy[index - 1].id)
    ))
    && (record.type === 'country'
      || hierarchy.some(({ type }) => ADMINISTRATIVE_TYPES.has(type))),
  );
}

function notFound() {
  return { notFound: true };
}

export async function resolveGeographicServicePage(params) {
  if (!params
    || typeof params.location !== 'string'
    || typeof params.service !== 'string'
    || !ROUTE_SLUG_PATTERN.test(params.location)
    || !ROUTE_SLUG_PATTERN.test(params.service)) {
    return notFound();
  }

  const service = getServiceBySlug(params.service);
  if (!service || service.renderable === false) return notFound();
  const legacyLocation = getLocationForService(params.location, service.slug);
  const routeApproval = getProductionRouteApproval(`/${params.location}/${service.slug}`);
  const explicitNoindexLegacyRoute = routeApproval.state === 'NOINDEX'
    && routeApproval.source === 'explicit-review-required';
  const approvedLegacyRoute = routeApproval.source === 'legacy-curated-approval';
  const hasPinnedRegistryRecord = Boolean(routeApproval.registry && routeApproval.recordId);
  const legacyRecordMatchesApproval = explicitNoindexLegacyRoute
    || !hasPinnedRegistryRecord
    || legacyLocation?.id === routeApproval.recordId;

  if (legacyLocation && (
    isLocationServiceIndexable(legacyLocation, service)
    || explicitNoindexLegacyRoute
  ) && legacyRecordMatchesApproval) {
    const { locations, geographicDataValidated } = getLocationEngineContext(legacyLocation);
    if (geographicDataValidated
      || service.slug !== 'pilot-training'
      || approvedLegacyRoute
      || explicitNoindexLegacyRoute) {
      const content = { ...getLocationServiceContent(legacyLocation, service) };
      const regulatoryContext = resolveRegulatoryContext(legacyLocation, locations);
      const hierarchy = resolveLocationHierarchy(legacyLocation, locations) || [];
      if (service.slug === 'pilot-training') {
        content.masterContent = getLocationPilotTrainingContent({
          countryCode: legacyLocation.countryCode || regulatoryContext?.countryCode,
          serviceSlug: service.slug,
        });
      }
      content.composedPage = composeLocationContent({
        location: legacyLocation,
        hierarchy,
        service,
        regulatoryContext,
        content,
      });
      return {
        props: {
          location: legacyLocation,
          service,
          content,
          engineLocations: locations,
          geographicDataValidated,
        },
      };
    }
  }

  let indiaResolved;
  let worldResolved;
  let indiaAmbiguous = false;
  let worldAmbiguous = false;
  try {
    indiaResolved = routeApproval.registry === 'india' && routeApproval.recordId
      ? await resolveIndiaGeographicLocation(routeApproval.recordId)
      : await resolveIndiaGeographicRoute(params.location);
    if (indiaResolved.registryRecordCount !== undefined) {
      indiaResolved.registry = { recordCount: indiaResolved.registryRecordCount };
    }
  } catch (error) {
    if (error.code === 'INVALID_GEOGRAPHIC_HIERARCHY'
      || /Geographic (?:alias|slug|parent reference) ".*" is ambiguous/.test(error.message)) {
      indiaAmbiguous = true;
    } else {
      throw error;
    }
  }
  try {
    worldResolved = await resolveWorldGeographicRoute(params.location);
  } catch (error) {
    if (error.code === 'INVALID_GEOGRAPHIC_HIERARCHY'
      || error.code === 'AMBIGUOUS_GEOGRAPHIC_LOCATION') {
      worldAmbiguous = true;
    } else {
      throw error;
    }
  }

  if (indiaAmbiguous || worldAmbiguous) {
    if (routeApproval.registry === 'india' && indiaResolved?.location) {
      worldResolved = null;
    } else if (routeApproval.registry === 'world-pilot' && worldResolved?.location) {
      indiaResolved = null;
    } else {
      return notFound();
    }
  }
  if (indiaResolved?.location && worldResolved?.location
    && indiaResolved.location.id !== worldResolved.location.id) {
    if (routeApproval.registry === 'india') {
      worldResolved = null;
    } else if (routeApproval.registry === 'world-pilot') {
      indiaResolved = null;
    } else {
      return notFound();
    }
  }
  if (routeApproval.registry === 'india') worldResolved = null;
  if (routeApproval.registry === 'world-pilot') indiaResolved = null;

  const indiaRecord = indiaResolved?.location;
  const indiaHierarchy = indiaResolved?.hierarchy || [];
  const postalAlias = indiaRecord?.type === 'postal-area'
    && indiaRecord.slug !== params.location
    && indiaRecord.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') !== params.location;
  const indiaCanonicalRoute = indiaRecord
    && (indiaRecord.slug === params.location
      || isCanonicalIndiaGeographicNameRoute(params.location, indiaRecord));

  if (indiaRecord && !postalAlias && indiaCanonicalRoute) {
    if (!hierarchyIsValid(indiaRecord, indiaHierarchy)
      || indiaRecord.countryCode !== 'IN'
      || indiaRecord.relationship === 'unsupported'
      || indiaRecord.safetyStatus === 'rejected'
      || indiaRecord.resolutionStatus === 'AMBIGUOUS'
      || indiaRecord.status !== 'sourced'
      || (indiaRecord.type === 'postal-area' && indiaRecord.postalCodeAmbiguous === true)) {
      return notFound();
    }

    if (indiaRecord.slug !== params.location
      && !isCanonicalIndiaGeographicNameRoute(params.location, indiaRecord)) {
      return {
        redirect: {
          destination: `/${indiaRecord.slug}/${service.slug}`,
          permanent: true,
        },
      };
    }

    if (!getIndiaDynamicServicePolicy(service, indiaRecord)) return notFound();
    const generated = buildIndiaLocationServiceContent({
      record: indiaRecord,
      hierarchy: indiaHierarchy,
      service,
      routeSlug: params.location,
    });
    return {
      props: {
        location: generated.location || indiaRecord,
        service,
        content: generated.content,
        engineLocations: indiaHierarchy,
        geographicDataValidated: true,
        registryRecordCount: indiaResolved.registry?.recordCount || 0,
      },
    };
  }

  const {
    location: worldRecord,
    hierarchy: worldHierarchy,
    nearbyAviationPlaces,
  } = worldResolved || {};
  if (!worldRecord || !hierarchyIsValid(worldRecord, worldHierarchy)) return notFound();
  if (routeApproval.approved
    && routeApproval.registry === 'world-pilot'
    && worldRecord.id !== routeApproval.recordId) {
    return notFound();
  }
  if (worldRecord.resolutionStatus === 'AMBIGUOUS' || worldRecord.status === 'rejected') {
    return notFound();
  }
  if (worldRecord.slug !== params.location) {
    return {
      redirect: {
        destination: `/${worldRecord.slug}/${service.slug}`,
        permanent: true,
      },
    };
  }
  if (!getGeographicDynamicServicePolicy(service, worldRecord)) return notFound();

  const generated = buildWorldLocationServiceContent({
    record: worldRecord,
    hierarchy: worldHierarchy,
    service,
    nearbyAviationPlaces,
    routeSlug: params.location,
  });
  return {
    props: {
      location: generated.location,
      service,
      content: generated.content,
      engineLocations: worldHierarchy,
      geographicDataValidated: true,
    },
  };
}
