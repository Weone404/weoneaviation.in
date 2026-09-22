import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { PARIKSHA, EDUCATION, MEDICAL, DGCA_PAPERS, RTR, ACADEMY } from '../../lib/facts';

/*
 * New topic, not a rewrite. PARIKSHA.foreignCandidates, PARIKSHA.aiu and
 * PARIKSHA.digilocker.conditions have sat in lib/facts.js since 2026-09-11,
 * used only as a single FAQ line or a single table row inside three other
 * pages (commercial-pilot-license-eligibility.jsx, dgca-computer-number.jsx,
 * courses/ppl.jsx). None of those pages exists to answer this question, and
 * this one does: can someone who is not an Indian citizen actually start
 * flight training in India for an Indian CPL, and what does a family with
 * an NRI or OCI child need to know before assuming the ordinary process
 * applies to them.
 *
 * DELIBERATELY NOT THIS TOPIC: converting an already-held foreign pilot
 * licence into a DGCA one. That is FOREIGN_LICENCE, covered in full at
 * /blogs/convert-foreign-pilot-licence-to-dgca-india, and linked from here
 * because the two are the questions people actually confuse.
 *
 * The NRI/OCI distinction itself is not attributed to a DGCA document —
 * Pariksha's own materials classify by nationality on the passport and do
 * not define "NRI" or "OCI" at all. That framing is stated as inference from
 * general Indian citizenship law (India does not recognise dual citizenship,
 * so an OCI cardholder holds foreign citizenship by definition), not as a
 * DGCA rule, and the copy below keeps that boundary explicit.
 *
 * FAQPage schema inlined here, per CLAUDE.md — data/pageFaqs.js is off limits
 * to this routine.
 */
const DATE_PUBLISHED = '2026-09-22';
const DATE_MODIFIED = '2026-09-22';
const CANONICAL = 'https://weoneaviation.in/blogs/foreign-national-nri-pilot-training-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Can a Foreign National or NRI Train to Become a Pilot in India?',
  description:
    "What DGCA's Pariksha portal actually requires from a foreign national who wants to train for an Indian CPL from scratch — the passport, the security clearance, the Indian mobile number, and how an NRI's Indian passport keeps them on the ordinary route.",
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot eligibility',
  keywords: 'foreign national pilot training India, NRI pilot training India, OCI pilot licence India, DGCA computer number foreign national, can foreigners fly in India CPL',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
  citation: [
    { '@type': 'CreativeWork', name: 'Flight Crew Computer Number Registration — FAQ (DGCA Pariksha)', url: PARIKSHA.sources[0].url },
    { '@type': 'CreativeWork', name: 'Flight Crew User Manual, Issue III Rev 0, October 2024 (DGCA Pariksha)', url: PARIKSHA.sources[1].url },
  ],
};

const peopleAlsoAsk = [
  {
    q: 'Is an NRI treated as a foreign national by DGCA?',
    a: "No — not on the evidence Pariksha itself publishes. Its documents classify a candidate by the passport they hold, not by where they live, and they do not define a separate NRI category. An Indian citizen living abroad still holds an Indian passport, so they apply on the ordinary route. An OCI or PIO cardholder holds foreign citizenship by definition, since India does not recognise dual citizenship, and Pariksha's foreign-national conditions apply to them.",
  },
  {
    q: 'Do foreign nationals need a passport even from Nepal or Bhutan?',
    a: `Yes. ${PARIKSHA.foreignCandidates.passport}`,
  },
  {
    q: 'Can a foreign national use the DigiLocker route to get a computer number instantly?',
    a: `No. ${PARIKSHA.digilocker.whoStillGoesManual} Foreign nationals go through the manual route every time — the Board Verification Certificate, the security clearance form, and the standard ${PARIKSHA.processing.days}-working-day processing window.`,
  },
  {
    q: 'Does an international Class 12 qualify for CPL eligibility in India?',
    a: `${PARIKSHA.aiu.whenNeeded} An equivalence certificate comes from the ${PARIKSHA.aiu.body.split(',')[0]}. ${PARIKSHA.aiu.diploma}`,
  },
  {
    q: 'Do foreign nationals sit a shorter set of DGCA papers, like a licence conversion does?',
    a: `No, and this is the mistake to avoid. A candidate converting an already-held foreign licence sits a reduced two-paper set — that is a different process, covered in our foreign licence conversion guide. A foreign national training from scratch in India sits the full ${DGCA_PAPERS.length}-paper set every Indian candidate sits, plus ${RTR.name} separately.`,
  },
  {
    q: 'What visa does a foreign national need for flight training in India?',
    a: "Pariksha's published materials do not cover visas — that sits with India's missions abroad and the FRRO, not with DGCA. Confirm the correct visa category with the flying school and the nearest Indian mission before applying for a computer number, since the computer number process alone does not establish immigration status.",
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

const comparisonRows = [
  { area: 'Passport', indian: 'Not required to apply', foreign: PARIKSHA.foreignCandidates.passport },
  { area: 'Mobile number', indian: 'Any Indian mobile number', foreign: PARIKSHA.foreignCandidates.mobile },
  { area: 'Security clearance', indian: 'Not required', foreign: PARIKSHA.foreignCandidates.securityClearance },
  { area: 'Education route', indian: `Recognised Indian Board or University — ${EDUCATION.requirement}`, foreign: `${PARIKSHA.aiu.whenNeeded} ${PARIKSHA.aiu.diploma}` },
  { area: 'Board Verification Certificate', indian: 'Addressed to CEO, the flying school or the candidate, per the usual three cases', foreign: PARIKSHA.bvc.internationalBoards },
  { area: 'Computer number route', indian: 'DigiLocker auto-generation available where the board and Aadhaar match', foreign: 'Manual route only — DigiLocker requires Indian nationality' },
  { area: 'DGCA written papers', indian: `${DGCA_PAPERS.length} papers, same as every CPL candidate`, foreign: `${DGCA_PAPERS.length} papers — no reduced set for training from scratch` },
  { area: `${RTR.name}`, indian: 'Required, examined separately', foreign: 'Required, examined separately — a foreign radio qualification does not substitute' },
  { area: 'Medical certificate', indian: MEDICAL.short, foreign: `${MEDICAL.short}, from a DGCA-empanelled examiner in India` },
];

const categoryRows = [
  { category: 'PPL', note: 'Private Pilot Licence' },
  { category: 'CPL', note: 'Commercial Pilot Licence' },
  { category: 'ATPL', note: 'Airline Transport Pilot Licence' },
  { category: 'FDEG', note: 'Flight Dispatcher' },
  { category: 'FE', note: 'Flight Engineer' },
  { category: 'FN', note: 'Flight Navigator' },
  { category: 'FATA', note: 'Flying Instructor / examiner categories administered alongside the others' },
];

const tocHeadings = [
  { id: 'which-are-you', title: "Foreign national or NRI — which are you, under DGCA's rules?" },
  { id: 'same-bar', title: 'The eligibility bar everyone clears first' },
  { id: 'extra-steps', title: 'What a foreign national has to do that an Indian candidate does not' },
  { id: 'international-board', title: 'If your Class 10 or 12 is from an international board' },
  { id: 'comparison', title: 'Indian candidate vs foreign national, side by side' },
  { id: 'categories', title: 'Every category open on the same portal' },
  { id: 'digilocker', title: 'Why the fast-track computer number route is closed to you' },
  { id: 'after', title: 'After the computer number: medical, papers and RTR (A)' },
  { id: 'visa', title: "What DGCA's process does not cover" },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const related = [
  { lead: 'If you already hold a foreign pilot licence and want to fly commercially in India, that is a different process — read', anchor: 'our foreign licence conversion guide', href: '/blogs/convert-foreign-pilot-licence-to-dgca-india' },
  { lead: 'For the five written papers and a realistic study timeline, see', anchor: 'our DGCA ground school guide', href: '/blogs/dgca-ground-school-guide' },
  { lead: 'For the full admission paperwork sequence, including the computer number, read', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'For the licence itself once eligibility is settled, see', anchor: 'the Commercial Pilot Licence course page', href: '/commercial-pilot-license' },
  { lead: 'The six-month ground syllabus that prepares every candidate for the written papers is on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function ForeignNationalNriPilotTrainingIndia() {
  return (
    <BlogPostLayout
      title="Can a Foreign National or NRI Train to Become a Pilot in India?"
      description="DGCA's Pariksha portal accepts foreign nationals for CPL training in India, with extra steps: a passport, an Indian mobile number and a security clearance. What actually differs for a foreign national, and why an NRI's Indian passport keeps them on the ordinary route."
      schema={[articleSchema, faqSchema]}
      heading="Can a Foreign National or NRI Train to Become a Pilot in India?"
      category="Pilot eligibility"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'Can a foreign national or NRI train to become a pilot in India?',
        answer: "Yes. DGCA's Pariksha portal accepts foreign nationals for CPL training, but with extra steps an Indian candidate does not face: a valid passport, a mandatory Indian mobile number, and a Government of India security clearance filed with the application. An NRI holding an Indian passport is not classed as a foreign national at all and follows the ordinary process — nationality on the passport decides the route, not where you live.",
      }}
      summaryTitle="The foreign-national route, in one view"
      summaryItems={[
        "DGCA's own category is nationality on the passport, not residence — Pariksha's documents never define \"NRI\" or \"OCI\"",
        'A foreign national needs a valid passport before applying — even candidates from Nepal and Bhutan, who otherwise travel to India visa-free',
        'An Indian mobile number is mandatory before registering, regardless of nationality',
        'Every foreign national goes through a Government of India security clearance, filed as Security Clearance Form Annexure A',
        `Education requirement is identical: 10+2 with Physics and Mathematics — an international board needs an AIU equivalence certificate instead of a state-board marksheet`,
        'DigiLocker auto-generation of the computer number is closed to foreign nationals; the manual route applies every time',
        `The written papers are not reduced. A foreign national training from scratch sits all ${DGCA_PAPERS.length} DGCA papers, the same set an Indian candidate sits`,
        "Visa and immigration status sit outside DGCA's process entirely — confirm those separately with an Indian mission or the FRRO",
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/foreign-national-nri-pilot-training-india/hero-passport-and-flight-log.webp"
        width={1200}
        height={630}
        alt="A passport booklet resting beside an open pilot training logbook and a small model training aircraft, representing a foreign national applying for pilot training in India"
        promptId="61"
      />

      <h2 id="which-are-you" className={H2}>Foreign national or NRI — which are you, under DGCA&rsquo;s rules?</h2>
      <p>
        Families ask this question with three different words in mind &mdash; foreign national, NRI, OCI
        &mdash; as though DGCA sorts candidates the same way immigration authorities do. It does not.
        Pariksha&rsquo;s own registration materials draw exactly one line, and it is nationality on the
        passport, not where you or your family currently live.
      </p>
      <p>
        An Indian citizen who has grown up abroad, or whose parents work overseas, still holds an Indian
        passport. That passport places them on the ordinary route every candidate applying from within
        India follows &mdash; no extra passport requirement, no security clearance, no restriction on the
        DigiLocker fast track beyond the usual conditions. An OCI or PIO cardholder is a different case:
        India does not recognise dual citizenship, so an OCI card is held by someone who is, by definition,
        a citizen of another country. For DGCA&rsquo;s purposes, that makes them a foreign national, and
        everything in this article that applies to a foreign national applies to them too.
      </p>

      <h2 id="same-bar" className={H2}>The eligibility bar everyone clears first</h2>
      <p>
        Before nationality changes anything, the basic bar is identical. The minimum age to register on
        Pariksha is {PARIKSHA.basics.minAge}, and {PARIKSHA.basics.maxAgeNote.toLowerCase()} The
        education requirement for every flight crew category other than PPL is the same sentence for an
        Indian candidate and a foreign one: {PARIKSHA.education.nonPpl.toLowerCase()}
      </p>
      <p>
        {PARIKSHA.basics.definition} {PARIKSHA.basics.oneOnly} None of that changes with nationality &mdash;
        a foreign national gets exactly one computer number, on the same portal, valid for the same
        lifetime. What changes is the paperwork that has to sit behind it.
      </p>

      <h2 id="extra-steps" className={H2}>What a foreign national has to do that an Indian candidate does not</h2>
      <p>
        Three things, all drawn directly from the Flight Crew User Manual&rsquo;s foreign-candidate
        conditions, and all worth budgeting time for before you assume the application will move at the
        same pace as an Indian candidate&rsquo;s.
      </p>
      <p>
        <strong>A passport, always.</strong> {PARIKSHA.foreignCandidates.passport} {PARIKSHA.foreignCandidates.passportAddress}
        {' '}An Indian candidate applying from India never needs one for this purpose; a foreign national
        needs one before the form even opens, and that includes a candidate travelling from Nepal or
        Bhutan under the visa-free arrangement those two countries otherwise have with India.
      </p>
      <p>
        <strong>An Indian mobile number, before registration.</strong> {PARIKSHA.foreignCandidates.mobile}{' '}
        The OTP that activates a Pariksha account only reaches an Indian number, so this is usually the
        first practical hurdle &mdash; arrange it, through a local contact or on arrival, before starting
        the form rather than partway through it.
      </p>
      <p>
        <strong>A security clearance.</strong> {PARIKSHA.foreignCandidates.securityClearance} This is filed
        alongside the rest of the application, not as an afterthought, and it is the one step with no
        equivalent anywhere in an Indian candidate&rsquo;s process.
      </p>

      <BlogImagePlaceholder
        src="/blog/foreign-national-nri-pilot-training-india/three-extra-steps.webp"
        width={1200}
        height={800}
        alt="Three simple icons in a row — a passport, a mobile phone and a security shield — representing the three additional steps a foreign national completes before an Indian candidate's application"
        promptId="62"
      />

      <h2 id="international-board" className={H2}>If your Class 10 or 12 is from an international board</h2>
      <p>
        Most foreign nationals and many NRIs studied outside the Indian board system entirely, and that
        raises a separate question from nationality: does the qualification itself count. {PARIKSHA.aiu.whenNeeded}{' '}
        The equivalence certificate is obtained from the {PARIKSHA.aiu.body}. {PARIKSHA.aiu.diploma}
      </p>
      <p>
        The Board Verification Certificate follows its own route for an international qualification too:{' '}
        {PARIKSHA.bvc.internationalBoards.toLowerCase()} {PARIKSHA.bvc.noColourPhotocopies} And where a
        board offers online verification, {PARIKSHA.bvc.onlineVerification.toLowerCase()}
      </p>
      <p>
        This is a separate track from the NIOS bridge route Indian Commerce and Biology stream students
        use to add Physics and Mathematics &mdash; that route is for a candidate already inside an Indian
        board, not for an international qualification. If that is your situation instead, our guide to{' '}
        <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className="text-av-orange font-semibold underline">becoming a pilot without Physics and Maths in Class 12</Link>{' '}
        covers it in full.
      </p>

      <h2 id="comparison" className={H2}>Indian candidate vs foreign national, side by side</h2>
      <p>
        One table, drawn line by line from the same source documents, is the fastest way to see exactly
        where the two routes diverge and where they do not.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Requirements for an Indian candidate compared with a foreign national candidate on DGCA&rsquo;s Pariksha portal</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Area</th>
              <th scope="col" className={TH}>Indian candidate</th>
              <th scope="col" className={TH}>Foreign national</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((r, i) => (
              <tr key={r.area} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.area}</td>
                <td className={TD}>{r.indian}</td>
                <td className={TD}>{r.foreign}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="categories" className={H2}>Every category open on the same portal</h2>
      <p>
        Nationality does not close off any licence category either. The same seven categories Pariksha
        registers Indian candidates for are open to a foreign national who clears the extra steps above.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Flight crew categories open for registration on the DGCA Pariksha portal</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Category</th>
              <th scope="col" className={TH}>What it is</th>
            </tr>
          </thead>
          <tbody>
            {categoryRows.map((r, i) => (
              <tr key={r.category} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue whitespace-nowrap`}>{r.category}</td>
                <td className={TD}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="digilocker" className={H2}>Why the fast-track computer number route is closed to you</h2>
      <p>
        Since October 2025, an Indian candidate whose board publishes to DigiLocker and whose Aadhaar
        record matches can get a computer number allotted immediately on submission, instead of waiting
        for manual scrutiny. It is a genuinely fast route, and it is worth knowing before you plan a
        timeline &mdash; because it is not available to a foreign national at all.
      </p>
      <p>
        The conditions for that route include Indian nationality and a matching Aadhaar record, and{' '}
        {PARIKSHA.digilocker.whoStillGoesManual.toLowerCase()} A foreign national should plan around the
        manual route as the only route: the standard {PARIKSHA.processing.days}-working-day processing
        window on a complete application, with the usual Board Verification Certificate and scrutiny in
        place of the instant allotment.
      </p>

      <BlogImagePlaceholder
        src="/blog/foreign-national-nri-pilot-training-india/manual-vs-digilocker-route.webp"
        width={1200}
        height={800}
        alt="Two simple paths branching from one starting point, one short path leading to an instant result and one longer path with several steps leading to the same destination, representing the DigiLocker route being closed to foreign nationals"
        promptId="63"
      />

      <h2 id="after" className={H2}>After the computer number: medical, papers and RTR (A)</h2>
      <p>
        Once the computer number is allotted, the process stops distinguishing between an Indian candidate
        and a foreign one. {MEDICAL.long} has to be arranged with a DGCA-empanelled examiner in India
        &mdash; {MEDICAL.advice.toLowerCase()} The written examinations are the same {DGCA_PAPERS.length}
        papers every candidate sits: {DGCA_PAPERS.join(', ')}. {RTR.note}
      </p>
      <p>
        This is the point worth stating plainly, because it is the mistake this article&rsquo;s title most
        often gets confused with: a foreign national training in India from scratch is not the same case
        as a candidate converting an already-held foreign licence, and does not get that route&rsquo;s
        reduced two-paper set. The reduced set exists for someone who has already qualified and flown
        under another country&rsquo;s regulator; a foreign national starting fresh in India has not, and
        sits the full set like everyone else training here for the first time.
      </p>

      <h2 id="visa" className={H2}>What DGCA&rsquo;s process does not cover</h2>
      <p>
        Nothing in the Pariksha FAQ, the Flight Crew User Manual or the computer-number rejection reasons
        mentions a visa category, a student permit, or FRRO registration. That is deliberate on our part,
        not an oversight in the source material: DGCA&rsquo;s process establishes eligibility to sit
        examinations and eventually hold a licence, and it is silent on the separate question of what
        legally allows a foreign national to live and train in India for the months that takes. Confirm
        the correct visa route with the flying school you enrol at and with an Indian mission before
        committing, and treat a computer number as evidence of examination eligibility only, never as
        proof of immigration status.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We teach the DGCA ground subjects from Dwarka, and the syllabus is identical whether a student
        registered on Pariksha through the ordinary route or the foreign-national one &mdash; the same{' '}
        {DGCA_PAPERS.length} papers, taught to the same standard. What differs is the paperwork before
        classes start, and that is worth getting right on the first attempt: a rejected foreign-national
        application does not just cost time, it costs a resubmission through the same security-clearance
        step.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
