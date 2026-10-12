import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';
import FAQSection from '../../components/FAQSection';
import LeadForm from '../../components/LeadForm';
import Layout from '../../components/Layout';
import StructuredData from '../../components/StructuredData';
import { ACADEMY } from '../../lib/facts';
import { resolveGeographicServicePage } from '../../lib/geographicServicePage';
import { prepareLocationServicePageResult } from '../../lib/locationPageProps.js';
import { generateWebPageSchema } from '../../lib/schema';
import {
  getApprovedLocationServicePairs,
} from '../../lib/locationSeo';

const SITE_URL = 'https://weoneaviation.in';

function InfoSection({ title, children }) {
  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
      <h2 className="font-montserrat text-2xl font-bold text-av-blue">{title}</h2>
      <div className="mt-3 space-y-3 leading-7 text-gray-600">{children}</div>
    </section>
  );
}

function RelationshipNote({ location, relationship, content }) {
  if (content.relationshipStatement) {
    return <p>{content.relationshipStatement}</p>;
  }

  const physicalPresenceVerified = location.physicalAcademy === true
    || location.physicalPresence?.verified === true;

  if (relationship === 'physical' && physicalPresenceVerified) {
    return (
      <p>
        The academy’s documented physical teaching location is {ACADEMY.streetAddress},{' '}
        {ACADEMY.addressLocality}, {ACADEMY.addressRegion} {ACADEMY.postalCode}. It is a
        ground-classroom, not a flying school.
      </p>
    );
  }

  if (relationship === 'physical') {
    return <p>The record is marked physical, but verified premises details are unavailable; this is not a branch or flying-school claim.</p>;
  }

  if (relationship === 'online') {
    return <p>This page describes online access only; it does not imply a local office, classroom or flying school.</p>;
  }

  if (relationship === 'service-area') {
    return <p>This page describes the documented service relationship only; it does not imply a local office, classroom or flying school.</p>;
  }

  return (
    <p>
      This is location-specific informational guidance, not a claim of a local office,
      classroom or flying school. The published site says students outside Delhi can join
      online ground-class batches; flying is arranged with partner schools and takes place
      at the selected school.
    </p>
  );
}

function LocationAviationContent({ location, data, serviceContent }) {
  if (!data) return null;

  const geography = data.geographicContext || [];
  const sources = data.sourceLinks || [];
  const facts = data.aviationFacts || [];
  const regionalHubs = data.nearbyAviationHubs || [];

  return (
    <>
      <InfoSection title={`Geographic context for ${location.name || location.city}`}>
        <p>{data.locationOverview}</p>
        {geography.length > 0 && (
          <ul className="space-y-2">
            {geography.map((record) => (
              <li key={record.id}>
                <span className="font-semibold text-gray-800">{record.type}:</span>{' '}
                {record.name}
                {record.id === location.id && record.adminCode && (
                  <span className="text-gray-600"> (registry code {record.adminCode})</span>
                )}
                {record.id === location.id && record.postalCodes?.length > 0 && (
                  <span className="text-gray-600">; registry postal codes {record.postalCodes.join(', ')}</span>
                )}
                {record.sources?.map(({ publisher, href }) => (
                  <span key={href}>
                    {' '}<a className="underline" href={href} target="_blank" rel="noopener noreferrer">
                      ({publisher} source)
                    </a>
                  </span>
                ))}
              </li>
            ))}
          </ul>
        )}
      </InfoSection>

      {(facts.length > 0 || regionalHubs.length > 0 || data.aviationRelevance) && (
        <InfoSection title={`Aviation context for ${location.name || location.city}`}>
          <p>{data.aviationRelevance}</p>
          {facts.map(({ fact, evidenceId, evidence }) => (
            <p key={evidenceId}>
              {fact}{' '}
              {evidence?.href && (
                <a
                  className="font-semibold text-av-blue underline"
                  href={evidence.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source: {evidence.publisher}
                </a>
              )}
            </p>
          ))}
          {regionalHubs.length > 0 && (
          <>
            <h3 className="pt-2 font-semibold text-av-blue">Regional aviation context</h3>
            <ul className="space-y-2">
              {regionalHubs.map((hub) => (
                <li key={hub.evidenceId}>
                  <p>{hub.fact}</p>
                  {hub.attributionNote && (
                    <p className="text-sm text-gray-500">{hub.attributionNote}</p>
                  )}
                  {hub.contextGeography && (
                    <p className="text-sm text-gray-500">
                      The registry links this evidence through {hub.contextGeography.name} ({hub.contextGeography.type});
                      it is not evidence of a facility in {location.name || location.city}.
                    </p>
                  )}
                  <a
                    className="font-semibold text-av-blue underline"
                    href={hub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source: {hub.publisher}
                  </a>
                </li>
              ))}
            </ul>
          </>
          )}
        </InfoSection>
      )}

      <InfoSection title={`${data.serviceName || 'Aviation'} pathway for students from ${location.name || location.city}`}>
        <p>{data.howStudentsFromLocationCanTrain}</p>
        <p>{serviceContent?.explanation || data.studentPathway?.explanation}</p>
        <p>{serviceContent?.eligibility || data.studentPathway?.medicalContext}</p>
        <p>{serviceContent?.regulatoryPathway || data.studentPathway?.licensingContext}</p>
        {serviceContent?.trainingProcess?.length > 0 && (
          <ol className="list-decimal space-y-2 pl-6">
            {serviceContent.trainingProcess.map(({ title, description }) => (
              <li key={title}><strong>{title}:</strong> {description}</li>
            ))}
          </ol>
        )}
        <p>{serviceContent?.flightTrainingPathway || data.flightTrainingExplanation}</p>
        <p>{serviceContent?.whyThisOption}</p>
        <h3 className="pt-2 font-semibold text-av-blue">Flight training and provider checks</h3>
        <p>{data.flightTrainingExplanation}</p>
        <p>{data.ftoSelectionGuidance}</p>
        <p>{data.physicalVsOnlineExplanation}</p>
      </InfoSection>

      {sources.length > 0 && (
        <InfoSection title="Sources and review dates">
          <ul className="space-y-2">
            {sources.map((source) => (
              <li key={source.href}>
                <a
                  className="font-semibold text-av-blue underline"
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.title}
                </a>
                {' '}({source.publisher}; source date: {source.sourceDate || 'not stated'})
              </li>
            ))}
          </ul>
        </InfoSection>
      )}
    </>
  );
}

function LocationSpecificSections({ sections = [] }) {
  if (sections.length === 0) return null;
  return (
    <InfoSection title="Location and regulatory evidence">
      {sections.map((section) => (
        <article key={section.title} data-evidence-verified={section.verified === true}>
          <h3 className="font-semibold text-av-blue">{section.title}</h3>
          <p>{section.body}</p>
          {section.sourceLinks?.map(({ href, publisher, title }, index) => (
            <p key={`${href}-${index}`}>
              <a className="font-semibold text-av-blue underline" href={href} target="_blank" rel="noopener noreferrer">
                {title || publisher || 'Source'}
              </a>
            </p>
          ))}
        </article>
      ))}
    </InfoSection>
  );
}

function ComposedContentField({ title, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  const blocks = Array.isArray(value) ? value : [{ excerpt: value }];

  return (
    <section className="space-y-2" data-content-field={title}>
      <h3 className="font-semibold text-av-blue">{title}</h3>
      {blocks.map((block, index) => (
        <article key={block.id || block.title || `${title}-${index}`}>
          {block.heading && <h4 className="font-medium text-gray-800">{block.heading}</h4>}
          {block.title && <h4 className="font-medium text-gray-800">{block.title}</h4>}
          <p>{block.excerpt || block.description || block.body || block}</p>
          {block.sourceFile && (
            <p className="text-sm text-gray-500">Source material: {block.sourceFile}</p>
          )}
        </article>
      ))}
    </section>
  );
}

function MasterContentSection({ masterContent, composedPage }) {
  const blocks = masterContent?.blocks || [];
  const fields = [
    ['Pilot-training stages', composedPage?.pilotTrainingPathway],
    ['CPL pathway', composedPage?.cplPathway],
    ['Ground school', composedPage?.groundTraining],
    ['Medical requirements', composedPage?.medicalRequirements],
    ['Examinations and licensing', composedPage?.examinations],
    ['Flight-training / FTO stage', composedPage?.flightTrainingFtoStage],
    ['Regulatory context', composedPage?.regulatoryContext?.summary],
  ];
  if (!blocks.length && !fields.some(([, value]) => value?.length || value)) return null;

  return (
    <InfoSection title="Pilot-training pathway and reference content">
      {fields.map(([title, value]) => (
        <ComposedContentField key={title} title={title} value={value} />
      ))}
      {blocks.map((block) => (
        <p key={block.id} className="text-sm text-gray-500" data-content-category={block.categoryId}>
          Selected source: {block.heading} ({block.sourceFile})
        </p>
      ))}
    </InfoSection>
  );
}

function WeOnePositioningSection({ role }) {
  if (!role) return null;
  return (
    <InfoSection title="We One Aviation's role">
      <p>{role.positioning}</p>
      <p>{role.relationship}</p>
    </InfoSection>
  );
}

function RegistryPilotTrainingPage({
  location,
  service,
  content,
  pageModel,
  informationalSchema,
}) {
  const page = content.locationPilotTrainingPage;
  return (
    <Layout
      title={pageModel.metadata.title}
      description={pageModel.metadata.description}
      canonical={pageModel.metadata.canonical}
      robots={pageModel.metadata.robots}
      includeDefaultFAQs={false}
      breadcrumbOverride={pageModel.breadcrumbs}
      schemaFaqItems={page.faqs}
    >
      {informationalSchema && <StructuredData data={informationalSchema} />}
      <main
        className="mx-auto max-w-5xl px-4 py-10 md:py-14"
        data-location-template="registry-pilot-training"
        data-renderable={pageModel.renderable}
        data-indexable={pageModel.indexable}
        data-indexability-state={pageModel.state}
        data-evidence-profile={page.evidenceProfile.level}
      >
        <Breadcrumb override={pageModel.breadcrumbs} />
        <header className="rounded-2xl bg-av-blue px-6 py-10 text-white md:px-12">
          <p className="text-sm uppercase tracking-wide text-av-orange">{page.eyebrow}</p>
          <h1 className="mt-3 font-montserrat text-3xl font-black md:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-3xl text-white/85">{page.introduction}</p>
          <Link
            href={content.cta.href}
            className="mt-7 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue"
          >
            {page.ctaLabel}
          </Link>
        </header>

        {page.sections.map((section) => (
          <InfoSection key={section.category} title={section.title}>
            <article data-location-content-category={section.category}>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.category}-${index}`}>{paragraph}</p>
              ))}
              {section.items?.length > 0 && (
                <dl className="grid gap-3 md:grid-cols-2">
                  {section.items.map(({ label, value }) => (
                    <div key={`${section.category}-${label}-${value}`} className="rounded-lg bg-gray-50 p-4">
                      <dt className="font-semibold capitalize text-gray-800">{label}</dt>
                      <dd className="mt-1 text-gray-600">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {section.sourceLinks.map(({ href, label }) => (
                <p key={href}>
                  <a className="font-semibold text-av-blue underline" href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </p>
              ))}
            </article>
          </InfoSection>
        ))}

        {page.masterBlocks.length > 0 && (
          <InfoSection title="Pilot-training reference">
            {page.masterBlocks.map(({ categoryId, heading, excerpt, sourceFile }) => (
              <article key={categoryId} data-location-content-category="GLOBAL_MASTER_CONTENT">
                <h3 className="font-semibold text-av-blue">{heading}</h3>
                <p>{excerpt}</p>
                <p className="text-sm text-gray-500">Source material: {sourceFile}</p>
              </article>
            ))}
          </InfoSection>
        )}

        <InfoSection title="We One Aviation's role">
          <p>{page.relationship}</p>
        </InfoSection>

        <FAQSection
          faqs={page.faqs}
          title={page.faqTitle}
          idPrefix={`${location.slug}-${service.slug}-faq`}
          includeSchema={false}
        />

        <InfoSection title="Related guidance">
          <div className="space-y-2">
            {page.links.map(({ href, context, label }) => (
              <p key={href}>
                {context}{' '}
                <Link href={href} className="font-semibold text-av-blue underline">{label}</Link>.
              </p>
            ))}
          </div>
        </InfoSection>
      </main>
    </Layout>
  );
}

function LocationServicePage({
  location,
  service,
  content,
  pageModel,
  relatedServices,
  relatedLocations,
}) {
  const composedPage = content.composedPage || {};

  const informationalSchema = !pageModel.indexable
    ? generateWebPageSchema({
      url: pageModel.metadata.canonical,
      name: pageModel.metadata.title,
      description: pageModel.metadata.description,
    })
    : null;

  if (location.registryRecordId
    && service.slug === 'pilot-training'
    && content.locationPilotTrainingPage) {
    return (
      <RegistryPilotTrainingPage
        location={location}
        service={service}
        content={content}
        pageModel={pageModel}
        informationalSchema={informationalSchema}
      />
    );
  }

  return (
    <Layout
      title={pageModel.metadata.title}
      description={pageModel.metadata.description}
      canonical={pageModel.metadata.canonical}
      robots={pageModel.metadata.robots}
      includeDefaultFAQs={false}
      breadcrumbOverride={pageModel.breadcrumbs}
      schemaFaqItems={pageModel.faqs}
    >
      {informationalSchema && <StructuredData data={informationalSchema} />}
      <div
        className="mx-auto max-w-5xl px-4 py-10 md:py-14"
        data-location-template={pageModel.template}
        data-renderable={pageModel.renderable}
        data-indexable={pageModel.indexable}
        data-sitemap-eligible={pageModel.sitemapEligible}
        data-indexability-state={pageModel.state}
        data-quality-state={pageModel.qualityState}
      >
        <Breadcrumb override={pageModel.breadcrumbs} />

        <header className="rounded-2xl bg-av-blue px-6 py-10 text-white md:px-12">
          <p className="text-sm uppercase tracking-wide text-av-orange">
            {location.city}{location.state !== location.city ? `, ${location.state}` : ''}, {location.country} · {service.shortName}
          </p>
          <h1 className="mt-3 font-montserrat text-3xl font-black md:text-5xl">
            {pageModel.metadata.h1}
          </h1>
          <p className="mt-5 max-w-3xl text-white/85">
            {composedPage.introduction || content.introduction}
          </p>
          <Link
            href={content.cta.href}
            className="mt-7 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue"
          >
            {content.cta.label}
          </Link>
        </header>

        {pageModel.template === 'local-service' && pageModel.serviceGuidance.length > 0 && (
          <InfoSection title={`The ${service.name} pathway`}>
            <p>
              Confirm current requirements with {pageModel.regulatoryContext.authority} and
              the selected flying training organisation before making training commitments.
            </p>
            {pageModel.serviceGuidance.map((guidance) => <p key={guidance}>{guidance}</p>)}
          </InfoSection>
        )}

        <InfoSection title={`How this applies to students in ${location.city}`}>
          <p>
            {composedPage.localApplication || content.localApplication || content.localContext}
          </p>
        </InfoSection>

        {(pageModel.inheritedFactNotice || pageModel.verifiedFacts.length > 0) && (
          <InfoSection title={`Verified aviation context for ${location.city}`}>
            {pageModel.inheritedFactNotice && <p>{pageModel.inheritedFactNotice}</p>}
            {pageModel.verifiedFacts.map((fact) => (
              <p key={`${fact.sourceLocationSlug}-${fact.source}`}>
                {fact.text} <span className="text-sm text-gray-500">Context from {fact.sourceLocation}.</span>
              </p>
            ))}
          </InfoSection>
        )}

        {pageModel.regulatoryContext && (
          <InfoSection title={`Regulatory context for ${pageModel.regulatoryContext.country}`}>
            <p>
              The aviation regulatory authority recorded for {pageModel.regulatoryContext.country} is{' '}
              {pageModel.regulatoryContext.authority}. Confirm current requirements with that authority.
            </p>
          </InfoSection>
        )}

        <InfoSection title="Training offer and location relationship">
          <p>
            {pageModel.regulatoryContext?.country === 'India'
              ? service.serviceExplanation
              : content.introduction}
          </p>
          <RelationshipNote
            location={location}
            relationship={pageModel.relationship}
            content={content}
          />
        </InfoSection>

        <LocationAviationContent
          location={location}
          data={content.locationAviationContent}
          serviceContent={content.serviceContent}
        />
        <LocationSpecificSections sections={content.locationSpecificSections || []} />
        <MasterContentSection
          masterContent={composedPage.masterContent || content.masterContent}
          composedPage={composedPage}
        />
        <WeOnePositioningSection role={composedPage.weOneAviationRole} />

        <InfoSection title={`Local information for ${location.city}`}>
          {pageModel.relationship === 'physical'
            && (location.physicalAcademy === true || location.physicalPresence?.verified === true) && (
            <address className="not-italic">
              <span className="font-semibold text-av-blue">Documented classroom address:</span>{' '}
              {ACADEMY.streetAddress}, {ACADEMY.addressLocality}, {ACADEMY.addressRegion}{' '}
              {ACADEMY.postalCode}, {ACADEMY.addressCountry}.
            </address>
          )}
          {(location.localSections || []).map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="pt-2 font-semibold text-av-blue">{section.title}</h3>
              <p>{section.body}</p>
              {section.items?.length > 0 && (
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <span className="font-semibold text-gray-800">{item.label}.</span>{' '}
                      {item.detail}
                    </li>
                  ))}
                </ul>
              )}
              {section.closing && <p>{section.closing}</p>}
            </div>
          ))}
          {(location.sourceLinks || []).map((source) => (
            <p key={source.href}>
              Source:{' '}
              <a
                className="font-semibold text-av-blue underline"
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.label}
              </a>
            </p>
          ))}
        </InfoSection>

        <FAQSection
          faqs={pageModel.faqs}
          title={`${service.shortName} questions for ${location.city}`}
          idPrefix={`${location.slug}-${service.slug}-faq`}
          includeSchema={false}
        />

        <InfoSection title={`Relevant services and guides for ${location.city}`}>
          {relatedServices.length > 0 && (
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {relatedServices.map((relatedService) => (
                <li key={relatedService.slug}>
                  <Link
                    href={`/${location.slug}/${relatedService.slug}`}
                    className="font-semibold text-av-blue underline"
                  >
                    {relatedService.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <h3 className="pt-3 font-semibold text-av-blue">Related guides</h3>
          <div className="space-y-2">
            {pageModel.links.map((item) => (
              <p key={item.href}>
                {item.context}{' '}
                <Link href={item.href} className="font-semibold text-av-blue underline">
                  {item.label}
                </Link>
                .
              </p>
            ))}
          </div>
        </InfoSection>

        {relatedLocations.length > 0 && (
          <InfoSection title="Related location information">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {relatedLocations.map((relatedLocation) => (
                <li key={relatedLocation.slug}>
                  <Link
                    href={`/${relatedLocation.slug}/${service.slug}`}
                    className="font-semibold text-av-blue underline"
                  >
                    {service.shortName} information for {relatedLocation.city}
                  </Link>
                </li>
              ))}
            </ul>
          </InfoSection>
        )}

        <section className="mt-8 grid gap-6 rounded-2xl bg-gray-50 p-6 md:grid-cols-2 md:p-8">
          <div className="self-center">
            <h2 className="font-montserrat text-2xl font-bold text-av-blue">
              Ask about current {service.shortName.toLowerCase()} options
            </h2>
            <p className="mt-3 text-gray-600">Confirm current availability and delivery details with the academy.</p>
            <Link
              href={content.cta.href}
              className="mt-5 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-av-blue"
            >
              {content.cta.label}
            </Link>
          </div>
          <LeadForm
            title={content.cta.label}
            compact
            source={`/${location.slug}/${service.slug}`}
          />
        </section>

        <InfoSection title="Contact the academy">
          <address className="not-italic">
            {ACADEMY.name}<br />
            Physical classroom (Dwarka, Delhi): {ACADEMY.streetAddress}, {ACADEMY.addressLocality}, {ACADEMY.addressRegion}{' '}
            {ACADEMY.postalCode}, {ACADEMY.addressCountry}
          </address>
          <p>
            Phone:{' '}
            <a className="font-semibold text-av-blue underline" href={`tel:${ACADEMY.phone}`}>
              {ACADEMY.phoneDisplay}
            </a>
          </p>
          <p>
            Email:{' '}
            <a className="font-semibold text-av-blue underline" href={`mailto:${ACADEMY.email}`}>
              {ACADEMY.email}
            </a>
          </p>
        </InfoSection>
      </div>
    </Layout>
  );
}

export default LocationServicePage;

export function getStaticPaths() {
  return {
    paths: getApprovedLocationServicePairs().map(({ location, service }) => ({
      params: { location: location.slug, service: service.slug },
    })),
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const result = await resolveGeographicServicePage(params);
  return prepareLocationServicePageResult(result, SITE_URL);
}
