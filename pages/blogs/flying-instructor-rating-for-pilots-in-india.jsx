import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { LICENCES, MIN_AGE, CPL_HOURS, ACADEMY } from '../../lib/facts';

/*
 * No page on the site owns "how do I become a flight instructor in India" —
 * type-rating, MCC and Instrument Rating posts cover the airline-bound
 * specialisations after a CPL, but the instructor route (the specialisation
 * that keeps a pilot flying and earning inside India while building hours)
 * had no dedicated page.
 *
 * DGCA publishes the Assistant Flight Instructor's Rating and the Flight
 * Instructor's Rating as two distinct entries on its own digigov portal
 * (aircraftRulesContent2Req IDs 3064 and 3065 respectively), confirming the
 * two-stage structure described below. Their content pages sit behind
 * dgca.gov.in, which this environment cannot fetch, and third-party academy
 * sites quote conflicting hour figures for AFIR/FIR (100 PIC vs 200 total vs
 * 200 as-instructor, sources disagree by a wide margin). Per the standing
 * rule, disagreeing secondary sources are not a source — no hour figure is
 * stated here as fact. The reader is pointed to a DGCA-approved FTO/TRTO and
 * the CAR Section 7 text directly, the same pattern type-rating-for-pilots-
 * in-india.jsx uses for cost.
 *
 * No HowTo, no BreadcrumbList (Layout emits the breadcrumb). FAQPage schema
 * is inlined here, not via data/pageFaqs.js, which this post is not
 * permitted to edit.
 */
const DATE_PUBLISHED = '2026-09-09';
const DATE_MODIFIED = '2026-09-09';
const CANONICAL = 'https://weoneaviation.in/blogs/flying-instructor-rating-for-pilots-in-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Flying Instructor Rating for Pilots in India: What It Is and How CPL Holders Get One',
  description:
    'What a Flying Instructor Rating is, how the Assistant Flying Instructor stage leads into it, the prerequisites a CPL holder needs, how DGCA-approved training and assessment work, and why some pilots take this route before an airline seat.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot career guide',
  keywords: 'flying instructor rating india, how to become a flight instructor in india, DGCA flight instructor rating, AFI rating, FI rating, CPL holder instructor route',
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
    q: 'Can a fresh CPL holder become a flight instructor immediately?',
    a: 'No. A DGCA-approved flying school will only accept an instructor-rating candidate who already holds a current, unrestricted CPL and a Class 1 medical, plus the additional flying experience and ground training the rating requires. There is no route that starts before the CPL is issued.',
  },
  {
    q: 'What is the difference between the Assistant Flying Instructor rating and the Flying Instructor rating?',
    a: 'They are two separate DGCA ratings, listed separately on DGCA\'s own crew-licensing pages. The Assistant Flying Instructor (AFI) rating comes first and lets a pilot instruct under the supervision or countersignature of a full Flying Instructor; the Flying Instructor (FI) rating removes that supervision requirement and is earned with further instructing experience and a further DGCA assessment.',
  },
  {
    q: 'Does an instructor rating expire?',
    a: 'The privilege needs periodic renewal rather than being permanent once issued — DGCA-approved instructor ratings run on a validity period that lapses without renewal training and, where applicable, a check. Confirm the current renewal cycle and requirements with a DGCA-approved FTO rather than assuming an old rating is still live.',
  },
  {
    q: 'Is becoming an instructor a step toward an airline job, or a separate career?',
    a: 'Both, depending on the pilot. Some CPL holders instruct for a season or two specifically to build flying hours and income while airline hiring windows open, then move on. Others build a long-term career in ground and flight instruction. Neither path is inferior — they answer different questions about what a pilot wants next.',
  },
  {
    q: 'Do I need a type rating or Instrument Rating before an instructor rating?',
    a: 'No. An instructor rating on single-engine training aircraft does not require a type rating (type ratings apply to multi-pilot and turbojet aircraft, not the trainers instructor ratings are flown on) or an Instrument Rating. The two qualifications serve different purposes and are commonly taken in either order depending on a pilot\'s career plan.',
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
  { lead: 'For the full roadmap from Class 12 to a licence, and where instructing can fit into it, read', anchor: 'our airline pilot career guide', href: '/blogs/how-to-become-an-airline-pilot-in-india' },
  { lead: 'For the other major post-CPL specialisation and how the two compare, see', anchor: 'our type rating guide', href: '/blogs/type-rating-for-pilots-in-india' },
  { lead: 'For the two-pilot crew training airlines require separately from instructing, read', anchor: 'our MCC training guide', href: '/blogs/mcc-training-for-pilots-in-india' },
  { lead: 'For CPL eligibility, ground subjects and the six-month syllabus, see', anchor: 'the CPL course page', href: '/commercial-pilot-license' },
  { lead: 'Every line item a CPL budget needs to account for is on', anchor: 'our pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
];

const tocHeadings = [
  { id: 'what', title: 'What is a Flying Instructor Rating?' },
  { id: 'afi-vs-fi', title: 'AFI vs FI: the two-stage structure' },
  { id: 'prerequisites', title: 'What you need before you start' },
  { id: 'process', title: 'How the training and assessment work' },
  { id: 'privileges', title: 'What the rating actually lets you do' },
  { id: 'recency', title: 'Keeping the rating current' },
  { id: 'why', title: 'Why CPL holders choose this route' },
  { id: 'vs-other', title: 'How it differs from a type rating and MCC' },
  { id: 'mistakes', title: 'Mistakes that waste the investment' },
];

const ratingStages = [
  {
    stage: 'Assistant Flying Instructor (AFI)',
    detail: 'The entry-level instructor rating. An AFI instructs student pilots, but under the supervision or countersignature of a full Flying Instructor — the school remains responsible for the training standard, not the AFI alone.',
  },
  {
    stage: 'Flying Instructor (FI)',
    detail: 'The unsupervised instructor rating, earned after further instructing experience as an AFI and a further DGCA-set assessment. An FI can sign off training and supervise AFIs in turn.',
  },
];

const prerequisites = [
  { item: 'Commercial Pilot Licence', detail: `Issued by DGCA, current and unrestricted. Minimum age for CPL issue is ${MIN_AGE.CPL} (Aircraft Rules, 1937, ${LICENCES.find((l) => l.code === 'CPL').section}).` },
  { item: 'Class 1 medical certificate', detail: 'Must be current on the day instructor training and any DGCA assessment are conducted, not merely at CPL issue.' },
  { item: 'Additional flying experience', detail: 'DGCA sets a minimum experience threshold beyond the CPL total before a pilot can start AFI training. Confirm the current figure with a DGCA-approved FTO — published third-party estimates disagree with each other, so none is repeated here as fact.' },
  { item: 'Instructor ground and flight training', detail: 'A course at a DGCA-approved flying training organisation covering instructional technique, briefing and de-briefing, and dual-flight teaching methods, on top of the flying skill itself.' },
  { item: 'A DGCA-set assessment', detail: 'An oral and practical evaluation of instructional ability, conducted by or on behalf of DGCA, separate from the CPL written papers and the CPL skill test already passed.' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function FlyingInstructorRatingForPilotsInIndia() {
  return (
    <BlogPostLayout
      title="Flying Instructor Rating for Pilots in India: What It Is and How CPL Holders Get One"
      description="What a Flying Instructor Rating is, how the Assistant Flying Instructor stage works, the prerequisites a CPL holder needs, and how DGCA-approved instructor training and assessment run."
      schema={[articleSchema, faqSchema]}
      heading="Flying Instructor Rating for Pilots in India: What It Is and How CPL Holders Get One"
      category="Pilot career guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'What is a Flying Instructor Rating and can a CPL holder get one?',
        answer: `Yes. A Flying Instructor Rating is a separate DGCA qualification, earned after a Commercial Pilot Licence, that lets a pilot teach student pilots at a DGCA-approved flying school. It runs in two stages — Assistant Flying Instructor first, then Flying Instructor — each requiring additional flying experience, an instructor training course, and a DGCA-set assessment beyond the CPL itself.`,
      }}
      summaryTitle="The essentials, in one view"
      summaryItems={[
        `Prerequisite: a current CPL (minimum age ${MIN_AGE.CPL}) and a Class 1 medical — no route starts before CPL issue`,
        'DGCA lists the Assistant Flying Instructor (AFI) and Flying Instructor (FI) ratings separately — AFI comes first and works under supervision',
        'Training runs at a DGCA-approved flying training organisation: instructional technique plus further flying training, not just the flying skill already held',
        'A DGCA-set oral and practical assessment follows training, separate from the CPL written papers and CPL skill test',
        'Additional flying-hour thresholds apply before AFI training and again before the FI upgrade — figures vary by source, so confirm the current requirement with a DGCA-approved FTO rather than a headline number',
        'The rating needs periodic renewal, not a one-time issue — confirm the current validity period before assuming an old rating is live',
        'It is not a type rating and does not require an Instrument Rating first — the three are separate, unrelated qualifications',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/flying-instructor-rating/hero-instructor-and-student.webp"
        width={1200}
        height={630}
        alt="A flight instructor in the right seat of a small single-engine training aircraft, gesturing toward the instrument panel while a student pilot in the left seat looks on"
        promptId="44"
      />

      <h2 id="what" className={H2}>What is a Flying Instructor Rating?</h2>
      <p>
        A Flying Instructor Rating is a DGCA qualification, separate from the {' '}
        {LICENCES.find((l) => l.code === 'CPL').name}, that authorises a pilot to teach student
        pilots at a DGCA-approved flying training organisation. Holding a CPL proves you are
        qualified to fly for payment; it does not, by itself, authorise you to instruct another
        person toward their own licence. That is a distinct skill DGCA examines separately, the
        same way a type rating or an Instrument Rating sits on top of the CPL rather than inside it.
      </p>
      <p>
        DGCA treats this as genuinely separate work. Its own crew-licensing pages list the
        Assistant Flying Instructor&rsquo;s Rating and the Flying Instructor&rsquo;s Rating as two
        distinct entries, published on{' '}
        <a href="https://www.dgca.gov.in" target="_blank" rel="noopener noreferrer" className="text-av-orange font-semibold underline">
          dgca.gov.in
        </a>. That two-entry structure is not an accident of the website — it reflects a genuine
        two-stage rating, described below.
      </p>

      <h2 id="afi-vs-fi" className={H2}>AFI vs FI: the two-stage structure</h2>
      <p>
        Nobody goes straight from a CPL to unsupervised instructing. DGCA splits the privilege into
        two ratings, earned in sequence, and the distinction between them is the first thing to
        understand before asking what either one costs or requires.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">The two-stage instructor rating structure</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>What it means</th>
            </tr>
          </thead>
          <tbody>
            {ratingStages.map((s, i) => (
              <tr key={s.stage} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{s.stage}</td>
                <td className={TD}>{s.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        The practical effect is that a new instructor spends a period flying and teaching inside a
        school&rsquo;s supervision structure before being trusted to sign off training
        independently. That is not a formality — a flying school&rsquo;s DGCA approval rests
        partly on how it supervises its newer instructors, so the AFI stage genuinely changes what
        a pilot is allowed to do unsupervised.
      </p>

      <h2 id="prerequisites" className={H2}>What you need before you start</h2>
      <p>
        A DGCA-approved flying training organisation checks every item below before accepting an
        AFI candidate. Missing one does not fail the course — it stops the course from starting.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Prerequisites for starting instructor rating training</caption>
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
        Your {CPL_HOURS.total}-hour CPL flying record already satisfies the licence requirement
        itself; what an FTO adds on top is a further experience threshold specific to the
        instructor rating, plus the ground and flight training in the table above. Ask the FTO to
        state its current hour requirement in writing rather than relying on a number quoted
        online, since published estimates for this figure disagree with each other by a wide
        margin and none of them is DGCA&rsquo;s own published text.
      </p>

      <BlogImagePlaceholder
        src="/blog/flying-instructor-rating/afi-to-fi-progression.webp"
        width={1200}
        height={800}
        alt="A simple two-stage flow showing a CPL holder moving from Assistant Flying Instructor training, working under supervision, into the Flying Instructor upgrade that removes that supervision requirement"
        promptId="45"
      />

      <h2 id="process" className={H2}>How the training and assessment work</h2>
      <p>
        Instructor training is not a repeat of CPL flying — it teaches a different skill on top of
        flying ability the candidate already has. The course covers how to brief a lesson, how to
        demonstrate a manoeuvre while talking through it, how to recognise and correct a
        student&rsquo;s error before it becomes unsafe, and how to debrief afterward so the lesson
        actually lands. Flying training runs alongside this, building the candidate&rsquo;s own
        handling to instructor standard rather than merely CPL standard.
      </p>
      <p>
        Once the FTO judges a candidate ready, DGCA&rsquo;s own assessment follows — an oral and
        practical evaluation of instructional ability, distinct from both the CPL written papers
        and the CPL skill test the candidate has already passed. Passing it is what gets the AFI
        rating endorsed on the licence; the FI upgrade later follows the same pattern, assessed
        again after the required further instructing experience.
      </p>

      <h2 id="privileges" className={H2}>What the rating actually lets you do</h2>
      <p>
        An AFI can instruct student pilots on dual and, once cleared, solo training flights, but
        remains under the supervision or countersignature of a Flying Instructor for the training
        record to count. An FI carries that responsibility independently, can sign off a
        student&rsquo;s progress without a second signature, and can supervise AFIs in turn. Neither
        rating, on its own, authorises examining — conducting the DGCA skill test itself is a
        further, separate DGCA authorisation held by a smaller group of senior instructors and
        examiners.
      </p>

      <h2 id="recency" className={H2}>Keeping the rating current</h2>
      <p>
        An instructor rating is not issued once and held for life without upkeep. Like other DGCA
        ratings, it runs on a validity period that requires renewal, and renewal after a lapse
        typically means further training rather than a simple paperwork refresh. A pilot who has
        not instructed for some time should confirm current validity with their FTO before assuming
        an existing rating is still exercisable — the same caution that applies to type-rating
        recency applies here.
      </p>

      <h2 id="why" className={H2}>Why CPL holders choose this route</h2>
      <p>
        Instructing solves a problem the licence itself does not: it is one of the few ways a fresh
        CPL holder can be paid to fly inside India immediately, on the same light aircraft the
        licence was earned on, while building the additional hours and experience that later
        strengthen an airline application. It also keeps flying skills current during hiring
        windows that do not align with when a pilot finishes training.
      </p>
      <p>
        Not every CPL holder wants this. Instructing is teaching work as much as flying work, and a
        pilot set on an airline seat from day one may prefer to route straight through a type
        rating and MCC instead. Both are legitimate; they answer different questions about what
        comes immediately after the licence.
      </p>

      <h2 id="vs-other" className={H2}>How it differs from a type rating and MCC</h2>
      <p>
        The three are easy to conflate because all three sit after the CPL, but each answers a
        different question. A{' '}
        <Link href="/blogs/type-rating-for-pilots-in-india" className="text-av-orange font-semibold underline">
          type rating
        </Link>{' '}
        qualifies a pilot to fly one specific multi-pilot or turbojet aircraft.{' '}
        <Link href="/blogs/mcc-training-for-pilots-in-india" className="text-av-orange font-semibold underline">
          Multi-Crew Cooperation training
        </Link>{' '}
        teaches the two-pilot working method an airline flight deck runs on. A Flying Instructor
        Rating qualifies a pilot to teach — none of the three substitutes for either of the other
        two, and a career can reasonably include more than one of them at different stages.
      </p>

      <h2 id="mistakes" className={H2}>Mistakes that waste the investment</h2>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>Starting AFI training before confirming the FTO&rsquo;s current additional-hours requirement in writing, and discovering a shortfall after paying.</li>
        <li>Treating the AFI rating as equivalent to the FI rating — a school that expects unsupervised instructors will not accept an AFI alone for that role.</li>
        <li>Letting the rating lapse between an instructing stint and a return to flying, then losing time to renewal training instead of simply resuming.</li>
        <li>Assuming an instructor rating includes examiner authority — it does not, and conducting official skill tests needs a further, separate DGCA authorisation.</li>
        <li>Choosing this route purely to fill time without weighing it against a type rating and MCC, when the career goal is genuinely an airline seat as soon as possible.</li>
      </ul>

      <h2 className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}, covered in
        full on{' '}
        <Link href="/commercial-pilot-license" className="text-av-orange font-semibold underline">
          our CPL course page
        </Link>. An instructor rating sits well after the stage we teach, but questions about which
        route to take after a CPL — instructing, a type rating, or both — are exactly the kind of
        planning conversation we have with students long before that stage arrives.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
