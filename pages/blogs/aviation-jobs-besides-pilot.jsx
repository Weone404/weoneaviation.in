import Link from 'next/link';
import BlogPostLayout from '../../components/BlogPostLayout';
import { AVIATION_CAREERS as CAREERS, MEDICAL_STANDARDS as MED, PARIKSHA, EDUCATION, LICENCES, inr, ACADEMY } from '../../lib/facts';

/*
 * /blogs/aviation-jobs-besides-pilot — new 2026-09-15. Backlog item 2.1.
 *
 * WHY IT EXISTS. This post already existed, at
 * /blogs/6a13dbf1ad864b831525ec3b — a MongoDB ObjectId. It is substantial,
 * around 1,300 words, it maps 23,190 monthly searches across 24 keywords, and
 * it self-canonicalises to a URL that reads like a database key and is absent
 * from the sitemap. A second copy of the same post sits at
 * /blogs/6a38b7aece6bdc909efab785. Both now 301 here, in this commit, per the
 * standing rule in next.config.js that a redirect activates only alongside the
 * destination that justifies it.
 *
 * WHY IT IS WRITTEN THIS WAY. Every page on this subject — and VFTI, who owns
 * the territory, ranks first for "AME" at 27,100 — lists ten careers in
 * cheerful paragraphs. None of them draws the line that actually matters to
 * someone choosing: which of these roles the regulator licences, and which it
 * does not. That line is the page.
 *
 * All figures render from lib/facts.js AVIATION_CAREERS, which carries the
 * sourcing note. The unlicensed roles get no invented entry requirements; the
 * page says who sets them instead. No salary figures anywhere — see the DO NOT
 * ADD note in lib/facts.js and the patterns in scripts/check-claims.js.
 */

const DATE_PUBLISHED = '2026-09-15';
const CANONICAL = 'https://weoneaviation.in/blogs/aviation-jobs-besides-pilot';
const AME = CAREERS.licensed[0];
const ATC_MED = MED.classes[2];

const peopleAlsoAsk = [
    {
        q: 'Which aviation jobs need a licence from DGCA?',
        a: `Five that this page covers: ${CAREERS.licensed.map((c) => c.role.replace(/ \(.*\)/, '')).join(', ')}. Everything else in aviation — cabin crew, ground handling, airport operations, airline management — is a real career, but its entry requirements are set by the airline or the airport operator rather than by the regulator.`,
    },
    {
        q: 'What are the eligibility requirements to become an AME in India?',
        a: `Minimum age ${AME.minAge}. ${AME.maxAge} ${AME.education} Note the subject list: ${AME.differsBy}`,
    },
    {
        q: 'Is AME easier than becoming a pilot?',
        a: `It is different, not easier, and the honest comparison is cost and structure rather than difficulty. An AME examination paper costs ${inr(AME.examFeeRegular)} in a regular session against ${inr(PARIKSHA.fees.regularPerPaper)} for a pilot paper, and a candidate may apply for up to ${AME.modulesPerSession} modules in a session. The much larger difference is that a pilot licence requires 200 hours of flying paid for at commercial rates, and an engineering licence does not.`,
    },
    {
        q: 'Can I switch from pilot training to AME?',
        a: `The subject requirement is the thing to check first. Pilots need ${EDUCATION.requirement.replace('Class ', '')}; AME candidates need Physics, Chemistry and Mathematics. If you took Chemistry as well, both routes are open to you. If you did not, the AME route needs it added.`,
    },
    {
        q: 'What medical does an air traffic controller need?',
        a: `${ATC_MED.cls}, which is its own class rather than either of the pilot classes. ${ATC_MED.validity}`,
    },
    {
        q: 'Does DGCA examine flight dispatchers?',
        a: 'Yes. Flight Dispatcher, Flight Engineer and Flight Navigator are flight crew examination categories conducted by the same Central Examination Organisation that examines pilots, on the same portal.',
    },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Aviation Jobs Besides Airline Pilot: Which Ones DGCA Actually Licences',
    description:
        'The aviation careers the regulator licences — Aircraft Maintenance Engineer, Flight Dispatcher, Flight Engineer, Flight Navigator and Air Traffic Controller — with the age, subjects and fees DGCA publishes for each, and an honest line around the roles it does not licence.',
    inLanguage: 'en-IN',
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_PUBLISHED,
    articleSection: 'Aviation careers',
    keywords: 'aviation jobs besides pilot, aviation careers india, ame eligibility, aircraft maintenance engineer, flight dispatcher india, air traffic controller india, aviation courses after 12th',
    mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
    image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
    publisher: {
        '@type': 'EducationalOrganization', name: ACADEMY.name, url: ACADEMY.url,
        logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
    },
    citation: CAREERS.sources.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.url })),
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: peopleAlsoAsk.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const tocHeadings = [
    { id: 'licensed', title: 'The five roles DGCA licences' },
    { id: 'ame-vs-pilot', title: 'AME against pilot, honestly' },
    { id: 'not-licensed', title: 'The careers DGCA does not licence' },
    { id: 'choosing', title: 'Choosing between them' },
    { id: 'faqs', title: 'Frequently asked questions' },
    { id: 'sources', title: 'Sources' },
];

const related = [
    { lead: 'If the pilot route is the one you want, start with', anchor: 'every eligibility requirement in order', href: '/commercial-pilot-license-eligibility' },
    { lead: 'For the whole path from Class 12 to a licence, see', anchor: 'the full route', href: '/your-guide-on-how-to-become-a-pilot-in-india' },
    { lead: 'For the medical classes, including the Class 3 an air traffic controller holds, see', anchor: 'the medical guide', href: '/dgca-class-2-class-1-medical' },
    { lead: 'For the examination portal all of these share, see', anchor: 'the DGCA computer number guide', href: '/dgca-computer-number' },
    { lead: 'For what pilot training actually costs, see', anchor: 'our cost page', href: '/cost-transparency' },
];

const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-3 mt-10 underline-orange scroll-mt-24';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function AviationJobsBesidesPilot() {
    return (
        <BlogPostLayout
            title="Aviation Jobs Besides Pilot: What DGCA Licences"
            description="The aviation careers DGCA actually licences, with the age, subjects and fees it publishes for each — and an honest line around the roles it does not."
            schema={[articleSchema, faqSchema]}
            heading="Aviation Jobs Besides Airline Pilot: Which Ones DGCA Actually Licences"
            category="Aviation careers"
            datePublished={DATE_PUBLISHED}
            dateModified={DATE_PUBLISHED}
            readingTime="9 min"
            quickAnswer={{
                question: 'Which aviation jobs besides pilot are licensed by DGCA?',
                answer: `Five: ${CAREERS.licensed.map((c) => c.role.replace(/ \(.*\)/, '')).join(', ')}. Each has an entry requirement published by the regulator. Cabin crew, ground handling, airport operations and airline management are real aviation careers, but their requirements are set by the employer rather than by DGCA, which is the distinction this page is built around.`,
            }}
            summaryTitle="What the regulator sets, and what it does not"
            summaryItems={[
                `Aircraft Maintenance Engineer: minimum age ${AME.minAge}, no maximum, 10+2 with Physics, Chemistry and Mathematics`,
                `AME examination fee ${inr(AME.examFeeRegular)} a paper against ${inr(PARIKSHA.fees.regularPerPaper)} for a pilot paper, up to ${AME.modulesPerSession} modules a session`,
                'Pilots need Physics and Mathematics; AME candidates need Physics, Chemistry and Mathematics — DGCA states both side by side in its rejection-reasons list',
                'Flight Dispatcher, Flight Engineer and Flight Navigator are DGCA flight crew examination categories on the same portal as pilots',
                `Air traffic control holds a ${ATC_MED.cls}, not a pilot medical class`,
                'The largest financial difference: a pilot licence requires 200 hours of flying bought at commercial rates, an engineering licence requires none',
            ]}
            tocHeadings={tocHeadings}
            related={related}
        >
            <p className={P}>
                Most articles on this subject list ten aviation careers in ten cheerful paragraphs and leave you no better able to
                choose between them. The line that actually matters is simpler and nobody draws it: <strong>some of these jobs
                require a licence from the regulator, and some do not.</strong> That single distinction tells you which careers have
                a published entry requirement you can plan against, and which depend on who is hiring.
            </p>
            <p className={P}>
                Everything below about the licensed roles comes from DGCA&rsquo;s own published material, checked on{' '}
                {CAREERS.verifiedOn.split('-').reverse().join('/')}. For the roles DGCA does not licence, this page says so rather
                than inventing a requirement.
            </p>

            <h2 id="licensed" className={H2}>The five roles DGCA licences</h2>
            <p className={P}>
                These have entry requirements set by the regulator, published, and the same for everyone. You can plan a life around
                them because they do not change with the hiring market.
            </p>

            <div className="border-2 border-av-orange rounded-xl p-5 mb-6">
                <p className="font-montserrat font-bold text-av-blue text-base mb-1">{AME.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{AME.what}</p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-4">
                    <p className="text-sm text-gray-600"><span className="font-semibold text-av-blue">Minimum age:</span> {AME.minAge}</p>
                    <p className="text-sm text-gray-600"><span className="font-semibold text-av-blue">Maximum age:</span> none</p>
                    <p className="text-sm text-gray-600"><span className="font-semibold text-av-blue">Exam fee:</span> {inr(AME.examFeeRegular)} a paper, {inr(AME.examFeeOlode)} on demand</p>
                    <p className="text-sm text-gray-600"><span className="font-semibold text-av-blue">Per session:</span> up to {AME.modulesPerSession} modules</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3"><span className="font-semibold text-av-blue">Education:</span> {AME.education}</p>
                <div className="bg-av-light rounded-lg p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{AME.differsBy}</p>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mt-3">
                    Governed by {AME.governedBy}. {AME.sameAs}
                </p>
            </div>

            <div className="space-y-3 mb-6">
                {CAREERS.licensed.slice(1).map((c) => (
                    <div key={c.role} className="border border-gray-200 rounded-xl p-5">
                        <p className="font-montserrat font-bold text-av-blue text-sm mb-1">{c.role}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{c.what}</p>
                        <p className="text-gray-500 text-xs leading-relaxed">{c.note}</p>
                    </div>
                ))}
            </div>
            <p className={P}>
                The three flight crew categories are worth pausing on, because almost nobody mentions them. Flight Dispatcher, Flight
                Engineer and Flight Navigator sit on the same examination portal as pilots, run by the same Central Examination
                Organisation, and a candidate applies for them with the same kind of computer number. If you have been reading about
                the DGCA examination process for pilots, you already understand most of the machinery behind these.
            </p>
            <p className={P}>
                For air traffic control, the entry point people miss is the medical. It is a{' '}
                {ATC_MED.cls.toLowerCase()}, not either of the pilot classes, and it lasts longer when you are young: {ATC_MED.validity.toLowerCase()}{' '}
                The full medical picture is on our{' '}
                <Link href="/dgca-class-2-class-1-medical" className={A}>Class 1 and Class 2 medical guide</Link>, which sets out all
                three classes side by side.
            </p>

            <h2 id="ame-vs-pilot" className={H2}>AME against pilot, honestly</h2>
            <p className={P}>
                This is the comparison most readers are actually making, and it is usually answered with which one is &ldquo;easier&rdquo;.
                Neither is easy. The differences that matter are structural.
            </p>
            <div className="overflow-x-auto mb-4">
                <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
                    <thead>
                        <tr className="bg-av-blue text-white">
                            <th className="text-left p-3 font-montserrat font-bold">&nbsp;</th>
                            <th className="text-left p-3 font-montserrat font-bold">Pilot (CPL)</th>
                            <th className="text-left p-3 font-montserrat font-bold">AME</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="p-3 font-semibold text-av-blue align-top">Subjects at 10+2</td>
                            <td className="p-3 text-gray-600 align-top">Physics and Mathematics</td>
                            <td className="p-3 text-gray-600 align-top">Physics, Chemistry and Mathematics</td>
                        </tr>
                        <tr className="bg-av-light">
                            <td className="p-3 font-semibold text-av-blue align-top">Minimum age</td>
                            <td className="p-3 text-gray-600 align-top">{PARIKSHA.basics.minAge} to register for examinations, {LICENCES.find((l) => l.code === 'CPL').minAge} to hold the licence</td>
                            <td className="p-3 text-gray-600 align-top">{AME.minAge} to register, no maximum</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 font-semibold text-av-blue align-top">Examination fee</td>
                            <td className="p-3 text-gray-600 align-top">{inr(PARIKSHA.fees.regularPerPaper)} a paper, {inr(PARIKSHA.fees.olodePerPaper)} on demand</td>
                            <td className="p-3 text-gray-600 align-top">{inr(AME.examFeeRegular)} a paper, {inr(AME.examFeeOlode)} on demand</td>
                        </tr>
                        <tr className="bg-av-light">
                            <td className="p-3 font-semibold text-av-blue align-top">The big cost</td>
                            <td className="p-3 text-gray-600 align-top">200 hours of flying, paid at commercial rates</td>
                            <td className="p-3 text-gray-600 align-top">Training and experience, with no flying to buy</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="p-3 font-semibold text-av-blue align-top">Medical</td>
                            <td className="p-3 text-gray-600 align-top">Class 2 to train, Class 1 for the licence</td>
                            <td className="p-3 text-gray-600 align-top">No flight crew medical class applies</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className={P}>
                The last two rows are the ones that change decisions. A pilot licence has a large, unavoidable cost attached to
                flying hours and a medical that has to be cleared and then kept. An engineering licence has neither. If a medical
                finding closes the pilot route, the engineering route is very often still open — and that is worth knowing before
                you book a medical, not after.
            </p>

            <h2 id="not-licensed" className={H2}>The careers DGCA does not licence</h2>
            <p className={P}>{CAREERS.notLicensedNote}</p>
            <p className={P}>
                That is not a smaller list or a lesser one. It is a different kind of career: entry is set by employers, so it moves
                with the market, and the way in is an employer&rsquo;s own selection process rather than a published examination. If
                you see a page quoting exact eligibility criteria for cabin crew or ground staff as though a regulator had set them,
                ask which document it came from.
            </p>

            <h2 id="choosing" className={H2}>Choosing between them</h2>
            <p className={P}>
                Three questions settle most of it, and none of them is about which job sounds best.
            </p>
            <ol className="space-y-3 mb-6">
                {[
                    'Did you take Chemistry at 10+2? If yes, both the pilot and AME routes are open. If you took only Physics and Mathematics, the pilot route is open and AME needs Chemistry added.',
                    'Can you fund flying hours, or would you rather a route without them? This is the largest financial difference in aviation and it has nothing to do with aptitude.',
                    'Are you confident about a Class 1 medical? If there is real doubt, find out early — a licensed engineering or dispatch route does not depend on it.',
                ].map((q, i) => (
                    <li key={q} className="flex gap-3 items-start text-sm text-gray-600">
                        <span className="w-6 h-6 bg-av-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{i + 1}</span>{q}
                    </li>
                ))}
            </ol>
            <p className={P}>
                If the pilot route is the one you want, our{' '}
                <Link href="/commercial-pilot-license-eligibility" className={A}>eligibility guide</Link> sets out all five
                requirements with the rule behind each, and{' '}
                <Link href="/your-guide-on-how-to-become-a-pilot-in-india" className={A}>the full route</Link> shows the order to do
                them in.
            </p>

            <h2 id="faqs" className={H2}>Frequently asked questions</h2>
            <div className="space-y-3 mb-8">
                {peopleAlsoAsk.map((f) => (
                    <details key={f.q} className="border border-gray-200 rounded-xl p-4">
                        <summary className="font-semibold text-av-blue text-sm cursor-pointer">{f.q}</summary>
                        <p className="text-gray-600 text-sm leading-relaxed mt-2">{f.a}</p>
                    </details>
                ))}
            </div>

            <h2 id="sources" className={H2}>Sources</h2>
            <ul className="space-y-2 mb-8">
                {CAREERS.sources.map((s) => (
                    <li key={s.url} className="flex gap-2 items-start text-sm text-gray-600">
                        <span className="text-av-orange font-bold flex-shrink-0">–</span>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className={A}>{s.label}</a>
                    </li>
                ))}
                <li className="flex gap-2 items-start text-sm text-gray-600">
                    <span className="text-av-orange font-bold flex-shrink-0">–</span>
                    {MED.car.citation} — the Class 3 medical for air traffic control and its validity bands
                </li>
            </ul>

            <div className="bg-av-blue rounded-2xl p-6">
                <p className="text-white/80 text-sm leading-relaxed mb-2">{ACADEMY.scope}</p>
                <p className="text-white/60 text-xs leading-relaxed">
                    We teach the pilot ground subjects. We are not an AME institute and we do not train air traffic controllers, so
                    if this page pushes you towards one of those, we have done our job and you should go and find the right school
                    for it.
                </p>
            </div>
        </BlogPostLayout>
    );
}
