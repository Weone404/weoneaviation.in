import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { ACADEMY, EDUCATION, PARIKSHA } from '../../lib/facts';

/*
 * /blogs/dgca-computer-number-rejected-reasons — new 2026-09-29.
 *
 * WHY THIS TOPIC. Pre-CPL audience: every student has to clear the computer
 * number before any exam can be booked, and "computer number rejected" is a
 * distinct search from "how to apply" (which /dgca-computer-number already
 * answers as a step-by-step pillar). This post is the diagnostic version: what
 * DGCA's own rejection list says, the partial-versus-complete split, and the
 * three-strikes rule.
 *
 * SOURCING. Everything comes from PARIKSHA in lib/facts.js (rejection,
 * rejectionReasons, name, dob, bvc, uploads, processing, digilocker), which was
 * read out of DGCA's own FAQ, User Manual and rejection-reasons PDF. Nothing is
 * added here that is not in that object. No fee, timing or success-rate claim
 * beyond what PARIKSHA holds.
 */

const DATE_PUBLISHED = '2026-09-29';
const DATE_MODIFIED = '2026-09-29';
const CANONICAL = 'https://weoneaviation.in/blogs/dgca-computer-number-rejected-reasons';

const R = PARIKSHA.rejection;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Why a DGCA Computer Number Application Gets Rejected — and How to Avoid It',
  description:
    'The reasons DGCA lists for rejecting a computer number application, the difference between partial and complete rejection, the three-chance rule, and the name, date-of-birth and upload mismatches that cause most of it.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA exams',
  keywords: 'DGCA computer number rejected, Pariksha computer number rejection reasons, partial rejection DGCA, computer number name mismatch, DGCA computer number application',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const peopleAlsoAsk = [
  {
    q: 'Why was my DGCA computer number application rejected?',
    a: `The reason is emailed to the address you registered with. DGCA groups causes into a fault in a supporting document or non-basic field (partial rejection) and a mismatch in a basic detail such as name, date of birth or marks (complete rejection). ${R.notification}`,
  },
  {
    q: 'How many times can a computer number application be partially rejected?',
    a: R.partial.escalation,
  },
  {
    q: 'What happens after a complete rejection?',
    a: `${R.complete.consequence} ${R.notification}`,
  },
  {
    q: 'Can a one-day difference in date of birth cause rejection?',
    a: `Yes. ${PARIKSHA.dob.exactness} ${PARIKSHA.dob.aadhaarNote}`,
  },
  {
    q: 'Can I appeal a rejection I think is wrong?',
    a: `Where the reasons given for a complete rejection are not satisfactory, DGCA lets the candidate write to the ${R.appeal.whoTo}, at ${R.appeal.email}, or attend in person on ${R.appeal.inPerson}`,
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
  { lead: 'For the full step-by-step application before you worry about rejection, read our', anchor: 'DGCA computer number guide', href: '/dgca-computer-number' },
  { lead: 'Once the number is issued, our', anchor: 'DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'For everything a student needs before choosing a school, see', anchor: 'flight school prerequisites and the admission steps', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'If you are not an Indian citizen, the process differs — read', anchor: 'foreign national and NRI pilot training in India', href: '/blogs/foreign-national-nri-pilot-training-india' },
  { lead: 'For the whole eligibility picture, see our', anchor: 'CPL eligibility guide', href: '/commercial-pilot-license-eligibility' },
];

const tocHeadings = [
  { id: 'two-kinds', title: 'Partial or complete rejection?' },
  { id: 'reasons', title: 'What does DGCA list as reasons?' },
  { id: 'name-dob', title: 'Name and date-of-birth mismatches' },
  { id: 'uploads', title: 'Photo, signature and document limits' },
  { id: 'education', title: 'Education and BVC problems' },
  { id: 'after', title: 'What to do after a rejection' },
  { id: 'digilocker', title: 'Does DigiLocker avoid rejection?' },
  { id: 'faqs', title: 'Frequently asked questions' },
  { id: 'sources', title: 'Sources' },
];

const kinds = [
  { aspect: 'What triggers it', partial: R.partial.meaning, complete: R.complete.meaning },
  { aspect: 'What you do', partial: 'Correct the fault through Candidate Login and resubmit under the same Temporary ID.', complete: R.complete.consequence },
  { aspect: 'Limit', partial: R.partial.escalation, complete: 'Ends the application at once; a fresh application starts the process over.' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const A = 'text-av-orange font-semibold underline';

export default function DgcaComputerNumberRejectedReasons() {
  return (
    <BlogPostLayout
      title="Why a DGCA Computer Number Application Gets Rejected"
      description="The reasons DGCA lists for rejecting a computer number application, partial versus complete rejection, the three-chance rule, and the mismatches that cause most of it."
      schema={[articleSchema, faqSchema]}
      heading="Why a DGCA Computer Number Application Gets Rejected — and How to Avoid It"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'Why does DGCA reject a computer number application?',
        answer: `DGCA rejects an application when the online form does not match the documents. A wrong basic detail — name, parents' names, date of birth, marks — means complete rejection and a fresh application. A fault in a document or other field is partial rejection, allowed ${R.partial.maxTimes} times before the application is rejected completely.`,
      }}
      summaryTitle="Rejection, in one view"
      summaryItems={[
        'Two kinds: partial (fixable, same Temporary ID) and complete (start again as a fresh applicant)',
        `A partially rejected application can be corrected a maximum of ${R.partial.maxTimes} times`,
        'Basic details — name, parents’ names, date of birth, gender, Aadhaar, year of passing, total marks, qualification — decide complete rejection',
        `Names follow the Class 10 marksheet or the passport, whichever was issued later; a difference of one day in date of birth causes rejection`,
        `Physics and Mathematics must show as passed for every category except PPL; ${EDUCATION.requirement.toLowerCase()} is the stated requirement`,
        `Nothing can be added after Final Submit, so check every file before you press it`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/dgca-computer-number-rejected/hero-mismatched-forms.webp"
        width={1200}
        height={630}
        alt="A student at a desk comparing a printed marksheet against an on-screen application form, with one line on each document highlighted to show they do not match"
        promptId="79"
      />

      <p>
        Before a student can book a single DGCA paper, the Central Examination Organisation has to
        issue a computer number. {PARIKSHA.basics.definition} The number is issued once, it is valid
        for life, and it is checked by people comparing your form against your documents line by line.
        This page is the diagnostic version of the process: what DGCA itself says causes rejection,
        and how to avoid each cause. For the step-by-step application, use our{' '}
        <Link href="/dgca-computer-number" className={A}>DGCA computer number guide</Link>.
      </p>

      <h2 id="two-kinds" className={H2}>Partial or complete rejection: what is the difference?</h2>
      <p>
        DGCA does not treat every fault alike. A fault in a supporting document or a non-basic field
        is a partial rejection and can be fixed. A mismatch in a basic detail is a complete rejection,
        and the application ends.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Partial and complete rejection of a DGCA computer number application compared</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Aspect</th>
              <th scope="col" className={TH}>Partial rejection</th>
              <th scope="col" className={TH}>Complete rejection</th>
            </tr>
          </thead>
          <tbody>
            {kinds.map((row, i) => (
              <tr key={row.aspect} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{row.aspect}</td>
                <td className={TD}>{row.partial}</td>
                <td className={TD}>{row.complete}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {R.notification} {PARIKSHA.processing.partialNote} Read the email carefully: it names the
        exact reason, and a rushed resubmission that fixes the wrong thing uses up one of your
        {' '}{R.partial.maxTimes} chances.
      </p>

      <h2 id="reasons" className={H2}>What reasons does DGCA actually list?</h2>
      <p>
        DGCA publishes a list of common reasons for rejection. Condensed to one line per category, and
        nothing added:
      </p>
      <ul className="space-y-2 mb-6">
        {PARIKSHA.rejectionReasons.map((reason) => (
          <li key={reason} className="flex gap-2 items-start text-gray-600">
            <span className="text-av-orange font-bold flex-shrink-0">–</span>
            {reason}
          </li>
        ))}
      </ul>
      <p>
        Read the list as a pattern rather than twelve separate problems. Nearly every line is one
        document disagreeing with another, or a file that cannot be read.
      </p>

      <h2 id="name-dob" className={H2}>Why do name and date-of-birth mismatches end an application?</h2>
      <p>
        Because they are basic details, and DGCA treats them as the identity of the candidate. {PARIKSHA.name.rule}{' '}
        {PARIKSHA.name.consequence} {PARIKSHA.name.alsoMatched}
      </p>
      <p>
        Date of birth is stricter still. {PARIKSHA.dob.proof} {PARIKSHA.dob.aadhaarNote}{' '}
        {PARIKSHA.dob.exactness} Before you register, put your Class 10 marksheet, pass certificate
        and (if you use one) birth certificate side by side and confirm the spelling and date are the
        same on all of them. If they are not, sort that out before applying, not after a rejection.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-computer-number-rejected/two-outcomes.webp"
        width={1200}
        height={800}
        alt="A path that splits into a short loop returning to the same starting point, and a second branch that leads back to a fresh starting point at the far left, representing partial and complete rejection"
        promptId="80"
      />

      <h2 id="uploads" className={H2}>Which photo, signature and document limits trip people up?</h2>
      <p>
        The upload rules are exact, and a file outside them is a listed rejection reason. The photograph
        is {PARIKSHA.uploads.photo.size}, {PARIKSHA.uploads.photo.format}, up to {PARIKSHA.uploads.photo.maxKb} KB,
        not more than 3 months old. The signature is {PARIKSHA.uploads.signature.size}, {PARIKSHA.uploads.signature.format},
        up to {PARIKSHA.uploads.signature.maxKb} KB. Every other document is a PDF, and the size limit
        depends on what it is:
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">PDF size limits for DGCA computer number documents</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Documents</th>
              <th scope="col" className={TH}>Format</th>
              <th scope="col" className={TH}>Maximum size</th>
            </tr>
          </thead>
          <tbody>
            {PARIKSHA.uploads.pdfLimits.map((row, i) => (
              <tr key={row.documents} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD}>{row.documents}</td>
                <td className={TD}>PDF</td>
                <td className={`${TD} font-semibold text-av-blue`}>{row.maxKb} KB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {PARIKSHA.uploads.finalSubmit} Open every file after saving it, check it is legible and
        complete, and only then move on. {PARIKSHA.education.legibility}
      </p>

      <h2 id="education" className={H2}>What goes wrong with the education record and the BVC?</h2>
      <p>
        {PARIKSHA.education.nonPpl} {PARIKSHA.education.documents} If your marksheet does not show
        Physics and Mathematics as passed, that is a listed rejection reason in itself. Students from a
        Biology or Commerce stream have a route: {EDUCATION.altRoute.charAt(0).toLowerCase()}{EDUCATION.altRoute.slice(1)}
      </p>
      <p>
        On the manual route, a new candidate also needs a Board Verification Certificate. {PARIKSHA.bvc.noColourPhotocopies}{' '}
        {PARIKSHA.bvc.onlineVerification} Where the certificate is addressed matters too: to CEO or
        &ldquo;To Whomsoever It May Concern&rdquo;, to the flying school, or to the candidate, each has
        its own rule for what you upload.
      </p>

      <h2 id="after" className={H2}>What should you do after a rejection?</h2>
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-600">
        <li>Read the emailed reason in full and identify whether it is partial or complete.</li>
        <li>For a partial rejection, fix only what the email names, re-check every other document, and resubmit under the same Temporary ID.</li>
        <li>For a complete rejection, correct the mismatched detail at source and apply again as a fresh applicant. {R.complete.consequence}</li>
        <li>If the reasons for a complete rejection do not seem right, write to the {R.appeal.whoTo} at {R.appeal.email}.</li>
        <li>For a query about the portal itself, use the Help Desk tab, or write to {PARIKSHA.help.email}.</li>
      </ol>

      <h2 id="digilocker" className={H2}>Does the DigiLocker route avoid rejection?</h2>
      <p>
        For eligible candidates, it removes most of the document risk. {PARIKSHA.digilocker.allotment}{' '}
        {PARIKSHA.digilocker.bvcEffect} It is not universal, though: {PARIKSHA.digilocker.failureMode}{' '}
        Foreign nationals, candidates whose board is not yet in DigiLocker and anyone the automatic
        check rejects stay on the manual route described above. If you are not an Indian citizen, our
        page on{' '}
        <Link href="/blogs/foreign-national-nri-pilot-training-india" className={A}>training in India as a foreign national or NRI</Link>{' '}
        covers what is added.
      </p>
      <p>
        Whichever route you take, the processing time on the manual route is {PARIKSHA.processing.days}
        {' '}working days from a complete application, so an avoidable rejection costs weeks rather than
        minutes. Once you hold the number, the next step is the exams themselves; our{' '}
        <Link href="/blogs/dgca-exam-guide" className={A}>DGCA exam guide</Link> covers how booking and
        papers work.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />

      <h2 id="sources" className={H2}>Sources</h2>
      <ul className="space-y-2 mb-8">
        {PARIKSHA.sources.slice(0, 3).map((s) => (
          <li key={s.url} className="flex gap-2 items-start text-sm text-gray-600">
            <span className="text-av-orange font-bold flex-shrink-0">–</span>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
          </li>
        ))}
        <li className="flex gap-2 items-start text-sm text-gray-600">
          <span className="text-av-orange font-bold flex-shrink-0">–</span>
          DGCA Pariksha portal, {PARIKSHA.portal}
        </li>
      </ul>

      <div className="bg-av-blue rounded-2xl p-6">
        <p className="text-white/80 text-sm leading-relaxed mb-2">{ACADEMY.scope}</p>
        <p className="text-white/60 text-xs leading-relaxed">
          DGCA, not this academy, decides every application. Nothing here guarantees acceptance; it
          shows what DGCA&rsquo;s own published rules say so you can check your documents first.
        </p>
      </div>
    </BlogPostLayout>
  );
}
