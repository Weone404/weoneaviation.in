import { useSyncExternalStore } from 'react';
import { isAdVisit } from '../lib/adAttribution';

/*
 * Optional, unticked consent shown ONLY to visitors who arrived from a Google/Meta ad.
 * Only enquiries with this box ticked may ever have their outcome shared with Google/Meta
 * (see lib/adAttribution.js). Hydrates as hidden so server and client HTML match.
 */
const noSubscribe = () => () => {};
export function useAdVisit() {
  // Server render (and hydration) see false; the browser then reads the stored ad visit.
  return useSyncExternalStore(noSubscribe, isAdVisit, () => false);
}

export default function AdConsent({ checked, onChange, dark = false, style }) {
  const ad = useAdVisit();
  if (!ad) return null;
  return (
    <label
      style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11px', lineHeight: 1.4,
        color: dark ? 'rgba(255,255,255,0.6)' : '#6b7280', cursor: 'pointer', textAlign: 'left', ...style }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ marginTop: '2px' }} />
      <span>
        Optional: let We One Aviation tell Google/Meta whether this enquiry led to an admission, to measure our ads.{' '}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>Privacy policy</a>
      </span>
    </label>
  );
}
