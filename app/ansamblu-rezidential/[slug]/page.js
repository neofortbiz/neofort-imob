import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FormularRapid from '@/components/FormularRapid'
import GalerieAnsamblu from '@/components/GalerieAnsamblu'
import DescriereExpand from '@/components/DescriereExpand'
import ApartamenteTable from '@/components/ApartamenteTable'
import { ANSAMBLURI, ANSAMBLURI_ACTIVE, getAnsamblu, STATUS_CONFIG, formatPret, hasPromo } from '@/data/ansambluri'
import { getOricareAnsambluPortofoliu, TOATE_PORTOFOLIU } from '@/data/portofoliu'
import AnsambluVandut from '@/components/AnsambluVandut'

const BASE = 'https://www.neofort.ro'
const TEL = '0758090904'
const TEL_DISPLAY = '0758 090 904'

// Toate ansamblurile (active + vandute) sunt servite canonic la
// /ansamblu-rezidential/<slug>. Cele active randeaza modul de vanzare; cele
// vandute (din portofoliu) randeaza modul "stoc epuizat". /portofoliu/<slug>
// redirectioneaza 301 catre acest URL. Astfel un proiect nu-si schimba niciodata
// adresa intre vanzare si vandut (zero churn SEO).
const getVandutCanonic = (slug) => getOricareAnsambluPortofoliu(slug)

export async function generateStaticParams() {
  return [
    ...ANSAMBLURI.map(a => ({ slug: a.slug })),
    ...TOATE_PORTOFOLIU.map(a => ({ slug: a.slug })),
  ]
}

export async function generateMetadata({ params }) {
  const a = getAnsamblu(params.slug)
  if (!a) {
    const v = getVandutCanonic(params.slug)
    if (v) {
      const url = `${BASE}/ansamblu-rezidential/${v.slug}`
      return {
        title: { absolute: `Ansamblu Rezidențial ${v.zona} — Neofort ${v.numar}` },
        description: `${v.nume}, ${v.zona}, ${v.sector} București. ${v.etaje}, ${v.totalApartamente} unități. Ansamblu finalizat și vândut integral de Neofort IMO.`,
        alternates: { canonical: url },
        openGraph: {
          title: `${v.nume} — Ansamblu Rezidențial ${v.zona}`,
          description: `${v.nume}, ${v.zona}, ${v.sector}. Ansamblu finalizat și vândut integral. ${v.etaje}, ${v.totalApartamente} unități.`,
          url,
          images: [{ url: `${BASE}/og-portofoliu/${v.slug}.jpg`, width: 1200, height: 630, alt: v.nume }],
        },
        twitter: {
          card: 'summary_large_image',
          title: `${v.nume} | Neofort IMO`,
          description: `Ansamblu finalizat în ${v.zona}, ${v.sector}. ${v.totalApartamente} unități livrate.`,
          images: [`${BASE}/og-portofoliu/${v.slug}.jpg`],
        },
      }
    }
    return {}
  }
  const url = `${BASE}/ansamblu-rezidential/${a.slug}`
  // Folosim seoTitle/seoDescription din date daca exista, altfel formula dinamica
  const title = a.seoTitle ||
    `Ansamblu Rezidențial ${a.zona} — ${a.nume}`
  const description = a.seoDescription ||
    `${a.tipuri.join(', ')} în ${a.zona}, ${a.sector} București. Prețuri de la ${new Intl.NumberFormat('ro-RO').format(a.pretDeLa)}€+TVA. ${a.dataPredare !== 'Finalizat' ? `Predare ${a.dataPredare}.` : 'Finalizat.'} ${a.puncteInteres[0] ? `${a.puncteInteres[0].nume} la ${a.puncteInteres[0].distanta}.` : ''}`

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | Neofort IMO`,
      description: `Apartamente ${a.tipuri.join(', ')} în ${a.zona}, ${a.sector}. De la ${new Intl.NumberFormat('ro-RO').format(a.pretDeLa)}€+TVA.`,
      url,
      type: 'website',
      locale: 'ro_RO',
      images: [{ url: `https://www.neofort.ro/og-ansambluri/${a.slug === 'neofort-28-titan-pallady-faza-2' ? 'neo-28f2' : 'neo-' + a.numar}.jpg`, width: 1200, height: 630, alt: a.nume }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://www.neofort.ro/og-ansambluri/${a.slug === 'neofort-28-titan-pallady-faza-2' ? 'neo-28f2' : 'neo-' + a.numar}.jpg`],
    },
  }
}

const POI_COLORS = {
  metrou:    { bg: '#e3f2fd', color: '#1565c0', label: 'Metrou',    icon: '🚇' },
  mall:      { bg: '#f3e5f5', color: '#6a1b9a', label: 'Mall',      icon: '🛍️' },
  scoala:    { bg: '#e8f5e9', color: '#2e7d32', label: 'Școală',    icon: '🎓' },
  parc:      { bg: '#e0f2f1', color: '#00695c', label: 'Parc',      icon: '🌳' },
  medical:   { bg: '#fce4ec', color: '#c62828', label: 'Medical',   icon: '🏥' },
  transport: { bg: '#fff8e1', color: '#f57f17', label: 'Transport', icon: '🚌' },
  business:  { bg: '#fafafa', color: '#424242', label: 'Business',  icon: '🏢' },
  sport:     { bg: '#e8f5e9', color: '#1b5e20', label: 'Sport',     icon: '⚽' },
}

export default function AnsambluPage({ params }) {
  const a = getAnsamblu(params.slug)
  if (!a) {
    const v = getVandutCanonic(params.slug)
    if (v) return <AnsambluVandut a={v} basePath="/ansamblu-rezidential" />
    notFound()
  }

  const sc = STATUS_CONFIG[a.dataPredare === 'Finalizat' ? 'activ' : 'constructie']
  const similare = ANSAMBLURI_ACTIVE.filter(x => x.slug !== a.slug && (x.zona === a.zona || x.sector === a.sector)).slice(0, 5)

  // Google Maps embed URL din coordonate
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${a.coordonate.lng - 0.008}%2C${a.coordonate.lat - 0.006}%2C${a.coordonate.lng + 0.008}%2C${a.coordonate.lat + 0.006}&layer=mapnik&marker=${a.coordonate.lat}%2C${a.coordonate.lng}`

  // Schema.org RealEstateListing
  const realEstateSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${BASE}/ansamblu-rezidential/${a.slug}`,
    name: a.nume,
    description: a.descriereCompleta || a.descriere,
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    image: a.imagini?.cover ? `${BASE}${a.imagini.cover}` : `${BASE}/og-ansambluri/${a.slug === 'neofort-28-titan-pallady-faza-2' ? 'neo-28f2' : 'neo-' + a.numar}.jpg`,
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

  // Schema.org ApartmentComplex — descrie ansamblul ca entitate fizica rezidentiala
  // (complementar cu RealEstateListing, care descrie oferta). Ajuta Google sa inteleaga
  // proiectul ca un complex de apartamente, nu doar ca o listare.
  const apartmentComplexSchema = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    '@id': `${BASE}/ansamblu-rezidential/${a.slug}#complex`,
    name: a.nume,
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    description: a.descriereCompleta || a.descriere,
    image: a.imagini?.cover ? `${BASE}${a.imagini.cover}` : `${BASE}/og-ansambluri/${a.slug === 'neofort-28-titan-pallady-faza-2' ? 'neo-28f2' : 'neo-' + a.numar}.jpg`,
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
    amenityFeature: (a.dotari || []).slice(0, 12).map(d => ({
      '@type': 'LocationFeatureSpecification',
      name: d,
      value: true,
    })),
    containedInPlace: {
      '@type': 'Place',
      name: `${a.zona}, ${a.sector}, București`,
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
          text: `Pentru a rezerva un apartament în ${a.nume} contactați-ne la ${a.brokerTel || TEL_DISPLAY} sau pe WhatsApp. Procesul de rezervare este simplu și transparent, conform noilor reglementări legislative în vigoare.`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apartmentComplexSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header activePath="/ansambluri-rezidentiale" />
      <main>
        {/* BREADCRUMB */}
        <div className="hidden md:block border-b border-gray-100 px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600">
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
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                    {a.dataPredare && a.dataPredare !== 'Finalizat' ? 'În construcție' : sc.label}{a.dataPredare !== 'Finalizat' && ` · Predare ${a.dataPredare}`}
                  </div>
                  {hasPromo(a) && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-medium px-2.5 py-1 rounded-full text-white"
                      style={{ background: '#c0392b' }}>
                      🏷 Promoție disponibilă
                    </div>
                  )}
                </div>
                <h1 className="text-xl md:text-2xl font-medium text-white leading-tight mb-2">
                  Ansamblu Rezidențial<br />{a.nume}
                </h1>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {a.adresa}
                </div>
              </div>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { val: [...new Set(a.tipuri.map(t => String(t).match(/\d+/)?.[0]).filter(Boolean))].sort((x,y) => x-y).join(', ') + ' cam.', lbl: 'Tipuri' },
                { val: `de la ${formatPret(a.pretDeLa)}`, lbl: 'Preț de la' },
                { val: a.apartamente.length > 0 ? `${a.apartamente[0].suprafata}–${a.apartamente[a.apartamente.length-1].suprafata}mp` : 'N/A', lbl: 'Suprafețe' },
                { val: (() => {
                  const parts = (a.etaje || '').split('+')
                  if (parts.length <= 4) return a.etaje
                  // Pastram primul, unul din mijloc, ultimul
                  const mid = parts[Math.floor(parts.length / 2)]
                  return `${parts[0]}+...+${mid}+${parts[parts.length - 1]}`
                })(), lbl: 'Regim înălțime' },
                { val: a.puncteInteres[0]?.distanta || 'N/A', lbl: a.puncteInteres[0]?.tip === 'metrou' ? 'Până la metrou' : 'Distanță' },
                { val: STATUS_CONFIG[a.dataPredare === 'Finalizat' ? 'activ' : 'constructie'].label, lbl: 'Status', color: STATUS_CONFIG[a.dataPredare === 'Finalizat' ? 'activ' : 'constructie'].dot },
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

              {/* GALERIE — componenta cu imagini reale */}
              <div className="mb-6">
                <GalerieAnsamblu imagini={a.imagini || {}} nume={a.nume} altText={a.imagini?.altTextExterior || ""} />
              </div>

              {/* DESCRIERE */}
              <div className="pb-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Despre ansamblu</h2>
                <DescriereExpand text={a.descriereCompleta || a.descriere} />
              </div>

              {/* APARTAMENTE */}
              <div className="py-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Apartamente disponibile</h2>
                <div style={{ overflowX: 'hidden' }}><ApartamenteTable apartamente={a.apartamente} parcare={a.parcare} ansambluNume={a.nume} brokerTel={a.brokerTel} /></div>
              </div>

              {/* DOTARI */}
              <div className="py-6 border-b border-gray-100">
                <h2 className="text-base font-medium text-gray-900 mb-4">Dotări și finisaje</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {a.dotari.map(d => (
                    <div key={d} className="flex items-center gap-2 text-sm text-gray-700">
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
                    src={osmEmbedUrl}
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
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 whitespace-nowrap flex items-center gap-1" style={{ background: cfg.bg, color: cfg.color }}>
                          <span>{cfg.icon}</span>{cfg.label}
                        </span>
                        <span>{p.nume}</span>
                        <span className="ml-auto text-xs text-gray-600 whitespace-nowrap">{p.distanta}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="md:sticky self-start" style={{ top: '96px' }}>
              <FormularRapid ansambluNume={a.nume} broker={a.broker} brokerTel={a.brokerTel} brokerFoto={a.brokerFoto || ""} />
            </div>
          </div>
        </div>

        {/* FAQ VIZIBIL */}
        <div className="border-t border-gray-100 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-base font-medium text-gray-900 mb-4">Întrebări frecvente despre {a.nume}</h2>
            <div className="space-y-2">
              {faqSchema.mainEntity.map((item, i) => (
                <details key={i} className="group rounded-xl border border-gray-100 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-sm font-medium text-gray-900 select-none list-none">
                    {item.name}
                    <svg className="flex-shrink-0 w-4 h-4 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-3">
                    {item.acceptedAnswer.text}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* ANSAMBLURI SIMILARE */}
        {similare.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-base font-medium text-gray-900 mb-4">Ansambluri similare în zonă</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {similare.map(s => {
                  const ssc = STATUS_CONFIG[s.dataPredare === 'Finalizat' ? 'activ' : 'constructie']
                  return (
                    <Link key={s.slug} href={`/ansamblu-rezidential/${s.slug}`} className="border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all group">
                      <div className="h-24 bg-gray-100 relative overflow-hidden">
                        {s.imagini?.cover ? (
                          <img src={s.imagini.cover} alt={s.imagini?.altTextExterior || s.nume} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} className="group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 bg-gray-100" />
                        )}
                        <div className={`absolute top-1.5 left-1.5 text-[8px] font-medium px-1.5 py-0.5 rounded ${ssc.bg} ${ssc.text}`}>{ssc.label}</div>
                      </div>
                      <div className="p-2">
                        <div className="text-[9px] text-gray-500">{s.zona}</div>
                        <div className="text-[11px] font-medium text-gray-900 leading-tight">{s.nume}</div>
                        <div className="text-[11px] font-medium mt-0.5" style={{ color: '#2d7a3a' }}>de la {formatPret(s.pretDeLa)}</div>
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
