// Uneltele serverului MCP (app/api/mcp/route.js), v451. DOAR CITIRE.
//
// REGULA: nicio cifra scrisa aici. Toate datele vin ca argumente din aceleasi surse ca paginile
// (data/ansambluri, data/portofoliu, data/blog) si trec prin aceleasi functii ca pagina:
//   - pretul „de la" si variantele de avans: lib/oferteSchema.js (ca tabelul si schema)
//   - fisa completa a ansamblului: lib/markdownPagini.js (exact versiunea .md a paginii)
//   - rata lunara: lib/calculCredit.js (ca /calculator-credit)
// Fisierul nu importa nimic din data/ si nici alias `@/`, ca sa poata fi testat direct cu node.
//
// Intentionat NU exista unealta care trimite cereri, lead-uri sau mesaje: un server public
// fara autentificare care trimite ceva ar fi o poarta de spam. Agentul trimite omul la broker.

import { pretAfisatMinim, intervalSuprafete, textSuprafete } from './oferteSchema.js'
import { mdAnsamblu, mdPortofoliu, BASE } from './markdownPagini.js'
import { calcRata, COTA_TVA, DAE_MIN, DAE_MAX, DAE_DEFAULT, AVANS_PCT_MIN, AVANS_PCT_MAX, AVANS_PCT_DEFAULT, DURATA_MIN, DURATA_MAX, DURATA_DEFAULT } from './calculCredit.js'

// Datele firmei, asa cum apar pe /contact si in schema din app/layout.js.
// Auditul (verificarea 20) confirma ca fiecare valoare de aici apare identic in app/contact/page.js.
export const FIRMA = {
  nume: 'Neofort IMO',
  telefon: '0758 090 904',
  telefonInternational: '+40758090904',
  email: 'info@neofort-biz.ro',
  adresa: 'Str. Theodor Aman Pictor nr. 11, Sector 1, București',
  program: 'Luni – Vineri 10:00 – 18:00; sâmbătă și duminică închis',
}

// Linkurile spre pagini poarta UTM, ca vizitele venite din agenti AI sa se vada separat in GA4.
// Linkurile .md NU poarta UTM: sunt citite de agent, nu deschise de om.
export const linkUtm = (cale, unealta) =>
  `${BASE}${cale}${cale.includes('?') ? '&' : '?'}utm_source=mcp&utm_medium=ai-agent&utm_campaign=${unealta}`

const fara = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const stadiu = a => (a.dataPredare === 'Finalizat' ? 'finalizat' : 'in_constructie')
const etichetaStadiu = a => (a.dataPredare === 'Finalizat' ? 'Finalizat' : `În construcție, predare ${a.dataPredare}`)

// Variantele de pret exact cum le arata tabelul de pe pagina (components/ApartamenteTable.js).
function variantePret(apt) {
  if (apt.pretPromo) return [{ varianta: 'promotie', pret_eur: apt.pretPromo, pret_vechi_eur: apt.avans20 || null }]
  return [
    apt.avans90 ? { varianta: 'avans 90%', pret_eur: apt.avans90, pret_vechi_eur: apt.pretVechiAvans90 || null } : null,
    apt.avans45 ? { varianta: 'avans 45%', pret_eur: apt.avans45, pret_vechi_eur: apt.pretVechiAvans45 || null } : null,
    apt.avans20 ? { varianta: apt.avans45 ? 'avans 20%' : 'pret unic', pret_eur: apt.avans20, pret_vechi_eur: apt.pretVechiAvans20 || null } : null,
  ].filter(Boolean)
}

// Potrivirea de zona: cauta in zona, sector, slugurile de zona si adresa, fara diacritice.
function inZona(a, zona) {
  if (!zona) return true
  const q = fara(zona).replace(/[^a-z0-9 ]+/g, ' ').trim()
  if (!q) return true
  const tinta = fara([a.zona, a.sector, a.adresa, ...(a.zone || [])].join(' ')).replace(/[^a-z0-9 ]+/g, ' ')
  // „sector 3" / „sectorul 3" / „s3" → potrivire pe sector
  const sec = q.match(/^(?:sector(?:ul)?|s)\s*([1-6])$/)
  if (sec) return fara(a.sector).replace(/\s+/g, ' ').includes(`sector ${sec[1]}`)
  return q.split(/\s+/).every(t => tinta.includes(t))
}

// ── search_apartments ─────────────────────────────────────────
export function searchApartments(ansambluri, args = {}) {
  const { rooms, max_price_eur, min_area_sqm, zone, stage, promo_only } = args
  const limit = Math.min(Math.max(parseInt(args.limit) || 20, 1), 50)
  const rezultate = []
  for (const a of ansambluri) {
    if (!inZona(a, zone)) continue
    if (stage && stage !== stadiu(a)) continue
    for (const apt of a.apartamente || []) {
      if (apt.stocEpuizat) continue
      if (rooms != null) {
        if (rooms >= 4 ? !(apt.camere >= 4) : apt.camere !== rooms) continue
      }
      const pret = pretAfisatMinim(apt)
      if (max_price_eur != null && !(pret && pret <= max_price_eur)) continue
      if (min_area_sqm != null && !(apt.suprafata >= min_area_sqm)) continue
      if (promo_only && !apt.promo) continue
      rezultate.push({
        proiect: a.nume,
        slug: a.slug,
        zona: a.zona,
        sector: a.sector,
        stadiu: etichetaStadiu(a),
        tip: apt.tip,
        camere: apt.camere,
        suprafata_mp: apt.suprafata,
        ...(apt.suprafataExtra ? { suprafata_extra_mp: apt.suprafataExtra, tip_extra: apt.tipExtra === 'teren' ? 'curte' : apt.tipExtra === 'terasa' ? 'terasă' : apt.tipExtra } : {}),
        ...(apt.etaj ? { etaj: apt.etaj } : {}),
        pret_de_la_eur: pret,
        variante_pret: variantePret(apt),
        ...(apt.deLaPret ? { nota_pret: 'preț „de la" — variază pe etaje' } : {}),
        promotie: !!apt.promo,
        url: linkUtm(`/ansamblu-rezidential/${a.slug}`, 'search_apartments'),
      })
    }
  }
  rezultate.sort((x, y) => (x.pret_de_la_eur || Infinity) - (y.pret_de_la_eur || Infinity))
  return {
    moneda: 'EUR',
    tva: 'Prețurile NU includ TVA (+21%).',
    total_gasite: rezultate.length,
    afisate: Math.min(rezultate.length, limit),
    apartamente: rezultate.slice(0, limit),
    ...(rezultate.length === 0 ? { nota: 'Niciun apartament disponibil nu corespunde filtrelor. Încearcă fără unele filtre sau folosește list_projects.' } : {}),
  }
}

// ── list_projects ─────────────────────────────────────────────
export function listProjects(ansambluri, portofoliu, args = {}) {
  const active = ansambluri.filter(a => inZona(a, args.zone)).map(a => {
    const disp = (a.apartamente || []).filter(x => !x.stocEpuizat)
    return {
      proiect: a.nume,
      slug: a.slug,
      stare: 'în vânzare',
      zona: a.zona,
      sector: a.sector,
      stadiu: etichetaStadiu(a),
      tipuri: a.tipuri,
      pret_de_la_eur: a.pretDeLa,
      suprafete: textSuprafete(a.apartamente),
      apartamente_disponibile: disp.length,
      promotie: disp.some(x => x.promo),
      url: linkUtm(`/ansamblu-rezidential/${a.slug}`, 'list_projects'),
      markdown: `${BASE}/ansamblu-rezidential/${a.slug}.md`,
    }
  })
  const rez = { moneda: 'EUR', tva: 'Prețurile NU includ TVA (+21%).', ansambluri_in_vanzare: active }
  if (args.include_sold) {
    rez.portofoliu_vandut = portofoliu.filter(p => inZona(p, args.zone)).map(p => ({
      proiect: p.nume,
      slug: p.slug,
      stare: 'vândut integral',
      zona: p.zona,
      sector: p.sector,
      ...(p.totalApartamente ? { unitati: p.totalApartamente } : {}),
      url: linkUtm(`/ansamblu-rezidential/${p.slug}`, 'list_projects'),
      markdown: `${BASE}/ansamblu-rezidential/${p.slug}.md`,
    }))
  }
  return rez
}

// ── get_project ───────────────────────────────────────────────
// Accepta slug exact, „Neofort 84", „84" sau o parte din nume. Daca sunt mai multe potriviri,
// le intoarce ca variante, nu alege la intamplare (ex. „50" = Faza 1 si Faza 2).
export function gasesteProiect(ansambluri, portofoliu, cheie) {
  const toate = [...ansambluri.map(a => ({ a, activ: true })), ...portofoliu.map(a => ({ a, activ: false }))]
  const q = fara(cheie).trim()
  if (!q) return { candidati: [] }
  const exact = toate.find(x => x.a.slug === q)
  if (exact) return { gasit: exact }
  const nr = q.match(/^(?:neofort\s*|n)?(\d{1,3})$/)
  let candidati = nr
    ? toate.filter(x => String(x.a.numar) === nr[1])
    : toate.filter(x => q.split(/\s+/).every(t => fara(`${x.a.nume} ${x.a.slug} ${x.a.zona}`).includes(t)))
  // un activ are prioritate fata de un vandut cu acelasi numar (ca pagina: cauta intai in active)
  if (candidati.length > 1 && candidati.filter(x => x.activ).length === 1) candidati = candidati.filter(x => x.activ)
  if (candidati.length === 1) return { gasit: candidati[0] }
  return { candidati: candidati.map(x => ({ proiect: x.a.nume, slug: x.a.slug, stare: x.activ ? 'în vânzare' : 'vândut' })) }
}

export function getProject(ansambluri, portofoliu, args = {}) {
  const r = gasesteProiect(ansambluri, portofoliu, args.project)
  if (!r.gasit) {
    return {
      eroare: r.candidati.length ? 'Mai multe proiecte se potrivesc. Repetă cererea cu slug-ul exact.' : `Niciun proiect nu se potrivește cu „${args.project}". Folosește list_projects pentru lista completă.`,
      variante: r.candidati,
    }
  }
  const { a, activ } = r.gasit
  return {
    proiect: a.nume,
    slug: a.slug,
    stare: activ ? 'în vânzare' : 'vândut integral',
    url: linkUtm(`/ansamblu-rezidential/${a.slug}`, 'get_project'),
    // Fisa completa = exact versiunea .md a paginii (aceleasi date, aceeasi formulare).
    fisa_markdown: activ ? mdAnsamblu(a) : mdPortofoliu(a),
  }
}

// ── search_articles ───────────────────────────────────────────
export function searchArticles(articole, lista, args = {}) {
  const limit = Math.min(Math.max(parseInt(args.limit) || 5, 1), 10)
  const ordine = new Map(lista.map((x, i) => [x.slug, i]))
  const cuvinte = fara(args.query).replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(t => t.length > 2)
  const scoruri = Object.entries(articole).map(([slug, a]) => {
    if (!cuvinte.length) return { slug, a, scor: 0 }
    const campuri = [
      [fara(a.titlu), 6], [fara(a.seoTitle), 4], [fara((a.keywords || []).join(' ')), 4],
      [fara(a.descriere), 3], [fara((a.peScurt || []).join(' ')), 2],
      [fara((a.sectiuni || []).map(s => `${s.h2} ${s.h3 || ''}`).join(' ')), 2],
      [fara((a.sectiuni || []).map(s => s.continut).join(' ')), 0.5],
    ]
    let scor = 0, potrivite = 0
    for (const t of cuvinte) {
      let p = 0
      for (const [txt, w] of campuri) if (txt.includes(t)) p += w
      if (p) potrivite++
      scor += p
    }
    // toate cuvintele cautate trebuie sa apara undeva; altfel rezultatul e zgomot
    return { slug, a, scor: potrivite === cuvinte.length ? scor : 0 }
  })
  const rez = (cuvinte.length ? scoruri.filter(x => x.scor > 0).sort((x, y) => y.scor - x.scor) : scoruri.sort((x, y) => (ordine.get(x.slug) ?? 999) - (ordine.get(y.slug) ?? 999)))
    .slice(0, limit)
    .map(({ slug, a }) => ({
      titlu: a.titlu,
      rezumat: a.descriere,
      categorie: a.tag,
      publicat: a.dataISO,
      ...(a.dataModificata ? { actualizat: a.dataModificata } : {}),
      url: linkUtm(`/blog/${slug}`, 'search_articles'),
      markdown: `${BASE}/blog/${slug}.md`,
    }))
  return {
    interogare: args.query || null,
    articole: rez,
    nota: rez.length ? 'Pentru textul complet, citește linkul „markdown".' : 'Niciun articol nu conține toate cuvintele căutate. Încearcă mai puține cuvinte.',
  }
}

// ── get_contact ───────────────────────────────────────────────
export function getContact(ansambluri, portofoliu, args = {}) {
  const general = {
    firma: FIRMA.nume,
    telefon: FIRMA.telefon,
    whatsapp: `https://wa.me/${FIRMA.telefonInternational.replace('+', '')}`,
    email: FIRMA.email,
    adresa_birou: FIRMA.adresa,
    program: FIRMA.program,
    formular_contact: linkUtm('/contact', 'get_contact'),
  }
  const rez = { contact_general: general }
  if (args.project) {
    const r = gasesteProiect(ansambluri, portofoliu, args.project)
    if (r.gasit && r.gasit.activ) {
      const a = r.gasit.a
      rez.broker_proiect = { proiect: a.nume, broker: a.broker, telefon: a.brokerTel, pagina: linkUtm(`/ansamblu-rezidential/${a.slug}`, 'get_contact') }
    } else if (r.gasit) {
      rez.nota = `${r.gasit.a.nume} este vândut integral; pentru proiectele aflate acum în vânzare folosește contactul general.`
    } else {
      rez.nota = r.candidati.length ? 'Mai multe proiecte se potrivesc; repetă cu slug-ul exact.' : `Proiectul „${args.project}" nu a fost găsit.`
      if (r.candidati.length) rez.variante = r.candidati
    }
  }
  rez.cum_se_cere_o_oferta = 'Pentru preț ferm, vizionare sau rezervare: telefon la broker sau formularul de contact. Utile în cerere: proiectul, tipul de apartament, bugetul, modul de plată (avans / credit) și când se dorește mutarea.'
  return rez
}

// ── calculate_mortgage ────────────────────────────────────────
// Aceeasi formula si aceleasi limite ca /calculator-credit; in plus TVA-ul (21%), pentru ca
// banca finanteaza pretul cu TVA, iar preturile de pe site sunt fara TVA.
export function calculateMortgage(ansambluri, portofoliu, args = {}, curs = null) {
  let pretFaraTva = Number(args.price_eur_excl_vat) || null
  let sursa = 'preț introdus'
  if (!pretFaraTva && args.project) {
    const r = gasesteProiect(ansambluri, [], args.project)
    if (!r.gasit) return { eroare: r.candidati.length ? 'Mai multe proiecte se potrivesc; repetă cu slug-ul exact.' : `Proiectul „${args.project}" nu a fost găsit printre cele în vânzare.`, variante: r.candidati }
    pretFaraTva = r.gasit.a.pretDeLa
    sursa = `prețul „de la" al proiectului ${r.gasit.a.nume}`
  }
  if (!pretFaraTva || pretFaraTva < 10000 || pretFaraTva > 5000000) return { eroare: 'Dă un preț între 10.000 și 5.000.000 EUR (fără TVA) sau un proiect.' }
  const lim = (v, min, max, implicit) => { const n = Number(v); return Number.isFinite(n) ? Math.min(Math.max(n, min), max) : implicit }
  const avansPct = lim(args.down_payment_pct, AVANS_PCT_MIN, AVANS_PCT_MAX, AVANS_PCT_DEFAULT)
  const ani = Math.round(lim(args.years, DURATA_MIN, DURATA_MAX, DURATA_DEFAULT))
  const dae = lim(args.dae_pct, DAE_MIN, DAE_MAX, DAE_DEFAULT)
  const tva = Math.round(pretFaraTva * COTA_TVA)
  const total = pretFaraTva + tva
  const avans = Math.round(total * avansPct / 100)
  const credit = total - avans
  const rata = calcRata(credit, dae, ani)
  const totalRambursat = rata * ani * 12
  return {
    ipoteze: { sursa_pret: sursa, avans_pct: avansPct, durata_ani: ani, dae_pct: dae, cota_tva_pct: COTA_TVA * 100 },
    pret_fara_tva_eur: pretFaraTva,
    tva_eur: tva,
    pret_cu_tva_eur: total,
    avans_eur: avans,
    credit_eur: credit,
    rata_lunara_eur: Math.round(rata),
    ...(curs ? { rata_lunara_ron: Math.round(rata * curs.rate), curs_eur_ron: curs.rate, curs_data: curs.date, curs_sursa: curs.source } : { nota_curs: 'Cursul EUR/RON nu a putut fi citit acum; rata e dată doar în EUR.' }),
    dobanda_totala_eur: Math.round(totalRambursat - credit),
    total_rambursat_eur: Math.round(totalRambursat),
    atentie: 'Simulare orientativă, nu ofertă bancară. Rata reală depinde de bancă, de DAE-ul aprobat și de venit. Gradul de îndatorare (Regulamentul BNR 6/2018): max. 40% din venitul net la credit în lei și 20% în euro; la prima locuință 45%, respectiv 25%.',
    calculator: linkUtm('/calculator-credit', 'calculate_mortgage'),
  }
}

// ── Definitiile uneltelor (tools/list) ────────────────────────
const RO = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }

export const UNELTE = [
  {
    name: 'search_apartments',
    title: 'Search available apartments',
    description: 'Search AVAILABLE apartments across Neofort IMO residential projects in Bucharest. Filters: rooms, max price (EUR, excl. VAT), min area, zone/sector, stage, promotions only. Results are sorted by price ascending and include every price option shown on the website (e.g. by down-payment level). All prices are in EUR and EXCLUDE 21% VAT.',
    inputSchema: {
      type: 'object',
      properties: {
        rooms: { type: 'integer', minimum: 1, maximum: 5, description: 'Number of rooms (1 = studio/garsonieră; 4 means 4 or more).' },
        max_price_eur: { type: 'number', minimum: 0, description: 'Maximum price in EUR, excluding VAT.' },
        min_area_sqm: { type: 'number', minimum: 0, description: 'Minimum usable area in square metres.' },
        zone: { type: 'string', maxLength: 60, description: 'Area or sector, e.g. "Titan", "Colentina", "Sector 3", "Militari".' },
        stage: { type: 'string', enum: ['finalizat', 'in_constructie'], description: 'finalizat = ready to move in; in_constructie = under construction.' },
        promo_only: { type: 'boolean', description: 'Only apartments with an active promotion.' },
        limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Max results (default 20).' },
      },
      additionalProperties: false,
    },
    annotations: { title: 'Search available apartments', ...RO },
  },
  {
    name: 'get_project',
    title: 'Get project details',
    description: 'Full details of one Neofort IMO residential project: description, every apartment type with prices and availability (sold units are marked), parking, amenities, distances to metro/schools/shops, FAQ and broker. Works for projects on sale and for sold projects in the portfolio. Accepts the slug, "Neofort 84", "84" or part of the name.',
    inputSchema: {
      type: 'object',
      properties: { project: { type: 'string', maxLength: 80, description: 'Project slug, number or name, e.g. "neofort-84-titan-pallady" or "Neofort 84".' } },
      required: ['project'],
      additionalProperties: false,
    },
    annotations: { title: 'Get project details', ...RO },
  },
  {
    name: 'list_projects',
    title: 'List projects',
    description: 'List all Neofort IMO residential projects currently on sale (zone, stage, room types, starting price in EUR excl. VAT, available units). Optionally also the sold projects from the portfolio, as track record.',
    inputSchema: {
      type: 'object',
      properties: {
        zone: { type: 'string', maxLength: 60, description: 'Optional area or sector filter.' },
        include_sold: { type: 'boolean', description: 'Also list sold projects from the portfolio (default false).' },
      },
      additionalProperties: false,
    },
    annotations: { title: 'List projects', ...RO },
  },
  {
    name: 'search_articles',
    title: 'Search articles',
    description: 'Search the Neofort IMO blog (Romanian) about buying property in Bucharest: taxes, VAT, mortgages, legislation, short-term rental, owners associations, neighbourhoods. Returns title, summary, dates and links; read the "markdown" link for the full text. Without a query, returns the latest articles.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', maxLength: 120, description: 'Topic keywords, ideally in Romanian, e.g. "impozit locuinta", "TVA apartament nou", "regim hotelier".' },
        limit: { type: 'integer', minimum: 1, maximum: 10, description: 'Max results (default 5).' },
      },
      additionalProperties: false,
    },
    annotations: { title: 'Search articles', ...RO },
  },
  {
    name: 'get_contact',
    title: 'Get contact details',
    description: 'How to reach Neofort IMO: phone, WhatsApp, email, office address, opening hours and contact form. With a project, also the broker in charge of it and their phone. Use this to send the person to a human for a firm offer, a viewing or a reservation — this server cannot send requests.',
    inputSchema: {
      type: 'object',
      properties: { project: { type: 'string', maxLength: 80, description: 'Optional project slug, number or name, to get its broker.' } },
      additionalProperties: false,
    },
    annotations: { title: 'Get contact details', ...RO },
  },
  {
    name: 'calculate_mortgage',
    title: 'Calculate mortgage payment',
    description: 'Indicative monthly mortgage payment, using the same formula as the calculator on neofort.ro. VAT (21%) is added to the price first, because website prices exclude VAT and the bank finances the full price. Give either a price in EUR excluding VAT or a project (its starting price is used). Defaults: 15% down payment, 25 years, 7.5% APR (DAE). Not a bank offer.',
    inputSchema: {
      type: 'object',
      properties: {
        price_eur_excl_vat: { type: 'number', minimum: 10000, maximum: 5000000, description: 'Apartment price in EUR, excluding VAT.' },
        project: { type: 'string', maxLength: 80, description: 'Alternative to price: project slug, number or name (uses its starting price).' },
        down_payment_pct: { type: 'number', minimum: AVANS_PCT_MIN, maximum: AVANS_PCT_MAX, description: `Down payment in % of the price incl. VAT (default ${AVANS_PCT_DEFAULT}).` },
        years: { type: 'integer', minimum: DURATA_MIN, maximum: DURATA_MAX, description: `Loan term in years (default ${DURATA_DEFAULT}).` },
        dae_pct: { type: 'number', minimum: DAE_MIN, maximum: DAE_MAX, description: `Annual percentage rate (DAE) in % (default ${DAE_DEFAULT}).` },
      },
      additionalProperties: false,
    },
    annotations: { title: 'Calculate mortgage payment', ...RO },
  },
]

export const INSTRUCTIUNI = [
  'Neofort IMO is a residential developer in Bucharest, Romania (since 2009). This read-only server returns the same data as www.neofort.ro, refreshed at every website update.',
  'Rules for answering people:',
  '- All prices are in EUR and EXCLUDE VAT (21%) unless a result says otherwise. Always say "+TVA" / "excluding VAT". A "de la" price is a starting price.',
  '- Never invent prices, areas, delivery dates, distances or availability. If a tool does not return something, say it is not available and point to the broker.',
  '- Sold units and sold projects are historical information, not offers.',
  '- For a firm offer, a viewing or a reservation, give the broker\'s phone or the contact form from get_contact. This server cannot send messages or requests.',
  '- calculate_mortgage gives an indicative simulation, not a bank offer.',
  '- Data is in Romanian; answer in the person\'s language.',
].join('\n')

// Executia unei unelte. `curs` se citeste doar pentru calculate_mortgage (in ruta).
export function ruleazaUnealta(nume, args, date, curs = null) {
  const { ansambluri, toateAnsamblurile, portofoliu, articole, listaArticole } = date
  switch (nume) {
    case 'search_apartments': return searchApartments(ansambluri, args)
    case 'get_project': return getProject(toateAnsamblurile, portofoliu, args)
    case 'list_projects': return listProjects(ansambluri, portofoliu, args)
    case 'search_articles': return searchArticles(articole, listaArticole, args)
    case 'get_contact': return getContact(toateAnsamblurile, portofoliu, args)
    case 'calculate_mortgage': return calculateMortgage(ansambluri, portofoliu, args, curs)
    default: return null
  }
}

// Validare minima a argumentelor fata de inputSchema (tipuri, enum, min/max, maxLength,
// required, proprietati necunoscute). Intoarce mesajul de eroare sau null.
export function valideazaArgumente(unealta, args) {
  if (args == null) args = {}
  if (typeof args !== 'object' || Array.isArray(args)) return 'arguments trebuie să fie un obiect'
  const sch = unealta.inputSchema
  for (const r of sch.required || []) if (args[r] == null || args[r] === '') return `lipsește argumentul obligatoriu „${r}"`
  for (const [k, v] of Object.entries(args)) {
    const p = sch.properties[k]
    if (!p) return `argument necunoscut „${k}"`
    if (v == null) continue
    if (p.type === 'string' && typeof v !== 'string') return `„${k}" trebuie să fie text`
    if (p.type === 'boolean' && typeof v !== 'boolean') return `„${k}" trebuie să fie true/false`
    if ((p.type === 'number' || p.type === 'integer') && (typeof v !== 'number' || !Number.isFinite(v))) return `„${k}" trebuie să fie număr`
    if (p.type === 'integer' && !Number.isInteger(v)) return `„${k}" trebuie să fie număr întreg`
    if (p.minimum != null && v < p.minimum) return `„${k}" trebuie să fie cel puțin ${p.minimum}`
    if (p.maximum != null && v > p.maximum) return `„${k}" trebuie să fie cel mult ${p.maximum}`
    if (p.maxLength != null && v.length > p.maxLength) return `„${k}" are peste ${p.maxLength} caractere`
    if (p.enum && !p.enum.includes(v)) return `„${k}" trebuie să fie unul din: ${p.enum.join(', ')}`
  }
  return null
}
