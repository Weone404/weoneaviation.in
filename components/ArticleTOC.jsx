import { useEffect, useMemo, useState } from 'react';

export default function ArticleTOC({ headings = [] }) {
  const [activeId, setActiveId] = useState('');

  const items = useMemo(() => headings.filter(Boolean), [headings]);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -60% 0%', threshold: 0.1 }
    );

    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm mb-8" aria-label="On this page">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-av-orange mb-3">Jump to</p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-lg px-3 py-2 transition ${activeId === item.id ? 'bg-av-blue text-white' : 'text-av-blue hover:bg-av-light'}`}
              style={{ scrollBehavior: 'smooth' }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
