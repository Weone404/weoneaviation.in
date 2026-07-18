import React from 'react';
import Link from 'next/link';
import StructuredData from './StructuredData';
import { generateFAQSchema } from '../lib/schema';

const faqs = [
  { id: 'faq1', q: 'How long does it take to complete pilot training?', a: 'The duration varies depending on the type of pilot training: Private Pilot License (PPL): 6-12 months | Commercial Pilot License (CPL): 12-18 months | ATPL (Airline Transport Pilot License) Training: Additional experience after CPL' },
  { id: 'faq2', q: 'What is the salary of a commercial pilot?', a: 'Commercial pilot salaries vary by airline, experience, and aircraft type. Entry-level first officers can earn ₹1.5–3 lakh/month, while senior captains earn ₹5–10 lakh/month or more.' },
  { id: 'faq3', q: 'Can I get a scholarship for pilot training?', a: 'Yes! We One Aviation Academy offers up to 25% scholarship on select courses. Contact our counsellors to learn about available scholarships and loan assistance options.' },
  { id: 'faq4', q: 'Can I become a pilot if I wear glasses?', a: 'Yes, you can become a pilot if you wear glasses, provided your corrected vision meets DGCA Class 1 medical standards. Contact us for detailed medical eligibility guidance.' },
  { id: 'faq5', q: 'What are DGCA ground classes, and why are they important?', a: 'DGCA ground classes cover aviation subjects like Meteorology, Navigation, Air Regulations, and Technical General, preparing students for DGCA exams required for obtaining a pilot license.' },
  { id: 'faq6', q: 'What Are The Eligibility Criteria for Pilot Training?', a: 'Minimum age: 17 years for CPL | Educational qualification: 10+2 with Physics and Mathematics | Medical fitness: Class 1 Medical Certificate from an approved medical examiner' },
  { id: 'faq7', q: 'What is a Pilot Training Institute?', a: 'A Pilot Training Institute like We One Aviation Academy provides coaching to clear DGCA exams required to become a professional pilot — similar to how coaching centres help students clear NEET or IIT JEE.' },
];

const faqPageSchema = generateFAQSchema(faqs);

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
              <details
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 group cursor-pointer"
                onToggle={(e) => e.currentTarget.setAttribute('aria-expanded', e.currentTarget.open ? 'true' : 'false')}
                aria-expanded="false"
              >
                <summary className="font-montserrat font-bold text-av-blue text-sm list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-av-orange ml-4 flex-shrink-0 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                </summary>
                <p className="text-gray-500 text-sm leading-relaxed mt-4 pt-4 border-t border-gray-100">{faq.a}</p>
              </details>
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
