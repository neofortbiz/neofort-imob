import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

export const metadata = {
  title: 'Portofoliu Ansambluri Vândute — Neofort IMO',
  description: 'Portofoliul complet al ansamblurilor rezidențiale Neofort IMO finalizate și vândute în București.',
}

export default function PortofoliuPage() {
  const toate = ANSAMBLURI
  return (
    <>
      <Header activePath="/portofoliu" />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-900">Portofoliu</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">Portofoliu Neofort IMO</h1>
            <p className="text-sm text-gray-500 mt-1">{toate.length}+ ansambluri rezidențiale livrate în București din 2009</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {toate.map(a => {
              const sc = STATUS_CONFIG[a.status]
              return (
                <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                  className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-all">
                  <div className="aspect-square bg-gray-100 relative flex items-center justify-center">
                    <span className="text-xs text-gray-400">Foto</span>
                    <div className={`absolute top-2 left-2 text-[9px] font-medium px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>{sc.label}</div>
                  </div>
                  <div className="p-3">
                    <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-0.5">{a.zona} · {a.sector}</div>
                    <div className="text-sm font-medium text-gray-900">{a.nume}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{a.tipuri.join(', ')}</div>
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
