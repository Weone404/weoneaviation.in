import Link from 'next/link';
import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import { ACADEMY, DGCA_PAPERS, RTR, papersSummary } from '../lib/facts';
import { generateCourseSchema, generateFAQSchema } from '../lib/schema';

const canonicalUrl = `${ACADEMY.url}/dgca-ground-classes`;

const courseSchema = generateCourseSchema({
    name: 'DGCA Ground Classes',
    description: `Preparation for the ${DGCA_PAPERS.length} DGCA written papers: ${papersSummary()}. ${RTR.name} preparation is separate. Classroom batches are held in Dwarka, New Delhi; students outside Delhi can join online batches.`,
    url: canonicalUrl,
    additionalProperties: [
        { name: 'Written papers', value: `${DGCA_PAPERS.length}: ${papersSummary()}` },
        { name: 'RTR (A)', value: 'Prepared separately from the written papers' },
    ],
});

const faqItems = [
    {
        q: 'What are DGCA ground classes?',
        a: `They are theory preparation for the DGCA written papers: ${papersSummary()}. ${RTR.name} preparation is separate from the written papers.`,
    },
    {
        q: 'Where are classroom DGCA ground classes held?',
        a: `Classroom batches are held at ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality}, ${ACADEMY.addressRegion} ${ACADEMY.postalCode}.`,
    },
    {
        q: 'Can students outside Delhi join online?',
        a: 'Students outside Delhi can join online batches. Online access does not mean that We One Aviation has a physical branch in their city.',
    },
    {
        q: 'Does We One Aviation provide the flight-training hours?',
        a: 'The academy teaches DGCA ground subjects and arranges flight training with partner flying schools. Flight training takes place at the selected flying school; We One Aviation does not own aircraft or operate a flying school.',
    },
    {
        q: 'What does the DGCA ground course cost?',
        a: 'This page does not publish current academy course fees or partner flying-school charges. Contact the academy for current written terms before making a payment.',
    },
];

const linkClass = 'font-semibold text-av-blue underline decoration-av-orange underline-offset-4 hover:text-av-orange';
const paragraphClass = 'mb-4 text-sm leading-7 text-gray-600';

export default function DGCAGroundClasses() {
    return (
        <Layout
            title="DGCA Ground Classes | We One Aviation Academy"
            description="Prepare for the five DGCA written papers with We One Aviation Academy. Classroom batches are held in Dwarka, New Delhi; students outside Delhi can join online."
        >
            <StructuredData data={[courseSchema, generateFAQSchema(faqItems)]} />

            <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue px-4 py-16 text-white">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-av-orange">Theory preparation</p>
                    <h1 className="mb-5 font-montserrat text-3xl font-black leading-tight md:text-5xl">
                        DGCA Ground Classes
                    </h1>
                    <p className="max-w-3xl text-base leading-7 text-white/80">
                        We One Aviation Academy prepares students for {papersSummary()}. {RTR.name} preparation is separate from those written papers. Classroom batches run in Dwarka, New Delhi, and students outside Delhi can join online batches.
                    </p>
                    <Link href="/contact" className="mt-7 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue">
                        Contact the academy
                    </Link>
                </div>
            </header>

            <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
                <section>
                    <h2 className="mb-4 font-montserrat text-2xl font-bold text-av-blue">Written-paper preparation</h2>
                    <p className={paragraphClass}>
                        DGCA sets the examinations and licensing requirements. The academy’s role is ground-subject teaching and preparation; passing an examination or receiving a licence is not guaranteed by enrolling in classes.
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {DGCA_PAPERS.map((paper) => (
                            <li key={paper} className="rounded-xl border border-gray-200 bg-white p-4 text-sm font-semibold text-av-blue">{paper}</li>
                        ))}
                    </ul>
                    <p className={`${paragraphClass} mt-4`}>
                        {RTR.name} is prepared separately from the five written papers and is examined under its own rules.
                    </p>
                    <p className={paragraphClass}>
                        For the full licence route, eligibility and regulatory stages, read the{' '}
                        <Link href="/commercial-pilot-license" className={linkClass}>CPL pathway guide</Link>.
                    </p>
                </section>

                <section className="rounded-2xl bg-gray-50 p-6 md:p-8">
                    <h2 className="mb-4 font-montserrat text-2xl font-bold text-av-blue">Classroom and online access</h2>
                    <p className={paragraphClass}>
                        Classroom batches are held at {ACADEMY.streetAddress}, {ACADEMY.addressLocality}, {ACADEMY.addressRegion} {ACADEMY.postalCode}. Students outside Delhi can join online batches. The academy’s only verified physical classroom is this Dwarka location.
                    </p>
                    <p className={paragraphClass}>
                        Flight training is a separate stage. We One Aviation arranges it with partner flying schools, and it takes place at the selected school. The academy does not own aircraft or operate a flying school.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/pilot-training-in-india" className={linkClass}>Pilot-training pathway in India</Link>
                        <Link href="/pilot-training-in-delhi" className={linkClass}>Delhi training information</Link>
                        <Link href="/pilot-training-in-dwarka" className={linkClass}>Dwarka classroom details</Link>
                        <Link href="/pilot-training-near" className={linkClass}>Classroom and online access across Delhi</Link>
                        <Link href="/about-us" className={linkClass}>About the academy</Link>
                        <Link href="/contact" className={linkClass}>Contact and ask about current course terms</Link>
                    </div>
                </section>

                <section>
                    <h2 className="mb-5 font-montserrat text-2xl font-bold text-av-blue">Frequently asked questions</h2>
                    <div className="space-y-5">
                        {faqItems.map(({ q, a }) => (
                            <article key={q} className="border-b border-gray-200 pb-4">
                                <h3 className="mb-2 font-semibold text-av-blue">{q}</h3>
                                <p className="text-sm leading-6 text-gray-600">{a}</p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
