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
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.weoneaviation.in' }],
        destination: 'https://weoneaviation.in/:path*',
        permanent: true,
      },
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