import { notFound } from 'next/navigation'

const BASE = 'https://www.neofort.ro'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI_ACTIVE, STATUS_CONFIG, formatPret } from '@/data/ansambluri'
import { zonaLabel } from '@/lib/zoneLabel'
import { peScurtZona, tabelZona, geoZona, imagineZona } from '@/lib/zonaDerivat'
import { zonaEditorial } from '@/data/zone'
import { parseLinks } from '@/lib/parseLinks'

// Generare dinamica a configuratiei zonelor din date
const SECTOR_NAMES = {
  'sector-1': { nume: 'Sector 1', sector: 'Sector 1', descriere: 'Ansambluri rezidențiale noi în Sectorul 1 București.' },
  'sector-2': { nume: 'Sector 2', sector: 'Sector 2', descriere: 'Ansambluri rezidențiale noi în Sectorul 2 București.' },
  'sector-3': { nume: 'Sector 3', sector: 'Sector 3', descriere: 'Ansambluri rezidențiale noi în Sectorul 3 București.' },
  'sector-4': { nume: 'Sector 4', sector: 'Sector 4', descriere: 'Ansambluri rezidențiale noi în Sectorul 4 București.' },
  'sector-5': { nume: 'Sector 5', sector: 'Sector 5', descriere: 'Ansambluri rezidențiale noi în Sectorul 5 București.' },
  'sector-6': { nume: 'Sector 6', sector: 'Sector 6', descriere: 'Ansambluri rezidențiale noi în Sectorul 6 București.' },
}

// slug din numele zonei (ex. 'Eminescu-Viitorului' -> 'eminescu-viitorului')
function slugZona(zona) {
  return zona.toLowerCase().replace(/\s+/g, '-')
}

function getZoneConfig() {
  const config = {}
  const exact = {}
  ANSAMBLURI_ACTIVE.forEach(a => {
    const zoneList = a.zone || []
    zoneList.forEach(z => {
      if (SECTOR_NAMES[z]) {
        if (!config[z]) config[z] = SECTOR_NAMES[z]
      } else {
        // Prefera ansamblul al carui nume de zona se potriveste EXACT cu slug-ul,
        // ca /zona/eminescu-viitorului sa nu preia numele altui ansamblu cross-listat.
        const isExact = slugZona(a.zona) === z
        if (!config[z] || (isExact && !exact[z])) {
          config[z] = {
            nume: zonaLabel(z, a.zona),
            sector: a.sector,
            descriere: `Ansambluri rezidențiale în zona ${zonaLabel(z, a.zona)}, ${a.sector}, București.`,
          }
          if (isExact) exact[z] = true
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
  const ansambluri = ANSAMBLURI_ACTIVE.filter(a => a.zone && a.zone.includes(params.slug))
  const url = `${BASE}/zona/${params.slug}`
  // Sectoarele au nume === sector (ex. 'Sector 3') -> evitam dublura 'Sector 3, Sector 3'
  const isSector = params.slug.startsWith('sector-')
  const titleLoc = isSector ? `${z.nume}, București` : `${z.nume}, ${z.sector}`
  const descLoc = isSector ? `${z.nume}, București` : `zona ${z.nume}, ${z.sector} București`
  const ogLoc = isSector ? `${z.nume}, București` : `${z.nume}, ${z.sector} București`
  const pretMin = ansambluri.length > 0 ? new Intl.NumberFormat('ro-RO').format(Math.min(...ansambluri.map(a => a.pretDeLa))) : ''
  // Imaginea zonei: cover-ul unui ansamblu real din zona, nu un placeholder global.
  const img = imagineZona(ansambluri)
  const ogImg = img ? `${BASE}${img.src}` : `${BASE}/og-zone.jpg`
  return {
    title: `Ansambluri Rezidențiale ${titleLoc}`,
    description: `${ansambluri.length} ${ansambluri.length === 1 ? 'ansamblu rezidențial' : 'ansambluri rezidențiale'} Neofort IMO în ${descLoc}. Apartamente noi de la ${pretMin}€+TVA, direct de la sursă, fără comision.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Ansambluri Rezidențiale ${z.nume} | Neofort IMO`,
      description: `${ansambluri.length} ${ansambluri.length === 1 ? 'ansamblu Neofort IMO disponibil' : 'ansambluri Neofort IMO disponibile'} în ${ogLoc}.`,
      url,
      type: 'website',
      locale: 'ro_RO',
      images: [ogImg],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Ansambluri Rezidențiale ${z.nume} | Neofort IMO`,
      description: `${ansambluri.length} ${ansambluri.length === 1 ? 'ansamblu Neofort IMO' : 'ansambluri Neofort IMO'} în ${ogLoc}. Apartamente noi de la ${pretMin}€+TVA, fără comision.`,
      images: [ogImg],
    },
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

  const isSector = params.slug.startsWith('sector-')
  const url = `${BASE}/zona/${params.slug}`

  // ── Continut derivat din date (nu se poate desincroniza de preturi) ──
  const peScurt = peScurtZona(z.nume, z.sector, ansambluri, isSector)
  const tabel = tabelZona(ansambluri)
  const geo = geoZona(ansambluri)
  const img = imagineZona(ansambluri)

  // ── Continut editorial (v430/v431); pagina functioneaza si fara el ──
  const ed = zonaEditorial(params.slug)

  // Schema.org ItemList pentru ansambluri din zona
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Ansambluri rezidențiale ${z.nume}`,
    description: `${ansambluri.length} ansambluri rezidențiale Neofort IMO în zona ${z.nume}, ${z.sector}, București.`,
    url,
    numberOfItems: ansambluri.length,
    itemListElement: ansambluri.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/ansamblu-rezidential/${a.slug}`,
      name: a.nume,
    })),
  }

  // Place + geo: spune explicit motoarelor si LLM-urilor CE loc este pagina
  // si unde se afla. Centroidul se calculeaza din coordonatele ansamblurilor,
  // deci nu e o valoare scrisa de mana care poate ramane in urma.
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': isSector ? 'AdministrativeArea' : 'Place',
    name: z.nume,
    description: peScurt ? peScurt.join(' ') : z.descriere,
    url,
    ...(geo ? { geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng } } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'București',
      addressRegion: isSector ? z.nume : z.sector,
      addressCountry: 'RO',
    },
    containedInPlace: isSector
      ? { '@type': 'City', name: 'București', address: { '@type': 'PostalAddress', addressLocality: 'București', addressCountry: 'RO' } }
      : { '@type': 'AdministrativeArea', name: z.sector, url: `${BASE}/zona/${z.sector.toLowerCase().replace(/\s+/g, '-')}` },
    ...(img ? { image: `${BASE}${img.src}` } : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Ansambluri', item: `${BASE}/ansambluri-rezidentiale` },
      { '@type': 'ListItem', position: 3, name: 'Zone', item: `${BASE}/zona` },
      { '@type': 'ListItem', position: 4, name: z.nume, item: url },
    ],
  }

  const faqSchema = ed.faq.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ed.faq.map(f => ({
      '@type': 'Question',
      name: f.intrebare,
      acceptedAnswer: { '@type': 'Answer', text: f.raspuns },
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Header activePath="/zona" />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <Link href="/ansambluri-rezidentiale" className="hover:text-[#2d7a3a]">Ansambluri</Link>
              <span>›</span>
              <Link href="/zona" className="hover:text-[#2d7a3a]">Zone</Link>
              <span>›</span>
              <span className="text-gray-900">Ansambluri rezidențiale {z.nume}</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">Ansambluri Rezidențiale {z.nume}</h1>
            <p className="text-sm text-gray-500 mt-1">{z.sector} · București · {ansambluri.length} {ansambluri.length === 1 ? 'ansamblu activ' : 'ansambluri active'}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Pe scurt — raspuns direct, derivat din date. Primul lucru citit de un LLM. */}
          {peScurt && (
            <div className="mb-8 rounded-xl border border-gray-100 bg-gray-50 p-5 max-w-3xl">
              <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500 mb-2">Pe scurt</div>
              <ul className="space-y-1.5">
                {peScurt.map((l, i) => (
                  <li key={i} className="text-[15px] text-gray-800 leading-relaxed flex gap-2">
                    <span style={{ color: '#2d7a3a' }}>·</span><span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Intro editorial — unic pe zona, adaugat in v430/v431 */}
          {ed.intro && (
            <p className="text-[15px] text-gray-700 leading-8 text-justify mb-8 max-w-3xl">{parseLinks(ed.intro)}</p>
          )}

          {ansambluri.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ansambluri.map(a => {
                const sc = STATUS_CONFIG[a.dataPredare === 'Finalizat' ? 'activ' : 'constructie']
                return (
                  <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                    className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-all group">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      {a.imagini?.cover
                        ? <img src={a.imagini.cover} alt={a.nume} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        : <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">Foto</span>
                      }
                      <div className={`absolute top-2 left-2 text-[9px] font-medium px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>{a.dataPredare && a.dataPredare !== 'Finalizat' ? 'În construcție' : sc.label}</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">{a.zona} · {a.sector}</div>
                      <div className="text-sm font-medium text-gray-900 mb-1">{a.nume}</div>
                      <div className="text-sm font-medium" style={{ color: '#2d7a3a' }}>de la {formatPret(a.pretDeLa)} <span className="text-[9px] text-gray-500 font-normal">+TVA</span></div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Nu există ansambluri active în această zonă momentan.</p>
          )}

          {/* Tabel comparativ — randurile se genereaza din date, deci nu pot ramane
              in urma fata de preturi sau tipologii. Apare doar de la 2 ansambluri. */}
          {tabel && (
            <section className="mt-10">
              <h2 className="text-lg font-medium text-gray-900 mb-1">Comparație ansambluri {z.nume}</h2>
              <p className="text-xs text-gray-500 mb-4">Prețurile sunt de la, fără TVA, actualizate la ultima modificare a ofertei.</p>
              <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full min-w-[640px] text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {tabel.cap.map((c, i) => (
                        <th key={i} className="text-left font-medium text-gray-600 text-xs uppercase tracking-wider py-2 pr-4 whitespace-nowrap">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tabel.randuri.map(r => (
                      <tr key={r.slug} className="border-b border-gray-100 align-top">
                        {r.celule.map((c, i) => (
                          <td key={i} className="py-2.5 pr-4 text-gray-700">
                            {i === 0
                              ? <Link href={`/ansamblu-rezidential/${r.slug}`} className="font-medium text-gray-900 hover:text-[#2d7a3a]">{c}</Link>
                              : i === 2
                                ? <span className="font-medium whitespace-nowrap" style={{ color: '#2d7a3a' }}>{c}</span>
                                : <span className="whitespace-nowrap">{c}</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Sectiuni editoriale — unghiul e fixat in data/zone.js ca sa nu se
              canibalizeze pagina de sector cu cea de micro-zona. */}
          {ed.sectiuni.map((s, i) => (
            <section key={i} className="mt-10 max-w-3xl">
              <h2 className="text-lg font-medium text-gray-900 mb-3">{s.titlu}</h2>
              <div className="text-[15px] text-gray-700 leading-8 text-justify whitespace-pre-line">{parseLinks(s.continut, `z${i}-`)}</div>
            </section>
          ))}

          {ed.faq.length > 0 && (
            <section className="mt-10 max-w-3xl">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Întrebări frecvente — {z.nume}</h2>
              <div className="space-y-4">
                {ed.faq.map((f, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <h3 className="text-[15px] font-medium text-gray-900 mb-1.5">{f.intrebare}</h3>
                    <div className="text-[15px] text-gray-700 leading-8 text-justify">{parseLinks(f.raspuns, `f${i}-`)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
