// ============================================================
// lib/zoneLabel.js
// Eticheta afisata pentru un slug de zona.
//
// DE CE: numele zonei se lua din campul `zona` al primului ansamblu care
// inregistra slug-ul. Cand un ansamblu e listat in mai multe zone (camp
// `zone[]`), slug-ul secundar mostenea eticheta zonei principale.
//
// Dupa v391 (N78 mutat in portofoliu) a ramas doar Neofort 11 pe slug-ul
// 'mosilor-eminescu', iar `zona` lui e 'Eminescu-Viitorului' — deci
// /zona/mosilor-eminescu primea acelasi titlu cu /zona/eminescu-viitorului.
// Doua pagini indexate cu titlu identic.
//
// Harta de mai jos e EXPLICITA, nu derivata algoritmic: numele de zona au
// forme diferite (compuse cu cratima vs. denumiri de loc cu spatiu) pe care
// nicio regula automata nu le prinde corect pe toate.
//
// Pentru un slug nou, necunoscut, se cade pe `zonaAnsamblu` (comportamentul
// de dinainte), deci adaugarea unui proiect intr-o zona noua nu strica nimic.
// ============================================================

export const ZONA_LABELS = {
  'titan-pallady': 'Titan-Pallady',
  'mosilor-eminescu': 'Moșilor-Eminescu',
  'eminescu-viitorului': 'Eminescu-Viitorului',
  'piata-muncii': 'Piața Muncii',
  'militari': 'Militari',
  'colentina': 'Colentina',
}

export function zonaLabel(slug, zonaAnsamblu) {
  return ZONA_LABELS[slug] || zonaAnsamblu || slug
}
