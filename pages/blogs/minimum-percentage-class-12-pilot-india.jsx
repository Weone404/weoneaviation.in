import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { EDUCATION, EXAM_RULES, PARIKSHA, CPL_COST, INDIGO_CADET, MEDICAL, ACADEMY } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from become-pilot-without-physics-and-maths-class-12 (which subjects, and the NIOS bridge),
 * ppl-physics-maths-requirement-india (the PPL exception) and igrua-admission-eligibility-fees (one academy).
 * This post owns the percentage question: does DGCA set a minimum Class 12 score, what the Class 12 record is
 * checked for instead, and who does set marks cut-offs.
 * Every DGCA statement comes from EDUCATION and PARIKSHA in lib/facts.js. No school or airline cut-off figure is
 * printed: the secondary sources that quote them disagree, and the IGRUA/airline pages set theirs per intake, so
 * the post says they vary and sends the reader to the issuer. FAQPage schema is built from peopleAlsoAsk
 * (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'minimum-percentage-class-12-pilot-india';
const DATE_PUBLISHED = '2026-10-27';
const DATE_MODIFIED = '2026-10-27';

const pariFaq = PARIKSHA.sources.find((s) => s.label.startsWith('Flight Crew Computer Number Registration'));
const pariReject = PARIKSHA.sources.find((s) => s.label.startsWith('Reasons for rejection'));
const igruaUrl = CPL_COST.benchmark.source;

const peopleAlsoAsk = [
  {
    q: 'Is there a minimum percentage in Class 12 to become a pilot in India?',
    a: `Not in the DGCA documents we cite. The education condition is ${lc(EDUCATION.requirement)} (${EDUCATION.clause}), and the Pariksha registration rules ask for a pass in those subjects from a recognised board. A flying school or airline programme may set its own marks cut-off, and those vary by intake.`,
  },
  {
    q: 'Does a low Class 12 percentage stop me getting a DGCA computer number?',
    a: `The Pariksha rejection list names missing or unreadable marksheets, Physics and Mathematics not shown as passed, and a qualification from an unrecognised board. A low score on a passed marksheet is not on that list. What does cause rejection is a mismatch: ${lc(PARIKSHA.rejection.complete.meaning)}`,
  },
  {
    q: 'What if I failed Physics or Mathematics in Class 12?',
    a: `The requirement is a pass in both. ${EDUCATION.altRoute} A student who has not yet cleared them is not barred from flying altogether, but the CPL application waits until both are passed.`,
  },
  {
    q: 'Do flying schools in India ask for a minimum percentage?',
    a: `Some do and the figure is theirs, not DGCA's. Published cut-offs differ between schools and between intakes, and secondary websites that quote a single number disagree with each other. Ask the school for its current criteria in writing and compare them with your marksheet before paying anything.`,
  },
  {
    q: 'Do airline cadet programmes ask for a minimum percentage in Class 12?',
    a: `Each programme sets its own criteria for each intake. IndiGo's cadet page states ${INDIGO_CADET.education}, and the criteria for any intake are on the programme's own page when it opens. Treat any percentage quoted by a third-party website as unverified until you find it there.`,
  },
  {
    q: 'Does the Class 12 percentage affect the DGCA written exams?',
    a: `No. The written papers are marked on their own: a candidate needs ${EXAM_RULES.theory.passMark}% in each subject to pass, whatever the Class 12 score was. Your school marks decide whether you can register and be admitted, not how the DGCA papers are assessed.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Minimum Percentage in Class 12 to Become a Pilot in India',
  description:
    'Does DGCA set a minimum Class 12 percentage for a pilot? What the CPL rule and Pariksha registration check instead, and who sets marks cut-offs for schools and airline programmes.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot eligibility',
  keywords: 'minimum percentage in 12th for pilot, pilot eligibility percentage India, 12th marks for commercial pilot, CPL education requirement India, DGCA 12th marks',
});

const sources = [
  { label: pariFaq.label, url: pariFaq.url },
  { label: pariReject.label, url: pariReject.url },
  { label: 'IGRUA — approved courses (Indira Gandhi Rashtriya Uran Akademi)', url: igruaUrl },
  { label: INDIGO_CADET.source.label, url: INDIGO_CADET.source.url },
];

const related = [
  { lead: 'If Physics or Mathematics is missing from your marksheet, the bridge route is in', anchor: 'our guide to becoming a pilot without them', href: '/blogs/become-pilot-without-physics-and-maths-class-12' },
  { lead: 'The one licence with a lighter education rule is covered in', anchor: 'the PPL Physics and Maths post', href: '/blogs/ppl-physics-maths-requirement-india' },
  { lead: 'How a Class 12 mismatch gets an application rejected is in', anchor: 'the computer number rejection post', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'The wider admission paperwork is in', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
];

const tocHeadings = [
  { id: 'answer', title: 'What percentage do you need in Class 12 to become a pilot?' },
  { id: 'checked', title: 'What does DGCA check on your Class 12 record?' },
  { id: 'who-sets', title: 'Who sets a marks cut-off, then?' },
  { id: 'low-marks', title: 'What if your Class 12 marks are low?' },
  { id: 'verify', title: 'How do you check a school or programme cut-off?' },
  { id: 'this-week', title: 'What to do this week' },
];

const checkedRows = [
  { item: 'Subjects', check: EDUCATION.requirement, basis: `${EDUCATION.clause}, Aircraft Rules, 1937` },
  { item: 'Documents', check: PARIKSHA.education.documents, basis: 'Pariksha registration FAQ' },
  { item: 'Board', check: 'The qualification must come from a recognised board or university.', basis: 'Pariksha rejection list' },
  { item: 'Legibility', check: PARIKSHA.education.legibility, basis: 'Pariksha registration FAQ' },
  { item: 'Consistency', check: 'Marks and other particulars on the form must match the marksheet and the Board Verification Certificate.', basis: 'Pariksha rejection list' },
];

const whoRows = [
  { who: 'DGCA, for the licence', sets: 'Subjects passed (Physics and Mathematics), recognised board', verify: 'Section J, para 1(b) and the Pariksha FAQ' },
  { who: 'DGCA Pariksha, for the computer number', sets: 'Complete, legible, matching records', verify: 'Pariksha registration FAQ and rejection list' },
  { who: 'IGRUA, a government academy', sets: 'Its own admission criteria, published per cycle', verify: 'igrua.gov.in' },
  { who: 'An airline cadet programme', sets: 'Its own criteria, published per intake', verify: "The programme's own page" },
  { who: 'A private flying school', sets: 'Its own criteria, which can change', verify: 'The school, in writing' },
];

export default function MinimumPercentageClass12PilotIndia() {
  return (
    <BlogPostLayout
      title="Minimum Percentage in 12th to Become a Pilot in India"
      description="Does DGCA set a minimum Class 12 percentage for a pilot? What the CPL rule and Pariksha check instead, and who sets marks cut-offs for schools and airlines."
      schema={[articleSchema, faqSchema]}
      heading="Minimum Percentage in Class 12 to Become a Pilot in India"
      category="Pilot eligibility"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'What percentage do you need in Class 12 to become a pilot in India?',
        answer: `DGCA's CPL education rule asks for 10+2 passed with Physics and Mathematics from a recognised Board or University. The Pariksha registration rules and rejection list name a pass, a recognised board and matching records, not a percentage. Flying schools and airline cadet programmes can set their own marks cut-offs, and those vary by intake.`,
      }}
      summaryTitle="The Class 12 marks question in one view"
      summaryItems={[
        `The CPL education condition is a pass: ${lc(EDUCATION.requirement)} (${EDUCATION.clause}).`,
        'None of the DGCA documents cited here sets a Class 12 percentage.',
        'What DGCA does check is that the marksheet and certificate are complete, legible, from a recognised board and consistent with your form.',
        'Any marks cut-off comes from a flying school, IGRUA or an airline programme, and it is set per intake.',
        'Sources: DGCA Pariksha documents and the IndiGo and IGRUA pages, read in September 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="September 2026"
    >
      <p>
        A parent reads that the minimum percentage in Class 12 to become a pilot is 50, another page
        says 60, a third says 75, and the child scored 58 in Physics. Which number is the rule, and
        does missing it end the plan? This post separates what DGCA requires of a Class 12 record from
        what a school or airline asks of it, so you know which number you are actually chasing.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/minimum-percentage-class-12-pilot-india/hero-marksheet-and-gate.webp"
        width={1200}
        height={630}
        alt="A blank marksheet-style sheet on a desk beside a small gate outline, with a student's hand passing the sheet towards the gate and a distant training aircraft in the background"
        promptId="107"
      />

      <h2 id="answer" className={H2}>What percentage do you need in Class 12 to become a pilot?</h2>
      <p>
        DGCA does not state a percentage in the documents we cite. The Commercial Pilot Licence
        condition is {lc(EDUCATION.requirement)}, set by {EDUCATION.clause} of the Aircraft Rules, 1937,
        and the Pariksha registration rules ask for those subjects to be shown as passed. A pass, not a
        score, is what the licence rule describes.
      </p>
      <p>
        That does not mean marks are irrelevant everywhere. It means the number you need depends on
        who is asking. The licence asks for a pass, the portal asks for clean records, and a flying
        school or an airline asks for whatever it has decided for that intake. The sections below take
        those three in turn. The full eligibility picture, including age and medical, is on our{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>.
      </p>

      <h2 id="checked" className={H2}>What does DGCA check on your Class 12 record?</h2>
      <p>
        DGCA checks that the record is complete, readable, from a recognised board and consistent with
        what you typed. Registration runs through the{' '}
        <Ext href={PARIKSHA.portal}>Pariksha portal</Ext>, and its own{' '}
        <Ext href={pariFaq.url}>registration FAQ</Ext> and{' '}
        <Ext href={pariReject.url}>list of rejection reasons</Ext> describe exactly what is looked at.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">What the Class 12 record is checked for</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Checked</th>
              <th scope="col" className={TH}>What DGCA asks for</th>
              <th scope="col" className={TH}>Where it is stated</th>
            </tr>
          </thead>
          <tbody>
            {checkedRows.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.item}</td>
                <td className={TD}>{r.check}</td>
                <td className={TD}>{r.basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Marks matter here only as data. A mismatch in basic details is a complete rejection:{' '}
        {lc(PARIKSHA.rejection.complete.meaning)} {PARIKSHA.rejection.complete.consequence} So a
        modest score typed correctly passes this stage, and a high score typed wrongly does not. Our post
        on{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>
          why a DGCA computer number application is rejected
        </Link>{' '}
        covers the mismatches in full.
      </p>

      <BlogImagePlaceholder
        src="/blog/minimum-percentage-class-12-pilot-india/record-checked-not-score.webp"
        width={1200}
        height={675}
        alt="A marksheet-style sheet with a magnifying glass over its edge and a ruler, beside a tick-shaped mark, showing the record being checked for completeness rather than for a score"
        promptId="108"
      />

      <h2 id="who-sets" className={H2}>Who sets a marks cut-off, then?</h2>
      <p>
        The body admitting you does. Flying schools, IGRUA and airline cadet programmes each decide
        their own criteria for each intake, which is why a single percentage quoted on a website cannot
        be a national rule. The table shows who decides what and where to confirm it.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Who sets which Class 12 requirement and where to verify it</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Who is asking</th>
              <th scope="col" className={TH}>What it sets</th>
              <th scope="col" className={TH}>Where to verify</th>
            </tr>
          </thead>
          <tbody>
            {whoRows.map((r, i) => (
              <tr key={r.who} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.who}</td>
                <td className={TD}>{r.sets}</td>
                <td className={TD}>{r.verify}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <Ext href={igruaUrl}>IGRUA</Ext>, the government flying academy, publishes its own admission
        conditions and revises them each cycle, so last year&rsquo;s figure on a coaching page is not
        this year&rsquo;s rule. IndiGo&rsquo;s{' '}
        <Ext href={INDIGO_CADET.source.url}>cadet programme page</Ext> states {INDIGO_CADET.education}, and
        it is the place to read the rest of that programme&rsquo;s criteria. We do not print a school or
        airline percentage here: the secondary sources that quote one disagree, and an unsourced figure
        is not a source.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Written papers"
        title="Marks decide admission; the DGCA papers decide the licence"
        text="We teach the DGCA written subjects from our Dwarka classroom and online. The papers are marked on their own, so your Class 12 score does not follow you into them."
      />

      <h2 id="low-marks" className={H2}>What if your Class 12 marks are low?</h2>
      <p>
        A low score on a passed marksheet does not block the licence or the computer number. It may
        narrow which schools and programmes will take you, and that is a question for each of them. What
        does block progress is a failed subject: the requirement is a pass in Physics and Mathematics.
      </p>
      <ul className={UL}>
        <li>
          <strong>Passed, low score.</strong> You meet the DGCA condition. Ask each school or programme
          for its current criteria and apply where you qualify.
        </li>
        <li>
          <strong>Physics or Mathematics missing.</strong> {EDUCATION.altRoute} Our guide to{' '}
          <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className={LINK}>
            becoming a pilot without Physics and Maths in Class 12
          </Link>{' '}
          explains the route.
        </li>
        <li>
          <strong>Records that do not match.</strong> Fix the mismatch before you submit. After a
          complete rejection you apply again as a fresh applicant.
        </li>
      </ul>
      <p>
        The written papers are a separate hurdle. Each is passed or failed on its own, and a Class 12
        score has no bearing on them. The passing standard is set out in our{' '}
        <Link href="/blogs/dgca-exam-pass-marks-and-retakes-cpl" className={LINK}>
          post on DGCA pass marks and retakes
        </Link>.
      </p>

      <h2 id="verify" className={H2}>How do you check a school or programme cut-off?</h2>
      <p>
        Ask the issuer, in writing, for the current criteria, and compare them with your marksheet
        subject by subject. A phone answer or a number on a third-party page is not a record you can
        rely on.
      </p>
      <ol className={OL}>
        <li>Ask whether the cut-off applies to each subject or to an aggregate, and which subjects count.</li>
        <li>Ask which intake the figure belongs to and when it was last changed.</li>
        <li>Ask whether category relaxations exist and where they are published.</li>
        <li>
          Check the school against DGCA&rsquo;s own list before you pay, as set out in our{' '}
          <Link href="/blogs/best-flying-school-in-india" className={LINK}>guide to choosing a flying school</Link>.
        </li>
        <li>Book the medical early. {MEDICAL.advice}</li>
      </ol>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Lay your Class 10 and Class 12 marksheets and certificates side by side and confirm that
        Physics and Mathematics read as passed, that both documents are legible, and that names and
        dates match. Then write down which schools or programmes you are considering and ask each for
        its criteria. If you want a second pair of eyes, our{' '}
        <Link href="/pilot-career-counselling" className={LINK}>free counselling session</Link> will go
        through your marksheet with you, and the{' '}
        <Link href="/dgca-computer-number" className={LINK}>computer number guide</Link> covers the
        registration that comes next.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
