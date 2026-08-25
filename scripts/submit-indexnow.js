#!/usr/bin/env node
/**
 * IndexNow submission.
 *
 * Pushes the current sitemap URL list to the IndexNow API so Bing (and
 * therefore Copilot, which sources from the Bing index) picks up changes
 * without waiting for a recrawl. Google does not participate in IndexNow;
 * that side still goes through Search Console.
 *
 * RUN THIS AFTER A DEPLOY, NEVER DURING THE BUILD.
 * IndexNow verifies ownership by fetching
 *   https://weoneaviation.in/<key>.txt
 * from the LIVE site. Submitting before the deploy means the key file is not
 * yet reachable, the endpoint returns 403, and the submission is wasted.
 *
 *   npm run submit:indexnow            # submit every URL in the sitemap
 *   npm run submit:indexnow -- --dry   # print what would be sent, send nothing
 *
 * The key is public by design — it is a proof-of-control token, not a secret,
 * and the file that proves it is served openly from public/. It is read from
 * INDEXNOW_KEY if set, otherwise discovered from the single public/<key>.txt.
 */
const fs = require('fs');
const path = require('path');

const HOST = 'weoneaviation.in';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const SITEMAP = path.join(process.cwd(), '.generated-sitemap.xml');
const DRY = process.argv.includes('--dry');

function resolveKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim();
  const pub = path.join(process.cwd(), 'public');
  const candidates = fs.readdirSync(pub).filter((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f));
  if (candidates.length === 1) return path.basename(candidates[0], '.txt');
  if (candidates.length === 0) {
    throw new Error('No IndexNow key file found in public/ and INDEXNOW_KEY is unset.');
  }
  throw new Error(`Multiple key-shaped files in public/ (${candidates.join(', ')}). Set INDEXNOW_KEY to disambiguate.`);
}

function readUrls() {
  if (!fs.existsSync(SITEMAP)) {
    throw new Error('.generated-sitemap.xml not found — run `npm run generate:sitemap` first.');
  }
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const key = resolveKey();
  const urlList = readUrls();
  if (!urlList.length) throw new Error('Sitemap contained no <loc> entries.');

  console.log(`IndexNow: ${urlList.length} URLs, key ${key.slice(0, 8)}…`);
  console.log(`          proof file must be live at https://${HOST}/${key}.txt`);

  if (DRY) {
    urlList.slice(0, 10).forEach((u) => console.log('   ' + u));
    if (urlList.length > 10) console.log(`   … and ${urlList.length - 10} more`);
    console.log('\nDry run — nothing submitted.');
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${key}.txt`, urlList }),
  });

  // 200 accepted, 202 accepted-pending-key-validation. Both are successes.
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: accepted (HTTP ${res.status}).`);
    return;
  }
  const body = await res.text().catch(() => '');
  const hint = {
    400: 'malformed request',
    403: 'key not valid — is the proof file deployed and reachable?',
    422: 'URLs do not match the declared host, or the key does not match',
    429: 'rate limited — try again later',
  }[res.status] || 'unexpected response';
  console.error(`IndexNow: FAILED (HTTP ${res.status}) — ${hint}`);
  if (body) console.error(body.slice(0, 400));
  process.exit(1);
}

main().catch((e) => { console.error('IndexNow: ' + e.message); process.exit(1); });
