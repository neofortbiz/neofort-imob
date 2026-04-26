import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import PortofoliuClient from './PortofoliuClient'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  title: 'Portofoliu Ansambluri Vândute — Neofort IMO | 85+ Proiecte Livrate',
  description: 'Portofoliul complet al ansamblurilor rezidențiale Neofort IMO finalizate și vândute în București. 85+ proiecte livrate din 2009 în toate sectoarele capitalei.',
  alternates: { canonical: `${BASE}/portofoliu` },
  openGraph: {
    title: 'Portofoliu Neofort IMO — 85+ Ansambluri Livrate',
    description: 'Ansambluri rezidențiale finalizate și vândute în București. 17 ani experiență, 4.000+ familii.',
    url: `${BASE}/portofoliu`,
  },
}

export default function PortofoliuPage() {
  return (
    <>
      <Header activePath="/portofoliu" />
      <main className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-100 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-3">
              <Link href="/" className="hover:text-gray-600">Acasă</Link>
              <span>›</span>
              <span className="text-gray-700">Portofoliu</span>
            </nav>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-xl font-medium text-gray-900">Portofoliu Neofort IMO</h1>
                <p className="text-sm text-gray-500 mt-1">Ansambluri finalizate și vândute din 2009</p>
              </div>
              <div className="hidden md:flex gap-8">
                {[
                  { val: '85+', lbl: 'Ansambluri livrate' },
                  { val: '17 ani', lbl: 'Experiență' },
                  { val: '4.000+', lbl: 'Familii' },
                ].map(s => (
                  <div key={s.lbl} className="text-center">
                    <div className="text-base font-semibold" style={{ color: '#2d7a3a' }}>{s.val}</div>
                    <div className="text-[10px] text-gray-400">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <PortofoliuClient />
      </main>
      <Footer />
    </>
  )
}
