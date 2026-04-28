'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FormularCalificat from '@/components/FormularCalificat'
import { ANSAMBLURI_ACTIVE, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

// Zone generate automat din ansambluri
const SECTOR_LABELS = {
  'sector-2': 'Sector 2',
  'sector-3': 'Sector 3',
  'sector-6': 'Sector 6',
}

function getZoneDinamice() {
  const zoneMap = {}
  ANSAMBLURI_ACTIVE.forEach(a => {
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
  const [recentSlug, setRecentSlug] = useState(null)

  useEffect(() => {
    try {
      const r = localStorage.getItem('neofort_recent')
      if (r) setRecentSlug(r)
    } catch {}
  }, [])

  const sortedAnsambluri = [...ANSAMBLURI_ACTIVE].sort((a, b) => {
    if (a.slug === recentSlug) return -1
    if (b.slug === recentSlug) return 1
    return 0
  })

  // ── FILTRE DINAMICE DIN DATE ────────────────────────────────────────────

  // Helper: extrage numarul de camere dintr-un tip
  function nrCamere(tip) {
    const m = tip.match(/^(\d+)\s+camere/i)
    return m ? Number(m[1]) : null
  }

  // Categorii disponibile — generate strict din datele existente
  const categoriiDinDate = (() => {
    const set = new Set()
    ANSAMBLURI_ACTIVE.forEach(a => a.tipuri.forEach(t => {
      const tl = t.toLowerCase()
      if (tl.includes('garsonier') || tl.includes('studio')) set.add('garsonier')
      if (tl.includes('camere') && !tl.includes('penthouse') && !tl.includes('duplex')) set.add('apartament')
      if (tl.includes('penthouse')) set.add('penthouse')
      if (tl.includes('duplex')) set.add('duplex')
      if (tl.includes('cas') || tl.includes('vil')) set.add('casa')
      if (tl.includes('comercial') || tl.includes('spatiu') || tl.includes('birou')) set.add('comercial')
    }))
    // Ordine fixa afisare
    const ordine = ['garsonier','apartament','penthouse','duplex','casa','comercial']
    return ordine.filter(c => set.has(c))
  })()

  const LABEL_CATEGORIE = {
    garsonier: 'Garsoniere / Studiouri',
    apartament: 'Apartamente',
    penthouse: 'Penthouse',
    duplex: 'Duplex',
    casa: 'Case / Vile',
    comercial: 'Spații comerciale / Birouri',
  }

  // Numere de camere disponibile — 1=garso/studio, 2, 3, 4+ grupate
  const camereDinDate = (() => {
    const maxCamere = new Set()
    ANSAMBLURI_ACTIVE.forEach(a => a.tipuri.forEach(t => {
      const tl = t.toLowerCase()
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
      const are = (fn) => a.tipuri.some(t => fn(t.toLowerCase()))
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
        const tl = t.toLowerCase()
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

  return (
    <>
      <Header activePath="/" />
      <main>

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
          <div className="inline-flex rounded-xl overflow-hidden max-w-lg w-full" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
            {[
              { num: '85+', lbl: 'Ansambluri livrate' },
              { num: ANSAMBLURI_ACTIVE.length, lbl: 'Active acum' },
              { num: '17 ani', lbl: 'Experiență' },
            ].map((s, i) => (
              <div key={i} className="flex-1 py-4 text-center" style={{ borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div className="text-xl md:text-2xl font-medium" style={{ color: '#e8b44e' }}>{s.num}</div>
                <div className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>{s.lbl}</div>
                {s.note && <div className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.note}</div>}
              </div>
            ))}
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
                <select value={tipFilter} onChange={e => {
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
                <select value={camereFilter} onChange={e => {
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
                  <span className="text-[9px] text-gray-400 flex-shrink-0">5.000€</span>
                  <input
                    type="range"
                    min={5000} max={1500000} step={5000}
                    value={pretMax}
                    onChange={e => { setPretMax(Number(e.target.value)); setPretMoved(true); setShown(STEP) }}
                    className="flex-1 h-1 accent-[#2d7a3a] cursor-pointer"
                  />
                  <span className="text-[9px] text-gray-400 flex-shrink-0">1.500.000€+</span>
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
                <span className="text-[9px] text-gray-400 flex-shrink-0">5.000€</span>
                <input
                  type="range"
                  min={5000} max={1500000} step={5000}
                  value={pretMax}
                  onChange={e => { setPretMax(Number(e.target.value)); setPretMoved(true); setShown(STEP) }}
                  className="flex-1 h-1 accent-[#2d7a3a] cursor-pointer"
                />
                <span className="text-[9px] text-gray-400 flex-shrink-0">1.500.000€+</span>
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
                {displayed.map(a => {
                  const sc = STATUS_CONFIG[a.status]
                  const isRecent = a.slug === recentSlug
                  return (
                    <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                      onClick={() => { try { localStorage.setItem('neofort_recent', a.slug) } catch {} }}
                      className="group border border-gray-300 rounded-xl overflow-hidden bg-white hover:border-gray-500 hover:shadow-sm transition-all">
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        {a.imagini?.cover ? (
                          <Image src={a.imagini.cover} alt={a.nume} fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs text-gray-400">Foto</span>
                          </div>
                        )}
                        <div className={`absolute top-1.5 left-1.5 text-[9px] font-medium px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>
                          {sc.label}
                        </div>
                        {isRecent && (
                          <div className="absolute bottom-1.5 left-1.5 text-[8px] font-medium px-1.5 py-0.5 rounded"
                            style={{ background: 'rgba(232,180,78,0.95)', color: '#5a3800' }}>
                            Recent accesat
                          </div>
                        )}
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded bg-white bg-opacity-90 flex items-center justify-center text-[11px] text-gray-400">♡</div>
                      </div>
                      <div className="p-2">
                        <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">{a.zona}</div>
                        <div className="text-xs font-medium text-gray-900 mb-1 leading-snug">{a.nume}</div>
                        <div className="text-xs font-medium" style={{ color: '#2d7a3a' }}>
                          de la {formatPret(a.pretDeLa)} <span className="text-[9px] text-gray-500 font-normal">+TVA</span>
                        </div>
                        <div className="text-[9px] text-gray-500 mt-0.5">{a.dataPredare}</div>
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
              { num: '85+', lbl: 'Ansambluri rezidențiale livrate' },
              { num: '17 ani', lbl: 'Experiență în imobiliare' },
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
          <div className="max-w-7xl mx-auto border border-gray-300 rounded-xl overflow-hidden" style={{ background: '#1a1a2e' }}>
            <Link href="/harta-ansambluri" className="block group relative">
              {/* SVG mini-harta cu pinuri reale */}
              <div className="relative overflow-hidden" style={{ height: 180 }}>
                <svg viewBox="0 0 900 200" className="w-full h-full" style={{ opacity: 0.9 }}>
                  {/* Fundal */}
                  <rect width="900" height="200" fill="#1a1a2e"/>
                  {/* Stradute principale - aspect urban schematic */}
                  <line x1="0" y1="100" x2="900" y2="100" stroke="#2d3561" strokeWidth="8"/>
                  <line x1="450" y1="0" x2="450" y2="200" stroke="#2d3561" strokeWidth="6"/>
                  <line x1="0" y1="60" x2="900" y2="140" stroke="#252b50" strokeWidth="4"/>
                  <line x1="0" y1="140" x2="900" y2="60" stroke="#252b50" strokeWidth="4"/>
                  <line x1="200" y1="0" x2="200" y2="200" stroke="#252b50" strokeWidth="3"/>
                  <line x1="700" y1="0" x2="700" y2="200" stroke="#252b50" strokeWidth="3"/>
                  <line x1="0" y1="30" x2="900" y2="30" stroke="#252b50" strokeWidth="2"/>
                  <line x1="0" y1="170" x2="900" y2="170" stroke="#252b50" strokeWidth="2"/>
                  {/* Zona verde - parc central schematic */}
                  <ellipse cx="420" cy="95" rx="55" ry="35" fill="#1e3a2a" opacity="0.6"/>
                  <ellipse cx="680" cy="45" rx="30" ry="18" fill="#1e3a2a" opacity="0.5"/>

                  {/* PINURI - coordonate mapate din GPS real pe viewBox 900x200 */}
                  {/* Active - Verde finalizat */}
                  <circle cx="540" cy="115" r="7" fill="#2d7a3a" stroke="white" strokeWidth="1.5"/>
                  <circle cx="590" cy="128" r="7" fill="#2d7a3a" stroke="white" strokeWidth="1.5"/>
                  <circle cx="400" cy="130" r="7" fill="#2d7a3a" stroke="white" strokeWidth="1.5"/>
                  <circle cx="460" cy="105" r="7" fill="#2d7a3a" stroke="white" strokeWidth="1.5"/>
                  {/* Active - Albastru constructie */}
                  <circle cx="620" cy="110" r="7" fill="#2563eb" stroke="white" strokeWidth="1.5"/>
                  <circle cx="555" cy="130" r="7" fill="#2563eb" stroke="white" strokeWidth="1.5"/>
                  <circle cx="300" cy="98" r="7" fill="#2563eb" stroke="white" strokeWidth="1.5"/>
                  <circle cx="245" cy="115" r="7" fill="#2563eb" stroke="white" strokeWidth="1.5"/>
                  <circle cx="505" cy="95" r="7" fill="#2563eb" stroke="white" strokeWidth="1.5"/>
                  <circle cx="480" cy="128" r="7" fill="#2563eb" stroke="white" strokeWidth="1.5"/>
                  {/* Active - Rosu promotie */}
                  <circle cx="290" cy="118" r="7" fill="#dc2626" stroke="white" strokeWidth="1.5"/>
                  <circle cx="440" cy="110" r="7" fill="#dc2626" stroke="white" strokeWidth="1.5"/>
                  {/* Portofoliu - portocaliu mic */}
                  {[350,380,410,430,460,480,510,540,560,590,620,650,680,710,730,760,200,230,270,310,340].map((x, i) => (
                    <circle key={i} cx={x} cy={80 + (i % 5) * 18} r="4" fill="#f97316" stroke="white" strokeWidth="1" opacity="0.8"/>
                  ))}
                </svg>

                {/* Overlay gradient bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>

                {/* Text overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">Harta interactivă</p>
                    <p className="text-white/70 text-xs mt-0.5">45 ansambluri pe hartă OpenStreetMap</p>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    {[
                      { c: '#2d7a3a', l: 'Finalizat' },
                      { c: '#2563eb', l: 'Constructie' },
                      { c: '#dc2626', l: 'Promotie' },
                      { c: '#f97316', l: 'Portofoliu' },
                    ].map(m => (
                      <div key={m.l} className="flex items-center gap-1 text-[9px] text-white/80">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.c }}/>
                        {m.l}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                    Deschide harta completă →
                  </span>
                </div>
              </div>

              <div className="px-4 py-3 flex justify-between items-center border-t border-white/10">
                <span className="text-xs text-white/60">12 active la vânzare + 33 proiecte livrate în București</span>
                <span className="text-xs font-medium" style={{ color: '#4ade80' }}>
                  Deschide harta →
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* BLOG */}
        <section className="py-8 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-5">
              <div>
                <h2 className="text-xl font-medium text-gray-900">Noutăți imobiliare</h2>
                <p className="text-xs text-gray-600 mt-1">Analize, legislație și tendințe</p>
              </div>
              <Link href="/blog" className="text-xs text-[#2d7a3a] hover:underline font-medium">Vezi toate →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { tag: 'Legislație', titlu: 'E-Proprietatea 2026 — noul sistem de impozitare explicat', data: '22 Aprilie 2026', slug: 'e-proprietatea-2026-noul-sistem-de-impozitare' },
                { tag: 'Piață', titlu: 'Scad sau nu prețurile la apartamente în București în 2026', data: '15 Martie 2026', slug: 'preturi-apartamente-bucuresti-2026' },
                { tag: 'Ghid', titlu: 'Ghid complet: cum cumperi un apartament nou în București', data: '10 Martie 2026', slug: 'ghid-cumparare-apartament-nou' },
              ].map(b => (
                <Link key={b.slug} href={`/blog/${b.slug}`}
                  className="border border-gray-300 rounded-xl overflow-hidden hover:border-gray-400 hover:shadow-sm transition-all group">
                  <div className="h-28 bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-500">Foto articol</span>
                  </div>
                  <div className="p-4">
                    <div className="text-[9px] font-medium uppercase tracking-wider mb-2" style={{ color: '#2d7a3a' }}>{b.tag}</div>
                    <div className="text-sm font-medium text-gray-900 leading-snug mb-2 group-hover:text-[#2d7a3a] transition-colors">{b.titlu}</div>
                    <div className="text-[10px] text-gray-600">{b.data}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FORMULAR CALIFICAT */}
        <section style={{ background: '#081c12' }} className="py-12 px-6">
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl font-medium text-white mb-2">
              Solicită o ofertă <span style={{ color: '#e8b44e' }}>personalizată</span>
            </h2>
            <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Completează formularul și un consultant Neofort IMO te contactează în cel mult 2 ore cu o ofertă adaptată nevoilor tale.
            </p>
            <FormularCalificat />
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
