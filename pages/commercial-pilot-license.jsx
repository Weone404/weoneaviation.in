import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const syllabus = [
  {
    phase: "Phase 1: Ground School",
    duration: "3–4 months",
    topics: ["Air Navigation", "Meteorology", "Air Regulations", "Technical General", "RTR (Radio Telephony)", "Aviation Medicine"],
  },
  {
    phase: "Phase 2: PPL Training",
    duration: "4–5 months",
    topics: ["Solo flights", "Cross-country flying", "Night flying", "Basic instrument flying", "Emergency procedures", "PPL skill test"],
  },
  {
    phase: "Phase 3: CPL Flying",
    duration: "8–10 months",
    topics: ["Instrument Rating (IR)", "Multi-engine rating", "Advanced navigation", "CPL skill test", "Type rating prep", "Airline interview prep"],
  },
];

const medicalChecks = [
  { icon: "👁️", title: "Vision Test", desc: "Checks distant and near vision (should be 6/6 with or without correction). Color blindness test using the Ishihara test." },
  { icon: "🎧", title: "Hearing Test", desc: "Assesses hearing ability using Pure Tone Audiometry (PTA)." },
  { icon: "❤️", title: "Cardiovascular Examination", desc: "ECG (Electrocardiogram) to check heart function. Blood pressure monitoring." },
  { icon: "🧠", title: "Neurological Examination", desc: "Evaluates reflexes, balance, and coordination. MRI or CT scan if necessary." },
  { icon: "🩺", title: "General Physical Check-up", desc: "Height, weight, and BMI assessment. Examination of lungs, liver, kidney, and other vital organs." },
  { icon: "🩸", title: "Blood & Urine Tests", desc: "Checks for diabetes, cholesterol, liver/kidney function, and infections." },
  { icon: "🧘", title: "Psychological & Mental Health Assessment", desc: "Evaluates stress management and mental well-being." },
];

const feeTable = [
  { num: 1, category: "DGCA Class 2 Medical Test", cost: "₹3,000 – ₹6,000" },
  { num: 2, category: "DGCA Class 1 Medical Test", cost: "₹5,000 – ₹10,000" },
  { num: 3, category: "Computer Number Registration", cost: "₹2,000 – ₹2,500" },
  { num: 4, category: "DGCA Exam Fees (per paper)", cost: "₹2,500 – ₹3,000" },
  { num: 5, category: "CPL Ground School Fees", cost: "₹1,50,000 – ₹3,00,000" },
  { num: 6, category: "Flying Training (200 hours)", cost: "₹35,00,000 – ₹45,00,000" },
  { num: 7, category: "Simulator Training", cost: "₹2,00,000 – ₹5,00,000" },
  { num: 8, category: "Flight School Admission Fees", cost: "₹1,00,000 – ₹2,00,000" },
  { num: 9, category: "License Issuance & Other DGCA Fees", cost: "₹50,000 – ₹1,00,000" },
  { num: 10, category: "Visa & Travel (If Training Abroad)", cost: "₹2,00,000 – ₹5,00,000" },
];

const salaryData = [
  {
    level: "Starting Salary (Beginners)",
    range: "₹1.5 – 3 Lakh/month",
    annual: "₹18 – 36 Lakh/year",
    desc: "New pilots (called First Officers or Junior Pilots) can make around ₹1.5 lakh to ₹3 lakh per month. That's about ₹18 lakh to ₹36 lakh per year.",
  },
  {
    level: "Mid-Level Salary (With Some Experience)",
    range: "₹5 – 10 Lakh/month",
    annual: "₹60 Lakh – 1.2 Crore/year",
    desc: "After a few years of flying—say 4 to 10 years—your salary goes up. You might become a Senior First Officer or even a Captain. At this stage, pilots in India can earn between ₹5 lakh to ₹10 lakh per month.",
  },
  {
    level: "Top-Level Salary (Senior Pilots)",
    range: "₹12 – 25 Lakh/month",
    annual: "₹1.5 Crore – 3 Crore/year",
    desc: "Senior Captains flying big planes can earn ₹12 lakh to ₹25 lakh per month—or even more! With experience, pilots can become captains and earn even higher salaries.",
  },
];

const careerOptions = [
  { num: "1", title: "Airline Pilot", icon: "✈️", what: "Fly big planes like Airbus or Boeing, taking people to their destinations safely.", where: "Airlines like IndiGo, Air India, SpiceJet, Vistara, or international ones if you gain more experience.", salary: "Beginners earn ₹1.5 lakh to ₹3 lakh per month. Senior pilots can make ₹10 lakh or more monthly." },
  { num: "2", title: "Cargo Pilot", icon: "📦", what: "Fly cargo planes for companies that deliver items across India or globally.", where: "Companies like Blue Dart Aviation, Amazon Air, or logistics firms like FedEx and DHL.", salary: "Similar to airline pilots—₹2 lakh to ₹5 lakh per month to start, growing with experience." },
  { num: "3", title: "Charter Pilot", icon: "🛩️", what: "Fly smaller planes to places that big airlines don't go, like hill stations or private airstrips.", where: "Private aviation companies, rich clients, or tourism agencies.", salary: "₹1 lakh to ₹4 lakh per month, depending on demand and hours flown." },
  { num: "4", title: "Flight Instructor", icon: "🎓", what: "Teach students how to fly planes and help them get their own CPL.", where: "Flight schools like IGRUA, Bombay Flying Club, or private academies.", salary: "₹1 lakh to ₹3 lakh per month, plus extra hours can boost your income." },
  { num: "5", title: "Corporate Pilot", icon: "💼", what: "Fly private jets or small planes for business leaders.", where: "Large Indian companies like Reliance, Tata, or multinational firms.", salary: "₹2 lakh to ₹6 lakh per month, depending on the company." },
  { num: "6", title: "Agricultural Pilot", icon: "🌾", what: "Fly small planes to spray crops with water, fertilizers, or pesticides.", where: "Rural areas or companies that support farmers.", salary: "₹1 lakh to ₹2.5 lakh per month." },
  { num: "7", title: "Aerial Survey Pilot", icon: "🛰️", what: "Fly over areas to collect data for maps, construction, or research.", where: "Government projects, survey companies, or environmental groups.", salary: "₹1.5 lakh to ₹4 lakh per month." },
  { num: "8", title: "Emergency Services Pilot (Air Ambulance)", icon: "🚑", what: "Transport sick or injured people to hospitals quickly.", where: "Hospitals, NGOs, or private ambulance services.", salary: "₹2 lakh to ₹5 lakh per month." },
];

const howToGet = [
  { title: "Choose a Right Ground Classes", desc: "At first, you have to choose a right ground classes like One Aviation Academy which gives you advance pilot training and support you till you will not make Commercial Air Pilot." },
  { title: "Prepare For DGCA Exam", desc: "After taking admission in DGCA Ground Classes, you have to prepare yourself for DGCA Exam for Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific and Radio Telephony (RTR)." },
  { title: "Join Flight Training Academy", desc: "After clearing DGCA Exam, you have to join flight training and complete 200 hrs of flying from any flying schools." },
];

const quickFacts = [
  { val: "18–24 months", label: "Duration" },
  { val: "200 hours", label: "Min Flight Hours" },
  { val: "10+2 PCM", label: "Eligibility" },
  { val: "₹40–50 Lakh", label: "Estimated Fees" },
];

export default function CPL() {
  const [openPhase, setOpenPhase] = useState(null);

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">

        {/* ── HEADER ── */}
        <header className="bg-gradient-to-br from-av-blue to-av-navy text-white text-center relative overflow-hidden"
          style={{ paddingTop: "144px", paddingBottom: "64px" }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full border-2 border-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full border-2 border-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="section-tag mb-3">Complete Guide</div>
            <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Commercial Pilot License (CPL)
              <br />
              <span className="text-av-orange">Complete Guide to Pilot Course, Fees, Eligibility & Salary</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Becoming a commercial pilot is one of the most prestigious and rewarding careers in aviation. If you dream of flying high and earning a great salary, enrolling in a pilot course is the first step. A Commercial Pilot License (CPL) allows you to fly aircraft professionally and work with airlines, charter companies, and cargo operators.
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
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Overview</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">What is a Commercial Pilot License?</h2>
            <p className="text-gray-600 leading-relaxed mb-3 text-sm">
              A commercial pilot license is a certification issued by the Directorate General of Civil Aviation (DGCA) in India that allows you to work as a professional pilot. Without a CPL license, you cannot earn money as a pilot.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              A CPL pilot is trained to operate aircraft safely and efficiently, making this career both challenging and rewarding. The commercial pilot course includes both theoretical and practical training, ensuring candidates gain complete aviation knowledge.
            </p>
            <h3 className="font-montserrat font-bold text-av-blue mb-2">Commercial Pilot Course Overview</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              The commercial pilot course is designed to provide in-depth knowledge of flying and aviation systems. The CPL course typically includes: Ground school training, Simulator training, Flying training (minimum 200 hours), and DGCA exams. The duration of commercial pilot training is usually <strong>18 to 24 months</strong>, depending on the training institute and student progress.
            </p>
          </div>
        </section>

        {/* ── REQUIREMENTS ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Requirements</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Requirements to Become a Pilot</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">Understanding the requirements to become a pilot is essential before starting your journey. Here are the basic commercial pilot requirements:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: "1. Educational Qualifications", desc: "10+2 with Physics and Mathematics. Minimum 50% marks. This is part of the pilot education requirements." },
                { label: "2. Age Limit", desc: "Minimum age: 18 years." },
                { label: "3. Medical Fitness", desc: "DGCA Class 1 medical certificate required." },
                { label: "4. Flying Experience", desc: "Minimum 200 flying hours required." },
              ].map((item, i) => (
                <div key={i} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                  <span className="text-av-blue font-black text-lg flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <div className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.label}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">These criteria define the qualifications to become a pilot and ensure that candidates meet aviation standards.</p>
            <h3 className="font-montserrat font-bold text-av-blue mb-2">Commercial Pilot Eligibility</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">The commercial pilot eligibility criteria include: Strong communication skills, Good eyesight and physical fitness, Basic knowledge of Physics and Mathematics, and English proficiency. These are also considered the eligibility to become a pilot and are essential for a successful aviation career.</p>
            <h3 className="font-montserrat font-bold text-av-blue mb-2">Qualifications for Commercial Pilot</h3>
            <p className="text-gray-600 text-sm leading-relaxed">The qualifications for commercial pilot go beyond academics. You must have: Analytical thinking, Decision-making skills, Ability to handle pressure, and Technical understanding of aircraft. Meeting these commercial pilot requirements ensures you are ready for real-world flying conditions.</p>
          </div>
        </section>

        {/* ── SYLLABUS ── */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Curriculum</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Pilot Syllabus & CPL Exam Syllabus</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              CPL ground classes are the foundation of your pilot training. These classes prepare you for DGCA exams and include subjects like: Air Navigation, Meteorology, Air Regulations, Technical General, and Technical Specific. Ground training usually lasts <strong>4–6 months</strong> and is a crucial part of the pilot syllabus.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              The pilot syllabus is divided into theoretical and practical training. The CPL exam syllabus includes: Air Navigation, Aviation Meteorology, Air Regulations, Technical General, Technical Specific, and Radio Telephony (RTR). These subjects are mandatory to pass DGCA exams and become a licensed pilot.
            </p>
            <div className="space-y-3">
              {syllabus.map((phase, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <button
                    onClick={() => setOpenPhase(openPhase === i ? null : i)}
                    className="w-full bg-av-blue text-white px-6 py-4 flex justify-between items-center hover:bg-av-navy transition-all"
                  >
                    <span className="font-montserrat font-bold text-sm">{phase.phase}</span>
                    <span className="flex items-center gap-3">
                      <span className="text-av-orange text-xs font-semibold">{phase.duration}</span>
                      <span className="text-white/60 text-sm">{openPhase === i ? "▲" : "▼"}</span>
                    </span>
                  </button>
                  {openPhase === i && (
                    <div className="px-6 py-4 bg-white grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {phase.topics.map((t, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-av-orange mt-0.5">▸</span> {t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ADMISSION ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Admission</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Entrance Exam for Commercial Pilot</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Many institutes conduct an entrance exam for commercial pilot admission. The CPL entrance exam generally includes: Physics, Mathematics, English, and General aptitude. Some flying schools also conduct: Pilot aptitude tests, Personal interviews, and Medical tests. This is part of the Commercial Pilot License Admission Process.
            </p>
            <h3 className="font-montserrat font-bold text-av-blue mb-3">Commercial Pilot License Admission Process</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">The Commercial Pilot License Admission Process involves multiple steps:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {[
                "Choose a DGCA-approved flying school",
                "Clear the entrance exam or screening",
                "Complete medical tests",
                "Enroll in CPL ground classes",
                "Start flying training",
                "Pass DGCA exams",
                "Complete 200 flying hours",
                "Apply for CPL license",
              ].map((step, i) => (
                <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4 flex gap-3 items-start">
                  <div className="flex-shrink-0 w-7 h-7 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-xs">{i + 1}</div>
                  <span className="text-gray-600 text-sm leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">This structured process ensures proper pilot training and certification.</p>
            <h3 className="font-montserrat font-bold text-av-blue mb-2">Commercial Pilot Training in India</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Commercial pilot training in India is regulated by DGCA and follows strict guidelines. Training includes: Ground classes, Simulator sessions, Solo and cross-country flying, Night flying, and Instrument flying. India has many DGCA-approved academies offering world-class pilot course programs.
            </p>
          </div>
        </section>

        {/* ── CPL FEES ── */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Investment</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot Course (CPL) Fees in India</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Cost to become a pilot in India depends on flying schools from where you will do flying. The total cost of commercial pilot training in India ranges between <strong>₹35 lakh to ₹55 lakh</strong> (approx.). This includes: Flying hours, Ground classes, Simulator training, and Examination fees. The cost may vary depending on the academy and location.
            </p>

            <h3 className="font-montserrat font-bold text-av-blue mb-2">1) DGCA Class 1-2 Medical Test</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              At first you have to clear DGCA Class 1-2 Medical from any DGCA Medical Doctor. Doctors check the candidate's health to ensure they meet the physical and mental fitness standards required for flying.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {medicalChecks.map((check, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-3">
                  <span className="text-2xl flex-shrink-0">{check.icon}</span>
                  <div>
                    <div className="font-montserrat font-bold text-av-blue text-xs mb-1">{check.title}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{check.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 text-sm text-gray-700 mb-8">
              💰 <strong className="text-av-blue">DGCA Medical Fees (Approximate):</strong> Class 1 Medical: ₹5,000 – ₹10,000 &nbsp;|&nbsp; Class 2 Medical: ₹3,000 – ₹6,000
            </div>

            <h3 className="font-montserrat font-bold text-av-blue mb-2">2) DGCA CPL Exams and Fees</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              You have to give 6 papers of the DGCA Exam. There are two processes: <strong>Regular Exam</strong> (4 times a year) and <strong>On-Demand Exam</strong> (flexible, as per candidate's choice). Regular DGCA Exam fees: ₹2,500/subject · On-Demand DGCA Exam fees: ₹5,000/paper.
            </p>

            <h3 className="font-montserrat font-bold text-av-blue mb-2">3) DGCA Ground Classes</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              The right ground classes help you crack the DGCA Exam quickly with proper guidance. Average fees of DGCA Ground Classes: <strong>₹2.5 Lakh</strong>.
            </p>

            <h3 className="font-montserrat font-bold text-av-blue mb-2">4) Flying Training Duration and Fees</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              The CPL course takes around 8–10 months to complete. It includes 80 hours of classroom sessions and 200 hours of training, covering Simulator Training and Flying Training. Most flying schools charge on an hourly basis. Candidates must have around <strong>₹40 lakh</strong> ready for flying before joining a flight school.
            </p>

            <p className="font-montserrat font-bold text-av-blue text-sm mb-3">CPL Course Fees Breakdown (India):</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-av-blue text-white">
                    <th className="px-5 py-3 text-left font-bold w-10">#</th>
                    <th className="px-5 py-3 text-left font-bold">Expense Category</th>
                    <th className="px-5 py-3 text-left font-bold whitespace-nowrap">Approx Cost (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  {feeTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-5 py-3 text-gray-400">{row.num}</td>
                      <td className="px-5 py-3 text-gray-600">{row.category}</td>
                      <td className="px-5 py-3 text-av-orange font-semibold whitespace-nowrap">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-av-blue">
                    <td colSpan={2} className="px-5 py-3 text-white font-bold">Total Estimated CPL Fees in India</td>
                    <td className="px-5 py-3 text-av-orange font-black whitespace-nowrap">₹40L – ₹50L</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">* May vary depending on the flight school and location.</p>
          </div>
        </section>

        {/* ── HOW TO GET CPL ── */}
        <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Process</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-6">How to Get a Commercial Pilot License in India</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {howToGet.map((item, i) => (
                <div key={i} className="glass rounded-2xl p-6 flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 bg-av-orange rounded-full flex items-center justify-center text-white font-black">{i + 1}</div>
                  <div>
                    <div className="font-montserrat font-bold text-white text-sm mb-2">{item.title}</div>
                    <div className="text-white/70 text-xs leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="font-montserrat font-bold text-white mb-3">Preparation Tips For DGCA Exam</h3>
            <div className="space-y-3">
              {[
                "Attend ground classes regularly and use DGCA-approved study materials (e.g., books by authors like R.K. Bali or Oxford Aviation Academy manuals).",
                "Practice with past question papers and mock tests.",
                "Focus on understanding concepts rather than rote memorization, as questions can be application-based.",
              ].map((tip, i) => (
                <div key={i} className="glass rounded-xl p-4 flex gap-3 items-start text-sm text-white/80">
                  <span className="text-av-orange font-bold flex-shrink-0">–</span> {tip}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SALARY ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Earnings</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Commercial Pilot License Salary</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              One of the biggest attractions of this career is the commercial pilot license salary. Commercial pilot starting pay: ₹1.5 lakh to ₹3 lakh per month. The aviation industry offers excellent growth, making it a highly rewarding profession.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {salaryData.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover">
                  <div className="bg-av-blue px-5 py-4">
                    <div className="font-montserrat font-bold text-white text-sm mb-1">{s.level}</div>
                    <div className="text-av-orange font-black text-base">{s.range}</div>
                  </div>
                  <div className="px-5 py-4">
                    <div className="text-av-blue font-semibold text-xs mb-2">{s.annual}</div>
                    <div className="text-gray-500 text-xs leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="font-montserrat font-bold text-av-blue mb-3">Extra Benefits Pilots Get</h3>
            <p className="text-gray-600 text-sm mb-4">Besides the salary, pilots get some cool perks:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "✈️", text: "Free or cheap flights for themselves and their families" },
                { icon: "🏥", text: "Health insurance and retirement plans" },
                { icon: "🏨", text: "Hotel stays and travel allowances when they fly to other places" },
                { icon: "🌍", text: "A fancy uniform and a job that feels adventurous!" },
              ].map((perk, i) => (
                <div key={i} className="bg-blue-50 rounded-xl p-4 flex gap-3 items-start">
                  <span className="text-xl">{perk.icon}</span>
                  <span className="text-gray-600 text-xs leading-relaxed">{perk.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CPL ── */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Why CPL</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Why Choose a CPL Course?</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">Choosing a CPL course offers multiple benefits:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {["High-paying career", "Global job opportunities", "Prestige and respect", "Exciting lifestyle"].map((b, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 text-sm text-av-blue font-semibold text-center card-hover hover:border-av-orange/30 transition-all">
                  ✅ {b}
                </div>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">A commercial pilot course opens doors to airlines, cargo services, and private aviation.</p>
          </div>
        </section>

        {/* ── CAREER OPPORTUNITIES ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="section-tag mb-3">Career Paths</div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">Career Opportunities After CPL</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">After completing your commercial pilot training, you can work as:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerOptions.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 card-hover hover:border-av-orange/30 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{c.icon}</span>
                    <div className="font-montserrat font-bold text-av-blue text-sm">{c.num}. {c.title}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500 leading-relaxed"><span className="font-bold text-av-blue">What You Do: </span>{c.what}</div>
                    <div className="text-xs text-gray-500 leading-relaxed"><span className="font-bold text-av-blue">Where You Work: </span>{c.where}</div>
                    <div className="text-xs text-av-orange font-bold mt-2">Salary: {c.salary}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONCLUSION ── */}
        <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">Conclusion</h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-3xl mx-auto mb-6">
              The journey to becoming a commercial pilot requires dedication, investment, and proper training. By enrolling in a pilot course, meeting the commercial pilot eligibility, and completing the Commercial Pilot License Admission Process, you can achieve your dream of flying professionally. With high demand, excellent commercial pilot license salary, and global opportunities, pursuing a commercial pilot license is a smart career choice in today's aviation industry.
            </p>
            <a href="/contact"
              className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm shadow-lg">
              Get Free Counselling →
            </a>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}