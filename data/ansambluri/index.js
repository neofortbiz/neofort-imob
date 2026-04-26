// DATE CENTRALE — toate ansamblurile active
// status: 'activ' | 'constructie' | 'promotie' | 'vandut' | 'suspendat'

export const ANSAMBLURI = [
  {
    slug: 'neofort-84-titan-pallady',
    numar: 84,
    nume: 'Neofort 84 Titan Pallady',
    zona: 'Titan-Pallady',
    sector: 'Sector 3',
    adresa: 'Zona Titan-Pallady, Sector 3, București',
    status: 'constructie',
    dataPredare: 'T1 2027',
    pretDeLa: 62114,
    etaje: 'P+10',
    telefon: '0743 250 029',
    broker: 'Raluca NISTOR',
    brokerFoto: '/brokeri/raluca-nistor.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 84 reprezintă cel mai recent proiect de anvergură al Neofort IMO în zona Titan-Pallady, Sectorul 3 al Bucureștiului — una dintre cele mai dinamice și mai căutate zone rezidențiale ale capitalei, aflată în continuă dezvoltare și modernizare urbană.

Blocul cu regim de înălțime P+10 etaje este în prezent în construcție, cu termen de predare în Trimestrul I 2027. Amplasat strategic la câteva minute de mers pe jos de stațiile de metrou Nicolae Teclu și Anghel Saligny de pe linia M2, ansamblul asigură rezidenților acces rapid la orice colț al Bucureștiului — fie că vorbim de centrul orașului, zonele de business sau nodurile de transport.

Construcția respectă standarde tehnice superioare: structură de cadre și diafragme din beton armat completată cu zidărie din cărămidă Porotherm, recunoscută pentru performanțele de izolație termică și fonică. Fiecare apartament beneficiază de încălzire în pardoseală — soluția modernă pentru confort termic uniform și eficiență energetică maximă — tâmplărie PVC Salamander cu geam tripan Low-E, centrală termică proprie în condensare și instalații sanitare, electrice și termice complete la standardele actuale.

Apartamentele de la parter și etajul 10 dispun de terase generoase cu priveliști spectaculoase asupra zonei. Oferta cuprinde apartamente de 2, 3 și 4 camere, cu suprafețe utile între 47 și 175 mp, gândite pentru familii, tineri profesioniști și investitori care înțeleg potențialul zonei Titan-Pallady.

Din perspectiva zonei, Titan-Pallady este astăzi una dintre cele mai bine echipate zone rezidențiale din București. Centrele comerciale IKEA Pallady, Auchan Titan, Jumbo, Metro, Leroy Merlin și Dedeman Pallady concentrează toate opțiunile de retail la câteva minute distanță. Complexul educațional din zonă — Waldorf București, Spectrum School, Școala Gimnazială nr. 149 și Liceul Victor Brauner — asigură acoperire completă pentru familiile cu copii. Parcul Teilor oferă un spațiu verde generos pentru relaxare zilnică. Campus Medical Regina Maria Titan, MedLife Titan și Clinica Pallady reprezintă oferta medicală de referință a zonei.

Infrastructura de transport este completă: metrou M2 cu două stații accesibile pe jos, multiple linii STB și conexiuni rapide spre centrul Bucureștiului. Zona continuă să se dezvolte, cu investiții semnificative în infrastructură publică și privată, ceea ce susține atât valoarea de locuire, cât și potențialul de apreciere a investiției imobiliare.

Prețurile promoționale de la 62.114€ + TVA sunt valabile pentru primele unități rezervate. Neofort IMO asigură vânzare directă de la sursă, fără comision de agenție, cu consultanță juridică și financiară inclusă pe toată durata procesului de achiziție.`,
    brokerTel: '0743 250 029',
    coordonate: { lat: 44.4268, lng: 26.1700 },
    zone: ['titan-pallady', 'sector-3'],
    tipuri: ['2 camere', '3 camere', '4 camere'],
    descriere: 'Ansamblul Rezidențial Neofort 84, zona Titan-Pallady, Sector 3. Bloc P+10 în construcție, predare T1 2027. Apartamente 2-4 camere de la 62.114€+TVA. Metrou Nicolae Teclu la câteva minute, IKEA Pallady, Auchan Titan, Parcul Teilor în proximitate. Încălzire pardoseală, tâmplărie Salamander tripan, centrală proprie, structură beton armat Porotherm.',
    apartamente: [
      { tip: '2 cam. Tip 1', etaj: 'et. 10', suprafata: 47.78, avans20: 66892, avans45: 62114, promo: true, camere: 2 },
      { tip: '2 cam. Tip 2', etaj: 'et. 3-9', suprafata: 49.15, avans20: 68824, avans45: 63908, promo: true, camere: 2 },
      { tip: '2 cam. Tip 3', etaj: 'et. 1-10', suprafata: 61.50, avans20: 86254, avans45: 80093, promo: true, camere: 2 },
      { tip: '2 cam. Tip 4', etaj: 'p-et. 10', suprafata: 67.71, avans20: 94794, avans45: 88023, promo: true, camere: 2 },
      { tip: '2 cam. Tip 5 terasa', etaj: 'p. înalt', suprafata: 91.60, avans20: 110026, avans45: 96740, promo: true, camere: 2 },
      { tip: '3 cam. Tip 1', etaj: 'et. 1 + p. înalt', suprafata: 78.60, avans20: 110026, avans45: 102167, promo: true, camere: 3 },
      { tip: '3 cam. Tip 2', etaj: 'et. 2-9', suprafata: 86.30, avans20: 120820, avans45: 112190, promo: true, camere: 3 },
      { tip: '3 cam. Tip 3', etaj: 'et. 1-8', suprafata: 90.62, avans20: 126868, avans45: 117806, promo: true, camere: 3 },
      { tip: '3 cam. Tip 4 terasa', etaj: 'p. înalt', suprafata: 119.52, avans20: 131985, avans45: 125082, promo: true, camere: 3 },
      { tip: '4 cam. terasa', etaj: 'et. 10', suprafata: 175.58, avans20: 190988, avans45: 181262, promo: true, camere: 4 },
    ],
    parcare: { exterior: { disponibil: true, pret: 6000 }, interior: { disponibil: true, pret: 8500 }, subteran: { disponibil: false, pret: null } },
    dotari: ['Incalzire in pardoseala', 'Tamplarie PVC Salamander', 'Lifturi silentioase', 'Gresie si faianta import', 'Terase generoase', 'Instalatii sanitare, electrice si termice', 'Centrala termica proprie', 'Ferestre mari pentru lumina naturala', 'Structura beton armat', 'Zidarie caramida Porotherm'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Nicolae Teclu (M2)', distanta: 'cateva minute pe jos' },
      { tip: 'metrou', nume: 'Metrou Anghel Saligny (M2)', distanta: '8 min pe jos' },
      { tip: 'mall', nume: 'IKEA Pallady', distanta: '5 min cu mașina' },
      { tip: 'mall', nume: 'Auchan Titan', distanta: '7 min cu mașina' },
      { tip: 'mall', nume: 'Jumbo / Metro / Leroy Merlin / Dedeman Pallady', distanta: '8 min cu mașina' },
      { tip: 'scoala', nume: 'Waldorf & Spectrum School', distanta: '500m' },
      { tip: 'scoala', nume: 'Școala nr. 149 / Liceul Victor Brauner', distanta: '10 min pe jos' },
      { tip: 'parc', nume: 'Parcul Teilor', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Campus Medical Regina Maria Titan', distanta: '10 min' },
      { tip: 'medical', nume: 'MedLife Titan / Clinica Pallady', distanta: '8 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente noi Titan Pallady — Neofort 84 | Neofort IMO',
    seoDescription: 'Ansamblu rezidential Neofort 84 Titan Pallady, Sector 3 Bucuresti. Apartamente 2-4 camere de la 62.114 euro+TVA. Predare T1 2027, langa metrou Nicolae Teclu.',
  },
  {
    slug: 'neofort-83-titan-pallady',
    numar: 83,
    nume: 'Neofort 83 Titan Pallady',
    zona: 'Titan-Pallady',
    sector: 'Sector 3',
    adresa: 'Zona Titan-Pallady, Sector 3, Bucuresti',
    status: 'constructie',
    dataPredare: 'In curand',
    pretDeLa: 64800,
    etaje: 'D+P+3E',
    telefon: '0759 030 367',
    broker: 'Ramona BAICU',
    brokerFoto: '/brokeri/ramona-baicu.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 83 Faza 2 se situează în zona Titan, Sectorul 3 din București, la 3 minute de mers pe jos de stația de metrou Nicolae Teclu (linia M2) — un avantaj competitiv extrem de valoros care transformă accesul zilnic la transport public dintr-o facilitate în certitudine.

Proiectul este structurat în trei corpuri de clădire cu regim D+P+3E, formând un complex rezidențial echilibrat cu spații verzi amenajate între corpuri, zone de promenadă și locuri de joacă dedicate copiilor. Liftul silențios este prezent în fiecare corp de clădire.

Oferta tipologică acoperă un spectru larg: garsoniere de la 64.800€, studiouri, apartamente de 2, 3 și 4 camere — toate predate la cheie cu finisaje de calitate. Structura pe radier general cu pereți din beton armat și compartimentări BCA asigură rezistența seismică necesară.

Dotările tehnice ale Neofort 83 se situează clar în segmentul superior față de oferta standard din zonă. Centrala proprie în condensare reduce semnificativ consumul de energie față de centralele clasice. Fațada ventilată cu izolație din vată minerală bazaltică — superioară polistirenului clasic atât termic cât și fonic — conferă clădirii durabilitate și performanță pe termen lung. Tâmplăria Salamander negru structurat cu geam tripan, kit-ul de aer condiționat preinstalat, obiectele sanitare suspendate și ușa metalică multipunct antiefracție definesc standardul Neofort 83.

Zona Titan-Pallady concentrează o ofertă comercială completă: IKEA Pallady, Auchan Titan, Jumbo, Metro, Leroy Merlin și Dedeman Pallady la 5-8 minute cu mașina. Waldorf București și Spectrum School la 500m, Școala Gimnazială nr. 149 și Liceul Internațional de Informatică la 10 minute pe jos, Campus Medical Regina Maria Titan și MedLife Titan la 8-10 minute, Parcul Teilor la 10 minute.

Metrou Nicolae Teclu la 3 minute înseamnă că centrul Bucureștiului este la 15 minute, zona de business Floreasca-Barbu Văcărescu la 20 minute, aeroportul Henri Coandă la 35 minute. Metroul Anghel Saligny la 8 minute extinde conexiunile spre zona de vest a capitalei. Neofort 83 este prima alegere pentru familii cu copii care prioritizează educația, tineri profesioniști conectați la metrou și investitori care caută randament în chirie în cea mai activă zonă de creștere din Sectorul 3.`,
    brokerTel: '0759 030 367',
    coordonate: { lat: 44.4260, lng: 26.1720 },
    zone: ['titan-pallady', 'sector-3'],
    tipuri: ['Garsoniera', 'Studio', '2 camere', '3 camere', '4 camere'],
    descriere: 'Ansamblul Rezidențial Neofort 83 Faza 2, zona Titan, Sector 3. Trei corpuri D+P+3E cu lift, garsoniere, studiouri, apartamente 2-4 camere de la 64.800€+TVA. Metrou Nicolae Teclu la 3 minute. Centrală condensare, fațadă ventilată, izolație vată minerală bazaltică, tâmplărie Salamander negru structurat. Predat la cheie.',
    apartamente: [
      { tip: 'Garsoniera', etaj: 'et. 1-3', suprafata: 43.42, avans20: 64800, avans45: null, promo: false, camere: 1 },
      { tip: 'Studio 2 camere', etaj: 'et. 1-3', suprafata: 56.12, avans20: 84180, avans45: null, promo: false, camere: 2 },
      { tip: '2 camere', etaj: 'et. 1-3', suprafata: 69.91, avans20: 104865, avans45: null, promo: false, camere: 2 },
      { tip: '3 camere', etaj: 'et. 1-3', suprafata: 74.91, avans20: 112365, avans45: null, promo: false, camere: 3 },
      { tip: '4 camere', etaj: 'et. 1-3', suprafata: 100.63, avans20: 150945, avans45: null, promo: false, camere: 4 },
    ],
    parcare: { exterior: { disponibil: true, pret: 9000, notaTVA: 'TVA inclus' }, interior: { disponibil: true, pret: 13000, notaTVA: 'TVA inclus' }, subteran: { disponibil: false, pret: null } },
    dotari: ['Centrala proprie in condensare', 'Incalzire prin pardoseala', 'Obiecte sanitare suspendate', 'Tamplarie Salamander negru structurat', 'Kit aer conditionat', 'Usa metalica multipunct antiefractie', 'Fatada ventilata', 'Izolatie vata minerala bazaltica', 'Lift silentios'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Nicolae Teclu (M2)', distanta: '3 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Anghel Saligny (M2)', distanta: '8 min pe jos' },
      { tip: 'mall', nume: 'IKEA Pallady', distanta: '5 min cu mașina' },
      { tip: 'mall', nume: 'Auchan Titan', distanta: '7 min cu mașina' },
      { tip: 'mall', nume: 'Jumbo Pallady', distanta: '6 min cu mașina' },
      { tip: 'mall', nume: 'Leroy Merlin / Metro / Dedeman Pallady', distanta: '8 min cu mașina' },
      { tip: 'scoala', nume: 'Waldorf & Spectrum School', distanta: '500m' },
      { tip: 'scoala', nume: 'Școala Gimnazială nr. 149', distanta: '10 min pe jos' },
      { tip: 'scoala', nume: 'Liceul International de Informatică', distanta: '10 min' },
      { tip: 'parc', nume: 'Parcul Teilor', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Campus Medical Regina Maria Titan', distanta: '10 min' },
      { tip: 'medical', nume: 'Medikali Titan / MedLife Titan', distanta: '8 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Titan Pallady | Neofort 83',
    seoDescription: 'Neofort 83 Faza 2, zona Titan, Sector 3. Garsoniere, studio, 2-4 camere de la 64.800€+TVA. Metrou Nicolae Teclu 3 min.',
  },
  {
    slug: 'neofort-78-mosilor-eminescu',
    numar: 78,
    nume: 'Neofort 78 Mosilor-Eminescu',
    zona: 'Mosilor-Eminescu',
    sector: 'Sector 2',
    adresa: 'Strada Ardeleni, Zona Mosilor-Eminescu, Sector 2, Bucuresti',
    status: 'constructie',
    dataPredare: 'Mai 2026',
    pretDeLa: 185000,
    etaje: 'S+P+4ET+5R+6R+7R',
    telefon: '0752 443 434',
    broker: 'Svetlana CALUTU',
    brokerFoto: '/brokeri/svetlana-calutu.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 78 Faza 2 este un proiect boutique premium de excepție: 22 de apartamente pe strada Ardeleni, zona Moșilor-Eminescu, Sectorul 2 din București, la numai 400 de metri de stația de metrou Piața Obor (linia M2). O raritate în piața imobiliară actuală — dimensiunea mică, calitatea finisajelor Premium-Lux și localizarea semicentrală cu metrou la 400m creează o propunere de valoare greu de replicat.

Regimul de înălțime S+P+4ET+5R+6R+7R asigură varietate tipologică și priveliști deosebite din etajele superioare. Apartamentele de la parter dispun de grădini proprii — un element extrem de rar în oferta de apartamente noi din București — iar unitățile de la etajele superioare au terase generoase.

Finisajele sunt în clasa Premium-Lux și nu lasă loc de compromis: parchet din stejar stratificat de înaltă calitate, ceramică Italia în băi și spații comune, obiecte sanitare Rocca cu accesorii HansGrohe — unul dintre brandurile de top mondial în armături sanitare, tâmplărie Salamander Blue Edition cu geam tripan și tratament special, uși PINUM Italia, accesorii electrice BTicino Premium. Fațada ventilată din alucobond și fibrociment conferă clădirii un aspect contemporan și durabil. Sistemul de încălzire în pardoseală Tecce Germania, liftul Kone pentru 4 persoane, videointerfon cu supraveghere video și fibra optică Internet/TV completează dotările acestui proiect de excepție.

Predarea este estimată pentru Mai 2026, cu prețuri de la 185.000€ + TVA — un preț justificat integral de calitatea finisajelor, localizarea la 400m de metrou Piața Obor și raritatea unui proiect de această dimensiune în zona semicentrală a Sectorului 2.

Zona Moșilor-Eminescu are un caracter urban autentic, cu personalitate aparte: Piața Obor la 400m — cel mai mare complex comercial open-air din București, Mega Mall Pantelimon la 10 minute, Colegiul Național Mihai Eminescu și Liceul Teoretic Dimitrie Bolintineanu la 5-10 minute pe jos, Parcul Circului și Parcul Ioanid în proximitate, Spitalul Clinic Colentina și MedLife Obor la 10 minute, Autogara Obor la 400m.

Accesul în centrul Bucureștiului este rapid: metrou M2 de la Piața Obor spre Piața Universității în 5 minute. Tramvaie și linii STB multiple asigură conectivitate în toate direcțiile. Neofort 78 Faza 2 este adresat cumpărătorilor care înțeleg că finisajele Premium-Lux și un proiect boutique cu grădini private valorează semnificativ mai mult pe termen lung.`,
    brokerTel: '0752 443 434',
    coordonate: { lat: 44.4410, lng: 26.1050 },
    zone: ['mosilor-eminescu', 'eminescu-viitorului', 'sector-2'],
    tipuri: ['2 camere', '3 camere', '4 camere'],
    descriere: 'Ansamblul Rezidențial Neofort 78 Faza 2, zona Moșilor-Eminescu, str. Ardeleni, Sector 2. 22 apartamente premium 2-4 camere de la 185.000€+TVA, cu grădini la parter și terase generoase. Metrou Piața Obor la 400m. Parchet stejar, ceramică Italia, obiecte sanitare Rocca-HansGrohe, tâmplărie Salamander Blue Edition, lift Kone.',
    apartamente: [
      { tip: '2 cam. Tip 8', etaj: 'et. 1-7', suprafata: 58.10, avans20: 185000, avans45: null, promo: false, camere: 2 },
      { tip: '2 cam. Tip 14', etaj: 'et. 1-7', suprafata: 63.40, avans20: 199000, avans45: null, promo: false, camere: 2 },
      { tip: '3 cam. Tip 5', etaj: 'et. 1-7', suprafata: 81.40, avans20: 280000, avans45: null, promo: false, camere: 3 },
      { tip: '3 cam. Tip 18', etaj: 'et. 1-7', suprafata: 84.00, avans20: 300000, avans45: null, promo: false, camere: 3 },
      { tip: '3 cam. cu gradina', etaj: 'parter', suprafata: 194.20, avans20: 399000, avans45: null, promo: false, camere: 3 },
      { tip: '4 cam. Duplex Tip 15', etaj: 'et. 5-6', suprafata: 130.30, avans20: 495000, avans45: null, promo: false, camere: 4 },
    ],
    parcare: { exterior: { disponibil: false, pret: null }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: 30000, notaTVA: '+TVA' } },
    dotari: ['Incalzire in pardoseala Tecce Germania', 'Centrala termica in condensatie', 'Tamplarie Salamander Blue Edition tripan', 'Lift Kone 4 persoane', 'Ceramica Italia bai si parti comune', 'Parchet stejar stratificat', 'Usi PINUM Italia', 'Obiecte sanitare Rocca / HansGrohe', 'Accesorii electrice BTicino Premium', 'Fatada ventilata alucobond+fibrociment', 'Videointerfon si supraveghere video', 'Internet/TV fibra optica'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Piața Obor (M2)', distanta: '400m / 5 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Iancului (M2)', distanta: '15 min pe jos' },
      { tip: 'mall', nume: 'Mega Mall Pantelimon', distanta: '10 min cu mașina' },
      { tip: 'mall', nume: 'Piața Obor (cel mai mare complex Obor)', distanta: '400m' },
      { tip: 'scoala', nume: 'Colegiul Național Mihai Eminescu', distanta: '5 min pe jos' },
      { tip: 'scoala', nume: 'Liceul Teoretic Dimitrie Bolintineanu', distanta: '10 min' },
      { tip: 'scoala', nume: 'Grădinița nr. 54 / nr. 82', distanta: '5 min pe jos' },
      { tip: 'parc', nume: 'Parcul Circului', distanta: '10 min pe jos' },
      { tip: 'parc', nume: 'Parcul Ioanid', distanta: '15 min pe jos' },
      { tip: 'medical', nume: 'Spital Clinic Colentina', distanta: '10 min' },
      { tip: 'medical', nume: 'MedLife Obor / Regina Maria', distanta: '5 min' },
      { tip: 'transport', nume: 'Autogara Obor / STB multiple linii', distanta: '400m' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Moșilor-Obor | Neofort 78',
    seoDescription: 'Neofort 78, str. Ardeleni, Sector 2. 22 apartamente premium 2-4 camere de la 185.000€+TVA. Metrou Piața Obor 400m.',
  },
  {
    slug: 'neofort-76-iuliu-maniu-metrou-pacii',
    numar: 76,
    nume: 'Neofort 76 Iuliu Maniu Metrou Pacii',
    zona: 'Militari',
    sector: 'Sector 6',
    adresa: 'Bulevardul Iuliu Maniu, Sector 6, Bucuresti',
    status: 'constructie',
    dataPredare: 'In curand',
    pretDeLa: 218409,
    etaje: 'S+P+7E+8/9Er',
    telefon: '0759 030 367',
    broker: 'Ramona BAICU',
    brokerFoto: '/brokeri/ramona-baicu.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 76 Faza 2 este amplasat pe Bulevardul Iuliu Maniu, artera principală a zonei Militari, Sectorul 6, la 500 de metri de stația de metrou Păcii (linia M3) — una dintre cele mai frecventate stații din rețeaua de metrou a Bucureștiului, cu acces direct spre Piața Unirii în 8 minute și spre Drumul Taberei în 5 minute.

Regimul de înălțime S+P+7E+8/9Etaj retras oferă clădirii o arhitectură distinctivă, cu etajele superioare retrase creând terase generoase pentru apartamentele Penthouse. Proiectul include apartamente de 2 camere, 3 camere și 4 camere tip Penthouse, cu suprafețe semnificative și vedere panoramică din etajele 8-9. Prețuri de la 218.409€ + TVA pentru unitățile Penthouse.

Specificațiile tehnice sunt de nivel superior: structura din beton armat antiSEismică certificată, apartamente complet finisate la cheie, încălzire în pardoseală în toate spațiile, contorizare individuală apă-gaz-electricitate, dotări tehnice de top și sistemul inovator de parcare Klaus — o soluție mecanizată care maximizează numărul locurilor de parcare în spațiul disponibil, la prețul de 10.000€ TVA inclus. Boxele de la subsol sunt disponibile tot la 10.000€ TVA inclus.

Bulevardul Iuliu Maniu este o arteră cu toate facilitățile la îndemână: conexiune directă cu centrul Capitalei prin M3 de la Metrou Păcii, Metrou Preciziei la 900m, Metrou Gorjului la 15 minute pe jos pentru acces spre zona de vest și spre A1. Plaza Romania la 10 minute cu mașina, Militari Shopping Center la 8 minute, BricoDepot Militari la 10 minute asigură toate opțiunile comerciale.

Parcul Liniei — cel mai lung parc liniar din Europa cu cei 10 kilometri ai săi de alei pietonale, ciclistice și spații verzi amenajate — se află la 10 minute pe jos. Școala Internațională King George, Școala Gimnazială Regina Maria și Grădinița Prichindel nr. 195 acoperă nevoile educaționale. Sanador Militari, OK Medical și Clinica Regina Maria Militari asigură accesul rapid la servicii medicale de calitate.

Zona Militari-Iuliu Maniu a cunoscut o transformare semnificativă în ultimii ani, cu investiții majore în infrastructura de metrou și în regenerarea urbană. Prețul de la 218.409€ + TVA pentru apartamentele Penthouse reflectă valoarea unui proiect cu vedere panoramică, pe o arteră principală, la 500m de metrou.`,
    brokerTel: '0759 030 367',
    coordonate: { lat: 44.4320, lng: 26.0100 },
    zone: ['militari', 'sector-6'],
    tipuri: ['2 camere', '3 camere', '4 camere Penthouse'],
    descriere: 'Ansamblul Rezidențial Neofort 76 Faza 2, Bulevardul Iuliu Maniu, Sector 6. Regim S+P+7E+8/9Er, apartamente 2-3 camere și Penthouse de la 218.409€+TVA. Metrou Păcii la 500m, Metrou Preciziei la 900m. Parcare sistem Klaus, finisaje la cheie, încălzire pardoseală, structură antisismică.',
    apartamente: [
      { tip: 'Penthouse 4 cam. + Terasa', etaj: 'et. 8-9', suprafata: 276.98, avans20: 218409, avans45: null, promo: false, camere: 4 },
    ],
    parcare: { exterior: { disponibil: false, pret: null }, interior: { disponibil: true, pret: 10000, notaTVA: 'TVA inclus' }, subteran: { disponibil: false, pret: null } },
    dotari: ['Apartamente complet finisate la cheie', 'Incalzire in pardoseala', 'Contorizare individuala', 'Dotari tehnice de top', 'Structura beton armat antisezmica', 'Parcare sistem Klaus'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Păcii (M3)', distanta: '500m / 6 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Preciziei (M3)', distanta: '900m / 11 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Gorjului (M3)', distanta: '15 min pe jos' },
      { tip: 'mall', nume: 'Plaza Romania', distanta: '10 min cu mașina' },
      { tip: 'mall', nume: 'Militari Shopping Center', distanta: '8 min cu mașina' },
      { tip: 'mall', nume: 'BricoDepot Militari', distanta: '10 min cu mașina' },
      { tip: 'scoala', nume: 'Scoala Internațională King George', distanta: '10 min' },
      { tip: 'scoala', nume: 'Școala Gimnazială Regina Maria', distanta: '8 min' },
      { tip: 'scoala', nume: 'Grădinița nr. 195 Prichindel', distanta: '5 min' },
      { tip: 'parc', nume: 'Parcul Liniei (cel mai lung parc liniar din Europa)', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Sanador Militari / OK Medical', distanta: '8 min' },
      { tip: 'medical', nume: 'Clinica Regina Maria Militari', distanta: '10 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Militari Metrou Păcii | N76',
    seoDescription: 'Neofort 76, Bd. Iuliu Maniu, Sector 6. Apartamente și Penthouse de la 218.409€+TVA. Metrou Păcii 500m.',
  },
  {
    slug: 'neofort-56-pallady-titan-teclu',
    numar: 56,
    nume: 'Neofort 56 Pallady Titan',
    zona: 'Titan-Pallady',
    sector: 'Sector 3',
    adresa: 'Zona Titan Nou, Sector 3, Bucuresti',
    status: 'constructie',
    dataPredare: 'In curand',
    pretDeLa: 184691,
    etaje: 'D+P+3E',
    telefon: '0759 030 367',
    broker: 'Ramona BAICU',
    brokerFoto: '/brokeri/ramona-baicu.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 56 Faza 2 se situează în zona Titan Nou, Sectorul 3 din București, la 3 minute de mers pe jos de stația de metrou Nicolae Teclu (linia M2). Cu prețuri de la 184.691€ + TVA și un nivel de dotare rar întâlnit în Sectorul 3, Neofort 56 Faza 2 redefinește standardul apartamentelor noi din zona Titan-Pallady.

Complexul este format din trei blocuri D+P+3E, totalizând 84 de unități: studiouri moderne, apartamente de 2, 3 și 4 camere, inclusiv unități cu curte proprie la parter. Diversitatea tipologiei și curțile private reprezintă avantaje competitive clare față de oferta standard din zonă.

Neofort 56 Faza 2 este primul proiect Neofort IMO cu dotare Smart Home Ready integrată în standardul de bază: sistemul permite controlul temperaturii din aplicație, integrarea cu dispozitive smart și pregătirea completă pentru automatizarea casei fără costuri suplimentare. Centrala termică proprie în condensare asigură eficiență energetică maximă. Tâmplăria VEKA tripan cu 7 camere de izolare este una dintre cele mai performante disponibile pe piața românească. Obiectele sanitare suspendate Grohe, prizele Gewiss, liftul silențios Schindler și balustradele din sticlă securizată completează dotările de top.

Stațiile de încărcare pentru autoturisme electrice în parcare și supravegherea video a spațiilor comune sunt incluse standard — dovada orientării proiectului spre viitor și spre rezidenții care gândesc pe termen lung.

Zona Titan-Pallady oferă cea mai densă concentrare de retail mare din estul Bucureștiului: IKEA Pallady la 5 minute, Auchan Titan la 7 minute, Jumbo, Metro, Leroy Merlin și Dedeman Pallady la 8 minute. Waldorf București și Spectrum School la 500m, Parcul Teilor la 10 minute pe jos, Campus Medical Regina Maria Titan și MedLife Titan la 8-10 minute asigură confortul complet al locuirii.

Conectivitatea prin transport public este excepțională: metrou M2 cu două stații accesibile pe jos — Nicolae Teclu la 3 minute și Anghel Saligny la 8 minute — plus linii STB multiple. Neofort 56 Faza 2 este alegerea ideală pentru profesioniști tehnici și familii moderne care apreciază tehnologia Smart Home, sustenabilitatea și calitatea finisajelor premium.`,
    brokerTel: '0759 030 367',
    coordonate: { lat: 44.4250, lng: 26.1680 },
    zone: ['titan-pallady', 'sector-3'],
    tipuri: ['Studio', '2 camere', '3 camere', '4 camere'],
    descriere: 'Ansamblul Rezidențial Neofort 56 Faza 2, zona Titan Nou, Sector 3. Trei blocuri D+P+3E, 84 unități. Studiouri și apartamente 2-4 camere de la 184.691€+TVA. Metrou Nicolae Teclu la 3 minute. Smart Home Ready, tâmplărie VEKA tripan 7 camere, obiecte sanitare Grohe, lift Schindler, stații încărcare auto electric.',
    apartamente: [
      { tip: '4 cam.', etaj: 'et. 1-3', suprafata: 125.64, avans20: 184691, avans45: null, promo: false, camere: 4 },
      { tip: '4 cam. cu curte', etaj: 'parter', suprafata: 133.54, avans20: 235208, avans45: null, promo: true, camere: 4 },
    ],
    parcare: { exterior: { disponibil: true, pret: 8900, notaTVA: 'TVA inclus' }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: 8900, notaTVA: 'TVA inclus' } },
    dotari: ['Incalzire prin pardoseala INNOFLOW', 'Smart Home Ready', 'Centrala termica proprie in condensare', 'Tamplarie VEKA tripan 7 camere', 'Kit aer conditionat preinstalat', 'Obiecte sanitare suspendate Grohe', 'Prize Gewiss', 'Lift silentios Schindler', 'Balustrade sticla securizata', 'Statii incarcare auto electrica', 'Supraveghere video spatii comune'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Nicolae Teclu (M2)', distanta: '3 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Anghel Saligny (M2)', distanta: '8 min pe jos' },
      { tip: 'mall', nume: 'IKEA Pallady', distanta: '5 min cu mașina' },
      { tip: 'mall', nume: 'Auchan Titan', distanta: '7 min cu mașina' },
      { tip: 'mall', nume: 'Jumbo Pallady', distanta: '6 min cu mașina' },
      { tip: 'mall', nume: 'Leroy Merlin / Metro / Dedeman Pallady', distanta: '8 min cu mașina' },
      { tip: 'scoala', nume: 'Waldorf & Spectrum School', distanta: '500m' },
      { tip: 'scoala', nume: 'Școala Gimnazială nr. 149', distanta: '10 min pe jos' },
      { tip: 'scoala', nume: 'Liceul International de Informatică', distanta: '10 min' },
      { tip: 'parc', nume: 'Parcul Teilor', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Campus Medical Regina Maria Titan', distanta: '10 min' },
      { tip: 'medical', nume: 'Medikali Titan / MedLife Titan', distanta: '8 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Titan Smart Home | Neofort 56',
    seoDescription: 'Neofort 56 Faza 2, Titan Nou, Sector 3. Studio, 2-4 camere de la 184.691€+TVA. Smart Home Ready, metrou Teclu 3 min.',
  },
  {
    slug: 'neofort-50-titan-parc-ior',
    numar: 50,
    nume: 'Neofort 50 Titan Parc IOR',
    zona: 'Titan-IOR',
    sector: 'Sector 3',
    adresa: 'Bulevardul 1 Decembrie 1918, Sector 3, Bucuresti',
    status: 'activ',
    dataPredare: 'Finalizat',
    pretDeLa: 142545,
    etaje: '2S+P+5E-6/11R',
    telefon: '0752 443 436',
    broker: 'Adrian PINTILIE',
    brokerFoto: '/brokeri/adrian-pintilie.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 50 Titan IOR este amplasat pe Bulevardul 1 Decembrie 1918, Sectorul 3 din București, cu ieșire directă la stația de metrou Costin Georgian (linia M2) — practic la un minut de mers pe jos. Această poziționare excepțională, combinată cu vecinătatea Parcului IOR (Parcul Titan) la 5 minute pe jos, creează una dintre cele mai valoroase localizări din portofoliul Neofort IMO.

Clădirea cu regim 2S+P+5E-6/11R impresionează prin ambiție arhitecturală și soluții tehnice de nivel superior: fundația pe piloți cu adâncime de 17 metri asigură stabilitatea maximă pe orice tip de teren, cele 4 lifturi ORONA KRONLIFT spatioase garantează mobilitate rapidă în clădire, iar cele 2 subsoluri cu parcări și boxe rezolvă complet necesarul de depozitare și parcare al rezidenților. Adăpostul ALA cu 3 ieșiri de salvare, autorizat ISU, completează standardele de siguranță ale proiectului. Spațiile comerciale de la parter și parcul de relaxare cu loc de joacă amenajat în incinta proprie sunt facilități rare în oferta de apartamente noi din Sectorul 3.

Dotările tehnice sunt din gamele superioare ale brandurilor de referință: vitrajele mari SALAMANDER tripan pentru lumină naturală maximă și izolație termică de top, uși PINUM și BENATI, obiecte sanitare ROCA, CERSANIT și GROHE, centrala SAUNIER DUVAL by VAILLANT de înaltă eficiență, termostatul wireless Smart pentru controlul inteligent al temperaturii și încălzirea în pardoseală în toate spațiile. Apartamente de 2 și 4 camere, prețuri de la 142.545€ + TVA.

Parcul IOR — unul dintre cele mai mari și mai complete parcuri din București, cu lac artificial, pârtie de schi artificială, piste de biciclete, terenuri sportive și facilități pentru întreaga familie — se află la 5 minute pe jos. Parcul Teilor și Parcul Titanii extind oferta de spații verzi. Auchan Titan la 5 minute cu mașina, IKEA Pallady la 10 minute, Piața Morarilor și Piața Minis la 5 minute pe jos pentru cumpărături zilnice.

Bulevardul 1 Decembrie 1918 — magistrala principală de transport a Sectorului 3 — asigură accesul la linii STB multiple și la rețeaua de transport urban. Metroul Costin Georgian la 1 minut și Metrou Nicolae Grigorescu la 10 minute pe jos oferă conectivitate completă. Liceul Nichita Stănescu și Grădinița nr. 70 sunt în proximitate pentru familii. Campus Medical Regina Maria acoperă nevoile medicale.

Neofort 50 Titan IOR este alegerea perfectă pentru cei care nu doresc să aleagă între accesul instant la metrou și bucuria unui parc la 5 minute.`,
    brokerTel: '0752 443 436',
    coordonate: { lat: 44.4180, lng: 26.1400 },
    zone: ['titan-pallady', 'sector-3'],
    tipuri: ['2 camere', '4 camere'],
    descriere: 'Ansamblul Rezidențial Neofort 50 Titan IOR, Bulevardul 1 Decembrie 1918, Sector 3. Imobil 11 etaje, 2 subsoluri, 4 lifturi ORONA. Apartamente 2 și 4 camere de la 142.545€+TVA. Metrou Costin Georgian la 1 minut, Parcul IOR la 5 minute. Fundație piloți 17m, termostat Smart, centrală Vaillant, încălzire pardoseală.',
    apartamente: [
      { tip: '2 cam. Scara 1', etaj: 'et. 1-5', suprafata: 73.10, avans20: 142545, avans45: null, promo: false, camere: 2 },
      { tip: '2 cam. cu terasa', etaj: 'et. 6', suprafata: 48.90, avans20: 144210, avans45: null, promo: false, camere: 2 },
      { tip: '2 cam. cu terasa mare', etaj: 'et. 10-11', suprafata: 56.40, avans20: 176904, avans45: null, promo: false, camere: 2 },
      { tip: '4 cam. cu terasa', etaj: 'et. 10-11', suprafata: 99.95, avans20: 255405, avans45: null, promo: true, camere: 4 },
    ],
    parcare: { exterior: { disponibil: true, pret: null }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: null } },
    dotari: ['4 lifturi spatioase ORONA', 'Parcari subterane si supraterane', 'Parc de relaxare cu loc de joaca', 'Structura antiseismica piloti adancime', 'Vitraje mari SALAMANDER tripan', 'Usi PINUM / BENATI', 'Sanitare ROCA / CERSANIT / GROHE', 'Centrala SAUNIER DUVAL by VAILLANT', 'Termostat wireless Smart', 'Incalzire in pardoseala'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Costin Georgian (M2)', distanta: 'acces direct / 1 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Nicolae Grigorescu (M2)', distanta: '10 min pe jos' },
      { tip: 'mall', nume: 'Auchan Titan', distanta: '5 min cu mașina' },
      { tip: 'mall', nume: 'IKEA Pallady', distanta: '10 min cu mașina' },
      { tip: 'mall', nume: 'Piața Morarilor / Piața Minis', distanta: '5 min pe jos' },
      { tip: 'parc', nume: 'Parcul IOR (Parc Titan)', distanta: '5 min pe jos' },
      { tip: 'parc', nume: 'Parcul Teilor', distanta: '10 min pe jos' },
      { tip: 'parc', nume: 'Parcul Titanii', distanta: '8 min pe jos' },
      { tip: 'scoala', nume: 'Liceul Nichita Stănescu', distanta: '5 min pe jos' },
      { tip: 'scoala', nume: 'Grădinița nr. 70', distanta: '5 min pe jos' },
      { tip: 'medical', nume: 'Campus Medical Regina Maria', distanta: '10 min' },
      { tip: 'transport', nume: 'Bd. 1 Decembrie 1918 — magistrală transport', distanta: 'în față' },
    ],
    galerie: [],
    seoTitle: 'Apartamente noi Titan Parc IOR — Neofort 50 | Neofort IMO',
    seoDescription: 'Ansamblu rezidential Neofort 50 Titan IOR, Bd. 1 Decembrie 1918, Sector 3 Bucuresti. Apartamente 2-4 camere de la 142.545 euro+TVA. Metrou Costin Georgian.',
  },
  {
    slug: 'neofort-49-militari-metrou-gorjului',
    numar: 49,
    nume: 'Neofort 49 Militari Metrou Gorjului',
    zona: 'Militari',
    sector: 'Sector 6',
    adresa: 'Strada Vistiernicul Stavrinos, Sector 6, Bucuresti',
    status: 'promotie',
    dataPredare: 'Finalizat',
    pretDeLa: 76974,
    etaje: 'S+P+3E',
    telefon: '0759 030 367',
    broker: 'Ramona BAICU',
    brokerFoto: '/brokeri/ramona-baicu.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 49 este amplasat pe Strada Vistiernicul Stavrinos, Sectorul 6 din București — un proiect boutique finalizat de 18 apartamente, cu o localizare remarcabilă la câteva minute de mers pe jos de stațiile de metrou Gorjului și Păcii din linia M3. Proiectul este disponibil în promoție, cu garsoniere și apartamente de 2 camere de la 76.974€ + TVA.

Dimensiunea compactă de 18 unități este un avantaj deliberat: comunitate restrânsă, cheltuieli comune gestionabile, calitate a vecinătăților superioară față de complexuri mari. Structura din beton armat C25/30 cu zidărie Porotherm 30cm și izolație EPS100 asigură rezistența și eficiența energetică la standarde superioare mediei pieței.

Dotările Neofort 49 depășesc semnificativ standardul obișnuit din Sectorul 6 la acest segment de preț: centrală proprie de apartament cu eficiență în condensare, încălzire prin pardoseală pentru confort termic uniform, tâmplărie Salamander negru structurat cu geam tripan, kit de aer condiționat preinstalat, baie complet echipată cu obiecte sanitare incastrabile suspendate, ușă metalică multipunct antiefracție cu sistem certificat și lift silențios. Totul la cheie, fără costuri suplimentare de finisare.

Metrou Gorjului și Metrou Păcii la câteva minute înseamnă acces direct pe linia M3 spre Piața Unirii în 10 minute, spre Drumul Taberei în 5 minute și spre centrul Capitalei rapid și fără trafic. Zona Militari beneficiază de infrastructura comercială completă: Plaza Romania la 10 minute cu mașina, Militari Shopping Center la 8 minute, BricoDepot Militari la 10 minute.

Parcul Liniei — cel mai lung parc liniar din Europa, cu 10 kilometri de alei și spații verzi — este la 10 minute pe jos. Școala Internațională King George și Școala Gimnazială Regina Maria asigură educație de calitate pentru familii. Sanador Militari, OK Medical și Clinica Regina Maria Militari oferă servicii medicale premium în proximitate.

Neofort 49 este ideal pentru prima locuință, pentru investiție în chirie în zona Militari — una dintre cele mai solicitate zone de închiriere din București datorită metrouluui — și pentru orice cumpărător care caută un proiect boutique finalizat, cu dotări superioare, la un preț competitiv.`,
    brokerTel: '0759 030 367',
    coordonate: { lat: 44.4300, lng: 26.0150 },
    zone: ['militari', 'sector-6'],
    tipuri: ['Garsoniera', '2 camere'],
    descriere: 'Ansamblul Rezidențial Neofort 49, Strada Vistiernicul Stavrinos, Sector 6. Proiect boutique 18 apartamente finalizat. Garsoniere și 2 camere de la 76.974€+TVA. Metrou Gorjului și Păcii la câteva minute. Centrală proprie, încălzire pardoseală, tâmplărie Salamander, kit aer condiționat, finisaje moderne la cheie.',
    apartamente: [
      { tip: 'Garsoniera', etaj: 'et. 1-3', suprafata: 38.90, avans20: 77800, avans45: null, promo: true, camere: 1, pretPromo: 76974 },
      { tip: '2 camere', etaj: 'et. 1-3', suprafata: 60.30, avans20: 120600, avans45: null, promo: true, camere: 2, pretPromo: 118947 },
    ],
    parcare: { exterior: { disponibil: false, pret: null }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: 15000, notaTVA: 'TVA inclus' } },
    dotari: ['Centrala proprie de apartament', 'Incalzire prin pardoseala', 'Tamplarie Salamander negru structurat', 'Kit aer conditionat', 'Baie complet echipata', 'Obiecte sanitare incastrabile suspendate', 'Usa metalica multipunct antiefractie', 'Lift silentios'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Gorjului (M3)', distanta: 'cateva minute pe jos' },
      { tip: 'metrou', nume: 'Metrou Păcii (M3)', distanta: 'cateva minute pe jos' },
      { tip: 'mall', nume: 'Plaza Romania', distanta: '10 min cu mașina' },
      { tip: 'mall', nume: 'Militari Shopping Center', distanta: '8 min cu mașina' },
      { tip: 'mall', nume: 'BricoDepot Militari', distanta: '10 min cu mașina' },
      { tip: 'scoala', nume: 'Școala Internațională King George', distanta: '10 min' },
      { tip: 'scoala', nume: 'Școala Gimnazială Regina Maria', distanta: '8 min' },
      { tip: 'parc', nume: 'Parcul Liniei', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Sanador Militari / OK Medical', distanta: '8 min' },
      { tip: 'medical', nume: 'Clinica Regina Maria Militari', distanta: '10 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Militari | Neofort 49 Promo',
    seoDescription: 'Neofort 49, Sector 6. Garsoniere și 2 camere de la 76.974€+TVA. Promoție activă. Metrou Gorjului câteva minute.',
  },
  {
    slug: 'neofort-44-titan-pallady-teclu',
    numar: 44,
    nume: 'Neofort 44 Titan Pallady Teclu',
    zona: 'Titan-Pallady',
    sector: 'Sector 3',
    adresa: 'Zona Titan-Theodor Pallady, Sector 3, Bucuresti',
    status: 'activ',
    dataPredare: 'Finalizat',
    pretDeLa: 61775,
    etaje: 'Ds+3E+4Er',
    telefon: '0759 030 367',
    broker: 'Ramona BAICU',
    brokerFoto: '/brokeri/ramona-baicu.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 44 este amplasat în cartierul Titan-Theodor Pallady, Sectorul 3 din București, cu acces direct la stația de metrou Nicolae Teclu (linia M2) la câteva minute de mers pe jos. Cu prețuri de la 61.775€ + TVA, Neofort 44 oferă unul dintre cele mai bune rapoarte calitate-preț din Sectorul 3 — un proiect finalizat, disponibil imediat, cu dotări complete superioare mediei pieței.

Complexul format din 3 corpuri de clădire cu regim Ds+3E+4Er totalizează 84 de apartamente: garsoniere, apartamente de 2 și 3 camere, inclusiv unități cu terase generoase la etajele retrase. Structura din beton armat cu zidărie BCA Ytong 30cm și termosistem EPS80 de 10cm asigură calitatea constructivă necesară pe termen lung.

Dotările sunt complete și fără compromis: centrala termică proprie 24kW în condensare pentru eficiență energetică maximă și facturi reduse la gaz, încălzire prin pardoseală în toate camerele pentru confort termic uniform, tâmplărie Salamander pentru izolație fonică și termică de calitate, instalații sanitare, electrice și termice complete cu obiecte sanitare suspendate, ceramică de import antiderapantă pe balcoane și terase și uși metalice antiefracție multipunct pentru siguranță maximă.

Zona Titan-Pallady oferă infrastructura urbană completă: IKEA Pallady, Auchan Titan, Jumbo, Metro, Leroy Merlin și Dedeman Pallady la 5-8 minute cu mașina pentru toate nevoile de retail. Waldorf București și Spectrum School la 500m, Școala Gimnazială nr. 149 la 10 minute pe jos, Parcul Teilor la 10 minute pentru relaxare, Campus Medical Regina Maria Titan și MedLife Titan la 8-10 minute pentru servicii medicale de calitate.

Metroul Nicolae Teclu la câteva minute și Anghel Saligny la 8 minute asigură conectivitate rapidă cu întreg Bucureștiul. Linii STB multiple pe traseele principale completează rețeaua de transport public. Zona continuă să se dezvolte cu investiții semnificative în infrastructură.

Neofort 44 este alegerea ideală pentru familii tinere care caută primul apartament nou la un preț accesibil în Sectorul 3, investitori care înțeleg potențialul de randament al zonei Titan-Pallady și orice cumpărător care prioritizează disponibilitatea imediată și raportul excepțional calitate-preț.`,
    brokerTel: '0759 030 367',
    coordonate: { lat: 44.4255, lng: 26.1690 },
    zone: ['titan-pallady', 'sector-3'],
    tipuri: ['Garsoniera', '2 camere', '3 camere'],
    descriere: 'Ansamblul Rezidențial Neofort 44, zona Titan-Pallady, Sector 3. Trei corpuri Ds+3E+4Er, 84 apartamente. Garsoniere, 2 și 3 camere de la 61.775€+TVA. Metrou Nicolae Teclu la câteva minute. Centrală 24kW condensare, încălzire pardoseală, tâmplărie Salamander, uși metalice antiefracție. Finalizat, disponibil imediat.',
    apartamente: [
      { tip: 'Garsoniera', etaj: 'et. 1-3', suprafata: 38.61, avans20: 61775, avans45: null, promo: false, camere: 1 },
      { tip: '2 camere', etaj: 'et. 1-3', suprafata: 62.63, avans20: 100208, avans45: null, promo: false, camere: 2 },
      { tip: '3 camere', etaj: 'et. 1-3', suprafata: 86.20, avans20: 137919, avans45: null, promo: false, camere: 3 },
      { tip: '3 camere cu terasa', etaj: 'et. 3-4', suprafata: 157.87, avans20: 191960, avans45: null, promo: false, camere: 3 },
    ],
    parcare: { exterior: { disponibil: true, pret: 8000 }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: 8000 } },
    dotari: ['Centrala termica proprie 24kW in condensare', 'Incalzire prin pardoseala', 'Tamplarie Salamander', 'Instalatii sanitare, electrice si termice', 'Obiecte sanitare suspendate', 'Ceramica import antiderapanta balcoane/terase', 'Usi metalice antiefractie multipunct'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Nicolae Teclu (M2)', distanta: '3 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Anghel Saligny (M2)', distanta: '8 min pe jos' },
      { tip: 'mall', nume: 'IKEA Pallady', distanta: '5 min cu mașina' },
      { tip: 'mall', nume: 'Auchan Titan', distanta: '7 min cu mașina' },
      { tip: 'mall', nume: 'Jumbo Pallady', distanta: '6 min cu mașina' },
      { tip: 'mall', nume: 'Leroy Merlin / Metro / Dedeman Pallady', distanta: '8 min cu mașina' },
      { tip: 'scoala', nume: 'Waldorf & Spectrum School', distanta: '500m' },
      { tip: 'scoala', nume: 'Școala Gimnazială nr. 149', distanta: '10 min pe jos' },
      { tip: 'scoala', nume: 'Liceul International de Informatică', distanta: '10 min' },
      { tip: 'parc', nume: 'Parcul Teilor', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Campus Medical Regina Maria Titan', distanta: '10 min' },
      { tip: 'medical', nume: 'Medikali Titan / MedLife Titan', distanta: '8 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Titan Pallady | Neofort 44',
    seoDescription: 'Neofort 44, Titan-Pallady, Sector 3. Garsoniere, 2-3 camere de la 61.775€+TVA. Metrou Nicolae Teclu 3 min.',
  },
  {
    slug: 'neofort-42-piata-muncii',
    numar: 42,
    nume: 'Neofort 42 Piata Muncii',
    zona: 'Piata Muncii',
    sector: 'Sector 3',
    adresa: 'Strada Soldat Alexandru Magatti, Piata Muncii, Sector 3, Bucuresti',
    status: 'promotie',
    dataPredare: 'Finalizat',
    pretDeLa: 197056,
    etaje: 'S+P+4',
    telefon: '0757 077 057',
    broker: 'Sasha CALUTU',
    brokerFoto: '/brokeri/sasha-calutu.avif',
    descriereCompleta: `Ansamblul Rezidențial Premium Neofort 42 Piața Muncii este amplasat în Sectorul 3 din București, la 200 de metri de stația de metrou Piața Muncii (linia M3) și la 400 de metri de Parcul Național — o combinație de accesibilitate urbană maximă și spațiu verde în inima Capitalei.

Proiectul de 64 de apartamente cu regim S+P+4 a fost conceput ca o comunitate restrânsă și exclusivistă: dimensiunea controlată garantează calitatea relațiilor de vecinătate, gestionarea eficientă a cheltuielilor comune și un standard de locuire superior față de marile complexuri rezidențiale. Oferta se concentrează pe apartamente de 2 și 4 camere, cu prețuri de la 197.056€ + TVA.

Neofort 42 Piața Muncii introduce în standardul proiectului dotări verzi și smart care îl diferențiază clar de oferta generică: panouri solare și fotovoltaice integrate în clădire, stații de încărcare pentru autoturisme electrice în parcare, termostat wireless Smart în fiecare cameră, sistem de management energetic inteligent. Aceste investiții reduc semnificativ costurile operaționale pe termen lung și cresc atractivitatea proprietății pentru chiriași premium.

Construcția este la cel mai înalt nivel tehnic: fundație pe piloți forați cu radier general pentru stabilitate maximă, adăpost ALA autorizat ISU, 2 lifturi SCHINDLER de mare viteză, parcare subterană în sistemul inovator Klaus, tâmplărie SALAMANDER/VEKA tripan pentru izolație termică și fonică de top, uși PINUM/PORTA DOORS, centrală Buderus de înaltă eficiență, pardoseli din gresie și faianță Marazzi rectificată — unul dintre brandurile premium din ceramică, balustrade din sticlă securizată și încălzire în pardoseală în toate spațiile.

Metrou Piața Muncii la 200m înseamnă 2-3 minute de mers pe jos până la accesul direct pe M3, cu conexiune spre Piața Unirii în 4 minute. Metrou Dristor 2 la 10 minute pe jos extinde rețeaua de acces. Kaufland Popa Nan la 5 minute pe jos, Mega Image pe Calea Călărașilor la 5 minute, Parcul Național la 400m și Arena Națională la 5 minute pe jos sunt repere ale zonei.

Bazinul Olimpic Lia Manoliu la 5 minute pe jos este un avantaj rar — acces la o facilitate olimpică standard la câteva minute de acasă. Spitalul Victor Babeș, Spitalul Monza și Spitalul Clinic Copii Grigore Alexandrescu la 8-10 minute asigură servicii medicale de înaltă calitate. Colegiul Economic Costin C. Kirițescu și Liceul Tehnologic Petru Poni sunt în proximitate.

Neofort 42 Piața Muncii este adresat cumpărătorilor sofisticați care înțeleg că sustenabilitatea, tehnologia smart și localizarea premium lângă metrou sunt valorile care apreciază cel mai bine pe termen lung.`,
    brokerTel: '0757 077 057',
    coordonate: { lat: 44.4380, lng: 26.1250 },
    zone: ['piata-muncii', 'sector-3'],
    tipuri: ['2 camere', '4 camere'],
    descriere: 'Ansamblul Rezidențial Premium Neofort 42 Piața Muncii, Sector 3. 64 apartamente S+P+4. Apartamente 2 și 4 camere de la 197.056€+TVA. Metrou Piața Muncii la 200m, Parcul Național la 400m. Panouri solare și fotovoltaice, stații încărcare EV, 2 lifturi Schindler, tâmplărie Salamander tripan, finisaje Marazzi.',
    apartamente: [
      { tip: '2 cam. Tip 4', etaj: 'et. 1-4', suprafata: 61.58, avans20: 209372, avans45: null, promo: true, camere: 2, pretPromo: 197056 },
      { tip: '2 cam. Tip 5', etaj: 'et. 1-4', suprafata: 62.31, avans20: 212024, avans45: null, promo: true, camere: 2, pretPromo: 199392 },
      { tip: '2 cam. Tip 6', etaj: 'et. 1-4', suprafata: 63.47, avans20: 215798, avans45: null, promo: true, camere: 2, pretPromo: 203104 },
      { tip: '2 cam. Tip 7', etaj: 'et. 1-4', suprafata: 64.21, avans20: 218824, avans45: null, promo: true, camere: 2, pretPromo: 208672 },
      { tip: '4 cam. Tip 1', etaj: 'et. 1-4', suprafata: 139.20, avans20: 459360, avans45: null, promo: true, camere: 4, pretPromo: 445440 },
      { tip: '4 cam. Tip 2', etaj: 'et. 1-4', suprafata: 140.67, avans20: 464211, avans45: null, promo: true, camere: 4, pretPromo: 450144 },
    ],
    parcare: { exterior: { disponibil: false, pret: null }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: 22500, notaTVA: '+TVA' } },
    dotari: ['2 lifturi SCHINDLER', 'Parcare subterana sistem Klaus', 'Adapost ALA / autorizare ISU', 'Tamplarie SALAMANDER/VEKA tripan', 'Usi PINUM/PORTA DOORS', 'Centrala Buderus', 'Termostat wireless Smart', 'Panouri solare/fotovoltaice', 'Balustrade sticla securizata', 'Gresie/faianta Marazzi rectificata', 'Incalzire in pardoseala'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Piața Muncii (M3)', distanta: '200m / 3 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Dristor 2 (M3)', distanta: '10 min pe jos' },
      { tip: 'mall', nume: 'Kaufland Popa Nan', distanta: '5 min pe jos' },
      { tip: 'mall', nume: 'Mega Image Calea Călărașilor', distanta: '5 min pe jos' },
      { tip: 'parc', nume: 'Parcul Național (fost Parcul Carol)', distanta: '400m / 5 min pe jos' },
      { tip: 'parc', nume: 'Arena Națională', distanta: '5 min pe jos' },
      { tip: 'scoala', nume: 'Colegiul Economic Costin C. Kirițescu', distanta: '8 min pe jos' },
      { tip: 'scoala', nume: 'Liceul Tehnologic Petru Poni', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Spital Clinic Copii Grigore Alexandrescu', distanta: '10 min' },
      { tip: 'medical', nume: 'Spital Victor Babeș / Spital Monza', distanta: '8 min' },
      { tip: 'transport', nume: 'Autogara Filaret / STB multiple linii', distanta: '10 min' },
      { tip: 'sport', nume: 'Bazin Olimpic Lia Manoliu', distanta: '5 min pe jos' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Piața Muncii | Neofort 42',
    seoDescription: 'Neofort 42 premium, Sector 3. 2 și 4 camere de la 197.056€+TVA. Metrou Piața Muncii 200m. Promoție activă.',
  },
  {
    slug: 'neofort-28-titan-pallady-teclu',
    numar: 28,
    nume: 'Neofort 28 Titan Pallady Faza 4-5',
    zona: 'Titan-Pallady',
    sector: 'Sector 3',
    adresa: 'Zona Titan-Pallady, Sector 3, Bucuresti',
    status: 'activ',
    dataPredare: 'Finalizat',
    pretDeLa: 83900,
    etaje: 'D+P+4',
    telefon: '0752 443 437',
    broker: 'Adriana VESELU',
    brokerFoto: '/brokeri/adriana-veselu.avif',
    descriereCompleta: `Ansamblul Rezidențial Neofort 28 Fazele 4 și 5 este un proiect cu reputație consolidată în zona Titan-Pallady, Sectorul 3 din București, cu 53 de apartamente decomandate cu bucătării închise — 2 și 3 camere — disponibile la prețuri de la 83.900€ + TVA. Proiectul este finalizat și disponibil imediat.

Elementul cel mai distinct al Neofort 28 este oferta de apartamente cu curte proprie de aproximativ 50mp — o raritate absolută în piața apartamentelor noi din București. Curțile private transformă complet experiența de locuire, oferind spațiu exterior personal pentru relaxare, grădinărit sau joacă pentru copii, imposibil de găsit în apartamentele standard. Unele unități dispun de terasă în loc de curte, pentru varianta de la etajele superioare.

Incinta este împrejmuită cu acces controlat — un element de securitate și intimitate important pentru familiile cu copii. Videointerfon cu vedere nocturnă asigură supravegherea intrărilor 24/7.

Construcția este solidă și atent realizată: fundație radier general, structură din beton armat și zidărie cărămidă 30cm pentru izolație termică și fonică superioară. Tâmplăria Salamander tripan Low-E cu microventilație — un element tehnic important care asigură calitatea aerului interior prin ventilație naturală controlată, evitând condensul și mucegaiul. Ceramica Delta Studio, parchetul rezistent la trafic intens, băile complet echipate cu rezervor incastrat și centrala termică proprie completează dotările proiectului.

Metroul Nicolae Teclu la 3 minute pe jos este avantajul de mobilitate principal al amplasamentului. Anghel Saligny la 8 minute extinde accesul pe linia M2. Zona Titan-Pallady oferă infrastructura comercială completă: IKEA Pallady, Auchan Titan, Jumbo, Metro, Leroy Merlin și Dedeman Pallady la 5-8 minute cu mașina. Waldorf București și Spectrum School la 500m pentru familii cu copii, Parcul Teilor la 10 minute pentru relaxare, Campus Medical Regina Maria Titan și MedLife Titan la 8-10 minute.

Neofort 28 Fazele 4 și 5 este soluția perfectă pentru familii care apreciază spațiile exterioare private, securitatea incintei împrejmuite și calitatea constructivă superioară, într-un proiect finalizat în una dintre cele mai bine conectate zone din estul Bucureștiului.`,
    brokerTel: '0752 443 437',
    coordonate: { lat: 44.4262, lng: 26.1710 },
    zone: ['titan-pallady', 'sector-3'],
    tipuri: ['2 camere', '3 camere'],
    descriere: 'Ansamblul Rezidențial Neofort 28 Fazele 4 și 5, zona Titan-Pallady, Sector 3. 53 apartamente decomandate cu bucătării închise, 2 și 3 camere, de la 83.900€+TVA. Unele cu curte proprie 50mp. Metrou Nicolae Teclu la 3 minute. Tâmplărie Salamander tripan Low-E, ceramică Delta Studio, videointerfon, incintă împrejmuită acces controlat.',
    apartamente: [
      { tip: '2 cam. Tip 1', etaj: 'et. 1-4', suprafata: 59.80, avans20: 83900, avans45: null, promo: true, camere: 2 },
      { tip: '2 cam. Tip 2', etaj: 'et. 1-4', suprafata: 60.40, avans20: 84900, avans45: null, promo: true, camere: 2 },
      { tip: '2 cam. Tip 3', etaj: 'et. 1-4', suprafata: 60.90, avans20: 85500, avans45: null, promo: true, camere: 2 },
      { tip: '2 cam. Tip 4', etaj: 'et. 1-4', suprafata: 61.50, avans20: 86500, avans45: null, promo: true, camere: 2 },
      { tip: '2 cam. Tip 5', etaj: 'et. 1-4', suprafata: 65.15, avans20: 91900, avans45: null, promo: true, camere: 2 },
      { tip: '2 cam. Tip 6 cu curte', etaj: 'parter', suprafata: 61.55, avans20: 112900, avans45: null, promo: false, camere: 2 },
      { tip: '3 cam. Tip 1', etaj: 'et. 1-4', suprafata: 92.00, avans20: 128900, avans45: null, promo: false, camere: 3 },
      { tip: '3 cam. Tip 2 cu terasa', etaj: 'et. 3-4', suprafata: 105.00, avans20: 131900, avans45: null, promo: false, camere: 3 },
      { tip: '3 cam. Tip 3 cu curte', etaj: 'parter', suprafata: 86.65, avans20: 143500, avans45: null, promo: false, camere: 3 },
    ],
    parcare: { exterior: { disponibil: true, pret: 7500 }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: 11000 } },
    dotari: ['Incalzire in pardoseala', 'Centrala termica proprie', 'Tamplarie Salamander tripan Low-E microventilatie', 'Ceramica Delta Studio', 'Parchet rezistent trafic intens', 'Bai echipate complet rezervor incastrat', 'Videointerfon vedere nocturna', 'Incinta imprejmuita acces controlat'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Nicolae Teclu (M2)', distanta: '3 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Anghel Saligny (M2)', distanta: '8 min pe jos' },
      { tip: 'mall', nume: 'IKEA Pallady', distanta: '5 min cu mașina' },
      { tip: 'mall', nume: 'Auchan Titan', distanta: '7 min cu mașina' },
      { tip: 'mall', nume: 'Jumbo Pallady', distanta: '6 min cu mașina' },
      { tip: 'mall', nume: 'Leroy Merlin / Metro / Dedeman Pallady', distanta: '8 min cu mașina' },
      { tip: 'scoala', nume: 'Waldorf & Spectrum School', distanta: '500m' },
      { tip: 'scoala', nume: 'Școala Gimnazială nr. 149', distanta: '10 min pe jos' },
      { tip: 'scoala', nume: 'Liceul International de Informatică', distanta: '10 min' },
      { tip: 'parc', nume: 'Parcul Teilor', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Campus Medical Regina Maria Titan', distanta: '10 min' },
      { tip: 'medical', nume: 'Medikali Titan / MedLife Titan', distanta: '8 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Titan Pallady | Neofort 28',
    seoDescription: 'Neofort 28 Faza 4-5, Titan-Pallady, Sector 3. 2-3 camere de la 83.900€+TVA. Unele cu curte proprie 50mp.',
  },
  {
    slug: 'neofort-11-eminescu-viitorului',
    numar: 11,
    nume: 'Neofort 11 Eminescu Viitorului',
    zona: 'Eminescu-Viitorului',
    sector: 'Sector 2',
    adresa: 'Zona Eminescu-Viitorului, Sector 2, Bucuresti',
    status: 'constructie',
    dataPredare: 'Sept. 2026',
    pretDeLa: 104640,
    etaje: 'S+P+4E+5R',
    telefon: '0752 443 434',
    broker: 'Svetlana CALUTU',
    brokerFoto: '/brokeri/svetlana-calutu.avif',
    descriereCompleta: `Ansamblul Rezidențial Boutique Premium Neofort 11 este o propunere excepțională pentru segmentul de cumpărători care refuză compromisul: numai 13 apartamente în zona Eminescu-Viitorului, Sectorul 2 din București, cu finisaje de clasă superioară și predare estimată pentru Septembrie 2026.

Zona Eminescu-Viitorului are un caracter aparte în peisajul Bucureștiului — o zonă cu personalitate bohemă și autentică, cu arhitectură interbelică bine conservată, o comunitate educată și culturală, și o accesibilitate excelentă spre centrul capitalei. Caracterul rezidențial calm al zonei contrastează plăcut cu dinamismul urban din proximitate.

Regimul S+P+4E+5R cu structura dual diafragme + beton armat și pereți Porotherm 30cm reprezintă una dintre cele mai solide soluții constructive disponibile. Cei 30cm de zidărie Porotherm asigură o izolație fonică reală — nu simulată prin straturi subțiri de BCA — extrem de importantă într-un proiect compact de 13 unități.

Finisajele sunt în clasa Premium și nu lasă nicio concesie: gresie și faianță MARAZZI în băi și bucătărie, parchet Kronotex PREMIUM în living și dormitoare, uși blindate PINUM la intrare cu uși interioare PINUM, obiecte sanitare GROHE, HansGrohe și Kludi — branduri de referință internațională în sanitare și armături, centrală ARISTON 24kW în condensare pentru eficiență maximă, contorizare individuală completă apă-gaz-electricitate, preechipare aer condiționat și lift SCHINDLER silențios. Adăpostul ALA autorizat ISU și termoizolația EPS80 de 10cm completează standardul tehnic superior.

Tâmplăria Salamander 7 camere cu geam tripan reprezintă cel mai performant tip de tâmplărie disponibil pe piață, cu izolație termică de până la 0.8 W/m²K și izolație fonică de 45 dB — o diferență perceptibilă față de tâmplăriile standard cu 5 camere.

Tramvaiul Mihai Bravu cu linii STB multiple la 2 minute pe jos asigură conectivitate excelentă. Metroul Obor (M2) la 10 minute pe jos și Metrou Ștefan cel Mare la 12 minute conectează zona cu întreg Bucureștiul. Colegiul Național Iulia Hașdeu și Colegiul Național Mihai Eminescu la 5-8 minute, Grădinița Bambi la 3 minute pentru familii cu copii mici. Parcul Circului la 8 minute și Parcul Ioanid la 10 minute pentru recreere. Spitalul Clinic Colentina, MedLife, Regina Maria și Sanador la 10 minute pentru servicii medicale.

Neofort 11 se adresează direct cumpărătorilor pentru care calitatea finisajelor, dimensiunea mică a comunității și personalitatea zonei sunt mai importante decât prețul minim. Studio, garsonieră, 2 și 3 camere de la 104.640€ + TVA.`,
    brokerTel: '0752 443 434',
    coordonate: { lat: 44.4490, lng: 26.1080 },
    zone: ['eminescu-viitorului', 'mosilor-eminescu', 'sector-2'],
    tipuri: ['Studio', '2 camere', '3 camere'],
    descriere: 'Ansamblul Rezidențial Boutique Premium Neofort 11, zona Eminescu-Viitorului, Sector 2. Doar 13 apartamente S+P+4E+5R. Studio, garsonieră, 2 și 3 camere de la 104.640€+TVA. Predare Septembrie 2026. Finisaje premium: gresie MARAZZI, parchet Kronotex, obiecte sanitare GROHE/HansGrohe, centrală ARISTON 24kW, lift SCHINDLER.',
    apartamente: [
      { tip: 'Studio Garsoniera', etaj: 'et. 1-5', suprafata: 32.70, avans20: 104640, avans45: null, promo: false, camere: 1 },
      { tip: '2 cam. Tip 1', etaj: 'et. 1-5', suprafata: 60.40, avans20: 192000, avans45: null, promo: true, camere: 2, pretPromo: 176000 },
      { tip: '2 cam. Tip 2', etaj: 'et. 1-5', suprafata: 58.90, avans20: 192000, avans45: null, promo: true, camere: 2, pretPromo: 179000 },
      { tip: '2 cam. Tip 3', etaj: 'et. 1-5', suprafata: 59.10, avans20: 188800, avans45: null, promo: true, camere: 2, pretPromo: 183000 },
      { tip: '3 cam. Tip 1', etaj: 'et. 1-5', suprafata: 66.00, avans20: 210000, avans45: null, promo: true, camere: 3, pretPromo: 199000 },
      { tip: '3 cam. Tip 2', etaj: 'et. 1-5', suprafata: 90.30, avans20: 288000, avans45: null, promo: true, camere: 3, pretPromo: 280000 },
      { tip: '3 cam. Tip 3', etaj: 'et. 1-5', suprafata: 94.40, avans20: 301000, avans45: null, promo: true, camere: 3, pretPromo: 289000 },
      { tip: '3 cam. Tip 4', etaj: 'et. 1-5', suprafata: 94.20, avans20: 300000, avans45: null, promo: true, camere: 3, pretPromo: 289000 },
      { tip: '3 cam. Tip 5', etaj: 'et. 1-5', suprafata: 88.90, avans20: 284800, avans45: null, promo: false, camere: 3 },
    ],
    parcare: { exterior: { disponibil: false, pret: null }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: 25000 } },
    dotari: ['Usi PINUM blindate + interioare', 'Gresie/faianta MARAZZI', 'Parchet Kronotex PREMIUM', 'Obiecte sanitare GROHE/HansGrohe/Kludi', 'Centrala ARISTON 24kW in condensare', 'Incalzire in pardoseala', 'Contorizare individuala apa/gaz/electricitate', 'Preechipare aer conditionat', 'Lift SCHINDLER silentios', 'Adapost ALA / autorizare ISU', 'Termoizolatie EPS80 10cm', 'Tamplarie Salamander 7 camere tripan'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Obor (M2)', distanta: '10 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Ștefan cel Mare (M2)', distanta: '12 min pe jos' },
      { tip: 'mall', nume: 'Piața Obor', distanta: '15 min pe jos' },
      { tip: 'mall', nume: 'Mega Mall', distanta: '15 min cu mașina' },
      { tip: 'scoala', nume: 'Colegiul Național Iulia Hașdeu', distanta: '5 min pe jos' },
      { tip: 'scoala', nume: 'Colegiul Național Mihai Eminescu', distanta: '8 min pe jos' },
      { tip: 'scoala', nume: 'Grădinița Bambi', distanta: '3 min pe jos' },
      { tip: 'parc', nume: 'Parcul Circului', distanta: '8 min pe jos' },
      { tip: 'parc', nume: 'Parcul Ioanid', distanta: '10 min pe jos' },
      { tip: 'medical', nume: 'Spital Colentina', distanta: '10 min' },
      { tip: 'medical', nume: 'MedLife / Regina Maria / Sanador', distanta: '10 min' },
      { tip: 'transport', nume: 'Tramvai Mihai Bravu + linii STB multiple', distanta: '2 min pe jos' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Eminescu-Viitorului | N11',
    seoDescription: 'Neofort 11 boutique, Sector 2. 13 apartamente premium, 2-3 camere de la 104.640€+TVA. Predare sept. 2026.',
  },
  {
    slug: 'neofort-8-tepes-voda-muncii',
    numar: 8,
    nume: 'Neofort 8 Tepes Voda Muncii',
    zona: 'Tepes Voda-Muncii',
    sector: 'Sector 2',
    adresa: 'Zona Tepes Voda-Maior Coravu, Sector 2, Bucuresti',
    status: 'promotie',
    dataPredare: 'Ian. 2026',
    pretDeLa: 146000,
    etaje: 'S+P+2ET+M',
    telefon: '0752 443 434',
    broker: 'Svetlana CALUTU',
    brokerFoto: '/brokeri/svetlana-calutu.avif',
    descriereCompleta: `Ansamblul Rezidențial Boutique Exclusivist Neofort 8 este amplasat pe strada Maior Coravu din zona Tepeș Vodă-Muncii, Sectorul 2 din București — un proiect de 32 de apartamente finalizate, disponibil în promoție de la 146.000€ + TVA, în una dintre cele mai interesante localizări rezidențiale din centrul-estic al Capitalei.

Zona Tepeș Vodă-Muncii are un caracter rezidențial autentic, dominat de case și vile cu maximum 4 etaje — o raritate în București modern. Neofort 8 se înscrie natural în acest peisaj arhitectural, cu un proiect compact de 32 de unități care respectă scara umană a cartierului. Proiectul este inclus în planul de sistematizare Centrul Vechi Nou al Primăriei Sector 2 — o zonă cu investiții publice semnificative planificate și în curs de implementare, ceea ce susține aprecierea valorii proprietăților pe termen mediu și lung.

Clasa energetică A și fațada ventilată diferențiază clar Neofort 8 față de oferta standard la prețuri similare. Clasa energetică A înseamnă costuri operaționale semnificativ mai mici la energia termică, o valoare de prea puțini cumpărători înțeleasă la decizia de achiziție, dar cu impact real și permanent pe facturile lunare.

Arhitectura Neofort 8 iese deliberat din tiparele obișnuite: spații generoase cu înălțime peste standard față de normele curente, terase și grădini la parter pentru unitățile de la nivelul inferior, concepute ca extensii naturale ale spațiului de locuit. Diversitatea tipologică este completă: studio, apartamente de 2, 3 și 4 camere.

Dotările tehnice sunt din clasa premium: uși blindate PINUM la intrare cu uși interioare PINUM, gresie și faianță MARAZZI în toate băile și bucătăria, parchet Kronotex PREMIUM în spațiile de locuire, obiecte sanitare la alegere cu baterii Kludi de înaltă calitate, centrală în condensație Bosch 24kW pentru eficiență energetică maximă, încălzire în pardoseală în toate camerele, preechipare aer condiționat, parcare subterană cu lift, tâmplărie PVC Salamander 7 camere tripan și termoizolație EPS80 de 10cm pentru izolație superioară.

Metrou Piața Muncii la 500m — 6 minute de mers pe jos — oferă acces direct pe linia M3 spre Piața Unirii în 4 minute și spre Drumul Taberei în 8 minute. Metrou Dristor 1 la 12 minute pe jos extinde conexiunile spre Sectorul 2. Kaufland Popa Nan la 5 minute pe jos și Mega Image pe Calea Călărașilor la 3 minute acoperă cumpărăturile zilnice. Colegiul Național Matei Basarab și Liceul Teoretic Ion Barbu la 8-10 minute pe jos, Spitalul Clinic Victor Babeș la 8 minute, MedLife și Regina Maria zona Muncii la 8 minute. Parcul Național la 10 minute pe jos pentru recreere și sport în natură.

Neofort 8 este alegerea ideală pentru cumpărătorii care înțeleg că zona de case cu înălțime mică, clasa energetică A, finisajele premium și metrou la 500m reprezintă o combinație de valoare reală pe termen lung.`,
    brokerTel: '0752 443 434',
    coordonate: { lat: 44.4360, lng: 26.1200 },
    zone: ['tepes-voda-muncii', 'piata-muncii', 'sector-2'],
    tipuri: ['Studio', '2 camere', '3 camere', '4 camere'],
    descriere: 'Ansamblul Rezidențial Boutique Exclusivist Neofort 8, zona Tepeș Vodă-Muncii, Sector 2. 32 apartamente S+P+2ET+M finalizate, de la 146.000€+TVA. Studio, 2, 3 și 4 camere. Metrou Piața Muncii la 500m. Clasă energetică A, fațadă ventilată, centrală Bosch condensare, tâmplărie Salamander 7 camere, parchet Kronotex, uși PINUM.',
    apartamente: [
      { tip: 'Studio Garsoniera', etaj: 'et. 1-2', suprafata: 39.92, avans20: 146000, avans45: null, promo: false, camere: 1 },
      { tip: '2 cam. 8B', etaj: 'et. 1-2', suprafata: 67.80, avans20: 192000, avans45: null, promo: false, camere: 2 },
      { tip: '2 cam. 17B', etaj: 'et. 1-2', suprafata: 67.80, avans20: 217000, avans45: null, promo: true, camere: 2, pretPromo: 205000 },
      { tip: '2 cam. 14B', etaj: 'et. 1-2', suprafata: 64.10, avans20: 213000, avans45: null, promo: true, camere: 2, pretPromo: 176000 },
      { tip: '2 cam. 7B', etaj: 'et. 1-2', suprafata: 60.35, avans20: 210000, avans45: null, promo: true, camere: 2, pretPromo: 174000 },
      { tip: '2 cam. 20B', etaj: 'et. 1-2', suprafata: 62.80, avans20: 217000, avans45: null, promo: true, camere: 2, pretPromo: 205000 },
      { tip: '3 cam. 22B', etaj: 'et. 1-2', suprafata: 80.15, avans20: 265000, avans45: null, promo: false, camere: 3 },
      { tip: '3 cam. 4B', etaj: 'et. 1-2', suprafata: 113.60, avans20: 295000, avans45: null, promo: false, camere: 3 },
      { tip: '3 cam. 25B terasa', etaj: 'mansarda', suprafata: 148.80, avans20: 345000, avans45: null, promo: false, camere: 3 },
      { tip: '4 cam. 6B cu gradina', etaj: 'parter', suprafata: 237.83, avans20: 465000, avans45: null, promo: false, camere: 4 },
    ],
    parcare: { exterior: { disponibil: false, pret: null }, interior: { disponibil: false, pret: null }, subteran: { disponibil: true, pret: 25000 } },
    dotari: ['Usi blindate PINUM intrare + interioare', 'Gresie/faianta MARAZZI', 'Parchet Kronotex PREMIUM', 'Obiecte sanitare la alegere / baterii Kludi', 'Centrala 24kW in condensatie Bosch', 'Incalzire in pardoseala', 'Preechipare aer conditionat', 'Parcare subterana/lift', 'Tamplarie PVC Salamander 7 camere tripan', 'Termoizolatie EPS80 10cm', 'Fatada ventilata', 'Clasa energetica A'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Metrou Piața Muncii (M3)', distanta: '500m / 6 min pe jos' },
      { tip: 'metrou', nume: 'Metrou Dristor 1 (M3)', distanta: '12 min pe jos' },
      { tip: 'mall', nume: 'Kaufland Popa Nan', distanta: '5 min pe jos' },
      { tip: 'mall', nume: 'Mega Image Calea Călărașilor', distanta: '3 min pe jos' },
      { tip: 'parc', nume: 'Zona rezidențială case și vile — liniște și verdeață', distanta: 'în zonă' },
      { tip: 'parc', nume: 'Parcul Național', distanta: '10 min pe jos' },
      { tip: 'scoala', nume: 'Colegiul Național Matei Basarab', distanta: '10 min pe jos' },
      { tip: 'scoala', nume: 'Liceul Teoretic Ion Barbu', distanta: '8 min pe jos' },
      { tip: 'medical', nume: 'Spital Clinic Victor Babeș', distanta: '8 min' },
      { tip: 'medical', nume: 'MedLife / Regina Maria zona Muncii', distanta: '8 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente Tepeș Vodă | Neofort 8',
    seoDescription: 'Neofort 8 exclusivist, Sector 2. Studio, 2-4 camere de la 146.000€+TVA. Clasa A. Metrou Piața Muncii 500m.',
  },
]

// Ansambluri active (la vanzare, in constructie sau promotie)
export const ANSAMBLURI_ACTIVE = ANSAMBLURI.filter(a =>
  ['activ', 'constructie', 'promotie'].includes(a.status)
)

// Ansambluri portofoliu (vandute)
export const ANSAMBLURI_PORTOFOLIU = ANSAMBLURI.filter(a => a.status === 'vandut')

// Helper: gaseste ansamblu dupa slug
export function getAnsamblu(slug) {
  return ANSAMBLURI.find(a => a.slug === slug) || null
}

// Helper: formatare pret
export function formatPret(pret) {
  return new Intl.NumberFormat('ro-RO').format(pret) + '\u20ac'
}

// Culori badge per status
export const STATUS_CONFIG = {
  activ: { label: 'Finalizat', bg: 'bg-[#2d7a3a]', text: 'text-white', dot: '#2d7a3a' },
  constructie: { label: '\u00cen construc\u021bie', bg: 'bg-[#1565c0]', text: 'text-white', dot: '#1565c0' },
  promotie: { label: 'Promo\u021bie', bg: 'bg-[#c0392b]', text: 'text-white', dot: '#c0392b' },
  vandut: { label: 'V\u00e2ndut', bg: 'bg-[#c8922a]', text: 'text-white', dot: '#c8922a' },
  suspendat: { label: 'Suspendat', bg: 'bg-gray-400', text: 'text-white', dot: '#888' },
}
