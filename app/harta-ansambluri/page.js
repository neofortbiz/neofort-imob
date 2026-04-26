import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ANSAMBLURI_ACTIVE, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  title: 'Harta Ansambluri Rezidențiale București — Neofort IMO',
  description: 'Harta interactivă cu toate cele 12 ansambluri rezidențiale Neofort IMO din București. Localizare exactă, prețuri și detalii per ansamblu în Sectoarele 2, 3 și 6.',
  alternates: { canonical: `${BASE}/harta-ansambluri` },
}

// Centrul hartii - centrul geografic al celor 12 ansambluri
const MAP_CENTER_LAT = 44.432
const MAP_CENTER_LNG = 26.09

// Construim URL Google Maps cu markere pentru toate ansamblurile
function buildMapsUrl() {
  // Folosim primul ansamblu ca centru si adaugam query pentru restul
  const center = `${MAP_CENTER_LAT},${MAP_CENTER_LNG}`
  return `https://maps.google.com/maps?q=${center}&z=12&output=embed`
}

export default function HartaPage() {
  const mapsUrl = buildMapsUrl()

  return (
    <>
      <Header activePath="/harta-ansambluri" />
      <main className="min-h-screen">

        {/* HEADER */}
        <div className="border-b border-gray-100 py-4 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-900">Harta ansambluri</span>
            </nav>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-xl font-medium text-gray-900">Harta Ansambluri Rezidențiale București</h1>
                <p className="text-sm text-gray-500 mt-0.5">{ANSAMBLURI_ACTIVE.length} ansambluri active în Sectoarele 2, 3 și 6</p>
              </div>
            </div>
          </div>
        </div>

        {/* LEGENDA */}
        <div className="border-b border-gray-100 px-6 py-2.5 bg-gray-50">
          <div className="max-w-7xl mx-auto flex items-center gap-5 flex-wrap">
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-gray-600">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cfg.dot || '#888' }} />
                {cfg.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row" style={{ height: 'calc(100vh - 180px)' }}>

          {/* LISTA ANSAMBLURI — sidebar stanga */}
          <div className="md:w-80 flex-shrink-0 overflow-y-auto border-r border-gray-100 bg-white">
            {ANSAMBLURI_ACTIVE.map(a => {
              const sc = STATUS_CONFIG[a.status]
              const metrou = a.puncteInteres?.find(p => p.tip === 'metrou')
              return (
                <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                  className="block px-4 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sc.dot || '#888' }} />
                        <span className="text-[10px] font-medium" style={{ color: sc.dot || '#888' }}>{sc.label}</span>
                      </div>
                      <h3 className="text-xs font-medium text-gray-900 group-hover:text-green-700 transition-colors leading-snug">
                        {a.nume}
                      </h3>
                      <p className="text-[10px] text-gray-400 mt-0.5">{a.zona} · {a.sector}</p>
                      {metrou && (
                        <p className="text-[9px] text-blue-600 mt-0.5">🚇 {metrou.nome || metrou.nume} — {metrou.distanta}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(a.pretDeLa)}€</div>
                      <div className="text-[9px] text-gray-400">+ TVA</div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* HARTA GOOGLE MAPS */}
          <div className="flex-1 relative">
            <iframe
              src={mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Harta ansambluri rezidențiale Neofort IMO București"
            />
            {/* Overlay cu linkuri rapide per ansamblu */}
            <div className="absolute top-3 right-3 bg-white rounded-xl shadow-md p-3 max-w-[200px] hidden md:block">
              <p className="text-xs font-medium text-gray-700 mb-2">Localizări rapide</p>
              <div className="space-y-1">
                {ANSAMBLURI_ACTIVE.map(a => (
                  <a key={a.slug}
                    href={`https://maps.google.com/maps?q=${a.coordonate.lat},${a.coordonate.lng}&z=16`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[9px] text-blue-600 hover:text-blue-800 truncate">
                    📍 {a.nume}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* LISTA COMPLETA SUB HARTA — SEO */}
        <section className="px-6 py-10 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-base font-medium text-gray-900 mb-6">
              Toate ansamblurile rezidențiale Neofort IMO din București
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ANSAMBLURI_ACTIVE.map(a => {
                const sc = STATUS_CONFIG[a.status]
                return (
                  <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                    className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: sc.dot || '#888' }} />
                      <span className="text-[10px] font-medium" style={{ color: sc.dot || '#888' }}>{sc.label}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                      {a.nume}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">{a.zona} · {a.sector}</p>
                    <p className="text-xs text-gray-400 mb-2">{a.etaje}</p>
                    <div className="text-sm font-semibold" style={{ color: '#2d7a3a' }}>
                      De la {formatPret(a.pretDeLa)}€ <span className="text-xs font-normal text-gray-400">+ TVA</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">
                      📍 {a.coordonate.lat.toFixed(4)}, {a.coordonate.lng.toFixed(4)}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
