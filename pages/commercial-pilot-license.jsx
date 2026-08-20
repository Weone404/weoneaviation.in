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
import { generateCourseSchema, generateFAQSchema } from "../lib/schema";

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
  timeRequired: 'P18M',
  coursePrerequisites: '10+2 with Physics and Mathematics, DGCA Class 1 Medical, and English proficiency.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: 4000000,
    highPrice: 5000000,
    priceCurrency: 'INR',
  },
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Duration Range', value: '18-24 months' },
    { '@type': 'PropertyValue', name: 'Minimum Flying Hours', value: '200 hours' },
  ],
};

const processSteps = [
  {
    phase: "Step 1 – Career Counselling",
    desc: "Understand the pilot career path, course options, eligibility, estimated costs, and training roadmap.",
  },
  {
    phase: "Step 2 – DGCA Medical Examination",
    desc: "Complete the required DGCA medical assessment before beginning professional pilot training.",
  },
  {
    phase: "Step 3 – DGCA Ground Classes",
    desc: "Join expert DGCA Ground Classes covering subjects such as:",
    topics: ["Air Navigation", "Aviation Meteorology", "Air Regulations", "Technical General", "Technical Specific", "RTR preparation"],
    note: "Strong theoretical knowledge builds the foundation for safe and successful flight training.",
  },
  {
    phase: "Step 4 – DGCA Examinations",
    desc: "Students appear for DGCA examinations after completing their ground training. Passing these exams is an important milestone toward obtaining a Commercial Pilot License.",
  },
  {
    phase: "Step 5 – Flying School Admission",
    desc: "After clearing the required examinations, students join a DGCA-approved Flying School to begin practical flying training.",
  },
  {
    phase: "Step 6 – Complete 200 Flying Hours",
    desc: "To become eligible for a Commercial Pilot License, candidates must complete at least 200 flying hours under DGCA regulations. These hours include cross-country flying, instrument flying, solo flying, and practical flight exercises designed to develop professional piloting skills.",
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
    label: "DGCA Medical",
    desc: "Every aspiring pilot must successfully complete DGCA Class 1 Medical examinations. Good physical and mental fitness are essential for safe flight operations.",
  },
  {
    label: "English Proficiency",
    desc: "English is the international language of aviation. Good communication skills help pilots understand aviation procedures, communicate with Air Traffic Control, and operate safely.",
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
  { position: "Student Pilot", salary: "Training Phase" },
  { position: "First Officer", salary: "₹12–20 LPA" },
  { position: "Senior First Officer", salary: "₹20–35 LPA" },
  { position: "Captain", salary: "₹50 LPA or Higher" },
  { position: "International Airline Pilot", salary: "Higher Salary + Benefits" },
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
    q: "What is a Commercial Pilot License?",
    a: "A Commercial Pilot License (CPL) is a professional license issued by the DGCA that allows pilots to fly aircraft for commercial operations after completing the required training, examinations, and flying hours.",
  },
  {
    q: "What is the commercial pilot eligibility?",
    a: "Candidates generally need:",
    list: ["10+2 with Physics & Mathematics", "DGCA Class 1 Medical", "Good English communication skills", "Completion of DGCA requirements"],
  },
  {
    q: "How long does a commercial pilot course take?",
    a: "A commercial pilot course generally takes 18–24 months, depending on the flying school, weather conditions, and the student's training progress.",
  },
  {
    q: "How many flying hours are required for a Commercial Pilot License?",
    a: "According to DGCA requirements, candidates must complete 200 flying hours to obtain a Commercial Pilot License.",
  },
  {
    q: "Can I join pilot training after 12th?",
    a: "Yes. Students who have completed 10+2 with Physics and Mathematics can begin their journey toward becoming a commercial pilot after meeting the required DGCA eligibility criteria.",
  },
  {
    q: "Is pilot training in India a good career choice?",
    a: "Yes. The aviation industry is expanding, creating increasing demand for qualified commercial pilots. Professional pilot training in India offers strong career prospects, competitive salaries, and opportunities with domestic and international airlines.",
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
  { val: "Class 1", label: "DGCA Medical" },
];

const tocHeadings = [
  { id: 'what-is-a-commercial-pilot-license', title: 'What is a Commercial Pilot License?' },
  { id: 'why-choose-a-commercial-pilot-course', title: 'Why Choose a Commercial Pilot Course?' },
  { id: 'commercial-pilot-eligibility', title: 'Commercial Pilot Eligibility' },
  { id: 'commercial-pilot-training-process', title: 'Commercial Pilot Training Process' },
  { id: 'pilot-training-in-india', title: 'Pilot Training in India' },
  { id: 'pilot-training-in-delhi', title: 'Pilot Training in Delhi' },
  { id: 'why-choose-we-one-aviation', title: 'Why Choose We One Aviation?' },
  { id: 'commercial-pilot-license-course-duration', title: 'Commercial Pilot License Course Duration' },
  { id: 'commercial-pilot-course-fees', title: 'Commercial Pilot Course Fees' },
  { id: 'flying-training-and-200-flying-hours', title: 'Flying Training & 200 Flying Hours' },
  { id: 'career-opportunities-after-commercial-pilot-training', title: 'Career Opportunities After Commercial Pilot Training' },
  { id: 'commercial-pilot-license-salary', title: 'Commercial Pilot License Salary' },
];

const faqSchema = generateFAQSchema(faqs);

const LAST_UPDATED = 'August 19, 2026';
const LAST_UPDATED_ISO = '2026-08-19';

const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Commercial Pilot Licence (CPL) — India',
    description: 'CPL (Aeroplanes) requirements in India: minimum age 18, Class Ten plus Two with Physics and Mathematics, and 200 hours of flight time under Schedule II, Section J of the Aircraft Rules, 1937.',
    inLanguage: 'en-IN',
    dateModified: LAST_UPDATED_ISO,
    url: 'https://weoneaviation.in/commercial-pilot-license',
    provider: { '@type': 'EducationalOrganization', name: 'We One Aviation Academy', url: 'https://weoneaviation.in' },
};

export default function CPL() {
  const [openPhase, setOpenPhase] = useState(null);

  return (
    <>
      <Head>
        <title>Commercial Pilot License (CPL) Course in India | We One Aviation</title>
        <StructuredData data={[generateCourseSchema({
          name: 'Commercial Pilot License (CPL) in India',
          description: 'Complete guide to Commercial Pilot License training in India, including eligibility, DGCA process, and pilot career pathways.',
          url: 'https://weoneaviation.in/commercial-pilot-license',
          courseMode: 'Blended',
          lowPrice: 4000000,
          highPrice: 5000000,
          additionalProperties: [
            { name: 'Duration Range', value: '18-24 months' },
            { name: 'Minimum Flying Hours', value: '200 hours' },
          ],
        }), faqSchema]} />
      </Head>

      <Layout title="Commercial Pilot License (CPL) Course in India | We One Aviation" description="Complete guide to CPL training, eligibility, fees, and pilot career paths with We One Aviation Academy.">
            <Head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
            </Head>
        <div className="bg-gray-50 min-h-screen">

        {/* ── HEADER ── */}
        <header className="bg-gradient-to-br from-av-blue to-av-navy text-white text-center relative overflow-hidden"
          style={{ paddingTop: "144px", paddingBottom: "30px" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full border-2 border-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full border-2 border-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="section-tag mb-3">Complete Guide</div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Commercial Pilot License (CPL) in India
              <br />
              <span className="text-av-orange">Complete Guide to Becoming a Commercial Pilot</span>
            </h1>

            {/* Direct answer. Written to stand alone if extracted. */}
            <p className="text-gray-700 leading-relaxed mb-6 text-base">
                A Commercial Pilot Licence (Aeroplanes) in India requires a minimum age of 18, Class Ten plus Two with Physics and Mathematics, and not less than 200 hours of flight time completed within the preceding five years. The requirements are set by the Aircraft Rules, 1937, Schedule II, Section J.
            </p>

            <p className="text-gray-500 text-xs mb-8">{`Last updated: ${LAST_UPDATED}`}</p>

            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">CPL eligibility under the Aircraft Rules, 1937</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                The requirements below are set by the Aircraft Rules, 1937 (continued in force by section 43(2) of the Bharatiya Vayuyan Adhiniyam, 2024), Schedule II, Section J. They apply to a Commercial Pilot&rsquo;s Licence (Aeroplanes) and hold wherever the training is done.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                <table className="w-full text-sm">
                    <caption className="sr-only">CPL (Aeroplanes) eligibility, Aircraft Rules 1937 Schedule II Section J</caption>
                    <thead>
                        <tr className="bg-av-blue text-white">
                            <th scope="col" className="p-3 text-left text-xs font-semibold">Requirement</th>
                            <th scope="col" className="p-3 text-left text-xs font-semibold">What Schedule II requires</th>
                            <th scope="col" className="p-3 text-left text-xs font-semibold">Clause</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Minimum age</th>
                            <td className="p-3 text-gray-600 text-xs">Not less than 18 years on the date of application</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(a)</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Educational qualification</th>
                            <td className="p-3 text-gray-600 text-xs">Class Ten plus Two, or equivalent, with Physics and Mathematics from a recognised Board or University</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(b)</td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Medical fitness</th>
                            <td className="p-3 text-gray-600 text-xs">Certificate of physical fitness from an approved Medical Board, against the standards notified by the Director-General under Rule 39B</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(c)</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Written examination</th>
                            <td className="p-3 text-gray-600 text-xs">Air Regulations, Air Navigation, Meteorology, and Aircraft and Engines, plus a Signals (practical) examination for interpretation of aural and visual signals</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(d)</td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Radio telephony</th>
                            <td className="p-3 text-gray-600 text-xs">A current Flight Radio Telephone Operator’s Licence for operating radio telephone apparatus on board an aircraft</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(g)</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Skill test</th>
                            <td className="p-3 text-gray-600 text-xs">Competency demonstrated to an examiner on the type applied for, within the six months preceding the application</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(h)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">CPL flight-time requirement</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Paragraph 1(e) of Section J sets the flying experience. The 200 hours is a total; the rows beneath it are minimums that sit inside that total, not additions to it.
            </p>
            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                <table className="w-full text-sm">
                    <caption className="sr-only">CPL (Aeroplanes) flight-time requirement, Schedule II Section J paragraph 1(e)</caption>
                    <thead>
                        <tr className="bg-av-blue text-white">
                            <th scope="col" className="p-3 text-left text-xs font-semibold">Component</th>
                            <th scope="col" className="p-3 text-left text-xs font-semibold">What Schedule II requires</th>
                            <th scope="col" className="p-3 text-left text-xs font-semibold">Clause</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Total flight time</th>
                            <td className="p-3 text-gray-600 text-xs">Not less than 200 hours as pilot of an aeroplane, completed within the five years immediately preceding the application</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Pilot-in-command</th>
                            <td className="p-3 text-gray-600 text-xs">Not less than 100 hours, of which not less than 15 hours in the six months immediately preceding the application</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)(i)</td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Cross-country as PIC</th>
                            <td className="p-3 text-gray-600 text-xs">Not less than 20 hours, including one cross-country flight of not less than 300 nautical miles with full-stop landings at two different aerodromes</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)(ii)</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Instrument time</th>
                            <td className="p-3 text-gray-600 text-xs">Not less than 10 hours, of which not more than 5 hours may be on an approved simulator</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)(iii)</td>
                        </tr>
                        <tr className="bg-white">
                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Night flying</th>
                            <td className="p-3 text-gray-600 text-xs">Not less than 5 hours, including at least 10 take-offs and 10 landings as pilot-in-command (sole manipulator of the controls), within the preceding six months</td>
                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)(iv)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="text-gray-500 text-xs mb-10">
                A holder of a Commercial Pilot&rsquo;s Licence (Helicopters) or Airline Transport Pilot&rsquo;s Licence (Helicopters) with not less than 1,000 hours as pilot-in-command of a helicopter has the 200-hour requirement reduced to 100 hours, under the proviso to paragraph 1(e).
            </p>
            <QuickAnswer
              question="How do you become a commercial pilot in India?"
              answer="You usually complete 10+2 with Physics and Mathematics, pass DGCA Class 1 medical, join DGCA ground classes, clear the required exams, and complete at least 200 flying hours at an approved flying school."
            />
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-3">
              A Commercial Pilot License (CPL) is the qualification required to fly aircraft professionally and build a successful career in aviation. At We One Aviation, we provide complete guidance for aspiring pilots, from DGCA counselling and ground classes to flying school selection and flight training. Whether you are planning to join a commercial pilot course, looking for commercial pilot training, or searching for the best pilot course after 12th, our experts are here to guide you at every stage.
            </p>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              With over a decade of aviation counselling experience, We One Aviation helps students understand the complete CPL journey, including eligibility, DGCA exams, medical requirements, flying hours, and career opportunities. Our goal is to simplify the process so you can focus on achieving your dream of becoming a commercial pilot.
            </p>
          </div>
        </header>

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
            <h2 id="what-is-a-commercial-pilot-license" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">What is a Commercial Pilot License?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 leading-relaxed text-sm">
                A Commercial Pilot License (CPL) is a professional license issued by the Directorate General of Civil Aviation (DGCA) that allows pilots to fly aircraft for commercial purposes. To obtain a Commercial Pilot License in India, candidates must complete DGCA ground classes, clear the required examinations, pass DGCA medical assessments, and complete a minimum of 200 flying hours at a DGCA-approved flying school.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── WHY CHOOSE A COMMERCIAL PILOT COURSE ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Why This Course</div>
            <h2 id="why-choose-a-commercial-pilot-course" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Why Choose a Commercial Pilot Course?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The aviation industry is expanding rapidly, creating increasing demand for trained commercial pilots. A commercial pilot course equips students with aviation theory, flight operations knowledge, simulator experience, and practical flying skills required by airlines.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">By enrolling in a structured commercial pilot training program, students gain:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {whyChooseCourseList.map((b, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-av-blue font-semibold text-center card-hover hover:border-av-orange/30 transition-all">
                  ✅ {b}
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether your goal is to work for domestic airlines or international carriers, earning a CPL is the first major milestone in your aviation career.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── ELIGIBILITY ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Eligibility</div>
            <h2 id="commercial-pilot-eligibility" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Eligibility</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">Understanding commercial pilot eligibility is the first step before applying for a CPL course.</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eligibilityItems.map((item, i) => (
                <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                  <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <div className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.label}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRAINING PROCESS ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Process</div>
            <h2 id="commercial-pilot-training-process" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Training Process</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Obtaining a Commercial Pilot License involves several important stages. At We One Aviation, we guide students through every step to ensure a smooth and well-planned learning experience.
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
            <h2 id="pilot-training-in-india" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Pilot Training in India</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                India has become one of the fastest-growing aviation markets, increasing the demand for qualified pilots. Professional pilot training in India combines classroom learning with practical flight experience, ensuring students are prepared for airline careers.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">At We One Aviation, students receive guidance for:</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {pilotTrainingIndiaList.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                Our experienced aviation mentors help students choose the right training pathway based on their career goals and budget.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── PILOT TRAINING IN DELHI ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Training in Delhi</div>
            <h2 id="pilot-training-in-delhi" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Pilot Training in Delhi</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Students searching for pilot training in Delhi can benefit from personalized aviation counselling at We One Aviation. Our team helps aspiring pilots compare flying schools, understand DGCA procedures, prepare documentation, and confidently begin their Commercial Pilot License journey.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether you plan to complete your flight training in India or abroad, we provide expert guidance to help you make informed decisions.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── WHY CHOOSE WE ONE AVIATION ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Why We One Aviation</div>
            <h2 id="why-choose-we-one-aviation" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Why Choose We One Aviation?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Choosing the right aviation mentor is just as important as choosing the right flying school.
              </p>
              <h3 className="font-montserrat font-bold text-av-blue mb-4">What Makes We One Aviation Different?</h3>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {whatMakesUsDifferent.map((b, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-av-blue font-semibold text-center card-hover hover:border-av-orange/30 transition-all">
                  ✅ {b}
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                At We One Aviation, we don't just help students enroll in a pilot course—we help them build a successful aviation career with confidence, clarity, and professional support.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── COURSE DURATION ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Duration</div>
            <h2 id="commercial-pilot-license-course-duration" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License Course Duration</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The duration of a Commercial Pilot License (CPL) course generally ranges from 18 to 24 months. The exact timeline depends on factors such as weather conditions, aircraft availability, training schedules, and the student's progress.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">A typical CPL journey includes:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {cplJourneyList.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                With proper planning and continuous training, students can complete the course efficiently and prepare for airline recruitment.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── COURSE FEES ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Investment</div>
            <h2 id="commercial-pilot-course-fees" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Course Fees</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                The cost of a commercial pilot course varies depending on the flying school, aircraft type, location, and additional training requirements. Besides tuition fees, students should also consider expenses such as:
              </p>
            </AutoInternalLinks>
            <div className="mb-6">
              <Link href="/courses/cpl#fee-table" className="inline-flex items-center text-av-orange font-semibold hover:underline">
                See full fee breakdown →
              </Link>
            </div>
            <div id="fee-table" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {feeConsiderations.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3 items-center">
                  <span className="text-av-blue font-black text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                At We One Aviation, our aviation experts provide transparent counselling on the complete fee structure and help students choose a training program that aligns with their career goals and budget.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── FLYING TRAINING & 200 HOURS ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Flight Training</div>
            <h2 id="flying-training-and-200-flying-hours" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Flying Training &amp; 200 Flying Hours</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Practical flying training is one of the most important parts of earning a Commercial Pilot License. Students train on DGCA-approved aircraft under the supervision of certified flight instructors.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">During training, students gain experience in:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {flyingExperienceList.map((item, i) => (
                <div key={i} className="bg-blue-50 rounded-xl border border-gray-100 p-4 text-center">
                  <span className="text-gray-600 text-sm leading-relaxed font-semibold text-av-blue">{item}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                To qualify for a Commercial Pilot License, candidates must successfully complete a minimum of 200 flying hours as prescribed by DGCA regulations.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── CAREER OPPORTUNITIES ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Career Paths</div>
            <h2 id="career-opportunities-after-commercial-pilot-training" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Career Opportunities After Commercial Pilot Training</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                After completing commercial pilot training, graduates can explore a wide range of career opportunities in the aviation industry.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Career options include:</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {careerOptionsList.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3 items-center card-hover hover:border-av-orange/30 transition-all">
                  <span className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</span>
                  <span className="font-montserrat font-bold text-av-blue text-sm">{c}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                With India's aviation industry expanding rapidly, airlines continue to recruit skilled pilots, making aviation one of the most rewarding career choices.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── SALARY ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Earnings</div>
            <h2 id="commercial-pilot-license-salary" className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License Salary</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                One of the biggest reasons students choose a commercial pilot course is the attractive salary and career growth.
              </p>
            </AutoInternalLinks>
            <h3 className="font-montserrat font-bold text-av-blue mb-3">Average Commercial Pilot License Salary</h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th className="px-5 py-3 text-left font-bold">Position</th>
                    <th className="px-5 py-3 text-left font-bold whitespace-nowrap">Estimated Annual Salary</th>
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
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                The commercial pilot license salary depends on the airline, experience, aircraft type, and flying hours. As pilots gain experience, they often receive additional allowances, travel benefits, and career advancement opportunities.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── WHY CHOOSE US FOR TRAINING / OUR SERVICES ── */}
        <section className="py-10 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Our Services</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">Why Choose We One Aviation for Commercial Pilot Training?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-3xl">
                At We One Aviation, we understand that becoming a commercial pilot is a significant investment in your future. Our experienced aviation counsellors provide reliable guidance and personalized support to help students confidently begin their journey.
              </p>
            </AutoInternalLinks>
            <h3 className="font-montserrat font-bold text-white mb-4">Our Services</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {ourServicesList.map((s, i) => (
                <div key={i} className="glass rounded-xl p-4 flex gap-3 items-start text-sm text-white/60">
                  <span className="text-av-orange font-bold flex-shrink-0">–</span> {s}
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-white/70 text-sm leading-relaxed max-w-3xl">
                Our commitment is to simplify every stage of the pilot training process and help students make informed decisions based on their career goals.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <AuthorCard author={{ name: 'We One Aviation Academy', role: 'Pilot training advisory team', description: 'Our team combines DGCA guidance, training-roadmap expertise, and verified aviation career support.' }} reviewedBy="Aviation mentors" updatedAt="Updated regularly" readingTime="6 min read" />
            <PeopleAlsoAsk items={faqs.map((faq) => ({ q: faq.q, a: faq.a }))} />
            <SummaryBox title="Key Takeaways" items={['A Commercial Pilot License is the professional license for airline-style flying.', 'Eligibility starts with 10+2 PCM, DGCA Class 1 medical, and DGCA exam preparation.', 'The training path includes ground classes, flying school admission, and 200 flying hours.', 'We One Aviation provides counselling, documentation support, and training guidance at every stage.']} />
          </div>
        </section>

        {/* ── RELATED PROGRAMS ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Explore More</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Related Pilot Training Programs</h2>
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
        <section className="py-10 px-4 bg-gradient-to-br from-av-blue to-av-navy">
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
            <a href="/contact"
              className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm shadow-lg">
              Get Free Counselling →
            </a>
          </div>
        </section>

      </div>

      </Layout>
    </>
  );
}