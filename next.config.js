/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
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

              // GTM script + Analytics
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com" +
              " https://ssl.google-analytics.com",

              // GTM noscript iframe (ns.html) + tag iframes
              "frame-src" +
              " https://www.googletagmanager.com" +
              " https://td.doubleclick.net",

              // GTM data collection + GA endpoints
              "connect-src 'self'" +
              " https://www.google.com" +
              " https://www.google-analytics.com" +
              " https://region1.google-analytics.com" +
              " https://analytics.google.com" +
              " https://stats.g.doubleclick.net" +
              " https://www.googletagmanager.com",

              // Images (GTM pixel + existing)
              "img-src 'self' data: blob: https:" +
              " https://images.unsplash.com" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com" +
              " https://www.google.com",

              // Styles
              "style-src 'self' 'unsafe-inline'" +
              " https://fonts.googleapis.com" +
              " https://unpkg.com",

              // Fonts
              "font-src 'self' data: https://fonts.gstatic.com",

              // Prevent clickjacking
              "frame-ancestors 'none'",

              // Block mixed content
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Recommended companion headers
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