import Layout from '../components/Layout';
import Link from 'next/link';
import ScrollReveal from '../components/ScrollReveal';

const sitemapData = [
    {
        category: 'Main Pages',
        icon: '🏠',
        color: 'bg-blue-50 border-blue-200',
        headerColor: 'bg-av-blue',
        links: [
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about-us' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Blogs', href: '/blogs' },
        ],
    },
    {
        category: 'Commercial Pilot License (CPL)',
        icon: '✈️',
        color: 'bg-orange-50 border-orange-200',
        headerColor: 'bg-av-orange',
        links: [
            { label: 'Commercial Pilot License', href: '/commercial-pilot-license' },
            { label: 'CPL Eligibility', href: '/commercial-pilot-license-eligibility' },
            { label: 'CPL Salary', href: '/commercial-pilot-license-salary' },
            { label: 'CPL Syllabus', href: '/commercial-pilot-license-syllabus' },
            { label: 'CPL Admission Process', href: '/commercial-pilot-license-admission-process' },
            { label: 'CPL Flight Training', href: '/courses/cpl-flight-training' },
            { label: 'Full Form of CPL', href: '/full-form-of-cpl-commercial-pilot-license' },
        ],
    },
    {
        category: 'DGCA Courses & Exam',
        icon: '📝',
        color: 'bg-green-50 border-green-200',
        headerColor: 'bg-green-700',
        links: [
            { label: 'DGCA Ground Classes in India', href: '/dgca-ground-classes-in-india' },
            { label: 'DGCA Pariksha / Exam Guide', href: '/dgca-pariksha' },
            { label: 'DGCA Full Form', href: '/dgca-full-form' },
            { label: 'DGCA Computer Number', href: '/dgca-computer-number' },
            { label: 'DGCA Class 1 & 2 Medical', href: '/dgca-class-2-class-1-medical' },
            { label: 'ECGA Login Guide', href: '/ecga-login-your-complete-guide' },
        ],
    },
    {
        category: 'DGCA Subjects',
        icon: '📚',
        color: 'bg-purple-50 border-purple-200',
        headerColor: 'bg-purple-700',
        links: [
            { label: 'Air Navigation', href: '/air-navigation' },
            { label: 'Air Regulations', href: '/air-regulations' },
            { label: 'Aviation Meteorology', href: '/aviation-meteorology' },
            { label: 'Technical General', href: '/technical-general' },
            { label: 'RTR-A (Radio Telephony)', href: '/rtr-a' },
            { label: 'RTR Full Form & Guide', href: '/rtr-full-form-meaning-importance-and-complete-guide' },
        ],
    },
    {
        category: 'Pilot License Types',
        icon: '🏆',
        color: 'bg-yellow-50 border-yellow-200',
        headerColor: 'bg-yellow-600',
        links: [
            { label: 'Student Pilot License (SPL)', href: '/student-pilot-license-spl' },
            { label: 'Private Pilot License (PPL)', href: '/private-pilot-license-ppl-course-details' },
            { label: 'PPL Full Form', href: '/ppl-full-form' },
            { label: 'PPL Course Fees', href: '/courses/ppl' },
            { label: 'ATPL (Advanced)', href: '/courses/atpl' },
            { label: 'Advanced ATPL Pilot Training', href: '/advanced-atpl-pilot-training' },
        ],
    },
    {
        category: 'Flying Schools',
        icon: '🛩️',
        color: 'bg-sky-50 border-sky-200',
        headerColor: 'bg-sky-700',
        links: [
            { label: 'Flying School Overview', href: '/flying-school/india' },
            { label: 'Flying School in India', href: '/flying-school/india' },
            { label: 'Flying School in USA', href: '/flying-school/usa' },
            { label: 'Flying School in Australia', href: '/flying-school/australia' },
            { label: 'Flying School in Canada', href: '/flying-school/canada' },
            { label: 'Flying School in South Africa', href: '/flying-school/south-africa' },
            { label: 'Best Flight Schools in USA', href: '/best-flight-schools-in-usa' },
        ],
    },
    {
        category: 'How to Become a Pilot',
        icon: '🚀',
        color: 'bg-indigo-50 border-indigo-200',
        headerColor: 'bg-indigo-700',
        links: [
            { label: 'How to Become a Pilot After 12th', href: '/how-to-become-a-pilot-after-12th' },
            { label: 'How to Become a Pilot in India', href: '/how-to-become-a-pilot/in-india' },
            { label: 'Your Guide on How to Become a Pilot', href: '/your-guide-on-how-to-become-a-pilot-in-india' },
            { label: 'Pilot Training Courses', href: '/pilot-training-courses' },
            { label: 'Airline Preparation Course', href: '/airline-preparation-course' },
        ],
    },
    {
        category: 'Airline Cadet Programs',
        icon: '🛫',
        color: 'bg-red-50 border-red-200',
        headerColor: 'bg-red-700',
        links: [
            { label: 'Emirates Cadet Pilot Program', href: '/emirates-cadet-pilot-program' },
            { label: 'Qatar Airways Cadet Pilot Program', href: '/qatar-airways-cadet-pilot-program' },
        ],
    },
    {
        category: 'Full Form Pages',
        icon: '📖',
        color: 'bg-teal-50 border-teal-200',
        headerColor: 'bg-teal-700',
        links: [
            { label: 'CBSE Full Form', href: '/cbse-full-form' },
            { label: 'ICSE Full Form', href: '/icse-full-form' },
            { label: 'DGCA Full Form', href: '/dgca-full-form' },
            { label: 'PPL Full Form', href: '/ppl-full-form' },
            { label: 'CPL Full Form', href: '/full-form-of-cpl-commercial-pilot-license' },
            { label: 'RTR Full Form', href: '/rtr-full-form-meaning-importance-and-complete-guide' },
            { label: 'DGCA Full Form Page', href: '/dgca-full-form' },
        ],
    },
    {
        category: 'Pilot Training in India (City-wise)',
        icon: '📍',
        color: 'bg-lime-50 border-lime-200',
        headerColor: 'bg-lime-700',
        links: [
            { label: 'Pilot Training in India', href: '/pilot-training-in-india' },
            { label: 'Pilot Training in Delhi', href: '/pilot-training-in-delhi' },
            { label: 'Pilot Training in Mumbai', href: '/pilot-training-in-mumbai' },
            { label: 'Pilot Training in Bangalore', href: '/pilot-training-in-bangalore' },
            { label: 'Pilot Training in Hyderabad', href: '/pilot-training-in-hyderabad' },
            { label: 'Pilot Training in Chennai', href: '/pilot-training-in-chennai' },
            { label: 'Pilot Training in Pune', href: '/pilot-training-in-pune' },
            { label: 'Pilot Training in Kolkata', href: '/pilot-training-in-kolkata' },
            { label: 'Pilot Training in Jaipur', href: '/pilot-training-in-jaipur' },
            { label: 'Pilot Training in Kerala', href: '/pilot-training-in-kerala' },
            { label: 'Pilot Training in Nagpur', href: '/pilot-training-in-nagpur' },
            { label: 'Pilot Training in Coimbatore', href: '/pilot-training-in-coimbatore' },
            { label: 'Pilot Training in Gujarat', href: '/pilot-training-in-gujarat' },
            { label: 'Pilot Training in Goa', href: '/pilot-training-in-goa' },
            { label: 'Pilot Training in Gurugram', href: '/pilot-training-in-gurugram' },
            { label: 'Pilot Training in Noida', href: '/pilot-training-in-noida' },
            { label: 'Pilot Training in Ghaziabad', href: '/pilot-training-in-ghaziabad' },
            { label: 'Pilot Training in Maharashtra', href: '/pilot-training-in-maharashtra' },
        ],
    },
    {
        category: 'Pilot Training in India (State-wise)',
        icon: '🗺️',
        color: 'bg-emerald-50 border-emerald-200',
        headerColor: 'bg-emerald-700',
        links: [
            { label: 'Pilot Training in Andhra Pradesh', href: '/pilot-training-in-andhra-pradesh' },
            { label: 'Pilot Training in Arunachal Pradesh', href: '/pilot-training-in-arunachal-pradesh' },
            { label: 'Pilot Training in Assam', href: '/pilot-training-in-assam' },
            { label: 'Pilot Training in Bihar', href: '/pilot-training-in-bihar' },
            { label: 'Pilot Training in Chhattisgarh', href: '/pilot-training-in-chhattisgarh' },
            { label: 'Pilot Training in Haryana', href: '/pilot-training-in-haryana' },
            { label: 'Pilot Training in Himachal Pradesh', href: '/pilot-training-in-himachal-pradesh' },
            { label: 'Pilot Training in Punjab', href: '/pilot-training-in-punjab' },
            { label: 'Pilot Training in Rajasthan', href: '/pilot-training-in-rajasthan' },
            { label: 'Pilot Training in Tamil Nadu', href: '/pilot-training-in-tamil-nadu' },
        ],
    },
    {
        category: 'Blog Posts',
        icon: '✍️',
        color: 'bg-pink-50 border-pink-200',
        headerColor: 'bg-pink-700',
        links: [
            { label: 'Aviation Course After 12th', href: '/blog/aviation-course-after-12th' },
            { label: 'CPL Full Form Blog', href: '/blog/cpl-full-form' },
            { label: 'DGCA Exam Guide', href: '/blog/dgca-exam-guide' },
            { label: 'Pilot Training in Delhi', href: '/blog/pilot-training-delhi' },
            { label: 'PPL Course Fees', href: '/blog/ppl-course-fees' },
        ],
    },
    {
        category: 'Forms & Applications',
        icon: '📋',
        color: 'bg-gray-50 border-gray-200',
        headerColor: 'bg-gray-600',
        links: [
            { label: 'CBSE Full Form Page', href: '/cbse-full-form' },
            { label: 'ICSE Full Form Page', href: '/icse-full-form' },
            { label: 'PPL Full Form Page', href: '/ppl-full-form' },
            { label: 'DGCA Full Form Page', href: '/dgca-full-form' },
            { label: 'CPL Full Form Page', href: '/full-form-of-cpl-commercial-pilot-license' },
        ],
    },
];

export default function Sitemap() {
    return (
        <Layout
            title="Sitemap | We One Aviation Academy"
            description="Complete sitemap of We One Aviation Academy. Find all pages including CPL, DGCA ground classes, pilot training cities, flying schools, and more."
        >
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-av-blue to-av-navy py-14 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="font-montserrat text-4xl md:text-5xl font-black text-white mb-3">
                        Site<span className="text-av-orange">map</span>
                    </h1>
                    <p className="text-white/70 text-sm">
                        Browse all pages of We One Aviation Academy — India's Most Trusted Pilot Training Institute
                    </p>
                    {/* Breadcrumb */}
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/60">
                        <Link href="/" className="hover:text-av-orange transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-white">Sitemap</span>
                    </div>
                </div>
            </div>

            {/* Quick Nav */}
            <div className="bg-white border-b border-gray-100 py-4 px-4 sticky top-0 z-10 shadow-sm">
                <div className="max-w-7xl mx-auto overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {sitemapData.map((section) => (
                            <a
                                key={section.category}
                                href={`#${section.category.replace(/\s+/g, '-').toLowerCase()}`}
                                className="px-3 py-1.5 text-xs font-semibold text-av-blue bg-gray-100 hover:bg-av-orange hover:text-white rounded-full transition-all whitespace-nowrap"
                            >
                                {section.icon} {section.category}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sitemap Grid */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sitemapData.map((section, i) => (
                            <ScrollReveal key={section.category} delay={i * 60}>
                                <div
                                    id={section.category.replace(/\s+/g, '-').toLowerCase()}
                                    className={`rounded-2xl border ${section.color} overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                                >
                                    {/* Card Header */}
                                    <div className={`${section.headerColor} px-5 py-4 flex items-center gap-2`}>
                                        <span className="text-xl">{section.icon}</span>
                                        <h2 className="font-montserrat font-bold text-white text-sm leading-tight">
                                            {section.category}
                                        </h2>
                                    </div>

                                    {/* Links List */}
                                    <ul className="px-5 py-4 space-y-2">
                                        {section.links.map((link) => (
                                            <li key={link.href} className="flex items-start gap-2">
                                                <span className="text-av-orange mt-0.5 text-xs flex-shrink-0">●</span>
                                                <Link
                                                    href={link.href}
                                                    className="text-av-blue text-sm hover:text-av-orange hover:underline transition-colors leading-snug"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-12 px-4 bg-av-blue text-center">
                <div className="max-w-2xl mx-auto">
                    <h3 className="font-montserrat text-2xl font-bold text-white mb-3">
                        Can't find what you're looking for?
                    </h3>
                    <p className="text-white/70 text-sm mb-6">
                        Our aviation counsellors are available to answer all your queries about pilot training, DGCA exams, and career guidance.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-av-blue transition-all text-sm"
                    >
                        Contact Us →
                    </Link>
                </div>
            </section>
        </Layout>
    );
}