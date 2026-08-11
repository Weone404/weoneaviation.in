/**
 * /faqs — Frequently Asked Questions hub.
 *
 * Recreated 2026-08-11 (GEO audit). public/llms.txt advertised this URL to AI
 * crawlers but no page existed in this repo, so the link 404'd. The page is
 * also the highest-value citability surface on the site: a clean list of
 * question → self-contained answer is exactly the shape AI answer engines
 * extract and quote.
 *
 * Content comes from data/faqs.js so the visible answers and the FAQPage
 * structured data can never drift apart.
 */

import Layout from '../components/Layout';
import FaqSchema from '../components/FaqSchema';
import OfficialSources, { DGCA } from '../components/OfficialSources';
import Link from 'next/link';
import { faqGroups, allFaqs } from '../data/faqs';

const SECTIONS = [
  { key: 'general', heading: 'General' },
  { key: 'eligibility', heading: 'Eligibility' },
  { key: 'medical', heading: 'Medical requirements' },
  { key: 'exams', heading: 'DGCA examinations' },
  { key: 'career', heading: 'Career and salary' },
];

export default function Faqs() {
  return (
    <Layout
      title="Pilot Training FAQs: DGCA Exams, Eligibility & Medicals | WeOne Aviation"
      description="Answers to common questions about becoming a pilot in India — CPL eligibility, DGCA exams and medicals, training duration, costs and commercial pilot salaries."
    >
      {/* Structured data generated from the same objects rendered below. */}
      <FaqSchema faqs={allFaqs} />

      <div className="bg-av-blue py-10 text-center px-4">
        <h1 className="font-montserrat text-white font-bold text-3xl md:text-4xl">
          Pilot Training FAQs
        </h1>
        <p className="text-white/70 text-sm mt-3 max-w-2xl mx-auto">
          Straight answers to the questions we are asked most about DGCA
          licensing, eligibility, medicals and pilot careers in India.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14">
        {SECTIONS.map((section) => (
          <section key={section.key} className="mb-12">
            <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-6 underline-orange">
              {section.heading}
            </h2>

            <dl className="space-y-6">
              {faqGroups[section.key].map((f) => (
                <div
                  key={f.id}
                  id={f.id}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  {/* <dt>/<dd> rather than a JS-only accordion: the answer is in
                      the HTML on first paint, so crawlers that do not execute
                      JavaScript still read it. */}
                  <dt className="font-montserrat font-bold text-av-blue mb-2">
                    {f.q}
                  </dt>
                  <dd className="text-gray-600 text-sm leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <OfficialSources
          sources={[DGCA.car, DGCA.medical, DGCA.exams]}
          note="Eligibility, medical and examination rules are set by the DGCA and change from time to time. Confirm current requirements against the regulator before making decisions."
        />

        <div className="mt-10 rounded-xl bg-av-light p-6 text-center">
          <h2 className="font-montserrat text-xl font-bold text-av-blue mb-2">
            Still have a question?
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Speak to a counsellor about your eligibility, medicals or training route.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm shadow-lg"
          >
            Get Free Counselling →
          </Link>
        </div>
      </div>
    </Layout>
  );
}
