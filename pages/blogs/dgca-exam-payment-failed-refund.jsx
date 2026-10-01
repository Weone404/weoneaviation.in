import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { ACADEMY, PARIKSHA, inr } from '../../lib/facts';

/*
 * /blogs/dgca-exam-payment-failed-refund — new 2026-10-01.
 *
 * WHY THIS TOPIC. Pre-CPL audience: a student booking their first DGCA paper
 * pays through Bharatkosh, and the single most anxious moment in the booking
 * is money leaving the bank with no confirmation. /blogs/dgca-exam-guide covers
 * fees and the booking steps; nobody covers the failed-payment and refund path.
 *
 * SOURCING. Everything comes from PARIKSHA in lib/facts.js (refund, booking,
 * fees). The "wait before paying again" advice and any refund-form field list
 * beyond PARIKSHA.refund.how are deliberately left out: not in PARIKSHA, so
 * the post says the portal screen carries them.
 */

const DATE_PUBLISHED = '2026-10-01';
const DATE_MODIFIED = '2026-10-01';
const CANONICAL = 'https://weoneaviation.in/blogs/dgca-exam-payment-failed-refund';

const REFUND_MODULE_URL = 'https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=9DFB8CEC4144CF96EE76381011ED9512';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'DGCA Exam Payment Failed? How the Pariksha Refund Works',
  description:
    'What to do when money leaves your account but a DGCA Pariksha exam booking does not go through: who qualifies for a refund, who does not, and how the refund request is filed.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA exams',
  keywords: 'DGCA exam payment failed, DGCA Pariksha refund, Bharatkosh failed transaction DGCA, DGCA exam fee refund, refund of failed transactions Pariksha',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const peopleAlsoAsk = [
  {
    q: 'My money was deducted but the DGCA exam form did not go through. Can I get a refund?',
    a: `Yes, if the Bharatkosh transaction succeeded and no service was delivered. ${PARIKSHA.refund.eligibility}`,
  },
  {
    q: 'How do I apply for a DGCA Pariksha refund?',
    a: `${PARIKSHA.refund.how}`,
  },
  {
    q: 'How long does a DGCA exam refund take?',
    a: `${PARIKSHA.refund.daysNote} The portal screen you file the request on is the place to check anything more specific.`,
  },
  {
    q: 'Can I get my fee back if I miss the exam or change my mind?',
    a: `No. ${PARIKSHA.refund.notEligible} ${PARIKSHA.booking.noChanges}`,
  },
  {
    q: 'What if I pay after the closing date?',
    a: `${PARIKSHA.booking.deadline} Pay well before the last day rather than on it.`,
  },
  {
    q: 'Where do I pay the DGCA exam fee?',
    a: `${PARIKSHA.booking.payment} ${PARIKSHA.fees.serviceCharge}`,
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
  { lead: 'For the full booking sequence, read our', anchor: 'DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'Before you can book at all, you need a number: see', anchor: 'why computer number applications get rejected', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'For what to arrange before joining a school, see', anchor: 'flight school prerequisites and admission steps', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'Session dates and fees sit on our', anchor: 'DGCA Pariksha page', href: '/dgca-pariksha' },
  { lead: 'To prepare for the papers themselves, see our', anchor: 'DGCA ground classes', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'who-gets-refund', title: 'Who gets a refund?' },
  { id: 'how-to-apply', title: 'How do you file the request?' },
  { id: 'no-refund', title: 'When is there no refund?' },
  { id: 'avoid', title: 'How to avoid a failed booking' },
  { id: 'faqs', title: 'Frequently asked questions' },
  { id: 'sources', title: 'Sources' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const A = 'text-av-orange font-semibold underline';

const cases = [
  {
    situation: 'The Bharatkosh payment succeeded, but the exam application was not registered',
    outcome: 'Refundable',
    why: PARIKSHA.refund.eligibility,
  },
  {
    situation: 'The exam application was submitted successfully, and you then change your mind',
    outcome: 'Not refunded',
    why: PARIKSHA.booking.noChanges,
  },
  {
    situation: 'The application was rejected after you submitted it',
    outcome: 'Not refunded',
    why: PARIKSHA.booking.noChanges,
  },
  {
    situation: 'You paid for one session and want the fee used in a later one',
    outcome: 'Not carried forward',
    why: PARIKSHA.refund.notEligible,
  },
  {
    situation: 'Payment confirmation reached DGCA after the cut-off on the closing date',
    outcome: 'May not count as valid',
    why: PARIKSHA.booking.deadline,
  },
];

export default function DgcaExamPaymentFailedRefund() {
  return (
    <BlogPostLayout
      title="DGCA Exam Payment Failed? How the Pariksha Refund Works"
      description="Money left your account but the DGCA Pariksha exam booking failed? Who qualifies for a refund, who does not, and how the refund request is filed."
      schema={[articleSchema, faqSchema]}
      heading="DGCA Exam Payment Failed? How the Pariksha Refund Works"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="5 min"
      quickAnswer={{
        question: 'Can you get a refund if a DGCA exam payment fails?',
        answer: `Yes, but only in one situation: the Bharatkosh transaction succeeded and no service was delivered to you. You then file a refund request from your Pariksha login, and DGCA processes it within ${PARIKSHA.refund.days} days of applying. If the exam form went through, the fee is not refunded, adjusted or carried forward.`,
      }}
      summaryTitle="Failed payment, in one view"
      summaryItems={[
        'Refund only where the payment succeeded and no service was delivered',
        'Filed from your login under Examination, then Refund of Failed Transactions',
        `Processed within ${PARIKSHA.refund.days} days of applying online`,
        'No refund, adjustment or carry-forward once the service was availed',
        'Payment is through Bharatkosh only, by 2300 hrs on the closing date',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/dgca-exam-payment-failed-refund/hero-payment-no-confirmation.webp"
        width={1200}
        height={630}
        alt="A student at a laptop with a payment tick on one side of a gap and an empty exam confirmation slot on the other, joined by a thin refund path looping back"
        promptId="84"
      />

      <p>
        Booking a DGCA paper is the first time most students hand money to the regulator, and it
        happens against a closing date. So the moment a bank message says the amount was debited while
        the portal shows no confirmation is a stressful one. The rules for this are written down.{' '}
        {PARIKSHA.booking.payment} If you have not yet booked, our{' '}
        <Link href="/blogs/dgca-exam-guide" className={A}>DGCA exam guide</Link> covers the full
        sequence; this page covers what happens when the payment step goes wrong.
      </p>

      <h2 id="who-gets-refund" className={H2}>Who gets a refund for a failed DGCA exam payment?</h2>
      <p>
        {PARIKSHA.refund.eligibility} The test is not whether you are unhappy with the outcome. It is
        whether the transaction went through at the bank end and you received nothing for it. In
        practice that means the debit happened and the exam application did not register.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA Pariksha exam payment situations and whether the fee is refunded</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Situation</th>
              <th scope="col" className={TH}>Outcome</th>
              <th scope="col" className={TH}>DGCA&rsquo;s stated rule</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c, i) => (
              <tr key={c.situation} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.situation}</td>
                <td className={`${TD} font-semibold`}>{c.outcome}</td>
                <td className={TD}>{c.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="how-to-apply" className={H2}>How do you file the refund request?</h2>
      <p>
        From inside your Pariksha account. You need your computer number to log in, so the number you
        registered for comes first; if that step is still ahead of you, see our{' '}
        <Link href="/dgca-computer-number" className={A}>DGCA computer number guide</Link>. DGCA
        describes the refund path this way: {PARIKSHA.refund.how}
      </p>
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-600">
        <li>Log in to the Pariksha portal with your computer number.</li>
        <li>Go to Examination, then Refund of Failed Transactions.</li>
        <li>Pick the failed transaction ID from the list.</li>
        <li>Enter your bank details and sign the declaration.</li>
        <li>Upload your self-attested Bharatkosh receipt and an ID proof.</li>
        <li>Submit, then wait: {PARIKSHA.refund.daysNote.toLowerCase()}</li>
      </ol>
      <p>
        Keep the Bharatkosh receipt safe from the moment you pay. It is the one document the request
        cannot go ahead without, and the bank&rsquo;s SMS is not a substitute. DGCA also publishes a
        short refund module document on the portal, linked in the sources below, which shows the same
        screen.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-exam-payment-failed-refund/refund-request-steps.webp"
        width={1200}
        height={800}
        alt="A left-to-right flow of four steps: a failed transaction picked from a list, bank details entered, a receipt and ID proof attached, and the money returning to the student"
        promptId="85"
      />

      <h2 id="no-refund" className={H2}>When will DGCA not refund the fee?</h2>
      <p>
        Whenever the service was delivered. {PARIKSHA.refund.notEligible} The booking rules are equally
        firm from the other side: {PARIKSHA.booking.noChanges} The exam fee is{' '}
        {inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, so a
        wrongly chosen paper or centre is an expensive mistake. Before you press submit, check the
        paper and both centre choices.
      </p>
      <p>
        One rule catches people who pay late. {PARIKSHA.booking.deadline} A payment that is valid at
        your bank but arrives after the cut-off is a different problem from a failed payment, and the
        refund route above is not designed for it.
      </p>

      <h2 id="avoid" className={H2}>How can you avoid a failed booking?</h2>
      <ul className="space-y-2 mb-6">
        {[
          'Book early in the window. The closing date is a hard cut-off, not a target.',
          `Fill both centre choices carefully: ${PARIKSHA.booking.centreNote.toLowerCase()}`,
          PARIKSHA.booking.onePerSession,
          'Keep the Bharatkosh receipt for every attempt, successful or not.',
          'Check your bank statement against the portal before paying a second time, so you do not pay twice for one application.',
        ].map((item) => (
          <li key={item} className="flex gap-2 items-start text-gray-600">
            <span className="text-av-orange font-bold flex-shrink-0">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <p>
        The 2026 session dates are on our{' '}
        <Link href="/dgca-pariksha" className={A}>DGCA Pariksha page</Link>, and DGCA prints them as
        tentative, so confirm against the portal notice. If you are choosing where to prepare for the
        papers, our{' '}
        <Link href="/blogs/flight-school-prerequisites-admission-guide" className={A}>prerequisites and admission guide</Link>{' '}
        lists what to have ready, and our{' '}
        <Link href="/dgca-ground-classes" className={A}>DGCA ground classes</Link> prepare students
        for the written papers. The academy does not process DGCA refunds: only DGCA does, and no
        coaching institute can speed one up.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />

      <h2 id="sources" className={H2}>Sources</h2>
      <ul className="space-y-2 mb-8">
        {PARIKSHA.sources.slice(0, 2).map((s) => (
          <li key={s.url} className="flex gap-2 items-start text-sm text-gray-600">
            <span className="text-av-orange font-bold flex-shrink-0">–</span>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
          </li>
        ))}
        <li className="flex gap-2 items-start text-sm text-gray-600">
          <span className="text-av-orange font-bold flex-shrink-0">–</span>
          <a href={REFUND_MODULE_URL} target="_blank" rel="noopener noreferrer" className={A}>Refund Module (DGCA Pariksha)</a>
        </li>
        <li className="flex gap-2 items-start text-sm text-gray-600">
          <span className="text-av-orange font-bold flex-shrink-0">–</span>
          DGCA Pariksha portal, {PARIKSHA.portal}
        </li>
      </ul>

      <div className="bg-av-blue rounded-2xl p-6">
        <p className="text-white/80 text-sm leading-relaxed mb-2">{ACADEMY.scope}</p>
        <p className="text-white/60 text-xs leading-relaxed">
          DGCA, not this academy, decides every refund. Portal rules can change; check the current
          instructions on the Pariksha portal before you pay or file a request.
        </p>
      </div>
    </BlogPostLayout>
  );
}
