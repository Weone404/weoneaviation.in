/**
 * Credentials & Verification Page
 * Builds E-E-A-T signals by publishing verified information about:
 * - Instructor qualifications with DGCA license numbers
 * - Third-party verifications and partnerships
 * - Statistical evidence and data sources
 * - Accreditations and approvals
 */

import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';
import Head from 'next/head';
import { FOUNDED_YEAR, YEARS_LABEL } from '../data/academy';
import { ACADEMY, papersSummary, MEDICAL } from '../lib/facts';
import QuickAnswer from '../components/QuickAnswer';
import SummaryBox from '../components/SummaryBox';
import Breadcrumb from '../components/Breadcrumb';

const credentials = [
  {
    category: 'DGCA Accreditation',
    icon: '✅',
    items: [
      { title: 'DGCA Approval Status', detail: 'Fully DGCA aviation training institute', verified: true },
      // "Last Audited: Q4 2024 — Full Compliance" removed (GEO audit 2026-08-11):
      // an audit date that never advances reads as abandoned rather than
      // reassuring. Restore it with a real date when there is one to publish.
    ]
  },
  {
    category: 'Training Record',
    icon: '📊',
    items: [
      { title: `${YEARS_LABEL} Years of Operation`, detail: `Founded ${FOUNDED_YEAR} - Continuous operation verified`, verified: true },
    ]
  },
];

/**
 * Only accreditations the academy can substantiate on request are listed here.
 *
 * GEO audit 2026-08-11: three certification and trade-body claims were removed.
 * None carried a certificate or membership number, and an unbacked
 * certification claim is a liability on the one page whose entire premise is
 * verifiability — answer engines increasingly cross-check these against the
 * issuing bodies' own registries. Restore an entry only together with its
 * certificate number, stated inline so a reader can check it.
 */
/*
 * The verification checklist.
 *
 * This page's premise is that we publish only what we can evidence. That is a
 * short list, and a short list on its own reads as a thin page. The fix is not
 * to pad it with claims — it is to turn the standard itself into the content.
 * A student who reads this section leaves able to interrogate ANY academy,
 * including us. That is genuinely useful, it is impossible for a competitor to
 * copy without meeting the same bar, and list content of this shape is exactly
 * what an answer engine lifts wholesale.
 */
const verificationChecklist = [
  {
    ask: 'Is the academy DGCA, and for what exactly?',
    why: 'Approval is not one thing. Ask which approval the institute holds and for which activity. A ground school and a Flying Training Organisation are approved for different things, and an academy that answers this vaguely is telling you something.',
  },
  {
    ask: 'Can I see instructor licence numbers on request?',
    why: 'Not published on a website — requested, and provided. Any institute confident in its panel will show you. Published year-counts and type ratings with no licence number behind them prove nothing at all.',
  },
  {
    ask: 'What exactly does the fee cover, line by line?',
    why: 'Ask for the breakdown in writing: ground classes, examination fees, medical, computer number, flying hours, and what happens if you need to re-sit a paper. A single headline figure hides where the money actually goes.',
  },
  {
    ask: 'Is there a written syllabus per paper?',
    why: 'A real ground school can hand you the syllabus for each of the five DGCA written papers and tell you how many hours each gets. If the answer is a brochure rather than a schedule, keep asking.',
  },
  {
    ask: 'Who provides the flying, and where?',
    why: 'If the institute does not own aircraft — most ground schools do not — ask which flying schools they place students with, in which country, and what the conversion path looks like on return. Vagueness here costs you a year.',
  },
  {
    ask: 'What are you promising about a job, in writing?',
    why: 'Nobody can promise you an airline seat. Hiring rests with the operator. An academy that guarantees you a job is either misunderstanding its own position or hoping you will not read the contract.',
  },
  {
    ask: 'What happens if I fail a paper?',
    why: 'Ask whether re-sit support is included or charged, and how many attempts the fee covers. Papers are cleared individually and re-sits are normal — the honest answer is a policy, not reassurance.',
  },
];

const certifications = [
  { name: 'DGCA', icon: '🏛️', description: 'Directorate General of Civil Aviation Approval' },
];

export default function CredentialsPage() {
  /*
   * Static, and deliberately so. This previously recomputed to the current date
   * on mount, so the page always claimed to have been updated today no matter
   * how long the content had sat unchanged — an unverifiable freshness signal on
   * the one page whose premise is verifiability. Bump it by hand when the
   * credentials above actually change.
   */
  const updatedLabel = 'Last updated: August 19, 2026';

  return (
    <>
      <Head>
        <title>Credentials & Verification – We One Aviation Academy</title>
        <meta name="description" content="Published credentials of We One Aviation Academy: DGCA approval status and years in operation, from its Dwarka, New Delhi address." />
        <meta key="og:title" property="og:title" content="Credentials & Verification – We One Aviation Academy" />
        <meta key="og:description" property="og:description" content="Credentials for We One Aviation Academy: DGCA approval status and years in operation." />
        <meta key="og:url" property="og:url" content="https://weoneaviation.in/credentials" />

        {/* Schema: Organization with credentials */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'We One Aviation Academy',
            url: 'https://weoneaviation.in',
            accreditedBy: {
              '@type': 'Organization',
              name: 'Directorate General of Civil Aviation (DGCA)',
              url: 'https://www.dgca.gov.in',
            },
            /* Same URL string as _document.jsx's sameAs — entity matching is
               literal, so the two must not disagree on the host. */
            sameAs: ['https://www.linkedin.com/company/weoneaviation'],
            description: 'DGCA pilot training institute in Dwarka, New Delhi, publishing its approval status and years in operation.',
          })
        }} />
      </Head>

      <Layout title="Credentials & Verification – We One Aviation Academy" description="Published credentials: DGCA approval status and years in operation.">
        {/* Hero */}
        <div className="bg-gradient-to-br from-av-blue to-av-navy py-20 px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h1 className="font-montserrat text-4xl md:text-5xl font-black mb-4">
              Our Credentials & <span className="text-av-orange">Verifications</span>
            </h1>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
              Here we publish what can actually be checked: our DGCA accreditation and how long we have been operating. Anything we cannot evidence has been removed from this page rather than restated.
            </p>
          </div>
        </div>

        {/* ── What we can evidence, stated before anything else ── */}
        <section className="pt-14 px-4">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb />
            <QuickAnswer
              question="What can We One Aviation actually prove about itself?"
              answer={`Two things, and we will evidence both on request: DGCA approval status, and continuous operation since ${FOUNDED_YEAR} from our Dwarka, New Delhi address. Instructor licence numbers, testimonials and training statistics were removed from this site rather than restated without proof.`}
            />

            <SummaryBox
              title="What we publish, and what we deliberately do not"
              items={[
                `DGCA approval status — evidenced on request`,
                `Continuous operation since ${FOUNDED_YEAR} — ${YEARS_LABEL} years, evidenced on request`,
                `Address: ${ACADEMY.streetAddress}, ${ACADEMY.addressLocality} ${ACADEMY.postalCode}`,
                'NOT published: instructor licence numbers (available on request instead of on a page anyone can copy)',
                'NOT published: pass rates, placement rates or student counts — we could not substantiate them, so they were deleted rather than revised downward',
                'NOT published: testimonials — unverifiable by a reader by definition',
                'NOT claimed: aircraft, simulators, or any promise of an airline job',
              ]}
            />
          </div>
        </section>

        {/* Certifications Bar */}
        <section className="py-16 px-4 bg-av-light">
          <div className="max-w-7xl mx-auto">
            {/* flex-wrap, not a fixed 4-column grid: the list is short and may
                shrink further as unbacked claims are retired, and a fixed grid
                leaves stranded empty columns. */}
            <div className="flex flex-wrap justify-center gap-6">
              {certifications.map((cert) => (
                <ScrollReveal key={cert.name}>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center card-hover w-64 max-w-full">
                    <div className="text-3xl mb-2">{cert.icon}</div>
                    <h2 className="font-montserrat font-bold text-av-blue text-sm mb-1">{cert.name}</h2>
                    <p className="text-gray-500 text-xs">{cert.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            {credentials.map((section, idx) => (
              <ScrollReveal key={section.category} delay={idx * 50}>
                <div className="mb-16 last:mb-0">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="text-3xl">{section.icon}</div>
                    <h2 className="font-montserrat text-3xl font-bold text-av-blue">{section.category}</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {section.items.map((item) => (
                      <div key={item.title} className="bg-av-light rounded-xl p-6 border border-av-orange/20 card-hover">
                        <div className="flex items-start gap-3 mb-2">
                          {item.verified && (
                            <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                          )}
                          <h3 className="font-montserrat font-bold text-av-blue flex-grow">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Verification Statement */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="bg-white rounded-2xl p-8 shadow-lg border border-green-200">
              <h2 className="font-montserrat text-2xl font-bold text-av-blue mb-4">Verification Statement</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                <strong>For verification inquiries:</strong> Contact us at <a href="mailto:info.weoneaviation@gmail.com" className="text-av-orange font-semibold hover:underline">info.weoneaviation@gmail.com</a>
              </p>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">
                  {updatedLabel}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── The verification checklist ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue mb-4">
              What should you demand from any pilot training academy?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              Seven questions. Ask them of us, and ask them of everyone else you are considering. A school that answers all seven straight is worth your time; one that deflects on three of them has told you what you needed to know for free.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              We publish this because the alternative — competing on who claims the most — is a race we would rather lose.
            </p>
            <ol className="space-y-4">
              {verificationChecklist.map((item, i) => (
                <li key={item.ask} className="flex gap-4 p-5 rounded-xl border border-gray-200 bg-gray-50">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-av-orange text-white font-montserrat font-bold text-sm flex items-center justify-center" aria-hidden="true">{i + 1}</span>
                  <span>
                    <span className="block font-montserrat font-bold text-av-blue text-sm mb-2">{item.ask}</span>
                    <span className="block text-gray-600 text-sm leading-relaxed">{item.why}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-av-blue to-av-navy">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-3xl font-bold text-white mb-4">
              Ready to Train with <span className="text-av-orange">We One Aviation Academy?</span>
            </h2>
            <p className="text-white/70 mb-8 text-sm max-w-2xl mx-auto">
              DGCA ground classes in Dwarka, New Delhi. Ask us about batch timings, fees and the DGCA exam route.
            </p>
            <Link href="/contact" className="inline-block bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-av-blue transition-all">
              Start Your Aviation Career →
            </Link>
          </div>
        </section>
      </Layout>
    </>
  );
}
