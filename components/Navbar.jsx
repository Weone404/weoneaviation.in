import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const tickerMessages = [
  '🚨 Apply for March CPL Batch – Limited Seats Available',
  '🎓 Flight Training in USA & South Africa – Enroll Today',
  '📋 DGCA Class 2 & Class 1 Medical Assistance Available',
  '🏆 We One Aviation – Best Pilot Training Institute in India',
  '🎯 Class 10 & 12 Topper? Get Full Money-Back Scholarship – You Fly Free!',
  '💸 Topper Student Money-Back Guarantee – Top Scorers Fly at Zero Cost',
  '✈️ Flying School Scholarship Available – Apply Now & Take Off Your Career',
];

const courses = [
  {
    label: 'Commercial Pilot License (CPL)',
    href: '/commercial-pilot-license',
    sub: [
      { label: 'Commercial Pilot License', href: '/commercial-pilot-license' },
      { label: 'Dgca Cpl Ground Classes', href: '/dgca-ground-classes' },
      { label: 'Air Navigation', href: '/air-navigation' },
      { label: 'Aviation Meteorology', href: '/aviation-meteorology' },
      { label: 'Air Regulations', href: '/air-regulations' },
      { label: 'Technical General', href: '/technical-general' },
      { label: 'RTR (A)', href: '/rtr-a' },
      { label: 'Commercial Pilot License Simulator', href: '/simulator' },
    ],
  },
  {
    label: 'Cadet Pilot Program',
    href: '/qatar-airways-cadet-pilot-program',
    sub: [
      { label: 'Qatar Airways Cadet Pilot Program', href: '/qatar-airways-cadet-pilot-program' },
      { label: 'Emirates Cadet Pilot Program', href: '/emirates-cadet-pilot-program' },
      { label: 'Spice Jet Cadet Pilot Program', href: '/spice-jet' },
      { label: 'Air Arabia Cadet Pilot Program', href: '/air-arabia' },
    ],
  },
  {
    label: 'Airline Preparatory Classes',
    href: '/airline-preparation-course',
    sub: [
      { label: 'Airline Preparation Course', href: '/airline-preparation-course' },
      { label: 'Interview Preparation', href: '/airline-preparatory-classes/interview-preparation' },
      { label: 'Psychometry', href: '/airline-preparatory-classes/psychometry' },
      { label: 'CASS/COMPASS', href: '/airline-preparatory-classes/cass-compass' },
      { label: 'Written Exam Preparation', href: '/airline-preparatory-classes/written-exam-preparation' },
    ],
  },
  { label: 'Private Pilot License (PPL)', href: '/private-pilot-license-ppl-course-details' },
  { label: 'ATPL', href: '/advanced-atpl-pilot-training' },
  { label: 'SPL', href: '/student-pilot-license-spl' },
  { label: 'DGCA Ground Classes', href: '/dgca-ground-classes' },
];

const flyingCountry = [
  { label: 'Flight Training in U.S.A', href: '/best-flight-schools-in-usa' },
  { label: 'Flight Training in South Africa', href: '/flying-country/south-africa' },
];

const howTo = [
  { label: 'Apply For DGCA Computer Number', href: 'dgca-computer-number' },
  { label: 'DGCA Class 2 & Class 1 Medical', href: '/dgca-class-2-class-1-medical' },
  { label: 'Join DGCA CPL Ground Classes', href: '/dgca-ground-classes' },
  { label: 'Join Flying School', href: '/best-flight-schools-in-usa' },
  { label: 'After 12th', href: '/how-to-become-a-pilot/after-12th' },
  { label: 'In India', href: '/how-to-become-a-pilot/in-india' },
];

function DropdownItem({ item }) {
  const [subOpen, setSubOpen] = useState(false);
  const hasSubMenu = item.sub && item.sub.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasSubMenu && setSubOpen(true)}
      onMouseLeave={() => hasSubMenu && setSubOpen(false)}
    >
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className="flex-1 px-5 py-2.5 text-sm text-white hover:bg-av-orange/20 hover:text-av-orange transition-all block"
        >
          {item.label}
        </Link>
        {hasSubMenu && (
          <span className="pr-3 text-white/60">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>

      {hasSubMenu && subOpen && (
        <div className="absolute left-full top-0 bg-av-blue border border-white/10 rounded-xl shadow-2xl py-2 min-w-56 z-50">
          {item.sub.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block px-5 py-2.5 text-sm text-white hover:bg-av-orange/20 hover:text-av-orange transition-all"
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function BreakingNewsTicker() {
  const items = [...tickerMessages, ...tickerMessages];

  return (
    <div className="w-full flex items-stretch overflow-hidden bg-orange-600" style={{ height: '36px' }}>
      {/* BREAKING badge */}
      <div className="relative z-10 flex shrink-0 items-center bg-red-800 px-3 sm:px-5">
        <span className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] text-white sm:text-xs">

        </span>
        <div
          className="absolute right-0 top-0 h-full w-4 translate-x-full bg-red-800"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </div>

      {/* Scrolling track */}
      <div className="relative flex flex-1 items-center overflow-hidden">
        <div className="ticker-track flex items-center whitespace-nowrap">
          {items.map((msg, i) => (
            <span key={i} className="inline-flex items-center gap-3 text-xs font-bold text-white sm:text-sm">
              <span className="px-6 leading-none">{msg}</span>
              <span className="text-red-300 opacity-70">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Live dot */}
      <div className="flex shrink-0 items-center gap-2 bg-orange-700 px-3 sm:px-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="hidden text-[10px] font-black uppercase tracking-widest text-white sm:inline">Live</span>
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker-scroll 35s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [courseOpen, setCourseOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);

  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);
  const [mobileHowOpen, setMobileHowOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) =>
    router.pathname === href || router.pathname.startsWith(href + '/');

  const ChevronIcon = ({ open }) => (
    <svg
      className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Main Navbar ── */}
      <div className={`transition-all duration-300 ${scrolled ? 'bg-av-blue shadow-2xl py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/Logo.webp"
              alt="WeOne Aviation Academy"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:text-av-orange ${isActive('/') ? 'text-av-orange' : 'text-white'}`}>
              Home
            </Link>

            {/* Pilot Training Courses */}
            <div className="relative" onMouseEnter={() => setCourseOpen(true)} onMouseLeave={() => setCourseOpen(false)}>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-av-orange transition-all">
                Pilot Training Courses <ChevronIcon open={courseOpen} />
              </button>
              {courseOpen && (
                <div className="absolute top-full left-0 bg-av-blue border border-white/10 rounded-xl shadow-2xl py-2 min-w-64 z-50">
                  {courses.map((c) => <DropdownItem key={c.href} item={c} />)}
                </div>
              )}
            </div>

            {/* Flying Country */}
            <div className="relative" onMouseEnter={() => setCountryOpen(true)} onMouseLeave={() => setCountryOpen(false)}>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-av-orange transition-all">
                Flying Country <ChevronIcon open={countryOpen} />
              </button>
              {countryOpen && (
                <div className="absolute top-full left-0 bg-av-blue border border-white/10 rounded-xl shadow-2xl py-2 min-w-56 z-50">
                  {flyingCountry.map((c) => (
                    <Link key={c.href} href={c.href} className="block px-5 py-2.5 text-sm text-white hover:bg-av-orange/20 hover:text-av-orange transition-all">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* How To Become a Pilot */}
            <div className="relative" onMouseEnter={() => setHowOpen(true)} onMouseLeave={() => setHowOpen(false)}>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-av-orange transition-all">
                How To Become a Pilot <ChevronIcon open={howOpen} />
              </button>
              {howOpen && (
                <div className="absolute top-full left-0 bg-av-blue border border-white/10 rounded-xl shadow-2xl py-2 min-w-64 z-50">
                  {howTo.map((c) => (
                    <Link key={c.href} href={c.href} className="block px-5 py-2.5 text-sm text-white hover:bg-av-orange/20 hover:text-av-orange transition-all">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ✅ Desktop: DGCA Exam Practice — opens external site */}
            <a
              href="https://dgcaexam.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:text-av-orange transition-all"
            >
              DGCA Exam Practice
            </a>

            <Link href="/about-us" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:text-av-orange ${isActive('/about') ? 'text-av-orange' : 'text-white'}`}>
              About Us
            </Link>
            <Link href="/contact" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:text-av-orange ${isActive('/contact') ? 'text-av-orange' : 'text-white'}`}>
              Contact Us
            </Link>
            <Link href="/blogs" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:text-av-orange ${isActive('/blogs') ? 'text-av-orange' : 'text-white'}`}>
              Blogs
            </Link>

            <Link href="/contact" className="ml-2 bg-av-orange text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30">
              Register for Scholarship
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Breaking News Ticker ── */}
      <BreakingNewsTicker />

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="lg:hidden bg-av-blue border-t border-white/10 px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">

          {/* Static mobile links */}
          {[
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about' },
            { label: 'Blogs', href: '/blogs' },
            { label: 'Contact Us', href: '/contact' },
          ].map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-white hover:text-av-orange text-sm font-medium rounded-lg hover:bg-white/5 transition-all">
              {item.label}
            </Link>
          ))}

          {/* ✅ Mobile: DGCA Exam Practice — opens https://dgcaexam.com/ in new tab */}
          <a
            href="https://dgcaexam.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2.5 text-white hover:text-av-orange text-sm font-medium rounded-lg hover:bg-white/5 transition-all"
          >
            DGCA Exam Practice ↗
          </a>

          {/* Mobile: Pilot Training Courses */}
          <button onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-av-orange text-sm font-semibold uppercase tracking-widest">
            Pilot Training Courses <ChevronIcon open={mobileCoursesOpen} />
          </button>
          {mobileCoursesOpen && courses.map((c) => (
            <div key={c.href}>
              <Link href={c.href} onClick={() => setMenuOpen(false)}
                className="block px-6 py-2 text-white/80 hover:text-av-orange text-sm rounded-lg hover:bg-white/5 transition-all">
                {c.label}
              </Link>
              {c.sub && c.sub.map((s) => (
                <Link key={s.href} href={s.href} onClick={() => setMenuOpen(false)}
                  className="block px-10 py-1.5 text-white/60 hover:text-av-orange text-xs rounded-lg hover:bg-white/5 transition-all">
                  — {s.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Mobile: Flying Country */}
          <button onClick={() => setMobileCountryOpen(!mobileCountryOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-av-orange text-sm font-semibold uppercase tracking-widest">
            Flying Country <ChevronIcon open={mobileCountryOpen} />
          </button>
          {mobileCountryOpen && flyingCountry.map((c) => (
            <Link key={c.href} href={c.href} onClick={() => setMenuOpen(false)}
              className="block px-6 py-2 text-white/80 hover:text-av-orange text-sm rounded-lg hover:bg-white/5 transition-all">
              {c.label}
            </Link>
          ))}

          {/* Mobile: How To Become a Pilot */}
          <button onClick={() => setMobileHowOpen(!mobileHowOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-av-orange text-sm font-semibold uppercase tracking-widest">
            How To Become a Pilot <ChevronIcon open={mobileHowOpen} />
          </button>
          {mobileHowOpen && howTo.map((c) => (
            <Link key={c.href} href={c.href} onClick={() => setMenuOpen(false)}
              className="block px-6 py-2 text-white/80 hover:text-av-orange text-sm rounded-lg hover:bg-white/5 transition-all">
              {c.label}
            </Link>
          ))}

          <div className="pt-3">
            <Link href="/contact" onClick={() => setMenuOpen(false)}
              className="block bg-av-orange text-white text-center px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all">
              Get Free Counselling
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}