import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { EXAM_RULES, MEDICAL, CPL_HOURS, DGCA_PAPERS, RTR, ACADEMY, papersSummary } from '../../lib/facts';

/*
 * Distinct from dgca-exam-guide, which lists paper validity as one bullet among
 * many, and from the fee-refund and computer-number posts. This post owns one
 * question: how long does a cleared DGCA theory paper stay usable, and how do
 * you plan the exams around the flying so none of them lapses.
 *
 * Every rule is read from EXAM_RULES (CAR Section 7, Series B, Part I, Rev. 2)
 * and CPL_HOURS in lib/facts.js. The worked timeline uses relative months only,
 * so no calendar date or session is asserted beyond what DGCA publishes.
 * FAQPage schema is built from peopleAlsoAsk because data/pageFaqs.js is not
 * editable by the blog routine.
 */
const DATE_PUBLISHED = '2026-10-03';
const DATE_MODIFIED = '2026-10-03';
const CANONICAL = 'https://weoneaviation.in/blogs/dgca-exam-pass-validity-cpl-five-years';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Long Does a DGCA Exam Pass Stay Valid? The 5-Year Rule for CPL Papers',
  description:
    'A cleared DGCA theory paper does not last forever. The CAR gives five years for a CPL or ATPL and two and a half for other licences, counted back from your application. How to plan exams around your flying.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA exams',
  keywords: 'DGCA exam validity, DGCA paper validity CPL, how long are DGCA exams valid, DGCA exam expire, CPL theory exam five years',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const peopleAlsoAsk = [
  {
    q: 'How long are DGCA exam results valid for a CPL?',
    a: `${EXAM_RULES.paperValidity.cplAtpl} The rule is ${EXAM_RULES.paperValidity.clause} of ${EXAM_RULES.car.citation}: ${EXAM_RULES.paperValidity.general}`,
  },
  {
    q: 'Do DGCA papers expire if I do not get my licence in time?',
    a: `Yes, in the sense that a paper passed outside the window no longer counts for the application. The window is counted back from the date you apply, not forwards from the day you passed. ${EXAM_RULES.paperValidity.planningNote}`,
  },
  {
    q: 'Is the validity two and a half years or five years?',
    a: `Two and a half years is the general rule in ${EXAM_RULES.paperValidity.clause}; for the issue of a CPL or an ATPL it is five. An older 2007 edition of the same CAR gave a flat two and a half years, so a source quoting that for a CPL is out of date.`,
  },
  {
    q: 'What is the pass mark for each DGCA paper?',
    a: `${EXAM_RULES.theory.statement} ${EXAM_RULES.theory.perSubject}`,
  },
  {
    q: 'Should I clear all the papers first and fly later?',
    a: `Not automatically. The papers need to sit inside the window when you apply, and the flying has its own condition: ${CPL_HOURS.total} hours flown within the ${CPL_HOURS.recencyYears} years before applying. Plan the two together rather than finishing one far ahead of the other.`,
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: peopleAlsoAsk.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const related = [
  { lead: 'For the papers, fees and 2026 sessions in one place, read', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'How the flying side of the clock runs is covered in', anchor: 'the pilot-in-command hours explainer', href: '/blogs/cpl-pilot-in-command-hours-requirement-india' },
  { lead: 'If you are still choosing how to prepare, see', anchor: 'the DGCA ground school guide', href: '/blogs/dgca-ground-school-guide' },
  { lead: 'Classroom preparation for the written papers is on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
  { lead: 'The full list of CPL conditions is on', anchor: 'the CPL eligibility page', href: '/commercial-pilot-license-eligibility' },
];

const tocHeadings = [
  { id: 'answer', title: 'How long does a DGCA exam pass stay valid?' },
  { id: 'rule', title: 'What the CAR actually says' },
  { id: 'counting', title: 'Counting back from your application' },
  { id: 'two-clocks', title: 'Two clocks: papers and flying hours' },
  { id: 'planning', title: 'How to plan so nothing lapses' },
  { id: 'mistakes', title: 'Three mistakes students make with the window' },
  { id: 'parents', title: 'What this means for parents' },
  { id: 'unknowns', title: 'What this post cannot tell you' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const ruleRows = [
  { what: 'Pass mark in a theory paper', value: `${EXAM_RULES.theory.passMark}% in each subject`, source: `${EXAM_RULES.theory.clause}; no aggregate` },
  { what: 'Window for most licences', value: 'Two and a half years before the date of application', source: EXAM_RULES.paperValidity.clause },
  { what: 'Window for CPL or ATPL', value: 'Five years before the date of application', source: EXAM_RULES.paperValidity.clause },
  { what: 'CPL flying experience window', value: `${CPL_HOURS.total} hours within the ${CPL_HOURS.recencyYears} years before applying`, source: CPL_HOURS.clause },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function DgcaExamPassValidityCplFiveYears() {
  return (
    <BlogPostLayout
      title="How Long Is a DGCA Exam Pass Valid? The 5-Year CPL Rule"
      description="A cleared DGCA theory paper expires. The CAR allows five years for a CPL or ATPL and two and a half for other licences, counted back from your application. Here is how to plan around it."
      schema={[articleSchema, faqSchema]}
      heading="How Long Does a DGCA Exam Pass Stay Valid? The 5-Year Rule for CPL Papers"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'How long does a DGCA exam pass stay valid?',
        answer: `For a Commercial Pilot Licence, five years. DGCA's CAR counts theory papers completed in the five years immediately before you apply; for most other licences the window is two and a half years. A pass is not permanent, and the clock runs back from your application date, not forward from the exam.`,
      }}
      summaryTitle="The validity rule in one view"
      summaryItems={[
        EXAM_RULES.paperValidity.general,
        EXAM_RULES.paperValidity.cplAtpl,
        EXAM_RULES.theory.statement,
        EXAM_RULES.paperValidity.planningNote,
        `Source: ${EXAM_RULES.car.citation}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/dgca-exam-pass-validity-cpl-five-years/hero-five-year-window.webp"
        width={1200}
        height={630}
        alt="A horizontal timeline with five exam sheets stacked inside a bracketed window that ends at a licence application folder on the right, and one older sheet falling outside the bracket on the left"
        promptId="87"
      />

      <h2 id="answer" className={H2}>How long does a DGCA exam pass stay valid?</h2>
      <p>
        Long enough to plan around, but not forever. {EXAM_RULES.paperValidity.general}{' '}
        {EXAM_RULES.paperValidity.cplAtpl} So a student aiming at a CPL has a five-year window,
        ending on the day the licence application goes in.
      </p>
      <p>
        Most students hear this as &ldquo;my exams are valid for five years&rdquo; and picture a
        timer starting at the first paper. That is the wrong picture, and the next sections show
        why.
      </p>

      <h2 id="rule" className={H2}>What the CAR actually says</h2>
      <p>
        The rule sits in {EXAM_RULES.car.citation}, titled &ldquo;{EXAM_RULES.car.title}&rdquo;
        ({EXAM_RULES.paperValidity.clause}). The CPL theory set is {papersSummary()}: {DGCA_PAPERS.length}{' '}
        papers. {RTR.name} is required for the licence but is {RTR.examinedSeparately ? 'examined separately' : 'part of the set'}, so
        this post covers the {DGCA_PAPERS.length} papers only.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA theory paper pass mark and validity windows for a CPL</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Item</th>
              <th scope="col" className={TH}>Rule</th>
              <th scope="col" className={TH}>Where it comes from</th>
            </tr>
          </thead>
          <tbody>
            {ruleRows.map((r, i) => (
              <tr key={r.what} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.what}</td>
                <td className={TD}>{r.value}</td>
                <td className={TD}>{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Note the pass mark. {EXAM_RULES.theory.perSubject} A student who clears four papers
        comfortably and misses the fifth by a few marks has one paper to retake, not five, but that
        one paper still has to land inside the window.
      </p>

      <h2 id="counting" className={H2}>Counting back from your application</h2>
      <p>
        The wording is &ldquo;immediately preceding the date of application&rdquo;. The window is
        measured backwards from the day you apply for the licence. It does not start when you pass
        your first paper and it does not pause while you fly.
      </p>
      <p>
        A simple illustration, in months rather than calendar dates: say you clear Air Regulations
        in month 0 and your CPL application goes in at month 58. The paper is inside the
        60-month window. If the application slips to month 63, that paper is outside it, even if
        you passed every other paper last week. The slip can come from weather, aircraft
        availability, a medical issue or a delayed logbook, and none of them extends the window.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-exam-pass-validity-cpl-five-years/window-slides-back.webp"
        width={1200}
        height={675}
        alt="Two stacked timelines: on the first a five-year bracket covers all exam sheets, on the second the bracket has moved right and the earliest sheet sits outside it"
        promptId="88"
      />

      <h2 id="two-clocks" className={H2}>Two clocks: papers and flying hours</h2>
      <p>
        The theory window is only one of two clocks that end at the same application. The flying
        requirement carries its own: {CPL_HOURS.total} hours flown within the{' '}
        {CPL_HOURS.recencyYears} years before you apply ({CPL_HOURS.clause}). Both are five years
        for a CPL, but they are separate conditions. Clearing papers early does not stretch the
        flying window, and finishing the hours early does not stretch the paper window.
      </p>
      <p>
        The hour components inside that total, including the pilot-in-command condition, are laid
        out in{' '}
        <Link href="/blogs/cpl-pilot-in-command-hours-requirement-india" className="text-av-orange font-semibold underline">
          our pilot-in-command hours post
        </Link>.
        The practical point is that a student who front-loads the theory and then waits a long
        time to start or finish flying is spending the paper window while collecting no hours.
      </p>

      <h2 id="planning" className={H2}>How to plan so nothing lapses</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>
          <strong>Decide your application date first.</strong> {EXAM_RULES.paperValidity.planningNote}
        </li>
        <li>
          <strong>Do not rush papers years ahead of your flying.</strong> The theory is easiest to
          retain while you are still studying it; sitting it long before a realistic flying start
          buys little and uses window.
        </li>
        <li>
          <strong>Keep a dated record of every result.</strong> Write down each paper and the date it was cleared, and recheck the
          oldest against your planned application date every few months.
        </li>
        <li>
          <strong>Retake early, not at the edge.</strong> A paper that lapses has to be sat again in
          a later session, and sessions are only a few a year; see{' '}
          <Link href="/blogs/dgca-exam-guide" className="text-av-orange font-semibold underline">the exam guide</Link> for the published calendar.
        </li>
        <li>
          <strong>Do not rely on a forum number.</strong> Older copies of the CAR give a flat two
          and a half years. For a CPL, the {EXAM_RULES.car.revision} text of{' '}
          {EXAM_RULES.car.dated} governs.
        </li>
      </ul>

      <BlogImagePlaceholder
        src="/blog/dgca-exam-pass-validity-cpl-five-years/dated-results-tracker.webp"
        width={1200}
        height={675}
        alt="A desk seen from above with a wall-calendar style planner, five result slips arranged in a row, and a small light aircraft model pointing toward a folder"
        promptId="89"
      />

      <h2 id="mistakes" className={H2}>Three mistakes students make with the window</h2>
      <p>
        <strong>Treating the five years as a countdown from the first paper.</strong> The CAR
        looks at the papers you hold on the day you apply. A student who clears one paper early
        and the other four much later has the early paper closest to the edge, and that is the
        one to watch. The window is only as long as its oldest paper allows.
      </p>
      <p>
        <strong>Assuming the longer figure applies to every licence.</strong> Five years is
        specific to the issue of a CPL or an ATPL. For other licences the general rule applies, and
        a student who passes papers for a lower licence and then pauses for several years can find
        them lapsed while the CPL papers would still have been usable. If your goal is a CPL, check
        which licence the paper is being counted for.
      </p>
      <p>
        <strong>Confusing exam validity with licence validity.</strong> These are different things.
        The window above decides whether your passed papers still count at the moment you apply.
        It says nothing about how long the licence itself lasts once issued, and the two should
        not be quoted interchangeably. A forum answer about &ldquo;five years&rdquo; may be
        talking about either.
      </p>

      <h2 id="parents" className={H2}>What this means for parents paying for the course</h2>
      <p>
        If you are funding the training, the useful question for the academy is not &ldquo;how
        quickly can the papers be done&rdquo; but &ldquo;when is the application date we are
        working towards, and which paper is oldest by then&rdquo;. Ask for the plan in writing,
        with the month each paper is expected to be cleared. A school that arranges flying
        through partner organisations, as we do, can only plan the flying with the partner, so the
        two timelines need to be reconciled early, before money is committed to either.
      </p>
      <p>
        A short checklist worth asking about before paying anything:
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>When is the intended application date, and how many months of flying remain before it?</li>
        <li>Which papers are planned for which session, and what happens to the plan if one is failed?</li>
        <li>Who tracks the dates of cleared papers, and where is that record kept?</li>
        <li>What is the plan if the flying is delayed by weather, aircraft availability or a medical issue?</li>
      </ul>
      <p>
        The medical belongs on that list for a reason: the {EXAM_RULES.car.revision} window does not
        stop for it. {MEDICAL.advice}
      </p>

      <h2 id="unknowns" className={H2}>What this post cannot tell you</h2>
      <p>
        The CAR gives the window, not a procedure for every edge case. This post does not say
        how DGCA treats a paper that falls outside the window on the day of a borderline
        application, whether any relaxation exists, or how the rule applies to a converted foreign
        licence. {EXAM_RULES.car.citation} was read as {EXAM_RULES.verifiedOn}; DGCA can revise a
        CAR at any time, so confirm against the current text and with the Central Examination
        Organisation before you rely on a date.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. The
        validity window is a reason to pace the papers against your flying, not to sit them as
        fast as possible. If you would like help mapping your papers to a realistic application
        date, see our{' '}
        <Link href="/dgca-ground-classes" className="text-av-orange font-semibold underline">DGCA ground classes</Link>{' '}
        and the{' '}
        <Link href="/commercial-pilot-license-eligibility" className="text-av-orange font-semibold underline">CPL eligibility page</Link>.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
