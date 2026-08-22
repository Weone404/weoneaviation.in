/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dw8f4vrth/**',
      },
    ],
  },

  // ── 301 redirect: enforce non-www as the canonical domain ───────────────
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
      
      // ── Duplicate content consolidation (GEO audit 2026-08-11) ────────────
      // Measured by diffing the page sources. Targets were chosen by existing
      // signal strength (internal links + sitemap presence), so equity flows
      // from the weaker URL into the stronger one, never the reverse:
      //
      //   /blogs/ppl-course-fees      10 lines from /courses/ppl (32 inbound)
      //   /blogs/cpl-full-form         6 lines from /courses/cpl (34 inbound)
      //   /courses/cpl-flight-training 35 lines from /courses/cpl, and only
      //                                5 inbound links of its own
      //
      // /commercial-pilot-license (55 inbound) is genuinely distinct content
      // and remains the hub. /blogs/dgca-exam-guide was left alone — it used to
      // duplicate the DGCA course page but has since been rewritten and is now
      // a different article.
      { source: '/blogs/ppl-course-fees', destination: '/courses/ppl', permanent: true },
      { source: '/blogs/cpl-full-form', destination: '/courses/cpl', permanent: true },
      { source: '/courses/cpl-flight-training', destination: '/courses/cpl', permanent: true },

      // ── City-page consolidation (Phase 5, 2026-08-19) ────────────────────
      // The city pages were one template with the place name swapped. Only
      // Delhi describes a real location — the Dwarka Sector 7 branch — so it
      // is the only one kept. Everything else folds into the India hub.
      //
      // Every rule below lands on its FINAL destination in one hop. The nested
      // /pilot-training-in/<city> routes point straight at the hub rather than
      // at their flat twin, because the flat twin is itself redirected.

      // 13 nested routes (pages/pilot-training-in/[city].jsx, now deleted)
      { source: '/pilot-training-in/bangalore', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/chennai', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/delhi', destination: '/pilot-training-in-delhi', permanent: true },
      { source: '/pilot-training-in/gujarat', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/haryana', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/hyderabad', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/jaipur', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/kerala', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/kolkata', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/mumbai', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/nagpur', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/pune', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in/punjab', destination: '/pilot-training-in-india', permanent: true },

      // 25 flat city and state pages -> the India hub
      { source: '/pilot-training-in-andhra-pradesh', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-arunachal-pradesh', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-assam', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-bangalore', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-bihar', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-chennai', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-chhattisgarh', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-coimbatore', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-ghaziabad', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-goa', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-gujarat', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-gurugram', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-haryana', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-hyderabad', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-jaipur', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-kerala', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-kolkata', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-maharashtra', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-mumbai', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-nagpur', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-noida', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-pune', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-punjab', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-rajasthan', destination: '/pilot-training-in-india', permanent: true },
      { source: '/pilot-training-in-tamil-nadu', destination: '/pilot-training-in-india', permanent: true },

      // Near-exact twin: identical to /pilot-training-in-delhi apart from the
      // import path and a 2025/2026 date.
      { source: '/blogs/pilot-training-delhi', destination: '/pilot-training-in-delhi', permanent: true },


      {
        source: '/our-courses',
        destination: '/courses',
        permanent: true,
      },
      
      {
        source: '/our-courses/:path*',
        destination: '/courses/:path*',
        permanent: true,
      },
      
      {
        source: '/tag/:path*',
        destination: '/blogs',
        permanent: true,
      },
      
      {
        source: '/category/:path*',
        destination: '/blogs',
        permanent: true,
      },
      
      {
        source: '/author/:path*',
        destination: '/blogs',
        permanent: true,
      },
      
      {
        source: '/:path*/feed',
        destination: '/blogs',
        permanent: true,
      },
      
      {
        source: '/:path*/page/:num',
        destination: '/blogs',
        permanent: true,
      },
      
      {
        source: '/airline-preparatory-classes/psychometry/',
        destination: '/airline-preparatory-classes/psychometry',
        permanent: true,
      },
      
      {
        source: '/courses/',
        destination: '/courses',
        permanent: true,
      },
      
      {
        source: '/courses/cpl/',
        destination: '/courses/cpl',
        permanent: true,
      },
      
      {
        source: '/courses/cpl-flight-training/',
        destination: '/courses/cpl',
        permanent: true,
      },
      
      {
        source: '/courses/dgca-ground-classes/',
        destination: '/courses/dgca-ground-classes',
        permanent: true,
      },
      
      {
        source: '/courses/ppl/',
        destination: '/courses/ppl',
        permanent: true,
      },
      
      {
        source: '/flying-school/australia/',
        destination: '/flying-school/australia',
        permanent: true,
      },
      
      {
        source: '/flying-school/india/',
        destination: '/flying-school/india',
        permanent: true,
      },
      
      {
        source: '/flying-school/south-africa/',
        destination: '/flying-school/south-africa',
        permanent: true,
      },
      
      {
        source: '/flying-school/usa/',
        destination: '/flying-school/usa',
        permanent: true,
      },
      
      {
        source: '/privacy-policy/',
        destination: '/privacy-policy',
        permanent: true,
      },
      
      {
        source: '/terms/',
        destination: '/terms',
        permanent: true,
      },
      
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      
      {
        source: '/air-arabia-cadet-pilot-program',
        destination: '/emirates-cadet-pilot-program',
        permanent: true,
      },
      
      {
        source: '/apply-for-computer-number',
        destination: '/dgca-computer-number',
        permanent: true,
      },
      
      {
        source: '/best-dgca-classes',
        destination: '/dgca-ground-classes',
        permanent: true,
      },
      
      {
        source: '/best-pilot-training-institute-in-india',
        destination: '/pilot-training-in-india',
        permanent: true,
      },
      
      {
        source: '/best-pilot-training-institute-in-india-weone-aviation-delhi',
        destination: '/pilot-training-in-delhi',
        permanent: true,
      },
      
      {
        source: '/best-pilot-training-institute-in-india-weone-aviation-delhi-2',
        destination: '/pilot-training-in-delhi',
        permanent: true,
      },
      
      {
        source: '/best-flight-training-institute-for-aspiring-pilots',
        destination: '/courses/cpl',
        permanent: true,
      },
      
      {
        source: '/best-flight-simulators-classes-for-pilot-training',
        destination: '/advanced-atpl-pilot-training',
        permanent: true,
      },
      
      {
        source: '/cadet-pilot-program',
        destination: '/emirates-cadet-pilot-program',
        permanent: true,
      },
      
      {
        source: '/cpl-full-form',
        destination: '/full-form-of-cpl-commercial-pilot-license',
        permanent: true,
      },
      
      {
        source: '/cpl-training-in-abroad',
        destination: '/courses/cpl',
        permanent: true,
      },
      
      {
        source: '/cpl-training-in-india',
        destination: '/pilot-training-in-india',
        permanent: true,
      },
      
      {
        source: '/commercial-pilot-license-air-navigation',
        destination: '/commercial-pilot-license',
        permanent: true,
      },
      
      {
        source: '/commercial-pilot-training-course',
        destination: '/pilot-course-training-in-india',
        permanent: true,
      },
      
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      
      {
        source: '/dgca-cpl-ground-classes',
        destination: '/dgca-ground-classes',
        permanent: true,
      },

      {
        source: '/access-dgca-exam-papers-practice-papers',
        destination: '/dgca-ground-classes',
        permanent: true,
      },
      
      {
        source: '/ecga-login-your-compl',
        destination: '/ecga-login-your-complete-guide',
        permanent: true,
      },
      
      {
        source: '/flying-school',
        destination: '/flying-school/australia',
        permanent: true,
      },
      
      {
        source: '/flying-school/uk',
        destination: '/flying-school/australia',
        permanent: true,
      },
      
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      
      {
        source: '/how-to-become-a-pilot',
        destination: '/how-to-become-a-pilot-after-12th',
        permanent: true,
      },
      
      {
        source: '/how-to-get-scholarship-for-pilot-training-in-india',
        destination: '/how-to-become-a-pilot/in-india',
        permanent: true,
      },
      
      {
        source: '/how-to-obtain-dgca-class-2-class-1-medical',
        destination: '/dgca-class-2-class-1-medical',
        permanent: true,
      },
      
      {
        source: '/pilot-course-fees',
        // was /blogs/ppl-course-fees, which now 301s on to the same target
        destination: '/courses/ppl',
        permanent: true,
      },
      
      {
        source: '/pilot-course-fees-in-india',
        destination: '/pilot-course-training-in-india',
        permanent: true,
      },
      
      {
        source: '/pilot-exam-in-delhi',
        destination: '/pilot-training-in-delhi',
        permanent: true,
      },
      
      {
        source: '/pilot-salary-in-india',
        destination: '/pilot-training-in-india',
        permanent: true,
      },
      
      {
        source: '/pilot-training',
        destination: '/advanced-atpl-pilot-training',
        permanent: true,
      },
      
      {
        source: '/pilot-training-academy',
        destination: '/advanced-atpl-pilot-training',
        permanent: true,
      },
      
      {
        source: '/private-pilot-license-ppl-course-fees',
        destination: '/private-pilot-license-ppl-course-details',
        permanent: true,
      },
      
      {
        source: '/scholarship-for-pilot-training-in-india',
        destination: '/pilot-training-in-india',
        permanent: true,
      },
      
      {
        source: '/spice-jet-cadet-pilot-program',
        destination: '/emirates-cadet-pilot-program',
        permanent: true,
      },
      
      {
        source: '/airline-preparation',
        destination: '/airline-preparation-course',
        permanent: true,
      },
      
      {
        source: '/aviation-course-after-12th-detailed-fees-and-admission-guide',
        destination: '/blogs/aviation-course-after-12th',
        permanent: true,
      },
      
      {
        source: '/blog/aviation-course-after-12th',
        destination: '/blogs/aviation-course-after-12th',
        permanent: true,
      },
      
      {
        source: '/blog/cpl-full-form',
        // was /blogs/cpl-full-form, which now 301s on to the same target
        destination: '/courses/cpl',
        permanent: true,
      },
      
      {
        source: '/blog/dgca-exam-guide',
        destination: '/blogs/dgca-exam-guide',
        permanent: true,
      },
      
      {
        source: '/blog/pilot-training-delhi',
        // was /blogs/pilot-training-delhi, which now 301s on to the same target
        destination: '/pilot-training-in-delhi',
        permanent: true,
      },
      
      {
        source: '/blog/ppl-course-fees',
        // was /blogs/ppl-course-fees, which now 301s on to the same target
        destination: '/courses/ppl',
        permanent: true,
      },
      
      {
        source: '/commercial-pilot-salary',
        destination: '/commercial-pilot-license-salary',
        permanent: true,
      },
      
      {
        source: '/https-www-weoneaviation-in-ecga-login-your-complete-guide',
        destination: '/ecga-login-your-complete-guide',
        permanent: true,
      },
      
      {
        source: '/pilot-training-in-kerela',
        // was /pilot-training-in-assam, which now 301s on to the hub
        destination: '/pilot-training-in-india',
        permanent: true,
      },
      
      {
        source: '/master-the-dgca-cpl-exam-complete-guide-to-syllabus-subjects-and-success-tips',
        destination: '/dgca-pariksha',
        permanent: true,
      },
      
      {
        source: '/pilot-kaise-bane',
        destination: '/how-to-become-a-pilot-after-12th',
        permanent: true,
      },
      
      {
        source: '/rtr-magic',
        destination: '/rtr-a',
        permanent: true,
      },
    ];
  },

  async headers() {
    if (!isProduction) {
      return [];
    }

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",

              "script-src 'self' 'unsafe-inline' 'unsafe-eval'" +
              ' https://www.google-analytics.com' +
              ' https://ssl.google-analytics.com' +
              ' https://www.googleadservices.com' +
              ' https://www.googletagmanager.com' +
              ' https://googletagmanager.com' +
              ' https://*.googletagmanager.com' +
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
              ' https://googletagmanager.com' +
              ' https://*.googletagmanager.com' +
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
              ' https://www.google-analytics.com' +
              ' https://www.google.com' +
              ' https://*.clarity.ms' +
              ' https://agents.dante-ai.com' +
              ' https://googleleads.g.doubleclick.net' +
              ' https://tecmicra.com' +
              ' https://*.tecmicra.com',

              "style-src 'self' 'unsafe-inline'" +
              ' https://fonts.googleapis.com' +
              ' https://unpkg.com',

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

module.exports = withBundleAnalyzer(nextConfig);