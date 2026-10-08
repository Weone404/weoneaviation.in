import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import {
  ACADEMY, LICENCES, EDUCATION, PARIKSHA, MEDICAL_STANDARDS, AVIATION_CAREERS,
  CPL_HOURS, DGCA_PAPERS, RTR, CPL_COST, COST_NOTE, EGCA, FTO, inr,
} from '../../lib/facts';

/*
 * /blogs/aviation-course-after-12th — REWRITTEN 2026-10-08 to data/blog-standard.md.
 *
 * WHAT CHANGED AND WHY.
 *   - Intent. The old page was titled "How to Become a Pilot After 12th" and so
 *     competed with /how-to-become-a-pilot-after-12th, the page that owns that
 *     query. Every internal link to this URL already called it "our aviation
 *     courses after 12th guide", and the slug says the same. It is now that: a
 *     decision guide comparing the routes a Class 12 student can actually start,
 *     and it sends the pilot-route reader to the page that owns it.
 *   - Claims removed, none restated: a physical-standards table (165 cm height,
 *     BMI 18.5-25, 6/6 vision, 20 dB hearing) that no DGCA document states — the
 *     medical CAR publishes no numeric vision figure, see MEDICAL_STANDARDS; a
 *     "13% job growth to 2030" tile; NDA, CDS, AFCAT and NCC age bands and
 *     commission terms typed from memory; "200-250 flight hours"; a ten-step
 *     "selection process" with entrance exams no regulator sets; about forty
 *     emoji. Air Force entry is now described by who sets it, with a link to the
 *     body that publishes the current notification.
 *   - Its pageFaqs.js routeContent entry repeated the same unsourced figures and
 *     was deleted in the same commit; this page now emits its own FAQPage.
 *
 * Every figure below is imported from lib/facts.js.
 */
const DATE_PUBLISHED = '2025-01-02';
const DATE_MODIFIED = '2026-10-08';
const CANONICAL = 'https://weoneaviation.in/blogs/aviation-course-after-12th';

const SPL = LICENCES.find((l) => l.code === 'SPL');
const PPL = LICENCES.find((l) => l.code === 'PPL');
const CPL = LICENCES.find((l) => l.code === 'CPL');
const AME = AVIATION_CAREERS.licensed.find((c) => c.role.startsWith('Aircraft Maintenance'));
const class1 = MEDICAL_STANDARDS.classes.find((c) => c.cls === 'Class 1');
const class2 = MEDICAL_STANDARDS.classes.find((c) => c.cls === 'Class 2');
const igrua = CPL_COST.benchmark;

// Lower-case the first letter only, and leave acronyms (DGCA, RTR, AME) alone.
const lc = (t) => (/^[A-Z]{2}/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1));
const HOURS_PHRASE = {
  '1(e)(i)': 'as pilot-in-command',
  '1(e)(ii)': 'of cross-country flying as pilot-in-command',
  '1(e)(iii)': 'of instrument time',
  '1(e)(iv)': 'at night',
};

const hoursParts = CPL_HOURS.components.map((c) => `${c.hours} hours ${HOURS_PHRASE[c.clause]}`);
const hoursList = `${hoursParts.slice(0, -1).join(', ')} and ${hoursParts[hoursParts.length - 1]}`;

const TITLE = 'Aviation Courses After 12th in India: Which Route Needs What';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: TITLE,
  description:
    'Aviation courses after 12th in India compared: commercial pilot, private pilot, aircraft maintenance engineer, flight dispatcher and Air Force entry, with the subjects, minimum age and medical each one needs.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'After 12th',
  keywords: 'aviation courses after 12th, aviation course after 12th in India, pilot course after 12th, AME course after 12th, aviation career after 12th',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/blog/aviation-course-after-12th/hero-after-12th-routes.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const peopleAlsoAsk = [
  {
    q: 'Which aviation course can I do after 12th?',
    a: `After Class 12 you can start the commercial pilot route (CPL), a private pilot licence (PPL), aircraft maintenance engineering (AME), or apply for Air Force pilot entry through the UPSC. A flight dispatcher licence is also open, but it has its own higher minimum age. Each route has different subject, age and medical requirements.`,
  },
  {
    q: 'Which subjects do I need in 12th to become a commercial pilot in India?',
    a: `A Commercial Pilot Licence needs ${EDUCATION.requirement} (Aircraft Rules, 1937, Schedule II, ${EDUCATION.clause}). There is no minimum percentage in that rule. ${EDUCATION.altRoute}`,
  },
  {
    q: 'Do I need Chemistry for an aviation course after 12th?',
    a: `Chemistry depends on the course. The pilot categories on the DGCA Pariksha portal need Physics and Mathematics in 10+2. An Aircraft Maintenance Engineer candidate needs ${lc(AME.education)}`,
  },
  {
    q: 'Can I start pilot training at 16 or 17?',
    a: `Yes. The Student Pilot Licence has a minimum age of ${SPL.minAge} and the Private Pilot Licence ${PPL.minAge}, and the DGCA computer number can be applied for from ${PARIKSHA.basics.minAge}. The Commercial Pilot Licence itself cannot be issued before ${CPL.minAge}, so a student who starts early still receives the CPL at ${CPL.minAge} at the earliest.`,
  },
  {
    q: 'Which medical do I need for an aviation course after 12th?',
    a: `A commercial pilot needs a DGCA Class 1 medical; a student or private pilot needs a Class 2. The initial Class 1 is done only at the centres DGCA lists for initial issue, and the fee DGCA lists for it at the Air Force centres is ${MEDICAL_STANDARDS.fees.rows[0].label}. Book it before paying any flying school, because a disqualifying finding after a deposit is expensive.`,
  },
  {
    q: 'How much does an aviation course after 12th cost?',
    a: `${COST_NOTE} For a reference point, IGRUA publishes ${igrua.feeLabel} for its ab-initio to CPL course, which excludes items such as uniform, study material, DGCA fees, hostel and messing.`,
  },
  {
    q: 'Is a BSc in Aviation the same as a pilot licence?',
    a: `No. A pilot licence is issued by DGCA under Schedule II of the Aircraft Rules, 1937, after the written papers, the radio telephony examination, the medical and the flying hours. A degree, in aviation or anything else, does not replace any of those steps, so ask any degree provider which DGCA licence its course leads to.`,
  },
  {
    q: 'How do I join the Indian Air Force as a pilot after 12th?',
    a: `Entry to the Air Force flying branch straight after Class 12 is through the National Defence Academy examination conducted by the UPSC. The age band, subjects and medical standards are set in each UPSC notification and change between cycles, so read the current notification on upsc.gov.in rather than a figure copied onto a website.`,
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

const routes = [
  {
    route: 'Commercial pilot (CPL)',
    subjects: 'Physics and Mathematics in 10+2',
    age: `${CPL.minAge} for the licence; training can start earlier`,
    medical: 'DGCA Class 1',
    regulator: 'DGCA',
  },
  {
    route: 'Private pilot (PPL)',
    subjects: 'Class 10 pass',
    age: `${PPL.minAge}`,
    medical: 'DGCA Class 2',
    regulator: 'DGCA',
  },
  {
    route: 'Aircraft maintenance engineer (AME)',
    subjects: 'Physics, Chemistry and Mathematics in 10+2',
    age: `${AME.minAge} to register as a candidate`,
    medical: 'Not stated in the sources we read',
    regulator: 'DGCA',
  },
  {
    route: 'Flight dispatcher (FDEG)',
    subjects: 'Physics and Mathematics in 10+2',
    age: 'Higher than the CPL; see the dispatcher guide',
    medical: 'Not stated in the sources we read',
    regulator: 'DGCA',
  },
  {
    route: 'Air Force pilot',
    subjects: 'Set in each UPSC notification',
    age: 'Set in each UPSC notification',
    medical: 'Armed forces standards',
    regulator: 'UPSC and the Indian Air Force',
  },
];

const related = [
  { lead: 'The pilot route step by step, from Class 12 to the licence, is on', anchor: 'how to become a pilot after 12th', href: '/how-to-become-a-pilot-after-12th' },
  { lead: 'If Physics or Mathematics is missing from your marksheet, read', anchor: 'becoming a pilot without Physics and Maths in Class 12', href: '/blogs/become-pilot-without-physics-and-maths-class-12' },
  { lead: 'The licensed careers other than flying are compared in', anchor: 'aviation jobs besides pilot', href: '/blogs/aviation-jobs-besides-pilot' },
  { lead: 'The flight dispatcher licence, with its own age rule, is covered in', anchor: 'how to become a flight dispatcher in India', href: '/blogs/how-to-become-a-flight-dispatcher-in-india' },
  { lead: 'What a CPL actually costs, and what can be compared, is in', anchor: 'our pilot training cost breakdown', href: '/blogs/pilot-training-cost-in-india' },
];

const tocHeadings = [
  { id: 'routes', title: 'Which aviation courses can you start after 12th?' },
  { id: 'subjects', title: 'Which subjects does each route need?' },
  { id: 'pilot', title: 'What does the commercial pilot route involve?' },
  { id: 'medical', title: 'Which medical comes first?' },
  { id: 'other-routes', title: 'AME, dispatcher and Air Force entry' },
  { id: 'degree', title: 'Is an aviation degree a licence?' },
  { id: 'cost', title: 'What can and cannot be said about cost' },
  { id: 'first-month', title: 'What to do in your first month after results' },
];

const sources = [
  ...PARIKSHA.sources.slice(0, 3),
  MEDICAL_STANDARDS.sources[2],
  ...AVIATION_CAREERS.sources.slice(0, 1),
  FTO.sources[0],
  { label: 'IGRUA — approved courses and fees (Indira Gandhi Rashtriya Uran Akademi)', url: igrua.source },
  { label: 'Union Public Service Commission — examination notifications', url: 'https://upsc.gov.in' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const H3 = 'font-montserrat text-xl font-bold text-av-blue mt-8 mb-3';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const LINK = 'text-av-orange font-semibold underline';

export default function AviationCourseAfter12th() {
  return (
    <BlogPostLayout
      title="Aviation Courses After 12th in India: Eligibility by Route"
      description="Aviation courses after 12th in India compared: CPL, PPL, AME, flight dispatcher and Air Force entry, with the subjects, age and medical each one needs."
      schema={[articleSchema, faqSchema]}
      heading={TITLE}
      category="After 12th"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="9 min"
      quickAnswer={{
        question: 'Which aviation courses can you do after 12th in India?',
        answer: `The main routes are the commercial pilot licence (needs Physics and Mathematics in 10+2, licence at ${CPL.minAge}), the private pilot licence (Class 10, age ${PPL.minAge}), aircraft maintenance engineering (Physics, Chemistry and Mathematics), the flight dispatcher licence, and Air Force entry through the UPSC. Each has its own subject, age and medical rule.`,
      }}
      summaryTitle="The routes in one view"
      summaryItems={[
        `CPL: ${EDUCATION.requirement}; licence issued at ${CPL.minAge} at the earliest; Class 1 medical.`,
        `PPL: Class 10 is enough for the DGCA paperwork; minimum age ${PPL.minAge}; Class 2 medical.`,
        'AME: Physics, Chemistry and Mathematics in 10+2 — the one route where Chemistry is required.',
        'Air Force pilot: eligibility is set by the UPSC in each notification, not by DGCA.',
        `Sources: Aircraft Rules, 1937, Schedule II and DGCA Pariksha documents, read ${PARIKSHA.verifiedOn}; DGCA medical CAR, read ${MEDICAL_STANDARDS.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
    >
      <p>
        Results are out, and the advice arrives from every side at once. A relative says aviation
        means a pilot licence, a coaching flyer advertises a "pilot course after 12th", a
        friend is joining an AME college, and somebody else mentions the Air Force. They are
        not versions of the same thing. Each aviation course after 12th sits under a different rule,
        asks for different Class 12 subjects, starts at a different age and needs a different
        medical. This guide lines the real routes up side by side, from the documents that govern
        them, so you can see which ones your marksheet already opens and what to do first.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/aviation-course-after-12th/hero-after-12th-routes.webp"
        width={1200}
        height={630}
        alt="A student holding a Class 12 marksheet at a fork of signposted paths leading to a small trainer aircraft, a maintenance hangar and an operations desk"
        promptId="9"
      />

      <h2 id="routes" className={H2}>Which aviation courses can you start after 12th?</h2>
      <p>
        Five aviation routes can be started straight after Class 12 in India: the commercial pilot
        licence, the private pilot licence, aircraft maintenance engineering, the flight dispatcher
        licence and Air Force pilot entry. The first four are licensed by DGCA; the Air Force route is
        run by the UPSC and the Indian Air Force under their own rules.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Aviation routes open after Class 12 in India, with subjects, minimum age, medical and the body that sets the rules</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Route</th>
              <th scope="col" className={TH}>Class 12 subjects</th>
              <th scope="col" className={TH}>Minimum age</th>
              <th scope="col" className={TH}>Medical</th>
              <th scope="col" className={TH}>Rules set by</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r, i) => (
              <tr key={r.route} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.route}</td>
                <td className={TD}>{r.subjects}</td>
                <td className={TD}>{r.age}</td>
                <td className={TD}>{r.medical}</td>
                <td className={TD}>{r.regulator}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Cabin crew, ground handling and airport operations are real aviation careers too, and many
        students start them after Class 12. {AVIATION_CAREERS.notLicensedNote.split('. ').slice(1).join('. ')}
        {' '}Our guide to{' '}
        <Link href="/blogs/aviation-jobs-besides-pilot" className={LINK}>aviation jobs besides pilot</Link>{' '}
        draws that line career by career.
      </p>

      <h2 id="subjects" className={H2}>Which Class 12 subjects does each aviation route need?</h2>
      <p>
        Physics and Mathematics in 10+2 are required for every DGCA flight crew route except the
        private pilot licence, and the aircraft maintenance engineer route adds Chemistry. DGCA sets no
        minimum percentage for the pilot licence in Schedule II; the subject has to be passed, from a
        recognised board.
      </p>
      <p>
        DGCA states both requirements side by side in its own{' '}
        <Ext href={PARIKSHA.sources[2].url}>list of reasons for rejecting computer number applications</Ext>,
        which is the clearest place to see them. Every pilot category other than the PPL needs{' '}
        {EDUCATION.requirement}. The PPL needs only the Class 10 pass. An AME candidate needs{' '}
        {lc(AME.education)}
      </p>
      <h3 className={H3}>What if Physics or Mathematics is missing?</h3>
      <p>
        A Commerce or Biology student is not shut out of the pilot route. {EDUCATION.altRoute} The
        detail, including what the computer number application then needs, is in our guide to{' '}
        <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className={LINK}>
          becoming a pilot without Physics and Maths in Class 12
        </Link>. A standalone private pilot licence is the exception, and{' '}
        <Link href="/blogs/ppl-physics-maths-requirement-india" className={LINK}>the PPL subject rule</Link>{' '}
        explains why it does not carry over once a CPL becomes the goal.
      </p>

      <h2 id="pilot" className={H2}>What does the commercial pilot route involve after 12th?</h2>
      <p>
        The commercial pilot route after 12th has five parts that DGCA checks before it issues the
        licence: the {DGCA_PAPERS.length} written papers, the {RTR.name} radio telephony examination,
        a Class 1 medical, {CPL_HOURS.total} hours of flying, and a minimum age of {CPL.minAge}. None of
        them is replaced by a course certificate or a degree.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li><strong>The written papers.</strong> {DGCA_PAPERS.join(', ')}, booked through the{' '}
          <Ext href={PARIKSHA.portal}>DGCA Pariksha portal</Ext> with a computer number you can apply for from age {PARIKSHA.basics.minAge}.
        </li>
        <li><strong>Radio telephony.</strong> {RTR.note}</li>
        <li><strong>Flying.</strong> {CPL_HOURS.total} hours in total, including {hoursList}. Those sit inside the {CPL_HOURS.total}, not on top of it.</li>
        <li><strong>The licence application.</strong> Made on{' '}
          <Ext href={EGCA.url}>eGCA</Ext>, DGCA&rsquo;s licensing portal, once the papers, medical, radio licence and logbook are complete.
        </li>
      </ul>
      <p>
        Ground subjects and flying can run in either order, and many students clear papers while they
        wait for a flying slot. The full sequence, with the documents for each step, is on our page on{' '}
        <Link href="/how-to-become-a-pilot-after-12th" className={LINK}>how to become a pilot after 12th</Link>,
        and the eligibility conditions are set out line by line on{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility</Link>.
      </p>

      <BlogCta
        variant="mid"
        title="Starting with the DGCA papers?"
        text="Most students begin the ground subjects while they wait for a flying slot. We teach all five written subjects from Dwarka and online, in batches that fit around a flying school's schedule."
      />

      <h2 id="medical" className={H2}>Which medical should you take first after 12th?</h2>
      <p>
        The DGCA Class 1 medical should come first for anyone aiming at a commercial licence, before any
        money goes to a flying school. A student pilot licence only needs a Class 2, but a Class 2 is
        not a prerequisite for the Class 1, and finding a disqualifying condition after paying a deposit
        is an expensive way to learn it.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA medical classes for pilots, the licences each covers, and validity</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Class</th>
              <th scope="col" className={TH}>Needed for</th>
              <th scope="col" className={TH}>Validity</th>
            </tr>
          </thead>
          <tbody>
            {[class1, class2].map((c, i) => (
              <tr key={c.cls} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{c.cls}</td>
                <td className={TD}>{c.licences.join('; ')}</td>
                <td className={TD}>{c.validity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The{' '}
        <Ext href={MEDICAL_STANDARDS.sources[2].url}>DGCA medical CAR</Ext> publishes no numeric
        eyesight, colour-vision or hearing figure; it adopts the ICAO Annex 1 standards and
        DGCA&rsquo;s medical circulars by reference. That matters after Class 12, because many websites
        print such a figure as though DGCA had set it. Which centres can do an initial Class 1, and what it costs, are on our{' '}
        <Link href="/dgca-class-2-class-1-medical" className={LINK}>Class 1 and Class 2 medical guide</Link>.
      </p>

      <h2 id="other-routes" className={H2}>How do AME, flight dispatcher and Air Force entry differ?</h2>
      <p>
        Aircraft maintenance engineering, flight dispatch and Air Force flying are three different
        careers with three different gatekeepers. AME and dispatch are DGCA licences examined on the
        same Pariksha portal as pilots; Air Force entry is a recruitment process run by the UPSC and
        the Indian Air Force.
      </p>
      <h3 className={H3}>Aircraft maintenance engineer</h3>
      <p>
        An aircraft maintenance engineer {lc(AME.what)} A candidate can register from age {AME.minAge},
        and no maximum age applies.{' '}
        The papers cost {inr(AME.examFeeRegular)} each in a regular session, against {inr(PARIKSHA.fees.regularPerPaper)} for
        a pilot paper, and the licence is governed by {AME.governedBy}. DGCA&rsquo;s own{' '}
        <Ext href={AVIATION_CAREERS.sources[0].url}>AME examination FAQ</Ext> is the document to read first, and our{' '}
        <Link href="/ame-aircraft-maintenance-engineer" className={LINK}>AME page</Link> sets it out in full.
      </p>
      <h3 className={H3}>Flight dispatcher</h3>
      <p>
        A flight dispatcher plans and releases flights with the captain. It is a separate DGCA flight
        crew licence with the same Physics and Mathematics condition as a pilot, but a higher minimum
        age, so a student leaving school cannot hold it straight away. Our guide on{' '}
        <Link href="/blogs/how-to-become-a-flight-dispatcher-in-india" className={LINK}>becoming a flight dispatcher in India</Link>{' '}
        gives the age and education rule with its source.
      </p>
      <h3 className={H3}>Air Force pilot</h3>
      <p>
        The Air Force route after Class 12 runs through the National Defence Academy examination,
        conducted by the{' '}
        <Ext href="https://upsc.gov.in">Union Public Service Commission</Ext>. The age band, subject
        conditions and medical standards are published in each UPSC notification and can change
        between cycles, so we do not reproduce them here. Read the notification for the cycle you are
        applying in; it is the only version that binds.
      </p>

      <h2 id="degree" className={H2}>Is a BSc in Aviation the same as a pilot licence?</h2>
      <p>
        A BSc in Aviation is not a pilot licence and does not lead to one by itself. DGCA issues a
        licence under Schedule II of the Aircraft Rules, 1937, after the written papers, the radio
        telephony examination, the medical and the flying hours, and a degree does not stand in for any
        of them.
      </p>
      <p>
        Some degree programmes are run alongside flying training, and that combination can suit a
        student who wants a graduate qualification as a fallback. The question to ask any provider is
        simple: which DGCA licence does this course end in, and which of the steps above are included
        in the fee? If the answer is none, the course is an academic qualification about aviation, not
        a route into a cockpit.
      </p>

      <h2 id="cost" className={H2}>What does an aviation course after 12th cost?</h2>
      <p>
        No Indian government body publishes a market price for pilot training, and private flying
        schools do not publish their fees, so any single figure you see online cannot be traced to a
        document. Two things are published: DGCA&rsquo;s own statutory fees and the course fee of IGRUA,
        a government academy.
      </p>
      <p>
        IGRUA publishes {igrua.feeLabel} for its ab-initio to CPL course (fixed wing) on its{' '}
        <Ext href={igrua.source}>approved courses page</Ext>. What that figure does and does not cover is
        the useful part, because it shows how much sits outside a headline number:
      </p>
      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="font-montserrat font-bold text-av-blue mb-2">Included in the IGRUA fee</p>
          <ul className="list-disc pl-5 space-y-1 text-base text-gray-700">
            {igrua.includes.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="font-montserrat font-bold text-av-blue mb-2">Not included</p>
          <ul className="list-disc pl-5 space-y-1 text-base text-gray-700">
            {igrua.excludes.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </div>
      <p>
        DGCA charges {inr(PARIKSHA.fees.regularPerPaper)} per written paper in a regular session and{' '}
        {inr(PARIKSHA.fees.olodePerPaper)} on demand. Use those as the fixed points, and get every
        private quote in writing against the same list of questions; our{' '}
        <Link href="/blogs/pilot-training-cost-in-india" className={LINK}>pilot training cost breakdown</Link>{' '}
        gives that list. As for pay after training, Indian airlines do not publish pilot pay scales, so
        we print no salary figure; our{' '}
        <Link href="/commercial-pilot-license-salary" className={LINK}>pilot salary page</Link> explains
        what is published instead.
      </p>

      <h2 id="first-month" className={H2}>What to do in your first month after results</h2>
      <p>
        The first month after Class 12 results is best spent on the steps that cost little and rule
        things out early: the medical, the computer number and an honest look at your subjects. Each of
        these can stop a route outright, and each is cheaper to learn about now than after an admission
        fee.
      </p>
      <ol className="list-decimal pl-5 space-y-3 text-gray-700">
        <li><strong>Check your marksheet against the route.</strong> Physics and Mathematics for a pilot or dispatcher; Physics, Chemistry and Mathematics for AME.</li>
        <li><strong>Book the medical the route needs.</strong> For a commercial pilot, that is the Class 1 initial at a centre DGCA lists for initial issue.</li>
        <li><strong>Apply for a DGCA computer number</strong> if you are on a pilot route. On the DigiLocker route the number is allotted immediately on successful submission; on the manual route it is issued within {PARIKSHA.processing.days} working days of a complete application. Our{' '}
          <Link href="/dgca-computer-number" className={LINK}>computer number guide</Link> walks through both.
        </li>
        <li><strong>Collect written quotes</strong> from the flying schools you are considering, and check each one against DGCA&rsquo;s own{' '}
          <Ext href={FTO.sources[0].url}>list of approved flying training organisations</Ext> before paying anything.</li>
      </ol>
      <p>
        None of these steps commits you to a route. Together they tell you, within weeks, which routes
        your subjects, your medical and your budget actually leave open, and that is a better footing for
        the next three years than anybody&rsquo;s brochure.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
