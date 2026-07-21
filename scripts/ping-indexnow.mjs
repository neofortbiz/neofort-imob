#!/usr/bin/env node
// ============================================================
// scripts/ping-indexnow.mjs
// Notifica motoarele (Bing, Yandex, Seznam, Naver) ca URL-urile s-au
// actualizat — prin protocolul IndexNow.
//
// DE CE CONTEAZA IN 2026: indexul Bing alimenteaza ChatGPT Search.
// Un ping IndexNow inseamna ca o promotie noua sau un pret modificat
// devine vizibil in ore, nu in saptamani — atat in Bing, cat si in
// raspunsurile AI care se bazeaza pe el. Google NU foloseste IndexNow
// (el ramane pe sitemap + crawl), deci nu inlocuieste nimic, doar adauga.
//
// RULEAZA: la prebuild, dupa generarea datelor.
// NU BLOCHEAZA BUILD-UL: orice eroare de retea e doar logata.
// ============================================================

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const HOST = 'www.neofort.ro'
const BASE = `https://${HOST}`

// Cheia = numele fisierului din /public (fara .txt), conform protocolului.
function getKey() {
  const files = fs.readdirSync(path.join(ROOT, 'public'))
  const keyFile = files.find(f => /^[a-f0-9]{32}\.txt$/.test(f))
  return keyFile ? keyFile.replace('.txt', '') : null
}

const KEY = getKey()
if (!KEY) {
  console.warn('[indexnow] Nu gasesc fisierul de cheie in /public — sar peste ping.')
  process.exit(0)
}

// URL-urile care conteaza pentru prospetime: paginile care se schimba
// efectiv (ansambluri, listari, promotii). Nu trimitem tot sitemap-ul —
// IndexNow e pentru semnalarea schimbarilor, nu pentru inventar complet.
function getUrls() {
  const urls = [
    `${BASE}/`,
    `${BASE}/ansambluri-rezidentiale`,
    `${BASE}/promotii`,
    `${BASE}/zona`,
    `${BASE}/blog`,
  ]
  try {
    const src = fs.readFileSync(path.join(ROOT, 'data', 'contact-map.js'), 'utf-8')
    const slugs = [...src.matchAll(/'(neofort-[a-z0-9-]+)':/g)].map(m => m[1])
    slugs.forEach(s => urls.push(`${BASE}/ansamblu-rezidential/${s}`))
  } catch (e) {
    console.warn('[indexnow] Nu pot citi contact-map.js:', e.message)
  }
  return urls
}

const urlList = getUrls()

try {
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${BASE}/${KEY}.txt`,
      urlList,
    }),
  })
  // 200 = acceptat, 202 = acceptat spre validare. Ambele sunt succes.
  if (res.ok || res.status === 202) {
    console.log(`[indexnow] Trimis ${urlList.length} URL-uri (HTTP ${res.status})`)
  } else {
    console.warn(`[indexnow] Raspuns neasteptat: HTTP ${res.status} — build-ul continua`)
  }
} catch (e) {
  // Niciodata nu oprim build-ul pentru un ping esuat.
  console.warn('[indexnow] Ping esuat (build-ul continua):', e.message)
}
