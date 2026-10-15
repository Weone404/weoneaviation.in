import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { MEDICAL_STANDARDS as MED, EGCA, ACADEMY } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, lc, listJoin, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from /dgca-class-2-class-1-medical (the page that owns the Class 1 / Class 2 standards, validity
 * bands and appeal route) and from age-limit-to-become-a-pilot-in-india (which only borrows the validity bands).
 * This post owns one decision a pre-CPL family faces: when to take the first Class 1 and where DGCA allows it,
 * before a deposit goes to a flying school. Every figure comes from MEDICAL_STANDARDS in lib/facts.js. The CAR
 * publishes no numeric eyesight figure, so none appears. No private-school fee or pass-rate claim.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'class-1-medical-before-joining-flying-school';
const DATE_PUBLISHED = '2026-10-15';
const DATE_MODIFIED = '2026-10-15';

const class1 = MED.classes.find((c) => c.cls === 'Class 1');
const class2 = MED.classes.find((c) => c.cls === 'Class 2');
const feeClass1 = MED.fees.rows.find((r) => r.cls === 'Class 1' && r.purpose.startsWith('Initial'));
const feeClass2 = MED.fees.rows.find((r) => r.cls.startsWith('Class 2') && r.purpose.startsWith('Initial'));
const car = MED.sources[2];
const centreList = MED.sources.find((s) => s.label.startsWith('List of DGCA approved aeromedical'));
const rule39b = MED.sources[0];
const initialCentres = MED.centres.initialIssueOnly.list;
const delhiNcrCivil = MED.centres.civil.filter((c) => /New Delhi|Gurugram/.test(c.city));

const peopleAlsoAsk = [
  {
    q: 'Do I need a Class 1 medical before I join a flying school?',
    a: `DGCA does not make it a condition of joining; the Class 1 is needed for the licence you are training towards. The medical CAR's own practical advice, though, is to book the initial Class 1 before committing money to a school, because finding a disqualifying condition after paying a deposit is an expensive way to learn it. A school's own admission rules may differ, so ask it directly.`,
  },
  {
    q: 'Where can the first Class 1 medical be done in India?',
    a: `Only at ${listJoin(initialCentres.map((c) => c.replace('DGCA-empanelled ', 'a DGCA-empanelled ')))}. ${MED.centres.initialIssueOnly.note}`,
  },
  {
    q: 'Do I have to take a Class 2 medical before the Class 1?',
    a: `No. ${MED.classOrder.notMandatory} Where a Class 2 is done first, ${lc(MED.classOrder.ifYouDoClass2First)}`,
  },
  {
    q: 'How much does a Class 1 medical cost?',
    a: `DGCA's fee at the Indian Air Force centres is ${feeClass1.label} for an initial Class 1, paid on Bharatkosh before the examination. ${MED.fees.investigationCharges} ${MED.fees.privateExaminers}`,
  },
  {
    q: 'How long does a Class 1 medical stay valid?',
    a: `${class1.validity} Validity is reckoned from the date of the examination on the CA-35 certificate. Check the exact bands in the medical CAR when you plan your renewal.`,
  },
  {
    q: 'Can anyone tell me in advance whether I will clear the Class 1?',
    a: `No. ${MED.examination.note} The CAR adopts ICAO Annex 1 standards and DGCA's medical circulars by reference and publishes no numeric eyesight, colour-vision or hearing figure of its own, so any page quoting a pass number against the CAR is quoting something the CAR does not say.`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Class 1 Medical Before Flying School: Where to Take It and in What Order',
  description:
    'Where DGCA allows the first Class 1 medical, whether a Class 2 has to come first, what the statutory fee is, and why to book it before a flying school deposit.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'Pilot medicals',
  keywords: 'Class 1 medical before flying school, DGCA Class 1 medical initial centres, Class 1 or Class 2 medical first, pilot medical India, DGCA medical fee',
});

const sources = [
  { label: car.label, url: car.url },
  { label: centreList.label, url: centreList.url },
  { label: rule39b.label, url: rule39b.url },
  { label: 'eGCA portal', url: EGCA.url },
];

const related = [
  { lead: 'The full Class 1 and Class 2 standards are on', anchor: 'our DGCA medical guide', href: '/dgca-class-2-class-1-medical' },
  { lead: 'The medical is the second gate in', anchor: 'the eGCA CPL application checklist', href: '/blogs/cpl-application-egca-prerequisites-checklist' },
  { lead: 'What a school will ask for at admission is in', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'The age bands that sit beside the medical are in', anchor: 'the age limit post', href: '/blogs/age-limit-to-become-a-pilot-in-india' },
];

const tocHeadings = [
  { id: 'before-deposit', title: 'Should you take the Class 1 medical before paying a flying school?' },
  { id: 'where', title: 'Where can the first Class 1 medical be done?' },
  { id: 'class-2-first', title: 'Do you need a Class 2 medical first?' },
  { id: 'cost', title: 'What does the medical cost?' },
  { id: 'checked', title: 'What does the examination check?' },
  { id: 'booking', title: 'How do you book it?' },
  { id: 'this-week', title: 'What to do this week' },
];

export default function Class1MedicalBeforeFlyingSchool() {
  return (
    <BlogPostLayout
      title="Class 1 Medical Before Flying School: Where and When"
      description="Where an initial DGCA Class 1 medical can be done, whether a Class 2 has to come first, what the fee is, and why to book it before paying a flying school."
      schema={[articleSchema, faqSchema]}
      heading="Class 1 Medical Before Flying School: Where to Take It and in What Order"
      category="Pilot medicals"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'When should you take the Class 1 medical, and where?',
        answer: `Before paying a flying school, book the initial Class 1 medical. DGCA restricts that first Class 1 to ${listJoin(initialCentres.map((c) => c.replace('DGCA-empanelled ', 'a DGCA-empanelled ')))}. A Class 2 is not a prerequisite for it, and the appointment is booked on eGCA.`,
      }}
      summaryTitle="The medical order in one view"
      summaryItems={[
        `A commercial pilot licence needs a Class 1 medical; a student or private licence needs a Class 2.`,
        `The initial Class 1 is restricted to ${initialCentres.length} kinds of centre, listed in the table below.`,
        `${MED.classOrder.notMandatory.split('. ')[0]}.`,
        `DGCA's fee at the Indian Air Force centres is ${feeClass1.label} for an initial Class 1 and ${feeClass2.label} for a Class 2.`,
        `Sources: DGCA's medical CAR (effective ${MED.car.effectiveFrom}) and its centre list updated ${MED.centresAsOf}, read on 15 October 2026.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="15 October 2026"
    >
      <p>
        A family pays a flying school a deposit in March. In June the student goes for the first
        Class 1 medical and learns that a condition they never knew about rules out a commercial
        licence. The deposit is gone, a year of planning with it, and nobody did anything wrong except
        do the steps in the wrong order. This post is about getting the Class 1 medical before flying
        school in the right place and the right sequence, so the first rupee you spend is not the
        riskiest one.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/class-1-medical-before-flying-school/hero-medical-before-deposit.webp"
        width={1200}
        height={630}
        alt="A student standing at a fork in a path, one branch leading to a medical examination building and the other to a flying school hangar, with the medical branch marked in a different colour"
        promptId="107"
      />

      <h2 id="before-deposit" className={H2}>Should you take the Class 1 medical before paying a flying school?</h2>
      <p>
        Yes, as a matter of order, though not as a rule DGCA imposes on schools. The medical CAR&rsquo;s
        own advice is to book the Class 1 initial before committing money to a flying school, because
        the licence you are training towards needs a Class 1 and a student pilot licence only needs a
        Class 2. Your school&rsquo;s admission rules may ask for something different, so confirm them
        with the school.
      </p>
      <p>
        The legal duty comes from{' '}
        <Ext href={rule39b.url}>rule 39B of the Aircraft Rules, 1937</Ext>: no licence or rating is
        issued unless the applicant is examined by an approved medical authority and meets the
        standards notified by the Director-General. The standards themselves sit in{' '}
        <Ext href={car.url}>DGCA&rsquo;s medical CAR</Ext>. Our{' '}
        <Link href="/dgca-class-2-class-1-medical" className={LINK}>Class 1 and Class 2 medical guide</Link>{' '}
        covers those standards in full; this post is only about sequence.
      </p>

      <h2 id="where" className={H2}>Where can the first Class 1 medical be done?</h2>
      <p>
        Only at a short list of centres. DGCA restricts the initial Class 1 to AFCME in New Delhi,
        IAM in Bengaluru, MEC (East) in Jorhat, or a DGCA-empanelled aeromedical evaluation centre. An
        ordinary empanelled examiner, however close to home, cannot issue it.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Where DGCA allows an initial Class 1 medical</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Centre</th>
              <th scope="col" className={TH}>Location</th>
              <th scope="col" className={TH}>Type</th>
            </tr>
          </thead>
          <tbody>
            {MED.centres.boardingCentres.map((c, i) => (
              <tr key={c.name} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{c.name}</td>
                <td className={TD}>{c.city}</td>
                <td className={TD}>Indian Air Force boarding centre</td>
              </tr>
            ))}
            {delhiNcrCivil.map((c, i) => (
              <tr key={c.name + c.city} className={(i + MED.centres.boardingCentres.length) % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{c.name}</td>
                <td className={TD}>{c.city}</td>
                <td className={TD}>DGCA aeromedical evaluation centre ({lc(c.note)})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {MED.centres.dgcaCounts.class1Exam} The table shows the boarding centres and the Delhi NCR
        evaluation centres from the{' '}
        <Ext href={centreList.url}>DGCA centre list</Ext> as it stood on {MED.centres.dgcaCounts.asOf};
        the list moves, so check the current version before you travel. {MED.centres.listNote}
      </p>
      <p>
        One local point for Dwarka families: DGCA&rsquo;s Class 1 examiner list carries{' '}
        {MED.centres.dwarka.class1Examiners} examiners with Dwarka addresses. They are empanelled for
        the periodic renewals that come later, not for the initial issue, which is why this post sends
        you to the table above first.
      </p>
      <BlogImagePlaceholder
        src="/blog/class-1-medical-before-flying-school/four-kinds-of-initial-centre.webp"
        width={1200}
        height={675}
        alt="Four identical plain buildings in a row on a map-like background, connected by a single route line, with one building drawn in a different colour"
        promptId="108"
      />

      <h2 id="class-2-first" className={H2}>Do you need a Class 2 medical first?</h2>
      <p>
        No. {MED.classOrder.notMandatory} The Class 1 initial can be sat directly, which makes it the
        cleaner first step for anyone whose goal is a commercial licence.
      </p>
      <p>
        If you do take a Class 2 first, for example to start student pilot flying early,{' '}
        {lc(MED.classOrder.ifYouDoClass2First)} {MED.classOrder.investigationsRepeat}
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Class 1 and Class 2 medical compared</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Question</th>
              <th scope="col" className={TH}>Class 1</th>
              <th scope="col" className={TH}>Class 2</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>Licences it supports</td>
              <td className={TD}>{class1.licences.slice(0, 2).join('; ')}</td>
              <td className={TD}>{class2.licences.slice(0, 3).join('; ')}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className={TD_HEAD}>Validity</td>
              <td className={TD}>{class1.validity}</td>
              <td className={TD}>{class2.validity}</td>
            </tr>
            <tr className="bg-white">
              <td className={TD_HEAD}>DGCA fee, initial issue, Air Force centres</td>
              <td className={TD}>{feeClass1.label}</td>
              <td className={TD}>{feeClass2.label}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="cost" className={H2}>What does the medical cost?</h2>
      <p>
        DGCA&rsquo;s statutory fee for an initial Class 1 at the Indian Air Force centres is{' '}
        {feeClass1.label}, paid on <Ext href={MED.fees.portal}>Bharatkosh</Ext> before the
        examination. That is the government&rsquo;s charge, not an academy charge, and it is not the
        whole bill.
      </p>
      <p>
        {MED.fees.investigationCharges} {MED.fees.privateExaminers} We do not publish a total because
        no source on file gives one, and the figure varies by centre and by the tests requested.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Sequence your first steps"
        title="Plan the medical, exams and school in order"
        text="Our counsellors can lay out which step comes first for your situation. We do not conduct or arrange medicals, and we cannot say whether you will clear one."
        href="/pilot-career-counselling"
        label="Book free counselling"
      />

      <h2 id="checked" className={H2}>What does the examination check?</h2>
      <p>
        The Class 1 examination covers {listJoin(MED.examination.groups.map(lc))}. The CAR sets out
        what is assessed but publishes no pass rate, and no honest page can tell you in advance whether
        you will clear it.
      </p>
      <ul className={UL}>
        <li>{MED.examination.standardsFrom}</li>
        <li>{MED.examination.noNumbersInCar}</li>
        <li>{MED.examination.freeFromQualifier}</li>
      </ul>
      <p>
        You also declare your history to the examiner. {MED.process.falseDeclaration} Answer the
        declaration fully, including {lc(MED.process.declaration[1])}.
      </p>

      <h2 id="booking" className={H2}>How do you book it?</h2>
      <p>
        {MED.process.booking} You then bring ID for the laboratory reports: {lc(MED.process.idCheck)}
      </p>
      <p>
        The eGCA portal is also where the medical assessment later feeds into your licence application,
        one of the six items in our{' '}
        <Link href="/blogs/cpl-application-egca-prerequisites-checklist" className={LINK}>
          eGCA CPL prerequisites checklist
        </Link>
        . The same pre-admission thinking applies to documents, covered in our{' '}
        <Link href="/blogs/flight-school-prerequisites-admission-guide" className={LINK}>
          flight school admission guide
        </Link>
        . If your route starts after Class 12, see{' '}
        <Link href="/blogs/aviation-course-after-12th" className={LINK}>aviation courses after 12th</Link>.{' '}
        <Ext href={EGCA.url}>eGCA</Ext> is the portal to open.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <BlogImagePlaceholder
        src="/blog/class-1-medical-before-flying-school/medical-then-school.webp"
        width={1200}
        height={675}
        alt="Two stepping stones across a stream, the first stone a plain clinic building and the second a small training aircraft, with a student's foot on the first"
        promptId="109"
      />

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Open the DGCA centre list, pick the initial-issue centre nearest to you, and book the Class 1
        on eGCA before you pay any school a deposit. Keep a note of the date, since the medical is
        valid for a limited period once issued. Our{' '}
        <Link href="/student-checklists" className={LINK}>student checklists</Link> and{' '}
        <Link href="/courses/cpl" className={LINK}>CPL course page</Link> show where ground training
        fits once the medical is behind you.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
