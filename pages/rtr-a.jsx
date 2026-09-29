import Head from 'next/head';
import Layout from '../components/Layout';
import StructuredData from '../components/StructuredData';
import HeroSlider from '../components/HeroSlider';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import { generateCourseSchema } from '../lib/schema';

/*
 * Rewritten 2026-08-19 against primary text.
 *
 * This page previously described RTR(A) as issued by the Wireless Planning and
 * Coordination (WPC) Wing of the Ministry of Communications, examined in two
 * oral parts. That is the superseded position. The Radio Telephone Operator
 * (Restricted) Certificate and Licence Rules, 2025 — G.S.R. 413(E), 25 June
 * 2025, made under the Bharatiya Vayuyan Adhiniyam, 2024 — put the certificate
 * under the Director General of Civil Aviation and set the examination as a
 * written paper followed by a practical test, not two vivas.
 *
 * Operational specifics that were stated under the WPC framing (where to apply,
 * portal names, fees, whether a transition applies to holders of the old
 * certificate) are NOT restated here. They were not verifiable from the Rules,
 * and the Rules leave the form and manner of application "as specified by the
 * Director General".
 */
const LAST_UPDATED = 'August 19, 2026';
const LAST_UPDATED_ISO = '2026-08-19';

const heroSlides = [
    { id: 1, image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80', tag: 'DGCA Subject', title: 'RTR (Aero)', highlight: 'Radio Telephony Licence', sub: 'Radio Telephone Operator (Restricted) Certificate and Licence — We One Aviation Academy' },
];

/* Rule 6 of the 2025 Rules. */
const eligibility = [
    ['Minimum age', '16 years on the date of application', 'Rule 6(a)'],
    ['Education', 'Passed Class X or equivalent from a recognised Board', 'Rule 6(b)'],
    ['Re-sit after a fail', 'Not permitted within six weeks of the examination', 'Rule 6, proviso'],
    ['Non-Indian applicants', 'Security clearance from the Government of India required', 'Rule 6, second proviso'],
];

/* Rule 8(4)-(6). Written first; practical only after the written is passed. */
const examStructure = [
    ['Written examination', 'Regulations and procedure; radio principles and practice; radio telephony — syllabus as specified by the Director General', 'Rule 8(4)(a), 8(5)(i)'],
    ['Practical examination', 'Radio telephony test conducted over a simulated environment: phonetic alphabet, general radio-telephone procedure, and communications with mobile and base stations', 'Rule 8(4)(b), 8(5)(ii)'],
    ['Sequence', 'No applicant may sit the practical until the written examination is passed', 'Rule 8(4), proviso'],
    ['Validity window', 'The practical must be passed within three years of passing the written', 'Rule 8(6)'],
];

/* The practical asks for these tasks — Rule 8(5)(ii), Explanation. */
const practicalTasks = [
    'Preparation of messages for transmission',
    'Exchange of traffic and use of priorities',
    'Obtaining meteorological information',
    'Position reporting',
    'Distress and urgency communications',
];

/* Rule 8(4), second proviso. */
const writtenExemptions = [
    'A qualified pilot of the Indian Air Force, Indian Navy, Indian Army or Indian Coast Guard holding the flying experience and competency specified by the Director General',
    'A holder of a valid Radio Telephone Operator’s (Restricted) Certificate and Licence issued under the Indian Wireless Telegraphy (Commercial Radio Operator’s Certificate of Proficiency and Licence to Operate Wireless Telegraphy) Rules, 1954',
    'A holder of a valid Flight Radio Telephone Operator’s Licence, or equivalent, issued by a Commonwealth country or the Philippines',
];

const howWeTeach = [
    'One-on-one mock viva sessions.',
    'Daily phraseology drills and script-based simulations.',
    'Group discussions for confidence building.',
    'Voice clarity training and callout practice.',
    'Access to past RTR questions and exam feedback.',
];

const whoNeeds = [
    { icon: '✈️', title: 'Commercial Pilot Licence applicants', desc: 'Schedule II, Section J, paragraph 1(g) of the Aircraft Rules, 1937 requires a CPL applicant to hold a current Flight Radio Telephone Operator’s Licence.' },
    { icon: '🛩️', title: 'Private pilots', desc: 'Operating aircraft radio equipment in controlled airspace.' },
    { icon: '🌍', title: 'Foreign licence holders', desc: 'Converting a licence to the Indian register, unless exempted under Rule 8(4).' },
    { icon: '🎓', title: 'Flight instructors and cadet pilots', desc: 'Operating radio telephone equipment on board an aircraft.' },
];

const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'RTR (Aero): Radio Telephone Operator (Restricted) Certificate and Licence',
    description: 'What the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025 require: eligibility, written and practical examination structure, and exemptions.',
    inLanguage: 'en-IN',
    dateModified: LAST_UPDATED_ISO,
    mainEntityOfPage: 'https://weoneaviation.in/rtr-a',
    publisher: {
        '@type': 'EducationalOrganization',
        name: 'We One Aviation Academy',
        url: 'https://weoneaviation.in',
    },
};


const courseSchema = generateCourseSchema({
  name: 'RTR (A) Preparation — Radio Telephone Operator (Restricted) Certificate',
  description: 'Preparation for the RTR (A) examination, the Radio Telephone Operator (Restricted) Certificate required for licence issue and examined separately from the DGCA written papers.',
  url: 'https://weoneaviation.in/rtr-a',
  courseMode: 'blended',
  duration: 'PT3M',
});

export default function RTRAero() {
    return (
        <Layout
            title="RTR (Aero) Licence — Radio Telephone Operator (Restricted) | We One Aviation"
            description="RTR (Aero) under the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025: eligibility, written and practical examination structure, and exemptions. Classes in Dwarka, New Delhi."
        >
      <StructuredData data={courseSchema} />

            <Head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            </Head>
            <HeroSlider customSlides={heroSlides} asH1={false} />

            <section className="py-20 px-4">
                <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2">
                        <ScrollReveal>
                            <div className="section-tag">DGCA Subject</div>
                            <h1 className="font-montserrat text-3xl font-bold text-av-blue mb-4 underline-orange">
                                RTR (Aero) – Radio Telephone Operator (Restricted) Certificate and Licence
                            </h1>

                            {/* Direct answer. Written to stand alone if extracted. */}
                            <p className="text-gray-700 leading-relaxed mb-6 text-base">
                                RTR (Aero) is the Radio Telephone Operator (Restricted) Certificate and Licence required to operate aircraft radio equipment in Indian airspace. Since 25 June 2025 it is governed by the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025 and administered by the Directorate General of Civil Aviation, replacing the earlier WPC route.
                            </p>

                            <p className="text-gray-500 text-xs mb-8">{`Last updated: ${LAST_UPDATED}`}</p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                                {[['DGCA', 'Administered by'], ['Written + Practical', 'Examination'], ['16 years', 'Minimum age'], ['Class X', 'Education']].map(([val, label]) => (
                                    <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                                        <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                                        <div className="text-gray-500 text-xs mt-1">{label}</div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Which rules govern RTR (Aero)</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                The governing instrument is the <span className="font-semibold text-av-blue">Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025</span>, notified as G.S.R. 413(E) on 25 June 2025 by the Ministry of Civil Aviation under sections 10, 11, 19, 30 and 33 of the <span className="font-semibold text-av-blue">Bharatiya Vayuyan Adhiniyam, 2024</span>.
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                Rule 2(c) defines &ldquo;Director General&rdquo; as the Director General of Civil Aviation. Rule 4 makes the Central Government the authority to grant or extend the certificate and licence. Applications are made to the Director General in the form and manner he specifies (Rule 7).
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                Rule 3 states the operative prohibition: no person may operate the radio telephone service of an aircraft station on frequencies allocated to the aeronautical mobile or aeronautical mobile-satellite service without holding a valid certificate and licence issued or recognised by the Central Government.
                            </p>

                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Eligibility</h2>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
                                <table className="w-full text-sm">
                                    <caption className="sr-only">RTR (Aero) eligibility under the Radio Telephone Operator (Restricted) Certificate and Licence Rules, 2025</caption>
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Requirement</th>
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">What the Rules say</th>
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Clause</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eligibility.map(([k, v, ref], i) => (
                                            <tr key={k} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">{k}</th>
                                                <td className="p-3 text-gray-600 text-xs">{v}</td>
                                                <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">{ref}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Examination structure</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                The examination has two components, taken in order. The 2025 Rules replaced the earlier two-part oral format.
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                                <table className="w-full text-sm">
                                    <caption className="sr-only">RTR (Aero) examination structure under the 2025 Rules</caption>
                                    <thead>
                                        <tr className="bg-av-blue text-white">
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Component</th>
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Content</th>
                                            <th scope="col" className="p-3 text-left text-xs font-semibold">Clause</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examStructure.map(([k, v, ref], i) => (
                                            <tr key={k} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <th scope="row" className="p-3 text-av-blue font-semibold text-xs text-left">{k}</th>
                                                <td className="p-3 text-gray-600 text-xs">{v}</td>
                                                <td className="p-3 text-av-orange font-semibold text-xs whitespace-nowrap">{ref}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                The Explanation to Rule 8(5)(ii) lists what the practical expects a candidate to carry out:
                            </p>
                            <ul className="space-y-2 mb-10">
                                {practicalTasks.map((item) => (
                                    <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3">Exemption from the written examination</h2>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Rule 8(4) allows the Director General to exempt three categories of applicant from the written paper:
                            </p>
                            <ul className="space-y-2 mb-4">
                                {writtenExemptions.map((item) => (
                                    <li key={item.slice(0, 30)} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                A holder whose certificate was granted before these Rules commenced, and is suspended or subject to pending proceedings, may not sit the examinations until the suspension expires.
                            </p>

                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">Who needs RTR (Aero)</h3>
                            <div className="space-y-3 mb-10">
                                {whoNeeds.map((item) => (
                                    <div key={item.title} className="flex gap-3 items-start text-sm text-gray-600">
                                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                                        <span><span className="font-semibold text-av-blue">{item.title}:</span> {item.desc}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="font-montserrat text-xl font-bold text-av-blue mb-3">How We One Aviation prepares you</h3>
                            <ul className="space-y-2 mb-10">
                                {howWeTeach.map((item) => (
                                    <li key={item} className="flex gap-2 items-start text-sm text-gray-600">
                                        <span className="text-av-orange font-bold flex-shrink-0">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="bg-av-blue rounded-2xl p-8 text-center">
                                <h3 className="font-montserrat text-xl font-bold text-white mb-3">Join RTR (Aero) Classes</h3>
                                <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto mb-5">
                                    We One Aviation Academy runs DGCA ground classes in Dwarka, Delhi. Take the first step toward the skies. ✈️
                                </p>
                                <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all text-sm">
                                    Book Free Counselling
                                </Link>
                            </div>

                        </ScrollReveal>
                    </div>

                    <div className="space-y-6">
                        <ScrollReveal delay={200}>
                            <LeadForm title="Join RTR (Aero) Classes" />
                        </ScrollReveal>

                        <ScrollReveal delay={300}>
                            <div className="bg-av-blue rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-4">Who needs RTR</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li>✓ CPL applicants</li>
                                    <li>✓ Private pilots (controlled airspace)</li>
                                    <li>✓ Foreign licence converters</li>
                                    <li>✓ Flight instructors</li>
                                    <li>✓ Cadet pilots</li>
                                </ul>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-av-orange rounded-2xl p-6 text-white">
                                <h4 className="font-montserrat font-bold mb-2">Examination at a glance</h4>
                                <div className="text-2xl font-montserrat font-black">Written + Practical</div>
                                <div className="text-white/70 text-xs mt-1">Practical only after the written is passed</div>
                                <div className="text-white/70 text-xs mt-1">Practical within three years of the written</div>
                                <div className="text-white/70 text-xs mt-1">RTR Rules, 2025 — administered by DGCA</div>
                                <a href="https://wa.me/919355611996" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 block bg-white text-av-orange font-bold text-center py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-all">
                                    Get Free Counselling
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>
            </section>
        </Layout>
    );
}
