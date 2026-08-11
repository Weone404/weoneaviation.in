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
  providerUrl = 'https://weoneaviation.in',
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
    courseMode,
  };

  if (duration) {
    schema.educationalCredentialAwarded = duration;
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

export function generateBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema({
  url = 'https://weoneaviation.in',
  name = 'We One Aviation Academy',
  sameAs = [],
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name,
    legalName: name,
    url,
    logo: 'https://weoneaviation.in/Logo.webp',
    description: 'DGCA approved pilot training institute in India offering CPL, PPL, ATPL and aviation career guidance.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C-404, 3rd Floor, Near Ramphal Chowk Road, Palam Extension, Sector-7, Dwarka',
      addressLocality: 'New Delhi',
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
    email: 'info@weoneaviation.in',
    sameAs,
  };
}

export function generateWebsiteSchema({ url = 'https://weoneaviation.in', name = 'We One Aviation Academy' } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
