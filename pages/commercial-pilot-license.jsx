import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import AutoInternalLinks from "../components/AutoInternalLinks";
import QuickAnswer from "../components/QuickAnswer";
import ArticleTOC from "../components/ArticleTOC";
import PeopleAlsoAsk from "../components/PeopleAlsoAsk";
import AuthorCard from "../components/AuthorCard";
import RelatedArticles from "../components/RelatedArticles";
import SummaryBox from "../components/SummaryBox";
import StructuredData from "../components/StructuredData";
import Breadcrumb from "../components/Breadcrumb";
import { generateFAQSchema } from "../lib/schema";

const LAST_UPDATED_ISO = '2026-08-19';

const cplCourseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Commercial Pilot License (CPL) in India',
  description: 'Complete guide to Commercial Pilot License training in India, including eligibility, DGCA process, and pilot career pathways.',
  url: 'https://weoneaviation.in/commercial-pilot-license',
  provider: {
    '@type': 'EducationalOrganization',
    name: 'We One Aviation Academy',
    url: 'https://weoneaviation.in',
  },
  inLanguage: 'en-IN',
  dateModified: LAST_UPDATED_ISO,
  courseMode: 'Blended',
  /*
   * Was "DGCA Medical". The Class 1 / Class 2 split is on the
   * unsourced list in scripts/check-claims.js — the standard sits in a DGCA
   * medical CAR that could not be retrieved from any government source. What
   * Schedule II, Section J, paragraph 1(c) actually requires is a certificate
   * of physical fitness from an approved Medical Board, so that is what this
   * says. Restore the class number when, and only when, it is sourced.
   */
  coursePrerequisites: 'Minimum age 18, Class 10+2 with Physics and Mathematics, a DGCA medical certificate, and English proficiency (Aircraft Rules, 1937, Schedule II, Section J).',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: 3800000,
    highPrice: 4800000,
    priceCurrency: 'INR',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Duration Range', value: '18-24 months' },
    { '@type': 'PropertyValue', name: 'Minimum Flying Hours', value: '200 hours' },
  ],
};

const processSteps = [
  {
    phase: "Step 1 – Check Eligibility",
    desc: "Understand the pilot career path, course options, eligibility, estimated costs, and training roadmap.",
  },
  {
    phase: "Step 2 – Complete Medical Requirements",
    desc: "Complete the required DGCA medical assessment before beginning professional pilot training.",
  },
  {
    phase: "Step 3 – Complete Ground Training",
    desc: "Join expert DGCA Ground Classes covering subjects such as:",
    topics: ["Air Navigation", "Aviation Meteorology", "Air Regulations", "Technical General", "Technical Specific", "RTR preparation"],
    note: "Strong theoretical knowledge builds the foundation for safe and successful flight training.",
  },
  {
    phase: "Step 4 – Clear DGCA Examinations",
    desc: "Students appear for DGCA examinations after completing their ground training. Passing these exams is an important milestone toward obtaining a Commercial Pilot License.",
  },
  {
    phase: "Step 5 – Choose a Flying School",
    desc: "After clearing the required examinations, students join a DGCA Flying School to begin practical flying training.",
  },
  {
    phase: "Step 6 – Complete Flight Training",
    desc: "To become eligible for a Commercial Pilot License, candidates must complete at least 200 flying hours under DGCA regulations. These hours include cross-country flying, instrument flying, solo flying, and practical flight exercises designed to develop professional piloting skills.",
  },
  {
    phase: "Step 7 – Complete CPL Licensing Requirements",
    desc: "Finish the remaining documentation, skill checks, and regulatory steps before the CPL is issued.",
  },
];

const eligibilityItems = [
  {
    label: "Educational Qualification",
    desc: "Candidates should have completed 10+2 with Physics and Mathematics from a recognized board. Students from other streams may qualify by completing the required subjects through approved educational pathways, subject to applicable DGCA regulations.",
  },
  {
    label: "Age Requirement",
    desc: "Students can begin planning their pilot career after completing Class 12. The minimum age for obtaining a Commercial Pilot License is determined by DGCA licensing requirements.",
  },
  {
    label: "Medical Requirements",
    desc: "Every aspiring pilot must successfully complete DGCA medical examinations. Good physical and mental fitness are essential for safe flight operations.",
  },
  {
    label: "English Language Proficiency",
    desc: "English is the international language of aviation. Good communication skills help pilots understand aviation procedures, communicate with Air Traffic Control, and operate safely.",
  },
  {
    label: "DGCA Examinations",
    desc: "The DGCA ground-school route includes written examinations covering air regulations, meteorology, navigation, and technical subjects before the flight-training stage is completed.",
  },
  {
    label: "Flight Training Requirements",
    desc: "To qualify for CPL issuance, candidates must meet the applicable flight-time requirements, complete the required practical training, and demonstrate competency in line with DGCA standards.",
  },
];

const whyChooseCourseList = [
  "Professional DGCA guidance",
  "Expert ground classes",
  "Practical flying experience",
  "Airline-focused training",
  "Career counselling and mentorship",
  "Support throughout the Commercial Pilot License process",
];

const pilotTrainingIndiaList = [
  "Commercial Pilot Training",
  "Commercial Pilot Course",
  "DGCA Ground Classes",
  "Flying School Selection",
  "DGCA Medical",
  "Computer Number Registration",
  "Flight Training Planning",
  "Documentation Support",
];

const whatMakesUsDifferent = [
  "Experienced aviation counsellors",
  "Comprehensive Commercial Pilot Training guidance",
  "Expert DGCA Ground Classes",
  "Assistance with DGCA Medical and Computer Number",
  "Support for Flying School admissions in India and abroad",
  "Personalized career counselling",
  "End-to-end assistance until your Commercial Pilot License is achieved",
];

const cplJourneyList = [
  "Career Counselling",
  "DGCA Medical",
  "Computer Number Registration",
  "DGCA Ground Classes",
  "DGCA Examinations",
  "Flying School Training",
  "200 Flying Hours",
  "Commercial Pilot License Issuance",
];

const feeConsiderations = [
  "DGCA Medical",
  "Examination Fees",
  "Flying Training",
  "Uniform & Study Material",
  "Accommodation (if applicable)",
  "License & Documentation Charges",
];

const flyingExperienceList = [
  "Dual Flying",
  "Solo Flying",
  "Cross-Country Flying",
  "Instrument Flying",
  "Night Flying",
  "Emergency Procedures",
  "Aircraft Handling",
  "Radio Communication",
];

const careerOptionsList = [
  "Commercial Pilot",
  "Airline First Officer",
  "Airline Captain",
  "Charter Pilot",
  "Cargo Pilot",
  "Corporate Pilot",
  "Flight Instructor",
  "Ferry Pilot",
  "Aviation Safety Officer",
];

const salaryTable = [
  { position: "Junior First Officer / Trainee Pilot", salary: "₹1.5 Lakhs – ₹2.5 Lakhs" },
  { position: "Senior First Officer", salary: "₹2.5 Lakhs – ₹4.5 Lakhs" },
  { position: "Captain / Commander", salary: "₹6.0 Lakhs – ₹9.0+ Lakhs" },
];

const ourServicesList = [
  "Career Counselling",
  "Commercial Pilot Course Guidance",
  "Commercial Pilot Training Support",
  "Flying School Selection",
  "DGCA Ground Classes",
  "DGCA Medical Assistance",
  "Computer Number Registration",
  "Admission Guidance",
  "Documentation Support",
  "Career Planning",
];

const faqs = [
  {
    q: "Can I apply for a Commercial Pilot License without studying Physics and Mathematics in 10+2?",
    a: "Candidates are generally expected to have Physics and Mathematics at the 10+2 level. Students who did not study these subjects may need to complete them through an accepted route such as NIOS before meeting the applicable DGCA requirements.",
  },
  {
    q: "What is the maximum age limit to get a Commercial Pilot License in India?",
    a: "The DGCA licensing requirements set the minimum age for CPL application at 18. Airline recruitment and command progression are separate matters and can depend on employer policies, type ratings, and experience.",
  },
  {
    q: "Do I need to complete a Type Rating after getting my CPL?",
    a: "A CPL does not by itself qualify a pilot to operate every aircraft type. A Type Rating is typically required for certain aircraft or airline operations, and additional employer and aircraft-specific requirements may apply.",
  },
  {
    q: "How long does a commercial pilot course take?",
    a: "A commercial pilot course generally takes 18–24 months, depending on the flying school, weather conditions, aircraft availability, and the student's training progress.",
  },
  {
    q: "How many flying hours are required for a Commercial Pilot License?",
    a: "According to DGCA requirements, candidates must complete 200 flying hours to obtain a Commercial Pilot License.",
  },
  {
    q: "Can I join pilot training after 12th?",
    a: "Yes. Students who have completed 10+2 with Physics and Mathematics can begin their journey toward becoming a commercial pilot after meeting the required DGCA eligibility criteria.",
  },
];

const relatedPrograms = [
  "Pilot Training",
  "DGCA Ground Classes",
  "DGCA Medical",
  "DGCA Computer Number",
  "eGCA Registration",
  "Type Rating",
  "Pilot Training in Delhi",
  "Pilot Training in India",
  "Commercial Pilot Course",
  "Flight Training",
];

const quickFacts = [
  { val: "18–24 months", label: "Course Duration" },
  { val: "200 hours", label: "Min Flying Hours" },
  { val: "10+2 PCM", label: "Eligibility" },
  { val: "Required", label: "DGCA Medical" },
];

const tocHeadings = [
  { id: 'what-is-a-commercial-pilot-license', title: 'What Is a Commercial Pilot License?' },
  { id: 'how-to-become-a-commercial-pilot-in-india', title: 'How to Become a Commercial Pilot in India' },
  { id: 'commercial-pilot-license-eligibility-in-india', title: 'Commercial Pilot License Eligibility in India' },
  { id: 'what-does-cpl-training-include', title: 'What Does CPL Training Include?' },
  { id: 'commercial-pilot-training-in-india', title: 'Commercial Pilot Training in India' },
  { id: 'commercial-pilot-training-in-delhi', title: 'Commercial Pilot Training in Delhi' },
  { id: 'why-choose-we-one-aviation-for-your-commercial-pilot-license', title: 'Why Choose We One Aviation for Your Commercial Pilot License?' },
  { id: 'how-long-does-cpl-training-take', title: 'How Long Does CPL Training Take?' },
  { id: 'commercial-pilot-license-cpl-fees-structure', title: 'Commercial Pilot License (CPL) Fees Structure' },
  { id: 'how-many-flying-hours-are-required-for-a-cpl', title: 'How Many Flying Hours Are Required for a CPL?' },
  { id: 'how-do-you-complete-the-required-flying-hours', title: 'How Do You Complete the Required Flying Hours?' },
  { id: 'commercial-pilot-career-pathway-and-progression', title: 'Commercial Pilot Career Pathway & Progression' },
  { id: 'commercial-pilot-license-salary-expectations-in-india', title: 'Commercial Pilot License Salary Expectations in India' },
  { id: 'frequently-asked-questions', title: 'Frequently Asked Questions' },
  { id: 'related-pilot-training-programs', title: 'Related Pilot Training Programs' },
  { id: 'start-your-commercial-pilot-journey-today', title: 'Start Your Commercial Pilot Journey Today' },
];

const faqSchema = generateFAQSchema(faqs.slice(0, 3));

const peopleAlsoAsk = [
  {
    q: 'Can I apply for a CPL before I turn 18?',
    a: 'You can train, sit the DGCA papers and log flying hours at 17. You cannot hold the licence: paragraph 1(a) of Section J requires you to be 18 on the date of application. Most students use that year to clear the theory so the paperwork is ready the week they qualify.',
  },
  {
    q: 'What if I did not take Mathematics in Class 12?',
    a: 'Paragraph 1(b) asks for Physics and Mathematics at 10+2 level. Students from a Biology or Commerce stream clear both as private candidates through NIOS and then apply. It costs time rather than eligibility, so start it early.',
  },
  {
    q: 'Do hours flown outside India count towards the 200?',
    a: 'Yes. Section J counts total time as pilot of an aeroplane wherever it was logged, so training in the USA, Canada or Australia counts in full. The DGCA converts the foreign licence once the Indian papers are cleared.',
  },
  {
    q: 'How long do my flying hours stay valid?',
    a: 'Paragraph 1(e) requires the 200 hours to fall inside the five years immediately preceding your application. Hours older than that stop counting, so a long gap between finishing the flying and filing the paperwork is expensive.',
  },
  {
    q: 'Does the DGCA accept a CPL issued by another country?',
    a: 'Not directly. A foreign licence goes through DGCA conversion, which means Indian written papers and a medical to Indian standards. Plan for the conversion in your timeline rather than treating the foreign licence as the finish line.',
  },
];

const LAST_UPDATED = 'August 19, 2026';

export default function CPL() {
  const [openPhase, setOpenPhase] = useState(null);

  return (
    <>
      <Head>
        <title>Commercial Pilot License (CPL) Course in India | We One Aviation</title>
        {/*
          One Course node for this route. It previously shipped three: this
          inline generateCourseSchema call, a second `courseSchema` rendered
          from a nested <Head> further down, and `cplCourseSchema` at the top
          of the file which was declared and never rendered at all. Three
          descriptions of one course is one course an engine cannot resolve.
          cplCourseSchema is now the single node and carries the union.
        */}
        <StructuredData data={[cplCourseSchema, faqSchema]} />
      </Head>

      <Layout title="Commercial Pilot License (CPL) Course in India | We One Aviation" description="Complete guide to CPL training, eligibility, fees, and pilot career paths with We One Aviation Academy.">
        <div className="bg-gray-50 min-h-screen">

        {/* ── HEADER ── */}
        <header className="bg-gradient-to-br from-av-blue to-av-navy text-white text-center relative overflow-hidden"
          style={{ paddingTop: "144px", paddingBottom: "30px" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full border-2 border-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full border-2 border-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="section-tag mb-3">Complete Guide</div>
            <Breadcrumb />
            <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Commercial Pilot License (CPL) in India
            </h1>
          </div>
        </header>

        <section className="bg-white py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-gray-600 leading-relaxed mb-6 text-base">
              A Commercial Pilot Licence (Aeroplanes) in India requires a minimum age of 18, Class 10+2 with Physics and Mathematics, and not less than 200 hours of flight time completed within the preceding five years. The requirements are set by the Aircraft Rules, 1937, Schedule II, Section J.
            </p>
            <p className="text-gray-500 text-xs mb-0">{`Last updated: ${LAST_UPDATED}`}</p>
          </div>
        </section>

        {/* ── QUICK FACTS STRIP ── */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <ArticleTOC headings={tocHeadings} />
          </div>
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
            {quickFacts.map((f, i) => (
              <div key={i} className={`py-5 text-center ${i < quickFacts.length - 1 ? "border-r border-gray-100" : ""}`}>
                <div className="font-montserrat font-black text-lg text-av-blue">{f.val}</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHAT IS CPL ── */}
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Quick Answer</div>
            <h2 id="what-is-a-commercial-pilot-license" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">What Is a Commercial Pilot License?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 leading-relaxed text-sm">
                A Commercial Pilot License (CPL) is the professional licence required for commercial aeroplane operations in India. It is awarded after the candidate completes the applicable DGCA ground training, passes the required examinations, meets the medical requirements, and finishes the required minimum flying experience.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── HOW TO BECOME A COMMERCIAL PILOT IN INDIA ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Career Path</div>
            <h2 id="how-to-become-a-commercial-pilot-in-india" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">How to Become a Commercial Pilot in India</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">A Commercial Pilot License pathway generally involves meeting the eligibility criteria, completing the required medical and academic requirements, preparing for DGCA examinations, and building the specified flight experience through a recognized flying school.</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {processSteps.map((step, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm p-4">
                  <h3 className="font-montserrat font-bold text-av-blue text-sm mb-2">{step.phase}</h3>
                  <div className="text-gray-600 text-sm leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ELIGIBILITY ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Eligibility</div>
            <h2 id="commercial-pilot-license-eligibility-in-india" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License Eligibility in India</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">To enroll in a Commercial Pilot License course in India and progress toward CPL issuance, candidates must satisfy applicable DGCA requirements relating to education, age, medical fitness, language proficiency, examinations, and flight training.</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">Educational Qualification</h3>
                  <div className="text-gray-500 text-xs leading-relaxed">Candidates should have completed 10+2 with Physics and Mathematics from a recognized board. Students from other streams may qualify by completing the required subjects through approved educational pathways, subject to applicable DGCA regulations.</div>
                </div>
              </div>
              <div className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">Age Requirement</h3>
                  <div className="text-gray-500 text-xs leading-relaxed">Students can begin planning their pilot career after completing Class 12. The minimum age for obtaining a Commercial Pilot License is determined by DGCA licensing requirements.</div>
                </div>
              </div>
              <div className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">Medical Requirements</h3>
                  <div className="text-gray-500 text-xs leading-relaxed">Every aspiring pilot must successfully complete DGCA medical examinations. Good physical and mental fitness are essential for safe flight operations.</div>
                </div>
              </div>
              <div className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">English Language Proficiency</h3>
                  <div className="text-gray-500 text-xs leading-relaxed">English is the international language of aviation. Good communication skills help pilots understand aviation procedures, communicate with Air Traffic Control, and operate safely.</div>
                </div>
              </div>
              <div className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">DGCA Examinations</h3>
                  <div className="text-gray-500 text-xs leading-relaxed">The DGCA ground-school route includes written examinations covering air regulations, meteorology, navigation, and technical subjects before the flight-training stage is completed.</div>
                </div>
              </div>
              <div className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">Flight Training Requirements</h3>
                  <div className="text-gray-500 text-xs leading-relaxed">To qualify for CPL issuance, candidates must meet the applicable flight-time requirements, complete the required practical training, and demonstrate competency in line with DGCA standards.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT DOES CPL TRAINING INCLUDE ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Process</div>
            <h2 id="what-does-cpl-training-include" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">What Does CPL Training Include?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                A CPL pathway includes classroom grounding, medical and regulatory preparation, flight training, and the required examination and licensing milestones. The exact sequence may vary by training school and individual's pace.
              </p>
            </AutoInternalLinks>
            <div className="space-y-3">
              {processSteps.map((step, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <button
                    onClick={() => setOpenPhase(openPhase === i ? null : i)}
                    className="w-full bg-av-blue text-white px-6 py-4 flex justify-between items-center hover:bg-av-navy transition-all"
                  >
                    <span className="font-montserrat font-bold text-sm">{step.phase}</span>
                    <span className="text-white/60 text-sm">{openPhase === i ? "▲" : "▼"}</span>
                  </button>
                  {openPhase === i && (
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.desc}</p>
                      {step.topics && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                          {step.topics.map((t, j) => (
                            <div key={j} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-av-orange mt-0.5">▸</span> {t}
                            </div>
                          ))}
                        </div>
                      )}
                      {step.note && <p className="text-gray-600 text-sm leading-relaxed">{step.note}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PILOT TRAINING IN INDIA ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Training in India</div>
            <h2 id="commercial-pilot-training-in-india" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Training in India</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Commercial pilot training in India combines ground-school study, flight instruction, and regulatory progression. Students typically work through academic preparation, medical compliance, DGCA examinations, and the required flying-hours milestones before licensing.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Students often need guidance in:</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {pilotTrainingIndiaList.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PILOT TRAINING IN DELHI ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Training in Delhi</div>
            <h2 id="commercial-pilot-training-in-delhi" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Training in Delhi</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Students searching for pilot training in Delhi can benefit from structured counselling and guidance on flying-school selection, DGCA procedures, documentation, medical requirements, and long-term course planning.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether the training is planned in India or abroad, students should compare school options, aircraft availability, training schedules, and regulatory requirements before enrolling.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── WHY CHOOSE WE ONE AVIATION ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Why We One Aviation</div>
            <h2 id="why-choose-we-one-aviation-for-your-commercial-pilot-license" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Why Choose We One Aviation for Your Commercial Pilot License?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Navigating aviation training requires structured guidance, regulatory awareness, and support throughout the training process. We One Aviation provides guidance and training support for students pursuing a Commercial Pilot License.
              </p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-montserrat font-bold text-av-blue mb-2">DGCA Exam Ground Preparation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Focused preparation for subjects such as Air Navigation, Aviation Meteorology, Air Regulations, and Technical subjects, along with examination-oriented practice.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-montserrat font-bold text-av-blue mb-2">Medical &amp; Computer Number Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Guidance for DGCA Computer Number processes, Class 1 and Class 2 medical requirements, and NIOS-related academic requirements where applicable.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-montserrat font-bold text-av-blue mb-2">Flight Training Guidance</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Support in understanding flying-school options, flight-training requirements, aircraft training, and the process of completing the required flying hours.</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4">
                <h3 className="font-montserrat font-bold text-av-blue mb-2">Career &amp; Airline Preparation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Guidance related to Type Rating options, airline entrance preparation, simulator assessments, and other career-preparation requirements.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── COURSE DURATION ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Duration</div>
            <h2 id="how-long-does-cpl-training-take" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">How Long Does CPL Training Take?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The duration of a Commercial Pilot License course generally ranges from 18 to 24 months. The exact timeline depends on weather, aircraft availability, training schedules, medical clearance, and the pace of study and flight progression.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">A typical CPL pathway includes:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {cplJourneyList.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COURSE FEES ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Investment</div>
            <h2 id="commercial-pilot-license-cpl-fees-structure" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License (CPL) Fees Structure</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Pursuing a Commercial Pilot License in India involves costs associated with ground-school training, medical assessments, flying training, examinations, licensing, and other training-related expenses.
              </p>
            </AutoInternalLinks>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th className="px-5 py-3 text-left font-bold">Fee Component</th>
                    <th className="px-5 py-3 text-left font-bold">Estimated Cost Range (INR)</th>
                    <th className="px-5 py-3 text-left font-bold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><td className="px-5 py-3 text-gray-600">Ground School Training</td><td className="px-5 py-3 text-av-orange font-semibold">₹1.5 Lakhs – ₹2.5 Lakhs</td><td className="px-5 py-3 text-gray-600">DGCA examination preparation, ground subjects, and navigation-related training</td></tr>
                  <tr className="bg-gray-50"><td className="px-5 py-3 text-gray-600">DGCA Class 1 &amp; 2 Medicals</td><td className="px-5 py-3 text-av-orange font-semibold">₹15,000 – ₹25,000</td><td className="px-5 py-3 text-gray-600">Medical examinations by authorized DGCA medical examiners</td></tr>
                  <tr className="bg-white"><td className="px-5 py-3 text-gray-600">Flying Training (200 hours)</td><td className="px-5 py-3 text-av-orange font-semibold">₹35 Lakhs – ₹45 Lakhs</td><td className="px-5 py-3 text-gray-600">Aircraft flying, simulator sessions where applicable, fuel and landing-related charges</td></tr>
                  <tr className="bg-gray-50"><td className="px-5 py-3 text-gray-600">DGCA Exam &amp; Licensing Fees</td><td className="px-5 py-3 text-av-orange font-semibold">₹20,000 – ₹30,000</td><td className="px-5 py-3 text-gray-600">Examination, skill-test and licensing-related charges</td></tr>
                  <tr className="bg-white"><td className="px-5 py-3 text-gray-600">Total Estimated Cost</td><td className="px-5 py-3 text-av-orange font-semibold">₹38 Lakhs – ₹48 Lakhs</td><td className="px-5 py-3 text-gray-600">Approximate overall range; actual cost varies</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">These are estimated costs rather than fixed fees. The final cost can vary depending on the flying school, aircraft type, training location, training duration, accommodation, additional flight hours, and other applicable charges.</p>
          </div>
        </section>

        {/* ── HOW MANY FLYING HOURS ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Flight Time</div>
            <h2 id="how-many-flying-hours-are-required-for-a-cpl" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">How Many Flying Hours Are Required for a CPL?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">A Commercial Pilot License in India requires a total of 200 hours of flying experience under the applicable DGCA requirements. The total includes the required cross-country, instrument, and night-flying elements as part of the licensing pathway.</p>
            </AutoInternalLinks>
            <h3 className="font-montserrat text-lg font-bold text-av-blue mt-2 mb-2">Required Flight Experience</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">The required flight time is built progressively through dual instruction, solo training, and supervised flight sorties. The aim is to ensure the candidate can demonstrate safe and competent operations before CPL issuance.</p>
            <h3 className="font-montserrat text-lg font-bold text-av-blue mt-2 mb-2">Cross-Country Flying</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">Candidates must develop cross-country flight competence and log the required navigation experience as part of the CPL pathway.</p>
            <h3 className="font-montserrat text-lg font-bold text-av-blue mt-2 mb-2">Instrument Flying</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">Instrument flying prepares pilots to safely operate in reduced visibility and controlled airspace conditions, which is a core professional skill requirement.</p>
            <h3 className="font-montserrat text-lg font-bold text-av-blue mt-2 mb-2">Night Flying</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">Night-flying experience is part of the required practical training and helps build the operational confidence and judgment needed for commercial flying.</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
              <table className="w-full text-sm">
                <caption className="sr-only">CPL flight-time requirements</caption>
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th scope="col" className="p-3 text-left text-xs font-semibold">Component</th>
                    <th scope="col" className="p-3 text-left text-xs font-semibold">Requirement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white"><th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Total flight time</th><td className="p-3 text-gray-600 text-xs">Not less than 200 hours as pilot of an aeroplane, completed within the five years immediately preceding the application</td></tr>
                  <tr className="bg-gray-50"><th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Pilot-in-command</th><td className="p-3 text-gray-600 text-xs">Not less than 100 hours, with the required recent flying time in the relevant timeframe</td></tr>
                  <tr className="bg-white"><th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Cross-country flying</th><td className="p-3 text-gray-600 text-xs">Not less than 20 hours of cross-country experience, including the applicable long cross-country requirement</td></tr>
                  <tr className="bg-gray-50"><th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Instrument flying</th><td className="p-3 text-gray-600 text-xs">Not less than 10 hours of instrument time, within the applicable limits for simulator use</td></tr>
                  <tr className="bg-white"><th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Night flying</th><td className="p-3 text-gray-600 text-xs">Not less than 5 hours, including the required take-offs and landings as pilot-in-command</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FLYING TRAINING & 200 HOURS ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Flight Training</div>
            <h2 id="how-do-you-complete-the-required-flying-hours" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">How Do You Complete the Required Flying Hours?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The required flying experience is built progressively through dual instruction, solo flying, cross-country sorties, instrument training, and night-flying tasks. Students must complete the required hours and competency elements under DGCA guidance before applying for CPL issuance.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">This training typically includes:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {flyingExperienceList.map((item, i) => (
                <div key={i} className="bg-blue-50 rounded-xl border border-gray-100 p-4 text-center">
                  <span className="text-gray-600 text-sm leading-relaxed font-semibold text-av-blue">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAREER OPPORTUNITIES ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Career Paths</div>
            <h2 id="commercial-pilot-career-pathway-and-progression" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Career Pathway &amp; Progression</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                A Commercial Pilot License can provide a pathway into several areas of civil aviation. Career progression depends on additional flight experience, ratings, examinations, airline requirements, and applicable regulatory requirements.
              </p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-montserrat font-bold text-av-blue mb-3">Immediate / Early-Career Opportunities</h3>
                <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                  <li>First Officer / Trainee Pilot roles, subject to airline recruitment and required Type Rating</li>
                  <li>Flight Instructor opportunities, where the required instructor qualification is obtained</li>
                  <li>Charter and Cargo Pilot opportunities, subject to employer and aircraft requirements</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-montserrat font-bold text-av-blue mb-3">Long-Term Career Progression</h3>
                <ul className="text-gray-600 text-sm leading-relaxed list-disc pl-5 space-y-2">
                  <li>Senior First Officer</li>
                  <li>Airline Captain / Commander</li>
                  <li>Check Pilot / Chief Flying Instructor</li>
                  <li>Designated Examiner, where the applicable qualifications and authorization are obtained</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">CPL is the initial professional licence; airline command roles normally require additional experience, ratings, and the applicable ATPL and other regulatory requirements.</p>
          </div>
        </section>

        {/* ── SALARY ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Earnings</div>
            <h2 id="commercial-pilot-license-salary-expectations-in-india" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License Salary Expectations in India</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Commercial pilot salaries in India vary based on rank, flying experience, aircraft type, type endorsement, airline, and route. Entry-level pilots generally earn less during training, probation, and line-training stages, while compensation increases with experience and progression to senior first officer and captain roles.
              </p>
            </AutoInternalLinks>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th className="px-5 py-3 text-left font-bold">Position</th>
                    <th className="px-5 py-3 text-left font-bold whitespace-nowrap">Estimated Monthly Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-3 text-gray-600">{row.position}</td>
                      <td className="px-5 py-3 text-av-orange font-semibold whitespace-nowrap">{row.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">Commercial pilot salaries vary based on rank, flying experience, aircraft type, type endorsement, airline, and route. Additional allowances for layovers, flight-hour bonuses, and international routes can affect total compensation. These are estimated figures rather than guaranteed salaries.</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">FAQ</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4" id="frequently-asked-questions">Frequently Asked Questions</h2>
            <AuthorCard author={{ name: 'We One Aviation Academy', role: 'Pilot training advisory team', description: 'Our team combines DGCA guidance, training-roadmap expertise, and verified aviation career support.' }} reviewedBy="Aviation mentors" updatedAt="Updated regularly" readingTime="6 min read" />
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-av-blue mb-4">Can I apply for a Commercial Pilot License without studying Physics and Mathematics in 10+2?</h3>
              <p className="text-sm leading-relaxed text-gray-600">Candidates are generally expected to have Physics and Mathematics at the 10+2 level. Students who did not study these subjects may need to complete them through an accepted route such as NIOS before meeting the applicable DGCA requirements.</p>
            </div>
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-av-blue mb-4">What is the maximum age limit to get a Commercial Pilot License in India?</h3>
              <p className="text-sm leading-relaxed text-gray-600">The DGCA licensing requirements set the minimum age for CPL application at 18. Airline recruitment and command progression are separate matters and can depend on employer policies, type ratings, and experience.</p>
            </div>
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-av-blue mb-4">Do I need to complete a Type Rating after getting my CPL?</h3>
              <p className="text-sm leading-relaxed text-gray-600">A CPL does not by itself qualify a pilot to operate every aircraft type. A Type Rating is typically required for certain aircraft or airline operations, and additional employer and aircraft-specific requirements may apply.</p>
            </div>
            <PeopleAlsoAsk items={peopleAlsoAsk} />
            <SummaryBox title="Key Takeaways" items={['A Commercial Pilot License is the professional license for airline-style flying.', 'Eligibility starts with 10+2 PCM, DGCA medical, and DGCA exam preparation.', 'The training path includes ground classes, flying school admission, and 200 flying hours.', 'We One Aviation provides counselling, documentation support, and training guidance at every stage.']} />
          </div>
        </section>

        {/* ── RELATED PROGRAMS ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Explore More</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4" id="related-pilot-training-programs">Related Pilot Training Programs</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">You may also be interested in:</p>
            </AutoInternalLinks>
            <RelatedArticles items={[
              { href: '/dgca-ground-classes', title: 'DGCA Ground Classes', description: 'Prepare for DGCA exams with structured ground classes.' },
              { href: '/courses/cpl', title: 'CPL Flight Training', description: 'Understand the flying phase after your DGCA training.' },
              { href: '/pilot-training-in-india', title: 'Pilot Training in India', description: 'Compare training pathways across India.' },
            ]} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {relatedPrograms.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-av-blue font-semibold text-center card-hover hover:border-av-orange/30 transition-all">
                  {item}
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                These resources provide detailed information to help you understand every stage of becoming a professional pilot.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── CONCLUSION / CTA ── */}
        <section className="py-10 px-4 bg-gradient-to-br from-av-blue to-av-navy" id="start-your-commercial-pilot-journey-today">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">Start Your Commercial Pilot Journey Today</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto mb-4">
                Choosing the right Commercial Pilot License program is the first step toward a successful aviation career. Whether you are searching for a commercial pilot course, commercial pilot training, pilot training in India, or pilot training in Delhi, We One Aviation is here to guide you from your first counselling session to your CPL and beyond.
              </p>
              <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
                Our experienced aviation experts provide complete support for commercial pilot eligibility, DGCA procedures, flying school selection, and career planning, ensuring you have the confidence to achieve your dream of becoming a commercial pilot.
              </p>
            </AutoInternalLinks>
            <h3 className="font-montserrat text-xl font-bold text-white mb-3">Ready to Take Off?</h3>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-white/60 text-sm leading-relaxed max-w-3xl mx-auto mb-6 font-semibold">
                Book your FREE career counselling session today and let We One Aviation help you choose the right pilot course, understand the Commercial Pilot License process, and begin your journey toward an exciting career in aviation.
              </p>
            </AutoInternalLinks>
            <Link href="/contact"
              className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm shadow-lg">
              Get Free Counselling →
            </Link>
          </div>
        </section>

      </div>

      </Layout>
    </>
  );
}