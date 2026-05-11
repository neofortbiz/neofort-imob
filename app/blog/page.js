import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Blog Imobiliar București — Noutăți, Analize, Legislație | Neofort IMO',
  description: 'Articole de specialitate despre piața imobiliară din București: evoluția prețurilor, legislație, ghiduri de cumpărare și tendințe. Expertiză din 2009.',
  alternates: { canonical: `${BASE}/blog` },
  openGraph: {
    title: 'Blog Imobiliar București — Neofort IMO',
    description: 'Analize și noutăți despre piața imobiliară din București de la experții Neofort IMO — din 2009 în piață.',
    url: `${BASE}/blog`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${BASE}/og-blog.jpg`, width: 1200, height: 630, alt: 'Neofort IMO' }],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE}/og-blog.jpg`] },
}

export const ARTICOLE = [
  {
    slug: 'e-proprietatea-2026-noul-sistem-de-impozitare',
    titlu: 'E-Proprietatea 2026 — Noul sistem de impozitare a proprietăților explicat complet',
    tag: 'Legislație', tagColor: '#7c3aed',
    data: '22 Aprilie 2026', dataISO: '2026-04-22', citire: '8 min',
    image: '/blog/e-proprietatea-2026-sistem-impozitare.avif',
    rezumat: 'Ce este E-Proprietatea, cum schimbă impozitarea imobiliară din 2026 și ce înseamnă concret pentru proprietarii și cumpărătorii de apartamente noi în București.',
    autor: 'Igor Calutu', autorSlug: 'igor-calutu', featured: true,
  },
  {
    slug: 'preturi-apartamente-bucuresti-2026',
    titlu: 'Prețurile Apartamentelor din București în 2026: Scad sau Nu? Analiză cu Date Reale',
    tag: 'Piață', tagColor: '#0369a1',
    data: '5 Aprilie 2026', dataISO: '2026-04-05', citire: '10 min',
    image: '/blog/preturi-apartamente-bucuresti-2026-scad-sau-nu.avif',
    rezumat: 'Prețurile apartamentelor din București scad sau cresc în 2026? Analiză cu date ANCPI, INS și piața locală: evoluție pe zone, impactul TVA 21% și ce înseamnă pentru cumpărătorii de azi.',
    autor: 'Sasha Calutu', autorSlug: 'sasha-calutu', featured: false,
  },
  {
    slug: 'tva-apartamente-noi-2026',
    titlu: 'TVA la Apartamente Noi în 2026: Cât Plătești și Cum Eviți Surprizele Fiscale',
    tag: 'Legislație', tagColor: '#7c3aed',
    data: '10 Aprilie 2026', dataISO: '2026-04-10', citire: '9 min',
    image: '/blog/tva-apartamente-noi-bucuresti-2026.avif',
    rezumat: 'TVA la apartamente noi în 2026: ce cote se aplică, cine mai poate beneficia de 9%, când se aplică 21% și cum calculezi prețul total real al achiziției. Date oficiale actualizate.',
    autor: 'Igor Calutu', autorSlug: 'igor-calutu', featured: false,
  },
  {
    slug: 'titan-pallady-cea-mai-cautata-zona',
    titlu: 'Titan–Pallady: De Ce a Devenit Cea Mai Căutată Zonă Rezidențială din București',
    tag: 'Zone', tagColor: '#0891b2',
    data: '25 Aprilie 2026', dataISO: '2026-04-25', citire: '8 min',
    image: '/blog/titan-pallady-cea-mai-cautata-zona-bucuresti.avif',
    rezumat: 'De ce Titan–Pallady a ajuns zona cu cel mai mare ritm de creștere din București? Metrou M2, IKEA, parcuri, prețuri accesibile și cerere din diasporă — analiza completă.',
    autor: 'Raluca Nistor', autorSlug: 'raluca-nistor', featured: false,
  },
  {
    slug: 'noua-casa-2026-ghid-complet',
    titlu: 'Programul Noua Casă 2026: Ghid Complet — Condiții, Bănci, Avans și Ce Apartamente Se Califică',
    tag: 'Finanțare', tagColor: '#0369a1',
    data: '28 Aprilie 2026', dataISO: '2026-04-28', citire: '10 min',
    image: '/blog/noua-casa-2026-ghid-complet.avif',
    rezumat: 'Ghid complet Noua Casă 2026: plafon de 500 milioane lei aprobat prin HG, condiții de eligibilitate, avans minim, bănci partenere și ce apartamente se califică.',
    autor: 'Adriana Veselu', autorSlug: 'adriana-veselu', featured: false,
  },
  {
    slug: 'cumparare-apartament-din-diaspora',
    titlu: 'Cumperi Apartament în București din Diasporă: Ghid Complet Pas cu Pas',
    tag: 'Ghid', tagColor: '#2d7a3a',
    data: '1 Mai 2026', dataISO: '2026-05-01', citire: '12 min',
    image: '/blog/cumparare-apartament-diaspora-ghid.avif',
    rezumat: 'Ghid complet pentru românii din diasporă care vor să cumpere apartament în București: procuri notariale, transfer valută, alegerea zonei, riscuri și sfaturi din experiența cu clienți din Germania, Austria, Israel, Franța, Turcia și R. Moldova.',
    autor: 'Svetlana Calutu', autorSlug: 'svetlana-calutu', featured: false,
  },
  {
    slug: 'apartament-nou-vs-vechi-calcul-real',
    titlu: 'Apartament Nou vs. Apartament Vechi în București: Calculul Real al Costurilor Totale',
    tag: 'Analiză', tagColor: '#c2410c',
    data: '4 Mai 2026', dataISO: '2026-05-04', citire: '9 min',
    image: '/blog/apartament-nou-vs-vechi-calcul-real.avif',
    rezumat: 'Apartament nou sau vechi în București? Calculul complet al costurilor reale: preț achiziție, costuri ascunse, întreținere, risc seismic, impozit E-Proprietatea și randament închiriere.',
    autor: 'Ramona Baicu', autorSlug: 'ramona-baicu', featured: false,
  },
  {
    slug: 'predare-la-cheie-ce-inseamna',
    titlu: 'Predare la Cheie la Apartamente Noi: Ce Trebuie să Conțină și Ce să Verifici',
    tag: 'Ghid', tagColor: '#2d7a3a',
    data: '7 Mai 2026', dataISO: '2026-05-07', citire: '8 min',
    image: '/blog/predare-la-cheie-apartament-nou-ce-inseamna.avif',
    rezumat: 'Ce înseamnă predare la cheie la un apartament nou? Lista completă a finisajelor incluse, ce poate lipsi, checklist de verificare la predare și drepturile legale ale cumpărătorilor.',
    autor: 'Adrian Pintilie', autorSlug: 'adrian-pintilie', featured: false,
  },
  {
    slug: 'randament-inchiriere-zone-bucuresti',
    titlu: 'Randament la Închiriere pe Zone din București în 2026: Unde Investești Cel Mai Bine',
    tag: 'Investiții', tagColor: '#0369a1',
    data: '10 Mai 2026', dataISO: '2026-05-10', citire: '10 min',
    image: '/blog/randament-inchiriere-apartamente-bucuresti-zone.avif',
    rezumat: 'Randamentul la închiriere în București pe zone în 2026: calcule reale pentru Titan-Pallady, Militari, Moșilor, Floreasca, Piața Muncii. Ce zone oferă cel mai bun randament net.',
    autor: 'Sasha Calutu', autorSlug: 'sasha-calutu', featured: false,
  },
  {
    slug: 'ghid-cumparare-apartament-nou',
    titlu: 'Ghid complet 2026: Cum cumperi un apartament nou de la dezvoltator fără greșeli',
    tag: 'Ghid', tagColor: '#2d7a3a',
    data: '10 Martie 2026', dataISO: '2026-03-10', citire: '12 min',
    image: '/blog/ghid-cumparare-apartament-nou-bucuresti.avif',
    rezumat: 'Toți pașii de la prima vizită până la predarea cheilor: ce verifici la contract, cum negociezi, ce capcane există și cum le eviți. Ghid scris de consultanți cu 15+ ani experiență.',
    autor: 'Adriana Veselu', autorSlug: 'adriana-veselu', featured: false,
  },
]

const AUTORI = {
  'igor-calutu': {
    nume: 'Igor Calutu', titlu: 'Director General & Analist Piață Imobiliară',
    bio: 'Cu peste 22 de ani de experiență în piața imobiliară bucureșteană, Igor Calutu a coordonat livrarea a peste 85 de ansambluri rezidențiale. Analist activ al tendințelor de piață.',
    foto: '/brokeri/igor-calutu.avif',
  },
  'adriana-veselu': {
    nume: 'Adriana Veselu', titlu: 'Reprezentant Vanzari Zona Centrala — 16 ani',
    bio: 'Adriana Veselu are 14 ani in Neofort IMO si peste 400 de tranzactii finalizate.',
    foto: '/brokeri/adriana-veselu.avif',
  },
  'sasha-calutu': {
    nume: 'Sasha Calutu', titlu: 'Reprezentant Vanzari Zona Centrala — 17 ani',
    bio: 'Sasha Calutu are toti cei 17 ani de cariera imobiliara petrecuti in Neofort IMO.',
    foto: '/brokeri/sasha-calutu.avif',
  },
  'ramona-baicu': {
    nume: 'Ramona Baicu', titlu: 'Reprezentant Vanzari Zona Sud-Vest — 17 ani',
    bio: 'Ramona Baicu activeaza in piata imobiliara de 17 ani, cu 11 ani in Neofort IMO.',
    foto: '/brokeri/ramona-baicu.avif',
  },
  'svetlana-calutu': {
    nume: 'Svetlana Calutu', titlu: 'Reprezentant Vanzari Zona Centrala — 21 ani',
    bio: 'Svetlana Calutu are 18 ani in Neofort IMO, expertiza in zona centrala si semicentrala.',
    foto: '/brokeri/svetlana-calutu.avif',
  },
  'adrian-pintilie': {
    nume: 'Adrian Pintilie', titlu: 'Reprezentant Vanzari Zona Sud-Est — 15 ani',
    bio: 'Adrian Pintilie - 14 ani in Neofort IMO, specialist zona Titan-Pallady-IOR.',
    foto: '/brokeri/adrian-pintilie.avif',
  },
  'raluca-nistor': {
    nume: 'Raluca Nistor', titlu: 'Reprezentant Vanzari Zona Est — 10 ani',
    bio: 'Raluca Nistor, consultantul de referinta pentru zona est a Capitalei la Neofort IMO.',
    foto: '/brokeri/raluca-nistor.avif',
  },
}

const CATEGORII = [
  { label: 'Ghid', count: 3, color: '#2d7a3a' },
  { label: 'Legislație', count: 2, color: '#7c3aed' },
  { label: 'Piață', count: 1, color: '#0369a1' },
  { label: 'Finanțare', count: 1, color: '#0369a1' },
  { label: 'Zone', count: 1, color: '#0891b2' },
  { label: 'Analiză', count: 1, color: '#c2410c' },
  { label: 'Investiții', count: 1, color: '#0369a1' },
]

const FEATURED = ARTICOLE.find(a => a.featured)
const REST = ARTICOLE.filter(a => !a.featured)

export default function BlogPage() {
  return (
    <>
      <Header activePath="/blog" />
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-100" style={{ background: '#f8faf9' }}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-700">Blog Imobiliar</span>
            </nav>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Imobiliar București</h1>
                <p className="text-gray-500 text-sm max-w-xl">Analize, legislație și ghiduri practice despre piața imobiliară din București — scrise de consultanți cu experiență reală din 2009.</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span><span className="text-[#2d7a3a]">✓</span> Conținut verificat de experți</span>
                <span><span className="text-[#2d7a3a]">✓</span> Actualizat 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <div>
              {FEATURED && (
                <div className="mb-10">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Articol recomandat</p>
                  <Link href={`/blog/${FEATURED.slug}`} className="group block">
                    <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: '16/7' }}>
                      {FEATURED.image && <Image src={FEATURED.image} alt={FEATURED.titlu} fill sizes="100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" priority />}
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }} />
                      <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: FEATURED.tagColor }}>{FEATURED.tag}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2d7a3a] transition-colors leading-snug">{FEATURED.titlu}</h2>
                    <p className="text-gray-500 text-sm mb-3 leading-relaxed">{FEATURED.rezumat}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image src={AUTORI[FEATURED.autorSlug]?.foto || '/logo.avif'} alt={FEATURED.autor} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-gray-700">{FEATURED.autor}</span>
                      <span>·</span>
                      <time dateTime={FEATURED.dataISO}>{FEATURED.data}</time>
                      <span>·</span>
                      <span>{FEATURED.citire} citire</span>
                    </div>
                  </Link>
                </div>
              )}

              <div className="border-t border-gray-100 mb-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {REST.map(a => {
                  const autor = AUTORI[a.autorSlug]
                  return (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all">
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        {a.image ? (
                          <Image src={a.image} alt={a.titlu} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : <div className="absolute inset-0 bg-gray-100" />}
                        <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: a.tagColor }}>{a.tag}</span>
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm font-semibold text-gray-900 leading-snug mb-2 group-hover:text-[#2d7a3a] transition-colors">{a.titlu}</h2>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{a.rezumat}</p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                          <div className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            <Image src={autor?.foto || '/logo.avif'} alt={a.autor} fill className="object-cover" />
                          </div>
                          <span className="font-medium text-gray-600">{a.autor}</span>
                          <span>·</span>
                          <time dateTime={a.dataISO}>{a.data}</time>
                          <span>·</span>
                          <span>{a.citire}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50">
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Despre autorii acestui blog</h2>
                <p className="text-xs text-gray-500 mb-5 leading-relaxed">Conținutul publicat pe blogul Neofort IMO este scris exclusiv de profesioniști cu experiență reală în piața imobiliară din București. Fiecare articol reflectă tranzacții reale, date verificate și perspectiva consultanților care lucrează zilnic în piață.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Object.values(AUTORI).map(a => (
                    <div key={a.nume} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image src={a.foto} alt={a.nume} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{a.nume}</p>
                        <p className="text-[10px] mb-1" style={{ color: '#2d7a3a' }}>{a.titlu}</p>
                        <p className="text-[10px] text-gray-500 leading-relaxed">{a.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-5"><div className="sticky space-y-5" style={{ top: '96px' }}>
              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 flex-shrink-0"><Image src="/logo.avif" alt="Neofort IMO" fill className="object-contain" /></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Neofort IMO</p>
                    <p className="text-[10px] text-gray-400">Blog oficial · Din 2009</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">Analize și sfaturi imobiliare din interior — scrise de consultanții care au finalizat peste 85 de proiecte rezidențiale în București.</p>
                <Link href="/despre-noi" className="text-xs font-medium text-[#2d7a3a] hover:underline">Află mai mult despre noi →</Link>
              </div>

              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Categorii</h3>
                <div className="space-y-2">
                  {CATEGORII.map(c => (
                    <div key={c.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                        <span className="text-xs text-gray-700">{c.label}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Articole recente</h3>
                <div className="space-y-3">
                  {ARTICOLE.map(a => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="flex gap-2 group">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {a.image && <Image src={a.image} alt={a.titlu} fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-700 font-medium leading-tight group-hover:text-[#2d7a3a] transition-colors line-clamp-2">{a.titlu}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{a.data}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-5 text-white" style={{ background: '#081c12' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#e8b44e' }}>Cauți apartament nou?</p>
                <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>12 ansambluri active în București — direct de la sursă, fără comision.</p>
                <Link href="/ansambluri-rezidentiale" className="block text-center text-xs py-2 rounded-lg font-medium" style={{ background: '#2d7a3a', color: 'white' }}>
                  Vezi ansambluri →
                </Link>
              </div>

              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@type': 'Blog',
                name: 'Blog Imobiliar Neofort IMO', url: `${BASE}/blog`,
                publisher: { '@type': 'Organization', name: 'Neofort IMO', url: BASE },
                blogPost: ARTICOLE.map(a => ({
                  '@type': 'BlogPosting', headline: a.titlu,
                  url: `${BASE}/blog/${a.slug}`, datePublished: a.dataISO,
                  author: { '@type': 'Person', name: a.autor },
                  image: `${BASE}${a.image}`,
                })),
              })}} />
            </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
