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

  // ── 301 redirect: enforce www as the canonical domain ──────────────────────
  // Vercel runs this at the Edge — zero latency, no Lambda cold start.
  // This eliminates the www vs non-www duplicate content split.
  async redirects() {
    return [
      {
        source: '/Pilot-Course-&-Pilot-Training-in -ndia',
        destination: '/pilot-course-training-in-india',
        permanent: true,
      },
      {
        source: '/Pilot-Course-&-Pilot-Training-in-india',
        destination: '/pilot-course-training-in-india',
        permanent: true,
      },
      {
        source: '/pilot-training-courses',
        destination: '/pilot-course-training-in-india',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'weoneaviation.in' }],
        destination: 'https://www.weoneaviation.in/:path*',
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
              ' https://b.clarity.ms' +
              ' https://c.clarity.ms' +
              ' https://www.clarity.ms' +
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
              ' https://b.clarity.ms' +
              ' https://c.clarity.ms' +
              ' https://www.clarity.ms' +
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