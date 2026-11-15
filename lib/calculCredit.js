// Formula ratei lunare (anuitate) — O SINGURA SURSA pentru:
//   - calculatorul de pe site (app/calculator-credit/CalculatorClient.js)
//   - unealta calculate_mortgage din serverul MCP (lib/mcpUnelte.js, v451)
// Mutata din CalculatorClient.js la v451 fara nicio schimbare de calcul.
// Fisierul nu importa nimic (nici alias `@/`), ca sa poata fi testat direct cu node.

export function calcRata(principal, daePct, durataAni) {
  if (principal <= 0 || daePct <= 0) return 0
  const r = daePct / 100 / 12
  const n = durataAni * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

// Limitele si valorile implicite ale calculatorului de pe site — aceleasi si in MCP.
export const DAE_MIN = 6.0
export const DAE_MAX = 12.0
export const DAE_DEFAULT = 7.5
export const AVANS_PCT_MIN = 5
export const AVANS_PCT_MAX = 50
export const AVANS_PCT_DEFAULT = 15
export const DURATA_MIN = 5
export const DURATA_MAX = 35
export const DURATA_DEFAULT = 25

// Cota de TVA pentru apartamentele noi (21% pentru orice achizitie noua — vezi
// contextul proiectului, v416). Preturile de pe site sunt FARA TVA.
export const COTA_TVA = 0.21
