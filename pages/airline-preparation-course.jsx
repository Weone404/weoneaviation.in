import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'Aviation Course', title: 'Airline Preparation', highlight: 'Course In Dwarka', sub: 'Step into the world of aviation success with We One Aviation Academy' },
];

const whyChoose = [
    { icon: '📚', title: 'Comprehensive Curriculum', desc: 'We One Aviation offers a meticulously crafted curriculum that covers all facets of airline preparation, ensuring a well-rounded education for aspiring aviation professionals.' },
    { icon: '👨‍✈️', title: 'Experienced Faculty', desc: 'Our institution boasts a team of seasoned instructors with extensive industry experience. These experts bring real-world insights and practical knowledge, enriching the learning experience for students.' },
    { icon: '🖥️', title: 'State-of-the-Art Facilities', desc: 'We One Aviation is equipped with modern infrastructure and cutting-edge facilities, including advanced simulators and technology, providing students with a realistic and immersive training environment.' },
    { icon: '📍', title: 'Strategic Location in Dwarka', desc: 'Situated in Dwarka, our institution benefits from a strategic location with modern amenities and a conducive learning environment, fostering a positive atmosphere for skill development.' },
    { icon: '✈️', title: 'Industry-Relevant Modules', desc: 'The course at We One Aviation is designed with industry relevance in mind. Specialized modules address current trends and challenges in the aviation sector, ensuring graduates are well-prepared for the workforce.' },
    { icon: '🏆', title: 'Alumni Success Stories', desc: 'We One Aviation takes pride in the success stories of its alumni, who have excelled in various roles within the aviation industry. These achievements highlight the effectiveness of our training programs.' },
    { icon: '🛩️', title: 'Hands-On Training', desc: 'Practical experience is a cornerstone of our courses. Through hands-on training, including simulator sessions and industry visits, students gain valuable exposure to real-world scenarios, enhancing their readiness for the field.' },
    { icon: '🤝', title: 'Networking Opportunities', desc: 'Our institution facilitates networking events, connecting students with industry professionals, fellow aviators, and potential employers. Building a strong network is crucial in the competitive aviation landscape.' },
    { icon: '🌍', title: 'Global Recognition', desc: "We One Aviation's courses are globally recognized, opening doors for graduates to pursue opportunities not only in India but also internationally. Our reputation is a testament to the quality of education provided." },
    { icon: '💼', title: 'Placement Assistance', desc: 'A dedicated placement cell at We One Aviation assists students in securing job opportunities with leading airlines globally. Our commitment extends beyond education to supporting graduates in launching their careers.' },
];

const contactWays = [
    { icon: '🌐', title: 'Visit Our Website', desc: 'The official We One Aviation website is a comprehensive resource for information. Navigate to our Contact Us page, where you\'ll find details such as our address, phone numbers, and email addresses. Visit www.weoneaviation.in for quick access.' },
    { icon: '📞', title: 'Phone Contact', desc: 'Give us a call to speak directly with our representatives. Dial the provided phone numbers listed on our website, and our team will be happy to assist you with any queries or concerns.' },
    { icon: '📧', title: 'Email Communication', desc: 'If you prefer written communication, you can send us an email. Visit our Contact Us page for the relevant email addresses, and our team will respond promptly to provide the information you need.' },
    { icon: '📱', title: 'Social Media Platforms', desc: 'Connect with We One Aviation through our official social media channels, such as Facebook, Twitter, or LinkedIn. Direct messages or comments on these platforms can be another effective way to get in touch.' },
    { icon: '🏢', title: 'Visit Our Office', desc: 'For a more personal interaction, you are welcome to visit our physical office. The address is available on our website\'s Contact Us page, along with a map for easy navigation.' },
    { icon: '📝', title: 'Online Inquiry Form', desc: 'Many websites, including ours, provide an online inquiry form. Fill out the required details, ask your questions, and submit the form. This allows our team to address your specific needs efficiently.' },
    { icon: '🎪', title: 'Attend Open Houses Or Events', desc: 'Keep an eye out for any open houses, events, or informational sessions organized by We One Aviation. These gatherings provide an excellent opportunity to meet our team, ask questions, and gather valuable insights.' },
];

const requirements = [
    { icon: '🎓', label: 'Educational Qualifications', desc: 'Candidates should have completed their high school education or its equivalent. A minimum educational background is typically required to ensure a basic level of academic proficiency.' },
    { icon: '🎂', label: 'Age Criteria', desc: 'Most aviation training programs, including the Airline Preparation Course at We One Aviation, have age criteria. Candidates should meet the specified age requirements for enrollment.' },
    { icon: '🗣️', label: 'Communication Skills', desc: 'Proficiency in English is crucial for success in aviation. Applicants are often required to demonstrate adequate communication skills, both written and verbal, to effectively navigate the coursework and interact in a professional aviation environment.' },
    { icon: '🩺', label: 'Physical Fitness', desc: 'Due to the physical demands of certain aviation roles, candidates may be required to meet specific health and fitness standards. This ensures that students can safely participate in practical training sessions and perform the duties associated with aviation professions.' },
    { icon: '📐', label: 'Basic Understanding Of Mathematics And Physics', desc: 'Aviation involves principles of mathematics and physics. Candidates aspiring to enrol in the program are typically expected to have a basic understanding of these subjects. This foundational knowledge is essential for them to grasp the technical aspects of aviation training comprehensively.' },
    { icon: '❤️', label: 'Passion For Aviation', desc: 'We One Aviation values candidates who demonstrate a genuine passion for aviation. A strong interest in pursuing a career in the airline industry is essential for motivation and success in the program.' },
    { icon: '📋', label: 'Admissions Test Or Interview', desc: 'Some aviation training programs may require candidates to undergo an admissions test or interview process. This helps assess their aptitude for the program and their commitment to a career in aviation.' },
    { icon: '🛂', label: 'Visa Requirements (For International Students)', desc: 'International students interested in enrolling in the Airline Preparation Course should ensure they meet the visa requirements for studying in the respective country.' },
];

const examPrepSteps = [
    { title: 'Understand The Exam Format', desc: 'Familiarize yourself with the structure of the written exam. Know the types of questions, time constraints, and the weightage of each section. This understanding will guide your study plan.' },
    { title: 'Review Course Materials', desc: 'Thoroughly go through the course materials provided by We One Aviation for the Airline Preparation Course In Dwarka. Pay special attention to topics emphasized in the curriculum.' },
    { title: 'Create A Study Schedule', desc: 'Develop a study schedule that covers all relevant subjects. Allocate specific time slots for different topics to ensure comprehensive coverage.' },
    { title: 'Practice Regularly', desc: 'Practice with sample questions and previous exam papers to familiarize yourself with the exam pattern. This will improve your time management and boost your confidence.' },
    { title: 'Seek Guidance', desc: "If you encounter challenging concepts, don't hesitate to seek guidance from instructors or fellow students. Understanding key concepts is crucial for success." },
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
    { title: 'Coordination with Crew', desc: 'Pilots communicate and coordinate with the entire flight crew, ensuring everyone is aware of their roles and responsibilities. Effective teamwork is crucial for a smooth flight.' },
    { title: 'Flight Plan Review', desc: 'Pilots review the detailed flight plan, including navigation charts, waypoints, and alternate routes. This step is vital for understanding the entire journey and potential deviations.' },
];

export default function AirlinePreparation() {
    return (
        <Layout title="Airline Preparation Course In Dwarka | WeOne Aviation Academy" description="Join We One Aviation's Airline Preparation Course in Dwarka. Comprehensive training for pilots, cabin crew, and aviation professionals. Expert faculty, state-of-the-art facilities, 100% placement support.">
            <HeroSlider customSlides={heroSlides} />

            {/* Overview */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">Aviation Course</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                Airline Preparation Course In Dwarka
                            </h1>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Step into the world of aviation success with We One Aviation's Airline Preparation Course in Dwarka. This comprehensive program is designed to transform aviation enthusiasts into skilled professionals ready for the global airline industry.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                                Beginning your aviation journey requires the right guidance — and We One Aviation stands as a trusted institution known for excellence, expertise, and experience.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                                Through a balanced mix of theoretical knowledge and practical training, we make your learning journey both exciting and industry-relevant.
                            </p>

                            {/* Quick Facts */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['Dwarka, Delhi', 'Location'], ['All Roles', 'Coverage'], ['Global', 'Recognition'], ['100%', 'Placement Support']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* What Is Airline Preparation */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">What Is Airline Preparation?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Airline preparation refers to a specialized training program designed to equip individuals with the skills, knowledge, and practical experience needed to pursue a career in the aviation industry. This comprehensive course is tailored to prepare aspiring professionals for various roles within the airline sector, ranging from pilots and flight attendants to ground crew and aviation management.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                In the big picture, getting ready for an airline career is super important for people who dream of working in aviation. It doesn't matter if you want to be a pilot, a cabin crew member, or work on the ground – going through a complete airline preparation course sets you up for a successful and satisfying journey in the dynamic and cool world of aviation. So, no matter your aviation dream job, this course is like the starting point for making it happen.
                            </p>

                            {/* Why Choose We One */}
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Why Choose We One Aviation For An Airline Preparation Course In Dwarka?</h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                Choosing We One Aviation for an Airline Preparation Course is a decision backed by a myriad of compelling reasons that set this institution apart. Let's explore why enrolling in We One Aviation's program is the optimal choice for individuals aspiring to excel in the aviation industry.
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
                                Choosing We One Aviation for an Airline Preparation Course in Dwarka ensures a holistic and industry-driven education. From a robust curriculum to experienced faculty and global recognition, our institution is dedicated to nurturing the next generation of aviation professionals, providing them with the wings to soar in their careers.
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
                                Remember, whether you prefer digital communication or face-to-face interaction, We One Aviation, home to the exceptional Airline Preparation Course In Dwarka, is committed to providing timely and helpful responses to all your queries. We look forward to assisting you on your journey towards a successful aviation career.
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
                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How to Prepare for a Written Exam for Airline Preparation Course In Dwarka?</h3>
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
                                    To sum it up, starting the Airline Preparation Course in Dwarka with We One Aviation is like stepping into a life-changing adventure leading to a great career in aviation. The curriculum covers everything you need, the teachers are pros with real-world knowledge, and it's a fantastic start to your exciting career in aviation! ✈️
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
                                <div className="text-white/70 text-xs mt-1">Globally Recognized Certificate</div>
                                <div className="text-white/70 text-xs mt-1">100% Placement Assistance</div>
                                <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Get Free Counselling
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </Layout>
    );
}