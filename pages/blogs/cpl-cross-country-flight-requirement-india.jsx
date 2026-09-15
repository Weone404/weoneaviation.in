import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { CPL_HOURS, ACADEMY } from '../../lib/facts';

/*
 * Distinct from cpl-simulator-hours-dgca-rules (which owns the instrument-time
 * simulator cap) and from the broad hour-breakdown paragraphs inside
 * what-is-pilot-training-complete-guide and commercial-pilot-training-programs
 * -complete-guide, which each mention cross-country in passing among all four
 * CPL_HOURS components. This post owns the cross-country component on its
 * own: what the 20-hour requirement is, and what the single 300 nautical mile
 * qualifying flight inside it actually has to look like.
 *
 * The 300 NM total, two-aerodrome and full-stop-landing figures come straight
 * from CPL_HOURS.components (Schedule II, Section J, para 1(e)(ii)). The
 * "first leg beyond 100 nautical miles" detail is Schedule II's own definition
 * of a cross-country flight for Sections J, K, L, M and N (Aircraft Rules,
 * 1937) — corroborated by multiple independent flying-training sources and
 * cited to the DGCA's own Aircraft Rules portal rather than restated from a
 * private blog. Anything about how a specific school times or plans the
 * flight is deliberately hedged to "confirm with your flying school," the
 * same pattern used in the instrument-rating and flying-instructor-rating
 * posts for procedural detail this repo cannot verify against a primary
 * source.
 *
 * No HowTo, no BreadcrumbList (Layout emits the breadcrumb). FAQPage schema
 * is inlined here rather than via data/pageFaqs.js, which this post is not
 * permitted to edit.
 */
const DATE_PUBLISHED = '2026-09-15';
const DATE_MODIFIED = '2026-09-15';
const CANONICAL = 'https://weoneaviation.in/blogs/cpl-cross-country-flight-requirement-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'The CPL Cross-Country Flight Requirement in India: The 300 NM Solo Flight Explained',
  description:
    'What the 20-hour cross-country PIC requirement inside a CPL actually involves, and what the single 300 nautical mile qualifying flight — two aerodromes, full-stop landings, a first leg beyond 100 NM — has to look like under Schedule II.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'CPL flying hours',
  keywords: 'CPL cross country flight India, 300 nautical mile flight DGCA, cross country PIC hours CPL, DGCA cross country requirement, qualifying cross country flight commercial pilot licence',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const crossCountryRow = CPL_HOURS.components.find((c) => c.label === 'Cross-country as PIC');

const qualifyingFlightRules = [
  { rule: 'Total distance', detail: 'Not less than 300 nautical miles across the whole flight' },
  { rule: 'First leg', detail: 'Must reach a point beyond 100 nautical miles from the departure aerodrome — Schedule II’s own definition of a cross-country flight for Sections J, K, L, M and N' },
  { rule: 'Landings', detail: 'Full-stop landings at two aerodromes other than the one you departed from' },
  { rule: 'Role flown', detail: 'Logged as pilot-in-command — in most Indian flying school syllabi at this stage, that means solo' },
  { rule: 'Where it counts', detail: `Inside the ${crossCountryRow.hours}-hour cross-country total, clause ${crossCountryRow.clause}, itself inside the ${CPL_HOURS.total}-hour CPL total` },
];

const peopleAlsoAsk = [
  {
    q: 'Does the 300 nautical mile cross-country flight have to be flown solo?',
    a: 'It has to be logged as pilot-in-command time, and at the stage of training where students fly it, that is normally solo — an instructor is not on board to log it as your PIC time otherwise. Confirm the exact arrangement your flying school follows, since syllabus sequencing (and any dual cross-country flights flown earlier for training) varies between schools even though the qualifying flight itself does not.',
  },
  {
    q: 'Can the rest of the 20 cross-country hours come from flights other than the 300 NM one?',
    a: `Yes. The 300 nautical mile flight is one qualifying flight inside the ${crossCountryRow.hours}-hour cross-country total, not the whole requirement by itself. The remaining hours are built up from other cross-country legs flown as pilot-in-command over the course of training.`,
  },
  {
    q: 'Do the two landing aerodromes need to be a fixed distance apart from each other?',
    a: 'What Schedule II fixes is the total distance of the flight and the first leg reaching beyond 100 nautical miles from your departure point — not a minimum distance between the two landing aerodromes themselves. A flying school typically plans a route where the numbers work out comfortably rather than exactly at the minimum, so an unexpected headwind does not put the flight below 300 nautical miles.',
  },
  {
    q: 'What happens if weather forces a diversion during the qualifying flight?',
    a: 'A diversion away from the planned aerodromes means the flight, as flown, may no longer meet the two-aerodrome and distance conditions the rule sets out. Whether a particular diversion still counts is a call your flying school and instructor make against the actual track flown and logged — treat an unplanned diversion as a reason to check with them before assuming the flight qualifies, rather than assuming either way.',
  },
  {
    q: 'Does the cross-country flight also count toward night flying or instrument hours?',
    a: 'Not by default. Night flying and instrument time are separate components of the 200-hour total with their own conditions, and a daytime VFR cross-country flight satisfies only the cross-country requirement unless it is specifically flown to also meet one of those other conditions.',
  },
  {
    q: 'Can I fly the qualifying cross-country flight before finishing DGCA ground school?',
    a: 'The flight itself is a flying-training milestone, not a ground-school one, so schools commonly schedule it alongside ground classes rather than after them. Sequencing is set by your flying school’s own training programme, so confirm where it sits in your syllabus rather than assuming it waits until your written papers are cleared.',
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
  { lead: 'For how the simulator cap works on the instrument-time component of the same 200 hours, read', anchor: 'our CPL simulator hours guide', href: '/blogs/cpl-simulator-hours-dgca-rules' },
  { lead: 'For the full licence ladder and how the 200-hour total fits the wider training path, see', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'For how flying schools structure the whole CPL programme around this hour count, read', anchor: 'our commercial pilot training programmes guide', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'The full CPL flying and eligibility requirements are set out on', anchor: 'the CPL course page', href: '/commercial-pilot-license' },
  { lead: 'For the DGCA ground subjects that run alongside your flying phase, see', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'answer', title: 'What is the CPL cross-country flying requirement?' },
  { id: 'definition', title: 'What counts as a "cross-country" flight under Schedule II?' },
  { id: 'qualifying-flight', title: 'The 300 NM qualifying flight, condition by condition' },
  { id: 'breakdown', title: 'Where cross-country sits inside the 200-hour total' },
  { id: 'planning', title: 'How the flight is actually planned' },
  { id: 'mistakes', title: 'Mistakes that put the flight below the minimum' },
  { id: 'after', title: 'What happens after you fly it' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const TDN = `${TD} text-right tabular-nums whitespace-nowrap`;

export default function CplCrossCountryFlightRequirementIndia() {
  return (
    <BlogPostLayout
      title="The CPL Cross-Country Flight Requirement in India: The 300 NM Solo Flight Explained"
      description="What the 20-hour cross-country PIC requirement inside a CPL involves, and what the single 300 nautical mile qualifying flight — two aerodromes, full-stop landings, a first leg beyond 100 NM — has to look like."
      schema={[articleSchema, faqSchema]}
      heading="The CPL Cross-Country Flight Requirement in India: The 300 NM Solo Flight Explained"
      category="CPL flying hours"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'What is the cross-country flight requirement for a CPL in India?',
        answer: `Inside the ${CPL_HOURS.total}-hour CPL total, ${crossCountryRow.hours} hours must be cross-country flying as pilot-in-command. One flight within those hours must cover at least 300 nautical miles, with full-stop landings at two aerodromes other than your departure point, and a first leg reaching beyond 100 nautical miles from where you took off.`,
      }}
      summaryTitle="The requirement, in one view"
      summaryItems={[
        `Cross-country as PIC: ${crossCountryRow.hours} of the ${CPL_HOURS.total} total hours, clause ${crossCountryRow.clause}`,
        'One flight inside those hours must total at least 300 nautical miles',
        'Full-stop landings are required at two aerodromes other than your departure aerodrome',
        'The first leg must reach beyond 100 nautical miles from departure — Schedule II’s own definition of "cross-country" for this Section',
        'Flown and logged as pilot-in-command, which in practice means solo at this stage of training',
        'It sits inside the 200-hour total, not on top of it — the same caution that applies to every other CPL_HOURS component',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/cpl-cross-country-flight/hero-cross-country-route.webp"
        width={1200}
        height={630}
        alt="A single-engine training aircraft in flight over open Indian countryside, with the outline of two distant airfields visible near the horizon on either side"
        promptId="50"
      />

      <h2 id="answer" className={H2}>What is the CPL cross-country flying requirement?</h2>
      <p>
        {crossCountryRow.hours} hours of cross-country flying as pilot-in-command, under clause{' '}
        {crossCountryRow.clause} of Schedule II, Section J of the Aircraft Rules, 1937. Those hours
        sit inside the {CPL_HOURS.total}-hour CPL total — they are not added on top of it, in the
        same way that the pilot-in-command, instrument and night-flying components each sit inside
        the total rather than beside it.
      </p>
      <p>
        {crossCountryRow.note}. That single flight is the part of the requirement students ask
        about most, because unlike the other {crossCountryRow.hours - 1} hours — which can be built
        up gradually over ordinary training legs — it has to be flown as one continuous flight that
        meets a specific set of conditions in a single go.
      </p>

      <h2 id="definition" className={H2}>What counts as a &quot;cross-country&quot; flight under Schedule II?</h2>
      <p>
        Schedule II defines a cross-country flight, for the purposes of Sections J, K, L, M and N, as
        a flight to a point beyond a radius of 100 nautical miles from the aerodrome of departure. It
        is this definition — not a general aviation rule of thumb — that governs how far the first
        leg of the qualifying flight has to reach before the return legs are flown.
      </p>
      <p>
        That is a stricter bar than students sometimes expect. A short hop between two nearby
        airfields, however many landings it includes, does not qualify as cross-country flying under
        this definition unless that first leg clears the 100 nautical mile radius. Read the current
        Schedule directly on{' '}
        <a
          href="https://www.dgca.gov.in/digigov-portal/?dynamicPage=aircraftRules1937%2F1%2F0%2FviewDynamicRulesReq"
          target="_blank"
          rel="noopener noreferrer"
          className="text-av-orange font-semibold underline"
        >
          the DGCA&apos;s Aircraft Rules portal
        </a>{' '}
        rather than relying on a figure repeated second-hand, since a notified amendment would change
        the position stated here.
      </p>

      <h2 id="qualifying-flight" className={H2}>The 300 NM qualifying flight, condition by condition</h2>
      <p>
        Five conditions have to be true of the same flight at the same time. Missing any one of them
        means the flight does not satisfy the qualifying requirement, whatever else about it went
        well.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Conditions for the qualifying 300 nautical mile cross-country flight</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Condition</th>
              <th scope="col" className={TH}>What it requires</th>
            </tr>
          </thead>
          <tbody>
            {qualifyingFlightRules.map((r, i) => (
              <tr key={r.rule} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.rule}</td>
                <td className={TD}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/cpl-cross-country-flight/route-diagram-three-aerodromes.webp"
        width={1200}
        height={800}
        alt="A triangular flight route diagram connecting three aerodromes, with the first leg drawn noticeably longer than the other two, illustrating the shape of a qualifying 300 nautical mile cross-country flight"
        promptId="51"
      />

      <p>
        Most qualifying flights end up structured as a triangle or an out-and-back with a middle
        stop: depart, fly the long first leg past the 100 nautical mile mark to the first landing
        aerodrome, then a second leg to a different aerodrome, with the total of every leg adding to
        at least 300 nautical miles by the time you are back on the ground for good. The exact shape
        is a planning choice, not a fixed rule — what is fixed is the distance, the 100 nautical mile
        first leg, and the two-aerodrome landing condition.
      </p>

      <h2 id="breakdown" className={H2}>Where cross-country sits inside the 200-hour total</h2>
      <p>
        It helps to see this component next to the other three, because the most common error
        students make with any single row of Schedule II is treating it as an addition to the total
        rather than a slice of it.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">The four components of the 200-hour CPL flying requirement</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Component</th>
              <th scope="col" className={`${TH} text-right`}>Hours</th>
              <th scope="col" className={TH}>Clause</th>
              <th scope="col" className={TH}>Note</th>
            </tr>
          </thead>
          <tbody>
            {CPL_HOURS.components.map((c, i) => (
              <tr
                key={c.label}
                className={`${i % 2 ? 'bg-gray-50' : 'bg-white'} ${c.label === 'Cross-country as PIC' ? 'outline outline-2 outline-av-orange/40' : ''}`}
              >
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{c.label}</td>
                <td className={TDN}>{c.hours}</td>
                <td className={TD}>{c.clause}</td>
                <td className={TD}>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        {crossCountryRow.hours} hours is a modest fraction of {CPL_HOURS.total}, which is exactly why
        the single qualifying flight matters more than the raw hour count suggests — it is the one
        flight inside the whole syllabus that has to be planned as a specific event rather than
        logged incidentally during ordinary training.
      </p>

      <h2 id="planning" className={H2}>How the flight is actually planned</h2>
      <p>
        Flying schools generally plan the route with margin above the 300 nautical mile floor rather
        than exactly at it, for the same reason a budget is planned above its minimum: wind, a
        routing change around controlled or restricted airspace, or a slightly longer taxi and
        departure sequence can all eat into a distance planned too tightly. A route padded by a
        reasonable margin survives an ordinary bad-wind day without falling short.
      </p>
      <p>
        Aerodrome choice also depends on where you are training. A school based near a cluster of
        general aviation aerodromes has more route options within a comfortable day&apos;s flying
        than one training from a single base a long way from the next available airfield, and this is
        one of the practical differences worth asking about when{' '}
        <Link href="/blogs/commercial-pilot-training-programs-complete-guide" className="text-av-orange font-semibold underline">
          comparing training programmes
        </Link>
        .
      </p>

      <h2 id="mistakes" className={H2}>Mistakes that put the flight below the minimum</h2>
      <p>
        Almost every case of a flight falling short comes down to one of the same handful of causes,
        and all of them are avoidable with planning rather than luck on the day.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>Planning the route at exactly 300 nautical miles with no margin, so a headwind or a
          minor routing change on the day takes the actual flight below the minimum.</li>
        <li>Choosing a first leg that is close to the 100 nautical mile line rather than clearly
          past it, leaving no room for a navigational correction that shortens the leg as flown.</li>
        <li>Landing at only one aerodrome other than the departure point instead of two, usually
          because a return leg skips the planned intermediate stop.</li>
        <li>Treating the flight as one that can be flown dual, then discovering it needs to be
          logged as pilot-in-command time to satisfy the clause.</li>
        <li>Not confirming the diversion procedure with an instructor in advance, so an
          unplanned weather diversion turns into an argument about whether the flight still counts
          rather than a straightforward instructor decision made on the day.</li>
      </ul>

      <h2 id="after" className={H2}>What happens after you fly it</h2>
      <p>
        Once flown and correctly logged, the qualifying flight is recorded in your logbook against
        clause {crossCountryRow.clause} the same way any other cross-country leg is, and it counts
        toward the {crossCountryRow.hours}-hour total alongside your other cross-country PIC time.
        There is no separate certificate or endorsement for it beyond the logbook entry itself and
        your instructor&apos;s sign-off — it is one line item inside the same {CPL_HOURS.total}-hour
        record that eventually supports your CPL application.
      </p>
      <p>
        From there, training continues toward the rest of the {CPL_HOURS.total} hours: the
        pilot-in-command time, the instrument time (with its own simulator cap, covered in{' '}
        <Link href="/blogs/cpl-simulator-hours-dgca-rules" className="text-av-orange font-semibold underline">
          our simulator hours guide
        </Link>
        ), and the night flying component. None of those depend on the cross-country flight having
        been flown first, so schools sequence it wherever it fits their own syllabus and aircraft
        availability.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}, and
        questions about how the flying-hour requirements fit together — cross-country, instrument
        time, night flying, and the ground syllabus running alongside them — come up constantly from
        students planning their timeline before they commit to a flying school.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
