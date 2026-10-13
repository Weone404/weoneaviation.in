import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { PARIKSHA } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, articleSchemaFor, faqSchemaFrom, lc, uc } from '../../lib/blogKit';

/*
 * New topic: whether a student must post paper documents to DGCA. Existing posts mention
 * PARIKSHA.hardCopy in one bullet (dgca-exam-guide) or one FAQ (/dgca-computer-number); none owns the
 * question. Every figure comes from PARIKSHA in lib/facts.js. The exam-form hard-copy rule is quoted as
 * the User Manual states it; its courier method, address format and deadline are not in the sources
 * cited, so the post says to read the portal. The older FAQ PDF still describes posting a computer
 * number form; the Manual (Issue III, Oct 2024) removed that, so the post names the conflict instead
 * of picking a side silently. FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits).
 */
const SLUG = 'dgca-hard-copy-documents-computer-number-exam-form';
const DATE_PUBLISHED = '2026-10-13';
const DATE_MODIFIED = '2026-10-13';

const HC = PARIKSHA.hardCopy;
const manualUrl = PARIKSHA.sources.find((s) => s.label.startsWith('Flight Crew User Manual')).url;
const faqUrl = PARIKSHA.sources.find((s) => s.label.startsWith('Flight Crew Computer Number Registration')).url;
const noticeUrl = PARIKSHA.sources.find((s) => s.label.startsWith('Public notice on DigiLocker')).url;

const peopleAlsoAsk = [
  {
    q: 'Do I have to post my documents to DGCA for a computer number?',
    a: `No, not on the current process. ${HC.computerNumber} The application, the uploads and the Final Submit all happen on the Pariksha portal.`,
  },
  {
    q: 'Then why does DGCA still ask for hard copies for the exam?',
    a: `The two are separate applications with separate rules. ${HC.examinationForm} The computer number removal does not extend to the examination form.`,
  },
  {
    q: 'Does a student on the DigiLocker route skip the hard copy too?',
    a: `The DigiLocker route concerns the computer number, where it fetches the Class 10 and 12 records and waives the Board Verification Certificate for them. It does not change the examination-form rule in the User Manual, so check the exam application screen on the portal for what applies to you.`,
  },
  {
    q: 'Is attestation by a notary or gazetted officer needed?',
    a: `Not for the computer number. ${HC.computerNumber} Address proof is accepted as a self-attested copy, and a Board Verification Certificate addressed to the flying school is attested by its Chief Flying Instructor.`,
  },
  {
    q: 'What if an old DGCA FAQ says new candidates must send a hard copy?',
    a: `Older copies of the computer number FAQ describe posting the form, which the Flight Crew User Manual, Issue III Rev 0, October 2024, replaced with a fully online application. Where two official documents disagree, follow the later one and confirm on the Pariksha portal before you spend on a courier.`,
  },
  {
    q: 'Where can I check what the exam form requires today?',
    a: `On the Pariksha portal, in the Flight Crew User Manual and in the examination application itself. The manual's examination-form chapter holds the rule, and the Help Desk tab or ${PARIKSHA.help.email} takes queries. The courier method and deadline are not in the sources we cite.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Do You Have to Post Documents to DGCA? Computer Number vs Exam Form',
  description:
    'The DGCA computer number needs no hard copy or attestation, but the exam application for a new candidate still has a paper rule. What each step needs, and the rule that trips people up.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA exams',
  keywords: 'DGCA hard copy documents, DGCA computer number attestation, DGCA exam form documents, Pariksha application hard copy, new candidate DGCA exam',
});

const sources = [
  { label: 'Flight Crew User Manual, Issue III Rev 0, October 2024 (DGCA Pariksha)', url: manualUrl },
  { label: 'Flight Crew Computer Number Registration FAQ (DGCA Pariksha)', url: faqUrl },
  { label: 'Public notice on DigiLocker integration with the Pariksha portal, 13 December 2024', url: noticeUrl },
  { label: 'DGCA Pariksha portal', url: PARIKSHA.portal },
];

const related = [
  { lead: 'The full computer number process is in', anchor: 'our DGCA computer number guide', href: '/dgca-computer-number' },
  { lead: 'The one certificate that still needs paper handling is covered in', anchor: 'the Board Verification Certificate post', href: '/blogs/board-verification-certificate-dgca-computer-number' },
  { lead: 'The instant route is explained in', anchor: 'the DigiLocker computer number post', href: '/blogs/dgca-computer-number-digilocker-instant-route' },
  { lead: 'Booking and fees are in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
];

const tocHeadings = [
  { id: 'computer-number', title: 'Do you post documents for a DGCA computer number?' },
  { id: 'exam-form', title: 'Does the DGCA exam form still need a hard copy?' },
  { id: 'side-by-side', title: 'How do the two applications compare?' },
  { id: 'uploads', title: 'What do you upload online instead of posting?' },
  { id: 'old-faq', title: 'Why do older pages say something different?' },
  { id: 'avoid-mistakes', title: 'How do you avoid losing a session over paperwork?' },
  { id: 'this-week', title: 'What to do this week' },
];

const rows = [
  { item: 'Hard copy by post', cn: 'None', exam: 'Required of a new candidate: the generated application PDF with the requisite documents must reach CEO' },
  { item: 'Notary or gazetted-officer attestation', cn: 'Removed', exam: 'Not stated in the rule quoted here' },
  { item: 'Where the application is made', cn: 'Pariksha portal, fully online', exam: 'Pariksha portal, plus the paper that must reach CEO' },
  { item: 'If something is missing', cn: 'Partial or complete rejection', exam: 'The candidate cannot appear in that examination' },
  { item: 'Who it applies to', cn: 'Every candidate', exam: 'New candidates; old candidates are not named in the rule' },
];

export default function DgcaHardCopyDocuments() {
  return (
    <BlogPostLayout
      title="DGCA Hard Copy Documents: Computer Number vs Exam Form"
      description="Do you post documents to DGCA? A computer number needs no hard copy, but a new candidate's exam form has a paper rule. See what each step needs and why."
      schema={[articleSchema, faqSchema]}
      heading="Do You Have to Post Documents to DGCA? Computer Number vs Exam Form"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'Do you have to post documents to DGCA?',
        answer: `Not for the computer number: it is fully online, with no hard copy and no notary or gazetted-officer attestation. The examination application is a separate rule: a new candidate's generated application PDF, with the requisite documents, must reach the Central Examination Organisation, or the candidate cannot appear in that examination.`,
      }}
      summaryTitle="Two applications, two paper rules"
      summaryItems={[
        HC.computerNumber,
        HC.examinationForm,
        `The computer number is issued within ${PARIKSHA.processing.days} working days of a complete manual application, and immediately on the DigiLocker route.`,
        'Older copies of the computer number FAQ describe posting the form, which the October 2024 manual replaced.',
        'Sources: the DGCA Pariksha Flight Crew User Manual (October 2024) and the Pariksha FAQ, read on 11 September 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="11 September 2026"
    >
      <p>
        A student finishes the online computer number form, gets a Temporary ID and then hears three
        different things: from a senior that DGCA wants a courier packet with attested copies, from a
        video that nothing is posted any more, and from the flying school that something has to reach
        Delhi before the exam. All three are partly right, because DGCA runs two applications with
        different rules. This post separates them, so the question of whether you post documents to
        DGCA gets one clear answer for each step.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/dgca-hard-copy-documents-computer-number-exam-form/hero-two-desks-one-envelope.webp"
        width={1200}
        height={630}
        alt="Two desks side by side, one with only a laptop and the other with a laptop and a sealed envelope waiting beside it"
        promptId="107"
      />

      <h2 id="computer-number" className={H2}>Do you post documents for a DGCA computer number?</h2>
      <p>
        No. The DGCA computer number application is fully online, and the{' '}
        <Ext href={manualUrl}>Flight Crew User Manual, Issue III Rev 0, October 2024</Ext> removed both
        the hard copy and the notary or gazetted-officer attestation from it. You fill the form, upload
        the documents as files and press Final Submit, all on the Pariksha portal.
      </p>
      <p>
        What you upload still has to be right, because nothing is added afterwards. {PARIKSHA.uploads.finalSubmit}{' '}
        The photograph and signature are JPG files of up to {PARIKSHA.uploads.photo.maxKb} KB and{' '}
        {PARIKSHA.uploads.signature.maxKb} KB, and every other document is a PDF. Our{' '}
        <Link href="/dgca-computer-number" className={LINK}>DGCA computer number guide</Link> walks through
        each step and the file limits.
      </p>
      <p>
        Two pieces of paper-related handling do survive inside this process, and neither is a courier
        packet. {PARIKSHA.addressProof.rule.split(' (User')[0]}. And a Board Verification Certificate
        addressed to the flying school is uploaded as a copy attested by the Chief Flying Instructor.
        The{' '}
        <Link href="/blogs/board-verification-certificate-dgca-computer-number" className={LINK}>
          Board Verification Certificate post
        </Link>{' '}
        explains the three ways it can be addressed.
      </p>

      <h2 id="exam-form" className={H2}>Does the DGCA exam form still need a hard copy?</h2>
      <p>
        For a new candidate, yes, according to the same manual. The examination application is a
        different form from the computer number, and its rule reads: {lc(HC.examinationForm.replace(/^Separate rule: /, ''))}
      </p>
      <p>
        The sentence has two parts worth reading slowly. The first is who it names: a new candidate,
        meaning someone appearing for the first time, and not old candidates. The second is the
        consequence. The penalty is not a delay or a fee; it is that the candidate cannot appear in
        that examination. A session fee is paid per paper and, once the form is submitted, {lc(PARIKSHA.booking.noChanges)}
      </p>
      <p>
        The sources we cite do not state the courier method, a postal deadline or the exact list of
        documents that goes with the PDF, so this post does not guess them. Read the examination-form
        chapter of the manual and the notice for your session on the{' '}
        <Ext href={PARIKSHA.portal}>Pariksha portal</Ext> before you send anything.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Not sure which step you are on?"
        title="Check your paperwork before the session"
        text="Our counsellors can talk through the order of the computer number, exam form and flying school paperwork with you. Counselling is free and promises no result."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <h2 id="side-by-side" className={H2}>How do the two applications compare?</h2>
      <p>
        The computer number and the examination form differ in the one place students notice: the
        paper. The table sets each rule next to the other, using only what the User Manual states.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">DGCA computer number and examination form compared on paper requirements</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Point</th>
              <th scope="col" className={TH}>Computer number</th>
              <th scope="col" className={TH}>Examination form</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.item}</td>
                <td className={TD}>{r.cn}</td>
                <td className={TD}>{r.exam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The computer number itself is allotted {lc(PARIKSHA.processing.statement)} A computer number
        comes before an exam booking, so the sequence is: number, then session booking through
        Bharatkosh, then the paper that must reach CEO. Our{' '}
        <Link href="/blogs/dgca-exam-guide" className={LINK}>DGCA exam guide</Link> covers the booking
        rules, and the{' '}
        <Link href="/blogs/dgca-computer-number-digilocker-instant-route" className={LINK}>DigiLocker route</Link>{' '}
        covers the faster way to the number.
      </p>

      <h2 id="uploads" className={H2}>What do you upload online instead of posting?</h2>
      <p>
        The portal asks for files in place of paper, and each file type has a size limit set in the
        User Manual. Photographs and signatures are JPG; every other document is a PDF, and a JPEG is
        rejected for those. Check each file opens and is readable before you move on, because a
        blurred or cropped scan is a listed rejection reason.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">File types and size limits for the DGCA computer number uploads</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>What you upload</th>
              <th scope="col" className={TH}>Format</th>
              <th scope="col" className={TH}>Size limit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>Photograph</td>
              <td className={TD}>{PARIKSHA.uploads.photo.format}</td>
              <td className={TD}>{PARIKSHA.uploads.photo.maxKb} KB</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Signature</td>
              <td className={TD}>{PARIKSHA.uploads.signature.format}</td>
              <td className={TD}>{PARIKSHA.uploads.signature.maxKb} KB</td>
            </tr>
            {PARIKSHA.uploads.pdfLimits.map((row, i) => (
              <tr key={row.documents} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{uc(row.documents)}</td>
                <td className={TD}>PDF</td>
                <td className={TD}>{row.maxKb} KB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Because the files replace the paper, they have to agree with each other. The name, father&rsquo;s
        name, mother&rsquo;s name and date of birth must read the same across every document, and the
        permanent address must match the proof you upload. Of the details that cause complete rejection,
        most are mismatches rather than missing pages, which is why our{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>rejection reasons post</Link>{' '}
        is worth reading before you press Final Submit.
      </p>

      <h2 id="old-faq" className={H2}>Why do older pages say something different?</h2>
      <p>
        Older pages say different things because the process changed and the documents did not all
        change together. An earlier computer number FAQ told new candidates to post the form to the
        Central Examination Organisation, and copies of it still circulate; the October 2024 manual
        replaced that with an online application. The{' '}
        <Ext href={faqUrl}>current FAQ on the portal</Ext> and the{' '}
        <Ext href={noticeUrl}>13 December 2024 public notice</Ext> sit alongside it.
      </p>
      <p>
        Where two official documents disagree, treat the later one as the rule and confirm on the
        portal. The point of the confusion is that a courier receipt for a computer number form is
        wasted money, while a missing examination-form paper can cost a session. Do not collapse the two.
      </p>

      <h2 id="avoid-mistakes" className={H2}>How do you avoid losing a session over paperwork?</h2>
      <p>
        Treat the examination-form paper as a task with its own date, separate from the booking. A
        session fee cannot be moved once paid, so a missed paper is the costly mistake. Work through the
        order below.
      </p>
      <ol className={OL}>
        <li>Get the computer number first, and check the details match your Class 10 record, because a mismatch is a rejection reason (see <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>why applications get rejected</Link>).</li>
        <li>Read the examination-form chapter of the manual before choosing a session, and note what it says a new candidate must send.</li>
        <li>Book the session on the portal and pay through Bharatkosh before the closing date; {lc(PARIKSHA.booking.deadline)}</li>
        <li>Generate the application PDF, assemble the requisite documents and send them so they reach CEO, then keep proof of dispatch.</li>
        <li>Ask your flying school or the Help Desk about anything the manual does not settle. If you are still choosing a school, our <Link href="/online-dgca-ground-classes" className={LINK}>DGCA ground classes</Link> page lists what we teach.</li>
      </ol>
      <p>
        Our <Link href="/student-checklists" className={LINK}>student checklists</Link> hold the document
        list for the computer number so the pile you send later matches the files you uploaded.
      </p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        If you hold a Temporary ID, wait for the computer number rather than posting anything for it.
        Then open the examination-form chapter of the manual, find the rule for new candidates and put the
        date it must reach CEO on your calendar next to the booking date. When the Pariksha portal and
        this post differ, the portal wins.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
