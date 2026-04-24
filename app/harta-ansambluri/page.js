import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Harta Ansambluri Rezidențiale București — Neofort IMO',
  description: 'Harta interactivă cu toate ansamblurile rezidențiale Neofort IMO din București.',
}

export default function HartaPage() {
  return (
    <>
      <Header activePath="/harta-ansambluri" />
      <main className="min-h-screen">
        <div className="border-b border-gray-100 py-4 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-900">Harta ansambluri</span>
            </nav>
            <h1 className="text-xl font-medium text-gray-900">Harta Ansambluri Rezidențiale București</h1>
          </div>
        </div>

        {/* LEGENDA */}
        <div className="border-b border-gray-100 px-6 py-2.5 bg-gray-50">
          <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap">
            {[
              { c: '#2d7a3a', l: 'Finalizat' },
              { c: '#1565c0', l: 'În construcție' },
              { c: '#c8922a', l: 'Vândut' },
              { c: '#c0392b', l: 'Promoție' },
              { c: '#888', l: 'Suspendat' },
            ].map(m => (
              <div key={m.l} className="flex items-center gap-1.5 text-xs text-gray-600">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: m.c }} />
                {m.l}
              </div>
            ))}
          </div>
        </div>

        {/* HARTA EMBED */}
        <div className="bg-gray-100 flex items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="text-center">
            <div className="text-lg text-gray-500 mb-2">Google Maps embed</div>
            <div className="text-sm text-gray-400">85 ansambluri cu markere colorate</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
