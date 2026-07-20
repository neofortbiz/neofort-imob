#!/usr/bin/env node
// ============================================================
// scripts/generate-contact-map.mjs
// Genereaza data/contact-map.js — o harta MICA (slug -> date de contact)
// folosita de componentele GLOBALE: Header, MobileBar, WAFloat.
//
// DE CE: acele componente sunt randate pe FIECARE pagina si importau
// data/ansambluri/index.js (~128KB) doar ca sa afle telefonul brokerului
// si numele proiectului. Rezultat: 128KB de date in bundle-ul clientului
// pe homepage, blog, contact — unde informatia nici nu e folosita.
// Harta asta are ~2KB si contine exact cele 5 campuri necesare.
//
// AUTOMAT: ruleaza la prebuild. Adaugi/modifici un ansamblu activ ->
// harta se regenereaza singura la urmatorul deploy. Nu se poate desincroniza.
//
// IMPORTANT: contine DOAR ansamblurile ACTIVE (ANSAMBLURI din index.js),
// exact ca getAnsamblu(). Pe paginile de portofoliu vandut getAnsamblu()
// returna null -> fallback la telefonul general. Comportament PASTRAT.
// ============================================================

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'data', 'ansambluri', 'index.js')
const OUT = path.join(ROOT, 'data', 'contact-map.js')

const src = fs.readFileSync(SRC, 'utf-8')

// Izoleaza array-ul ANSAMBLURI (doar activele — la fel ca getAnsamblu)
const start = src.indexOf('export const ANSAMBLURI = [')
if (start === -1) {
  console.error('[contact-map] Nu gasesc "export const ANSAMBLURI = [" in', SRC)
  process.exit(1)
}
const endMarker = src.indexOf('export const ANSAMBLURI_ACTIVE', start)
const body = src.slice(start, endMarker === -1 ? undefined : endMarker)

// Un obiect de ansamblu incepe la nivelul de indentare "  {".
// Prefixam cu \n: separatorul consuma newline-ul, iar regexurile de camp
// asteapta "\n    camp:" — fara prefix, primul camp din bloc nu s-ar potrivi.
const blocks = body.split(/\n  \{\n/).slice(1).map(b => '\n' + b)

const pick = (blk, field) => {
  const m = blk.match(new RegExp(`\\n    ${field}: '([^']*)'`))
  return m ? m[1] : null
}
const pickNum = (blk, field) => {
  const m = blk.match(new RegExp(`\\n    ${field}: (\\d+)`))
  return m ? Number(m[1]) : null
}

const entries = []
for (const blk of blocks) {
  const slug = pick(blk, 'slug')
  if (!slug) continue
  entries.push({
    slug,
    nume: pick(blk, 'nume'),
    numar: pickNum(blk, 'numar'),
    zona: pick(blk, 'zona'),
    sector: pick(blk, 'sector'),
    brokerTel: pick(blk, 'brokerTel'),
  })
}

if (entries.length === 0) {
  console.error('[contact-map] Zero ansambluri extrase — opresc (nu suprascriu cu date goale).')
  process.exit(1)
}

const faraTel = entries.filter(e => !e.brokerTel).map(e => e.slug)
if (faraTel.length) {
  console.warn('[contact-map] ATENTIE — fara brokerTel (vor folosi telefonul general):', faraTel.join(', '))
}

const lines = entries
  .map(e => `  '${e.slug}': { nume: '${e.nume}', numar: ${e.numar}, zona: '${e.zona}', sector: '${e.sector}', brokerTel: ${e.brokerTel ? `'${e.brokerTel}'` : 'null'} },`)
  .join('\n')

const out = `// ============================================================
// GENERAT AUTOMAT de scripts/generate-contact-map.mjs — NU EDITA MANUAL.
// Sursa: data/ansambluri/index.js (ANSAMBLURI — doar activele)
// Regenerat la fiecare build (prebuild).
//
// Scop: Header/MobileBar/WAFloat sunt randate pe fiecare pagina si au
// nevoie doar de datele de contact per proiect. Importand harta asta
// (~2KB) in loc de index.js (~128KB), bundle-ul clientului scade masiv.
// ============================================================

export const CONTACT_MAP = {
${lines}
}

// Echivalentul lui getAnsamblu(slug) pentru nevoile componentelor globale.
// Returneaza null pentru sluguri necunoscute (ex. portofoliu vandut),
// exact ca inainte -> componentele cad pe telefonul general.
export function getContact(slug) {
  return CONTACT_MAP[slug] || null
}
`

fs.writeFileSync(OUT, out, 'utf-8')
console.log(`[contact-map] Generat ${path.relative(ROOT, OUT)} — ${entries.length} ansambluri, ${(Buffer.byteLength(out) / 1024).toFixed(1)}KB`)
