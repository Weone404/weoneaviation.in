import Head from 'next/head';

// Emits BlogPosting/Article structured data with author + publisher + dates.
// datePublished/dateModified feed the AI "recency" signal (fresh content is
// ~3x more likely to be cited). Pass REAL dates — never fabricate them.
// `author` (optional) accepts one of the named experts from data/authors.js.
// Attributing an article to a licensed instructor rather than to the company is
// a materially stronger E-E-A-T signal: it gives the claim a person with
// verifiable credentials behind it. Falls back to the Organization when the
// article genuinely has no individual author.
export default function ArticleSchema({
  headline,
  description,
  image,
  url,
  datePublished,
  dateModified,
  author,
}) {
  if (!headline) return null;

  // Normalize human dates like "Dec 15, 2024" into ISO 8601 for schema.
  // Returns undefined for empty/unparseable values (never emits a bad date).
  const toISO = (d) => {
    if (!d) return undefined;
    const parsed = new Date(d);
    return isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  };
  const published = toISO(datePublished);
  const modified = toISO(dateModified) || published;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(url ? { mainEntityOfPage: { '@type': 'WebPage', '@id': url } } : {}),
    author: author
      ? {
          '@type': 'Person',
          name: author.name,
          ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
          ...(author.description ? { description: author.description } : {}),
          ...(author.identifier ? { identifier: author.identifier } : {}),
          ...(author.knowsAbout ? { knowsAbout: author.knowsAbout } : {}),
          worksFor: {
            '@type': 'EducationalOrganization',
            name: 'We One Aviation Academy',
            url: 'https://weoneaviation.in',
          },
        }
      : {
          '@type': 'Organization',
          name: 'We One Aviation Academy',
          url: 'https://weoneaviation.in',
        },
    publisher: {
      '@type': 'Organization',
      name: 'We One Aviation Academy',
      logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    },
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
