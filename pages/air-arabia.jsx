import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const programmeHighlights = [
    { icon: '🪪', label: 'Licence Awarded', value: 'MPL(A) + Validated ATPL' },
    { icon: '⏱️', label: 'Programme Duration', value: '22 – 24 Months' },
    { icon: '✈️', label: 'Partner Airline', value: 'Air Arabia' },
    { icon: '🕐', label: 'Flying Hours', value: '1500 Hours' },
    { icon: '🌍', label: 'Open To', value: 'All Nationalities' },
    { icon: '👤', label: 'Age Requirement', value: '17 – 34 Years' },
];

const eligibilityCriteria = [
    { icon: '👥', criteria: 'Gender', details: 'All genders are welcome to apply' },
    { icon: '🌍', criteria: 'Nationality', details: 'Open to all nationalities worldwide' },
    { icon: '🎂', criteria: 'Age', details: 'Between 17 to 34 years old at time of application' },
    { icon: '📏', criteria: 'Height', details: 'Between 160 cm and 195 cm' },
    { icon: '🎓', criteria: 'Education', details: 'High School / O-Level Diploma graduate (minimum, any curriculum)' },
];

const entryAssessments = [
    {
        step: '1',
        icon: '✈️',
        title: 'Local Aviation Clearance',
        desc: 'Application for local aviation authority clearance as part of the entry process into the programme.',
    },
    {
        step: '2',
        icon: '🩺',
        title: 'Medical Fitness Test',
        desc: 'Comprehensive medical examination to assess physical fitness and health standards required for pilot training.',
    },
    {
        step: '3',
        icon: '🧠',
        title: 'Pilot Aptitude Exam',
        desc: 'A three-part assessment covering Academic Test, Psychomotor Skill Test, and Personality Test.',
        subItems: ['Academic Test', 'Psychomotor Skill Test', 'Personality Test'],
    },
    {
        step: '4',
        icon: '📚',
        title: 'Academic Test',
        desc: 'Tests core academic knowledge across five subject areas critical to pilot training.',
        subItems: ['Mathematics', 'Physics', 'English', 'Cognitive Foundation', 'Future Aptitude Selection Tool (FAST)'],
    },
    {
        step: '5',
        icon: '🎤',
        title: 'Panel Interview',
        desc: 'Face-to-face interview with an assessment panel to evaluate motivation, communication, and suitability for an airline pilot career.',
    },
];

const applicationRequirements = [
    { doc: 'Coloured Passport Copy', note: 'Valid passport — coloured scan required' },
    { doc: 'Emirates ID', note: 'If applicable (UAE residents)' },
    { doc: 'UAE Visa Copy', note: 'If applicable' },
    { doc: "Sponsor's Documents", note: 'Required if below 21 years old' },
    { doc: 'Coloured Birth Certificate Copy', note: 'Must be attested by local issuing authority' },
    { doc: 'Passport-size Photo', note: 'Without eyeglasses, white background — 6 hard copies required' },
    { doc: 'Academic Certificate & Transcripts', note: 'Coloured copy — attested by local authority' },
    { doc: 'High School Certificate & Transcript', note: 'Any curriculum — or highest degree/certificate attained' },
    { doc: 'CV / Resume', note: 'Updated curriculum vitae' },
];

const applicationNotes = [
    'Submit coloured copies of all documents via email to Customer_Care@airarabia.academy with subject line: Application Requirements (your full name as per passport)',
    'The same documents must be presented in person on the day of assessment as printed copies.',
    'If highest educational attainment is high school, transcripts of the last 3 years of study are required via email and as printed copies on assessment day.',
    'Six passport-size photos (without eyeglasses) with a white background must be submitted as hard copies on the day of assessment.',
    'All official certificates (birth certificate, academic diploma/certificate, and transcripts) must be attested by local issuing authorities prior to submission.',
    'All foreign documents must be translated to English before attestation.',
    'Prospective international candidates are responsible for their own travel, visa, and accommodation arrangements.',
    'Upon registration, the Academy can assist with providing a student resident visa.',
    'International candidates traveling to the UAE for assessments are advised to apply for a visa (tourist or visit) with at least one-month validity.',
];

const mplVsAtpl = [
    { aspect: 'Training Model', mpl: 'Airline-dedicated (ab initio to airline)', atpl: 'Self-funded, independent training' },
    { aspect: 'Licence Awarded', mpl: 'MPL(A) + Validated ATPL', atpl: 'CPL + ATPL (separate)' },
    { aspect: 'Flying Hours', mpl: '1500 hours with partner airline', atpl: '200 hrs (CPL) + build-up independently' },
    { aspect: 'Aircraft Type', mpl: 'Specific to partner airline fleet', atpl: 'Single engine → Multi engine progression' },
    { aspect: 'Job Guarantee', mpl: 'With partner airline (Air Arabia)', atpl: 'Self-sourced after training' },
    { aspect: 'Duration', mpl: '22–24 months', atpl: '24–36 months (variable)' },
    { aspect: 'Training Focus', mpl: 'MCC & CRM from day one', atpl: 'Single pilot operations first' },
];

const faqs = [
    {
        q: 'What is an MPL licence?',
        a: 'An MPL (Multi-Crew Pilot Licence) is an ICAO-defined pilot licence that qualifies a cadet to operate as a co-pilot (First Officer) on multi-crew commercial aircraft. It is earned through an airline-dedicated training programme and includes a validated ATPL upon completion.',
    },
    {
        q: 'What is the difference between MPL and CPL?',
        a: 'A CPL (Commercial Pilot Licence) allows you to fly as a single pilot commercially, while an MPL is specifically designed for multi-crew airline operations. MPL training is airline-specific, meaning you train for a specific airline fleet from day one, whereas CPL is a general qualification.',
    },
    {
        q: 'Do I need prior flying experience to apply?',
        a: 'No prior flying experience is required. The Air Arabia MPL programme is an ab initio (from scratch) course — you start from zero and complete the full training pathway including ground school, simulator, and flight training over 22–24 months.',
    },
    {
        q: 'What is the FAST test in the academic exam?',
        a: 'FAST stands for Future Aptitude Selection Tool. It is a standardised assessment used to measure a candidate\'s cognitive potential and aptitude for aviation training. It evaluates logical thinking, pattern recognition, and problem-solving ability.',
    },
    {
        q: 'Can Indian nationals apply for this programme?',
        a: 'Yes! The programme is open to all nationalities. Indian candidates must arrange their own UAE visa (tourist/visit) with at least one month validity to attend all assessment stages. The Academy can assist with a student resident visa upon programme registration.',
    },
    {
        q: 'What happens after I complete the MPL programme?',
        a: 'Upon successful completion, you receive an MPL(A) licence and a validated ATPL with 1500 flying hours, in collaboration with Air Arabia. Graduates are placed as First Officers with Air Arabia, the partner airline of the programme.',
    },
    {
        q: 'How can We One Aviation Academy help me apply?',
        a: 'We One Aviation Academy guides aspiring pilots through the complete application process — document preparation, application submission, entry assessment preparation (aptitude tests, academic tests, interview coaching), and liaison with the academy. Contact us for free counselling.',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AirArabiaMPLPage() {
    return (
        <Layout
            title="Air Arabia Airline Pilot Training Programme (MPL) – Complete Guide | We One Aviation"
            description="Air Arabia's MPL Airline Pilot Training Programme — 22–24 months, MPL(A) + ATPL, 1500 flying hours. Eligibility, entry assessments, application requirements and how to apply guide for Indian candidates."
        >

            {/* ── Hero ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <br /><br /><br /><br />
                    <div className="section-tag">Airline Pilot Training</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Airline Pilot Training Programme <span className="text-av-orange">(MPL)</span>
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">
                        In Partnership with <strong>Air Arabia</strong> ✈️
                    </p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-6">
                        An airline-dedicated professional pilot licence programme with a specific airline and aircraft training syllabus. Graduate with an active <strong className="text-white">MPL(A) + Validated ATPL</strong> and 1500 flying hours — ready for the cockpit of Air Arabia.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {programmeHighlights.map(h => (
                            <span key={h.label} className="bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full">
                                {h.icon} {h.value}
                            </span>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* ── Programme Overview ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Overview</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Programme <span className="text-av-orange">Overview</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">What is the MPL Programme?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    The <strong className="text-av-blue">Airline Pilot Training Programme (MPL)</strong> is an airline-dedicated professional pilot licence programme with a specific airline and aircraft training syllabus designed in collaboration with Air Arabia.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Our instructors focus on building the skills, knowledge, and attitude required to not only fulfill but surpass future airline pilot requirements. We provide a timely and relevant world-class training programme to ensure that each cadet achieves a qualification that is <strong className="text-av-blue">in-demand within the industry.</strong>
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    The programme is projected to run over a period of <strong className="text-av-orange">22–24 months.</strong> Upon successful completion, graduates obtain an active <strong className="text-av-blue">Multi-Crew Pilot Licence — MPL(A)</strong> and a validated <strong className="text-av-blue">Airline Transport Pilot Licence (ATPL)</strong> with 1500 flying hours in collaboration with partner airline, Air Arabia.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-6">Programme at a Glance</h3>
                                <div className="space-y-4">
                                    {programmeHighlights.map((h, i) => (
                                        <div key={h.label} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                                            <span className="text-2xl flex-shrink-0">{h.icon}</span>
                                            <div>
                                                <p className="text-white/60 text-xs">{h.label}</p>
                                                <p className="text-white font-bold text-sm">{h.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* MPL vs ATPL Comparison */}
                    <ScrollReveal className="text-center mb-8">
                        <h3 className="font-montserrat text-2xl font-bold text-av-blue">
                            MPL vs ATPL – <span className="text-av-orange">What is the Difference?</span>
                        </h3>
                        <p className="text-gray-500 mt-2 text-sm">Understand which pathway suits your aviation career goals</p>
                    </ScrollReveal>
                    <ScrollReveal>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-blue text-white">
                                        <th className="px-5 py-4 text-left">Aspect</th>
                                        <th className="px-5 py-4 text-left text-av-orange">MPL Programme (Air Arabia)</th>
                                        <th className="px-5 py-4 text-left">Traditional ATPL Route</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mplVsAtpl.map((row, i) => (
                                        <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-5 py-3 font-semibold text-av-blue">{row.aspect}</td>
                                            <td className="px-5 py-3 text-av-orange font-medium">{row.mpl}</td>
                                            <td className="px-5 py-3 text-gray-600">{row.atpl}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Eligibility ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Who Can Apply</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Eligibility <span className="text-av-orange">Criteria</span>
                        </h2>
                        <p className="text-white/60 mt-2 text-sm">Check if you meet the minimum requirements to apply for the Air Arabia MPL Programme</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {eligibilityCriteria.map((row, i) => (
                            <ScrollReveal key={row.criteria} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 flex items-start gap-4">
                                    <span className="text-3xl flex-shrink-0">{row.icon}</span>
                                    <div>
                                        <p className="text-av-orange font-bold text-xs mb-1 uppercase tracking-wider">{row.criteria}</p>
                                        <p className="text-white/80 text-sm leading-relaxed">{row.details}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-orange/20 border border-av-orange/40 rounded-2xl p-6 text-center">
                            <p className="text-white font-semibold text-sm">
                                ✅ No prior flying experience required — this is a complete ab initio (from scratch) programme open to all nationalities and genders.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Entry Assessments ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Selection Process</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Entry <span className="text-av-orange">Assessments</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Every applicant must complete the following entry assessments. Each stage must be passed to proceed to the next.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {entryAssessments.map((assessment, i) => (
                            <ScrollReveal key={assessment.step} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                            {assessment.step}
                                        </div>
                                        <span className="text-3xl">{assessment.icon}</span>
                                    </div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2">{assessment.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-3 flex-grow">{assessment.desc}</p>
                                    {assessment.subItems && (
                                        <ul className="space-y-1 mt-2">
                                            {assessment.subItems.map(item => (
                                                <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                                                    <span className="text-av-orange font-bold mt-0.5 flex-shrink-0">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How to Apply ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">How to Apply</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Application <span className="text-av-orange">Process & Requirements</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm max-w-2xl mx-auto">
                            Follow these steps and prepare the required documents to submit your application to the Air Arabia Academy.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        {/* Documents Required */}
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">
                                    📋 Documents Required
                                </h3>
                                <div className="space-y-3">
                                    {applicationRequirements.map((req, i) => (
                                        <div key={req.doc} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                            <div className="w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                                            <div>
                                                <p className="font-semibold text-av-blue text-sm">{req.doc}</p>
                                                <p className="text-gray-400 text-xs mt-0.5">{req.note}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Application Notes */}
                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full flex flex-col">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-5">
                                    📌 Important Application Notes
                                </h3>
                                <ul className="space-y-3 flex-grow">
                                    {applicationNotes.map((note, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/80 text-xs leading-relaxed">
                                            <span className="text-av-orange font-bold mt-0.5 flex-shrink-0">•</span>
                                            <span>{note}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Email CTA */}
                                <div className="mt-6 bg-white/10 border border-white/20 rounded-xl p-4">
                                    <p className="text-white/60 text-xs mb-1">Submit your application to:</p>
                                    <p className="text-av-orange font-bold text-sm break-all">Customer_Care@airarabia.academy</p>
                                    <p className="text-white/50 text-xs mt-1">Subject: Application Requirements (Your Full Name as per Passport)</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Step by Step How to Apply */}
                    <ScrollReveal className="text-center mb-8">
                        <h3 className="font-montserrat text-2xl font-bold text-av-blue">
                            Step-by-Step <span className="text-av-orange">Application Guide</span>
                        </h3>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[
                            { step: '1', icon: '📄', title: 'Prepare Documents', desc: 'Collect all required documents. Get official certificates attested by local issuing authorities. Translate foreign documents to English.' },
                            { step: '2', icon: '📧', title: 'Submit via Email', desc: 'Send coloured copies of all documents to Customer_Care@airarabia.academy with the correct subject line including your full name.' },
                            { step: '3', icon: '🗓️', title: 'Attend Assessment Day', desc: 'Bring printed hard copies of all documents on assessment day. Bring 6 passport photos (no glasses, white background).' },
                            { step: '4', icon: '✅', title: 'Complete All Stages', desc: 'Complete all 5 entry assessment stages: Aviation Clearance, Medical, Aptitude Exam, Academic Test, and Panel Interview.' },
                        ].map((s, i) => (
                            <ScrollReveal key={s.step} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center card-hover hover:border-av-orange/30 h-full">
                                    <div className="w-10 h-10 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3">{s.step}</div>
                                    <div className="text-3xl mb-3">{s.icon}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{s.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">FAQ</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked <span className="text-av-orange">Questions</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Everything you need to know about the Air Arabia MPL Programme</p>
                    </ScrollReveal>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={faq.q} delay={i * 50}>
                                <details className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 group cursor-pointer">
                                    <summary className="font-montserrat font-bold text-av-blue text-sm list-none flex justify-between items-center">
                                        {faq.q}
                                        <span className="text-av-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">{faq.a}</p>
                                </details>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy text-center">
                <div className="max-w-3xl mx-auto">
                    <ScrollReveal>
                        <div className="section-tag">Apply Now</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Fly with <span className="text-av-orange">Air Arabia?</span>
                        </h2>
                        <p className="text-white/70 text-sm mb-8 leading-relaxed">
                            We One Aviation Academy helps aspiring pilots prepare for and apply to the Air Arabia MPL Programme — from document preparation and aptitude test coaching to interview preparation and full application support.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                Get Free Counselling →
                            </Link>
                            <Link href="/airline-preparation-course" className="inline-block bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                View Airline Prep Course
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}