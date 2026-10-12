# Location data

`pin-records.json` is generated from the India PIN Code List PDF supplied by
the site owner:

```text
node scripts/extract-pin-data.js <path-to-pdf>
```

The PDF supplies post-office name, PIN code and state. It does not supply
separate city, district or taluk fields. GeoNames is used as an explicitly
secondary cross-reference for those fields. A PIN code is not treated as a
business address.

## Enrichment workflow

Run:

```text
npm run enrich:locations
npm run generate:local-search
npm run generate:sitemap
npm run verify:location-sample -- <path-to-original-pdf>
npm run build
npm run validate:local-search
```

The repeatable batch enrichment uses the GeoNames India postal-code download:
`https://download.geonames.org/export/zip/IN.zip`. The data includes place
name, first/second/third administrative names, approximate coordinates and
accuracy level. GeoNames states its data is provided as-is without accuracy,
timeliness or completeness warranties and licenses the dump under CC BY 4.0;
the site pages link to GeoNames for attribution. It is a secondary geographic
dataset, not India Post data.

The official India Post Locate Us page is
`https://www.indiapost.gov.in/speedpost/locateus`. Its current internal
Next.js Server Action is deployment-generated, not a stable documented
machine-readable API. The pipeline does not hard-code it. GeoNames rows are
cross-checked against the supplied PIN list's state and post-office names.
Conflicts and ambiguous names remain REVIEW. Coordinates are approximate and
are not used to imply academy premises.

The enrichment output groups records by PIN, reuses the downloaded bulk source
archive locally, and records a structured source and confidence for every
populated field. The ignored `india-post-cache.json` file is a legacy,
PIN-keyed cache from the secondary `api.postalpincode.in/pincode/{PIN}`
lookup. Its entries carry `fetchedAt`, `sourceUrl`, `sourceConfidence`,
`offices` and `first` response fields. It is not an authoritative India Post
dataset and is not an input to enrichment, locality generation, rendering or
provenance. No geographic field falls back to this cache. Since GeoNames uses
a settlement `place name` rather than a distinct city field, city stays null
unless a future source explicitly supplies it.

The canonical adapter in `lib/geographicSourceAdapters.js` can normalize
GeoNames India postal TSV rows into geographic-reference records for controlled
tests and ingestion. It skips postal codes whose rows have conflicting
administrative assignments. This adapter output is distinct from the
owner-supplied PIN list and the enrichment artifacts described above; it does
not establish academy presence, approve a route, or feed production routing or
the sitemap.

Conflicting nonblank state values in the supplied PDF set `stateConflict`,
preserve all source-state values, lower state confidence and force the record
to REVIEW. GeoNames may be recorded as a cross-check but cannot erase a PDF
conflict or make that record publishable.

`generate:local-search` keeps PIN records as geographic references and builds
the locality research candidates independently from them. The candidate model
uses the academy's Google Maps pin and OpenStreetMap/Nominatim locality
features; approximate straight-line distance prioritizes research only and is
not a travel estimate, catchment or service boundary. The academy address is
consistent across first-party pages, while the map pin's exact address match
and profile ownership still need independent confirmation.

The current candidate model has 14 entries: nine nearby Delhi
`RESEARCH_CANDIDATE`s within a 12 km straight-line research-priority radius,
Laxmi Nagar and Lajpat Nagar as `NEEDS_VERIFICATION`, and Gurugram, Noida and
Faridabad as `REFERENCE_ONLY`. There are zero `SEO_CANDIDATE`s and the
`pilot-localities.json` route list remains empty. None of the statuses asserts
that the academy serves that locality. The actual verified delivery remains a
Dwarka classroom, online batches offered to students outside Delhi and flight
training arranged through partner schools; no neighborhood catchment is
documented.

`localities.json` is the PIN/GeoNames geographic-reference dataset;
`academy-geo.json` records the academy address and map-pin coordinates with
their separate sources and confidence; `locality-geography-source.json`
records the OSM candidate identities; `locality-candidates.json` contains the
computed research model; and `pilot-localities.json` remains empty until
explicit editorial approval. `local-search-report.json` records the entity,
service-area, candidate, indexability, sitemap, link and schema audits;
`business-entity-audit.json` records first-party facts and a Google Business
Profile verification checklist. Only explicitly approved
`PUBLISH_INDEXABLE` pages may be added to the sitemap.
Locality routes use `/pilot-training-near/[locality]`; no separate CPL,
academy-near or near-me routes are generated. After a production build,
`npm run validate:local-search` writes `locality-page-validation-report.json`,
including source-conflict/provenance checks, rendered pilot metadata/schema
checks and pairwise body similarity where pages exist.

`verify:location-sample` re-parses the supplied original PDF and compares a
reproducible 20-record sample of publishable geographic records against both
that extraction and the GeoNames source ZIP. It checks field
provenance/confidence and writes the sample records and PDF source-page
references to `location-source-verification-sample.json`. Its fixed seed
makes the selection repeatable for later audits.

Any future locality page must establish locality-specific service relevance,
explain the actual Dwarka classroom and available delivery, link to
authoritative course/contact pages, and provide distinct sourced information.
It must not imply local service, facilities or staff, or infer travel or
airport details from a PIN. Appropriate schemas are WebPage,
BreadcrumbList, organization reference and relevant Course references, never
LocalBusiness merely for a locality URL. The legacy PIN route has been retired;
a postal record alone does not justify an SEO landing page.

## India-wide geography registry

`data/location-seo/geography/india-geography.json.gz` is a generated,
resolution-only GeoNames India gazetteer and postal reference with a small,
source-linked OSM locality overlay. It records canonical names, slugs, aliases,
geographic types, parent hierarchy, country/state/district context, postal
codes and approximate coordinates where supplied, source links/dates, and
confidence. GeoNames feature classes are retained as supplied; a generic
populated place is not relabeled as a town or village. Ambiguous postal codes
are omitted as individual postal records and counted in registry coverage.

Build or test the registry with:

```text
npm run provision:india-geography-sources
npm run build:india-geography
npm run test:india-geography
```

The provisioner pins GeoNames URLs and SHA-256 checksums in
`source/india-geonames-source-manifest.json`, validates the downloads and
archive contents, and stores downloaded inputs in the ignored
`source/provisioned/` cache. It validates the tracked postal archive without
replacing it. The build also requires the tracked
`data/location-seo/geography/india-locality-overlay.json`; this resolution-only
OSM input must retain its source and license metadata and is never generated
by the provisioner.

The test validates the complete registry and its parent chains, tests
resolution and all four core intent models on stratified 1,000-, 5,000-, and
10,000-record samples, and verifies canonical/noindex/sitemap isolation.
`lib/indiaGeographicRegistry.js` streams the compressed registry and caches
the full dataset only for audit and scale-test workflows. Dynamic routes use a
generated SQLite locator plus compressed record blocks, so a request reads
only the matched record and its parent chain rather than materializing the
full registry. The index uses Node's built-in `node:sqlite` API and requires
Node.js 22.13.0 or later. Build those ignored artifacts with
`npm run build:india-geographic-index`; `npm run dev`, `npm run build`, and the
dynamic-route test command generate them automatically. The dynamic route's
output trace includes the locator and compressed blocks. Callers should pass
country/state/district/type context where names are ambiguous. A place-name
record is not aviation-service evidence. Every imported record remains `research-only`, non-renderable,
non-indexable, and excluded from the production sitemap until it independently
passes the existing service, relationship, evidence, content-differentiation,
indexability, and sitemap gates. Registry records do not feed production
routes. GeoNames and OSM are secondary geographic references with their
respective licenses and limitations; neither verifies We One Aviation's local
presence or operating area.

## India aviation page-model pilot

`lib/indiaAviationPageEngine.js` connects the registry to the existing
location/service model for a controlled pilot: named Delhi/NCR and city
references plus deterministic administrative samples across all State/UT
units. It builds models for the four core pilot-training intents, attaching
only source-attributed aviation evidence and explicit geographic relationships.
Missing source facts and distances remain missing; a registry match does not
establish We One Aviation service coverage.

The pilot is resolution and research tooling, not a production route or sitemap
allowlist. Models remain non-indexable unless the existing relationship,
content-differentiation, approval and sitemap gates pass. The adapter creates
no city/locality JSX files and emits no `LocalBusiness` schema for informational
records. Use `npm run test:india-aviation-engine` for the pilot model checks and
`npm run test:india-geography` for the separate stratified 1,000/5,000/10,000
registry-scale checks.

## Curated India aviation pages

`data/location-seo/aviation-market-pages.js` provides source-backed aviation
facts, local FAQs and a structured `locationAviationContent` model for a small
set of curated city guides. The production candidate adapter joins those
candidates to their exact city records and administrative parents from the
existing India registry. It does not change the registry or promote other
registry records automatically.

Only candidates that pass the existing relationship, evidence, regulatory,
content, claims, differentiation, metadata and route-data gates enter
`/[location]/[service]`. At present, eight Indian cities have an informational
pilot-training page model; DGCA ground classes, commercial-pilot training and
CPL training remain unsupported for those candidates unless they receive their
own verified service relationship and content. The shared route renders
geographic context, source-attributed aviation facts, the student pathway,
relationship limits, FAQs and references. Informational pages do not assert a
local We One Aviation branch or emit LocalBusiness schema.

Run `npm run test:india-aviation-production` to verify the current production
candidate gates, route models, differentiation measures and service exclusions.
The test is separate from the four-intent geographic resolution tests above:
resolving a search or place does not make that location/service pair indexable.

## India candidate content engine

`lib/indiaLocationContentEngine.js` evaluates every registry record against
pilot training, DGCA ground classes, commercial pilot training and CPL training.
Exact source-to-place matching, hierarchy, content, service specificity,
differentiation, production approval and sitemap eligibility remain separate
checks. Contextual ambiguity uses the complete parent chain; a repeated
place-name elsewhere in India does not by itself make a scoped record
ambiguous.

Run `npm run test:india-location-candidates` to evaluate the full record/service
matrix, the named Delhi/NCR and city searches, and stratified 1,000/5,000/10,000
pilot-training samples. The command writes the bounded summary and ranked
candidate queue to
`data/location-seo/india-location-candidate-report.json`. Existing production
routes are reported from the authoritative promotion allowlist; candidate
evaluation does not promote registry records or modify the sitemap.

## Dynamic registry-backed location route

`pages/[location]/[service].jsx` pre-renders only the existing approved route
set and uses Pages Router `fallback: 'blocking'` for other requests. The shared
route resolves India registry slugs and name aliases on demand. The registry
reader is cached per server process; slug and alias lookup indexes are created
once and reused, and hierarchy validation/content generation are limited to
the resolved record and its parents.

Valid unpromoted geography/service requests render informational guidance with
`noindex, follow`. Rendering does not add a route to the sitemap. Ambiguous
aliases, invalid hierarchies, missing locations/services and explicitly unsafe
relationships fail closed. Parent aviation evidence is labeled as regional
context and is never described as an exact-locality facility. Run
`npm run test:india-dynamic-route` to verify the geography levels, aliases and
1,000/10,000/100,000-model samples.

## Worldwide geography index sources

The worldwide registry builder consumes four GeoNames files whose URLs,
SHA-256 pins and expected formats are recorded in
`source/world-geonames-source-manifest.json`. Run
`npm run provision:world-geography-sources` to validate existing ignored
inputs or download missing ones. Existing files with a checksum mismatch are
left untouched and cause a clear failure; downloaded files are written to a
temporary path and installed only after checksum and content validation.

`npm run build:world-geographic-index` provisions and validates these sources
before rebuilding the ignored SQLite index. The provisioning checks validate
the complete source-file checksums, the required `allCountries.txt` archive
entry, and the country and administrative TSV structures. The worldwide
archive is hundreds of megabytes; the pinned checksum covers its complete
content without materializing its much larger extracted text file during
source validation. The sources are published by GeoNames at mutable URLs, so
a future upstream snapshot that no longer
matches the recorded pins fails closed and requires a reviewed manifest
update. No large source archive is stored in Git.
