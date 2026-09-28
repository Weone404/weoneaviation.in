import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import {
  ACADEMY, LICENCES, EDUCATION, EXAM_RULES, PARIKSHA, AVIATION_CAREERS, inr,
} from '../../lib/facts';

/*
 * /blogs/how-to-become-a-flight-dispatcher-in-india — new 2026-09-28.
 *
 * WHY THIS TOPIC. /blogs/aviation-jobs-besides-pilot is a pillar covering five
 * DGCA-licensed careers in one page (AME, FDEG, FE, FN, ATC) at one paragraph
 * each. Flight Dispatcher (FDEG) is the one of those five with enough
 * independently sourced detail to carry its own long-tail page without
 * padding: age and education criteria that appear in the same CAR already
 * cited in lib/facts.js EXAM_RULES, and an examination fee that matches
 * PARIKSHA.fees exactly. It is not a CPL-adjacent rating and not a pilot
 * topic at all, so it needs no post-CPL justification — it is the same
 * adjacent-career content strategy the pillar page already established.
 *
 * SOURCING, AND WHERE THIS DELIBERATELY STOPS SHORT.
 *   Age 21 and "10+2 with Physics and Mathematics" for FDEG were read from two
 *   independent sources that describe the same underlying document: the DGCA
 *   Pariksha FDEG FAQ, and a hosted copy of Civil Aviation Requirement,
 *   Section 7, Series 'B', Part I, Rev. 2 dated 13 February 2019 — literally
 *   the same CAR already cited in lib/facts.js as EXAM_RULES.car, titled
 *   "Eligibility Criteria for Examinations for Issue of Crew Licences" (a
 *   crew-licence document, not a pilot-only one). That convergence is why this
 *   page cites EXAM_RULES.car for the FDEG age and education lines rather than
 *   inventing a new citation object.
 *
 *   The examination fee is not restated as a new fact — PARIKSHA.fees already
 *   holds it, and a search on DGCA's own FDEG FAQ text matches it to the
 *   rupee, so this page imports PARIKSHA rather than retyping the number.
 *
 *   DELIBERATELY NOT HERE: which specific institute runs FDEG training, which
 *   CAR series governs the training syllabus, and the FDEG-specific oral pass
 *   mark. Secondary aviation-careers sites name a training CAR and a named
 *   institute, but neither could be verified against a DGCA-hosted document
 *   this session (DGCA's own portal was not reachable), and EXAM_RULES.oral
 *   does not itemise FDEG. Per the standing rule, an unread figure is left out
 *   and the reader is pointed at Pariksha to confirm the current training
 *   route rather than being given a name that could already be stale.
 *
 * CLAIMS DISCIPLINE. No salary, no hiring-rate, no placement claim, and no
 * claim that this academy trains dispatchers — it does not, and the closing
 * section says so, matching the pattern already set on the pillar page.
 */

const DATE_PUBLISHED = '2026-09-28';
const DATE_MODIFIED = '2026-09-28';
const CANONICAL = 'https://weoneaviation.in/blogs/how-to-become-a-flight-dispatcher-in-india';

const CPL = LICENCES.find((l) => l.code === 'CPL');
const AME = AVIATION_CAREERS.licensed.find((c) => c.role.includes('Aircraft Maintenance'));
const FDEG = AVIATION_CAREERS.licensed.find((c) => c.role.includes('Flight Dispatcher'));

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Become a Flight Dispatcher in India: DGCA FDEG Eligibility Explained',
  description:
    "What a DGCA Flight Dispatcher (FDEG) licence actually requires: the age and education criteria from the same Civil Aviation Requirement that governs pilot examinations, how registration works on the Pariksha portal, and how the role and its eligibility compare with a Commercial Pilot Licence and an AME licence.",
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Aviation careers',
  keywords: 'flight dispatcher India, FDEG licence DGCA, how to become a flight dispatcher, DGCA flight dispatcher eligibility, aviation careers besides pilot',
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
    q: 'Is a flight dispatcher the same as air traffic control?',
    a: 'No. A flight dispatcher works with the airline before and during a flight — planning the route, fuel and payload jointly with the captain, and sharing legal responsibility for the flight\'s release. Air traffic control separates and sequences aircraft in the air and on the ground, holds a different DGCA medical class, and works for the airport or airspace authority rather than the airline.',
  },
  {
    q: 'Do I need Chemistry for a flight dispatcher licence?',
    a: `No. ${EDUCATION.requirement} is the FDEG requirement, the same two subjects a CPL needs. Chemistry is only added for an Aircraft Maintenance Engineer application, which needs ${AME?.education?.toLowerCase()}.`,
  },
  {
    q: 'Do I need a DGCA medical certificate to become a flight dispatcher?',
    a: 'DGCA’s medical classes are published for pilot licences and for air traffic control, and neither list names a class for the Flight Dispatcher category specifically. Confirm the current position directly with DGCA or the Pariksha Help Desk before assuming either way, rather than relying on a figure this page cannot source.',
  },
  {
    q: 'Can a CPL holder become a flight dispatcher instead of flying?',
    a: 'The two are separate DGCA flight-crew categories with their own computer numbers, so a CPL is not required for FDEG and does not automatically qualify someone for it either. A pilot considering the switch would register for the FDEG category on Pariksha and meet its own examination and training requirements, the same as any other candidate.',
  },
  {
    q: 'Where do I register to become a flight dispatcher in India?',
    a: `${PARIKSHA.basics.definition} FDEG is one of the categories a candidate can apply under on ${PARIKSHA.portal}, examined by the same Central Examination Organisation that examines pilots, under ${PARIKSHA.authority.rule}.`,
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
  { lead: 'For the other DGCA-licensed careers besides flying, and how to choose between them, see', anchor: 'our guide to aviation jobs besides pilot', href: '/blogs/aviation-jobs-besides-pilot' },
  { lead: 'For how the DGCA written papers, pass mark and validity windows actually work, read', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'For what the pilot route itself requires, start with', anchor: 'our complete guide to pilot training', href: '/blogs/what-is-pilot-training-complete-guide' },
  { lead: 'If flying is the route you actually want, our', anchor: 'CPL eligibility guide', href: '/commercial-pilot-license-eligibility' },
  { lead: 'For the Aircraft Maintenance Engineer route this page compares FDEG against, see', anchor: 'the AME page', href: '/ame-aircraft-maintenance-engineer' },
];

const tocHeadings = [
  { id: 'what-is-it', title: 'What does a flight dispatcher actually do?' },
  { id: 'licensed', title: 'Is it really a DGCA-licensed category?' },
  { id: 'eligibility', title: 'Age and education requirements' },
  { id: 'comparison', title: 'FDEG vs CPL vs AME, side by side' },
  { id: 'register', title: 'How do you register?' },
  { id: 'exam', title: 'What does the examination cost?' },
  { id: 'training', title: 'Where does the training happen?' },
  { id: 'other-crew', title: 'What about Flight Engineer and Flight Navigator?' },
  { id: 'choosing', title: 'Is this the right route for you?' },
  { id: 'faqs', title: 'Frequently asked questions' },
  { id: 'sources', title: 'Sources' },
];

const comparison = [
  { aspect: 'Minimum age', fdeg: '21 years', cpl: `${CPL.minAge} years`, ame: `${AME?.minAge} years` },
  { aspect: 'Education', fdeg: EDUCATION.requirement, cpl: EDUCATION.requirement, ame: AME?.education || '' },
  { aspect: 'Governing rule', fdeg: `${EXAM_RULES.car.citation} (eligibility criteria for crew licences)`, cpl: `${CPL.section}, Aircraft Rules, 1937, plus ${EXAM_RULES.car.citation}`, ame: AME?.governedBy || '' },
  { aspect: 'Registers on', fdeg: 'DGCA Pariksha, category FDEG', cpl: 'DGCA Pariksha, category CPL', ame: 'DGCA Pariksha, same portal' },
  { aspect: 'Examination fee', fdeg: `${inr(PARIKSHA.fees.regularPerPaper)} a paper regular, ${inr(PARIKSHA.fees.olodePerPaper)} on demand`, cpl: `${inr(PARIKSHA.fees.regularPerPaper)} a paper regular, ${inr(PARIKSHA.fees.olodePerPaper)} on demand`, ame: `${inr(AME?.examFeeRegular)} a module regular, ${inr(AME?.examFeeOlode)} on demand` },
  { aspect: 'Flying hours required', fdeg: 'None', cpl: '200 hours', ame: 'None' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const A = 'text-av-orange font-semibold underline';

export default function HowToBecomeAFlightDispatcherInIndia() {
  return (
    <BlogPostLayout
      title="How to Become a Flight Dispatcher in India: DGCA FDEG Eligibility"
      description="What a DGCA Flight Dispatcher (FDEG) licence actually requires — age, education, registration on Pariksha, examination fees, and how it compares with a CPL and an AME licence."
      schema={[articleSchema, faqSchema]}
      heading="How to Become a Flight Dispatcher in India: DGCA FDEG Eligibility Explained"
      category="Aviation careers"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="8 min"
      quickAnswer={{
        question: 'What does it take to become a flight dispatcher in India?',
        answer: `A Flight Dispatcher (FDEG) plans and releases flights jointly with the captain — route, fuel, weather and payload — and holds a separate DGCA flight-crew licence, examined under the same Civil Aviation Requirement that sets pilot eligibility. The requirements: minimum age 21, ${EDUCATION.requirement.toLowerCase()}, and registration on the DGCA Pariksha portal, the same portal a pilot candidate uses.`,
      }}
      summaryTitle="FDEG, in one view"
      summaryItems={[
        'A Flight Dispatcher is one of DGCA’s flight-crew examination categories, alongside PPL, CPL, ATPL, FE and FN',
        `Minimum age 21, and ${EDUCATION.requirement.toLowerCase()} — the same two subjects a CPL needs, not the three an AME needs`,
        `Governed by ${EXAM_RULES.car.citation}, the same CAR that sets the CPL's 70%-per-subject pass mark`,
        `Registration and the computer number run through Pariksha, under ${PARIKSHA.authority.rule}`,
        `Examination fee: ${inr(PARIKSHA.fees.regularPerPaper)} a paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} on demand — the same fee schedule as a pilot paper`,
        'No flying hours and no DGCA medical class is published for this category',
        'We One Aviation teaches the pilot ground subjects only and does not train dispatchers',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/flight-dispatcher-india/hero-dispatcher-and-captain.webp"
        width={1200}
        height={630}
        alt="A flight dispatcher at a desk with a route map and weather chart on one side, facing a pilot in uniform on the other, both reviewing the same flight plan document"
        promptId="77"
      />

      <h2 id="what-is-it" className={H2}>What does a flight dispatcher actually do?</h2>
      <p>
        {FDEG?.what} That joint responsibility is the detail most pilot-focused pages skip: a flight
        is not released on the captain&rsquo;s decision alone. The dispatcher shares it, working out
        the route, the fuel load, the weather picture and whether the whole operation is legal before
        the aircraft ever pushes back.
      </p>
      <p>
        It is a ground-based, airline-facing role. No flying hours are logged, no cockpit time is
        required, and the licence sits entirely apart from anything a pilot holds.
      </p>

      <h2 id="licensed" className={H2}>Is it really a DGCA-licensed category?</h2>
      <p>
        Yes, and this is the part worth being precise about, because most pages on aviation careers
        blur licensed roles with unlicensed ones. {FDEG?.note} DGCA&rsquo;s Pariksha portal — the same
        one a Commercial Pilot Licence candidate registers on — lists FDEG among its flight crew
        categories, examined through the Central Examination Organisation under {PARIKSHA.authority.rule}.
        A flight dispatcher in India is not a job title an airline invents; it is a DGCA examination
        category with its own eligibility criteria, the same as a pilot licence.
      </p>

      <h2 id="eligibility" className={H2}>What are the age and education requirements?</h2>
      <p>
        A minimum age of 21, and {EDUCATION.requirement.toLowerCase()}. Both criteria sit in the same
        document already behind this site&rsquo;s pilot-examination pages: {EXAM_RULES.car.citation},
        titled &ldquo;{EXAM_RULES.car.title}&rdquo; — a document that covers crew licences generally,
        not pilots exclusively.
      </p>
      <p>
        The education line is the one worth reading twice. It is the same combination a CPL needs
        &mdash; Physics and Mathematics at 10+2 &mdash; and not the Physics, Chemistry and Mathematics
        combination an Aircraft Maintenance Engineer application needs. A student who dropped Chemistry
        but kept Physics and Mathematics is still eligible for FDEG, even where an AME application
        would not be.
      </p>

      <h2 id="comparison" className={H2}>How does FDEG compare with a CPL and an AME licence?</h2>
      <p>
        Three DGCA-licensed routes, one portal, three different entry bars. The flying-hours column is
        where the real difference sits.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Flight Dispatcher, Commercial Pilot Licence and AME eligibility compared</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Aspect</th>
              <th scope="col" className={TH}>Flight Dispatcher (FDEG)</th>
              <th scope="col" className={TH}>Commercial Pilot Licence</th>
              <th scope="col" className={TH}>AME</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row, i) => (
              <tr key={row.aspect} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{row.aspect}</td>
                <td className={TD}>{row.fdeg}</td>
                <td className={TD}>{row.cpl}</td>
                <td className={TD}>{row.ame}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The examination fee lining up exactly between FDEG and CPL is not a coincidence — both are
        flight-crew categories charged on the same DGCA fee schedule. The AME fee sits on a separate
        schedule entirely, because AME is examined as an engineering qualification rather than a
        flight-crew one.
      </p>

      <BlogImagePlaceholder
        src="/blog/flight-dispatcher-india/three-doors-one-portal.webp"
        width={1200}
        height={800}
        alt="Three separate doors of different heights leading off a single shared corridor, representing the flight dispatcher, pilot and AME routes registering through one common DGCA portal"
        promptId="78"
      />

      <h2 id="register" className={H2}>How do you actually register?</h2>
      <p>
        Through the same computer-number process a pilot candidate uses. {PARIKSHA.basics.definition}{' '}
        FDEG is one of the categories offered at registration, alongside PPL, CPL, ATPL, FE and FN. The
        document checks — name matching exactly across your Class 10 and Class 12 records, the same
        photograph and signature specifications, the same Board Verification Certificate rule for a new
        candidate&rsquo;s marksheets — are identical to the pilot process, because it is the same portal
        and the same eligibility CAR behind it. Our{' '}
        <Link href="/dgca-computer-number" className={A}>DGCA computer number guide</Link> walks through
        every one of those steps in detail; none of it changes for an FDEG applicant.
      </p>

      <h2 id="exam" className={H2}>What does the examination cost?</h2>
      <p>
        {inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, {inr(PARIKSHA.fees.olodePerPaper)}{' '}
        in an Online On-Demand Examination — the identical fee a pilot candidate pays, because both sit
        on DGCA&rsquo;s Flight Crew Licence examination fee schedule. {PARIKSHA.fees.serviceCharge} The
        theory pass mark and paper-validity rules that govern pilot papers come from the same CAR that
        sets FDEG eligibility; our{' '}
        <Link href="/blogs/dgca-exam-guide" className={A}>DGCA exam guide</Link> covers those mechanics in
        full rather than repeating them here.
      </p>

      <h2 id="training" className={H2}>Where does the training happen?</h2>
      <p>
        This is the one part of the FDEG route this page will not spell out, on purpose. Sources
        describing a specific dispatcher-training curriculum and a specific approved institute exist,
        but none of them could be checked here against a document on a DGCA server, and a stale name
        printed on a page is worse than no name at all. Confirm the current DGCA-approved training
        route directly through the Pariksha Help Desk or the portal&rsquo;s own FAQ before enrolling
        anywhere, the same caution this site applies to its own claims about flying training organisations.
      </p>

      <h2 id="other-crew" className={H2}>What about Flight Engineer and Flight Navigator?</h2>
      <p>
        {AVIATION_CAREERS.licensed.find((c) => c.role.startsWith('Flight Engineer'))?.what}{' '}
        {AVIATION_CAREERS.licensed.find((c) => c.role.startsWith('Flight Navigator'))?.what}{' '}
        Both are DGCA flight crew examination categories on the same Pariksha portal as FDEG, examined
        through the same Central Examination Organisation. Neither has a published age or education
        criterion this site could verify to the same standard as FDEG&rsquo;s, which is exactly why they
        do not get their own comparison row above — a requirement this page cannot read from a document
        is a requirement it will not print.
      </p>

      <h2 id="choosing" className={H2}>Is this the right route for you?</h2>
      <p>
        FDEG suits someone who wants to be inside airline flight operations — the planning, the
        legality, the weather and fuel decisions — without funding 200 hours of flying time or
        clearing a Class 1 medical. It is not a stepping stone to a pilot licence and a pilot licence
        is not a stepping stone to it; they are parallel DGCA categories with their own eligibility,
        registered on the same portal.
      </p>
      <p>
        If flying is genuinely what you want, the education and age bar is nearly identical, and the
        difference is entirely in the 200 hours and the medical. Read the{' '}
        <Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility guide</Link>{' '}
        before deciding between the two, rather than assuming FDEG is a lighter version of the same
        career — it is a different career that happens to share a registration portal.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />

      <h2 id="sources" className={H2}>Sources</h2>
      <ul className="space-y-2 mb-8">
        <li className="flex gap-2 items-start text-sm text-gray-600">
          <span className="text-av-orange font-bold flex-shrink-0">–</span>
          {EXAM_RULES.car.citation} — {EXAM_RULES.car.title}
        </li>
        {AVIATION_CAREERS.sources.filter((s) => s.label.startsWith('Reasons for rejection')).map((s) => (
          <li key={s.url} className="flex gap-2 items-start text-sm text-gray-600">
            <span className="text-av-orange font-bold flex-shrink-0">–</span>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
          </li>
        ))}
        <li className="flex gap-2 items-start text-sm text-gray-600">
          <span className="text-av-orange font-bold flex-shrink-0">–</span>
          DGCA Pariksha portal, {PARIKSHA.portal} — flight crew categories and computer number registration
        </li>
      </ul>

      <div className="bg-av-blue rounded-2xl p-6">
        <p className="text-white/80 text-sm leading-relaxed mb-2">{ACADEMY.scope}</p>
        <p className="text-white/60 text-xs leading-relaxed">
          We teach the pilot ground subjects. We do not train flight dispatchers, and nothing on this
          page should be read as an offer to — if FDEG is the route you want, use it to ask the right
          questions of a dispatcher-training organisation, not of us.
        </p>
      </div>
    </BlogPostLayout>
  );
}
