import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import IgruaFeeBox from '../../components/IgruaFeeBox';
import {
  MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EXAM_RULES, FTO, CPL_COST, COST_NOTE, INDIGO_CADET,
  FOREIGN_LICENCE, EGCA, PARIKSHA, ACADEMY, inr,
} from '../../lib/facts';
import {
  H2, H3, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE,
  listJoin, articleSchemaFor, faqSchemaFrom,
} from '../../lib/blogKit';

/*
 * /blogs/commercial-pilot-training-programs-complete-guide — REWRITTEN 2026-10-08
 * to data/blog-standard.md.
 *
 * INTENT. "Commercial pilot training programmes": how to compare one CPL
 * programme with another. What a complete programme contains, the kinds of
 * programme on offer, how to verify the organisation with DGCA's own list and
 * ranking, what a quote must answer, and what decides the duration. The
 * explainer (licences, PPL vs CPL) belongs to what-is-pilot-training-complete-guide.
 *
 * REMOVED: a timeline table with unsourced durations ("12-18 months in India,
 * often near 12 abroad", "4-12 weeks"); the "why now" section's fleet-order
 * claim; four images — one printed the CPL hour components wrongly (50 cross-
 * country, 40 instrument, 10 night; the rule is 20, 10 and 5), one printed
 * untraceable cost percentages, and two showed "WeOne" branded aircraft,
 * simulators and a flight academy building, which ACADEMY.scope rules out.
 */
const SLUG = 'commercial-pilot-training-programs-complete-guide';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-10-08';
const HEADING = 'Commercial Pilot Training Programmes in India (2027): How to Compare One';
const DESCRIPTION = 'How to compare commercial pilot training programmes in India: what a full CPL programme includes, DGCA checks on the school, and what a quote must answer.';

const ranking = FTO.ranking;

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Commercial pilot training',
  keywords: 'commercial pilot training programs India, CPL training programme, CPL course India, compare flying schools, DGCA approved flying school, CPL programme fees',
  image: '/blog/commercial-pilot-training-programs/career-paths.webp',
});

const components = [
  { part: 'DGCA written papers', what: `${listJoin(DGCA_PAPERS)}, ${EXAM_RULES.theory.passMark}% in each`, ask: 'Is ground school included, or a separate enrolment? Are DGCA exam fees inside the quote?' },
  { part: 'Flying', what: `${CPL_HOURS.total} hours, with pilot-in-command, cross-country, instrument and night components inside the total`, ask: 'What is the hourly rate, is it fixed, and what are extra hours charged at?' },
  { part: 'Instrument Rating', what: 'Needed for airline-style flying; IGRUA lists it inside its course', ask: 'Included, or billed separately?' },
  { part: 'Multi-engine endorsement', what: 'Flying on a twin-engine aeroplane; IGRUA lists it inside its course', ask: 'Included, and on which aircraft?' },
  { part: `${RTR.name}`, what: RTR.note, ask: 'Does the school prepare you for it, and who pays the examination fee?' },
  { part: 'Skill tests and licence file', what: 'Flown with a DGCA examiner, then the licence application on eGCA', ask: 'Who arranges the examiner, and who validates the e-logbook?' },
];

const programmeTypes = [
  { type: 'Private flying training organisation', how: 'You enrol directly and pay the school. Most CPL training in India happens this way.', check: `On DGCA's list of ${FTO.count} approved organisations, and in its ranking` },
  { type: 'Government academy (IGRUA)', how: 'A government flying academy under the Ministry of Civil Aviation, with a published fee and selection.', check: 'The published fee and what it excludes' },
  { type: 'Airline cadet programme', how: 'The airline selects first; training runs with partner schools towards the CPL.', check: 'The cadet agreement: bond, funding and what is promised at the end' },
  { type: 'Training abroad', how: 'You earn that country’s licence and convert it in India.', check: 'The conversion steps in DGCA’s CAR, and who pays for them' },
];

const schoolChecks = [
  { check: 'Approval, verified at source', why: `Find the organisation on DGCA's own list (${FTO.count} names as on ${FTO.listAsOf}) and check the validity dates printed there, rather than accepting a certificate image.` },
  { check: 'Average hours to licence, not the minimum', why: 'The gap between the advertised minimum and last year’s actual average is the honest cost of training there.' },
  { check: 'How many students finished within the quoted time', why: 'A school that can answer this is telling you something real; one that cannot is quoting an aspiration.' },
  { check: 'Fleet against student numbers', why: 'The student-to-aircraft ratio predicts how often you will fly better than a fleet photograph does.' },
  { check: 'Instructor turnover', why: 'Each change of instructor costs a few flights of re-familiarisation.' },
  { check: 'Serviceability', why: 'Ask how many aircraft were unserviceable on an average day last month. The answer, or the refusal, tells you a lot.' },
  { check: 'Written fee terms', why: 'Inclusions, payment schedule, extra-hour rate and refund conditions, in writing, before any transfer.' },
];

const durationFactors = [
  { factor: 'Aircraft availability', effect: 'A grounded fleet stops every student at once, however ready they are.' },
  { factor: 'Instructor availability', effect: 'Frequent hand-offs between instructors cost repeated familiarisation flights.' },
  { factor: 'Weather and airport slots', effect: 'Monsoon and winter fog cancel flying days; busy airports add holding time.' },
  { factor: 'Examination sessions', effect: 'A failed paper waits for the next session; two carried papers can cost months.' },
  { factor: 'Flying frequency', effect: 'Students who fly consistently need fewer repeat lessons; long gaps mean re-learning, billed at the same rate.' },
  { factor: 'Medical holds', effect: 'A medical referred for investigation pauses everything that depends on it.' },
];

const peopleAlsoAsk = [
  {
    q: 'What is included in a commercial pilot training programme?',
    a: `A complete commercial pilot training programme covers preparation for the ${DGCA_PAPERS.length} DGCA papers, ${CPL_HOURS.total} hours of flying, the Instrument Rating, a multi-engine endorsement, ${RTR.name} preparation and the skill tests. Quotes differ mainly in which of these they leave out, so ask for each in writing.`,
  },
  {
    q: 'How do I know if a flying school is DGCA approved?',
    a: `Check the school's name on DGCA's published list of approved flying training organisations, which named ${FTO.count} organisations as on ${FTO.listAsOf} with their bases, approval numbers and validity dates. DGCA also publishes a ranking of these organisations ${ranking.frequency}.`,
  },
  {
    q: 'What is the DGCA ranking of flying schools?',
    a: `DGCA ranks approved flying training organisations ${ranking.frequency} on five weighted parameters: ${ranking.parameters.map((p) => `${p.name} (${p.weight}%)`).join(', ')}. The ${ranking.latestEdition} edition ranked ${ranking.ranked} organisations; schools under 18 months from approval were not ranked.`,
  },
  {
    q: 'Does the training aircraft type matter for an airline job?',
    a: 'The trainer aircraft type matters less than students expect. Airlines look at the licence, ratings, hours, examination record and their own selection, then train new pilots on their own aircraft through a type rating, so no particular trainer type is a requirement.',
  },
  {
    q: 'When are the instrument and multi-engine ratings done?',
    a: 'The instrument rating and multi-engine endorsement usually come late in the flying phase, after most single-engine hours. They are often priced separately from basic flying at higher hourly rates, so check whether a quoted package includes them before comparing schools.',
  },
  {
    q: 'Can I pause commercial pilot training partway through?',
    a: `Students do pause CPL training, for funding, a medical referral or family reasons. The cost is currency: after a long gap you need refresher flying. The ${CPL_HOURS.total} hours must also fall within the ${CPL_HOURS.recencyYears} years before the licence application, and passed papers stay usable for five years.`,
  },
  {
    q: 'Is a government flying academy cheaper than a private one?',
    a: `IGRUA, the government flying academy, publishes ${CPL_COST.benchmark.feeLabel} for ab-initio to CPL training, with uniform, study material, DGCA fees, hostel and messing extra. Private schools do not publish fees, so a fair comparison needs a private quote answering the same questions.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const related = [
  { lead: 'What pilot training is, licence by licence, is explained in', anchor: 'what is pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'How to judge one school against another in depth is in', anchor: 'how to choose the best flying school', href: '/blogs/best-flying-school-in-india' },
  { lead: 'The admission checklist before you pay is in', anchor: 'flight school prerequisites', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'The cost lines, and the questions that expose a thin quote, are in', anchor: 'the pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'IGRUA’s selection and fee are covered in', anchor: 'IGRUA admission', href: '/blogs/igrua-admission-eligibility-fees' },
];

const tocHeadings = [
  { id: 'what-is', title: 'What is a CPL training programme?' },
  { id: 'components', title: 'What should a programme include?' },
  { id: 'types', title: 'What kinds of programme are there?' },
  { id: 'verify', title: 'How do you verify the school?' },
  { id: 'questions', title: 'Which questions separate schools?' },
  { id: 'cost', title: 'How should you compare cost?' },
  { id: 'duration', title: 'What decides how long it takes?' },
  { id: 'ready', title: 'Are you ready to start?' },
  { id: 'short-version', title: 'The short version' },
];

const sources = [
  FTO.sources[0],
  FTO.sources[1],
  FTO.sources[2],
  { label: 'IGRUA — approved courses and fees (Indira Gandhi Rashtriya Uran Akademi)', url: CPL_COST.benchmark.source },
  INDIGO_CADET.source,
  FOREIGN_LICENCE.sources[0],
  EGCA.sources[3],
];

export default function CommercialPilotTrainingPrograms() {
  return (
    <BlogPostLayout
      title="Commercial Pilot Training Programmes in India: Compare"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="Commercial pilot training"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="11 min"
      quickAnswer={{
        question: 'How do you compare commercial pilot training programmes in India?',
        answer: `Check that the organisation is on DGCA's list of ${FTO.count} approved flying training organisations and see where it sits in DGCA's ranking. Then compare written quotes line by line: ground school, ${CPL_HOURS.total} flying hours and the extra-hour rate, the Instrument Rating, the multi-engine endorsement, ${RTR.name}, skill tests and refund terms.`,
      }}
      summaryTitle="What to compare"
      summaryItems={[
        `DGCA lists ${FTO.count} approved flying training organisations (as on ${FTO.listAsOf}).`,
        `DGCA ranks them ${ranking.frequency}; the ${ranking.latestEdition} edition ranked ${ranking.ranked}.`,
        'A complete programme includes the Instrument Rating and multi-engine endorsement; many quotes do not.',
        `IGRUA is the one programme with a published fee: ${CPL_COST.benchmark.feeLabel}, with significant items excluded.`,
        'No regulation fixes a programme’s length; aircraft, instructors, weather and exams decide it.',
        `Sources: DGCA FTO list and ranking, read ${FTO.verifiedOn}; IGRUA, read ${CPL_COST.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
    >
      <p>
        Two brochures arrive in the same week. One quotes a lower figure and a shorter course; the other
        is dearer and vaguer. A parent asks which is better, and nobody in the house knows what a
        commercial pilot training programme is supposed to contain, so the comparison collapses into
        price and photographs. That is how most families choose, and it is how most of them end up
        paying for the parts that were never in the first quote. This guide sets out what a full CPL
        programme includes, the kinds of programme on offer in India, how to check the organisation
        against DGCA&rsquo;s own records, and the questions that make two quotes comparable.
      </p>

      <BlogCta variant="top" />

      <h2 id="what-is" className={H2}>What is a commercial pilot training programme?</h2>
      <p>
        A commercial pilot training programme is a package of ground instruction, flying and tests,
        sold by a flying training organisation, that prepares you for the DGCA Commercial Pilot Licence.
        DGCA sets the requirements for the licence; it does not set the contents, length or price of any
        programme.
      </p>
      <p>
        That distinction is the reason two programmes can look so different. Both lead to the same
        licence, issued against the same Schedule II requirements, minimum age {MIN_AGE.CPL}. What
        differs is how much of the work each one includes, how quickly its aircraft and instructors let
        you fly, and what it charges for the parts it leaves out.
      </p>

      <h2 id="components" className={H2}>What should a complete CPL programme include?</h2>
      <p>
        A complete CPL programme includes preparation for the {DGCA_PAPERS.length} written papers,{' '}
        {CPL_HOURS.total} hours of flying, the Instrument Rating, a multi-engine endorsement,{' '}
        {RTR.name} and the skill tests. Each of these is needed before an airline will consider you, so a
        quote missing any of them is not the whole cost.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Components of a complete CPL programme and the question to ask about each</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Component</th>
              <th scope="col" className={TH}>What it is</th>
              <th scope="col" className={TH}>Ask the school</th>
            </tr>
          </thead>
          <tbody>
            {components.map((r, i) => (
              <tr key={r.part} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.part}</td>
                <td className={TD}>{r.what}</td>
                <td className={TD}>{r.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The final step, the licence application on eGCA, has its own checklist in DGCA&rsquo;s{' '}
        <Ext href={EGCA.sources[3].url}>eGCA user manual for the CPL</Ext>, including an e-logbook
        validated by the school and English Language Proficiency at Level 4 or above. The hour
        components are explained in{' '}
        <Link href="/blogs/cpl-pilot-in-command-hours-requirement-india" className={LINK}>the PIC hours rule</Link>{' '}
        and its companion posts.
      </p>

      <h2 id="types" className={H2}>What kinds of commercial pilot training programme are there?</h2>
      <p>
        Four kinds of CPL programme are open to an Indian student: a private flying training
        organisation, the government academy IGRUA, an airline cadet programme, and training abroad
        followed by conversion. They differ in who selects you, who you pay and what you must check.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Kinds of CPL training programme, how each works and what to check</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Programme</th>
              <th scope="col" className={TH}>How it works</th>
              <th scope="col" className={TH}>What to check</th>
            </tr>
          </thead>
          <tbody>
            {programmeTypes.map((r, i) => (
              <tr key={r.type} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.type}</td>
                <td className={TD}>{r.how}</td>
                <td className={TD}>{r.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        For cadet programmes, IndiGo publishes its own criteria on its{' '}
        <Ext href={INDIGO_CADET.source.url}>cadet programme page</Ext>: {INDIGO_CADET.ageRange}, with{' '}
        {INDIGO_CADET.education}. {INDIGO_CADET.employmentNote} For training abroad, the conversion
        steps are set out in{' '}
        <Link href="/blogs/convert-foreign-pilot-licence-to-dgca-india" className={LINK}>converting a foreign licence to DGCA</Link>.
      </p>

      <h2 id="verify" className={H2}>How do you verify a flying school with DGCA?</h2>
      <p>
        Verify a flying school by finding it on DGCA&rsquo;s{' '}
        <Ext href={FTO.sources[0].url}>list of approved flying training organisations</Ext>, which named{' '}
        {FTO.count} organisations as on {FTO.listAsOf}, and then by reading its place in DGCA&rsquo;s{' '}
        <Ext href={FTO.sources[2].url}>ranking of flying training organisations</Ext>. Both are published by
        the regulator and both can be checked in minutes.
      </p>
      <p>The list prints, for each organisation:</p>
      <ul className={UL}>
        {FTO.listColumns.map((c) => <li key={c}>{c}</li>)}
      </ul>
      <p>
        The ranking, set up by{' '}
        <Ext href={FTO.sources[1].url}>{ranking.notice}</Ext>, is published {ranking.frequency} and scores
        each organisation on five weighted parameters:
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Parameters and weights in DGCA's ranking of flying training organisations</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Parameter</th>
              <th scope="col" className={TH}>Weight</th>
            </tr>
          </thead>
          <tbody>
            {ranking.parameters.map((p, i) => (
              <tr key={p.name} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{p.name}</td>
                <td className={TD}>{p.weight}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The {ranking.latestEdition} edition ranked {ranking.ranked} organisations in three categories
        ({ranking.categories.map((c) => `${c.label}: ${c.count}`).join(', ')}). {ranking.exclusion} We do not
        reprint the order, because it changes with each edition; read the current one. {FTO.groundSchoolNote}
      </p>

      <BlogCta
        variant="mid"
        title="Keep ground school and flying separate if it suits you"
        text="The DGCA papers can be studied anywhere. We teach all five from Dwarka and online, so students can choose a flying school on its flying alone."
      />

      <h2 id="questions" className={H2}>Which questions separate one flying school from another?</h2>
      <p>
        The questions that separate flying schools are about outcomes, not facilities: average hours
        to licence, how many students finished on time last year, how often the aircraft fly, and what
        the fee terms say in writing. Ask them all, in writing, and notice which ones go unanswered.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">What to verify before choosing a flying school, and why each matters</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>What to check</th>
              <th scope="col" className={TH}>Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {schoolChecks.map((c, i) => (
              <tr key={c.check} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{c.check}</td>
                <td className={TD}>{c.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        These are our suggestions, built from the questions that matter to a student&rsquo;s time and
        money; DGCA does not require a school to answer them. A school that answers all of them plainly
        is worth more than one with better photographs. The full method is in{' '}
        <Link href="/blogs/best-flying-school-in-india" className={LINK}>how to choose the best flying school in India</Link>.
      </p>

      <h2 id="cost" className={H2}>How should you compare the cost of two programmes?</h2>
      <p>
        Compare the cost of two programmes only after both quotes answer the same questions in writing.
        Private flying schools in India do not publish their fees, so the only published reference is
        IGRUA&rsquo;s government course fee, set out below with what it leaves out.
      </p>
      <IgruaFeeBox />
      <p>The questions every quote should answer before you compare it:</p>
      <ol className={OL}>
        {CPL_COST.askYourSchool.map((q) => <li key={q}>{q}</li>)}
      </ol>
      <p>
        {CPL_COST.comparisonNote} {COST_NOTE} DGCA&rsquo;s own examination fee, paid directly, is{' '}
        {inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session.
      </p>

      <h2 id="duration" className={H2}>What decides how long a CPL programme takes?</h2>
      <p>
        No regulation fixes how long a CPL programme takes, so a quoted duration is the school&rsquo;s
        estimate. What decides it is aircraft and instructor availability, weather, examination sessions,
        how often you fly, and the medical.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Factors that decide how long CPL training takes</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Factor</th>
              <th scope="col" className={TH}>Effect</th>
            </tr>
          </thead>
          <tbody>
            {durationFactors.map((r, i) => (
              <tr key={r.factor} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.factor}</td>
                <td className={TD}>{r.effect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Ask a school how many of last year&rsquo;s students finished within the time it quoted you. The
        outer limit is set by DGCA: {EXAM_RULES.paperValidity.cplAtpl.charAt(0).toLowerCase() + EXAM_RULES.paperValidity.cplAtpl.slice(1)}
      </p>

      <h2 id="ready" className={H2}>Are you ready to start a CPL programme?</h2>
      <p>
        You are ready to start a CPL programme when the cheap disqualifiers are settled and the money has
        a margin. The Class 1 medical and the computer number come first; the deposit comes after.
      </p>
      <ul className={UL}>
        <li>The Class 1 medical is done, before any deposit is paid.</li>
        <li>The DGCA computer number is allotted.</li>
        <li>Your budget has a buffer above the minimum hours, not exactly at them.</li>
        <li>You can study the papers without someone chasing you through them.</li>
        <li>You are willing to relocate and live to the flying school&rsquo;s schedule for a long stretch.</li>
        <li>You see the licence as the start of a career, not the end of a course.</li>
      </ul>
      <BlogImagePlaceholder
        src="/blog/commercial-pilot-training-programs/career-paths.webp"
        width={1200}
        height={675}
        alt="A runway forking into four paths leading to an airliner, a training aircraft, a charter aircraft and a business jet"
        promptId="16"
      />

      <h2 id="short-version" className={H2}>The short version</h2>
      <p>
        Every CPL programme leads to the same DGCA licence; what you are choosing is how much of the
        work is included and how reliably the school lets you fly. Check the organisation on DGCA&rsquo;s
        list and ranking, get every quote in writing against the same questions, and settle the medical
        before any money moves. Then the cheaper programme and the better programme are easy to tell
        apart.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
