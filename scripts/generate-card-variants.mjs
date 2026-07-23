#!/usr/bin/env node
// ============================================================
// scripts/generate-card-variants.mjs
// Genereaza variante MICI (400px, 800px) pentru coverele afisate in cardurile
// de pe homepage.
//
// DE CE: cardurile aveau `sizes=` dar FARA `srcset` — atribut inert. Browserul
// descarca originalul integral (1080px, ~130KB) chiar si pentru un card afisat
// la ~200px pe telefon. Pe 84% trafic mobil, asta e latime de banda irosita
// si LCP intarziat (cei 762 KiB semnalati de Lighthouse).
//
// SCOP LIMITAT: doar coverele celor 12 ansambluri active (cardurile de pe
// homepage). NU atinge galeriile (R14) si nici portofoliul.
//
// Variantele se genereaza langa original: exterior-01.avif -> exterior-01-400.avif
// Daca o varianta exista deja si e mai noua decat originalul, se sare peste.
// ============================================================

import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const WIDTHS = [400, 800]

// Extrage coverele din datele ansamblurilor (sursa de adevar)
const src = fs.readFileSync(path.join(ROOT, 'data', 'ansambluri', 'index.js'), 'utf-8')
const start = src.indexOf('export const ANSAMBLURI = [')
const end = src.indexOf('export const ANSAMBLURI_ACTIVE', start)
const body = src.slice(start, end === -1 ? undefined : end)

const covers = [...new Set([...body.matchAll(/cover:\s*'([^']+)'/g)].map(m => m[1]))]

if (covers.length === 0) {
  console.warn('[card-variants] Zero covere gasite — sar peste.')
  process.exit(0)
}

let create = 0, skip = 0, fail = 0

for (const cover of covers) {
  const abs = path.join(PUBLIC, cover.replace(/^\//, ''))
  if (!fs.existsSync(abs)) {
    console.warn('[card-variants] Lipseste:', cover)
    fail++
    continue
  }
  const srcStat = fs.statSync(abs)
  if (srcStat.size === 0) {
    console.warn('[card-variants] Fisier gol, sar peste:', cover)
    fail++
    continue
  }

  let meta
  try {
    meta = await sharp(abs).metadata()
  } catch (e) {
    console.warn('[card-variants] Nu pot citi', cover, '-', e.message)
    fail++
    continue
  }

  for (const w of WIDTHS) {
    const out = abs.replace(/\.avif$/i, `-${w}.avif`)
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcStat.mtimeMs) { skip++; continue }

    try {
      // withoutEnlargement: daca originalul e mai mic decat tinta, pastreaza
      // dimensiunea lui. Important: fisierul se creeaza ORICUM, ca srcset-ul
      // sa nu trimita niciodata catre o varianta inexistenta (imagine rupta).
      await sharp(abs).resize(w, null, { withoutEnlargement: true }).avif({ quality: 45, effort: 4 }).toFile(out)
      create++
    } catch (e) {
      console.warn('[card-variants] Esec la', out, '-', e.message)
      fail++
    }
  }
}

console.log(`[card-variants] ${covers.length} covere | generate: ${create}, sarite: ${skip}, esecuri: ${fail}`)
