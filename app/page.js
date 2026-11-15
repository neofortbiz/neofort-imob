import HomePageClient from './HomePage'
import { ARTICOLE } from '@/data/blog'
import { NR_ACTIVE, NR_LIVRATE, NR_FAMILII, ANI_EXPERIENTA, GOOGLE_RATING, GOOGLE_REVIEWS } from '@/data/siteConfig'

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

// AggregateRating — DOAR pe homepage, unde ratingul e
// afisat VIZIBIL in pagina. Era emis global din layout.js, pe fiecare pagina,
// inclusiv unde recenziile nu apar nicaieri — neconform cu ghidul Google
// privind markup-ul "self-serving" fara continut vizibil corespunzator.
const ratingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE}/#organization`,
  name: 'Neofort IMO',
  url: BASE,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: GOOGLE_RATING,
    reviewCount: GOOGLE_REVIEWS,
    bestRating: '5',
    worstRating: '1',
  },
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
      name: 'Câte ansambluri rezidențiale a comercializat Neofort IMO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Neofort IMO a comercializat apartamente în peste ${NR_LIVRATE} de ansambluri rezidențiale livrate în București din 2009 până în prezent, totalizând peste ${NR_FAMILII} familii ajutate să-și cumpere un apartament nou.`,
      },
    },
    {
      '@type': 'Question',
      name: 'În ce sectoare din București are Neofort IMO ansambluri active?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neofort IMO are ansambluri rezidențiale active în Sectorul 2 (Moșilor-Eminescu, Eminescu-Viitorului, Colentina), Sectorul 3 (Titan-Pallady, Piața Muncii, IOR) și Sectorul 6 (Militari, Gorjului, Iuliu Maniu).',
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

// Data actualizarii articolelor, trimisa ca prop catre HomePage (componenta de client).
// ARTICOLE nu se importa direct acolo: ar intra tot data/blog.js in bundle-ul de client.
const BLOG_MODIFICAT = Object.fromEntries(
  Object.entries(ARTICOLE).filter(([, a]) => a.dataModificata).map(([slug, a]) => [slug, a.dataModificata])
)

// Ordinea „Recent accesat" a proiectelor se calculeaza AICI, pe server (v456), cu acelasi mecanism ca
// articolul „Recent accesat" de pe /blog: lista globala din Redis, reimprospatata cel mult o data pe minut.
// DE CE: pana la v455 o cerea browserul dupa incarcare si rearanja cardurile sub ochii vizitatorului —
// salt de continut (CLS) masurat 0,063 doar din asta; Lighthouse a dat CLS 0,172 si a picat verificarea.
// Esec (Redis cazut, retea) = ordinea standard, ca inainte.
async function getRecentAnsambluri() {
  try {
    const res = await fetch(`${BASE}/api/views?recent=ansambluri&limit=12`, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const d = await res.json()
    return Array.isArray(d.recent) ? d.recent : []
  } catch {
    return []
  }
}

export default async function Page() {
  const recentSlugs = await getRecentAnsambluri()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePageClient blogModificat={BLOG_MODIFICAT} recentSlugs={recentSlugs} />
    </>
  )
}

