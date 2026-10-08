import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { CPL_HOURS, DGCA_PAPERS, RTR, MEDICAL, ACADEMY, FTO, CPL_COST } from '../../lib/facts';
import { H3, LINK, TABLE_WRAP, TD_HEAD, listJoin, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Replaces the database post at /blogs/6a01656be977bff6d3d6bd42 (~1,400 words,
 * no tables, no numbers, a "Conclusion" heading). Its evaluation framework was
 * sound but generic; this rebuild keeps the framework and adds the mechanics.
 *
 * Deliberately does NOT repeat the eight-point checklists already in
 * /blogs/commercial-pilot-training-programs-complete-guide and
 * /blogs/flight-school-prerequisites-admission-guide. This is the canonical page
 * for the topic, so it goes at what those two summarise: what the DGCA FTO
 * ranking actually measures, how approval differs from ranking differs from
 * reputation, what geography does to a timeline, and the red flags.
 *
 * No HowTo (after-12th holds it).
 *
 * UPDATED 2026-10-08 to data/blog-standard.md: problem-led intro, the three
 * CTAs, DGCA's FTO list and ranking stated from lib/facts.js FTO (count,
 * parameters and weights, categories, the Delhi/NCR finding) with the
 * documents linked, its own FAQPage from peopleAlsoAsk (the pageFaqs.js entry
 * is deleted), and a garbled closing paragraph about academy terms replaced.
 */
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-10-08';

const HEADING = 'Best Flying School in India (2027): How to Choose One Using DGCA\u2019s Own Data';
const DESCRIPTION = 'How to choose the best flying school in India: DGCA\u2019s approved list and ranking, fleet ratio, weather losses, red flags and the questions to ask before paying.';
const articleSchema = articleSchemaFor({
  slug: 'best-flying-school-in-india',
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Flying school selection',
  keywords: 'best flying school in India, how to choose a flying school, DGCA approved flying schools, DGCA FTO ranking, flying training organisation India',
  image: '/blog/best-flying-school/hero-school-comparison.webp',
});

const threeSignals = [
  {
    signal: 'DGCA approval',
    means: 'The organisation meets the regulatory standard to conduct flight training and issue training records the DGCA will accept.',
    doesNotMean: 'That it flies often, maintains well, retains instructors, or finishes students on time. Approval is a floor.',
    howToCheck: `Find the school on DGCA\u2019s published list of ${FTO.count} approved organisations (as on ${FTO.listAsOf}) and read its approval validity dates there. A certificate image on a website is not verification.`,
  },
  {
    signal: 'FTO ranking',
    means: `DGCA ranks approved organisations ${FTO.ranking.frequency} on five weighted parameters, from operations and safety to student support.`,
    doesNotMean: 'That a high placing in one edition holds in the next, or that the criteria weight what matters to you.',
    howToCheck: 'Read the current edition yourself. A school quoting a placing without naming the edition is quoting whichever one suited it.',
  },
  {
    signal: 'Reputation',
    means: 'What former students say, which is the only signal that reflects the daily experience of training there.',
    doesNotMean: 'Anything, if it comes from testimonials the school selected and published itself.',
    howToCheck: 'Ask to speak with two students who finished in the last year, and find two more the school did not introduce you to.',
  },
];

const infrastructure = [
  { item: 'Fleet size against student roll', why: 'The ratio predicts flying frequency, and frequency decides your timeline. A larger fleet with a much larger student roll is worse than a small fleet with few students.', ask: 'How many aircraft and how many active students, today?' },
  { item: 'Daily serviceability', why: 'An aircraft on the ground trains nobody. Fleet size means little if a third of it is unserviceable on a typical morning.', ask: 'How many aircraft were unserviceable on an average day last month?' },
  { item: 'Instructor count and turnover', why: 'Instructors are the other half of the ratio, and every hand-off costs you flights in re-familiarisation.', ask: 'How many instructors, and how many left in the last year?' },
  { item: 'Simulator and training devices', why: 'Instrument procedure practice and emergency drills, at a fraction of an aircraft hour.', ask: 'What devices, and how many hours count towards the instrument requirement?' },
  { item: 'Maintenance arrangement', why: 'In-house engineering usually returns aircraft to line faster than an outsourced arrangement.', ask: 'Is maintenance in-house, and what is the typical turnaround?' },
];

const geography = [
  { region: 'Northern plains', helps: 'Long stable flying seasons through much of the year, and good cross-country terrain.', hurts: 'Winter fog can close operations for weeks at a stretch. Ask specifically about December and January.' },
  { region: 'Western and central India', helps: 'Dry seasons give consistent flying days across much of the calendar.', hurts: 'Summer heat reduces aircraft performance and can compress the usable flying window into early mornings.' },
  { region: 'Southern India', helps: 'More even conditions across the year, with fewer total weather closures.', hurts: 'Two monsoon seasons in parts of the region rather than one.' },
  { region: 'Coastal and eastern bases', helps: 'Sea-level operations and generally straightforward airspace at smaller fields.', hurts: 'Monsoon months and cyclone season can remove long stretches of flying.' },
  { region: 'Busy controlled airspace', helps: 'Genuine radio and traffic experience that a quiet field cannot teach.', hurts: 'Taxi and hold time that appears on the clock without appearing as training.' },
];

const redFlags = [
  'A refusal to give the average total hours students actually flew to licence last year, or an answer identical to the syllabus minimum.',
  'Fee terms that exist only in conversation. If the inclusions, the extra-hours rate and the refund conditions are not written down, they are not agreed.',
  'A large advance demanded before training starts, particularly at a discount. The discount is what you are paid for giving up your bargaining position.',
  'An FTO ranking quoted without naming the edition it came from.',
  'Testimonials and completion figures that appear only on the school’s own material and cannot be traced to a named former student.',
  'Any promise about an airline job, a placement rate, or a guaranteed outcome. Nobody controls that, so nobody can promise it.',
  'Vagueness about who owns the aircraft and who maintains them.',
  'Pressure to decide before you have completed a medical assessment.',
];

const verifySteps = [
  'Confirm current approval status with the regulator, not from the school’s website.',
  'Read the current DGCA FTO ranking edition yourself and note where your shortlist sits.',
  'Ask the five infrastructure questions in the table above, in writing, and keep the replies.',
  'Ask what happened to the batch that enrolled two years ago: how many finished, and in how long.',
  'Ask for the weather-loss record at that base for the last twelve months.',
  'Get the fee schedule, extra-hours rate and refund conditions in a written document.',
  'Speak with two former students the school introduces you to, then find two it did not.',
  'Visit if you can. An unannounced weekday morning tells you more than a scheduled tour.',
];

const questionsToAsk = [
  { q: 'What were the average total hours to licence last year?', reveals: 'The honest cost of training there. The gap between this and the syllabus minimum is what you will actually pay above the quote.' },
  { q: 'How many aircraft and how many active students?', reveals: 'Your likely flying frequency, which decides your timeline more than anything in the brochure.' },
  { q: 'How many flying days were lost to weather and unserviceability last year?', reveals: 'Whether the quoted duration is achievable at that base in that climate.' },
  { q: 'What is the hourly rate beyond the syllabus minimum, and is it fixed?', reveals: 'The exposure on the line item most likely to overrun.' },
  { q: 'Is the rate charged on block time or airborne time?', reveals: 'A material difference across 200 hours that is rarely volunteered.' },
  { q: 'Which ratings are inside the quoted fee?', reveals: 'Whether you are comparing like with like against another school’s number.' },
  { q: 'What is the payment schedule tied to?', reveals: 'Whether a disruption at the school leaves you having paid for training you did not receive.' },
  { q: 'Who maintains the aircraft, and what is the typical turnaround?', reveals: 'How quickly a grounded aircraft comes back to line — the hidden driver of flying frequency.' },
];

const tocHeadings = [
  { id: 'no-single-best', title: 'Is there a single best flying school?' },
  { id: 'three-signals', title: 'Approval, ranking and reputation' },
  { id: 'ranking', title: 'How to read the FTO ranking' },
  { id: 'infrastructure', title: 'What infrastructure actually matters' },
  { id: 'geography', title: 'What geography does to your timeline' },
  { id: 'cost', title: 'Comparing fees honestly' },
  { id: 'verify', title: 'An eight-step verification process' },
  { id: 'questions', title: 'Questions that separate schools' },
  { id: 'red-flags', title: 'Red flags' },
  { id: 'ground-first', title: 'Where ground school fits' },
];

const peopleAlsoAsk = [
  {
    q: 'Which is the best flying school in India?',
    a: `No single flying school in India is best for every student. DGCA publishes a list of ${FTO.count} approved flying training organisations and ranks them ${FTO.ranking.frequency}; within that list, the right school is the one with a good aircraft-to-student ratio, few weather and maintenance losses, and recent batches that finished on time.`,
  },
  {
    q: 'How do I check whether a flying school is DGCA approved?',
    a: `Look the school up on DGCA\u2019s published list of approved flying training organisations, which names ${FTO.count} organisations as on ${FTO.listAsOf} with their flying bases, approval numbers and validity dates. ${FTO.groundSchoolNote}`,
  },
  {
    q: 'Is there a DGCA-approved flying school in Delhi?',
    a: `DGCA\u2019s list of approved flying training organisations, as on ${FTO.listAsOf}, shows no flying base in ${listJoin(FTO.noBaseIn, 'or')}. A student from Delhi NCR therefore flies at a base in another state, even if ground classes are taken in Delhi.`,
  },
  {
    q: 'Is it worth training further from home for a better fleet ratio?',
    a: 'Usually yes. Proximity saves money and helps morale across an eighteen-month course, but a materially worse aircraft-to-student ratio costs you months, and months cost more than the travel does. Treat location as a tie-breaker between comparable schools, not as a reason to accept a slower one.',
  },
  {
    q: 'Does a bigger fleet always mean faster training?',
    a: 'No — the ratio matters, not the count. A school with twenty aircraft and four hundred students flies each student less often than one with six aircraft and sixty. Ask for both numbers and divide them yourself; the fleet photograph tells you nothing on its own.',
  },
  {
    q: 'Can I change flying schools partway through training?',
    a: 'It happens, and hours already logged remain yours because they sit in your logbook and with the DGCA rather than with the school. What you can lose is prepaid fees, which is the practical argument for a milestone-linked payment schedule over a large advance.',
  },
  {
    q: 'Is a school with newer aircraft better than one with older aircraft?',
    a: 'Maintenance record matters more than year of manufacture. A well-maintained older trainer flies more reliably than a newer one waiting on parts. Ask about serviceability and turnaround rather than fleet age.',
  },
  {
    q: 'How much does the choice of school affect airline recruitment later?',
    a: 'Less than students expect. Airlines assess your licence, ratings, total hours, examination record and their own selection process. What the school affects is whether you reach that point on time and on budget, which is a large enough consequence on its own.',
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const sources = [...FTO.sources, { label: 'IGRUA — approved courses and fees (Indira Gandhi Rashtriya Uran Akademi)', url: CPL_COST.benchmark.source }];

const related = [
  { lead: 'For what the whole programme involves and how the stages fit together, read', anchor: 'our guide to commercial pilot training programmes', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'For the admission paperwork and the order it has to happen in, see', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'For what any of this costs, line by line, read', anchor: 'the pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'Flying school options by country are compared on', anchor: 'our India flying school page', href: '/flying-school/india' },
  { lead: 'The six-month ground syllabus and current batch terms are covered on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function BestFlyingSchoolInIndia() {
  return (
    <BlogPostLayout
      title="Best Flying School in India: How to Choose (2027)"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="Flying school selection"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="13 min"
      quickAnswer={{
        question: 'Which is the best flying school in India?',
        answer: `There is no single best flying school in India. Start from DGCA's list of ${FTO.count} approved organisations and its twice-yearly ranking, then compare what decides your timeline: aircraft-to-student ratio, daily serviceability, instructor turnover, weather losses at that base, and whether recent batches finished on time. Ask for those figures in writing.`,
      }}
      summaryTitle="How to judge a flying school"
      summaryItems={[
        `DGCA lists ${FTO.count} approved flying training organisations (as on ${FTO.listAsOf}); approval is a floor, not a ranking`,
        `DGCA ranks them ${FTO.ranking.frequency}; the ${FTO.ranking.latestEdition} edition ranked ${FTO.ranking.ranked}`,
        `No approved flying base in Delhi or the rest of NCR`,
        'Fleet-to-student ratio predicts flying frequency better than fleet size does',
        'Ask for average hours to licence last year, never the syllabus minimum',
        'Weather losses at that specific base decide whether the quoted duration is achievable',
        'Payment tied to training milestones, never a large advance for a discount',
        'No school can promise an airline job, because no school controls that decision',
        `Sources: DGCA FTO list and ranking, read ${FTO.verifiedOn}`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
    >
      <p>
        Every flying school brochure looks the same from the kitchen table: a row of white aircraft, a
        smiling instructor, a placement line, a fee. Families compare the photographs and the fee, pick
        one, and find out in month four that the school has twice as many students as its aircraft can
        carry. Choosing the best flying school in India is not about finding the most impressive
        brochure; it is about asking a handful of questions whose answers decide how often you will
        actually fly. DGCA publishes more of those answers than most families realise, and this guide
        shows where to find them and what to ask for the rest.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/best-flying-school/hero-school-comparison.webp"
        width={1200}
        height={630}
        alt="Three small flying school hangars with training aircraft parked outside, viewed side by side for comparison"
        promptId="28"
      />

      <h2 id="no-single-best" className={H2}>Is there a single best flying school in India?</h2>
      <p>
        There is no single best flying school in India, and any page that names one is either selling
        that school or guessing. What exists is DGCA&rsquo;s{' '}
        <Ext href={FTO.sources[0].url}>list of {FTO.count} approved flying training organisations</Ext>,
        which differ enormously in how often you will fly, and a set of measurable questions that expose
        the difference before you pay.
      </p>
      <p>
        One finding from that list matters to every reader in the capital: it shows no approved flying
        base in {listJoin(FTO.noBaseIn, 'or')}. A Delhi student flies elsewhere, whatever an institute&rsquo;s
        address suggests.
      </p>
      <p>
        The mistake almost every family makes is comparing brochures. Brochures compare aircraft
        photographs, campus facilities and placement language. None of those decide your outcome.
        What decides it is how many hours you fly per month, and that comes down to arithmetic a
        school can give you in one sentence if it wants to.
      </p>

      <h2 id="three-signals" className={H2}>What do approval, ranking and reputation each tell you?</h2>
      <p>
        Three different signals, routinely treated as one. Each answers a genuine question and none
        of them answers the others.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">What DGCA approval, FTO ranking and reputation each indicate</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Signal</th>
              <th scope="col" className={TH}>What it means</th>
              <th scope="col" className={TH}>What it does not mean</th>
              <th scope="col" className={TH}>How to check it</th>
            </tr>
          </thead>
          <tbody>
            {threeSignals.map((s, i) => (
              <tr key={s.signal} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{s.signal}</td>
                <td className={TD}>{s.means}</td>
                <td className={TD}>{s.doesNotMean}</td>
                <td className={TD}>{s.howToCheck}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="ranking" className={H2}>How should you read the DGCA FTO ranking?</h2>
      <p>
        DGCA&rsquo;s FTO ranking scores approved flying training organisations {FTO.ranking.frequency} on
        five weighted parameters, under{' '}
        <Ext href={FTO.sources[1].url}>{FTO.ranking.notice}</Ext>. It is useful for building a shortlist
        and widely misused as a verdict.
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
            {FTO.ranking.parameters.map((r, i) => (
              <tr key={r.name} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.name}</td>
                <td className={TD}>{r.weight}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The{' '}
        <Ext href={FTO.sources[2].url}>{FTO.ranking.latestEdition} edition</Ext> ranked {FTO.ranking.ranked}{' '}
        organisations ({FTO.ranking.categories.map((c) => `${c.label}: ${c.count}`).join(', ')}). {FTO.ranking.exclusion}{' '}
        We do not reprint the order, because it changes with each edition. Three cautions when you read it:
      </p>
      <h3 className={H3}>Editions change</h3>
      <p>
        A placing from an earlier edition is history, not status. A school quoting a rank without naming
        the edition has chosen the edition that flatters it; read the current one yourself.
      </p>
      <h3 className={H3}>The weights may not be your weights</h3>
      <p>
        Operational aspects carry {FTO.ranking.parameters.find((r) => r.name === 'Operational Aspects').weight}% of the
        score, but a school ranked well overall can still be wrong for you if its base loses your available
        months to weather, or if its student roll has grown faster than its fleet since the assessment.
      </p>
      <h3 className={H3}>A ranking is a snapshot</h3>
      <p>
        Serviceability and instructor retention move faster than a twice-yearly publication. Use the
        ranking to build the shortlist, then verify each school&rsquo;s current position with the questions
        further down this page.
      </p>

      <h2 id="infrastructure" className={H2}>What infrastructure actually affects your training?</h2>
      <p>
        Five things, and only five. Classrooms, hostels and campus photographs are not among them —
        they affect your comfort, not your logbook.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Infrastructure factors that affect flight training outcomes</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>What to assess</th>
              <th scope="col" className={TH}>Why it decides your outcome</th>
              <th scope="col" className={TH}>The question to ask</th>
            </tr>
          </thead>
          <tbody>
            {infrastructure.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.item}</td>
                <td className={TD}>{r.why}</td>
                <td className={`${TD} italic`}>{r.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/best-flying-school/fleet-ratio.webp"
        width={1200}
        height={800}
        alt="Two groups showing a few aircraft with a small crowd of students beside many aircraft with a much larger crowd"
        promptId="29"
      />

      <h2 id="geography" className={H2}>What does geography do to your training timeline?</h2>
      <p>
        More than most students expect, and it is the factor least often discussed at enrolment.
        Every base has a season that costs it flying days. The question is not whether a school loses
        days but how many, and whether it tells you honestly.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">How regional conditions affect flight training in India</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Where the base sits</th>
              <th scope="col" className={TH}>What helps</th>
              <th scope="col" className={TH}>What costs you days</th>
            </tr>
          </thead>
          <tbody>
            {geography.map((g, i) => (
              <tr key={g.region} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{g.region}</td>
                <td className={TD}>{g.helps}</td>
                <td className={TD}>{g.hurts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Ask any shortlisted school how many flying days it lost last year and in which months. A
        school that tracks the figure will tell you. A school that does not track it is telling you
        something else.
      </p>

      <h2 id="cost" className={H2}>How do you compare fees between schools honestly?</h2>
      <p>
        Only by comparing totals, never quotes. Two schools quoting different numbers are usually
        quoting different scopes, and the cheaper headline frequently ends up costing more.
      </p>
      <p>
        Three things make quotes incomparable: which ratings sit inside the fee, whether flying is
        billed on block time or airborne time, and what the rate is for hours beyond the syllabus
        minimum. Settle all three before you put two numbers side by side. The full line-by-line
        picture is in{' '}
        <Link href="/blogs/pilot-training-cost-in-india" className="text-av-orange font-semibold underline">our pilot training cost breakdown</Link>,
        and current figures are maintained on{' '}
        <Link href="/cost-transparency" className="text-av-orange font-semibold underline">the cost transparency page</Link>.
      </p>

      <p>
        If you are still at the stage of deciding what kind of institution you need at all &mdash; a
        flying school for the hours, or a ground school for the written papers &mdash; start with{' '}
        <Link href="/how-to-choose-an-aviation-academy" className="text-av-orange font-semibold underline">how to check an aviation academy before you pay</Link>,
        which sets out what DGCA publishes about each and what it does not.
      </p>

      <BlogCta
        variant="mid"
        title="Ground school does not have to be at the flying school"
        text="The DGCA papers are examined by the regulator wherever you study. We teach all five from Dwarka and online, so you can choose a flying school on its flying alone."
      />

      <h2 id="verify" className={H2}>How do you verify a flying school before paying?</h2>
      <p>
        Eight steps, in order. Steps one to four cost you nothing but time, and they eliminate most
        shortlists before any money moves.
      </p>
      <ol className="list-decimal pl-6 space-y-3 marker:font-bold marker:text-av-orange">
        {verifySteps.map((s) => <li key={s}>{s}</li>)}
      </ol>

      <BlogImagePlaceholder
        src="/blog/best-flying-school/verification-steps.webp"
        width={1200}
        height={675}
        alt="A checklist clipboard beside a magnifying glass held over a small hangar and aircraft"
        promptId="30"
      />

      <h2 id="questions" className={H2}>Which questions separate one school from another?</h2>
      <p>
        Eight questions, and what each one actually reveals. Ask them in writing. The pattern of
        which ones get answered plainly is itself the most reliable signal you will collect.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Questions to ask a flying school and what each answer reveals</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Question</th>
              <th scope="col" className={TH}>What the answer reveals</th>
            </tr>
          </thead>
          <tbody>
            {questionsToAsk.map((q, i) => (
              <tr key={q.q} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{q.q}</td>
                <td className={TD}>{q.reveals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="red-flags" className={H2}>What are the red flags?</h2>
      <p>
        Eight signs worth walking away from. None of them is subtle once you know to look, and any
        one of them justifies a harder look at the rest.
      </p>
      <aside className="my-6 rounded-2xl border-l-4 border-av-orange bg-orange-50/60 p-6" aria-label="Flying school red flags">
        <ul className="list-disc pl-5 space-y-3 text-gray-700">
          {redFlags.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </aside>
      <p>
        The last one deserves emphasis. {MEDICAL.advice}
      </p>

      <h2 id="ground-first" className={H2}>Where does ground school fit in the decision?</h2>
      <p>
        Before the flying school, and often at a different organisation. The {DGCA_PAPERS.length}{' '}
        DGCA written papers are examined by the regulator regardless of where you studied for them,
        and {RTR.name} is examined separately again. That makes ground school and flying school two
        separable choices rather than one bundled decision.
      </p>
      <p>
        Sequencing theory first is usually the cheaper order. Ground study costs a fraction of an
        hour in an aircraft, and clearing the papers before the flying phase means the expensive
        months are spent building the {CPL_HOURS.total} hours rather than revising between weather
        cancellations.
      </p>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}, and we help
        students run the verification process on this page against their own shortlist.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
