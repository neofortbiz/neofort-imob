import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI_ACTIVE, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

export const metadata = {
  title: 'Ansambluri Rezidențiale la Vânzare — București',
  description: 'Toate ansamblurile rezidențiale Neofort IMO disponibile la vânzare în București. Apartamente noi direct de la dezvoltator.',
}

export default function ListingPage() {
  return (
    <>
      <Header activePath="/ansambluri-rezidentiale" />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-900">Ansambluri rezidențiale</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">Ansambluri Rezidențiale la Vânzare</h1>
            <p className="text-sm text-gray-500 mt-1">{ANSAMBLURI_ACTIVE.length} ansambluri disponibile în București</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ANSAMBLURI_ACTIVE.map(a => {
              const sc = STATUS_CONFIG[a.status]
              return (
                <Link
                  key={a.slug}
                  href={`/ansamblu-rezidential/${a.slug}`}
                  className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:border-gray-200 hover:shadow-sm transition-all group"
                >
                  <div className="aspect-square bg-gray-100 relative flex items-center justify-center">
                    <span className="text-xs text-gray-400">Foto ansamblu</span>
                    <div className={`absolute top-2 left-2 text-[9px] font-medium px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>
                      {sc.label}
                    </div>
                    <div className="absolute top-2 right-2 w-5 h-5 rounded bg-white bg-opacity-90 flex items-center justify-center text-[11px] text-gray-400">♡</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">{a.zona} · {a.sector}</div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{a.nume}</div>
                    <div className="text-sm font-medium" style={{ color: '#2d7a3a' }}>
                      de la {formatPret(a.pretDeLa)} <span className="text-[9px] text-gray-400 font-normal">+TVA</span>
                    </div>
                    <div className="text-[9px] text-gray-400 mt-1">{a.tipuri.join(', ')} · {a.dataPredare}</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
