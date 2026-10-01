#!/usr/bin/env node
// ============================================================
// scripts/generate-og-blog.mjs
// Genereaza public/blog/{slug}.jpg (imaginea OG) din {slug}.avif,
// pentru fiecare articol din data/blog.js.
//
// DE CE: Facebook si LinkedIn NU suporta .avif la preview, iar
// app/blog/[slug]/page.js construieste OG-ul prin
// image.replace('.avif', '.jpg'). Fara fisierul .jpg, retelele
// primesc 404 si nu afiseaza nicio imagine la share.
//
// Pana acum .jpg-ul se facea MANUAL, deci depindea de memoria celui
// care adauga articolul. La v392 a lipsit si a trebuit reparat in v394.
// Generatorul elimina complet clasa asta de eroare.
//
// AUTOMAT: ruleaza la prebuild. Adaugi un articol nou cu .avif ->
// OG-ul lui apare singur la urmatorul deploy.
//
// GENEREAZA DOAR CE LIPSESTE: fisierele existente nu sunt atinse
// niciodata, deci OG-urile facute manual (cum sunt infograficele,
// unde crop-ul automat ar taia text) raman exact cum au fost livrate.
//
// NU BLOCHEAZA BUILD-UL: orice esec e doar logat.
//
// Rulare manuala: npm run generate:og-blog
// ============================================================

import sharp from 'sharp'
import { existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PUB = resolve(ROOT, 'public')

// Dimensiunea declarata in openGraph.images din app/blog/[slug]/page.js.
// Trebuie sa corespunda, altfel unele retele ignora imaginea.
const W = 1200
const H = 630

let ARTICOLE
try {
  ;({ ARTICOLE } = await import(resolve(ROOT, 'data/blog.js')))
} catch (e) {
  console.warn('[og-blog] Nu pot citi data/blog.js (build-ul continua):', e.message)
  process.exit(0)
}

let create = 0, existente = 0, sarite = 0, esuate = 0

for (const [slug, a] of Object.entries(ARTICOLE)) {
  // ogImage setat explicit = imagine proprie, aleasa manual. Nu ne atingem de ea.
  if (a.ogImage) { sarite++; continue }
  if (!a.image || !a.image.endsWith('.avif')) { sarite++; continue }

  const outRel = a.image.replace('.avif', '.jpg')
  const out = resolve(PUB, outRel.replace(/^\//, ''))
  if (existsSync(out)) { existente++; continue }

  const src = resolve(PUB, a.image.replace(/^\//, ''))
  if (!existsSync(src)) {
    console.warn(`[og-blog] sursa lipsa pentru ${slug}: ${a.image}`)
    esuate++
    continue
  }

  try {
    await sharp(src)
      .resize(W, H, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, progressive: true })
      .toFile(out)
    console.log(`[og-blog] creat ${outRel}`)
    create++
  } catch (e) {
    console.error(`[og-blog] esec ${slug}:`, e.message)
    esuate++
  }
}

console.log(`[og-blog] create: ${create}, existente: ${existente}, sarite: ${sarite}, esuate: ${esuate}`)
