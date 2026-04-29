/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Fixed: remotePatterns replaces deprecated images.domains (works on Next.js 14.2.3)
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

              // ✅ Fixed: *.clarity.ms covers scripts.clarity.ms + any other subdomains
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com" +
              " https://ssl.google-analytics.com" +
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net" +
              " https://googleads.g.doubleclick.net",

              "frame-src" +
              " https://www.googletagmanager.com" +
              " https://td.doubleclick.net",

              // ✅ Fixed: *.clarity.ms for connect-src too
              "connect-src 'self'" +
              " https://www.google.com" +
              " https://www.google-analytics.com" +
              " https://region1.google-analytics.com" +
              " https://analytics.google.com" +
              " https://stats.g.doubleclick.net" +
              " https://www.googletagmanager.com" +
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net",

              // ✅ Fixed: *.clarity.ms for img-src too
              "img-src 'self' data: blob: https:" +
              " https://images.unsplash.com" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com" +
              " https://www.google.com" +
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net",

              "style-src 'self' 'unsafe-inline'" +
              " https://fonts.googleapis.com" +
              " https://unpkg.com",

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