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

  'colentina': {
    unghi: 'cartier',
    intro: `Colentina este zona de nord a Sectorului 2, organizată în jurul salbei de lacuri care închide orașul pe această latură. Ansamblul rezidențial Neofort IMO de aici, pe Strada Păsărani, are cel mai mic preț de pornire din tot Sectorul 2 și cea mai largă gamă de tipologii din portofoliu — de la garsonieră până la patru camere în același proiect.`,
    sectiuni: [
      {
        titlu: 'Cum arată zona',
        continut: `Colentina nu este un cartier de bulevard, ci unul de străzi mici, cu țesut mixt: case, blocuri joase și loturi care încă se construiesc. Densitatea e mai mică decât în zonele semicentrale, iar asta se vede în preț.

Reperul de spațiu verde cel mai apropiat este **Parcul Motodrom**, la aproximativ 1,2 km, iar **Parcul Plumbuita** — cel mai întins din zonă, cu mănăstirea și lacul — la 2,3 km.

Caracteristica de care trebuie ținut cont onest: **în Colentina nu există stație de metrou**. Legătura cu orașul se face cu transportul de suprafață — liniile STB 66 și 253 la circa 450 de metri, tramvaiul 21 la 800 de metri. Pentru cineva care circulă zilnic spre centru, asta e diferența esențială față de zonele de pe M1, și e și unul dintre motivele pentru care pragul de intrare e mai mic aici.`,
      },
      {
        titlu: 'La zece minute pe jos',
        continut: `Pe jos, în aproximativ zece minute, intră **Grădinița Zuppy** și **Școala Gimnazială nr. 32**, ambele la circa 850 de metri.

La aproximativ un kilometru, tot pe jos, se ajunge la **Spitalul Clinic Fundeni** și la centrul comercial **Carrefour / Altex** — cumpărăturile curente nu cer mașină.

Mai departe, cu mașina, zona are acces la **Colegiul Național Victor Babeș**, la **Liceul ICHB Colentina** și la **Grădinița și Școala Spectrum**. Pentru cumpărături mari și pentru piață, **Veranda Mall** și Obor sunt la circa 4,4 km.`,
      },
      {
        titlu: 'Cine se mută aici',
        continut: `**Cumpărători la prima locuință** pentru care pragul de intrare contează mai mult decât minutele până la metrou. Colentina oferă cel mai mic preț de pornire din Sectorul 2, iar gama de tipologii permite intrarea cu o garsonieră.

**Familii care cresc**, atrase de faptul că același proiect are și două, și trei, și patru camere — se poate schimba apartamentul fără a schimba cartierul sau școala.

**Cumpărători care lucrează în nord**, în zona de birouri Pipera, la circa 4,7 km pe șosea — un traseu care evită complet centrul.

Proiectul se predă în 2028, deci este o achiziție pe stadiu incipient; detaliile lansării sunt în [articolul dedicat Neofort 10 Colentina-Fundeni](/blog/neofort-10-colentina-fundeni-lansare).

Partea administrativă — impozit local, urbanism, arondare școlară — e tratată pe [pagina Sectorului 2](/zona/sector-2).`,
      },
    ],
    faq: [
      {
        intrebare: 'Există metrou în Colentina?',
        raspuns: 'Nu. Zona este deservită de transportul de suprafață — liniile STB 66 și 253 la circa 450 de metri și tramvaiul 21 la circa 800 de metri de ansamblu.',
      },
      {
        intrebare: 'Ce tipologii de apartamente sunt disponibile în Colentina?',
        raspuns: 'Garsonieră, studio, două, trei și patru camere, toate în același ansamblu rezidențial — cea mai largă gamă din portofoliul Neofort IMO.',
      },
      {
        intrebare: 'Când se predă ansamblul din Colentina?',
        raspuns: 'Termenul de predare și prețul de pornire actualizat sunt afișate în rezumatul de mai sus și pe pagina proiectului.',
      },
    ],
  },

  // DOUA PAGINI, UN SINGUR PROIECT. Neofort 11 este listat si pe
  // 'eminescu-viitorului', si pe 'mosilor-eminescu'. Decizie luata cu Dan:
  // se trateaza ca doua micro-zone distincte, fiecare cu accent pe alta strada.
  //   eminescu-viitorului -> tesutul rezidential linistit (Bd. Mihai Eminescu, Str. Viitorului)
  //   mosilor-eminescu    -> artera comerciala (Calea Mosilor, spre Obor)
  // Nimic nu se repeta intre ele: scolile, parcurile si lista de metrouri stau
  // DOAR pe prima; comertul, tramvaiul si axa Unirii-Obor DOAR pe a doua.

  'eminescu-viitorului': {
    unghi: 'cartier',
    intro: `Eminescu-Viitorului este rețeaua de străzi liniștite dintre Bulevardul Dacia și Ștefan cel Mare, în partea semicentrală a Sectorului 2. Este o zonă deja construită, cu țesut interbelic și blocuri joase, în care nu se mai eliberează teren — iar ansamblul rezidențial Neofort IMO de aici este finalizat, deci disponibil imediat.`,
    sectiuni: [
      {
        titlu: 'Cum arată zona',
        continut: `Spre deosebire de arterele care o mărginesc, zona propriu-zisă e făcută din străzi scurte, cu trafic redus și cu mult front construit interbelic. Bulevardul Mihai Eminescu și Strada Viitorului dau numele zonei și îi dau și caracterul: rezidențial, nu comercial.

Stația de metrou **Ștefan cel Mare**, pe magistrala **M1**, este la aproximativ 19 minute de mers pe jos — singura stație accesibilă pedestru din zonă. Restul rețelei, inclusiv nodul **Piața Unirii** (M1/M2/M3) și **Timpuri Noi** (M1/M3), se atinge cu mașina în sub un sfert de oră.

Spațiile verzi mari nu sunt în zonă, ci în jurul ei: **Lacul Tei** la circa opt minute cu mașina, **Parcul Plumbuita** la unsprezece, **Parcul Național** la treisprezece.

Pentru fața comercială a aceleiași poziții — Calea Moșilor și axa spre Obor — vedeți [ansambluri rezidențiale Moșilor-Eminescu](/zona/mosilor-eminescu).`,
      },
      {
        titlu: 'Școli și servicii',
        continut: `Reperul de învățământ al zonei este **Colegiul Național Mihai Eminescu**, la câteva minute, una dintre unitățile cu tradiție din București.

Medical, **Spitalul Clinic Colentina** este la circa nouă minute cu mașina.

Important de verificat înainte de o decizie bazată pe o anumită școală: arondarea se face pe circumscripții, în funcție de adresa exactă, nu de zonă sau de sector.`,
      },
      {
        titlu: 'Cine se mută aici',
        continut: `**Cumpărători care vor să se mute acum**, nu în doi-trei ani. Proiectul fiind finalizat, apartamentul se vede fizic înainte de semnătură — un criteriu care, pentru mulți, cântărește mai mult decât un preț mai mic pe stadiu incipient.

**Cumpărători care caută poziție semicentrală**, cu acces pe jos la metrou și la un colegiu de tradiție, într-o zonă în care oferta nouă e rară pentru că nu mai există teren liber.

**Familii mici și cupluri**, tipologiile mergând de la studio la trei camere.

Partea administrativă — impozit local, urbanism, circumscripții școlare — e pe [pagina Sectorului 2](/zona/sector-2).`,
      },
    ],
    faq: [
      {
        intrebare: 'Unde se află zona Eminescu-Viitorului?',
        raspuns: 'În partea semicentrală a Sectorului 2, pe rețeaua de străzi dintre Bulevardul Dacia și Ștefan cel Mare. Bulevardul Mihai Eminescu și Strada Viitorului dau numele zonei.',
      },
      {
        intrebare: 'Cât se merge pe jos până la metrou din Eminescu-Viitorului?',
        raspuns: 'Aproximativ 19 minute până la stația Ștefan cel Mare, pe magistrala M1. Celelalte stații din apropiere se ating cu mașina.',
      },
      {
        intrebare: 'Ansamblul din Eminescu-Viitorului este gata?',
        raspuns: 'Da, este finalizat și disponibil imediat, ceea ce permite vizionarea apartamentului înainte de achiziție.',
      },
    ],
  },

  'mosilor-eminescu': {
    unghi: 'cartier',
    intro: `Moșilor-Eminescu descrie aceeași poziție din Sectorul 2 văzută dinspre artera ei comercială: Calea Moșilor, drumul istoric care leagă Piața Unirii de Obor. Aici nu se cumpără liniște, ci acces — la comerț, la piață și la una dintre cele mai vechi axe de circulație ale orașului.`,
    sectiuni: [
      {
        titlu: 'Axa Moșilor, de la Unirii la Obor',
        continut: `**Calea Moșilor** a fost secole la rând drumul negustorilor care intrau în București dinspre nord-est, iar funcția nu s-a schimbat: este și astăzi o arteră densă în comerț stradal, servicii și farmacii, pe toată lungimea ei.

Capătul dinspre Obor este cel care contează pentru această zonă. Acolo se află **Veranda Mall** și piața agroalimentară Obor, la câteva minute, plus nodul de transport de suprafață care deservește tot nord-estul orașului.

Caracterul este opusul celui de pe străzile dinspre Viitorului: aici e circulație, vitrine și zgomot de arteră. Pentru fața rezidențială, liniștită, a aceleiași poziții — străzile interbelice dintre Dacia și Ștefan cel Mare — vedeți [ansambluri rezidențiale Eminescu-Viitorului](/zona/eminescu-viitorului).`,
      },
      {
        titlu: 'Ce înseamnă o adresă pe o arteră veche',
        continut: `Avantajul direct este că nu trebuie planificat nimic: magazinul, farmacia, banca și piața sunt pe drumul spre casă, nu la o abatere.

Dezavantajul, la fel de direct, este traficul. Calea Moșilor suportă atât circulația locală, cât și tranzitul pe direcția Unirii–Obor, iar la orele de vârf se simte. Orientarea apartamentului față de arteră contează aici mai mult decât în majoritatea zonelor — se verifică la vizionare, nu din plan.

Pentru cine compară zone de preț apropiat din sectoare diferite, [comparația Piața Muncii – Moșilor – Militari](/blog/piata-muncii-vs-mosilor-vs-militari-comparatie-zone) pune cifrele una lângă alta.`,
      },
      {
        titlu: 'Cine se mută aici',
        continut: `**Cumpărători care vor totul la pas** — profilul clasic de arteră: nu conduc zilnic, fac cumpărăturile pe jos, folosesc transportul în comun.

**Investitori în regim de închiriere**, pentru care o adresă pe o arteră cunoscută, aproape de Obor și de nodurile de transport, se închiriază fără explicații suplimentare.

**Cumpărători atrași de caracterul vechi al zonei** — Moșilor este una dintre puținele artere ale Bucureștiului unde fondul construit spune o poveste continuă de mai bine de un secol.

Pentru datele administrative ale sectorului, vedeți [pagina Sectorului 2](/zona/sector-2).`,
      },
    ],
    faq: [
      {
        intrebare: 'Care este diferența dintre Moșilor-Eminescu și Eminescu-Viitorului?',
        raspuns: 'Sunt două micro-zone vecine care descriu aceeași poziție din două unghiuri: Moșilor-Eminescu dinspre artera comercială Calea Moșilor, Eminescu-Viitorului dinspre străzile rezidențiale liniștite dinspre Dacia.',
      },
      {
        intrebare: 'Unde duce Calea Moșilor?',
        raspuns: 'Leagă Piața Unirii de Obor, fiind drumul istoric de intrare în București dinspre nord-est și, în continuare, o arteră densă în comerț stradal și servicii.',
      },
      {
        intrebare: 'Cum este traficul pe Calea Moșilor?',
        raspuns: 'Artera cumulează circulația locală cu tranzitul pe direcția Unirii–Obor și se simte la orele de vârf. Orientarea apartamentului față de stradă merită verificată la vizionare.',
      },
    ],
  },

  'piata-muncii': {
    unghi: 'cartier',
    intro: `Piața Muncii este zona cea mai bine conectată pedestru din tot portofoliul Neofort IMO: din ansamblul de pe Strada Soldat Alexandru Magatti, metroul, parcul, spitalul și baza sportivă sunt toate la mai puțin de zece minute de mers pe jos. Este și zona cu cel mai mare preț de pornire din Sectorul 3 — iar cele două lucruri sunt legate.`,
    sectiuni: [
      {
        titlu: 'Cum arată zona',
        continut: `Piața Muncii este un cartier matur din Sectorul 3, construit în jurul intersecției care îi dă numele, în care nu se mai eliberează teren. Proiectele noi sunt rare, iar asta se reflectă direct în preț.

Stația de metrou **Piața Muncii**, pe magistrala **M1**, este la circa 300 de metri — patru minute pe jos. La 1,2 km, aproximativ douăsprezece minute pe jos, se ajunge la **Dristor 1**, nod între **M1** și **M3**, ceea ce deschide ambele magistrale grele fără schimbare de mijloc de transport.

Spațiul verde de proximitate este **Parcul Național**, la 400 de metri, iar **Parcul IOR**, mult mai mare, la 1,6 km cu mașina.`,
      },
      {
        titlu: 'La zece minute pe jos',
        continut: `Zona are o concentrare neobișnuită de repere la distanță de mers pe jos:

**Baza Sportivă Voinicelu** la 270 de metri, **Parcul Național** la 400 de metri, **Spitalul Clinic „Dr. Victor Babeș"** tot la 400 de metri, **Spitalul Clinic de Copii „Dr. Victor Gomoiu"** la 700 de metri, **Școala Gimnazială de Artă nr. 5** la 900 de metri și **Colegiul Național Emil Racoviță** la circa un kilometru.

Cu mașina, în câteva minute: **Arena Națională** și **Bazinul Olimpic Lia Manoliu**, **Universitatea Hyperion**, **Spitalul MONZA**, iar pentru cumpărături **ParkLake Shopping Center**, **Kaufland Popa Nan** și **București Mall Vitan**.

Concentrarea medicală — trei unități, dintre care două la mai puțin de un kilometru pe jos — este cea mai densă din toate zonele în care construim.`,
      },
      {
        titlu: 'Cine se mută aici',
        continut: `**Cumpărători care renunță la mașină**, sau care nu vor să depindă de ea. Combinația metrou la patru minute, parc la cinci și spital la cinci nu se repetă în nicio altă zonă din portofoliu.

**Familii cu copii la școală și cu părinți în vârstă**, pentru care proximitatea simultană de învățământ și de spitale cântărește mai mult decât suprafața.

**Cumpărători care acceptă un preț mai mare pentru o poziție care nu se mai poate reproduce** — într-un cartier complet construit, oferta nouă nu crește, oricât ar crește cererea.

Tipologiile sunt două și patru camere, într-un regim de înălțime mic.

Pentru datele administrative ale sectorului și pentru comparația cu celelalte micro-zone, vedeți [pagina Sectorului 3](/zona/sector-3).`,
      },
    ],
    faq: [
      {
        intrebare: 'Cât se merge pe jos până la metrou din Piața Muncii?',
        raspuns: 'Aproximativ patru minute, circa 300 de metri, până la stația Piața Muncii de pe magistrala M1. Nodul Dristor 1, între M1 și M3, este la circa douăsprezece minute pe jos.',
      },
      {
        intrebare: 'Ce spitale sunt în zona Piața Muncii?',
        raspuns: 'Spitalul Clinic „Dr. Victor Babeș" la circa 400 de metri și Spitalul Clinic de Copii „Dr. Victor Gomoiu" la circa 700 de metri, ambele accesibile pe jos. Spitalul MONZA este la câteva minute cu mașina.',
      },
      {
        intrebare: 'De ce este Piața Muncii mai scumpă decât alte zone din Sectorul 3?',
        raspuns: 'Este un cartier complet construit, în care nu se mai eliberează teren, cu metrou, parc, școli și spitale la distanță de mers pe jos. Oferta nouă este rară, iar poziția nu se poate reproduce.',
      },
      {
        intrebare: 'Ce tipologii sunt disponibile în Piața Muncii?',
        raspuns: 'Apartamente de două și patru camere. Prețul de pornire actualizat este în rezumatul de mai sus.',
      },
    ],
  },
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
