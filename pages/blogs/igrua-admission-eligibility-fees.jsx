import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import {
  ACADEMY, CPL_COST, EDUCATION, DGCA_PAPERS, RTR, EXAM_RULES,
  MEDICAL_STANDARDS as MED, FTO, MIN_AGE,
} from '../../lib/facts';

/*
 * IGRUA appears on nine other pages of this site, always as a single line —
 * the one sourced benchmark against an unsourced private-school fee range
 * (CPL_COST.benchmark). None of those nine treats IGRUA as the subject. This
 * post does: the entrance exam, the eligibility that isn't the same as a
 * private school's, and what the published fee actually buys.
 *
 * SOURCING. The fee, its inclusions and its exclusions come from
 * CPL_COST.benchmark in lib/facts.js, already verified against
 * igrua.gov.in/approved-courses on 2026-09-11 — reused here, not re-verified,
 * per the DO NOT ADD note in facts.js about not re-typing sourced figures.
 *
 * Everything else on this page — minimum age, the subject and marks
 * requirement, the three selection stages, the seat count — comes from
 * IGRUA's own admission and selection-procedure pages (igrua.gov.in/admission,
 * igrua.gov.in/selection-procedure, igrua.gov.in/igrua-entrance), read via
 * search on 2026-09-26. IGRUA revises its age band and category relaxations
 * every admission cycle, and different secondary sources quoted different
 * upper-age figures for 2026 — a disagreement, not a fact — so this page
 * states the minimum age only and tells the reader to confirm the current
 * upper limit and reservation relaxations directly on igrua.gov.in rather
 * than repeating a number that could already be stale. Same treatment for
 * the course fee quoted by aggregator sites (₹45,00,000, against IGRUA's own
 * ₹55,00,000 in CPL_COST.benchmark): two figures that disagree are not a
 * source, so this page uses only the one already verified against IGRUA's
 * own page.
 *
 * No HowTo, no BreadcrumbList (Layout emits the breadcrumb). FAQPage schema
 * inlined here, matching the shape in dgca-exam-guide.jsx.
 */
const DATE_PUBLISHED = '2026-09-26';
const DATE_MODIFIED = '2026-09-26';
const CANONICAL = 'https://weoneaviation.in/blogs/igrua-admission-eligibility-fees';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: "IGRUA Admission: Eligibility, Selection Process and Fees Explained",
  description:
    "What IGRUA actually asks of an applicant, how its three-stage selection process works, what its published course fee covers that a private quote usually does not, and the honest odds of getting in.",
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Flying school selection',
  keywords: 'IGRUA admission, IGRUA eligibility, IGRUA fees, IGRUA selection process, Indira Gandhi Rashtriya Uran Akademi, government flying academy India, IGRUA vs private flying school',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const eligibilityRows = [
  { req: 'Minimum age', detail: 'At least 17 years as on the date of admission. IGRUA also sets an upper age limit with category relaxations, revised every admission cycle — check the current notification on igrua.gov.in before assuming last year’s figure still applies.' },
  { req: 'Educational qualification', detail: `10+2 (or equivalent) with English, Physics and Mathematics — the same subject combination ${EDUCATION.clause} of the Aircraft Rules, 1937 asks of every CPL candidate in India, not an IGRUA-specific extra.` },
  { req: 'Marks', detail: 'At least 50% in each of English, Physics and Mathematics individually for general-category candidates, and 45% for SC/ST/OBC/EWS candidates, in line with Government of India reservation norms. Each subject is checked on its own — a strong average does not cover a weak one.' },
  { req: 'Medical', detail: 'A Class 2 medical certificate before joining the course. A Class 1 medical is worth booking early regardless, since it is a precondition for the CPL itself, not something IGRUA can waive.' },
];

const selectionStages = [
  { stage: '1. Online written test', what: 'English, Mathematics, Physics, General Awareness and Reasoning, at the 10+2 level.' },
  { stage: '2. Pilot aptitude test', what: 'A standardised aptitude assessment for the mental and behavioural traits IGRUA looks for in a trainee pilot, taken only by candidates who clear the written test.' },
  { stage: '3. Personal interview', what: 'The final stage before the merit list is compiled.' },
];

const feeRows = [
  ...CPL_COST.benchmark.includes.map((item) => ({ item, inside: 'Inside the fee' })),
  ...CPL_COST.benchmark.excludes.map((item) => ({ item, inside: 'Outside the fee' })),
];

const peopleAlsoAsk = [
  {
    q: 'Is IGRUA cheaper than a private flying school in India?',
    a: `It is a fixed, published number rather than a cheaper one. IGRUA's ${CPL_COST.benchmark.feeLabel} sits inside the range private quotes typically fall in, but unlike a private quote it already bundles the Instrument Rating and the multi-engine endorsement — two lines a private CPL quote almost never includes. A fair comparison has to add those back to the private number before the two are comparable at all.`,
  },
  {
    q: 'Can I apply to IGRUA without Physics and Maths in Class 12?',
    a: `Not directly. IGRUA's own admission page states the same requirement DGCA sets for every CPL candidate — ${EDUCATION.requirement.toLowerCase()}. ${EDUCATION.altRoute} Our guide to the NIOS bridge route covers how that works before you plan an IGRUA application around it.`,
  },
  {
    q: 'What happens if I am not selected at IGRUA?',
    a: 'Nothing about your eligibility changes. The same DGCA age, education and medical requirements apply at any of the other DGCA-approved Flying Training Organisations, and the same 200-hour requirement and written papers wait for you there too. IGRUA is one route to the same licence, not a gate that closes behind a rejected applicant.',
  },
  {
    q: 'Does an IGRUA cadet still have to clear the DGCA written papers and RTR (A)?',
    a: `Yes. IGRUA's course includes ground training across the DGCA subjects, but the ${DGCA_PAPERS.length} written papers are set and marked by DGCA's own Central Examination Organisation, at ${EXAM_RULES.theory.passMark}% per subject, and ${RTR.name} is examined separately again under its own rules. No flying school, IGRUA included, sits those examinations on a candidate's behalf.`,
  },
  {
    q: 'Does IGRUA guarantee a job with an airline after the CPL?',
    a: 'No, and nothing on IGRUA’s own published material claims one. A Commercial Pilot Licence is the legal standing to be paid to fly; hiring is a separate process each airline runs on its own criteria and its own cycle, whichever DGCA-approved organisation trained the applicant.',
  },
  {
    q: 'Is there an age limit to apply to IGRUA?',
    a: `Yes — at least 17 as on the date of admission. IGRUA also publishes an upper age limit and category-wise relaxations, but both are set fresh for each admission cycle, so confirm the current notification on igrua.gov.in rather than relying on a figure quoted by a third-party page, including this one.`,
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
  { lead: 'For how private flying-school quotes are built and what they usually leave out, read', anchor: 'our pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'For choosing and verifying any DGCA-approved flying school, including how to read its FTO ranking, see', anchor: 'our guide to choosing a flying school', href: '/blogs/best-flying-school-in-india' },
  { lead: 'For the admission paperwork every route shares — the computer number, the medical and the documents — read', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'If Physics and Maths are the gap rather than the seat, our guide on', anchor: 'the NIOS bridge route', href: '/blogs/become-pilot-without-physics-and-maths-class-12' },
  { lead: 'The six-month DGCA ground school syllabus and scholarship we teach from Dwarka are on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'what-is-igrua', title: 'What is IGRUA?' },
  { id: 'why-considered', title: 'Why would you even look at it?' },
  { id: 'eligibility', title: 'Who can apply?' },
  { id: 'selection', title: 'How does the selection process work?' },
  { id: 'fee', title: 'What does the published fee actually cover?' },
  { id: 'odds', title: 'What are the honest odds?' },
  { id: 'still-dgca', title: 'Does IGRUA replace the DGCA papers and medical?' },
  { id: 'who-for', title: 'Who should apply, and who should not wait for it' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function IgruaAdmissionEligibilityFees() {
  return (
    <BlogPostLayout
      title="IGRUA Admission: Eligibility, Selection Process and Fees Explained"
      description="What IGRUA actually asks of an applicant, how its three-stage selection process works, what its published fee covers, and the honest odds of getting in."
      schema={[articleSchema, faqSchema]}
      heading="IGRUA Admission: Eligibility, Selection Process and Fees Explained"
      category="Flying school selection"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'What does it take to get into IGRUA, and what does it cost?',
        answer: `IGRUA, India's only government-run flying academy, fills its Ab-initio to CPL course entirely by merit: an online written test, a pilot aptitude test and an interview, with no management quota. The minimum age is 17, and the eligible subjects are the same Physics, Mathematics and English every CPL candidate needs. The published course fee is ${CPL_COST.benchmark.feeLabel}, and it already includes flying, ground training, simulator hours and two ratings a private quote usually bills separately.`,
      }}
      summaryTitle="IGRUA, in one view"
      summaryItems={[
        `India's only government-run flying academy, at Fursatganj near Rae Bareli, Uttar Pradesh, under the Ministry of Civil Aviation`,
        'Admission is only through IGRUA’s own entrance process — a written test, a pilot aptitude test and an interview — with no management quota',
        `SOURCED: published course fee is ${CPL_COST.benchmark.feeLabel} (${CPL_COST.benchmark.source})`,
        `Minimum age to apply is 17 — the same age DGCA sets for starting Private Pilot Licence training (Section E, minimum age ${MIN_AGE.PPL})`,
        `Eligibility needs ${EDUCATION.requirement.toLowerCase()}, at least 50% in each subject (45% for SC/ST/OBC/EWS)`,
        'The fee already bundles the Instrument Rating and multi-engine endorsement, which a private CPL quote almost never includes',
        'An IGRUA cadet still sits the same DGCA written papers, RTR (A) and medical as any other candidate',
        'IGRUA does not appear as a reason to skip choosing carefully among private schools — it is one more option to check, not a plan to bank on',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/igrua-admission-eligibility-fees/hero-single-gate-many-aircraft.webp"
        width={1200}
        height={630}
        alt="A single training aircraft parked before a narrow open gateway, with several identical training aircraft waiting at a distance behind it, representing the one government flying academy against the wider field of private schools"
        promptId="72"
      />

      <h2 id="what-is-igrua" className={H2}>What is IGRUA?</h2>
      <p>
        The Indira Gandhi Rashtriya Uran Akademi is the one flying training organisation in India
        run by the government itself, under the Ministry of Civil Aviation, at Fursatganj airfield
        near Rae Bareli in Uttar Pradesh. Its flagship course takes a cadet from zero flying hours to
        a full Commercial Pilot Licence over a residential, three-year programme — everything else on
        this site's list of options is a private school.
      </p>
      <p>
        That distinction is the entire reason IGRUA gets asked about separately. A private school
        competes for your fee. IGRUA competes for a seat, and decides who gets one by merit alone.
        Those are different questions, and this page answers the one about IGRUA on its own terms
        rather than folding it into a general school-comparison page.
      </p>

      <h2 id="why-considered" className={H2}>Why would a prospective pilot even look at it?</h2>
      <p>
        Two reasons, and only one of them holds up under scrutiny. The published fee is a genuine
        answer to a real problem: no private school in India publishes its price, and the ranges
        quoted online cannot be traced to a document — a point our{' '}
        <Link href="/blogs/pilot-training-cost-in-india" className="text-av-orange font-semibold underline">
          pilot training cost breakdown
        </Link>{' '}
        sets out at length. IGRUA is the one flying academy where a family can read an actual number
        before applying anywhere.
      </p>
      <p>
        The second reason — that a government academy must be a shortcut to a job — does not hold up,
        and the FAQ below addresses it directly. What IGRUA genuinely offers is a fixed, sourced fee
        and a single national admission process. It does not offer a different licence, a faster
        route to an airline seat, or an exemption from anything DGCA itself requires.
      </p>

      <h2 id="eligibility" className={H2}>Who can apply?</h2>
      <p>
        IGRUA's own published eligibility runs to four checks, and none of them is unusual for a
        pilot-training seat — they mirror the same age, education and medical gates every DGCA route
        applies, stated by the academy in its own admission notice.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">IGRUA eligibility requirements for the Ab-initio to CPL course</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Requirement</th>
              <th scope="col" className={TH}>What IGRUA asks</th>
            </tr>
          </thead>
          <tbody>
            {eligibilityRows.map((r, i) => (
              <tr key={r.req} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.req}</td>
                <td className={TD}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Note what is missing from that table on purpose: a nationality restriction, a domicile
        requirement, or a fixed number of attempts. Where IGRUA's own material states one of these,
        it belongs in this table; until it is verified against the current notification, this page
        does not print a figure it cannot stand behind.
      </p>

      <h2 id="selection" className={H2}>How does the selection process work?</h2>
      <p>
        Three stages, run in sequence, and a candidate who does not clear one does not sit the next.
        There is no seat outside this list, and no stage can be bought or skipped.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">IGRUA's three-stage selection process</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>What it tests</th>
            </tr>
          </thead>
          <tbody>
            {selectionStages.map((s, i) => (
              <tr key={s.stage} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{s.stage}</td>
                <td className={TD}>{s.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/igrua-admission-eligibility-fees/three-stage-funnel.webp"
        width={1200}
        height={800}
        alt="A wide funnel narrowing through three marked checkpoints down to a small number of dots at the bottom, representing the written test, aptitude test and interview stages of IGRUA's selection process"
        promptId="73"
      />

      <p>
        A merit list is compiled once all three stages are complete. IGRUA states plainly that there
        is no management quota, which is worth naming because it is the one claim a private school
        essentially never gets to make about its own admission.
      </p>

      <h2 id="fee" className={H2}>What does the published fee actually cover?</h2>
      <p>
        {CPL_COST.benchmark.school}, {CPL_COST.benchmark.status.toLowerCase()}, publishes a course fee
        of {CPL_COST.benchmark.feeLabel} for its {CPL_COST.benchmark.course} course — a figure this
        site already treats as sourced, because it is the one flying-training price in India that
        traces to a document rather than to another page quoting it.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">What is inside and outside IGRUA&rsquo;s published course fee</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Item</th>
              <th scope="col" className={TH}>Inside or outside the fee</th>
            </tr>
          </thead>
          <tbody>
            {feeRows.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD}>{r.item}</td>
                <td className={`${TD} font-semibold ${r.inside === 'Inside the fee' ? 'text-av-blue' : 'text-av-orange'} whitespace-nowrap`}>{r.inside}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        {CPL_COST.benchmark.gstNote} Two lines in that table are worth reading twice: the Instrument
        Rating and the multi-engine endorsement. Our cost breakdown lists both as line items a
        private CPL quote almost never includes — the{' '}
        <Link href="/blogs/multi-engine-rating-for-pilots-in-india" className="text-av-orange font-semibold underline">
          multi-engine rating
        </Link>{' '}
        in particular is billed as a separate stage everywhere else. At IGRUA, both sit inside the
        one published number.
      </p>

      <h2 id="odds" className={H2}>What are the honest odds?</h2>
      <p>
        IGRUA's published capacity for the Ab-initio to CPL course is around 125 seats a year, filled
        against a national applicant pool sitting one written test on one day. That is a narrow
        route by construction, not by any fault in how it is run — a merit-only, no-quota admission
        process is exactly what produces a small number of seats relative to demand.
      </p>
      <p>
        The honest way to plan around that is to treat an IGRUA application as an option worth
        pursuing in parallel with, not instead of, the ordinary admission process at a private
        school. Nothing about applying to IGRUA costs you time on the other path, and nothing about
        not being selected costs you eligibility anywhere else.
      </p>

      <h2 id="still-dgca" className={H2}>Does IGRUA replace the DGCA papers and the medical?</h2>
      <p>
        No, and this is the point every IGRUA page glosses over. IGRUA's course includes ground
        training across the DGCA subjects, but the {DGCA_PAPERS.length} written papers themselves —{' '}
        {DGCA_PAPERS.join(', ')} — are set, conducted and marked by DGCA's own Central Examination
        Organisation, and a candidate needs {EXAM_RULES.theory.passMark}% in each one on its own,
        under {EXAM_RULES.car.citation}. {RTR.name} is examined separately again under its own
        rules. {RTR.note}
      </p>
      <p>
        The medical follows the same rule DGCA sets for everyone. {MED.classOrder.advice} An IGRUA
        seat changes where the flying and the ground training happen; it does not change who examines
        you, who certifies you medically fit, or which regulator issues the licence at the end.
      </p>

      <h2 id="who-for" className={H2}>Who should apply, and who should not wait for it</h2>
      <p>
        Apply if you meet the eligibility above and can sit a national-level written test alongside
        whatever else you are preparing for — there is no downside to trying, and the published fee
        is worth knowing even if you end up training privately. Do not build your entire timeline
        around it. With roughly 125 seats a year against every eligible applicant in the country, the
        arithmetic alone means most students who go on to a CPL will do it at one of the other
        DGCA-approved schools, none of which is any less real a licence for not being government-run.
      </p>
      <p>
        None of IGRUA's own approved flying bases sits in Delhi or the NCR either — {FTO.noBaseIn.join(', ')}{' '}
        appear on no DGCA-approved organisation's list, IGRUA included. A Delhi student choosing
        between IGRUA and a private school is choosing between two places that both mean moving for
        the flying phase, not between staying home and travelling.
      </p>

      <h2 className={H2}>Where We One Aviation fits</h2>
      <p>
        We teach the DGCA ground subjects from Dwarka, and if you are admitted to IGRUA you will not
        need that course from us — IGRUA's own fee already includes it. What we can genuinely help
        with is everything before that decision: confirming your Class 12 subjects and marks against
        {' '}{EDUCATION.clause}, booking a medical before you commit money anywhere, and understanding
        the wider admission paperwork covered in{' '}
        <Link href="/blogs/flight-school-prerequisites-admission-guide" className="text-av-orange font-semibold underline">
          our flight school prerequisites guide
        </Link>{' '}
        — whichever route you end up training on.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
