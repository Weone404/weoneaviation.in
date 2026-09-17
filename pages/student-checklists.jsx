import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import StructuredData from '../components/StructuredData';
import Link from 'next/link';
import { useState } from 'react';
import { generateFAQSchema } from '../lib/schema';
import {
  ACADEMY, LICENCES, EDUCATION, DGCA_PAPERS, RTR, CPL_HOURS, EXAM_RULES,
  PARIKSHA, EGCA, MEDICAL_STANDARDS as MED, inr,
} from '../lib/facts';

/*
 * /student-checklists — rebuilt 2026-09-17.
 *
 * TWO PROBLEMS, one of which was the reason it was on the list and one of
 * which was worse.
 *
 * The listed problem: no structured data at all. The page emits its own FAQ
 * block — it is in existingFaqRoutes in data/pageFaqs.js — but shipped no
 * FAQPage node, no Article node and no ItemList, so a checklist page, which is
 * the single most schema-friendly shape there is, was invisible to answer
 * engines. That is fixed: Article, three ItemLists and a FAQPage.
 *
 * The worse problem, found on opening it: almost none of the checklist was
 * true. It told students to visit dgcaonline.nic.in, which is not the portal;
 * to pay a registration fee of "₹2,000-3,000", which is not a published
 * figure; to clear "the five DGCA papers" alongside a month-by-month timetable
 * that nobody set; to download a certificate from "ECGA"; and then walked them
 * through being promoted to Senior First Officer and progressing to the
 * captain's seat, none of which is a checklist item and none of which we can
 * promise. The invented milestones ("Month 6: DGCA exams cleared", "Complete
 * 50+ solo flying hours", "Build flying hours (1,500+)") were the worst of it,
 * because a student who misses an invented deadline thinks they are behind.
 *
 * WHAT IT IS NOW. Every item is either a regulatory requirement with its
 * source, or a piece of document hygiene that follows from one. No timetable,
 * because no authority publishes one and the honest answer is that it depends
 * on examination sessions, weather and aircraft availability. No career
 * ladder, because we do not employ pilots and cannot promise a seat. Nothing
 * about placement.
 *
 * MAINTENANCE. Everything renders from lib/facts.js. If a fee, a validity
 * window or a portal changes, it changes there and this page follows. Do not
 * hard-code a figure into this file.
 */

const CANONICAL = 'https://weoneaviation.in/student-checklists';
const LAST_UPDATED = '17 September 2026';

const cplLicence = LICENCES.find((l) => l.code === 'CPL');
const splLicence = LICENCES.find((l) => l.code === 'SPL');

const checklists = {
  before: {
    key: 'before',
    title: 'Before you start',
    icon: '📋',
    color: 'from-blue-500 to-cyan-500',
    description: 'Eligibility, the computer number, and the medical — in the order that saves money',
    intro:
      'Three things decide whether you can start at all, and two of them can be done from home before you pay any school anything. Do them in this order.',
    sections: [
      {
        name: 'Confirm you are eligible',
        source: 'Aircraft Rules, 1937, Schedule II',
        items: [
          `Age: ${splLicence.minAge} for a ${splLicence.name}, ${cplLicence.minAge} for a ${cplLicence.name}. The licence you train on and the licence you are training towards have different minimum ages`,
          `Education: ${EDUCATION.requirement} (${EDUCATION.clause})`,
          `If you took Biology or Commerce: ${EDUCATION.altRoute}`,
          'Read what each licence actually permits before choosing one — a Student Pilot Licence never carries passengers and never flies for payment',
        ],
      },
      {
        name: 'Register for the computer number',
        source: `DGCA Pariksha, ${PARIKSHA.portal}`,
        items: [
          'No medical certificate and no flying school are needed for this step — it can be done before you have either',
          'Use NEW Candidate Registration. Anyone with a UDAAN-era record uses OLD Candidate Registration instead',
          'Enter your name, date of birth, father’s name and mother’s name exactly as they appear on the Class 10 certificate',
          'Use an Indian mobile number with the +91 prefix, and keep it reachable for the OTP',
          'Activate the account from the emailed link within 24 hours — after that you register again from scratch',
          'Set a password of at least 8 characters with an uppercase letter, a lowercase letter, a numeral and a special character',
        ],
      },
      {
        name: 'Get the uploads right the first time',
        source: 'DGCA Pariksha upload specification',
        items: [
          `Photograph: ${PARIKSHA.uploads.photo.size}`,
          `${PARIKSHA.uploads.photo.face}. ${PARIKSHA.uploads.photo.age}. ${PARIKSHA.uploads.photo.format}, maximum ${PARIKSHA.uploads.photo.maxKb} KB`,
          `Signature: ${PARIKSHA.uploads.signature.size}. ${PARIKSHA.uploads.signature.format}, maximum ${PARIKSHA.uploads.signature.maxKb} KB`,
          ...PARIKSHA.uploads.pdfLimits.map((l) => `${l.documents} — maximum ${l.maxKb} KB each`),
          PARIKSHA.uploads.finalSubmit,
        ],
      },
      {
        name: 'Book the medical before you commit money',
        source: MED.car.citation,
        items: [
          MED.classOrder.advice,
          `Class 2 covers the Student Pilot Licence and the Private Pilot Licence. ${MED.classes[1].validity}`,
          `Class 1 is what the Commercial Pilot Licence needs. ${MED.classes[0].validity}`,
          `The appointment is booked on the eGCA module: ${MED.process.booking}`,
          `An initial Class 1 can only be done at ${MED.centres.initialIssueOnly.list.join(', ')}`,
          `At the Air Force centres DGCA charges ${MED.fees.rows[0].label} for a Class 1 and ${MED.fees.rows[2].label} for a Class 2, paid on Bharatkosh before the examination. Investigation charges are separate`,
          MED.classOrder.notMandatory,
        ],
      },
      {
        name: 'Documents to have scanned and ready',
        source: 'Derived from what the two portals ask you to upload',
        items: [
          'Class 10 marksheet and pass certificate',
          'Class 12 marksheet and pass certificate',
          'Date-of-birth certificate',
          'Board verification certificates for Class 10 and Class 12',
          '10+2 equivalence certificate, if your board is not an Indian school board',
          'Address proof',
          'Aadhaar',
          'Passport, if you have one — you will need it if you ever train or convert a licence abroad',
          'A clean, current photograph and signature to the exact specifications above',
        ],
      },
    ],
  },

  training: {
    key: 'training',
    title: 'While you train',
    icon: '🎓',
    color: 'from-purple-500 to-pink-500',
    description: 'The examinations, the radio licence, the hours and the logbook',
    intro:
      'There is no published month-by-month schedule for any of this and anyone who gives you one has invented it. What is published is what has to be finished, and the windows inside which it stays valid. Plan backwards from the licence application, not forwards from the first paper.',
    sections: [
      {
        name: 'The written examinations',
        source: `${EXAM_RULES.car.section}, ${EXAM_RULES.car.series} ${EXAM_RULES.car.part}, ${EXAM_RULES.car.revision} dated ${EXAM_RULES.car.dated}`,
        items: [
          `${DGCA_PAPERS.length} subjects: ${DGCA_PAPERS.join(', ')}`,
          EXAM_RULES.theory.statement,
          EXAM_RULES.theory.perSubject,
          `Fee: ${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session, ${inr(PARIKSHA.fees.olodePerPaper)} on demand. ${PARIKSHA.fees.serviceCharge}`,
          'A failed paper is retaken on its own. There is no aggregate to rescue it and no penalty attached to the other subjects',
        ],
      },
      {
        name: 'Watch the validity window',
        source: `${EXAM_RULES.car.series} ${EXAM_RULES.car.part}, ${EXAM_RULES.paperValidity.clause}`,
        items: [
          EXAM_RULES.paperValidity.general,
          EXAM_RULES.paperValidity.cplAtpl,
          EXAM_RULES.paperValidity.planningNote,
          'Diarise the expiry of your first pass, not just the date of your next attempt',
        ],
      },
      {
        name: 'The radio licence, which is separate',
        source: RTR.instrument,
        items: [
          `${RTR.name} is examined separately from the written papers`,
          RTR.note,
          'Treat it as its own project with its own timetable — it is not part of the DGCA paper set and does not clear itself',
        ],
      },
      {
        name: 'The flying hours',
        source: `Aircraft Rules, 1937, Schedule II, ${CPL_HOURS.clause}`,
        items: [
          `${CPL_HOURS.total} hours total for a Commercial Pilot Licence`,
          ...CPL_HOURS.components.map((c) => `${c.label}: ${c.hours} hours — ${c.note}`),
          `The hours must be flown within ${CPL_HOURS.recencyYears} years preceding the application`,
        ],
      },
      {
        name: 'Keep the paperwork current as you go',
        source: `eGCA, ${EGCA.url}`,
        items: [
          'Have the flying training organisation e-validate your logbook as hours accrue, not in one batch at the end',
          'Renew the medical before it lapses — a lapsed Class 1 beyond two years sends you back to an initial examination at a restricted centre',
          'Clear the English Language Proficiency examination at Level 4 or above',
          'Keep your eGCA profile details identical to your Class 10 record; a mismatch between portals is the most common avoidable delay',
        ],
      },
    ],
  },

  licence: {
    key: 'licence',
    title: 'Applying for the licence',
    icon: '✈️',
    color: 'from-green-500 to-emerald-500',
    description: 'What eGCA checks before it will issue a CPL',
    intro:
      'This is the one stage with a definitive published list. eGCA will not process a Commercial Pilot Licence application until all six of these are true, and it checks them against its own records rather than your word.',
    sections: [
      {
        name: 'The six prerequisites eGCA checks',
        source: `eGCA, ${EGCA.url}`,
        items: EGCA.cplPrerequisites,
      },
      {
        name: 'Where the two portals meet',
        source: 'DGCA Pariksha and eGCA',
        items: [
          EGCA.joinPoint,
          'Have your computer number to hand when you open the licence application — it is a field in the basic details section',
          'Confirm the name on both portals is byte-identical before you submit anything',
        ],
      },
      {
        name: 'After the licence is issued',
        source: 'What is factual, and nothing more',
        items: [
          'A type rating is a separate qualification on a specific aircraft type, done after the licence, and it is not included in a CPL course fee unless a contract says so',
          'The medical continues on its own renewal cycle for the life of the licence',
          'Recurrent requirements and rating validity are set by the regulation, not by a training provider',
          'We are not able to tell you what happens next in employment terms, and any page that gives you a salary figure attached to a graduate is guessing',
        ],
      },
    ],
  },
};

const faqs = [
  {
    q: 'Do I need a medical certificate before registering for the DGCA examinations?',
    a: 'No. The computer number registration on the DGCA Pariksha portal needs no medical certificate and no flying school. It is the one step that can be completed before anything else, which is why it is first on this checklist — waiting for a medical before registering costs students an examination session every year.',
  },
  {
    q: 'How many DGCA papers are there, and what is the pass mark?',
    a: `${DGCA_PAPERS.length}: ${DGCA_PAPERS.join(', ')}. ${EXAM_RULES.theory.statement} ${EXAM_RULES.theory.perSubject}`,
  },
  {
    q: 'How long do my cleared papers stay valid?',
    a: `${EXAM_RULES.paperValidity.general} ${EXAM_RULES.paperValidity.cplAtpl} ${EXAM_RULES.paperValidity.planningNote}`,
  },
  {
    q: 'Which medical do I book first, Class 1 or Class 2?',
    a: `${MED.classOrder.advice} ${MED.classOrder.notMandatory}`,
  },
  {
    q: 'What does the examination cost?',
    a: `${inr(PARIKSHA.fees.regularPerPaper)} per paper in a regular session and ${inr(PARIKSHA.fees.olodePerPaper)} on demand, paid to the government. ${PARIKSHA.fees.serviceCharge} These are DGCA's fees and are separate from anything a school charges.`,
  },
  {
    q: 'Is RTR part of the DGCA papers?',
    a: `No. ${RTR.name} is examined separately from the written papers. ${RTR.note}`,
  },
  {
    q: 'How long does the whole process take?',
    a: 'We do not publish a figure, because no authority does and the honest answer is that it depends on examination sessions, weather, aircraft availability at your flying school and how quickly your logbook is validated. A checklist that gives you month-by-month deadlines has invented them, and missing an invented deadline makes students think they are behind when they are not.',
  },
  {
    q: 'What does eGCA check before issuing a CPL?',
    a: `Six things: ${EGCA.cplPrerequisites.join('; ')}.`,
  },
  {
    q: 'Can I skip anything on these lists?',
    a: 'The regulatory items are not optional — they are conditions in the Aircraft Rules or on the portals, and each one here carries the source it comes from. The document-hygiene items are ours, and they exist because getting a scan or a name spelling wrong is the most common avoidable delay in the whole process.',
  },
];

const itemListSchema = (checklist) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${checklist.title} — pilot training checklist`,
  description: checklist.description,
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: checklist.sections.reduce((n, s) => n + s.items.length, 0),
  itemListElement: checklist.sections.flatMap((section, si) =>
    section.items.map((item, ii) => ({
      '@type': 'ListItem',
      position: si * 100 + ii + 1,
      name: `${section.name}: ${item}`,
    })),
  ),
});

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pilot Training Checklists: Eligibility, Examinations, Medical and Licence',
  description:
    'Three sourced checklists for DGCA pilot training in India — what to confirm before you start, what has to be finished while you train, and the six things eGCA checks before it will issue a Commercial Pilot Licence.',
  inLanguage: 'en-IN',
  dateModified: '2026-09-17',
  articleSection: 'Pilot training',
  keywords:
    'pilot training checklist, dgca checklist, cpl checklist india, dgca computer number checklist, pilot medical checklist, egca cpl requirements',
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  image: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  author: { '@type': 'Organization', name: ACADEMY.name, url: ACADEMY.url },
  publisher: {
    '@type': 'EducationalOrganization',
    name: ACADEMY.name,
    url: ACADEMY.url,
    logo: { '@type': 'ImageObject', url: 'https://weoneaviation.in/Logo.webp' },
  },
  citation: [
    { '@type': 'CreativeWork', name: 'Aircraft Rules, 1937, Schedule II — Aircraft Personnel (India Code)', url: 'https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&type=rule&filename=aircraft_rules%2C_1937.pdf' },
    { '@type': 'CreativeWork', name: 'DGCA Pariksha — candidate registration and examination portal', url: PARIKSHA.portal },
    { '@type': 'CreativeWork', name: 'eGCA — DGCA electronic governance portal for licences', url: EGCA.url },
    { '@type': 'CreativeWork', name: MED.car.citation, url: MED.sources[2].url },
  ],
};

export default function StudentChecklistsHub() {
  const [active, setActive] = useState('before');
  const current = checklists[active];

  return (
    <Layout
      title="Pilot Training Checklists: Eligibility, Exams, Medical and Licence"
      description="Three sourced checklists for DGCA pilot training — what to confirm before you start, what to finish while you train, and the six things eGCA checks before issuing a CPL."
    >
      <StructuredData
        data={[
          articleSchema,
          ...Object.values(checklists).map(itemListSchema),
          generateFAQSchema(faqs),
        ]}
      />

      <div className="relative overflow-hidden flex items-center justify-center py-24 px-4 bg-gradient-to-br from-av-blue via-av-navy to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-av-orange rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-52 h-52 bg-av-blue rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-4">
            Your Pilot Training Checklist
          </h1>
          <p className="text-white/80 text-base md:text-lg">
            Three stages, every item traced to the rule or the portal it comes from. No invented deadlines.
          </p>
        </div>
      </div>

      <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-gray-500 mb-6 text-center">
            Checked against the Aircraft Rules, DGCA Pariksha, eGCA and the DGCA medical CAR on {LAST_UPDATED}.{' '}
            <a href="#sources" className="text-av-blue font-semibold hover:text-av-orange transition-colors">Sources below</a>.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.values(checklists).map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setActive(c.key)}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${
                  active === c.key
                    ? `border-av-orange bg-gradient-to-br ${c.color} text-white shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{c.icon}</div>
                <p className={`font-montserrat font-bold text-lg mb-1 ${active === c.key ? 'text-white' : 'text-av-blue'}`}>
                  {c.title}
                </p>
                <p className={`text-sm ${active === c.key ? 'text-white/80' : 'text-gray-600'}`}>{c.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="mb-10">
              <h2 className="font-montserrat text-3xl font-bold text-av-blue mb-4 flex items-center gap-3">
                <span className="text-4xl">{current.icon}</span>
                {current.title}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">{current.intro}</p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {current.sections.map((section) => (
              <ScrollReveal key={section.name}>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-montserrat font-bold text-lg text-av-blue mb-1 pb-3 border-b-2 border-av-orange">
                    {section.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-4 mt-2">Source: {section.source}</p>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-700">
                        <span className="text-av-orange font-bold text-lg leading-tight flex-shrink-0">▢</span>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 bg-av-light border-l-4 border-av-orange rounded-r-xl p-6">
              <p className="font-montserrat font-bold text-av-blue text-sm mb-2">Why there are no dates on this page</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                No authority publishes a schedule for becoming a pilot, and the honest reason is that the timeline depends
                on examination sessions, weather, aircraft availability at your flying school and how promptly your
                logbook is validated. A checklist that tells you to have cleared your papers by month six has made that
                up, and a student who misses an invented deadline concludes they are failing when they are not. What is
                real is the list above and the validity windows attached to it.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <Link href="/dgca-computer-number" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                <p className="font-bold text-av-blue mb-1">DGCA computer number</p>
                <p className="text-xs text-gray-600">The registration, step by step</p>
              </Link>
              <Link href="/dgca-pariksha" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                <p className="font-bold text-av-blue mb-1">DGCA Pariksha</p>
                <p className="text-xs text-gray-600">Papers, fees and the examination calendar</p>
              </Link>
              <Link href="/dgca-class-2-class-1-medical" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                <p className="font-bold text-av-blue mb-1">Class 1 and Class 2 medical</p>
                <p className="text-xs text-gray-600">Which licence needs which, and where</p>
              </Link>
              <Link href="/egca-login" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                <p className="font-bold text-av-blue mb-1">eGCA login</p>
                <p className="text-xs text-gray-600">The licensing portal and its services</p>
              </Link>
              <Link href="/commercial-pilot-license-eligibility" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                <p className="font-bold text-av-blue mb-1">CPL eligibility</p>
                <p className="text-xs text-gray-600">Age, education, hours and medical</p>
              </Link>
              <Link href="/rtr-a" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-av-orange hover:shadow-md transition-all">
                <p className="font-bold text-av-blue mb-1">RTR (A)</p>
                <p className="text-xs text-gray-600">The radio licence, and why it is separate</p>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-av-blue text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="bg-white rounded-lg p-5 border border-gray-200">
                <summary className="font-semibold text-av-blue text-sm cursor-pointer">{f.q}</summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{f.a}</p>
              </details>
            ))}
          </div>

          <h2 id="sources" className="font-montserrat text-2xl font-bold text-av-blue mt-12 mb-4">Sources</h2>
          <ul className="space-y-2">
            {articleSchema.citation.map((c) => (
              <li key={c.name} className="flex gap-2 items-start text-sm text-gray-600">
                <span className="text-av-orange font-bold flex-shrink-0">&ndash;</span>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-av-blue font-semibold hover:text-av-orange transition-colors">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-av-blue to-av-navy">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl text-white mb-4">
            Not sure which stage you are actually at?
          </h2>
          <p className="text-white/80 mb-8 text-base leading-relaxed">
            The counselling is free and covers the route end to end — which licence you are aiming at, what to do first,
            and how to sequence the examinations against the medical so you are not waiting on one to start the other.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/pilot-career-counselling" className="inline-block bg-av-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all">
              Free career counselling
            </Link>
            <Link href="/dgca-ground-classes" className="inline-block bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold transition-all border border-white">
              DGCA ground classes
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
