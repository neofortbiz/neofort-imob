import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Echipa Neofort IMO — Brokeri Imobiliari București',
  description: 'Cunoaște echipa de brokeri Neofort IMO, specializați în ansambluri rezidențiale noi în București.',
}

export default function EchipaPage() {
  return (
    <>
      <Header activePath="/echipa" />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-900">Echipă</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">Echipa Neofort IMO</h1>
            <p className="text-sm text-gray-500 mt-1">Brokeri specializați în ansambluri rezidențiale noi</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-sm text-gray-500">Pagina echipei — în curând.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
