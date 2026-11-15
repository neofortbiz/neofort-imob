// Protocolul MCP pentru /api/mcp (v451) — functie pura, fara HTTP si fara Redis, ca sa poata fi
// testata direct. Ruta (app/api/mcp/route.js) se ocupa de corp, rate limit, CORS si contoare.
//
// Transport: Streamable HTTP FARA STARE — fiecare POST e un mesaj JSON-RPC 2.0, raspunsul e JSON
// simplu (fara SSE, fara sesiuni). Doua generatii de protocol, ca la neofort-biz.ro:
//   - MODERN (2026-07-28): fara `initialize`; versiunea vine in fiecare cerere, in
//     params._meta["io.modelcontextprotocol/protocolVersion"] SI in antetul MCP-Protocol-Version;
//     `server/discover` obligatoriu; rezultatele au resultType: 'complete'; antetele Mcp-Method si
//     Mcp-Name se valideaza fata de corp (-32020); versiune necunoscuta → -32022 cu lista suportata.
//   - VECHI (2024-11-05 … 2025-11-25): initialize → tools/list → tools/call, plus ping.
// Rutarea intre ele se face DUPA ANTET, exact ca SDK-ul oficial: antet MCP-Protocol-Version prezent
// si diferit de o versiune veche → modern; altfel → vechi.

import { UNELTE, INSTRUCTIUNI, ruleazaUnealta, valideazaArgumente } from './mcpUnelte.js'

export const VERSIUNI_MODERNE = ['2026-07-28']
export const VERSIUNI_VECHI = ['2024-11-05', '2025-03-26', '2025-06-18', '2025-11-25']
export const SERVER_INFO = { name: 'neofort-imo', title: 'Neofort IMO — ansambluri rezidențiale București', version: '1.0.0', websiteUrl: 'https://www.neofort.ro' }

const META_VERSIUNE = 'io.modelcontextprotocol/protocolVersion'
const META_CAPABILITATI = 'io.modelcontextprotocol/clientCapabilities'

export const E = { PARSE: -32700, INVALID_REQUEST: -32600, METHOD_NOT_FOUND: -32601, INVALID_PARAMS: -32602, INTERNAL: -32603, HEADER_MISMATCH: -32020, UNSUPPORTED_VERSION: -32022 }
// Statusul HTTP pentru fiecare cod de eroare (tabelul din SDK-ul oficial, mcp/shared/inbound.py).
const STATUS = { [-32700]: 400, [-32600]: 400, [-32602]: 400, [-32020]: 400, [-32022]: 400, [-32601]: 404 }

const CAPABILITATI = { tools: { listChanged: false } }

const raspuns = (id, result) => ({ status: 200, body: { jsonrpc: '2.0', id, result } })
const eroare = (id, code, message, data, modern = true) => ({
  status: modern ? (STATUS[code] || 200) : (code === E.PARSE || code === E.INVALID_REQUEST ? 400 : 200),
  body: { jsonrpc: '2.0', id: id ?? null, error: { code, message, ...(data !== undefined ? { data } : {}) } },
})

// „=?base64?…?=" → text (antetul Mcp-Name poate fi codat asa). Forma stricata → null.
export function decodeazaAntet(v) {
  if (v == null) return null
  const m = /^=\?base64\?(.*)\?=$/.exec(v)
  if (!m) return v
  try {
    const buf = Buffer.from(m[1], 'base64')
    if (buf.toString('base64') !== m[1]) return null
    return new TextDecoder('utf-8', { fatal: true }).decode(buf)
  } catch { return null }
}

const toolsList = () => ({ tools: UNELTE })

async function toolsCall(params, ctx) {
  const nume = params?.name
  const unealta = UNELTE.find(u => u.name === nume)
  if (!unealta) return { eroareRpc: [E.INVALID_PARAMS, `Unealtă necunoscută: ${nume}`] }
  const args = params.arguments ?? {}
  const gresit = valideazaArgumente(unealta, args)
  ctx.onTool?.(nume)
  if (gresit) return { result: { content: [{ type: 'text', text: `Argument invalid: ${gresit}.` }], isError: true } }
  const curs = nume === 'calculate_mortgage' && ctx.getCurs ? await ctx.getCurs() : null
  const rez = ruleazaUnealta(nume, args, ctx.date, curs)
  const isError = !!rez?.eroare
  return { result: { content: [{ type: 'text', text: JSON.stringify(rez, null, 1) }], structuredContent: rez, isError } }
}

// headers: obiect cu chei lowercase. Intoarce { status, body } sau { status: 202 } pentru notificari.
export async function proceseaza(mesaj, headers, ctx) {
  if (Array.isArray(mesaj)) return eroare(null, E.INVALID_REQUEST, 'Cererile batch nu sunt acceptate; trimite câte un mesaj JSON-RPC pe cerere.')
  if (!mesaj || typeof mesaj !== 'object' || mesaj.jsonrpc !== '2.0' || typeof mesaj.method !== 'string') {
    if (mesaj && typeof mesaj === 'object' && !('method' in mesaj)) return eroare(mesaj.id, E.INVALID_REQUEST, 'Corpul trebuie să fie o cerere sau o notificare JSON-RPC.')
    return eroare(mesaj?.id, E.INVALID_REQUEST, 'Cerere JSON-RPC invalidă.')
  }
  const esteNotificare = !('id' in mesaj)
  const vAntet = headers['mcp-protocol-version']
  const modern = vAntet != null && !VERSIUNI_VECHI.includes(vAntet)

  // ── MODERN ──
  if (modern) {
    if (esteNotificare) {
      return VERSIUNI_MODERNE.includes(vAntet)
        ? { status: 202 }
        : eroare(null, E.UNSUPPORTED_VERSION, 'Unsupported protocol version', { supported: VERSIUNI_MODERNE, requested: vAntet })
    }
    const { id, method } = mesaj
    const params = mesaj.params
    const meta = params && typeof params === 'object' ? params._meta : null
    if (!meta || typeof meta !== 'object' || Array.isArray(meta)) return eroare(id, E.INVALID_PARAMS, `params._meta must be an object carrying the required '${META_VERSIUNE}' and '${META_CAPABILITATI}' envelope keys`)
    const lipsa = [META_VERSIUNE, META_CAPABILITATI].filter(k => !(k in meta))
    if (lipsa.length) return eroare(id, E.INVALID_PARAMS, `params._meta is missing the required envelope key(s): ${lipsa.join(', ')}`)
    const versiune = meta[META_VERSIUNE]
    if (vAntet !== versiune) return eroare(id, E.HEADER_MISMATCH, 'mcp-protocol-version header does not match the request envelope\'s protocol version')
    if (headers['mcp-method'] !== method) return eroare(id, E.HEADER_MISMATCH, 'mcp-method header does not match the request body\'s method')
    if (method === 'tools/call' && params.name != null && decodeazaAntet(headers['mcp-name']) !== params.name) return eroare(id, E.HEADER_MISMATCH, 'mcp-name header does not match the request body\'s \'name\' parameter')
    if (typeof versiune !== 'string') return eroare(id, E.INVALID_PARAMS, 'the protocol-version envelope value must be a string')
    if (!VERSIUNI_MODERNE.includes(versiune)) return eroare(id, E.UNSUPPORTED_VERSION, 'Unsupported protocol version', { supported: VERSIUNI_MODERNE, requested: versiune })

    const complet = r => raspuns(id, { ...r, resultType: 'complete' })
    // server/discover si tools/list sunt „cacheable" la 2026-07-28: ttlMs + cacheScope obligatorii.
    // Lista de unelte se schimba doar la un deploy → o ora, public. (`ping` nu mai exista la 2026-07-28.)
    const CACHE = { ttlMs: 3600000, cacheScope: 'public' }
    switch (method) {
      case 'server/discover':
        return complet({ supportedVersions: VERSIUNI_MODERNE, capabilities: CAPABILITATI, instructions: INSTRUCTIUNI, ...CACHE, _meta: { serverInfo: SERVER_INFO } })
      case 'tools/list':
        return complet({ ...toolsList(), ...CACHE })
      case 'tools/call': {
        const r = await toolsCall(params, ctx)
        return r.eroareRpc ? eroare(id, ...r.eroareRpc) : complet(r.result)
      }
      default:
        return eroare(id, E.METHOD_NOT_FOUND, `Method not found: ${method}`)
    }
  }

  // ── VECHI ──
  if (esteNotificare) return { status: 202 }
  const { id, method, params } = mesaj
  switch (method) {
    case 'initialize': {
      const ceruta = params?.protocolVersion
      return raspuns(id, {
        protocolVersion: VERSIUNI_VECHI.includes(ceruta) ? ceruta : VERSIUNI_VECHI[VERSIUNI_VECHI.length - 1],
        capabilities: CAPABILITATI,
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIUNI,
      })
    }
    case 'ping':
      return raspuns(id, {})
    case 'tools/list':
      return raspuns(id, toolsList())
    case 'tools/call': {
      const r = await toolsCall(params, ctx)
      return r.eroareRpc ? eroare(id, ...r.eroareRpc, undefined, false) : raspuns(id, r.result)
    }
    default:
      return eroare(id, E.METHOD_NOT_FOUND, `Method not found: ${method}`, undefined, false)
  }
}

// Raspunsul la GET /api/mcp: o descriere scurta, utila ca verificare rapida in browser.
export const INFO_GET = {
  server: SERVER_INFO,
  descriere: 'Server MCP doar citire pentru ofertele Neofort IMO (ansambluri rezidențiale în București). Se folosește prin POST JSON-RPC, nu din browser.',
  transport: 'Streamable HTTP, fără stare, răspuns JSON',
  versiuni_protocol: [...VERSIUNI_MODERNE, ...VERSIUNI_VECHI],
  unelte: UNELTE.map(u => u.name),
}
