import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import AutoInternalLinks from "../components/AutoInternalLinks";

const whyChooseCourse = [
  "Build a rewarding career in aviation.",
  "Learn from experienced instructors.",
  "Gain practical flying experience.",
  "Access career opportunities with domestic and international airlines.",
  "Develop leadership, decision-making, and communication skills.",
];

const eligibility = [
  { title: "Educational Qualification", desc: "Applicants should have completed 10+2 with Physics and Mathematics from a recognized board. Students who did not study these subjects may still qualify by completing them through an approved open schooling program." },
  { title: "Age Requirement", desc: "The minimum age to begin pilot training is generally 17 years, while a Commercial Pilot License is issued after meeting DGCA requirements." },
  { title: "Medical Fitness", desc: "Every aspiring pilot must obtain a DGCA Class 1 Medical Certificate. Good eyesight, overall fitness, and medical compliance are essential for a successful aviation career." },
  { title: "English Proficiency", desc: "Since aviation communication is conducted in English, students should have good reading, writing, and speaking skills." },
];

const trainingProgram = [
  "DGCA Ground Classes",
  "Flight Simulator Training",
  "Radio Telephony Preparation",
  "Flying Practice",
  "Navigation Exercises",
  "Night Flying",
  "Cross-Country Flying",
  "DGCA Examination Preparation",
];

const indiaServices = [
  "Personalized career counselling",
  "Guidance for DGCA procedures",
  "Flying school selection",
  "Admission assistance",
  "Documentation support",
  "Career planning",
  "Continuous mentorship",
];

const delhiServices = [
  "Career counselling sessions",
  "Flying school comparisons",
  "Admission process",
  "DGCA Medical guidance",
  "Computer Number registration",
  "Ground class planning",
  "Documentation assistance",
];

const whatMakesUsDifferent = [
  "Experienced aviation career counsellors",
  "Complete guidance for Commercial Pilot License",
  "Assistance with DGCA admission procedures",
  "Personalized training roadmap",
  "Support for pilot training in India and pilot training in Delhi",
  "Transparent counselling without hidden commitments",
];

const durationJourney = [
  "Career Counselling",
  "DGCA Medical Examination",
  "Computer Number Registration",
  "Ground School Training",
  "DGCA Examinations",
  "Flight Training",
  "Flying Hours Completion",
  "Commercial Pilot License Issuance",
];

const salaryProgression = [
  { level: "Student Pilot", range: "During training" },
  { level: "First Officer", range: "₹12–20 LPA" },
  { level: "Senior First Officer", range: "₹20–35 LPA" },
  { level: "Captain", range: "₹50 LPA or more" },
  { level: "International Airline Pilot", range: "Higher salary packages with additional allowances and benefits" },
];

const careerOpportunities = [
  "Commercial Pilot",
  "Airline First Officer",
  "Captain",
  "Charter Pilot",
  "Cargo Pilot",
  "Corporate Pilot",
  "Flight Instructor",
  "Ferry Pilot",
  "Aviation Safety Officer",
];

const ourServicesInclude = [
  "Personalized career counselling",
  "Guidance on commercial pilot eligibility",
  "Support for pilot training in India",
  "Assistance with pilot training in Delhi",
  "Flying school selection",
  "DGCA Medical guidance",
  "Computer Number assistance",
  "Admission and documentation support",
  "Career planning and continuous mentorship",
];

const faqs = [
  { q: "What is a Commercial Pilot License?", a: "A Commercial Pilot License (CPL) is a professional license issued by the Directorate General of Civil Aviation (DGCA) that authorizes a pilot to operate aircraft commercially after meeting all training, examination, and flying hour requirements." },
  { q: "Who is eligible for a commercial pilot course?", a: "Students who have completed 10+2 with Physics and Mathematics, meet DGCA medical standards, and satisfy the minimum age requirements are generally eligible to enroll in a commercial pilot course." },
  { q: "How long does pilot training take?", a: "Most pilot training programs are completed within 18 to 24 months, depending on weather conditions, flying schedules, and individual progress." },
  { q: "Can I pursue pilot training in Delhi?", a: "Yes. Students looking for pilot training in Delhi can receive complete counselling, admission support, and guidance from We One Aviation before joining a DGCA-approved flying school." },
  { q: "What is the average commercial pilot license salary?", a: "Fresh commercial pilots typically earn between ₹12–20 LPA, while experienced captains and international airline pilots can earn substantially higher salaries." },
];

const quickFacts = [
  { val: "17 Years", label: "Min Age" },
  { val: "18–24 Months", label: "Duration" },
  { val: "10+2 PCM", label: "Eligibility" },
  { val: "Class 1", label: "DGCA Medical" },
];

export default function PilotCourseTraining() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Head>
        <title>Pilot Course & Pilot Training in India | We One Aviation</title>
      </Head>

      <Layout
        title="Pilot Course & Pilot Training in India | We One Aviation"
        description="Begin your journey to become a Commercial Pilot with expert guidance from We One Aviation — pilot training in India and pilot training in Delhi."
      >
        <div className="bg-gray-50 min-h-screen">

          {/* ── HEADER ── */}
          <header
            className="bg-gradient-to-br from-av-blue to-av-navy text-white text-center relative overflow-hidden"
            style={{ paddingTop: "144px", paddingBottom: "64px" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full border-2 border-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full border-2 border-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="section-tag mb-3">Begin Your Journey to Become a Commercial Pilot</div>
              <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight mb-4">
                Pilot Course & Pilot Training
                <br />
                <span className="text-av-orange">in India</span>
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Dreaming of flying for leading airlines? The first step is choosing the right pilot course and receiving professional pilot training. At We One Aviation, we guide aspiring pilots through every stage of their aviation journey, from understanding commercial pilot eligibility to selecting the right flying school and earning a Commercial Pilot License (CPL).
              </p>
            </div>
          </header>

          {/* ── QUICK FACTS STRIP ── */}
          <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4">
              {quickFacts.map((f, i) => (
                <div key={i} className={`py-5 text-center ${i < quickFacts.length - 1 ? "border-r border-gray-100" : ""}`}>
                  <div className="font-montserrat font-black text-lg text-av-blue">{f.val}</div>
                  <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{f.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── EXPERT GUIDANCE ── */}
          <section className="py-10 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Overview</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Become a Commercial Pilot with Expert Guidance
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-3">
                  Dreaming of flying for leading airlines? The first step is choosing the right pilot course and receiving professional pilot training. At We One Aviation, we guide aspiring pilots through every stage of their aviation journey, from understanding commercial pilot eligibility to selecting the right flying school and earning a Commercial Pilot License (CPL).
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Whether you're looking for pilot training in India or pilot training in Delhi, our experienced aviation counsellors help you make informed decisions based on your career goals, budget, and training requirements.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── WHAT IS A PILOT COURSE ── */}
          <section className="py-10 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Quick Answer</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                What is a Pilot Course?
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  A pilot course is a structured aviation training program that prepares students to become licensed pilots. It includes DGCA ground classes, flight simulator sessions, medical examinations, and practical flying experience. After completing the required training and flying hours, students receive a Commercial Pilot License (CPL), allowing them to work as professional pilots with airlines, charter operators, cargo companies, and corporate aviation organizations.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── WHY CHOOSE A COMMERCIAL PILOT COURSE ── */}
          <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Why This Career</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Why Choose a Commercial Pilot Course?
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  The aviation industry continues to expand, creating excellent career opportunities for skilled pilots. A commercial pilot course provides the technical knowledge, flying skills, and aviation regulations required to build a successful career. Choosing a professional commercial pilot training program offers several advantages:
                </p>
              </AutoInternalLinks>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {whyChooseCourse.map((b, i) => (
                  <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                    <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                    <div className="text-gray-500 text-xs leading-relaxed">{b}</div>
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  With the right training and guidance, becoming a commercial pilot is an achievable goal for passionate students.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── COMMERCIAL PILOT ELIGIBILITY ── */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Requirements</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Commercial Pilot Eligibility
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Before applying for a commercial pilot licence course, candidates should understand the basic commercial pilot eligibility requirements.
                </p>
              </AutoInternalLinks>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {eligibility.map((item, i) => (
                  <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="font-montserrat font-bold text-av-blue text-sm mb-2">{item.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── COMMERCIAL PILOT TRAINING IN INDIA ── */}
          <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Curriculum</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Commercial Pilot Training in India
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Today, commercial pilot training in India combines classroom education with practical flight experience. Students learn aviation theory, aircraft systems, navigation, meteorology, air regulations, and operational procedures before progressing to hands-on flying. A standard training program includes:
                </p>
              </AutoInternalLinks>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {trainingProgram.map((step, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                    <span className="text-gray-600 text-sm leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  After successfully completing all training requirements and accumulating the required flying hours, students become eligible to apply for their Commercial Pilot License.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── PILOT TRAINING IN INDIA ── */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">India</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Pilot Training in India
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-3">
                  The demand for pilot training in India has grown significantly due to the rapid expansion of the aviation sector. New airlines, increasing passenger traffic, and fleet expansion have created a steady demand for qualified pilots.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  At We One Aviation, we simplify this journey by providing:
                </p>
              </AutoInternalLinks>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {indiaServices.map((item, i) => (
                  <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                    <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                    <div className="text-gray-500 text-xs leading-relaxed">{item}</div>
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  Our goal is to help students choose the right path based on their career aspirations and training budget.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── PILOT TRAINING IN DELHI ── */}
          <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Delhi</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Pilot Training in Delhi
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-3">
                  Students searching for pilot training in Delhi often need expert guidance before selecting a flying school. While flight training may take place at different DGCA-approved academies across India, proper counselling ensures you choose the most suitable option.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  We One Aviation supports aspiring pilots in Delhi by assisting with:
                </p>
              </AutoInternalLinks>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {delhiServices.map((item, i) => (
                  <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                    <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                    <div className="text-gray-500 text-xs leading-relaxed">{item}</div>
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  Our experienced counsellors provide clear, transparent advice to help students confidently begin their aviation careers.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── WHY WE ONE AVIATION ── */}
          <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Our Difference</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                Why We One Aviation?
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-white/70 leading-relaxed text-sm mb-6">
                  Choosing the right aviation mentor is just as important as choosing the right flying school. At We One Aviation, we focus on providing reliable information, personalized guidance, and continuous support throughout your pilot training journey.
                </p>
              </AutoInternalLinks>
              <h3 className="font-montserrat font-bold text-white mb-3">What Makes Us Different?</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {whatMakesUsDifferent.map((item, i) => (
                  <div key={i} className="glass rounded-2xl p-6 flex gap-4">
                    <div className="flex-shrink-0 w-9 h-9 bg-av-orange rounded-full flex items-center justify-center text-white font-black">{i + 1}</div>
                    <div className="text-white/70 text-xs leading-relaxed">{item}</div>
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-white/70 leading-relaxed text-sm">
                  Our mission is to help every aspiring pilot make informed decisions and successfully achieve their dream of becoming a commercial pilot.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── COMMERCIAL PILOT COURSE DURATION ── */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Timeline</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Commercial Pilot Course Duration
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  The duration of a commercial pilot course generally ranges from 18 to 24 months, depending on the flying school, weather conditions, aircraft availability, and the student's training progress. During this period, students complete DGCA ground classes, simulator sessions, practical flight training, and the required flying hours to qualify for a Commercial Pilot License (CPL). A typical training journey includes:
                </p>
              </AutoInternalLinks>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {durationJourney.map((step, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                    <span className="text-gray-600 text-sm leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  Completing each stage successfully prepares students for a professional career in aviation.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── COMMERCIAL PILOT COURSE FEES ── */}
          <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Investment</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Commercial Pilot Course Fees
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-3">
                  The cost of a commercial pilot course varies depending on the flying school, aircraft type, training location, and additional services. Most students should also consider expenses such as medical examinations, DGCA examination fees, accommodation, and study materials while planning their budget.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  At We One Aviation, our counsellors help students understand the complete fee structure, compare flying schools, and choose an option that matches their career goals and financial plan.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── COMMERCIAL PILOT LICENSE SALARY ── */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Earnings</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Commercial Pilot License Salary
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  One of the most attractive aspects of becoming a commercial pilot is the excellent earning potential. The commercial pilot license salary depends on experience, airline, aircraft type, and the number of flying hours. Average salary progression:
                </p>
              </AutoInternalLinks>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {salaryProgression.map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover">
                    <div className="bg-av-blue px-4 py-4">
                      <div className="font-montserrat font-bold text-white text-xs mb-1">{s.level}</div>
                      <div className="text-av-orange font-black text-sm">{s.range}</div>
                    </div>
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  Besides a competitive salary, commercial pilots often receive travel benefits, medical coverage, retirement plans, and career advancement opportunities.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── CAREER OPPORTUNITIES ── */}
          <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Career Paths</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Career Opportunities After Commercial Pilot Training
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  Completing commercial pilot training opens the door to a variety of rewarding careers in the aviation industry. Depending on your experience and qualifications, you can pursue roles such as:
                </p>
              </AutoInternalLinks>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {careerOpportunities.map((c, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-av-blue font-semibold text-center card-hover hover:border-av-orange/30 transition-all">
                    {c}
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  With the continuous growth of India's aviation sector and increasing global demand for pilots, qualified professionals have excellent long-term career prospects.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── WHY CHOOSE WE ONE AVIATION (SERVICES) ── */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">Our Services</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                Why Choose We One Aviation?
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  At We One Aviation, we believe every aspiring pilot deserves expert guidance before investing in a pilot training program. Our experienced aviation counsellors help students make informed decisions at every stage of their journey.
                </p>
              </AutoInternalLinks>
              <h3 className="font-montserrat font-bold text-av-blue mb-3">Our Services Include:</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {ourServicesInclude.map((item, i) => (
                  <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                    <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                    <div className="text-gray-500 text-xs leading-relaxed">{item}</div>
                  </div>
                ))}
              </div>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-gray-600 leading-relaxed text-sm">
                  Our objective is to simplify the journey from aspiring student to licensed commercial pilot through transparent advice and professional support.
                </p>
              </AutoInternalLinks>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag mb-3">FAQ</div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((item, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full bg-av-blue text-white px-6 py-4 flex justify-between items-center hover:bg-av-navy transition-all text-left"
                    >
                      <span className="font-montserrat font-bold text-sm">{item.q}</span>
                      <span className="text-white/60 text-sm flex-shrink-0 ml-3">{openFaq === i ? "▲" : "▼"}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 py-4 bg-white">
                        <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── START YOUR AVIATION JOURNEY / CONCLUSION ── */}
          <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                Start Your Aviation Journey with We One Aviation
              </h2>
              <AutoInternalLinks currentPath="/pilot-course-training">
                <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto mb-3">
                  Choosing the right pilot course is the foundation of a successful aviation career. Whether you are searching for pilot training, commercial pilot training in India, or guidance on obtaining your Commercial Pilot License, We One Aviation is committed to supporting you every step of the way.
                </p>
                <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
                  Our experienced team provides personalized counselling, transparent advice, and end-to-end assistance to help you achieve your dream of becoming a commercial pilot. From understanding eligibility and selecting the right flying school to preparing for DGCA requirements, we ensure you have the knowledge and confidence to begin your aviation journey.
                </p>
              </AutoInternalLinks>
              <p className="text-white font-bold text-sm md:text-base mb-6">
                Take the first step today. Contact We One Aviation to book your free counselling session and start your path toward a rewarding career in aviation.
              </p>
              <a
                href="/contact"
                className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm shadow-lg"
              >
                Get Free Counselling →
              </a>
            </div>
          </section>

        </div>
      </Layout>
    </>
  );
}