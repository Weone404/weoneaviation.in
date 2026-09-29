import Link from 'next/link';
import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import { ACADEMY, DGCA_PAPERS, RTR, papersSummary } from '../lib/facts';
import { generateFAQSchema } from '../lib/schema';

const canonicalUrl = `${ACADEMY.url}/dgca-ground-classes-in-india`;
const faqItems = [
    {
        q: 'Where are We One Aviation classroom classes held?',
        a: `Classroom batches are held at the academy's stated physical location: ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality}, ${ACADEMY.addressRegion} ${ACADEMY.postalCode}.`,
    },
    {
        q: 'Can students outside Delhi join DGCA ground classes?',
        a: 'Students outside Delhi can join online batches. This is online learning access, not a physical academy branch or classroom in their city.',
    },
    {
        q: 'Which subjects do the DGCA ground classes cover?',
        a: `The written-paper preparation covers ${papersSummary()}. ${RTR.name} is prepared separately from those written papers and is examined under its own rules.`,
    },
    {
        q: 'Does We One Aviation operate a flying school?',
        a: 'No. The academy teaches DGCA ground subjects and arranges flight training with partner flying schools. It does not own aircraft or operate a flying school; flight training takes place at the selected school.',
    },
];

const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonicalUrl,
    url: canonicalUrl,
    name: 'DGCA Ground Classes in India | We One Aviation Academy',
    about: { '@id': `${ACADEMY.url}/#organization` },
    publisher: { '@id': `${ACADEMY.url}/#organization` },
    inLanguage: 'en-IN',
};

const headingClass = 'mb-4 font-montserrat text-2xl font-bold text-av-blue';
const paragraphClass = 'mb-4 text-sm leading-7 text-gray-600';
const linkClass = 'font-semibold text-av-blue underline decoration-av-orange underline-offset-4 hover:text-av-orange';

export default function DGCAGroundClassesInIndia() {
    return (
        <Layout
            title="DGCA Ground Classes in India | We One Aviation Academy"
            description="Learn what DGCA ground classes cover, where We One Aviation holds classroom batches in Dwarka, and how students outside Delhi can join online."
        >
            <StructuredData data={[pageSchema, generateFAQSchema(faqItems)]} />

            <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue px-4 py-16 text-white">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-av-orange">DGCA theory preparation</p>
                    <h1 className="mb-5 font-montserrat text-3xl font-black leading-tight md:text-5xl">
                        DGCA Ground Classes in India
                    </h1>
                    <p className="max-w-3xl text-base leading-7 text-white/80">
                        We One Aviation Academy prepares students for the DGCA written papers. Classroom batches run at the academy’s Dwarka, New Delhi location; students outside Delhi can join online batches. The academy does not claim physical branches in other cities.
                    </p>
                    <Link href="/contact" className="mt-7 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue">
                        Ask about class access
                    </Link>
                </div>
            </header>

            <section className="mx-auto max-w-5xl px-4 py-12">
                <h2 className={headingClass}>What the ground classes cover</h2>
                <p className={paragraphClass}>
                    DGCA written-paper preparation covers {papersSummary()}. {RTR.name} preparation is separate from these written papers. The Directorate General of Civil Aviation sets the licensing and examination requirements; the academy provides ground-subject teaching and preparation.
                </p>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm">
                        <caption className="sr-only">DGCA written papers covered in ground-class preparation</caption>
                        <thead>
                            <tr className="bg-av-blue text-left text-white">
                                <th scope="col" className="p-3">Written paper</th>
                                <th scope="col" className="p-3">Preparation distinction</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DGCA_PAPERS.map((paper, index) => (
                                <tr key={paper} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <th scope="row" className="p-3 text-left font-semibold text-av-blue">{paper}</th>
                                    <td className="p-3 text-gray-600">Part of the DGCA written-paper preparation.</td>
                                </tr>
                            ))}
                            <tr className="bg-gray-50">
                                <th scope="row" className="p-3 text-left font-semibold text-av-blue">{RTR.name}</th>
                                <td className="p-3 text-gray-600">Prepared separately; examined under its own rules.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="bg-gray-50">
                <div className="mx-auto max-w-5xl px-4 py-12">
                    <h2 className={headingClass}>Classroom in Dwarka; online batches outside Delhi</h2>
                    <p className={paragraphClass}>
                        The academy’s physical classroom is at {ACADEMY.streetAddress}, {ACADEMY.addressLocality}, {ACADEMY.addressRegion} {ACADEMY.postalCode}. Classroom teaching is offered at this location. Students outside Delhi can join online batches; that does not establish a branch, classroom, or local office in another place.
                    </p>
                    <p className={paragraphClass}>
                        Ground classes cover theory preparation. Flight training is a separate stage arranged with partner flying schools and takes place at the selected school, not at the Dwarka classroom. The academy does not own aircraft or operate a flying school.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/dgca-ground-classes" className={linkClass}>Detailed DGCA ground-class information</Link>
                        <Link href="/commercial-pilot-license" className={linkClass}>CPL pathway and eligibility</Link>
                        <Link href="/pilot-training-in-india" className={linkClass}>Pilot training pathway in India</Link>
                        <Link href="/pilot-training-in-delhi" className={linkClass}>Delhi training information</Link>
                        <Link href="/pilot-training-in-dwarka" className={linkClass}>Dwarka classroom details</Link>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-12">
                <h2 className={headingClass}>Frequently asked questions</h2>
                <div className="space-y-5">
                    {faqItems.map(({ q, a }) => (
                        <article key={q} className="border-b border-gray-200 pb-4">
                            <h3 className="mb-2 font-semibold text-av-blue">{q}</h3>
                            <p className="text-sm leading-6 text-gray-600">{a}</p>
                        </article>
                    ))}
                </div>
                <p className="mt-8 text-sm text-gray-600">
                    See the <Link href="/about-us" className={linkClass}>academy’s scope and role</Link>, or{' '}
                    <Link href="/contact" className={linkClass}>contact We One Aviation</Link> about classroom or online access.
                </p>
            </section>
        </Layout>
    );
}
