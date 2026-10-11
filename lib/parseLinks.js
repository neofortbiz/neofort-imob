import Link from 'next/link'
import { ANI_EXPERIENTA } from '@/data/siteConfig'

// Tokenul {ANI} din textele din data/ e inlocuit cu vechimea reala a firmei,
// calculata din anul infiintarii (2009). Inainte numarul era scris de mana in
// proza si ramanea in urma: la auditul v405 erau 5 mentiuni ale firmei scrise
// „17 ani", care ar fi devenit gresite la 1 ianuarie.
//
// Se aplica DOAR vechimii firmei. Anii din cariera unui autor („16 ani de
// activitate", „10 ani in zona asta") raman scrisi explicit — sunt durate
// individuale, nu vârsta Neofort IMO, si nu pot fi derivate din 2009.
export function aplicaTokenAni(text) {
  if (typeof text !== 'string') return text
  return text.includes('{ANI}') ? text.replaceAll('{ANI}', String(ANI_EXPERIENTA)) : text
}

// Parseaza [text](url) in linkuri interne Next.js SI **text** in bold.
// Folosit atat in app/blog/[slug]/page.js (sectiuni articol, FAQ) cat si
// in components/DescriereExpand.js (descriereCompleta ansambluri).
// NU modifica formatul markdown din data/ - doar il randeaza corect in React.
export function parseLinks(text, keyPrefix = '') {
  if (!text) return text
  text = aplicaTokenAni(text)
  // Despicam mai intai pe linkuri, apoi pe bold, pastrand ordinea
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)
  return tokens.map((part, i) => {
    const linkM = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkM) return <Link key={`${keyPrefix}l${i}`} href={linkM[2]} className="text-[#2d7a3a] underline underline-offset-2 hover:text-[#1a5c2a] transition-colors">{linkM[1]}</Link>
    const boldM = part.match(/^\*\*([^*]+)\*\*$/)
    if (boldM) return <strong key={`${keyPrefix}b${i}`} className="font-semibold text-gray-900">{boldM[1]}</strong>
    return part
  })
}
