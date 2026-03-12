import Layout from '../components/Layout';
import ScrollReveal from '../components/ScrollReveal';
import Link from 'next/link';

const blogs = [
  { id: 1, title: 'How to Become a Commercial Pilot in India – Complete 2024 Guide', excerpt: 'Everything you need to know about becoming a CPL holder in India – eligibility, DGCA exams, costs, flying hours, and career prospects.', category: 'CPL Guide', readTime: '8 min', date: 'Dec 15, 2024', img: '/how to Become a Commercial pilot in India.jpeg' },
  { id: 2, title: 'DGCA Written Exams: Subjects, Pattern & Preparation Tips', excerpt: 'Ace all 9 DGCA written exams with our expert preparation strategy. Know the syllabus, exam pattern, and recommended study materials.', category: 'DGCA', readTime: '6 min', date: 'Dec 10, 2024', img: '/Dgca written exam subject pattern and preparation tips.jpeg' },
  { id: 3, title: 'CPL Training in India vs Abroad – Which is Better?', excerpt: 'Pros and cons of training in India vs USA, Canada, Australia. Cost comparison, timelines, and license conversion process explained.', category: 'Training', readTime: '7 min', date: 'Dec 5, 2024', img: '/Cpl training in india vs abroad which is better.jpeg' },
  { id: 4, title: 'Pilot Salary in India 2024 – Complete Breakdown by Airline', excerpt: 'How much do pilots earn in India? Salary breakdown for trainee pilots, first officers, and captains at IndiGo, Air India, SpiceJet.', category: 'Career', readTime: '5 min', date: 'Nov 28, 2024', img: '/download.jpeg' },
  { id: 5, title: 'Medical Requirements to Become a Pilot in India – DGCA Class 1', excerpt: 'Detailed guide on DGCA Class 1 medical requirements, what conditions are disqualifying, and how to prepare for the medical exam.', category: 'Medical', readTime: '6 min', date: 'Nov 20, 2024', img: '/download.jpeg' },
  { id: 6, title: 'How to Become a Pilot After 12th Science – Step-by-Step', excerpt: 'A complete roadmap for 12th PCM students aspiring to become commercial pilots. Colleges, entrance exams, fees, and timelines.', category: 'After 12th', readTime: '9 min', date: 'Nov 15, 2024', img: '/download.jpeg' },
];

export default function Blogs() {
  return (
    <Layout title="Aviation Blog | Pilot Training Tips & Career Guidance – WeOne Aviation" description="Read expert aviation articles on pilot training, DGCA exams, CPL/PPL costs, and career guidance. Stay updated with the latest aviation news.">
      {/* Hero */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-av-blue to-av-navy flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="section-tag mb-3">Knowledge Hub</div>
          <h1 className="font-montserrat text-3xl md:text-5xl font-black text-white">Aviation <span className="text-av-orange">Blog</span></h1>
          <p className="text-white/70 mt-3 text-sm">Expert insights on pilot training, careers & aviation</p>
        </div>
      </div>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured */}
          <ScrollReveal>
            <Link href={`/blogs/${blogs[0].id}`} className="block mb-12">
              <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl card-hover">
                <img src={blogs[0].img} alt={blogs[0].title} className="w-full h-64 md:h-72 object-cover" />
                <div className="bg-white p-8 flex flex-col justify-center">
                  <span className="bg-av-orange/10 text-av-orange text-xs font-bold px-3 py-1 rounded-full inline-block w-fit mb-3">⭐ Featured • {blogs[0].category}</span>
                  <h2 className="font-montserrat text-xl font-bold text-av-blue mb-3 hover:text-av-orange transition-all">{blogs[0].title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{blogs[0].excerpt}</p>
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <span>📅 {blogs[0].date}</span>
                    <span>⏱ {blogs[0].readTime} read</span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(1).map((blog, i) => (
              <ScrollReveal key={blog.id} delay={i * 100}>
                <Link href={`/blogs/${blog.id}`} className="card-hover block bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                  <img src={blog.img} alt={blog.title} className="w-full h-44 object-cover" />
                  <div className="p-5">
                    <span className="bg-av-blue/5 text-av-blue text-xs font-semibold px-2.5 py-1 rounded-full">{blog.category}</span>
                    <h3 className="font-montserrat font-bold text-av-blue mt-3 mb-2 text-sm leading-snug hover:text-av-orange transition-all">{blog.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-gray-400 text-xs">
                      <span>📅 {blog.date}</span>
                      <span>⏱ {blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
