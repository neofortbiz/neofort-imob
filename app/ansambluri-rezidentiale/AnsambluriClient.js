'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ANSAMBLURI_ACTIVE, formatPret, hasPromo } from '@/data/ansambluri'
import { ANI_EXPERIENTA, NR_ACTIVE, NR_LIVRATE } from '@/data/siteConfig'
import { modelContext, inregistreazaToate, dupaRandare, aduInEcran, inLimita } from '@/lib/webmcp'

const STATUS_CFG = {
  finalizat:    { label: 'Finalizat',      bg: '#2d7a3a', color: '#ffffff' },
  constructie:  { label: 'În construcție', bg: '#1565c0', color: '#ffffff' },
  activ:        { label: 'Finalizat',      bg: '#2d7a3a', color: '#ffffff' },
  promotie:     { label: 'Promoție',       bg: '#c0392b', color: '#ffffff' },
  vandut:       { label: 'Vândut',         bg: '#c8922a', color: '#ffffff' },
}
const SECTOARE = ['Toate', 'Sector 2', 'Sector 3', 'Sector 6']
const STATUSURI = ['Toate', 'finalizat', 'constructie', 'promotie']
const SORTARI = [
  { val: 'default',    lbl: 'Relevanță' },
  { val: 'pret_asc',   lbl: 'Preț ↑' },
  { val: 'pret_desc',  lbl: 'Preț ↓' },
  { val: 'numar_desc', lbl: 'Cel mai nou' },
]

// Filtrarea listei — o singura functie, folosita de pagina (useMemo) si de unealta WebMCP filter_projects
// (v461), ca agentul sa raporteze exact ce vede omul. Logica e cea de dinainte, mutata aici neschimbata.
function filtreaza({ sector, status, camere, sortare, pretMax, pretActiv, query }) {
  let list = [...ANSAMBLURI_ACTIVE]
  if (query.trim()) {
    const q = query.trim().toLowerCase()
    list = list.filter(a =>
      a.nume.toLowerCase().includes(q) ||
      a.zona.toLowerCase().includes(q) ||
      a.sector.toLowerCase().includes(q) ||
      a.descriere?.toLowerCase().includes(q) ||
      a.tipuri.some(t => String(t).toLowerCase().includes(q))
    )
  }
  if (sector !== 'Toate') list = list.filter(a => a.sector === sector)
  if (status !== 'Toate') {
    if (status === 'promotie') list = list.filter(a => hasPromo(a))
    else if (status === 'finalizat') list = list.filter(a => a.dataPredare === 'Finalizat')
    else if (status === 'constructie') list = list.filter(a => a.dataPredare !== 'Finalizat')
  }
  if (pretActiv) list = list.filter(a => a.pretDeLa <= pretMax)
  if (camere !== 'Toate') {
    list = list.filter(a => a.tipuri.some(t => {
      const tl = String(t).toLowerCase()
      if (camere === '1') return tl.includes('garsonier') || tl.includes('studio')
      if (camere === '4+') { const m = String(t).match(/^(\d+)\s+camere/); return m && Number(m[1]) >= 4 }
      const m = String(t).match(/^(\d+)\s+camere/)
      return m && m[1] === camere
    }))
  }
  if (sortare === 'pret_asc')   list.sort((a, b) => a.pretDeLa - b.pretDeLa)
  if (sortare === 'pret_desc')  list.sort((a, b) => b.pretDeLa - a.pretDeLa)
  if (sortare === 'numar_desc') list.sort((a, b) => b.numar - a.numar)
  return list
}

const PRET_FILTRU_MIN = 60000
const PRET_FILTRU_MAX = 1500000

export default function AnsambluriClient({ initialQuery = '' }) {
  const [sector, setSector]         = useState('Toate')
  const [status, setStatus]         = useState('Toate')
  const [camere, setCamere]         = useState('Toate')
  const [sortare, setSortare]       = useState('default')
  const [view, setView]             = useState('grid')
  const [pretMax, setPretMax]       = useState(1500000)
  const [pretActiv, setPretActiv]   = useState(false)
  const [query, setQuery]           = useState(initialQuery)
  const [filtreOpen, setFiltreOpen] = useState(false)

  useEffect(() => { if (initialQuery) setQuery(initialQuery) }, [initialQuery])

  const camereDinDate = useMemo(() => {
    const set = new Set()
    ANSAMBLURI_ACTIVE.forEach(a => a.tipuri.forEach(t => {
      const tl = String(t).toLowerCase()
      if (tl.includes('garsonier') || tl.includes('studio')) set.add('1')
      const m = String(t).match(/^(\d+)\s+camere/)
      if (m) set.add(Number(m[1]) >= 4 ? '4+' : m[1])
    }))
    return ['Toate', ...['1','2','3','4+'].filter(c => set.has(c))]
  }, [])

  const filtered = useMemo(
    () => filtreaza({ sector, status, camere, sortare, pretMax, pretActiv, query }),
    [sector, status, camere, sortare, pretMax, pretActiv, query],
  )

  // WebMCP (v461): unealta filter_projects pune filtrele din bara laterala (aceleasi valori ca butoanele)
  // si raspunde cu ansamblurile afisate. Porneste de la zero la fiecare apel (filtrele nespecificate = Toate).
  const rezultateRef = useRef(null)
  useEffect(() => {
    const mc = modelContext()
    if (!mc) return
    const ctrl = new AbortController()
    const sectoare = [...new Set(ANSAMBLURI_ACTIVE.map(a => a.sector))].sort()
    const STADII = { finished: 'finalizat', under_construction: 'constructie', promotion: 'promotie' }
    const CAMERE = { studio: '1', '2': '2', '3': '3', '4+': '4+' }
    const SORT = { price_asc: 'pret_asc', price_desc: 'pret_desc', newest: 'numar_desc' }
    const camerePosibile = Object.keys(CAMERE).filter(k => camereDinDate.includes(CAMERE[k]))
    inregistreazaToate(mc, [{
      name: 'filter_projects',
      title: 'Filter the residential projects on this page',
      description: 'Applies the filters on this page (sector, stage, rooms, maximum "from" price, text) to the list of Neofort IMO residential projects for sale, shows the result and returns the projects now listed. Unspecified filters are cleared.',
      inputSchema: {
        type: 'object',
        properties: {
          sector: { type: 'string', enum: sectoare },
          stage: { type: 'string', enum: Object.keys(STADII), description: 'finished = ready to move in; promotion = projects with promotional prices.' },
          rooms: { type: 'string', enum: camerePosibile, description: 'Projects that have this apartment type.' },
          max_price_eur: { type: 'number', description: `Maximum "from" price in EUR excluding VAT (${PRET_FILTRU_MIN}–${PRET_FILTRU_MAX}).` },
          text: { type: 'string', maxLength: 60, description: 'Free text: area, street, project name, e.g. "Titan" or "metrou".' },
          sort: { type: 'string', enum: Object.keys(SORT) },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: true },
      execute: async (input = {}) => {
        const f = {
          sector: input.sector && sectoare.includes(input.sector) ? input.sector : 'Toate',
          status: STADII[input.stage] || 'Toate',
          camere: CAMERE[input.rooms] && camereDinDate.includes(CAMERE[input.rooms]) ? CAMERE[input.rooms] : 'Toate',
          sortare: SORT[input.sort] || 'default',
          pretActiv: typeof input.max_price_eur === 'number' && input.max_price_eur > 0,
          pretMax: PRET_FILTRU_MAX,
          query: typeof input.text === 'string' ? input.text.slice(0, 60) : '',
        }
        if (f.pretActiv) f.pretMax = Math.min(PRET_FILTRU_MAX, Math.max(PRET_FILTRU_MIN, Math.round(input.max_price_eur)))
        setSector(f.sector); setStatus(f.status); setCamere(f.camere); setSortare(f.sortare)
        setPretMax(f.pretMax); setPretActiv(f.pretActiv); setQuery(f.query)
        await dupaRandare()
        aduInEcran(rezultateRef.current)
        const lista = filtreaza(f)
        return inLimita(
          `${lista.length} din ${ANSAMBLURI_ACTIVE.length} ansambluri afișate acum pe pagină${f.pretActiv ? ` (preț „de la” până la ${new Intl.NumberFormat('ro-RO').format(f.pretMax)} €)` : ''}. Prețuri „de la”, în EUR + TVA 21%.`,
          lista.map(a => `${a.nume} · ${a.zona}, ${a.sector} · ${a.dataPredare === 'Finalizat' ? 'Finalizat' : `În construcție, predare ${a.dataPredare}`} · de la ${formatPret(a.pretDeLa)} · ${a.tipuri.join(', ')} · /ansamblu-rezidential/${a.slug}`),
          lista.length ? '' : 'Niciun ansamblu nu corespunde; încearcă mai puține filtre.',
          'Adaugă un filtru.',
        )
      },
    }], ctrl.signal)
    return () => ctrl.abort()
  }, [camereDinDate])

  function resetFiltre() {
    setSector('Toate'); setStatus('Toate'); setCamere('Toate')
    setSortare('default'); setPretMax(1500000); setPretActiv(false); setQuery('')
  }

  const filtreActive = sector !== 'Toate' || status !== 'Toate' || camere !== 'Toate' || pretActiv || query.trim() !== ''
  const nrFiltreActive = [
    sector !== 'Toate', status !== 'Toate', camere !== 'Toate', pretActiv, query.trim() !== '',
  ].filter(Boolean).length

  // Search input — folosit în sidebar desktop SI în panel mobil prin SidebarContent
  const SearchInput = (
    <div className="mb-5">
      <label htmlFor="search-ansambluri" className="text-xs font-medium text-gray-700 mb-2 block">Caută</label>
      <div className="relative">
        <input
          id="search-ansambluri"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Zonă, tip, sector..."
          className="w-full text-xs border border-gray-200 rounded-lg pl-8 pr-7 py-2 bg-white text-gray-700 outline-none focus:border-green-500 transition-colors"
        />
        <svg className="absolute left-2.5 top-2 text-gray-400 pointer-events-none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        {query && (
          <button onClick={() => setQuery('')} aria-label="Șterge căutarea"
            className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-600 text-xs leading-none w-4 h-4 flex items-center justify-center">✕</button>
        )}
      </div>
      {query.trim() && (
        <p className="text-[10px] text-gray-400 mt-1">
          {filtered.length === 0 ? 'Niciun rezultat' : `${filtered.length} rezultate`}
          {filtered.length === 0 && (
            <button onClick={() => setQuery('')} className="ml-1 underline" style={{ color: '#2d7a3a' }}>Șterge</button>
          )}
        </p>
      )}
    </div>
  )

  // Continutul filtrelor — identic pe desktop sidebar si mobil panel
  const SidebarContent = (
    <>
      {SearchInput}
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-700 mb-2">Sector</p>
        <div className="space-y-1">
          {SECTOARE.map(s => (
            <button key={s} onClick={() => setSector(s)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${sector === s ? 'font-medium text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              style={sector === s ? { background: '#2d7a3a' } : {}}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-700 mb-2">Status</p>
        <div className="space-y-1">
          {STATUSURI.map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${status === s ? 'font-medium text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              style={status === s ? { background: '#2d7a3a' } : {}}>
              {s === 'Toate' ? 'Toate' : STATUS_CFG[s]?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-700 mb-2">Camere</p>
        <div className="flex flex-wrap gap-1.5">
          {camereDinDate.map(c => (
            <button key={c} onClick={() => setCamere(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all border ${camere === c ? 'text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              style={camere === c ? { background: '#2d7a3a', borderColor: '#2d7a3a' } : {}}>
              {c === '1' ? 'Garso' : c === 'Toate' ? 'Toate' : `${c} cam.`}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <p className="text-xs font-medium text-gray-700 mb-1">Preț maxim</p>
        <p className="text-xs mb-2" style={{ color: pretActiv ? '#2d7a3a' : '#9ca3af' }}>
          {pretActiv ? `Până la ${new Intl.NumberFormat('ro-RO').format(pretMax)}€` : 'Toate prețurile'}
        </p>
        <label className="sr-only" htmlFor="range-buget">Buget</label>
        <input id="range-buget" type="range" min={60000} max={1500000} step={10000}
          value={pretMax}
          onChange={e => { setPretMax(Number(e.target.value)); setPretActiv(true) }}
          onMouseDown={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          className="w-full"
          style={{ accentColor: '#2d7a3a', touchAction: 'none' }}
        />
        <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
          <span>60K€</span><span>1.5M€</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">Sortare</p>
        <label className="sr-only" htmlFor="sortare-select">Sortare</label>
        <select id="sortare-select" value={sortare} onChange={e => setSortare(e.target.value)}
          className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 bg-white text-gray-700 outline-none">
          {SORTARI.map(s => <option key={s.val} value={s.val}>{s.lbl}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">Tipuri</p>
        <div className="space-y-1">
          {[
            { href: '/apartamente/garsoniere-bucuresti', label: 'Garsoniere' },
            { href: '/apartamente/apartamente-2-camere-bucuresti', label: '2 camere' },
            { href: '/apartamente/apartamente-3-camere-bucuresti', label: '3 camere' },
            { href: '/apartamente/apartamente-4-camere-bucuresti', label: '4 camere' },
            { href: '/apartamente/apartamente-noi-cu-metrou-bucuresti', label: 'Cu metrou' },
            { href: '/apartamente/apartamente-noi-finalizate-bucuresti', label: 'Finalizate' },
          ].map(l => (
            <a key={l.href} href={l.href}
              className="block text-xs px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all">
              → {l.label}
            </a>
          ))}
        </div>
      </div>
      {filtreActive && (
        <button onClick={resetFiltre}
          className="w-full py-2 rounded-lg text-xs border border-gray-200 text-gray-500 hover:bg-gray-50">
          Resetează toate
        </button>
      )}
    </>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">

      {/* REZULTATE COUNT + VIEW TOGGLE */}
      <div ref={rezultateRef} className="flex items-center justify-between mb-6 flex-wrap gap-3" style={{ scrollMarginTop: 90 }}>
        <p className="text-sm text-gray-500">
          {filtered.length} din {ANSAMBLURI_ACTIVE.length} ansambluri
          {filtreActive && (
            <button onClick={resetFiltre} className="ml-2 text-xs underline" style={{ color: '#2d7a3a' }}>
              Resetează filtrele
            </button>
          )}
        </p>
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5 bg-gray-50">
          <button onClick={() => setView('grid')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>Grid
          </button>
          <button onClick={() => setView('lista')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${view === 'lista' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            </svg>Listă
          </button>
        </div>
      </div>

      {/* BUTON FILTRE — doar pe mobil */}
      <div className="lg:hidden mb-3">
        <button
          onClick={() => setFiltreOpen(o => !o)}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
          style={{
            borderColor: filtreOpen ? '#2d7a3a' : '#e5e7eb',
            background: filtreOpen ? '#f0faf2' : '#fff',
            color: filtreOpen ? '#2d7a3a' : '#374151',
          }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
          </svg>
          Filtre &amp; Căutare
          {nrFiltreActive > 0 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full text-white ml-1" style={{ background: '#2d7a3a' }}>
              {nrFiltreActive}
            </span>
          )}
          <svg className="ml-auto transition-transform" style={{ transform: filtreOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        {filtreOpen && (
          <div className="mt-1 bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Filtre</h2>
            {SidebarContent}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* SIDEBAR FILTRE — doar desktop, permanent vizibil */}
        <aside className="hidden lg:block lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-[82px]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Filtre</h2>
            {SidebarContent}
          </div>
        </aside>

        {/* REZULTATE — carduri încep la același nivel cu sidebar-ul */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-gray-500 text-sm mb-3">Niciun ansamblu nu corespunde filtrelor.</p>
              <button onClick={resetFiltre} className="text-xs px-4 py-2 rounded-lg text-white" style={{ background: '#2d7a3a' }}>
                Resetează filtrele
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((a, cardIdx) => {
                const sc = STATUS_CFG[a.dataPredare === 'Finalizat' ? 'activ' : 'constructie']
                return (
                  <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                    className="group bg-white rounded-xl border border-gray-300 overflow-hidden hover:shadow-md transition-all hover:border-gray-500">
                    <div className="relative bg-gray-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      {a.imagini?.cover ? (
                        <img src={a.imagini.cover} alt={a.imagini?.altTextExterior || a.nume} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" loading={cardIdx === 0 ? "eager" : "lazy"} fetchPriority={cardIdx === 0 ? "high" : "auto"} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-gray-400">Foto</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: sc.bg, color: sc.color }}>{a.dataPredare && a.dataPredare !== 'Finalizat' ? 'În construcție' : sc.label}</span>
                      {hasPromo(a) && (
                        <span className="absolute top-3 left-3 mt-[22px] text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
                          style={{ background: '#c0392b' }}>Promoție</span>
                      )}

                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{a.zona}</p>
                      <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{a.nume}</h3>
                      <p className="text-xs text-gray-500 mb-3">{a.sector} · {a.etaje}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {a.tipuri.slice(0, 3).map(t => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-gray-500">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-gray-500">De la</span>
                        <span className="text-sm font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(a.pretDeLa)}</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((a, cardIdx) => {
                const sc = STATUS_CFG[a.dataPredare === 'Finalizat' ? 'activ' : 'constructie']
                return (
                  <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all hover:border-gray-200 flex">
                    <div className="w-32 md:w-48 flex-shrink-0 bg-gray-100 flex items-center justify-center relative">
                      <span className="text-xs text-gray-400">Foto</span>
                      <span className="absolute top-2 left-2 text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                        style={{ background: sc.bg, color: sc.color }}>{a.dataPredare && a.dataPredare !== 'Finalizat' ? 'În construcție' : sc.label}</span>
                      {hasPromo(a) && (
                        <span className="absolute top-2 left-2 mt-[18px] text-[9px] font-medium px-1.5 py-0.5 rounded-full text-white"
                          style={{ background: '#c0392b' }}>Promoție</span>
                      )}
                    </div>
                    <div className="flex-1 p-4 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{a.zona} · {a.sector}</p>
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">{a.nume}</h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[10px] text-gray-500">De la</div>
                          <div className="text-base font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(a.pretDeLa)}</div>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span>{a.etaje}</span><span>·</span>
                        <span>{a.tipuri.join(', ')}</span>
                        
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {a.puncteInteres?.filter(p => p.tip === 'metrou').slice(0, 2).map(p => (
                          <span key={p.nume} className="text-[9px] px-1.5 py-0.5 bg-blue-50 border border-blue-100 rounded text-blue-600">
                            🚇 {p.nume.replace('Metrou ', '')} — {p.distanta}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* SEO TEXT */}
          <div className="mt-10 bg-white rounded-xl border border-gray-100 p-6">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Apartamente noi în București — direct de la dezvoltator</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Neofort IMO comercializează apartamente noi în ansambluri rezidențiale din București, în Sectoarele 2, 3 și 6.
              Toate proiectele sunt vândute direct de la sursă, fără comision de agenție.
              Portofoliul activ include {NR_ACTIVE} ansambluri cu apartamente de la 1 cameră până la penthouse, în zone cu acces rapid la metrou,
              centre comerciale și facilități urban-rezidențiale. Cu {ANI_EXPERIENTA} ani de experiență și {NR_LIVRATE}+ proiecte livrate din 2009,
              Neofort IMO este una dintre companiile de referință în domeniul locuințelor noi din București.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
