const fs = require('fs');
const path = require('path');
const root = process.cwd();
const pagesDir = path.join(root, 'pages');
const exclude = new Set(['_app.jsx', '_document.jsx', '404.jsx', 'sitemap.xml.js', 'robots.txt.js']);

function collectPageRoutes(dir) {
  const routes = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      routes.push(...collectPageRoutes(full));
      continue;
    }
    if (!name.endsWith('.jsx') && !name.endsWith('.js')) continue;
    const rel = path.relative(pagesDir, full).replace(/\\/g, '/');
    if (exclude.has(rel)) continue;
    if (rel.startsWith('api/') || rel.startsWith('admin/')) continue;
    if (/\[.*\]/.test(rel)) continue;
    let route = '/' + rel.replace(/\.jsx$|\.js$/, '');
    route = route.replace(/\/index$/, '');
    if (route === '') route = '/';
    routes.push(route);
  }
  return routes;
}

const pageRoutes = [...new Set(collectPageRoutes(pagesDir))].sort();
const sitemapText = fs.readFileSync(path.join(pagesDir, 'sitemap.xml.js'), 'utf8');
const sitemapUrls = [...new Set(
  [...sitemapText.matchAll(/loc\s*:\s*['\"]https:\/\/weoneaviation\.in([^'\"]*)['\"]/g)].map(m => m[1] === '' ? '/' : m[1])
)].sort();

const missing = pageRoutes.filter(r => !sitemapUrls.includes(r));
const extra = sitemapUrls.filter(u => !pageRoutes.includes(u));
console.log('PAGE_COUNT', pageRoutes.length);
console.log('SITEMAP_COUNT', sitemapUrls.length);
console.log('MISSING_IN_SITEMAP');
missing.forEach(r => console.log(r));
console.log('EXTRA_IN_SITEMAP');
extra.forEach(u => console.log(u));
