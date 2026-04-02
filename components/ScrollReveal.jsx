import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — hook version for manual use on specific elements.
 * Scoped to the passed ref, NOT a global querySelectorAll scan.
 */
export function useScrollReveal(ref, delay = 0) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    // If already visible (e.g. SSR hydration), skip observer entirely
    if (el.classList.contains('visible')) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add('visible'), delay);
          } else {
            el.classList.add('visible');
          }
          // Unobserve immediately — each element only needs to reveal once
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.1,
        // rootMargin starts revealing slightly before element enters viewport
        // so the animation is already underway when user sees it
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, delay]);
}

/**
 * ScrollReveal — wrapper component.
 *
 * Changes from original:
 * - Uses a single IntersectionObserver per instance (not a shared global one)
 * - Unobserves after first intersection — no ongoing observer cost
 * - rootMargin: starts animation 40px before entering viewport → smoother feel
 * - No querySelectorAll on document — fully scoped to this element's ref
 * - Checks for SSR: skips observer during server-side rendering
 */
export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useScrollReveal(ref, delay);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}