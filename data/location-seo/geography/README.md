# Geographic data layer

`real-sample.js` contains 32 manually scoped geographic references across
Australia, Canada, India, the United Kingdom, and the United States. It is a
controlled test sample, not a complete or worldwide gazetteer, and it is not
imported by production page routing or sitemap generation. The separate
synthetic datasets in `scale-test-fixtures.js` and
`location-engine-fixtures.js` exist only for automated performance and engine
tests.

The sample cites national or regional government geography references where
available. Its India postal examples use the GeoNames India postal export as a
secondary place-name and approximate-coordinate reference, not as India Post
data, a postal-boundary source, or evidence of a business address. GeoNames
data is licensed under CC BY 4.0 and requires attribution. Source-level license
metadata is recorded where known; check the source terms and attribution
requirements before importing any larger dataset. Current source coverage and
detail vary by record and jurisdiction.

Keep the data responsibilities separate:

- Geography and source scope: `geography/real-sample.js`
- Business presence and verified claims: `business-profiles.js`
- Aviation regulators: `aviation-regulatory-contexts.js`
- Service intents: `services.js`
- Indexability and similarity thresholds: `geographic-indexability-policy.js`

DGCA flying-training evidence in `../dgca-fto-roster.js` keeps the roster's
stated "As on" date separate from the PDF creation timestamp, the source
object's HTTP `Last-Modified` timestamp, and the date the source was verified.
The object timestamp does not replace the roster's stated date, and an approved
roster entry does not establish ongoing operations, admissions, or course
availability.

Geographic records describe names, hierarchy, aliases, postal values, and
geographic source links only. Compose them with explicit business, service,
regulatory, and indexability inputs through `composeLocationRecord` in
`lib/geographicData.js`. Missing overlays default to informational,
non-renderable, and non-indexable.

`lib/geographicSourceAdapters.js` normalizes GeoNames postal TSV rows into the
canonical geographic record shape for controlled ingestion and scale tests.
Postal codes with conflicting administrative assignments are excluded rather
than assigned arbitrarily. Adapter output is not a production route source or
an indexability decision.

Validate and exercise the data layer with `npm run test:location-engine`.
Passing data validation or being renderable does not approve a route for
indexing. Worldwide informational routes must resolve to an exact, unambiguous
registry identity in a jurisdiction with a verified regulator mapping, use the
supported pilot-training service, pass factual-safety and content-quality
checks, and meet the existing differentiation policy. A local We One Aviation
branch, partner, aviation facility, or city-specific approval is not required
or implied. Failed routes remain `noindex, follow`.

The sitemap cache is generated from those same final page-model decisions.
Legacy India routes retain explicit production approvals; worldwide registry
routes are admitted only after the full quality-gated policy passes. The
80-percent maximum-similarity threshold is unchanged.

Worldwide service availability is intentionally limited to country codes with
an explicitly mapped regulator in `aviation-regulatory-contexts.js`. A
resolvable place in an unmapped jurisdiction remains unsupported for
pilot-training publication until its regulatory context is verified.

Worldwide sitemap quality decisions are stored in the compressed
`worldwide-publication-inventory.json.gz` with a SHA-256 sidecar. The inventory
is valid only when its provenance identifies a full quality evaluation, its
checksum and source fingerprint match, and its registry summary is current.
Legacy route caches cannot establish that provenance and are never adopted.
The fingerprint uses normalized relative paths, LF-normalized text, selected
pilot-training source Markdown, the active evaluator dependencies, and pinned
geographic source manifests. It deliberately excludes Node patch versions:
the evaluator does not base publication decisions on runtime-version-specific
results. Bump `WORLDWIDE_PUBLICATION_EVALUATION_COMPATIBILITY_VERSION` if a
future evaluator change makes runtime compatibility relevant. Registry
identity is covered by its pinned source manifests, India geographic build
inputs and builder, plus the current worldwide registry summary. Worldwide
source archives are verified against their pinned SHA-256 values during
provisioning rather than re-hashed on each cache read.

The normal cache step reuses a valid inventory and independently rechecks
explicit route approvals. A missing, stale, corrupt or invalid inventory
triggers a complete quality evaluation before replacement; other read or
evaluation errors fail the build. Inventory and checksum writes use temporary
files followed by atomic renames, so an interrupted update fails checksum
validation instead of being trusted. After a content, policy, source-manifest
or evaluator change, regenerate and include the resulting inventory with that
source change using `npm run cache:approved-geographic-sitemap -- --refresh`.
The `auto-merge-blog` workflow persists any refreshed inventory in the verified
commit merged to `master`, so Vercel reuses the approved cache rather than
repeating the worldwide evaluation. Do not leave the inventory as an
untracked local-only build input or edit it to manufacture approvals.

The full India and worldwide SQLite indexes are build-time evaluation inputs,
not serverless-function assets. After generating the final approved route
cache, `npm run build:geographic-runtime-index` creates compact runtime
indexes containing approved route identities, required hierarchy and collision
records, explicitly reviewed noindex exceptions, and airport references for
countries represented by published routes. Dynamic requests use these subsets;
build-time evaluation and sitemap generation continue to use the full
registries. `npm run build` verifies
runtime route parity and fails if the geographic route function trace includes
the full indexes or exceeds 225 MiB uncompressed.

The source manifests pin expected SHA-256 values, but the GeoNames download
URLs currently point to mutable latest archives. Provisioning fails closed
when upstream bytes differ; a pin alone does not make the upstream artifact
available in a clean checkout. Do not describe provisioning as reproducible
until immutable source snapshots are configured and clean-checkout provisioning
passes. Worldwide and India source files are checked by
`npm run provision:world-geography-sources` and
`npm run provision:india-geography-sources`. India geographic inputs also use
`npm run build:india-geography`; the source-linked locality overlay must be
present as documented above.

The New York sample models New York County and the city of New York as related
geographies, not as a false county -> city -> Manhattan containment chain.
Manhattan is represented under the city and linked to the county through
`relatedLocationIds`.

The Mumbai sample treats Andheri as a subdistrict/taluka of Mumbai Suburban
District, based on the district administration's listing. Mumbai city and
Andheri are related places, not a fabricated strict parent-child relation.

Pilot-training location scale batches use the existing support-classification
JSONL and geographic indexes, the shared dynamic route resolvers, and the
location content and quality engines. Batch 1 selects 5,000 supported India
records and 5,000 supported worldwide records, apportioned across country and
geographic level. It writes a machine-readable report and a separate
indexability-candidate list; neither output changes the production sitemap.
Only records passing both the production page-quality gate and a bounded
same-country/geographic-level differentiation comparison appear in the
candidate list. An entry there is not, by itself, a production sitemap
allowlist entry.

Run with `npm run batch:pilot-training-locations`. The default outputs are
`pilot-training-location-batch-1-report.json` and
`pilot-training-location-batch-1-approved-indexable-candidates.json` in this
directory. `PILOT_TRAINING_LOCATION_BATCH_SIZE` may be set for a smaller
diagnostic run; output paths can be overridden with
`PILOT_TRAINING_LOCATION_BATCH_REPORT` and
`PILOT_TRAINING_LOCATION_BATCH_CANDIDATES`.
