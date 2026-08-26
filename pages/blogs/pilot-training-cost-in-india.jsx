import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { CPL_HOURS, DGCA_PAPERS, RTR, MEDICAL, ACADEMY } from '../../lib/facts';

/*
 * Replaces the database post at /blogs/6a040a0da7f96236c2f7ea90, which sat on an
 * opaque ObjectId URL, self-canonicalised to it, carried no tables, no FAQ and a
 * "Conclusion" heading. The redirect is prepared but not activated - see the
 * commented block in next.config.js.
 *
 * Every rupee figure here is copied from pages/cost-transparency.jsx, which is
 * the site's single fee source. Nothing is invented, and nothing is restated
 * that would need updating in two places.
 *
 * No HowTo (after-12th holds it). No FAQPage or BreadcrumbList (Layout emits both).
 */
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-08-26';
const CANONICAL = 'https://weoneaviation.in/blogs/pilot-training-cost-in-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Pilot Training Cost in India: Complete Breakdown for 2026',
  description:
    'What pilot training actually costs in India, line by line: ground school and examination fees, the flying phase, ratings, living costs, and the charges that never appear in a brochure. With the questions that expose an understated quote.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot training cost',
  keywords: 'pilot training cost in India, CPL training fees, pilot training fees India, commercial pilot license cost, flying school fees',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

// Figures mirrored from pages/cost-transparency.jsx. Update there first.
const groundCosts = [
  { item: `Ground class tuition (${DGCA_PAPERS.length} papers plus ${RTR.name})`, cost: '₹1,50,000 – ₹2,50,000' },
  { item: `DGCA examination fees (${DGCA_PAPERS.length} papers at ₹3,000)`, cost: '₹25,000 – ₹30,000' },
  { item: 'Study material and books', cost: '₹30,000 – ₹50,000' },
  { item: 'Mock tests and practice papers', cost: '₹10,000 – ₹20,000' },
  { item: 'DGCA medical assessment', cost: '₹5,000 – ₹10,000' },
  { item: 'DGCA computer number registration', cost: '₹2,000 – ₹3,000' },
  { item: 'Document verification and processing', cost: '₹1,000 – ₹2,000' },
];

const flyingCosts = [
  { item: `Flying training (${CPL_HOURS.total}+ hours)`, cost: '₹30,00,000 – ₹40,00,000', note: 'The single largest line. Billed by the hour.' },
  { item: 'Simulator training (50+ hours)', cost: '₹2,50,000 – ₹3,50,000', note: 'Schedule II caps how much counts towards the instrument requirement.' },
  { item: 'Instructor fees', cost: 'Included in the hourly rate', note: 'Confirm this in writing — not every school includes it.' },
  { item: 'Aircraft maintenance and fuel', cost: 'Included in the hourly rate', note: 'Ask whether fuel surcharges can be added separately.' },
];

const ratingCosts = [
  { item: 'Instrument Rating', cost: '₹3,00,000 – ₹4,50,000', included: 'Sometimes' },
  { item: 'Type rating', cost: '₹1,00,000 – ₹2,00,000', included: 'Never in a CPL quote' },
  { item: 'Multi-Crew Cooperation', cost: '₹50,000 – ₹1,00,000', included: 'Never in a CPL quote' },
  { item: 'Flight radio licence', cost: '₹2,000 – ₹5,000', included: 'Rarely' },
];

const livingCosts = [
  { item: 'Accommodation, 18–24 months', cost: '₹4,00,000 – ₹8,00,000' },
  { item: 'Food, 24 months', cost: '₹2,00,000 – ₹3,00,000' },
  { item: 'Transport and travel', cost: '₹1,00,000 – ₹2,00,000' },
  { item: 'Internet and mobile', cost: '₹20,000 – ₹30,000' },
];

const overruns = [
  { trigger: 'Extra flying hours beyond the minimum', cost: '₹1,50,000 – ₹2,00,000 per 10 hours', likelihood: 'High' },
  { trigger: 'Timeline extending on weather or unserviceability', cost: '₹20,000 – ₹30,000 per extra month', likelihood: 'High' },
  { trigger: 'Type rating after the licence', cost: '₹1,00,000 – ₹2,00,000', likelihood: 'High' },
  { trigger: 'Failing a DGCA paper', cost: '₹3,000 per re-sit, plus a lost cycle', likelihood: 'Medium' },
  { trigger: 'DGCA conversion after training abroad', cost: '₹50,000 – ₹1,00,000', likelihood: 'Medium if you train overseas' },
  { trigger: 'Simulator practice beyond the included hours', cost: 'Around ₹5,000 per hour', likelihood: 'Low' },
  { trigger: 'Repeating a medical assessment', cost: '₹5,000 – ₹10,000', likelihood: 'Low' },
];

const reduceCost = [
  { move: 'Clear the written papers before the flying phase', saving: 'Ground study is a fraction of an hour in an aircraft. Every month spent studying while also paying flying-school rent is money spent twice.' },
  { move: 'Fly consistently rather than in bursts', saving: 'Long gaps mean re-learning, and re-learning is billed at the full rate. Consistency is the cheapest thing you control.' },
  { move: 'Book the medical before any deposit', saving: `A medical costs a fraction of a deposit. ${MEDICAL.advice}` },
  { move: 'Take the scholarship you qualify for', saving: 'A 25% scholarship is available on our ground classes. Ask about it before enrolling, not after.' },
  { move: 'Agree the extra-hours rate up front', saving: 'Almost every student needs some. Negotiating the rate at enrolment costs nothing; negotiating it at hour 190 costs whatever they ask.' },
  { move: 'Tie payments to training milestones', saving: 'A large advance is money at risk. A milestone schedule keeps your bargaining position and limits what a disruption can cost you.' },
];

const quoteQuestions = [
  'What was the average total flying hours for students who finished last year, not the syllabus minimum?',
  'What is the hourly rate for instruction beyond the syllabus, and is it fixed for the duration?',
  'Which of the instrument rating, multi-engine rating and radio licence are inside this quote?',
  'Can fuel or landing surcharges be added to the quoted hourly rate later?',
  'What is the payment schedule, and is it tied to milestones or to dates?',
  'What are the refund conditions if training is interrupted, by me or by you?',
  'What does the fee not include that I will certainly have to pay?',
];

const abroadCompare = [
  { line: 'Flying phase', india: '₹30,00,000 – ₹40,00,000', abroad: 'Often lower per hour, but quoted in a foreign currency and exposed to the exchange rate over 12–18 months' },
  { line: 'Ground school', india: '₹1,50,000 – ₹2,50,000', abroad: 'Similar if done in India first; higher if taken overseas' },
  { line: 'Living costs', india: '₹7,00,000 – ₹13,00,000', abroad: 'Materially higher, and entirely outside the school invoice' },
  { line: 'Visa and immigration', india: 'None', abroad: 'Application fees, insurance, and the cost of any delay in processing' },
  { line: 'Licence conversion', india: 'None — the licence is issued by DGCA directly', abroad: '₹50,000 – ₹1,00,000, plus the DGCA papers, RTR (A) and an Indian medical' },
  { line: 'Travel', india: 'Domestic only', abroad: 'Return flights, plus any trip home mid-course' },
];

const tocHeadings = [
  { id: 'total', title: 'What does it cost in total?' },
  { id: 'ground', title: 'Ground school and examinations' },
  { id: 'flying', title: 'The flying phase' },
  { id: 'ratings', title: 'Ratings and endorsements' },
  { id: 'living', title: 'Living costs' },
  { id: 'abroad', title: 'India compared with abroad' },
  { id: 'overruns', title: 'What pushes the number up' },
  { id: 'reduce', title: 'How to spend less' },
  { id: 'quote', title: 'Questions that expose a low quote' },
  { id: 'worth-it', title: 'Is it worth the investment?' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const peopleAlsoAsk = [
  {
    q: 'Why do two students at the same school pay different totals?',
    a: 'Because flying is billed by the hour and almost nobody finishes on the minimum. Two students in the same batch can differ by tens of lakhs depending on how many extra dual hours they needed, how many examination re-sits they had, and how many months their timeline slipped. The quoted fee is a floor, not a forecast.',
  },
  {
    q: 'Are education loans available for pilot training in India?',
    a: 'Several banks and non-banking lenders offer education loans covering flight training, usually against collateral or a co-applicant’s income. Terms, margin money and whether living costs are covered vary widely between lenders, so compare the total repayment rather than the interest rate alone, and confirm what the sanction actually disburses against.',
  },
  {
    q: 'Should I pay the whole fee upfront for a discount?',
    a: 'A discount for full advance payment transfers all the risk to you. If the school has a disruption, your money is already there. A milestone-linked schedule usually costs a little more on paper and is worth it. If you do pay in advance, get the refund conditions in writing first.',
  },
  {
    q: 'Does the fee include the aircraft I will fly?',
    a: 'Aircraft hire is normally inside the hourly rate, but what counts as an hour differs. Ask whether the rate is charged on airborne time or on block time from engine start, because the difference across 200 hours is substantial and it is rarely volunteered.',
  },
  {
    q: 'How much should I keep as a buffer beyond the quoted fee?',
    a: 'Plan for a meaningful margin above the minimum rather than at it. The two reliable overruns are extra flying hours and extra months of living costs, and both are more likely than not. A budget that only works if everything goes to plan is a budget that will not work.',
  },
];

const related = [
  { lead: 'Every fee line on this page, in its full itemised form, is maintained on', anchor: 'the cost transparency page', href: '/cost-transparency' },
  { lead: 'For what training involves and how the licences differ, read', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'For choosing and verifying a flying school, see', anchor: 'our guide to commercial pilot training programmes', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'For the admission paperwork and its sequence, read', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'The six-month syllabus and the scholarship are covered on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const H3 = 'font-montserrat text-xl md:text-2xl font-bold text-av-blue mt-8 mb-3';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const TDN = `${TD} text-right tabular-nums whitespace-nowrap`;

export default function PilotTrainingCostInIndia() {
  return (
    <BlogPostLayout
      title="Pilot Training Cost in India: Complete Breakdown for 2026"
      description="What pilot training costs in India, line by line: ground school, DGCA exams, 200 flying hours, ratings, living costs, and the charges that never appear in a brochure."
      schema={articleSchema}
      heading="Pilot Training Cost in India: Complete Breakdown for 2026"
      category="Pilot training cost"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="12 min"
      quickAnswer={{
        question: 'How much does pilot training cost in India?',
        answer: 'Around ₹40–70 lakh from enrolment to a Commercial Pilot Licence. Flying training is roughly ₹30–40 lakh of that, ground school and examinations around ₹2–3.5 lakh, and living costs another ₹7–13 lakh across 18 to 24 months. Ratings and a type rating sit outside every CPL quote.',
      }}
      summaryTitle="The cost, in one view"
      summaryItems={[
        'Total, enrolment to licence: roughly ₹40–70 lakh, depending mainly on where you fly',
        'Flying training: ₹30,00,000 – ₹40,00,000, the single largest line',
        'Ground school, material and examinations: roughly ₹2,00,000 – ₹3,50,000',
        'Living costs across 18–24 months: roughly ₹7,00,000 – ₹13,00,000',
        'Type rating: ₹1,00,000 – ₹2,00,000, and never inside a CPL quote',
        'Most likely overrun: extra flying hours, at ₹1,50,000 – ₹2,00,000 per 10 hours',
        'A 25% scholarship is available on our ground classes',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/pilot-training-cost/hero-cost-breakdown.webp"
        width={1200}
        height={630}
        alt="A desk with a calculator, a notebook of figures and a small model training aircraft, representing the cost of pilot training"
        promptId="24"
      />

      <h2 id="total" className={H2}>What does pilot training actually cost in India?</h2>
      <p>
        Roughly ₹40–70 lakh from enrolment to licence. The spread is wide because one line dominates
        everything else: flying training is billed by the hour, and hours are the only part of the
        budget that moves freely.
      </p>
      <p>
        Every figure on this page comes from{' '}
        <Link href="/cost-transparency" className="text-av-orange font-semibold underline">our cost transparency page</Link>,
        which is where we maintain them. Treat them as indicative ranges rather than a quotation —
        rates move, and a school will give you its own numbers.
      </p>

      <h2 id="ground" className={H2}>What does ground school and examination cost?</h2>
      <p>
        Roughly ₹2,00,000 to ₹3,50,000 including tuition, material, mock tests, the medical
        assessment and the DGCA filing charges. This is the smallest of the three buckets and the
        most predictable — it moves only if you re-sit papers or repeat a medical.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Ground school, examination and documentation costs</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Line item</th>
              <th scope="col" className={`${TH} text-right`}>Indicative cost</th>
            </tr>
          </thead>
          <tbody>
            {groundCosts.map((c, i) => (
              <tr key={c.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.item}</td>
                <td className={TDN}>{c.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Note the examination line. It is {DGCA_PAPERS.length} papers, not nine — {RTR.name} is
        examined separately under its own rules and is not one of them. Quotes built on a wrong
        paper count overstate this line and understate nothing, which tells you something about how
        carefully the rest of that quote was assembled.
      </p>

      <h2 id="flying" className={H2}>What does the flying phase cost?</h2>
      <p>
        ₹30,00,000 to ₹40,00,000 for the {CPL_HOURS.total} hours, in India. This is around
        three-quarters of the total, and it is the only bucket where your own behaviour changes the
        number materially.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Flying phase costs</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Line item</th>
              <th scope="col" className={`${TH} text-right`}>Indicative cost</th>
              <th scope="col" className={TH}>What to confirm</th>
            </tr>
          </thead>
          <tbody>
            {flyingCosts.map((c, i) => (
              <tr key={c.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.item}</td>
                <td className={TDN}>{c.cost}</td>
                <td className={TD}>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/pilot-training-cost/cost-proportions.webp"
        width={1200}
        height={800}
        alt="Three stacked bars of very different heights showing flying training dominating ground school and living costs"
        promptId="25"
      />

      <h2 id="ratings" className={H2}>What do the ratings and endorsements cost?</h2>
      <p>
        Between ₹4.5 lakh and ₹8 lakh in total, and the inclusion status is where quotes diverge
        most. Read the middle column carefully before comparing one school&rsquo;s figure with another&rsquo;s.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Ratings and endorsements, and whether a CPL quote includes them</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Rating or endorsement</th>
              <th scope="col" className={`${TH} text-right`}>Indicative cost</th>
              <th scope="col" className={TH}>Inside a CPL quote?</th>
            </tr>
          </thead>
          <tbody>
            {ratingCosts.map((c, i) => (
              <tr key={c.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.item}</td>
                <td className={TDN}>{c.cost}</td>
                <td className={TD}>{c.included}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        The type rating is the one families are most often surprised by. It sits after the licence,
        it is tied to a specific aircraft, and no CPL fee anywhere includes it. Budget for it as a
        separate stage rather than a footnote.
      </p>

      <h2 id="living" className={H2}>What do living costs add?</h2>
      <p>
        Roughly ₹7,00,000 to ₹13,00,000 across 18 to 24 months. This bucket sits entirely outside
        every school invoice, which is exactly why it gets left out of the family conversation until
        it is already being spent.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Living costs during training</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Line item</th>
              <th scope="col" className={`${TH} text-right`}>Indicative cost</th>
            </tr>
          </thead>
          <tbody>
            {livingCosts.map((c, i) => (
              <tr key={c.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.item}</td>
                <td className={TDN}>{c.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="abroad" className={H2}>Is training abroad cheaper than training in India?</h2>
      <p>
        Not reliably, once the whole path is counted. The hourly rate abroad is often lower, and
        that is the number students compare. What closes the gap, and sometimes reverses it, is
        everything sitting around that rate.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Cost of training in India compared with training abroad</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Cost line</th>
              <th scope="col" className={TH}>India</th>
              <th scope="col" className={TH}>Abroad</th>
            </tr>
          </thead>
          <tbody>
            {abroadCompare.map((r, i) => (
              <tr key={r.line} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.line}</td>
                <td className={TD}>{r.india}</td>
                <td className={TD}>{r.abroad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Two lines deserve particular attention. Currency exposure is real over an eighteen-month
        course — a rate move of a few percent against a thirty-lakh flying bill is a sum worth
        planning for, and it moves in both directions. And conversion is not only a fee: it is the
        DGCA papers, {RTR.name} and an Indian medical, which is calendar time during which you are
        licensed but not yet employable in India.
      </p>
      <p>
        Compare total cost to a <em>usable Indian licence</em>, not headline training fee. Country
        detail sits on the flying school pages for{' '}
        <Link href="/flying-school/usa" className="text-av-orange font-semibold underline">the USA</Link>,{' '}
        <Link href="/flying-school/canada" className="text-av-orange font-semibold underline">Canada</Link>,{' '}
        <Link href="/flying-school/australia" className="text-av-orange font-semibold underline">Australia</Link>{' '}
        and{' '}
        <Link href="/flying-school/south-africa" className="text-av-orange font-semibold underline">South Africa</Link>.
      </p>

      <BlogImagePlaceholder
        src="/blog/pilot-training-cost/india-vs-abroad-cost.webp"
        width={1200}
        height={675}
        alt="Two sets of stacked coins of similar total height, one built from fewer large discs and the other from many small ones"
        promptId="27"
      />

      <h2 id="overruns" className={H2}>What pushes the total higher than the quote?</h2>
      <p>
        Seven triggers, ordered by how often we see them. The first two are more likely than not,
        which means a budget without room for them is a budget that will need a difficult
        conversation partway through.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Common cost overruns and their likelihood</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Trigger</th>
              <th scope="col" className={`${TH} text-right`}>Typical cost</th>
              <th scope="col" className={TH}>Likelihood</th>
            </tr>
          </thead>
          <tbody>
            {overruns.map((o, i) => (
              <tr key={o.trigger} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{o.trigger}</td>
                <td className={TDN}>{o.cost}</td>
                <td className={TD}>{o.likelihood}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/pilot-training-cost/overrun-triggers.webp"
        width={1200}
        height={675}
        alt="A budget line rising gently then stepping upward at several points, each step representing an unplanned training cost"
        promptId="26"
      />

      <h2 id="reduce" className={H2}>How can you reduce what you spend?</h2>
      <p>
        Six moves, none of which involve finding a cheaper school. The cheapest quote and the lowest
        total are rarely the same place, because extra hours cost roughly the same everywhere.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Ways to reduce total training cost</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>What to do</th>
              <th scope="col" className={TH}>Why it saves money</th>
            </tr>
          </thead>
          <tbody>
            {reduceCost.map((r, i) => (
              <tr key={r.move} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.move}</td>
                <td className={TD}>{r.saving}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="quote" className={H2}>Which questions expose an understated quote?</h2>
      <p>
        Ask these seven in writing. A school that answers all of them plainly is quoting an estimate.
        One that answers only some is quoting a minimum and hoping you read it as a total.
      </p>
      <aside className="my-6 rounded-2xl border-l-4 border-av-orange bg-orange-50/60 p-6" aria-label="Questions to ask about a fee quote">
        <ul className="list-disc pl-5 space-y-3 text-gray-700">
          {quoteQuestions.map((q) => <li key={q}>{q}</li>)}
        </ul>
      </aside>

      <h2 id="worth-it" className={H2}>Is pilot training worth the investment?</h2>
      <p>
        That depends on facts about you rather than facts about aviation, and anyone answering it
        for you in a brochure is selling something. What we can set out honestly is what the money
        buys and what it does not.
      </p>
      <p>
        It buys a professional licence recognised by the regulator, and the legal standing to be paid
        to fly. It does not buy a job. Airlines run their own selection, a type rating sits between
        the licence and the seat, and hiring moves in cycles that can turn while you are training.
      </p>
      <p>
        The students for whom this works out are the ones who funded the whole path before starting
        rather than the first instalment, kept a buffer for the overruns above, and treated the
        licence as the beginning of a career rather than the end of a course. The ones who struggle
        are almost always the ones who budgeted at the minimum.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. The course
        runs six months, offline or online, with batches starting in the first and third week of each
        month. A 25% scholarship is available, and students who do not clear a paper keep attending
        classes at no further cost until they do — which removes one of the overruns in the table
        above entirely.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
