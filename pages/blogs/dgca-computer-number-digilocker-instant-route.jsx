import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { PARIKSHA, ACADEMY } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, lc, listJoin, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from board-verification-certificate-dgca-computer-number (which owns the BVC on the manual
 * route and mentions the DigiLocker waiver in one line), dgca-computer-number-rejected-reasons (what
 * gets a manual application rejected) and the /dgca-computer-number how-to page. This post owns one
 * question: who can get the instant DigiLocker number, what it fetches, and what happens when it fails.
 * Every figure comes from PARIKSHA.digilocker, PARIKSHA.processing and PARIKSHA.uploads in lib/facts.js.
 * Which boards are covered beyond CBSE is NOT stated: secondary reports say it has widened, but the
 * only primary source on file (PIB, 17 October 2025) describes Phase I, so the post sends the reader
 * to the portal for their board. FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits).
 */
const SLUG = 'dgca-computer-number-digilocker-instant-route';
const DATE_PUBLISHED = '2026-10-10';
const DATE_MODIFIED = '2026-10-10';

const DL = PARIKSHA.digilocker;
const [pibSource, noticeSource, portalSource] = DL.sources;

const peopleAlsoAsk = [
  {
    q: 'Is the DGCA computer number instant now?',
    a: `For eligible candidates, yes. ${DL.allotment} The route has been available since ${DL.since}. On the manual route the number is issued within ${PARIKSHA.processing.days} working days of a complete application, so the instant route only helps if your records qualify for it.`,
  },
  {
    q: 'Do I still need a Board Verification Certificate if I use DigiLocker?',
    a: `Not for the documents DigiLocker supplies. ${DL.bvcEffect} The waiver comes from ${DL.bvcWaiverNotice}. A candidate who falls back to the manual route is asked for the certificate again.`,
  },
  {
    q: 'Can a foreign national or NRI use the DigiLocker route?',
    a: `No. The route needs Indian nationality, so foreign nationals go the manual way. ${PARIKSHA.foreignCandidates.passport} ${PARIKSHA.foreignCandidates.securityClearance}`,
  },
  {
    q: 'What if my Aadhaar name does not match my marksheet exactly?',
    a: `${DL.failureMode} A single-letter difference is enough to trigger it, so check the Aadhaar details before you start rather than after the system stops.`,
  },
  {
    q: 'What do I still upload on the DigiLocker route?',
    a: `Two files. ${listJoin(DL.stillUpload.map(lc))}. The photograph is held to ${PARIKSHA.uploads.photo.size}, ${PARIKSHA.uploads.photo.format} and ${PARIKSHA.uploads.photo.maxKb} KB at most.`,
  },
  {
    q: 'Which boards does the DigiLocker route cover?',
    a: `The first phase covered CBSE candidates who had passed Class 10 and Class 12, and DGCA said it would extend to other recognised boards whose records are in DigiLocker (PIB, 17 October 2025). The list has changed since, so read the registration page on the Pariksha portal for your board before choosing a route.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'DGCA Computer Number Through DigiLocker: Who Gets It Instantly and What Happens If It Fails',
  description:
    'How the DigiLocker route to a DGCA computer number works: who qualifies, what it fetches, what you still upload, and the manual fallback when records do not match.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA exams',
  keywords: 'DGCA computer number DigiLocker, instant computer number, Pariksha auto generation, DGCA computer number Aadhaar mismatch, computer number manual route',
});

const sources = [pibSource, noticeSource, portalSource, PARIKSHA.sources[0]];

const related = [
  { lead: 'The full registration walk-through is on', anchor: 'our DGCA computer number page', href: '/dgca-computer-number' },
  { lead: 'The manual-route certificate is explained in', anchor: 'the Board Verification Certificate post', href: '/blogs/board-verification-certificate-dgca-computer-number' },
  { lead: 'Why applications fail is covered in', anchor: 'the computer number rejection post', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'Correcting a profile later is in', anchor: 'the profile-changes post', href: '/blogs/change-details-dgca-computer-number-profile' },
];

const tocHeadings = [
  { id: 'what', title: 'What is the DigiLocker route to a computer number?' },
  { id: 'who', title: 'Who qualifies for it?' },
  { id: 'fetched', title: 'What does DigiLocker fill in, and what do you still upload?' },
  { id: 'steps', title: 'How do you register by the DigiLocker route?' },
  { id: 'fails', title: 'What happens when the instant route fails?' },
  { id: 'compare', title: 'Which route should you plan for?' },
  { id: 'this-week', title: 'What to do this week' },
];

const routeRows = [
  { item: 'Time to the number', digi: DL.allotment, manual: PARIKSHA.processing.statement.split(' On the DigiLocker')[0] },
  { item: 'Board Verification Certificate', digi: 'Not required for the Class X and XII documents fetched from DigiLocker.', manual: 'Required for every new candidate, for both marksheets.' },
  { item: 'Education records', digi: 'Fetched from the board through DigiLocker.', manual: 'Uploaded by you as PDFs and checked by hand.' },
  { item: 'Who it is for', digi: 'Indian nationals whose records match.', manual: DL.whoStillGoesManual },
];

export default function DgcaComputerNumberDigilockerInstantRoute() {
  return (
    <BlogPostLayout
      title="DGCA Computer Number Through DigiLocker: Who Qualifies"
      description="How the DigiLocker route to a DGCA computer number works: who qualifies, what it fetches, what you still upload and the manual fallback if records differ."
      schema={[articleSchema, faqSchema]}
      heading="DGCA Computer Number Through DigiLocker: Who Gets It Instantly and What Happens If It Fails"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'Can you get a DGCA computer number instantly through DigiLocker?',
        answer: `Yes, if your records qualify. The system allots the number immediately on successful submission, instead of after up to ${PARIKSHA.processing.days} working days of manual checking. You need Indian nationality, Class 10 and 12 records in DigiLocker and an Aadhaar that matches exactly. Any mismatch sends you to the manual route.`,
      }}
      summaryTitle="The DigiLocker route in one view"
      summaryItems={[
        `The system allots the computer number immediately on successful submission; the route has run since ${DL.since}.`,
        `It needs ${listJoin(DL.conditions.map(lc).slice(0, 3))}, and an exact Aadhaar match.`,
        `${DL.bvcEffect}`,
        `You still upload a photograph that matches the DigiLocker photograph to at least 80%, and your signature.`,
        `Sources: DGCA's public notice, PIB and the Pariksha portal, read on 11 September 2026; board coverage has changed since, so check the portal.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="11 September 2026"
    >
      <p>
        A student finishes Class 12, opens the Pariksha portal and reads three different guides that
        disagree. One says the computer number takes fifteen working days and needs a certificate
        from the school board. Another says it arrives the moment you submit. Both are right, for
        different candidates. The DGCA computer number DigiLocker route is a second path laid over
        the manual one, and which path you land on depends on your nationality, your board and
        whether your Aadhaar details match your marksheet. This post settles who gets which.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/dgca-computer-number-digilocker/hero-two-routes-one-gate.webp"
        width={1200}
        height={630}
        alt="Two paths leading to one gate: a short direct path from a phone and a longer path via a stack of documents"
        promptId="101"
      />

      <h2 id="what" className={H2}>What is the DigiLocker route to a computer number?</h2>
      <p>
        The DigiLocker route is a way to register on the Pariksha portal in which the education
        records are fetched from DigiLocker and the computer number is allotted straight away. {DL.allotment}{' '}
        DGCA announced it through{' '}
        <Ext href={pibSource.url}>a PIB release of 17 October 2025</Ext>, and the portal calls it
        &ldquo;{DL.label}&rdquo;.
      </p>
      <p>
        It sits on top of the manual application rather than replacing it. An earlier step came first:
        from {DL.bvcWaiverSince}, under{' '}
        <Ext href={noticeSource.url}>a public notice dated 13 December 2024</Ext>, documents fetched
        from DigiLocker no longer needed a Board Verification Certificate. The number itself is for
        life and is issued once per category, whichever route you use.
      </p>

      <h2 id="who" className={H2}>Who qualifies for the DigiLocker route?</h2>
      <p>
        An Indian national with both Class 10 and Class 12 records in DigiLocker and an Aadhaar that
        matches those records exactly qualifies. DGCA lists four conditions, and failing any one of
        them puts you on the manual route.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">The four conditions for the DigiLocker computer number route</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Condition</th>
              <th scope="col" className={TH}>What to check before you start</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>{DL.conditions[0]}</td>
              <td className={TD}>Foreign nationals, including Nepal and Bhutan candidates, apply manually with a passport.</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>{DL.conditions[1]}</td>
              <td className={TD}>Both passes must be on record; there is no route for a pending result.</td>
            </tr>
            <tr className="bg-white">
              <td className={TD_HEAD}>{DL.conditions[2]}</td>
              <td className={TD}>Sign in to DigiLocker and look for your Class 10 and 12 documents. If they are absent, your board is not feeding it yet.</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>{DL.conditions[3]}</td>
              <td className={TD}>Compare the Aadhaar name and date of birth with the marksheet, letter for letter.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Board coverage is the condition that moves. The first phase covered CBSE, and DGCA said other
        recognised boards would follow as their documents come online. Read the{' '}
        <Ext href={portalSource.url}>DigiLocker registration page on the Pariksha portal</Ext> for the
        current position on your board. A foreign candidate&rsquo;s route is set out in our post on{' '}
        <Link href="/blogs/foreign-national-nri-pilot-training-india" className={LINK}>foreign nationals and NRIs training in India</Link>.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Stuck at registration?"
        title="Get your documents checked before you submit"
        text="Counselling is free. Bring your Class 10 and 12 marksheets and your Aadhaar and we will compare the details line by line against the Pariksha rules, and say plainly which route you are on."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <h2 id="fetched" className={H2}>What does DigiLocker fill in, and what do you still upload?</h2>
      <p>
        DigiLocker fills in your education record, personal particulars and Aadhaar photograph, and
        you still upload a fresh photograph and your signature. That is the whole upload on this
        route, which is why it is faster and why a mismatch is the main thing that can go wrong.
      </p>
      <ul className={UL}>
        {DL.fetched.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <p>You upload these yourself:</p>
      <ul className={UL}>
        {DL.stillUpload.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <p>
        The photograph rules are the same as on the manual route: {PARIKSHA.uploads.photo.size},{' '}
        {PARIKSHA.uploads.photo.age.toLowerCase()}, {PARIKSHA.uploads.photo.format} and no more than{' '}
        {PARIKSHA.uploads.photo.maxKb} KB. The signature is {PARIKSHA.uploads.signature.size}, no more
        than {PARIKSHA.uploads.signature.maxKb} KB. The 80% match is why a photograph taken years ago,
        or with a very different appearance from your Aadhaar picture, is a risk worth removing.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-computer-number-digilocker/fetched-and-uploaded.webp"
        width={1200}
        height={675}
        alt="A phone on the left sending a stack of documents to a laptop, while a student's hand on the right holds a photograph and a signed card"
        promptId="102"
      />

      <h2 id="steps" className={H2}>How do you register by the DigiLocker route?</h2>
      <p>
        You register on the Pariksha portal, choose the DigiLocker option on the registration page,
        let the portal fetch your records, upload a photograph and signature, and submit. The
        portal&rsquo;s own sequence for the manual form is below; the DigiLocker route replaces the
        document-upload and waiting steps but keeps the same opening and closing.
      </p>
      <ol className="list-decimal pl-5 space-y-3 text-gray-700">
        <li>Check DigiLocker first. Confirm both Class 10 and Class 12 documents are present and that your Aadhaar is linked.</li>
        <li>Open the registration page on the <Ext href={PARIKSHA.portal}>Pariksha portal</Ext> and pick &ldquo;{DL.label}&rdquo;.</li>
        <li>Let the portal fetch your name, date of birth, marks, address and Aadhaar photograph. Read each field against your marksheet before moving on.</li>
        <li>Upload your photograph and signature within the size limits in the table above.</li>
        <li>Submit. On success the system allots the number at once; on a mismatch it tells you the application will be handled manually.</li>
      </ol>
      <p>
        Two cautions apply. The manual form warns that nothing can be added after Final Submit,
        and the same sense of care applies here: {lc(PARIKSHA.uploads.finalSubmit)} And one email address and one mobile
        number can belong to only one candidate, so do not register a sibling or friend on yours.
        {' '}{PARIKSHA.basics.oneEmailOneMobile}
      </p>

      <h2 id="fails" className={H2}>What happens when the instant route fails?</h2>
      <p>
        When the details do not match, the system may stop generating the number and the application
        goes the manual way. {DL.failureMode} You lose time, not the application, but you also need
        the certificate and the scrutiny you hoped to skip.
      </p>
      <p>
        Three things cause most of these stops, all rooted in the rule that names are matched
        exactly: {PARIKSHA.name.rule} {PARIKSHA.name.consequence} The date of birth must also agree to
        the day, and only the Class 10 documents or a birth certificate count as proof, not Aadhaar.
        Our posts on the{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>reasons a computer number is rejected</Link>{' '}
        and on the{' '}
        <Link href="/blogs/board-verification-certificate-dgca-computer-number" className={LINK}>Board Verification Certificate</Link>{' '}
        cover the manual route in detail. If your details are already wrong on the profile, see{' '}
        <Link href="/blogs/change-details-dgca-computer-number-profile" className={LINK}>how to change them</Link>.
      </p>

      <h2 id="compare" className={H2}>Which route should you plan for?</h2>
      <p>
        Plan for the DigiLocker route if you are an Indian national, your records appear in
        DigiLocker and your Aadhaar matches, and keep the manual documents ready as a fallback.
        Treating the fast route as a certainty is how students find out about the certificate late.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">DigiLocker route compared with the manual route for a DGCA computer number</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Point</th>
              <th scope="col" className={TH}>DigiLocker route</th>
              <th scope="col" className={TH}>Manual route</th>
            </tr>
          </thead>
          <tbody>
            {routeRows.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.item}</td>
                <td className={TD}>{r.digi}</td>
                <td className={TD}>{r.manual}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The step-by-step form filling is on our{' '}
        <Link href="/dgca-computer-number" className={LINK}>DGCA computer number page</Link>. Once you
        have the number, the written papers are next, and we teach those in our{' '}
        <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes</Link>.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Open DigiLocker, check that your Class 10 and 12 documents are there and compare the Aadhaar
        name and date of birth with your marksheet. If everything agrees, register on the portal by
        the DigiLocker route. If anything differs, start gathering the manual documents now, so the
        fallback costs you days rather than weeks.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
