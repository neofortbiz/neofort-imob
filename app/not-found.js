import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CONTACT_MAP, ZONE_LINKS } from '@/data/contact-map'

// Pagina 404 personalizata.
// Inainte: fallback-ul default Next — fara branding, fara navigatie, fara
// nicio cale de recuperare. Orice link vechi sau typo insemna vizitator pierdut
// si legatura interna irosita.
// Acum: recupereaza utilizatorul (proiecte active, zone, telefon) si
// redistribuie PageRank-ul intern catre paginile care conteaza.
//
// Foloseste DOAR module usoare (contact-map ~3.5KB), nu datele complete.

export const metadata = {
  title: 'Pagina nu a fost găsită',
  description: 'Pagina căutată nu există. Vezi ansamblurile rezidențiale active Neofort IMO din București.',
  robots: { index: false, follow: true },
}

const TEL = '0758 090 904'

export default function NotFound() {
  const ansambluri = Object.entries(CONTACT_MAP).slice(0, 8)

  return (
    <>
      <Header />
      <main className="min-h-[60vh] px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#2d7a3a' }}>Eroare 404</p>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">Pagina nu a fost găsită</h1>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            Pagina căutată nu mai există sau adresa este greșită. Îți lăsăm mai jos ansamblurile rezidențiale active
            și zonele în care construim — sau ne poți suna direct.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/ansambluri-rezidentiale"
              className="text-sm font-medium px-5 py-2.5 rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#2d7a3a' }}>
              Vezi ansamblurile active
            </Link>
            <a href={`tel:${TEL.replace(/\s/g, '')}`}
              className="text-sm font-medium px-5 py-2.5 rounded-lg border border-gray-200 text-gray-900 hover:bg-gray-50 transition-colors">
              Sună {TEL}
            </a>
          </div>

          <div className="mb-8">
            <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">Ansambluri rezidențiale active</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ansambluri.map(([slug, a]) => (
                <Link key={slug} href={`/ansamblu-rezidential/${slug}`}
                  className="text-sm text-gray-700 hover:text-[#2d7a3a] transition-colors py-1.5">
                  {a.nume} <span className="text-gray-400">— {a.zona}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">Zone</h2>
            <div className="flex flex-wrap gap-2">
              {ZONE_LINKS.map(z => (
                <Link key={z.href} href={z.href}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:border-[#2d7a3a] hover:text-[#2d7a3a] transition-colors">
                  {z.label}
                </Link>
              ))}
              <Link href="/portofoliu"
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:border-[#2d7a3a] hover:text-[#2d7a3a] transition-colors">
                Portofoliu
              </Link>
              <Link href="/blog"
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-700 hover:border-[#2d7a3a] hover:text-[#2d7a3a] transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
