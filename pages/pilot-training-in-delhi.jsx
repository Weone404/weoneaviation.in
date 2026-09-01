import { CityPageTemplate } from '../components/Citypagetemplate';

export default function PilotTrainingDelhi() {
    return (
        <CityPageTemplate
            city="Delhi"

            meta={{
                title: 'Pilot Training Institute in Delhi 2026 | CPL, PPL, DGCA | We One Aviation',
                description: 'DGCA pilot training in Delhi. CPL, PPL and ATPL courses plus DGCA ground classes. Scholarship options available. We One Aviation Academy.',
            }}

            hero={{
                image: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=1920&q=80',
                tag: 'Pilot Training in Delhi',
                title: 'Pilot Training Institute in Delhi – 2026',
                sub: 'CPL, PPL and DGCA ground classes in Delhi',
            }}

            intro="Are you dreaming of a career in aviation? Our Pilot Training Institute in Delhi is built for students who want to become a pilot — whether you are looking for Commercial Pilot Training, Private Pilot Training or aiming to become an airline captain. We provide all types of Pilot Training with experienced flight instructors and the latest technology available at our academy. Delhi is home to IGI Airport — one of India's busiest international airports — making it one of the greatest aviation hubs for students willing to become a pilot. We are here to train the next generation of aviation professionals."

            features={[
                { icon: '🏅', title: 'Certified Training Program', desc: 'Our institute follows the regulations set by the national aviation authority to ensure quality education and certification.' },
                { icon: '👨‍✈️', title: 'DGCA Qualified Instructors', desc: 'Learn from DGCA-qualified instructors with real flying experience who have served as pilots in India.' },
                { icon: '📋', title: 'Comprehensive Courses', desc: 'We offer CPL, PPL, and ATPL training — all pilot programs you need under one roof, available both offline and online.' },
                { icon: '🚀', title: 'Career Guidance', desc: 'Our academy doesn\'t just train you — we help you launch your career. Graduates have joined major airlines, cargo operations, and private aviation companies worldwide.' },
                { icon: '🌍', title: 'International Flying School Options', desc: 'Flight training placements with partner schools in the USA, South Africa and India, where you build the 200 hours of flying required for a Commercial Pilot Licence.' },
                { icon: '📖', title: 'Small Batch Sizes', desc: 'Only 20 students per batch — ensuring personal attention, daily doubt sessions, and faster results for every student.' },
                { icon: '🏢', title: 'Prime Location in Dwarka, Delhi', desc: 'Conveniently located in Dwarka, Delhi — close to IGI Airport, giving you real-world aviation exposure in India\'s top aviation hub.' },
            ]}

            courses={[
                {
                    num: '1', icon: '✈️',
                    title: 'Commercial Pilot Training (CPL)',
                    desc: 'Want to fly massive planes for big airlines? Our CPL program at the Pilot Training Institute in Delhi is your ticket to the cockpit. Our pro instructors — real pilots with real experience — teach you to handle everything like a champ. Soon, you\'ll be landing jobs with the coolest airlines!',
                    details: [
                        { label: 'Duration', value: '12-18 months' },
                        { label: 'Includes', value: '200+ hours of flying, DGCA exam preparation, and soft skills training' },
                        { label: 'Career Opportunities', value: 'Airline pilot, cargo pilot, charter pilot' },
                    ],
                    href: '/courses/cpl',
                    highlight: true,
                },
                {
                    num: '2', icon: '🛩️',
                    title: 'Private Pilot Training (PPL)',
                    desc: 'Want to fly around for fun? Our PPL program at the Pilot Training Institute in Delhi is just right for you. Take your friends up in the sky or chill above the city — we keep it simple and exciting. Fly by yourself, however you like!',
                    details: [
                        { label: 'Duration', value: '4-6 months' },
                        { label: 'Includes', value: 'Minimum 40 hours of flight training' },
                        { label: 'Best For', value: 'Individuals who want to fly privately or as a hobby' },
                    ],
                    href: '/ppl-full-form',
                    highlight: false,
                },
                {
                    num: '3', icon: '📚',
                    title: 'DGCA Ground Classes',
                    desc: 'Our DGCA Ground Classes at the Pilot Training Institute in Delhi make it super easy to learn air navigation, meteorology, and air regulations — all aligned with the DGCA syllabus. Crack your DGCA exams without any tension with We One Aviation Academy!',
                    details: [
                        { label: 'Duration', value: '3-6 months' },
                        { label: 'Subjects', value: 'Air Regulations, Aviation Meteorology, Air Navigation, Technical General, Technical Specific, Radio Telephony (RTR Exam)' },
                    ],
                    href: '/dgca-ground-classes',
                    highlight: false,
                },
                {
                    num: '4', icon: '🏆',
                    title: 'Type Rating & Multi-Engine Training',
                    desc: 'Improve your flying skills with advanced aircraft training at our Pilot Training Institute in Delhi. Designed for pilots who want to enhance their abilities and qualify for commercial aviation roles.',
                    details: [
                        { label: 'Duration', value: '3-4 months' },
                        { label: 'Includes', value: 'Advanced flight training in low-visibility conditions' },
                        { label: 'Best For', value: 'Pilots looking to enhance skills and qualify for commercial aviation' },
                    ],
                    href: '/courses',
                    highlight: false,
                },
            ]}

            eligibility={[
                { icon: '🎓', title: 'Education', desc: '10+2 with Physics & Mathematics (We can help with additional courses if needed!)' },
                { icon: '🎂', title: 'Age', desc: '18 years for a CPL; 16 for a Student Pilot Licence' },
                { icon: '🩺', title: 'Medical Fitness', desc: 'Must clear DGCA Medical Examinations' },
                { icon: '🗣️', title: 'English Proficiency', desc: 'Must be able to read, write, and communicate effectively in English' },
            ]}

            career={{
                intro: 'Delhi is a major aviation hub in India with IGI Airport at its heart — creating great job options for trained pilots. Once you finish your training, you can try for jobs like these:',
                options: [
                    { icon: '✈️', title: 'Commercial Pilot', desc: 'Fly big passenger planes for airlines like IndiGo, Air India, or SpiceJet.' },
                    { icon: '🛩️', title: 'Private Pilot', desc: 'Work for individuals or companies flying their personal planes.' },
                    { icon: '📦', title: 'Cargo Pilot', desc: 'Deliver goods by flying cargo planes for FedEx or Blue Dart.' },
                    { icon: '🏫', title: 'Flight Instructor', desc: 'Teach new pilots at training schools like ours.' },
                    { icon: '🗺️', title: 'Charter Pilot', desc: 'Fly small planes for special trips — vacations or business travel.' },
                ],
            }}

            syllabus={[
                { num: '1', title: 'Air Navigation', desc: 'A important DGCA exam subject — equips pilots with the knowledge to safely navigate an aircraft from one location to another using flight planning, navigation techniques, instruments, and radio aids.' },
                { num: '2', title: 'Air Regulations', desc: 'The rulebook for flying — provides a deep understanding of aviation laws, operational procedures, and international standards to ensure safe and legal flight operations.' },
                { num: '3', title: 'Aviation Meteorology', desc: 'Weather is a big deal when you\'re a pilot. Learn to read atmospheric behavior, weather patterns, and forecasting techniques to make informed decisions and plan safe flights.' },
                { num: '4', title: 'Technical General', desc: 'Get to know the "body" of the plane — covers the basics of how aircraft work, including engines, systems, and equipment.' },
                { num: '5', title: 'Technical Specific', desc: 'Zooms in on the specific type of plane you\'ll fly — dives into your plane\'s design, controls, and performance.' },
                { num: '6', title: 'Radio Telephony (RTR Exam)', desc: 'Learn how to communicate with ATC and other pilots using radio codes and phrases to keep everything clear and safe in the air.' },
            ]}

            fees={{
                total: 'INR 40 – 60 Lakh',
                breakdown: [
                    { label: 'Ground Classes', desc: 'Navigation, rules, aviation theory', amount: 'INR 2-5 Lakhs' },
                    { label: 'Flying Hours', desc: '200 hours of cockpit training', amount: 'INR 35-50 Lakhs' },
                    { label: 'Simulator Training', desc: 'Practice in full motion flight simulators', amount: 'INR 3-5 Lakhs' },
                    { label: 'Extra Gear', desc: 'Books, uniforms, medicals, DGCA exams', amount: 'INR 1-2 Lakhs' },
                ],
                whyChanges: [
                    { title: 'School Reputation', desc: 'Top flying schools like We One Aviation charge premium fees for quality — but we also provide scholarships.' },
                    { title: 'City & Location (Delhi)', desc: 'Delhi\'s metro environment and proximity to IGI Airport means pilot training costs are slightly higher compared to smaller towns.' },
                    { title: 'Type of Aircraft', desc: 'Basic trainer aircraft vs advanced simulators — more advanced equipment means higher training costs.' },
                    { title: 'Add-On Training', desc: 'Night flying or multi-engine training adds extra hours and cost to your program.' },
                ],
            }}

            howToChoose={[
                { icon: '🏢', title: 'Institute Infrastructure', desc: 'Check the institute\'s environment and infrastructure. What facilities do they provide for comfortable study and flying?' },
                { icon: '👨‍🏫', title: 'Institute Instructors', desc: 'Teachers play a essential role in student success. Check the faculty level before joining — great teachers make great pilots.' },
                { icon: '💰', title: 'Payment Flexibility', desc: 'Check their fees structure. Choose institutes that don\'t burden you all at once with flexible payment options.' },
                { icon: '🎓', title: 'Scholarship & Loan Facility', desc: 'If an institute gives scholarship and loan facility, it makes fulfilling your dream much more affordable.' },
            ]}

            whyWeOne={[
                'Scholarship provided to every student',
                'Flexible fees structure',
                'DGCA-qualified aviation instructors',
                'Well-built infrastructure in Dwarka, Delhi',
                'Study library for students',
                'Only 20 students per batch — personalized attention',
                'Established on 15th Jan 2002 — 20+ years of excellence',
                'Limited seats available — Apply Now!',
            ]}

            usaBenefits={[
                { icon: '✅', title: '40-Hour PPL Challenge!', desc: 'Complete your PPL before 40 hours and the flying school covers your Instrument Training (IR) costs!' },
                { icon: '✅', title: 'FAA-Approved School at International Airport', desc: 'Train at a fully equipped flying school at a major international airport for real-world aviation exposure.' },
                { icon: '✅', title: 'Accommodation Near the Airport', desc: 'Comfortable accommodation provided near the airport for your convenience — no hassle during training.' },
                { icon: '✅', title: 'Full Scholarship After CPL', desc: 'Complete your USA CPL training and you may qualify for a FULL SCHOLARSHIP for advanced flight training!' },
                { icon: '✅', title: '1500-Hour Flight Building at No Extra Cost!', desc: 'Build flight hours up to 1500 hours after CPL — a key requirement for airline jobs — at no additional cost!' },
            ]}

            usaReasons={[
                { icon: '🚀', title: 'Globally Recognized FAA License', desc: 'Opens doors to airline careers worldwide.' },
                { icon: '🚀', title: 'Ideal Flying Conditions', desc: 'More flying days per year for faster completion.' },
                { icon: '🚀', title: 'Direct Airline Pathway', desc: 'Structured programs designed to help you secure airline jobs quickly!' },
            ]}

            faqs={[
                { q: 'How long does it take to complete pilot training in Delhi?', a: 'PPL takes 4-6 months, CPL takes 12-18 months, and ATPL requires additional experience after CPL. DGCA Ground Classes take 3-6 months. With We One Aviation, students who attend regularly can become a pilot in as little as 15 months.' },
                { q: 'What are the fees for pilot training in Delhi?', a: 'The average fees for CPL training in Delhi is INR 40–60 Lakh. This includes ground classes, 200 hours of flying, simulator training, and extra gear. We One Aviation provides scholarship and flexible payment options to make pilot training affordable.' },
                { q: 'What is the eligibility to become a pilot in Delhi?', a: 'A Commercial Pilot Licence requires a minimum age of 18 years on the date of application (Aircraft Rules, 1937, Schedule II, Section J). Flight training can begin earlier: a Student Pilot Licence requires 16 years (Schedule II, Section B). 10+2 with Physics & Mathematics, DGCA medical clearance, and English proficiency are also required.' },
                { q: 'What career support does We One Aviation provide in Delhi?', a: 'We run interview preparation and career guidance from the Dwarka centre: airline interview practice, licence-route planning, and help reading what an operator is asking for. We do not place students in jobs, and hiring stays with the airline.' },
                { q: 'Can I get a scholarship for pilot training in Delhi?', a: 'Yes! We One Aviation Academy provides scholarships to every deserving student along with a flexible fees structure and loan assistance to make pilot training affordable.' },
                { q: 'Where is We One Aviation Academy located in Delhi?', a: 'We One Aviation Academy is located in Dwarka, Delhi — close to IGI Airport, one of India\'s busiest international airports, giving students excellent real-world aviation exposure.' },
                { q: 'What career options are available after pilot training in Delhi?', a: 'After completing pilot training, you can work as a Commercial Airline Pilot (IndiGo, Air India, SpiceJet), Private Pilot, Cargo Pilot (FedEx, Blue Dart), Flight Instructor, or Charter Pilot. Delhi\'s position as India\'s aviation hub creates excellent demand for trained pilots.' },
            ]}
        />
    );
}