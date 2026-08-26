/**
 * BlogImagePlaceholder
 *
 * A dashed-border block occupying the EXACT aspect ratio of the image that will
 * replace it, so swapping in the real file causes zero layout shift.
 *
 * Props are deliberately identical to what a next/image swap will need
 * (src, width, height, alt) — replacing this component with <Image> is then a
 * one-line change per call site with no prop rewriting.
 *
 * `promptId` points at the matching entry in data/blog-image-prompts.md.
 */
export default function BlogImagePlaceholder({ src, width, height, alt, promptId, caption }) {
  return (
    <figure className="my-10">
      <div
        className="w-full rounded-2xl border-2 border-dashed border-av-sky/40 bg-av-light/30 flex items-center justify-center"
        style={{ aspectRatio: `${width} / ${height}` }}
        role="img"
        aria-label={alt}
      >
        <div className="text-center px-6 py-8 max-w-md">
          <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-av-orange mb-3">
            Image placeholder
          </p>
          <p className="font-mono text-xs text-av-blue break-all mb-2">{src}</p>
          <p className="font-mono text-xs text-gray-500 mb-3">
            {width} &times; {height} px
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">{alt}</p>
          <p className="font-mono text-[11px] text-gray-400">
            Prompt {promptId} &rarr; data/blog-image-prompts.md
          </p>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-gray-500 leading-relaxed">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
