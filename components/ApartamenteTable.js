'use client'
import { useState } from 'react'

const TEL_DISPLAY = '0758 090 904'
const TEL = '0758090904'
const WA_LINK = `https://wa.me/40${TEL.substring(1)}`

export default function ApartamenteTable({ apartamente, parcare, ansambluNume }) {
  const [selectedApt, setSelectedApt] = useState(null)
  const [filterCamere, setFilterCamere] = useState('')

  const camereUnice = [...new Set(apartamente.map(a => a.camere))].sort()
  const filtered = filterCamere ? apartamente.filter(a => a.camere === parseInt(filterCamere)) : apartamente

  function fmt(v) {
    if (!v) return '—'
    return new Intl.NumberFormat('ro-RO').format(v) + '€'
  }

  return (
    <div>
      {/* FILTER CAMERE */}
      {camereUnice.length > 1 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          <button
            onClick={() => setFilterCamere('')}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${!filterCamere ? 'bg-[#2d7a3a] border-[#2d7a3a] text-white' : 'border-gray-200 text-gray-500 hover:border-[#2d7a3a]'}`}
          >
            Toate
          </button>
          {camereUnice.map(c => (
            <button
              key={c}
              onClick={() => setFilterCamere(String(c))}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filterCamere === String(c) ? 'bg-[#2d7a3a] border-[#2d7a3a] text-white' : 'border-gray-200 text-gray-500 hover:border-[#2d7a3a]'}`}
            >
              {c === 1 ? 'Garsoniere' : `${c} camere`}
            </button>
          ))}
        </div>
      )}

      {/* CARDURI — fara scroll orizontal, stacked pe mobile */}
      <div className="space-y-2">
        {filtered.map((apt, i) => (
          <div key={i} className="rounded-lg border border-gray-100 p-3 bg-gray-50/50">
            {/* LINIA 1: Tip + badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-medium text-gray-900 text-sm leading-tight">{apt.tip}</span>
                {apt.promo && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: '#fff3e0', color: '#c8922a' }}>PROMO</span>
                )}
                {apt.stocEpuizat && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#f5f5f5', color: '#999' }}>EPUIZAT</span>
                )}
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">{apt.suprafata} mp</span>
            </div>
            {/* LINIA 2: Pret + buton */}
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                {apt.pretPromo ? (
                  <div>
                    <span className="text-sm font-semibold" style={{ color: '#c0392b' }}>{fmt(apt.pretPromo)}</span>
                    <span className="text-[9px] text-gray-400 ml-1">+TVA</span>
                    <span className="text-[10px] text-gray-400 line-through ml-2">{fmt(apt.avans20)}</span>
                  </div>
                ) : apt.avans45 ? (
                  <div className="space-y-0.5">
                    <div className="text-[11px] text-gray-500">
                      Avans 45%: <span className="font-semibold text-gray-900">{fmt(apt.avans45)}</span>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Avans 20%: <span className="font-medium text-gray-700">{fmt(apt.avans20)}</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-sm font-semibold" style={{ color: '#2d7a3a' }}>{fmt(apt.avans20)}</span>
                    <span className="text-[9px] text-gray-400 ml-1">+TVA</span>
                  </div>
                )}
              </div>
              {!apt.stocEpuizat && (
                <button
                  onClick={() => setSelectedApt(apt)}
                  className="text-[10px] px-2 py-1.5 rounded border border-[#2d7a3a] text-[#2d7a3a] hover:bg-green-50 transition-colors whitespace-nowrap"
                >
                  Solicită ofertă
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PARCARE */}
      {parcare && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-700 mb-2">Parcare disponibilă</p>
          <div className="flex flex-wrap gap-2">
            {parcare.exterior?.disponibil && (
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                Exterioară {parcare.exterior.pret ? `— ${new Intl.NumberFormat('ro-RO').format(parcare.exterior.pret)}€ ${parcare.exterior.notaTVA || '+TVA'}` : ''}
              </span>
            )}
            {parcare.interior?.disponibil && (
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                Interioară {parcare.interior.pret ? `— ${new Intl.NumberFormat('ro-RO').format(parcare.interior.pret)}€ ${parcare.interior.notaTVA || '+TVA'}` : ''}
              </span>
            )}
            {parcare.subteran?.disponibil && (
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                Subterană {parcare.subteran.pret ? `— ${new Intl.NumberFormat('ro-RO').format(parcare.subteran.pret)}€ ${parcare.subteran.notaTVA || '+TVA'}` : ''}
              </span>
            )}
          </div>
        </div>
      )}

      {/* MODAL OFERTA */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSelectedApt(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
            onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-medium text-gray-900 mb-1">{selectedApt.tip}</h3>
            <p className="text-xs text-gray-500 mb-4">{selectedApt.suprafata} mp · {ansambluNume}</p>
            <div className="space-y-2">
              <a href={`tel:${TEL}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: '#2d7a3a' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.8 19.79 19.79 0 01.86 2.18 2 2 0 012.83 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.98-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Sună: {TEL_DISPLAY}
              </a>
              <a href={`${WA_LINK}?text=${encodeURIComponent(`Bună ziua! Sunt interesat de ${selectedApt.tip} (${selectedApt.suprafata} mp) din ${ansambluNume}. Vă rog să mă contactați cu detalii și disponibilitate.`)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium border border-green-200 text-green-700 bg-green-50 hover:bg-green-100 transition-colors">
                WhatsApp
              </a>
            </div>
            <button onClick={() => setSelectedApt(null)}
              className="mt-3 w-full py-2 text-xs text-gray-400 hover:text-gray-600">
              Închide
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
