import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI_ACTIVE, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

const ZONE_CONFIG = {
  'titan-pallady': {
    nume: 'Titan-Pallady',
    titlulSeo: 'Ansambluri Rezidențiale Titan-Pallady',
    sector: 'Sector 3',
    descriere: 'Zona Titan-Pallady din Sectorul 3 al Bucureștiului este una dintre cele mai dinamice zone rezidențiale, cu acces direct la metroul Nicolae Teclu, parcuri, școli și centre comerciale.',
  },
  'piata-muncii': {
    nume: 'Piața Muncii',
    titlulSeo: 'Ansambluri Rezidențiale Piața Muncii',
    sector: 'Sector 2',
    descriere: 'Zona Piața Muncii, Sector 2, oferă acces rapid la metrou, Parcul Lia Manoliu și centrul capitalei.',
  },
  'militari': {
    nume: 'Militari',
    titlulSeo: 'Ansambluri Rezidențiale Militari',
    sector: 'Sector 6',
    descriere: 'Zona Militari din Sectorul 6, cu acces la metrou Gorjului și Pacii, centre comerciale și școli.',
  },
  'herastrau-aviatiei': {
    nume: 'Herăstrău-Aviației',
    titlulSeo: 'Ansambluri Rezidențiale Herăstrău-Aviației',
    sector: 'Sector 1',
    descriere: 'Zona Herăstrău-Aviației, una dintre cele mai exclusiviste din București, cu Parcul Herăstrău și acces la toate facilitățile premium.',
  },
  'colentina-fundeni': {
    nume: 'Colentina-Fundeni',
    titlulSeo: 'Ansambluri Rezidențiale Colentina',
    sector: 'Sector 2',
    descriere: 'Zona Colentina-Fundeni din Sectorul 2, cu acces la Lacul Tei și infrastructură în continuă dezvoltare.',
  },
  'unirii-dristor': {
    nume: 'Unirii-Dristor',
    titlulSeo: 'Ansambluri Rezidențiale Unirii-Dristor',
    sector: 'Sector 3',
    descriere: 'Zona Unirii-Dristor, semicentrală, cu acces excelent la metrou și centrul Bucureștiului.',
  },
}

export function generateStaticParams() {
  return Object.keys(ZONE_CONFIG).map(slug => ({ slug }))
}

export function generateMetadata({ params }) {
  const z = ZONE_CONFIG[params.slug]
  if (!z) return {}
  return {
    title: `${z.titlulSeo} București | Neofort IMO`,
    description: `${z.titlulSeo} în ${z.sector}, București. Apartamente noi direct de la dezvoltator Neofort IMO.`,
  }
}

export default function ZonaPage({ params }) {
  const z = ZONE_CONFIG[params.slug]
  if (!z) notFound()

  const ansambluri = ANSAMBLURI_ACTIVE.filter(a =>
    a.zona.toLowerCase().includes(z.nume.toLowerCase().split('-')[0]) ||
    a.sector === z.sector
  ).slice(0, 6)

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
              <span className="text-gray-900">{z.titlulSeo}</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">{z.titlulSeo}</h1>
            <p className="text-sm text-gray-500 mt-1">{z.sector} · București</p>
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
