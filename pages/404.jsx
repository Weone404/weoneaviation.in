import Layout from '../components/Layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout title="404 – Page Not Found | WeOne Aviation">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-av-blue to-av-navy">
        <div className="text-center px-4">
          <div className="text-8xl font-montserrat font-black text-av-orange mb-4">404</div>
          <h1 className="text-3xl font-montserrat font-bold text-white mb-3">Page Not Found</h1>
          <p className="text-white/60 mb-8 text-sm">Looks like this flight path doesn't exist. Let's get you back on course.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-av-orange text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all text-sm">
              ← Go Home
            </Link>
            <Link href="/contact" className="border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-all text-sm">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
