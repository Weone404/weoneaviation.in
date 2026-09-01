import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import {
  LICENCES, MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EDUCATION, MEDICAL,
  ACADEMY, agesSummary, papersSummary,
} from '../../lib/facts';

/*
 * Hand-written post, so the dates are constants maintained here. Move
 * DATE_MODIFIED whenever the copy changes: a dateModified that never moves is
 * worse than none, because it tells a crawler the page is stale.
 *
 * No HowTo node on this route. /how-to-become-a-pilot/after-12th already
 * carries HowTo for the same step-by-step intent, and two pages competing for
 * one intent with the same schema type splits the signal. This post links there
 * instead.
 *
 * No FAQPage node either. Layout injects the FAQ block from data/pageFaqs.js and
 * emits the schema alongside it, so the markup and the schema cannot drift.
 */
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';
const CANONICAL = 'https://weoneaviation.in/blogs/what-is-pilot-training-complete-guide';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What is Pilot Training? Complete Guide to PPL and CPL Courses in India (2026)',
  description:
    'What pilot training in India involves: the licence ladder from SPL to ATPL, DGCA eligibility under Schedule II, the five written papers, RTR (A), the 200-hour flying requirement with its full breakdown, timelines, costs and the step-by-step route from Class 12 to a Commercial Pilot Licence.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot training guide',
  keywords: 'what is pilot training, pilot training in India, PPL vs CPL, DGCA ground classes, commercial pilot licence India, pilot training after 12th',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization',
    name: ACADEMY.name,
    url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

// ─── Structured data blocks rendered as tables ───────────────────────────────

const eligibilityRows = [
  { req: 'Minimum age', detail: `${MIN_AGE.CPL} years on the date of application`, clause: 'Section J, para 1(a)' },
  { req: 'Education', detail: EDUCATION.requirement, clause: EDUCATION.clause },
  { req: 'Medical fitness', detail: `A ${MEDICAL.short} — ${MEDICAL.clause.split('—')[1].trim()}`, clause: 'Section J, para 1(c)' },
  { req: 'Written examinations', detail: papersSummary(), clause: 'Section J, para 1(d)' },
  { req: 'Radio licence', detail: `${RTR.name}, examined separately from the written papers`, clause: 'Section J, para 1(g)' },
  { req: 'Skill test', detail: 'Flown for an examiner on the type applied for, within the six months before applying', clause: 'Section J, para 1(h)' },
];

const paperNotes = {
  'Air Navigation': 'Charts, flight planning, dead reckoning, radio aids and position fixing. It carries the heaviest calculation load of the five, and it is the paper students most often re-sit. Timed practice beats reading.',
  'Aviation Meteorology': 'The atmosphere, pressure systems, cloud, visibility, icing, turbulence, and reading METAR and TAF. Students who memorise definitions without understanding the systems behind them tend to come unstuck here.',
  'Air Regulations': 'The Aircraft Rules, the ICAO Annexes, rules of the air, licensing provisions and documents that must be carried. Dry to study, and the fastest paper to clear once you accept it is memory work.',
  'Technical General': 'Aerodynamics, airframes, engines, instruments and systems, taught generically rather than for one aircraft. This is the paper that makes the rest of flight training make sense.',
  'Technical Specific': 'The same technical ground applied to the particular aircraft type you name in your application. You sit it against the aircraft you actually intend to fly.',
};

const timeline = [
  { stage: 'Counselling, medical and computer number', typical: '4–8 weeks', note: 'Runs in parallel. The medical decides whether anything else is worth paying for.' },
  { stage: 'DGCA ground classes', typical: '6 months', note: 'Offline in Dwarka or online. Papers are attempted across examination cycles during and after this.' },
  { stage: 'Clearing the written papers', typical: 'Varies', note: 'Papers are cleared individually, not in one sitting. Attempt pattern matters more than study hours.' },
  { stage: 'Flight training to 200 hours', typical: '12–18 months in India, often around 12 abroad', note: 'Weather, aircraft serviceability and instructor availability set the real pace.' },
  { stage: 'Skill test and licence file', typical: '4–12 weeks', note: 'Document verification is where disorganised logbooks cost months.' },
];

const costBuckets = [
  {
    bucket: 'Ground and documentation',
    covers: 'Ground classes, study material, mock tests, examination fees, medical assessment charges, computer number and licence filing.',
    driver: 'Largely fixed. Re-sits and repeat medicals are what move it.',
  },
  {
    bucket: 'Flight training',
    covers: 'Aircraft hire, instructor time, simulator sessions, landing and navigation charges. The largest bucket by a wide margin.',
    driver: 'Billed by the hour, so anything adding hours adds cost — weather, unserviceable aircraft, extra dual instruction.',
  },
  {
    bucket: 'Living and incidentals',
    covers: 'Accommodation, food, travel, headset and kit, insurance, and visa costs if you train abroad.',
    driver: 'Buffer months. Almost nobody finishes on the first projected date, and every extra month costs rent.',
  },
];

const indiaVsAbroad = [
  { factor: 'Regulator', india: 'DGCA throughout — no conversion step at the end', abroad: 'FAA, Transport Canada, CASA or SACAA, with DGCA conversion on return' },
  { factor: 'Typical flying phase', india: '12–18 months', abroad: 'Often around 12 months' },
  { factor: 'Main cause of delay', india: 'Weather, slot availability, aircraft serviceability', abroad: 'Visa processing, seasonal weather in northern schools' },
  { factor: 'Paperwork at the end', india: 'Licence issue only', abroad: 'Licence conversion: DGCA papers, RTR (A), Indian medical, verification' },
  { factor: 'Living costs', india: 'Lower, and family is reachable', abroad: 'Higher, and outside the school invoice' },
];

const steps = [
  'Book a counselling session and get an honest read on your medical risk, your Class 12 subjects, and your budget before you spend anything.',
  'Complete the DGCA-mandated medical assessment with an approved Medical Board. Do this first, always.',
  'Apply for your DGCA computer number through the eGCA portal — you cannot sit a paper without it.',
  'Join ground classes for the five written papers and begin timed mock tests early rather than at the end.',
  'Attempt the DGCA papers across examination cycles, clearing them individually as you become ready.',
  `Sit ${RTR.name} separately, under its own rules — it is not one of the five papers.`,
  'Join a DGCA Flying Training Organisation, in India or abroad, once your medical and computer number are in hand.',
  `Build ${CPL_HOURS.total} hours of flight time against the Schedule II breakdown, keeping your logbook clean as you go.`,
  'Pass the skill test with an examiner, then file for licence issue with your complete document set.',
];

const mistakes = [
  'Paying a flying school deposit before the medical assessment. A medical costs a fraction of a deposit and settles whether the rest is worth starting.',
  'Collecting study PDFs instead of sitting timed Navigation mocks. Nobody has ever passed a paper by downloading one.',
  'Hiding a spectacle prescription at the assessment. It surfaces later, and it surfaces worse.',
  'Waiting for a "perfect" batch to start. Batches run every month; the delay is yours, not the academy\'s.',
  'Shopping around for a doctor who will pass you. An assessment obtained that way does not survive scrutiny, and the licence file is where it fails.',
  'Budgeting for exactly the minimum hours. Almost nobody finishes on 200 flat, and the funding conversation halfway through is avoidable.',
];

const careers = [
  { role: 'Airline first officer', reality: 'The common goal. A CPL alone does not get you there — airlines want a type rating, an interview and a simulator assessment on top.' },
  { role: 'Flight instructor', reality: 'Requires an instructor rating on top of the CPL. A common route for building hours while being paid to fly.' },
  { role: 'Charter and non-scheduled operations', reality: 'Smaller operators flying on demand. Often the first paid flying a fresh CPL holder does.' },
  { role: 'Corporate and general aviation', reality: 'Business aircraft operations, aerial survey and similar work. Type and role requirements vary widely by operator.' },
];

const tocHeadings = [
  { id: 'what-is-pilot-training', title: 'What is pilot training?' },
  { id: 'licence-types', title: 'Types of pilot licences in India' },
  { id: 'ppl-vs-cpl', title: 'PPL vs CPL: which do you need?' },
  { id: 'eligibility', title: 'Who is eligible?' },
  { id: 'ground-subjects', title: 'What you study in ground classes' },
  { id: 'medical', title: 'Medical requirements' },
  { id: 'flying-hours', title: 'How many flying hours for a CPL?' },
  { id: 'duration', title: 'How long does it take?' },
  { id: 'cost', title: 'What does it cost?' },
  { id: 'india-vs-abroad', title: 'India or abroad?' },
  { id: 'step-by-step', title: 'Step-by-step process' },
  { id: 'careers', title: 'Career options after training' },
  { id: 'mistakes', title: 'Common mistakes to avoid' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const peopleAlsoAsk = [
  {
    q: 'Do airlines ask for a graduation degree alongside the licence?',
    a: 'Requirements differ by operator and change over time, so check the current criteria published by the airline you are targeting rather than relying on what was true a few years ago. What does not change is that the licence, the ratings and the flight time are assessed on their own terms — a degree never substitutes for any of them.',
  },
  {
    q: 'Can I begin ground classes before I turn 18?',
    a: `Yes. The ${MIN_AGE.CPL}-year minimum applies to the Commercial Pilot Licence itself, not to studying for it. Many students start ground classes at 17 while completing Class 12, so their written papers are behind them by the time the age and flying-hour requirements mature.`,
  },
  {
    q: 'Does an Indian pilot licence work in other countries?',
    a: 'Not automatically. Each authority licenses on its own terms, and an Indian licence is normally converted rather than recognised abroad — the same way a foreign licence is converted in India. What travels is the flying experience in your logbook, which every regulator counts.',
  },
  {
    q: 'How is the Student Pilot Licence different from an American Sport Pilot certificate?',
    a: 'They share the initials SPL and nothing else. In India the Student Pilot Licence is the first rung of the ladder, available from age 16, permitting flight training including solo flying under instructor authorisation. The American Sport Pilot certificate is a separate recreational certificate under a different regulator with different privileges. Search results mix the two constantly.',
  },
  {
    q: 'What is a type rating, and is it part of pilot training?',
    a: 'A type rating qualifies you to operate one specific aircraft type, and it sits after the Commercial Pilot Licence rather than inside it. It is a separate course with a separate cost, and it is not included in a CPL fee quote. Treat any budget that omits it as incomplete.',
  },
];

const related = [
  { lead: 'If you are weighing training in India against training abroad, the full budget is broken down line by line on', anchor: 'the cost transparency page', href: '/cost-transparency' },
  { lead: 'The complete Schedule II eligibility breakdown, clause by clause, is on', anchor: 'the CPL eligibility page', href: '/commercial-pilot-license-eligibility' },
  { lead: 'The six-month syllabus, batch schedule and scholarship are covered on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
  { lead: 'For a step-by-step walk through the first ninety days after Class 12, read', anchor: 'the after-12th roadmap', href: '/how-to-become-a-pilot/after-12th' },
  { lead: 'The DGCA itself, its role and the examination system it runs, is explained in', anchor: 'our DGCA guide', href: '/blogs/dgca-exam-guide' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const H3 = 'font-montserrat text-xl md:text-2xl font-bold text-av-blue mt-8 mb-3';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function WhatIsPilotTraining() {
  return (
    <BlogPostLayout
      title="What is Pilot Training? Complete Guide to PPL and CPL Courses in India (2026)"
      description="What is pilot training in India? Complete guide to PPL and CPL: eligibility, DGCA exams, 200 flying hours, fees, duration, and the step-by-step path from 12th to cockpit."
      schema={articleSchema}
      heading="What is Pilot Training? Complete Guide to PPL and CPL Courses in India (2026)"
      category="Pilot training guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="14 min"
      quickAnswer={{
        question: 'What is pilot training?',
        answer: `Pilot training is the DGCA-regulated path to a licence. It combines ground school for ${DGCA_PAPERS.length} written papers, ${RTR.name} examined separately, a medical fitness assessment, and ${CPL_HOURS.total} hours of flight time. It is not a college degree and not a job guarantee — it is the legal minimum to be paid to fly.`,
      }}
      summaryTitle="Key facts at a glance"
      summaryItems={[
        `Minimum ages, Aircraft Rules 1937 Schedule II: ${agesSummary()}`,
        `Written examinations: ${DGCA_PAPERS.length} DGCA papers, with ${RTR.name} examined separately`,
        `Flight time for a CPL: ${CPL_HOURS.total} hours total, flown within ${CPL_HOURS.recencyYears} years of applying`,
        'Typical end-to-end duration: 18 to 24 months, though timelines slip more often than they hold',
        'Ground classes at We One Aviation: 6 months, offline in Dwarka or online, with a 25% scholarship available',
        `Teaching the DGCA ground subjects since ${ACADEMY.foundedYear}`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/hero-classroom-to-cockpit.webp"
        width={1200}
        height={630}
        alt="An Indian student pilot moving from a ground-school classroom desk to the cockpit of a training aircraft, shown as a single continuous journey"
        promptId="1"
      />

      <h2 id="what-is-pilot-training" className={H2}>What is pilot training?</h2>
      <p>
        Pilot training is the regulated process of earning a pilot licence from the Directorate
        General of Civil Aviation. It has three parts that run in parallel rather than in sequence:
        theory examinations, medical fitness, and logged flight time. Clear all three against the
        standard set in the Aircraft Rules, 1937, Schedule II, and the DGCA issues your licence.
      </p>
      <p>
        Understanding what pilot training is <em>not</em> saves students more money than any other
        paragraph on this page. It is not a college degree. No university confers a pilot licence,
        and no licence carries academic credit. It is not an admission process with a cut-off and a
        merit list. And it is not a job. A Commercial Pilot Licence is the legal minimum that allows
        an operator to pay you to fly; the operator still decides whether to hire you.
      </p>
      <p>
        We One Aviation teaches the ground subjects and helps students place with partner flying
        schools. {ACADEMY.scope.split('—')[0].trim()}. That boundary matters when you are comparing
        institutes, because an academy that teaches theory and an organisation that owns aircraft
        are answering two different questions, and only one of them can put hours in your logbook.
      </p>

      <h2 id="licence-types" className={H2}>What are the different types of pilot licences in India?</h2>
      <p>
        Four licences form a ladder, each with its own minimum age and its own section of Schedule
        II. You do not have to climb every rung, but you cannot skip the commercial one if you
        intend to be paid.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Indian pilot licences, minimum ages and what each permits</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Licence</th>
              <th scope="col" className={`${TH} text-right`}>Minimum age</th>
              <th scope="col" className={TH}>Schedule II</th>
              <th scope="col" className={TH}>What it permits</th>
            </tr>
          </thead>
          <tbody>
            {LICENCES.map((l, i) => (
              <tr key={l.code} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{l.code} — {l.name}</td>
                <td className={`${TD} text-right tabular-nums font-semibold`}>{l.minAge}</td>
                <td className={`${TD} whitespace-nowrap`}>{l.section}</td>
                <td className={TD}>{l.permits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/licence-ladder.webp"
        width={1200}
        height={800}
        alt="Four ascending steps representing the progression from Student Pilot Licence through Private and Commercial to Airline Transport Pilot Licence"
        promptId="2"
      />

      <h3 className={H3}>One disambiguation worth knowing</h3>
      <p>
        In India, SPL means Student Pilot Licence. In the United States, the same initials are used
        for a Sport Pilot certificate, which is a recreational category under a different regulator
        with entirely different privileges. Search results merge the two constantly, and students
        arrive at counselling believing the Indian SPL has restrictions it does not have. If a page
        describes an SPL with weight limits and day-VFR-only rules, it is describing the American
        certificate, not the Indian licence.
      </p>

      <h2 id="ppl-vs-cpl" className={H2}>PPL vs CPL: which one do you need?</h2>
      <p>
        If you want to be paid to fly, you need a CPL. A PPL never permits paid flying, whatever
        hours you hold. The reason students still take a PPL first is that its hours count towards
        the commercial total, so the ladder costs no more than the jump when planned properly.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Private Pilot Licence compared with Commercial Pilot Licence</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Point of comparison</th>
              <th scope="col" className={TH}>PPL</th>
              <th scope="col" className={TH}>CPL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={`${TD} font-semibold text-av-blue`}>Purpose</td>
              <td className={TD}>Personal and recreational flying</td>
              <td className={TD}>Flying for payment</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={`${TD} font-semibold text-av-blue`}>Minimum age</td>
              <td className={`${TD} tabular-nums`}>{MIN_AGE.PPL}</td>
              <td className={`${TD} tabular-nums`}>{MIN_AGE.CPL}</td>
            </tr>
            <tr className="bg-white">
              <td className={`${TD} font-semibold text-av-blue`}>Flight time</td>
              <td className={TD}>Lower requirement; hours carry forward to the CPL total</td>
              <td className={`${TD} tabular-nums`}>{CPL_HOURS.total} hours total</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={`${TD} font-semibold text-av-blue`}>Payment permitted</td>
              <td className={TD}>Never</td>
              <td className={TD}>Yes, subject to ratings and operator requirements</td>
            </tr>
            <tr className="bg-white">
              <td className={`${TD} font-semibold text-av-blue`}>Who it suits</td>
              <td className={TD}>Someone flying for their own reasons, or building towards a CPL gradually</td>
              <td className={TD}>Anyone intending a career in the cockpit</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The <Link href="/ppl-full-form" className="text-av-orange font-semibold underline">private licence page</Link>{' '}
        covers PPL privileges and limitations in full, and{' '}
        <Link href="/courses/cpl" className="text-av-orange font-semibold underline">the CPL programme page</Link>{' '}
        carries the complete eligibility and flight-time tables.
      </p>

      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/ppl-vs-cpl.webp"
        width={1200}
        height={675}
        alt="Two runways diverging from a single starting point, one leading to a small private aircraft and the other to an airliner"
        promptId="3"
      />

      <h2 id="eligibility" className={H2}>Who is eligible for pilot training in India?</h2>
      <p>
        Six requirements govern a Commercial Pilot Licence, all set out in Schedule II, Section J.
        They are not negotiable and they are not set by any academy. Every clause reference below
        points at the primary instrument rather than a summary of it.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">CPL eligibility requirements with Schedule II clause references</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Requirement</th>
              <th scope="col" className={TH}>What the rule says</th>
              <th scope="col" className={TH}>Clause</th>
            </tr>
          </thead>
          <tbody>
            {eligibilityRows.map((r, i) => (
              <tr key={r.req} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.req}</td>
                <td className={TD}>{r.detail}</td>
                <td className={`${TD} whitespace-nowrap text-xs`}>{r.clause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Students from a Biology or Commerce stream are not excluded. {EDUCATION.altRoute} It adds
        time rather than closing the door, and it is a well-worn route — a good share of every batch
        arrives this way.
      </p>

      <h2 id="ground-subjects" className={H2}>What subjects do you study in DGCA ground classes?</h2>
      <p>
        {papersSummary()}. That is {DGCA_PAPERS.length} papers, not nine, and not six.{' '}
        {RTR.name} is examined separately and is not one of them — the single most common error on
        competing pages, and the one that leaves students planning for exams that do not exist.
      </p>

      {DGCA_PAPERS.map((paper) => (
        <div key={paper}>
          <h3 className={H3}>{paper}</h3>
          <p>{paperNotes[paper]}</p>
        </div>
      ))}

      <h3 className={H3}>{RTR.name}</h3>
      <p>
        The Radio Telephone Operator (Restricted) certificate covers radio procedure and phraseology,
        and it is required for licence issue under Section J paragraph 1(g). {RTR.note} It is
        examined under the {RTR.instrument}. Students returning from overseas training routinely
        underestimate it, because no equivalent sat in their foreign syllabus.
      </p>
      <p>
        Our{' '}
        <Link href="/dgca-ground-classes" className="text-av-orange font-semibold underline">DGCA ground classes page</Link>{' '}
        covers how the six-month course is structured across these subjects.
      </p>

      <h2 id="medical" className={H2}>What are the medical requirements for pilot training?</h2>
      <p>
        Schedule II requires a certificate of physical fitness from an approved Medical Board. The
        assessment covers vision, hearing, cardiovascular health, neurological history and general
        fitness, and it is conducted by DGCA-empanelled examiners rather than by any doctor.
      </p>
      <p className="font-semibold text-av-blue">
        {MEDICAL.advice}
      </p>
      <p>
        Timing is the part students get wrong. Book the initial assessment before you commit to any
        institute, and complete the commercial-standard assessment before you pay flying-school
        fees. The conditions that most often stop candidates are colour vision deficiency, blood
        pressure outside limits, ear and sinus problems that will not clear, and cardiac findings
        that need investigation. Some are disqualifying, several are correctable, and a few are
        temporary. Only the examining authority can tell you which applies to you — no academy can,
        and any institute that promises you a result has told you something it cannot know.
      </p>
      <p>
        The full eligibility picture, including the medical, sits on{' '}
        <Link href="/commercial-pilot-license-eligibility" className="text-av-orange font-semibold underline">the CPL eligibility page</Link>.
      </p>

      <h2 id="flying-hours" className={H2}>How many flying hours do you need for a CPL?</h2>
      <p>
        {CPL_HOURS.total} hours of total flight time, flown within the {CPL_HOURS.recencyYears} years
        immediately before you apply. The rows below sit <strong>inside</strong> that total. They are
        not added to it. Reading them as additions is the most common arithmetic error students make,
        and it produces a budget roughly twice the real one.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">CPL flight time requirements under Schedule II Section J paragraph 1(e)</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Component</th>
              <th scope="col" className={`${TH} text-right`}>Hours</th>
              <th scope="col" className={TH}>Condition</th>
              <th scope="col" className={TH}>Clause</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-av-light/40">
              <td className={`${TD} font-bold text-av-blue`}>Total flight time</td>
              <td className={`${TD} text-right tabular-nums font-bold text-av-blue`}>{CPL_HOURS.total}</td>
              <td className={TD}>Flown within {CPL_HOURS.recencyYears} years of application</td>
              <td className={`${TD} whitespace-nowrap text-xs`}>{CPL_HOURS.clause}</td>
            </tr>
            {CPL_HOURS.components.map((c, i) => (
              <tr key={c.label} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.label}</td>
                <td className={`${TD} text-right tabular-nums font-semibold`}>{c.hours}</td>
                <td className={TD}>{c.note}</td>
                <td className={`${TD} whitespace-nowrap text-xs`}>{c.clause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/flying-hours-composition.webp"
        width={1200}
        height={800}
        alt="A single large circle containing four smaller nested segments, showing that command, cross-country, instrument and night flying all sit inside one total rather than adding to it"
        promptId="4"
      />

      <h2 id="duration" className={H2}>How long does pilot training take?</h2>
      <p>
        Eighteen to twenty-four months is the usual answer, and it holds for students who start the
        medical early and treat ground school seriously. The stages overlap, which is why the row
        totals below do not sum to the headline figure.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Typical pilot training timeline by stage</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>Typical duration</th>
              <th scope="col" className={TH}>What decides it</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((t, i) => (
              <tr key={t.stage} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{t.stage}</td>
                <td className={`${TD} whitespace-nowrap`}>{t.typical}</td>
                <td className={TD}>{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Four things cause almost every delay we see: a medical held for investigation, a written
        paper carried forward across cycles, weather and unserviceable aircraft at the flying school,
        and visa processing for students training abroad. None of them is unusual. Plan for one of
        them and the timeline holds.
      </p>

      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/training-timeline.webp"
        width={1200}
        height={675}
        alt="A horizontal path running from a school building through a classroom and a training aircraft to a licence document, marking the stages of pilot training"
        promptId="5"
      />

      <h2 id="cost" className={H2}>How much does pilot training cost in India?</h2>
      <p>
        Costs fall into three buckets, and only one of them is quoted in most brochures. Flight
        training dominates the total. Ground and documentation is comparatively small and largely
        fixed. Living costs sit outside every school invoice and are the bucket families forget.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">The three cost buckets in pilot training</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Bucket</th>
              <th scope="col" className={TH}>What sits inside it</th>
              <th scope="col" className={TH}>What moves the number</th>
            </tr>
          </thead>
          <tbody>
            {costBuckets.map((b, i) => (
              <tr key={b.bucket} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{b.bucket}</td>
                <td className={TD}>{b.covers}</td>
                <td className={TD}>{b.driver}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Current figures for each line — examination fees, medical charges, ground-class fees, flying
        rates by country — are kept on{' '}
        <Link href="/cost-transparency" className="text-av-orange font-semibold underline">the cost transparency page</Link>{' '}
        rather than repeated here, so there is one place to update when they move.
      </p>

      <h3 className={H3}>The costs families miss</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Extra dual instruction beyond the syllabus minimum, which almost every student needs.</li>
        <li>Medical renewals, which recur rather than being a one-time charge.</li>
        <li>Examination re-sits, each costing a fee and, more expensively, a full cycle of calendar time.</li>
        <li>A type rating, which sits after the CPL and is never included in a CPL fee quote.</li>
        <li>Buffer months of rent and food when the timeline slips, which it usually does.</li>
      </ul>

      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/cost-buckets.webp"
        width={1200}
        height={800}
        alt="Three containers of clearly different sizes side by side, the largest representing flight training costs and the smallest representing ground and documentation"
        promptId="6"
      />

      <h2 id="india-vs-abroad" className={H2}>India or abroad: where should you train?</h2>
      <p>
        Neither is better in the abstract. Training in India keeps you inside the DGCA system from
        start to finish, with no conversion step at the end. Training abroad is often faster in the
        flying phase and adds a visa, higher living costs, and a licence conversion when you return.
        The right answer depends on your budget, your medical situation, and how independently you
        handle being far from home at nineteen.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Training in India compared with training abroad</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Factor</th>
              <th scope="col" className={TH}>India</th>
              <th scope="col" className={TH}>Abroad</th>
            </tr>
          </thead>
          <tbody>
            {indiaVsAbroad.map((r, i) => (
              <tr key={r.factor} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.factor}</td>
                <td className={TD}>{r.india}</td>
                <td className={TD}>{r.abroad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Country-by-country detail sits on the flying school pages for{' '}
        <Link href="/flying-school/india" className="text-av-orange font-semibold underline">India</Link>,{' '}
        <Link href="/flying-school/usa" className="text-av-orange font-semibold underline">the USA</Link>,{' '}
        <Link href="/flying-school/canada" className="text-av-orange font-semibold underline">Canada</Link>,{' '}
        <Link href="/flying-school/australia" className="text-av-orange font-semibold underline">Australia</Link>{' '}
        and{' '}
        <Link href="/flying-school/south-africa" className="text-av-orange font-semibold underline">South Africa</Link>.
      </p>

      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/india-vs-abroad.webp"
        width={1200}
        height={675}
        alt="Two flight paths leaving one airport, one curving back to land domestically and the other crossing an ocean before returning"
        promptId="7"
      />

      <h2 id="step-by-step" className={H2}>What is the step-by-step process to become a pilot?</h2>
      <p>
        Nine steps, in the order they bite. Students who reorder them — picking a flying school
        before the medical, most often — are the ones who lose money.
      </p>
      <ol className="list-decimal pl-6 space-y-3 marker:font-bold marker:text-av-orange">
        {steps.map((s) => <li key={s}>{s}</li>)}
      </ol>
      <p>
        A fuller walk-through of the first ninety days, written for students who have just finished
        Class 12, is on{' '}
        <Link href="/how-to-become-a-pilot/after-12th" className="text-av-orange font-semibold underline">the after-12th roadmap</Link>.
      </p>

      <h2 id="careers" className={H2}>What career options do you have after pilot training?</h2>
      <p>
        A Commercial Pilot Licence is the legal minimum that permits paid flying. What it is not is
        an appointment. Every route below has requirements sitting on top of the licence, and the
        operator decides.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Career routes after a Commercial Pilot Licence</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Route</th>
              <th scope="col" className={TH}>What it actually requires</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((c, i) => (
              <tr key={c.role} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{c.role}</td>
                <td className={TD}>{c.reality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        What the licence permits, and what still has to happen before an airline seat, is set out on{' '}
        <Link href="/commercial-pilot-license" className="text-av-orange font-semibold underline">the commercial pilot licence page</Link>.
      </p>

      <h2 id="mistakes" className={H2}>What mistakes should you avoid?</h2>
      <aside className="my-6 rounded-2xl border-l-4 border-av-orange bg-orange-50/60 p-6" aria-label="Common mistakes to avoid">
        <ul className="list-disc pl-5 space-y-3 text-gray-700">
          {mistakes.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </aside>

      <h2 id="why-weone" className={H2}>Why choose We One Aviation for ground classes?</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. The course
        runs six months, offline or online, with batches starting in the first and third week of
        each month. A 25% scholarship is available. Students who do not clear a paper keep attending
        classes at no further cost until they do.
      </p>
      <p>
        Our instructors are pilots, and we help students through the parts that have nothing to do
        with theory: the computer number application, the medical booking, and the document file
        that a flying school and later the DGCA will want to see.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">
        {ACADEMY.scope}
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
