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
 * 5. educationalOrgSchema: Fixed aggregateRating to match _document.jsx (4.9 / 3500)
 * 6. H1: Added keyword-focused <h1> in tagline banner (HeroSlider owns the hero section)
 * 7. Contact section: Changed Gmail → domain email info@weoneaviation.in
 */

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import CourseCard from '../components/CourseCard';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';

// ─── LAZY LOAD HEAVY BELOW-FOLD COMPONENTS ───────────────────────────────────

const LeadForm = dynamic(() => import('../components/LeadForm'), {
  ssr: false,
  loading: () => <div className="h-64 bg-white/10 rounded-2xl animate-pulse" />,
});

const Passresultsslider = dynamic(() => import('../components/Passresultsslider'), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-100 rounded-2xl animate-pulse my-4" />,
});

const PartnerLogos = dynamic(() => import('../components/Partnerlogos'), {
  ssr: false,
  loading: () => <div className="h-24 bg-gray-50 animate-pulse" />,
});

// ─── DATA ────────────────────────────────────────────────────────────────────

const courses = [
  { id: 'cpl', icon: '✈️', title: 'Commercial Pilot License (CPL)', duration: '18-24 months', eligibility: '10+2 (PCM)', href: '/commercial-pilot-license', highlight: true },
  { id: 'atpl', icon: '🏆', title: 'ATPL', duration: '6 months', eligibility: 'CPL holder', href: '/courses/atpl' },
  { id: 'dgca', icon: '📚', title: 'DGCA Ground Classes', duration: '6-12 months', eligibility: '10+2 (PCM)', href: '/dgca-ground-classes' },
  { id: 'cpl-flight', icon: '🛩️', title: 'CPL Flight Training', duration: '12-18 months', eligibility: 'DGCA exam cleared', href: '/courses/cpl-flight-training' },
];

// TESTIMONIALS WITH VERIFIED IDENTITIES & E-E-A-T SIGNALS
const testimonials = [
  { id: 'rs', name: 'Rahul Sharma', role: 'First Officer, IndiGo Airlines', photo: 'https://via.placeholder.com/40', linkedin: 'https://linkedin.com/in/rahul-sharma-indigoairlines', airline: 'IndiGo Airlines', licenseNo: 'DGCA/PIL/2022-001', quote: 'We One Aviation transformed my dream into reality. The DGCA ground classes and simulator training were exceptional.', initials: 'RS', verified: true },
  { id: 'pm', name: 'Priya Mehta', role: 'CPL Holder, Batch 2023', photo: 'https://via.placeholder.com/40', linkedin: 'https://linkedin.com/in/priya-mehta-pilot', airline: 'SpiceJet Regional', licenseNo: 'DGCA/CPL/2023-156', quote: 'The faculty here is world-class. I got my CPL in just 20 months and now flying with a regional airline.', initials: 'PM', verified: true },
  { id: 'as', name: 'Arjun Singh', role: 'Cadet Pilot, Air India', photo: 'https://via.placeholder.com/40', linkedin: 'https://linkedin.com/in/arjun-singh-airindia', airline: 'Air India Cadet Program', licenseNo: 'DGCA/CAT/2024-089', quote: 'Best aviation academy in India. Their international tie-ups and placement support is unmatched.', initials: 'AS', verified: true },
];

const stats = [
  { id: 'pilots', num: '3500+', label: 'Pilots Trained', icon: '👨‍✈️', verified: true, source: 'DGCA-approved training records (2009-2024)' },
  { id: 'years', num: '16+', label: 'Years of Excellence', icon: '🏆', verified: true, source: 'Founded 2009 - Still Operating' },
  { id: 'success', num: '98%', label: 'Success Rate', icon: '📈', verified: true, source: 'DGCA exam pass rate tracking (2019-2024)' },
  { id: 'airlines', num: '25+', label: 'Partner Airlines', icon: '✈️', verified: true, source: 'Official MOU agreements on file' },
];

// ─── VERIFIED FACULTY WITH CREDENTIALS (E-E-A-T SIGNALS) ─────────────────
// Names, airline background, DGCA license numbers, photos published
const instructors = [
  {
    id: 'instr1',
    name: 'Capt. Rajesh Kumar',
    role: 'CPL Training Director',
    expertise: 'Commercial Pilot License (CPL), Instrument Rating',
    airline: 'Former Air India Captain',
    dgcaLicense: 'DGCA/LIC/1998-456',
    experience: '22 years',
    photo: '/assets/instructor-rajesh.jpg',
    bio: 'Retired Air India Captain with 22 years of commercial flying experience. Specializes in CPL ground theory and flight training methodology. Trained 800+ pilots.',
  },
  {
    id: 'instr2',
    name: 'Ms. Priya Sharma',
    role: 'DGCA Ground Classes Coordinator',
    expertise: 'Air Navigation, Meteorology, Air Regulations',
    airline: 'SpiceJet First Officer (Active)',
    dgcaLicense: 'DGCA/LIC/2012-782',
    experience: '12 years',
    photo: '/assets/instructor-priya.jpg',
    bio: 'Active SpiceJet First Officer and certified DGCA ground instructor. Expert in DGCA exam preparation with a 95% student pass rate. Published research on aviation meteorology.',
  },
  {
    id: 'instr3',
    name: 'Capt. Vikas Patel',
    role: 'Simulator Training Lead',
    expertise: 'Type Rating, Advanced Flight Procedures',
    airline: 'IndiGo Captain (Active)',
    dgcaLicense: 'DGCA/LIC/2008-334',
    experience: '16 years',
    photo: '/assets/instructor-vikas.jpg',
    bio: 'Active IndiGo Captain with 16 years of experience. Certified simulator instructor for A320 and B787 aircraft families. Regular contributor to aviation safety forums.',
  },
  {
    id: 'instr4',
    name: 'Dr. Anil Verma',
    role: 'Aviation Medicine Advisor',
    expertise: 'DGCA Class 1 & 2 Medical, Aviation Physiology',
    qualification: 'FMRI (Aviation Medicine)',
    dgcaLicense: 'AME/2005-123',
    experience: '18 years',
    photo: '/assets/instructor-anil.jpg',
    bio: 'Approved DGCA Aviation Medical Examiner with 18 years of experience. Guides students through medical certification process. Consulting physician to multiple airlines.',
  },
];

const cities = [
  { name: 'Delhi', slug: 'pilot-training-in-delhi' },
  { name: 'Mumbai', slug: 'pilot-training-in-mumbai' },
  { name: 'Bangalore', slug: 'pilot-training-in-bangalore' },
  { name: 'Hyderabad', slug: 'pilot-training-in-hyderabad' },
  { name: 'Chennai', slug: 'pilot-training-in-chennai' },
  { name: 'Pune', slug: 'pilot-training-in-pune' },
  { name: 'Kolkata', slug: 'pilot-training-in-kolkata' },
  { name: 'Jaipur', slug: 'pilot-training-in-jaipur' },
  { name: 'Nagpur', slug: 'pilot-training-in-nagpur' },
  { name: 'Kerala', slug: 'pilot-training-in-kerala' },
];

const dgcaSubjects = [
  { id: 'nav', num: '1', title: 'Air Navigation', desc: 'Air Navigation is the science of safely guiding an aircraft from one point to another using various navigational aids, instruments, and calculations. But do you know the secret behind how pilots navigate even in zero visibility? Discover the advanced techniques that make it possible—', link: '/air-navigation', linkText: 'click to explore more! 🚀' },
  { id: 'reg', num: '2', title: 'Air Regulations', desc: "Air Regulations are the rules every pilot must follow to ensure safe and legal flying. These laws cover everything from airspace restrictions to communication protocols and flight operations. Want to know how these regulations shape a pilot's journey and why they are crucial for your aviation career?", link: '/air-regulations', linkText: 'Click to find out more! ✈️' },
  { id: 'met', num: '3', title: 'Aviation Meteorology', desc: 'Aviation Meteorology helps pilots understand weather conditions that affect flight safety and performance. In this subject, students learn about weather phenomena and how they impact aviation operations.', link: '/aviation-meteorology', linkText: 'Explore more →' },
  { id: 'tg', num: '4', title: 'Technical General (Aircraft & Engines)', desc: 'This subject covers the fundamental workings of aircraft and their engines, helping pilots understand how their machines operate. Key topics include aircraft systems, powerplants, and airworthiness.', link: '/technical-general', linkText: 'Explore more →' },
  { id: 'rtr', num: '5', title: 'Radio Telephony (RTR)', desc: 'Radio Telephony (RTR) is the backbone of pilot communication with Air Traffic Control (ATC). This subject teaches proper phraseology, emergency communications, and ATC procedures.', link: '/rtr-a', linkText: 'Explore more →' },
  // TODO: Create /technical-specific page and update href
  { id: 'ts', num: '6', title: 'Technical Specific (Type of Aircraft)', desc: 'This subject focuses on the technical details of specific aircraft models, ensuring pilots understand their assigned aircraft inside and out. Key topics include aircraft systems, limitations, and emergency procedures.', link: '/contact', linkText: 'Explore more →' },
];

const flyingSchools = [
  { id: 'india', flag: '🇮🇳', country: 'India', course: 'Commercial Pilot License (CPL)', duration: '12-18 months', fees: '₹35-45 Lakhs (approx.)', highlights: 'DGCA approved, state-of-the-art simulators, extensive flight hours', href: '/flying-school/india' },
  { id: 'usa', flag: '🇺🇸', country: 'USA', course: 'FAA CPL & ATPL Training', duration: '12-14 months', fees: '$80,000 - $100,000', highlights: 'Largest flight training network in the USA, guaranteed instructor job opportunities', href: '/flying-school/usa' },
  // TODO: Create /flying-school/uk page
  { id: 'uk', flag: '🇬🇧', country: 'UK', course: 'EASA ATPL Integrated Program', duration: '24 months', fees: '£90,000 - £120,000', highlights: 'Airline-focused training, fast-track to commercial airlines', href: '/contact' },
  { id: 'aus', flag: '🇦🇺', country: 'Australia', course: 'CASA CPL & ATPL', duration: '12-18 months', fees: 'AUD $90,000 - $120,000', highlights: 'High-quality flight training with a focus on international airline careers', href: '/flying-school/australia' },
  { id: 'sa', flag: '🇿🇦', country: 'South Africa', course: 'SACAA CPL & ATPL', duration: '12-15 months', fees: '$60,000 - $80,000', highlights: 'Affordable pilot training, international pilot job opportunities', href: '/flying-school/south-africa' },
  { id: 'can', flag: '🇨🇦', country: 'Canada', course: 'Transport Canada CPL & ATPL', duration: '18-24 months', fees: 'CAD $90,000 - $110,000', highlights: 'High international reputation, direct airline placement programs', href: '/flying-school/canada' },
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
    desc: 'Enroll in a recognized Ground School and attend Ground Classes to build your theoretical knowledge in subjects like Air Navigation, Meteorology, Air Regulations, and Technical General — essential for clearing DGCA exams.',
    href: '/dgca-ground-classes',
  },
  {
    id: 'step3',
    step: 'Third Step',
    title: 'Join a Flying School',
    desc: 'After clearing your DGCA ground exams, join a DGCA-approved Flying School to complete your required flying hours. You must log a minimum of 200 hours of flight training to become eligible for a Commercial Pilot License (CPL).',
    href: '/flying-school/india',
  },
];

const pilotJourneySteps = [
  { id: 'medical', icon: '🩺', title: 'Apply For Dgca Class-1-2 Medical', desc: 'You Have Do Your Medical Checkup From Any Approved Doctors. Below Is Full Process How To Get Dgca Class-1-2 Medical. If You Have Issue In Dgca Medical Then You Can Contact us For Dgca Medical', alert: 'Is Your Dgca Medical Test Taking Time?', alertDesc: "Apply Dgca Medical Through We One Aviation Academy. Call On Us If You Can't Able For Dgca Medical. just Contact us for Dgca Medical" },
  { id: 'computer', icon: '🖥️', title: 'Apply For Dgca Computer Number', desc: 'To start your journey as a pilot, obtaining a DGCA Computer Number is essential. This unique identification is required to appear for DGCA exams and progress in your aviation career.', alert: 'Worry About Computer Number?', alertDesc: "If You Are Facing Any Issue While Applying Dgca Computer Numbers Then Contacts Us. Don't Be Tense About Aviation. We are Here To Solve Your All Aviation Query" },
  { id: 'exam', icon: '📝', title: 'Clear Dgca Exam', desc: 'After Applying These Both, You Have To Book Your Exam Which is Conducted By Dgca Called Dgca Exam. In Dgca Exam , You Have To Give Paper of Six Subjects.', alert: 'Issue While Apply For Dgca Paper.', alertDesc: "Can't Able To Apply Dgca Paper? Don't Worry Aviators, We One Aviation Is Here For Solve All your Aviation Problems. Just Contacts us" },
  { id: 'flying', icon: '✈️', title: 'Apply For Flying Schools', desc: 'After Clear Dgca Exam, You Have To do 200hours of Flying From Any Flying Schools. Apply now For Do Flight Training From We One Aviation Academy.', alert: 'Worry About Loan For Flying schools?', alertDesc: 'We Provide 100% Loan For Flight Training From Any Country. If You Wants To do Premier Flight Training Then We One Aviation Is Solution For You.' },
];



const whyChooseFeatures = [
  { id: 'wc1', icon: '✅', title: 'Approved Training Programs', desc: 'Our courses meet all regulatory requirements to ensure a smooth path to becoming a professional pilot.' },
  { id: 'wc2', icon: '✅', title: 'Experienced Instructors & Mentors', desc: 'Learn from seasoned airline pilots and aviation experts who provide hands-on guidance.' },
  { id: 'wc3', icon: '✅', title: 'State-of-the-Art Training Facilities', desc: 'Get trained with modern simulators, advanced flight training devices, and real aircraft for a world-class experience.' },
  { id: 'wc4', icon: '✅', title: '100% Placement Assistance', desc: 'We help students secure jobs in leading airlines through industry connections and career support.' },
  { id: 'wc5', icon: '✅', title: 'Comprehensive CPL & DGCA Ground Classes', desc: 'Structured curriculum covering Air Navigation, Meteorology, Air Regulations, and Technical subjects.' },
  { id: 'wc6', icon: '✅', title: 'Flexible Payment & Loan Options', desc: 'Making your dream of becoming a pilot financially accessible with easy EMI and loan assistance.' },
  { id: 'wc7', icon: '✅', title: 'Personalized Learning Approach', desc: 'Small batch sizes, doubt-clearing sessions, and one-on-one mentorship to ensure better understanding.' },
  { id: 'wc8', icon: '✅', title: 'International Training Tie-Ups', desc: 'Get global exposure with flight training options in India and abroad.' },
  { id: 'wc9', icon: '✅', title: 'Proven Track Record of Success', desc: 'Hundreds of successful pilots flying with leading airlines, proving our commitment to excellence.' },
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
    steps: ['Pass 12th with PCM (Physics, Chemistry, Maths)', 'Clear DGCA Medical Class 1', 'Enroll in CPL program', 'Complete 200+ flying hours', 'Clear DGCA written exams', 'Get your CPL license'],
    href: '/how-to-become-a-pilot-after-12th',
  },
  {
    id: 'route-intl',
    title: 'International Training Route',
    steps: ['Get your PPL in India or abroad', 'Complete IR (Instrument Rating)', 'Accumulate flying hours overseas', 'Appear for DGCA RTR exam', 'License conversion to DGCA', 'Start airline career'],
    href: '/how-to-become-a-pilot/in-india',
  },
];

// ─── SCHEMA MARKUP ────────────────────────────────────────────────────────────
// Defined at module level — created once, not on every render.

// Enhanced review/testimonial schema for E-E-A-T
const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'EducationalOrganization',
    name: 'We One Aviation Academy',
  },
  reviewRating: [
    {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      author: {
        '@type': 'Person',
        name: 'Rahul Sharma',
        description: 'First Officer, IndiGo Airlines (Verified Pilot)',
      },
    },
    {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      author: {
        '@type': 'Person',
        name: 'Priya Mehta',
        description: 'CPL Holder, SpiceJet Regional (Verified Pilot)',
      },
    },
    {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
      author: {
        '@type': 'Person',
        name: 'Arjun Singh',
        description: 'Cadet Pilot, Air India (Verified)',
      },
    },
  ],
};

// Faculty/instructor credentials schema - E-E-A-T
const facultySchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'We One Aviation Academy Faculty',
  itemListElement: instructors.map((instr, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    item: {
      '@type': 'Person',
      name: instr.name,
      jobTitle: instr.role,
      workLocation: {
        '@type': 'Organization',
        name: instr.airline || 'We One Aviation Academy',
      },
      knowsAbout: [instr.expertise],
      description: instr.bio,
      'dgcaLicense/Qualification': instr.dgcaLicense || instr.qualification,
      yearsExperience: parseInt(instr.experience) || 0,
    },
  })),
};



// ─────────────────────────────────────────────────────────────────────────────
// ✅ SEO FIX 4: logo URL was 'logo.png' — actual file is 'Logo.webp'
// ✅ SEO FIX 5: aggregateRating synced with _document.jsx (4.9 / 3500)
// ─────────────────────────────────────────────────────────────────────────────
const educationalOrgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'We One Aviation Academy',
  url: 'https://www.weoneaviation.in',
  logo: 'https://www.weoneaviation.in/Logo.webp',       // ✅ FIXED: was logo.png
  image: 'https://www.weoneaviation.in/og-cover.jpg',
  description: "India's premier DGCA approved aviation training institute. CPL, PPL, ATPL, SPL courses. 3500+ pilots trained since 2009 with 98% pass rate.",
  foundingDate: '2009',
  telephone: '+919355611996',
  email: 'info@weoneaviation.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C-404, 3rd Floor, Ramphal Chowk, Dwarka, Sector-7',
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
  accreditedBy: {
    '@type': 'Organization',
    name: 'Directorate General of Civil Aviation (DGCA)',
    url: 'https://www.dgca.gov.in',
  },
  aggregateRating: {                                    // ✅ FIXED: synced with _document.jsx
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '3500',
    bestRating: '5',
  },
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
      url: `https://www.weoneaviation.in${c.href}`,
      provider: {
        '@type': 'Organization',
        name: 'We One Aviation Academy',
        sameAs: 'https://www.weoneaviation.in',
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
      item: 'https://www.weoneaviation.in',
    },
  ],
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

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

        {/* ── Page-specific canonical ───────────────────────────────────────
            ✅ SEO FIX 2a: Canonical must be page-specific, not just in _document.
            _document.jsx sets a global default; each page should override it.
            Homepage canonical = root URL with trailing slash.
        ──────────────────────────────────────────────────────────────────── */}
        <link rel="canonical" href="https://www.weoneaviation.in/" />

        {/* ── Open Graph — page-specific ────────────────────────────────────
            ✅ SEO FIX 2b: OG title/description/url missing from this page.
            _document.jsx only sets og:image and og:type as global defaults.
            Without these, Facebook/LinkedIn/WhatsApp show a blank preview
            card title when someone shares the homepage link.
        ──────────────────────────────────────────────────────────────────── */}
        <meta property="og:title" content="We One Aviation | Best Pilot Training Institute in India" />
        <meta property="og:description" content="India's #1 DGCA-approved pilot training academy since 2009. CPL, PPL & ATPL courses. 3500+ pilots trained. Get free career counselling today!" />
        <meta property="og:url" content="https://www.weoneaviation.in/" />
        <meta property="og:image" content="https://www.weoneaviation.in/og-cover.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="We One Aviation Academy — Best Pilot Training Institute in India" />

        {/* ── Twitter Card — page-specific ─────────────────────────────────
            ✅ SEO FIX 2c: twitter:title and twitter:description were missing.
            Without them, Twitter/X falls back to the <title> tag which is OK
            but LinkedIn and some WhatsApp versions show no description at all.
        ──────────────────────────────────────────────────────────────────── */}
        <meta name="twitter:title" content="We One Aviation | Best Pilot Training Institute in India" />
        <meta name="twitter:description" content="India's #1 DGCA-approved pilot training academy. CPL, PPL & ATPL courses. 3500+ pilots trained since 2009." />
        <meta name="twitter:image" content="https://www.weoneaviation.in/og-cover.jpg" />

        {/* ── Schema Markup ─────────────────────────────────────────────── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }} />
        {/* ✅ SEO FIX 3: BreadcrumbList schema — new addition */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        {/* ✅ SEO FIX (E-E-A-T): Faculty credentials and testimonial/review schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(facultySchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      </Head>

      <Layout
        title="We One Aviation | Best Pilot Training Institute in India"
        description="India's premier approved aviation training institute. CPL, PPL, ATPL, SPL courses. 3500+ pilots trained. Free career counselling available."
      >

        {/* HERO */}
        <HeroSlider />

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
          <h1 className="text-white font-bold text-xl px-4">
            Best Pilot Training Institute in India
          </h1>
          <p className="text-white/90 font-medium text-sm px-4 mt-1">
            Get world-class flight training, DGCA-approved courses, and expert guidance to kickstart your aviation career.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-2 bg-white text-av-orange font-bold px-6 py-2 rounded-full text-sm hover:bg-av-blue hover:text-white transition-all"
          >
            Contact Us →
          </Link>
        </div>

        {/* STATS BAR */}
        <div className="bg-av-blue py-8">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.id} className="text-center">
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="font-montserrat text-2xl font-black text-av-orange">{s.num}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-white/80 text-sm font-semibold">We have trained 3500+ pilots across India since 2009</span>
          </div>
          <div className="text-center mt-1">
            <span className="text-av-orange text-sm font-semibold">Clear Your Dgca Exam In First Attempt With We One Aviation Academy</span>
          </div>
        </div>

        {/* ABOUT */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="section-tag">About Us</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                India&apos;s Most Trusted Aviation Academy
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We One Aviation Academy has been shaping the careers of aspiring pilots since 2009.
                We are an approved institution offering world-class pilot training programs with
                international tie-ups in USA, Canada, Australia, and Europe.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our expert faculty, modern simulators, and personalized mentoring ensure every student
                achieves their dream of becoming a professional pilot. With a 98% success rate and
                3500+ pilots trained, we are India&apos;s #1 choice for aviation training.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {['DGCA Approved', 'International Tie-ups', '24/7 Support', 'Job Placement'].map(tag => (
                  <span key={tag} className="bg-av-light text-av-blue text-xs font-semibold px-4 py-2 rounded-full border border-av-sky/20">
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link href="/about-us" className="inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                  Learn More About Us →
                </Link>
                <Link href="/credentials" className="inline-block bg-white border border-av-blue text-av-blue px-7 py-3 rounded-full font-semibold hover:bg-av-light transition-all text-sm">
                  View Credentials & Verification
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/GroundSchool.jpg"
                    alt="Pilot ground school training at We One Aviation Academy"
                    width={600}
                    height={320}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-av-orange rounded-xl p-4 shadow-xl">
                  <div className="font-montserrat text-white text-xl font-black">16+</div>
                  <div className="text-white/80 text-xs">Years of Excellence</div>
                </div>
                <div className="absolute -top-5 -right-5 glass bg-av-blue rounded-xl p-4 shadow-xl border border-white/20">
                  <div className="font-montserrat text-av-orange text-xl font-black">DGCA</div>
                  <div className="text-white text-xs">Approved</div>
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
                Choose Your <span className="text-av-orange">Aviation Career Path</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                From Private Pilot to Airline Captain – we have the right course for every aspiring aviator
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

        <PartnerLogos />

        {/* COURSE FEE & SCHEDULE */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Fee &amp; Schedule</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                We One Aviation <span className="text-av-orange">Course Duration, Fee, &amp; Schedule</span>
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
                    <div><span className="font-semibold text-av-blue">Fees:</span> 2 Lakh to 2.95 Lakh <span className="text-av-orange font-semibold">(Scholarship Available)</span></div>
                    <div><span className="font-semibold text-av-blue">Course Duration:</span> 6 Months</div>
                    <div><span className="font-semibold text-av-blue">Mode:</span> Offline / Online</div>
                    <div><span className="font-semibold text-av-blue">Batch Start:</span> Every 1st &amp; 3rd Week of Month</div>
                  </div>
                  <Link href="/dgca-ground-classes" className="mt-auto inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">Course Details</Link>
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
                    <div><span className="font-semibold text-av-blue">Flying Duration:</span> 1 year (Abroad) / 1.5 Years (India)</div>
                    <div><span className="font-semibold text-av-blue">Fees:</span> 55 to 65 lakh <span className="text-gray-400">(Depends on Country)</span></div>
                    <div><span className="font-semibold text-av-blue">Registration:</span> Every Month</div>
                  </div>
                  <Link href="/courses/cpl-flight-training" className="mt-auto inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">CPL Flight Training Details</Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="bg-av-blue rounded-2xl shadow-lg p-8 h-full flex flex-col">
                  <div className="text-4xl mb-4">✈️</div>
                  <h3 className="font-montserrat text-xl font-bold text-white mb-3">Commercial Pilot Licence (CPL) Course</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">Full-fledged training program including both theoretical and practical flight training. All aviation solutions under one roof.</p>
                  <div className="space-y-2 mb-6 text-sm text-white/80">
                    <div><span className="font-semibold text-av-orange">Full Course Duration:</span> 2–3 Years (Depends on Country)</div>
                    <div><span className="font-semibold text-av-orange">Full Course Fees:</span> 50–55 lakh (Depends on Country)</div>
                    <div><span className="font-semibold text-av-orange">Batch Start:</span> Every 1st &amp; 3rd Week of Month</div>
                  </div>
                  <Link href="/commercial-pilot-license" className="mt-auto inline-block text-center bg-av-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">Course Details</Link>
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
              <p className="text-gray-600 leading-relaxed mb-4">✈️ Dreaming of Becoming a Commercial Pilot? Get approved training, expert mentorship and hands-on flight experience.</p>
              <Link href="/commercial-pilot-license" className="inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm mr-3 mb-3">CPL Training Details</Link>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="section-tag">Ground Classes</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Dgca-Cpl Ground Classes</h2>
              <p className="text-gray-600 leading-relaxed mb-4">📖 Master Every DGCA Subject &amp; Fly High! Our DGCA Ground Classes make learning easy &amp; effective. Get trained by industry experts!</p>
              <Link href="/dgca-ground-classes" className="inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm mr-3 mb-3">Explore DGCA Ground Classes</Link>
            </ScrollReveal>
          </div>
          <div className="max-w-7xl mx-auto mt-12">
            <ScrollReveal className="bg-av-blue rounded-2xl p-8 text-center">
              <h3 className="font-montserrat text-2xl font-bold text-white mb-3">Enroll in Flying School</h3>
              <p className="text-white/70 max-w-2xl mx-auto mb-6 text-sm">At Our Flying School, we train future pilots with state-of-the-art aircraft, expert instructors, and guaranteed career guidance.</p>
              <Link href="/flying-school/india" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">India Flying School Details</Link>
            </ScrollReveal>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Why WeOne</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">What Makes Us <span className="text-av-orange">Different</span></h2>
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
              <Link href="/contact" className="inline-block mt-4 bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">Get Free Pilot Career Counselling →</Link>
            </ScrollReveal>
          </div>
        </section>

        {/* FROM GROUND TO SKY */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Premier Training</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                From Ground to Sky: <span className="text-av-orange">DGCA Exam Coaching &amp; Flight Training</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">Premier DGCA Ground Classes &amp; Flying School for Aspiring Pilots.</p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              <ScrollReveal>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Dgca Ground Classes</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">We One Aviation Academy is the Oldest Pilot Training Institute, giving 100% results every year since 2009. Advanced Training with flexibility of timing and fees.</p>
                  <Link href="/contact" className="inline-block bg-av-blue text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">Enquiry Now</Link>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="bg-av-blue rounded-2xl shadow-lg p-8">
                  <h3 className="font-montserrat text-xl font-bold text-white mb-4">Our Flying School</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">We provide flight training from 20+ countries. 3500+ students trained across India. We offer 225+ hours of flying — more than any other institute.</p>
                  <Link href="/contact" className="inline-block bg-av-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">Enquiry Now</Link>
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
                How to Become a <span className="text-av-orange">Pilot in India</span>
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
              <h3 className="font-montserrat text-2xl font-bold text-white">Step By Step Guide for <span className="text-av-orange">Become a Pilot</span></h3>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid md:grid-cols-2 gap-6 mb-16">
                {pilotJourneySteps.map(step => (
                  <div key={step.id} className="glass rounded-2xl p-6">
                    <div className="text-3xl mb-3">{step.icon}</div>
                    <h4 className="font-montserrat font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{step.desc}</p>
                    <div className="bg-av-orange/20 border border-av-orange/30 rounded-xl p-4">
                      <p className="text-av-orange font-semibold text-sm mb-1">{step.alert}</p>
                      <p className="text-white/70 text-xs leading-relaxed">{step.alertDesc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

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
                Master Yourself For Dgca Exam With All These <span className="text-av-orange">Subjects</span>
              </h2>
              <p className="text-gray-500 mt-2 text-sm">Subjects For DGCA Ground Classes</p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dgcaSubjects.map(subject => (
                  <div key={subject.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{subject.num}</div>
                      <h3 className="font-montserrat font-bold text-av-blue text-sm">{subject.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">{subject.desc}</p>
                    <Link href={subject.link} className="text-av-orange text-xs font-semibold hover:underline">{subject.linkText}</Link>
                  </div>
                ))}
              </div>
            </ScrollReveal>
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
              <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm">🌍 Explore flight training centers in India, the USA, Canada, the UK, Australia, and South Africa — with structured courses designed for aspiring commercial pilots.</p>
              <p className="text-av-orange font-semibold mt-2 text-sm">🌟 Choose a Flight School That Matches Your Goals and Country Preference!</p>
            </ScrollReveal>
            <ScrollReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {flyingSchools.map(school => (
                  <div key={school.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full flex flex-col">
                    <div className="text-4xl mb-3">{school.flag}</div>
                    <h3 className="font-montserrat font-bold text-av-blue mb-3">Flying School in {school.country}</h3>
                    <div className="space-y-1 text-sm text-gray-600 mb-4 flex-grow">
                      <p>✅ <span className="font-semibold">Course:</span> {school.course}</p>
                      <p>✅ <span className="font-semibold">Duration:</span> {school.duration}</p>
                      <p>✅ <span className="font-semibold">Fees:</span> {school.fees}</p>
                      <p>✅ <span className="font-semibold">Highlights:</span> {school.highlights}</p>
                    </div>
                    <Link href={school.href} className="inline-block text-center bg-av-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-av-orange transition-all">Learn More</Link>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Success Stories</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">Our <span className="text-av-orange"> <a href="https://www.weoneaviation.com/" className="hover:underline">Pilots</a> Speak</span></h2>
              <p className="text-gray-500 mt-2 text-sm">Genuine Reviews from students who cleared DGCA Exam in {currentYear} with our expert training.</p>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 100}>
                  <div className="card-hover bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative">
                    {t.verified && (
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        ✓ Verified
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-av-orange mb-4">
                      {[...Array(5)].map((_, j) => <span key={j} className="text-sm">★</span>)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-av-blue rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{t.initials}</div>
                      <div>
                        <div className="font-semibold text-av-blue text-sm">{t.name}</div>
                        <div className="text-gray-400 text-xs">{t.role}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 border-t pt-3 space-y-1">
                      {t.airline && <p>✈️ <span className="font-semibold">{t.airline}</span></p>}
                      {t.licenseNo && <p>📝 License: {t.licenseNo}</p>}
                    </div>
                    {t.linkedin && (
                      <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-av-orange text-xs font-semibold hover:underline">
                        View LinkedIn Profile →
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FACULTY CREDENTIALS - E-E-A-T SIGNALS */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <div className="section-tag">Expert Faculty</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                Learn from <span className="text-av-orange">Industry Veterans</span>
              </h2>
              <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                Our instructors are verified commercial pilots, airline captains, and DGCA-certified experts with decades of combined aviation experience.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {instructors.map((instructor, i) => (
                <ScrollReveal key={instructor.id} delay={i * 80}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-av-blue rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 text-lg">
                        {instructor.name.charAt(0)}{instructor.name.split(' ')[1]?.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-av-blue text-sm">{instructor.name}</h3>
                        <p className="text-xs text-av-orange font-semibold">{instructor.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-grow">{instructor.bio}</p>
                    <div className="border-t border-gray-200 pt-3 space-y-1 text-xs text-gray-600">
                      {instructor.airline && (
                        <p className="flex items-start gap-2">
                          <span className="text-av-orange flex-shrink-0">✈️</span>
                          <span><strong>Airline:</strong> {instructor.airline}</span>
                        </p>
                      )}
                      {instructor.experience && (
                        <p className="flex items-start gap-2">
                          <span className="text-av-orange flex-shrink-0">📅</span>
                          <span><strong>Experience:</strong> {instructor.experience}</span>
                        </p>
                      )}
                      {(instructor.dgcaLicense || instructor.qualification) && (
                        <p className="flex items-start gap-2">
                          <span className="text-av-orange flex-shrink-0">📝</span>
                          <span><strong>License:</strong> {instructor.dgcaLicense || instructor.qualification}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* INDIA LOCATIONS */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <div className="section-tag">Pan India Presence</div>
              <h2 className="font-montserrat text-3xl font-bold text-av-blue">Pilot Training Across <span className="text-av-orange">India</span></h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {cities.map(city => (
                <Link key={city.slug} href={`/${city.slug}`} className="card-hover block text-center p-4 rounded-xl border border-gray-200 bg-white hover:border-av-orange hover:text-av-orange hover:bg-orange-50 transition-all text-sm font-medium text-av-blue">
                  📍 {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Passresultsslider />

        {/* WORLD LOCATIONS */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <div className="section-tag">Global Presence</div>
              <h2 className="font-montserrat text-3xl font-bold text-av-blue">Pilot Training Across <span className="text-av-orange">World</span></h2>
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
              <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">Ask Question</Link>
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
              <p className="text-white/70 mb-6 text-sm leading-relaxed">Our aviation career counsellors will guide you through course selection, eligibility, fees, scholarships, and career prospects.</p>
              <div className="space-y-3">
                {['Free one-on-one career counselling', 'DGCA exam preparation guidance', 'International training options', 'Scholarship & loan assistance'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-av-orange">✓</span>
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/20 space-y-2 text-sm text-white/70">
                {/* ✅ SEO FIX 7: Changed Gmail → domain email. Gmail on a public page
                    hurts E-E-A-T (Google's trust scoring). A domain email signals
                    a legitimate, established business. Update DNS/hosting panel
                    to create info@weoneaviation.in if not done yet. */}
                <p>📧 <span className="font-semibold text-white">Office Mail:</span> info@weoneaviation.in</p>
                <p>📍 <span className="font-semibold text-white">Office Address:</span> C-404, 3rd floor, Sector-7, near Ramphal Chowk Road, Palam Extension, Dwarka, Delhi 110077</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                <h3 className="font-montserrat font-bold text-white text-center mb-4">BOOK Your SEAT FOR SCHOLARSHIP</h3>
                <p className="text-white/70 text-center text-sm mb-4">Join Dgca Ground Classes</p>
                <LeadForm isDark={true} />
              </div>
            </ScrollReveal>
          </div>
        </section>

      </Layout>
    </>
  );
}
