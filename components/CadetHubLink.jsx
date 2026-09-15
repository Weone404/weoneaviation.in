import Link from 'next/link';

/*
 * A one-line contextual route from any single airline cadet page back to the
 * hub at /cadet-pilot-program. Added 2026-09-15: before the hub existed, the
 * six airline pages had no parent and competed with each other for the
 * generic "cadet pilot program" search.
 */
export default function CadetHubLink({ airline }) {
    return (
        <section className="px-4 py-6 bg-slate-50 border-y border-slate-200">
            <div className="max-w-4xl mx-auto text-sm text-slate-700 leading-relaxed">
                <strong>Comparing cadet routes?</strong> A cadet programme changes how you
                are selected, funded and placed &mdash; it does not change the licence DGCA
                issues you. Before you commit to the {airline} route, read{' '}
                <Link href="/cadet-pilot-program" className="text-av-blue font-semibold underline">
                    what a cadet pilot programme is, and what it does not change
                </Link>
                , which sets out the requirements that stay the same on every route.
            </div>
        </section>
    );
}
