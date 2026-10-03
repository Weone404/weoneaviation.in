const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const sitemapPath = path.join(rootDir, '.generated-sitemap.xml');
const builtPagesDir = path.join(rootDir, '.next', 'server', 'pages');
const siteOrigin = 'https://weoneaviation.in';

async function getExpectedLocationRoutes() {
  const {
    getApprovedLocationServicePairs,
    INTERNATIONAL_LOCATION_CANDIDATES,
  } = await import('../lib/locationSeo.js');
  return getApprovedLocationServicePairs()
    .map(({ location, service }) => `/${location.slug}/${service.slug}`)
    .sort();
}

function readSitemapLocations(xml) {
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">[\s\S]*<\/urlset>\s*$/);

  const locations = [];
  const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  const remainingXml = xml.replace(/<url>[\s\S]*?<\/url>/g, '').replace(
    /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">|<\/urlset>\s*$/g,
    '',
  );

  assert.equal(remainingXml.trim(), '', 'Sitemap contains unexpected or malformed XML outside URL entries.');

  for (const [, block] of urlBlocks) {
    const locMatches = [...block.matchAll(/<loc>([^<]+)<\/loc>/g)];
    assert.equal(locMatches.length, 1, 'Each sitemap URL entry must contain exactly one loc element.');
    assert.match(block, /^\s*<loc>[^<]+<\/loc>(?:\s*<(?:lastmod|changefreq|priority)>[^<]*<\/(?:lastmod|changefreq|priority)>)*\s*$/);
    locations.push(locMatches[0][1]);
  }

  return locations;
}

function readBuiltPage(route) {
  const routePath = route.slice(1);
  const candidates = [
    path.join(builtPagesDir, `${routePath}.html`),
    path.join(builtPagesDir, routePath, 'index.html'),
  ];
  const pagePath = candidates.find((candidate) => fs.existsSync(candidate));
  assert.ok(pagePath, `Expected statically generated HTML for ${route}.`);
  return fs.readFileSync(pagePath, 'utf8');
}

async function main() {
  const expectedLocationRoutes = await getExpectedLocationRoutes();
  const {
    INTERNATIONAL_LOCATION_CANDIDATES,
    getApprovedLocationServicePairs,
  } = await import('../lib/locationSeo.js');
  const approvedLocationSlugs = new Set(
    getApprovedLocationServicePairs().map(({ location }) => location.slug),
  );
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locations = readSitemapLocations(xml);

  assert.ok(locations.length > 0, 'Sitemap must contain at least one URL.');
  assert.equal(new Set(locations).size, locations.length, 'Sitemap contains duplicate URLs.');

  const parsedUrls = locations.map((location) => {
    const url = new URL(location);
    assert.equal(url.origin, siteOrigin, `Sitemap URL must use the HTTPS canonical host: ${location}`);
    assert.equal(url.protocol, 'https:', `Sitemap URL must use HTTPS: ${location}`);
    assert.equal(url.search, '', `Sitemap URL must not include a query string: ${location}`);
    assert.equal(url.hash, '', `Sitemap URL must not include a fragment: ${location}`);
    assert.ok(url.pathname === '/' || !url.pathname.endsWith('/'), `Sitemap URL must not have a trailing slash: ${location}`);
    assert.ok(!/(?:^|\/)(?:pincode|pilot-training-near|aviation-academy-near)(?:\/|$)/i.test(url.pathname), `Sitemap contains a PIN or locality doorway URL: ${location}`);
    assert.ok(!/(?:^|\/)\d{6}(?:\/|$)/.test(url.pathname), `Sitemap contains a PIN-code URL: ${location}`);
    return url;
  });

  for (const candidate of INTERNATIONAL_LOCATION_CANDIDATES) {
    const approvedRoutes = expectedLocationRoutes.filter(
      (route) => route.startsWith(`/${candidate.slug}/`),
    );
    const sitemapRoutes = parsedUrls
      .map(({ pathname }) => pathname)
      .filter((route) => route.startsWith(`/${candidate.slug}/`))
      .sort();

    if (approvedRoutes.length > 0) {
      assert.ok(approvedLocationSlugs.has(candidate.slug));
      assert.deepEqual(
        sitemapRoutes,
        approvedRoutes,
        `Sitemap must contain only the approved route(s) for promoted candidate ${candidate.slug}.`,
      );
    } else {
      assert.equal(
        sitemapRoutes.length,
        0,
        `Sitemap must not contain a non-indexable international candidate: ${candidate.slug}`,
      );
    }
  }

  const locationRoutes = parsedUrls
    .map((url) => url.pathname)
    .filter((route) => [...approvedLocationSlugs].some((slug) => route.startsWith(`/${slug}/`)))
    .sort();

  assert.deepEqual(locationRoutes, expectedLocationRoutes, 'Sitemap location-service URLs must exactly match the approved indexable location/service combinations.');

  const redirectSources = new Set(
    [...fs.readFileSync(path.join(rootDir, 'next.config.js'), 'utf8').matchAll(/source:\s*'([^']+)'/g)]
      .map(([, source]) => source.toLowerCase()),
  );

  for (const route of expectedLocationRoutes) {
    assert.ok(!redirectSources.has(route.toLowerCase()), `Location-service URL is configured to redirect: ${route}`);

    const canonicalUrl = `${siteOrigin}${route}`;
    const html = readBuiltPage(route);
    const canonicalTags = [...html.matchAll(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/gi)];
    const robotsTags = [...html.matchAll(/<meta\b(?=[^>]*\bname="robots")(?=[^>]*\bcontent="([^"]+)")[^>]*>/gi)];

    assert.equal(canonicalTags.length, 1, `${route} must have exactly one canonical tag.`);
    assert.equal(canonicalTags[0][1], canonicalUrl, `${route} must self-canonicalize to the sitemap URL.`);
    assert.equal(robotsTags.length, 1, `${route} must have exactly one robots tag.`);
    assert.ok(!/\bnoindex\b/i.test(robotsTags[0][1]), `${route} must not be noindex.`);
    assert.ok(html.includes('<h1'), `${route} must have generated page content.`);
  }

  console.log(`Validated sitemap XML: ${locations.length} unique HTTPS URLs; ${expectedLocationRoutes.length} approved location/service routes with built HTML, self-canonical and indexable.`);
}

main().catch((error) => {
  console.error(`validate-location-sitemap: ${error.message}`);
  process.exitCode = 1;
});
