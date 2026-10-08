import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import {
  DGCA_PAPERS, RTR, EDUCATION, MIN_AGE, MEDICAL_STANDARDS, EXAM_RULES, PARIKSHA, SYLLABUS, ACADEMY, inr,
} from '../../lib/facts';
import {
  H2, H3, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE,
  listJoin, articleSchemaFor, faqSchemaFrom,
} from '../../lib/blogKit';

/*
 * /blogs/dgca-ground-school-guide — REWRITTEN 2026-10-08 to data/blog-standard.md.
 *
 * INTENT. How to get through DGCA ground school: what each paper asks of you,
 * how to sequence attempts, a study plan, what to do after a failed paper, and
 * how to choose a ground school. The examination rules themselves (fees,
 * sessions, booking, validity) belong to /blogs/dgca-exam-guide and are linked,
 * not repeated.
 *
 * WHAT CHANGED. Difficulty labels ("Highest", "Lowest") and statistical claims
 * ("Air Navigation is re-sat most, by a clear margin"; "students who attempt all
 * five usually clear two") had no data behind them. The teaching observations
 * are kept and labelled as our experience, which is what they are. Two
 * unlabelled bar-chart images implied data that does not exist and are
 * removed. An unverified "repeat classes at no further cost" offer is removed.
 * The pageFaqs.js entry is deleted; the post emits its own FAQPage.
 */
const SLUG = 'dgca-ground-school-guide';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-10-08';
const HEADING = 'DGCA Ground School (2027): How to Prepare for and Clear the Five Papers';
const DESCRIPTION = 'DGCA ground school explained: what each of the five papers demands, how to sequence attempts, a study plan, and what to do after a failed paper.';

const regular = PARIKSHA.calendar2026.regular;

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA ground school',
  keywords: 'DGCA ground school, DGCA ground classes, DGCA exam preparation, how to prepare for DGCA exams, DGCA subjects, DGCA papers study plan',
  image: '/blog/dgca-ground-school/hero-ground-school.webp',
});

const subjects = {
  'Air Navigation': {
    covers: 'Charts and projections, dead reckoning, flight planning, fuel, radio navigation aids and position fixing.',
    demand: 'Arithmetic under time pressure. In our classes, the students who struggle are the ones who read it rather than worked it.',
    prepare: 'Timed problems from the first week, marked and reviewed.',
  },
  'Aviation Meteorology': {
    covers: 'The atmosphere, pressure systems, wind, cloud, visibility, icing, thunderstorms, turbulence, and reading METAR and TAF.',
    demand: 'It reads easily and examines precisely; memorised definitions do not survive application questions.',
    prepare: 'Decode a live METAR and TAF for a nearby airport every day.',
  },
  'Air Regulations': {
    covers: 'The Aircraft Rules, the ICAO Annexes, rules of the air, licensing, documents to be carried and airspace.',
    demand: 'Largely memory work, and best learned little and often.',
    prepare: 'Spaced repetition, working from the regulations themselves.',
  },
  'Technical General': {
    covers: 'Aerodynamics, airframes, piston and turbine engines, propellers, instruments and systems, taught generically.',
    demand: 'Applied physics; it rewards understanding the mechanism behind each figure.',
    prepare: 'Derive before you memorise. A number you can explain is a number you remember.',
  },
  'Technical Specific': {
    covers: 'The same technical ground applied to the aircraft type you name: its systems, limitations and performance.',
    demand: 'Narrower than Technical General and tied to one type.',
    prepare: 'Work from the manual of the type you have actually named; your flying school can tell you which.',
  },
};

const plan = [
  { stage: 'Weeks 1–4', focus: 'Air Navigation fundamentals with timed practice from the start, and Air Regulations.' },
  { stage: 'Months 2–3', focus: 'Technical General alongside continuing Navigation. Begin Meteorology and daily METAR decoding.' },
  { stage: 'First session', focus: 'Attempt two papers you are ready for, often Air Regulations and Meteorology.' },
  { stage: 'Following months', focus: 'Technical Specific for your type, Navigation consolidation, and RTR (A) preparation in its own slot.' },
  { stage: 'Later sessions', focus: 'The remaining papers, one or two at a time, watching the five-year window from your first pass.' },
];

const afterFailure = [
  { step: 'Work out whether it was knowledge or time', detail: 'Running out of time needs timed drills; wrong answers need the concept retaught. The two look the same on a result and need opposite fixes.' },
  { step: 'Do not rebook on the same preparation', detail: 'Change how you practise before you book again, or the next result will look the same.' },
  { step: 'Keep the other papers moving', detail: `Each paper needs ${EXAM_RULES.theory.passMark}% on its own, so a failure touches only that paper.` },
  { step: 'Use the gap', detail: 'The wait until the next session is study time you did not plan for. Spend it on the weak area.' },
];

const choosing = [
  'What share of last year’s students cleared each paper at the first attempt?',
  'Are mock tests timed and marked by an instructor, or self-scored?',
  'Who answers doubts, and how quickly?',
  'What happens, in writing, if you have not cleared a paper by the end of the course?',
  'Can classes be taken online if you move to a flying school in another state?',
];

const peopleAlsoAsk = [
  {
    q: 'What is DGCA ground school?',
    a: `DGCA ground school is the theory stage of pilot training in India. It prepares you for the ${DGCA_PAPERS.length} DGCA written papers, ${listJoin(DGCA_PAPERS)}, each needing ${EXAM_RULES.theory.passMark}%, with ${RTR.name} examined separately under its own rules.`,
  },
  {
    q: 'How long does DGCA ground school take?',
    a: 'No regulation sets the length of DGCA ground school; courses are set by each institute. What decides how long the theory stage really takes is how many papers you attempt per session and how many you pass first time, since each paper waits for the next session if it is failed.',
  },
  {
    q: 'Can I attempt DGCA papers while still in ground classes?',
    a: `Yes, and it is usually the better plan. Papers are passed one at a time, so attempting two while studying the rest spreads the load across sessions. You need a DGCA computer number first, which can be applied for from age ${PARIKSHA.basics.minAge}.`,
  },
  {
    q: 'Which DGCA paper is the hardest?',
    a: 'DGCA publishes no pass rates by paper, so no one can say which is hardest with data. In our teaching experience, Air Navigation is the one students most often under-prepare for, because it is examined under time pressure and rewards worked practice over reading.',
  },
  {
    q: 'How often are the DGCA exams held?',
    a: `DGCA holds ${regular.length} regular sessions a year, plus on-demand sessions at a higher fee. In 2026 the regular sessions are ${regular.map((r) => r.dates).join('; ')}, which DGCA marks as tentative.`,
  },
  {
    q: 'Is online DGCA ground school as good as classroom?',
    a: 'Online ground school can work as well as a classroom when it includes live doubt sessions and timed, marked mock tests. What separates outcomes is whether someone marks your worked problems and answers your questions, not the medium. Recorded lectures alone are the weak form of either.',
  },
  {
    q: 'Do I need a medical before joining ground school?',
    a: 'No medical is needed to join ground school or to sit the DGCA papers. It is still wise to take the Class 1 medical early, before paying a flying school, because a finding there decides whether the licence route is open.',
  },
  {
    q: 'What books does DGCA recommend for ground school?',
    a: `DGCA publishes a list of study material for the PPL, CPL and ATPL exams on the Pariksha portal. ${SYLLABUS.studyMaterial.dgcaNote} It is a reference list, not a required purchase.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const related = [
  { lead: 'Fees, sessions, booking and the pass rules are in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'The books DGCA names for each subject are listed in', anchor: 'DGCA recommended books', href: '/blogs/dgca-recommended-books-cpl-exams' },
  { lead: 'Why a pass can lapse before your licence application is in', anchor: 'the five-year rule', href: '/blogs/dgca-exam-pass-validity-cpl-five-years' },
  { lead: 'The computer number you need before booking is in', anchor: 'our computer number guide', href: '/dgca-computer-number' },
  { lead: 'Our own classes, batches and syllabus are on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'what-is', title: 'What is DGCA ground school?' },
  { id: 'who', title: 'Who can join?' },
  { id: 'papers', title: 'What does each paper demand?' },
  { id: 'rtr', title: 'Where does RTR (A) fit?' },
  { id: 'sequence', title: 'How should you sequence attempts?' },
  { id: 'plan', title: 'A study plan' },
  { id: 'failure', title: 'After a failed paper' },
  { id: 'choosing', title: 'Choosing a ground school' },
  { id: 'short-version', title: 'The short version' },
];

const sources = [
  { label: `${EXAM_RULES.car.citation} — ${EXAM_RULES.car.title} (DGCA)`, url: EXAM_RULES.car.where },
  PARIKSHA.sources[3],
  PARIKSHA.sources[1],
  SYLLABUS.sources[1],
  SYLLABUS.sources[0],
];

export default function DgcaGroundSchoolGuide() {
  return (
    <BlogPostLayout
      title="DGCA Ground School: How to Clear the Five Papers (2027)"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="DGCA ground school"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="11 min"
      quickAnswer={{
        question: 'What is DGCA ground school?',
        answer: `DGCA ground school is the theory stage of pilot training in India: preparation for the ${DGCA_PAPERS.length} DGCA written papers (${listJoin(DGCA_PAPERS)}), each passed separately with ${EXAM_RULES.theory.passMark}%, plus ${RTR.name}, examined on its own. Papers are attempted one or two at a time across DGCA's sessions, so the order you take them in matters as much as how much you study.`,
      }}
      summaryTitle="Ground school at a glance"
      summaryItems={[
        `${DGCA_PAPERS.length} papers: ${listJoin(DGCA_PAPERS)}.`,
        `${EXAM_RULES.theory.passMark}% in each paper on its own; no aggregate.`,
        `${RTR.name} is a separate examination, not a sixth paper.`,
        'No medical needed to study or to sit the papers; a computer number is.',
        `${regular.length} regular DGCA sessions a year plus on-demand sessions.`,
        `Sources: ${EXAM_RULES.car.citation}; Pariksha documents read ${PARIKSHA.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
    >
      <p>
        Most students start DGCA ground school with a stack of books and a plan to &ldquo;finish the
        syllabus&rdquo;, then sit all five papers together. A few weeks later they have passed two,
        carry three into the next session, and the six months they budgeted for theory has quietly
        doubled. The papers are not unusually hard; the plan was. DGCA ground school rewards a different
        approach: understanding what each paper actually tests, attempting them in a deliberate order,
        and treating a failed paper as a diagnosis rather than a setback. This guide sets that approach
        out, paper by paper.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/dgca-ground-school/hero-ground-school.webp"
        width={1200}
        height={630}
        alt="Students at classroom desks plotting on navigation charts with protractors and scales"
        promptId="31"
      />

      <h2 id="what-is" className={H2}>What is DGCA ground school?</h2>
      <p>
        DGCA ground school is the theory stage of pilot training in India, preparing you for the{' '}
        {DGCA_PAPERS.length} written papers DGCA examines and for {RTR.name}, which is examined
        separately. Passing the papers is a licence requirement under Schedule II, Section J, and no
        amount of flying replaces it.
      </p>
      <p>
        It also matters for a reason beyond the examination. Ground school is where you learn why an
        aircraft behaves as it does, and students who arrive at the flying school with Technical General
        understood spend their expensive hours flying rather than being taught on the ground at flying
        rates.
      </p>

      <h2 id="who" className={H2}>Who can join DGCA ground school?</h2>
      <p>
        Anyone can join DGCA ground school; the requirements apply to the licence, not to studying. For
        the CPL you will need {EDUCATION.requirement}, and the licence is issued at {MIN_AGE.CPL} or later,
        but many students start classes while still in Class 12.
      </p>
      <p>
        Students from a Biology or Commerce stream are not shut out: {EDUCATION.altRoute.charAt(0).toLowerCase() + EDUCATION.altRoute.slice(1)}{' '}
        The medical is not needed to join or to sit the papers, but take it early anyway.{' '}
        {MEDICAL_STANDARDS.classOrder.advice}
      </p>

      <h2 id="papers" className={H2}>What does each DGCA paper demand?</h2>
      <p>
        Each DGCA paper demands something different: Air Navigation is timed calculation, Meteorology
        is applied understanding, Air Regulations is memory, and the two Technical papers are applied
        physics, generic and then type-specific. The notes below are from our experience of teaching
        these subjects; DGCA publishes no pass rates by paper.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">The five DGCA written papers, what each demands and how to prepare</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Paper</th>
              <th scope="col" className={TH}>What it demands</th>
              <th scope="col" className={TH}>How to prepare</th>
            </tr>
          </thead>
          <tbody>
            {DGCA_PAPERS.map((p, i) => (
              <tr key={p} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{p}</td>
                <td className={TD}>{subjects[p].demand}</td>
                <td className={TD}>{subjects[p].prepare}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {DGCA_PAPERS.map((p) => (
        <div key={p}>
          <h3 className={H3}>{p}</h3>
          <p>{subjects[p].covers}</p>
        </div>
      ))}
      <p>
        DGCA&rsquo;s own{' '}
        <Ext href={SYLLABUS.sources[1].url}>list of study material</Ext> names the reference books for each
        subject; {SYLLABUS.cpl.detailBoundary.split('. ')[1].charAt(0).toLowerCase() + SYLLABUS.cpl.detailBoundary.split('. ')[1].slice(1)}.
        The titles are set out in{' '}
        <Link href="/blogs/dgca-recommended-books-cpl-exams" className={LINK}>DGCA recommended books for the CPL exams</Link>.
      </p>

      <h2 id="rtr" className={H2}>Where does RTR (A) fit in ground school?</h2>
      <p>
        {RTR.name} sits outside the five DGCA papers. {RTR.note} It is examined under the{' '}
        {RTR.instrument}, so it needs its own preparation slot rather than a place in your paper rotation.
      </p>
      <p>
        The phraseology is a spoken skill, so practise it aloud rather than reading it. Our{' '}
        <Link href="/rtr-a" className={LINK}>RTR (A) page</Link> explains the examination.
      </p>

      <h2 id="sequence" className={H2}>How should you sequence your DGCA attempts?</h2>
      <p>
        Sequence DGCA attempts one or two papers per session, starting with the ones you are ready for,
        rather than all five at once. Each paper is passed on its own with {EXAM_RULES.theory.passMark}%,
        so small groups across sessions spread the load and stop one weak paper from dragging the others.
      </p>
      <ul className={UL}>
        <li><strong>Get the computer number first.</strong> No paper can be booked without it; apply on the{' '}
          <Ext href={PARIKSHA.portal}>Pariksha portal</Ext>.</li>
        <li><strong>Know the calendar.</strong> DGCA holds {regular.length} regular sessions a year, listed in its{' '}
          <Ext href={PARIKSHA.sources[3].url}>Programme of Examinations</Ext>, plus on-demand sessions at{' '}
          {inr(PARIKSHA.fees.olodePerPaper)} a paper against {inr(PARIKSHA.fees.regularPerPaper)}.</li>
        <li><strong>Watch the window.</strong> {EXAM_RULES.paperValidity.cplAtpl} {EXAM_RULES.paperValidity.planningNote}</li>
      </ul>
      <p>
        The booking rules, fees and session dates are all in{' '}
        <Link href="/blogs/dgca-exam-guide" className={LINK}>our DGCA exam guide</Link>.
      </p>

      <BlogCta
        variant="mid"
        title="Preparing for the five papers?"
        text="We teach all five DGCA subjects from our Dwarka classroom and online. See how the classes are run before you decide."
      />

      <h2 id="plan" className={H2}>What does a sensible DGCA study plan look like?</h2>
      <p>
        A sensible DGCA study plan starts Air Navigation practice in the first week, puts the first
        attempt early with two papers you are ready for, and keeps {RTR.name} in its own slot. The plan
        below is our suggestion, not a DGCA requirement; adjust it to the sessions you can sit.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">A suggested DGCA ground school study plan</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>Focus</th>
            </tr>
          </thead>
          <tbody>
            {plan.map((r, i) => (
              <tr key={r.stage} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.stage}</td>
                <td className={TD}>{r.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="failure" className={H2}>What should you do after failing a DGCA paper?</h2>
      <p>
        After failing a DGCA paper, work out whether you ran out of knowledge or out of time, change how
        you practise accordingly, and rebook only that paper. The failure touches nothing else: every
        other paper stands or falls on its own.
      </p>
      <ol className={OL}>
        {afterFailure.map((a) => <li key={a.step}><strong>{a.step}.</strong> {a.detail}</li>)}
      </ol>

      <h2 id="choosing" className={H2}>How do you choose a DGCA ground school?</h2>
      <p>
        Choose a DGCA ground school on how it prepares you, not on its facilities: whether mock tests are
        timed and marked, who answers doubts, and what its students achieved last year. DGCA does not
        approve classroom institutes, so &ldquo;DGCA approved&rdquo; on a coaching banner is not something you
        can look up.
      </p>
      <p>Ask each school, in writing:</p>
      <ul className={UL}>
        {choosing.map((q) => <li key={q}>{q}</li>)}
      </ul>
      <p>
        Ground school and flying school are separate choices. The papers are examined by DGCA wherever
        you studied, so you can clear theory in one place and fly in another; our{' '}
        <Link href="/online-dgca-ground-classes" className={LINK}>online ground classes page</Link> explains
        what can be done remotely.
      </p>

      <h2 id="short-version" className={H2}>The short version</h2>
      <p>
        Get the computer number, start Navigation practice on day one, sit two papers at a time, and treat
        a failure as information about how you practised. Keep the five-year window in view from your
        first pass. Done that way, ground school becomes the most predictable part of pilot training
        rather than the part that runs a year late.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
