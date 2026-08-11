/**
 * Byline.jsx — visible author attribution + last-updated stamp.
 *
 * WHY (GEO audit 2026-08-11): the site had NO datePublished or dateModified
 * anywhere, and no visible "last updated" line on any content page. For
 * regulatory subject matter that changes — DGCA medicals, exam syllabi, fee
 * structures — undated content is treated as stale by default, and AI answer
 * engines strongly prefer material they can date.
 *
 * Structured data alone is not enough: Google expects the dates it reads in
 * schema to also be visible to users. This component renders the human-readable
 * version; <ArticleSchema> emits the machine-readable one from the same values.
 *
 * Pass ISO dates ('2026-08-03'). Never fabricate them — if a page's real
 * revision date is unknown, omit the component rather than guess.
 */

function formatDate(iso) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Byline({ author, datePublished, dateModified, reviewer }) {
  const published = formatDate(datePublished);
  const modified = formatDate(dateModified);
  if (!author && !published && !modified) return null;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-l-4 border-av-orange bg-gray-50 px-4 py-3 text-xs text-gray-600 rounded-r-lg">
        {author && (
          <span>
            By{' '}
            <strong className="text-av-blue font-semibold">{author.name}</strong>
            {author.jobTitle && <span className="text-gray-500">, {author.jobTitle}</span>}
            {author.identifier && (
              <span className="text-gray-400"> ({author.identifier})</span>
            )}
          </span>
        )}

        {reviewer && (
          <span className="text-gray-500">
            · Reviewed by <strong className="text-av-blue font-semibold">{reviewer.name}</strong>
          </span>
        )}

        {modified && (
          <span className="text-gray-500">
            · Last updated{' '}
            {/* <time> gives the date machine-readable semantics in the HTML
                itself, independent of the JSON-LD. */}
            <time dateTime={dateModified}>{modified}</time>
          </span>
        )}

        {published && published !== modified && (
          <span className="text-gray-400">
            · Published <time dateTime={datePublished}>{published}</time>
          </span>
        )}
      </div>
    </div>
  );
}
