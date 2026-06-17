import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CalculatorClient from './CalculatorClient'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Calculator Credit Ipotecar 2026 — Rata Lunară',
  description: 'Calculează instant rata lunară pentru un apartament nou în București. Slider DAE 6–12%, curs EUR/RON live BNR, simulare completă credit ipotecar 2026. Obții ofertă personalizată gratuit.',
  alternates: { canonical: `${BASE}/calculator-credit` },
  keywords: ['calculator credit ipotecar', 'rata lunara credit', 'calculator rata 2026', 'credit apartament Bucuresti', 'simulare credit ipotecar Romania', 'DAE credit imobiliar', 'Noua Casa calculator'],
  openGraph: {
    title: 'Calculator Credit Ipotecar 2026 — Neofort IMO',
    description: 'Simulează instant rata lunară. Curs EUR/RON live. Slider DAE piață. Obții ofertă reală în 24h.',
    url: `${BASE}/calculator-credit`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${BASE}/og-default.jpg`, width: 1200, height: 630, alt: 'Calculator credit ipotecar Neofort IMO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator Credit Ipotecar 2026 — Neofort IMO',
    description: 'Rata lunară instant, curs live, ofertă bancară în 24h.',
  },
}

const faqItems = [
  {
    q: 'Cum calculez rata lunară pentru un credit ipotecar în 2026?',
    a: 'Rata lunară se calculează pe baza sumei creditate (prețul imobilului minus avansul), dobânzii anuale efective (DAE) și duratei creditului în ani. Formula folosită este anuitatea standard: rata = (principal × DAE_lunar) / (1 − (1 + DAE_lunar)^(−N)), unde N este numărul total de rate. Calculatorul Neofort IMO aplică această formulă în timp real, cu cursul EUR/RON actualizat zilnic.',
  },
  {
    q: 'Ce DAE pot obține la un credit ipotecar în România în 2026?',
    a: 'DAE (Dobânda Anuală Efectivă) pentru creditele ipotecare în România variază în 2026 între 6,0% (Noua Casă, bănci cu promoții) și 11–12% (credite standard, bănci comerciale). Media pieței se situează în jurul a 7,5–8,5%. DAE include dobânda nominală plus comisioanele și asigurările obligatorii.',
  },
  {
    q: 'Ce avans minim este necesar pentru un credit ipotecar în 2026?',
    a: 'Avansul minim acceptat de băncile comerciale este 15% din valoarea imobilului. Prin programul Noua Casă, avansul minim este 5% pentru imobile sub 140.000€. Un avans mai mare (20–30%) reduce semnificativ rata lunară și costul total al creditului.',
  },
  {
    q: 'Cât durează procesul de aprobare a unui credit ipotecar?',
    a: 'Procesul standard durează 30–45 de zile: preaprobarea în 3–5 zile lucrătoare, evaluarea imobilului 5–10 zile, analiza dosarului complet 15–20 zile, semnarea contractului la notar 1–2 zile. Neofort IMO oferă consultanță bancară gratuită pentru accelerarea procesului.',
  },
  {
    q: 'Pot cumpăra un apartament Neofort IMO cu credit bancar?',
    a: 'Da. Toate apartamentele din portofoliul activ Neofort IMO pot fi achiziționate prin credit bancar. Neofort IMO lucrează cu BCR, BRD, Raiffeisen, ING, UniCredit și CEC Bank. Consultanța bancară este gratuită și incluzem compararea ofertelor din piață pentru cel mai avantajos credit.',
  },
  {
    q: 'Ce înseamnă DAE și cum diferă de dobânda nominală?',
    a: 'Dobânda nominală este rata dobânzii aplicată soldului creditului. DAE (Dobânda Anuală Efectivă) include dobânda nominală plus toate costurile obligatorii: comision de administrare, asigurare imobil PAD, asigurare de viață (unde obligatorie). DAE este indicatorul corect pentru compararea ofertelor bancare.',
  },
]

export default function CalculatorCreditPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE}/calculator-credit`,
    name: 'Calculator Credit Ipotecar 2026 — Neofort IMO',
    description: 'Calculator online pentru simularea ratei lunare la credite ipotecare. Curs EUR/RON live, DAE ajustabil, ofertă personalizată.',
    url: `${BASE}/calculator-credit`,
    isPartOf: { '@id': `${BASE}/#website` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasă', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'Calculator Credit', item: `${BASE}/calculator-credit` },
      ],
    },
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Calculator Credit Ipotecar Neofort IMO',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'Calculator online pentru simularea ratei lunare la credite ipotecare în România. Include curs EUR/RON live, slider DAE, simulare Noua Casă.',
    url: `${BASE}/calculator-credit`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'RON' },
    provider: {
      '@type': 'Organization',
      name: 'Neofort IMO',
      url: BASE,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header activePath="/calculator-credit" />
      <main id="main-content">
        <CalculatorClient faqItems={faqItems} />
      </main>
      <Footer />
    </>
  )
}
