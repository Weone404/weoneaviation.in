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

const pages = process.argv.slice(2);
if (!pages.length) {
  console.error('usage: node scripts/smoke-render.cjs pages/a.jsx [pages/b.jsx ...]');
  process.exit(1);
}

let failed = 0;
for (const p of pages) {
  try {
    const mod = require(path.resolve(ROOT, p));
    const html = renderToStaticMarkup(React.createElement(mod.default || mod, {}));
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const problems = [];
    if (/undefined/.test(text)) problems.push('renders the word "undefined"');
    if (/NaN/.test(text)) problems.push('renders NaN');
    if (/\[object Object\]/.test(text)) problems.push('renders [object Object]');
    const h1s = (html.match(/<h1[^>]*>/g) || []).length;
    console.log(`${problems.length ? 'FAIL' : 'ok  '} ${p}  ${text.length} chars, ${h1s} h1${problems.length ? '  ' + problems.join('; ') : ''}`);
    if (problems.length) failed++;
  } catch (e) {
    failed++;
    console.log(`CRASH ${p}\n      ${String(e.message).split('\n')[0]}`);
  }
}
console.log(failed ? `\n${failed} page(s) with problems` : '\nall pages rendered clean');
process.exit(failed ? 1 : 0);
