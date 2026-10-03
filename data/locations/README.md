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
