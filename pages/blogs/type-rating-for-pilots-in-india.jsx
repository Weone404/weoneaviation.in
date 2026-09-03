import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { LICENCES, MIN_AGE, CPL_HOURS, ACADEMY } from '../../lib/facts';

/*
 * Type rating is mentioned in passing on several pages (courses/atpl.jsx,
 * pilot-training-cost-in-india.jsx, how-to-become-an-airline-pilot-in-india.jsx)
 * but none of them own the search intent "what is a type rating / how do I get
 * one / what does it cost" as a dedicated page. This post fills that gap.
 *
 * No cost figure is stated as a fact. Third-party quotes for a self-sponsored
 * A320 or ATR type rating found during research disagree with each other by a
 * wide margin, and none is a primary source — per the standing rule, that
 * means the figure is left out rather than estimated. The site's own existing
 * ₹1,00,000–2,00,000 line in pilot-training-cost-in-india.jsx is not repeated
 * or contradicted here; this page is deliberately silent on a number.
 *
 * The 5,700 kg / multi-pilot / turbojet threshold and the TRTO approval regime
 * are sourced to DGCA's own CAR Section 8 Series F material and its published
 * training-organisation inventory, both linked inline. No HowTo, no
 * BreadcrumbList (Layout emits the breadcrumb). FAQPage schema is inlined here,
 * not via data/pageFaqs.js, which this post is not permitted to edit.
 */
const DATE_PUBLISHED = '2026-09-03';
const DATE_MODIFIED = '2026-09-03';
const CANONICAL = 'https://weoneaviation.in/blogs/type-rating-for-pilots-in-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Type Rating for Pilots in India: What It Is and How CPL Holders Get One',
  description:
    'What a type rating actually is, which aircraft require one under DGCA rules, the prerequisites a CPL holder needs before starting, how the TRTO process works, and self-sponsored versus airline-sponsored routes.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot career guide',
  keywords: 'type rating for pilots in india, what is a type rating, DGCA type rating requirements, A320 type rating india, self sponsored type rating, TRTO india',
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
    q: 'Can I fly for an airline without a type rating?',
    a: 'No. A type rating is a separate, aircraft-specific qualification endorsed on your licence, on top of the CPL or ATPL itself. Holding a CPL qualifies you to be paid to fly; it does not qualify you to act as a pilot on a specific multi-pilot or turbojet aircraft until that aircraft\'s type rating is endorsed.',
  },
  {
    q: 'Does a type rating expire?',
    a: 'The rating itself stays on your licence, but the privilege to exercise it lapses if you do not meet recency requirements — a Pilot Proficiency Check on that type within the period set by DGCA\'s recency rules. An expired recency means retraining before you can fly that type again, even though the rating was never removed from your licence.',
  },
  {
    q: 'Is a self-sponsored type rating a guarantee of a job?',
    a: 'No. A type rating makes you eligible to be considered for a role that needs that type; it is not a hiring guarantee. Airlines run their own selection process regardless of whether a candidate arrives already rated, and hiring volumes for any one type move in cycles.',
  },
  {
    q: 'Can I choose any aircraft type to get rated on?',
    a: 'In principle yes, subject to a DGCA-approved TRTO offering that type and you meeting its prerequisites. In practice, most self-sponsored candidates choose a type that multiple operators in India actually fly, since a rating on an aircraft no local airline operates has very limited value.',
  },
  {
    q: 'Does We One Aviation provide type rating training?',
    a: 'No. We teach the DGCA ground subjects and prepare students for the written examinations. The type rating itself is flown at a DGCA-approved Type Rating Training Organisation, and is a separate stage that sits after the CPL, arranged either by the hiring airline or by the pilot directly with the TRTO.',
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
  { lead: 'For the full roadmap from Class 12 to a licence, including where a type rating sits in the sequence, read', anchor: 'our airline pilot career guide', href: '/blogs/how-to-become-an-airline-pilot-in-india' },
  { lead: 'Every line item in a CPL budget, including where the type rating fee sits outside it, is on', anchor: 'our pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'For programme structure and what a CPL course does and does not include, see', anchor: 'our commercial pilot training programmes guide', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'The ATPL licence, its experience table and how it relates to airline command, are covered on', anchor: 'the ATPL course page', href: '/courses/atpl' },
  { lead: 'For CPL eligibility, ground subjects and the six-month syllabus, see', anchor: 'the CPL course page', href: '/commercial-pilot-license' },
];

const tocHeadings = [
  { id: 'what', title: 'What is a type rating?' },
  { id: 'which-aircraft', title: 'Which aircraft need one?' },
  { id: 'prerequisites', title: 'What you need before you start' },
  { id: 'process', title: 'How the TRTO process works' },
  { id: 'sponsored-vs-self', title: 'Airline-sponsored vs self-sponsored' },
  { id: 'cost', title: 'What does it cost?' },
  { id: 'recency', title: 'Keeping the rating current' },
  { id: 'choosing', title: 'Choosing which type to get rated on' },
  { id: 'mistakes', title: 'Mistakes that waste the investment' },
];

const prerequisites = [
  { item: 'Commercial Pilot Licence', detail: `Issued by DGCA, current and unrestricted. Minimum age for CPL issue is ${MIN_AGE.CPL} (Aircraft Rules, 1937, ${LICENCES.find((l) => l.code === 'CPL').section}).` },
  { item: 'Class 1 medical certificate', detail: 'Must be current on the day type-rating training and the skill test are conducted, not merely at CPL issue.' },
  { item: 'Multi-engine rating', detail: 'Required before a multi-engine, multi-pilot type rating, since the type rating builds on multi-engine handling rather than teaching it from scratch.' },
  { item: 'Valid Instrument Rating', detail: 'Type rating training and checking are conducted under instrument flight rules for most of the syllabus.' },
  { item: 'English language proficiency', detail: 'A current ICAO language proficiency endorsement, since checklists, callouts and ATC communication on type are conducted in English.' },
];

const processSteps = [
  { stage: 'TRTO selection and enrolment', detail: 'Confirm the organisation holds a current DGCA approval for the specific aircraft type and variant you want, not just the aircraft family.' },
  { stage: 'Ground school', detail: 'Aircraft systems, limitations, performance and normal and abnormal procedures for that specific type, examined before simulator training begins.' },
  { stage: 'Simulator training', detail: 'Full-flight simulator sessions covering normal operations, system failures and emergency procedures, built up progressively to the skill test standard.' },
  { stage: 'Skill test', detail: 'A DGCA-authorised examiner conducts the type rating skill test in the simulator; passing it is what gets the type endorsed on your licence.' },
  { stage: 'Base training or line training', detail: 'Where an operator requires it, further training on the actual aircraft or under supervision on revenue flights follows the simulator phase before you fly the type unsupervised.' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function TypeRatingForPilotsInIndia() {
  return (
    <BlogPostLayout
      title="Type Rating for Pilots in India: What It Is and How CPL Holders Get One"
      description="What a type rating is, which aircraft require one, the prerequisites a CPL holder needs, how DGCA-approved TRTO training works, and airline-sponsored versus self-sponsored routes."
      schema={[articleSchema, faqSchema]}
      heading="Type Rating for Pilots in India: What It Is and How CPL Holders Get One"
      category="Pilot career guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'What is a type rating and do I need one after my CPL?',
        answer: `A type rating is a separate, aircraft-specific qualification endorsed on your licence, required to fly a multi-pilot or turbojet aircraft, or any aeroplane above 5,700 kg. A Commercial Pilot Licence alone does not include it — you train for it at a DGCA-approved Type Rating Training Organisation, either sponsored by a hiring airline or funded yourself before applying.`,
      }}
      summaryTitle="The essentials, in one view"
      summaryItems={[
        'A type rating is aircraft-specific, not a general licence privilege — a CPL or ATPL does not include one',
        'Required for multi-pilot aeroplanes, turbojets, and any aeroplane above 5,700 kg, per DGCA\'s crew licensing and recency rules',
        `Prerequisites: a current CPL (minimum age ${MIN_AGE.CPL}), a Class 1 medical, a multi-engine rating, a valid Instrument Rating, and English language proficiency`,
        'Training runs at a DGCA-approved Type Rating Training Organisation (TRTO) — ground school, simulator, then a skill test',
        'It can be airline-sponsored as part of a hiring or cadet scheme, or self-funded ahead of applying',
        'Cost is not standardised or published by DGCA and varies widely by aircraft and TRTO — get a written, itemised quote directly rather than budgeting off a headline figure',
        'The privilege lapses without recency — a Pilot Proficiency Check within the required period keeps it usable',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/type-rating/hero-type-rating-simulator.webp"
        width={1200}
        height={630}
        alt="A pilot in the cockpit of a full-flight simulator built to resemble a specific airliner type, with an instructor seated behind"
        promptId="36"
      />

      <h2 id="what" className={H2}>What is a type rating?</h2>
      <p>
        A type rating is an endorsement on a pilot&rsquo;s licence certifying that they are qualified
        to act as a crew member on a specific aircraft type — not aircraft in general, and not even
        every variant of the same family. It sits on top of the CPL or ATPL rather than being part of
        it, and it is examined and issued separately from any DGCA written paper or the licence itself.
      </p>
      <p>
        The distinction matters because it is the single most common gap between a fresh {' '}
        {LICENCES.find((l) => l.code === 'CPL').name} holder and someone an airline can actually roster.
        The licence proves you are qualified to fly for payment in general; the type rating proves you
        are qualified to fly one particular aeroplane.
      </p>

      <h2 id="which-aircraft" className={H2}>Which aircraft actually need one?</h2>
      <p>
        Broadly: multi-pilot aeroplanes, turbojet-powered aeroplanes regardless of weight, and any
        aeroplane with an all-up weight of 5,700 kg or more. DGCA&rsquo;s crew licensing and recency
        material — the CAR Section 8 Series &lsquo;F&rsquo; series governing recency and Pilot
        Proficiency Checks for multi-pilot aeroplanes and aeroplanes above 5,700 kg — is the
        applicable framework, published on{' '}
        <a href="https://www.dgca.gov.in" target="_blank" rel="noopener noreferrer" className="text-av-orange font-semibold underline">
          dgca.gov.in
        </a>. The light single-engine trainers used for CPL flying hours sit well under that threshold,
        which is exactly why the requirement never comes up during initial training and then arrives all
        at once once a candidate starts looking at airline aircraft.
      </p>

      <h2 id="prerequisites" className={H2}>What you need before you start</h2>
      <p>
        A TRTO will check every item below before accepting you onto a type rating course. Missing one
        does not fail the course — it stops you from starting it.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Prerequisites for starting type rating training</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Requirement</th>
              <th scope="col" className={TH}>Detail</th>
            </tr>
          </thead>
          <tbody>
            {prerequisites.map((p, i) => (
              <tr key={p.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{p.item}</td>
                <td className={TD}>{p.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Your {CPL_HOURS.total}-hour CPL flying record does not need to include any time on the target
        type — that is precisely what the type rating course itself is for. What it does need is to be
        current and unrestricted, with nothing outstanding against the licence.
      </p>

      <h2 id="process" className={H2}>How the TRTO process actually works</h2>
      <p>
        Type rating training runs at a DGCA-approved Type Rating Training Organisation. DGCA publishes
        its own list of approved training organisations, and confirming an operator&rsquo;s current
        approval for the specific type and variant — not just the aircraft family — is the first check
        to make before paying anything.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Stages of type rating training</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>What it involves</th>
            </tr>
          </thead>
          <tbody>
            {processSteps.map((s, i) => (
              <tr key={s.stage} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{s.stage}</td>
                <td className={TD}>{s.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogImagePlaceholder
        src="/blog/type-rating/trto-training-stages.webp"
        width={1200}
        height={800}
        alt="A five-stage horizontal flow from TRTO enrolment through ground school, simulator training and a skill test to base or line training"
        promptId="37"
      />

      <h2 id="sponsored-vs-self" className={H2}>Airline-sponsored vs self-sponsored</h2>
      <p>
        A type rating reaches a pilot one of two ways, and the difference changes both the financial
        risk and the timeline.
      </p>
      <p>
        Under an airline-sponsored or cadet route, the operator selects candidates first and funds — or
        bonds — the type rating as part of onboarding, usually onto whichever aircraft it currently
        needs crew for. The candidate takes on little or no upfront cost, but has no choice over the
        type and the seat depends entirely on that operator&rsquo;s own hiring decision.
      </p>
      <p>
        Under a self-sponsored route, the pilot pays a TRTO directly and holds the rating before
        applying anywhere. This can shorten the path to a direct-entry first officer role at an
        operator that already flies that type, since some direct-entry postings prefer or require
        candidates arriving already rated. It also means the entire cost is at risk before any job
        offer exists, and a rating on a type no operator in India currently flies has very limited
        practical value.
      </p>

      <h2 id="cost" className={H2}>What does a type rating cost?</h2>
      <p>
        There is no single figure, and DGCA does not publish or standardise type rating fees — each
        TRTO sets its own, and published estimates from different sources for the same aircraft
        disagree with each other by a wide margin. Rather than repeat a number that a different
        provider could contradict within weeks, the honest answer is: request a written, itemised
        quote from the TRTO directly, and confirm exactly what it covers.
      </p>
      <p>
        At minimum, ask whether the quote includes ground school, the full simulator syllabus, the
        skill test itself, and any base or line training the hiring operator requires afterward. A
        quote that only covers the simulator phase is not the total cost of being employable on that
        type.
      </p>

      <h2 id="recency" className={H2}>Keeping the rating current</h2>
      <p>
        A type rating does not expire the way a document does, but the privilege to use it lapses
        without recency. DGCA&rsquo;s recency framework for multi-pilot aeroplanes and aeroplanes above
        5,700 kg requires a Pilot Proficiency Check on that type within a set period; missing the
        window means retraining before the rating can be exercised again, even though it was never
        removed from the licence itself. A pilot who holds a type rating but has not flown that type
        or completed a proficiency check recently should confirm current status before assuming they
        can simply return to the aircraft.
      </p>

      <h2 id="choosing" className={H2}>Choosing which type to get rated on</h2>
      <p>
        For a self-sponsored candidate, the choice matters more than the training itself. A rating is
        only as useful as the number of operators actually flying that aircraft in the market you are
        applying to. Before committing, it is worth checking which aircraft the airlines you are
        targeting currently operate and are actively hiring direct-entry first officers for, rather
        than choosing a type on availability of a training slot alone.
      </p>

      <h2 id="mistakes" className={H2}>Mistakes that waste the investment</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>Paying for a type rating before confirming the TRTO&rsquo;s DGCA approval covers the exact variant you need, not just the aircraft family.</li>
        <li>Treating a quoted fee as final without asking what it excludes — base training, line training and recurrent checks are frequently billed separately.</li>
        <li>Self-funding a rating on a type with little presence in the market you plan to work in.</li>
        <li>Letting recency lapse between the rating and an actual job offer, then discovering a proficiency check is needed before the aircraft can be flown.</li>
        <li>Starting the process before the Instrument Rating, multi-engine rating or English proficiency endorsement are in place, and losing a training slot to a prerequisite that could have been sorted months earlier.</li>
      </ul>

      <h2 className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}. A type rating
        sits well after the stage we teach, but eligibility questions like whether your CPL, medical
        and ratings will be in order by the time you are ready for one are exactly the kind of planning
        conversation we have with students long before that stage arrives.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
