export function generateFAQSchema(faqArray = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqArray || []).map((faq) => ({
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
  providerUrl = 'https://www.weoneaviation.in',
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
  url = 'https://www.weoneaviation.in',
  name = 'We One Aviation Academy',
  sameAs = [],
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    url,
    logo: 'https://www.weoneaviation.in/Logo.webp',
    foundingDate: '2009',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C-404, 3rd Floor, Near Ramphal Chowk Road, Palam Extension, Sector-7, Dwarka',
      addressLocality: 'New Delhi',
      postalCode: '110077',
      addressCountry: 'India',
    },
    telephone: '+91-9355611996',
    email: 'info@weoneaviation.in',
    sameAs,
  };
}

export function generateWebsiteSchema({ url = 'https://www.weoneaviation.in', name = 'We One Aviation Academy' } = {}) {
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
