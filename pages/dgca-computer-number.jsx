import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Pilot Guide', title: 'DGCA Computer', highlight: 'Number', sub: 'Full Guide for Pilot Aspirants — Everything You Need to Know' },
];

const computerNumberUses = [
    'Appear for any DGCA ground theory exam',
    'Apply for a Commercial Pilot License or Private Pilot License',
    'Track your academic and exam records',
    'Register at any flying school approved by DGCA',
];

const whoNeeds = [
    { icon: '✈️', title: 'Commercial Pilot (CPL)', desc: 'Anyone pursuing a CPL must first obtain a DGCA computer number.' },
    { icon: '🛩️', title: 'Private Pilot (PPL)', desc: 'PPL aspirants also require a computer number to appear for DGCA exams.' },
    { icon: '🎓', title: 'Flight Instructor', desc: 'Flight instructor applicants must register with a DGCA computer number.' },
    { icon: '🏆', title: 'ATPL Holder', desc: 'Airline Transport Pilot License aspirants need a computer number to proceed.' },
    { icon: '🌍', title: 'Foreign License Conversion', desc: 'Anyone converting a foreign pilot license to an Indian license in India.' },
];

const documentsNeeded = [
    '10th and 12th mark sheets (with Physics & Maths)',
    'Date of Birth proof (Class 10 certificate)',
    'Passport-size photo (white background, recent)',
    'Signature (clear, black ink on white paper)',
    'ID proof (Aadhar card or Passport)',
];

const uploadDocuments = [
    '10th & 12th mark sheets (with Physics & Maths)',
    'Passport-size photo (recent, white background)',
    'Signature (on white paper, black ink)',
    'Aadhar Card or Passport',
    'Class 10 passing certificate (for Date of Birth proof)',
];

const applicationSteps = [
    {
        num: '1',
        title: 'Go to the Official Website',
        desc: 'Visit https://pariksha.dgca.gov.in — Click on "Central Examination Organisation" → then click "New User Registration".',
        note: null,
    },
    {
        num: '2',
        title: 'Create a Student Profile',
        desc: 'You\'ll be asked to fill in your basic details: Full Name (must match exactly with mark sheets), Father\'s and Mother\'s Name, Date of Birth, Email ID (use one you can access anytime), Mobile Number, Educational Details (10th & 12th Board, Year, Roll No., etc.), Aadhar Number, Gender. Solve Captcha and Click Submit.',
        note: '📌 Important: Spelling and dates must match your certificates exactly. Even a small mismatch can cause rejection.',
    },
    {
        num: '3',
        title: 'Upload Documents',
        desc: 'You\'ll now upload the required files. Make sure: File format is PDF or JPG, Size is within DGCA\'s limits (usually under 1 MB), Files are clear and readable, Each file is named properly (e.g., 10th_Marksheet.pdf, Photo.jpg).',
        note: null,
    },
    {
        num: '4',
        title: 'Submit the Application',
        desc: 'After reviewing everything: Click on "Submit". You\'ll get a confirmation message. An Application Number will be generated — save it!',
        note: null,
    },
    {
        num: '5',
        title: 'Wait for DGCA Verification',
        desc: 'Now DGCA will verify your application. This usually takes 2 to 4 weeks. You can track your application status by logging into your account on the same portal.',
        note: '🛑 If Your Application Gets Rejected? No worries! DGCA will mention the reason (e.g., blurry documents, name mismatch). Just correct the issue and re-upload.',
    },
];

const photoTips = [
    'White background',
    'No shadows or filters',
    'No headgear unless religious',
];

const signatureTips = [
    'Clear, full name in English',
    'Use black ink, not blue',
    'Scan at 300 dpi or more',
];

const afterApproval = [
    'Computer Number (10-digit ID)',
    'Email confirmation from DGCA',
    'Login access to register for DGCA exams like Air Navigation, Meteorology, etc.',
];

const importantTips = [
    'Make sure your documents are clear and readable',
    'Signature must be on a white background',
    'Name on documents must match your ID proof exactly',
    'Your photo should be less than 6 months old',
    'You will receive your computer number by email and can also check it on the Pariksha portal.',
];

export default function DGCAComputerNumber() {
    return (
        <Layout title="DGCA Computer Number – Full Guide for Pilot Aspirants | WeOne Aviation" description="Complete step-by-step guide to apply for DGCA Computer Number online. Documents required, application process, tips for approval and what happens after you receive your computer number.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">Pilot Guide</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                DGCA Computer Number – Full Guide for Pilot Aspirants
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                If you're planning to become a pilot in India, the first thing you'll need to start your journey is a Computer Number issued by the DGCA (Directorate General of Civil Aviation).
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                You might be thinking there are too many technical terms — but don't worry! Your brother is here to explain everything in detail. So, aviators, stay calm and read this page carefully.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['10-Digit ID', 'Computer Number'], ['2–4 Weeks', 'Approval Time'], ['Free', 'Registration'], ['Lifetime', 'Validity']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What is Computer Number */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is a Computer Number?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Computer Number is a Unique Number Which is Given By DGCA to every student Who want to Become Pilot in India. Its Just Like a Roll Number For DGCA Exam. Without Getting Computer Number, You Can't Appear For DGCA Exam.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                This Computer Number is So Important and This Number Have So Many uses in Your Life at Every Stage If Your Dream To Become a Pilot. List of Places Where You Have to use of It:
                            </p>
                            <ul className="space-y-2 mb-10">
                                {computerNumberUses.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Who Needs */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Who Needs a Computer Number?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">Anyone who wants to become a:</p>
                            <div className="space-y-3 mb-10">
                                {whoNeeds.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Documents Needed */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Documents Needed to Apply for a Computer Number</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Before you Apply For Computer Number, make sure all your documents are scanned and self-attested. You'll need:
                            </p>
                            <ul className="space-y-2 mb-10">
                                {documentsNeeded.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Step by Step */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How to Apply for DGCA Computer Number – Step-by-Step Guide</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">You'll need to upload scanned copies of:</p>
                            <ul className="space-y-2 mb-6">
                                {uploadDocuments.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 text-xs mb-6">✅ All documents must be self-attested and in PDF/JPG format.</p>

                            <div className="space-y-4 mb-10">
                                {applicationSteps.map((step) => (
                                    <div key={step.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {step.num}
                                            </span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{step.title}</h4>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs leading-relaxed mb-2">{step.desc}</p>
                                            {step.note && (
                                                <p className="text-av-orange text-xs font-semibold leading-relaxed">{step.note}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bonus Tip */}
                            <div className="bg-av-orange/10 border border-av-orange/30 rounded-2xl p-6 mb-10">
                                <h4 className="font-montserrat font-bold text-av-blue mb-4">💡 BONUS TIP (Most Students Miss This!)</h4>
                                <p className="text-gray-600 text-sm mb-4">After uploading everything, cross-check your photo and signature:</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold text-av-blue text-sm mb-2">📸 Photo:</p>
                                        <ul className="space-y-1">
                                            {photoTips.map((tip, i) => (
                                                <li key={i} className="flex gap-2 items-start text-xs text-gray-600">
                                                    <span className="text-av-orange flex-shrink-0">✓</span>{tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-av-blue text-sm mb-2">✍️ Signature:</p>
                                        <ul className="space-y-1">
                                            {signatureTips.map((tip, i) => (
                                                <li key={i} className="flex gap-2 items-start text-xs text-gray-600">
                                                    <span className="text-av-orange flex-shrink-0">✓</span>{tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-av-orange text-xs font-semibold mt-4">
                                    Most delays happen because of low-quality signatures or mismatched names — double-check this!
                                </p>
                            </div>

                            {/* After Approval */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">After Approval – What Happens Next?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">Once approved, you will receive your:</p>
                            <ul className="space-y-2 mb-10">
                                {afterApproval.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Important Tips */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Important Tips for Easy Approval</h3>
                            <ul className="space-y-2 mb-10">
                                {importantTips.map((tip, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>

                            {/* Validity */}
                            <div className="bg-av-light rounded-2xl p-6 mb-10 border border-av-sky/20">
                                <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">How Long is the Computer Number Valid?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    <span className="font-bold text-av-orange">Forever.</span> Once you receive it, you'll use it for all DGCA exams throughout your aviation career.
                                </p>
                            </div>

                            {/* CTA Banner */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Need Help Applying for Your Computer Number?</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                                    We One Aviation Academy helps students with every step — from computer number registration to DGCA exam preparation. Contact us for free guidance! ✈️
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
                            <LeadForm title="Get Help with Computer Number" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Documents Required</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ 10th & 12th mark sheets</li>
                                    <li>✓ Date of Birth proof</li>
                                    <li>✓ Passport-size photo</li>
                                    <li>✓ Signature (black ink)</li>
                                    <li>✓ Aadhar Card or Passport</li>
                                    <li>✓ PDF/JPG format only</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Key Facts</h4>
                                <p className="text-white/80 text-sm mb-3">DGCA Computer Number:</p>
                                <div className="text-2xl font-montserrat font-black">Lifetime</div>
                                <div className="text-white/70 text-xs mt-1">Valid for All DGCA Exams</div>
                                <div className="text-white/70 text-xs mt-1">Approval in 2–4 Weeks</div>
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