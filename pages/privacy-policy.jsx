import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const sections = [
    { id: 'introduction', num: '01', title: 'Introduction' },
    { id: 'information', num: '02', title: 'Types of Information We Collect' },
    { id: 'usage', num: '03', title: 'How We Use Your Information' },
    { id: 'sharing', num: '04', title: 'How We Share Your Information' },
    { id: 'cookies', num: '05', title: 'Cookies Policy' },
    { id: 'thirdparty', num: '06', title: 'Google Analytics & Third-Party Tools' },
    { id: 'retention', num: '07', title: 'Retention of Your Personal Data' },
    { id: 'security', num: '08', title: 'Security of Your Data' },
    { id: 'rights', num: '09', title: 'Your Rights' },
    { id: 'children', num: '10', title: "Children's Privacy" },
    { id: 'links', num: '11', title: 'Links to Other Websites' },
    { id: 'changes', num: '12', title: 'Changes to This Privacy Policy' },
    { id: 'contact', num: '13', title: 'Contact Us' },
];

const personalInfo = [
    { icon: '👤', item: 'Full Name' },
    { icon: '📧', item: 'Email Address' },
    { icon: '📞', item: 'Phone Number' },
    { icon: '📍', item: 'City / State' },
    { icon: '✈️', item: 'Course of Interest (CPL, PPL, Ground Classes etc.)' },
    { icon: '📝', item: 'Class 10 / 12 Marks (for Scholarship Applications)' },
];

const autoInfo = [
    { icon: '🌐', item: 'IP Address' },
    { icon: '🖥️', item: 'Browser Type and Version' },
    { icon: '📱', item: 'Device Type (Mobile / Desktop)' },
    { icon: '📄', item: 'Pages Visited and Time Spent' },
    { icon: '🔗', item: 'The Page You Were on Before You Came to Our Site' },
    { icon: '📊', item: 'Google Analytics Data' },
];

const usageItems = [
    { icon: '💬', title: 'Respond to Your Enquiries', desc: 'Our counsellors use your contact details to call, WhatsApp or email you about pilot training programmes.' },
    { icon: '🎓', title: 'Process Scholarship Applications', desc: 'We verify eligibility by checking your academic details.' },
    { icon: '📢', title: 'Send Course Updates', desc: 'Notify you about new batches, offers and aviation news.' },
    { icon: '📈', title: 'Improve Our Website', desc: 'Analyse traffic and user behaviour to improve content and user experience.' },
    { icon: '⚖️', title: 'Comply with Legal Obligations', desc: 'For maintaining records as required by Indian law.' },
    { icon: '🛡️', title: 'Prevent Fraud', desc: 'To detect and prevent spam, abuse or fraudulent enquiries.' },
];

const sharingItems = [
    { icon: '🔧', title: 'Service Providers', desc: 'Trusted third-party tools we use to operate our website services such as Google Analytics, WhatsApp Business API, and email services.' },
    { icon: '⚖️', title: 'Legal Requirements', desc: 'In certain circumstances, we may share your data if required by law, court order or government authority in India.' },
    { icon: '🤝', title: 'Business Transfers', desc: 'If we undergo a merger, reorganisation, acquisition or sale of assets, we may transfer your data. We will endeavour to give you notice of such, where possible.' },
    { icon: '✅', title: 'With Your Consent', desc: 'We will share your information with any third party only with your explicit consent.' },
];

const cookieTypes = [
    { name: 'Strictly Necessary Cookies', desc: 'Essential for the website to function correctly.' },
    { name: 'Analytics Cookies', desc: 'Used by Google Analytics to track page visits and user behaviour (anonymised).' },
    { name: 'Marketing Cookies', desc: 'Display relevant course ads on Google or Facebook (if applicable).' },
];

const thirdPartyTools = [
    { icon: '📊', name: 'Google Analytics', desc: 'Tracks website traffic and user behaviour. Data is anonymised and used solely to help us improve the website.', link: 'https://policies.google.com/privacy' },
    { icon: '🏷️', name: 'Google Tag Manager', desc: 'Used to manage the tracking scripts on our website.', link: null },
    { icon: '💬', name: 'WhatsApp Business', desc: 'Used to communicate directly with students and enquiries.', link: null },
    { icon: '📣', name: 'Meta (Facebook) Pixel', desc: 'Measures the effectiveness of our advertisements.', link: null },
];

const retentionItems = [
    { icon: '📋', type: 'Enquiry Data', duration: 'Up to 2 years', desc: 'Kept for follow-up and counselling purposes.' },
    { icon: '🏆', type: 'Scholarship Application Data', duration: 'Duration of the scholarship', desc: 'Retained throughout the scholarship program.' },
    { icon: '📊', type: 'Analytics Data', duration: '26 months', desc: 'According to the default settings of Google Analytics.' },
];

const securityItems = [
    'Unauthorised access and disclosure',
    'Accidental loss, destruction or damage',
    'Misuse or unauthorised manipulation',
];

const userRights = [
    { icon: '👁️', right: 'Right of Access', desc: 'You have the right to request a copy of the personal data we hold about you.' },
    { icon: '✏️', right: 'Right of Correction', desc: 'You can ask us to correct any personal data that is inaccurate or incomplete.' },
    { icon: '🗑️', right: 'Right of Deletion', desc: 'You can ask us to delete your personal data from our records.' },
    { icon: '🚫', right: 'Right to Withdraw Consent', desc: 'You may withdraw your consent to receive marketing communications from us at any time.' },
    { icon: '📢', right: 'Right to Complain', desc: 'You may file a complaint with us or the relevant data protection authority.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PrivacyPolicyPage() {
    return (
        <Layout
            title="Privacy Policy – WeOne Aviation Academy | Data Protection & User Rights"
            description="Read WeOne Aviation Academy's Privacy Policy to understand how we collect, use, and protect your personal information when you visit weoneaviation.in."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-28 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full border-2 border-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full border-2 border-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <ScrollReveal className="relative z-10">
                    <div className="section-tag mb-4">Legal</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Privacy <span className="text-av-orange">Policy</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed mb-6">
                        We value your personal information and are dedicated to protecting your privacy. Please read this policy carefully to understand how we handle your data.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50">
                        <span className="bg-white/10 px-4 py-2 rounded-full">📅 Last Updated: May 25, 2026</span>
                        <span className="bg-white/10 px-4 py-2 rounded-full">✅ Effective: January 1, 2024</span>
                    </div>
                </ScrollReveal>
            </div>

            {/* ── Main Content + Sidebar ── */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

                    {/* ── Sticky Table of Contents (Sidebar) ── */}
                    <aside className="lg:w-72 flex-shrink-0">
                        <ScrollReveal>
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">
                                <h3 className="font-montserrat font-bold text-av-blue mb-4 text-sm">Table of Contents</h3>
                                <ul className="space-y-1">
                                    {sections.map((s) => (
                                        <li key={s.id}>
                                            <a
                                                href={`#${s.id}`}
                                                className="flex items-center gap-2 text-xs text-gray-500 hover:text-av-orange transition-colors py-1.5 group"
                                            >
                                                <span className="text-av-orange font-bold flex-shrink-0 w-5">{s.num}</span>
                                                <span className="group-hover:translate-x-0.5 transition-transform">{s.title}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-5 pt-5 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 mb-3">Questions about this policy?</p>
                                    <a
                                        href="mailto:weoneaviation8@gmail.com"
                                        className="block bg-av-blue text-white text-center py-2.5 rounded-xl text-xs font-bold hover:bg-av-orange transition-all"
                                    >
                                        Contact Us →
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>
                    </aside>

                    {/* ── Policy Content ── */}
                    <div className="flex-1 space-y-8">

                        {/* 01 Introduction */}
                        <ScrollReveal>
                            <div id="introduction" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">01</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Introduction</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    Welcome to <strong className="text-av-blue">WeOne Aviation Academy</strong> ("we," "our," or "us"). We value your personal information and are dedicated to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and protect the personal information you provide during a visit to our website <strong className="text-av-blue">weoneaviation.in</strong> or when you contact us for pilot training enquiries.
                                </p>
                                <div className="bg-av-orange/10 border border-av-orange/20 rounded-xl px-4 py-3 text-sm text-av-blue font-medium">
                                    ⚠️ Please do not continue to use our site if you do not agree with this policy.
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 02 Information We Collect */}
                        <ScrollReveal>
                            <div id="information" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">02</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Types of Information We Collect</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    We collect information that you voluntarily provide to us when you fill in our contact or enquiry forms, apply for a scholarship or course, contact us via WhatsApp, phone or email, or sign up for newsletters and updates.
                                </p>

                                <h3 className="font-montserrat font-bold text-av-blue text-sm mb-3">Personal Information</h3>
                                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                                    {personalInfo.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                                            <span className="text-gray-600 text-xs">{item.item}</span>
                                        </div>
                                    ))}
                                </div>

                                <h3 className="font-montserrat font-bold text-av-blue text-sm mb-3">Automatically Collected Information</h3>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {autoInfo.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                                            <span className="text-gray-600 text-xs">{item.item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 03 How We Use */}
                        <ScrollReveal>
                            <div id="usage" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">03</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">How We Use Your Information</h2>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {usageItems.map((item, i) => (
                                        <div key={i} className="flex gap-3 items-start bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                            <div>
                                                <div className="font-montserrat font-bold text-av-blue text-xs mb-1">{item.title}</div>
                                                <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 04 How We Share */}
                        <ScrollReveal>
                            <div id="sharing" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">04</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">How We Share Your Information</h2>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 font-medium mb-5">
                                    ✅ We do not sell, trade or rent your personal information to third parties.
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">We may share your data only in the following circumstances:</p>
                                <div className="space-y-3">
                                    {sharingItems.map((item, i) => (
                                        <div key={i} className="flex gap-3 items-start border border-gray-100 rounded-xl p-4">
                                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                            <div>
                                                <div className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.title}</div>
                                                <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed mt-4">
                                    We will ensure that all third-party service providers we use comply with the same standards of data protection that we do.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 05 Cookies */}
                        <ScrollReveal>
                            <div id="cookies" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">05</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Cookies Policy</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    We use cookies to improve your experience on <strong className="text-av-blue">weoneaviation.in</strong>.
                                </p>
                                <h3 className="font-montserrat font-bold text-av-blue text-sm mb-2">What is a Cookie?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    Cookies are small text files stored on your device when you visit our website. They enable us to remember the preferences you set and analyse how you use our website.
                                </p>
                                <h3 className="font-montserrat font-bold text-av-blue text-sm mb-3">Types of Cookies We Use</h3>
                                <div className="space-y-3 mb-5">
                                    {cookieTypes.map((c, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <span className="text-av-orange font-bold flex-shrink-0 mt-0.5">🍪</span>
                                            <div>
                                                <div className="font-montserrat font-bold text-av-blue text-xs mb-0.5">{c.name}</div>
                                                <div className="text-gray-500 text-xs">{c.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-gray-600">
                                    <strong className="text-av-blue">How to Disable Cookies:</strong> You can disable cookies via your browser settings. However, please note that disabling them may impact some features or functionality of the website.
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 06 Third-Party Tools */}
                        <ScrollReveal>
                            <div id="thirdparty" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">06</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Google Analytics & Third-Party Tools</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">We use the following third-party services on our website:</p>
                                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                                    {thirdPartyTools.map((tool, i) => (
                                        <div key={i} className="flex gap-3 items-start border border-gray-100 rounded-xl p-4">
                                            <span className="text-2xl flex-shrink-0">{tool.icon}</span>
                                            <div>
                                                <div className="font-montserrat font-bold text-av-blue text-xs mb-1">{tool.name}</div>
                                                <div className="text-gray-500 text-xs leading-relaxed mb-1">{tool.desc}</div>
                                                {tool.link && (
                                                    <a href={tool.link} target="_blank" rel="noopener noreferrer" className="text-av-orange text-xs hover:underline">
                                                        View Privacy Policy →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    We do not have any influence on the privacy practices of these third parties and encourage you to review their individual privacy policies.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 07 Retention */}
                        <ScrollReveal>
                            <div id="retention" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">07</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Retention of Your Personal Data</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    We only keep your personal information for as long as necessary to carry out the purposes set out in this policy, unless longer retention is required by law.
                                </p>
                                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                                    {retentionItems.map((item, i) => (
                                        <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                                            <div className="bg-av-blue px-4 py-3 flex items-center gap-2">
                                                <span className="text-lg">{item.icon}</span>
                                                <div className="font-montserrat font-bold text-white text-xs">{item.type}</div>
                                            </div>
                                            <div className="px-4 py-3">
                                                <div className="text-av-orange font-bold text-sm mb-1">{item.duration}</div>
                                                <div className="text-gray-500 text-xs">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-500 text-xs">Your data is securely deleted or anonymised at the end of the retention period.</p>
                            </div>
                        </ScrollReveal>

                        {/* 08 Security */}
                        <ScrollReveal>
                            <div id="security" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">08</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Security of Your Data</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    We use appropriate technical and organisational measures to safeguard the security of your personal information from:
                                </p>
                                <div className="space-y-2 mb-5">
                                    {securityItems.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <span className="text-av-orange font-bold flex-shrink-0">🔒</span>
                                            <span className="text-gray-600 text-xs">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-gray-600 leading-relaxed">
                                    <strong className="text-green-700">🔐 SSL Encrypted:</strong> All pages on our website are SSL (Secure Socket Layer) encrypted, meaning data transmitted between your browser and our servers is secure. However, we cannot guarantee that all transmissions over the internet are 100% secure.
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 09 Your Rights */}
                        <ScrollReveal>
                            <div id="rights" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">09</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Your Rights</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    As a user of our website you are entitled to the following rights regarding your personal data:
                                </p>
                                <div className="space-y-3 mb-5">
                                    {userRights.map((item, i) => (
                                        <div key={i} className="flex gap-3 items-start border border-gray-100 rounded-xl p-4">
                                            <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                            <div>
                                                <div className="font-montserrat font-bold text-av-blue text-sm mb-1">{item.right}</div>
                                                <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-av-blue rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div>
                                        <p className="text-white font-montserrat font-bold text-sm">Exercise Your Rights</p>
                                        <p className="text-white/60 text-xs mt-0.5">Send us an email to exercise any of the above rights.</p>
                                    </div>
                                    <a
                                        href="mailto:weoneaviation8@gmail.com"
                                        className="flex-shrink-0 bg-av-orange text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-white hover:text-av-blue transition-all"
                                    >
                                        weoneaviation8@gmail.com
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 10 Children's Privacy */}
                        <ScrollReveal>
                            <div id="children" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">10</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Children's Privacy</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    Services of WeOne Aviation Academy are provided for people who are at least <strong className="text-av-blue">17 years of age</strong> (the minimum age for pilot training). We do not knowingly collect personal information from children under 13 years of age.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Any data we believe has been collected from a child under 13 years of age without parental consent will be deleted immediately. If you believe we have such data, please let us know at <a href="mailto:weoneaviation8@gmail.com" className="text-av-orange hover:underline">weoneaviation8@gmail.com</a>.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 11 Links */}
                        <ScrollReveal>
                            <div id="links" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">11</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Links to Other Websites</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Our site may link to third-party websites (e.g., DGCA's official website, flying schools, airlines). We do not control or are not responsible for the privacy practices or content of those third-party sites. We recommend that you review the privacy policies of each site you visit.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 12 Changes */}
                        <ScrollReveal>
                            <div id="changes" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">12</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Changes to This Privacy Policy</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    This Privacy Policy may change from time to time as our practices change or for legal, regulatory or operational reasons. Each time we change the policy, we will:
                                </p>
                                <div className="space-y-3">
                                    {[
                                        { icon: '📅', text: 'Update the "Last Updated" date at the top of this page.' },
                                        { icon: '📧', text: 'Inform you via email or a bold notice at the top of our website (for major changes).' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                                            <span className="text-gray-600 text-xs leading-relaxed">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 13 Contact */}
                        <ScrollReveal>
                            <div id="contact" className="bg-gradient-to-br from-av-blue to-av-navy rounded-2xl p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">13</span>
                                    <h2 className="font-montserrat font-bold text-white text-xl">Contact Us</h2>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed mb-6">
                                    If you have any questions, concerns or requests regarding this Privacy Policy or how we handle your data, please contact us. We will respond to all privacy-related queries within <strong className="text-white">7 business days</strong>.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: '🏢', label: 'Address', value: 'C-404, 3rd Floor, Near Ramphal Chowk Road, Palam Extension, Sector-7, Dwarka, Delhi 110077, India' },
                                        { icon: '📧', label: 'Email', value: 'weoneaviation8@gmail.com', href: 'mailto:weoneaviation8@gmail.com' },
                                        { icon: '📞', label: 'Phone', value: '+91-9355611996 / +91-9355566991', href: 'tel:+919355611996' },
                                        { icon: '🌐', label: 'Website', value: 'weoneaviation.in', href: 'https://www.weoneaviation.in' },
                                    ].map((item, i) => (
                                        <div key={i} className="glass rounded-xl p-4 flex gap-3 items-start">
                                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                                            <div>
                                                <div className="text-av-orange font-bold text-xs mb-0.5">{item.label}</div>
                                                {item.href ? (
                                                    <a href={item.href} className="text-white/80 text-xs hover:text-av-orange transition-colors">{item.value}</a>
                                                ) : (
                                                    <div className="text-white/80 text-xs leading-relaxed">{item.value}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-5 border-t border-white/10 text-center">
                                    <p className="text-white/40 text-xs">
                                        This Privacy Policy is governed by the laws of India, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                    </div>
                </div>
            </section>

            {/* ── Bottom CTA ── */}
            <section className="py-14 px-4 bg-gray-50 border-t border-gray-100">
                <div className="max-w-3xl mx-auto text-center">
                    <ScrollReveal>
                        <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2">Have Questions About Your Data?</h3>
                        <p className="text-gray-500 text-sm mb-6">Our team is happy to help. Reach out to us anytime.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-block bg-av-blue text-white px-8 py-3 rounded-full font-bold hover:bg-av-orange transition-all text-sm"
                            >
                                Contact Us →
                            </Link>
                            <a
                                href="https://wa.me/919355611996"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-white border border-gray-200 text-av-blue px-8 py-3 rounded-full font-bold hover:border-av-orange hover:text-av-orange transition-all text-sm"
                            >
                                WhatsApp Now
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

        </Layout>
    );
}