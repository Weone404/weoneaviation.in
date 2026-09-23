import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { CPL_HOURS, ACADEMY } from '../../lib/facts';

/*
 * Fourth post in the CPL_HOURS component series, alongside
 * cpl-cross-country-flight-requirement-india (the 20-hour cross-country
 * component), cpl-night-flying-hours-requirement-india (the 5-hour night
 * component) and cpl-simulator-hours-dgca-rules (the simulator cap inside the
 * 10-hour instrument component). This one owns the largest and, until now,
 * untouched component: the 100-hour pilot-in-command requirement and its
 * 15-hour-in-six-months recency condition.
 *
 * All hour, clause and recency figures come straight from CPL_HOURS in
 * lib/facts.js (Schedule II, Section J, para 1(e)(i) of the Aircraft Rules,
 * 1937). The observation that cross-country and night hours (both required
 * "as pilot-in-command" per their own CPL_HOURS notes) necessarily count
 * toward the 100-hour PIC pool is arithmetic from the components' own labels
 * and notes, not a claim sourced beyond them — stated as such in the text.
 *
 * No HowTo, no BreadcrumbList (Layout emits the breadcrumb). FAQPage schema
 * is inlined here rather than via data/pageFaqs.js, which this post is not
 * permitted to edit.
 */
const DATE_PUBLISHED = '2026-09-23';
const DATE_MODIFIED = '2026-09-23';
const CANONICAL = 'https://weoneaviation.in/blogs/cpl-pilot-in-command-hours-requirement-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Pilot-in-Command Hours for a CPL in India: The 100-Hour Requirement Explained',
  description:
    'What the 100-hour pilot-in-command requirement inside a CPL actually involves: how PIC time differs from dual instruction, the 15-hour recency condition in the six months before applying, and how cross-country and night hours feed into the same total.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'CPL flying hours',
  keywords: 'CPL pilot in command hours India, 100 hour PIC requirement DGCA, PIC recency rule CPL, pilot in command vs dual hours, Schedule II pilot in command',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const picRow = CPL_HOURS.components.find((c) => c.label === 'Pilot-in-command');
const crossCountryRow = CPL_HOURS.components.find((c) => c.label === 'Cross-country as PIC');
const nightRow = CPL_HOURS.components.find((c) => c.label === 'Night flying');

const picConditionRows = [
  { rule: 'Hours required', detail: `${picRow.hours} hours logged as pilot-in-command, clause ${picRow.clause}` },
  { rule: 'Recency sub-condition', detail: `Not less than 15 of those ${picRow.hours} hours flown in the six months before applying` },
  { rule: 'General recency', detail: `The whole ${CPL_HOURS.total}-hour total, PIC hours included, must be flown within ${CPL_HOURS.recencyYears} years of applying` },
  { rule: 'Where it counts', detail: `Inside the ${CPL_HOURS.total}-hour CPL total, not in addition to it` },
];

const peopleAlsoAsk = [
  {
    q: 'What is the difference between pilot-in-command hours and total flight hours?',
    a: `Total flight hours include every hour logged in the aircraft, whether flown solo or with an instructor giving dual instruction. Pilot-in-command hours count only the time a student is the one responsible for the flight — typically solo, once an instructor has cleared them for it. A CPL needs ${picRow.hours} hours specifically as pilot-in-command inside the ${CPL_HOURS.total}-hour total; the remaining hours can include dual instruction time.`,
  },
  {
    q: 'Does the 15-hour recency rule apply to the whole 200 hours, or only to PIC time?',
    a: `It attaches specifically to the pilot-in-command component. ${picRow.note}, under clause ${picRow.clause}. That sits alongside, and is tighter than, the separate rule that the entire ${CPL_HOURS.total}-hour total must be flown within ${CPL_HOURS.recencyYears} years of applying — the 15-hour condition exists because DGCA wants recent solo-in-command experience close to the application date, not just recent flying of any kind.`,
  },
  {
    q: 'Do cross-country and night hours count separately from the 100-hour PIC requirement?',
    a: `No, and this is where students most often miscalculate their own progress. Both the ${crossCountryRow.hours}-hour cross-country component and the ${nightRow.hours}-hour night flying component are defined in Schedule II as hours flown "as pilot-in-command." Any hour that satisfies one of those components is, by the same logging, a pilot-in-command hour — so it counts toward the ${picRow.hours}-hour PIC total too, rather than sitting in a separate, unrelated pool.`,
  },
  {
    q: 'Can dual instruction hours ever be logged as pilot-in-command time?',
    a: 'No. Pilot-in-command time is logged only when the pilot flying is the one legally responsible for the flight, which for a student typically means flying solo once an instructor has authorised it. Time flown with an instructor giving active instruction is dual time, and it counts toward the 200-hour total but not toward the 100-hour pilot-in-command component.',
  },
  {
    q: 'What happens if I reach 200 total hours but have not logged 100 as pilot-in-command?',
    a: `The ${CPL_HOURS.total}-hour total alone does not satisfy Schedule II. Each component — pilot-in-command, cross-country, instrument time and night flying — has to independently meet its own minimum, so a student short on solo pilot-in-command time needs additional solo hours specifically, regardless of how many total hours are already logged.`,
  },
  {
    q: 'How do flying schools structure the hour-building phase for pilot-in-command time?',
    a: 'Most schools sequence training so dual instruction builds the skills needed for solo flying early, then release students to solo circuits and solo cross-country legs progressively as confidence and competence are demonstrated. This is also why the 15-hour recency condition rarely causes problems in practice — students finishing their syllabus are usually flying solo regularly in the weeks before their CPL application, which is exactly the window the rule targets.',
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
  { lead: 'For the cross-country component that also counts toward this PIC total, read', anchor: 'our CPL cross-country flight requirement guide', href: '/blogs/cpl-cross-country-flight-requirement-india' },
  { lead: 'For the night flying component and its own PIC condition, see', anchor: 'our CPL night flying hours guide', href: '/blogs/cpl-night-flying-hours-requirement-india' },
  { lead: 'For how the simulator cap works on the instrument-time component of the same 200 hours, read', anchor: 'our CPL simulator hours guide', href: '/blogs/cpl-simulator-hours-dgca-rules' },
  { lead: 'For the full licence ladder and how the 200-hour total fits the wider training path, see', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'The full CPL flying and eligibility requirements are set out on', anchor: 'the CPL course page', href: '/commercial-pilot-license' },
];

const tocHeadings = [
  { id: 'answer', title: 'What is the pilot-in-command requirement for a CPL?' },
  { id: 'breakdown', title: 'Where PIC time sits inside the 200-hour total' },
  { id: 'what-counts', title: 'What counts as pilot-in-command time?' },
  { id: 'recency', title: 'The 15-hour recency condition' },
  { id: 'overlap', title: 'How cross-country and night hours feed the same total' },
  { id: 'building', title: 'How flying schools structure hour-building' },
  { id: 'mistakes', title: 'Mistakes that delay the PIC requirement' },
  { id: 'after', title: 'What happens after you complete it' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const TDN = `${TD} text-right tabular-nums whitespace-nowrap`;

export default function CplPilotInCommandHoursRequirementIndia() {
  return (
    <BlogPostLayout
      title="Pilot-in-Command Hours for a CPL in India: The 100-Hour Requirement Explained"
      description="What the 100-hour pilot-in-command requirement inside a CPL involves: how PIC time differs from dual instruction, the 15-hour recency condition, and how cross-country and night hours feed into the same total."
      schema={[articleSchema, faqSchema]}
      heading="Pilot-in-Command Hours for a CPL in India: The 100-Hour Requirement Explained"
      category="CPL flying hours"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'What is the pilot-in-command requirement for a CPL in India?',
        answer: `A Commercial Pilot Licence in India requires ${picRow.hours} of the ${CPL_HOURS.total} total flying hours to be logged as pilot-in-command, under Schedule II, Section J of the Aircraft Rules, 1937. At least 15 of those ${picRow.hours} hours must be flown in the six months immediately before applying — a tighter, separate recency condition than the ${CPL_HOURS.recencyYears}-year window covering the full total.`,
      }}
      summaryTitle="The requirement, in one view"
      summaryItems={[
        `Pilot-in-command: ${picRow.hours} of the ${CPL_HOURS.total} total hours, clause ${picRow.clause}`,
        'At least 15 of those hours must be flown in the six months before applying',
        'Cross-country and night hours are both flown "as PIC," so they count toward this 100-hour total too — not a separate pool',
        'Dual instruction time counts toward the 200-hour total but never toward the PIC component',
        'It sits inside the 200-hour total, not on top of it — the same caution that applies to every CPL_HOURS component',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/cpl-pilot-in-command-hours/hero-solo-cockpit.webp"
        width={1200}
        height={630}
        alt="A student pilot alone in the cockpit of a small single-engine training aircraft on the ground, canopy open, with no instructor visible in the second seat, representing solo pilot-in-command flying time"
        promptId="64"
      />

      <h2 id="answer" className={H2}>What is the pilot-in-command requirement for a CPL?</h2>
      <p>
        {picRow.hours} hours of flying logged as pilot-in-command, under clause {picRow.clause} of
        Schedule II, Section J of the Aircraft Rules, 1937. Those hours sit inside the{' '}
        {CPL_HOURS.total}-hour CPL total &mdash; they are not added on top of it, the same way the
        cross-country, instrument-time and night-flying components each sit inside the total rather
        than beside it.
      </p>
      <p>
        {picRow.note}. It is by far the largest single component of the four Schedule II sets out,
        which makes sense once you see what it is actually measuring: not how many hours a student has
        sat in an aircraft, but how many hours they have spent solely responsible for one.
      </p>

      <h2 id="breakdown" className={H2}>Where PIC time sits inside the 200-hour total</h2>
      <p>
        Seeing this component next to the other three makes its size obvious &mdash; and makes clear
        why treating any single row as an addition to the total, rather than a slice of it, is the
        most common way students miscount their own progress.
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
                className={`${i % 2 ? 'bg-gray-50' : 'bg-white'} ${c.label === 'Pilot-in-command' ? 'outline outline-2 outline-av-orange/40' : ''}`}
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
        At {picRow.hours} of {CPL_HOURS.total} hours, pilot-in-command time is half the total on its
        own &mdash; the other {CPL_HOURS.total - picRow.hours} hours cover dual instruction, additional
        solo practice beyond the minimum, and the instrument-time component, which is not itself
        required to be flown as PIC.
      </p>

      <h2 id="what-counts" className={H2}>What counts as pilot-in-command time?</h2>
      <p>
        Pilot-in-command time is logged only for the portion of a flight where the pilot flying is the
        one legally responsible for it &mdash; for a student, that means flying solo, once an
        instructor has authorised them to do so for that stage of training. Time flown with an
        instructor actively giving dual instruction is real, necessary flying time, and it counts
        toward the {CPL_HOURS.total}-hour total, but it does not count toward the {picRow.hours}-hour
        PIC component. The two are tracked as separate columns in a training logbook for exactly this
        reason.
      </p>
      <p>
        This is why early training is dual-heavy and later training is solo-heavy: a student cannot
        log pilot-in-command time before an instructor judges them ready to be solely responsible for
        the aircraft, so the {picRow.hours}-hour requirement is necessarily built up in the second half
        of a syllabus rather than the first.
      </p>

      <h2 id="recency" className={H2}>The 15-hour recency condition</h2>
      <p>
        A separate condition attaches to the PIC component on top of the {picRow.hours}-hour minimum:
        not less than 15 of those hours must be flown in the six months immediately before the CPL
        application. This is tighter than, and distinct from, the general rule that the whole{' '}
        {CPL_HOURS.total}-hour total has to be flown within {CPL_HOURS.recencyYears} years of applying.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Recency conditions attached to the pilot-in-command component</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Condition</th>
              <th scope="col" className={TH}>What it requires</th>
            </tr>
          </thead>
          <tbody>
            {picConditionRows.map((r, i) => (
              <tr key={r.rule} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.rule}</td>
                <td className={TD}>{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        In practice the two rules rarely conflict. A student finishing a continuous training
        programme is normally flying solo through the final months of their syllabus anyway, which
        satisfies the 15-hour window without any special planning. The condition matters more for a
        student whose training has had a long gap &mdash; a break for the DGCA written papers, a
        family emergency, or a stretch of bad weather &mdash; where the last logged solo hour may fall
        outside the six-month window by the time they are ready to apply.
      </p>

      <BlogImagePlaceholder
        src="/blog/cpl-pilot-in-command-hours/six-month-window.webp"
        width={1200}
        height={800}
        alt="A simple horizontal timeline with a shaded final segment representing the six months before a CPL application date, with a cluster of small aircraft marks placed inside the shaded segment"
        promptId="65"
      />

      <h2 id="overlap" className={H2}>How cross-country and night hours feed the same total</h2>
      <p>
        Look again at the table above and a pattern emerges: the cross-country component is defined as
        &quot;cross-country <em>as PIC</em>,&quot; and the night flying component requires its take-offs
        and landings to be logged &quot;as pilot-in-command.&quot; Any hour that satisfies either of
        those components is, by definition, also a pilot-in-command hour &mdash; so it counts toward
        the {picRow.hours}-hour PIC total at the same time it counts toward its own component. This
        follows directly from how the two components are defined in Schedule II; it is not a separate
        rule on top of them.
      </p>
      <p>
        Practically, this means a student does not need to find {picRow.hours} PIC hours, then a
        further {crossCountryRow.hours} cross-country hours, then a further {nightRow.hours} night
        hours as though they were three unrelated pools. The {crossCountryRow.hours} hours of
        cross-country flying and the {nightRow.hours} hours of night flying are themselves part of the
        {' '}{picRow.hours}-hour PIC pool, not additional demands on top of it. What remains is the
        balance of solo hours &mdash; ordinary local flying, circuits and practice areas &mdash; needed
        to reach {picRow.hours} once the cross-country and night components are accounted for.
      </p>

      <h2 id="building" className={H2}>How flying schools structure hour-building</h2>
      <p>
        Most syllabi are sequenced so that dual instruction in the early stages builds the judgment and
        handling skills an instructor needs to see before signing a student off to fly solo. Once
        cleared, solo hours accumulate through local circuits, solo cross-country legs and, later, the
        specific night flying sessions &mdash; each one simultaneously chipping away at its own
        component and at the {picRow.hours}-hour PIC total.
      </p>
      <p>
        Aircraft and instructor availability shape how quickly this phase moves as much as student
        readiness does, which is one of the practical differences worth asking about when{' '}
        <Link href="/blogs/commercial-pilot-training-programs-complete-guide" className="text-av-orange font-semibold underline">
          comparing training programmes
        </Link>
        . A school that releases students to solo flying in a timely, well-supervised way tends to move
        through this component faster than one where solo slots are scarce.
      </p>

      <h2 id="mistakes" className={H2}>Mistakes that delay the PIC requirement</h2>
      <p>
        Most delays here come from misunderstanding how the components relate to each other, not from
        a shortage of flying time.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>Assuming the {picRow.hours}-hour PIC requirement, the {crossCountryRow.hours}-hour
          cross-country requirement and the {nightRow.hours}-hour night requirement are three separate
          pools that need to be built up independently, rather than overlapping ones.</li>
        <li>Logging hours flown with an instructor as pilot-in-command time by mistake, then
          discovering at the application stage that the total does not hold up against the logbook.</li>
        <li>Letting a long gap in training &mdash; for exams, weather or personal reasons &mdash; push
          the most recent solo hour outside the six-month window before applying.</li>
        <li>Treating {picRow.hours} hours as a target to just clear rather than a minimum, leaving no
          margin if a flight is later found not to qualify on review.</li>
        <li>Not confirming with an instructor, in writing in the logbook, exactly which flights were
          authorised as solo pilot-in-command time versus supervised solo practice.</li>
      </ul>

      <h2 id="after" className={H2}>What happens after you complete it</h2>
      <p>
        Once flown and correctly logged, pilot-in-command hours are recorded against clause{' '}
        {picRow.clause} the same way any other component is, and they count toward the{' '}
        {CPL_HOURS.total}-hour total alongside cross-country, instrument time and night flying. There
        is no separate certificate for the PIC component beyond the logbook record itself and an
        instructor&rsquo;s sign-off &mdash; it is the largest single line item inside the record that
        eventually supports a CPL application.
      </p>
      <p>
        From there, the remaining pieces of the {CPL_HOURS.total} hours &mdash; the cross-country
        flight (covered in{' '}
        <Link href="/blogs/cpl-cross-country-flight-requirement-india" className="text-av-orange font-semibold underline">
          our cross-country flight requirement guide
        </Link>
        ), night flying (covered in{' '}
        <Link href="/blogs/cpl-night-flying-hours-requirement-india" className="text-av-orange font-semibold underline">
          our night flying hours guide
        </Link>
        ) and instrument time with its own simulator cap &mdash; are built up alongside the PIC total
        rather than after it, since most of those hours count toward more than one component at once.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}, and questions
        about how the flying-hour components fit together &mdash; pilot-in-command, cross-country,
        night flying, instrument time, and the ground syllabus running alongside them &mdash; come up
        constantly from students planning their timeline before they commit to a flying school.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
