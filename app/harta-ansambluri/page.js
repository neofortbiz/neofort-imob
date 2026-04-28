'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ANSAMBLURI_ACTIVE, formatPret } from '@/data/ansambluri'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'

// Coordonate GPS exacte din KMZ
const COORDS = {
  // Active
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
  // Portofoliu
  45: [44.3765408, 26.1107889], 46: [44.4569346, 26.127123],
  47: [44.4909062, 26.0917144], 48: [44.4983112, 26.0385417],
  51: [44.4236472, 26.1423271], 52: [44.4313589, 26.1291307],
  53: [44.4226206, 26.1089659], 54: [44.4192067, 26.1322474],
  55: [44.4905394, 26.093195],  57: [44.4350162, 26.1247413],
  58: [44.4304912, 26.1167443], 59: [44.4091895, 26.1251825],
  60: [44.4179653, 26.1148024], 61: [44.3825663, 26.1967278],
  62: [44.4455849, 26.0314209], 63: [44.465871,  26.1780596],
  64: [44.4436292, 26.1247078], 65: [44.455156,  26.1435959],
  66: [44.4352048, 26.1082149], 67: [44.4845726, 26.0510517],
  68: [44.4596323, 26.0676436], 69: [44.4419611, 26.1229455],
  70: [44.4688318, 26.1744977], 71: [44.4728848, 26.1480947],
  72: [44.4667516, 26.1698843], 73: [44.4470319, 26.061523],
  74: [44.5026652, 26.0556489], 75: [44.4709862, 26.1251663],
  77: [44.4839924, 26.1400743], 79: [44.4334974, 26.1256471],
  80: [44.4193488, 26.0963926], 81: [44.4459578, 26.1664681],
  82: [44.413078,  26.1920446], 85: [44.4909062, 26.0917144],
}

// Culori conform instructiunilor:
// verde = activ (finalizat), albastru = constructie, rosu = promotie
// portocaliu = portofoliu (vandut), gri = retras
const STATUS_COLORS = {
  activ:       { fill: '#2d7a3a', label: 'Activ' },
  constructie: { fill: '#2563eb', label: 'In constructie' },
  promotie:    { fill: '#dc2626', label: 'Promotie' },
  vandut:      { fill: '#f97316', label: 'Vandut' },
  retras:      { fill: '#9ca3af', label: 'Retras' },
}

function project(lat, lng, bounds, W, H) {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * W
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * H
  return { x, y }
}

// Google Maps Embed API key not needed for basic embed
const GMAPS_CENTER = '44.432,26.115'
const GMAPS_ZOOM = 12

export default function HartaPage() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('toate')
  const [showPortofoliu, setShowPortofoliu] = useState(true)

  // Combinam active + portofoliu
  const activeMarkers = ANSAMBLURI_ACTIVE.map(a => ({
    ...a,
    coords: COORDS[a.numar],
    categorie: 'activ_vanzare',
  })).filter(a => a.coords)

  const portofoliuMarkers = TOATE_PORTOFOLIU.map(a => ({
    ...a,
    status: 'vandut',
    categorie: 'portofoliu',
    pretDeLa: a.preturi?.[0]?.pret || 0,
    slug: a.slug,
    zona: a.zona,
    sector: a.sector,
    coords: COORDS[a.numar],
  })).filter(a => a.coords)

  const allMarkers = [
    ...activeMarkers,
    ...(showPortofoliu ? portofoliuMarkers : []),
  ]

  const filtered = filter === 'toate'
    ? allMarkers
    : filter === 'portofoliu'
    ? portofoliuMarkers
    : activeMarkers.filter(a => a.status === filter)

  // Bounds pentru SVG overlay
  const allCoords = Object.values(COORDS)
  const bounds = {
    minLat: Math.min(...allCoords.map(c => c[0])) - 0.02,
    maxLat: Math.max(...allCoords.map(c => c[0])) + 0.02,
    minLng: Math.min(...allCoords.map(c => c[1])) - 0.025,
    maxLng: Math.max(...allCoords.map(c => c[1])) + 0.025,
  }
  const W = 800, H = 560

  const sel = selected
    ? allMarkers.find(a => a.numar === selected)
    : null

  const getColor = (a) => {
    if (a.categorie === 'portofoliu') return STATUS_COLORS.vandut.fill
    return STATUS_COLORS[a.status]?.fill || '#6b7280'
  }

  return (
    <>
      <Header activePath="/harta-ansambluri" />
      <main className="min-h-screen bg-gray-50">

        {/* HEADER */}
        <div className="border-b border-gray-100 py-4 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasa</Link>
              <span>›</span>
              <span className="text-gray-900">Harta ansambluri</span>
            </nav>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-xl font-medium text-gray-900">Harta Ansambluri Neofort IMO</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {activeMarkers.length} active + {portofoliuMarkers.length} portofoliu — coordonate GPS exacte
                </p>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                {/* Toggle portofoliu */}
                <button
                  onClick={() => setShowPortofoliu(!showPortofoliu)}
                  className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                  style={{
                    background: showPortofoliu ? '#f97316' : 'white',
                    borderColor: showPortofoliu ? '#f97316' : '#e5e7eb',
                    color: showPortofoliu ? 'white' : '#6b7280',
                  }}>
                  {showPortofoliu ? '● Portofoliu vizibil' : '○ Portofoliu ascuns'}
                </button>
                {/* Filtre active */}
                {['toate','activ','constructie','promotie'].map(s => (
                  <button key={s} onClick={() => setFilter(s)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                    style={{
                      background: filter === s ? (STATUS_COLORS[s]?.fill || '#1f2937') : 'white',
                      borderColor: filter === s ? 'transparent' : '#e5e7eb',
                      color: filter === s ? 'white' : '#6b7280',
                    }}>
                    {s === 'toate' ? 'Toate active' : STATUS_COLORS[s]?.label || s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

            {/* HARTA */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative" style={{ height: 560 }}>

              {/* Google Maps ca fundal real */}
              <iframe
                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFmBWY&center=${GMAPS_CENTER}&zoom=${GMAPS_ZOOM}&maptype=roadmap`}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* SVG overlay cu pinuri calibrate peste Google Maps */}
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'none' }}
              >
                {allMarkers.map(a => {
                  const pos = project(a.coords[0], a.coords[1], bounds, W, H)
                  const isFiltered = filter !== 'toate' && a.categorie !== 'portofoliu' && a.status !== filter
                  const isHidden = !showPortofoliu && a.categorie === 'portofoliu'
                  if (isHidden) return null
                  const isSel = selected === a.numar
                  const color = getColor(a)
                  const r = isSel ? 15 : (a.categorie === 'portofoliu' ? 8 : 11)

                  return (
                    <g key={a.numar}
                      style={{ cursor: 'pointer', opacity: isFiltered ? 0.15 : 1, pointerEvents: 'all' }}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => setSelected(selected === a.numar ? null : a.numar)}
                    >
                      {isSel && <circle r={r + 8} fill={color} opacity="0.2" />}
                      <circle r={r} fill={color} stroke="white" strokeWidth="2"
                        filter={isSel ? 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'} />
                      {r >= 10 && (
                        <text textAnchor="middle" dy="0.35em"
                          fontSize={isSel ? 9 : 7} fontWeight="700"
                          fill="white" fontFamily="system-ui,sans-serif"
                          style={{ pointerEvents: 'none' }}>
                          {a.numar}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Legenda */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur rounded-xl px-3 py-2 shadow-md text-xs flex flex-wrap gap-x-4 gap-y-1.5 max-w-xs">
                {Object.entries(STATUS_COLORS).map(([s, v]) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: v.fill }} />
                    <span className="text-gray-600">{v.label}</span>
                  </div>
                ))}
              </div>

              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-[10px] text-gray-500 shadow">
                {allMarkers.filter(a => !(!showPortofoliu && a.categorie === 'portofoliu')).length} pin-uri afisate
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="flex flex-col gap-2 overflow-y-auto pr-1" style={{ maxHeight: 560 }}>

              {/* Active */}
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1">
                Active la vanzare ({activeMarkers.length})
              </div>
              {filtered.filter(a => a.categorie !== 'portofoliu').map(a => {
                const isSel = selected === a.numar
                const color = getColor(a)
                return (
                  <div key={a.numar}
                    onClick={() => setSelected(isSel ? null : a.numar)}
                    className="bg-white rounded-xl border p-3 cursor-pointer transition-all hover:shadow-md flex-shrink-0"
                    style={{ borderColor: isSel ? color : '#e5e7eb', borderWidth: isSel ? 2 : 1 }}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                        style={{ background: color }}>{a.numar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{a.zona}</p>
                        <p className="text-[10px] text-gray-400">{a.sector} · {a.dataPredare}</p>
                      </div>
                      <span className="text-xs font-bold flex-shrink-0" style={{ color }}>
                        {formatPret(a.pretDeLa)}€
                      </span>
                    </div>
                    {isSel && (
                      <Link href={`/ansamblu-rezidential/${a.slug}`}
                        className="mt-2 block text-center text-xs py-1.5 rounded-lg text-white font-medium"
                        style={{ background: color }}
                        onClick={e => e.stopPropagation()}>
                        Vezi detalii →
                      </Link>
                    )}
                  </div>
                )
              })}

              {/* Portofoliu */}
              {showPortofoliu && (
                <>
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mt-2">
                    Portofoliu vandut ({portofoliuMarkers.length})
                  </div>
                  {portofoliuMarkers.slice(0, 10).map(a => {
                    const isSel = selected === a.numar
                    const color = STATUS_COLORS.vandut.fill
                    return (
                      <div key={a.numar}
                        onClick={() => setSelected(isSel ? null : a.numar)}
                        className="bg-white rounded-xl border p-2.5 cursor-pointer transition-all hover:shadow-sm flex-shrink-0"
                        style={{ borderColor: isSel ? color : '#e5e7eb', borderWidth: isSel ? 2 : 1 }}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                            style={{ background: color }}>{a.numar}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-700 truncate">{a.zona}</p>
                            <p className="text-[10px] text-gray-400">{a.sector}</p>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                            style={{ background: '#fff7ed', color: '#c2410c' }}>vandut</span>
                        </div>
                        {isSel && (
                          <Link href={`/portofoliu/${a.slug}`}
                            className="mt-2 block text-center text-xs py-1 rounded-lg text-white font-medium"
                            style={{ background: color }}
                            onClick={e => e.stopPropagation()}>
                            Vezi portofoliu →
                          </Link>
                        )}
                      </div>
                    )
                  })}
                  {portofoliuMarkers.length > 10 && (
                    <p className="text-[10px] text-gray-400 text-center py-1">
                      +{portofoliuMarkers.length - 10} mai multe in portofoliu
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* DETALII SELECTED */}
          {sel && (
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{sel.nume}</h2>
                  <p className="text-sm text-gray-500">{sel.adresa || sel.zona + ', ' + sel.sector}</p>
                  <p className="text-[10px] font-mono text-gray-300 mt-0.5">
                    GPS: {COORDS[sel.numar]?.[0].toFixed(5)}, {COORDS[sel.numar]?.[1].toFixed(5)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {sel.pretDeLa > 0 && (
                    <div>
                      <p className="text-base font-bold" style={{ color: getColor(sel) }}>
                        {sel.categorie === 'portofoliu' ? 'De la ' : 'De la '}{formatPret ? formatPret(sel.pretDeLa) : sel.pretDeLa.toLocaleString()}€
                      </p>
                      <p className="text-xs text-gray-400">{sel.categorie === 'portofoliu' ? 'Pret istoric' : 'Pret curent'}</p>
                    </div>
                  )}
                  <Link
                    href={sel.categorie === 'portofoliu' ? `/portofoliu/${sel.slug}` : `/ansamblu-rezidential/${sel.slug}`}
                    className="text-sm px-4 py-2 rounded-xl text-white font-medium"
                    style={{ background: getColor(sel) }}>
                    Detalii →
                  </Link>
                </div>
              </div>
              {sel.puncteInteres && (
                <div className="flex flex-wrap gap-2">
                  {sel.puncteInteres.slice(0, 5).map((p, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-50 rounded-full text-gray-600 border border-gray-100">
                      {p.nume} · {p.distanta}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
