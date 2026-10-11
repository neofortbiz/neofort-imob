#!/usr/bin/env node
// ============================================================
// scripts/generate-google-rating.mjs
// Citeste ratingul real de pe profilul Google al firmei si rescrie
// data/google-rating.js.
//
// DE CE: pana la v405 ratingul se scria de mana si se desincroniza.
// A ramas 4.3/107 cand erau 109, apoi 4.2/109 cand erau 110 — de fiecare
// data descoperit din intamplare, dupa luni de zile. Harta de pe /contact
// arata mereu valoarea corecta (e widget-ul Google), deci site-ul se
// contrazicea singur: alt numar pe homepage, altul pe contact.
//
// AUTOMAT: ruleaza la prebuild, inaintea lui generate-llms.mjs, ca
// llms.txt sa prinda valoarea noua din acelasi build.
//
// NU BLOCHEAZA NICIODATA BUILD-UL. Orice problema — cheie lipsa, retea
// picata, raspuns ciudat de la Google — inseamna „pastreaza ce era" si
// iese cu cod 0. Un deploy nu trebuie sa cada pentru un numar de recenzii.
//
// FARA CHEIE: scriptul nu face nimic si spune asta in log. Valorile din
// data/google-rating.js raman cele scrise manual. Deci site-ul merge
// identic si inainte de a exista cheia.
//
// NECESITA: variabila de mediu GOOGLE_PLACES_KEY (Vercel -> Settings ->
// Environment Variables), cheie restrictionata la Places API (New).
//
// Rulare manuala: npm run generate:rating
// ============================================================

import fs from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FISIER = resolve(ROOT, 'data/google-rating.js')

const KEY = process.env.GOOGLE_PLACES_KEY

// Numele asteptat al fisei Google. Daca raspunsul nu seamana cu el,
// scriptul NU scrie nimic: inseamna ca place_id-ul tinteste alta firma.
const NUME_ASTEPTAT = 'ANSAMBLURI REZIDEN'

// Cat de mult poate SCADEA numarul de recenzii intr-un singur build fara
// sa fie suspect. Recenziile dispar rar si cate una (sterse de autor sau
// de Google). O scadere brusca inseamna aproape sigur ca raspunsul e
// despre alta fisa, sau ca Google a returnat date partiale.
const SCADERE_MAXIMA = 5

const log = (...a) => console.log('[rating]', ...a)

// ── Citeste valorile curente din fisier ───────────────────────────────
// Se refolosesc ca fallback si ca referinta pentru verificarile de mai jos.
// place_id-ul traieste tot aici: e un fapt stabil, nu o valoare generata,
// si fisierul e singurul loc pe care il pot citi si Next, si scripturile.
let curent
try {
  curent = await import(FISIER)
} catch (e) {
  log('nu pot citi data/google-rating.js, nu modific nimic:', e.message)
  process.exit(0)
}

const PLACE_ID = curent.GOOGLE_PLACE_ID
const RATING_VECHI = String(curent.GOOGLE_RATING ?? '')
const RECENZII_VECHI = Number(curent.GOOGLE_REVIEWS ?? 0)

if (!PLACE_ID) {
  log('lipseste GOOGLE_PLACE_ID din data/google-rating.js — nu pot cere nimic')
  process.exit(0)
}

if (!KEY) {
  log(`fara GOOGLE_PLACES_KEY — pastrez ${RATING_VECHI}/${RECENZII_VECHI} (scrise manual)`)
  log('cheia se pune in Vercel -> Settings -> Environment Variables')
  process.exit(0)
}

// ── Cere fisa de la Google ────────────────────────────────────────────
// Places API (New): un singur GET, cu FieldMask care cere EXACT cele patru
// campuri necesare. FieldMask-ul conteaza si la pret: Google factureaza in
// functie de campurile cerute, iar astea sunt din categoria ieftina.
let date
try {
  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`, {
    headers: {
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount',
    },
  })
  const corp = await res.json().catch(() => ({}))
  if (!res.ok) {
    // Mesajul Google e util la depanare (cheie gresita, API neactivat,
    // facturare inactiva) — dar nu afisam niciodata cheia in log.
    log(`Google a raspuns ${res.status}: ${corp?.error?.message || '(fara detalii)'}`)
    log(`pastrez ${RATING_VECHI}/${RECENZII_VECHI}`)
    process.exit(0)
  }
  date = corp
} catch (e) {
  log('apelul a esuat:', e.message, `— pastrez ${RATING_VECHI}/${RECENZII_VECHI}`)
  process.exit(0)
}

// ── Verificari inainte de a scrie ─────────────────────────────────────
const nume = date?.displayName?.text || ''
const rating = date?.rating
const recenzii = date?.userRatingCount

if (!nume.toUpperCase().includes(NUME_ASTEPTAT)) {
  log(`fisa returnata e „${nume}", nu firma asteptata — NU scriu nimic`)
  log('verifica GOOGLE_PLACE_ID din data/google-rating.js')
  process.exit(0)
}
if (typeof rating !== 'number' || rating < 1 || rating > 5) {
  log(`rating implauzibil (${rating}) — pastrez ${RATING_VECHI}/${RECENZII_VECHI}`)
  process.exit(0)
}
if (!Number.isInteger(recenzii) || recenzii < 1) {
  log(`numar de recenzii implauzibil (${recenzii}) — pastrez ${RATING_VECHI}/${RECENZII_VECHI}`)
  process.exit(0)
}
if (RECENZII_VECHI && recenzii < RECENZII_VECHI - SCADERE_MAXIMA) {
  log(`numarul a scazut de la ${RECENZII_VECHI} la ${recenzii} — prea mult, nu scriu`)
  log('daca scaderea e reala, modifica manual data/google-rating.js')
  process.exit(0)
}

// Google da ratingul ca numar (4.2). Il pastram ca text cu o zecimala,
// exact cum il asteapta restul codului si schema.org.
const ratingNou = rating.toFixed(1)
const recenziiNou = String(recenzii)

if (ratingNou === RATING_VECHI && recenziiNou === String(RECENZII_VECHI)) {
  log(`neschimbat: ${ratingNou}/${recenziiNou}`)
  process.exit(0)
}

// ── Scrie fisierul ────────────────────────────────────────────────────
const continut = `// ============================================================
// data/google-rating.js
// GENERAT de scripts/generate-google-rating.mjs la fiecare build.
// NU edita valorile de mai jos manual — se suprascriu la urmatorul deploy.
// Singura exceptie: daca scriptul nu poate rula (fara cheie), valorile
// raman cele de aici si atunci se pot modifica de mana.
//
// SURSA UNICA pentru ratingul Google al firmei.
//
// DE CE UN FISIER SEPARAT, si nu direct in siteConfig.js:
// siteConfig.js importa cu alias-ul Next (\`@/data/...\`), iar scripturile
// de prebuild ruleaza cu Node simplu, care nu cunoaste alias-ul. Un import
// din siteConfig.js in generate-llms.mjs rupe scriptul si, in
// audit-continut.mjs, dezactiveaza silentios tot auditul. Fisierul asta nu
// importa NIMIC, deci poate fi citit si de Next, si de scripturi.
//
// NU adauga importuri aici. Daca o faci, se rup generatoarele de prebuild.
//
// Cine il consuma:
//   data/siteConfig.js         -> re-exporta (homepage vizibil + schema)
//   scripts/generate-llms.mjs  -> llms.txt si llms-full.txt
//   scripts/audit-continut.mjs -> verifica proza din data/blog.js
//
// UN loc nu poate importa de aici: textul articolului
// cumparare-apartament-din-diaspora din data/blog.js, unde numarul apare
// in proza. Se actualizeaza manual, iar auditul de la prebuild semnaleaza
// daca a ramas in urma.
//
// Ultima actualizare reusita: ${new Date().toISOString().slice(0, 10)}
// ============================================================

// Fisa Google a firmei. Acelasi identificator e declarat si in
// app/layout.js, in schema LocalBusiness (PropertyValue 'Google Place ID').
export const GOOGLE_PLACE_ID = '${PLACE_ID}'

export const GOOGLE_RATING = '${ratingNou}'
export const GOOGLE_REVIEWS = '${recenziiNou}'
`

try {
  fs.writeFileSync(FISIER, continut, 'utf8')
  log(`actualizat: ${RATING_VECHI}/${RECENZII_VECHI} -> ${ratingNou}/${recenziiNou} (${nume})`)
} catch (e) {
  log('nu pot scrie fisierul:', e.message)
}

process.exit(0)
