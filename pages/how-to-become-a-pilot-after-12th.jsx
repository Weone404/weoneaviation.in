import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: '17+', label: 'Minimum Age', icon: '🎂' },
    { num: '200 hrs', label: 'Flight Hours', icon: '✈️' },
    { num: '13%', label: 'Job Growth (2030)', icon: '📈' },
    { num: '₹35–46L', label: 'Training Cost', icon: '💰' },
];

const pilotTypes = [
    { icon: '✈️', title: 'Commercial Pilot', desc: 'Flies passenger and cargo aircraft for airlines.' },
    { icon: '🛩️', title: 'Private Pilot', desc: 'Operates aircraft for personal or recreational use.' },
    { icon: '🎖️', title: 'Military Pilot', desc: 'Serves the country by flying for the armed forces.' },
    { icon: '💼', title: 'Corporate Pilot', desc: 'Pilots for business and corporate travel.' },
    { icon: '🎓', title: 'Flight Instructor', desc: 'Trains others in aviation and flight skills.' },
];

const physicalRequirements = [
    { requirement: 'Minimum Height', male: '5 feet 5 inches (165 cm)', female: '5 feet 5 inches (165 cm)' },
    { requirement: 'Body Mass Index (BMI)', male: '18.5 – 25', female: '18.5 – 25' },
    { requirement: 'Color Vision', male: 'Normal color vision', female: 'Normal color vision' },
    { requirement: 'Visual Acuity', male: '6/6 vision in each eye', female: '6/6 vision in each eye' },
    { requirement: 'Hearing', male: 'Good hearing with ≤20 decibels', female: 'Good hearing with ≤20 decibels' },
    { requirement: 'General Health', male: 'Physically fit, free of major conditions', female: 'Physically fit, free of major conditions' },
];

const selectionSteps = [
    {
        num: '1',
        icon: '✅',
        title: 'Meeting Basic Eligibility Criteria',
        desc: 'Age, educational qualifications (12th with Physics & Maths), and Class 2 Medical Certificate from a DGCA-approved doctor are mandatory to begin the pilot selection process.',
    },
    {
        num: '2',
        icon: '📝',
        title: 'Entrance Exams',
        desc: 'Written exams test knowledge in Physics, Mathematics, English, aviation theory, aerodynamics, and navigation. Some schools also include a general aptitude test.',
    },
    {
        num: '3',
        icon: '🗣️',
        title: 'Personal Interview',
        desc: 'Assesses personality, motivation, communication skills, career goals, passion for flying, and ability to handle stress and responsibility.',
    },
    {
        num: '4',
        icon: '🩺',
        title: 'Medical Examination',
        desc: 'Class 2 Medical for Student Pilots and Class 1 Medical for Commercial Pilots. Includes vision tests, ECG, blood tests, and hearing tests.',
    },
    {
        num: '5',
        icon: '🏫',
        title: 'Flight School Selection and Enrollment',
        desc: 'Evaluate schools based on reputation, training programs, instructor qualifications, costs, and facilities. Enroll after choosing your flight school.',
    },
    {
        num: '6',
        icon: '📚',
        title: 'Ground School Training',
        desc: 'Covers Aerodynamics, Aircraft Systems, Navigation, Meteorology, and Aviation Regulations. Can last from a few months to a year.',
    },
    {
        num: '7',
        icon: '✈️',
        title: 'Flight Training',
        desc: 'Includes basic maneuvers, advanced maneuvers, and solo flights under the supervision of a certified flight instructor.',
    },
    {
        num: '8',
        icon: '🪪',
        title: 'License Examinations',
        desc: 'Pass PPL (Private Pilot License) first, then CPL (Commercial Pilot License) exams after accumulating 200–250 flight hours.',
    },
    {
        num: '9',
        icon: '⭐',
        title: 'Obtaining Additional Ratings',
        desc: 'Multi-engine Rating (ME) for larger aircraft and Instrument Rating (IR) for flying under Instrument Flight Rules (IFR).',
    },
    {
        num: '10',
        icon: '📊',
        title: 'Building Flight Hours and Experience',
        desc: 'After CPL, accumulate additional flying hours as a flight instructor or co-pilot to qualify for First Officer or Captain positions.',
    },
];

const flightTrainingTypes = [
    { icon: '📚', title: 'Ground School', desc: 'Covers theoretical topics like aircraft systems, meteorology, and air traffic control.' },
    { icon: '🛩️', title: 'Flight Lessons', desc: 'Hands-on flying under instructor supervision.' },
    { icon: '🧑‍✈️', title: 'Solo Flights', desc: "After mastering basics, you'll reach a major milestone by flying solo." },
];

const advantages = [
    {
        icon: '🌟',
        title: '1. Exciting and Fulfilling Career',
        desc: 'Flying is a unique, challenging, and rewarding career. Pilots have the chance to experience the joy of being up in the air, navigating through different weather conditions, and landing at destinations all over the world. Every day is different, with new routes, unique situations, and opportunities to continually build skills.',
    },
    {
        icon: '💰',
        title: '2. Competitive Salary and Benefits',
        desc: 'Pilots are among the highest-paid professionals in the transportation industry. Airlines and commercial carriers offer competitive salaries, which often increase with experience and seniority. Benefits typically include health insurance, retirement plans, and paid vacation, ensuring long-term financial security and work-life balance.',
    },
    {
        icon: '🌍',
        title: '3. Travel and Adventure',
        desc: 'Pilots have the chance to see the world from above, exploring different cities and countries as part of their job. Many pilots enjoy time off at various destinations, providing an opportunity to explore new cultures, cuisines, and landscapes. This lifestyle offers a sense of freedom and adventure, attracting those with a passion for exploration.',
    },
    {
        icon: '📈',
        title: '4. High Demand for Pilots',
        desc: 'The demand for pilots is expected to grow significantly in the coming years due to the increase in air travel and the retirement of many seasoned pilots. Job security is a major advantage, as airlines, private companies, and cargo operators all need qualified pilots to meet growing industry needs.',
    },
    {
        icon: '🕐',
        title: '5. Flexible Work Schedule',
        desc: "Unlike traditional 9-to-5 jobs, pilots often have flexible work schedules. While the hours can be long, pilots also enjoy extended breaks between flights, allowing time to rest, travel, or spend time with family.",
    },
];

const tips = [
    {
        icon: '📅',
        title: '1. Start Planning Early',
        desc: 'The earlier you start preparing, the better. Research the qualifications, requirements, and costs involved in pilot training. Starting early gives you more time to save money and explore various training programs.',
    },
    {
        icon: '🤝',
        title: '2. Connect with the Aviation Community',
        desc: 'Joining aviation clubs, attending airshows, or volunteering at local airports can be great ways to meet people, gain knowledge, and build connections within the aviation community. Many pilots, instructors, and aviation professionals are happy to share advice and insights on the profession.',
    },
    {
        icon: '🎓',
        title: '3. Seek Mentorship and Advice from Experienced Pilots',
        desc: 'Talking to pilots can give you a realistic idea of what the job is like and what to expect in training. They can also offer guidance on career paths, flight schools, and industry trends.',
    },
    {
        icon: '💪',
        title: '4. Stay Persistent and Dedicated',
        desc: "Becoming a pilot is a time-consuming and costly process, but the rewards are worth it. Stay focused on your goal, and don't get discouraged by challenges along the way. Dedication and hard work will help you achieve your dream of flying.",
    },
];

const iafRoutes = [
    {
        num: '1',
        icon: '🏛️',
        title: 'National Defence Academy (NDA) Exam',
        eligibility: 'Unmarried males and females between 16.5 and 19.5 years of age.',
        education: 'Completed 12th grade from a recognized board with Physics and Mathematics.',
        selection: 'Conducted by UPSC twice a year. Written exam → physical and medical tests → interview.',
        training: 'Three years at NDA in Khadakwasla, then specialized flying training at IAF academies. Awarded B.Tech degree and commissioned as PCOs.',
    },
    {
        num: '2',
        icon: '🎖️',
        title: 'Combined Defence Services (CDS) Exam',
        eligibility: 'Candidates must be between 20 and 24 years old with a graduation degree in any discipline.',
        education: 'A bachelor\'s degree from a recognized university.',
        selection: 'UPSC conducts CDS written exam twice a year. Physical and medical tests → interview.',
        training: 'Training at the Air Force Academy, followed by specialized flying training. Commissioned as PCOs.',
    },
    {
        num: '3',
        icon: '✈️',
        title: 'Air Force Common Admission Test (AFCAT)',
        eligibility: 'Male and female candidates between 20 and 24 years old. For candidates holding a valid DGCA CPL, the age limit extends to 26 years.',
        education: 'A bachelor\'s degree from a recognized university.',
        selection: 'IAF conducts AFCAT written test twice a year. Physical and medical evaluations → interview.',
        training: 'Training at Air Force Academy with additional flying instruction. Graduates receive a Short Service Commission (SSC) for 14 years, with no possibility of extension.',
    },
    {
        num: '4',
        icon: '🎗️',
        title: 'NCC Special Entry',
        eligibility: 'Male candidates with an Air Wing Senior Division \'C\' Certificate from NCC. Both male and female candidates can apply for SSC.',
        education: 'NCC Air Wing Senior Division \'C\' Certificate.',
        selection: 'Apply online through the NCC website. Physical and medical evaluations → interview.',
        training: 'Training at Air Force Academy with specialized flying training. Male candidates commissioned as PCOs; both male and female receive Short Service Commission for 14-year term.',
    },
];

const ndaSelectionSteps = [
    {
        title: 'Written Exam',
        desc: 'Conducted twice a year by UPSC. Tests Mathematics (fundamental and advanced concepts) and General Ability Test (GAT) covering English, general knowledge, and current affairs.',
    },
    {
        title: 'Physical and Medical Examinations',
        desc: 'Physical Fitness Tests including running, push-ups, and sit-ups. In-depth medical assessment examining both physical and mental fitness.',
    },
    {
        title: 'Personal Interview',
        desc: 'Assesses leadership potential, communication skills, confidence, and motivation for a career in the Air Force.',
    },
];

const salaryData = [
    { level: 'Entry-Level Pilots', salary: '₹1.5 – 2 Lakhs / Month', note: 'Salaries grow rapidly with experience and flight hours.' },
    { level: 'Experienced Pilots', salary: '₹1 Crore+ / Year', note: 'Senior pilots with extensive flight hours, especially on large commercial aircraft.' },
    { level: 'IndiGo (Example)', salary: '₹62.7 Lakhs / Year (avg)', note: 'Major carriers offer competitive pay scales.' },
    { level: 'Annual Range', salary: '₹10 – 50 Lakhs / Year', note: 'Highly experienced pilots earn even more.' },
];

const careerPaths = [
    { icon: '✈️', title: 'Commercial Airlines', desc: 'The most common career path, offering high earning potential, extensive travel opportunities, and stable schedules.' },
    { icon: '📦', title: 'Cargo Pilots', desc: 'Cargo airlines such as Blue Dart and SpiceJet\'s cargo division offer competitive salaries and may have more flexible schedules.' },
    { icon: '💼', title: 'Corporate and Charter Pilots', desc: 'Work for private charter companies or as corporate pilots for businesses, enjoying diverse destinations and schedules.' },
    { icon: '🎓', title: 'Pilot Instructors', desc: 'Experienced pilots can transition into training roles at flight schools or within airlines, training the next generation of pilots.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BecomeAPilotPage() {
    return (
        <Layout
            title="How to Become a Pilot After 12th? – Complete Guide 2025 | India"
            description="Complete guide on how to become a pilot after 12th in India. Covers types of pilots, eligibility, physical requirements, selection process, IAF routes, salary, career outlook, and training costs."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Pilot Career Guide</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        How to Become a Pilot After 12th?
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed mb-4">
                        In this article, we'll guide you on how to become a pilot after 12th grade in India. This guide covers the different types of pilots, eligibility requirements, training types, career prospects, and much more.
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto text-sm leading-relaxed">
                        Flying airplanes is a dream many people hold, captivated by the freedom, excitement, and perspective it offers. If you're one of those who envision a career as a pilot, you're in the right place! Becoming a pilot requires dedication, hard work, and specific qualifications, but with the right steps, you can achieve this incredible goal.
                    </p>
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

            {/* ── Types of Pilots ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Pilot Roles</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Types of <span className="text-av-orange">Pilots</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Depending on your career goals, you can pursue one of these pilot roles:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {pilotTypes.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal className="mt-5">
                        <p className="text-center text-gray-500 text-sm">Each role comes with its own set of requirements and offers unique career experiences.</p>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Eligibility Requirements ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Eligibility</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Eligibility Requirements to Become a <span className="text-av-orange">Pilot in India</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">To begin your journey, you must meet the following criteria:</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <ScrollReveal>
                            <div className="space-y-4">
                                {[
                                    { icon: '🎂', label: 'Age', value: 'Minimum 17 years.' },
                                    { icon: '📚', label: 'Education', value: 'Completion of 12th grade with Physics and Mathematics.' },
                                    { icon: '🩺', label: 'Medical', value: 'Obtain a Class 2 medical certificate from a DGCA-approved doctor.' },
                                ].map(item => (
                                    <div key={item.label} className="flex items-start gap-4 p-4 bg-av-light rounded-xl border border-av-sky/20">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <p className="text-sm text-gray-600"><strong className="text-av-blue">{item.label}:</strong> {item.value}</p>
                                    </div>
                                ))}
                                <p className="text-gray-500 text-sm leading-relaxed mt-2">These basic requirements will ensure you qualify for the initial stages of pilot training.</p>
                            </div>
                        </ScrollReveal>

                        {/* Physical Requirements Table */}
                        <ScrollReveal delay={200}>
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-4">Physical Eligibility Requirements for Males &amp; Females</h3>
                            <p className="text-gray-500 text-sm mb-4">Both male and female pilots must meet specific physical criteria to be eligible:</p>
                            <div className="overflow-x-auto rounded-2xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-4 py-3 text-left">Requirement</th>
                                            <th className="px-4 py-3 text-left">Male</th>
                                            <th className="px-4 py-3 text-left">Female</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {physicalRequirements.map((row, i) => (
                                            <tr key={row.requirement} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-4 py-3 font-semibold text-av-blue text-xs">{row.requirement}</td>
                                                <td className="px-4 py-3 text-gray-600 text-xs">{row.male}</td>
                                                <td className="px-4 py-3 text-gray-600 text-xs">{row.female}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-400 text-xs mt-3">Meeting these standards is necessary to ensure safety in the cockpit.</p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Selection Process ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Selection Process</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Selection Process to <span className="text-av-orange">Become a Pilot</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Becoming a pilot is an exciting and challenging journey, and the selection process is one of the most crucial steps in achieving this dream. Whether you aspire to be a commercial pilot, private pilot, or even a pilot in the Indian Air Force, the process includes several stages that assess your physical, mental, and academic readiness for flight training.
                        </p>
                        <p className="text-gray-500 mt-2 text-sm font-semibold">Here's a detailed look at the selection process to become a pilot:</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectionSteps.map((step, i) => (
                            <ScrollReveal key={step.num} delay={i * 60}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{step.num}</div>
                                        <span className="text-2xl">{step.icon}</span>
                                    </div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{step.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed flex-grow">{step.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Types of Flight Training ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Training Types</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Types of <span className="text-av-orange">Flight Training</span>
                        </h2>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-3 gap-6">
                        {flightTrainingTypes.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 100}>
                                <div className="bg-av-blue rounded-2xl p-8 text-center h-full">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-white text-lg mb-3">{item.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Advantages ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-8">
                        <div className="section-tag">Why Become a Pilot</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Advantages of <span className="text-av-orange">Becoming a Pilot</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Many people dream of becoming a pilot, and it's easy to see why. For some, it's the thrill of flying; for others, it's the chance to travel, meet people, and enjoy a career with strong earning potential. Here's a look at some of the key benefits of choosing a career as a pilot:
                        </p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantages.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-2xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Tips ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Tips</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Tips for <span className="text-av-orange">Becoming a Pilot</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Getting into a pilot career requires dedication, planning, and preparation. Here are some helpful tips to guide you on your journey:</p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tips.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-3xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Indian Air Force ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-6">
                        <div className="section-tag">Indian Air Force</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            How to Become a Pilot in the <span className="text-av-orange">Indian Air Force</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            If you're interested in becoming a pilot but prefer serving in a governmental sector instead of commercial aviation, you can explore a career as a pilot in the Indian Air Force (IAF). There are several entry pathways to join the IAF as a pilot, each with specific eligibility requirements, selection processes, and training programs.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        {iafRoutes.map((route, i) => (
                            <ScrollReveal key={route.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 h-full">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-av-orange rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{route.num}</div>
                                        <span className="text-2xl">{route.icon}</span>
                                        <h3 className="font-montserrat font-bold text-white text-sm leading-snug">{route.title}</h3>
                                    </div>
                                    <div className="space-y-2">
                                        <div><p className="text-av-orange text-xs font-semibold">Eligibility:</p><p className="text-white/70 text-xs leading-relaxed">{route.eligibility}</p></div>
                                        <div><p className="text-av-orange text-xs font-semibold">Educational Requirements:</p><p className="text-white/70 text-xs leading-relaxed">{route.education}</p></div>
                                        <div><p className="text-av-orange text-xs font-semibold">Selection Process:</p><p className="text-white/70 text-xs leading-relaxed">{route.selection}</p></div>
                                        <div><p className="text-av-orange text-xs font-semibold">Training:</p><p className="text-white/70 text-xs leading-relaxed">{route.training}</p></div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal>
                        <div className="glass rounded-2xl p-6 text-center">
                            <p className="text-white/70 text-sm mb-3">Alongside the academic and entrance requirements, candidates must meet strict medical and physical standards including minimum and maximum limits for height and weight, eyesight requirements, and other health criteria.</p>
                            <p className="text-white/60 text-sm mb-3">For further information on exams and eligibility, you can refer to the official websites:</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="https://upsc.gov.in/" target="_blank" rel="noopener noreferrer" className="text-av-orange text-sm font-semibold hover:underline">UPSC: upsc.gov.in</a>
                                <a href="https://afcat.cdac.in/" target="_blank" rel="noopener noreferrer" className="text-av-orange text-sm font-semibold hover:underline">IAF (AFCAT): afcat.cdac.in</a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── How to Become IAF Pilot After 12th ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">After 12th – IAF</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            How To Become A Pilot In The Indian Air Force <span className="text-av-orange">After 12th?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            If you dream of becoming a pilot in the Indian Air Force (IAF) right after 12th grade, the <strong>National Defence Academy (NDA)</strong> is the key path forward. The NDA exam offers a prestigious entry point into a career as an IAF pilot, with a structured pathway that combines rigorous training and comprehensive education.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Eligibility */}
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue text-lg mb-4">1) Eligibility Criteria:</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Gender and Marital Status', value: 'Unmarried male and female candidates are eligible.' },
                                        { label: 'Age Requirement', value: '16.5 to 19.5 years.' },
                                        { label: 'Educational Qualification', value: 'Completion of Class 12 with Physics and Mathematics from a recognized board is mandatory.' },
                                    ].map(item => (
                                        <div key={item.label} className="p-3 bg-av-light rounded-lg border border-av-sky/20">
                                            <p className="text-av-blue font-semibold text-xs">{item.label}</p>
                                            <p className="text-gray-600 text-xs mt-0.5">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Selection Process */}
                        <ScrollReveal delay={100}>
                            <div className="bg-av-blue rounded-2xl p-7 text-white h-full">
                                <h3 className="font-montserrat font-bold text-white text-lg mb-4">2) Step-by-Step Selection Process:</h3>
                                <div className="space-y-4">
                                    {ndaSelectionSteps.map((s, i) => (
                                        <div key={s.title} className="flex items-start gap-3">
                                            <div className="w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
                                            <div>
                                                <p className="text-av-orange font-semibold text-xs">{s.title}</p>
                                                <p className="text-white/70 text-xs leading-relaxed mt-0.5">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Training & Career Path */}
                        <ScrollReveal delay={200}>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-7 h-full">
                                <h3 className="font-montserrat font-bold text-av-blue text-lg mb-4">3) Training and Career Path:</h3>
                                <div className="space-y-4">
                                    <div className="p-3 bg-av-light rounded-lg border border-av-sky/20">
                                        <p className="text-av-blue font-semibold text-xs mb-1">National Defence Academy (NDA) Training:</p>
                                        <p className="text-gray-600 text-xs leading-relaxed">Successful candidates join the NDA in Khadakwasla for a three-year intensive program covering academic studies, physical training, military drills, and leadership development. Graduates earn a B.Tech. degree and are commissioned as PCOs.</p>
                                    </div>
                                    <div className="p-3 bg-av-light rounded-lg border border-av-sky/20">
                                        <p className="text-av-blue font-semibold text-xs mb-1">Specialized Flying Training:</p>
                                        <p className="text-gray-600 text-xs leading-relaxed">After graduation from the NDA, candidates proceed to IAF academies for advanced flying training, where they receive the skills and experience required to become IAF pilots.</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal className="mt-8">
                        <div className="bg-av-blue rounded-2xl p-6">
                            <h4 className="font-montserrat font-bold text-white mb-4 text-center">Important Tips for Aspiring Candidates:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    'The NDA entrance exam is highly competitive, demanding focused preparation, particularly in mathematics and general knowledge.',
                                    'Physical endurance and mental resilience are essential for the selection process, training, and eventual responsibilities as an Air Force pilot.',
                                ].map((tip, i) => (
                                    <div key={i} className="flex items-start gap-2 text-white/80 text-sm">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{tip}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/60 text-xs text-center mt-4">In conclusion, becoming a pilot in the Indian Air Force through the NDA is a rewarding journey that combines academic excellence, physical fitness, and determination. With structured training, a competitive selection process, and dedication, you can achieve your dream of serving as a pilot in the IAF.</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Average Pilot Salary ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-10">
                        <div className="section-tag">Salary</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Average Pilot Salary <span className="text-av-orange">In India</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            In India, pilot salaries can vary widely, influenced by factors like experience level, type of aircraft flown, and the airline they work for. Generally, the average salary for pilots in India ranges from approximately <strong className="text-av-blue">₹10 lakhs to ₹50 lakhs annually</strong>, with highly experienced pilots earning even more.
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <ScrollReveal>
                            <div className="overflow-x-auto rounded-2xl shadow">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="px-5 py-3 text-left">Level</th>
                                            <th className="px-5 py-3 text-left">Salary</th>
                                            <th className="px-5 py-3 text-left">Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salaryData.map((row, i) => (
                                            <tr key={row.level} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-5 py-3 font-semibold text-av-blue text-xs">{row.level}</td>
                                                <td className="px-5 py-3 font-bold text-av-orange text-sm">{row.salary}</td>
                                                <td className="px-5 py-3 text-gray-500 text-xs">{row.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl p-8 text-white h-full">
                                <h3 className="font-montserrat font-bold text-white text-xl mb-4">Factors Impacting Pilot Salaries in India:</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Experience Level', desc: 'As pilots progress from junior to senior levels, their pay packages increase considerably.' },
                                        { label: 'Aircraft Size', desc: 'Larger aircraft require more skill and training, which is often rewarded with higher pay.' },
                                        { label: 'Type of Airline', desc: 'Major airlines offer higher pay than smaller, regional carriers.' },
                                    ].map(item => (
                                        <div key={item.label} className="bg-white/10 rounded-xl p-4">
                                            <p className="text-av-orange font-semibold text-sm">{item.label}</p>
                                            <p className="text-white/70 text-xs mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white/50 text-xs mt-4">In conclusion, pilot salaries in India start at competitive levels and can grow exponentially with experience, aircraft type, and airline affiliation.</p>
                            </div>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal>
                        <div className="bg-av-light border border-av-sky/20 rounded-2xl p-5 text-center">
                            <Link href="/commercial-pilot-salary" className="text-av-blue font-semibold text-sm hover:text-av-orange transition-colors">
                                Know About Commercial Pilot Salary: Everything You Need to Know (Country Wise) →
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Career Outlook ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Career Outlook</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Career Outlook <span className="text-av-orange">for Pilots</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">The pilot job market in India is strong, with a projected growth rate of <strong>13%</strong> through 2030.</p>
                    </ScrollReveal>

                    {/* High Demand */}
                    <ScrollReveal className="mb-8">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                            <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">High Demand for Trained Pilots</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { icon: '🌍', title: 'Expanding Aviation Industry', desc: "India is rapidly becoming a global aviation hub, with new domestic and international routes constantly being added. The Indian government's push to increase regional connectivity and infrastructure development at airports across the country has also contributed to this growth." },
                                    { icon: '✈️', title: 'Increasing Fleet Size', desc: 'Major airlines like IndiGo, Air India, and SpiceJet have large-scale expansion plans and are adding hundreds of new aircraft to their fleets, which means a need for more pilots to operate these planes.' },
                                    { icon: '🌐', title: 'Global Pilot Shortage', desc: 'The worldwide pilot shortage is also a factor, making skilled Indian pilots more in demand both domestically and internationally. Many Indian pilots have opportunities to work abroad as airlines in other countries face shortages as well.' },
                                ].map((item, i) => (
                                    <div key={item.title} className="flex flex-col">
                                        <div className="text-2xl mb-2">{item.icon}</div>
                                        <h4 className="font-montserrat font-bold text-av-blue mb-1 text-sm">{item.title}</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Earning & Job Stability */}
                    <ScrollReveal className="mb-8">
                        <div className="bg-av-blue rounded-2xl p-8 text-white">
                            <h3 className="font-montserrat font-bold text-white text-xl mb-5">Earning Potential and Job Stability</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { icon: '💰', title: 'Competitive Salaries', desc: 'Pilot salaries in India start high and grow steadily with experience. While entry-level salaries range from ₹1.5 to ₹2 lakhs per month, senior pilots can earn over ₹1 crore annually.' },
                                    { icon: '🔒', title: 'Job Security', desc: 'As experienced pilots approach retirement, new pilots are needed to replace them, making this a stable career with opportunities for advancement.' },
                                    { icon: '📊', title: 'Growth Opportunities', desc: 'Pilots can progress from first officers to captains, and with enough experience, can explore roles in aviation training, management, or consultancy, expanding career flexibility beyond flying.' },
                                ].map(item => (
                                    <div key={item.title}>
                                        <div className="text-2xl mb-2">{item.icon}</div>
                                        <h4 className="font-montserrat font-bold text-white mb-1 text-sm">{item.title}</h4>
                                        <p className="text-white/70 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Diverse Career Paths */}
                    <ScrollReveal>
                        <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5">Diverse Career Paths within Aviation</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {careerPaths.map((item, i) => (
                                <div key={item.title} className="card-hover bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full">
                                    <div className="text-2xl mb-3">{item.icon}</div>
                                    <h4 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.title}</h4>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── Cost of Pilot Training ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Training Cost</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-5">
                            Cost of <span className="text-av-orange">Pilot Training</span>
                        </h2>
                        <p className="text-white/80 text-sm leading-relaxed mb-6">
                            Pilot training can be expensive, typically ranging from <strong className="text-av-orange text-lg">₹35 lakhs to ₹46 lakhs</strong>. Costs vary by flight school and training type but are a necessary investment for this high-demand career.
                        </p>
                        <Link href="/courses/cpl" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Wants To Know Pilot Course Fees in India →
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}