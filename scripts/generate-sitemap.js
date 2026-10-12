const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const pagesDir = path.join(rootDir, 'pages');
const outputPath = path.join(rootDir, '.generated-sitemap.xml');
const generatedSitemapsDir = path.join(rootDir, 'public', 'generated-sitemaps');
const approvedGeographicRoutesPath = path.join(
  rootDir,
  'data',
  'location-seo',
  'geography',
  'approved-geographic-sitemap-routes.json',
);
const locationServicePagePath = toPosixPath(path.relative(rootDir, path.join(pagesDir, '[location]', '[service].jsx')));
/*
 * Apex, not www. This script writes .generated-sitemap.xml, which
 * pages/sitemap.xml.js serves in preference to everything else — so this one
 * constant decides the host for every URL Google is told to crawl. It was
 * emitting www while the edge 301s www → apex, meaning all 113 entries pointed
 * at redirects and disagreed with the canonical tags on the pages themselves.
 */
const host = 'https://weoneaviation.in';
const sitemapUrlLimit = 50000;
const ignoredFiles = new Set([
  '_app.js',
  '_app.jsx',
  '_document.js',
  '_document.jsx',
  '404.js',
  '404.jsx',
  'sitemap.xml.js',
  'robots.txt.js',
]);
const ignoredDirs = new Set(['api', 'admin', '_next']);
const sourceContentCache = new Map();
const lastCommitDateCache = new Map();

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function isPageFile(fileName) {
  return /\.(js|jsx)$/.test(fileName) && !ignoredFiles.has(fileName);
}

function collectPageFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirs.has(entry.name)) continue;
      files.push(...collectPageFiles(path.join(dir, entry.name)));
      continue;
    }

    if (entry.isFile() && isPageFile(entry.name)) {
      files.push(path.join(dir, entry.name));
    }
  }

  return files;
}

function pageFileToRoute(filePath) {
  let relPath = path.relative(pagesDir, filePath);
  relPath = toPosixPath(relPath);

  if (relPath.startsWith('api/') || relPath.includes('[')) {
    return null;
  }

  relPath = relPath.replace(/\.(js|jsx)$/, '');
  if (relPath === 'index') {
    return '/';
  }

  if (relPath.endsWith('/index')) {
    relPath = relPath.replace(/\/index$/, '');
  }

  return `/${relPath}`;
}

function extractBlogIds() {
  const filePath = path.join(pagesDir, 'blogs', '[id].jsx');
  if (!fs.existsSync(filePath)) return [];

  const source = fs.readFileSync(filePath, 'utf8');
  const ids = [];
  const arrayStart = source.indexOf('const hardcodedBlogs = [');
  const arrayEnd = source.indexOf('\n];', arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) return ids;

  const entries = source.slice(arrayStart, arrayEnd);
  const entryRegex = /^    \{\r?\n([\s\S]*?)^    \},?\s*$/gm;
  let match;

  while ((match = entryRegex.exec(entries))) {
    const id = match[1].match(/^\s*id:\s*(\d+),/m)?.[1];
    if (!id || /^\s*canonicalTo\s*:/m.test(match[1]) || /^\s*noindex\s*:/m.test(match[1])) continue;
    if (!ids.includes(id)) ids.push(id);
  }

  return ids.map((id) => `/blogs/${id}`);
}

function normalizeRoute(route) {
  if (route === '/') return route;
  return route.replace(/\/+$/, '');
}

function isExcludedRoute(route) {
  return /^\/(?:pilot-training-near(?:\/|$)|pincode(?:\/|$)|aviation-academy-near(?:\/|$)|api(?:\/|$)|admin(?:\/|$)|_next(?:\/|$)|robots\.txt$|sitemap\.xml$|404$)/i.test(route)
    || /(?:^|\/)\d{6}(?:\/|$)/.test(route);
}

function getSourceFileForRoute(route) {
  const normalized = normalizeRoute(route);
  const candidateFiles = [];

  if (normalized === '/') {
    candidateFiles.push(path.join(pagesDir, 'index.jsx'), path.join(pagesDir, 'index.js'));
  } else {
    candidateFiles.push(path.join(pagesDir, `${normalized}.jsx`), path.join(pagesDir, `${normalized}.js`));
    candidateFiles.push(path.join(pagesDir, normalized, 'index.jsx'), path.join(pagesDir, normalized, 'index.js'));
  }

  for (const candidate of candidateFiles) {
    if (fs.existsSync(candidate)) return toPosixPath(path.relative(rootDir, candidate));
  }

  return null;
}

function sourceDeclaresNoindexOrNonSelfCanonical(route, relativeFilePath) {
  if (!relativeFilePath) return false;
  let source = sourceContentCache.get(relativeFilePath);
  if (!source) {
    source = fs.readFileSync(path.join(rootDir, relativeFilePath), 'utf8');
    sourceContentCache.set(relativeFilePath, source);
  }
  const layoutTag = source.match(/<Layout\b[^>]*>/s)?.[0];

  if (layoutTag && /\bnoindex(?:\s|=|\/?>)/i.test(layoutTag)) return true;

  const robotsTags = source.match(/<meta\b[^>]*>/gi) || [];
  if (robotsTags.some((tag) => (
    /\bname\s*=\s*["']robots["']/i.test(tag)
    && /\bcontent\s*=\s*["'][^"']*\bnoindex\b/i.test(tag)
  ))) return true;

  const canonical = layoutTag?.match(/\bcanonical\s*=\s*["']([^"']+)["']/i)?.[1];
  if (canonical) {
    const canonicalPath = /^https?:\/\//i.test(canonical)
      ? new URL(canonical).pathname
      : canonical;
    return normalizeRoute(canonicalPath) !== route;
  }

  return false;
}

function getAttribute(tag, attribute) {
  return tag.match(new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2] || null;
}

async function validateProductionRoute(route) {
  const url = `${host}${route}`;
  const response = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(10000),
  });
  if (response.status !== 200) {
    console.log(`generate-sitemap: excluding ${route} (production HTTP ${response.status})`);
    return null;
  }

  const html = await response.text();
  const canonicalTag = (html.match(/<link\b[^>]*>/gi) || [])
    .find((tag) => /\brel\s*=\s*["']canonical["']/i.test(tag));
  const canonical = canonicalTag && getAttribute(canonicalTag, 'href');
  if (canonical !== url) {
    console.log(`generate-sitemap: excluding ${route} (production canonical is not self-referencing)`);
    return null;
  }

  const robotsTag = (html.match(/<meta\b[^>]*>/gi) || [])
    .find((tag) => /\bname\s*=\s*["']robots["']/i.test(tag));
  if (robotsTag && /\bnoindex\b/i.test(getAttribute(robotsTag, 'content') || '')) {
    console.log(`generate-sitemap: excluding ${route} (production noindex)`);
    return null;
  }

  return route;
}

async function validateProductionRoutes(routes) {
  const validated = await Promise.all(routes.map((route) => validateProductionRoute(route)));
  return validated.filter(Boolean);
}

async function discoverProductionOnlyBlogRoutes(localRoutes) {
  const [sitemapResponse, blogIndexResponse] = await Promise.all([
    fetch(`${host}/sitemap.xml`, { signal: AbortSignal.timeout(10000) }),
    fetch(`${host}/blogs`, { signal: AbortSignal.timeout(10000) }),
  ]);
  if (!sitemapResponse.ok) {
    throw new Error(`production sitemap returned HTTP ${sitemapResponse.status}`);
  }
  if (!blogIndexResponse.ok) {
    throw new Error(`production blog index returned HTTP ${blogIndexResponse.status}`);
  }

  const sitemapXml = await sitemapResponse.text();
  const blogIndexHtml = await blogIndexResponse.text();
  const sitemapLocations = Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/gi), (match) => match[1].trim());
  const blogIndexLocations = Array.from(blogIndexHtml.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/gi), (match) => match[2])
    .filter((href) => /^\/blogs\//i.test(href) || href.startsWith(`${host}/blogs/`))
    .map((href) => new URL(href, `${host}/blogs`).href);
  const candidates = Array.from(new Set([...sitemapLocations, ...blogIndexLocations]))
    .map((location) => {
      try {
        const url = new URL(location);
        if (url.origin !== host || url.search || url.hash) return null;
        const route = normalizeRoute(url.pathname);
        if (!/^\/blogs\/[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(route) || isExcludedRoute(route)) return null;
        return { route, url: url.href };
      } catch (error) {
        console.warn(`generate-sitemap: ignoring invalid production sitemap location "${location}": ${error.message}`);
        return null;
      }
    })
    .filter((candidate) => candidate && !localRoutes.has(candidate.route));

  const validated = await validateProductionRoutes(candidates.map(({ route }) => route));
  validated.forEach((route) => console.log(`generate-sitemap: including verified production-only route ${route}`));

  return validated;
}

function getLastCommitDate(relativeFilePath) {
  if (!relativeFilePath) return null;
  if (lastCommitDateCache.has(relativeFilePath)) {
    return lastCommitDateCache.get(relativeFilePath);
  }

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cd', '--date=short', '--', relativeFilePath], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();

    const date = output || null;
    lastCommitDateCache.set(relativeFilePath, date);
    return date;
  } catch {
    lastCommitDateCache.set(relativeFilePath, null);
    return null;
  }
}

function getPriority(route) {
  if (route === '/') return '1.0';
  if (route.startsWith('/courses')) return '0.9';
  if (route.startsWith('/pilot-training-in')) return '0.9';
  if (route.startsWith('/how-to-become-a-pilot')) return '0.9';
  if (route.startsWith('/flying-school')) return '0.85';
  if (route.startsWith('/blogs')) return '0.7';
  return '0.8';
}

function getChangefreq(route) {
  return route === '/' ? 'weekly' : 'monthly';
}

/*
 * Routes that 301 must not appear in the sitemap.
 *
 * This generator walks pages/ and emits a URL for every file it finds. That
 * was correct until the GEO pass retired six duplicate-intent routes by
 * redirect while intentionally leaving their page files on disk (next.config
 * redirects run before filesystem routing, so the files are inert but
 * recoverable). The files stayed, so the sitemap kept advertising all six —
 * telling crawlers to fetch URLs that immediately bounce, which wastes crawl
 * budget and is a documented sitemap-quality problem.
 *
 * Reading the redirect table straight from next.config.js keeps the two in
 * step: retire a route there and it leaves the sitemap automatically, with no
 * second list for anyone to forget.
 */
function redirectSources() {
  try {
    const cfg = fs.readFileSync(path.join(process.cwd(), 'next.config.js'), 'utf8');
    const out = new Set();
    const re = /source:\s*'([^']+)'/g;
    let m;
    while ((m = re.exec(cfg)) !== null) {
      // Skip wildcard/param patterns — they never match a literal page route.
      // Compare EXACTLY. Do not normalise the trailing slash: a source of
      // '/courses/' is a trailing-slash normaliser pointing AT the live
      // '/courses', so treating them as equal would delist a real page.
      if (!m[1].includes(':') && !m[1].includes('*') && !m[1].endsWith('/')) {
        out.add(m[1].toLowerCase());
      }
    }
    return out;
  } catch (e) {
    console.warn('generate-sitemap: could not read next.config.js redirects —', e.message);
    return new Set();
  }
}

async function buildSitemapXml() {
  const {
    getApprovedLocationServicePairs,
  } = await import('../lib/locationSeo.js');
  const {
    getProductionRouteApproval,
  } = await import('../data/location-seo/production-route-approvals.js');
  if (!fs.existsSync(approvedGeographicRoutesPath)) {
    throw new Error(
      'The quality-approved geographic sitemap cache is missing. Run "npm run cache:approved-geographic-sitemap" first.',
    );
  }
  const approvedGeographicCache = JSON.parse(
    fs.readFileSync(approvedGeographicRoutesPath, 'utf8'),
  );
  if (approvedGeographicCache.version !== 3
    || !/^[a-f0-9]{64}$/.test(approvedGeographicCache.sourceFingerprint || '')
    || !Array.isArray(approvedGeographicCache.approvedRoutes)) {
    throw new Error('The quality-approved geographic sitemap cache has an unsupported format.');
  }
  const { INDEXABLE_ROBOTS_DIRECTIVE } = await import(
    '../data/location-seo/geographic-indexability-policy.js'
  );
  const approvedGeographicRoutes = new Set();
  for (const entry of approvedGeographicCache.approvedRoutes) {
    if (typeof entry?.route !== 'string') {
      throw new Error('Invalid geographic sitemap cache entry: route must be a string.');
    }
    const [, locationSlug, serviceSlug, extra] = entry.route.split('/');
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
    const approval = getProductionRouteApproval(entry.route, approvalContext);
    if (entry?.state !== 'INDEXABLE'
      || entry.qualityPassed !== true
      || typeof entry.route !== 'string'
      || !/^\/[a-z0-9-]+\/[a-z0-9-]+$/.test(entry.route)
      || extra
      || (entry.registry === 'world-geographic-index'
        && (entry.locationSlug !== locationSlug
          || entry.serviceSlug !== serviceSlug
          || entry.canonicalPath !== entry.route
          || entry.canonicalUrl !== `${host}${entry.route}`
          || entry.robots !== INDEXABLE_ROBOTS_DIRECTIVE))
      || entry.canonicalPath !== entry.route
      || entry.canonicalUrl !== `${host}${entry.route}`
      || entry.robots !== INDEXABLE_ROBOTS_DIRECTIVE
      || !approval.approved
      || approval.source !== entry.approvalSource) {
      throw new Error(
        `Invalid or unapproved entry in geographic sitemap cache: ${entry?.route || '(missing route)'}.`,
      );
    }
    approvedGeographicRoutes.add(entry.route);
  }
  const redirected = redirectSources();
  const pageFiles = collectPageFiles(pagesDir);
  const sourceRoutes = pageFiles
    .map((filePath) => ({
      route: pageFileToRoute(filePath),
      filePath: toPosixPath(path.relative(rootDir, filePath)),
    }))
    .filter(({ route }) => route);
  const curatedLocationServiceRoutes = getApprovedLocationServicePairs()
    .map(({ location, service }) => ({
      route: `/${location.slug}/${service.slug}`,
      filePath: locationServicePagePath,
    }))
    .filter(({ route }) => approvedGeographicRoutes.has(route)
      && !isExcludedRoute(route)
      && !redirected.has(route.toLowerCase()));
  const dynamicRoutes = await validateProductionRoutes([
    ...extractBlogIds(),
  ]);

  const localRoutes = new Set([
    ...sourceRoutes.map(({ route }) => route),
    ...curatedLocationServiceRoutes.map(({ route }) => route),
    ...dynamicRoutes,
  ].map(normalizeRoute));
  const sourceFileByRoute = new Map(
    [...sourceRoutes, ...curatedLocationServiceRoutes]
      .map(({ route, filePath }) => [normalizeRoute(route), filePath]),
  );
  const productionOnlyRoutes = await discoverProductionOnlyBlogRoutes(localRoutes);

  const baseRoutes = [...new Set([...localRoutes, ...productionOnlyRoutes])]
    .sort();
  const baseRouteSet = new Set(baseRoutes);
  const writtenBaseRoutes = new Set();
  const sitemapFiles = [];
  let currentChunk = [];
  let eligibleRegistryRoutes = 0;
  let totalUrlCount = 0;

  const renderUrl = (route, candidateFile) => {
      const lastmod = getLastCommitDate(candidateFile);
      const lastmodXml = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '';

      return `  <url>\n    <loc>${host}${route}</loc>\n${lastmodXml}    <changefreq>${getChangefreq(route)}</changefreq>\n    <priority>${getPriority(route)}</priority>\n  </url>`;
  };

  const writeChunk = () => {
    if (!currentChunk.length) return;
    fs.mkdirSync(generatedSitemapsDir, { recursive: true });
    const fileName = `locations-${String(sitemapFiles.length + 1).padStart(4, '0')}.xml`;
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${currentChunk.join('\n')}\n</urlset>`;
    fs.writeFileSync(path.join(generatedSitemapsDir, fileName), sitemapXml, 'utf8');
    sitemapFiles.push(fileName);
    currentChunk = [];
  };

  const addRoute = (route, candidateFile, { registry = false } = {}) => {
    const normalizedRoute = normalizeRoute(route);
    if ((registry && baseRouteSet.has(normalizedRoute))
      || (!registry && writtenBaseRoutes.has(normalizedRoute))) return false;
    if (redirected.has(normalizedRoute.toLowerCase())) {
      if (!registry) console.log(`generate-sitemap: excluding ${normalizedRoute} (301)`);
      return false;
    }
    if (isExcludedRoute(normalizedRoute)
      || sourceDeclaresNoindexOrNonSelfCanonical(normalizedRoute, candidateFile)) {
      if (!registry) {
        console.log(`generate-sitemap: excluding ${normalizedRoute} (noindex, non-self-canonical, or excluded route)`);
      }
      return false;
    }
    if (!registry) writtenBaseRoutes.add(normalizedRoute);
    currentChunk.push(renderUrl(normalizedRoute, candidateFile));
    totalUrlCount += 1;
    if (registry) eligibleRegistryRoutes += 1;
    if (currentChunk.length >= sitemapUrlLimit) writeChunk();
    return true;
  };

  for (const route of baseRoutes) {
    const candidateFile = sourceFileByRoute.get(route) || getSourceFileForRoute(route);
    addRoute(route, candidateFile);
  }
  for (const entry of approvedGeographicCache.approvedRoutes) {
    addRoute(entry.route, locationServicePagePath, { registry: true });
  }
  console.log(
    `generate-sitemap: read ${approvedGeographicCache.approvedRoutes.length} prequalified geographic routes; ${eligibleRegistryRoutes} were sitemap eligible.`,
  );

  if (currentChunk.length) writeChunk();

  const currentChunkFiles = new Set(sitemapFiles);
  if (fs.existsSync(generatedSitemapsDir)) {
    for (const fileName of fs.readdirSync(generatedSitemapsDir)) {
      if (/^locations-\d{4}\.xml$/.test(fileName) && !currentChunkFiles.has(fileName)) {
        fs.unlinkSync(path.join(generatedSitemapsDir, fileName));
      }
    }
  }

  if (sitemapFiles.length) {
    const sitemapEntries = sitemapFiles.map((fileName) => (
      `  <sitemap>\n    <loc>${host}/generated-sitemaps/${fileName}</loc>\n  </sitemap>`
    ));
    return {
      xml: `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries.join('\n')}\n</sitemapindex>`,
      totalUrlCount,
      eligibleRegistryRoutes,
      sitemapCount: sitemapFiles.length,
    };
  }

  return {
    xml: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${currentChunk.join('\n')}\n</urlset>`,
    totalUrlCount,
    eligibleRegistryRoutes,
    sitemapCount: 1,
  };
}

function main() {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  return buildSitemapXml().then(({ xml, totalUrlCount, eligibleRegistryRoutes, sitemapCount }) => {
    fs.writeFileSync(outputPath, xml, 'utf8');
    console.log(
      `Wrote ${toPosixPath(path.relative(rootDir, outputPath))} (${totalUrlCount} URLs; ${eligibleRegistryRoutes} registry-backed; ${sitemapCount} sitemap file(s)).`,
    );
  });
}

main().catch((error) => {
  console.error('generate-sitemap: failed to build sitemap:', error.message);
  process.exitCode = 1;
});
