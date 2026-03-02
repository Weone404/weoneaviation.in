import Link from 'next/link';

export default function CourseCard({ icon, title, duration, eligibility, href, highlight }) {
  return (
    <Link href={href}
      className={`card-hover block rounded-2xl overflow-hidden border transition-all duration-300 ${highlight ? 'border-av-orange shadow-xl shadow-orange-100' : 'border-gray-100 shadow-md'} bg-white`}>
      <div className={`p-6 ${highlight ? 'bg-gradient-to-br from-av-blue to-av-navy' : 'bg-white'}`}>
        <div className={`text-3xl mb-3`}>{icon}</div>
        <h3 className={`font-montserrat font-bold text-lg mb-2 ${highlight ? 'text-white' : 'text-av-blue'}`}>{title}</h3>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-av-orange text-xs">⏱</span>
            <span className={`text-xs ${highlight ? 'text-white/70' : 'text-gray-500'}`}>Duration: {duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-av-orange text-xs">📋</span>
            <span className={`text-xs ${highlight ? 'text-white/70' : 'text-gray-500'}`}>Eligibility: {eligibility}</span>
          </div>
        </div>
      </div>
      <div className={`px-6 py-4 flex items-center justify-between ${highlight ? 'bg-av-orange' : 'bg-gray-50'}`}>
        <span className={`text-sm font-semibold ${highlight ? 'text-white' : 'text-av-blue'}`}>Learn More</span>
        <svg className={`w-4 h-4 ${highlight ? 'text-white' : 'text-av-orange'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
