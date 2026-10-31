import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from './Breadcrumb';
import FAQSection from './FAQSection';
import Layout from './Layout';
import QuickAnswer from './QuickAnswer';

const linkClass = 'font-semibold text-av-blue underline decoration-av-orange underline-offset-4 hover:text-av-orange';

export default function SalaryGuidePage({ guide }) {
  const breadcrumbOverride = [
    { href: '/pilot-salary', label: 'Pilot salary worldwide' },
    { href: `/${guide.slug}`, label: guide.h1 },
  ];

  return (
    <Layout
      title={guide.title}
      description={guide.description}
      canonical={`/${guide.slug}`}
      includeDefaultFAQs={false}
      breadcrumbOverride={breadcrumbOverride}
      schemaFaqItems={guide.faqs}
    >
      <header className="bg-gradient-to-br from-av-blue via-av-navy to-av-blue px-4 py-10 text-white md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-av-orange">{guide.eyebrow}</p>
            <h1 className="font-montserrat text-4xl font-black leading-tight md:text-6xl">{guide.h1}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg">{guide.intro}</p>
            <p className="mt-4 text-sm text-white/60">Evidence checked 31 October 2026. Figures are not guaranteed earnings.</p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
            <Image
              src="/assets/Flighs/airplan.webp"
              alt={guide.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          <Breadcrumb override={breadcrumbOverride} />
          <QuickAnswer question={`What is the ${guide.primaryKeyword}?`} answer={guide.answer} />

          <section aria-labelledby="salary-evidence-title" className="py-8">
            <p className="section-tag">What the evidence supports</p>
            <h2 id="salary-evidence-title" className="font-montserrat text-2xl font-bold text-av-blue md:text-3xl">
              {guide.country}: salary evidence and limitations
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {guide.evidence.map((item) => (
                <article key={item.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h3 className="font-montserrat text-sm font-bold text-gray-600">{item.label}</h3>
                  <p className="mt-2 text-2xl font-black leading-snug text-av-blue">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          {guide.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="border-t border-gray-100 py-8">
              <h2 id={`${section.id}-title`} className="font-montserrat text-2xl font-bold text-av-blue md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-4 max-w-4xl leading-7 text-gray-700">{section.answer}</p>
              <dl className="mt-5 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-5">
                {section.points.map(([title, detail]) => (
                  <div key={title} className="grid gap-1 py-4 md:grid-cols-[210px_1fr] md:gap-6">
                    <dt className="font-montserrat font-bold text-av-blue">{title}</dt>
                    <dd className="text-sm leading-6 text-gray-600">{detail}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <section aria-labelledby="related-guidance-title" className="border-t border-gray-100 py-10">
            <p className="section-tag">Continue your research</p>
            <h2 id="related-guidance-title" className="font-montserrat text-2xl font-bold text-av-blue md:text-3xl">
              Related pilot salary and training guidance
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {guide.related.map((item) => (
                <li key={item.href} className="rounded-xl border border-gray-200 bg-white p-4">
                  <Link href={item.href} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="counselling-cta-title" className="rounded-3xl bg-av-blue px-6 py-8 text-white md:px-10 md:py-10">
            <div className="max-w-3xl">
              <p className="section-tag">Plan your next step</p>
              <h2 id="counselling-cta-title" className="font-montserrat text-2xl font-bold text-white md:text-3xl">
                Considering pilot training in India?
              </h2>
              <p className="mt-3 leading-7 text-white/80">
                WeOne Aviation can discuss DGCA training routes and career planning. Counselling does not guarantee a job, salary or airline selection.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/pilot-career-counselling" className="rounded-full bg-av-orange px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600">
                  Talk to a career counsellor
                </Link>
                <Link href="/courses/cpl" className="rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-av-blue">
                  Review the CPL training route
                </Link>
              </div>
            </div>
          </section>

          <section aria-labelledby="sources-title" className="py-10">
            <p className="section-tag">Sources and editorial note</p>
            <h2 id="sources-title" className="font-montserrat text-2xl font-bold text-av-blue md:text-3xl">
              Sources used for this {guide.country} salary guide
            </h2>
            <ul className="mt-5 space-y-4">
              {guide.sources.map((source) => (
                <li key={source.href} className="rounded-xl border border-gray-200 bg-white p-4">
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {source.label}
                  </a>
                  <p className="mt-1 text-xs font-semibold text-gray-500">{source.date}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{source.use}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-gray-600">
              Salary measures are not interchangeable. This page does not promise a job, earnings level or return on training costs.
            </p>
          </section>

          <FAQSection faqs={guide.faqs} title={`${guide.country} Pilot Salary: Frequently Asked Questions`} includeSchema={false} />
        </div>
      </section>
    </Layout>
  );
}
