'use client'
import { useState } from 'react'
import Link from 'next/link'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'
import { ANI_EXPERIENTA, NR_LIVRATE } from '@/data/siteConfig'

export default function PortofoliuClient() {
  const [view, setView] = useState('grid')

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* VIEW TOGGLE */}
      <div className="flex justify-end mb-6">
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

      {view === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {TOATE_PORTOFOLIU.map(a => (
            <Link key={a.slug} href={`/portofoliu/${a.slug}`}
              className="group bg-white rounded-xl border border-gray-300 overflow-hidden hover:shadow-md transition-all hover:border-gray-500">
              <div className="bg-gray-100 overflow-hidden border-b border-gray-100" style={{ aspectRatio: '16/9' }}>
                {a.cover ? (
                  <img src={a.cover} alt={a.nume} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center py-5">
                    <div className="text-2xl font-bold text-gray-200">#{a.numar}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{a.etaje}</div>
                  </div>
                )}
              </div>
              <div className="p-3">
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">Vândut</span>
                <h3 className="text-xs font-medium text-gray-900 mt-1.5 mb-0.5 group-hover:text-green-700 transition-colors leading-tight">
                  {a.nume}
                </h3>
                <p className="text-[10px] text-gray-500 mb-2">{a.zona} · {a.sector}</p>
                {a.preturi && (
                  <div className="space-y-0.5">
                    {a.preturi.slice(0, 2).map((p, i) => (
                      <div key={i} className="text-[9px] text-gray-500 truncate">
                        {p.tip.split('(')[0].trim()}: <span className="font-medium text-gray-700">{p.pret.toLocaleString()}€</span>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[9px] text-gray-500 mt-1.5 italic">Stoc epuizat</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {TOATE_PORTOFOLIU.map(a => (
            <Link key={a.slug} href={`/portofoliu/${a.slug}`}
              className="group bg-white rounded-xl border border-gray-300 overflow-hidden hover:shadow-md transition-all flex">
              <div className="w-20 flex-shrink-0 bg-gray-50 flex flex-col items-center justify-center border-r border-gray-100">
                {a.cover ? (
                  <img src={a.cover} alt={a.nume} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <>
                    <div className="text-lg font-bold text-gray-200">#{a.numar}</div>
                    <div className="text-[9px] text-gray-500">{a.etaje}</div>
                  </>
                )}
              </div>
              <div className="flex-1 px-4 py-3 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                      {a.nume}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{a.zona} · {a.sector} · {a.tipuri.join(', ')}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">Stoc epuizat</span>
                    {a.preturi && a.preturi[0] && (
                      <div className="text-xs font-medium text-gray-700 mt-1">
                        De la {a.preturi[0].pret.toLocaleString()}€
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* SEO TEXT */}
      <div className="mt-10 bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-sm font-medium text-gray-900 mb-3">Despre portofoliul Neofort IMO</h2>
        <p className="text-xs text-gray-500 leading-relaxed">
          Compania noastră a livrat peste {NR_LIVRATE} de ansambluri rezidențiale în București. Fiecare proiect reflectă angajamentul față de calitate, locații premium și finisaje superioare. Deși aceste ansambluri sunt integral vândute, ele demonstrează expertiza acumulată de-a lungul a {ANI_EXPERIENTA} ani de activitate.
        </p>
        <Link href="/ansambluri-rezidentiale" className="inline-block mt-3 text-xs font-medium" style={{ color: '#2d7a3a' }}>
          Vezi ansambluri disponibile →
        </Link>
      </div>
    </div>
  )
}
