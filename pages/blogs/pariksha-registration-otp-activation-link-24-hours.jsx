import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { PARIKSHA } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from dgca-computer-number-rejected-reasons (what fails AFTER the form is filed), the DigiLocker post
 * (the instant route), change-details (edits after allotment) and /dgca-computer-number (the full overview, where
 * the 24-hour rule is one line in a checklist). This post owns the first stretch only: the OTP, the activation
 * link, the password, the Temporary ID and the P- login. Pre-CPL audience: it is the first thing a student does.
 * Every figure comes from PARIKSHA in lib/facts.js (steps, basics, foreignCandidates, help). Nothing is said about
 * spam folders, OTP expiry or resend limits: no source on file states them, so the post says to read the portal.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'pariksha-registration-otp-activation-link-24-hours';
const DATE_PUBLISHED = '2026-10-14';
const DATE_MODIFIED = '2026-10-14';

const [openTab, basicDetails, activate, fillForm, , , track] = PARIKSHA.steps;
const faq = PARIKSHA.sources[0];
const manual = PARIKSHA.sources[1];
const pib = PARIKSHA.digilocker.sources[0];

const peopleAlsoAsk = [
  {
    q: 'How long is the Pariksha activation link valid?',
    a: `Twenty-four hours. ${activate.detail} After that window the candidate has to register again, so open the email on the day you submit the basic details.`,
  },
  {
    q: 'What password does the Pariksha portal accept?',
    a: 'A password of at least 8 characters containing an uppercase letter, a lowercase letter, a numeral and a special character, as set out in the Flight Crew User Manual.',
  },
  {
    q: 'Can I use a foreign mobile number to register on Pariksha?',
    a: `No. The registration form takes an Indian mobile number with the +91 prefix only. ${PARIKSHA.foreignCandidates.mobile}`,
  },
  {
    q: 'Can two students register with the same email address?',
    a: `No. ${PARIKSHA.basics.oneEmailOneMobile} Siblings and classmates each need their own email address and their own mobile number.`,
  },
  {
    q: 'What is a Temporary ID on the Pariksha portal?',
    a: `It is the reference issued when the application is finally submitted, and it is used to follow the application through Candidate Login until the computer number is allotted. ${PARIKSHA.steps[6].detail}`,
  },
  {
    q: 'What do I log in with after the computer number arrives?',
    a: PARIKSHA.basics.loginAfterAllotment,
  },
  {
    q: 'Where do I ask if the portal itself is not working?',
    a: `Write to ${PARIKSHA.help.email}, or use the Help Desk tab on the portal. ${PARIKSHA.help.portalDesk}`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Pariksha Registration: OTP, the 24-Hour Activation Link and Your Temporary ID',
  description:
    'What happens in the first 24 hours of registering on DGCA Pariksha: the OTP to your mobile, the activation link, the password rule, the Temporary ID and the P- login.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA exams',
  keywords: 'Pariksha registration, DGCA Pariksha activation link, Pariksha OTP, DGCA Temporary ID, DGCA new candidate registration',
});

const sources = [
  { label: faq.label, url: faq.url },
  { label: manual.label, url: manual.url },
  { label: pib.label, url: pib.url },
  { label: 'DGCA Pariksha portal', url: PARIKSHA.portal },
];

const related = [
  { lead: 'What stops an application after it is filed is in', anchor: 'the rejection reasons post', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'Skipping the manual wait is explained in', anchor: 'the DigiLocker route post', href: '/blogs/dgca-computer-number-digilocker-instant-route' },
  { lead: 'Fixing a detail after allotment is in', anchor: 'the profile changes post', href: '/blogs/change-details-dgca-computer-number-profile' },
  { lead: 'The papers you register for are in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
];

const tocHeadings = [
  { id: 'sequence', title: 'What happens in the first 24 hours of Pariksha registration?' },
  { id: 'basic-details', title: 'Which details must match before you press submit?' },
  { id: 'activation', title: 'What if the activation link expires?' },
  { id: 'password', title: 'What password does the portal accept?' },
  { id: 'temporary-id', title: 'What are the Temporary ID and the P- login?' },
  { id: 'before-you-start', title: 'What should be open on your desk before you start?' },
  { id: 'this-week', title: 'What to do this week' },
];

const timeline = [
  { step: 'Open the NEW Candidate Registration tab', what: openTab.detail },
  { step: 'Enter the basic details and the OTP', what: basicDetails.detail },
  { step: 'Activate the account from the emailed link', what: activate.detail },
  { step: 'Track the application with the Temporary ID', what: track.detail },
];

export default function ParikshaRegistrationOtpActivation() {
  return (
    <BlogPostLayout
      title="Pariksha Registration: OTP, Activation Link, Temporary ID"
      description="Registering on DGCA Pariksha: the mobile OTP, the activation link that lasts 24 hours, the password rule and the Temporary ID, in the order you meet them."
      schema={[articleSchema, faqSchema]}
      heading="Pariksha Registration: OTP, the 24-Hour Activation Link and Your Temporary ID"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="5 min"
      quickAnswer={{
        question: 'How long do you have to activate a new Pariksha account?',
        answer: `Twenty-four hours. After you submit your basic details and enter the OTP sent to your Indian mobile number, DGCA emails an activation link that is valid for 24 hours only. If it lapses, you register again. Once you set the password and finish the application, a Temporary ID lets you track it.`,
      }}
      summaryTitle="Pariksha registration in one view"
      summaryItems={[
        'The OTP goes to an Indian mobile number with the +91 prefix, and nothing else is accepted.',
        'The activation link emailed to you is valid for 24 hours; after that you register again.',
        'The password needs at least 8 characters with an uppercase letter, a lowercase letter, a numeral and a special character.',
        'One email address and one mobile number can belong to only one candidate.',
        'Sources: the DGCA Pariksha FAQ, the Flight Crew User Manual (Issue III, October 2024) and PIB, read on 11 September 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="11 September 2026"
    >
      <p>
        A student sits down on a Sunday evening, fills in the first Pariksha screen, enters the OTP and
        closes the laptop to eat. By Tuesday the activation email is still unopened, and the portal no
        longer recognises the link. Pariksha registration is short, but its first stretch runs on a
        clock, and a missed window means starting again. This post follows that stretch step by step,
        from the first tab to the Temporary ID, so a lapsed link never costs you a week.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/pariksha-registration-otp-activation/hero-one-clock-four-steps.webp"
        width={1200}
        height={630}
        alt="Four stepping stones crossing a stream towards a small building, with a round clock face standing over the second stone"
        promptId="107"
      />

      <h2 id="sequence" className={H2}>What happens in the first 24 hours of Pariksha registration?</h2>
      <p>
        Four things happen in order: you open the correct registration tab, submit your basic details
        and confirm the OTP, activate the account from the emailed link within 24 hours, and later
        follow the application with a Temporary ID. The{' '}
        <Ext href={manual.url}>Flight Crew User Manual</Ext> sets out each stage, and the table shows the
        manual&rsquo;s wording for the ones that run on a clock.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">The early stages of Pariksha registration and what each requires</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>What the manual says</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((r, i) => (
              <tr key={r.step} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.step}</td>
                <td className={TD}>{r.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The portal itself is at <Ext href={PARIKSHA.portal}>pariksha.dgca.gov.in</Ext>. Our wider{' '}
        <Link href="/dgca-computer-number" className={LINK}>computer number guide</Link> covers the
        whole application; this post stays with the opening stretch.
      </p>

      <h2 id="basic-details" className={H2}>Which details must match before you press submit?</h2>
      <p>
        Your name, date of birth, father&rsquo;s name and mother&rsquo;s name must match your Class 10
        record exactly, because these first fields are the ones checked for a complete rejection.
        {' '}{PARIKSHA.name.rule}
      </p>
      <ul className={UL}>
        <li>{PARIKSHA.name.consequence}</li>
        <li>{PARIKSHA.dob.exactness}</li>
        <li>{PARIKSHA.basics.oneEmailOneMobile}</li>
        <li>{PARIKSHA.foreignCandidates.mobile}</li>
      </ul>
      <p>
        The last two points matter more than they look. A family phone already used for a sibling&rsquo;s
        registration blocks yours. If a rejection ever follows, our{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>
          computer number rejection guide
        </Link>{' '}
        lists every reason DGCA publishes.
      </p>

      <h2 id="activation" className={H2}>What if the activation link expires?</h2>
      <p>
        If the 24 hours pass, the link stops working and you register again from the beginning.
        The manual does not describe a way to revive an old link, so the practical rule is to open the
        email while you are still at the screen and activate it before you do anything else.
      </p>
      <ol className={OL}>
        <li>Submit the basic details and enter the OTP sent to your mobile.</li>
        <li>Open the registered email account in the same sitting.</li>
        <li>Click the activation link and set the password.</li>
        <li>Log in once to confirm that it works.</li>
      </ol>
      <p>
        The portal does not publish how long an OTP lasts or how many times it can be sent again in the
        sources we cite, so if the code does not arrive, read the on-screen message rather than guessing.
        For anything the screen does not answer, write to the help desk at{' '}
        <Ext href={`mailto:${PARIKSHA.help.email}`}>{PARIKSHA.help.email}</Ext>.
      </p>

      <h2 id="password" className={H2}>What password does the portal accept?</h2>
      <p>
        The portal accepts a password of at least 8 characters that contains an uppercase letter, a
        lowercase letter, a numeral and a special character. Anything missing one of the four is
        refused. Choose something you will still remember in months, because you return to this login
        to book every DGCA paper.
      </p>
      <p>
        Once the account is active you fill the application through Candidate Login. Candidates who
        qualify can skip the manual wait: the{' '}
        <Link href="/blogs/dgca-computer-number-digilocker-instant-route" className={LINK}>
          DigiLocker route
        </Link>{' '}
        allots the number immediately on successful submission, as announced in{' '}
        <Ext href={pib.url}>PIB&rsquo;s release of 17 October 2025</Ext>.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Before you register"
        title="Keep every document ready in one place"
        text="Our student checklists list what to gather before the form opens. We teach the DGCA subjects; the registration itself is yours to complete on the official portal."
      />

      <h2 id="temporary-id" className={H2}>What are the Temporary ID and the P- login?</h2>
      <p>
        The Temporary ID is the reference you receive when the application is finally submitted, and the
        P- login is what replaces it once DGCA allots the computer number. {PARIKSHA.basics.loginAfterAllotment}
        {' '}{PARIKSHA.basics.validity}
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Temporary ID versus computer number login</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Identifier</th>
              <th scope="col" className={TH}>When you get it</th>
              <th scope="col" className={TH}>What it is for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>Temporary ID</td>
              <td className={TD}>On Final Submit of the application</td>
              <td className={TD}>Tracking the application through Candidate Login</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Computer number</td>
              <td className={TD}>After scrutiny, or immediately on the DigiLocker route</td>
              <td className={TD}>Booking papers; the login ID becomes P- followed by the number</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {PARIKSHA.processing.statement} {PARIKSHA.basics.oneOnly} If a detail needs correcting later,
        the{' '}
        <Link href="/blogs/change-details-dgca-computer-number-profile" className={LINK}>
          profile changes post
        </Link>{' '}
        explains which edits you can make yourself.
      </p>

      <BlogImagePlaceholder
        src="/blog/pariksha-registration-otp-activation/temporary-id-to-computer-number.webp"
        width={1200}
        height={675}
        alt="A small paper tag on a string beside a larger identity card, both resting on a desk next to an open laptop"
        promptId="108"
      />

      <h2 id="before-you-start" className={H2}>What should be open on your desk before you start?</h2>
      <p>
        Have your Class 10 certificate, an Indian mobile with signal, and an email inbox you can open
        right now. The registration form is quick; the delays come from a phone in another room or a
        mailbox whose password nobody remembers.
      </p>
      <ul className={UL}>
        <li>Your Class 10 marksheet or certificate, for the exact spelling of every name.</li>
        <li>The Indian mobile number only you will use for this registration.</li>
        <li>An email address no other candidate has used.</li>
        <li>Enough time to finish the activation in the same sitting.</li>
      </ul>
      <p className={SCOPE}>
        We are a ground school, not DGCA. We cannot register on your behalf, restore a lapsed link or
        speed up an allotment; for those, use the official help desk.
      </p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Check that your email and mobile are not already in use by anyone in your family, then set aside
        one sitting to register and activate. When the computer number arrives, read{' '}
        <Link href="/blogs/dgca-exam-guide" className={LINK}>the DGCA exam guide</Link> and plan which
        paper to book first.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
