import Layout from '../../components/Layout';
import StructuredData from '../../components/StructuredData';
import ScrollReveal from '../../components/ScrollReveal';
import Breadcrumb from '../../components/Breadcrumb';
import QuickAnswer from '../../components/QuickAnswer';
import SummaryBox from '../../components/SummaryBox';
import PeopleAlsoAsk from '../../components/PeopleAlsoAsk';
import ArticleTOC from '../../components/ArticleTOC';
import Link from 'next/link';
import { generateCourseSchema } from '../../lib/schema';
import { DGCA_PAPERS, RTR, MEDICAL, EDUCATION, MIN_AGE, CPL_HOURS, papersSummary } from '../../lib/facts';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: 'TCCA', label: 'Regulator', icon: '🏅' },
    { num: '200 Hrs', label: 'Canadian CPL Minimum', icon: '✈️' },
    { num: '18-24 Mo', label: 'Typical CPL Timeline', icon: '📅' },
    { num: 'DGCA', label: 'Conversion Route Home', icon: '🇮🇳' },
];

const comparison = [
    { sr: 1, topic: 'Regulator', details: 'Transport Canada Civil Aviation (TCCA), under the Canadian Aviation Regulations' },
    { sr: 2, topic: 'Licence Earned', details: 'Canadian Commercial Pilot Licence — Aeroplane' },
    { sr: 3, topic: 'Flying Hours', details: '200 hours total flight time, the Canadian CPL minimum' },
    { sr: 4, topic: 'Written Exams', details: 'CPAER for the CPL; PSTAR and PPAER earlier in the licence ladder' },
    { sr: 5, topic: 'Radio Licence', details: 'Restricted Operator Certificate with Aeronautical Qualification (ROC-A)' },
    { sr: 6, topic: 'Medical', details: 'Transport Canada Category 1 medical certificate, issued by a Civil Aviation Medical Examiner' },
    { sr: 7, topic: 'Immigration', details: 'Study permit for programmes longer than six months; the school must be a Designated Learning Institution' },
    { sr: 8, topic: 'Return to India', details: `DGCA conversion — ${papersSummary()}, plus ${RTR.name} and a ${MEDICAL.short}` },
];

const whyCanada = [
    {
        icon: '🧊',
        title: 'Four-Season Flying',
        desc: 'Canadian students fly through genuine winter operations — icing conditions, contaminated runways, short daylight. Instructors treat cold-weather decision-making as part of the syllabus rather than an inconvenience, and that experience transfers directly to northern Indian winters and monsoon diversions.',
    },
    {
        icon: '🗺️',
        title: 'Long Cross-Country Legs',
        desc: 'Distances between Canadian aerodromes make the cross-country requirement a real navigation exercise instead of a box-ticking flight. Students build genuine fuel planning, alternate selection, and radio discipline over sparsely populated terrain.',
    },
    {
        icon: '📋',
        title: 'Documented Training Records',
        desc: 'Transport Canada requires flight training units to keep detailed records of every training flight and ground lesson. That paperwork is what a DGCA conversion assessment asks to see, so a Canadian logbook tends to survive scrutiny well.',
    },
    {
        icon: '🎓',
        title: 'Study Permit Pathway',
        desc: 'Flight training programmes longer than six months normally require a study permit, and the school must hold Designated Learning Institution status. Confirm the school appears on the current list before paying any deposit — enrolment at a non-DLI school will not support a permit application.',
    },
    {
        icon: '🗣️',
        title: 'English-Medium Operations',
        desc: 'Air traffic control across most of Canada operates in English, so Indian students train in the same language they will use on Indian frequencies. Bilingual operations exist in parts of Quebec, which is worth checking against your chosen school.',
    },
    {
        icon: '🔁',
        title: 'A Licence Built for Conversion',
        desc: 'A Canadian CPL with a multi-engine and instrument rating covers the ground DGCA expects to see on conversion. The examinations, radio licence, and medical still have to be completed in India, so plan the return leg before you leave.',
    },
];

const licencePath = [
    { step: 1, title: 'Confirm Medical Fitness First', desc: 'Book a Transport Canada Category 1 assessment with a Civil Aviation Medical Examiner, and an Indian medical review in parallel. Discovering a disqualifying condition after paying a deposit is an expensive way to learn it.' },
    { step: 2, title: 'Choose a Designated Learning Institution', desc: 'Check the school against the current Designated Learning Institution list and confirm its flight training unit approval. Both matter — one supports your permit, the other supports your licence.' },
    { step: 3, title: 'Apply for the Study Permit', desc: 'Assemble academic records, proof of funds, and the letter of acceptance. Processing times vary by season, so start earlier than the school suggests.' },
    { step: 4, title: 'Complete Ground School and Written Exams', desc: 'Work through the Canadian written examinations alongside flying. Students who leave written work until the end usually stall, because weather-driven gaps in flying are the only study time they get.' },
    { step: 5, title: 'Build the 200 Hours', desc: `The Canadian CPL minimum is 200 hours of total flight time. Weather, aircraft availability, and instructor scheduling set the real pace, not the brochure.` },
    { step: 6, title: 'Pass the Flight Test', desc: 'The CPL flight test is conducted by a Transport Canada inspector or an approved pilot examiner against a published test standard. Ask your school which standard version they train to.' },
    { step: 7, title: 'Convert in India', desc: `Back in India the licence is converted, not simply recognised. That means the ${DGCA_PAPERS.length} DGCA written papers, ${RTR.name}, a ${MEDICAL.short}, and document verification.` },
];

const conversionPapers = DGCA_PAPERS.map((paper, i) => ({ num: i + 1, title: paper }));

const tocHeadings = [
    { id: 'is-canada-right', title: 'Is Canada right for your training?' },
    { id: 'requirements', title: 'What are the requirements?' },
    { id: 'why-canada', title: 'Why students choose Canada' },
    { id: 'step-by-step', title: 'Step-by-step licence path' },
    { id: 'conversion', title: 'Converting to a DGCA licence' },
    { id: 'costs', title: 'What drives the cost' },
];

const peopleAlsoAsk = [
    {
        q: 'How many flying hours does a Canadian CPL require?',
        a: 'Two hundred hours of total flight time is the Canadian commercial pilot licence minimum. The Indian CPL minimum is also 200 hours, so the headline number matches — but the way those hours are broken down between pilot-in-command, cross-country, instrument, and night flying differs between the two regulators, and DGCA assesses your logbook against its own breakdown at conversion.',
    },
    {
        q: 'Do I need a study permit to train in Canada?',
        a: 'Programmes longer than six months normally require one, and the flight school must hold Designated Learning Institution status for the application to succeed. Short courses under six months may proceed differently. Confirm both the school status and the current permit rules before paying any deposit.',
    },
    {
        q: 'Which medical certificate does Canadian commercial training need?',
        a: 'Transport Canada issues a Category 1 medical certificate for commercial pilots, assessed by a Civil Aviation Medical Examiner. That certificate does not replace the Indian requirement — a DGCA medical certificate is a separate assessment you complete on return.',
    },
    {
        q: 'What is the minimum age to start pilot training in Canada?',
        a: `Canadian rules set 17 for the private licence and 18 for the commercial licence. Indian rules are the same at those two rungs — ${MIN_AGE.PPL} for a PPL and ${MIN_AGE.CPL} for a CPL — so students who begin ground study at 16 or 17 usually reach the age gate at about the point their flying hours mature.`,
    },
    {
        q: 'Can I keep flying in Canada after training?',
        a: 'Post-graduation work options depend on immigration rules that change independently of aviation regulation, and on whether your programme qualifies. Treat any advice on this as time-sensitive and check the current position with an immigration professional rather than a flight school brochure.',
    },
];

const courseSchema = generateCourseSchema({
    name: 'Pilot Training in Canada — Guidance and DGCA Conversion Support',
    description:
        'Guidance for Indian students pursuing commercial pilot training in Canada under Transport Canada regulation, including study permit requirements, the 200-hour Canadian CPL minimum, and the DGCA conversion route on return to India.',
    url: 'https://weoneaviation.in/flying-school/canada',
    courseMode: 'blended',
    duration: 'P18M',
});

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FlyingSchoolCanada() {
    return (
        <Layout
            title="Pilot Training in Canada for Indian Students | DGCA Conversion Guide"
            description="How Indian students train for a commercial pilot licence in Canada: Transport Canada requirements, the 200-hour CPL minimum, study permit rules, and what DGCA conversion involves on return."
        >
            <StructuredData data={courseSchema} />

            <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Flying School Destinations</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight mt-6">
                        Pilot Training in Canada
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        Canada trains commercial pilots under Transport Canada regulation, across four real seasons and long cross-country legs. This page covers what the licence takes, what the study permit requires, and what still has to happen in India before you can fly for an Indian operator.
                    </p>
                    <div className="inline-block bg-av-orange/20 border border-av-orange/40 rounded-2xl px-8 py-4">
                        <p className="text-white/70 text-sm mb-1">Canadian CPL Minimum</p>
                        <p className="font-montserrat text-2xl md:text-3xl font-black text-av-orange">200 Hours Total Flight Time</p>
                    </div>
                </ScrollReveal>
            </header>

            <div className="bg-av-blue py-8">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s) => (
                        <ScrollReveal key={s.label} className="text-center">
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-lg font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumb />

                    <QuickAnswer
                        question="Is Canada a good place for an Indian student to earn a commercial pilot licence?"
                        answer="Canada suits students who want genuine four-season flying and long navigation legs, regulated by Transport Canada. The Canadian CPL takes 200 hours of total flight time, a Category 1 medical certificate, written examinations, and a flight test. A study permit is normally required for programmes over six months, and the school must be a Designated Learning Institution. The licence converts to a DGCA licence on return, but conversion is not automatic."
                    />

                    <SummaryBox
                        title="What this page settles"
                        items={[
                            'Transport Canada Civil Aviation regulates flight training under the Canadian Aviation Regulations.',
                            'The Canadian commercial pilot licence requires 200 hours of total flight time.',
                            'A Transport Canada Category 1 medical certificate is assessed by a Civil Aviation Medical Examiner.',
                            'Programmes over six months normally need a study permit, and the school must hold Designated Learning Institution status.',
                            `Returning to India means DGCA conversion: ${papersSummary()}, ${RTR.name}, and a ${MEDICAL.short}.`,
                            'Book both medicals before committing money to any school.',
                        ]}
                    />

                    <ArticleTOC headings={tocHeadings} />
                </div>
            </section>

            <section id="is-canada-right" className="py-16 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Is Canada Right for <span className="text-av-orange">Your Training?</span>
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Canada rewards students who want demanding conditions and penalises those who assumed a fixed timeline. Winter weather cancels flights. Aircraft go unserviceable. A student who budgeted for exactly 200 hours and exactly 18 months usually finishes late and over budget. Plan for slippage and the country works well.
                        </p>
                    </ScrollReveal>

                    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-left text-sm">
                            <caption className="sr-only">Pilot training in Canada at a glance</caption>
                            <thead className="bg-av-blue text-white">
                                <tr>
                                    <th scope="col" className="px-4 py-3 font-montserrat font-bold">#</th>
                                    <th scope="col" className="px-4 py-3 font-montserrat font-bold">Topic</th>
                                    <th scope="col" className="px-4 py-3 font-montserrat font-bold">Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row) => (
                                    <tr key={row.sr} className="border-t border-gray-100">
                                        <td className="px-4 py-3 text-gray-500">{row.sr}</td>
                                        <td className="px-4 py-3 font-semibold text-av-blue">{row.topic}</td>
                                        <td className="px-4 py-3 text-gray-600">{row.details}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="requirements" className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What Are the Requirements to <span className="text-av-orange">Train in Canada?</span>
                        </h2>
                        <p className="text-gray-600 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Two sets of requirements apply at once: what Transport Canada asks of any commercial student, and what DGCA will ask of you later. Students who track only the first set arrive home holding a licence they cannot immediately use.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h3 className="font-montserrat font-bold text-av-blue mb-4">In Canada</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><span className="font-semibold text-av-blue">Age —</span> 17 for the private licence, 18 for the commercial licence.</li>
                                <li><span className="font-semibold text-av-blue">Medical —</span> Transport Canada Category 1 certificate from a Civil Aviation Medical Examiner.</li>
                                <li><span className="font-semibold text-av-blue">Flight time —</span> 200 hours total for the commercial licence.</li>
                                <li><span className="font-semibold text-av-blue">Written exams —</span> CPAER for the commercial licence.</li>
                                <li><span className="font-semibold text-av-blue">Radio —</span> Restricted Operator Certificate with Aeronautical Qualification.</li>
                                <li><span className="font-semibold text-av-blue">Immigration —</span> study permit for programmes over six months, at a Designated Learning Institution.</li>
                            </ul>
                        </article>

                        <article className="rounded-2xl border border-av-orange/30 bg-orange-50/50 p-6 shadow-sm">
                            <h3 className="font-montserrat font-bold text-av-blue mb-4">Waiting for You in India</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li><span className="font-semibold text-av-blue">Age —</span> {MIN_AGE.CPL} years for a CPL under Indian rules.</li>
                                <li><span className="font-semibold text-av-blue">Education —</span> {EDUCATION.requirement}.</li>
                                <li><span className="font-semibold text-av-blue">Medical —</span> {MEDICAL.long}, assessed separately from the Canadian certificate.</li>
                                <li><span className="font-semibold text-av-blue">Written papers —</span> {papersSummary()}.</li>
                                <li><span className="font-semibold text-av-blue">Radio —</span> {RTR.name}, examined separately from the written papers.</li>
                                <li><span className="font-semibold text-av-blue">Flight time —</span> {CPL_HOURS.total} hours total, assessed against the Indian breakdown.</li>
                            </ul>
                        </article>
                    </div>

                    <p className="text-gray-500 text-xs mt-6 max-w-3xl mx-auto text-center leading-relaxed">
                        {MEDICAL.advice}
                    </p>
                </div>
            </section>

            <section id="why-canada" className="py-16 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why Do Students Choose <span className="text-av-orange">Canada?</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyCanada.map((item) => (
                            <article key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm h-full">
                                <div className="text-3xl mb-3">{item.icon}</div>
                                <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="step-by-step" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            How Does the Licence Path <span className="text-av-orange">Actually Run?</span>
                        </h2>
                        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                            Seven stages, in the order they bite. Students who reorder them — flying first, medical later — are the ones who lose money.
                        </p>
                    </ScrollReveal>

                    <ol className="space-y-4">
                        {licencePath.map((item) => (
                            <li key={item.step} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-av-blue text-white font-bold text-sm flex items-center justify-center">
                                    {item.step}
                                </span>
                                <div>
                                    <h3 className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section id="conversion" className="py-16 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            What Does DGCA <span className="text-av-orange">Conversion Involve?</span>
                        </h2>
                        <p className="text-white/70 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            A Canadian licence is converted in India, not recognised. The written papers below are examined by DGCA regardless of where you flew, and {RTR.name} sits outside them as a separate examination.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {conversionPapers.map((paper) => (
                            <article key={paper.title} className="glass rounded-2xl p-5">
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-av-orange text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                                        {paper.num}
                                    </span>
                                    <h3 className="font-montserrat font-bold text-white text-sm">{paper.title}</h3>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="rounded-2xl bg-white/10 border border-white/20 p-6">
                        <p className="text-white/80 text-sm leading-relaxed">
                            <span className="font-semibold text-av-orange">{RTR.name}:</span> {RTR.note} It is examined under the {RTR.instrument}, and students returning from abroad routinely underestimate it because no equivalent sat in their overseas syllabus.
                        </p>
                    </div>
                </div>
            </section>

            <section id="costs" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What Drives the <span className="text-av-orange">Cost and Timeline?</span>
                        </h2>
                    </ScrollReveal>

                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            Flight training is priced by the hour, so anything that adds hours adds cost. Five variables move the number more than the advertised package rate does:
                        </p>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><span className="font-semibold text-av-blue">Weather cancellations —</span> winter and shoulder seasons cost flying days. Schools in different provinces lose different amounts.</li>
                            <li><span className="font-semibold text-av-blue">Aircraft availability —</span> a fleet grounded for maintenance stretches a timeline no matter how ready the student is.</li>
                            <li><span className="font-semibold text-av-blue">Extra hours —</span> few students finish on the bare minimum. Budget above 200 hours rather than at it.</li>
                            <li><span className="font-semibold text-av-blue">Examination re-attempts —</span> each retake costs a fee and, more expensively, calendar time.</li>
                            <li><span className="font-semibold text-av-blue">Living costs and permit fees —</span> accommodation, insurance, and immigration costs sit outside the school invoice entirely.</li>
                        </ul>
                        <p className="text-gray-500 text-xs mt-5 leading-relaxed">
                            Ask any school for its historical average hours to licence, not its minimum. The gap between those two numbers is the honest cost of training there.
                        </p>
                    </div>

                    <PeopleAlsoAsk items={peopleAlsoAsk} />
                </div>
            </section>

            <section className="py-16 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-3xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Compare Before You Commit</div>
                        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4 mt-4">
                            Not Sure Whether Canada Beats <span className="text-av-orange">Training in India?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-6 leading-relaxed">
                            Our counsellors work through the comparison with you — total hours, conversion effort, timeline risk, and what each route leaves you holding when you apply for your first job. Compare against{' '}
                            <Link href="/flying-school/australia" className="text-av-orange underline">Australia</Link>,{' '}
                            <Link href="/flying-school/south-africa" className="text-av-orange underline">South Africa</Link>, or{' '}
                            <Link href="/flying-school/india" className="text-av-orange underline">training in India</Link>.
                        </p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Talk to a Counsellor →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>
        </Layout>
    );
}
