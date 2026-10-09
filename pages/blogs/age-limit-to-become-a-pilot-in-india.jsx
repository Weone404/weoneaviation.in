import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import {
  LICENCES, CPL_HOURS, EDUCATION, EXAM_RULES, PARIKSHA, MEDICAL_STANDARDS as MED, INDIGO_CADET, ACADEMY,
} from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, lc, listJoin, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from ppl-physics-maths-requirement-india (which touches the minimum ages only to separate the
 * computer-number age from the licence age) and from the one-line "is there an upper age limit?" answers
 * on /commercial-pilot-license-eligibility and /student-pilot-license-spl. This post owns the standalone
 * question: minimum AND maximum age, licence by licence, and what actually changes with age (the medical).
 * Every figure comes from lib/facts.js: LICENCES (Schedule II), PARIKSHA.basics, MEDICAL_STANDARDS.classes
 * and rules, EXAM_RULES.paperValidity, CPL_HOURS, INDIGO_CADET. Airline age limits other than the one
 * INDIGO_CADET publishes, and pay or career-length figures, are NOT sourced, so the post says they vary.
 * FAQPage schema is built from peopleAlsoAsk because data/pageFaqs.js is off limits to the routine.
 */
const SLUG = 'age-limit-to-become-a-pilot-in-india';
const DATE_PUBLISHED = '2026-10-09';
const DATE_MODIFIED = '2026-10-09';

const [SPL, PPL, CPL, ATPL] = LICENCES;
const [class1, class2] = MED.classes;
const mid40sNote = MED.class2Investigations.rows.find((r) => r.when.startsWith('At 40'));

const peopleAlsoAsk = [
  {
    q: 'Is there a maximum age limit to become a pilot in India?',
    a: `DGCA's Pariksha rules prescribe none for registering for the written examinations: ${PARIKSHA.basics.maxAgeNote} The Aircraft Rules set minimum ages for each licence, not maximum ones. What does change with age is how long a medical assessment stays valid, and an airline cadet programme may set its own limit.`,
  },
  {
    q: 'What is the minimum age to start CPL training in India?',
    a: `A DGCA computer number can be applied for from ${PARIKSHA.basics.minAge}, and a Student Pilot Licence is issued from ${SPL.minAge}. The Commercial Pilot Licence itself is issued from ${CPL.minAge}, so a student who starts at ${SPL.minAge} still waits until ${CPL.minAge} for the licence.`,
  },
  {
    q: 'Can I become a pilot at 30 or 35?',
    a: `The DGCA examination rules do not stop you: ${lc(PARIKSHA.basics.maxAgeNote)} You still need ${EDUCATION.requirement.replace('Class ', '')}, a Class 1 medical and the ${CPL_HOURS.total} flying hours. Airline cadet programmes set their own age bands, and the career runway after a late start is a question to discuss honestly before paying anything.`,
  },
  {
    q: 'What is the age limit for the IndiGo cadet programme?',
    a: `IndiGo's own cadet page states applicants must be ${INDIGO_CADET.ageRange}. That is one airline's programme, read on ${INDIGO_CADET.verifiedOn}. Other airlines and other intakes set their own limits, so check the current notice for the one you want.`,
  },
  {
    q: 'Does the medical get stricter as I get older?',
    a: `The Class 1 medical is valid for a shorter period at certain ages. ${class1.validity} DGCA's published CAR adopts ICAO standards by reference, so it does not print a single "age cutoff" number for fitness itself.`,
  },
  {
    q: 'Is the minimum age to be a pilot 18?',
    a: `Only for the Commercial Pilot Licence. The Student Pilot Licence is issued from ${SPL.minAge}, the Private Pilot Licence from ${PPL.minAge}, the CPL from ${CPL.minAge} and the Airline Transport Pilot Licence from ${ATPL.minAge}.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Age Limit to Become a Pilot in India: Minimum and Maximum, Licence by Licence',
  description:
    'The minimum age for each pilot licence in India, what DGCA says about a maximum age, and what changes as you get older: the medical and the airline cadet limits.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot eligibility',
  keywords: 'age limit to become a pilot in India, minimum age for CPL, maximum age for pilot in India, pilot age limit DGCA, can I become a pilot at 30',
});

const sources = [
  PARIKSHA.sources[0],
  MED.sources[1],
  MED.sources[2],
  { label: EXAM_RULES.car.citation, url: EXAM_RULES.car.where },
  INDIGO_CADET.source,
];

const related = [
  { lead: 'The whole CPL entry bar is set out on', anchor: 'the CPL eligibility page', href: '/commercial-pilot-license-eligibility' },
  { lead: 'How the two medical classes differ is explained on', anchor: 'the DGCA Class 1 and Class 2 medical page', href: '/dgca-class-2-class-1-medical' },
  { lead: 'How long cleared papers stay valid is in', anchor: 'the five-year rule post', href: '/blogs/dgca-exam-pass-validity-cpl-five-years' },
  { lead: 'Why the ATPL has a different age floor is covered in', anchor: 'the CPL vs ATPL post', href: '/blogs/cpl-vs-atpl-difference-india' },
  { lead: 'Registering for the written papers is walked through in', anchor: 'our DGCA computer number guide', href: '/dgca-computer-number' },
];

const tocHeadings = [
  { id: 'maximum', title: 'Is there a maximum age to become a pilot?' },
  { id: 'minimum', title: 'What is the minimum age for each licence?' },
  { id: 'medical', title: 'What does change as you get older?' },
  { id: 'airline', title: 'Do airlines set their own age limits?' },
  { id: 'late-start', title: 'What should an older starter plan for?' },
  { id: 'this-week', title: 'What to do this week' },
];

const ageRows = [
  { gate: 'DGCA computer number (Pariksha)', age: `${PARIKSHA.basics.minAge}`, note: PARIKSHA.basics.maxAgeNote },
  ...LICENCES.map((l) => ({ gate: `${l.name} (${l.code})`, age: `${l.minAge}`, note: l.permits })),
];

const medicalRows = [
  { cls: 'Class 1', needed: 'Commercial and Airline Transport Pilot Licences', validity: class1.validity },
  { cls: 'Class 2', needed: 'Student and Private Pilot Licences', validity: class2.validity },
];

export default function AgeLimitToBecomePilotInIndia() {
  return (
    <BlogPostLayout
      title="Age Limit to Become a Pilot in India: Min and Max"
      description="Minimum age for every pilot licence in India, what DGCA says about a maximum age, and what changes as you get older: the medical and airline cadet limits."
      schema={[articleSchema, faqSchema]}
      heading="Age Limit to Become a Pilot in India: Minimum and Maximum, Licence by Licence"
      category="Pilot eligibility"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="7 min"
      quickAnswer={{
        question: 'What is the age limit to become a pilot in India?',
        answer: `There is a minimum age for each licence: ${SPL.minAge} for a Student Pilot Licence, ${PPL.minAge} for a PPL, ${CPL.minAge} for a CPL and ${ATPL.minAge} for an ATPL. DGCA's Pariksha rules prescribe no maximum age for the written exams. Age matters mainly through the medical, which is renewed more often as you get older.`,
      }}
      summaryTitle="Pilot age limits in one view"
      summaryItems={[
        `Minimum ages: ${SPL.code} ${SPL.minAge}, ${PPL.code} ${PPL.minAge}, ${CPL.code} ${CPL.minAge}, ${ATPL.code} ${ATPL.minAge}.`,
        `A computer number for the DGCA exams can be applied for from ${PARIKSHA.basics.minAge}. ${PARIKSHA.basics.maxAgeNote}`,
        `The Class 1 medical, needed for a CPL: ${class1.validity}`,
        `One airline cadet programme publishes its own band: ${INDIGO_CADET.ageRange}. Others set theirs per intake.`,
        `Sources: DGCA Pariksha FAQ, the medical CAR and IndiGo's cadet page, read in September and October 2026.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="9 October 2026"
    >
      <p>
        A parent writes that their son is 17 and asks whether he is too young. A 29-year-old
        engineer asks whether the door has already closed. Both have heard a number, usually from a
        relative or a forwarded message, and neither can say where it came from. The age limit to
        become a pilot in India is really three separate questions: how young you can start, whether
        DGCA caps how old you can be, and what changes in between. The rules answer each one
        differently, and this post separates them, using DGCA&rsquo;s own documents rather than
        hearsay.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/age-limit-pilot-india/hero-two-students-one-runway.webp"
        width={1200}
        height={630}
        alt="A teenage student and a working adult standing side by side on a small airfield apron in front of a single-engine trainer aircraft"
        promptId="99"
      />

      <h2 id="maximum" className={H2}>Is there a maximum age to become a pilot in India?</h2>
      <p>
        DGCA&rsquo;s Pariksha rules prescribe no maximum age for registering for the written
        examinations: {PARIKSHA.basics.maxAgeNote.toLowerCase()} The minimum for registration is{' '}
        {PARIKSHA.basics.minAge}. You can read this in the{' '}
        <Ext href={PARIKSHA.sources[0].url}>Flight Crew Computer Number Registration FAQ</Ext> on
        the Pariksha portal.
      </p>
      <p>
        That answer covers the exam side only. Passing the papers does not by itself give you a
        licence, and three other things sit between you and one: the Class 1 medical, the flying
        hours and, if an airline is the goal, the airline&rsquo;s own selection rules. The sections
        below take them in turn. Nothing in the documents this site relies on sets a cutoff age
        for taking flying lessons at a school, so that depends on the school and on the medical.
      </p>

      <h2 id="minimum" className={H2}>What is the minimum age for each pilot licence?</h2>
      <p>
        The minimum age depends on the licence: {listJoin(LICENCES.map((l) => `${l.minAge} for the ${l.code}`))}.
        These come from Schedule II of the Aircraft Rules, 1937, which continues in force under the
        Bharatiya Vayuyan Adhiniyam, 2024. The table adds the computer number, which has its own
        floor and is the first thing most students apply for.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Minimum age for the DGCA computer number and each pilot licence in India</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Step</th>
              <th scope="col" className={TH}>Minimum age</th>
              <th scope="col" className={TH}>What it allows</th>
            </tr>
          </thead>
          <tbody>
            {ageRows.map((r, i) => (
              <tr key={r.gate} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.gate}</td>
                <td className={TD}>{r.age}</td>
                <td className={TD}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Two consequences follow. A student who starts at {PARIKSHA.basics.minAge} can sit papers and fly
        on a Student Pilot Licence, but cannot hold a CPL before {CPL.minAge}. And the{' '}
        {ATPL.code} floor of {ATPL.minAge} sits above the CPL floor, so command-level licensing is a
        later step. For that step, see{' '}
        <Link href="/blogs/cpl-vs-atpl-difference-india" className={LINK}>CPL vs ATPL</Link>. The
        education bar does not move with age either: a CPL needs{' '}
        {EDUCATION.requirement.toLowerCase()}, as the{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>{' '}
        sets out.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Unsure where you stand?"
        title="Talk through your age and your route"
        text="Counselling is free. Bring your date of birth and your Class 12 marksheet and we will map the DGCA steps against your situation, and say plainly where we can and cannot help."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <h2 id="medical" className={H2}>What does change as you get older?</h2>
      <p>
        The medical is the part of the licence that depends on your age. A Class 1 medical, which a
        CPL needs, has this validity: {lc(class1.validity)} {MED.rules.validity39C} A source that
        still places the boundary at 40 is out of date. The amendment is on the{' '}
        <Ext href={MED.sources[1].url}>Ministry of Civil Aviation site</Ext>.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">How long each DGCA medical class stays valid, by age</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Medical</th>
              <th scope="col" className={TH}>Needed for</th>
              <th scope="col" className={TH}>Validity</th>
            </tr>
          </thead>
          <tbody>
            {medicalRows.map((r, i) => (
              <tr key={r.cls} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.cls}</td>
                <td className={TD}>{r.needed}</td>
                <td className={TD}>{r.validity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The{' '}
        <Ext href={MED.sources[2].url}>medical CAR</Ext>{' '}
        adopts the ICAO Annex 1 standards by reference and prints no single age cutoff for
        fitness. Tests grow with age: the Class 2 panel adds fasting and post-prandial blood
        sugar and a lipid profile {lc(mid40sNote.when)}. Whether you are fit is decided by a
        DGCA-empanelled examiner, not by a birthday, and no page can promise a result in advance.
        Our{' '}
        <Link href="/dgca-class-2-class-1-medical" className={LINK}>Class 1 and Class 2 medical guide</Link>{' '}
        covers the examination, the fees and the centres.
      </p>

      <h2 id="airline" className={H2}>Do airlines set their own age limits?</h2>
      <p>
        Yes, and these are the limits that most often decide the question. An airline or cadet
        programme is free to set an age band, and the bands change by intake. The one we can cite
        is IndiGo&rsquo;s: its own cadet page states applicants must be {INDIGO_CADET.ageRange}, read
        on {INDIGO_CADET.verifiedOn}. Read the{' '}
        <Ext href={INDIGO_CADET.source.url}>IndiGo cadet page</Ext> for the current notice, because a
        stale band can stop you applying or let you apply late.
      </p>
      <p>
        That limit belongs to one programme. It is not a DGCA rule, and it does not stop a person
        older than that band from holding a licence. We do not state limits for other airlines because
        we have not been able to verify them against the airlines&rsquo; own notices, and they vary.
        See also{' '}
        <Link href="/indigo-pilot-preparation" className={LINK}>our IndiGo preparation page</Link>.
      </p>

      <BlogImagePlaceholder
        src="/blog/age-limit-pilot-india/age-ladder-licences.webp"
        width={1200}
        height={675}
        alt="A short staircase of four steps rising from left to right, each step topped by a different small aircraft icon, with a figure standing on the second step"
        promptId="100"
      />

      <h2 id="late-start" className={H2}>What should an older starter plan for?</h2>
      <p>
        An older starter has no extra DGCA hurdle on the exam side, but there are practical points
        that the rules do not spell out as age rules. Each of these is our reading of the published
        documents, not a DGCA statement:
      </p>
      <ul className={UL}>
        <li>
          <strong>Book the Class 1 medical first.</strong> It is the one requirement whose outcome
          you cannot predict, and it should come before you commit money to a flying school.
        </li>
        <li>
          <strong>Keep the papers and the hours in step.</strong> {EXAM_RULES.paperValidity.cplAtpl} The period is
          counted back from your application, and the {CPL_HOURS.total} hours have to fall inside
          a {CPL_HOURS.recencyYears}-year window too. The{' '}
          <Link href="/blogs/dgca-exam-pass-validity-cpl-five-years" className={LINK}>five-year rule post</Link>{' '}
          explains how to plan both.
        </li>
        <li>
          <strong>Ask about the runway honestly.</strong> A late start leaves fewer years to fly
          for pay. DGCA publishes no career-length or pay figure, so any number you are quoted is
          the quoting school&rsquo;s estimate. Ask where it comes from.
        </li>
        <li>
          <strong>Check any cadet programme&rsquo;s band before you apply,</strong> since it can differ
          from the licence minimum and from the last intake.
        </li>
      </ul>
      <p>
        We teach the DGCA written subjects at our Dwarka classroom and online, and students join
        at different ages. See our{' '}
        <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes</Link>.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Write down your date of birth and read the minimum age for the licence you want in the
        table above. If you are past the age airline cadet programmes publish, read the current notice
        for the airlines you have in mind, and book a Class 1 medical before any deposit. Whatever
        your age, the DGCA exams, the medical and the flying hours decide the rest, in that order
        of certainty.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
