import { INDIA_DYNAMIC_SERVICE_POLICIES } from '../data/location-seo/india-dynamic-service-policies.js';
import { SERVICES } from '../data/location-seo/services.js';
import { buildIndiaLocationServiceContent } from './indiaLocationContentEngine.js';
import { loadIndiaGeographicRegistry } from './indiaGeographicRegistry.js';
import { indiaGeographicNameSlug } from './indiaGeographicRouteSlug.js';
import { isGeographicPageIndexable } from './locationIndexabilityPolicy.js';

function hierarchyFor(record, recordsById) {
  const chain = [];
  const visited = new Set();
  let current = record;
  while (current) {
    if (visited.has(current.id)) return null;
    visited.add(current.id);
    chain.unshift(current);
    if (!current.parentId) break;
    current = recordsById.get(current.parentId);
    if (!current) return null;
  }
  if (chain.at(-1)?.id !== record.id) return null;
  if (record.type === 'country') {
    return chain.length === 1 && chain[0].type === 'country' ? chain : null;
  }
  return chain.length > 1
    && chain[0]?.type === 'country'
    && chain.some(({ type }) => type === 'state')
    ? chain
    : null;
}

export async function* iterateIndexableIndiaLocationServicePairs({
  registry = null,
  services = Object.keys(INDIA_DYNAMIC_SERVICE_POLICIES)
    .map((slug) => SERVICES.find((service) => service.slug === slug))
    .filter(Boolean),
  maxRecords = Infinity,
  onDecision = null,
} = {}) {
  const loadedRegistry = registry?.complete
    ? registry
    : await loadIndiaGeographicRegistry();
  if (!Array.isArray(loadedRegistry.records) || !loadedRegistry.complete) {
    throw new TypeError('A loaded India geographic registry is required.');
  }
  if (!(maxRecords === Infinity || (Number.isInteger(maxRecords) && maxRecords > 0))) {
    throw new TypeError('The sitemap registry limit must be a positive integer or Infinity.');
  }

  const records = loadedRegistry.records;
  const recordsToEvaluate = records.slice(0, maxRecords);
  const recordsById = new Map(records.map((record) => [record.id, record]));
  const registrySlugRecords = new Map();
  const canonicalNameSlugRecords = new Map();
  for (const record of records) {
    if (record.countryCode !== 'IN' || !record.slug) continue;
    const normalizedSlug = record.slug.toLowerCase();
    const registrySlug = registrySlugRecords.get(normalizedSlug);
    if (registrySlug) {
      registrySlug.count += 1;
    } else {
      registrySlugRecords.set(normalizedSlug, { count: 1, recordId: record.id });
    }

    const canonicalNameSlug = indiaGeographicNameSlug(record.canonicalName || record.name);
    if (canonicalNameSlug) {
      const nameSlug = canonicalNameSlugRecords.get(canonicalNameSlug);
      if (nameSlug) {
        nameSlug.count += 1;
      } else {
        canonicalNameSlugRecords.set(canonicalNameSlug, { count: 1, recordId: record.id });
      }
    }
  }
  for (const record of records) {
    if (record.countryCode !== 'IN') continue;
    for (const alias of record.aliases || []) {
      const aliasSlug = indiaGeographicNameSlug(alias);
      const canonicalOwner = canonicalNameSlugRecords.get(aliasSlug);
      if (canonicalOwner && canonicalOwner.recordId !== record.id) {
        canonicalOwner.aliasCollision = true;
      }
    }
  }

  for (const record of recordsToEvaluate) {
    if (record.countryCode !== 'IN') continue;
    const hierarchy = hierarchyFor(record, recordsById);
    const recordUsable = Boolean(
      hierarchy
      && record.status === 'sourced'
      && record.safetyStatus !== 'rejected'
      && record.relationship !== 'unsupported'
      && record.resolutionStatus !== 'AMBIGUOUS'
      && !(record.type === 'postal-area' && record.postalCodeAmbiguous === true)
      && registrySlugRecords.get(record.slug.toLowerCase())?.count === 1,
    );

    for (const service of services) {
      if (!service || !INDIA_DYNAMIC_SERVICE_POLICIES[service.slug]) continue;
      if (!recordUsable) {
        onDecision?.({ record, service, status: 'REJECTED' });
        continue;
      }
      const canonicalNameSlug = indiaGeographicNameSlug(record.canonicalName || record.name);
      const canonicalNameOwner = canonicalNameSlugRecords.get(canonicalNameSlug);
      const registrySlugOwner = registrySlugRecords.get(canonicalNameSlug);
      let routeSlug = record.slug;
      if (canonicalNameSlug
        && !/^\d{6}$/.test(canonicalNameSlug)
        && canonicalNameOwner?.count === 1
        && !canonicalNameOwner.aliasCollision
        && canonicalNameOwner.recordId === record.id
        && (!registrySlugOwner || registrySlugOwner.recordId === record.id)) {
        routeSlug = canonicalNameSlug;
      }
      const generated = buildIndiaLocationServiceContent({
        record,
        hierarchy,
        service,
        routeSlug,
      });
      const indexable = isGeographicPageIndexable({
        location: generated.location,
        service,
        content: generated.content,
        quality: generated.content.quality,
      });
      onDecision?.({
        record,
        service,
        status: indexable ? 'INDEXABLE' : generated.content.quality.state,
        reason: generated.content.quality.blockers.join(' '),
      });
      if (indexable) {
        yield {
          location: generated.location,
          service,
          content: generated.content,
          hierarchy,
        };
      }
    }
  }
}
