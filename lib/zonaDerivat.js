// Continut DERIVAT pentru paginile de zona: rezumat, tabel comparativ, geo.
//
// DE CE derivat: paginile de zona aveau ~50 de caractere de continut unic si
// schema minima (doar ItemList + Breadcrumb), desi sunt exact paginile pe care
// e construita strategia „ansambluri rezidentiale + zona/sector" (R0).
// Partea derivata aduce continut real si structurat pe toate zonele deodata,
// fara sa astepte text editorial, si nu se poate desincroniza de preturi.

const nf = n => Number(n).toLocaleString('de-DE')

// Cea mai apropiata statie de metrou a unui ansamblu, cu distanta ei.
function metrou(a) {
  const m = (a.puncteInteres || []).filter(p => p.tip === 'metrou' && p.distanta)
  if (!m.length) return null
  const ord = m.map(p => {
    const km = /^([\d,.]+)\s*km/i.exec(p.distanta)
    const metri = /^([\d.]+)\s*m\b/i.exec(p.distanta)
    return { p, v: km ? parseFloat(km[1].replace(',', '.')) * 1000 : metri ? parseFloat(metri[1]) : Infinity }
  }).sort((x, y) => x.v - y.v)
  return ord[0].p
}

// ── Rezumat „Pe scurt" pentru zona ───────────────────────────
export function peScurtZona(nume, sector, ansambluri, esteSector) {
  if (!ansambluri || !ansambluri.length) return null
  const n = ansambluri.length
  const preturi = ansambluri.map(a => Number(a.pretDeLa)).filter(Number.isFinite)
  const minim = preturi.length ? Math.min(...preturi) : null
  const maxim = preturi.length ? Math.max(...preturi) : null

  const loc = esteSector ? `${nume}, București` : `${nume}, ${sector}`
  const out = [
    `${n} ${n === 1 ? 'ansamblu rezidențial' : 'ansambluri rezidențiale'} Neofort IMO în ${loc}, direct de la dezvoltator, fără comision de agenție.`,
  ]

  if (minim !== null)
    out.push(minim === maxim
      ? `Prețuri de la ${nf(minim)}€ + TVA.`
      : `Prețuri între ${nf(minim)}€ și ${nf(maxim)}€ + TVA, în funcție de proiect și tipologie.`)

  const finalizate = ansambluri.filter(a => a.dataPredare === 'Finalizat').length
  const metrouri = [...new Set(ansambluri.map(a => metrou(a)).filter(Boolean).map(m => m.nume.replace(/^Metrou\s+/, '')))]
  const bucati = []
  if (finalizate) bucati.push(`${finalizate} ${finalizate === 1 ? 'proiect finalizat' : 'proiecte finalizate'}, disponibil${finalizate === 1 ? '' : 'e'} imediat`)
  if (metrouri.length) bucati.push(`acces la ${metrouri.slice(0, 3).join(', ')}`)
  if (bucati.length) out.push(bucati.join('. ') + '.')

  return out
}

// ── Tabel comparativ al ansamblurilor din zona ───────────────
// Randurile se genereaza din date, deci tabelul nu poate ramane in urma
// fata de preturi sau tipologii — spre deosebire de unul scris de mana.
export function tabelZona(ansambluri) {
  if (!ansambluri || ansambluri.length < 2) return null   // cu un singur proiect, tabelul nu compara nimic
  return {
    cap: ['Ansamblu', 'Tipologii', 'Preț de la', 'Predare', 'Metrou'],
    randuri: ansambluri.map(a => {
      const m = metrou(a)
      return {
        slug: a.slug,
        celule: [
          a.nume,
          (a.tipuri || []).join(', ') || '—',
          Number.isFinite(Number(a.pretDeLa)) ? `${nf(a.pretDeLa)}€ + TVA` : '—',
          // Aceeasi normalizare ca in lib/peScurt.js: „In curand" nu se citeste
          // ca o data de predare. Daca se schimba una, se schimba amandoua.
          a.dataPredare === 'Finalizat' ? 'Finalizat'
            : /in curand/i.test(a.dataPredare || '') ? 'Lansare în curând'
            : (a.dataPredare || '—'),
          m ? `${m.nume.replace(/^Metrou\s+/, '')} · ${m.distanta}` : '—',
        ],
      }
    }),
  }
}

// ── Centroid geografic, pentru schema Place ──────────────────
export function geoZona(ansambluri) {
  const c = (ansambluri || []).map(a => a.coordonate).filter(p => p && Number.isFinite(p.lat) && Number.isFinite(p.lng))
  if (!c.length) return null
  return {
    lat: Number((c.reduce((s, p) => s + p.lat, 0) / c.length).toFixed(6)),
    lng: Number((c.reduce((s, p) => s + p.lng, 0) / c.length).toFixed(6)),
  }
}

// ── Imaginea zonei, reutilizata din ansamblul cel mai reprezentativ ──
// DE CE reutilizata: nu are rost sa adaugam fisiere noi cand fiecare zona are
// deja ansambluri cu cover propriu. Se alege proiectul cu cel mai mic pret —
// cel mai probabil punct de intrare pentru un cautator.
export function imagineZona(ansambluri) {
  const cu = (ansambluri || []).filter(a => a.imagini?.cover)
  if (!cu.length) return null
  const sortate = [...cu].sort((a, b) => Number(a.pretDeLa) - Number(b.pretDeLa))
  return { src: sortate[0].imagini.cover, alt: `Ansambluri rezidențiale în ${sortate[0].zona}, ${sortate[0].sector}` }
}
