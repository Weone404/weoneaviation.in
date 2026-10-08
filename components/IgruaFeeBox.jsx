import { CPL_COST } from '../lib/facts';

/**
 * IGRUA's published ab-initio to CPL fee, with what it covers and what it does
 * not. Added 2026-10-08: several posts cite this one published figure, and the
 * included / excluded lists are the useful part, so they render the same way
 * everywhere. Every value comes from CPL_COST.benchmark in lib/facts.js.
 */
export default function IgruaFeeBox() {
  const b = CPL_COST.benchmark;
  return (
    <div className="my-6">
      <p className="text-base text-gray-700 mb-3">
        <strong className="text-av-blue">{b.school}</strong> ({b.status.toLowerCase()}) publishes{' '}
        <strong className="text-av-blue">{b.feeLabel}</strong> for its {b.course.replace('Ab-initio', 'ab-initio')} course.{' '}
        {b.gstNote}
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="font-montserrat font-bold text-av-blue mb-2">Included in the fee</p>
          <ul className="list-disc pl-5 space-y-1 text-base text-gray-700">
            {b.includes.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="font-montserrat font-bold text-av-blue mb-2">Not included</p>
          <ul className="list-disc pl-5 space-y-1 text-base text-gray-700">
            {b.excludes.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Source:{' '}
        <a href={b.source} target="_blank" rel="noopener noreferrer" className="underline">IGRUA approved courses page</a>,
        read {CPL_COST.verifiedOn}. Check the page for the current fee before relying on it.
      </p>
    </div>
  );
}
