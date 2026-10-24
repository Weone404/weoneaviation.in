import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import {
  LICENCES, CPL_HOURS, DGCA_PAPERS, EDUCATION, EXAM_RULES, RTR, MEDICAL, MEDICAL_STANDARDS, PARIKSHA, FTO, ACADEMY, inr,
} from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, listJoin, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * New topic: no existing post or page covers the question a parent of a girl asks first. Distinct from
 * age-limit-to-become-a-pilot-in-india (ages), ppl-physics-maths-requirement-india (subjects),
 * dgca-class-2-class-1-medical (the medical itself) and best-flying-school-in-india (choosing a school).
 * Every figure is imported from lib/facts.js. Two things are deliberately NOT stated, because no
 * primary source on file supports a number: the share of women among Indian pilots (Ministry replies
 * to Parliament differ by reply and by year, and measure pilots in one and flight crew in another)
 * and any pregnancy-related medical rule (not in MEDICAL_STANDARDS). The post says so instead.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'can-girls-become-pilots-in-india';
const DATE_PUBLISHED = '2026-10-24';
const DATE_MODIFIED = '2026-10-24';

const CPL = LICENCES.find((l) => l.code === 'CPL');
const SPL = LICENCES.find((l) => l.code === 'SPL');
const T = EXAM_RULES.theory;
const FEES = PARIKSHA.fees;
const class1Initial = MEDICAL_STANDARDS.fees.rows[0];
const attendantRule = MEDICAL_STANDARDS.examinerRequirements.class2.other.find((x) => x.startsWith('A female attendant'));
const parlimentLokSabha = 'https://eparlib.sansad.in/bitstream/123456789/2983413/1/AU573_ToNdWX.pdf';
const parlimentRajyaSabha = 'https://rsdebate.nic.in/bitstream/123456789/747557/1/PQ_263_05022024_U166_p98_p99.pdf';
const faqUrl = PARIKSHA.sources[0].url;
const medicalCarUrl = MEDICAL_STANDARDS.sources[2].url;
const ftoListUrl = FTO.sources[0].url;

const rows = [
  { item: 'Age', rule: `${CPL.minAge} years for the ${CPL.name}; ${SPL.minAge} for the ${SPL.name}`, basis: 'Age' },
  { item: 'Education', rule: `${EDUCATION.requirement} (${EDUCATION.clause})`, basis: 'Education' },
  { item: 'Medical', rule: `${MEDICAL.short}, issued by an approved Medical Board (${MEDICAL.clause})`, basis: 'Medical fitness' },
  { item: 'Written papers', rule: `${DGCA_PAPERS.length} papers, ${T.passMark}% in each (${T.clause})`, basis: 'Examination' },
  { item: 'Radio licence', rule: `${RTR.name}, examined separately`, basis: 'Examination' },
  { item: 'Flying experience', rule: `${CPL_HOURS.total} hours in total (${CPL_HOURS.clause})`, basis: 'Experience' },
];

const peopleAlsoAsk = [
  {
    q: 'Can a girl become a commercial pilot in India?',
    a: `Yes. The conditions for a ${CPL.name} are an age of ${CPL.minAge}, ${EDUCATION.requirement}, a ${MEDICAL.short}, ${DGCA_PAPERS.length} written papers at ${T.passMark}% each, ${RTR.name} and ${CPL_HOURS.total} hours of flying. None of them is set by gender, and a girl applies on the same portals as a boy.`,
  },
  {
    q: 'Are the DGCA medical standards different for women?',
    a: `The medical is a single examination under ${MEDICAL_STANDARDS.car.citation.split(',')[0]}, Series 'C', Part I, built on ICAO Annex 1. One procedural rule applies to women: ${lc(attendantRule)} Any condition-specific rule, such as one connected with pregnancy, is not covered in the sources behind this post, so ask the examiner.`,
  },
  {
    q: 'Does a girl need Physics and Mathematics to become a pilot?',
    a: `For a CPL, yes: the education condition is ${EDUCATION.requirement} and it does not vary by gender. Pariksha states the Class 10 requirement for a PPL only, so the Physics and Mathematics condition applies once the goal is commercial. ${EDUCATION.altRoute}`,
  },
  {
    q: 'Is there a separate DGCA exam for women?',
    a: `No. DGCA conducts one set of written examinations, and the pass mark is ${T.passMark}% in each of the ${DGCA_PAPERS.length} papers (${DGCA_PAPERS.join(', ')}) for every candidate. The fee is ${inr(FEES.regularPerPaper)} per paper on a regular session and ${inr(FEES.olodePerPaper)} on an Online On-Demand session.`,
  },
  {
    q: 'What happens to my DGCA profile if my name changes after marriage?',
    a: `The computer number is issued for life, and a change of name sits among the profile details that need approval rather than being self-service. Keep the documents that show the change ready and follow the Profile Update Form process on the Pariksha portal. Details such as your address, email and mobile number can be changed without that approval.`,
  },
  {
    q: 'Where do girls from Delhi do their flying training?',
    a: `DGCA's list of approved flying training organisations (as on ${FTO.listAsOf}) shows no flying base in ${listJoin(FTO.noBaseIn, 'or')}. Flying therefore happens at a base in another state, which makes accommodation and travel part of the decision for every student, and for a family weighing a daughter's safety, a question to put in writing to the school.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Can a Girl Become a Pilot in India? Eligibility, Medical and Training',
  description:
    'A girl can become a pilot in India on the same terms as a boy. The age, education, medical, exam and flying-hour rules, what is different in practice, and what to ask a school.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot eligibility',
  keywords: 'can girls become pilots in India, girl pilot eligibility India, women pilot DGCA medical, how can a girl become a pilot, CPL for girls',
});

const sources = [
  { label: `${EXAM_RULES.car.citation} (DGCA)`, url: EXAM_RULES.car.where },
  { label: 'Flight Crew Computer Number Registration FAQ (DGCA Pariksha)', url: faqUrl },
  { label: `CAR Section 7, Series 'C', Part I: Medical Requirements and Examination (DGCA)`, url: medicalCarUrl },
  { label: `List of DGCA Approved Flying Training Organisations, as on ${FTO.listAsOf} (DGCA)`, url: ftoListUrl },
];

const related = [
  { lead: 'The minimum age for each licence is in', anchor: 'age limit to become a pilot', href: '/blogs/age-limit-to-become-a-pilot-in-india' },
  { lead: 'The subject rule for Class 12 is explained in', anchor: 'Physics and Maths for a pilot licence', href: '/blogs/ppl-physics-maths-requirement-india' },
  { lead: 'What a mismatch does to a Pariksha application is in', anchor: 'why a computer number is rejected', href: '/blogs/dgca-computer-number-rejected-reasons' },
  { lead: 'How to compare schools is covered in', anchor: 'choosing a flying school', href: '/blogs/best-flying-school-in-india' },
];

const tocHeadings = [
  { id: 'can-girls', title: 'Can a girl become a pilot in India?' },
  { id: 'how-many', title: 'How many women fly in India?' },
  { id: 'medical', title: 'Is the DGCA medical different for women?' },
  { id: 'paperwork', title: 'Does the DGCA paperwork change for girls?' },
  { id: 'school', title: 'What should a family ask a flying school?' },
  { id: 'this-week', title: 'What to do this week' },
];

export default function CanGirlsBecomePilotsInIndia() {
  return (
    <BlogPostLayout
      title="Can Girls Become Pilots in India? DGCA Rules Explained"
      description="A girl can become a pilot in India on the same terms as a boy. See the age, education, medical, exam and flying-hour rules, and what to ask a flying school."
      schema={[articleSchema, faqSchema]}
      heading="Can a Girl Become a Pilot in India? Eligibility, Medical and Training"
      category="Pilot eligibility"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'Can a girl become a pilot in India?',
        answer: `Yes. A ${CPL.name} needs age ${CPL.minAge}, ${EDUCATION.requirement}, a ${MEDICAL.short}, ${DGCA_PAPERS.length} written papers at ${T.passMark}% each and ${CPL_HOURS.total} flying hours. Those conditions rest on age, education, fitness, examinations and experience, not gender, and girls apply through the same DGCA portals as boys.`,
      }}
      summaryTitle="Girls and the pilot licence in one view"
      summaryItems={[
        `The CPL conditions are the same for every applicant: age ${CPL.minAge}, ${lc(EDUCATION.requirement)}, ${DGCA_PAPERS.length} papers at ${T.passMark}%, ${CPL_HOURS.total} hours.`,
        'The medical is one examination under one DGCA requirement, not a separate one for women.',
        attendantRule,
        `Gender is one of the basic details on a computer number application and must match your documents.`,
        'Sources: DGCA CAR Section 7 Series B Part I and Series C Part I, the Pariksha FAQ and the DGCA flying training organisation list, read in September 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="September 2026"
    >
      <p>
        The first question in a counselling room is often a parent&rsquo;s, asked quietly: will the
        rules treat my daughter differently, and is this a career she can finish? Online answers
        mix inspiration with rumour, so a family ends up with neither a clear rule nor a clear
        plan. If you are asking whether a girl can become a pilot in India, the rules are short and
        checkable, and this post sets them out, then turns to the practical questions the rules do
        not answer.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/can-girls-become-pilots-in-india/hero-one-path-two-students.webp"
        width={1200}
        height={630}
        alt="Two students walking side by side along one runway towards a small training aircraft, one of them a girl in a school-style uniform"
        promptId="107"
      />

      <h2 id="can-girls" className={H2}>Can a girl become a pilot in India?</h2>
      <p>
        Yes. The conditions for a Commercial Pilot Licence are written around age, education,
        medical fitness, examinations and flying experience, and a girl meets them in the same way
        as a boy. Of the Aircraft Rules, 1937 conditions and DGCA&rsquo;s{' '}
        <Ext href={EXAM_RULES.car.where}>examination requirements</Ext> cited here, none depends on
        gender.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">CPL requirements and what each one is based on</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Requirement</th>
              <th scope="col" className={TH}>What the rule says</th>
              <th scope="col" className={TH}>What it is based on</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.item}</td>
                <td className={TD}>{r.rule}</td>
                <td className={TD}>{r.basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        If your marksheet lacks Physics or Mathematics, the route is the same for girls and boys:{' '}
        {lc(EDUCATION.altRoute)} Our post on{' '}
        <Link href="/blogs/ppl-physics-maths-requirement-india" className={LINK}>Physics and Maths for a pilot licence</Link>{' '}
        explains where that condition applies. Ages for every licence are in{' '}
        <Link href="/blogs/age-limit-to-become-a-pilot-in-india" className={LINK}>the age limit guide</Link>,
        and the full CPL checklist is on our{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>.
      </p>

      <h2 id="how-many" className={H2}>How many women fly in India?</h2>
      <p>
        The Ministry of Civil Aviation has told Parliament that women make up a share of Indian
        pilots well above the global figure, but the number differs between replies and years, and
        one reply counts airline pilots while another counts all flight crew. We therefore do not
        print a single percentage. Read the replies yourself:{' '}
        <Ext href={parlimentLokSabha}>Lok Sabha, 28 November 2024</Ext> and{' '}
        <Ext href={parlimentRajyaSabha}>Rajya Sabha, 5 February 2024</Ext>.
      </p>
      <p>
        What the figure cannot tell you is how any one student fares. DGCA publishes no pass rate and
        no first-job data for either gender, and neither do we.
      </p>

      <h2 id="medical" className={H2}>Is the DGCA medical different for women?</h2>
      <p>
        No. Girls take the same examination as boys under one requirement, the{' '}
        <Ext href={medicalCarUrl}>CAR on medical requirements for flight crew</Ext>, which adopts the
        ICAO Annex 1 standards. A CPL needs the Class 1 medical, and the DGCA fee for an initial issue
        is {class1Initial.label}. {MEDICAL.advice}
      </p>
      <ul className={UL}>
        <li>{attendantRule} The rule appears in the CAR that governs Class 2 examiners.</li>
        <li>
          The examination covers {listJoin(MEDICAL_STANDARDS.examination.groups.map((g) => g.toLowerCase()))}.
          {' '}{MEDICAL_STANDARDS.examination.note}
        </li>
        <li>
          Rules that depend on a particular condition, including anything connected with pregnancy, are
          not covered in the sources behind this post. Put that question to the examiner before you book.
        </li>
      </ul>
      <p>
        Fees, centres, validity and what happens if you are declared unfit are on{' '}
        <Link href="/dgca-class-2-class-1-medical" className={LINK}>our DGCA medical page</Link>.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Questions from parents are welcome"
        title="Talk it through with a counsellor"
        text="Counselling is free and open to parents. Bring your daughter's marksheets and your questions, and we will map the DGCA route against them, without promising any outcome."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <h2 id="paperwork" className={H2}>Does the DGCA paperwork change for girls?</h2>
      <p>
        The steps do not change: a Pariksha computer number first, then booking the written papers,
        then the licence application on eGCA. What deserves attention is matching. A computer number
        application is rejected completely if a basic detail, including gender, does not match the
        documents, and {PARIKSHA.name.rule.charAt(0).toLowerCase() + PARIKSHA.name.rule.slice(1)}
      </p>
      <p>
        That rule matters most for names that change later. {PARIKSHA.name.consequence}{' '}
        The computer number stays with you for life ({lc(PARIKSHA.basics.validity.split(' —')[0])}), and
        a change of name is one of the profile updates that needs approval, unlike an email or mobile
        change, which you can make yourself. Our{' '}
        <Link href="/blogs/dgca-computer-number-rejected-reasons" className={LINK}>post on rejected applications</Link>{' '}
        lists the full set, and the{' '}
        <Ext href={faqUrl}>Pariksha registration FAQ</Ext> is the source.
      </p>

      <BlogImagePlaceholder
        src="/blog/can-girls-become-pilots-in-india/documents-matching-names.webp"
        width={1200}
        height={675}
        alt="A desk with a Class 10 marksheet, a passport and an identity card laid side by side, with a hand tracing a line across the three"
        promptId="108"
      />

      <h2 id="school" className={H2}>What should a family ask a flying school?</h2>
      <p>
        A family should ask where the student will fly, where she will live and how daily travel
        works, because for Delhi students the flying base is in another state. DGCA&rsquo;s{' '}
        <Ext href={ftoListUrl}>list of approved flying training organisations</Ext> (as on {FTO.listAsOf})
        shows no base in {listJoin(FTO.noBaseIn, 'or')}.
      </p>
      <ul className={UL}>
        <li>Which base would the student fly from, and is it on DGCA&rsquo;s list for that school?</li>
        <li>What accommodation does the school arrange, and what is left to the family?</li>
        <li>Who is the named contact for a student who has a problem at the base?</li>
        <li>What does the quote include and exclude? {FTO.groundSchoolNote.split('.')[0]}.</li>
      </ul>
      <p>
        These are questions, not a checklist of promises: no published source rates schools on
        student safety, so get the answers in writing. Our guide to{' '}
        <Link href="/blogs/best-flying-school-in-india" className={LINK}>choosing a flying school</Link>{' '}
        covers the comparison, and our{' '}
        <Link href="/courses/cpl" className={LINK}>CPL course</Link> and{' '}
        <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes</Link> cover the five
        written subjects only.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Check the marksheet for Physics and Mathematics, then book the medical before any deposit,
        and ask the examiner your condition-specific questions then. Make sure the name on the Class 10
        marksheet is the one you will use on every DGCA document. The next step after that is a
        school shortlist built on written answers rather than on a brochure.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
