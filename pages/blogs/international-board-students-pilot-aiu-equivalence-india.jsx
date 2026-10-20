import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { PARIKSHA, EDUCATION, ACADEMY } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from board-verification-certificate-dgca-computer-number (what a BVC is and who it is addressed to),
 * dgca-computer-number-digilocker-instant-route (the fast route for Indian boards) and foreign-national-nri-pilot-training-india
 * (nationality and security clearance). This post owns one question: a student whose Class 10 or 12 came from an
 * international school or board (IB, Cambridge, a US high school) asking whether they can train, and what the
 * equivalence step adds. Pre-CPL audience.
 * Every figure comes from PARIKSHA and EDUCATION in lib/facts.js. The AIU fee, processing time and which subject
 * combinations AIU accepts are NOT in any source on file, so the post says they vary and sends the reader to AIU.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'international-board-students-pilot-aiu-equivalence-india';
const DATE_PUBLISHED = '2026-10-20';
const DATE_MODIFIED = '2026-10-20';

const AIU = PARIKSHA.aiu;
const BVC = PARIKSHA.bvc;
const DL = PARIKSHA.digilocker;
const pdfLarge = PARIKSHA.uploads.pdfLimits[0];
const pdfSmall = PARIKSHA.uploads.pdfLimits[1];
const faqPdf = PARIKSHA.sources.find((s) => s.label.startsWith('Flight Crew Computer Number Registration'));
const manualPdf = PARIKSHA.sources.find((s) => s.label.startsWith('Flight Crew User Manual'));
const rejectionPdf = PARIKSHA.sources.find((s) => s.label.startsWith('Reasons for rejection'));
const AIU_PAGE = 'https://aiu.ac.in/frontpage/equivalence-of-degree/';

const peopleAlsoAsk = [
  {
    q: 'Can an IB or Cambridge student become a pilot in India?',
    a: `The rule asks for ${lc(EDUCATION.requirement)}. ${AIU.whenNeeded} In that case DGCA's Pariksha process asks for an equivalence certificate from the Association of Indian Universities. Whether a particular subject combination is accepted is AIU's decision, so ask AIU before you commit to training.`,
  },
  {
    q: 'Do CBSE, ICSE and state-board students need an AIU certificate?',
    a: `The Pariksha rule ties the AIU certificate to one situation: ${lc(AIU.whenNeeded).replace(/\.$/, '')}. A candidate whose Class 10 and 12 come from a recognised Indian board is not in that situation.`,
  },
  {
    q: 'Where do I get the equivalence certificate?',
    a: `From the ${AIU.body}. A diploma holder is different: ${lc(AIU.diploma)}`,
  },
  {
    q: 'Can I use the DigiLocker instant route with an international board?',
    a: `Only if the board's records are in DigiLocker. The route needs ${lc(DL.conditions[0])}, ${lc(DL.conditions[1])} and a board whose records are available in DigiLocker. ${DL.whoStillGoesManual}`,
  },
  {
    q: 'How does an international board send the Board Verification Certificate?',
    a: `${BVC.internationalBoards} ${BVC.noColourPhotocopies}`,
  },
  {
    q: 'What does an international-board student need for a PPL?',
    a: `${PARIKSHA.education.ppl} Confirm with DGCA whether the equivalence step applies to your Class 10 qualification before you apply.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Pilot Eligibility After IB, Cambridge or a US Board: The AIU Equivalence Step',
  description:
    'Studied under IB, Cambridge or a US high school? What the AIU equivalence certificate, the emailed board verification and the manual route mean for a DGCA computer number.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Eligibility',
  keywords: 'pilot eligibility IB board, CPL after Cambridge board, AIU equivalence certificate DGCA, international board pilot India, DGCA computer number international school',
});

const sources = [
  { label: faqPdf.label, url: faqPdf.url },
  { label: manualPdf.label, url: manualPdf.url },
  { label: rejectionPdf.label, url: rejectionPdf.url },
  { label: 'DGCA Pariksha portal', url: PARIKSHA.portal },
];

const related = [
  { lead: 'How the board certificate is addressed is covered in', anchor: 'the Board Verification Certificate post', href: '/blogs/board-verification-certificate-dgca-computer-number' },
  { lead: 'The fast route for Indian boards is explained in', anchor: 'the DigiLocker computer number post', href: '/blogs/dgca-computer-number-digilocker-instant-route' },
  { lead: 'Why applications are turned back is listed in', anchor: 'the computer number rejection post', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'Nationality and security clearance are covered in', anchor: 'the foreign national and NRI post', href: '/blogs/foreign-national-nri-pilot-training-india' },
];

const tocHeadings = [
  { id: 'can-you', title: 'Can an international-board student train as a pilot in India?' },
  { id: 'when', title: 'When is an AIU equivalence certificate needed?' },
  { id: 'documents', title: 'What does the international route ask for?' },
  { id: 'digilocker', title: 'Why is the DigiLocker route usually closed?' },
  { id: 'unknown', title: 'What does this post not know?' },
  { id: 'this-week', title: 'What to do this week' },
];

const situationRows = [
  { who: 'Class 10 and 12 from a recognised Indian board', cert: 'Not triggered by the Pariksha rule', route: 'DigiLocker route if the board is in DigiLocker; manual route otherwise' },
  { who: 'Class 10 or 12 from an international school, board or university', cert: `Yes, from the ${AIU.body.split(',')[0]}`, route: 'Manual route, board verification emailed by the board' },
  { who: 'Diploma holder', cert: 'No. The 10+2 equivalence comes from the State Directorate of Technical Education', route: 'Manual route' },
  { who: 'PPL only', cert: 'Class 10 requirement applies', route: 'Confirm the Class 10 position with DGCA' },
];

const docRows = [
  { doc: 'Class 10 and Class 12 marksheets and pass certificates', limit: `PDF, up to ${pdfLarge.maxKb} KB`, note: 'Both marksheet and pass certificate are needed for each class.' },
  { doc: '10+2 equivalence certificate', limit: `PDF, up to ${pdfSmall.maxKb} KB`, note: 'Listed with the other documents in the 100 KB group.' },
  { doc: 'Board Verification Certificate', limit: `PDF, up to ${pdfSmall.maxKb} KB`, note: BVC.internationalBoards },
  { doc: 'Address proof and date-of-birth proof', limit: `PDF, up to ${pdfSmall.maxKb} KB`, note: PARIKSHA.dob.proof },
];

export default function InternationalBoardStudentsPilotAiuEquivalenceIndia() {
  return (
    <BlogPostLayout
      title="Pilot Eligibility After IB or Cambridge: AIU Step"
      description="Studied IB, Cambridge or a US high school? See how the AIU equivalence certificate and the manual route work for your DGCA computer number and CPL eligibility."
      schema={[articleSchema, faqSchema]}
      heading="Pilot Eligibility After IB, Cambridge or a US Board: The AIU Equivalence Step"
      category="Eligibility"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'Can an IB, Cambridge or US-board student train as a pilot in India?',
        answer: `Yes, if the qualification is accepted as 10+2 with Physics and Mathematics. A student from an international school or board needs an equivalence certificate from the Association of Indian Universities, and the board emails its verification to DGCA. The DigiLocker instant route usually does not apply, so expect the manual one.`,
      }}
      summaryTitle="The international-board route in one view"
      summaryItems={[
        `The education rule is ${lc(EDUCATION.requirement)} (${EDUCATION.clause}).`,
        `${AIU.whenNeeded} The equivalence certificate then comes from the ${AIU.body.split(',')[0]}.`,
        BVC.internationalBoards,
        `On the manual route the computer number is issued within ${PARIKSHA.processing.days} working days of a complete application.`,
        `Source: DGCA Pariksha FAQ and User Manual, read on ${PARIKSHA.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="20 October 2026"
    >
      <p>
        A family returns from Dubai, Singapore or the United States. The student has an IB Diploma,
        Cambridge A-Levels or an American high school diploma, wants to fly, and is told by one
        counsellor that it is fine and by another that the certificates will not be accepted.
        Both are guessing, because the answer depends on one document most pilot-eligibility pages
        never mention. This post explains what that document is and how it changes the DGCA
        computer number process for an international-board student.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/international-board-students-pilot-aiu-equivalence/hero-two-certificates-one-desk.webp"
        width={1200}
        height={630}
        alt="Two different school certificate folders on a desk joined by a single stamp-like seal, with a small aeroplane silhouette in the background window"
        promptId="107"
      />

      <h2 id="can-you" className={H2}>Can an international-board student train as a pilot in India?</h2>
      <p>
        An international-board student can apply, provided the qualification is accepted as the
        Indian one. The education rule for a CPL is {lc(EDUCATION.requirement)} ({EDUCATION.clause}).
        The Pariksha rules we read do not list international boards one by one. They ask that the
        qualification be recognised, and for an international one it asks for an equivalence
        certificate to show that it is.
      </p>
      <p>
        That makes the decision subject-based as much as board-based. The{' '}
        <Ext href={rejectionPdf.url}>DGCA list of rejection reasons</Ext> includes Physics and
        Mathematics not being shown as passed, and a missing or unreadable equivalence certificate
        for Class 10 or for the Class 12 subjects. If your IB or Cambridge subjects included
        Physics and Mathematics at a level AIU treats as equivalent, you are on the same footing
        as anyone else. If they did not, our{' '}
        <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className={LINK}>
          guide for students without Physics and Maths
        </Link>{' '}
        covers the NIOS route that {lc(EDUCATION.altRoute)}
      </p>

      <h2 id="when" className={H2}>When is an AIU equivalence certificate needed?</h2>
      <p>
        An AIU equivalence certificate is needed when the basic qualification comes from an
        international school, board or university. The Association of Indian Universities issues
        it. It is a separate document from the marksheet and from the board&rsquo;s verification
        letter, and DGCA asks for it on top of both.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Which education situations need an AIU equivalence certificate for a DGCA computer number</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Your situation</th>
              <th scope="col" className={TH}>Equivalence certificate</th>
              <th scope="col" className={TH}>Likely route</th>
            </tr>
          </thead>
          <tbody>
            {situationRows.map((r, i) => (
              <tr key={r.who} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.who}</td>
                <td className={TD}>{r.cert}</td>
                <td className={TD}>{r.route}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        AIU runs the evaluation through its{' '}
        <Ext href={AIU_PAGE}>equivalence page</Ext>, and the application is made to AIU, not to
        DGCA. Start it before you register on Pariksha, because the certificate has to exist before
        you can upload it.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Eligibility check"
        title="Not sure your marksheets will count?"
        text="Bring your Class 10 and 12 documents to a free counselling session. We will read them against the DGCA education rule and tell you plainly what to ask AIU, and what only AIU and DGCA can decide."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <h2 id="documents" className={H2}>What does the international route ask for?</h2>
      <p>
        The international route asks for the same marksheets as any other, plus the equivalence
        certificate and a board verification that the board itself sends. Everything is uploaded as
        a PDF within a size limit. Read the{' '}
        <Ext href={manualPdf.url}>Flight Crew User Manual</Ext> before you scan anything, because
        a blurred or partial scan is a listed rejection reason.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Documents an international-board student uploads for a DGCA computer number</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Document</th>
              <th scope="col" className={TH}>Format and limit</th>
              <th scope="col" className={TH}>Note</th>
            </tr>
          </thead>
          <tbody>
            {docRows.map((r, i) => (
              <tr key={r.doc} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.doc}</td>
                <td className={TD}>{r.limit}</td>
                <td className={TD}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Two rules catch international students more than most. {PARIKSHA.name.rule}{' '}
        {PARIKSHA.name.consequence} Check every international certificate against that rule before you type anything. And{' '}
        {PARIKSHA.uploads.finalSubmit.charAt(0).toLowerCase()}{PARIKSHA.uploads.finalSubmit.slice(1)}
      </p>
      <p>
        Our{' '}
        <Link href="/blogs/board-verification-certificate-dgca-computer-number" className={LINK}>
          Board Verification Certificate post
        </Link>{' '}
        explains the three ways a verification can be addressed, and the{' '}
        <Link href="/dgca-computer-number" className={LINK}>DGCA computer number guide</Link> walks
        through the full form.
      </p>

      <BlogImagePlaceholder
        src="/blog/international-board-students-pilot-aiu-equivalence/documents-in-order.webp"
        width={1200}
        height={675}
        alt="Four flat document cards laid out left to right on a desk, the third one slightly raised, with an envelope arriving from the right edge"
        promptId="108"
      />

      <h2 id="digilocker" className={H2}>Why is the DigiLocker route usually closed?</h2>
      <p>
        The DigiLocker route is usually closed to an international-board student because it fetches
        Class 10 and 12 records from a recognised board that publishes to DigiLocker. An
        international board does not. The conditions DGCA sets are:
      </p>
      <ul className={UL}>
        {DL.conditions.map((c) => <li key={c}>{c}.</li>)}
      </ul>
      <p>
        {DL.whoStillGoesManual} On the manual route the computer number is issued within{' '}
        {PARIKSHA.processing.days} working days of a complete application, so build that time in
        before your first exam booking. Our{' '}
        <Link href="/blogs/dgca-computer-number-digilocker-instant-route" className={LINK}>
          DigiLocker route post
        </Link>{' '}
        covers what happens if the fast route fails halfway.
      </p>

      <h2 id="unknown" className={H2}>What does this post not know?</h2>
      <p>
        Several things that decide your timeline are not in the DGCA documents we cite, so we do
        not state them. The AIU fee, its processing time and the exact subject combinations it
        accepts vary and are set by AIU, so read them on the{' '}
        <Ext href={AIU_PAGE}>AIU page</Ext> before you plan. Whether a particular overseas diploma
        passes the Physics and Mathematics test is likewise AIU&rsquo;s call and DGCA&rsquo;s, not a
        flying school&rsquo;s. If a coaching site gives you a fee or a number of days for this step,
        ask which AIU document it came from.
      </p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        List your Class 10 and Class 12 subjects with the level you took, and mark whether
        Physics and Mathematics are among them. If they are, open the AIU page and start the
        equivalence application; if they are not, plan the NIOS route first. Then read the{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>{' '}
        so the rest of the checklist is clear. Once the certificate is in hand, the rest of the
        process is the ordinary one.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
