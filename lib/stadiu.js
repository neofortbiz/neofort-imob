// Stadiul unui ansamblu activ — SURSA UNICA pentru felul in care se scrie pe site, in llms.txt,
// in paginile .md si in serverul MCP (v462).
//
// In date, `dataPredare` are doua feluri de valori:
//   'Finalizat'   — blocul e gata, apartamentele se pot preda;
//   orice altceva — proiect IN CONSTRUCTIE; valoarea e termenul de predare ('T1 2027', 'T2 2028')
//                   sau 'In curand' (predare apropiata, fara trimestru anuntat — confirmat de Dan, v462).
// Pana la v461, 'In curand' era scris in trei feluri: „Lansare în curând" (pagina proiectului, zone),
// „În construcție" (catalog) si „Predare In curand" (promotii, harta, llms.txt). Acum: „predare în curând".
//
// Regula (verificata de audit): niciun fisier nu pune `dataPredare` direct intr-un text; trece pe aici.
// Fisierul nu importa nimic, ca sa poata fi folosit si din scripturile de build (node).

export const FINALIZAT = 'Finalizat'

export const esteFinalizat = a => a?.dataPredare === FINALIZAT

const faraDiacritice = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase()

// Termenul de predare, ca text: 'T1 2027' ramane 'T1 2027'; 'In curand' devine 'în curând'.
export function textPredare(dataPredare) {
  if (!dataPredare) return ''
  if (faraDiacritice(dataPredare) === 'in curand') return 'în curând'
  return String(dataPredare)
}

// Acelasi termen, cand sta singur (celula de tabel, rand sub eticheta „În construcție"): 'În curând'.
export function termenPredare(dataPredare) {
  const t = textPredare(dataPredare)
  return t ? t.charAt(0).toUpperCase() + t.slice(1) : ''
}

// Eticheta completa: 'Finalizat' sau 'În construcție, predare T1 2027' / '…, predare în curând'.
export function etichetaStadiu(a) {
  if (esteFinalizat(a)) return FINALIZAT
  const t = textPredare(a?.dataPredare)
  return t ? `În construcție, predare ${t}` : 'În construcție'
}
