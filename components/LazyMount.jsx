/*
 * Passthrough by design.
 *
 * This previously rendered `null` until an IntersectionObserver fired, which
 * removed the wrapped section from the server-rendered HTML. The components it
 * wraps are already server-rendered by Next.js, so gating them saved a little
 * hydration work and cost the whole section its crawlability.
 *
 * Kept as a component so call sites do not change.
 */
export default function LazyMount({ children, placeholderClassName = '' }) {
  return <div className={placeholderClassName || undefined}>{children}</div>;
}
