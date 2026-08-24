import Link from 'next/link'

// Parseaza [text](url) in linkuri interne Next.js SI **text** in bold.
// Folosit atat in app/blog/[slug]/page.js (sectiuni articol, FAQ) cat si
// in components/DescriereExpand.js (descriereCompleta ansambluri).
// NU modifica formatul markdown din data/ - doar il randeaza corect in React.
export function parseLinks(text, keyPrefix = '') {
  if (!text) return text
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
