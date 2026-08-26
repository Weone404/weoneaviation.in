'use client';

import { useState } from 'react';

export default function ShowMoreList({ items, initialCount = 3, renderItem, label = 'Show more' }) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleItems.map(renderItem)}
      </div>
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="bg-av-blue text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-av-orange transition-all"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : label}
          </button>
        </div>
      )}
    </>
  );
}
