import Link from 'next/link';
import Layout from './Layout';
import Breadcrumb from './Breadcrumb';
import QuickAnswer from './QuickAnswer';
import SummaryBox from './SummaryBox';
import ArticleTOC from './ArticleTOC';
import BlogAuthorBox from './BlogAuthorBox';
import StructuredData from './StructuredData';

/**
 * Shared shell for hand-written blog posts.
 *
 * The FAQ block is NOT rendered here. Layout injects it from data/pageFaqs.js
 * and emits the FAQPage schema alongside it, so a post registers its questions
 * there and the rendered markup and the schema can never drift apart.
 *
 * BreadcrumbList schema also comes from Layout. This component renders only the
 * visible breadcrumb trail.
 */
export default function BlogPostLayout({
  title,
  description,
  schema,
  heading,
  datePublished,
  dateModified,
  readingTime,
  category,
  quickAnswer,
  summaryTitle = 'Key facts at a glance',
  summaryItems = [],
  tocHeadings = [],
  related = [],
  children,
}) {
  const fmt = (iso) =>
    new Date(iso + 'T00:00:00Z').toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
    });

  return (
    <Layout title={title} description={description}>
      {schema ? <StructuredData data={schema} /> : null}

      <article className="px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-12">
          <div className="min-w-0">
            <Breadcrumb />

            <header className="mb-8">
              {category ? (
                <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-av-orange mb-3">
                  {category}
                </p>
              ) : null}
              <h1 className="font-montserrat text-3xl md:text-4xl font-black text-av-blue leading-tight text-balance">
                {heading}
              </h1>
              <p className="mt-4 text-sm text-gray-500">
                By <span className="font-semibold text-av-blue">We One Aviation Academy</span>
                {' '}&middot;{' '}
                <time dateTime={datePublished}>{fmt(datePublished)}</time>
                {dateModified && dateModified !== datePublished ? (
                  <>
                    {' '}&middot; updated <time dateTime={dateModified}>{fmt(dateModified)}</time>
                  </>
                ) : null}
                {readingTime ? <> &middot; {readingTime} read</> : null}
              </p>
            </header>

            {quickAnswer ? (
              <QuickAnswer question={quickAnswer.question} answer={quickAnswer.answer} />
            ) : null}

            {summaryItems.length ? (
              <SummaryBox title={summaryTitle} items={summaryItems} />
            ) : null}

            {/* TOC sits inline on mobile, in the rail on desktop */}
            <div className="lg:hidden">
              <ArticleTOC headings={tocHeadings} />
            </div>

            <div className="max-w-prose text-lg leading-relaxed text-gray-700 space-y-6">
              {children}
            </div>

            {related.length ? (
              <section className="mt-16" aria-labelledby="related-guides">
                <h2 id="related-guides" className="font-montserrat text-2xl font-bold text-av-blue mb-4">
                  Related guides
                </h2>
                <ul className="space-y-3">
                  {related.map((item) => (
                    <li key={item.href} className="text-base leading-relaxed text-gray-700">
                      {item.lead}{' '}
                      <Link href={item.href} className="text-av-orange font-semibold underline">
                        {item.anchor}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <BlogAuthorBox />
          </div>

          <aside className="hidden lg:block" aria-label="On this page">
            <div className="sticky top-24">
              <ArticleTOC headings={tocHeadings} />
            </div>
          </aside>
        </div>
      </article>
    </Layout>
  );
}
