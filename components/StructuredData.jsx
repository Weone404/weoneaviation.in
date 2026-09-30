const ORGANIZATION_ID = 'https://weoneaviation.in/#organization';
const ORGANIZATION_NAMES = new Set(['we one aviation', 'we one aviation academy']);

function normalizeSchemaNode(value) {
  if (Array.isArray(value)) return value.map(normalizeSchemaNode);
  if (!value || typeof value !== 'object') return value;

  const types = Array.isArray(value['@type']) ? value['@type'] : [value['@type']];
  const name = typeof value.name === 'string' ? value.name.trim().toLowerCase() : '';
  const isAcademyOrganization = types.some((type) => (
    type === 'Organization' || type === 'EducationalOrganization'
  )) && ORGANIZATION_NAMES.has(name);
  const isOrganizationDefinition = value['@id'] === ORGANIZATION_ID
    && (value.address || value.description || value.contactPoint);

  if (isAcademyOrganization && !isOrganizationDefinition) {
    return { '@id': ORGANIZATION_ID };
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      key === 'mainEntityOfPage'
        ? normalizeMainEntityOfPage(nestedValue)
        : normalizeSchemaNode(nestedValue),
    ]),
  );
}

function normalizeMainEntityOfPage(value) {
  const isWebPageReference = typeof value === 'string'
    || (
      value
      && typeof value === 'object'
      && !Array.isArray(value)
      && (Array.isArray(value['@type']) ? value['@type'] : [value['@type']]).includes('WebPage')
      && Object.keys(value).every((key) => key === '@type' || key === '@id')
    );
  const pageUrl = typeof value === 'string' ? value : value?.['@id'];

  if (isWebPageReference && typeof pageUrl === 'string') {
    try {
      const url = new URL(pageUrl);
      if (url.origin === 'https://weoneaviation.in' && !url.hash) {
        return { '@id': `${url.href}#webpage` };
      }
    } catch {
      return normalizeSchemaNode(value);
    }
  }

  return normalizeSchemaNode(value);
}

export default function StructuredData({ data }) {
  if (!data) return null;

  const schemas = (Array.isArray(data) ? data : [data]).map(normalizeSchemaNode);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${schema['@type'] || 'schema'}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
