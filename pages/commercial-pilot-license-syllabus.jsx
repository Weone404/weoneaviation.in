import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import LeadForm from '../components/LeadForm';
import Link from 'next/link';
import { SYLLABUS as SYL, DGCA_PAPERS, RTR, EXAM_RULES, PARIKSHA, inr, papersSummary, ACADEMY } from '../lib/facts';

/*
 * /commercial-pilot-license-syllabus — rewritten 2026-09-15.
 *
 * WHY THIS URL AND NOT A NEW ONE. The obvious move was a fresh
 * /dgca-exam-syllabus aimed at the syllabus queries. It would also have been
 * the sixth page on this site competing for the same intent. This URL already
 * owns the syllabus slug, carries internal links from ppl-full-form,
 * dgca-full-form, the sitemap page and the breadcrumb map, and has whatever
 * history it has. Strengthening it beats splitting the signal.
 *
 * WHAT THE PREVIOUS VERSION GOT WRONG: it opened with "6 Ground Subjects",
 * contradicting the five papers in DGCA_PAPERS with RTR (A) examined
 * separately, and it described every subject in prose nobody sourced.
 *
 * THE HONEST BOUNDARY, which is the point of the page. DGCA's published
 * syllabus CAR that could be retrieved covers the ATPL (Aeroplanes)
 * examination. The CPL paper LIST is sourced from Schedule II; the CPL
 * topic-by-topic syllabus CAR could not be retrieved from any government
 * server. So this page gives the ATPL syllabus as what it is, gives the CPL
 * paper list as what it is, and says plainly where the published detail stops
 * — while every competing page prints a CPL topic breakdown citing nothing.
 *
 * The differentiator is DGCA's own study material list, which no competitor
 * appears to cite. It is recommended reading, not required reading, and the
 * page must keep saying so.
 */

const CANONICAL = 'https://weoneaviation.in/commercial-pilot-license-syllabus';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function longDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}
const CHECKED_ON = longDate(SYL.verifiedOn);

const contents = [
    ['papers', 'The papers you actually sit'],
    ['atpl-syllabus', 'The DGCA syllabus, paper by paper'],
    ['cpl-detail', 'Why we do not print a CPL topic list'],
    ['books', 'The study material DGCA names'],
    ['passing', 'What counts as a pass'],
    ['booking', 'Booking, fees and 2026 dates'],
    ['faqs', 'Frequently asked questions'],
    ['sources', 'Sources'],
];

const subjectPages = {
    'Air Navigation': '/air-navigation',
    'Aviation Meteorology': '/aviation-meteorology',
    'Air Regulations': '/air-regulations',
    'Technical General': '/technical-general',
};

const faqs = [
    {
        q: 'How many subjects are there in the DGCA CPL exam?',
        a: `Five written papers: ${papersSummary()}. ${RTR.note} Lists of six or nine subjects are counting RTR (A), and sometimes Aviation Medicine and Human Performance, as separate DGCA papers.`,
    },
    {
        q: 'What is the DGCA exam syllabus?',
        a: `DGCA sets it in its Civil Aviation Requirements. The one that could be retrieved from a government server is ${SYL.atpl.car}, the syllabus for the ${SYL.atpl.licence} examination, and its ${SYL.atpl.papers.length} papers with their topic headings are set out on this page. ${SYL.cpl.detailBoundary}`,
    },
    {
        q: 'Which books does DGCA recommend for the exams?',
        a: `DGCA publishes a list of study material for the PPL, CPL and ATPL examinations, naming titles by subject. ${SYL.studyMaterial.dgcaNote} It is recommended reading aligned to the syllabus, not a required or exhaustive list.`,
    },
    {
        q: 'What is the passing mark for the DGCA exams?',
        a: `${EXAM_RULES.theory.statement} ${EXAM_RULES.theory.perSubject} It is set by ${EXAM_RULES.car.citation}, ${EXAM_RULES.theory.clause}.`,
    },
    {
        q: 'How long do my passed papers stay valid?',
        a: `${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl} ${EXAM_RULES.paperValidity.planningNote}`,
    },
    {
        q: 'Do I have to clear all papers in one sitting?',
        a: 'No. Papers are cleared individually across sessions, which is why the validity window above matters more than the order you take them in.',
    },
    {
        q: 'What does a DGCA paper cost?',
        a: `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} per paper in an Online On-Demand Examination, with ${inr(PARIKSHA.fees.oralPerPaper)} for an oral paper on the second and third attempt.`,
    },
    {
        q: 'What do I need before I can book a paper?',
        a: 'A computer number, and nothing medical. The examinations run on the Pariksha portal and need no medical certificate — a point worth knowing, because waiting for a medical before registering costs students a session every year.',
    },
    {
        q: 'Is RTR (A) part of the DGCA written examinations?',
        a: `No. ${RTR.note} It is examined under the ${RTR.instrument}.`,
    },
    {
        q: 'Is the ATPL syllabus the same as the CPL syllabus?',
        a: 'No, and treating them as the same is a common error. The ATPL paper structure includes papers the CPL set does not, such as a separate Radio Aids and Instrumentation paper and a Technical Performance paper for heavier and twin-engine aeroplanes. The ATPL syllabus on this page is labelled as the ATPL syllabus for that reason.',
    },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'DGCA Exam Syllabus, Subjects and the Study Material DGCA Names',
    description: 'The DGCA written papers, the published examination syllabus paper by paper, the study material DGCA itself recommends by subject, pass marks, paper validity, fees and the 2026 session dates.',
    inLanguage: 'en-IN',
    dateModified: SYL.verifiedOn,
    articleSection: 'DGCA examinations',
    keywords: 'dgca exam syllabus, dgca cpl syllabus, dgca exam subjects, dgca study material, dgca recommended books, cpl syllabus india, atpl syllabus',
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: {
        '@type': 'EducationalOrganization',
        name: ACADEMY.name,
        url: ACADEMY.url,
        logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    },
    // Spelled out rather than spread-with-a-ternary: the next person to edit
    // this should not have to reason about operator precedence to add a source.
    citation: [
        ...SYL.sources,
        { label: EXAM_RULES.car.citation, url: EXAM_RULES.car.where },
    ].map((src) => ({ '@type': 'CreativeWork', name: src.label, url: src.url })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

const H2 = 'font-montserrat text-xl font-bold text-av-blue mb-3';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

function BookGroup({ title, groups }) {
    return (
        <div className="mb-6">
            <p className="font-montserrat font-bold text-av-blue text-sm mb-3">{title}</p>
            <div className="space-y-3">
                {groups.map((g) => (
                    <div key={g.subject} className="border border-gray-200 rounded-xl p-4">
                        <p className="font-semibold text-av-orange text-xs mb-2">{g.subject}</p>
                        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                            {g.books.map((b) => (
                                <li key={b} className="text-xs text-gray-600 leading-relaxed">{b}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function CPLSyllabusPage() {
    return (
        <Layout
            title="DGCA Exam Syllabus and Subjects: The Official Sources"
            description="The five DGCA written papers, the published syllabus paper by paper, the study material DGCA itself names, pass marks, paper validity, fees and 2026 dates."
        >
            <StructuredData data={[articleSchema, faqSchema]} />

            <section className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue pt-32 pb-16 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">DGCA Examinations</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        DGCA Exam Syllabus, Subjects and Study Material
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed">
                        {DGCA_PAPERS.length} written papers, the syllabus DGCA publishes, and the books DGCA itself names — with
                        the document behind each one, and an honest note about where the published detail stops.
                    </p>
                </ScrollReveal>
            </section>

            <section className="py-16 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <p className="text-xs text-gray-500 mb-6">
                                Checked against DGCA documents on {CHECKED_ON}. Every figure and topic list is{' '}
                                <a href="#sources" className={A}>sourced below</a>.
                            </p>

                            <div className="border border-gray-200 rounded-xl p-5 mb-10">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-3">On this page</p>
                                <ol className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm list-decimal list-inside">
                                    {contents.map(([id, label]) => (
                                        <li key={id} className="text-gray-600"><a href={`#${id}`} className={A}>{label}</a></li>
                                    ))}
                                </ol>
                            </div>

                            {/* Papers */}
                            <h2 id="papers" className={H2}>The papers you actually sit</h2>
                            <p className={P}>
                                {DGCA_PAPERS.length} written papers for the CPL, set out in the Aircraft Rules, 1937, Schedule II.
                                Not six, and not nine.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3 mb-4">
                                {DGCA_PAPERS.map((paper, i) => (
                                    <div key={paper} className="flex gap-3 items-center border border-gray-200 rounded-xl p-4">
                                        <span className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>
                                        {subjectPages[paper]
                                            ? <Link href={subjectPages[paper]} className={`${A} text-sm`}>{paper}</Link>
                                            : <span className="text-sm font-semibold text-av-blue">{paper}</span>}
                                    </div>
                                ))}
                                <div className="flex gap-3 items-center border-2 border-av-orange rounded-xl p-4">
                                    <span className="w-8 h-8 bg-av-orange rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">+</span>
                                    <Link href="/rtr-a" className={`${A} text-sm`}>{RTR.name} — examined separately</Link>
                                </div>
                            </div>
                            <p className={P}>{RTR.note} {SYL.cpl.rtrNote}</p>

                            {/* ATPL syllabus */}
                            <h2 id="atpl-syllabus" className={H2}>The DGCA syllabus, paper by paper</h2>
                            <p className={P}>
                                This is the syllabus DGCA publishes in {SYL.atpl.car}, for the {SYL.atpl.licence} examination. The
                                headings below are its own. It is labelled as the ATPL syllabus because that is what it is — see the
                                next section before you use it as a CPL revision plan.
                            </p>
                            <div className="space-y-4 mb-10">
                                {SYL.atpl.papers.map((p, i) => (
                                    <div key={p.paper} className="border border-gray-200 rounded-xl p-5">
                                        <p className="font-montserrat font-bold text-av-blue text-sm mb-3">
                                            <span className="text-av-orange">{String(i + 1).padStart(2, '0')}</span> &nbsp;{p.paper}
                                        </p>
                                        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                                            {p.topics.map((t) => (
                                                <li key={t} className="flex gap-2 items-start text-xs text-gray-600 leading-relaxed">
                                                    <span className="text-av-orange flex-shrink-0">–</span>{t}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Boundary */}
                            <h2 id="cpl-detail" className={H2}>Why we do not print a CPL topic list</h2>
                            <div className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-5 mb-4">
                                <p className="text-gray-700 text-sm leading-relaxed">{SYL.cpl.detailBoundary}</p>
                            </div>
                            <p className={P}>
                                Search this subject and you will find a dozen detailed CPL topic breakdowns. None of them names the
                                document it came from. They may well be broadly right — but a revision plan you cannot check against
                                a published syllabus is a revision plan you are trusting on someone&rsquo;s word. What we can tell you
                                with a citation is the paper list, the pass mark, how long a pass lasts and what it costs, and those
                                are the four things that actually shape how you plan.
                            </p>
                            <p className={P}>
                                Our subject pages go deeper on what each paper involves in practice:{' '}
                                <Link href="/air-navigation" className={A}>Air Navigation</Link>,{' '}
                                <Link href="/aviation-meteorology" className={A}>Aviation Meteorology</Link>,{' '}
                                <Link href="/air-regulations" className={A}>Air Regulations</Link> and{' '}
                                <Link href="/technical-general" className={A}>Technical General</Link>.
                            </p>

                            {/* Books */}
                            <h2 id="books" className={H2}>The study material DGCA names</h2>
                            <p className={P}>
                                DGCA publishes its own list of study material for the PPL, CPL and ATPL examinations. This is that
                                list, reproduced by subject. We have no commercial interest in any of these titles and we do not sell
                                them.
                            </p>
                            <div className="border-l-4 border-av-blue bg-av-light rounded-r-xl p-4 mb-6">
                                <p className="text-gray-700 text-sm leading-relaxed">{SYL.studyMaterial.dgcaNote}</p>
                                <p className="text-gray-500 text-xs leading-relaxed mt-2">
                                    In other words: recommended reading aligned to the syllabus, not a required or exhaustive list.
                                </p>
                            </div>
                            <BookGroup title="Commercial Pilot Licence" groups={SYL.studyMaterial.cpl} />
                            <BookGroup title="Airline Transport Pilot Licence" groups={SYL.studyMaterial.atpl} />
                            <BookGroup title="Private Pilot Licence" groups={SYL.studyMaterial.ppl} />
                            <div className="border border-gray-200 rounded-xl p-4 mb-10">
                                <p className="font-semibold text-av-orange text-xs mb-2">Named across all three licences</p>
                                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
                                    {SYL.studyMaterial.common.map((b) => (
                                        <li key={b} className="text-xs text-gray-600 leading-relaxed">{b}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Passing */}
                            <h2 id="passing" className={H2}>What counts as a pass</h2>
                            <div className="grid sm:grid-cols-2 gap-5 mb-4">
                                <div className="bg-av-blue rounded-2xl p-6 text-white">
                                    <p className="text-av-orange font-montserrat font-bold text-xs mb-2">Written papers</p>
                                    <p className="text-5xl font-montserrat font-black mb-3">{EXAM_RULES.theory.passMark}%</p>
                                    <p className="text-white/80 text-sm leading-relaxed">{EXAM_RULES.theory.perSubject}</p>
                                </div>
                                <div className="border border-gray-200 rounded-2xl p-6">
                                    <p className="font-montserrat font-bold text-av-blue text-sm mb-3">How long a pass lasts</p>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-2">{EXAM_RULES.paperValidity.general}</p>
                                    <p className="text-av-orange text-sm font-semibold leading-relaxed mb-2">{EXAM_RULES.paperValidity.cplAtpl}</p>
                                    <p className="text-gray-500 text-xs leading-relaxed">{EXAM_RULES.paperValidity.planningNote}</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-10">
                                {EXAM_RULES.car.citation} — {EXAM_RULES.theory.clause} and {EXAM_RULES.paperValidity.clause}. Oral
                                examination marks and the full rules are on our{' '}
                                <Link href="/dgca-pariksha" className={A}>DGCA Pariksha guide</Link>.
                            </p>

                            {/* Booking */}
                            <h2 id="booking" className={H2}>Booking, fees and 2026 dates</h2>
                            <p className={P}>
                                Papers are booked on the Pariksha portal against a computer number. No medical certificate is needed
                                to sit them — that belongs to the licence, not the examination.
                            </p>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Fee per paper</th>
                                            <th className={TH}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white"><td className="p-3 text-gray-700 font-semibold">Regular session</td><td className="p-3 text-av-orange font-bold">{inr(PARIKSHA.fees.regularPerPaper)}</td></tr>
                                        <tr className="bg-av-light"><td className="p-3 text-gray-700 font-semibold">Online On-Demand (OLODE)</td><td className="p-3 text-av-orange font-bold">{inr(PARIKSHA.fees.olodePerPaper)}</td></tr>
                                        <tr className="bg-white"><td className="p-3 text-gray-700 font-semibold">Oral paper, second and third attempt</td><td className="p-3 text-av-orange font-bold">{inr(PARIKSHA.fees.oralPerPaper)}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xs font-semibold text-av-blue mb-2">Regular sessions in 2026</p>
                            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 mb-3">
                                {PARIKSHA.calendar2026.regular.map((r) => (
                                    <li key={r.session} className="text-sm text-gray-600">{r.session} — {r.dates}</li>
                                ))}
                            </ul>
                            <p className="text-xs text-gray-500 mb-4">{PARIKSHA.calendar2026.tentative}</p>
                            <p className={P}>
                                The whole booking process, the computer number that gates it, and the OLODE dates are on our{' '}
                                <Link href="/dgca-computer-number" className={A}>computer number guide</Link>.
                            </p>

                            {/* FAQs */}
                            <h2 id="faqs" className={H2}>Frequently asked questions</h2>
                            <div className="space-y-3 mb-10">
                                {faqs.map((faq) => (
                                    <details key={faq.q} className="border border-gray-200 rounded-xl p-4">
                                        <summary className="font-semibold text-av-blue text-sm cursor-pointer">{faq.q}</summary>
                                        <p className="text-gray-600 text-sm leading-relaxed mt-2">{faq.a}</p>
                                    </details>
                                ))}
                            </div>

                            {/* Sources */}
                            <h2 id="sources" className={H2}>Sources</h2>
                            <p className={P}>Read on {CHECKED_ON}.</p>
                            <ul className="space-y-2 mb-10">
                                {SYL.sources.map((s) => (
                                    <li key={s.url} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
                                    </li>
                                ))}
                                <li className="flex gap-2 items-start text-sm text-gray-600">
                                    <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                    {EXAM_RULES.car.citation} — pass marks and paper validity
                                </li>
                                <li className="flex gap-2 items-start text-sm text-gray-600">
                                    <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                    Aircraft Rules, 1937, Schedule II — the paper list for each licence
                                </li>
                            </ul>

                            {/* CTA */}
                            <div className="bg-av-blue rounded-2xl p-8">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Teaching these papers is what we do</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    We run the ground classes for the {DGCA_PAPERS.length} written papers, in Dwarka and online, and we
                                    arrange flight training with partner flying schools. We do not conduct the examinations, we have no
                                    access to the question bank, and anyone offering you either is selling you something that does not
                                    exist.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link href="/dgca-ground-classes" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        DGCA ground classes
                                    </Link>
                                    <Link href="/contact" className="inline-block bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        Talk to a counsellor
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal delay={200}>
                            <LeadForm title="Ask About the DGCA Papers" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-3">The numbers that matter</h4>
                                <p className="text-white/90 text-sm font-semibold">{DGCA_PAPERS.length} written papers</p>
                                <p className="text-white/70 text-xs mb-3">plus {RTR.name}, examined separately</p>
                                <p className="text-white/90 text-sm font-semibold">{EXAM_RULES.theory.passMark}% per subject</p>
                                <p className="text-white/70 text-xs mb-3">no aggregate, no carrying a weak paper</p>
                                <p className="text-white/90 text-sm font-semibold">5 years</p>
                                <p className="text-white/70 text-xs">that a pass counts for, towards a CPL or ATPL</p>
                                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Ask a question
                                </a>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Subject pages</h4>
                                <ul className="space-y-2 text-sm">
                                    {Object.entries(subjectPages).map(([label, href]) => (
                                        <li key={href}><Link href={href} className={A}>{label}</Link></li>
                                    ))}
                                    <li><Link href="/rtr-a" className={A}>{RTR.name}</Link></li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={500}>
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Before you can sit a paper</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/dgca-computer-number" className={A}>Get a computer number</Link></li>
                                    <li><Link href="/dgca-pariksha" className={A}>Book on Pariksha</Link></li>
                                    <li><Link href="/dgca-class-2-class-1-medical" className={A}>Medical — for the licence, not the paper</Link></li>
                                    <li><Link href="/egca-login" className={A}>eGCA, for the licence itself</Link></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}
