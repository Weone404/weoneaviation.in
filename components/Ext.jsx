/**
 * Outbound link to a primary source (DGCA, Pariksha, eGCA, PIB, IGRUA ...).
 *
 * Added 2026-10-08 with the blog AEO/SEO standard (data/blog-standard.md):
 * every post links 3-5 primary sources inline, and every one of them opens in
 * a new tab with rel="noopener noreferrer". Take the URL from a `sources` entry
 * in lib/facts.js, never type one from memory.
 */
export default function Ext({ href, children, className = 'text-av-orange font-semibold underline' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
