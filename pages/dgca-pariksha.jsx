import Link from 'next/link';
import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import { generateFAQSchema } from '../lib/schema';

const faqItems = [
    {
        q: 'What is DGCA Pariksha?',
        a: 'DGCA Pariksha is the official online examination portal managed by the Central Examination Organisation (CEO) under the Directorate General of Civil Aviation. It allows candidate pilots and aircraft maintenance engineers in India to apply for, schedule, and view results for mandatory licensing examinations.',
    },
    {
        q: 'How do I register for DGCA Pariksha?',
        a: 'Registration requires an approved DGCA Computer Number. Candidates log into the portal, upload required identification and qualification documents, submit signatures and photographs following official specifications, and await profile verification by the Central Examination Organisation.',
    },
    {
        q: 'How can I log in to the DGCA examination portal?',
        a: 'Visit the official Pariksha portal, enter your registered User ID (or Computer Number) along with your password, solve the security CAPTCHA, and submit. Ensure your browser allows pop-ups and scripts for the portal to function properly.',
    },
    {
        q: 'Is a Computer Number required for DGCA examinations?',
        a: 'Yes. A valid DGCA Computer Number is a mandatory prerequisite before you can register on the Pariksha portal or apply for any pilot licensing examination.',
    },
    {
        q: 'What is the difference between eGCA and DGCA Pariksha?',
        a: 'eGCA is the overarching digital portal handling pilot licensing, medical assessments, logbooks, and regulatory approvals. DGCA Pariksha specifically handles ground subject examinations, seat allocation, exam schedules, hall tickets, and exam results.',
    },
    {
        q: 'How can I apply for DGCA examinations?',
        a: 'Once an examination session notification is released, log into your Pariksha candidate profile, select the open session, choose your required subjects and preferred exam centre, pay the prescribed fee online, and submit the application before the deadline.',
    },
    {
        q: 'Where can I check DGCA examination fees?',
        a: 'Exam fees are listed in the official DGCA Public Notices and session schedules released prior to each exam quarter. Payment is processed directly through the Bharatkosh portal integrated into the examination system.',
    },
    {
        q: 'How can I download my DGCA admit card?',
        a: 'Log into your candidate portal 7 to 10 days before your scheduled examination date. Navigate to the “Admit Card” section, verify your exam details, download the PDF admit card, and print a clear physical copy.',
    },
    {
        q: 'How can I check DGCA examination results?',
        a: 'Results are published on the official Pariksha portal after grading is complete. Candidates can check individual mark breakdowns inside their candidate portal or view public result schedules published on the official website.',
    },
    {
        q: 'What should I do if I cannot log in?',
        a: 'Verify that your caps lock is off and your credentials are accurate. Try clearing browser cache or using an incognito window. If the account is locked, use the “Forgot Password” link to reset your credentials via your registered email.',
    },
    {
        q: 'What happens if my examination payment is unsuccessful?',
        a: 'If money is deducted but your status shows pending, wait 24 to 48 hours for bank reconciliation before paying again. Check your transaction history inside the portal or contact the portal technical support line with your transaction reference number.',
    },
    {
        q: 'How many subjects are required for CPL?',
        a: 'Commercial Pilot License candidates must pass Air Navigation, Air Meteorology, Air Regulations, Aviation Technical General, and Technical Specific examinations, along with Radio Telephony Restricted (RTR-A) conducted by WPC.',
    },
    {
        q: 'Where can I find the DGCA CPL syllabus?',
        a: 'You can view the complete subject breakdown and topic distribution on our dedicated Commercial Pilot License Syllabus page or consult Civil Aviation Requirements (CAR) Section 7 Series G.',
    },
    {
        q: 'Can I prepare for DGCA examinations online?',
        a: 'Yes. Interactive live classes, mock exam simulators, and guided study modules allow students across India to prepare thoroughly for DGCA ground tests.',
    },
    {
        q: 'Where can I get help preparing for DGCA ground subjects?',
        a: 'We One Aviation provides structured ground training conducted by experienced flight instructors and subject experts in Dwarka, Delhi, as well as live online classes.',
    },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://weoneaviation.in/dgca-pariksha/#article',
    isPartOf: {
        '@type': 'WebPage',
        '@id': 'https://weoneaviation.in/dgca-pariksha',
    },
    headline: 'DGCA Pariksha: Registration, Login, Exam Application, Fees and Complete Guide',
    description: 'Comprehensive guide for commercial pilot candidates navigating the Directorate General of Civil Aviation (DGCA) examination portal.',
    publisher: {
        '@type': 'Organization',
        name: 'We One Aviation',
        url: 'https://weoneaviation.in/',
    },
    inLanguage: 'en-IN',
};

const officialPortal = 'https://pariksha.dgca.gov.in/';

const checklist = [
    'An approved DGCA Computer Number.',
    'An active, accessible personal email address and mobile number.',
    'Scanned soft copies of educational marksheets (10th and 12th standard with Physics and Mathematics).',
    'A recent passport-sized photograph and signature scan meeting official pixel size and format requirements.',
];

const registrationSteps = [
    'Access the official Pariksha registration link during open administrative windows.',
    'Enter your assigned Computer Number, full legal name, date of birth, and official email ID exactly as registered during your computer number application.',
    'Validate your details using the One-Time Password (OTP) sent to your registered email and mobile number.',
    'Upload required personal identification documents along with your photograph and signature scan.',
    'Create a secure password adhering to portal complexity rules.',
    'Submit your profile for verification by the CEO office. Profile activation usually occurs after system and staff verification.',
];

const examSubjects = [
    { subject: 'Air Navigation', href: '/air-navigation', description: 'Covers practical flight planning, dead reckoning, radio navigation aids, mass and balance calculations, and flight performance dynamics.' },
    { subject: 'Air Meteorology', href: '/aviation-meteorology', description: 'Focuses on atmospheric thermodynamics, weather systems, cloud structures, METAR/TAF interpretation, hazards, and jet streams.' },
    { subject: 'Air Regulations', href: '/air-regulations', description: 'Teaches international and Indian civil aviation laws, rules of the air, airspace classifications, ATC procedures, and operational regulations.' },
    { subject: 'Technical General', href: '/technical-general', description: 'Details airframe construction, aircraft engines, electrical systems, hydraulics, flight control mechanisms, and cockpit instrumentation.' },
    { subject: 'Technical Specific', description: 'Evaluates specific technical mechanics, operational limits, and emergency procedures for a particular aircraft type (e.g., Cessna 172 or Piper Seneca).' },
    { subject: 'Radio Telephony Restricted (RTR-A)', href: '/rtr-a', description: 'Evaluates pilot radio transmission procedures and aviation communication jargon. (Conducted separately by the Wireless Monitoring Organisation under the WPC wing).' },
];

const troubleshootingRows = [
    ['Unable to Log In', 'Incorrect User ID/Password; Browser caching errors; Suspended profile.', 'Caps lock key status; Password accuracy; Browser incognito mode.', 'Use “Forgot Password” link on login screen; clear browser history.'],
    ['Registration Incomplete', 'Incomplete uploaded files; Discrepancy between marksheets & application.', 'File sizes (under mandatory KB limits); Spelling of full name.', 'Re-crop photo/signature scans; ensure names match official marksheets.'],
    ['Computer Number Not Linked', 'Mismatch in demographic details; Profile verification still pending.', 'CEO computer number approval letter details versus profile text.', 'Allow 5–7 working days for administrative database syncing; write to CEO support.'],
    ['Payment Failed / Debited', 'Bank server timeout; Session timeout during gateway transfer.', 'Bank account statement; Debited transaction reference number.', 'Wait 24–48 hours for automatic status reconciliation before retrying.'],
    ['Exam Application Unavailable', 'Session window closed; Computer Number not verified; Age/qualification limits.', 'Official DGCA session public notice for open application dates.', 'Confirm application window dates; ensure profile state shows “Approved”.'],
    ['Admit Card Not Generating', 'Fee payment not reflected; Application not fully submitted; Exam center assignment pending.', 'Application status tab in candidate portal (must state “Paid”).', 'Verify payment receipt; write to CEO exam section email with transaction proof.'],
    ['Result Not Displayed', 'Marking process under review; Result withheld due to documentation mismatch.', 'Public result notices; Candidate message notifications.', 'Check public PDF result listings; contact CEO helpdesk if roll number is missing.'],
];

function ContentSection({ title, children, className = '' }) {
    return (
        <section className={`py-10 ${className}`}>
            <h2 className="mb-4 font-montserrat text-2xl font-bold text-av-blue md:text-3xl">{title}</h2>
            <div className="space-y-4 text-sm leading-7 text-gray-700">{children}</div>
        </section>
    );
}

function NumberedList({ items }) {
    return (
        <ol className="list-decimal space-y-3 pl-6">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ol>
    );
}

export default function DGCAParikshaPage() {
    return (
        <Layout
            title="DGCA Pariksha Guide: Registration, Login, Exam Application & Fees"
            description="Complete guide to DGCA Pariksha for CPL candidates. Learn registration steps, exam login, applying for sessions, fee structures, admit card downloads, and results."
            canonical="/dgca-pariksha"
            includeDefaultFAQs={false}
            solidNavbar
            tickerInFlow
        >
            <StructuredData data={[articleSchema, generateFAQSchema(faqItems)]} />

            <article className="mx-auto max-w-5xl px-4 py-12 md:py-16">
                <header className="mb-8 border-b border-gray-200 pb-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-av-orange">DGCA Examination Guide</p>
                    <h1 className="font-montserrat text-3xl font-black leading-tight text-av-blue md:text-5xl">
                        DGCA Pariksha: Registration, Login, Exam Application, Fees and Complete Guide
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-700">
                        A <Link className="font-semibold text-av-orange underline" href="/commercial-pilot-license">Commercial Pilot License (CPL)</Link> in India demands rigorous theoretical knowledge alongside practical flight hours. The Central Examination Organisation (CEO), functioning under the Directorate General of Civil Aviation (DGCA), assesses this theoretical understanding through computer-based examinations.
                    </p>
                    <p className="mt-4 text-base leading-7 text-gray-700">
                        All candidate pilot applications, scheduling, seat bookings, admit cards, and examination results are managed through the official DGCA Pariksha portal. Navigating this portal efficiently avoids administrative delays and ensures your flight training stays on schedule. This guide walks you through every stage of the Pariksha portal workflow—from registering your profile to clearing your final ground subject.
                    </p>
                </header>

                <ContentSection title="What Is DGCA Pariksha?">
                    <p>
                        DGCA Pariksha is the dedicated electronic examination management portal operated by the Central Examination Organisation (CEO). Its primary responsibility is managing national pilot licensing examinations across established testing centres in India.
                    </p>
                    <p>
                        Passing these theoretical examinations is a regulatory prerequisite for issuing private, commercial, and airline transport pilot licences. Candidates must demonstrate proficiency in ground subjects before or during flight training to ensure they understand atmospheric physics, aviation law, navigation mathematics, and aircraft systems.
                    </p>
                    <div className="grid gap-5 rounded-xl bg-gray-50 p-5 md:grid-cols-2">
                        <div>
                            <h3 className="mb-3 font-bold text-av-blue">eGCA (Main Regulatory Portal)</h3>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Computer Numbers</li><li>Medical Assessments</li><li>Pilot Logbooks</li><li>License Issuance</li><li>Rating Endorsements</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-3 font-bold text-av-blue">DGCA Pariksha (Exam Organisation)</h3>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Online Exam Sessions</li><li>Candidate Login</li><li>Seat Reservation</li><li>Hall Tickets &amp; Cards</li><li>Ground Subject Marks</li>
                            </ul>
                        </div>
                    </div>
                </ContentSection>

                <ContentSection title="The Difference Between eGCA and DGCA Pariksha" className="border-t border-gray-100">
                    <p>While both portals belong to the Indian civil aviation regulatory ecosystem, they serve distinct operational functions:</p>
                    <ul className="list-disc space-y-3 pl-6">
                        <li><strong><Link className="text-av-orange underline" href="/egca-login">eGCA (e-Governance for Civil Aviation)</Link>:</strong> The primary digital platform handling medical assessments, computer number generation, e-logbooks, flight school tracking, and license issuance. For a walkthrough, see our <Link className="text-av-orange underline" href="/egca-login">eGCA login guide</Link>.</li>
                        <li><strong>DGCA Pariksha:</strong> The specialized sub-portal dedicated strictly to ground subject examinations, seat allocation, hall tickets, session scheduling, and candidate scorecards.</li>
                    </ul>
                </ContentSection>

                <ContentSection title="DGCA Pariksha Registration Process" className="border-t border-gray-100">
                    <p>Before applying for an examination session, candidates must set up an active profile on the Pariksha candidate portal. Registration is a one-time setup that links your regulatory profile with your examination record.</p>
                    <h3 className="font-bold text-av-blue">Prerequisites</h3>
                    <ul className="list-disc space-y-2 pl-6">
                        {checklist.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <h3 className="font-bold text-av-blue">Step-by-Step Profile Registration</h3>
                    <NumberedList items={registrationSteps} />
                    <h3 className="font-bold text-av-blue">Common Registration Errors to Avoid</h3>
                    <ul className="space-y-3">
                        <li><strong>Name Mismatches:</strong> Entering names differently from Class 10/12 marksheets or Computer Number approval certificates will cause system rejection.</li>
                        <li><strong>Image Sizing Issues:</strong> Uploading uncropped photographs or blurred signature scans stalls approval. Follow the exact DPI and file size limits (typically JPEG/PNG format, under specified KB limits) listed on the upload page.</li>
                        <li><strong>Inaccessible Email Accounts:</strong> Registering with temporary or rarely checked email accounts leads to missed exam notifications, seat confirmations, and password reset links.</li>
                    </ul>
                </ContentSection>

                <ContentSection title="DGCA Pariksha Login Process" className="border-t border-gray-100">
                    <p>Registered candidates access their portal for candidate history, seat availability, admit cards, and published results.</p>
                    <h3 className="font-bold text-av-blue">Accessing the Portal</h3>
                    <NumberedList items={[
                        <>Navigate directly to the official portal landing page: <a className="text-av-orange underline" href={officialPortal} target="_blank" rel="noopener noreferrer">DGCA Pariksha Portal</a>.</>,
                        'Select Candidate Login from the main navigation interface.',
                        'Input your registered User ID (or Computer Number) and Password.',
                        'Solve the visual CAPTCHA code shown on screen.',
                        'Click Login to enter your candidate dashboard.',
                    ]} />
                    <h3 className="font-bold text-av-blue">Troubleshooting Login Errors</h3>
                    <ul className="list-disc space-y-2 pl-6">
                        <li><strong>Invalid Credentials:</strong> Verify that Caps Lock is disabled. If login continues to fail, use the Forgot Password tool on the homepage. Reset instructions are dispatched instantly to your registered email.</li>
                        <li><strong>Account Lockout:</strong> Repeated incorrect login attempts block access for security reasons. Wait for the mandatory lockout duration (typically 30 to 60 minutes) before attempting a reset.</li>
                        <li><strong>Page Script and Browser Errors:</strong> The Pariksha portal functions best on desktop browsers like modern Chrome, Edge, or Firefox. Clear your browser cache and cookies, or open an incognito session if buttons freeze during submission.</li>
                    </ul>
                </ContentSection>

                <ContentSection title="DGCA Computer Number" className="border-t border-gray-100">
                    <p>A DGCA Computer Number is a unique regulatory identifier assigned to aspiring aviators by the Central Examination Organisation. It serves as your permanent index number for all theoretical examinations, flight test endorsements, and license applications.</p>
                    <p>You cannot register on the Pariksha portal or apply for pilot ground subject exams without an active Computer Number.</p>
                    <p>For a complete guide on eligibility rules, document verification, board equivalence certificates, and application steps, read our <Link className="font-semibold text-av-orange underline" href="/dgca-computer-number">detailed guide to applying for a DGCA Computer Number</Link>.</p>
                </ContentSection>

                <ContentSection title="How to Apply for DGCA Examinations" className="border-t border-gray-100">
                    <p>Ground examinations are conducted quarterly (On-Demand and General Sessions). CEO publishes official Public Notices announcing session registration windows, exam dates, and seat matrix allocations.</p>
                    <h3 className="font-bold text-av-blue">Application Walkthrough</h3>
                    <ol className="list-decimal space-y-3 pl-6">
                        <li><strong>Monitor Announcements:</strong> Check the portal regularly for Public Notices detailing session schedules and opening times for registration.</li>
                        <li><strong>Dashboard Selection:</strong> Log into your profile during the candidate application window and click Apply for Examination.</li>
                        <li><strong>Choose Subject &amp; Category:</strong> Select the appropriate licensing category (e.g., CPL Aircraft) and choose the specific ground subject you intend to sit for.</li>
                        <li><strong>Select Exam Centre &amp; Slot:</strong> Select your preferred testing city and preferred time slot from available vacancies. Slots fill rapidly; booking early in the window is advised.</li>
                        <li><strong>Review Details:</strong> Carefully double-check your chosen exam center, language medium, and subject selection. Once payment is initiated, subject and centre choices are locked.</li>
                        <li><strong>Complete Online Payment:</strong> Process the exam fee through the integrated online payment gateway.</li>
                        <li><strong>Verify Final Application Status:</strong> Confirm that your application state changes to Submitted/Paid in your application history tab, and download your payment acknowledgement receipt.</li>
                    </ol>
                </ContentSection>

                <ContentSection title="DGCA Examination Fees" className="border-t border-gray-100">
                    <p>Examination fees are set by regulatory directives and processed through integrated government payment gateways (Bharatkosh).</p>
                    <ul className="list-disc space-y-2 pl-6">
                        <li><strong>Current Fee Rules:</strong> Fees are assessed on a per-subject basis. Candidates should verify exact, current fee amounts from the official DGCA Public Notice issued for each examination cycle.</li>
                        <li><strong>Payment Processing:</strong> Payments are made online using debit cards, credit cards, net banking, or UPI via Bharatkosh integration.</li>
                    </ul>
                    <h3 className="font-bold text-av-blue">Handling Payment Deductions Without Receipt</h3>
                    <p>If funds are debited from your bank account but your Pariksha dashboard shows Payment Pending or Failed:</p>
                    <ol className="list-decimal space-y-2 pl-6">
                        <li>Do not initiate immediate duplicate payments.</li>
                        <li>Wait 24 to 48 hours for automated banking reconciliation to update the transaction status.</li>
                        <li>Check your bank transaction statement for a Bharatkosh transaction reference number.</li>
                        <li>If the status remains unpaid after 48 hours, contact the CEO helpdesk with your reference number and Computer Number before the registration window closes.</li>
                    </ol>
                </ContentSection>

                <ContentSection title="DGCA Exam Admit Card" className="border-t border-gray-100">
                    <p>Admit cards (Hall Tickets) are generated digitally several days before the start of an examination session.</p>
                    <h3 className="font-bold text-av-blue">Access and Download</h3>
                    <ol className="list-decimal space-y-2 pl-6">
                        <li>Log into the Pariksha portal 7 to 10 days before your scheduled examination date.</li>
                        <li>Navigate to the Admit Card / Hall Ticket tab.</li>
                        <li>Click Download Admit Card to save the document as a PDF.</li>
                    </ol>
                    <h3 className="font-bold text-av-blue">Critical Verification Checks</h3>
                    <p>Verify that all details on your admit card match your official identification:</p>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>Candidate Name and Computer Number</li><li>Subject, Exam Center Name, and Full Address</li><li>Exam Date, Batch Time, and Reporting Time</li><li>Candidate Photograph and Signature Clarity</li>
                    </ul>
                    <p>If you spot errors or your admit card fails to generate despite a confirmed application, submit a query to the CEO technical help desk immediately.</p>
                </ContentSection>

                <ContentSection title="Examination Day Guidelines" className="border-t border-gray-100">
                    <p>Candidate pilots must bring the following items to the examination venue:</p>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>Two clean, high-resolution physical printouts of the Admit Card.</li>
                        <li>Original government-issued photo identity card (Aadhaar Card, Passport, or Voter ID).</li>
                        <li>Original DGCA Computer Number allotment letter (if requested).</li>
                        <li>Standard non-programmable writing materials (refer to specific exam guidelines regarding scientific calculators or navigation plotters for Air Navigation modules).</li>
                    </ul>
                    <p>Electronic devices, smartwatches, mobile phones, and unauthorized reference material are strictly prohibited inside the hall.</p>
                </ContentSection>

                <ContentSection title="DGCA Exam Results" className="border-t border-gray-100">
                    <p>Following computer-based testing, answer keys are processed through automated evaluation systems. Results are declared publicly on the portal weeks after the examination window closes.</p>
                    <h3 className="font-bold text-av-blue">Accessing Marks and Verification</h3>
                    <ul className="list-disc space-y-2 pl-6">
                        <li><strong>Portal Result View:</strong> Log into your candidate profile and navigate to View Results / Score Card to view your score percentage and pass/fail standing.</li>
                        <li><strong>Passing Criteria:</strong> Ground examinations require a minimum score of 70% to clear a subject.</li>
                        <li><strong>Public Schedules:</strong> CEO also releases comprehensive session result sheets listing candidate performance by Computer Number.</li>
                    </ul>
                </ContentSection>

                <ContentSection title="DGCA Examination Subjects and Syllabus" className="border-t border-gray-100">
                    <p>Commercial Pilot License (CPL) ground preparation covers five core theoretical subjects conducted by the DGCA, alongside a dedicated radio communications paper handled by the Ministry of Communications:</p>
                    <ul className="space-y-4">
                        {examSubjects.map(({ subject, href, description }) => (
                            <li key={subject}><strong>{href ? <Link className="text-av-orange underline" href={href}>{subject}</Link> : subject}:</strong> {description}</li>
                        ))}
                    </ul>
                    <p>To study the complete topic breakdown, chapter weightage, and current reference material, visit our complete <Link className="font-semibold text-av-orange underline" href="/commercial-pilot-license-syllabus">Commercial Pilot License (CPL) Syllabus Guide</Link> or consult <a className="text-av-orange underline" href="https://www.dgca.gov.in/digigov-portal/" target="_blank" rel="noopener noreferrer">Civil Aviation Requirements (CAR) Section 7 Series G</a>.</p>
                </ContentSection>

                <ContentSection title="Troubleshooting Common DGCA Pariksha Issues" className="border-t border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] border-collapse text-left text-xs">
                            <thead><tr className="bg-av-blue text-white">
                                <th className="p-3">Issue Experienced</th><th className="p-3">Possible Causes</th><th className="p-3">What Candidate Should Check</th><th className="p-3">Action / Escalation Route</th>
                            </tr></thead>
                            <tbody>
                                {troubleshootingRows.map((row) => (
                                    <tr key={row[0]} className="border-b border-gray-200 odd:bg-white even:bg-gray-50">
                                        {row.map((cell) => <td key={cell} className="p-3 align-top">{cell}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ContentSection>

                <ContentSection title="How to Prepare for DGCA Examinations" className="border-t border-gray-100">
                    <p>Ground exams assess operational knowledge under strict time constraints. Rote memorisation is rarely enough—exams focus on practical scenarios, flight calculations, and regulatory application.</p>
                    <h3 className="font-bold text-av-blue">Strategic Preparation Guidelines</h3>
                    <ul className="list-disc space-y-3 pl-6">
                        <li><strong>Understand Syllabus Foundations:</strong> Start with the underlying principles of atmospheric physics, flight dynamics, and civil aviation rules rather than jumping straight into question banks.</li>
                        <li><strong>Structure Your Timeline:</strong> Dedicate focused preparation blocks to each subject. Air Navigation and Technical General typically require longer, math-heavy preparation periods.</li>
                        <li><strong>Practice Under Timed Conditions:</strong> Take timed mock examinations to build speed and accuracy. Online platforms like <a className="text-av-orange underline" href="https://www.dgcaexam.com/" target="_blank" rel="noopener noreferrer">DGCAExam.com</a> allow candidates to attempt practice papers patterned after the computer-based testing format.</li>
                        <li><strong>Analyze Errors systematically:</strong> When attempting mock tests, review incorrect answers to uncover and fix fundamental conceptual gaps.</li>
                    </ul>
                </ContentSection>

                <ContentSection title="Preparing with We One Aviation" className="border-t border-gray-100">
                    <p>We One Aviation provides structured ground training for candidates preparing for DGCA pilot examinations.</p>
                    <ul className="list-disc space-y-3 pl-6">
                        <li><strong><Link className="text-av-orange underline" href="/dgca-ground-classes">Classroom Ground Classes</Link>:</strong> In-person coaching at our academy in Dwarka, New Delhi, led by ground instructors and experienced aviation professionals.</li>
                        <li><strong><Link className="text-av-orange underline" href="/online-dgca-ground-classes">Online Interactive Classes</Link>:</strong> Real-time distance learning options designed for students living outside the National Capital Region or balancing flight training hours.</li>
                        <li><strong>Structured Module Materials:</strong> Access systematically compiled subject notes, numerical practice problem sets, and targeted exam revision sessions.</li>
                    </ul>
                    <p>Learn more about our upcoming classroom batch dates or online modules by visiting the <Link className="font-semibold text-av-orange underline" href="/">We One Aviation main aviation training portal</Link>.</p>
                </ContentSection>

                <section className="border-t border-gray-100 py-10" aria-labelledby="pariksha-faq">
                    <h2 id="pariksha-faq" className="mb-6 font-montserrat text-2xl font-bold text-av-blue md:text-3xl">Frequently Asked Questions</h2>
                    <div className="space-y-5">
                        {faqItems.map(({ q, a }) => (
                            <section key={q}>
                                <h3 className="font-bold text-av-blue">{q}</h3>
                                <p className="mt-1 text-sm leading-7 text-gray-700">{a}</p>
                            </section>
                        ))}
                    </div>
                </section>
            </article>
        </Layout>
    );
}
