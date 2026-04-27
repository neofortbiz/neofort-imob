import { notFound } from 'next/navigation'

const BASE = 'https://neofort-imob.vercel.app'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ARTICOLE = {
  'e-proprietatea-2026-noul-sistem-de-impozitare': {
    titlu: 'E-Proprietatea 2026 — noul sistem de impozitare explicat',
    tag: 'Legislație',
    data: '22 Aprilie 2026',
    descriere: 'Tot ce trebuie să știi despre noul sistem de impozitare a proprietăților imobiliare din 2026.',
    continut: `Sistemul E-Proprietatea reprezintă cea mai importantă reformă în impozitarea imobiliară din România din ultimii 20 de ani. Implementat progresiv începând cu 2025, acest sistem digitalizează complet relația dintre contribuabili și autoritățile fiscale în privința proprietăților imobiliare.

Ce este E-Proprietatea?

E-Proprietatea este o platformă digitală națională care centralizează toate datele despre proprietățile imobiliare din România — terenuri, clădiri, apartamente și spații comerciale. Practic, fiecare proprietate primește un identificator unic, iar impozitele sunt calculate automat pe baza valorii de piață actualizate, nu pe baza valorii declarate de proprietar.

Principalele schimbări față de sistemul anterior

Impozitarea pe valoarea de piață. Sistemul vechi taxa proprietățile la valori declarate de proprietari, adesea sub-estimate față de piață. Noul sistem folosește grile de evaluare actualizate periodic, mai aproape de prețurile reale de tranzacționare. Aceasta înseamnă că apartamentele din zone premium ale Bucureștiului — Floreasca, Dorobanți, Primăverii — vor fi impozitate la valori mai mari față de sistemul anterior.

Declararea automată. Una dintre cele mai semnificative schimbări: nu mai este necesară declararea manuală a proprietăților la primărie în fiecare an fiscal. Sistemul preia automat datele din cadastru și cartea funciară, iar impozitul este calculat și comunicat electronic.

Impact pentru cumpărătorii de apartamente noi

Pentru cei care achiziționează apartamente noi în 2026, impozitul se calculează pe valoarea din contractul de vânzare-cumpărare în primul an, urmând să fie ajustat pe baza grilelor E-Proprietatea în anii următori. Apartamentele din ansambluri rezidențiale noi au avantajul că valoarea din contract este clară și ușor de verificat în sistem.

Scutiri și reduceri disponibile

Proprietarii de locuință principală beneficiază de o reducere de 10% față de valoarea calculată de sistem. Persoanele cu handicap și veteranii de război sunt scutiți total de impozit pentru locuința principală. Clădirile cu clasa energetică A sau A+ beneficiază de o reducere suplimentară de 5%.

Sfatul Neofort IMO

Apartamentele noi din ansamblurile Neofort IMO sunt construite la standarde energetice superioare, cu clase energetice de la B în sus. Achiziția unui apartament nou în 2026 înseamnă deduceri fiscale imediate și costuri de întreținere predictibile pe termen lung, față de apartamentele vechi care suportă creșteri de impozit semnificative odată cu reevaluarea E-Proprietatea.`,
  },
  'preturi-apartamente-bucuresti-2026': {
    titlu: 'Scad sau nu prețurile la apartamente în București în 2026',
    tag: 'Piață',
    data: '15 Martie 2026',
    descriere: 'Analiza pieței imobiliare din București — evoluția prețurilor și tendințele pentru 2026.',
    continut: `Piața imobiliară din București în 2026 — analiză și perspective

Întrebarea pe care și-o pun toți cumpărătorii: prețurile la apartamente vor scădea sau vor continua să crească? Analizăm datele reale din piață și perspectivele pentru 2026.

Evoluția prețurilor în 2025-2026

Datele din piața bucureșteană arată o creștere medie de 8-12% a prețurilor la apartamentele noi față de 2024. Zonele cu acces la metrou și-au menținut cel mai bine valorile — Titan-Pallady, zona M3, Militari și Drumul Taberei au înregistrat creșteri de peste 10%.

Apartamentele vechi (construite înainte de 2000) au evoluat diferit: în zonele ultracentrale au crescut moderat, dar în cartierele periferice fără metrou au stagnat sau chiar au scăzut ușor.

Factori care susțin prețurile ridicate

Cererea depășește oferta. Populația Bucureștiului continuă să crească — estimările INS arată că zona metropolitană va atinge 2,5 milioane de locuitori până în 2030. Numărul de apartamente noi livrate anual rămâne sub necesarul pieței.

Costurile de construcție au crescut semnificativ. Materialele de construcție, manopera specializată și costul finanțării proiectelor au crescut cu 25-35% față de 2021. Dezvoltatorii nu pot vinde sub costul de producție.

Rata dobânzilor în scădere. BNR a redus treptat rata de politică monetară în 2025-2026, ceea ce a îmbunătățit accesibilitatea creditelor ipotecare și a susținut cererea.

Zone cu cel mai bun potențial în 2026

Titan-Pallady rămâne cea mai activă zonă rezidențială din București, cu 6 ansambluri Neofort IMO active. Accesul la metrou M2 (Nicolae Teclu și Anghel Saligny), centru comerciale importante și infrastructura educațională completă justifică prețurile.

Militari-Drumul Taberei beneficiază de linia M5 inaugurată recent, care a redus semnificativ timpii de deplasare spre centru și a crescut atractivitatea zonei.

Zona Obor-Moșilor se repoziționează ca zonă semipremium, cu proiecte boutique de calitate ridicată la prețuri mai accesibile față de centru.

Concluzia Neofort IMO

Nu așteptați o scădere semnificativă a prețurilor în 2026. Fundamentele pieței rămân solide. Dacă doriți să achiziționați un apartament nou în București, momentul optim este acum — înainte de noi creșteri ale costurilor de construcție și ale prețurilor de vânzare.`,
  },
  'ghid-cumparare-apartament-nou': {
    titlu: 'Ghid complet: cum cumperi un apartament nou în București',
    tag: 'Ghid',
    data: '10 Martie 2026',
    descriere: 'Pași, sfaturi și capcane de evitat atunci când cumperi un apartament nou de la dezvoltator.',
    continut: `Ghid complet pentru cumpărarea unui apartament nou în București — 2026

Achiziția unui apartament nou de la dezvoltator este diferită față de cumpărarea unuia de pe piața secundară. Iată tot ce trebuie să știi pentru a lua o decizie corectă și pentru a evita capcanele frecvente.

Pasul 1: Stabilirea bugetului real

Înainte de a vizita orice ansamblu, calculează bugetul total disponibil — nu doar prețul apartamentului. Include TVA (19% pentru apartamente noi cu suprafață utilă peste 120mp, 9% pentru cele sub 120mp), taxa de notariat (0,5-1% din valoarea contractului), comisionul bancar dacă accesezi credit, taxa de intabulare și fondul de rulment al asociației.

Un apartament de 100.000€ + TVA înseamnă de fapt aproximativ 109.000€ + 1.500€ costuri notariale + 200€ intabulare = ~111.000€ total.

Pasul 2: Verificarea dezvoltatorului

Orice dezvoltator serios trebuie să prezinte: autorizația de construire în termen de valabilitate, extrasul de carte funciară al terenului (să nu existe ipoteci sau litigii), certificatul fiscal al societății și istoricul proiectelor finalizate. La Neofort IMO, toată documentația este disponibilă la solicitare.

Pasul 3: Înțelegerea contractului de rezervare

Suma de rezervare (de regulă 2.000-5.000€) blochează prețul apartamentului și scoate unitatea din vânzare. Verificați că suma este returnabilă integral dacă nu se ajunge la semnarea antecontractului din vina dezvoltatorului.

Pasul 4: Antecontractul — cele mai importante clauze

Termenul de predare cu penalități clare pentru întârziere. Descrierea exactă a finisajelor incluse. Condițiile de ajustare a prețului. Modalitățile de recepție și lista de remedieri. Garanțiile legale post-predare (10 ani structură, 3 ani instalații, 1 an finisaje).

Pasul 5: Finanțarea — credit sau economii proprii

Dacă optați pentru credit bancar, preaprobarea trebuie obținută înainte de semnarea antecontractului. Consultantul bancar Neofort IMO vă ajută gratuit să identificați cea mai bună ofertă de finanțare disponibilă pe piață.

Pasul 6: Recepția apartamentului

Nu semnați procesul verbal de recepție fără a verifica: funcționarea tuturor instalațiilor, absența fisurilor în pereți și tavane, montarea corectă a tâmplăriei, funcționarea liftului și a ușilor comune.

Neofort IMO — vânzare directă, fără comision de agenție

Toate apartamentele Neofort IMO sunt comercializate direct de la sursă, fără comision de agenție. Prețul publicat este prețul final — nu există taxe ascunse sau costuri suplimentare față de cele menționate în antecontract.`,
  },
}

export function generateStaticParams() {
  return Object.keys(ARTICOLE).map(slug => ({ slug }))
}

export function generateMetadata({ params }) {
  const a = ARTICOLE[params.slug]
  if (!a) return {}
  const url = `${BASE}/blog/${params.slug}`
  return {
    title: a.titlu + ' | Blog Neofort IMO',
    description: a.descriere || a.continut.substring(0, 155),
    alternates: { canonical: url },
    openGraph: { title: a.titlu, description: a.descriere, url, type: 'article', locale: 'ro_RO' },
  }
}

export default function ArticolPage({ params }) {
  const a = ARTICOLE[params.slug]
  if (!a) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.titlu,
    description: a.descriere,
    datePublished: a.data,
    author: { '@type': 'Organization', name: 'Neofort IMO', url: BASE },
    publisher: { '@type': 'Organization', name: 'Neofort IMO', url: BASE },
    url: `${BASE}/blog/${params.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Header activePath="/blog" />
      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[#2d7a3a]">Blog</Link>
            <span>›</span>
            <span className="text-gray-900">{a.titlu.substring(0, 40)}...</span>
          </nav>
          <div className="text-[10px] font-medium uppercase tracking-wider mb-3" style={{ color: '#2d7a3a' }}>{a.tag}</div>
          <h1 className="text-2xl font-medium text-gray-900 leading-tight mb-3">{a.titlu}</h1>
          <div className="text-xs text-gray-400 mb-8">{a.data}</div>
          <div className="h-56 bg-gray-100 rounded-xl mb-8 flex items-center justify-center">
            <span className="text-xs text-gray-400">Foto articol</span>
          </div>
          <div className="prose prose-sm text-gray-700 leading-relaxed">
            <p>{a.continut}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
