import Link from 'next/link';
import { ACADEMY } from '../lib/facts';

/**
 * Author box for blog posts. Every figure comes from lib/facts.js — there is no
 * literal in this file, so an address or phone change propagates here for free.
 */
export default function BlogAuthorBox() {
  return (
    <aside className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-6" aria-label="About the author">
      <p className="font-montserrat text-xs font-bold uppercase tracking-[0.18em] text-av-orange mb-3">
        Written by
      </p>
      <h2 className="font-montserrat text-xl font-bold text-av-blue mb-2">{ACADEMY.name}</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Teaching the DGCA ground subjects from Dwarka, New Delhi since {ACADEMY.foundedYear}
        {' '}&mdash; {ACADEMY.yearsOfOperation} years of classroom and online instruction for students
        working towards an Indian pilot licence.
      </p>
      <p className="text-gray-600 text-sm leading-relaxed mb-4 border-l-2 border-av-orange/40 pl-4">
        {ACADEMY.scope}
      </p>
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div>
          <dt className="font-semibold text-av-blue inline">Address: </dt>
          <dd className="inline text-gray-600">
            {ACADEMY.streetAddress}, {ACADEMY.addressLocality} {ACADEMY.postalCode}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-av-blue inline">Phone: </dt>
          <dd className="inline text-gray-600">
            <a href={`tel:${ACADEMY.phone}`} className="hover:text-av-orange">{ACADEMY.phone}</a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-av-blue inline">Email: </dt>
          <dd className="inline text-gray-600">
            <a href={`mailto:${ACADEMY.email}`} className="hover:text-av-orange break-all">{ACADEMY.email}</a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-av-blue inline">Counselling: </dt>
          <dd className="inline text-gray-600">
            <Link href="/contact" className="hover:text-av-orange underline">Book a session</Link>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
