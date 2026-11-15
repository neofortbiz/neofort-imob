// MCP Server Card (v460) la adresa rezervata de SEP-2127: <URL-ul serverului MCP>/server-card.
// Continutul: lib/serverCard.js. Antete dupa docs/discovery.md din extensia oficiala: media type
// application/mcp-server-card+json, CORS deschis (doar GET), cache o ora, ETag + 304 la If-None-Match.
// Pagina e permisa explicit in robots.txt (Allow: /api/mcp/server-card), restul /api/ ramane blocat.
import { createHash } from 'crypto'
import { serverCard, TIP_CARD } from '@/lib/serverCard'

export const dynamic = 'force-dynamic'

const CORP = JSON.stringify(serverCard(), null, 2) + '\n'
const ETAG = `"${createHash('sha256').update(CORP).digest('hex').slice(0, 32)}"`
const ANTETE = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
  'Access-Control-Expose-Headers': 'ETag',
  'Cache-Control': 'public, max-age=3600',
  ETag: ETAG,
  'X-Robots-Tag': 'noindex',
}

export function GET(request) {
  const inm = request.headers.get('if-none-match')
  if (inm && inm.split(',').map(s => s.trim().replace(/^W\//, '')).includes(ETAG)) {
    return new Response(null, { status: 304, headers: ANTETE })
  }
  return new Response(CORP, { status: 200, headers: { ...ANTETE, 'Content-Type': `${TIP_CARD}; charset=utf-8` } })
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: ANTETE })
}
