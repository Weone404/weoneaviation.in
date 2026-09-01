import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { LICENCES, ACADEMY } from '../../lib/facts';

/*
 * New topic, not covered by any existing /blogs post: "type rating" appears in
 * passing across cost-transparency.jsx, courses/atpl.jsx, courses/cpl.jsx and
 * several airline-preparation pages, but nowhere as its own explainer. This
 * post is that explainer.
 *
 * Rupee figures for the Type Rating and MCC lines are mirrored from
 * pages/cost-transparency.jsx, the site's single fee source (same convention
 * pilot-training-cost-in-india.jsx uses) — update there first.
 *
 * The 5,700 kg / turbojet threshold and the CAR reference come from DGCA Civil
 * Aviation Requirement, Section 7, Series B, Part XIX (Training and Licensing —
 * endorsement training on aeroplanes), cited and linked below. No pass mark, fee
 * schedule or programme duration is stated because none is sourced.
 *
 * No HowTo, FAQPage or BreadcrumbList schema here — Layout emits BreadcrumbList
 * and the site FAQ schema; this page's own FAQPage block covers its PeopleAlsoAsk.
 */
const DATE_PUBLISHED = '2026-09-01';
const DATE_MODIFIED = '2026-09-01';
const CANONICAL = 'https://weoneaviation.in/blogs/type-rating-for-pilots-in-india';

const CPL = LICENCES.find((l) => l.code === 'CPL');
const ATPL = LICENCES.find((l) => l.code === 'ATPL');

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What Is a Type Rating for Pilots in India? Cost, MCC and How to Get One',
  description:
    'What a type rating actually is, which aircraft require one, how it differs from your CPL and from MCC, what it costs in India, and why airlines usually decide when you get one — not you.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Type rating',
  keywords: 'type rating for pilots India, type rating cost India, what is a type rating, MCC course meaning, type rating after CPL',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const whoNeedsOne = [
  { aircraft: 'Single-engine piston trainer (Cessna 152/172 class)', needsTR: 'No — class rating only', note: 'What most CPL flying hours are built on' },
  { aircraft: 'Light twin-engine piston (below 5,700 kg)', needsTR: 'No — class rating only', note: 'Multi-engine rating, not a type rating' },
  { aircraft: 'Turboprop above 5,700 kg (e.g. ATR, Q400 class)', needsTR: 'Yes', note: 'Weight alone triggers the requirement' },
  { aircraft: 'Any turbojet aircraft (e.g. A320, B737 class)', needsTR: 'Yes, regardless of weight', note: 'Engine type triggers it even if MTOW were lower' },
];

const cplVsTrVsMcc = [
  { item: 'Commercial Pilot Licence (CPL)', authorises: 'Flying for payment, on any aircraft you are otherwise rated for', basis: `Aircraft Rules, 1937, Schedule II, ${CPL.section}`, who: 'DGCA, after the written papers, RTR (A) and flight test' },
  { item: 'Multi-Crew Cooperation (MCC)', authorises: 'Operating as one pilot in a two-pilot flight deck', basis: 'ICAO multi-crew operating standard, adopted into DGCA-approved syllabi', who: 'An approved training organisation, usually on a simulator' },
  { item: 'Type Rating', authorises: 'Acting as pilot on one specific aircraft type only', basis: 'DGCA Civil Aviation Requirement, Section 7, Series B, Part XIX', who: 'An operator or approved training organisation holding that type on its approval' },
];

const costRows = [
  { item: 'Multi-Crew Cooperation (MCC) course', cost: '₹50,000 – ₹1,00,000', note: 'Usually completed before or alongside type rating ground school' },
  { item: 'Type rating (single aircraft type, e.g. A320 or B737 class)', cost: '₹1,00,000 – ₹2,00,000', note: 'Never included in a CPL quote; a separate stage entirely' },
];

const mistakes = [
  { mistake: 'Paying for a type rating before any airline has offered you a seat', why: 'A rating on the wrong type, or one that expires before you fly it, is money spent with no operator to use it. Airlines that sponsor cadets choose the type — self-funding ahead of an offer is a bet on guessing correctly.' },
  { mistake: 'Treating the type rating like the finish line', why: 'It authorises one aircraft type, not a career. Recency requirements, line training and a probationary period with the operator all sit after it.' },
  { mistake: 'Assuming MCC and type rating are the same course', why: 'MCC teaches multi-crew procedure in general; a type rating teaches one specific aircraft’s systems and handling. Most airline-track pilots need both, usually in that order.' },
  { mistake: 'Signing a training bond without reading the payback clause', why: 'Airline-sponsored type ratings commonly come with a service bond. What you owe if you leave early is the detail that matters, not the headline "free training."' },
];

const tocHeadings = [
  { id: 'what-is', title: 'What is a type rating?' },
  { id: 'who-needs', title: 'Which aircraft require one?' },
  { id: 'cpl-vs-tr', title: 'CPL vs MCC vs type rating' },
  { id: 'process', title: 'How the process actually works' },
  { id: 'cost', title: 'What does it cost?' },
  { id: 'when', title: 'When should you get one?' },
  { id: 'mistakes', title: 'Mistakes that cost pilots money' },
  { id: 'why-weone', title: 'Where We One Aviation fits in' },
];

const peopleAlsoAsk = [
  {
    q: 'Can I get a type rating before I have a job with an airline?',
    a: 'Yes, self-funded type ratings exist, but they are a bet: you are training on a specific aircraft with no guarantee any operator will hire you onto that type. Most pilots who self-fund do it only after strong signals from a specific airline, not speculatively.',
  },
  {
    q: 'Does We One Aviation provide type rating or MCC training?',
    a: 'No. We teach the DGCA ground subjects for the CPL. Type rating and MCC are separate stages that sit with an operator or an approved training organisation holding that aircraft type on its approval, after your licence is issued.',
  },
  {
    q: 'Do I need a new type rating if I move to an airline flying the same aircraft?',
    a: 'Not for the aircraft type itself — a type rating is aircraft-specific, not airline-specific. You will still go through that operator’s own line training and procedures, which is not optional regardless of your existing rating.',
  },
  {
    q: 'Can a CPL holder fly commercially with no rating beyond the licence?',
    a: 'Only on aircraft that do not require a type rating — light piston aircraft under the weight and engine thresholds. Anything an airline actually operates falls above those thresholds, which is why the rating exists as a separate, later step.',
  },
  {
    q: 'How is an ATPL different from a type rating?',
    a: `An ${ATPL.name} (${ATPL.code}) is a licence tier, earned through command experience and permitting you to act as pilot-in-command of a commercial aeroplane. A type rating is narrower and sits underneath it — an endorsement for one aircraft type, needed at CPL level too, well before ATPL experience is built.`,
  },
];

const related = [
  { lead: 'Every fee line mentioned here, including the type rating and MCC figures, is maintained in full on', anchor: 'the cost transparency page', href: '/cost-transparency' },
  { lead: 'For the licence ladder these ratings sit on top of, read', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'For the full cost picture from enrolment to licence, see', anchor: 'the pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
  { lead: 'For how CPL programmes are structured before you reach this stage, read', anchor: 'our commercial pilot training programmes guide', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'The ground-school syllabus behind the CPL and RTR (A) is on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const TDN = `${TD} text-right tabular-nums whitespace-nowrap`;

export default function TypeRatingForPilotsInIndia() {
  return (
    <BlogPostLayout
      title="What Is a Type Rating for Pilots in India? Cost, MCC and How to Get One"
      description="What a type rating is, which aircraft require one, how it differs from a CPL and from MCC, what it costs in India, and when in a pilot's career it actually happens."
      schema={articleSchema}
      heading="What Is a Type Rating for Pilots in India? Cost, MCC and How to Get One"
      category="Type rating"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'What is a type rating, and do I need one for my CPL?',
        answer:
          'A type rating is a DGCA endorsement authorising you to fly one specific aircraft type, required for any aircraft above 5,700 kg MTOW or any turbojet regardless of weight. It is not part of a CPL — it comes after the licence, usually alongside MCC, and typically costs ₹1,00,000–₹2,00,000 in India.',
      }}
      summaryTitle="Type rating, in one view"
      summaryItems={[
        'Authorises one specific aircraft type — not commercial flying in general',
        'Required above 5,700 kg MTOW, or on any turbojet regardless of weight',
        `Sits after the ${CPL.code}, never inside it — no CPL quote anywhere includes it`,
        'Indicative cost: ₹1,00,000 – ₹2,00,000, plus ₹50,000 – ₹1,00,000 for MCC',
        'Airlines that sponsor cadets choose the aircraft type, not the trainee',
        'Aircraft-specific, not airline-specific — it travels with you between operators flying the same type',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/type-rating/hero-type-specific.webp"
        width={1200}
        height={630}
        alt="A pilot in uniform standing between two different aircraft silhouettes, a certificate connecting to only one of them"
        promptId="34"
      />

      <h2 id="what-is" className={H2}>What is a type rating?</h2>
      <p>
        A type rating is an endorsement on your licence that authorises you to act as pilot on one
        specific aircraft type — an A320-family jet, a Q400 turboprop, and so on — and nothing else.
        It is narrower than most people expect. Clearing your {CPL.code} does not make you qualified
        to fly any of the aircraft an airline actually operates; it makes you eligible to start
        training on one of them.
      </p>
      <p>
        That gap surprises families more than any other part of the licence path. The {CPL.name}
        ({CPL.section}) authorises {CPL.permits.toLowerCase()} It says nothing about which aircraft.
        The type rating is the document that does.
      </p>

      <h2 id="who-needs" className={H2}>Which aircraft actually require one?</h2>
      <p>
        Not every aircraft does. The trigger is weight and engine type, set out in DGCA Civil Aviation
        Requirement, Section 7, Series B, Part XIX — the same instrument that governs endorsement
        training on aeroplanes generally.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Which aircraft categories require a type rating</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Aircraft category</th>
              <th scope="col" className={TH}>Type rating needed?</th>
              <th scope="col" className={TH}>Note</th>
            </tr>
          </thead>
          <tbody>
            {whoNeedsOne.map((r, i) => (
              <tr key={r.aircraft} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.aircraft}</td>
                <td className={TD}>{r.needsTR}</td>
                <td className={TD}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        The most-trained aircraft in Indian CPL programmes — the light single-engine and light twin
        trainers most students log their {CPL.name.toLowerCase()} hours on — sit below both triggers.
        That is precisely why the requirement rarely comes up during flight training itself, and then
        arrives all at once the moment a student starts thinking about airline hiring.
      </p>

      <h2 id="cpl-vs-tr" className={H2}>How is a type rating different from a CPL or MCC?</h2>
      <p>
        Three different things, three different scopes, and students commonly conflate all three.
        The table below is the version worth keeping.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">CPL, MCC and type rating compared</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Qualification</th>
              <th scope="col" className={TH}>What it authorises</th>
              <th scope="col" className={TH}>Governing basis</th>
              <th scope="col" className={TH}>Who provides it</th>
            </tr>
          </thead>
          <tbody>
            {cplVsTrVsMcc.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.item}</td>
                <td className={TD}>{r.authorises}</td>
                <td className={TD}>{r.basis}</td>
                <td className={TD}>{r.who}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Notice the direction of dependency: MCC and a type rating both sit on top of a valid{' '}
        {CPL.code}, never underneath it. You cannot start either without the licence already issued.
      </p>

      <BlogImagePlaceholder
        src="/blog/type-rating/branching-pathway.webp"
        width={1200}
        height={800}
        alt="A single certificate icon branching into several aircraft silhouettes, with only one branch highlighted"
        promptId="35"
      />

      <h2 id="process" className={H2}>How does the process actually work?</h2>
      <p>
        Once a {CPL.code} is issued, the sequence an airline-track pilot typically follows runs in
        this order:
      </p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <strong>MCC course</strong> — simulator-based training in multi-crew procedure: briefings,
          callouts, workload division between the two seats. Aircraft-agnostic at this stage.
        </li>
        <li>
          <strong>Type-specific ground school</strong> — the systems, limitations and procedures of one
          aircraft type, taught by an operator or approved training organisation holding that type.
        </li>
        <li>
          <strong>Simulator training on that type</strong> — normal and non-normal procedures on a
          full-flight or approved training device for the specific aircraft.
        </li>
        <li>
          <strong>Skill test and licence endorsement</strong> — a DGCA-recognised check, after which the
          type is endorsed on the licence.
        </li>
        <li>
          <strong>Line training with an operator</strong> — supervised flying on the aircraft, in revenue
          service, before an unsupervised roster begins. This sits with the employer, not the training
          organisation.
        </li>
      </ol>
      <p>
        We do not run any of these five stages ourselves. {ACADEMY.scope}
      </p>

      <h2 id="cost" className={H2}>What does a type rating cost in India?</h2>
      <p>
        Roughly ₹1,50,000 to ₹3,00,000 across MCC and the type rating together, and it is one of the
        costs most consistently left out of a CPL fee conversation because it genuinely belongs to a
        later stage.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Indicative cost of MCC and type rating training</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={`${TH} text-right`}>Indicative cost</th>
              <th scope="col" className={TH}>Note</th>
            </tr>
          </thead>
          <tbody>
            {costRows.map((c, i) => (
              <tr key={c.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.item}</td>
                <td className={TDN}>{c.cost}</td>
                <td className={TD}>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Two things move that range more than any line item. Which aircraft type — training slots and
        simulator time are priced by the operator or training organisation holding that type, and
        prices differ between types. And who is paying — a self-funded rating and an airline-sponsored
        one rarely cost the trainee the same amount, because a sponsorship usually converts the fee
        into a service bond rather than an upfront payment.
      </p>

      <h2 id="when" className={H2}>When should you actually get one?</h2>
      <p>
        As late as the facts allow, in most cases. A type rating only has value once there is an
        aircraft — and ideally an operator — for it to attach to. Two paths cover almost everyone:
      </p>
      <p>
        <strong>Airline-sponsored.</strong> Many carriers hire cadets before the type rating and pay for
        it as part of a bonded training package, choosing the aircraft type themselves. This is the
        lower-risk path financially, because the choice of type is validated by an actual job offer
        before any of that money moves.
      </p>
      <p>
        <strong>Self-funded.</strong> Some pilots pay for a type rating ahead of an offer, usually on a
        widely operated type, to shorten an airline&rsquo;s own training pipeline for them. It is a real
        strategy, and it is a bet — training on a type no operator ultimately hires you onto is money
        spent with nothing to show for it.
      </p>

      <BlogImagePlaceholder
        src="/blog/type-rating/mcc-then-type-rating-stages.webp"
        width={1200}
        height={675}
        alt="Three ascending platforms of increasing height representing MCC training, type-specific ground school, and line training with an operator"
        promptId="36"
      />

      <h2 id="mistakes" className={H2}>Which mistakes cost pilots the most money here?</h2>
      <p>
        Four, in the order we see them most often.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Common type rating mistakes and why they cost money</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Mistake</th>
              <th scope="col" className={TH}>Why it costs money</th>
            </tr>
          </thead>
          <tbody>
            {mistakes.map((m, i) => (
              <tr key={m.mistake} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{m.mistake}</td>
                <td className={TD}>{m.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="why-weone" className={H2}>Where We One Aviation fits in</h2>
      <p>
        We have taught the DGCA ground subjects for the {CPL.code} from Dwarka since{' '}
        {ACADEMY.foundedYear}. That is the stage before this one — the written papers, RTR (A) and the
        eligibility paperwork that gets a student to flight training in the first place. MCC and type
        rating come later, with an operator or an approved training organisation holding the aircraft
        type, and we say that plainly rather than implying otherwise. {ACADEMY.scope}
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
