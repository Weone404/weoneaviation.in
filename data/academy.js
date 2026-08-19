/**
 * data/academy.js
 *
 * Single source of truth for the factual figures the site quotes about itself.
 *
 * Only first-party facts that can be checked live here. The pilots-trained,
 * success-rate and partner-airline constants were removed in the 2026-08 claims
 * pass: none of the three could be substantiated, and they had drifted apart
 * across pages by up to a factor of seven. They were deleted rather than revised
 * downward — a number nobody can source should not appear at all.
 * scripts/check-claims.js fails the build if any of them return.
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

export default {
  FOUNDED_YEAR,
  YEARS_OF_OPERATION,
  YEARS_LABEL,
};
