import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FormularRapid from '@/components/FormularRapid'
import ApartamenteTable from '@/components/ApartamenteTable'
import { ANSAMBLURI, ANSAMBLURI_ACTIVE, getAnsamblu, STATUS_CONFIG, formatPret } from '@/data/ansambluri'

const BASE = 'https://neofort-imob.vercel.app'
const TEL = '0743250029'
const TEL_DISPLAY = '0743 250 029'

export async function generateStaticParams() {
  return ANSAMBLURI.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const a = getAnsamblu(params.slug)
  if (!a) return {}
  const url = `${BASE}/ansamblu-rezidential/${a.slug}`
  return {
    title: `Apartamente noi ${a.zona} | ${a.nume} | De la ${new Intl.NumberFormat('ro-RO').format(a.pretDeLa)}€ | Neofort IMO`,
    description: `${a.apartamente.length} tipuri de apartamente în ${a.zona}, ${a.sector} București. Prețuri de la ${new Intl.NumberFormat('ro-RO').format(a.pretDeLa)}€+TVA. ${a.dataPredare !== 'Finalizat' ? `Predare ${a.dataPredare}.` : 'Finalizat.'} ${a.puncteInteres[0] ? `${a.puncteInteres[0].tip === 'metrou' ? 'Metrou' : ''} ${a.puncteInteres[0].nume} la ${a.puncteInteres[0].distanta}.` : ''} ☎ ${TEL_DISPLAY}`,
    alternates: { canonical: url },
    openGraph: {
      title: `${a.nume} — Apartamente noi ${a.zona} | Neofort IMO`,
      description: `Apartamente ${a.tipuri.join(', ')} în ${a.zona}, ${a.sector}. De la ${new Intl.NumberFormat('ro-RO').format(a.pretDeLa)}€+TVA.`,
      url,
      type: 'website',
      locale: 'ro_RO',
    },
  }
}

const POI_COLORS = {
  metrou: { bg: '#e3f2fd', color: '#1565c0', label: 'Metrou' },
  mall: { bg: '#f3e5f5', color: '#6a1b9a', label: 'Mall' },
  scoala: { bg: '#e8f5e9', color: '#2e7d32', label: 'Școală' },
  parc: { bg: '#e0f2f1', color: '#00695c', label: 'Parc' },
  medical: { bg: '#fce4ec', color: '#c62828', label: 'Medical' },
}

export default function AnsambluPage({ params }) {
  const a = getAnsamblu(params.slug)
  if (!a) notFound()

  const sc = STATUS_CONFIG[a.status]
  const similare = ANSAMBLURI_ACTIVE.filter(x => x.slug !== a.slug && (x.zona === a.zona || x.sector === a.sector)).slice(0, 3)

  // Google Maps embed URL din coordonate
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${a.coordonate.lat},${a.coordonate.lng}&z=15&output=embed`

  // Schema.org RealEstateListing
  const realEstateSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${BASE}/ansamblu-rezidential/${a.slug}`,
    name: a.nume,
    description: a.descriere,
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    image: `${BASE}/logo.avif`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'București',
      addressRegion: a.sector,
      addressCountry: 'RO',
      streetAddress: a.adresa,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: a.coordonate.lat,
      longitude: a.coordonate.lng,
    },
    offers: a.apartamente.slice(0, 5).map(apt => ({
      '@type': 'Offer',
      name: apt.tip,
      price: apt.pretPromo || apt.avans45 || apt.avans20,
      priceCurrency: 'EUR',
      availability: apt.stocEpuizat ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Neofort IMO' },
    })),
    numberOfRooms: a.apartamente.map(apt => apt.camere),
    floorSize: {
      '@type': 'QuantitativeValue',
      minValue: a.apartamente[0]?.suprafata,
      maxValue: a.apartamente[a.apartamente.length - 1]?.suprafata,
      unitCode: 'MTK',
    },
  }

  // Schema.org FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Care sunt prețurile apartamentelor din ${a.nume}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Prețurile apartamentelor din ${a.nume} încep de la ${new Intl.NumberFormat('ro-RO').format(a.pretDeLa)}€ + TVA. Sunt disponibile ${a.tipuri.join(', ')}, cu suprafețe între ${a.apartamente[0]?.suprafata} și ${a.apartamente[a.apartamente.length-1]?.suprafata} mp.`,
        },
      },
      {
        '@type': 'Question',
        name: `Când este predarea apartamentelor la ${a.nume}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a.dataPredare === 'Finalizat' ? `${a.nume} este un ansamblu finalizat, apartamentele sunt disponibile imediat.` : `Termenul de predare pentru ${a.nume} este ${a.dataPredare}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Ce dotări sunt incluse la apartamentele ${a.nume}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Apartamentele din ${a.nume} includ: ${a.dotari.slice(0, 6).join(', ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Există locuri de parcare la ${a.nume}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: (() => {
            const p = a.parcare
            const opts = []
            if (p.exterior?.disponibil) opts.push(`parcare exterioară de la ${new Intl.NumberFormat('ro-RO').format(p.exterior.pret)}€`)
            if (p.interior?.disponibil) opts.push(`parcare interioară de la ${new Intl.NumberFormat('ro-RO').format(p.interior.pret)}€`)
            if (p.subteran?.disponibil && p.subteran.pret) opts.push(`parcare subterană de la ${new Intl.NumberFormat('ro-RO').format(p.subteran.pret)}€`)
            return opts.length > 0 ? `Da, la ${a.nume} sunt disponibile: ${opts.join(', ')}.` : `Contactați-ne pentru disponibilitatea locurilor de parcare la ${a.nume}.`
          })(),
        },
      },
      {
        '@type': 'Question',
        name: `Cum fac o rezervare pentru un apartament din ${a.nume}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Pentru a rezerva un apartament în ${a.nume} contactați-ne la ${TEL_DISPLAY} sau pe WhatsApp. Procesul de rezervare este simplu și transparent, conform noilor reglementări legislative în vigoare.`,
        },
      },
      {
        '@type': 'Question',
        name: `Cât este distanța de la ${a.nume} la metrou?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: a.puncteInteres.filter(p => p.tip === 'metrou').length > 0
            ? `De la ${a.nume} până la ${a.puncteInteres.find(p => p.tip === 'metrou').nume} distanța este de ${a.puncteInteres.find(p => p.tip === 'metrou').distanta}.`
            : `Contactați-ne pentru detalii despre accesul la transport public din zona ${a.zona}.`,
        },
      },
    ],
  }

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Ansambluri rezidențiale', item: `${BASE}/ansambluri-rezidentiale` },
      { '@type': 'ListItem', position: 3, name: a.nume, item: `${BASE}/ansamblu-rezidential/${a.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
                  {sc.label}{a.dataPredare !== 'Finalizat' && ` · Predare ${a.dataPredare}`}
                </div>
                <h1 className="text-xl md:text-2xl font-medium text-white leading-tight mb-2">
                  Ansamblu Rezidențial<br />{a.nume}
                </h1>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {a.adresa}
                </div>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style={{ border: '0.5px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.6)' }}>♡</button>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { val: [...new Set(a.tipuri.map(t => t.match(/\d+/)?.[0]).filter(Boolean))].sort((x,y) => x-y).join(', ') + ' cam.', lbl: 'Tipuri' },
                { val: `de la ${formatPret(a.pretDeLa)}`, lbl: 'Preț de la' },
                { val: a.apartamente.length > 0 ? `${a.apartamente[0].suprafata}–${a.apartamente[a.apartamente.length-1].suprafata}mp` : 'N/A', lbl: 'Suprafețe' },
                { val: a.etaje, lbl: 'Regim înălțime' },
                { val: a.puncteInteres[0]?.distanta || 'N/A', lbl: a.puncteInteres[0]?.tip === 'metrou' ? 'Până la metrou' : 'Distanță' },
                { val: STATUS_CONFIG[a.status].label, lbl: 'Status', color: STATUS_CONFIG[a.status].dot },
              ].map((s, i) => (
                <div key={i} className="rounded-lg p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
                  <div className="text-sm font-medium leading-snug" style={{ color: s.color || '#e8b44e' }}>{s.val}</div>
                  <div className="text-[9px] mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BODY — 2 COLOANE */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6">

            {/* COLOANA MAIN */}
            <div className="space-y-0">

              {/* GALERIE in coloana main — latime egala cu coloana, sidebar in dreapta */}
              <div className="mb-6">
                <div className="bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg" style={{ aspectRatio: '16/9' }}>
                  <span className="text-sm text-gray-400">Fotografie principală</span>
                </div>
                <div className="grid gap-1 mt-1.5" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                  {[2,3,4,5,6,7].map(n => (
                    <div key={n} className="bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                      <span className="text-[9px] text-gray-400">{n}</span>
                    </div>
                  ))}
                  <div className="bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors" style={{ aspectRatio: '16/9' }}>
                    <span className="text-[9px] font-medium text-gray-600">+{a.galerie.length || 10}</span>
                  </div>
                </div>
              </div>

              {/* TAB GALERIE — sub galerie */}
              <div className="flex gap-2 overflow-x-auto nav-scroll" style={{ marginBottom: 24 }}>
                {['Exterior', 'Interior', 'Randări', 'Plan etaj'].map((t, i) => (
                  <span key={t} className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer whitespace-nowrap flex-shrink-0 ${i === 0 ? 'bg-[#2d7a3a] border-[#2d7a3a] text-white' : 'border-gray-200 text-gray-500'}`}>{t}</span>
                ))}
              </div>

              {/* DESCRIERE */}
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Despre ansamblu</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{a.descriere}</p>
              </div>

              {/* APARTAMENTE */}
              <div className="py-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Apartamente disponibile</h2>
                <ApartamenteTable apartamente={a.apartamente} parcare={a.parcare} ansambluNume={a.nume} />
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

              {/* LOCATIE CU HARTA IFRAME */}
              <div className="py-6">
                <h2 className="text-base font-medium text-gray-900 mb-4">Locație și transport</h2>
                <div className="rounded-xl overflow-hidden mb-4" style={{ height: 280 }}>
                  <iframe
                    src={mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Harta ${a.nume}`}
                  />
                </div>
                <div className="space-y-2">
                  {a.puncteInteres.map((p, i) => {
                    const cfg = POI_COLORS[p.tip] || { bg: '#f3f4f6', color: '#374151', label: p.tip }
                    return (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap" style={{ background: cfg.bg, color: cfg.color }}>
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
            <div className="md:sticky md:top-36 self-start">
              <FormularRapid ansambluNume={a.nume} broker={a.broker} brokerTel={a.brokerTel} />
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
