import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FormularCalificat from '@/components/FormularCalificat'

export const metadata = {
  title: 'Contact — Neofort IMO',
  description: 'Contactează echipa Neofort IMO pentru oferte personalizate la ansambluri rezidențiale în București.',
}

export default function ContactPage() {
  return (
    <>
      <Header activePath="/contact" />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-900">Contact</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">Contact</h1>
          </div>
        </div>
        <section style={{ background: '#081c12' }} className="py-12 px-6">
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl font-medium text-white mb-2">
              Solicită o ofertă <span style={{ color: '#e8b44e' }}>personalizată</span>
            </h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Completează formularul și un broker Neofort IMO te contactează în cel mult 2 ore.
            </p>
            <FormularCalificat />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
