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

      {/* TABEL */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 px-2 text-xs text-gray-400 font-normal">Tip</th>
              <th className="text-left py-2 px-2 text-xs text-gray-400 font-normal">Suprafață</th>
              <th className="text-left py-2 px-2 text-xs text-gray-400 font-normal">Preț</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((apt, i) => (
              <tr key={i} className="apt-row border-b border-gray-50">
                <td className="py-2.5 px-2">
                  <span className="font-medium text-gray-900 text-sm">{apt.tip}</span>
                  {apt.promo && (
                    <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#fff3e0', color: '#c8922a' }}>PROMO</span>
                  )}
                  {apt.stocEpuizat && (
                    <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#f5f5f5', color: '#999' }}>EPUIZAT</span>
                  )}
                </td>
                <td className="py-2.5 px-2 text-xs text-gray-600">{apt.suprafata} mp</td>
                <td className="py-2.5 px-2">
                  {apt.pretPromo ? (
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#c0392b' }}>{fmt(apt.pretPromo)} <span className="text-[9px] text-gray-400 font-normal">+TVA</span></div>
                      <div className="text-[10px] text-gray-400 line-through">{fmt(apt.avans20)}</div>
                    </div>
                  ) : apt.avans45 ? (
                    <div>
                      <div className="text-xs text-gray-500 mb-0.5">Avans 45%: <span className="font-medium text-gray-900">{fmt(apt.avans45)}</span></div>
                      <div className="text-xs text-gray-500">Avans 20%: <span className="font-medium text-gray-900">{fmt(apt.avans20)}</span></div>
                    </div>
                  ) : (
                    <div className="text-sm font-medium" style={{ color: '#2d7a3a' }}>{fmt(apt.avans20)} <span className="text-[9px] text-gray-400 font-normal">+TVA</span></div>
                  )}
                </td>
                <td className="py-2.5 px-2">
                  <button
                    onClick={() => setSelectedApt(apt)}
                    className="text-[10px] px-2 py-1 rounded border border-[#2d7a3a] text-[#2d7a3a] hover:bg-green-50 transition-colors whitespace-nowrap"
                  >
                    Solicită ofertă
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* NOTE PARCARE */}
      <p className="text-[10px] text-gray-400 mt-2">
        Toate prețurile sunt + TVA (unde nu este specificat altfel).
        {parcare?.exterior?.disponibil && ` Parcare exterior ${new Intl.NumberFormat('ro-RO').format(parcare.exterior.pret)}€${parcare.exterior.notaTVA ? ' ' + parcare.exterior.notaTVA : ''}.`}
        {parcare?.interior?.disponibil && ` Parcare interior ${new Intl.NumberFormat('ro-RO').format(parcare.interior.pret)}€${parcare.interior.notaTVA ? ' ' + parcare.interior.notaTVA : ''}.`}
        {parcare?.subteran?.disponibil && parcare.subteran.pret && ` Parcare subterana ${new Intl.NumberFormat('ro-RO').format(parcare.subteran.pret)}€${parcare.subteran.notaTVA ? ' ' + parcare.subteran.notaTVA : ''}.`}
      </p>

      {/* MODAL SOLICITA OFERTA */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm font-medium text-gray-900">{selectedApt.tip}</div>
                <div className="text-xs text-gray-500 mt-0.5">{ansambluNume} · {selectedApt.suprafata} mp</div>
              </div>
              <button onClick={() => setSelectedApt(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
            </div>

            {/* Pret in modal */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              {selectedApt.pretPromo ? (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Preț promoțional</span>
                  <span className="text-base font-medium" style={{ color: '#c0392b' }}>{new Intl.NumberFormat('ro-RO').format(selectedApt.pretPromo)}€ +TVA</span>
                </div>
              ) : selectedApt.avans45 ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Avans 45%</span>
                    <span className="font-medium text-gray-900">{new Intl.NumberFormat('ro-RO').format(selectedApt.avans45)}€ +TVA</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Avans 20%</span>
                    <span className="font-medium text-gray-900">{new Intl.NumberFormat('ro-RO').format(selectedApt.avans20)}€ +TVA</span>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Preț</span>
                  <span className="text-base font-medium" style={{ color: '#2d7a3a' }}>{new Intl.NumberFormat('ro-RO').format(selectedApt.avans20)}€ +TVA</span>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-500 mb-4">Contactează-ne direct pentru o ofertă detaliată și vizionare:</p>

            <div className="flex flex-col gap-2">
              <a href={`tel:${TEL}`}
                className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: '#2d7a3a' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.8 19.79 19.79 0 01.86 2.18 2 2 0 012.83 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.98-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {TEL_DISPLAY}
              </a>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium text-white"
                style={{ background: '#25a244' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            <button onClick={() => setSelectedApt(null)}
              className="w-full mt-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Închide
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
