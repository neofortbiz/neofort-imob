import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI_ACTIVE, formatPret, STATUS_CONFIG, hasPromo } from '@/data/ansambluri'

const BASE = 'https://www.neofort.ro'

// ── Configuratie tipuri ───────────────────────────────────────────────────────
const TIP_CONFIG = {
  'garsoniere-bucuresti': {
    h1: 'Garsoniere și Studiouri Noi în București',
    descriere: 'Garsoniere și studiouri noi în ansambluri rezidențiale din București, direct de la sursă, fără comision.',
    seoTitle: 'Garsoniere Noi București — Direct de la Sursă',
    seoDesc: 'Garsoniere și studiouri noi în București de la 64.800€+TVA. Ansambluri rezidențiale Neofort IMO în Sectoarele 2, 3, 6. Fără comision.',
    ogDesc: 'Garsoniere și studiouri noi în București. Direct de la Neofort IMO, fără comision de agenție.',
    match: (tipuri) => tipuri.some(t => {
      const tl = String(t).toLowerCase()
      return tl.includes('garsonier') || tl.includes('studio')
    }),
    faq: [
      {
        q: 'Cât costă o garsonieră nouă în București în 2026?',
        a: 'Prețurile garsonierelor noi în București pornesc de la 64.800€+TVA în zone cu metrou (Titan-Pallady) și ajung la 104.640€+TVA în zone semicentrale (Eminescu-Viitorului). Neofort IMO vinde direct fără comision de agenție.',
      },
      {
        q: 'Care este diferența dintre garsonieră și studio?',
        a: 'O garsonieră clasică are camera de zi, dormitor și baie în spații compacte (30-45 mp). Un studio 2 camere are o delimitare clară între living și dormitor, suprafețe de 45-60 mp, practic funcționalitatea unui apartament de 2 camere la prețul unei garsoniere.',
      },
      {
        q: 'Garsonierele noi Neofort IMO se predau la cheie?',
        a: 'Da. Toate unitățile se predau complet finisate: parchet sau gresie, faianță, obiecte sanitare suspendate, tâmplărie PVC cu geam termopan, instalații complete. Te muți direct fără costuri suplimentare.',
      },
      {
        q: 'Ce randament are o garsonieră nouă la închiriere în București?',
        a: 'O garsonieră nouă cu metrou în Titan-Pallady (64.800€) generează chirii de 450-550€/lună, randament brut 8-10%. Este cel mai eficient tip de investiție imobiliară din portofoliul Neofort IMO ca randament pe metru pătrat.',
      },
      {
        q: 'Se poate cumpăra o garsonieră Neofort IMO cu credit bancar?',
        a: 'Da. Neofort IMO lucrează cu BCR, BRD, Raiffeisen, ING, UniCredit și CEC Bank. Consultanță bancară gratuită pentru compararea ofertelor. Garsonierele sub 75.000€ se pot finanța și prin programul Noua Casă.',
      },
    ],
    textEditorial: `Garsonierele și studiourile noi din portofoliul Neofort IMO reprezintă cea mai accesibilă categorie de apartamente noi din București în 2026. Cu suprafețe între 32 și 60 de metri pătrați, sunt gândite pentru cumpărătorii la prima achiziție sau pentru investitori care urmăresc randamentul la închiriere.

Zona Titan-Pallady oferă garsonierele la cel mai bun raport calitate-preț din București: prețuri de la 64.800€+TVA cu metrou la 3-20 de minute, în blocuri noi cu lift, centrală proprie și finisaje complete. Zona Eminescu-Viitorului propune studiouri boutique în Sectorul 2 semicentral, la 400m de Metrou Piața Obor, cu finisaje premium la prețuri de la 104.640€+TVA.

Toate garsonierele și studiourile Neofort IMO se vând direct de la sursă, fără comision de agenție. Rezervare simplă, consultanță bancară și juridică gratuită.`,
  },

  'apartamente-2-camere-bucuresti': {
    h1: 'Apartamente 2 Camere Noi în București',
    descriere: 'Apartamente noi de 2 camere în ansambluri rezidențiale din București, direct de la sursă, fără comision.',
    seoTitle: 'Apartamente 2 Camere Noi București 2026',
    seoDesc: 'Apartamente 2 camere noi în București de la 62.114€+TVA. Neofort IMO: 13 ansambluri active în Sectoarele 2, 3, 6. Direct de la sursă, fără comision.',
    ogDesc: 'Apartamente 2 camere noi în București. Direct de la Neofort IMO, fără comision de agenție.',
    match: (tipuri) => tipuri.some(t => {
      const m = String(t).toLowerCase().match(/^(\d+)\s+camere/)
      return m && Number(m[1]) === 2
    }),
    faq: [
      {
        q: 'Cât costă un apartament de 2 camere nou în București în 2026?',
        a: 'Prețurile apartamentelor noi de 2 camere în București variază între 62.114€+TVA (Titan-Pallady, avans 45%) și 217.000€+TVA (Sector 2 semicentral, finisaje premium). Media pieței pentru 2 camere noi cu metrou în Sectorul 3 este 80.000-120.000€+TVA.',
      },
      {
        q: 'Care sunt cele mai bune zone pentru apartamente de 2 camere noi în București?',
        a: 'Titan-Pallady (Sector 3) oferă cel mai bun raport preț-calitate-conectivitate: metrou M2, IKEA, prețuri sub media orașului. Militari (Sector 6) are acces rapid spre centru prin metrou M3. Moșilor-Eminescu (Sector 2) este alegerea pentru cei care preferă zona semicentrală.',
      },
      {
        q: 'Ce suprafețe au apartamentele de 2 camere noi Neofort IMO?',
        a: 'Apartamentele de 2 camere din portofoliul Neofort IMO variază între 47 și 92 mp utili. Tipologiile compact (47-58 mp) sunt optimizate pentru investiție, iar cele mari (70-92 mp) sunt potrivite pentru familii sau cumpărători care prioritizează spațiul.',
      },
      {
        q: 'Se poate cumpăra un apartament de 2 camere nou cu Noua Casă?',
        a: 'Da, dacă prețul de achiziție nu depășește plafonul programului (în 2026: 140.000€). Majoritatatea apartamentelor de 2 camere din Titan-Pallady și Militari din portofoliul Neofort IMO se încadrează în acest plafon.',
      },
      {
        q: 'Apartamentele de 2 camere Neofort IMO includ locul de parcare?',
        a: 'Parcarea nu este inclusă în prețul apartamentului și se achiziționează separat. Prețurile variază: parcare exterioară 6.000-9.000€, parcare interioară 8.500-13.000€, parcare subterană 25.000-35.000€+TVA, în funcție de proiect.',
      },
    ],
    textEditorial: `Apartamentele de 2 camere reprezintă cea mai căutată tipologie din portofoliul Neofort IMO — potrivite deopotrivă pentru prima locuință, pentru familiile tinere și pentru investitorii care urmăresc randamentul la închiriere.

Portofoliul activ cuprinde apartamente de 2 camere în toate sectoarele active: de la 47 mp la 92 mp, de la 62.114€ în Titan-Pallady până la 217.000€ în zone semicentrale cu finisaje premium. Fiecare proiect are specificații tehnice proprii — tipologiile variază semnificativ.

TVA aplicabil în 2026 este 21% pentru achiziții noi. Consultanță bancară gratuită inclusă pentru toate proiectele Neofort IMO — lucrăm cu toate băncile majore pentru identificarea celui mai avantajos credit ipotecar.`,
  },

  'apartamente-3-camere-bucuresti': {
    h1: 'Apartamente 3 Camere Noi în București',
    descriere: 'Apartamente noi de 3 camere în ansambluri rezidențiale din București, direct de la sursă, fără comision.',
    seoTitle: 'Apartamente 3 Camere Noi București 2026',
    seoDesc: 'Apartamente 3 camere noi în București de la 102.167€+TVA. Neofort IMO: ansambluri active Sectoarele 2, 3, 6. Finisaje complete, direct de la sursă.',
    ogDesc: 'Apartamente 3 camere noi în București. Direct de la Neofort IMO, fără comision de agenție.',
    match: (tipuri) => tipuri.some(t => {
      const m = String(t).toLowerCase().match(/^(\d+)\s+camere/)
      return m && Number(m[1]) === 3
    }),
    faq: [
      {
        q: 'Cât costă un apartament de 3 camere nou în București în 2026?',
        a: 'Prețurile apartamentelor noi de 3 camere din portofoliul Neofort IMO pornesc de la 102.167€+TVA în Titan-Pallady și ajung la 399.000€+TVA pentru tipologiile premium cu grădină sau duplex în zone semicentrale. Media: 120.000-200.000€+TVA.',
      },
      {
        q: 'Ce suprafețe au apartamentele de 3 camere noi Neofort IMO?',
        a: 'Suprafețele variază între 66 și 120 mp utili pentru tipologiile standard, ajungând la 137-192 mp pentru cele cu terasă sau grădină. Apartamentele de 3 camere cu grădină privată de la Neofort 78 (192 mp total) sunt o raritate în Sectorul 2.',
      },
      {
        q: 'Ce zone din București au apartamente de 3 camere noi la prețuri accesibile?',
        a: 'Titan-Pallady (Sector 3) oferă apartamente de 3 camere de la 102.000€+TVA — cel mai competitiv preț per mp util din zonele cu metrou. Militari (Sector 6) are 3 camere de la 115.000€+TVA. Ambele zone au acces rapid la metrou M2 și M3.',
      },
      {
        q: 'Apartamentele de 3 camere Neofort IMO se predau complet finisate?',
        a: 'Da. Standard inclus: parchet în camere, gresie și faianță în băi și bucătărie, obiecte sanitare, tâmplărie PVC tripan, centrală termică proprie, instalații complete. Unele proiecte includ și kit AC preinstalat sau obiecte sanitare suspendate.',
      },
      {
        q: 'Există apartamente de 3 camere cu finanțare prin Noua Casă?',
        a: 'Programul Noua Casă 2026 are plafon de achiziție de 140.000€. Apartamentele de 3 camere din Titan-Pallady care se încadrează: Neofort 44 (de la 112.365€+TVA cu avans 20%). Consultanță gratuită pentru verificarea eligibilității.',
      },
    ],
    textEditorial: `Apartamentele de 3 camere din portofoliul Neofort IMO acoperă cel mai larg spectru de nevoi și bugete: de la tipologiile compacte de 66 mp potrivite pentru familii cu un copil, până la duplexuri de 123 mp sau apartamente cu grădină privată de 192 mp totali pentru cumpărătorii care nu vor să facă compromisuri.

Zona Titan-Pallady rămâne cea mai competitivă pentru 3 camere noi — prețul per mp util pornește de la 1.300€ și rareori depășește 1.600€, semnificativ sub media proiectelor noi comparabile din alte zone ale Bucureștiului. Sectorul 2 (Moșilor-Obor, Eminescu) oferă 3 camere de calitate superioară dar la prețuri premium, justificate de proximitatea față de centru.

Consultanță completă gratuită pentru alegerea tipologiei potrivite bugetului și stilului de viață.`,
  },

  'apartamente-4-camere-bucuresti': {
    h1: 'Apartamente 4 Camere și Penthouse Noi în București',
    descriere: 'Apartamente noi de 4 camere și penthouse în ansambluri rezidențiale din București, direct de la sursă, fără comision.',
    seoTitle: 'Apartamente 4 Camere Noi București 2026',
    seoDesc: 'Apartamente 4 camere și penthouse noi în București de la 150.945€+TVA. Neofort IMO, Sectoarele 2, 3, 6. Terase panoramice, finisaje premium.',
    ogDesc: 'Apartamente 4 camere și penthouse noi în București. Neofort IMO, direct de la sursă.',
    match: (tipuri) => tipuri.some(t => {
      const tl = String(t).toLowerCase()
      const m = tl.match(/^(\d+)\s+camere/)
      return (m && Number(m[1]) >= 4) || tl.includes('penthouse') || tl.includes('duplex')
    }),
    faq: [
      {
        q: 'Cât costă un apartament de 4 camere nou în București în 2026?',
        a: 'Prețurile apartamentelor noi de 4 camere din portofoliul Neofort IMO pornesc de la 150.945€+TVA (Titan-Pallady, 100 mp) și ajung la 499.000€+TVA pentru duplexuri de 123 mp sau 465.000€+TVA pentru 4 camere cu grădină privată (156 mp) în Sectorul 2.',
      },
      {
        q: 'Ce tipologii de 4 camere sunt disponibile la Neofort IMO?',
        a: 'Portofoliul include: 4 camere standard (100-120 mp), 4 camere cu terasă panoramică (175 mp în Neofort 84, etaj 10), penthouse cu duplex (123 mp, etaje 5-6, Neofort 78), 4 camere cu grădină privată (156 mp, parter, Neofort 8).',
      },
      {
        q: 'Penthouse-urile Neofort IMO au lift dedicat?',
        a: 'Lifturile silențioase sunt standard în toate proiectele Neofort IMO cu mai mult de P+2 etaje. Accesul la penthouse se face prin liftul comun al blocului. Nu există lift privat dedicat, dar accesul este securizat.',
      },
      {
        q: 'Se pot finanța apartamentele de 4 camere prin credit bancar?',
        a: 'Da. Neofort IMO lucrează cu toate băncile majore din România. Creditele ipotecare standard acoperă apartamentele de 4 camere fără plafon de preț (spre deosebire de Noua Casă). Consultanță bancară gratuită inclusă.',
      },
      {
        q: 'Ce randament au apartamentele de 4 camere la închiriere în București?',
        a: 'Randamentul brut pentru 4 camere nou în Titan-Pallady (150.000€) este de 5-6% prin chirii de 800-900€/lună. Mai mic decât la garsoniere, dar aprecierea valorii pe termen lung este mai stabilă pentru tipologiile mari în zone cu cerere constantă.',
      },
    ],
    textEditorial: `Apartamentele de 4 camere și penthouse-urile din portofoliul Neofort IMO se adresează familiilor care nu acceptă compromisuri în ceea ce privește spațiul, sau investitorilor care caută active imobiliare cu valoare stabilă pe termen lung.

Neofort 84 propune 4 camere cu terasă panoramică la etajul 10 (175 mp, 181.262€+TVA cu avans 45%) — una dintre cele mai generoase tipologii din zona Titan-Pallady. Neofort 76 (finalizat) are penthouse-uri cu vedere spre întregul Sector 6. Neofort 78 (boutique) oferă un duplex exclusivist (123 mp, 499.000€) cu finisaje HansGrohe și Salamander Blue Edition.

Fiecare achiziție de 4 camere vine cu consultanță juridică și bancară gratuită pe întreaga durată a procesului.`,
  },

  'apartamente-noi-cu-metrou-bucuresti': {
    h1: 'Apartamente Noi cu Metrou în București',
    descriere: 'Apartamente noi lângă metrou în București, în toate sectoarele active. Direct de la Neofort IMO, fără comision.',
    seoTitle: 'Apartamente Noi cu Metrou București 2026',
    seoDesc: 'Apartamente noi lângă metrou în București: M2 Titan-Pallady (20m–11min), M2 Obor (400m), M3 Militari, M3 Gorjului. Neofort IMO, fără comision.',
    ogDesc: 'Apartamente noi lângă metrou în București. Direct de la Neofort IMO, fără comision.',
    match: (tipuri, ansamblu) => ansamblu.puncteInteres?.some(p => p.tip === 'metrou'),
    faq: [
      {
        q: 'Ce ansambluri Neofort IMO sunt cel mai aproape de metrou?',
        a: 'Neofort 83 Titan-Pallady: Metrou Anghel Saligny (M2) la 20 de metri — cel mai aproape de metrou din întregul portofoliu activ. Neofort 78: Metrou Piața Obor la 400m. Neofort 76: Metrou Iuliu Maniu (M3) la 500m. Neofort 42: Metrou Piața Muncii (M3) la 200m.',
      },
      {
        q: 'De ce contează accesul la metrou pentru valoarea unui apartament?',
        a: 'Datele din piață 2023-2026 confirmă: apartamentele noi cu metrou în 3-8 minute au crescut cu 12-18% față de 2023, față de 6-8% pentru cele fără metrou. În contextul traficului din București, metroul transformă fundamental mobilitatea zilnică și susține cererea constantă de chiriaș.',
      },
      {
        q: 'Ce linii de metrou acoperă ansamblurile Neofort IMO?',
        a: 'M2 (est-vest): Neofort 83, 84, 44, 28, 56 (Titan-Pallady), Neofort 78, 11 (Sector 2). M3 (nord-centru-sud): Neofort 76 (Iuliu Maniu), Neofort 49 (Gorjului), Neofort 42 (Piața Muncii). M2+M3: Neofort 50 (Costin Georgian/IOR) — acces la două linii.',
      },
      {
        q: 'Există diferențe de preț între apartamentele cu metrou la 3 minute vs. 10 minute?',
        a: 'Da, semnificative. Metrou la 3 minute (Neofort 83, Neofort 44): prețuri 62.000-150.000€+TVA. Metrou la 5-10 minute (Neofort 84, Neofort 28): prețuri similare sau cu 5-10% mai mici. Metrou la 400-500m pe jos (Neofort 76, 78): prețuri premium datorită zonei, nu proximității față de metrou.',
      },
      {
        q: 'Ce este mai bine pentru investiție — metrou M2 sau M3?',
        a: 'M2 (est-vest) acoperă mai mulți poli de activitate (Unirii, Universitate, Obor, Dristor) și are fluxuri mai mari de pasageri. Zona Titan-Pallady pe M2 a crescut mai rapid în ultimii 3 ani. M3 este mai puțin aglomerat și deservește Militari și Gorjului — cerere bună dar mai concentrată.',
      },
    ],
    textEditorial: `Accesul la metrou este factorul care diferențiază cel mai clar valorile imobiliare în București. Toate cele 13 ansambluri active Neofort IMO se află în apropierea unei stații de metrou — de la 20 de metri (Neofort 83) la maxim 15 minute pe jos.

Linia M2 deservește zona Titan-Pallady cu două stații: Nicolae Teclu și Anghel Saligny, creând un coridor rezidențial excepțional de bine conectat. Linia M3 acoperă Militari, Gorjului și Piața Muncii. Combinația metrou + prețuri sub media pieței explică de ce aceste zone au înregistrat cel mai mare ritm de creștere a valorii apartamentelor noi din București în 2024-2026.

Toate informațiile despre distanțele exacte față de metrou sunt verificate și incluse în fișa fiecărui ansamblu.`,
  },

  'apartamente-noi-finalizate-bucuresti': {
    h1: 'Apartamente Noi Finalizate în București — Disponibile Imediat',
    descriere: 'Apartamente noi finalizate, disponibile imediat în București. Direct de la Neofort IMO, fără comision.',
    seoTitle: 'Apartamente Noi Finalizate București 2026',
    seoDesc: 'Apartamente noi finalizate disponibile imediat în București: Neofort 76, 56, 50, 8. De la 76.974€+TVA. Direct de la sursă, fără comision.',
    ogDesc: 'Apartamente noi finalizate, disponibile imediat în București. Neofort IMO, fără comision.',
    match: (tipuri, ansamblu) => ansamblu.dataPredare === 'Finalizat',
    faq: [
      {
        q: 'Ce înseamnă „apartament nou finalizat" la Neofort IMO?',
        a: 'Un ansamblu finalizat are recepția la terminare obținută, blocul complet construit și apartamentele gata de predare. Poți viziona fizic apartamentul, nu doar randări. Procesul juridic este mai scurt față de apartamentele în construcție.',
      },
      {
        q: 'Pot folosi credit bancar pentru un apartament finalizat?',
        a: 'Da, și procesul de finanțare este mai simplu — banca poate evalua direct apartamentul finalizat. Nu mai există riscul de întârzieri la construcție. Dosarul de credit se procesează mai rapid pentru finalizate față de antecontract pe construcție.',
      },
      {
        q: 'Sunt mai scumpe apartamentele finalizate față de cele în construcție?',
        a: 'De regulă da — apartamentele finalizate nu mai beneficiază de prețurile promoționale de la lansare. Diferența istorică este de 8-15% față de prețul din faza de construcție. Avantajul: certitudine totală, fără risc de construcție, mutare imediată.',
      },
      {
        q: 'Cât durează procesul de achiziție pentru un apartament finalizat?',
        a: 'La un apartament finalizat: rezervare (1-2 zile), antecontract (7-14 zile), credit bancar dacă e cazul (30-45 zile), contract final la notar și predare cheilor (1 zi). Total: 30-60 zile de la prima discuție până la intrarea în apartament.',
      },
      {
        q: 'Ce garanții există la apartamentele finalizate Neofort IMO?',
        a: 'Garanție legală 10 ani pentru vicii structurale, 2 ani pentru finisaje și instalații, conform Legii 10/1995. Garanția se aplică de la data recepției la terminare. Neofort IMO asigură intermedierea relației cu constructorul pe toată perioada de garanție.',
      },
    ],
    textEditorial: `Ansamblurile finalizate din portofoliul activ Neofort IMO — Neofort 76, 56, 50 și 8 — sunt disponibile pentru mutare imediată sau investiție fără risc de construcție.

Avantajul principal față de apartamentele în construcție: ai certitudine totală. Vizionezi apartamentul real, nu randări. Semnezi contractul de vânzare-cumpărare direct, fără faza de antecontract. Procesul de credit bancar este mai simplu și mai rapid.

Dezavantajul: prețurile reflect valoarea de piață la finalizare, nu prețurile promoționale din faza de construcție. Dacă bugetul permite, un finalizat elimină toate incertitudinile din ecuație.`,
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(TIP_CONFIG).map(tip => ({ tip }))
}

export function generateMetadata({ params }) {
  const cfg = TIP_CONFIG[params.tip]
  if (!cfg) return {}
  const url = `${BASE}/apartamente/${params.tip}`
  return {
    title: cfg.seoTitle,
    description: cfg.seoDesc,
    alternates: { canonical: url },
    openGraph: {
      title: cfg.seoTitle,
      description: cfg.ogDesc,
      url,
      type: 'website',
      locale: 'ro_RO',
      images: [{ url: `${BASE}/og-ansambluri.jpg`, width: 1200, height: 630, alt: cfg.h1 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cfg.seoTitle,
      description: cfg.ogDesc,
      images: [`${BASE}/og-ansambluri.jpg`],
    },
  }
}

function getAnsambluri(tip) {
  const cfg = TIP_CONFIG[tip]
  if (!cfg) return []
  return ANSAMBLURI_ACTIVE.filter(a => cfg.match(a.tipuri, a))
}

export default function TipPage({ params }) {
  const cfg = TIP_CONFIG[params.tip]
  if (!cfg) notFound()

  const ansambluri = getAnsambluri(params.tip)
  const pretMin = ansambluri.length > 0
    ? Math.min(...ansambluri.map(a => a.pretDeLa))
    : null

  // Schema ItemList
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cfg.h1,
    description: cfg.descriere,
    url: `${BASE}/apartamente/${params.tip}`,
    numberOfItems: ansambluri.length,
    itemListElement: ansambluri.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'RealEstateListing',
        name: a.nume,
        url: `${BASE}/ansamblu-rezidential/${a.slug}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: a.pretDeLa,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  }

  // Schema BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Apartamente', item: `${BASE}/ansambluri-rezidentiale` },
      { '@type': 'ListItem', position: 3, name: cfg.h1, item: `${BASE}/apartamente/${params.tip}` },
    ],
  }

  // Schema FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cfg.faq.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <main>

        {/* HERO */}
        <section className="py-10 px-6 border-b border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <a href="/" className="hover:text-gray-700">Acasă</a>
              <span>›</span>
              <a href="/ansambluri-rezidentiale" className="hover:text-gray-700">Ansambluri</a>
              <span>›</span>
              <span className="text-gray-800">{cfg.h1}</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">{cfg.h1}</h1>
            <p className="text-sm text-gray-500 max-w-2xl">{cfg.descriere}</p>
            {pretMin && (
              <p className="mt-3 text-sm">
                <span className="text-gray-500">De la </span>
                <span className="font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(pretMin)}€ +TVA</span>
                <span className="text-gray-500"> · {ansambluri.length} {ansambluri.length === 1 ? 'ansamblu' : 'ansambluri'} disponibile</span>
              </p>
            )}
          </div>
        </section>

        {/* CARDURI ANSAMBLURI */}
        <section className="py-10 px-6">
          <div className="max-w-5xl mx-auto">
            {ansambluri.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-sm mb-4">Nu există ansambluri disponibile pentru această categorie momentan.</p>
                <a href="/ansambluri-rezidentiale"
                  className="text-xs px-5 py-2.5 rounded-full font-medium text-white inline-block"
                  style={{ background: '#2d7a3a' }}>
                  Vezi toate ansamblurile →
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ansambluri.map((a, idx) => {
                  const sc = STATUS_CONFIG[a.dataPredare === 'Finalizat' ? 'activ' : 'constructie']
                  return (
                    <a key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                      className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md hover:border-gray-400 transition-all">
                      <div className="relative bg-gray-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        {a.imagini?.cover && (
                          <img
                            src={a.imagini.cover}
                            alt={a.nume}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                            className="group-hover:scale-105 transition-transform duration-500"
                            loading={idx === 0 ? 'eager' : 'lazy'}
                            width={480} height={270}
                          />
                        )}
                        <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
                          style={{ background: sc.dot }}>
                          {a.dataPredare === 'Finalizat' ? 'Finalizat' : 'În construcție'}
                        </span>
                        {hasPromo(a) && (
                          <span className="absolute top-2 left-2 mt-[22px] text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
                            style={{ background: '#c0392b' }}>Promoție</span>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{a.zona} · {a.sector}</p>
                        <h2 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-green-700 transition-colors">{a.nume}</h2>
                        <p className="text-xs text-gray-500 mb-3">{a.tipuri.join(', ')}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">De la</span>
                          <span className="text-sm font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(a.pretDeLa)}€ <span className="text-xs font-normal text-gray-500">+TVA</span></span>
                        </div>
                        {a.dataPredare && a.dataPredare !== 'Finalizat' && (
                          <p className="text-[10px] text-gray-400 mt-1">Predare {a.dataPredare}</p>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            )}

            <div className="mt-8 text-center">
              <a href="/ansambluri-rezidentiale"
                className="text-xs border border-gray-300 px-5 py-2.5 rounded-full hover:border-gray-500 transition-colors text-gray-600 inline-block">
                Vezi toate ansamblurile Neofort IMO →
              </a>
            </div>
          </div>
        </section>

        {/* TEXT EDITORIAL */}
        <section className="py-10 px-6 border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-5">{cfg.h1} — Informații utile</h2>
            {cfg.textEditorial.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed mb-4">{para}</p>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 px-6 border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Întrebări frecvente</h2>
            <div className="space-y-3">
              {cfg.faq.map((item, i) => (
                <details key={i} className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-sm font-medium text-gray-900 select-none list-none">
                    {item.q}
                    <svg className="flex-shrink-0 w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 px-6 border-t border-gray-100" style={{ background: '#081c12' }}>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-lg font-medium text-white mb-3">
              Consultanță <span style={{ color: '#e8b44e' }}>gratuită</span> pentru alegerea apartamentului
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Sună acum sau trimite un mesaj WhatsApp — un consultant Neofort IMO îți răspunde în cel mult 2 ore.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="tel:+40758090904"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white"
                style={{ background: '#5b7fa6' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                0758 090 904
              </a>
              <a href="https://wa.me/40758090904?text=Bună ziua! Sunt interesat de apartamentele Neofort IMO."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white"
                style={{ background: '#25a244' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
