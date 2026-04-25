import './globals.css'
import WAFloat from '@/components/WAFloat'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  metadataBase: new URL(BASE),
  icons: {
    icon: '/logo.avif',
    apple: '/logo.avif',
  },
  title: {
    default: 'Neofort IMO — Apartamente Noi București | Direct de la Sursă',
    template: '%s | Neofort IMO',
  },
  description: 'Apartamente noi în București direct de la sursă, fără comision. 12 ansambluri active în Sectoarele 2, 3 și 6. 17 ani experiență, 85+ proiecte livrate. Sună: 0743 250 029.',
  keywords: ['apartamente noi bucuresti', 'ansambluri rezidentiale bucuresti', 'bloc nou bucuresti', 'apartamente titan pallady', 'apartamente militari bucuresti', 'neofort imobiliare'],
  authors: [{ name: 'Neofort IMO' }],
  creator: 'Neofort IMO',
  publisher: 'Neofort IMO',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: 'Neofort IMO',
    title: 'Neofort IMO — Apartamente Noi București | Direct de la Sursă',
    description: 'Apartamente noi în București direct de la sursă, fără comision. 12 ansambluri active în Sectoarele 2, 3 și 6.',
    url: BASE,
    images: [{ url: `${BASE}/logo.avif`, width: 1080, height: 1080, alt: 'Neofort IMO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neofort IMO — Apartamente Noi București',
    description: 'Apartamente noi direct de la sursă, fără comision. 12 ansambluri active.',
    images: [`${BASE}/logo.avif`],
  },
}

// Schema.org Organization — indexat de Google Knowledge Panel si LLM-uri
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: 'Neofort IMO',
  alternateName: 'Neofort Imobiliare',
  url: BASE,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE}/logo.avif`,
    width: 1080,
    height: 1080,
  },
  description: 'Companie specializată în comercializarea ansamblurilor rezidențiale noi în București. Direct de la sursă, fără comision de agenție. 17 ani experiență, 85+ proiecte livrate din 2009.',
  foundingDate: '2009',
  areaServed: {
    '@type': 'City',
    name: 'București',
    '@id': 'https://www.wikidata.org/wiki/Q19660',
  },
  telephone: '+40743250029',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+40743250029',
    contactType: 'sales',
    availableLanguage: 'Romanian',
    contactOption: 'TollFree',
  },
  sameAs: [],
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <WAFloat />
      </body>
    </html>
  )
}
