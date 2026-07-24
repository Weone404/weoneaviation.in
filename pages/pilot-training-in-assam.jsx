import { CityPageTemplate } from '../components/Citypagetemplate';

export default function PilotTrainingAssam() {
    return (
        <CityPageTemplate
            city="Assam"

            meta={{
                title: 'Pilot Training Institute in Assam 2026 | CPL, PPL, DGCA | WeOne Aviation',
                description: 'Best Pilot Training Institute in Assam. CPL, PPL, ATPL, DGCA Ground Classes. 3000+ pilots trained. 100% placement assistance. Scholarship available. Join WeOne Aviation Academy.',
            }}

            hero={{
                image: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=1920&q=80',
                tag: 'Pilot Training in Assam',
                title: 'Pilot Training Institute in Assam – 2026',
                sub: 'World-class CPL, PPL & DGCA Ground Classes in Assam with 100% Placement Assistance',
            }}

            intro="Assam is an important state for Northeast India aviation aspirations because students here often need a more practical roadmap into pilot careers, not just a generic training promise. With Guwahati (GAU) acting as a natural aviation reference point for the region, many aspirants want guidance on how DGCA theory, scholarship planning, and airline-oriented career preparation fit together. This Assam page is written around that decision path: local relevance, clearer flight-path understanding, and a stronger explanation of how Gujarat-based pilot training support can help students from the Northeast move toward CPL readiness."

            features={[
                { icon: '🏅', title: 'Northeast Aviation Context', desc: 'For Assam students, aviation planning starts with practical awareness of regional connectivity, airline demand, and a disciplined DGCA preparation strategy.' },
                { icon: '👨‍✈️', title: 'DGCA Coaching Discipline', desc: 'We focus on subject clarity, exam retention, and revision consistency across the six core DGCA papers that shape the CPL journey.' },
                { icon: '🛩️', title: 'Simulator-Backed Learning', desc: 'Students receive repeated cockpit exposure and scenario-management practice that helps convert classroom knowledge into flying confidence.' },
                { icon: '📋', title: 'CPL, PPL & ATPL Guidance', desc: 'We help students understand which pilot path matches their budget, current academic background, and long-term career plan.' },
                { icon: '🚀', title: 'Career Readiness Support', desc: 'Our career mentoring covers interview preparation, professionalism, and understanding what employers expect from pilot trainees.' },
                { icon: '🎓', title: 'Scholarship & Fee Clarity', desc: 'Assam students can compare fee structures and scholarship support more clearly before committing to a pilot course.' },
                { icon: '📖', title: 'Mentored Academic Support', desc: 'Students who need slower-paced guidance or more structured revision receive extra mentoring to stay consistent in their DGCA preparation.' },
                { icon: '🏢', title: 'Airport-Linked Awareness', desc: 'Students gain a better sense of how major airport ecosystems shape route planning, airline expectations, and professional aviation mindset.' },
                { icon: '🏠', title: 'Student Support Planning', desc: 'Counselling and accommodation planning help families manage the training journey more confidently from the start.' },
            ]}

            courses={[
                {
                    num: '1', icon: '✈️',
                    title: 'Commercial Pilot Training (CPL)',
                    desc: 'Want to fly massive planes for big airlines? Our CPL program at the Pilot Training Institute in Assam is your ticket to the cockpit. Our pro instructors — real pilots with real experience — teach you to handle everything like a champ. Soon, you\'ll be landing jobs with the coolest airlines!',
                    details: [
                        { label: 'Duration', value: '12-18 months' },
                        { label: 'Aircraft Used', value: 'Cessna 172 Glass Cockpit' },
                        { label: 'Includes', value: '200+ hours of flying, DGCA exam preparation, and soft skills training' },
                        { label: 'Career Opportunities', value: 'Airline pilot, cargo pilot, charter pilot' },
                    ],
                    href: '/courses/cpl',
                    highlight: true,
                },
                {
                    num: '2', icon: '🛩️',
                    title: 'Private Pilot Training (PPL)',
                    desc: 'Want to fly around for fun? Our PPL program at the Pilot Training Institute in Assam is just right for you. Take your friends up in the sky or chill above the scenic Northeast landscapes — we keep it simple and exciting. Fly by yourself, however you like!',
                    details: [
                        { label: 'Duration', value: '4-6 months' },
                        { label: 'Aircraft Used', value: 'Cessna 172' },
                        { label: 'Includes', value: 'Minimum 40 hours of flight training' },
                        { label: 'Best For', value: 'Individuals who want to fly privately or as a hobby' },
                    ],
                    href: '/courses/ppl',
                    highlight: false,
                },
                {
                    num: '3', icon: '📚',
                    title: 'DGCA Ground Classes',
                    desc: 'Our DGCA Ground Classes at the Pilot Training Institute in Assam make it super easy to learn air navigation, meteorology, and air regulations — all approved by DGCA. Crack your DGCA exams without any tension with We One Aviation Academy!',
                    details: [
                        { label: 'Duration', value: '3-6 months' },
                        { label: 'Subjects', value: 'Air Regulations, Aviation Meteorology, Air Navigation, Technical General, Technical Specific, Radio Telephony' },
                    ],
                    href: '/courses/dgca-ground-classes',
                    highlight: false,
                },
                {
                    num: '4', icon: '🏆',
                    title: 'Type Rating & Multi-Engine Training',
                    desc: 'Improve your flying skills with advanced aircraft training at our Pilot Training Institute in Assam. Designed for pilots who want to enhance their abilities and qualify for commercial aviation roles.',
                    details: [
                        { label: 'Duration', value: '3-4 months' },
                        { label: 'Aircraft Used', value: 'Cessna 172 Glass Cockpit' },
                        { label: 'Includes', value: 'Advanced flight training in low-visibility conditions' },
                        { label: 'Best For', value: 'Pilots looking to enhance skills and qualify for commercial aviation' },
                    ],
                    href: '/courses/type-rating',
                    highlight: false,
                },
            ]}

            eligibility={[
                { icon: '🎓', title: 'Education', desc: '10+2 with Physics & Mathematics (We can help with additional courses if needed!)' },
                { icon: '🎂', title: 'Age', desc: 'Minimum age of 17 years' },
                { icon: '🩺', title: 'Medical Fitness', desc: 'Must clear DGCA Class 1 & Class 2 Medical Exams' },
                { icon: '🗣️', title: 'English Proficiency', desc: 'Must be able to read, write, and communicate effectively in English' },
            ]}

            career={{
                intro: 'Assam, with Guwahati as the aviation gateway to Northeast India, offers great job options for trained pilots. Once you finish your training, you can try for jobs like these:',
                options: [
                    { icon: '✈️', title: 'Commercial Pilot', desc: 'Fly big passenger planes for airlines like IndiGo, Air India, or SpiceJet.' },
                    { icon: '🛩️', title: 'Private Pilot', desc: 'Work for individuals or companies flying their personal planes.' },
                    { icon: '📦', title: 'Cargo Pilot', desc: 'Deliver goods by flying cargo planes for FedEx or Blue Dart.' },
                    { icon: '🏫', title: 'Flight Instructor', desc: 'Teach new pilots at training schools like ours.' },
                    { icon: '🗺️', title: 'Charter Pilot', desc: 'Fly small planes for special trips — vacations or business travel.' },
                ],
            }}

            syllabus={[
                { num: '1', title: 'Air Regulations', desc: 'The rulebook for flying — covers all the laws and guidelines pilots must follow, including airspace rules and safety standards. The "traffic rules" of the sky over Assam and beyond.' },
                { num: '2', title: 'Aviation Meteorology', desc: 'Learn to read weather patterns — clouds, winds, storms, and temperature changes — to plan safe flights and avoid turbulence or bad conditions.' },
                { num: '3', title: 'Air Navigation', desc: 'Your GPS guide to flying! Learn how to find your way using maps, instruments, and calculations — from Guwahati to Kolkata or anywhere across India and beyond.' },
                { num: '4', title: 'Technical General', desc: 'Get to know the "body" of the plane — covers the basics of how aircraft work, including engines, systems, and equipment.' },
                { num: '5', title: 'Technical Specific', desc: 'Zooms in on the specific type of plane you\'ll fly — dives into your plane\'s design, controls, and performance.' },
                { num: '6', title: 'Radio Telephony', desc: 'Learn how to communicate with ATC and other pilots using radio codes and phrases to keep everything clear and safe in the air.' },
            ]}

            fees={{
                total: 'INR 40 – 60 Lakh',
                breakdown: [
                    { label: 'Ground Classes', desc: 'Navigation, rules, aviation theory', amount: 'INR 2-3 Lakhs' },
                    { label: 'Flying Hours', desc: '200 hours of cockpit training', amount: 'INR 35-55 Lakhs' },
                    { label: 'Simulator Training', desc: 'Practice in advanced flight simulators', amount: 'INR 3-5 Lakhs' },
                    { label: 'Extra Gear', desc: 'Books, uniforms, medicals, DGCA exams', amount: 'INR 20-50 Thousand' },
                ],
                whyChanges: [
                    { title: 'School Reputation', desc: 'Top flying schools like We One Aviation charge premium fees for quality — but we also provide scholarships.' },
                    { title: 'City & Location (Assam)', desc: 'Assam\'s city environment, including Guwahati, means pilot training costs are slightly higher compared to smaller towns.' },
                    { title: 'Type of Aircraft', desc: 'Basic trainer aircraft vs advanced simulators — more advanced equipment means higher training costs.' },
                    { title: 'Add-On Training', desc: 'Night flying or multi-engine training adds extra hours and cost to your program.' },
                ],
            }}

            howToChoose={[
                { icon: '🏢', title: 'Institute Infrastructure', desc: 'Check the institute\'s environment and infrastructure. What facilities do they provide for comfortable study and flying?' },
                { icon: '👨‍🏫', title: 'Institute Instructors', desc: 'Teachers play a vital role in student success. Check the faculty level before joining — great teachers make great pilots.' },
                { icon: '💰', title: 'Payment Flexibility', desc: 'Check their fees structure. Choose institutes that don\'t burden you all at once with flexible payment options.' },
                { icon: '🎓', title: 'Scholarship & Loan Facility', desc: 'If an institute gives scholarship and loan facility, it makes fulfilling your dream much more affordable.' },
            ]}

            whyWeOne={[
                'Scholarship provided to every student',
                'Flexible fees structure',
                'Experienced aviation teachers',
                'Well-built infrastructure',
                'Free 200 hrs of flying on simulators',
                'Study library for students',
                'We train students from the U.S.A',
                'Limited seats available — Apply Now!',
            ]}

            usaBenefits={[
                { icon: '✅', title: '40-Hour PPL Challenge!', desc: 'Complete your PPL before 40 hours and the flying school covers your Instrument Training (IR) costs!' },
                { icon: '✅', title: 'FAA-Approved School at International Airport', desc: 'Train at a fully equipped flying school at a major international airport for real-world aviation exposure.' },
                { icon: '✅', title: 'Accommodation Near the Airport', desc: 'Comfortable accommodation provided near the airport for your convenience — no hassle during training.' },
                { icon: '✅', title: 'Full Scholarship After CPL', desc: 'Complete your USA CPL training and you may qualify for a FULL SCHOLARSHIP for advanced flight training!' },
                { icon: '✅', title: '1500-Hour Flight Building at No Extra Cost!', desc: 'Build flight hours up to 1500 hours after CPL — a key requirement for airline jobs — at no additional cost!' },
                { icon: '✅', title: 'Train on the Most Advanced Aircraft', desc: 'All training is on Cessna 172 Glass Cockpit aircraft with cutting-edge aviation technology.' },
            ]}

            usaReasons={[
                { icon: '🚀', title: 'Globally Recognized FAA License', desc: 'Opens doors to airline careers worldwide.' },
                { icon: '🚀', title: 'State-of-the-Art Training Facilities', desc: 'Modern aircraft & advanced simulators.' },
                { icon: '🚀', title: 'Ideal Flying Conditions', desc: 'More flying days per year for faster completion.' },
                { icon: '🚀', title: 'Direct Airline Pathway', desc: 'Structured programs designed to help you secure airline jobs quickly!' },
            ]}

            faqs={[
                { q: 'How long does it take to complete pilot training in Assam?', a: 'PPL usually takes 4-6 months, CPL typically takes 12-18 months, and ATPL requires additional experience after CPL. DGCA Ground Classes generally run for 3-6 months depending on the candidate’s preparation pace.' },
                { q: 'Is there a DGCA exam-prep route that fits students from Assam?', a: 'Yes. Students in Assam usually prepare through structured DGCA ground classes, revision planning, and mock-test support that makes it easier to stay consistent while studying from a distance.' },
                { q: 'What is the nearest major airport relevant to pilot training in Assam?', a: 'Guwahati Airport (GAU) is the main regional aviation reference point for students who want to understand airport operations and connect their training ambitions to the Northeast aviation ecosystem.' },
                { q: 'What are the fees for pilot training in Assam?', a: 'The average CPL fees for students exploring pilot training in Assam usually fall between INR 40–60 lakh, depending on the program path, flying hours, simulator support, and added training costs.' },
                { q: 'What is the eligibility to become a pilot in Assam?', a: 'Most students need to be at least 17 years old, complete 10+2 with Physics and Mathematics, clear DGCA Class 1 and Class 2 medical checks, and demonstrate English comprehension for aviation communication.' },
                { q: 'Does WeOne Aviation provide placement assistance for Assam students?', a: 'Yes. We support students with career counselling, job-readiness coaching, and pipeline help that moves them from DGCA preparation into practical aviation placement opportunities.' },
                { q: 'Can I get a scholarship for pilot training in Assam?', a: 'Yes. WeOne Aviation provides scholarship guidance and flexible fee planning so students can approach the training investment with more confidence.' },
                { q: 'What career options are available after pilot training in Assam?', a: 'After completing pilot training, candidates can move into roles such as Commercial Pilot, Private Pilot, Cargo Pilot, Flight Instructor, or Charter Pilot. Assam’s rising regional aviation awareness makes it a practical starting point for long-term pilot career planning.' },
            ]}
        />
    );
}