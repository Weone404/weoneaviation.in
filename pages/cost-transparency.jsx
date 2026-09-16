import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import LeadForm from '../components/LeadForm';
import Link from 'next/link';
import { CPL_COST, PARIKSHA, CPL_HOURS, MEDICAL_STANDARDS as MED, RTR, inr, ACADEMY } from '../lib/facts';

/*
 * /cost-transparency — rebuilt 2026-09-15. Backlog item 2.6, and a correction.
 *
 * WHY THIS URL. 25 internal links point here, more than any other cost page,
 * and it imported no sourced facts. It also carried a wrong number: "₹3,000 per
 * paper" for the DGCA examination fee, when the fee is ₹2,500 in a regular
 * session and ₹5,000 for an Online On-Demand Examination. A wrong figure on a
 * page about money is worse than a thin one.
 *
 * WHAT IS DELIBERATELY NOT HERE. A total. The old page led with "₹40-55 Lakhs"
 * and the site states the same figure three other ways elsewhere; none of them
 * is sourced. No Indian government body publishes a market price for flying
 * training — checked against DGCA, the Ministry of Civil Aviation, PIB and
 * parliamentary answers, which give flying-school counts and licences issued
 * and never fees. Every range in circulation traces back to coaching blogs
 * quoting each other.
 *
 * So the page is built the other way round: state the two kinds of cost that
 * CAN be sourced — DGCA's own statutory fees, and the one published price from
 * a government academy — then give the reader the questions that make two
 * private quotes comparable. That is more useful than a range and it is
 * defensible.
 *
 * NO 301s ARE ISSUED HERE. /blogs/pilot-training-cost-in-india and
 * /lead-magnets/cpl-cost-breakdown still chase this intent, and the blog is the
 * only one currently ranking. Which URL becomes canonical is the owner's
 * decision and needs Search Console data first — backlog item 2.5. Until then
 * this page links to them rather than competing blindly.
 */

const CANONICAL = 'https://weoneaviation.in/cost-transparency';
const CHECKED_ON = '15 September 2026';

const contents = [
    ['statutory', 'What DGCA actually charges'],
    ['benchmark', 'The one published price from an authority'],
    ['outside', 'What sits outside every quote'],
    ['compare', 'Seven questions that make two quotes comparable'],
    ['no-range', 'Why there is no total on this page'],
    ['faqs', 'Frequently asked questions'],
    ['sources', 'Sources'],
];

const statutory = [
    { item: 'Written paper, regular session', fee: inr(PARIKSHA.fees.regularPerPaper), note: 'Per paper. Five papers for a CPL.' },
    { item: 'Written paper, Online On-Demand Examination', fee: inr(PARIKSHA.fees.olodePerPaper), note: 'Per paper, for the on-demand sessions.' },
    { item: 'Oral paper', fee: inr(PARIKSHA.fees.oralPerPaper), note: PARIKSHA.fees.oralNote },
];

const outside = [
    { item: 'The medical', detail: 'Charged by the DGCA-approved centre, not by DGCA and not by a flying school. A Class 2 to train and a Class 1 for the licence, and the Class 1 renews annually to age 60.' },
    { item: RTR.name, detail: `Required for the licence and examined separately from the DGCA written papers, under the ${RTR.instrument}.` },
    { item: 'Ground classes', detail: 'Ask whether a flying school quote includes ground training at all. Many do not, and it is a separate enrolment.' },
    { item: 'Living costs', detail: 'Accommodation and food at a flying school base, for however long the flying takes. IGRUA publishes these separately from its course fee, which is a good sign of how schools that are being straight with you present them.' },
    { item: 'Extra hours', detail: `The ${CPL_HOURS.total} hours are a minimum, not an allowance. What you pay for hours beyond a quote, and at what rate, is the single biggest source of cost overrun.` },
    { item: 'Ratings after the licence', detail: 'An instrument rating, a multi-engine endorsement and a type rating are separate qualifications. Some school quotes include the first two; almost none include a type rating.' },
];

const faqs = [
    { q: 'How much does pilot training cost in India?', a: `There is no sourced answer, and this page will not invent one. What can be stated: ${CPL_COST.benchmark.school}, ${CPL_COST.benchmark.status}, publishes ${CPL_COST.benchmark.feeLabel} for its ${CPL_COST.benchmark.course} course, with uniform and study material, hostel, messing and the DGCA and RTR fees charged on top. Private flying schools quote differently and no government body publishes a market rate.` },
    { q: 'What are the government fees for a pilot course in India?', a: `DGCA's own examination fees are ${inr(PARIKSHA.fees.regularPerPaper)} per written paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} per paper for an Online On-Demand Examination, and ${inr(PARIKSHA.fees.oralPerPaper)} for an oral paper on the second and third attempt. ${PARIKSHA.fees.serviceCharge} ${PARIKSHA.booking.payment}` },
    { q: 'Is there a government flying academy, and what does it charge?', a: `Yes. ${CPL_COST.benchmark.school} is ${CPL_COST.benchmark.status.toLowerCase()}, and it publishes ${CPL_COST.benchmark.feeLabel} for the ab-initio to CPL course. ${CPL_COST.benchmark.gstNote}` },
    { q: 'What does that fee include?', a: `${CPL_COST.benchmark.includes.join('; ')}.` },
    { q: 'What is charged on top?', a: `${CPL_COST.benchmark.excludes.join('; ')}.` },
    { q: 'Why does every other site quote ₹40 to ₹70 lakh?', a: 'Because each one is quoting the one before it. We could not trace a single one of those ranges to a published document, and this site stated the same figure three different ways on three different pages before this pass. A range nobody can source is not a price, it is a rumour with a rupee sign.' },
    { q: 'Can the exam fee be refunded if I do not sit the paper?', a: `No. ${PARIKSHA.booking.noChanges} ${PARIKSHA.refund.eligibility}` },
    { q: 'How do I compare two flying school quotes?', a: `${CPL_COST.comparisonNote} The seven questions are on this page — ask both schools the same ones and put the answers side by side.` },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What Pilot Training Actually Costs in India, and What Can Be Sourced',
    description: "DGCA's statutory examination fees, the one published course price from a government flying academy, everything that sits outside a school quote, and the questions that make two quotes comparable.",
    inLanguage: 'en-IN',
    dateModified: '2026-09-15',
    articleSection: 'Pilot training cost',
    keywords: 'pilot training cost india, cpl cost in india, pilot course fees in india government, dgca exam fees, pilot licence cost, igrua fees',
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: { '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url, logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' } },
    citation: [
        { name: `${CPL_COST.benchmark.school} — published approved course fees`, url: CPL_COST.benchmark.source },
        { name: PARIKSHA.sources[0].label, url: PARIKSHA.sources[0].url },
        { name: PARIKSHA.sources[1].label, url: PARIKSHA.sources[1].url },
    ].map((c) => ({ '@type': 'CreativeWork', ...c })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-3 underline-orange';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function CostTransparency() {
    return (
        <Layout
            title="Pilot Training Cost in India: What Can Actually Be Sourced"
            description="DGCA's statutory exam fees, the one published price from a government flying academy, what sits outside every school quote, and how to compare two quotes properly."
        >
            <StructuredData data={[articleSchema, faqSchema]} />

            <section className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue pt-32 pb-16 px-4 text-center">
                <ScrollReveal>
                    <div className="section-tag">Cost Transparency</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        What Pilot Training Actually Costs in India
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed">
                        Two kinds of cost can be sourced to a document. The rest is quoted by flying schools and varies. This page
                        gives you the first two, and the questions that let you judge the third.
                    </p>
                </ScrollReveal>
            </section>

            <section className="py-16 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <p className="text-xs text-gray-500 mb-6">
                                Checked on {CHECKED_ON}. Every figure below is <a href="#sources" className={A}>sourced</a>. Where a
                                number could not be traced to a published document, it is not here — including the total.
                            </p>

                            <div className="border border-gray-200 rounded-xl p-5 mb-10">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-3">On this page</p>
                                <ol className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm list-decimal list-inside">
                                    {contents.map(([id, label]) => (
                                        <li key={id} className="text-gray-600"><a href={`#${id}`} className={A}>{label}</a></li>
                                    ))}
                                </ol>
                            </div>

                            <h2 id="statutory" className={H2}>What DGCA actually charges</h2>
                            <p className={P}>
                                These are the only fees in the whole process set by the regulator rather than by a business. They are
                                small relative to flying, and they are exact.
                            </p>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>DGCA fee</th>
                                            <th className={TH}>Amount</th>
                                            <th className={TH}>Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statutory.map((r, i) => (
                                            <tr key={r.item} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{r.item}</td>
                                                <td className="p-3 text-av-orange font-bold align-top whitespace-nowrap">{r.fee}</td>
                                                <td className="p-3 text-gray-600 align-top text-xs">{r.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>
                                {PARIKSHA.fees.serviceCharge} {PARIKSHA.booking.payment} {PARIKSHA.booking.deadline}
                            </p>
                            <p className={P}>
                                One rule worth knowing before you pay: {PARIKSHA.booking.noChanges.charAt(0).toLowerCase()}
                                {PARIKSHA.booking.noChanges.slice(1)} The full booking process is on our{' '}
                                <Link href="/dgca-computer-number" className={A}>computer number guide</Link>.
                            </p>

                            <h2 id="benchmark" className={H2}>The one published price from an authority</h2>
                            <p className={P}>
                                No Indian government body publishes a market price for flying training. One government academy
                                publishes its own, which is the closest thing to a benchmark that exists.
                            </p>
                            <div className="border-2 border-av-orange rounded-xl p-6 mb-4">
                                <p className="font-montserrat font-bold text-av-blue text-base mb-1">{CPL_COST.benchmark.school}</p>
                                <p className="text-gray-500 text-xs mb-4">{CPL_COST.benchmark.status} · {CPL_COST.benchmark.course}</p>
                                <p className="font-montserrat font-black text-4xl text-av-orange mb-5">{CPL_COST.benchmark.feeLabel}</p>
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <p className="text-xs font-bold text-av-blue mb-2">Included in that figure</p>
                                        <ul className="space-y-1">
                                            {CPL_COST.benchmark.includes.map((i) => (
                                                <li key={i} className="flex gap-2 items-start text-xs text-gray-600"><span className="text-av-orange flex-shrink-0">✓</span>{i}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-av-blue mb-2">Charged on top</p>
                                        <ul className="space-y-1">
                                            {CPL_COST.benchmark.excludes.map((i) => (
                                                <li key={i} className="flex gap-2 items-start text-xs text-gray-600"><span className="text-gray-400 flex-shrink-0">+</span>{i}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-xs mt-4">{CPL_COST.benchmark.gstNote}</p>
                            </div>
                            <p className={P}>
                                Use it as a reference point rather than a price list. It tells you what a full ab-initio course covers
                                when someone has to publish the detail, which is exactly the yardstick to hold a private quote against.
                            </p>

                            <h2 id="outside" className={H2}>What sits outside every quote</h2>
                            <p className={P}>
                                These are the lines that turn a quoted figure into a real one. None of them is hidden; they are simply
                                not in the headline number, at any school.
                            </p>
                            <div className="space-y-3 mb-10">
                                {outside.map((o) => (
                                    <div key={o.item} className="border border-gray-200 rounded-xl p-4">
                                        <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{o.item}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{o.detail}</p>
                                    </div>
                                ))}
                            </div>

                            <h2 id="compare" className={H2}>Seven questions that make two quotes comparable</h2>
                            <p className={P}>{CPL_COST.comparisonNote}</p>
                            <ol className="space-y-2 mb-10">
                                {CPL_COST.askYourSchool.map((q, i) => (
                                    <li key={q} className="flex gap-3 items-start text-sm text-gray-700">
                                        <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>{q}
                                    </li>
                                ))}
                            </ol>

                            <h2 id="no-range" className={H2}>Why there is no total on this page</h2>
                            <p className={P}>
                                This page used to lead with a total, and three other pages on this site gave three different ones.
                                None was sourced. When we went looking for where those figures come from, the trail ended at coaching
                                blogs quoting each other — DGCA, the Ministry of Civil Aviation, PIB and parliamentary answers publish
                                flying-school counts and licences issued, and never fees.
                            </p>
                            <p className={P}>
                                So we removed the number rather than keep repeating it. A range nobody can source is not a price. If
                                you want a figure you can act on, the honest route is two or three written quotes answered against the
                                seven questions above, plus the DGCA fees and the medical, which are the parts that do not move.
                            </p>
                            <p className={P}>
                                Related reading on this site, kept separate deliberately while we work out which page should own this
                                topic: <Link href="/blogs/pilot-training-cost-in-india" className={A}>our cost breakdown by line item</Link>{' '}
                                and <Link href="/lead-magnets/cpl-cost-breakdown" className={A}>the CPL cost worksheet</Link>.
                            </p>

                            <h2 id="faqs" className={H2}>Frequently asked questions</h2>
                            <div className="space-y-3 mb-10">
                                {faqs.map((faq) => (
                                    <details key={faq.q} className="border border-gray-200 rounded-xl p-4">
                                        <summary className="font-semibold text-av-blue text-sm cursor-pointer">{faq.q}</summary>
                                        <p className="text-gray-600 text-sm leading-relaxed mt-2">{faq.a}</p>
                                    </details>
                                ))}
                            </div>

                            <h2 id="sources" className={H2}>Sources</h2>
                            <p className={P}>Read on {CHECKED_ON}.</p>
                            <ul className="space-y-2 mb-10">
                                {articleSchema.citation.map((c) => (
                                    <li key={c.url} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        <a href={c.url} target="_blank" rel="noopener noreferrer" className={A}>{c.name}</a>
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-av-blue rounded-2xl p-8">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Before you pay a deposit anywhere</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">{ACADEMY.scope}</p>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    Bring us a quote and we will go through it against the seven questions with you. We would rather
                                    you understood what you are buying than signed up quickly.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link href="/contact" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        Talk to a counsellor
                                    </Link>
                                    <Link href="/commercial-pilot-license-eligibility" className="inline-block bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        Check eligibility first
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="space-y-6">
                        <ScrollReveal delay={200}><LeadForm title="Get a Quote Reviewed" /></ScrollReveal>
                        <ScrollReveal delay={300}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-3">The fees that do not move</h4>
                                <p className="text-white/90 text-sm font-semibold">{inr(PARIKSHA.fees.regularPerPaper)}</p>
                                <p className="text-white/70 text-xs mb-3">per written paper, regular session</p>
                                <p className="text-white/90 text-sm font-semibold">{inr(PARIKSHA.fees.olodePerPaper)}</p>
                                <p className="text-white/70 text-xs mb-3">per paper, on demand</p>
                                <p className="text-white/90 text-sm font-semibold">{CPL_COST.benchmark.feeLabel}</p>
                                <p className="text-white/70 text-xs">published by the government academy</p>
                                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Ask a question
                                </a>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal delay={400}>
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Related</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/commercial-pilot-license-eligibility" className={A}>CPL eligibility</Link></li>
                                    <li><Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>The full route</Link></li>
                                    <li><Link href="/dgca-computer-number" className={A}>Exam booking and fees</Link></li>
                                    <li><Link href="/dgca-class-2-class-1-medical" className={A}>The medical</Link></li>
                                    <li><Link href="/dgca-ground-classes" className={A}>DGCA ground classes</Link></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}
