'use client'
import { useState } from 'react'

export default function GalerieAnsamblu({ imagini = {}, nume = '' }) {
  const exterior = imagini.exterior || []
  const interior = imagini.interior || []
  const schite = imagini.schite || []
  const toate = [...exterior, ...interior, ...schite]

  const TABS = [
    { key: 'toate', label: 'Toate', imgs: toate },
    { key: 'exterior', label: 'Exterior', imgs: exterior },
    { key: 'interior', label: 'Interior', imgs: interior },
    { key: 'schite', label: 'Schițe', imgs: schite },
  ].filter(t => t.imgs.length > 0)

  const [activeTab, setActiveTab] = useState(TABS[0]?.key || 'toate')
  const [lightbox, setLightbox] = useState(null)
  const [mainIdx, setMainIdx] = useState(0)

  const current = TABS.find(t => t.key === activeTab)?.imgs || toate
  const mainImg = current[mainIdx] || current[0]

  if (toate.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
        <span className="text-sm text-gray-400">Fotografii în curând</span>
      </div>
    )
  }

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:block">
        {mainImg && (
          <div
            className="relative w-full overflow-hidden rounded-xl cursor-pointer bg-gray-100"
            style={{ aspectRatio: '16/9' }}
            onClick={() => setLightbox(mainIdx)}
          >
            <img src={mainImg} alt={`${nume} - fotografie principală`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="eager" />
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
              {mainIdx + 1} / {current.length}
            </div>
          </div>
        )}
        {current.length > 1 && (
          <div className="grid gap-1 mt-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(current.length - 1, 6)}, 1fr)` }}>
            {current.slice(1, 7).map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg cursor-pointer bg-gray-100"
                style={{ aspectRatio: '16/9' }}
                onClick={() => { setMainIdx(i + 1); }}
              >
                <img src={src} alt={`${nume} foto ${i + 2}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} className="hover:brightness-110 transition" loading="lazy" />
              </div>
            ))}
            {current.length > 7 && (
              <div
                className="relative overflow-hidden rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
                style={{ aspectRatio: '16/9' }}
                onClick={() => setLightbox(7)}
              >
                <span className="text-xs font-semibold text-gray-700">+{current.length - 7} foto</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MOBIL */}
      <div className="md:hidden relative">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory rounded-xl"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {current.map((src, i) => (
            <div
              key={i}
              className="flex-none w-full snap-start relative bg-gray-100"
              style={{ aspectRatio: '4/3' }}
              onClick={() => setLightbox(i)}
            >
              <img src={src} alt={`${nume} foto ${i + 1}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1 mt-2">
          {current.slice(0, 8).map((_, i) => (
            <div key={i} className="rounded-full" style={{ width: i === 0 ? 16 : 6, height: 6, background: i === 0 ? '#2d7a3a' : '#d1d5db' }} />
          ))}
          {current.length > 8 && <span className="text-xs text-gray-400 ml-1">+{current.length - 8}</span>}
        </div>
      </div>

      {/* TABS */}
      {TABS.length > 1 && (
        <div className="flex gap-2 overflow-x-auto mt-3 mb-1" style={{ scrollbarWidth: 'none' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => { setActiveTab(t.key); setMainIdx(0); }}
              className="text-xs px-3 py-1.5 rounded-full border whitespace-nowrap flex-shrink-0 transition-colors"
              style={{
                background: activeTab === t.key ? '#2d7a3a' : 'transparent',
                borderColor: activeTab === t.key ? '#2d7a3a' : '#e5e7eb',
                color: activeTab === t.key ? '#fff' : '#6b7280',
              }}
            >
              {t.label} ({t.imgs.length})
            </button>
          ))}
        </div>
      )}

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl font-light"
            onClick={() => setLightbox(null)}
          >×</button>
          <button
            className="absolute left-4 text-white text-4xl font-light px-4"
            onClick={e => { e.stopPropagation(); setLightbox(l => Math.max(0, l - 1)); }}
          >‹</button>
          <div className="relative" style={{ width: '90vw', maxWidth: 1100, aspectRatio: '16/9' }}
            onClick={e => e.stopPropagation()}>
            <img src={current[lightbox] || current[0]} alt={`${nume} lightbox`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <button
            className="absolute right-4 text-white text-4xl font-light px-4"
            onClick={e => { e.stopPropagation(); setLightbox(l => Math.min(current.length - 1, l + 1)); }}
          >›</button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightbox + 1} / {current.length}
          </div>
        </div>
      )}
    </>
  )
}
