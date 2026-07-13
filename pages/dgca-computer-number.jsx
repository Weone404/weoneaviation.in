import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Pilot Guide', title: 'DGCA Computer', highlight: 'Number', sub: 'Complete Guide to Registration, Eligibility, Documents & Online Application' },
];

const keyHighlights = [
    ['Issuing Authority', 'Directorate General of Civil Aviation (DGCA)'],
    ['Department', 'Central Examination Organisation (CEO)'],
    ['Application Mode', 'Online'],
    ['Validity', 'Lifetime'],
    ['Purpose', 'Registration for DGCA Flight Crew Examinations'],
    ['Mandatory For', 'CPL, PPL, ATPL and other Flight Crew examinations'],
    ['Number of Applications Allowed', 'One Computer Number per candidate'],
    ['Application Status', 'Can be tracked online through the DGCA Pariksha portal'],
];

const withoutComputerNumberList = [
    'Register for DGCA theory examinations',
    'Apply for CPL examination papers',
    'Apply for PPL examinations',
    'Register for ATPL examinations',
    'Access examination-related services through the DGCA Pariksha portal',
    'Build an official examination record with DGCA',
];

const whoNeeds = [
    'Become a Commercial Pilot',
    'Apply for a Commercial Pilot License (CPL)',
    'Pursue a Private Pilot License (PPL)',
    'Obtain an Airline Transport Pilot License (ATPL)',
    'Appear for DGCA Flight Crew examinations',
    'Continue advanced pilot training after basic aviation education',
];

const benefits = [
    { num: '1', title: 'Official DGCA Identification', desc: 'Your Computer Number becomes your permanent examination identity with DGCA.' },
    { num: '2', title: 'Eligibility for DGCA Examinations', desc: 'Without this number, candidates cannot register for flight crew examinations conducted by DGCA.' },
    { num: '3', title: 'Lifetime Validity', desc: 'Once issued, the Computer Number remains valid throughout your aviation career, eliminating the need for re-registration.' },
    { num: '4', title: 'Simplified Examination Management', desc: 'Candidates can easily register for examinations, access records, and monitor their examination history using the same Computer Number.' },
    { num: '5', title: 'Essential for Pilot Licensing', desc: 'The Computer Number forms an integral part of the licensing process for aspiring pilots seeking professional qualifications in India.' },
];

const whoCanApply = [
    'Have completed or be eligible under the educational requirements applicable to their intended licence.',
    'Possess valid identity proof.',
    'Have authentic educational documents.',
    'Ensure that all submitted documents contain matching personal details.',
];

const documentCategories = [
    { title: 'Educational Documents', items: ['Class 10 Marksheet', 'Class 12 Marksheet', 'Class 10 Passing Certificate (if applicable)', 'Class 12 Passing Certificate (if applicable)'] },
    { title: 'Identity Documents', items: ['Aadhaar Card', 'Passport (if available)', 'PAN Card (where applicable)'] },
    { title: 'Address Proof', items: ['Aadhaar Card', 'Passport', 'Driving Licence', 'Government-approved address proof'] },
    { title: 'Personal Documents', items: ['Passport-size Photograph', 'Signature', 'Valid Email Address', 'Active Mobile Number'] },
];

const tipsBeforeUploading = [
    'Ensure all documents are clear and readable.',
    'Upload scanned copies in the required format and size.',
    'Verify that your name and date of birth match across all documents.',
    'Avoid cropped or blurred scans.',
    'Double-check document details before final submission.',
    'Use a valid email address and mobile number that you regularly access.',
];

const delayReasons = [
    'Mismatch in name across documents',
    'Incorrect date of birth',
    'Blurred document uploads',
    'Invalid file format',
    'Missing educational certificates',
    'Incorrect spelling',
    'Uploading expired identity proof',
    'Incomplete application details',
];

const faqs = [
    { q: 'Is a DGCA Computer Number mandatory?', a: 'Yes. A valid DGCA Computer Number is required before you can register for most DGCA Flight Crew examinations, including those for pilot licensing.' },
    { q: 'Can I have more than one DGCA Computer Number?', a: 'No. A candidate should have only one Computer Number, which remains associated with their examination records.' },
    { q: 'Does the DGCA Computer Number expire?', a: 'No. Once issued, it is intended to remain valid for your aviation career unless otherwise specified by DGCA.' },
    { q: 'Can I apply before joining a flying school?', a: 'Yes. Many aspiring pilots obtain their Computer Number before beginning formal flight training so they are ready to register for DGCA examinations when eligible.' },
    { q: 'Can I apply for a DGCA Computer Number after Class 12?', a: 'Yes. Candidates who meet the applicable educational requirements for their intended pilot licence can apply.' },
    { q: 'Is there an age limit for applying?', a: 'The Computer Number itself is linked to DGCA examination eligibility. Refer to the eligibility requirements for the specific licence you plan to pursue.' },
    { q: 'Can I edit my application after submission?', a: 'Once submitted, changes may not always be possible through the portal. Review every detail carefully before final submission.' },
    { q: 'Do I need a Computer Number for a Commercial Pilot License (CPL)?', a: 'Yes. A valid DGCA Computer Number is required before registering for the DGCA examinations associated with the CPL pathway.' },
    { q: 'Is the DGCA Computer Number valid for life?', a: 'Yes. Once issued, it is intended to remain your permanent examination identification number.' },
    { q: 'Can international students apply?', a: 'Eligibility depends on DGCA\u2019s current regulations and documentation requirements. Check the latest official guidelines before applying.' },
    { q: 'Can I use the same Computer Number for PPL, CPL, and ATPL examinations?', a: 'Yes. The same Computer Number is used throughout your flight crew examination journey.' },
    { q: 'What should I do if my application is rejected?', a: 'Review the reason provided, correct the issue, and follow the instructions given by DGCA for resubmission or clarification.' },
    { q: 'Can I have two DGCA Computer Numbers?', a: 'No. A candidate should have only one Computer Number throughout their aviation career.' },
    { q: 'Do I need professional assistance to apply?', a: 'While many candidates complete the process independently, professional guidance can help avoid documentation mistakes and application delays.' },
];

const applicationSteps = [
    {
        num: '1',
        title: 'Visit the DGCA Pariksha Portal',
        desc: 'Go to the official DGCA examination portal and select the option for Computer Number Registration. You will be asked to create an account if you are a new user.',
        note: 'Pro Tip: Always use your personal email address and mobile number, as all future examination-related communication will be sent to these details.',
    },
    {
        num: '2',
        title: 'Create Your Account',
        desc: 'Enter your: Full Name (as per Class 10 certificate), Email Address, Mobile Number, Password. Verify your email or mobile number if prompted.',
        note: null,
    },
    {
        num: '3',
        title: 'Fill Personal Information',
        desc: 'Provide accurate personal details including: Full Name, Father\u2019s Name, Mother\u2019s Name, Date of Birth, Gender, Nationality, Aadhaar Number (if applicable), Passport Details (if available), Residential Address. Ensure every detail matches your official documents.',
        note: null,
    },
    {
        num: '4',
        title: 'Enter Educational Details',
        desc: 'Provide your academic information such as: Class 10 Board, Class 10 Passing Year, Class 12 Board, Class 12 Passing Year, Subjects Studied, Marks Obtained (if required). Candidates should verify all educational information before submitting the application.',
        note: null,
    },
    {
        num: '5',
        title: 'Upload Required Documents',
        desc: 'Upload clear scanned copies of the required documents. Typically, this includes: Class 10 Marksheet, Class 12 Marksheet, Identity Proof, Passport-size Photograph, Signature, Additional documents (if applicable). Before uploading, check: Image clarity, Correct file size, Accepted file format, Proper orientation.',
        note: 'Poor-quality documents are one of the most common reasons for delays.',
    },
    {
        num: '6',
        title: 'Verify the Application',
        desc: 'Review every section carefully. Check: Name spelling, Date of Birth, Educational details, Uploaded documents, Contact information.',
        note: 'A small mistake may require additional verification and delay the approval process.',
    },
    {
        num: '7',
        title: 'Submit Your Application',
        desc: 'Once satisfied, submit the application. After submission: You\u2019ll receive an acknowledgement. Keep a copy of the application reference for future communication. Track the application status through the DGCA portal.',
        note: null,
    },
];

const avoidDelaysTips = [
    'Upload high-quality documents.',
    'Ensure all details match across certificates.',
    'Respond promptly if DGCA requests clarification.',
];

const statusStages = [
    'Application Submitted',
    'Under Verification',
    'Documents Under Review',
    'Approved',
    'Clarification Required',
    'Rejected (if applicable)',
];

const rejectionReasons = [
    { num: '1', title: 'Name Mismatch', desc: 'The applicant\u2019s name differs between educational certificates and identity proof.', solution: 'Ensure the same spelling appears across all submitted documents. If your name has legally changed, provide supporting documents where required.' },
    { num: '2', title: 'Incorrect Date of Birth', desc: 'A mismatch in the date of birth across documents can lead to verification issues.', solution: 'Cross-check all certificates before submitting the application.' },
    { num: '3', title: 'Blurred Document Uploads', desc: 'Unreadable or low-quality scans may be rejected.', solution: 'Use a scanner or a high-resolution mobile scanning application to create clear copies.' },
    { num: '4', title: 'Missing Educational Documents', desc: 'Failure to upload mandatory certificates may delay processing.', solution: 'Prepare all required documents before beginning the application.' },
    { num: '5', title: 'Incorrect File Format', desc: 'Uploading unsupported file formats or oversized files may cause errors.', solution: 'Follow the upload instructions provided on the portal.' },
    { num: '6', title: 'Incorrect Personal Information', desc: 'Typing mistakes in names, addresses, or contact information can create unnecessary complications.', solution: 'Review every field before clicking the Submit button.' },
];

const noDelayTips = [
    'Apply well before your planned examination.',
    'Use your Class 10 certificate as the primary reference for your name and date of birth.',
    'Upload only clear scanned documents.',
    'Keep your email address active.',
    'Check the DGCA portal regularly for updates.',
    'Save copies of all submitted documents.',
    'Maintain consistency across all records.',
];

const afterApproval = [
    'Registering for DGCA theory examinations',
    'Enrolling in DGCA Ground Classes',
    'Continuing your Commercial Pilot License (CPL) preparation',
    'Tracking examination records',
    'Applying for future DGCA examinations',
];

const comparisonTable = [
    ['Used for DGCA Flight Crew examinations', 'Used for licensing and regulatory services'],
    ['Issued through the examination process', 'Used for pilot licensing workflows'],
    ['Permanent identification number', 'Online DGCA account for various aviation services'],
    ['Required before appearing in many DGCA exams', 'Used after and during different licensing stages'],
];

const expertTips = [
    'Start your DGCA Computer Number application as early as possible.',
    'Organize all documents before beginning the online process.',
    'Verify every detail carefully before submission.',
    'Keep digital copies of all uploaded files.',
    'Stay informed about official DGCA announcements.',
    'Seek professional guidance if you are unsure about documentation or eligibility.',
];

const weOneOffers = [
    'Career counselling',
    'DGCA Ground Classes',
    'Commercial Pilot License (CPL) guidance',
    'Pilot training roadmap',
    'Admission assistance',
    'Interview preparation',
];

const suggestedInternalLinks = [
    'Commercial Pilot License (CPL)',
    'CPL Eligibility',
    'CPL Course Fees',
    'DGCA Full Form',
    'PPL Full Form',
    'RTR Full Form',
    'Pilot Training in India',
    'DGCA Ground Classes',
    'Pilot Salary in India',
    'Cadet Pilot Program',
];

export default function DGCAComputerNumber() {
    return (
        <Layout title="DGCA Computer Number 2026 | Apply Online, Eligibility & Documents" description="Learn everything about the DGCA Computer Number, including eligibility, required documents, online registration, application process, validity, benefits, and expert guidance. Apply correctly with We One Aviation.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">Pilot Guide</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                DGCA Computer Number: Apply Online, Eligibility, Documents &amp; Registration Guide (2026)
                            </h1>

                            {/* Quick Answer */}
                            <div className="bg-av-light rounded-2xl p-6 mb-8 border border-av-sky/20">
                                <h2 className="font-montserrat text-lg font-bold text-av-blue mb-2">Quick Answer (Featured Snippet)</h2>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    A DGCA Computer Number is a unique identification number issued by the Directorate General of Civil Aviation (DGCA) through its Central Examination Organisation (CEO) to candidates pursuing aviation licenses such as the Commercial Pilot License (CPL), Private Pilot License (PPL), or Airline Transport Pilot License (ATPL). It is mandatory for appearing in DGCA examinations and remains valid throughout a pilot's career. Applicants can obtain the number by submitting the required educational and identity documents through the DGCA Pariksha portal.
                                </p>
                            </div>

                            {/* Become Eligible */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Become Eligible for DGCA Examinations with Your Computer Number</h2>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                If you dream of becoming a commercial pilot in India, obtaining a DGCA Computer Number is one of the first official steps in your aviation journey. Whether you are preparing for a Commercial Pilot License (CPL), Private Pilot License (PPL), or Airline Transport Pilot License (ATPL), you cannot register for DGCA examinations without a valid computer number.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Many aspiring pilots are unsure about the application process, eligibility requirements, required documents, or common reasons for application rejection. This comprehensive guide explains every aspect of the DGCA Computer Number in simple language so you can complete your registration confidently and avoid unnecessary delays.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-10 text-sm">
                                At We One Aviation, we assist aspiring pilots throughout their aviation journey—from career counselling and DGCA ground classes to pilot training guidance and airline career preparation.
                            </p>

                            {/* What is */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What is a DGCA Computer Number?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                A DGCA Computer Number is a permanent identification number issued by the Central Examination Organisation (CEO) under the Directorate General of Civil Aviation (DGCA). It serves as a unique candidate ID for all flight crew examinations conducted by DGCA.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Think of it as your official examination identity. Every time you register for a DGCA exam, your Computer Number is used to track your applications, examination records, and results.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Unlike an examination roll number, the Computer Number is issued only once and remains associated with your aviation records throughout your professional career.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Whether you plan to become a commercial airline pilot, flight instructor, or airline transport pilot, obtaining this number is one of the earliest and most important milestones in your pilot training journey.
                            </p>

                            {/* Why Important */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Why is a DGCA Computer Number Important?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                A DGCA Computer Number is more than just an identification number. It acts as the foundation of your licensing process and enables you to participate in DGCA examinations required for obtaining pilot licenses.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">Without a valid Computer Number, candidates cannot:</p>
                            <ul className="space-y-2 mb-4">
                                {withoutComputerNumberList.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Since every examination attempt is linked to this number, candidates should ensure that all submitted information is accurate before applying.
                            </p>

                            {/* Key Highlights table */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-4">Key Highlights of DGCA Computer Number</h2>
                            <div className="overflow-x-auto mb-10">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="text-left p-3 font-montserrat font-bold">Particular</th>
                                            <th className="text-left p-3 font-montserrat font-bold">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {keyHighlights.map(([particular, details], i) => (
                                            <tr key={particular} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{particular}</td>
                                                <td className="p-3 text-gray-600 align-top">{details}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Who Needs */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Who Needs a DGCA Computer Number?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                A Computer Number is required by candidates pursuing various pilot licences and aviation careers in India.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">You should apply for a DGCA Computer Number if you are planning to:</p>
                            <ul className="space-y-2 mb-4">
                                {whoNeeds.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Students who have recently completed Class 12 and wish to begin their pilot training should obtain their Computer Number early to avoid delays in examination registration.
                            </p>

                            {/* Benefits */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Benefits of Having a DGCA Computer Number</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Obtaining your Computer Number early offers several advantages throughout your aviation career.
                            </p>
                            <div className="space-y-4 mb-10">
                                {benefits.map((b) => (
                                    <div key={b.num} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{b.num}</span>
                                        <span><span className="font-semibold text-av-blue">{b.title}:</span> {b.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Who Can Apply */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Who Can Apply for a DGCA Computer Number?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Candidates planning to pursue pilot training can apply if they meet the eligibility criteria prescribed by DGCA.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">Generally, applicants should:</p>
                            <ul className="space-y-2 mb-4">
                                {whoCanApply.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Applicants should carefully review document requirements before submission to minimize the possibility of rejection or delays.
                            </p>

                            {/* Documents Required */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Documents Required for DGCA Computer Number</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Preparing the correct documents before beginning your application significantly reduces processing time.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">The commonly required documents include:</p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                {documentCategories.map((cat) => (
                                    <div key={cat.title}>
                                        <p className="font-semibold text-av-blue text-sm mb-2">{cat.title}</p>
                                        <ul className="space-y-1">
                                            {cat.items.map((item, i) => (
                                                <li key={i} className="flex gap-2 items-start text-xs text-gray-600">
                                                    <span className="text-av-orange flex-shrink-0">–</span>{item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <p className="font-semibold text-av-blue text-sm mb-2">Additional Documents (if applicable)</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Depending on the applicant's educational background or personal circumstances, additional supporting documents such as name change affidavits, equivalence certificates, or other officially recognized records may be required. Ensure that the details across all documents are consistent.
                            </p>

                            {/* Tips Before Uploading */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Tips Before Uploading Documents</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">Before submitting your application, keep these best practices in mind:</p>
                            <ul className="space-y-2 mb-4">
                                {tipsBeforeUploading.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Paying attention to these details can help avoid delays during verification.
                            </p>

                            {/* Common Reasons Delayed */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Common Reasons Why Applications Get Delayed or Rejected</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">Many applications face delays due to avoidable errors.</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">Some common reasons include:</p>
                            <ul className="space-y-2 mb-4">
                                {delayReasons.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Review every section carefully before submission to improve the chances of smooth processing.
                            </p>

                            {/* Why Choose We One Aviation */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Why Choose We One Aviation?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Applying for a DGCA Computer Number may seem straightforward, but even small documentation errors can delay your pilot training timeline. At We One Aviation, our experienced aviation counsellors help students understand the registration process, prepare the required documents, and plan the next steps toward earning a Commercial Pilot License.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Our support goes beyond registration—we guide aspiring pilots through DGCA ground classes, CPL planning, career counselling, and airline-focused training, helping them progress with confidence.
                            </p>

                            {/* How to Apply */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">How to Apply for a DGCA Computer Number Online?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Applying for a DGCA Computer Number is a completely online process through the DGCA's examination portal. Before starting the application, ensure that all your educational certificates, identity proof, photograph, and signature are ready in the prescribed format.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Following the correct process and uploading accurate documents can help avoid delays or rejection.
                            </p>

                            <div className="space-y-4 mb-10">
                                {applicationSteps.map((step) => (
                                    <div key={step.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {step.num}
                                            </span>
                                            <h3 className="font-montserrat font-bold text-white text-sm">Step {step.num}: {step.title}</h3>
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

                            {/* How Long */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">How Long Does It Take to Get a DGCA Computer Number?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                The processing time depends on document verification and application accuracy.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Applications with complete and accurate documents are generally processed faster, while incomplete applications may require additional verification.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">To avoid delays:</p>
                            <ul className="space-y-2 mb-10">
                                {avoidDelaysTips.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Check Status */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">How to Check DGCA Computer Number Application Status</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                After submitting your application, you can monitor its progress through the DGCA examination portal.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">The status may indicate stages such as:</p>
                            <ul className="space-y-2 mb-4">
                                {statusStages.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                If clarification is requested, respond as soon as possible to prevent further delays.
                            </p>

                            {/* Rejection Reasons */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Common Reasons for DGCA Computer Number Rejection</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">Many applications are rejected due to preventable errors.</p>
                            <div className="space-y-4 mb-10">
                                {rejectionReasons.map((r) => (
                                    <div key={r.num} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {r.num}
                                            </span>
                                            <h3 className="font-montserrat font-bold text-white text-sm">{r.title}</h3>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs leading-relaxed mb-2">{r.desc}</p>
                                            <p className="text-av-orange text-xs font-semibold leading-relaxed">Solution: {r.solution}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tips No Delay */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Tips to Get Your DGCA Computer Number Without Delays</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">Following these best practices can improve the chances of a smooth application process:</p>
                            <ul className="space-y-2 mb-10">
                                {noDelayTips.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* After Approval */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Happens After Receiving Your DGCA Computer Number?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                After approval, your Computer Number becomes your permanent identification for DGCA Flight Crew examinations.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">You can then proceed with the next stages of your aviation journey, including:</p>
                            <ul className="space-y-2 mb-10">
                                {afterApproval.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* vs eGCA */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">DGCA Computer Number vs eGCA Registration</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Many students confuse a DGCA Computer Number with an eGCA account, but they serve different purposes.
                            </p>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="text-left p-3 font-montserrat font-bold">DGCA Computer Number</th>
                                            <th className="text-left p-3 font-montserrat font-bold">eGCA Registration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonTable.map(([left, right], i) => (
                                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-600 align-top">{left}</td>
                                                <td className="p-3 text-gray-600 align-top">{right}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Understanding the distinction helps candidates navigate the DGCA ecosystem more effectively.
                            </p>

                            {/* Expert Tips */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Expert Tips from We One Aviation</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                At We One Aviation, we have guided numerous aspiring pilots through the initial stages of their aviation careers. Based on common challenges faced by students, we recommend:
                            </p>
                            <ul className="space-y-2 mb-4">
                                {expertTips.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Proper planning at this stage can save valuable time later in your pilot training journey.
                            </p>

                            {/* Begin Your Journey */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Begin Your Pilot Journey with We One Aviation</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                A DGCA Computer Number is the first official step toward achieving your dream of becoming a professional pilot. Completing the application accurately helps ensure a smoother path to DGCA examinations, pilot training, and licensing.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">At We One Aviation, we support aspiring pilots with:</p>
                            <ul className="space-y-2 mb-6">
                                {weOneOffers.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Whether you're just beginning your aviation journey or preparing for DGCA examinations, our experienced team is here to guide you every step of the way.
                            </p>

                            {/* Suggested Internal Links */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Suggested Internal Links</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                To strengthen your site's topical authority and improve user navigation, naturally link this page to:
                            </p>
                            <ul className="space-y-2 mb-10">
                                {suggestedInternalLinks.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Frequently Asked Questions (combined, bottom of page) */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-5">Frequently Asked Questions</h2>
                            <div className="space-y-4 mb-10">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="border border-gray-200 rounded-xl p-4">
                                        <p className="font-semibold text-av-blue text-sm mb-1">{faq.q}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
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
                                    <li>✓ Class 10 & 12 Marksheets</li>
                                    <li>✓ Aadhaar Card / Passport</li>
                                    <li>✓ PAN Card (where applicable)</li>
                                    <li>✓ Address Proof</li>
                                    <li>✓ Passport-size Photograph</li>
                                    <li>✓ Signature</li>
                                    <li>✓ Valid Email & Mobile Number</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Key Facts</h4>
                                <p className="text-white/80 text-sm mb-3">DGCA Computer Number:</p>
                                <div className="text-2xl font-montserrat font-black">Lifetime</div>
                                <div className="text-white/70 text-xs mt-1">Mandatory for CPL, PPL, ATPL</div>
                                <div className="text-white/70 text-xs mt-1">One Number Per Candidate</div>
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