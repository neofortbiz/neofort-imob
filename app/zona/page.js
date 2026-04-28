import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ANSAMBLURI_ACTIVE, formatPret } from '@/data/ansambluri'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Zone Rezidențiale București — Apartamente Noi | Neofort IMO',
  description: 'Ansambluri rezidențiale Neofort IMO în toate zonele Bucureștiului. Titan-Pallady, Militari, Piața Muncii, Moșilor-Eminescu și altele. Apartamente noi direct de la sursă.',
  alternates: { canonical: `${BASE}/zona` },
}

// Generam zonele cu date reale
function getZone() {
  const map = {}
  ANSAMBLURI_ACTIVE.forEach(a => {
    (a.zone || []).filter(z => !z.startsWith('sector-')).forEach(z => {
      if (!map[z]) {
        map[z] = { slug: z, nume: a.zona, sector: a.sector, ansambluri: [] }
      }
      if (!map[z].ansambluri.find(x => x.slug === a.slug)) {
        map[z].ansambluri.push(a)
      }
    })
  })
  return Object.values(map).sort((a, b) => b.ansambluri.length - a.ansambluri.length)
}

export default function ZonePage() {
  const zone = getZone()

  return (
    <>
      <Header activePath="/zona" />
      <main>
        <section className="py-10 px-6 border-b border-gray-100">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-3">
              <Link href="/" className="hover:text-gray-600">Acasă</Link>
              <span>›</span>
              <span className="text-gray-700">Zone</span>
            </nav>
            <h1 className="text-xl font-medium text-gray-900 mb-2">Zone Rezidențiale București</h1>
            <p className="text-sm text-gray-500">Ansambluri Neofort IMO disponibile pe zone geografice.</p>
          </div>
        </section>

        <section className="py-10 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {zone.map(z => (
              <Link key={z.slug} href={`/zona/${z.slug}`}
                className="group bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all hover:border-green-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                      {z.nume}
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">{z.sector}</p>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">
                    {z.ansambluri.length} {z.ansambluri.length === 1 ? 'ansamblu' : 'ansambluri'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {z.ansambluri.slice(0, 3).map(a => (
                    <div key={a.slug} className="text-xs text-gray-500 flex items-center justify-between">
                      <span>{a.nume}</span>
                      <span className="text-gray-400">de la {formatPret(a.pretDeLa)}€</span>
                    </div>
                  ))}
                  {z.ansambluri.length > 3 && (
                    <p className="text-xs text-gray-400">+{z.ansambluri.length - 3} mai multe</p>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 text-xs font-medium" style={{ color: '#2d7a3a' }}>
                  Vezi zona →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
