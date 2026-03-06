import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '1958', label: 'Established', icon: '🏛️' },
    { num: '1973', label: 'First ICSE Exam', icon: '📝' },
    { num: 'Class 10', label: 'Grade Level', icon: '🎓' },
    { num: 'English', label: 'Medium', icon: '🌐' },
];

const icseFacts = [
    { label: 'Full Form', value: 'Indian Certificate of Secondary Education' },
    { label: 'Conducted by', value: 'CISCE (Council for the Indian School Certificate Examinations)' },
    { label: 'Grade Level', value: 'Class 10 board exam' },
    { label: 'Medium of Instruction', value: 'English' },
    { label: 'Type', value: 'Private, non-governmental board of school education in India' },
];

const cisceFacts = [
    { label: 'Full Name', value: 'Council for the Indian School Certificate Examinations' },
    { label: 'Established', value: '1958' },
    { label: 'Headquarters', value: 'New Delhi, India' },
    { label: 'Type', value: 'Private Board of Education' },
    { label: 'Languages of Instruction', value: 'English' },
];

const cisceObjectives = [
    'To deliver high-quality education in English.',
    'To ensure balanced curriculum with focus on languages, arts, and sciences.',
    'To promote analytical thinking, creativity, and global awareness.',
    'To conduct fair and transparent examinations for secondary and higher secondary levels.',
];

const gradingSystem = [
    { sr: 1, grade: '1', range: '90 – 100', meaning: 'Very Good' },
    { sr: 2, grade: '2', range: '80 – 89', meaning: 'Good' },
    { sr: 3, grade: '3', range: '70 – 79', meaning: 'Above Average' },
    { sr: 4, grade: '4', range: '60 – 69', meaning: 'Average' },
    { sr: 5, grade: '5', range: '50 – 59', meaning: 'Satisfactory' },
    { sr: 6, grade: '6', range: '40 – 49', meaning: 'Fair' },
    { sr: 7, grade: '7', range: '30 – 39', meaning: 'Needs Improvement' },
    { sr: 8, grade: '8', range: '20 – 29', meaning: 'Poor' },
    { sr: 9, grade: '9', range: 'Below 20', meaning: 'Very Poor/Fail' },
];

const affiliationCriteria = [
    {
        icon: '🏗️',
        title: '1. Infrastructure Requirements',
        points: [
            'The school must have a permanent building and a safe learning environment.',
            'There should be well-equipped classrooms, science labs, computer labs, and a library.',
            'Clean drinking water, proper sanitation, and separate toilets for boys and girls are mandatory.',
        ],
    },
    {
        icon: '🎓',
        title: '2. Medium of Instruction',
        points: [
            'English must be the primary language of instruction.',
            'Teachers and students should be able to communicate effectively in English.',
        ],
    },
    {
        icon: '👩‍🏫',
        title: '3. Qualified Teachers',
        points: [
            'The school must have well-trained and qualified teachers as per CISCE norms.',
            'Teachers should be capable of teaching as per the ICSE syllabus.',
            'Regular teacher training programs are encouraged.',
        ],
    },
    {
        icon: '📝',
        title: '4. Academic Facilities',
        points: [
            'The school should have a proper plan for teaching ICSE syllabus from Class 1 to Class 10.',
            'There must be arrangements for internal assessments, project work, and extracurricular activities.',
        ],
    },
    {
        icon: '📄',
        title: '5. Legal Status & Recognition',
        points: [
            'The school must be recognized by the state or union territory government.',
            'It should be run by a registered society, trust, or company under the relevant act.',
            'The school should have non-proprietary character, i.e., it should not be run for profit.',
        ],
    },
    {
        icon: '📊',
        title: '6. Student Strength & Class Ratios',
        points: [
            'There should be an adequate number of students and teacher-student ratio should be balanced.',
            'Classrooms must be spacious and not overcrowded.',
        ],
    },
    {
        icon: '🔍',
        title: '7. Inspection & Verification',
        points: [
            "CISCE sends an inspection team to evaluate the school's facilities and readiness.",
            'Only if the school meets all standards, affiliation is granted.',
        ],
    },
];

const advantages = [
    { icon: '✅', title: '1. Strong Focus on English Language', desc: 'ICSE places a high emphasis on English grammar, vocabulary, and writing. Students from ICSE backgrounds often perform better in competitive exams and international universities due to their fluency in English.' },
    { icon: '✅', title: '2. Detailed & Balanced Curriculum', desc: 'The ICSE syllabus is comprehensive and well-structured. Equal importance is given to Science, Mathematics, Languages, Arts, and Humanities. Helps students develop all-round knowledge and not just academic marks.' },
    { icon: '✅', title: '3. Application-Based Learning', desc: 'The ICSE board encourages understanding and analysis, not just rote memorization. Subjects are taught in a way that promotes critical thinking and creativity.' },
    { icon: '✅', title: '4. Internal Assessments & Practical Learning', desc: 'Students are graded on projects, lab work, and class activities, not just final exams. This helps build real-world skills and confidence early on.' },
    { icon: '✅', title: '5. Wide Subject Options', desc: 'In Classes 9 & 10, students can choose from a diverse range of subjects: Computer Applications, Environmental Science, Art, Performing Arts, Home Science, and more. This allows students to customize their learning path based on interests.' },
    { icon: '✅', title: '6. Global Recognition', desc: 'ICSE certificates are accepted worldwide, especially in countries like the UK, USA, Australia, and Singapore. ICSE students often find it easier to get into international schools and colleges.' },
    { icon: '✅', title: '7. Great for Personality Development', desc: 'With emphasis on language, presentations, and projects, ICSE students develop better communication skills. Encourages overall grooming through arts, culture, and extracurriculars.' },
    { icon: '✅', title: '8. Good Base for Competitive Exams', desc: 'Though the syllabus is vast, ICSE builds a deep conceptual understanding. Students are well-prepared for NEET, JEE, UPSC, and even foreign exams like SAT, IELTS, or TOEFL.' },
];

const disadvantages = [
    { icon: '❌', title: '1. Syllabus is Vast and Detailed', desc: 'The ICSE syllabus is more detailed and lengthy compared to CBSE or State Boards. Students may feel overwhelmed, especially if they are not used to deep learning or regular study.' },
    { icon: '❌', title: '2. High Pressure on Projects & Internal Assessments', desc: 'ICSE gives importance to project work and internal marks, which increases the overall workload on students. Not every student enjoys continuous evaluations or group assignments.' },
    { icon: '❌', title: '3. Limited Number of ICSE Schools', desc: 'ICSE-affiliated schools are fewer in number, especially in small towns or rural areas. This makes it difficult for students to switch schools or find tuition support.' },
    { icon: '❌', title: '4. Transition to State Board/CBSE is Tough', desc: 'If a student needs to transfer from ICSE to CBSE or a State Board, they may struggle to match the format and style of questions. The depth of ICSE subjects is often not aligned with other boards.' },
    { icon: '❌', title: '5. More Focus on Theory in Some Subjects', desc: 'While ICSE is known for balance, in some subjects (like History or Civics), the syllabus can be theory-heavy, leading to memorization.' },
    { icon: '❌', title: '6. Cost of Education is Generally Higher', desc: 'Most ICSE schools are private and English-medium, which means higher tuition fees and extra expenses on books, projects, etc. It may not be affordable for all families.' },
    { icon: '❌', title: '7. No State Language Focus', desc: 'Since ICSE follows English as the medium, state languages often get less attention, which can be a drawback for students preparing for regional government exams.' },
];

const comparisonAbout = [
    { factor: 'Full Form', icse: 'Indian Certificate of Secondary Education', cbse: 'Central Board of Secondary Education' },
    { factor: 'Managed By', icse: 'CISCE – a private, non-government board', cbse: 'Ministry of Education, Government of India' },
    { factor: 'Established', icse: '1958', cbse: '1962' },
    { factor: 'Type', icse: 'Private Board', cbse: 'National Government Board' },
];

const comparisonCurriculum = [
    { aspect: 'Focus Area', icse: 'Strong on Language, Arts, Science', cbse: 'Strong on Maths, Science, Concept Clarity' },
    { aspect: 'Teaching Method', icse: 'Application-based, Project work, Creative', cbse: 'Concept-focused, Straightforward, Exam-oriented' },
    { aspect: 'Syllabus Detail', icse: 'Deep and analytical', cbse: 'Concise and logical' },
    { aspect: 'Language Medium', icse: 'English only', cbse: 'English & Hindi both' },
];

const comparisonAssessment = [
    { factor: 'Projects / Practicals', icse: 'More weightage (up to 20–30%)', cbse: 'Less weightage (mostly theory-based)' },
    { factor: 'Exam Pattern', icse: 'Descriptive, detailed answers', cbse: 'Balanced between short and long answers' },
];

const comparisonRecognition = [
    { factor: 'India Recognition', icse: 'Moderate (fewer schools)', cbse: 'High (available in all cities & states)' },
    { factor: 'Global Acceptance', icse: 'Very High', cbse: 'Good' },
    { factor: 'Ease of Transfer', icse: 'Difficult due to fewer ICSE schools', cbse: 'Easy because CBSE is widely available' },
];

const icseSuitableFor = [
    'Students who want strong command over English',
    'Those interested in foreign education or global careers',
    'Students who prefer in-depth learning with real-world application',
];

const quickSummary = [
    { choice: '✅ ICSE', forWho: 'Strong English skills, global career path, balanced learning' },
    { choice: '✅ CBSE', forWho: 'Affordable schooling, national exam prep (JEE/NEET), easy transfers' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ICSEPage() {
    return (
        <Layout
            title="ICSE Full Form – What is ICSE Board? Comparison with CBSE & Full Details (2025)"
            description="ICSE stands for Indian Certificate of Secondary Education. Learn about ICSE Board, CISCE, curriculum, grading system, affiliation criteria, advantages, disadvantages, and ICSE vs CBSE comparison 2025."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Education Board</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        ICSE Full Form – What is ICSE Board?
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-3">
                        Comparison with CBSE &amp; Full Details (2025)
                    </p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed">
                        <strong className="text-white">ICSE stands for Indian Certificate of Secondary Education.</strong> It is an examination conducted by the Council for the Indian School Certificate Examinations (CISCE) for students of Class 10. It is primarily known as one of the Best Boards in India. It is simply considered a Hard Board compared to others because its Syllabus is very deep. This exam is held by a group called the CISCE (Council for the Indian School Certificate Examinations).
                    </p>
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

            {/* ── About ICSE ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
                    <ScrollReveal>
                        <div className="section-tag">About ICSE</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            About ICSE Board
                        </h2>
                        <div className="space-y-3 mb-6">
                            {icseFacts.map(fact => (
                                <div key={fact.label} className="flex items-start gap-3 p-3 bg-av-light rounded-lg border border-av-sky/20">
                                    <span className="text-av-orange font-bold flex-shrink-0">•</span>
                                    <p className="text-sm text-gray-600"><strong className="text-av-blue">{fact.label}:</strong> {fact.value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-av-blue rounded-2xl p-6 text-white">
                            <h3 className="font-montserrat font-bold text-white text-lg mb-2">ICSE Full Form</h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                The Full Form of ICSE is <strong className="text-av-orange">Indian Certificate of Secondary Education</strong> and the Full Name of the conducting body is <strong className="text-av-orange">Council for the Indian School Certificate Examinations</strong>. The Headquarter of ICSE is <strong className="text-av-orange">New Delhi</strong>.
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* About CISCE */}
                    <ScrollReveal delay={200}>
                        <div className="section-tag">The Council</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                            About CISCE – The Council Behind ICSE
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                            The Council for the Indian School Certificate Examinations (CISCE) is the national-level education board in India that conducts the ICSE (Class 10) and ISC (Class 12) exams. It is a private, non-governmental board, well-known for its high academic standards, especially in English-medium education.
                        </p>
                        <h3 className="font-montserrat font-bold text-av-blue mb-3">Key Facts About CISCE:</h3>
                        <div className="space-y-2 mb-5">
                            {cisceFacts.map(fact => (
                                <div key={fact.label} className="flex items-start gap-3 p-3 bg-av-light rounded-lg border border-av-sky/20">
                                    <span className="text-av-orange font-bold flex-shrink-0">•</span>
                                    <p className="text-sm text-gray-600"><strong className="text-av-blue">{fact.label}:</strong> {fact.value}</p>
                                </div>
                            ))}
                            <div className="p-3 bg-av-light rounded-lg border border-av-sky/20">
                                <p className="text-sm font-bold text-av-blue mb-1">Exam Conducted:</p>
                                <ul className="space-y-1 ml-3">
                                    <li className="text-sm text-gray-600 flex items-start gap-2"><span className="text-av-orange">•</span>ICSE – Indian Certificate of Secondary Education (Class 10)</li>
                                    <li className="text-sm text-gray-600 flex items-start gap-2"><span className="text-av-orange">•</span>ISC – Indian School Certificate (Class 12)</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="font-montserrat font-bold text-av-blue mb-3">Purpose and Objectives of CISCE:</h3>
                        <ul className="space-y-2">
                            {cisceObjectives.map(obj => (
                                <li key={obj} className="flex items-start gap-3 text-sm text-gray-600">
                                    <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                    <span>{obj}</span>
                                </li>
                            ))}
                        </ul>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── History ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">History</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            History Of <span className="text-av-orange">ICSE Board</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-8">
                                <p className="text-white/80 text-sm leading-relaxed mb-4">
                                    The roots of ICSE go back to Cambridge University, which used to conduct exams for Indian students during British rule.
                                </p>
                                <p className="text-white/80 text-sm leading-relaxed mb-4">
                                    After India's independence, there was a strong need to create an Indian version of that exam system — something that would maintain high standards but also suit Indian students and culture.
                                </p>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    So, in 1958, the University of Cambridge recommended setting up an Indian council to handle this — and that's how the <strong className="text-av-orange">CISCE was formed</strong>.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="space-y-6">
                                <div className="glass rounded-2xl p-6">
                                    <h3 className="font-montserrat font-bold text-white mb-3">When Did ICSE Board Start?</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        The first ICSE exam was conducted in <strong className="text-av-orange">1973</strong>, under the guidance of CISCE. Since then, ICSE has grown to become one of the most respected school boards in India.
                                    </p>
                                </div>

                                <div className="glass rounded-2xl p-6">
                                    <h3 className="font-montserrat font-bold text-white mb-4">Key Strengths from the Start:</h3>
                                    <ul className="space-y-3">
                                        {[
                                            { title: 'Strong English Base', desc: 'ICSE schools teach in English, which helps students build a strong command over the language — useful for global education and international jobs.' },
                                            { title: 'Focus on All Subjects', desc: 'Whether you like science, literature, or commerce, ICSE gives you a chance to shine in every field.' },
                                            { title: 'Internal Projects & Practical Work', desc: 'Students are encouraged to do project work, group activities, and assignments — not just memorize and write exams.' },
                                            { title: 'Respected Globally', desc: 'ICSE certificates are accepted by many foreign universities in the UK, USA, Canada, Australia, etc.' },
                                        ].map(item => (
                                            <li key={item.title} className="flex items-start gap-3">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                                <div>
                                                    <p className="text-white font-semibold text-sm">{item.title}:</p>
                                                    <p className="text-white/70 text-xs leading-relaxed">{item.desc}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Curriculum Structure ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Curriculum</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            ICSE Curriculum Structure – <span className="text-av-orange">Complete Overview</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            The ICSE (Indian Certificate of Secondary Education) curriculum is known for its comprehensive, balanced, and detailed structure. It doesn't just focus on marks — it focuses on building concepts, skills, and a strong academic foundation.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 mb-12">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                                <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Classes Covered Under ICSE:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-3 text-sm text-gray-600"><span className="text-av-orange mt-0.5">•</span><span>ICSE is conducted for <strong>Class 10</strong></span></li>
                                    <li className="flex items-start gap-3 text-sm text-gray-600"><span className="text-av-orange mt-0.5">•</span><span>The syllabus for Classes 1 to 10 is framed by the schools under CISCE guidelines</span></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={100}>
                            <div className="bg-av-blue rounded-2xl shadow-lg p-8 text-white">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-3">Subject Structure</h3>
                                <p className="text-white/70 text-sm">Subjects in ICSE are divided into <strong className="text-av-orange">Three Groups</strong> (for Class 9 and 10). Students must complete Group 1, choose 2 from Group 2, and choose 1 from Group 3.</p>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                group: 'Group 1',
                                label: '✅ Compulsory Subjects',
                                color: 'border-green-400',
                                badge: 'bg-green-100 text-green-700',
                                note: 'These subjects are mandatory for all students:',
                                subjects: ['English', 'Second Language (e.g. Hindi, Regional Language, or Foreign Language)', 'History, Civics & Geography (combined)'],
                            },
                            {
                                group: 'Group 2',
                                label: '✅ Choose Any 2 Subjects',
                                color: 'border-av-orange',
                                badge: 'bg-orange-100 text-orange-700',
                                note: 'Students can choose two subjects from this group:',
                                subjects: ['Mathematics', 'Science (Physics, Chemistry, Biology)', 'Economics', 'Commercial Studies', 'Environmental Science'],
                            },
                            {
                                group: 'Group 3',
                                label: '✅ Choose Any 1 Subject',
                                color: 'border-av-blue',
                                badge: 'bg-blue-100 text-blue-700',
                                note: 'This group offers more creative and skill-based subjects:',
                                subjects: ['Computer Applications', 'Art', 'Home Science', 'Fashion Designing', 'Cookery', 'Performing Arts', 'Physical Education', 'Technical Drawing'],
                            },
                        ].map((g, i) => (
                            <ScrollReveal key={g.group} delay={i * 100}>
                                <div className={`bg-white rounded-2xl border-t-4 ${g.color} shadow-sm p-6 card-hover h-full`}>
                                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${g.badge}`}>{g.group}</span>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2">{g.label}</h4>
                                    <p className="text-gray-400 text-xs mb-3">{g.note}</p>
                                    <ul className="space-y-2">
                                        {g.subjects.map(s => (
                                            <li key={s} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="text-av-orange mt-0.5 flex-shrink-0">•</span>
                                                <span>{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Grading System ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Grading System</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            ICSE Grading System – <span className="text-av-orange">Explained Simply</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            The ICSE Board uses a numeric grading system to evaluate students' performance in Class 10 exams. This grading system helps measure both theory and practical/project work, depending on the subject.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <ScrollReveal>
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">ICSE Grading System for Class 10 Board Exams:</h3>
                            <div className="overflow-x-auto rounded-2xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-4 py-3 text-left">#</th>
                                            <th className="px-4 py-3 text-left">Grade</th>
                                            <th className="px-4 py-3 text-left">Marks Range</th>
                                            <th className="px-4 py-3 text-left">Grade Meaning</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gradingSystem.map((row, i) => (
                                            <tr
                                                key={row.grade}
                                                className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${row.meaning.includes('Poor') || row.meaning.includes('Fail') ? 'text-red-500 font-semibold' : 'text-gray-700'}`}
                                            >
                                                <td className="px-4 py-3">{row.sr}</td>
                                                <td className="px-4 py-3 font-bold">{row.grade}</td>
                                                <td className="px-4 py-3">{row.range}</td>
                                                <td className="px-4 py-3">{row.meaning}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-gray-500 mt-3">✅ <strong>Note:</strong> Grades 1 to 5 are usually considered as "Pass" grades.</p>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-4">Key Points About ICSE Evaluation:</h3>
                            <div className="space-y-4">
                                {[
                                    { title: 'Theory + Practical', desc: 'Some subjects have both written exams and internal assessments (like lab work or projects).' },
                                    { title: 'Internal Marks', desc: 'Subjects like Computer Applications, Science, and Art include 20%–50% internal marks.' },
                                    { title: 'No Overall Percentage', desc: 'ICSE does not calculate a total percentage; schools often convert grades into percentages separately.' },
                                    { title: 'Subject-Wise Report Card', desc: 'Students get grades for each subject individually, showing theory and internal marks breakdown.' },
                                ].map(item => (
                                    <div key={item.title} className="flex items-start gap-3 p-4 bg-av-light rounded-xl border border-av-sky/20">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span>
                                        <div>
                                            <p className="font-semibold text-av-blue text-sm">{item.title}:</p>
                                            <p className="text-gray-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="bg-av-blue rounded-2xl p-5 text-white">
                                    <h4 className="font-montserrat font-bold text-white mb-2">Is CGPA Used in ICSE?</h4>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        <strong className="text-av-orange">No</strong>, CGPA (Cumulative Grade Point Average) is used in CBSE, not in ICSE. The ICSE board gives <strong className="text-av-orange">subject-wise grades only</strong>.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Affiliation Criteria ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Affiliation</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Eligibility of Schools for <span className="text-av-orange">ICSE Affiliation</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            If a school wants to offer ICSE curriculum and get affiliated with CISCE, it must meet certain requirements. These rules ensure that the school maintains high standards in teaching, infrastructure, and student development.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {affiliationCriteria.map((c, i) => (
                            <ScrollReveal key={c.title} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full">
                                    <div className="text-2xl mb-3">{c.icon}</div>
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

            {/* ── Advantages ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Advantages</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Advantages of <span className="text-av-orange">ICSE Board</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            The ICSE (Indian Certificate of Secondary Education) board is known for its strong academic foundation, global recognition, and balanced curriculum. Here are the key reasons why ICSE is considered one of the best education boards in India:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {advantages.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-blue rounded-2xl p-8">
                            <h3 className="font-montserrat font-bold text-white text-xl mb-4 text-center">🎓 Who Should Choose ICSE?</h3>
                            <p className="text-white/70 text-center text-sm mb-5">ICSE is perfect for:</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {icseSuitableFor.map(item => (
                                    <div key={item} className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2">
                                        <span className="text-av-orange">✓</span>
                                        <span className="text-white text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Disadvantages ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Disadvantages</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            ⚠️ Disadvantages of <span className="text-av-orange">ICSE Board</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
                            While the ICSE Board is known for its rich curriculum and strong English foundation, it's important to also understand the challenges or disadvantages that come with it. This helps students and parents make an informed decision.
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {disadvantages.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-red-300 h-full">
                                    <div className="text-xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-red-600 mb-2 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ICSE vs CBSE ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Comparison</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            ICSE vs CBSE – <span className="text-av-orange">Which Education Board is Right for You?</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            When choosing the right board for your child, one of the biggest decisions is between ICSE and CBSE. Both are respected across India and abroad, but they serve different learning styles, goals, and career paths. Let's break it down in the simplest way possible:
                        </p>
                    </ScrollReveal>

                    {/* About Boards */}
                    <ScrollReveal className="mb-8">
                        <h3 className="font-montserrat text-xl font-bold text-white mb-4">🏛️ About the Boards</h3>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-white/10 text-white">
                                        <th className="px-4 py-3 text-left">Factor</th>
                                        <th className="px-4 py-3 text-left text-av-orange">ICSE</th>
                                        <th className="px-4 py-3 text-left text-green-400">CBSE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonAbout.map((row, i) => (
                                        <tr key={row.factor} className={i % 2 === 0 ? 'bg-white/5 text-white/80' : 'bg-white/10 text-white/80'}>
                                            <td className="px-4 py-3 font-semibold text-white">{row.factor}</td>
                                            <td className="px-4 py-3">{row.icse}</td>
                                            <td className="px-4 py-3">{row.cbse}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    {/* Curriculum Style */}
                    <ScrollReveal className="mb-8">
                        <h3 className="font-montserrat text-xl font-bold text-white mb-4">📚 Curriculum Style</h3>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-white/10 text-white">
                                        <th className="px-4 py-3 text-left">Aspect</th>
                                        <th className="px-4 py-3 text-left text-av-orange">ICSE</th>
                                        <th className="px-4 py-3 text-left text-green-400">CBSE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonCurriculum.map((row, i) => (
                                        <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white/5 text-white/80' : 'bg-white/10 text-white/80'}>
                                            <td className="px-4 py-3 font-semibold text-white">{row.aspect}</td>
                                            <td className="px-4 py-3">{row.icse}</td>
                                            <td className="px-4 py-3">{row.cbse}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 grid sm:grid-cols-2 gap-4">
                            <div className="glass rounded-xl p-4">
                                <p className="text-av-orange font-semibold text-sm">✅ Choose ICSE if</p>
                                <p className="text-white/70 text-xs mt-1">your child loves literature, creativity, and balanced learning.</p>
                            </div>
                            <div className="glass rounded-xl p-4">
                                <p className="text-green-400 font-semibold text-sm">✅ Choose CBSE if</p>
                                <p className="text-white/70 text-xs mt-1">your child is focused on engineering, medical or competitive exams.</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Subject Flexibility */}
                    <ScrollReveal className="mb-8">
                        <h3 className="font-montserrat text-xl font-bold text-white mb-4">🎓 Subject Flexibility</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="glass rounded-2xl p-6">
                                <p className="text-av-orange font-semibold mb-3">ICSE offers a wider range of subjects including:</p>
                                <ul className="space-y-2">
                                    {['Computer Applications', 'Environmental Science', 'Performing Arts', 'Home Science', 'Fashion Designing', 'Technical Drawing'].map(s => (
                                        <li key={s} className="flex items-center gap-2 text-white/80 text-sm">
                                            <span className="text-av-orange">•</span>{s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="glass rounded-2xl p-6">
                                <p className="text-green-400 font-semibold mb-3">CBSE sticks to core academic subjects, ideal for:</p>
                                <ul className="space-y-2">
                                    {['JEE aspirants', 'NEET aspirants', 'UCEED aspirants', 'Students focused on national-level competitive exams'].map(s => (
                                        <li key={s} className="flex items-center gap-2 text-white/80 text-sm">
                                            <span className="text-green-400">•</span>{s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Assessment Style */}
                    <ScrollReveal className="mb-8">
                        <h3 className="font-montserrat text-xl font-bold text-white mb-4">🧪 Assessment Style</h3>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-white/10 text-white">
                                        <th className="px-4 py-3 text-left">Factor</th>
                                        <th className="px-4 py-3 text-left text-av-orange">ICSE</th>
                                        <th className="px-4 py-3 text-left text-green-400">CBSE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonAssessment.map((row, i) => (
                                        <tr key={row.factor} className={i % 2 === 0 ? 'bg-white/5 text-white/80' : 'bg-white/10 text-white/80'}>
                                            <td className="px-4 py-3 font-semibold text-white">{row.factor}</td>
                                            <td className="px-4 py-3">{row.icse}</td>
                                            <td className="px-4 py-3">{row.cbse}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    {/* Recognition */}
                    <ScrollReveal className="mb-8">
                        <h3 className="font-montserrat text-xl font-bold text-white mb-4">🌍 Recognition and Scope</h3>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-white/10 text-white">
                                        <th className="px-4 py-3 text-left">Factor</th>
                                        <th className="px-4 py-3 text-left text-av-orange">ICSE</th>
                                        <th className="px-4 py-3 text-left text-green-400">CBSE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonRecognition.map((row, i) => (
                                        <tr key={row.factor} className={i % 2 === 0 ? 'bg-white/5 text-white/80' : 'bg-white/10 text-white/80'}>
                                            <td className="px-4 py-3 font-semibold text-white">{row.factor}</td>
                                            <td className="px-4 py-3">{row.icse}</td>
                                            <td className="px-4 py-3">{row.cbse}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>

                    {/* Cost & Toughness */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <ScrollReveal>
                            <div className="glass rounded-2xl p-6">
                                <h3 className="font-montserrat text-lg font-bold text-white mb-3">💰 Cost &amp; Accessibility</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-white/80 text-sm"><span className="text-av-orange">•</span><span><strong className="text-av-orange">ICSE Schools</strong> are mostly private and often charge higher fees.</span></li>
                                    <li className="flex items-start gap-2 text-white/80 text-sm"><span className="text-green-400">•</span><span><strong className="text-green-400">CBSE Schools</strong> are available in both private and government setups, making them more affordable and accessible.</span></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={150}>
                            <div className="glass rounded-2xl p-6">
                                <h3 className="font-montserrat text-lg font-bold text-white mb-3">🧠 Which Board is Tougher?</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2 text-white/80 text-sm"><span className="text-av-orange">•</span><span><strong className="text-av-orange">ICSE</strong> is considered slightly tougher because it goes deeper into every topic.</span></li>
                                    <li className="flex items-start gap-2 text-white/80 text-sm"><span className="text-green-400">•</span><span><strong className="text-green-400">CBSE</strong> is easier to manage, especially if you're preparing for entrance exams.</span></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Quick Summary */}
                    <ScrollReveal>
                        <h3 className="font-montserrat text-xl font-bold text-white mb-4 text-center">📝 Quick Summary – Which One Should You Choose?</h3>
                        <div className="overflow-x-auto rounded-2xl shadow">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-av-orange text-white">
                                        <th className="px-6 py-4 text-left">You should choose…</th>
                                        <th className="px-6 py-4 text-left">If you want…</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quickSummary.map((row, i) => (
                                        <tr key={row.choice} className={i % 2 === 0 ? 'bg-white/5 text-white/80' : 'bg-white/10 text-white/80'}>
                                            <td className="px-6 py-4 font-bold text-white">{row.choice}</td>
                                            <td className="px-6 py-4">{row.forWho}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}