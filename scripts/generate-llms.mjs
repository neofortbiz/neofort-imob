#!/usr/bin/env node
// ============================================================
// scripts/generate-llms.js
// Genereaza public/llms.txt si public/llms-full.txt din datele reale
//
// Rulare: npm run generate:llms
// Rulat automat la fiecare deploy Vercel prin scripts.prebuild in package.json
// ============================================================

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ── Incarcare date ─────────────────────────────────────────
// Folosim require dinamic pentru fisierele CommonJS sau citim fisierul direct
// Next.js exporta ESM, deci folosim dynamic import
async function loadData() {
  const { ANSAMBLURI_ACTIVE } = await import(resolve(ROOT, 'data/ansambluri/index.js'))
  const { TOATE_PORTOFOLIU } = await import(resolve(ROOT, 'data/portofoliu.js'))
  const { ARTICOLE_LIST } = await import(resolve(ROOT, 'data/blog.js'))
  return { ANSAMBLURI_ACTIVE, TOATE_PORTOFOLIU, ARTICOLE_LIST }
}

// ── Constante companie ────────────────────────────────────
const FOUNDING_YEAR = 2009
const ANI = new Date().getFullYear() - FOUNDING_YEAR
const BASE = 'https://www.neofort.ro'
const TODAY = new Date().toISOString().split('T')[0]

function fmt(n) {
  return new Intl.NumberFormat('ro-RO').format(n)
}

function statusLabel(s) {
  return s === 'activ' ? 'Finalizat' : s === 'constructie' ? 'În construcție' : s === 'promotie' ? 'Promoție' : s
}

// ── Generare llms.txt (sumar) ─────────────────────────────
function generateLlms({ ANSAMBLURI_ACTIVE, TOATE_PORTOFOLIU, ARTICOLE_LIST }) {
  const NR_ACTIVE = ANSAMBLURI_ACTIVE.length
  const NR_PORTOFOLIU = TOATE_PORTOFOLIU.length
  const NR_FINALIZATE = ANSAMBLURI_ACTIVE.filter(a => a.status === 'activ').length
  const NR_LIVRATE = NR_PORTOFOLIU + NR_FINALIZATE

  let out = `# Neofort IMO — Imobiliare București\n# Actualizat: ${TODAY}\n\n`

  out += `## Companie\n`
  out += `Neofort IMO comercializează apartamente noi în ansambluri rezidențiale din București, direct de la sursă, fără comision de agenție. Fondată în 2009, cu peste ${ANI} ani de experiență și ${NR_LIVRATE}+ ansambluri livrate. ${NR_ACTIVE} ansambluri active în Sectoarele 2, 3 și 6.\n\n`
  out += `Adresă: Str. Theodor Aman Pictor nr. 11, Sector 1, București 010776\n`
  out += `Telefon: +40758090904\n`
  out += `Email: info@neofort-biz.ro\n`
  out += `Program: Luni-Vineri 10:00-18:00\n`
  out += `CUI: RO53874087\n`
  out += `Nr. Registrul Comerțului: J40/8972/2026\n`
  out += `Denumire legală: Neofort IMO SRL\n`
  out += `Google Maps: https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7\n`
  out += `Google Place ID: ChIJRfDdJdX_sUARTlBqmy1tpXw\n`
  out += `Rating Google: 4.3/5 (105 recenzii)\n\n`

  out += `## Ansambluri active la vânzare\n\n`

  for (const a of ANSAMBLURI_ACTIVE) {
    out += `### ${a.nume} — ${a.zona}, ${a.sector}\n`
    out += `Slug: ${a.slug}\n`
    out += `Status: ${a.status}\n`
    out += `Etaje: ${a.etaje}\n`
    out += `Tipuri: ${a.tipuri.join(', ')}\n`
    out += `Pret de la: ${fmt(a.pretDeLa)}€ + TVA\n`
    out += `Predare: ${a.dataPredare}\n`
    out += `Adresa: ${a.adresa}\n`
    out += `Coordonate: ${a.coordonate.lat}, ${a.coordonate.lng}\n`
    out += `Broker: ${a.broker}, ${a.brokerTel}\n`
    out += `URL: ${BASE}/ansamblu-rezidential/${a.slug}\n`

    if (a.apartamente && a.apartamente.length > 0) {
      out += `\nApartamente disponibile:\n`
      for (const apt of a.apartamente) {
        const pret = apt.pretPromo || apt.avans45 || apt.avans20
        out += `- ${apt.tip} (${apt.suprafata} mp, et. ${apt.etaj}): de la ${fmt(pret)}€+TVA\n`
      }
    }

    const p = a.parcare
    if (p?.subteran?.disponibil && p.subteran.pret) out += `Parcare subterană: de la ${fmt(p.subteran.pret)}€${p.subteran.notaTVA ? ' ' + p.subteran.notaTVA : ' + TVA'}\n`
    if (p?.interior?.disponibil && p.interior.pret) out += `Parcare interioară: de la ${fmt(p.interior.pret)}€${p.interior.notaTVA ? ' ' + p.interior.notaTVA : ' + TVA'}\n`
    if (p?.exterior?.disponibil && p.exterior.pret) out += `Parcare exterioară: de la ${fmt(p.exterior.pret)}€${p.exterior.notaTVA ? ' ' + p.exterior.notaTVA : ' + TVA'}\n`

    if (a.puncteInteres && a.puncteInteres.length > 0) {
      out += `\nPuncte de interes:\n`
      for (const poi of a.puncteInteres.slice(0, 6)) {
        out += `- ${poi.tip}: ${poi.nume} — ${poi.distanta}\n`
      }
    }

    out += `\n`
  }

  out += `## Blog\n`
  for (const art of ARTICOLE_LIST) {
    out += `- ${art.titlu}: ${BASE}/blog/${art.slug}\n`
  }
  out += `\n`

  out += `## Portofoliu finalizat (selecție)\n`
  out += `Neofort IMO a livrat ${NR_LIVRATE}+ ansambluri rezidențiale în București din 2009. Proiecte reprezentative:\n`
  const sample = TOATE_PORTOFOLIU.slice(0, 6)
  for (const p of sample) {
    out += `- ${p.nume} — ${p.sector} — vândut integral\n`
  }
  out += `Lista completă: ${BASE}/portofoliu\n\n`

  out += `## API\n`
  out += `Endpoint JSON: ${BASE}/api/ansambluri\n`

  return out
}

// ── Generare llms-full.txt (complet cu descrieri) ─────────
function generateLlmsFull({ ANSAMBLURI_ACTIVE, TOATE_PORTOFOLIU, ARTICOLE_LIST }) {
  const NR_ACTIVE = ANSAMBLURI_ACTIVE.length
  const NR_PORTOFOLIU = TOATE_PORTOFOLIU.length
  const NR_FINALIZATE = ANSAMBLURI_ACTIVE.filter(a => a.status === 'activ').length
  const NR_LIVRATE = NR_PORTOFOLIU + NR_FINALIZATE

  let out = `# Neofort IMO — Imobiliare București (VERSIUNE COMPLETA)\n# Actualizat: ${TODAY}\n# Versiune: llms-full.txt (date complete pentru sisteme AI/RAG)\n\n`

  out += `## Companie\n`
  out += `Neofort IMO comercializează apartamente noi în ansambluri rezidențiale din București, direct de la sursă, fără comision de agenție. Fondată în 2009, cu peste ${ANI} ani de experiență și ${NR_LIVRATE}+ ansambluri livrate. ${NR_ACTIVE} ansambluri active în Sectoarele 2, 3 și 6.\n\n`
  out += `Adresă: Str. Theodor Aman Pictor nr. 11, Sector 1, București 010776\n`
  out += `Telefon: +40758090904\n`
  out += `Email: info@neofort-biz.ro\n`
  out += `Program: Luni-Vineri 10:00-18:00\n`
  out += `CUI: RO53874087\n`
  out += `Nr. Registrul Comerțului: J40/8972/2026\n`
  out += `Denumire legală: Neofort IMO SRL\n`
  out += `Google Maps: https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7\n`
  out += `Google Place ID: ChIJRfDdJdX_sUARTlBqmy1tpXw\n`
  out += `Rating Google: 4.3/5 (105 recenzii)\n\n`

  out += `## Statistici\n`
  out += `- Ansambluri active: ${NR_ACTIVE}\n`
  out += `- Ansambluri livrate total: ${NR_LIVRATE}+\n`
  out += `- Portofoliu (vândute integral): ${NR_PORTOFOLIU}\n`
  out += `- Finalizate la vânzare: ${NR_FINALIZATE}\n`
  out += `- Ani experiență: ${ANI}\n\n`

  out += `## Ansambluri active la vânzare\n\n`

  for (const a of ANSAMBLURI_ACTIVE) {
    out += `### ${a.nume} — ${a.zona}, ${a.sector}\n`
    out += `Slug: ${a.slug}\n`
    out += `Status: ${statusLabel(a.status)}\n`
    out += `Etaje: ${a.etaje}\n`
    out += `Tipuri: ${a.tipuri.join(', ')}\n`
    out += `Pret de la: ${fmt(a.pretDeLa)}€ + TVA\n`
    out += `Predare: ${a.dataPredare}\n`
    out += `Adresa: ${a.adresa}\n`
    out += `Coordonate: ${a.coordonate.lat}, ${a.coordonate.lng}\n`
    out += `Broker: ${a.broker}, ${a.brokerTel}\n`
    out += `URL: ${BASE}/ansamblu-rezidential/${a.slug}\n`

    if (a.apartamente && a.apartamente.length > 0) {
      out += `\nApartamente disponibile:\n`
      for (const apt of a.apartamente) {
        const pret = apt.pretPromo || apt.avans45 || apt.avans20
        if (apt.avans45 && apt.avans20 && !apt.pretPromo) {
          out += `- ${apt.tip} (${apt.suprafata} mp, et. ${apt.etaj}): avans 45% = ${fmt(apt.avans45)}€, avans 20% = ${fmt(apt.avans20)}€ (+TVA)\n`
        } else {
          out += `- ${apt.tip} (${apt.suprafata} mp, et. ${apt.etaj}): de la ${fmt(pret)}€+TVA${apt.pretPromo ? ' (promoție)' : ''}\n`
        }
      }
    }

    const p = a.parcare
    if (p?.subteran?.disponibil && p.subteran.pret) out += `Parcare subterană: ${fmt(p.subteran.pret)}€${p.subteran.notaTVA ? ' ' + p.subteran.notaTVA : ' + TVA'}\n`
    if (p?.interior?.disponibil && p.interior.pret) out += `Parcare interioară: ${fmt(p.interior.pret)}€${p.interior.notaTVA ? ' ' + p.interior.notaTVA : ' + TVA'}\n`
    if (p?.exterior?.disponibil && p.exterior.pret) out += `Parcare exterioară: ${fmt(p.exterior.pret)}€${p.exterior.notaTVA ? ' ' + p.exterior.notaTVA : ' + TVA'}\n`

    if (a.dotari && a.dotari.length > 0) {
      out += `\nDotări: ${a.dotari.slice(0, 8).join(', ')}\n`
    }

    if (a.puncteInteres && a.puncteInteres.length > 0) {
      out += `\nPuncte de interes:\n`
      for (const poi of a.puncteInteres) {
        out += `- ${poi.tip}: ${poi.nume} — ${poi.distanta}\n`
      }
    }

    if (a.descriere) {
      out += `\nDescriere scurtă: ${a.descriere}\n`
    }

    out += `\n`
  }

  out += `## Blog — articole publicate\n\n`
  for (const art of ARTICOLE_LIST) {
    out += `### ${art.titlu}\n`
    out += `Data: ${art.data}\n`
    out += `Autor: ${art.autor}\n`
    out += `Tag: ${art.tag}\n`
    out += `URL: ${BASE}/blog/${art.slug}\n`
    if (art.rezumat) out += `Rezumat: ${art.rezumat}\n`
    out += `\n`
  }

  out += `## Portofoliu finalizat (${NR_LIVRATE}+ ansambluri livrate)\n\n`
  for (const p of TOATE_PORTOFOLIU) {
    out += `- ${p.nume} (N${p.numar}) — ${p.zona}, ${p.sector} — ${p.totalApartamente || '?'} unități — vândut integral\n`
    out += `  URL: ${BASE}/portofoliu/${p.slug}\n`
  }
  out += `\n`

  out += `## API\n`
  out += `Endpoint JSON cu date complete: ${BASE}/api/ansambluri\n`

  return out
}

// ── Main ──────────────────────────────────────────────────
async function main() {
  console.log('Generare llms.txt si llms-full.txt din date reale...')

  const data = await loadData()

  const llms = generateLlms(data)
  writeFileSync(resolve(ROOT, 'public/llms.txt'), llms, 'utf8')
  console.log(`✅ public/llms.txt generat (${llms.length} caractere)`)

  const llmsFull = generateLlmsFull(data)
  writeFileSync(resolve(ROOT, 'public/llms-full.txt'), llmsFull, 'utf8')
  console.log(`✅ public/llms-full.txt generat (${llmsFull.length} caractere)`)

  console.log('Done.')
}

main().catch(err => {
  console.error('Eroare:', err)
  process.exit(1)
})
