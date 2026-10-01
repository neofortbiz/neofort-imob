#!/usr/bin/env node
// ============================================================
// scripts/refresh-facebook.mjs
// Forteaza Facebook sa reciteasca (re-scrape) tag-urile OG ale unor
// pagini — echivalentul programatic al butonului "Scrape Again" din
// Sharing Debugger.
//
// DE CE: Facebook tine in cache titlul si imaginea unei pagini zile
// intregi. Daca a citit pagina cand imaginea OG lipsea (404) sau cand
// titlul era vechi, share-urile raman gresite pana la o recitire
// explicita. Acelasi cache alimenteaza si preview-urile din Messenger
// si Instagram.
//
// NU RULEAZA LA PREBUILD, intentionat: Graph API are limite de rata,
// iar o recitire a tuturor paginilor la fiecare deploy le-ar atinge
// inutil. Se ruleaza LA CERERE, doar pe paginile efectiv modificate.
//
// NECESITA: variabila de mediu FB_ACCESS_TOKEN (token de aplicatie).
// Fara ea, scriptul nu face nimic si explica ce lipseste.
//
// UTILIZARE:
//   node scripts/refresh-facebook.mjs /blog/slug-articol
//   node scripts/refresh-facebook.mjs /blog/a /ansamblu-rezidential/b
//   node scripts/refresh-facebook.mjs https://www.neofort.ro/blog/a
//
// Accepta si cale relativa, si URL complet. Fara argumente, afiseaza
// modul de folosire si iese fara eroare.
// ============================================================

const BASE = 'https://www.neofort.ro'
const API = 'https://graph.facebook.com/v21.0/'

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log(`
Utilizare: node scripts/refresh-facebook.mjs <cale-sau-url> [...]

Exemple:
  node scripts/refresh-facebook.mjs /blog/dotari-reduc-factura-energie-apartament-nou
  node scripts/refresh-facebook.mjs /ansamblu-rezidential/neofort-11-eminescu-viitorului

Necesita FB_ACCESS_TOKEN in mediu.
`)
  process.exit(0)
}

const TOKEN = process.env.FB_ACCESS_TOKEN
if (!TOKEN) {
  console.warn(`
[facebook] Lipseste FB_ACCESS_TOKEN — nu pot cere recitirea.

Alternativa manuala, fara token, pentru fiecare pagina:
${args.map(a => '  https://developers.facebook.com/tools/debug/?q=' + encodeURIComponent(a.startsWith('http') ? a : BASE + a)).join('\n')}
  -> apasa "Scrape Again"
`)
  process.exit(0)
}

const urls = args.map(a => (a.startsWith('http') ? a : BASE + (a.startsWith('/') ? a : '/' + a)))

let ok = 0, fail = 0

for (const url of urls) {
  try {
    const res = await fetch(`${API}?id=${encodeURIComponent(url)}&scrape=true&access_token=${encodeURIComponent(TOKEN)}`, {
      method: 'POST',
    })
    const body = await res.json().catch(() => ({}))

    if (!res.ok || body.error) {
      console.warn(`[facebook] ESEC ${url} — HTTP ${res.status} ${body?.error?.message || ''}`)
      fail++
      continue
    }

    // Raspunsul contine exact ce a citit Facebook acum. Daca image lipseste,
    // problema e in pagina, nu in cache — si se vede imediat aici.
    const img = body.image?.[0]?.url || '(fara imagine)'
    console.log(`[facebook] OK ${url}`)
    console.log(`           titlu: ${body.title || '(fara titlu)'}`)
    console.log(`           imagine: ${img}`)
    ok++
  } catch (e) {
    console.warn(`[facebook] ESEC ${url}:`, e.message)
    fail++
  }
}

console.log(`[facebook] recitite: ${ok}, esuate: ${fail}`)
