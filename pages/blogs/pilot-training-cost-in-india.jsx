import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import IgruaFeeBox from '../../components/IgruaFeeBox';
import {
  CPL_HOURS, DGCA_PAPERS, RTR, PARIKSHA, MEDICAL_STANDARDS, CPL_COST, COST_NOTE, FOREIGN_LICENCE,
  EXAM_RULES, FTO, ACADEMY, inr,
} from '../../lib/facts';
import {
  H2, H3, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE,
  articleSchemaFor, faqSchemaFrom,
} from '../../lib/blogKit';

/*
 * /blogs/pilot-training-cost-in-india — REWRITTEN 2026-10-08 to data/blog-standard.md.
 *
 * THE DECISION, AND WHY. The 15 September pass kept a set of market ranges
 * ("₹40–70 lakh", "₹30–40 lakh flying", living, ratings, overruns) and labelled
 * them as untraceable. This pass removes them. The owner's standing instruction
 * is that every figure comes from an authorised source; COST_NOTE and
 * /cost-transparency already state that no such source exists for private
 * training prices; and a labelled guess still gets quoted by answer engines
 * without its label. Two of the "estimates" were also simply wrong against
 * lib/facts.js: a "₹2,000–3,000 computer number registration" line (Pariksha
 * has no payment step for the computer number) and a "₹5,000–10,000 DGCA
 * medical" line (DGCA lists ₹5,000 for a Class 1 at the Air Force centres).
 *
 * WHAT THE PAGE DOES INSTEAD. It prints every cost that IS published — DGCA's
 * examination and medical fees, IGRUA's course fee and its exclusions — and for
 * every other line it names the line, says no figure is published, and gives
 * the question that gets the school to put its own figure in writing.
 *
 * Also removed: three images with printed rupee ranges (one showed ₹3,000 per
 * paper, which is wrong), unverified batch-day and free-repeat claims, and the
 * pageFaqs.js entry. Do not reintroduce a market range without a document.
 */
const SLUG = 'pilot-training-cost-in-india';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-10-08';
const HEADING = 'Pilot Training Cost in India (2027): Every Published Fee, and What to Ask for the Rest';
const DESCRIPTION = 'Pilot training cost in India: DGCA exam and medical fees, IGRUA\u2019s published course fee, the lines with no published price, and what to ask a school.';

const fees = PARIKSHA.fees;
const med = MEDICAL_STANDARDS.fees.rows;
const igrua = CPL_COST.benchmark;
const minExamFees = fees.regularPerPaper * DGCA_PAPERS.length;

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot training cost',
  keywords: 'pilot training cost in India, CPL fees India, commercial pilot licence cost, DGCA exam fee, DGCA medical fee, IGRUA fees, flying school fees India',
  image: '/blog/pilot-training-cost/hero-cost-breakdown.webp',
});

const published = [
  { line: 'DGCA written paper, regular session', amount: inr(fees.regularPerPaper), note: `Per paper; ${DGCA_PAPERS.length} papers for a CPL, so ${inr(minExamFees)} if each is passed first time` },
  { line: 'DGCA written paper, on-demand session', amount: inr(fees.olodePerPaper), note: 'Per paper, for a slot outside the regular sessions' },
  { line: 'DGCA oral paper', amount: inr(fees.oralPerPaper), note: fees.oralNote },
  { line: 'Class 1 medical, initial or renewal', amount: med[0].label, note: 'The fee DGCA lists at the Indian Air Force centres; investigations are charged separately' },
  { line: 'Class 2 or Class 3 medical', amount: med[2].label, note: 'Same basis; private examiners may charge their own fee' },
  { line: 'DGCA computer number', amount: 'No payment step', note: 'Pariksha documents describe payment for examination applications only' },
  { line: 'IGRUA ab-initio to CPL course', amount: igrua.feeLabel, note: 'The one published course fee; see what it excludes below' },
];

const unpublished = [
  { line: 'Flying, per hour', why: 'Each school sets its own rate', ask: 'What is the hourly rate, is it fixed for the course, and is it charged on airborne or block time?' },
  { line: 'Hours beyond the minimum', why: 'Depends on you, the weather and the school', ask: 'What was last year’s average total hours to licence, and the rate for extra hours?' },
  { line: 'Instrument Rating', why: 'Often billed separately', ask: 'Is it inside this quote?' },
  { line: 'Multi-engine endorsement', why: 'Often billed separately', ask: 'Is it inside this quote, and on which aircraft?' },
  { line: `${RTR.name} and licence issue`, why: 'Statutory fees we have not read from a current schedule', ask: 'Which statutory fees will I pay directly, and roughly when?' },
  { line: 'Ground school', why: 'Each institute sets its own fee', ask: 'Is ground school included, or a separate enrolment?' },
  { line: 'Living costs', why: 'Depends on the base and how long training takes', ask: 'What do students at this base typically pay for a room and food?' },
  { line: 'Type rating', why: 'Comes after the CPL; set by the airline or training organisation', ask: 'Ask the airline or cadet scheme, not the flying school' },
  { line: 'Conversion after training abroad', why: 'Rule 48 fees not read; time depends on exam sessions', ask: 'Who pays for the conversion papers, skill test and radio steps?' },
];

const overruns = [
  { trigger: 'Extra flying hours', why: 'Almost nobody finishes on the minimum; each extra hour is billed at the school’s rate.' },
  { trigger: 'Months added by weather or unserviceable aircraft', why: 'Rent and food keep running while the aircraft do not.' },
  { trigger: 'A failed DGCA paper', why: `Another ${inr(fees.regularPerPaper)} in a regular session (${inr(fees.olodePerPaper)} on demand), and more expensively, a session of calendar time.` },
  { trigger: 'A medical held for investigation', why: 'Everything that depends on it pauses.' },
  { trigger: 'Ratings outside the quote', why: 'The Instrument Rating and multi-engine endorsement, when not included, arrive as separate bills.' },
  { trigger: 'Conversion after training abroad', why: 'Two DGCA papers, a skill test in India, the medical and the radio steps.' },
];

const peopleAlsoAsk = [
  {
    q: 'How much does pilot training cost in India?',
    a: `${COST_NOTE} DGCA charges ${inr(fees.regularPerPaper)} per written paper in a regular session and lists ${med[0].label} for a Class 1 medical at the Air Force centres; IGRUA, a government academy, publishes ${igrua.feeLabel} for ab-initio to CPL training, with uniform, study material, DGCA fees, hostel and messing extra.`,
  },
  {
    q: 'What is the DGCA exam fee for CPL?',
    a: `The DGCA exam fee is ${inr(fees.regularPerPaper)} per paper in a regular session and ${inr(fees.olodePerPaper)} per paper in an on-demand session. A CPL needs ${DGCA_PAPERS.length} papers, so the minimum is ${inr(minExamFees)} if every paper is passed first time in regular sessions. ${fees.serviceCharge}`,
  },
  {
    q: 'Is there a fee for the DGCA computer number?',
    a: 'The Pariksha documents describe a payment step for examination applications only, not for the computer number application, so applying for the computer number has no DGCA fee. Pages that show a payment step in the computer number process were wrong.',
  },
  {
    q: 'How much does the DGCA Class 1 medical cost?',
    a: `DGCA lists ${med[0].label} for a Class 1 medical, initial or renewal, at the Indian Air Force centres, paid on Bharatkosh. ${MEDICAL_STANDARDS.fees.investigationCharges} A private empanelled examiner may charge differently, so ask for the total before booking.`,
  },
  {
    q: 'Why do two students at the same school pay different totals?',
    a: 'Flying is billed by the hour, and almost nobody finishes on the minimum. Two students in the same batch can differ substantially depending on extra dual hours, examination re-sits and months lost to weather. The quoted fee is a floor, not a forecast.',
  },
  {
    q: 'Should I pay the whole fee upfront for a discount?',
    a: 'Paying the whole fee upfront moves all the risk to you: if the school has a disruption, your money is already there. A milestone-linked schedule usually costs a little more on paper and is worth it. If you pay in advance, get the refund conditions in writing first.',
  },
  {
    q: 'Does the hourly rate include the aircraft and instructor?',
    a: 'The hourly rate normally includes the aircraft, but what counts as an hour differs. Ask whether the rate is charged on airborne time or on block time from engine start, whether the instructor is included, and whether fuel or landing surcharges can be added later.',
  },
  {
    q: 'Are education loans available for pilot training?',
    a: 'Several banks and non-bank lenders offer education loans that can cover flight training, usually against collateral or a co-applicant’s income. Terms and what living costs they cover vary, so compare the total repayment, and plan repayments that survive a wait between licence and first job.',
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const related = [
  { lead: 'Why no market range is printed anywhere on this site is explained on', anchor: 'the cost transparency page', href: '/cost-transparency' },
  { lead: 'What a complete programme should include is set out in', anchor: 'commercial pilot training programmes', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'How the exam fee fits the session calendar is in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'IGRUA’s selection and what its fee covers are in', anchor: 'IGRUA admission', href: '/blogs/igrua-admission-eligibility-fees' },
  { lead: 'What to make of salary figures when planning the money is in', anchor: 'pilot salary in India', href: '/blogs/pilot-salary-in-india' },
];

const tocHeadings = [
  { id: 'total', title: 'What does pilot training cost?' },
  { id: 'published', title: 'Which costs are published?' },
  { id: 'igrua', title: 'What IGRUA’s fee includes' },
  { id: 'unpublished', title: 'Which lines have no published price?' },
  { id: 'overruns', title: 'What pushes the total up?' },
  { id: 'abroad', title: 'Is training abroad cheaper?' },
  { id: 'reduce', title: 'How can you spend less?' },
  { id: 'budget', title: 'How to build your own budget' },
];

const sources = [
  PARIKSHA.sources[1],
  PARIKSHA.sources[0],
  MEDICAL_STANDARDS.sources[2],
  { label: 'IGRUA — approved courses and fees (Indira Gandhi Rashtriya Uran Akademi)', url: igrua.source },
  FOREIGN_LICENCE.sources[0],
  FTO.sources[0],
];

export default function PilotTrainingCostInIndia() {
  return (
    <BlogPostLayout
      title="Pilot Training Cost in India: Published Fees (2027)"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="Pilot training cost"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="10 min"
      quickAnswer={{
        question: 'How much does pilot training cost in India?',
        answer: `No government body publishes a market price for pilot training in India, and private flying schools do not publish fees. What is published: DGCA charges ${inr(fees.regularPerPaper)} per written paper (${inr(minExamFees)} for all ${DGCA_PAPERS.length} at first attempt), lists ${med[0].label} for a Class 1 medical, and IGRUA publishes ${igrua.feeLabel} for ab-initio to CPL training, with significant items excluded.`,
      }}
      summaryTitle="The cost, in one view"
      summaryItems={[
        `DGCA exam fee: ${inr(fees.regularPerPaper)} per paper regular, ${inr(fees.olodePerPaper)} on demand.`,
        `Class 1 medical: ${med[0].label} at the Air Force centres, plus investigations.`,
        'DGCA computer number: no payment step.',
        `IGRUA ab-initio to CPL: ${igrua.feeLabel}, excluding kit, DGCA fees, hostel and messing.`,
        'Private flying rates, ratings, living costs and type ratings: no published figure; get them in writing.',
        `Sources: Pariksha documents (read ${PARIKSHA.verifiedOn}), DGCA medical CAR, IGRUA (read ${CPL_COST.verifiedOn}).`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
      bottomCta={{
        title: 'Want a second pair of eyes on a quote?',
        text: 'Bring any flying school quote to a free counselling session. We will go through it line by line against the questions on this page and tell you what it leaves out.',
      }}
    >
      <p>
        Every family that looks into pilot training meets the same number in the first week, a round
        figure in lakhs that appears on dozens of websites and in every coaching brochure. It is usually
        presented as the cost, and it usually decides the loan. Nobody can tell you where it came from,
        because no government body and no private flying school in India publishes a training price.
        This guide does something more useful than repeat it. It lists every pilot training cost in
        India that is actually published, names each line that is not, and gives you the question that
        makes a school put its own figure in writing, so you can build a budget you can defend.
      </p>

      <BlogCta
        variant="top"
        eyebrow="Free resource"
        title="The cost transparency page"
        text="Our full position on training costs: what is published, what is not, and why we print no market range."
        href="/cost-transparency"
        label="Read cost transparency"
      />

      <BlogImagePlaceholder
        src="/blog/pilot-training-cost/hero-cost-breakdown.webp"
        width={1200}
        height={630}
        alt="Graduation cap, money bag and coins beside a gauge, a training aircraft and a pilot, with icons for each cost area of pilot training"
        promptId="24"
      />

      <h2 id="total" className={H2}>What does pilot training cost in India?</h2>
      <p>
        Pilot training in India has no published total cost. No Indian government body publishes a
        market price for flying training, and private flying schools do not publish their fees, so any
        total you see is an estimate copied between websites. What can be shown are DGCA&rsquo;s
        statutory fees and the course fee of one government academy.
      </p>
      <p>
        {COST_NOTE} We checked the obvious places before saying so: DGCA, the Ministry of Civil
        Aviation, PIB and parliamentary answers give flying-school counts and licences issued, never
        fees. The breakdown below is therefore a map of the lines a budget contains, with a figure only
        where a document gives one.
      </p>

      <h2 id="published" className={H2}>Which pilot training costs are officially published?</h2>
      <p>
        The officially published pilot training costs are DGCA&rsquo;s examination fees, the medical fees
        DGCA lists at the Air Force centres, and IGRUA&rsquo;s course fee. The DGCA computer number has no
        payment step at all.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Pilot training costs published by DGCA and IGRUA</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Line</th>
              <th scope="col" className={TH}>Published figure</th>
              <th scope="col" className={TH}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {published.map((r, i) => (
              <tr key={r.line} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.line}</td>
                <td className={TD}>{r.amount}</td>
                <td className={TD}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The examination fees come from DGCA&rsquo;s{' '}
        <Ext href={PARIKSHA.sources[1].url}>Pariksha Flight Crew User Manual</Ext> and are paid through
        Bharatkosh; {fees.serviceCharge.charAt(0).toLowerCase() + fees.serviceCharge.slice(1)} The medical fees
        are in the{' '}
        <Ext href={MEDICAL_STANDARDS.sources[2].url}>DGCA medical CAR</Ext>. {MEDICAL_STANDARDS.fees.privateExaminers}
      </p>

      <h2 id="igrua" className={H2}>What does IGRUA&rsquo;s published fee include?</h2>
      <p>
        IGRUA&rsquo;s published fee of {igrua.feeLabel} covers ground training, simulator time, the{' '}
        {CPL_HOURS.total} hours of flying, the Instrument Rating and a multi-engine endorsement, and
        excludes kit, DGCA fees, hostel and messing. It is the only Indian CPL course fee published by
        the provider itself.
      </p>
      <IgruaFeeBox />
      <p>
        The exclusions are as instructive as the figure. Even a published, government course fee leaves
        the trainee paying DGCA&rsquo;s fees, a kit bill and two years of board and lodging on top. Any
        private quote that looks lower deserves the same scrutiny line by line. IGRUA&rsquo;s selection is
        covered in{' '}
        <Link href="/blogs/igrua-admission-eligibility-fees" className={LINK}>IGRUA admission, eligibility and fees</Link>.
      </p>

      <h2 id="unpublished" className={H2}>Which pilot training costs have no published price?</h2>
      <p>
        The flying hourly rate, extra hours, the Instrument Rating, the multi-engine endorsement, ground
        school, living costs and the type rating have no published price in India. For each one, the
        figure that matters is the one a school or airline puts in writing for you.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Pilot training cost lines without a published price, why, and what to ask</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Line</th>
              <th scope="col" className={TH}>Why there is no figure</th>
              <th scope="col" className={TH}>What to ask</th>
            </tr>
          </thead>
          <tbody>
            {unpublished.map((r, i) => (
              <tr key={r.line} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.line}</td>
                <td className={TD}>{r.why}</td>
                <td className={TD}>{r.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Collect the answers for two or three schools and the comparison becomes possible. The full
        question list is below; {CPL_COST.comparisonNote.charAt(0).toLowerCase() + CPL_COST.comparisonNote.slice(1)}
      </p>
      <ol className={OL}>
        {CPL_COST.askYourSchool.map((q) => <li key={q}>{q}</li>)}
      </ol>

      <BlogCta
        variant="mid"
        title="The papers are the cheapest part to get right"
        text={`At ${inr(fees.regularPerPaper)} a paper, a failed DGCA exam costs little in fees and a lot in time. We teach all five subjects from Dwarka and online.`}
      />

      <h2 id="overruns" className={H2}>What pushes the total higher than the quote?</h2>
      <p>
        The total rises above the quote mainly through extra flying hours and extra months, because
        flying is billed by the hour and living costs run by the month. Both are more likely than not,
        so a budget with no margin for them will need a difficult conversation partway through.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Common reasons pilot training costs more than quoted</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Trigger</th>
              <th scope="col" className={TH}>Why it costs</th>
            </tr>
          </thead>
          <tbody>
            {overruns.map((r, i) => (
              <tr key={r.trigger} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.trigger}</td>
                <td className={TD}>{r.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="abroad" className={H2}>Is pilot training abroad cheaper than in India?</h2>
      <p>
        Pilot training abroad is not reliably cheaper once the whole route to a usable Indian licence is
        counted. A lower hourly rate abroad has to carry a foreign currency, visa and living costs, and
        the conversion steps on return, none of which appear in the overseas school&rsquo;s quote.
      </p>
      <p>
        For a CPL, DGCA&rsquo;s{' '}
        <Ext href={FOREIGN_LICENCE.sources[0].url}>conversion CAR</Ext> requires two written papers, a
        skill test in India, the Indian medical and the radio steps, and the foreign rating must be
        current. {FOREIGN_LICENCE.hoursShortfall} {FOREIGN_LICENCE.fees} Compare the cost to a usable Indian
        licence, not the headline training fee; the full comparison is in{' '}
        <Link href="/blogs/cpl-training-india-vs-abroad" className={LINK}>CPL training in India vs abroad</Link>.
      </p>

      <h2 id="reduce" className={H2}>How can you spend less on pilot training?</h2>
      <p>
        You spend less on pilot training mainly by needing fewer hours and fewer months, not by finding
        the lowest quote. The moves below are our suggestions; each targets one of the overruns above.
      </p>
      <ul className={UL}>
        <li><strong>Book the Class 1 medical before any deposit.</strong> {MEDICAL_STANDARDS.classOrder.advice}</li>
        <li><strong>Clear papers before or alongside the flying,</strong> so you are not paying flying-school rent while you study. {EXAM_RULES.paperValidity.cplAtpl}</li>
        <li><strong>Fly consistently.</strong> Long gaps mean repeat lessons at the full rate.</li>
        <li><strong>Agree the extra-hour rate at enrolment,</strong> not at hour {CPL_HOURS.total - 10}.</li>
        <li><strong>Tie payments to milestones,</strong> so a disruption does not hold all your money.</li>
        <li><strong>Check the school on DGCA&rsquo;s{' '}
          <Ext href={FTO.sources[0].url}>approved list</Ext></strong>, and ask how many aircraft were unserviceable on an average day last month.</li>
      </ul>

      <h2 id="budget" className={H2}>How to build your own pilot training budget</h2>
      <p>
        Build the budget from the published lines, add each school&rsquo;s written figures for the rest,
        and keep a margin for extra hours and extra months. A budget that only works if everything goes to
        plan is the one that fails halfway.
      </p>
      <ol className={OL}>
        <li>Start with DGCA&rsquo;s fees: {inr(minExamFees)} for the papers at first attempt, the Class 1 medical, and a margin for one re-sit.</li>
        <li>Add the school&rsquo;s written quote, with every line in the &ldquo;no published price&rdquo; table answered.</li>
        <li>Add living costs for the base, for longer than the quoted duration.</li>
        <li>Keep the type rating as a separate, later stage.</li>
        <li>Check the total against IGRUA&rsquo;s published fee and its exclusions as a reference point.</li>
      </ol>
      <p>
        Done this way, the round number from the internet stops mattering. You have a figure built from
        documents and written quotes, and you know which parts of it can move.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
