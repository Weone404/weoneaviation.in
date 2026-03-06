import Layout from '../components/Layout';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─────────────────────────────────────────────
// CityPageTemplate
// Props:
//   meta        { title, description }
//   hero        { image, tag, title, sub }
//   intro       string – opening paragraph
//   features    [{ icon, title, desc }]
//   courses     [{ num, icon, title, desc, details:[{label,value}], href, highlight }]
//   eligibility [{ icon, title, desc }]
//   career      { intro, options:[{ icon, title, desc }] }
//   syllabus    [{ num, title, desc }]
//   fees        { total, breakdown:[{label,desc,amount}], whyChanges:[{title,desc}] }
//   howToChoose [{ icon, title, desc }]
//   whyWeOne    string[]
//   usaBenefits [{ icon, title, desc }]
//   usaReasons  [{ icon, title, desc }]
//   faqs        [{ q, a }]
//   city        string  e.g. "Hyderabad"
// ─────────────────────────────────────────────

export function CityPageTemplate({
    meta, hero, intro, features, courses, eligibility,
    career, syllabus, fees, howToChoose, whyWeOne,
    usaBenefits, usaReasons, faqs, city,
}) {
    return (
        <Layout title={meta.title} description={meta.description}>

            {/* ── HERO ── */}
            <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <img src={hero.image} alt={`Pilot Training in ${city}`} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-av-blue/70" />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <div className="section-tag mx-auto mb-4">{hero.tag}</div>
                    <h1 className="font-montserrat text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                        {hero.title}
                    </h1>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">{hero.sub}</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Contact Now →
                        </Link>
                        <Link href="#courses" className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            View Courses
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── INTRO ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">About Us</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4 underline-orange">
                            Pilot Training Institute in {city} – 2025
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">{intro}</p>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {['DGCA Approved', '3000+ Pilots Trained', '100% Placement', 'Scholarship Available'].map(tag => (
                                <span key={tag} className="bg-av-light text-av-blue text-xs font-semibold px-4 py-2 rounded-full border border-av-sky/20">✓ {tag}</span>
                            ))}
                        </div>
                        <Link href="/contact" className="inline-block bg-av-blue text-white px-7 py-3 rounded-full font-semibold hover:bg-av-orange transition-all text-sm">
                            Contact Now →
                        </Link>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <img src="/assets/GroundSchool.jpg" alt={`Pilot Training in ${city}`} className="w-full h-80 object-cover" />
                            </div>
                            <div className="absolute -bottom-5 -left-5 bg-av-orange rounded-xl p-4 shadow-xl">
                                <div className="font-montserrat text-white text-xl font-black">3000+</div>
                                <div className="text-white/80 text-xs">Pilots Trained</div>
                            </div>
                            <div className="absolute -top-5 -right-5 glass bg-av-blue rounded-xl p-4 shadow-xl border border-white/20">
                                <div className="font-montserrat text-av-orange text-xl font-black">DGCA</div>
                                <div className="text-white text-xs">Approved</div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── WHY CHOOSE US ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Why Choose Us</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Why Choose Our Pilot Training <span className="text-av-orange">Institute in {city}?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                            We Provide Premium Pilot Training With 100% Placement Assistance. We Have Trained Almost 3000+ Pilots In India.
                        </p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <ScrollReveal key={f.title} delay={i * 80}>
                                <div className="card-hover p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-av-orange/30 h-full">
                                    <div className="text-3xl mb-4">{f.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{f.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal className="text-center mt-10">
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">Contact Now</Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── COURSES ── */}
            <section id="courses" className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Our Programs</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Pilot Training Courses Offered in <span className="text-av-orange">{city}</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">We Offer All Types of Pilot Training Courses in {city}.</p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 gap-8">
                        {courses.map((course, i) => (
                            <ScrollReveal key={course.title} delay={i * 100}>
                                <div className={`rounded-2xl shadow-lg p-8 h-full flex flex-col transition-all ${course.highlight ? 'bg-av-blue' : 'bg-white border border-gray-100 hover:border-av-orange/40'}`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${course.highlight ? 'bg-av-orange text-white' : 'bg-av-blue text-white'}`}>{course.num}</div>
                                        <div className="text-3xl">{course.icon}</div>
                                    </div>
                                    <h3 className={`font-montserrat text-xl font-bold mb-3 ${course.highlight ? 'text-white' : 'text-av-blue'}`}>{course.title}</h3>
                                    <p className={`text-sm leading-relaxed mb-5 flex-grow ${course.highlight ? 'text-white/70' : 'text-gray-500'}`}>{course.desc}</p>
                                    <div className="space-y-2 mb-6">
                                        {course.details.map(d => (
                                            <div key={d.label} className="text-sm">
                                                <span className={`font-semibold ${course.highlight ? 'text-av-orange' : 'text-av-blue'}`}>{d.label}: </span>
                                                <span className={course.highlight ? 'text-white/80' : 'text-gray-600'}>{d.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Link href={course.href} className={`mt-auto inline-block text-center px-5 py-2 rounded-full text-sm font-semibold transition-all ${course.highlight ? 'bg-av-orange text-white hover:bg-white hover:text-av-blue' : 'bg-av-blue text-white hover:bg-av-orange'}`}>
                                        Learn More
                                    </Link>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ELIGIBILITY ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Eligibility</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Eligibility Criteria for <span className="text-av-orange">Pilot Training in {city}</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">Before enrolling, make sure you meet these basic requirements.</p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {eligibility.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:border-av-orange/30 card-hover h-full">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CAREER SCOPE ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Career Scope</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Scope of a Pilot Career <span className="text-av-orange">in {city}</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">{career.intro}</p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {career.options.map((c, i) => (
                            <ScrollReveal key={c.title} delay={i * 80}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:border-av-orange/30 card-hover h-full">
                                    <div className="text-4xl mb-3">{c.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{c.title}</h3>
                                    <p className="text-gray-400 text-xs leading-relaxed">{c.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CPL SYLLABUS ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Syllabus</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Commercial Pilot Syllabus <span className="text-av-orange">in {city}</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                            The Commercial Pilot syllabus includes 6 core DGCA subjects. Here's each one broken down simply:
                        </p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {syllabus.map((subject, i) => (
                            <ScrollReveal key={subject.title} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full flex flex-col">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-av-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{subject.num}</div>
                                        <h3 className="font-montserrat font-bold text-av-blue text-sm">{subject.title}</h3>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed flex-grow">{subject.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEES ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Course Fees</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Fees for Commercial Pilot Training <span className="text-av-orange">in {city}</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">
                            Average fees for CPL training in {city} is <span className="font-semibold text-av-blue">{fees.total}</span>. Here's what your training covers:
                        </p>
                    </ScrollReveal>
                    <div className="grid md:grid-cols-2 gap-8">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 h-full">
                                <h3 className="font-montserrat text-xl font-bold text-av-blue mb-6">Fee Breakdown</h3>
                                <div className="space-y-4">
                                    {fees.breakdown.map(item => (
                                        <div key={item.label} className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100 last:border-0">
                                            <div>
                                                <p className="font-semibold text-av-blue text-sm">{item.label}</p>
                                                <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                                            </div>
                                            <span className="text-av-orange font-bold text-sm whitespace-nowrap">{item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 bg-av-light rounded-xl p-4 text-center">
                                    <p className="text-av-blue font-semibold text-sm">Total Estimated Cost</p>
                                    <p className="font-montserrat text-2xl font-black text-av-orange mt-1">{fees.total}</p>
                                    <p className="text-gray-400 text-xs mt-1">Scholarship & Loan Available</p>
                                </div>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={150}>
                            <div className="bg-av-blue rounded-2xl shadow-lg p-8 h-full">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-6">Why Do CPL Fees Change?</h3>
                                <div className="space-y-4">
                                    {fees.whyChanges.map(item => (
                                        <div key={item.title} className="flex items-start gap-3">
                                            <span className="text-av-orange mt-1 flex-shrink-0">✦</span>
                                            <div>
                                                <p className="font-semibold text-white text-sm">{item.title}</p>
                                                <p className="text-white/60 text-xs mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/contact" className="mt-6 inline-block bg-av-orange text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-av-blue transition-all">
                                    Get Scholarship Details
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── HOW TO CHOOSE ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Selection Guide</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            How to Choose a <span className="text-av-orange">Pilot Training Institute in {city}?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm">Look at these key factors before taking admission.</p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {howToChoose.map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-av-orange/30 card-hover h-full text-center">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2">{item.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Why WeOne specifically */}
                    <ScrollReveal>
                        <div className="bg-av-blue rounded-2xl p-8">
                            <h3 className="font-montserrat text-2xl font-bold text-white text-center mb-8">
                                Why Choose <span className="text-av-orange">We One Aviation Academy in {city}?</span>
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                {whyWeOne.map(item => (
                                    <div key={item} className="flex items-start gap-2">
                                        <span className="text-av-orange flex-shrink-0 mt-0.5">✓</span>
                                        <span className="text-white/80 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/70 text-center text-sm mb-6">
                                We One Aviation is a Premier Aviation Academy which has trained 3000+ Pilots in India till 2025. We are the only institute who fulfils all your aviation needs under one roof.
                            </p>
                            <div className="text-center">
                                <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                                    Apply Now — Limited Seats!
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── USA TRAINING ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">International Training</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Pilot Training in {city} – <span className="text-av-orange">Your Fastest Route to an Airline Career! ✈️</span>
                        </h2>
                        <p className="text-white/70 mt-3 max-w-3xl mx-auto text-sm leading-relaxed">
                            Join We One Aviation and get extra benefits in flying. We train students from the U.S.A for flying. Explore all the benefits of doing your flight training through We One Aviation Academy.
                        </p>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {usaBenefits.map((b, i) => (
                            <ScrollReveal key={b.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 h-full">
                                    <div className="text-2xl mb-3">{b.icon}</div>
                                    <h4 className="font-montserrat font-bold text-white mb-2 text-sm">{b.title}</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">{b.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal className="text-center mb-8">
                        <h3 className="font-montserrat text-2xl font-bold text-white">
                            Why Do Flight Training <span className="text-av-orange">in the USA?</span>
                        </h3>
                    </ScrollReveal>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {usaReasons.map((r, i) => (
                            <ScrollReveal key={r.title} delay={i * 80}>
                                <div className="glass rounded-2xl p-6 text-center h-full">
                                    <div className="text-3xl mb-3">{r.icon}</div>
                                    <h4 className="font-montserrat font-bold text-white mb-2 text-sm">{r.title}</h4>
                                    <p className="text-white/70 text-sm leading-relaxed">{r.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal className="text-center">
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm">
                            Enquire About USA Training
                        </Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">FAQ</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            FAQ About Pilot Training <span className="text-av-orange">in {city}</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">Know Your Answers Here</p>
                    </ScrollReveal>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={faq.q} delay={i * 60}>
                                <details className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 group cursor-pointer">
                                    <summary className="font-montserrat font-bold text-av-blue text-sm list-none flex justify-between items-center">
                                        {faq.q}
                                        <span className="text-av-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">{faq.a}</p>
                                </details>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal className="text-center mt-8">
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">Ask Question</Link>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── LEAD FORM ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal>
                        <div className="section-tag">Free Counselling</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">
                            Start Your Aviation Journey <span className="text-av-orange">in {city}</span>
                        </h2>
                        <p className="text-white/70 mb-6 text-sm leading-relaxed">
                            Our aviation career counsellors will guide you through course selection, eligibility, fees, scholarships, and career prospects.
                        </p>
                        <div className="space-y-3">
                            {['Free one-on-one career counselling', 'DGCA exam preparation guidance', 'International training options', 'Scholarship & loan assistance'].map(item => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="text-av-orange">✓</span>
                                    <span className="text-white/80 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/20 space-y-2 text-sm text-white/70">
                            <p>📧 <span className="font-semibold text-white">Office Mail:</span> Weoneaviation8@gmail.com</p>
                            <p>📍 <span className="font-semibold text-white">Office Address:</span> C-404, 3rd floor, sector-7, near Ramphal Chowk Road, Palam Extension, Dwarka sector 7, Delhi, India 110077</p>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={200}>
                        <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                            <h3 className="font-montserrat font-bold text-white text-center mb-4">BOOK Your SEAT NOW</h3>
                            <p className="text-white/70 text-center text-sm mb-4">Join Pilot Training in {city}</p>
                            <LeadForm dark />
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}