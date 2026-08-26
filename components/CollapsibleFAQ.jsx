'use client';

import { useState } from 'react';

export default function CollapsibleFAQ({ question, answer, id }) {
  const [open, setOpen] = useState(false);
  const answerId = `${id}-answer`;

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 p-5 text-left font-montserrat font-bold text-av-blue text-sm hover:bg-orange-50 transition-colors"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span>{question}</span>
        <span className={`text-av-orange text-xl flex-shrink-0 transition-transform ${open ? 'rotate-45' : ''}`} aria-hidden="true">+</span>
      </button>
      {open && (
        <div id={answerId} className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}
