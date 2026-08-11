export default function RobotsTxt() {
    return null;
}

export async function getServerSideProps({ res }) {
    const content = `# robots.txt for weoneaviation.in
# Last Updated: 2026-04-25
# Purpose: Guide search engines and bots on crawling and indexing

# ===== DEFAULT RULES FOR ALL BOTS =====
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/
Disallow: /.git/
Disallow: /node_modules/
Disallow: /data/
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
Disallow: /_next/
Disallow: /admin/

# ===== BING/YAHOO =====
User-agent: Bingbot
Allow: /
Disallow: /api/
Disallow: /_next/
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
# Named explicitly on purpose. These bots are already covered by the
# "User-agent: *  Allow: /" group, but robots.txt uses most-specific-group-wins:
# if any future edit adds a restrictive rule, an explicit group here keeps AI
# answer engines reading the site. Two roles per vendor — the indexing crawler
# that builds the model's search corpus, and the live user-triggered fetcher
# that retrieves a page while answering a question. Both need access to be cited.

# OpenAI / ChatGPT
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Anthropic / Claude
User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

# Google Gemini / AI Overviews training + grounding
User-agent: Google-Extended
Allow: /

# Apple Intelligence
User-agent: Applebot
Allow: /

User-agent: Applebot-Extended
Allow: /

# Common Crawl — the corpus most open models train on
User-agent: CCBot
Allow: /

# Meta AI
User-agent: meta-externalagent
Allow: /

# Amazon
User-agent: Amazonbot
Allow: /

# Mistral
User-agent: MistralAI-User
Allow: /

# ===== SITEMAP LOCATION =====
Sitemap: https://weoneaviation.in/sitemap.xml`;

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.write(content);
    res.end();

    return { props: {} };
}