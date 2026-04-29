/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",

              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com" +
              " https://ssl.google-analytics.com" +
              " https://www.googleadservices.com" +      // ✅ ADDED
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net" +
              " https://googleads.g.doubleclick.net",

              // ✅ Only ONE frame-src
              "frame-src" +
              " https://www.googletagmanager.com" +
              " https://td.doubleclick.net",

              "connect-src 'self'" +
              " https://www.googleadservices.com" +
              " https://google.co.in" +
              " https://www.google.co.in" +
              " https://*.google.co.in" +               // ✅ ADDED (pagead subdomains)
              " https://www.google.com" +
              " https://*.google.com" +                 // ✅ ADDED
              " https://www.google-analytics.com" +
              " https://region1.google-analytics.com" +
              " https://analytics.google.com" +
              " https://stats.g.doubleclick.net" +
              " https://www.googletagmanager.com" +
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net",

              "img-src 'self' data: blob: https:" +
              " https://images.unsplash.com" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com" +
              " https://www.google.com" +
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net",

              // ✅ ADDED googletagmanager.com for GTM debug badge CSS
              "style-src 'self' 'unsafe-inline'" +
              " https://fonts.googleapis.com" +
              " https://unpkg.com" +
              " https://www.googletagmanager.com",      // ✅ ADDED

              "font-src 'self' data: https://fonts.gstatic.com",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;