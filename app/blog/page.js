import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogListingViews from '@/components/BlogListingViews'
import { ARTICOLE_LIST, AUTORI, CATEGORII } from '@/data/blog'
import { NR_LIVRATE } from '@/data/siteConfig'

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

// Sortare cronologica descrescatoare — cel mai nou primul (LIFO)
const ARTICOLE_SORTATE = [...ARTICOLE_LIST].sort((a, b) =>
  new Date(b.dataISO) - new Date(a.dataISO)
)

const FEATURED = ARTICOLE_SORTATE[0]
const REST = ARTICOLE_SORTATE.slice(1)

async function getViews() {
  try {
    const slugs = ARTICOLE_SORTATE.map(a => a.slug).join(',')
    const res = await fetch(`${BASE}/api/views?slugs=${slugs}`, { next: { revalidate: 60 } })
    if (!res.ok) return {}
    return await res.json()
  } catch {
    return {}
  }
}

export default async function BlogPage() {
  const views = await getViews()
  return (
    <>
      <Header activePath="/blog" />
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-100" style={{ background: '#f8faf9' }}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-700">Blog Imobiliar</span>
            </nav>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Imobiliar București</h1>
                <p className="text-gray-500 text-sm max-w-xl">Analize, legislație și ghiduri practice despre piața imobiliară din București — scrise de consultanți cu experiență reală din 2009.</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span><span className="text-[#2d7a3a]">✓</span> Conținut verificat de experți</span>
                <span><span className="text-[#2d7a3a]">✓</span> Actualizat 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            <div>
              {/* FEATURED — cel mai nou articol */}
              {FEATURED && (
                <div className="mb-10">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Cel mai recent</p>
                  <Link href={`/blog/${FEATURED.slug}`} className="group block">
                    <div className="relative rounded-2xl overflow-hidden mb-4" style={{ paddingBottom: '43.75%', position: 'relative' }}>
                      {FEATURED.image && <img src={FEATURED.image} alt={FEATURED.titlu} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-700" loading="eager" />}
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 60%)' }} />
                      <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: FEATURED.tagColor }}>{FEATURED.tag}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2d7a3a] transition-colors leading-snug">{FEATURED.titlu}</h2>
                    <p className="text-gray-500 text-sm mb-3 leading-relaxed">{FEATURED.rezumat}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img src={AUTORI[FEATURED.autorSlug]?.foto || '/logo.avif'} alt={FEATURED.autor} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                      </div>
                      <span className="font-medium text-gray-700">{FEATURED.autor}</span>
                      <span>·</span>
                      <time dateTime={FEATURED.dataISO}>{FEATURED.data}</time>
                      <span>·</span>
                      <span>{FEATURED.citire} citire</span>
                      {views[FEATURED.slug] > 0 && <><span>·</span><span className="inline-flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>{views[FEATURED.slug].toLocaleString('ro-RO')}</span></>}
                    </div>
                  </Link>
                </div>
              )}

              <div className="border-t border-gray-100 mb-8" />

              {/* GRILA — restul articolelor in ordine cronologica */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {REST.map(a => {
                  const autor = AUTORI[a.autorSlug]
                  return (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="group border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all">
                      <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden' }}>
                        {a.image ? (
                          <img src={a.image} alt={a.titlu} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        ) : <div style={{ position: 'absolute', inset: 0, background: '#f3f4f6' }} />}
                        <span className="absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: a.tagColor }}>{a.tag}</span>
                        {/* Vizualizari pe card */}
                        <div className="absolute bottom-2 right-2">
                          <BlogListingViews slug={a.slug} />
                        </div>
                      </div>
                      <div className="p-4">
                        <h2 className="text-sm font-semibold text-gray-900 leading-snug mb-2 group-hover:text-[#2d7a3a] transition-colors">{a.titlu}</h2>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{a.rezumat}</p>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          <div className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            <img src={autor?.foto || '/logo.avif'} alt={a.autor} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                          </div>
                          <span className="font-medium text-gray-600">{a.autor}</span>
                          <span>·</span>
                          <time dateTime={a.dataISO}>{a.data}</time>
                          <span>·</span>
                          <span>{a.citire}</span>
                          {views[a.slug] > 0 && <><span>·</span><span className="inline-flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>{views[a.slug].toLocaleString('ro-RO')}</span></>}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* AUTORI */}
              <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50">
                <h2 className="text-sm font-semibold text-gray-900 mb-1">Despre autorii acestui blog</h2>
                <p className="text-xs text-gray-500 mb-5 leading-relaxed">Conținutul publicat pe blogul Neofort IMO este scris exclusiv de profesioniști cu experiență reală în piața imobiliară din București. Fiecare articol reflectă tranzacții reale, date verificate și perspectiva consultanților care lucrează zilnic în piață.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Object.values(AUTORI).map(a => (
                    <div key={a.nume} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        <img src={a.foto} alt={a.nume} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
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
                  <div className="relative w-10 h-10 flex-shrink-0"><img src="/logo.avif" alt="Neofort IMO" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" /></div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Neofort IMO</p>
                    <p className="text-[10px] text-gray-500">Blog oficial · Din 2009</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">Analize și sfaturi imobiliare din interior — scrise de consultanții care au finalizat peste {NR_LIVRATE} de proiecte rezidențiale în București.</p>
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
                      <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{c.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Articole recente</h3>
                <div className="space-y-3">
                  {ARTICOLE_SORTATE.map(a => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="flex gap-2 group">
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {a.image && <img src={a.image} alt={a.titlu} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />}
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-700 font-medium leading-tight group-hover:text-[#2d7a3a] transition-colors line-clamp-2">{a.titlu}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{a.data}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-5 text-white" style={{ background: '#081c12' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#e8b44e' }}>Cauți apartament nou?</p>
                <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>Ansambluri active în București — direct de la sursă, fără comision.</p>
                <Link href="/ansambluri-rezidentiale" className="block text-center text-xs py-2 rounded-lg font-medium" style={{ background: '#2d7a3a', color: 'white' }}>
                  Vezi ansambluri →
                </Link>
              </div>

              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org', '@type': 'Blog',
                name: 'Blog Imobiliar Neofort IMO', url: `${BASE}/blog`,
                publisher: { '@type': 'Organization', name: 'Neofort IMO', url: BASE },
                blogPost: ARTICOLE_SORTATE.map(a => ({
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
