export const INDEXABLE_ROBOTS_DIRECTIVE = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
export const NON_INDEXABLE_ROBOTS_DIRECTIVE = 'noindex, follow';

export const GEOGRAPHIC_INDEXABILITY_POLICY = {
  defaultIndexable: false,
  requireValidatedHierarchy: true,
  requireSupportedService: true,
  requireVerifiedBusinessClaims: true,
  requireContentDifferentiation: true,
  sitemapRequiresProductionAllowlist: true,
  existingDifferentiationExemptRoutes: [
    '/delhi/dgca-ground-classes',
    '/delhi/commercial-pilot-training',
    '/delhi/cpl-training',
    '/dwarka/dgca-ground-classes',
    '/dwarka/commercial-pilot-training',
    '/dwarka/cpl-training',
  ],
  contentDifferentiation: {
    maxNormalizedSimilarityPercent: 80,
    minUniqueFaqs: 2,
    minUniqueSections: 1,
    minLocationSpecificContentPercent: 15,
  },
  contentQuality: {
    minVisibleWords: 220,
    minFaqs: 3,
    minSourceCount: 2,
    minInternalLinks: 2,
  },
};
