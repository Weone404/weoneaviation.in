import React from 'react';
import Link from 'next/link';
import StructuredData from './StructuredData';
import CollapsibleFAQ from './CollapsibleFAQ';
import { generateFAQSchema } from '../lib/schema';

const faqs = [
  { id: 'faq1', q: 'How long does it take to complete pilot training?', a: 'The duration varies depending on the type of pilot training: Private Pilot License (PPL): 6-12 months | Commercial Pilot License (CPL): 12-18 months | ATPL (Airline Transport Pilot License) Training: Additional experience after CPL' },
  /*
   * faq2 rewritten 2026-09-15. It quoted monthly ranges for first officers and
   * captains. Indian airlines do not publish pilot pay scales and neither range
   * traced to anything, and this component renders on the home page, so it was
   * the most widely served unsourced figure on the site.
   *
   * faq6 corrected in the same pass: it said the minimum age for a CPL is 17.
   * It is 18 — Aircraft Rules, 1937, Schedule II, Section J. 17 is the PPL age.
   */
  { id: 'faq2', q: 'What is the salary of a commercial pilot?', a: 'Nobody can tell you honestly, and we will not pretend to. Indian airlines do not publish pilot pay scales, so no figure on any website can be checked against a primary source. Pay varies by rank, fleet, seniority, contract type and roster, and a large part of it is linked to hours flown — which DGCA caps at 1,000 hours a year. Our salary page sets out what is published and what is not, and why planning against the cost is the sounder way round.' },
  { id: 'faq3', q: 'Can I get a scholarship for pilot training?', a: 'Yes! We One Aviation Academy offers up to 25% scholarship on select courses. Contact our counsellors to learn about available scholarships and loan assistance options.' },
  { id: 'faq4', q: 'Can I become a pilot if I wear glasses?', a: 'Yes, you can become a pilot if you wear glasses, provided your corrected vision meets DGCA medical standards. Contact us for detailed medical eligibility guidance.' },
  { id: 'faq5', q: 'What are DGCA ground classes, and why are they important?', a: 'DGCA ground classes cover aviation subjects like Meteorology, Navigation, Air Regulations, and Technical General, preparing students for DGCA exams required for obtaining a pilot license.' },
  { id: 'faq6', q: 'What Are The Eligibility Criteria for Pilot Training?', a: 'Minimum age: 16 for a Student Pilot Licence, 17 for a PPL, 18 for a CPL (Aircraft Rules, 1937, Schedule II, Sections B, E and J) | Educational qualification: 10+2 with Physics and Mathematics, with the NIOS route as the bridge if you did not take both | Medical fitness: a DGCA medical at an approved centre — Class 2 to begin, Class 1 for a CPL' },
  { id: 'faq7', q: 'What is a Pilot Training Institute?', a: 'A Pilot Training Institute like We One Aviation Academy provides coaching to clear DGCA exams required to become a professional pilot — similar to how coaching centres help students clear NEET or IIT JEE.' },
];

const faqPageSchema = generateFAQSchema(
  faqs
    .filter((faq) => faq?.q && faq?.a)
    .map((faq) => ({
      ...faq,
      q: faq.q.trim(),
      a: faq.a.trim(),
    }))
);

export default function FAQs() {
  return (
    <>
      <StructuredData data={faqPageSchema} />
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-tag">FAQ</div>
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">
            FAQ About <span className="text-av-orange">Pilot Training Institute</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm">Answers to the most common questions for aspiring pilots and aviation students.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <CollapsibleFAQ key={faq.id} id={faq.id} question={faq.q} answer={faq.a} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-av-blue transition-all text-sm">
            Still have a question? Contact us
          </Link>
        </div>
      </div>
      </section>
    </>
  );
}
