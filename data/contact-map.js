// ============================================================
// GENERAT AUTOMAT de scripts/generate-contact-map.mjs — NU EDITA MANUAL.
// Sursa: data/ansambluri/index.js (ANSAMBLURI — doar activele)
// Regenerat la fiecare build (prebuild).
//
// Scop: Header/MobileBar/WAFloat sunt randate pe fiecare pagina si au
// nevoie doar de datele de contact per proiect. Importand harta asta
// (~2KB) in loc de index.js (~128KB), bundle-ul clientului scade masiv.
// ============================================================

export const CONTACT_MAP = {
  'neofort-84-titan-pallady': { nume: 'Neofort 84 Titan Pallady', numar: 84, zona: 'Titan-Pallady', sector: 'Sector 3', brokerTel: '0743 250 029' },
  'neofort-83-titan-pallady': { nume: 'Neofort 83 Titan Pallady', numar: 83, zona: 'Titan-Pallady', sector: 'Sector 3', brokerTel: '0759 030 367' },
  'neofort-78-mosilor-eminescu': { nume: 'Neofort 78 Mosilor-Eminescu', numar: 78, zona: 'Mosilor-Eminescu', sector: 'Sector 2', brokerTel: '0752 443 434' },
  'neofort-76-iuliu-maniu-metrou-pacii': { nume: 'Neofort 76 Iuliu Maniu Metrou Pacii', numar: 76, zona: 'Militari', sector: 'Sector 6', brokerTel: '0759 030 367' },
  'neofort-56-pallady-titan-teclu': { nume: 'Neofort 56 Pallady Titan', numar: 56, zona: 'Titan-Pallady', sector: 'Sector 3', brokerTel: '0759 030 367' },
  'neofort-50-titan-parc-ior': { nume: 'Neofort 50 Titan Parc IOR', numar: 50, zona: 'Titan-IOR', sector: 'Sector 3', brokerTel: '0752 443 436' },
  'neofort-49-militari-metrou-gorjului': { nume: 'Neofort 49 Militari Metrou Gorjului', numar: 49, zona: 'Militari', sector: 'Sector 6', brokerTel: '0759 030 367' },
  'neofort-44-titan-pallady-teclu': { nume: 'Neofort 44 Titan Pallady Teclu', numar: 44, zona: 'Titan-Pallady', sector: 'Sector 3', brokerTel: '0759 030 367' },
  'neofort-42-piata-muncii': { nume: 'Neofort 42 Piata Muncii', numar: 42, zona: 'Piata Muncii', sector: 'Sector 3', brokerTel: '0757 077 057' },
  'neofort-28-titan-pallady-faza-2': { nume: 'Neofort 28 Titan Pallady Faza 2', numar: 28, zona: 'Titan-Pallady', sector: 'Sector 3', brokerTel: '0759 030 367' },
  'neofort-28-titan-pallady-teclu': { nume: 'Neofort 28 Titan Pallady', numar: 28, zona: 'Titan-Pallady', sector: 'Sector 3', brokerTel: '0752 443 437' },
  'neofort-11-eminescu-viitorului': { nume: 'Neofort 11 Eminescu Viitorului', numar: 11, zona: 'Eminescu-Viitorului', sector: 'Sector 2', brokerTel: '0752 443 434' },
}

// Echivalentul lui getAnsamblu(slug) pentru nevoile componentelor globale.
// Returneaza null pentru sluguri necunoscute (ex. portofoliu vandut),
// exact ca inainte -> componentele cad pe telefonul general.
export function getContact(slug) {
  return CONTACT_MAP[slug] || null
}
