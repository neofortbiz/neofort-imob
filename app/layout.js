import './globals.css'
import ClientProviders from '@/components/ClientProviders'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { ANI_EXPERIENTA, NR_ACTIVE, NR_LIVRATE, NR_FAMILII, GOOGLE_RATING, GOOGLE_REVIEWS } from '@/data/siteConfig'
import Script from 'next/script'

const barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const BASE = 'https://www.neofort.ro'

export const metadata = {
  metadataBase: new URL(BASE),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/logo.avif' },
    ],
    apple: '/apple-touch-icon.png',
  },
  title: {
    default: 'Neofort IMO — Apartamente Noi București | Direct de la Sursă',
    template: '%s | Neofort IMO',
  },
  description: `Apartamente noi în București direct de la sursă, fără comision. ${NR_ACTIVE} ansambluri active în Sectoarele 2, 3 și 6. ${ANI_EXPERIENTA} ani experiență, ${NR_LIVRATE}+ proiecte livrate. Sună: 0758 090 904.`,
  keywords: [
    'apartamente noi bucuresti', 'ansambluri rezidentiale bucuresti',
    'bloc nou bucuresti', 'apartamente titan pallady',
    'apartamente militari bucuresti', 'neofort imobiliare',
    'apartamente 2 camere titan pallady', 'bloc nou militari pret',
    'apartamente noi sector 3', 'apartamente noi sector 2',
    'apartamente noi fara comision bucuresti', 'direct de la dezvoltator bucuresti',
  ],
  authors: [{ name: 'Neofort IMO', url: BASE }],
  creator: 'Neofort IMO',
  publisher: 'Neofort IMO',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    // localeAlternate eliminat — site-ul nu are pagini multilingv activ
    siteName: 'Neofort IMO',
    title: 'Neofort IMO — Apartamente Noi București | Direct de la Sursă',
    description: `Apartamente noi în București direct de la sursă, fără comision. ${NR_ACTIVE} ansambluri active în Sectoarele 2, 3 și 6.`,
    url: BASE,
    images: [{ url: `${BASE}/og-image.jpg`, width: 1200, height: 630, alt: 'Neofort IMO — Apartamente Noi București' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neofort IMO — Apartamente Noi București',
    description: `Apartamente noi direct de la sursă, fără comision. ${NR_ACTIVE} ansambluri active.`,
    images: [`${BASE}/og-image.jpg`],
  },
  verification: {
    google: 'Q3PYRz1EUxp_7LF_eIg9Yh1cJa8_y9gnPgGfk4fDPes',
  },
}

// Schema Organization — identitate completa companie
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: 'Neofort IMO',
  alternateName: ['Neofort Imobiliare', 'Neofort IMO SRL', 'Neofort BIZ Imobiliare'],
  url: BASE,
  logo: {
    '@type': 'ImageObject',
    '@id': `${BASE}/#logo`,
    url: `${BASE}/logo.avif`,
    width: 1024,
    height: 701,
    caption: 'Neofort IMO — Apartamente Noi București',
  },
  image: `${BASE}/og-image.jpg`,
  description: `Companie specializată în comercializarea ansamblurilor rezidențiale noi în București. Direct de la sursă, fără comision de agenție. ${ANI_EXPERIENTA} ani experiență, ${NR_LIVRATE}+ proiecte livrate din 2009. Peste ${NR_FAMILII} familii ajutate să-și cumpere prima casă.`,
  foundingDate: '2009',
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
  sameAs: [
    'https://www.facebook.com/profile.php?id=100063782524105',
    'https://www.instagram.com/neofortimobiliare/',
    'https://www.youtube.com/user/neofortbizimobiliare',
    'https://x.com/NeofortIMO',
    'https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7',
  ],
  // Date fiscale si registru comert
  vatID: 'RO53874087',
  taxID: '53874087',
  legalName: 'Neofort IMO SRL',
  identifier: [
    { '@type': 'PropertyValue', name: 'CUI', value: 'RO53874087' },
    { '@type': 'PropertyValue', name: 'Nr. Registrul Comerțului', value: 'J40/8972/2026' },
    { '@type': 'PropertyValue', name: 'Google Place ID', value: 'ChIJRfDdJdX_sUARTlBqmy1tpXw' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Theodor Aman Pictor nr. 11',
    addressLocality: 'București',
    addressRegion: 'Sector 1',
    postalCode: '010776',
    addressCountry: 'RO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.4429978,
    longitude: 26.0886770,
  },
  hasMap: 'https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7',
  areaServed: [
    { '@type': 'City', name: 'București' },
    { '@type': 'AdministrativeArea', name: 'Sector 2' },
    { '@type': 'AdministrativeArea', name: 'Sector 3' },
    { '@type': 'AdministrativeArea', name: 'Sector 6' },
  ],
  telephone: '+40758090904',
  email: 'info@neofort-biz.ro',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+40758090904',
      contactType: 'sales',
      areaServed: 'RO',
      availableLanguage: 'Romanian',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '18:00',
      },
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: GOOGLE_RATING,
    reviewCount: GOOGLE_REVIEWS,
    bestRating: '5',
    worstRating: '1',
  },
  knowsAbout: [
    'Apartamente noi București',
    'Ansambluri rezidențiale',
    'Imobiliare București',
    'Investiții imobiliare',
    'Credite imobiliare',
    'Prima casă',
  ],
}

// Schema LocalBusiness — pentru Knowledge Panel Google
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'RealEstateAgent'],
  '@id': `${BASE}/#localbusiness`,
  name: 'Neofort IMO',
  legalName: 'Neofort IMO SRL',
  url: BASE,
  telephone: '+40758090904',
  email: 'info@neofort-biz.ro',
  vatID: 'RO53874087',
  taxID: '53874087',
  identifier: [
    { '@type': 'PropertyValue', name: 'CUI', value: 'RO53874087' },
    { '@type': 'PropertyValue', name: 'Nr. Registrul Comerțului', value: 'J40/8972/2026' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Theodor Aman Pictor nr. 11',
    addressLocality: 'București',
    addressRegion: 'Sector 1',
    postalCode: '010776',
    addressCountry: 'RO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.4429978,
    longitude: 26.0886770,
  },
  hasMap: 'https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '10:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday'], opens: '00:00', closes: '00:00' },
  ],
  priceRange: '€€',
  currenciesAccepted: 'EUR, RON',
  paymentAccepted: 'Cash, Bank Transfer, Mortgage',
  image: `${BASE}/og-image.jpg`,
  logo: `${BASE}/logo.avif`,
  description: `Comercializare apartamente noi în ansambluri rezidențiale din București. Direct de la sursă, fără comision. ${ANI_EXPERIENTA} ani experiență, ${NR_LIVRATE}+ proiecte livrate.`,
  foundingDate: '2009',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: GOOGLE_RATING,
    reviewCount: GOOGLE_REVIEWS,
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=100063782524105',
    'https://www.instagram.com/neofortimobiliare/',
    'https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7',
  ],
  areaServed: { '@type': 'City', name: 'București' },
  serviceType: 'Real Estate Sales',
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Comercializare apartamente noi fără comision',
      description: 'Vânzare apartamente noi direct de la sursă, fără comision de agenție pentru cumpărător.',
    },
  },
}

// Schema WebSite — pentru sitelinks search box
const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE}/#website`,
  url: BASE,
  name: 'Neofort IMO',
  description: 'Apartamente noi în București direct de la sursă, fără comision',
  inLanguage: 'ro',
  publisher: { '@id': `${BASE}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE}/ansambluri-rezidentiale?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

// Schema FAQ global — intrebari frecvente despre Neofort IMO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Neofort IMO percepe comision de agenție?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nu. Neofort IMO comercializează apartamente direct de la sursă, fără comision de agenție pentru cumpărător. Prețul plătit este prețul afișat, fără costuri ascunse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Câte proiecte rezidențiale a livrat Neofort IMO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Neofort IMO a livrat peste ${NR_LIVRATE} de ansambluri rezidențiale în București din 2009 până în prezent, totalizând peste ${NR_FAMILII} familii ajutate să-și cumpere un apartament nou.`,
      },
    },
    {
      '@type': 'Question',
      name: 'În ce sectoare din București are Neofort IMO ansambluri active?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neofort IMO are ansambluri rezidențiale active în Sectorul 2 (Moșilor-Eminescu, Eminescu-Viitorului, Tepeș Vodă), Sectorul 3 (Titan-Pallady, Piața Muncii, IOR) și Sectorul 6 (Militari, Gorjului, Iuliu Maniu).',
      },
    },
    {
      '@type': 'Question',
      name: 'Apartamentele Neofort IMO se predau la cheie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da. Toate apartamentele Neofort IMO se predau cu finisaje complete incluse în preț: parchet, gresie, faianță, obiecte sanitare, tâmplărie, instalații complete. Vă mutați direct fără costuri suplimentare de amenajare.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cum se face rezervarea unui apartament la Neofort IMO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rezervarea se face cu o sumă variabilă per proiect (ex: 1.000€ la Neofort 84), restituibilă integral dacă nu se semnează antecontractul din vina dezvoltatorului. Consultanță juridică și bancară gratuită inclusă.',
      },
    },
    {
      '@type': 'Question',
      name: 'Neofort IMO acceptă credite bancare și Prima Casă?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Da. Neofort IMO acceptă finanțare prin credit bancar standard, Noua Casă (fosta Prima Casă) și plată în avans. Consultanți bancari parteneri disponibili gratuit pentru analiza eligibilității.',
      },
    },
    {
      '@type': 'Question',
      name: 'Care este adresa și programul Neofort IMO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neofort IMO este situată pe Str. Theodor Aman Pictor nr. 11, Sector 1, București 010776. Program: Luni-Vineri 10:00-18:00. Telefon: 0758 090 904.',
      },
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <head>
        {/* Preconnect pentru resurse critice */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
        {/* Consent Mode - setat inainte de GTM */}
        <Script id="consent-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
          });
        `}</Script>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5TWW86TF');`}</Script>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <body>
        {/* Google Tag Manager noscript */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5TWW86TF" height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>
        {children}
        <ClientProviders />
      </body>
    </html>
  )
}
