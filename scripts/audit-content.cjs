#!/usr/bin/env node
/**
 * Render smoke test — proves a page actually renders, without a Next build.
 *
 * WHY THIS EXISTS. The claims gate reads .next/server, so it needs a full
 * build, and a full build is not always available: `next/font` fetches
 * Montserrat and Poppins from fonts.googleapis.com at build time, so any
 * environment without egress to Google Fonts cannot build this site at all.
 * That left a real gap — eslint proves a page PARSES, and nothing proved a
 * page RENDERS. A page that parses can still crash on .map of undefined, or
 * quietly print the word "undefined" into the copy where a constant was
 * renamed.
 *
 * This catches exactly that class of bug in about a second, offline.
 *
 * WHAT IT DOES. Transforms each page with Babel (automatic JSX runtime),
 * stubs every component import and every next/* import with a passthrough,
 * resolves lib/facts.js for real, renders with renderToStaticMarkup, then
 * fails on: a crash, the literal word "undefined" in the rendered text, NaN,
 * or [object Object]. It also reports the character count and the number of
 * <h1> elements, so a page that lost its heading shows up immediately.
 *
 * Components are STUBBED, so an h1 that lives inside a layout component (a
 * blog post passing `heading` to BlogPostLayout) correctly reports 0 here.
 * Check the prop is passed; do not "fix" the page.
 *
 * WHAT IT DOES NOT DO. It is not a substitute for `npm run build` or for
 * `npm run check:claims`. It does not see getStaticProps, the real layouts,
 * CSS, or anything the compiled output contains. Run the build when you can.
 *
 * DEPENDENCIES ARE DELIBERATELY NOT IN package.json. This needs
 * @babel/preset-react and @babel/plugin-transform-modules-commonjs, and they
 * are installed without saving so the dependency tree this build is sensitive
 * about does not move:
 *
 *   npm install --no-save @babel/preset-react @babel/plugin-transform-modules-commonjs
 *   node scripts/smoke-render.cjs pages/some-page.jsx [more pages...]
 *   npm install          # restores node_modules to the lockfile afterwards
 *
 * Install both in ONE command. npm reconciles node_modules against the
 * lockfile on every run, so installing them one at a time removes the first.
 */
const path = require('path');
const fs = require('fs');
const Module = require('module');
const babel = require('@babel/core');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const ROOT = process.cwd();

function Stub(name) {
  const C = (props) => React.createElement('div', { 'data-stub': name }, (props && props.children) || null);
  C.displayName = name;
  return C;
}

const origLoad = Module._load;
Module._load = function (req) {
  if (req === 'next/link' || req === 'next/image' || req === 'next/head') {
    return { __esModule: true, default: Stub(req) };
  }
  // next/dynamic is a FACTORY, not a component: dynamic(() => import(...))
  // returns the component. Stubbing it as a component makes the page call it,
  // get a React element back, and render an object — which surfaces as
  // "Element type is invalid ... got: object" and looks like a page bug.
  if (req === 'next/dynamic') return { __esModule: true, default: () => Stub('dynamic') };
  if (req.startsWith('next/')) return { __esModule: true, default: Stub(req) };
  if (/\/components\//.test(req) || /^\.\.?\/+components/.test(req)) {
    const m = Stub(path.basename(req));
    return new Proxy({ __esModule: true, default: m }, { get: (t, p) => (p in t ? t[p] : m) });
  }
  if (/lib\/schema$/.test(req)) {
    // Any generateXSchema() helper, named or not — a stub that misses one
    // reports a crash in the PAGE, which is a false alarm and wastes a debug.
    return new Proxy({ __esModule: true, default: {} }, {
      get: (t, prop) => (prop in t ? t[prop] : () => ({})),
    });
  }
  return origLoad.apply(this, arguments);
};

const compile = (m, filename) => {
  const out = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename, babelrc: false, configFile: false,
    presets: [[require.resolve('@babel/preset-react'), { runtime: 'automatic' }]],
    plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
    sourceType: 'module',
  });
  m._compile(out.code, filename);
};
require.extensions['.jsx'] = compile;
const origJs = require.extensions['.js'];
require.extensions['.js'] = function (m, f) {
  if (f.startsWith(ROOT) && !f.includes('node_modules')) return compile(m, f);
  return origJs(m, f);
};

/*
 * ── CONTENT DEPTH AUDIT (scripts/audit-content.cjs) ───────────────────────
 * Added 2026-09-16. Shares the render harness above so the numbers are what a
 * crawler would actually see, not what the source file looks like.
 *
 * Reports, per page: rendered text length, headings, and which GEO/AEO
 * structures are present. Sorted thinnest first. Run from the repo root:
 *   node scripts/audit-content.cjs
 */
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? (['api', 'admin'].includes(e.name) ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]);

const all = walk('pages')
  .filter((f) => /\.jsx$/.test(f) && !/\/_/.test(f) && !/\[/.test(f));

const rows = [];
for (const p of all) {
  try {
    const mod = require(path.resolve(p));
    const html = renderToStaticMarkup(React.createElement(mod.default || mod, {}));
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const src2 = fs.readFileSync(p, 'utf8');
    rows.push({
      page: p.replace(/^pages/, '').replace(/\.jsx$/, '').replace(/\/index$/, '') || '/',
      chars: text.length,
      h2: (html.match(/<h2/g) || []).length,
      tables: (html.match(/<table/g) || []).length,
      schema: /StructuredData|application\/ld\+json/.test(src2) ? 'Y' : '-',
      answer: /QuickAnswer/.test(src2) ? 'Y' : '-',
      paa: /PeopleAlsoAsk/.test(src2) ? 'Y' : '-',
      faq: /generateFAQSchema|FAQPage|FAQSection/.test(src2) ? 'Y' : '-',
      facts: /lib\/facts/.test(src2) ? 'Y' : '-',
    });
  } catch (e) {
    rows.push({ page: p, chars: -1, err: String(e.message).split('\n')[0] });
  }
}
rows.sort((a, b) => a.chars - b.chars);
console.log('page'.padEnd(48), 'chars'.padStart(6), ' h2 tbl schema ans paa faq facts');
for (const r of rows) {
  if (r.chars < 0) { console.log(r.page.padEnd(48), '  RENDER FAIL —', r.err); continue; }
  console.log(r.page.padEnd(48), String(r.chars).padStart(6),
    String(r.h2).padStart(3), String(r.tables).padStart(3),
    '   ' + r.schema, '    ' + r.answer, '  ' + r.paa, '  ' + r.faq, '   ' + r.facts);
}
const thin = rows.filter((r) => r.chars >= 0 && r.chars < 4000);
console.log('\nTotal pages:', rows.length, '| under 4,000 rendered chars:', thin.length);
