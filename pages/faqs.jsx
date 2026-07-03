import Head from 'next/head';
import Layout from '../components/Layout';

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
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="section-tag">FAQ</div>
            <h1 className="font-montserrat text-4xl font-bold text-av-blue mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Find answers to the most common questions about pilot training, eligibility, exams, scholarships, and career paths at We One Aviation Academy.
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
}
