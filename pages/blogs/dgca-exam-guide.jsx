import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import {
  ACADEMY, DGCA_PAPERS, RTR, EXAM_RULES, PARIKSHA, SYLLABUS, inr,
} from '../../lib/facts';
import {
  H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE,
  lc, listJoin, articleSchemaFor, faqSchemaFrom,
} from '../../lib/blogKit';

/*
 * /blogs/dgca-exam-guide — REWRITTEN 2026-10-08 to data/blog-standard.md.
 *
 * History: until 2026-09-17 this URL carried a "DGCA full form" explainer; that
 * subject belongs to /dgca-full-form and must not come back here. The 17
 * September rewrite made it an examination guide sourced from EXAM_RULES and
 * PARIKSHA. This pass keeps every one of those facts and changes the shape:
 * the shared blog layout instead of a one-off hero, a problem-led intro,
 * question H2s that answer in their first sentence, primary sources linked
 * inline, the three CTAs, and one FAQ list (the page used to render two, a
 * five-item "People also ask" and a separate fourteen-item FAQ).
 *
 * The 2026 session calendar is DGCA's, marked tentative by DGCA. The 2027
 * Programme of Examinations has not been read for this page; when it is, add
 * it to PARIKSHA in lib/facts.js with its source, not here.
 */
const SLUG = 'dgca-exam-guide';
const DATE_PUBLISHED = '2025-01-02';
const DATE_MODIFIED = '2026-10-08';
const HEADING = 'DGCA Exam Guide: Papers, Pass Mark, Fees, Sessions and How to Book';
const DESCRIPTION = 'DGCA exam guide for CPL students: the five papers, the 70% pass mark in each, fees, session dates, booking rules and how long a pass stays valid.';

const lastRegular = PARIKSHA.calendar2026.regular[PARIKSHA.calendar2026.regular.length - 1];

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA exams',
  keywords: 'DGCA exam guide, DGCA exam pass mark, DGCA exam fees, DGCA exam dates, DGCA CPL papers, DGCA Pariksha exam booking',
});

const peopleAlsoAsk = [
  {
    q: 'How many DGCA exams are there for a CPL?',
    a: `A Commercial Pilot Licence needs ${DGCA_PAPERS.length} DGCA written papers: ${listJoin(DGCA_PAPERS)}. ${RTR.name} is required for the licence too, but it is examined separately under its own rules, so it is not a sixth paper.`,
  },
  {
    q: 'What is the pass mark for the DGCA exams?',
    a: `The DGCA pass mark is ${EXAM_RULES.theory.passMark}% in each written subject, under ${EXAM_RULES.car.citation}, ${EXAM_RULES.theory.clause}. ${EXAM_RULES.theory.perSubject}`,
  },
  {
    q: 'How much is the DGCA exam fee?',
    a: `The DGCA exam fee is ${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} per paper in an on-demand session, paid to the Government of India through Bharatkosh. ${PARIKSHA.fees.serviceCharge}`,
  },
  {
    q: 'When are the DGCA exams held?',
    a: `DGCA holds ${PARIKSHA.calendar2026.regular.length} regular sessions a year plus on-demand sessions. The 2026 regular sessions are ${PARIKSHA.calendar2026.regular.map((s) => s.dates).join('; ')}. DGCA publishes these as tentative, so confirm against the public notice on the Pariksha portal.`,
  },
  {
    q: 'How long do DGCA exam passes stay valid?',
    a: `${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl} The period is counted back from the date of the licence application, so an early pass can lapse before the flying is finished.`,
  },
  {
    q: 'What happens if I fail one DGCA paper?',
    a: `A failed DGCA paper is retaken on its own in a later session. Each subject needs ${EXAM_RULES.theory.passMark}% by itself and there is no aggregate, so a failed paper does not affect the papers already passed, and a strong paper cannot make up for a weak one.`,
  },
  {
    q: 'Do I need a medical certificate to sit the DGCA exams?',
    a: 'No medical certificate is needed to register for a DGCA computer number or to sit the written papers. The medical is a requirement for the licence, not for the examinations, which is why students often clear papers while waiting for a medical date.',
  },
  {
    q: 'Can I book more than one DGCA session at a time?',
    a: `${PARIKSHA.booking.onePerSession} ${PARIKSHA.booking.specificAircraft} You fill ${PARIKSHA.booking.centreChoices} exam-centre choices on the form.`,
  },
  {
    q: 'What is the pass mark for the DGCA oral examinations?',
    a: `The oral pass mark depends on the licence: ${EXAM_RULES.oral.map((o) => `${o.licence}, ${o.passMark}%`).join('; ')} (${EXAM_RULES.car.citation}, para 5.7).`,
  },
  {
    q: 'Where is the detailed syllabus for each DGCA paper?',
    a: SYLLABUS.cpl.detailBoundary,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const related = [
  { lead: 'The number you need before you can book anything is explained in', anchor: 'our DGCA computer number guide', href: '/dgca-computer-number' },
  { lead: 'The portal itself, tab by tab, is on', anchor: 'the DGCA Pariksha page', href: '/dgca-pariksha' },
  { lead: 'Choosing between the two session types is covered in', anchor: 'regular vs on-demand DGCA exams', href: '/blogs/dgca-regular-vs-on-demand-exam-session' },
  { lead: 'Why a pass can expire before your licence application is in', anchor: 'the five-year rule for CPL papers', href: '/blogs/dgca-exam-pass-validity-cpl-five-years' },
  { lead: 'The books DGCA names for each subject are listed in', anchor: 'DGCA recommended books for the CPL exams', href: '/blogs/dgca-recommended-books-cpl-exams' },
  { lead: 'The separate radio examination is explained on', anchor: 'the RTR (A) page', href: '/rtr-a' },
];

const tocHeadings = [
  { id: 'papers', title: 'Which papers do you have to pass?' },
  { id: 'pass-mark', title: 'What is the pass mark?' },
  { id: 'validity', title: 'How long does a pass last?' },
  { id: 'fees', title: 'What does it cost?' },
  { id: 'sessions', title: 'When are the sessions?' },
  { id: 'booking', title: 'How do you book a paper?' },
  { id: 'oral', title: 'What about the oral examinations?' },
  { id: 'syllabus', title: 'Where is the syllabus?' },
  { id: 'plan', title: 'A sensible exam plan' },
];

const sources = [
  { label: `${EXAM_RULES.car.citation} — ${EXAM_RULES.car.title} (DGCA)`, url: EXAM_RULES.car.where },
  PARIKSHA.sources[1],
  PARIKSHA.sources[3],
  PARIKSHA.sources[0],
  SYLLABUS.sources[1],
  { label: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
];

export default function DGCAExamGuide() {
  return (
    <BlogPostLayout
      title="DGCA Exam Guide: Papers, Pass Mark, Fees and Session Dates"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'What are the DGCA exams for a commercial pilot licence?',
        answer: `The DGCA exams for a CPL are ${DGCA_PAPERS.length} written papers (${listJoin(DGCA_PAPERS)}), each passed separately with at least ${EXAM_RULES.theory.passMark}%. They cost ${inr(PARIKSHA.fees.regularPerPaper)} a paper in a regular session, are booked on the Pariksha portal with a computer number, and a pass stays usable for five years for a CPL application.`,
      }}
      summaryTitle="The rules in one view"
      summaryItems={[
        `${DGCA_PAPERS.length} papers for a CPL, ${EXAM_RULES.theory.passMark}% in each, no aggregate.`,
        `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} on demand.`,
        `${PARIKSHA.calendar2026.regular.length} regular sessions a year, plus on-demand sessions; dates are tentative.`,
        `A pass lasts five years towards a CPL or ATPL, two and a half for other licences.`,
        `${RTR.name} is a separate examination, not a sixth paper.`,
        `Source: ${EXAM_RULES.car.citation}, and DGCA Pariksha documents read ${PARIKSHA.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
      bottomCta={{
        title: 'Planning the order of your papers?',
        text: 'A free counselling session covers how to sequence the five papers against the medical and the flying, so that nothing lapses and nothing waits on something else.',
      }}
    >
      <p>
        Most students meet the DGCA exams through rumour first. One senior says the papers are easy if
        you memorise a question bank; another failed Air Navigation twice and lost a session each time;
        a coaching flyer lists nine subjects. The rules themselves are short and public, and they are
        stricter in one respect than most people expect: every paper stands alone, and a pass does not
        last for ever. This DGCA exam guide sets out the papers, the pass mark, the fees, the session
        calendar and the booking rules, each from the regulation or the portal that sets it, and ends
        with a plan that keeps your passes alive until your licence application goes in.
      </p>

      <BlogCta variant="top" />


      <h2 id="papers" className={H2}>Which DGCA papers do you have to pass for a CPL?</h2>
      <p>
        A Commercial Pilot Licence needs {DGCA_PAPERS.length} DGCA written papers: {listJoin(DGCA_PAPERS)}.
        The list is set by Schedule II of the Aircraft Rules, 1937, not by any school or coaching
        institute, and it is the same wherever you train in India.
      </p>
      <ol className={OL}>
        {DGCA_PAPERS.map((p) => <li key={p}><strong>{p}</strong></li>)}
      </ol>
      <p>
        {SYLLABUS.cpl.rtrNote} It sits under the {RTR.instrument}, and our{' '}
        <Link href="/rtr-a" className={LINK}>RTR (A) page</Link> explains it. Pages that count &ldquo;nine DGCA
        subjects&rdquo; are adding RTR and topics such as human performance as if they were papers; the
        rule lists five.
      </p>

      <h2 id="pass-mark" className={H2}>What is the DGCA exam pass mark?</h2>
      <p>
        The DGCA exam pass mark is {EXAM_RULES.theory.passMark}% in each written subject. The{' '}
        <Ext href={EXAM_RULES.car.where}>DGCA examinations CAR</Ext> puts it this way at{' '}
        {EXAM_RULES.theory.clause}: &ldquo;{EXAM_RULES.theory.statement}&rdquo;
      </p>
      <p>
        {EXAM_RULES.theory.perSubject} In practice, each paper is a self-contained project. Failing one
        costs you that paper and a session; clearing four comfortably does nothing for the fifth. That is
        why a study plan should be built paper by paper rather than as one block of revision.
      </p>

      <h2 id="validity" className={H2}>How long does a DGCA exam pass stay valid?</h2>
      <p>
        A DGCA written pass stays usable for five years towards a CPL or ATPL application, and for two and
        a half years for other licences. The clock runs backwards from the date you apply for the licence,
        not forwards from the date you passed.
      </p>
      <ul className={UL}>
        <li>{EXAM_RULES.paperValidity.general}</li>
        <li>{EXAM_RULES.paperValidity.cplAtpl} ({EXAM_RULES.paperValidity.clause})</li>
      </ul>
      <p>
        {EXAM_RULES.paperValidity.planningNote} A student who clears all five papers early and then takes
        a long time over the flying can find the first pass has lapsed by the time the application goes
        in. Note the date of your <em>first</em> pass, not just your next attempt. The rule is worked
        through with examples in{' '}
        <Link href="/blogs/dgca-exam-pass-validity-cpl-five-years" className={LINK}>the five-year rule for CPL papers</Link>.
      </p>

      <h2 id="fees" className={H2}>How much do the DGCA exams cost?</h2>
      <p>
        The DGCA exams cost {inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session and{' '}
        {inr(PARIKSHA.fees.olodePerPaper)} per paper in an on-demand session. These are government fees,
        paid through Bharatkosh, and they are separate from anything a ground school charges.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">DGCA examination fees per paper</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Item</th>
              <th scope="col" className={TH}>Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white"><td className={TD_HEAD}>Written paper, regular session</td><td className={TD}>{inr(PARIKSHA.fees.regularPerPaper)}</td></tr>
            <tr className="bg-gray-50"><td className={TD_HEAD}>Written paper, on-demand session</td><td className={TD}>{inr(PARIKSHA.fees.olodePerPaper)}</td></tr>
            <tr className="bg-white"><td className={TD_HEAD}>Oral paper</td><td className={TD}>{inr(PARIKSHA.fees.oralPerPaper)}</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        {PARIKSHA.fees.oralNote} {PARIKSHA.fees.serviceCharge} {PARIKSHA.booking.noChanges} If a payment
        fails at the bank, the refund route is in{' '}
        <Link href="/blogs/dgca-exam-fee-refund-failed-payment" className={LINK}>DGCA exam fee refunds</Link>.
      </p>

      <h2 id="sessions" className={H2}>When are the DGCA exam sessions?</h2>
      <p>
        DGCA runs {PARIKSHA.calendar2026.regular.length} regular examination sessions a year and a
        separate series of on-demand sessions. The 2026 dates below are from DGCA&rsquo;s{' '}
        <Ext href={PARIKSHA.sources[3].url}>Programme of Examinations 2026</Ext>, which DGCA itself marks
        as tentative.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <caption className="sr-only">DGCA regular examination sessions, 2026</caption>
            <thead><tr><th scope="col" className={TH}>Regular session</th><th scope="col" className={TH}>Dates</th></tr></thead>
            <tbody>
              {PARIKSHA.calendar2026.regular.map((s, i) => (
                <tr key={s.session} className={i % 2 ? 'bg-gray-50' : 'bg-white'}><td className={TD_HEAD}>{s.session}</td><td className={TD}>{s.dates}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={TABLE_WRAP}>
          <table className={TABLE}>
            <caption className="sr-only">DGCA on-demand examination sessions, 2026</caption>
            <thead><tr><th scope="col" className={TH}>On-demand session</th><th scope="col" className={TH}>Dates</th></tr></thead>
            <tbody>
              {PARIKSHA.calendar2026.olode.map((s, i) => (
                <tr key={s.session} className={i % 2 ? 'bg-gray-50' : 'bg-white'}><td className={TD_HEAD}>{s.session}</td><td className={TD}>{s.dates}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p>
        {PARIKSHA.calendar2026.tentative} The last regular session of 2026 is {lastRegular.session},{' '}
        {lastRegular.dates}. DGCA publishes each year&rsquo;s programme on the Pariksha portal; the 2027
        programme had not been read for this page, so check the portal for it rather than assuming the
        same pattern. Which session type suits you is weighed in{' '}
        <Link href="/blogs/dgca-regular-vs-on-demand-exam-session" className={LINK}>regular vs on-demand sessions</Link>.
      </p>

      <BlogCta
        variant="mid"
        title="Preparing for the five papers?"
        text="We teach Air Navigation, Meteorology, Air Regulations and both Technical papers from our Dwarka classroom and online."
      />

      <h2 id="booking" className={H2}>How do you book a DGCA exam?</h2>
      <p>
        A DGCA exam is booked on the{' '}
        <Ext href={PARIKSHA.portal}>Pariksha portal</Ext> by a candidate who already holds a computer
        number, by filling the examination form for a session and paying through Bharatkosh before the
        closing date. The rules in DGCA&rsquo;s{' '}
        <Ext href={PARIKSHA.sources[1].url}>Flight Crew User Manual</Ext> are strict and worth reading
        before the first booking:
      </p>
      <ul className={UL}>
        {[
          PARIKSHA.booking.onePerSession,
          PARIKSHA.booking.centreNote,
          PARIKSHA.booking.specificAircraft,
          PARIKSHA.booking.payment,
          PARIKSHA.booking.deadline,
          PARIKSHA.booking.noChanges,
          PARIKSHA.hardCopy.examinationForm,
        ].map((b) => <li key={b}>{b}</li>)}
      </ul>
      <p>
        The computer number comes first and has its own rules; our{' '}
        <Link href="/dgca-computer-number" className={LINK}>computer number guide</Link> covers the DigiLocker
        and manual routes, and{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>why applications get rejected</Link>{' '}
        lists the mistakes that cost students weeks.
      </p>

      <h2 id="oral" className={H2}>What is the pass mark for the DGCA oral exams?</h2>
      <p>
        The DGCA oral pass mark depends on the licence: it is 50% for some and 70% for others, set out at
        para 5.7 of the same examinations CAR. Students who assume 70% applies everywhere are often
        surprised by it.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">DGCA oral examination pass marks by licence or rating</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Licence or rating</th>
              <th scope="col" className={TH}>Pass mark</th>
              <th scope="col" className={TH}>Clause</th>
            </tr>
          </thead>
          <tbody>
            {EXAM_RULES.oral.map((o, i) => (
              <tr key={o.licence} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{o.licence}</td>
                <td className={TD}>{o.passMark}%</td>
                <td className={TD}>{o.clause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{EXAM_RULES.oralRetake.statement} ({EXAM_RULES.oralRetake.clause})</p>

      <h2 id="syllabus" className={H2}>Where is the syllabus for each DGCA paper?</h2>
      <p>
        DGCA publishes the list of CPL papers and, separately, a list of recommended reference books on
        the Pariksha portal; the topic-by-topic CPL syllabus sits in a Civil Aviation Requirement that we
        could not retrieve from a government server, so this guide does not print one.
      </p>
      <p>
        {SYLLABUS.cpl.detailBoundary} What is published, DGCA&rsquo;s own{' '}
        <Ext href={SYLLABUS.sources[1].url}>list of study material</Ext>, is set out paper by paper in{' '}
        <Link href="/blogs/dgca-recommended-books-cpl-exams" className={LINK}>DGCA recommended books for the CPL exams</Link>,
        and the ATPL syllabus, which is published, is on our{' '}
        <Link href="/commercial-pilot-license-syllabus" className={LINK}>syllabus page</Link>.
      </p>

      <h2 id="plan" className={H2}>A sensible DGCA exam plan</h2>
      <p>
        A sensible DGCA exam plan books papers in the order you can pass them, one or two per session,
        and times the first pass so that it is still inside its five-year window on the day you apply for
        the licence. Register for the computer number early, because it needs no medical and no flying
        school and waiting for it costs a session.
      </p>
      <p>These are our suggestions, not DGCA rules:</p>
      <ol className={OL}>
        <li>Get the computer number before you need it.</li>
        <li>Pair a lighter paper with a heavier one in your first session, rather than attempting all five.</li>
        <li>Write down the date of every pass, and the date the first one will lapse.</li>
        <li>Keep {RTR.name} on its own timetable; it does not wait for the papers.</li>
      </ol>
      <p>
        Do that, and the examinations become the most predictable part of your training rather than the
        part that quietly expires behind you.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
