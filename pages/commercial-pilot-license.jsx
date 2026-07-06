import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import AutoInternalLinks from "../components/AutoInternalLinks";

const processSteps = [
  {
    phase: "Step 1 – Career Counselling",
    desc: "Understand the pilot career path, course options, eligibility, estimated costs, and training roadmap.",
  },
  {
    phase: "Step 2 – DGCA Medical Examination",
    desc: "Complete the required DGCA medical assessment before beginning professional pilot training.",
  },
  {
    phase: "Step 3 – DGCA Ground Classes",
    desc: "Join expert DGCA Ground Classes covering subjects such as:",
    topics: ["Air Navigation", "Aviation Meteorology", "Air Regulations", "Technical General", "Technical Specific", "RTR preparation"],
    note: "Strong theoretical knowledge builds the foundation for safe and successful flight training.",
  },
  {
    phase: "Step 4 – DGCA Examinations",
    desc: "Students appear for DGCA examinations after completing their ground training. Passing these exams is an important milestone toward obtaining a Commercial Pilot License.",
  },
  {
    phase: "Step 5 – Flying School Admission",
    desc: "After clearing the required examinations, students join a DGCA-approved Flying School to begin practical flying training.",
  },
  {
    phase: "Step 6 – Complete 200 Flying Hours",
    desc: "To become eligible for a Commercial Pilot License, candidates must complete at least 200 flying hours under DGCA regulations. These hours include cross-country flying, instrument flying, solo flying, and practical flight exercises designed to develop professional piloting skills.",
  },
];

const eligibilityItems = [
  {
    label: "Educational Qualification",
    desc: "Candidates should have completed 10+2 with Physics and Mathematics from a recognized board. Students from other streams may qualify by completing the required subjects through approved educational pathways, subject to applicable DGCA regulations.",
  },
  {
    label: "Age Requirement",
    desc: "Students can begin planning their pilot career after completing Class 12. The minimum age for obtaining a Commercial Pilot License is determined by DGCA licensing requirements.",
  },
  {
    label: "DGCA Medical",
    desc: "Every aspiring pilot must successfully complete DGCA Class 1 Medical examinations. Good physical and mental fitness are essential for safe flight operations.",
  },
  {
    label: "English Proficiency",
    desc: "English is the international language of aviation. Good communication skills help pilots understand aviation procedures, communicate with Air Traffic Control, and operate safely.",
  },
];

const whyChooseCourseList = [
  "Professional DGCA guidance",
  "Expert ground classes",
  "Practical flying experience",
  "Airline-focused training",
  "Career counselling and mentorship",
  "Support throughout the Commercial Pilot License process",
];

const pilotTrainingIndiaList = [
  "Commercial Pilot Training",
  "Commercial Pilot Course",
  "DGCA Ground Classes",
  "Flying School Selection",
  "DGCA Medical",
  "Computer Number Registration",
  "Flight Training Planning",
  "Documentation Support",
];

const whatMakesUsDifferent = [
  "Experienced aviation counsellors",
  "Comprehensive Commercial Pilot Training guidance",
  "Expert DGCA Ground Classes",
  "Assistance with DGCA Medical and Computer Number",
  "Support for Flying School admissions in India and abroad",
  "Personalized career counselling",
  "End-to-end assistance until your Commercial Pilot License is achieved",
];

const cplJourneyList = [
  "Career Counselling",
  "DGCA Medical",
  "Computer Number Registration",
  "DGCA Ground Classes",
  "DGCA Examinations",
  "Flying School Training",
  "200 Flying Hours",
  "Commercial Pilot License Issuance",
];

const feeConsiderations = [
  "DGCA Medical",
  "Examination Fees",
  "Flying Training",
  "Uniform & Study Material",
  "Accommodation (if applicable)",
  "License & Documentation Charges",
];

const flyingExperienceList = [
  "Dual Flying",
  "Solo Flying",
  "Cross-Country Flying",
  "Instrument Flying",
  "Night Flying",
  "Emergency Procedures",
  "Aircraft Handling",
  "Radio Communication",
];

const careerOptionsList = [
  "Commercial Pilot",
  "Airline First Officer",
  "Airline Captain",
  "Charter Pilot",
  "Cargo Pilot",
  "Corporate Pilot",
  "Flight Instructor",
  "Ferry Pilot",
  "Aviation Safety Officer",
];

const salaryTable = [
  { position: "Student Pilot", salary: "Training Phase" },
  { position: "First Officer", salary: "₹12–20 LPA" },
  { position: "Senior First Officer", salary: "₹20–35 LPA" },
  { position: "Captain", salary: "₹50 LPA or Higher" },
  { position: "International Airline Pilot", salary: "Higher Salary + Benefits" },
];

const ourServicesList = [
  "Career Counselling",
  "Commercial Pilot Course Guidance",
  "Commercial Pilot Training Support",
  "Flying School Selection",
  "DGCA Ground Classes",
  "DGCA Medical Assistance",
  "Computer Number Registration",
  "Admission Guidance",
  "Documentation Support",
  "Career Planning",
];

const faqs = [
  {
    q: "What is a Commercial Pilot License?",
    a: "A Commercial Pilot License (CPL) is a professional license issued by the DGCA that allows pilots to fly aircraft for commercial operations after completing the required training, examinations, and flying hours.",
  },
  {
    q: "What is the commercial pilot eligibility?",
    a: "Candidates generally need:",
    list: ["10+2 with Physics & Mathematics", "DGCA Class 1 Medical", "Good English communication skills", "Completion of DGCA requirements"],
  },
  {
    q: "How long does a commercial pilot course take?",
    a: "A commercial pilot course generally takes 18–24 months, depending on the flying school, weather conditions, and the student's training progress.",
  },
  {
    q: "How many flying hours are required for a Commercial Pilot License?",
    a: "According to DGCA requirements, candidates must complete 200 flying hours to obtain a Commercial Pilot License.",
  },
  {
    q: "Can I join pilot training after 12th?",
    a: "Yes. Students who have completed 10+2 with Physics and Mathematics can begin their journey toward becoming a commercial pilot after meeting the required DGCA eligibility criteria.",
  },
  {
    q: "Is pilot training in India a good career choice?",
    a: "Yes. The aviation industry is expanding, creating increasing demand for qualified commercial pilots. Professional pilot training in India offers strong career prospects, competitive salaries, and opportunities with domestic and international airlines.",
  },
];

const relatedPrograms = [
  "Pilot Training",
  "DGCA Ground Classes",
  "DGCA Medical",
  "DGCA Computer Number",
  "eGCA Registration",
  "Type Rating",
  "Pilot Training in Delhi",
  "Pilot Training in India",
  "Commercial Pilot Course",
  "Flight Training",
];

const quickFacts = [
  { val: "18–24 months", label: "Course Duration" },
  { val: "200 hours", label: "Min Flying Hours" },
  { val: "10+2 PCM", label: "Eligibility" },
  { val: "Class 1", label: "DGCA Medical" },
];

export default function CPL() {
  const [openPhase, setOpenPhase] = useState(null);

  return (
    <>
      <Head>
        <title>Commercial Pilot License (CPL) Course in India | WeOne Aviation</title>
      </Head>

      <Layout title="Commercial Pilot License (CPL) Course in India | WeOne Aviation" description="Complete guide to CPL training, eligibility, fees, and pilot career paths with We One Aviation Academy.">
        <div className="bg-gray-50 min-h-screen">

        {/* ── HEADER ── */}
        <header className="bg-gradient-to-br from-av-blue to-av-navy text-white text-center relative overflow-hidden"
          style={{ paddingTop: "144px", paddingBottom: "30px" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full border-2 border-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full border-2 border-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="section-tag mb-3">Complete Guide</div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Commercial Pilot License (CPL) in India
              <br />
              <span className="text-av-orange">Complete Guide to Becoming a Commercial Pilot</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-3">
              A Commercial Pilot License (CPL) is the qualification required to fly aircraft professionally and build a successful career in aviation. At We One Aviation, we provide complete guidance for aspiring pilots, from DGCA counselling and ground classes to flying school selection and flight training. Whether you are planning to join a commercial pilot course, looking for commercial pilot training, or searching for the best pilot course after 12th, our experts are here to guide you at every stage.
            </p>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              With over a decade of aviation counselling experience, We One Aviation helps students understand the complete CPL journey, including eligibility, DGCA exams, medical requirements, flying hours, and career opportunities. Our goal is to simplify the process so you can focus on achieving your dream of becoming a commercial pilot.
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

        {/* ── WHAT IS CPL ── */}
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Quick Answer</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">What is a Commercial Pilot License?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 leading-relaxed text-sm">
                A Commercial Pilot License (CPL) is a professional license issued by the Directorate General of Civil Aviation (DGCA) that allows pilots to fly aircraft for commercial purposes. To obtain a Commercial Pilot License in India, candidates must complete DGCA ground classes, clear the required examinations, pass DGCA medical assessments, and complete a minimum of 200 flying hours at a DGCA-approved flying school.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── WHY CHOOSE A COMMERCIAL PILOT COURSE ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Why This Course</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Why Choose a Commercial Pilot Course?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The aviation industry is expanding rapidly, creating increasing demand for trained commercial pilots. A commercial pilot course equips students with aviation theory, flight operations knowledge, simulator experience, and practical flying skills required by airlines.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">By enrolling in a structured commercial pilot training program, students gain:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {whyChooseCourseList.map((b, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-av-blue font-semibold text-center card-hover hover:border-av-orange/30 transition-all">
                  ✅ {b}
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether your goal is to work for domestic airlines or international carriers, earning a CPL is the first major milestone in your aviation career.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── ELIGIBILITY ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Eligibility</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Eligibility</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">Understanding commercial pilot eligibility is the first step before applying for a CPL course.</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eligibilityItems.map((item, i) => (
                <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                  <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <div className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.label}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRAINING PROCESS ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Process</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Training Process</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Obtaining a Commercial Pilot License involves several important stages. At We One Aviation, we guide students through every step to ensure a smooth and well-planned learning experience.
              </p>
            </AutoInternalLinks>
            <div className="space-y-3">
              {processSteps.map((step, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <button
                    onClick={() => setOpenPhase(openPhase === i ? null : i)}
                    className="w-full bg-av-blue text-white px-6 py-4 flex justify-between items-center hover:bg-av-navy transition-all"
                  >
                    <span className="font-montserrat font-bold text-sm">{step.phase}</span>
                    <span className="text-white/60 text-sm">{openPhase === i ? "▲" : "▼"}</span>
                  </button>
                  {openPhase === i && (
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.desc}</p>
                      {step.topics && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                          {step.topics.map((t, j) => (
                            <div key={j} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-av-orange mt-0.5">▸</span> {t}
                            </div>
                          ))}
                        </div>
                      )}
                      {step.note && <p className="text-gray-600 text-sm leading-relaxed">{step.note}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PILOT TRAINING IN INDIA ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Training in India</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Pilot Training in India</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                India has become one of the fastest-growing aviation markets, increasing the demand for qualified pilots. Professional pilot training in India combines classroom learning with practical flight experience, ensuring students are prepared for airline careers.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">At We One Aviation, students receive guidance for:</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {pilotTrainingIndiaList.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                Our experienced aviation mentors help students choose the right training pathway based on their career goals and budget.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── PILOT TRAINING IN DELHI ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Training in Delhi</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Pilot Training in Delhi</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                Students searching for pilot training in Delhi can benefit from personalized aviation counselling at We One Aviation. Our team helps aspiring pilots compare flying schools, understand DGCA procedures, prepare documentation, and confidently begin their Commercial Pilot License journey.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Whether you plan to complete your flight training in India or abroad, we provide expert guidance to help you make informed decisions.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── WHY CHOOSE WE ONE AVIATION ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Why We One Aviation</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Why Choose We One Aviation?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Choosing the right aviation mentor is just as important as choosing the right flying school.
              </p>
              <h3 className="font-montserrat font-bold text-av-blue mb-4">What Makes We One Aviation Different?</h3>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {whatMakesUsDifferent.map((b, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-av-blue font-semibold text-center card-hover hover:border-av-orange/30 transition-all">
                  ✅ {b}
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                At We One Aviation, we don't just help students enroll in a pilot course—we help them build a successful aviation career with confidence, clarity, and professional support.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── COURSE DURATION ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Duration</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License Course Duration</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                The duration of a Commercial Pilot License (CPL) course generally ranges from 18 to 24 months. The exact timeline depends on factors such as weather conditions, aircraft availability, training schedules, and the student's progress.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">A typical CPL journey includes:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {cplJourneyList.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                With proper planning and continuous training, students can complete the course efficiently and prepare for airline recruitment.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── COURSE FEES ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Investment</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Course Fees</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                The cost of a commercial pilot course varies depending on the flying school, aircraft type, location, and additional training requirements. Besides tuition fees, students should also consider expenses such as:
              </p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {feeConsiderations.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3 items-center">
                  <span className="text-av-blue font-black text-lg flex-shrink-0">✓</span>
                  <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                At We One Aviation, our aviation experts provide transparent counselling on the complete fee structure and help students choose a training program that aligns with their career goals and budget.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── FLYING TRAINING & 200 HOURS ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Flight Training</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Flying Training &amp; 200 Flying Hours</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Practical flying training is one of the most important parts of earning a Commercial Pilot License. Students train on DGCA-approved aircraft under the supervision of certified flight instructors.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">During training, students gain experience in:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {flyingExperienceList.map((item, i) => (
                <div key={i} className="bg-blue-50 rounded-xl border border-gray-100 p-4 text-center">
                  <span className="text-gray-600 text-sm leading-relaxed font-semibold text-av-blue">{item}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                To qualify for a Commercial Pilot License, candidates must successfully complete a minimum of 200 flying hours as prescribed by DGCA regulations.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── CAREER OPPORTUNITIES ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Career Paths</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Career Opportunities After Commercial Pilot Training</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                After completing commercial pilot training, graduates can explore a wide range of career opportunities in the aviation industry.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">Career options include:</p>
            </AutoInternalLinks>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {careerOptionsList.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3 items-center card-hover hover:border-av-orange/30 transition-all">
                  <span className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</span>
                  <span className="font-montserrat font-bold text-av-blue text-sm">{c}</span>
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                With India's aviation industry expanding rapidly, airlines continue to recruit skilled pilots, making aviation one of the most rewarding career choices.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── SALARY ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Earnings</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License Salary</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                One of the biggest reasons students choose a commercial pilot course is the attractive salary and career growth.
              </p>
            </AutoInternalLinks>
            <h3 className="font-montserrat font-bold text-av-blue mb-3">Average Commercial Pilot License Salary</h3>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th className="px-5 py-3 text-left font-bold">Position</th>
                    <th className="px-5 py-3 text-left font-bold whitespace-nowrap">Estimated Annual Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-3 text-gray-600">{row.position}</td>
                      <td className="px-5 py-3 text-av-orange font-semibold whitespace-nowrap">{row.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                The commercial pilot license salary depends on the airline, experience, aircraft type, and flying hours. As pilots gain experience, they often receive additional allowances, travel benefits, and career advancement opportunities.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── WHY CHOOSE US FOR TRAINING / OUR SERVICES ── */}
        <section className="py-10 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Our Services</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">Why Choose We One Aviation for Commercial Pilot Training?</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-3xl">
                At We One Aviation, we understand that becoming a commercial pilot is a significant investment in your future. Our experienced aviation counsellors provide reliable guidance and personalized support to help students confidently begin their journey.
              </p>
            </AutoInternalLinks>
            <h3 className="font-montserrat font-bold text-white mb-4">Our Services</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {ourServicesList.map((s, i) => (
                <div key={i} className="glass rounded-xl p-4 flex gap-3 items-start text-sm text-white/60">
                  <span className="text-av-orange font-bold flex-shrink-0">–</span> {s}
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-white/70 text-sm leading-relaxed max-w-3xl">
                Our commitment is to simplify every stage of the pilot training process and help students make informed decisions based on their career goals.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-10 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">FAQs</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <button
                    onClick={() => setOpenPhase(openPhase === `faq-${i}` ? null : `faq-${i}`)}
                    className="w-full bg-gray-50 text-av-blue px-6 py-4 flex justify-between items-center hover:bg-blue-50 transition-all"
                  >
                    <span className="font-montserrat font-bold text-sm text-left">{f.q}</span>
                    <span className="text-av-blue/60 text-sm flex-shrink-0 ml-3">{openPhase === `faq-${i}` ? "▲" : "▼"}</span>
                  </button>
                  {openPhase === `faq-${i}` && (
                    <div className="px-6 py-4 bg-white">
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">{f.a}</p>
                      {f.list && (
                        <div className="grid sm:grid-cols-2 gap-2">
                          {f.list.map((li, j) => (
                            <div key={j} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-av-orange mt-0.5">▸</span> {li}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RELATED PROGRAMS ── */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Explore More</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Related Pilot Training Programs</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">You may also be interested in:</p>
            </AutoInternalLinks>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {relatedPrograms.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-av-blue font-semibold text-center card-hover hover:border-av-orange/30 transition-all">
                  {item}
                </div>
              ))}
            </div>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-gray-600 text-sm leading-relaxed">
                These resources provide detailed information to help you understand every stage of becoming a professional pilot.
              </p>
            </AutoInternalLinks>
          </div>
        </section>

        {/* ── CONCLUSION / CTA ── */}
        <section className="py-10 px-4 bg-gradient-to-br from-av-blue to-av-navy">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">Start Your Commercial Pilot Journey Today</h2>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto mb-4">
                Choosing the right Commercial Pilot License program is the first step toward a successful aviation career. Whether you are searching for a commercial pilot course, commercial pilot training, pilot training in India, or pilot training in Delhi, We One Aviation is here to guide you from your first counselling session to your CPL and beyond.
              </p>
              <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
                Our experienced aviation experts provide complete support for commercial pilot eligibility, DGCA procedures, flying school selection, and career planning, ensuring you have the confidence to achieve your dream of becoming a commercial pilot.
              </p>
            </AutoInternalLinks>
            <h3 className="font-montserrat text-xl font-bold text-white mb-3">Ready to Take Off?</h3>
            <AutoInternalLinks currentPath="/commercial-pilot-license">
              <p className="text-white/60 text-sm leading-relaxed max-w-3xl mx-auto mb-6 font-semibold">
                Book your FREE career counselling session today and let We One Aviation help you choose the right pilot course, understand the Commercial Pilot License process, and begin your journey toward an exciting career in aviation.
              </p>
            </AutoInternalLinks>
            <a href="/contact"
              className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm shadow-lg">
              Get Free Counselling →
            </a>
          </div>
        </section>

      </div>

      </Layout>
    </>
  );
}