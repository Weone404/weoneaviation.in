import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import {
  ACADEMY, CPL_HOURS, ATPL_HOURS_GUIDANCE, FDTL, PILOT_SUPPLY, FTO, LICENCES, MIN_AGE,
} from '../../lib/facts';

/*
 * /blogs/how-pilots-build-hours — new 2026-09-16.
 *
 * WHY IT EXISTS. Three legacy database posts cover this topic — "How Pilots
 * Build Hours" (6a7034d8), "How Pilots Build Hours After CPL" (6a1d00f8) and a
 * third duplicate (6a0bf3f4) — and all three have had a redirect written and
 * parked in next.config.js since before this branch, blocked on a destination
 * that did not exist. This is that destination. The three lines activate in the
 * same commit, per the standing rule.
 *
 * THE HONEST FRAME, and the reason this page is worth writing at all. Every
 * page on hour building treats it as a logistics problem: here are five ways to
 * accumulate hours. The question underneath it is different and nobody answers
 * it — WHY does a 200-hour pilot need more hours, when 200 is what the licence
 * requires? The answer is in a government document. The Ministry of Civil
 * Aviation told Parliament there is no shortage of pilots in India but there IS
 * a shortage of commanders. So the hours are not for the licence; they are for
 * the scarcity, and the scarcity is at command level. That reframes the whole
 * subject and it is sourced.
 *
 * WHAT IS DELIBERATELY NOT HERE.
 *   - Any airline's minimum-hours figure for recruitment. Airlines publish those
 *     per vacancy and they move; a number here would be wrong within months.
 *   - ATPL hour figures. The Schedule II Section M table was amended twice
 *     (G.S.R. 22(E) of 2020 and G.S.R. 731(E) of 2023) and lib/facts.js records
 *     that any figure from an older source may be stale. See ATPL_HOURS_GUIDANCE.
 *   - Instructor-rating hour thresholds. Sources disagree by a wide margin and
 *     none is a primary source; /blogs/flying-instructor-rating-for-pilots-in-india
 *     already withholds them for the same reason. Do not add them here either.
 *   - Any cost per hour. Untraceable, and removed site-wide in this branch.
 */

const DATE_PUBLISHED = '2026-09-16';
const DATE_MODIFIED = '2026-09-16';
const CANONICAL = 'https://weoneaviation.in/blogs/how-pilots-build-hours';

const routes = [
  {
    route: 'Flying Instructor Rating',
    how: 'You teach at a flying training organisation and log the hours you fly while instructing. It is the only route on this list that pays you while the hours accumulate rather than charging you for them, which is why it is the most common answer in India.',
    watch: 'It is a qualification in its own right with its own training and its own examination — not something a CPL holder simply starts doing. It also ties you to a school rather than an airline for the duration.',
    href: '/blogs/flying-instructor-rating-for-pilots-in-india',
    anchor: 'the Flying Instructor Rating in detail',
  },
  {
    route: 'General aviation and charter flying',
    how: 'Non-scheduled operators, corporate flight departments, aerial survey and similar work. Varied flying, often on types and into aerodromes an airline route network never touches.',
    watch: 'Availability is the constraint and it is genuinely unpredictable. Work depends on demand rather than on a roster, so hours can arrive in bursts and then stop.',
  },
  {
    route: 'Self-funded hire',
    how: 'Renting an aircraft and flying it yourself. The fastest route in principle, because nothing depends on anyone hiring you.',
    watch: 'Also the most expensive by a wide margin, and the hours are usually the least varied — circuits and local flying do not build the experience a selection board is looking at. Paying for hours is not the same as gaining experience.',
  },
  {
    route: 'Additional ratings and qualifications',
    how: 'An Instrument Rating, a multi-engine class rating, Multi-Crew Cooperation. These are not primarily hour-building, but they change what kind of pilot you are on paper, which is often what is actually holding an application back.',
    watch: 'Easy to over-invest in. A rating you take because you were told to, before you know what you are applying for, can be money spent early for no gain.',
    href: '/blogs/instrument-rating-for-pilots-in-india',
    anchor: 'the Instrument Rating explained',
  },
  {
    route: 'A cadet or airline-sponsored route',
    how: 'Selected, trained and — in some programmes — placed by the airline, so the hour-building problem is handled inside the programme rather than left to you.',
    watch: 'Selection is the hard part, and the licence requirements do not change: the same hours, papers, medical and RTR apply on every route.',
    href: '/cadet-pilot-program',
    anchor: 'what a cadet programme does and does not change',
  },
];

const tocHeadings = [
  { id: 'why', title: 'Why 200 hours is not enough' },
  { id: 'scarcity', title: 'What the government actually says' },
  { id: 'routes', title: 'The five routes, and the catch in each' },
  { id: 'ceiling', title: 'The ceiling once you are employed' },
  { id: 'recency', title: 'The trap: hours that stop counting' },
  { id: 'atpl', title: 'Why no ATPL figure appears here' },
];

const related = [
  { lead: 'For the route that pays you while the hours accumulate, read', anchor: 'our Flying Instructor Rating guide', href: '/blogs/flying-instructor-rating-for-pilots-in-india' },
  { lead: 'For how the 200 hours themselves are built', anchor: 'see our CPL flight training page', href: '/cpl-flight-training' },
  { lead: 'For what is published about pilot pay and what is not', anchor: 'see the pilot salary page', href: '/commercial-pilot-license-salary' },
  { lead: 'For how long the whole route takes and what fixes it', anchor: 'read how long it takes to become a pilot', href: '/how-long-does-it-take-to-become-a-pilot' },
  { lead: 'For choosing where to fly them', anchor: 'see how to check an aviation academy', href: '/how-to-choose-an-aviation-academy' },
];

const peopleAlsoAsk = [
  {
    q: 'Why do pilots need to build hours after getting a CPL?',
    a: `Because the licence and the job have different thresholds. ${CPL_HOURS.total} hours is what DGCA requires to issue a Commercial Pilot Licence; what an airline requires to hire you is set by the airline, published per vacancy, and is not a regulatory figure at all. The useful way to understand the gap is the Ministry of Civil Aviation's own position: "${PILOT_SUPPLY.statement}" Hours are not scarce and neither are licence holders — command experience is. That is what the hours are ultimately being built towards.`,
  },
  {
    q: 'What is the fastest way to build flying hours in India?',
    a: 'Self-funded hire, in principle, because nothing depends on anyone hiring you — and it is also the most expensive by a wide margin and usually the least varied flying. A Flying Instructor Rating is slower per month but pays you rather than charging you, and produces the kind of varied, responsible flying a selection board can read. Most people in India take the instructor route for exactly that reason.',
  },
  {
    q: 'How many hours do airlines want?',
    a: 'It is set by each airline per vacancy rather than by regulation, and it moves with the hiring cycle. We do not print a figure here because any number would be wrong within months. Read the current advertisement for the role you are targeting; that is the only reliable source, and it is public.',
  },
  {
    q: 'Do old flying hours still count?',
    a: `Not for the licence. The ${CPL_HOURS.total} hours a CPL requires must fall within the ${CPL_HOURS.recencyYears} years before you apply, and ${CPL_HOURS.components[0].note}. A long gap does not merely slow you down — it can delete hours you have already paid for.`,
  },
  {
    q: 'Is there a limit on how many hours a pilot can fly?',
    a: `Yes, once you are flying commercially for a scheduled operator. Under ${FDTL.citation}, flight time is capped at ${FDTL.limits.map((l) => `${l.hours} hours in ${l.period}`).join(', ')}. So there is a published ceiling on how fast hours can accumulate in airline service, set for fatigue reasons.`,
  },
];

const faqs = [
  { q: 'Does an instructor rating count as airline experience?', a: 'It counts as flying experience, and it is how a large share of Indian airline pilots reached the hours they were hired on. Whether a particular airline weights it the way you hope is the airline’s call and it varies.' },
  { q: 'Can I build hours abroad and use them in India?', a: 'Hours are hours in a logbook, but the licence they were flown under is not. Flying commercially in India needs a DGCA licence, so a foreign licence has a conversion step with its own time and cost. Plan it in from the start rather than discovering it at the end.' },
  { q: 'Should I take a type rating to improve my chances?', a: 'Only against a specific opening that asks for it. A type rating is expensive, aircraft-specific and has no value if you are hired onto a different fleet. Ask what the role you are targeting actually requires before spending.' },
  { q: 'How many hours does an ATPL need?', a: ATPL_HOURS_GUIDANCE },
  { q: 'Does We One Aviation arrange hour building?', a: ACADEMY.scope },
  { q: 'What if I cannot find any flying at all?', a: `That is a real and common position, and it is worth naming rather than glossing over. DGCA's approved list has ${FTO.count} organisations across ${FTO.statesWithBases.length} states as on ${FTO.listAsOf}, which is where instructing and most hire flying happens — widening your geography is usually the first practical answer.` },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How Pilots Build Hours After a CPL — and Why They Have To',
  description: 'A CPL takes 200 hours. Airlines want more, and the reason is in a government document: no shortage of pilots in India, but a shortage of commanders. The five routes, the catch in each, and the recency rule that deletes hours.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot career guide',
  keywords: 'how pilots build hours, hour building after cpl, flying hours building india, cpl to airline hours, flight instructor hour building',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
  citation: [
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: PILOT_SUPPLY.sources[0].label, url: PILOT_SUPPLY.sources[0].url },
    { '@type': 'CreativeWork', name: FDTL.sources[0].label, url: FDTL.sources[0].url },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const A = 'text-av-orange font-semibold underline';

export default function HowPilotsBuildHours() {
  return (
    <BlogPostLayout
      title="How Pilots Build Hours After a CPL — and Why They Have To"
      description="A CPL takes 200 hours. Airlines want more, and the reason is in a government document. The five routes, the catch in each, and the recency rule that quietly deletes hours."
      schema={[articleSchema, faqSchema]}
      heading="How Pilots Build Hours After a CPL — and Why They Have To"
      category="Pilot career guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'Why do pilots build hours after a CPL, and how?',
        answer: `Because the licence threshold and the hiring threshold are different things. DGCA issues a Commercial Pilot Licence at ${CPL_HOURS.total} hours; what an airline asks for is set by that airline per vacancy and is not a regulatory figure. The reason the gap exists is published: the Ministry of Civil Aviation's position is that there is no shortage of pilots in India but there is a shortage of commanders. The five routes people use are instructing, general aviation and charter, self-funded hire, additional ratings, and a cadet or sponsored programme — and the one that pays you rather than charging you is instructing, which is why most Indian pilots take it.`,
      }}
      summaryTitle="Hour building, in one view"
      summaryItems={[
        `The licence requires ${CPL_HOURS.total} hours — Schedule II, Section J, ${CPL_HOURS.clause}`,
        'What an airline requires is set per vacancy by the airline, not by any regulation',
        `The government's position: "${PILOT_SUPPLY.statement}"`,
        'Five routes: instructing, charter and general aviation, self-funded hire, extra ratings, cadet programmes',
        'Only instructing pays you while the hours accumulate',
        `Recency trap: hours older than ${CPL_HOURS.recencyYears} years stop counting towards the licence`,
        `Once employed, flight time is capped at ${FDTL.limits[3].hours} hours a year under the flight crew FDTL`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <h2 id="why" className={H2}>Why 200 hours is not enough</h2>
      <p>
        A Commercial Pilot Licence is issued against {CPL_HOURS.total} hours. That figure comes from
        Schedule II, Section J, {CPL_HOURS.clause} of the Aircraft Rules, 1937, and it is the whole
        of what the regulator asks for. So a reasonable person finishing training asks why anybody is
        talking about building more.
      </p>
      <p>
        The answer is that the licence threshold and the hiring threshold are two different things
        set by two different parties. DGCA decides when you are qualified. An airline decides when it
        wants to employ you, it publishes that requirement per vacancy rather than once and for all,
        and it moves with the hiring cycle. You will not find an authoritative national figure for
        it, and this page deliberately does not print one &mdash; any number here would be wrong
        within a few months and would send someone down the wrong path with confidence.
      </p>

      <h2 id="scarcity" className={H2}>What the government actually says about this</h2>
      <p>
        Here is the part that reframes the whole subject, and almost no page on hour building
        mentions it. Asked in Parliament whether India has a pilot shortage, the Ministry of Civil
        Aviation answered:
      </p>
      <blockquote className="border-l-4 border-av-orange bg-gray-50 rounded-r-xl p-5 my-5">
        <p className="text-av-blue text-sm leading-relaxed font-semibold">&ldquo;{PILOT_SUPPLY.statement}&rdquo;</p>
        <p className="text-gray-500 text-xs mt-2">&mdash; {PILOT_SUPPLY.statementSource}</p>
      </blockquote>
      <p>
        Read it carefully, because it explains both halves of the problem. There is no shortage of
        pilots, so holding a licence does not make you scarce and the first job is genuinely
        competitive. There <em>is</em> a shortage of commanders, so scarcity &mdash; and the money
        &mdash; sits at command level, which is reached with experience rather than with a licence.
      </p>
      <p>
        So hour building is not a bureaucratic hurdle between you and a job. It is the beginning of
        the climb towards the thing that is actually scarce. That is a more useful way to choose
        between the routes below than asking which is quickest.
      </p>
      <p>
        The supply side from the same release is worth knowing too: DGCA issued{' '}
        {PILOT_SUPPLY.cplIssuedTotal.toLocaleString('en-IN')} Commercial Pilot Licences over the
        five-year period to July 2024, and a later release records issuance rising more than 2.5
        times over eight years. More licence holders each year, and the scarcity unchanged at the top.
      </p>

      <h2 id="routes" className={H2}>The five routes, and the catch in each</h2>
      <p>
        Most articles list these. Fewer say what is wrong with each one, which is the part worth
        reading.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Route</th>
              <th className={TH}>How it works</th>
              <th className={TH}>The catch</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr key={r.route}>
                <td className={`${TD} font-semibold text-av-blue`}>
                  {r.route}
                  {r.href ? (
                    <>
                      <br />
                      <Link href={r.href} className={`${A} text-xs`}>{r.anchor}</Link>
                    </>
                  ) : null}
                </td>
                <td className={TD}>{r.how}</td>
                <td className={TD}>{r.watch}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        If there is a single practical conclusion, it is that paying for hours and earning hours are
        not equivalent even when the logbook total is identical. Instructing produces varied flying
        with responsibility attached; renting an aircraft for circuits produces a number. A selection
        board reads the first and counts the second.
      </p>

      <h2 id="ceiling" className={H2}>The ceiling, once you are employed</h2>
      <p>
        Worth knowing before you plan a career around accumulating hours quickly: once you are flying
        for a scheduled operator, how fast they can accumulate is capped by regulation. Under{' '}
        {FDTL.citation}, applicable to {FDTL.appliesTo}:
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <thead>
            <tr>
              <th className={TH}>Period</th>
              <th className={TH}>Maximum flight time</th>
              <th className={TH}>Clause</th>
            </tr>
          </thead>
          <tbody>
            {FDTL.limits.map((l) => (
              <tr key={l.period}>
                <td className={TD}>{l.period}</td>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{l.hours} hours</td>
                <td className={`${TD} whitespace-nowrap text-xs`}>{l.clause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {FDTL.weeklyRest} These are ceilings imposed for fatigue reasons rather than targets, and most
        pilots fly below them &mdash; but they do mean the climb to command is measured in years
        rather than months, whatever the hiring cycle is doing.
      </p>

      <h2 id="recency" className={H2}>The trap: hours that stop counting</h2>
      <p>
        This one catches people who step away and come back. For the licence itself, the{' '}
        {CPL_HOURS.total} hours must fall within the {CPL_HOURS.recencyYears} years before you apply,
        and {CPL_HOURS.components[0].note}.
      </p>
      <p>
        So a pilot who flies 140 hours, stops for six years and returns has not paused &mdash; they
        have lost hours they paid for. If a gap is coming, that is worth knowing before it starts
        rather than afterwards. How the rest of the timeline works, including the papers that expire
        on their own schedule, is on{' '}
        <Link href="/how-long-does-it-take-to-become-a-pilot" className={A}>our page on how long it
        takes</Link>.
      </p>

      <h2 id="atpl" className={H2}>Why no ATPL figure appears here</h2>
      <p>
        Because we cannot state one safely. {ATPL_HOURS_GUIDANCE}
      </p>
      <p>
        That is not evasion &mdash; it is the reason pages that do quote an ATPL hours figure should
        be treated carefully. Two amendments have moved that table since it was last widely copied,
        and a stale figure in a career plan is worse than no figure. Read the currently notified
        Schedule, or ask DGCA.
      </p>
      <p>
        The same applies to instructor-rating thresholds, which vary between sources by a wide margin
        with no primary source behind any of them. Our{' '}
        <Link href="/blogs/flying-instructor-rating-for-pilots-in-india" className={A}>Flying
        Instructor Rating guide</Link> withholds them for exactly that reason and tells you to get the
        current requirement from an approved organisation in writing.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />

      <h2 className={H2}>Where this sits in the bigger picture</h2>
      <p>
        Before any of this: {LICENCES.map((l) => `${l.code} from age ${l.minAge}`).join(', ')}, and a
        Commercial Pilot Licence from {MIN_AGE.CPL}. How the {CPL_HOURS.total} hours themselves are
        built &mdash; and why the named components sit inside that total rather than on top of it
        &mdash; is on <Link href="/cpl-flight-training" className={A}>our CPL flight training
        page</Link>. What the career pays, and what is and is not published about it, is on{' '}
        <Link href="/commercial-pilot-license-salary" className={A}>the salary page</Link>.
      </p>
    </BlogPostLayout>
  );
}
