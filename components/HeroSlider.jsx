import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PILOTS_TRAINED, YEARS_LABEL } from '../data/academy';

const slides = [
  {
    id: 1,
    // Reduced quality param from q=80 to q=75, added fm=webp for explicit WebP
    // next/image will further optimize this, but explicit format helps CDN caching
    image: '/1725_piper-pa34-seneca.jpg',
    tag: "India's #1 Aviation Academy",
    title: 'Your Dream of Flying',
    alt: 'Professional pilot training facility at We One Aviation Academy with modern aircraft and DGCA-approved simulators for Commercial Pilot License courses',
    highlight: 'Starts Here',
    sub: `• ${PILOTS_TRAINED} Pilots Trained • International Tie-ups`,
  },
  {
    id: 2,
    image: '/Piper Archer.jpg',
    tag: 'Commercial Pilot License',
    title: 'Become an Airline',
    alt: 'Commercial pilot in cockpit - CPL training at We One Aviation Academy with airline partnership opportunities',
    highlight: 'Captain',
    sub: 'Fast-track CPL programs with 100% placement support',
  },
  {
    id: 3,
    image: '/redbird and simulator.jpg',
    tag: 'World-Class Training',
    title: 'Modern Fleet &',
    alt: 'Advanced flight simulator and training equipment at We One Aviation Academy for DGCA ground classes and CPL preparation',
    highlight: 'Simulators',
    sub: 'Train on latest aircraft with expert approved instructors',
  },
  {
    id: 4,
    image: '/king_air_b_350.jpeg',
    tag: 'Pilot Training Across India',
    title: 'From India to the',
    alt: 'International aviation training - We One Aviation Academy offers pilot training in USA, Canada, Australia and Europe',
    highlight: 'World',
    sub: 'International tie-ups with USA, Canada, Australia, Europe',
  },
];

// Moved outside component — stable reference, never causes re-renders
const STATS = [
  [PILOTS_TRAINED, 'Pilots Trained'],
  [YEARS_LABEL, 'Years Experience'],
  ['100%', 'Placement Support'],
];

/**
 * Hero slides are full-bleed, so every viewport was served the same 1920px
 * file — Lighthouse (mobile) attributed 633 KiB of transfer to Unsplash on the
 * homepage alone, most of it pixels a phone cannot display.
 *
 * Unsplash resizes on demand from the `w` query parameter, so a srcset costs
 * nothing to produce. Slides pointing at local files under /assets have no such
 * parameter; those return undefined and fall back to plain `src`.
 */
const SRCSET_WIDTHS = [640, 960, 1280, 1920];

function buildSrcSet(url) {
  if (typeof url !== 'string' || !/[?&]w=\d+/.test(url)) return undefined;
  return SRCSET_WIDTHS.map((w) => `${url.replace(/([?&]w=)\d+/, `$1${w}`)} ${w}w`).join(', ');
}

// Particle positions computed once, not on every render
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  left: `${10 + i * 12}%`,
  top: `${20 + (i % 3) * 25}%`,
  delay: `${i * 0.7}s`,
  duration: `${2 + i * 0.5}s`,
}));

/**
 * @param asH1  Whether the slide title should render as the page's <h1>.
 *
 * This was hardcoded to 'h1'. Because the slider appears on most pages, any
 * page that also wrote its own <h1> shipped two — 18 routes did, confirmed by
 * crawling the built site. Two <h1>s leave the page's actual subject ambiguous
 * to anything reading the document outline.
 *
 * Defaults to true so pages that rely on the slider for their heading are
 * unaffected; pages with their own <h1> pass asH1={false} and get an <h2>.
 */
export default function HeroSlider({ customSlides, asH1 = true }) {
  const data = customSlides?.length ? customSlides : slides;
  const Heading = asH1 ? 'h1' : 'h2';
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(() => new Set([0]));

  // useCallback so goTo reference is stable for the interval cleanup
  const goTo = useCallback((idx) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      // Mark next slide as needing to load
      setLoaded(prev => new Set(prev).add(idx));
      setTransitioning(false);
    }, 200);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % data.length;
        setTransitioning(true);
        // Pre-load the next slide image before we need it
        setLoaded(s => new Set(s).add(next));
        setTimeout(() => {
          setCurrent(next);
          setTransitioning(false);
        }, 300);
        return prev; // keep prev during transition
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  // Pre-load the *next* slide whenever current changes
  useEffect(() => {
    const nextIdx = (current + 1) % data.length;
    setLoaded(prev => new Set(prev).add(nextIdx));
  }, [current, data.length]);

  const slide = data[current];

  return (
    <div className="relative h-screen min-h-[580px] overflow-hidden">
      {/* 
        CRITICAL LCP FIX: Use plain <img> instead of next/image for this Next.js
        14.2.3 app to avoid the known fetchPriority hydration warning.
        - The first slide is eager-loaded, later slides are lazy-loaded.
        - This avoids the bug where next/image forwards fetchPriority to the DOM.
      */}
      {data.map((s, i) => {
        const isFirst = i === 0;
        const shouldRender = loaded.has(i);

        return (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
            // Hide from interaction when not visible — prevents click events on bg layers
            aria-hidden={i !== current}
          >
            {/* Only render the image once the slide has been "unlocked" */}
            {(isFirst || shouldRender) && (
              <img
                src={s.image}
                srcSet={buildSrcSet(s.image)}
                sizes="100vw"
                alt={s.alt || s.tag}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading={isFirst ? 'eager' : 'lazy'}
                fetchpriority={isFirst ? 'high' : undefined}
                decoding="async"
              />
            )}
          </div>
        );
      })}

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* 
        Particles: Use will-change: opacity to promote to GPU layer.
        Moved position data out of render to avoid object creation on each paint.
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-av-orange/40 rounded-full animate-pulse-slow"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              // Hint to browser: only opacity will change — skip paint/layout
              willChange: 'opacity',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex items-center transition-all duration-500 ${transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">{slide.tag}</div>
            {/* 
              Use h1 for the homepage hero and h2 for page-specific hero slides.
              This keeps the layout intact while preserving heading structure.
            */}
            <Heading className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight text-shadow mb-2">
              {slide.title}
            </Heading>
            <p className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-shadow mb-5 gradient-text">
              {slide.highlight}
            </p>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
              {slide.sub}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-av-orange hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all shadow-2xl hover:shadow-orange-500/40 hover:scale-105 text-sm md:text-base"
              >
                Get Free Counselling
              </Link>
              <Link
                href="/courses"
                className="glass text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all text-sm md:text-base"
              >
                Explore Courses →
              </Link>
            </div>

            {/* Stats — moved data to module-level constant */}
            <div className="flex gap-8 mt-12">
              {STATS.map(([num, label]) => (
                <div key={label}>
                  <div className="font-montserrat text-2xl font-black text-av-orange">{num}</div>
                  <div className="text-white/60 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {data.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-av-orange' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        onClick={() => goTo((current - 1 + data.length) % data.length)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-av-orange transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % data.length)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-av-orange transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}