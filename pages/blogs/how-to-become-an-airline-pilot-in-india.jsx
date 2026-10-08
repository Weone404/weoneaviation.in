import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import IgruaFeeBox from '../../components/IgruaFeeBox';
import {
  ACADEMY, LICENCES, EDUCATION, PARIKSHA, EGCA, EXAM_RULES, MEDICAL_STANDARDS, CPL_HOURS, DGCA_PAPERS,
  RTR, FTO, INDIGO_CADET, PILOT_SUPPLY, FDTL, ATPL_HOURS_GUIDANCE, CPL_COST, COST_NOTE, inr,
} from '../../lib/facts';
import {
  H2, H3, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE,
  lc, listJoin, articleSchemaFor, faqSchemaFrom,
} from '../../lib/blogKit';

/*
 * /blogs/how-to-become-an-airline-pilot-in-india — REWRITTEN 2026-10-08 to
 * data/blog-standard.md. Also the destination of the retired /blogs/1, so it
 * carries that post's intent.
 *
 * WHAT CHANGED. The 2026-09-01 version was correct but generic: eleven steps
 * that each said "check the applicable requirements" without stating one, no
 * figure, no source, no FAQ and three emoji tiles. It now states the DGCA
 * requirements from lib/facts.js and spends its depth on the part that makes
 * this page different from /how-to-become-a-pilot-after-12th: what sits
 * between a CPL and an airline seat — airline selection, the published IndiGo
 * cadet criteria, the government's own statement on pilot supply, the flight
 * duty limits, and the ATPL step to command.
 *
 * NOT HERE, ON PURPOSE: salary figures (PAY_NOTE), a market price for
 * training (COST_NOTE), type-rating prices, hiring timelines, any airline's
 * selection stages other than what IndiGo publishes, and ATPL hour figures
 * (ATPL_HOURS_GUIDANCE).
 */
const SLUG = 'how-to-become-an-airline-pilot-in-india';
const DATE_PUBLISHED = '2026-09-01';
const DATE_MODIFIED = '2026-10-08';
const HEADING = 'How to Become an Airline Pilot in India (2027): From Class 12 to the Right Seat';
const DESCRIPTION = 'How to become an airline pilot in India: DGCA licence requirements, the order to tackle them, and what airlines add after the CPL, from official sources.';

const CPL = LICENCES.find((l) => l.code === 'CPL');
const ATPL = LICENCES.find((l) => l.code === 'ATPL');
const class1 = MEDICAL_STANDARDS.classes.find((c) => c.cls === 'Class 1');
const igrua = CPL_COST.benchmark;
const fullYears = PILOT_SUPPLY.cplIssued.filter((r) => /^\d{4}$/.test(r.year));
const firstYear = fullYears[0];
const lastFullYear = fullYears[fullYears.length - 1];

const HOURS_PHRASE = {
  '1(e)(i)': 'as pilot-in-command',
  '1(e)(ii)': 'of cross-country as pilot-in-command',
  '1(e)(iii)': 'of instrument time',
  '1(e)(iv)': 'at night',
};

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot career guide',
  keywords: 'how to become an airline pilot in India, airline pilot after 12th, airline pilot requirements India, CPL to airline, cadet pilot programme, DGCA CPL requirements',
});

const peopleAlsoAsk = [
  {
    q: 'What qualifications do you need to become an airline pilot in India?',
    a: `An airline pilot in India first needs a DGCA Commercial Pilot Licence: minimum age ${CPL.minAge}, ${EDUCATION.requirement}, a Class 1 medical, the ${DGCA_PAPERS.length} DGCA written papers at ${EXAM_RULES.theory.passMark}% each, ${RTR.name}, English Language Proficiency at Level 4 or above and ${CPL_HOURS.total} hours of flying. The airline then runs its own selection and type training.`,
  },
  {
    q: 'Does a CPL guarantee an airline job in India?',
    a: `No. A Commercial Pilot Licence is the legal minimum to be paid to fly; it is not an offer of employment. Airlines run their own selection, and the Ministry of Civil Aviation has told Parliament that there is no shortage of pilots in India, only of commanders on certain aircraft types, so the first job is competitive.`,
  },
  {
    q: 'Can I become an airline pilot without Physics and Maths?',
    a: `Not without them, but you can add them. The CPL requires Physics and Mathematics at 10+2 level. ${EDUCATION.altRoute} Airline cadet programmes ask for the same subjects; IndiGo, for example, publishes 10+2 with Physics and Mathematics as compulsory.`,
  },
  {
    q: 'What is the age limit to become an airline pilot in India?',
    a: `DGCA sets a minimum age of ${CPL.minAge} for the CPL and ${ATPL.minAge} for the ATPL, and no maximum age to apply for a DGCA computer number. Airlines set their own upper limits for cadet schemes: IndiGo publishes ${INDIGO_CADET.ageRange} for its cadet programme.`,
  },
  {
    q: 'What is a cadet pilot programme?',
    a: `A cadet pilot programme is an airline-run route in which the airline selects candidates first and then sends them through CPL training with partner schools. It changes how you are selected and funded, not the DGCA licence you receive, and IndiGo's own page does not promise employment with IndiGo at the end of it.`,
  },
  {
    q: 'How many hours does an airline pilot fly in India?',
    a: `DGCA caps a scheduled airline pilot's flight time at ${FDTL.limits.map((l) => `${l.hours} hours in ${l.period}`).join(', ')}, under the flight crew Flight Duty Time Limitations CAR revised on 8 January 2024. These are ceilings, not targets.`,
  },
  {
    q: 'How do you become a captain at an Indian airline?',
    a: `Command requires an Airline Transport Pilot Licence, which DGCA issues from age ${ATPL.minAge}, and the airline's own upgrade criteria on top. The ATPL experience table was amended in 2020 and 2023, so confirm current hour figures against the notified Schedule rather than an older website.`,
  },
  {
    q: 'How much does it cost to become an airline pilot in India?',
    a: `${COST_NOTE} IGRUA, a government academy, publishes ${igrua.feeLabel} for ab-initio to CPL training, with uniform, study material, DGCA fees, hostel and messing extra. Airline type ratings are separate and vary by airline and contract.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const stages = [
  { stage: 'Commercial Pilot Licence', setBy: 'DGCA, under the Aircraft Rules, 1937', published: 'Age, education, medical, papers, radio, English, flying hours' },
  { stage: 'Airline selection', setBy: 'Each airline', published: 'Varies; IndiGo publishes its cadet age band and subjects' },
  { stage: 'Type rating and line training', setBy: 'The airline and DGCA', published: 'Required for the aircraft type; cost and bond terms vary by airline' },
  { stage: 'First Officer', setBy: 'The airline', published: 'Flight time capped by the DGCA duty-time CAR' },
  { stage: 'Captain', setBy: 'DGCA (ATPL) and the airline', published: `ATPL from age ${ATPL.minAge}; airline upgrade criteria on top` },
];

const related = [
  { lead: 'Every route open after Class 12, side by side, is in', anchor: 'aviation courses after 12th', href: '/blogs/aviation-course-after-12th' },
  { lead: 'The five written papers, pass mark and sessions are in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'How an airline cadet route differs from the self-funded one is on', anchor: 'the cadet pilot programme page', href: '/cadet-pilot-program' },
  { lead: 'What happens after the CPL on the airline side is in', anchor: 'the type rating guide', href: '/blogs/type-rating-for-pilots-in-india' },
  { lead: 'The licence that comes before command is explained in', anchor: 'CPL vs ATPL', href: '/blogs/cpl-vs-atpl-difference-india' },
];

const tocHeadings = [
  { id: 'what-it-takes', title: 'What does it take to become an airline pilot?' },
  { id: 'dgca-requirements', title: 'What DGCA requires for the CPL' },
  { id: 'order', title: 'In what order should you do the steps?' },
  { id: 'after-cpl', title: 'What happens between the CPL and the airline?' },
  { id: 'shortage', title: 'Is there a pilot shortage in India?' },
  { id: 'duty', title: 'How much does an airline pilot fly?' },
  { id: 'captain', title: 'How do you become a captain?' },
  { id: 'cost', title: 'What does the route cost?' },
  { id: 'short-version', title: 'The short version' },
];

const sources = [
  PARIKSHA.sources[1],
  EGCA.sources[3],
  { label: `${EXAM_RULES.car.citation} — ${EXAM_RULES.car.title} (DGCA)`, url: EXAM_RULES.car.where },
  FTO.sources[0],
  FTO.sources[1],
  INDIGO_CADET.source,
  PILOT_SUPPLY.sources[0],
  FDTL.sources[0],
  { label: 'IGRUA — approved courses and fees (Indira Gandhi Rashtriya Uran Akademi)', url: igrua.source },
];

export default function HowToBecomeAnAirlinePilotIndia() {
  return (
    <BlogPostLayout
      title="How to Become an Airline Pilot in India: 2027 Guide"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="Pilot career guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="12 min"
      quickAnswer={{
        question: 'How do you become an airline pilot in India?',
        answer: `Earn a DGCA Commercial Pilot Licence first: age ${CPL.minAge}, Physics and Mathematics at 10+2, a Class 1 medical, ${DGCA_PAPERS.length} written papers, ${RTR.name} and ${CPL_HOURS.total} flying hours. Then clear an airline's own selection, complete type training on its aircraft, and fly as a First Officer. Command later needs an ATPL, from age ${ATPL.minAge}.`,
      }}
      summaryTitle="The route in one view"
      summaryItems={[
        `The CPL is DGCA's minimum to fly for pay: age ${CPL.minAge}, Class 1 medical, ${DGCA_PAPERS.length} papers at ${EXAM_RULES.theory.passMark}% each, ${CPL_HOURS.total} hours.`,
        'Airlines select separately; a CPL is not a job offer.',
        `The government told Parliament there is no pilot shortage, only a shortage of commanders on some types.`,
        `Scheduled airline flying is capped at ${FDTL.limits[3].hours} hours in ${FDTL.limits[3].period}.`,
        `Command needs an ATPL, issued from age ${ATPL.minAge}.`,
        `Sources: Aircraft Rules Schedule II, DGCA CARs and Pariksha documents, PIB; read between ${EXAM_RULES.verifiedOn} and ${PILOT_SUPPLY.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
    >
      <p>
        Ask a room of Class 12 students how to become an airline pilot and most will describe one step:
        get a commercial licence, then join an airline. Their parents usually picture the same thing, and
        budget for it. The licence is real and it is the hard part, but it is not the airline. Between a
        DGCA Commercial Pilot Licence and the right-hand seat of an airliner sit the airline&rsquo;s own
        selection, type training on its aircraft, and a job market the government itself describes in
        plain terms. This guide sets out how to become an airline pilot in India in the order it actually
        happens, with every requirement taken from the document that sets it, so you can plan the money
        and the years with your eyes open.
      </p>

      <BlogCta variant="top" />


      <h2 id="what-it-takes" className={H2}>What does it take to become an airline pilot in India?</h2>
      <p>
        Becoming an airline pilot in India takes two separate things: a DGCA Commercial Pilot Licence,
        which the regulator issues when you meet Schedule II of the Aircraft Rules, 1937, and selection
        by an airline, which each airline decides for itself. The first is a published standard; the
        second is a hiring decision.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Stages from licence to airline captain, who sets each one, and what is published about it</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>Who sets it</th>
              <th scope="col" className={TH}>What is published</th>
            </tr>
          </thead>
          <tbody>
            {stages.map((r, i) => (
              <tr key={r.stage} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.stage}</td>
                <td className={TD}>{r.setBy}</td>
                <td className={TD}>{r.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Most of a student&rsquo;s money and time goes into the first row. The rows after it are where
        expectations go wrong, so this guide covers both.
      </p>

      <h2 id="dgca-requirements" className={H2}>What does DGCA require for a Commercial Pilot Licence?</h2>
      <p>
        DGCA issues a Commercial Pilot Licence to a candidate aged at least {CPL.minAge} who holds{' '}
        {EDUCATION.requirement}, a Class 1 medical, passes in the {DGCA_PAPERS.length} written papers,
        the {RTR.name} radio examination, English Language Proficiency at Level 4 or above, and{' '}
        {CPL_HOURS.total} hours of flying logged within the {CPL_HOURS.recencyYears} years before applying.
      </p>
      <ul className={UL}>
        <li>
          <strong>The written papers.</strong> {listJoin(DGCA_PAPERS)}. {EXAM_RULES.theory.perSubject}{' '}
          The pass mark comes from the{' '}
          <Ext href={EXAM_RULES.car.where}>DGCA examinations CAR</Ext>, {EXAM_RULES.theory.clause}.
        </li>
        <li>
          <strong>The flying.</strong> {CPL_HOURS.total} hours in total, of which{' '}
          {listJoin(CPL_HOURS.components.map((c) => `${c.hours} hours ${HOURS_PHRASE[c.clause]}`))} are part of the{' '}
          {CPL_HOURS.total}, not added to it.
        </li>
        <li><strong>Radio telephony.</strong> {RTR.note}</li>
        <li>
          <strong>The medical.</strong> Class 1, valid {lc(class1.validity.split('. ')[0])}. Our{' '}
          <Link href="/dgca-class-2-class-1-medical" className={LINK}>Class 1 medical guide</Link> lists where an initial one can be done.
        </li>
      </ul>
      <p>
        The licence application itself is made on eGCA, and DGCA&rsquo;s{' '}
        <Ext href={EGCA.sources[3].url}>eGCA user manual for the CPL application</Ext> lists what has to be
        in place before it will go through:
      </p>
      <ol className={OL}>
        {EGCA.cplPrerequisites.map((p) => <li key={p}>{p}</li>)}
      </ol>
      <p>
        The full eligibility picture, clause by clause, is on our{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>.
      </p>

      <h2 id="order" className={H2}>In what order should you do the steps?</h2>
      <p>
        The safest order is the one that tests the cheapest disqualifiers first: the Class 1 medical,
        then the DGCA computer number, then the written papers alongside choosing a flying school, and
        only then the flying itself. A student who reverses that order risks paying for flying before
        learning that a medical or a document problem stands in the way.
      </p>
      <ol className={OL}>
        <li>
          <strong>Class 1 medical, initial issue.</strong> {MEDICAL_STANDARDS.classOrder.advice}
        </li>
        <li>
          <strong>DGCA computer number.</strong> Apply on the{' '}
          <Ext href={PARIKSHA.portal}>Pariksha portal</Ext> from age {PARIKSHA.basics.minAge}. On the
          DigiLocker route it is allotted immediately on successful submission; on the manual route,
          within {PARIKSHA.processing.days} working days. Our{' '}
          <Link href="/dgca-computer-number" className={LINK}>computer number guide</Link> covers both.
        </li>
        <li>
          <strong>Ground subjects and papers.</strong> Each paper costs {inr(PARIKSHA.fees.regularPerPaper)} in a regular
          session. {EXAM_RULES.paperValidity.cplAtpl} {EXAM_RULES.paperValidity.planningNote}
        </li>
        <li>
          <strong>Choose the flying school.</strong> Check it on DGCA&rsquo;s{' '}
          <Ext href={FTO.sources[0].url}>list of approved flying training organisations</Ext>, which named{' '}
          {FTO.count} organisations as on {FTO.listAsOf}, and on DGCA&rsquo;s twice-yearly ranking.
        </li>
        <li><strong>Fly the {CPL_HOURS.total} hours,</strong> with the radio and English examinations alongside.</li>
        <li><strong>Apply for the licence on eGCA</strong> once the e-logbook is validated by the school.</li>
      </ol>

      <BlogCta
        variant="mid"
        title="The papers are the part you can start now"
        text="Students often clear the DGCA written papers while they wait for a medical date or a flying slot. We teach all five subjects from Dwarka and online."
      />

      <h2 id="after-cpl" className={H2}>What happens between the CPL and the airline?</h2>
      <p>
        After the CPL, an airline pilot in India still has to be selected by an airline and trained on
        its aircraft type. Airlines recruit either licence holders directly or cadets they select before
        training, and each sets its own criteria, so the licence opens the door to applying rather than
        to the job.
      </p>
      <h3 className={H3}>Airline cadet programmes</h3>
      <p>
        A cadet programme reverses the order: the airline selects first and the cadet trains towards the
        CPL afterwards. IndiGo is the one airline whose criteria we have been able to read on its own{' '}
        <Ext href={INDIGO_CADET.source.url}>cadet programme page</Ext>: candidates must be{' '}
        {INDIGO_CADET.ageRange}, must have {INDIGO_CADET.education}, and are allowed {INDIGO_CADET.attempts}{' '}
        {INDIGO_CADET.employmentNote} Our{' '}
        <Link href="/cadet-pilot-program" className={LINK}>cadet pilot programme page</Link> explains what such a
        route changes and what it does not.
      </p>
      <h3 className={H3}>Type rating and line training</h3>
      <p>
        An airliner is flown on a type rating for that aircraft, earned in training the airline arranges
        or requires. Who pays for it, and on what bond or contract, differs by airline and by intake, and
        no airline publishes a standard figure, so we give none. The{' '}
        <Link href="/blogs/type-rating-for-pilots-in-india" className={LINK}>type rating guide</Link> and{' '}
        <Link href="/blogs/mcc-training-for-pilots-in-india" className={LINK}>the MCC guide</Link> cover what
        the training involves.
      </p>

      <h2 id="shortage" className={H2}>Is there a pilot shortage in India?</h2>
      <p>
        India does not have a general pilot shortage, according to the Ministry of Civil Aviation. In a
        reply to Parliament published by PIB on 2 August 2024, it said: &ldquo;{PILOT_SUPPLY.statement}&rdquo;
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Commercial Pilot Licences issued by DGCA by year, as given to Parliament</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Year</th>
              <th scope="col" className={TH}>CPLs issued</th>
            </tr>
          </thead>
          <tbody>
            {PILOT_SUPPLY.cplIssued.map((r, i) => (
              <tr key={r.year} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.year}</td>
                <td className={TD}>{r.count.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Licences issued went from {firstYear.count.toLocaleString('en-IN')} in {firstYear.year} to{' '}
        {lastFullYear.count.toLocaleString('en-IN')} in {lastFullYear.year}. {PILOT_SUPPLY.cplIssuedNote}{' '}
        {PILOT_SUPPLY.whatItMeans} The figures are in the{' '}
        <Ext href={PILOT_SUPPLY.sources[0].url}>PIB release</Ext> itself, and our post on the{' '}
        <Link href="/blogs/pilot-shortage-in-india" className={LINK}>pilot shortage question</Link> goes further.
      </p>

      <h2 id="duty" className={H2}>How many hours does an airline pilot fly in India?</h2>
      <p>
        An airline pilot in India may fly at most {FDTL.limits[0].hours} hours in {FDTL.limits[0].period} and{' '}
        {FDTL.limits[3].hours} hours in {FDTL.limits[3].period}, under DGCA&rsquo;s{' '}
        <Ext href={FDTL.sources[0].url}>Flight Duty Time Limitations CAR for flight crew</Ext>, which
        applies to {FDTL.appliesTo}.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Maximum cumulative flight time for flight crew in scheduled air transport, by period</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Period</th>
              <th scope="col" className={TH}>Maximum flight time</th>
              <th scope="col" className={TH}>Clause</th>
            </tr>
          </thead>
          <tbody>
            {FDTL.limits.map((l, i) => (
              <tr key={l.period} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{l.period}</td>
                <td className={TD}>{l.hours} hours</td>
                <td className={TD}>{l.clause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {FDTL.weeklyRest} Because much of an airline pilot&rsquo;s pay is linked to flying hours and no
        Indian airline publishes a pay scale, these ceilings are the one published number that shapes
        it; our <Link href="/commercial-pilot-license-salary" className={LINK}>pilot salary page</Link>{' '}
        explains why we print no salary figure.
      </p>

      <h2 id="captain" className={H2}>How do you become a captain at an Indian airline?</h2>
      <p>
        Becoming a captain at an Indian airline requires an Airline Transport Pilot Licence, which DGCA
        issues from age {ATPL.minAge}, together with the airline&rsquo;s own command-upgrade criteria.
        The ATPL is the licence that permits acting as pilot-in-command of a commercial aeroplane.
      </p>
      <p>
        {ATPL_HOURS_GUIDANCE} The written papers count towards it too: a pass stays usable for five
        years for a CPL or ATPL application. The differences between the two licences are laid out in{' '}
        <Link href="/blogs/cpl-vs-atpl-difference-india" className={LINK}>CPL vs ATPL</Link>.
      </p>

      <h2 id="cost" className={H2}>What does it cost to become an airline pilot in India?</h2>
      <p>
        No Indian government body publishes a market price for airline pilot training, and private
        flying schools do not publish their fees. The published reference point is IGRUA, a government
        academy, whose published fee is set out below with what it does and does not cover.
      </p>
      <IgruaFeeBox />
      <p>
        Type rating costs after the CPL sit outside it altogether. Before comparing any two quotes,
        get both answers to the same questions; the first three to ask are:{' '}
        {listJoin(CPL_COST.askYourSchool.slice(0, 3).map((q) => `"${q}"`))}. The full list is in our{' '}
        <Link href="/blogs/pilot-training-cost-in-india" className={LINK}>pilot training cost breakdown</Link>.
      </p>

      <h2 id="short-version" className={H2}>The short version for a Class 12 student</h2>
      <p>
        The licence is a published standard you can plan against, and the airline seat is a selection
        you prepare for. Book the Class 1 medical first, get your computer number, start the papers, and
        choose a flying school from DGCA&rsquo;s own list. Treat any promise of a guaranteed airline job
        with the scepticism the government&rsquo;s own figures suggest, and you will make better decisions
        at every step after that.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
