import Head from 'next/head';
import Layout from '../components/Layout';
import FAQs from '../components/FAQs';

export default function FaqsPage() {
  return (
    <>
      <Head>
        <title>FAQs | We One Aviation Academy</title>
        <meta
          name="description"
          content="Frequently Asked Questions about pilot training, DGCA exams, CPL eligibility, scholarships, and becoming a commercial pilot with We One Aviation Academy."
        />
      </Head>

      <Layout
        title="FAQs | We One Aviation Academy"
        description="Frequently Asked Questions about pilot training, DGCA exams, CPL eligibility, scholarships, and becoming a commercial pilot with We One Aviation Academy."
      >
        <FAQs />
      </Layout>
    </>
  );
}
