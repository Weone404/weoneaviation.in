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

              // ── Scripts ──────────────────────────────────────────────────────
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com" +
              " https://ssl.google-analytics.com" +
              " https://www.googleadservices.com" +
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net" +
              " https://googleads.g.doubleclick.net" +
              " https://tecmicra.com" +               // ✅ tecmicra tracking scripts
              " https://*.tecmicra.com",              // ✅ tecmicra subdomains (e.g. track., api.)

              // ── Iframes your site loads ───────────────────────────────────
              "frame-src" +
              " https://www.googletagmanager.com" +
              " https://td.doubleclick.net" +
              " https://tecmicra.com" +               // ✅ tecmicra iframe widgets
              " https://*.tecmicra.com",              // ✅ tecmicra subdomains

              // ── Who can embed YOUR site in an iframe ──────────────────────
              // ✅ 'none' → 'self' + tecmicra.com (the core fix the SEO team needed)
              "frame-ancestors 'self' https://tecmicra.com https://*.tecmicra.com",

              // ── Fetch / XHR / WebSocket ───────────────────────────────────
              "connect-src 'self'" +
              " https://www.googleadservices.com" +
              " https://google.co.in" +
              " https://www.google.co.in" +
              " https://*.google.co.in" +
              " https://www.google.com" +
              " https://*.google.com" +
              " https://www.google-analytics.com" +
              " https://region1.google-analytics.com" +
              " https://analytics.google.com" +
              " https://stats.g.doubleclick.net" +
              " https://www.googletagmanager.com" +
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net" +
              " https://tecmicra.com" +               // ✅ tecmicra API / tracking calls
              " https://*.tecmicra.com",              // ✅ tecmicra subdomains

              // ── Images / Pixels ───────────────────────────────────────────
              "img-src 'self' data: blob: https:" +
              " https://images.unsplash.com" +
              " https://www.googletagmanager.com" +
              " https://www.google-analytics.com" +
              " https://www.google.com" +
              " https://*.clarity.ms" +
              " https://googleleads.g.doubleclick.net" +
              " https://tecmicra.com" +               // ✅ tecmicra tracking pixels
              " https://*.tecmicra.com",              // ✅ tecmicra subdomains

              // ── Styles ────────────────────────────────────────────────────
              "style-src 'self' 'unsafe-inline'" +
              " https://fonts.googleapis.com" +
              " https://unpkg.com" +
              " https://www.googletagmanager.com",

              // ── Fonts ─────────────────────────────────────────────────────
              "font-src 'self' data: https://fonts.gstatic.com",

              "upgrade-insecure-requests",
            ].join("; "),
          },

          {
            // Legacy header — cannot allowlist specific third-party domains.
            // SAMEORIGIN is the closest safe value; actual tecmicra.com
            // embedding is controlled by frame-ancestors in CSP above.
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
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