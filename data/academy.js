/**
 * data/academy.js
 *
 * Single source of truth for the headline figures the site quotes about itself.
 *
 * WHY (GEO audit 2026-08-11): the same three claims were hardcoded on at least
 * six pages and had drifted apart. `/about-us`, `/pilot-training-in-india` and
 * `/courses` said "500+ pilots" and "15+ years"; `/`, `/_document` and
 * `/credentials` said "3500+ pilots" and "16+ years". A visitor — or a model
 * summarising the site — sees the academy contradict itself by a factor of
 * seven. Self-inconsistent numbers are a direct trust signal, and AI answer
 * engines quote whichever figure they land on first.
 *
 * The values below follow `/credentials`, which is the only page that states a
 * source for them. YEARS_OF_OPERATION is derived from FOUNDED_YEAR so it cannot
 * go stale again — "16+" was already wrong by 2026.
 *
 * ⚠️ PILOTS_TRAINED IS UNCONFIRMED BY THE ACADEMY. It reconciles to the site's
 * own sourced figure, not to an independently verified one. If the true number
 * is different, change it here — that one edit fixes every page.
 */

export const FOUNDED_YEAR = 2009;

/**
 * Computed at module scope, which in this app means build time for the static
 * pages and request time for the few dynamic ones. Both render the same value
 * except across a New Year boundary on a site that has not been rebuilt, where
 * it would read one year low — an acceptable failure mode, and far better than
 * a hardcoded number nobody remembers to bump.
 */
export const YEARS_OF_OPERATION = new Date().getFullYear() - FOUNDED_YEAR;

/** e.g. "17+" — the form used in stat tiles and headlines. */
export const YEARS_LABEL = `${YEARS_OF_OPERATION}+`;

/** Sourced on /credentials as "DGCA-approved training records". See warning above. */
export const PILOTS_TRAINED = '3500+';

/** Sourced on /credentials as "DGCA exam pass rate tracking". */
export const SUCCESS_RATE = '98%';

/**
 * Sourced on /credentials as "Official MOU agreements on file". `/about-us` and
 * `/pilot-training-in-india` both claimed "50+" against the homepage's "25+";
 * the sourced figure wins. Also unconfirmed by the academy.
 */
export const PARTNER_AIRLINES = '25+';

export default {
  FOUNDED_YEAR,
  YEARS_OF_OPERATION,
  YEARS_LABEL,
  PILOTS_TRAINED,
  SUCCESS_RATE,
  PARTNER_AIRLINES,
};
