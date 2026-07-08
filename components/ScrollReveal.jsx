import { useEffect, useRef } from 'react';

export function useScrollReveal(ref, delay = 0) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const reveal = () => {
      if (!el.classList.contains('visible')) {
        el.classList.add('visible');
      }
    };

    if (typeof window === 'undefined') {
      reveal();
      return;
    }

    if (typeof window.IntersectionObserver === 'undefined') {
      reveal();
      return;
    }

    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref, delay]);
}

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useScrollReveal(ref, delay);

  return (
    <div ref={ref} className={`reveal visible ${className}`}>
      {children}
    </div>
  );
}