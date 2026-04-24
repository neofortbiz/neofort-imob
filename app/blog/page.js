import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog Imobiliar — Noutăți, Legislație și Piața Imobiliară | Neofort IMO',
  description: 'Articole despre piața imobiliară din București, legislație, evoluția prețurilor și sfaturi pentru cumpărători.',
}

const ARTICOLE = [
  {
    slug: 'e-proprietatea-2026-noul-sistem-de-impozitare',
    titlu: 'E-Proprietatea 2026 — noul sistem de impozitare explicat',
    tag: 'Legislație',
    data: '22 Aprilie 2026',
    rezumat: 'Tot ce trebuie să știi despre noul sistem de impozitare a proprietăților imobiliare din 2026.',
  },
  {
    slug: 'preturi-apartamente-bucuresti-2026',
    titlu: 'Scad sau nu prețurile la apartamente în București în 2026',
    tag: 'Piață',
    data: '15 Martie 2026',
    rezumat: 'Analiza pieței imobiliare din București — evoluția prețurilor și tendințele pentru 2026.',
  },
  {
    slug: 'ghid-cumparare-apartament-nou',
    titlu: 'Ghid complet: cum cumperi un apartament nou în București',
    tag: 'Ghid',
    data: '10 Martie 2026',
    rezumat: 'Pași, sfaturi și capcane de evitat atunci când cumperi un apartament nou de la dezvoltator.',
  },
]

export default function BlogPage() {
  return (
    <>
      <Header activePath="/blog" />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-900">Blog imobiliar</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">Noutăți Imobiliare</h1>
            <p className="text-sm text-gray-500 mt-1">Analize, legislație și tendințe din piața imobiliară</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICOLE.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`}
                className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-all group">
                <div className="h-40 bg-gray-100 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Foto articol</span>
                </div>
                <div className="p-4">
                  <div className="text-[9px] font-medium uppercase tracking-wider mb-2" style={{ color: '#2d7a3a' }}>{a.tag}</div>
                  <h2 className="text-sm font-medium text-gray-900 leading-snug mb-2 group-hover:text-[#2d7a3a] transition-colors">{a.titlu}</h2>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{a.rezumat}</p>
                  <div className="text-[10px] text-gray-400">{a.data}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
