import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import LeadForm from '../components/LeadForm';
import Link from 'next/link';
import { EGCA, PARIKSHA, MEDICAL_STANDARDS as MED, ACADEMY } from '../lib/facts';

/*
 * /ecga-login-your-complete-guide — rewritten 2026-09-11 from DGCA sources.
 *
 * The slug is a typo, "ecga" for "eGCA". It stays. The page ranks on it, the
 * URL has history, and renaming it would trade real positions for tidiness.
 * Every internal link and the canonical use this spelling; the H1, title and
 * copy use the correct one.
 *
 * WHAT THE PREVIOUS VERSION GOT WRONG:
 *   - It named the portal's developer. No government source for that was
 *     found, so it is gone rather than softened.
 *   - It gave a nine-step new-user registration flow that matches no DGCA
 *     manual. DGCA publishes manuals for applying for services once you hold
 *     an eGCA ID, not for the registration screens, so this page now covers
 *     what is documented and says plainly where the documentation stops.
 *   - It never explained eGCA versus Pariksha, which is the actual confusion
 *     behind most searches that land here. That comparison now opens the page.
 *   - Its title said 2025.
 *
 * Everything renders from lib/facts.js EGCA. Do not type a step, a menu path
 * or a prerequisite into this file.
 */

const CANONICAL = 'https://weoneaviation.in/ecga-login-your-complete-guide';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function longDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}
const CHECKED_ON = longDate(EGCA.verifiedOn);

const contents = [
    ['which-portal', 'eGCA or Pariksha: which one you need'],
    ['what-is-egca', 'What eGCA is, and what it replaced'],
    ['epl', 'Your licence is now a digital licence'],
    ['login', 'Logging in, and what DGCA actually documents'],
    ['cpl-issuance', 'Applying for a CPL on eGCA'],
    ['cpl-renewal', 'Renewing a CPL on eGCA'],
    ['faqs', 'Frequently asked questions'],
    ['sources', 'Sources'],
];

const faqs = [
    {
        q: 'What is the difference between eGCA and DGCA Pariksha?',
        a: `They are two portals doing two jobs. Pariksha handles examinations — the computer number, booking papers and results, under ${PARIKSHA.authority.rule}. eGCA handles licensing — issuance, renewal and endorsement of licences, the e-logbook and medical assessment records. ${EGCA.joinPoint}`,
    },
    {
        q: 'What is the eGCA portal used for?',
        a: `${EGCA.what} ${EGCA.history.later}`,
    },
    {
        q: 'When did eGCA launch?',
        a: `${EGCA.history.phase1Date}. ${EGCA.history.phase1}`,
    },
    {
        q: 'Is the DGCA pilot licence now digital?',
        a: `Yes. DGCA introduced the ${EGCA.epl.label} for the Commercial Pilot Licence and the Flight Radio Telephone Operator (Restricted) Licence in ${EGCA.epl.cplFrtolFrom}, and for the Airline Transport Pilot Licence on ${EGCA.epl.atplFrom}. ${EGCA.epl.what} ${EGCA.epl.access}`,
    },
    {
        q: 'Do I need an eGCA account before I start flight training?',
        a: `Not to sit the written papers — those run on Pariksha with a computer number, and need no eGCA ID and no medical certificate. You need the eGCA ID when you come to apply for the licence itself, and by then five other things have to be in place as well. The prerequisite list is on this page.`,
    },
    {
        q: 'How do I apply for a CPL on eGCA?',
        a: `${EGCA.cplIssuance.service}, after which the form runs through ${EGCA.cplIssuance.sections.length} sections. ${EGCA.cplIssuance.qualifiedCheck} ${EGCA.cplIssuance.payment} ${EGCA.cplIssuance.completion}`,
    },
    {
        q: 'Can I correct my application after submitting it?',
        a: `No. ${EGCA.cplRenewal.noCorrections} While the form is still open, a wrong detail is fixed differently: ${EGCA.cplIssuance.discrepancy.charAt(0).toLowerCase()}${EGCA.cplIssuance.discrepancy.slice(1)}`,
    },
    {
        q: 'Why are my latest flying hours not counting towards my renewal?',
        a: `${EGCA.cplRenewal.logbookWarning} Update and get the e-logbook validated before you open the application, not after.`,
    },
    {
        q: 'Which medical do I need before the licence application?',
        a: `A valid Class 1 medical certificate with the assessment sheet. ${MED.classes[0].validity} The full set of medical rules is on our <a href="/dgca-class-2-class-1-medical">Class 1 and Class 2 medical guide</a>.`,
    },
    {
        q: 'How do I pay for an eGCA service?',
        a: EGCA.cplIssuance.payment,
    },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'eGCA Login: What the DGCA Licensing Portal Does, and How It Differs from Pariksha',
    description: 'What the eGCA portal is used for, how it differs from DGCA Pariksha, the electronic personnel licence, and the documented process for applying for and renewing a Commercial Pilot Licence.',
    inLanguage: 'en-IN',
    dateModified: EGCA.verifiedOn,
    articleSection: 'DGCA portals',
    keywords: 'egca, egca login, egca dgca, dgca login, egca portal, egca registration, electronic personnel licence, egca vs pariksha',
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: {
        '@type': 'EducationalOrganization',
        name: ACADEMY.name,
        url: ACADEMY.url,
        logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    },
    citation: EGCA.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
    })),
};

const H2 = 'font-montserrat text-xl font-bold text-av-blue mb-3';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function EGCALoginPage() {
    return (
        <Layout
            title="eGCA Login: DGCA Licensing Portal Explained (2026)"
            description="What eGCA is for, how it differs from DGCA Pariksha, the new electronic pilot licence, and the documented steps to apply for or renew a CPL — sourced from DGCA."
        >
            <StructuredData data={[articleSchema, faqSchema]} />

            {/* Hero */}
            <div className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue pt-32 pb-16 px-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
                    <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
                </div>
                <ScrollReveal className="relative z-10">
                    <div className="section-tag">DGCA Digital Portal</div>
                    <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        eGCA Login: What the DGCA Licensing Portal Does
                    </h1>
                    <p className="text-white/70 max-w-3xl mx-auto text-sm leading-relaxed">
                        {EGCA.what} It is not the examination portal — that is Pariksha, and mixing the two up is the single most
                        common reason a student wastes a month.
                    </p>
                </ScrollReveal>
            </div>

            <section className="py-16 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <p className="text-xs text-gray-500 mb-6">
                                Checked against DGCA and Ministry of Civil Aviation sources on {CHECKED_ON}. Every statement is{' '}
                                <a href="#sources" className={A}>sourced below</a>. The portal itself is at{' '}
                                <a href={EGCA.url} target="_blank" rel="noopener noreferrer" className={A}>egca.gov.in</a>.
                            </p>

                            <div className="border border-gray-200 rounded-xl p-5 mb-10">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-3">On this page</p>
                                <ol className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm list-decimal list-inside">
                                    {contents.map(([id, label]) => (
                                        <li key={id} className="text-gray-600"><a href={`#${id}`} className={A}>{label}</a></li>
                                    ))}
                                </ol>
                            </div>

                            {/* Which portal */}
                            <h2 id="which-portal" className={H2}>eGCA or Pariksha: which one you need</h2>
                            <p className={P}>
                                Start here, because most people who search for an eGCA login are on the wrong portal. DGCA runs two,
                                and they do different jobs.
                            </p>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>What you are trying to do</th>
                                            <th className={TH}>Where it happens</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {EGCA.versusPariksha.map((row, i) => (
                                            <tr key={row.task} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 align-top">{row.task}</td>
                                                <td className={`p-3 align-top font-semibold whitespace-nowrap ${row.portal.startsWith('eGCA') ? 'text-av-orange' : 'text-av-blue'}`}>{row.portal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>
                                {EGCA.joinPoint} If what you need is a computer number or an examination booking, our{' '}
                                <Link href="/dgca-computer-number" className={A}>computer number guide</Link> and{' '}
                                <Link href="/dgca-pariksha" className={A}>Pariksha guide</Link> cover those end to end.
                            </p>

                            {/* What is eGCA */}
                            <h2 id="what-is-egca" className={H2}>What eGCA is, and what it replaced</h2>
                            <p className={P}>{EGCA.what}</p>
                            <p className={P}>
                                <span className="font-semibold text-av-blue">{EGCA.history.phase1Date}:</span> {EGCA.history.phase1}
                            </p>
                            <p className={P}>{EGCA.history.later}</p>

                            {/* EPL */}
                            <h2 id="epl" className={H2}>Your licence is now a digital licence</h2>
                            <div className="border-2 border-av-orange rounded-xl p-5 mb-4">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-2">{EGCA.epl.label}</p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-3">{EGCA.epl.what} {EGCA.epl.access}</p>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <div className="bg-av-light rounded-lg p-3">
                                        <p className="text-xs font-semibold text-av-blue mb-1">From {EGCA.epl.cplFrtolFrom}</p>
                                        <p className="text-xs text-gray-600">Commercial Pilot Licence and the Flight Radio Telephone Operator (Restricted) Licence</p>
                                    </div>
                                    <div className="bg-av-light rounded-lg p-3">
                                        <p className="text-xs font-semibold text-av-blue mb-1">From {EGCA.epl.atplFrom}</p>
                                        <p className="text-xs text-gray-600">Airline Transport Pilot Licence</p>
                                    </div>
                                </div>
                            </div>
                            <p className={P}>
                                This is recent enough that most guides to eGCA have not caught up with it. If you are reading a page
                                that describes collecting a printed licence and says nothing about the mobile application, it was
                                written before this changed.
                            </p>

                            {/* Login */}
                            <h2 id="login" className={H2}>Logging in, and what DGCA actually documents</h2>
                            <p className={P}>
                                You sign in at <a href={EGCA.url} target="_blank" rel="noopener noreferrer" className={A}>egca.gov.in</a>{' '}
                                with your eGCA ID and password, and every service below sits in the Services panel once you are in.
                            </p>
                            <p className={P}>
                                On creating that account in the first place, this page is going to be less satisfying than the ones
                                around it, and deliberately so. DGCA publishes detailed manuals for applying for services once you
                                hold an eGCA ID; it does not publish a manual for the registration screens themselves. Several sites
                                fill that gap with a numbered list — ours used to — and there is no way to tell which of those steps
                                are real and which are remembered. Rather than add another invented sequence, we will say what is
                                documented and point you at the portal for the rest. If the registration screen does not behave the
                                way you expect, that is a support request, not a step you missed.
                            </p>

                            {/* CPL issuance */}
                            <h2 id="cpl-issuance" className={H2}>Applying for a CPL on eGCA</h2>
                            <p className={P}>
                                Six things have to be true before the application will go anywhere. Most students meet them one
                                surprise at a time, which is how a licence slips by months.
                            </p>
                            <ol className="space-y-2 mb-6">
                                {EGCA.cplPrerequisites.map((p, i) => (
                                    <li key={p} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>
                                        {p}
                                    </li>
                                ))}
                            </ol>
                            <div className="border border-gray-200 rounded-xl p-5 mb-4">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-3">{EGCA.cplIssuance.service}</p>
                                <p className="text-xs font-semibold text-av-blue mb-2">The form runs through these sections</p>
                                <ul className="space-y-1.5 mb-4">
                                    {EGCA.cplIssuance.sections.map((sec) => (
                                        <li key={sec} className="flex gap-2 items-start text-sm text-gray-600">
                                            <span className="text-av-orange font-bold flex-shrink-0">–</span>{sec}
                                        </li>
                                    ))}
                                </ul>
                                {[EGCA.cplIssuance.ratings, EGCA.cplIssuance.qualifiedCheck, EGCA.cplIssuance.discrepancy, EGCA.cplIssuance.payment, EGCA.cplIssuance.completion, EGCA.cplIssuance.tracking].map((line) => (
                                    <p key={line} className="text-gray-600 text-sm leading-relaxed mb-2">{line}</p>
                                ))}
                            </div>
                            <p className={P}>
                                Note the second section: examination results. That is where the computer number and the papers you
                                cleared on Pariksha arrive, which is why the two portals cannot be treated as alternatives.
                            </p>

                            {/* CPL renewal */}
                            <h2 id="cpl-renewal" className={H2}>Renewing a CPL on eGCA</h2>
                            <p className={P}>{EGCA.cplRenewal.service}. Two rules catch people out, and both are unforgiving.</p>
                            <div className="space-y-3 mb-6">
                                {[EGCA.cplRenewal.logbookWarning, EGCA.cplRenewal.noCorrections, EGCA.cplRenewal.operatorStep].map((r) => (
                                    <div key={r} className="border-l-4 border-av-orange bg-av-light rounded-r-xl p-4">
                                        <p className="text-gray-700 text-sm leading-relaxed">{r}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-av-blue mb-2">What gets attached</p>
                            <ul className="space-y-2 mb-10">
                                {EGCA.cplRenewal.attachments.map((a) => (
                                    <li key={a} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>{a}
                                    </li>
                                ))}
                            </ul>

                            {/* FAQs */}
                            <h2 id="faqs" className={H2}>Frequently asked questions</h2>
                            <div className="space-y-3 mb-10">
                                {faqs.map((faq) => (
                                    <details key={faq.q} className="border border-gray-200 rounded-xl p-4">
                                        <summary className="font-semibold text-av-blue text-sm cursor-pointer">{faq.q}</summary>
                                        <p className="text-gray-600 text-sm leading-relaxed mt-2" dangerouslySetInnerHTML={{ __html: faq.a }} />
                                    </details>
                                ))}
                            </div>

                            {/* Sources */}
                            <h2 id="sources" className={H2}>Sources</h2>
                            <p className={P}>
                                Read on {CHECKED_ON}. The two eGCA user manuals carry no version number or date, so this page quotes
                                their menu paths and prerequisites, which are durable, and not screens or fee amounts, which are not.
                            </p>
                            <ul className="space-y-2 mb-10">
                                {EGCA.sources.map((s) => (
                                    <li key={s.url} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div className="bg-av-blue rounded-2xl p-8">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Working out what to do first?</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    We have no access to your eGCA account and cannot file anything on your behalf — that is between
                                    you, your flying school and DGCA. What we teach is the ground subjects that sit behind the
                                    examination results section of that form, and what we can tell you for free is the order to do
                                    things in so you are not waiting on one step to begin another.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link href="/contact" className="inline-block bg-av-orange text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        Talk to a counsellor
                                    </Link>
                                    <Link href="/dgca-ground-classes" className="inline-block bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                        DGCA ground classes
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal delay={200}>
                            <LeadForm title="Ask About the DGCA Process" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-3">Two portals, one sentence</h4>
                                <p className="text-white/90 text-sm font-semibold">Pariksha</p>
                                <p className="text-white/70 text-xs mb-3">Computer number, papers, results</p>
                                <p className="text-white/90 text-sm font-semibold">eGCA</p>
                                <p className="text-white/70 text-xs mb-3">Licence issue and renewal, e-logbook, medical records</p>
                                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                                    className="mt-2 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Ask a question
                                </a>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-3">Before the CPL application</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    {EGCA.cplPrerequisites.map((p) => (<li key={p}>✓ {p}</li>))}
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={500}>
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Related guides</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/dgca-computer-number" className={A}>DGCA computer number</Link></li>
                                    <li><Link href="/dgca-pariksha" className={A}>DGCA Pariksha: papers and fees</Link></li>
                                    <li><Link href="/dgca-class-2-class-1-medical" className={A}>Class 1 and Class 2 medical</Link></li>
                                    <li><Link href="/rtr-a" className={A}>RTR (A)</Link></li>
                                    <li><Link href="/commercial-pilot-license" className={A}>Commercial Pilot Licence</Link></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}
