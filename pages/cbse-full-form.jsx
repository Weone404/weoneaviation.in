import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '1929', label: 'Established', icon: '🏛️' },
    { num: '27,000+', label: 'Affiliated Schools', icon: '🏫' },
    { num: '240+', label: 'Schools Abroad', icon: '🌐' },
    { num: '28+', label: 'Countries', icon: '🌍' },
];

const gradingClass10 = [
    { sr: 1, range: '91–100', grade: 'A1', point: '10.0' },
    { sr: 2, range: '81–90', grade: 'A2', point: '9.0' },
    { sr: 3, range: '71–80', grade: 'B1', point: '8.0' },
    { sr: 4, range: '61–70', grade: 'B2', point: '7.0' },
    { sr: 5, range: '51–60', grade: 'C1', point: '6.0' },
    { sr: 6, range: '41–50', grade: 'C2', point: '5.0' },
    { sr: 7, range: '33–40', grade: 'D', point: '4.0' },
    { sr: 8, range: '21–32', grade: 'E1', point: 'Fail' },
    { sr: 9, range: '00–20', grade: 'E2', point: 'Fail' },
];

const gradingClass12 = [
    { sr: 1, range: '91–100', grade: 'A1' },
    { sr: 2, range: '81–90', grade: 'A2' },
    { sr: 3, range: '71–80', grade: 'B1' },
    { sr: 4, range: '61–70', grade: 'B2' },
    { sr: 5, range: '51–60', grade: 'C1' },
    { sr: 6, range: '41–50', grade: 'C2' },
    { sr: 7, range: '33–40', grade: 'D' },
    { sr: 8, range: 'Below 33', grade: 'E (Fail)' },
];

const regionalOffices = [
    { region: 'Ajmer', address: 'Todarmal Marg, Ajmer – 305001, Rajasthan', states: 'Rajasthan, Gujarat, Daman & Diu, Dadra & Nagar Haveli', contact: '0145-2627460', email: 'roajmer.cbse@nic.in' },
    { region: 'Bengaluru', address: 'No. 3, HMT Link Road, Mathikere, Bengaluru – 560054', states: 'Karnataka, Andhra Pradesh, Telangana', contact: '080-23621690', email: 'robangalore.cbse@nic.in' },
    { region: 'Bhopal', address: 'Shivaji Nagar, Bhopal – 462011', states: 'Madhya Pradesh, Chhattisgarh', contact: '0755-2553547', email: 'robhopal.cbse@nic.in' },
    { region: 'Bhubaneswar', address: 'Plot No. 9, Govt. Colony, Unit IX, Bhubaneswar – 751022', states: 'Odisha, West Bengal, Jharkhand', contact: '0674-2390027', email: 'robhuban.cbse@nic.in' },
    { region: 'Chennai', address: 'Plot No. 3, Sholinganallur, Chennai – 600119', states: 'Tamil Nadu, Kerala, Andhra Pradesh (part), Puducherry', contact: '044-26161100', email: 'rochennai.cbse@nic.in' },
    { region: 'Dehradun', address: 'Sector 5, Dharampur, Dehradun – 248001', states: 'Uttarakhand, Uttar Pradesh (part)', contact: '0135-2757762', email: 'rodehradun.cbse@nic.in' },
    { region: 'Delhi East', address: 'Patparganj, Delhi – 110092', states: 'East Delhi, North East Delhi, Shahdara', contact: '011-22508252', email: 'rodelhieast.cbse@nic.in' },
    { region: 'Delhi West', address: 'Rouse Avenue, Institutional Area, Delhi – 110002', states: 'West Delhi, Central Delhi, South West Delhi', contact: '011-22236735', email: 'rodelhiwest.cbse@nic.in' },
    { region: 'Delhi South', address: 'Defence Colony, New Delhi – 110024', states: 'South Delhi, South East Delhi', contact: '011-26475534', email: 'rodelhisouth.cbse@nic.in' },
    { region: 'Guwahati', address: 'Railway Colony, Bamunimaidam, Guwahati – 781021', states: 'Assam, Arunachal Pradesh, Nagaland, Manipur, etc.', contact: '0361-2653839', email: 'roguwahati.cbse@nic.in' },
    { region: 'Panchkula', address: 'Sector 5, Panchkula – 134152, Haryana', states: 'Haryana, Chandigarh, Punjab, Himachal Pradesh, J&K', contact: '0172-2585177', email: 'ropanchkula.cbse@nic.in' },
    { region: 'Patna', address: 'Sadanand Vihar, Patna – 800020', states: 'Bihar, Jharkhand (partial)', contact: '0612-2295048', email: 'ropatna.cbse@nic.in' },
    { region: 'Prayagraj', address: 'Civil Lines, Prayagraj – 211001', states: 'Uttar Pradesh (except Western UP)', contact: '0532-2260359', email: 'roallahabad.cbse@nic.in' },
    { region: 'Thiruvananthapuram', address: 'TC 34/2136, Vazhuthacaud, Thiruvananthapuram – 695014', states: 'Kerala, Lakshadweep, Tamil Nadu (part)', contact: '0471-2329993', email: 'rotrivandrum.cbse@nic.in' },
];

const cbseAdvantages = [
    { icon: '📘', title: 'Uniform Syllabus Across India', desc: 'CBSE follows a centralized curriculum, which means students across India study the same content, regardless of their city or state. Great for students who relocate often due to transferable jobs (especially in Army, Air Force, Railways, etc.)' },
    { icon: '🎓', title: 'Best for Competitive Exams (JEE, NEET, CUET)', desc: "CBSE's syllabus is aligned with major competitive exams in India. Subjects like Physics, Chemistry, Biology, and Mathematics are taught with a conceptual and exam-oriented approach, which helps in JEE (Engineering), NEET (Medical), and CUET (Common University Entrance Test)." },
    { icon: '📚', title: 'NCERT Textbooks – Government Approved and Free', desc: 'CBSE uses NCERT textbooks – prepared by top educational experts and recommended by government institutions. They are easy to understand, concept-based, updated regularly, and available free online (e-books).' },
    { icon: '🧠', title: 'Focus on Conceptual Understanding, Not Rote Learning', desc: 'CBSE encourages application-based questions, HOTS (High Order Thinking Skills), and real-life examples, which helps students develop analytical and problem-solving skills — not just memorize answers.' },
    { icon: '🌐', title: 'Global Recognition + International Reach', desc: 'CBSE schools are not just in India — there are more than 240 CBSE-affiliated schools in 28+ countries. This makes CBSE a globally trusted board, suitable for students who might pursue studies abroad later.' },
    { icon: '🏫', title: 'Large Network of Schools', desc: 'Over 27,000 schools in India and 240+ abroad. Makes school transfer easy. Strong governance and regular inspections ensure quality.' },
    { icon: '📊', title: 'Transparent Evaluation & Modern Exam Pattern', desc: 'Continuous updates to exam patterns (MCQs, case-based, competency-based). Objective + Subjective mix. Digital initiatives like DigiLocker, OMR Sheets, e-Verification, etc. Fast result declaration with minimal bias.' },
    { icon: '🎨', title: 'Skill Subjects & Holistic Education', desc: 'CBSE includes vocational and skill-based subjects like Artificial Intelligence, Data Science, Entrepreneurship, Yoga, Art Education, Coding, etc. Also supports sports, co-curriculars, and moral education for balanced development.' },
    { icon: '💡', title: 'Flexibility in Streams & Subjects (Class 11 & 12)', desc: 'Unlike State Boards, CBSE allows interdisciplinary subject combinations (e.g., Biology + Psychology or Math + Fine Arts), skill electives, and flexibility to choose only 5 core subjects.' },
    { icon: '✅', title: 'Recognized by All Colleges, Indian & International', desc: 'Whether you\'re applying to Delhi University, IITs, AIIMS, or even Harvard or Oxford, a CBSE certificate is widely recognized.' },
];

const affiliationCriteria = [
    {
        title: '1. Infrastructure & Facilities',
        points: [
            'Adequate land and buildings as per CBSE by-laws',
            'Safe drinking water and sanitation facilities',
            'Fire safety and medical room provisions',
        ],
    },
    {
        title: '2. Faculty & Staff',
        points: [
            'Qualified teachers as per CBSE norms',
            'Non-teaching staff including counselors and special educators',
        ],
    },
    {
        title: '3. Administrative Requirements',
        points: [
            'Registered under a trust/society/non-profit',
            'Proper documentation (e.g., land ownership, NOC from state)',
            'School Management Committee (SMC) in place',
        ],
    },
    {
        title: '4. Academic Setup',
        points: [
            'Curriculum aligned with CBSE syllabus',
            'Minimum 220 working days in an academic year',
            'Mandatory inclusion of subjects like English, Hindi, Mathematics, Science, Social Science, etc.',
        ],
    },
];

const subjectStages = [
    {
        icon: '📖',
        stage: 'Classes 1 to 5 – Foundational Stage',
        subjects: ['English', 'Hindi', 'Mathematics', 'Environmental Studies (EVS)', 'Art & Craft', 'Physical Education', 'Computer Awareness (in some schools)'],
    },
    {
        icon: '📖',
        stage: 'Classes 6 to 8 – Middle Stage',
        subjects: ['English (Language & Literature)', 'Hindi', 'Mathematics', 'Science', 'Social Science (History, Civics, Geography)', 'Sanskrit / Third Language (regional options)', 'Computer Science / Artificial Intelligence (optional)', 'Physical & Health Education', 'Art Education', 'Work Experience'],
    },
    {
        icon: '📖',
        stage: 'Classes 9 and 10 – Secondary Stage',
        compulsory: ['English Language & Literature', 'Hindi Course A / B', 'Mathematics Standard / Basic', 'Science (Physics, Chemistry, Biology combined)', 'Social Science (History, Geography, Civics, Economics)'],
        optional: ['Sanskrit / French / Other Foreign or Regional Language', 'Information Technology / Artificial Intelligence', 'Skill Subjects (e.g., Marketing, Financial Literacy)'],
    },
    {
        icon: '📖',
        stage: 'Classes 11 and 12 – Senior Secondary Stage',
        streams: [
            {
                name: '🔬 Science Stream',
                subjects: ['Physics', 'Chemistry', 'Biology / Computer Science / Biotechnology', 'Mathematics / Informatics Practices', 'English Core', 'Optional: Physical Education, Psychology, etc.'],
            },
            {
                name: '📊 Commerce Stream',
                subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics / Informatics Practices', 'English Core', 'Optional: Entrepreneurship, Physical Education'],
            },
            {
                name: '📚 Humanities Stream',
                subjects: ['History', 'Geography', 'Political Science', 'Sociology', 'Psychology / Legal Studies / Economics', 'English Core', 'Optional: Fine Arts, Physical Education'],
            },
        ],
    },
];

const curriculumFeatures = [
    'NCERT Books as core learning material',
    'Regular syllabus updates with industry relevance',
    'Emphasis on critical thinking and problem-solving',
    'Inclusion of Skill Development and Vocational Courses',
    'Board Exams for Class 10 and Class 12',
];

const resultCheckMethods = [
    {
        icon: '🌐',
        title: '1. Official Websites',
        desc: 'Visit any of the following: cbse.gov.in, cbseresults.nic.in, results.cbse.nic.in',
        steps: ['Click on the link for Class 10 or 12 results.', 'Enter your Roll Number, School Number, Date of Birth, and Admit Card ID.', 'Submit to view and download your provisional marksheet.'],
    },
    {
        icon: '📱',
        title: '2. SMS',
        desc: 'Format: Send cbse12 <Roll Number> <Date of Birth> <School Number> <Centre Number> to 7738299899.',
        steps: ['Example: cbse12 1234567 15082007 99999 1111'],
    },
    {
        icon: '🔒',
        title: '3. DigiLocker',
        desc: 'Visit digilocker.gov.in.',
        steps: ['Sign in using your registered mobile number and the last six digits of your CBSE roll number as the security PIN.', 'Navigate to the "Issued Documents" section to find and download your Class 10 or 12 certificate.'],
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CBSEPage() {
    return (
        <Layout
            title="CBSE Full Form Explained | Curriculum, Subjects, Board Overview, Importance & Career Relevance"
            description="CBSE stands for Central Board of Secondary Education. Learn about CBSE curriculum, subjects from Class 1–12, grading system, affiliation criteria, results 2025, and why CBSE is better than other boards."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Education Board</div>
                    <br />
                    <br />
                    <br />
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        CBSE Full Form Explained
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">
                        Curriculum, Subjects, Board Overview, Importance &amp; Career Relevance
                    </p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed">
                        CBSE is one of the most common and reputed education boards in India. If you have studied in India, you've definitely heard about CBSE — and many students have completed their 10th and 12th from CBSE schools. In India, many schools follow the CBSE curriculum. I also completed my 10th and 12th from a CBSE school, so I'll explain everything to you in detail.
                    </p>
                    <p className="text-white/60 max-w-2xl mx-auto text-sm mt-3 leading-relaxed">
                        There are many education boards in India like State Boards, ICSE, NIOS, and CBSE. But CBSE is the most popular board in the country, and its standard of education is considered better than most others.
                    </p>
                    <p className="text-av-orange font-bold mt-4">So, let's get started!</p>
                </ScrollReveal>
            </div>

            {/* ── Stats Bar ── */}
            <div className="bg-av-blue py-8">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(s => (
                        <ScrollReveal key={s.label} className="text-center">
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-2xl font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── What is CBSE Full Form ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">Full Form</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            What is the Full Form of CBSE?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            <strong>CBSE stands for Central Board of Secondary Education.</strong> It is a national-level education board in India for public and private schools, controlled and managed by the Ministry of Education, Government of India.
                        </p>
                        <div className="bg-av-light border border-av-sky/20 rounded-xl p-5 mb-4">
                            <p className="font-montserrat font-bold text-av-blue mb-1">CBSE Full Form in Hindi</p>
                            <p className="text-gray-700 text-lg">CBSE का फुल फॉर्म है: <strong>केंद्रीय माध्यमिक शिक्षा बोर्ड</strong></p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={200}>
                        <div className="section-tag">About the Board</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            What is the CBSE Board?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            The CBSE Board is a national-level education board in India that governs public and private schools across the country and some abroad. It is managed by the Ministry of Education, Government of India. You Can Qualify With Science, Commerce or Arts From CBSE Board in 12th. Mostly Private Schools Follow The Guidance of CBSE Board.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            All Schools Can't be Affiliated With CBSE Board — there is a Criteria to Become Affiliated With CBSE Board. So Before Registering Yourself With CBSE Board, You Have to Follow their rules and Should be Eligible for It.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Brief History ── */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">History</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Brief <span className="text-av-orange">History of CBSE</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: '🏛️', title: 'Established in 1929', desc: 'Founded as the Board of High School and Intermediate Education' },
                            { icon: '📜', title: 'Renamed in 1952', desc: 'Officially renamed as CBSE — Central Board of Secondary Education' },
                            { icon: '🎯', title: 'Mission', desc: 'Aimed at providing a common and standardized curriculum across India' },
                            { icon: '📍', title: 'Headquarters', desc: 'Headquartered in New Delhi, India' },
                            { icon: '🏫', title: '27,000+ Schools', desc: 'Affiliated Schools: Over 27,000+ in India and 240+ abroad' },
                            { icon: '📚', title: 'NCERT Based', desc: 'Curriculum based on NCERT — focuses on conceptual learning, analytical thinking, and national-level exams like JEE, NEET' },
                        ].map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 100}>
                                <div className="card-hover p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-av-orange/30">
                                    <div className="text-2xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CBSE Curriculum ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Curriculum</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Understand CBSE <span className="text-av-orange">Curriculum And Education</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            CBSE Curriculum starts from Class 1st to Class 12th and mostly follows NCERT Books. The Central Board of Secondary Education (CBSE) is one of the most recognized national-level education boards in India. Managed by the Ministry of Education, CBSE governs thousands of schools across India and abroad, ensuring uniformity, modern pedagogy, and quality education.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                        <ScrollReveal>
                            <h3 className="font-montserrat text-2xl font-bold text-av-blue mb-4">What is the CBSE Curriculum?</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                The CBSE Curriculum is structured to prepare students for both academic excellence and competitive exams like JEE, NEET, and more. It emphasizes conceptual learning, skill development, and holistic growth through:
                            </p>
                            <ul className="space-y-2">
                                {['Activity-based learning', 'Continuous evaluation (CCE pattern up to Class 10)', 'National-level standardization', 'Inclusion of life skills and value education'].map(item => (
                                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                                        <span className="text-av-orange mt-0.5">✓</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <h3 className="font-montserrat text-2xl font-bold text-av-blue mb-4">✅ Key Features of CBSE Curriculum</h3>
                            <ul className="space-y-3">
                                {curriculumFeatures.map(f => (
                                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600 bg-av-light rounded-lg px-4 py-3 border border-av-sky/20">
                                        <span className="text-av-orange mt-0.5">✓</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </ScrollReveal>
                    </div>

                    {/* Affiliation Criteria */}
                    <ScrollReveal className="text-center mb-10">
                        <h3 className="font-montserrat text-2xl font-bold text-av-blue">
                            Eligibility Criteria for Schools to Get <span className="text-av-orange">CBSE Affiliation</span>
                        </h3>
                        <p className="text-gray-500 mt-2 text-sm">For a school to be affiliated with CBSE, it must meet certain eligibility guidelines:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {affiliationCriteria.map((c, i) => (
                            <ScrollReveal key={c.title} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">{c.title}</h4>
                                    <ul className="space-y-2">
                                        {c.points.map(p => (
                                            <li key={p} className="flex items-start gap-2 text-xs text-gray-500">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">•</span>
                                                <span>{p}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Subjects ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Subjects</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            CBSE Subjects from <span className="text-av-orange">Class 1 to Class 12</span>
                        </h2>
                        <p className="text-white/60 mt-2 text-sm">Here's a grade-wise breakup of CBSE subjects for each class level</p>
                    </ScrollReveal>

                    <div className="space-y-8">
                        {subjectStages.map((stage, i) => (
                            <ScrollReveal key={stage.stage} delay={i * 100}>
                                <div className="glass rounded-2xl p-8">
                                    <div className="flex items-center gap-3 mb-5">
                                        <span className="text-2xl">{stage.icon}</span>
                                        <h3 className="font-montserrat font-bold text-white text-lg">{stage.stage}</h3>
                                    </div>

                                    {/* Simple list */}
                                    {stage.subjects && (
                                        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                            {stage.subjects.map(s => (
                                                <li key={s} className="flex items-start gap-2 text-white/80 text-sm">
                                                    <span className="text-av-orange mt-0.5">•</span><span>{s}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Compulsory + Optional (Classes 9–10) */}
                                    {stage.compulsory && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <p className="text-av-orange font-semibold text-sm mb-2">Compulsory Subjects:</p>
                                                <ul className="space-y-1">
                                                    {stage.compulsory.map(s => (
                                                        <li key={s} className="flex items-start gap-2 text-white/80 text-sm">
                                                            <span className="text-av-orange mt-0.5">•</span><span>{s}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <p className="text-av-orange font-semibold text-sm mb-2">Optional Subjects:</p>
                                                <ul className="space-y-1">
                                                    {stage.optional.map(s => (
                                                        <li key={s} className="flex items-start gap-2 text-white/80 text-sm">
                                                            <span className="text-av-orange mt-0.5">•</span><span>{s}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* Streams (Classes 11–12) */}
                                    {stage.streams && (
                                        <div>
                                            <p className="text-white/70 text-sm mb-4">Students choose a stream: Science, Commerce, or Arts/Humanities.</p>
                                            <div className="grid md:grid-cols-3 gap-4">
                                                {stage.streams.map(stream => (
                                                    <div key={stream.name} className="bg-white/10 rounded-xl p-4">
                                                        <p className="font-semibold text-av-orange text-sm mb-3">{stream.name}</p>
                                                        <ul className="space-y-1">
                                                            {stream.subjects.map(s => (
                                                                <li key={s} className="flex items-start gap-2 text-white/80 text-xs">
                                                                    <span className="text-av-orange mt-0.5">•</span><span>{s}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Grading System ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Grading System</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CBSE <span className="text-av-orange">Grading System</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            When I gave the Paper of 10th and 12th in year 2012 and 2014 respectively, there was only a grade system in 10th but not in 12th. But after the CBSE rule of 2017, 12th was also put on a grade system (and the grade system of 10th was applicable from 2011). The Passing Mark is 33 in all subjects out of 100. Let's understand the grading system in CBSE.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Class 9 & 10 */}
                        <ScrollReveal>
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">🏆 CBSE Grading System (Class 9 &amp; 10)</h3>
                            <p className="text-gray-500 text-sm mb-4">CBSE uses a 9-point grading system for Scholastic Areas in Classes 9 and 10, based on relative grading. Students are awarded grades based on their performance relative to their Percentage.</p>
                            <div className="overflow-x-auto rounded-2xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Marks Range (%)</th>
                                            <th className="px-4 py-3 text-left">Grade</th>
                                            <th className="px-4 py-3 text-left">Grade Point</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gradingClass10.map((row, i) => (
                                            <tr key={row.grade} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${row.point === 'Fail' ? 'text-red-500 font-semibold' : 'text-gray-700'}`}>
                                                <td className="px-4 py-3">{row.sr}</td>
                                                <td className="px-4 py-3">{row.range}</td>
                                                <td className="px-4 py-3 font-bold">{row.grade}</td>
                                                <td className="px-4 py-3">{row.point}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-gray-500 mt-3">⚠️ <strong>Minimum Pass Percentage:</strong> 33% in each subject (both theory and practical, if applicable).</p>
                        </ScrollReveal>

                        {/* Class 11 & 12 */}
                        <ScrollReveal delay={200}>
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">📚 CBSE Grading System (Class 11 &amp; 12)</h3>
                            <p className="text-gray-500 text-sm mb-4">In Classes 11 and 12, CBSE follows a marks-based system along with corresponding grades in report cards. However, pass/fail is based on marks, not grades.</p>
                            <div className="overflow-x-auto rounded-2xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Marks Range (%)</th>
                                            <th className="px-4 py-3 text-left">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gradingClass12.map((row, i) => (
                                            <tr key={row.grade} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${row.grade.includes('Fail') ? 'text-red-500 font-semibold' : 'text-gray-700'}`}>
                                                <td className="px-4 py-3">{row.sr}</td>
                                                <td className="px-4 py-3">{row.range}</td>
                                                <td className="px-4 py-3 font-bold">{row.grade}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* CGPA */}
                            <div className="mt-6 bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">How to Calculate CGPA (for Class 10)</h4>
                                <p className="text-white/70 text-sm mb-2">CGPA stands for Cumulative Grade Point Average.</p>
                                <p className="text-white/80 text-sm mb-2"><strong className="text-av-orange">Formula:</strong> CGPA = (Sum of Grade Points in 5 subjects) ÷ 5</p>
                                <p className="text-white/80 text-sm mb-2">If a student's grade points in five main subjects are: 9, 8, 10, 7, 8.</p>
                                <p className="text-white/80 text-sm mb-2">Then CGPA = (9 + 8 + 10 + 7 + 8) / 5 = <strong className="text-av-orange">8.4</strong></p>
                                <p className="text-white/80 text-sm mb-1"><strong className="text-av-orange">To convert CGPA into Percentage:</strong> Percentage = CGPA × 9.5</p>
                                <p className="text-white/80 text-sm">In this example: 8.4 × 9.5 = <strong className="text-av-orange">79.8%</strong></p>
                                <p className="text-white/60 text-xs mt-3">Hope You Understand This Well.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── CBSE Result 2025 ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Results 2025</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CBSE Result 2025: <span className="text-av-orange">Expected Release Dates</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 hover:border-av-orange/30 transition-all">
                                <div className="text-4xl mb-4">📋</div>
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2">Class 10</h3>
                                <p className="text-gray-600 text-sm">Expected between <strong className="text-av-orange">May 15–20, 2025</strong>.</p>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 hover:border-av-orange/30 transition-all">
                                <div className="text-4xl mb-4">🎓</div>
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2">Class 12</h3>
                                <p className="text-gray-600 text-sm">Expected in <strong className="text-av-orange">May 2025</strong>, with both results typically released on the same day.</p>
                            </div>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal className="text-center mb-8">
                        <h3 className="font-montserrat text-2xl font-bold text-av-blue">
                            How to Check <span className="text-av-orange">CBSE Results 2025</span>
                        </h3>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {resultCheckMethods.map((method, i) => (
                            <ScrollReveal key={method.title} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full">
                                    <div className="text-3xl mb-3">{method.icon}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2">{method.title}</h4>
                                    <p className="text-gray-500 text-sm mb-3">{method.desc}</p>
                                    <p className="text-xs font-semibold text-av-blue mb-2">Steps:</p>
                                    <ol className="space-y-1">
                                        {method.steps.map((s, j) => (
                                            <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                                                <span className="text-av-orange font-bold flex-shrink-0">{j + 1}.</span>
                                                <span>{s}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Helpline ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Support</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CBSE <span className="text-av-orange">Helpline Number</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">CBSE Provides Their Helpline Number for Students. If You Have Any Issue in Results, Admission or Anything Else Then You Can Query on It.</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">📞 Phone Numbers</h3>
                                <div className="space-y-3 text-sm text-gray-600">
                                    <div className="flex items-start gap-3 p-3 bg-av-light rounded-lg">
                                        <span className="text-av-orange font-bold flex-shrink-0">📱</span>
                                        <div><strong className="text-av-blue">Toll-Free Number:</strong> 1800-11-8002<br /><span className="text-xs text-gray-400">(Operational on working days from 9:30 AM to 5:00 PM)</span></div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-av-light rounded-lg">
                                        <span className="text-av-orange font-bold flex-shrink-0">📞</span>
                                        <div><strong className="text-av-blue">Alternate Number (Head Office):</strong><br />011-22509256, 22509257, 22509258, 22509259</div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-av-light rounded-lg">
                                        <span className="text-av-orange font-bold flex-shrink-0">📞</span>
                                        <div><strong className="text-av-blue">Helpline for CBSE Results/Exams:</strong><br />011-22236110, 011-22240083, 011-22240104, 011-22247176</div>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-av-blue rounded-2xl shadow-lg p-8 text-white">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-5">📧 CBSE Email Support</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                                        <span className="text-av-orange flex-shrink-0">📩</span>
                                        <div><strong className="text-av-orange">General Queries:</strong><br /><span className="text-white/80">info.cbse@gov.in</span></div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                                        <span className="text-av-orange flex-shrink-0">📩</span>
                                        <div><strong className="text-av-orange">Exam Related:</strong><br /><span className="text-white/80">ds.exam.cbse@gmail.com</span></div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                                        <span className="text-av-orange flex-shrink-0">📩</span>
                                        <div><strong className="text-av-orange">CBSE Results Queries:</strong><br /><span className="text-white/80">result.cbse@nic.in</span></div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-white/10 rounded-lg">
                                        <span className="text-av-orange flex-shrink-0">📩</span>
                                        <div><strong className="text-av-orange">Digital Certificates (DigiLocker):</strong><br /><span className="text-white/80">support@digilocker.gov.in</span></div>
                                    </div>
                                </div>

                                <div className="mt-5 pt-5 border-t border-white/20">
                                    <h4 className="font-montserrat font-bold text-white mb-2">🏢 CBSE Headquarters Address</h4>
                                    <p className="text-white/70 text-sm">Central Board of Secondary Education (CBSE)<br />Shiksha Kendra, 2, Community Centre, Preet Vihar,<br />Delhi – 110092, India</p>
                                    <p className="text-white/60 text-xs mt-1">Phone: 011-22509256, 22509257, 22509258, 22509259</p>
                                    <p className="text-white/60 text-xs">Email: info.cbse@gov.in</p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Regional Offices ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Regional Offices</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            CBSE <span className="text-av-orange">Regional Offices Across India</span>
                        </h2>
                    </ScrollReveal>

                    <div className="overflow-x-auto rounded-2xl shadow">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-av-blue text-white">
                                    <th className="px-4 py-3 text-left">Region</th>
                                    <th className="px-4 py-3 text-left">Address</th>
                                    <th className="px-4 py-3 text-left">States/UTs Covered</th>
                                    <th className="px-4 py-3 text-left">Contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {regionalOffices.map((office, i) => (
                                    <tr key={office.region} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-3 font-semibold text-av-blue">{office.region}</td>
                                        <td className="px-4 py-3 text-gray-600">{office.address}</td>
                                        <td className="px-4 py-3 text-gray-600">{office.states}</td>
                                        <td className="px-4 py-3 text-gray-600">
                                            <p>{office.contact}</p>
                                            <p className="text-xs text-av-blue">{office.email}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ── Why CBSE is Better ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Why Choose CBSE</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why CBSE is <span className="text-av-orange">Better than Other Boards</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Among All Boards in India, CBSE is the Most Popular and Better Than Other Boards because the Syllabus of CBSE Board is the same all over India and its Level of Education is increasing according to students' capability. The Central Board of Secondary Education (CBSE) is India's most preferred national education board — not just by schools, but also by parents, students, and competitive exam aspirants.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {cbseAdvantages.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-2xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="text-center">
                        <p className="text-av-blue font-semibold text-lg">There is a reason why CBSE is considered better than other boards in India.</p>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}