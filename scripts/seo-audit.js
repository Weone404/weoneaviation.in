const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');
const out = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '_next' || entry.name === 'api') continue;
      walk(full);
    } else if (/\.(jsx|js)$/.test(entry.name)) {
      out.push(full);
    }
  }
}

function extractMeta(file) {
  const text = fs.readFileSync(file, 'utf8');
  const titleMatch = text.match(/title="([^"]+)"/);
  const descriptionMatch = text.match(/description="([^"]+)"/);
  const metaTitleMatch = text.match(/title:\s*'([^']+)'/);
  const metaDescriptionMatch = text.match(/description:\s*'([^']+)'/);

  return {
    file,
    title: titleMatch?.[1] || metaTitleMatch?.[1] || '',
    description: descriptionMatch?.[1] || metaDescriptionMatch?.[1] || '',
  };
}

walk(pagesDir);
const collected = out
  .filter(file => !/pages\/(?:_app|_document|404|admin|api)\./.test(file))
  .map(extractMeta)
  .filter(item => item.title || item.description);

const seen = [];
for (let i = 0; i < collected.length; i++) {
  for (let j = i + 1; j < collected.length; j++) {
    const a = collected[i];
    const b = collected[j];
    const titleScore = similarity(a.title, b.title);
    const descScore = similarity(a.description, b.description);
    const combined = (titleScore + descScore) / 2;
    if (combined > 0.82) {
      console.log(`${a.file.replace(process.cwd() + '\\', '')} | ${b.file.replace(process.cwd() + '\\', '')} | title=${titleScore.toFixed(2)} desc=${descScore.toFixed(2)}`);
    }
  }
}

function similarity(a, b) {
  const sa = normalize(a || '');
  const sb = normalize(b || '');
  if (!sa || !sb) return 0;
  const setA = new Set(sa.split(' '));
  const setB = new Set(sb.split(' '));
  const inter = [...setA].filter(x => setB.has(x)).length;
  const union = new Set([...setA, ...setB]).size;
  return union ? inter / union : 0;
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
