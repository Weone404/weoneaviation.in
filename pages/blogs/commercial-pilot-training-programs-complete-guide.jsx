import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import {
  MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EDUCATION, MEDICAL,
  ACADEMY, papersSummary,
} from '../../lib/facts';

/*
 * Companion to /blogs/what-is-pilot-training-complete-guide, deliberately not a
 * duplicate of it. That post answers "what is this"; this one answers "how do I
 * choose and verify a programme". The two cross-link rather than competing for
 * the same query, and their FAQ and PAA sets are disjoint from each other and
 * from every existing route.
 *
 * No HowTo node: /how-to-become-a-pilot/after-12th already holds that intent.
 * No FAQPage or BreadcrumbList node: Layout emits both.
 */
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';
const CANONICAL = 'https://weoneaviation.in/blogs/commercial-pilot-training-programs-complete-guide';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Commercial Pilot Training Programs in India: Complete Guide for 2026',
  description:
    'How commercial pilot training programmes work in India: DGCA eligibility under Schedule II Section J, the five written papers, RTR (A), the 200-hour flight-time breakdown, realistic timelines, the three cost buckets, and what to verify before paying any flying school.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Commercial pilot training',
  keywords: 'commercial pilot training programs, commercial pilot training in India, CPL training programs, how to become a commercial pilot, flying schools in India, pilot training fees, CPL course duration',
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

// ─── Data ────────────────────────────────────────────────────────────────────

const eligibilityRows = [
  { req: 'Minimum age', detail: `${MIN_AGE.CPL} years on the date of application for licence issue`, clause: 'Section J, para 1(a)' },
  { req: 'Education', detail: EDUCATION.requirement, clause: EDUCATION.clause },
  { req: 'Medical fitness', detail: 'A certificate of physical fitness from an approved Medical Board', clause: 'Section J, para 1(c)' },
  { req: 'Written examinations', detail: papersSummary(), clause: 'Section J, para 1(d)' },
  { req: 'Radio licence', detail: `${RTR.name}, a current Flight Radio Telephone Operator Licence`, clause: 'Section J, para 1(g)' },
  { req: 'Skill test', detail: 'Flown for an examiner on the type applied for, within the six months before applying', clause: 'Section J, para 1(h)' },
];

const paperNotes = {
  'Air Navigation': 'Charts, flight planning, dead reckoning, radio aids and position fixing. The heaviest calculation load of the five, and the paper most often carried forward to a second attempt.',
  'Aviation Meteorology': 'The atmosphere, pressure systems, cloud, visibility, icing and turbulence, plus reading METAR and TAF. Understanding the systems beats memorising the definitions.',
  'Air Regulations': 'The Aircraft Rules, the ICAO Annexes, rules of the air, licensing provisions and required documents. Dry, and the quickest to clear once you treat it as memory work.',
  'Technical General': 'Aerodynamics, airframes, engines, instruments and systems, taught generically rather than for one aircraft. This is the paper that makes flight training make sense.',
  'Technical Specific': 'The same technical ground applied to the aircraft type named in your application. You sit it against the aircraft you actually intend to fly.',
};

const timeline = [
  { stage: 'Counselling, medical and computer number', typical: '4–8 weeks', note: 'Runs in parallel. The medical decides whether the rest is worth funding.' },
  { stage: 'Ground classes', typical: '6 months', note: 'Offline in Dwarka or online. Papers are attempted during and after, across examination cycles.' },
  { stage: 'Clearing the written papers', typical: 'Varies widely', note: 'Cleared individually, not in one sitting. Attempt pattern matters more than total study hours.' },
  { stage: 'Flight training to 200 hours', typical: '12–18 months in India, often near 12 abroad', note: 'Weather, aircraft serviceability and instructor availability set the real pace.' },
  { stage: 'Skill test and licence file', typical: '4–12 weeks', note: 'Document verification is where a disorganised logbook costs months.' },
];

const durationFactors = [
  { factor: 'Aircraft availability', effect: 'A grounded fleet stops every student at once, regardless of how ready any of them is.' },
  { factor: 'Instructor availability', effect: 'High instructor turnover means repeated hand-offs, and each one costs a few flights of re-familiarisation.' },
  { factor: 'Weather and airport slots', effect: 'Monsoon and winter fog cancel flying days. Busy airports add taxi and hold time that never appears in the logbook as training.' },
  { factor: 'Examination cycles', effect: 'A missed or failed paper waits for the next cycle. Two carried papers can cost more calendar time than a hundred flying hours.' },
  { factor: 'Flying frequency', effect: 'Students who fly consistently need fewer total hours. Long gaps mean re-learning, and re-learning is billed at the same rate.' },
  { factor: 'Medical and documentation holds', effect: 'A medical referred for investigation pauses everything downstream until it clears.' },
];

const costBuckets = [
  { bucket: 'Ground and documentation', covers: 'Ground classes, study material, mock tests, examination fees, medical assessment charges, computer number, RTR (A) and licence filing.', driver: 'Largely fixed. Re-sits and repeat medicals are what move it.' },
  { bucket: 'Flight training', covers: 'Aircraft hire, instructor time, simulator sessions, landing and navigation charges, and the multi-engine and instrument ratings.', driver: 'Billed by the hour. Weather, unserviceable aircraft and extra dual instruction all add hours, and hours are the cost.' },
  { bucket: 'Living and incidentals', covers: 'Accommodation, food, travel, headset and kit, insurance, and visa costs for students training abroad.', driver: 'Buffer months. Almost nobody finishes on the first projected date, and every extra month is rent.' },
];

const indiaVsAbroad = [
  { factor: 'Regulator', india: 'DGCA start to finish, with no conversion step', abroad: 'FAA, Transport Canada, CASA or SACAA, with DGCA conversion on return' },
  { factor: 'Flying phase', india: '12–18 months', abroad: 'Often near 12 months' },
  { factor: 'Main cause of delay', india: 'Weather, slot availability, aircraft serviceability', abroad: 'Visa processing and seasonal weather at northern schools' },
  { factor: 'Paperwork at the end', india: 'Licence issue only', abroad: `Conversion: the ${DGCA_PAPERS.length} DGCA papers, ${RTR.name}, an Indian medical, and verification` },
  { factor: 'Living costs', india: 'Lower, and family is reachable', abroad: 'Higher, and outside the school invoice entirely' },
];

const aircraftCategories = [
  { type: 'Single-engine trainers', role: 'Where almost all early training happens: circuits, general handling, solo consolidation and the bulk of your cross-country flying. Four-seat and two-seat types are both common.' },
  { type: 'Multi-engine aircraft', role: 'Used late in the course for the multi-engine rating. Hours here are more expensive, which is why schools schedule them tightly.' },
  { type: 'Simulators and training devices', role: 'Instrument procedure practice, emergency drills and repeatable scenarios. Schedule II caps how much simulator time counts towards the instrument requirement.' },
  { type: 'Glass versus analogue cockpits', role: 'Modern trainers often carry integrated glass displays. Both matter — an airline will want you comfortable with glass, and analogue instrument scan is what teaches raw flying.' },
];

const readinessChecks = [
  'Motivation that survives the unglamorous parts. Ground school is six months of study, and most of the flying is circuits.',
  'Study discipline without supervision. Nobody chases you through the five papers the way a school chased you through Class 12.',
  'Communication and situational awareness. Radio work under pressure separates students more reliably than stick-and-rudder skill does.',
  'Medical fitness settled early, before any deposit is paid.',
  'A budget with a buffer, not a budget at the minimum. Plan above 200 hours, not at it.',
  'Willingness to relocate and live to somebody else’s schedule for a year or more.',
  'A realistic view of what comes after the licence. The CPL is the start of a career, not the end of a course.',
];

const schoolChecks = [
  { check: 'DGCA approval, verified at source', why: 'Ask for the approval details and check them with the regulator rather than accepting a certificate image. Approval status can change.' },
  { check: 'Average hours to licence, not the minimum', why: 'The gap between a school’s advertised minimum and its actual average is the honest cost of training there.' },
  { check: 'How many students finished within the quoted timeline last year', why: 'A school that cannot answer this is quoting an aspiration. One that can is telling you something real.' },
  { check: 'Fleet size against student numbers', why: 'The student-to-aircraft ratio predicts your flying frequency better than the fleet photograph does.' },
  { check: 'Instructor experience and turnover', why: 'Frequent instructor changes cost you flights. Ask how long the current instructors have been there.' },
  { check: 'Maintenance and serviceability record', why: 'Ask how many aircraft were unserviceable on an average day last month. The answer, or the refusal, tells you a lot.' },
  { check: 'Written fee terms', why: 'Inclusions, payment schedule, what triggers an extra charge, and refund conditions — in writing, before any transfer.' },
  { check: 'What happens if you need extra hours', why: 'Every student needs some. The rate and the process should be agreed at the start, not negotiated when you are halfway through.' },
];

const careers = [
  { role: 'Airline first officer', reality: 'A CPL does not get you there on its own. Airlines run their own selection, and a type rating on the operator’s aircraft sits between the licence and the seat.' },
  { role: 'Flight instructor', reality: 'Requires an instructor rating on top of the CPL. A common route for building hours while being paid to fly.' },
  { role: 'Charter and non-scheduled operations', reality: 'Smaller operators flying on demand. Often the first paid flying a newly licensed pilot does.' },
  { role: 'Corporate and general aviation', reality: 'Business aircraft, aerial survey and similar work. Requirements vary widely between operators.' },
];

const steps = [
  'Take counselling first, and get an honest read on your medical risk, your Class 12 subjects and your total budget before spending anything.',
  'Complete the DGCA-mandated medical assessment with an approved Medical Board.',
  'Apply for your DGCA computer number through the eGCA portal. No computer number, no examination.',
  'Join ground classes for the five written papers, and start timed mock tests early rather than in the last month.',
  'Attempt the DGCA papers across examination cycles, clearing them individually as you become ready.',
  `Sit ${RTR.name} separately, under its own rules. It is not one of the five papers.`,
  'Join a DGCA Flying Training Organisation once your medical and computer number are in hand.',
  `Build ${CPL_HOURS.total} hours of flight time against the Schedule II breakdown, keeping the logbook clean as you go.`,
  'Pass the skill test with an examiner, then file for licence issue with a complete document set.',
];

const tocHeadings = [
  { id: 'what-is-a-programme', title: 'What is a commercial pilot training programme?' },
  { id: 'why-2026', title: 'Why pursue this career now?' },
  { id: 'eligibility', title: 'Who is eligible?' },
  { id: 'ground-subjects', title: 'The DGCA ground subjects' },
  { id: 'flying-hours', title: 'How many flying hours?' },
  { id: 'step-by-step', title: 'Step-by-step process' },
  { id: 'duration', title: 'How long does it take?' },
  { id: 'cost', title: 'What does it cost?' },
  { id: 'india-vs-abroad', title: 'India or abroad?' },
  { id: 'aircraft', title: 'What aircraft do students fly?' },
  { id: 'right-for-you', title: 'Is this right for you?' },
  { id: 'choosing-a-school', title: 'Choosing a flying school' },
  { id: 'careers', title: 'Careers after CPL' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const peopleAlsoAsk = [
  {
    q: 'How many hours will I actually fly beyond the 200-hour minimum?',
    a: 'Most students fly somewhat more than the minimum, and the amount varies by school, weather and how consistently they fly. Ask any school for the average total hours its students logged to licence last year rather than the syllabus figure. Planning at exactly 200 leaves no margin for a repeated flight test or a long weather break.',
  },
  {
    q: 'Does the aircraft type I train on matter for airline recruitment?',
    a: 'Less than students expect. Airlines look at total hours, licence and ratings, examination record and their own selection process, then train you on their aircraft through a type rating. Exposure to both glass and analogue cockpits during training is useful, but no particular trainer type is a requirement.',
  },
  {
    q: 'When do the multi-engine and instrument ratings happen?',
    a: 'Late in the flying phase, once the bulk of single-engine hours are behind you. Both are priced separately from basic flying and both are billed at higher hourly rates, so confirm whether a quoted package includes them before comparing one school’s figure against another’s.',
  },
  {
    q: 'Can I pause commercial pilot training partway through?',
    a: 'You can, and students do — for funding, for a medical referral, or for family reasons. The cost is skill currency: after a long gap you need refresher flying before continuing, billed at the normal rate. The Schedule II recency requirement also means your total flight time must sit within five years of application.',
  },
  {
    q: 'What should my logbook and training file actually contain?',
    a: 'Every flight with date, aircraft, duration, capacity flown and the instructor’s signature, plus your examination record, medical certificate, computer number and licence paperwork. Keep it current as you fly rather than reconstructing it later. Document verification at licence issue is where untidy records turn into months of delay.',
  },
];

const related = [
  { lead: 'For the definitions rather than the programme choice — what training is, and how the licences differ — start with', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'Every cost line, broken down individually, sits on', anchor: 'the cost transparency page', href: '/cost-transparency' },
  { lead: 'The full Schedule II eligibility breakdown, clause by clause, is on', anchor: 'the CPL eligibility page', href: '/commercial-pilot-license-eligibility' },
  { lead: 'The six-month syllabus, batch schedule and scholarship are covered on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
  { lead: 'For the first ninety days after Class 12, step by step, read', anchor: 'the after-12th roadmap', href: '/how-to-become-a-pilot/after-12th' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const H3 = 'font-montserrat text-xl md:text-2xl font-bold text-av-blue mt-8 mb-3';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function CommercialPilotTrainingPrograms() {
  return (
    <BlogPostLayout
      title="Commercial Pilot Training Programs in India: Complete Guide for 2026"
      description="Commercial pilot training in India 2026: eligibility, DGCA exams, 200 flying hours, fees, duration, and the step-by-step path from 12th to CPL and airline cockpit."
      schema={articleSchema}
      heading="Commercial Pilot Training Programs in India: Complete Guide for 2026"
      category="Commercial pilot training"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="16 min"
      quickAnswer={{
        question: 'What is a commercial pilot training programme?',
        answer: `A commercial pilot training programme is the DGCA-regulated route to a Commercial Pilot Licence. It combines ground school for ${DGCA_PAPERS.length} written papers, ${RTR.name} examined separately, a medical fitness assessment, and ${CPL_HOURS.total} hours of flight time. It is not a college degree and not a job guarantee — it is the legal minimum to be paid to fly.`,
      }}
      summaryTitle="Key facts at a glance"
      summaryItems={[
        `Minimum age for licence issue: ${MIN_AGE.CPL} years, Schedule II Section J para 1(a)`,
        `Education: ${EDUCATION.requirement}`,
        `Written examinations: ${DGCA_PAPERS.length} DGCA papers, with ${RTR.name} examined separately`,
        `Flight time: ${CPL_HOURS.total} hours total, flown within ${CPL_HOURS.recencyYears} years of applying`,
        'Typical end-to-end duration: 18 to 24 months, though timelines slip more often than they hold',
        'Indicative all-in cost: ₹40–70 lakh depending on where you fly, with living costs outside that',
        `Ground classes at We One Aviation: 6 months, offline in Dwarka or online, 25% scholarship available, teaching since ${ACADEMY.foundedYear}`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/commercial-pilot-training-programs/hero-training-programme.webp"
        width={1200}
        height={630}
        alt="An Indian student pilot at a ground-school desk with charts, and the same student in the cockpit of a training aircraft, shown as one continuous programme"
        promptId="10"
      />

      <p>
        This guide is about choosing and verifying a programme. If you are still at the stage of
        working out what the licences are and how they differ, read{' '}
        <Link href="/blogs/what-is-pilot-training-complete-guide" className="text-av-orange font-semibold underline">our complete guide to pilot training</Link>{' '}
        first, then come back here.
      </p>

      <h2 id="what-is-a-programme" className={H2}>What is a commercial pilot training programme?</h2>
      <p>
        A commercial pilot training programme is the structured route to a Commercial Pilot Licence
        issued by the Directorate General of Civil Aviation. Three strands run in parallel rather
        than in sequence: written examinations, medical fitness, and logged flight time. Meet all
        three against the standard in the Aircraft Rules, 1937, Schedule II, Section J, and the
        licence is issued.
      </p>
      <p>
        Two things a programme is not. It is not an admission process with a cut-off and a merit
        list — there is no entrance rank, and no institute can shorten the requirements. And it is
        not employment. The licence is what makes it lawful for an operator to pay you to fly; the
        operator still decides whether to.
      </p>
      <p>
        Read the word &ldquo;programme&rdquo; carefully when comparing institutes. Some organisations run ground
        school. Some run flying. A few run both. {ACADEMY.scope}
      </p>

      <h2 id="why-2026" className={H2}>Why pursue a commercial pilot career now?</h2>
      <p>
        Indian carriers have placed large aircraft orders and airport capacity continues to expand,
        which points towards sustained demand for licensed pilots over the coming years. Treat that
        as direction rather than a promise: hiring moves in cycles, and a cycle can turn between the
        day you enrol and the day you hold a licence.
      </p>
      <p>What the career reliably offers, and what it reliably demands:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>A licence recognised as a professional qualification, with a defined progression from first officer towards command.</li>
        <li>Work that changes daily, in an industry that operates internationally.</li>
        <li>Recurrent training and checking for the length of your career — the studying does not stop at the licence.</li>
        <li>Selection that stays competitive, and medical fitness you have to maintain rather than merely obtain.</li>
        <li>A large upfront investment made before any of the above is certain.</li>
      </ul>
      <p>
        Students who go in understanding the last two points finish. Students sold only on the first
        three are the ones who stall halfway.
      </p>

      <h2 id="eligibility" className={H2}>Who is eligible for commercial pilot training in India?</h2>
      <p>
        Six requirements govern the licence, all in Schedule II, Section J. None is set by an
        academy, and none is negotiable. Every reference below points at the primary rule rather
        than a summary of it.
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
        The age applies to licence issue, not to starting. Students routinely begin ground classes at
        17 while finishing Class 12, so the papers are behind them by the time the age and hour
        requirements mature. Biology and Commerce students are not excluded either.{' '}
        {EDUCATION.altRoute}
      </p>

      <h2 id="ground-subjects" className={H2}>What are the DGCA ground subjects for a CPL?</h2>
      <p>
        {papersSummary()}. That is {DGCA_PAPERS.length} written papers.{' '}
        {RTR.name} is examined separately and is not one of them, which is the single most common
        planning error students carry into ground school.
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
        and Section J paragraph 1(g) requires it for licence issue. {RTR.note} It is examined under
        the {RTR.instrument}.
      </p>
      <p>
        Our{' '}
        <Link href="/dgca-ground-classes" className="text-av-orange font-semibold underline">DGCA ground classes page</Link>{' '}
        sets out how the six-month course is structured across these subjects.
      </p>

      <h2 id="flying-hours" className={H2}>How many flying hours are required for a CPL?</h2>
      <p>
        {CPL_HOURS.total} hours of total flight time, flown within the {CPL_HOURS.recencyYears} years
        immediately before you apply. Every row below sits <strong>inside</strong> that total rather
        than adding to it. Reading them as additions produces a plan roughly twice the size of the
        real one, and it is the most common arithmetic mistake students make.
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
        src="/blog/commercial-pilot-training-programs/flying-hours-composition.webp"
        width={1200}
        height={800}
        alt="One large circle containing four smaller nested segments, showing that command, cross-country, instrument and night flying sit inside a single total"
        promptId="11"
      />

      <h2 id="step-by-step" className={H2}>What is the step-by-step process to become a commercial pilot?</h2>
      <p>
        Nine steps, in the order they matter. Students who reorder them — choosing a flying school
        before completing the medical is the usual one — are the students who lose money.
      </p>
      <ol className="list-decimal pl-6 space-y-3 marker:font-bold marker:text-av-orange">
        {steps.map((s) => <li key={s}>{s}</li>)}
      </ol>
      <p>
        A longer walk-through of the first ninety days, written for students who have just finished
        Class 12, is on{' '}
        <Link href="/how-to-become-a-pilot/after-12th" className="text-av-orange font-semibold underline">the after-12th roadmap</Link>.
      </p>

      <h2 id="duration" className={H2}>How long does commercial pilot training take?</h2>
      <p>
        Eighteen to twenty-four months is the usual figure, and it holds for students who book the
        medical early and treat ground school seriously. The stages overlap, so the rows below do
        not sum to the headline number.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Typical commercial pilot training timeline by stage</caption>
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

      <h3 className={H3}>What actually moves the timeline</h3>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Factors affecting commercial pilot training duration</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Factor</th>
              <th scope="col" className={TH}>Effect on your timeline</th>
            </tr>
          </thead>
          <tbody>
            {durationFactors.map((f, i) => (
              <tr key={f.factor} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{f.factor}</td>
                <td className={TD}>{f.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/commercial-pilot-training-programs/training-timeline.webp"
        width={1200}
        height={675}
        alt="A horizontal path running from a school building through a classroom and a training aircraft to a licence document"
        promptId="12"
      />

      <h2 id="cost" className={H2}>How much does commercial pilot training cost in India?</h2>
      <p>
        Indicatively ₹40–70 lakh all in, depending mainly on where you do your flying. Only one of
        the three buckets below is usually quoted in a brochure, and it is not the one that catches
        families out.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">The three cost buckets in commercial pilot training</caption>
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

      <h3 className={H3}>The costs families miss</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Extra dual instruction beyond the syllabus minimum, which almost every student needs.</li>
        <li>Medical renewals, which recur rather than being a one-time charge.</li>
        <li>Examination re-sits, each costing a fee and a full cycle of calendar time.</li>
        <li>A type rating, which sits after the CPL and is never inside a CPL fee quote.</li>
        <li>Buffer months of rent and food when the timeline slips.</li>
      </ul>
      <p>
        Line-by-line current figures are kept on{' '}
        <Link href="/cost-transparency" className="text-av-orange font-semibold underline">the cost transparency page</Link>{' '}
        rather than repeated here, so there is a single place to update when they move. A 25%
        scholarship is available on our ground classes.
      </p>

      <BlogImagePlaceholder
        src="/blog/commercial-pilot-training-programs/cost-buckets.webp"
        width={1200}
        height={800}
        alt="Three containers of clearly different sizes side by side, the largest representing flight training costs"
        promptId="13"
      />

      <h2 id="india-vs-abroad" className={H2}>India or abroad: where should you train?</h2>
      <p>
        Neither is better in the abstract. India keeps you inside the DGCA system throughout, with no
        conversion at the end. Training abroad is often quicker in the flying phase and adds a visa,
        higher living costs, and a licence conversion on return. Budget, medical situation and how
        independently you handle a year away decide it.
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
        Country detail sits on the flying school pages for{' '}
        <Link href="/flying-school/india" className="text-av-orange font-semibold underline">India</Link>,{' '}
        <Link href="/flying-school/usa" className="text-av-orange font-semibold underline">the USA</Link>,{' '}
        <Link href="/flying-school/canada" className="text-av-orange font-semibold underline">Canada</Link>,{' '}
        <Link href="/flying-school/australia" className="text-av-orange font-semibold underline">Australia</Link>{' '}
        and{' '}
        <Link href="/flying-school/south-africa" className="text-av-orange font-semibold underline">South Africa</Link>.
      </p>

      <BlogImagePlaceholder
        src="/blog/commercial-pilot-training-programs/india-vs-abroad.webp"
        width={1200}
        height={675}
        alt="Two flight paths leaving one airport, one looping back domestically and the other crossing an ocean before returning"
        promptId="14"
      />

      <h2 id="aircraft" className={H2}>What aircraft do students fly during training?</h2>
      <p>
        Four categories cover almost every CPL syllabus in India. The specific types differ between
        flying schools, and the fleet belongs to the flying school rather than to a ground school
        like ours, so treat the descriptions below as what to ask about rather than what we operate.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Categories of aircraft and devices used in commercial pilot training</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Category</th>
              <th scope="col" className={TH}>Where it sits in the syllabus</th>
            </tr>
          </thead>
          <tbody>
            {aircraftCategories.map((a, i) => (
              <tr key={a.type} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{a.type}</td>
                <td className={TD}>{a.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Comparisons of flying-school options in India are on{' '}
        <Link href="/flying-school/india" className="text-av-orange font-semibold underline">our India flying school page</Link>.
      </p>

      <BlogImagePlaceholder
        src="/blog/commercial-pilot-training-programs/aircraft-categories.webp"
        width={1200}
        height={675}
        alt="Three aircraft of increasing complexity beside a flight training device, representing single-engine, multi-engine and simulator training"
        promptId="15"
      />

      <h2 id="right-for-you" className={H2}>Is commercial pilot training right for you?</h2>
      <p>
        This is the section most institutes skip, because an honest answer sometimes costs them an
        admission. Work through it before you pay anyone.
      </p>
      <aside className="my-6 rounded-2xl border-l-4 border-av-orange bg-orange-50/60 p-6" aria-label="Readiness checklist">
        <ul className="list-disc pl-5 space-y-3 text-gray-700">
          {readinessChecks.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </aside>
      <p>
        If several of those give you pause, that is information rather than a verdict. Sit with a
        counsellor and work through them one at a time. The expensive mistake is starting anyway and
        discovering the answer in month nine.
      </p>

      <h2 id="choosing-a-school" className={H2}>How do you choose the right flying school for a CPL?</h2>
      <p>
        Eight questions separate schools more reliably than any brochure does. Ask all of them, in
        writing, and pay attention to which ones a school will not answer.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">What to verify before choosing a flying school</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>What to check</th>
              <th scope="col" className={TH}>Why it decides your outcome</th>
            </tr>
          </thead>
          <tbody>
            {schoolChecks.map((c, i) => (
              <tr key={c.check} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.check}</td>
                <td className={TD}>{c.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        A school that answers all eight plainly is worth more than one with better photographs. A
        refusal to answer the maintenance or completion-rate questions is itself the answer.
      </p>

      <h2 id="careers" className={H2}>What career options are available after a CPL?</h2>
      <p>
        A Commercial Pilot Licence is the legal minimum that permits paid flying. It is not an
        appointment. Every route below carries requirements on top of the licence, and the operator
        decides.
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

      <BlogImagePlaceholder
        src="/blog/commercial-pilot-training-programs/career-paths.webp"
        width={1200}
        height={800}
        alt="One path branching into four routes ending at an airliner, a training aircraft, a charter aircraft and a business jet"
        promptId="16"
      />

      <h2 id="why-weone" className={H2}>Why choose We One Aviation for the ground stage?</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. The course
        runs six months, offline or online, with batches starting in the first and third week of
        each month. A 25% scholarship is available, and students who do not clear a paper keep
        attending classes at no further cost until they do.
      </p>
      <p>
        Our instructors are pilots, and we help students with the parts that are not theory: the
        computer number application, booking the medical, and assembling the document file a flying
        school and later the DGCA will ask to see.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">
        {ACADEMY.scope}
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
