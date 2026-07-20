const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const sitemapSourcePath = path.join(rootDir, 'pages', 'sitemap.xml.js');
const outputPath = path.join(rootDir, '.generated-sitemap.xml');

function extractPagesArray() {
  const source = fs.readFileSync(sitemapSourcePath, 'utf8');
  const match = source.match(/const pages = (\[[\s\S]*?\n\]);/);

  if (!match) {
    throw new Error('Could not find the pages array in pages/sitemap.xml.js');
  }

  return new Function(`return (${match[1]});`)();
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join('/');
}

function getExistingFile(relativePath) {
  const absolutePath = path.join(rootDir, relativePath.replace(/^\//, ''));
  return fs.existsSync(absolutePath) ? relativePath : null;
}

function resolvePageFile(routePath) {
  const normalizedRoute = routePath === '/' ? '/' : routePath.replace(/\/$/, '');
  const routeSegments = normalizedRoute === '/' ? [] : normalizedRoute.split('/').filter(Boolean);

  const candidatePaths = [];
  const addCandidate = (segments) => {
    const route = '/' + segments.join('/');
    candidatePaths.push(`${route}.jsx`, `${route}.js`, `${route}/index.jsx`, `${route}/index.js`);
  };

  addCandidate(routeSegments);

  for (let i = routeSegments.length - 1; i >= 0; i -= 1) {
    addCandidate(routeSegments.slice(0, i));
  }

  for (const candidate of candidatePaths) {
    const resolved = getExistingFile(path.join('pages', candidate.replace(/^\//, '')));
    if (resolved) {
      return resolved;
    }
  }

  // Fallback for dynamic routes such as /blogs/slug or /pilot-training-in/[city].
  // If the URL does not map to a concrete file, use the nearest parent directory's
  // dynamic route template if one exists, otherwise fall back to the nearest parent
  // index page and finally to /pages/index.jsx.
  for (let i = routeSegments.length - 1; i >= 0; i -= 1) {
    const parentDir = '/' + routeSegments.slice(0, i).join('/');
    const parentAbsolute = path.join(rootDir, 'pages', parentDir.replace(/^\//, ''));

    if (!fs.existsSync(parentAbsolute)) {
      continue;
    }

    const directoryEntries = fs.readdirSync(parentAbsolute, { withFileTypes: true });
    const dynamicFile = directoryEntries.find((entry) => entry.isFile() && /^\[[^\]]+\]/.test(entry.name));

    if (dynamicFile) {
      return toPosixPath(path.join('pages', parentDir.replace(/^\//, ''), dynamicFile.name));
    }
  }

  for (let i = routeSegments.length - 1; i >= 0; i -= 1) {
    const parentRoute = '/' + routeSegments.slice(0, i).join('/');
    const parentIndex = getExistingFile(path.join('pages', parentRoute.replace(/^\//, ''), 'index.jsx'));
    if (parentIndex) {
      return parentIndex;
    }
  }

  return 'pages/index.jsx';
}

function getLastCommitDate(relativeFilePath) {
  const gitPath = toPosixPath(relativeFilePath.replace(/^pages\//, 'pages/'));

  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cd', '--date=short', '--', gitPath], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();

    return output || null;
  } catch (error) {
    return null;
  }
}

function buildSitemapXml() {
  const pages = extractPagesArray();

  const urlsXml = pages
    .map(({ loc, priority, changefreq }) => {
      const pathname = new URL(loc).pathname;
      const sourceFile = resolvePageFile(pathname);
      const lastmod = getLastCommitDate(sourceFile) || '1970-01-01';

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

function main() {
  const sitemapXml = buildSitemapXml();
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, sitemapXml, 'utf8');
  console.log(`Wrote ${toPosixPath(path.relative(rootDir, outputPath))}`);
}

main();
