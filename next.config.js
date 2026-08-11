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
        destination: '/courses/cpl-flight-training',
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
        destination: '/courses/cpl-flight-training',
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
        destination: '/courses/cpl-flight-training',
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
        destination: '/blogs/ppl-course-fees',
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
        destination: '/blogs/cpl-full-form',
        permanent: true,
      },
      
      {
        source: '/blog/dgca-exam-guide',
        destination: '/blogs/dgca-exam-guide',
        permanent: true,
      },
      
      {
        source: '/blog/pilot-training-delhi',
        destination: '/blogs/pilot-training-delhi',
        permanent: true,
      },
      
      {
        source: '/blog/ppl-course-fees',
        destination: '/blogs/ppl-course-fees',
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
        destination: '/pilot-training-in-assam',
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

module.exports = nextConfig;