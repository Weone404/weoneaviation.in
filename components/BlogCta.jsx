import Link from 'next/link';
import { ACADEMY } from '../lib/facts';

/**
 * The three calls to action a blog post carries (data/blog-standard.md).
 *
 *   top     after the intro. Helpful and low-commitment: a free checklist.
 *   mid     after a key section. What our classes actually are.
 *   bottom  rendered by BlogPostLayout after the article. A conversation.
 *
 * Copy rules: nothing here may promise a result, a job, a pass rate or an
 * approval we do not hold — scripts/check-claims.js scans the built HTML, and
 * ACADEMY.scope is the line every CTA has to stay inside. Override the text per
 * post when a more specific next step exists, but keep it a next step, not a pitch.
 */
const DEFAULTS = {
  top: {
    eyebrow: 'Free, no sign-up',
    title: 'Check where you stand before you spend anything',
    text: 'Our pilot-training checklists cover eligibility, the DGCA exams, the medical and the licence application, each step taken from the DGCA documents behind it.',
    href: '/student-checklists',
    label: 'Open the checklists',
  },
  mid: {
    eyebrow: 'DGCA ground subjects',
    title: 'How our ground classes work',
    text: 'We teach the DGCA written subjects from our Dwarka classroom and online. See what each batch covers and how it fits around your flying school.',
    href: '/dgca-ground-classes',
    label: 'See the DGCA ground classes',
  },
  bottom: {
    eyebrow: 'Talk it through',
    title: 'Not sure which step comes next for you?',
    text: 'A counselling session is free. Bring your marksheets and your questions; we will map the DGCA route against your situation, and tell you plainly where we can help and where we cannot.',
    href: '/pilot-career-counselling',
    label: 'Book free counselling',
  },
};

export default function BlogCta({ variant = 'top', eyebrow, title, text, href, label }) {
  const d = DEFAULTS[variant] || DEFAULTS.top;
  const c = {
    eyebrow: eyebrow ?? d.eyebrow,
    title: title ?? d.title,
    text: text ?? d.text,
    href: href ?? d.href,
    label: label ?? d.label,
  };

  if (variant === 'bottom') {
    return (
      <aside className="mt-14 rounded-2xl bg-av-blue p-6 md:p-8 text-white" aria-label="Next step">
        <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-av-orange mb-2">{c.eyebrow}</p>
        <p className="font-montserrat text-2xl font-bold mb-3">{c.title}</p>
        <p className="text-white/80 text-base leading-relaxed mb-5">{c.text}</p>
        <div className="flex flex-wrap gap-3">
          <Link href={c.href} className="inline-block rounded-xl bg-av-orange px-5 py-3 font-semibold text-white hover:opacity-90">
            {c.label}
          </Link>
          <a href={ACADEMY.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block rounded-xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10">
            WhatsApp {ACADEMY.whatsappPhoneDisplay}
          </a>
          <a href={`tel:${ACADEMY.phone}`} className="inline-block rounded-xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10">
            Call {ACADEMY.phoneDisplay}
          </a>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`not-prose my-8 rounded-2xl border p-5 md:p-6 ${variant === 'mid' ? 'border-av-orange/30 bg-orange-50/60' : 'border-av-sky/30 bg-av-light/60'}`}
      aria-label={variant === 'mid' ? 'Our classes' : 'Free resource'}
    >
      <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-av-orange mb-1">{c.eyebrow}</p>
      <p className="font-montserrat text-lg font-bold text-av-blue mb-2">{c.title}</p>
      <p className="text-base text-gray-700 leading-relaxed mb-3">{c.text}</p>
      <Link href={c.href} className="font-semibold text-av-orange underline">
        {c.label} &rarr;
      </Link>
    </aside>
  );
}
