const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const pagesDir = path.join(rootDir, 'pages');
const outputPath = path.join(rootDir, '.generated-sitemap.xml');
/*
 * Apex, not www. This script writes .generated-sitemap.xml, which
 * pages/sitemap.xml.js serves in preference to everything else — so this one
 * constant decides the host for every URL Google is told to crawl. It was
 * emitting www while the edge 301s www → apex, meaning all 113 entries pointed
 * at redirects and disagreed with the canonical tags on the pages themselves.
 */
const host = 'https://weoneaviation.in';
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

function extractCitySlugs() {
  const filePath = path.join(pagesDir, 'pilot-training-in', '[city].jsx');
  if (!fs.existsSync(filePath)) return [];

  const source = fs.readFileSync(filePath, 'utf8');
  const slugs = [];
  const regex = /^\s*([a-z0-9-]+)\s*:/gm;
  let match;

  while ((match = regex.exec(source))) {
    const slug = match[1];
    if (!slugs.includes(slug)) {
      slugs.push(slug);
    }
  }

  return slugs.map((slug) => `/pilot-training-in/${slug}`);
}

function extractBlogIds() {
  const filePath = path.join(pagesDir, 'blogs', '[id].jsx');
  if (!fs.existsSync(filePath)) return [];

  const source = fs.readFileSync(filePath, 'utf8');
  const ids = [];
  const idRegex = /id:\s*['"`]?(\d+?)['"`]?/g;
  let match;

  while ((match = idRegex.exec(source))) {
    if (!ids.includes(match[1])) {
      ids.push(match[1]);
    }
  }

  return ids.map((id) => `/blogs/${id}`);
}

function normalizeRoute(route) {
  if (route === '/') return route;
  return route.replace(/\/+$/, '');
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

function getLastCommitDate(relativeFilePath) {
  if (!relativeFilePath) return null;

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cd', '--date=short', '--', relativeFilePath], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();

    return output || null;
  } catch {
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

function buildSitemapXml() {
  const pageFiles = collectPageFiles(pagesDir);
  const routes = pageFiles
    .map(pageFileToRoute)
    .filter(Boolean);

  const dynamicRoutes = [
    ...extractCitySlugs(),
    ...extractBlogIds(),
  ];

  const allRoutes = Array.from(new Set([...routes, ...dynamicRoutes].map(normalizeRoute))).sort();

  const urlsXml = allRoutes
    .map((route) => {
      const sourceFile = getLastCommitDate(getSourceFileForRoute(route)) ? getSourceFileForRoute(route) : null;
      const lastmod = getLastCommitDate(sourceFile);
      const lastmodXml = lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '';

      return `  <url>\n    <loc>${host}${route}</loc>\n${lastmodXml}    <changefreq>${getChangefreq(route)}</changefreq>\n    <priority>${getPriority(route)}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsXml}\n</urlset>`;
}

function main() {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buildSitemapXml(), 'utf8');
  console.log(`Wrote ${toPosixPath(path.relative(rootDir, outputPath))}`);
}

main();
