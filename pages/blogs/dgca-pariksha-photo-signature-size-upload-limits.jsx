import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { PARIKSHA, ACADEMY } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from dgca-computer-number-rejected-reasons (why an application is refused, with uploads as one
 * line among many), board-verification-certificate-dgca-computer-number (one document) and
 * change-details-dgca-computer-number-profile (editing after approval). This post owns the file
 * specifications: format and size cap for the photograph, the signature and every PDF.
 * Every figure comes from PARIKSHA.uploads, PARIKSHA.rejection and PARIKSHA.digilocker in lib/facts.js.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'dgca-pariksha-photo-signature-size-upload-limits';
const DATE_PUBLISHED = '2026-10-23';
const DATE_MODIFIED = '2026-10-23';

const U = PARIKSHA.uploads;
const photo = U.photo;
const sign = U.signature;
const [classDocs, smallDocs, logDocs] = U.pdfLimits;
const DL = PARIKSHA.digilocker;
const photoMatch = DL.stillUpload[0];
const portalUrl = PARIKSHA.portal;
const manualUrl = PARIKSHA.sources.find((s) => s.label.startsWith('Flight Crew User Manual')).url;
const rejectionUrl = PARIKSHA.sources.find((s) => s.label.startsWith('Reasons for rejection')).url;
const digilockerUrl = DL.sources.find((s) => s.label.startsWith('Register with DigiLocker')).url;

const peopleAlsoAsk = [
  {
    q: 'What is the photo size for the DGCA computer number?',
    a: `The photograph is ${photo.size}. It must be a ${photo.format} file of at most ${photo.maxKb} KB, ${lc(photo.age)}. ${photo.face}.`,
  },
  {
    q: 'What is the signature size for the DGCA Pariksha portal?',
    a: `The signature is ${sign.size}, saved as a ${sign.format} file of at most ${sign.maxKb} KB.`,
  },
  {
    q: 'Are marksheets uploaded as JPG or PDF on Pariksha?',
    a: `As PDF. Only the photograph and the signature are JPG files. Class 10 and Class 12 marksheets and pass certificates may be up to ${classDocs.maxKb} KB each.`,
  },
  {
    q: 'Can I add a missing document after Final Submit?',
    a: `No. ${U.finalSubmit} Use the Preview and BACK options to check every file before you submit.`,
  },
  {
    q: 'Can I replace my photo or signature after the computer number is issued?',
    a: `Not on your own. Both appear on the list of details that need approval, which goes through a request ID and a Profile Update Form. ${PARIKSHA.profileUpdates.note}`,
  },
  {
    q: 'Do I still upload a photograph if I use the DigiLocker route?',
    a: `Yes. On the DigiLocker route you still upload ${lc(photoMatch)}, and your signature to the specification in the Flight Crew User Manual.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'DGCA Computer Number Photo and Signature Size: Every Upload Limit',
  description:
    'Photo and signature size for the DGCA Pariksha computer number: the JPG and PDF limits in KB for every document, and what to check before Final Submit.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA exams',
  keywords: 'DGCA photo size, DGCA signature size, Pariksha photo upload, DGCA computer number documents, Pariksha PDF size limit',
});

const sources = [
  PARIKSHA.sources.find((s) => s.label.startsWith('Flight Crew User Manual')),
  PARIKSHA.sources.find((s) => s.label.startsWith('Reasons for rejection')),
  { label: 'DGCA Pariksha portal', url: PARIKSHA.portal },
];

const related = [
  { lead: 'Why applications get refused is in', anchor: 'the rejection reasons post', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'The one document with its own rules is in', anchor: 'the Board Verification Certificate guide', href: '/blogs/board-verification-certificate-dgca-computer-number' },
  { lead: 'Correcting details after approval is in', anchor: 'changing your computer number profile', href: '/blogs/change-details-dgca-computer-number-profile' },
  { lead: 'The skipped-upload route is in', anchor: 'the DigiLocker instant route', href: '/blogs/dgca-computer-number-digilocker-instant-route' },
];

const tocHeadings = [
  { id: 'photo-signature', title: 'What size must the photograph and signature be?' },
  { id: 'pdf-limits', title: 'Which documents are PDFs, and how big can they be?' },
  { id: 'wrong-file', title: 'What happens if a file is wrong?' },
  { id: 'prepare', title: 'How should you prepare the files before you start?' },
  { id: 'digilocker', title: 'Does the DigiLocker route change the uploads?' },
  { id: 'this-week', title: 'What to do this week' },
];

const pdfRows = [
  { docs: classDocs.documents, kb: classDocs.maxKb },
  { docs: smallDocs.documents, kb: smallDocs.maxKb },
  { docs: logDocs.documents, kb: logDocs.maxKb },
];

export default function DgcaParikshaPhotoSignatureSizeUploadLimits() {
  return (
    <BlogPostLayout
      title="DGCA Photo and Signature Size: Pariksha Upload Rules"
      description="Photo and signature size for the DGCA Pariksha computer number, the JPG and PDF limits in KB for each document, and what to check before you press Final Submit."
      schema={[articleSchema, faqSchema]}
      heading="DGCA Computer Number Photo and Signature Size: Every Upload Limit"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'What size must the photo and signature be on the DGCA Pariksha portal?',
        answer: `The photograph is a ${photo.format} file of at most ${photo.maxKb} KB, 45 mm high by 35 mm wide on a white background. The signature is a ${sign.format} file of at most ${sign.maxKb} KB. Every other document is a PDF with its own cap of ${smallDocs.maxKb}, ${logDocs.maxKb} or ${classDocs.maxKb} KB. Nothing can be added after Final Submit.`,
      }}
      summaryTitle="The upload limits in one view"
      summaryItems={[
        `Photograph: ${photo.format}, up to ${photo.maxKb} KB, ${photo.age.toLowerCase()}.`,
        `Signature: ${sign.format}, up to ${sign.maxKb} KB, on a white background with no border.`,
        `Class 10 and Class 12 marksheets and pass certificates are PDFs of up to ${classDocs.maxKb} KB each.`,
        U.finalSubmit,
        'Sources: the DGCA Pariksha Flight Crew User Manual and its list of rejection reasons, read on 11 September 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="11 September 2026"
    >
      <p>
        A student sits down with a fresh account on the Pariksha portal, a phone full of photos and a
        folder of scanned certificates. Twenty minutes later the upload button refuses a file, or
        worse, accepts it and the application comes back rejected a few weeks on. Photo and signature
        size for the DGCA computer number sounds like a small detail, yet it is one of the things the
        portal checks first. This post sets out the format and size cap for every file, so you can
        prepare them once before you open the form.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/dgca-pariksha-photo-signature-size-upload-limits/hero-files-sorted-by-size.webp"
        width={1200}
        height={630}
        alt="A tidy row of document folders of different thicknesses on a desk beside a small photo frame and a signature card"
        promptId="107"
      />

      <h2 id="photo-signature" className={H2}>What size must the photograph and signature be?</h2>
      <p>
        The photograph is {photo.size}, saved as a {photo.format} file of at most {photo.maxKb} KB. The
        signature is {sign.size}, also a {sign.format} file, at most {sign.maxKb} KB. Both are laid
        out in the{' '}
        <Ext href={manualUrl}>DGCA Flight Crew User Manual</Ext> that the Pariksha portal publishes.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Photograph and signature specifications on the DGCA Pariksha portal</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Item</th>
              <th scope="col" className={TH}>Photograph</th>
              <th scope="col" className={TH}>Signature</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>Dimensions and look</td>
              <td className={TD}>{photo.size}</td>
              <td className={TD}>{sign.size}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>File format</td>
              <td className={TD}>{photo.format}</td>
              <td className={TD}>{sign.format}</td>
            </tr>
            <tr className="bg-white">
              <td className={TD_HEAD}>Largest file</td>
              <td className={TD}>{photo.maxKb} KB</td>
              <td className={TD}>{sign.maxKb} KB</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Other conditions</td>
              <td className={TD}>{photo.face}. {photo.age}.</td>
              <td className={TD}>None beyond size and background.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The age condition matters more than it looks: an old photograph from a previous form fails it,
        so take a fresh one rather than reusing a file. Sign the way you will sign your other
        documents, because you cannot swap the signature yourself once the form is submitted.
      </p>

      <h2 id="pdf-limits" className={H2}>Which documents are PDFs, and how big can they be?</h2>
      <p>
        Every document other than the photograph and signature is uploaded as a PDF, and the cap
        depends on the document type: {classDocs.maxKb} KB for Class 10 and Class 12 records,{' '}
        {logDocs.maxKb} KB for logbook pages, passport and visa, and {smallDocs.maxKb} KB for the long
        list of certificates in the third row below.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">PDF size limits by document type on the DGCA Pariksha portal</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Documents</th>
              <th scope="col" className={TH}>Format</th>
              <th scope="col" className={TH}>Largest file</th>
            </tr>
          </thead>
          <tbody>
            {pdfRows.map((r, i) => (
              <tr key={r.docs} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.docs}</td>
                <td className={TD}>PDF</td>
                <td className={TD}>{r.kb} KB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Two details trip people up. Class 10 and Class 12 each need both the marksheet and the pass
        certificate: {PARIKSHA.education.documents} And the files must be readable: {PARIKSHA.education.legibility}
      </p>

      <p>
        Address proof is the document students most often leave until last. {PARIKSHA.addressProof.rule}{' '}
        The accepted proofs are: {PARIKSHA.addressProof.documents.map((d) => d.toLowerCase()).join(', ')}.
        Whichever you choose, the permanent address you type into the form must match it, and the
        scan counts against the {smallDocs.maxKb} KB cap above. Candidates who are not Indian nationals
        also upload a passport, which has its own {logDocs.maxKb} KB cap.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Stuck on a document?"
        title="Check your file list before you apply"
        text="Our student checklists list what to gather before the Pariksha form opens. They are free, and nothing in them promises an outcome."
        href="/student-checklists"
        label="See the checklists"
      />

      <h2 id="wrong-file" className={H2}>What happens if a file is wrong?</h2>
      <p>
        A wrong photograph or signature is a listed ground for rejection. DGCA&rsquo;s own{' '}
        <Ext href={rejectionUrl}>reasons for rejection</Ext> name both: the photograph or the signature
        as not uploaded to the specification in the user manual. Neither is a basic detail such as
        a name or date of birth, so both sit on the partial side of the rule.
      </p>
      <ul className={UL}>
        <li>{PARIKSHA.rejection.partial.meaning}</li>
        <li>{PARIKSHA.rejection.partial.escalation}</li>
        <li>{PARIKSHA.rejection.notification}</li>
        <li>
          {PARIKSHA.rejectionReasons[0]} {PARIKSHA.rejectionReasons[1]}
        </li>
      </ul>
      <p>
        The wider picture, including the
        mismatches that cause complete rejection, is in{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>why a DGCA computer number application gets rejected</Link>.
      </p>

      <h2 id="prepare" className={H2}>How should you prepare the files before you start?</h2>
      <p>
        Prepare every file before you register, because the activation link emailed to you is valid for 24
        hours only and the form is easier to complete in one calm sitting. Name each file clearly,
        check its size on your computer, and open it again after saving.
      </p>
      <ol className={OL}>
        <li>Take a new photograph against a plain white wall and crop it to the shape in the table above.</li>
        <li>Sign on white paper with a dark pen, photograph or scan it flat, and trim the white space.</li>
        <li>Scan the Class 10 and Class 12 marksheets and certificates as separate PDFs and check each is under its cap.</li>
        <li>If a scan is too large, reduce its scan resolution and save again rather than cropping out part of the page.</li>
        <li>Open every file one last time. A blurred, cropped or partial scan is a listed rejection reason.</li>
        <li>Use Preview and BACK on the portal to fix anything. {U.finalSubmit}</li>
      </ol>
      <p>
        Your Class 10 record also fixes the spelling of your name, so read{' '}
        <Link href="/blogs/board-verification-certificate-dgca-computer-number" className={LINK}>the Board Verification Certificate guide</Link>{' '}
        before you upload anything that carries it.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-pariksha-photo-signature-size-upload-limits/photo-and-signature-frames.webp"
        width={1200}
        height={675}
        alt="A plain white-background portrait frame and a wide thin signature strip laid side by side on a desk next to a scanner"
        promptId="108"
      />

      <h2 id="digilocker" className={H2}>Does the DigiLocker route change the uploads?</h2>
      <p>
        Partly. {DL.allotment} The DigiLocker route fetches your Class 10 and Class 12 records, so you
        skip those PDFs, but you still upload a photograph and a signature. The photograph must match the
        DigiLocker photograph to at least 80%, and the file specification is the one in the table above.
      </p>
      <p>
        What you upload on this route: {DL.stillUpload.map((s) => lc(s)).join('; and ')}. The route
        has conditions of its own, set out on the{' '}
        <Ext href={digilockerUrl}>DigiLocker registration page</Ext> and in{' '}
        <Link href="/blogs/dgca-computer-number-digilocker-instant-route" className={LINK}>our DigiLocker guide</Link>.
        If the automatic check fails, the application goes the manual way and every PDF above applies
        again.
      </p>
      <p>
        For the whole application in order, from the registration tab to the Temporary ID, see{' '}
        <Link href="/dgca-computer-number" className={LINK}>our DGCA computer number page</Link>, and for the
        licence this registration leads to, the <Link href="/courses/cpl" className={LINK}>CPL course</Link>.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Make the photograph and signature files first, since they have the tightest caps and the most
        ways to fail, then scan your certificates. Keep every file in one folder, check each against the
        tables above and only then open the{' '}
        <Ext href={portalUrl}>Pariksha portal</Ext>. Once your computer number arrives, the next job is
        booking a paper, which <Link href="/blogs/dgca-exam-guide" className={LINK}>our DGCA exam guide</Link> walks through.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
