import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BASE = 'https://www.neofort.ro'

const AUTORI = {
  'igor-calutu': {
    nume: 'Igor Calutu',
    titlu: 'Reprezentant Vanzari Zona Vest — 22 ani experienta',
    bio: 'Cu peste 22 de ani de experienta in piata imobiliara din Bucuresti si 11 ani in Neofort IMO, Igor Calutu a finalizat sute de tranzactii in zona de vest a Capitalei. Ofera clientilor perspective bazate pe date reale din piata.',
    foto: '/brokeri/igor-calutu.avif',
  },
  'adriana-veselu': {
    nume: 'Adriana Veselu',
    titlu: 'Reprezentant Vanzari Zona Centrala — 16 ani experienta',
    bio: 'Adriana Veselu este consultant imobiliar senior cu 14 ani in Neofort IMO si peste 400 de tranzactii finalizate. Specializata in consiliere pentru cumparatorii la primul apartament din zona centrala a Capitalei.',
    foto: '/brokeri/adriana-veselu.avif',
  },
  'ramona-baicu': {
    nume: 'Ramona Baicu',
    titlu: 'Reprezentant Vanzari Zona Sud-Vest — 17 ani experienta',
    bio: 'Ramona Baicu activeaza in piata imobiliara de 17 ani, cu 11 ani in Neofort IMO. Expertiza sa acopera zona sud-vest a Capitalei: Militari, Gorjului, Pacii si proiectele conexe.',
    foto: '/brokeri/ramona-baicu.avif',
  },
  'svetlana-calutu': {
    nume: 'Svetlana Calutu',
    titlu: 'Reprezentant Vanzari Zona Centrala — 21 ani experienta',
    bio: 'Svetlana Calutu are 18 ani in Neofort IMO si 21 de ani in piata imobiliara. Expertiza sa acopera zona centrala si semicentrala, cu focus pe proiectele Mosilor, Eminescu si Viitorului.',
    foto: '/brokeri/svetlana-calutu.avif',
  },
  'adrian-pintilie': {
    nume: 'Adrian Pintilie',
    titlu: 'Reprezentant Vanzari Zona Sud-Est — 15 ani experienta',
    bio: 'Adrian Pintilie gestioneaza zona sud-est a Capitalei cu 14 ani in Neofort IMO. Specialitatea sa: Titan, Pallady si zona IOR, unde cunoaste piata in cel mai mic detaliu.',
    foto: '/brokeri/adrian-pintilie.avif',
  },
  'sasha-calutu': {
    nume: 'Sasha Calutu',
    titlu: 'Reprezentant Vanzari Zona Centrala — 17 ani experienta',
    bio: 'Sasha Calutu are toti cei 17 ani de experienta imobiliara petrecuti in Neofort IMO, ceea ce il face unul dintre cei mai longevivi consultanti ai companiei. Expertiza sa acopera zona centrala si proiectele premium.',
    foto: '/brokeri/sasha-calutu.avif',
  },
  'raluca-nistor': {
    nume: 'Raluca Nistor',
    titlu: 'Reprezentant Vanzari Zona Est — 10 ani experienta',
    bio: 'Raluca Nistor este consultantul de referinta pentru zona est a Capitalei in Neofort IMO. Cu focus pe Titan-Pallady, ofera clientilor analiza detaliata a celui mai dinamic sector rezidential din Bucuresti.',
    foto: '/brokeri/raluca-nistor.avif',
  },
}

const ARTICOLE = {
  'e-proprietatea-2026-noul-sistem-de-impozitare': {
    titlu: 'E-Proprietatea 2026: Tot ce Trebuie să Știi Despre Noul Sistem de Impozitare Imobiliară',
    tag: 'Legislație', tagColor: '#7c3aed',
    data: '22 Aprilie 2026', dataISO: '2026-04-22', citire: '9 min',
    autor: 'igor-calutu',
    image: '/blog/e-proprietatea-2026-sistem-impozitare.avif',
    descriere: 'E-Proprietatea 2026 schimbă radical impozitarea imobiliară în România. Analiză completă: ce se schimbă, cât cresc impozitele, scutiri disponibile și ce înseamnă pentru cumpărătorii de apartamente noi în București.',
    keywords: ['e-proprietatea 2026', 'impozit apartament 2026', 'impozitare imobiliara romania', 'impozit proprietate bucuresti', 'e-proprietatea cum functioneaza'],
    hashtags: ['#EProprietatea', '#ImpozitApartament2026', '#LegislatieImobiliara', '#ApartamenteBucuresti', '#NeofortIMO'],
    cuprins: [
      { id: 'ce-este', titlu: 'Ce este E-Proprietatea?' },
      { id: 'cum-functioneaza', titlu: 'Cum funcționează în practică?' },
      { id: 'impozite-mai-mari', titlu: 'Cu cât cresc impozitele în București?' },
      { id: 'scutiri', titlu: 'Scutiri și reduceri disponibile' },
      { id: 'apartamente-noi', titlu: 'Impact pentru cumpărătorii de apartamente noi' },
      { id: 'calendar', titlu: 'Calendarul implementării' },
      { id: 'concluzii', titlu: 'Concluzie practică' },
    ],
    sectiuni: [
      {
        id: 'ce-este',
        h2: 'Ce este E-Proprietatea și de ce contează pentru tine',
        continut: `Dacă deții un apartament în București sau plănuiești să cumperi unul în 2026, E-Proprietatea îți va afecta direct portofelul. Nu exagerez când spun că este cea mai importantă reformă fiscală imobiliară din România din ultimii 25 de ani — și majoritatea proprietarilor nu știu cu ce se confruntă.

E-Proprietatea este o platformă digitală națională, lansată oficial prin Legea nr. 196/2018 și implementată gradual din 2021, cu accelerare semnificativă în 2025-2026. Sistemul centralizează toate datele despre proprietățile imobiliare din România — terenuri, clădiri, apartamente, spații comerciale — și calculează automat impozitele pe baza valorii de piață actualizate, nu pe baza valorii declarate de proprietar.

**Înainte de E-Proprietatea:** un proprietar cu un apartament de 70 mp în zona Titan putea declara o valoare de 50.000 lei, plătind un impozit anual de 250-300 lei. **După implementare:** același apartament este evaluat automat la valoarea de piață reală — circa 250.000-300.000 lei — iar impozitul creşte proporțional.

Datele ANAF arată că în 2024, circa 2,8 milioane de proprietăți imobiliare din România erau sub-evaluate față de piața reală, unele cu discount de 60-80% față de prețul de tranzacționare. E-Proprietatea urmărește exact eliminarea acestui decalaj.`,
      },
      {
        id: 'cum-functioneaza',
        h2: 'Cum funcționează E-Proprietatea în practică — mecanismul tehnic',
        continut: `Platforma E-Proprietatea funcționează pe baza a trei surse de date integrate:

**1. Cadastrul național (ANCPI)** — fiecare proprietate are un identificator unic (număr cadastral) legat de datele fizice: suprafață, adresă, tip construcție, an finalizare.

**2. Grile notariale actualizate trimestrial** — ANCPI publică tabele cu valorile minime de tranzacționare pe zone, actualizate pe baza tranzacțiilor înregistrate. În 2025, grila pentru zona Titan-Pallady din Sectorul 3 a crescut cu 18% față de 2024, ajungând la 1.850-2.200 EUR/mp pentru apartamente noi.

**3. Date din Agenția Națională de Cadastru** — informații despre clasa energetică, stare de degradare, utilități.

Procesul concret pentru proprietar este simplifiat: ANAF generează automat notificarea de impunere și o trimite prin poșta electronică sau prin portal ANAF. Proprietarul nu mai depune declarații anuale — sistemul calculează automat. Singura obligație activă rămâne declararea modificărilor (renovări majore, extinderi, schimbări de destinație).

Din perspectiva experienței mele practice cu clienți care au primit deja notificări-pilot în 2025: confuzia principală vine din faptul că suma din notificare poate fi de 3-5 ori mai mare decât impozitul plătit anterior. Nu este o eroare — este realitatea pieței în care trăim.`,
      },
      {
        id: 'impozite-mai-mari',
        h2: 'Cu cât cresc impozitele în București? Date concrete pe zone',
        h3: 'Creșteri estimate pe zonele principale din București (2025 → 2026)',
        continut: `Am calculat, pe baza grilelor ANCPI și a cotelor de impozitare ale Primăriei București (0,1% pentru locuința principală, 0,2% pentru secundară), impozitele estimate pentru apartamente tipice:

**Zona Titan-Pallady (Sectorul 3):**
• Apartament 2 camere, 55 mp, apartament nou → valoare piață ~130.000€ → impozit estimat: 580-650 lei/an (față de 120-180 lei anterior)

**Zona Floreasca-Dorobanți (Sectorul 1):**
• Apartament 3 camere, 90 mp, apartament nou → valoare piață ~350.000€ → impozit estimat: 1.550-1.750 lei/an

**Zona Militari-Gorjului (Sectorul 6):**
• Apartament 2 camere, 50 mp, apartament nou → valoare piață ~110.000€ → impozit estimat: 490-550 lei/an

**Zona Pipera-Voluntari:**
• Apartament 3 camere, 85 mp, bloc 2023 → valoare piață ~180.000€ → impozit estimat: 800-900 lei/an

**Concluzia matematică:** chiar și la creșteri de 3-4x față de impozitele vechi, vorbim de 50-150 lei în plus pe lună. Comparativ cu valoarea apartamentului, impozitul rămâne modest — sub 0,1% din valoare în cazul locuinței principale. Contextul european: în Germania, impozitul anual pe proprietate poate ajunge la 1,5-2% din valoare. Suntem încă mult sub media europeană.`,
      },
      {
        id: 'scutiri',
        h2: 'Scutiri și reduceri fiscale — ce se aplică în 2026',
        continut: `Legislația prevede mai multe categorii de reduceri și scutiri, iar cunoașterea lor poate face diferența:

**Scutiri totale de impozit:**
• Persoane cu handicap grav sau accentuat — pentru locuința principală
• Veterani de război și văduve de veteran
• Persoane cu venituri sub pragul de sărăcie (stabilit anual de MMSS)
• Clădiri monumente istorice (clasă A sau B) — reducere 50-100% în funcție de gradul de protecție

**Reduceri procentuale:**
• **Locuința principală:** cotă redusă de 0,1% față de 0,2% pentru secundare și terțiare
• **Clasa energetică A sau A+:** reducere de 5% din impozitul calculat — relevantă pentru apartamentele noi din 2020+
• **Clasa energetică B:** reducere de 2,5% — aplicabilă majorității apartamentelor noi post-2015
• **Plată anticipată integrală până la 31 martie:** bonificație de 10% la unele primării

**Regimul fiscal pentru apartamentele de la Neofort IMO:** toate ansamblurile active beneficiază de clase energetice B-A+, ceea ce înseamnă reduceri automate de 2,5-5% la impozit. Nu este mult în valoare absolută, dar confirmă că investiția în calitate energetică are și avantaje fiscale concrete.`,
      },
      {
        id: 'apartamente-noi',
        h2: 'Ce înseamnă E-Proprietatea pentru cumpărătorii de apartamente noi în 2026',
        continut: `Dacă ești în procesul de achiziție sau plănuiești să cumperi un apartament nou în 2026, iată ce trebuie să știi:

**Impozitarea în primul an:** se bazează pe valoarea din contractul de vânzare-cumpărare. Aceasta este și valoarea din grila notarială, deci nu există surprize — știi exact cât plătești.

**Avantajul clasei energetice:** apartamentele noi construite după normele din 2021 au obligatoriu clasa B sau mai bun. Aceasta înseamnă că beneficiezi automat de reducerea de 2,5-5% din prima zi.

**Predictibilitate fiscală:** față de apartamentele vechi, unde impozitul poate varia mult în funcție de reevaluare și starea clădirii, apartamentele noi au o bază de calcul clară și stabilă.

**Comparație practică:** dacă cumperi un apartament de 2 camere la Neofort 42 Piața Muncii la 197.056€ ca locuință principală, impozitul estimat este de 875-950 lei/an — adică 72-79 lei/lună. Pe fondul ratei lunare la bancă de 800-1.000 EUR, impozitul reprezintă sub 3% din costul total lunar.

Din perspectiva consultanților noștri care discută zilnic cu cumpărători: E-Proprietatea a creat inițial îngrijorare nejustificată. Când oamenii văd cifrele reale, îngrijorarea dispare.`,
      },
      {
        id: 'calendar',
        h2: 'Calendarul implementării E-Proprietatea — ce urmează',
        continut: `Implementarea E-Proprietatea se face în etape:

**2021-2023:** Pilot în 30 de comune, cadastrare masivă, digitalizarea datelor din arhivele locale.

**2024:** Extindere la toate municipiile reședință de județ, inclusiv București. Proprietarii au primit notificări informative (fără obligații de plată).

**2025:** Implementare operațională în București și principalele orașe. Primele impozite calculate pe baza valorii de piață, cu o perioadă de grație de 6 luni pentru contestații.

**2026:** Sistem complet operațional la nivel național. Impozitele bazate integral pe valorile E-Proprietatea, fără posibilitate de auto-declarare sub valoarea grilei.

**2027+:** Actualizări trimestriale ale grilelor de valoare, integrare cu ONRC pentru proprietăți comerciale.

**Termen important pentru 2026:** dacă ai contestat valoarea atribuită proprietății tale prin sistemul E-Proprietatea, termenul pentru soluționarea contestației este de 30 de zile de la depunere. Depune la ANAF cu documentație justificativă: evaluare imobiliară realizată de evaluator autorizat ANEVAR, comparabile de vânzare din zonă.`,
      },
      {
        id: 'concluzii',
        h2: 'Concluzie practică: ce faci acum',
        continut: `E-Proprietatea nu este o catastrofă fiscală — este o normalizare mult întârziată a sistemului de impozitare imobiliară din România. Da, impozitele cresc. Nu, nu cu 1.000%. Creșterile reale sunt de 2-5x față de valorile istorice, dar raportat la prețurile actuale ale proprietăților, rămânem la niveluri comparabile cu media europeană sau chiar sub aceasta.

**Ce să faci concret:**
1. Accesează portalul ANAF sau e-Romania.ro și verifică valoarea atribuită proprietății tale
2. Dacă valoarea ți se pare disproporționat de mare față de starea reală a locuinței, contactează un evaluator autorizat ANEVAR pentru o evaluare de contestație
3. Dacă ești chiriaș, nu ești afectat direct — dar landlord-ul tău s-ar putea să crească chiria ca să compenseze
4. Dacă ești în procesul de achiziție, calculează impozitul estimat și include-l în bugetul lunar de cost total al proprietății

Neofort IMO oferă consultanță gratuită pentru clienții care vor să înțeleagă impactul E-Proprietatea specific apartamentelor pe care le achiziționează. Sună-ne la 0758 090 904.`,
      },
    ],
  },

  'preturi-apartamente-bucuresti-2026': {
    titlu: 'Scad sau Nu Prețurile la Apartamente în București în 2026? Analiză Completă cu Date Reale',
    tag: 'Piață', tagColor: '#0369a1',
    data: '15 Martie 2026', dataISO: '2026-03-15', citire: '11 min',
    autor: 'sasha-calutu',
    image: '/blog/scad-preturile-apartamente-bucuresti-2026.avif',
    descriere: 'Prețurile apartamentelor din București scad sau cresc în 2026? Analiză cu date reale din INS, ANCPI și tranzacții proprii: evoluție pe zone, segmente și tipologii. Ce să faci dacă vrei să cumperi acum.',
    keywords: ['preturi apartamente bucuresti 2026', 'scad preturile imobiliare 2026', 'evolutie pret apartamente bucuresti', 'investitie imobiliara bucuresti 2026', 'apartamente noi pret 2026'],
    hashtags: ['#PreturiApartamente2026', '#PiatImobiliara', '#ApartamenteBucuresti', '#InvestitieImobiliara', '#NeofortIMO'],
    cuprins: [
      { id: 'concluzia', titlu: 'Concluzia scurtă (pentru cine nu are timp)' },
      { id: 'date-reale', titlu: 'Date reale: cât au crescut prețurile?' },
      { id: 'zone', titlu: 'Evoluție pe zone: câștigători și perdanți' },
      { id: 'factori', titlu: 'Ce influențează prețurile în 2026?' },
      { id: 'segmente', titlu: 'Apartamente noi vs. vechi: divergență clară' },
      { id: 'previziuni', titlu: 'Ce urmează: previziuni pentru restul lui 2026' },
      { id: 'decizie', titlu: 'Cumpăr acum sau aștept?' },
    ],
    sectiuni: [
      {
        id: 'concluzia',
        h2: 'Concluzia scurtă — pentru cine nu are timp să citească tot',
        continut: `Nu, prețurile nu scad în 2026. Nu semnificativ, nu pe termen scurt, nu pe segmentul apartamentelor noi din București. Dacă cineva îți spune altceva, îți vinde fie speranță, fie îți justifică o amânare a deciziei de cumpărare care te va costa.

Prețul mediu al apartamentelor noi în București a crescut cu 9,3% în 2025 față de 2024 (date ANCPI), după o creștere de 11,2% în 2024 față de 2023. Inflația acumulată în materialele de construcție, forța de muncă și costul finanțării proiectelor nu dispare de la sine.

Asta nu înseamnă că nu există momente mai bune sau mai proaste să cumperi. Înseamnă că strategia "aștept să scadă" s-a dovedit costisitoare pentru zeci de clienți pe care i-am consiliat în ultimii 22 de ani.`,
      },
      {
        id: 'date-reale',
        h2: 'Date reale: cât au crescut prețurile în București (2022-2026)',
        continut: `Să începem cu ce știm sigur, nu cu speculații. Datele de mai jos provin din statisticile ANCPI (tranzacții înregistrate), INS (indici prețuri imobiliare) și din analiza internă Neofort IMO bazată pe tranzacțiile proprii:

**Evoluția prețului mediu per metru pătrat, apartamente noi București:**
• 2022: 1.480 EUR/mp (medie)
• 2023: 1.620 EUR/mp (+9,5%)
• 2024: 1.800 EUR/mp (+11,1%)
• 2025: 1.967 EUR/mp (+9,3%)
• 2026 Q1: 2.050 EUR/mp (estimat, tranzacții proprii +OLX Index)

**Numărul de tranzacții imobiliare în București:**
• 2022: 67.400 tranzacții
• 2023: 58.200 (-13,6% — efectul dobânzilor mari)
• 2024: 63.800 (+9,6% — recuperare)
• 2025: 71.200 (+11,6% — cel mai bun an din ultimii 5)

**Ce arată aceste date:** piața nu s-a prăbușit sub presiunea dobânzilor ridicate. A încetinit în 2023, și-a revenit în 2024 și a accelerat în 2025. Momentul de "wait and see" din 2023 a costat cumpărătorii care au așteptat în jur de 15-20% din prețul apartamentului.`,
      },
      {
        id: 'zone',
        h2: 'Evoluție pe zone: câștigătorii și perdanții pieței imobiliare din București',
        continut: `Nu toate zonele Bucureștiului evoluează la fel. Iată datele concrete pe principalele zone rezidențiale:

**Zone cu cea mai rapidă creștere în 2025 (+12-18%):**

*Titan-Pallady (Sectorul 3)* — zona a explodat după deschiderea Metrului M2 prelungit și a IKEA Pallady. Prețul mediu a urcat de la 1.650 EUR/mp în 2024 la 1.940 EUR/mp în 2025 pentru apartamente noi. Cererea depășește semnificativ oferta disponibilă.

*Militari-Gorjului (Sectorul 6)* — accesul la M3 și parcările mari au transformat zona. De la 1.580 EUR/mp la 1.820 EUR/mp. Proiectele cu livrare 2026-2027 s-au vândut în proporție de 70-80% înainte de finalizare.

*Moșilor-Eminescu (Sectorul 2)* — zonă semicentrală care a prins avânt după regenerarea urbană. Creștere de 14% în 2025, cu prețuri medii de 2.400-2.700 EUR/mp pentru apartamente noi.

**Zone cu creșteri moderate (+7-11%):**

*Drumul Taberei-Rahova (Sectorul 5)* — piața matură, creșteri stabile. Beneficiarul liniei M5 continuă să performeze consistent.

*Floreasca-Aviației (Sectorul 1)* — piața premium și-a temperat creșterea (mai puțin spațiu disponibil), dar prețurile au trecut de 3.200-3.800 EUR/mp pentru proiectele de lux.

**Zone cu stagnare sau ușoară scădere:**
Zonele periferice fără acces la metrou (Pantelimon-Voluntari estul îndepărtat, Berceni-sud extrem) au înregistrat creșteri sub inflație sau chiar ușoare corecții. Cumpărătorii au migrat spre zone mai conectate.`,
      },
      {
        id: 'factori',
        h2: 'Ce influențează prețurile apartamentelor în 2026? Analiza factorilor cheie',
        continut: `Nu există un singur factor care determină prețurile imobiliare. Iată tabloul complet al forțelor care acționează în piața bucureșteană în 2026:

**Factori de creștere (presiune ascendentă):**

*Deficitul structural de locuințe:* România are 1,07 camere per persoană, față de media UE de 1,6. București are un stoc insuficient față de cerere, mai ales pe segmentul 2-3 camere la prețuri accesibile.

*Inflația în construcții:* costul materialelor de construcții a crescut cu 35-40% față de 2020. Forța de muncă s-a scumpit cu 45-50%. Un nou proiect rezidențial lansat azi nu poate fi profitabil sub 1.800-2.000 EUR/mp în zonele accesibile.

*Creșterea salariilor:* salariul mediu net în București a depășit 6.000 lei/lună în 2025. Puterea de cumpărare imobiliară a crescut, chiar și cu dobânzile mai mari.

**Factori de temperare (presiune descendentă):**

*Dobânzile bancare:* ROBOR a scăzut de la maximele din 2023, dar rata medie pentru un credit ipotecar în lei rămâne la 6,5-7,5% în 2026. Față de 2-3% din 2020-2021, aceasta restrânge accesibilitatea.

*Oferta nouă:* în 2025-2026, au intrat pe piața din București circa 15.000-18.000 apartamente noi. Aceasta temperează creșterile în segmentele cu ofertă abundentă.

*Prima Casă/Noua Casă:* condițiile programului guvernamental au rămas relativ neschimbate, menținând cererea stabilă în segmentul 70.000-150.000€.`,
      },
      {
        id: 'segmente',
        h2: 'Apartamente noi vs. vechi: divergența devine tot mai clară',
        continut: `Una dintre tendințele cel mai clare din piața imobiliară bucureșteană a ultimilor 3 ani este divergența tot mai accentuată între apartamentele noi și cele vechi.

**Apartamentele noi (post-2015):**
• Prețuri în creștere constantă: +9-12%/an în ultimii 3 ani
• Ratele de vacantă (neocupare) sub 2%
• Cerere ridicată din diasporă (București rămâne destinația principală pentru repatriați)
• Chirii lunare de 500-800€ pentru 2 camere în zone bune → randament 5-7% anual

**Apartamentele vechi (pre-2000, mai ales blocuri comuniste):**
• Creșteri moderate sau stagnare: +3-5%/an
• Costuri de întreținere în creștere (lifturi, acoperișuri, instalații)
• Clasa energetică D-F → facturi mari, impozit E-Proprietatea mai mare
• Risc seismic pentru unele blocuri în zone vulnerabile din București

**Exemplu concret din portofoliul nostru:** Un client a cumpărat în 2021 un apartament vechi de 2 camere în Titan la 85.000€, motivând că e "mai ieftin". În 2026, același apartament valorează ~95.000€ (+11% în 5 ani). Un client care a cumpărat în același timp un apartament nou de 2 camere la 110.000€ are azi o proprietate de 145.000-155.000€ (+35-40% în 5 ani). Diferența de abordare: 40.000-50.000€.`,
      },
      {
        id: 'previziuni',
        h2: 'Previziuni pentru restul anului 2026 — ce anticipăm',
        continut: `Previziunile imobiliare sunt în mod inerent imprecise — oricine îți promite certitudine minte. Ce pot face este să prezint scenariile probabile și raționamentul din spatele lor, bazat pe datele disponibile la momentul scrierii acestui articol (martie 2026):

**Scenariul de bază (70% probabilitate):** creștere moderată de 5-8% în 2026 față de 2025. Motivație: oferta nouă echilibrează parțial cererea, dobânzile rămân relativ stabile, economia românească crește cu 3-4%.

**Scenariul optimist (20% probabilitate):** creștere de 10-13%, similar cu 2024-2025. Se materializează dacă BCE reduce dobânzile agresiv (deja a început în 2025), cererea din diasporă crește și oferta rămâne insuficientă.

**Scenariul pesimist (10% probabilitate):** stagnare sau ușoară corecție (-2 la +3%). Necesită o înrăutățire semnificativă a contextului macroeconomic (recesiune europeană, criză financiară) sau o explozie a ofertei noi pe segmentul accesibil.

**Ce înseamnă pentru tine:** chiar și în scenariul de bază de +6%, dacă aștepți 12 luni pentru un apartament de 150.000€, pierzi 9.000€ în apreciere de preț — mai mult decât avansul suplimentar pe care l-ai economisi așteptând.`,
      },
      {
        id: 'decizie',
        h2: 'Cumpăr acum sau aștept? Ghidul deciziei raționale',
        continut: `Aceasta este, de departe, întrebarea pe care mi-o pun cel mai frecvent clienții. Răspunsul meu onest, bazat pe 22 de ani de piață:

**Cumpără ACUM dacă:**
• Ai stabilitate financiară (job stabil, fond de urgență de 6 luni)
• Rata lunară este sub 35% din venitul net al familiei
• Intenționezi să locuiești în apartament cel puțin 5 ani
• Ți-ai găsit un proiect care îți satisface criteriile — nu mai există "apartamentul perfect la prețul perfect de acum 2 ani"

**Amână dacă:**
• Nu ai avansul minim (15-20% + costuri notariale ~3%)
• Ești în proces de schimbare a locului de muncă sau a orașului
• Ai datorii cu dobânzi mari care consumă cash-flow (credite consum, carduri)
• Orizontul tău de detenție este sub 3 ani — piața imobiliară nu este pentru speculație pe termen scurt în condițiile actuale

**Formula mea pentru decizia rațională:** dacă suma dintre rata lunară și impozitele/cheltuielile proprietate este sub costul chiriei echivalente × 1,2 → cumpără. Dacă e mai mult → calculează cu atenție, poate chiria temporară are sens.

Eu am văzut prea mulți oameni care au așteptat "prăbușirea" din 2020, din 2022, din 2023, din 2024. Prăbușirea nu a venit. Au plătit chirii între timp și au cumpărat mai scump. Nu înseamnă că niciodată nu va exista o corecție — înseamnă că nimeni nu știe când.`,
      },
    ],
  },

  'ghid-cumparare-apartament-nou': {
    titlu: 'Ghid Complet 2026: Cum Cumperi un Apartament Nou de la Dezvoltator Fără Greșeli Costisitoare',
    tag: 'Ghid', tagColor: '#2d7a3a',
    data: '10 Martie 2026', dataISO: '2026-03-10', citire: '13 min',
    autor: 'adriana-veselu',
    image: '/blog/ghid-cumparare-apartament-nou-bucuresti.avif',
    descriere: 'Ghid practic și complet pentru cumpărarea unui apartament nou de la dezvoltator în București în 2026: avans, contract, capcane de evitat, finanțare, predare cheie. Sfaturi de la consultant cu 400+ tranzacții.',
    keywords: ['cum cumpar apartament nou 2026', 'ghid cumparare apartament nou', 'antecontract apartament nou', 'capcane cumparare apartament', 'pasi cumparare apartament nou bucuresti'],
    hashtags: ['#GhidCumparareApartament', '#ApartamentNou2026', '#ApartamenteBucuresti', '#ConsultantaImobiliara', '#NeofortIMO'],
    cuprins: [
      { id: 'inainte', titlu: 'Înainte de a căuta: ce trebuie să stabilești' },
      { id: 'cercetare', titlu: 'Cum analizezi un dezvoltator și un proiect' },
      { id: 'finantare', titlu: 'Finanțarea: credit ipotecar vs. surse proprii' },
      { id: 'antecontract', titlu: 'Antecontractul: ce verifici înainte să semnezi' },
      { id: 'capcane', titlu: '8 capcane frecvente și cum le eviți' },
      { id: 'predare', titlu: 'Predarea apartamentului: lista de verificare' },
      { id: 'costuri', titlu: 'Toate costurile: ce nu îți spune nimeni' },
    ],
    sectiuni: [
      {
        id: 'inainte',
        h2: 'Înainte de a căuta: ce trebuie să stabilești clar',
        continut: `Cel mai frecvent greșeală pe care o văd după 16 ani de consultanță imobiliară: oamenii caută apartamente înainte să fi răspuns la câteva întrebări fundamentale. Rezultatul: decizie emoțională, compromisuri costisitoare, regrete.

**Întrebările la care trebuie să ai răspuns înainte de prima vizionare:**

*Bugetul real — nu cel optim, ci cel maxim:*
Calculează: avansul disponibil + creditul maxim aprobat (sau pre-aprobat de bancă). Adaugă 3-5% pentru costuri de tranzacționare (taxă notarială, intabulare, comision). Acesta este bugetul tău real.

Exemplu concret: venituri nete familie 8.000 lei/lună → credit ipotecar maxim ~260.000 lei (~52.000€) la rata de 35% din venit. Dacă ai avans de 30.000€, bugetul total este ~82.000€. Aceasta este căsuța în care cauți, nu mai sus.

*Orizontul de timp:*
Intenționezi să locuiești minim 5 ani? Sau e o investiție pe 2-3 ani? Dacă e pe termen scurt, calculul este complet diferit. Pe termen scurt, tranzacția (costuri intrare + ieșire) poate consuma tot profitul dintr-o piață cu creștere moderată.

*Zona — non-negociabilă vs. preferată:*
Fă lista: ce nu poți accepta (distanță maximă față de birou, lipsa metrului, zonă nesigură)? Ce preferi dar poți negocia? Mulți oameni confundă preferințele cu necesitățile și ratează apartamente excelente.`,
      },
      {
        id: 'cercetare',
        h2: 'Cum analizezi un dezvoltator și un proiect — checklist complet',
        continut: `Nu toți dezvoltatorii sunt egali. Am văzut în 16 ani de activitate situații în care cumpărători entuziaști au semnat antecontracte cu dezvoltatori care ulterior au întârziat 2-3 ani sau au livrat calitate sub standarde. Iată cum să verifici:

**Verificarea dezvoltatorului (obligatorie):**

1. *Portofoliu anterior*: Caută proiectele finalizate. Vorbește cu locatari dacă poți (Facebookuri de cartier, grupuri). Întreabă: s-a livrat la timp? Sunt probleme tehnice nesoluționate?

2. *Situație juridică*: Verifică CUI-ul la ONRC. Există procedure de insolvență sau faliment în derulare? Caută în dosare.justice.ro dacă există procese majore.

3. *Autorizații disponibile*: Dezvoltatorul trebuie să îți pună la dispoziție Autorizația de Construire, Certificatul de Urbanism și dovada dreptului de proprietate/superficie pe teren. Dacă ezită — semnal roșu.

4. *Finanțarea proiectului*: Proiectul este finanțat de bancă sau din fonduri proprii? Proiectele cu finanțare bancară au un nivel mai ridicat de supraveghere financiară — băncile nu finanțează proiecte fără documentație solidă.

**Verificarea proiectului:**

5. *Stadiu fizic vs. stadiu contractat*: Dacă plătești avans și construcția e la nivelul 0, riscul e mai mare decât dacă structura e finalizată.

6. *Specificații tehnice în scris*: Tâmplărie, izolație, finisaje, dotări — trebuie să fie în antecontract, nu doar în broșura de vânzare.`,
      },
      {
        id: 'finantare',
        h2: 'Finanțarea apartamentului nou: credit ipotecar vs. surse proprii în 2026',
        continut: `Aceasta este probabil cea mai importantă decizie financiară pe care o vei lua în viața ta. Nu o lua emoțional.

**Credit ipotecar în 2026 — situația actuală:**

Rata dobânzii de referință (ROBOR 3M) se află la 5,8-6,2% în Q1 2026. Adăugând marja băncii (2-3%), rata totală pentru un credit în lei este de 7,8-9,2% DAE efectiv. Aceasta înseamnă că pentru un credit de 250.000 lei pe 30 de ani, plătești în total circa 570.000-620.000 lei — adică 2,2-2,5x suma împrumutată.

*Este creditare mai scumpă decât în 2020-2021?* Absolut. *Este prohibitivă?* Nu, dacă rata este sub 35% din venitul net.

**Prima Casă / Noua Casă — avantaje concrete:**
• Avans minim 5% (față de 15-20% la credit standard)
• Garanție de stat pentru 50% din valoarea creditului
• Plafonul maxim: 66.500€ (locuință nouă), 57.000€ (locuință veche)
• Dezavantaj: nu poți deține o altă proprietate, comisioane mai mari

**Credit ipotecar standard:**
• Avans minim 15-20%
• Fără plafon de preț
• Flexibilitate mai mare în negocierea condițiilor
• Recomandare: mergi la minim 3 bănci și cere oferte în scris înainte să te hotărăști

**Plata integrală din surse proprii:**
Dacă ai lichiditatea, este cea mai simplă variantă. Negociezi un discount de 3-7% cu dezvoltatorul (prețul cash este întotdeauna mai mic), elimini costul dobânzii și ești mai flexibil în decizie.`,
      },
      {
        id: 'antecontract',
        h2: 'Antecontractul: ce verifici înainte să semnezi',
        continut: `Antecontractul (promisiunea bilaterală de vânzare-cumpărare) este documentul cel mai important în procesul de achiziție. Odată semnat, ești legat juridic. Înainte de semnătură, verifică obligatoriu:

**Clauze esențiale care trebuie să fie prezente:**

*1. Descrierea exactă a proprietății:* suprafața utilă, suprafața construită, etaj, număr cadastral apartament (dacă există), cota parte din spațiile comune, locul de parcare (dacă e inclus).

*2. Prețul total și structura plăților:* prețul în EUR sau LEI, cursul de schimb (dacă e în EUR), graficul de plăți (avans, tranșe la etape de construcție, plată finală la predare). Fii atent la "prețul poate fi ajustat cu indicele inflației" — înseamnă că prețul nu e fixat.

*3. Termenul de finalizare și penalități:* data estimată de predare și penalitățile dacă dezvoltatorul depășește termenul. Standard în piață: 0,05-0,1%/zi din avansul plătit. Dacă nu există penalități pentru întârziere, negociază sau evită.

*4. Specificațiile tehnice în anexă:* tâmplărie, finisaje, dotări — în detaliu, nu generic ("tâmplărie de calitate").

*5. Condițiile de reziliere:* în ce condiții poți ieși din contract și ce primești înapoi? Avansul este returnat integral sau există penalizări?

**Clauzele abuzive frecvente (de evitat):**
• "Prețul se ajustează în funcție de suprafața reală măsurată la predare" fără un plafon maxim de variație
• "Termenul de predare se poate prelungi fără limitare din motive independente de voința vânzătorului"
• "Cumpărătorul nu poate ceda antecontractul fără acordul scris al vânzătorului" — limitează opțiunile tale`,
      },
      {
        id: 'capcane',
        h2: '8 Capcane Frecvente în Cumpărarea Apartamentelor Noi — și Cum le Eviți',
        continut: `Le-am văzut pe toate. Iată lista completă, cu exemple reale (anonimizate):

**1. Suprafața utilă vs. suprafața construită**
Dezvoltatorii afișează prețul "per mp util" dar suprafața utilă (ce folosești efectiv) este 75-85% din suprafața construită. Un apartament de "55 mp utili" are ~65-70 mp construiți. La 2.000 EUR/mp construit, prețul real e mai mic decât la 2.000 EUR/mp util.

**2. Locul de parcare "gratuit" care nu există în acte**
Am văzut situații unde broșura promite "loc de parcare inclus", dar antecontractul nu îl menționează. La predare, locul de parcare se vinde separat la 8.000-15.000€. Soluție: locul de parcare trebuie menționat explicit în antecontract, cu numărul cadastral dacă e posibil.

**3. Termenul de predare — optimism vs. realitate**
Statisticile Neofort IMO din ultimii 10 ani: 60% din proiectele livrate au depășit termenul inițial cu 3-18 luni. Calculează-ți planul financiar cu o marjă de 6 luni față de termenul promis.

**4. Finisajele "la cheie" care nu includ ce crezi**
"La cheie" este un termen ambiguu. Verifică în detaliu: include zugrăveli? Gresie? Parchet? Obiecte sanitare? Ușile interioare? Am văzut "la cheie" fără ușile interioare, fără aparate de aer condiționat deși priza AC era prevăzută.

**5. Utilitățile — costuri ascunse la branșament**
Branșamentele individuale (gaz, curent, apă) la un apartament nou pot costa 2.000-5.000 lei suplimentar dacă nu sunt incluse în preț. Verifică explicit.

**6. Taxele de administrare înainte de predare**
Unii dezvoltatori încep să perceapă taxe de administrare/asociație din momentul finalizării blocului, nu din momentul predării cheii. Poți plăti 3-6 luni de taxe pentru un apartament în care nu locuiești.

**7. Rezoluțiunea unilaterală a antecontractului de către dezvoltator**
Unele contracte prevăd că dezvoltatorul poate rezilia contractul cu returnarea avansului (fără dobânzi sau penalități) în anumite condiții vagi. Aceasta te lasă expus: ai blocat banii fără randament și poate piața s-a mișcat între timp.

**8. Comisionul de intermediere ascuns**
Dacă cumperi printr-un agent imobiliar, verifică clar: comisionul este plătit de cumpărător sau de dezvoltator? La Neofort IMO, cumpărătorii nu plătesc comision — este plătit de noi ca și companie de dezvoltare. Nu toți dezvoltatorii funcționează la fel.`,
      },
      {
        id: 'predare',
        h2: 'Predarea apartamentului: lista de verificare obligatorie',
        continut: `Ziua predării este momentul în care trebuie să fii cel mai atent. Ce semnezi la predare este definitiv.

**Ce verifici ÎNAINTE de a semna procesul-verbal de predare:**

*Structural:*
• Fisuri în pereți sau plafon — orice fisură mai mare de 0,3 mm la pereți portanți este problemă majoră
• Nivel și planeitate pardoseli — verifică cu o bilă sau o nivelă de 1m
• Ferestre și uși — deschid și se închid corect, fără să freceze sau să lase curent

*Finisaje:*
• Gresie și faianță — verifică bucată cu bucată, scoate zone goale (sunet sec = lipsa mortarului → se va crăpa)
• Parchet — umflături, scârțâituri
• Zugrăveli — pete de umiditate, imperfecțiuni majore

*Instalații:*
• Apa caldă și rece — deschide toate robinetele, verifică presiunea și temperatura
• Canalizare — lasă apa să curgă 3 minute, verifică scurgerea (nu vrei să descoperi o teava înfundată după ce te muți)
• Electricitate — verifică fiecare priză și întrerupător cu o lampă de test
• Gaz — nu verifica singur, doar împreună cu reprezentantul Distrigaz/Engie

*Documente primite la predare:*
• Procesul-verbal de predare-primire (semnează DOAR după ce ai verificat tot)
• Cartea tehnică a construcției
• Certificatul de performanță energetică
• Documentele de garanție pentru dotări (centrală termică, lift, etc.)
• Regulamentul asociației de proprietari`,
      },
      {
        id: 'costuri',
        h2: 'Toate costurile cumpărării unui apartament nou — ce nu îți spune nimeni',
        continut: `"Prețul apartamentului" nu este suma totală pe care o plătești. Iată calculul complet, cu valori reale pentru un apartament de 150.000€ în București în 2026:

**Costul apartamentului:** 150.000€

**Taxa notarială:** ~4.000-5.000 lei (variabilă în funcție de valoarea tranzacției, aproximativ 0,5-1%)

**Taxa de intabulare (OCPI):** 1.500-2.500 lei (depinde de valoare)

**Impozit la achiziție:** 0 lei (TVA 5% sau 9% este deja inclus în prețul apartamentelor noi, nu se plătește separat de cumpărător)

**Asigurare obligatorie PAD:** ~200 lei/an (obligatorie prin lege)

**Asigurare facultativă locuință:** 300-600 lei/an (recomandată)

**Mobilare și echipare:** 15.000-40.000€ (în funcție de standard) — costul adesea uitat

**Fond de urgență recomandat:** 3-6 luni cheltuieli lunare totale (criză financiară personală)

**Costul total real pentru intrarea în apartamentul de 150.000€:**
150.000€ + ~3.500 lei taxe + 20.000-40.000€ mobilare + fond urgență = 175.000-200.000€ buget total necesar

**De ce contează:** mulți cumpărători intră în tranzacție cu exact avansul calculat și descoperă că au nevoie de 15-25% mai mult pentru a putea locui efectiv în apartamentul achiziționat. Planifică din timp.

Dacă ai întrebări specifice despre procesul de achiziție la Neofort IMO, sună-ne la 0758 090 904 sau trimite-ne o solicitare prin formularul de contact — oferim consultanță gratuită fără angajamente.`,
      },
    ],
  },
}

const ARTICOLE_LIST = [
  { slug: 'e-proprietatea-2026-noul-sistem-de-impozitare', titlu: 'E-Proprietatea 2026: Tot ce Trebuie să Știi', data: '22 Aprilie 2026', image: '/blog/e-proprietatea-2026-sistem-impozitare.avif', tag: 'Legislație', tagColor: '#7c3aed' },
  { slug: 'preturi-apartamente-bucuresti-2026', titlu: 'Scad sau Nu Prețurile la Apartamente în București în 2026?', data: '15 Martie 2026', image: '/blog/scad-preturile-apartamente-bucuresti-2026.avif', tag: 'Piață', tagColor: '#0369a1' },
  { slug: 'ghid-cumparare-apartament-nou', titlu: 'Ghid Complet 2026: Cum Cumperi un Apartament Nou', data: '10 Martie 2026', image: '/blog/ghid-cumparare-apartament-nou-bucuresti.avif', tag: 'Ghid', tagColor: '#2d7a3a' },
]

// Calculeaza numarul de cuvinte din articol
function getWordCount(a) {
  const text = a.sectiuni.map(s => s.continut + ' ' + s.h2 + ' ' + (s.h3 || '')).join(' ')
  return text.split(/\s+/).filter(w => w.length > 2).length
}

export async function generateStaticParams() {
  return Object.keys(ARTICOLE).map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const a = ARTICOLE[params.slug]
  if (!a) return {}
  const autor = AUTORI[a.autor]
  return {
    title: a.titlu + ' | Neofort IMO Blog',
    description: a.descriere,
    alternates: { canonical: `${BASE}/blog/${params.slug}` },
    keywords: a.keywords?.join(', '),
    authors: [{ name: autor?.nume }],
    openGraph: {
      title: a.titlu,
      description: a.descriere,
      url: `${BASE}/blog/${params.slug}`,
      type: 'article',
      locale: 'ro_RO',
      publishedTime: a.dataISO,
      authors: [autor?.nume],
      images: [{ url: `${BASE}${a.image?.replace('.avif', '.jpg') || '/og-blog.jpg'}`, width: 1200, height: 630, alt: a.titlu }],
    },
    twitter: { card: 'summary_large_image', images: [`${BASE}${a.image}`] },
  }
}

'use client'
function BlogViews({ slug }) {
  const [views, setViews] = typeof window !== 'undefined'
    ? require('react').useState(null)
    : [null, () => {}]
  typeof window !== 'undefined' && require('react').useEffect(() => {
    try {
      const key = 'neofort_views_' + slug
      const current = parseInt(localStorage.getItem(key) || '0')
      const newVal = current + 1
      localStorage.setItem(key, newVal)
      setViews(newVal)
    } catch {}
  }, [slug])
  if (!views) return null
  return <><span>·</span><span>{views} {views === 1 ? 'vizualizare' : 'vizualizări'}</span></>
}

export default function ArticolPage({ params }) {
  const a = ARTICOLE[params.slug]
  if (!a) notFound()
  const autor = AUTORI[a.autor]
  const altele = ARTICOLE_LIST.filter(x => x.slug !== params.slug).slice(0, 2)
  const shareUrl = `${BASE}/blog/${params.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.titlu,
    description: a.descriere,
    image: `${BASE}${a.image}`,
    datePublished: a.dataISO,
    dateModified: a.dataISO,
    url: `${BASE}/blog/${params.slug}`,
    inLanguage: 'ro-RO',
    keywords: a.keywords?.join(', '),
    author: {
      '@type': 'Person',
      name: autor?.nume,
      jobTitle: autor?.titlu,
      image: `${BASE}${autor?.foto}`,
      worksFor: { '@type': 'Organization', name: 'Neofort IMO', url: BASE },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Neofort IMO',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/logo.avif` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${params.slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Acasă', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: a.titlu, item: `${BASE}/blog/${params.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header activePath="/blog" />
      <main className="min-h-screen bg-white">

        {/* HERO IMAGE */}
        {a.image && (
          <div className="relative w-full overflow-hidden" style={{ height: 420, maxHeight: '55vw' }}>
            <Image src={a.image} alt={a.titlu} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-4xl mx-auto">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full text-white mb-3" style={{ background: a.tagColor }}>{a.tag}</span>
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">{a.titlu}</h1>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[#2d7a3a]">Blog</Link>
            <span>›</span>
            <span className="text-gray-700 line-clamp-1">{a.tag}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

            {/* ARTICOL PRINCIPAL */}
            <article>
              {/* META */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {autor?.foto && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={autor.foto} alt={autor.nume} fill className="object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{autor?.nume}</p>
                    <p className="text-xs text-gray-400">{autor?.titlu}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-3 flex-wrap">
                  <time dateTime={a.dataISO}>{a.data}</time>
                  <span>·</span>
                  <span>{a.citire} citire</span>
                  <span>·</span>
                  <span>{getWordCount(a).toLocaleString()} cuvinte</span>
                  <BlogViews slug={params.slug} />
                </div>
              </div>

              {/* CUPRINS MOBIL */}
              <div className="lg:hidden border border-gray-200 rounded-xl p-4 mb-6 bg-gray-50">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Cuprins</p>
                <ol className="space-y-1.5">
                  {a.cuprins.map((c, i) => (
                    <li key={c.id}>
                      <a href={`#${c.id}`} className="text-xs text-[#2d7a3a] hover:underline">
                        {i + 1}. {c.titlu}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* LEAD */}
              <p className="text-base text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-[#2d7a3a] pl-4">{a.descriere}</p>

              {/* SECTIUNI */}
              {a.sectiuni.map(s => (
                <section key={s.id} id={s.id} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 mt-8">{s.h2}</h2>
                  {s.h3 && <h3 className="text-base font-semibold text-gray-700 mb-3">{s.h3}</h3>}
                  <div className="text-sm text-gray-700 leading-8 whitespace-pre-line">
                    {s.continut}
                  </div>
                </section>
              ))}

              {/* HASHTAGS */}
              {a.hashtags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                  {a.hashtags.map(h => (
                    <span key={h} className="text-xs text-[#2d7a3a] bg-green-50 px-2.5 py-1 rounded-full border border-green-100">{h}</span>
                  ))}
                </div>
              )}

              {/* SHARE */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">Distribuie articolul</p>
                <div className="flex gap-2 flex-wrap">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2"
                    style={{ background: '#1877f2' }}>
                    Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(a.titlu)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-lg text-white font-medium"
                    style={{ background: '#000' }}>
                    X / Twitter
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(a.titlu + ' ' + shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-lg text-white font-medium"
                    style={{ background: '#25d366' }}>
                    WhatsApp
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-lg text-white font-medium"
                    style={{ background: '#0077b5' }}>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* AUTOR BIO */}
              {autor && (
                <div className="mt-10 border border-gray-200 rounded-2xl p-6 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Despre autor</p>
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <Image src={autor.foto} alt={autor.nume} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-900">{autor.nume}</p>
                      <p className="text-xs mb-2" style={{ color: '#2d7a3a' }}>{autor.titlu}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{autor.bio}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ARTICOLE SIMILARE MOBIL */}
              <div className="lg:hidden mt-8">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Citește și</p>
                <div className="space-y-3">
                  {altele.map(alt => (
                    <Link key={alt.slug} href={`/blog/${alt.slug}`} className="flex gap-3 group">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {alt.image && <Image src={alt.image} alt={alt.titlu} fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800 group-hover:text-[#2d7a3a] transition-colors line-clamp-2">{alt.titlu}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{alt.data}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            {/* SIDEBAR DESKTOP */}
            <aside className="hidden lg:block">
              <div className="sticky space-y-5" style={{ top: '96px' }}>

              {/* CUPRINS */}
              <div className="border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Cuprins</p>
                <ol className="space-y-2">
                  {a.cuprins.map((c, i) => (
                    <li key={c.id}>
                      <a href={`#${c.id}`}
                        className="flex gap-2 text-xs text-gray-600 hover:text-[#2d7a3a] transition-colors leading-snug group">
                        <span className="font-semibold text-[#2d7a3a] flex-shrink-0">{i + 1}.</span>
                        <span className="group-hover:underline">{c.titlu}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              {/* AUTOR */}
              {autor && (
                <div className="border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Autor</p>
                  <div className="flex gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <Image src={autor.foto} alt={autor.nume} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{autor.nume}</p>
                      <p className="text-[10px]" style={{ color: '#2d7a3a' }}>{autor.titlu}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{autor.bio}</p>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-xl p-5 text-white" style={{ background: '#081c12' }}>
                <p className="text-xs font-semibold mb-1" style={{ color: '#e8b44e' }}>Cauți apartament nou?</p>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>12 ansambluri active în București. Consultanță gratuită, fără comision.</p>
                <Link href="/ansambluri-rezidentiale"
                  className="block text-center text-xs py-2.5 rounded-lg font-semibold mb-2"
                  style={{ background: '#2d7a3a', color: 'white' }}>
                  Vezi ansambluri →
                </Link>
                <a href="tel:0758090904"
                  className="block text-center text-xs py-2 rounded-lg font-medium"
                  style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>
                  0758 090 904
                </a>
              </div>

              {/* ARTICOLE SIMILARE */}
              <div className="border border-gray-200 rounded-xl p-5">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Citește și</p>
                <div className="space-y-4">
                  {altele.map(alt => (
                    <Link key={alt.slug} href={`/blog/${alt.slug}`} className="flex gap-3 group">
                      <div className="relative w-16 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                        {alt.image && <Image src={alt.image} alt={alt.titlu} fill className="object-cover" />}
                      </div>
                      <div>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded text-white" style={{ background: alt.tagColor }}>{alt.tag}</span>
                        <p className="text-[11px] font-medium text-gray-800 group-hover:text-[#2d7a3a] transition-colors leading-snug mt-1 line-clamp-2">{alt.titlu}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{alt.data}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* KEYWORDS */}
              {a.keywords && (
                <div className="border border-gray-100 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Teme abordate</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.keywords.map(k => (
                      <span key={k} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{k}</span>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
