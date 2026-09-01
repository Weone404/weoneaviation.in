import Head from 'next/head';
import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import QuickAnswer from '../components/QuickAnswer';
import ArticleTOC from '../components/ArticleTOC';
import PeopleAlsoAsk from '../components/PeopleAlsoAsk';
import Breadcrumb from '../components/Breadcrumb';
import AuthorCard from '../components/AuthorCard';
import RelatedArticles from '../components/RelatedArticles';
import SummaryBox from '../components/SummaryBox';
import StructuredData from '../components/StructuredData';
import { generateCourseSchema, generateFAQSchema } from '../lib/schema';
import { DGCA_PAPERS, RTR, papersSummary, MEDICAL, EDUCATION } from '../lib/facts';

const heroSlides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Most Popular Course', title: 'DGCA Ground', highlight: 'Classes', sub: "DGCA ground classes covering every subject in the CPL written examination set" },
];

const subjects = [
  {
    num: '1', icon: '🗺️', title: 'Air Navigation',
    short: 'Learn to navigate aircraft using maps, coordinates, instruments, and GPS.',
    book: 'Teaches how to calculate direction, distance, time, and fuel for safe and accurate flying.',
    detail: 'Learn to plan and conduct flights using maps, charts, and navigation instruments. Covers topics like basic navigation, map reading, compass errors, radio aids (VOR, NDB, DME), flight planning, and airspace classifications.',
    href: '/air-navigation',
  },
  {
    num: '2', icon: '⛅', title: 'Aviation Meteorology',
    short: 'Study weather conditions and how they affect flying.',
    book: 'Covers clouds, wind patterns, storms, pressure systems, and how to read weather charts for flight planning.',
    detail: 'Covers atmospheric structure, weather systems, wind patterns, thunderstorms, icing, visibility, climatology, and interpreting METAR/TAF weather reports.',
    href: '/aviation-meteorology',
  },
  {
    num: '3', icon: '📋', title: 'Air Regulations',
    short: 'Understand the rules and laws of aviation in India and worldwide.',
    book: 'Includes DGCA rules, ICAO guidelines, airspace classifications, and pilot responsibilities.',
    detail: 'Learn aviation laws, licensing requirements, CAR (Civil Aviation Requirements), rules of the air, and flight time/duty limits.',
    href: '/air-regulations',
  },
  {
    num: '4', icon: '⚙️', title: 'Technical General',
    short: 'Learn how an aircraft works – its engine, systems, and parts.',
    book: 'Explains engines, hydraulics, electrical systems, instruments, and basic aerodynamics.',
    detail: 'Understand the science and mechanics of flight — including aerodynamics, engines, structures, electrical and hydraulic systems, instruments, and fire protection.',
    href: '/technical-general',
  },
  {
    num: '5', icon: '🛩️', title: 'Technical Specific',
    short: "Know the exact aircraft you'll fly during training.",
    book: 'Covers aircraft systems, performance, and checklists for the specific trainer aircraft (e.g., Cessna 172).',
    detail: 'Focus on aircraft type used for training — covers systems, limitations, procedures, and emergency operations.',
    href: '/contact',
  },
  {
    num: '6', icon: '📻', title: 'Radio Telephony (RTR)',
    short: 'Learn how to communicate with ATC using aviation radio language.',
    book: 'Includes standard phrases, procedures, emergency communication, and mock RT exercises.',
    detail: null,
    href: '/rtr-a',
  },
];

const dgcaDoes = [
  { icon: '📜', title: 'Issues Licenses', desc: 'To pilots, aircraft engineers, and flight instructors.' },
  { icon: '🛡️', title: 'Ensures Safety', desc: 'Makes sure all aircraft, airports, and airlines follow safety standards.' },
  { icon: '🏫', title: 'Approves Flying Schools', desc: 'Only DGCA schools can train pilots in India.' },
  { icon: '📝', title: 'Conducts Exams', desc: 'Organizes theory exams (called DGCA Ground Exams) for student pilots.' },
];

const benefits = [
  'Easy-to-learn syllabus',
  'Doubt clearing in every class',
  'Learn directly from professional pilots and instructors',
  'Free access to books and notes',
  'Interaction with other aspiring aviators',
  'No paperwork burden — we help with computer number registration, DGCA medicals, exam forms, and visa processing',
];

const eligibility = [
  {
    icon: '🎓', title: 'Educational Qualification',
    points: [
      'You must have passed Class 12th (10+2) or equivalent from a recognized board.',
      'Subjects Required: Physics and Mathematics are mandatory.',
      'Students from Science stream are preferred.',
      'Note: If you have not studied Physics and Math in 12th, you can still become eligible by appearing for these subjects through the National Institute of Open Schooling (NIOS).',
    ],
  },
  {
    icon: '🎂', title: 'Minimum Age',
    points: [
      'You must be at least 17 years old to enroll in ground classes.',
      'However, to apply for a Commercial Pilot License (CPL), you must be 18 years or above.',
    ],
  },
  {
    icon: '🩺', title: 'Medical Fitness',
    points: [
      'You must obtain a DGCA medical certificate before starting your ground classes.',
      'Eventually, a DGCA medical certificate is required for flying and CPL issuance.',
      'Medical certificates must be issued by DGCA doctors only.',
    ],
  },
  {
    icon: '🗣️', title: 'English Proficiency',
    points: [
      'You should be able to read, write, and understand English fluently, as aviation communication and study material are in English.',
    ],
  },
  {
    icon: '❤️', title: 'Passion & Dedication',
    points: [
      'A strong interest in aviation, willingness to study technical subjects, and discipline are essential to succeed in DGCA Ground Classes and clear the DGCA exams.',
    ],
  },
];

const whyChoose = [
  { icon: '✅', title: 'Verified Instructors', desc: "Our All Instructors Are Already Pilot Those Really Help You in All Aviation Carrier. They Don't Only Teach You, They Share their Life experience of pilot with you and Give you Right Roadmap." },
  { icon: '✅', title: 'Latest Technology Classroom', desc: 'Our classrooms are equipped with modern technology that provides greater comfort for studying.' },
  { icon: '✅', title: '25% Scholarship Granted', desc: 'We Provide 25% Scholarship in Dgca Ground Classes To Every Students For Push Them Towards Their Dream of Pilot.' },
  { icon: '✅', title: 'Extra Class For Weak Students', desc: 'We provide extra classes for weak students to help them clear the DGCA exam quickly.' },
  { icon: '✅', title: 'Free Books and Notes', desc: 'We provide free books and notes to students, which help them a lot.' },
  { icon: '✅', title: 'Career Guidance', desc: 'Interview preparation and career guidance through every stage of the licence.' },
  { icon: '✅', title: 'Free Classes Until You Clear', desc: 'We One Aviation Academy is the Only Institute Which Give Free Classes to everyone Till They not Clear Dgca Exam.' },
];

const blogs = [
  {
    title: 'Pilot Training in Delhi',
    date: 'February 13, 2025',
    desc: 'Flight Simulator Practice in pilot training Course. DGCA Practice Paper, Private Pilot License (PPL) Course Fees, Full Form of CPL...',
    href: '/pilot-training-in-delhi',
  },
  {
    title: 'Private Pilot License (PPL) Course Fees',
    date: 'February 10, 2025',
    desc: 'Private Pilot License (PPL) Course Fees-2025. If Your Dream To Become a Pilot...',
    href: '/ppl-full-form',
  },
  {
    title: 'Full Form of CPL | Commercial Pilot License',
    date: 'January 28, 2025',
    desc: 'CPL Full Form: Meaning in Aviation, Cricket, Marketing, and More. Have you ever come across the term CPL and wondered what...',
    href: '/cpl-full-form',
  },
  {
    title: 'Master the DGCA CPL Exam: Complete Guide to Syllabus, Subjects, and Success Tips',
    date: 'January 21, 2025',
    desc: 'Comprehensive Guide to DGCA Exam Subjects. Master the DGCA CPL Exam with complete syllabus, subjects, and success tips.',
    href: '/blogs',
  },
  {
    title: 'Aviation Course After 12th: Detailed Fees and Admission Guide',
    date: 'January 2, 2025',
    desc: 'Discover top aviation courses after 12th with complete details on fees, eligibility, and career options.',
    href: '/how-to-become-a-pilot-after-12th',
  },
  {
    title: 'Aviation Academy',
    date: 'December 12, 2024',
    desc: 'We One Aviation Academy: Leading Aviation Training Institute. At WeOneAviation Academy, we turn your passion for aviation into a rewarding career.',
    href: '/blogs',
  },
];

const sidebarQuickLinks = [
  { label: 'Commercial Pilot License (CPL)', href: '/commercial-pilot-license' },
  { label: 'CPL Eligibility Criteria', href: '/commercial-pilot-license-eligibility' },
  { label: 'CPL Salary in India', href: '/commercial-pilot-license-salary' },
  { label: 'DGCA Exam (Pariksha)', href: '/dgca-pariksha' },
  { label: 'DGCA Computer Number', href: '/dgca-computer-number' },
  { label: 'Student Pilot License (SPL)', href: '/student-pilot-license-spl' },
  { label: 'How to Become a Pilot After 12th', href: '/how-to-become-a-pilot-after-12th' },
  { label: 'Flying School in India', href: '/flying-school/india' },
  { label: 'PPL Full Form', href: '/ppl-full-form' },
  { label: 'CPL Full Form', href: '/cpl-full-form' },
  { label: 'About Us', href: '/about-us' },
];

const quickAnswer = {
  question: 'What are DGCA ground classes?',
  answer: 'DGCA ground classes are the theory coaching foundation for pilot training in India. They prepare you for DGCA exams across Air Navigation, Meteorology, Air Regulations, Technical General, Technical Specific, and RTR.',
};

const tocHeadings = [
  { id: 'what-is-dgca', title: 'What is the DGCA?' },
  { id: 'why-are-dgca-ground-classes-important', title: 'Why are DGCA ground classes important?' },
  { id: 'dgca-ground-classes-subjects', title: 'Which subjects come up in the DGCA exam?' },
  { id: 'eligibility-for-dgca-ground-classes', title: 'Who is eligible to join?' },
  { id: 'why-choose-we-one-aviation-academy', title: 'Why choose We One Aviation Academy?' },
];

/*
 * Rewritten from three soft marketing lines ("improves your chances of moving
 * smoothly") into the figures a student is actually looking for. A summary box
 * an engine lifts wholesale should carry facts, not reassurance.
 */
const summaryItems = [
  'Written papers: Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific',
  'RTR (A) is examined separately, under the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025',
  'Course duration: about 6 months, run in both online and offline modes',
  'Papers are cleared one at a time — you do not have to sit them all in a single cycle',
  'No age bar on the classes; the minimum age of 18 applies when you apply for the CPL itself',
  'Statutory basis: Aircraft Rules, 1937, Schedule II, Section J, paragraph 1(d)',
];

/*
 * Kept DISJOINT from faqSchema below. Two of the three items here previously
 * repeated FAQ questions word for word ("Do I need DGCA ground classes...",
 * "What subjects are covered..."), so one URL answered the same question
 * twice and split what an engine extracts. Replaced with questions the FAQ
 * block does not cover.
 */
const peopleAlsoAskItems = [
  { q: 'Can I start DGCA ground classes before I turn 18?', a: 'Yes, and most students do. The papers have no bearing on the CPL age bar — Schedule II, Section J requires you to be 18 on the date you apply for the licence, not on the day you sit a paper. Starting at 17 means the theory is behind you when you become eligible.' },
  { q: 'Do I have to clear every paper in one sitting?', a: 'No. The papers are cleared individually, and students routinely spread them across several exam cycles. Plan the order around your flying schedule — a failed paper costs you a full cycle, not a day.' },
  { q: 'Does clearing the papers expire?', a: 'Cleared papers do not lapse the way flight time does. What does carry a limit is the flying: Section J requires your 200 hours to fall inside the five years before your licence application, so the flying should follow the theory without a long gap.' },
  { q: 'What happens if I fail a paper?', a: 'You re-sit it in a later cycle. Nothing else you have cleared is affected. The practical cost is time — cycles run on the DGCA calendar, not on yours, which is why paper order is worth planning.' },
  { q: 'How long are DGCA ground classes?', a: 'Most students complete the full DGCA syllabus in around 6 months, though timelines can vary based on exam readiness and revision pace.' },
];

const relatedArticles = [
  { href: '/commercial-pilot-license', title: 'Commercial Pilot License (CPL) in India', description: 'Understand the full CPL pathway, eligibility, and course structure.' },
  { href: '/dgca-pariksha', title: 'DGCA Pariksha Guide', description: 'Learn about the DGCA exam pattern, preparation strategy, and key milestones.' },
  { href: '/dgca-computer-number', title: 'DGCA Computer Number', description: 'See how to begin your licensing journey with the required registration steps.' },
];

/*
 * The single Course node for this route. It replaces three overlapping nodes
 * that all shipped on every render: dgcaGroundCourseSchema at the top of this
 * file, this one, and an inline groundCourseSchema rendered a second time
 * through next/head. Three @type Course nodes for one course is not three
 * times the signal — it is one course an engine cannot resolve, carrying three
 * different descriptions. Fields below are the union of what the three held.
 */
const courseSchema = generateCourseSchema({
  name: 'DGCA Ground Classes',
  description: `DGCA ground classes for the five written papers — ${papersSummary()} — plus RTR (A) preparation. Online and offline, in Dwarka, New Delhi.`,
  url: 'https://weoneaviation.in/dgca-ground-classes',
  courseMode: 'Blended',
  duration: '6 Months',
  lowPrice: 250000,
  highPrice: 400000,
  additionalProperties: [
    { name: 'Duration', value: '6 Months' },
    // Derived from lib/facts.js. Was hardcoded "6 DGCA subjects", which
    // contradicted the sourced position: FIVE written papers, RTR (A) separate.
    { name: 'Written Papers', value: `${DGCA_PAPERS.length} DGCA written papers` },
    { name: 'Radio Licence', value: 'RTR (A), examined separately' },
    { name: 'Scholarship', value: '25% scholarship available' },
  ],
});

/*
 * FAQ set merged from both routes and deduped by question. Three questions
 * came from /courses/dgca-ground-classes; its "what subjects" and "how long"
 * entries were dropped as duplicates of what this page already answers in the
 * FAQ and the PAA block respectively. Kept DISJOINT from peopleAlsoAskItems.
 */
const faqSchema = generateFAQSchema([
  {
    q: 'What are DGCA ground classes?',
    a: `DGCA ground classes are the aviation theory course behind the written examinations required for a Commercial Pilot Licence. They cover ${papersSummary()}, and RTR (A) is prepared for alongside them though it is examined separately.`,
  },
  {
    q: 'Who is eligible to join DGCA ground classes?',
    a: `The classes themselves are open to anyone building a theory foundation. The licence is what carries the requirement: ${EDUCATION.requirement} (${EDUCATION.clause}), plus a ${MEDICAL.short}. Many students start the theory before they meet every licence condition.`,
  },
  {
    q: 'Why choose We One Aviation for DGCA ground classes?',
    a: 'Instructors who teach to the current examination pattern, a paper-by-paper structure, timed mock tests, live doubt sessions, and both online and classroom modes. We are honest about our scope: we teach the theory and place students with flying schools for the hours. We do not own aircraft and we do not place anyone into an airline job.',
  },
  {
    q: 'What is the best way to prepare for DGCA ground classes?',
    a: 'A steady study plan, consistent revision, and guidance from experienced instructors can make DGCA ground classes far more effective.',
  },
  {
    q: 'Do I need DGCA ground classes to become a pilot?',
    a: 'Yes. DGCA ground classes are the standard preparation route for the DGCA theory exams required for pilot licensing.',
  },
  {
    q: 'What subjects are covered in DGCA ground classes?',
    a: 'The core subjects include Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific, and RTR.',
  },
]);


/* ─────────────────────────────────────────────────────────────────────────
 * MERGED FROM /courses/dgca-ground-classes (Workstream B).
 *
 * That route carried 1,060 lines against this page's 686, and the extra was
 * not padding — it held nine sections this page had nothing equivalent to.
 * The two competed for the same query with the deeper content sitting on the
 * weaker URL. Everything unique is ported below and the loser now 301s here.
 * Nothing was dropped; where both pages covered a topic, this page's version
 * won on structure (question H2s, sourced clause citations, tables).
 * ───────────────────────────────────────────────────────────────────────── */

const whoShouldJoin = [
  'Students planning to pursue a Commercial Pilot Licence.',
  'Candidates preparing for the DGCA theory examinations.',
  'Students already enrolled at a Flying Training Organisation who need structured theory support.',
  'Graduates moving into aviation from another field.',
  'Pilots preparing for ATPL theory.',
  'Students who want online, classroom, or a mix of both.',
];

const whyItMatters = [
  'You understand the theory before you are paying by the flying hour to learn it.',
  'You sit the DGCA papers with a structured plan instead of a stack of PDFs.',
  'Weather, navigation and systems decisions in the air rest on this material.',
  'Mock tests and doubt sessions show you where you actually stand, early.',
  'You stay current with the examination pattern rather than last year\'s.',
];

const classStructure = [
  { icon: '🏫', title: 'Instructor-led sessions', text: 'Classes taught by instructors who work through the concepts with real operational examples rather than reading slides.' },
  { icon: '💬', title: 'Interactive discussion', text: 'Every session leaves room for questions. Aviation theory rewards the student who asks why, not the one who memorises.' },
  { icon: '📝', title: 'Mock examinations', text: 'Regular mocks in the DGCA pattern, so exam day is familiar rather than a surprise.' },
  { icon: '📊', title: 'Performance tracking', text: 'Periodic assessment shows which subjects need more time, while there is still time to give them.' },
  { icon: '🎯', title: 'Doubt-clearing sessions', text: 'Dedicated time to close gaps before the syllabus moves on to material that builds on them.' },
];

const learningModes = [
  { feature: 'Live instructor sessions', online: 'Yes', classroom: 'Yes' },
  { feature: 'Recorded lectures', online: 'Yes', classroom: 'Yes' },
  { feature: 'Doubt clearing', online: 'Yes', classroom: 'Yes' },
  { feature: 'Study material', online: 'Yes', classroom: 'Yes' },
  { feature: 'Mock tests', online: 'Yes', classroom: 'Yes' },
  { feature: 'Schedule flexibility', online: 'High', classroom: 'Moderate' },
  { feature: 'Classroom interaction', online: 'Limited', classroom: 'Extensive' },
];

const studyMaterial = [
  'Subject notes kept current with the examination pattern',
  'DGCA-focused reading material per paper',
  'Practice question banks',
  'Numerical problem sets, especially for Air Navigation',
  'Revision modules',
  'Mock examinations under timed conditions',
  'Guidance on previous exam patterns',
  'Instructor-led revision before each cycle',
];

const prepareSteps = [
  { title: 'Build the fundamentals first', text: 'Understand the principle before attempting advanced numericals. Students who skip this stall at the same place every time.' },
  { title: 'Work to a study plan', text: 'Give each subject dedicated time and revise on a cycle. Last-minute preparation does not survive contact with a DGCA paper.' },
  { title: 'Practise the numericals', text: 'Air Navigation in particular rewards repetition — speed and accuracy under time pressure come only from practice.' },
  { title: 'Sit mock papers under timed conditions', text: 'Timed mocks expose weak areas that untimed reading hides completely.' },
  { title: 'Revise on a schedule', text: 'Frequent short revision beats one long pass before the exam. The material is cumulative.' },
  { title: 'Clear doubts early', text: 'A misconception carried forward contaminates everything built on top of it. Ask in week two, not week ten.' },
];

const learningJourney = [
  { step: '1', title: 'Counselling', text: 'We map the CPL pathway against where you actually are — your subjects, your age, your timeline.' },
  { step: '2', title: 'Enrolment', text: 'Choose the learning mode and batch that fits your schedule.' },
  { step: '3', title: 'Foundation classes', text: 'Aviation fundamentals before the advanced material that assumes them.' },
  { step: '4', title: 'Subject-wise learning', text: 'Each of the five written papers taught as its own structured module.' },
  { step: '5', title: 'Assessment', text: 'Regular mock tests with feedback specific enough to act on.' },
  { step: '6', title: 'Revision and exam strategy', text: 'Intensive revision, question discussion, and paper-order planning before the cycle.' },
  { step: '7', title: 'DGCA examinations', text: 'You sit the papers with the theory behind you.' },
  { step: '8', title: 'On to flight training', text: 'Theory cleared, you move to a flying school for the hours Section J requires.' },
];

const careersAfter = [
  { icon: '✈️', title: 'Commercial pilot', text: 'Flying passenger or cargo aircraft once you hold the licence and the flight experience behind it.' },
  { icon: '🛫', title: 'Airline first officer', text: 'Airline operations follow a CPL, further experience, and the operator\'s own selection process.' },
  { icon: '🎓', title: 'Flight instructor', text: 'Instructing builds hours while you teach, and it is steady work between flying jobs.' },
  { icon: '🛩️', title: 'Charter pilot', text: 'Private and corporate aircraft, flying routes and schedules airlines do not serve.' },
  { icon: '📦', title: 'Cargo pilot', text: 'Freight operations, often at night, with fewer passengers and different pressures.' },
  { icon: '💼', title: 'Corporate aviation', text: 'Business aircraft for companies and executive travel.' },
];

const skillsDeveloped = [
  'Analytical thinking', 'Flight planning', 'Decision-making', 'Problem-solving',
  'Weather interpretation', 'Navigation planning', 'Aviation communication',
  'Risk assessment', 'Operational awareness', 'Safety management',
  'Time management', 'Professional discipline',
];

const LAST_UPDATED = 'August 19, 2026';
const LAST_UPDATED_ISO = '2026-08-19';

export default function DGCAGroundClasses() {
  return (
    <Layout
      title="DGCA Ground Classes | Pilot Training Institute in India | We One Aviation"
      description="DGCA ground classes for the CPL written papers: Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific, plus RTR (A). Six months, online and offline. We One Aviation Academy."
    >
            <Head>
            </Head>
      <StructuredData data={[courseSchema, faqSchema]} />
      <HeroSlider customSlides={heroSlides} asH1={false} />

      {/* Overview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="section-tag">DGCA Ground Classes</div>
              <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                DGCA Ground Classes
              </h1>

              <QuickAnswer question={quickAnswer.question} answer={quickAnswer.answer} />
              <SummaryBox title="DGCA ground classes at a glance" items={summaryItems} />

              {/* Supporting detail. The direct answer is above, not here. */}
              <p className="text-gray-700 leading-relaxed mb-6 text-base">
                  DGCA ground classes prepare candidates for the written examinations required for a Commercial Pilot Licence. Schedule II, Section J, paragraph 1(d) of the Aircraft Rules, 1937 requires passes in Air Regulations, Air Navigation, Meteorology, and Aircraft and Engines, plus a Signals practical examination. We One Aviation Academy runs these classes in Dwarka, New Delhi.
              </p>

              <p className="text-gray-500 text-xs mb-8">{`Last updated: ${LAST_UPDATED}`}</p>

              <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Which subjects do the DGCA ground classes cover?</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Schedule II, Section J, paragraph 1(d) of the Aircraft Rules, 1937 (continued in force by section 43(2) of the Bharatiya Vayuyan Adhiniyam, 2024) names the written papers Air Regulations, Air Navigation, Meteorology, and Aircraft and Engines. On the DGCA Pariksha portal the papers are grouped into five sections: General, Oral, Technical General, Technical Specific and Technical Performance.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
                <table className="w-full text-sm">
                  <caption className="sr-only">DGCA ground-class subjects and what each covers</caption>
                  <thead>
                    <tr className="bg-av-blue text-white">
                      <th scope="col" className="p-3 text-left text-xs font-semibold">Subject</th>
                      <th scope="col" className="p-3 text-left text-xs font-semibold">What it covers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((sub, i) => (
                      <tr key={sub.title} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left align-top">
                          <Link href={sub.href} className="hover:text-av-orange">{sub.title}</Link>
                        </th>
                        <td className="p-3 text-gray-600 text-xs">{sub.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                DGCA ground classes covering every subject in the CPL written examination set.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                DGCA Ground Classes are where students prepare for the DGCA exams. It's similar to regular coaching institutes like IIT or MBBS coaching — the only difference is that here you'll master all DGCA subjects required to obtain a{' '}
                <Link href="/commercial-pilot-license" className="text-av-orange font-semibold hover:underline">
                  Commercial Pilot License (CPL)
                </Link>.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                DGCA Ground Classes are classes where students prepare themselves for the{' '}
                <Link href="/dgca-pariksha" className="text-av-orange font-semibold hover:underline">
                  DGCA exam
                </Link>. It's a normal coaching class, like IIT and MBBS coaching classes. The only difference is that after taking DGCA ground classes, you will master the DGCA exam, which is required to obtain a pilot license.
              </p>

              <ArticleTOC headings={tocHeadings} />

              {/* Quick Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {[['6 Months', 'Course Duration'], ['5 Papers', 'DGCA Written'], ['17+ Years', 'Min Age'], ['25% Off', 'Scholarship']].map(([val, label]) => (
                  <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                    <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                    <div className="text-gray-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* What is DGCA */}
              <h3 id="what-is-dgca" className="font-montserrat text-xl font-bold text-av-blue mb-3">What is the DGCA?</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                The Directorate General of Civil Aviation (DGCA) is the main government body that controls and regulates all aviation-related activities in India. Learn more on our{' '}
                <Link href="/dgca-full-form" className="text-av-orange font-semibold hover:underline">
                  DGCA Full Form
                </Link>{' '}
                page.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                It makes rules for flying, conducts{' '}
                <Link href="/dgca-pariksha" className="text-av-orange font-semibold hover:underline">
                  DGCA exams
                </Link>, and issues pilot licenses.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                To become a pilot, you must follow DGCA regulations and clear DGCA exams. The first step is to obtain your{' '}
                <Link href="/dgca-computer-number" className="text-av-orange font-semibold hover:underline">
                  DGCA Computer Number
                </Link>.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Local students: if you are planning block-flying around Coimbatore, our Coimbatore guide explains how to book multi-day hour-building visits, which local operators commonly accept external students, and recommended nearby accommodation for short stays — see <Link href="/pilot-training-in-india" className="text-av-blue font-semibold hover:underline">Pilot Training in Coimbatore</Link>.
              </p>

              {/* What Does DGCA Do */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">What does the DGCA actually do?</h3>
              <div className="space-y-3 mb-10">
                {dgcaDoes.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                  </div>
                ))}
              </div>

              {/* Why Important */}
              <h3 id="why-are-dgca-ground-classes-important" className="font-montserrat text-xl font-bold text-av-blue mb-3">
                Why are DGCA ground classes important for pilot training?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                DGCA Ground Classes are the first step toward becoming a pilot. If your dream is to become a pilot, you must clear the{' '}
                <Link href="/dgca-pariksha" className="text-av-orange font-semibold hover:underline">
                  DGCA exams
                </Link>{' '}
                — and to do that, these classes are essential.
              </p>
              <p className="text-gray-600 text-sm font-semibold mb-3">Benefits of DGCA Ground Classes:</p>
              <ul className="space-y-2 mb-10">
                {benefits.map((b, i) => (
                  <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Subjects */}
              <h3 id="dgca-ground-classes-subjects" className="font-montserrat text-xl font-bold text-av-blue mb-2">
                Which subjects come up in the DGCA exam?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                There are five DGCA written papers, plus RTR (A) examined separately, in{' '}
                <Link href="/dgca-pariksha" className="text-av-orange font-semibold hover:underline">
                  DGCA Exam
                </Link>.
              </p>
              <div className="space-y-4 mb-6">
                {subjects.map((s) => (
                  <div key={s.num} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between gap-3 bg-av-blue p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.icon}</span>
                        <h4 className="font-montserrat font-bold text-white text-sm">{s.num}. {s.title}</h4>
                      </div>
                      <Link
                        href={s.href}
                        className="text-av-orange text-xs font-semibold bg-white/10 hover:bg-av-orange hover:text-white px-3 py-1 rounded-full transition-all flex-shrink-0"
                      >
                        Learn More →
                      </Link>
                    </div>
                    <div className="p-4 bg-white space-y-1">
                      <p className="text-gray-600 text-xs">{s.short}</p>
                      <p className="text-gray-500 text-xs">📗 <span className="font-semibold">Book Focus:</span> {s.book}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* DGCA CPL Subjects Syllabus */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mt-10 mb-5">
                What does each DGCA CPL subject actually cover?
              </h3>
              <div className="space-y-3 mb-10">
                {subjects.filter(s => s.detail).map((s) => (
                  <div key={s.num} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="flex-shrink-0 w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {s.num}
                    </span>
                    <div>
                      <Link
                        href={s.href}
                        className="font-semibold text-av-blue hover:text-av-orange transition-colors mb-1 inline-block"
                      >
                        {s.title} →
                      </Link>
                      <p className="text-xs leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Duration */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">
                How long do DGCA ground classes take?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                The duration of DGCA Ground Classes may vary between academies.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                At We One Aviation, our full DGCA syllabus is covered in 6 months.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-10">
                However, classes may be extended for students who do not clear exams on their first attempt. View our{' '}
                <Link href="/commercial-pilot-license" className="text-av-orange font-semibold hover:underline">
                  CPL course page
                </Link>{' '}
                for the full training roadmap.
              </p>

              {/* Eligibility */}
              <h3 id="eligibility-for-dgca-ground-classes" className="font-montserrat text-xl font-bold text-av-blue mb-2">
                Who is eligible to join DGCA ground classes?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                To enroll in DGCA Ground Classes and begin your journey toward becoming a{' '}
                <Link href="/commercial-pilot-license" className="text-av-orange font-semibold hover:underline">
                  Commercial Pilot
                </Link>, you must meet the following eligibility criteria:
              </p>
              <div className="space-y-4 mb-6">
                {eligibility.map((item) => (
                  <div key={item.title} className="rounded-xl border border-gray-100 overflow-hidden">
                    <div className="bg-av-blue p-4 flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <h4 className="font-montserrat font-bold text-white text-sm">{item.title}</h4>
                    </div>
                    <div className="p-4 bg-white">
                      <ul className="space-y-1">
                        {item.points.map((pt, i) => (
                          <li key={i} className="flex gap-2 items-start text-xs text-gray-600">
                            <span className="text-av-orange font-bold flex-shrink-0">–</span>
                            {pt.includes('Commercial Pilot License (CPL)') ? (
                              <span>
                                {pt.split('Commercial Pilot License (CPL)')[0]}
                                <Link href="/commercial-pilot-license" className="text-av-orange font-semibold hover:underline">
                                  Commercial Pilot License (CPL)
                                </Link>
                                {pt.split('Commercial Pilot License (CPL)')[1]}
                              </span>
                            ) : pt.includes('DGCA medical certificate') ? (
                              <span>
                                {pt.split('DGCA medical certificate')[0]}
                                <Link href="/commercial-pilot-license-eligibility" className="text-av-orange font-semibold hover:underline">
                                  DGCA medical certificate
                                </Link>
                                {pt.split('DGCA medical certificate')[1]}
                              </span>
                            ) : (
                              pt
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-10">
                If you meet these requirements, you're ready! Join us to begin your journey with We One Aviation Academy – Delhi's trusted name for DGCA Ground Classes and Pilot Training. Also read:{' '}
                <Link href="/commercial-pilot-license-eligibility" className="text-av-orange font-semibold hover:underline">
                  CPL Eligibility Criteria
                </Link>.
              </p>

              {/* Why Choose */}
              <h3 id="why-choose-we-one-aviation-academy" className="font-montserrat text-xl font-bold text-av-blue mb-2">
                Why choose We One Aviation Academy for DGCA ground classes?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                We One Aviation Academy offers flexibility in both study schedule and fee instalments. The points below cover what the ground-class programme includes.
              </p>
              <div className="space-y-3 mb-8">
                {whyChoose.map((item) => (
                  <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">{item.icon}</span>
                    <span>
                      <span className="font-semibold text-av-blue">{item.title} –</span> {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Book Seat CTA */}
              <div className="bg-av-blue rounded-2xl p-8 text-center mb-10">
                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Book Your Seat Now</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                  DGCA ground classes run in both online and offline modes, with mock tests and doubt sessions throughout. Take the first step toward the skies. ✈️
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm"
                >
                  Book Free Counselling For Pilot
                </Link>
              </div>

              <Breadcrumb />
              <AuthorCard />

              {/* ── Merged from /courses/dgca-ground-classes ── */}

              <section aria-labelledby="who-for">
                <h2 id="who-for" className="font-montserrat text-xl font-bold text-av-blue mb-3">Who are DGCA ground classes for?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Anyone heading for a Commercial Pilot Licence, and quite a few people who are already flying. The papers gate the licence, so the theory has to happen either way — the only question is whether you do it with structure or alone with a stack of PDFs.
                </p>
                <ul className="space-y-2 mb-10">
                  {whoShouldJoin.map((item) => (
                    <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                      <span className="text-av-orange font-bold flex-shrink-0">&#8250;</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="why-before-flying">
                <h2 id="why-before-flying" className="font-montserrat text-xl font-bold text-av-blue mb-3">Why do ground classes come before flight training?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Because the alternative is learning navigation and meteorology while an aircraft meter runs. Flying hours are the most expensive part of this licence by a wide margin, and every concept you have to work out mid-air is one you could have settled in a classroom.
                </p>
                <ul className="space-y-2 mb-10">
                  {whyItMatters.map((item) => (
                    <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                      <span className="text-av-orange font-bold flex-shrink-0">&#10003;</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="how-structured">
                <h2 id="how-structured" className="font-montserrat text-xl font-bold text-av-blue mb-3">How are the classes structured?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Five parts, running in parallel rather than in sequence: teaching, discussion, mock testing, performance tracking and doubt clearing. The tracking matters more than students expect — it is what tells you a subject needs more time while there is still time to give it.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {classStructure.map((item) => (
                    <div key={item.title} className="rounded-xl border border-gray-200 p-4">
                      <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.icon} {item.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="online-or-classroom">
                <h2 id="online-or-classroom" className="font-montserrat text-xl font-bold text-av-blue mb-3">Should you choose online or classroom ground classes?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  For the theory itself, online holds up — provided the doubt sessions are live rather than recorded. What online cannot replace is the informal exam-strategy conversation that happens in a room. We run both modes; the table below is the honest comparison.
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
                  <table className="w-full text-sm">
                    <caption className="sr-only">Online versus classroom DGCA ground classes, feature by feature</caption>
                    <thead>
                      <tr className="bg-av-blue text-white">
                        <th scope="col" className="p-3 text-left text-xs font-semibold">Feature</th>
                        <th scope="col" className="p-3 text-left text-xs font-semibold">Online</th>
                        <th scope="col" className="p-3 text-left text-xs font-semibold">Classroom</th>
                      </tr>
                    </thead>
                    <tbody>
                      {learningModes.map((row, i) => (
                        <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">{row.feature}</th>
                          <td className="p-3 text-gray-600 text-xs">{row.online}</td>
                          <td className="p-3 text-gray-600 text-xs">{row.classroom}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section aria-labelledby="study-material">
                <h2 id="study-material" className="font-montserrat text-xl font-bold text-av-blue mb-3">What study material do you get?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Notes per paper, question banks, numerical problem sets and timed mocks. The numerical sets carry most of the weight for Air Navigation, where speed under time pressure is the thing being tested as much as the method.
                </p>
                <ul className="grid sm:grid-cols-2 gap-2 mb-10">
                  {studyMaterial.map((item) => (
                    <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                      <span className="text-av-orange flex-shrink-0">&#8250;</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="how-to-prepare">
                <h2 id="how-to-prepare" className="font-montserrat text-xl font-bold text-av-blue mb-3">How do you prepare effectively for the DGCA papers?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Six habits separate students who clear papers on the first cycle from students who repeat them. None of them is talent.
                </p>
                <ol className="space-y-3 mb-10">
                  {prepareSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-av-orange text-white font-montserrat font-bold text-xs flex items-center justify-center" aria-hidden="true">{i + 1}</span>
                      <span>
                        <span className="block font-montserrat font-bold text-av-blue text-sm mb-1">{step.title}</span>
                        <span className="block text-gray-600 text-sm leading-relaxed">{step.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="the-journey">
                <h2 id="the-journey" className="font-montserrat text-xl font-bold text-av-blue mb-3">What does the journey look like, start to finish?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Eight stages from the first counselling call to walking into a flying school with the theory behind you.
                </p>
                <ol className="space-y-3 mb-10">
                  {learningJourney.map((step) => (
                    <li key={step.step} className="flex gap-4 p-4 rounded-xl border border-gray-200">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-av-blue text-white font-montserrat font-bold text-xs flex items-center justify-center" aria-hidden="true">{step.step}</span>
                      <span>
                        <span className="block font-montserrat font-bold text-av-blue text-sm mb-1">{step.title}</span>
                        <span className="block text-gray-600 text-sm leading-relaxed">{step.text}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="careers-after">
                <h2 id="careers-after" className="font-montserrat text-xl font-bold text-av-blue mb-3">What careers open up after DGCA ground classes?</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Ground classes are theory, not a licence — the careers below all sit behind a CPL and the flying hours that go with it. Hiring rests with the operator, not with us. What the theory does is put the licence within reach.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {careersAfter.map((c) => (
                    <div key={c.title} className="rounded-xl border border-gray-200 p-4">
                      <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">{c.icon} {c.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{c.text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">Along the way the syllabus builds skills that outlast any one exam:</p>
                <ul className="flex flex-wrap gap-2 mb-10">
                  {skillsDeveloped.map((skill) => (
                    <li key={skill} className="bg-av-light text-av-blue text-xs font-semibold px-3 py-1.5 rounded-full">{skill}</li>
                  ))}
                </ul>
              </section>

              <PeopleAlsoAsk items={peopleAlsoAskItems} />

              {/* Latest Blogs */}
              <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Our Latest Blogs</h3>
              <div className="space-y-4 mb-10">
                {blogs.map((blog) => (
                  <div key={blog.title} className="rounded-xl border border-gray-100 p-5 hover:border-av-orange/30 transition-all">
                    <p className="text-gray-400 text-xs mb-1">{blog.date}</p>
                    <h4 className="font-montserrat font-bold text-av-blue text-sm mb-1">{blog.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mb-2">{blog.desc}</p>
                    <Link href={blog.href} className="text-av-orange text-xs font-semibold hover:underline">
                      Read More →
                    </Link>
                  </div>
                ))}
              </div>

              <RelatedArticles items={relatedArticles} />

            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal delay={200}>
              <LeadForm title="Join DGCA Ground Classes" />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-av-blue rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-4">Eligibility Criteria</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li>
                    <Link href="/commercial-pilot-license-eligibility" className="hover:text-av-orange transition-colors">
                      ✓ 10+2 with Physics &amp; Maths
                    </Link>
                  </li>
                  <li>✓ Minimum 18 years of age for a CPL; 16 for a Student Pilot Licence</li>
                  <li>
                    <Link href="/commercial-pilot-license-eligibility" className="hover:text-av-orange transition-colors">
                      ✓ DGCA Medical
                    </Link>
                  </li>
                  <li>✓ English language proficiency</li>
                  <li>✓ Passion &amp; Dedication for aviation</li>
                </ul>
                <Link
                  href="/commercial-pilot-license-eligibility"
                  className="mt-4 block text-center text-xs text-av-orange font-semibold hover:underline"
                >
                  View Full CPL Eligibility →
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-av-orange rounded-2xl p-6 text-white">
                <h4 className="font-montserrat font-bold mb-2">Course Highlights</h4>
                <p className="text-white/80 text-sm mb-3">All-inclusive DGCA Ground School:</p>
                <div className="text-2xl font-montserrat font-black">6 Months</div>
                <div className="text-white/70 text-xs mt-1">Full DGCA Syllabus Coverage</div>
                <div className="text-white/70 text-xs mt-1">25% Scholarship Available</div>
                <a
                  href="https://wa.me/919355611996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all"
                >
                  Get Free Counselling
                </a>
              </div>
            </ScrollReveal>

            {/* Quick Links Sidebar */}
            <ScrollReveal delay={500}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {sidebarQuickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 text-xs text-av-blue hover:text-av-orange transition-colors font-medium"
                      >
                        <span className="text-av-orange">›</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* DGCA Subjects Sidebar */}
            <ScrollReveal delay={600}>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <h4 className="font-montserrat font-bold text-av-blue mb-4">DGCA Subjects</h4>
                <ul className="space-y-2">
                  {subjects.map((s) => (
                    <li key={s.num}>
                      <Link
                        href={s.href}
                        className="flex items-center gap-2 text-xs text-av-blue hover:text-av-orange transition-colors font-medium"
                      >
                        <span>{s.icon}</span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </Layout>
  );
}