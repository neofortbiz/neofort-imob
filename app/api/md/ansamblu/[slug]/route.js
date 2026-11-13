// Versiunea Markdown a unui ansamblu: /ansamblu-rezidential/<slug>.md (rewrite in next.config.js → aici).
// Aceeasi logica de alegere ca pagina: activ (getAnsamblu) → mod vanzare; altfel portofoliu → mod vandut.
// Daca un proiect trece din active in portofoliu (sau invers), .md urmeaza automat, la aceeasi adresa.
import { getAnsamblu } from '@/data/ansambluri'
import { getOricareAnsambluPortofoliu } from '@/data/portofoliu'
import { mdAnsamblu, mdPortofoliu, raspunsMarkdown, BASE } from '@/lib/markdownPagini'

export function GET(_request, { params }) {
  const a = getAnsamblu(params.slug)
  const v = a ? null : getOricareAnsambluPortofoliu(params.slug)
  if (!a && !v) return new Response('Not found\n', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' } })
  const slug = (a || v).slug
  return raspunsMarkdown(a ? mdAnsamblu(a) : mdPortofoliu(v), `${BASE}/ansamblu-rezidential/${slug}`)
}
