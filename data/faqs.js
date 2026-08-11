/**
 * data/faqs.js
 *
 * Single source of truth for FAQ content, so a question is written once and can
 * be rendered on the homepage, the /faqs hub, and any topic page — with the
 * FAQPage structured data always generated from the same text that is visible.
 *
 * Added 2026-08-11 (GEO audit). Two things prompted it:
 *   1. /faqs was referenced in public/llms.txt but no such page existed in this
 *      repo — the link 404'd.
 *   2. FAQPage schema existed on only a handful of pages even though many pages
 *      already carried question-shaped headings. Q&A blocks are the single most
 *      citable content format for AI answer engines, so they should be easy to
 *      add anywhere.
 *
 * RULE: never put a question here whose answer is not also rendered visibly on
 * the page emitting the schema. Structured data that does not match visible
 * content is a Google structured-data violation.
 */

// Grouped so a topic page can pull just the slice it needs, e.g.
//   import { faqGroups } from '../data/faqs';
//   <FaqSchema faqs={faqGroups.medical} />
export const faqGroups = {
  general: [
    {
      id: 'faq-duration',
      q: 'How long does it take to complete pilot training?',
      a: 'It depends on the licence. A Private Pilot Licence (PPL) typically takes 6–12 months. A Commercial Pilot Licence (CPL) typically takes 12–18 months of combined ground school and flying. An ATPL is earned after CPL once you have accumulated the required airline experience.',
    },
    {
      id: 'faq-institute',
      q: 'What is a pilot training institute?',
      a: 'A pilot training institute provides the ground-school coaching needed to clear the DGCA examinations required for a pilot licence — much as a coaching centre prepares students for NEET or JEE. Flying hours are then completed at a DGCA-approved flying school.',
    },
    {
      id: 'faq-scholarship',
      q: 'Can I get a scholarship for pilot training?',
      a: 'We One Aviation Academy offers up to 25% scholarship on selected courses, plus loan assistance. Speak to a counsellor to confirm which scholarships you qualify for and what documentation is required.',
    },
  ],

  eligibility: [
    {
      id: 'faq-eligibility',
      q: 'What are the eligibility criteria for pilot training in India?',
      a: 'You must be at least 17 years old to hold a CPL, have completed 10+2 with Physics and Mathematics, and hold a valid DGCA Class 1 medical certificate issued by an approved examiner. Candidates from other streams can complete Physics and Mathematics through NIOS.',
    },
    {
      id: 'faq-after-12th',
      q: 'Can I become a pilot after Class 12?',
      a: 'Yes. Class 12 with Physics and Mathematics is the standard entry point. The route is: obtain a DGCA computer number, pass the DGCA Class 2 then Class 1 medical, clear the DGCA theory examinations, and complete the required flying hours at an approved flying school.',
    },
  ],

  medical: [
    {
      id: 'faq-glasses',
      q: 'Can I become a pilot if I wear glasses?',
      a: 'Yes, provided your corrected vision meets the DGCA Class 1 medical standard. Spectacles are not automatically disqualifying — the limits are on the degree of correction required and on conditions such as colour vision deficiency. Confirm your specific case against the current DGCA medical requirements.',
    },
  ],

  exams: [
    {
      id: 'faq-ground-classes',
      q: 'What are DGCA ground classes and why do they matter?',
      a: 'DGCA ground classes cover the theory subjects examined for a pilot licence: Air Navigation, Aviation Meteorology, Air Regulations, and Technical General (plus Technical Specific and RTR). Passing these examinations is a prerequisite for licence issue, so ground school is completed alongside or before flying training.',
    },
  ],

  career: [
    {
      id: 'faq-salary',
      q: 'What is the salary of a commercial pilot in India?',
      a: 'Salary varies by airline, aircraft type, and seniority. Entry-level first officers typically earn ₹1.5–3 lakh per month. Senior captains on larger aircraft typically earn ₹5–10 lakh per month or more. These are indicative market ranges, not a guarantee of placement or pay.',
    },
  ],
};

// Flattened list, in the order the /faqs page presents them.
export const allFaqs = [
  ...faqGroups.general,
  ...faqGroups.eligibility,
  ...faqGroups.medical,
  ...faqGroups.exams,
  ...faqGroups.career,
];

export default allFaqs;
