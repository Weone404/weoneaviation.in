const fs = require('fs');
const path = require('path');
const root = process.cwd();
const sitemapPath = path.join(root, '.generated-sitemap.xml');
const xml = fs.readFileSync(sitemapPath, 'utf8');
const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const routeFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.next' || entry.name === 'node_modules') continue;
      walk(full);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      routeFiles.push(full);
    }
  }
}
walk(path.join(root, 'pages'));
const routeSet = new Set();
for (const file of routeFiles) {
  const rel = path.relative(path.join(root, 'pages'), file).replace(/\\/g, '/');
  if (rel === '_app.jsx' || rel === '_document.jsx' || rel === '404.jsx' || rel === 'sitemap.xml.js' || rel === 'robots.txt.js') continue;
  if (rel.startsWith('api/')) continue;
  if (rel.startsWith('admin/')) continue;
  if (rel === 'blogs/index.jsx') routeSet.add('/blogs');
  else if (rel === 'doubt/index.jsx') routeSet.add('/doubt');
  else if (rel === 'blogs/[id].jsx') continue;
  else if (rel === 'pilot-training-in/[city].jsx') continue;
  else if (rel.endsWith('index.jsx')) routeSet.add('/' + rel.replace(/\/index\.jsx$/, '').replace(/\.jsx$/, ''));
  else routeSet.add('/' + rel.replace(/\.jsx$/, '').replace(/\.js$/, '').replace(/\.tsx$/, '').replace(/\.ts$/, ''));
}
routeSet.add('/');
const missing = [];
for (const loc of locs) {
  const pathname = new URL(loc).pathname.replace(/\/$/, '');
  if (!routeSet.has(pathname)) missing.push(pathname);
}
console.log('Total sitemap URLs:', locs.length);
console.log('Missing route count:', missing.length);
for (const m of missing) console.log(m);
