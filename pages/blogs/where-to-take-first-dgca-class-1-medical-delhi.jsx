import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import BlogCta from '../../components/BlogCta';
import Ext from '../../components/Ext';
import { MEDICAL_STANDARDS as MED, MEDICAL, ACADEMY, inr } from '../../lib/facts';
import { H2, TABLE, TABLE_WRAP, TH, TD, TD_HEAD, LINK, UL, SCOPE, lc, articleSchemaFor, faqSchemaFrom } from '../../lib/blogKit';

/*
 * Distinct from /dgca-class-2-class-1-medical (the pillar: both classes, validity, fees, the appeal route) and
 * from flight-school-prerequisites-admission-guide (what a school asks for). This post owns one local question
 * a Delhi NCR student asks before paying a school: which centres may do the FIRST Class 1, and which of them
 * are in or near Delhi. Pre-CPL audience, so no appeal or renewal detail beyond what separates them from initial.
 * Every rule comes from MEDICAL_STANDARDS in lib/facts.js (CAR Series 'C' Part I Rev. 7, DGCA centre list as of
 * the date in MED.centresAsOf). Third-party copies of the centre list disagree with each other and with DGCA's
 * list, so none is used. Doctor names, addresses and phone numbers are deliberately left out.
 * FAQPage schema is built from peopleAlsoAsk (data/pageFaqs.js is off limits to the routine).
 */
const SLUG = 'where-to-take-first-dgca-class-1-medical-delhi';
const DATE_PUBLISHED = '2026-10-26';
const DATE_MODIFIED = '2026-10-26';

const car = MED.sources.find((s) => s.label.startsWith("CAR Section 7, Series 'C', Part I,"));
const centreList = MED.sources.find((s) => s.label.startsWith('List of DGCA approved aeromedical'));
const rule39b = MED.sources[0];

const delhiNcr = MED.centres.civil.filter((c) => /Delhi|Gurugram/.test(c.city));
const class1Fee = MED.fees.rows.find((r) => r.cls === 'Class 1' && r.purpose.startsWith('Initial'));
const afcme = MED.centres.boardingCentres[0];

const peopleAlsoAsk = [
  {
    q: 'Where can I take my first DGCA Class 1 medical in Delhi?',
    a: `${MED.centres.initialIssueOnly.note} In Delhi that means ${afcme.name}, or one of the DGCA-approved civil aeromedical evaluation centres: ${delhiNcr.map((c) => `${c.name}, ${c.city}`).join('; ')}. The list is DGCA's, as it stood on ${MED.centresAsOf}.`,
  },
  {
    q: 'Can a Class 1 examiner near me do my initial Class 1 medical?',
    a: `Not for the initial issue. The CAR restricts the initial Class 1 to AFCME, IAM, MEC (East) and DGCA-empanelled aeromedical evaluation centres. ${MED.centres.initialIssueOnly.routine}`,
  },
  {
    q: 'How do I book the Class 1 medical?',
    a: `${MED.process.booking} The examination form is then completed on paper or online, and the investigation reports must carry an ID-verified endorsement.`,
  },
  {
    q: 'Do I need a Class 2 medical before the Class 1?',
    a: `No. ${MED.classOrder.notMandatory} ${MED.classOrder.ifYouDoClass2First}`,
  },
  {
    q: 'What does the Class 1 medical cost at an Air Force centre?',
    a: `DGCA's statutory fee for an initial Class 1 is ${class1Fee.label}, payable on Bharatkosh before the examination at the Indian Air Force centres. ${MED.fees.investigationCharges} Civil centres set their own charges, which DGCA does not publish.`,
  },
  {
    q: 'Should I take the medical before I pay a flying school?',
    a: `Yes. ${MEDICAL.advice} ${MED.classOrder.advice}`,
  },
];

const faqSchema = faqSchemaFrom(peopleAlsoAsk);

const articleSchema = articleSchemaFor({
  slug: SLUG,
  headline: 'Where to Take Your First DGCA Class 1 Medical in Delhi NCR',
  description:
    'DGCA restricts the first Class 1 medical to AFCME, IAM, MEC (East) and approved aeromedical centres. The Delhi NCR options, how to book and what to do first.',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  section: 'DGCA medical',
  keywords: 'DGCA Class 1 medical Delhi, Class 1 medical centre Delhi NCR, initial Class 1 medical, AFCME Class 1 medical, aeromedical evaluation centre Delhi',
});

const sources = [
  { label: car.label, url: car.url },
  { label: centreList.label, url: centreList.url },
  { label: rule39b.label, url: rule39b.url },
];

const related = [
  { lead: 'Both medical classes, validity and the appeal route are on', anchor: 'the DGCA Class 1 and Class 2 medical guide', href: '/dgca-class-2-class-1-medical' },
  { lead: 'What schools ask for before admission is in', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'The medical is one of six gates, set out in', anchor: 'the eGCA CPL application checklist', href: '/blogs/cpl-application-egca-prerequisites-checklist' },
  { lead: 'Training options near you are on', anchor: 'the pilot training in Delhi page', href: '/pilot-training-in-delhi' },
];

const tocHeadings = [
  { id: 'who-can-do-it', title: 'Who is allowed to do the first Class 1 medical?' },
  { id: 'delhi-options', title: 'Which centres can you use from Delhi NCR?' },
  { id: 'examiners', title: 'Why can a nearby Class 1 examiner not do it?' },
  { id: 'booking', title: 'How do you book and what happens on the day?' },
  { id: 'cost', title: 'What does the first Class 1 cost?' },
  { id: 'before-school', title: 'Why take it before paying a flying school?' },
  { id: 'this-week', title: 'What to do this week' },
];

const ruleRows = [
  { exam: 'Initial Class 1', where: 'AFCME, IAM, MEC (East) or a DGCA-empanelled aeromedical evaluation centre' },
  { exam: 'Re-initial after the medical has lapsed more than two years', where: 'The same restricted group' },
  { exam: 'Review after a temporary-unfit finding', where: 'The same restricted group' },
  { exam: 'Ordinary renewals', where: 'Any IAF renewal or boarding centre, an aeromedical evaluation centre, or a Class 1 medical examiner' },
];

export default function WhereToTakeFirstDgcaClass1MedicalDelhi() {
  return (
    <BlogPostLayout
      title="Where to Take Your First DGCA Class 1 Medical in Delhi"
      description="DGCA restricts the first Class 1 medical to AFCME, IAM, MEC East and approved aeromedical centres. See the Delhi NCR options, how to book, and what to do first."
      schema={[articleSchema, faqSchema]}
      heading="Where to Take Your First DGCA Class 1 Medical in Delhi NCR"
      category="DGCA medical"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="6 min"
      quickAnswer={{
        question: 'Where can you take the first DGCA Class 1 medical in Delhi?',
        answer: `DGCA allows the initial Class 1 only at AFCME in New Delhi, IAM Bengaluru, MEC (East) Jorhat, or a DGCA-empanelled aeromedical evaluation centre. From Delhi NCR, that means AFCME or a listed civil centre in New Delhi or Gurugram. An ordinary Class 1 examiner near your home cannot issue the first one.`,
      }}
      summaryTitle="The first Class 1 in one view"
      summaryItems={[
        MED.centres.initialIssueOnly.note,
        `DGCA's list of ${MED.centresAsOf} shows ${delhiNcr.length} civil centres in New Delhi and Gurugram that it approves for Class 1 work.`,
        MED.process.booking,
        `The statutory fee for an initial Class 1 is ${class1Fee.label}, paid on Bharatkosh for the Air Force centres.`,
        `Sources: ${MED.car.title} (CAR Series 'C' Part I, Rev. 7) and DGCA's centre list, read on 26 October 2026.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
      sources={sources}
      sourcesCheckedOn="26 October 2026"
    >
      <p>
        A parent in Palam or Janakpuri has found a doctor round the corner who is listed as a DGCA
        Class 1 examiner, and books the student in. A few days later the student learns that the
        certificate cannot be used for a first medical. That is a wasted fee and a lost fortnight
        before the student has even picked a school. This post sets out which centres can do the
        first DGCA Class 1 medical, and which of them a Delhi NCR student can actually reach.
      </p>

      <BlogCta variant="top" />

      <BlogImagePlaceholder
        src="/blog/where-to-take-first-dgca-class-1-medical-delhi/hero-one-door-first-medical.webp"
        width={1200}
        height={630}
        alt="Several ordinary doors along a street, with one larger navy door in the centre drawn in a different colour and a student's hand reaching towards it"
        promptId="107"
      />

      <h2 id="who-can-do-it" className={H2}>Who is allowed to do the first Class 1 medical?</h2>
      <p>
        Only a short list of centres. {MED.centres.initialIssueOnly.note} The restriction is in
        DGCA&rsquo;s{' '}
        <Ext href={car.url}>Civil Aviation Requirement on medical standards</Ext>, which was last
        revised on 1 October 2025, and the duty to be examined by an approved authority comes from{' '}
        <Ext href={rule39b.url}>rule 39B of the Aircraft Rules, 1937</Ext>.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Which Class 1 examinations are restricted and which are open to more centres</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Examination</th>
              <th scope="col" className={TH}>Where DGCA allows it</th>
            </tr>
          </thead>
          <tbody>
            {ruleRows.map((r, i) => (
              <tr key={r.exam} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.exam}</td>
                <td className={TD}>{r.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The practical point for a student is that the first Class 1 is the narrow door. Everything
        after it, the yearly renewals, opens up to far more places.
      </p>

      <h2 id="delhi-options" className={H2}>Which centres can you use from Delhi NCR?</h2>
      <p>
        From Delhi NCR you have {afcme.name}, {afcme.city}, plus the civil aeromedical evaluation
        centres DGCA lists in New Delhi and Gurugram. The other restricted centres are in Bengaluru
        and Jorhat, which matters only if you are travelling for another reason.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">Class 1 medical centres in Delhi NCR from DGCA's published list</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Centre</th>
              <th scope="col" className={TH}>City</th>
              <th scope="col" className={TH}>Type</th>
              <th scope="col" className={TH}>DGCA's note</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className={TD_HEAD}>{afcme.name}</td>
              <td className={TD}>{afcme.city}</td>
              <td className={TD}>Air Force boarding centre</td>
              <td className={TD}>Initial issue permitted</td>
            </tr>
            {delhiNcr.map((c, i) => (
              <tr key={`${c.name}-${c.city}`} className={i % 2 ? 'bg-white' : 'bg-gray-50'}>
                <td className={TD_HEAD}>{c.name}</td>
                <td className={TD}>{c.city}</td>
                <td className={TD}>Civil aeromedical evaluation centre</td>
                <td className={TD}>{c.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        DGCA keeps this list on its own website and it changes: the version above is the one dated{' '}
        {MED.centresAsOf}. {MED.centres.listNote} Copies of it on document-sharing sites and in
        coaching blogs are older and do not agree with each other, so open the{' '}
        <Ext href={centreList.url}>current DGCA list</Ext> before you travel. We do not conduct or
        arrange medicals, and we have no view on which centre to pick.
      </p>

      <BlogImagePlaceholder
        src="/blog/where-to-take-first-dgca-class-1-medical-delhi/delhi-ncr-centre-map.webp"
        width={1200}
        height={675}
        alt="A simple abstract map of the Delhi region with three pins joined to a central pin by thin lines, one pin in burnt orange"
        promptId="108"
      />

      <h2 id="examiners" className={H2}>Why can a nearby Class 1 examiner not do it?</h2>
      <p>
        A DGCA-empanelled Class 1 examiner is allowed to do renewals but not the first issue, because
        the CAR sends the initial examination to the centres in the table above. That is the trap in
        the opening story, and it is easy to fall into because the examiner&rsquo;s empanelment is
        genuine.
      </p>
      <p>
        DGCA&rsquo;s list shows {MED.centres.dwarka.class1Examiners} Class 1 examiners with addresses
        in Dwarka, in sectors {MED.centres.dwarka.sectors.join(', ')}. {MED.centres.dwarka.airport}{' '}
        They are useful once you hold a Class 1 and need a renewal close to home, and{' '}
        {lc(MED.centres.dwarka.note)} {MED.centres.initialIssueOnly.routine}
      </p>
      <p>
        If you want a doctor&rsquo;s view before committing, you can ask a local examiner about
        general fitness, but the certificate that counts for the first Class 1 has to come from one
        of the restricted centres.
      </p>

      <BlogCta
        variant="mid"
        eyebrow="Before the flying, the paperwork"
        title="Plan the medical alongside your ground classes"
        text="We teach the DGCA written subjects from Dwarka. The medical is a separate DGCA process we do not conduct, but we can help you sequence it with your exams. We cannot promise any medical outcome."
      />

      <h2 id="booking" className={H2}>How do you book and what happens on the day?</h2>
      <p>
        You book the appointment on eGCA, and the examination is then recorded on forms or filled
        online. {MED.process.booking} The forms involved are:
      </p>
      <ul className={UL}>
        {MED.process.forms.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <p>
        {MED.process.formsNote} You will be asked to declare:
      </p>
      <ul className={UL}>
        {MED.process.declaration.map((d) => <li key={d}>{d}</li>)}
      </ul>
      <p>
        {MED.process.falseDeclaration} {MED.process.idCheck} The assessment checks three groups,{' '}
        {lc(MED.examination.groups.join(', '))}. {MED.examination.noNumbersInCar} For the standards
        behind each group, our{' '}
        <Link href="/dgca-class-2-class-1-medical" className={LINK}>Class 1 and Class 2 medical guide</Link>{' '}
        goes through what the CAR does and does not state, and the eGCA side of the booking is explained
        on our <Link href="/egca-login" className={LINK}>eGCA login page</Link>.
      </p>

      <h2 id="cost" className={H2}>What does the first Class 1 cost?</h2>
      <p>
        DGCA&rsquo;s statutory fee for an initial Class 1 is {class1Fee.label}. {MED.fees.note}{' '}
        {MED.fees.investigationCharges} Beyond that, no source we can cite publishes what civil
        centres charge, so the total varies by centre and you should ask before booking.
      </p>
      <div className={TABLE_WRAP}>
        <table className={TABLE}>
          <caption className="sr-only">DGCA statutory medical fees by class</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Class</th>
              <th scope="col" className={TH}>Purpose</th>
              <th scope="col" className={TH}>DGCA fee</th>
            </tr>
          </thead>
          <tbody>
            {MED.fees.rows.map((r, i) => (
              <tr key={`${r.cls}-${r.purpose}`} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={TD_HEAD}>{r.cls}</td>
                <td className={TD}>{r.purpose}</td>
                <td className={TD}>{inr(r.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{MED.fees.privateExaminers}</p>

      <h2 id="before-school" className={H2}>Why take it before paying a flying school?</h2>
      <p>
        Because the Class 1 can stop the whole plan, and it is cheaper to find out first. {MEDICAL.advice}{' '}
        {MED.classOrder.advice} A Class 2 is not a prerequisite for the Class 1 initial, so you do not
        need to do one first. If you do, {lc(MED.classOrder.ifYouDoClass2First)}
      </p>
      <p>
        The medical is also one of the six gates for the licence application, covered in our{' '}
        <Link href="/blogs/cpl-application-egca-prerequisites-checklist" className={LINK}>
          eGCA CPL application checklist
        </Link>, and a school will ask for it at admission, as the{' '}
        <Link href="/blogs/flight-school-prerequisites-admission-guide" className={LINK}>
          flight school prerequisites guide
        </Link>{' '}
        explains. The licence this leads to is on our{' '}
        <Link href="/courses/cpl" className={LINK}>CPL course page</Link>.
      </p>
      <p className={SCOPE}>{ACADEMY.scope}</p>

      <BlogImagePlaceholder
        src="/blog/where-to-take-first-dgca-class-1-medical-delhi/medical-before-deposit.webp"
        width={1200}
        height={675}
        alt="A desk seen from above with a folded medical form, a passport-size photograph holder and a closed chequebook placed to the right of them"
        promptId="109"
      />

      <h2 id="this-week" className={H2}>What to do this week</h2>
      <p>
        Open DGCA&rsquo;s centre list, pick a centre from the Delhi NCR table, and book the initial
        Class 1 on eGCA before you pay a flying school anything. While you wait for the date, work on
        the written papers and the computer number, which do not depend on the medical. A fit result
        gives you the first of the licence gates, and a different result is far better learned now
        than after a deposit.
      </p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
