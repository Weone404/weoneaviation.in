import React from 'react';
import Link from 'next/link';
import { INTERNAL_LINKS } from '../data/internalLinks';

const SORTED_INTERNAL_LINKS = [...INTERNAL_LINKS].sort((a, b) => b.keyword.length - a.keyword.length);

const wordBoundary = (keyword) => {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|\\s|[!"#$%&'()*+,\-./:;<=>?@[\\]^_\u007f-])${escaped}($|\\s|[!"#$%&'()*+,\-./:;<=>?@[\\]^_\u007f-])`, 'i');
};

function findBestMatch(text, currentPath) {
  let best = null;

  for (const link of SORTED_INTERNAL_LINKS) {
    if (currentPath && link.href === currentPath) continue;

    const matcher = wordBoundary(link.keyword);
    const match = matcher.exec(text);
    if (!match) continue;

    const start = match.index + match[1].length;
    if (!best || start < best.start) {
      best = { link, match, start };
    }
  }

  return best;
}

export function replaceInternalLinks(text, state = { count: 0, maxTotalLinks: Infinity }) {
  if (!text || typeof text !== 'string') return text;
  if (state.count >= state.maxTotalLinks) return text;

  const best = findBestMatch(text, state.currentPath);
  if (!best) return text;

  const { link, match, start } = best;
  const end = start + link.keyword.length;
  const beforeText = text.slice(0, start);
  const matchedText = text.slice(start, end);
  const afterText = text.slice(end);

  const before = replaceInternalLinks(beforeText, state);
  if (state.count >= state.maxTotalLinks) return before;

  state.count += 1;
  const linkElement = (
    <Link href={link.href} className="text-primary underline hover:text-primary-dark">
      {matchedText}
    </Link>
  );

  const after = replaceInternalLinks(afterText, state);

  return (
    <React.Fragment key={`wrap-${state.count}-${start}`}>
      <React.Fragment key={`before-${state.count}-${start}`}>{before}</React.Fragment>
      {React.cloneElement(linkElement, { key: `link-${state.count}-${start}` })}
      <React.Fragment key={`after-${state.count}-${start}`}>{after}</React.Fragment>
    </React.Fragment>
  );
}
