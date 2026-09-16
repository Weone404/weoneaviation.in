import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { CPL_HOURS, ACADEMY } from '../../lib/facts';

/*
 * Third post in the CPL_HOURS component series, alongside
 * cpl-cross-country-flight-requirement-india (the 20-hour cross-country
 * component) and cpl-simulator-hours-dgca-rules (the simulator cap inside the
 * 10-hour instrument component). This one owns the 5-hour night flying
 * component and its 10-takeoff/10-landing condition — untouched by either
 * sibling post, and not covered anywhere else in pages/ or pages/blogs/.
 *
 * All hour, clause and recency figures come straight from CPL_HOURS in
 * lib/facts.js (Schedule II, Section J, para 1(e)(iv) of the Aircraft Rules,
 * 1937). The precise civil-twilight definition of "night" used for logging
 * purposes could not be confirmed against a primary source in this session
 * (indiankanoon.org and civilaviation.gov.in were unreachable), so this post
 * deliberately does not state one — it points to the DGCA's own Aircraft
 * Rules portal instead, the same hedge cpl-cross-country-flight-requirement
 * -india uses for its 100 NM definition citation.
 *
 * No HowTo, no BreadcrumbList (Layout emits the breadcrumb). FAQPage schema
 * is inlined here rather than via data/pageFaqs.js, which this post is not
 * permitted to edit.
 */
const DATE_PUBLISHED = '2026-09-16';
const DATE_MODIFIED = '2026-09-16';
const CANONICAL = 'https://weoneaviation.in/blogs/cpl-night-flying-hours-requirement-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Night Flying Hours for a CPL in India: The 5-Hour Rule Explained',
  description:
    'What the 5-hour night flying requirement inside a CPL actually involves: the 10 take-offs and 10 landings condition, where it sits inside the 200-hour total, and how flying schools sequence it under Schedule II.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'CPL flying hours',
  keywords: 'CPL night flying hours India, DGCA night flying requirement, 10 takeoffs 10 landings CPL, night PIC hours commercial pilot licence, Schedule II night flying',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const nightRow = CPL_HOURS.components.find((c) => c.label === 'Night flying');

const nightConditionRows = [
  { rule: 'Hours required', detail: `${nightRow.hours} hours of night flying, clause ${nightRow.clause}` },
  { rule: 'Role flown', detail: 'Logged as pilot-in-command' },
  { rule: 'Take-offs', detail: 'At least 10, as pilot-in-command' },
  { rule: 'Landings', detail: 'At least 10, as pilot-in-command' },
  { rule: 'Where it counts', detail: `Inside the ${CPL_HOURS.total}-hour CPL total, not in addition to it` },
];

const peopleAlsoAsk = [
  {
    q: 'Do the 10 night take-offs and landings have to be flown solo?',
    a: 'They have to be logged as pilot-in-command time, which at the stage most schools schedule night training normally means solo, the same way the CPL cross-country flight is normally solo for the same reason. Confirm the exact arrangement with your flying school, since some of the surrounding night hours may be flown dual for training before the solo take-offs and landings are logged.',
  },
  {
    q: 'Can night flying hours be logged on a simulator?',
    a: `No. The only simulator allowance inside the ${CPL_HOURS.total}-hour CPL total sits in the instrument-time component, where up to 5 of the 10 hours may be flown on an approved simulator. Night flying has no such allowance in Schedule II — all ${nightRow.hours} hours, and all 10 take-offs and landings, have to be flown in an actual aircraft.`,
  },
  {
    q: 'Does night flying time also count toward the instrument-time requirement?',
    a: 'Not by default. Night flying and instrument time are separate components of the 200-hour total, each with its own clause and its own conditions. A night flight only counts toward instrument time if it is specifically flown to meet that component too, such as under instrument conditions with an instructor logging it accordingly.',
  },
  {
    q: 'Do the night hours need to be recent, like the pilot-in-command recency requirement?',
    a: `The whole ${CPL_HOURS.total}-hour total, night hours included, has to be flown within ${CPL_HOURS.recencyYears} years of your CPL application under the same recency clause that governs the total. A separate, tighter condition — 15 hours of pilot-in-command time in the six months before applying — attaches only to the pilot-in-command component, not specifically to night hours.`,
  },
  {
    q: 'What if bad weather or aircraft availability delays night training?',
    a: 'Night flying depends on clear weather after dark and an aircraft cleared for night operations, which makes it one of the more schedule-sensitive parts of the syllabus. Most flying schools batch night training into short, deliberate windows rather than spreading it thinly, precisely because a single missed slot can mean waiting for the next clear night rather than the next available daylight one.',
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
  { lead: 'For the other flight-planned component inside the same 200 hours, read', anchor: 'our CPL cross-country flight requirement guide', href: '/blogs/cpl-cross-country-flight-requirement-india' },
  { lead: 'For how the simulator cap works on the instrument-time component, see', anchor: 'our CPL simulator hours guide', href: '/blogs/cpl-simulator-hours-dgca-rules' },
  { lead: 'For the full licence ladder and how the 200-hour total fits the wider training path, read', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'The full CPL flying and eligibility requirements are set out on', anchor: 'the CPL course page', href: '/commercial-pilot-license' },
  { lead: 'For the DGCA ground subjects that run alongside your flying phase, see', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'answer', title: 'What is the night flying requirement for a CPL in India?' },
  { id: 'breakdown', title: 'Where night flying sits inside the 200-hour total' },
  { id: 'condition', title: 'The 5-hour condition, item by item' },
  { id: 'definition', title: 'What counts as "night" for logging purposes?' },
  { id: 'why', title: 'Why does a CPL require night flying experience?' },
  { id: 'planning', title: 'How flying schools structure night training' },
  { id: 'mistakes', title: 'Mistakes that delay the night flying requirement' },
  { id: 'after', title: 'What happens after you complete it' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const TDN = `${TD} text-right tabular-nums whitespace-nowrap`;

export default function CplNightFlyingHoursRequirementIndia() {
  return (
    <BlogPostLayout
      title="Night Flying Hours for a CPL in India: The 5-Hour Rule Explained"
      description="What the 5-hour night flying requirement inside a CPL involves: the 10 take-offs and 10 landings condition, where it sits inside the 200-hour total, and how flying schools sequence it."
      schema={[articleSchema, faqSchema]}
      heading="Night Flying Hours for a CPL in India: The 5-Hour Rule Explained"
      category="CPL flying hours"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'What is the night flying requirement for a CPL in India?',
        answer: `A Commercial Pilot Licence in India requires ${nightRow.hours} hours of night flying as pilot-in-command, including at least 10 take-offs and 10 landings, under Schedule II, Section J of the Aircraft Rules, 1937. These hours sit inside the ${CPL_HOURS.total}-hour CPL total, not in addition to it, alongside the pilot-in-command, cross-country and instrument-time components.`,
      }}
      summaryTitle="The requirement, in one view"
      summaryItems={[
        `Night flying: ${nightRow.hours} of the ${CPL_HOURS.total} total hours, clause ${nightRow.clause}`,
        'At least 10 take-offs and 10 landings, logged as pilot-in-command',
        'All hours and all take-offs and landings must be flown in an actual aircraft — no simulator allowance applies',
        'It sits inside the 200-hour total, not on top of it, the same caution that applies to every CPL_HOURS component',
        `The whole 200-hour total, night hours included, must be flown within ${CPL_HOURS.recencyYears} years of applying`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/cpl-night-flying-hours/hero-night-approach.webp"
        width={1200}
        height={630}
        alt="A small single-engine training aircraft on final approach to a runway lit by runway edge lights against a dark evening sky, representing night flying training for a Commercial Pilot Licence in India"
        promptId="52"
      />

      <h2 id="answer" className={H2}>What is the night flying requirement for a CPL in India?</h2>
      <p>
        {nightRow.hours} hours of night flying as pilot-in-command, under clause {nightRow.clause} of
        Schedule II, Section J of the Aircraft Rules, 1937, including at least 10 take-offs and 10
        landings. Those hours sit inside the {CPL_HOURS.total}-hour CPL total — they are not added on
        top of it, in the same way the cross-country, instrument-time and pilot-in-command components
        each sit inside the total rather than beside it.
      </p>
      <p>
        {nightRow.note}. It is the smallest of the four hour components by count, but it is also the
        one most dependent on things outside a student&rsquo;s control — clear skies after dark and an
        aircraft cleared for night operations — which is why schools plan for it early rather than
        leaving it for the end of a course.
      </p>

      <h2 id="breakdown" className={H2}>Where night flying sits inside the 200-hour total</h2>
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
                className={`${i % 2 ? 'bg-gray-50' : 'bg-white'} ${c.label === 'Night flying' ? 'outline outline-2 outline-av-orange/40' : ''}`}
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
        {nightRow.hours} hours is a small fraction of {CPL_HOURS.total}, which is exactly why the
        take-off and landing count matters more than the hour figure alone — a student could log the
        hours on longer night cross-country legs and still fall short of the requirement if the
        take-offs and landings were not built in deliberately.
      </p>

      <h2 id="condition" className={H2}>The 5-hour condition, item by item</h2>
      <p>
        Three things have to be true together: the hours, the take-offs, and the landings. Missing
        any one of them means the component is not satisfied, however many night hours are logged
        overall.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Conditions for the night flying requirement</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Condition</th>
              <th scope="col" className={TH}>What it requires</th>
            </tr>
          </thead>
          <tbody>
            {nightConditionRows.map((r, i) => (
              <tr key={r.rule} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.rule}</td>
                <td className={TD}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/cpl-night-flying-hours/circuit-ten-cycles.webp"
        width={1200}
        height={800}
        alt="A single runway viewed from above at dusk with a repeating circuit pattern of ten small aircraft silhouettes around it, each slightly further along the loop, illustrating a repeated sequence of night take-offs and landings"
        promptId="53"
      />

      <p>
        In practice, the 10 take-offs and 10 landings are usually flown as repeated circuits at the
        same aerodrome rather than spread across separate cross-country legs — it is the most direct
        way to build the count without depending on multiple clear nights at multiple airfields.
      </p>

      <h2 id="definition" className={H2}>What counts as &quot;night&quot; for logging purposes?</h2>
      <p>
        Schedule II and the wider Aircraft Rules, 1937 set the technical boundary of night for
        logging purposes, and it is not simply &quot;after sunset by eye.&quot; Rather than restate a
        specific time boundary here without a primary source in hand to verify it against the
        currently notified text, read the definition directly on{' '}
        <a
          href="https://www.dgca.gov.in/digigov-portal/?dynamicPage=aircraftRules1937%2F1%2F0%2FviewDynamicRulesReq"
          target="_blank"
          rel="noopener noreferrer"
          className="text-av-orange font-semibold underline"
        >
          the DGCA&apos;s Aircraft Rules portal
        </a>{' '}
        and confirm it with your flying school before your first night session, since a school&rsquo;s
        logbook and dispatch records need to agree with the notified definition, not with a rule of
        thumb.
      </p>
      <p>
        What matters for planning purposes is that the boundary is fixed by rule, not by convenience —
        a flight logged as night has to actually fall inside that window, which is one more reason
        schools build a margin into how they schedule these sessions rather than starting exactly at
        the edge of it.
      </p>

      <h2 id="why" className={H2}>Why does a CPL require night flying experience?</h2>
      <p>
        Because a commercial licence has to certify competence in conditions a private pilot may
        never need to fly in. Night flying changes almost everything about how a pilot perceives the
        runway environment — depth cues, horizon reference and even how quickly the eyes adapt after
        looking at a lit instrument panel all behave differently after dark, and a licence that
        permits flying for payment has to certify that a pilot has actually handled those conditions,
        not just studied them.
      </p>
      <p>
        The take-off and landing count, rather than the hour count alone, is what turns this from a
        general exposure requirement into a demonstrated skill: repeated circuits force a student to
        judge the same runway, the same lighting and the same sight picture multiple times in one
        session, which is a different kind of learning from a single long night cross-country flight.
      </p>

      <h2 id="planning" className={H2}>How flying schools structure night training</h2>
      <p>
        Night training is one of the more schedule-sensitive parts of a syllabus, so most schools
        treat it as a distinct block rather than something fitted in whenever a slot is free. A
        typical approach batches the required circuits into two or three sessions on consecutive
        clear nights, both to make efficient use of an aircraft cleared for night operations and to
        avoid the gap between sessions growing long enough that earlier training has to be partly
        repeated.
      </p>
      <p>
        Aerodrome choice matters too. A base with reliable night operating hours and approach
        lighting gives a school more usable nights across a month than one where night operations
        depend on additional coordination, and this is one of the practical differences worth asking
        about when{' '}
        <Link href="/blogs/commercial-pilot-training-programs-complete-guide" className="text-av-orange font-semibold underline">
          comparing training programmes
        </Link>
        .
      </p>

      <h2 id="mistakes" className={H2}>Mistakes that delay the night flying requirement</h2>
      <p>
        Most delays here come down to scheduling rather than skill, and they are avoidable with
        planning rather than luck on the clear night in question.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>Leaving night training until the very end of the syllabus, so a stretch of poor weather
          or aircraft unavailability sits directly on the critical path to the licence.</li>
        <li>Treating the hour figure as the whole requirement and under-planning the take-off and
          landing count, then needing an extra session purely to make up circuits.</li>
        <li>Spacing sessions too far apart, so skills built in the first session need to be partly
          relearned rather than built on in the next.</li>
        <li>Assuming any late-evening flight qualifies as night time without confirming it actually
          falls inside the notified definition your school logs against.</li>
        <li>Not confirming in advance which take-offs and landings will be logged as pilot-in-command,
          then discovering some were flown dual and do not count toward the condition.</li>
      </ul>

      <h2 id="after" className={H2}>What happens after you complete it</h2>
      <p>
        Once flown and correctly logged, the night hours and the take-off and landing count are
        recorded in your logbook against clause {nightRow.clause} the same way any other component is,
        and they count toward the {CPL_HOURS.total}-hour total alongside your pilot-in-command,
        cross-country and instrument time. There is no separate certificate for it beyond the logbook
        entry and your instructor&rsquo;s sign-off — it is one line item inside the same record that
        eventually supports your CPL application.
      </p>
      <p>
        From there, training continues toward the rest of the {CPL_HOURS.total} hours: the
        cross-country component (covered in{' '}
        <Link href="/blogs/cpl-cross-country-flight-requirement-india" className="text-av-orange font-semibold underline">
          our cross-country flight requirement guide
        </Link>
        ), and the instrument time with its own simulator cap (covered in{' '}
        <Link href="/blogs/cpl-simulator-hours-dgca-rules" className="text-av-orange font-semibold underline">
          our simulator hours guide
        </Link>
        ). None of those depend on night flying having been completed first, so schools sequence it
        wherever it fits their own syllabus, aircraft availability and the weather.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}, and questions
        about how the flying-hour requirements fit together — night flying, cross-country, instrument
        time, and the ground syllabus running alongside them — come up constantly from students
        planning their timeline before they commit to a flying school.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
