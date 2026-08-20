import Head from 'next/head';
import Layout from '../../components/Layout';
import HeroSlider from '../../components/HeroSlider';
import LeadForm from '../../components/LeadForm';
import ScrollReveal from '../../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Most Popular Course', title: 'Commercial Pilot', highlight: 'License (CPL)', sub: 'Fly for airlines – India\'s most comprehensive CPL training program' },
];

const syllabus = [
    { phase: 'Phase 1: Ground School', duration: '3-4 months', topics: ['Air Navigation', 'Meteorology', 'Air Regulations', 'Technical General', 'RTR (Radio Telephony)', 'Aviation Medicine'] },
    { phase: 'Phase 2: PPL Training', duration: '4-5 months', topics: ['Solo flights', 'Cross-country flying', 'Night flying', 'Basic instrument flying', 'Emergency procedures', 'PPL skill test'] },
    { phase: 'Phase 3: CPL Flying', duration: '8-10 months', topics: ['Instrument Rating (IR)', 'Multi-engine rating', 'Advanced navigation', 'CPL skill test', 'Type rating prep', 'Airline interview prep'] },
];

const eligibility = [
    { label: 'Age', desc: 'Candidate Must Be Atleast 18 Years For Getting Commercial Pilot License.' },
    { label: 'Education', desc: 'The qualifications to become a pilot include passing 12th grade with Mathematics and Physics.' },
    { label: 'Dgca Class 1-2 Medical', desc: 'The qualification of becoming a pilot requires the candidate to have no physical issues and to qualify for DGCA Class 1 and Class 2 medical examinations.' },
    { label: 'Total Flight Hours', desc: 'Candidate must have completed a minimum of 200 hours of flight time by DGCA.' },
    { label: 'Pilot-in-Command (PIC) Hours', desc: 'This should include 100 hours of flight time as Pilot-in-Command (PIC).' },
    { label: 'Instrument Flying Training', desc: 'At least 10 hours of instruction in flying with instruments is required.' },
    { label: 'Simulator Training', desc: '5 hours of training on a flight sim must be done.' },
    { label: 'Nationality & Language Proficiency', desc: 'The qualification required to become a pilot includes holding Indian citizenship or being an OCI. Candidates must also demonstrate proficiency in English, both written and verbal.' },
    { label: 'Background Check', desc: 'Candidates applying for commercial pilot training must have no history of crime.' },
];

const medicalChecks = [
    { icon: '👁️', title: 'Vision Test', desc: 'Checks distant and near vision (should be 6/6 with or without correction). Color blindness test using the Ishihara test.' },
    { icon: '🎧', title: 'Hearing Test', desc: 'Assesses hearing ability using Pure Tone Audiometry (PTA).' },
    { icon: '❤️', title: 'Cardiovascular Examination', desc: 'ECG (Electrocardiogram) to check heart function. Blood pressure monitoring.' },
    { icon: '🧠', title: 'Neurological Examination', desc: 'Evaluates reflexes, balance, and coordination. MRI or CT scan if necessary.' },
    { icon: '🩺', title: 'General Physical Check-up', desc: 'Height, weight, and BMI assessment. Examination of lungs, liver, kidney, and other vital organs.' },
    { icon: '🩸', title: 'Blood & Urine Tests', desc: 'Checks for diabetes, cholesterol, liver/kidney function, and infections.' },
    { icon: '🧠', title: 'Psychological & Mental Health Assessment', desc: 'Evaluates stress management and mental well-being.' },
];

const feeTable = [
    { num: 1, category: 'DGCA Class 2 Medical Test', cost: '₹3,000 - ₹6,000' },
    { num: 2, category: 'DGCA Class 1 Medical Test', cost: '₹5,000 - ₹10,000' },
    { num: 3, category: 'Computer Number Registration', cost: '₹2,000 - ₹2,500' },
    { num: 4, category: 'DGCA Exam Fees (per paper)', cost: '₹2,500 - ₹3,000' },
    { num: 5, category: 'CPL Ground School Fees', cost: '₹1,50,000 - ₹3,00,000' },
    { num: 6, category: 'Flying Training (200 hours)', cost: '₹35,00,000 - ₹45,00,000' },
    { num: 7, category: 'Simulator Training', cost: '₹2,00,000 - ₹5,00,000' },
    { num: 8, category: 'Flight School Admission Fees', cost: '₹1,00,000 - ₹2,00,000' },
    { num: 9, category: 'License Issuance & Other DGCA Fees', cost: '₹50,000 - ₹1,00,000' },
    { num: 10, category: 'Visa & Travel (If Training Abroad)', cost: '₹2,00,000 - ₹5,00,000' },
];

const howToGet = [
    { title: 'Choose a Right Ground Classes', desc: 'At First, You Have to Choose a Right Ground Classes Like We One Aviation Academy Which Gives You Advance Pilot Training and Support You Till You will Not Make Commercial air Pilot.' },
    { title: 'Prepare For Dgca Exam', desc: 'After Taking Admission in Dgca Ground Classes, You Have to Prepare Yourself For Dgca Exam for Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific and Radio Telephony (RTR).' },
    { title: 'Join Flight Training Academy', desc: 'After Clear Dgca Exam, You Have To Join Flight Training And Complete 200 Hrs of Flying From Any Flying Schools.' },
];

const prepTips = [
    'Attend ground classes regularly and use DGCA-approved study materials (e.g., books by authors like R.K. Bali or Oxford Aviation Academy manuals).',
    'Practice with past question papers and mock tests.',
    'Focus on understanding concepts rather than rote memorization, as questions can be application-based.',
];

const salaryData = [
    { level: 'Starting Salary (Beginners)', range: '₹1.5 – 3 Lakh/month', annual: '₹18 – 36 Lakh/year', desc: "If you're just starting out with a CPL, you might not earn a lot right away. In India, new pilots (called First Officers or Junior Pilots) can make around ₹1.5 lakh to ₹3 lakh per month. That's about ₹18 lakh to ₹36 lakh per year. This is when you're still learning on the job and helping the main pilot (the Captain)." },
    { level: 'Mid-Level Salary (With Some Experience)', range: '₹5 – 10 Lakh/month', annual: '₹60 Lakh – 1.2 Crore/year', desc: 'After a few years of flying—say 4 to 10 years—your salary goes up. You might become a Senior First Officer or even a Captain. At this stage, pilots in India can earn between ₹5 lakh to ₹10 lakh per month, which is ₹60 lakh to ₹1.2 crore per year. The more hours you fly, the more you earn!' },
    { level: 'Top-Level Salary (Senior Pilots)', range: '₹12 – 25 Lakh/month', annual: '₹1.5 Crore – 3 Crore/year', desc: "If you've been flying for a long time (over 10-20 years) and work for a big airline, you can make a lot of money. Senior Captains flying big planes (like international flights) can earn ₹12 lakh to ₹25 lakh per month—or even more! That's over ₹1.5 crore to ₹3 crore per year. Pilots working for international airlines might earn even higher, sometimes double that amount." },
];

const perks = [
    'Free or cheap flights for themselves and their families.',
    'Health insurance and retirement plans.',
    'Hotel stays and travel allowances when they fly to other places.',
    'A fancy uniform and a job that feels adventurous!',
];

const careerOptions = [
    {
        num: '1', title: 'Airline Pilot', icon: '✈️',
        what: 'Fly big planes like Airbus or Boeing, taking people to their destinations safely.',
        where: 'Airlines like IndiGo, Air India, SpiceJet, Vistara, or international ones if you gain more experience.',
        growth: 'Start as a First Officer (helping the Captain), and after years of flying (usually 5-10 years), you can become a Captain.',
        salary: 'Beginners earn ₹1.5 lakh to ₹3 lakh per month. Senior pilots can make ₹10 lakh or more monthly.',
    },
    {
        num: '2', title: 'Cargo Pilot', icon: '📦',
        what: 'Fly cargo planes for companies that deliver items across India or globally.',
        where: 'Companies like Blue Dart Aviation, Amazon Air (if it expands to India), or logistics firms like FedEx and DHL.',
        growth: "Fewer passengers mean less pressure, and you might fly at night or to unique places.",
        salary: 'Similar to airline pilots—₹2 lakh to ₹5 lakh per month to start, growing with experience.',
    },
    {
        num: '3', title: 'Charter Pilot', icon: '🛩️',
        what: "Fly smaller planes to places that big airlines don't go, like hill stations or private airstrips.",
        where: 'Private aviation companies, rich clients, or tourism agencies.',
        growth: "You get to meet interesting people and visit offbeat locations.",
        salary: '₹1 lakh to ₹4 lakh per month, depending on demand and hours flown.',
    },
    {
        num: '4', title: 'Flight Instructor', icon: '🎓',
        what: 'Teach students how to fly planes and help them get their own CPL.',
        where: 'Flight schools like IGRUA, Bombay Flying Club, or private academies.',
        growth: "You build more flying hours while earning, and it's a stable job.",
        salary: '₹1 lakh to ₹3 lakh per month, plus extra hours can boost your income.',
    },
    {
        num: '5', title: 'Corporate Pilot', icon: '💼',
        what: 'Fly private jets or small planes for business leaders.',
        where: 'Large Indian companies like Reliance, Tata, or multinational firms.',
        growth: 'Fewer flights, more predictable schedules, and sometimes better pay.',
        salary: '₹2 lakh to ₹6 lakh per month, depending on the company.',
    },
    {
        num: '6', title: 'Agricultural Pilot', icon: '🌾',
        what: 'Fly small planes to spray crops with water, fertilizers, or pesticides.',
        where: 'Rural areas or companies that support farmers.',
        growth: "You fly low and help grow food for the country!",
        salary: '₹1 lakh to ₹2.5 lakh per month.',
    },
    {
        num: '7', title: 'Aerial Survey Pilot', icon: '🛰️',
        what: 'Fly over areas to collect data for maps, construction, or research.',
        where: 'Government projects, survey companies, or environmental groups.',
        growth: "You contribute to science and planning.",
        salary: '₹1.5 lakh to ₹4 lakh per month.',
    },
    {
        num: '8', title: 'Emergency Services Pilot (Air Ambulance)', icon: '🚑',
        what: 'Transport sick or injured people to hospitals quickly.',
        where: 'Hospitals, NGOs, or private ambulance services.',
        growth: "You help people in need.",
        salary: '₹2 lakh to ₹5 lakh per month.',
    },
];

const LAST_UPDATED = 'August 19, 2026';
const LAST_UPDATED_ISO = '2026-08-19';

const cplCourseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Commercial Pilot Licence (CPL) Training',
    description: 'CPL (Aeroplanes) training and DGCA ground classes. Statutory requirements under Schedule II, Section J of the Aircraft Rules, 1937.',
    inLanguage: 'en-IN',
    dateModified: LAST_UPDATED_ISO,
    url: 'https://weoneaviation.in/courses/cpl',
    provider: { '@type': 'EducationalOrganization', name: 'We One Aviation Academy', url: 'https://weoneaviation.in' },
};

export default function CPL() {
    return (
        <Layout title="Commercial Pilot License (CPL) Training in India | We One Aviation" description="DGCA approved CPL training in India. Become a commercial pilot with We One Aviation Academy. Expert instructors, modern aircraft, placement support.">
            <Head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cplCourseSchema) }} />
            </Head>
            <HeroSlider customSlides={heroSlides} asH1={false} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">CPL Program</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Commercial Pilot License (CPL) Training
                            </h1>

                            {/* Direct answer. Written to stand alone if extracted. */}
                            <p className="text-gray-700 leading-relaxed mb-6 text-base">
                                The Commercial Pilot Licence (Aeroplanes) is the licence required to fly commercially in India. Schedule II, Section J of the Aircraft Rules, 1937 sets a minimum age of 18, Class Ten plus Two with Physics and Mathematics, 200 hours of flight time, a medical certificate, and a Flight Radio Telephone Operator&rsquo;s Licence.
                            </p>

                            <p className="text-gray-500 text-xs mb-8">{`Last updated: ${LAST_UPDATED}`}</p>

                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">CPL eligibility under the Aircraft Rules, 1937</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                The requirements below are set by the Aircraft Rules, 1937 (continued in force by section 43(2) of the Bharatiya Vayuyan Adhiniyam, 2024), Schedule II, Section J. They apply to a Commercial Pilot&rsquo;s Licence (Aeroplanes) and hold wherever the training is done.
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                                <table className="w-full text-sm">
                                    <caption className="sr-only">CPL (Aeroplanes) eligibility, Aircraft Rules 1937 Schedule II Section J</caption>
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Requirement</th>
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">What Schedule II requires</th>
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Clause</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Minimum age</th>
                                            <td className="p-3 text-gray-600 text-xs">Not less than 18 years on the date of application</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(a)</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Educational qualification</th>
                                            <td className="p-3 text-gray-600 text-xs">Class Ten plus Two, or equivalent, with Physics and Mathematics from a recognised Board or University</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(b)</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Medical fitness</th>
                                            <td className="p-3 text-gray-600 text-xs">Certificate of physical fitness from an approved Medical Board, against the standards notified by the Director-General under Rule 39B</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(c)</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Written examination</th>
                                            <td className="p-3 text-gray-600 text-xs">Air Regulations, Air Navigation, Meteorology, and Aircraft and Engines, plus a Signals (practical) examination for interpretation of aural and visual signals</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(d)</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Radio telephony</th>
                                            <td className="p-3 text-gray-600 text-xs">A current Flight Radio Telephone Operator’s Licence for operating radio telephone apparatus on board an aircraft</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(g)</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Skill test</th>
                                            <td className="p-3 text-gray-600 text-xs">Competency demonstrated to an examiner on the type applied for, within the six months preceding the application</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(h)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">CPL flight-time requirement</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Paragraph 1(e) of Section J sets the flying experience. The 200 hours is a total; the rows beneath it are minimums that sit inside that total, not additions to it.
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                                <table className="w-full text-sm">
                                    <caption className="sr-only">CPL (Aeroplanes) flight-time requirement, Schedule II Section J paragraph 1(e)</caption>
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Component</th>
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">What Schedule II requires</th>
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Clause</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Total flight time</th>
                                            <td className="p-3 text-gray-600 text-xs">Not less than 200 hours as pilot of an aeroplane, completed within the five years immediately preceding the application</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Pilot-in-command</th>
                                            <td className="p-3 text-gray-600 text-xs">Not less than 100 hours, of which not less than 15 hours in the six months immediately preceding the application</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)(i)</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Cross-country as PIC</th>
                                            <td className="p-3 text-gray-600 text-xs">Not less than 20 hours, including one cross-country flight of not less than 300 nautical miles with full-stop landings at two different aerodromes</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)(ii)</td>
                                        </tr>
                                        <tr className="bg-gray-50">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Instrument time</th>
                                            <td className="p-3 text-gray-600 text-xs">Not less than 10 hours, of which not more than 5 hours may be on an approved simulator</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)(iii)</td>
                                        </tr>
                                        <tr className="bg-white">
                                            <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">Night flying</th>
                                            <td className="p-3 text-gray-600 text-xs">Not less than 5 hours, including at least 10 take-offs and 10 landings as pilot-in-command (sole manipulator of the controls), within the preceding six months</td>
                                            <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">1(e)(iv)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-500 text-xs mb-10">
                                A holder of a Commercial Pilot&rsquo;s Licence (Helicopters) or Airline Transport Pilot&rsquo;s Licence (Helicopters) with not less than 1,000 hours as pilot-in-command of a helicopter has the 200-hour requirement reduced to 100 hours, under the proviso to paragraph 1(e).
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                The Commercial Pilot Licence is the licence a pilot needs to be paid to fly. We One Aviation Academy runs the DGCA ground classes for the written papers and arranges the flight training that builds the hours listed above.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                Training is available in India and with partner schools in the USA, Canada and Australia. Hours flown abroad count towards the Schedule II total, and the licence is issued after conversion by the DGCA.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                {[['18-24 months', 'Duration'], ['200 hours', 'Min Flight Hours'], ['10+2 PCM', 'Eligibility'], ['₹40-70 Lakh', 'Course Fee']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Syllabus */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">Training Syllabus</h3>
                            <div className="space-y-4">
                                {syllabus.map((phase, i) => (
                                    <div key={phase.phase} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center justify-between bg-av-blue p-4">
                                            <h4 className="font-montserrat font-bold text-white text-sm">{phase.phase}</h4>
                                            <span className="text-av-orange text-xs font-semibold">{phase.duration}</span>
                                        </div>
                                        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                            {phase.topics.map(t => (
                                                <div key={t} className="flex items-center gap-2 text-gray-600 text-xs">
                                                    <span className="text-av-orange">▸</span>{t}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Eligibility */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mt-10 mb-5">Eligibility Criteria</h3>
                            <ul className="space-y-3 mb-10">
                                {eligibility.map((item) => (
                                    <li key={item.label} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        <span><span className="font-semibold text-av-blue">{item.label} –</span> {item.desc}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CPL Fees */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Commercial Pilot Course (CPL) Fees in India</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Cost to become a pilot in India is Depend on Flying Schools From Where you will do Flying. So There is All Details of Cpl Course fees From Classes to Cockpit-
                            </p>

                            {/* 1) DGCA Medical */}
                            <h4 className="font-montserrat font-bold text-av-blue mb-3">1) DGCA Class 1-2 Medical Test</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                At First You Have To Clear Dgca Class 1-2 Medical From Any Dgca Medical Doctors. In Dgca Medical, Doctors Check candidate's health to ensure they meet the physical and mental fitness standards required for flying. The Dgca Medical examination includes:
                            </p>
                            <div className="space-y-2 mb-4">
                                {medicalChecks.map((check) => (
                                    <div key={check.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="flex-shrink-0">{check.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{check.title}:</span> {check.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">💰 <span className="font-semibold text-av-blue">DGCA Medical Fees (Approximate):</span></p>
                            <p className="text-sm text-gray-600 mb-1">Class 1 Medical: ₹5,000 – ₹10,000 (at DGCA-approved hospitals)</p>
                            <p className="text-sm text-gray-600 mb-8">Class 2 Medical: ₹3,000 – ₹6,000 (at DGCA-approved doctors)</p>

                            {/* 2) DGCA Exam */}
                            <h4 className="font-montserrat font-bold text-av-blue mb-3">2) DGCA CPL Exams and Fees</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                You Have To Give 6 Paper of Dgca Exam. There Are Two Process of Conducting Commercial Pilot License Exam By Dgca. One is Regular Exam and Another is On-Demand Exam. Regular Exam is Happen in 4 Times in a Years and On-Demand Exam is Flexible, as per candidate's choice.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                The Fees of Regular Dgca Exam is Rs. 2500/ Subjects and Fees Of On-Demand Dgca Exam is Rs. 5000/Paper.
                            </p>

                            {/* 3) Ground Classes */}
                            <h4 className="font-montserrat font-bold text-av-blue mb-3">3) Dgca Ground Classes</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                If You Wants To Crack Dgca Exam Quickly Then Dgca Ground Classes is Important For You Because By The Right Guidance, You Can Clear Dgca Exam Quickly and Achieve Your Dream To Become Commercial Pilot Quickly.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                Fees of Dgca Ground Classes is Different in Every Institute. So Average Fees of Dgca Ground Classes is 2.5 Lakh.
                            </p>

                            {/* 4) Flying Training */}
                            <h4 className="font-montserrat font-bold text-av-blue mb-3">4) Flying Training Duration and Fees</h4>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                The Commercial Pilot License (CPL) course takes around 8-10 months to complete. It includes 80 hours of classroom sessions and 200 hours of training, covering Simulator Training and Flying Training. This program helps you become a Commercial Pilot. However, sometimes extra hours might be required for additional checks and tests, which can increase the total fees. Most flying schools charge on an hourly basis. Candidates should budget around ₹40–70 lakh for complete CPL training in India.
                            </p>

                            {/* Fee Table */}
                            <p className="text-sm font-semibold text-av-blue mb-3">Here is a table for Commercial Pilot Course (CPL) Fees in India:</p>
                            <div id="fee-table" className="overflow-x-auto rounded-xl border border-gray-200 mb-2">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className="p-3 text-left text-xs font-semibold">#</th>
                                            <th className="p-3 text-left text-xs font-semibold">Expense Category</th>
                                            <th className="p-3 text-left text-xs font-semibold">Approximate Cost (INR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feeTable.map((row, i) => (
                                            <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="p-3 text-gray-500 text-xs">{row.num}</td>
                                                <td className="p-3 text-gray-700 text-xs">{row.category}</td>
                                                <td className="p-3 text-av-orange font-semibold text-xs">{row.cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-av-blue">
                                            <td colSpan={2} className="p-3 text-white text-xs font-bold">Total Estimated CPL Fees in India</td>
                                            <td className="p-3 text-av-orange font-black text-sm">₹40,00,000 – ₹70,00,000</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <p className="text-gray-400 text-xs mb-10">May vary depending on the flight school and location.</p>

                            {/* We One CTA */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center mb-10">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Start Your Pilot Journey With We One Aviation Academy</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-3">
                                    We One Aviation Academy is a DGCA-approved pilot training institute. We offer DGCA ground classes, commercial pilot training, and aviation courses designed to help you achieve your dream of flying. With expert instructors, state-of-the-art facilities, and a structured training program, we prepare you for a successful aviation career.
                                </p>
                                <p className="text-white/60 text-sm mb-5">Join us and take the first step toward the skies! ✈️</p>
                                <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                    Join Now
                                </Link>
                            </div>

                            {/* How to Get CPL */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-5">How to Get a Commercial Pilot License in India</h3>
                            <ol className="space-y-3 mb-8">
                                {howToGet.map((item, i) => (
                                    <li key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="flex-shrink-0 w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title} –</span> {item.desc}</span>
                                    </li>
                                ))}
                            </ol>

                            {/* Prep Tips */}
                            <h4 className="font-montserrat font-bold text-av-blue mb-3">Preparation Tips For Dgca Exam</h4>
                            <ul className="space-y-2 mb-10">
                                {prepTips.map((tip, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>

                            {/* Salary */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Commercial Pilot License Salary</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                The salary of a commercial pilot depends on a few things, like where they work, how much experience they have, and what kind of plane they fly. Let's look at it step by step:
                            </p>
                            <div className="space-y-4 mb-6">
                                {salaryData.map((s) => (
                                    <div key={s.level} className="rounded-xl border border-gray-100 overflow-hidden">
                                        <div className="bg-av-blue p-4 flex items-center justify-between">
                                            <h4 className="font-montserrat font-bold text-white text-sm">{s.level}</h4>
                                            <span className="text-av-orange font-bold text-xs">{s.range}</span>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-av-orange text-xs font-semibold mb-1">{s.annual}</p>
                                            <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Extra Benefits */}
                            <h4 className="font-montserrat font-bold text-av-blue mb-3">Extra Benefits Pilots Get</h4>
                            <p className="text-gray-600 text-sm mb-3">Besides the salary, pilots get some cool perks:</p>
                            <ul className="space-y-2 mb-10">
                                {perks.map((perk, i) => (
                                    <li key={i} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {perk}
                                    </li>
                                ))}
                            </ul>

                            {/* Career Opportunities */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Career Opportunities for Commercial Pilot License Holders in India</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                Getting a Commercial Pilot License (CPL) in India opens the door to an exciting and rewarding career in aviation. With a CPL, you're allowed to fly planes for money, and there are many job options to explore. Let's look at the different career paths you can take as a CPL holder in India, explained in simple and easy language.
                            </p>
                            <div className="space-y-5 mb-10">
                                {careerOptions.map((c) => (
                                    <div key={c.num} className="rounded-xl border border-gray-100 p-5">
                                        <h4 className="font-montserrat font-bold text-av-blue mb-2 flex items-center gap-2">
                                            <span>{c.icon}</span> {c.num}. {c.title}
                                        </h4>
                                        <ul className="space-y-1 text-xs text-gray-600">
                                            <li><span className="font-semibold text-av-blue">What You Do:</span> {c.what}</li>
                                            <li><span className="font-semibold text-av-blue">Where You Can Work:</span> {c.where}</li>
                                            <li><span className="font-semibold text-av-blue">Growth/Perks:</span> {c.growth}</li>
                                            <li className="text-av-orange font-semibold">Salary: {c.salary}</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Final CTA */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center mb-10">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Start Your Commercial Flight Training With We One Aviation Academy</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-3">
                                    We One Aviation Academy is a DGCA-approved pilot training institute. We Offers Ground Classes to Flight Training. Our Budget Friendly Ground Classes Help Lots of People To Become a Pilot.
                                </p>
                                <p className="text-white/60 text-sm mb-5">Join us and take the first step toward the skies! ✈️</p>
                                <Link href="/flying-school" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                    Join Flight Training Now
                                </Link>
                            </div>

                            {/* Student Reviews */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-2">Our Commercial Pilot Students Reviews</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                There is Some of Our Students Who Become Pilot Through Our Academy And Right Now They All Are Success Pilot in Airlines.
                            </p>

                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal delay={200}>
                            <LeadForm title="Apply for CPL" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Eligibility Criteria</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ 10+2 with Physics & Maths</li>
                                    <li>✓ Minimum 18 years of age (Aircraft Rules, 1937, Schedule II, Section J)</li>
                                    <li>✓ DGCA Medical Class 1</li>
                                    <li>✓ English language proficiency</li>
                                    <li>✓ Valid passport (for intl. training)</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Career After CPL</h4>
                                <p className="text-white/80 text-sm mb-3">Talk through licence routes, timelines and what the CPL leads to.</p>
                                <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Get Career Counselling
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </Layout>
    );
}