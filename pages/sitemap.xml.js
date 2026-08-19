const fs = require('fs');
const path = require('path');

/**
 * ⚠️ THE `pages` ARRAY BELOW IS DEAD CODE. EDITING IT CHANGES NOTHING.
 *
 * getSitemapXml() at the bottom of this file returns the contents of
 * .generated-sitemap.xml (written by scripts/generate-sitemap.js during
 * `npm run build`) and falls back to the root sitemap.xml. Neither path ever
 * reads this array — it is a leftover from when this route generated the XML
 * itself, and it has since drifted out of sync with what is actually served.
 *
 * To change the sitemap, edit scripts/generate-sitemap.js. That script walks
 * pages/ and derives URLs from the filesystem, so adding or deleting a page
 * updates the sitemap automatically; the host comes from the `host` constant
 * at the top of it.
 *
 * Left in place rather than deleted so the history of what used to be listed
 * stays available, but do not trust it as a record of the live sitemap.
 */
/*
 * The hand-maintained `pages` array that used to live here was removed on
 * 2026-08-19. It was dead: getSitemapXml() below returns .generated-sitemap.xml
 * (written by scripts/generate-sitemap.js at build time) whenever that file
 * exists, which it always does after `npm run build`. The array had drifted to
 * list city pages that are now 301s, and it had already cost review time twice.
 * Edit scripts/generate-sitemap.js instead.
 */

function getSitemapXml() {
    const sitemapPath = path.join(process.cwd(), 'sitemap.xml');

    const generatedPath = path.join(process.cwd(), '.generated-sitemap.xml');
    if (fs.existsSync(generatedPath)) {
        return fs.readFileSync(generatedPath, 'utf8');
    }

    if (fs.existsSync(sitemapPath)) {
        return fs.readFileSync(sitemapPath, 'utf8');
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
}

export default function SitemapXML() {
    return null;
}

export async function getServerSideProps({ res }) {
    const xml = getSitemapXml();

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(xml);
    res.end();

    return { props: {} };
}