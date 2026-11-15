// Server MCP doar citire: https://www.neofort.ro/api/mcp (v451)
// Protocolul: lib/mcpServer.js · Uneltele: lib/mcpUnelte.js · Datele: aceleasi fisiere ca paginile.
//
// Protectii: rate limit pe IP (120 cereri / 10 minute, Redis, fail-open), corp maxim 64 KB,
// fara batch, CORS deschis, Cache-Control: no-store. Contor zilnic de apeluri pe unealta in Redis
// (mcp:stats:AAAA-LL-ZZ, hash unealta → numar), ca sa se vada daca serverul e folosit.
// Nicio unealta nu scrie si nu trimite nimic.

import { createClient } from 'redis'
import { ANSAMBLURI, ANSAMBLURI_ACTIVE } from '@/data/ansambluri'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'
import { ARTICOLE, ARTICOLE_LIST } from '@/data/blog'
import { proceseaza, INFO_GET, E } from '@/lib/mcpServer'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const BASE = 'https://www.neofort.ro'
const CORP_MAXIM = 64 * 1024
const LIMITA = 120
const FEREASTRA_S = 600

const DATE = {
  ansambluri: ANSAMBLURI_ACTIVE,
  toateAnsamblurile: ANSAMBLURI,
  portofoliu: TOATE_PORTOFOLIU,
  articole: ARTICOLE,
  listaArticole: ARTICOLE_LIST,
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Mcp-Session-Id, Last-Event-ID',
  'Access-Control-Max-Age': '86400',
}
const ANTETE = { ...CORS, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }

const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), { status, headers: { ...ANTETE, 'Content-Type': 'application/json; charset=utf-8', ...extra } })

// ── Redis: aceeasi conexiune ca /api/contact si /api/views. Orice esec = mergem mai departe. ──
let client = null
async function redis() {
  if (!process.env.REDIS_URL) return null
  if (!client) {
    const c = createClient({ url: process.env.REDIS_URL, socket: { connectTimeout: 1500, reconnectStrategy: false } })
    c.on('error', () => { if (client === c) client = null })
    await c.connect()
    client = c
  }
  return client
}
const cuTimeout = (p, ms = 1500) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))])

async function depasesteLimita(ip) {
  try {
    const r = await cuTimeout(redis())
    if (!r) return false
    const cheie = `mcp:rl:${ip}:${Math.floor(Date.now() / 1000 / FEREASTRA_S)}`
    const n = await cuTimeout(r.incr(cheie))
    if (n === 1) await cuTimeout(r.expire(cheie, FEREASTRA_S))
    return n > LIMITA
  } catch { return false } // fail-open: un Redis cazut nu opreste serverul
}

function numaraApel(unealta) {
  const zi = new Date().toISOString().slice(0, 10)
  cuTimeout(redis()).then(r => r && r.multi().hIncrBy(`mcp:stats:${zi}`, unealta, 1).expire(`mcp:stats:${zi}`, 400 * 86400).exec()).catch(() => {})
}

// Cursul EUR/RON: din /api/curs (BNR, cache 4 ore) — aceeasi sursa ca /calculator-credit.
let cursCache = null
async function getCurs() {
  if (cursCache && Date.now() - cursCache.t < 3600 * 1000) return cursCache.v
  try {
    const res = await cuTimeout(fetch(`${BASE}/api/curs`, { cache: 'no-store' }), 3000)
    const d = await res.json()
    // Valoarea de rezerva din /api/curs (source: 'fallback') NU se foloseste: e o cifra fixa, nu un curs.
    const v = d && typeof d.rate === 'number' && d.source !== 'fallback' ? { rate: d.rate, date: d.date, source: d.source } : null
    cursCache = { t: Date.now(), v }
    return v
  } catch { return null }
}

export async function GET() {
  return json(INFO_GET, 405, { Allow: 'POST, OPTIONS' })
}

export async function DELETE() {
  return json({ eroare: 'Serverul nu folosește sesiuni.' }, 405, { Allow: 'POST, OPTIONS' })
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

export async function POST(request) {
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || 'necunoscut'
  if (await depasesteLimita(ip)) {
    return json({ jsonrpc: '2.0', id: null, error: { code: E.INTERNAL, message: `Prea multe cereri: maximum ${LIMITA} la ${FEREASTRA_S / 60} minute.` } }, 429, { 'Retry-After': String(FEREASTRA_S) })
  }

  const lungime = Number(request.headers.get('content-length') || 0)
  if (lungime > CORP_MAXIM) return json({ jsonrpc: '2.0', id: null, error: { code: E.INVALID_REQUEST, message: 'Corp prea mare (maximum 64 KB).' } }, 413)
  const text = await request.text()
  if (Buffer.byteLength(text) > CORP_MAXIM) return json({ jsonrpc: '2.0', id: null, error: { code: E.INVALID_REQUEST, message: 'Corp prea mare (maximum 64 KB).' } }, 413)

  let mesaj
  try { mesaj = JSON.parse(text) } catch {
    return json({ jsonrpc: '2.0', id: null, error: { code: E.PARSE, message: 'Parse error' } }, 400)
  }

  const headers = {}
  request.headers.forEach((v, k) => { headers[k.toLowerCase()] = v })

  try {
    const r = await proceseaza(mesaj, headers, { date: DATE, getCurs, onTool: numaraApel })
    if (r.status === 202) return new Response(null, { status: 202, headers: ANTETE })
    if (mesaj?.method === 'initialize' || mesaj?.method === 'server/discover') numaraApel(mesaj.method.replace('/', '_'))
    return json(r.body, r.status)
  } catch {
    return json({ jsonrpc: '2.0', id: mesaj?.id ?? null, error: { code: E.INTERNAL, message: 'Eroare internă.' } }, 200)
  }
}
