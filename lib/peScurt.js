// Blocuri „Pe scurt" DERIVATE din date, pentru paginile de ansamblu si de portofoliu.
//
// DE CE derivate si nu scrise de mana: un bloc scris de mana devine inca o copie a
// aceleiasi informatii, care se desincronizeaza la prima schimbare de pret — exact
// clasa 1 din registrul de erori (un pret traieste deja in minimum 7 locuri).
// Derivat din `apartamente[]` si din campurile structurate, blocul nu poate ramane
// in urma: se recalculeaza la fiecare build.
//
// DE CE conteaza pentru SEO si pentru LLM-uri: e un raspuns direct, scurt si factual,
// pus inaintea textului lung. Formularile pornesc deliberat cu „Ansamblu rezidential
// in {zona}, {sector}" — exact tiparul de cautare pe care e construita strategia,
// nu „apartamente".

const nf = n => Number(n).toLocaleString('de-DE')

// Cea mai apropiata statie de metrou din puncteInteres, cu distanta ei.
function metrouApropiat(a) {
  const m = (a.puncteInteres || []).filter(p => p.tip === 'metrou' && p.distanta)
  if (!m.length) return null
  // „20m" si „300 m · 3 min pe jos" bat „7 min cu masina": preferam intrarile
  // care incep cu o distanta, iar intre ele pe cea mai mica.
  const cuDistanta = m.map(p => {
    const km = /^([\d,.]+)\s*km/i.exec(p.distanta)
    const metri = /^([\d.]+)\s*m\b/i.exec(p.distanta)
    const v = km ? parseFloat(km[1].replace(',', '.')) * 1000 : metri ? parseFloat(metri[1]) : Infinity
    return { p, v }
  }).sort((x, y) => x.v - y.v)
  return cuDistanta[0].p
}

// ── Ansamblu ACTIV ───────────────────────────────────────────
export function peScurtAnsamblu(a) {
  if (!a) return null
  const out = []

  const regim = a.etaje ? `, regim ${a.etaje}` : ''
  out.push(`Ansamblu rezidențial în ${a.zona}, ${a.sector} București${regim}.`)

  // Pretul se ia din `pretDeLa`, campul canonic folosit de tot restul siteului.
  // Recalcularea lui aici ar crea inca o copie care se poate desincroniza
  // (la N84, un recalcul pe `avans20` dadea 66.892 in loc de 57.336, pentru ca
  // pretul de start vine dintr-o oferta cu avans diferit).
  const tipuri = (a.tipuri || []).join(', ')
  if (Number.isFinite(Number(a.pretDeLa)))
    out.push(`${tipuri || 'Apartamente'} de la ${nf(a.pretDeLa)}€ + TVA, direct de la dezvoltator, fără comision.`)
  else if (tipuri)
    out.push(`${tipuri}, direct de la dezvoltator, fără comision.`)

  const met = metrouApropiat(a)
  // „In curand" nu se citeste ca o data de predare, deci primeste formulare proprie.
  const predare = a.dataPredare === 'Finalizat'
    ? 'Finalizat, disponibil imediat'
    : /in curand/i.test(a.dataPredare || '')
      ? 'Lansare în curând'
      : a.dataPredare ? `Predare ${a.dataPredare}` : null
  const bucati = [predare, met ? `${met.nume} la ${met.distanta}` : null].filter(Boolean)
  if (bucati.length) out.push(bucati.join('. ') + '.')

  return out.length ? out : null
}

// ── Ansamblu din PORTOFOLIU (vandut) ─────────────────────────
export function peScurtPortofoliu(a) {
  if (!a) return null
  const out = []

  const regim = a.etaje ? `, regim ${a.etaje}` : ''
  out.push(`Ansamblu rezidențial finalizat în ${a.zona}, ${a.sector} București${regim}.`)

  const nr = Number(a.totalApartamente)
  const tipuri = (a.tipuri || []).join(', ')
  if (Number.isFinite(nr) && nr > 0)
    out.push(`${nr} ${nr === 1 ? 'apartament' : 'apartamente'}${tipuri ? ` (${tipuri})` : ''}, vândute integral.`)
  else if (tipuri)
    out.push(`${tipuri}. Vândut integral.`)

  out.push('Proiect livrat de Neofort IMO. Ansamblurile aflate acum în vânzare sunt listate la /ansambluri-rezidentiale.')
  return out
}
