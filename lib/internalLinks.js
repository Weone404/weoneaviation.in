const keywordRouteMap = [
  { keyword: 'cpl', route: '/commercial-pilot-license' },
  { keyword: 'commercial pilot license', route: '/commercial-pilot-license' },
  { keyword: 'dgca ground classes', route: '/dgca-ground-classes' },
  { keyword: 'atpl', route: '/courses/atpl' },
  { keyword: 'ppl', route: '/private-pilot-license-ppl-course-details' },
  { keyword: 'rtr', route: '/rtr-a' },
  { keyword: 'pilot training in delhi', route: '/pilot-training-in-delhi' },
  { keyword: 'pilot training in india', route: '/pilot-training-in-india' },
  { keyword: 'flying school', route: '/flying-school/india' },
];

export function suggestInternalLinks(text = '', currentPath = '') {
  const normalizedText = text.toLowerCase();
  return keywordRouteMap
    .filter((item) => normalizedText.includes(item.keyword) && item.route !== currentPath)
    .slice(0, 3)
    .map((item) => ({ href: item.route, keyword: item.keyword }));
}
