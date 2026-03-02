import Layout from '../components/Layout';
import LeadForm from '../components/LeadForm';
import ScrollReveal from '../components/ScrollReveal';

export function CoursePageTemplate({ meta, hero, overview, facts, highlights, syllabus, career }) {
  return (
    <Layout title={meta.title} description={meta.description}>
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden flex items-center justify-center pt-16"
        style={{ backgroundImage: `url(${hero.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 text-center px-4">
          <div className="section-tag mb-3">{hero.tag}</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">{hero.title}</h1>
          <p className="text-white/70 mt-3 max-w-lg mx-auto text-sm">{hero.sub}</p>
        </div>
      </div>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="section-tag">{hero.tag}</div>
              <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-av-blue mb-4 underline-orange">{hero.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">{overview}</p>

              {/* Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {facts.map(([val, label]) => (
                  <div key={label} className="bg-av-light rounded-xl p-4 text-center">
                    <div className="font-montserrat font-bold text-av-blue text-sm">{val}</div>
                    <div className="text-gray-500 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <h3 className="font-montserrat text-lg font-bold text-av-blue mb-4">Program Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {highlights.map(h => (
                  <div key={h} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-av-orange mt-0.5 flex-shrink-0">✓</span> {h}
                  </div>
                ))}
              </div>

              {/* Syllabus */}
              {syllabus && (
                <>
                  <h3 className="font-montserrat text-lg font-bold text-av-blue mb-4">Syllabus</h3>
                  <div className="space-y-2">
                    {syllabus.map((item, i) => (
                      <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm text-gray-700">
                        <span className="w-6 h-6 bg-av-orange text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ScrollReveal delay={200}><LeadForm title="Apply Now" /></ScrollReveal>

            {career && (
              <ScrollReveal delay={300}>
                <div className="bg-av-blue rounded-2xl p-6 text-white">
                  <h4 className="font-montserrat font-bold mb-3">Career Prospects</h4>
                  <p className="text-white/70 text-sm mb-2">{career.text}</p>
                  <div className="text-av-orange font-montserrat font-bold text-xl">{career.salary}</div>
                  <div className="text-white/50 text-xs">{career.salaryLabel}</div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
