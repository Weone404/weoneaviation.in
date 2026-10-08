/**
 * The primary documents a post was checked against, listed after the article.
 *
 * Added 2026-10-08 with data/blog-standard.md. A reader, a search engine and an
 * answer engine can all see what each figure rests on. Pass entries straight
 * from the `sources` arrays in lib/facts.js — { label, url } — so a document is
 * named the same way on every page that cites it.
 */
export default function BlogSources({ sources = [], checkedOn }) {
  const seen = new Set();
  const items = sources.filter((s) => s && s.url && !seen.has(s.url) && seen.add(s.url));
  if (!items.length) return null;

  return (
    <section className="mt-12" aria-labelledby="primary-sources">
      <h2 id="primary-sources" className="font-montserrat text-2xl font-bold text-av-blue mb-2">
        Primary sources
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        The documents this guide was checked against{checkedOn ? `, last read ${checkedOn}` : ''}. They are
        published by the regulator or the government body named, and can change, so the document wins if it
        disagrees with this page.
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600">
        {items.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-av-blue underline hover:text-av-orange">
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
