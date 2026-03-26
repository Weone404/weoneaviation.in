'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const alumniData = [
  { id: 1, name: 'Capt. Akshay', imageSrc: '/assets/pilot1.webp', airline: 'Air India' },
  { id: 2, name: 'Capt. Aben Abraham', imageSrc: '/assets/pilot2.webp', airline: 'IndiGo' },
  { id: 3, name: 'Capt. Akhila', imageSrc: '/assets/pilot3.webp', airline: 'Air India Express' },
  { id: 4, name: 'Capt. Anish K.', imageSrc: '/assets/pilot4.webp', airline: 'Air India Express' },
  { id: 5, name: 'Capt. Aashish', imageSrc: '/assets/pilot5.webp', airline: 'IndiGo' },
  { id: 6, name: 'Capt. Megha', imageSrc: '/assets/pilot (6).jpg', airline: 'Air India Express' },
  { id: 7, name: 'Capt. Keshna', imageSrc: '/assets/pilot (7).jpg', airline: 'Air India' },
  { id: 8, name: 'Capt. Tanmay', imageSrc: '/assets/pilot (8).jpg', airline: 'Air India Express' },
  { id: 9, name: 'Capt. Neha', imageSrc: '/assets/pilot (9).jpg', airline: 'SpiceJet' },
  { id: 10, name: 'Capt. Esther', imageSrc: '/assets/pilot (10).jpg', airline: 'Air India' },
  { id: 11, name: 'Capt. Akshat', imageSrc: '/assets/pilot (11).jpg', airline: 'SpiceJet' },
  { id: 12, name: 'Capt. Ashik K.', imageSrc: '/assets/pilot (12).jpg', airline: 'IndiGo' },
  { id: 13, name: 'Capt. Eshan', imageSrc: '/assets/pilot (13).jpg', airline: 'IndiGo' },
  { id: 14, name: 'Capt. Namita', imageSrc: '/assets/pilot (14).webp', airline: 'SpiceJet' },
  { id: 15, name: 'Capt. Kunal', imageSrc: '/assets/pilot (15).webp', airline: 'SpiceJet' },
  { id: 16, name: 'Capt. Sahiba', imageSrc: '/assets/pilot (16).webp', airline: 'Air India Express' },
  { id: 17, name: 'Capt. Aashish Arora', imageSrc: '/assets/pilot17.webp', airline: 'IndiGo' },
  { id: 18, name: 'Capt. Ambereesh V Pillai', imageSrc: '/assets/pilot18.webp', airline: 'IndiGo' },
  { id: 19, name: 'Capt. Anish Kujur', imageSrc: '/assets/pilot19.webp', airline: 'Air India Express' },
  { id: 20, name: 'Capt. Akshay Passi', imageSrc: '/assets/pilot20.webp', airline: 'Air India Alliance' },
  { id: 21, name: 'Capt. Akshat Yadav', imageSrc: '/assets/pilot21.webp', airline: 'SpiceJet' },
  { id: 22, name: 'Capt. Akhila', imageSrc: '/assets/pilot22.webp', airline: 'IndiGo' },
  { id: 23, name: 'Capt. Aharnish Chaudhary', imageSrc: '/assets/pilot23.webp', airline: 'Air India Express' },
  { id: 24, name: 'Capt. Aditya Singh Rathore', imageSrc: '/assets/pilot24.webp', airline: 'SpiceJet' },
  { id: 25, name: 'Capt. Abhishek Dedha', imageSrc: '/assets/pilot25.webp', airline: 'IndiGo' },
  { id: 26, name: 'Capt. Aben Abraham', imageSrc: '/assets/pilot26.webp', airline: 'IndiGo' },
  { id: 27, name: 'Capt. Sahiba Dev', imageSrc: '/assets/Capt. Sahiba Dev (Air India Express).webp', airline: 'Air India Express' },
  { id: 28, name: 'Capt. Sahibjit Bhullar', imageSrc: '/assets/Capt. Sahibjit Bhullar (Indigo).webp', airline: 'IndiGo' },
  { id: 29, name: 'Capt. Samraat Kaushal', imageSrc: '/assets/Capt. Samraat Kaushal (Spice Jet).webp', airline: 'SpiceJet' },
  { id: 30, name: 'Capt. Sanil', imageSrc: '/assets/Capt. Sanil (Jet Airways).webp', airline: 'Jet Airways' },
  { id: 31, name: 'Capt. Sanjay Gopinath', imageSrc: '/assets/Capt. Sanjay Gopinath (Indigo).webp', airline: 'IndiGo' },
  { id: 32, name: 'Capt. Shoaeb Khan', imageSrc: '/assets/Capt. Shoaeb Khan (Indigo).webp', airline: 'IndiGo' },
  { id: 33, name: 'Capt. Sushant Manik', imageSrc: '/assets/Capt. Sushant Manik (Jet Airways).webp', airline: 'Jet Airways' },
  { id: 34, name: 'Capt. Syed Khalid', imageSrc: '/assets/Capt. Syed Khalid (Vistara).webp', airline: 'Vistara' },
  { id: 35, name: 'Capt. Tanmay Kapse', imageSrc: '/assets/Capt. Tanmay Kapse (Air Asia).webp', airline: 'Air Asia' },
  { id: 36, name: 'Capt. Tony Babu', imageSrc: '/assets/Capt. Tony Babu (Indigo).webp', airline: 'IndiGo' },
  { id: 37, name: 'Capt. Vishal Tare', imageSrc: '/assets/Capt. Vishal Tare (Indigo).webp', airline: 'IndiGo' },
  { id: 38, name: 'Capt. Vishnu Ravi', imageSrc: '/assets/Capt. Vishnu Ravi (Vistara).webp', airline: 'Vistara' },
  { id: 39, name: 'Capt. Karan Malhotra', imageSrc: '/assets/Capt. Karan Malhotra (Spice Jet).webp', airline: 'SpiceJet' },
  { id: 40, name: 'Capt. Karan Zaidu', imageSrc: '/assets/Capt. Karan Zaidu (Indigo).webp', airline: 'IndiGo' },
  { id: 42, name: 'Capt. Keshna', imageSrc: '/assets/Capt. Keshna (Vistara).webp', airline: 'Vistara' },
  { id: 43, name: 'Capt. Kunal Lalwani', imageSrc: '/assets/Capt. Kunal Lalwani (Spice Jet).webp', airline: 'SpiceJet' },
  { id: 44, name: 'Capt. Lavanya Krishna', imageSrc: '/assets/Capt. Lavanya Krishna (Indigo).webp', airline: 'IndiGo' },
  { id: 45, name: 'Capt. Leo Crasto', imageSrc: '/assets/Capt. Leo Crasto (Go First).webp', airline: 'Go First' },
  { id: 46, name: 'Capt. Marmik', imageSrc: '/assets/Capt. Marmik (Indigo).webp', airline: 'IndiGo' },
  { id: 47, name: 'Capt. Megha Udayshankar', imageSrc: '/assets/Capt. Megha Udayshankar (Air India).webp', airline: 'Air India' },
  { id: 48, name: 'Capt. Merson Correya', imageSrc: '/assets/Capt. Merson Correya (Vistara).webp', airline: 'Vistara' },
  { id: 49, name: 'Capt. Mithin Raj', imageSrc: '/assets/Capt. Mithin Raj (Indigo).webp', airline: 'IndiGo' },
  { id: 50, name: 'Capt. Namita Chaurasia', imageSrc: '/assets/Capt. Namita Chaurasia (Spice Jet).webp', airline: 'SpiceJet' },
  { id: 51, name: 'Capt. Navin Sabunkar', imageSrc: '/assets/Capt. Navin Sabunkar (Spice Jet).webp', airline: 'SpiceJet' },
  { id: 52, name: 'Capt. Neha Chand', imageSrc: '/assets/Capt. Neha Chand (Akasa Air).webp', airline: 'Akasa Air' },
  { id: 53, name: 'Capt. Rahul Baisla', imageSrc: '/assets/Capt. Rahul Baisla (GoAir).webp', airline: 'GoAir' },
  { id: 54, name: 'Capt. Rahul Prasad', imageSrc: '/assets/Capt. Rahul Prasad (Vistara).webp', airline: 'Vistara' },
  { id: 55, name: 'Capt. Rahul Singh', imageSrc: '/assets/Capt. Rahul Singh (Indigo).webp', airline: 'IndiGo' },
  { id: 56, name: 'Capt. Rishal Singh Rajan', imageSrc: '/assets/Capt. Rishal Singh Rajan (Vistara).webp', airline: 'Vistara' },
  { id: 57, name: 'Capt. Rutwik Tirpude', imageSrc: '/assets/Capt. Rutwik Tirpude (Spice Jet).webp', airline: 'SpiceJet' },
  { id: 58, name: 'Capt. Sachin Patil', imageSrc: '/assets/Capt. Sachin Patil (Indigo).webp', airline: 'IndiGo' },
];

const AIRLINE_PALETTE = {
  'Air India': { bg: 'rgba(180,0,50,0.09)', border: 'rgba(180,0,50,0.22)', dot: '#b40032', text: '#8b0028' },
  'IndiGo': { bg: 'rgba(11,99,214,0.10)', border: 'rgba(11,99,214,0.25)', dot: '#0b63d6', text: '#0b63d6' },
  'Air India Express': { bg: 'rgba(249,115,22,0.09)', border: 'rgba(249,115,22,0.25)', dot: '#f97316', text: '#c2560a' },
  'SpiceJet': { bg: 'rgba(220,53,30,0.09)', border: 'rgba(220,53,30,0.22)', dot: '#dc351e', text: '#b02a16' },
  'Air India Alliance': { bg: 'rgba(180,0,50,0.07)', border: 'rgba(180,0,50,0.18)', dot: '#b40032', text: '#8b0028' },
  'Jet Airways': { bg: 'rgba(230,160,0,0.09)', border: 'rgba(230,160,0,0.25)', dot: '#e6a000', text: '#a07000' },
  'Vistara': { bg: 'rgba(99,44,130,0.09)', border: 'rgba(99,44,130,0.25)', dot: '#632c82', text: '#4a1f63' },
  'Air Asia': { bg: 'rgba(220,30,30,0.09)', border: 'rgba(220,30,30,0.22)', dot: '#dc1e1e', text: '#a01010' },
  'Go First': { bg: 'rgba(0,150,100,0.09)', border: 'rgba(0,150,100,0.25)', dot: '#009664', text: '#006644' },
  'Akasa Air': { bg: 'rgba(255,140,0,0.09)', border: 'rgba(255,140,0,0.25)', dot: '#ff8c00', text: '#b36200' },
  'GoAir': { bg: 'rgba(0,120,200,0.09)', border: 'rgba(0,120,200,0.25)', dot: '#0078c8', text: '#005a96' },
};

const CARD_GAP = 24;
const CARD_WIDTH = 260 + CARD_GAP;
const VISIBLE = 4;
const AUTO_DELAY = 2000;

const CAROUSEL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .ac-section {
    font-family: 'DM Sans', sans-serif;
    background: #f0f5ff;
    padding: 96px 0 108px;
    overflow: hidden;
    position: relative;
    width: 100%;
    isolation: isolate;
  }
  .ac-section::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(11,99,214,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(11,99,214,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none; z-index: 0;
  }
  .ac-section::after {
    content: '';
    position: absolute;
    top: -100px; right: -80px;
    width: 540px; height: 540px;
    background: radial-gradient(circle, rgba(11,99,214,0.12) 0%, transparent 70%);
    pointer-events: none; z-index: 0;
  }
  .ac-inner { position: relative; z-index: 1; }

  .ac-header {
    padding: 0 5%;
    margin-bottom: 52px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
  }
  .ac-eyebrow {
    display: inline-flex; align-items: center; gap: 7px;
    background: #0b3a7a;
    color: #fff;
    padding: 5px 14px 5px 10px;
    border-radius: 999px;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 1.8px; text-transform: uppercase;
    margin-bottom: 18px;
  }
  .ac-eyebrow-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #0b63d6;
    animation: ac-pulse 2s ease-in-out infinite;
  }
  @keyframes ac-pulse {
    0%,100% { transform: scale(1);   opacity: 1;   }
    50%      { transform: scale(1.5); opacity: 0.65; }
  }
  .ac-heading {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4.5vw, 3.4rem);
    font-weight: 800; color: #0b3a7a;
    line-height: 1.1; margin: 0;
    letter-spacing: -0.02em;
  }
  .ac-heading em {
    font-style: normal;
    color: transparent;
    -webkit-text-stroke: 2px #0b63d6;
  }
  @supports not (-webkit-text-stroke: 1px) {
    .ac-heading em { color: #0b63d6; }
  }

  .ac-stat { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .ac-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 3.2rem; font-weight: 800;
    color: #0b3a7a; line-height: 1; letter-spacing: -0.04em;
  }
  .ac-stat-num span { color: #0b63d6; }
  .ac-stat-label {
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: rgba(11,58,122,0.45);
  }

  .ac-viewport {
    width: 90%; margin: 0 auto;
    overflow: hidden; position: relative; border-radius: 20px;
  }
  .ac-viewport::before, .ac-viewport::after {
    content: '';
    position: absolute; top: 0; bottom: 0;
    width: 80px; z-index: 3; pointer-events: none;
  }
  .ac-viewport::before { left:  0; background: linear-gradient(to right, #f0f5ff 0%, transparent 100%); }
  .ac-viewport::after  { right: 0; background: linear-gradient(to left,  #f0f5ff 0%, transparent 100%); }

  .ac-track {
    display: flex; gap: 24px;
    transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
    will-change: transform;
    padding: 28px 6px 36px;
    cursor: grab; user-select: none;
  }
  .ac-track:active { cursor: grabbing; }

  .ac-card {
    min-width: 260px; border-radius: 20px;
    border: 1.5px solid rgba(11,99,214,0.09);
    background: #ffffff;
    display: flex; flex-direction: column; align-items: center; text-align: center;
    position: relative; overflow: hidden;
    transition:
      transform    0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow   0.35s ease,
      border-color 0.35s ease;
    box-shadow: 0 2px 6px rgba(11,99,214,0.05), 0 8px 24px rgba(11,99,214,0.07);
  }
  .ac-card:hover {
    transform: translateY(-10px) scale(1.012);
    box-shadow:
      0 4px 12px rgba(11,99,214,0.08),
      0 20px 48px rgba(11,99,214,0.16),
      0 0 0 2px rgba(11,99,214,0.2);
    border-color: rgba(11,99,214,0.25);
  }

  .ac-card-band {
    width: 100%; height: 100px;
    background: linear-gradient(135deg, #0b3a7a 0%, #0b63d6 100%);
    position: relative; flex-shrink: 0; overflow: hidden;
  }
  .ac-card-band::before {
    content: '';
    position: absolute; inset: 0;
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px,
      transparent 1px, transparent 12px
    );
  }
  .ac-card-band::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #0b63d6 0%, #38bdf8 100%);
    opacity: 0; transition: opacity 0.35s ease;
  }
  .ac-card:hover .ac-card-band::after { opacity: 1; }

  .ac-plane-icon {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    font-size: 2rem; color: rgba(255,255,255,0.09);
    transition: color 0.35s ease, transform 0.4s ease;
    line-height: 1;
  }
  .ac-card:hover .ac-plane-icon {
    color: rgba(255,255,255,0.22);
    transform: translateY(-58%) rotate(-12deg) scale(1.15);
  }
  .ac-card-serial {
    position: absolute; left: 14px; bottom: 12px;
    font-family: 'Syne', monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 2px; color: rgba(255,255,255,0.3);
  }

  .ac-avatar-ring {
    position: relative; z-index: 2;
    width: 90px; height: 90px;
    margin-top: -45px; margin-bottom: 16px;
    flex-shrink: 0; border-radius: 50%; padding: 3px;
    background: linear-gradient(135deg, #0b63d6 0%, #38bdf8 100%);
    box-shadow: 0 4px 14px rgba(11,99,214,0.32), 0 0 0 4px #fff;
    transition: box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .ac-card:hover .ac-avatar-ring {
    box-shadow: 0 8px 24px rgba(11,99,214,0.44), 0 0 0 4px #fff;
    transform: scale(1.07);
  }
  .ac-avatar-inner {
    width: 100%; height: 100%;
    border-radius: 50%; overflow: hidden;
    background: #dde8f8; border: 3px solid #fff;
  }
  .ac-avatar-inner img {
    width: 100%; height: 100%;
    object-fit: cover; object-position: center top;
    display: block; transition: transform 0.45s ease;
  }
  .ac-card:hover .ac-avatar-inner img { transform: scale(1.1); }

  .ac-card-body {
    padding: 0 18px 22px;
    display: flex; flex-direction: column; align-items: center;
    gap: 0; width: 100%; box-sizing: border-box;
  }
  .ac-pilot-name {
    font-family: 'Syne', sans-serif;
    font-size: 0.97rem; font-weight: 700;
    color: #0b3a7a; margin: 0 0 10px; letter-spacing: 0.01em;
  }

  .ac-airline-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 12px; border-radius: 999px;
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.04em;
    border: 1.5px solid; transition: all 0.3s ease;
  }
  .ac-airline-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  .ac-rule {
    width: 40px; height: 1px;
    background: rgba(11,99,214,0.12); margin: 14px auto;
    transition: width 0.3s ease, background 0.3s ease;
  }
  .ac-card:hover .ac-rule { width: 60px; background: rgba(11,99,214,0.38); }

  .ac-verified {
    display: flex; align-items: center; gap: 5px;
    font-size: 0.63rem; font-weight: 700;
    letter-spacing: 1.2px; text-transform: uppercase; color: #0b63d6;
  }

  .ac-controls {
    display: flex; align-items: center; justify-content: space-between;
    width: 90%; margin: 36px auto 0; padding: 0 4px;
  }
  .ac-dots { display: flex; align-items: center; gap: 5px; }
  .ac-dot {
    height: 4px; border-radius: 999px;
    background: rgba(11,99,214,0.15);
    cursor: pointer; border: none; padding: 0;
    transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease;
    width: 20px;
  }
  .ac-dot.active { width: 44px; background: #0b63d6; }
  .ac-dot:hover:not(.active) { background: rgba(11,99,214,0.35); }

  .ac-arrows { display: flex; gap: 10px; }
  .ac-btn {
    width: 46px; height: 46px; border-radius: 50%;
    border: 1.5px solid rgba(11,99,214,0.18);
    background: #fff; color: #0b3a7a;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition:
      background   0.28s ease,
      border-color 0.28s ease,
      color        0.28s ease,
      transform    0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow   0.28s ease;
    box-shadow: 0 2px 8px rgba(11,99,214,0.09);
    outline: none;
  }
  .ac-btn:hover {
    background: #0b63d6; border-color: #0b63d6; color: #fff;
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(11,99,214,0.28);
  }
  .ac-btn:active { transform: scale(0.95); }
  .ac-btn svg { pointer-events: none; }

  @media (max-width: 900px) { .ac-stat { display: none; } }
  @media (max-width: 768px) {
    .ac-section { padding: 64px 0 80px; }
    .ac-card { min-width: 220px; }
    .ac-card-band { height: 80px; }
    .ac-avatar-ring { width: 76px; height: 76px; margin-top: -38px; }
    .ac-heading { font-size: 1.8rem; }
  }
  @media (max-width: 480px) {
    .ac-card { min-width: 200px; }
    .ac-avatar-ring { width: 68px; height: 68px; margin-top: -34px; }
    .ac-heading { font-size: 1.55rem; }
  }
`;

export default function AlumniCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [dragOrigin, setDragOrigin] = useState(null);
  const trackRef = useRef(null);

  const total = alumniData.length;
  const maxIndex = total - VISIBLE;

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    setTimeout(() => setAnimating(false), 300);
  }, [animating, maxIndex]);

  const advance = useCallback(() => goTo(current >= maxIndex ? 0 : current + 1), [current, maxIndex, goTo]);
  const retreat = useCallback(() => goTo(current <= 0 ? maxIndex : current - 1), [current, maxIndex, goTo]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(advance, AUTO_DELAY);
    return () => clearInterval(timer);
  }, [paused, advance]);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${current * CARD_WIDTH}px)`;
    }
  }, [current]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') retreat();
      if (e.key === 'ArrowRight') advance();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [retreat, advance]);

  const onPointerDown = (e) => setDragOrigin(e.clientX);
  const onPointerUp = (e) => {
    if (dragOrigin === null) return;
    const delta = dragOrigin - e.clientX;
    if (Math.abs(delta) > 40) delta > 0 ? advance() : retreat();
    setDragOrigin(null);
  };

  const DOT_COUNT = Math.min(total, 8);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CAROUSEL_CSS }} />

      <section
        className="ac-section"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="ac-inner">

          <div className="ac-header">
            <div>
              <div className="ac-eyebrow">
                <span className="ac-eyebrow-pulse" />
                Our Graduates
              </div>
              <h2 className="ac-heading">
                Celebrating <em>Exceptional</em><br />Success Stories
              </h2>
            </div>
            <div className="ac-stat">
              <div className="ac-stat-num"><span>10,000+</span></div>
              <div className="ac-stat-label">Licensed Aviators</div>
            </div>
          </div>

          <div
            className="ac-viewport"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={() => setDragOrigin(null)}
          >
            <div className="ac-track" ref={trackRef}>
              {alumniData.map((pilot) => {
                const palette = AIRLINE_PALETTE[pilot.airline] ?? {
                  bg: 'rgba(11,99,214,0.07)', border: 'rgba(11,99,214,0.18)',
                  dot: '#0b63d6', text: '#0b3a7a',
                };
                return (
                  <div key={pilot.id} className="ac-card">
                    <div className="ac-card-band">
                      <span className="ac-plane-icon">✈</span>
                      <span className="ac-card-serial">#{String(pilot.id).padStart(3, '0')}</span>
                    </div>

                    <div className="ac-avatar-ring">
                      <div className="ac-avatar-inner">
                        <img src={pilot.imageSrc} alt={pilot.name} loading="lazy" />
                      </div>
                    </div>

                    <div className="ac-card-body">
                      <h3 className="ac-pilot-name">{pilot.name}</h3>

                      <span
                        className="ac-airline-badge"
                        style={{
                          background: palette.bg,
                          borderColor: palette.border,
                          color: palette.text,
                        }}
                      >
                        <span className="ac-airline-dot" style={{ background: palette.dot }} />
                        {pilot.airline}
                      </span>

                      <div className="ac-rule" />

                      <div className="ac-verified">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            stroke="#0b63d6" strokeWidth="2"
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

          <div className="ac-controls">
            <div className="ac-dots">
              {Array.from({ length: DOT_COUNT }).map((_, i) => {
                const step = Math.max(1, Math.floor(maxIndex / (DOT_COUNT - 1)));
                const target = i === DOT_COUNT - 1 ? maxIndex : i * step;
                const active =
                  i === DOT_COUNT - 1
                    ? current === maxIndex
                    : current >= target && current < target + step;
                return (
                  <button
                    key={i}
                    className={`ac-dot${active ? ' active' : ''}`}
                    onClick={() => goTo(target)}
                    aria-label={`Go to slide group ${i + 1}`}
                  />
                );
              })}
            </div>

            <div className="ac-arrows">
              <button className="ac-btn" onClick={retreat} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="ac-btn" onClick={advance} aria-label="Next">
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