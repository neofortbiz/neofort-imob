// Oferte schema.org si intervale de suprafata pentru paginile de ansamblu.
//
// O SINGURA SURSA pentru trei locuri care inainte calculau separat si se contraziceau:
//   - schema RealEstateListing de pe ansamblurile active (app/ansamblu-rezidential/[slug]/page.js)
//   - schema RealEstateListing de pe portofoliu (components/AnsambluVandut.js)
//   - verificarea pretDeLa din scripts/audit-continut.mjs
// Fisierul nu importa nimic (nici alias `@/`), ca sa poata fi citit si de scripturile de prebuild.
//
// v448 — defecte reale care au produs fisierul:
//   1. Pretul din schema era `pretPromo || avans45 || avans20`: la Neofort 84 ignora avansul de 90%,
//      deci schema spunea 62.114 € unde pagina spunea „de la 57.336 €".
//   2. Intervalul de suprafete lua primul si ultimul apartament din lista, nu minimul si maximul,
//      si includea unitatile vandute: 5 ansambluri afisau un interval gresit (ex. Neofort 28:
//      59,8–86,65 mp in loc de 46,9–61,8 mp disponibile).
//   3. Schema avea doar primele 5 apartamente, fara mentiunea „fara TVA", iar camerele si suprafata
//      stateau pe RealEstateListing, unde schema.org nu le recunoaste.
//   4. Portofoliul avea `priceValidUntil: '2024-12-31'` fix si numarul de camere scris ca text.

const VANDUT = 'https://schema.org/SoldOut'
const IN_STOC = 'https://schema.org/InStock'
const VANZATOR = { '@type': 'Organization', name: 'Neofort IMO' }

const esteNumar = v => typeof v === 'number' && Number.isFinite(v) && v > 0

// Preturile pe care tabelul (components/ApartamenteTable.js) le AFISEAZA pentru un apartament.
// Cu pretPromo, tabelul arata doar pretul promotional (avans20 e pretul vechi, taiat).
export function preturiAfisate(apt) {
  const lista = apt.pretPromo ? [apt.pretPromo] : [apt.avans90, apt.avans45, apt.avans20]
  return lista.filter(esteNumar)
}

// Cel mai mic pret afisat pentru un apartament — acelasi criteriu ca „de la" de pe pagina.
export function pretAfisatMinim(apt) {
  const p = preturiAfisate(apt)
  return p.length ? Math.min(...p) : null
}

// Intervalul real de suprafete, pe apartamentele DISPONIBILE. Daca nu mai e niciunul
// disponibil, intervalul tuturor unitatilor. null daca nu exista nicio suprafata.
export function intervalSuprafete(apartamente = []) {
  const disp = apartamente.filter(x => !x.stocEpuizat && esteNumar(x.suprafata)).map(x => x.suprafata)
  const toate = apartamente.filter(x => esteNumar(x.suprafata)).map(x => x.suprafata)
  const sursa = disp.length ? disp : toate
  if (!sursa.length) return null
  return { min: Math.min(...sursa), max: Math.max(...sursa), doarDisponibile: disp.length > 0 }
}

// Pentru indicatorul „Suprafețe" din antet. Acelasi stil ca inainte („42.91–109.39mp"),
// o singura valoare cand intervalul se reduce la o unitate („60.9mp").
export function textSuprafete(apartamente) {
  const i = intervalSuprafete(apartamente)
  if (!i) return 'N/A'
  return i.min === i.max ? `${i.min}mp` : `${i.min}–${i.max}mp`
}

// Pentru raspunsul din FAQ: „cu suprafețe între X și Y mp" / „cu suprafața de X mp".
export function frazaSuprafete(apartamente) {
  const i = intervalSuprafete(apartamente)
  if (!i) return ''
  return i.min === i.max ? `cu suprafața de ${i.min} mp` : `cu suprafețe între ${i.min} și ${i.max} mp`
}

const pretFaraTVA = (pret, tvaInclus = false) => ({
  '@type': 'PriceSpecification',
  price: pret,
  priceCurrency: 'EUR',
  valueAddedTaxIncluded: tvaInclus,
})

// Ofertele ansamblurilor ACTIVE: toate apartamentele, disponibilele primele (R17: vandutele raman,
// marcate SoldOut). Fiecare oferta descrie apartamentul concret. Toate preturile din tabel sunt +TVA.
export function oferteAnsamblu(a) {
  return [...(a.apartamente || [])]
    .sort((x, y) => (x.stocEpuizat ? 1 : 0) - (y.stocEpuizat ? 1 : 0))
    .map(apt => {
      const pret = pretAfisatMinim(apt)
      const unitate = {
        '@type': 'Apartment',
        name: apt.tip,
        ...(esteNumar(apt.camere) ? { numberOfRooms: apt.camere } : {}),
        ...(esteNumar(apt.suprafata) ? { floorSize: { '@type': 'QuantitativeValue', value: apt.suprafata, unitCode: 'MTK' } } : {}),
      }
      return {
        '@type': 'Offer',
        name: apt.tip,
        ...(pret ? { price: pret, priceCurrency: 'EUR', priceSpecification: pretFaraTVA(pret) } : {}),
        availability: apt.stocEpuizat ? VANDUT : IN_STOC,
        itemOffered: unitate,
        seller: VANZATOR,
      }
    })
}

// ── Portofoliu: datele au doar `tip` (text) si `pret`. Camerele si suprafata se citesc din text,
//    DOAR cand forma e neambigua. Unde nu e sigur, campul lipseste (nu se ghiceste).

const faraDiacritice = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function camereDinTip(tip) {
  const s = faraDiacritice(tip)
  if (/parcare|spatiu comercial|boxa/.test(s)) return null
  const m = s.match(/(\d+)\s*(camere|cam\.?)(?=[\s.,+(]|$)/)
  if (m) return Number(m[1])
  if (/\b(garsoniera|studio)\b/.test(s)) return 1
  return null
}

// Suprafata apartamentului = primul numar din paranteza, DOAR daca e urmat direct de „mp"
// (eventual „util"/„utili") si apoi de „+", „)" sau „/". Se exclud formele ambigue:
// suprafata construita, „total", „de la", „cu terasa", „inclusiv".
export function suprafataDinTip(tip) {
  const t = String(tip || '')
  const m = t.match(/\(([^()]*)\)\s*(TVA inclus)?\s*$/i)
  if (!m) return null
  const interior = faraDiacritice(m[1]).trim()
  if (/^de la\b/.test(interior)) return null
  const n = interior.match(/^(\d+(?:[.,]\d+)?)\s*mp(\s*util[i]?)?\s*([+)/]|$)/)
  if (!n) return null
  if (/construit|total|inclusiv|cu terasa/.test(interior.split(/[+/]/)[0])) return null
  // „85mp+60mp, teren…": al doilea numar nu spune ce e (mansarda locuibila?) — ambiguu, nu se ghiceste.
  if (/^[\d.,]+\s*mp\s*\+\s*[\d.,]+\s*mp\s*(,|$)/.test(interior)) return null
  const v = parseFloat(n[1].replace(',', '.'))
  return esteNumar(v) ? v : null
}

export function tvaInclusDinTip(tip) {
  return /tva inclus/i.test(String(tip || ''))
}

// Ofertele din PORTOFOLIU: toate vandute. Preturile sunt fara TVA, cu exceptia celor care au
// „TVA inclus" scris in denumire (cateva parcari) — confirmat de Dan, v448.
export function oferteAnsambluVandut(p) {
  return (p.preturi || []).map(o => {
    const camere = camereDinTip(o.tip)
    const suprafata = camere ? suprafataDinTip(o.tip) : null
    const tip = /(^|[^a-z])(vil[aă]|cas[aă])(?![a-z])/i.test(o.tip) ? 'House' : 'Apartment'
    return {
      '@type': 'Offer',
      name: o.tip,
      ...(esteNumar(o.pret) ? { price: o.pret, priceCurrency: 'EUR', priceSpecification: pretFaraTVA(o.pret, tvaInclusDinTip(o.tip)) } : {}),
      availability: VANDUT,
      ...(camere ? {
        itemOffered: {
          '@type': tip,
          name: o.tip,
          numberOfRooms: camere,
          ...(suprafata ? { floorSize: { '@type': 'QuantitativeValue', value: suprafata, unitCode: 'MTK' } } : {}),
        },
      } : {}),
      seller: VANZATOR,
    }
  })
}
