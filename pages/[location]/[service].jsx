import Link from 'next/link';
import Breadcrumb from '../../components/Breadcrumb';
import FAQSection from '../../components/FAQSection';
import LeadForm from '../../components/LeadForm';
import Layout from '../../components/Layout';
import { ACADEMY } from '../../lib/facts';
import {
  formatLocationServiceTemplate,
  getIndexableLocationServicePairs,
  getLocationBySlug,
  getLocationServiceContent,
  getRelatedLocations,
  getRelatedServices,
  getServiceBySlug,
  isLocationServiceIndexable,
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

function RelationshipNote({ location }) {
  if (location.relationship === 'physical') {
    return (
      <p>
        The academy’s documented physical teaching location is {ACADEMY.streetAddress},{' '}
        {ACADEMY.addressLocality}, {ACADEMY.addressRegion} {ACADEMY.postalCode}. It is a
        ground-classroom, not a flying school.
      </p>
    );
  }

  if (location.relationship === 'online') {
    return <p>This page describes online access only; it does not imply a local office, classroom or flying school.</p>;
  }

  if (location.relationship === 'service-area') {
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

function LocationServicePage({ location, service, content }) {
  const title = content.seoTitle
    || formatLocationServiceTemplate(service.titleTemplate, location);
  const description = content.seoDescription
    || formatLocationServiceTemplate(service.descriptionTemplate, location);
  const canonical = `${SITE_URL}/${location.slug}/${service.slug}`;
  const breadcrumbOverride = [
    { href: location.authorityPath, label: location.authorityLabel || location.city },
    {
      href: `/${location.slug}/${service.slug}`,
      label: content.breadcrumbLabel || service.shortName,
    },
  ];

  const faqs = [...content.faqs, ...location.localFAQs]
    .filter((faq, index, allFaqs) => allFaqs.findIndex((item) => item.question === faq.question) === index);

  const relatedServices = getRelatedServices(service)
    .filter((relatedService) => isLocationServiceIndexable(location, relatedService));

  const relatedLocations = getRelatedLocations(location)
    .filter((relatedLocation) => isLocationServiceIndexable(relatedLocation, service));

  return (
    <Layout
      title={title}
      description={description}
      canonical={canonical}
      includeDefaultFAQs={false}
      breadcrumbOverride={breadcrumbOverride}
      schemaFaqItems={faqs}
    >
      <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <Breadcrumb override={breadcrumbOverride} />

        <header className="rounded-2xl bg-av-blue px-6 py-10 text-white md:px-12">
          <p className="text-sm uppercase tracking-wide text-av-orange">
            {location.city}{location.state !== location.city ? `, ${location.state}` : ''}, {location.country} · {service.shortName}
          </p>
          <h1 className="mt-3 font-montserrat text-3xl font-black md:text-5xl">
            {content.h1 || formatLocationServiceTemplate(service.h1Template, location)}
          </h1>
          <p className="mt-5 max-w-3xl text-white/85">{content.introduction}</p>
          <Link
            href={content.cta.href}
            className="mt-7 inline-flex rounded-full bg-av-orange px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-av-blue"
          >
            {content.cta.label}
          </Link>
        </header>

        {location.relationship === 'physical' && (
          <InfoSection title={`The ${service.name} pathway`}>
            <p>{service.serviceExplanation}</p>
            <p>{service.dgcaPathway}</p>
            <p>{service.eligibility}</p>
            <p>
              Confirm current requirements with DGCA and the selected flying training
              organisation before making training commitments.
            </p>
            {service.flightTrainingApplicable && <p>{service.flightTrainingPathway}</p>}
          </InfoSection>
        )}

        <InfoSection title={`How this applies to students in ${location.city}`}>
          <p>{content.localApplication || content.localContext}</p>
        </InfoSection>

        <InfoSection title="Training offer and location relationship">
          <p>{service.serviceExplanation}</p>
          <RelationshipNote location={location} />
        </InfoSection>

        <InfoSection title={`Local information for ${location.city}`}>
          {location.relationship === 'physical' && (
            <address className="not-italic">
              <span className="font-semibold text-av-blue">Documented classroom address:</span>{' '}
              {ACADEMY.streetAddress}, {ACADEMY.addressLocality}, {ACADEMY.addressRegion}{' '}
              {ACADEMY.postalCode}, {ACADEMY.addressCountry}.
            </address>
          )}
          {location.localSections.map((section) => (
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
          {location.sourceLinks?.map((source) => (
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
          faqs={faqs}
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
            {content.internalLinks.map((item) => (
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
    paths: getIndexableLocationServicePairs().map(({ location, service }) => ({
      params: { location: location.slug, service: service.slug },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const location = getLocationBySlug(params.location);
  const service = getServiceBySlug(params.service);

  if (!isLocationServiceIndexable(location, service)) {
    return { notFound: true };
  }

  const content = getLocationServiceContent(location, service);

  return {
    props: {
      location,
      service,
      content,
    },
  };
}
