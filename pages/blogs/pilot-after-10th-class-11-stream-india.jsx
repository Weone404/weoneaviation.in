import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import {
  LICENCES, EDUCATION, PARIKSHA, EXAM_RULES, CPL_HOURS, DGCA_PAPERS, RTR, MEDICAL, MEDICAL_STANDARDS as MED, ACADEMY,
} from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from become-pilot-without-physics-and-maths-class-12 (a Class 12 student who already lacks the
 * subjects and needs the NIOS bridge), ppl-physics-maths-requirement-india (the PPL category's own education
 * check) and the /how-to-become-a-pilot-after-12th page (the route once Class 12 is done). This post owns the
 * earlier decision: a Class 10 student or parent asking whether a pilot career is possible from here, and
 * which Class 11 stream keeps the CPL route open. Pre-CPL audience, the people who decide whether to start.
 * Every figure comes from LICENCES, EDUCATION, PARIKSHA, EXAM_RULES, CPL_HOURS and MEDICAL_STANDARDS in
 * lib/facts.js. The education condition for a Student Pilot Licence is NOT in any source on file, so the post
 * says to ask rather than stating one. Stream names beyond "Physics and Mathematics" are not asserted.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'pilot-after-10th-class-11-stream-india';
const DATE_PUBLISHED = '2026-10-22';
const DATE_MODIFIED = '2026-10-22';

const SPL = LICENCES.find((l) => l.code === 'SPL');
const PPL = LICENCES.find((l) => l.code === 'PPL');
const CPL = LICENCES.find((l) => l.code === 'CPL');
const CLASS1 = MED.classes.find((c) => c.cls === 'Class 1');
const faqPdf = PARIKSHA.sources[0];

const peopleAlsoAsk = [
  {
    q: 'Can I become a pilot after 10th in India?',
    a: `You can start the path after Class 10, but you cannot hold a commercial licence yet. A Commercial Pilot Licence needs ${lc(EDUCATION.requirement)} (${EDUCATION.clause}) and a minimum age of ${CPL.minAge}. What you do after Class 10 is choose subjects that keep that route open.`,
  },
  {
    q: 'Which stream should I take in Class 11 to become a pilot?',
    a: `Pick the combination your board offers that includes both Physics and Mathematics. ${EDUCATION.requirement} is the education condition for a CPL, so a stream without those two subjects means a separate bridge step later.`,
  },
  {
    q: 'Can I become a pilot with Commerce or Arts after 10th?',
    a: `Yes, with an extra step. ${EDUCATION.altRoute} Our guide to becoming a pilot without Physics and Maths in Class 12 sets out how that route works and what it adds to the timeline.`,
  },
  {
    q: 'Is a Class 10 pass enough for any pilot licence?',
    a: `For the PPL category on the DGCA Pariksha portal, yes. ${PARIKSHA.education.ppl} It does not carry over to a CPL: that application has its own education condition, and the PPL ${PPL.minAge}-year age limit still applies.`,
  },
  {
    q: 'At what age can I register for a DGCA computer number?',
    a: `From age ${PARIKSHA.basics.minAge}, whatever category you apply for. ${PARIKSHA.basics.maxAgeNote} The computer number is a lifetime exam identity, not a licence: ${PARIKSHA.basics.oneOnly}`,
  },
  {
    q: 'Should I take the medical before choosing a stream?',
    a: `It is a sensible early step, because the licence you are aiming for needs a Class 1 medical. ${MEDICAL.advice} DGCA's current rules, including where an initial Class 1 can be done, are in our medical guide.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Can You Become a Pilot After 10th in India? What to Choose in Class 11',
  description:
    'You cannot fly commercially straight after Class 10, but your Class 11 subjects decide whether the CPL route stays open. What DGCA requires and what each choice costs you.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot eligibility',
  keywords: 'pilot after 10th, how to become a pilot after 10th in India, which stream for pilot, class 11 subjects for pilot, pilot eligibility after class 10',
});

const sources = [
  { label: faqPdf.label, url: faqPdf.url },
  { label: `${EXAM_RULES.car.citation} (DGCA)`, url: EXAM_RULES.car.where },
  { label: 'Aircraft Rules, 1937, rule 39B — medical standards (DGCA)', url: MED.sources[0].url },
  { label: 'DGCA Pariksha portal', url: PARIKSHA.portal },
];

const related = [
  { lead: 'If Class 12 is already behind you without the two subjects, read', anchor: 'the guide to becoming a pilot without Physics and Maths', href: '/blogs/become-pilot-without-physics-and-maths-class-12' },
  { lead: 'For the Class 10 rule that applies to the PPL category alone, see', anchor: 'the PPL education requirement post', href: '/blogs/ppl-physics-maths-requirement-india' },
  { lead: 'Minimum and maximum ages for every licence are in', anchor: 'the age limit guide', href: '/blogs/age-limit-to-become-a-pilot-in-india' },
  { lead: 'Once Class 12 is finished, the next steps are on', anchor: 'the after-12th pilot route page', href: '/how-to-become-a-pilot-after-12th' },
];

const tocHeadings = [
  { id: 'can-you', title: 'Can you become a pilot after 10th?' },
  { id: 'what-counts', title: 'What does DGCA ask for at each stage?' },
  { id: 'stream', title: 'Which Class 11 stream keeps the CPL route open?' },
  { id: 'other-streams', title: 'What if you choose Commerce, Arts or Biology?' },
  { id: 'start-now', title: 'What can you do before Class 12 ends?' },
  { id: 'mistakes', title: 'What do families get wrong at this point?' },
  { id: 'this-week', title: 'What to do this week' },
];

const stageRows = [
  { stage: 'Class 10 passed', ask: `${PARIKSHA.education.ppl}`, note: `A DGCA computer number can be allotted from age ${PARIKSHA.basics.minAge}.` },
  { stage: 'Class 11 and 12', ask: `${EDUCATION.requirement} for every category other than PPL.`, note: 'This is the stage where the choice of subjects matters.' },
  { stage: `Age ${CPL.minAge}`, ask: `Minimum age for the ${CPL.name}.`, note: `The ${SPL.name} starts at ${SPL.minAge} and the ${PPL.name} at ${PPL.minAge}.` },
  { stage: 'Medical', ask: `A ${CLASS1.cls} medical for the CPL.`, note: `Valid ${lc(CLASS1.validity)}` },
  { stage: 'Written papers', ask: `${DGCA_PAPERS.length} DGCA papers, ${EXAM_RULES.theory.passMark}% in each, plus ${RTR.name} separately.`, note: EXAM_RULES.paperValidity.cplAtpl },
  { stage: 'Flying', ask: `${CPL_HOURS.total} hours of flight time (${CPL_HOURS.clause}).`, note: 'Done at a DGCA-approved flying school, after the stages above are lined up.' },
];

const streamRows = [
  { choice: 'Class 11 and 12 with Physics and Mathematics', result: `Meets ${EDUCATION.clause} directly. Nothing extra to clear later.` },
  { choice: 'Commerce, Arts or Biology without both subjects', result: EDUCATION.altRoute },
  { choice: 'Undecided, subjects chosen for another career', result: 'Your options stay open only if both subjects are in the Class 12 record or can be cleared later. Decide with the bridge step in mind.' },
];

export default function PilotAfter10thClass11StreamIndia() {
  return (
    <BlogPostLayout
      title="Can You Become a Pilot After 10th in India?"
      description="You cannot fly commercially after Class 10 alone, but your Class 11 subjects decide whether the CPL route stays direct. What DGCA asks for at each stage."
      schema={[articleSchema, faqSchema]}
      heading="Can You Become a Pilot After 10th in India? What to Choose in Class 11"
      category="Pilot eligibility"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'Can you become a pilot after 10th in India?',
        answer: `You can begin after Class 10, but a commercial licence comes later. DGCA asks for ${lc(EDUCATION.requirement)} and a minimum age of ${CPL.minAge} for a CPL. So the decision you make after Class 10 is the Class 11 stream: choose Physics and Mathematics to keep the route direct.`,
      }}
      summaryTitle="Pilot after 10th, in one view"
      summaryItems={[
        `A Class 10 pass alone does not lead to a CPL. ${EDUCATION.requirement} does (${EDUCATION.clause}).`,
        `The minimum ages are ${SPL.minAge} for an SPL, ${PPL.minAge} for a PPL and ${CPL.minAge} for a CPL.`,
        `For the PPL category on Pariksha, Class 10 is the stated education condition; every other category needs the Physics and Mathematics 10+2.`,
        `A Commerce, Arts or Biology stream is not a dead end: ${lc(EDUCATION.altRoute)}`,
        `A DGCA computer number can be allotted from age ${PARIKSHA.basics.minAge}, with no maximum age prescribed.`,
        'Sources: the DGCA Pariksha FAQ and Civil Aviation Requirements, as last verified on 11 September 2026.',
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="11 September 2026"
    >
      <p>
        A student has just passed Class 10 and the family is asking one question: is it too early, or too
        late, to plan for a pilot career? The answer from relatives usually depends on which website they
        read last. Whether you can become a pilot after 10th turns on a single choice, the subjects you take
        in Class 11, because that is when the education condition for a Commercial Pilot Licence is won or
        postponed. This post sets out what DGCA asks for and in what order.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/pilot-after-10th-class-11-stream/hero-fork-after-class-ten.webp"
        width={1200}
        height={630}
        alt="A student in school uniform standing at a fork in a path, one branch leading straight to a small training aircraft and the other bending towards a short detour before rejoining it"
        promptId="107"
      />

      <h2 id="can-you" className={H2}>Can you become a pilot after 10th?</h2>
      <p>
        You can start planning after Class 10, but you cannot be a commercial pilot from Class 10 alone.
        The Commercial Pilot Licence needs {lc(EDUCATION.requirement)} ({EDUCATION.clause}) and a minimum age
        of {CPL.minAge}. What a Class 10 student controls is the stream, and that single choice decides
        whether the route is direct or has a bridge step in the middle.
      </p>
      <p>
        There is one narrow exception worth knowing, because it causes most of the confusion online. For
        the PPL category, the Pariksha FAQ names the Class 10 requirement instead. {PARIKSHA.education.ppl}{' '}
        A Private Pilot Licence does not let you fly for payment, so it does not replace the CPL. Our{' '}
        <Link href="/blogs/ppl-physics-maths-requirement-india" className={LINK}>PPL education requirement post</Link>{' '}
        covers that exception in full.
      </p>

      <h2 id="what-counts" className={H2}>What does DGCA ask for at each stage?</h2>
      <p>
        DGCA asks for six things between Class 10 and a CPL: the right subjects, the right age, a Class 1
        medical, {DGCA_PAPERS.length} written papers, the {RTR.name} radio certificate, and {CPL_HOURS.total}{' '}
        hours of flying. The table puts them in the order a student meets them, with the rule that governs
        each one.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">What DGCA asks for between Class 10 and a Commercial Pilot Licence</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Stage</th>
              <th scope="col" className={TH}>What is asked</th>
              <th scope="col" className={TH}>Note</th>
            </tr>
          </thead>
          <tbody>
            {stageRows.map((r, i) => (
              <tr key={r.stage} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.stage}</td>
                <td className={TD}>{r.ask}</td>
                <td className={TD}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The education line is stated on the <Ext href={faqPdf.url}>Pariksha computer number FAQ</Ext>, and the
        pass mark and paper validity come from the{' '}
        <Ext href={EXAM_RULES.car.where}>DGCA Civil Aviation Requirement on examination eligibility</Ext>.
        The papers are {DGCA_PAPERS.join(', ')}. Our{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link> brings
        the whole list together.
      </p>

      <h2 id="stream" className={H2}>Which Class 11 stream keeps the CPL route open?</h2>
      <p>
        The stream that includes both Physics and Mathematics keeps the CPL route direct. Choose whichever
        combination your board offers that carries both subjects through to the Class 12 record, because{' '}
        {lc(EDUCATION.requirement)} is the condition DGCA checks for every flight crew category other than
        PPL.
      </p>
      <p>
        It helps to see the choice as a trade, not a rule that closes doors. A student who takes both
        subjects spends the next two years on them and arrives at Class 12 with nothing left to clear. A
        student who takes another stream can still reach a CPL, but must clear both subjects separately,
        which adds study time and an examination before the application. The table sets the three common
        positions side by side.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Class 11 subject choices and what each means for the CPL education condition</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Your Class 11 choice</th>
              <th scope="col" className={TH}>What it means for the CPL</th>
            </tr>
          </thead>
          <tbody>
            {streamRows.map((r, i) => (
              <tr key={r.choice} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.choice}</td>
                <td className={TD}>{r.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogCta
        variant="mid"
        eyebrow="Choosing subjects"
        title="Talk through your Class 11 options"
        text="A counselling session is free. Bring your Class 10 marksheet and tell us what your family is weighing; we will map it against the DGCA rules, and say plainly where we can and cannot help."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <BlogImagePlaceholder
        src="/blog/pilot-after-10th-class-11-stream/two-routes-one-requirement.webp"
        width={1200}
        height={675}
        alt="Two parallel paths from a school gate to the same aerodrome, the left path straight and short, the right path passing through one extra small checkpoint before joining it"
        promptId="108"
      />

      <h2 id="other-streams" className={H2}>What if you choose Commerce, Arts or Biology?</h2>
      <p>
        A student from Commerce, Arts or Biology can still reach a CPL. {EDUCATION.altRoute} The condition
        is the same; only the way you meet it differs. Our guide to{' '}
        <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className={LINK}>
          becoming a pilot without Physics and Maths in Class 12
        </Link>{' '}
        explains the bridge route and what it adds to the timeline.
      </p>
      <p>
        We would not call the bridge a reason to avoid your preferred stream if you are unsure about flying.
        We would call it a cost you should know before you decide. The rules for the exam sit in the DGCA
        documents, and rules can be amended, so check the current Schedule on the{' '}
        <Ext href={PARIKSHA.portal}>Pariksha portal</Ext> before you commit to a stream on the strength of
        any article, including this one.
      </p>

      <h2 id="start-now" className={H2}>What can you do before Class 12 ends?</h2>
      <p>
        Three things can start early without any commitment to a flying school: the medical, the computer
        number and the ground subjects. A DGCA computer number can be allotted from age{' '}
        {PARIKSHA.basics.minAge}, and {lc(PARIKSHA.basics.validity)} The medical is worth doing early because
        the licence you are aiming for needs a {CLASS1.cls}: {MEDICAL.advice}
      </p>
      <ul className={UL}>
        <li>
          The {CLASS1.cls} medical and where DGCA says it can be done are set out in our{' '}
          <Link href="/dgca-class-2-class-1-medical" className={LINK}>Class 1 and Class 2 medical guide</Link>.
          The standard itself comes from <Ext href={MED.sources[0].url}>rule 39B of the Aircraft Rules</Ext>.
        </li>
        <li>
          The age gates are laid out in the{' '}
          <Link href="/blogs/age-limit-to-become-a-pilot-in-india" className={LINK}>age limit guide</Link>:{' '}
          {SPL.minAge} for the {SPL.name}, {PPL.minAge} for the {PPL.name} and {CPL.minAge} for the{' '}
          {CPL.name}. Whether a Class 10 pass is enough for an SPL is not stated in the sources we cite, so
          ask the flying school you are considering.
        </li>
        <li>
          Ground subjects are taught for students who already hold their Class 12 record on our{' '}
          <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes page</Link>. Cleared papers
          expire, so starting them years before you can fly is not free.
        </li>
      </ul>

      <h2 id="mistakes" className={H2}>What do families get wrong at this point?</h2>
      <p>
        Most mistakes come from reading a rule meant for one licence as if it covered all of them, or from
        assuming a stream is a permanent verdict.
      </p>
      <ul className={UL}>
        <li>Treating the PPL&rsquo;s Class 10 condition as the CPL requirement, then discovering the 10+2 rule at the application.</li>
        <li>Dropping Physics or Mathematics in Class 11 for another career plan, without pricing the bridge step if flying returns.</li>
        <li>Assuming a school&rsquo;s brochure states the DGCA condition. Read it on the Pariksha FAQ instead.</li>
        <li>Booking flying fees before a {CLASS1.cls} medical, and learning of a problem after the deposit.</li>
        <li>Counting on a fixed total cost. Flying schools set their own fees, so ask each one in writing.</li>
      </ul>

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Open the <Ext href={faqPdf.url}>Pariksha FAQ</Ext>, read the education line for your category, and
        write down which stream your family would choose if flying were the plan. Then compare it with the
        streams your school offers. If you want a second pair of eyes on that comparison, the counselling
        session above is free, and the choice is yours either way.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
