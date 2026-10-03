# Location × service data

`locations.js` and `services.js` hold the initial, intentionally small
location/service inventory. `lib/locationSeo.js` provides lookups, the
indexability check and a data-integrity validator. The single
`pages/[location]/[service].jsx` route statically generates eligible
location/service pairs from that shared data. The sitemap generator uses the
same eligibility helper to include those routes.

`npm run validate:location-expansion` is the build preflight for production
location data. It renders every explicitly indexable location/service pair
through the shared page model, checks the business-claim and regulatory gates,
compares non-grandfathered content against the other pages for that service,
and verifies the separate sitemap allowlist. Only the ten existing production
routes are grandfathered from a new differentiation assessment. India and
international research registries are evaluated across the configured service
intents but remain isolated from route generation until their records are
deliberately migrated and pass these gates.

## Global expansion research and promotion

`geography/global-pilot.js` is a sourced, explicitly incomplete pilot across
ten countries. `aviation-evidence.js`, `global-aviation-intents.js`, and
`aviation-regulatory-contexts.js` provide separately validated aviation
evidence, intent policies, and country-level regulator context. These
registries support evaluation only; a gazetteer record, airport, regulator, or
independent training organization does not establish We One Aviation's
presence, partner, or service delivery in a market.

`lib/geographicSourceAdapters.js` includes a bounded GeoNames `allCountries`
TSV adapter. It requires configured countries and explicit administrative
parents, records GeoNames CC BY 4.0 attribution, and rejects rows with unknown
parents, unsupported feature types, invalid coordinates, or malformed fields.
The adapter does not write into production geography or routing automatically.

`production-candidate-registry.js` evaluates the location-by-intent research
matrix through the promotion gates and exports only complete, explicitly
reviewed production candidate records. As of the current pilot, no candidates
pass: the research matrix is not itself a source of indexable URLs. New
production candidates require first-party evidence for the service
relationship, jurisdiction-appropriate facts, complete differentiated
content, claim-safe metadata, and explicit indexability approval. Only then
can the existing route and sitemap selectors expose a pair; geography,
renderability, and an aviation entity listing alone never do.

Run `npm run test:global-location-expansion` for the pilot, bounded-ingestion,
promotion-gate, and synthetic stress checks. Synthetic stress fixtures remain
test-only and must not be imported by the production route or sitemap.

`india-candidates.js` is a separate research-only registry of 30 candidate
markets. It is deliberately not imported by `lib/locationSeo.js`, the dynamic
route or sitemap generation. All candidates remain non-indexable and support
no location-service combinations until new, city-specific primary evidence and
distinct page content pass a separate review. Search-result observations do
not establish demand, academy presence, course availability or local service.

`india-deep-validation.js` records a second, primary-source review of those
same 30 cities. It includes source-linked airport, DGCA training and medical
facts, explicit evidence gaps, the generic Delhi/online/partner pathway
distinction, per-service research statuses, and a separate indexability
decision. It is research-only and must not be imported by routing or sitemap
code. `scripts/validate-india-deep-validation.js` checks its shape, candidate
coverage, non-indexability, source references, service statuses and isolation.
`RESEARCH_ONLY` is not approval to publish a city-service page; `REJECTED`
means the evidence reviewed does not justify that city/service landing page.

## Location relationships

`relationship` is restricted to `physical`, `online`, `service-area`, or
`informational`. A physical relationship means a documented academy location
exists in the named geography; it must not be used to imply a separate branch.
Online availability is not evidence of a physical service area. Use
`nearbyLocations` only for evidenced, relevant locations; an empty list is
preferable to inferred coverage.

## Location and service content

Every supported location/service pair has its own `serviceContent` entry. It
contains a location- and service-specific introduction and application,
service-specific FAQs, a small set of contextual links to existing authority,
service, subject and blog pages, and a CTA. Each internal link must have a
descriptive sentence and must point to a verified site route; avoid generic or
bulk-generated link lists. `localSections` holds structured, visible local
evidence blocks, including titled explanations and optional fact lists. Every
indexable location must have at least one complete local section.
`localFAQs` holds location-level questions. These fields must be grounded in
the listed `sourcePages`; do not generate copy by substituting a place name.
An informational city may be indexable only when it provides a city-specific,
source-backed planning detail and clearly distinguishes that detail from the
academy’s physical presence. The five Indian city medical records use DGCA’s
dated Class 1 medical-centre list and the CAR’s distinct Air Force
renewal-centre list, where applicable. Civil-centre scope, boarding/initial-
issue centres and renewal stations must not be conflated. Only Mumbai and
Bengaluru currently pass the page-content gate; Pune, Chennai and Hyderabad
remain dated medical references on the India authority page but have no
generated/indexable city-service route. These records do not establish a
We One Aviation branch, city cohort, local flying school, or service area. A
station listed for Secunderabad must not be relabelled as being in Hyderabad.

## Indexability

`isLocationServiceIndexable(location, service)` returns true only when the
location is explicitly indexable, the service is explicitly indexable, the
location lists that service in `supportedServices`, and supplies pair content.
Each indexable location must also have structured local-content sections; an
informational location additionally needs source-linked local facts. Each
unsupported service must have an explicit `rejectedServices` reason. This is
eligibility data for route generation and sitemap inclusion.
`LOCATION_SITEMAP_SLUGS` is a separate, deliberately maintained allowlist;
adding a location does not automatically add it to the sitemap. The route
remains an ordinary WebPage connected to the existing academy entity graph;
it does not create a LocalBusiness or branch entity.

## International candidate gate

`international-candidates.js` records New York City, Dubai and London as
reviewed, non-indexable candidates, not as available We One Aviation
locations. Existing pages explain the Indian DGCA pathway, foreign-national
requirements and training-abroad comparisons, but do not verify city-specific
service delivery, international online availability, local partners or
country-regulator requirements for these cities. Each candidate therefore has
`indexable: false`, no supported services and a rejection reason for every
service. Do not enable a route until current, primary-source local evidence,
confirmed service terms and genuinely distinct useful content are reviewed.
DGCA rules must never be presented as equivalent to FAA, GCAA, UK CAA, EASA or
another authority's rules.

`pilot-school` is defined for informational intent but is not supported by
any location and is not indexable. Mumbai and Bengaluru support only
`pilot-training`; Pune, Chennai and Hyderabad reject every city-service route
because their verified local medical listings alone do not support a
differentiated training page. The indexable cities reject separate ground-
class, CPL-training and commercial-pilot-training pages because no additional
city-specific delivery is verified. We One Aviation teaches DGCA ground
subjects and arranges flight training with partner schools; it does not
operate a flying school. No `LocalBusiness` entity is defined by this model.

The initial physical location is the documented Dwarka classroom in Delhi.
The city-level Delhi entry refers to that same academy/location, not a second
office. No PIN-code or inferred nearby-locality pages are represented here.
Candidate-city airport context, regulatory facts and training relevance must
be verified from suitable primary sources before any candidate is promoted;
general online availability and unrelated airport or aviation listings are
not enough.
