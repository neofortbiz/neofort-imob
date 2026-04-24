// DATE CENTRALE — toate ansamblurile
// status: 'activ' | 'constructie' | 'promotie' | 'vandut' | 'suspendat'

export const ANSAMBLURI = [
  {
    slug: 'neofort-84-titan-pallady',
    numar: 84,
    nume: 'Neofort 84 Titan Pallady',
    zona: 'Titan-Pallady',
    sector: 'Sector 3',
    adresa: 'Zona Titan-Pallady, Sector 3, București',
    status: 'constructie',
    dataPredare: 'T1 2027',
    pretDeLa: 62000,
    etaje: 'P+10',
    telefon: '0743 250 029',
    broker: 'Alexandru B.',
    coordonate: { lat: 44.4268, lng: 26.1700 },
    tipuri: ['2 camere', '3 camere', '4 camere'],
    descriere: 'Ansamblu rezidențial Neofort 84 în construcție în zona Titan-Pallady, Sector 3, la 3 minute de mers pe jos de stația de metrou Nicolae Teclu. Bloc P+10 etaje cu predare T1 2027, structură beton armat cadre și diafragme, pereți Porotherm pentru izolație termică și fonică superioară.',
    apartamente: [
      { tip: '2 cam. Tip 1', etaj: 'et. 10', suprafata: 47.78, avans20: 66892, avans45: 62114, promo: true, camere: 2 },
      { tip: '2 cam. Tip 2', etaj: 'et. 3-9', suprafata: 49.15, avans20: 68824, avans45: 63908, promo: true, camere: 2 },
      { tip: '2 cam. Tip 3', etaj: 'et. 1-10', suprafata: 61.50, avans20: 86254, avans45: 80093, promo: false, camere: 2 },
      { tip: '3 cam. Tip 1', etaj: 'et. 1+P', suprafata: 78.60, avans20: 110026, avans45: 102167, promo: true, camere: 3 },
      { tip: '3 cam. Tip 2', etaj: 'et. 2-9', suprafata: 86.30, avans20: 120820, avans45: 112190, promo: false, camere: 3 },
      { tip: '3 cam. Tip 3', etaj: 'et. 1-8', suprafata: 90.62, avans20: 126868, avans45: 117806, promo: false, camere: 3 },
      { tip: '4 cam. terasă', etaj: 'et. 10', suprafata: 175.58, avans20: 190988, avans45: 181262, promo: false, camere: 4 },
    ],
    parcare: {
      exterior: { disponibil: true, pret: 6000 },
      interior: { disponibil: false, pret: null },
      subteran: { disponibil: true, pret: 8500 },
    },
    dotari: [
      'Încălzire în pardoseală',
      'Tâmplărie PVC',
      'Lifturi silențioase',
      'Gresie și faianță import',
      'Terase generoase',
      'Instalații complete',
      'Parcare subterană',
      'Centrală termică',
    ],
    puncteInteres: [
      { tip: 'metrou', nume: 'Nicolae Teclu', distanta: '3 min pe jos' },
      { tip: 'metrou', nume: 'Anghel Saligny', distanta: '8 min pe jos' },
      { tip: 'mall', nume: 'IKEA Pallady', distanta: '5 min cu mașina' },
      { tip: 'mall', nume: 'Auchan Titan', distanta: '7 min cu mașina' },
      { tip: 'scoala', nume: 'Waldorf & Spectrum School', distanta: '500m' },
      { tip: 'parc', nume: 'Parcul Teilor', distanta: '10 min pe jos' },
    ],
    galerie: [],
    seoTitle: 'Apartamente noi Titan Pallady — Ansamblu Rezidențial Neofort 84 | Neofort IMO',
    seoDescription: 'Ansamblu rezidențial Neofort 84 Titan Pallady, Sector 3 București. Apartamente 2-4 camere de la 62.000€+TVA. Predare T1 2027, lângă metrou Nicolae Teclu.',
  },
  {
    slug: 'neofort-42-piata-muncii',
    numar: 42,
    nume: 'Neofort 42 Piața Muncii',
    zona: 'Piața Muncii',
    sector: 'Sector 2',
    adresa: 'Zona Piața Muncii, Sector 2, București',
    status: 'activ',
    dataPredare: 'Finalizat',
    pretDeLa: 89000,
    etaje: 'P+8',
    telefon: '0743 250 029',
    broker: 'Alexandru B.',
    coordonate: { lat: 44.4380, lng: 26.1250 },
    tipuri: ['3 camere', '4 camere'],
    descriere: 'Ansamblu rezidențial finalizat în zona Piața Muncii, Sector 2, la 200m de metrou și 300m de Parcul Lia Manoliu. Apartamente premium cu finisaje de calitate superioară.',
    apartamente: [
      { tip: '3 cam. Tip 1', etaj: 'et. 1-7', suprafata: 82.00, avans20: 95000, avans45: 89000, promo: false, camere: 3 },
      { tip: '4 cam. Tip 1', etaj: 'et. 1-7', suprafata: 139.00, avans20: 160000, avans45: 148000, promo: false, camere: 4 },
    ],
    parcare: {
      exterior: { disponibil: true, pret: 5000 },
      interior: { disponibil: false, pret: null },
      subteran: { disponibil: false, pret: null },
    },
    dotari: ['Tâmplărie PVC', 'Lifturi', 'Gresie și faianță import', 'Instalații complete'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Piața Muncii', distanta: '200m' },
      { tip: 'parc', nume: 'Parcul Lia Manoliu', distanta: '300m' },
    ],
    galerie: [],
    seoTitle: 'Apartamente noi Piața Muncii — Neofort 42 | Neofort IMO',
    seoDescription: 'Ansamblu rezidențial Neofort 42 Piața Muncii, Sector 2 București. Apartamente 3-4 camere de la 89.000€+TVA. Lângă metrou și parc.',
  },
  {
    slug: 'neofort-76-militari',
    numar: 76,
    nume: 'Neofort 76 Militari',
    zona: 'Militari',
    sector: 'Sector 6',
    adresa: 'Zona Militari, Sector 6, București',
    status: 'promotie',
    dataPredare: 'Finalizat',
    pretDeLa: 74000,
    etaje: 'P+7',
    telefon: '0743 250 029',
    broker: 'Alexandru B.',
    coordonate: { lat: 44.4320, lng: 26.0100 },
    tipuri: ['2 camere', '3 camere'],
    descriere: 'Ansamblu rezidențial finalizat în zona Militari, Sector 6. Oferte speciale disponibile pentru unitățile rămase.',
    apartamente: [
      { tip: '2 cam. Tip 1', etaj: 'et. 1-6', suprafata: 52.00, avans20: 78000, avans45: 74000, promo: true, camere: 2 },
      { tip: '3 cam. Tip 1', etaj: 'et. 1-6', suprafata: 75.00, avans20: 95000, avans45: 88000, promo: true, camere: 3 },
    ],
    parcare: {
      exterior: { disponibil: true, pret: 5000 },
      interior: { disponibil: false, pret: null },
      subteran: { disponibil: false, pret: null },
    },
    dotari: ['Tâmplărie PVC', 'Lifturi', 'Instalații complete'],
    puncteInteres: [
      { tip: 'metrou', nume: 'Gorjului', distanta: '5 min' },
      { tip: 'mall', nume: 'Plaza Mall', distanta: '10 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente noi Militari — Neofort 76 | Neofort IMO',
    seoDescription: 'Ansamblu rezidențial Neofort 76 Militari, Sector 6 București. Apartamente 2-3 camere de la 74.000€+TVA. Promoție disponibilă.',
  },
  {
    slug: 'neofort-85-herastrau',
    numar: 85,
    nume: 'Neofort 85 Herăstrău',
    zona: 'Herăstrău-Aviației',
    sector: 'Sector 1',
    adresa: 'Zona Herăstrău-Aviației, Sector 1, București',
    status: 'constructie',
    dataPredare: 'T2 2027',
    pretDeLa: 145000,
    etaje: 'S+P+4',
    telefon: '0743 250 029',
    broker: 'Alexandru B.',
    coordonate: { lat: 44.4780, lng: 26.0820 },
    tipuri: ['2 camere', '4 camere'],
    descriere: 'Ansamblu rezidențial premium în construcție în zona Herăstrău-Aviației, Sector 1. Finisaje LUX, parcare subterană, vedere spre parc.',
    apartamente: [
      { tip: '2 cam. LUX', etaj: 'et. 1-3', suprafata: 65.00, avans20: 158000, avans45: 145000, promo: false, camere: 2 },
      { tip: '4 cam. LUX', etaj: 'et. 1-4', suprafata: 145.00, avans20: 320000, avans45: 295000, promo: false, camere: 4 },
    ],
    parcare: {
      exterior: { disponibil: false, pret: null },
      interior: { disponibil: false, pret: null },
      subteran: { disponibil: true, pret: 12000 },
    },
    dotari: ['Finisaje LUX', 'Tâmplărie aluminiu', 'Lifturi silențioase', 'Parcare subterană', 'Lobby premium', 'Instalații complete'],
    puncteInteres: [
      { tip: 'parc', nume: 'Parcul Herăstrău', distanta: '5 min pe jos' },
      { tip: 'mall', nume: 'Băneasa Shopping City', distanta: '10 min' },
    ],
    galerie: [],
    seoTitle: 'Apartamente LUX Herăstrău — Neofort 85 | Neofort IMO',
    seoDescription: 'Ansamblu rezidențial premium Neofort 85 Herăstrău, Sector 1 București. Apartamente 2-4 camere de la 145.000€+TVA. Predare T2 2027.',
  },
]

// Ansambluri active (la vanzare sau in constructie sau promotie)
export const ANSAMBLURI_ACTIVE = ANSAMBLURI.filter(a =>
  ['activ', 'constructie', 'promotie'].includes(a.status)
)

// Ansambluri portofoliu (vandute)
export const ANSAMBLURI_PORTOFOLIU = ANSAMBLURI.filter(a => a.status === 'vandut')

// Helper: gaseste ansamblu dupa slug
export function getAnsamblu(slug) {
  return ANSAMBLURI.find(a => a.slug === slug) || null
}

// Helper: formatare pret
export function formatPret(pret) {
  return new Intl.NumberFormat('ro-RO').format(pret) + '€'
}

// Culori badge per status
export const STATUS_CONFIG = {
  activ: { label: 'Finalizat', bg: 'bg-[#2d7a3a]', text: 'text-white', dot: '#2d7a3a' },
  constructie: { label: 'În construcție', bg: 'bg-[#1565c0]', text: 'text-white', dot: '#1565c0' },
  promotie: { label: 'Promoție', bg: 'bg-[#c0392b]', text: 'text-white', dot: '#c0392b' },
  vandut: { label: 'Vândut', bg: 'bg-[#c8922a]', text: 'text-white', dot: '#c8922a' },
  suspendat: { label: 'Suspendat', bg: 'bg-gray-400', text: 'text-white', dot: '#888' },
}
