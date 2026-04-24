import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ARTICOLE = {
  'e-proprietatea-2026-noul-sistem-de-impozitare': {
    titlu: 'E-Proprietatea 2026 — noul sistem de impozitare explicat',
    tag: 'Legislație',
    data: '22 Aprilie 2026',
    continut: 'Articol în curând...',
  },
  'preturi-apartamente-bucuresti-2026': {
    titlu: 'Scad sau nu prețurile la apartamente în București în 2026',
    tag: 'Piață',
    data: '15 Martie 2026',
    continut: 'Articol în curând...',
  },
  'ghid-cumparare-apartament-nou': {
    titlu: 'Ghid complet: cum cumperi un apartament nou în București',
    tag: 'Ghid',
    data: '10 Martie 2026',
    continut: 'Articol în curând...',
  },
}

export function generateStaticParams() {
  return Object.keys(ARTICOLE).map(slug => ({ slug }))
}

export function generateMetadata({ params }) {
  const a = ARTICOLE[params.slug]
  if (!a) return {}
  return { title: a.titlu, description: a.continut.substring(0, 155) }
}

export default function ArticolPage({ params }) {
  const a = ARTICOLE[params.slug]
  if (!a) notFound()

  return (
    <>
      <Header activePath="/blog" />
      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[#2d7a3a]">Blog</Link>
            <span>›</span>
            <span className="text-gray-900">{a.titlu.substring(0, 40)}...</span>
          </nav>
          <div className="text-[10px] font-medium uppercase tracking-wider mb-3" style={{ color: '#2d7a3a' }}>{a.tag}</div>
          <h1 className="text-2xl font-medium text-gray-900 leading-tight mb-3">{a.titlu}</h1>
          <div className="text-xs text-gray-400 mb-8">{a.data}</div>
          <div className="h-56 bg-gray-100 rounded-xl mb-8 flex items-center justify-center">
            <span className="text-xs text-gray-400">Foto articol</span>
          </div>
          <div className="prose prose-sm text-gray-700 leading-relaxed">
            <p>{a.continut}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
