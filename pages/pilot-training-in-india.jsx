import Link from 'next/link';
import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import { ACADEMY, CPL_HOURS, DGCA_PAPERS, EDUCATION, EXAM_RULES, PARIKSHA, LICENCES, inr, papersSummary } from '../lib/facts';
import { generateFAQSchema } from '../lib/schema';

const canonicalUrl = `${ACADEMY.url}/pilot-training-in-india`;

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: 'Pilot Training in India: Pathway and How to Access Training',
    description: 'The Indian pilot-training pathway, DGCA ground preparation, the academy’s Dwarka classroom, online batches for students outside Delhi, and partner-arranged flying training.',
    inLanguage: 'en-IN',
    dateModified: '2026-09-30',
    mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
    author: { '@id': `${ACADEMY.url}/#organization` },
    publisher: { '@id': `${ACADEMY.url}/#organization` },
    image: { '@type': 'ImageObject', url: `${ACADEMY.url}/Logo.webp` },
};

const faqs = [
    {
        q: 'Where does We One Aviation Academy hold classroom classes?',
        a: `Classroom DGCA ground classes are held at ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality}, ${ACADEMY.addressRegion} ${ACADEMY.postalCode}. This is the academy's stated physical classroom location.`,
    },
    {
        q: 'Can students outside Delhi study with We One Aviation?',
        a: 'Students outside Delhi can join online batches for DGCA ground-class preparation. Online study does not mean that the academy has a physical branch in the student’s city.',
    },
    {
        q: 'Does We One Aviation operate a flying school?',
        a: 'No. We One Aviation teaches DGCA ground subjects and arranges flight training with partner flying schools. It does not own aircraft or operate a flying school; flight training takes place at the selected flying school.',
    },
    {
        q: 'Is We One Aviation a pilot school in India?',
        a: `We One Aviation is an aviation education academy that teaches DGCA ground subjects from its Dwarka classroom and offers online batches to students outside Delhi. It does not operate a flying school or a DGCA-approved Flying Training Organisation; flight training is arranged with partner flying schools and takes place at the selected school.`,
    },
    {
        q: 'What are the main stages of the CPL pathway in India?',
        a: `The pathway includes meeting the eligibility requirements, preparing for and passing the ${DGCA_PAPERS.length} DGCA written papers, completing the required flight training at a flying training organisation, and applying for the licence under the applicable rules. The academy teaches ground subjects and can arrange flight training with partner flying schools.`,
    },
];

const sectionClass = 'mx-auto max-w-5xl px-4 py-12';
const paragraphClass = 'mb-4 text-sm leading-7 text-gray-600';
const headingClass = 'mb-4 font-montserrat text-2xl font-bold text-av-blue';
const linkClass = 'font-semibold text-av-blue underline decoration-av-orange underline-offset-4 hover:text-av-orange';

export default function PilotTrainingInIndia() {
    return (
        <Layout
            title="Pilot Training in India: Pathway & Training Access | We One Aviation"
            description="Understand the pilot-training pathway in India, DGCA ground preparation, classroom classes in Dwarka, online batches for students outside Delhi, and how flight training is arranged."
        >
            <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

            <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue px-4 py-16 text-white">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-av-orange">National pathway and access</p>
                    <h1 className="mb-5 font-montserrat text-3xl font-black leading-tight md:text-5xl">
                        Pilot Training in India: Pathway and How to Access Training
                    </h1>
                    <p className="max-w-3xl text-base leading-7 text-white/80">
                        We One Aviation Academy teaches DGCA ground subjects from its classroom in Dwarka, New Delhi, and offers online batches to students outside Delhi. Flight training is a separate stage arranged with partner flying schools; it does not take place at the academy classroom.
                    </p>
                    <Link href="/contact" className="mt-7 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue">
                        Contact the academy
                    </Link>
                </div>
            </header>

            <section className={sectionClass}>
                <h2 className={headingClass}>What We One Aviation provides</h2>
                <p className={paragraphClass}>
                    We One Aviation Academy is an aviation education organization. It teaches the DGCA ground subjects and arranges flight training with partner flying schools. The academy does not own aircraft or simulators, operate a flying school, employ pilots, or place students into airline jobs; airline hiring decisions rest with the operator.
                </p>
                <p className={paragraphClass}>
                    People comparing a pilot school or pilot academy in India should distinguish DGCA ground-subject teaching from the flying stage. We One Aviation provides ground preparation and guidance; it is not a flying training organisation, and students complete flight training at the selected partner school.
                </p>
                <div className="grid gap-5 md:grid-cols-2">
                    <article className="rounded-2xl border border-gray-200 p-6">
                        <h3 className="mb-2 font-montserrat text-lg font-bold text-av-blue">Ground classes</h3>
                        <p className="text-sm leading-6 text-gray-600">
                            Prepare for the {DGCA_PAPERS.length} DGCA written papers: {papersSummary()}. RTR (A) preparation is handled separately from those written papers.
                        </p>
                        <Link href="/dgca-ground-classes" className={`mt-4 inline-block ${linkClass}`}>DGCA ground-class details</Link>
                    </article>
                    <article className="rounded-2xl border border-gray-200 p-6">
                        <h3 className="mb-2 font-montserrat text-lg font-bold text-av-blue">CPL pathway</h3>
                        <p className="text-sm leading-6 text-gray-600">
                            A CPL pathway combines eligibility, DGCA examinations, and flight training at a flying training organisation. The academy’s ground teaching and its partner-arranged flying stage are distinct parts of that pathway.
                        </p>
                        <Link href="/commercial-pilot-license" className={`mt-4 inline-block ${linkClass}`}>Read the CPL pathway guide</Link>
                    </article>
                </div>
            </section>

            <section className="bg-gray-50">
                <div className={sectionClass}>
                    <h2 className={headingClass}>Where classes happen and who can access them</h2>
                    <p className={paragraphClass}>
                        The academy’s physical classroom is at {ACADEMY.streetAddress}, {ACADEMY.addressLocality}, {ACADEMY.addressRegion} {ACADEMY.postalCode}. Classroom batches are held there. Students outside Delhi can join online batches; the academy does not claim a branch or classroom in their city.
                    </p>
                    <p className={paragraphClass}>
                        Flight training does not happen at the Dwarka classroom. We One Aviation arranges flight training with partner flying schools, and students complete the flying stage at the selected school. The academy does not own or operate those schools or guarantee admission, training availability, or an airline job.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/pilot-training-in-delhi" className={linkClass}>Delhi training and local pathway</Link>
                        <Link href="/pilot-training-in-dwarka" className={linkClass}>Dwarka classroom details</Link>
                        <Link href="/about-us" className={linkClass}>About We One Aviation Academy</Link>
                        <Link href="/contact" className={linkClass}>Contact and application enquiry</Link>
                    </div>
                </div>
            </section>

            <section className={sectionClass}>
                <h2 className={headingClass}>What the CPL pathway requires</h2>
                <p className={paragraphClass}>
                    The requirements below come from the project’s cited regulatory facts, not an academy promise. Check current DGCA instructions before applying because the regulator controls examination and licensing procedures.
                </p>
                <ul className="mb-6 list-disc space-y-2 pl-6 text-sm leading-6 text-gray-600">
                    <li>{EDUCATION.requirement}</li>
                    <li>Minimum age for a CPL: {LICENCES.find((licence) => licence.code === 'CPL').minAge}, under {LICENCES.find((licence) => licence.code === 'CPL').section} of Schedule II.</li>
                    <li>{DGCA_PAPERS.length} written papers, with a pass mark of {EXAM_RULES.theory.passMark}% in each paper.</li>
                    <li>{CPL_HOURS.total} hours of flight time, within the {CPL_HOURS.recencyYears} years before licence application.</li>
                    <li>DGCA examination fees are paid to the regulator: {inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session or {inr(PARIKSHA.fees.olodePerPaper)} for an on-demand examination.</li>
                </ul>
                <p className={paragraphClass}>
                    These are regulatory requirements and examination charges, not We One Aviation course fees. Course prices, partner-school charges, and training timelines are not published here because current academy and partner terms have not been verified.
                </p>
                <Link href="/commercial-pilot-license" className={linkClass}>See the detailed CPL eligibility and pathway guide</Link>
            </section>

            <section className="bg-av-blue px-4 py-12 text-white">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-5 font-montserrat text-2xl font-bold">Questions students ask</h2>
                    <div className="space-y-5">
                        {faqs.map(({ q, a }) => (
                            <article key={q}>
                                <h3 className="mb-1 font-semibold text-av-orange">{q}</h3>
                                <p className="text-sm leading-6 text-white/80">{a}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={`${sectionClass} flex flex-wrap items-center justify-between gap-5`}>
                <div>
                    <h2 className="font-montserrat text-xl font-bold text-av-blue">Start with the stage you need</h2>
                    <p className="mt-2 text-sm text-gray-600">Compare the CPL pathway and DGCA ground-class details, then contact the academy about classroom or online access.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <Link href="/dgca-ground-classes" className={linkClass}>Ground classes</Link>
                    <Link href="/commercial-pilot-license" className={linkClass}>CPL guide</Link>
                    <Link href="/contact" className={linkClass}>Contact</Link>
                </div>
            </section>
        </Layout>
    );
}
