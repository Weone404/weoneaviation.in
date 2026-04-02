import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    // Reduced quality param from q=80 to q=75, added fm=webp for explicit WebP
    // next/image will further optimize this, but explicit format helps CDN caching
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=75&fm=webp',
    tag: "India's #1 Aviation Academy",
    title: 'Your Dream of Flying',
    highlight: 'Starts Here',
    sub: '• 3500+ Pilots Trained • International Tie-ups',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1920&q=75&fm=webp',
    tag: 'Commercial Pilot License',
    title: 'Become an Airline',
    highlight: 'Captain',
    sub: 'Fast-track CPL programs with 100% placement support',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=75&fm=webp',
    tag: 'World-Class Training',
    title: 'Modern Fleet &',
    highlight: 'Simulators',
    sub: 'Train on latest aircraft with expert approved instructors',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=75&fm=webp',
    tag: 'Pilot Training Across India',
    title: 'From India to the',
    highlight: 'World',
    sub: 'International tie-ups with USA, Canada, Australia, Europe',
  },
];

// Moved outside component — stable reference, never causes re-renders
const STATS = [
  ['3500+', 'Pilots Trained'],
  ['16+', 'Years Experience'],
  ['100%', 'Placement Support'],
];

// Particle positions computed once, not on every render
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  left: `${10 + i * 12}%`,
  top: `${20 + (i % 3) * 25}%`,
  delay: `${i * 0.7}s`,
  duration: `${2 + i * 0.5}s`,
}));

export default function HeroSlider({ customSlides }) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  // Track which slide indexes have been "seen" so we only render their images once loaded
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const data = customSlides || slides;

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
        CRITICAL LCP FIX: Use next/image instead of CSS backgroundImage.
        - The first slide uses priority={true} → adds <link rel="preload"> in <head>
          so the browser fetches the image before JS even executes.
        - Subsequent slides use loading="lazy" and are only rendered once
          they've been "loaded" into state (i.e. we've navigated to them).
        - next/image auto-generates srcset for responsive sizes and converts
          to WebP/AVIF automatically.
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
            {/* Only render the Image once the slide has been "unlocked" */}
            {(isFirst || shouldRender) && (
              <Image
                src={s.image}
                alt={s.tag}
                fill
                // priority on first slide = <link rel="preload"> in <head> = LCP image
                // fetched before render even begins. This is the #1 LCP fix.
                priority={isFirst}
                // Non-first slides: lazy by default (browser decides when to fetch)
                loading={isFirst ? 'eager' : 'lazy'}
                quality={75}
                sizes="100vw"
                className="object-cover object-center"
              // Unsplash needs to be in next.config.js remotePatterns
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
              h1 uses as="h1" semantically. On page-specific slides (customSlides),
              the page's own h1 takes precedence — but for homepage this is correct.
            */}
            <h1 className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight text-shadow mb-2">
              {slide.title}
            </h1>
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
                href="/courses/cpl"
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