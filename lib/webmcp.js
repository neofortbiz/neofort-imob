// WebMCP (v453, v461): unelte declarate in pagina, pentru agentii AI din browser (ex. Chrome cu origin
// trial — tokenul e in next.config.js, antetul Origin-Trial). API experimental: orice eroare e
// prinsa aici, ca sa nu poata strica pagina pentru vizitatorii obisnuiti.
//
// v461 — regulile Chrome pentru unelte (developer.chrome.com/docs/ai/webmcp/best-practices si
// /secure-tools), aplicate aici o singura data:
//   - uneltele unei pagini se inregistreaza IMPREUNA: ori toate, ori niciuna (inregistreazaToate);
//   - raspunsul unei unelte are cel mult ~1.500 de caractere (LIMITA); peste, agentul poate taia sau
//     refuza. Serverul MCP (/api/mcp) ramane neschimbat — doar varianta din browser e scurtata;
//   - unealta raspunde DUPA ce pagina s-a actualizat (dupaRandare);
//   - linkurile spre neofort.ro devin cai relative, fara UTM: agentul e deja pe site, iar un UTM pe
//     un link intern ar rescrie sursa vizitei in GA4.

export const LIMITA = 1500

// Ambele denumiri au circulat in draftul de specificatie.
export function modelContext() {
  if (typeof window === 'undefined') return null
  try {
    const mc = document.modelContext ?? navigator.modelContext
    return mc && typeof mc.registerTool === 'function' ? mc : null
  } catch { return null }
}

// O singura unealta, in try/catch (folosita de FormularRapid, v453).
// `signal` (AbortController) o dezinregistreaza la demontarea componentei, ca sa nu se dubleze.
export function inregistreaza(mc, definitie, signal) {
  try {
    const r = mc.registerTool(definitie, { signal })
    if (r && typeof r.catch === 'function') r.catch(() => {})
  } catch { /* API experimental — ignoram */ }
}

// Setul de unelte al unei pagini, ca lot: daca una esueaza (sincron sau asincron), se retrag toate,
// ca agentul sa nu vada o pagina pe jumatate. Retragerea = abort pe un controller propriu, legat de
// `signal`-ul componentei (care le retrage oricum la demontare).
export function inregistreazaToate(mc, definitii, signal) {
  const lot = new AbortController()
  const retrage = () => { try { lot.abort() } catch {} }
  if (signal) {
    if (signal.aborted) return
    signal.addEventListener('abort', retrage, { once: true })
  }
  const promisiuni = []
  try {
    for (const d of definitii) {
      const r = mc.registerTool(d, { signal: lot.signal })
      if (r && typeof r.then === 'function') promisiuni.push(r)
    }
  } catch { retrage(); return }
  if (promisiuni.length) Promise.all(promisiuni).catch(retrage)
}

// Un apel catre serverul MCP al site-ului (/api/mcp). Uneltele globale NU au date proprii: raspund
// exact ca serverul. Protocolul vechi (fara antet MCP-Protocol-Version) e cel mai simplu.
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

// Pagina s-a redesenat (React a aplicat starea si browserul a pictat) — abia apoi raspunde unealta.
export function dupaRandare() {
  return new Promise(rez => {
    try { requestAnimationFrame(() => setTimeout(rez, 0)) } catch { setTimeout(rez, 0) }
  })
}

// Aduce un element in ecran; fara animatie daca vizitatorul a cerut miscare redusa.
export function aduInEcran(el, block = 'start') {
  try {
    if (!el) return
    const lin = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: lin ? 'smooth' : 'auto', block })
  } catch {}
}

// https://www.neofort.ro/x?utm_…=… → /x   (orice alt link ramane neatins)
export function caleInterna(url) {
  try {
    const u = new URL(url)
    if (/(^|\.)neofort\.ro$/.test(u.hostname)) return u.pathname + u.hash
  } catch {}
  return url
}
const faraUtm = v => {
  if (typeof v === 'string') return /^https?:\/\/([^/]+\.)?neofort\.ro(\/|$)/.test(v) ? caleInterna(v) : v
  if (Array.isArray(v)) return v.map(faraUtm)
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, faraUtm(x)]))
  return v
}

const eur = n => (typeof n === 'number' ? `${new Intl.NumberFormat('ro-RO').format(n)} €` : '—')

// Text din linii, in limita: antetul intra mereu; liniile se adauga cat incap; daca nu incap toate,
// se spune cate au ramas si ce sa faca agentul. `subsol` intra mereu la final.
export function inLimita(antet, linii, subsol = '', cumRestrangi = '') {
  const nota = n => `… încă ${n}. ${cumRestrangi}`.trim()
  const text = arr => [antet, ...arr, subsol].filter(Boolean).join('\n')
  const out = []
  for (let i = 0; i < linii.length; i++) {
    const ramase = linii.length - i - 1
    // linia intra doar daca, impreuna cu nota despre cele ramase, totul ramane in limita
    if (text([...out, linii[i], ...(ramase ? [nota(ramase)] : [])]).length > LIMITA) {
      out.push(nota(linii.length - i))
      break
    }
    out.push(linii[i])
  }
  return text(out).slice(0, LIMITA)
}

// Raspunsul scurt al unei unelte globale (rezultatul tools/call de la /api/mcp).
export function raspunsScurt(nume, rezultat) {
  const d = faraUtm(rezultat?.structuredContent)
  if (!d || typeof d !== 'object') return String(rezultat?.content?.[0]?.text ?? '').slice(0, LIMITA)
  if (d.eroare || rezultat?.isError) return JSON.stringify(d).slice(0, LIMITA)
  const TVA = 'Prețuri în EUR, FĂRĂ TVA (+21%).'
  try {
    switch (nume) {
      case 'search_apartments': {
        const linii = (d.apartamente || []).map(a => [
          a.proiect, a.tip, `${a.suprafata_mp} mp`, a.etaj,
          (a.variante_pret || []).length > 1
            ? a.variante_pret.map(v => `${v.varianta}: ${eur(v.pret_eur)}`).join(' / ')
            : `de la ${eur(a.pret_de_la_eur)}`,
          a.promotie ? 'promoție' : '', a.url,
        ].filter(Boolean).join(' · '))
        return inLimita(`${d.total_gasite} apartamente găsite. ${TVA}`, linii, '', 'Restrânge căutarea (camere, buget, zonă) sau deschide pagina proiectului.')
      }
      case 'list_projects': {
        const linii = (d.ansambluri_in_vanzare || []).map(p =>
          `${p.proiect} · ${p.zona}, ${p.sector} · ${p.stadiu} · de la ${eur(p.pret_de_la_eur)} · ${p.suprafete} · ${p.url}`)
        const vandute = (d.portofoliu_vandut || []).length
        return inLimita(`${linii.length} ansambluri în vânzare. ${TVA}`, linii,
          vandute ? `Portofoliu vândut: ${vandute} proiecte (istoric, nu oferte) — /portofoliu` : '', 'Filtrează după zonă.')
      }
      case 'get_project': {
        // Fisa are ~12.000 de caractere; partea de sus (titlu, rezumat, date-cheie) incape si spune esentialul.
        const md = String(d.fisa_markdown || '')
        const sus = md.split('\n## ')[0].split('\n').filter(l => !/^- Coordonate:/.test(l)).join('\n').trim()
        const subsol = `Fișa completă: ${d.url}.md · pagina: ${d.url}`
        return (sus.length + subsol.length + 1 > LIMITA ? sus.slice(0, LIMITA - subsol.length - 2) + '…' : sus) + '\n' + subsol
      }
      case 'search_articles': {
        const linii = (d.articole || []).map(a => `${a.titlu} — ${a.url}`)
        return inLimita(`Articole pentru „${d.interogare}”:`, linii, 'Textul complet: adaugă .md la adresa articolului.', '')
      }
      default:
        return JSON.stringify(d).slice(0, LIMITA)
    }
  } catch {
    return JSON.stringify(d).slice(0, LIMITA)
  }
}
