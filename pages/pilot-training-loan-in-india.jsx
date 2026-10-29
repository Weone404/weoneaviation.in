import Link from 'next/link';
import Layout from '../components/Layout';
import Ext from '../components/Ext';
import StructuredData from '../components/StructuredData';

const CANONICAL = 'https://weoneaviation.in/pilot-training-loan-in-india';
const DATE_PUBLISHED = '2026-10-29';
const DESCRIPTION =
  'Compare pilot-training loans before committing: check course eligibility, collateral, co-applicant liability, disbursement, moratorium and repayment in writing.';

const sources = [
  {
    name: 'SBI Student Loan Scheme',
    url: 'https://sbi.bank.in/web/student-platform/sbi-student-loan-scheme',
  },
  {
    name: 'IBA education loan scheme information',
    url: 'https://www.iba.org.in/retail-banking/educational-loan-scheme.html',
  },
  {
    name: 'NCGTC Credit Guarantee Fund Scheme for Education Loans',
    url: 'https://www.ncgtc.in/en/product-details/CGFEL/Credit-Guarantee-Fund-Scheme-for-Education-Loans-(CGFEL)',
  },
];

const faqs = [
  {
    q: 'Can I get an education loan for CPL training in India?',
    a: 'Possibly. The lender decides whether the particular course and training provider qualify under its current scheme and assesses the application. SBI, for example, lists regular pilot-training courses approved by DGCA among the courses its scheme covers; that does not guarantee approval for every school, course package or applicant.',
  },
  {
    q: 'Will an education loan cover all flying-school expenses?',
    a: 'Do not assume it will. Ask the lender to confirm in writing which course fees and related expenses it will finance, how it will disburse funds, and what costs remain payable by your family.',
  },
  {
    q: 'Can I get a pilot-training loan without collateral?',
    a: 'That depends on the lender, the scheme, the course and the amount requested. Ask the lender to explain its current security requirements and whether any applicable credit-guarantee scheme covers your specific application.',
  },
  {
    q: 'When do repayments start?',
    a: 'The moratorium and repayment start date depend on the lender and the sanction terms. SBI currently describes a repayment holiday tied to the course period; use your own sanction letter, not a general online summary, to plan the first payment.',
  },
  {
    q: 'Should I take a loan based on an expected pilot salary?',
    a: 'Do not base repayment on a salary estimate or a promised job. Indian airlines do not publish pay scales, and a CPL is a licence rather than an employment offer. Build a plan that remains workable if hiring takes longer than expected.',
  },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Pilot Training Loans in India: What to Check Before Applying',
  description: DESCRIPTION,
  inLanguage: 'en-IN',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_PUBLISHED,
  mainEntityOfPage: { '@type': 'WebPage', '@id': CANONICAL },
  author: { '@id': 'https://weoneaviation.in/#organization' },
  publisher: { '@id': 'https://weoneaviation.in/#organization' },
  citation: sources.map((source) => ({
    '@type': 'CreativeWork',
    name: source.name,
    url: source.url,
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const H2 = 'font-montserrat text-2xl font-bold text-av-blue mb-3 underline-orange';
const P = 'text-gray-600 text-sm leading-relaxed mb-4';
const A = 'text-av-blue font-semibold hover:text-av-orange transition-colors';

export default function PilotTrainingLoanIndia() {
  return (
    <Layout
      title="Pilot Training Loans in India: What to Check"
      description={DESCRIPTION}
      canonical={CANONICAL}
      includeDefaultFAQs={false}
    >
      <StructuredData data={[articleSchema, faqSchema]} />

      <section className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-av-orange font-bold uppercase tracking-widest text-sm mb-3">Pilot training finance</p>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white mb-5 leading-tight">
            Pilot Training Loans in India: What to Check Before Applying
          </h1>
          <p className="text-white/80 max-w-3xl text-base leading-relaxed">
            A lender may finance a pilot-training course, but eligibility and loan terms depend on the
            lender, the specific course and your application. Compare written offers—not online rate
            tables—and do not treat a licence or a salary estimate as a job guarantee.
          </p>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-4 py-12">
        <section aria-labelledby="eligibility">
          <h2 id="eligibility" className={H2}>Can an education loan fund pilot training in India?</h2>
          <p className={P}>
            It can, subject to the lender&rsquo;s current scheme and its approval of the course and
            applicant. The <Ext href={sources[0].url}>SBI Student Loan Scheme</Ext> lists regular
            pilot-training courses approved by DGCA among courses covered in India. That is an SBI
            scheme condition, not a promise that every flight school, course bundle or loan application
            will qualify. Confirm the exact course and provider with the lender before paying a deposit.
          </p>
          <p className={P}>
            Start by checking the training route and eligibility for a{' '}
            <Link href="/commercial-pilot-license" className={A}>Commercial Pilot Licence</Link>.
            We One Aviation teaches DGCA ground subjects; flight training takes place separately at a
            flying training organisation. Ask the lender which entity and fee schedule it will assess.
          </p>
        </section>

        <section aria-labelledby="compare">
          <h2 id="compare" className={H2}>What should I compare in two loan offers?</h2>
          <p className={P}>
            Compare the full written terms, not only the advertised interest rate. Use the same course
            costs and requested amount when asking each lender, then have the lender explain each item
            in its sanction letter.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-gray-200 rounded-xl overflow-hidden text-sm">
              <caption className="sr-only">Questions to ask a lender before accepting a pilot-training loan</caption>
              <thead>
                <tr className="bg-av-blue text-white">
                  <th scope="col" className="text-left p-3 font-montserrat font-bold">Term</th>
                  <th scope="col" className="text-left p-3 font-montserrat font-bold">Ask the lender</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Course eligibility', 'Does this exact school, course and training stage qualify under the current scheme?'],
                  ['Covered costs', 'Which fees and expenses are eligible, and which must we pay ourselves?'],
                  ['Interest and charges', 'Is the rate fixed or floating? What fees, insurance or other charges apply?'],
                  ['Security and co-applicant', 'What collateral, guarantor or co-applicant obligations apply to this application?'],
                  ['Disbursement', 'When is each payment released, and what documents or milestones are required?'],
                  ['Moratorium and repayment', 'When does repayment begin, how is interest treated during the course, and what is the repayment schedule?'],
                  ['Prepayment and default', 'What are the rules and charges for early repayment, missed instalments or a change in course?'],
                ].map(([term, question], index) => (
                  <tr key={term} className={index % 2 === 0 ? 'bg-white' : 'bg-av-light'}>
                    <th scope="row" className="p-3 text-gray-700 font-semibold text-left align-top">{term}</th>
                    <td className="p-3 text-gray-600 align-top">{question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={P}>
            Interest rates and approval terms change. The SBI scheme page lists its course and repayment
            conditions, but the applicable rate and final obligations must come from the lender for your
            application. Do not copy a comparison table that does not show its source and date.
          </p>
        </section>

        <section aria-labelledby="government-schemes">
          <h2 id="government-schemes" className={H2}>Do government credit-guarantee or subsidy schemes apply?</h2>
          <p className={P}>
            Do not assume that a general education-loan guarantee or interest-subsidy scheme covers your
            pilot-training course. Scheme eligibility can depend on the course, institution, lender and
            applicant. Ask the bank to identify the specific scheme, confirm your eligibility and show
            how it affects your sanction terms.
          </p>
          <p className={P}>
            The <Ext href={sources[1].url}>Indian Banks&rsquo; Association education-loan information</Ext>{' '}
            and the <Ext href={sources[2].url}>National Credit Guarantee Trustee Company scheme page</Ext>{' '}
            are useful starting points. Check the latest scheme rules with the lender before relying on
            any collateral-free or subsidised-loan claim.
          </p>
        </section>

        <section aria-labelledby="repayment">
          <h2 id="repayment" className={H2}>How can a family plan repayment responsibly?</h2>
          <p className={P}>
            Build the repayment plan around the amount the lender approves, the full course quote and the
            instalment schedule—not an expected airline salary. The salary figures circulating online
            are not published airline pay scales, and a CPL does not guarantee employment.
          </p>
          <ul className="list-disc pl-6 text-gray-600 text-sm leading-relaxed space-y-2 mb-5">
            <li>Ask the flying school for a written fee schedule and how additional flying hours are billed.</li>
            <li>Keep a contingency for costs the lender excludes and for delays in training or hiring.</li>
            <li>Have the lender show the instalment amount after the moratorium, including any interest added during it.</li>
            <li>Compare the quote with the site's <Link href="/cost-transparency" className={A}>published pilot-training costs and fees</Link>.</li>
            <li>Read the co-applicant and collateral obligations before signing or pledging property.</li>
          </ul>
          <p className={P}>
            For the career-side uncertainty, read our{' '}
            <Link href="/commercial-pilot-license-salary" className={A}>guide to what is—and is not—published about pilot pay</Link>.
            For the training sequence, see the{' '}
            <Link href="/blogs/pilot-training-cost-in-india" className={A}>pilot-training cost breakdown</Link>.
          </p>
        </section>

        <section aria-labelledby="faqs">
          <h2 id="faqs" className={H2}>Frequently asked questions</h2>
          <div className="space-y-3 mb-10">
            {faqs.map((faq) => (
              <details key={faq.q} className="border border-gray-200 rounded-xl p-4">
                <summary className="font-semibold text-av-blue text-sm cursor-pointer">{faq.q}</summary>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="sources">
          <h2 id="sources" className={H2}>Primary sources</h2>
          <p className={P}>
            Checked on 29 October 2026. Terms can change; confirm the current version with the relevant lender or scheme administrator.
          </p>
          <ul className="space-y-2 text-sm mb-8">
            {sources.map((source) => (
              <li key={source.url}>
                <Ext href={source.url}>{source.name}</Ext>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </Layout>
  );
}
