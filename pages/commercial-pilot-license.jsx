import Link from 'next/link';
import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import Breadcrumb from '../components/Breadcrumb';
import { ACADEMY, CPL_HOURS, DGCA_PAPERS, EDUCATION, MEDICAL, RTR, papersSummary } from '../lib/facts';
import { generateFAQSchema } from '../lib/schema';

const canonicalUrl = `${ACADEMY.url}/commercial-pilot-license`;

const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonicalUrl,
    url: canonicalUrl,
    name: 'Commercial Pilot Licence (CPL) Pathway in India',
    about: { '@id': `${ACADEMY.url}/#organization` },
    publisher: { '@id': `${ACADEMY.url}/#organization` },
    inLanguage: 'en-IN',
};

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: 'Commercial Pilot Licence (CPL) Pathway in India',
    description: 'Eligibility, DGCA ground preparation, required flight experience, and how We One Aviation’s classroom and online teaching relate to partner-arranged flight training.',
    mainEntityOfPage: { '@id': canonicalUrl },
    author: { '@id': `${ACADEMY.url}/#organization` },
    publisher: { '@id': `${ACADEMY.url}/#organization` },
    dateModified: '2026-09-29',
    inLanguage: 'en-IN',
    image: { '@type': 'ImageObject', url: `${ACADEMY.url}/Logo.webp` },
};

const faqItems = [
    {
        q: 'What are the main eligibility requirements for an Indian CPL?',
        a: `${EDUCATION.requirement}; a minimum age of 18 on the date of application; and a ${MEDICAL.short}. See the current Aircraft Rules and DGCA instructions before applying.`,
    },
    {
        q: 'Which DGCA written papers are part of CPL preparation?',
        a: `The ${DGCA_PAPERS.length} written papers are ${papersSummary()}. ${RTR.name} is prepared and examined separately.`,
    },
    {
        q: 'How many flight hours does the CPL require?',
        a: `${CPL_HOURS.total} hours as pilot of an aeroplane, completed within the ${CPL_HOURS.recencyYears} years immediately before the licence application.`,
    },
    {
        q: 'Where does We One Aviation provide training?',
        a: `Classroom ground classes run at ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality}, ${ACADEMY.addressRegion} ${ACADEMY.postalCode}. Students outside Delhi can join online batches. Flight training is arranged with partner flying schools and takes place at the selected school, not at the academy classroom.`,
    },
    {
        q: 'How long does it take to complete the CPL pathway?',
        a: 'No single end-to-end duration is stated here. The time depends on the student’s progress and the selected flying school, including aircraft availability and weather. Confirm the training schedule directly with the school before enrolling.',
    },
    {
        q: 'Does this page state academy or flying-school fees?',
        a: 'No. Current academy course fees and partner flying-school charges are not published here. Request current written terms and separate quotes for ground teaching, flying, examinations, and other charges before paying.',
    },
];

const headingClass = 'mb-4 font-montserrat text-2xl font-bold text-av-blue';
const paragraphClass = 'mb-4 text-sm leading-7 text-gray-600';
const linkClass = 'font-semibold text-av-blue underline decoration-av-orange underline-offset-4 hover:text-av-orange';

export default function CommercialPilotLicense() {
    return (
        <Layout
            title="Commercial Pilot Licence (CPL) Pathway in India | We One Aviation"
            description="Understand Indian CPL eligibility, DGCA written-paper preparation, required flight experience, and We One Aviation’s Dwarka classroom, online batches, and partner-arranged flight training."
        >
            <StructuredData data={[pageSchema, articleSchema, generateFAQSchema(faqItems)]} />

            <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue px-4 py-14 text-white">
                <div className="mx-auto max-w-5xl">
                    <Breadcrumb />
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-av-orange">CPL pathway guide</p>
                    <h1 className="mb-5 font-montserrat text-3xl font-black leading-tight md:text-5xl">
                        Commercial Pilot Licence (CPL) in India
                    </h1>
                    <p className="max-w-3xl text-base leading-7 text-white/80">
                        An Indian CPL pathway includes meeting the academic and medical requirements, clearing DGCA examinations, and completing the required flight experience. We One Aviation teaches DGCA ground subjects from Dwarka and online for students outside Delhi; flight training is arranged with partner flying schools.
                    </p>
                    <Link href="/contact" className="mt-7 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue">
                        Contact the academy
                    </Link>
                </div>
            </header>

            <div className="mx-auto max-w-5xl space-y-12 px-4 py-12">
                <section>
                    <h2 className={headingClass}>CPL eligibility in India</h2>
                    <p className={paragraphClass}>
                        Under the cited Aircraft Rules, 1937, Schedule II, Section J, a CPL applicant must meet the age and education requirements, satisfy the applicable medical requirement, pass the prescribed examinations, and complete the required flight experience.
                    </p>
                    <ul className="list-disc space-y-2 pl-6 text-sm leading-6 text-gray-600">
                        <li>{EDUCATION.requirement}. {EDUCATION.altRoute}</li>
                        <li>Minimum age: 18 on the date of application.</li>
                        <li>{MEDICAL.short}: {MEDICAL.clause}.</li>
                    </ul>
                </section>

                <section className="rounded-2xl bg-gray-50 p-6 md:p-8">
                    <h2 className={headingClass}>DGCA ground preparation and flight training are separate stages</h2>
                    <p className={paragraphClass}>
                        Ground preparation covers {papersSummary()}. {RTR.name} is prepared separately from the {DGCA_PAPERS.length} written papers. The current pass mark and examination requirements are set by DGCA, not by the academy.
                    </p>
                    <p className={paragraphClass}>
                        CPL applicants must complete {CPL_HOURS.total} hours of flight time as pilot of an aeroplane within the {CPL_HOURS.recencyYears} years before applying. Flight hours are completed through a flying training organisation, not in the academy’s Dwarka classroom.
                    </p>
                    <p className={paragraphClass}>
                        We One Aviation teaches DGCA ground subjects and arranges flight training with partner flying schools. The academy does not own aircraft or operate a flying school. Confirm a school’s current DGCA status, terms, schedule, and charges directly before enrolling.
                    </p>
                    <Link href="/dgca-ground-classes" className={linkClass}>See DGCA ground-class details</Link>
                </section>

                <section>
                    <h2 className={headingClass}>Where students can access We One Aviation teaching</h2>
                    <p className={paragraphClass}>
                        Classroom batches run at {ACADEMY.streetAddress}, {ACADEMY.addressLocality}, {ACADEMY.addressRegion} {ACADEMY.postalCode}. Students outside Delhi can join online batches. Online access does not mean the academy has a physical branch in another city.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/pilot-training-in-india" className={linkClass}>Pilot-training pathway in India</Link>
                        <Link href="/dgca-ground-classes-in-india" className={linkClass}>DGCA ground classes in India</Link>
                        <Link href="/pilot-training-in-delhi" className={linkClass}>Delhi training information</Link>
                        <Link href="/pilot-training-in-dwarka" className={linkClass}>Dwarka classroom details</Link>
                        <Link href="/about-us" className={linkClass}>About the academy</Link>
                    </div>
                </section>

                <section>
                    <h2 className={headingClass}>Fees and timelines</h2>
                    <p className={paragraphClass}>
                        This guide does not give an academy price, a partner-school fee, or a guaranteed course duration. Costs and timing depend on the services and school selected. Ask for written, itemised current terms and compare ground teaching, flight training, examinations, medicals, and other charges separately.
                    </p>
                    <p className={paragraphClass}>
                        DGCA’s examination charges are separate from training-provider fees. For current official examination information, use the{' '}
                        <a href="https://pariksha.dgca.gov.in" className={linkClass} target="_blank" rel="noreferrer">DGCA Pariksha portal</a>.
                    </p>
                </section>

                <section>
                    <h2 className={headingClass}>Frequently asked questions</h2>
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
