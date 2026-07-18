import Link from 'next/link';

export default function RelatedArticles({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" aria-label="Related articles">
      <h3 className="text-lg font-semibold text-av-blue mb-4">Related articles</h3>
      <div className="grid gap-3 md:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <Link key={item.href} href={item.href} className="rounded-xl border border-gray-100 bg-gray-50 p-4 hover:border-av-orange">
            <p className="text-sm font-semibold text-av-blue">{item.title}</p>
            <p className="mt-2 text-xs text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
