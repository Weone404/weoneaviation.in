import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import { generateCourseSchema } from '../lib/schema';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Aviation Course', title: 'Airline Preparation', highlight: 'Course', sub: 'Ask the academy to confirm the current syllabus, delivery format, and schedule.' },
];

const whyChoose = [
    { icon: '📚', title: 'Course Content', desc: 'Ask the academy for the current written syllabus and confirm which preparation activities are included.' },
    { icon: '👨‍✈️', title: 'Instruction', desc: 'Confirm the current instructors, their relevant experience, and course delivery with the academy.' },
    { icon: '📍', title: 'Academy Location', desc: 'The academy’s physical classroom is in Dwarka, Delhi. Confirm whether this course is currently delivered there.' },
    { icon: '✈️', title: 'Course Scope', desc: 'Confirm the current course scope and any included activities before enrolling.' },
    { icon: '🏆', title: 'Outcomes', desc: 'Course completion does not guarantee airline selection or employment; hiring decisions rest with each operator.' },
    { icon: '🛩️', title: 'Practical Activities', desc: 'Confirm directly whether any simulator session, visit, or other practical activity is included in the current course.' },
    { icon: '🤝', title: 'Networking', desc: 'Ask the academy whether any networking activity is currently part of the course.' },
    { icon: '🌍', title: 'Course Focus', desc: 'The course covers aviation-career preparation and interview practice. Employers set their own recruitment requirements and make hiring decisions.' },
    { icon: '💼', title: 'Interview Preparation', desc: 'Ask the academy to confirm the current interview-preparation content and format.' },
];

const contactWays = [
    { icon: '🌐', title: 'Visit Our Website', desc: 'The official We One Aviation website is a comprehensive resource for information. Go to our Contact Us page, where you\'ll find details such as our address, phone numbers, and email addresses. Visit weoneaviation.in for quick access.' },
    { icon: '📞', title: 'Phone Contact', desc: 'Give us a call to speak directly with our representatives. Dial the provided phone numbers listed on our website, and our team will be happy to assist you with any queries or concerns.' },
    { icon: '📧', title: 'Email Communication', desc: 'If you prefer written communication, you can send us an email. Visit our Contact Us page for the relevant email addresses, and our team will respond promptly to provide the information you need.' },
    { icon: '📱', title: 'Social Media Platforms', desc: 'Connect with We One Aviation through our official social media channels, such as Facebook, Twitter, or LinkedIn. Direct messages or comments on these platforms can be another effective way to get in touch.' },
    { icon: '🏢', title: 'Visit the Academy', desc: 'The physical classroom is in Dwarka, Delhi. Contact the academy in advance to confirm visitor access and current availability.' },
    { icon: '📝', title: 'Online Inquiry Form', desc: 'Many websites, including ours, provide an online inquiry form. Fill out the required details, ask your questions, and submit the form. This allows our team to address your specific needs efficiently.' },
    { icon: '🎪', title: 'Course Information', desc: 'Contact the academy to confirm whether any information session is currently scheduled.' },
];

const requirements = [
    { icon: '🎓', label: 'Educational Qualifications', desc: 'Candidates should have completed their high school education or its equivalent. A minimum educational background is typically required to ensure a basic level of academic proficiency.' },
    { icon: '🎂', label: 'Age Criteria', desc: 'Most aviation training programs, including the Airline Preparation Course at We One Aviation, have age criteria. Candidates should meet the specified age requirements for enrollment.' },
    { icon: '🗣️', label: 'Communication Skills', desc: 'Proficiency in English is important for success in aviation. Applicants are often required to demonstrate adequate communication skills, both written and verbal, to handle the coursework and interact in a professional aviation environment.' },
    { icon: '🩺', label: 'Physical Fitness', desc: 'Due to the physical demands of certain aviation roles, candidates may be required to meet specific health and fitness standards. This ensures that students can safely participate in practical training sessions and perform the duties associated with aviation professions.' },
    { icon: '📐', label: 'Basic Understanding Of Mathematics And Physics', desc: 'Aviation involves principles of mathematics and physics. Candidates aspiring to enrol in the program are typically expected to have a basic understanding of these subjects. This foundational knowledge is essential for them to grasp the technical aspects of aviation training comprehensively.' },
    { icon: '❤️', label: 'Passion For Aviation', desc: 'We One Aviation values candidates who demonstrate a genuine passion for aviation. A strong interest in pursuing a career in the airline industry is essential for motivation and success in the program.' },
    { icon: '📋', label: 'Admissions Test Or Interview', desc: 'Some aviation training programs may require candidates to undergo an admissions test or interview process. This helps assess their aptitude for the program and their commitment to a career in aviation.' },
    { icon: '🛂', label: 'Visa Requirements (For International Students)', desc: 'International students interested in enrolling in the Airline Preparation Course should ensure they meet the visa requirements for studying in the respective country.' },
];

const examPrepSteps = [
    { title: 'Understand The Exam Format', desc: 'Familiarize yourself with the structure of the written exam. Know the types of questions, time constraints, and the weightage of each section. This understanding will guide your study plan.' },
    { title: 'Review Course Materials', desc: 'Review the materials supplied for your course and confirm the current syllabus with the academy.' },
    { title: 'Create A Study Schedule', desc: 'Develop a study schedule that covers all relevant subjects. Allocate specific time slots for different topics to ensure comprehensive coverage.' },
    { title: 'Practice Regularly', desc: 'Practice with sample questions and previous exam papers to familiarize yourself with the exam pattern. This will improve your time management and boost your confidence.' },
    { title: 'Seek Guidance', desc: "If you encounter challenging concepts, don't hesitate to seek guidance from instructors or fellow students. Understanding key concepts is important for success." },
    { title: 'Utilize Additional Resources', desc: 'Supplement your study materials with relevant books, online resources, and articles. This broader approach can provide diverse perspectives on the subject matter.' },
    { title: 'Take Mock Exams', desc: 'Simulate exam conditions by taking mock exams. This will help you assess your readiness, identify areas for improvement, and build exam endurance.' },
    { title: 'Stay Healthy And Rested', desc: 'Ensure you maintain a healthy lifestyle during your preparation. A well-rested mind and body are essential for effective learning and optimal performance during the exam.' },
];

const airlineSteps = [
    { title: 'Legal Structure', desc: 'Establish the legal structure of your airline, considering factors like ownership, partnerships, and compliance with aviation regulations.' },
    { title: 'Business Plan', desc: "Develop a comprehensive business plan outlining your airline's objectives, target market, financial projections, and operational strategy." },
    { title: 'Fleet Acquisition', desc: 'Acquire suitable aircraft for your airline. Consider factors such as passenger capacity, range, and fuel efficiency.' },
    { title: 'Network Development', desc: 'Develop a network of routes based on market demand and strategic considerations. Negotiate agreements with airports for landing rights.' },
    { title: 'Marketing And Branding', desc: 'Implement marketing strategies to promote your airline. Build a strong brand identity to attract passengers and create a positive image in the industry.' },
    { title: 'Operational Launch', desc: 'Launch operations once all necessary preparations are in place. Ensure adherence to safety protocols, schedule reliability, and customer service excellence.' },
];

const pilotPrepSteps = [
    { title: 'Aircraft Inspection', desc: 'Pilots conduct a thorough pre-flight inspection of the aircraft, checking for any mechanical issues or anomalies. This includes reviewing maintenance logs and ensuring all systems are functioning correctly.' },
    { title: 'Weather Analysis', desc: 'Pilots analyze current and forecasted weather conditions along the flight route. This includes considerations for turbulence, storms, and any other weather-related challenges.' },
    { title: 'Coordination with Crew', desc: 'Pilots communicate and coordinate with the entire flight crew, ensuring everyone is aware of their roles and responsibilities. Effective teamwork is important for a smooth flight.' },
    { title: 'Flight Plan Review', desc: 'Pilots review the detailed flight plan, including navigation charts, waypoints, and alternate routes. This step is essential for understanding the entire journey and potential deviations.' },
];


const courseSchema = generateCourseSchema({
  name: 'Airline Preparation Course',
  description: 'Airline-career preparation and interview practice. Confirm current course content and format with the academy.',
  url: 'https://weoneaviation.in/airline-preparation-course',
});

export default function AirlinePreparation() {
    return (
        <Layout title="Airline Preparation Course | We One Aviation Academy" description="Ask the academy to confirm current airline-career preparation content, delivery format, and schedule. Interview preparation does not guarantee employment.">
      <StructuredData data={courseSchema} />

            <HeroSlider customSlides={heroSlides} asH1={false} />

            {/* Overview */}
            <section className="py-20 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">Aviation Course</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Airline Preparation Course
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Ask We One Aviation about the current airline-preparation course syllabus, delivery format, and schedule. The academy’s physical classroom is in Dwarka, Delhi; confirm whether this course is currently delivered there.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Beginning your aviation journey requires the right guidance — and We One Aviation stands as a trusted institution known for excellence, expertise, and experience.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                Request the current course outline before enrolling. Any preparation supports candidates but does not guarantee airline selection or employment.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[[ 'Confirm with academy', 'Delivery location'], ['Course-specific', 'Scope'], ['No external recognition asserted', 'Certificate status'], ['Confirm current syllabus', 'Interview preparation']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What Is Airline Preparation */}
                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Is Airline Preparation?</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Airline preparation refers to a specialized training program designed to equip individuals with the skills, knowledge, and practical experience needed to pursue a career in the aviation industry. This comprehensive course is tailored to prepare aspiring professionals for various roles within the airline sector, ranging from pilots and flight attendants to ground crew and aviation management.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                In the big picture, getting ready for an airline career is super important for people who dream of working in aviation. It doesn't matter if you want to be a pilot, a cabin crew member, or work on the ground – going through a complete airline preparation course sets you up for a successful and satisfying journey in the dynamic and cool world of aviation. So, no matter your aviation dream job, this course is like the starting point for making it happen.
                            </p>

                            {/* Why Choose We One */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What should I confirm about this airline preparation course?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Ask for the current syllabus, delivery format, fees, schedule, and certificate terms before enrolling. The course does not guarantee airline selection or employment.
                            </p>
                            <div className="space-y-4 mb-6">
                                {whyChoose.map((item) => (
                                    <div key={item.title} className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:border-av-orange/30 transition-all">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{item.icon}</span>
                                            <h4 className="font-montserrat font-bold text-av-blue text-sm">{item.title}</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Confirm current course content and delivery with the academy. Course completion does not guarantee external recognition, airline selection, or employment.
                            </p>

                            {/* How to Contact */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How Can I Contact We One Aviation?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Contacting We One Aviation is a straightforward process, and we are here to guide you on how to reach out to us. Whether you have inquiries about our Airline Preparation Course or need more information about our institution, here are the ways you can get in touch with We One Aviation:
                            </p>
                            <div className="space-y-3 mb-6">
                                {contactWays.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Contact the academy to ask about the course. Confirm current delivery, availability, and response arrangements directly.
                            </p>

                            {/* Requirements */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Are The Requirements For Airline Preparation Course At We One Aviation?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                To enrol in the Airline Preparation Course at We One Aviation, aspiring candidates must meet specific requirements to ensure a foundational understanding of aviation principles and a successful learning experience. Here are the key requirements for admission:
                            </p>
                            <div className="space-y-4 mb-4">
                                {requirements.map((item) => (
                                    <div key={item.label} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="text-xl">{item.icon}</span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{item.label}</h4>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-500 text-xs mb-10">
                                Prospective students need to review the specific admission criteria outlined by We One Aviation, as requirements may vary based on the program and location. Additionally, candidates are encouraged to reach out to the admissions office for personalized guidance and to clarify any specific queries related to the Airline Preparation Course.
                            </p>

                            {/* How to Prepare for Written Exam */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How can I prepare for an airline selection process?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Preparing for a written exam for an Airline Preparation Course requires a strategic approach to ensure success. Here are key steps to enhance your preparation:
                            </p>
                            <div className="space-y-4 mb-10">
                                {examPrepSteps.map((step, i) => (
                                    <div key={step.title} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <div className="flex items-center gap-3 bg-av-blue p-4">
                                            <span className="w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</span>
                                            <h4 className="font-montserrat font-bold text-white text-sm">{step.title}</h4>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <p className="text-gray-600 text-xs leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* How To Become An Airline */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How To Become An Airline?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Becoming an airline involves a complex and regulated process. Here's a simplified overview of the steps:
                            </p>
                            <div className="space-y-3 mb-10">
                                {airlineSteps.map((step, i) => (
                                    <div key={step.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="flex-shrink-0 w-6 h-6 bg-av-orange rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                                        <span><span className="font-semibold text-av-blue">{step.title}:</span> {step.desc}</span>
                                    </div>
                                ))}
                            </div>

                            {/* How Pilots Prepare for Flight */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How Pilots Prepare For Flight?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Pilots undergo extensive training and preparation before each flight. Here's an insight into their preparation process:
                            </p>
                            <div className="space-y-3 mb-6">
                                {pilotPrepSteps.map((step, i) => (
                                    <div key={step.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="flex-shrink-0 w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</span>
                                        <span><span className="font-semibold text-av-blue">{step.title}:</span> {step.desc}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-gray-500 text-xs mb-10">
                                In summary, the preparation for a flight involves a meticulous and systematic approach, focusing on safety, communication, and a thorough understanding of the aircraft and operational conditions.
                            </p>

                            {/* Conclusion CTA */}
                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Start Your Airline Preparation Journey</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                                    Contact the academy for current course details. Employers control their own selection processes and hiring decisions; course completion does not guarantee a job. ✈️
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
                            <LeadForm title="Join Airline Preparation Course" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Admission Requirements</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ High school graduate</li>
                                    <li>✓ English proficiency</li>
                                    <li>✓ Physical fitness standards</li>
                                    <li>✓ Basic Math & Physics knowledge</li>
                                    <li>✓ Passion for aviation</li>
                                    <li>✓ Admissions test / interview</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Course Highlights</h4>
                                <p className="text-white/80 text-sm mb-3">Airline Preparation Course:</p>
                                <div className="text-2xl font-montserrat font-black">Dwarka, Delhi</div>
                                <div className="text-white/70 text-xs mt-1">Course completion certificate</div>
                                <div className="text-white/70 text-xs mt-1">Career Guidance</div>
                                <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Get Free Counselling
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}