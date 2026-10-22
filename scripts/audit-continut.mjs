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

import fs from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SUFIX_TITLU = ' | Neofort IMO'   // template-ul global din app/layout.js

let ANSAMBLURI_ACTIVE, TOATE_PORTOFOLIU, ARTICOLE, ARTICOLE_LIST, GOOGLE_RATING, GOOGLE_REVIEWS, ECHIPA, AUTORI
try {
  ;({ ANSAMBLURI_ACTIVE } = await import(resolve(ROOT, 'data/ansambluri/index.js')))
  ;({ TOATE_PORTOFOLIU } = await import(resolve(ROOT, 'data/portofoliu.js')))
  ;({ ARTICOLE, ARTICOLE_LIST, AUTORI } = await import(resolve(ROOT, 'data/blog.js')))
  ;({ ECHIPA } = await import(resolve(ROOT, 'data/echipa.js')))
  // data/google-rating.js, nu siteConfig.js: acela importa cu alias `@/`,
  // pe care Node simplu nu-l rezolva, si tot auditul ar fi sarit silentios.
  ;({ GOOGLE_RATING, GOOGLE_REVIEWS } = await import(resolve(ROOT, 'data/google-rating.js')))
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

  // `cuprins` vs `sectiuni` — acelasi set SI aceeasi ordine.
  //
  // DE CE toate trei direcțiile, nu doar prima: pana la v413 se verifica doar
  // intrarile de cuprins fara secțiune. Scapau celelalte doua, in 14 articole
  // din 35: opt aveau o secțiune intreaga lipsa din cuprins (la
  // tva-apartamente-noi-2026 secțiunea `exemple-complete` nu aparea deloc in
  // navigare), iar toate paisprezece listau `faq` ultimul in cuprins desi pe
  // pagina dupa el urma concluzia. Ancorele functionau, deci nimic nu se
  // vedea rupt — doar cuprinsul mintea despre ordinea paginii.
  const idSectiuni = (a.sectiuni || []).map(s => s.id)
  const setSectiuni = new Set(idSectiuni)
  const idCuprins = (a.cuprins || []).map(c => c.id)
  const setCuprins = new Set(idCuprins)

  for (const id of idCuprins)
    if (!setSectiuni.has(id)) P(`blog/${slug}`, `\`cuprins\` are intrarea „${id}" fara secțiune corespondenta`)

  for (const id of idSectiuni)
    if (!setCuprins.has(id)) P(`blog/${slug}`, `secțiunea „${id}" nu apare in \`cuprins\` — invizibila in navigare`)

  if (idCuprins.length === idSectiuni.length &&
      idCuprins.every(id => setSectiuni.has(id)) &&
      idCuprins.join('|') !== idSectiuni.join('|')) {
    // se raporteaza PRIMA poziție in care difera; o coada identica nu spune nimic
    const poz = idCuprins.findIndex((id, k) => id !== idSectiuni[k])
    P(`blog/${slug}`, `\`cuprins\` are aceleasi id-uri ca \`sectiuni\`, dar in alta ordine — la poziția ${poz + 1} cuprinsul spune „${idCuprins[poz]}", pagina are „${idSectiuni[poz]}"`)
  }

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
// 5. RATING GOOGLE — numarul din proza vs sursa unica
//
// DE CE: ratingul se modifica in data/google-rating.js, de unde il iau
// homepage-ul, schema si llms.txt. Dar textul articolului
// checklist-verificare-dezvoltator-imobiliar il scrie in proza, iar proza
// nu poate importa. A ramas in urma de doua ori (105 recenzii cand erau
// 109, apoi 109 cand erau 110) si s-a vazut doar din intamplare.
// ────────────────────────────────────────────────────────────
if (GOOGLE_REVIEWS && ARTICOLE && typeof ARTICOLE === 'object') {
  const nrSursa = String(GOOGLE_REVIEWS)
  const ratingSursa = String(GOOGLE_RATING || '')
  for (const [slug, art] of Object.entries(ARTICOLE)) {
    const txt = [art.descriere, (art.peScurt || []).join('\n'),
      ...(art.sectiuni || []).map(x => `${x.h2}\n${x.continut}`)].join('\n')
    for (const m of txt.matchAll(/(\d{2,4})\s+recenzii/g))
      if (m[1] !== nrSursa)
        P(`blog/${slug}`, `textul spune „${m[1]} recenzii" dar data/google-rating.js are ${nrSursa}`)
    // in proza ratingul e scris cu virgula („4,2/5"), in cod cu punct („4.2")
    for (const m of txt.matchAll(/rating\s+(\d[.,]\d)\s*\/\s*5/gi))
      if (m[1].replace(',', '.') !== ratingSursa)
        P(`blog/${slug}`, `textul spune „rating ${m[1]}/5" dar data/google-rating.js are ${ratingSursa}`)
  }
}

// ────────────────────────────────────────────────────────────
// 6. VECHIMI — data/echipa.js vs AUTORI din data/blog.js
//
// DE CE: aceiasi brokeri apar in doua fisiere. data/echipa.js alimenteaza
// pagina /echipa (campurile `experienta` si `vechimeNeofort`), iar AUTORI
// din data/blog.js alimenteaza caseta de autor de pe articole (titlu +
// bio). Pana la v407 divergeau fara ca nimeni sa observe: Svetlana avea
// 18 ani Neofort intr-un fisier si 17 in celalalt, Raluca 2 si nimic.
// ────────────────────────────────────────────────────────────
if (Array.isArray(ECHIPA) && AUTORI) {
  for (const e of ECHIPA) {
    const a = AUTORI[e.id]
    if (!a) continue
    const dinTitlu = Number((a.titlu || '').match(/(\d+)\s+ani/)?.[1])
    if (Number.isFinite(dinTitlu) && Number.isFinite(e.experienta) && dinTitlu !== e.experienta)
      P('vechimi', `${e.nume}: data/echipa.js spune ${e.experienta} ani experienta, AUTORI din data/blog.js spune ${dinTitlu}`)
    const dinBio = Number((a.bio || '').match(/(\d+)\s+ani in Neofort/)?.[1])
    if (Number.isFinite(dinBio) && Number.isFinite(e.vechimeNeofort) && dinBio !== e.vechimeNeofort)
      P('vechimi', `${e.nume}: data/echipa.js spune ${e.vechimeNeofort} ani Neofort, bio-ul din data/blog.js spune ${dinBio}`)
  }
}

// ────────────────────────────────────────────────────────────
// 9. DATE EXPIRATE — termene trecute scrise ca termene viitoare
//
// DE CE: un articol scris corect la publicare devine fals pe cont propriu
// cand termenul despre care vorbeste trece. La v412, articolul despre
// restituirea TVA inca spunea „programeaza notarul din timp, in ultimele
// zile ale lunii septembrie" pe 13 octombrie, iar ghidul de TVA mai cerea
// semnarea contractului „cel tarziu la 31 iulie 2026" — un termen dublu
// expirat, inlocuit mai intai de 30 septembrie 2026 si apoi de nimic.
// Niciuna dintre cele doua nu putea fi prinsa de verificarile existente:
// datele erau coerente intre ele, doar lumea mersese mai departe.
//
// CUM: se semnaleaza o data calendaristica TRECUTA doar cand textul dinainte
// de ea o prezinta ca termen inca deschis („cel tarziu la", „ai timp pana",
// „expira la"). Daca aceeasi fereastra contine un marcaj de trecut
// („era", „a fost", „trebuia", „a expirat"), nu se raporteaza: atunci e
// istoric corect scris, nu o scapare.
//
// Raportul e informativ, ca tot auditul. O data trecuta nu opreste build-ul.
// ────────────────────────────────────────────────────────────
const LUNI = {
  ianuarie: 1, februarie: 2, martie: 3, aprilie: 4, mai: 5, iunie: 6,
  iulie: 7, august: 8, septembrie: 9, octombrie: 10, noiembrie: 11, decembrie: 12,
}
const LUNI_SCURT = { ian: 1, feb: 2, mar: 3, apr: 4, iun: 6, iul: 7, aug: 8, sept: 9, sep: 9, oct: 10, noi: 11, nov: 11, dec: 12 }

const AZI = new Date(new Date().toISOString().slice(0, 10))

// Formulari care presupun un termen care NU a trecut inca.
const CA_TERMEN_VIITOR = /(se semnează cel târziu|cel târziu (?:la|până)|ai timp până|mai poți[^.]{0,40}până|se aplică până|se mai aplică[^.]{0,40}până|termenul (?:este|e)|expiră (?:la|pe)|valabil(?:ă|e)? până|se depune până|trebuie (?:să fie|predat)[^.]{0,40}până|garantat(?:ă|a)? până|verifică că[^.]{0,60}până)/i

// Marcaje care arata ca fraza e deja scrisa la trecut — atunci e corecta.
const CA_ISTORIC = /(era |a fost|au fost|fusese|s-a |s-au |trebuia|trebuiau|putea|puteau|a expirat|până la care|s-ar fi)/i

const DATA_RO = /\b(\d{1,2})\s+(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)\s+(\d{4})\b/gi

if (ARTICOLE) {
  for (const [slug, a] of Object.entries(ARTICOLE)) {
    const bucati = [
      ['descriere', a.descriere],
      ['seoDesc', a.seoDesc],
      ...(a.peScurt || []).map((p, i) => [`peScurt[${i}]`, p]),
      ...(a.sectiuni || []).map(s => [s.id, s.continut]),
    ]
    for (const [unde, txt] of bucati) {
      if (!txt) continue
      const re = new RegExp(DATA_RO.source, 'gi')
      let m
      while ((m = re.exec(txt)) !== null) {
        const cand = new Date(Date.UTC(+m[3], LUNI[m[2].toLowerCase()] - 1, +m[1]))
        if (cand >= AZI) continue
        const inainte = txt.slice(Math.max(0, m.index - 90), m.index)
        if (!CA_TERMEN_VIITOR.test(inainte) || CA_ISTORIC.test(inainte)) continue
        P('date expirate', `${slug} (${unde}): „${m[0]}" a trecut, dar e formulată ca termen încă deschis`)
      }
    }
  }
}

// dataPredare trecuta la un ansamblu care nu e marcat „Finalizat".
// Nu se corecteaza automat: ori proiectul s-a predat si trebuie „Finalizat",
// ori a intarziat si termenul real il stie doar Dan (R8).
const finalPredare = v => {
  const s = String(v || '').trim()
  let m = s.match(/^T([1-4])\s+(\d{4})$/i)
  if (m) return new Date(Date.UTC(+m[2], +m[1] * 3, 0))
  m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
  if (m) return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1]))
  m = s.match(/^([A-Za-zăâîșț]+)\.?\s+(\d{4})$/i)
  if (m) {
    const luna = LUNI[m[1].toLowerCase()] ?? LUNI_SCURT[m[1].toLowerCase()]
    if (luna) return new Date(Date.UTC(+m[2], luna, 0))
  }
  return null
}

for (const a of ANSAMBLURI_ACTIVE || []) {
  const d = finalPredare(a.dataPredare)
  if (d && d < AZI)
    P('date expirate', `${a.slug}: dataPredare „${a.dataPredare}" a trecut, dar ansamblul nu e marcat „Finalizat"`)
}

// ────────────────────────────────────────────────────────────
// 10. IMAGINI si coerenta ARTICOLE ↔ ARTICOLE_LIST
//
// DE CE imaginile: o referinta de imagine fara fisier pe disc nu da eroare
// la build — pagina se randeaza cu un spatiu gol, si se descopera abia cand
// o vede cineva (v392, v394). La v414 am scris eu un nume de fisier derivat
// din slug, cand fisierul real avea alt nume; a fost prins de o verificare
// manuala, nu de audit.
//
// DE CE coerenta: ARTICOLE_LIST are propriile copii de `titlu`, `rezumat`,
// `image`, `citire` si `dataISO`. Pagina de listare citeste din LIST, pagina
// de articol din ARTICOLE. O modificare intr-un singur loc trece neobservata
// (v412, v413).
// ────────────────────────────────────────────────────────────
if (ARTICOLE && Array.isArray(ARTICOLE_LIST)) {
  const PUBLIC = resolve(ROOT, 'public')
  const areFisier = cale => {
    if (!cale || typeof cale !== 'string' || !cale.startsWith('/')) return true
    try { return fs.existsSync(resolve(PUBLIC, '.' + cale)) } catch { return true }
  }

  for (const [slug, a] of Object.entries(ARTICOLE))
    if (a.image && !areFisier(a.image))
      P(`blog/${slug}`, `\`image\` trimite la „${a.image}", care nu exista in public/`)

  for (const l of ARTICOLE_LIST) {
    if (l.image && !areFisier(l.image))
      P(`blog/${l.slug}`, `ARTICOLE_LIST.image trimite la „${l.image}", care nu exista in public/`)

    const a = ARTICOLE[l.slug]
    if (!a) continue
    for (const camp of ['image', 'citire', 'dataISO', 'data'])
      if (a[camp] !== undefined && l[camp] !== undefined && a[camp] !== l[camp])
        P(`blog/${l.slug}`, `\`${camp}\` difera intre ARTICOLE („${a[camp]}") si ARTICOLE_LIST („${l[camp]}")`)
  }
}

// ════════════════════════════════════════════════════════════
// VERIFICARI ADAUGATE LA v426 (R22 — remediere pe clasa)
//
// Fiecare bloc de mai jos inchide o clasa de eroare care, pana acum, se
// repara punctual si putea reaparea fara ca nimeni sa observe. Ordinea e
// cea din registrul claselor din CONTEXT-NEOFORT-IMO.md.
// ════════════════════════════════════════════════════════════

// ── 1. Magistrale de metrou gresite ──────────────────────────
// DE CE: la v422 s-au corectat 74 de etichete, dar verificarea s-a facut cu
// un tipar care cerea cuvantul „Metrou"/„Statia de metrou" inainte de numele
// statiei. Pluralul („Statiile X (M3) si Y (M2)") si intreg data/portofoliu.js
// au ramas neatinse — inca 180 de etichete gresite, descoperite abia la v426.
// Tiparul de aici NU cere nimic inainte de numele statiei.
// Lista OFICIALA Metrorex, completa. M6 (deschidere 2027) nu se eticheteaza inca.
// Orice statie adaugata aici intra AUTOMAT in tiparul de verificare de mai jos —
// nu mai exista o a doua lista de nume, scrisa de mana, care sa ramana in urma.
const LINII_METROU = {
  M1: ['Pantelimon','Republica','Costin Georgian','Titan','Nicolae Grigorescu','Dristor','Mihai Bravu',
       'Timpuri Noi','Piata Unirii','Izvor','Eroilor','Grozavesti','Petrache Poenaru','Crangasi','Basarab',
       'Gara de Nord 1','Piata Victoriei','Stefan cel Mare','Obor','Piata Iancului','Piata Muncii'],
  M2: ['Pipera','Aurel Vlaicu','Aviatorilor','Piata Victoriei','Piata Romana','Universitate','Piata Unirii',
       'Tineretului','Eroii Revolutiei','Constantin Brancoveanu','Piata Sudului','Aparatorii Patriei',
       'Dimitrie Leonida','Berceni','Tudor Arghezi'],
  M3: ['Preciziei','Pacii','Gorjului','Lujerului','Politehnica','Eroilor','Izvor','Piata Unirii','Timpuri Noi',
       'Mihai Bravu','Dristor','Nicolae Grigorescu','1 Decembrie 1918','Nicolae Teclu','Anghel Saligny'],
  M4: ['Gara de Nord 2','Basarab','Grivita','1 Mai','Jiului','Parc Bazilescu','Laminorului','Straulesti'],
  M5: ['Raul Doamnei','Constantin Brancusi','Valea Ialomitei','Parc Drumul Taberei','Romancierilor',
       'Favorit','Orizont','Academia Militara','Eroilor','Tudor Vladimirescu'],
}
const faraDiac = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/ș|ş/g, 's').replace(/ț|ţ/g, 't').replace(/ă|â/g, 'a').replace(/î/g, 'i')
  .toLowerCase().replace(/\s+/g, ' ').trim()
const STATII_LINII = {}
for (const [linie, st] of Object.entries(LINII_METROU))
  for (const s of st) (STATII_LINII[faraDiac(s)] = STATII_LINII[faraDiac(s)] || []).push(linie)
const ALIAS_STATII = { 'piata obor': 'obor', 'dristor 1': 'dristor', 'dristor 2': 'dristor' }
const magistralaCorecta = nume => {
  const k = faraDiac(nume)
  const m = STATII_LINII[k] || STATII_LINII[ALIAS_STATII[k]]
  return m ? m.join('/') : null
}
{
  // DE CE rescris la v430: blocul de aici construia tiparul dintr-o A DOUA lista,
  // de 33 de nume scrise de mana. Statiile care nu erau in acea lista — 1 Mai,
  // Jiului, Grozavesti, Izvor, Pantelimon, Eroii Revolutiei, Bazilescu, si chiar
  // „8 Noiembrie", o statie care nu exista — nu erau NICIODATA cautate, desi
  // dictionarul de mai sus stia raspunsul corect pentru unele dintre ele.
  // Acum numele se deriva din dictionar, deci cele doua nu mai pot diverge.
  const variante = new Set()
  for (const st of Object.values(LINII_METROU)) for (const s of st) {
    variante.add(s)
    variante.add(s.replace(/Piata/g, 'Piața').replace(/Stefan/g, 'Ștefan').replace(/Pacii/g, 'Păcii')
      .replace(/Grozavesti/g, 'Grozăvești').replace(/Straulesti/g, 'Străulești').replace(/Crangasi/g, 'Crângași')
      .replace(/Romana/g, 'Romană').replace(/Revolutiei/g, 'Revoluției').replace(/Brancoveanu/g, 'Brâncoveanu')
      .replace(/Brancusi/g, 'Brâncuși').replace(/Grivita/g, 'Grivița').replace(/Aparatorii/g, 'Apărătorii')
      .replace(/Militara/g, 'Militară').replace(/Raul/g, 'Râul').replace(/Ialomitei/g, 'Ialomiței'))
  }
  for (const extra of ['Dristor 1', 'Dristor 2']) variante.add(extra)
  const NUME = [...variante].sort((a, b) => b.length - a.length)
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const RE_METROU = new RegExp('(' + NUME.map(esc).join('|') + ')\\s*\\((M\\d(?:\\/M\\d)*)\\)', 'g')
  // Al doilea tipar: ORICE eticheta de magistrala precedata de un nume, ca sa
  // prindem si statiile pe care dictionarul nu le cunoaste deloc.
  const RE_ORICE = /Metroul?\s+([A-Z0-9ȘȚĂÂÎ][A-Za-zȘșȚțĂăÂâÎî0-9 ]{1,30}?)\s*\((M\d(?:\/M\d)*)\)/g
  const cunoscuta = n => !!magistralaCorecta(n)
  for (const f of ['data/blog.js', 'data/ansambluri/index.js', 'data/portofoliu.js', 'data/contact-map.js', 'app/apartamente/[tip]/page.js']) {
    const cale = resolve(ROOT, f)
    if (!fs.existsSync(cale)) continue
    const txt = fs.readFileSync(cale, 'utf8')
    const linia = i2 => txt.slice(0, i2).split('\n').length
    let m
    while ((m = RE_METROU.exec(txt))) {
      const corect = magistralaCorecta(m[1])
      if (corect && corect !== m[2])
        P(f, `„${m[1]} (${m[2]})" — statia este pe ${corect} (linia ${linia(m.index)})`)
    }
    const raportate = new Set()
    while ((m = RE_ORICE.exec(txt))) {
      const nume = m[1].trim()
      // Proza foloseste des o singura eticheta pentru doua statii:
      // „Metrou Stefan cel Mare si Obor (M1)". Se valideaza fiecare componenta;
      // se raporteaza doar daca NICIUNA nu e o statie cunoscuta.
      const parti = nume.split(/\s+(?:și|si)\s+|,\s*/).map(s => s.trim()).filter(Boolean)
      if (parti.some(cunoscuta) || raportate.has(nume)) continue
      raportate.add(nume)
      P(f, `„${nume} (${m[2]})" — statie necunoscuta in lista oficiala Metrorex (linia ${linia(m.index)})`)
    }
  }
}

// ── 2. Lungimea meta descrierilor ────────────────────────────
// DE CE: 17 descrieri depasisera 160 de caractere si se trunchiau in SERP.
{
  const verLung = (eticheta, d) => {
    if (!d) return
    if (d.length > 160) P(eticheta, `meta descriere de ${d.length} caractere (maxim 160)`)
    else if (d.length < 120) P(eticheta, `meta descriere de doar ${d.length} caractere (minim 120)`)
  }
  for (const a of ANSAMBLURI_ACTIVE) verLung(`ansamblu/${a.slug}`, a.seoDescription)
  if (ARTICOLE) for (const [slug, a] of Object.entries(ARTICOLE)) verLung(`blog/${slug}`, a.seoDesc)
}

// ── 3. Lungimea titlurilor, constienta de `absolute` ─────────
// DE CE: `title: { absolute: ... }` OCOLESTE template-ul '%s | Neofort IMO',
// deci sufixul NU se adauga. Un calcul care il presupune produce fals pozitive
// (la 13 oct am raportat 59 de titluri prea lungi; realitatea era 5).
// Blogul foloseste template-ul; ansamblurile si portofoliul folosesc `absolute`.
// Titlurile de blog sunt deja verificate mai sus (linia ~221) — aici doar ansamblurile,
// care folosesc {absolute} si deci NU primesc sufixul.
{
  for (const a of ANSAMBLURI_ACTIVE)
    if (a.seoTitle && a.seoTitle.length > 60)
      P(`ansamblu/${a.slug}`, `seoTitle de ${a.seoTitle.length} caractere (maxim 60; pagina foloseste {absolute}, fara sufix)`)
}

// ── 4. Articole orfane ───────────────────────────────────────
// DE CE: 4 articole nu primeau niciun link intern, nici din blog, nici din
// descrierile de ansambluri — autoritate zero si crawl rar.
if (ARTICOLE) {
  const textAnsambluri = ANSAMBLURI_ACTIVE.map(a => [a.descriere, a.descriereCompleta].filter(Boolean).join('\n')).join('\n')
  const textBlog = {}
  for (const [slug, a] of Object.entries(ARTICOLE)) textBlog[slug] = (a.sectiuni || []).map(s => s.continut).join('\n')
  for (const slug of Object.keys(ARTICOLE)) {
    const tinta = `/blog/${slug}`
    let intrari = textAnsambluri.includes(tinta) ? 1 : 0
    for (const [alt, t] of Object.entries(textBlog)) if (alt !== slug && t.includes(tinta)) intrari++
    if (!intrari) P(`blog/${slug}`, 'articol orfan — niciun link intern catre el')
  }
}

// ── 5. dataModificata inaintea publicarii ────────────────────
// DE CE: o data de modificare anterioara publicarii e imposibila si ajunge
// in `dateModified` din schema si in `lastModified` din sitemap.
if (ARTICOLE) for (const [slug, a] of Object.entries(ARTICOLE))
  if (a.dataModificata && a.dataISO && a.dataModificata < a.dataISO)
    P(`blog/${slug}`, `dataModificata (${a.dataModificata}) este inaintea dataISO (${a.dataISO})`)

// ── 6. Linkuri interne catre articole inexistente ────────────
// DE CE: un slug redenumit lasa in urma linkuri care dau 404.
if (ARTICOLE) {
  const existente = new Set(Object.keys(ARTICOLE))
  for (const [slug, a] of Object.entries(ARTICOLE)) {
    const t = (a.sectiuni || []).map(s => s.continut).join('\n')
    for (const m of t.matchAll(/\]\(\/blog\/([^)#?]+)/g))
      if (!existente.has(m[1])) P(`blog/${slug}`, `link intern catre articolul inexistent „${m[1]}"`)
  }
}

// ── 7. Sintaxa de tabel in campuri fara randor ───────────────
// DE CE: segmentatorul de tabele exista DOAR in app/blog/[slug]/page.js.
// DescriereExpand.js (ansambluri) si AnsambluVandut.js (portofoliu) randeaza
// fara el, deci un tabel scris acolo apare pe live cu pipe-uri vizibile —
// exact bug-ul reclamat pe articole inainte de v420.
{
  const areTabel = t => typeof t === 'string' && /\n\s*\|[^\n]*\|\s*\n\s*\|[\s:|-]+\|/.test(t)
  for (const a of ANSAMBLURI_ACTIVE)
    for (const camp of ['descriere', 'descriereCompleta'])
      if (areTabel(a[camp])) P(`ansamblu/${a.slug}`, `\`${camp}\` contine un tabel markdown, dar componenta nu are randor de tabele`)
  if (Array.isArray(TOATE_PORTOFOLIU)) for (const a of TOATE_PORTOFOLIU)
    for (const camp of ['descriere', 'descriereCompleta'])
      if (areTabel(a[camp])) P(`portofoliu/${a.slug}`, `\`${camp}\` contine un tabel markdown, dar AnsambluVandut.js randeaza text simplu`)
}


// ── 8. Blocuri „Pe scurt" pe ansambluri si portofoliu (v427) ─
// DE CE: blocurile sunt DERIVATE din date (lib/peScurt.js). Daca un camp
// structural dispare sau se goleste, blocul se degradeaza in tacere si pagina
// pierde raspunsul direct pe care il citesc LLM-urile. Verificarea cere ca
// fiecare entitate sa produca un bloc complet.
{
  const { peScurtAnsamblu, peScurtPortofoliu } = await import(resolve(ROOT, 'lib/peScurt.js'))
  // Un camp gol nu scurteaza blocul, ci lasa gauri in text („in , Sector 1"),
  // deci lungimea nu e suficienta ca test — se verifica si forma propozitiilor.
  const degradat = b => !b || b.length < 2 || b.some(l =>
    /\s,|\(\s*\)|\s{2,}|în\s*,|de la\s*€|undefined|NaN|null/.test(l))
  for (const a of ANSAMBLURI_ACTIVE)
    if (degradat(peScurtAnsamblu(a)))
      P(`ansamblu/${a.slug}`, 'blocul „Pe scurt" iese incomplet — lipseste un camp structural (zona, sector, etaje, tipuri sau pretDeLa)')
  if (Array.isArray(TOATE_PORTOFOLIU)) for (const a of TOATE_PORTOFOLIU)
    if (degradat(peScurtPortofoliu(a)))
      P(`portofoliu/${a.slug}`, 'blocul „Pe scurt" iese incomplet — lipseste un camp structural (zona, sector, etaje sau totalApartamente)')
}

// ── 9. Proiecte de portofoliu orfane (v427) ──────────────────
// DE CE: pana la v427, `similare` din AnsambluVandut.js era `.slice(0, 4)`,
// adica aceleasi patru proiecte pe toate paginile — 68 din 72 nu primeau niciun
// link intern. Verificarea reproduce selectia si cere ca fiecare proiect sa fie
// linkat de cel putin unul altul.
if (Array.isArray(TOATE_PORTOFOLIU) && TOATE_PORTOFOLIU.length > 2) {
  const T = TOATE_PORTOFOLIU, n = T.length
  const similare = a => {
    const idx = T.findIndex(p => p.slug === a.slug)
    const vecini = [T[(idx + 1) % n], T[(idx + 2) % n]]
    const luate = new Set([a.slug, ...vecini.map(p => p.slug)])
    const rel = [
      ...T.filter(p => !luate.has(p.slug) && p.zona === a.zona),
      ...T.filter(p => !luate.has(p.slug) && p.zona !== a.zona && p.sector === a.sector),
    ].slice(0, 2)
    return [...rel, ...vecini].slice(0, 4)
  }
  const intrari = {}
  for (const a of T) intrari[a.slug] = 0
  for (const a of T) for (const s of similare(a)) intrari[s.slug]++
  for (const [slug, n2] of Object.entries(intrari))
    if (!n2) P(`portofoliu/${slug}`, 'proiect orfan — niciun alt proiect nu linkeaza catre el')
}


// ── 10. Tabele scrise ca text (pseudo-tabele) (v428) ─────────
// DE CE: la v428 s-a gasit o sectiune intitulata chiar „Tabel comparativ" care
// NU era un tabel, ci randuri despartite prin liniute lungi. Pentru un cititor
// arata aproape la fel; pentru Google si pentru LLM-uri e proza, nu date — se
// pierde exact structura pe coloane care face continutul citabil.
if (ARTICOLE) {
  const separatoare = l => (l.match(/\s[—|]\s/g) || []).length
  for (const [slug, a] of Object.entries(ARTICOLE)) {
    for (const s of a.sectiuni || []) {
      const linii = s.continut.split('\n')
      let run = 0
      for (const l of linii) {
        const esteRandTabel = l.trim().startsWith('|')
        if (!esteRandTabel && separatoare(l) >= 2 && l.trim().length > 25) run++
        else {
          if (run >= 3) P(`blog/${slug}`, `sectiunea „${s.id}" contine ${run} randuri care arata ca un tabel scris ca text — de convertit in tabel real`)
          run = 0
        }
      }
      if (run >= 3) P(`blog/${slug}`, `sectiunea „${s.id}" contine ${run} randuri care arata ca un tabel scris ca text — de convertit in tabel real`)
    }
  }
}

// ── 11. Acelasi punct de interes scris in doua feluri (v429) ─
// DE CE: la v429, in acelasi set de date, aceeasi statie aparea si ca
// „Metrou Piata Muncii (M1)" si ca „Metrou Piața Muncii (M1)" — 194 de intrari
// in total, pe toate tipurile de POI. Pentru un cititor e aceeasi statie;
// pentru un motor de cautare si pentru un LLM sunt doua entitati diferite,
// deci semnalul se imparte in doua in loc sa se adune.
// Verificarea nu impune diacritice: impune CONSECVENTA. Daca o denumire apare
// intr-o singura forma, oricare ar fi ea, nu se raporteaza.
{
  const faraDiacritice = s => s.normalize('NFD').replace(/[̀-̧̦ͯ]/g, '')
    .replace(/[șşȘŞ]/g, 's').replace(/[țţȚŢ]/g, 't').replace(/[ăâĂÂ]/g, 'a').replace(/[îÎ]/g, 'i')
  const grup = {}
  for (const a of [...(ANSAMBLURI_ACTIVE || []), ...(TOATE_PORTOFOLIU || [])])
    for (const p of a.puncteInteres || [])
      if (p.nume) (grup[faraDiacritice(p.nume)] ||= new Set()).add(p.nume)
  for (const forme of Object.values(grup))
    if (forme.size > 1) P('puncteInteres', `aceeasi denumire scrisa in ${forme.size} feluri: ${[...forme].map(f => `„${f}"`).join(' ≠ ')}`)
}

// ── 12. Pagini de zona cu continut subtire (v429) ────────────
// DE CE: paginile /zona/* sunt exact paginile pe care e construita strategia
// „ansambluri rezidentiale + zona/sector" (R0), si pana la v429 aveau sub 60 de
// caractere de text unic fiecare — o fraza generata din sablon. O pagina de zona
// fara continut propriu concureaza cu paginile de ansamblu pentru aceleasi
// cautari si pierde. Pragul masoara DOAR textul unic al zonei (rezumat derivat
// + editorial), nu si numele ansamblurilor din grila.
{
  let peScurtZona, tabelZona, ZONE
  try {
    ;({ peScurtZona, tabelZona } = await import(resolve(ROOT, 'lib/zonaDerivat.js')))
    ;({ ZONE } = await import(resolve(ROOT, 'data/zone.js')))
  } catch { /* fisierele lipsesc: verificarea se sare, nu se inventeaza rezultat */ }
  if (peScurtZona && ZONE && ANSAMBLURI_ACTIVE) {
    const peZona = {}
    for (const a of ANSAMBLURI_ACTIVE) for (const z of a.zone || []) (peZona[z] ||= []).push(a)
    const PRAG = 400   // caractere de text unic; sub atat, pagina nu sustine o cautare proprie
    for (const [slug, lista] of Object.entries(peZona).sort()) {
      const esteSector = slug.startsWith('sector-')
      const nume = esteSector ? 'Sector ' + slug.split('-')[1] : lista[0].zona
      const ps = peScurtZona(nume, lista[0].sector, lista, esteSector) || []
      const ed = ZONE[slug] || {}
      const lungime = ps.join(' ').length
        + (ed.intro || '').length
        + (ed.sectiuni || []).reduce((s, x) => s + (x.titlu || '').length + (x.continut || '').length, 0)
        + (ed.faq || []).reduce((s, x) => s + (x.intrebare || '').length + (x.raspuns || '').length, 0)
      if (lungime < PRAG) P(`zona/${slug}`, `doar ${lungime} caractere de text unic (prag ${PRAG}) — lipseste continut editorial`)
      if (!tabelZona(lista) && lista.length >= 2) P(`zona/${slug}`, `${lista.length} ansambluri, dar tabelul comparativ nu se genereaza`)
    }
  }
}

// ── 13. Zone fara unghi editorial declarat (v429) ────────────
// DE CE: `titan-pallady` e inclusa in `sector-3`, `militari` in `sector-6`.
// Fara un unghi declarat explicit pentru fiecare, cele doua pagini ajung sa
// spuna acelasi lucru si se canibalizeaza reciproc in cautari. Verificarea
// prinde si cazul invers: o zona noua aparuta in date, pentru care nimeni
// nu a decis inca unghiul.
{
  let ZONE
  try { ({ ZONE } = await import(resolve(ROOT, 'data/zone.js'))) } catch {}
  if (ZONE && ANSAMBLURI_ACTIVE) {
    const inDate = new Set()
    for (const a of ANSAMBLURI_ACTIVE) for (const z of a.zone || []) inDate.add(z)
    for (const z of [...inDate].sort())
      if (!ZONE[z]) P(`zona/${z}`, 'zona exista in date dar nu are unghi editorial in data/zone.js')
      else if (!['administrativ', 'cartier'].includes(ZONE[z].unghi)) P(`zona/${z}`, `unghi editorial necunoscut: „${ZONE[z].unghi}"`)
    for (const z of Object.keys(ZONE))
      if (!inDate.has(z)) P(`zona/${z}`, 'declarata in data/zone.js dar niciun ansamblu activ nu o mai contine')
  }
}

// ── 14. Linkuri rupte din continutul de zona (v430) ──────────
// DE CE: textul editorial al zonelor leaga spre articole, spre alte zone si spre
// pagini de ansamblu. Un slug redenumit sau un articol sters lasa un link mort
// care nu rupe build-ul si nu se vede decat daca cineva da clic pe el.
{
  let ZONE
  try { ({ ZONE } = await import(resolve(ROOT, 'data/zone.js'))) } catch {}
  if (ZONE && ARTICOLE && ANSAMBLURI_ACTIVE) {
    const zoneOk = new Set(Object.keys(ZONE))
    const ansOk = new Set(ANSAMBLURI_ACTIVE.map(a => a.slug))
    for (const [z, v] of Object.entries(ZONE)) {
      const txt = (v.intro || '') + (v.sectiuni || []).map(s => s.continut).join(' ')
        + (v.faq || []).map(f => f.raspuns).join(' ')
      for (const m of txt.matchAll(/\]\((\/[^)]+)\)/g)) {
        const l = m[1]
        let ok = true
        if (l.startsWith('/blog/')) ok = !!ARTICOLE[l.slice(6)]
        else if (l.startsWith('/zona/')) ok = zoneOk.has(l.slice(6))
        else if (l.startsWith('/ansamblu-rezidential/')) ok = ansOk.has(l.slice(22))
        if (!ok) P(`zona/${z}`, `link intern rupt: ${l}`)
      }
    }
  }
}

// ── 15. Canibalizare sector ↔ micro-zona (v430) ──────────────
// DE CE: `titan-pallady` e continuta in `sector-3`, `militari` in `sector-6`.
// Cele doua pagini se adreseaza acelorasi cautari, deci daca ajung sa spuna
// acelasi lucru concureaza intre ele si pierd amandoua. Unghiul declarat in
// data/zone.js e regula; verificarea de aici o face masurabila, cautand
// secvente lungi de cuvinte care apar in ambele pagini.
{
  let ZONE
  try { ({ ZONE } = await import(resolve(ROOT, 'data/zone.js'))) } catch {}
  if (ZONE && ANSAMBLURI_ACTIVE) {
    const peZona = {}
    for (const a of ANSAMBLURI_ACTIVE) for (const z of a.zone || []) (peZona[z] ||= new Set()).add(a.slug)
    const textZona = z => {
      const v = ZONE[z] || {}
      return ((v.intro || '') + ' ' + (v.sectiuni || []).map(s => s.continut).join(' ')
        + ' ' + (v.faq || []).map(f => f.intrebare + ' ' + f.raspuns).join(' '))
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '')
        .toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean)
    }
    const siruri = (cuv, n = 8) => {
      const s = new Set()
      for (let i = 0; i + n <= cuv.length; i++) s.add(cuv.slice(i, i + n).join(' '))
      return s
    }
    for (const sector of Object.keys(peZona).filter(z => z.startsWith('sector-')))
      for (const micro of Object.keys(peZona).filter(z => !z.startsWith('sector-'))) {
        // Continuta = toate ansamblurile micro-zonei sunt si in sector.
        if (![...peZona[micro]].every(s => peZona[sector].has(s))) continue
        const a = siruri(textZona(sector)), b = siruri(textZona(micro))
        if (a.size < 20 || b.size < 20) continue   // una dintre pagini inca nu are text
        const comune = [...b].filter(s => a.has(s))
        if (comune.length)
          P(`zona/${micro}`, `${comune.length} secvente de 8+ cuvinte identice cu /zona/${sector} — unghiurile se suprapun (prima: „${comune[0].slice(0, 60)}…")`)
      }
  }
}

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
