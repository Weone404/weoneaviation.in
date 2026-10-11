import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { EXAM_RULES, PARIKSHA, DGCA_PAPERS, RTR, ACADEMY, inr } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from dgca-exam-guide (pass mark as one FAQ among many), dgca-exam-pass-validity-cpl-five-years
 * (how long a pass lasts), dgca-regular-vs-on-demand-exam-session (which session to book) and
 * dgca-exam-fee-refund-failed-payment (payment failures). This post owns one question: what the pass
 * mark is, exactly how it is applied, and what a student does after missing it in one paper.
 * Every figure comes from EXAM_RULES and PARIKSHA in lib/facts.js. The number of permitted attempts per
 * paper is NOT in any source on file, so the post says it is not stated here and points to the portal.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'dgca-exam-pass-marks-and-retakes-cpl';
const DATE_PUBLISHED = '2026-10-11';
const DATE_MODIFIED = '2026-10-11';

const T = EXAM_RULES.theory;
const FEES = PARIKSHA.fees;
const BOOK = PARIKSHA.booking;
const programmeUrl = PARIKSHA.sources.find((s) => s.label.startsWith('Programme of Examinations 2026')).url;
const upcoming = [
  PARIKSHA.calendar2026.olode[6],
  PARIKSHA.calendar2026.olode[7],
  PARIKSHA.calendar2026.regular[3],
];
const sc = (list, name) => list.find((x) => x.session === name);

const peopleAlsoAsk = [
  {
    q: 'What is the pass mark in the DGCA CPL exams?',
    a: `${T.statement} That is ${T.passMark}% in each of the ${DGCA_PAPERS.length} papers (${DGCA_PAPERS.join(', ')}), under ${EXAM_RULES.car.citation}, ${T.clause}.`,
  },
  {
    q: 'Do I need 70% overall or in every paper?',
    a: `In every paper. ${T.perSubject} A student with 95% in Air Navigation and 65% in Aviation Meteorology has passed one subject and failed one.`,
  },
  {
    q: 'What happens if I fail one DGCA paper?',
    a: `You take that subject again in a later session. The pass mark, the fee (${inr(FEES.regularPerPaper)} per paper on a regular session) and the validity window all run per paper, so a paper you have cleared keeps its own clock. ${BOOK.onePerSession} The number of attempts allowed per paper is not stated in the sources we cite, so confirm it on the Pariksha portal.`,
  },
  {
    q: 'Is there an oral exam for a CPL?',
    a: `The oral thresholds in ${EXAM_RULES.car.citation} are listed for the SPL (${EXAM_RULES.oral[0].passMark}%), the glider licence (${EXAM_RULES.oral[1].passMark}%), the ATPL (${EXAM_RULES.oral[2].passMark}%) and the instructor ratings (${EXAM_RULES.oral[3].passMark}%). A CPL oral is not in that list, so this post makes no claim about one.`,
  },
  {
    q: 'Does a passed paper expire?',
    a: `Yes. ${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl} The window is counted back from the date you apply for the licence.`,
  },
  {
    q: 'Is RTR (A) part of the five DGCA papers?',
    a: `No. ${RTR.name} is examined separately from the DGCA written papers and is its own requirement for CPL issue. It is not one of the ${DGCA_PAPERS.length} subjects the ${T.passMark}% rule covers.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'DGCA Exam Pass Marks and Retakes: What Happens If You Fail a CPL Paper',
  description:
    'The DGCA pass mark is 70% in each CPL paper with no aggregate. How the rule is applied, what a retake costs, which sessions are listed next, and how long a pass lasts.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA exams',
  keywords: 'DGCA exam pass marks, DGCA passing marks 70%, DGCA exam failed retake, CPL exam fail what next, DGCA supplementary exam',
});

const sources = [
  { label: `${EXAM_RULES.car.citation} (DGCA)`, url: EXAM_RULES.car.where },
  PARIKSHA.sources.find((s) => s.label.startsWith('Programme of Examinations 2026')),
  { label: 'DGCA Pariksha portal', url: PARIKSHA.portal },
];

const related = [
  { lead: 'Papers, fees and sessions in one place are in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'How long a cleared paper counts is covered in', anchor: 'the five-year validity post', href: '/blogs/dgca-exam-pass-validity-cpl-five-years' },
  { lead: 'Choosing the session for a retake is in', anchor: 'the regular versus on-demand comparison', href: '/blogs/dgca-regular-vs-on-demand-exam-session' },
  { lead: 'What the books list covers is in', anchor: 'the recommended books post', href: '/blogs/dgca-recommended-books-cpl-exams' },
];

const tocHeadings = [
  { id: 'pass-mark', title: 'What is the pass mark in the DGCA CPL exams?' },
  { id: 'per-paper', title: 'Is the 70% overall or in each paper?' },
  { id: 'fail', title: 'What happens if you fail one paper?' },
  { id: 'cost', title: 'What does a retake cost, and when can you sit it?' },
  { id: 'orals', title: 'Do oral exams use the same pass mark?' },
  { id: 'plan', title: 'How should you plan so a failed paper costs little?' },
  { id: 'this-week', title: 'What to do this week' },
];

const markRows = [
  { item: 'Written papers (all five)', value: `${T.passMark}% in each subject`, clause: `${T.clause}, no aggregate` },
  { item: 'SPL oral', value: `${EXAM_RULES.oral[0].passMark}%`, clause: EXAM_RULES.oral[0].clause },
  { item: 'ATPL oral', value: `${EXAM_RULES.oral[2].passMark}%`, clause: EXAM_RULES.oral[2].clause },
  { item: 'Flying instructor rating orals', value: `${EXAM_RULES.oral[3].passMark}%`, clause: EXAM_RULES.oral[3].clause },
];

const resultRows = [
  { air: 'Air Navigation', score: '78%', out: 'Pass' },
  { air: 'Aviation Meteorology', score: '69%', out: 'Fail, retake this subject only' },
  { air: 'Air Regulations', score: '91%', out: 'Pass' },
];

export default function DgcaExamPassMarksAndRetakesCpl() {
  return (
    <BlogPostLayout
      title="DGCA Exam Pass Marks and Retakes for CPL Papers"
      description="The DGCA pass mark is 70% in each CPL paper with no aggregate. See how it is applied, what a retake costs, the next listed sessions and how long a pass lasts."
      schema={[articleSchema, faqSchema]}
      heading="DGCA Exam Pass Marks and Retakes: What Happens If You Fail a CPL Paper"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'What is the pass mark in the DGCA CPL exams?',
        answer: `DGCA requires ${T.passMark}% in each written subject, taken on its own. There is no aggregate, so a strong Air Navigation score cannot cover a weak Meteorology one. A failed paper is sat again in a later session, at ${inr(FEES.regularPerPaper)} on a regular session or ${inr(FEES.olodePerPaper)} on-demand, while cleared papers keep their own validity.`,
      }}
      summaryTitle="The pass mark in one view"
      summaryItems={[
        T.statement,
        T.perSubject,
        `A retake is paid per paper: ${inr(FEES.regularPerPaper)} on a regular session, ${inr(FEES.olodePerPaper)} on an Online On-Demand session.`,
        `${BOOK.onePerSession} ${BOOK.noChanges}`,
        'Sources: DGCA CAR Section 7, Series B, Part I and the Pariksha Programme of Examinations 2026, read on 11 September 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="11 September 2026"
    >
      <p>
        A student comes out of the exam hall sure that four papers went well and one did not. A
        classmate says the marks get averaged. A coaching video says you must clear everything in a
        single sitting. Neither is what the rule says, and the difference decides whether one bad
        paper costs you a few weeks or a whole year. This post sets out the DGCA exam pass marks for
        CPL papers, how the rule is applied, and what a retake involves.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/dgca-exam-pass-marks-and-retakes-cpl/hero-five-papers-one-bar.webp"
        width={1200}
        height={630}
        alt="Five upright exam papers standing in a row against a single horizontal bar, four reaching above it and one falling just below"
        promptId="103"
      />

      <h2 id="pass-mark" className={H2}>What is the pass mark in the DGCA CPL exams?</h2>
      <p>
        The DGCA pass mark for the CPL written papers is {T.passMark}% in each subject. The rule sits
        in {T.clause} of the{' '}
        <Ext href={EXAM_RULES.car.where}>Civil Aviation Requirement, Section 7, Series &lsquo;B&rsquo;, Part I</Ext>:{' '}
        {T.statement.charAt(0).toLowerCase() + T.statement.slice(1)}
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Pass marks in the DGCA examination rules</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Examination</th>
              <th scope="col" className={TH}>Pass mark</th>
              <th scope="col" className={TH}>Where the rule is</th>
            </tr>
          </thead>
          <tbody>
            {markRows.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.item}</td>
                <td className={TD}>{r.value}</td>
                <td className={TD}>{r.clause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The five subjects are {DGCA_PAPERS.join(', ')}. {RTR.name} is a separate requirement, examined
        apart from these papers, so the {T.passMark}% rule above is not the rule for it.
      </p>

      <h2 id="per-paper" className={H2}>Is the 70% overall or in each paper?</h2>
      <p>
        The {T.passMark}% applies to each paper on its own. {T.perSubject} A student who averages 80%
        across five papers but scores 69% in one has still failed that one.
      </p>
      <p>A worked example, with made-up scores, shows how the rule reads:</p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Illustrative scores showing the per-subject pass rule</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Subject</th>
              <th scope="col" className={TH}>Illustrative score</th>
              <th scope="col" className={TH}>Result</th>
            </tr>
          </thead>
          <tbody>
            {resultRows.map((r, i) => (
              <tr key={r.air} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.air}</td>
                <td className={TD}>{r.score}</td>
                <td className={TD}>{r.out}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The scores are invented to show the rule; they are not anyone&rsquo;s results and DGCA
        publishes no pass-rate data for us to cite. For how the five papers are divided and what each
        covers, read{' '}
        <Link href="/blogs/dgca-exam-guide" className={LINK}>our DGCA exam guide</Link>.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="One paper holding you back?"
        title="Get a plan for the weak subject"
        text="Counselling is free. Tell us which paper is the problem and we will talk through how our DGCA ground classes teach it, without promising any result."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <h2 id="fail" className={H2}>What happens if you fail one paper?</h2>
      <p>
        You sit the failed subject again in a later session. The pass mark, the fee and the validity
        window are all set per paper, so a paper you cleared is not wiped by one you missed.
        {' '}{BOOK.onePerSession} That means the retake waits for the next session you can book.
      </p>
      <ul className={UL}>
        <li>Cleared papers keep their own validity clock. {EXAM_RULES.paperValidity.cplAtpl}</li>
        <li>A new application and a new fee go with the retake: {BOOK.noChanges.charAt(0).toLowerCase() + BOOK.noChanges.slice(1)}</li>
        <li>{BOOK.specificAircraft}</li>
        <li>
          The number of attempts allowed for one paper is not stated in the sources behind this post. Check the
          current rule on the <Ext href={PARIKSHA.portal}>Pariksha portal</Ext> before you plan around a fixed count.
        </li>
      </ul>

      <h2 id="cost" className={H2}>What does a retake cost, and when can you sit it?</h2>
      <p>
        A retake costs {inr(FEES.regularPerPaper)} per paper on a regular session and{' '}
        {inr(FEES.olodePerPaper)} per paper on an Online On-Demand session. {FEES.serviceCharge} The
        sessions DGCA lists for the rest of 2026 are below.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Remaining 2026 DGCA examination sessions and fee per paper</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Session</th>
              <th scope="col" className={TH}>Dates (2026)</th>
              <th scope="col" className={TH}>Fee per paper</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>Online On-Demand, {upcoming[0].session}</td>
              <td className={TD}>{upcoming[0].dates}</td>
              <td className={TD}>{inr(FEES.olodePerPaper)}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Online On-Demand, {upcoming[1].session}</td>
              <td className={TD}>{upcoming[1].dates}</td>
              <td className={TD}>{inr(FEES.olodePerPaper)}</td>
            </tr>
            <tr className="bg-white">
              <td className={TD_HEAD}>Regular, {sc(PARIKSHA.calendar2026.regular, 'Exam 04').session}</td>
              <td className={TD}>{upcoming[2].dates}</td>
              <td className={TD}>{inr(FEES.regularPerPaper)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {PARIKSHA.calendar2026.tentative} The full schedule is in the{' '}
        <Ext href={programmeUrl}>Programme of Examinations 2026</Ext>. Which session type suits a
        retake is argued in{' '}
        <Link href="/blogs/dgca-regular-vs-on-demand-exam-session" className={LINK}>regular versus on-demand sessions</Link>.
        Pay by the closing date: {BOOK.deadline.charAt(0).toLowerCase() + BOOK.deadline.slice(1)}
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-exam-pass-marks-and-retakes-cpl/one-paper-back-in-queue.webp"
        width={1200}
        height={675}
        alt="A student's hand placing one exam paper back into a tray beside a desk calendar, while four completed papers sit in a separate stack beside it"
        promptId="104"
      />

      <h2 id="orals" className={H2}>Do oral exams use the same pass mark?</h2>
      <p>
        No. Oral examinations carry their own thresholds, and they are lower for some licences. The
        CAR lists {EXAM_RULES.oral[0].passMark}% for the Student Pilot Licence and the glider licence,
        and {EXAM_RULES.oral[2].passMark}% for the ATPL and the flying instructor ratings. A CPL is
        not named in that list, so this post does not describe a CPL oral.
      </p>
      <p>
        One retake rule is stated for the ATPL oral: {EXAM_RULES.oralRetake.statement.charAt(0).toLowerCase() + EXAM_RULES.oralRetake.statement.slice(1)}{' '}
        A separate fee of {inr(FEES.oralPerPaper)} per oral paper applies. {FEES.oralNote}
      </p>

      <h2 id="plan" className={H2}>How should you plan so a failed paper costs little?</h2>
      <p>
        Plan the papers in an order that leaves one session free before your flying hours are done, and
        do not let the oldest pass drift out of its window. {EXAM_RULES.paperValidity.planningNote}
      </p>
      <ol className="list-decimal pl-5 space-y-3 text-gray-700">
        <li>Book the paper you find hardest first, so a retake still fits inside the window.</li>
        <li>Do not stack more papers in one session than you have revised for; each is paid for whether you pass or not.</li>
        <li>Keep a note of the date each paper was passed. The five-year window counts back from your licence application.</li>
        <li>Revise from DGCA&rsquo;s own list. See <Link href="/blogs/dgca-recommended-books-cpl-exams" className={LINK}>which books DGCA recommends</Link>.</li>
      </ol>
      <p>
        Teaching is the part we do: our{' '}
        <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes</Link> and the{' '}
        <Link href="/courses/cpl" className={LINK}>CPL course</Link> cover these five subjects. We
        cannot promise a pass in any session.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Write down your score in every paper you have attempted and mark each against 70%, one at a time.
        Then open the Programme of Examinations, pick the next session you can reach, and book only the
        paper you missed. Before that, check the validity post so no passed paper is closer to its
        window than you think.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
