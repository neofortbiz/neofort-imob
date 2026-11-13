// Versiunea Markdown a unui articol: /blog/<slug>.md (rewrite in next.config.js → aici).
// Continutul: lib/markdownPagini.js. Slug necunoscut → 404 (doar articolele din ARTICOLE).
import { ARTICOLE, AUTORI } from '@/data/blog'
import { mdArticol, raspunsMarkdown, BASE } from '@/lib/markdownPagini'

export function GET(_request, { params }) {
  const a = ARTICOLE[params.slug]
  if (!a) return new Response('Not found\n', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' } })
  return raspunsMarkdown(mdArticol(params.slug, a, AUTORI[a.autor]), `${BASE}/blog/${params.slug}`)
}
