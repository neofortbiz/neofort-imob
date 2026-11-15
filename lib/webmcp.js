// WebMCP (v453): unelte declarate in pagina, pentru agentii AI din browser (ex. Chrome cu origin
// trial — tokenul e in next.config.js, antetul Origin-Trial). API experimental: orice eroare e
// prinsa aici, ca sa nu poata strica pagina pentru vizitatorii obisnuiti.

// Ambele denumiri au circulat in draftul de specificatie.
export function modelContext() {
  if (typeof window === 'undefined') return null
  try {
    const mc = document.modelContext ?? navigator.modelContext
    return mc && typeof mc.registerTool === 'function' ? mc : null
  } catch { return null }
}

// Fiecare unealta se inregistreaza separat, in try/catch: o eroare la una nu le blocheaza pe celelalte.
// `signal` (AbortController) le dezinregistreaza la demontarea componentei, ca sa nu se dubleze.
export function inregistreaza(mc, definitie, signal) {
  try {
    const r = mc.registerTool(definitie, { signal })
    if (r && typeof r.catch === 'function') r.catch(() => {})
  } catch { /* API experimental — ignoram */ }
}

// Un apel tools/call catre serverul MCP al site-ului (/api/mcp). Uneltele din pagina NU au date
// proprii: raspund exact ca serverul. Protocolul vechi (fara antet MCP-Protocol-Version) e cel mai simplu.
export async function apelMcp(method, params) {
  const r = await fetch('/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  })
  const j = await r.json()
  if (j.error) throw new Error(j.error.message || 'eroare server')
  return j.result
}
