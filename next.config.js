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

              // ✅ API / tracking connections
              "connect-src 'self' https://www.google.com https://www.google-analytics.com https://region1.google-analytics.com",

              // ✅ Scripts (GTM + Analytics)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",

              // ✅ Images
              "img-src 'self' data: blob: https: https://images.unsplash.com https://www.googletagmanager.com",

              // ✅ Styles (fonts + quill)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com",

              // ✅ Fonts
              "font-src 'self' data: https://fonts.gstatic.com",

              // ✅ GTM iframe
              "frame-src https://www.googletagmanager.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;