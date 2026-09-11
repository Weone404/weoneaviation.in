import Layout from '../components/Layout';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import Link from 'next/link';
import { PARIKSHA, inr, ACADEMY } from '../lib/facts';

/*
 * /dgca-computer-number — the flagship portal page.
 *
 * REWRITTEN 2026-09-11 FROM PRIMARY SOURCES ONLY. Every statement below is
 * rendered from lib/facts.js PARIKSHA, which was read out of the four DGCA
 * Pariksha PDFs listed in PARIKSHA.sources. Do not type a figure into this
 * file — add it to PARIKSHA with its source, or leave it out.
 *
 * WHAT THE PREVIOUS VERSION GOT WRONG, so it does not come back:
 *   - It never mentioned the Board Verification Certificate, which is the
 *     single most common cause of rejection and is mandatory for every new
 *     candidate. It now has its own section.
 *   - It listed a PAN card as a document. PAN is not a DGCA document and is
 *     not on any Pariksha list. Removed.
 *   - It gave no file sizes, so readers failed the upload step. There is now a
 *     size table straight from the User Manual.
 *   - It dodged the age question with "refer to the eligibility requirements".
 *     The FAQ states 16 minimum and no maximum. It says that now.
 *   - It carried a stray paragraph addressed to students in Andhra Pradesh,
 *     linking to a page about India generally. Removed.
 *   - Its FAQ answers hedged ("may not always be possible", "check the latest
 *     guidelines") where the source is specific. Hedging on a sourced fact
 *     reads as ignorance to a reader and to an answer engine.
 *
 * Schema is Article + FAQPage. No HowTo: Layout already emits BreadcrumbList,
 * lib/schema.js owns the Organization node, and the Google FAQ rich result was
 * withdrawn in May 2026 — the FAQPage node stays because answer engines still
 * parse it, not because it draws stars.
 */

const CANONICAL = 'https://weoneaviation.in/dgca-computer-number';

/*
 * "2026-09-11" -> "11 September 2026". Hand-rolled for the same reason inr()
 * is: toLocaleDateString('en-IN') silently falls back to US ordering on an
 * ICU-light Node, and a "last checked" line that renders as September 11, 2026
 * on one build and 11 September 2026 on the next is the sort of thing nobody
 * notices until a reader does.
 */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function longDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}
const CHECKED_ON = longDate(PARIKSHA.verifiedOn);

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Portal Guide', title: 'DGCA Computer', highlight: 'Number', sub: 'How to apply on the Pariksha portal — documents, file sizes, fees and 2026 exam dates' },
];

const contents = [
    ['what-it-is', 'What a computer number is'],
    ['key-facts', 'Key facts at a glance'],
    ['who-needs-it', 'Who needs one, and who does not'],
    ['documents', 'Documents and file sizes'],
    ['matching', 'Name, date of birth, address and AIU'],
    ['bvc', 'The Board Verification Certificate'],
    ['how-to-apply', 'How to apply: the seven steps'],
    ['rejection', 'Partial rejection, complete rejection and appeal'],
    ['rejection-reasons', 'The official rejection reasons'],
    ['fees-dates', 'Exam fees, booking rules and 2026 dates'],
    ['profile', 'Updating your profile later'],
    ['faqs', 'Frequently asked questions'],
    ['sources', 'Sources'],
];

const keyFacts = [
    ['Issued by', PARIKSHA.authority.name],
    ['Legal basis', `Examinations are conducted under ${PARIKSHA.authority.rule}. Minimum educational qualifications sit in ${PARIKSHA.authority.qualificationRule}.`],
    ['Where to apply', 'Online at pariksha.dgca.gov.in — there is no offline route'],
    ['Minimum age', `${PARIKSHA.basics.minAge} years`],
    ['Maximum age', PARIKSHA.basics.maxAgeNote],
    ['Validity', PARIKSHA.basics.validity],
    ['How many', PARIKSHA.basics.oneOnly],
    ['Time to issue', PARIKSHA.processing.statement],
    ['Hard copy', PARIKSHA.hardCopy.computerNumber],
    ['Login after allotment', PARIKSHA.basics.loginAfterAllotment],
];

const whoNeeds = [
    { who: 'A CPL, ATPL, FDEG, FE, FN or FATA candidate', need: 'Yes — before booking any DGCA written paper', education: PARIKSHA.education.nonPpl },
    { who: 'A PPL candidate', need: 'Yes — the same number covers PPL papers', education: PARIKSHA.education.ppl },
    { who: 'A candidate who already holds a UDAAN-era record', need: 'Yes, but register through OLD Candidate Registration', education: 'Old candidates are not asked for a Board Verification Certificate.' },
    { who: 'A foreign national, OCI or PIO candidate', need: 'Yes, with extra steps', education: `${PARIKSHA.foreignCandidates.passport} ${PARIKSHA.foreignCandidates.mobile} ${PARIKSHA.foreignCandidates.securityClearance}` },
    { who: 'Someone who has not started flight training yet', need: 'Yes, and earlier is better', education: 'Nothing in the process requires a flying school, a logbook or a medical certificate. The number is an examination identity, not a licence.' },
];

const documentGroups = [
    {
        title: 'Education',
        items: [
            'Class 10 marksheet and pass certificate',
            'Class 12 marksheet and pass certificate (or diploma with a 10+2 equivalence certificate)',
            'Board Verification Certificate for Class 10 and Class 12 — see the BVC section below',
            'AIU equivalence certificate, where the qualification is from an international board',
        ],
    },
    {
        title: 'Identity and date of birth',
        items: [
            'Class 10 certificate and marksheet, or a birth certificate, as date-of-birth proof',
            'Aadhaar card, where you have one — as address proof, not as date-of-birth proof',
            'Passport, for foreign nationals and for candidates from Nepal and Bhutan',
        ],
    },
    {
        title: 'Address',
        items: [
            'Any one of: Aadhaar card, passport, voter ID, DGCA-issued licence, ration card, or an address proof issued by a State or Central Government authority',
            'Self-attested, and matching the permanent address you type into the form',
        ],
    },
    {
        title: 'Photograph, signature and contact',
        items: [
            'Photograph to the exact specification below',
            'Signature to the exact specification below',
            'An email address you can open within 24 hours of submitting',
            'An Indian mobile number with the +91 prefix',
        ],
    },
];

const fileSizeRows = [
    ['Photograph', PARIKSHA.uploads.photo.format, `${PARIKSHA.uploads.photo.maxKb} KB`, `${PARIKSHA.uploads.photo.size}. ${PARIKSHA.uploads.photo.face}. ${PARIKSHA.uploads.photo.age}.`],
    ['Signature', PARIKSHA.uploads.signature.format, `${PARIKSHA.uploads.signature.maxKb} KB`, PARIKSHA.uploads.signature.size],
    ...PARIKSHA.uploads.pdfLimits.map((row) => ['Documents', 'PDF only', `${row.maxKb} KB`, row.documents]),
];

const matchingCards = [
    { title: 'Your name', body: PARIKSHA.name.rule, warn: PARIKSHA.name.consequence, extra: PARIKSHA.name.alsoMatched },
    { title: 'Your date of birth', body: PARIKSHA.dob.proof, warn: PARIKSHA.dob.exactness, extra: PARIKSHA.dob.aadhaarNote },
    { title: 'Your permanent address', body: PARIKSHA.addressProof.rule, warn: 'A permanent address that does not match the uploaded proof is a listed rejection reason.', extra: `Accepted proofs: ${PARIKSHA.addressProof.documents.join(', ')}.` },
    { title: 'AIU equivalence', body: PARIKSHA.aiu.whenNeeded, warn: PARIKSHA.aiu.diploma, extra: `Association of Indian Universities — ${PARIKSHA.aiu.body.replace('Association of Indian Universities, ', '')}.` },
];

const rejectionRows = [
    ['Partial rejection', PARIKSHA.rejection.partial.meaning, PARIKSHA.rejection.partial.escalation],
    ['Complete rejection', PARIKSHA.rejection.complete.meaning, PARIKSHA.rejection.complete.consequence],
    ['Appeal', PARIKSHA.rejection.appeal.whoTo, `By email to ${PARIKSHA.rejection.appeal.email}, by post, or in person: ${PARIKSHA.rejection.appeal.inPerson}`],
];

const feeRows = [
    ['Regular session — one paper', inr(PARIKSHA.fees.regularPerPaper)],
    ['Online On-Demand Examination (OLODE) — one paper', inr(PARIKSHA.fees.olodePerPaper)],
    ['Oral paper', `${inr(PARIKSHA.fees.oralPerPaper)} — ${PARIKSHA.fees.oralNote.toLowerCase()}`],
];

const bookingRules = [
    PARIKSHA.booking.onePerSession,
    PARIKSHA.booking.centreNote,
    PARIKSHA.booking.specificAircraft,
    PARIKSHA.booking.payment,
    PARIKSHA.booking.deadline,
    PARIKSHA.booking.noChanges,
];

const faqs = [
    {
        q: 'What is the minimum age for a DGCA computer number?',
        a: `${PARIKSHA.basics.minAge} years. ${PARIKSHA.basics.maxAgeNote} You do not need to have started flight training, and you do not need a medical certificate to apply.`,
    },
    {
        q: 'Do I need a Board Verification Certificate?',
        a: `Yes, if you are a new candidate. ${PARIKSHA.bvc.whoNeedsIt} Which copy you upload depends on who the certificate is addressed to — the three cases are set out in the BVC section above. ${PARIKSHA.bvc.noColourPhotocopies}`,
    },
    {
        q: 'How long does a computer number take?',
        a: `${PARIKSHA.processing.statement} ${PARIKSHA.processing.partialNote}`,
    },
    {
        q: 'Do I have to post hard copies of my documents?',
        a: `Not for the computer number. ${PARIKSHA.hardCopy.computerNumber} ${PARIKSHA.hardCopy.examinationForm}`,
    },
    {
        q: 'Is an Aadhaar card enough as proof of date of birth?',
        a: `No. ${PARIKSHA.dob.aadhaarNote} ${PARIKSHA.dob.proof} Aadhaar is accepted as address proof instead.`,
    },
    {
        q: 'My name is spelt differently on my Class 10 marksheet and my passport. Which do I use?',
        a: `${PARIKSHA.name.rule} ${PARIKSHA.name.consequence}`,
    },
    {
        q: 'Can I upload a document I forgot, after submitting?',
        a: PARIKSHA.uploads.finalSubmit,
    },
    {
        q: 'What happens if my application is partially rejected?',
        a: `${PARIKSHA.rejection.partial.meaning} ${PARIKSHA.rejection.partial.escalation}`,
    },
    {
        q: 'Is there a fee for the computer number itself?',
        a: `The Pariksha documents describe a payment step for examination applications, not for the computer number application. The examination fee is ${inr(PARIKSHA.fees.regularPerPaper)} for one paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} for one paper in an Online On-Demand Examination.`,
    },
    {
        q: 'Can I change my details after the number is allotted?',
        a: `Some of them yourself. ${PARIKSHA.profileUpdates.selfService.join(', ')} can be updated without approval. Everything else — including your name, date of birth, photograph, signature, category and education record — needs verification by the Central Examination Organisation, with supporting documents.`,
    },
    {
        q: 'Can one computer number cover PPL, CPL and ATPL exams?',
        a: `${PARIKSHA.basics.oneOnly} ${PARIKSHA.basics.validity}`,
    },
    {
        q: 'Who do I contact if the portal will not accept my application?',
        a: `Email ${PARIKSHA.help.email}. ${PARIKSHA.help.portalDesk} For a complete rejection you disagree with, the appeal route is to the Director, CEO — by email to ${PARIKSHA.rejection.appeal.email}, by post, or in person on ${PARIKSHA.rejection.appeal.inPerson.replace('Tuesday and Thursday, ', 'Tuesday and Thursday between ').replace(', at the same address.', '.')}`,
    },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'DGCA Computer Number: How to Apply on Pariksha (2026 Guide)',
    description: 'How to apply for a DGCA computer number on the Pariksha portal: eligibility, documents and file sizes, the Board Verification Certificate rule, the seven application steps, rejection reasons, exam fees and the 2026 session dates.',
    inLanguage: 'en-IN',
    dateModified: PARIKSHA.verifiedOn,
    articleSection: 'DGCA examinations',
    keywords: 'dgca computer number, dgca computer number apply online, pariksha dgca gov in, dgca computer number documents, board verification certificate dgca, dgca exam fees 2026',
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: {
        '@type': 'EducationalOrganization',
        name: ACADEMY.name,
        url: ACADEMY.url,
        logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    },
    citation: PARIKSHA.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

const H2 = 'font-montserrat text-xl font-bold text-av-blue mb-3';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const TH = 'text-left p-3 font-montserrat font-bold';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function DGCAComputerNumber() {
    return (
        <Layout
            title="DGCA Computer Number: How to Apply on Pariksha (2026)"
            description="Apply for a DGCA computer number on the Pariksha portal: eligibility, documents and file sizes, the BVC rule, the 7 steps, fees and 2026 exam dates."
        >
            <StructuredData data={[articleSchema, faqSchema]} />
            <HeroSlider customSlides={heroSlides} asH1={false} />

            <section className="py-20 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">DGCA Portal Guide</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-3 underline-orange">
                                DGCA Computer Number: How to Apply on Pariksha (2026 Guide)
                            </h1>

                            <p className="text-xs text-gray-500 mb-6">
                                Last checked against DGCA Pariksha documents on {CHECKED_ON}. Every figure on this page is
                                {' '}<a href="#sources" className={A}>sourced below</a>. DGCA can change a rule without notice — confirm on{' '}
                                <a href={PARIKSHA.portal} target="_blank" rel="noopener noreferrer" className={A}>pariksha.dgca.gov.in</a> before you submit.
                            </p>

                            {/* 40–60 word answer box */}
                            <div className="bg-av-light border-l-4 border-av-orange rounded-xl p-5 mb-8">
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    A DGCA computer number is the identification number the Central Examination Organisation allots
                                    to a candidate for DGCA flight crew examinations. You apply online at pariksha.dgca.gov.in from
                                    age {PARIKSHA.basics.minAge}, with your Class 10 and Class 12 records, a Board Verification
                                    Certificate and an address proof. It is issued within {PARIKSHA.processing.days} working days and
                                    lasts a lifetime.
                                </p>
                            </div>

                            {/* On-page contents */}
                            <div className="border border-gray-200 rounded-xl p-5 mb-10">
                                <p className="font-montserrat font-bold text-av-blue text-sm mb-3">On this page</p>
                                <ol className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm list-decimal list-inside">
                                    {contents.map(([id, label]) => (
                                        <li key={id} className="text-gray-600">
                                            <a href={`#${id}`} className={A}>{label}</a>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* What it is */}
                            <h2 id="what-it-is" className={H2}>What a computer number is</h2>
                            <p className={P}>{PARIKSHA.basics.definition}</p>
                            <p className={P}>
                                It is not a licence, not a roll number and not an eGCA account. DGCA conducts the flight crew
                                examinations under {PARIKSHA.authority.rule}, and this number is how the{' '}
                                {PARIKSHA.authority.name.replace(', Directorate General of Civil Aviation', '')} identifies you
                                across every paper you sit. {PARIKSHA.basics.loginAfterAllotment} The separate licensing portal is
                                covered on our <Link href="/ecga-login-your-complete-guide" className={A}>eGCA login guide</Link>, and
                                the papers themselves on our <Link href="/dgca-pariksha" className={A}>DGCA Pariksha guide</Link>.
                            </p>
                            <p className={P}>
                                {PARIKSHA.basics.oneOnly} {PARIKSHA.basics.oneEmailOneMobile}
                            </p>

                            {/* Key facts */}
                            <h2 id="key-facts" className={H2}>Key facts at a glance</h2>
                            <div className="overflow-x-auto mb-10">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Particular</th>
                                            <th className={TH}>Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {keyFacts.map(([particular, detail], i) => (
                                            <tr key={particular} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top w-1/3">{particular}</td>
                                                <td className="p-3 text-gray-600 align-top">{detail}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Who needs it */}
                            <h2 id="who-needs-it" className={H2}>Who needs one, and who does not</h2>
                            <p className={P}>
                                The categories you can apply under are {PARIKSHA.categories.join(', ')}. CEO conducts the{' '}
                                {PARIKSHA.examsConducted.join(', ')} examinations.
                            </p>
                            <div className="overflow-x-auto mb-10">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>You are</th>
                                            <th className={TH}>Do you need one?</th>
                                            <th className={TH}>What applies to you</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {whoNeeds.map((row, i) => (
                                            <tr key={row.who} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{row.who}</td>
                                                <td className="p-3 text-gray-600 align-top">{row.need}</td>
                                                <td className="p-3 text-gray-600 align-top">{row.education}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>
                                {PARIKSHA.education.documents} {PARIKSHA.education.legibility} If you did not take Physics and
                                Mathematics at 10+2, the bridge route is covered in{' '}
                                <Link href="/blogs/become-pilot-without-physics-and-maths-class-12" className={A}>our guide for Commerce and Biology students</Link>.
                            </p>

                            {/* Documents and file sizes */}
                            <h2 id="documents" className={H2}>Documents and file sizes</h2>
                            <p className={P}>
                                Gather these before you open the form. The portal will not let you add anything after Final Submit,
                                and the upload specifications are exact — a photograph one kilobyte over the limit is rejected the
                                same way a wrong one is.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-5 mb-8">
                                {documentGroups.map((group) => (
                                    <div key={group.title} className="border border-gray-200 rounded-xl p-5">
                                        <p className="font-montserrat font-bold text-av-blue text-sm mb-3">{group.title}</p>
                                        <ul className="space-y-2">
                                            {group.items.map((item) => (
                                                <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                                                    <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <div className="overflow-x-auto mb-4">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Upload</th>
                                            <th className={TH}>Format</th>
                                            <th className={TH}>Maximum size</th>
                                            <th className={TH}>Specification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fileSizeRows.map((row, i) => (
                                            <tr key={`${row[0]}-${row[2]}`} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{row[0]}</td>
                                                <td className="p-3 text-gray-600 align-top whitespace-nowrap">{row[1]}</td>
                                                <td className="p-3 text-av-orange font-bold align-top whitespace-nowrap">{row[2]}</td>
                                                <td className="p-3 text-gray-600 align-top">{row[3]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>
                                A photograph or signature cannot be uploaded as a PDF, and no other document can be uploaded as a
                                JPEG. {PARIKSHA.uploads.finalSubmit}
                            </p>

                            {/* Matching cards */}
                            <h2 id="matching" className={H2}>Name, date of birth, address and AIU</h2>
                            <p className={P}>
                                Four fields cause most rejections, and all four fail for the same reason: what is typed does not
                                match what is uploaded.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-5 mb-10">
                                {matchingCards.map((card) => (
                                    <div key={card.title} className="border border-gray-200 rounded-xl p-5">
                                        <p className="font-montserrat font-bold text-av-blue text-sm mb-2">{card.title}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{card.body}</p>
                                        <p className="text-av-orange text-sm font-semibold leading-relaxed mb-2">{card.warn}</p>
                                        <p className="text-gray-500 text-xs leading-relaxed">{card.extra}</p>
                                    </div>
                                ))}
                            </div>

                            {/* BVC */}
                            <h2 id="bvc" className={H2}>The Board Verification Certificate</h2>
                            <p className={P}>
                                This is the step most candidates have never heard of, and the one that sends applications back.
                                {' '}{PARIKSHA.bvc.whoNeedsIt} It is a certificate from your education board confirming that the
                                marksheet you uploaded is genuine — and which copy you may upload depends entirely on who the board
                                addressed it to.
                            </p>
                            <div className="space-y-3 mb-6">
                                {PARIKSHA.bvc.cases.map((c, i) => (
                                    <div key={c.addressedTo} className="flex gap-4 border border-gray-200 rounded-xl p-4">
                                        <div className="w-8 h-8 bg-av-orange rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">{i + 1}</div>
                                        <div>
                                            <p className="font-semibold text-av-blue text-sm mb-1">Addressed to {c.addressedTo}</p>
                                            <p className="text-gray-600 text-sm leading-relaxed">{c.action}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ul className="space-y-2 mb-10">
                                {[PARIKSHA.bvc.noColourPhotocopies, PARIKSHA.bvc.internationalBoards, PARIKSHA.bvc.onlineVerification].map((item) => (
                                    <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* Steps */}
                            <h2 id="how-to-apply" className={H2}>How to apply: the seven steps</h2>
                            <p className={P}>
                                This is the sequence in the DGCA Flight Crew User Manual. Read step six before you start step one.
                            </p>
                            <ol className="space-y-4 mb-10">
                                {PARIKSHA.steps.map((step, i) => (
                                    <li key={step.title} className="flex gap-4">
                                        <div className="w-9 h-9 bg-av-blue rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">{i + 1}</div>
                                        <div>
                                            <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{step.title}</p>
                                            <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>

                            {/* Rejection */}
                            <h2 id="rejection" className={H2}>Partial rejection, complete rejection and appeal</h2>
                            <p className={P}>
                                The difference matters: one costs you days, the other costs you the whole application.
                                {' '}{PARIKSHA.rejection.notification}
                            </p>
                            <div className="overflow-x-auto mb-10">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Outcome</th>
                                            <th className={TH}>What it means</th>
                                            <th className={TH}>What happens next</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rejectionRows.map((row, i) => (
                                            <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{row[0]}</td>
                                                <td className="p-3 text-gray-600 align-top">{row[1]}</td>
                                                <td className="p-3 text-gray-600 align-top">{row[2]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Official rejection reasons */}
                            <h2 id="rejection-reasons" className={H2}>The official rejection reasons</h2>
                            <p className={P}>
                                DGCA publishes the list. Read it as a checklist before Final Submit, not afterwards.
                            </p>
                            <ul className="space-y-2 mb-10">
                                {PARIKSHA.rejectionReasons.map((reason) => (
                                    <li key={reason} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✗</span>
                                        {reason}
                                    </li>
                                ))}
                            </ul>

                            {/* Fees and dates */}
                            <h2 id="fees-dates" className={H2}>Exam fees, booking rules and 2026 dates</h2>
                            <p className={P}>
                                The computer number gets you to the booking form. These are the fees and rules that apply once you
                                are there.
                            </p>
                            <div className="overflow-x-auto mb-6">
                                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th className={TH}>Fee</th>
                                            <th className={TH}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feeRows.map((row, i) => (
                                            <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                <td className="p-3 text-gray-700 font-semibold align-top">{row[0]}</td>
                                                <td className="p-3 text-av-orange font-bold align-top">{row[1]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className={P}>{PARIKSHA.fees.serviceCharge} {PARIKSHA.refund.eligibility} {PARIKSHA.refund.notEligible} A refund application is processed within {PARIKSHA.refund.days} days of applying online.</p>
                            <ul className="space-y-2 mb-8">
                                {bookingRules.map((rule) => (
                                    <li key={rule} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">→</span>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                            <div className="grid sm:grid-cols-2 gap-5 mb-4">
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                        <thead>
                                            <tr className="bg-av-blue text-white">
                                                <th className={TH} colSpan={2}>Regular examinations 2026</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PARIKSHA.calendar2026.regular.map((row, i) => (
                                                <tr key={row.session} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                    <td className="p-3 text-gray-700 font-semibold align-top whitespace-nowrap">{row.session}</td>
                                                    <td className="p-3 text-gray-600 align-top">{row.dates}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                                        <thead>
                                            <tr className="bg-av-blue text-white">
                                                <th className={TH} colSpan={2}>Online On-Demand (OLODE) 2026</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PARIKSHA.calendar2026.olode.map((row, i) => (
                                                <tr key={row.session} className={i % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                                                    <td className="p-3 text-gray-700 font-semibold align-top whitespace-nowrap">{row.session}</td>
                                                    <td className="p-3 text-gray-600 align-top">{row.dates}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-10">{PARIKSHA.calendar2026.tentative}</p>

                            {/* Profile updates */}
                            <h2 id="profile" className={H2}>Updating your profile later</h2>
                            <p className={P}>
                                You will need this when you move from one category to another — the same number carries over, the
                                category in the profile changes.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-5 mb-4">
                                <div className="border border-gray-200 rounded-xl p-5">
                                    <p className="font-montserrat font-bold text-av-blue text-sm mb-3">You can change these yourself</p>
                                    <ul className="space-y-2">
                                        {PARIKSHA.profileUpdates.selfService.map((item) => (
                                            <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                                                <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="border border-gray-200 rounded-xl p-5">
                                    <p className="font-montserrat font-bold text-av-blue text-sm mb-3">These need CEO verification</p>
                                    <ul className="space-y-2">
                                        {PARIKSHA.profileUpdates.needsApproval.map((item) => (
                                            <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                                                <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <p className={P}>{PARIKSHA.profileUpdates.note}</p>

                            {/* FAQs */}
                            <h2 id="faqs" className={H2}>Frequently asked questions</h2>
                            <div className="space-y-3 mb-10">
                                {faqs.map((faq) => (
                                    <details key={faq.q} className="border border-gray-200 rounded-xl p-4">
                                        <summary className="font-semibold text-av-blue text-sm cursor-pointer">{faq.q}</summary>
                                        <p className="text-gray-600 text-sm leading-relaxed mt-2">{faq.a}</p>
                                    </details>
                                ))}
                            </div>

                            {/* Sources */}
                            <h2 id="sources" className={H2}>Sources</h2>
                            <p className={P}>
                                Read on {CHECKED_ON}. Where these documents disagree with each other, this page leaves the figure
                                out rather than picking one.
                            </p>
                            <ul className="space-y-2 mb-10">
                                {PARIKSHA.sources.map((s) => (
                                    <li key={s.url} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                                        <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
                                    </li>
                                ))}
                            </ul>

                            {/* Honest CTA */}
                            <div className="bg-av-blue rounded-2xl p-8">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Want a second pair of eyes before you hit Final Submit?</h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    We cannot apply on your behalf and we have no influence over what CEO approves — nobody does.
                                    What we can do is check your documents against the list above, tell you which BVC case you fall
                                    under, and flag a name or date mismatch before it costs you a session. We teach the DGCA ground
                                    subjects in Dwarka and online, and we arrange flight training with partner flying schools.
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
                            <LeadForm title="Get Help with Computer Number" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">What you need to upload</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ Class 10 marksheet + pass certificate</li>
                                    <li>✓ Class 12 marksheet + pass certificate</li>
                                    <li>✓ Board Verification Certificate (both)</li>
                                    <li>✓ Date-of-birth proof (not Aadhaar)</li>
                                    <li>✓ Address proof, self-attested</li>
                                    <li>✓ Photo — JPG, {PARIKSHA.uploads.photo.maxKb} KB max</li>
                                    <li>✓ Signature — JPG, {PARIKSHA.uploads.signature.maxKb} KB max</li>
                                    <li>✓ Everything else — PDF only</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Issued within</h4>
                                <div className="text-3xl font-montserrat font-black">{PARIKSHA.processing.days} working days</div>
                                <div className="text-white/70 text-xs mt-2">Minimum age {PARIKSHA.basics.minAge} · no maximum age</div>
                                <div className="text-white/70 text-xs mt-1">Lifetime validity · one number per candidate</div>
                                <div className="text-white/70 text-xs mt-1">Regular paper {inr(PARIKSHA.fees.regularPerPaper)} · OLODE {inr(PARIKSHA.fees.olodePerPaper)}</div>
                                <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Ask a question
                                </a>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={500}>
                            <div className="border border-gray-200 rounded-2xl p-6">
                                <h4 className="font-montserrat font-bold text-av-blue mb-3 text-sm">Next steps</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/dgca-pariksha" className={A}>DGCA Pariksha: papers, fees and dates</Link></li>
                                    <li><Link href="/ecga-login-your-complete-guide" className={A}>eGCA registration and login</Link></li>
                                    <li><Link href="/dgca-ground-classes" className={A}>DGCA ground classes</Link></li>
                                    <li><Link href="/commercial-pilot-license" className={A}>Commercial Pilot Licence (CPL)</Link></li>
                                    <li><Link href="/rtr-a" className={A}>RTR (A)</Link></li>
                                    <li><Link href="/ppl-full-form" className={A}>Private Pilot Licence (PPL)</Link></li>
                                </ul>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}
