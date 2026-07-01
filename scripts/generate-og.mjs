#!/usr/bin/env node
// ============================================================
// scripts/generate-og.mjs
// Genereaza automat imaginile OG (1200x630 .jpg) pentru fiecare
// proiect din portofoliu, pornind de la coperta .avif.
//
// De ce: Facebook/LinkedIn NU suporta .avif la preview. Coperțile
// site-ului sunt .avif, deci pentru partajare avem nevoie de .jpg.
//
// AUTOMAT: genereaza DOAR imaginile care lipsesc. Adaugi un proiect
// nou in portofoliu -> la urmatorul deploy se creeaza singura OG-ul lui.
// Nu mai trebuie sa te gandesti niciodata manual la OG.
//
// Rulare: node scripts/generate-og.mjs  (automat la fiecare deploy)
// ============================================================

import sharp from 'sharp'
import { readFileSync, existsSync, mkdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PUB = resolve(ROOT, 'public')
const OUT_DIR = resolve(PUB, 'og-portofoliu')

function extractPairs(fileRel) {
  // extrage perechile { slug, cover } din fisierul de date, fara sa importe modulul
  const src = readFileSync(resolve(ROOT, fileRel), 'utf-8')
  const pairs = []
  const re = /slug:\s*'([^']+)'[\s\S]*?cover:\s*'([^']+)'/g
  // parsare pe blocuri de obiect ca sa nu incrucisam slug-ul unui obiect cu cover-ul altuia
  for (const block of src.split(/\n {2}\{\n/)) {
    const s = block.match(/slug:\s*'([^']+)'/)
    const c = block.match(/cover:\s*'([^']+)'/)
    if (s && c) pairs.push({ slug: s[1], cover: c[1] })
  }
  return pairs
}

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

  const pairs = extractPairs('data/portofoliu.js')
  let created = 0, skipped = 0, failed = 0

  for (const { slug, cover } of pairs) {
    const out = resolve(OUT_DIR, `${slug}.jpg`)
    if (existsSync(out)) { skipped++; continue }
    const srcPath = resolve(PUB, cover.replace(/^\//, ''))
    if (!existsSync(srcPath)) {
      console.warn(`[og] sursa lipsa pentru ${slug}: ${cover}`)
      failed++
      continue
    }
    try {
      await sharp(srcPath)
        .resize(1200, 630, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 82, progressive: true })
        .toFile(out)
      created++
    } catch (e) {
      console.error(`[og] esec ${slug}:`, e.message)
      failed++
    }
  }

  console.log(`[og] portofoliu — create: ${created}, existente: ${skipped}, esuate: ${failed}`)
}

main().catch((e) => { console.error('[og] eroare fatala:', e); process.exit(0) })
