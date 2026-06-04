'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ANSAMBLURI_ACTIVE, formatPret, hasPromo } from '@/data/ansambluri'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'

// Import dinamic - Leaflet nu merge cu SSR
const HartaLeaflet = dynamic(() => import('@/components/HartaLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-2xl">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#2d7a3a] rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm text-gray-500">Se incarca harta...</p>
      </div>
    </div>
  ),
})

const COORDS = {
  1: [44.4179, 26.132],
  2: [44.483, 26.13],
  3: [44.453, 26.152],
  4: [44.414, 26.128],
  5: [44.443, 26.121],
  6: [44.416, 26.129],
  7: [44.419, 26.131],
  8: [44.4354217, 26.1279513],
  9: [44.448, 26.119],
  10: [44.424, 26.13],
  11: [44.4473536, 26.1084509],
  12: [44.421, 26.106],
  13: [44.407, 26.11],
  14: [44.462, 26.164],
  15: [44.425, 26.137],
  16: [44.442, 26.118],
  17: [44.45, 26.117],
  18: [44.448, 26.205],
  19: [44.429, 26.138],
  20: [44.426, 26.12],
  21: [44.423, 26.089],
  22: [44.425, 26.131],
  23: [44.42, 26.125],
  24: [44.432, 26.128],
  25: [44.427, 26.119],
  26: [44.449, 26.168],
  27: [44.45, 26.103],
  28: [44.4111925, 26.1984279],
  29: [44.441, 26.122],
  30: [44.426, 26.121],
  31: [44.466, 26.175],
  32: [44.422, 26.098],
  34: [44.42, 26.097],
  35: [44.431, 26.129],
  36: [44.442, 26.12],
  37: [44.418, 26.118],
  38: [44.419, 26.117],
  39: [44.4425, 26.1225],
  40: [44.41, 26.1285],
  41: [44.4585, 26.1345],
  42: [44.4291117, 26.1403193],
  43: [44.4885, 26.0825],
  44: [44.4156357, 26.1774158],
  45: [44.3765408, 26.1107889],
  46: [44.4569346, 26.127123],
  47: [44.4909062, 26.0917144],
  48: [44.4983112, 26.0385417],
  49: [44.4311005, 26.0128833],
  50: [44.4339214, 26.1724109],
  51: [44.4236472, 26.1423271],
  52: [44.4313589, 26.1291307],
  53: [44.4226206, 26.1089659],
  54: [44.4192067, 26.1322474],
  55: [44.4905394, 26.093195],
  56: [44.4198935, 26.1825817],
  57: [44.4350162, 26.1247413],
  58: [44.4304912, 26.1167443],
  59: [44.4091895, 26.1251825],
  60: [44.4179653, 26.1148024],
  61: [44.3825663, 26.1967278],
  62: [44.4455849, 26.0314209],
  63: [44.465871, 26.1780596],
  64: [44.4436292, 26.1247078],
  65: [44.455156, 26.1435959],
  66: [44.4352048, 26.1082149],
  67: [44.4845726, 26.0510517],
  68: [44.4596323, 26.0676436],
  69: [44.4419611, 26.1229455],
  70: [44.4688318, 26.1744977],
  71: [44.4728848, 26.1480947],
  72: [44.4667516, 26.1698843],
  73: [44.4470319, 26.061523],
  74: [44.5026652, 26.0556489],
  75: [44.4709862, 26.1251663],
  76: [44.4336802, 25.9980512],
  77: [44.4839924, 26.1400743],
  78: [44.4465529, 26.1198788],
  79: [44.4334974, 26.1256471],
  80: [44.4193488, 26.0963926],
  81: [44.4459578, 26.1664681],
  82: [44.413078, 26.1920446],
  83: [44.4084817, 26.1952803],
  84: [44.4185591, 26.204754],
  85: [44.4909062, 26.0917144]
}

const STATUS_COLORS = {
  finalizat:   { fill: '#2d7a3a', label: 'Finalizat' },
  activ:       { fill: '#2d7a3a', label: 'Finalizat' },
  constructie: { fill: '#2563eb', label: 'In constructie' },
  promotie:    { fill: '#dc2626', label: 'Promotie' },
  vandut:      { fill: '#f97316', label: 'Vandut (portofoliu)' },
  retras:      { fill: '#9ca3af', label: 'Retras' },
}

export default function HartaPage() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('toate')
  const [showPortofoliu, setShowPortofoliu] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const activeMarkers = ANSAMBLURI_ACTIVE.map(a => ({
    ...a,
    coords: a.coordonate ? [a.coordonate.lat, a.coordonate.lng] : COORDS[a.numar],
    categorie: 'activ_vanzare',
    pinColor: hasPromo(a) ? 'promotie' : (a.dataPredare === 'Finalizat' ? 'activ' : 'constructie'),
  })).filter(a => a.coords)

  const portofoliuMarkers = TOATE_PORTOFOLIU.map(a => ({
    ...a,
    status: 'vandut',
    categorie: 'portofoliu',
    pretDeLa: a.preturi?.[0]?.pret || 0,
  })).filter(a => a.coords || COORDS[a.numar]).map(a => ({
    ...a, coords: a.coords || COORDS[a.numar],
  }))

  const filteredActive = filter === 'toate'
    ? activeMarkers
    : filter === 'promotie'
      ? activeMarkers.filter(a => hasPromo(a))
      : filter === 'finalizat' ? activeMarkers.filter(a => a.dataPredare === 'Finalizat')
      : activeMarkers.filter(a => a.dataPredare !== 'Finalizat')

  const sel = selected
    ? [...activeMarkers, ...portofoliuMarkers].find(a => a.slug === selected)
    : null

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
                <h1 className="text-xl font-medium text-gray-900">Harta Ansambluri Neofort IMO</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  {activeMarkers.length} active + {portofoliuMarkers.length} portofoliu
                  — OpenStreetMap, coordonate GPS exacte
                </p>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
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
                {['toate','finalizat','constructie','promotie'].map(s => (
                  <button key={s} onClick={() => setFilter(s)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                    style={{
                      background: filter === s ? (STATUS_COLORS[s]?.fill || '#1f2937') : 'white',
                      borderColor: filter === s ? 'transparent' : '#e5e7eb',
                      color: filter === s ? 'white' : '#6b7280',
                    }}>
                    {s === 'toate' ? 'Toate' : STATUS_COLORS[s]?.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

            {/* HARTA LEAFLET */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-100 relative"
              style={{ height: 580 }}>
              {mounted && (
                <HartaLeaflet
                  activeMarkers={filteredActive}
                  portofoliuMarkers={portofoliuMarkers}
                  showPortofoliu={showPortofoliu}
                  selected={selected}
                  onSelect={setSelected}
                />
              )}

              {/* Legenda */}
              <div className="absolute bottom-8 left-3 z-[1000] bg-white/95 backdrop-blur rounded-xl px-3 py-2.5 shadow-lg text-xs"
                style={{ pointerEvents: 'none' }}>
                {Object.entries(STATUS_COLORS).map(([s, v]) => (
                  <div key={s} className="flex items-center gap-2 mb-1 last:mb-0">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: v.fill }} />
                    <span className="text-gray-700">{v.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="flex flex-col gap-2 overflow-y-auto pr-0.5" style={{ maxHeight: 580 }}>

              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-1">
                La vanzare ({filteredActive.length})
              </p>

              {filteredActive.map(a => {
                const isSel = selected === a.slug
                const color = hasPromo(a) ? '#dc2626' : (a.dataPredare === 'Finalizat' ? STATUS_COLORS['finalizat'].fill : STATUS_COLORS['constructie'].fill)
                return (
                  <div key={a.numar}
                    onClick={() => setSelected(isSel ? null : a.slug)}
                    className="bg-white rounded-xl border p-3 cursor-pointer transition-all hover:shadow-md flex-shrink-0"
                    style={{ borderColor: isSel ? color : '#e5e7eb', borderWidth: isSel ? 2 : 1 }}>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                        style={{ background: color }}>{a.numar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{a.zona}</p>
                        <p className="text-[10px] text-gray-500">{a.sector}{a.dataPredare && a.dataPredare !== 'Finalizat' ? ' · ' + a.dataPredare : ''}</p>
                      </div>
                      <span className="text-xs font-bold flex-shrink-0" style={{ color }}>
                        {formatPret(a.pretDeLa)}€
                      </span>
                    </div>
                    {isSel && (
                      <Link href={'/ansamblu-rezidential/' + a.slug}
                        className="mt-2 block text-center text-xs py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                        style={{ background: color }}
                        onClick={e => e.stopPropagation()}>
                        Vezi detalii →
                      </Link>
                    )}
                  </div>
                )
              })}

              {showPortofoliu && (
                <>
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-1 mt-2">
                    Portofoliu vandut ({portofoliuMarkers.length})
                  </p>
                  {portofoliuMarkers.map(a => {
                    const isSel = selected === a.slug
                    const color = STATUS_COLORS.vandut.fill
                    return (
                      <div key={a.slug}
                        onClick={() => setSelected(isSel ? null : a.slug)}
                        className="bg-white rounded-xl border p-2.5 cursor-pointer transition-all hover:shadow-sm flex-shrink-0"
                        style={{ borderColor: isSel ? color : '#f3f4f6', borderWidth: isSel ? 2 : 1 }}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0"
                            style={{ background: color }}>{a.numar}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-700 truncate">{a.zona}</p>
                            <p className="text-[10px] text-gray-500">{a.sector}</p>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                            style={{ background: '#fff7ed', color: '#c2410c' }}>vandut</span>
                        </div>
                        {isSel && (
                          <Link href={'/portofoliu/' + a.slug}
                            className="mt-2 block text-center text-xs py-1 rounded-lg text-white font-medium"
                            style={{ background: color }}
                            onClick={e => e.stopPropagation()}>
                            Portofoliu →
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>

          {/* INFO SELECTED */}
          {sel && (
            <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">{sel.zona} — N{sel.numar}</h2>
                  <p className="text-sm text-gray-500">{sel.adresa || sel.zona + ', ' + sel.sector}</p>
                  <p className="text-[10px] font-mono text-gray-300 mt-0.5">
                    {(sel.coordonate?.lat || COORDS[sel.numar]?.[0])?.toFixed(5)}, {(sel.coordonate?.lng || COORDS[sel.numar]?.[1])?.toFixed(5)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {sel.pretDeLa > 0 && (
                    <div>
                      <p className="text-base font-bold" style={{ color: sel.categorie === 'portofoliu' ? STATUS_COLORS.vandut.fill : STATUS_COLORS[sel.status]?.fill }}>
                        {sel.pretDeLa.toLocaleString()}€
                      </p>
                      <p className="text-xs text-gray-500">{sel.categorie === 'portofoliu' ? 'Pret istoric' : 'De la'}</p>
                    </div>
                  )}
                  <Link
                    href={sel.categorie === 'portofoliu' ? '/portofoliu/' + sel.slug : '/ansamblu-rezidential/' + sel.slug}
                    className="text-sm px-4 py-2 rounded-xl text-white font-medium"
                    style={{ background: sel.categorie === 'portofoliu' ? STATUS_COLORS.vandut.fill : STATUS_COLORS[sel.status]?.fill || '#2d7a3a' }}>
                    Detalii →
                  </Link>
                </div>
              </div>
              {sel.puncteInteres && (
                <div className="flex flex-wrap gap-2">
                  {sel.puncteInteres.slice(0, 6).map((p, i) => (
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
