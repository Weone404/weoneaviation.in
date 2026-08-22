'use client';
import { useState } from 'react';
import NextImage from 'next/image';
import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import { YEARS_LABEL } from '../data/academy';
import AutoInternalLinks from '../components/AutoInternalLinks';

const heroSlides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=1920&q=80', tag: 'About We One Aviation', title: 'Aviation training built', highlight: 'around outcomes', sub: 'A grounded, practical approach to DGCA preparation and pilot career development.' },
  { id: 2, image: 'https://images.unsplash.com/photo-1585995028913-16e7a4c9c1d3?w=1920&q=80', tag: 'Our Approach', title: 'Structured learning', highlight: 'for aspiring pilots', sub: 'Guidance for theory, flying school selection, and real-world aviation readiness.' },
];

const team = [
  { name: 'Capt. Nitin', role: 'Chief Flying Instructor', exp: '25+ years, Boeing 737 rated', img: 'RV' },
  { name: 'Capt. Sanskar', role: 'Aviation Medical Advisor', exp: 'DGCA AME, 15+ years', img: 'MS' },
  { name: 'Capt. Uday', role: 'Ground Training Head', exp: '18+ years, DGCA Examiner', img: 'AN' },
  { name: 'Capt. Pankaj', role: 'Aviation Medical Advisor', exp: 'DGCA AME, 15+ years', img: 'MS' },
  { name: 'Capt. Kamal', role: 'Simulator Instructor', exp: '20+ years, Airbus A320 rated', img: 'SK' },
  { name: 'Capt. Manoj', role: 'Aviation Medical Advisor', exp: 'DGCA AME, 15+ years', img: 'MS' },
];

function MemberCard({ member, active }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-md border text-center transition-all duration-300 ${active ? 'border-av-orange shadow-lg' : 'border-gray-100'}`}>
      <div className="h-28 bg-gradient-to-br from-av-blue to-av-navy flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-av-orange flex items-center justify-center text-white text-lg font-bold font-montserrat">
          {member.img}
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-montserrat font-bold text-av-blue text-sm">{member.name}</h2>
        <div className="text-av-orange text-xs font-semibold mt-1">{member.role}</div>
        <div className="text-gray-400 text-xs mt-2">{member.exp}</div>
      </div>
    </div>
  );
}

export default function About() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((p) => (p - 1 + team.length) % team.length);
  const next = () => setCurrent((p) => (p + 1) % team.length);
  const getIndex = (offset) => (current + offset + team.length) % team.length;

  return (
    <Layout
      title="About We One Aviation Academy | DGCA Approved Pilot Training Institute"
      description={`We One Aviation Academy is a DGCA-approved pilot training institute in Dwarka, New Delhi, operating for ${YEARS_LABEL} years.`}
    >
      <HeroSlider customSlides={heroSlides} />

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <NextImage
              src="https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80"
              alt="Aviation Academy"
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl shadow-2xl w-full h-72 object-cover"
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="section-tag">Our Story</div>
            <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
              Practical pilot training support since 2009
            </h2>
            <AutoInternalLinks currentPath="/about-us">
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                We One Aviation Academy began with a clear goal: help students understand the path to becoming a pilot with practical guidance, DGCA-focused coaching, and honest career support. Over the years, we have supported students from across India as they prepare for ground exams, medical checks, and flying-school decisions.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Our work is designed around aviation fundamentals, student mentoring, and clear preparation for each stage of a pilot career. We support students through DGCA ground classes, route planning, and training choices in India and abroad.
              </p>
            </AutoInternalLinks>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[[YEARS_LABEL, 'Years in Operation'], ['DGCA', 'Approved']].map(([num, label]) => (
                <div key={label} className="text-center p-4 bg-av-light rounded-xl">
                  <div className="font-montserrat text-xl font-black text-av-orange">{num}</div>
                  <div className="text-av-blue text-xs font-medium">{label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: '🎯', title: 'Our Mission', text: 'To guide students through the aviation training journey with structured coaching, practical advice, and support at every stage of preparation.' },
            { icon: '🔭', title: 'Our Vision', text: 'To help more Indian students make informed, realistic choices about pilot training, licensing, and long-term career planning.' },
            { icon: '💎', title: 'Our Values', text: 'Clarity, discipline, and safety-focused learning. We believe good aviation education starts with honest guidance and consistent preparation.' },
          ].map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center card-hover">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-montserrat font-bold text-av-blue mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team Slider */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <div className="section-tag">Our Experts</div>
            <h2 className="font-montserrat text-3xl font-bold text-av-blue">
              Meet Our <span className="text-av-orange">Expert Instructors</span>
            </h2>
          </ScrollReveal>

          {/* Slider */}
          <div className="flex items-center justify-center gap-6">

            {/* Prev Button */}
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-av-blue text-white flex items-center justify-center hover:bg-av-orange transition-all flex-shrink-0 text-lg"
            >
              ‹
            </button>

            {/* Cards */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Left faded card */}
              <div className="hidden sm:block opacity-40 scale-90 transition-all duration-300 w-44">
                <MemberCard member={team[getIndex(-1)]} />
              </div>

              {/* Active center card */}
              <div className="scale-100 transition-all duration-300 w-52">
                <MemberCard member={team[getIndex(0)]} active />
              </div>

              {/* Right faded card */}
              <div className="hidden sm:block opacity-40 scale-90 transition-all duration-300 w-44">
                <MemberCard member={team[getIndex(1)]} />
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-av-blue text-white flex items-center justify-center hover:bg-av-orange transition-all flex-shrink-0 text-lg"
            >
              ›
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {team.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-av-orange' : 'w-2 bg-gray-300'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-16 px-4 bg-av-blue">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal>
            <div className="section-tag">Recognitions</div>
            <h2 className="font-montserrat text-3xl font-bold text-white mb-10">
              Approvals & Accreditations
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['DGCA Approved'].map(item => (
                <div key={item} className="glass rounded-full px-5 py-2.5 text-white text-sm font-medium border border-white/20">
                  ✓ {item}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <LeadForm title="Talk to Our Aviation Experts" />
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}