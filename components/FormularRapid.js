'use client'
import { useState } from 'react'

const TEL = '0743250029'
const TEL_DISPLAY = '0743 250 029'
const WA_LINK = `https://wa.me/40${TEL.substring(1)}`

export default function FormularRapid({ ansambluNume = '', broker = 'Alexandru B.', brokerTel = '0743 250 029' }) {
  const [form, setForm] = useState({ nume: '', telefon: '', email: '', mesaj: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nume || !form.telefon) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ansamblu: ansambluNume, tip: 'rapid' }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ nume: '', telefon: '', email: '', mesaj: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <div className="text-sm font-medium text-gray-900 mb-1">Solicită ofertă</div>
      <div className="text-xs text-gray-500 mb-3">Răspuns în cel mult 2 ore</div>

      {status === 'success' ? (
        <div className="text-center py-6">
          <div className="text-2xl mb-2">✓</div>
          <div className="text-sm font-medium text-gray-900 mb-1">Solicitare trimisă!</div>
          <div className="text-xs text-gray-500">Te contactăm în cel mult 2 ore.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            name="nume"
            type="text"
            value={form.nume}
            onChange={handleChange}
            placeholder="Nume *"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 mb-2 focus:outline-none focus:border-[#2d7a3a] bg-white"
          />
          <input
            name="telefon"
            type="text"
            value={form.telefon}
            onChange={handleChange}
            placeholder="Telefon *"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 mb-2 focus:outline-none focus:border-[#2d7a3a] bg-white"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email (opțional)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 mb-2 focus:outline-none focus:border-[#2d7a3a] bg-white"
          />
          <input
            name="mesaj"
            type="text"
            value={form.mesaj}
            onChange={handleChange}
            placeholder="Mesaj (opțional)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 mb-3 focus:outline-none focus:border-[#2d7a3a] bg-white"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-white mb-3 transition-colors disabled:opacity-60"
            style={{ background: '#2d7a3a' }}
          >
            {status === 'loading' ? 'Se trimite...' : 'Trimite solicitarea'}
          </button>
          {status === 'error' && (
            <p className="text-xs text-red-500 text-center mb-2">Eroare. Încearcă din nou sau sună direct.</p>
          )}
        </form>
      )}

      {/* SEPARATOR */}
      <div className="relative text-center my-3">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-gray-50 px-2 text-[10px] text-gray-400">sau contactează direct</span>
      </div>

      {/* BUTOANE CONTACT — iconiță în container fix 20x20 pentru aliniere verticală */}
      <div className="flex flex-col gap-1.5">
        <a href={`tel:${TEL}`}
          className="w-full py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-blue-50 flex items-center justify-center gap-2 px-4"
          style={{ borderColor: '#1565c0', color: '#1565c0' }}>
          <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.8 19.79 19.79 0 01.86 2.18 2 2 0 012.83 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.98-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </span>
          {TEL_DISPLAY}
        </a>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          className="w-full py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-green-50 flex items-center justify-center gap-2 px-4"
          style={{ borderColor: '#25a244', color: '#25a244', paddingRight: 'calc(1rem + 10px)', paddingLeft: 'calc(1rem - 10px)' }}>
          <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#25a244">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </span>
          WhatsApp
        </a>
        <a href="mailto:lead.neo@neofort-biz.ro"
          className="w-full py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-yellow-50 flex items-center justify-center gap-2 px-4"
          style={{ borderColor: '#c8922a', color: '#c8922a' }}>
          <span style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c8922a" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
          Trimite email
        </a>
      </div>

      {/* BROKER */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700 flex-shrink-0">
          {broker.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="text-xs font-medium text-gray-900">{broker}</div>
          <div className="text-[10px] text-gray-500">Reprezentant vânzări</div>
        </div>
      </div>
    </div>
  )
}
