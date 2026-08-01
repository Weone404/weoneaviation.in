const fs = require('fs');
const text = fs.readFileSync('next.config.js', 'utf8');
const lines = text.split(/\r?\n/);
let inReturn = false;
let current = null;
const redirects = [];
for (const raw of lines) {
  const line = raw.trim();
  if (line === 'return [' || line === 'return[') {
    inReturn = true;
    continue;
  }
  if (!inReturn) continue;
  if (line === '];') break;
  if (line === '{') {
    current = { source: null, destination: null };
    continue;
  }
  if (!current) continue;
  if (line.startsWith('source:')) {
    const m = line.match(/source\s*:\s*'([^']+)'/);
    if (m) current.source = m[1];
  }
  if (line.startsWith('destination:')) {
    const m = line.match(/destination\s*:\s*'([^']+)'/);
    if (m) current.destination = m[1];
  }
  if (line === '},' || line === '}') {
    if (current.source && current.destination) {
      redirects.push(current);
    }
    current = null;
  }
}
const categorize = (src) => {
  if (src.startsWith('/tag/') || src.startsWith('/category/') || src.startsWith('/author/') || src.startsWith('/:path*/feed') || src.startsWith('/:path*/page/')) return 'A';
  if (src.endsWith('/') && !src.startsWith('/blog/') && !src.startsWith('/:path*')) return 'D';
  return 'E';
};
const buckets = { A: [], D: [], E: [] };
for (const entry of redirects) {
  buckets[categorize(entry.source)].push(entry);
}
console.log('TOTAL REDIRECTS', redirects.length);
['A','D','E'].forEach(bucket => {
  console.log(`BUCKET ${bucket} (${buckets[bucket].length})`);
  buckets[bucket].forEach((entry, idx) => {
    console.log(`${idx+1}. ${entry.source} -> ${entry.destination}`);
  });
});
const counts = redirects.reduce((acc, entry) => {
  acc[entry.source] = (acc[entry.source] || 0) + 1;
  return acc;
}, {});
const duplicates = Object.entries(counts).filter(([source, count]) => count > 1);
if (duplicates.length) {
  console.log('DUPLICATE SOURCES');
  duplicates.forEach(([source, count]) => console.log(`${count} x ${source}`));
}
console.log('PILOT-KAISE-BANE RULE', redirects.find(e => e.source === '/pilot-kaise-bane'));
console.log('HOST REDIRECT RULE', redirects.find(e => e.source === '/:path*'));
