/*
 * Ad attribution for the CRM's ADS section.
 *
 * WHY: enquiries that come from a Google or Meta ad must reach the CRM's ADS > Ads Leads list (kept
 * separate from organic Leads) together with the ad click ID, so the CRM can later tell Google/Meta
 * which ads produced real admissions. Organic enquiries are untouched: they keep going to
 * /api/save-lead exactly as before.
 *
 * What is stored, and where: only in this browser's localStorage (key below), for 90 days, and only
 * when the visitor arrived with an ad click ID (gclid / gbraid / wbraid / fbclid) or UTM tags.
 * Nothing is sent anywhere until the visitor submits a form.
 */

const KEY = 'wo_ad_attr_v1';
const TTL_MS = 90 * 24 * 60 * 60 * 1000;
const ENDPOINT = 'https://syytqcadmtgowckdnbqh.supabase.co/functions/v1/ads-intake/enquiry';
export const CONSENT_NOTICE_VERSION = 'weoneaviation.in-ads-consent-2026-11';

const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid'];
const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const PAID_MEDIUMS = new Set(['cpc', 'ppc', 'paid', 'paidsearch', 'paid_search', 'paid_social', 'paidsocial', 'cpm', 'display']);

function load() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (!v || typeof v !== 'object' || !v.expires || v.expires < Date.now()) return null;
    return v;
  } catch {
    return null;
  }
}

function save(v) {
  try { window.localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* private mode / storage blocked */ }
}

const isAdTouch = (t) =>
  !!t && (CLICK_IDS.some((k) => t[k]) || !!t.fbc || PAID_MEDIUMS.has(String(t.utm_medium || '').toLowerCase()));

/* Call on every page view. A visit without click IDs or UTMs (direct / internal) changes nothing. */
export function captureAttribution() {
  if (typeof window === 'undefined') return;
  let params;
  try { params = new URL(window.location.href).searchParams; } catch { return; }
  const touch = {};
  for (const k of [...CLICK_IDS, ...UTMS]) {
    const v = params.get(k);
    if (v) touch[k] = v.slice(0, 300);
  }
  if (!Object.keys(touch).length) return;
  // Meta's documented click-ID cookie format: fb.1.<creation time in ms>.<fbclid>
  if (touch.fbclid) touch.fbc = `fb.1.${Date.now()}.${touch.fbclid}`;
  touch.landing_page = window.location.href.slice(0, 1000);
  if (document.referrer) touch.referrer = document.referrer.slice(0, 1000);
  touch.at = new Date().toISOString();

  const stored = load();
  save({
    first_touch: stored?.first_touch || touch,
    last_touch: touch,
    last_ad_touch: isAdTouch(touch) ? touch : stored?.last_ad_touch || null,
    expires: Date.now() + TTL_MS,
  });
}

/* True when this browser has an ad click on record (within 90 days). */
export function isAdVisit() {
  if (typeof window === 'undefined') return false;
  const s = load();
  return !!(s && isAdTouch(s.last_ad_touch));
}

function readCookie(name) {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : undefined;
  } catch {
    return undefined;
  }
}

export function newSubmissionId() {
  try { return crypto.randomUUID(); } catch { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }
}

/*
 * Sends a form to the right place.
 *  - Ad visit  -> CRM ADS (ads-intake). Only if ADS cannot be reached at all (network / server error) does
 *                 it fall back to /api/save-lead, tagged "ads-fallback", so an enquiry is never lost.
 *  - Otherwise -> /api/save-lead, unchanged.
 * Returns { ok, channel }.
 */
export async function routeEnquiry({ fields, source, adDataSharing, submissionId, startedAt }) {
  const saveOrganic = async (src) => {
    const res = await fetch('/api/save-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...fields, source: src }),
    });
    return { ok: res.ok, channel: 'organic' };
  };

  if (!isAdVisit()) return saveOrganic(source);

  const s = load();
  const t = s.last_ad_touch || {};
  const body = {
    name: fields.name,
    phone: fields.phone,
    email: fields.email || undefined,
    course_interest: fields.course || undefined,
    message: fields.message || undefined,
    form: source,
    submission_id: submissionId,
    elapsed_ms: startedAt ? Date.now() - startedAt : undefined,
    gclid: t.gclid, gbraid: t.gbraid, wbraid: t.wbraid, fbclid: t.fbclid, fbc: t.fbc || readCookie('_fbc'),
    fbp: readCookie('_fbp'),
    utm_source: t.utm_source, utm_medium: t.utm_medium, utm_campaign: t.utm_campaign,
    utm_term: t.utm_term, utm_content: t.utm_content,
    landing_page: t.landing_page, referrer: t.referrer, touch_at: t.at,
    page_url: window.location.href.slice(0, 1000),
    site: window.location.hostname.replace(/^www\./, ''),
    first_touch: s.first_touch,
    consent: { notice_version: CONSENT_NOTICE_VERSION, ad_data_sharing: !!adDataSharing },
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true, channel: 'ads' };
    if (res.status === 409) return saveOrganic(source);          // not an ad enquiry after all
    if (res.status === 422) return { ok: false, channel: 'ads' }; // invalid input (e.g. phone)
    return saveOrganic(`ads-fallback - ${source}`);
  } catch {
    return saveOrganic(`ads-fallback - ${source}`);
  }
}
