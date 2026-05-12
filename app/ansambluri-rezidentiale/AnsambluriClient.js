'use client'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ANSAMBLURI_ACTIVE, formatPret } from '@/data/ansambluri'

const STATUS_CFG = {
  constructie: { label: 'În construcție', bg: '#e3f2fd', color: '#1565c0' },
  activ:        { label: 'Finalizat',      bg: '#e8f5e9', color: '#2d7a3a' },
  promotie:     { label: 'Promoție',       bg: '#fff3e0', color: '#c8922a' },
  vandut:        { label: 'Vândut',         bg: '#fff7ed', color: '#c2410c' },
}
const SECTOARE = ['Toate', 'Sector 2', 'Sector 3', 'Sector 6']
const STATUSURI = ['Toate', 'constructie', 'activ', 'promotie']
const SORTARI = [
  { val: 'default',    lbl: 'Relevanță' },
  { val: 'pret_asc',   lbl: 'Preț ↑' },
  { val: 'pret_desc',  lbl: 'Preț ↓' },
  { val: 'numar_desc', lbl: 'Cel mai nou' },
]

export default function AnsambluriClient() {
  const [sector, setSector]       = useState('Toate')
  const [status, setStatus]       = useState('Toate')
  const [camere, setCamere]       = useState('Toate')
  const [sortare, setSortare]     = useState('default')
  const [view, setView]           = useState('grid')
  const [pretMax, setPretMax]     = useState(1500000)
  const [pretActiv, setPretActiv] = useState(false)

  const camereDinDate = useMemo(() => {
    const set = new Set()
    ANSAMBLURI_ACTIVE.forEach(a => a.tipuri.forEach(t => {
      const tl = t.toLowerCase()
      if (tl.includes('garsonier') || tl.includes('studio')) set.add('1')
      const m = t.match(/^(\d+)\s+camere/)
      if (m) set.add(Number(m[1]) >= 4 ? '4+' : m[1])
    }))
    return ['Toate', ...['1','2','3','4+'].filter(c => set.has(c))]
  }, [])

  const filtered = useMemo(() => {
    let list = [...ANSAMBLURI_ACTIVE]
    if (sector !== 'Toate') list = list.filter(a => a.sector === sector)
    if (status !== 'Toate') list = list.filter(a => a.status === status)
    if (pretActiv) list = list.filter(a => a.pretDeLa <= pretMax)
    if (camere !== 'Toate') {
      list = list.filter(a => a.tipuri.some(t => {
        const tl = t.toLowerCase()
        if (camere === '1') return tl.includes('garsonier') || tl.includes('studio')
        if (camere === '4+') { const m = t.match(/^(\d+)\s+camere/); return m && Number(m[1]) >= 4 }
        const m = t.match(/^(\d+)\s+camere/)
        return m && m[1] === camere
      }))
    }
    if (sortare === 'pret_asc')   list.sort((a, b) => a.pretDeLa - b.pretDeLa)
    if (sortare === 'pret_desc')  list.sort((a, b) => b.pretDeLa - a.pretDeLa)
    if (sortare === 'numar_desc') list.sort((a, b) => b.numar - a.numar)
    return list
  }, [sector, status, camere, sortare, pretMax, pretActiv])

  function resetFiltre() {
    setSector('Toate'); setStatus('Toate'); setCamere('Toate')
    setSortare('default'); setPretMax(1500000); setPretActiv(false)
  }

  const filtreActive = sector !== 'Toate' || status !== 'Toate' || camere !== 'Toate' || pretActiv

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      {/* REZULTATE COUNT + VIEW TOGGLE */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
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

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR FILTRE */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-[82px]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">Filtre</h2>
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
              <label className="sr-only" htmlFor="range-buget">Buget</label><input id="range-buget" type="range" min={60000} max={1500000} step={10000}
                value={pretMax}
                onChange={e => { setPretMax(Number(e.target.value)); setPretActiv(true) }}
                onMouseDown={e => e.stopPropagation()}
                onTouchStart={e => e.stopPropagation()}
                onTouchMove={e => e.stopPropagation()}
                className="w-full"
                style={{ accentColor: '#2d7a3a', touchAction: 'none' }}
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>60K€</span><span>1.5M€</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs font-medium text-gray-700 mb-2">Sortare</p>
              <label className="sr-only" htmlFor="sortare-select">Sortare</label><select id="sortare-select" value={sortare} onChange={e => setSortare(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 bg-white text-gray-700 outline-none">
                {SORTARI.map(s => <option key={s.val} value={s.val}>{s.lbl}</option>)}
              </select>
            </div>
            {filtreActive && (
              <button onClick={resetFiltre}
                className="w-full py-2 rounded-lg text-xs border border-gray-200 text-gray-500 hover:bg-gray-50">
                Resetează toate
              </button>
            )}
          </div>
        </aside>

        {/* REZULTATE */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-gray-400 text-sm mb-3">Niciun ansamblu nu corespunde filtrelor.</p>
              <button onClick={resetFiltre} className="text-xs px-4 py-2 rounded-lg text-white" style={{ background: '#2d7a3a' }}>
                Resetează filtrele
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((a, cardIdx) => {
                const sc = STATUS_CFG[a.status]
                return (
                  <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                    className="group bg-white rounded-xl border border-gray-300 overflow-hidden hover:shadow-md transition-all hover:border-gray-500">
                    <div className="relative bg-gray-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                      {a.imagini?.cover ? (
                        <img src={a.imagini.cover} alt={a.nume} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" loading={cardIdx === 0 ? "eager" : "lazy"} fetchPriority={cardIdx === 0 ? "high" : "auto"} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-gray-400">Foto</span>
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                      {a.dataPredare && a.dataPredare !== 'Finalizat' && (
                        <span className="absolute bottom-3 left-3 text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white">
                          Predare {a.dataPredare}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{a.zona}</p>
                      <h3 className="text-sm font-medium text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{a.nume}</h3>
                      <p className="text-xs text-gray-500 mb-3">{a.sector} · {a.etaje}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {a.tipuri.slice(0, 3).map(t => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-gray-500">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] text-gray-400">De la</span>
                        <span className="text-sm font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(a.pretDeLa)}€</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((a, cardIdx) => {
                const sc = STATUS_CFG[a.status]
                return (
                  <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all hover:border-gray-200 flex">
                    <div className="w-32 md:w-48 flex-shrink-0 bg-gray-100 flex items-center justify-center relative">
                      <span className="text-xs text-gray-400">Foto</span>
                      <span className="absolute top-2 left-2 text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                        style={{ background: sc.bg, color: sc.color }}>{sc.label}</span>
                    </div>
                    <div className="flex-1 p-4 min-w-0">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="min-w-0">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{a.zona} · {a.sector}</p>
                          <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">{a.nume}</h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[10px] text-gray-400">De la</div>
                          <div className="text-base font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(a.pretDeLa)}€</div>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span>{a.etaje}</span>
                        <span>·</span>
                        <span>{a.tipuri.join(', ')}</span>
                        {a.dataPredare && a.dataPredare !== 'Finalizat' && <><span>·</span><span>Predare {a.dataPredare}</span></>}
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
              Portofoliul activ include 12 ansambluri cu apartamente de la 1 cameră până la penthouse, în zone cu acces rapid la metrou,
              centre comerciale și facilități urban-rezidențiale. Cu 17 ani de experiență și 85+ proiecte livrate din 2009,
              Neofort IMO este una dintre companiile de referință în domeniul locuințelor noi din București.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
