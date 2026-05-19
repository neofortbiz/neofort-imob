import { NR_ACTIVE, NR_PORTOFOLIU } from '@/data/siteConfig'

const BASE = 'https://www.neofort.ro'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Acasă', item: BASE },
    { '@type': 'ListItem', position: 2, name: 'Harta Ansambluri', item: `${BASE}/harta-ansambluri` },
  ],
}

export const metadata = {
  title: 'Harta Ansambluri Rezidențiale București — Neofort IMO',
  description: `Hartă interactivă cu toate ansamblurile rezidențiale Neofort IMO din București. ${NR_ACTIVE} proiecte active + ${NR_PORTOFOLIU} din portofoliu pe OpenStreetMap.`,
  alternates: { canonical: `${BASE}/harta-ansambluri` },
  openGraph: {
    title: 'Harta Ansambluri Neofort IMO — București',
    description: `${NR_ACTIVE + NR_PORTOFOLIU} de ansambluri rezidențiale pe hartă interactivă OpenStreetMap.`,
    url: `${BASE}/harta-ansambluri`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${BASE}/og-harta.jpg`, width: 1200, height: 630, alt: 'Harta Ansambluri Neofort IMO' }],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE}/og-harta.jpg`] },
}

export default function HartaLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
