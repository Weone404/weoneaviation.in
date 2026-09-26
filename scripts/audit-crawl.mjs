#!/usr/bin/env node
/*
 * scripts/audit-crawl.mjs — Phase 1 site inventory for the weekly growth routine.
 *
 * Crawls the running local production build (npm start) at every route this
 * repo can serve — filesystem pages, generated dynamic params, and every URL
 * in .generated-sitemap.xml — and writes one row per URL to
 * docs/audit/inventory-<YYYY-WW>.json: status, final URL after redirects,
 * title, meta description, canonical, robots meta, h1 count/text, word count,
 * JSON-LD @types present, and image/alt counts.
 *
 * Requires a server already running at BASE_URL (default http://localhost:3000).
 * Run: npm run build && npm start & npm run audit:crawl
 */
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.AUDIT_BASE_URL || 'http://localhost:3000';
const ROOT = process.cwd();

function walkPages(dir, base = '') {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['api', 'admin'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...walkPages(full, base + '/' + entry.name));
    } else if (/\.(jsx?|tsx?)$/.test(entry.name) && !/^_/.test(entry.name)) {
      let route = base + '/' + entry.name.replace(/\.[jt]sx?$/, '');
      route = route.replace(/\/index$/, '') || '/';
      if (!route.includes('[')) routes.push(route);
    }
  }
  return routes;
}

function sitemapUrls() {
  const p = path.join(ROOT, '.generated-sitemap.xml');
  if (!fs.existsSync(p)) return [];
  const xml = fs.readFileSync(p, 'utf8');
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m =>
    m[1].replace('https://weoneaviation.in', '').replace(/\/$/, '') || '/'
  );
}

function extract(html) {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1]?.trim() || null;
  const description = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || [])[1] || null;
  const canonical = (html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i) || [])[1] || null;
  const robots = (html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i) || [])[1] || null;
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = new Set();
  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block[1]);
      const nodes = Array.isArray(data) ? data : data['@graph'] ? data['@graph'] : [data];
      for (const n of nodes) if (n && n['@type']) types.add(Array.isArray(n['@type']) ? n['@type'].join('+') : n['@type']);
    } catch { /* malformed JSON-LD is caught by verify:schema, not here */ }
  }
  const text = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
  const wordCount = (text.match(/\S+/g) || []).length;
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)];
  const imgsMissingAlt = imgs.filter(m => !/\balt=/.test(m[0])).length;
  return { title, description, canonical, robots, h1Count: h1s.length, h1: h1s[0] || null, jsonLdTypes: [...types], wordCount, imgCount: imgs.length, imgsMissingAlt };
}

async function crawl(route) {
  const url = BASE_URL + route;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      return { route, status: res.status, redirectTo: location };
    }
    const html = await res.text();
    return { route, status: res.status, finalUrl: res.url, ...extract(html) };
  } catch (e) {
    return { route, status: 'ERROR', error: String(e.message || e) };
  }
}

const routes = [...new Set([...walkPages(path.join(ROOT, 'pages')), ...sitemapUrls()])].sort();

const results = [];
for (const route of routes) {
  results.push(await crawl(route));
}

const now = new Date();
const isoWeek = (() => {
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
})();

const outDir = path.join(ROOT, 'docs', 'audit');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `inventory-${isoWeek}.json`);
fs.writeFileSync(outPath, JSON.stringify({ generatedAt: now.toISOString(), baseUrl: BASE_URL, routeCount: routes.length, results }, null, 2));

const errors = results.filter(r => r.status === 'ERROR' || r.status >= 500);
const missingTitle = results.filter(r => r.status === 200 && !r.title);
const missingH1 = results.filter(r => r.status === 200 && r.h1Count === 0);
const multiH1 = results.filter(r => r.status === 200 && r.h1Count > 1);

console.log(`audit-crawl: ${routes.length} routes -> ${path.relative(ROOT, outPath)}`);
console.log(`  ${errors.length} server errors, ${missingTitle.length} missing <title>, ${missingH1.length} missing <h1>, ${multiH1.length} with >1 <h1>`);
if (errors.length) console.log('  ERRORS:', errors.map(e => e.route).join(', '));
if (missingH1.length) console.log('  NO H1:', missingH1.map(e => e.route).join(', '));
if (multiH1.length) console.log('  MULTI H1:', multiH1.map(e => e.route).join(', '));
