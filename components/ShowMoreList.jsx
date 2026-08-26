'use client';

import { useState } from 'react';

/*
 * Every item is rendered into the DOM. Collapsing hides the overflow with CSS
 * rather than slicing the array, so a crawler that does not run JavaScript
 * still reads the full list.
 *
 * The previous version sliced to `initialCount`, which removed half the
 * homepage flying schools, DGCA subjects and journey steps from the
 * server-rendered HTML entirely.
 */
export default function ShowMoreList({ items, initialCount = 3, renderItem, label = 'Show more' }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > initialCount;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => {
          const node = renderItem(item, index);
          const hidden = hasMore && !expanded && index >= initialCount;
          return (
            <div key={node && node.key ? node.key : index} className={hidden ? 'hidden' : 'contents'}>
              {node}
            </div>
          );
        })}
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
