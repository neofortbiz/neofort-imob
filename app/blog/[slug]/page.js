import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogViews from '@/components/BlogViews'

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
  },,

  'preturi-apartamente-bucuresti-2026': {
    titlu: `Prețurile Apartamentelor din București în 2026: Scad sau Nu? Analiză cu Date Reale`,
    tag: 'Piață', tagColor: '#0369a1',
    data: '5 Aprilie 2026', dataISO: '2026-04-05', citire: '10 min',
    autor: 'sasha-calutu',
    image: '/blog/preturi-apartamente-bucuresti-2026-scad-sau-nu.avif',
    descriere: `Prețurile apartamentelor din București scad sau cresc în 2026? Analiză cu date reale din ANCPI, INS și piața locală: evoluție pe zone, impactul TVA 21%, Noua Casă și ce înseamnă pentru cumpărătorii de azi.`,
    keywords: ['preturi apartamente bucuresti 2026', 'scad preturile imobiliare 2026', 'evolutie pret apartamente bucuresti', 'investitie imobiliara bucuresti 2026', 'apartamente noi pret 2026', 'piata imobiliara bucuresti 2026'],
    hashtags: ['#PreturiApartamente2026', '#PiatImobiliara', '#ApartamenteBucuresti', '#InvestitieImobiliara', '#NeofortIMO'],
    cuprins: [
      { id: 'concluzie', titlu: `Concluzia scurtă` },
      { id: 'date-reale', titlu: `Date reale: evoluția prețurilor 2022–2026` },
      { id: 'impactul-tva', titlu: `Impactul TVA 21% din august 2025` },
      { id: 'zone', titlu: `Evoluție pe zone principale` },
      { id: 'factori', titlu: `Factorii care mișcă prețurile` },
      { id: 'previziuni', titlu: `Ce urmează în restul lui 2026` },
      { id: 'decizie', titlu: `Cumpăr acum sau aștept?` },
    ],
    sectiuni: [
      {
        id: 'concluzie',
        h2: `Concluzia pentru cine nu are timp — răspunsul scurt`,
        continut: `Nu, prețurile nu scad în 2026. Nu semnificativ, nu pe termen scurt și în special nu pe segmentul apartamentelor noi din București. Dacă cineva îți spune altceva, ori nu urmărește datele, ori are un interes în amânarea deciziei tale de cumpărare.

Datele ANCPI arată că prețul mediu per metru pătrat la apartamentele noi din București a crescut cu 9,3% în 2025 față de 2024, după o creștere de 11,1% în 2024 față de 2023. Inflația acumulată în materialele de construcție și în forța de muncă nu dispare de la sine. Un proiect rezidențial lansat azi nu poate fi profitabil sub 1.800–2.000 EUR/mp în zonele accesibile ale Capitalei.

Asta nu înseamnă că nu există momente mai bune sau mai proaste să cumperi. Înseamnă că strategia „aștept să scadă" s-a dovedit costisitoare pentru zeci de clienți pe care i-am consiliat în ultimii 17 ani.`,
      },
      {
        id: 'date-reale',
        h2: `Date reale: cum au evoluat prețurile din 2022 până în 2026`,
        continut: `Datele de mai jos provin din statisticile ANCPI (tranzacții înregistrate), INS (indicii prețurilor locuințelor) și analiza tranzacțiilor Neofort IMO:

Prețul mediu per metru pătrat util, apartamente noi București:
• 2022: 1.480 EUR/mp
• 2023: 1.620 EUR/mp (+9,5%)
• 2024: 1.800 EUR/mp (+11,1%)
• 2025: 1.967 EUR/mp (+9,3%)
• T1 2026: ~2.050 EUR/mp (estimat pe baza tranzacțiilor înregistrate)

Numărul de tranzacții imobiliare în București și Ilfov:
• 2022: 67.400 tranzacții
• 2023: 58.200 (-13,6% — efectul ratelor mari de dobândă)
• 2024: 63.800 (+9,6% — recuperare graduală)
• 2025: 71.200 (+11,6% — cel mai bun an din ultimii 5)

Piața nu s-a prăbușit sub presiunea dobânzilor ridicate din 2023. A încetinit, și-a revenit, a accelerat. Cei care au așteptat o corecție în 2023 și 2024 au plătit cu 15–20% mai mult la achiziția finală față de prețul pe care l-au „ratat".`,
      },
      {
        id: 'impactul-tva',
        h2: `Impactul major: TVA 21% pentru apartamentele noi din august 2025`,
        continut: `Cea mai importantă schimbare legislativă care afectează piața în 2026 este majorarea TVA pentru locuințele noi. Prin Legea nr. 141/2025, cota standard a crescut de la 19% la 21% începând cu 1 august 2025, iar cota redusă de 5% a fost eliminată complet.

Singura facilitate care mai există este cota tranzitorie de 9%, aplicabilă strict celor care au semnat un antecontract și au achitat minim 20% avans până la 31 iulie 2025, cu livrare și semnare contract final până la 31 iulie 2026. Dacă nu îndeplinești cumulativ toate aceste condiții, plătești 21% TVA.

Ce înseamnă concret în bani:
• Apartament de 100.000 EUR net → cu TVA 9%: 109.000 EUR total | cu TVA 21%: 121.000 EUR total
• Apartament de 150.000 EUR net → cu TVA 21%: 181.500 EUR total
• Diferența față de TVA 5% de acum 2 ani (la 100.000 EUR): 16.000 EUR în plus

Efectul pe piață a fost dublu. Înainte de 1 august 2025, volumul tranzacțiilor a explodat — oamenii s-au grăbit să semneze. După această dată, piața s-a temperat cu aproximativ 12% în București față de aceeași perioadă a lui 2024. Pe termen lung, TVA 21% nu „stinge" cererea — o redistribuie spre apartamente mai mici sau presează cumpărătorii să acceseze Noua Casă.`,
      },
      {
        id: 'zone',
        h2: `Evoluție pe zone: câștigătorii și cei rămași în urmă`,
        continut: `Nu toate cartierele Bucureștiului evoluează identic. Iată situația concretă pe zonele principale:

Zone cu cea mai rapidă apreciere în 2025 (+12–18%):

Titan–Pallady (Sectorul 3) — zona a explodat după extinderea liniei M2 și deschiderea IKEA Pallady. Prețul mediu pentru apartamente noi a urcat de la 1.650 EUR/mp în 2024 la 1.940 EUR/mp în 2025. Cererea depășește semnificativ oferta disponibilă, iar proiectele noi se vând în proporție de 70–80% înainte de finalizare.

Militari–Gorjului (Sectorul 6) — accesul la metrou M3 și parcările mari au transformat radical zona. De la 1.580 EUR/mp la 1.820 EUR/mp. Proiectele cu livrare 2026–2027 s-au rezervat masiv.

Moșilor–Eminescu (Sectorul 2) — zonă semicentrală cu cerere din diasporă consistentă. Creștere de 14% în 2025, cu prețuri medii de 2.400–2.700 EUR/mp pentru apartamente noi.

Zone cu creșteri moderate (+7–11%):

Floreasca–Aviației (Sectorul 1) — piața premium și-a temperat creșterea din lipsă de teren disponibil. Prețuri de 3.200–4.000 EUR/mp pentru proiectele boutique.

Drumul Taberei (Sectorul 5) — piața matură, creșteri stabile. Beneficiarul liniei M5 continuă să performeze consistent.

Zone care au stagnat sau au crescut minimal:

Periferiile fără metrou (Pantelimon estul îndepărtat, Berceni sud extrem, Voluntari vest) au înregistrat creșteri sub inflație sau stagnare. Cumpărătorii au migrat spre zone mai conectate la rețeaua de transport.`,
      },
      {
        id: 'factori',
        h2: `Ce forțe mișcă prețurile în 2026 — tabloul complet`,
        continut: `Prețurile imobiliare nu sunt determinate de un singur factor. Iată forțele care acționează simultan:

Presiune ascendentă (cresc prețurile):

Deficitul structural de locuințe: România are 1,07 camere per persoană față de media UE de 1,6. București înregistrează cel mai mare deficit din țară, cu o populație rezidentă în creștere și un stoc insuficient de apartamente de 2–3 camere la prețuri accesibile.

Inflația în construcții: costul materialelor a crescut cu 35–40% față de 2020. Manopera s-a scumpit cu 45–50%. Un proiect rezidențial lansat azi nu poate fi livrat profitabil sub 1.800–2.000 EUR/mp în zonele periferice.

Creșterea salariilor: salariul mediu net în București a depășit 6.000 lei/lună în 2025. Puterea de cumpărare imobiliară a crescut, chiar și cu dobânzile mai mari.

Presiune descendentă (temperează creșterile):

Dobânzile bancare: ROBOR s-a redus față de maximele din 2023, dar rata medie pentru un credit ipotecar în lei rămâne la 6,5–7,5% în 2026 — mult peste 2–3% din 2020–2021. Aceasta restrânge accesibilitatea creditelor standard.

TVA 21% pentru locuințele noi: după eliminarea cotei de 9%, orice achiziție nouă semnată după 31 iulie 2025 costă cu 10–12% mai mult față de acum 2 ani doar din cauza taxei.

Oferta nouă: în 2025–2026, au intrat pe piața din București circa 15.000–18.000 apartamente noi, temperând creșterile în segmentele cu ofertă mai abundentă.`,
      },
      {
        id: 'previziuni',
        h2: `Previziuni pentru restul anului 2026 — ce urmează`,
        continut: `Oricine îți garantează cu certitudine evoluția prețurilor minte. Pot prezenta scenariile probabile cu raționamentul din spatele lor:

Scenariul de bază (probabilitate ridicată): creștere moderată de 5–7% în 2026 față de 2025. Justificare: oferta nouă echilibrează parțial cererea, dobânzile rămân relativ stabile, economia crește cu 3–4%. TVA 21% temperează ușor cererea pe apartamentele mari și scumpe.

Scenariul optimist: creștere de 10–12%, similar cu 2024–2025. Se materializează dacă BCE continuă ciclul de reduceri ale dobânzilor, cererea din diasporă crește și oferta rămâne insuficientă pe segmentul 2 camere sub 150.000 EUR.

Scenariul pesimist: stagnare sau corecție ușoară (0 până la -3%). Necesită deteriorare macroeconomică semnificativă sau explozie neașteptată a ofertei noi. Probabilitate scăzută în orizontul de 12 luni.

Ce înseamnă practic: chiar și în scenariul conservator de +6%, dacă aștepți 12 luni să cumperi un apartament de 150.000 EUR, pierzi 9.000 EUR în apreciere — mai mult decât avansul suplimentar pe care l-ai economisi amânând decizia.`,
      },
      {
        id: 'comparatie',
        h2: `Prețurile din București în context european — suntem scumpi sau ieftini?`,
        continut: `O perspectivă utilă pentru a evalua corect piața din București este comparația cu alte capitale din Europa Centrală și de Est, țări cu economii și istorii similare:

Prețuri medii apartamente noi, T1 2026 (EUR/mp util, zone similare cu Titan-Pallady sau Militari):
• Varșovia (Polonia): 3.200–4.100 EUR/mp
• Praga (Cehia): 5.500–7.000 EUR/mp
• Budapesta (Ungaria): 2.800–3.600 EUR/mp
• București (România): 1.900–2.200 EUR/mp
• Sofia (Bulgaria): 1.400–1.800 EUR/mp
• Belgrad (Serbia): 1.600–2.000 EUR/mp

Concluzia: București este semnificativ mai ieftin decât Varșovia și Praga — două piețe cu care se compară frecvent în discuțiile despre investiții imobiliare din regiune. Față de Budapesta, diferența este de 40–50%.

Ce explică gap-ul față de Varșovia și Praga: convergența economică și salariile din România sunt încă sub nivelul polonez și ceh, deși decalajul se reduce rapid. Salariul mediu în București a ajuns la aproximativ 1.200–1.400 EUR net/lună în 2025, față de 1.600–1.800 EUR în Varșovia. Pe măsură ce salariile converge, prețurile imobiliare urmează același traseu.

Implicația pentru investitori: există un potențial de apreciere suplimentar față de convergența economică cu Europa Centrală. Un apartament cumpărat azi în București la 2.000 EUR/mp poate ajunge la 2.800–3.200 EUR/mp pe termen de 8–12 ani — nu ca speculație, ci ca reflecție a convergenței salariale.

Un alt indicator util: raportul preț/venit (câți ani de salariu mediu costă un apartament de 50 mp):
• Praga: 14–16 ani
• Varșovia: 10–12 ani
• București: 9–11 ani
• Budapesta: 10–13 ani

Față de media europeană de 8–12 ani, București se află în linie — piața nu este nici subevaluată dramatic, nici în bulă speculativă. Este o piață matură în curs de convergență.`,
      },
      {
        id: 'decizie',
        h2: `Cumpăr acum sau aștept? Ghidul deciziei raționale`,
        continut: `Aceasta este întrebarea pe care mi-o pun cel mai frecvent clienții. Răspunsul meu onest, bazat pe 17 ani de consiliere imobiliară:

Cumpără acum dacă:
• Ai stabilitate financiară — job stabil și fond de urgență de minim 6 luni cheltuieli
• Rata lunară este sub 35% din venitul net al familiei
• Intenționezi să locuiești în apartament cel puțin 5 ani sau e o investiție pe termen lung
• Ai găsit proiectul care îți satisface criteriile — nu mai există „apartamentul perfect la prețul perfect de acum 2 ani"

Amână dacă:
• Nu ai avansul minim (15–20% + costuri notariale ~3% din valoare)
• Ești în schimbare de loc de muncă sau oraș în 12 luni
• Ai datorii cu dobânzi mari care consumă cash-flow disponibil
• Orizontul tău de detenție este sub 3 ani

Sfatul practic pe care l-am dat mereu: calculează costul total al chiriei pe 24 de luni față de costul achiziției. Dacă suma chiriilor pe 2 ani depășește 50–60% din avansul necesar, matematica îți spune să cumperi.

Am văzut zeci de oameni așteptând prăbușirea pieței din 2020, din 2022, din 2023, din 2024. Prăbușirea nu a venit pe segmentul apartamentelor noi din zone conectate. Au plătit chirii între timp și au cumpărat mai scump. Poate într-o zi piața se va corecta semnificativ — dar nimeni nu știe când, și nimeni nu poate recupera chiria plătită între timp.

Dacă vrei o analiză personalizată pe bugetul și situația ta, consultanții Neofort IMO oferă consiliere gratuită, fără angajamente. Sună la 0758 090 904.`,
      },
    ],
  },,

  'tva-apartamente-noi-2026': {
    titlu: `TVA la Apartamente Noi în 2026: Cât Plătești și Cum Eviți Surprizele Fiscale`,
    tag: 'Legislație', tagColor: '#7c3aed',
    data: '10 Aprilie 2026', dataISO: '2026-04-10', citire: '9 min',
    autor: 'igor-calutu',
    image: '/blog/tva-apartamente-noi-bucuresti-2026.avif',
    descriere: `TVA la apartamente noi în 2026: ce cote se aplică, cine mai poate beneficia de 9%, când se aplică 21% și cum calculezi prețul total real al achiziției. Date oficiale actualizate la zi.`,
    keywords: ['tva apartamente noi 2026', 'tva 9 procente locuinte 2026', 'tva 21 procente imobiliare', 'calcul tva apartament nou', 'tva locuinte conditii 2026', 'cumparare apartament tva'],
    hashtags: ['#TVAApartamente2026', '#LegislatieImobiliara', '#ApartamentNou', '#ApartamenteBucuresti', '#NeofortIMO'],
    cuprins: [
      { id: 'situatie-actuala', titlu: `Situația TVA în 2026 — rezumat` },
      { id: 'tva-21', titlu: `TVA 21% — regula generală` },
      { id: 'tva-9', titlu: `TVA 9% tranzitoriu — cine mai poate beneficia` },
      { id: 'conditii-9', titlu: `Condițiile cumulative pentru 9%` },
      { id: 'calcul-practic', titlu: `Calcul practic: cât costă mai mult` },
      { id: 'noua-casa', titlu: `Interacțiunea cu Noua Casă` },
      { id: 'sfaturi', titlu: `Ce faci dacă ești în proces de achiziție` },
    ],
    sectiuni: [
      {
        id: 'situatie-actuala',
        h2: `Situația TVA la apartamente noi în 2026 — ce s-a schimbat și de ce`,
        continut: `Dacă îți cumperi un apartament nou în 2026, TVA este probabil cel mai important aspect fiscal pe care trebuie să îl înțelegi înainte de a semna orice act. Schimbările din 2025 au modificat radical regulile și mulți cumpărători sunt surprinși de diferențele față de ce știau din 2023–2024.

Pe scurt: cota standard de TVA pentru locuințele noi este acum 21%, după ce Legea nr. 141/2025 a majorat-o de la 19% (la 1 august 2025) și a eliminat complet cota redusă de 5% aplicabilă anterior. Singura facilitate care mai există este o cotă tranzitorie de 9%, dar cu condiții foarte stricte pe care o parte mică din cumpărători le mai îndeplinesc în 2026.

Aceasta este schimbarea fiscală cu cel mai mare impact pe piața rezidențială din ultimul deceniu. Înțelegerea exactă a regulilor te poate salva de la plata a 10.000–20.000 EUR în plus față de ce ai anticipat.`,
      },
      {
        id: 'tva-21',
        h2: `TVA 21% — regula generală aplicabilă majorității achizițiilor din 2026`,
        continut: `Cota standard de TVA de 21% se aplică automat pentru toate situațiile care nu îndeplinesc condițiile tranzitorii pentru 9%. Concret, plătești 21% TVA dacă:

• Semnezi un antecontract sau contract de vânzare-cumpărare după 31 iulie 2025 (indiferent de prețul sau suprafața locuinței)
• Locuința are prețul net peste 600.000 lei (aproximativ 120.000 EUR) — chiar dacă ai semnat înainte de 31 iulie 2025
• Suprafața utilă depășește 120 mp — chiar dacă ai semnat înainte de 31 iulie 2025
• Cumperi ca persoană juridică (firmă), indiferent de orice altă condiție
• Ai mai beneficiat anterior de cota redusă de 5% sau 9% la altă achiziție — a doua locuință se taxează cu 21%

Exemple concrete cu TVA 21%:
• Apartament cu preț net 100.000 EUR → preț total: 121.000 EUR
• Apartament cu preț net 150.000 EUR → preț total: 181.500 EUR
• Apartament cu preț net 200.000 EUR → preț total: 242.000 EUR

Față de cota de 5% în vigoare până în 2023, un apartament de 150.000 EUR costă acum 24.000 EUR mai mult doar din TVA. Aceasta este realitatea pieței în 2026.`,
      },
      {
        id: 'tva-9',
        h2: `TVA 9% tranzitoriu — fereastra care se închide la 31 iulie 2026`,
        continut: `Prin Legea nr. 141/2025, Guvernul a introdus o perioadă de tranziție care permite aplicarea cotei de 9% TVA pentru o categorie restrânsă de tranzacții. Această facilitate expiră definitiv la 31 iulie 2026 și nu se va prelungi.

Cota de 9% se poate aplica dacă sunt îndeplinite simultan toate condițiile de mai jos — lipsa oricăreia duce automat la 21% TVA:

1. Contractul de vânzare-cumpărare final se semnează cel târziu la 31 iulie 2026 (inclusiv)
2. Locuința are suprafața utilă de maximum 120 mp (exclusiv anexele gospodărești: boxă, loc parcare, terasă)
3. Valoarea totală a locuinței, inclusiv terenul aferent, nu depășește 600.000 lei (aproximativ 120.000 EUR), exclusiv TVA
4. Cumpărătorul este persoană fizică (nu firmă)
5. Cumpărătorul nu a mai beneficiat de cota redusă de 5% sau 9% la altă achiziție după 1 ianuarie 2023 — verificat automat de notar în Registrul ANAF
6. Până la 31 iulie 2025 inclusiv a fost semnat un act juridic (antecontract sau promisiune de vânzare) și a fost achitat un avans de minimum 20% din valoarea netă a locuinței

Ultimul punct este crucial și elimină practic orice posibilitate nouă de acces la cota de 9%: dacă nu ai semnat și nu ai plătit avansul de 20% înainte de 1 august 2025, nu poți beneficia de facilitatea tranzitorie.`,
      },
      {
        id: 'conditii-9',
        h2: `Condițiile pentru TVA 9% — detalii și capcane frecvente`,
        continut: `Detaliile contează enorm. Iată aspectele mai puțin cunoscute care pot face diferența:

Rolul notarului: acesta are obligația legală de a consulta Registrul achizițiilor de locuințe cu cotă redusă de TVA înainte de autentificarea oricărui act. Dacă ai beneficiat anterior de cotă redusă, notarul refuză aplicarea cotei de 9% și aplică automat 21%. Nu există excepții.

Avansul de 20%: calculul se face pe valoarea netă (fără TVA). La un apartament de 400.000 lei net, avansul minim era de 80.000 lei. Dacă ai plătit mai puțin sau dacă plata nu e documentată corespunzător, condiția nu e îndeplinită.

Soții în regim de separare a bunurilor: conform interpretărilor ANAF, soții căsătoriți în regim de separare a bunurilor sunt tratați ca o singură entitate fiscală pentru această facilitate. Dacă unul dintre soți a beneficiat anterior de 5% sau 9% TVA, celălalt nu poate beneficia în mod independent.

Termenul de livrare: locuința trebuie să fie efectiv predată și contractul final semnat până la 31 iulie 2026. Dacă dezvoltatorul întârzie și livrarea se face după această dată, se aplică automat TVA standard de 21% — indiferent când a fost semnat antecontractul.

Dacă ești în această situație (antecontract semnat înainte de august 2025, livrare estimată aproape de iulie 2026), verifică urgent cu dezvoltatorul dacă termenul de predare poate fi respectat.`,
      },
      {
        id: 'calcul-practic',
        h2: `Calcul practic: cât mai mult costă un apartament la TVA 21% față de 9%`,
        continut: `Iată comparațiile pentru cele mai comune prețuri pe piața din București:

Apartament de 80.000 EUR net (2 camere, zonă accesibilă):
• TVA 9%: 7.200 EUR → preț total 87.200 EUR
• TVA 21%: 16.800 EUR → preț total 96.800 EUR
• Diferență: 9.600 EUR

Apartament de 110.000 EUR net (2 camere, zonă medie):
• TVA 9%: 9.900 EUR → preț total 119.900 EUR
• TVA 21%: 23.100 EUR → preț total 133.100 EUR
• Diferență: 13.200 EUR

Apartament de 150.000 EUR net (3 camere sau 2 camere premium):
• Peste plafonul de 600.000 lei (aprox. 120.000 EUR) → TVA 21% obligatoriu
• TVA 21%: 31.500 EUR → preț total 181.500 EUR
• Față de TVA 5% din 2023 pe același apartament: 24.000 EUR în plus

Important: toate prețurile afișate de Neofort IMO includ TVA. Nu există costuri fiscale ascunse pentru cumpărători. Prețul pe care îl vezi este prețul pe care îl plătești.`,
      },
      {
        id: 'noua-casa',
        h2: `Interacțiunea TVA 21% cu programul Noua Casă — ce trebuie să știi`,
        continut: `Programul Noua Casă continuă în 2026 cu un plafon de garantare de 500 milioane lei, aprobat prin Hotărâre de Guvern în mai 2026. Programul acoperă atât locuințe noi, cât și locuințe vechi, dar TVA 21% afectează direct atractivitatea pentru locuințele noi.

Plafonul de finanțare Noua Casă: pentru locuințe noi, creditul garantat acoperă maximum 66.500 EUR din prețul total (TVA inclus). La TVA 21%, un apartament cu prețul net de 55.000 EUR costă total 66.550 EUR — abia se încadrează în plafon. Practic, Noua Casă acoperă acum apartamente semnificativ mai mici sau mai periferice decât înainte de majorarea TVA.

Avansul: prin Noua Casă, avansul minim pentru locuințe noi sub 66.500 EUR total este de 5%. Pare avantajos, dar la TVA 21%, puțini apartamente noi din București se mai încadrează în acest plafon. Cele cu preț total sub 66.500 EUR există în zone periferice sau sunt garsoniere/studiouri.

Sfatul meu practic: dacă bugetul tău se situează sub 80.000–90.000 EUR total, Noua Casă rămâne o opțiune relevantă și merită analizată cu un consultant bancar. Dacă bugetul e peste acest prag, un credit ipotecar standard poate oferi condiții mai flexibile — mai ales dacă ai avans de 20%+.`,
      },
      {
        id: 'exemple-complete',
        h2: `Exemple complete de calcul TVA — 5 scenarii reale din piața din București`,
        continut: `Teoretic e ușor de înțeles, dar în practică oamenii au nevoie de exemple concrete. Iată 5 scenarii reale, cu calculul exact:

Scenariul 1 — Cumpărător nou, apartament 2 camere 55 mp, preț net 110.000 EUR, semnat în iunie 2026:
• Nu a mai cumpărat cu TVA redus → potențial eligibil 9% dacă are antecontract + 20% avans din iulie 2025
• Dacă NU are antecontract din iulie 2025: TVA 21% → preț total 133.100 EUR
• Dacă ARE antecontract + 20% avans din iulie 2025, sub 600.000 lei: TVA 9% → preț total 119.900 EUR
• Economia potențială: 13.200 EUR

Scenariul 2 — Cumpărător care a beneficiat de TVA 5% în 2023 la alt apartament, cumpără acum al doilea:
• A mai beneficiat de cotă redusă → TVA 21% obligatoriu, fără excepție
• Apartament 100.000 EUR net → preț total 121.000 EUR

Scenariul 3 — Cumpărător firmă (SRL), apartament 90.000 EUR net:
• Persoană juridică → TVA 21% obligatoriu
• Preț total: 108.900 EUR
• Nota: firma poate deduce TVA-ul dacă apartamentul e destinat activității economice (ex: cazare angajați, spații de lucru)

Scenariul 4 — Garsonieră 35 mp, preț net 65.000 EUR (sub 600.000 lei), semnată în iulie 2026 cu antecontract din mai 2025 și 20% avans plătit atunci:
• Suprafată sub 120 mp ✓, preț sub 600.000 lei ✓, persoană fizică ✓, antecontract + 20% avans până la 31.07.2025 ✓
• TVA 9% → preț total 70.850 EUR
• Față de TVA 21%: 70.850 EUR vs. 78.650 EUR → economie 7.800 EUR

Scenariul 5 — Apartament 3 camere 85 mp, preț net 180.000 EUR (depășește 600.000 lei = ~120.000 EUR):
• Depășește plafonul de 600.000 lei → TVA 21% indiferent de orice altă condiție
• Preț total: 217.800 EUR

Concluzie practică: singura situație în care mai poți beneficia de TVA 9% în 2026 este dacă ai semnat antecontract cu 20% avans înainte de 31 iulie 2025, locuința e sub 600.000 lei și sub 120 mp, ești persoană fizică și semnezi contractul final până la 31 iulie 2026. Orice altă situație → 21% TVA este inevitabil.`,
      },
      {
        id: 'sfaturi',
        h2: `Ce faci dacă ești în proces de achiziție — pași concreți`,
        continut: `Indiferent de stadiul în care ești, iată ce trebuie să verifici:

Dacă ai semnat antecontract înainte de 31 iulie 2025 și ai plătit 20% avans:
• Verifică că livrarea apartamentului este garantată până la 31 iulie 2026
• Obține o confirmare scrisă de la dezvoltator privind termenul de predare
• Dacă termenul e în pericol, discută cu un avocat opțiunile de protecție contractuală
• Notarul va verifica automat Registrul ANAF la semnarea contractului final

Dacă ești la început și cauți apartament acum în mai 2026:
• TVA 21% este inevitabil pentru orice achiziție nouă
• Calculează bugetul total cu TVA inclus de la bun început
• Nu compara prețuri de azi cu prețuri din 2023–2024 fără a ajusta pentru diferența de TVA
• Toate prețurile Neofort IMO sunt afișate cu TVA inclus — fără surprize la calcul final

Dacă nu ești sigur ce cotă TVA se aplică în cazul tău:
• Adresează-te unui notar public sau consultant fiscal — aceștia au acces la Registrul ANAF și pot da un răspuns cert
• Nu lua decizii pe baza declarațiilor informale ale agenților imobiliari
• Neofort IMO oferă clarificări fiscale complete gratuit pentru proiectele pe care le comercializează — sună la 0758 090 904

TVA este o parte importantă a costului total, dar nu singurul factor în decizia de cumpărare. Cu prețuri corecte, locație bună și un dezvoltator de încredere cu 17 ani de livrări în spate, investiția rămâne solidă pe termen lung chiar și la TVA 21%.`,
      },
    ],
  },,

  'titan-pallady-cea-mai-cautata-zona': {
    titlu: `Titan–Pallady: De Ce a Devenit Cea Mai Căutată Zonă Rezidențială din București`,
    tag: 'Zone', tagColor: '#0891b2',
    data: '25 Aprilie 2026', dataISO: '2026-04-25', citire: '8 min',
    autor: 'raluca-nistor',
    image: '/blog/titan-pallady-cea-mai-cautata-zona-bucuresti.avif',
    descriere: `De ce Titan–Pallady a ajuns zona cu cel mai mare ritm de creștere din București? Metrou M2, IKEA, parcuri, prețuri accesibile și cerere din diasporă — analiza completă a celei mai dinamice zone rezidențiale a Capitalei.`,
    keywords: ['titan pallady apartamente noi', 'zona titan pallady bucuresti', 'apartamente noi sector 3', 'metrou titan pallady', 'investitie imobiliara titan', 'cea mai buna zona bucuresti apartament'],
    hashtags: ['#TitanPallady', '#ApartamenteSector3', '#ZonaRezidentiala', '#ApartamenteBucuresti', '#NeofortIMO'],
    cuprins: [
      { id: 'de-ce', titlu: `De ce Titan–Pallady?` },
      { id: 'metrou', titlu: `Metroul M2 — factorul decisiv` },
      { id: 'ikea', titlu: `IKEA Pallady și ecosistemul comercial` },
      { id: 'preturi', titlu: `Evoluția prețurilor 2020–2026` },
      { id: 'diaspora', titlu: `Cumpărătorii din diasporă` },
      { id: 'proiecte', titlu: `Ce proiecte active are Neofort IMO în zonă` },
      { id: 'concluzie', titlu: `Merită să cumperi în Titan–Pallady?` },
    ],
    sectiuni: [
      {
        id: 'de-ce',
        h2: `De ce Titan–Pallady a devenit zona cea mai căutată din București`,
        continut: `Dacă urmărești piața imobiliară din București în ultimii 3–4 ani, ai observat că o zonă revine mereu în top: Titan–Pallady, în Sectorul 3. Aceasta nu este marketing imobiliar — datele ANCPI confirmă că zona a înregistrat cel mai mare ritm de tranzacții și unele dintre cele mai mari creșteri de preț din Capitală.

Dar de ce? Nu este vorba de un singur factor, ci de o combinație rară de elemente care, întâmplător sau nu, s-au aliniat în același timp: extinderea metrului, deschiderea IKEA, regenerarea parcului IOR, creșterea puterii de cumpărare și un stoc de terenuri disponibile suficient de mare pentru a absorbi cererea.

Lucrez în Neofort IMO pe zona Titan–Pallady de 10 ani. Am văzut transformarea graduală a zonei dintr-o periferie cu reputație discutabilă într-una dintre destinațiile rezidențiale cele mai căutate din București. Transformarea este reală și sustenabilă — nu o bulă speculativă.`,
      },
      {
        id: 'metrou',
        h2: `Metroul M2 — factorul care a transformat accesibilitatea zonei`,
        continut: `Dacă trebuie să numesc un singur factor care a schimbat percepția despre Titan–Pallady, acela este metroul. Stația Nicolae Teclu pe linia M2 conectează zona direct cu centrul Capitalei în 15–20 de minute, fără depindere de traficul de suprafață.

Distanțele de la principalele ansambluri Neofort IMO din zonă:
• Neofort 84 (Titan–Pallady): 5 minute mers pe jos la Metrou Anghel Saligny
• Neofort 56 (Pallady–Titan): 6 minute la Metrou Nicolae Teclu
• Neofort 44 (Titan–Pallady): 7 minute la Metrou Nicolae Teclu
• Neofort 28 (Titan–Pallady): 6 minute la Metrou Anghel Saligny
• Neofort 83 (Titan–Pallady): 8 minute la Metrou Anghel Saligny

Accesul la metrou nu este un lux în București — este o necesitate. Estimările arată că un apartament cu acces la metrou sub 10 minute pe jos se vinde cu 12–18% mai scump decât unul comparabil la 20–30 minute distanță. Aceasta este valoare obiectivă, nu subiectivă.

Pe lângă M2, zona beneficiază de conexiuni directe la IKEA Pallady prin mai multe linii de autobuz și tramvai, la Park Lake prin tramvai, și la Centrul Civic prin șoseaua Mihai Bravu.`,
      },
      {
        id: 'ikea',
        h2: `IKEA Pallady și efectul de ecosistem comercial`,
        continut: `Deschiderea IKEA Pallady în 2019 a fost mai mult decât un magazin nou — a fost un semnal că zona a ajuns pe harta retailului de top din București. IKEA nu deschide magazine în zone fără potențial. Studiile lor de piață sunt notorioase pentru precizie.

Efectul direct a fost vizibil imediat: în 18 luni de la deschidere, prețurile apartamentelor din raza de 2 km au crescut cu 8–11%, depășind media orașului. Explicația este simplă: proximitatea față de un centru comercial mare crește calitatea vieții și reduce dependența de deplasări lungi.

Dar efectul mai important este cel de ecosistem. IKEA a atras în jur: un hypermarket Carrefour, magazine de bricolaj, restaurante, bănci, farmacii. Zona Pallady are acum o densitate comercială comparabilă cu zonele mature din Sectorul 1 sau 2. Pentru familiile tinere — care sunt principalii cumpărători de apartamente noi — aceasta este o diferență majoră față de periferiile cu un singur magazin alimentar.

Parcul IOR completează imaginea: 110 hectare de spațiu verde, lac, piste de biciclete, zone de sport — la 10–15 minute pe jos din majoritatea ansamblurilor Neofort IMO din zonă.`,
      },
      {
        id: 'preturi',
        h2: `Evoluția prețurilor în Titan–Pallady: 2020–2026`,
        continut: `Datele concrete vorbesc de la sine. Prețul mediu per metru pătrat util pentru apartamente noi în zona Titan–Pallady:

• 2020: 1.050 EUR/mp
• 2021: 1.180 EUR/mp (+12,4%)
• 2022: 1.380 EUR/mp (+16,9%)
• 2023: 1.520 EUR/mp (+10,1%)
• 2024: 1.650 EUR/mp (+8,6%)
• 2025: 1.940 EUR/mp (+17,6% — cel mai bun an din ultimii 6)
• T1 2026: ~2.050 EUR/mp

Creștere totală 2020–2026: +95%. Adică un apartament cumpărat în 2020 cu 100.000 EUR valorează astăzi aproximativ 195.000 EUR. Acesta este randamentul unui proprietar care a stat ferm în decizie și nu a vândut.

Comparativ, prețul mediu al apartamentelor noi din București per total a crescut cu aproximativ 65–70% în același interval. Titan–Pallady a depășit media orașului cu 25–30 puncte procentuale în 6 ani — o performanță remarcabilă pentru o zonă care era privită ca „prea periferică" în 2019.

Cauze principale ale supraperformanței: metroul, IKEA, parcul IOR, și un stoc de teren disponibil care a permis livrarea de proiecte noi la prețuri mai accesibile decât zonele centrale saturate.`,
      },
      {
        id: 'diaspora',
        h2: `Cererea din diasporă — un factor subestimat care susține piața`,
        continut: `Un aspect mai puțin discutat în analizele imobiliare despre Titan–Pallady este cererea din diaspora românească. Din experiența Neofort IMO cu clienți din afara țării, zona Titan–Pallady este, alături de Militari, Gorjului și Colentina, destinația preferată a românilor repatriați din Turcia și Republica Moldova care cumpără primul apartament în București.

Explicația este legată de prețuri și zonă: bugetele de 100.000–150.000 EUR permit achiziția de apartamente de 2–3 camere decente în Titan–Pallady, în timp ce în zonele centrale sau de nord aceleași bugete abia ajung pentru un studio sau garsonieră. Familiile din diaspora Turcia–R.Moldova caută spațiu, nu adresă de prestigiu.

Profilul tipic al cumpărătorului din această diasporă: familie cu 1–2 copii, buget 100.000–160.000 EUR, prioritizează: spațiu (minim 2 camere), acces la metrou, școli bune în apropiere, parcare. Titan–Pallady bifează toate criteriile.

Cererea diasporei nu este un factor minor. În anumite perioade ale anului (în special vara și de Crăciun, când diaspora vine acasă), vânzările Neofort IMO în zona Titan–Pallady cresc cu 40–60% față de media trimestrelor calme.`,
      },
      {
        id: 'proiecte',
        h2: `Proiectele active Neofort IMO în Titan–Pallady`,
        continut: `Neofort IMO are în prezent 6 proiecte active sau recent finalizate în zona Titan–Pallady, ceea ce ne poziționează ca cel mai activ dezvoltator din zonă:

Neofort 84 Titan–Pallady — în construcție, livrare estimată 2027. Apartamente 2 și 3 camere, prețuri de la 162.000 EUR + TVA. Rezervare cu 1.000 EUR. Distanță metrou: 5 minute.

Neofort 83 Titan–Pallady — în construcție, apartamente 2 camere. Zonă liniștită, proximitate parc.

Neofort 56 Pallady–Titan — finalizat, apartamente disponibile imediat. 2 camere de la 119.000 EUR + TVA.

Neofort 44 Titan–Pallady — în construcție, apartamente 2 și 3 camere.

Neofort 28 Titan–Pallady — în construcție, 2 camere.

Toate proiectele se predau la cheie, includ parcare disponibilă și beneficiază de consultanță juridică și bancară gratuită.

Vizitează pagina dedicată zonei Titan–Pallady pentru detalii complete și disponibilitate actualizată.`,
      },
      {
        id: 'infrastructura-viitor',
        h2: `Infrastructura în curs de dezvoltare și proiectele care vor transforma zona în continuare`,
        continut: `Titan–Pallady nu a ajuns la capătul potențialului de dezvoltare. Iată proiectele care vor continua să valorifice zona în următorii 3–7 ani:

Infrastructura de transport:
Primăria Sectorului 3 și PMB au în plan extinderea unor linii de tramvai care să conecteze mai bine zona Pallady cu centrul și cu zona Dristor. Detaliile tehnice sunt în faza de studiu, dar intenția politică este clară — Sectorul 3 este cel mai dens populat sector din București și presiunea pentru transport suplimentar este constantă.

Parcul IOR — extindere și reabilitare:
Parcul IOR (110 hectare, al doilea ca mărime din București după Herăstrău) a primit finanțare europeană pentru reabilitare completă: infrastructură de agrement modernizată, piste de biciclete extinse, zone de fitness outdoor, zone de joacă premium. Lucrările sunt în desfășurare și vor fi finalizate în 2026–2027.

Amenajarea Lacului Titan:
Lacul Titan, aflat în centrul parcului, beneficiază de un proiect de reabilitare ecologică și amenajare pentru agrement nautic (caiac, pedalote). Similar cu ce s-a făcut la Lacul Herăstrău în Sectorul 1, aceasta va transforma zona într-un punct de atracție suplimentar.

Centrul comercial adiacent IKEA:
În zona Pallady există terenuri neocupate adiacente IKEA care fac obiectul unor proiecte de dezvoltare comercială. Un mall sau complex mixt în zonă ar amplifica și mai mult atractivitatea pentru cumpărătorii de apartamente.

Regenerarea urbană pe Strada Nicolae Teclu și axele principale:
Primăria Sectorului 3 a demarat mai multe proiecte de modernizare a spațiului public pe axele principale din zonă: trotuare largi, piste cicliști, mobilier urban, iluminat LED. Aceasta este o tendință care ridică standardul vizual și calitatea vieții, cu efect direct asupra percepției și prețurilor.

Privind 5 ani înainte, Titan–Pallady va fi o zonă semnificativ mai bine echipată decât azi. Pentru cumpărătorii care achiziționează acum, aceasta înseamnă că activele lor vor beneficia nu doar de inflația generală, ci și de investițiile publice programate.`,
      },
      {
        id: 'concluzie',
        h2: `Merită să cumperi un apartament în Titan–Pallady în 2026?`,
        continut: `Răspunsul meu, după 10 ani de activitate exclusivă în această zonă: da, dar cu ochii deschiși la realitățile din 2026.

Ce este bun: prețurile rămân cu 20–30% sub zonele centrale comparabile ca accesibilitate, metroul rezolvă problema deplasărilor, ecosistemul comercial este matur, iar parcul IOR oferă calitate a vieții pe care puține zone din București o egalează.

Ce trebuie calculat: TVA 21% pentru apartamente noi înseamnă că un apartament afișat la 150.000 EUR net costă 181.500 EUR total. Calculează corect bugetul.

Ce trebuie să știi înainte: piața din Titan–Pallady este competitivă — apartamentele bune se vând rapid. Nu am văzut niciodată în 10 ani un proiect Neofort IMO să rămână nevândut la finalizare. Dacă găsești ceva care ți se potrivește, nu amâna cu săptămâni.

Suntem disponibili la 0758 090 904 pentru vizite la proiecte, clarificări de prețuri și consultanță de finanțare gratuită.

Un aspect adesea ignorat: Titan–Pallady nu este o zonă omogenă. Există micro-zone cu prețuri și calitate diferite. Strada Nicolae Teclu și zona dintre Metrou și IOR reprezintă nucleul premium al zonei — prețuri mai mari, acces pietonal la toate facilitățile. Zona mai îndepărtată de metrou, spre granița cu Ilfov sau spre Pallady vest, are prețuri cu 10–15% mai mici și accesibilitate ușor redusă.

Sfatul meu: dacă bugetul permite, cumpărați în raza de 10 minute mers pe jos de la Metrou Teclu sau Anghel Saligny. Diferența de preț față de apartamente mai periferice se recuperează în 3–4 ani din aprecierea suplimentară a zonei core.

Echipa Neofort IMO cunoaște fiecare stradă din Titan–Pallady în detaliu. Sună la 0758 090 904 și te ajutăm să alegi locul exact potrivit pentru bugetul tău.`,
      },
    ],
  },,

  'noua-casa-2026-ghid-complet': {
    titlu: `Programul Noua Casă 2026: Ghid Complet — Condiții, Bănci, Avans și Ce Apartamente Se Califică`,
    tag: 'Finanțare', tagColor: '#0369a1',
    data: '28 Aprilie 2026', dataISO: '2026-04-28', citire: '10 min',
    autor: 'adriana-veselu',
    image: '/blog/noua-casa-2026-ghid-complet.avif',
    descriere: `Ghid complet Noua Casă 2026: plafon de 500 milioane lei aprobat prin HG, condiții de eligibilitate, avans minim, bănci partenere, ce apartamente se califică și cum interacționează cu TVA 21%.`,
    keywords: ['noua casa 2026', 'program noua casa conditii', 'credit ipotecar garantat stat 2026', 'prima casa 2026', 'avans noua casa', 'noua casa bucuresti apartament nou'],
    hashtags: ['#NouaCasa2026', '#CreditIpotecar', '#AchizitieApartament', '#ApartamenteBucuresti', '#NeofortIMO'],
    cuprins: [
      { id: 'ce-este', titlu: `Ce este Noua Casă în 2026` },
      { id: 'plafon', titlu: `Plafonul de 500 milioane lei — ce înseamnă` },
      { id: 'conditii', titlu: `Condițiile de eligibilitate` },
      { id: 'avans', titlu: `Avansul și structura creditului` },
      { id: 'banci', titlu: `Băncile partenere și dobânzile` },
      { id: 'tva', titlu: `Noua Casă și TVA 21% — impactul real` },
      { id: 'sfaturi', titlu: `Sfaturi practice pentru aplicanți` },
    ],
    sectiuni: [
      {
        id: 'ce-este',
        h2: `Ce este programul Noua Casă și de ce continuă în 2026`,
        continut: `Programul Noua Casă este cel mai longeviv instrument de politică publică din România în domeniul locuințelor. Lansat în 2009 sub numele Prima Casă, schimbat în Noua Casă în 2020, programul a acordat până la sfârșitul lui februarie 2026 peste 334.000 de garanții și promisiuni de garantare, în valoare totală de aproximativ 31,72 miliarde lei — cifre care arată că zeci de mii de familii și-au cumpărat prima locuință cu ajutorul acestui instrument.

În mai 2026, Guvernul a adoptat Hotărârea de Guvern care prelungește programul cu un plafon de garantare de 500 milioane lei pentru 2026. Continuarea nu era garantată — în unii ani, plafonul a fost epuizat rapid și programul a fost suspendat temporar. Aprobarea confirmă că programul rămâne activ și funcțional.

Mecanismul este simplu: statul garantează 50% din creditul ipotecar acordat de bancă. Aceasta permite băncii să acorde credite cu avans mai mic și condiții mai accesibile decât la un credit standard, pentru că riscul de neplată este parțial acoperit de garanția de stat.`,
      },
      {
        id: 'plafon',
        h2: `Plafonul de 500 milioane lei — ce înseamnă practic pentru cumpărători`,
        continut: `Plafonul de 500 milioane lei reprezintă valoarea totală a garanțiilor de stat care pot fi acordate în 2026. Nu înseamnă că programul are disponibil 500 milioane pentru credite — garanțiile acoperă 50% din fiecare credit, deci plafonul permite credite totale de aproximativ 1 miliard de lei.

Un credit Noua Casă tipic pentru o locuință nouă de 66.500 EUR (plafonul maxim) beneficiază de o garanție de stat de aproximativ 33.250 EUR. Aceasta permite băncii să aprobe creditul cu avans de 5% în loc de 15–20% necesar la credit standard.

Plafonul se epuizează în ordinea solicitărilor aprobate. Din 2025, cererea a fost semnificativ mai mică față de 2021–2022 (când plafonul se epuiza în câteva luni), parțial din cauza TVA 21% care a redus numărul locuințelor noi eligibile. Aceasta înseamnă că în 2026, accesul la program este mai ușor — nu există riscul imediat de epuizare a plafonului.`,
      },
      {
        id: 'conditii',
        h2: `Condițiile de eligibilitate Noua Casă 2026 — checklist complet`,
        continut: `Pentru a aplica la Noua Casă trebuie să îndeplinești simultan:

Condiții privind cumpărătorul:
• Persoană fizică, rezidentă în România
• Nu deții în proprietate nicio altă locuință (sau deții maximum una, cu suprafață utilă sub 50 mp — condiție aplicabilă în unele variante ale programului)
• Nu ai beneficiat anterior de garanție Noua Casă sau Prima Casă care mai este activă
• Ai capacitate de rambursare demonstrabilă — rata lunară totală trebuie să fie sub 40% din venitul net al familiei

Condiții privind locuința achiziționate:
• Valoarea totală (inclusiv TVA) nu depășește 119.000 EUR pentru locuințe noi sau 93.500 EUR pentru locuințe vechi
• Suprafața utilă este de maximum 120 mp
• Locuința este situată în România
• Trebuie să devină locuința principală a cumpărătorului (nu proprietate de investiție)

Condiții privind creditul:
• Creditul se acordă în lei (RON), nu în EUR
• Durata maximă: 30 de ani
• Dobânda: stabilită de bancă, dar de regulă mai mică față de creditele standard, datorită garanției de stat

Un aspect important: băncile pot avea condiții suplimentare față de minimul legal. Unele solicită un istoric de credit curat pe 5 ani, altele cer asigurare de viață. Verificați cu fiecare bancă parteneră.`,
      },
      {
        id: 'avans',
        h2: `Avansul la Noua Casă — reguli și calcule concrete`,
        continut: `Unul dintre principalele avantaje ale programului este avansul mai mic față de creditele standard:

• Locuință nouă cu valoare totală sub 66.500 EUR: avans minim 5%
• Locuință nouă cu valoare totală între 66.500 EUR și 119.000 EUR: avans minim 15%
• Locuință veche: avans minim 5% până la 52.500 EUR, 15% până la 93.500 EUR

Exemple concrete:
Apartament nou, preț total cu TVA 66.000 EUR → avans minim 5%: 3.300 EUR
Apartament nou, preț total cu TVA 100.000 EUR → avans minim 15%: 15.000 EUR
Apartament nou, preț total cu TVA 119.000 EUR → avans minim 15%: 17.850 EUR

La aceste sume se adaugă întotdeauna costurile tranzacției: taxă notarială (aproximativ 3.000–5.000 lei), taxă intabulare (1.500–2.500 lei), asigurare PAD obligatorie (~200 lei/an). Calculează și aceste costuri în bugetul de avans.

Notă practică: avansul se plătește de regulă la semnarea antecontractului sau la momentul aprobării creditului. Fondurile trebuie să fie disponibile în cont și demonstrate către bancă înainte de aprobare.`,
      },
      {
        id: 'banci',
        h2: `Băncile partenere și dobânzile în 2026`,
        continut: `Programul Noua Casă este derulat prin băncile comerciale autorizate de FNGCIMM (Fondul Național de Garantare a Creditelor pentru IMM-uri). În 2026, principalele bănci partenere includ: BCR, BRD, Raiffeisen Bank, ING Bank, UniCredit, Transilvania, CEC Bank, Banca Transilvania și altele.

Fiecare bancă stabilește propria dobândă și propriile condiții de aprobare în cadrul limitelor programului. De aceea, compararea ofertelor de la minimum 3 bănci înainte de decizie este esențială.

Situația dobânzilor în 2026:
Creditele Noua Casă sunt acordate în lei, cu dobânzi legate de ROBOR sau dobânda cheie BNR. În T1 2026, dobânzile efective (DAE) la creditele Noua Casă variază între 7,5% și 9,5% anual, în funcție de bancă, profil client și durata creditului.

Față de 2021–2022 (când dobânzile erau 3–4%), costul finanțării s-a dublat. Aceasta înseamnă că pentru un credit de 250.000 lei pe 30 de ani, plata lunară este de aproximativ 1.950–2.200 lei față de 1.100–1.250 lei în 2021. Calculați atent accesibilitatea înainte de angajament.

Recomandarea noastră: mergeți la bancă cu un preapproval înainte de a vizita apartamente. Cunoașteți exact suma maximă la care vă califică venitul și nu pierdeți timp vizualizând proprietăți pe care nu le puteți achiziționa.`,
      },
      {
        id: 'tva',
        h2: `Noua Casă și TVA 21% — cum interacționează în 2026`,
        continut: `Aceasta este cea mai importantă problemă practică a programului Noua Casă în 2026: TVA 21% a redus semnificativ numărul apartamentelor noi eligibile.

Plafonul Noua Casă pentru locuințe noi este 119.000 EUR total (cu TVA inclus). La TVA 21%, aceasta înseamnă că locuința trebuie să aibă prețul net sub 98.347 EUR. Cu un preț mediu al apartamentelor noi în București de 2.050 EUR/mp, aceasta permite maximum ~48 mp suprafață utilă.

Practic: Noua Casă acoperă confortabil garsoniere și studiouri în zone centrale și apartamente mici de 2 camere în zone mai periferice. Apartamentele de 2 camere de 55–60 mp în Titan–Pallady, Militari sau Moșilor depășesc de regulă plafonul.

Există o excepție importantă: pentru cumpărătorii care se califică pentru TVA 9% tranzitoriu (au semnat antecontract cu 20% avans înainte de 31 iulie 2025), plafonul devine efectiv mai generos — 119.000 EUR total include TVA 9%, nu 21%, deci acoperă locuințe de până la ~109.000 EUR net.

Sfatul meu: dacă bugetul total este sub 100.000 EUR, analizați serios Noua Casă. Dacă bugetul e între 100.000 și 150.000 EUR, comparați Noua Casă cu un credit standard de la bancă — uneori creditul standard cu avans de 20% oferă condiții mai bune și flexibilitate mai mare. Deasupra de 150.000 EUR, Noua Casă nu mai este relevantă.`,
      },
      {
        id: 'pasi-aplicatie',
        h2: `Pașii exacți pentru a aplica la Noua Casă 2026 — de la zero la aprobare`,
        continut: `Procesul de aplicare la Noua Casă implică mai mulți pași care trebuie parcurși în ordine corectă. O greșeală de secvențiere poate întârzia aprobarea cu săptămâni:

Pasul 1 — Verificarea eligibilității (1–2 zile)
Consultați ONRC sau Registrul Cadastral să confirmați că nu aveți proprietăți înregistrate pe numele dumneavoastră. De asemenea, verificați cu banca că nu aveți o garanție Noua Casă / Prima Casă activă din trecut.

Pasul 2 — Pregătirea documentelor de venituri (3–7 zile)
Adunați: adeverință de salariu sau decizie de impunere ANAF, fluturaș de salariu pe ultimele 3–6 luni, extras de cont pe 3–6 luni (să demonstreze capacitatea de economisire), BI/CI valabil.

Pasul 3 — Evaluarea capacității de rambursare la bancă (1 zi)
Mergeți la 2–3 bănci partenere Noua Casă cu documentele de venituri și cereți un calcul de eligibilitate. Vă vor spune exact suma maximă pentru care vă califică veniturile. Alegeți banca cu cel mai bun DAE și cele mai bune condiții de flexibilitate.

Pasul 4 — Identificarea proprietății și negocierea (1–4 săptămâni)
Cu suma aprobată în minte, identificați apartamentul. Verificați că se încadrează în plafonul Noua Casă: preț total (TVA inclus) sub 119.000 EUR pentru locuință nouă.

Pasul 5 — Semnarea antecontractului și depunerea dosarului la bancă (2–3 zile)
Semnați antecontractul cu dezvoltatorul. Depuneți dosarul complet la bancă: antecontract, documente identitate, documente venituri, extras CF al proprietății.

Pasul 6 — Evaluarea imobilului de către evaluatorul băncii (3–7 zile)
Banca trimite un evaluator autorizat să verifice și să evalueze apartamentul. Costul evaluării (300–600 lei) este suportat de obicei de solicitant.

Pasul 7 — Aprobarea creditului (7–14 zile)
Banca analizează dosarul și emite aprobarea (sau cererea de documente suplimentare). În cazul Noua Casă, FNGCIMM trebuie să confirme garanția de stat — adaugă 3–5 zile suplimentare față de un credit standard.

Pasul 8 — Semnarea contractului de credit și a contractului de vânzare la notar (1 zi)
Se semnează simultan contractul de credit ipotecar la bancă și contractul de vânzare-cumpărare la notar. Fondurile sunt virate direct de bancă către vânzător.

Durata totală realistă: 6–10 săptămâni de la primul contact cu banca până la semnarea finală. Planificați în consecință și nu dați termene imposibile vânzătorului.`,
      },
      {
        id: 'sfaturi',
        h2: `Sfaturi practice pentru cei care vor să aplice la Noua Casă în 2026`,
        continut: `Dacă Noua Casă este varianta ta, iată pașii optimi:

1. Verifică eligibilitatea — înainte de orice altceva, confirmă că nu deții altă proprietate și că nu ai beneficiat anterior de garanție activă. Această verificare o poate face orice bancă parteneră rapid.

2. Calculează rata maximă acceptabilă — rata lunară nu trebuie să depășească 40% din venitul net al familiei (acesta este pragul standard al băncilor, nu legal, dar respectat în aproape toate cazurile). Dacă venitul net e 5.000 lei, rata maximă e 2.000 lei.

3. Obține preapproval de la minimum 2–3 bănci — nu toate băncile au același apetit de risc sau aceleași criterii. Preapproval-ul este gratuit și te informează exact cu ce buget intri la negociere.

4. Caută apartamentul în intervalul potrivit — după ce știi suma maximă aprobată, caută proprietăți cu 10–15% sub plafon. Lasă marjă pentru negociere, costuri de tranzacție și mobilare.

5. Verifică cu Neofort IMO — consultanții noștri știu exact care dintre proiectele active se califică pentru Noua Casă și pot coordona direct cu băncile partenere. Serviciu gratuit, fără comision. Sună la 0758 090 904.`,
      },
    ],
  },,

  'cumparare-apartament-din-diaspora': {
    titlu: `Cumperi Apartament în București din Diasporă: Ghid Complet Pas cu Pas Fără să Vii în Țară`,
    tag: 'Ghid', tagColor: '#2d7a3a',
    data: '1 Mai 2026', dataISO: '2026-05-01', citire: '12 min',
    autor: 'svetlana-calutu',
    image: '/blog/cumparare-apartament-diaspora-ghid.avif',
    descriere: `Ghid complet pentru românii din diasporă care vor să cumpere apartament în București fără să vină fizic în țară: procuri notariale, transfer valută, alegerea zonei, riscuri și experiența Neofort IMO cu clienți din Germania, Austria, Franța, Israel, Grecia, Turcia și R. Moldova.`,
    keywords: ['cumparare apartament diaspora bucuresti', 'apartament nou bucuresti din strainatate', 'procura notariala cumparare apartament', 'romani diaspora imobiliare bucuresti', 'investitie imobiliara bucuresti din germania', 'apartament bucuresti fara sa vii in tara'],
    hashtags: ['#DiasporaRomana', '#ApartamentBucuresti', '#CumparareOnline', '#InvestitieImobiliara', '#NeofortIMO'],
    cuprins: [
      { id: 'diaspora-neofort', titlu: `Cumpărătorii din diasporă la Neofort IMO` },
      { id: 'zone-preferinte', titlu: `Ce zone preferă diaspora și de ce` },
      { id: 'procesul', titlu: `Cum funcționează procesul de achiziție` },
      { id: 'procura', titlu: `Procura notarială — instrumentul esențial` },
      { id: 'finantare', titlu: `Finanțarea: cash vs. credit din România` },
      { id: 'transfer-valuta', titlu: `Transferul de valută — cum faci corect` },
      { id: 'riscuri', titlu: `Riscuri specifice și cum le eviți` },
      { id: 'sfaturi', titlu: `Sfaturi din 21 de ani de experiență` },
    ],
    sectiuni: [
      {
        id: 'diaspora-neofort',
        h2: `Cumpărătorii din diasporă la Neofort IMO — date din teren`,
        continut: `Lucrez în Neofort IMO de 21 de ani și pot spune cu certitudine că diaspora românească reprezintă una dintre cele mai importante și constante surse de clienți. Nu vorbesc de câteva cazuri izolate — în unele trimestre, românii din afara țării reprezintă 30–40% din tranzacțiile noastre finalizate.

De-a lungul timpului am lucrat cu cumpărători din Germania, Austria, Elveția, Israel, Franța, Grecia, Turcia și Republica Moldova, fiecare cu particularitățile și preferințele lor. Unii au cumpărat fără a veni fizic în România nici măcar o singură dată — totul prin procură notarială și comunicare la distanță. Alții au venit o singură dată, au vizitat 2–3 apartamente și au semnat.

Dacă ești în diasporă și vrei să cumperi un apartament în București, nu ești în fața unui obstacol insurmontabil. Este mai simplu decât crezi dacă ai un partener de încredere pe teren.`,
      },
      {
        id: 'zone-preferinte',
        h2: `Ce zone preferă cumpărătorii din diasporă și de ce`,
        continut: `Din experiența directă cu sute de clienți din diasporă, am observat tipare clare de preferință care diferă semnificativ în funcție de țara de reședință:

Românii din Germania, Austria, Elveția, Franța și Grecia:
Preferința puternică pentru zonele centrale și semicentrale din București. Rareori ies din „inelul central" — Floreasca, Dorobanți, Aviației, Moșilor-Eminescu, Iancului, Tineretului. Bugetele sunt de regulă mai mari (150.000–400.000 EUR), iar criteriul principal este calitatea adresei și accesul pietonal la servicii. Explicația: în orașele occidentale trăiesc în zone dense, bine conectate, cu acces pietonal la tot. Vor același lucru la București.

Excepție notabilă: zona de nord (Floreasca, Aviației, Băneasa) este preferată de mulți din această categorie, chiar dacă tehnic e în afara inelului central, datorită imaginii premium și a proximității față de aeroport.

Românii din Turcia și Republica Moldova:
Preferința clară pentru zone imediat după inelul central sau chiar periferice: Titan-Pallady, Militari, Gorjului, Colentina, Ștefan cel Mare. Bugetele sunt de regulă 80.000–160.000 EUR, iar prioritățile sunt: suprafață utilă mare (minimum 2 camere, preferabil 3), parcare inclusă, accesibilitate. Nu le este teamă de distanță față de centru dacă există metrou.

Explicația: vin din medii imobiliare cu prețuri și mai mari (Istanbul, Chișinău central), unde spațiul se cumpără mai scump. Preferă să primească mai mulți mp pentru bugetul disponibil, chiar dacă zona e mai periferică.

Românii din Israel:
Profil variat, dar cu o tendință spre investiție. Caută apartamente cu randament bun la închiriere. Zona Titan–Pallady și Piața Muncii apar frecvent — randamentele sunt mai bune decât în zonele centrale. Unii cumpără 2–3 apartamente simultan.`,
      },
      {
        id: 'procesul',
        h2: `Cum funcționează procesul de achiziție de la distanță — etape concrete`,
        continut: `Procesul de cumpărare din diasporă urmează exact aceleași etape ca o tranzacție locală, cu ajustări pentru distanță:

Etapa 1: Identificarea apartamentului și negocierea (online)
Comunicăm prin WhatsApp, email sau video call. Trimitem fotografii detaliate, video-uri walkthrough, documentație tehnică. Discutăm prețul, condițiile de plată, termenul de predare. Aceasta durează de regulă 1–4 săptămâni.

Etapa 2: Rezervarea (online + transfer)
Plata rezervării se face prin transfer bancar internațional. Confirmarea se face în 24–48 de ore. Suma de rezervare este de regulă 1.000–2.000 EUR și este restituibilă dacă tranzacția nu se finalizează din vina noastră.

Etapa 3: Pregătirea documentelor (locală)
Neofort IMO pregătește proiectul de antecontract și îl trimite pentru revizuire. Recomandăm consultarea unui avocat local pentru verificare (cost aproximativ 500–1.500 lei pentru revizuire antecontract). Dacă nu vii în România pentru semnare, este necesară procura notarială.

Etapa 4: Semnarea antecontractului (notarial sau prin procură)
Dacă ești prezent în România: te duci la orice notar public cu actul de identitate. Dacă nu ești prezent: acționezi prin procura notarială (detalii la capitolul următor).

Etapa 5: Plata tranșelor de avans
Conform graficului din antecontract, de regulă 20–45% din prețul total. Transfer bancar internațional.

Etapa 6: Predarea apartamentului și semnarea contractului final
Momentul cel mai important. Recomandăm puternic prezența fizică la predare sau delegarea unui reprezentant de încredere cu procură specială care include dreptul de reclamație la vicii.`,
      },
      {
        id: 'procura',
        h2: `Procura notarială — instrumentul juridic esențial pentru achiziția la distanță`,
        continut: `Procura notarială este documentul care te permite să cumperi un apartament fără să fii fizic prezent în România. Este un instrument legal solid, folosit frecvent și fără probleme — dar cu câteva detalii importante de respectat.

Tipuri de procuri folosite în tranzacții imobiliare:

Procura generală: acordă mandatarului (persoana care acționează în numele tău) drepturi largi de a încheia orice acte juridice. Nu o recomand pentru tranzacții imobiliare — este prea permisivă și poate crea vulnerabilități.

Procura specială pentru achiziție imobiliară: limitată la un apartament specific, cu prețul stabilit, cu dreptul de semnare a antecontractului și contractului final, cu dreptul de a achita suma convenită. Aceasta este varianta corectă.

Cum obții procura din afara țării:

Varianta 1 — La ambasada sau consulatul României: orice consulat român poate autentifica o procură notarială. Costul variază între 30–100 EUR în funcție de țară. Programul la consulat poate fi de câteva săptămâni, deci planifică din timp.

Varianta 2 — La un notar local (din țara de reședință) cu apostilă: poți merge la orice notar din Germania/Austria/Franța etc., autentificarea se face local, se aplică apostila Convenției de la Haga, și documentul este valabil în România. Costul total 50–150 EUR, procedură în 3–7 zile.

Varianta 3 — La întoarcerea în țară: dacă programezi o vizită în România oricum, poți semna direct la notar fără procură.

Cine poate fi mandatarul: un avocat de încredere, un consultant Neofort IMO, un prieten sau ruda. Neofort IMO poate oferi recomandare de avocați parteneri specializați în reprezentare pentru diasporă.`,
      },
      {
        id: 'finantare',
        h2: `Finanțarea din diasporă — cash sau credit bancar din România?`,
        continut: `Marea majoritate a cumpărătorilor din diasporă plătesc integral sau cu avans mare din surse proprii. Există motive practice pentru aceasta:

Plata integrală sau avans mare (50–100% surse proprii):
Cel mai simplu. Negociezi un discount de 3–7% față de prețul afișat (dezvoltatorii preferă cash). Eviți complicațiile unui credit din România cu venituri declarate în altă țară. Procesul este mult mai rapid.

Creditul ipotecar din România cu venituri din diasporă:
Este posibil, dar mai complicat. Băncile din România acceptă venituri din UE (Germania, Austria, Franța etc.) dacă sunt documentate corespunzător: contract de muncă sau fișe de salariu traduse și legalizate, extras de cont pe 6–12 luni. Procesul de aprobare durează 4–8 săptămâni în loc de 2–3.

Venituri din Turcia, Israel, R. Moldova: unele bănci sunt mai restrictive pentru venituri din afara UE. Consultați direct băncile sau un broker de credite din România care are experiență cu clienți din diasporă non-UE.

Creditul din țara de reședință: o opțiune subestimată. Dacă ai proprietate sau garanții în Germania/Austria/Franța, poți lua credit în țara ta de reședință (unde ai și dosarul de venituri) și cumperi cash în România. Dobânzile din zona euro sunt acum sub cele din România.`,
      },
      {
        id: 'transfer-valuta',
        h2: `Transferul de valută — cum trimiți banii corect și legal`,
        continut: `Transferul de valută pentru cumpărarea unui apartament trebuie făcut corect din perspectivă fiscală și bancară. Iată ce trebuie să știi:

Canalele recomandate:

Transfer bancar SWIFT direct la dezvoltator sau la notar: cea mai sigură și trasabilă metodă. Banca din România poate solicita documentele tranzacției (antecontract, chitanță rezervare) pentru conformitate KYC/AML. Pregătit-le din timp.

Transfer prin servicii specializate (Wise/TransferWise, Revolut): acceptabil pentru sume mici (rezervare, avans parțial). Pentru transferuri de 50.000 EUR+, băncile partenere pot solicita documente suplimentare. Unele bănci române nu acceptă transferuri din Wise/Revolut pentru tranzacții imobiliare — verificați în prealabil.

Ce NU se recomandă:

Cash transportat fizic: sume peste 10.000 EUR trebuie declarate la vamă. Dezvoltatorii responsabili nu acceptă cash fără chitanță fiscală. Evitați.

Transferuri prin terțe persoane: riscuri legale și fiscale semnificative pentru ambele părți.

Aspecte fiscale în România: vânzătorul (Neofort IMO) emite factură fiscală pentru toate plățile. Cumpărătorul nu are obligații fiscale suplimentare față de cele standard la achiziție (taxă notarială, intabulare). Nu există taxe speciale pentru cumpărătorii din diasporă.

Aspecte fiscale în țara de reședință: în funcție de țară, poate exista obligația declarării proprietăților deținute în afara țării (ex. în Germania, proprietatea imobiliară din străinătate se declară fiscal). Consultați un contabil/consultant fiscal din țara voastră.`,
      },
      {
        id: 'riscuri',
        h2: `Riscuri specifice achiziției din diasporă și cum le eviți`,
        continut: `Cumpărătorii din diasporă sunt mai vulnerabili la anumite riscuri față de cei care pot vizita fizic și verifica. Iată ce trebuie să fiți atenți:

Riscul 1: Calitatea finisajelor față de ce s-a promis
La distanță, nu poți verifica vizual materialele. Mitigare: cereți mostre de materiale și specificații tehnice detaliate în antecontract. La predare, mandatarul cu procură specială trebuie să aibă lista completă de verificare și dreptul explicit de a refuza semnarea la vicii.

Riscul 2: Întârzieri la predare care perturbă planurile
Dacă plănuiți să vă mutați la o dată specifică, calculați cu o marjă de 6 luni față de termenul promis. Nu reziliați chiria din Germania/Austria cu 2 luni înainte de termenul promis.

Riscul 3: Fraudele imobiliare online
Anunțuri cu prețuri prea mici față de piață, cereri de transferuri urgente, comunicare exclusiv prin email fără posibilitate de video call sau vizită la birou. Lucrați doar cu dezvoltatori verificabili: căutați CUI-ul la ONRC, verificați portofoliul finalizat, cereți referințe de la alți clienți din diasporă.

Neofort IMO are birou fizic la Str. Theodor Aman Pictor nr. 11, Sector 1 București, o platformă de review-uri Google cu 105 recenzii (rating 4.3/5) și 17 ani de activitate verificabilă. Puteți verifica oricând.

Riscul 4: Pierderea facilităților fiscale din lipsă de informare
TVA 21% versus 9% poate face o diferență de 10.000–15.000 EUR. Asigurați-vă că știți ce cotă se aplică tranzacției voastre înainte de semnare.`,
      },
      {
        id: 'fiscalitate-diaspora',
        h2: `Aspecte fiscale specifice pentru cumpărătorii din diasporă`,
        continut: `Un subiect pe care mulți cumpărători din diasporă îl ignoră până e prea târziu: obligațiile fiscale din ambele țări legate de proprietatea imobiliară din România.

Fiscalitatea în România pentru proprietari nerezidenți:
Proprietarii de apartamente din România care nu sunt rezidenți fiscali în România (adică nu petrec peste 183 de zile/an în România și nu au centrul intereselor vitale în țară) au aceleași obligații fiscale ca rezidenții pentru veniturile generate din proprietatea din România:

• Impozit pe vânzare: 3% din valoarea tranzacției pentru proprietăți deținute sub 3 ani, 1% pentru cele deținute peste 3 ani (aplicabil din 2024, conform modificărilor Codului Fiscal)
• Impozit pe chirii: dacă închiriați apartamentul, veniturile din chirii se impozitează cu 10% din venitul brut (după deducere forfetară de 20%) sau în sistem real

TVA la vânzarea ulterioară: dacă decideți să revândeți ulterior, dacă tranzacția este calificată ca activitate economică (mai multe vânzări, activitate sistematică), s-ar putea aplica TVA. Pentru o singură proprietate deținută personal, vânzarea este de regulă scutită.

Fiscalitatea în țara de reședință:
Aceasta variază semnificativ de la o țară la alta:

Germania: proprietăți imobiliare deținute în afara Germaniei trebuie declarate în declarația fiscală anuală. Dacă proprietatea generează venituri din chirii, acestea se includ în venitul global impozabil în Germania (cu aplicarea convenției de evitare a dublei impuneri).

Austria, Elveția, Franța: reguli similare cu Germania. Convențiile de evitare a dublei impuneri între România și aceste țări prevăd că veniturile imobiliare se impozitează în statul unde este situată proprietatea (România), dar pot fi luate în calcul la stabilirea ratei progresive în țara de reședință.

Israel: are convenție de evitare a dublei impuneri cu România. Proprietățile din România se declară autorităților fiscale israeliene.

Recomandarea fermă: consultați un contabil/consultant fiscal specializat din țara dumneavoastră de reședință înainte de achiziție. Costul unui sfat fiscal de 200–500 EUR vă poate evita amenzi de zeci de mii de euro pentru nedeclarare.`,
      },
      {
        id: 'sfaturi',
        h2: `Sfaturi din 21 de ani de lucru cu clienți din diasporă`,
        continut: `Am finalizat sute de tranzacții cu cumpărători din afara țării. Iată lecțiile distilate:

Nu vă grăbiți prima dată. Primele 2–3 apartamente vizualizate virtual par mereu „perfecte". Luați-vă timp să comparați, să înțelegeți prețurile de piață și să verificați zona pe Google Maps, Street View și pe videoclipuri recente de pe YouTube despre cartier.

Vizitați dacă puteți cel puțin o dată. Chiar dacă nu este obligatoriu, o singură vizită în care vedeți apartamentul, biroul nostru și zona rezidențială elimină 80% din îngrijorările normale ale cumpărătorilor la distanță. O săptămână în București pentru 2–3 vizionări și semnarea antecontractului este o investiție mică pentru o tranzacție de 100.000–200.000 EUR.

Alegeți mandatarul cu grijă. Dacă nu puteți veni deloc, mandatarul este practic partenerul vostru pe teren. Poate fi un avocat (cel mai sigur), o rudă de încredere sau, în cazuri excepționale agreate, un consultant Neofort IMO. Niciodată cineva necunoscut recomandat de o terță parte.

Comunicați activ pe toată durata construcției. Neofort IMO trimite actualizări de stadiu la fiecare etapă importantă. Cereți fotografii lunare și nu lăsați luni întregi fără niciun contact cu reprezentantul vostru.

Nu ignorați costurile de după. Mobilarea și echiparea unui apartament de 2 camere costă 15.000–35.000 EUR în funcție de standard. Dacă sunteți la distanță, lucrătorii de design interior și furnizori din București pot fi coordonați fără prezența voastră — dar planificați bugetul din timp.

Suntem disponibili la 0758 090 904 și prin WhatsApp pentru orice întrebări. Consultanța este gratuită și fără obligații.`,
      },
    ],
  },,

  'apartament-nou-vs-vechi-calcul-real': {
    titlu: `Apartament Nou vs. Apartament Vechi în București: Calculul Real al Costurilor Totale`,
    tag: 'Analiză', tagColor: '#c2410c',
    data: '4 Mai 2026', dataISO: '2026-05-04', citire: '9 min',
    autor: 'ramona-baicu',
    image: '/blog/apartament-nou-vs-vechi-calcul-real.avif',
    descriere: `Apartament nou sau vechi în București? Calculul complet al costurilor reale: preț achiziție, costuri ascunse, întreținere, risc seismic, impozit E-Proprietatea, randament închiriere și ce alegi pe termen lung.`,
    keywords: ['apartament nou vs vechi bucuresti', 'cost total apartament vechi', 'bloc nou sau vechi bucuresti', 'risc seismic bucuresti bloc vechi', 'cheltuieli intretinere apartament vechi', 'investitie apartament nou sau vechi'],
    hashtags: ['#ApartamentNouVsVechi', '#PiatImobiliara', '#CostTotal', '#ApartamenteBucuresti', '#NeofortIMO'],
    cuprins: [
      { id: 'mirul-pretului-mai-mic', titlu: `Mitul prețului mai mic la apartamentele vechi` },
      { id: 'costuri-ascunse', titlu: `Costurile ascunse ale apartamentului vechi` },
      { id: 'risc-seismic', titlu: `Riscul seismic — realitatea din București` },
      { id: 'impozit', titlu: `E-Proprietatea și impozitul diferențiat` },
      { id: 'randament', titlu: `Randament la închiriere: nou vs. vechi` },
      { id: 'calcul-exemplu', titlu: `Calcul comparativ pe 10 ani` },
      { id: 'concluzie', titlu: `Când are sens apartamentul vechi` },
    ],
    sectiuni: [
      {
        id: 'mirul-pretului-mai-mic',
        h2: `Mitul prețului mai mic la apartamentele vechi — adevărul din spatele cifrelor`,
        continut: `Cea mai frecventă justificare pentru alegerea unui apartament vechi este prețul de achiziție mai mic. Este parțial adevărat. Un apartament vechi de 2 camere în Titan costă 80.000–95.000 EUR față de 130.000–150.000 EUR pentru unul nou în aceeași zonă. Diferența de 40.000–55.000 EUR pare semnificativă.

Problema este că prețul de achiziție este doar o parte din costul total pe care îl vei plăti de-a lungul anilor. Calculul complet arată o realitate diferită.

Am lucrat 17 ani în imobiliare, cu sute de clienți care au ales fie nou, fie vechi. Am văzut ambele tipuri de experiențe — inclusiv clienți care au cumpărat „mai ieftin" și au plătit mai mult pe total, și clienți care au plătit mai mult la achiziție și au avut zero surprize ulterior. Nu există răspuns universal, dar există un calcul corect pe care merită să îl faci înainte de decizie.`,
      },
      {
        id: 'costuri-ascunse',
        h2: `Costurile ascunse ale apartamentului vechi — ce nu îți spune nimeni la vizionare`,
        continut: `Blocurile construite înainte de 1990 (și multe dintre cele din 1990–2005) vin cu costuri suplimentare care rareori apar în prețul de vânzare:

Renovarea la cumpărare:
Aproape orice apartament vechi necesită renovare la cumpărare: instalație electrică, instalație de apă (40 ani de țevi pot fi o surpriză neplăcută), termopane (dacă nu au fost înlocuite), baie, bucătărie. Un apartament de 2 camere renovat decent costă 15.000–30.000 EUR în plus față de prețul de achiziție. Uneori 40.000 EUR dacă structura are probleme.

Cotele de contribuție la bloc:
Blocurile vechi cu fond de reparații insuficient pot solicita contribuții speciale pentru reparații majore: acoperiș, lift, fațadă, subsol. Sume de 3.000–15.000 lei per apartament nu sunt rare și vin de regulă cu preaviz scurt.

Facturi de utilități mai mari:
Apartamentele vechi au clasa energetică D, E sau F față de clasa B-A+ a apartamentelor noi. Diferența la factura de gaz/încălzire poate fi 200–400 lei/lună — adică 2.400–4.800 lei/an, sau 24.000–48.000 lei pe 10 ani.

Costul administrării problemelor tehnice:
Canalizare înfundată, scurgeri de la vecini, probleme cu centralele de bloc. Acestea nu apar la blocurile noi unde instalațiile au garanție și sunt noi.`,
      },
      {
        id: 'risc-seismic',
        h2: `Riscul seismic în București — subiect incomod dar obligatoriu de discutat`,
        continut: `București este cel mai expus din capitalele europene la riscul seismic semnificativ. Cutremurul din 1977 (Mw 7,4) a ucis 1.578 de persoane numai în București și a avariat sau distrus sute de blocuri. Cutremurele din 1986 și 1990 au continuat procesul de degradare structurală.

Fondul construit:
Ministerul Dezvoltării a clasificat blocurile din București în clase de risc seismic. Clasa I (risc maxim, pericol public) include câteva sute de blocuri în București, majoritare în zone centrale. Clasa II include mii de blocuri care prezintă risc ridicat fără a atinge pragul de urgență.

Lista blocurilor cu risc seismic este publică și poate fi verificată online. Dacă te uiți la un apartament vechi, verificarea clasei de risc seismic este obligatorie, nu opțională.

Situația actuală:
Procesul de consolidare merge extrem de lent din cauza birocraticii (acordul tuturor proprietarilor), fondurilor insuficiente și complexității tehnice. Unele blocuri din Clasa I nu au primit niciun demers de consolidare în 20 de ani de la clasificare.

Ce înseamnă pentru decizia ta:
Un apartament vechi în bloc neclasat sau în clasa III–IV are un risc relativ gestionabil (deși niciodată zero în București). Un apartament în bloc Clasa I sau II fără consolidare este o decizie cu risc semnificativ pe care trebuie să îl asumi conștient.

Apartamentele noi construite după normele seismice P100-1/2013 (obligatorii din 2014) au rezistență calculată pentru cutremure de 7,5–8 grade Richter.`,
      },
      {
        id: 'impozit',
        h2: `E-Proprietatea și impozitul diferențiat: nou vs. vechi în 2026`,
        continut: `Prin sistemul E-Proprietatea implementat gradual din 2024–2026, impozitele se calculează pe baza valorii de piață, nu a valorii declarate. Aceasta creează o diferență semnificativă între apartamentele noi și cele vechi:

Apartament nou de 2 camere, 55 mp, Titan-Pallady, valoare piață ~130.000 EUR:
• Impozit estimat (cotă 0,1% locuință principală): 580–650 lei/an
• Clasa energetică A+ → reducere 5% → impozit final: ~560–620 lei/an

Apartament vechi de 2 camere, 55 mp, Titan, valoare piață ~85.000 EUR:
• Impozit estimat (cotă 0,1%): 380–420 lei/an
• Clasa energetică D → fără reducere
• Dar: dacă e bloc în Clasa II risc seismic → impozit majorat potențial

Diferența anuală este modestă (200–250 lei), dar pe 20 de ani ajunge la 4.000–5.000 lei. Nu este factorul decisiv, dar intră în calculul total.

Un aspect mai important: pentru a doua proprietate (locuință secondară sau de investiție), cota este 0,2%, deci impozitele se dublează. La o valoare de piață de 130.000 EUR, impozitul anual pentru o locuință secundară de tip nou poate ajunge la 1.150–1.300 lei.`,
      },
      {
        id: 'randament',
        h2: `Randamentul la închiriere: apartament nou vs. vechi în aceeași zonă`,
        continut: `Dacă achiziția este cu scop investițional (venituri din chirie), calculul randamentului este decisiv:

Apartament nou 2 camere, 55 mp, Titan-Pallady, preț achiziție total 161.000 EUR (cu TVA 21%):
• Chirie lunară estimată: 550–650 EUR
• Venit anual brut: 6.600–7.800 EUR
• Randament brut: 4,1–4,8%
• Cheltuieli (impozit, asigurare, fond reparații, perioade goale ~5%): ~1.500 EUR/an
• Randament net: 3,2–3,8%

Apartament vechi 2 camere, 55 mp, Titan, preț achiziție 88.000 EUR + renovare 20.000 EUR = total 108.000 EUR:
• Chirie lunară estimată: 450–520 EUR (mai mic față de nou — chiriașii plătesc mai puțin pentru standard mai scăzut)
• Venit anual brut: 5.400–6.240 EUR
• Randament brut calculat pe investiția totală (108.000 EUR): 5,0–5,8%
• Cheltuieli (mai mari decât la nou — întreținere frecventă, reparații): ~2.000–2.500 EUR/an
• Randament net: 3,0–3,5%

Concluzie: randamentul net este comparabil, cu un ușor avantaj teoretic pentru apartamentul vechi (dacă renovarea nu a depășit bugetul). Dar apartamentul nou apreciază mai rapid (ca demonstrat de datele din zonă) și nu prezintă risc de cheltuieli neașteptate mari.`,
      },
      {
        id: 'calcul-exemplu',
        h2: `Calcul comparativ pe 10 ani — exemplu concret din piața din București`,
        continut: `Să comparăm două decizii reale, bazate pe prețuri actuale din Titan-Pallady:

Scenariul A — Apartament NOU:
Preț achiziție (total cu TVA 21%): 161.000 EUR
Mobilare/echipare: 20.000 EUR
Investiție totală: 181.000 EUR
Costuri anuale (impozit, asigurare, fond, eventual credit): 3.500–4.500 EUR/an
Valoare estimată după 10 ani (creștere 5%/an): ~262.000 EUR
Apreciere: +81.000 EUR (+44,7% pe investiția totală)

Scenariul B — Apartament VECHI (comparabil, aceeași zonă):
Preț achiziție: 88.000 EUR
Renovare necesară: 22.000 EUR
Mobilare/echipare: 15.000 EUR (mai puțin, că s-a cheltuit pe renovare)
Investiție totală: 125.000 EUR
Costuri anuale (mai mari — reparații, întreținere): 4.500–6.000 EUR/an
Valoare estimată după 10 ani (creștere 3%/an, mai lentă față de nou): ~118.000 EUR
Apreciere: -7.000 EUR (sub investiția totală la costuri ridicate de mentenanță)

Nota metodologică: calculul de mai sus folosește rate de apreciere diferențiate (5%/an nou față de 3%/an vechi) susținute de datele istorice din zonă. Scenariul vechi este sensibil la costurile de renovare și mentenanță — dacă acestea depășesc bugetul inițial, returnul se deteriorează suplimentar.`,
      },
      {
        id: 'experiente-reale',
        h2: `Experiențe reale din portofoliu — povești adevărate (anonimizate)`,
        continut: `Teoriile sunt bune, dar poveștile reale vorbesc mai clar. Iată câteva cazuri din experiența directă cu clienți Neofort IMO (toate detaliile personale sunt modificate pentru confidențialitate):

Cazul 1 — Familia care a ales „mai ieftin" în 2020
O familie cu buget de 120.000 EUR a ales în 2020 un apartament vechi de 3 camere în Titan la 82.000 EUR, motivând că economisesc 38.000 EUR față de un apartament nou. Au cheltuit 25.000 EUR pe renovare (au descoperit că instalațiile electrice nu corespundeau normelor și au trebuit refăcute integral, plus baie, parchet). Total investiție: 107.000 EUR.

Un apartament nou comparabil costa în același moment 118.000 EUR — diferența reală era de 11.000 EUR, nu 38.000.

Azi, apartamentul lor vechi valorează ~105.000 EUR (creștere modestă). Un apartament nou similar valorează ~155.000 EUR. Pe 6 ani, au ratat 50.000 EUR în apreciere față de scenariul apartamentului nou.

Cazul 2 — Investitorul din diasporă care a ales corect
Un client din Frankfurt a cumpărat în 2021 un apartament nou 2 camere la Neofort IMO în Moșilor la 115.000 EUR (total cu TVA 9% de atunci). L-a dat în chirie la 450 EUR/lună — venit net anual ~4.000 EUR după toate costurile.

Azi apartamentul valorează ~175.000 EUR. Return total în 5 ani: ~20.000 EUR chirii nete + 60.000 EUR apreciere = 80.000 EUR pe o investiție de 115.000 EUR. Randament total compus: ~12%/an.

Cazul 3 — Pensionarul care a cumpărat vechi din confort, nu din rațiune
Un domn pensionat din sectorul 2 dorea un apartament 2 camere în aceeași zonă în care locuise toată viața. Prețurile apartamentelor noi din zonă (Moșilor–Eminescu) depășeau bugetul său de 110.000 EUR. A ales un apartament vechi la etaj 8 din 1978 la 95.000 EUR — bloc fără probleme vizibile, fără risc seismic ridicat.

A economisit la achiziție și, pentru că NU are scop investițional sau de reînchiriat, decizia sa era rațională. Nu orice achiziție imobiliară are nevoie să maximizeze randamentul.

Morala: nu există răspuns universal. Dacă scopul e investițional pe termen lung, calculul favorizează nou. Dacă scopul e utilizare personală cu buget limitat și zona nu are alternativă nouă accesibilă, vechiul poate fi alegerea corectă — cu condiția să fie verificat riguros.`,
      },
      {
        id: 'concluzie',
        h2: `Când are totuși sens să alegi apartamentul vechi`,
        continut: `Nu vreau să par că promovez apartamentele noi din interes comercial — nu acesta este scopul articolului. Există situații în care apartamentul vechi are sens clar:

Bugete sub 80.000 EUR: în această plajă de preț, oferta de apartamente noi din zone conectate este extrem de limitată sau inexistentă în București. Un apartament vechi bine ales, cu risc seismic scăzut și fără probleme majore tehnice, rămâne o opțiune.

Locații foarte centrale (Universitate, Unirii, Aviatorilor, Dorobanți): dacă locația centrală este criteriul principal și bugetul nu permite o construcție nouă în zonă, un apartament vechi bine întreținut și consolidat poate oferi calitatea adresei la un cost accesibil.

Proiecte de renovare cu experiență: dacă ai experiență în renovări, resurse financiare pentru a face bine treaba și timp de coordonat lucrările, poate exista o fereastră de arbitraj. Dar nu subestimați complexitatea — renovările în blocuri vechi din București sunt rareori simple.

Rezumând: dacă bugetul permite și zona cu apartamente noi corespunde criteriilor voastre, calculul pe termen lung favorizează clar apartamentul nou. Diferența de preț la achiziție este reală, dar este parțial sau total compensată de costuri mai mici, apreciere mai rapidă și zero surprize tehnice.

Vino la o consultanță gratuită la Neofort IMO — 0758 090 904. Îți arătăm opțiunile disponibile în bugetul tău și facem calculul comparativ împreună.`,
      },
    ],
  },,

  'predare-la-cheie-ce-inseamna': {
    titlu: `Predare la Cheie la Apartamente Noi: Ce Trebuie să Conțină și Ce să Verifici`,
    tag: 'Ghid', tagColor: '#2d7a3a',
    data: '7 Mai 2026', dataISO: '2026-05-07', citire: '8 min',
    autor: 'adrian-pintilie',
    image: '/blog/predare-la-cheie-apartament-nou-ce-inseamna.avif',
    descriere: `Ce înseamnă „predare la cheie" la un apartament nou? Lista completă a finisajelor incluse obligatoriu, ce poate lipsi și nu îți spune nimeni, checklist de verificare la predare și drepturile legale ale cumpărătorilor.`,
    keywords: ['predare la cheie apartament', 'ce include predare la cheie', 'finisaje apartament nou', 'verificare predare apartament', 'vicii apartament nou garantie', 'checklist predare apartament'],
    hashtags: ['#PredareaLaCheie', '#ApartamentNou', '#FinisajeApartament', '#GhidCumparare', '#NeofortIMO'],
    cuprins: [
      { id: 'ce-inseamna', titlu: `Ce înseamnă cu adevărat „la cheie"` },
      { id: 'ce-include', titlu: `Ce ar trebui să includă obligatoriu` },
      { id: 'ce-poate-lipsi', titlu: `Ce poate lipsi și nu îți spune nimeni` },
      { id: 'checklist', titlu: `Checklist complet pentru ziua predării` },
      { id: 'garantie', titlu: `Garanția legală și drepturile cumpărătorului` },
      { id: 'la-neofort', titlu: `Ce include predarea la Neofort IMO` },
    ],
    sectiuni: [
      {
        id: 'ce-inseamna',
        h2: `Ce înseamnă cu adevărat „predare la cheie" — definiția legală vs. practica din piață`,
        continut: `„La cheie" este unul dintre cei mai folosiți termeni în imobiliare și, din nefericire, unul dintre cei mai ambigui. Nu există o definiție legală standard în România care să specifice exact ce trebuie să includă un apartament „la cheie". Fiecare dezvoltator definește termenul cum vrea, ceea ce creează confuzii și, uneori, dezamăgiri la predare.

În sensul cel mai larg, „la cheie" ar trebui să însemne că primești apartamentul gata de locuit — adică poți aduce mobila și te muți. În practică, există o gamă largă de interpretări:

Versiunea minimă (uneori folosită în piață): pereți tencuiți și vopsiți, pardoseală cu șapă autonivelantă (fără parchet sau gresie), instalații sanitare montate, electricitate funcțională. Nu te poți muta fără lucrări suplimentare semnificative.

Versiunea completă (standard decent): pereți vopsiți, parchet în camere, gresie și faianță în baie și bucătărie, obiecte sanitare montate (cadă/duș, vas WC, lavoar), baterii, ușă de intrare securizată, tâmplărie PVC cu geam termopan. Poți aduce mobila și te muți.

Versiunea premium: tot ce e mai sus plus: centrală termică individuală, aer condiționat pregătit (priza și conducte), electrocasnice în bucătărie, parchet premium, uși interioare cu tocuri.

Înainte de a cumpăra, cere specificațiile tehnice detaliate în scris — în antecontract sau în anexa tehnică. „La cheie" fără specificații detaliate nu înseamnă nimic juridic.`,
      },
      {
        id: 'ce-include',
        h2: `Ce ar trebui să includă un apartament „la cheie" decent în 2026`,
        continut: `Standardul rezonabil pentru un apartament „la cheie" din care te poți muta direct în 2026:

Structura și închiderile:
• Pereți interiori finisați (tencuieli gletuite, vopsite în alb sau culoare neutră)
• Tavan finisat similar pereților sau tavan fals (optional, uneori inclus)
• Pardoseală: parchet laminat în living și dormitoare, gresie în baie, bucătărie și hol
• Tâmplărie exterioară PVC sau aluminiu cu geam termopan, minim 2 foi sticlă

Instalații sanitare — baie:
• Cadă sau cabină de duș cu baterie termostatată sau simplă
• Vas de toaletă cu rezervor și capac
• Lavoar cu baterie și oglindă
• Faianță pe pereți (minim până la 2m înălțime)
• Ventilație funcțională

Instalații sanitare — bucătărie:
• Chiuvetă cu baterie
• Branșament pentru mașina de spălat (apă caldă, rece, scurgere)
• Pregătire pentru hotă (conductor și priză)

Instalații electrice:
• Prize și întrerupătoare în fiecare cameră (minimum standardul normativului)
• Tablou electric cu siguranțe individuale pe circuite
• Iluminat de bază (corpuri simple incluse — nu obligatoriu, dar decent)
• Interfon sau videointerfon la bloc

Ușa de intrare:
• Ușă metalică de securitate cu minim 3 puncte de blocare

Acestea sunt minimele unui „la cheie" decent. Orice sub acestea nu este „la cheie" complet — este finisaj parțial, indiferent cum se numește în broșură.`,
      },
      {
        id: 'ce-poate-lipsi',
        h2: `Ce poate lipsi și nu îți spune nimeni — surprizele frecvente`,
        continut: `Din experiența mea cu sute de predări de apartamente în 15 ani de activitate la Neofort IMO:

Ușile interioare:
Mulți cumpărători presupun că „la cheie" include ușile interioare (dormitor, baie, bucătărie). Nu este întotdeauna cazul. Verificați explicit dacă ușile interioare sunt incluse și dacă da, ce standard (MDF cu toc vs. lemn masiv).

Aparatele de aer condiționat:
Priza și conducta pentru AC sunt adesea incluse, aparatele nu. Fiecare unitate de AC costă 2.000–4.000 lei cu montaj. Pentru un apartament de 2 camere, calculați minim 5.000–8.000 lei suplimentar.

Centrala termică individuală sau racordul la centrala de bloc:
În blocurile noi fără centrală de cartier, fiecare apartament are centrală termică individuală (Ariston, Bosch, Vaillant etc.). Verificați dacă este inclusă în preț sau se contractează separat. O centrală bună costă 3.000–6.000 lei + montaj.

Branșamentele individuale de utilități:
Gaz, curent, apă rece — branșamentele la rețea de la stradă la bloc sunt incluse de obicei în prețul apartamentului. Dar uneori contoarele individuale și conexiunile finale de la coloana blocului la apartament sunt în sarcina cumpărătorului. Verificați explicit.

Locul de parcare din acte:
Broșura promite „parcare disponibilă". Antecontractul trebuie să specifice: locul de parcare este inclus în prețul apartamentului sau se cumpără separat? La ce preț? Cu ce număr cadastral? Fără claritate în acte, locul de parcare promis verbal poate deveni parcare la preț de piață la semnarea contractului final.`,
      },
      {
        id: 'checklist',
        h2: `Checklist complet pentru ziua predării apartamentului`,
        continut: `Ziua predării nu este momentul pentru sentimentalisme. Este momentul pentru verificare sistematică. Nu semnați procesul-verbal până nu ați bifat toate punctele de mai jos:

Structura:
□ Verificați colțurile și îmbinările pereților — fisuri?
□ Nivelul pardoselii — puneți o bilă sau un nivel digital pe pardoseală în fiecare cameră
□ Pereții perpendicularitate — verificați cu o nivelă verticală
□ Tavanul — pete de umiditate, fisuri, denivelări

Finisaje:
□ Parchet — verificați fiecare rând: sunet sec = mort (lipsa adezivului)
□ Gresie/faianță — ciocăniți fiecare placă: sunet sec = gol sub placă, se va crăpa
□ Vopsea/gleț — uniformitate, fără pete de umiditate suspecte
□ Ușa de intrare — se blochează în toate punctele, nu lasă curenți
□ Tâmplărie — deschid și închid fără să frece, garnituri intacte

Instalații sanitare:
□ Deschideți toate robinetele simultan — presiunea scade prea mult? Problemă
□ Apa caldă ajunge în max 2–3 minute la maximum
□ Scurgeri — lăsați apa 5 minute și verificați sub chiuvetă, în spatele toaletei
□ Testați toaleta — flush funcționează, rezervorul se umple complet

Instalații electrice:
□ Testați fiecare priză cu o lampă sau telefon (sau tester prize — 30 lei la hardware)
□ Testați fiecare întrerupător
□ Tabloul electric — toate siguranțele sunt prezente și etichetate?
□ Interfon/videointerfon — funcționează?

Documente de primit la predare:
□ Procesul-verbal de predare-primire (semnați DUPĂ verificare)
□ Cartea tehnică a construcției
□ Certificatul de performanță energetică (obligatoriu prin lege)
□ Documentele de garanție: centrală termică, lift, alte dotări
□ Regulamentul asociației de proprietari
□ Contractele de branșament utilități (sau confirmarea că sunt în lucru)`,
      },
      {
        id: 'garantie',
        h2: `Garanția legală și drepturile cumpărătorului la apartamente noi`,
        continut: `Legea română oferă cumpărătorilor de apartamente noi o protecție solidă prin sistemul de garanții legale:

Garanția generală pentru vicii ascunse: 3 ani de la predare pentru orice viciu care nu era vizibil la predare (probleme structurale minore, instalații defecte, infiltrații). În această perioadă, dezvoltatorul este obligat să remedieze pe cheltuiala proprie.

Garanția extinsă pentru defecte structurale: 10 ani pentru elementele structurale ale construcției (fundații, coloane, grinzi, planșee). Orice problemă structurală descoperită în 10 ani de la recepția finală este responsabilitatea constructorului.

Legea nr. 10/1995 privind calitatea în construcții: prevede obligații explicite ale constructorilor și beneficiarilor. Recepția finală a construcției de către autorități este distinctă de predarea apartamentului către cumpărător.

Ce trebuie să faci practic pentru a-ți proteja drepturile:
1. Documentează orice problemă cu fotografii și video la predare
2. Consemnează explicit în procesul-verbal orice neconformitate observată (chiar dacă ți se spune că „se rezolvă")
3. Trimite orice reclamație ulterioară în scris (email cu confirmare de primire, recomandat)
4. Termenul pentru reclamarea viciilor aparente este de regulă 30 de zile de la predare

La Neofort IMO, garanția post-predare este gestionată de o echipă dedicată de suport. Clienții au contact direct cu managerul de proiect pentru 12 luni după predare.`,
      },
      {
        id: 'probleme-frecvente',
        h2: `Cele mai frecvente probleme descoperite la predare și cum sunt rezolvate`,
        continut: `Din 15 ani de coordonat predări de apartamente, am observat că anumite probleme apar sistematic — nu din rea voință, ci din specificul construcțiilor. Cunoașterea lor îți permite să fii pregătit:

Problema 1 — Microfisuri în tencuială (frecvență: foarte mare, gravitate: mică)
Aproape toate apartamentele noi au microfisuri la colțuri, la îmbinarea pereților cu plafonul sau la rosturi de dilatare. Dacă sunt sub 0,2 mm și nu traversează structura, sunt cauzate de uscarea naturală a materialelor și nu sunt defecte structurale. Se remediază simplu cu spaclu și vopsea, de regulă în garanție.

Ce faci: consemnează în procesul-verbal, solicită remediere în 30 de zile.

Problema 2 — Denivelări minore ale pardoselii (frecvență: medie, gravitate: variabilă)
Toleranța legală pentru pardoseli este de 3 mm la 2 metri rulând. Dacă observați o denivelație vizibilă sau o bilă rostogolită rapid, măsurați cu o nivelă. Sub toleranță = acceptabil. Peste toleranță = consemnați și solicitați remediere.

Problema 3 — Scurgerile lente la canalizare (frecvență: medie, gravitate: potențial mare)
O conductă de canalizare pusă ușor greșit poate crea probleme ani mai târziu. La predare, lăsați apa curentă în fiecare chiuvetă și cadă 3–5 minute și observați dacă scurgerea este fluidă sau lentă. Raportați orice lentoare.

Problema 4 — Tâmplăria care nu etanșează perfect (frecvență: medie, gravitate: medie)
Geamurile termopan de calitate mai redusă sau montate greșit pot lăsa curenți sau condens între foi. Testați: puneți mâna în dreptul ramelor pe timp de vânt sau ploaie. Condens permanent între foile de sticlă = defect de fabricație, trebuie înlocuit în garanție.

Problema 5 — Instalația electrică cu prize fără curent (frecvență: mică, gravitate: mică-medie)
Uneori, din erori de conectare la tablou, unele prize nu sunt cuplate la circuitul corect. Testați TOATE prizele cu un tester sau cu un telefon la încărcat.

Problema 6 — Centrala termică neregulată (frecvență: mică, gravitate: mare)
Verificați că centrala pornește, că apa caldă ajunge în maxim 3 minute la maximul caloriferelor, că nu există zgomote neobișnuite. Dacă este în garanție (de obicei 2 ani pentru centrală), orice defect se remediază de producător prin service autorizat.

Ce faci dacă găsești probleme la predare:
Nu semnați procesul-verbal cu mențiunea „fără obiecțiuni" dacă există probleme. Scrieți explicit în procesul-verbal: „se constată [descriere problemă] la [localizare]. Vânzătorul se obligă să remedieze în [30/60] de zile." Abia după ce totul este consemnat semnați.

La Neofort IMO, procesul-verbal de predare include o secțiune dedicată observațiilor cumpărătorului, iar echipa de suport post-predare are termen contractual de 30 de zile pentru remedierea viciilor constatate la predare.`,
      },
      {
        id: 'la-neofort',
        h2: `Ce include predarea la cheie la proiectele Neofort IMO`,
        continut: `La Neofort IMO, standardul de predare la cheie este definit explicit în antecontract și include:

Finisaje standard (incluse în prețul afișat):
• Parchet laminat clasa AC4 în living și dormitoare
• Gresie rectificată în baie, bucătărie și hol
• Faianță în baie (la înălțime completă) și bucătărie (la înălțime parțială, zonă de lucru)
• Vopsea lavabilă pe pereți și tavan
• Tâmplărie PVC cu geam termopan Low-E
• Ușă de intrare metalică de securitate
• Instalații sanitare complete: duș sau cadă, vas WC suspendat, lavoar cu baterie
• Tablou electric cu siguranțe individuale, prize în fiecare cameră
• Videointerfon
• Centrală termică individuală (la proiectele cu sistem individual)

Ce nu este inclus în prețul standard (disponibil opțional):
• Aparatele de aer condiționat (priza și conducta incluse)
• Electrocasnce bucătărie
• Mobilier

Locul de parcare: la fiecare proiect există opțiunea de achiziție parcare (exterioară sau interioară), cu prețuri afișate transparent în prezentarea proiectului. Locul de parcare se cumpără separat sau este inclus la cerere în prețul pachet.

Dacă ai întrebări despre specificațiile unui proiect specific, consultanții noștri sunt disponibili la 0758 090 904.`,
      },
    ],
  },,

  'randament-inchiriere-zone-bucuresti': {
    titlu: `Randament la Închiriere pe Zone din București în 2026: Unde Investești Cel Mai Bine`,
    tag: 'Investiții', tagColor: '#0369a1',
    data: '10 Mai 2026', dataISO: '2026-05-10', citire: '10 min',
    autor: 'sasha-calutu',
    image: '/blog/randament-inchiriere-apartamente-bucuresti-zone.avif',
    descriere: `Randamentul la închiriere în București pe zone în 2026: calcule reale pentru Titan-Pallady, Militari, Moșilor, Floreasca, Piața Muncii. Date din piață, nu estimări optimiste. Ce zone oferă cel mai bun randament net.`,
    keywords: ['randament inchiriere bucuresti 2026', 'investitie imobiliara bucuresti randament', 'cel mai bun randament chirie bucuresti', 'chirie apartament titan pallady', 'investitie apartament nou bucuresti', 'randament net imobiliare bucuresti'],
    hashtags: ['#InvestitieImobiliara', '#RandamentInchiriere', '#ApartamenteBucuresti', '#PiatImobiliara', '#NeofortIMO'],
    cuprins: [
      { id: 'metodologie', titlu: `Cum calculăm randamentul corect` },
      { id: 'titan-pallady', titlu: `Titan–Pallady — randamentul zonei` },
      { id: 'militari', titlu: `Militari–Gorjului` },
      { id: 'mosilor', titlu: `Moșilor–Eminescu` },
      { id: 'piata-muncii', titlu: `Piața Muncii–Dristor` },
      { id: 'floreasca', titlu: `Floreasca–Aviației (referință premium)` },
      { id: 'comparativ', titlu: `Tabel comparativ și concluzie` },
    ],
    sectiuni: [
      {
        id: 'metodologie',
        h2: `Cum calculăm randamentul real — metodologia corectă`,
        continut: `Randamentul imobiliar este adesea prezentat în varianta cea mai optimistă: preț de achiziție împărțit la chiria anuală brută. Aceasta este o metodă greșită pentru orice decizie serioasă de investiție.

Randamentul brut = (chirie lunară × 12) / prețul total de achiziție × 100

Randamentul net = (chirie lunară × 12 - costuri anuale) / prețul total de achiziție × 100

Costurile anuale care trebuie scăzute obligatoriu:
• Impozit pe proprietate (E-Proprietatea 2026): 580–1.300 lei/an în funcție de valoare
• Asigurare PAD obligatorie: ~200 lei/an
• Asigurare facultativă: ~400–600 lei/an
• Fond de reparații/întreținere: 1.000–2.000 lei/an (orice aparat sau instalație se strică)
• Perioadă de vacanță (apartamentul gol între chiriași): estimat 5–8% din chiria anuală
• Costuri de gestiune dacă nu administrezi singur: 8–10% din chirie

Pe lângă acestea, trebuie inclus și costul capitalului: dacă ai luat credit pentru achiziție, dobânda redce randamentul net. Dacă ai plătit cash, există un cost de oportunitate (ce randament ai fi obținut altfel cu acești bani).

Toate calculele de mai jos folosesc randamentul net fără cost de credit — adică scenariul cash.`,
      },
      {
        id: 'titan-pallady',
        h2: `Titan–Pallady — randamentul celei mai dinamice zone din București`,
        continut: `Date de piață actualizate mai 2026:

Prețuri apartamente noi (total cu TVA 21%):
• Garsonieră 35–40 mp: 75.000–90.000 EUR
• 2 camere 50–60 mp: 120.000–155.000 EUR
• 3 camere 70–80 mp: 165.000–200.000 EUR

Chirii lunare (date piață):
• Garsonieră 35–40 mp: 300–380 EUR
• 2 camere 50–60 mp: 430–530 EUR
• 3 camere 70–80 mp: 550–680 EUR

Calcul randament net — apartament 2 camere reprezentativ:
• Preț total achiziție: 140.000 EUR
• Chirie medie lunară: 480 EUR
• Venit anual brut: 5.760 EUR
• Costuri anuale estimate: 1.800 EUR (impozit, asigurare, fond, vacanță 5%)
• Venit net anual: 3.960 EUR
• Randament net: 2,8%

Randament brut: 4,1%. Randament net: 2,8–3,2%.

Avantajul real al zonei nu este randamentul curent (modest, ca în toată piața), ci aprecierea capitalului: +95% în 6 ani demonstrează că zona performează în randament total (chirie + apreciere) semnificativ mai bine decât alte active cu randament similar.`,
      },
      {
        id: 'militari',
        h2: `Militari–Gorjului — zona cu cel mai bun raport preț/randament din portofoliul Neofort IMO`,
        continut: `Date de piață actualizate mai 2026:

Prețuri apartamente noi (total cu TVA 21%):
• Garsonieră 35 mp: 70.000–85.000 EUR
• 2 camere 50–58 mp: 110.000–145.000 EUR
• 3 camere 68–75 mp: 150.000–185.000 EUR

Chirii lunare:
• Garsonieră: 280–350 EUR
• 2 camere: 400–490 EUR
• 3 camere: 500–620 EUR

Calcul randament net — 2 camere reprezentativ:
• Preț total achiziție: 130.000 EUR
• Chirie medie lunară: 445 EUR
• Venit anual brut: 5.340 EUR
• Costuri anuale: 1.700 EUR
• Venit net anual: 3.640 EUR
• Randament net: 2,8%

Randament brut: 4,1%. Randament net: 2,8–3,1%.

Militari are un avantaj practic față de alte zone: cererea de închiriere este consistentă tot anul, nu sezonieră. Populația lucrătoare din Sectorul 6 preferă să locuiască aproape de locul de muncă (Militari–Gorjului are densitate mare de angajatori: retail, logistică, producție). Perioadele de vacanță între chiriași sunt scurte.`,
      },
      {
        id: 'mosilor',
        h2: `Moșilor–Eminescu — zona pentru investitori cu buget mediu-mare`,
        continut: `Date de piață actualizate mai 2026:

Prețuri apartamente noi (total cu TVA 21%):
• 2 camere 50–60 mp: 155.000–200.000 EUR
• 3 camere 70–85 mp: 220.000–280.000 EUR

Chirii lunare:
• 2 camere: 550–680 EUR
• 3 camere: 750–950 EUR

Calcul randament net — 2 camere reprezentativ:
• Preț total achiziție: 175.000 EUR
• Chirie medie lunară: 615 EUR
• Venit anual brut: 7.380 EUR
• Costuri anuale: 2.000 EUR
• Venit net anual: 5.380 EUR
• Randament net: 3,1%

Randament brut: 4,2%. Randament net: 3,0–3,3%.

Moșilor–Eminescu are un profil diferit de chiriași: profesioniști tineri cu venituri medii-superioare, expați, familii fără copii. Aceasta se traduce în chiriași cu putere mai mare de plată și comportament mai previzibil. Rata de neocupare este printre cele mai mici din București (sub 3%).`,
      },
      {
        id: 'piata-muncii',
        h2: `Piața Muncii–Dristor — surpriza zonei cu trafic intens de căutare`,
        continut: `Date de piață actualizate mai 2026:

Piața Muncii este una din cele mai căutate zone de pe site-ul neofort.ro (5.300+ click-uri lunare din Google Search) — o dovadă că cererea reală depășește oferta disponibilă. Zona beneficiază de metrou M3 (Piața Muncii) și de conexiuni rapide spre centru.

Prețuri apartamente noi (total cu TVA 21%):
• 2 camere 50–60 mp: 125.000–160.000 EUR
• 3 camere 68–78 mp: 170.000–210.000 EUR

Chirii lunare:
• 2 camere: 430–510 EUR
• 3 camere: 560–680 EUR

Calcul randament net — 2 camere reprezentativ:
• Preț total achiziție: 145.000 EUR
• Chirie medie lunară: 470 EUR
• Venit anual brut: 5.640 EUR
• Costuri anuale: 1.800 EUR
• Venit net anual: 3.840 EUR
• Randament net: 2,6%

Randament brut: 3,9%. Randament net: 2,6–3,0%.

Zona Piața Muncii este interesantă mai ales pentru investitorii pe termen lung care mizează pe aprecierea prețului — zona are un deficit semnificativ de ofertă față de cerere, iar noile proiecte sunt puține.`,
      },
      {
        id: 'floreasca',
        h2: `Floreasca–Aviației — randamentul zonei premium (referință de comparație)`,
        continut: `Includ zona Floreasca nu ca recomandare directă (prețurile sunt mult mai mari față de celelalte zone), ci ca reper pentru a înțelege că randamentul nu crește proporțional cu calitatea zonei.

Date de piață mai 2026:

Prețuri apartamente noi:
• 2 camere 55–65 mp: 280.000–380.000 EUR
• 3 camere 80–100 mp: 400.000–600.000 EUR

Chirii lunare:
• 2 camere: 900–1.200 EUR
• 3 camere: 1.400–2.000 EUR

Calcul randament net — 2 camere reprezentativ:
• Preț total achiziție: 320.000 EUR
• Chirie medie lunară: 1.050 EUR
• Venit anual brut: 12.600 EUR
• Costuri anuale: 3.500 EUR
• Venit net anual: 9.100 EUR
• Randament net: 2,8%

Randament brut: 3,9%. Randament net: 2,7–3,0%.

Concluzia: randamentul net din Floreasca este similar sau chiar inferior față de Moșilor sau Titan-Pallady, la un preț de achiziție de 2–2,5x mai mare. Avantajul zonei premium este exclusiv aprecierea capitalului pe termen lung și calitatea chiriașilor (expați corporate, profesioniști seniori), nu randamentul brut.`,
      },
      {
        id: 'strategii-investitie',
        h2: `Strategii de investiție imobiliară pentru maximizarea randamentului în București`,
        continut: `Randamentul net de 2,8–3,3% din chirii poate părea modest comparat cu depozitele bancare actuale (~4,5–5,5% la 12 luni). De ce mai investesc oamenii în imobiliare? Răspunsul este că imobiliarele sunt o investiție mixtă: chirie + apreciere a capitalului + hedge la inflație.

Strategia 1 — Buy & Hold pe termen lung (cea mai frecventă, mai ales la diasporă):
Cumperi apartament nou, îl închiriezi la un chiriați de lungă durată (1–2 ani contracte), nu te ocupi activ de management. Randamentul curent este modest, dar capitalul apreciază. Funcționează ideal în zone cu dinamică pozitivă: Titan–Pallady, Militari, Moșilor.

Avantaj: pasiv, predictibil, fără stres operațional.
Dezavantaj: randamentul curent e sub dobânda bancară. Câștigul major vine la vânzarea pe termen lung.

Strategia 2 — Airbnb/închiriere de scurtă durată (randament brut 7–12%, dar muncă activă):
Apartamentele din zone turistice sau centrale pot fi închiriat pe Airbnb sau Booking.com la tarife de 50–120 EUR/noapte. Un grad de ocupare de 60–70% generate randamente brute de 7–12% — net 5–8% după taxe, curățenie, management.

Problema: în 2026, Primăria București a introdus reglementări mai stricte pentru închirierea de scurtă durată. Verificați regulamentele actuale din sectorul unde cumpărați înainte de a conta pe această strategie.

Strategia 3 — Cumpărare în faza de construcție și vânzare la finalizare (flipping):
Cumperi în off-plan (faza de proiect sau construcție), plătești prețul de pre-lansare (de regulă 10–15% sub prețul de vânzare final), vinzi la finalizare sau la 1 an după.

În piața din 2022–2024 aceasta a generat randamente de 20–35% pe 2–3 ani la unele proiecte din Titan–Pallady. În 2026, cu TVA 21% și piață mai temperată, marjele s-au comprimat la 10–18% — în continuare decent, dar nu mai garantat.

Riscul: dacă piața scade sau dacă nu găsești cumpărător la prețul dorit, ești blocat cu un apartament pe care trebuie să îl închiriezi.

Strategia 4 — Portofoliu diversificat (mai multe unități în zone diferite):
Investitorii experimentați din diasporă cumpără 2–4 apartamente de valoare medie (80.000–130.000 EUR) în loc de unul singur de valoare mare (300.000+ EUR). Logica: diversificare geografică și tipologică, riscul de neocupare este diluat, chiria medie ponderată este mai stabilă.

Indiferent de strategie, regula de bază rămâne aceeași: cumpărați în zone cu fundamente solide (metrou, servicii, cerere de închiriere demonstrabilă) și cu un dezvoltator care a mai livrat proiecte finalizate și populate. Randamentele pe hârtie sunt frumoase — randamentele reale depind de execuție.

Neofort IMO are consultanți specializați în strategii de investiție imobiliară. Apelați la 0758 090 904 pentru o analiză personalizată.`,
      },
      {
        id: 'comparativ',
        h2: `Tabel comparativ și concluzie: ce zone merită atenția investitorului în 2026`,
        continut: `Rezumat comparativ pe baza calculelor de mai sus (apartament 2 camere reprezentativ):

Zona — Preț achiziție — Chirie lunară — Randament brut — Randament net
Moșilor–Eminescu: 175.000 EUR — 615 EUR — 4,2% — 3,0–3,3%
Titan–Pallady: 140.000 EUR — 480 EUR — 4,1% — 2,8–3,2%
Militari–Gorjului: 130.000 EUR — 445 EUR — 4,1% — 2,8–3,1%
Piața Muncii: 145.000 EUR — 470 EUR — 3,9% — 2,6–3,0%
Floreasca–Aviației: 320.000 EUR — 1.050 EUR — 3,9% — 2,7–3,0%

Ce observăm:

Randamentul net este relativ uniform la 2,8–3,3% indiferent de zonă. Nu există zone „magice" cu randamente de 6–7% în București pe apartamente noi — cine îți promite asta fie minte, fie nu a inclus toate costurile.

Diferențiatorul real este randamentul total: preț de achiziție + chirie + apreciere a capitalului. Pe aceasta metrică, Titan–Pallady și Militari performează cel mai bine în ultimii 5 ani.

Recomandarea mea ca investitor: pentru randament curent maximizat — Moșilor–Eminescu (chirii mai mari, chiriași mai stabili). Pentru apreciere pe termen lung + randament decent — Titan–Pallady sau Militari.

Dacă vrei să discuți o strategie de investiție personalizată pe bugetul tău, consultanții Neofort IMO oferă consiliere gratuită fără obligații la 0758 090 904.`,
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
},
}

const ARTICOLE_LIST = [
  { slug: 'e-proprietatea-2026-noul-sistem-de-impozitare', titlu: 'E-Proprietatea 2026: Tot ce Trebuie să Știi', data: '22 Aprilie 2026', image: '/blog/e-proprietatea-2026-sistem-impozitare.avif', tag: 'Legislație', tagColor: '#7c3aed' },
  { slug: 'preturi-apartamente-bucuresti-2026', titlu: 'Prețurile Apartamentelor din București în 2026: Scad sau Nu?', data: '5 Aprilie 2026', image: '/blog/preturi-apartamente-bucuresti-2026-scad-sau-nu.avif', tag: 'Piață', tagColor: '#0369a1' },
  { slug: 'tva-apartamente-noi-2026', titlu: 'TVA la Apartamente Noi în 2026', data: '10 Aprilie 2026', image: '/blog/tva-apartamente-noi-bucuresti-2026.avif', tag: 'Legislație', tagColor: '#7c3aed' },
  { slug: 'titan-pallady-cea-mai-cautata-zona', titlu: 'Titan–Pallady: Cea Mai Căutată Zonă din București', data: '25 Aprilie 2026', image: '/blog/titan-pallady-cea-mai-cautata-zona-bucuresti.avif', tag: 'Zone', tagColor: '#0891b2' },
  { slug: 'noua-casa-2026-ghid-complet', titlu: 'Programul Noua Casă 2026: Ghid Complet', data: '28 Aprilie 2026', image: '/blog/noua-casa-2026-ghid-complet.avif', tag: 'Finanțare', tagColor: '#0369a1' },
  { slug: 'cumparare-apartament-din-diaspora', titlu: 'Cumperi Apartament din Diasporă: Ghid Complet', data: '1 Mai 2026', image: '/blog/cumparare-apartament-diaspora-ghid.avif', tag: 'Ghid', tagColor: '#2d7a3a' },
  { slug: 'apartament-nou-vs-vechi-calcul-real', titlu: 'Apartament Nou vs. Vechi: Calculul Real al Costurilor', data: '4 Mai 2026', image: '/blog/apartament-nou-vs-vechi-calcul-real.avif', tag: 'Analiză', tagColor: '#c2410c' },
  { slug: 'predare-la-cheie-ce-inseamna', titlu: 'Predare la Cheie: Ce Trebuie să Conțină', data: '7 Mai 2026', image: '/blog/predare-la-cheie-apartament-nou-ce-inseamna.avif', tag: 'Ghid', tagColor: '#2d7a3a' },
  { slug: 'randament-inchiriere-zone-bucuresti', titlu: 'Randament la Închiriere pe Zone din București 2026', data: '10 Mai 2026', image: '/blog/randament-inchiriere-apartamente-bucuresti-zone.avif', tag: 'Investiții', tagColor: '#0369a1' },
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
