import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import {
  MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EDUCATION, PARIKSHA, MEDICAL_STANDARDS, EXAM_RULES,
  FTO, CPL_COST, ACADEMY, inr,
} from '../../lib/facts';
import {
  H2, H3, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE,
  articleSchemaFor, faqSchemaFrom,
} from '../../lib/blogKit';

/*
 * /blogs/flight-school-prerequisites-admission-guide — REWRITTEN 2026-10-08 to
 * data/blog-standard.md.
 *
 * INTENT. Admission mechanics only: what has to be in place before a flying
 * school will admit you and before you should pay one, in the order to do it,
 * with the documents. The explainer and the programme comparison are its two
 * sibling posts.
 *
 * TWO LIVE ERRORS CORRECTED
 *   - The step list said to apply for the computer number "through the eGCA
 *     portal". It is issued on Pariksha.
 *   - An FAQ said passed DGCA papers do not expire. They do: EXAM_RULES
 *     paperValidity — five years for a CPL or ATPL, two and a half otherwise.
 * Also removed: four images (two showed "WeOne" branded aircraft, implying a
 * fleet we do not have; one printed the CPL hour components wrongly; one
 * printed untraceable cost percentages), and the pageFaqs.js entry.
 */
const SLUG = 'flight-school-prerequisites-admission-guide';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-10-08';
const HEADING = 'Flight School Prerequisites in India (2027): What to Have Ready Before Admission';
const DESCRIPTION = 'Flight school prerequisites in India: Class 12 subjects, the Class 1 medical, DGCA computer number and documents, in order, before paying any deposit.';

const class1 = MEDICAL_STANDARDS.classes.find((c) => c.cls === 'Class 1');
const class1Fee = MEDICAL_STANDARDS.fees.rows[0];
const up = PARIKSHA.uploads;

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Flight school admission',
  keywords: 'flight school prerequisites India, flying school admission India, pilot training admission requirements, documents for flying school, DGCA computer number before admission',
});

const prerequisites = [
  { item: 'Age', rule: `Student Pilot Licence from ${MIN_AGE.SPL}; computer number from ${PARIKSHA.basics.minAge}; CPL issued at ${MIN_AGE.CPL}`, source: 'Aircraft Rules, 1937, Schedule II; Pariksha FAQ' },
  { item: 'Class 12 subjects', rule: EDUCATION.requirement, source: `Schedule II, ${EDUCATION.clause}` },
  { item: 'Medical', rule: `Class 1 for the CPL; book the initial at a centre DGCA lists for initial issue`, source: 'DGCA medical CAR' },
  { item: 'Computer number', rule: 'Issued on the DGCA Pariksha portal; needed to sit any paper', source: 'Pariksha Flight Crew User Manual' },
  { item: 'Documents', rule: 'Class 10 and 12 marksheets and certificates, ID and address proof, photographs, matching exactly', source: 'Pariksha User Manual and rejection list' },
];

const admissionOrder = [
  { step: 'Check your Class 12 subjects', detail: `${EDUCATION.requirement}. ${EDUCATION.altRoute}` },
  { step: 'Book the Class 1 initial medical', detail: `${MEDICAL_STANDARDS.classOrder.notMandatory} The fee DGCA lists at the Air Force centres is ${class1Fee.label}.` },
  { step: 'Apply for the DGCA computer number', detail: `On Pariksha. ${PARIKSHA.processing.statement}` },
  { step: 'Start the DGCA ground subjects', detail: `${DGCA_PAPERS.length} papers, ${EXAM_RULES.theory.passMark}% in each; they need no flying school and no medical to sit.` },
  { step: 'Shortlist and verify flying schools', detail: `On DGCA's list of ${FTO.count} approved organisations and its ranking.` },
  { step: 'Agree written fee terms, then pay', detail: 'Inclusions, extra-hour rate, payment schedule and refund conditions, in writing, before anything beyond a booking amount.' },
];

const mistakes = [
  'Paying a flying school before the medical is done. The medical costs a fraction of a deposit and decides whether the rest is worth starting.',
  'Letting a name or date-of-birth mismatch sit unresolved. It causes complete rejection of the computer number application, and it surfaces again at licence issue.',
  'Accepting an approval certificate image as proof, instead of finding the school on DGCA’s own list.',
  'Signing without written fee terms, a milestone-linked payment schedule and refund conditions.',
  'Choosing on the headline quote alone. A lower figure with the Instrument Rating billed separately is not a lower figure.',
  'Clearing papers years ahead of the flying without counting the five-year window back from the licence application.',
];

const peopleAlsoAsk = [
  {
    q: 'What are the prerequisites for flight school in India?',
    a: `The prerequisites for flight school in India are Physics and Mathematics at 10+2 for a CPL route, a DGCA medical (Class 1 for a CPL), a DGCA computer number from the Pariksha portal, and matching identity and education documents. The CPL itself is issued from age ${MIN_AGE.CPL}; training can start earlier.`,
  },
  {
    q: 'Is there an upper age limit for pilot training in India?',
    a: `Schedule II sets minimum ages for pilot licences, not maximum ones, and the Pariksha FAQ states that no maximum age is prescribed for the computer number. Medical fitness applies at every age, and the Class 1 renewal interval shortens after 60. Airline cadet programmes set their own upper limits.`,
  },
  {
    q: 'Do I need a DGCA computer number before joining a flying school?',
    a: 'A DGCA computer number is needed to sit the written papers, and many flying schools ask for it at admission. It costs nothing to apply for, needs no medical, and can be applied for from age 16, so it is sensible to have it before choosing a school.',
  },
  {
    q: 'Which documents does a flying school need for admission?',
    a: 'Flying schools generally ask for Class 10 and Class 12 marksheets and certificates, the medical assessment, the DGCA computer number, identity and address proof, photographs and, for training abroad, a passport. Requirements vary by school, so ask for its list in writing. The names and dates must match across every document.',
  },
  {
    q: 'Can I begin ground school before my computer number arrives?',
    a: 'Yes. The DGCA computer number is required to sit an examination, not to study for one. Starting ground classes while the application is processed uses the waiting time, and on the DigiLocker route the number is allotted immediately anyway.',
  },
  {
    q: 'Do passed DGCA papers expire?',
    a: `Yes. ${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl} The period is counted back from the date of the licence application.`,
  },
  {
    q: 'What happens if the medical finds a problem?',
    a: `The DGCA medical has four outcomes: ${MEDICAL_STANDARDS.disposition.outcomes.join(', ')}. Some findings need investigation before a decision. A licence holder declared unfit for more than three months, or permanently, may appeal within 90 days. Only the examining authority can say which applies to you.`,
  },
  {
    q: 'How many flying schools should I apply to?',
    a: 'Shortlist three or four flying schools and verify each one properly, rather than applying widely and comparing brochures. Check each on DGCA’s approved list and ranking, ask for average hours to licence and completion records, and get fee terms in writing before choosing.',
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const related = [
  { lead: 'The computer number, route by route, is in', anchor: 'our DGCA computer number guide', href: '/dgca-computer-number' },
  { lead: 'The mistakes that get an application rejected are listed in', anchor: 'why computer number applications get rejected', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'The certificate many boards issue for Pariksha is explained in', anchor: 'the Board Verification Certificate', href: '/blogs/board-verification-certificate-dgca-computer-number' },
  { lead: 'How to compare programmes once you are ready is in', anchor: 'commercial pilot training programmes', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'Where each medical is done is on', anchor: 'the Class 1 and Class 2 medical page', href: '/dgca-class-2-class-1-medical' },
];

const tocHeadings = [
  { id: 'prerequisites', title: 'What are the prerequisites?' },
  { id: 'order', title: 'In what order?' },
  { id: 'medical', title: 'Which medical, and when?' },
  { id: 'computer-number', title: 'How do you get the computer number?' },
  { id: 'documents', title: 'Which documents will you need?' },
  { id: 'school', title: 'How do you check the school?' },
  { id: 'mistakes', title: 'Which mistakes cost the most?' },
  { id: 'checklist', title: 'Your pre-deposit checklist' },
];

const sources = [
  PARIKSHA.sources[1],
  PARIKSHA.sources[0],
  PARIKSHA.sources[2],
  PARIKSHA.digilocker.sources[0],
  MEDICAL_STANDARDS.sources[2],
  FTO.sources[0],
  { label: `${EXAM_RULES.car.citation} — ${EXAM_RULES.car.title} (DGCA)`, url: EXAM_RULES.car.where },
];

export default function FlightSchoolPrerequisites() {
  return (
    <BlogPostLayout
      title="Flight School Prerequisites in India: Admission Checklist"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="Flight school admission"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="10 min"
      quickAnswer={{
        question: 'What do you need before joining a flight school in India?',
        answer: `Before joining a flight school in India you need Physics and Mathematics at 10+2 (for the CPL route), a DGCA Class 1 medical, a DGCA computer number from the Pariksha portal, and identity and education documents whose names and dates match exactly. Settle all four before paying a deposit; the CPL itself is issued from age ${MIN_AGE.CPL}.`,
      }}
      summaryTitle="Before you pay a deposit"
      summaryItems={[
        `Physics and Mathematics at 10+2 (${EDUCATION.clause}); NIOS if they are missing.`,
        `Class 1 medical first; DGCA lists the Air Force centre fee at ${class1Fee.label}.`,
        `DGCA computer number on Pariksha, from age ${PARIKSHA.basics.minAge}; immediate on DigiLocker, ${PARIKSHA.processing.days} working days manually.`,
        'Names and dates of birth must match across every document.',
        `School on DGCA's list of ${FTO.count} approved organisations, fee terms in writing.`,
        `Sources: Pariksha documents read ${PARIKSHA.verifiedOn}; DGCA medical CAR read ${MEDICAL_STANDARDS.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
    >
      <p>
        A flying school&rsquo;s admission office will usually take a deposit long before anyone asks
        whether you have a medical, a computer number or documents that match. The money moves first,
        and the problems surface later: a colour-vision finding in month two, a computer number rejected
        because the Class 10 marksheet spells a name differently, a fee schedule nobody wrote down. None
        of that is unusual, and all of it is avoidable. This guide lists the flight school prerequisites
        in India in the order to complete them, with the rule behind each, so that by the time you pay a
        school you already know you can finish.
      </p>

      <BlogCta
        variant="top"
        eyebrow="Free checklist"
        title="The pre-admission checklist"
        text="The same steps as this guide, as a list you can tick through before paying any flying school."
        href="/lead-magnets/pre-admission-checklist"
        label="Open the checklist"
      />

      <h2 id="prerequisites" className={H2}>What are the prerequisites for flight school in India?</h2>
      <p>
        The prerequisites for flight school in India on the commercial route are Physics and Mathematics
        at 10+2, a DGCA Class 1 medical, a DGCA computer number and a consistent set of documents. Age
        matters for the licence rather than for admission: the CPL is issued from {MIN_AGE.CPL}.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Flight school prerequisites in India, the rule for each and where it comes from</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Prerequisite</th>
              <th scope="col" className={TH}>The rule</th>
              <th scope="col" className={TH}>Set by</th>
            </tr>
          </thead>
          <tbody>
            {prerequisites.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.item}</td>
                <td className={TD}>{r.rule}</td>
                <td className={TD}>{r.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The full eligibility table, clause by clause, is on our{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>.
      </p>

      <h2 id="order" className={H2}>In what order should you complete the prerequisites?</h2>
      <p>
        Complete the flight school prerequisites cheapest-disqualifier first: subjects, then the medical,
        then the computer number, then the papers and the school. Each early step can stop the route on
        its own and costs little, while the deposit at the end is the expensive commitment.
      </p>
      <ol className={OL}>
        {admissionOrder.map((s) => (
          <li key={s.step}><strong>{s.step}.</strong> {s.detail}</li>
        ))}
      </ol>
      <BlogImagePlaceholder
        src="/blog/flight-school-prerequisites/documents-checklist.webp"
        width={1200}
        height={800}
        alt="Labelled document binders for academic, medical, identity and address papers beside a scanner and a passport photograph"
        promptId="21"
      />

      <h2 id="medical" className={H2}>Which medical do you need before flight school, and when?</h2>
      <p>
        You need a DGCA Class 1 medical for a commercial licence, and it should be done before any money
        goes to a flying school. A Class 2 is enough for the Student Pilot Licence, but it is not a
        prerequisite for the Class 1, and the initial Class 1 can only be done at the centres DGCA lists
        for initial issue.
      </p>
      <p>
        The Class 1 is valid {class1.validity.charAt(0).toLowerCase() + class1.validity.slice(1)} It is booked on
        eGCA, and the outcome is one of {MEDICAL_STANDARDS.disposition.outcomes.join(', ').toLowerCase()}. The{' '}
        <Ext href={MEDICAL_STANDARDS.sources[2].url}>DGCA medical CAR</Ext> publishes no numeric eyesight
        figure; it adopts ICAO Annex 1 by reference, so treat any page quoting one with care. Our{' '}
        <Link href="/dgca-class-2-class-1-medical" className={LINK}>Class 1 and Class 2 medical guide</Link> lists
        the centres.
      </p>

      <h2 id="computer-number" className={H2}>How do you get a DGCA computer number before admission?</h2>
      <p>
        A DGCA computer number is applied for on the{' '}
        <Ext href={PARIKSHA.portal}>Pariksha portal</Ext>, from age {PARIKSHA.basics.minAge}, with no fee and
        no medical. On the DigiLocker route it is allotted immediately on successful submission; on the
        manual route it is issued within {PARIKSHA.processing.days} working days of a complete application.
      </p>
      <h3 className={H3}>The two rules that cause most rejections</h3>
      <ul className={UL}>
        <li><strong>Names.</strong> {PARIKSHA.name.rule} {PARIKSHA.name.consequence}</li>
        <li><strong>Date of birth.</strong> {PARIKSHA.dob.proof} {PARIKSHA.dob.aadhaarNote} {PARIKSHA.dob.exactness}</li>
      </ul>
      <p>
        The DigiLocker route needs Indian nationality, both certificates in DigiLocker and an Aadhaar
        that matches exactly, as DGCA&rsquo;s{' '}
        <Ext href={PARIKSHA.digilocker.sources[0].url}>PIB release on auto-generation</Ext> explains. Everyone
        else applies manually, usually with a{' '}
        <Link href="/blogs/board-verification-certificate-dgca-computer-number" className={LINK}>Board Verification Certificate</Link>.
        The full process is in our{' '}
        <Link href="/dgca-computer-number" className={LINK}>computer number guide</Link>.
      </p>

      <BlogCta
        variant="mid"
        title="Stuck on the computer number or the papers?"
        text="We help students through the Pariksha application and teach the five DGCA papers from Dwarka and online, so this part is done before a flying school is chosen."
      />

      <h2 id="documents" className={H2}>Which documents will you need for flight school admission?</h2>
      <p>
        For flight school admission you will need your Class 10 and Class 12 marksheets and certificates,
        the medical assessment, the DGCA computer number, identity and address proof and photographs, and
        a passport if you train abroad. Each school sets its own list, but the Pariksha rules decide how
        the core documents must look.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Pariksha upload rules for the core documents, from the Flight Crew User Manual</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Document</th>
              <th scope="col" className={TH}>Pariksha rule</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white"><td className={TD_HEAD}>Photograph</td><td className={TD}>{up.photo.size}; {up.photo.format}, up to {up.photo.maxKb} KB; {up.photo.age.toLowerCase()}</td></tr>
            <tr className="bg-gray-50"><td className={TD_HEAD}>Signature</td><td className={TD}>{up.signature.size}; {up.signature.format}, up to {up.signature.maxKb} KB</td></tr>
            {up.pdfLimits.map((r, i) => (
              <tr key={r.documents} className={i % 2 ? 'bg-gray-50' : 'bg-white'}><td className={TD_HEAD}>{r.documents}</td><td className={TD}>PDF, up to {r.maxKb} KB</td></tr>
            ))}
            <tr className="bg-white"><td className={TD_HEAD}>Address proof</td><td className={TD}>{PARIKSHA.addressProof.documents.join(', ')}</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        {PARIKSHA.education.documents} {up.finalSubmit} These rules come from the{' '}
        <Ext href={PARIKSHA.sources[1].url}>Pariksha Flight Crew User Manual</Ext>.
      </p>

      <h2 id="school" className={H2}>How do you check a flying school before admission?</h2>
      <p>
        Check a flying school before admission by finding it on DGCA&rsquo;s{' '}
        <Ext href={FTO.sources[0].url}>list of approved flying training organisations</Ext> ({FTO.count} names as
        on {FTO.listAsOf}), reading its place in DGCA&rsquo;s twice-yearly ranking, and getting its fee
        terms in writing. {FTO.noBaseIn[0]} has no approved flying base on that list, so Delhi students
        train elsewhere.
      </p>
      <p>Before any payment beyond a booking amount, get written answers to these:</p>
      <ul className={UL}>
        {CPL_COST.askYourSchool.map((q) => <li key={q}>{q}</li>)}
      </ul>
      <p>
        How to weigh the answers is in{' '}
        <Link href="/blogs/best-flying-school-in-india" className={LINK}>how to choose the best flying school in India</Link>.
        DGCA&rsquo;s own examination fee, paid by you directly, is {inr(PARIKSHA.fees.regularPerPaper)} per paper in a
        regular session.
      </p>
      <BlogImagePlaceholder
        src="/blog/flight-school-prerequisites/school-selection.webp"
        width={1200}
        height={675}
        alt="A magnifying glass held over three model flying-school buildings with training aircraft outside"
        promptId="23"
      />

      <h2 id="mistakes" className={H2}>Which admission mistakes cost students the most?</h2>
      <p>
        The admission mistakes that cost students the most are paying before the medical, leaving a
        document mismatch unresolved, and signing without written fee terms. Each is cheap to avoid and
        expensive to undo.
      </p>
      <ul className={UL}>
        {mistakes.map((m) => <li key={m}>{m}</li>)}
      </ul>

      <h2 id="checklist" className={H2}>Your pre-deposit checklist</h2>
      <p>
        If you can tick every line below, you are ready to pay a flying school; if you cannot, the
        unticked line is your next step.
      </p>
      <ul className={UL}>
        <li>Physics and Mathematics at 10+2 confirmed, or the NIOS route under way.</li>
        <li>Class 1 initial medical done, with the CA-35 in hand.</li>
        <li>DGCA computer number allotted, with names and dates matching every document.</li>
        <li>The school found on DGCA&rsquo;s list, and its ranking read.</li>
        <li>Fee terms, extra-hour rate and refund conditions in writing.</li>
      </ul>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
