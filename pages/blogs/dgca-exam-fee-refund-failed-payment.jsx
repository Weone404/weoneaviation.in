import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { PARIKSHA, ACADEMY, inr } from '../../lib/facts';

/*
 * Distinct from dgca-exam-guide (papers, pass mark, validity, fees, sessions,
 * booking in general) and from the computer-number posts (registration, not
 * examination money). This post owns one narrow question: what happens to the
 * fee when a payment fails, when an application is rejected, or when the
 * candidate simply cannot sit the session.
 *
 * Every rule below is read from PARIKSHA.booking and PARIKSHA.refund in
 * lib/facts.js. Nothing about refund timelines beyond the 90-day figure there
 * is stated. FAQPage schema is built here from peopleAlsoAsk because
 * data/pageFaqs.js is not editable by the blog routine.
 */
const DATE_PUBLISHED = '2026-10-02';
const DATE_MODIFIED = '2026-10-02';
const CANONICAL = 'https://weoneaviation.in/blogs/dgca-exam-fee-refund-failed-payment';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'DGCA Exam Fee Refund: What Happens If a Payment Fails or You Miss the Session',
  description:
    "DGCA's Pariksha rules refund an examination fee only when the Bharatkosh payment succeeded but no service was delivered. What counts, what does not, how to apply, and why a missed session or rejected application is not refunded.",
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA exams',
  keywords: 'DGCA exam fee refund, Pariksha refund of failed transactions, Bharatkosh failed payment DGCA, DGCA exam fee not refunded, DGCA exam payment deadline',
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
    q: 'Is the DGCA exam fee refundable?',
    a: `Only in one situation. ${PARIKSHA.refund.eligibility} ${PARIKSHA.refund.notEligible}`,
  },
  {
    q: 'What if money was deducted but my DGCA exam application did not go through?',
    a: `That is the case the refund route exists for. Log in, go to Examination, then Refund of Failed Transactions. ${PARIKSHA.refund.how} ${PARIKSHA.refund.daysNote}`,
  },
  {
    q: 'Can I get a refund if I miss the exam or my application is rejected?',
    a: `No. ${PARIKSHA.booking.noChanges} A refund is made only where the payment succeeded but no service was delivered; a missed session or a rejected form is a service availed or an application processed.`,
  },
  {
    q: 'Can I carry my DGCA exam fee over to the next session?',
    a: `No. ${PARIKSHA.refund.notEligible}`,
  },
  {
    q: 'What is the DGCA exam payment deadline?',
    a: `${PARIKSHA.booking.deadline} Payment is made only through Bharatkosh, the Government of India NTRP portal.`,
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
  { lead: 'For the papers, fees, 2026 sessions and the other booking rules around this one, read', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'If your examination application is rejected, the reasons overlap with the computer number ones covered in', anchor: 'why a DGCA computer number application gets rejected', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'Name or date-of-birth errors are best fixed before you pay; see', anchor: 'how to change your details on a computer number profile', href: '/blogs/change-details-dgca-computer-number-profile' },
  { lead: 'The Pariksha portal and the exam-day process are summarised on', anchor: 'the DGCA Pariksha page', href: '/dgca-pariksha' },
  { lead: 'Classroom preparation for the written papers is on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'answer', title: 'Is the DGCA exam fee refundable?' },
  { id: 'cases', title: 'Refund or no refund: the cases' },
  { id: 'before-you-pay', title: 'Before you pay: the rules that bite' },
  { id: 'how-to-claim', title: 'How to claim a failed-transaction refund' },
  { id: 'avoid', title: 'How to avoid losing a fee' },
  { id: 'fees', title: 'What is at stake per paper' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const caseRows = [
  { situation: 'Bharatkosh took the money but the examination application was not completed', outcome: 'Refundable', basis: PARIKSHA.refund.eligibility },
  { situation: 'Application submitted successfully, then you want to change the form', outcome: 'No change, no refund', basis: PARIKSHA.booking.noChanges },
  { situation: 'Application rejected after payment', outcome: 'No refund', basis: PARIKSHA.booking.noChanges },
  { situation: 'You pay, but cannot or do not sit the session', outcome: 'No refund, no carry-forward', basis: PARIKSHA.refund.notEligible },
  { situation: 'Payment success reaches CEO after 2359 hrs on the closing date', outcome: 'May not be treated as valid', basis: PARIKSHA.booking.deadline },
];

const steps = [
  'Log in to the Pariksha portal with your computer number login.',
  'Open Examination, then Refund of Failed Transactions.',
  'Pick the failed transaction ID from the list.',
  'Enter your bank details and sign the declaration.',
  'Upload the self-attested Bharatkosh receipt together with an ID proof.',
];

const feeRows = [
  { item: 'Regular session, per paper', amount: inr(PARIKSHA.fees.regularPerPaper) },
  { item: 'Online On-Demand Examination (OLODE), per paper', amount: inr(PARIKSHA.fees.olodePerPaper) },
  { item: 'Oral examination, per paper', amount: inr(PARIKSHA.fees.oralPerPaper) },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function DgcaExamFeeRefundFailedPayment() {
  return (
    <BlogPostLayout
      title="DGCA Exam Fee Refund: Failed Payment or Missed Session"
      description="DGCA refunds an examination fee only when the Bharatkosh payment succeeded but no service was delivered. What qualifies, how to apply through Pariksha, and why a missed session or rejected form is not refunded."
      schema={[articleSchema, faqSchema]}
      heading="DGCA Exam Fee Refund: What Happens If a Payment Fails or You Miss the Session"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="5 min"
      quickAnswer={{
        question: 'Is the DGCA exam fee refundable?',
        answer: `Only when the Bharatkosh payment succeeded but no service reached you, such as a failed transaction. A missed session, a rejected application or a change of mind is not refunded, and the fee does not carry to a later session. Claim through Examination, then Refund of Failed Transactions; DGCA says it processes it within ${PARIKSHA.refund.days} days.`,
      }}
      summaryTitle="The refund rule in one view"
      summaryItems={[
        PARIKSHA.refund.eligibility,
        PARIKSHA.refund.notEligible,
        PARIKSHA.booking.noChanges,
        PARIKSHA.booking.deadline,
        PARIKSHA.refund.daysNote,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/dgca-exam-fee-refund-failed-payment/hero-payment-fork.webp"
        width={1200}
        height={630}
        alt="A single payment arrow splitting into two paths: one that reaches a completed exam application card, and one that stops at a broken link with a return arrow looping back toward the payer"
        promptId="84"
      />

      <h2 id="answer" className={H2}>Is the DGCA exam fee refundable?</h2>
      <p>
        Rarely, and only on one ground. {PARIKSHA.refund.eligibility} In plain terms: if the bank
        or Bharatkosh shows the money gone and the Pariksha portal shows no completed application,
        you have a claim. If the application went through, the fee is spent, whatever happens
        afterwards.
      </p>
      <p>
        {PARIKSHA.refund.notEligible} That second sentence is the one students learn the hard way,
        usually after missing a session for a medical, a clash with college exams or a late
        marksheet.
      </p>

      <h2 id="cases" className={H2}>Refund or no refund: the cases</h2>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Situations that do and do not qualify for a DGCA examination fee refund</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Situation</th>
              <th scope="col" className={TH}>Outcome</th>
              <th scope="col" className={TH}>What the Pariksha rules say</th>
            </tr>
          </thead>
          <tbody>
            {caseRows.map((r, i) => (
              <tr key={r.situation} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.situation}</td>
                <td className={TD}>{r.outcome}</td>
                <td className={TD}>{r.basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/dgca-exam-fee-refund-failed-payment/refund-or-no-refund.webp"
        width={1200}
        height={675}
        alt="Two simple signposts at a fork: the left sign shows a broken payment link with a return arrow, the right sign shows a completed form and a calendar page with a closed lock"
        promptId="85"
      />

      <h2 id="before-you-pay" className={H2}>Before you pay: the rules that bite</h2>
      <p>
        A refund is a narrow safety net, so most of the work is getting the payment right the first
        time. Four rules from the examination-form chapter matter most.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>{PARIKSHA.booking.payment}</li>
        <li>{PARIKSHA.booking.deadline}</li>
        <li>{PARIKSHA.booking.onePerSession}</li>
        <li>{PARIKSHA.booking.noChanges}</li>
      </ul>
      <p>
        The last one is the real reason refund requests fail. Once the form is submitted
        successfully there is no editing it, so a wrong centre choice, a wrong paper or a
        mismatched detail is yours to keep. Check the preview before submitting, and fix profile
        errors first through the{' '}
        <Link href="/blogs/change-details-dgca-computer-number-profile" className="text-av-orange font-semibold underline">
          profile update route
        </Link>.
      </p>

      <h2 id="how-to-claim" className={H2}>How to claim a failed-transaction refund</h2>
      <p>
        The path is entirely inside your own login. {PARIKSHA.refund.how}
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
        {steps.map((s) => <li key={s}>{s}</li>)}
      </ol>
      <p>
        {PARIKSHA.refund.daysNote} Keep the Bharatkosh receipt and the bank debit message until the
        money is back; the receipt is the one document the claim cannot proceed without.
      </p>

      <h2 id="avoid" className={H2}>How to avoid losing a fee</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>Pay well before the closing date. A success message that reaches DGCA after 2359 hrs on the closing date may not be counted, and the deadline is a clock, not a courtesy.</li>
        <li>Settle your paper choices and centre options before paying, not after. The second centre option is only a fallback for the first.</li>
        <li>Confirm you can actually sit the session. DGCA publishes its yearly dates as tentative, so check the public notice, and read <Link href="/blogs/dgca-exam-guide" className="text-av-orange font-semibold underline">our exam guide</Link> for the session calendar.</li>
        <li>Do not pay twice for a transaction that looks stuck. Check the portal first; a double debit with only one service delivered is exactly what the failed-transaction route is for.</li>
        <li>Check whether a new application needs a generated PDF and documents sent to the Central Examination Organisation. Without that, you cannot appear in the session.</li>
      </ul>

      <h2 id="fees" className={H2}>What is at stake per paper</h2>
      <p>
        Fees are published by DGCA per paper, so a multi-paper session multiplies the exposure.{' '}
        {PARIKSHA.fees.serviceCharge}
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA examination fees per paper</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Item</th>
              <th scope="col" className={TH}>Fee</th>
            </tr>
          </thead>
          <tbody>
            {feeRows.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.item}</td>
                <td className={TD}>{r.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {PARIKSHA.fees.oralNote} The full fee table, with the 2026 sessions, is on{' '}
        <Link href="/blogs/dgca-exam-guide" className="text-av-orange font-semibold underline">
          the DGCA exam guide
        </Link>.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-exam-fee-refund-failed-payment/receipt-and-checklist.webp"
        width={1200}
        height={675}
        alt="A desk scene from above: a printed payment receipt, an ID card, a blank bank passbook and a laptop showing an empty form, laid out as a checklist before a refund claim"
        promptId="86"
      />

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. Students
        most often lose an examination fee for a reason that has nothing to do with the paper: a
        session they could not sit, or a form they could not edit. If you are unsure which session
        suits your preparation, work that out first, then book. The rules above come from
        DGCA&rsquo;s own Pariksha documents; check the portal for any change before you pay.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
