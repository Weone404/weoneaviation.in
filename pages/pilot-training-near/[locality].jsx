import PILOT_LOCALITIES from '../../data/local-seo/pilot-localities.json';
import LocalitySearchPage from '../../components/LocalitySearchPage';

export default function PilotTrainingNearLocality({ locality }) {
  return <LocalitySearchPage locality={locality} />;
}

export function getStaticPaths() {
  return {
    paths: PILOT_LOCALITIES.map((locality) => ({ params: { locality: locality.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const locality = PILOT_LOCALITIES.find((candidate) => candidate.slug === params.locality);
  if (!locality || !locality.selectedForPilot) return { notFound: true };
  return { props: { locality } };
}
