export function indiaGeographicNameSlug(name) {
  return String(name || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isCanonicalIndiaGeographicNameRoute(slug, record) {
  const canonicalSlug = indiaGeographicNameSlug(record?.canonicalName || record?.name);
  return Boolean(
    canonicalSlug
    && !/^\d{6}$/.test(canonicalSlug)
    && slug === canonicalSlug,
  );
}
