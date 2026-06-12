import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogViews from '@/components/BlogViews'
import { AUTORI, ARTICOLE, ARTICOLE_LIST } from '@/data/blog'
import { NR_ACTIVE } from '@/data/siteConfig'

const BASE = 'https://www.neofort.ro'


// Calculeaza numarul de cuvinte din articol
function getWordCount(a) {
  const text = a.sectiuni.map(s => s.continut + ' ' + s.h2 + ' ' + (s.h3 || '')).join(' ')
  return text.split(/\s+/).filter(w => w.length > 2).length
}

// Parseaza [text](url) in linkuri interne
function parseLinks(text) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (m) return <Link key={i} href={m[2]} className="text-[#2d7a3a] underline underline-offset-2 hover:text-[#1a5c2a] transition-colors">{m[1]}</Link>
    return part
  })
}

export async function generateStaticParams() {
  return Object.keys(ARTICOLE).map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const a = ARTICOLE[params.slug]
  if (!a) return {}
  const autor = AUTORI[a.autor]
  return {
    title: a.titlu + ' | Neofort IMO Blog',
    description: a.descriere,
    alternates: { canonical: `${BASE}/blog/${params.slug}` },
    keywords: a.keywords?.join(', '),
    authors: [{ name: autor?.nume }],
    openGraph: {
      title: a.titlu,
      description: a.descriere,
      url: `${BASE}/blog/${params.slug}`,
      type: 'article',
      locale: 'ro_RO',
      publishedTime: a.dataISO,
      authors: [autor?.nume],
      images: [{ url: `${BASE}${a.image?.replace('.avif', '.jpg') || '/og-blog.jpg'}`, width: 1200, height: 630, alt: a.titlu }],
    },
    twitter: { card: 'summary_large_image', images: [`${BASE}${a.image?.replace('.avif', '.jpg') || '/og-blog.jpg'}`] },
  }
}

export default function ArticolPage({ params }) {
  const a = ARTICOLE[params.slug]
  if (!a) notFound()
  const autor = AUTORI[a.autor]
  const altele = (() => {
    const sameTag = ARTICOLE_LIST.filter(x => x.slug !== params.slug && x.tag === a.tag)
    const rest = ARTICOLE_LIST.filter(x => x.slug !== params.slug && x.tag !== a.tag)
    return [...sameTag, ...rest].slice(0, 3)
  })()
  const shareUrl = `${BASE}/blog/${params.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.titlu,
    description: a.descriere,
    image: `${BASE}${a.image}`,
    datePublished: a.dataISO,
    dateModified: a.dataModificata || a.dataISO,
    url: `${BASE}/blog/${params.slug}`,
    inLanguage: 'ro-RO',
    keywords: a.keywords?.join(', '),
    author: {
      '@type': 'Person',
      name: autor?.nume,
      jobTitle: autor?.titlu,
      image: `${BASE}${autor?.foto}`,
      worksFor: { '@type': 'Organization', name: 'Neofort IMO', url: BASE },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Neofort IMO',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.avif` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${params.slug}` },
    wordCount: getWordCount(a),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.article-lead', '.faq-answer'],
      xpath: [
        "/html/head/title",
        "/html/head/meta[@name='description']/@content",
      ],
    },
  }

  // FAQPage schema — generat din sectiunea faq a articolului
  const faqSectiune = a.sectiuni?.find(s => s.id === 'faq')
  const faqSchema = faqSectiune ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqSectiune.continut
      .split('\n\n')
      .filter(b => b.trim() && b.includes('\n'))
      .map(block => {
        const lines = block.trim().split('\n')
        const q = lines[0]
        const a2 = lines.slice(1).join(' ').trim()
        if (!q || !a2) return null
        return {
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a2 },
        }
      })
      .filter(Boolean),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: a.titlu, item: `${BASE}/blog/${params.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header activePath="/blog" />
      <main className="min-h-screen bg-white">

        {/* HERO IMAGE */}
        {a.image && (
          <div className="relative w-full overflow-hidden" style={{ height: 420, maxHeight: '55vw' }}>
            <img src={a.image} alt={a.titlu} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="eager" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white mb-3" style={{ background: a.tagColor }}>{a.tag}</span>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">{a.titlu}</h1>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-xs text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[#2d7a3a]">Blog</Link>
            <span>›</span>
            <span className="text-gray-700 line-clamp-1">{a.tag}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

            {/* ARTICOL PRINCIPAL */}
            <article>
              {/* META */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {autor?.foto && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img src={autor.foto} alt={autor.nume} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{autor?.nume}</p>
                    <p className="text-xs text-gray-600">{autor?.titlu}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-600 flex items-center gap-3 flex-wrap">
                  <time dateTime={a.dataISO}>{a.data}</time>
                  <span>·</span>
                  <span>{a.citire} citire</span>
                  <span>·</span>
                  <span>{getWordCount(a).toLocaleString()} cuvinte</span>
                  <BlogViews slug={params.slug} />
                </div>
              </div>

              {/* CUPRINS MOBIL */}
              <div className="lg:hidden border border-gray-200 rounded-xl p-4 mb-6 bg-gray-50">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Cuprins</p>
                <ol className="space-y-1.5">
                  {a.cuprins.map((c, i) => (
                    <li key={c.id}>
                      <a href={`#${c.id}`} className="text-xs text-[#2d7a3a] hover:underline">
                        {i + 1}. {c.titlu}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* LEAD */}
              <p className="text-base text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-[#2d7a3a] pl-4">{a.descriere}</p>

              {/* SECTIUNI */}
              {a.sectiuni.map(s => (
                <section key={s.id} id={s.id} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">{s.h2}</h2>
                  {s.h3 && <h3 className="text-base font-semibold text-gray-700 mb-3">{s.h3}</h3>}
                  {s.id === 'faq'
                    ? (
                      <div className="space-y-4 mt-4">
                        {s.continut.split('\n\n').filter(b => b.trim()).map((block, i) => {
                          const lines = block.trim().split('\n')
                          const question = lines[0]
                          const answer = lines.slice(1).join('\n').trim()
                          if (!answer) return (
                            <div key={i} className="text-[15px] text-gray-800 leading-8">{block}</div>
                          )
                          return (
                            <div key={i} className="rounded-xl overflow-hidden border border-gray-100">
                              <div className="flex items-start gap-3 px-5 py-4" style={{ background: '#f8faf9' }}>
                                <span className="text-sm font-bold flex-shrink-0 mt-0.5" style={{ color: '#2d7a3a' }}>?</span>
                                <p className="text-sm font-semibold text-gray-900 leading-snug">{question}</p>
                              </div>
                              <div className="px-5 py-4 bg-white">
                                <p className="text-[15px] text-gray-800 leading-7 whitespace-pre-line text-justify">{answer}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                    : (
                      <div className="text-[15px] text-gray-800 leading-8 whitespace-pre-line text-justify">
                        {s.continut.split('\n').map((line, i) => (
                          <span key={i}>{parseLinks(line)}{i < s.continut.split('\n').length - 1 ? '\n' : ''}</span>
                        ))}
                      </div>
                    )
                  }
                </section>
              ))}

              {/* HASHTAGS */}
              {a.hashtags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                  {a.hashtags.map(h => (
                    <span key={h} className="text-xs text-[#2d7a3a] bg-green-50 px-2.5 py-1 rounded-full border border-green-100">{h}</span>
                  ))}
                </div>
              )}

              {/* LINKURI INTERNE CONTEXTUALE */}
              <div className="mt-8 p-5 rounded-2xl border border-gray-100 bg-gray-50">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-4">Resurse utile de pe Neofort IMO</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link href="/ansambluri-rezidentiale" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#2d7a3a] hover:shadow-sm transition-all group">
                    <span className="text-xl">🏢</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-[#2d7a3a] transition-colors">Ansambluri la vânzare</p>
                      <p className="text-[10px] text-gray-500">{NR_ACTIVE} proiecte active în București</p>
                    </div>
                  </Link>
                  <Link href="/harta-ansambluri" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#2d7a3a] hover:shadow-sm transition-all group">
                    <span className="text-xl">🗺️</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-[#2d7a3a] transition-colors">Hartă ansambluri</p>
                      <p className="text-[10px] text-gray-500">Toate proiectele pe hartă interactivă</p>
                    </div>
                  </Link>
                  <Link href="/blog" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#2d7a3a] hover:shadow-sm transition-all group">
                    <span className="text-xl">📖</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-[#2d7a3a] transition-colors">Blog imobiliar</p>
                      <p className="text-[10px] text-gray-500">Ghiduri, analize și legislație</p>
                    </div>
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#2d7a3a] hover:shadow-sm transition-all group">
                    <span className="text-xl">💬</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 group-hover:text-[#2d7a3a] transition-colors">Consultanță gratuită</p>
                      <p className="text-[10px] text-gray-500">Fără comision de agenție</p>
                    </div>
                  </Link>
                </div>
              </div>

              {/* SHARE */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">Distribuie articolul</p>
                <div className="flex gap-2 flex-wrap">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2"
                    style={{ background: '#1877f2' }}>
                    Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(a.titlu)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-lg text-white font-medium"
                    style={{ background: '#000' }}>
                    X / Twitter
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(a.titlu + ' ' + shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-lg text-white font-medium"
                    style={{ background: '#25d366' }}>
                    WhatsApp
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-lg text-white font-medium"
                    style={{ background: '#0077b5' }}>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* AUTOR BIO */}
              {autor && (
                <div className="mt-10 border border-gray-200 rounded-2xl p-6 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Despre autor</p>
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <img src={autor.foto} alt={autor.nume} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">{autor.nume}</p>
                      <p className="text-xs mb-2" style={{ color: '#2d7a3a' }}>{autor.titlu}</p>
                      <p className="text-xs text-gray-700 leading-relaxed">{autor.bio}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ARTICOLE SIMILARE MOBIL */}
              <div className="lg:hidden mt-8">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Citește și</p>
                <div className="space-y-3">
                  {altele.map(alt => (
                    <Link key={alt.slug} href={`/blog/${alt.slug}`} className="flex gap-3 group">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {alt.image && <img src={alt.image} alt={alt.titlu} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800 group-hover:text-[#2d7a3a] transition-colors line-clamp-2">{alt.titlu}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{alt.data}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            {/* SIDEBAR DESKTOP */}
            <aside className="hidden lg:block">
              <div className="sticky space-y-5" style={{ top: '96px' }}>

              {/* CUPRINS */}
              <div className="border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Cuprins</p>
                <ol className="space-y-2">
                  {a.cuprins.map((c, i) => (
                    <li key={c.id}>
                      <a href={`#${c.id}`}
                        className="flex gap-2 text-xs text-gray-700 hover:text-[#2d7a3a] transition-colors leading-snug group">
                        <span className="font-semibold text-[#2d7a3a] flex-shrink-0">{i + 1}.</span>
                        <span className="group-hover:underline">{c.titlu}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* AUTOR */}
              {autor && (
                <div className="border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Autor</p>
                  <div className="flex gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <img src={autor.foto} alt={autor.nume} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{autor.nume}</p>
                      <p className="text-[10px]" style={{ color: '#2d7a3a' }}>{autor.titlu}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{autor.bio}</p>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-xl p-5 text-white" style={{ background: '#081c12' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#e8b44e' }}>Cauți apartament nou?</p>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>{NR_ACTIVE} ansambluri active în București. Consultanță gratuită, fără comision.</p>
                <Link href="/ansambluri-rezidentiale"
                  className="block text-center text-xs py-2.5 rounded-lg font-semibold mb-2"
                  style={{ background: '#2d7a3a', color: 'white' }}>
                  Vezi ansambluri →
                </Link>
                <a href="tel:0758090904"
                  className="block text-center text-xs py-2 rounded-lg font-medium"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                  0758 090 904
                </a>
              </div>

              {/* ARTICOLE SIMILARE */}
              <div className="border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Citește și</p>
                <div className="space-y-4">
                  {altele.map(alt => (
                    <Link key={alt.slug} href={`/blog/${alt.slug}`} className="flex gap-3 group">
                      <div className="relative w-16 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {alt.image && <img src={alt.image} alt={alt.titlu} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />}
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded text-white" style={{ background: alt.tagColor }}>{alt.tag}</span>
                        <p className="text-[11px] font-medium text-gray-800 group-hover:text-[#2d7a3a] transition-colors leading-snug mt-1 line-clamp-2">{alt.titlu}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{alt.data}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* KEYWORDS */}
              {a.keywords && (
                <div className="border border-gray-100 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Teme abordate</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.keywords.map(k => (
                      <span key={k} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{k}</span>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
