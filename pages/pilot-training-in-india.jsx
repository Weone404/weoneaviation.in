import Link from 'next/link';
import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import { ACADEMY, CPL_HOURS, DGCA_PAPERS, EDUCATION, EXAM_RULES, PARIKSHA, LICENCES, inr, papersSummary } from '../lib/facts';
import { generateFAQSchema } from '../lib/schema';
import {
    INDIA_CITY_MEDICAL_REFERENCE_SLUGS,
    LOCATIONS,
} from '../data/location-seo/locations';

const canonicalUrl = `${ACADEMY.url}/pilot-training-in-india`;

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    headline: 'Pilot Training in India: The Pathway and How to Access Training',
    description: 'A practical guide to pilot training in India: DGCA ground-subject preparation, We One Aviation’s Dwarka classroom and online batches for students outside Delhi, medical steps, and the separate flying stage at an FTO.',
    inLanguage: 'en-IN',
    dateModified: '2026-10-03',
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
    {
        q: 'Can I study DGCA ground subjects with We One Aviation if I live outside Delhi?',
        a: 'Yes. The academy states that students outside Delhi can join online batches for DGCA ground-subject preparation. This does not mean there is a We One Aviation branch, classroom, or local instructor in the student’s city. Contact the academy to confirm current batch format and availability.',
    },
    {
        q: 'Does online ground training include CPL flying?',
        a: 'No. Online classes cover ground-subject preparation. The aircraft flying stage is separate and must be completed at a flying training organisation. We One Aviation says it arranges flight training through partner schools; the student should confirm the selected school, location, approval status, admission terms, and availability directly.',
    },
    {
        q: 'What should I check before selecting a DGCA flying training organisation?',
        a: 'Check the current DGCA approved-FTO list, the approval validity and approved operating base, then confirm aircraft and instructor availability, training sequence, fees, refund terms, and expected charges directly with the organisation in writing. A ranking or approval listing does not guarantee current seats or a particular completion date.',
    },
    {
        q: 'How do DGCA medicals fit into pilot training?',
        a: 'Medical requirements depend on the licence sought. The published guidance distinguishes Class 2 and Class 1 requirements; check the current DGCA rules, the applicable examination type, listed centre or examiner scope, and appointment availability before travelling. Medical facilities are independent of We One Aviation.',
    },
    {
        q: 'Does We One Aviation have branches in Mumbai, Bengaluru, Lucknow, Kolkata, or Thiruvananthapuram?',
        a: 'The academy’s documented physical classroom is in Dwarka, Delhi. It states that students outside Delhi can join online ground-class batches, but it does not claim branches or classrooms in these cities. Flight training is separate and takes place at the selected partner flying school.',
    },
];

const sectionClass = 'mx-auto max-w-5xl px-4 py-12';
const paragraphClass = 'mb-4 text-sm leading-7 text-gray-600';
const headingClass = 'mb-4 font-montserrat text-2xl font-bold text-av-blue';
const linkClass = 'font-semibold text-av-blue underline decoration-av-orange underline-offset-4 hover:text-av-orange';
const cityMedicalReferences = INDIA_CITY_MEDICAL_REFERENCE_SLUGS
    .map((slug) => LOCATIONS.find((location) => location.slug === slug))
    .filter(Boolean);
const otherCityGuides = LOCATIONS.filter(
    (location) => location.indexable
        && location.supportedServices.includes('pilot-training')
        && !['delhi', 'dwarka'].includes(location.slug),
);

const cityAviationContext = [
    {
        city: 'Lucknow and the wider Uttar Pradesh region',
        detail: 'The Lucknow airport operator reports that commercial operations under Lucknow International Airport Limited began on 2 November 2020. Separately, IGRUA describes its DGCA-approved ab-initio to CPL course at Fursatganj Airfield, Amethi—not at a Lucknow city campus. These are regional aviation facts, not a We One Aviation service or partner claim.',
        sources: [
            { label: 'Lucknow airport operator information', url: 'https://ccsia-lucknow.adaniairports.com/en/about-us' },
            { label: 'IGRUA approved courses', url: 'https://igrua.gov.in/approved-courses' },
            { label: 'DGCA approved FTO list (30 March 2026)', url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/training/pilot/flrTrainOrgs/flyclub.pdf' },
        ],
    },
    {
        city: 'Kolkata and West Bengal',
        detail: 'AAI describes Kolkata airport’s position on the east bank of the Hooghly. DGCA’s 30 March 2026 FTO inventory lists Chetak Aviation and Pioneer Flying Academy at Panagarh Airport, West Bengal; those entries are regional context, not Kolkata-city training and not a relationship with We One Aviation.',
        sources: [
            { label: 'AAI Kolkata airport', url: 'https://www.aai.aero/en/airports/kolkata' },
            { label: 'DGCA approved FTO list (30 March 2026)', url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/training/pilot/flrTrainOrgs/flyclub.pdf' },
        ],
    },
    {
        city: 'Thiruvananthapuram',
        detail: 'The airport operator reports the airport was established in 1932 and was about 3.7 km from the city centre in its published description. DGCA’s 30 March 2026 FTO inventory lists Rajiv Gandhi Academy for Aviation Technology at the international airport. A listing does not establish current admissions, seat availability, or any connection to We One Aviation.',
        sources: [
            { label: 'Thiruvananthapuram International Airport, About Us', url: 'https://thiruvananthapuram.adaniairports.com/en/about-us' },
            { label: 'DGCA approved FTO list (30 March 2026)', url: 'https://public-prd-dgca.s3.ap-south-1.amazonaws.com/InventoryList/personal/training/pilot/flrTrainOrgs/flyclub.pdf' },
        ],
    },
];

export default function PilotTrainingInIndia() {
    return (
        <Layout
            title="Pilot Training in India: CPL Pathway & Online Ground Classes | We One Aviation"
            description="Understand the India CPL pathway, DGCA ground-subject preparation at We One Aviation’s Dwarka classroom or online for students outside Delhi, medical steps, and flight training at an FTO."
        >
            <StructuredData data={[articleSchema, generateFAQSchema(faqs)]} />

            <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue px-4 py-16 text-white">
                <div className="mx-auto max-w-5xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-av-orange">National pathway and access</p>
                    <h1 className="mb-5 font-montserrat text-3xl font-black leading-tight md:text-5xl">
                        Pilot Training in India: The Pathway and How to Access Training
                    </h1>
                    <p className="max-w-3xl text-base leading-7 text-white/80">
                        Pilot training in India combines DGCA ground-subject preparation, medical and examination requirements, and a separate flying stage at a flying training organisation. We One Aviation teaches ground subjects at its Dwarka classroom and states that students outside Delhi can join online batches; it does not operate an FTO.
                    </p>
                    <Link href="/contact" className="mt-7 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue">
                        Contact the academy
                    </Link>
                </div>
            </header>

            <section className={sectionClass}>
                <h2 className={headingClass}>What We One Aviation provides</h2>
                <p className={paragraphClass}>
                    We One Aviation Academy is an aviation education academy. Its physical classroom is at {ACADEMY.streetAddress}, {ACADEMY.addressLocality}, {ACADEMY.addressRegion} {ACADEMY.postalCode}, India, where it teaches DGCA ground subjects. The academy also states that students outside Delhi can join online batches and that it arranges flight training through partner flying schools; flying takes place at the selected school, not at the academy.
                </p>
                <p className={paragraphClass}>
                    Ground-subject preparation and flight training are different services. We One Aviation does not own or operate an aircraft or flying school, and it should not be described as a DGCA-approved FTO. Students should verify the FTO and its current operating base independently before committing to the flying stage.
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
                    <h2 className={headingClass}>How can students from other cities study?</h2>
                    <p className={paragraphClass}>
                        Students living outside Delhi can contact We One Aviation about its stated online batches for DGCA ground-subject preparation. The academy’s only documented physical classroom is in Dwarka; online access does not create a city branch, local classroom, local instructor, or local flying base. Confirm current format and availability with the academy before enrolling.
                    </p>
                    {otherCityGuides.length > 0 && (
                        <ul className="mb-6 flex flex-wrap gap-x-6 gap-y-3">
                            {otherCityGuides.map((location) => (
                                <li key={location.slug}>
                                    <Link href={`/${location.slug}/pilot-training`} className={linkClass}>
                                        {location.city} pilot-training information
                                    </Link>
                                    <span className="text-sm text-gray-600"> — independently sourced local guidance; not a branch listing.</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p className={paragraphClass}>
                        Students in Mumbai, Bengaluru, Lucknow, Kolkata, Thiruvananthapuram, or elsewhere can describe their location and intended licence when they enquire. Ask about the current online batch, the subjects covered, how teaching is delivered, and what next steps apply. Do not assume a local academy or FTO is included.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                        {cityAviationContext.map((item) => (
                            <article key={item.city} className="rounded-xl border border-gray-200 bg-white p-5">
                                <h3 className="font-semibold text-av-blue">{item.city}: independent aviation context</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600">{item.detail}</p>
                                <ul className="mt-3 space-y-1 text-sm">
                                    {item.sources.map((source) => (
                                        <li key={source.url}>
                                            <a
                                                className={linkClass}
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {source.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className={sectionClass}>
                <h2 className={headingClass}>What happens at a flying training organisation?</h2>
                <p className={paragraphClass}>
                    A CPL requires a separate aircraft flying stage at an FTO; online or classroom ground preparation does not provide aircraft time. We One Aviation says it arranges flight training through partner schools, but does not operate an FTO. Before choosing a school, verify the current DGCA approval, approved base, course availability, and written commercial terms directly with that organisation.
                </p>
                <ol className="mb-5 list-decimal space-y-2 pl-6 text-sm leading-6 text-gray-600">
                    <li>Check the current DGCA approved-FTO list and confirm the approval covers the organisation and the base where training will occur.</li>
                    <li>Ask the school to confirm current aircraft and instructor availability, admissions, training sequence, and any waiting periods.</li>
                    <li>Request a written, itemised quotation and read payment, refund, interruption, and transfer terms before paying.</li>
                    <li>Compare the current DGCA FTO ranking as one input—not as a promise of a seat, completion date, or outcome.</li>
                </ol>
                <p className={paragraphClass}>
                    The DGCA FTO roster is separate from a ground-school provider’s services. Read the{' '}
                    <Link href="/cpl-flight-training" className={linkClass}>CPL flight-training guide</Link> and{' '}
                    <Link href="/how-to-choose-an-aviation-academy" className={linkClass}>academy and school selection guide</Link>,
                    then confirm current details with DGCA and the chosen FTO.
                </p>
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
                    <p className={paragraphClass}>
                        Medical examinations are a separate regulatory step, not an academy service. The required class depends on the licence sought; check current DGCA requirements, centre scope, and appointment availability directly. See the{' '}
                        <Link href="/dgca-class-2-class-1-medical" className={linkClass}>DGCA Class 1 and Class 2 medical guide</Link>.
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
                <h2 className={headingClass}>What local aviation and medical information does—and does not—show</h2>
                <p className={paragraphClass}>
                    The local city guides below use DGCA’s dated Class 1 inventory to identify listed facilities and their stated scope. These independent medical facilities are not We One Aviation branches, classrooms, or flying schools. A medical listing or an airport nearby does not prove local pilot training or We One Aviation availability; confirm current DGCA listings, scope, and appointments before travel.
                </p>
                <ul className="grid gap-4 sm:grid-cols-2">
                    {cityMedicalReferences.map((location) => (
                        <li key={location.slug} className="rounded-xl border border-gray-200 p-5">
                            {location.indexable ? (
                                <Link href={`/${location.slug}/pilot-training`} className={linkClass}>
                                    {location.city} pilot-training guidance
                                </Link>
                            ) : (
                                <h3 className="font-semibold text-av-blue">
                                    {location.city} DGCA Class 1 medical reference
                                </h3>
                            )}
                            <p className="mt-2 text-sm leading-6 text-gray-600">
                                DGCA list updated {location.medicalCentresAsOf}:{' '}
                                {location.medicalCentres.map(({ name, scope }) => `${name} (${scope})`).join('; ')}.
                            </p>
                        </li>
                    ))}
                </ul>
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
