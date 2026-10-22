// Continut EDITORIAL per zona.
//
// Partea derivata din date (rezumat, tabel comparativ, geo, imagine) sta in
// `lib/zonaDerivat.js` si functioneaza pe toate zonele fara sa astepte text.
// Fisierul acesta tine doar ce NU se poate deriva: textul scris de om.
//
// UNGHI EDITORIAL — decis ca sa nu se canibalizeze paginile care se suprapun
// (titan-pallady ⊂ sector-3, militari ⊂ sector-6):
//   'administrativ' — pagina de SECTOR. Vorbeste despre sector ca unitate:
//      primarie, impozite locale, scoli si licee arondate, infrastructura,
//      comparatie intre micro-zonele din sector. NU descrie viata de cartier.
//   'cartier' — pagina de MICRO-ZONA. Vorbeste despre viata de zi cu zi:
//      cum arata strada, ce e la 10 minute pe jos, traficul, parcul,
//      cine se muta acolo si de ce. NU repeta datele administrative.
// Acelasi fapt nu se scrie in ambele locuri.

export const ZONE = {
  // ── Sectoare: unghi administrativ ──────────────────────────
  'sector-2': { unghi: 'administrativ', intro: null, sectiuni: [], faq: [] },
  'sector-3': { unghi: 'administrativ', intro: null, sectiuni: [], faq: [] },
  'sector-6': { unghi: 'administrativ', intro: null, sectiuni: [], faq: [] },

  // ── Micro-zone: unghi de cartier ───────────────────────────
  'titan-pallady':       { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
  'militari':            { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
  'colentina':           { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
  'eminescu-viitorului': { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
  'mosilor-eminescu':    { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
  'piata-muncii':        { unghi: 'cartier', intro: null, sectiuni: [], faq: [] },
}

// Forma unei intrari completate (v430/v431 umplu doar datele, nu si template-ul):
//   intro:    'Paragraf de 2-4 fraze, unic pentru zona.'
//   sectiuni: [{ titlu: 'H2', continut: 'Text. Accepta [link](/url) si **bold**.' }]
//   faq:      [{ intrebare: '...', raspuns: '...' }]   -> genereaza schema FAQPage

export function zonaEditorial(slug) {
  const z = ZONE[slug]
  if (!z) return { unghi: null, intro: null, sectiuni: [], faq: [] }
  return { unghi: z.unghi, intro: z.intro, sectiuni: z.sectiuni || [], faq: z.faq || [] }
}
