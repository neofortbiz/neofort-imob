'use client'
import { useState } from 'react'

export default function FormularCalificat() {
  const [form, setForm] = useState({
    nume: '', telefon: '', email: '',
    finantare: '', tipImobil: '', camere: '',
    buget: '', zona: '', mesaj: '',
  })
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nume || !form.telefon || !form.email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tip: 'calificat' }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ nume: '', telefon: '', email: '', finantare: '', tipImobil: '', camere: '', buget: '', zona: '', mesaj: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls = "w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:border-opacity-50"
  const selectCls = "w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opacity-50 appearance-none cursor-pointer"

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">✓</div>
        <div className="text-lg font-medium text-white mb-2">Solicitare trimisă!</div>
        <div className="text-sm text-white text-opacity-60">Un broker te contactează în cel mult 2 ore.</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Rând 1: Nume + Telefon */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input name="nume" type="text" value={form.nume} onChange={handleChange} placeholder="Nume *" required className={inputCls} />
        <input name="telefon" type="text" value={form.telefon} onChange={handleChange} placeholder="Telefon *" required className={inputCls} />
      </div>
      {/* Rând 2: Email + Finanțare */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email *" required className={inputCls} />
        <select name="finantare" value={form.finantare} onChange={handleChange} className={selectCls} style={{ color: form.finantare ? 'white' : 'rgba(255,255,255,0.4)' }}>
          <option value="" disabled>Finanțare</option>
          <option value="surse-proprii" style={{ color: '#111' }}>Surse proprii</option>
          <option value="credit-ipotecar" style={{ color: '#111' }}>Credit ipotecar</option>
          <option value="prima-casa" style={{ color: '#111' }}>Credit Prima Casă</option>
          <option value="altele" style={{ color: '#111' }}>Altele</option>
        </select>
      </div>
      {/* Rând 3: Tip imobil + Număr camere */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <select name="tipImobil" value={form.tipImobil} onChange={handleChange} className={selectCls} style={{ color: form.tipImobil ? 'white' : 'rgba(255,255,255,0.4)' }}>
          <option value="" disabled>Tip imobil</option>
          <option value="garsoniera-studio" style={{ color: '#111' }}>Garsonieră / Studio</option>
          <option value="apt-2" style={{ color: '#111' }}>Apartament 2 camere</option>
          <option value="apt-2-3" style={{ color: '#111' }}>Apartament 2–3 camere</option>
          <option value="apt-3" style={{ color: '#111' }}>Apartament 3 camere</option>
          <option value="apt-3-4" style={{ color: '#111' }}>Apartament 3–4 camere</option>
          <option value="apt-4" style={{ color: '#111' }}>Apartament 4+ camere</option>
          <option value="casa-vila" style={{ color: '#111' }}>Casă / Vilă</option>
          <option value="comercial" style={{ color: '#111' }}>Spațiu comercial</option>
        </select>
        <select name="camere" value={form.camere} onChange={handleChange} className={selectCls} style={{ color: form.camere ? 'white' : 'rgba(255,255,255,0.4)' }}>
          <option value="" disabled>Număr camere</option>
          <option value="1" style={{ color: '#111' }}>1 cameră</option>
          <option value="2" style={{ color: '#111' }}>2 camere</option>
          <option value="3" style={{ color: '#111' }}>3 camere</option>
          <option value="4" style={{ color: '#111' }}>4+</option>
        </select>
      </div>
      {/* Rând 4: Buget + Zonă */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input name="buget" type="text" value={form.buget} onChange={handleChange} placeholder="Buget (€)" className={inputCls} />
        <input name="zona" type="text" value={form.zona} onChange={handleChange} placeholder="Zona de interes" className={inputCls} />
      </div>
      {/* Mesaj */}
      <input name="mesaj" type="text" value={form.mesaj} onChange={handleChange} placeholder="Mesaj (opțional)" className={`${inputCls} mb-3 w-full`} />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
        style={{ background: '#e8b44e', color: '#1a0e00' }}
      >
        {status === 'loading' ? 'Se trimite...' : 'Trimite solicitarea'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-red-400 text-center mt-2">Eroare. Încearcă din nou.</p>
      )}

      <p className="text-[10px] text-center mt-3" style={{ color: 'rgba(255,255,255,0.3)' }}>
        Prin trimiterea formularului ești de acord cu politica de confidențialitate GDPR.<br />
        Datele tale nu sunt transmise terților.
      </p>
    </form>
  )
}
