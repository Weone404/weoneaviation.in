import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import StructuredData from './StructuredData';
import { generateFAQSchema } from '../lib/schema';

export default function FAQSection({ faqs, title = 'Frequently Asked Questions', includeSchema = true, idPrefix = 'faq' }) {
  const [openIndex, setOpenIndex] = useState(0);
  const validFaqs = (faqs || []).filter((faq) => faq?.question && faq?.answer);

  if (!validFaqs.length) return null;

  return (
    <section className="py-20 px-4 bg-gray-50">
      {includeSchema && <StructuredData data={generateFAQSchema(validFaqs.map(({ question, answer }) => ({ q: question, a: answer })))} />}
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <div className="section-tag">FAQ</div>
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-av-blue">{title}</h2>
        </ScrollReveal>

        <div className="space-y-3">
          {validFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={faq.question} delay={index * 50}>
                <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-montserrat font-bold text-av-blue text-sm hover:bg-orange-50 transition-colors"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`${idPrefix}-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <span className={`text-av-orange text-xl flex-shrink-0 transition-transform ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
                  </button>
                  {/*
                    * Always rendered. Collapsing hides it with CSS.
                    *
                    * This was `{isOpen && ...}`, which put only the first answer of
                    * every FAQ set into the server-rendered HTML. Across the site that
                    * left roughly 300 answers readable only after a click - invisible to
                    * every answer engine that does not execute JavaScript.
                    */}
                  <div
                    id={`${idPrefix}-answer-${index}`}
                    className={`px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4 ${isOpen ? '' : 'hidden'}`}
                  >
                    {faq.answer}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}