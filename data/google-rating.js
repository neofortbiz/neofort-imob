// ============================================================
// data/google-rating.js
// GENERAT de scripts/generate-google-rating.mjs la fiecare build, cand
// exista GOOGLE_PLACES_KEY. Fara cheie, valorile raman cele scrise aici.
//
// SURSA UNICA pentru ratingul Google al firmei.
//
// DE CE UN FISIER SEPARAT, si nu direct in siteConfig.js:
// siteConfig.js importa cu alias-ul Next (`@/data/...`), iar scripturile
// de prebuild ruleaza cu Node simplu, care nu cunoaste alias-ul. Un import
// din siteConfig.js in generate-llms.mjs rupe scriptul si, in
// audit-continut.mjs, dezactiveaza silentios tot auditul. Fisierul asta nu
// importa NIMIC, deci poate fi citit si de Next, si de scripturi.
//
// NU adauga importuri aici. Daca o faci, se rup generatoarele de prebuild.
//
// De unde se ia numarul: din harta Google incorporata pe /contact.
// Iframe-ul isi ia datele direct de la Google, deci arata mereu valoarea
// curenta — se compara cu ce scrie aici.
//
// Cine il consuma:
//   data/siteConfig.js        -> re-exporta (homepage vizibil + schema)
//   scripts/generate-llms.mjs -> llms.txt si llms-full.txt
//   scripts/audit-continut.mjs-> verifica proza din data/blog.js
//
// UN loc nu poate importa de aici: textul articolului
// checklist-verificare-dezvoltator-imobiliar din data/blog.js, unde
// numarul apare in proza. Se actualizeaza manual, iar auditul de la
// prebuild semnaleaza daca a ramas in urma.
// ============================================================

// Fisa Google a firmei. Acelasi identificator e declarat si in
// app/layout.js, in schema LocalBusiness (PropertyValue 'Google Place ID').
export const GOOGLE_PLACE_ID = 'ChIJRfDdJdX_sUARTlBqmy1tpXw'

export const GOOGLE_RATING = '4.2'
export const GOOGLE_REVIEWS = '110'
