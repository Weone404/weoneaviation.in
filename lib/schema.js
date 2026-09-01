// ─────────────────────────────────────────────────────────────
// Canonical domain constant — used across all schema functions
// ─────────────────────────────────────────────────────────────
const SITE_URL = 'https://weoneaviation.in';

import { FOUNDED_YEAR } from '../data/academy';

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
  providerName = 'We One Aviation Academy',
  providerUrl = SITE_URL,
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
    name,
    description,
    url,
    provider: {
      '@type': 'EducationalOrganization',
      name: providerName,
      url: providerUrl,
    },
  };

  // ─ Move courseMode + duration into hasCourseInstance (CourseInstance) ─
  if (courseMode || duration) {
    schema.hasCourseInstance = {
      '@type': 'CourseInstance',
      ...(courseMode && { courseMode }),
      ...(duration && { 
        timeRequired: parseDurationToISO8601(duration) 
      }),
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

export function generateBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
  name = 'We One Aviation Academy',
  sameAs = [],
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${url}/#organization`,
    name,
    legalName: name,
    url,
    logo: 'https://weoneaviation.in/Logo.webp',
    description: 'DGCA pilot training institute in India offering CPL, PPL, ATPL and aviation career guidance.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C-404, 3rd Floor, Near Ramphal Chowk Road, Palam Extension, Sector-7, Dwarka',
      addressLocality: 'Delhi',
      postalCode: '110077',
      addressCountry: 'India',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-9355611996',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: 'English',
      },
    ],
    email: 'info.weoneaviation@gmail.com',
    /*
     * From data/academy.js, the only place a first-party figure about the
     * academy is allowed to live. 2009 is one of the two facts /credentials
     * says the academy can evidence on request.
     */
    foundingDate: String(FOUNDED_YEAR),
    sameAs,
  };
}

// NOTE: SearchAction removed — no working site search endpoint exists.
// The search URL pattern (/?s={search_term_string}) is non-functional on this Next.js site.
// If search is implemented in the future, restore potentialAction with EntryPoint.
export function generateWebsiteSchema({ url = SITE_URL, name = 'We One Aviation Academy' } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
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

