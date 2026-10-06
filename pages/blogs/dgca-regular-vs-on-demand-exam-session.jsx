import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { EXAM_RULES, PARIKSHA, DGCA_PAPERS, ACADEMY, inr, papersSummary } from '../../lib/facts';

/*
 * Distinct from dgca-exam-guide (the whole exam process), dgca-exam-fee-refund-failed-payment
 * (what happens after a payment) and dgca-exam-pass-validity-cpl-five-years (how long a pass lasts).
 * This post owns one decision: regular session or on-demand (OLODE) session, and what the
 * difference costs. Fees, session dates and booking rules are read from PARIKSHA in lib/facts.js.
 * How an OLODE slot is allotted is NOT in PARIKSHA, so the post says so rather than describe it.
 * FAQPage schema is built from peopleAlsoAsk because data/pageFaqs.js is off limits to the routine.
 */
const DATE_PUBLISHED = '2026-10-06';
const DATE_MODIFIED = '2026-10-06';
const CANONICAL = 'https://weoneaviation.in/blogs/dgca-regular-vs-on-demand-exam-session';

const regularFee = PARIKSHA.fees.regularPerPaper;
const olodeFee = PARIKSHA.fees.olodePerPaper;
const nPapers = DGCA_PAPERS.length;
const regular = PARIKSHA.calendar2026.regular;
const olode = PARIKSHA.calendar2026.olode;
const programmeUrl = PARIKSHA.sources.find((s) => s.label.startsWith('Programme of Examinations 2026')).url;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Regular vs On-Demand DGCA Exam Session: Which Should You Book?',
  description:
    'DGCA runs four regular exam sessions and eight online on-demand sessions in 2026. The on-demand fee is double. What each costs, when the gap matters, and how to choose.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA exams',
  keywords: 'DGCA on demand exam, OLODE DGCA, DGCA regular exam vs on demand, DGCA exam fee 5000, DGCA exam sessions 2026',
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
    q: 'What is the DGCA on-demand exam (OLODE)?',
    a: `OLODE is the Online On-Demand Examination, a second kind of exam session on the DGCA Pariksha portal. DGCA lists ${olode.length} of them for 2026, alongside ${regular.length} regular sessions. The papers and the ${EXAM_RULES.theory.passMark}% pass mark are the same; the fee per paper is ${inr(olodeFee)} instead of ${inr(regularFee)}.`,
  },
  {
    q: 'How much more does the on-demand exam cost?',
    a: `${inr(olodeFee - regularFee)} more per paper. All ${nPapers} CPL papers cost ${inr(regularFee * nPapers)} in a regular session and ${inr(olodeFee * nPapers)} on demand, before any bank service charge.`,
  },
  {
    q: 'Can I take any DGCA paper on demand?',
    a: `This post could not confirm from DGCA's published rules which papers are offered in each on-demand session, so do not assume every paper is available every time. Check the session notice on the Pariksha portal before you plan around it.`,
  },
  {
    q: 'Can I book both a regular and an on-demand session together?',
    a: `${PARIKSHA.booking.onePerSession} Treat each session as a separate application with its own fee, and read the booking rules on the portal before applying twice.`,
  },
  {
    q: 'Is the exam fee refundable if I pick the wrong session?',
    a: `No. ${PARIKSHA.booking.noChanges} A fee is refunded only where the Bharatkosh payment succeeded but no service was delivered, and never carried to a later session.`,
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
  { lead: 'The whole exam process, paper by paper, is in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'What happens to a fee you cannot use is explained in', anchor: 'the exam fee refund post', href: '/blogs/dgca-exam-fee-refund-failed-payment' },
  { lead: 'How long a cleared paper counts is covered in', anchor: 'the five-year validity post', href: '/blogs/dgca-exam-pass-validity-cpl-five-years' },
  { lead: 'Session dates, fees and booking rules also sit on', anchor: 'the DGCA Pariksha page', href: '/dgca-pariksha' },
  { lead: 'Preparing for the papers: see', anchor: 'DGCA ground classes', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'answer', title: 'Regular or on-demand: which should you book?' },
  { id: 'difference', title: 'What actually differs' },
  { id: 'calendar', title: 'The 2026 calendar side by side' },
  { id: 'cost', title: 'What the doubled fee adds up to' },
  { id: 'when', title: 'When paying double makes sense' },
  { id: 'unknowns', title: 'What this post cannot tell you' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const costRows = [
  { what: 'One paper, one attempt', reg: inr(regularFee), od: inr(olodeFee), gap: inr(olodeFee - regularFee) },
  { what: `All ${nPapers} CPL papers, one attempt each`, reg: inr(regularFee * nPapers), od: inr(olodeFee * nPapers), gap: inr((olodeFee - regularFee) * nPapers) },
  { what: 'One failed paper, retaken once', reg: inr(regularFee * 2), od: inr(olodeFee * 2), gap: inr((olodeFee - regularFee) * 2) },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const LINK = 'text-av-orange font-semibold underline';

export default function DgcaRegularVsOnDemandExamSession() {
  return (
    <BlogPostLayout
      title="Regular vs On-Demand DGCA Exam: Which Session to Book"
      description="DGCA lists four regular and eight on-demand exam sessions for 2026, and the on-demand fee is double. See the costs, the gaps between sessions and when each makes sense."
      schema={[articleSchema, faqSchema]}
      heading="Regular vs On-Demand DGCA Exam Session: Which Should You Book?"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'Should you book a regular or an on-demand DGCA exam session?',
        answer: `Book the regular session unless the wait costs you more than the extra fee. Both cover the same papers at the same ${EXAM_RULES.theory.passMark}% pass mark, but an on-demand paper costs ${inr(olodeFee)} against ${inr(regularFee)}. DGCA lists ${regular.length} regular and ${olode.length} on-demand sessions for 2026.`,
      }}
      summaryTitle="The two session types in one view"
      summaryItems={[
        `Regular session: ${inr(regularFee)} per paper, ${regular.length} sessions listed for 2026.`,
        `On-demand (OLODE) session: ${inr(olodeFee)} per paper, ${olode.length} sessions listed for 2026.`,
        EXAM_RULES.theory.statement,
        PARIKSHA.booking.onePerSession,
        `Source: DGCA Pariksha, Programme of Examinations 2026, read on ${PARIKSHA.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/dgca-regular-vs-on-demand-exam-session/hero-two-session-lanes.webp"
        width={1200}
        height={630}
        alt="Two horizontal lanes on a calendar strip: a sparse lane with four large markers and a denser lane with eight small markers, both leading to the same exam desk"
        promptId="90"
      />

      <h2 id="answer" className={H2}>Regular or on-demand: which should you book?</h2>
      <p>
        If you can wait for the next regular session, book that. It is half the price. The
        on-demand route exists for the student whose timeline cannot wait, and for that student
        the extra {inr(olodeFee - regularFee)} per paper is the price of getting the paper out of
        the way sooner. The decision comes down to arithmetic and calendar, and both are laid out
        below.
      </p>
      <p>
        DGCA runs its written papers through the Pariksha portal. The {nPapers} CPL theory papers
        are {papersSummary()}, and a candidate needs a computer number before booking any of them.
        This post covers only the choice between the two kinds of session.
      </p>

      <h2 id="difference" className={H2}>What actually differs</h2>
      <p>
        On the published rules, one thing differs: the fee. Each paper is {inr(regularFee)} in a
        regular session and {inr(olodeFee)} in an Online On-Demand Examination. Everything that
        decides whether you pass is the same. {EXAM_RULES.theory.statement}{' '}
        {EXAM_RULES.theory.perSubject}
      </p>
      <p>
        The other difference is frequency. The regular sessions come four times a year; the
        on-demand sessions come eight times. More sessions means shorter waits, and shorter waits
        are what the higher fee buys.
      </p>
      <p>
        Both kinds share the same booking rules. {PARIKSHA.booking.onePerSession}{' '}
        {PARIKSHA.booking.payment} {PARIKSHA.booking.noChanges}
      </p>

      <h2 id="calendar" className={H2}>The 2026 calendar side by side</h2>
      <p>
        These are the sessions DGCA lists for 2026. {PARIKSHA.calendar2026.tentative}
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA regular and on-demand exam sessions listed for 2026</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Regular session ({inr(regularFee)} a paper)</th>
              <th scope="col" className={TH}>On-demand session ({inr(olodeFee)} a paper)</th>
            </tr>
          </thead>
          <tbody>
            {olode.map((o, i) => (
              <tr key={o.session} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD}>{regular[i] ? `${regular[i].session}: ${regular[i].dates}` : ''}</td>
                <td className={TD}>{o.session}: {o.dates}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Read down the rows only as two lists; the dates in one column do not line up with the
        other. What the lists show is the spacing. Regular sessions sit about three months apart.
        On-demand sessions sit closer together, in places only a couple of weeks apart, and each is a three-day window.
        Miss a regular session and the next is a quarter away; miss an on-demand one and the
        next is often within weeks, at double the fee.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-regular-vs-on-demand-exam-session/calendar-gaps.webp"
        width={1200}
        height={675}
        alt="A year laid out as twelve blocks with four wide markers for regular sessions and eight narrow markers for on-demand sessions, showing the shorter gaps between the narrow ones"
        promptId="91"
      />

      <h2 id="cost" className={H2}>What the doubled fee adds up to</h2>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Regular against on-demand DGCA exam fees</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Scenario</th>
              <th scope="col" className={TH}>Regular</th>
              <th scope="col" className={TH}>On-demand</th>
              <th scope="col" className={TH}>Extra for on-demand</th>
            </tr>
          </thead>
          <tbody>
            {costRows.map((r, i) => (
              <tr key={r.what} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.what}</td>
                <td className={TD}>{r.reg}</td>
                <td className={TD}>{r.od}</td>
                <td className={TD}>{r.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        These are examination fees only, paid to the government through Bharatkosh.{' '}
        {PARIKSHA.fees.serviceCharge} Coaching, books and travel are separate and vary by provider.
      </p>
      <p>
        A student who sits all {nPapers} papers on demand pays {inr((olodeFee - regularFee) * nPapers)} more
        than one who sits them in a regular session. For a family already funding flight
        training, that is a figure to decide on deliberately, not stumble into.
      </p>

      <h2 id="when" className={H2}>When paying double makes sense</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>
          <strong>A paper is about to lapse.</strong> Cleared papers count for a limited window
          before you apply, as {EXAM_RULES.paperValidity.clause} of {EXAM_RULES.car.citation} sets
          out. If a retake has to land before the window closes and the next regular session falls
          after it, the extra fee can be cheaper than restarting the paper. See{' '}
          <Link href="/blogs/dgca-exam-pass-validity-cpl-five-years" className={LINK}>the validity post</Link>.
        </li>
        <li>
          <strong>One paper is holding up everything else.</strong> If four papers are cleared and a
          flying or licence application is waiting on the fifth, a one-paper on-demand booking
          costs {inr(olodeFee - regularFee)} extra and may save months.
        </li>
        <li>
          <strong>You have just missed a regular session.</strong> A fee for a session you did not
          sit is not carried forward, so the next paper needs a fresh application and fee.
        </li>
      </ul>
      <p>
        Paying double does not make sense when nothing is waiting on the result. A student still
        in ground classes, with no flying start date, gains little from sitting early at twice the
        price. Use the regular session and spend the difference on revision.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-regular-vs-on-demand-exam-session/decision-fork.webp"
        width={1200}
        height={675}
        alt="A student at a fork in a path: a wide, slow road toward a distant calendar on one side and a short, steeper road with a small coin marker on the other"
        promptId="92"
      />

      <h2 id="unknowns" className={H2}>What this post cannot tell you</h2>
      <p>
        The figures and dates above come from DGCA Pariksha, read on {PARIKSHA.verifiedOn}, and
        DGCA can change them. The published rules we could read do not say how an on-demand slot
        is allotted, which papers are offered in every on-demand session, or how soon after a
        session the result appears, so this post does not say either. Check the live notice on{' '}
        <a href={PARIKSHA.portal} className={LINK} rel="noopener noreferrer">the Pariksha portal</a> and the{' '}
        <a href={programmeUrl} className={LINK} rel="noopener noreferrer">Programme of Examinations 2026</a>{' '}
        before you pay.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We teach the DGCA ground subjects from Dwarka and can help you work backwards from a
        target session to a study plan, so a retake never has to be an on-demand scramble. See our{' '}
        <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes</Link> and the{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
