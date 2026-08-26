/**
 * THIS FILE IS THE ONE THAT SERVES /robots.txt. The content is the inline
 * template literal below — edit it here.
 *
 * There is also a `robots.txt` at the repo root. Next.js only serves static
 * files out of `public/`, so that copy is dead: nothing reads it, no deploy
 * step copies it, and editing it changes nothing in production. It was
 * byte-identical to this string, which is exactly why the trap is easy to fall
 * into. (Same class as the dead `pages/sitemap.xml.js` route array and
 * `scripts/sitemap_lastmod.js` — this repo has now produced four of these.)
 *
 * GEO audit 2026-08-12:
 *  - Added CCBot and Bytespider to the AI-crawler allow list.
 *  - Dropped `Disallow: /our-courses/`. That path now 301s to /courses, and a
 *    robots block on a redirect source stops crawlers from ever following it,
 *    so the redirect could not consolidate anything.
 *
 * 2026-08-20:
 *  - Allowed Applebot-Extended, Meta-ExternalAgent, Amazonbot,
 *    Google-CloudVertexBot and DuckAssistBot. Each is an AI/answer-engine
 *    fetcher that defaults to "no" when it is not named, so silence here was
 *    a block, not a neutral position.
 *  - Note for the next pass: this whole block only ever reached production
 *    when it shipped from `master`. The CCBot/Bytespider entries above sat on
 *    an unmerged branch for eight days while /robots.txt served the old list.
 */
export default function RobotsTxt() {
    return null;
}

export async function getServerSideProps({ res }) {
    const content = `# robots.txt for weoneaviation.in
# Last Updated: 2026-08-20
# Purpose: Guide search engines and bots on crawling and indexing

# ===== DEFAULT RULES FOR ALL BOTS =====
User-agent: *
Allow: /
Disallow: /api/
Allow: /_next/static/
Disallow: /_next/data/
Disallow: /admin/
Disallow: /private/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /data/
Disallow: /tag/
Disallow: /author/
Disallow: /.env
Disallow: /package.json
Disallow: /next.config.js
Disallow: /*.json$
Disallow: /*?*sort=
Disallow: /*?*page=

# ===== GOOGLE SPECIFIC =====
User-agent: Googlebot
Allow: /
Disallow: /api/
Allow: /_next/static/
Disallow: /_next/data/
Disallow: /admin/

# ===== BING/YAHOO =====
User-agent: Bingbot
Allow: /
Disallow: /api/
Allow: /_next/static/
Disallow: /_next/data/
Disallow: /admin/

# ===== BLOCK AGGRESSIVE/HARMFUL BOTS =====
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: AhrefsBot-Site
Disallow: /

User-agent: SemrushBot-SA
Disallow: /

User-agent: SEOkicks
Disallow: /

User-agent: ProoferBot
Disallow: /

User-agent: Grapeshot
Disallow: /

User-agent: PetalBot
Disallow: /

User-agent: DaniBot
Disallow: /

User-agent: AspiegelBot
Disallow: /

User-agent: MaxOCBot
Disallow: /

User-agent: NetSparker
Disallow: /

User-agent: Qualitypredictor
Disallow: /

User-agent: YisouSpider
Disallow: /

User-agent: SputnikBot
Disallow: /

User-agent: LinkpadBot
Disallow: /

# ===== ALLOW IMPORTANT CRAWLERS =====
User-agent: YandexBot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# ===== ALLOW AI CRAWLERS (GEO) =====
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Google-CloudVertexBot
Allow: /

User-agent: DuckAssistBot
Allow: /

# ===== SITEMAP LOCATION =====
Sitemap: https://weoneaviation.in/sitemap.xml`;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.write(content);
    res.end();

    return { props: {} };
}