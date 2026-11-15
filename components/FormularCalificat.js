'use client'
import { useState, useEffect, useRef } from 'react'
import { modelContext } from '@/lib/webmcp'

// WebMCP DECLARATIV (v455): formularul are toolname/tooldescription, iar campurile toolparamdescription,
// deci agentul din browser il poate COMPLETA ca unealta „request_offer". Fara toolautosubmit: omul
// apasa singur „Trimite solicitarea". Browserul scrie valorile direct in campuri, pe langa starea React,
// de aceea la trimitere valorile se citesc din formular (FormData), cu starea React ca rezerva.
const PARAM = {
  nume: 'Full name of the person (required).',
  telefon: 'Phone number (required), e.g. 0722 123 456.',
  email: 'E-mail address (required).',
  finantare: 'How the purchase is financed.',
  tipImobil: 'Type of property wanted.',
  camere: 'Number of rooms wanted.',
  buget: 'Budget in EUR, as written by the person.',
  zona: 'Area of Bucharest the person is interested in.',
  mesaj: 'Optional message, in Romanian if possible.',
}

export default function FormularCalificat() {
  const [form, setForm] = useState({
    nume: '', telefon: '', email: '',
    finantare: '', tipImobil: '', camere: '',
    buget: '', zona: '', mesaj: '', _hp: '',
  })
  const [status, setStatus] = useState('idle')
  const [notaAgent, setNotaAgent] = useState(false)
  const [sursaAgent, setSursaAgent] = useState(false)
  const formRef = useRef(null)

  // Cand agentul a completat formularul: aducem valorile din campuri in starea React (altfel culoarea
  // selecturilor si o eventuala re-randare ar arata altceva), afisam nota si marcam sursa lead-ului.
  useEffect(() => {
    const mc = modelContext()
    if (!mc || typeof mc.addEventListener !== 'function') return
    const laActivare = e => {
      if (e?.toolName && e.toolName !== 'request_offer') return
      try {
        const fd = new FormData(formRef.current)
        setForm(f => ({ ...f, ...Object.fromEntries([...fd.entries()].filter(([k]) => k in PARAM).map(([k, v]) => [k, String(v)])), _hp: '' }))
      } catch {}
      setSursaAgent(true)
      setNotaAgent(true)
    }
    try { mc.addEventListener('toolactivated', laActivare) } catch {}
    return () => { try { mc.removeEventListener('toolactivated', laActivare) } catch {} }
  }, [])

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setNotaAgent(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    // Valorile din campuri (inclusiv cele scrise de agent), cu starea React ca rezerva.
    let fd = null
    try { fd = new FormData(e.currentTarget) } catch {}
    const v = k => String((fd && fd.get(k)) || form[k] || '').trim()
    const date = { nume: v('nume'), telefon: v('telefon'), email: v('email'), finantare: v('finantare'), tipImobil: v('tipImobil'), camere: v('camere'), buget: v('buget'), zona: v('zona'), mesaj: v('mesaj') }
    if (!date.nume || !date.telefon || !date.email) return
    // Capcana anti-spam: un agent care a completat formularul la cererea omului nu e un robot de spam.
    if (v('_hp') && !sursaAgent) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...date, tip: 'calificat', ...(sursaAgent ? { sursa: 'webmcp' } : {}) }),
      })
      if (res.ok) {
        // Eveniment conversie GA4/GTM
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || []
          window.dataLayer.push({
            event: 'generate_lead',
            form_type: 'calificat',
            zona: date.zona || '(nespecificat)',
            camere: date.camere || '(nespecificat)',
            buget: date.buget || '(nespecificat)',
            page_path: window.location.pathname,
            ...(sursaAgent ? { lead_source: 'webmcp' } : {}),
          })
        }
        setStatus('success')
        setForm({ nume: '', telefon: '', email: '', finantare: '', tipImobil: '', camere: '', buget: '', zona: '', mesaj: '' })
        setNotaAgent(false)
        setSursaAgent(false)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const sharedCls = "w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-opacity-50"
  const inputCls = sharedCls + " text-white"
  const selectCls = sharedCls + " appearance-none cursor-pointer"

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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="form-dark"
      toolname="request_offer"
      tooldescription="Fills the Neofort IMO offer request form so that a broker calls the person back: name, phone, e-mail, financing, property type, rooms, budget, area and message. It only fills the form: the person must check the data and press „Trimite solicitarea” themselves. Use only data the person gave you."
    >
      {/* Rând 1: Nume + Telefon */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input name="nume" toolparamdescription={PARAM.nume} type="text" autoComplete="name" value={form.nume} onChange={handleChange} placeholder="Nume *" required className={inputCls} style={{ color: 'white' }} />
        <input name="telefon" toolparamdescription={PARAM.telefon} type="tel" inputMode="tel" autoComplete="tel" value={form.telefon} onChange={handleChange} placeholder="Telefon *" required className={inputCls} />
      </div>
      {/* Rând 2: Email + Finanțare */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input name="email" toolparamdescription={PARAM.email} type="email" autoComplete="email" value={form.email} onChange={handleChange} placeholder="Email *" required className={inputCls} />
        <label className="sr-only" htmlFor="form-finantare">Finanțare</label><select id="form-finantare" name="finantare" toolparamdescription={PARAM.finantare} value={form.finantare} onChange={handleChange} className={selectCls} style={{ color: form.finantare ? 'white' : 'rgba(255,255,255,0.65)' }}>
          <option value="" disabled>Finanțare</option>
          <option value="surse-proprii" style={{ color: '#111' }}>Surse proprii</option>
          <option value="credit-ipotecar" style={{ color: '#111' }}>Credit ipotecar</option>
          <option value="prima-casa" style={{ color: '#111' }}>Credit Prima Casă</option>
          <option value="altele" style={{ color: '#111' }}>Altele</option>
        </select>
      </div>
      {/* Rând 3: Tip imobil + Număr camere */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <label className="sr-only" htmlFor="form-tip">Tip imobil</label><select id="form-tip" name="tipImobil" toolparamdescription={PARAM.tipImobil} value={form.tipImobil} onChange={handleChange} className={selectCls} style={{ color: form.tipImobil ? 'white' : 'rgba(255,255,255,0.65)' }}>
          <option value="" disabled>Tip imobil</option>
          <option value="garsoniera-studio" style={{ color: '#111' }}>Garsonieră / Studio</option>
          <option value="apartament" style={{ color: '#111' }}>Apartament</option>
          <option value="penthouse" style={{ color: '#111' }}>Penthouse</option>
          <option value="casa-vila" style={{ color: '#111' }}>Casă / Vilă</option>
          <option value="comercial" style={{ color: '#111' }}>Spațiu comercial</option>
        </select>
        <label className="sr-only" htmlFor="form-camere">Număr camere</label><select id="form-camere" name="camere" toolparamdescription={PARAM.camere} value={form.camere} onChange={handleChange} className={selectCls} style={{ color: form.camere ? 'white' : 'rgba(255,255,255,0.65)' }}>
          <option value="" disabled>Număr camere</option>
          <option value="1" style={{ color: '#111' }}>1 cameră</option>
          <option value="2" style={{ color: '#111' }}>2 camere</option>
          <option value="3" style={{ color: '#111' }}>3 camere</option>
          <option value="4" style={{ color: '#111' }}>4+</option>
        </select>
      </div>
      {/* Rând 4: Buget + Zonă */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <input name="buget" toolparamdescription={PARAM.buget} type="text" value={form.buget} onChange={handleChange} placeholder="Buget (€)" className={inputCls} />
        <input name="zona" toolparamdescription={PARAM.zona} type="text" value={form.zona} onChange={handleChange} placeholder="Zona de interes" className={inputCls} />
      </div>
      {/* Mesaj */}
      <input name="mesaj" toolparamdescription={PARAM.mesaj} type="text" value={form.mesaj} onChange={handleChange} placeholder="Mesaj (opțional)" className={`${inputCls} mb-3 w-full`} />

      <input name="_hp" toolparamdescription="Internal anti-spam field. Always leave it empty." type="text" value={form._hp} onChange={handleChange} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} />
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
      {notaAgent && (
        <p role="status" aria-live="polite" className="text-xs font-medium text-center mt-2 rounded-lg px-3 py-2" style={{ background: '#fff7e6', color: '#7a4f00', border: '1px solid #f0c674' }}>
          Asistentul AI a completat formularul. Verifică datele și apasă „Trimite solicitarea”.
        </p>
      )}

      <p className="text-[10px] text-center mt-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
        Prin trimiterea formularului ești de acord cu politica de confidențialitate GDPR.<br />
        Datele tale nu sunt transmise terților.
      </p>
    </form>
  )
}
