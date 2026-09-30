import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { ACADEMY, PARIKSHA } from '../../lib/facts';

/*
 * /blogs/change-details-dgca-computer-number-profile — new 2026-09-30.
 *
 * WHY THIS TOPIC. Pre-CPL audience: a student who already holds a computer
 * number and then finds a wrong name, a moved address or an old photograph is
 * asking a different question from "how do I apply" (/dgca-computer-number) or
 * "why was I rejected" (/blogs/dgca-computer-number-rejected-reasons). This is
 * the "already allotted, now I need to change something" post.
 *
 * SOURCING. Everything comes from PARIKSHA in lib/facts.js (profileUpdates,
 * name, dob, basics, uploads, help, rejection). No deadline for returning the
 * Profile Update Form is stated: it is not in PARIKSHA, so the post says the
 * emailed form carries it.
 */

const DATE_PUBLISHED = '2026-09-30';
const DATE_MODIFIED = '2026-09-30';
const CANONICAL = 'https://weoneaviation.in/blogs/change-details-dgca-computer-number-profile';

const P_U = PARIKSHA.profileUpdates;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Change Your Details on a DGCA Computer Number Profile',
  description:
    'Which details on a DGCA Pariksha profile you can change yourself, which need Central Examination Organisation approval, and how the Profile Update Form process works.',
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA exams',
  keywords: 'change name DGCA computer number, update DGCA Pariksha profile, DGCA profile update form, change date of birth DGCA, update mobile number Pariksha',
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
    q: 'Can I change my mobile number or email on my DGCA computer number?',
    a: `Yes, without approval. ${P_U.selfService.join(', ')} are the three details a candidate can update from the profile after logging in. Everything else needs verification by the Central Examination Organisation.`,
  },
  {
    q: 'Can I correct a spelling mistake in my name?',
    a: `Only with approval. A name change is on DGCA's list of updates that need verification. ${PARIKSHA.name.rule} If the spelling is wrong against your Class 10 record, raise the request with supporting documents rather than registering again.`,
  },
  {
    q: 'Can I change my date of birth after the computer number is issued?',
    a: `It needs approval, and the proof is narrow. ${PARIKSHA.dob.proof} ${PARIKSHA.dob.aadhaarNote}`,
  },
  {
    q: 'Can I replace my photograph or signature?',
    a: `Not by yourself. ${PARIKSHA.uploads.finalSubmit} A new photograph or signature goes through the approval route with a Profile Update Form.`,
  },
  {
    q: 'Do I need a new computer number if my details change?',
    a: `No. ${PARIKSHA.basics.validity} ${PARIKSHA.basics.oneOnly}`,
  },
  {
    q: 'Where do I ask if the portal does not let me update something?',
    a: `${P_U.note.split('.')[0]}. For queries, use the Help Desk tab on the Pariksha portal, or write to ${PARIKSHA.help.email}.`,
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
  { lead: 'To understand why a mismatch can end an application, read', anchor: 'why a computer number application gets rejected', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'Once your profile is right, our', anchor: 'DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'For what to sort out before joining a school, see', anchor: 'flight school prerequisites and admission steps', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'The application itself is covered step by step in our', anchor: 'DGCA computer number guide', href: '/dgca-computer-number' },
  { lead: 'For the papers you will book with this number, see our', anchor: 'DGCA ground classes', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'two-groups', title: 'What can you change yourself?' },
  { id: 'approval', title: 'What needs approval?' },
  { id: 'process', title: 'How does the approval request work?' },
  { id: 'name-dob', title: 'Name and date-of-birth changes' },
  { id: 'photo-signature', title: 'Photograph and signature' },
  { id: 'before-exam', title: 'Fix it before you book an exam' },
  { id: 'faqs', title: 'Frequently asked questions' },
  { id: 'sources', title: 'Sources' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const A = 'text-av-orange font-semibold underline';

export default function ChangeDetailsDgcaComputerNumberProfile() {
  return (
    <BlogPostLayout
      title="How to Change Your Details on a DGCA Computer Number Profile"
      description="Which details on your DGCA Pariksha profile you can change yourself, which need Central Examination Organisation approval, and how the Profile Update Form works."
      schema={[articleSchema, faqSchema]}
      heading="How to Change Your Details on a DGCA Computer Number Profile"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="5 min"
      quickAnswer={{
        question: 'Can you change details after a DGCA computer number is issued?',
        answer: `Yes, but not all of them freely. You can update your ${P_U.selfService.join(', ').toLowerCase()} yourself after logging in. Name, date of birth, parents' names, photograph, signature, address, category and education need approval from the Central Examination Organisation, through a request and a Profile Update Form. The number itself stays the same.`,
      }}
      summaryTitle="Changing a profile, in one view"
      summaryItems={[
        `Self-service: ${P_U.selfService.join(', ')}`,
        `Needs approval: ${P_U.needsApproval.length} categories, including name, date of birth, photograph and signature`,
        'An approval request generates a request ID, and the Profile Update Form is emailed as a PDF',
        'Supporting documents must be uploaded with the request',
        `${PARIKSHA.basics.validity}`,
        'Correct the record before you book an exam, not after',
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/change-details-dgca-computer-number-profile/hero-two-lanes.webp"
        width={1200}
        height={630}
        alt="A student at a laptop with a profile screen in front of them, one short lane of details marked as changeable at once and a longer lane passing through a checkpoint"
        promptId="81"
      />

      <p>
        A computer number is issued once and stays with you for life. Your address will not. Neither
        will your phone number, and sometimes a name or a date is wrong from the start. Students often
        assume the only fix is to apply again, and that assumption is wrong: {PARIKSHA.basics.oneOnly.toLowerCase()}{' '}
        This page explains what DGCA lets you change, what it insists on checking first, and what the
        request looks like. If you are still applying, use our{' '}
        <Link href="/dgca-computer-number" className={A}>DGCA computer number guide</Link>{' '}
        instead.
      </p>

      <h2 id="two-groups" className={H2}>What can you change yourself?</h2>
      <p>
        Three details. After you log in to the Pariksha portal, you can update your{' '}
        {P_U.selfService.join(', ').toLowerCase()} without anybody&rsquo;s approval. These are the
        details DGCA uses to reach you, not to identify you, which is why it lets you handle them.
      </p>
      <ul className="space-y-2 mb-6">
        {P_U.selfService.map((item) => (
          <li key={item} className="flex gap-2 items-start text-gray-600">
            <span className="text-av-orange font-bold flex-shrink-0">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <p>
        Keep the email address current above all. {PARIKSHA.rejection.notification} The same portal
        emails your Profile Update Form and every approval decision. A dead inbox costs more than a
        wrong postcode. Note also that {PARIKSHA.basics.oneEmailOneMobile.charAt(0).toLowerCase()}
        {PARIKSHA.basics.oneEmailOneMobile.slice(1)}
      </p>

      <h2 id="approval" className={H2}>What needs approval from DGCA?</h2>
      <p>
        Everything else. {P_U.needsApproval.length} categories go through verification by the Central
        Examination Organisation before the change appears on your profile.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA Pariksha profile details you can update yourself and those needing approval</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Detail</th>
              <th scope="col" className={TH}>Who can change it</th>
            </tr>
          </thead>
          <tbody>
            {P_U.selfService.map((item, i) => (
              <tr key={item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{item}</td>
                <td className={TD}>You, directly from the profile</td>
              </tr>
            ))}
            {P_U.needsApproval.map((item, i) => (
              <tr key={item} className={(i + P_U.selfService.length) % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{item}</td>
                <td className={TD}>Only after Central Examination Organisation approval</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The split follows one logic. Anything that identifies you, or proves you meet the education
        rule, is checked against a document. Anything that only helps DGCA contact you is not.
      </p>

      <h2 id="process" className={H2}>How does the approval request work?</h2>
      <p>{P_U.note}</p>
      <ol className="list-decimal pl-6 space-y-2 mb-6 text-gray-600">
        <li>Log in with your computer number, which is your login ID with its P- prefix.</li>
        <li>Raise the update request from your profile for the detail you need changed.</li>
        <li>Note the request ID the portal generates.</li>
        <li>Check the email for the Profile Update Form, sent as a PDF, and complete it.</li>
        <li>Upload the supporting documents that prove the correct value.</li>
        <li>Wait for the Central Examination Organisation&rsquo;s decision, which also reaches you by email.</li>
      </ol>
      <p>
        The form itself states how and by when it must be returned. Read that instruction rather than
        relying on a figure from a forum, because this page can only repeat what DGCA publishes.
        For a problem with the process, use the Help Desk tab on the portal, or write to {PARIKSHA.help.email}.
      </p>

      <BlogImagePlaceholder
        src="/blog/change-details-dgca-computer-number-profile/request-flow.webp"
        width={1200}
        height={800}
        alt="A simple left-to-right flow of four steps: a request raised on a laptop, a form arriving by email, documents attached, and a decision returning to the student"
        promptId="82"
      />

      <h2 id="name-dob" className={H2}>Which name and date-of-birth changes will DGCA accept?</h2>
      <p>
        Only those the documents support. {PARIKSHA.name.rule} {PARIKSHA.name.alsoMatched} For date of
        birth, {PARIKSHA.dob.proof.charAt(0).toLowerCase()}{PARIKSHA.dob.proof.slice(1)}{' '}
        {PARIKSHA.dob.aadhaarNote} {PARIKSHA.dob.exactness}
      </p>
      <p>
        That is why a profile update is not a place to fix a mistake by guesswork. If the wrong value
        is on your profile, find out where the error started. If the profile is wrong and your Class 10
        record is right, the request corrects the profile. If the Class 10 record itself is wrong, that
        is a matter for your board, and it has to be settled there first. Our page on{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={A}>why applications get rejected</Link>{' '}
        shows how much DGCA weights these two fields.
      </p>

      <h2 id="photo-signature" className={H2}>Can you replace your photograph or signature?</h2>
      <p>
        Not on your own. {PARIKSHA.uploads.finalSubmit} Both appear on the approval list above, so a
        replacement goes through the same request. The original specifications still apply to the new
        file: the photograph is {PARIKSHA.uploads.photo.format}, up to {PARIKSHA.uploads.photo.maxKb} KB,
        and {PARIKSHA.uploads.photo.age.toLowerCase()}; the signature is {PARIKSHA.uploads.signature.format},
        up to {PARIKSHA.uploads.signature.maxKb} KB.
      </p>

      <h2 id="before-exam" className={H2}>Why fix it before you book an exam?</h2>
      <p>
        Because the profile is what everything downstream reads. The number identifies you for every
        paper you will sit, and it will be checked again when you apply for a licence. Correcting a
        name or a category after several papers are passed only adds a question to a process that
        was already hard to hurry. Do it as soon as you spot the error, while nothing else depends on it.
      </p>
      <p>
        Once the profile is right, the next step is the papers themselves. Our{' '}
        <Link href="/blogs/dgca-exam-guide" className={A}>DGCA exam guide</Link> explains how booking
        works, and if you are choosing where to prepare, the{' '}
        <Link href="/blogs/flight-school-prerequisites-admission-guide" className={A}>prerequisites and admission guide</Link>{' '}
        lists what to have ready. Our{' '}
        <Link href="/dgca-ground-classes" className={A}>DGCA ground classes</Link> prepare students for the
        written papers, and the academy does not decide profile requests: DGCA does.
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
          DGCA, not this academy, decides every profile update. Rules on the portal can change; check
          the current instructions on the Pariksha portal before you file a request.
        </p>
      </div>
    </BlogPostLayout>
  );
}
