/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1600, 1920, 2560],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

  // The www -> apex 301 that this comment used to claim existed is now real.
  // It lives at the top of the redirects() array below, where it can be seen.
  // Do not describe a rule here that is not implemented; that is how this one
  // went missing for as long as it did.
  /*
   * ── Database-post consolidation: still pending ────────────────────────────
   *
   * Thirty posts authored through /admin/blog live at MongoDB ObjectId URLs and
   * self-canonicalise to them, carrying no keyword signal. Three topics are also
   * duplicated across seven URLs, splitting their own ranking signal.
   *
   * A line moves into the ACTIVE block above in the same commit as the rebuild
   * that gives it a destination. Never before.
   *
   * { source: '/blogs/6a7034d8cf8e38fea1c417a5', destination: '/blogs/how-pilots-build-hours', permanent: true },
   * { source: '/blogs/6a1d00f816d7f55288a22710', destination: '/blogs/how-pilots-build-hours', permanent: true },
   * { source: '/blogs/6a0bf3f4a8c579faedcb51e6', destination: '/blogs/how-pilots-build-hours', permanent: true },
   * { source: '/blogs/6a8be2f757898ec159830c3e', destination: '/blogs/dgca-medical-requirements', permanent: true },
   *
   * STILL MISSING as at 2026-09-15: /blogs/how-pilots-build-hours and
   * /blogs/dgca-medical-requirements do not exist as pages. Do not activate
   * either line until they do.
   *
   * ONE CORRECTION, so nobody activates this list as written:
   *   6a8be2f757898ec159830c3e is "Aviation Safety Procedures Every Student
   *   Must Know". Pointing it at a DGCA medical page is a topic mismatch and
   *   would be a bad 301. Re-decide its destination; do not use the line above.
   *
   * The two other lines that used to sit here — 6a240cea (Multi Engine Rating
   * Explained) and 69f970e6 (CPL vs Cadet Program) — named destinations that
   * never existed. Both now point at destinations that do, and have moved into
   * the ACTIVE block below.
   *
   * THE FULL INVENTORY is now written down, which it was not before:
   * data/legacy-blog-inventory.md lists all 36 database posts and all 5
   * numeric-id posts with a status for each, read from the live blog index on
   * 15 September 2026. Work from that file, not from memory.
   */
  async redirects() {
    return [
      /*
       * ── www -> apex, 301 (ADDED 2026-09-16) ───────────────────────────────
       *
       * This rule did not exist. A comment higher up in this file claimed it
       * did — "301 redirect: enforce non-www as the canonical domain. Vercel
       * runs this at the Edge" — with nothing implementing it, and no redirect
       * in the table carried a host condition.
       *
       * VERIFIED LIVE on 2026-09-16 before writing this: fetching
       * https://www.weoneaviation.in/dgca-pariksha returned the page with no
       * redirect, and https://www.weoneaviation.in/ppl-full-form served a
       * correct apex rel=canonical alongside "index, follow". So both hostnames
       * were serving every route, with only a canonical hint to separate them.
       *
       * WHAT IT WAS COSTING, from the Semrush positions export of 2026-09-15:
       * 371 of 857 ranking rows sat on www, carrying 295,190 of the tracked
       * search volume, and 49 keywords ranked on www and apex at the same time.
       * /dgca-full-form earns its traffic on the www copy while the apex copy
       * earns none — "dgca", 90,500 volume, position 19 on www.
       *
       * A canonical is a hint. A 301 is not. This is the hint made binding.
       */
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.weoneaviation.in' }],
        destination: 'https://weoneaviation.in/:path*',
        permanent: true,
      },
      /*
       * ── Database-post consolidation (ACTIVE) ──────────────────────────────
       * Each ObjectId below is a post authored through /admin/blog that a
       * file-based rebuild now supersedes. A line is added here only once its
       * destination exists and covers the topic.
       */
      { source: '/blogs/6a040a0da7f96236c2f7ea90', destination: '/blogs/pilot-training-cost-in-india', permanent: true },
      { source: '/blogs/6a01656be977bff6d3d6bd42', destination: '/blogs/best-flying-school-in-india', permanent: true },
      { source: '/blogs/6a7178c67cef5b2241a02159', destination: '/blogs/dgca-ground-school-guide', permanent: true },
      { source: '/blogs/6a06b251216e3de16875f5b0', destination: '/blogs/dgca-ground-school-guide', permanent: true },
      /*
       * Added 2026-09-15 with /blogs/aviation-jobs-besides-pilot, which is the
       * rebuild of these. Two ObjectIds because the same post was authored
       * twice; the first carries 24 keyword mappings and 23,190 monthly
       * searches, the second 2 mappings and 140.
       */
      { source: '/blogs/6a13dbf1ad864b831525ec3b', destination: '/blogs/aviation-jobs-besides-pilot', permanent: true },
      { source: '/blogs/6a38b7aece6bdc909efab785', destination: '/blogs/aviation-jobs-besides-pilot', permanent: true },
      /*
       * Added 2026-09-15. "How to Become a Pilot in India after 12th" at this
       * ObjectId duplicates /how-to-become-a-pilot-after-12th, which already
       * exists and is the fuller of the two flat pages (564 lines against 243
       * at /how-to-become-a-pilot/after-12th). The ObjectId carries 8,100
       * monthly searches in the keyword mapping and no ranking signal of its
       * own, because it self-canonicalises to the id. No new page needed.
       */
      { source: '/blogs/69ef4fb93a29bf8490327d34', destination: '/how-to-become-a-pilot-after-12th', permanent: true },
      /*
       * Added 2026-09-15 with /how-to-choose-an-aviation-academy, which is the
       * rebuild of this post. "Best Aviation Academy Near Me — Start Your
       * Career in Aviation Today" carries 16,630 mapped monthly searches, the
       * largest term on the owner's list that had no honest home. The old post
       * answered "which academy is best" by nominating itself; the new page
       * answers it with DGCA's own approved-FTO list and published ranking,
       * and says plainly that a ground school — this one included — is not on
       * that list.
       */
      { source: '/blogs/69f1a52df3ae4e86333eac32', destination: '/how-to-choose-an-aviation-academy', permanent: true },
      /*
       * Added 2026-09-15. Four consolidations onto destinations that already
       * exist and are deeper and sourced. Each source is a database post that
       * self-canonicalises to its ObjectId, is absent from the sitemap and
       * carries no ranking signal of its own.
       *
       * 69dc860c  "DGCA Subjects Coaching — Best Training for Pilot Ground
       *           Classes in India" -> /dgca-ground-classes. Same subject,
       *           and the destination is the service page for it.
       * 69f970e6  "CPL vs Cadet Program: Which Is Better for Pilot Training?"
       *           -> /cadet-pilot-program. Its old mapping named
       *           /blogs/cpl-vs-cadet-program, which was never built. The hub
       *           shipped on 15 Sep 2026 answers exactly this question, and
       *           answers it without airline-specific figures that go stale.
       * 6a87eae0  "Importance of Simulator Training in Aviation" ->
       *           /blogs/cpl-simulator-hours-dgca-rules, which states the
       *           Schedule II cap rather than describing simulators in general.
       * 6a893d2e  "What is CRM (Crew Resource Management)?" ->
       *           /blogs/mcc-training-for-pilots-in-india. Not an identical
       *           topic: CRM is taught inside MCC rather than being the same
       *           thing. It is the closest real page on the site, and a
       *           near-topic 301 beats a thin orphan. Revisit if a dedicated
       *           CRM page is ever written.
       * 6a240cea  "Multi Engine Rating Explained" ->
       *           /blogs/multi-engine-rating-for-pilots-in-india. This is the
       *           correction of the old commented line, which named
       *           /blogs/multi-engine-rating-explained — a slug that has never
       *           existed on this site.
       */
      { source: '/blogs/69dc860c1f57ee917ebdcd84', destination: '/dgca-ground-classes', permanent: true },
      { source: '/blogs/69f970e6d58c9676b0a61c01', destination: '/cadet-pilot-program', permanent: true },
      { source: '/blogs/6a87eae016c8bc859396901b', destination: '/blogs/cpl-simulator-hours-dgca-rules', permanent: true },
      { source: '/blogs/6a893d2e2c2fb9efee8153ca', destination: '/blogs/mcc-training-for-pilots-in-india', permanent: true },
      { source: '/blogs/6a240cea7b692cb9fe764c82', destination: '/blogs/multi-engine-rating-for-pilots-in-india', permanent: true },

      {
        source: '/Pilot-Course-&-Pilot-Training-in -ndia',
        destination: '/pilot-training-in-india',
        permanent: true,
      },
      
      {
        source: '/Pilot-Course-&-Pilot-Training-in-india',
        destination: '/pilot-training-in-india',
        permanent: true,
      },
      
      {
        source: '/pilot-training-courses',
        destination: '/pilot-training-in-india',
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
      { source: '/blogs/ppl-course-fees', destination: '/ppl-full-form', permanent: true },
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
        destination: '/dgca-ground-classes',
        permanent: true,
      },
      
      {
        source: '/courses/ppl/',
        destination: '/ppl-full-form',
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
        destination: '/courses/atpl',
        permanent: true,
      },
      
      /*
       * REMOVED 2026-09-15: /cadet-pilot-program used to 301 to
       * /emirates-cadet-pilot-program, which sent every generic "cadet pilot
       * program" search onto one airline's page while six airline pages
       * competed with each other for the term. It is now a real hub page
       * sitting above all six. Do not restore this redirect.
       */
      
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
        destination: '/pilot-training-in-india',
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
        // Repointed 2026-09-11 from /commercial-pilot-license-eligibility now
        // that the medical page it was always about exists again.
        source: '/how-to-obtain-dgca-class-2-class-1-medical',
        destination: '/dgca-class-2-class-1-medical',
        permanent: true,
      },
      
      {
        source: '/pilot-course-fees',
        // was /blogs/ppl-course-fees, which now 301s on to the same target
        destination: '/ppl-full-form',
        permanent: true,
      },
      
      {
        source: '/pilot-course-fees-in-india',
        destination: '/pilot-training-in-india',
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
        destination: '/courses/atpl',
        permanent: true,
      },
      
      {
        source: '/pilot-training-academy',
        destination: '/courses/atpl',
        permanent: true,
      },
      
      {
        source: '/private-pilot-license-ppl-course-fees',
        destination: '/ppl-full-form',
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
        destination: '/ppl-full-form',
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

      /*
       * ── DUPLICATE-INTENT CLUSTER CONSOLIDATION (GEO pass) ──────────────
       * Four sets of URLs were competing for the same query. Each set now has
       * one winner; the rest 301 to it. Winners were picked on content depth
       * and URL structure, and the legacy redirects above were repointed at
       * the winners in the same pass so nothing takes two hops.
       *
       * The page files for the losing routes are intentionally left in place.
       * next.config redirects run before filesystem routing, so these win
       * regardless — and keeping the files means the content is recoverable
       * if a decision is reversed. They are excluded from the sitemap.
       *
       * NOT consolidated here: the DGCA ground-classes cluster
       * (/dgca-ground-classes, /courses/dgca-ground-classes,
       * /dgca-ground-classes-in-india). The nested URL is the DEEPEST of the
       * three at 1,060 lines while the root-level exact-match slug is the one
       * cited in public/llms.txt and the one carrying Course schema. Choosing
       * between them means merging content first, not redirecting 1,060 lines
       * into oblivion. Left alone deliberately.
       */
      { source: '/courses/ppl', destination: '/ppl-full-form', permanent: true },
      { source: '/private-pilot-license-ppl-course-details', destination: '/ppl-full-form', permanent: true },
      { source: '/advanced-atpl-pilot-training', destination: '/courses/atpl', permanent: true },
      { source: '/faq', destination: '/faqs', permanent: true },
      { source: '/pilot-course-training-in-india', destination: '/pilot-training-in-india', permanent: true },
      /*
       * RESTORED 2026-09-11. This route was retired in the 2026-08 claims pass
       * because the Class 1 / Class 2 distinction — its whole subject — could
       * not be sourced, and a URL that asserts what its page no longer says is
       * worse than no URL. The CAR that sets the distinction has since been
       * found (Section 7, Series 'C', Part I, Rev. 6 of 18 October 2022,
       * with rules 39B and 39C behind it), so the page is back and rendered
       * from lib/facts.js MEDICAL_STANDARDS. The redirect below is deleted
       * rather than commented, because a 301 to the eligibility page was
       * sending away every search for a medical class.
       */
      /*
       * Capitalised slugs retired.
       *
       * /Airindia-pilot-preparation and /Indigo-pilot-preparation shipped with
       * capital letters, which cost them their curated FAQs: getPageFAQs keys
       * on router.pathname, the routeContent keys were lowercase, and the two
       * never matched — both pages silently served generic fallback content.
       * Capitalised paths are also fragile against case-sensitive origins and
       * inconsistent inbound links.
       *
       * The page files are renamed to lowercase (a two-step `git mv`, since the
       * repo sits on a case-insensitive filesystem) and the old casings 301
       * here. Nothing links to the capitalised forms any more; these exist for
       * inbound links and anything already in an index.
       */
      { source: '/Airindia-pilot-preparation', destination: '/airindia-pilot-preparation', permanent: true },
      { source: '/Indigo-pilot-preparation', destination: '/indigo-pilot-preparation', permanent: true },
      /*
       * DGCA cluster consolidated (Workstream B).
       *
       * /courses/dgca-ground-classes carried 1,060 lines against the root
       * slug's 686 — the deeper content was sitting on the weaker URL while
       * the two competed for the same query. Everything unique to it (who it
       * is for, why theory precedes flying, class structure, online vs
       * classroom, study material, preparation method, the eight-stage
       * journey, careers, skills) was merged into /dgca-ground-classes, which
       * keeps the root slug, the llms.txt citation and the Course node.
       * Nothing was lost; the loser now 301s here.
       */
      { source: '/courses/dgca-ground-classes', destination: '/dgca-ground-classes', permanent: true },
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