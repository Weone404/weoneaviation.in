import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
    tag: 'India\'s #1 Aviation Academy',
    title: 'Your Dream of Flying',
    highlight: 'Starts Here',
    sub: '• 3500+ Pilots Trained • International Tie-ups',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1920&q=80',
    tag: 'Commercial Pilot License',
    title: 'Become an Airline',
    highlight: 'Captain',
    sub: 'Fast-track CPL programs with 100% placement support',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=80',
    tag: 'World-Class Training',
    title: 'Modern Fleet &',
    highlight: 'Simulators',
    sub: 'Train on latest aircraft with expert approved instructors',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80',
    tag: 'Pilot Training Across India',
    title: 'From India to the',
    highlight: 'World',
    sub: 'International tie-ups with USA, Canada, Australia, Europe',
  },
];

export default function HeroSlider({ customSlides }) {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const data = customSlides || slides;

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % data.length);
        setTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  const goTo = (idx) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 200);
  };

  const slide = data[current];

  return (
    <div className="relative h-screen min-h-[580px] overflow-hidden">
      {/* Background Images */}
      {data.map((s, i) => (
        <div key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i}
            className="absolute w-1 h-1 bg-av-orange/40 rounded-full animate-pulse-slow"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={`relative z-10 h-full flex items-center transition-all duration-500 ${transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <div className="max-w-7xl mx-auto px-6 w-full pt-20">
          <div className="max-w-3xl">
            <div className="section-tag mb-4">{slide.tag}</div>
            <h1 className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight text-shadow mb-2">
              {slide.title}
            </h1>
            <h1 className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-shadow mb-5 gradient-text">
              {slide.highlight}
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl leading-relaxed">{slide.sub}</p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact"
                className="bg-av-orange hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all shadow-2xl hover:shadow-orange-500/40 hover:scale-105 text-sm md:text-base">
                Get Free Counselling
              </Link>
              <Link href="/courses/cpl"
                className="glass text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all text-sm md:text-base">
                Explore Courses →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[['3500+', 'Pilots Trained'], ['16+', 'Years Experience'], ['100%', 'Placement Support']].map(([num, label]) => (
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
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-av-orange' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button onClick={() => goTo((current - 1 + data.length) % data.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-av-orange transition-all">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={() => goTo((current + 1) % data.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-av-orange transition-all">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
