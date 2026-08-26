import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import {
  LICENCES, MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EDUCATION, MEDICAL,
  ACADEMY, papersSummary,
} from '../../lib/facts';

/*
 * Third post in the pilot-training cluster, deliberately narrow so it does not
 * compete with its two siblings:
 *   /blogs/what-is-pilot-training-complete-guide          - what training is
 *   /blogs/commercial-pilot-training-programs-...-guide   - choosing a programme
 *   this one                                              - admission mechanics
 *
 * Everything here is paperwork, sequencing and verification. The overlapping
 * reference tables (licence ladder, 200 hours) are carried because the page has
 * to stand alone in a search result, but the prose around them is about getting
 * admitted, not about the regulations in the abstract.
 *
 * No HowTo node: /how-to-become-a-pilot/after-12th holds that intent.
 * No FAQPage or BreadcrumbList node: Layout emits both.
 */
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';
const CANONICAL = 'https://weoneaviation.in/blogs/flight-school-prerequisites-admission-guide';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Flight School Prerequisites in India: Step-by-Step Admission Guide (2026)',
  description:
    'Every prerequisite for flight school admission in India: academic eligibility under Schedule II, DGCA medical fitness, the computer number application and why it gets rejected, the document checklist, the five written papers, RTR (A), and the order the steps must happen in.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Flight school admission',
  keywords: 'flight school prerequisites, pilot training admission process, flight school requirements, DGCA computer number, DGCA medical requirements, flight school documents, pilot training eligibility',
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

const prerequisiteGroups = [
  { group: 'Academic', requirement: EDUCATION.requirement, clause: EDUCATION.clause, whenToSettle: 'Before you shortlist any institute' },
  { group: 'Age', requirement: `${MIN_AGE.CPL} years at licence issue; ground study can start earlier`, clause: 'Section J, para 1(a)', whenToSettle: 'Check the arithmetic against your date of birth early' },
  { group: 'Medical', requirement: 'A certificate of physical fitness from an approved Medical Board', clause: 'Section J, para 1(c)', whenToSettle: 'Before any deposit, without exception' },
  { group: 'Regulatory', requirement: 'A DGCA computer number, obtained through the eGCA portal', clause: 'Prerequisite for sitting any paper', whenToSettle: 'Before your first examination cycle' },
  { group: 'Examination', requirement: papersSummary(), clause: 'Section J, para 1(d)', whenToSettle: 'During and after ground school' },
  { group: 'Radio', requirement: `${RTR.name}, examined separately from the written papers`, clause: 'Section J, para 1(g)', whenToSettle: 'Alongside the written papers' },
  { group: 'Flight time', requirement: `${CPL_HOURS.total} hours total, flown within ${CPL_HOURS.recencyYears} years of applying`, clause: 'Section J, para 1(e)', whenToSettle: 'The long stage — 12 to 18 months' },
  { group: 'Financial', requirement: 'Funding confirmed for the whole path, not the first instalment', clause: 'Not a regulatory requirement, but the most common reason students stop', whenToSettle: 'Before enrolment' },
];

const paperNotes = {
  'Air Navigation': 'Charts, flight planning, dead reckoning, radio aids and position fixing. The heaviest calculation load, and the paper most often carried to a second attempt.',
  'Aviation Meteorology': 'The atmosphere, pressure systems, cloud, visibility, icing and turbulence, plus reading METAR and TAF.',
  'Air Regulations': 'The Aircraft Rules, the ICAO Annexes, rules of the air, licensing provisions and required documents.',
  'Technical General': 'Aerodynamics, airframes, engines, instruments and systems, taught generically rather than for one aircraft.',
  'Technical Specific': 'The same technical ground applied to the aircraft type named in your application.',
};

const admissionSteps = [
  'Confirm your academic eligibility against Schedule II before anything else. Class 12 with Physics and Mathematics, or the NIOS route if your stream was Biology or Commerce.',
  'Book the DGCA-mandated medical assessment with an approved Medical Board. This step decides whether the rest is worth funding.',
  'Apply for your DGCA computer number through the eGCA portal, with documents whose names and dates match exactly.',
  'Join ground classes for the five written papers, and start timed mock tests in the first month rather than the last.',
  'Register for and clear the DGCA papers across examination cycles, one or two at a time.',
  `Sit ${RTR.name} separately. It has its own rules and its own examination, and it is not one of the five papers.`,
  'Shortlist flying schools and verify each one at source — approval status, average hours to licence, completion record.',
  'Complete the flying school admission file and agree written fee terms before transferring anything beyond a nominal booking amount.',
  `Build ${CPL_HOURS.total} hours of flight time against the Schedule II breakdown, keeping the logbook current as you fly.`,
  'Pass the skill test with an examiner, then file for licence issue with a complete document set.',
];

const computerNumberDocs = [
  { item: 'Class 10 certificate', purpose: 'Establishes date of birth. This is the document DGCA treats as authoritative on your age.' },
  { item: 'Class 12 marksheet and certificate', purpose: 'Establishes the Physics and Mathematics requirement.' },
  { item: 'Photo identity', purpose: 'Aadhaar or passport. The name must match your academic records exactly.' },
  { item: 'Passport-size photograph', purpose: 'Recent, plain background, meeting the portal specification for size and format.' },
  { item: 'Signature scan', purpose: 'Clear, on white paper, within the portal size limits.' },
  { item: 'Address proof', purpose: 'Current address as it appears on your other documents.' },
];

const rejectionReasons = [
  'A name that differs between Class 10, Class 12 and Aadhaar — an expanded initial, a dropped surname, a different spelling.',
  'Dates of birth that do not agree across documents, most often between a school record and Aadhaar.',
  'Scans that are cropped, skewed, low-contrast or too compressed to read.',
  'Photographs that do not meet the portal specification for dimensions, background or file size.',
  'An incomplete Class 12 record uploaded while a supplementary result is still pending.',
];

const documentChecklist = [
  { category: 'Academic', items: 'Class 10 marksheet and certificate, Class 12 marksheet and certificate, NIOS records if applicable, and any transfer or migration certificate the school asks for.' },
  { category: 'Identity', items: 'Aadhaar, passport if you have one, and a birth certificate. Names must be consistent across all three.' },
  { category: 'Medical', items: 'Your DGCA medical assessment records and any specialist reports that were part of the assessment.' },
  { category: 'Regulatory', items: 'DGCA computer number, examination admit cards and passed-paper records, and your RTR (A) certificate once obtained.' },
  { category: 'Financial', items: 'Bank statements, loan sanction or pre-approval if you are financing, and proof of funds where a school or a visa requires it.' },
  { category: 'Media', items: 'Passport-size photographs and a signature scan, in the sizes and formats each portal specifies.' },
];

const schoolFactors = [
  { factor: 'DGCA approval, verified at source', detail: 'Check the approval directly with the regulator rather than from a certificate image. Approval status can change, and a lapsed one is not visible on a brochure.' },
  { factor: 'Average hours to licence', detail: 'Ask for the actual average from last year, not the syllabus minimum. The gap between the two is the honest cost of training there.' },
  { factor: 'Fleet against student numbers', detail: 'The student-to-aircraft ratio predicts your flying frequency. A large fleet with a larger student roll is worse than a small fleet with few students.' },
  { factor: 'Serviceability', detail: 'Ask how many aircraft were unserviceable on an average day last month. The answer, or the refusal to give one, tells you what you need to know.' },
  { factor: 'Instructor experience and turnover', detail: 'Frequent instructor changes cost you flights in re-familiarisation. Ask how long the current instructors have been there.' },
  { factor: 'Weather and airspace at that base', detail: 'Monsoon, winter fog and busy controlled airspace all reduce usable flying days. Ask how many days were lost last season.' },
  { factor: 'Written fee terms', detail: 'Inclusions, payment schedule tied to milestones, what triggers an extra charge, and refund conditions — in writing, before any transfer.' },
  { factor: 'Completion record of a real batch', detail: 'Ask what happened to the batch that enrolled two years ago. How many finished, and how long did they take.' },
];

const mistakes = [
  'Paying a flying school before the medical assessment is complete. A medical costs a fraction of a deposit and settles whether anything else is worth starting.',
  'Choosing on quoted price alone. The lowest quote and the lowest total cost are rarely the same school, because extra hours are billed at the same rate everywhere.',
  'Assuming admission leads to a licence, and a licence leads to an airline job. Neither follows automatically, and both are decided by people other than the institute.',
  'Accepting an approval certificate as proof. Verify current status with the regulator instead.',
  'Signing without written fee terms, a milestone-linked payment schedule and stated refund conditions.',
  'Skipping the question of how long recent batches actually took. It is the single most predictive answer you will get.',
  'Letting document name mismatches sit unresolved. They surface at the computer number stage and again at licence issue, and they cost weeks each time.',
];

const careers = [
  { role: 'Airline first officer', reality: 'Airlines run their own selection, and a type rating on the operator’s aircraft sits between the licence and the seat.' },
  { role: 'Flight instructor', reality: 'Requires an instructor rating on top of the CPL. A common route for building hours while being paid to fly.' },
  { role: 'Charter and non-scheduled operations', reality: 'Smaller operators flying on demand. Often the first paid flying a newly licensed pilot does.' },
  { role: 'Corporate and general aviation', reality: 'Business aircraft, aerial survey and similar work, with requirements that vary by operator.' },
];

const costBuckets = [
  { bucket: 'Ground and documentation', covers: 'Ground classes, study material, mock tests, examination fees, medical charges, computer number, RTR (A) and licence filing.', driver: 'Largely fixed. Re-sits and repeat medicals move it.' },
  { bucket: 'Flight training', covers: 'Aircraft hire, instructor time, simulator sessions, landing and navigation charges, multi-engine and instrument ratings.', driver: 'Billed by the hour. Anything that adds hours adds cost.' },
  { bucket: 'Living and incidentals', covers: 'Accommodation, food, travel, headset and kit, insurance, and visa costs if you train abroad.', driver: 'Buffer months, because almost nobody finishes on the first projected date.' },
];

const tocHeadings = [
  { id: 'prerequisites', title: 'What are the prerequisites?' },
  { id: 'education', title: 'Educational requirements' },
  { id: 'age', title: 'Minimum age by licence' },
  { id: 'medical', title: 'Medical requirements' },
  { id: 'admission-process', title: 'The admission process, step by step' },
  { id: 'computer-number', title: 'Getting a DGCA computer number' },
  { id: 'ground-subjects', title: 'The DGCA ground subjects' },
  { id: 'flying-hours', title: 'Flying hours for a CPL' },
  { id: 'documents', title: 'Document checklist' },
  { id: 'cost', title: 'What it costs' },
  { id: 'choosing-a-school', title: 'Choosing a flight school' },
  { id: 'mistakes', title: 'Mistakes to avoid' },
  { id: 'after-cpl', title: 'After the CPL' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const peopleAlsoAsk = [
  {
    q: 'Is there an upper age limit for starting pilot training in India?',
    a: 'Schedule II sets minimum ages, not maximum ones, so there is no regulatory ceiling on beginning training. What does apply with age is medical fitness, which is assessed on the same standard regardless of how old you are, and the practical question of how many years of flying career sit on the other side of the investment.',
  },
  {
    q: 'Can I begin ground school before my computer number arrives?',
    a: 'Yes, and most students do. The computer number is required to sit an examination, not to study for one. Starting classes while the application is processing uses the waiting period productively, which matters because processing time is outside your control.',
  },
  {
    q: 'What happens if the initial medical assessment finds a problem?',
    a: 'It depends entirely on what was found. Some conditions are disqualifying, several are correctable, and a number simply need investigation before a decision. Only the examining authority can tell you which applies. What you should not do is repeat the assessment elsewhere hoping for a different answer — that history follows the application.',
  },
  {
    q: 'Do the DGCA papers I pass expire?',
    a: 'Passed papers are held against your record rather than needing to be re-sat on a fixed schedule, but the flight-time requirement carries its own recency rule: the 200 hours must sit within the five years before you apply for the licence. Plan the theory and the flying so neither waits years for the other.',
  },
  {
    q: 'How many flying schools should I apply to at the same time?',
    a: 'Shortlist three or four and verify each properly rather than applying broadly and comparing brochures. Verification takes real effort per school — approval status, completion records, serviceability, written fee terms — and a shortlist you have actually checked beats a long list you have not.',
  },
];

const related = [
  { lead: 'For what pilot training is and how the licences differ, start with', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'For how the programmes themselves work and what to verify in a school, read', anchor: 'our guide to commercial pilot training programmes', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'The computer number application is covered in detail on', anchor: 'the DGCA computer number page', href: '/dgca-computer-number' },
  { lead: 'The full Schedule II eligibility breakdown, clause by clause, is on', anchor: 'the CPL eligibility page', href: '/commercial-pilot-license-eligibility' },
  { lead: 'Every cost line, itemised, sits on', anchor: 'the cost transparency page', href: '/cost-transparency' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const H3 = 'font-montserrat text-xl md:text-2xl font-bold text-av-blue mt-8 mb-3';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function FlightSchoolPrerequisites() {
  return (
    <BlogPostLayout
      title="Flight School Prerequisites in India: Step-by-Step Admission Guide (2026)"
      description="Flight school prerequisites in India: 10+2 PCM, DGCA medical, computer number, 200 hours, and the complete admission process from eligibility to CPL."
      schema={articleSchema}
      heading="Flight School Prerequisites in India: Step-by-Step Admission Guide (2026)"
      category="Flight school admission"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="13 min"
      quickAnswer={{
        question: 'What are the prerequisites for flight school in India?',
        answer: `Class 10+2 with Physics and Mathematics, a DGCA-mandated medical fitness assessment, a DGCA computer number, ${DGCA_PAPERS.length} written papers, ${RTR.name} examined separately, and ${CPL_HOURS.total} hours of flight training. Age ${MIN_AGE.CPL} applies at licence issue, not at enrolment. This is the regulatory minimum to begin professional pilot training, not a degree and not a job guarantee.`,
      }}
      summaryTitle="Prerequisites at a glance"
      summaryItems={[
        `Minimum ages, Schedule II: SPL ${MIN_AGE.SPL}, PPL ${MIN_AGE.PPL}, CPL ${MIN_AGE.CPL}, ATPL ${MIN_AGE.ATPL}`,
        `Education: ${EDUCATION.requirement}, or the NIOS route for other streams`,
        `Medical: ${MEDICAL.long}, from an approved Medical Board`,
        'Regulatory: a DGCA computer number, obtained through the eGCA portal, before any examination',
        `Examinations: ${DGCA_PAPERS.length} written papers, with ${RTR.name} examined separately`,
        `Flight time: ${CPL_HOURS.total} hours, flown within ${CPL_HOURS.recencyYears} years of applying`,
        `Ground classes at We One Aviation: 6 months, Dwarka or online, teaching since ${ACADEMY.foundedYear}`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/flight-school-prerequisites/hero-admission-checklist.webp"
        width={1200}
        height={630}
        alt="A student assembling academic certificates, a medical file and identity documents at a desk, with a training aircraft visible through the window behind"
        promptId="17"
      />

      <p>
        This guide covers the mechanics of getting admitted: what has to be true, what has to be on
        paper, and the order it has to happen in. For what pilot training actually is, read{' '}
        <Link href="/blogs/what-is-pilot-training-complete-guide" className="text-av-orange font-semibold underline">our complete guide to pilot training</Link>.
        For choosing between programmes and schools,{' '}
        <Link href="/blogs/commercial-pilot-training-programs-complete-guide" className="text-av-orange font-semibold underline">the commercial pilot training guide</Link>{' '}
        goes deeper.
      </p>

      <h2 id="prerequisites" className={H2}>What are the prerequisites for flight school in India?</h2>
      <p>
        Eight prerequisites, in four categories: academic, medical, regulatory and financial. Only
        the first three are set by the Aircraft Rules, 1937, Schedule II. The fourth is not a rule,
        and it stops more students than any rule does.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Flight school prerequisites, their source, and when to settle each</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Category</th>
              <th scope="col" className={TH}>What is required</th>
              <th scope="col" className={TH}>Source</th>
              <th scope="col" className={TH}>When to settle it</th>
            </tr>
          </thead>
          <tbody>
            {prerequisiteGroups.map((g, i) => (
              <tr key={g.group} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{g.group}</td>
                <td className={TD}>{g.requirement}</td>
                <td className={`${TD} text-xs`}>{g.clause}</td>
                <td className={`${TD} text-xs`}>{g.whenToSettle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        A word on scope before you compare institutes. Ground school and flying school are different
        organisations doing different jobs, and many students meet the term &ldquo;flight school&rdquo; without
        realising it can mean either. {ACADEMY.scope}
      </p>

      <h2 id="education" className={H2}>What are the educational requirements for pilot training?</h2>
      <p>
        {EDUCATION.requirement}, under {EDUCATION.clause}. Physics and Mathematics are not there as
        a filter for its own sake. Air Navigation is trigonometry and vector arithmetic under time
        pressure, and Technical General is applied physics. Students who scraped through those
        subjects in Class 12 feel it in ground school.
      </p>
      <p>
        Biology and Commerce students are not shut out. {EDUCATION.altRoute} It costs a few months
        rather than closing the door, and a meaningful share of every batch arrives this way.
      </p>
      <p>
        Verify your own record against the requirement before you pay any institute a significant
        amount. A supplementary result still pending, or a board certificate that names a combined
        subject differently, is far cheaper to resolve before enrolment than after.
      </p>

      <h2 id="age" className={H2}>What is the minimum age for pilot training in India?</h2>
      <p>
        Each licence carries its own minimum, set in its own section of Schedule II. The ages apply
        at licence issue, not at the start of study, which is why students routinely begin ground
        classes a year before they are eligible for the licence they are working towards.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Minimum age for each Indian pilot licence</caption>
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

      <p>
        One naming trap worth knowing at admission. In India, SPL means Student Pilot Licence. In the
        United States the same initials describe a Sport Pilot certificate, a recreational category
        under a different regulator with entirely different privileges. Search results merge them,
        and students arrive believing the Indian SPL carries restrictions it does not have.
      </p>

      <BlogImagePlaceholder
        src="/blog/flight-school-prerequisites/licence-ladder.webp"
        width={1200}
        height={800}
        alt="Four ascending steps representing the progression from Student Pilot Licence through Private and Commercial to Airline Transport Pilot Licence"
        promptId="18"
      />

      <h2 id="medical" className={H2}>What are the medical requirements for pilot training?</h2>
      <p>
        Schedule II requires a certificate of physical fitness from an approved Medical Board. The
        assessment covers vision, hearing, cardiovascular health, neurological history and general
        fitness, and it is conducted by DGCA-empanelled examiners rather than by any doctor.
      </p>
      <p className="font-semibold text-av-blue">{MEDICAL.advice}</p>
      <p>
        Sequence this correctly and it protects everything downstream. Complete the initial
        assessment before you shortlist institutes, and the commercial-standard assessment before you
        pay flying-school fees. The findings that most often stop candidates are colour vision
        deficiency, blood pressure outside limits, ear and sinus problems that will not clear, and
        cardiac findings needing investigation. Some are disqualifying, several are correctable, and
        a few are temporary — and only the examining authority can tell you which applies to you.
      </p>
      <p>
        Spectacles are not in themselves a barrier. Vision that corrects to the required standard is
        assessed on the corrected result. Declare your prescription at the assessment rather than
        leaving it to be discovered; it surfaces either way, and later is worse.
      </p>

      <h2 id="admission-process" className={H2}>What is the step-by-step admission process for flight school?</h2>
      <p>
        Ten steps. The order is not a suggestion — steps two and three protect every rupee spent
        after them, and students who reorder them are the students who lose money.
      </p>
      <ol className="list-decimal pl-6 space-y-3 marker:font-bold marker:text-av-orange">
        {admissionSteps.map((s) => <li key={s}>{s}</li>)}
      </ol>
      <p>
        A longer walk-through of the first ninety days after Class 12 is on{' '}
        <Link href="/how-to-become-a-pilot/after-12th" className="text-av-orange font-semibold underline">the after-12th roadmap</Link>.
      </p>

      <BlogImagePlaceholder
        src="/blog/flight-school-prerequisites/admission-process.webp"
        width={1200}
        height={675}
        alt="A stepped path running from a certificate through a medical file and a portal screen to a training aircraft and a licence document"
        promptId="19"
      />

      <h2 id="computer-number" className={H2}>How do you get a DGCA computer number?</h2>
      <p>
        The computer number is your identity in the DGCA examination system, and you cannot sit a
        paper without one. You apply through the eGCA portal with scanned documents. The
        requirements are unremarkable; what causes trouble is consistency between them.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Documents required for a DGCA computer number application</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Document</th>
              <th scope="col" className={TH}>What it establishes</th>
            </tr>
          </thead>
          <tbody>
            {computerNumberDocs.map((d, i) => (
              <tr key={d.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{d.item}</td>
                <td className={TD}>{d.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className={H3}>Why applications come back</h3>
      <ul className="list-disc pl-6 space-y-2">
        {rejectionReasons.map((r) => <li key={r}>{r}</li>)}
      </ul>
      <p>
        Almost every rejection is a mismatch rather than a missing qualification. Lay your Class 10
        certificate, Class 12 certificate and Aadhaar side by side before you start the application
        and read the name and date of birth on each one character by character. Fixing a school
        record takes weeks; fixing it after a rejection takes those same weeks plus a missed
        examination cycle. Full detail is on{' '}
        <Link href="/dgca-computer-number" className="text-av-orange font-semibold underline">the DGCA computer number page</Link>.
      </p>

      <h2 id="ground-subjects" className={H2}>What subjects do you study in DGCA ground classes?</h2>
      <p>
        {papersSummary()}. That is {DGCA_PAPERS.length} written papers.{' '}
        {RTR.name} is examined separately and is not one of them — worth fixing in your head now,
        because planning around a wrong paper count distorts your whole timeline.
      </p>

      {DGCA_PAPERS.map((paper) => (
        <div key={paper}>
          <h3 className={H3}>{paper}</h3>
          <p>{paperNotes[paper]}</p>
        </div>
      ))}

      <h3 className={H3}>{RTR.name}</h3>
      <p>
        The Radio Telephone Operator (Restricted) certificate covers radio procedure and phraseology.
        Section J paragraph 1(g) requires it for licence issue. {RTR.note} It is examined under the{' '}
        {RTR.instrument}. Our{' '}
        <Link href="/dgca-ground-classes" className="text-av-orange font-semibold underline">DGCA ground classes page</Link>{' '}
        covers how the six-month course is structured across these subjects.
      </p>

      <h2 id="flying-hours" className={H2}>How many flying hours are required for a CPL?</h2>
      <p>
        {CPL_HOURS.total} hours of total flight time, flown within the {CPL_HOURS.recencyYears} years
        immediately before you apply. Every row below sits <strong>inside</strong> that total rather
        than adding to it.
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
        src="/blog/flight-school-prerequisites/flying-hours-composition.webp"
        width={1200}
        height={800}
        alt="One large circle containing four smaller nested segments, showing that the component hour requirements sit inside a single total"
        promptId="20"
      />

      <h2 id="documents" className={H2}>What documents do you need for flight school admission?</h2>
      <p>
        Assemble these once, keep a scanned set and a physical set, and you will use them at four
        separate stages: the computer number application, ground school enrolment, flying school
        admission, and licence issue. Names and dates must agree across every one of them.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Document checklist for flight school admission</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Category</th>
              <th scope="col" className={TH}>What to prepare</th>
            </tr>
          </thead>
          <tbody>
            {documentChecklist.map((d, i) => (
              <tr key={d.category} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{d.category}</td>
                <td className={TD}>{d.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/flight-school-prerequisites/documents-checklist.webp"
        width={1200}
        height={800}
        alt="A neat stack of document folders in categories beside a scanner and a passport-size photograph"
        promptId="21"
      />

      <h2 id="cost" className={H2}>How much does flight school cost in India?</h2>
      <p>
        Indicatively ₹40–70 lakh all in, depending mainly on where you do the flying. Three buckets,
        and only one of them appears in most brochures.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">The three cost buckets in flight school training</caption>
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
        The costs families miss are extra dual instruction, medical renewals, examination re-sits, a
        type rating that sits after the CPL and outside every CPL quote, and buffer months of rent
        when the timeline slips. Itemised current figures are on{' '}
        <Link href="/cost-transparency" className="text-av-orange font-semibold underline">the cost transparency page</Link>.
        A 25% scholarship is available on our ground classes.
      </p>

      <BlogImagePlaceholder
        src="/blog/flight-school-prerequisites/cost-buckets.webp"
        width={1200}
        height={800}
        alt="Three containers of clearly different sizes side by side, the largest representing flight training costs"
        promptId="22"
      />

      <h2 id="choosing-a-school" className={H2}>How do you choose the right flight school in India?</h2>
      <p>
        Eight questions, asked in writing. What separates schools is rarely visible in a brochure,
        and the questions a school declines to answer are as informative as the ones it does.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">What to verify when choosing a flight school</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>What to check</th>
              <th scope="col" className={TH}>Why it decides your outcome</th>
            </tr>
          </thead>
          <tbody>
            {schoolFactors.map((f, i) => (
              <tr key={f.factor} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{f.factor}</td>
                <td className={TD}>{f.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        The DGCA publishes ranking information for Flying Training Organisations. Read the current
        edition rather than a figure quoted in an article, including this one — rankings move, and a
        school quoting a placing without a date is quoting whichever edition suited it best.
      </p>

      <BlogImagePlaceholder
        src="/blog/flight-school-prerequisites/school-selection.webp"
        width={1200}
        height={675}
        alt="A magnifying glass held over three small flight school buildings with aircraft parked beside them"
        promptId="23"
      />

      <h2 id="mistakes" className={H2}>What mistakes should you avoid during admission?</h2>
      <aside className="my-6 rounded-2xl border-l-4 border-av-orange bg-orange-50/60 p-6" aria-label="Admission mistakes to avoid">
        <ul className="list-disc pl-5 space-y-3 text-gray-700">
          {mistakes.map((m) => <li key={m}>{m}</li>)}
        </ul>
      </aside>

      <h2 id="after-cpl" className={H2}>What happens after you get your CPL?</h2>
      <p>
        The licence is the legal minimum that permits paid flying. It is not an appointment, and
        every route below carries requirements on top of it.
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
        What the licence permits, and what still has to happen before an airline seat, is on{' '}
        <Link href="/commercial-pilot-license" className="text-av-orange font-semibold underline">the commercial pilot licence page</Link>.
      </p>

      <h2 id="why-weone" className={H2}>Why choose We One Aviation for the ground stage?</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. The course
        runs six months, offline or online, with batches starting in the first and third week of each
        month. A 25% scholarship is available, and students who do not clear a paper keep attending
        classes at no further cost until they do.
      </p>
      <p>
        Our instructors are pilots. We also help with the admission mechanics this page describes —
        checking your documents for the mismatches that cause computer number rejections, booking the
        medical, and assembling the file a flying school and later the DGCA will ask to see.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
