import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import { SYLLABUS, DGCA_PAPERS, EXAM_RULES, ACADEMY } from '../../lib/facts';

/*
 * Distinct from /commercial-pilot-license-syllabus (what each paper covers, with the full book list
 * printed as reference) and from dgca-ground-school-guide (how ground school works). This post owns one
 * question: which books DGCA itself names for the CPL written papers, how the list maps onto the five
 * papers, and what it does not tell you. Every title comes from SYLLABUS.studyMaterial in lib/facts.js;
 * book prices, editions and "which book the questions come from" are NOT in any source, so the post
 * says they vary and gives no figure. FAQPage schema is built from peopleAlsoAsk because
 * data/pageFaqs.js is off limits to the routine.
 */
const DATE_PUBLISHED = '2026-10-08';
const DATE_MODIFIED = '2026-10-08';
const CANONICAL = 'https://weoneaviation.in/blogs/dgca-recommended-books-cpl-exams';

const { studyMaterial } = SYLLABUS;
const cplGroups = studyMaterial.cpl;
const cplTitles = new Set(cplGroups.flatMap((g) => g.books));
const atplTitles = new Set(studyMaterial.atpl.flatMap((g) => g.books));
const pplTitles = new Set(studyMaterial.ppl.flatMap((g) => g.books));
const sharedWithAtpl = [...cplTitles].filter((t) => atplTitles.has(t)).length;
const sharedWithPpl = [...cplTitles].filter((t) => pplTitles.has(t)).length;

const namedBy = (books) => [...new Set(books.map((b) => (b.match(/\(([^)]+)\)$/) || [])[1]).filter(Boolean))];

// The list's headings do not all carry a DGCA paper's name; map only where the names match.
const paperFor = (subject) => DGCA_PAPERS.find((p) => p === subject) || null;
const groupRows = cplGroups.map((g) => ({
  subject: g.subject,
  count: g.books.length,
  by: namedBy(g.books).join('; '),
  paper: paperFor(g.subject),
}));
const unmatchedHeadings = groupRows.filter((r) => !r.paper).map((r) => r.subject);
const papersWithoutHeading = DGCA_PAPERS.filter((p) => !cplGroups.some((g) => g.subject === p));
const totalCpl = cplTitles.size;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Which Books Does DGCA Recommend for the CPL Exams? Reading the Official List',
  description:
    "DGCA publishes its own study-material list for the CPL written exams. What it names under each heading, how it maps to the five papers, and what it does not tell you.",
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  articleSection: 'DGCA exams',
  keywords: 'DGCA books for CPL exam, DGCA recommended study material, CPL exam books India, DGCA reference books, DGCA Pariksha study material',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
};

const peopleAlsoAsk = [
  {
    q: 'Does DGCA publish a list of books for the CPL exams?',
    a: `Yes. DGCA's Pariksha portal carries a "List of Study Material" for the PPL, CPL and ATPL examinations. For the CPL it names ${totalCpl} titles under ${cplGroups.length} subject headings. ${studyMaterial.dgcaNote}`,
  },
  {
    q: 'Do I have to buy every book on the DGCA list?',
    a: `No. DGCA describes the list as reference books covering the prescribed syllabus, not a purchase list. Several titles cover the same subject from different publishers, so most students work from one series per subject and the regulations themselves.`,
  },
  {
    q: 'Is the DGCA book list the same for CPL and ATPL?',
    a: `Largely, but not entirely. ${sharedWithAtpl} of the ${totalCpl} titles on the CPL list also appear on the ATPL list. The headings differ, so check the list for your own licence rather than borrowing another's.`,
  },
  {
    q: 'Which book is used for the Technical Specific paper?',
    a: `No title on the CPL list is under a Technical Specific heading. That paper concerns the particular aircraft you train on, so the aircraft's own manual and your flying school's notes are what apply. Ask your school which documents it uses.`,
  },
  {
    q: 'Do the exam questions come from these books?',
    a: `DGCA's note does not say so. It says candidates should refer to the topics in the prescribed syllabus, as covered in these books. The syllabus in the CAR, not any single textbook, is the reference for what can be asked.`,
  },
  {
    q: 'How much do the books cost?',
    a: `DGCA's list gives no prices and book prices vary by publisher, edition and seller, so no figure is stated here. Ask your ground school what it supplies before you buy anything.`,
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
  { lead: 'How the five papers are booked and passed is in', anchor: 'our DGCA exam guide', href: '/blogs/dgca-exam-guide' },
  { lead: 'How ground school fits around the books is in', anchor: 'the DGCA ground school guide', href: '/blogs/dgca-ground-school-guide' },
  { lead: 'Why one line on the list reads oddly is explained in', anchor: 'the Bharatiya Vayuyan Adhiniyam post', href: '/blogs/bharatiya-vayuyan-adhiniyam-pilot-licensing-india' },
  { lead: 'The topics inside each paper are on', anchor: 'the exam syllabus page', href: '/commercial-pilot-license-syllabus' },
  { lead: 'Classroom preparation is covered in', anchor: 'our DGCA ground classes', href: '/dgca-ground-classes' },
];

const tocHeadings = [
  { id: 'answer', title: 'What does the DGCA study-material list contain?' },
  { id: 'headings', title: 'The CPL list, heading by heading' },
  { id: 'gaps', title: 'Where the list and the five papers do not line up' },
  { id: 'regulations', title: 'The documents named for every licence' },
  { id: 'using', title: 'How to use the list without buying everything' },
  { id: 'unknowns', title: 'What the list does not tell you' },
  { id: 'why-weone', title: 'Help from We One Aviation' },
];

const H2 = 'font-montserrat text-2xl md:text-3xl font-bold text-av-blue mt-12 mb-4 scroll-mt-24';
const TABLE = 'w-full text-left text-sm border-collapse';
const TH = 'px-4 py-3 font-montserrat font-bold bg-av-blue text-white';
const TD = 'px-4 py-3 align-top border-t border-gray-100 text-gray-600';
const LINK = 'text-av-orange font-semibold underline';

export default function DgcaRecommendedBooksCplExams() {
  return (
    <BlogPostLayout
      title="Which Books Does DGCA Recommend for the CPL Exams?"
      description="DGCA publishes its own study-material list for the CPL written exams. What it names under each heading, how it maps to the five papers, and what it leaves out."
      schema={[articleSchema, faqSchema]}
      heading="Which Books Does DGCA Recommend for the CPL Exams? Reading the Official List"
      category="DGCA exams"
      datePublished={DATE_PUBLISHED}
      dateModified={DATE_MODIFIED}
      readingTime="7 min"
      quickAnswer={{
        question: 'Which books does DGCA recommend for the CPL written exams?',
        answer: `DGCA publishes its own study-material list on the Pariksha portal. For the CPL it names reference books under ${cplGroups.length} headings (${cplGroups.map((g) => g.subject).join(', ')}), plus the Aircraft Rules, DGCA CARs, ICAO Annexes and AIP India. It is recommended reading for the syllabus, not a shopping list.`,
      }}
      summaryTitle="The DGCA book list in one view"
      summaryItems={[
        `The CPL list names ${totalCpl} titles under ${cplGroups.length} headings.`,
        `Two mismatches with the five papers: the list has an ${unmatchedHeadings.join(', ')} heading, and no heading for ${papersWithoutHeading.join(', ')}.`,
        'The regulations on the list (Rules, CARs, ICAO Annexes, AIP India) are free primary sources.',
        'Prices and editions are not on the list, so none are stated here.',
        `Source: DGCA Pariksha, List of Study Material, transcribed in our facts file and checked ${SYLLABUS.verifiedOn}.`,
      ]}
      tocHeadings={tocHeadings}
      related={related}
    >
      <BlogImagePlaceholder
        src="/blog/dgca-recommended-books-cpl-exams/hero-book-stack-five-papers.webp"
        width={1200}
        height={630}
        alt="A student at a desk with a stack of plain-covered reference books beside five blank folders, with a small trainer aircraft model on the shelf behind"
        promptId="96"
      />

      <h2 id="answer" className={H2}>What does the DGCA study-material list contain?</h2>
      <p>
        Most students meet the book question in a ground-school brochure or a coaching group, long
        before they see what DGCA itself says. DGCA's Pariksha portal carries a "List of Study
        Material" for the PPL, CPL and ATPL examinations. Its note reads: "{studyMaterial.dgcaNote}"
      </p>
      <p>
        So it is a reading list tied to the syllabus. It does not say which titles to buy, which
        edition to use or which book the questions come from. Read it that way and it becomes
        useful instead of expensive. The papers the list serves are the {DGCA_PAPERS.length} CPL
        written papers: {DGCA_PAPERS.join(', ')}.
      </p>

      <h2 id="headings" className={H2}>The CPL list, heading by heading</h2>
      <p>
        The CPL section holds {totalCpl} distinct titles under {cplGroups.length} headings. Many
        subjects are served by several publishers at once, which is why the totals look large.
        The table shows how the list is built; full titles are on our{' '}
        <Link href="/commercial-pilot-license-syllabus" className={LINK}>exam syllabus page</Link>.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">DGCA study-material list for the CPL, by heading, with the DGCA paper each heading matches</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Heading on the list</th>
              <th scope="col" className={TH}>Titles</th>
              <th scope="col" className={TH}>Authors and publishers named</th>
              <th scope="col" className={TH}>Matching DGCA paper</th>
            </tr>
          </thead>
          <tbody>
            {groupRows.map((r, i) => (
              <tr key={r.subject} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{r.subject}</td>
                <td className={TD}>{r.count}</td>
                <td className={TD}>{r.by}</td>
                <td className={TD}>{r.paper || 'No paper of this name'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        {sharedWithAtpl} of the {totalCpl} CPL titles also appear on DGCA's ATPL list, and{' '}
        {sharedWithPpl} appear on the PPL list. Books you buy for the CPL papers are therefore not
        wasted if you carry on to the ATPL papers later.
      </p>

      <BlogImagePlaceholder
        src="/blog/dgca-recommended-books-cpl-exams/list-headings-to-papers.webp"
        width={1200}
        height={675}
        alt="Five book spines on the left joined by lines to five blank folders on the right, with one line crossing over to a different folder"
        promptId="97"
      />

      <h2 id="gaps" className={H2}>Where the list and the five papers do not line up</h2>
      <p>
        The list is organised by subject area, not by the names of the examination papers, and
        two mismatches catch students out.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li>
          <strong>{unmatchedHeadings.join(', ')} has a heading but no paper of that name.</strong>{' '}
          DGCA's five CPL papers do not include one called Instruments. The list does not say which
          paper draws on those titles, so do not assume. Our{' '}
          <Link href="/commercial-pilot-license-syllabus" className={LINK}>syllabus page</Link>{' '}
          reproduces the published syllabus, and your ground school will know how it teaches it.
        </li>
        <li>
          <strong>{papersWithoutHeading.join(', ')} has a paper but no heading.</strong>{' '}
          That paper is about the particular aircraft you train on, so a general textbook cannot
          cover it. Your flying school's aircraft manual and notes are the material to ask for.
        </li>
      </ul>
      <p>
        Neither is a problem, as long as you know about it before you plan your reading. For how the
        papers themselves work, with {EXAM_RULES.theory.passMark}% required in each subject on its
        own, see{' '}
        <Link href="/blogs/dgca-exam-guide" className={LINK}>our DGCA exam guide</Link>.
      </p>

      <h2 id="regulations" className={H2}>The documents named for every licence</h2>
      <p>
        Separate from the textbooks, DGCA names a set of documents under all three licences. They
        are regulations, not textbooks, and they are the primary sources the Air Regulations
        paper is built on.
      </p>
      <div className="overflow-x-auto my-6 rounded-2xl border border-gray-200">
        <table className={TABLE}>
          <caption className="sr-only">Documents DGCA names across the PPL, CPL and ATPL study lists</caption>
          <thead>
            <tr>
              <th scope="col" className={TH}>Document named on the list</th>
            </tr>
          </thead>
          <tbody>
            {studyMaterial.common.map((d, i) => (
              <tr key={d} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className={`${TD} font-semibold text-av-blue`}>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        One line deserves a caution. The list still names the Aircraft Act 1934. The Bharatiya
        Vayuyan Adhiniyam, 2024 has since replaced that Act, while the Aircraft Rules, 1937 that
        govern licensing stayed in force. Treat the line as a pointer to the rules, and read{' '}
        <Link href="/blogs/bharatiya-vayuyan-adhiniyam-pilot-licensing-india" className={LINK}>
          what the change did and did not alter
        </Link>.
      </p>

      <h2 id="using" className={H2}>How to use the list without buying everything</h2>
      <p>
        These steps are our suggestion, not a DGCA rule. They follow from the way the list is built.
      </p>
      <ul className="list-disc pl-5 space-y-3 text-gray-700">
        <li><strong>Pick one series per subject.</strong> The titles under a heading overlap. Using one publisher's volumes keeps terminology and diagrams consistent.</li>
        <li><strong>Ask what your ground school teaches from.</strong> A school's notes follow its own choice of text, so match it before you buy.</li>
        <li><strong>Read the regulations directly.</strong> CARs and the Rules are published by DGCA, and the Air Regulations paper rests on them.</li>
        <li><strong>Check the edition.</strong> The list gives titles with an author or publisher as printed. Confirm with your school which edition is current.</li>
        <li><strong>Count the papers, not the books.</strong> Each paper is passed on its own, so plan reading paper by paper. Passed papers also expire; the <Link href="/blogs/dgca-exam-pass-validity-cpl-five-years" className={LINK}>five-year rule for CPL papers</Link> explains how.</li>
      </ul>

      <BlogImagePlaceholder
        src="/blog/dgca-recommended-books-cpl-exams/one-series-per-subject.webp"
        width={1200}
        height={675}
        alt="A desk with five neat single-colour book stacks, one per subject, next to a lone open rulebook and a student's hand holding a pencil"
        promptId="98"
      />

      <h2 id="unknowns" className={H2}>What the list does not tell you</h2>
      <p>
        The list is silent on four things students ask about. Prices vary by publisher, edition and
        seller. Editions are not specified. DGCA does not say that exam questions come from any one
        book. And it does not rank the titles. We state no figures for any of these. The list
        itself is on{' '}
        <a href={studyMaterial.source} className={LINK} rel="noopener noreferrer">DGCA's Pariksha portal</a>,
        and DGCA can revise it, so check the portal copy before buying.
      </p>

      <h2 id="why-weone" className={H2}>Help from We One Aviation</h2>
      <p>
        We teach the DGCA ground subjects from Dwarka and can tell you which of the titles above
        our classes follow. See our{' '}
        <Link href="/dgca-ground-classes" className={LINK}>DGCA ground classes</Link> and the{' '}
        <Link href="/commercial-pilot-license-eligibility" className={LINK}>CPL eligibility page</Link>.
      </p>
      <p className="border-l-2 border-gray-300 pl-4 text-base text-gray-600">{ACADEMY.scope}</p>

      <PeopleAlsoAsk items={peopleAlsoAsk} />
    </BlogPostLayout>
  );
}
