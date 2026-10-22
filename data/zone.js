// Continut EDITORIAL per zona.
//
// Partea derivata din date (rezumat, tabel comparativ, geo, imagine) sta in
// `lib/zonaDerivat.js` si functioneaza pe toate zonele fara sa astepte text.
// Fisierul acesta tine doar ce NU se poate deriva: textul scris de om.
//
// UNGHI EDITORIAL — decis ca sa nu se canibalizeze paginile care se suprapun
// (titan-pallady ⊂ sector-3, militari ⊂ sector-6):
//   'administrativ' — pagina de SECTOR. Vorbeste despre sector ca unitate:
//      ce micro-zone contine si cum se compara, infrastructura la nivel de sector,
//      ce tine de primaria de sector. NU descrie viata de cartier.
//   'cartier' — pagina de MICRO-ZONA. Vorbeste despre viata de zi cu zi:
//      cum arata zona, ce e la 10 minute pe jos, parcul, profilul de cumparator.
//      NU repeta datele administrative.
// Acelasi fapt nu se scrie in ambele locuri. Paginile se trimit una la alta.
//
// TOATE faptele de mai jos vin din `puncteInteres` verificate de Dan sau din
// geografie stabila. Nu se afirma procente de impozit, adrese de primarie,
// clasamente de scoli sau numere de linii STB care nu sunt deja in date.

export const ZONE = {

  // ══════════════════════════════════════════════════════════
  // SECTOARE — unghi administrativ
  // ══════════════════════════════════════════════════════════

  'sector-3': {
    unghi: 'administrativ',
    intro: `Sectorul 3 este cel mai populat sector al Bucureștiului și singurul în care Neofort IMO dezvoltă simultan în mai multe micro-zone distincte. Cele nouă ansambluri rezidențiale de aici nu formează un bloc omogen: se împart între axa Titan–Pallady, în est, și zona Piața Muncii, mult mai aproape de centru. Diferența dintre ele nu este de calitate, ci de etapă — Pallady este o platformă industrială în transformare, Piața Muncii este un cartier matur, deja construit.`,
    sectiuni: [
      {
        titlu: 'Micro-zonele Sectorului 3 în care construim',
        continut: `Opt din cele nouă ansambluri rezidențiale sunt pe axa **Titan–Pallady**, iar unul în **Piața Muncii**. Sunt două piețe diferite, cu cumpărători diferiți.

**Titan–Pallady** concentrează prețurile de intrare cele mai mici din tot portofoliul Neofort IMO și cele mai multe proiecte aflate în construcție sau în lansare. Acolo se cumpără suprafață și stadiu incipient.

**Piața Muncii** este opusul: un singur proiect, preț de pornire de peste trei ori mai mare, într-un cartier în care nu se mai eliberează teren. Acolo se cumpără poziție.

Viața de zi cu zi a fiecăreia — parcuri, școli, ce se află la zece minute pe jos — e descrisă pe paginile lor: [ansambluri rezidențiale Titan-Pallady](/zona/titan-pallady) și [ansambluri rezidențiale Piața Muncii](/zona/piata-muncii).`,
      },
      {
        titlu: 'Infrastructură la nivel de sector',
        continut: `Sectorul 3 este singurul sector deservit de ambele magistrale grele de metrou: **M1** și **M3**, care se intersectează la Dristor și la Nicolae Grigorescu. Proiectele noastre sunt distribuite pe ambele — Nicolae Teclu și Anghel Saligny pe M3, Costin Georgian și Piața Muncii pe M1.

Pentru deplasarea în afara orașului, accesul la **autostrada A2** se face direct din estul sectorului, fără traversarea centrului — un avantaj pe care niciun alt sector estic nu îl are în aceeași formă.

Comercial, sectorul are doi poli mari — **ParkLake Shopping Center** și **Mega Mall** — plus concentrarea de retail de mari dimensiuni de pe Bd. Theodor Pallady: IKEA, Jumbo, Leroy Merlin, Auchan.

Rețeaua spitalicească publică a sectorului este una dintre cele mai dense din oraș; unitățile concrete din apropierea fiecărui proiect sunt listate pe pagina ansamblului.`,
      },
      {
        titlu: 'Ce ține de primăria de sector',
        continut: `Câteva lucruri se rezolvă la nivel de sector, nu la nivelul Primăriei Capitalei, și e util de știut înainte de achiziție:

**Impozitul pe clădiri** se plătește la primăria sectorului în care se află imobilul. Cotele se stabilesc anual prin hotărâre de consiliu local, în limitele din Codul fiscal, deci pot diferi de la un sector la altul — se verifică la sursă, pentru anul în curs.

**Certificatul de urbanism și autorizația de construire** pentru imobilele din sector se eliberează de primăria de sector, nu de Primăria Capitalei, cu excepția cazurilor prevăzute expres de lege.

**Arondarea școlară** se face pe circumscripții stabilite de inspectoratul școlar, iar circumscripția depinde de adresa exactă, nu de sector. Se verifică pentru adresa concretă, înainte de a lua o decizie bazată pe o anumită școală.

Pentru cadrul legal al modificărilor la un apartament deja cumpărat — inclusiv închiderea balconului — detaliile sunt în [articolul despre impozitarea dublă pentru balcoanele închise fără autorizație](/blog/impozit-dublu-balcon-inchis-fara-autorizatie).`,
      },
    ],
    faq: [
      {
        intrebare: 'Câte ansambluri rezidențiale are Neofort IMO în Sectorul 3?',
        raspuns: 'Nouă ansambluri rezidențiale active, dintre care opt pe axa Titan–Pallady și unul în Piața Muncii. Lista completă, cu prețuri și termene de predare, este în tabelul comparativ de mai sus.',
      },
      {
        intrebare: 'Care este diferența dintre Sectorul 3 și Titan–Pallady?',
        raspuns: 'Titan–Pallady este o micro-zonă din estul Sectorului 3, nu un sector separat. Pagina de sector acoperă toate micro-zonele și partea administrativă; pagina de zonă descrie cartierul în sine.',
      },
      {
        intrebare: 'Ce stații de metrou deservesc ansamblurile din Sectorul 3?',
        raspuns: 'Sectorul 3 este deservit de ambele magistrale grele, M1 și M3, care se intersectează la Dristor și la Nicolae Grigorescu. Stațiile concrete pentru fiecare ansamblu sunt pe pagina micro-zonei și pe pagina proiectului.',
      },
      {
        intrebare: 'Impozitul pe locuință diferă între sectoarele Bucureștiului?',
        raspuns: 'Poate diferi. Cotele se aprobă anual prin hotărâre de consiliu local, în limitele stabilite de Codul fiscal, deci se verifică la primăria sectorului pentru anul în curs.',
      },
    ],
  },

  'sector-6': {
    unghi: 'administrativ',
    intro: `Sectorul 6 se întinde pe toată latura de vest a Bucureștiului, iar ansamblurile rezidențiale Neofort IMO de aici sunt amplasate pe axa Iuliu Maniu, coloana vertebrală a sectorului. Ambele proiecte sunt legate direct de magistrala M3, care traversează sectorul de la Preciziei până spre centru.`,
    sectiuni: [
      {
        titlu: 'Micro-zonele Sectorului 6 în care construim',
        continut: `Ambele ansambluri rezidențiale sunt în **Militari**, la distanțe diferite de centru pe aceeași axă: unul lângă metroul Păcii, celălalt lângă Gorjului.

Cum arată zona la nivel de stradă, ce se află în jur și cine cumpără acolo — pe pagina dedicată: [ansambluri rezidențiale Militari](/zona/militari).

Pentru o comparație între Militari și alte zone cu profil similar de preț, [articolul de comparație Piața Muncii – Moșilor – Militari](/blog/piata-muncii-vs-mosilor-vs-militari-comparatie-zone) pune cifrele una lângă alta.`,
      },
      {
        titlu: 'Infrastructură la nivel de sector',
        continut: `Sectorul 6 este deservit în principal de **magistrala M3**, cu stațiile Preciziei, Păcii, Gorjului și Lujerului aliniate de-a lungul Bd. Iuliu Maniu. La capătul dinspre centru, Petrache Poenaru face legătura cu **M1**.

Ieșirea către **autostrada A1** se face direct din vestul sectorului — relevant pentru cine face naveta spre Pitești sau spre platformele industriale din vest.

Comercial, sectorul are una dintre cele mai dense concentrări de retail de mari dimensiuni din București, aproape toată aliniată pe aceeași arteră — centrele concrete sunt enumerate pe pagina cartierului.

Sectorul 6 este și cel în care se construiește **magistrala M5**, pe direcția Drumul Taberei; stațiile ei nu deservesc însă ansamblurile noastre, care sunt pe axa M3.`,
      },
      {
        titlu: 'Ce ține de primăria de sector',
        continut: `**Impozitul pe clădiri** se plătește la primăria de sector, iar cotele se aprobă anual prin hotărâre de consiliu local, în limitele din Codul fiscal — se verifică pentru anul în curs.

**Certificatul de urbanism și autorizația de construire** se eliberează de primăria sectorului, nu de Primăria Capitalei, în afara cazurilor prevăzute expres de lege.

**Arondarea școlară** depinde de adresa exactă, nu de sector, și se confirmă la inspectoratul școlar înainte de orice decizie bazată pe o anumită unitate de învățământ.`,
      },
    ],
    faq: [
      {
        intrebare: 'Câte ansambluri rezidențiale are Neofort IMO în Sectorul 6?',
        raspuns: 'Două ansambluri rezidențiale active, ambele în Militari, pe axa Iuliu Maniu — unul lângă metroul Păcii, celălalt lângă Gorjului.',
      },
      {
        intrebare: 'Ce magistrală de metrou deservește Sectorul 6?',
        raspuns: 'Magistrala M3, cu stațiile Preciziei, Păcii, Gorjului și Lujerului de-a lungul Bd. Iuliu Maniu. Petrache Poenaru asigură legătura cu M1. Magistrala M5 deservește zona Drumul Taberei, nu axa Iuliu Maniu.',
      },
      {
        intrebare: 'Cum se iese pe autostradă din Sectorul 6?',
        raspuns: 'Accesul la autostrada A1, spre Pitești, se face direct din vestul sectorului, fără traversarea centrului.',
      },
    ],
  },

  'sector-2': {
    unghi: 'administrativ',
    intro: `Sectorul 2 acoperă nord-estul Bucureștiului, de la Piața Romană până la salba de lacuri Tei–Plumbuita–Fundeni. Cele două ansambluri rezidențiale Neofort IMO de aici marchează exact cele două extreme ale sectorului: unul semicentral, finalizat, celălalt în zona de lacuri, în construcție.`,
    sectiuni: [
      {
        titlu: 'Micro-zonele Sectorului 2 în care construim',
        continut: `Cele două proiecte nu concurează între ele — sunt în piețe diferite.

**Eminescu–Viitorului** este zonă semicentrală construită, cu acces pe jos la metroul Ștefan cel Mare și la rețeaua de colegii din zona Moșilor. Proiectul de acolo este finalizat, deci disponibil imediat.

**Colentina–Fundeni** este în nordul sectorului, lângă lacuri și lângă Spitalul Clinic Fundeni, cu cel mai mic preț de pornire din sector și predare în 2028.

Descrierea cartierelor în sine: [ansambluri rezidențiale Colentina](/zona/colentina) și [ansambluri rezidențiale Eminescu-Viitorului](/zona/eminescu-viitorului).`,
      },
      {
        titlu: 'Infrastructură la nivel de sector',
        continut: `Coloana de transport a sectorului este **magistrala M1**, pe segmentul Ștefan cel Mare – Obor – Piața Iancului. Obor este și nodul comercial istoric al sectorului, cu **Veranda Mall** și piața agroalimentară alături.

Spre lacuri, acolo unde metroul nu ajunge, legătura se face cu tramvaiul și cu liniile STB de suprafață.

Medical, sectorul concentrează două unități de referință națională: **Spitalul Clinic Colentina** și **Spitalul Clinic Fundeni**.

Pe partea de spații verzi, sectorul are cea mai mare suprafață de luciu de apă din oraș — Parcul Plumbuita, Parcul Tei și malul Fundeni.`,
      },
      {
        titlu: 'Ce ține de primăria de sector',
        continut: `**Impozitul pe clădiri** se plătește la primăria sectorului, cu cote aprobate anual prin hotărâre de consiliu local, în limitele din Codul fiscal.

**Certificatul de urbanism și autorizația de construire** se eliberează la nivel de sector, nu de Primăria Capitalei, în afara cazurilor prevăzute expres de lege.

**Arondarea școlară** se stabilește pe circumscripții, în funcție de adresa exactă — se verifică la inspectorat, nu se deduce din sector.`,
      },
    ],
    faq: [
      {
        intrebare: 'Câte ansambluri rezidențiale are Neofort IMO în Sectorul 2?',
        raspuns: 'Două ansambluri rezidențiale active: unul finalizat în zona Eminescu–Viitorului și unul în construcție în Colentina–Fundeni, cu predare în 2028.',
      },
      {
        intrebare: 'Ce stație de metrou deservește Sectorul 2?',
        raspuns: 'Magistrala M1, pe segmentul Ștefan cel Mare – Obor – Piața Iancului. Zona de lacuri, în nordul sectorului, este deservită de tramvai și de liniile STB de suprafață.',
      },
      {
        intrebare: 'Care este diferența de preț între cele două zone ale Sectorului 2?',
        raspuns: 'Prețurile de pornire și termenele de predare ale ambelor proiecte sunt în tabelul comparativ de mai sus, actualizate la ultima modificare a ofertei.',
      },
    ],
  },

  // ══════════════════════════════════════════════════════════
  // MICRO-ZONE — unghi de cartier
  // ══════════════════════════════════════════════════════════

  'titan-pallady': {
    unghi: 'cartier',
    intro: `Titan–Pallady este zona în care Neofort IMO are cele mai multe ansambluri rezidențiale și cele mai mici prețuri de intrare din tot portofoliul. Zona are două fețe lipite una de alta: Titan, cartier rezidențial matur construit în jurul Parcului IOR, și Bd. Theodor Pallady, fostă platformă industrială care se transformă în locuințe de la un an la altul. Cine cumpără aici cumpără, de fapt, diferența dintre cele două.`,
    sectiuni: [
      {
        titlu: 'Cum arată zona',
        continut: `Reperul care definește Titanul este **Parcul IOR** — unul dintre cele mai întinse parcuri ale Bucureștiului, cu lac, și punctul în jurul căruia se orientează tot cartierul. În completare, zona are Parcul Teilor, Parcul Sticlăriei și, spre Pantelimon, Parcul Morarilor.

**Bd. Theodor Pallady** este o poveste diferită. A fost axa industrială a estului, iar acum concentrează atât retailul de mari dimensiuni — IKEA, Jumbo, Leroy Merlin, Auchan — cât și cele mai multe proiecte rezidențiale noi din estul orașului. E motivul pentru care prețul pe metru pătrat aici a crescut mai repede decât media orașului; cifrele sunt în [analiza evoluției prețurilor din Titan-Pallady](/blog/titan-pallady-cea-mai-cautata-zona).

Între cele două, stațiile de metrou **Nicolae Teclu** și **Anghel Saligny** (ambele pe M3) și **Costin Georgian** (M1) acoperă capete diferite ale zonei — diferența de poziție față de ele explică o bună parte din diferența de preț între proiecte.`,
      },
      {
        titlu: 'La zece minute pe jos',
        continut: `Zona are una dintre cele mai dense concentrări de învățământ privat și de stat din estul orașului: **Școala Waldorf Ilios**, **Spectrum School**, **Liceul Internațional de Informatică**, **Liceul Teoretic Nichita Stănescu**, **Școala Gimnazială Liviu Rebreanu**, plus mai multe grădinițe și creșe de cartier.

Pentru cumpărături curente, **Auchan Titan**, **Kaufland**, **Lidl** și **Piața Miniș** acoperă zona fără mașină. Pentru weekend, **ParkLake Shopping Center** și **Mega Mall** sunt la câteva minute.

Medical, proximitatea include **Policlinica Titan**, **Campus Medical Regina Maria Titan** și, pentru urgențe, **Spitalul Clinic de Urgență Pantelimon** și **Spitalul Clinic de Copii „Dr. Victor Gomoiu"**.

Sportiv, **Complexul Sportiv Lia Manoliu** și Arena Națională sunt la limita zonei, spre Piața Muncii.`,
      },
      {
        titlu: 'Cine se mută aici',
        continut: `Profilul se împarte destul de clar în trei.

**Familii cu copii mici**, atrase de combinația parc mare plus densitate de școli — de regulă caută 3 sau 4 camere și acceptă un stadiu de construcție mai incipient în schimbul suprafeței.

**Cumpărători la prima locuință**, pentru care Titan–Pallady este una dintre puținele zone din București cu metrou unde pragul de intrare rămâne sub media orașului. Aici intră garsonierele și apartamentele de 2 camere din proiectele aflate în lansare.

**Investitori în regim de închiriere**, care urmăresc distanța până la metrou mai mult decât orice altceva. Randamentele comparate pe zone sunt în [analiza randamentelor de închiriere](/blog/randament-inchiriere-zone-bucuresti).

Partea administrativă — impozit local, certificat de urbanism, arondare școlară — ține de sector și e tratată pe [pagina Sectorului 3](/zona/sector-3).`,
      },
    ],
    faq: [
      {
        intrebare: 'Unde se află mai exact zona Titan–Pallady?',
        raspuns: 'În estul Sectorului 3, între Parcul IOR și Bd. Theodor Pallady. Este o micro-zonă a Sectorului 3, nu un sector separat.',
      },
      {
        intrebare: 'Care este cel mai mic preț pentru un ansamblu rezidențial în Titan–Pallady?',
        raspuns: 'Prețurile de pornire ale tuturor ansamblurilor din zonă sunt în tabelul comparativ de mai sus, actualizate la ultima modificare a ofertei. Zona concentrează cele mai mici praguri de intrare din portofoliul Neofort IMO.',
      },
      {
        intrebare: 'Ce stații de metrou sunt în Titan–Pallady?',
        raspuns: 'Nicolae Teclu și Anghel Saligny pe magistrala M3, Costin Georgian pe M1. Distanța exactă de la fiecare ansamblu este pe pagina proiectului.',
      },
      {
        intrebare: 'Merită cumpărat în Titan–Pallady în 2026?',
        raspuns: 'Depinde de ce urmăriți — suprafață, poziție față de metrou sau randament la închiriere. Argumentele și cifrele sunt detaliate în articolul despre oportunitatea achiziției în Titan–Pallady.',
      },
    ],
  },

  'militari': {
    unghi: 'cartier',
    intro: `Militari este cel mai mare cartier rezidențial din vestul Bucureștiului, construit de-a lungul Bd. Iuliu Maniu. Cele două proiecte Neofort IMO stau pe aceeași arteră, dar la capete diferite ale ei: unul lângă metroul Păcii, mai aproape de centru, celălalt lângă Gorjului. În Militari, poziția față de stația de metrou contează mai mult decât în aproape orice alt cartier al orașului, pentru că tot cartierul e organizat liniar, de-a lungul unei singure artere.`,
    sectiuni: [
      {
        titlu: 'Cum arată zona',
        continut: `**Bd. Iuliu Maniu** structurează tot cartierul: de-a lungul lui se înșiră stațiile de metrou **Preciziei**, **Păcii**, **Gorjului** și **Lujerului**, toate pe magistrala M3. Practic, orice adresă din Militari se descrie prin cea mai apropiată dintre ele.

Spațiul verde de referință al zonei este **Parcul Liniei**, amenajat pe traseul fostei linii de cale ferată — cea mai vizibilă schimbare de calitate a vieții din cartier din ultimii ani.

Traficul este punctul sensibil: Iuliu Maniu este și ruta de intrare în oraș dinspre **autostrada A1**, deci la orele de vârf suportă atât traficul de cartier, cât și pe cel de navetă. Metroul este, în consecință, varianta predictibilă pentru deplasarea spre centru.`,
      },
      {
        titlu: 'La zece minute pe jos',
        continut: `Militari are una dintre cele mai dense oferte de retail din București, toată concentrată pe aceeași axă: **Militari Shopping Center**, **Plaza România** și **Cora Lujerului**, iar spre centru, la limita cu Sectorul 5, **AFI Palace Cotroceni**.

Pentru servicii medicale private, **Sanador Militari** este în proximitate.

Diferența reală între adrese nu o face retailul — care acoperă tot cartierul — ci câte minute pe jos sunt până la stația de metrou. Distanțele exacte pentru fiecare ansamblu sunt în tabelul comparativ de mai sus.`,
      },
      {
        titlu: 'Cine se mută aici',
        continut: `**Cumpărători care fac naveta spre vest** — către Pitești sau către platformele industriale din vestul orașului — pentru care ieșirea directă pe A1 cântărește mai mult decât apropierea de centru.

**Familii care caută raport suprafață-preț**, Militari fiind o zonă în care același buget cumpără mai mulți metri pătrați decât în zonele semicentrale, cu metrou la fel de aproape.

**Cumpărători de locuință principală pe termen lung**, atrași de faptul că este un cartier deja complet — școli, comerț, transport, spații verzi — nu unul în formare.

Pentru cum se compară Militari cu zone de preț similar din alte sectoare, vedeți [comparația Piața Muncii – Moșilor – Militari](/blog/piata-muncii-vs-mosilor-vs-militari-comparatie-zone).

Partea administrativă — impozit local, urbanism, arondare școlară — este tratată pe [pagina Sectorului 6](/zona/sector-6).`,
      },
    ],
    faq: [
      {
        intrebare: 'În ce sector este cartierul Militari?',
        raspuns: 'În Sectorul 6, pe axa Bd. Iuliu Maniu. Militari este o micro-zonă a Sectorului 6, nu un sector separat.',
      },
      {
        intrebare: 'Ce stații de metrou deservesc Militari?',
        raspuns: 'Preciziei, Păcii, Gorjului și Lujerului, toate pe magistrala M3, înșirate de-a lungul Bd. Iuliu Maniu.',
      },
      {
        intrebare: 'Cum este traficul în Militari?',
        raspuns: 'Bd. Iuliu Maniu este și ruta de intrare în oraș dinspre autostrada A1, deci la orele de vârf cumulează traficul de cartier cu cel de navetă. Metroul rămâne varianta predictibilă spre centru.',
      },
    ],
  },

  // ── Zone mici: conținut editorial în v431 ──────────────────
  'colentina':           { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
  'eminescu-viitorului': { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
  'mosilor-eminescu':    { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
  'piata-muncii':        { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
}

// Forma unei intrari completate:
//   intro:    'Paragraf de 2-4 fraze, unic pentru zona.'
//   sectiuni: [{ titlu: 'H2', continut: 'Text. Accepta [link](/url) si **bold**.' }]
//   faq:      [{ intrebare: '...', raspuns: '...' }]   -> genereaza schema FAQPage

export function zonaEditorial(slug) {
  const z = ZONE[slug]
  if (!z) return { unghi: null, intro: null, sectiuni: [], faq: [] }
  return { unghi: z.unghi, intro: z.intro, sectiuni: z.sectiuni || [], faq: z.faq || [] }
}
