#!/usr/bin/env node
// ============================================================
// scripts/audit-continut.mjs
// Verifica la fiecare build coerenta dintre DATE si TEXTE.
//
// DE CE: auditul v404 a gasit 60+ neconcordante care au trecut
// neobservate luni de zile — preturi din texte rupte de `apartamente[]`,
// referinte incrucisate catre preturi care nu mai existau, chei
// duplicate in data/blog.js care suprascriau silentios valorile
// corecte, titluri SEO identice pe doua pagini, `cuprins` divergent
// de `sectiuni`. Niciuna nu rupe build-ul, deci nimic nu le semnala:
// se vedeau doar daca cineva deschidea exact fisierul potrivit.
//
// Scriptul face vizibila fiecare din aceste clase la fiecare deploy.
//
// NU BLOCHEAZA BUILD-UL. Iese mereu cu cod 0 si doar raporteaza.
// Motivul: un fals pozitiv (ex. un pret istoric citat intentionat,
// marcat „la momentul comercializarii") nu trebuie sa opreasca un
// deploy. Raportul se citeste in log-ul de build.
//
// Rulare manuala: npm run audit:continut
// ============================================================

import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SUFIX_TITLU = ' | Neofort IMO'   // template-ul global din app/layout.js

let ANSAMBLURI_ACTIVE, TOATE_PORTOFOLIU, ARTICOLE
try {
  ;({ ANSAMBLURI_ACTIVE } = await import(resolve(ROOT, 'data/ansambluri/index.js')))
  ;({ TOATE_PORTOFOLIU } = await import(resolve(ROOT, 'data/portofoliu.js')))
  ;({ ARTICOLE } = await import(resolve(ROOT, 'data/blog.js')))
} catch (e) {
  console.warn('[audit] Nu pot citi datele (build-ul continua):', e.message)
  process.exit(0)
}
// Daca un export isi schimba numele, o verificare scrisa cu `|| []` ar deveni
// silentios inactiva si ar raporta „0 probleme" fara sa fi verificat nimic.
// Exact asta s-a intamplat la prima versiune a acestui script, care importa
// `PORTOFOLIU` (inexistent) in loc de `TOATE_PORTOFOLIU` din data/portofoliu.js.
if (!Array.isArray(ANSAMBLURI_ACTIVE)) { console.warn('[audit] ANSAMBLURI_ACTIVE lipseste sau nu e array — audit sarit'); process.exit(0) }
if (!Array.isArray(TOATE_PORTOFOLIU)) console.warn('[audit] TOATE_PORTOFOLIU lipseste — verificarile de portofoliu sunt sarite')
if (!ARTICOLE || typeof ARTICOLE !== 'object') console.warn('[audit] ARTICOLE lipseste — verificarile de blog sunt sarite')

const probleme = []
const P = (zona, mesaj) => probleme.push(`${zona}: ${mesaj}`)
const bani = n => Number(n).toLocaleString('de-DE')

// Numele statiilor sunt scrise inconsecvent in date: unele cu diacritice
// („Metrou Piața Muncii"), altele fara („Metrou Pacii", „Metrou Piata Obor").
// Comparatia se face pe forma fara diacritice, ca sa nu raporteze diferente
// care sunt doar de scriere.
const fara = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// ────────────────────────────────────────────────────────────
// 1. ANSAMBLURI — campuri obligatorii si limite SEO
// ────────────────────────────────────────────────────────────
for (const a of ANSAMBLURI_ACTIVE || []) {
  if (!a.descriere) P(a.slug, 'lipseste `descriere` (folosita in llms.txt, /api/ansambluri si in cautarea din listare)')
  if (!a.seoDescription) P(a.slug, 'lipseste `seoDescription`')
  else {
    const L = a.seoDescription.length
    if (L < 120) P(a.slug, `seoDescription ${L}c — sub 120c, Google o completeaza singur`)
    if (L > 165) P(a.slug, `seoDescription ${L}c — peste 165c, se taie in SERP`)
  }
  // `title: { absolute }` pe paginile de ansamblu => template-ul NU se adauga
  if (!a.seoTitle) P(a.slug, 'lipseste `seoTitle`')
  else if (a.seoTitle.length > 60) P(a.slug, `seoTitle ${a.seoTitle.length}c — peste 60c`)

  const disp = (a.apartamente || []).filter(x => !x.stocEpuizat)
  if (!disp.length) {
    P(a.slug, 'toate apartamentele au stocEpuizat — ansamblul ar trebui mutat in portofoliu (R17)')
    continue
  }

  // pretDeLa trebuie sa fie minimul din stocul DISPONIBIL
  const preturi = []
  for (const x of disp) for (const v of [x.pretPromo, x.avans90, x.avans45, x.avans20]) if (v != null) preturi.push(v)
  if (preturi.length) {
    const min = Math.min(...preturi)
    if (min !== a.pretDeLa) P(a.slug, `pretDeLa = ${bani(a.pretDeLa)} dar minimul din stocul disponibil este ${bani(min)}`)
  }

  // `tipuri` trebuie sa reflecte exact categoriile cu stoc (R17a)
  const camStoc = new Set(disp.map(x => x.camere))
  const camTipuri = new Set()
  for (const t of a.tipuri || []) {
    const tl = String(t).toLowerCase()
    if (tl.includes('garsonier') || tl.includes('studio')) camTipuri.add(1)
    const m = tl.match(/^(\d+)\s*camere/)
    if (m) camTipuri.add(Number(m[1]))
  }
  for (const c of camStoc) if (!camTipuri.has(c)) P(a.slug, `exista stoc de ${c} camere dar \`tipuri\` nu il declara`)
  for (const c of camTipuri) if (!camStoc.has(c)) P(a.slug, `\`tipuri\` declara ${c} camere dar nu exista stoc disponibil (R17a)`)

  // „Garsoniera" si „Studio" au amandoua camere: 1, deci verificarea pe numarul
  // de camere nu le distinge — un „Studio" ramas in `tipuri` dupa epuizarea
  // studiourilor trece neobservat daca mai exista o garsoniera. Se verifica
  // separat, pe cuvantul din `tip`.
  for (const t of a.tipuri || []) {
    const tl = fara(t)
    for (const cuvant of ['garsonier', 'studio']) {
      if (!tl.includes(cuvant)) continue
      if (!disp.some(x => fara(x.tip).includes(cuvant)))
        P(a.slug, `\`tipuri\` declara „${t}" dar nu exista nicio unitate disponibila cu „${cuvant}" in tip (R17a)`)
    }
  }

  // badge-ul se calculeaza EXCLUSIV din dataPredare
  if (!a.dataPredare) P(a.slug, 'lipseste `dataPredare` — badge-ul nu se poate calcula')

  // distantele fata de metrou din texte trebuie sa existe in puncteInteres
  const poiMetrou = (a.puncteInteres || []).filter(p => p.tip === 'metrou')
  const texte = [a.descriere, a.seoDescription, a.descriereCompleta].filter(Boolean).join('\n')
  if (poiMetrou.length) {
    const statii = poiMetrou.map(p => p.nume.replace(/\s*\(M\d(?:\/M\d)?\)\s*/g, '').trim())
    for (const m of texte.matchAll(/Metrou(?:l)?\s+([A-ZȘȚĂÎÂ][\wȘțăîâșĂÎÂȚ.\s]{2,28}?)\s+(?:la|este la|se afla|se află)/g)) {
      const nume = m[1].trim()
      if (!statii.some(st => fara(st).includes(fara(nume)) || fara(nume).includes(fara(st))))
        P(a.slug, `textul citeaza „Metrou ${nume}" dar statia nu exista in \`puncteInteres\``)
    }
  }
}

// ────────────────────────────────────────────────────────────
// 2. ANSAMBLURI — unicitate titlu/descriere (duplicate = canibalizare)
// ────────────────────────────────────────────────────────────
for (const [camp, eticheta] of [['seoTitle', 'seoTitle'], ['seoDescription', 'seoDescription']]) {
  const m = new Map()
  for (const a of ANSAMBLURI_ACTIVE) {
    const v = a[camp]
    if (!v) continue
    if (!m.has(v)) m.set(v, [])
    m.get(v).push(a.slug)
  }
  for (const [v, slugs] of m) if (slugs.length > 1) P('ansambluri', `${eticheta} identic pe ${slugs.join(' si ')} — „${v.slice(0, 60)}…"`)
}

// Portofoliul nu are campuri `seoTitle`/`seoDescription`: titlul si descrierea
// se compun in app/portofoliu/[slug]/page.js din nume + zona + sector + etaje +
// totalApartamente. Duplicatele apar deci cand doua intrari au aceeasi
// combinatie — ceea ce se verifica pe valoarea compusa, nu pe un camp.
if (Array.isArray(TOATE_PORTOFOLIU)) {
  const tP = new Map(), dP = new Map()
  for (const a of TOATE_PORTOFOLIU) {
    const titlu = `${a.nume} — ${a.zona} | Neofort IMO`
    const desc = `${a.nume}, ${a.zona}, ${a.sector} București. ${a.etaje}, ${a.totalApartamente} unități.`
    if (!tP.has(titlu)) tP.set(titlu, []); tP.get(titlu).push(a.slug)
    if (!dP.has(desc)) dP.set(desc, []); dP.get(desc).push(a.slug)
  }
  for (const [v, slugs] of tP) if (slugs.length > 1) P('portofoliu', `titlu identic pe ${slugs.join(' si ')} — „${v}"`)
  for (const [v, slugs] of dP) if (slugs.length > 1) P('portofoliu', `descriere identica pe ${slugs.join(' si ')}`)
}

// ────────────────────────────────────────────────────────────
// 3. REFERINTE INCRUCISATE — orice suma atribuita unui „Neofort NN"
//    trebuie sa existe in datele acelui ansamblu
// ────────────────────────────────────────────────────────────
const dupaNumar = new Map()
for (const a of ANSAMBLURI_ACTIVE || []) {
  const disp = (a.apartamente || []).filter(x => !x.stocEpuizat)
  const valori = new Set()
  for (const x of disp) for (const v of [x.pretPromo, x.avans90, x.avans45, x.avans20]) if (v != null) valori.add(v)
  const prev = dupaNumar.get(a.numar)
  if (prev) for (const v of valori) prev.add(v)       // N50 Faza 1 + Faza 2 au acelasi numar
  else dupaNumar.set(a.numar, valori)
}
const caSuma = t => Number(String(t).replace(/[.\s]/g, ''))

// Sumele se verifica DOAR in fraze care chiar anunta un pret de vanzare.
// Altfel se raporteaza si cifre care nu sunt preturi de apartament:
// prima pentru o curte („o primă de 12.000-23.000€ față de unitățile
// standard"), costul unei dotari pentru tot proiectul („panouri
// fotovoltaice, investiție de 100.000-150.000€"), bugete de cumparator.
const CONTEXT_PRET = /\bde la\b|\+\s?TVA|prețul|pretul|preț de|pret de|preț promoțional|avans \d/i
// Intervalele „X–Y€" sunt estimari sau delte, nu preturi de lista.
const INTERVAL = /\d{1,3}(?:\.\d{3})+\s*[-–]\s*\d{1,3}(?:\.\d{3})+\s*(?:EUR|€|euro)/i

function verificaReferinte(eticheta, text) {
  if (!text) return
  for (const fraza of text.split(/(?<=[.!?:])\s+|\n/)) {
    // un pret marcat explicit ca istoric e intentionat, nu eroare
    if (/la momentul comercializ|preț vechi|pretVechi|in trecut|istoric/i.test(fraza)) continue
    if (!CONTEXT_PRET.test(fraza) || INTERVAL.test(fraza)) continue
    const numere = [...fraza.matchAll(/Neofort\s+(\d{1,2})/g)].map(m => Number(m[1]))
    if (!numere.length) continue
    const sume = [...fraza.matchAll(/(\d{1,3}(?:\.\d{3})+)\s*(?:EUR|€|euro)/gi)]
      .map(m => caSuma(m[1])).filter(v => v > 20000 && v < 900000)
    if (!sume.length) continue
    // o fraza care numeste mai multe ansambluri: suma e valida daca apartine ORICARUIA
    const permise = new Set()
    let vreunulActiv = false
    for (const n of new Set(numere)) {
      const set = dupaNumar.get(n)
      if (!set) continue
      vreunulActiv = true
      for (const v of set) permise.add(v)
    }
    if (!vreunulActiv) continue
    const gresite = sume.filter(v => !permise.has(v))
    if (gresite.length)
      P(eticheta, `suma ${gresite.map(bani).join(', ')} nu exista in datele ansamblului citat — „${fraza.trim().slice(0, 120)}…"`)
  }
}

for (const a of ANSAMBLURI_ACTIVE || []) verificaReferinte(`ansamblu ${a.slug}`, a.descriereCompleta)

// ────────────────────────────────────────────────────────────
// 4. BLOG
// ────────────────────────────────────────────────────────────
const titluri = new Map(), descrieri = new Map()
for (const [slug, a] of Object.entries(ARTICOLE || {})) {
  // titlu + sufixul adaugat de template (paginile de blog NU folosesc {absolute})
  const titluComplet = (a.seoTitle || a.titlu || '') + SUFIX_TITLU
  if (titluComplet.length > 60) P(`blog/${slug}`, `titlu ${titluComplet.length}c cu sufixul template — peste 60c`)

  const d = a.seoDesc || a.descriere || ''
  if (d.length < 120) P(`blog/${slug}`, `seoDesc ${d.length}c — sub 120c`)
  if (d.length > 165) P(`blog/${slug}`, `seoDesc ${d.length}c — peste 165c`)

  const kt = a.seoTitle || a.titlu
  if (kt) { if (!titluri.has(kt)) titluri.set(kt, []); titluri.get(kt).push(slug) }
  if (d) { if (!descrieri.has(d)) descrieri.set(d, []); descrieri.get(d).push(slug) }

  // preturi in `peScurt` — interzis din v349 (se invechesc si nu sunt vizibile la editare)
  for (const b of a.peScurt || [])
    if (/\d{1,3}(?:\.\d{3})+\s*(?:EUR|€|euro)/i.test(b))
      P(`blog/${slug}`, `peScurt contine un pret — interzis din v349: „${b.slice(0, 80)}…"`)

  // intrari de cuprins fara secțiune (cuprinsul se deriva din `sectiuni`,
  // deci o intrare orfana nu mai apare nicaieri si trece neobservata)
  const idSectiuni = new Set((a.sectiuni || []).map(s => s.id))
  for (const c of a.cuprins || [])
    if (!idSectiuni.has(c.id)) P(`blog/${slug}`, `\`cuprins\` are intrarea „${c.id}" fara secțiune corespondenta`)

  // id de secțiune duplicat = ancora dubla + continut afisat de doua ori
  const vazut = new Set()
  for (const s of a.sectiuni || []) {
    if (vazut.has(s.id)) P(`blog/${slug}`, `id de secțiune duplicat „${s.id}" — se randeaza de doua ori`)
    vazut.add(s.id)
  }

  verificaReferinte(`blog/${slug}`, [a.descriere, (a.peScurt || []).join('\n'), ...(a.sectiuni || []).map(s => `${s.h2}\n${s.continut}`)].join('\n'))
}
for (const [v, slugs] of titluri) if (slugs.length > 1) P('blog', `seoTitle identic pe ${slugs.join(' si ')} — „${v.slice(0, 55)}…"`)
for (const [v, slugs] of descrieri) if (slugs.length > 1) P('blog', `seoDesc identic pe ${slugs.join(' si ')}`)

// ────────────────────────────────────────────────────────────
// Raport
// ────────────────────────────────────────────────────────────
if (!probleme.length) {
  console.log(`[audit] OK — ${ANSAMBLURI_ACTIVE.length} ansambluri active, ${Object.keys(ARTICOLE || {}).length} articole, 0 probleme.`)
} else {
  console.log(`\n[audit] ${probleme.length} ${probleme.length === 1 ? 'problema' : 'probleme'} de coerenta date↔texte:`)
  for (const p of probleme) console.log('  • ' + p)
  console.log('[audit] Build-ul continua — raportul e informativ.\n')
}
process.exit(0)
