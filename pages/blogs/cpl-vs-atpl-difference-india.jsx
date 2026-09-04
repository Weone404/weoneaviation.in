import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { LICENCES, MIN_AGE, CPL_HOURS, EDUCATION, MEDICAL, ATPL_HOURS_GUIDANCE, ACADEMY } from '../../lib/facts';

/*
 * "PPL vs CPL" is already owned by what-is-pilot-training-complete-guide.jsx.
 * "CPL vs ATPL" is a distinct search intent — mainly students and fresh CPL
 * holders confused about whether an airline job requires ATPL up front — and
 * no page on the site owns it as a dedicated comparison. courses/atpl.jsx
 * covers ATPL alone; this post is the head-to-head.
 *
 * No ATPL hours figure is stated, matching courses/atpl.jsx and
 * lib/facts.js's ATPL_HOURS_GUIDANCE: Section M was amended twice (2020,
 * 2023) and any older number is unreliable. Cost is not restated here either
 * — it links to /cost-transparency and /courses/atpl, the pages that
 * maintain those figures, rather than duplicating a number that could drift.
 *
 * FAQPage schema is inlined here, not via data/pageFaqs.js, which this post
 * is not permitted to edit. No HowTo, no BreadcrumbList (Layout emits it).
 */
const DATE_PUBLISHED = '2026-09-04';
const DATE_MODIFIED = '2026-09-04';
const CANONICAL = 'https://weoneaviation.in/blogs/cpl-vs-atpl-difference-india';

const CPL = LICENCES.find((l) => l.code === 'CPL');
const ATPL = LICENCES.find((l) => l.code === 'ATPL');

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: "CPL vs ATPL: What's the Difference and Which Licence Do You Need?",
  description:
    'How a Commercial Pilot Licence and an Airline Transport Pilot Licence differ under DGCA rules — minimum age, prerequisites, what each licence actually permits, and why almost every pilot holds both in sequence rather than choosing one.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot licence guide',
  keywords: 'CPL vs ATPL, difference between CPL and ATPL, ATPL vs CPL India, commercial pilot licence vs airline transport pilot licence, do I need ATPL for airline job',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const peopleAlsoAsk = [
  {
    q: 'Can I get an airline job with only a CPL?',
    a: 'Yes. A CPL is what qualifies you to be paid to fly, and it is the licence most pilots hold when an airline first hires them, usually as a First Officer under that operator\'s own training and type rating process. An ATPL is not a hiring prerequisite — it becomes relevant later, when you are eligible to act as pilot-in-command.',
  },
  {
    q: 'Is the ATPL exam harder than the CPL exam?',
    a: 'The subject matter is more advanced — long-range navigation, jet meteorology and transport-category performance replace the CPL syllabus\'s lighter-aircraft equivalents — but most candidates sit ATPL theory after they already hold a CPL and are flying the line, so the papers are usually tackled with real operational experience behind them rather than cold.',
  },
  {
    q: 'Can I go straight for an ATPL and skip the CPL?',
    a: `No. Aircraft Rules, 1937, Schedule II sets ${ATPL.section} at a minimum age of ${MIN_AGE.ATPL} and assumes a candidate is already building command experience — which in practice means already holding a CPL. There is no direct route to an ATPL that bypasses it.`,
  },
  {
    q: 'Does an ATPL guarantee a captain position?',
    a: 'No. The licence is a regulatory requirement for command, not an appointment to it. Airlines set their own upgrade criteria on top of the DGCA minimum — fleet size, seniority and route structure all move that bar, and holding an ATPL only means you are eligible to be considered.',
  },
  {
    q: 'Do CPL and ATPL require separate DGCA medicals?',
    a: `Both licences require ${MEDICAL.short} to be current, under the same medical-fitness framework. There is no separate ATPL-specific medical category defined in the Rules; what changes between the two licences is the age and experience requirement, not the medical standard.`,
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
  { lead: 'For the full licence ladder from SPL through to ATPL, and how PPL and CPL differ, read', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'A type rating sits on top of either licence and is aircraft-specific — the full process is on', anchor: 'our type rating guide', href: '/blogs/type-rating-for-pilots-in-india' },
  { lead: 'For the roadmap from Class 12 to a first airline seat, see', anchor: 'our airline pilot career guide', href: '/blogs/how-to-become-an-airline-pilot-in-india' },
  { lead: 'CPL eligibility, ground subjects and the six-month syllabus are on', anchor: 'the CPL course page', href: '/courses/cpl' },
  { lead: 'ATPL prerequisites, ground subjects and where it sits after a CPL are on', anchor: 'the ATPL course page', href: '/courses/atpl' },
];

const tocHeadings = [
  { id: 'what-is-cpl', title: 'What is a CPL?' },
  { id: 'what-is-atpl', title: 'What is an ATPL?' },
  { id: 'comparison', title: 'CPL vs ATPL at a glance' },
  { id: 'permits', title: 'What each licence actually lets you do' },
  { id: 'sequence', title: 'Why you cannot skip straight to ATPL' },
  { id: 'shared', title: 'What CPL and ATPL have in common' },
  { id: 'misconceptions', title: 'Common misconceptions' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const comparisonRows = [
  { field: 'Full name', cpl: CPL.name, atpl: ATPL.name },
  { field: 'Minimum age', cpl: `${MIN_AGE.CPL} years`, atpl: `${MIN_AGE.ATPL} years` },
  { field: 'Governing section', cpl: `Aircraft Rules, 1937, Schedule II, ${CPL.section}`, atpl: `Aircraft Rules, 1937, Schedule II, ${ATPL.section}` },
  { field: 'Typical prerequisite', cpl: `${EDUCATION.requirement}, plus SPL/PPL flying`, atpl: 'A current CPL and command experience toward the Section M table' },
  { field: 'Flying experience', cpl: `${CPL_HOURS.total} hours total, within ${CPL_HOURS.recencyYears} years of applying`, atpl: 'Set by Schedule II, Section M — amended twice since 2018; confirm the current table' },
  { field: 'What it permits', cpl: CPL.permits, atpl: ATPL.permits },
  { field: 'When most pilots hold it', cpl: 'First, straight after ground school and flight training', atpl: 'Later, usually while already flying the line as a First Officer' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function CplVsAtplDifferenceIndia() {
  return (
    <BlogPostLayout
      title="CPL vs ATPL: What's the Difference and Which Licence Do You Need?"
      description="How a Commercial Pilot Licence and an Airline Transport Pilot Licence differ under DGCA rules — age, prerequisites, what each one permits, and why pilots hold both in sequence."
      schema={[articleSchema, faqSchema]}
      heading="CPL vs ATPL: What's the Difference and Which Licence Do You Need?"
      category="Pilot licence guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'What is the difference between a CPL and an ATPL?',
        answer: `A Commercial Pilot Licence (minimum age ${MIN_AGE.CPL}) is what qualifies you to be paid to fly and is the licence almost every airline pilot starts with. An Airline Transport Pilot Licence (minimum age ${MIN_AGE.ATPL}) is required to act as pilot-in-command of a commercial aeroplane. You cannot go straight to an ATPL — it sits after a CPL and the command experience built while holding one.`,
      }}
      summaryTitle="CPL vs ATPL, in one view"
      summaryItems={[
        `CPL: minimum age ${MIN_AGE.CPL}, ${CPL.section} — qualifies you to fly for payment`,
        `ATPL: minimum age ${MIN_AGE.ATPL}, ${ATPL.section} — required to act as pilot-in-command`,
        'An ATPL is not a hiring requirement — most pilots are hired as First Officers on a CPL alone',
        `CPL flying experience: ${CPL_HOURS.total} hours total, within ${CPL_HOURS.recencyYears} years of applying`,
        'ATPL experience figures were amended twice (2020, 2023) — confirm the current Section M table rather than trusting an older number',
        'Both licences require a current DGCA medical certificate under the same fitness framework',
        'Neither licence guarantees a job or a command seat — airlines run their own hiring and upgrade criteria on top of the DGCA minimum',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/cpl-vs-atpl/hero-two-cockpit-seats.webp"
        width={1200}
        height={630}
        alt="A single path forking into two, one ending at a small single-engine training aircraft and the other continuing further to a larger commercial aeroplane cockpit"
        promptId="38"
      />

      <h2 id="what-is-cpl" className={H2}>What is a CPL?</h2>
      <p>
        A {CPL.name} is the licence that qualifies a pilot to be paid to fly. It is issued under{' '}
        {CPL.section} of Schedule II to the Aircraft Rules, 1937, at a minimum age of {MIN_AGE.CPL},
        and it requires {CPL_HOURS.total} hours of flight time within the {CPL_HOURS.recencyYears}{' '}
        years before you apply. For almost every Indian pilot, it is the first professional licence
        they hold, and the one an airline actually looks at when it hires a fresh candidate.
      </p>
      <p>
        A CPL does not, by itself, make you employable on every aircraft. It is the base licence a
        First Officer holds; the specific aircraft, the multi-crew procedures and the command
        authority to act without supervision are layered on separately, by the operator and, later,
        by an ATPL.
      </p>

      <h2 id="what-is-atpl" className={H2}>What is an ATPL?</h2>
      <p>
        An {ATPL.name} is the licence required to act as pilot-in-command of a commercial aeroplane.
        It is issued under {ATPL.section} of the same Schedule, at a minimum age of {MIN_AGE.ATPL}, and
        it assumes the holder already has a CPL and has been accumulating command experience toward
        it. {ATPL_HOURS_GUIDANCE}
      </p>
      <p>
        In practice, an ATPL is not a first licence at all. It is the credential that turns a First
        Officer into someone eligible for the left seat, and pilots typically clear its written papers
        while already flying the line, rather than before starting a career.
      </p>

      <h2 id="comparison" className={H2}>CPL vs ATPL at a glance</h2>
      <p>
        The two licences sit on the same ladder rather than as alternatives — but the table below is
        the fastest way to see exactly where they diverge.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Comparison of CPL and ATPL requirements and privileges</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Field</th>
              <th scope="col" className={TH}>CPL</th>
              <th scope="col" className={TH}>ATPL</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((r, i) => (
              <tr key={r.field} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.field}</td>
                <td className={TD}>{r.cpl}</td>
                <td className={TD}>{r.atpl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/cpl-vs-atpl/cpl-to-atpl-progression.webp"
        width={1200}
        height={800}
        alt="A three-stage horizontal flow from a commercial pilot licence being issued, through years of logged command experience as a First Officer, to an airline transport pilot licence"
        promptId="39"
      />

      <h2 id="permits" className={H2}>What each licence actually lets you do</h2>
      <p>
        This is the distinction most confusion comes from. A CPL permits {CPL.permits.toLowerCase()}{' '}
        An ATPL permits {ATPL.permits.toLowerCase()}
      </p>
      <p>
        Read those two sentences again, because the difference is not &ldquo;bigger aircraft&rdquo; or
        &ldquo;better licence&rdquo; — it is specifically about command. A CPL holder can be a paid
        crew member on a commercial aeroplane, including a large airliner, provided the operator has
        trained and rostered them for that role. What a CPL alone does not give you is the authority to
        act as the pilot-in-command of that flight. That authority is what an ATPL adds.
      </p>

      <h2 id="sequence" className={H2}>Why you cannot skip straight to an ATPL</h2>
      <p>
        {ATPL.section} sets the minimum age for ATPL issue at {MIN_AGE.ATPL}, three years above the
        CPL minimum of {MIN_AGE.CPL}. That gap is not incidental — the section is written around a
        candidate who is already exercising CPL privileges and logging the command experience the
        ATPL experience table requires. There is no route into the Rules that lets someone apply for
        an ATPL without first holding a CPL and building time on it.
      </p>
      <p>
        In practice this means the two licences are stages, not choices. A student does not decide
        between CPL and ATPL training the way they might choose between two flying schools — they
        train for a CPL first, fly on it, and apply for an ATPL once age and experience allow.
      </p>

      <h2 id="shared" className={H2}>What CPL and ATPL have in common</h2>
      <p>
        Both licences sit inside the same regulatory framework and share more than the comparison
        table above might suggest.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>
          Both require {MEDICAL.long} to be current at the time of application, under{' '}
          {MEDICAL.clause}. Neither Schedule II section defines a separate medical category for one
          licence versus the other.
        </li>
        <li>
          Both assume the same educational starting point — {EDUCATION.requirement} — since the ATPL
          candidate has already cleared that bar to hold the CPL in the first place.
        </li>
        <li>
          Neither licence is issued by, or through, a ground school. DGCA issues both after its own
          examinations and experience checks; a training provider prepares candidates for the written
          papers and, for the flying, works through partner flying schools.
        </li>
        <li>
          Neither is a guarantee of employment or command. Airlines run their own selection process on
          top of whichever licence a candidate holds.
        </li>
      </ul>

      <h2 id="misconceptions" className={H2}>Common misconceptions</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>
          <strong>&ldquo;I need an ATPL to get hired by an airline.&rdquo;</strong> Most direct-entry
          First Officer roles are filled with CPL holders. An ATPL becomes relevant later, at the
          command-eligibility stage, not at the hiring stage.
        </li>
        <li>
          <strong>&ldquo;ATPL is just a harder version of the CPL exam.&rdquo;</strong> The subjects
          differ in scope — long-range navigation, jet meteorology and transport-category performance
          replace their lighter CPL equivalents — but ATPL theory is usually approached with real line
          experience already behind the candidate, which changes how it is studied.
        </li>
        <li>
          <strong>&ldquo;Getting an ATPL makes me a captain.&rdquo;</strong> It makes you eligible to
          be considered for command. The operator&rsquo;s own upgrade criteria — fleet size, seniority,
          route structure — decide who actually moves into the left seat and when.
        </li>
        <li>
          <strong>&ldquo;The flying hours requirement is the same for both.&rdquo;</strong> It is not.
          The CPL figure is fixed at {CPL_HOURS.total} hours under {CPL_HOURS.clause}. The ATPL
          experience table in Section M has been amended twice since 2018, so any number quoted for it
          from an older source may already be wrong.
        </li>
      </ul>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}, and that
        includes preparation for both the CPL papers and, later in a pilot&rsquo;s career, ATPL theory.
        Most students we see are working out where they stand on the CPL side of this comparison —
        whether their education route, medical and timeline line up — and that is exactly the
        conversation worth having before enrolling anywhere.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
