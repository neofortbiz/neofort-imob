// Dimensiunile REALE ale imaginilor declarate in metadate (og:image) si in schema.org (sigla) — v466.
//
// DE CE: pana la v465 toate og:image-urile declarau 1200×630, dar 10 imagini de articol (infografice
// facute manual, pe care generatorul nu le atinge) au alte dimensiuni (ex. 1111×841), iar sigla din
// schema Organization era declarata 1024×701, desi fisierul are 200×137. O dimensiune gresita e mai
// rea decat niciuna: retelele sociale si agentii o cred si decupeaza sau scaleaza gresit.
// Next nu citeste fisierele din public/ la randare, deci dimensiunile stau aici ca date.
// Verificarea 34 din scripts/audit-continut.mjs citeste fisierele reale si opreste livrarea la orice
// nepotrivire, cu randul exact de adaugat aici.
// Fisierul nu importa nimic, ca sa poata fi citit si de scripturile de build.

// Dimensiunea pe care o au toate imaginile OG generate automat (scripts/generate-og*.mjs).
export const DIM_OG_STANDARD = [1200, 630]

// Exceptiile: imagini OG facute manual, cu alta dimensiune. Cale din public/ → [latime, inaltime].
export const DIM_OG = {
  '/blog/apartament-nou-vs-vechi-calcul-real.jpg': [1200, 748],
  '/blog/credit-ipotecar-2026-ghid-complet-rate-dobanzi.jpg': [1200, 748],
  '/blog/cumparare-apartament-diaspora-ghid.jpg': [1200, 654],
  '/blog/gradul-de-indatorare-credit-ipotecar-2026.jpg': [1200, 748],
  '/blog/noua-casa-2026-ghid-complet.jpg': [1200, 740],
  '/blog/predare-la-cheie-apartament-nou-ce-inseamna.jpg': [1200, 654],
  '/blog/preturi-apartamente-bucuresti-2026-scad-sau-nu.jpg': [1005, 672],
  '/blog/randament-inchiriere-apartamente-bucuresti-zone.jpg': [1200, 654],
  '/blog/titan-pallady-cea-mai-cautata-zona-bucuresti.jpg': [956, 626],
  '/blog/tva-apartamente-noi-bucuresti-2026.jpg': [1111, 841],
}

// Imaginea OG a unui articol — aceeasi formula in app/blog/[slug]/page.js si in verificarea 34.
export function ogArticol(a) {
  return a.ogImage || a.image?.replace('.avif', '.jpg') || '/og-blog.jpg'
}

export function dimOg(cale) {
  return DIM_OG[cale] || DIM_OG_STANDARD
}

// Sigla din schema Organization (app/layout.js).
export const LOGO = { cale: '/logo.avif', latime: 200, inaltime: 137 }
