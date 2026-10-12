import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { EGCA, PARIKSHA, EXAM_RULES, CPL_HOURS, DGCA_PAPERS, RTR, MEDICAL, EDUCATION, ACADEMY } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from /egca-login (how to log in and what the portal is), english-language-proficiency-test-for-pilots-in-india
 * (one of the six gates), and the Pariksha posts (the portal that supplies one of them). This post owns one
 * question: what has to be in place before the eGCA CPL application will go through, in the order a student
 * meets the gates, and how the application itself is submitted. Pre-CPL audience: it is the checklist a
 * student works backwards from while still training.
 * Every figure comes from EGCA, EXAM_RULES, CPL_HOURS and PARIKSHA in lib/facts.js. The licence fee amount is
 * NOT in any source on file (the eGCA manual names Bharatkosh but not the amount), so the post says it is not stated.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'cpl-application-egca-prerequisites-checklist';
const DATE_PUBLISHED = '2026-10-12';
const DATE_MODIFIED = '2026-10-12';

const ISS = EGCA.cplIssuance;
const manual = EGCA.sources.find((s) => s.label.startsWith('eGCA user manual — Process for submitting'));
const epl = EGCA.sources.find((s) => s.label.includes('Electronic Personnel Licence'));

const peopleAlsoAsk = [
  {
    q: 'What do I need before I can apply for a CPL on eGCA?',
    a: `Six things, taken from DGCA's eGCA manual for the CPL application: ${EGCA.cplPrerequisites.map(lc).join('; ')}. Missing any one of them stops the application.`,
  },
  {
    q: 'Is the DGCA computer number the same as an eGCA ID?',
    a: `No. The computer number comes from the Pariksha portal and is used to book written papers. The eGCA ID is your own registration on the eGCA portal. ${EGCA.joinPoint}`,
  },
  {
    q: 'Who updates and validates my e-logbook?',
    a: `Your flying training organisation. The eGCA manual requires the e-logbook to be updated and e-validated by the organisation for flying hours and skill tests before the CPL application is made. The flying itself is measured against the ${CPL_HOURS.total}-hour total in ${CPL_HOURS.clause}.`,
  },
  {
    q: 'What if a detail on my eGCA CPL form is wrong?',
    a: `${ISS.discrepancy} Check the basic details, especially the computer number, before you submit.`,
  },
  {
    q: 'How long do I have to pay after submitting the CPL application?',
    a: `${ISS.payment} ${ISS.completion} The fee amount is not stated in the manual we cite, so check it on the portal.`,
  },
  {
    q: 'Is RTR (A) one of the DGCA written papers?',
    a: `No. ${RTR.note} In the eGCA prerequisites it appears as a valid FRTOL or FRTOL(R) with the RTR certificate, not as one of the ${DGCA_PAPERS.length} written papers.`,
  },
  {
    q: 'What does a student receive once the CPL is issued?',
    a: `The licence is now an ${EGCA.epl.label}, issued for the CPL since ${EGCA.epl.cplFrtolFrom} and accessed through the eGCA mobile application. ${EGCA.epl.what}`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'CPL Application on eGCA: The Six Things That Must Be Ready First',
  description:
    'The six prerequisites DGCA lists before a CPL application will go through on eGCA, who supplies each one, and how the application, payment and tracking work.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'CPL licensing',
  keywords: 'CPL application eGCA, how to apply for CPL in India, eGCA CPL prerequisites, issuance of commercial pilot licence eGCA, CPL licence issue checklist',
});

const sources = [
  { label: manual.label, url: manual.url },
  { label: `${EXAM_RULES.car.citation} (DGCA)`, url: EXAM_RULES.car.where },
  { label: epl.label, url: epl.url },
  { label: 'eGCA portal', url: EGCA.url },
];

const related = [
  { lead: 'Level 4 English is covered in', anchor: 'the ELP test post', href: '/blogs/english-language-proficiency-test-for-pilots-in-india' },
  { lead: 'The written papers are explained in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'The 100-hour PIC component is broken down in', anchor: 'the pilot-in-command hours post', href: '/blogs/cpl-pilot-in-command-hours-requirement-india' },
  { lead: 'How long a cleared paper counts is in', anchor: 'the five-year validity post', href: '/blogs/dgca-exam-pass-validity-cpl-five-years' },
];

const tocHeadings = [
  { id: 'six-gates', title: 'What must be ready before the eGCA CPL application?' },
  { id: 'who-supplies', title: 'Who supplies each of the six?' },
  { id: 'order', title: 'In what order should you collect them?' },
  { id: 'portals', title: 'Which portal does which job: Pariksha or eGCA?' },
  { id: 'submit', title: 'How does the application itself work?' },
  { id: 'mistakes', title: 'What goes wrong at submission?' },
  { id: 'after', title: 'What do you receive afterwards?' },
  { id: 'this-week', title: 'What to do this week' },
];

const gateRows = [
  { gate: 'Your own eGCA ID', from: 'You, on the eGCA portal', where: { text: 'eGCA login guide', href: '/egca-login' } },
  { gate: 'Valid Class 1 medical and the assessment sheet', from: 'DGCA-approved medical examiners', where: { text: 'Class 1 medical guide', href: '/dgca-class-2-class-1-medical' } },
  { gate: 'Valid FRTOL or FRTOL(R) with the RTR certificate', from: 'The RTR (A) process', where: { text: 'RTR (A) guide', href: '/rtr-a' } },
  { gate: 'E-logbook updated and e-validated', from: 'Your flying training organisation', where: { text: 'hours requirement', href: '/blogs/cpl-pilot-in-command-hours-requirement-india' } },
  { gate: 'English Language Proficiency, Level 4 or above', from: 'DGCA examination', where: { text: 'ELP post', href: '/blogs/english-language-proficiency-test-for-pilots-in-india' } },
  { gate: 'Written examinations passed', from: 'Central Examination Organisation', where: { text: 'DGCA exam guide', href: '/blogs/dgca-exam-guide' } },
];

export default function CplApplicationEgcaPrerequisitesChecklist() {
  return (
    <BlogPostLayout
      title="CPL Application on eGCA: Prerequisites Checklist"
      description="Six things DGCA's eGCA manual says must be in place before a CPL application goes through, who supplies each one, and how submission and payment work."
      schema={[articleSchema, faqSchema]}
      heading="CPL Application on eGCA: The Six Things That Must Be Ready First"
      category="CPL licensing"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'What do you need before you can apply for a CPL on eGCA?',
        answer: `DGCA's eGCA manual lists six gates: your own eGCA ID, a valid Class 1 medical, a valid FRTOL or FRTOL(R) with the RTR certificate, an e-logbook your flying school has e-validated, English Language Proficiency at Level 4 or above, and cleared written papers. Payment follows submission through Bharatkosh.`,
      }}
      summaryTitle="The CPL application in one view"
      summaryItems={[
        `${EGCA.cplPrerequisites.length} prerequisites must be met before the eGCA CPL application goes through.`,
        `Your computer number from Pariksha appears in the basic details of the application. ${EGCA.versusPariksha[0].portal} and eGCA do not replace each other.`,
        `Every flying experience parameter must read Qualified, measured against the ${CPL_HOURS.total}-hour total.`,
        ISS.completion,
        'Sources: the DGCA eGCA user manual for the CPL application and PIB, read on 12 October 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="12 October 2026"
    >
      <p>
        A student finishes the last flying hour and the last written paper, opens the licence
        application, and finds a field that cannot be filled: the e-logbook has not been validated, or
        the radio certificate is not yet on file. The weeks that follow are spent chasing one office
        after another. This post sets out the eGCA CPL application prerequisites in the order you
        meet them, so you can work backwards from the licence while you are still training.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/cpl-application-egca-prerequisites/hero-six-gates-one-path.webp"
        width={1200}
        height={630}
        alt="A single path running through six identical gates in a row towards a distant plain building, the last gate drawn in a different colour"
        promptId="105"
      />

      <h2 id="six-gates" className={H2}>What must be ready before the eGCA CPL application?</h2>
      <p>
        Six things must be in place before the Commercial Pilot Licence application on eGCA will go
        through. They come from DGCA&rsquo;s own{' '}
        <Ext href={manual.url}>user manual for submitting a CPL application</Ext>, which also says
        the flying experience on the form has to read Qualified for the service you apply for.
      </p>
      <ol className="list-decimal pl-5 space-y-3 text-gray-700">
        {EGCA.cplPrerequisites.map((p) => <li key={p}>{p}.</li>)}
      </ol>
      <p>
        The flying behind item four is measured against the {CPL_HOURS.total}-hour total in{' '}
        {CPL_HOURS.clause} of Schedule II. The eligibility rules themselves, including{' '}
        {lc(EDUCATION.requirement)}, are set out on our{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>.
      </p>

      <h2 id="who-supplies" className={H2}>Who supplies each of the six?</h2>
      <p>
        Each gate belongs to a different office, which is why the application stalls. You hold the eGCA
        ID, a medical examiner issues the medical, your flying training organisation validates the
        logbook, and the Central Examination Organisation holds your written results. The table shows
        where to read about each.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">The six prerequisites for the eGCA CPL application and who supplies each</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Prerequisite</th>
              <th scope="col" className={TH}>Supplied by</th>
              <th scope="col" className={TH}>Read more</th>
            </tr>
          </thead>
          <tbody>
            {gateRows.map((r, i) => (
              <tr key={r.gate} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.gate}</td>
                <td className={TD}>{r.from}</td>
                <td className={TD}>
                  <Link href={r.where.href} className={LINK}>{r.where.text}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The written papers are the {DGCA_PAPERS.length} subjects: {DGCA_PAPERS.join(', ')}.{' '}
        {RTR.name} is not among them: {lc(RTR.note)}
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Written papers and RTR"
        title="Cover the gates we actually teach"
        text="We teach the DGCA written subjects and prepare students for the exam side of this checklist. The medical, the logbook and the flying belong to other offices, and we cannot promise a result in any of them."
      />

      <h2 id="order" className={H2}>In what order should you collect them?</h2>
      <p>
        Start with the gate that can end the journey, the medical, and finish with the one that depends
        on everything else, the logbook. {MEDICAL.advice} The order below follows how long each item
        usually blocks the next.
      </p>
      <ol className="list-decimal pl-5 space-y-3 text-gray-700">
        <li>
          Book the medical first. Read{' '}
          <Link href="/dgca-class-2-class-1-medical" className={LINK}>our medical guide</Link> for the
          standards behind it.
        </li>
        <li>
          Get the computer number and book the papers. The Pariksha portal handles both, and the
          number is a field on the eGCA form. See{' '}
          <Link href="/dgca-computer-number" className={LINK}>how the computer number works</Link>.
        </li>
        <li>
          Register on eGCA early, so the ID exists before your flying school starts validating entries.
        </li>
        <li>
          Plan the dates. A passed paper has its own window:{' '}
          {EXAM_RULES.paperValidity.cplAtpl.charAt(0).toLowerCase() + EXAM_RULES.paperValidity.cplAtpl.slice(1)}
        </li>
      </ol>
      <p>
        Our <Link href="/courses/cpl" className={LINK}>CPL course page</Link> shows how ground
        training fits around flying with a partner school.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="portals" className={H2}>Which portal does which job: Pariksha or eGCA?</h2>
      <p>
        Pariksha handles everything to do with the written papers, and eGCA handles the licence
        itself. Students mix them up because both ask for the same identity details, and both appear
        in the same conversation with a flying school. The{' '}
        <Ext href={PARIKSHA.portal}>Pariksha portal</Ext> and <Ext href={EGCA.url}>eGCA</Ext> are
        separate systems with separate logins.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Which DGCA portal handles which task</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Task</th>
              <th scope="col" className={TH}>Portal</th>
            </tr>
          </thead>
          <tbody>
            {EGCA.versusPariksha.map((r, i) => (
              <tr key={r.task} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.task}</td>
                <td className={TD}>{r.portal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {EGCA.joinPoint} In practice that means the computer number you receive from Pariksha is typed
        into the eGCA form, so keep the confirmation email where you can find it. Our{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>
          computer number rejection guide
        </Link>{' '}
        lists what holds that number up, and the{' '}
        <Link href="/blogs/dgca-exam-pass-marks-and-retakes-cpl" className={LINK}>pass marks and retakes post</Link>{' '}
        covers what happens when a paper is missed, since the written-examinations gate stays closed
        until all {DGCA_PAPERS.length} are cleared.
      </p>

      <h2 id="submit" className={H2}>How does the application itself work?</h2>
      <p>
        The application is a service on eGCA, reached by {ISS.service.replace('→', 'then')}, and it
        has {ISS.sections.length} sections that you complete in order. After you submit, the portal
        sends you to Bharatkosh to pay.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">The sections of the eGCA CPL application form</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Step</th>
              <th scope="col" className={TH}>Section</th>
            </tr>
          </thead>
          <tbody>
            {ISS.sections.map((s, i) => (
              <tr key={s} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{i + 1}</td>
                <td className={TD}>{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className={UL}>
        <li>{ISS.ratings}</li>
        <li>{ISS.qualifiedCheck}</li>
        <li>{ISS.payment}</li>
        <li>{ISS.tracking}</li>
      </ul>

      <BlogImagePlaceholder
        src="/blog/cpl-application-egca-prerequisites/application-sections-in-order.webp"
        width={1200}
        height={675}
        alt="Five document cards laid out left to right on a desk, joined by a thin line, with a student's hand resting on the third card"
        promptId="106"
      />

      <h2 id="mistakes" className={H2}>What goes wrong at submission?</h2>
      <p>
        Most failures at submission are about timing or a wrong field, and neither can be fixed by
        editing the form. {ISS.discrepancy} The date counted as the date of submission is the one on
        which the whole process finishes: {lc(ISS.completion)}
      </p>
      <ul className={UL}>
        <li>A wrong computer number or name in the basic details cannot be edited on the form; it goes through a support request.</li>
        <li>A flying parameter that reads Dis-qualified needs a supporting statement uploaded before it can proceed.</li>
        <li>Payment left beyond the 48 hours the manual allows leaves the application incomplete.</li>
      </ul>
      <p>
        The licence fee amount is not stated in the manual we cite, so we do not quote one. Read it on
        the <Ext href={EGCA.url}>eGCA portal</Ext> when you reach the payment step.
      </p>

      <h2 id="after" className={H2}>What do you receive afterwards?</h2>
      <p>
        An electronic licence. DGCA has issued the {EGCA.epl.label} for the CPL since{' '}
        {EGCA.epl.cplFrtolFrom}, and it is accessed through the eGCA mobile application. {EGCA.epl.what}{' '}
        The change is recorded in a{' '}
        <Ext href={epl.url}>PIB release on the ATPL extension</Ext>. Our{' '}
        <Link href="/egca-login" className={LINK}>eGCA login guide</Link> covers the app.
      </p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Copy the six prerequisites into a note and write beside each one the date it is done, or the
        name of the office that owns it. Anything without a date is where to start. Then open the        {' '}<Link href="/blogs/dgca-exam-guide" className={LINK}>DGCA exam guide</Link> and book the next
        paper, because the written results are the gate you control most.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
