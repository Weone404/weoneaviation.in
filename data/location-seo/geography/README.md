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
indexing. A new route also needs verified claims, passing content
differentiation, explicit indexability approval, and a separate production
sitemap allowlist entry.
The existing ten approved routes alone are grandfathered from differentiation
assessment; that exemption list is explicit in the policy file.

The New York sample models New York County and the city of New York as related
geographies, not as a false county -> city -> Manhattan containment chain.
Manhattan is represented under the city and linked to the county through
`relatedLocationIds`.

The Mumbai sample treats Andheri as a subdistrict/taluka of Mumbai Suburban
District, based on the district administration's listing. Mumbai city and
Andheri are related places, not a fabricated strict parent-child relation.
