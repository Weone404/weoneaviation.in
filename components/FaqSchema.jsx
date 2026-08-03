import Head from 'next/head';

// Emits FAQPage structured data from an existing `faqs` array of { q, a }.
// Reuses the SAME data the page already renders — no duplicated / invented Q&A.
// Drop `<FaqSchema faqs={faqs} />` inside any page that defines a faqs array.
export default function FaqSchema({ faqs }) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
