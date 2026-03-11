import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '17+', label: 'Minimum Age', icon: '🎂' },
    { num: '10+2', label: 'Education', icon: '🎓' },
    { num: '200 hrs', label: 'Flight Hours', icon: '✈️' },
    { num: 'DGCA', label: 'Approved Process', icon: '🏛️' },
];

const eligibilityChecks = [
    {
        icon: '🎂',
        title: 'Age',
        desc: 'Training for the license starts at age 17 but the license is issued at age 18.',
    },
    {
        icon: '📚',
        title: 'Education',
        desc: 'Students need to complete their 10+2 by obtaining Physics and Mathematics from a recognized board.',
    },
    {
        icon: '🩺',
        title: 'Medical Fitness',
        desc: 'Applicants must get their Class 2 followed by Class 1 Medical Certificates from medical examiners recognized by DGCA.',
    },
    {
        icon: '🗣️',
        title: 'English Proficiency',
        desc: 'Must be able to read, write, and understand English.',
    },
];

const schoolCriteria = [
    'Is approved by the DGCA',
    'Has experienced instructors',
    'Offers modern aircraft and simulators',
    'Provides complete ground and flight training',
];

const admissionSteps = [
    {
        step: '01',
        icon: '✅',
        title: 'Check Eligibility Requirements',
        desc: 'Make sure you fulfill all eligibility standards before starting your application — age, education, medical fitness, and English proficiency.',
    },
    {
        step: '02',
        icon: '🏫',
        title: 'Choose a DGCA-Approved Flying School',
        desc: 'Choosing the correct training institution stands as a vital component. Look for a school that is DGCA-approved with experienced instructors and modern aircraft.',
    },
    {
        step: '03',
        icon: '📚',
        title: 'Ground School & DGCA Exams',
        desc: 'Study core subjects and clear DGCA exams in Air Navigation, Meteorology, Air Regulations, Technical General, and Technical Specific.',
    },
    {
        step: '04',
        icon: '✈️',
        title: 'Flight Training & Logging Flying Hours',
        desc: 'Complete 200 flight hours including solo flights, cross-country flights, instrument flights, and night flights. Maintain your logbook.',
    },
    {
        step: '05',
        icon: '🪪',
        title: 'Apply for Commercial Pilot License',
        desc: 'Submit logbook and documents to DGCA, undergo Class 1 medical revalidation, and apply for CPL issuance.',
    },
];

const weOneProcess = [
    {
        icon: '🤝',
        title: 'Initial Counseling',
        desc: 'Understand your goals and assess your eligibility.',
    },
    {
        icon: '📄',
        title: 'Document Verification',
        desc: 'Academic data together with medical records are evaluated.',
    },
    {
        icon: '📝',
        title: 'Application Submission',
        desc: 'Applicants need to finish the CPL admission form by providing all necessary information.',
    },
    {
        icon: '🩺',
        title: 'Medical Support',
        desc: 'Assistance in scheduling Class 2 and Class 1 medical tests.',
    },
    {
        icon: '🎓',
        title: 'Orientation & Enrollment',
        desc: 'After shortlisting candidates they must join an orientation meeting to begin their ground training.',
    },
    {
        icon: '💰',
        title: 'Loan & EMI Assistance',
        desc: 'Our support services provide education loan options and EMI solutions to eligible students.',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CPLAdmissionPage() {
    return (
        <Layout
            title="Commercial Pilot License Admission Process – Step by Step CPL Guide 2025"
            description="Learn the complete Commercial Pilot License (CPL) Admission Process in India. Step-by-step guide covering eligibility, DGCA-approved school selection, ground training, flight hours, and CPL application."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="section-tag">CPL Admission</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Commercial Pilot License Admission Process
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        Dreaming of a career in aviation? The <strong className="text-white">Commercial Pilot License</strong> Admission journey begins with pilots understanding all process requirements. The admission process checks eligibility and aptitude alongside readiness to start professional pilot training.
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        Each phase of Commercial Pilot License qualification and learning to fly alone without an instructor receives strict guidelines from the <strong className="text-white">DGCA (Directorate General of Civil Aviation)</strong> in India. The following guide provides you with details on CPL training application procedures and start-up instructions.
                    </p>
                    <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                        Contact Now →
                    </Link>
                </ScrollReveal>
            </div>

            {/* ── Stats Bar ── */}
            <div className="bg-av-blue py-8">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(s => (
                        <ScrollReveal key={s.label} className="text-center">
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-xl font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── Admission Process Steps ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Step by Step</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            CPL Admission <span className="text-av-orange">Process Overview</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {admissionSteps.map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 text-center h-full flex flex-col items-center">
                                    <div className="w-12 h-12 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-lg mb-3 flex-shrink-0">
                                        {s.step}
                                    </div>
                                    <div className="text-2xl mb-2">{s.icon}</div>
                                    <h4 className="font-montserrat font-bold text-white text-sm mb-2">{s.title}</h4>
                                    <p className="text-white/70 text-xs leading-relaxed">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Step 1: Check Eligibility ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Step 1</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Check Eligibility <span className="text-av-orange">Requirements</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            Make sure you fulfill all <strong>eligibility</strong> standards before starting your application:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {eligibilityChecks.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-blue rounded-2xl p-5 text-center">
                            <p className="text-white/80 text-sm leading-relaxed max-w-2xl mx-auto">
                                The initial requirement stands as the core element of <strong className="text-av-orange">Commercial Pilot License Admission Process</strong> initiation.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Step 2: Choose Flying School ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">Step 2</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            Choose a DGCA-Approved Flying School
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-5">
                            Choosing the correct training institution stands as a vital component throughout the Commercial <strong>Pilot License</strong> Admission Process. Look for a school that:
                        </p>
                        <ul className="space-y-3 mb-5">
                            {schoolCriteria.map(c => (
                                <li key={c} className="flex items-start gap-3 text-sm text-gray-600">
                                    <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                    <span>{c}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            After selection you must fill out the school's enrollment form while providing documents and making your first fee payment.
                        </p>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="bg-av-blue rounded-2xl p-8 text-white">
                            <div className="text-4xl mb-4">🏫</div>
                            <h3 className="font-montserrat font-bold text-white text-xl mb-3">We One Aviation Academy</h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-5">
                                We One Aviation Academy is a DGCA-approved institution with experienced instructors, modern simulators, and comprehensive ground and flight training programs.
                            </p>
                            <Link href="/contact" className="inline-block bg-av-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">
                                Enquire About Admission →
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Step 3 & 4: Ground + Flight ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Step 3 */}
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                                <div className="section-tag mb-3">Step 3</div>
                                <h3 className="font-montserrat font-bold text-av-blue text-2xl mb-4">
                                    Ground School &amp; DGCA Exams
                                </h3>
                                <div className="text-4xl mb-4">📚</div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Students must study core subjects <strong>Air Navigation</strong> together with <strong>Meteorology</strong>, <strong>Air Regulations</strong>, <strong>Technical General</strong> and <strong>Technical Specific</strong> at ground school training.
                                </p>
                                <div className="bg-av-light border border-av-sky/20 rounded-xl p-4">
                                    <p className="text-av-blue text-sm font-semibold">📝 DGCA Exams</p>
                                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">Candidates need to clear exams conducted by DGCA concerning these subjects before their training progression.</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Step 4 */}
                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <div className="section-tag mb-3">Step 4</div>
                                <h3 className="font-montserrat font-bold text-white text-2xl mb-4">
                                    Flight Training &amp; Logging Flying Hours
                                </h3>
                                <div className="text-4xl mb-4">✈️</div>
                                <p className="text-white/80 text-sm leading-relaxed mb-5">
                                    You need to meet the requirement of <strong className="text-av-orange">200 flight hours</strong> which includes solo flights, cross-country flights, instrument flights, and night flights.
                                </p>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <p className="text-av-orange font-semibold text-sm">📒 Logbook</p>
                                    <p className="text-white/70 text-xs mt-1 leading-relaxed">The logbook contains essential training information that serves as a basis for CPL certificate issuance.</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Step 5: Apply for CPL ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Step 5</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Apply for <span className="text-av-orange">Commercial Pilot License</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">After passing all exams and completing flight hours:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                        {[
                            { num: '1', icon: '📁', text: 'Submit your logbook and documents to DGCA' },
                            { num: '2', icon: '🩺', text: 'Undergo Class 1 medical revalidation' },
                            { num: '3', icon: '🪪', text: 'Apply for CPL issuance' },
                        ].map((item, i) => (
                            <ScrollReveal key={item.num} delay={i * 100}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 text-center h-full">
                                    <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-bold mx-auto mb-3">{item.num}</div>
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── We One Admission Procedure ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">We One Aviation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Admission Procedure at <span className="text-av-orange">We One Aviation Academy</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            We One Aviation Academy provides students with a friendly admission process that leads to Commercial Pilot License enrollment. Our admission process includes:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {weOneProcess.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 h-full flex flex-col">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed flex-grow">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-6 text-center">
                            <p className="text-white/80 text-sm leading-relaxed max-w-2xl mx-auto">
                                We will support you through the entire training program starting from your initial counseling until you <strong className="text-av-orange">pass your final flight test.</strong>
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Conclusion ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Conclusion</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">
                            Ready to <span className="text-av-orange">Take Off?</span>
                        </h2>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 mb-8">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                The Commercial Pilot License Admission Process consists of multiple stages which let only the most dedicated and qualified candidates progress toward their aviation career. With the right guidance and a DGCA-approved institution like We One Aviation Academy, every step of the journey becomes clear and achievable.
                            </p>
                        </div>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
                            Start Your Admission Process →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}