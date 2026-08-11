/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      // Remove unsplash once you download the hero image to /public/assets/hero-bg.webp
      // {
      //   protocol: 'https',
      //   hostname: 'images.unsplash.com',
      // },
    ],
  },

  // ── 301 redirect: enforce non-www as the canonical domain ──────────────────
  // Production already serves the bare domain (weoneaviation.in) with a 200 and
  // redirects www → non-www. This rule matches that reality so every canonical,
  // OG tag, schema URL, sitemap entry, and llms.txt link agrees on ONE hostname.
  // Vercel runs this at the Edge — zero latency, no Lambda cold start.
  async redirects() {
    // Cities that had BOTH a flat /pilot-training-in-<city> page and a thin
    // nested /pilot-training-in/<city> duplicate. The nested route has been
    // deleted; these 301s preserve any equity the old URLs earned.
    const nestedCityDuplicates = [
      'delhi', 'mumbai', 'bangalore', 'hyderabad', 'chennai', 'pune',
      'kolkata', 'jaipur', 'nagpur', 'kerala', 'gujarat', 'haryana', 'punjab',
    ];

    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.weoneaviation.in' }],
        destination: 'https://weoneaviation.in/:path*',
        permanent: true,
      },

      // ── Duplicate content consolidation (GEO audit 2026-08-11) ─────────────
      // /courses/cpl was 97% identical to /courses/cpl-flight-training and
      // shared its exact title and meta description. Three URLs competed for
      // the site's most valuable topic; only one should.
      {
        source: '/courses/cpl',
        destination: '/courses/cpl-flight-training',
        permanent: true,
      },

      // Three blog posts were byte-identical to a course page, and in each case
      // the body matched neither the URL nor the title. Each now redirects to
      // the page whose URL matches what the duplicate's URL actually promises,
      // so one URL owns each query instead of three splitting it:
      //   ppl-course-fees  → the PPL course page, which carries the fees
      //   dgca-exam-guide  → the DGCA ground classes page, which is exam prep
      //   cpl-full-form    → the CPL definition page, not the training page
      { source: '/blogs/ppl-course-fees', destination: '/courses/ppl', permanent: true },
      { source: '/blogs/dgca-exam-guide', destination: '/courses/dgca-ground-classes', permanent: true },
      { source: '/blogs/cpl-full-form', destination: '/full-form-of-cpl-commercial-pilot-license', permanent: true },

      // ── /blog/* → /blogs/* ────────────────────────────────────────────────
      // Production serves this redirect but no rule for it existed in this
      // repository — the same "live site is not built from this branch" gap
      // that produced the www/apex split. Without it, deploying this branch
      // would 404 every /blog/* URL that is currently indexed and redirecting.
      // Placed after the specific /blogs rules above so a /blog/cpl-full-form
      // request lands on the final destination, not on a second hop.
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/ppl-course-fees', destination: '/courses/ppl', permanent: true },
      { source: '/blog/dgca-exam-guide', destination: '/courses/dgca-ground-classes', permanent: true },
      { source: '/blog/cpl-full-form', destination: '/full-form-of-cpl-commercial-pilot-license', permanent: true },
      { source: '/blog/aviation-academy', destination: '/about-us', permanent: true },
      { source: '/blog/:slug*', destination: '/blogs/:slug*', permanent: true },

      // ── Thin nested city duplicates → canonical flat city pages ───────────
      ...nestedCityDuplicates.map((city) => ({
        source: `/pilot-training-in/${city}`,
        destination: `/pilot-training-in-${city}`,
        permanent: true,
      })),
      // Template artifacts that were live and sitemapped but were never pages.
      { source: '/pilot-training-in/fallback', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/paths', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/:city*', destination: '/pilot-training-in-india', permanent: true },

      // NOTE: the capitalised→lowercase redirects for the airline pages are NOT
      // here. next.config.js matches `source` CASE-INSENSITIVELY, so a rule
      // `/Indigo-pilot-preparation → /indigo-pilot-preparation` also matches the
      // lowercase URL and redirects it to itself — an infinite loop. Those two
      // redirects live in middleware.js, which can compare case exactly.

      // ── Legacy URLs that are indexed but have no page ─────────────────────
      // /our-courses is disallowed in robots.txt yet was still serving 200 and
      // ranking. /aviation-academy-we-one-aviation-academy returns 404 but is
      // still in Google's index. Both now resolve to their real successors.
      { source: '/our-courses', destination: '/courses', permanent: true },
      { source: '/our-courses/:path*', destination: '/courses', permanent: true },
      { source: '/aviation-academy-we-one-aviation-academy', destination: '/about-us', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",

              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
              ' https://www.googletagmanager.com' +
              ' https://www.google-analytics.com' +
              ' https://ssl.google-analytics.com' +
              ' https://www.googleadservices.com' +
              ' https://*.clarity.ms' +
              // Allow Dante AI chatbot embed
              ' https://agents.dante-ai.com' +
              ' https://googleleads.g.doubleclick.net' +
              ' https://googleads.g.doubleclick.net' +
              ' https://tecmicra.com' +
              ' https://*.tecmicra.com',

              'frame-src' +
              ' https://www.googletagmanager.com' +
              ' https://td.doubleclick.net' +
              ' https://tecmicra.com' +
              ' https://*.tecmicra.com' +
              ' https://agents.dante-ai.com',

              "frame-ancestors 'self' https://tecmicra.com https://*.tecmicra.com",

              "connect-src 'self'" +
              ' https://www.googleadservices.com' +
              ' https://google.co.in' +
              ' https://www.google.co.in' +
              ' https://*.google.co.in' +
              ' https://www.google.com' +
              ' https://*.google.com' +
              ' https://www.google-analytics.com' +
              ' https://region1.google-analytics.com' +
              ' https://analytics.google.com' +
              ' https://stats.g.doubleclick.net' +
              ' https://ad.doubleclick.net' + 
              ' https://www.googletagmanager.com' +
              ' https://agents.dante-ai.com' +
              ' https://*.clarity.ms' +
              ' https://agents.dante-ai.com' +
              ' https://googleleads.g.doubleclick.net' +
              ' https://tecmicra.com' +
              ' https://*.tecmicra.com',

              // Removed images.unsplash.com — hero image should be self-hosted
              "img-src 'self' data: blob: https:" +
              ' https://www.googletagmanager.com' +
              ' https://www.google-analytics.com' +
              ' https://www.google.com' +
              ' https://*.clarity.ms' +
              ' https://agents.dante-ai.com' +
              ' https://googleleads.g.doubleclick.net' +
              ' https://tecmicra.com' +
              ' https://*.tecmicra.com',

              "style-src 'self' 'unsafe-inline'" +
              ' https://fonts.googleapis.com' +
              ' https://unpkg.com' +
              ' https://www.googletagmanager.com',

              "font-src 'self' data: https://fonts.gstatic.com",

              'upgrade-insecure-requests',
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;