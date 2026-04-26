import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI_PORTOFOLIU, getAnsambluPortofoliu } from '@/data/portofoliu'

const BASE = 'https://neofort-imob.vercel.app'

export function generateStaticParams() {
  return ANSAMBLURI_PORTOFOLIU.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
  const a = getAnsambluPortofoliu(params.slug)
  if (!a) return {}
  return {
    title: `${a.nume} — Ansamblu Rezidențial Finalizat | Neofort IMO`,
    description: `${a.nume}, ${a.zona}, ${a.sector} București. ${a.etaje}, ${a.totalApartamente} unități. ${a.tipuri.join(', ')}. Ansamblu finalizat și vândut Neofort IMO.`,
    alternates: { canonical: `${BASE}/portofoliu/${a.slug}` },
  }
}

const TIP_ICON = {
  metrou: '🚇',
  mall: '🛍️',
  scoala: '🎓',
  parc: '🌳',
  medical: '🏥',
  transport: '🚌',
  business: '🏢',
  sport: '⚽',
}

export default function PortofoliuAnsambluPage({ params }) {
  const a = getAnsambluPortofoliu(params.slug)
  if (!a) notFound()

  // Alte ansambluri din portofoliu pentru cross-linking
  const similare = ANSAMBLURI_PORTOFOLIU
    .filter(p => p.slug !== a.slug)
    .slice(0, 4)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Portofoliu', item: `${BASE}/portofoliu` },
      { '@type': 'ListItem', position: 3, name: a.nume, item: `${BASE}/portofoliu/${a.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header activePath="/portofoliu" />
      <main>

        {/* BREADCRUMB */}
        <div className="hidden md:block border-b border-gray-100 px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-gray-700">Acasă</Link>
            <span>›</span>
            <Link href="/portofoliu" className="hover:text-gray-700">Portofoliu</Link>
            <span>›</span>
            <span className="text-gray-700">{a.nume}</span>
          </div>
        </div>

        {/* HERO */}
        <section className="py-10 px-6 border-b border-gray-100" style={{ background: '#081c12' }}>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: '#c8922a' }}>
                  {a.zona} · {a.sector}
                </p>
                <h1 className="text-xl md:text-2xl font-medium text-white mb-3">{a.nume}</h1>
                <div className="flex flex-wrap gap-3 text-xs" style={{ color: '#9ca3af' }}>
                  <span>{a.etaje}</span>
                  <span>·</span>
                  <span>{a.totalApartamente} unități</span>
                  <span>·</span>
                  <span>{a.tipuri.join(', ')}</span>
                </div>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#9ca3af' }}>
                Ansamblu Finalizat · Stoc Epuizat
              </span>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* MAIN */}
            <div className="md:col-span-2 space-y-8">

              {/* DESCRIERE */}
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Despre ansamblu</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{a.descriere}</p>
              </div>

              {/* DOTARI */}
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Dotări și finisaje</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {a.dotari.map(d => (
                    <div key={d} className="flex items-center gap-2 text-xs text-gray-600">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2d7a3a" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* PUNCTE INTERES */}
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Locație și puncte de interes</h2>
                <div className="space-y-2">
                  {a.puncteInteres.map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 text-sm">
                      <span className="flex items-center gap-2 text-gray-700">
                        <span>{TIP_ICON[p.tip] || '📍'}</span>
                        {p.nume}
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-4">{p.distanta}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ANSAMBLURI SIMILARE - CROSS LINKING SEO */}
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-4">Alte ansambluri Neofort</h2>
                <div className="grid grid-cols-2 gap-3">
                  {similare.map(s => (
                    <Link key={s.slug} href={`/portofoliu/${s.slug}`}
                      className="p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all">
                      <div className="text-xs font-medium text-gray-900 mb-0.5">{s.nume}</div>
                      <div className="text-[10px] text-gray-500">{s.zona} · {s.sector}</div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* SIDEBAR */}
            <div className="space-y-4">

              {/* STATUS */}
              <div className="rounded-xl border border-gray-100 p-5">
                <div className="text-center mb-4">
                  <span className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 font-medium">
                    Stoc Epuizat
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-center leading-relaxed mb-4">
                  Acest ansamblu este finalizat și integral vândut. Consultați ansamblurile active pentru oferte disponibile.
                </p>
                <Link href="/ansambluri-rezidentiale"
                  className="block w-full py-2.5 rounded-xl text-xs font-medium text-center text-white"
                  style={{ background: '#2d7a3a' }}>
                  Vezi ansambluri disponibile
                </Link>
              </div>

              {/* BROKER */}
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                    <img src={a.brokerFoto} alt={a.broker} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-900">{a.broker}</div>
                    <div className="text-[10px] text-gray-500">Birou Informații</div>
                  </div>
                </div>
                <a href={`tel:${a.brokerTel}`}
                  className="block w-full py-2 rounded-lg text-xs font-medium text-center border border-blue-100 bg-blue-50 text-blue-700">
                  {a.brokerTel.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')}
                </a>
              </div>

              {/* PARCARE */}
              {a.parcare && (
                <div className="rounded-xl border border-gray-100 p-4 text-xs">
                  <h3 className="font-medium text-gray-900 mb-2">Parcare</h3>
                  {a.parcare.subteran && <div className="text-gray-600">✓ Subterană{a.parcare.pretSubteran ? ` — ${a.parcare.pretSubteran.toLocaleString()}€` : ''}</div>}
                  {a.parcare.suprateran && <div className="text-gray-600">✓ Supraterană{a.parcare.pretSuprateran ? ` — ${a.parcare.pretSuprateran.toLocaleString()}€` : ''}</div>}
                  {a.parcare.boxe && <div className="text-gray-600">✓ Boxe{a.parcare.pretBoxe ? ` — ${a.parcare.pretBoxe.toLocaleString()}€` : ''}</div>}
                </div>
              )}

              {/* LINK PORTOFOLIU */}
              <Link href="/portofoliu"
                className="block text-xs text-center py-2.5 rounded-lg border border-gray-100 text-gray-500 hover:bg-gray-50">
                ← Înapoi la Portofoliu
              </Link>

            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
