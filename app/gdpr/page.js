import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Politica de Confidențialitate GDPR — Neofort IMO',
}

export default function GdprPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
            <span>›</span>
            <span className="text-gray-900">Politica GDPR</span>
          </nav>
          <h1 className="text-2xl font-medium text-gray-900 mb-6">Politica de Confidențialitate</h1>
          <p className="text-sm text-gray-600 leading-relaxed">Politica de confidențialitate — în curând.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
