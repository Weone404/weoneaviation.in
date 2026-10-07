import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { PARIKSHA, ACADEMY } from '../../lib/facts';

/*
 * Distinct from dgca-computer-number-rejected-reasons (why an application is rejected) and the
 * /dgca-computer-number how-to page (the whole process). This post owns one document: the Board
 * Verification Certificate (BVC), who needs it, the three ways it can be addressed, and the DigiLocker waiver.
 * Every rule is read from PARIKSHA in lib/facts.js. How a school or board issues a BVC, and how long
 * a board takes, are NOT in PARIKSHA, so the post says they vary.
 * FAQPage schema is built from peopleAlsoAsk because data/pageFaqs.js is off limits to the routine.
 */
const DATE_PUBLISHED = '2026-10-07';
const DATE_MODIFIED = '2026-10-07';
const CANONICAL = 'https://weoneaviation.in/blogs/board-verification-certificate-dgca-computer-number';

const { bvc, digilocker, aiu, uploads } = PARIKSHA;
const bvcKb = uploads.pdfLimits.find((p) => p.documents.includes('board verification')).maxKb;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Board Verification Certificate for a DGCA Computer Number: Who Needs It and How It Works',
  description:
    'The Board Verification Certificate (BVC) is the document that trips up manual DGCA computer number applications. Who needs it, the three ways it can be addressed, and when DigiLocker waives it.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA computer number',
  keywords: 'board verification certificate DGCA, BVC DGCA computer number, DGCA computer number documents, Pariksha BVC, DigiLocker DGCA',
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
    q: 'What is a Board Verification Certificate for DGCA?',
    a: `A Board Verification Certificate (BVC) is a document from your Class 10 or Class 12 board confirming that your marksheet is genuine. DGCA asks for it from new candidates on the manual computer number route. ${bvc.whoNeedsIt}`,
  },
  {
    q: 'Do I need a BVC if I register through DigiLocker?',
    a: `${digilocker.bvcEffect} That waiver covers only the documents DigiLocker supplies. If the automatic check fails, the application goes the manual way and the BVC is back in play.`,
  },
  {
    q: 'Can I upload a colour photocopy of the BVC?',
    a: `No. ${bvc.noColourPhotocopies}`,
  },
  {
    q: 'Who should the BVC be addressed to?',
    a: `It depends on how the board issued it. Addressed to the CEO or "To Whomsoever It May Concern", the original must already be with CEO on the day you submit. Addressed to the flying school, upload a copy attested by the Chief Flying Instructor. Addressed to you, upload an attested or self-attested copy.`,
  },
  {
    q: 'What if my board is an international board?',
    a: `${bvc.internationalBoards} ${aiu.whenNeeded} is also when an equivalence certificate from the ${aiu.body} comes in.`,
  },
  {
    q: 'How long does a board take to issue a BVC?',
    a: `This varies by board and DGCA's published documents do not give a figure, so none is stated here. Ask your board's office early, before you start the Pariksha application.`,
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
  { lead: 'The whole registration process is in', anchor: 'our DGCA computer number guide', href: '/dgca-computer-number' },
  { lead: 'Why applications get turned down is covered in', anchor: 'the rejection reasons post', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'Correcting a detail after allotment is covered in', anchor: 'the profile changes post', href: '/blogs/change-details-dgca-computer-number-profile' },
  { lead: 'The papers you book with that number are explained in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'Check the education bar first on', anchor: 'the CPL eligibility page', href: '/commercial-pilot-license-eligibility' },
];

const tocHeadings = [
  { id: 'answer', title: 'What is the Board Verification Certificate?' },
  { id: 'who', title: 'Who needs one, and who does not' },
  { id: 'cases', title: 'The three ways a BVC is addressed' },
  { id: 'mistakes', title: 'Where BVCs go wrong' },
  { id: 'international', title: 'International boards and equivalence' },
  { id: 'unknowns', title: 'What this post cannot tell you' },
  { id: 'why-weone', title: 'Help from We One Aviation' },
];

const caseRows = bvc.cases.map((c) => ({ to: c.addressedTo, action: c.action }));

const whoRows = [
  { route: 'DigiLocker route, documents fetched automatically', needed: 'No. ' + digilocker.bvcEffect },
  { route: 'Manual route, new candidate', needed: 'Yes, for the Class 10 and Class 12 (or diploma) marksheets.' },
  { route: 'Old candidate with an existing record', needed: 'Not asked for.' },
  { route: 'Automatic check fails, application falls back', needed: 'Yes. The manual rules apply from there.' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const LINK = 'text-av-orange font-semibold underline';

export default function BoardVerificationCertificateDgcaComputerNumber() {
  return (
    <BlogPostLayout
      title="Board Verification Certificate for a DGCA Computer Number"
      description="The Board Verification Certificate (BVC) is the document that trips up manual DGCA computer number applications. Who needs it, the three ways it is addressed, and when DigiLocker waives it."
      schema={[articleSchema, faqSchema]}
      heading="Board Verification Certificate for a DGCA Computer Number: Who Needs It and How It Works"
      category="DGCA computer number"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'What is the Board Verification Certificate for a DGCA computer number?',
        answer: `The Board Verification Certificate (BVC) is a letter from your school board confirming your Class 10 and Class 12 marksheets are genuine. New candidates on the manual Pariksha route must upload one. Candidates whose documents are fetched through DigiLocker do not need it for those documents. Coloured photocopies are not accepted.`,
      }}
      summaryTitle="The BVC in one view"
      summaryItems={[
        bvc.whoNeedsIt,
        digilocker.bvcEffect,
        'The upload rule depends on whom the BVC is addressed to: the CEO, the flying school, or you.',
        bvc.noColourPhotocopies,
        `Source: DGCA Pariksha User Manual and FAQ, read on ${PARIKSHA.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/board-verification-certificate-dgca-computer-number/hero-bvc-document-trail.webp"
        width={1200}
        height={630}
        alt="A student holding a school marksheet while a stamped letter travels from a school board building to a DGCA office, shown as a simple path between two buildings"
        promptId="93"
      />

      <h2 id="answer" className={H2}>What is the Board Verification Certificate?</h2>
      <p>
        When you register for a DGCA computer number, the Central Examination Organisation has to
        be sure that the Class 10 and Class 12 marksheets you upload are real. The Board
        Verification Certificate, usually shortened to BVC, is how a manual application proves it:
        your board confirms the marks, and DGCA checks the confirmation against your upload.
      </p>
      <p>
        It is the document most often missing or wrong on a first attempt, and a missing or
        mismatched BVC is a listed reason for rejection. This post covers that one document. For
        the whole registration, see{' '}
        <Link href="/dgca-computer-number" className={LINK}>our computer number guide</Link>.
      </p>

      <h2 id="who" className={H2}>Who needs one, and who does not</h2>
      <p>
        Since {digilocker.bvcWaiverSince} there are two routes, and the BVC question has a
        different answer on each. The waiver came in under {digilocker.bvcWaiverNotice}.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Who needs a Board Verification Certificate for a DGCA computer number</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Your situation</th>
              <th scope="col" className={TH}>BVC needed?</th>
            </tr>
          </thead>
          <tbody>
            {whoRows.map((r, i) => (
              <tr key={r.route} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.route}</td>
                <td className={TD}>{r.needed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The DigiLocker route needs these conditions to hold: {digilocker.conditions.join('; ').toLowerCase()}.
        {' '}{digilocker.failureMode} The waiver is for the specific documents DigiLocker
        supplies. It has not abolished the BVC.
      </p>

      <h2 id="cases" className={H2}>The three ways a BVC is addressed</h2>
      <p>
        What you upload depends on whom your board addressed the certificate to. DGCA's User
        Manual lists three cases.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">What to do with a BVC depending on whom it is addressed to</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>BVC addressed to</th>
              <th scope="col" className={TH}>What DGCA expects</th>
            </tr>
          </thead>
          <tbody>
            {caseRows.map((r, i) => (
              <tr key={r.to} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.to}</td>
                <td className={TD}>{r.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Whichever case applies, the file goes up as a PDF of no more than {bvcKb} KB.{' '}
        {bvc.noColourPhotocopies} If your board gave you a BVC addressed to a flying school, tell
        the school's Chief Flying Instructor early, since the attestation is theirs to give.
      </p>

      <BlogImagePlaceholder
        src="/blog/board-verification-certificate-dgca-computer-number/three-addressee-paths.webp"
        width={1200}
        height={675}
        alt="One envelope splitting into three paths that lead to a government office, a flying school desk and a student's hands"
        promptId="94"
      />

      <h2 id="mistakes" className={H2}>Where BVCs go wrong</h2>
      <p>
        DGCA's own list of rejection reasons names the BVC more than once. Each of these is
        avoidable before you submit:
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li><strong>Missing or incomplete.</strong> The certificate is not uploaded, or a page is cut off.</li>
        <li><strong>Marks that do not match.</strong> The BVC shows different marks from the marksheet you uploaded. Compare the two line by line.</li>
        <li><strong>Not legible.</strong> A blurred phone photograph is not a scan.</li>
        <li><strong>Online verification that does not work.</strong> {bvc.onlineVerification}</li>
        <li><strong>A colour photocopy.</strong> {bvc.noColourPhotocopies}</li>
      </ul>
      <p>
        A fault in a supporting document is usually a partial rejection, which you can correct
        and resubmit, but only {PARIKSHA.rejection.partial.maxTimes} times. {PARIKSHA.rejection.partial.escalation}{' '}
        See{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>why applications get rejected</Link>.
      </p>

      <h2 id="international" className={H2}>International boards and equivalence</h2>
      <p>
        {bvc.internationalBoards} Separately, {aiu.whenNeeded.charAt(0).toLowerCase() + aiu.whenNeeded.slice(1).replace(/\.$/, '')}, an
        equivalence certificate comes from the {aiu.body}. {aiu.diploma}
      </p>

      <h2 id="unknowns" className={H2}>What this post cannot tell you</h2>
      <p>
        The rules above come from DGCA's Pariksha User Manual and FAQ, read on {PARIKSHA.verifiedOn}.
        They do not say how long a board takes to issue a BVC, what each board charges, or how
        to request one from a particular board, so this post gives no figure. Those vary by
        board, and the quickest answer is your school's office or the board's website. Confirm
        the current rules on{' '}
        <a href={PARIKSHA.portal} className={LINK} rel="noopener noreferrer">the Pariksha portal</a>{' '}
        before you apply, since DGCA can change them.
      </p>

      <BlogImagePlaceholder
        src="/blog/board-verification-certificate-dgca-computer-number/digilocker-vs-manual.webp"
        width={1200}
        height={675}
        alt="Two routes from a student to a DGCA office: a short digital path on one side and a longer paper path with a stamped letter on the other"
        promptId="95"
      />

      <h2 id="why-weone" className={H2}>Help from We One Aviation</h2>
      <p>
        We teach the DGCA ground subjects from Dwarka and can talk you through which route your
        board puts you on before you start. See our{' '}
        <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes</Link> and the{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
