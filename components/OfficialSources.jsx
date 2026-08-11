/**
 * OfficialSources.jsx
 *
 * WHY THIS EXISTS
 * ---------------
 * The 2026-08-11 GEO audit found that across 40 audited pages, the complete set
 * of external domains this site linked to was: Google Fonts, unpkg, Google Maps,
 * wa.me, and Facebook. Not a single link to dgca.gov.in — on a site whose entire
 * content premise is explaining DGCA regulations, medical standards, exam
 * syllabi, and flying-hour requirements.
 *
 * That is the single largest E-E-A-T deficit on the site. AI answer engines and
 * Google both weight sourced claims far above unsourced ones. A page that
 * restates regulations without pointing at the regulator reads as derivative,
 * and derivative pages do not get cited — the regulator gets cited instead.
 *
 * This component renders a compact, consistent "official sources" block so every
 * regulatory page cites the authority it is paraphrasing.
 *
 * USAGE
 *   <OfficialSources
 *     sources={[
 *       { label: 'DGCA — Civil Aviation Requirements (CAR)', href: 'https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/headerblock/carRules/car.jsp' },
 *     ]}
 *   />
 *
 * NOTE ON LINK RELS
 * Deliberately NOT rel="nofollow". Citing an authority is exactly the kind of
 * outbound link that signals genuine sourcing; nofollowing it defeats the point.
 */

const DEFAULT_SOURCES = [
  {
    label: 'DGCA — Directorate General of Civil Aviation (official portal)',
    href: 'https://www.dgca.gov.in/',
  },
];

export default function OfficialSources({
  sources = DEFAULT_SOURCES,
  heading = 'Official sources',
  note = 'Requirements change. Always confirm current rules against the regulator before acting on them.',
}) {
  if (!sources || sources.length === 0) return null;

  return (
    <aside
      className="my-10 rounded-xl border border-gray-200 bg-gray-50 p-5"
      aria-labelledby="official-sources-heading"
    >
      <h2
        id="official-sources-heading"
        className="font-montserrat text-sm font-bold uppercase tracking-wide text-av-blue mb-3"
      >
        {heading}
      </h2>

      <ul className="space-y-2">
        {sources.map((s) => (
          <li key={s.href} className="text-sm leading-relaxed">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-av-orange underline underline-offset-2 hover:text-av-blue transition-colors break-words"
            >
              {s.label}
            </a>
            {s.detail && <span className="text-gray-600"> — {s.detail}</span>}
          </li>
        ))}
      </ul>

      {note && <p className="mt-3 text-xs text-gray-500">{note}</p>}
    </aside>
  );
}

/**
 * Canonical DGCA URLs, defined once so pages cite consistent destinations
 * instead of each hand-rolling a slightly different link.
 */
export const DGCA = {
  home: {
    label: 'DGCA — Directorate General of Civil Aviation (official portal)',
    href: 'https://www.dgca.gov.in/',
  },
  car: {
    label: 'DGCA — Civil Aviation Requirements (CAR)',
    href: 'https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/headerblock/carRules/car.jsp',
    detail: 'the binding rule set for licensing, medicals and operations',
  },
  medical: {
    label: 'DGCA — Medical directorate',
    href: 'https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/headerblock/medical/medical.jsp',
    detail: 'Class 1 and Class 2 medical standards and examiner lists',
  },
  exams: {
    label: 'DGCA — Examination portal',
    href: 'https://www.dgca.gov.in/digigov-portal/?page=jsp/dgca/InventoryList/headerblock/exams/exam.jsp',
    detail: 'exam schedule, syllabus and computer number registration',
  },
  eLicensing: {
    label: 'DGCA eGCA — licensing services portal',
    href: 'https://www.dgca.gov.in/digigov-portal/',
    detail: 'where computer numbers, exam applications and licences are processed',
  },
  icao: {
    label: 'ICAO — International Civil Aviation Organization',
    href: 'https://www.icao.int/',
    detail: 'the Annexes India’s air regulations are derived from',
  },
  icaoAnnex1: {
    label: 'ICAO Annex 1 — Personnel Licensing',
    href: 'https://www.icao.int/safety/airnavigation/nationalitymarks/annexes_booklet_en.pdf',
    detail: 'international standard behind CPL/PPL licensing requirements',
  },
  wmoMet: {
    label: 'India Meteorological Department — aviation services',
    href: 'https://mausam.imd.gov.in/',
    detail: 'source of Indian METAR/TAF and aviation forecasts',
  },
  wpc: {
    label: 'WPC Wing, Ministry of Communications — radio licensing',
    href: 'https://dot.gov.in/spectrum-management',
    detail: 'issuing authority for the RTR(A) radiotelephony licence',
  },
};
