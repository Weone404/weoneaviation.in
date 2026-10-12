// ─────────────────────────────────────────────────────────────
// Canonical domain constant — used across all schema functions
// ─────────────────────────────────────────────────────────────
const SITE_URL = 'https://weoneaviation.in';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const ORGANIZATION_SAME_AS = [
  'https://www.instagram.com/we_one_aviation/',
];

import { FOUNDED_YEAR } from '../data/academy';
import { ACADEMY } from './facts';

export function generateFAQSchema(faqArray = []) {
  const validFaqs = (faqArray || [])
    .filter((faq) => faq?.q && faq?.a)
    .map((faq) => ({
      ...faq,
      q: String(faq.q).trim(),
      a: String(faq.a).trim(),
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

export function generateCourseSchema({
  name,
  description,
  url,
  providerId = ORGANIZATION_ID,
  courseMode,
  duration,
  feeCurrency = 'INR',
  lowPrice,
  highPrice,
  additionalProperties = [],
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${url}#course`,
    name,
    description,
    url,
    provider: { '@id': providerId },
  };

  const parsedDuration = duration ? parseDurationToISO8601(duration) : null;

  // ─ Move supported course details into hasCourseInstance (CourseInstance) ─
  if (courseMode || parsedDuration) {
    schema.hasCourseInstance = {
      '@type': 'CourseInstance',
      ...(courseMode && { courseMode }),
      ...(parsedDuration && { timeRequired: parsedDuration }),
    };
  }

  if (lowPrice || highPrice) {
    schema.offers = {
      '@type': 'AggregateOffer',
      priceCurrency: feeCurrency,
      lowPrice: lowPrice || highPrice,
      highPrice: highPrice || lowPrice,
    };
  }

  if (additionalProperties.length) {
    schema.additionalProperty = additionalProperties.map((item) => ({
      '@type': 'PropertyValue',
      name: item.name,
      value: item.value,
    }));
  }

  return schema;
}

// Helper: Convert duration strings like "6 Months" or "18-24 months" to ISO 8601 format
function parseDurationToISO8601(duration) {
  if (!duration) return null;
  const str = String(duration).toLowerCase();
  // Parse "6 months" → "P6M", "18-24 months" → "P18M" (use lower bound)
  const monthMatch = str.match(/(\d+)(?:-\d+)?\s*months?/);
  if (monthMatch) return `P${monthMatch[1]}M`;
  return null;
}

export function generateBreadcrumbSchema(items = [], id) {
  return {
    '@type': 'BreadcrumbList',
    ...(id ? { '@id': id } : {}),
    itemListElement: items.map((item, index) => {
      const isLastItem = index === items.length - 1;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(isLastItem ? {} : { item: item.url }),
      };
    }),
  };
}

export function generateOrganizationSchema({
  url = SITE_URL,
  name = 'We One Aviation',
  sameAs = ORGANIZATION_SAME_AS,
} = {}) {
  return {
    '@type': 'EducationalOrganization',
    '@id': `${url}/#organization`,
    name,
    url,
    logo: 'https://weoneaviation.in/Logo.webp',
    description: ACADEMY.scope,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ACADEMY.streetAddress,
      addressLocality: ACADEMY.addressLocality,
      addressRegion: ACADEMY.addressRegion,
      postalCode: ACADEMY.postalCode,
      addressCountry: 'IN',
    },
    telephone: ACADEMY.phoneDisplay,
    contactPoint: [{
      '@type': 'ContactPoint',
      telephone: ACADEMY.whatsappPhoneDisplay,
      contactType: 'WhatsApp enquiries',
    }],
    email: ACADEMY.email,
    /*
     * From data/academy.js, the only place a first-party figure about the
     * academy is allowed to live. 2009 is one of the two facts /credentials
     * says the academy can evidence on request.
     */
    foundingDate: String(FOUNDED_YEAR),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

// NOTE: SearchAction removed — no working site search endpoint exists.
// The search URL pattern (/?s={search_term_string}) is non-functional on this Next.js site.
// If search is implemented in the future, restore potentialAction with EntryPoint.
export function generateWebsiteSchema({ url = SITE_URL, name = 'We One Aviation' } = {}) {
  return {
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    name,
    url,
    publisher: { '@id': `${url}/#organization` },
    inLanguage: 'en-IN',
  };
}

export function generateWebPageSchema({ url, name, description }) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-IN',
  };
}

export function generateSiteSchemaGraph({ page, breadcrumbItems = [], faqArray = [] }) {
  const graph = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateWebPageSchema(page),
  ];

  if (breadcrumbItems.length > 1) {
    graph.push(generateBreadcrumbSchema(
      breadcrumbItems.map((item) => ({
        name: item.label,
        url: `${SITE_URL}${item.href}`,
      })),
      `${page.url}#breadcrumb`,
    ));
  }

  const validFaqs = (faqArray || []).filter((faq) => faq?.question && faq?.answer);
  if (validFaqs.length) {
    graph.push({
      ...generateFAQSchema(validFaqs.map(({ question, answer }) => ({
        q: question,
        a: answer,
      }))),
      '@id': `${page.url}#faq`,
      mainEntityOfPage: { '@id': `${page.url}#webpage` },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/*
 * HowTo. Google requires the steps in the schema to match steps the reader can
 * actually SEE on the page — a HowTo describing a procedure the page does not
 * visibly lay out is the kind of mismatch that earns a manual action. So every
 * caller here passes the same array it renders, rather than a hand-written
 * list that drifts from the markup.
 */
export function generateHowToSchema({ name, description, url, steps = [], totalTime }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    inLanguage: 'en-IN',
    ...(totalTime ? { totalTime } : {}),
    ...(url ? { mainEntityOfPage: { '@type': 'WebPage', '@id': url } } : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.desc,
      ...(url ? { url: `${url}#step-${i + 1}` } : {}),
    })),
  };
}
