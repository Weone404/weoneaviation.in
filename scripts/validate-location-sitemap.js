const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const sitemapPath = path.join(rootDir, '.generated-sitemap.xml');
const builtPagesDir = path.join(rootDir, '.next', 'server', 'pages');
const generatedSitemapsDir = path.join(rootDir, 'public', 'generated-sitemaps');
const approvedGeographicRoutesPath = path.join(
  rootDir,
  'data',
  'location-seo',
  'geography',
  'approved-geographic-sitemap-routes.json',
);
const siteOrigin = 'https://weoneaviation.in';
function readUrlsetLocations(xml) {
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

function visitSitemapLocations(xml, visit) {
  if (/<urlset\b/.test(xml)) {
    const locations = readUrlsetLocations(xml);
    assert.ok(locations.length <= 50000, 'A sitemap URL set exceeds the 50,000 URL limit.');
    locations.forEach(visit);
    return 1;
  }
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<sitemapindex xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">[\s\S]*<\/sitemapindex>\s*$/);
  const sitemapBlocks = [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)];
  assert.ok(sitemapBlocks.length > 0, 'Sitemap index must reference at least one child sitemap.');
  const remainingXml = xml.replace(/<sitemap>[\s\S]*?<\/sitemap>/g, '').replace(
    /^<\?xml version="1\.0" encoding="UTF-8"\?>\s*<sitemapindex xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">|<\/sitemapindex>\s*$/g,
    '',
  );
  assert.equal(remainingXml.trim(), '', 'Sitemap index contains malformed XML outside sitemap entries.');

  const childPaths = new Set();
  for (const [, block] of sitemapBlocks) {
    const matches = [...block.matchAll(/<loc>([^<]+)<\/loc>/g)];
    assert.equal(matches.length, 1, 'Each sitemap index entry must contain exactly one loc element.');
    const childUrl = new URL(matches[0][1]);
    assert.equal(childUrl.origin, siteOrigin);
    assert.match(childUrl.pathname, /^\/generated-sitemaps\/locations-\d{4}\.xml$/);
    assert.ok(!childPaths.has(childUrl.pathname), `Sitemap index repeats ${childUrl.pathname}.`);
    childPaths.add(childUrl.pathname);
    const childFile = path.join(generatedSitemapsDir, path.basename(childUrl.pathname));
    const childLocations = readUrlsetLocations(fs.readFileSync(childFile, 'utf8'));
    assert.ok(childLocations.length <= 50000, `${childUrl.pathname} exceeds the 50,000 URL sitemap limit.`);
    childLocations.forEach(visit);
  }
  return childPaths.size + 1;
}

function findBuiltPage(route) {
  const routePath = route.slice(1);
  const candidates = [
    path.join(builtPagesDir, `${routePath}.html`),
    path.join(builtPagesDir, routePath, 'index.html'),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

function hasStaticPageSource(route) {
  const routePath = route.slice(1);
  return [
    path.join(rootDir, 'pages', `${routePath}.js`),
    path.join(rootDir, 'pages', `${routePath}.jsx`),
    path.join(rootDir, 'pages', routePath, 'index.js'),
    path.join(rootDir, 'pages', routePath, 'index.jsx'),
  ].some((candidate) => fs.existsSync(candidate));
}

function readBuiltPage(route) {
  const pagePath = findBuiltPage(route);
  assert.ok(pagePath, `Expected statically generated HTML for ${route}.`);
  return fs.readFileSync(pagePath, 'utf8');
}

async function main() {
  const [{ SERVICES }, approvals] = await Promise.all([
    import('../data/location-seo/services.js'),
    import('../data/location-seo/production-route-approvals.js'),
  ]);
  const [
    indexabilityPolicy,
    publicationInventoryModule,
  ] = await Promise.all([
    import('../data/location-seo/geographic-indexability-policy.js'),
    import('../lib/worldwidePublicationInventory.js'),
  ]);
  const serviceSlugs = new Set(SERVICES.map(({ slug }) => slug));
  const approvedGeographicCache = JSON.parse(
    fs.readFileSync(approvedGeographicRoutesPath, 'utf8'),
  );
  assert.equal(approvedGeographicCache.version, 3, 'Approved geographic cache has an unsupported format.');
  assert.ok(Array.isArray(approvedGeographicCache.approvedRoutes), 'Approved geographic cache has no route list.');
  assert.match(approvedGeographicCache.sourceFingerprint, /^[a-f0-9]{64}$/);
  const publicationInventory = publicationInventoryModule.readWorldwidePublicationInventory(rootDir);
  assert.equal(
    approvedGeographicCache.sourceFingerprint,
    publicationInventory.sourceFingerprint,
    'Route cache and worldwide quality inventory use the same current source fingerprint.',
  );
  assert.equal(
    approvedGeographicCache.registry.supportedLocationCount,
    publicationInventory.registry.supportedLocationCount,
    'Route cache and worldwide inventory use the same geographic registry size.',
  );
  assert.ok(
    approvedGeographicCache.evaluation.evaluatedWorldwideRoutes
      >= approvedGeographicCache.registry.supportedLocationCount,
    'The quality inventory covers at least every supported worldwide location.',
  );
  const inventoryRoutes = new Set(
    publicationInventory.approvedRoutes.map(({ route }) => route),
  );
  assert.equal(
    inventoryRoutes.size,
    publicationInventory.approvedRoutes.length,
    'Worldwide publication inventory routes are unique.',
  );
  const approvedCachedRoutes = new Set();
  for (const entry of approvedGeographicCache.approvedRoutes) {
    assert.equal(typeof entry?.route, 'string', 'Cached geographic route must be a string.');
    const [, locationSlug, serviceSlug] = entry.route.split('/');
    const approvalContext = entry.registry === 'world-geographic-index'
      ? {
        registryBacked: true,
        location: {
          id: entry.recordId,
          registryRecordId: entry.recordId,
          registrySlug: entry.locationSlug,
          slug: entry.locationSlug,
          countryCode: entry.countryCode,
        },
        service: { slug: entry.serviceSlug },
      }
      : null;
    assert.equal(entry.state, 'INDEXABLE', `Cached route is not indexable: ${entry.route}.`);
    assert.equal(entry.qualityPassed, true, `Cached route did not pass quality: ${entry.route}.`);
    assert.equal(entry.canonicalPath, entry.route, `${entry.route}: canonical path must match the route.`);
    assert.equal(
      entry.canonicalUrl,
      `${siteOrigin}${entry.route}`,
      `${entry.route}: canonical URL must match the route.`,
    );
    assert.equal(
      entry.robots,
      indexabilityPolicy.INDEXABLE_ROBOTS_DIRECTIVE,
      `${entry.route}: robots must match the shared indexable directive.`,
    );
    assert.match(entry.route, /^\/[a-z0-9-]+\/[a-z0-9-]+$/, `Cached route is malformed: ${entry.route}.`);
    if (entry.registry === 'world-geographic-index') {
      assert.equal(entry.locationSlug, locationSlug, `${entry.route}: cache location slug mismatch.`);
      assert.equal(entry.serviceSlug, serviceSlug, `${entry.route}: cache service slug mismatch.`);
      assert.equal(serviceSlug, 'pilot-training', `${entry.route}: unsupported worldwide service.`);
      assert.ok(entry.recordId, `${entry.route}: cache identity is required.`);
      assert.ok(entry.countryCode, `${entry.route}: cache country code is required.`);
      assert.ok(
        approvedGeographicCache.registry.supportedCountryCodes.includes(entry.countryCode),
        `${entry.route}: country is outside the supported registry policy.`,
      );
      assert.ok(inventoryRoutes.has(entry.route), `${entry.route}: missing from the fingerprinted quality inventory.`);
      assert.equal(entry.approvalSource, 'worldwide-quality-gated-policy');
    } else {
      assert.equal(
        inventoryRoutes.has(entry.route),
        false,
        `${entry.route}: explicit route must not be misclassified as a worldwide quality decision.`,
      );
    }
    const currentApproval = approvals.getProductionRouteApproval(entry.route, approvalContext);
    assert.equal(currentApproval.approved, true, `Cached route is not currently production-approved: ${entry.route}.`);
    assert.equal(currentApproval.source, entry.approvalSource, `${entry.route}: approval source is stale.`);
    assert.equal(
      approvedCachedRoutes.has(entry.route),
      false,
      `Approved geographic cache repeats ${entry.route}.`,
    );
    approvedCachedRoutes.add(entry.route);
  }
  assert.deepEqual(
    [...inventoryRoutes].sort(),
    approvedGeographicCache.approvedRoutes
      .filter(({ registry }) => registry === 'world-geographic-index')
      .map(({ route }) => route)
      .sort(),
    'Cached worldwide routes exactly match quality-passed fingerprinted inventory decisions.',
  );
  const { resolveGeographicServicePage } = await import('../lib/geographicServicePage.js');
  const { buildLocationPageModel } = await import('../lib/locationEngine.js');
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const sitemapPaths = new Set();
  const dynamicLocationRoutes = [];
  const representativeRoutes = new Set([
    '/abu-dhabi/pilot-training',
    '/london/pilot-training',
    '/new-york-city/pilot-training',
    '/toronto/pilot-training',
    '/sydney/pilot-training',
    '/paris/pilot-training',
    '/tokyo/pilot-training',
    '/berlin/pilot-training',
  ]);
  let urlCount = 0;
  let locationRouteCount = 0;
  let noindexUrlCount = 0;
  const sitemapFileCount = visitSitemapLocations(xml, (location) => {
    const url = new URL(location);
    assert.equal(url.origin, siteOrigin, `Sitemap URL must use the HTTPS canonical host: ${location}`);
    assert.equal(url.protocol, 'https:', `Sitemap URL must use HTTPS: ${location}`);
    assert.equal(url.search, '', `Sitemap URL must not include a query string: ${location}`);
    assert.equal(url.hash, '', `Sitemap URL must not include a fragment: ${location}`);
    assert.ok(url.pathname === '/' || !url.pathname.endsWith('/'), `Sitemap URL must not have a trailing slash: ${location}`);
    assert.ok(!/(?:^|\/)(?:pincode|pilot-training-near|aviation-academy-near)(?:\/|$)/i.test(url.pathname), `Sitemap contains a PIN or locality doorway URL: ${location}`);
    assert.ok(!/(?:^|\/)\d{6}(?:\/|$)/.test(url.pathname), `Sitemap contains a PIN-code URL: ${location}`);
    assert.ok(!sitemapPaths.has(url.pathname), `Sitemap contains duplicate URL ${location}.`);
    sitemapPaths.add(url.pathname);
    urlCount += 1;
    const isCachedLocationRoute = approvedCachedRoutes.has(url.pathname);
    const builtPagePath = isCachedLocationRoute && !representativeRoutes.has(url.pathname)
      ? null
      : findBuiltPage(url.pathname);
    if (builtPagePath) {
      const html = fs.readFileSync(builtPagePath, 'utf8');
      const robotsTag = [...html.matchAll(/<meta\b(?=[^>]*\bname="robots")(?=[^>]*\bcontent="([^"]+)")[^>]*>/gi)]
        .find(([, content]) => /\bnoindex\b/i.test(content));
      if (robotsTag) {
        noindexUrlCount += 1;
        assert.fail(`Sitemap contains a built noindex URL: ${location}.`);
      }
    }
    const [, slug, serviceSlug, extra] = url.pathname.split('/');
    if (slug && serviceSlug && !extra && serviceSlugs.has(serviceSlug)
      && (approvedCachedRoutes.has(url.pathname)
        || !hasStaticPageSource(url.pathname))) {
      locationRouteCount += 1;
      dynamicLocationRoutes.push(url.pathname);
    }
  });
  assert.ok(urlCount > 0, 'Sitemap must contain at least one URL.');

  const redirectSources = new Set(
    [...fs.readFileSync(path.join(rootDir, 'next.config.js'), 'utf8').matchAll(/source:\s*'([^']+)'/g)]
      .map(([, source]) => source.toLowerCase()),
  );

  const expectedLocationRoutes = [...approvedCachedRoutes].sort();
  for (const route of representativeRoutes) {
    assert.ok(
      expectedLocationRoutes.includes(route),
      `${route} is a required cross-jurisdiction representative route.`,
    );
  }
  for (const route of expectedLocationRoutes) {
    if (!redirectSources.has(route.toLowerCase())) {
      assert.ok(sitemapPaths.has(route), `Sitemap is missing final-approved route ${route}.`);
    }
  }
  assert.deepEqual(
    [...new Set(dynamicLocationRoutes)].sort(),
    expectedLocationRoutes.filter((route) => !redirectSources.has(route.toLowerCase())),
    'Sitemap location-service URLs must exactly match final-approved routes.',
  );

  const routesToResolve = expectedLocationRoutes.filter((route) => (
    !route.startsWith('/pilot-training/')
    && (route === '/delhi/pilot-training'
      || route === '/dwarka/pilot-training'
      || representativeRoutes.has(route))
  ));
  for (const route of routesToResolve) {
    assert.ok(!redirectSources.has(route.toLowerCase()), `Location-service URL is configured to redirect: ${route}`);
    const entry = approvedGeographicCache.approvedRoutes.find(({ route: cachedRoute }) => cachedRoute === route);
    assert.ok(entry, `${route} is missing its publication decision.`);
    const approvalContext = entry.registry === 'world-geographic-index'
      ? {
        registryBacked: true,
        location: {
          id: entry.recordId,
          registryRecordId: entry.recordId,
          registrySlug: entry.locationSlug,
          slug: entry.locationSlug,
          countryCode: entry.countryCode,
        },
        service: { slug: entry.serviceSlug },
      }
      : null;
    assert.equal(approvals.getProductionRouteApproval(route, approvalContext).approved, true, `${route} has no current production approval.`);
    const [location, service] = route.slice(1).split('/');
    const resolved = await resolveGeographicServicePage({ location, service });
    assert.equal(Boolean(resolved.notFound), false, `${route} must resolve, even when it is fallback-rendered.`);
    const props = resolved.props;
    const model = buildLocationPageModel({
      location: props.location,
      service: props.service,
      content: props.content,
      locations: props.engineLocations,
      geographicDataValidated: props.geographicDataValidated,
    });
    assert.equal(model.productionApproval.approved, true, `${route} failed final production approval.`);
    assert.equal(model.indexability, 'INDEXABLE', `${route} is not indexable under the current page model.`);
    assert.equal(model.sitemapEligible, true, `${route} is not sitemap eligible under the current page model.`);
    assert.ok(!/\bnoindex\b/i.test(model.metadata.robots), `${route} is noindex under the current page model.`);
    const canonicalUrl = `${siteOrigin}${route}`;
    assert.equal(model.metadata.canonical, canonicalUrl, `${route} model has an incorrect canonical URL.`);
    assert.equal(
      model.metadata.robots,
      indexabilityPolicy.INDEXABLE_ROBOTS_DIRECTIVE,
      `${route} page model robots matches its sitemap/cache decision.`,
    );
    const builtPagePath = findBuiltPage(route);
    if (!builtPagePath) continue;
    const html = fs.readFileSync(builtPagePath, 'utf8');
    const canonicalTags = [...html.matchAll(/<link\b(?=[^>]*\brel="canonical")(?=[^>]*\bhref="([^"]+)")[^>]*>/gi)];
    const robotsTags = [...html.matchAll(/<meta\b(?=[^>]*\bname="robots")(?=[^>]*\bcontent="([^"]+)")[^>]*>/gi)];

    assert.equal(canonicalTags.length, 1, `${route} must have exactly one canonical tag.`);
    assert.equal(canonicalTags[0][1], canonicalUrl, `${route} must self-canonicalize to the sitemap URL.`);
    assert.equal(robotsTags.length, 1, `${route} must have exactly one robots tag.`);
    assert.ok(!/\bnoindex\b/i.test(robotsTags[0][1]), `${route} must not be noindex.`);
    assert.ok(html.includes('<h1'), `${route} must have generated page content.`);
  }

  for (const route of [...new Set(dynamicLocationRoutes)]) {
    assert.ok(
      approvedCachedRoutes.has(route),
      `Unapproved dynamic route appears in sitemap: ${route}.`,
    );
  }
  assert.equal(noindexUrlCount, 0, 'No built noindex URL may appear in the sitemap.');
  assert.equal(locationRouteCount, expectedLocationRoutes.length);

  console.log(
    `Validated sitemap XML: ${urlCount} unique HTTPS URLs; `
    + `${sitemapFileCount} sitemap file(s) including index; `
    + `${locationRouteCount} registry/curated location-service routes; `
    + `${approvedGeographicCache.registry.supportedLocationCount} supported worldwide locations; `
    + `${publicationInventory.approvedRoutes.length} quality-approved worldwide routes; `
    + `${routesToResolve.length} representative and explicit routes validated against current resolver and page model; `
    + `${noindexUrlCount} noindex URLs.`,
  );
}

main().catch((error) => {
  console.error(`validate-location-sitemap: ${error.message}`);
  process.exitCode = 1;
});
