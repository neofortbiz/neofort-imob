// Versiunile Markdown ale paginilor, pentru agenti AI (convenția llmstxt.org: aceeasi adresa + „.md").
//   /blog/<slug>.md                  → mdArticol
//   /ansamblu-rezidential/<slug>.md  → mdAnsamblu (activ) / mdPortofoliu (vandut)
//
// REGULA: .md contine EXACT datele afisate pe pagina, din aceleasi surse, nimic in plus si
// nimic scris separat. FAQ-ul ansamblului vine din lib/faqAnsamblu.js, ca pe pagina; textele
// „Pe scurt" din lib/peScurt.js; intervalul de suprafete din lib/oferteSchema.js.
// SEO: raspunsul are noindex si Link canonical spre pagina HTML (vezi raspunsMarkdown),
// deci nu poate concura cu pagina in Google.
//
// Fisierul primeste datele ca argumente si nu importa nimic din data/ si nici alias `@/`,
// ca sa poata fi testat direct cu node (scratchpad/test-md) si folosit din rute.

import { peScurtAnsamblu, peScurtPortofoliu } from './peScurt.js'
import { textSuprafete } from './oferteSchema.js'
import { faqAnsamblu } from './faqAnsamblu.js'

export const BASE = 'https://www.neofort.ro'
const TEL_GENERAL = '0758 090 904'

const nf = n => new Intl.NumberFormat('ro-RO').format(n)
const dataNumerica = iso => (iso ? String(iso).split('-').reverse().join('.') : '')

// Linkurile relative din continut ([text](/cale)) devin absolute — un agent care citeste
// fisierul separat de site trebuie sa poata urma linkul.
export const linkuriAbsolute = text =>
  String(text || '').replace(/\]\((\/[^)\s]*)\)/g, (_, cale) => `](${BASE}${cale})`)

const lista = linii => linii.map(l => `- ${l}`).join('\n')

// ── Articol de blog ──────────────────────────────────────────
// Ordinea paginii: titlu, descriere (lead), Pe scurt, sectiunile in ordine (h2, h3, continut).
// FAQ: pe pagina fiecare bloc are intrebarea pe primul rand → aici „### intrebare" + raspuns.
export function mdArticol(slug, a, autor) {
  const url = `${BASE}/blog/${slug}`
  const out = []
  out.push(`# ${a.titlu}`, '')
  out.push(`> ${a.descriere}`, '')
  const meta = [
    `Pagina: ${url}`,
    `Publicat: ${dataNumerica(a.dataISO)}`,
    ...(a.dataModificata ? [`Actualizat: ${dataNumerica(a.dataModificata)}`] : []),
    ...(autor?.nume ? [`Autor: ${autor.nume}${autor.titlu ? `, ${autor.titlu}` : ''}`] : []),
    ...(a.tag ? [`Categorie: ${a.tag}`] : []),
    ...(a.citire ? [`Timp de citire: ${a.citire}`] : []),
  ]
  out.push(lista(meta), '')
  if (a.peScurt?.length) out.push('## Pe scurt', '', lista(a.peScurt.map(linkuriAbsolute)), '')
  for (const s of a.sectiuni || []) {
    out.push(`## ${linkuriAbsolute(s.h2)}`, '')
    if (s.h3) out.push(`### ${linkuriAbsolute(s.h3)}`, '')
    if (s.id === 'faq') {
      for (const bloc of s.continut.split('\n\n').filter(b => b.trim())) {
        const linii = bloc.trim().split('\n')
        const intrebare = linii[0].replace(/^\*\*|\*\*$/g, '')
        const raspuns = linii.slice(1).join('\n').trim()
        if (!raspuns) { out.push(linkuriAbsolute(bloc.trim()), ''); continue }
        out.push(`### ${intrebare}`, '', linkuriAbsolute(raspuns), '')
      }
    } else {
      out.push(linkuriAbsolute(s.continut.trim()), '')
    }
  }
  out.push('---', '')
  out.push(`Articol publicat de Neofort IMO, dezvoltator de ansambluri rezidențiale în București: ${url}`)
  out.push(`Contact: ${TEL_GENERAL} · ${BASE}/contact · Ansambluri în vânzare: ${BASE}/ansambluri-rezidentiale`)
  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
}

// ── Ansamblu ACTIV ───────────────────────────────────────────
// Prețurile se afiseaza cum le afiseaza tabelul (components/ApartamenteTable.js):
// cu pretPromo → doar pretul promotional; altfel avans 90% (daca exista), 45%, 20%; toate +TVA.
const EXTRA = { terasa: 'terasă', teren: 'curte' }
const suprafataApt = apt => {
  const pre = apt.deLaSuprafata ? 'de la ' : ''
  return apt.suprafataExtra
    ? `${pre}${apt.suprafata} mp + ${EXTRA[apt.tipExtra] || apt.tipExtra} ${apt.suprafataExtra} mp`
    : `${pre}${apt.suprafata} mp`
}
const pretApt = (v, apt) => (v ? `${apt?.deLaPret ? 'de la ' : ''}${nf(v)} €` : '—')
const celula = s => String(s ?? '').replace(/\|/g, '/').replace(/\n/g, ' ')

function preturiApt(apt) {
  if (apt.pretPromo) return `${pretApt(apt.pretPromo, apt)} (promoție)`
  if (apt.avans45) {
    return [
      apt.avans90 ? `avans 90%: ${pretApt(apt.avans90, apt)}` : null,
      `avans 45%: ${pretApt(apt.avans45, apt)}`,
      `avans 20%: ${pretApt(apt.avans20, apt)}`,
    ].filter(Boolean).join(' · ')
  }
  return pretApt(apt.avans20, apt)
}

function parcareActiv(p) {
  if (!p) return []
  const linie = (eticheta, x) => x?.disponibil
    ? `${eticheta}${x.pret ? `: ${p.deLa ? 'de la ' : ''}${nf(x.pret)} € ${x.notaTVA || '+TVA'}` : ''}`
    : null
  return [
    linie('Parcare exterioară', p.exterior),
    linie('Parcare interioară', p.interior),
    linie('Parcare subterană', p.subteran),
    linie('Boxă', p.boxe),
  ].filter(Boolean)
}

export function mdAnsamblu(a) {
  const url = `${BASE}/ansamblu-rezidential/${a.slug}`
  const stadiu = a.dataPredare === 'Finalizat' ? 'Finalizat' : `În construcție · predare ${a.dataPredare}`
  const out = []
  out.push(`# Ansamblu Rezidențial ${a.nume}`, '')
  out.push(`> ${a.descriere}`, '')
  out.push(lista([
    `Pagina: ${url}`,
    `Stare: în vânzare`,
    `Zonă: ${a.zona}, ${a.sector}, București`,
    `Adresă: ${a.adresa}`,
    `Stadiu: ${stadiu}`,
    `Regim de înălțime: ${a.etaje}`,
    `Tipuri: ${(a.tipuri || []).join(', ')}`,
    `Preț de la: ${nf(a.pretDeLa)} € + TVA`,
    `Suprafețe: ${textSuprafete(a.apartamente)}`,
    `Coordonate: ${a.coordonate.lat}, ${a.coordonate.lng}`,
  ]), '')

  const scurt = peScurtAnsamblu(a)
  if (scurt) out.push('## Pe scurt', '', lista(scurt), '')

  out.push('## Despre ansamblu', '', linkuriAbsolute(a.descriereCompleta || a.descriere), '')

  // Tabelul de pe pagina: disponibilele primele, vandutele raman, marcate (R17).
  const apts = [...(a.apartamente || [])].sort((x, y) => (x.stocEpuizat ? 1 : 0) - (y.stocEpuizat ? 1 : 0))
  out.push('## Apartamente', '', 'Prețuri fără TVA (+TVA).', '')
  out.push('| Tip | Etaj | Suprafață | Preț | Disponibilitate |', '|---|---|---|---|---|')
  for (const apt of apts) {
    const tip = `${apt.tip}${apt.promo && !apt.stocEpuizat ? ' (PROMO)' : ''}`
    out.push(`| ${celula(tip)} | ${celula(apt.etaj || '—')} | ${celula(suprafataApt(apt))} | ${celula(preturiApt(apt))} | ${apt.stocEpuizat ? 'vândut' : 'disponibil'} |`)
  }
  out.push('')

  const parc = parcareActiv(a.parcare)
  if (parc.length) out.push('## Parcare', '', lista(parc), '')

  if (a.dotari?.length) out.push('## Dotări și finisaje', '', lista(a.dotari), '')

  if (a.puncteInteres?.length)
    out.push('## Locație și transport', '', lista(a.puncteInteres.map(p => `${p.nume}: ${p.distanta}`)), '')

  out.push(`## Întrebări frecvente despre ${a.nume}`, '')
  for (const q of faqAnsamblu(a)) out.push(`### ${q.name}`, '', q.acceptedAnswer.text, '')

  out.push('## Contact', '')
  out.push(lista([
    `Broker: ${a.broker}${a.brokerTel ? `, ${a.brokerTel}` : ''}`,
    `Neofort IMO: ${TEL_GENERAL} · ${BASE}/contact`,
    `Pagina ansamblului: ${url}`,
  ]))
  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
}

// ── Ansamblu din PORTOFOLIU (vandut) ─────────────────────────
// Ce arata AnsambluVandut.js: Pe scurt, descriere, prețuri de referinta, dotari, puncte de interes,
// parcare, broker. Prețurile: cum sunt pe pagina, + TVA, cu exceptia celor care au „TVA inclus" in denumire.
export function mdPortofoliu(p) {
  const url = `${BASE}/ansamblu-rezidential/${p.slug}`
  const out = []
  out.push(`# Ansamblu Rezidențial ${p.zona} — ${p.nume}`, '')
  out.push(`> ${p.descriere}`, '')
  out.push(lista([
    `Pagina: ${url}`,
    `Stare: finalizat și vândut integral (stoc epuizat)`,
    `Zonă: ${p.zona}, ${p.sector}, București`,
    ...(p.adresa ? [`Adresă: ${p.adresa}`] : []),
    ...(p.etaje ? [`Regim de înălțime: ${p.etaje}`] : []),
    ...(p.totalApartamente ? [`Unități: ${p.totalApartamente}`] : []),
    ...(p.tipuri?.length ? [`Tipuri: ${p.tipuri.join(', ')}`] : []),
  ]), '')

  const scurt = peScurtPortofoliu(p)
  if (scurt) out.push('## Pe scurt', '', lista(scurt), '')

  out.push('## Despre ansamblu', '', linkuriAbsolute(p.descriereCompleta || p.descriere), '')

  if (p.preturi?.length) {
    out.push('## Prețuri de referință', '', 'Prețuri la momentul comercializării, cu titlu informativ. Stoc epuizat.', '')
    out.push(lista(p.preturi.map(x => `${x.tip}: ${nf(x.pret)} €${/tva inclus/i.test(x.tip) ? '' : ' + TVA'}`)), '')
  }

  if (p.dotari?.length) out.push('## Dotări și finisaje', '', lista(p.dotari), '')

  if (p.puncteInteres?.length)
    out.push('## Locație și puncte de interes', '', lista(p.puncteInteres.map(x => `${x.nume}: ${x.distanta}`)), '')

  const pc = p.parcare
  const parc = pc ? [
    pc.subteran ? `Parcare subterană${pc.pretSubteran ? `: ${nf(pc.pretSubteran)} €` : ''}` : null,
    pc.suprateran ? `Parcare supraterană${pc.pretSuprateran ? `: ${nf(pc.pretSuprateran)} €` : ''}` : null,
    pc.boxe ? `Boxe${pc.pretBoxe ? `: ${nf(pc.pretBoxe)} €` : ''}` : null,
  ].filter(Boolean) : []
  if (parc.length) out.push('## Parcare', '', lista(parc), '')

  out.push('## Contact', '')
  out.push(lista([
    `${p.broker || 'Info Neofort'}: ${p.brokerTel || TEL_GENERAL}`,
    `Ansambluri aflate acum în vânzare: ${BASE}/ansambluri-rezidentiale`,
    `Pagina proiectului: ${url}`,
  ]))
  return out.join('\n').replace(/\n{3,}/g, '\n\n') + '\n'
}

// Raspunsul HTTP comun pentru toate fisierele .md.
export function raspunsMarkdown(text, urlHtml) {
  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Link': `<${urlHtml}>; rel="canonical"`,
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
