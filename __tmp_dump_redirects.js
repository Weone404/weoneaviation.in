const fs = require('fs');
const text = fs.readFileSync('next.config.js', 'utf8');
const lines = text.split(/\r?\n/);
let inReturn = false;
let current = null;
const redirects = [];
for (const raw of lines) {
  const line = raw.trim();
  if (line.startsWith('return [')) {
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
  const s = line.match(/source\s*:\s*'([^']+)'/);
  if (s) current.source = s[1];
  const d = line.match(/destination\s*:\s*'([^']+)'/);
  if (d) current.destination = d[1];
  if (line === '},' || line === '}') {
    if (current.source && current.destination) redirects.push(current);
    current = null;
  }
}
const categorize = (src) => {
  if (src.startsWith('/tag/') || src.startsWith('/category/') || src.startsWith('/author/') || src.match(/^/:path\*\/feed$/) || src.match(/^/:path\*\/page\/:num$/)) return 'A';
  if (src.endsWith('/') && !src.includes(':path*') && !src.includes('/blog/') && !src.startsWith('/tag/') && !src.startsWith('/category/') && !src.startsWith('/author/')) return 'D';
  return 'E';
};
const grouped = { A: [], D: [], E: [] };
redirects.forEach(r => grouped[categorize(r.source)].push(r));
console.log('TOTAL', redirects.length);
['A','D','E'].forEach(bucket => {
  console.log(`BUCKET ${bucket} (${grouped[bucket].length})`);
  grouped[bucket].forEach((r,i) => console.log(`${i+1}. ${r.source} -> ${r.destination}`));
  console.log('');
});
const dup = redirects.reduce((acc, r) => { acc[r.source] = (acc[r.source]||0)+1; return acc; }, {});
const duplicates = Object.entries(dup).filter(([src,c])=>c>1);
if (duplicates.length) {
  console.log('DUPLICATE SOURCES');
  duplicates.forEach(([src,c]) => console.log(`${c}x ${src}`));
}
