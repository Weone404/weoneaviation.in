'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const reviewsData = [
  { id: 1, name: 'Capt. Akshay', imageSrc: '/assets/pilot1.webp', airline: 'Air India' },
  { id: 2, name: 'Capt. Pilot', imageSrc: '/assets/pilot2.webp', airline: 'IndiGo' },
  { id: 3, name: 'Capt. Akhila', imageSrc: '/assets/pilot3.webp', airline: 'Air India Express' },
  { id: 4, name: 'Capt. Anish K.', imageSrc: '/assets/pilot4.webp', airline: 'Air India Express' },
  { id: 5, name: 'Capt. Aashish', imageSrc: '/assets/pilot5.webp', airline: 'IndiGo' },
  { id: 6, name: 'Capt. Megha', imageSrc: '/assets/pilot6.jpg', airline: 'Air India Express' },
  { id: 7, name: 'Capt. Keshna', imageSrc: '/assets/pilot7.jpg', airline: 'Air India' },
  { id: 8, name: 'Capt. Tanmay', imageSrc: '/assets/pilot8.jpg', airline: 'Air India Express' },
  { id: 9, name: 'Capt. Neha', imageSrc: '/assets/pilot9.jpg', airline: 'SpiceJet' },
  { id: 10, name: 'Capt. Esther', imageSrc: '/assets/pilot10.jpg', airline: 'Air India' },
  { id: 11, name: 'Capt. Akshat', imageSrc: '/assets/pilot11.jpg', airline: 'SpiceJet' },
  { id: 12, name: 'Capt. Ashik K.', imageSrc: '/assets/pilot12.jpg', airline: 'IndiGo' },
  { id: 13, name: 'Capt. Eshan', imageSrc: '/assets/pilot13.jpg', airline: 'IndiGo' },
  { id: 14, name: 'Capt. Namita', imageSrc: '/assets/pilot14.webp', airline: 'SpiceJet' },
  { id: 15, name: 'Capt. Kunal', imageSrc: '/assets/pilot15.webp', airline: 'SpiceJet' },
  { id: 16, name: 'Capt. Sahiba', imageSrc: '/assets/pilot16.webp', airline: 'Air India Express' },
];

const AIRLINE_COLORS = {
  'Air India': { bg: 'rgba(180,0,50,0.10)', border: 'rgba(180,0,50,0.25)', dot: '#b40032', text: '#8b0028' },
  'IndiGo': { bg: 'rgba(6,54,190,0.10)', border: 'rgba(6,54,190,0.25)', dot: '#0636be', text: '#0636be' },
  'Air India Express': { bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.28)', dot: '#f97316', text: '#c2560a' },
  'SpiceJet': { bg: 'rgba(220,53,30,0.10)', border: 'rgba(220,53,30,0.25)', dot: '#dc351e', text: '#b02a16' },
};

// ── Constants ─────────────────────────────────────────────────────────────────
const CARD_GAP = 24;
const CARD_WIDTH = 260 + CARD_GAP;   // 284px per step
const VISIBLE = 4;
const AUTO_SLIDE = 3200;

// ── Static CSS string (NO template-literal interpolations) ────────────────────
// The one dynamic value (CARD_GAP) is replaced by its literal value: 24px
const PRS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .prs-section {
    font-family: 'DM Sans', 'Poppins', sans-serif;
    background: #f8f9fc;
    padding: 96px 0 108px;
    overflow: hidden;
    position: relative;
    width: 100%;
    isolation: isolate;
  }
  .prs-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(10,35,66,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10,35,66,0.035) 1px, transparent 1px);
    background-size: 60px 60px;
    z-index: 0;
    pointer-events: none;
  }
  .prs-section::after {
    content: '';
    position: absolute;
    top: -120px; right: -80px;
    width: 560px; height: 560px;
    background: radial-gradient(circle, rgba(249,115,22,0.10) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
  }
  .prs-inner { position: relative; z-index: 1; }

  .prs-header {
    padding: 0 5%;
    margin-bottom: 52px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
  .prs-tag {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #0a2342;
    color: #fff;
    padding: 5px 14px 5px 10px;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .prs-tag-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #f97316;
    animation: prs-pulse 2s ease-in-out infinite;
  }
  @keyframes prs-pulse {
    0%, 100% { transform: scale(1);   opacity: 1;   }
    50%       { transform: scale(1.5); opacity: 0.7; }
  }
  .prs-header h2 {
    font-family: 'Syne', 'Montserrat', sans-serif;
    font-size: clamp(2rem, 4.5vw, 3.4rem);
    font-weight: 800;
    color: #0a2342;
    line-height: 1.1;
    margin: 0;
    letter-spacing: -0.02em;
  }
  .prs-header h2 em {
    font-style: normal;
    color: transparent;
    -webkit-text-stroke: 2px #f97316;
  }
  @supports not (-webkit-text-stroke: 1px) {
    .prs-header h2 em { color: #f97316; }
  }

  .prs-counter { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .prs-counter-num {
    font-family: 'Syne', sans-serif;
    font-size: 3.2rem; font-weight: 800;
    color: #0a2342; line-height: 1; letter-spacing: -0.04em;
  }
  .prs-counter-num span { color: #f97316; }
  .prs-counter-label {
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: rgba(10,35,66,0.45);
  }

  .prs-viewport {
    width: 90%; margin: 0 auto;
    overflow: hidden; position: relative; border-radius: 20px;
  }
  .prs-viewport::before,
  .prs-viewport::after {
    content: '';
    position: absolute; top: 0; bottom: 0;
    width: 80px; z-index: 3; pointer-events: none;
  }
  .prs-viewport::before { left: 0;  background: linear-gradient(to right, #f8f9fc 0%, transparent 100%); }
  .prs-viewport::after  { right: 0; background: linear-gradient(to left,  #f8f9fc 0%, transparent 100%); }

  /* gap value is the literal 24px — no JS interpolation */
  .prs-track {
    display: flex;
    gap: 24px;
    transition: transform 0.52s cubic-bezier(0.33, 1, 0.68, 1);
    will-change: transform;
    padding: 28px 6px 36px;
    cursor: grab;
    user-select: none;
  }
  .prs-track:active { cursor: grabbing; }

  .prs-card {
    min-width: 260px; border-radius: 20px;
    border: 1.5px solid rgba(10,35,66,0.07);
    background: #ffffff;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    position: relative; overflow: hidden; cursor: default;
    transition:
      transform   0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow  0.35s ease,
      border-color 0.35s ease;
    box-shadow: 0 2px 6px rgba(10,35,66,0.04), 0 8px 24px rgba(10,35,66,0.06);
  }
  .prs-card:hover {
    transform: translateY(-10px) scale(1.012);
    box-shadow:
      0 4px 12px rgba(10,35,66,0.06),
      0 20px 48px rgba(10,35,66,0.14),
      0 0 0 2px rgba(249,115,22,0.18);
    border-color: rgba(249,115,22,0.22);
  }

  .prs-card-head {
    width: 100%; height: 100px;
    background: linear-gradient(135deg, #0a2342 0%, #133265 100%);
    position: relative; flex-shrink: 0; overflow: hidden;
  }
  .prs-card-head::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px,
      transparent 1px, transparent 12px
    );
  }
  .prs-card-head::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #f97316 0%, #0ea5e9 100%);
    opacity: 0; transition: opacity 0.35s ease;
  }
  .prs-card:hover .prs-card-head::after { opacity: 1; }

  .prs-plane-mark {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    font-size: 2rem; color: rgba(255,255,255,0.08);
    transition: color 0.35s ease, transform 0.4s ease;
    line-height: 1;
  }
  .prs-card:hover .prs-plane-mark {
    color: rgba(249,115,22,0.2);
    transform: translateY(-58%) rotate(-12deg) scale(1.15);
  }
  .prs-card-id {
    position: absolute; left: 14px; bottom: 12px;
    font-family: 'Syne', monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 2px; color: rgba(255,255,255,0.3);
  }

  .prs-avatar-wrap {
    position: relative; z-index: 2;
    width: 90px; height: 90px;
    margin-top: -45px; margin-bottom: 16px;
    flex-shrink: 0; border-radius: 50%; padding: 3px;
    background: linear-gradient(135deg, #f97316 0%, #0ea5e9 100%);
    box-shadow: 0 4px 14px rgba(249,115,22,0.28), 0 0 0 4px #fff;
    transition: box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .prs-card:hover .prs-avatar-wrap {
    box-shadow: 0 8px 24px rgba(249,115,22,0.4), 0 0 0 4px #fff;
    transform: scale(1.07);
  }
  .prs-avatar-inner {
    width: 100%; height: 100%;
    border-radius: 50%; overflow: hidden;
    background: #dde5f0; border: 3px solid #fff;
  }
  .prs-avatar-inner img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
    display: block; transition: transform 0.45s ease;
  }
  .prs-card:hover .prs-avatar-inner img { transform: scale(1.1); }

  .prs-card-body {
    padding: 0 18px 22px;
    display: flex; flex-direction: column; align-items: center;
    gap: 0; width: 100%; box-sizing: border-box;
  }
  .prs-name {
    font-family: 'Syne', 'Montserrat', sans-serif;
    font-size: 0.97rem; font-weight: 700;
    color: #0a2342; margin: 0 0 10px; letter-spacing: 0.01em;
  }

  .prs-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 999px;
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.04em;
    transition: all 0.3s ease; border: 1.5px solid;
  }
  .prs-badge-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  .prs-divider {
    width: 40px; height: 1px;
    background: rgba(10,35,66,0.1); margin: 14px auto;
    transition: width 0.3s ease, background 0.3s ease;
  }
  .prs-card:hover .prs-divider { width: 60px; background: rgba(249,115,22,0.4); }

  .prs-verified {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.63rem; font-weight: 700;
    letter-spacing: 1.2px; text-transform: uppercase; color: #0ea5e9;
  }

  .prs-controls {
    display: flex; align-items: center; justify-content: space-between;
    width: 90%; margin: 36px auto 0; padding: 0 4px;
  }
  .prs-dots { display: flex; align-items: center; gap: 5px; }
  .prs-dot {
    height: 4px; border-radius: 999px;
    background: rgba(10,35,66,0.14);
    cursor: pointer; border: none; padding: 0;
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease;
    width: 20px;
  }
  .prs-dot.active { width: 44px; background: #f97316; }
  .prs-dot:hover:not(.active) { background: rgba(10,35,66,0.3); }

  .prs-arrows { display: flex; gap: 10px; }
  .prs-arrow {
    width: 46px; height: 46px; border-radius: 50%;
    border: 1.5px solid rgba(10,35,66,0.14);
    background: #fff; color: #0a2342;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition:
      background    0.28s ease,
      border-color  0.28s ease,
      color         0.28s ease,
      transform     0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow    0.28s ease;
    box-shadow: 0 2px 8px rgba(10,35,66,0.07);
    outline: none;
  }
  .prs-arrow:hover {
    background: #0a2342; border-color: #0a2342; color: #fff;
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(10,35,66,0.22);
  }
  .prs-arrow:active { transform: scale(0.95); }
  .prs-arrow svg { pointer-events: none; }

  .prs-slide-count {
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem; font-weight: 700;
    color: rgba(10,35,66,0.35); letter-spacing: 1px;
    min-width: 60px; text-align: center;
  }
  .prs-slide-count strong { color: #0a2342; font-size: 0.9rem; }

  @media (max-width: 900px) { .prs-counter { display: none; } }
  @media (max-width: 768px) {
    .prs-section { padding: 64px 0 80px; }
    .prs-card { min-width: 220px; }
    .prs-card-head { height: 80px; }
    .prs-avatar-wrap { width: 76px; height: 76px; margin-top: -38px; }
    .prs-header h2 { font-size: 1.8rem; }
  }
  @media (max-width: 480px) {
    .prs-card { min-width: 200px; }
    .prs-avatar-wrap { width: 68px; height: 68px; margin-top: -34px; }
    .prs-header h2 { font-size: 1.55rem; }
  }
`;

export default function PassResultsSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnim, setIsAnim] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const trackRef = useRef(null);

  const total = reviewsData.length;
  const maxIndex = total - VISIBLE;

  const goTo = useCallback((idx) => {
    if (isAnim) return;
    setIsAnim(true);
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    setTimeout(() => setIsAnim(false), 520);
  }, [isAnim, maxIndex]);

  const next = useCallback(() => goTo(current >= maxIndex ? 0 : current + 1), [current, maxIndex, goTo]);
  const prev = useCallback(() => goTo(current <= 0 ? maxIndex : current - 1), [current, maxIndex, goTo]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, AUTO_SLIDE);
    return () => clearInterval(t);
  }, [isPaused, next]);

  // Translate track
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${current * CARD_WIDTH}px)`;
    }
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // Pointer drag
  const onPointerDown = (e) => setDragStart(e.clientX);
  const onPointerUp = (e) => {
    if (dragStart === null) return;
    const delta = dragStart - e.clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    setDragStart(null);
  };

  const DOT_COUNT = Math.min(total, 8);

  return (
    <>
      {/* ✅ dangerouslySetInnerHTML prevents the server/client encoding mismatch */}
      <style dangerouslySetInnerHTML={{ __html: PRS_CSS }} />

      <section
        className="prs-section"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="prs-inner">

          {/* Header */}
          <div className="prs-header">
            <div className="prs-header-left">
              <div className="prs-tag">
                <span className="prs-tag-dot" />
                Our Alumni
              </div>
              <h2>
                Boasting <em>Outstanding</em><br />Pass Results
              </h2>
            </div>
            <div className="prs-counter">
              <div className="prs-counter-num">
                <span>10000+</span>
              </div>
              <div className="prs-counter-label">Certified Pilots</div>
            </div>
          </div>

          {/* Slider */}
          <div
            className="prs-viewport"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={() => setDragStart(null)}
          >
            <div className="prs-track" ref={trackRef}>
              {reviewsData.map((pilot) => {
                const colors = AIRLINE_COLORS[pilot.airline] ?? {
                  bg: 'rgba(10,35,66,0.07)', border: 'rgba(10,35,66,0.18)',
                  dot: '#0a2342', text: '#0a2342',
                };
                return (
                  <div key={pilot.id} className="prs-card">
                    <div className="prs-card-head">
                      <span className="prs-plane-mark">✈</span>
                      <span className="prs-card-id">#{String(pilot.id).padStart(3, '0')}</span>
                    </div>

                    <div className="prs-avatar-wrap">
                      <div className="prs-avatar-inner">
                        <img src={pilot.imageSrc} alt={pilot.name} loading="lazy" />
                      </div>
                    </div>

                    <div className="prs-card-body">
                      <h3 className="prs-name">{pilot.name}</h3>

                      <span
                        className="prs-badge"
                        style={{
                          background: colors.bg,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      >
                        <span className="prs-badge-dot" style={{ background: colors.dot }} />
                        {pilot.airline}
                      </span>

                      <div className="prs-divider" />

                      <div className="prs-verified">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            stroke="#0ea5e9" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"
                          />
                        </svg>
                        Certified
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="prs-controls">
            <div className="prs-dots">
              {Array.from({ length: DOT_COUNT }).map((_, i) => {
                const step = Math.max(1, Math.floor(maxIndex / (DOT_COUNT - 1)));
                const target = i === DOT_COUNT - 1 ? maxIndex : i * step;
                const isActive =
                  i === DOT_COUNT - 1
                    ? current === maxIndex
                    : current >= target && current < target + step;
                return (
                  <button
                    key={i}
                    className={`prs-dot${isActive ? ' active' : ''}`}
                    onClick={() => goTo(target)}
                    aria-label={`Go to slide group ${i + 1}`}
                  />
                );
              })}
            </div>

            <div className="prs-slide-count">
              <strong>{String(current + 1).padStart(2, '0')}</strong>
              {' / '}
              {String(maxIndex + 1).padStart(2, '0')}
            </div>

            <div className="prs-arrows">
              <button className="prs-arrow" onClick={prev} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="prs-arrow" onClick={next} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}