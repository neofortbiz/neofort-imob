import HomePageClient from './HomePage'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  alternates: { canonical: BASE },
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
