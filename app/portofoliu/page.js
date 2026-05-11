import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import PortofoliuClient from './PortofoliuClient'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Portofoliu Ansambluri Vândute — Neofort IMO | 85+ Proiecte Livrate',
  description: 'Portofoliul complet al ansamblurilor rezidențiale Neofort IMO finalizate și vândute în București. 85+ proiecte livrate din 2009 în toate sectoarele capitalei.',
  alternates: { canonical: `${BASE}/portofoliu` },
  openGraph: {
    title: 'Portofoliu Neofort IMO — 85+ Ansambluri Livrate',
    description: 'Ansambluri rezidențiale finalizate și vândute în București. 17 ani experiență, 4.000+ familii.',
    url: `${BASE}/portofoliu`,
    images: [{ url: 'https://www.neofort.ro/og-portofoliu.jpg', width: 1200, height: 630, alt: 'Portofoliu Neofort IMO — 33 Proiecte Livrate' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.neofort.ro/og-portofoliu.jpg'],
  },
}

function getPortofoliuSchema(BASE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Portofoliu Ansambluri Finalizate Neofort IMO',
    description: '85+ ansambluri rezidențiale livrate în București din 2009',
    url: `${BASE}/portofoliu`,
    numberOfItems: TOATE_PORTOFOLIU.length,
    itemListElement: TOATE_PORTOFOLIU.slice(0, 50).map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.nume,
      url: `${BASE}/portofoliu/${a.slug}`,
    })),
  }
}

export default function PortofoliuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getPortofoliuSchema('https://www.neofort.ro')) }} />
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
