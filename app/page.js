import HomePageClient from './HomePage'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  alternates: { canonical: BASE },
  openGraph: { images: [{ url: 'https://www.neofort.ro/og-acasa.jpg', width: 1200, height: 630, alt: 'Neofort IMO' }] },
  twitter: { card: 'summary_large_image', images: ['https://www.neofort.ro/og-acasa.jpg'] },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE}/#webpage`,
  url: BASE,
  name: 'Neofort IMO — Apartamente Noi București | Direct de la Sursă',
  description: 'Apartamente noi în ansambluri rezidențiale din București. 12 ansambluri active în Sectoarele 2, 3 și 6. Direct de la sursă, fără comision.',
  inLanguage: 'ro',
  isPartOf: { '@type': 'WebSite', '@id': `${BASE}/#website`, url: BASE, name: 'Neofort IMO' },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <HomePageClient />
    </>
  )
}
