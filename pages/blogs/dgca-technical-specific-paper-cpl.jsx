import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { EXAM_RULES, PARIKSHA, DGCA_PAPERS, SYLLABUS, ACADEMY, inr } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from dgca-recommended-books-cpl-exams (which notes in one FAQ that the CPL book list has no
 * Technical Specific heading), dgca-ground-school-guide (a paper-by-paper study plan) and
 * dgca-exam-pass-marks-and-retakes-cpl (the 70% rule). This post owns one question: what the
 * Technical Specific paper is, why it differs from the other four, and how to time it.
 * Every figure comes from DGCA_PAPERS, SYLLABUS, EXAM_RULES and PARIKSHA in lib/facts.js.
 * NOT stated, because no primary source on file says it: which aircraft types DGCA accepts for the CPL
 * paper, how the question bank is set, or how many questions it has. The post says the type follows
 * the training and sends the reader to their school and the portal.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'dgca-technical-specific-paper-cpl';
const DATE_PUBLISHED = '2026-10-21';
const DATE_MODIFIED = '2026-10-21';

const T = EXAM_RULES.theory;
const FEES = PARIKSHA.fees;
const BOOK = PARIKSHA.booking;
const atplSpecific = SYLLABUS.atpl.papers.find((p) => p.paper === 'Technical Specific');
const atplPerformance = SYLLABUS.atpl.papers.find((p) => p.paper === 'Technical Performance');
const [atplCarSource, studyListSource] = SYLLABUS.sources;
const programmeUrl = PARIKSHA.sources.find((s) => s.label.startsWith('Programme of Examinations 2026')).url;
const others = DGCA_PAPERS.filter((p) => p !== 'Technical Specific');

const peopleAlsoAsk = [
  {
    q: 'What is the Technical Specific paper in the DGCA CPL exam?',
    a: `It is one of the ${DGCA_PAPERS.length} DGCA written papers for a CPL, alongside ${others.join(', ')}. DGCA's ATPL syllabus describes the paper's content as "${atplSpecific.topics[0].toLowerCase()}", which is why it is tied to one aircraft rather than to aeroplanes in general.`,
  },
  {
    q: 'Which aircraft is the Technical Specific paper on?',
    a: `The aircraft you train on or name for the paper. The sources we cite do not list which types are accepted for the CPL paper, so we do not publish a list. Ask your flying school which type it flies and confirm the paper choice on the Pariksha portal when you book.`,
  },
  {
    q: 'Is there a recommended book for Technical Specific?',
    a: `No title is listed under that heading. DGCA's study-material list gives the CPL five headings and none of them is Technical Specific. The aircraft's own manual and the notes your flying school uses for that type are what apply.`,
  },
  {
    q: 'What is the pass mark for Technical Specific?',
    a: `${T.passMark}%, the same as every other paper. ${T.perSubject} The rule is in ${EXAM_RULES.car.citation}, ${T.clause}.`,
  },
  {
    q: 'Can I take Technical Specific in the same session as other papers?',
    a: `Yes, within limits. ${BOOK.onePerSession} ${BOOK.specificAircraft} A regular session paper costs ${inr(FEES.regularPerPaper)} and an on-demand paper ${inr(FEES.olodePerPaper)}.`,
  },
  {
    q: 'Do I need Technical Specific again for a type rating?',
    a: `A type rating is a separate qualification on one aircraft type, and DGCA's licence-conversion rules name a Technical Specific examination on the type as a requirement in some cases. Whether an airline-type paper is needed depends on the type and the route, so confirm it with the training organisation before you pay.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'DGCA Technical Specific Paper for the CPL: Which Aircraft It Covers and When to Take It',
  description:
    'The Technical Specific paper is the one CPL exam tied to a single aircraft. What it covers, how it differs from Technical General, how it is booked and when to sit it.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA exams',
  keywords: 'DGCA Technical Specific paper, CPL Technical Specific, Technical Specific aircraft DGCA, DGCA CPL papers, Technical General vs Technical Specific',
});

const sources = [atplCarSource, studyListSource, { label: `${EXAM_RULES.car.citation} (DGCA)`, url: EXAM_RULES.car.where }, { label: 'DGCA Pariksha portal', url: PARIKSHA.portal }];

const related = [
  { lead: 'The reading list for the other papers is in', anchor: 'the DGCA recommended books post', href: '/blogs/dgca-recommended-books-cpl-exams' },
  { lead: 'How the 70% rule works is in', anchor: 'the pass marks and retakes post', href: '/blogs/dgca-exam-pass-marks-and-retakes-cpl' },
  { lead: 'Choosing a sitting is covered in', anchor: 'the regular vs on-demand session post', href: '/blogs/dgca-regular-vs-on-demand-exam-session' },
  { lead: 'A study order for all five papers is in', anchor: 'the DGCA ground school guide', href: '/blogs/dgca-ground-school-guide' },
];

const tocHeadings = [
  { id: 'what', title: 'What is the Technical Specific paper?' },
  { id: 'difference', title: 'How is it different from Technical General?' },
  { id: 'aircraft', title: 'Which aircraft is the paper on?' },
  { id: 'booking', title: 'How is the paper booked?' },
  { id: 'timing', title: 'When should you take it?' },
  { id: 'this-week', title: 'What to do this week' },
];

const compareRows = [
  { point: 'What it covers', general: 'Aircraft knowledge that applies to aeroplanes broadly: airframe, systems, electrics, powerplant and principles of flight.', specific: `${atplSpecific.topics[0]}.` },
  { point: 'Books on the DGCA CPL list', general: 'Yes. Several titles are named under Technical General.', specific: 'None. No heading on the CPL list matches it.' },
  { point: 'Pass mark', general: `${T.passMark}% in the paper`, specific: `${T.passMark}% in the paper` },
  { point: 'Fee per paper', general: `${inr(FEES.regularPerPaper)} regular, ${inr(FEES.olodePerPaper)} on-demand`, specific: `${inr(FEES.regularPerPaper)} regular, ${inr(FEES.olodePerPaper)} on-demand` },
  { point: 'Booking limit', general: BOOK.onePerSession, specific: BOOK.specificAircraft },
];

export default function DgcaTechnicalSpecificPaperCpl() {
  return (
    <BlogPostLayout
      title="DGCA Technical Specific Paper for the CPL Explained"
      description="The Technical Specific paper is the one CPL exam tied to one aircraft. What it covers, how it differs from Technical General, how to book it and when to sit it."
      schema={[articleSchema, faqSchema]}
      heading="DGCA Technical Specific Paper for the CPL: Which Aircraft It Covers and When to Take It"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'What is the Technical Specific paper in the DGCA CPL exams?',
        answer: `Technical Specific is one of the ${DGCA_PAPERS.length} DGCA written papers for a CPL, and the only one about a particular aircraft and its systems rather than aeroplanes in general. It needs ${T.passMark}% like every other paper. DGCA's CPL book list has no heading for it, so your flying school's material for that type is the main source.`,
      }}
      summaryTitle="Technical Specific in one view"
      summaryItems={[
        `It is one of the ${DGCA_PAPERS.length} written CPL papers: ${DGCA_PAPERS.join(', ')}.`,
        `DGCA's ATPL syllabus describes it as "${atplSpecific.topics[0].toLowerCase()}".`,
        `The pass mark is ${T.passMark}% in the paper on its own, with no aggregate.`,
        `${BOOK.specificAircraft}`,
        `Sources: DGCA's syllabus CAR, its study-material list and the Pariksha rules, read on 11 September 2026; which types DGCA accepts for the CPL paper is not in them.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="11 September 2026"
    >
      <p>
        A student finishes Navigation and Meteorology, reads the DGCA book list and finds a book for
        every paper but one. The fifth paper, Technical Specific, has no heading on the list, and the
        coaching notes disagree about what it even is. Some call it an easier version of Technical
        General; others say it depends on a plane you have not yet flown. The DGCA Technical Specific
        paper is neither, and it is the one CPL exam you cannot prepare for from a generic textbook.
        This post settles what it covers, what the sources do not say, and where it fits in your plan.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/dgca-technical-specific-paper/hero-one-aircraft-five-papers.webp"
        width={1200}
        height={630}
        alt="Five document sheets in a row with one connected by a thin line to a single small aeroplane on a runway"
        promptId="107"
      />

      <h2 id="what" className={H2}>What is the Technical Specific paper?</h2>
      <p>
        Technical Specific is one of the {DGCA_PAPERS.length} DGCA written papers for the Commercial Pilot
        Licence, and it tests one particular aircraft and its related systems. DGCA&rsquo;s own syllabus
        for the airline licence, in{' '}
        <Ext href={atplCarSource.url}>CAR Section 7, Series &lsquo;B&rsquo;, Part VI</Ext>, lists the paper
        as &ldquo;{atplSpecific.topics[0].toLowerCase()}&rdquo;.
      </p>
      <p>
        The five CPL papers are set by Schedule II of the Aircraft Rules, 1937. Four of them,{' '}
        {others.join(', ')}, are subjects. The fifth is a subject applied to a machine. {SYLLABUS.cpl.detailBoundary}{' '}
        So the topic list for the CPL version is not something we can quote, and any page that prints
        one without naming its document is working from memory.
      </p>

      <h2 id="difference" className={H2}>How is Technical Specific different from Technical General?</h2>
      <p>
        Technical General covers aircraft knowledge that applies across aeroplanes, while Technical
        Specific applies it to one named type. The two share a pass mark and a fee, and differ in what
        you can buy to study for them.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Technical General compared with Technical Specific for the DGCA CPL</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Point</th>
              <th scope="col" className={TH}>Technical General</th>
              <th scope="col" className={TH}>Technical Specific</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((r, i) => (
              <tr key={r.point} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.point}</td>
                <td className={TD}>{r.general}</td>
                <td className={TD}>{r.specific}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The book column is the practical difference.{' '}
        <Ext href={studyListSource.url}>DGCA&rsquo;s List of Study Material</Ext> names titles for
        Technical General and does not name any for Technical Specific. We went through that list
        paper by paper in our post on the{' '}
        <Link href="/blogs/dgca-recommended-books-cpl-exams" className={LINK}>books DGCA recommends for the CPL exams</Link>.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Planning the five papers?"
        title="Get a paper-by-paper plan"
        text="Counselling is free. Bring your Class 12 marksheet and we will lay out an order for the five DGCA papers, and say which parts depend on the flying school you choose."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <h2 id="aircraft" className={H2}>Which aircraft is the Technical Specific paper on?</h2>
      <p>
        It is the aircraft you are being trained on or name for the paper, which is why your flying
        school decides what you study. The sources we cite do not say which types DGCA accepts for the
        CPL paper, so we do not publish a list of them.
      </p>
      <p>
        Two things are on record. The airline-licence syllabus pairs the paper with a separate
        Technical Performance paper that &ldquo;{atplPerformance.topics[1].toLowerCase()}&rdquo;, so
        the heavier and twin-engine aeroplanes are handled by a second paper, not by this one. And DGCA&rsquo;s
        licence-conversion rules, which we cover in our post on{' '}
        <Link href="/blogs/convert-foreign-pilot-licence-to-dgca-india" className={LINK}>converting a foreign pilot licence</Link>,
        use the same paper again: a pilot whose foreign rating is not current must pass the DGCA
        Technical Specific examination on the type. The paper follows the aircraft, wherever the pilot
        trained.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-technical-specific-paper/general-versus-specific.webp"
        width={1200}
        height={675}
        alt="A student's hand pointing at a single small aeroplane drawn beside a wide set of general aircraft parts on a desk"
        promptId="108"
      />

      <h2 id="booking" className={H2}>How is the Technical Specific paper booked?</h2>
      <p>
        You book it like any other paper on the{' '}
        <Ext href={PARIKSHA.portal}>Pariksha portal</Ext>, paying through Bharatkosh, with one rule of
        its own. {BOOK.specificAircraft} {BOOK.onePerSession}
      </p>
      <ul className={UL}>
        <li>{inr(FEES.regularPerPaper)} per paper in a regular session, {inr(FEES.olodePerPaper)} in an on-demand session.</li>
        <li>{BOOK.noChanges}</li>
        <li>The 2026 session dates are on the <Ext href={programmeUrl}>Programme of Examinations</Ext>, and DGCA prints them as tentative.</li>
      </ul>
      <p>
        Which sitting to choose is a separate question, and we compare the two in{' '}
        <Link href="/blogs/dgca-regular-vs-on-demand-exam-session" className={LINK}>regular vs on-demand DGCA exam sessions</Link>.
      </p>

      <h2 id="timing" className={H2}>When should you take the Technical Specific paper?</h2>
      <p>
        Take it once you know your training aircraft and have started flying it, because that is when
        the manual stops being abstract. Clearing it early is not free: a passed paper has a clock.
      </p>
      <p>
        {EXAM_RULES.paperValidity.cplAtpl} {EXAM_RULES.paperValidity.planningNote} The mark needed is the same {T.passMark}% as for
        the other papers, covered in our post on{' '}
        <Link href="/blogs/dgca-exam-pass-marks-and-retakes-cpl" className={LINK}>pass marks and retakes</Link>.
        Changing the aircraft you train on after clearing the paper is a question to put to the school
        and to the Pariksha help desk, because the sources we cite do not answer it.
      </p>
      <p>
        Our <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes</Link> cover the
        written subjects. The aircraft itself is the flying school&rsquo;s, not ours.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Ask the flying school you are considering which aircraft it trains on, and whether it gives
        students a manual and notes for that type. Put Technical Specific last in your paper plan, but
        not last in your calendar: it is the one you cannot start from a library book.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
