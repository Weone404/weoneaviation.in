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
        {/*
          This page rendered <FAQs /> and nothing else. That component's heading
          is an <h2> because it is also embedded mid-page elsewhere (the
          homepage uses it), so /faqs shipped with no <h1> at all — a page with
          no top-level heading gives an answer engine nothing to identify it by.
          The <h1> belongs here, on the page, rather than by promoting the
          shared component's <h2> and breaking the outline everywhere else.
        */}
        <div className="bg-gradient-to-br from-av-blue to-av-navy py-16 px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="font-montserrat text-3xl md:text-5xl font-black mb-4">
              Pilot Training <span className="text-av-orange">FAQs</span>
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
              Straight answers on DGCA exams, CPL eligibility, medicals, course fees and
              how to start training as a pilot in India.
            </p>
          </div>
        </div>

        <FAQs />
      </Layout>
    </>
  );
}
