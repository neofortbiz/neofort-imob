'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ANSAMBLURI_ACTIVE, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

const COORDS = {
  8:  [44.4354217, 26.1279513],
  11: [44.4473536, 26.1084509],
  28: [44.4111925, 26.1984279],
  42: [44.4291117, 26.1403193],
  44: [44.4156357, 26.1774158],
  49: [44.4311005, 26.0128833],
  50: [44.4339214, 26.1724109],
  56: [44.4198935, 26.1825817],
  76: [44.4336802, 25.9980512],
  78: [44.4465529, 26.1198788],
  83: [44.4084817, 26.1952803],
  84: [44.4185591, 26.2047540],
}

const STATUS_COLORS = {
  constructie: '#f59e0b',
  activ: '#2d7a3a',
  promotie: '#dc2626',
}

function project(lat, lng, bounds, W, H) {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * W
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * H
  return { x, y }
}

export default function HartaPage() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('toate')

  const ansambluri = ANSAMBLURI_ACTIVE.map(a => ({ ...a, coords: COORDS[a.numar] })).filter(a => a.coords)
  const filtered = filter === 'toate' ? ansambluri : ansambluri.filter(a => a.status === filter)

  const lats = ansambluri.map(a => a.coords[0])
  const lngs = ansambluri.map(a => a.coords[1])
  const bounds = {
    minLat: Math.min(...lats) - 0.018,
    maxLat: Math.max(...lats) + 0.018,
    minLng: Math.min(...lngs) - 0.025,
    maxLng: Math.max(...lngs) + 0.025,
  }

  const W = 800, H = 560
  const sel = selected ? ansambluri.find(a => a.numar === selected) : null

  return (
    <>
      <Header activePath="/harta-ansambluri" />
      <main className="min-h-screen bg-gray-50">
        <div className="border-b border-gray-100 py-4 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasa</Link>
              <span>›</span>
              <span className="text-gray-900">Harta ansambluri</span>
            </nav>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-xl font-medium text-gray-900">Harta Ansambluri Rezidentiale Bucuresti</h1>
                <p className="text-sm text-gray-500 mt-0.5">{ANSAMBLURI_ACTIVE.length} ansambluri active — localizare GPS exacta din KMZ oficial</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {['toate','activ','constructie','promotie'].map(s => (
                  <button key={s} onClick={() => setFilter(s)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                    style={{
                      background: filter === s ? (STATUS_COLORS[s] || '#1f2937') : 'white',
                      borderColor: filter === s ? 'transparent' : '#e5e7eb',
                      color: filter === s ? 'white' : '#6b7280',
                    }}>
                    {s === 'toate' ? 'Toate' : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

            {/* SVG HARTA */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative" style={{ height: 560 }}>
              <svg viewBox={\`0 0 \${W} \${H}\`} className="w-full h-full">
                <rect x="0" y="0" width={W} height={H} fill="#f8fafc" />
                {[0.2,0.4,0.6,0.8].map(t => (
                  <g key={t}>
                    <line x1={W*t} y1={0} x2={W*t} y2={H} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,6" />
                    <line x1={0} y1={H*t} x2={W} y2={H*t} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,6" />
                  </g>
                ))}

                {/* Raza medie intre ansambluri - indicare zona Bucuresti */}
                <ellipse cx={W*0.52} cy={H*0.45} rx={W*0.38} ry={H*0.4}
                  fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="8,4" opacity="0.5" />
                <text x={W*0.52} y={H*0.08} textAnchor="middle" fontSize="11" fill="#94a3b8" fontFamily="system-ui">
                  BUCURESTI
                </text>

                {ansambluri.map(a => {
                  const pos = project(a.coords[0], a.coords[1], bounds, W, H)
                  const isFiltered = filter !== 'toate' && a.status !== filter
                  const isSel = selected === a.numar
                  const color = STATUS_COLORS[a.status] || '#2d7a3a'
                  const r = isSel ? 16 : 11

                  return (
                    <g key={a.numar}
                      onClick={() => setSelected(selected === a.numar ? null : a.numar)}
                      style={{ cursor: 'pointer', opacity: isFiltered ? 0.15 : 1 }}
                      transform={\`translate(\${pos.x}, \${pos.y})\`}
                    >
                      {isSel && <circle r={r+8} fill={color} opacity="0.15" />}
                      <circle r={r} fill={color} stroke="white" strokeWidth="2.5" filter={isSel ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : undefined} />
                      <text textAnchor="middle" dy="0.35em" fontSize={isSel ? 9 : 7} fontWeight="700" fill="white" fontFamily="system-ui,sans-serif">
                        {a.numar}
                      </text>
                      {isSel && (
                        <text textAnchor="middle" dy={-r-6} fontSize={9} fontWeight="600" fill="#1e293b" fontFamily="system-ui,sans-serif">
                          N{a.numar} {a.zona}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Legenda */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur rounded-lg px-3 py-2 shadow text-xs flex gap-3 flex-wrap">
                {Object.entries(STATUS_COLORS).map(([s,c]) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: c }} />
                    <span className="text-gray-600 capitalize">{s}</span>
                  </div>
                ))}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 rounded-lg px-2 py-1 text-[10px] text-gray-400">
                Coordonate GPS exacte din KMZ
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: 560 }}>
              {filtered.map(a => {
                const isSel = selected === a.numar
                const color = STATUS_COLORS[a.status] || '#2d7a3a'
                return (
                  <div key={a.numar}
                    onClick={() => setSelected(isSel ? null : a.numar)}
                    className="bg-white rounded-xl border p-3 cursor-pointer transition-all hover:shadow-md"
                    style={{ borderColor: isSel ? color : '#e5e7eb', borderWidth: isSel ? 2 : 1 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                            style={{ background: color }}>
                            {a.numar}
                          </div>
                          <span className="text-xs font-semibold text-gray-900 truncate">{a.zona}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mb-1">{a.sector} · {a.dataPredare}</p>
                        <p className="text-xs font-bold" style={{ color }}>De la {formatPret(a.pretDeLa)}</p>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0 font-medium"
                        style={{ background: color + '20', color }}>
                        {a.status}
                      </span>
                    </div>
                    {isSel && (
                      <Link href={\`/ansamblu-rezidential/\${a.slug}\`}
                        className="mt-2 block text-center text-xs py-1.5 rounded-lg text-white font-medium"
                        style={{ background: color }}
                        onClick={e => e.stopPropagation()}>
                        Vezi detalii complet →
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {sel && (
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{sel.nume}</h2>
                  <p className="text-sm text-gray-500">{sel.adresa}</p>
                  <p className="text-xs text-gray-300 mt-0.5 font-mono">
                    {COORDS[sel.numar]?.[0].toFixed(6)}, {COORDS[sel.numar]?.[1].toFixed(6)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-lg font-bold" style={{ color: STATUS_COLORS[sel.status] }}>
                      {formatPret(sel.pretDeLa)}
                    </p>
                    <p className="text-xs text-gray-400">Pret de la</p>
                  </div>
                  <Link href={\`/ansamblu-rezidential/\${sel.slug}\`}
                    className="text-sm px-4 py-2 rounded-xl text-white font-medium"
                    style={{ background: STATUS_COLORS[sel.status] || '#2d7a3a' }}>
                    Detalii →
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {sel.puncteInteres.slice(0,6).map((p, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-gray-50 rounded-full text-gray-600 border border-gray-100">
                    {p.nume} · {p.distanta}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
