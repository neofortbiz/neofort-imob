import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import AnsambluriClient from './AnsambluriClient'
import { ANSAMBLURI_ACTIVE, formatPret } from '@/data/ansambluri'
import { NR_ACTIVE } from '@/data/siteConfig'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Ansambluri Rezidențiale București — Apartamente Noi',
  description: `Toate ansamblurile Neofort IMO disponibile în București. ${NR_ACTIVE} proiecte active în Sectoarele 2, 3 și 6. Apartamente 1-4 camere direct de la sursă, fără comision.`,
  alternates: { canonical: `${BASE}/ansambluri-rezidentiale` },
  openGraph: {
    title: 'Ansambluri Rezidențiale București | Neofort IMO',
    description: `${NR_ACTIVE} ansambluri active în București. Apartamente noi direct de la sursă, fără comision.`,
    url: `${BASE}/ansambluri-rezidentiale`,
    images: [{ url: 'https://www.neofort.ro/og-ansambluri.jpg', width: 1200, height: 630, alt: 'Ansambluri Rezidențiale Neofort IMO București' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.neofort.ro/og-ansambluri.jpg'],
  },
}

function getItemListSchema(BASE) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Ansambluri Rezidențiale Active Neofort IMO',
    description: 'Lista completă a ansamblurilor rezidențiale disponibile la vânzare în București',
    url: `${BASE}/ansambluri-rezidentiale`,
    numberOfItems: ANSAMBLURI_ACTIVE.length,
    itemListElement: ANSAMBLURI_ACTIVE.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: a.nume,
      url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    })),
  }
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Acasă', item: 'https://www.neofort.ro' },
    { '@type': 'ListItem', position: 2, name: 'Ansambluri Rezidențiale', item: 'https://www.neofort.ro/ansambluri-rezidentiale' },
  ],
}

export default function AnsambluriPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getItemListSchema('https://www.neofort.ro')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header activePath="/ansambluri-rezidentiale" />
      <main className="min-h-screen bg-gray-50">
        {/* HEADER PAGINA */}
        <div className="bg-white border-b border-gray-100 px-6 py-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-gray-600">Acasă</Link>
              <span>›</span>
              <span className="text-gray-700">Ansambluri rezidențiale</span>
            </nav>
            <h1 className="text-xl font-medium text-gray-900">Ansambluri Rezidențiale București</h1>
            <p className="text-sm text-gray-500 mt-1">Apartamente noi direct de la sursă, fără comision</p>
          </div>
        </div>
        <AnsambluriClient />
      </main>
      <Footer />
    </>
  )
}
