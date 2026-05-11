import './globals.css'
import ClientProviders from '@/components/ClientProviders'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  metadataBase: new URL(BASE),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/logo.avif' },
    ],
    apple: '/logo.avif',
  },
  title: {
    default: 'Neofort IMO — Apartamente Noi București | Direct de la Sursă',
    template: '%s | Neofort IMO',
  },
  description: 'Apartamente noi în București direct de la sursă, fără comision. 12 ansambluri active în Sectoarele 2, 3 și 6. 17 ani experiență, 85+ proiecte livrate. Sună: 0758 090 904.',
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
    images: [{ url: `${BASE}/og-image.jpg`, width: 1200, height: 630, alt: 'Neofort IMO — Apartamente Noi București' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neofort IMO — Apartamente Noi București',
    description: 'Apartamente noi direct de la sursă, fără comision. 12 ansambluri active.',
    images: [`${BASE}/og-image.jpg`],
  },
}

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
    width: 1024,
    height: 701,
  },
  description: 'Companie specializată în comercializarea ansamblurilor rezidențiale noi în București. Direct de la sursă, fără comision de agenție. 17 ani experiență, 85+ proiecte livrate din 2009.',
  foundingDate: '2009',
  sameAs: [
    'https://www.facebook.com/profile.php?id=100063782524105',
    'https://www.instagram.com/neofortimobiliare/',
    'https://www.youtube.com/user/neofortbizimobiliare',
    'https://x.com/NeofortIMO',
  ],
  vatID: 'RO53874087',
  legalName: 'Neofort IMO SRL',
  identifier: { '@type': 'PropertyValue', name: 'Nr. Reg. Comertului', value: 'J2026008972000' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Theodor Aman Pictor nr. 11',
    addressLocality: 'București',
    addressRegion: 'Sector 1',
    postalCode: '010776',
    addressCountry: 'RO',
  },
  areaServed: {
    '@type': 'City',
    name: 'București',
  },
  telephone: '+40758090904',
  email: 'info@neofort-biz.ro',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+40758090904',
    contactType: 'sales',
    availableLanguage: 'Romanian',
  },
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
        <ClientProviders />
      </body>
    </html>
  )
}
