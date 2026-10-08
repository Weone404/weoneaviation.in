import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import {
  ACADEMY, PAY_NOTE, COST_NOTE, FDTL, PILOT_SUPPLY, CPL_COST, PARIKSHA, MEDICAL_STANDARDS,
  INDIGO_CADET, LICENCES, DGCA_PAPERS, inr,
} from '../../lib/facts';
import {
  H2, H3, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE,
  listJoin, articleSchemaFor, faqSchemaFrom,
} from '../../lib/blogKit';

/*
 * /blogs/pilot-salary-in-india — REBUILT 2026-10-08 on the owner's decision.
 *
 * Until today this URL re-exported /blogs/pilot-salary-in-india-2026, a page
 * that printed monthly salary bands for every rank ("₹6–₹10 lakh+" for a
 * captain, "₹1 crore a year" for a senior one) attributed to unnamed "public
 * 2026 sources", rendered as one unformatted text block with broken rupee
 * characters, and showed its own editing notes to readers ("SEO
 * recommendation: ..."). No Indian airline publishes a pilot pay scale, and the
 * site's rule (PAY_NOTE in lib/facts.js) is to print none. The -2026 URL now
 * 301s here (next.config.js).
 *
 * WHY THIS PAGE IS NOT A COPY OF /commercial-pilot-license-salary. That page
 * owns "pilot salary in India": what is published and why no figure is. This
 * one is written for the parent or student who is about to fund training and
 * keeps meeting salary numbers in brochures and videos. It shows how to read
 * such a figure, what to ask of a real offer, and how to plan the money from
 * the side that IS published — the cost. It links to the owner page for the
 * regulatory detail rather than repeating it.
 *
 * NEVER ADD a salary, stipend or CTC figure here. If one is ever sourced from a
 * primary document, it goes into lib/facts.js first, with its source.
 */
const SLUG = 'pilot-salary-in-india';
const DATE_PUBLISHED = '2026-09-05';
const DATE_MODIFIED = '2026-10-08';
const HEADING = 'Pilot Salary in India: How to Read a Pay Figure Before You Fund Training';
const DESCRIPTION = 'Pilot salary in India explained for families funding training: why no airline pay scale is published, how to read a salary claim, and what to ask in an offer.';

const CPL = LICENCES.find((l) => l.code === 'CPL');
const igrua = CPL_COST.benchmark;
const yearCap = FDTL.limits[FDTL.limits.length - 1];
const class1Initial = MEDICAL_STANDARDS.fees.rows[0];

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot career guide',
  keywords: 'pilot salary in India, pilot salary per month India, first officer salary India, airline pilot pay India, CPL salary, pilot salary vs training cost',
});

const peopleAlsoAsk = [
  {
    q: 'What is the salary of a pilot in India?',
    a: `No Indian airline publishes a pilot pay scale, so no salary figure for a pilot in India can be checked against a primary source. Pay is set in individual contracts and varies with rank, airline, aircraft type, seniority and flying hours. What DGCA does publish is the cap on flying: ${yearCap.hours} hours in ${yearCap.period}.`,
  },
  {
    q: 'What is the starting salary of a pilot after CPL in India?',
    a: `There is no published starting salary for a pilot after the CPL. A Commercial Pilot Licence allows a pilot to be paid for flying, but it is not employment, and the Ministry of Civil Aviation has told Parliament there is no general shortage of pilots, only of commanders on certain aircraft types, so the first job is competitive.`,
  },
  {
    q: 'Why do pilot salary figures online differ so much?',
    a: 'Pilot salary figures online differ because none of them comes from a published pay scale. Sites mix cost-to-company with take-home pay, add allowances that depend on the roster, compare first officers with captains, and copy one another without a date, so two pages can disagree by several times and neither can be checked.',
  },
  {
    q: 'Does a pilot get paid during CPL training?',
    a: 'A student paying for CPL training at a flying school is a customer, not an employee, and is not paid. Airline cadet programmes are arranged differently and their terms vary by airline and intake, so read the cadet agreement itself before assuming any stipend or salary during training.',
  },
  {
    q: 'Is pilot pay linked to flying hours?',
    a: `A large part of an Indian airline pilot's pay is commonly linked to flying hours, which is why DGCA's Flight Duty Time Limitations matter: they cap flight time at ${listJoin(FDTL.limits.map((l) => `${l.hours} hours in ${l.period}`))}. The share that is hour-linked differs by airline and contract.`,
  },
  {
    q: 'Should I take a loan for pilot training based on expected salary?',
    a: `Plan a training loan against costs you can verify, not against a salary you cannot. ${COST_NOTE} The income side has no published figure and the first job is not guaranteed, so a repayment plan should survive a long wait between licence and employment.`,
  },
  {
    q: 'What should I check in a pilot job offer?',
    a: 'In a pilot job offer, check whether the figure is cost-to-company, gross or take-home; how much is fixed and how much depends on flying hours; who pays for the type rating and on what bond; the bond period and exit cost; and the base. Ask for each in writing before comparing two offers.',
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const offerChecks = [
  { item: 'What the number is', ask: 'Is it cost-to-company, gross monthly pay or take-home after deductions?' },
  { item: 'Fixed and variable', ask: 'How much is paid whatever the roster, and how much depends on hours flown?' },
  { item: 'Type rating', ask: 'Who pays for the type rating, and is it deducted from pay or recovered on exit?' },
  { item: 'Bond', ask: 'How long is the bond, and what does leaving early cost?' },
  { item: 'Training period', ask: 'What is paid while you are in type and line training, before you fly the line?' },
  { item: 'Base and allowances', ask: 'Where is the base, and which allowances are contractual rather than discretionary?' },
];

const related = [
  { lead: 'What is published about pilot pay, and why we print no figure, is on', anchor: 'our pilot salary page', href: '/commercial-pilot-license-salary' },
  { lead: 'The route from Class 12 to an airline seat is set out in', anchor: 'how to become an airline pilot in India', href: '/blogs/how-to-become-an-airline-pilot-in-india' },
  { lead: 'The government figures on pilot supply are worked through in', anchor: 'is there a pilot shortage in India', href: '/blogs/pilot-shortage-in-india' },
  { lead: 'The cost side, line by line, is in', anchor: 'our pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'How an airline cadet route changes the money is on', anchor: 'the cadet pilot programme page', href: '/cadet-pilot-program' },
];

const tocHeadings = [
  { id: 'published', title: 'Is any pilot salary published?' },
  { id: 'read', title: 'How to read a salary figure' },
  { id: 'ceiling', title: 'What is published: the cap on flying' },
  { id: 'supply', title: 'What the supply figures say' },
  { id: 'offer', title: 'What to check in a real offer' },
  { id: 'plan', title: 'How to plan the money instead' },
  { id: 'short-version', title: 'The short version' },
];

const sources = [
  FDTL.sources[0],
  FDTL.sources[1],
  PILOT_SUPPLY.sources[0],
  PILOT_SUPPLY.sources[1],
  INDIGO_CADET.source,
  { label: 'IGRUA — approved courses and fees (Indira Gandhi Rashtriya Uran Akademi)', url: igrua.source },
  PARIKSHA.sources[3],
];

export default function PilotSalaryInIndia() {
  return (
    <BlogPostLayout
      title="Pilot Salary in India: How to Read a Pay Figure"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="Pilot career guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'How much does a pilot earn in India?',
        answer: `No Indian airline publishes a pilot pay scale, so any salary figure you see cannot be checked against a primary source. Pay depends on the airline, rank, aircraft type, seniority and flying hours. What is published is DGCA's cap on flying, ${yearCap.hours} hours in ${yearCap.period}, and the government's statement that the shortage is of commanders, not of pilots.`,
      }}
      summaryTitle="What can and cannot be said"
      summaryItems={[
        'No Indian airline publishes a pilot pay scale.',
        `Flight time is capped by DGCA at ${yearCap.hours} hours in ${yearCap.period}.`,
        'The government told Parliament there is no pilot shortage, only a shortage of commanders on some types.',
        'Training costs can be checked; salaries cannot. Plan against the cost.',
        `Sources: DGCA flight duty CAR, PIB releases of 2 August 2024 and 24 April 2026, read ${PILOT_SUPPLY.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
      bottomCta={{
        title: 'Planning how to fund training?',
        text: 'In a free counselling session we go through the costs that can be checked, the steps that rule things out cheaply, and the questions to put to any school or lender, before you commit money.',
      }}
    >
      <p>
        Somewhere in every family conversation about pilot training, a salary figure arrives. A relative
        heard it from someone at an airline, a video puts it in the thumbnail, a brochure prints it beside
        the fee. It is usually large, it is usually monthly, and it usually decides how much the family is
        willing to borrow. The trouble is that no Indian airline publishes what it pays its pilots, so
        that figure cannot be checked by anyone. This guide explains what pilot salary in India figures
        are built from, what is genuinely published, what to ask when a real offer is on the table, and
        how to plan the money from the side you can verify.
      </p>

      <BlogCta
        variant="top"
        eyebrow="Free resource"
        title="See the costs that can actually be checked"
        text="Our cost transparency page separates DGCA's own statutory fees and the one published course fee from the ranges nobody can source."
        href="/cost-transparency"
        label="Open cost transparency"
      />

      <h2 id="published" className={H2}>Is any pilot salary in India officially published?</h2>
      <p>
        No pilot salary in India is officially published. Indian airlines set pilot pay in individual
        contracts and do not publish pay scales, and no government body publishes one either, so every
        figure in circulation rests on hearsay, a single offer letter or another website.
      </p>
      <p>
        {PAY_NOTE} That is why this page prints no salary figure, and why our main{' '}
        <Link href="/commercial-pilot-license-salary" className={LINK}>pilot salary page</Link> explains in
        detail what can be shown instead.
      </p>

      <h2 id="read" className={H2}>How should you read a pilot salary figure you find online?</h2>
      <p>
        Read any pilot salary figure by asking five questions about it: who published it, when, whether it
        is cost-to-company or take-home, which rank it describes, and whether it includes allowances that
        depend on the roster. A figure that cannot answer all five tells you very little.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Five questions to ask of any pilot salary figure, and why each matters</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Question</th>
              <th scope="col" className={TH}>Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Who published it?', 'An airline document can be checked; an anonymous page or a coaching brochure cannot.'],
              ['When?', 'Pay moves with hiring cycles and contracts. An undated figure may be years old.'],
              ['CTC, gross or take-home?', 'Cost-to-company can be far above what reaches a bank account after deductions.'],
              ['Which rank?', 'A captain’s pay quoted beside a training fee makes the fee look small. It is not what a new first officer earns.'],
              ['Fixed or roster-linked?', 'Part of airline pay commonly depends on hours flown, and those hours are capped by DGCA.'],
            ].map(([q, why], i) => (
              <tr key={q} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{q}</td>
                <td className={TD}>{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        A salary figure printed next to a course fee deserves the most care. The comparison it invites,
        the fee divided by a monthly salary, assumes a job on day one at a rank that takes years to reach.
      </p>

      <h2 id="ceiling" className={H2}>What is published: the cap on how much a pilot can fly</h2>
      <p>
        The one published number that shapes airline pilot pay in India is DGCA&rsquo;s limit on flight
        time, because a large part of pay is commonly linked to hours flown. DGCA&rsquo;s{' '}
        <Ext href={FDTL.sources[0].url}>Flight Duty Time Limitations CAR for flight crew</Ext> applies to{' '}
        {FDTL.appliesTo}.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Maximum cumulative flight time for flight crew by period</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Period</th>
              <th scope="col" className={TH}>Maximum flight time</th>
            </tr>
          </thead>
          <tbody>
            {FDTL.limits.map((l, i) => (
              <tr key={l.period} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{l.period}</td>
                <td className={TD}>{l.hours} hours ({l.clause})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        These are ceilings, not targets. The January 2024 revision, announced in a{' '}
        <Ext href={FDTL.sources[1].url}>PIB release</Ext>, tightened rest and night rules:
      </p>
      <ul className={UL}>
        {FDTL.rev2024.map((r) => <li key={r}>{r}</li>)}
      </ul>

      <h2 id="supply" className={H2}>What do the government&rsquo;s pilot supply figures say about pay?</h2>
      <p>
        The government&rsquo;s figures say the scarcity in Indian aviation is at command level, not entry
        level. The Ministry of Civil Aviation told Parliament, in a{' '}
        <Ext href={PILOT_SUPPLY.sources[0].url}>PIB release of 2 August 2024</Ext>: &ldquo;{PILOT_SUPPLY.statement}&rdquo;
      </p>
      <p>
        {PILOT_SUPPLY.growthNote} {PILOT_SUPPLY.whatItMeans} For a family planning the money, the
        practical reading is that the large step in pay comes with command, years after the licence, and
        the wait for the first job can be long. Our post on the{' '}
        <Link href="/blogs/pilot-shortage-in-india" className={LINK}>pilot shortage question</Link> sets out
        the year-by-year licence figures.
      </p>

      <BlogCta
        variant="mid"
        title="Start with what you can control"
        text={`The DGCA written papers cost ${inr(PARIKSHA.fees.regularPerPaper)} each and need no flying school to sit. We teach all ${DGCA_PAPERS.length} from Dwarka and online, which lets students make progress while the bigger decisions are still open.`}
      />

      <h2 id="offer" className={H2}>What should you check in a real pilot job offer?</h2>
      <p>
        In a real pilot job offer, check what the headline number includes, how much of it depends on
        flying, who pays for the type rating, and what the bond costs to leave. Two offers can only be
        compared once both answer the same questions, in writing.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Questions to ask about a pilot job offer before comparing it with another</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Item</th>
              <th scope="col" className={TH}>What to ask</th>
            </tr>
          </thead>
          <tbody>
            {offerChecks.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.item}</td>
                <td className={TD}>{r.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className={H3}>Cadet programmes</h3>
      <p>
        An airline cadet programme changes when and how you are selected and funded, not the licence. Read
        its terms as carefully as an offer. IndiGo&rsquo;s own{' '}
        <Ext href={INDIGO_CADET.source.url}>cadet programme page</Ext> sets an age band of{' '}
        {INDIGO_CADET.ageRange}. {INDIGO_CADET.employmentNote}
      </p>

      <h2 id="plan" className={H2}>How should a family plan the money instead?</h2>
      <p>
        A family should plan pilot training money against the costs that can be verified and treat income
        as unknown until an offer letter exists. The verifiable costs are DGCA&rsquo;s statutory fees and
        IGRUA&rsquo;s published course fee; everything else should be a written quote.
      </p>
      <ol className={OL}>
        <li>
          <strong>Start from published figures.</strong> DGCA charges {inr(PARIKSHA.fees.regularPerPaper)} per
          written paper in a regular session, and the Class 1 initial medical fee DGCA lists at the Air Force
          centres is {class1Initial.label}. IGRUA publishes {igrua.feeLabel} for ab-initio to CPL training on
          its <Ext href={igrua.source}>approved courses page</Ext>, with items such as uniform, hostel and
          messing extra.
        </li>
        <li>
          <strong>Get private quotes in writing,</strong> answering the same questions. {CPL_COST.comparisonNote}
        </li>
        <li>
          <strong>Spend least where a disqualifier can appear.</strong> The Class 1 medical and the computer
          number come before any flying-school deposit.
        </li>
        <li>
          <strong>Build in a wait.</strong> A licence is issued from age {CPL.minAge} and is not a job. If a loan
          only works when salary starts the month after the licence, the plan is too tight.
        </li>
      </ol>
      <p>{COST_NOTE} Our <Link href="/blogs/pilot-training-cost-in-india" className={LINK}>cost breakdown</Link> takes each line in turn.</p>

      <h2 id="short-version" className={H2}>The short version</h2>
      <p>
        Pilot pay in India is real, and its large step comes with command, but nobody outside an airline
        can tell you what it will be for you, and any page that prints a number is guessing. Fund training
        against the costs you can check, keep a margin for the wait before the first job, and judge an
        offer by what it says in writing. That way the decision rests on facts, not on a thumbnail.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
