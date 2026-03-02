import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Pilot Guide', title: 'DGCA Medical', highlight: 'Class 1 & Class 2', sub: 'Complete Guide for Pilot Aspirants in India — Requirements, Procedure & Fees' },
];

const overview = [
    { icon: '🩺', title: 'Class II Medical Certificate', desc: 'Required initially for a Student Pilot License (SPL) and to start flight training.' },
    { icon: '✈️', title: 'Class I Medical Certificate', desc: 'Necessary for obtaining a Commercial Pilot License (CPL) and for ongoing operation as a commercial pilot.' },
];

const class2WhoNeeds = [
    'Private Pilot License (PPL) holders.',
    'Student Pilot License (SPL) applicants (for various aircraft types).',
    "Flight Radio Telephone Operator's License holders.",
];

const class2Standards = [
    { label: 'Physical Requirements', desc: 'Basic physical health requirements.' },
    { label: 'Vision Requirements', desc: 'Good eyesight (with corrective lenses if necessary).' },
    { label: 'Hearing Requirements', desc: 'Standard hearing ability for clear communication.' },
];

const egcaSteps = [
    { title: 'Visit the eGCA Website', desc: 'Go to the official eGCA portal at https://egca.gov.in or https://dgcaexam.com/ — Click on \'Login/Register\' button typically in the top right corner, then select \'Register as New User\'.' },
    { title: 'Select User Type', desc: 'Choose the appropriate user type based on your role — Pilot (for pilot-related services), Aircraft Maintenance Engineer (AME), or Airline/Aviation Personnel.' },
    { title: 'Enter Personal Details', desc: 'Fill in your name, date of birth, nationality, and gender. Provide your Aadhar number or Passport number (optional but recommended for verification).' },
    { title: 'Provide Contact Details', desc: 'Enter a valid email address and mobile number. Ensure these details are accurate, as verification codes will be sent to them.' },
    { title: 'Create Username and Password', desc: 'Choose a unique username and secure password for your eGCA account. The password should meet the portal\'s security requirements (must include uppercase letters, lowercase letters, numbers, and special characters).' },
    { title: 'Verification', desc: 'After submitting the registration form, you\'ll receive verification codes via email and SMS. Enter these codes to verify your contact details.' },
    { title: 'Upload Documents (if required)', desc: 'Some user types may require document uploads (e.g., proof of identity, education certificates). Ensure that you upload the documents in the required format and size.' },
    { title: 'Submit Registration', desc: 'Review all details for accuracy and submit the form. Once submitted, the system will process your registration, and you\'ll receive a confirmation email upon successful account creation.' },
    { title: 'Login to eGCA', desc: 'After registration, return to the eGCA homepage and log in using your newly created username and password.' },
];

const class2MedicalTests = [
    { icon: '🩸', title: 'Blood Tests', desc: 'Check hemoglobin, blood sugar, lipid profile, liver function, etc.' },
    { icon: '🫁', title: 'Radiology Tests', desc: 'Chest and sinus X-rays.' },
    { icon: '❤️', title: 'ECG', desc: 'To check heart function.' },
    { icon: '👂', title: 'ENT Exam', desc: 'Ear, nose, and throat examination.' },
    { icon: '👁️', title: 'Vision Tests', desc: 'Assessment of visual acuity and color vision.' },
    { icon: '🧪', title: 'Urine Analysis', desc: 'Check for normal sugar and protein levels.' },
];

const class2Steps = [
    { num: '1', title: 'Register on the eGCA Portal', desc: 'Create your account on the official eGCA portal at https://egca.gov.in. Follow the full registration steps below.' },
    { num: '2', title: 'Choose a DGCA-Approved Doctor', desc: 'Use the DGCA\'s list of approved doctors and schedule an appointment. Doctors listed on the DGCA website are qualified to conduct this examination.' },
    { num: '3', title: 'Undergo the Necessary Medical Tests', desc: 'Complete all required tests including blood tests, X-rays, ECG, ENT exam, vision tests, and urine analysis.' },
    { num: '4', title: 'Submit Medical Reports to the DGCA-Approved Doctor', desc: 'The doctor will review your test results and, if satisfactory, submit them to DGCA for processing.' },
    { num: '5', title: 'Receive Your Medical Assessment Certificate', desc: 'After processing, access the certificate on the eGCA portal or pick it up in person.' },
];

const class1WhoNeeds = [
    'Commercial Pilot License (CPL) holders.',
    'Airline Transport Pilot License (ATPL) holders.',
    'Flight Engineers.',
];

const class1Requirements = [
    { label: 'Minimum Age', desc: '17 years' },
    { label: 'Documents Needed', desc: 'Last Medical Assessment, CA-35 form, two passport-size photos, and ID.' },
    { label: 'Eyeglasses', desc: 'If you wear corrective lenses, bring them and a recent prescription.' },
];

const class1AdditionalTests = [
    { icon: '🩺', title: 'Physical Exam', desc: 'Full physical examination.' },
    { icon: '👁️', title: 'Visual and Hearing Tests', desc: 'Evaluates acuity and clarity.' },
    { icon: '❤️', title: 'ECG and Blood Pressure Check', desc: 'To ensure cardiovascular health.' },
    { icon: '🩸', title: 'Blood and Urine Analysis', desc: 'Basic health screening.' },
    { icon: '🫁', title: 'Lung Function', desc: 'Test for respiratory function.' },
];

const class1Steps = [
    { num: '1', title: 'Determine Type of Medical Examination Needed', desc: 'Initial Medical: Required if the Class I assessment is being obtained for the first time. Renewal Medical: Regular renewal for those already holding a Class I certificate.' },
    { num: '2', title: 'Scheduling and Appointments', desc: 'IAF Centres: Book in advance by contacting the DGCA. Civil Centres: Contact directly without PMR forwarding if a Class I initial medical is conducted here.' },
    { num: '3', title: 'Submit Documentation', desc: 'Send all necessary documents, including a No Objection Certificate (NOC) if needed.' },
];

const faqs = [
    { q: 'What is the purpose of the DGCA medical examination?', a: 'DGCA medical examinations verify that pilots meet stringent health standards. They are designed to assess overall fitness, detect any medical conditions that could impair flying ability, and help ensure passenger and crew safety.' },
    { q: 'Can I apply for both Class I and Class II medical exams together?', a: 'Generally, Class II is obtained first as an entry-level certification for student pilots. Class I is pursued after completing initial training when applying for a CPL. Contact a DGCA-approved doctor for specific guidance.' },
    { q: 'Where can I find a list of DGCA-approved doctors for Class II medical exams?', a: 'The list of DGCA-approved doctors is available on the official DGCA website at www.dgca.gov.in. You can also contact We One Aviation Academy for guidance on finding approved medical examiners near you.' },
    { q: 'What happens if my Class I medical certificate expires?', a: 'If your Class I medical certificate expires, you are not legally permitted to exercise the privileges of your commercial pilot license until it is renewed. Apply for renewal 0-30 days before the expiry date.' },
    { q: 'Are there any special medical centers for Class I renewal exams?', a: 'Yes, Class I medical exams can be conducted at IAF (Indian Air Force) hospitals or designated civil medical centres approved by DGCA. Contact DGCA directly for a list of approved Class I examination centres.' },
];

export default function DGCAMedical() {
    return (
        <Layout title="DGCA Class 1 & Class 2 Medical Guide for Pilots | WeOne Aviation Academy" description="Complete guide to DGCA Class 2 and Class 1 Medical examinations for pilot aspirants in India. Requirements, steps, fees, validity and eGCA registration process explained in detail.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">Pilot Guide</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Guide for DGCA Class 2 Medical and DGCA Class 1 Medical
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Aspiring pilots in India are required to undergo specific medical assessments to ensure they meet the necessary mental and physical health standards for aviation. The Directorate General of Civil Aviation (DGCA) mandates two primary medical examinations — DGCA Class II and DGCA Class I medical certifications.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                Both assessments are critical to starting and progressing in a pilot's career. In this guide, we will delve into the requirements, procedures, and validity for each of these medical certifications, ensuring that you are well-prepared for each step.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['Class 2', 'For SPL / PPL'], ['Class 1', 'For CPL / ATPL'], ['17 Years', 'Min Age'], ['eGCA Portal', 'Registration']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Overview */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Overview of DGCA Class II and Class I Medical Examinations</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                To become a licensed pilot in India, DGCA mandates medical certifications to verify that pilots meet stringent health standards. These are designed to assess overall fitness, detect any medical conditions that could impair flying ability, and help ensure passenger and crew safety.
                            </p>
                            <div className="space-y-3 mb-10">
                                {overview.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title} –</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* ===== CLASS 2 ===== */}
                            <div className="bg-av-blue rounded-2xl p-6 mb-6">
                                <h2 className="font-montserrat text-2xl font-bold text-white">DGCA Class II Medical Examination</h2>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                The DGCA Class II medical examination is the entry-level certification for those aspiring to begin their pilot training. This certification is mandatory for obtaining a Student Pilot License and enrolling in a flight school for further training.
                            </p>

                            <h3 className="font-montserrat text-lg font-bold text-av-blue mb-3">Who Needs a Class II Medical Certificate?</h3>
                            <ul className="space-y-2 mb-8">
                                {class2WhoNeeds.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <h3 className="font-montserrat text-lg font-bold text-av-blue mb-3">Class II Medical Standards</h3>
                            <div className="space-y-2 mb-8">
                                {class2Standards.map((item) => (
                                    <div key={item.label} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        <span><span className="font-semibold text-av-blue">{item.label} –</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="font-montserrat text-lg font-bold text-av-blue mb-3">Steps to Obtain a Class II Medical Certificate</h3>
                            <div className="space-y-4 mb-6">
                                {class2Steps.map((step) => (
                                    <div key={step.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{step.num}</span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{step.title}</h4>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* eGCA Registration */}
                            <div className="bg-av-light rounded-2xl p-6 mb-6 border border-av-sky/20">
                                <h4 className="font-montserrat font-bold text-av-blue mb-4">Steps to Register on the eGCA Portal</h4>
                                <div className="space-y-3">
                                    {egcaSteps.map((step, i) => (
                                        <div key={step.title} className="flex gap-3 items-start text-xs text-gray-600">
                                            <span className="flex-shrink-0 w-5 h-5 bg-av-blue rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                                            <span><span className="font-semibold text-av-blue">{step.title}:</span> {step.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Medical Tests */}
                            <h4 className="font-montserrat font-bold text-av-blue mb-3">Necessary Medical Tests for Class II</h4>
                            <div className="grid sm:grid-cols-2 gap-3 mb-8">
                                {class2MedicalTests.map((test) => (
                                    <div key={test.title} className="flex gap-3 items-start p-3 rounded-xl border border-gray-100 bg-white shadow-sm text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{test.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{test.title}:</span> {test.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Class 2 Validity & Fees */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                <div className="bg-av-light rounded-xl p-5 border border-av-sky/20">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-3">Validity & Renewal</h4>
                                    <ul className="space-y-1 text-xs text-gray-600">
                                        <li><span className="font-semibold text-av-blue">SPL Holders (India):</span> Valid for 24 months.</li>
                                        <li><span className="font-semibold text-av-blue">PPL Holders:</span> Valid for 24 months (requires periodic renewal).</li>
                                        <li className="text-av-orange text-xs">Apply for renewal 0-30 days before expiry.</li>
                                    </ul>
                                </div>
                                <div className="bg-av-light rounded-xl p-5 border border-av-sky/20">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-3">Fees</h4>
                                    <ul className="space-y-1 text-xs text-gray-600">
                                        <li><span className="font-semibold text-av-blue">Air Force Hospital:</span> Approx. INR 3,000 – 4,000</li>
                                        <li><span className="font-semibold text-av-blue">Private Hospitals:</span> INR 6,000 – 8,000 (cost may vary by hospital)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* ===== CLASS 1 ===== */}
                            <div className="bg-av-orange rounded-2xl p-6 mb-6">
                                <h2 className="font-montserrat text-2xl font-bold text-white">DGCA Class I Medical Examination</h2>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                After obtaining a Class II medical certificate, pilots pursuing a Commercial Pilot License (CPL) must pass the DGCA Class I medical examination. This assessment is more rigorous, verifying mental and physical fitness for commercial aviation duties.
                            </p>

                            <h3 className="font-montserrat text-lg font-bold text-av-blue mb-3">Who Needs a Class I Medical Certificate?</h3>
                            <ul className="space-y-2 mb-8">
                                {class1WhoNeeds.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <h3 className="font-montserrat text-lg font-bold text-av-blue mb-3">Requirements for Class I Medical Examination</h3>
                            <div className="space-y-2 mb-5">
                                {class1Requirements.map((item) => (
                                    <div key={item.label} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        <span><span className="font-semibold text-av-blue">{item.label}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm font-semibold mb-3">Additional assessments include:</p>
                            <div className="grid sm:grid-cols-2 gap-3 mb-8">
                                {class1AdditionalTests.map((test) => (
                                    <div key={test.title} className="flex gap-3 items-start p-3 rounded-xl border border-gray-100 bg-white shadow-sm text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{test.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{test.title}:</span> {test.desc}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="font-montserrat text-lg font-bold text-av-blue mb-3">Steps to Obtain a Class I Medical Certificate</h3>
                            <div className="space-y-4 mb-8">
                                {class1Steps.map((step) => (
                                    <div key={step.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{step.num}</span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{step.title}</h4>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Class 1 Validity & Fees */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-10">
                                <div className="bg-av-light rounded-xl p-5 border border-av-sky/20">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-3">Validity & Renewal</h4>
                                    <ul className="space-y-1 text-xs text-gray-600">
                                        <li><span className="font-semibold text-av-blue">Under 40 (Multi-crew Operations):</span> Valid for 12 months.</li>
                                        <li><span className="font-semibold text-av-blue">Over 40 (Single-crew Operations):</span> Valid for six months.</li>
                                    </ul>
                                </div>
                                <div className="bg-av-light rounded-xl p-5 border border-av-sky/20">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-3">Fees</h4>
                                    <ul className="space-y-1 text-xs text-gray-600">
                                        <li><span className="font-semibold text-av-blue">Air Force Hospital:</span> INR 4,000 – 5,000</li>
                                    </ul>
                                </div>
                            </div>

                            {/* FAQs */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Frequently Asked Questions (FAQs)</h3>
                            <div className="space-y-3 mb-10">
                                {faqs.map((faq, i) => (
                                    <details key={faq.q} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 group cursor-pointer">
                                        <summary className="font-montserrat font-bold text-av-blue text-sm list-none flex justify-between items-center">
                                            {i + 1}. {faq.q}
                                            <span className="text-av-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                        </summary>
                                        <p className="text-gray-500 text-xs leading-relaxed mt-4 pt-4 border-t border-gray-100">{faq.a}</p>
                                    </details>
                                ))}
                            </div>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Need Help with DGCA Medical or Pilot Training?</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                                    Join our Pilot Training course for Clear class Medical 2 Exam. We One Aviation Academy helps students with DGCA medical guidance, computer number registration, and full exam preparation. ✈️
                                </p>
                                <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                    Book Free Counselling
                                </Link>
                            </div>

                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal delay={200}>
                            <LeadForm title="Get Medical Guidance" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Class 2 vs Class 1</h4>
                                <div className="space-y-3 text-xs text-white/80">
                                    <div>
                                        <p className="font-semibold text-av-orange mb-1">Class 2 Medical</p>
                                        <p>For: SPL / PPL students</p>
                                        <p>Valid: 24 months</p>
                                        <p>Cost: ₹3,000 – ₹8,000</p>
                                    </div>
                                    <div className="border-t border-white/20 pt-3">
                                        <p className="font-semibold text-av-orange mb-1">Class 1 Medical</p>
                                        <p>For: CPL / ATPL holders</p>
                                        <p>Valid: 6–12 months</p>
                                        <p>Cost: ₹4,000 – ₹5,000</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Quick Links</h4>
                                <p className="text-white/80 text-sm mb-3">Official Portals:</p>
                                <div className="space-y-2 text-xs text-white/80">
                                    <p>🌐 egca.gov.in</p>
                                    <p>🌐 pariksha.dgca.gov.in</p>
                                    <p>🌐 dgca.gov.in</p>
                                </div>
                                <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Get Free Help
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </Layout>
    );
}