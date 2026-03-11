import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';

// ─── Data ────────────────────────────────────────────────────────────────────

const stats = [
    { num: 'DGCA', label: 'Issuing Authority', icon: '🏛️' },
    { num: 'TCS', label: 'Developed By', icon: '💻' },
    { num: '100%', label: 'Online Process', icon: '🌐' },
    { num: 'Free', label: 'Registration', icon: '✅' },
];

const portalFeatures = [
    {
        icon: '🗂️',
        title: 'Centralized Digital Platform',
        desc: 'All the regulations, be it licensing, or pilot permitting; would all be available on a one-stop portal called the eGCA. This streamlines the DGCA interactions a lot with the aviation personnel.',
    },
    {
        icon: '🏛️',
        title: 'E-Governance Initiative',
        desc: 'The digital push for India, eGCA improves transparency, reduces processing time, and enhances both the safety and compliance of civil aviation.',
    },
    {
        icon: '🌐',
        title: 'Accessible Services',
        desc: 'This service provides services to pilots, maintenance engineers, air traffic controllers, and many more other aviation stakeholders. Processes are given online that were otherwise required to be approached physically.',
    },
];

const loginBenefits = [
    { icon: '✈️', role: 'Pilots', desc: 'Easily apply for licenses, log flight hours, and check medical assessment records.' },
    { icon: '🔧', role: 'Aircraft Maintenance Engineers (AMEs)', desc: 'Renew licenses, track their training progress, and submit applications.' },
    { icon: '🩺', role: 'Medical Examiners', desc: 'Manage medical certifications, record assessments, and ensure compliance.' },
    { icon: '🏫', role: 'Flight Training Organizations (FTOs)', desc: 'Monitor pilot training, manage certifications, and ensure accurate record-keeping.' },
];

const registrationSteps = [
    {
        num: '01',
        title: 'Visit the EGCA Website',
        desc: 'Go to the official EGCA website, which should have a "Login" or "Sign Up" option. Or You can Also Signup/Login from dgcaexam.com',
    },
    {
        num: '02',
        title: "Select 'Sign Up' or 'Register'",
        desc: "Look for the 'Sign Up' or 'Register' button if you're a new user. This will take you to a registration form.",
    },
    {
        num: '03',
        title: 'Fill Out the Registration Form',
        desc: 'Enter the required details: Full name, Email address, Contact number, Preferred username. Make sure all information is accurate to avoid issues later.',
    },
    {
        num: '04',
        title: 'Set a Strong Password',
        desc: 'Choose a password that includes a mix of letters, numbers, and symbols. This helps keep your EGCA account secure.',
    },
    {
        num: '05',
        title: 'Verify Your Email',
        desc: 'After registering, you may receive an email to verify your account. Click on the link in the email to confirm your email address.',
    },
    {
        num: '06',
        title: 'Login to Your EGCA Account',
        desc: 'Once verified, return to the EGCA website. Enter your username and password to log in and access EGCA services.',
    },
];

const dashboardFeatures = [
    { icon: '🪪', title: 'License Management', desc: 'Apply for new licenses or renew existing ones.' },
    { icon: '🩺', title: 'Medical Certificates', desc: 'Check medical assessment records and renew certifications.' },
    { icon: '📋', title: 'Training Records', desc: 'Log flight hours and view training history.' },
    { icon: '🔍', title: 'Application Tracking', desc: 'View real-time status updates on submitted applications.' },
    { icon: '🔔', title: 'Notifications', desc: 'Get alerts on license renewals, medical exams, and training requirements.' },
];

const loginTips = [
    { icon: '🔒', title: 'Use a Secure Device', desc: 'Always access your EGCA account from a secure device to keep your information safe.' },
    { icon: '📝', title: 'Remember Your Login Details', desc: 'Store your username and password securely to avoid login issues.' },
    { icon: '🔄', title: 'Update Password Regularly', desc: 'Change your password periodically to maintain the security of your account.' },
];

const commonIssues = [
    { icon: '🔑', issue: 'Forgotten Password', fix: 'Use the "Forgot Password" link to reset your password via email.' },
    { icon: '🔐', issue: 'Account Locked', fix: 'If your account is locked, contact EGCA support for assistance.' },
    { icon: '🌐', issue: 'Browser Compatibility Issues', fix: "Ensure you're using a compatible browser for a smooth login experience." },
];

const faqs = [
    {
        q: '1. What is EGCA Login?',
        a: 'EGCA login is the process of accessing the eGCA (e-Governance for Civil Aviation) portal developed by DGCA, India. It allows pilots, AMEs, air traffic controllers, and other aviation professionals to manage their licenses, applications, and certifications online.',
    },
    {
        q: '4. What should I do if I forget my EGCA password?',
        a: "Click on 'Forgot Password' on the login page → Enter your registered email ID → Follow the password reset instructions sent to your email.",
    },
];

const relatedBlogs = [
    { label: 'Commercial Pilot Salary', href: '/commercial-pilot-salary' },
    { label: 'Ultimate Guide to Pilot Training', href: '/ultimate-guide-to-pilot-training' },
    { label: 'Pilot Course Fees in India', href: '/pilot-course-fees-in-india' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function EGCALoginPage() {
    return (
        <Layout
            title="eGCA Login: Your Complete Guide – 2025 | DGCA Portal"
            description="Complete guide to eGCA login in 2025. Learn what the eGCA portal is, how to register, login steps, dashboard features, tips, and common issues for aviation professionals in India."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-20 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
                    <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white rounded-full" />
                </div>
                <ScrollReveal className="relative z-10">
                    <br />
                    <br />
                    <br />
                    <br />

                    <div className="section-tag">DGCA Digital Portal</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        eGCA Login: Your Complete Guide
                    </h1>
                    <p className="text-av-orange font-semibold text-lg mb-4">2025 Edition</p>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed">
                        The <strong className="text-white">eGCA (e-Governance for Civil Aviation)</strong> portal is an online system launched by India's Directorate General of Civil Aviation (DGCA) to digitally transform civil aviation services, making them more easy and efficient. Developed with support from <strong className="text-white">Tata Consultancy Services (TCS)</strong>, the eGCA platform replaces manual and paper-driven processes, helping DGCA manage services for pilots, air traffic controllers, engineers, and others in the aviation sector.
                    </p>
                </ScrollReveal>
            </div>

            {/* ── Stats Bar ── */}
            <div className="bg-av-blue py-8">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map(s => (
                        <ScrollReveal key={s.label} className="text-center">
                            <div className="text-3xl mb-1">{s.icon}</div>
                            <div className="font-montserrat text-xl font-black text-av-orange">{s.num}</div>
                            <div className="text-white/60 text-xs">{s.label}</div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* ── What is the eGCA Portal ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">About</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            What is the <span className="text-av-orange">eGCA Portal?</span>
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <ScrollReveal>
                            <div className="space-y-5">
                                {portalFeatures.map((item, i) => (
                                    <div key={item.title} className="flex items-start gap-4 p-5 bg-av-light rounded-2xl border border-av-sky/20 card-hover hover:border-av-orange/30">
                                        <span className="text-3xl flex-shrink-0">{item.icon}</span>
                                        <div>
                                            <h3 className="font-montserrat font-bold text-av-blue mb-1">{item.title}</h3>
                                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            {/* Portal screenshot / visual */}
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
                                    alt="eGCA digital portal dashboard"
                                    className="w-full h-72 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-av-blue/80 to-transparent flex items-end p-6">
                                    <div>
                                        <p className="text-av-orange font-bold font-montserrat">eGCA Portal</p>
                                        <p className="text-white text-sm">India's Civil Aviation Digital Hub</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── What is eGCA Login ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <ScrollReveal>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80"
                                    alt="Aviation professional logging into eGCA portal"
                                    className="w-full h-72 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-av-navy/70 to-transparent flex items-end p-6">
                                    <p className="text-white text-sm font-semibold">Secure Portal Access for Aviation Professionals</p>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="section-tag">eGCA Login</div>
                            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-4">
                                What is <span className="text-av-orange">eGCA Login?</span>
                            </h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                EGCA Login is the process of accessing the EGCA portal. It allows you to:
                            </p>
                            <ul className="space-y-3 mb-5">
                                {[
                                    'View relevant information, data, or reports.',
                                    'Utilize specific tools or applications provided by EGCA.',
                                    'Manage your profile, settings, and other user-specific details.',
                                ].map(item => (
                                    <li key={item} className="flex items-start gap-3 p-3 bg-av-light rounded-xl border border-av-sky/20 text-sm text-gray-600">
                                        <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span><span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Logging into eGCA provides a gateway to multiple essential services, allowing aviation professionals to manage their careers effectively.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Benefits for Different Users ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Benefits</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Benefits of eGCA Login for <span className="text-av-orange">Different Users</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">With eGCA login, aviation professionals have the convenience of managing critical tasks without physical visits to DGCA offices.</p>
                    </ScrollReveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loginBenefits.map((item, i) => (
                            <ScrollReveal key={item.role} delay={i * 80}>
                                <div className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-av-orange/30 h-full text-center">
                                    <div className="text-4xl mb-3">{item.icon}</div>
                                    <h3 className="font-montserrat font-bold text-av-blue mb-2 text-sm">{item.role}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Steps to Apply for EGCA Login ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Registration</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
                            Steps to Apply for <span className="text-av-orange">EGCA Login</span>
                        </h2>
                        <p className="text-white/60 mt-3 max-w-xl mx-auto text-sm">If you're new to EGCA and want to apply for login credentials, follow these steps:</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-start">
                        <ScrollReveal>
                            <div className="space-y-4">
                                {registrationSteps.map((step, i) => (
                                    <div key={step.num} className="flex items-start gap-4 glass rounded-xl p-5">
                                        <div className="w-10 h-10 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">{step.num}</div>
                                        <div>
                                            <h4 className="font-montserrat font-bold text-white text-sm mb-1">{step.title}</h4>
                                            <p className="text-white/70 text-xs leading-relaxed">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6">
                                <img
                                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
                                    alt="Registering on eGCA portal on laptop"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-av-navy/80 to-transparent flex items-end p-6">
                                    <p className="text-white text-sm font-semibold">Simple Online Registration Process</p>
                                </div>
                            </div>
                            <div className="glass rounded-2xl p-6 text-center">
                                <p className="text-white/80 text-sm mb-4">Ready to Register on eGCA?</p>
                                <a
                                    href="https://dgcaexam.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-av-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm"
                                >
                                    Register on eGCA →
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Key Features / Dashboard ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">Dashboard</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Key Features of the <span className="text-av-orange">eGCA Platform</span>
                        </h2>
                        <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">Once logged in, eGCA users can access various tools and services that streamline their professional tasks.</p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <ScrollReveal>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
                                    alt="eGCA dashboard features aviation"
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-av-blue/80 to-transparent flex items-end p-6">
                                    <div>
                                        <p className="text-av-orange font-bold font-montserrat">Dashboard Features</p>
                                        <p className="text-white/80 text-xs mt-1">All aviation services in one place</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="space-y-4">
                                {dashboardFeatures.map((item, i) => (
                                    <div key={item.title} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 card-hover hover:border-av-orange/30">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <div>
                                            <h4 className="font-montserrat font-bold text-av-blue text-sm mb-0.5">{item.title}</h4>
                                            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                                <p className="text-gray-400 text-xs pt-2 leading-relaxed">Each feature is designed to make regulatory processes quicker, more efficient, and fully accessible online.</p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── Tips & Common Issues ── */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Tips */}
                        <ScrollReveal>
                            <div className="section-tag">Tips</div>
                            <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-6">
                                Tips for a Successful <span className="text-av-orange">EGCA Login</span>
                            </h2>
                            <div className="space-y-4">
                                {loginTips.map(item => (
                                    <div key={item.title} className="flex items-start gap-4 p-5 bg-av-light rounded-xl border border-av-sky/20 card-hover hover:border-av-orange/30">
                                        <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                        <div>
                                            <h4 className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Common Issues */}
                        <ScrollReveal delay={150}>
                            <div className="section-tag">Troubleshooting</div>
                            <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-6">
                                Common Issues &amp; <span className="text-av-orange">How to Fix Them</span>
                            </h2>
                            <div className="space-y-4">
                                {commonIssues.map(item => (
                                    <div key={item.issue} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 card-hover hover:border-av-orange/30">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">{item.icon}</span>
                                            <h4 className="font-montserrat font-bold text-av-blue text-sm">{item.issue}</h4>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed">{item.fix}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* ── FAQs ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal className="text-center mb-12">
                        <div className="section-tag">FAQs</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
                            Frequently Asked Questions About <span className="text-av-orange">EGCA Login</span> – 2025
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-5">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={faq.q} delay={i * 100}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h4 className="font-montserrat font-bold text-av-blue mb-3">{faq.q}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            </ScrollReveal>
                        ))}

                        {/* Placeholder FAQs */}
                        {[
                            '2. How do I register on the EGCA portal?',
                            '3. How do I log in to my EGCA account?',
                            '5. My EGCA account is locked. How do I unlock it?',
                            '6. Why am I not receiving the OTP during login?',
                        ].map((q, i) => (
                            <ScrollReveal key={q} delay={i * 60}>
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <h4 className="font-montserrat font-bold text-av-blue">{q}</h4>
                                    <p className="text-gray-400 text-xs mt-2">Please visit the official eGCA portal or contact DGCA support for detailed assistance.</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Conclusion ── */}
            <section className="py-20 px-4 bg-gradient-to-br from-av-blue via-av-navy to-av-blue">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal>
                        <div className="section-tag">Conclusion</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-5">
                            Conclusion
                        </h2>
                        <div className="glass rounded-2xl p-8 mb-8">
                            <p className="text-white/80 text-sm leading-relaxed">
                                Accessing EGCA's resources and services is simple once you understand the login process. By following these steps and tips, you can ensure a smooth experience with EGCA login.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ── CTA + Related Blogs ── */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* CTA */}
                    <ScrollReveal className="text-center mb-14">
                        <div className="section-tag">Fly High</div>
                        <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue mb-3">
                            FLY HIGH WITH <span className="text-av-orange">WEONE AVIATION ACADEMY</span>
                        </h2>
                        <p className="text-gray-500 mb-6 text-sm">Make Your Dream Possible Today to "Become a Pilot"</p>
                        <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
                            Join Now →
                        </Link>
                    </ScrollReveal>

                    {/* Related Blogs */}
                    <ScrollReveal>
                        <h3 className="font-montserrat font-bold text-av-blue text-xl mb-5 text-center">
                            Recent Blogs You Should Check If You Want to Start Your Career in Aviation
                        </h3>
                        <div className="grid sm:grid-cols-3 gap-5">
                            {relatedBlogs.map(blog => (
                                <Link key={blog.href} href={blog.href} className="card-hover bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-3 hover:border-av-orange/30 transition-all group">
                                    <span className="text-2xl">✈️</span>
                                    <span className="font-semibold text-av-blue text-sm group-hover:text-av-orange transition-colors">{blog.label}</span>
                                </Link>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}