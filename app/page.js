import HomePageClient from './HomePage'
import { NR_ACTIVE, NR_LIVRATE, NR_FAMILII, ANI_EXPERIENTA } from '@/data/siteConfig'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  alternates: { canonical: BASE },
  openGraph: { title: 'Ansambluri Rezidențiale Noi București — Neofort IMO', description: `Apartamente noi în București direct de la sursă, fără comision. ${NR_ACTIVE} ansambluri active în Sectoarele 2, 3 și 6. ${ANI_EXPERIENTA} ani experiență.`, images: [{ url: 'https://www.neofort.ro/og-acasa.jpg', width: 1200, height: 630, alt: 'Ansambluri Rezidențiale Noi București' }] },
  twitter: { card: 'summary_large_image', images: ['https://www.neofort.ro/og-acasa.jpg'] },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${BASE}/#webpage`,
  url: BASE,
  name: 'Ansambluri Rezidențiale Noi București — Neofort IMO',
  description: `Apartamente noi în ansambluri rezidențiale din București. ${NR_ACTIVE} ansambluri active în Sectoarele 2, 3 și 6. Direct de la sursă, fără comision.`,
  inLanguage: 'ro',
  isPartOf: { '@type': 'WebSite', '@id': `${BASE}/#website`, url: BASE, name: 'Neofort IMO' },
}

// FAQPage pe homepage — intrebari frecvente despre companie
// Mutat din layout.js pentru a evita emiterea pe toate paginile
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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePageClient />
    </>
  )
}

