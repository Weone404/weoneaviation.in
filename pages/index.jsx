/**
 * index.jsx — Performance-Optimized Homepage
 * We One Aviation Academy
 * Compatible with: Next.js 14.2.3
 *
 * SEO FIXES APPLIED (on top of previous fixes):
 * 1. Head: Removed duplicate preconnects (already in _document.jsx)
 * 2. Head: Added page-specific canonical, og:title, og:description,
 *          og:url, og:image (absolute URL), twitter:title, twitter:description
 * 3. Head: Added BreadcrumbList schema for homepage
 * 4. educationalOrgSchema: Fixed logo URL (was logo.png, actual file is Logo.webp)
 * 5. educationalOrgSchema: aggregateRating removed (GEO audit 2026-08-11) — see note below
 * 6. H1: Added keyword-focused <h1> in tagline banner (HeroSlider owns the hero section)
 * 7. Contact section uses the current Gmail contact address.
 */

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import CourseCard from '../components/CourseCard';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';
import { FOUNDED_YEAR } from '../data/academy';
import ShowMoreList from '../components/ShowMoreList';

// ─── LAZY LOAD HEAVY BELOW-FOLD COMPONENTS ───────────────────────────────────

const LeadForm = dynamic(() => import('../components/LeadForm'), {
  ssr: false,
  loading: () => <div className="h-64 bg-white/10 rounded-2xl animate-pulse" />,
});

const HomepagePartnerLogos = dynamic(() => import('../components/Partnerlogos'), {
  ssr: true,
  loading: () => <div className="h-24 bg-gray-100 animate-pulse" />,
});

const HomepagePassResults = dynamic(() => import('../components/Passresultsslider'), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-100 rounded-2xl animate-pulse my-4" />,
});

const HomepageFAQs = dynamic(() => import('../components/FAQs'), {
  ssr: true,
  loading: () => <div className="h-64 bg-gray-50 animate-pulse" />,
});

// ─── DATA ────────────────────────────────────────────────────────────────────

const courses = [
  { id: 'cpl', icon: '✈️', title: 'Commercial Pilot License (CPL)', duration: 'Varies by flying-school schedule', eligibility: '10+2 (PCM)', href: '/commercial-pilot-license', highlight: true },
  { id: 'atpl', icon: '🏆', title: 'ATPL', duration: 'Depends on experience and exam progress', eligibility: 'CPL holder', href: '/courses/atpl' },
  { id: 'dgca', icon: '📚', title: 'DGCA Ground Classes', duration: 'Ask about current batch schedule', eligibility: '10+2 (PCM)', href: '/dgca-ground-classes' },
  { id: 'cpl-flight', icon: '🛩️', title: 'CPL Flight Training', duration: 'Varies by selected flying school', eligibility: 'DGCA exam cleared', href: '/courses/cpl' },
];




/*
 * Only Delhi still has a page of its own — the other city pages were one
 * template with the name swapped and now 301 to the India hub (Phase 5).
 * These tiles therefore carry an explicit href rather than deriving a slug,
 * so nothing here links at a redirect.
 */
const cities = [
  { name: 'Delhi', href: '/pilot-training-in-delhi' },
];

const dgcaSubjects = [
  { id: 'nav', num: '1', title: 'Air Navigation', desc: 'Air Navigation covers guiding an aircraft from one point to another using navigational aids, instruments and calculation. The paper includes position fixing, flight planning, radio aids and the navigation computer.', link: '/air-navigation', linkText: 'click to explore more! 🚀' },
  { id: 'reg', num: '2', title: 'Air Regulations', desc: "Air Regulations covers the rules governing flight in Indian airspace: the Aircraft Act and Rules, ICAO Annexes, rules of the air, airspace classification and licensing requirements.", link: '/air-regulations', linkText: 'Click to find out more! ✈️' },
  { id: 'met', num: '3', title: 'Aviation Meteorology', desc: 'Aviation Meteorology helps pilots understand weather conditions that affect flight safety and performance. In this subject, students learn about weather phenomena and how they impact aviation operations.', link: '/aviation-meteorology', linkText: 'Explore more →' },
  { id: 'tg', num: '4', title: 'Technical General (Aircraft & Engines)', desc: 'This subject covers the fundamental workings of aircraft and their engines, helping pilots understand how their machines operate. Key topics include aircraft systems, powerplants, and airworthiness.', link: '/technical-general', linkText: 'Explore more →' },
  { id: 'rtr', num: '5', title: 'Radio Telephony (RTR)', desc: 'Radio Telephony (RTR) is the backbone of pilot communication with Air Traffic Control (ATC). This subject teaches proper phraseology, emergency communications, and ATC procedures.', link: '/rtr-a', linkText: 'Explore more →' },
  // TODO: Create /technical-specific page and update href
  { id: 'ts', num: '6', title: 'Technical Specific (Type of Aircraft)', desc: 'This subject focuses on the technical details of specific aircraft models, ensuring pilots understand their assigned aircraft inside and out. Key topics include aircraft systems, limitations, and emergency procedures.', link: '/contact', linkText: 'Explore more →' },
];

const flyingSchools = [
  { id: 'india', flag: '🇮🇳', country: 'India', course: 'Flight-training guide', duration: 'Varies by provider', fees: 'Request a current written quote from the flying school', highlights: 'Flight training is provided by the selected flying school', href: '/flying-school/india' },
  { id: 'usa', flag: '🇺🇸', country: 'USA', course: 'Flight-training guide', duration: 'Varies by provider', fees: 'Request a current written quote from the flying school', highlights: 'Confirm school status, availability, and terms directly', href: '/flying-school/usa' },
  // TODO: Create /flying-school/uk page
  { id: 'uk', flag: '🇬🇧', country: 'UK', course: 'Flight-training guide', duration: 'Varies by provider', fees: 'Request a current written quote from the flying school', highlights: 'Confirm school status, availability, and terms directly', href: '/contact' },
  { id: 'aus', flag: '🇦🇺', country: 'Australia', course: 'Flight-training guide', duration: 'Varies by provider', fees: 'Request a current written quote from the flying school', highlights: 'Flight training is provided by the selected flying school', href: '/flying-school/australia' },
  { id: 'sa', flag: '🇿🇦', country: 'South Africa', course: 'Flight-training guide', duration: 'Varies by provider', fees: 'Request a current written quote from the flying school', highlights: 'Flight training is provided by the selected flying school', href: '/flying-school/south-africa' },
  { id: 'can', flag: '🇨🇦', country: 'Canada', course: 'Flight-training guide', duration: 'Varies by provider', fees: 'Request a current written quote from the flying school', highlights: 'Confirm school status, availability, and terms directly', href: '/flying-school/canada' },
];

const enrollSteps = [
  {
    id: 'step1',
    step: 'First Step',
    title: 'Complete Class 10 & 12 with Physics & Maths',
    desc: 'You need to complete Class 10 and Class 12 with Physics and Maths. Commerce and Arts students can also qualify by completing Physics and Maths from NIOS (National Institute of Open Schooling).',
    href: null,
  },
  {
    id: 'step2',
    step: 'Second Step',
    title: 'Join Ground School & Ground Classes',
    desc: 'Attend DGCA ground-subject classes in Dwarka or ask about online batches for students outside Delhi.',
    href: '/dgca-ground-classes',
  },
  {
    id: 'step3',
    step: 'Third Step',
    title: 'Join a Flying School',
    desc: 'Flight training is arranged through selected partner flying schools. Confirm the school, current availability, requirements, and terms directly before enrolling.',
    href: '/flying-school/india',
  },
];

const pilotJourneySteps = [
  { id: 'medical', icon: '🩺', title: 'Check DGCA Medical Requirements', desc: 'Review current DGCA medical requirements and use the regulator’s published process to arrange an examination.', alert: 'Medical questions?', alertDesc: 'Contact the academy for course guidance; medical assessments are handled by the relevant approved examiners.' },
  { id: 'computer', icon: '🖥️', title: 'Apply for a DGCA Computer Number', desc: 'A DGCA Computer Number is required for the relevant examination process. Check current application requirements on the official portal.', alert: 'Computer Number questions?', alertDesc: 'The academy can provide ground-course information; confirm application rules and status through the official DGCA portal.' },
  { id: 'exam', icon: '📝', title: 'Prepare for DGCA Examinations', desc: 'Check the current examination subjects and booking instructions on DGCA Pariksha. Ground classes provide subject preparation, not a guaranteed result.', alert: 'Examination questions?', alertDesc: 'Confirm current examination requirements and booking details through the official DGCA portal.' },
  { id: 'flying', icon: '✈️', title: 'Choose a Flying School', desc: 'Flight training is conducted by the selected flying school. Verify its current approval status, availability, cost, and schedule directly.', alert: 'Financing questions?', alertDesc: 'Financing eligibility and terms depend on the lender and applicant; confirm directly with any lender.' },
];



const whyChooseFeatures = [
  { id: 'wc1', icon: '✅', title: 'DGCA Ground-Subject Preparation', desc: 'Ground classes prepare students for DGCA written examinations; licensing decisions and requirements are set by the regulator.' },
  { id: 'wc2', icon: '✅', title: 'Ground-Subject Instruction', desc: 'Study DGCA ground subjects in the academy’s Dwarka classroom or ask about current online batches.' },
  { id: 'wc4', icon: '✅', title: 'Interview Preparation', desc: 'Interview preparation can support candidates; each airline sets its own recruitment process and makes hiring decisions.' },
  { id: 'wc5', icon: '✅', title: 'Comprehensive CPL & DGCA Ground Classes', desc: 'Structured curriculum covering Air Navigation, Meteorology, Air Regulations, and Technical subjects.' },
  { id: 'wc6', icon: '✅', title: 'Current Fees & Terms', desc: 'Contact the academy and selected flying school for current written fees and payment terms.' },
  { id: 'wc7', icon: '✅', title: 'Learning Support', desc: 'Ask the academy about current class formats, batch schedules, and available learning support.' },
  { id: 'wc8', icon: '✅', title: 'Partner Flying Schools', desc: 'Flight training is arranged through partner flying schools; confirm current provider details and availability directly.' },
  { id: 'wc9', icon: '✅', title: 'Student Outcomes', desc: 'Training does not guarantee a licence or job. Examination and hiring decisions rest with the relevant authorities and employers.' },
];

const worldLocations = [
  { id: 'wl-usa', flag: '🇺🇸', country: 'USA', href: '/flying-school/usa' },
  { id: 'wl-can', flag: '🇨🇦', country: 'Canada', href: '/flying-school/canada' },
  { id: 'wl-ind', flag: '🇮🇳', country: 'India', href: '/flying-school/india' },
  { id: 'wl-lk', flag: '🇱🇰', country: 'Sri Lanka', href: '/pilot-training-in-sri-lanka' },
  // TODO: Create /pilot-training-in-maldives page
  { id: 'wl-mv', flag: '🇲🇻', country: 'Maldives', href: '/contact' },
  { id: 'wl-za', flag: '🇿🇦', country: 'South Africa', href: '/flying-school/south-africa' },
  { id: 'wl-aus', flag: '🇦🇺', country: 'Australia', href: '/flying-school/australia' },
  // TODO: Create /pilot-training-in-new-zealand page
  { id: 'wl-nz', flag: '🇳🇿', country: 'New Zealand', href: '/contact' },
];

const pilotRoutes = [
  {
    id: 'route-12th',
    title: 'After 12th Standard',
    steps: ['Pass 12th with PCM (Physics, Chemistry, Maths)', 'Clear the DGCA medical', 'Enroll in CPL program', 'Complete 200+ flying hours', 'Clear DGCA written exams', 'Get your CPL license'],
    href: '/how-to-become-a-pilot-after-12th',
  },
  {
    id: 'route-intl',
    title: 'International Training Route',
    steps: ['Get your PPL in India or abroad', 'Complete IR (Instrument Rating)', 'Accumulate flying hours overseas', 'Appear for DGCA RTR exam', 'License conversion to DGCA', 'Start airline career'],
    href: '/how-to-become-a-pilot/in-india',
  },
];

const LAST_UPDATED = 'August 19, 2026';
const LAST_UPDATED_ISO = '2026-08-19';

// ─── SCHEMA MARKUP ────────────────────────────────────────────────────────────
// Defined at module level — created once, not on every render.




// ─────────────────────────────────────────────────────────────────────────────
// ✅ SEO FIX 4: logo URL was 'logo.png' — actual file is 'Logo.webp'
// GEO audit 2026-08-11: aggregateRating removed — see the note in the object
// ─────────────────────────────────────────────────────────────────────────────
const educationalOrgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'We One Aviation Academy',
  url: 'https://weoneaviation.in',
  logo: 'https://weoneaviation.in/Logo.webp',       // ✅ FIXED: was logo.png
  image: 'https://weoneaviation.in/og-cover.jpg',
  description: `Aviation education in Dwarka, New Delhi: DGCA ground-subject teaching, online batches for students outside Delhi, and flight training arranged through partner flying schools. Operating since ${FOUNDED_YEAR}.`,
  foundingDate: '2009',
  dateModified: LAST_UPDATED_ISO,
  telephone: '+919667370747',
  email: 'info.weoneaviation@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110077',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '28.5921',
    longitude: '77.0460',
  },
  /*
   * aggregateRating REMOVED — do not "sync" it back.
   *
   * It claimed a 4.9 rating whose review count was simply the site's old
   * pilots-trained figure reused, and there was not one Review node anywhere
   * on the site to support it. It was also an organisation rating itself, which
   * Google's structured-data policy disallows for self-serving Organization
   * markup, and third-party data does not corroborate the number either
   * (Justdial: 5.0 across ~1,300 ratings; ProvenExpert: 4.6 from 5).
   *
   * A rating a model can trivially cross-check and find wrong damages trust
   * scoring more than having no rating at all, and it risks a manual action.
   * To restore one, collect real first-party reviews and mark them up as
   * individual Review nodes, or cite Justdial's figure on-page as an
   * attributed third-party number rather than declaring it as your own.
   */
};

const courseListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Aviation Courses at We One Aviation Academy',
  itemListElement: courses.map((c, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    item: {
      '@type': 'Course',
      name: c.title,
      description: `${c.title} training. Duration: ${c.duration}. Eligibility: ${c.eligibility}.`,
      url: `https://weoneaviation.in${c.href}`,
      provider: {
        '@type': 'Organization',
        name: 'We One Aviation Academy',
        sameAs: 'https://weoneaviation.in',
      },
    },
  })),
};

// ─────────────────────────────────────────────────────────────────────────────
// ✅ SEO FIX 3: BreadcrumbList schema for homepage
// Tells Google this is the root page — anchors the site hierarchy
// ─────────────────────────────────────────────────────────────────────────────
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://weoneaviation.in',
    },
  ],
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [currentYear] = useState(() => new Date().getFullYear());

  return (
    <>
      <Head>
        {/*
         * ✅ SEO FIX 1: Removed duplicate preconnects.
         * fonts.googleapis.com and fonts.gstatic.com preconnects
         * are already declared in pages/_document.jsx.
         * Duplicate preconnects in every page Head cause extra
         * network hints and console warnings — removed here.
         */}

        {/* ── Open Graph — page-specific ───────────────────────────────────────
            ✅ SEO FIX 2b: OG title/description/url missing from this page.
            _document.jsx only sets og:image and og:type as global defaults.
            Without these, Facebook/LinkedIn/WhatsApp show a blank preview
            card title when someone shares the homepage link.
        ──────────────────────────────────────────────────────────────────── */}
        <meta key="og:title" property="og:title" content="We One Aviation | DGCA Ground Classes in Dwarka" />
        <meta key="og:description" property="og:description" content={`We One Aviation Academy teaches DGCA ground subjects in Dwarka, offers online batches to students outside Delhi, and arranges flight training through partner flying schools.`} />
        <meta key="og:url" property="og:url" content="https://weoneaviation.in/" />
        <meta property="og:image" content="https://weoneaviation.in/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="We One Aviation Academy — DGCA Ground Classes in Dwarka" />

        {/* ── Twitter Card — page-specific ─────────────────────────────────
            ✅ SEO FIX 2c: twitter:title and twitter:description were missing.
            Without them, Twitter/X falls back to the <title> tag which is OK
            but LinkedIn and some WhatsApp versions show no description at all.
        ──────────────────────────────────────────────────────────────────── */}
        <meta name="twitter:title" content="We One Aviation | DGCA Ground Classes in Dwarka" />
        <meta name="twitter:description" content="We One Aviation provides DGCA ground-subject preparation from its Dwarka, Delhi classroom, online batches outside Delhi, and partner-school flight-training guidance." />
        {/* twitter:image and twitter:image:alt are page-independent and emitted
            once in _document.jsx; repeating the identical tag here shipped it twice. */}

        {/* ── Schema Markup ─────────────────────────────────────────────── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }} />
        {/* ✅ SEO FIX 3: BreadcrumbList schema — new addition */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      <Layout
        title="We One Aviation | DGCA Ground Classes in Dwarka"
        description="We One Aviation provides DGCA ground-subject preparation from its Dwarka, Delhi classroom, online batches outside Delhi, and partner-school flight-training guidance."
      >

        {/* HERO */}
        <HeroSlider  asH1={false}/>

        <section className="bg-white py-4 px-4">
          <div className="max-w-7xl mx-auto text-sm text-gray-600">
            We One Aviation is a Delhi/Dwarka-based academy. Classroom DGCA ground-subject preparation is offered in Dwarka,
            with online availability outside Delhi where applicable; flight training is arranged through partner flying schools.
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            TAGLINE BANNER
            ✅ SEO FIX 6: Added <h1> here with the primary keyword.
            HeroSlider controls its own internal markup (we can't put H1 there
            without editing that component). This banner is the first static
            text section after the slider — correct place for the H1.

            The <h1> is visually styled to match the existing banner design.
            The old <p> becomes a supporting <p> below it.
        ────────────────────────────────────────────────────────────────── */}
        <div className="bg-av-orange py-4 text-center">
          {/* The page's single <h1>. HeroSlider is passed asH1={false} above so
              its heading renders as <h2>, leaving exactly one <h1> per route. */}
          <h1 className="text-white font-bold text-xl px-4">
            Pilot training guidance for India’s next generation of aviators
          </h1>

          {/* Direct answer. Written to stand alone if extracted. */}
          <p className="text-white/90 leading-relaxed text-sm px-4 mt-3 max-w-3xl mx-auto">
              We One Aviation Academy teaches DGCA ground subjects from its classroom in Dwarka, New Delhi, and offers online batches to students outside Delhi. Flight training is arranged with partner flying schools and takes place at the selected school.
          </p>

          <p className="text-white/60 text-xs px-4 mt-2">{`Last updated: ${LAST_UPDATED}`}</p>
          <p className="text-white font-medium text-sm px-4 mt-1">
            Learn about DGCA ground classes, CPL pathways, and the steps needed to build a structured aviation career.
          </p>
          <Link
            href="/contact"
            className="button-secondary inline-block mt-2 bg-white/90 text-av-orange font-bold px-6 py-2 rounded-full text-sm hover:bg-av-blue hover:text-white transition-all"
          >
            Ask about current course terms →
          </Link>
          <Link
            href="/contact"
            className="button-secondary inline-block mt-2 bg-white text-av-orange font-bold px-6 py-2 rounded-full text-sm hover:bg-av-blue hover:text-white transition-all"
          >
            Contact Us →
          </Link>
        </div>


        {/* ABOUT */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="section-tag">About Us</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                Pilot training support built around career clarity
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We One Aviation Academy has supported aspiring pilots since 2009 with structured guidance on DGCA exam preparation, training options, and the practical steps needed to move toward a professional aviation career.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our team works with students on course planning, flight-school decisions, and foundational aviation knowledge so they can make informed choices at every stage of their journey.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {['DGCA ground-subject teaching', 'Dwarka classroom', 'Online batches outside Delhi', 'Partner-school flight training'].map(tag => (
                  <span key={tag} className="bg-av-light text-av-blue text-xs font-semibold px-4 py-2 rounded-full border border-av-sky/20">
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/about-us" className="button-primary inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                  Learn More About Us →
                </Link>
                <Link href="/credentials" className="button-secondary inline-block bg-white border border-av-blue text-av-blue px-7 py-3 rounded-full font-semibold hover:bg-av-light transition-all text-sm">
                  View Credentials & Verification
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <NextImage
                    src="/assets/GroundSchool.jpg"
                    alt="Pilot ground school training at We One Aviation Academy"
                    width={350}
                    height={195}
                    sizes="(max-width: 768px) 100vw, 350px"
                    style={{ objectFit: 'contain' }}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-av-orange rounded-xl p-4 shadow-xl">
                  <div className="font-montserrat text-white text-xl font-black">16+</div>
                  <div className="text-white/80 text-xs">Years of Excellence</div>
                </div>
                <div className="absolute -top-5 -right-5 glass bg-av-blue rounded-xl p-4 shadow-xl border border-white/20">
                  <div className="font-montserrat text-av-orange text-xl font-black">DGCA</div>
                  <div className="text-white text-xs">Ground subjects</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* COURSES */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Our Programs</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                Which <span className="text-av-orange">Aviation Path</span> Should You Explore?
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                Explore DGCA ground-subject preparation and partner flying-school pathways.
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c, i) => (
                <ScrollReveal key={c.id} delay={i * 100}>
                  <CourseCard {...c} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <HomepagePartnerLogos />

        {/* COURSE FEE & SCHEDULE */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Fee &amp; Schedule</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                What Are the <span className="text-av-orange">Course Durations, Fees, and Schedules?</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                Details of Pilot Courses, Fees and Schedule of Our Batches. We Generally Start 2 Batches in a Month For Aviation Students.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:border-av-orange/40 transition-all h-full flex flex-col">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">DGCA CPL Ground Classes</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    This is the main pilot course with exams conducted by DGCA, designed for theoretical preparation required to obtain a pilot&apos;s license.
                  </p>
                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <div><span className="font-semibold text-av-blue">Fees:</span> Contact the academy for current fees and availability.</div>
                    <div><span className="font-semibold text-av-blue">Batch schedule:</span> Confirm current dates with the academy.</div>
                    <div><span className="font-semibold text-av-blue">Mode:</span> Classroom in Dwarka; online batches for students outside Delhi</div>
                    <div><span className="font-semibold text-av-blue">Batch Start:</span> Confirm current dates with the academy</div>
                  </div>
                  <Link href="/dgca-ground-classes" className="button-primary mt-auto inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">Course Details</Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:border-av-orange/40 transition-all h-full flex flex-col">
                  <div className="text-4xl mb-4">🛩️</div>
                  <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">CPL Flight Training (India/Abroad)</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    After clearing the DGCA Exam, complete your flying hours from India or abroad. 200 Hours of Flying is mandatory for a Commercial Pilot Licence.
                  </p>
                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    <div><span className="font-semibold text-av-blue">Flying duration:</span> Varies by selected flying school and student progress.</div>
                    <div><span className="font-semibold text-av-blue">Fees:</span> Request a current written quote from the selected flying school.</div>
                    <div><span className="font-semibold text-av-blue">Registration:</span> Confirm availability with the selected school</div>
                  </div>
                  <Link href="/courses/cpl" className="button-primary mt-auto inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">CPL Flight Training Details</Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-av-blue rounded-2xl shadow-lg p-8 h-full flex flex-col">
                  <div className="text-4xl mb-4">✈️</div>
                  <h3 className="font-montserrat text-xl font-bold text-white mb-3">Commercial Pilot Licence (CPL) Course</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">DGCA ground-subject preparation is taught by the academy; flight training is arranged separately through partner flying schools.</p>
                  <div className="space-y-2 mb-6 text-sm text-white/80">
                    <div><span className="font-semibold text-av-orange">Training timeline:</span> Varies by student progress and flying-school schedule.</div>
                    <div><span className="font-semibold text-av-orange">Course fees:</span> Confirm current written terms with each provider.</div>
                    <div><span className="font-semibold text-av-orange">Batch Start:</span> Confirm current dates with the academy</div>
                  </div>
                  <Link href="/commercial-pilot-license" className="button-primary mt-auto inline-block text-center bg-av-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">Course Details</Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* DGCA GROUND CLASSES PROMO */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="section-tag">DGCA Ground Classes</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License</h2>
              <p className="text-gray-600 leading-relaxed mb-4">✈️ Explore the CPL pathway, DGCA ground-subject preparation, and flight training arranged through partner flying schools.</p>
              <Link href="/commercial-pilot-license" className="button-primary inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm mr-3 mb-3">CPL Training Details</Link>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="section-tag">Ground Classes</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Dgca-Cpl Ground Classes</h2>
              <p className="text-gray-600 leading-relaxed mb-4">📖 Master Every DGCA Subject &amp; Fly High! Our DGCA Ground Classes make learning easy &amp; effective. Get trained by industry experts!</p>
              <Link href="/dgca-ground-classes" className="button-primary inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm mr-3 mb-3">Explore DGCA Ground Classes</Link>
            </ScrollReveal>
          </div>
          <div className="max-w-7xl mx-auto mt-12">
            <ScrollReveal className="bg-av-blue rounded-2xl p-8 text-center">
              <h2 className="font-montserrat text-2xl font-bold text-white mb-3">Flight Training Through Partner Schools</h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-6 text-sm">Flight training is arranged with partner flying schools and takes place at the selected school. Confirm its current location, availability, fees, and terms before applying.</p>
              <Link href="/flying-school/india" className="button-primary inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">India Flying School Details</Link>
            </ScrollReveal>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Why We One</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">What Makes We One Aviation <span className="text-av-orange">Different?</span></h2>
              <p className="text-gray-500 mt-2 text-sm">All Your Aviation Needs Under One Roof</p>
              <p className="text-gray-500 mt-1 text-sm max-w-2xl mx-auto">At We One Aviation Academy, we don&apos;t just train pilots—we shape future aviation leaders.</p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {whyChooseFeatures.map(f => (
                  <div key={f.id} className="card-hover p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-av-orange/30">
                    <div className="text-2xl mb-4">{f.icon}</div>
                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal className="text-center mt-10">
              <p className="text-av-blue font-semibold text-lg">Join We One Aviation Academy and Take Off Towards a Successful Aviation Career! ✈️</p>
              <Link href="/contact" className="button-primary inline-block mt-4 bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">Get Free Pilot Career Counselling →</Link>
            </ScrollReveal>
          </div>
        </section>

        {/* FROM GROUND TO SKY */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Training</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                What Does <span className="text-av-orange">DGCA Exam Coaching and Flight Training</span> Involve?
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">DGCA ground classes and guidance on the separate flying-school stage.</p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Dgca Ground Classes</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">DGCA ground-subject classes are provided from the Dwarka classroom. Contact the academy to confirm current batch timings and fees.</p>
                  <Link href="/contact" className="button-primary inline-block bg-av-blue text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">Enquiry Now</Link>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="bg-av-blue rounded-2xl shadow-lg p-8">
                  <h3 className="font-montserrat text-xl font-bold text-white mb-4">Partner Flying Schools</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">Flight training is arranged through partner flying schools. The selected school provides the flying; confirm current availability and terms directly with the academy and school.</p>
                  <Link href="/contact" className="button-primary inline-block bg-av-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">Enquiry Now</Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* HOW TO BECOME A PILOT */}
        <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Your Journey</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                How Do You Become a <span className="text-av-orange">Pilot in India?</span>
              </h2>
              <p className="text-white/60 mt-2 text-sm">Step By Step Guide. If you just passed 12th and want to become a Pilot — your search ends here.</p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {enrollSteps.map((s, i) => (
                  <div key={s.id} className="glass rounded-2xl p-6 text-center h-full flex flex-col">
                    <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">{i + 1}</div>
                    <div className="text-av-orange font-semibold text-xs uppercase tracking-wider mb-2">{s.step}</div>
                    <h3 className="font-montserrat font-bold text-white mb-3">{s.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed flex-grow">{s.desc}</p>
                    {s.href && (
                      <Link href={s.href} className="mt-4 inline-block text-av-orange text-xs font-semibold hover:underline">
                        Learn More →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal className="text-center mb-10">
              <h2 className="font-montserrat text-2xl font-bold text-white">What Are the Steps to <span className="text-av-orange">Become a Pilot?</span></h2>
            </ScrollReveal>

            <ShowMoreList
              items={pilotJourneySteps}
              initialCount={2}
              label="Show more pilot steps"
              renderItem={(step) => (
                  <article key={step.id} className="glass rounded-2xl p-6">
                    <div className="text-3xl mb-3">{step.icon}</div>
                    <h3 className="font-montserrat font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{step.desc}</p>
                    <div className="bg-av-orange/20 border border-av-orange/30 rounded-xl p-4">
                      <p className="text-av-orange font-semibold text-sm mb-1">{step.alert}</p>
                      <p className="text-white/70 text-xs leading-relaxed">{step.alertDesc}</p>
                    </div>
                  </article>
              )}
            />

            <div className="grid md:grid-cols-2 gap-8">
              {pilotRoutes.map(route => (
                <ScrollReveal key={route.id}>
                  <div className="glass rounded-2xl p-8 h-full">
                    <h3 className="font-montserrat text-xl font-bold text-white mb-6">{route.title}</h3>
                    <ol className="space-y-3">
                      {route.steps.map((step, i) => (
                        <li key={`${route.id}-step-${i}`} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                          <span className="text-white/80 text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                    <Link href={route.href} className="mt-6 inline-block text-av-orange text-sm font-semibold hover:underline">Learn More →</Link>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* DGCA SUBJECTS */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">DGCA Subjects</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                Which <span className="text-av-orange">Subjects</span> Do the DGCA Exams Cover?
              </h2>
              <p className="text-gray-500 mt-2 text-sm">Subjects For DGCA Ground Classes</p>
            </ScrollReveal>
            <ShowMoreList
              items={dgcaSubjects}
              initialCount={3}
              label="Show more DGCA subjects"
              renderItem={(subject) => (
                  <article key={subject.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{subject.num}</div>
                      <h3 className="font-montserrat font-bold text-av-blue text-sm">{subject.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">{subject.desc}</p>
                    <Link href={subject.link} className="text-av-orange text-xs font-semibold hover:underline">{subject.linkText}</Link>
                  </article>
              )}
            />
          </div>
        </section>

        {/* FLYING SCHOOLS WORLDWIDE */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Global Flying Schools</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                🚀 Your Gateway to a Global Aviation Career – <span className="text-av-orange">Train at the Best <a href="https://www.flystar.co.in/" className="text-av-orange hover:underline">Flying Schools</a>  Worldwide!</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm">These country guides provide general information only. The academy does not assert current partner availability or operate physical training centres in these countries.</p>
              <p className="text-av-orange font-semibold mt-2 text-sm">Verify school status, current availability, fees, and terms directly with providers and regulators.</p>
            </ScrollReveal>
            <ScrollReveal>
              <ShowMoreList
                items={flyingSchools}
                initialCount={3}
                label="Show more flying schools"
                renderItem={(school) => (
                  <div key={school.country} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full flex flex-col">
                    <div className="text-4xl mb-3">{school.flag}</div>
                    <h3 className="font-montserrat font-bold text-av-blue mb-3">Flight-training guide: {school.country}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4 flex-grow">
                      <p>✅ <span className="font-semibold">Course:</span> {school.course}</p>
                      <p>✅ <span className="font-semibold">Duration:</span> {school.duration}</p>
                      <p>✅ <span className="font-semibold">Fees:</span> {school.fees}</p>
                      <p>✅ <span className="font-semibold">Highlights:</span> {school.highlights}</p>
                    </div>
                    <Link href={school.href} className="button-primary inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">Learn More</Link>
                  </div>
                )}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* INDIA LOCATIONS */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <div className="section-tag">India-wide pathway</div>
              <h2 className="font-montserrat text-3xl font-bold text-av-blue">How to Plan Pilot Training <span className="text-av-orange">in India</span></h2>
            </ScrollReveal>
            <p className="text-gray-500 text-sm mt-4">The academy’s physical classroom is in Dwarka, Delhi; students outside Delhi can join online batches. Flight training is arranged through partner flying schools at their selected locations. <Link href="/pilot-training-in-india" className="text-av-blue font-semibold hover:underline">Read the India pilot-training pathway</Link>.</p>
          </div>
        </section>

        <HomepagePassResults />

        {/* WORLD LOCATIONS */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <div className="section-tag">International training guides</div>
              <h2 className="font-montserrat text-3xl font-bold text-av-blue">Researching Flight Training <span className="text-av-orange">Outside India?</span></h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {worldLocations.map(loc => (
                <Link key={loc.id} href={loc.href} className="card-hover flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-av-orange hover:text-av-orange hover:bg-orange-50 transition-all text-sm font-medium text-av-blue">
                  <span className="text-xl">{loc.flag}</span>
                  <span>{loc.country}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-12">
               </ScrollReveal>
            
            <div className="text-center mt-8">
              <Link href="/contact" className="button-primary inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">Ask Question</Link>
            </div>
          </div>
        </section>

        {/* LEAD FORM */}
        <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="section-tag">Free Counselling</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                Take the First Step <span className="text-av-orange">Towards the Sky</span>
              </h2>
              <p className="text-white/70 mb-6 text-sm leading-relaxed">Our aviation career counsellors will guide you through course selection, eligibility, current terms, and career prospects.</p>
              <div className="space-y-3">
                {['Career counselling — confirm current terms', 'DGCA ground-subject preparation', 'Partner-school flight training — confirm availability', 'Ask about current written fees and terms'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-av-orange">✓</span>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/20 space-y-2 text-sm text-white/70">
                <p>📧 <span className="font-semibold text-white">Office Mail:</span> info.weoneaviation@gmail.com</p>
                <p>📍 <span className="font-semibold text-white">Office Address:</span> C-404, 3rd Floor, Ramphal Chowk, Block C, Palam Extension, Sector-7, Dwarka, Delhi 110077, India</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <h2 className="font-montserrat font-bold text-white text-center mb-4">BOOK Your SEAT FOR SCHOLARSHIP</h2>
                <p className="text-white/70 text-center text-sm mb-4">Join Dgca Ground Classes</p>
                <LeadForm isDark={true} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        <HomepageFAQs />

      </Layout>
    </>
  );
}
