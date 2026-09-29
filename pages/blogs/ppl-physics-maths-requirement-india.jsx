import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import {
  LICENCES, MIN_AGE, EDUCATION, PARIKSHA, MEDICAL_STANDARDS as MED, ACADEMY,
} from '../../lib/facts';

/*
 * Distinct from become-pilot-without-physics-and-maths-class-12 (the NIOS
 * bridge route for a student headed to a CPL) and from
 * do-you-need-ppl-before-cpl-in-india (whether a held PPL is a required step
 * before a CPL). Neither post states PARIKSHA.education.ppl — the one line
 * in lib/facts.js that says the 10+2 Physics-and-Mathematics condition is
 * stated for every Pariksha category except PPL, which needs only a Class 10
 * pass. That is the gap this post owns: a standalone question about the PPL
 * category's OWN education requirement, not the CPL route a PPL might sit on.
 *
 * PPL_HOURS is deliberately not invented, same reasoning as the PPL-before-
 * CPL post: Schedule II, Section E sets its own hour figure and this repo has
 * not read and verified that clause, so it is not quoted here.
 *
 * No HowTo, no BreadcrumbList (Layout emits the breadcrumb). FAQPage schema
 * is inlined here rather than via data/pageFaqs.js, which this post is not
 * permitted to edit.
 */
const DATE_PUBLISHED = '2026-09-27';
const DATE_MODIFIED = '2026-09-27';
const CANONICAL = 'https://weoneaviation.in/blogs/ppl-physics-maths-requirement-india';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: "Do You Need Physics and Maths for a PPL in India? What DGCA's Pariksha Rules Say",
  description:
    "DGCA's Pariksha registration rules state the 10+2 Physics-and-Mathematics requirement for every flight crew category except one: PPL. What that means for a standalone Private Pilot Licence, and why it does not remove the requirement if a CPL is the real goal.",
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'Pilot eligibility',
  keywords: 'PPL physics maths requirement India, private pilot licence eligibility India, do you need physics and maths for PPL, DGCA Pariksha PPL education requirement, PPL without physics maths',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const SPL = LICENCES.find((l) => l.code === 'SPL');
const PPL = LICENCES.find((l) => l.code === 'PPL');
const CPL = LICENCES.find((l) => l.code === 'CPL');
const CLASS2 = MED.classes.find((c) => c.cls === 'Class 2');

const peopleAlsoAsk = [
  {
    q: 'Is Physics and Maths in Class 12 compulsory for a Private Pilot Licence in India?',
    a: `Not for the PPL category itself. ${PARIKSHA.education.ppl} The 10+2-with-Physics-and-Mathematics condition is stated for every other flight crew category, not PPL.`,
  },
  {
    q: 'Can a Commerce, Arts or Biology stream student register for a DGCA computer number under the PPL category?',
    a: `Yes, on a Class 10 pass alone, the same as any other candidate applying under the PPL category. ${PARIKSHA.education.documents} ${PARIKSHA.education.legibility}`,
  },
  {
    q: 'If I get a PPL without Physics and Maths, can I upgrade it to a CPL later without those subjects?',
    a: `No. A Commercial Pilot Licence is a separate application under ${CPL.section}, and ${EDUCATION.requirement} applies to it regardless of what licence you already hold. ${EDUCATION.altRoute}`,
  },
  {
    q: 'What is the minimum age for a DGCA computer number versus the PPL licence itself?',
    a: `Two different numbers. A computer number can be allotted from age ${PARIKSHA.basics.minAge}, whatever category is applied for. The ${PPL.name} itself, issued under ${PPL.section}, has its own minimum age of ${PPL.minAge} — the computer number is paperwork ahead of training; the licence age applies when DGCA actually issues it.`,
  },
  {
    q: 'Does a PPL need the same medical certificate as a CPL?',
    a: `No. A Private Pilot Licence ordinarily needs a Class 2 medical, valid for ${CLASS2.validity.toLowerCase()} A Commercial Pilot Licence needs Class 1, a stricter certificate with its own validity bands and restricted initial-issue centres.`,
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
  { lead: 'If a CPL is the real goal and Physics or Maths is missing from your Class 12, the NIOS bridge route is covered in full in', anchor: 'our guide to becoming a pilot without Physics and Maths', href: '/blogs/become-pilot-without-physics-and-maths-class-12' },
  { lead: 'For whether a held PPL is a required step before a CPL at all — a different question from this one — see', anchor: 'our guide to PPL before CPL in India', href: '/blogs/do-you-need-ppl-before-cpl-in-india' },
  { lead: 'For the full admission paperwork and where the computer number sits in it, read', anchor: 'the flight school prerequisites guide', href: '/blogs/flight-school-prerequisites-admission-guide' },
  { lead: 'The six-month syllabus and current batch terms for the subjects a CPL eventually needs are on', anchor: 'the DGCA ground classes page', href: '/dgca-ground-classes' },
  { lead: 'For what a Commercial Pilot Licence itself requires beyond the subject check, see', anchor: 'the CPL course page', href: '/commercial-pilot-license' },
];

const tocHeadings = [
  { id: 'answer', title: 'Does a PPL need Physics and Maths?' },
  { id: 'by-category', title: 'The education rule, by category' },
  { id: 'documents', title: 'What you actually submit' },
  { id: 'age', title: 'Two different ages, easily confused' },
  { id: 'catch', title: 'The catch: a CPL still needs both subjects' },
  { id: 'medical', title: 'The medical is not the same either' },
  { id: 'mistakes', title: 'Mistakes this confusion causes' },
  { id: 'who', title: 'Who this actually matters to' },
  { id: 'why-weone', title: 'Ground classes at We One Aviation' },
];

const categoryRows = [
  { category: 'PPL', education: PARIKSHA.education.ppl },
  { category: 'CPL, ATPL, FDEG, FE, FN, FATA', education: PARIKSHA.education.nonPpl },
];

const ageRows = [
  { gate: 'DGCA computer number (Pariksha)', age: `${PARIKSHA.basics.minAge}, whatever category is applied for`, note: PARIKSHA.basics.maxAgeNote },
  { gate: `${SPL.name}`, age: `${SPL.minAge}`, note: SPL.permits },
  { gate: `${PPL.name}`, age: `${PPL.minAge}`, note: PPL.permits },
  { gate: `${CPL.name}`, age: `${CPL.minAge}`, note: CPL.permits },
];

const mistakes = [
  'Assuming a PPL page that quotes "10+2 with Physics and Maths" is stating a DGCA rule for every licence. It is usually copying the CPL requirement onto a PPL page without checking which category it actually governs.',
  'Giving up on flying entirely because Physics or Maths was missing in Class 12, without checking that a PPL — a real, complete licence for recreational flying — does not carry that condition at all.',
  'Treating a PPL issued without Physics and Maths as a permanent workaround. It is not. The subjects come due the moment a Commercial Pilot Licence application is filed, under a different section of the same Schedule.',
  'Confusing the computer number minimum age with the age at which the licence itself is issued. A 16-year-old can register for a computer number; the PPL itself is not issued until 17, under Section E.',
  'Booking only a Class 2 medical while training toward a CPL and finding out about the stricter Class 1 requirement after hours have already been paid for.',
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';

export default function PplPhysicsMathsRequirementIndia() {
  return (
    <BlogPostLayout
      title="Do You Need Physics and Maths for a PPL in India?"
      description="DGCA's Pariksha registration rules state the Physics-and-Mathematics requirement for every flight crew category except PPL, which needs only a Class 10 pass. What that means, and why it doesn't remove the requirement if a CPL is the real goal."
      schema={[articleSchema, faqSchema]}
      heading="Do You Need Physics and Maths for a PPL in India? What DGCA's Pariksha Rules Say"
      category="Pilot eligibility"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="7 min"
      quickAnswer={{
        question: 'Do you need Physics and Maths for a PPL in India?',
        answer: `No. DGCA's Pariksha registration rules state the 10+2-with-Physics-and-Mathematics condition for every flight crew category except PPL, which needs only a Class 10 pass. A Private Pilot Licence itself, issued under Section E, carries no separate education condition either. The catch: those two subjects are still required the moment you apply for a Commercial Pilot Licence — a PPL only postpones them, it does not remove them.`,
      }}
      summaryTitle="The rule, in one view"
      summaryItems={[
        `${PARIKSHA.education.ppl}`,
        `Every other category: ${PARIKSHA.education.nonPpl.toLowerCase()}`,
        `${PPL.name} itself (${PPL.section}) carries no separate statutory education condition — the Class 10 check happens at Pariksha registration, not at licence issue`,
        `A DGCA computer number can be allotted from age ${PARIKSHA.basics.minAge}; the PPL licence itself is not issued before age ${PPL.minAge}`,
        `Missing Physics or Maths only postpones the requirement — a CPL application still needs ${EDUCATION.requirement.toLowerCase()}, under ${EDUCATION.clause}`,
        `A PPL ordinarily needs a Class 2 medical (valid ${CLASS2.validity.toLowerCase()}), not the stricter Class 1 a CPL needs`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/ppl-physics-maths-requirement/hero-class-ten-small-aircraft.webp"
        width={1200}
        height={630}
        alt="A single small training aircraft beside one plain certificate icon representing a Class 10 pass, with a larger aircraft silhouette in the background sitting behind two stacked closed book icons representing Physics and Mathematics"
        promptId="74"
      />

      <h2 id="answer" className={H2}>Does a PPL need Physics and Maths?</h2>
      <p>
        No, and the source for that is the Central Examination Organisation&rsquo;s own FAQ for
        computer number registration, not an inference. {PARIKSHA.education.ppl} Every other
        flight crew category — CPL, ATPL and the rest — carries the 10+2 Physics-and-Mathematics
        condition. PPL is the one named exception.
      </p>
      <p>
        Go back further, to the licence itself rather than the examination registration, and the
        same pattern holds. {PPL.name} is issued under {PPL.section} of the Aircraft Rules, 1937,
        Schedule II, and that section attaches a minimum age of {PPL.minAge} and a description of
        what the licence permits — {PPL.permits.charAt(0).toLowerCase()}{PPL.permits.slice(1)} It
        does not attach an education condition. The Class 10 check that does exist sits in the
        Pariksha registration process, under {PARIKSHA.authority.qualificationRule}, not in the
        licence provision itself.
      </p>

      <h2 id="by-category" className={H2}>The education rule, by category</h2>
      <p>
        Laid side by side, the distinction is a single row DGCA states plainly and most pilot
        training marketing quietly drops.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA Pariksha education requirement by flight crew category</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Category applied for</th>
              <th scope="col" className={TH}>Education requirement (Pariksha)</th>
            </tr>
          </thead>
          <tbody>
            {categoryRows.map((r, i) => (
              <tr key={r.category} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.category}</td>
                <td className={TD}>{r.education}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Why does the confusion happen at all? Mostly because a PPL is so often the first stretch of
        flying inside a continuous, CPL-bound training programme that pages describing that whole
        programme state the CPL condition once, at the top, and let it read as if it covers
        everything underneath — PPL-level flying included. A standalone PPL, taken on its own
        terms rather than as the first leg of a CPL course, is a different case, and the Pariksha
        FAQ is explicit that its education check is not the same for it.
      </p>

      <BlogImagePlaceholder
        src="/blog/ppl-physics-maths-requirement/two-gates-different-heights.webp"
        width={1200}
        height={800}
        alt="Two simple gate outlines side by side, the left gate low and open with a single small mark representing a Class 10 pass, the right gate taller and crossed by two horizontal bars representing the Physics and Mathematics requirement for every other category"
        promptId="75"
      />

      <h2 id="documents" className={H2}>What you actually submit for a PPL computer number</h2>
      <p>
        Just the Class 10 record, held to the same standard as every other document on the
        Pariksha portal. {PARIKSHA.education.documents} {PARIKSHA.education.legibility} A Class 12
        marksheet is not part of the PPL category&rsquo;s own education check, so there is nothing
        to upload for it at this stage — though most candidates already hold one, since PPL
        training rarely starts before Class 12 is finished in practice.
      </p>
      <p>
        The wider computer number process — name matching, date-of-birth proof, address proof, the
        Board Verification Certificate and the DigiLocker fast-track route — works the same way for
        every category. That full sequence is covered step by step in our{' '}
        <Link href="/dgca-computer-number" className="text-av-orange font-semibold underline">
          DGCA computer number guide
        </Link>.
      </p>

      <h2 id="age" className={H2}>Two different ages, easily confused</h2>
      <p>
        A second source of confusion sits right next to the first: the age at which paperwork can
        start is not the age at which the licence itself is issued.
      </p>

      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Minimum ages for the computer number and each licence stage</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Gate</th>
              <th scope="col" className={TH}>Minimum age</th>
              <th scope="col" className={TH}>What it covers</th>
            </tr>
          </thead>
          <tbody>
            {ageRows.map((r, i) => (
              <tr key={r.gate} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.gate}</td>
                <td className={TD}>{r.age}</td>
                <td className={TD}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        A computer number registered at {PARIKSHA.basics.minAge} under the PPL category is not a
        licence — it is the examination and record-keeping identity a candidate carries through the
        whole process. {PARIKSHA.basics.oneOnly} The PPL itself only follows once training, the
        medical and the age of {PPL.minAge} are all in place.
      </p>

      <h2 id="catch" className={H2}>The catch: a CPL still needs both subjects</h2>
      <p>
        None of the above is a way around Physics and Mathematics if flying professionally, for
        payment, is the actual plan. {EDUCATION.requirement}, under {EDUCATION.clause} — and that
        condition attaches to the CPL application itself, not to whichever licence a candidate held
        first. Registering for a PPL computer number on a Class 10 pass does not carry forward as
        an exemption when the same person later applies for a CPL.
      </p>
      <p>
        What a PPL genuinely buys a Commerce, Arts or Biology stream student is time: real flying,
        a real licence, and a real answer to whether a flying career is worth pursuing, without
        first clearing two additional subjects. If the answer turns out to be yes, {EDUCATION.altRoute}
        {' '}Our{' '}
        <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className="text-av-orange font-semibold underline">
          full guide to the NIOS bridge route
        </Link>{' '}
        covers exactly how that works and what it adds to a timeline.
      </p>

      <BlogImagePlaceholder
        src="/blog/ppl-physics-maths-requirement/path-rejoining-single-gate.webp"
        width={1200}
        height={675}
        alt="A single path forking briefly around a small open gate, then both branches rejoining and continuing toward one larger closed gate marked with two horizontal bars, representing a PPL route that still leads back to the same Physics and Mathematics requirement for a CPL"
        promptId="76"
      />

      <h2 id="medical" className={H2}>The medical is not the same either</h2>
      <p>
        Education is not the only place a standalone PPL is lighter than a CPL. {PPL.name}{' '}
        ordinarily needs only a Class 2 medical certificate, valid {CLASS2.validity.toLowerCase()}
        {' '}A Commercial Pilot Licence needs the stricter Class 1, with its own validity bands and
        its initial issue restricted to a small list of centres. Our{' '}
        <Link href="/dgca-class-2-class-1-medical" className="text-av-orange font-semibold underline">
          full Class 1 and Class 2 medical guide
        </Link>{' '}
        sets out fees, validity and approved centres for both, sourced to the current CAR.
      </p>

      <h2 id="mistakes" className={H2}>Mistakes this confusion causes</h2>
      <p>
        Almost all of them run in one of two directions: assuming PPL is as demanding as CPL, or
        assuming a PPL quietly removes a requirement that has only been deferred.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        {mistakes.map((m) => <li key={m}>{m}</li>)}
      </ul>

      <h2 id="who" className={H2}>Who this actually matters to</h2>
      <p>
        Mainly two groups. First, a Commerce, Arts or Biology stream student who has ruled out
        flying altogether because a website told them Physics and Maths were compulsory, without
        checking which licence that condition actually attaches to — a standalone PPL is open to
        them today, on their existing Class 10 record. Second, a family weighing whether a
        professional flying career is right for their child, who can use a genuine PPL as a lower-
        cost, lower-commitment way to test that interest before the NIOS bridge, the Class 1
        medical and the much larger CPL investment are all committed to.
      </p>
      <p>
        It does not help a third group, sometimes an overlapping one: anyone hoping a PPL is a
        permanent substitute for clearing Physics and Maths. It is not. The subjects are attached to
        the CPL application, and no amount of PPL flying time changes that.
      </p>

      <h2 id="why-weone" className={H2}>Ground classes at We One Aviation</h2>
      <p>
        We have taught the DGCA ground subjects from Dwarka since {ACADEMY.foundedYear}, and this
        is exactly the kind of eligibility question worth checking before ruling yourself out — or
        committing a fee — on the strength of a general statement online. If you are not sure
        whether your own Class 12 record clears {EDUCATION.clause} for a CPL, or whether a
        standalone PPL fits your plan first, that is a five-minute check against the actual
        Pariksha rule, not a guess.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
