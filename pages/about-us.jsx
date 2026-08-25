'use client';
import { useState } from 'react';
import NextImage from 'next/image';
import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import { YEARS_LABEL } from '../data/academy';
import { LICENCES, ACADEMY, papersSummary, MEDICAL } from '../lib/facts';
import QuickAnswer from '../components/QuickAnswer';
import SummaryBox from '../components/SummaryBox';
import Breadcrumb from '../components/Breadcrumb';
import AutoInternalLinks from '../components/AutoInternalLinks';

const heroSlides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1559628233-100c798642d8?w=1920&q=80', tag: 'About We One Aviation', title: 'Aviation training built', highlight: 'around outcomes', sub: 'A grounded, practical approach to DGCA preparation and pilot career development.' },
  { id: 2, image: 'https://images.unsplash.com/photo-1585995028913-16e7a4c9c1d3?w=1920&q=80', tag: 'Our Approach', title: 'Structured learning', highlight: 'for aspiring pilots', sub: 'Guidance for theory, flying school selection, and real-world aviation readiness.' },
];

/*
 * CLAIMS GATE (Workstream C). The `exp` field previously carried unsourced
 * statistics — "25+ years, Boeing 737 rated", "18+ years, DGCA Examiner",
 * "20+ years, Airbus A320 rated". /credentials states plainly that instructor
 * licence numbers and training statistics were removed rather than restated,
 * so publishing year-counts and type ratings here contradicted the academy's
 * own verification page. One role was worse: "Simulator Instructor" implies a
 * simulator the academy does not own, which scripts/check-claims.js bans
 * outright.
 *
 * Names and roles stay — public/llms.txt already states that this page names
 * the instructor panel. The unverifiable numbers go. Supply real, evidencable
 * credentials and they can return.
 * {{TODO-BUSINESS-INPUT}} — verified experience or licence detail per instructor
 */
const team = [
  { name: 'Capt. Nitin', role: 'Chief Flying Instructor', exp: 'Leads flight-training guidance', img: 'RV' },
  { name: 'Capt. Sanskar', role: 'Aviation Medical Advisor', exp: 'DGCA-approved medical examiner', img: 'MS' },
  { name: 'Capt. Uday', role: 'Ground Training Head', exp: 'Leads the DGCA ground syllabus', img: 'AN' },
  { name: 'Capt. Pankaj', role: 'Aviation Medical Advisor', exp: 'DGCA-approved medical examiner', img: 'MS' },
  { name: 'Capt. Kamal', role: 'Ground Instructor', exp: 'Technical subjects', img: 'SK' },
  { name: 'Capt. Manoj', role: 'Aviation Medical Advisor', exp: 'DGCA-approved medical examiner', img: 'MS' },
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
        {/*
          Was an <h2>. A person's name is not a document section, and six of
          them flattened this page's heading outline into a list of captains.
          Styled to look identical; carries no heading weight.
        */}
        <p className="font-montserrat font-bold text-av-blue text-sm">{member.name}</p>
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
      <HeroSlider customSlides={heroSlides} asH1={false} />

      {/* ── Opening block. Inverted pyramid: what we are, what we are not,
             and the licence chain a student is walking into — above the fold
             of the article, before any story. ── */}
      <section className="pt-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb />
          <h1 className="font-montserrat text-3xl md:text-4xl font-black text-av-blue mb-5 underline-orange">
            About We One Aviation Academy
          </h1>

          <QuickAnswer
            question="What is We One Aviation Academy, and what does it actually do?"
            answer={`We One Aviation Academy is a DGCA-approved pilot training institute in Dwarka, New Delhi, operating since ${ACADEMY.foundedYear}. We teach the DGCA ground subjects for the written examinations behind a Commercial Pilot Licence, and we place students with partner flying schools for the flying hours.`}
          />

          <SummaryBox
            title="What we are, and what we are not"
            items={[
              `Founded ${ACADEMY.foundedYear}, operating continuously since — one of two facts our credentials page can evidence on request`,
              `Located at ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality} ${ACADEMY.postalCode}`,
              `We teach: the ${papersSummary()} written papers, plus RTR (A) preparation`,
              'We arrange: flight training with partner schools in India, the USA, Canada, Australia and South Africa',
              'We do NOT own aircraft or simulators — the flying happens at partner flying schools',
              'We do NOT employ pilots or place students into airline jobs — hiring rests with the operator',
              'What we provide instead: classroom teaching, examination preparation, licence-route planning, interview preparation and career guidance',
            ]}
          />

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What does a ground school actually do — and what does it not?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            This is the question worth settling before you pay anyone anything, because the answer decides who you talk to next. A ground school teaches theory. A flying school provides aircraft and instructors and puts hours in your logbook. The DGCA issues the licence. Three different organisations, three different jobs, and an academy that blurs them is doing you no favours.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            We are the first of those three. Our instructors teach the written papers, run mock examinations in the DGCA pattern, and sit with students until the difficult topics land. When the theory is behind you, we help you choose a flying school and prepare the application — in India or abroad, depending on your budget, your timeline and how you weigh a conversion step against a longer wait for weather.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            What we will not tell you is that we can hand you an airline job. Nobody can. Airlines run their own selection, on their own schedule, against their own criteria. We prepare you for that process and we are candid about where our part ends.
          </p>

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is the licence chain you are joining?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            Four licences, each with an age gate set by Schedule II of the Aircraft Rules, 1937. Most students arrive knowing they want to fly commercially and discover the ladder underneath it only later. Seeing it early makes the timeline honest.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-4">
            <table className="w-full text-sm">
              <caption className="sr-only">Indian pilot licence chain with minimum ages from Schedule II</caption>
              <thead>
                <tr className="bg-av-blue text-white">
                  <th scope="col" className="p-3 text-left text-xs font-semibold">Licence</th>
                  <th scope="col" className="p-3 text-left text-xs font-semibold">Minimum age</th>
                  <th scope="col" className="p-3 text-left text-xs font-semibold">What it permits</th>
                </tr>
              </thead>
              <tbody>
                {LICENCES.map((l, i) => (
                  <tr key={l.code} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left whitespace-nowrap">{l.code} &mdash; {l.name}</th>
                    <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">{l.minAge} years <span className="text-gray-400 font-normal">({l.section})</span></td>
                    <td className="p-3 text-gray-600 text-xs">{l.permits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-xs mb-8">
            Ages are set by the Aircraft Rules, 1937, continued in force by section 43(2) of the Bharatiya Vayuyan Adhiniyam, 2024.
          </p>

          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">How do we teach?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Instructor-led sessions rather than recorded playlists, in both classroom and online modes. Every session leaves room for questions, because aviation theory rewards the student who asks why a rule exists over the one who memorises it. Mock examinations run in the DGCA pattern and under time pressure, which is the only way to find out whether you actually know a subject or merely recognise it.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Progress is tracked between mocks. That matters more than it sounds: it is what tells a student in week four that Air Navigation needs more time, while there is still time to give it. A student who discovers the same thing the week before the paper has run out of options.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Before any of it, book the {MEDICAL.short}. {MEDICAL.advice}
          </p>
        </div>
      </section>

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