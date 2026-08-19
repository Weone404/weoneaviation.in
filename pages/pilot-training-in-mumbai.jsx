import { CityPageTemplate } from '../components/Citypagetemplate';

export default function PilotTrainingMumbai() {
    return (
        <CityPageTemplate
            city="Mumbai"

            meta={{
                title: 'Pilot Training Institute in Mumbai 2026 | CPL, PPL, DGCA | WeOne Aviation',
                description: 'Pilot training in Mumbai with airport-linked aviation awareness, DGCA ground classes, CPL and PPL guidance, and strong career mentoring for Maharashtra students preparing for airline-ready training.',
            }}

            hero={{
                image: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=1920&q=80',
                tag: 'Pilot Training in Mumbai',
                title: 'Pilot Training Institute in Mumbai – 2026',
                sub: 'CPL, PPL and DGCA ground classes in Mumbai since 2011',
            }}

            intro={`Mumbai is a distinct training market: students here live with an international airport on their doorstep, a dense metropolitan commute, and an expectation that training must align with real airline rhythms. Instead of a generic city blurb, this Mumbai page focuses on the practical realities that matter for a trainee pilot from Maharashtra — how to access simulator time near the city, where to plan short flying days without taking long-distance travel, and how to arrange DGCA-related admin visits without losing study momentum.

Local aviation context: Chhatrapati Shivaji Maharaj International Airport (BOM) is Mumbai's commercial gateway and the most important operational reference for airline-focused students. For initial flight exposure and weekend practice, students commonly use Juhu Aerodrome and the long-established Bombay Flying Club for introductory wet-hire and circuit training. Navi Mumbai and nearby private aerodromes provide occasional slot-based training and simulator access that avoids the heavy commercial flow at BOM.

DGCA exam logistics: Mumbai candidates typically book DGCA Pariksha slots well in advance and plan mock-exam days on weekdays to avoid traffic delays; we include recommended timings and directions to the principal Mumbai exam centres, public-transport routes that avoid peak-hour congestion, and accommodation suggestions near Vile Parle and Juhu for short-stay exam visits. Practical tips: carry printed identity and exam confirmations, schedule simulator sessions the week before your DGCA paper for confidence-building, and book transport with time cushions to account for Mumbai traffic.

Training pathways and local choices: students deciding between PPL and integrated CPL often choose local ground classes plus targeted simulator days in Mumbai, then complete intensive flying blocks at quieter satellite aerodromes when weather permits. If you live in Navi Mumbai or Thane, plan your ground-class schedule to cluster in 2–3 full days per week to reduce commute overhead. This page provides actionable, Mumbai-specific planning guidance rather than a generic template.`}

            features={[
                { icon: '🏅', title: 'BOM-Airport Context', desc: 'Students in Mumbai get a clearer picture of how a major international airport shapes airline operations, route planning, flight discipline, and professional aviation behaviour.' },
                { icon: '👨‍✈️', title: 'Metro-Focused Ground Prep', desc: 'Our DGCA support helps Mumbai students manage theory subjects, mock revisions, and fast-paced study schedules without losing quality or consistency.' },
                { icon: '🛩️', title: 'Cockpit Decision Training', desc: 'Simulator sessions and revision drills build accuracy in radio work, navigation logic, and split-second decision-making — all vital to airline readiness.' },
                { icon: '📋', title: 'Commercial, Private & ATPL Guidance', desc: 'We help students compare CPL, PPL, and ATPL pathways with a realistic understanding of duration, effort, and long-term career fit.' },
                { icon: '🚀', title: 'Airline Interview Preparation', desc: 'Our career mentoring focuses on communication, professionalism, and the practical expectations airline teams look for during selection and interview rounds.' },
                { icon: '🎓', title: 'Scholarship & Cost Clarity', desc: 'Mumbai students can plan their training investment more confidently with fee transparency, scholarship counselling, and flexible support discussions.' },
            ]}

            courses={[
                {
                    num: '1', icon: '✈️',
                    title: 'Commercial Pilot Training (CPL)',
                    desc: 'Want to fly massive planes for big airlines? Our CPL program at the Pilot Training Institute in Mumbai is your ticket to the cockpit. Our pro instructors — real pilots with real experience — teach you to handle everything like a champ. Soon, you\'ll be landing jobs with the coolest airlines!',
                    details: [
                        { label: 'Duration', value: '12-18 months' },
                        { label: 'Aircraft Used', value: 'Cessna 172 Glass Cockpit' },
                        { label: 'Includes', value: '200+ hours of flying, DGCA exam prep, and soft skills training' },
                        { label: 'Career Opportunities', value: 'Airline pilot, cargo pilot, charter pilot' },
                    ],
                    href: '/courses/cpl',
                    highlight: true,
                },
                {
                    num: '2', icon: '🛩️',
                    title: 'Private Pilot Training (PPL)',
                    desc: 'Want to fly around for fun? Our PPL program at the Pilot Training Institute in Mumbai is just right for you. Take your friends up in the sky or chill above the city — we keep it simple and exciting. Fly by yourself, however you like!',
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
                    desc: 'Flying isn\'t only about the controls — you need to know the theory too. Our DGCA Ground Classes at the Pilot Training Institute in Mumbai make it super easy to learn air navigation, meteorology, and air regulations. Crack your DGCA exams without any tension!',
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
                    desc: 'Improve your flying skills with advanced aircraft training at our Pilot Training Institute in Mumbai. Designed for pilots who want to enhance their abilities and qualify for commercial aviation roles.',
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
                { icon: '🩺', title: 'Medical Fitness', desc: 'Medical fitness as per DGCA Class 1 Medical standards' },
                { icon: '🗣️', title: 'English Proficiency', desc: 'English proficiency for effective communication' },
            ]}

            career={{
                intro: 'Mumbai is one of India\'s biggest aviation centers with great job options for trained pilots. Once you finish your training, you can try for jobs like these:',
                options: [
                    { icon: '✈️', title: 'Commercial Pilot', desc: 'Fly big passenger planes for airlines like IndiGo, Air India, or SpiceJet.' },
                    { icon: '🛩️', title: 'Private Pilot', desc: 'Work for individuals or companies flying their personal planes.' },
                    { icon: '📦', title: 'Cargo Pilot', desc: 'Deliver goods by flying cargo planes for FedEx or Blue Dart.' },
                    { icon: '🏫', title: 'Flight Instructor', desc: 'Teach new pilots at training schools like ours.' },
                    { icon: '🗺️', title: 'Charter Pilot', desc: 'Fly small planes for special trips — vacations or business travel.' },
                ],
            }}

            syllabus={[
                { num: '1', title: 'Air Regulations', desc: 'The rulebook for flying — covers all the laws and guidelines pilots must follow, including airspace rules and safety standards. The "traffic rules" of the sky.' },
                { num: '2', title: 'Aviation Meteorology', desc: 'Learn to read weather patterns — clouds, winds, storms, and temperature changes — to plan safe flights and avoid turbulence over Mumbai and beyond.' },
                { num: '3', title: 'Air Navigation', desc: 'Your GPS guide to flying! Learn how to find your way using maps, instruments, and calculations to plot routes and land exactly where you\'re supposed to.' },
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
                    { label: 'Extra Gear', desc: 'Books, uniforms, medicals, DGCA exams', amount: 'INR 20–50 Thousand' },
                ],
                whyChanges: [
                    { title: 'School Reputation', desc: 'Top flying schools like We One Aviation charge premium fees for quality — but we also provide scholarships.' },
                    { title: 'City & Location (Mumbai)', desc: 'Mumbai\'s metro environment means pilot training costs are slightly higher compared to smaller towns.' },
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
                'Training since 2011 in Mumbai',
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
                { q: 'How long does it take to complete pilot training in Mumbai?', a: 'PPL takes 4-6 months, CPL takes 12-18 months, and ATPL requires additional experience after CPL. DGCA Ground Classes take 3-6 months.' },
                { q: 'Is there a DGCA exam center or learning hub near Mumbai that helps with pilot preparation?', a: 'Students in and around Mumbai usually plan DGCA ground preparation with a city-based study routine, revision cycle, and coaching schedule that supports theory, mock tests, and exam-day confidence.' },
                { q: 'What is the nearest major airport relevant to pilot training in Mumbai?', a: 'Chhatrapati Shivaji Maharaj International Airport (BOM) is the primary city reference for Mumbai-based airline operations and airport awareness during pilot preparation.' },
                { q: 'What are the fees for pilot training in Mumbai?', a: 'The average fees for CPL training in Mumbai is INR 40–60 Lakh. This includes ground classes (INR 2-3 lakhs), 200 hours of flying (INR 35-55 lakhs), simulator training (INR 3-5 lakhs), and extra gear. WeOne Aviation provides scholarship and flexible payment options.' },
                { q: 'What is the eligibility to become a pilot in Mumbai?', a: 'Minimum age of 17 years, 10+2 with Physics & Mathematics, DGCA Class 1 Medical clearance, and English proficiency are required.' },
                { q: 'Does WeOne Aviation provide placement assistance in Mumbai?', a: 'Yes! We provide placement assistance. Our graduates have successfully joined major airlines, cargo operations, and private aviation companies worldwide.' },
                { q: 'Can I get a scholarship for pilot training in Mumbai?', a: 'Yes! WeOne Aviation Academy provides scholarships to every deserving student along with a flexible fees structure and loan assistance.' },
                { q: 'What career options are available after pilot training in Mumbai?', a: 'After completing pilot training, you can work as a Commercial Airline Pilot (IndiGo, Air India, SpiceJet), Private Pilot, Cargo Pilot (FedEx, Blue Dart), Flight Instructor, or Charter Pilot. Mumbai\'s booming aviation sector offers excellent opportunities.' },
            ]}
        />
    );
}