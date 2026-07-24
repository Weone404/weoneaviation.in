import { CityPageTemplate } from '../components/Citypagetemplate';

export default function PilotTrainingChhattisgarh() {
    return (
        <CityPageTemplate
            city="Chhattisgarh"

            meta={{
                title: 'Pilot Training Institute in Chhattisgarh 2026 | CPL, PPL, DGCA | WeOne Aviation',
                description: 'Pilot training in Chhattisgarh with region-aware DGCA preparation, CPL and PPL course guidance, and practical career counselling for students planning a stronger aviation future.',
            }}

            hero={{
                image: 'https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=1920&q=80',
                tag: 'Pilot Training in Chhattisgarh',
                title: 'Pilot Training Institute in Chhattisgarh – 2026',
                sub: 'World-class CPL, PPL & DGCA Ground Classes in Chhattisgarh with 100% Placement Assistance',
            }}

            intro="Chhattisgarh gives many families a useful perspective on pilot training because the decision is often driven by practical concerns: reliable DGCA guidance, reasonable cost planning, and a clear route from theory preparation to airline-readiness. With Raipur (RPR) serving as the most relevant local aviation reference point, students from the state need a page that explains the real progression of pilot training rather than simply repeating a city template. This Chhattisgarh rewrite is built around that need: stronger regional context, clearer admission planning, and a more grounded understanding of how students move from core theory into professional aviation preparation."

            features={[
                { icon: '🏅', title: 'Central India Perspective', desc: 'Students from Chhattisgarh can approach aviation training with a more practical mindset, focusing on course clarity, discipline, and the right decision-making path rather than marketing noise.' },
                { icon: '👨‍✈️', title: 'DGCA Subject Discipline', desc: 'Our support helps students build confidence in Air Regulations, Meteorology, Navigation, and Technical General through structured repeat practice and revision.' },
                { icon: '🛩️', title: 'Active Exam Preparation', desc: 'We emphasise mock revision, explanation-led teaching, and consistent study habits so students are better prepared for the academic side of the CPL journey.' },
                { icon: '📋', title: 'Course Pathway Planning', desc: 'We guide students through CPL, PPL, and ATPL options according to budget, academic background, and timeline goals.' },
                { icon: '🚀', title: 'Career Roadmap Support', desc: 'Students receive counselling that sets realistic goals for airline, charter, and instructor roles after training.' },
                { icon: '🎓', title: 'Budget & Scholarship Clarity', desc: 'Parents and students can compare training costs more confidently and ask better questions before enrolling.' },
            ]}

            courses={[
                {
                    num: '1', icon: '✈️',
                    title: 'Commercial Pilot Training (CPL)',
                    desc: 'Want to fly massive planes for big airlines? Our CPL program at the Pilot Training Institute in Chhattisgarh is your ticket to the cockpit. Our pro instructors — real pilots with real experience — teach you to handle everything like a champ. Soon, you\'ll be landing jobs with the coolest airlines!',
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
                    desc: 'Want to fly around for fun? Our PPL program at the Pilot Training Institute in Chhattisgarh is just right for you. Take your friends up in the sky or chill above the city — we keep it simple and exciting. Fly by yourself, however you like!',
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
                    desc: 'Our DGCA Ground Classes at the Pilot Training Institute in Chhattisgarh make it super easy to learn air navigation, meteorology, and air regulations — all approved by DGCA. Crack your DGCA exams without any tension with We One Aviation Academy!',
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
                    desc: 'Improve your flying skills with advanced aircraft training at our Pilot Training Institute in Chhattisgarh. Designed for pilots who want to enhance their abilities and qualify for commercial aviation roles.',
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
                intro: 'Chhattisgarh, with Raipur as its aviation hub, offers great job options for trained pilots in Central India. Once you finish your training, you can try for jobs like these:',
                options: [
                    { icon: '✈️', title: 'Commercial Pilot', desc: 'Fly big passenger planes for airlines like IndiGo, Air India, or SpiceJet.' },
                    { icon: '🛩️', title: 'Private Pilot', desc: 'Work for individuals or companies flying their personal planes.' },
                    { icon: '📦', title: 'Cargo Pilot', desc: 'Deliver goods by flying cargo planes for FedEx or Blue Dart.' },
                    { icon: '🏫', title: 'Flight Instructor', desc: 'Teach new pilots at training schools like ours.' },
                    { icon: '🗺️', title: 'Charter Pilot', desc: 'Fly small planes for special trips — vacations or business travel.' },
                ],
            }}

            syllabus={[
                { num: '1', title: 'Air Regulations', desc: 'The rulebook for flying — covers all the laws and guidelines pilots must follow, including airspace rules and safety standards. The "traffic rules" of the sky over Chhattisgarh and beyond.' },
                { num: '2', title: 'Aviation Meteorology', desc: 'Learn to read weather patterns — clouds, winds, storms, and temperature changes — to plan safe flights and avoid turbulence or bad conditions.' },
                { num: '3', title: 'Air Navigation', desc: 'Your GPS guide to flying! Learn how to find your way using maps, instruments, and calculations — from Raipur to Nagpur or anywhere across India and beyond.' },
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
                    { title: 'City & Location (Chhattisgarh)', desc: 'Chhattisgarh\'s city environment, including Raipur, means pilot training costs are slightly higher compared to smaller towns.' },
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
                { q: 'How long does it take to complete pilot training in Chhattisgarh?', a: 'PPL takes 4-6 months, CPL takes 12-18 months, and ATPL requires additional experience after CPL. DGCA Ground Classes take 3-6 months.' },
                { q: 'Is there a DGCA exam center or study support route in Chhattisgarh?', a: 'Students in Chhattisgarh usually prepare for DGCA theory through a structured syllabus plan, targeted revision, and coaching support that helps them stay consistent while balancing academic commitments.' },
                { q: 'What is the nearest major airport relevant to pilot training in Chhattisgarh?', a: 'Raipur Airport (RPR) is the most relevant local aviation reference point in the state for students exploring a future in aviation.' },
                { q: 'What are the fees for pilot training in Chhattisgarh?', a: 'The average fees for CPL training in Chhattisgarh is INR 40–60 Lakh. This includes ground classes (INR 2-3 lakhs), 200 hours of flying (INR 35-55 lakhs), simulator training (INR 3-5 lakhs), and extra gear (INR 20-50 thousand). WeOne Aviation provides scholarship and flexible payment options.' },
                { q: 'What is the eligibility to become a pilot in Chhattisgarh?', a: 'Minimum age of 17 years, 10+2 with Physics & Mathematics, DGCA Class 1 & Class 2 Medical clearance, and English proficiency are required.' },
                { q: 'Does WeOne Aviation provide placement assistance in Chhattisgarh?', a: 'Yes! We provide 100% placement assistance. Our graduates have successfully joined major airlines, cargo operations, and private aviation companies worldwide.' },
                { q: 'Can I get a scholarship for pilot training in Chhattisgarh?', a: 'Yes! WeOne Aviation Academy provides scholarships to every deserving student along with a flexible fees structure and loan assistance to make pilot training affordable.' },
                { q: 'What career options are available after pilot training in Chhattisgarh?', a: 'After completing pilot training, you can work as a Commercial Airline Pilot (IndiGo, Air India, SpiceJet), Private Pilot, Cargo Pilot (FedEx, Blue Dart), Flight Instructor, or Charter Pilot. Chhattisgarh\'s growing aviation sector with Raipur as its hub creates excellent demand for trained pilots.' },
            ]}
        />
    );
}