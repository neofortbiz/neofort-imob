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
    descriereCompleta: `Ansamblul Rezidențial Neofort 84 este cel mai recent proiect de anvergură al Neofort IMO în zona Titan-Pallady, Sectorul 3 din București. Imobilul cu regim P+10 etaje este în construcție, cu predare în Trimestrul I 2027, și oferă 10 tipuri diferite de apartamente — de la 2 camere la 4 camere cu terasă panoramică.

Tipologia apartamentelor este diversificată pentru a răspunde oricărui buget: apartamente de 2 camere între 47,78 și 91,60 mp, cu prețuri promoționale de la 62.114€ la avans 45% sau de la 66.892€ la avans 20%; apartamente de 3 camere între 78,60 și 119,52 mp de la 102.167€; și apartamentul flagship — 4 camere cu terasă generoasă la etajul 10, 175,58 mp, de la 181.262€. Toate prețurile sunt + TVA. Parcare exterioară disponibilă de la 6.000€, parcare interioară de la 8.500€.

Din punct de vedere tehnic, structura de cadre și diafragme din beton armat cu zidărie Porotherm asigură rezistența seismică și izolația superioară. Dotările includ: încălzire în pardoseală, tâmplărie PVC Salamander cu ferestre mari pentru lumină naturală maximă, lift silențios, gresie și faianță import, centrală termică proprie în condensare, instalații sanitare, electrice și termice complete. Apartamentele de la etajul 10 și parterul înalt dispun de terase generoase.

Amplasamentul este strategic: Metrou Nicolae Teclu (M2) la câteva minute pe jos și Metrou Anghel Saligny (M2) la 8 minute pe jos asigură accesul rapid în orice punct al Bucureștiului. IKEA Pallady la 5 minute cu mașina, Auchan Titan la 7 minute, Jumbo, Metro, Leroy Merlin și Dedeman Pallady la 8 minute — cea mai densă concentrare de retail din estul capitalei. Waldorf București și Spectrum School la 500m, Școala nr. 149 și Liceul Victor Brauner la 10 minute pe jos pentru familii cu copii. Parcul Teilor la 10 minute. Campus Medical Regina Maria Titan la 10 minute și MedLife Titan la 8 minute pentru servicii medicale de top.

Neofort 84 se vinde direct de la sursă, fără comision de agenție. Prețurile promoționale sunt valabile pentru primele unități rezervate.`,
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
    descriereCompleta: `Ansamblul Rezidențial Neofort 83 Faza 2 este amplasat în zona Titan, Sectorul 3 din București, la 3 minute de mers pe jos de Metrou Nicolae Teclu (M2) — una dintre cele mai valoroase localizări față de metrou din oferta actuală de apartamente noi din Sectorul 3.

Complexul este format din trei corpuri D+P+3E cu lift silențios în fiecare corp, spații verzi amenajate între blocuri și locuri de joacă. Oferta tipologică este completă: garsonieră 43,42 mp de la 64.800€, studio 2 camere 56,12 mp de la 84.180€, apartament 2 camere 69,91 mp de la 104.865€, 3 camere 74,91 mp de la 112.365€ și 4 camere 100,63 mp de la 150.945€ — toate prețurile la avans 20%, + TVA. Parcare exterioară 9.000€ TVA inclus, parcare interioară 13.000€ TVA inclus.

Standardul tehnic este în segmentul premium al pieței: centrală proprie în condensare pentru eficiență energetică maximă, încălzire prin pardoseală în toate camerele, obiecte sanitare suspendate, tâmplărie Salamander negru structurat cu geam tripan, kit de aer condiționat preinstalat, ușă metalică multipunct antiefracție. Fațada ventilată cu izolație din vată minerală bazaltică — material superior polistirenului clasic în privința izolației fonice și durabilității pe termen lung.

Metrou Nicolae Teclu la 3 minute și Metrou Anghel Saligny la 8 minute pe jos asigură mobilitate perfectă. IKEA Pallady la 5 minute, Auchan Titan la 7 minute, Jumbo la 6 minute, Leroy Merlin, Metro și Dedeman Pallady la 8 minute. Waldorf București și Spectrum School la 500m, Școala Gimnazială nr. 149 și Liceul Internațional de Informatică la 10 minute pe jos. Parcul Teilor la 10 minute pe jos. Campus Medical Regina Maria Titan la 10 minute și Medikali Titan la 8 minute. Toate apartamentele se predau la cheie, cu finisaje complete incluse în preț.`,
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
    descriereCompleta: `Ansamblul Rezidențial Neofort 78 Faza 2 este un proiect boutique premium de excepție: 22 de apartamente pe strada Ardeleni, zona Moșilor-Eminescu, Sectorul 2, la 400m — 5 minute pe jos — de Metrou Piața Obor (M2). Regimul S+P+4ET+5R+6R+7R, cu etaje retrase la 5, 6 și 7, oferă priveliști generoase și terase private generoase.

Tipologia este unică pe piața bucureșteană: apartament 2 camere Tip 8, 58,10 mp, de la 185.000€; apartament 2 camere Tip 14, 63,40 mp, de la 199.000€; apartament 3 camere Tip 5, 81,40 mp, de la 280.000€; apartament 3 camere Tip 18, 84,00 mp, de la 300.000€; apartament 3 camere cu grădină proprie la parter, 194,20 mp total, de la 399.000€ — o raritate absolută în oferta bucureșteană; și apartament 4 camere Duplex Tip 15, etajele 5-6, 130,30 mp, de la 495.000€. Toate prețurile + TVA. Parcare subterană 30.000€ +TVA.

Finisajele sunt în clasa Premium-Lux fără excepție: încălzire în pardoseală cu sistem Tecce Germania, centrală termică în condensație, tâmplărie Salamander Blue Edition tripan, lift Kone pentru 4 persoane, ceramică Italia în băi și spații comune, parchet stejar stratificat, uși PINUM Italia, obiecte sanitare Rocca cu accesorii HansGrohe, accesorii electrice BTicino Premium, fațadă ventilată din alucobond și fibrociment, videointerfon cu supraveghere video și fibră optică Internet/TV incluse.

Metrou Piața Obor (M2) la 400m — 5 minute pe jos. Metrou Iancului (M2) la 15 minute pe jos. Piața Obor la 400m — cel mai mare complex comercial open-air din București. Mega Mall Pantelimon la 10 minute cu mașina. Colegiul Național Mihai Eminescu la 5 minute pe jos, Liceul Dimitrie Bolintineanu la 10 minute, Grădinița nr. 54 și nr. 82 la 5 minute pe jos. Parcul Circului la 10 minute pe jos, Parcul Ioanid la 15 minute. Spital Clinic Colentina la 10 minute, MedLife Obor și Regina Maria la 5 minute. Autogara Obor și STB multiple la 400m. Predare Mai 2026.`,
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
    descriereCompleta: `Ansamblul Rezidențial Neofort 76 Faza 2 este amplasat pe Bulevardul Iuliu Maniu, Sectorul 6, la 500m — 6 minute pe jos — de Metrou Păcii (M3), cu acces suplimentar la Metrou Preciziei la 900m și Metrou Gorjului la 15 minute pe jos. Regimul S+P+7E+8/9Etaj retras oferă etajelor superioare vedere panoramică.

Proiectul include apartamente de 2 camere, 3 camere și unitatea flagship: Penthouse 4 camere cu terasă, etajele 8-9, 276,98 mp, de la 218.409€ la avans 20%, + TVA. Parcare în sistem mecanic Klaus la 10.000€ TVA inclus — soluție inovatoare care maximizează numărul locurilor disponibile.

Structura din beton armat antiSEismică, apartamente complet finisate la cheie, încălzire în pardoseală, contorizare individuală apă-gaz-electricitate și dotări tehnice de top definesc standardul Neofort 76. Cele două etaje retrase (8 și 9) conferă Penthouse-ului intimitate și terasă panoramică generoasă asupra Bucureștiului de vest.

Metrou Păcii la 500m — acces pe M3 spre Piața Unirii în 8 minute. Metrou Preciziei la 900m — 11 minute pe jos. Metrou Gorjului la 15 minute pe jos. Plaza Romania la 10 minute cu mașina, Militari Shopping Center la 8 minute, BricoDepot Militari la 10 minute. Parcul Liniei — cel mai lung parc liniar din Europa cu 10 km de alei — la 10 minute pe jos. Școala Internațională King George la 10 minute, Școala Gimnazială Regina Maria la 8 minute, Grădinița Prichindel nr. 195 la 5 minute. Sanador Militari și OK Medical la 8 minute, Clinica Regina Maria Militari la 10 minute.`,
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
    descriereCompleta: `Ansamblul Rezidențial Neofort 56 Faza 2 se situează în zona Titan Nou, Sectorul 3, la 3 minute de mers pe jos de Metrou Nicolae Teclu (M2). Trei blocuri D+P+3E cu 84 de unități, inclusiv apartamente cu curte proprie la parter — un avantaj rar pe piața bucureșteană.

Oferta actuală cuprinde: apartament 4 camere 125,64 mp de la 184.691€ și apartament 4 camere cu curte proprie, parter, 133,54 mp de la 235.208€ (promoție). Prețuri + TVA. Parcare exterioară și subterană la 8.900€ TVA inclus.

Neofort 56 Faza 2 este primul proiect Neofort cu Smart Home Ready integrat în standardul de bază: control temperatură din aplicație, pregătire pentru automatizarea completă a casei fără costuri suplimentare. Dotările includ: încălzire prin pardoseală INNOFLOW, centrală termică proprie în condensare, tâmplărie VEKA tripan cu 7 camere de izolare — performanța maximă disponibilă pe piață, kit de aer condiționat preinstalat, obiecte sanitare suspendate Grohe, prize Gewiss, lift silențios Schindler, balustrade din sticlă securizată, stații de încărcare auto electrică și supraveghere video a spațiilor comune.

Metrou Nicolae Teclu (M2) la 3 minute pe jos, Metrou Anghel Saligny la 8 minute. IKEA Pallady la 5 minute cu mașina, Auchan Titan la 7 minute, Jumbo la 6 minute, Leroy Merlin, Metro și Dedeman la 8 minute. Waldorf București și Spectrum School la 500m. Parcul Teilor la 10 minute pe jos. Campus Medical Regina Maria Titan la 10 minute, Medikali Titan la 8 minute. Proiectul se adresează familiilor moderne care prioritizează tehnologia Smart Home, sustenabilitatea prin stații EV și standardul tehnic superior.`,
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
    descriereCompleta: `Ansamblul Rezidențial Neofort 50 Titan IOR este amplasat pe Bulevardul 1 Decembrie 1918, Sectorul 3, cu ieșire directă la Metrou Costin Georgian (M2) — 1 minut de mers pe jos. Imobilul cu regim 2S+P+5E-6/11R dispune de 4 lifturi spatioase ORONA KRONLIFT, 2 subsoluri cu parcări și boxe, spații comerciale la parter și un parc de relaxare cu loc de joacă amenajat în incinta proprie.

Oferta actuală: 2 camere Scara 1, etajele 1-5, 73,10 mp de la 142.545€; 2 camere cu terasă, etajul 6, 48,90 mp de la 144.210€; 2 camere cu terasă mare, etajele 10-11, 56,40 mp de la 176.904€; 4 camere cu terasă (promoție), etajele 10-11, 99,95 mp de la 255.405€. Prețuri + TVA. Parcare subterană și supraterană disponibile.

Construcția pe piloți cu adâncime de 17 metri asigură stabilitatea maximă. Dotările includ: 4 lifturi ORONA KRONLIFT, vitrajele mari SALAMANDER tripan pentru lumină naturală maximă, uși PINUM și BENATI, obiecte sanitare ROCA, CERSANIT și GROHE, centrală SAUNIER DUVAL by VAILLANT, termostat wireless Smart pentru control inteligent și încălzire în pardoseală în toate spațiile. Adăpost ALA cu 3 ieșiri de salvare, autorizat ISU.

Metrou Costin Georgian (M2) la 1 minut pe jos — acces instant spre centrul Bucureștiului. Metrou Nicolae Grigorescu la 10 minute pe jos. Parcul IOR — lac artificial, pârtie de schi, piste ciclistice, terenuri sport — la 5 minute pe jos. Parcul Teilor la 10 minute, Parcul Titanii la 8 minute. Auchan Titan la 5 minute cu mașina, IKEA Pallady la 10 minute, Piața Morarilor la 5 minute pe jos. Liceul Nichita Stănescu și Grădinița nr. 70 la 5 minute. Campus Medical Regina Maria la 10 minute. Bulevardul 1 Decembrie 1918 — magistrala principală de transport cu linii STB multiple.`,
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
    descriereCompleta: `Ansamblul Rezidențial Neofort 49 este un proiect boutique finalizat de 18 apartamente pe Strada Vistiernicul Stavrinos, Sectorul 6, la câteva minute de mers pe jos de Metrou Gorjului și Metrou Păcii (M3). Disponibil în promoție.

Oferta: garsonieră 38,90 mp la prețul promoțional de 76.974€ (față de 77.800€ preț standard); apartament 2 camere 60,30 mp la 118.947€ promoțional (față de 120.600€). Prețuri + TVA. Parcare subterană disponibilă la 15.000€ TVA inclus.

Structura din beton armat C25/30 cu zidărie Porotherm 30cm și izolație EPS100 asigură calitatea constructivă pe termen lung. Fiecare apartament este predat la cheie cu finisaje moderne superioare mediei pieței: centrală proprie în condensare, încălzire prin pardoseală, tâmplărie Salamander negru structurat cu geam tripan, kit de aer condiționat preinstalat, baie complet echipată cu obiecte sanitare incastrabile suspendate, ușă metalică multipunct antiefracție și lift silențios.

Metrou Gorjului (M3) și Metrou Păcii (M3) la câteva minute pe jos — acces direct spre Piața Unirii în 10 minute și spre centrul Capitalei fără trafic. Plaza Romania la 10 minute cu mașina, Militari Shopping Center la 8 minute, BricoDepot Militari la 10 minute. Parcul Liniei la 10 minute pe jos. Școala Internațională King George la 10 minute, Școala Gimnazială Regina Maria la 8 minute. Sanador Militari, OK Medical la 8 minute, Clinica Regina Maria Militari la 10 minute. 18 apartamente — comunitate restrânsă, costuri comune minime, finalizat și disponibil imediat.`,
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
    descriereCompleta: `Ansamblul Rezidențial Neofort 44 este amplasat în cartierul Titan-Theodor Pallady, Sectorul 3, la câteva minute de mers pe jos de Metrou Nicolae Teclu (M2). Trei corpuri Ds+3E+4Er cu 84 de apartamente, finalizat și disponibil imediat.

Oferta actuală: garsonieră 38,61 mp de la 61.775€; 2 camere 62,63 mp de la 100.208€; 3 camere 86,20 mp de la 137.919€; 3 camere cu terasă generoasă, etajele 3-4, 157,87 mp de la 191.960€. Prețuri + TVA. Parcare exterioară și subterană de la 8.000€.

Dotările tehnice includ: centrală termică proprie 24kW în condensare pentru eficiență energetică și facturi reduse, încălzire prin pardoseală în toate camerele, tâmplărie Salamander, instalații sanitare, electrice și termice complete, obiecte sanitare suspendate, ceramică de import antiderapantă pe balcoane și terase și uși metalice antiefracție multipunct. Structura din beton armat cu zidărie BCA Ytong 30cm și termosistem EPS80 de 10cm asigură izolația termică și fonică de calitate.

Metrou Nicolae Teclu (M2) la câteva minute pe jos, Metrou Anghel Saligny la 8 minute. IKEA Pallady la 5 minute cu mașina, Auchan Titan la 7 minute, Jumbo la 6 minute, Leroy Merlin, Metro și Dedeman la 8 minute. Waldorf București și Spectrum School la 500m, Școala nr. 149 la 10 minute pe jos, Parcul Teilor la 10 minute. Campus Medical Regina Maria Titan la 10 minute, Medikali Titan la 8 minute. Una dintre cele mai bune oportunități de raport calitate-preț din Sectorul 3 — finalizat, disponibil imediat, fără comision de agenție.`,
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
    descriereCompleta: `Ansamblul Rezidențial Premium Neofort 42 Piața Muncii este amplasat pe Strada Soldat Alexandru Magatti, Sectorul 3, la 200m — 3 minute pe jos — de Metrou Piața Muncii (M3) și la 400m de Parcul Național. Proiect de 64 apartamente S+P+4, finalizat, disponibil în promoție.

Oferta curentă în promoție: 2 camere Tip 4, 61,58 mp, de la 197.056€ promoțional (față de 209.372€); 2 camere Tip 5, 62,31 mp, de la 199.392€; 2 camere Tip 6, 63,47 mp, de la 203.104€; 2 camere Tip 7, 64,21 mp, de la 208.672€; 4 camere Tip 1, 139,20 mp, de la 445.440€ promoțional; 4 camere Tip 2, 140,67 mp, de la 450.144€. Prețuri + TVA. Parcare subterană sistem Klaus la 22.500€ +TVA.

Dotările tehnice de vârf: 2 lifturi SCHINDLER, parcare subterană sistem Klaus, adăpost ALA autorizat ISU, tâmplărie SALAMANDER/VEKA tripan, uși PINUM/PORTA DOORS, centrală Buderus de înaltă eficiență, termostat wireless Smart în fiecare cameră, panouri solare și fotovoltaice integrate, stații de încărcare auto electrică, balustrade din sticlă securizată, gresie și faianță Marazzi rectificată și încălzire în pardoseală. Pachetul verde și smart este inclus standard — un avantaj rar la această localizare.

Metrou Piața Muncii (M3) la 200m — 3 minute pe jos, spre Piața Unirii în 4 minute. Metrou Dristor 2 la 10 minute pe jos. Parcul Național la 400m — 5 minute pe jos. Arena Națională la 5 minute pe jos. Bazin Olimpic Lia Manoliu la 5 minute pe jos. Kaufland Popa Nan la 5 minute pe jos, Mega Image la 5 minute. Spital Victor Babeș și Spital Monza la 8 minute, Spital Copii Grigore Alexandrescu la 10 minute. Colegiul Economic Costin C. Kirițescu la 8 minute pe jos, Liceul Petru Poni la 10 minute. Autogara Filaret și STB multiple la 10 minute.`,
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
    descriereCompleta: `Ansamblul Rezidențial Neofort 28 Fazele 4 și 5 este amplasat în zona Titan-Pallady, Sectorul 3, la câteva minute de mers pe jos de Metrou Nicolae Teclu (M2). Proiect D+P+4 cu 53 de apartamente decomandate cu bucătării închise — 2 și 3 camere — finalizat și disponibil imediat.

Oferta tipologică este bogată, cu opțiuni pentru orice nevoie: 2 camere Tip 1, 59,80 mp, de la 83.900€ (promoție); 2 camere Tip 2, 60,40 mp, de la 84.900€; Tip 3, 60,90 mp, 85.500€; Tip 4, 61,50 mp, 86.500€; Tip 5, 65,15 mp, 91.900€; 2 camere cu curte proprie ~50mp la parter, 61,55 mp, 112.900€; 3 camere Tip 1, 92,00 mp, 128.900€; 3 camere cu terasă, etajele 3-4, 105,00 mp, 131.900€; 3 camere cu curte proprie la parter, 86,65 mp, 143.500€. Prețuri + TVA. Parcare exterioară 7.500€, parcare subterană 11.000€.

Apartamentele cu curte proprie de aproximativ 50mp — inclusiv trei variante: 2 camere și 3 camere cu grădină — reprezintă un avantaj unic pe piața Sectorului 3. Incinta împrejmuită cu acces controlat și videointerfon cu vedere nocturnă asigură securitatea comunității. Dotările tehnice includ: încălzire în pardoseală, centrală termică proprie, tâmplărie Salamander tripan Low-E cu microventilație pentru calitatea aerului interior, ceramică Delta Studio, parchet rezistent la trafic intens, băi complet echipate cu rezervor incastrat.

Metrou Nicolae Teclu (M2) la câteva minute pe jos, Metrou Anghel Saligny la 8 minute. IKEA Pallady la 5 minute cu mașina, Auchan Titan la 7 minute, Jumbo la 6 minute, Leroy Merlin, Metro și Dedeman la 8 minute. Waldorf București și Spectrum School la 500m, Parcul Teilor la 10 minute. Campus Medical Regina Maria Titan la 10 minute, Medikali Titan la 8 minute.`,
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
    descriereCompleta: `Ansamblul Rezidențial Boutique Premium Neofort 11 este un proiect exclusivist de 13 apartamente în zona Eminescu-Viitorului, Sectorul 2 din București, cu predare estimată în Septembrie 2026. Regim S+P+4E+5R, structură dual diafragme + beton armat cu pereți Porotherm 30cm.

Oferta completă: studio garsonieră 32,70 mp de la 104.640€; 2 camere Tip 1, 60,40 mp, de la 176.000€ promoțional (față de 192.000€); 2 camere Tip 2, 58,90 mp, de la 179.000€ promoțional; 2 camere Tip 3, 59,10 mp, de la 183.000€ promoțional; 3 camere Tip 1, 66,00 mp, de la 199.000€ promoțional; 3 camere Tip 2, 90,30 mp, de la 280.000€ promoțional; 3 camere Tip 3, 94,40 mp, de la 289.000€ promoțional; 3 camere Tip 4, 94,20 mp, de la 289.000€ promoțional; 3 camere Tip 5, 88,90 mp, de la 284.800€. Prețuri + TVA. Parcare subterană 25.000€.

Finisajele sunt în clasa Premium fără excepție: gresie și faianță MARAZZI, parchet Kronotex PREMIUM, uși blindate PINUM la intrare cu uși interioare PINUM, obiecte sanitare GROHE, HansGrohe și Kludi, centrală ARISTON 24kW în condensare, încălzire în pardoseală în toate camerele, contorizare individuală apă-gaz-electricitate, preechipare aer condiționat, lift SCHINDLER silențios, adăpost ALA autorizat ISU, termoizolație EPS80 10cm și tâmplărie Salamander 7 camere tripan — izolație fonică 45dB și termică maximă.

Tramvai Mihai Bravu și linii STB multiple la 2 minute pe jos. Metrou Obor (M2) la 10 minute pe jos, Metrou Ștefan cel Mare la 12 minute. Piața Obor la 15 minute pe jos, Mega Mall la 15 minute cu mașina. Colegiul Național Iulia Hașdeu la 5 minute pe jos, Colegiul Național Mihai Eminescu la 8 minute, Grădinița Bambi la 3 minute. Parcul Circului la 8 minute pe jos, Parcul Ioanid la 10 minute. Spital Clinic Colentina la 10 minute, MedLife, Regina Maria și Sanador la 10 minute. 13 apartamente — comunitate restrânsă, finisaje premium, predare septembrie 2026.`,
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
    descriereCompleta: `Ansamblul Rezidențial Boutique Exclusivist Neofort 8 este amplasat în zona Tepeș Vodă-Maior Coravu, Sectorul 2 din București, la 500m — 6 minute pe jos — de Metrou Piața Muncii (M3). Proiect finalizat de 32 de apartamente cu regim S+P+2ET+M (mansardă), disponibil în promoție. Clasa energetică A.

Oferta completă cu prețuri: studio garsonieră 39,92 mp de la 146.000€; 2 camere 8B, 67,80 mp, 192.000€; 2 camere 17B, 67,80 mp, de la 205.000€ promoțional; 2 camere 14B, 64,10 mp, de la 176.000€ promoțional; 2 camere 7B, 60,35 mp, de la 174.000€ promoțional; 2 camere 20B, 62,80 mp, de la 205.000€ promoțional; 3 camere 22B, 80,15 mp, 265.000€; 3 camere 4B, 113,60 mp, 295.000€; 3 camere 25B cu terasă mansardă, 148,80 mp, 345.000€; 4 camere 6B cu grădină la parter, 237,83 mp, 465.000€. Prețuri + TVA. Parcare subterană cu lift 25.000€.

Fațadă ventilată, clasa energetică A și înălțime peste standard față de normele curente diferențiază Neofort 8 clar față de oferta generică. Dotările premium includ: uși blindate PINUM cu uși interioare PINUM, gresie și faianță MARAZZI, parchet Kronotex PREMIUM, obiecte sanitare la alegere cu baterii Kludi, centrală 24kW în condensație Bosch, încălzire în pardoseală, preechipare aer condiționat, parcare subterană cu lift, tâmplărie PVC Salamander 7 camere tripan și termoizolație EPS80 10cm. Terase la mansardă și grădini la parter pentru unitățile corespunzătoare.

Metrou Piața Muncii (M3) la 500m — 6 minute pe jos, spre Piața Unirii în 4 minute. Metrou Dristor 1 la 12 minute pe jos. Kaufland Popa Nan la 5 minute pe jos, Mega Image Calea Călărașilor la 3 minute pe jos. Cartier rezidențial de case și vile cu înălțime maximă 4 etaje — liniște și verdeață. Parcul Național la 10 minute pe jos. Colegiul Național Matei Basarab la 10 minute pe jos, Liceul Ion Barbu la 8 minute. Spital Clinic Victor Babeș la 8 minute, MedLife și Regina Maria zona Muncii la 8 minute.`,
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
