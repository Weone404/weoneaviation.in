import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

// ─── Data ────────────────────────────────────────────────────────────────────

const sections = [
    { id: 'acceptance', num: '01', title: 'Acceptance of Terms' },
    { id: 'about', num: '02', title: 'About Us' },
    { id: 'eligibility', num: '03', title: 'Eligibility' },
    { id: 'enrollment', num: '04', title: 'Enrollment & Fees' },
    { id: 'scholarship', num: '05', title: 'Scholarship Program' },
    { id: 'conduct', num: '06', title: 'User Conduct' },
    { id: 'ip', num: '07', title: 'Intellectual Property' },
    { id: 'disclaimers', num: '08', title: 'Disclaimers' },
    { id: 'refunds', num: '09', title: 'Refund Policy' },
    { id: 'liability', num: '10', title: 'Limitation of Liability' },
    { id: 'law', num: '11', title: 'Governing Law' },
    { id: 'changes', num: '12', title: 'Changes to Terms' },
    { id: 'contact', num: '13', title: 'Contact Us' },
];

const eligibilityItems = [
    { icon: '🎂', text: 'Be at least 17 years of age' },
    { icon: '📚', text: 'Successfully completed 10+2 with Physics & Mathematics' },
    { icon: '🇮🇳', text: 'Be an Indian citizen or OCI holder' },
    { icon: '✅', text: 'Provide correct and truthful information' },
    { icon: '📋', text: 'Have no criminal record' },
];

const enrollmentItems = [
    { icon: '💳', text: 'Course fees are to be paid as per the schedule agreed at the time of enrollment.' },
    { icon: '🚫', text: 'All fees are non-refundable once the batch has started unless otherwise notified in writing.' },
    { icon: '📖', text: 'Course material is for personal use only. No sharing or resale is permitted.' },
    { icon: '🔔', text: 'WeOne Aviation Academy reserves the right to change course fees with prior notice.' },
];

const scholarshipItems = [
    { icon: '🏆', text: 'Available for Class 10 & 12 toppers only.' },
    { icon: '📚', text: 'Only applicable on ground class fees, not on flying training fees.' },
    { icon: '📝', text: 'Eligibility is subject to verification of original mark sheets.' },
    { icon: '⚠️', text: 'Any false or forged documents will lead to immediate disqualification.' },
    { icon: '⚖️', text: 'WeOne Aviation Academy alone makes the final decision on eligibility.' },
];

const conductItems = [
    { icon: '🚫', text: 'Provide false or misleading information.' },
    { icon: '©️', text: 'Copy and publish content from weoneaviation.in without prior written permission.' },
    { icon: '😡', text: 'Abuse or harass our staff, instructors, or fellow students.' },
    { icon: '💻', text: 'Use our services or website for hacking or any other illegal activity.' },
];

const disclaimerItems = [
    { icon: '✈️', text: 'We do not promise admission to any flying school.' },
    { icon: '📝', text: 'We do not promise DGCA exam pass rates or results.' },
    { icon: '💼', text: 'We do not promise placement in any airline.' },
    { icon: '🌐', text: 'Always refer to DGCA rules and fees directly from dgca.gov.in.' },
    { icon: '🪪', text: 'Individual eligibility and DGCA rules apply for pilot licence.' },
];

const refundItems = [
    { icon: '🚫', title: 'No Refund After Batch Starts', desc: 'No fee is refundable once a batch has commenced.' },
    { icon: '💸', title: '10% Cancellation Fee', desc: 'If cancelled before batch starts, 10% of the total fee will be charged as a cancellation fee.' },
    { icon: '✅', title: 'Full Refund if We Cancel', desc: 'If WeOne Aviation Academy cancels a batch, the fee will be fully refunded.' },
    { icon: '🏆', title: 'Scholarship Refund Window', desc: 'Scholarship refund requests must be sent within 30 days from the completion of the course.' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TermsPage() {
    return (
        <Layout
            title="Terms of Service – WeOne Aviation Academy | Enrollment, Fees & Policies"
            description="Read WeOne Aviation Academy's Terms of Service covering enrollment, fees, scholarship program, user conduct, refund policy, and governing law."
        >

            {/* ── Hero Banner ── */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue py-28 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full border-2 border-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full border-2 border-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <ScrollReveal className="relative z-10">
                    <div className="section-tag mb-4">Legal</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Terms of <span className="text-av-orange">Service</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed mb-6">
                        Please read these terms carefully before using our website or enrolling in any of our pilot training programs.
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

                    {/* ── Sticky Table of Contents ── */}
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
                                    <p className="text-xs text-gray-400 mb-3">Questions about these terms?</p>
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

                    {/* ── Terms Content ── */}
                    <div className="flex-1 space-y-8">

                        {/* 01 Acceptance */}
                        <ScrollReveal>
                            <div id="acceptance" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">01</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Acceptance of Terms</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    By using <strong className="text-av-blue">weoneaviation.in</strong> or any of our services, you are agreeing to the following terms. These Terms are applicable to all visitors, students, and enquirers.
                                </p>
                                <div className="bg-av-orange/10 border border-av-orange/20 rounded-xl px-4 py-3 text-sm text-av-blue font-medium">
                                    ⚠️ Please do not use our website if you disagree with these terms.
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 02 About Us */}
                        <ScrollReveal>
                            <div id="about" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">02</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">About Us</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    WeOne Aviation Academy is a DGCA-approved pilot training institute based in New Delhi, India. We provide ground classes and career counselling with avenues for CPL, PPL, and international flight training programs.
                                </p>
                                <div className="bg-av-blue rounded-xl px-5 py-4 flex items-center gap-3">
                                    <span className="text-2xl flex-shrink-0">✈️</span>
                                    <p className="text-white/80 text-sm">
                                        We are a <strong className="text-white">ground training and counselling institute</strong> — <span className="text-av-orange font-bold">NOT a flying school.</span>
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 03 Eligibility */}
                        <ScrollReveal>
                            <div id="eligibility" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">03</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Eligibility</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">In order to access our services, you must:</p>
                                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                                    {eligibilityItems.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                                            <span className="text-gray-600 text-xs leading-relaxed">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    We reserve the right to refuse services to anyone who provides incorrect information or does not fulfil these criteria.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 04 Enrollment & Fees */}
                        <ScrollReveal>
                            <div id="enrollment" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">04</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Enrollment & Fees</h2>
                                </div>
                                <div className="space-y-3">
                                    {enrollmentItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl px-4 py-3">
                                            <span className="text-xl flex-shrink-0">{item.icon}</span>
                                            <span className="text-gray-600 text-sm leading-relaxed">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 05 Scholarship */}
                        <ScrollReveal>
                            <div id="scholarship" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">05</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Scholarship Program</h2>
                                </div>
                                <div className="space-y-3">
                                    {scholarshipItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                                            <span className="text-gray-600 text-sm leading-relaxed">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 06 User Conduct */}
                        <ScrollReveal>
                            <div id="conduct" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">06</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">User Conduct</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-5">When using our website or services, you are <strong className="text-av-blue">NOT allowed to:</strong></p>
                                <div className="space-y-3 mb-5">
                                    {conductItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 border border-red-100 bg-red-50/50 rounded-xl px-4 py-3">
                                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                                            <span className="text-gray-600 text-sm leading-relaxed">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-av-orange/10 border border-av-orange/20 rounded-xl px-4 py-3 text-sm text-av-blue font-medium">
                                    ⚠️ Violation of the above rules is grounds for immediate cancellation of enrollment and starting of legal proceedings.
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 07 Intellectual Property */}
                        <ScrollReveal>
                            <div id="ip" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">07</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Intellectual Property</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    All text, images, logos, course materials, and videos on this website are the property of <strong className="text-av-blue">WeOne Aviation Academy</strong> and are protected under Indian Copyright Law.
                                </p>
                                <div className="grid sm:grid-cols-3 gap-3 mb-4">
                                    {['Text & Articles', 'Images & Logos', 'Course Materials', 'Videos & Media', 'Brand & Trademarks', 'Study Resources'].map((item, i) => (
                                        <div key={i} className="bg-av-blue/5 border border-av-blue/10 rounded-xl px-4 py-3 text-center">
                                            <span className="text-av-blue font-semibold text-xs">©️ {item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs text-red-600 font-medium">
                                    🚫 No part of our property shall be reproduced or used in any manner without our prior written permission.
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 08 Disclaimers */}
                        <ScrollReveal>
                            <div id="disclaimers" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">08</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Disclaimers</h2>
                                </div>
                                <div className="space-y-3">
                                    {disclaimerItems.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                                            <span className="text-gray-600 text-sm leading-relaxed">{item.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 09 Refund Policy */}
                        <ScrollReveal>
                            <div id="refunds" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">09</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Refund Policy</h2>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                                    {refundItems.map((item, i) => (
                                        <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                                            <div className="bg-av-blue px-4 py-3 flex items-center gap-2">
                                                <span className="text-lg">{item.icon}</span>
                                                <span className="font-montserrat font-bold text-white text-xs">{item.title}</span>
                                            </div>
                                            <div className="px-4 py-3 bg-white">
                                                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-av-blue rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div>
                                        <p className="text-white font-montserrat font-bold text-sm">Request a Refund</p>
                                        <p className="text-white/60 text-xs mt-0.5">Send your enrollment details and reason to our email.</p>
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

                        {/* 10 Limitation of Liability */}
                        <ScrollReveal>
                            <div id="liability" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">10</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Limitation of Liability</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    WeOne Aviation Academy does not bear any direct or indirect damages caused due to the use of our services, DGCA exam results, medical test results, admission decisions at flying schools, or any issues arising from third-party websites or services.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* 11 Governing Law */}
                        <ScrollReveal>
                            <div id="law" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">11</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Governing Law</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    These Terms shall be governed by the laws of <strong className="text-av-blue">India</strong>. All disputes shall be subject to the exclusive jurisdiction of the courts in <strong className="text-av-blue">New Delhi, India</strong>.
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-700">
                                    💬 We welcome you to contact us informally first, so we can try to resolve any potential disputes before legal action.
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* 12 Changes */}
                        <ScrollReveal>
                            <div id="changes" className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">12</span>
                                    <h2 className="font-montserrat font-bold text-av-blue text-xl">Changes to Terms</h2>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                    We may update these Terms from time to time. The <strong className="text-av-blue">"Last Updated"</strong> date at the top of this page will reflect any changes made.
                                </p>
                                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-gray-600">
                                    📌 By continuing to use our website after changes are made, you agree to remain bound by the updated Terms.
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
                                    If you have any questions about these Terms of Service, feel free to reach out to us. We will respond within <strong className="text-white">7 business days</strong>.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: '🏢', label: 'Address', value: 'C-404, 3rd Floor, Near Ramphal Chowk Road, Palam Extension, Sector-7, Dwarka, Delhi 110077, India', href: null },
                                        { icon: '📧', label: 'Email', value: 'weoneaviation8@gmail.com', href: 'mailto:weoneaviation8@gmail.com' },
                                        { icon: '📞', label: 'Phone', value: '+91-9355611996', href: 'tel:+919355611996' },
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
                                        These Terms are governed by Indian law including the Indian Contract Act 1872, IT Act 2000, and the Consumer Protection Act 2019.
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
                        <h3 className="font-montserrat font-bold text-av-blue text-xl mb-2">Have Questions About Our Terms?</h3>
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