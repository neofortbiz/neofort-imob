// robots.txt (v458) — inlocuieste app/robots.js.
//
// DE CE route handler si nu app/robots.js: metadata-ul `robots` din Next.js stie doar User-Agent,
// Allow, Disallow, Crawl-delay, Host si Sitemap. Semnalele pentru agenti AI de mai jos sunt directive
// noi, pe care app/robots.js nu le poate scrie.
//
// Partea de la REGULI pana la Sitemap produce EXACT textul de dinainte (acelasi format ca Next.js,
// verificat caracter cu caracter fata de robots.txt live). Adaugat in v458, toate PERMISIVE:
//   1. Content-Signal in grupul `*` — search=yes, ai-input=yes, ai-train=yes (Cloudflare, indiciu).
//   2. Grupul `__usage_ai-training` cu Allow: / — semnalul comun Google, Microsoft, OpenAI, Anthropic
//      pentru folosirea continutului de catre AI (la Google conteaza si pentru Gemini). Fara el, fisierul
//      nu exprima nicio preferinta.
//   3. Agentmap — trimite agentii la catalogul ARD (/.well-known/ard.json); Lighthouse il cauta primul.
// Toate trei sunt in lista de directive acceptate de Lighthouse (auditul „robots.txt is valid").

export const dynamic = 'force-static'

const BASE = 'https://www.neofort.ro'

const REGULI = [
  // Reguli principale pentru www.neofort.ro (+ semnalul de continut pentru AI, v458)
  { userAgent: '*', allow: '/', disallow: ['/api/'], extra: ['Content-Signal: search=yes, ai-input=yes, ai-train=yes'] },
  // LLM crawlers — acces complet pentru indexare AI
  { userAgent: 'GPTBot', allow: '/' },
  { userAgent: 'ChatGPT-User', allow: '/' },
  { userAgent: 'OAI-SearchBot', allow: '/' },
  { userAgent: 'CCBot', allow: '/' },
  { userAgent: 'ClaudeBot', allow: '/' },
  { userAgent: 'anthropic-ai', allow: '/' },
  { userAgent: 'PerplexityBot', allow: '/' },
  { userAgent: 'Google-Extended', allow: '/' },
  { userAgent: 'cohere-ai', allow: '/' },
  { userAgent: 'Googlebot-Image', allow: '/' },
  { userAgent: 'Bingbot', allow: '/' },
  { userAgent: 'meta-externalagent', allow: '/' },
  { userAgent: 'Applebot-Extended', allow: '/' },
  { userAgent: 'Amazonbot', allow: '/' },
  // Semnalul comun pentru folosirea continutului de catre AI (v458): permis.
  { userAgent: '__usage_ai-training', allow: '/' },
]
// Domeniile de staging sunt blocate prin X-Robots-Tag header in next.config.js,
// nu prin robots.txt (robots.txt nu suporta conditii de host)

const lista = v => (Array.isArray(v) ? v : [v])

export function textRobots() {
  let t = ''
  for (const r of REGULI) {
    for (const ua of lista(r.userAgent)) t += `User-Agent: ${ua}\n`
    if (r.allow) for (const a of lista(r.allow)) t += `Allow: ${a}\n`
    if (r.disallow) for (const d of lista(r.disallow)) t += `Disallow: ${d}\n`
    for (const e of r.extra || []) t += `${e}\n`
    t += '\n'
  }
  t += `Sitemap: ${BASE}/sitemap.xml\n`
  t += `Agentmap: ${BASE}/.well-known/ard.json\n`
  return t
}

export function GET() {
  return new Response(textRobots(), {
    headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'public, max-age=0, must-revalidate' },
  })
}
