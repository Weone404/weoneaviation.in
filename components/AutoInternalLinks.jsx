import React, { useMemo } from 'react';
import Link from 'next/link';
import { replaceInternalLinks } from '../utils/replaceInternalLinks';

const IGNORED_TAGS = new Set([
  'a',
  'button',
  'iframe',
  'svg',
  'style',
  'script',
  'code',
  'pre',
  'textarea',
  'input',
  'select',
  'option',
]);

function processNode(node, state) {
  if (state.count >= state.maxTotalLinks) return node;

  if (typeof node === 'string') {
    return replaceInternalLinks(node, state);
  }

  if (React.isValidElement(node)) {
    const { type, props } = node;
    if ((typeof type === 'string' && IGNORED_TAGS.has(type)) || type === Link) {
      return node;
    }

    const processedChildren = React.Children.toArray(props.children).flatMap((child) => {
      const processed = processNode(child, state);
      return Array.isArray(processed) ? processed : [processed];
    });

    return React.cloneElement(node, { ...props, children: processedChildren });
  }

  if (Array.isArray(node)) {
    return node.flatMap((child) => {
      const processed = processNode(child, state);
      return Array.isArray(processed) ? processed : [processed];
    });
  }

  return node;
}

export default function AutoInternalLinks({ children, maxTotalLinks = 8, currentPath }) {
  const content = useMemo(() => {
    const state = { count: 0, maxTotalLinks, currentPath };
    return React.Children.toArray(children).flatMap((child) => {
      const processed = processNode(child, state);
      return Array.isArray(processed) ? processed : [processed];
    });
  }, [children, maxTotalLinks, currentPath]);

  return <>{content}</>;
}
