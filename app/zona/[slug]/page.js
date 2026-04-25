import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI, ANSAMBLURI_ACTIVE, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

// Generare dinamica a configuratiei zonelor din date
const SECTOR_NAMES = {
  'sector-1': { nume: 'Sector 1', sector: 'Sector 1', descriere: 'Ansambluri rezidențiale noi în Sectorul 1 București.' },
  'sector-2': { nume: 'Sector 2', sector: 'Sector 2', descriere: 'Ansambluri rezidențiale noi în Sectorul 2 București.' },
  'sector-3': { nume: 'Sector 3', sector: 'Sector 3', descriere: 'Ansambluri rezidențiale noi în Sectorul 3 București.' },
  'sector-4': { nume: 'Sector 4', sector: 'Sector 4', descriere: 'Ansambluri rezidențiale noi în Sectorul 4 București.' },
  'sector-5': { nume: 'Sector 5', sector: 'Sector 5', descriere: 'Ansambluri rezidențiale noi în Sectorul 5 București.' },
  'sector-6': { nume: 'Sector 6', sector: 'Sector 6', descriere: 'Ansambluri rezidențiale noi în Sectorul 6 București.' },
}

function getZoneConfig() {
  const config = {}
  ANSAMBLURI.forEach(a => {
    const zoneList = a.zone || []
    zoneList.forEach(z => {
      if (!config[z]) {
        if (SECTOR_NAMES[z]) {
          config[z] = SECTOR_NAMES[z]
        } else {
          config[z] = {
            nume: a.zona,
            sector: a.sector,
            descriere: `Ansambluri rezidențiale în zona ${a.zona}, ${a.sector}, București.`,
          }
        }
      }
    })
  })
  return config
}

export function generateStaticParams() {
  const config = getZoneConfig()
  return Object.keys(config).map(slug => ({ slug }))
}

export function generateMetadata({ params }) {
  const config = getZoneConfig()
  const z = config[params.slug]
  if (!z) return {}
  return {
    title: `Ansambluri Rezidențiale ${z.nume} | Neofort IMO`,
    description: `Ansambluri rezidențiale în zona ${z.nume}, ${z.sector}, București. Apartamente noi direct de la dezvoltator Neofort IMO.`,
  }
}

export default function ZonaPage({ params }) {
  const config = getZoneConfig()
  const z = config[params.slug]
  if (!z) notFound()

  // Filtrare exacta dupa campul zone[]
  const ansambluri = ANSAMBLURI_ACTIVE.filter(a =>
    a.zone && a.zone.includes(params.slug)
  )

  return (
    <>
      <Header activePath="/zona" />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <Link href="/ansambluri-rezidentiale" className="hover:text-[#2d7a3a]">Ansambluri</Link>
              <span>›</span>
              <span className="text-gray-900">Ansambluri rezidențiale {z.nume}</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">Ansambluri Rezidențiale {z.nume}</h1>
            <p className="text-sm text-gray-500 mt-1">{z.sector} · București · {ansambluri.length} ansambluri active</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-2xl">{z.descriere}</p>

          {ansambluri.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ansambluri.map(a => {
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
                      <div className="text-sm font-medium text-gray-900 mb-1">{a.nume}</div>
                      <div className="text-sm font-medium" style={{ color: '#2d7a3a' }}>de la {formatPret(a.pretDeLa)} <span className="text-[9px] text-gray-400 font-normal">+TVA</span></div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Nu există ansambluri active în această zonă momentan.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
