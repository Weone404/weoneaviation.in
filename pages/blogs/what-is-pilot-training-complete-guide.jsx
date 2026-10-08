import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import IgruaFeeBox from '../../components/IgruaFeeBox';
import {
  LICENCES, MIN_AGE, CPL_HOURS, DGCA_PAPERS, RTR, EDUCATION, PARIKSHA, EXAM_RULES, MEDICAL_STANDARDS,
  FOREIGN_LICENCE, PILOT_SUPPLY, COST_NOTE, ACADEMY, agesSummary,
} from '../../lib/facts';
import {
  H2, H3, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, OL, SCOPE,
  listJoin, articleSchemaFor, faqSchemaFrom,
} from '../../lib/blogKit';

/*
 * /blogs/what-is-pilot-training-complete-guide — REWRITTEN 2026-10-08 to
 * data/blog-standard.md.
 *
 * INTENT, KEPT DISTINCT FROM ITS NEIGHBOURS. Three August posts covered the same
 * ground (eligibility, papers, hours, cost, India vs abroad) and competed with
 * each other. This one now owns the explainer: what pilot training is, the
 * licence ladder, PPL against CPL, and how the ground and flying halves fit.
 * The admission checklist belongs to flight-school-prerequisites-admission-guide
 * and the programme comparison to commercial-pilot-training-programs-complete-guide.
 *
 * CORRECTED IN THIS PASS
 *   - The step list told students to apply for the computer number "through
 *     the eGCA portal". It is issued on Pariksha; eGCA is the licensing portal.
 *   - "Our instructors are pilots" contradicted ACADEMY.scope ("we do not employ
 *     pilots"). Removed, with unverified batch-day and free-repeat claims.
 *   - Unsourced timelines (6 months, 12-18 months, "18 to 24 months") and the
 *     claim that Air Navigation is "the paper students most often re-sit" are
 *     gone; the page says what decides the duration instead.
 *   - Two images dropped: a cost-proportions graphic with untraceable
 *     percentages, and a timeline graphic captioned "DGCA-approved theory
 *     training", which is not a category DGCA publishes.
 *   - FAQPage now emitted from peopleAlsoAsk; the pageFaqs.js entry is deleted.
 */
const SLUG = 'what-is-pilot-training-complete-guide';
const DATE_PUBLISHED = '2026-08-26';
const DATE_MODIFIED = '2026-10-08';
const HEADING = 'What Is Pilot Training? Licences, PPL vs CPL and How Training Works in India (2027)';
const DESCRIPTION = 'What pilot training in India is: the SPL-to-ATPL licence ladder, PPL vs CPL, the ground and flying halves, eligibility, cost and training abroad.';

const PPL = LICENCES.find((l) => l.code === 'PPL');
const class1 = MEDICAL_STANDARDS.classes.find((c) => c.cls === 'Class 1');
const class2 = MEDICAL_STANDARDS.classes.find((c) => c.cls === 'Class 2');
const cplConversion = FOREIGN_LICENCE.examinations[0];

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: HEADING,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot training guide',
  keywords: 'what is pilot training, pilot training in India, PPL vs CPL, types of pilot licence India, pilot training process, commercial pilot licence India',
  image: '/blog/what-is-pilot-training/hero-classroom-to-cockpit.webp',
});

const eligibilityRows = [
  { req: 'Minimum age', detail: `${MIN_AGE.CPL} years`, clause: 'Section J, para 1(a)' },
  { req: 'Education', detail: EDUCATION.requirement, clause: EDUCATION.clause },
  { req: 'Medical fitness', detail: 'A Class 1 medical assessment from a DGCA-approved medical authority', clause: 'Section J, para 1(c)' },
  { req: 'Written examinations', detail: `${DGCA_PAPERS.length} DGCA papers, ${EXAM_RULES.theory.passMark}% in each`, clause: 'Section J, para 1(d)' },
  { req: 'Flying', detail: `${CPL_HOURS.total} hours, within ${CPL_HOURS.recencyYears} years of applying`, clause: CPL_HOURS.clause },
  { req: 'Radio', detail: `${RTR.name}, examined separately`, clause: 'Section J, para 1(g)' },
];

const peopleAlsoAsk = [
  {
    q: 'What is pilot training?',
    a: `Pilot training is the regulated process of earning a pilot licence from DGCA. For a commercial licence it combines ${DGCA_PAPERS.length} written papers, the ${RTR.name} radio examination, a Class 1 medical and ${CPL_HOURS.total} hours of logged flying, all measured against Schedule II of the Aircraft Rules, 1937.`,
  },
  {
    q: 'What are the types of pilot licence in India?',
    a: `India has four aeroplane pilot licences in a ladder: the Student Pilot Licence, the Private Pilot Licence, the Commercial Pilot Licence and the Airline Transport Pilot Licence. Their minimum ages are ${agesSummary()}. Only the CPL and ATPL permit flying for payment.`,
  },
  {
    q: 'What is the difference between a PPL and a CPL?',
    a: `A Private Pilot Licence allows personal and recreational flying and never flying for payment; a Commercial Pilot Licence allows flying for payment. The PPL has a minimum age of ${PPL.minAge} and needs a Class 2 medical; the CPL has a minimum age of ${MIN_AGE.CPL}, needs a Class 1 medical, ${DGCA_PAPERS.length} written papers and ${CPL_HOURS.total} hours of flying.`,
  },
  {
    q: 'Do I need a PPL before a CPL in India?',
    a: 'No. A PPL is not a prerequisite for a CPL in India. Many students go straight from the Student Pilot Licence to CPL training, and any hours flown along the way count as flight time towards the CPL total.',
  },
  {
    q: 'Is pilot training a degree?',
    a: 'No. Pilot training leads to a licence issued by DGCA, not to an academic degree, and a degree does not replace any licence requirement. Some programmes run a degree alongside flying training, but the licence still depends on the papers, the medical and the flying hours.',
  },
  {
    q: 'Can I start pilot training before 18?',
    a: `Yes. The minimum age of ${MIN_AGE.CPL} applies to the issue of the Commercial Pilot Licence, not to training. The Student Pilot Licence is available from ${MIN_AGE.SPL} and the DGCA computer number from ${PARIKSHA.basics.minAge}, so many students start ground subjects while still in Class 12.`,
  },
  {
    q: 'How long does pilot training take in India?',
    a: `No regulation fixes how long pilot training takes. The duration depends on how quickly the ${DGCA_PAPERS.length} papers are cleared, flying-school weather and aircraft availability, and the medical. Papers passed for a CPL stay usable for five years, which is the outer limit to plan around.`,
  },
  {
    q: 'Can I train abroad and fly in India?',
    a: `Yes, but a foreign licence must be converted to an Indian one. For a CPL, DGCA's conversion CAR requires ${listJoin(cplConversion.papers.map((p) => p.split(' covering')[0]))}, a skill test in India, an Indian medical and the radio licence steps, plus currency on the foreign rating.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const related = [
  { lead: 'The admission checklist, document by document, is in', anchor: 'flight school prerequisites', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'How to compare one CPL programme with another is covered in', anchor: 'commercial pilot training programmes', href: '/blogs/commercial-pilot-training-programs-complete-guide' },
  { lead: 'Whether to take the PPL first is answered in', anchor: 'do you need a PPL before a CPL', href: '/blogs/do-you-need-ppl-before-cpl-in-india' },
  { lead: 'The clause-by-clause eligibility table is on', anchor: 'the CPL eligibility page', href: '/commercial-pilot-license-eligibility' },
  { lead: 'Training abroad against training at home is weighed in', anchor: 'CPL training in India vs abroad', href: '/blogs/cpl-training-india-vs-abroad' },
];

const tocHeadings = [
  { id: 'what-is', title: 'What is pilot training?' },
  { id: 'licences', title: 'Which licences can you train for?' },
  { id: 'ppl-vs-cpl', title: 'PPL or CPL?' },
  { id: 'two-halves', title: 'The ground half and the flying half' },
  { id: 'eligibility', title: 'Who can train?' },
  { id: 'duration', title: 'How long does it take?' },
  { id: 'cost', title: 'What does it cost?' },
  { id: 'abroad', title: 'India or abroad?' },
  { id: 'after', title: 'What comes after the licence?' },
  { id: 'start', title: 'Where to start' },
];

const sources = [
  { label: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
  { label: `${EXAM_RULES.car.citation} — ${EXAM_RULES.car.title} (DGCA)`, url: EXAM_RULES.car.where },
  PARIKSHA.sources[1],
  MEDICAL_STANDARDS.sources[2],
  FOREIGN_LICENCE.sources[0],
  PILOT_SUPPLY.sources[0],
];

export default function WhatIsPilotTraining() {
  return (
    <BlogPostLayout
      title="What Is Pilot Training? Licences and PPL vs CPL (2027)"
      description={DESCRIPTION}
      schema={[articleSchema, faqSchema]}
      heading={HEADING}
      category="Pilot training guide"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="12 min"
      quickAnswer={{
        question: 'What is pilot training?',
        answer: `Pilot training is the DGCA-regulated route to a pilot licence. For a commercial licence it means ${DGCA_PAPERS.length} written papers, the ${RTR.name} radio examination, a Class 1 medical and ${CPL_HOURS.total} hours of flying, measured against Schedule II of the Aircraft Rules, 1937. It is not a degree and not a job guarantee: it is the legal minimum to be paid to fly.`,
      }}
      summaryTitle="Key facts at a glance"
      summaryItems={[
        `Four licences, minimum ages ${agesSummary()} (Aircraft Rules, 1937, Schedule II).`,
        `${DGCA_PAPERS.length} DGCA written papers for a CPL, ${EXAM_RULES.theory.passMark}% in each; ${RTR.name} is separate.`,
        `${CPL_HOURS.total} hours of flying for a CPL, within ${CPL_HOURS.recencyYears} years of applying.`,
        'A PPL never permits paid flying and is not required before a CPL.',
        'No regulation fixes the duration or the price of training.',
        `Sources: Schedule II and DGCA CARs, read ${EXAM_RULES.verifiedOn} to ${MEDICAL_STANDARDS.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="8 October 2026"
    >
      <p>
        Type &ldquo;pilot training&rdquo; into a search bar and you get course packages, eighteen-month
        promises, salary screenshots and a dozen acronyms, often on the same page. It is hard to tell
        what is a rule and what is a sales line, and students regularly pay for things in the wrong order
        because of it. Pilot training in India is simpler than it looks once you see its shape: a ladder
        of four licences, two halves (ground and flying) that run side by side, and one regulator whose
        rules decide every step. This guide explains that shape in plain terms, so the rest of the
        decisions make sense.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/hero-classroom-to-cockpit.webp"
        width={1200}
        height={630}
        alt="A student studying in a ground-school classroom beside the same student at the controls of a training aircraft, shown as one continuous journey"
        promptId="1"
      />

      <h2 id="what-is" className={H2}>What is pilot training?</h2>
      <p>
        Pilot training is the regulated process of earning a pilot licence from the Directorate General
        of Civil Aviation. It has three parts that run in parallel: written examinations, medical
        fitness and logged flight time, each measured against Schedule II of the Aircraft Rules, 1937.
      </p>
      <p>
        Three things pilot training is not. It is not a college degree: no university confers a pilot
        licence. It is not an admission with a cut-off and a merit list: the licence is issued to anyone
        who meets the rules. And it is not a job: a Commercial Pilot Licence is the legal minimum that
        lets an operator pay you to fly, and the operator still decides whether to hire you. The
        Aircraft Rules themselves, continued in force by the Bharatiya Vayuyan Adhiniyam, 2024, are on{' '}
        <Ext href={sources[0].url}>India Code</Ext>.
      </p>

      <h2 id="licences" className={H2}>Which pilot licences can you train for in India?</h2>
      <p>
        India has four aeroplane pilot licences, each in its own section of Schedule II and each with
        its own minimum age: the Student Pilot Licence, the Private Pilot Licence, the Commercial Pilot
        Licence and the Airline Transport Pilot Licence. Only the last two permit flying for payment.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Indian pilot licences, minimum ages, Schedule II sections and what each permits</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Licence</th>
              <th scope="col" className={TH}>Minimum age</th>
              <th scope="col" className={TH}>Schedule II</th>
              <th scope="col" className={TH}>What it permits</th>
            </tr>
          </thead>
          <tbody>
            {LICENCES.map((l, i) => (
              <tr key={l.code} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{l.code} — {l.name}</td>
                <td className={TD}>{l.minAge}</td>
                <td className={TD}>{l.section}</td>
                <td className={TD}>{l.permits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/licence-ladder.webp"
        width={1200}
        height={800}
        alt="Four ascending steps labelled Student Pilot Licence, Private Pilot Licence, Commercial Pilot Licence and Airline Transport Pilot Licence"
        promptId="2"
      />
      <h3 className={H3}>SPL means something different in the United States</h3>
      <p>
        In India, SPL is the Student Pilot Licence, the first rung, which permits flight training
        including solo flying under instructor authorisation. In the United States the same initials are
        used for a Sport Pilot certificate, a recreational category under a different regulator. A page
        describing an &ldquo;SPL&rdquo; with weight limits and day-only flying is describing the American
        certificate. Our{' '}
        <Link href="/student-pilot-license-spl" className={LINK}>Student Pilot Licence page</Link> covers the
        Indian one.
      </p>

      <h2 id="ppl-vs-cpl" className={H2}>Should you train for a PPL or a CPL?</h2>
      <p>
        Train for a CPL if you want to be paid to fly, because a PPL never permits paid flying whatever
        hours you hold. A PPL suits someone flying for their own reasons; it is not a required step
        before the CPL.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Private Pilot Licence compared with Commercial Pilot Licence</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Point</th>
              <th scope="col" className={TH}>PPL</th>
              <th scope="col" className={TH}>CPL</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Purpose', 'Personal and recreational flying', 'Flying for payment'],
              ['Minimum age', String(PPL.minAge), String(MIN_AGE.CPL)],
              ['Education (Pariksha)', 'Class 10 pass', 'Physics and Mathematics at 10+2'],
              ['Medical', class2.cls, class1.cls],
              ['Flying', 'Its own, lower requirement', `${CPL_HOURS.total} hours`],
              ['Paid flying', 'Never', 'Yes, subject to ratings and the operator'],
            ].map(([k, a, b], i) => (
              <tr key={k} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{k}</td>
                <td className={TD}>{a}</td>
                <td className={TD}>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Hours flown before a CPL are flight time and count towards its total, so a PPL taken first is
        not wasted, but it is not required either. The question is answered in full in{' '}
        <Link href="/blogs/do-you-need-ppl-before-cpl-in-india" className={LINK}>do you need a PPL before a CPL</Link>,
        and the PPL&rsquo;s own subject rule in{' '}
        <Link href="/blogs/ppl-physics-maths-requirement-india" className={LINK}>the PPL Physics and Maths post</Link>.
      </p>
      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/ppl-vs-cpl.webp"
        width={1200}
        height={675}
        alt="Two runways diverging from a single starting point, one signposted to a private pilot path and the other to an airline pilot path"
        promptId="3"
      />

      <h2 id="two-halves" className={H2}>What are the ground half and the flying half of pilot training?</h2>
      <p>
        The ground half of pilot training is the {DGCA_PAPERS.length} DGCA written papers plus the{' '}
        {RTR.name} radio examination; the flying half is {CPL_HOURS.total} hours of logged flight time at
        a flying training organisation. The two can run side by side, and most students start the
        papers before or alongside the flying.
      </p>
      <h3 className={H3}>The ground half</h3>
      <p>
        The papers are {listJoin(DGCA_PAPERS)}, booked on the{' '}
        <Ext href={PARIKSHA.portal}>DGCA Pariksha portal</Ext> with a computer number. Each needs{' '}
        {EXAM_RULES.theory.passMark}% on its own, under the{' '}
        <Ext href={EXAM_RULES.car.where}>DGCA examinations CAR</Ext>. {RTR.note} How the examinations
        work, from fees to sessions, is in{' '}
        <Link href="/blogs/dgca-exam-guide" className={LINK}>our DGCA exam guide</Link>.
      </p>
      <h3 className={H3}>The flying half</h3>
      <p>
        A CPL needs {CPL_HOURS.total} hours of flight time, flown within the {CPL_HOURS.recencyYears} years
        before applying. The components below sit <strong>inside</strong> that total; reading them as
        additions is the most common arithmetic mistake students make.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Components of the 200-hour CPL flying requirement, Schedule II Section J para 1(e)</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Component</th>
              <th scope="col" className={TH}>Hours</th>
              <th scope="col" className={TH}>Condition</th>
            </tr>
          </thead>
          <tbody>
            {CPL_HOURS.components.map((c, i) => (
              <tr key={c.label} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{c.label}</td>
                <td className={TD}>{c.hours}</td>
                <td className={TD}>{c.note} ({c.clause})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/flying-hours-composition.webp"
        width={1200}
        height={800}
        alt="One large circle divided into command, cross-country, instrument and night segments, showing all four sit inside a single total"
        promptId="4"
      />

      <BlogCta
        variant="mid"
        title="The ground half can start now"
        text="The papers need no flying school and no medical to sit. We teach all five DGCA subjects from our Dwarka classroom and online."
      />

      <h2 id="eligibility" className={H2}>Who is eligible for pilot training in India?</h2>
      <p>
        Anyone can begin pilot training, but the Commercial Pilot Licence is issued only to a candidate
        who is at least {MIN_AGE.CPL}, has Physics and Mathematics at 10+2, holds a Class 1 medical, has
        passed the papers and the radio examination, and has logged the flying. Every requirement sits in
        Schedule II, Section J.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">CPL eligibility requirements with Schedule II clause references</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Requirement</th>
              <th scope="col" className={TH}>What the rule says</th>
              <th scope="col" className={TH}>Clause</th>
            </tr>
          </thead>
          <tbody>
            {eligibilityRows.map((r, i) => (
              <tr key={r.req} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.req}</td>
                <td className={TD}>{r.detail}</td>
                <td className={TD}>{r.clause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Students from a Biology or Commerce stream are not excluded: {EDUCATION.altRoute.charAt(0).toLowerCase() + EDUCATION.altRoute.slice(1)}{' '}
        The medical comes first in practice. {MEDICAL_STANDARDS.classOrder.advice} The{' '}
        <Ext href={MEDICAL_STANDARDS.sources[2].url}>DGCA medical CAR</Ext> sets the classes, and our{' '}
        <Link href="/dgca-class-2-class-1-medical" className={LINK}>Class 1 and Class 2 medical guide</Link> explains
        where each is done.
      </p>

      <h2 id="duration" className={H2}>How long does pilot training take in India?</h2>
      <p>
        No regulation fixes how long pilot training takes, and any single figure is an estimate. The
        duration is set by four things: how quickly the papers are cleared, the flying school&rsquo;s
        weather and aircraft availability, the medical, and, for students abroad, visas and the conversion
        steps on return.
      </p>
      <ul className={UL}>
        <li><strong>The papers.</strong> {DGCA_PAPERS.length} papers, each passed on its own, in sessions DGCA schedules through the year.</li>
        <li><strong>The flying.</strong> Hours are flown when the aircraft, an instructor and the weather all line up; ask a school how many days it lost to weather last year.</li>
        <li><strong>The medical.</strong> A finding that needs investigation pauses everything that depends on it.</li>
        <li><strong>The outer limit.</strong> {EXAM_RULES.paperValidity.cplAtpl} {EXAM_RULES.paperValidity.planningNote}</li>
      </ul>

      <h2 id="cost" className={H2}>What does pilot training cost in India?</h2>
      <p>
        No government body publishes a market price for pilot training in India, and private flying
        schools do not publish their fees. Two kinds of figure can be checked: DGCA&rsquo;s own statutory
        charges, and the published course fee of IGRUA, a government academy.
      </p>
      <IgruaFeeBox />
      <p>
        {COST_NOTE} Our <Link href="/blogs/pilot-training-cost-in-india" className={LINK}>pilot training cost breakdown</Link>{' '}
        takes each line in turn, with the questions that expose an understated quote.
      </p>

      <h2 id="abroad" className={H2}>Should you train in India or abroad?</h2>
      <p>
        Neither is better in the abstract. Training in India keeps you inside the DGCA system with no
        conversion at the end; training abroad ends with that country&rsquo;s licence, which then has to be
        converted to an Indian one before you can fly commercially here.
      </p>
      <p>
        For a CPL, DGCA&rsquo;s{' '}
        <Ext href={FOREIGN_LICENCE.sources[0].url}>conversion CAR</Ext> requires two written papers (
        {listJoin(cplConversion.papers.map((p) => p.split(' covering')[0]))}), a skill test in India, the
        Indian medical and the radio steps, and the foreign rating must be current. {FOREIGN_LICENCE.hoursShortfall}{' '}
        The comparison is set out in{' '}
        <Link href="/blogs/cpl-training-india-vs-abroad" className={LINK}>CPL training in India vs abroad</Link>{' '}
        and the conversion itself in{' '}
        <Link href="/blogs/convert-foreign-pilot-licence-to-dgca-india" className={LINK}>converting a foreign licence</Link>.
      </p>
      <BlogImagePlaceholder
        src="/blog/what-is-pilot-training/india-vs-abroad.webp"
        width={1200}
        height={675}
        alt="Two flight paths leaving one airport, one staying over land on a domestic route and the other crossing an ocean on an international route"
        promptId="7"
      />

      <h2 id="after" className={H2}>What comes after the pilot licence?</h2>
      <p>
        After the licence comes the job search, and a CPL is not an appointment. Airlines, charter
        operators and flying schools each set their own requirements on top of the licence, and the
        Ministry of Civil Aviation has told Parliament that the shortage in India is of commanders, not
        of pilots in general.
      </p>
      <p>
        &ldquo;{PILOT_SUPPLY.statement}&rdquo; ({PILOT_SUPPLY.statementSource},{' '}
        <Ext href={PILOT_SUPPLY.sources[0].url}>PIB</Ext>.) Common first routes include airline first
        officer selection, flight instruction with an instructor rating, and charter flying. The airline
        route is set out in{' '}
        <Link href="/blogs/how-to-become-an-airline-pilot-in-india" className={LINK}>how to become an airline pilot in India</Link>,
        and the instructor route in{' '}
        <Link href="/blogs/flying-instructor-rating-for-pilots-in-india" className={LINK}>the flying instructor rating guide</Link>.
      </p>

      <h2 id="start" className={H2}>Where to start</h2>
      <p>
        Start with the steps that rule things out cheaply. Book the Class 1 medical, apply for a DGCA
        computer number on Pariksha, and check your Class 12 subjects against the rule. Then start the
        papers and compare flying schools from DGCA&rsquo;s own list. Done in that order, pilot training
        stops being a package you buy and becomes a set of steps you control.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
