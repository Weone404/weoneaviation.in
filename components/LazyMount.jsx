'use client';

import { useEffect, useRef, useState } from 'react';

export default function LazyMount({ children, placeholderClassName = 'min-h-40' }) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return undefined;

    if (typeof window.IntersectionObserver === 'undefined') {
      const fallback = window.setTimeout(() => setMounted(true), 0);
      return () => window.clearTimeout(fallback);
    }

    const observer = new window.IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setMounted(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={mounted ? '' : placeholderClassName}>{mounted ? children : null}</div>;
}
