'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI_LITE, STATUS_CONFIG, formatPret, hasPromo } from '@/data/ansambluri'
import { ANI_EXPERIENTA, NR_ACTIVE, NR_LIVRATE, GOOGLE_RATING, GOOGLE_REVIEWS } from '@/data/siteConfig'
import { ARTICOLE_LIST } from '@/data/blog'

// Ultimele 4 articole sortate dupa data - se actualizeaza automat la articole noi
const BLOG_RECENTE = [...ARTICOLE_LIST]
  .sort((a, b) => new Date(b.dataISO) - new Date(a.dataISO))
  .slice(0, 4)

// Zone generate automat din ansambluri
const SECTOR_LABELS = {
  'sector-2': 'Sector 2',
  'sector-3': 'Sector 3',
  'sector-6': 'Sector 6',
}

function getZoneDinamice() {
  const zoneMap = {}
  ANSAMBLURI_LITE.forEach(a => {
    const zoneList = a.zone || [a.zona.toLowerCase().replace(/[^a-z0-9]+/g, '-')]
    zoneList.forEach(z => {
      if (!zoneMap[z]) {
        const isSector = z.startsWith('sector-')
        zoneMap[z] = {
          slug: z,
          nume: isSector ? SECTOR_LABELS[z] || z : a.zona,
          sector: a.sector,
          count: 0,
          isSector,
        }
      }
      zoneMap[z].count++
    })
  })
  // Sortam: zone geografice primele (dupa count), apoi sectoare
  const all = Object.values(zoneMap)
  const geo = all.filter(z => !z.isSector).sort((a, b) => b.count - a.count)
  const sec = all.filter(z => z.isSector).sort((a, b) => a.slug.localeCompare(b.slug))
  return [...geo, ...sec]
}


function DualRangeSlider({ min, max, step, valueMin, valueMax, fillLeft, fillRight, onChangeMin, onChangeMax }) {
  return (
    <div className="flex flex-col gap-1">
      {/* SLIDER MIN */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-gray-500 w-6 flex-shrink-0">Min</span>
        <input
          aria-label="Preț minim"
          type="range"
          min={min} max={valueMax - step} step={step}
          value={valueMin}
          onChange={e => onChangeMin(parseInt(e.target.value))}
          className="flex-1 h-1 rounded cursor-pointer accent-[#2d7a3a]"
        />
        <span className="text-[9px] font-medium w-16 text-right flex-shrink-0" style={{ color: '#2d7a3a' }}>
          {new Intl.NumberFormat('ro-RO').format(valueMin)}€
        </span>
      </div>
      {/* SLIDER MAX */}
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-gray-500 w-6 flex-shrink-0">Max</span>
        <input
          aria-label="Preț maxim"
          type="range"
          min={valueMin + step} max={max} step={step}
          value={valueMax}
          onChange={e => onChangeMax(parseInt(e.target.value))}
          className="flex-1 h-1 rounded cursor-pointer accent-[#2d7a3a]"
        />
        <span className="text-[9px] font-medium w-16 text-right flex-shrink-0" style={{ color: '#2d7a3a' }}>
          {valueMax >= max ? '1.500.000€+' : new Intl.NumberFormat('ro-RO').format(valueMax) + '€'}
        </span>
      </div>
    </div>
  )
}

const ZONE = getZoneDinamice()

const STEP = 999

export default function HomePageClient() {
  const [tipFilter, setTipFilter] = useState('')
  const [camereFilter, setCamereFilter] = useState('')
  const [pretMin, setPretMin] = useState(5000)
  const [pretMax, setPretMax] = useState(1500000)
  const [pretMoved, setPretMoved] = useState(false)
  const [shown, setShown] = useState(STEP)
  const [recentSlugs, setRecentSlugs] = useState([])

  useEffect(() => {
    try {
      const r = localStorage.getItem('neofort_recent_v2')
      if (r) setRecentSlugs(JSON.parse(r))
    } catch {}
  }, [])

  function markRecent(slug) {
    try {
      const prev = JSON.parse(localStorage.getItem('neofort_recent_v2') || '[]')
      const next = [slug, ...prev.filter(s => s !== slug)].slice(0, 6)
      localStorage.setItem('neofort_recent_v2', JSON.stringify(next))
      setRecentSlugs(next)
    } catch {}
  }

  const sortedAnsambluri = [...ANSAMBLURI_LITE].sort((a, b) => {
    const ai = recentSlugs.indexOf(a.slug)
    const bi = recentSlugs.indexOf(b.slug)
    if (ai === -1 && bi === -1) return 0
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  // ── FILTRE DINAMICE DIN DATE ────────────────────────────────────────────

  // Helper: extrage numarul de camere dintr-un tip
  function nrCamere(tip) {
    const m = tip.match(/^(\d+)\s+camere/i)
    return m ? Number(m[1]) : null
  }

  // Categorii afisate mereu in filtru (indiferent de datele curente)
  const categoriiDinDate = ['garsonier','apartament','penthouse','casa','comercial']

  const LABEL_CATEGORIE = {
    garsonier: 'Garsoniere / Studiouri',
    apartament: 'Apartamente',
    penthouse: 'Penthouse',
    casa: 'Case / Vile',
    comercial: 'Spații comerciale',
  }

  // Numere de camere disponibile — 1=garso/studio, 2, 3, 4+ grupate
  const camereDinDate = (() => {
    const maxCamere = new Set()
    ANSAMBLURI_LITE.forEach(a => a.tipuri.forEach(t => {
      const tl = String(t).toLowerCase()
      if (tl.includes('garsonier') || tl.includes('studio')) maxCamere.add(1)
      const n = nrCamere(t)
      if (n) maxCamere.add(n >= 4 ? 99 : n) // 99 = "4+"
    }))
    return [...maxCamere].sort((a, b) => a - b)
  })()

  // ── LOGICA FILTRARE ───────────────────────────────────────────────────────
  const filtered = sortedAnsambluri.filter(a => {

    // FILTRU TIP PROPRIETATE
    if (tipFilter) {
      const are = (fn) => a.tipuri.some(t => fn(String(t).toLowerCase()))
      if (tipFilter === 'garsonier' && !are(t => t.includes('garsonier') || t.includes('studio'))) return false
      if (tipFilter === 'apartament' && !are(t => t.includes('camere') && !t.includes('penthouse') && !t.includes('duplex'))) return false
      if (tipFilter === 'penthouse' && !are(t => t.includes('penthouse'))) return false
      if (tipFilter === 'duplex' && !are(t => t.includes('duplex'))) return false
      if (tipFilter === 'casa' && !are(t => t.includes('cas') || t.includes('vil'))) return false
      if (tipFilter === 'comercial' && !are(t => t.includes('comercial') || t.includes('birou') || t.includes('spatiu'))) return false
    }

    // FILTRU CAMERE
    if (camereFilter) {
      const nrF = Number(camereFilter)
      const match = a.tipuri.some(t => {
        const tl = String(t).toLowerCase()
        if (nrF === 1) return tl.includes('garsonier') || tl.includes('studio')
        const n = nrCamere(t)
        if (nrF === 99) return n !== null && n >= 4  // "4+" prinde 4, 5, 6... si Penthouse
        return n === nrF
      })
      if (!match) return false
    }

    // FILTRU PRET
    if (pretMoved && a.pretDeLa > pretMax) return false

    return true
  })

  const displayed = filtered.slice(0, shown)
  const total = filtered.length

  function fmtPret(v) {
    if (v >= 1500000) return '1.500.000€+'
    if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M€'
    return new Intl.NumberFormat('ro-RO').format(v) + '€'
  }

  const fillLeft = ((pretMin - 5000) / (1500000 - 5000)) * 100
  const fillRight = ((pretMax - 5000) / (1500000 - 5000)) * 100


  // Schema ItemList — ansambluri active pentru Google și LLM-uri
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ansambluri Rezidențiale Active Neofort IMO București',
    description: 'Lista completă a ansamblurilor rezidențiale noi disponibile la vânzare în București',
    numberOfItems: ANSAMBLURI_LITE.length,
    itemListElement: ANSAMBLURI_LITE.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'RealEstateListing',
        name: a.nume,
        url: `https://www.neofort.ro/ansamblu-rezidential/${a.slug}`,
        description: a.seoDescription || a.descriere,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: a.pretDeLa,
          availability: 'https://schema.org/InStock',
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'București',
          addressRegion: a.sector,
          addressCountry: 'RO',
        },
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Header activePath="/" />
      <main style={{ overflowX: 'hidden' }}>

        {/* HERO */}
        <section style={{ background: '#081c12' }} className="pt-10 pb-10 md:pt-14 md:pb-14 px-6 text-center">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(232,180,78,0.7)' }}>
            Imobiliare și Construcții București — Din 2009
          </p>
          <h1 className="text-2xl md:text-4xl font-medium text-white leading-tight mb-3 max-w-xl mx-auto">
            Ansambluri <span style={{ color: '#e8b44e' }}>Rezidențiale</span> Noi în București
          </h1>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Apartamente noi de la dezvoltator. Fără comision de agenție.
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <a href="tel:+40758090904"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all active:scale-95"
              style={{ background: '#5b7fa6', color: '#fff' }}
              aria-label="Sună acum la Neofort IMO">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Sună acum
            </a>
            <a href="https://wa.me/40758090904?text=Bună ziua! Sunt interesat de apartamentele Neofort IMO."
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all active:scale-95"
              style={{ background: '#25a244', color: '#fff' }}
              target="_blank" rel="noopener noreferrer"
              aria-label="Contactează Neofort IMO pe WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          </div>
          <div className="inline-flex rounded-xl overflow-hidden max-w-lg w-full" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
            {[
              { num: `${NR_LIVRATE}+`, lbl: 'Ansambluri livrate' },
              { num: NR_ACTIVE, lbl: 'Active acum' },
              { num: `${ANI_EXPERIENTA} ani`, lbl: 'Experiență' },
            ].map((s, i) => (
              <div key={i} className="flex-1 py-4 text-center" style={{ borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div className="text-xl md:text-2xl font-medium" style={{ color: '#e8b44e' }}>{s.num}</div>
                <div className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>{s.lbl}</div>
                {s.note && <div className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.note}</div>}
              </div>
            ))}
          </div>

          {/* RATING GOOGLE */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                  fill={i <= 4 ? '#e8b44e' : 'none'} stroke="#e8b44e" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium" style={{ color: '#e8b44e' }}>{GOOGLE_RATING}</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>·</span>
            <a href="https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7" target="_blank" rel="noopener noreferrer"
              className="text-xs hover:underline" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {GOOGLE_REVIEWS} recenzii Google
            </a>
          </div>
        </section>

        {/* FILTER STRIP */}
        <div className="bg-gray-50 border-b border-gray-200 sticky top-[82px] z-40 px-6 py-3">
          <div className="max-w-7xl mx-auto">

            {/* RAND 1: Filtre + rezultate (desktop: tot pe un rand | mobil: 2 filtre + rezultate) */}
            <div className="flex items-center gap-4">
              {/* Tip proprietate */}
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <label className="text-[9px] text-gray-600 uppercase tracking-wider font-medium">Tip proprietate</label>
                <label className="sr-only" htmlFor="tip-filter">Tip proprietate</label><select id="tip-filter" value={tipFilter} onChange={e => {
                    const val = e.target.value
                    setTipFilter(val)
                    // Sincronizare Tip -> Camere
                    if (val === 'garsonier') {
                      setCamereFilter('1') // Garsoniere = mereu 1 camera
                    } else if (val === 'penthouse') {
                      setCamereFilter('99') // Penthouse = mereu 4+
                    } else if (val === '') {
                      setCamereFilter('') // Reset tip -> reset camere
                    } else {
                      // Apartamente/Casa/Comercial: daca era 1 camera (garso), resetam
                      if (camereFilter === '1') setCamereFilter('')
                      // altfel pastram selectia de camere
                    }
                    setShown(STEP)
                  }}
                  className="border-none bg-transparent text-xs text-gray-900 outline-none cursor-pointer font-medium">
                  <option value="">Toate tipurile</option>
                  {categoriiDinDate.map(c => (
                    <option key={c} value={c}>{LABEL_CATEGORIE[c]}</option>
                  ))}
                </select>
              </div>

              <div className="w-px h-7 bg-gray-300 flex-shrink-0" />

              {/* Numar camere */}
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <label className="text-[9px] text-gray-600 uppercase tracking-wider font-medium">Număr camere</label>
                <label className="sr-only" htmlFor="camere-filter">Număr camere</label><select id="camere-filter" value={camereFilter} onChange={e => {
                    const val = e.target.value
                    setCamereFilter(val)
                    // Sincronizare Camere -> Tip (sens invers)
                    if (val === '1') {
                      setTipFilter('garsonier') // 1 camera = mereu Garsoniere/Studio
                    } else if (val === '99') {
                      // 4+ camere: daca tipul era garsonier, resetam; daca era penthouse pastram
                      if (tipFilter === 'garsonier') setTipFilter('')
                    } else if (val !== '') {
                      // 2, 3 camere: daca tip era garsonier sau penthouse, nu are sens -> resetam
                      if (tipFilter === 'garsonier' || tipFilter === 'penthouse') setTipFilter('')
                    } else {
                      // Reset camere -> reset tip
                      setTipFilter('')
                    }
                    setShown(STEP)
                  }}
                  className="border-none bg-transparent text-xs text-gray-900 outline-none cursor-pointer font-medium">
                  <option value="">Toate camerele</option>
                  {camereDinDate.map(c => (
                    <option key={c} value={String(c)}>
                      {c === 1 ? '1 cameră' : c === 99 ? '4+ camere' : `${c} camere`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden md:block w-px h-7 bg-gray-300 flex-shrink-0" />

              {/* Slider pret — pe desktop inline, pe mobil ascuns aici */}
              <div className="hidden md:flex flex-col gap-1 flex-1 min-w-[200px]">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] text-gray-600 uppercase tracking-wider font-medium">Interval de preț</label>
                  <span className="text-[9px] font-medium" style={{ color: '#2d7a3a' }}>
                    {pretMoved ? `Până la ${fmtPret(pretMax)}` : 'Toate prețurile'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-gray-500 flex-shrink-0">5.000€</span>
                  <input
                    aria-label="Preț maxim"
                    type="range"
                    min={5000} max={1500000} step={5000}
                    value={pretMax}
                    onChange={e => { setPretMax(Number(e.target.value)); setPretMoved(true); setShown(STEP) }}
                    className="flex-1 h-1 accent-[#2d7a3a] cursor-pointer"
                  />
                  <span className="text-[9px] text-gray-500 flex-shrink-0">1.500.000€+</span>
                </div>
              </div>

              <div className="hidden md:block w-px h-7 bg-gray-300 flex-shrink-0" />

              {/* Rezultate */}
              <div className="ml-auto text-xs flex-shrink-0 whitespace-nowrap">
                <span className="font-semibold text-gray-900">{total}</span>
                <span className="text-gray-600"> rezultate</span>
              </div>
            </div>

            {/* RAND 2: Slider pret — doar pe mobil, sub filtre */}
            <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] text-gray-600 uppercase tracking-wider font-medium">Interval de preț</label>
                <span className="text-[9px] font-medium" style={{ color: '#2d7a3a' }}>
                  {pretMoved ? `Până la ${fmtPret(pretMax)}` : 'Toate prețurile'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-gray-500 flex-shrink-0">5.000€</span>
                <input
                  aria-label="Preț maxim"
                  type="range"
                  min={5000} max={1500000} step={5000}
                  value={pretMax}
                  onChange={e => { setPretMax(Number(e.target.value)); setPretMoved(true); setShown(STEP) }}
                  className="flex-1 h-1 accent-[#2d7a3a] cursor-pointer"
                />
                <span className="text-[9px] text-gray-500 flex-shrink-0">1.500.000€+</span>
              </div>
            </div>

          </div>
        </div>

        {/* ANSAMBLURI */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-5">
              <div>
                <h2 className="text-xl font-medium text-gray-900">Ansambluri Rezidențiale la vânzare</h2>
                <p className="text-xs text-gray-600 mt-1">Ordonate după activitate recentă</p>
              </div>
              <Link href="/ansambluri-rezidentiale" className="text-xs text-[#2d7a3a] hover:underline font-medium">
                Vezi toate →
              </Link>
            </div>

            {displayed.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-sm text-gray-700">Niciun ansamblu pentru filtrele selectate.</div>
                <button onClick={() => { setTipFilter(''); setCamereFilter(''); setPretMin(5000); setPretMax(1500000); setPretMoved(false); setShown(STEP) }}
                  className="mt-3 text-xs text-[#2d7a3a] hover:underline">
                  Resetează filtrele
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {displayed.map((a, cardIdx) => {
                  const sc = STATUS_CONFIG[a.dataPredare === 'Finalizat' ? 'activ' : 'constructie']
                  const isRecent = recentSlugs.includes(a.slug) && recentSlugs.indexOf(a.slug) === 0
                  return (
                    <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                      onClick={() => markRecent(a.slug)}
                      className="group border border-gray-300 rounded-xl overflow-hidden bg-white hover:border-gray-500 hover:shadow-sm transition-all">
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        {a.imagini?.cover ? (
                          <img src={a.imagini.cover} alt={a.nume} width={400} height={400} sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 17vw" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" loading={cardIdx === 0 ? "eager" : "lazy"} fetchPriority={cardIdx === 0 ? "high" : "auto"} />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-gray-400">Foto</span>
                          </div>
                        )}
                        <div className={`absolute top-1.5 left-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>
                          {a.dataPredare && a.dataPredare !== 'Finalizat' ? 'În construcție' : sc.label}
                        </div>
                        {a._hasPromo && (
                          <div className="absolute top-1.5 left-1.5 mt-[18px] text-[9px] font-medium px-1.5 py-0.5 rounded text-white"
                            style={{ background: '#c0392b' }}>Promoție</div>
                        )}
                        {isRecent && (
                          <div className="absolute bottom-1.5 left-1.5 text-[8px] font-medium px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(232,180,78,0.95)', color: '#5a3800' }}>
                            Recent accesat
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">{a.zona}</div>
                        <div className="text-xs font-medium text-gray-900 mb-1 leading-snug">{a.nume}</div>
                        <div className="text-xs font-medium" style={{ color: '#2d7a3a' }}>
                          de la {formatPret(a.pretDeLa)} <span className="text-[9px] text-gray-500 font-normal">+TVA</span>
                        </div>
                        {a.dataPredare && a.dataPredare !== 'Finalizat' && <div className="text-[9px] text-gray-500 mt-0.5">{a.dataPredare}</div>}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}


          </div>
        </section>

        {/* TRUST BAND */}
        <div className="border-t border-b border-gray-200 bg-gray-50 py-5 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { num: `${NR_LIVRATE}+`, lbl: 'Ansambluri rezidențiale livrate' },
              { num: `${ANI_EXPERIENTA} ani`, lbl: 'Experiență în imobiliare' },
              { num: '2h', lbl: 'Timp mediu răspuns' },
              { num: '0%', lbl: 'Comision de agenție' },
            ].map((t, i) => (
              <div key={i} className="text-center py-2" style={{ borderLeft: i > 0 ? '0.5px solid #d1d5db' : 'none' }}>
                <div className="text-xl md:text-2xl font-medium text-gray-900">{t.num}</div>
                <div className="text-xs text-gray-700 mt-1 leading-snug px-2">{t.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ZONE */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-5">
              <div>
                <h2 className="text-xl font-medium text-gray-900">Caută după zonă</h2>
                <p className="text-xs text-gray-600 mt-1">Nr. ansambluri actualizat automat</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ZONE.map(z => (
                <Link key={z.slug} href={`/zona/${z.slug}`}
                  className="border border-gray-200 rounded-xl p-3.5 bg-gray-50 hover:border-[#2d7a3a] hover:bg-white transition-all">
                  <div className="text-xl font-medium mb-1" style={{ color: '#2d7a3a' }}>{z.count}</div>
                  <div className="text-xs font-medium text-gray-900 leading-snug mb-0.5">Ansambluri rezidențiale {z.nume}</div>
                  <div className="text-[9px] text-gray-600">{z.sector} · București</div>
                  <div className="mt-2 h-1 bg-gray-200 rounded" style={{ overflow: 'hidden' }}>
                    <div className="h-1 rounded" style={{ background: '#2d7a3a', width: `${Math.round(z.count / Math.max(...ZONE.map(x => x.count)) * 100)}%`, minHeight: 4 }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HARTA TEASER */}
        <div className="px-6 pb-8">
          <div className="max-w-7xl mx-auto border border-gray-300 rounded-xl overflow-hidden shadow-md">
            <Link href="/harta-ansambluri" className="block group">
              <div className="relative overflow-hidden" style={{ height: 200 }}>

                <img
                  src="/harta-teaser.avif"
                  alt="Harta ansambluri Neofort IMO București"
                  width={1200}
                  height={200}
                  sizes="100vw"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                  className="group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient bottom pentru text */}
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, transparent 100%)' }}/>

                {/* Text overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
                  <div>
                    <p className="text-white font-semibold text-sm drop-shadow">Harta interactivă ansambluri</p>
                    <p className="text-white/80 text-xs mt-0.5">{NR_ACTIVE + NR_PORTOFOLIU} proiecte pe hartă OpenStreetMap București</p>
                  </div>
                  <div className="flex gap-3 flex-wrap justify-end">
                    {[['#2d7a3a','Finalizat'],['#2563eb','Construcție'],['#dc2626','Promoție'],['#f97316','Portofoliu']].map(([c,l]) => (
                      <div key={l} className="flex items-center gap-1 text-[9px] text-white/90">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:c}}/>
                        <span>{l}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                  <span className="bg-white text-gray-900 text-xs font-semibold px-5 py-2 rounded-full shadow-lg">
                    Deschide harta completă →
                  </span>
                </div>
              </div>

              <div className="px-4 py-2.5 flex justify-between items-center bg-white border-t border-gray-200">
                <span className="text-xs text-gray-500">{NR_ACTIVE} ansambluri active · {NR_LIVRATE}+ proiecte livrate în București din 2009</span>
                <span className="text-xs font-medium" style={{color:'#2d7a3a'}}>Vezi toate →</span>
              </div>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <section className="py-12 px-6 border-t border-gray-100" style={{ background: '#f9fafb' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: '#2d7a3a' }}>Întrebări frecvente</p>
              <h2 className="text-xl font-medium text-gray-900">Tot ce trebuie să știi despre Neofort IMO</h2>
            </div>
            <div className="space-y-3">
              {[
                { q: 'Neofort IMO percepe comision de agenție?', a: 'Nu. Neofort IMO comercializează apartamente direct de la sursă, fără comision de agenție pentru cumpărător. Prețul afișat este prețul final, fără costuri ascunse.' },
                { q: 'Câte proiecte rezidențiale a livrat Neofort IMO?', a: `Neofort IMO a livrat peste ${NR_LIVRATE} de ansambluri rezidențiale în București din 2009 până în prezent, ajutând peste ${NR_FAMILII} familii să-și cumpere un apartament nou.` },
                { q: 'În ce sectoare din București are Neofort IMO ansambluri active?', a: 'Ansambluri active în Sectorul 2 (Moșilor-Eminescu, Eminescu-Viitorului, Tepeș Vodă), Sectorul 3 (Titan-Pallady, Piața Muncii, IOR) și Sectorul 6 (Militari, Gorjului, Iuliu Maniu).' },
                { q: 'Apartamentele Neofort IMO se predau la cheie?', a: 'Da. Toate apartamentele se predau cu finisaje complete incluse în preț: parchet, gresie, faianță, obiecte sanitare, tâmplărie, instalații complete. Te muți direct.' },
                { q: 'Cum se face rezervarea unui apartament?', a: 'Rezervarea se face cu o sumă variabilă per proiect, restituibilă integral dacă nu se semnează antecontractul din vina dezvoltatorului. Consultanță juridică și bancară gratuită inclusă.' },
                { q: 'Neofort IMO acceptă credite bancare și Noua Casă?', a: 'Da. Acceptăm finanțare prin credit bancar standard, Noua Casă și plată în avans. Consultanți bancari parteneri disponibili gratuit pentru analiza eligibilității.' },
                { q: 'Care este programul și adresa Neofort IMO?', a: 'Str. Theodor Aman Pictor nr. 11, Sector 1, București. Program: Luni–Vineri 10:00–18:00. Telefon: 0758 090 904.' },
              ].map((item, i) => (
                <details key={i} className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-sm font-medium text-gray-900 select-none list-none">
                    {item.q}
                    <svg className="flex-shrink-0 w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section className="py-8 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-5">
              <div>
                <h2 className="text-xl font-medium text-gray-900">Noutăți imobiliare</h2>
                <p className="text-xs text-gray-600 mt-1">Analize, legislație și tendințe</p>
              </div>
              <Link href="/blog" className="text-xs text-[#2d7a3a] hover:underline font-medium">Vezi toate articolele →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {BLOG_RECENTE.map(b => (
                <Link key={b.slug} href={`/blog/${b.slug}`}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-sm transition-all group">
                  <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden', background: '#f3f4f6' }}>
                    {b.image && <img src={b.image} alt={b.titlu} width={600} height={360} sizes="(max-width: 768px) 50vw, 25vw" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
                  </div>
                  <div className="p-3">
                    <div className="text-[9px] font-medium uppercase tracking-wider mb-1" style={{ color: '#2d7a3a' }}>{b.tag}</div>
                    <div className="text-xs font-medium text-gray-900 leading-snug mb-1 group-hover:text-[#2d7a3a] transition-colors line-clamp-2">{b.titlu}</div>
                    <div className="text-[10px] text-gray-500">{b.data}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
