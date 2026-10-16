import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { PARIKSHA, EXAM_RULES, SYLLABUS, FOREIGN_LICENCE, DGCA_PAPERS, ACADEMY, inr } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * New topic. The other four DGCA subjects each have a page of their own at the repo root; Technical Specific
 * has none, and /blogs/dgca-ground-school-guide gives it one table row. This post owns one question: what the
 * paper is, why it is tied to an aircraft, and how it behaves in booking, pass mark and validity.
 * Pre-CPL audience: every CPL candidate sits it.
 * Every figure comes from DGCA_PAPERS, SYLLABUS, PARIKSHA, EXAM_RULES and FOREIGN_LICENCE in lib/facts.js.
 * Not stated, because no source on file states it: the CPL topic list for the paper, the list of aircraft
 * types it is offered on, and what happens to a passed paper if the candidate later flies a different type.
 * The post says so and points at DGCA. FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits).
 */
const SLUG = 'dgca-technical-specific-paper-cpl';
const DATE_PUBLISHED = '2026-10-16';
const DATE_MODIFIED = '2026-10-16';

const TS = 'Technical Specific';
const atplTs = SYLLABUS.atpl.papers.find((p) => p.paper === TS);
const cplBooks = SYLLABUS.studyMaterial.cpl;
const tgBooks = cplBooks.find((s) => s.subject === 'Technical General').books;
const hasTsHeading = cplBooks.some((s) => s.subject === TS);
const conversionCar = FOREIGN_LICENCE.sources[0];
const programme = PARIKSHA.sources.find((s) => s.label.startsWith('Programme of Examinations'));
const upcoming = [
  ...PARIKSHA.calendar2026.olode.slice(6).map((s) => ({ kind: 'Online On-Demand', ...s })),
  { kind: 'Regular', ...PARIKSHA.calendar2026.regular[3] },
];

const peopleAlsoAsk = [
  {
    q: 'What is the Technical Specific paper in the DGCA CPL exam?',
    a: `Technical Specific is one of the ${DGCA_PAPERS.length} DGCA written papers for a CPL. DGCA's published ATPL syllabus describes it as covering "${lc(atplTs.topics[0])}", so it concerns one aircraft rather than aircraft in general. The CPL topic list for the paper was not available in the sources we cite.`,
  },
  {
    q: 'Is Technical Specific the same as Technical General?',
    a: `No. Technical General is taught on generic aircraft knowledge, and DGCA's CPL study list names books for it, such as ${tgBooks[1]} and ${tgBooks[4]}. Technical Specific is tied to a particular aircraft, and the same list has no heading for it.`,
  },
  {
    q: 'Which aircraft is the Technical Specific paper about?',
    a: 'It relates to the aircraft you train on and name for the examination. The sources we cite do not publish a list of aircraft types, so ask your flying school which type it will use for your hours and which manual it works from.',
  },
  {
    q: 'Can I book Technical Specific together with other DGCA papers?',
    a: `Yes, with a limit on the specific paper itself. ${PARIKSHA.booking.onePerSession} ${PARIKSHA.booking.specificAircraft}`,
  },
  {
    q: 'What is the pass mark for Technical Specific, and how long does a pass last?',
    a: `The pass mark is ${EXAM_RULES.theory.passMark}% in each subject on its own, under ${EXAM_RULES.theory.clause} of ${EXAM_RULES.car.citation}. ${EXAM_RULES.paperValidity.cplAtpl} The rule is in ${EXAM_RULES.paperValidity.clause}.`,
  },
  {
    q: 'Does a pilot with a foreign licence ever sit the Technical Specific paper?',
    a: `Sometimes. Under the DGCA conversion rules, a pilot whose foreign rating is not current must either ${lc(FOREIGN_LICENCE.currency.ifNotCurrent[0])} or ${lc(FOREIGN_LICENCE.currency.ifNotCurrent[1])}. ${FOREIGN_LICENCE.currency.ifNotCurrentNote}`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'DGCA Technical Specific Paper: What It Covers and How It Works',
  description:
    'What the DGCA Technical Specific paper is, how it differs from Technical General, how it is booked and passed, and what changes if you switch aircraft.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA exams',
  keywords: 'DGCA technical specific, technical specific paper CPL, DGCA CPL subjects, technical specific vs technical general, DGCA specific aircraft paper',
});

const sources = [
  { label: `${EXAM_RULES.car.citation} (DGCA)`, url: EXAM_RULES.car.where },
  { label: 'List of Study Material for PPL, CPL and ATPL examinations (DGCA Pariksha)', url: SYLLABUS.studyMaterial.source },
  { label: programme.label, url: programme.url },
  { label: 'DGCA Pariksha portal', url: PARIKSHA.portal },
  { label: conversionCar.label.split(' — ')[0] + ' (DGCA)', url: conversionCar.url },
];

const related = [
  { lead: 'All five papers and how to prepare are in', anchor: 'our DGCA ground school guide', href: '/blogs/dgca-ground-school-guide' },
  { lead: 'Which books DGCA names is covered in', anchor: 'the recommended books post', href: '/blogs/dgca-recommended-books-cpl-exams' },
  { lead: 'Choosing between exam session types is in', anchor: 'the regular vs on-demand post', href: '/blogs/dgca-regular-vs-on-demand-exam-session' },
  { lead: 'The five-year window is explained in', anchor: 'the paper validity post', href: '/blogs/dgca-exam-pass-validity-cpl-five-years' },
];

const tocHeadings = [
  { id: 'what-is', title: 'What is the DGCA Technical Specific paper?' },
  { id: 'vs-general', title: 'How is it different from Technical General?' },
  { id: 'which-aircraft', title: 'Which aircraft does the paper relate to?' },
  { id: 'booking', title: 'How do you book it, and what does it cost?' },
  { id: 'pass-validity', title: 'What mark do you need, and how long does a pass last?' },
  { id: 'foreign', title: 'Does a foreign licence holder sit it too?' },
  { id: 'before-booking', title: 'What to do before you book it' },
];

export default function DgcaTechnicalSpecificPaperCpl() {
  return (
    <BlogPostLayout
      title="DGCA Technical Specific Paper: What It Is for the CPL"
      description="What the DGCA Technical Specific paper is, how it differs from Technical General, how it is booked and passed, and what changes if you switch aircraft."
      schema={[articleSchema, faqSchema]}
      heading="DGCA Technical Specific Paper: What It Covers and How It Works"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'What is the DGCA Technical Specific paper?',
        answer: `Technical Specific is one of the ${DGCA_PAPERS.length} DGCA written papers for a CPL, and it covers one particular aircraft and its systems rather than aircraft in general. It is booked like any other paper, passed at ${EXAM_RULES.theory.passMark}% on its own, and a pass counts for five years towards a CPL.`}}
      summaryTitle="Technical Specific in one view"
      summaryItems={[
        `Technical Specific is one of the ${DGCA_PAPERS.length} written papers: ${DGCA_PAPERS.join(', ')}.`,
        `DGCA's published ATPL syllabus describes it as "${lc(atplTs.topics[0])}".`,
        PARIKSHA.booking.specificAircraft,
        `The pass mark is ${EXAM_RULES.theory.passMark}% in each subject, and a CPL pass counts for five years.`,
        'Sources: DGCA Pariksha, CAR Section 7 Series B and Series G, verified between 11 and 17 September 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="17 September 2026"
    >
      <p>
        You have the list of DGCA subjects in front of you and four of the five are familiar words:
        navigation, meteorology, regulations, general technical. Then comes Technical Specific, and
        nobody can say quickly what it is specific to. The booking form asks for it by name, and the
        advice you find online ranges from "just read the aircraft manual" to nothing at all. This
        post explains the DGCA Technical Specific paper in plain terms, shows where it differs from
        Technical General, and sets out what the published rules say about booking and passing it.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/dgca-technical-specific-paper-cpl/hero-one-aircraft-five-papers.webp"
        width={1200}
        height={630}
        alt="Five blank exam papers in a row on a desk with a small single-engine training aircraft model standing on the fifth one"
        promptId="107"
      />

      <h2 id="what-is" className={H2}>What is the DGCA Technical Specific paper?</h2>
      <p>
        Technical Specific is one of the {DGCA_PAPERS.length} written papers a CPL candidate
        clears, alongside {DGCA_PAPERS.slice(0, 4).join(', ')}. DGCA&rsquo;s own syllabus for the
        airline transport licence describes it as covering &ldquo;{lc(atplTs.topics[0])}&rdquo;, which is the
        clearest published statement of what the paper is about.
      </p>
      <p>
        One boundary is worth stating honestly. That wording comes from the{' '}
        <Ext href={SYLLABUS.sources[0].url}>ATPL syllabus CAR</Ext>. {SYLLABUS.cpl.detailBoundary} So
        read the ATPL line as a description of what kind of paper this is, and treat any topic-by-topic
        CPL list you are handed as your school&rsquo;s teaching plan, not a DGCA document, unless it
        names the document it came from.
      </p>
      <p>
        The paper list itself is set out in Schedule II of the Aircraft Rules, 1937.{' '}
        {SYLLABUS.cpl.rtrNote} Our{' '}
        <Link href="/blogs/dgca-exam-guide" className={LINK}>DGCA exam guide</Link> walks through the
        five papers together.
      </p>

      <h2 id="vs-general" className={H2}>How is it different from Technical General?</h2>
      <p>
        Technical General teaches how aircraft work in general, and Technical Specific applies that
        ground to one aircraft. A fixed list of generic subjects can be studied from any standard text;
        a paper tied to an aircraft is studied from material about that aircraft. The table sets the two
        side by side using DGCA&rsquo;s own published study list.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Technical General compared with Technical Specific</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Point</th>
              <th scope="col" className={TH}>Technical General</th>
              <th scope="col" className={TH}>Technical Specific</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>Scope</td>
              <td className={TD}>Aircraft knowledge in general</td>
              <td className={TD}>{atplTs.topics[0]}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Books on DGCA&rsquo;s CPL study list</td>
              <td className={TD}>{tgBooks.length} titles, including {tgBooks[1]} and {tgBooks[4]}</td>
              <td className={TD}>{hasTsHeading ? 'Listed' : 'No heading on the list'}</td>
            </tr>
            <tr className="bg-white">
              <td className={TD_HEAD}>Tied to an aircraft</td>
              <td className={TD}>No</td>
              <td className={TD}>Yes</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Pass mark</td>
              <td className={TD}>{EXAM_RULES.theory.passMark}% in the subject</td>
              <td className={TD}>{EXAM_RULES.theory.passMark}% in the subject</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {SYLLABUS.studyMaterial.dgcaNote} The same list is read in detail in our{' '}
        <Link href="/blogs/dgca-recommended-books-cpl-exams" className={LINK}>recommended books post</Link>,
        including the places where it does not line up with the five papers.
      </p>

      <h2 id="which-aircraft" className={H2}>Which aircraft does the paper relate to?</h2>
      <p>
        The paper relates to the aircraft you train on and name for the examination, and no source we
        cite publishes a list of aircraft types. Your flying school knows which type it will use for
        your hours, so that is the first question to put to it, and the manual it works from is the
        second.
      </p>
      <p>
        That a type is involved is not in doubt. The DGCA rules for converting a foreign licence refer
        to passing the Technical Specific examination &ldquo;on the type&rdquo;, as the{' '}
        <Ext href={conversionCar.url}>conversion CAR</Ext> sets out. What the sources do not say is what
        happens to a paper you have already passed if you later fly a different type. That varies and
        is a question for DGCA&rsquo;s Central Examination Organisation, whose help desk is{' '}
        <Ext href={PARIKSHA.portal}>on the Pariksha portal</Ext>, before you plan around it.
      </p>
      <ul className={UL}>
        <li>Ask which aircraft type your flying school will use for the licence flying.</li>
        <li>Ask which manual or notes it teaches the type from, and whether they are part of its course.</li>
        <li>Ask how it handles a student who is moved to another type part-way through.</li>
      </ul>

      <BlogImagePlaceholder
        src="/blog/dgca-technical-specific-paper-cpl/general-books-and-one-manual.webp"
        width={1200}
        height={675}
        alt="A tall stack of four blank textbooks on the left and a single slim spiral-bound manual on the right, with a small aircraft model between them"
        promptId="108"
      />

      <BlogCta
        variant="mid"
        eyebrow="DGCA ground subjects"
        title="Where ground classes fit"
        text="We teach the DGCA written subjects from our Dwarka classroom and online. The aircraft you fly and the manual for it come from your flying school, and we cannot promise a result in any paper."
      />

      <h2 id="booking" className={H2}>How do you book it, and what does it cost?</h2>
      <p>
        You book Technical Specific on the Pariksha portal like any other paper, at{' '}
        {inr(PARIKSHA.fees.regularPerPaper)} in a regular session or {inr(PARIKSHA.fees.olodePerPaper)}{' '}
        in an Online On-Demand session, per paper. The one rule special to this paper: {PARIKSHA.booking.specificAircraft}
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Booking rules that apply to the Technical Specific paper</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Rule</th>
              <th scope="col" className={TH}>What DGCA Pariksha states</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>Fee per paper, regular session</td>
              <td className={TD}>{inr(PARIKSHA.fees.regularPerPaper)}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Fee per paper, Online On-Demand</td>
              <td className={TD}>{inr(PARIKSHA.fees.olodePerPaper)}</td>
            </tr>
            <tr className="bg-white">
              <td className={TD_HEAD}>Specific-aircraft papers per session</td>
              <td className={TD}>{PARIKSHA.booking.specificAircraft}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Applications per session</td>
              <td className={TD}>{PARIKSHA.booking.onePerSession}</td>
            </tr>
            <tr className="bg-white">
              <td className={TD_HEAD}>Centre choices</td>
              <td className={TD}>{PARIKSHA.booking.centreNote}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>After submitting</td>
              <td className={TD}>{PARIKSHA.booking.noChanges}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {PARIKSHA.booking.deadline} The sessions still ahead in DGCA&rsquo;s{' '}
        <Ext href={programme.url}>Programme of Examinations 2026</Ext> are below. {PARIKSHA.calendar2026.tentative}
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Remaining 2026 DGCA examination sessions after mid-October</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Session type</th>
              <th scope="col" className={TH}>Session</th>
              <th scope="col" className={TH}>Dates (tentative)</th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((s, i) => (
              <tr key={`${s.kind}-${s.session}`} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{s.kind}</td>
                <td className={TD}>{s.session}</td>
                <td className={TD}>{s.dates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The cost of the two session types and when to pay double are compared in our{' '}
        <Link href="/blogs/dgca-regular-vs-on-demand-exam-session" className={LINK}>regular vs on-demand post</Link>.
        If you have not yet registered, start with{' '}
        <Link href="/dgca-computer-number" className={LINK}>the computer number guide</Link>.
      </p>

      <h2 id="pass-validity" className={H2}>What mark do you need, and how long does a pass last?</h2>
      <p>
        You need {EXAM_RULES.theory.passMark}% in Technical Specific itself, and a pass counts for five
        years when you apply for a CPL. {EXAM_RULES.theory.perSubject} The pass mark comes from{' '}
        {EXAM_RULES.theory.clause} of the <Ext href={EXAM_RULES.car.where}>{EXAM_RULES.car.title} CAR</Ext>,
        and the five-year period from {EXAM_RULES.paperValidity.clause} of the same document.
      </p>
      <ul className={UL}>
        <li>A weak Technical Specific result touches only that paper; the other four stand on their own marks.</li>
        <li>{EXAM_RULES.paperValidity.planningNote}</li>
        <li>
          The number of attempts allowed is not stated in the sources we cite. What a failed paper costs
          you is worked through in our{' '}
          <Link href="/blogs/dgca-exam-pass-marks-and-retakes-cpl" className={LINK}>pass marks and retakes post</Link>.
        </li>
      </ul>
      <p>
        The five-year clock matters more for a paper tied to an aircraft than for the generic ones,
        because you are choosing when to sit it against when you will finish your flying. The{' '}
        <Link href="/blogs/dgca-exam-pass-validity-cpl-five-years" className={LINK}>paper validity post</Link>{' '}
        shows how to count backwards from the application date.
      </p>

      <h2 id="foreign" className={H2}>Does a foreign licence holder sit it too?</h2>
      <p>
        Sometimes. A pilot converting a foreign licence whose rating is not current has two routes under
        the conversion CAR: {lc(FOREIGN_LICENCE.currency.ifNotCurrent[0])}, or{' '}
        {lc(FOREIGN_LICENCE.currency.ifNotCurrent[1])}. {FOREIGN_LICENCE.currency.ifNotCurrentNote}
      </p>
      <p>
        This is a useful fact for a family weighing training abroad, because it shows the paper is a
        type-linked examination that DGCA keeps even for pilots who already fly. The full conversion
        process is in our{' '}
        <Link href="/blogs/convert-foreign-pilot-licence-to-dgca-india" className={LINK}>foreign licence conversion post</Link>.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="before-booking" className={H2}>What to do before you book it</h2>
      <p>
        Find out the aircraft type your flying school will use and get the name of the manual it teaches
        from, then write both down next to the paper. Book it after you know them, not before. Our{' '}
        <Link href="/courses/cpl" className={LINK}>CPL course page</Link> shows how ground training sits
        around flying with a partner school, and the next step after this paper is the six-item
        checklist in our <Link href="/blogs/cpl-application-egca-prerequisites-checklist" className={LINK}>eGCA application post</Link>.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
