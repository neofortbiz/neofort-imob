import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FormularRapid from '@/components/FormularRapid'
import { ANSAMBLURI, ANSAMBLURI_ACTIVE, getAnsamblu, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

export async function generateStaticParams() {
  return ANSAMBLURI.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const a = getAnsamblu(params.slug)
  if (!a) return {}
  return {
    title: a.seoTitle,
    description: a.seoDescription,
  }
}

const POI_COLORS = {
  metrou: { bg: '#e3f2fd', color: '#1565c0', label: 'Metrou' },
  mall: { bg: '#f3e5f5', color: '#6a1b9a', label: 'Mall' },
  scoala: { bg: '#e8f5e9', color: '#2e7d32', label: 'Școală' },
  parc: { bg: '#e0f2f1', color: '#00695c', label: 'Parc' },
}

export default function AnsambluPage({ params }) {
  const a = getAnsamblu(params.slug)
  if (!a) notFound()

  const sc = STATUS_CONFIG[a.status]
  const similare = ANSAMBLURI_ACTIVE.filter(x => x.slug !== a.slug && (x.zona === a.zona || x.sector === a.sector)).slice(0, 3)

  return (
    <>
      <Header activePath="/ansambluri-rezidentiale" />
      <main>
        {/* BREADCRUMB */}
        <div className="border-b border-gray-100 px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
            <span>›</span>
            <Link href="/ansambluri-rezidentiale" className="hover:text-[#2d7a3a]">Ansambluri rezidențiale</Link>
            <span>›</span>
            <span className="text-gray-900">{a.nume}</span>
          </div>
        </div>

        {/* HERO */}
        <div style={{ background: '#081c12' }} className="px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <div className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full mb-3 ${sc.bg} ${sc.text}`}>
                  {sc.label} {a.dataPredare !== 'Finalizat' && `· Predare ${a.dataPredare}`}
                </div>
                <h1 className="text-xl md:text-2xl font-medium text-white leading-tight mb-2">
                  Ansamblu Rezidențial<br />{a.nume}
                </h1>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {a.adresa}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ border: '0.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}>♡</button>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: `de la ${formatPret(a.pretDeLa)}`, lbl: 'Preț de la' },
                { val: a.apartamente.length > 0 ? `${a.apartamente[0].suprafata}–${a.apartamente[a.apartamente.length-1].suprafata}mp` : 'N/A', lbl: 'Suprafețe' },
                { val: a.etaje, lbl: 'Regim înălțime' },
                { val: a.puncteInteres[0]?.distanta || 'N/A', lbl: a.puncteInteres[0]?.tip === 'metrou' ? 'Până la metrou' : 'Distanță' },
              ].map((s, i) => (
                <div key={i} className="rounded-lg p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
                  <div className="text-sm font-medium leading-snug" style={{ color: '#e8b44e' }}>{s.val}</div>
                  <div className="text-[9px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GALERIE PLACEHOLDER */}
        {/* GALERIE: poza landscape stanga + grid 2x2 dreapta */}
        <div className="grid gap-1" style={{ gridTemplateColumns: '3fr 1fr', height: 320 }}>
          {/* Poza principala landscape */}
          <div className="bg-gray-100 flex items-center justify-center overflow-hidden">
            <span className="text-sm text-gray-400">Fotografie principală</span>
          </div>
          {/* 4 miniaturi 2x2 */}
          <div className="grid gap-1" style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' }}>
            <div className="bg-gray-100 flex items-center justify-center">
              <span className="text-[9px] text-gray-400">Foto 2</span>
            </div>
            <div className="bg-gray-100 flex items-center justify-center">
              <span className="text-[9px] text-gray-400">Foto 3</span>
            </div>
            <div className="bg-gray-100 flex items-center justify-center">
              <span className="text-[9px] text-gray-400">Foto 4</span>
            </div>
            <div className="bg-gray-200 flex items-center justify-center relative cursor-pointer hover:bg-gray-300 transition-colors">
              <span className="text-[10px] font-medium text-gray-600">+{a.galerie.length || 12} foto</span>
            </div>
          </div>
        </div>

        {/* TAB GALERIE */}
        <div className="flex gap-2 px-6 py-2.5 border-b border-gray-100 overflow-x-auto nav-scroll">
          {['Exterior', 'Interior', 'Randări', 'Plan etaj'].map((t, i) => (
            <span key={t} className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer whitespace-nowrap ${i === 0 ? 'bg-[#2d7a3a] border-[#2d7a3a] text-white' : 'border-gray-200 text-gray-500'}`}>{t}</span>
          ))}
        </div>

        {/* BODY — 2 COLOANE */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6">

            {/* COLOANA MAIN */}
            <div className="space-y-0">

              {/* DESCRIERE */}
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-3">Despre ansamblu</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{a.descriere}</p>
              </div>

              {/* APARTAMENTE */}
              <div className="py-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Apartamente disponibile</h2>
                <ApartamenteTable apartamente={a.apartamente} parcare={a.parcare} />
              </div>

              {/* DOTARI */}
              <div className="py-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Dotări și finisaje</h2>
                <div className="grid grid-cols-2 gap-2">
                  {a.dotari.map(d => (
                    <div key={d} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#e8f5e9' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2d7a3a" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* LOCATIE */}
              <div className="py-6">
                <h2 className="text-base font-medium text-gray-900 mb-4">Locație și transport</h2>
                <div className="h-36 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-xs text-gray-400">Google Maps embed</span>
                </div>
                <div className="space-y-2">
                  {a.puncteInteres.map((p, i) => {
                    const cfg = POI_COLORS[p.tip] || { bg: '#f3f4f6', color: '#374151', label: p.tip }
                    return (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap"
                          style={{ background: cfg.bg, color: cfg.color }}>
                          {cfg.label}
                        </span>
                        <span>{p.nume}</span>
                        <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{p.distanta}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="md:sticky md:top-20 self-start">
              <FormularRapid ansambluNume={a.nume} />
            </div>
          </div>
        </div>

        {/* ANSAMBLURI SIMILARE */}
        {similare.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-base font-medium text-gray-900 mb-4">Ansambluri similare în zonă</h2>
              <div className="grid grid-cols-3 gap-3">
                {similare.map(s => {
                  const ssc = STATUS_CONFIG[s.status]
                  return (
                    <Link key={s.slug} href={`/ansamblu-rezidential/${s.slug}`} className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all group">
                      <div className="h-16 bg-gray-100 flex items-center justify-center relative">
                        <span className="text-[9px] text-gray-400">Foto</span>
                        <div className={`absolute top-1.5 left-1.5 text-[8px] font-medium px-1 py-0.5 rounded ${ssc.bg} ${ssc.text}`}>{ssc.label}</div>
                      </div>
                      <div className="p-2">
                        <div className="text-[9px] text-gray-400">{s.zona}</div>
                        <div className="text-xs font-medium text-gray-900">{s.nume}</div>
                        <div className="text-xs font-medium mt-0.5" style={{ color: '#2d7a3a' }}>de la {formatPret(s.pretDeLa)}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

function ApartamenteTable({ apartamente, parcare }) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 px-2 text-xs text-gray-400 font-normal">Tip</th>
              <th className="text-left py-2 px-2 text-xs text-gray-400 font-normal">Suprafață</th>
              <th className="text-left py-2 px-2 text-xs text-gray-400 font-normal">Avans 20%</th>
              <th className="text-left py-2 px-2 text-xs text-gray-400 font-normal">Avans 45%</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {apartamente.map((apt, i) => (
              <tr key={i} className="apt-row border-b border-gray-50">
                <td className="py-2.5 px-2">
                  <span className="font-medium text-gray-900 text-sm">{apt.tip}</span>
                  {apt.promo && (
                    <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#fff3e0', color: '#c8922a' }}>PROMO</span>
                  )}
                </td>
                <td className="py-2.5 px-2 text-xs text-gray-600">{apt.suprafata} mp</td>
                <td className="py-2.5 px-2 text-sm font-medium" style={{ color: '#2d7a3a' }}>
                  {new Intl.NumberFormat('ro-RO').format(apt.avans20)}€
                </td>
                <td className="py-2.5 px-2 text-sm font-medium" style={{ color: '#2d7a3a' }}>
                  {new Intl.NumberFormat('ro-RO').format(apt.avans45)}€
                </td>
                <td className="py-2.5 px-2">
                  <button className="text-[10px] px-2 py-1 rounded border border-[#2d7a3a] text-[#2d7a3a] hover:bg-green-50 transition-colors whitespace-nowrap">
                    Detalii
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-gray-400 mt-2">
        Toate prețurile sunt + TVA.
        {parcare?.exterior?.disponibil && ` Parcare exterior ${new Intl.NumberFormat('ro-RO').format(parcare.exterior.pret)}€.`}
        {parcare?.subteran?.disponibil && ` Parcare subterană ${new Intl.NumberFormat('ro-RO').format(parcare.subteran.pret)}€.`}
      </p>
    </div>
  )
}
