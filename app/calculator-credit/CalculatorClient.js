'use client'
import { useState, useEffect } from 'react'

const ANSAMBLURI = [
  { slug: 'neofort-84-titan-pallady',            nume: 'Neofort 84 Titan Pallady',       pret: 62114  },
  { slug: 'neofort-83-titan-pallady',            nume: 'Neofort 83 Titan Pallady',       pret: 64800  },
  { slug: 'neofort-78-mosilor-eminescu',         nume: 'Neofort 78 Moșilor-Eminescu',    pret: 190000 },
  { slug: 'neofort-76-iuliu-maniu-metrou-pacii', nume: 'Neofort 76 Iuliu Maniu',         pret: 218409 },
  { slug: 'neofort-56-pallady-titan-teclu',      nume: 'Neofort 56 Pallady Titan',       pret: 184691 },
  { slug: 'neofort-50-titan-parc-ior',           nume: 'Neofort 50 Titan Parc IOR',      pret: 153860 },
  { slug: 'neofort-49-militari-metrou-gorjului', nume: 'Neofort 49 Militari',            pret: 77800  },
  { slug: 'neofort-44-titan-pallady-teclu',      nume: 'Neofort 44 Titan Pallady Teclu', pret: 61775  },
  { slug: 'neofort-42-piata-muncii',             nume: 'Neofort 42 Piața Muncii',        pret: 197056 },
  { slug: 'neofort-28-titan-pallady-faza-2',     nume: 'Neofort 28 Faza 2',              pret: 85900  },
  { slug: 'neofort-28-titan-pallady-teclu',      nume: 'Neofort 28 Pallady Teclu',       pret: 83900  },
  { slug: 'neofort-11-eminescu-viitorului',      nume: 'Neofort 11 Eminescu',            pret: 104640 },
  { slug: 'neofort-8-tepes-voda-muncii',         nume: 'Neofort 8 Tepeș Vodă',           pret: 146000 },
]

const DAE_MIN = 6.0
const DAE_MAX = 12.0
const DAE_DEFAULT = 7.5
const PRET_DEFAULT = 85000
const AVANS_PCT_DEFAULT = 15
const DURATA_DEFAULT = 25
const CURS_FALLBACK = 4.97

function calcRata(principal, daePct, durataAni) {
  if (principal <= 0 || daePct <= 0) return 0
  const r = daePct / 100 / 12
  const n = durataAni * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function fmt(n, dec = 0) {
  return new Intl.NumberFormat('ro-RO', { maximumFractionDigits: dec, minimumFractionDigits: dec }).format(n)
}

function getDaeLabel(dae) {
  if (dae <= 6.5) return { text: 'Noua Casă / promoție bancară', color: '#2d7a3a' }
  if (dae <= 8.5) return { text: 'Media pieței 2026', color: '#1565c0' }
  if (dae <= 10)  return { text: 'Credit standard', color: '#c8922a' }
  return { text: 'DAE maxim piață', color: '#c0392b' }
}

const DAE_MARKERS = [
  { val: 6.0,  label: '6%',    hint: 'Noua Casă' },
  { val: 7.5,  label: '7.5%',  hint: 'Medie' },
  { val: 9.0,  label: '9%',    hint: '' },
  { val: 10.5, label: '10.5%', hint: '' },
  { val: 12.0, label: '12%',   hint: 'Max' },
]

const STEP_NAMES = ['Apartament', 'Avans & venit', 'Profil', 'Date contact']

export default function CalculatorClient({ faqItems = [] }) {
  // ── Calculator state ────────────────────────────────────
  const [pret, setPret]           = useState(PRET_DEFAULT)
  const [pretInput, setPretInput] = useState(String(PRET_DEFAULT))
  const [avansPct, setAvansPct]   = useState(AVANS_PCT_DEFAULT)
  const [durata, setDurata]       = useState(DURATA_DEFAULT)
  const [dae, setDae]             = useState(DAE_DEFAULT)
  const [curs, setCurs]           = useState(CURS_FALLBACK)
  const [cursLoading, setCursLoading] = useState(true)
  const [cursError, setCursError]     = useState(false)
  const [cursDate, setCursDate]       = useState('')

  // ── Flow state ──────────────────────────────────────────
  const [flowOpen, setFlowOpen] = useState(false)
  const [step, setStep]         = useState(0)
  const [sending, setSending]   = useState(false)
  const [sendErr, setSendErr]   = useState('')

  const [fAnsamblu, setFAnsamblu]   = useState('')
  const [fPretAp, setFPretAp]       = useState('')
  const [fAvans, setFAvans]         = useState('')
  const [fVenit, setFVenit]         = useState('')
  const [fAreRate, setFAreRate]     = useState(null)
  const [fRataLuna, setFRataLuna]   = useState('')
  const [fVarsta, setFVarsta]       = useState('')
  const [fNume, setFNume]           = useState('')
  const [fTel, setFTel]             = useState('')
  const [fEmail, setFEmail]         = useState('')

  // ── Fetch curs live ─────────────────────────────────────
  function fetchCurs() {
    setCursLoading(true); setCursError(false)
    fetch('https://api.frankfurter.app/latest?from=EUR&to=RON')
      .then(r => r.json())
      .then(d => {
        if (d?.rates?.RON) {
          setCurs(d.rates.RON)
          setCursDate(new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' }))
        } else setCursError(true)
      })
      .catch(() => setCursError(true))
      .finally(() => setCursLoading(false))
  }

  useEffect(() => { fetchCurs() }, [])

  // ── Calcule ─────────────────────────────────────────────
  const avansEur  = Math.round(pret * avansPct / 100)
  const principal = pret - avansEur
  const rataEur   = calcRata(principal, dae, durata)
  const rataRon   = rataEur * curs
  const dobTot    = rataEur * durata * 12 - principal
  const totalRamb = rataEur * durata * 12
  const daeLabel  = getDaeLabel(dae)

  function openFlow() {
    setFPretAp(String(pret))
    setFAvans(String(avansEur))
    setStep(0); setFlowOpen(true); setSendErr('')
  }

  async function submitLead(e) {
    e.preventDefault()
    if (!fNume.trim() || !fTel.trim()) { setSendErr('Numele și telefonul sunt obligatorii.'); return }
    setSending(true); setSendErr('')
    try {
      const payload = {
        tip: 'credit',
        nume: fNume, telefon: fTel, email: fEmail,
        ansamblu: fAnsamblu ? ANSAMBLURI.find(a => a.slug === fAnsamblu)?.nume : '',
        pretApartament: fPretAp ? `${fmt(Number(fPretAp))}€` : '',
        avansDisponibil: fAvans ? `${fmt(Number(fAvans))}€` : '',
        varsta: fVarsta,
        venitLunarNet: fVenit ? `${fmt(Number(fVenit))} lei` : '',
        areRate: fAreRate === true ? `Da${fRataLuna ? ` — ${fmt(Number(fRataLuna))} lei/lună` : ''}` : 'Nu',
        simulare: `${fmt(pret)}€ / avans ${avansPct}% / DAE ${dae}% / ${durata} ani → ~${fmt(Math.round(rataRon))} RON/lună`,
      }
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error()
      setStep(4)
    } catch {
      setSendErr('Eroare. Încearcă din nou sau sună la 0758 090 904.')
    } finally {
      setSending(false)
    }
  }

  const btnStyle = (active) => ({
    background: active ? '#2d7a3a' : '#e5e7eb',
    color: active ? '#fff' : '#9ca3af',
    border: 'none', borderRadius: 10, padding: '13px 20px',
    fontSize: 14, fontWeight: 600, cursor: active ? 'pointer' : 'default',
    width: '100%', transition: 'background 0.2s',
  })

  const inputStyle = {
    width: '100%', border: '1.5px solid #e5e7eb', borderRadius: 10,
    padding: '10px 12px', fontSize: 14, color: '#111', outline: 'none', boxSizing: 'border-box',
  }

  const labelStyle = {
    fontSize: 11, fontWeight: 600, color: '#374151',
    textTransform: 'uppercase', letterSpacing: '0.5px',
    display: 'block', marginBottom: 6,
  }

  return (
    <div style={{ fontFamily: 'Barlow, sans-serif' }}>
      <style>{`
        input[type=range] { -webkit-appearance: none; appearance: none; height: 5px; background: #e5e7eb; border-radius: 3px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #2d7a3a; cursor: pointer; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #2d7a3a; cursor: pointer; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        input[type=range]::-webkit-slider-runnable-track { height: 5px; border-radius: 3px; }
        input[type=range]::-moz-range-track { height: 5px; background: #e5e7eb; border-radius: 3px; }
      `}</style>

      {/* HERO */}
      <section style={{ background: '#081c12', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <nav aria-label="breadcrumb" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 16, display: 'flex', gap: 6 }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Acasă</a>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Calculator credit ipotecar</span>
          </nav>
          <h1 style={{ color: '#fff', fontSize: 'clamp(22px,4vw,32px)', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.25 }}>
            Calculator Credit Ipotecar <span style={{ color: '#e8b44e' }}>2026</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: 0, maxWidth: 680 }}>
            Simulare orientativă instantă — curs EUR/RON actualizat zilnic, DAE real din piață (6–12%), ofertă bancară în 24h.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section style={{ background: '#f8faf9', padding: '32px 16px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

            {/* Curs live */}
            <div style={{ background: cursError ? '#fff7ed' : '#f0faf2', borderBottom: '1px solid #e5e7eb', padding: '8px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: cursLoading ? '#9ca3af' : cursError ? '#f59e0b' : '#2d7a3a', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: cursLoading ? '#9ca3af' : cursError ? '#92400e' : '#2d7a3a' }}>
                {cursLoading ? 'Se actualizează cursul…' : cursError
                  ? `Curs de rezervă: 1 EUR = ${CURS_FALLBACK} RON`
                  : `Curs live: 1 EUR = ${fmt(curs, 4)} RON${cursDate ? ' · ' + cursDate : ''}`}
              </span>
              {!cursLoading && (
                <button onClick={fetchCurs} title="Actualizează cursul"
                  style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: cursError ? '#92400e' : '#2d7a3a', fontSize: 12, padding: '0 4px', lineHeight: 1 }}>
                  ↻
                </button>
              )}
            </div>

            <div style={{ padding: '28px 28px 32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>

                {/* Coloana stânga — sliders */}
                <div>

                  {/* Preț */}
                  <div style={{ marginBottom: 22 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>Preț apartament</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <input type="number" value={pretInput}
                          onChange={e => { setPretInput(e.target.value); const v = parseInt(e.target.value); if (!isNaN(v) && v >= 30000 && v <= 2000000) setPret(v) }}
                          onBlur={() => { const v = Math.max(30000, Math.min(2000000, parseInt(pretInput) || PRET_DEFAULT)); setPret(v); setPretInput(String(v)) }}
                          style={{ width: 90, textAlign: 'right', fontSize: 14, fontWeight: 700, color: '#111', border: '1px solid #e5e7eb', borderRadius: 6, padding: '3px 6px' }}
                        />
                        <span style={{ fontSize: 12, color: '#9ca3af' }}>€</span>
                      </div>
                    </div>
                    <input type="range" min={30000} max={2000000} step={5000} value={pret}
                      onChange={e => { const v = Number(e.target.value); setPret(v); setPretInput(String(v)) }}
                      style={{ width: '100%', accentColor: '#2d7a3a' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af', marginTop: 2 }}>
                      <span>30K€</span><span>2M€</span>
                    </div>
                  </div>

                  {/* Avans */}
                  <div style={{ marginBottom: 22 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>Avans</label>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>
                        {avansPct}% — <span style={{ color: '#2d7a3a' }}>{fmt(avansEur)}€</span>
                      </span>
                    </div>
                    <input type="range" min={5} max={50} step={1} value={avansPct}
                      onChange={e => setAvansPct(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#2d7a3a' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af', marginTop: 2 }}>
                      <span>5% (Noua Casă)</span><span>50%</span>
                    </div>
                  </div>

                  {/* Durată */}
                  <div style={{ marginBottom: 22 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>Durată credit</label>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{durata} ani</span>
                    </div>
                    <input type="range" min={5} max={35} step={1} value={durata}
                      onChange={e => setDurata(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#2d7a3a' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#9ca3af', marginTop: 2 }}>
                      <span>5 ani</span><span>35 ani</span>
                    </div>
                  </div>

                  {/* DAE */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                      <label style={{ ...labelStyle, marginBottom: 0 }}>DAE</label>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>{dae.toFixed(1)}%</span>
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 600, color: daeLabel.color, padding: '2px 8px', background: daeLabel.color + '15', borderRadius: 10, display: 'inline-block', marginBottom: 8 }}>
                      {daeLabel.text}
                    </span>
                    <input type="range" min={DAE_MIN} max={DAE_MAX} step={0.1} value={dae}
                      onChange={e => setDae(Number(e.target.value))}
                      style={{ width: '100%', accentColor: daeLabel.color }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginTop: 4 }}>
                      {DAE_MARKERS.map(m => (
                        <div key={m.val} style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: m.hint ? 600 : 400, color: Math.abs(dae - m.val) < 0.3 ? '#111' : '#9ca3af' }}>{m.label}</div>
                          {m.hint && <div style={{ fontSize: 9, color: '#c4b5a5' }}>{m.hint}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Coloana dreapta — rezultate */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                  {/* Rata principală */}
                  <div style={{ background: '#081c12', borderRadius: 14, padding: '22px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>Rată lunară estimată</div>
                    <div style={{ fontSize: 'clamp(28px,5vw,40px)', fontWeight: 700, color: '#e8b44e', lineHeight: 1 }}>
                      {fmt(Math.round(rataRon))} <span style={{ fontSize: '0.42em', fontWeight: 400, color: 'rgba(255,255,255,0.45)' }}>RON</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>≈ {fmt(rataEur, 0)} € / lună</div>
                  </div>

                  {/* Grid cifre */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { lbl: 'Sumă creditată', val: `${fmt(principal)}€`, sub: `${fmt(Math.round(principal * curs))} RON` },
                      { lbl: 'Avans achitat',  val: `${fmt(avansEur)}€`,  sub: `${avansPct}% din preț` },
                      { lbl: 'Dobândă totală', val: `${fmt(Math.round(dobTot))}€`,    sub: `${durata} ani × ${dae}%` },
                      { lbl: 'Total rambursat',val: `${fmt(Math.round(totalRamb))}€`, sub: 'principal + dobândă' },
                    ].map(item => (
                      <div key={item.lbl} style={{ background: '#f8faf9', border: '1px solid #e5e7eb', borderRadius: 10, padding: '11px 13px' }}>
                        <div style={{ fontSize: 10, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: 3 }}>{item.lbl}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{item.val}</div>
                        <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>{item.sub}</div>
                      </div>
                    ))}
                  </div>

                  <p style={{ fontSize: 10, color: '#9ca3af', lineHeight: 1.5, margin: 0 }}>
                    Calcul orientativ. DAE real include asigurare imobil, asigurare de viață și comisioane bancare.
                  </p>

                  <button onClick={openFlow}
                    style={{ background: '#2d7a3a', color: '#fff', border: 'none', borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%' }}>
                    Vreau ofertă reală de la bancă →
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOW OVERLAY */}
      {flowOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={e => { if (e.target === e.currentTarget) { setFlowOpen(false); setStep(0) } }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, maxHeight: '90vh', overflow: 'auto' }}>

            {/* Header */}
            <div style={{ background: '#081c12', borderRadius: '20px 20px 0 0', padding: '18px 24px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: step < 4 ? 12 : 0 }}>
                <span style={{ color: '#e8b44e', fontWeight: 700, fontSize: 15 }}>Neofort IMO — Ofertă credit</span>
                <button onClick={() => { setFlowOpen(false); setStep(0) }}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: 8, width: 30, height: 30, cursor: 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
              {step < 4 && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    {STEP_NAMES.map((s, i) => (
                      <span key={s} style={{ fontSize: 10, color: i === step ? '#e8b44e' : i < step ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)', fontWeight: i === step ? 700 : 400 }}>
                        {i < step ? '✓ ' : `${i + 1}. `}{s}
                      </span>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 4, height: 3 }}>
                    <div style={{ background: '#e8b44e', height: '100%', width: `${((step + 1) / 4) * 100}%`, transition: 'width 0.4s', borderRadius: 4 }} />
                  </div>
                </>
              )}
            </div>

            <div style={{ padding: '24px 24px 20px' }}>

              {/* Pas 0: Apartament */}
              {step === 0 && (
                <div>
                  <p style={{ fontSize: 11, color: '#9ca3af', margin: '0 0 4px' }}>Pre-completat din calculatorul tău</p>
                  <h2 style={{ fontSize: 19, fontWeight: 700, color: '#111', margin: '0 0 18px' }}>Ce apartament te interesează?</h2>

                  <div style={{ marginBottom: 14 }}>
                    <label style={labelStyle}>Ansamblu Neofort (opțional)</label>
                    <select value={fAnsamblu} onChange={e => { setFAnsamblu(e.target.value); if (e.target.value) { const a = ANSAMBLURI.find(x => x.slug === e.target.value); if (a) setFPretAp(String(a.pret)) } }}
                      style={{ ...inputStyle, color: fAnsamblu ? '#111' : '#9ca3af' }}>
                      <option value="">Nu știu / alt proiect</option>
                      {ANSAMBLURI.map(a => <option key={a.slug} value={a.slug}>{a.nume} — de la {fmt(a.pret)}€</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Valoare apartament (€) *</label>
                    <input type="number" value={fPretAp} onChange={e => setFPretAp(e.target.value)} placeholder="ex: 85000" style={inputStyle} />
                  </div>

                  <button onClick={() => setStep(1)} disabled={!fPretAp} style={btnStyle(!!fPretAp)}>Continuă →</button>
                </div>
              )}

              {/* Pas 1: Avans & venit */}
              {step === 1 && (
                <div>
                  <p style={{ fontSize: 11, color: '#9ca3af', margin: '0 0 4px' }}>Capacitate de finanțare</p>
                  <h2 style={{ fontSize: 19, fontWeight: 700, color: '#111', margin: '0 0 18px' }}>Avans și venit lunar</h2>

                  <div style={{ marginBottom: 14 }}>
                    <label style={labelStyle}>Avans disponibil (€)</label>
                    <input type="number" value={fAvans} onChange={e => setFAvans(e.target.value)} placeholder="ex: 17000" style={inputStyle} />
                    <p style={{ fontSize: 10, color: '#9ca3af', margin: '4px 0 0' }}>Minim 15% (5% prin Noua Casă)</p>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <label style={labelStyle}>Venit lunar net (lei) *</label>
                    <input type="number" value={fVenit} onChange={e => setFVenit(e.target.value)} placeholder="ex: 8500" style={inputStyle} />
                    <p style={{ fontSize: 10, color: '#9ca3af', margin: '4px 0 0' }}>Include salariu + venituri extrasalariale</p>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Plătești rate la alte credite? *</label>
                    <div style={{ display: 'flex', gap: 10, marginBottom: fAreRate === true ? 10 : 0 }}>
                      {[{ v: false, l: 'Nu' }, { v: true, l: 'Da' }].map(opt => (
                        <button key={String(opt.v)} onClick={() => setFAreRate(opt.v)}
                          style={{ flex: 1, padding: '10px', borderRadius: 10, border: `2px solid ${fAreRate === opt.v ? '#2d7a3a' : '#e5e7eb'}`, background: fAreRate === opt.v ? '#f0faf2' : '#fff', color: fAreRate === opt.v ? '#2d7a3a' : '#374151', fontWeight: fAreRate === opt.v ? 700 : 400, fontSize: 14, cursor: 'pointer' }}>
                          {opt.l}
                        </button>
                      ))}
                    </div>
                    {fAreRate === true && (
                      <input type="number" value={fRataLuna} onChange={e => setFRataLuna(e.target.value)} placeholder="Suma totală rate/lună (lei)" style={inputStyle} />
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => setStep(0)} style={{ flex: 1, border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', borderRadius: 10, padding: '12px', fontSize: 13, cursor: 'pointer' }}>← Înapoi</button>
                    <button onClick={() => setStep(2)} disabled={!fVenit || fAreRate === null} style={{ ...btnStyle(!!fVenit && fAreRate !== null), width: 'auto', flex: 2 }}>Continuă →</button>
                  </div>
                </div>
              )}

              {/* Pas 2: Profil */}
              {step === 2 && (
                <div>
                  <p style={{ fontSize: 11, color: '#9ca3af', margin: '0 0 4px' }}>Un singur detaliu</p>
                  <h2 style={{ fontSize: 19, fontWeight: 700, color: '#111', margin: '0 0 18px' }}>Vârsta ta</h2>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Vârsta (ani)</label>
                    <input type="number" value={fVarsta} onChange={e => setFVarsta(e.target.value)} placeholder="ex: 34" min={18} max={70} style={inputStyle} />
                    <p style={{ fontSize: 10, color: '#9ca3af', margin: '4px 0 0' }}>Necesar pentru durata maximă credit (limita 65 ani la final)</p>
                  </div>

                  {/* Sumar */}
                  <div style={{ background: '#f8faf9', border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 16px', marginBottom: 18 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px' }}>Sumar simulare</p>
                    {[
                      ['Preț apartament', `${fmt(pret)}€`],
                      ['Avans', `${avansPct}% — ${fmt(avansEur)}€`],
                      ['Durată / DAE', `${durata} ani / ${dae}%`],
                      ['Rată estimată', `${fmt(Math.round(rataRon))} RON/lună`],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '3px 0', borderBottom: '1px solid #f0f0f0' }}>
                        <span style={{ color: '#9ca3af' }}>{k}</span>
                        <span style={{ fontWeight: 600, color: '#374151' }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', borderRadius: 10, padding: '12px', fontSize: 13, cursor: 'pointer' }}>← Înapoi</button>
                    <button onClick={() => setStep(3)} style={{ ...btnStyle(true), width: 'auto', flex: 2 }}>Continuă →</button>
                  </div>
                </div>
              )}

              {/* Pas 3: Contact */}
              {step === 3 && (
                <form onSubmit={submitLead}>
                  <p style={{ fontSize: 11, color: '#9ca3af', margin: '0 0 4px' }}>Ultimul pas</p>
                  <h2 style={{ fontSize: 19, fontWeight: 700, color: '#111', margin: '0 0 6px' }}>Datele tale de contact</h2>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 18px', lineHeight: 1.5 }}>
                    Te contactăm în maxim 24h cu ofertele concrete de la băncile partenere.
                  </p>

                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Nume și prenume *</label>
                    <input type="text" value={fNume} onChange={e => setFNume(e.target.value)} placeholder="Ion Popescu" required style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={labelStyle}>Telefon *</label>
                    <input type="tel" value={fTel} onChange={e => setFTel(e.target.value)} placeholder="07xx xxx xxx" required style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <label style={labelStyle}>Email (opțional)</label>
                    <input type="email" value={fEmail} onChange={e => setFEmail(e.target.value)} placeholder="ion@email.com" style={inputStyle} />
                  </div>

                  {sendErr && <p style={{ fontSize: 12, color: '#dc2626', background: '#fef2f2', borderRadius: 8, padding: '10px 12px', marginBottom: 12 }}>{sendErr}</p>}

                  <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                    <button type="button" onClick={() => setStep(2)} style={{ flex: 1, border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', borderRadius: 10, padding: '12px', fontSize: 13, cursor: 'pointer' }}>← Înapoi</button>
                    <button type="submit" disabled={sending || !fNume || !fTel} style={{ ...btnStyle(!sending && !!fNume && !!fTel), width: 'auto', flex: 2 }}>
                      {sending ? 'Se trimite…' : 'Trimite cererea →'}
                    </button>
                  </div>
                  <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', margin: 0 }}>
                    Date confidențiale. Consultanță gratuită, fără obligații.
                  </p>
                </form>
              )}

              {/* Pas 4: Confirmat */}
              {step === 4 && (
                <div style={{ textAlign: 'center', padding: '8px 0 8px' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#f0faf2', border: '2px solid #2d7a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', fontSize: 26, color: '#2d7a3a' }}>✓</div>
                  <h2 style={{ fontSize: 21, fontWeight: 700, color: '#111', margin: '0 0 8px' }}>Cererea a fost trimisă!</h2>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 20px', lineHeight: 1.6 }}>
                    Un consultant Neofort IMO te contactează <strong>în maxim 24h</strong> cu ofertele de la băncile partenere.
                  </p>
                  <a href={`https://wa.me/40758090904?text=${encodeURIComponent(`Bună ziua! Am trimis o cerere de credit pe neofort.ro. Numele meu este ${fNume}.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25a244', color: '#fff', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600, textDecoration: 'none', marginBottom: 10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    Confirmă și pe WhatsApp
                  </a>
                  <button onClick={() => { setFlowOpen(false); setStep(0) }}
                    style={{ width: '100%', border: '1.5px solid #e5e7eb', background: '#fff', color: '#374151', borderRadius: 10, padding: '11px', fontSize: 13, cursor: 'pointer' }}>
                    Închide
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* INFO CARDS */}
      <section style={{ background: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#111', margin: '0 0 18px' }}>Credit ipotecar 2026 — ce trebuie să știi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {[
              { icon: '🏦', titlu: 'Avans minim 15%', text: 'Băncile comerciale cer avans de la 15%. Prin Noua Casă, avansul minim este 5% pentru imobile sub 140.000€.' },
              { icon: '📊', titlu: 'Compară DAE', text: 'DAE include dobânda nominală + comisioane + asigurări. Singurul indicator corect de comparare între bănci.' },
              { icon: '⏱️', titlu: '30–45 zile', text: 'De la dosarul complet la cheie durează 30–45 zile. Preaprobarea se obține în 3–5 zile lucrătoare.' },
              { icon: '🤝', titlu: 'Consultanță gratuită', text: 'Lucrăm cu BCR, BRD, Raiffeisen, ING, UniCredit și CEC Bank. Comparăm ofertele pentru tine.' },
            ].map(item => (
              <div key={item.titlu} style={{ background: '#f8faf9', border: '1px solid #e5e7eb', borderRadius: 12, padding: '16px' }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 5 }}>{item.titlu}</div>
                <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#f8faf9', padding: '40px 24px' }} id="faq">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#111', margin: '0 0 18px' }}>Întrebări frecvente — credit ipotecar</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqItems.map((item, i) => (
              <details key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
                <summary style={{ padding: '14px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#111', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  {item.q}
                  <svg style={{ flexShrink: 0 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </summary>
                <div style={{ padding: '12px 18px 14px', fontSize: 12, color: '#6b7280', lineHeight: 1.7, borderTop: '1px solid #f0f0f0' }}>{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* LINKURI INTERNE */}
      <section style={{ background: '#fff', padding: '28px 24px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>Explorează apartamentele Neofort IMO</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              { href: '/ansambluri-rezidentiale', label: 'Toate ansamblurile' },
              { href: '/apartamente/garsoniere-bucuresti', label: 'Garsoniere noi' },
              { href: '/apartamente/apartamente-2-camere-bucuresti', label: '2 camere noi' },
              { href: '/apartamente/apartamente-3-camere-bucuresti', label: '3 camere noi' },
              { href: '/apartamente/apartamente-noi-cu-metrou-bucuresti', label: 'Cu metrou' },
              { href: '/apartamente/apartamente-noi-finalizate-bucuresti', label: 'Finalizate' },
              { href: '/blog/credit-ipotecar-2026-dobanzi-conditii', label: 'Ghid credit 2026' },
            ].map(l => (
              <a key={l.href} href={l.href}
                style={{ fontSize: 12, padding: '6px 14px', background: '#f8faf9', border: '1px solid #e5e7eb', borderRadius: 20, color: '#374151', textDecoration: 'none' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
