'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FormularCalificat from '@/components/FormularCalificat'
import { ANSAMBLURI_ACTIVE, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

// Zone generate automat din ansambluri
function getZoneDinamice() {
  const zoneMap = {}
  ANSAMBLURI_ACTIVE.forEach(a => {
    const zoneList = a.zone || [a.zona.toLowerCase().replace(/[^a-z0-9]+/g, '-')]
    zoneList.forEach(z => {
      if (!zoneMap[z]) {
        zoneMap[z] = { slug: z, nume: a.zona, sector: a.sector, count: 0 }
      }
      zoneMap[z].count++
    })
  })
  return Object.values(zoneMap).sort((a, b) => b.count - a.count)
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

  const filtered = sortedAnsambluri.filter(a => {
    if (tipFilter === 'apartament' && !a.tipuri.some(t => t.includes('camere'))) return false
    if (tipFilter === 'garsoniera' && !a.tipuri.some(t => t.includes('arsonier'))) return false
    if (camereFilter && !a.tipuri.some(t => t.includes(camereFilter + ' camere'))) return false
    if (pretMoved && a.pretDeLa < pretMin) return false
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
        <section style={{ background: '#081c12' }} className="py-12 md:py-16 px-6 text-center">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'rgba(232,180,78,0.7)' }}>
            Imobiliare și Construcții București — Din 2009
          </p>
          <h1 className="text-2xl md:text-4xl font-medium text-white leading-tight mb-3 max-w-xl mx-auto">
            Ansambluri <span style={{ color: '#e8b44e' }}>Rezidențiale</span> Noi în București
          </h1>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Apartamente noi de la dezvoltator. Fără comision de agenție.
          </p>
          <div className="inline-flex rounded-xl overflow-hidden mb-8 max-w-lg w-full" style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}>
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
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto nav-scroll">
            <div className="flex flex-col gap-0.5 flex-shrink-0">
              <label className="text-[9px] text-gray-600 uppercase tracking-wider font-medium">Tip proprietate</label>
              <select value={tipFilter} onChange={e => { setTipFilter(e.target.value); setShown(STEP) }}
                className="border-none bg-transparent text-xs text-gray-900 outline-none cursor-pointer font-medium">
                <option value="">Toate</option>
                <option value="apartament">Apartament</option>
                <option value="garsoniera">Garsonieră</option>
                <option value="studio">Studio</option>
                <option value="comercial">Spațiu comercial</option>
              </select>
            </div>
            <div className="w-px h-7 bg-gray-300 flex-shrink-0" />
            <div className="flex flex-col gap-0.5 flex-shrink-0">
              <label className="text-[9px] text-gray-600 uppercase tracking-wider font-medium">Număr camere</label>
              <select value={camereFilter} onChange={e => { setCamereFilter(e.target.value); setShown(STEP) }}
                className="border-none bg-transparent text-xs text-gray-900 outline-none cursor-pointer font-medium">
                <option value="">Toate</option>
                <option value="1">1 cameră</option>
                <option value="2">2 camere</option>
                <option value="3">3 camere</option>
                <option value="4">4 camere</option>
              </select>
            </div>
            <div className="w-px h-7 bg-gray-300 flex-shrink-0" />
            <div className="flex flex-col gap-1 flex-1 min-w-[220px]">
              <div className="flex justify-between items-center">
                <label className="text-[9px] text-gray-600 uppercase tracking-wider font-medium">Interval de preț</label>
                <span className="text-[9px] font-medium" style={{ color: '#2d7a3a' }}>
                  {fmtPret(pretMin)} — {fmtPret(pretMax)}
                </span>
              </div>
              <DualRangeSlider
                min={5000} max={1500000} step={5000}
                valueMin={pretMin} valueMax={pretMax}
                fillLeft={fillLeft} fillRight={fillRight}
                onChangeMin={v => { setPretMin(v); setPretMoved(true); setShown(STEP) }}
                onChangeMax={v => { setPretMax(v); setPretMoved(true); setShown(STEP) }}
              />
            </div>
            <div className="w-px h-7 bg-gray-300 flex-shrink-0" />
            <div className="text-xs flex-shrink-0 whitespace-nowrap">
              <span className="font-semibold text-gray-900">{total}</span>
              <span className="text-gray-600"> rezultate</span>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {displayed.map(a => {
                  const sc = STATUS_CONFIG[a.status]
                  const isRecent = a.slug === recentSlug
                  return (
                    <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                      onClick={() => { try { localStorage.setItem('neofort_recent', a.slug) } catch {} }}
                      className="group border border-gray-100 rounded-xl overflow-hidden bg-white hover:border-gray-300 hover:shadow-sm transition-all">
                      <div className="aspect-square bg-gray-100 relative flex items-center justify-center">
                        <span className="text-xs text-gray-400">Foto</span>
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

        {/* HARTA */}
        <div className="px-6 pb-8">
          <div className="max-w-7xl mx-auto border border-gray-200 rounded-xl overflow-hidden">
            <div className="h-40 bg-gray-200 flex flex-col items-center justify-center gap-2">
              <div className="text-sm font-medium text-gray-700">Harta interactivă — 85 ansambluri</div>
              <div className="text-xs text-gray-600">Active, în construcție și portofoliu</div>
              <div className="flex gap-3 mt-1">
                {[
                  { c: '#2d7a3a', l: 'Finalizat' },
                  { c: '#1565c0', l: 'Construcție' },
                  { c: '#c8922a', l: 'Vândut' },
                  { c: '#c0392b', l: 'Promoție' },
                ].map(m => (
                  <div key={m.l} className="flex items-center gap-1.5 text-[10px] text-gray-700">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: m.c }} />
                    {m.l}
                  </div>
                ))}
              </div>
            </div>
            <div className="px-4 py-3 flex justify-between items-center border-t border-gray-200">
              <span className="text-xs text-gray-700">Toate cele 85 ansambluri pe o singură hartă</span>
              <Link href="/harta-ansambluri" className="text-xs font-medium hover:underline" style={{ color: '#2d7a3a' }}>
                Deschide harta completă →
              </Link>
            </div>
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
                  className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all group">
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
