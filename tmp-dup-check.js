const fs = require('fs');
const cfg = fs.readFileSync('next.config.js','utf8');
const lines = cfg.split(/\r?\n/);
const entries = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('source:')) {
    const source = line.match(/source:\s*'([^']+)'/)[1];
    entries.push({ source, line: i + 1 });
  }
}
const groups = entries.reduce((acc, e) => {
  acc[e.source] = acc[e.source] || [];
  acc[e.source].push(e.line);
  return acc;
}, {});
const duplicates = Object.entries(groups).filter(([source, lines]) => lines.length > 1);
console.log('total source entries', entries.length);
console.log('unique sources', Object.keys(groups).length);
console.log('duplicate sources count', duplicates.length);
duplicates.forEach(([source, lines]) => {
  console.log('SOURCE', source, 'lines', lines.join(','));
});
