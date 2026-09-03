import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Politica Cookies — Neofort IMO | Ce Cookies Folosim',
  description: 'Politica de utilizare a cookie-urilor pe www.neofort.ro. Aflați ce cookie-uri folosim, în ce scop și cum le puteți controla.',
  alternates: { canonical: `${BASE}/cookies` },
  openGraph: {
    title: 'Politica Cookies — Ce Cookie-uri Folosim | Neofort IMO',
    url: `${BASE}/cookies`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${BASE}/og-contact.jpg`, width: 1200, height: 630, alt: 'Cookies Neofort IMO' }],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE}/og-contact.jpg`] },
}

const COOKIE_TYPES = [
  {
    tip: 'Cookie-uri strict necesare',
    culoare: '#2d7a3a',
    descriere: 'Esential pentru functionarea de baza a site-ului. Nu pot fi dezactivate.',
    exemple: [
      { nume: 'NEXT_LOCALE', durata: '1 an', scop: 'Retine preferinta de limba' },
    ],
  },
  {
    tip: 'Cookie-uri analitice',
    culoare: '#0369a1',
    descriere: 'Ne ajuta sa intelegem cum este folosit site-ul, in forma anonimizata.',
    exemple: [
      { nume: '_ga', durata: '2 ani', scop: 'Google Analytics 4 — identifică sesiunile unice de utilizator' },
      { nume: `_ga_GZHF3RNER3`, durata: '2 ani', scop: 'Google Analytics 4 — menține starea sesiunii pentru proprietatea neofort.ro' },
      { nume: 'cookie_consent', durata: 'Permanent', scop: 'Salvează preferința dvs. privind cookie-urile (acceptat/refuzat)' },
    ],
  },
  {
    tip: 'Cookie-uri functionale',
    culoare: '#7c3aed',
    descriere: 'Imbunatatesc experienta prin memorarea preferintelor.',
    exemple: [
      { nume: 'neofort_filters', durata: 'Sesiune', scop: 'Retine filtrele selectate in pagina de ansambluri' },
    ],
  },
]

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasa</Link>
              <span>›</span>
              <span className="text-gray-700">Politica Cookies</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Politica de Utilizare a Cookie-urilor</h1>
            <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
              Aceasta pagina explica ce cookie-uri si tehnologii similare foloseste www.neofort.ro, in ce scop si cum le puteti gestiona.
            </p>
            <p className="text-xs text-gray-500 mt-3">Ultima actualizare: Mai 2026</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Ce sunt cookie-urile?</h2>
            <p className="text-sm text-gray-600 leading-relaxed">Cookie-urile sunt fisiere text mici stocate pe dispozitivul dumneavoastra atunci cand vizitati un site web. Ele permit site-ului sa va recunoasca la vizite ulterioare si sa retina preferintele dumneavoastra. Nu contin informatii personale identificabile in mod direct.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Tipurile de cookie-uri folosite</h2>
            <div className="space-y-6">
              {COOKIE_TYPES.map(ct => (
                <div key={ct.tip} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-3 flex items-center gap-2" style={{ background: ct.culoare + '10', borderBottom: `2px solid ${ct.culoare}` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: ct.culoare }} />
                    <h3 className="text-sm font-semibold text-gray-900">{ct.tip}</h3>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-500 mb-4">{ct.descriere}</p>
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-gray-500 border-b border-gray-100">
                          <th className="pb-2 pr-4 font-medium">Nume</th>
                          <th className="pb-2 pr-4 font-medium">Durata</th>
                          <th className="pb-2 font-medium">Scop</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ct.exemple.map(e => (
                          <tr key={e.nume} className="border-b border-gray-50 last:border-0">
                            <td className="py-2 pr-4 font-mono text-gray-700">{e.nume}</td>
                            <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">{e.durata}</td>
                            <td className="py-2 text-gray-600">{e.scop}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Cum puteti controla cookie-urile?</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">Puteti controla si sterge cookie-urile prin setarile browserului dumneavoastra. Retineti ca dezactivarea anumitor cookie-uri poate afecta functionarea site-ului.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { browser: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { browser: 'Firefox', url: 'https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences' },
                { browser: 'Safari', url: 'https://support.apple.com/guide/safari/manage-cookies-sfri11471' },
                { browser: 'Edge', url: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge' },
              ].map(b => (
                <a key={b.browser} href={b.url} target="_blank" rel="noopener noreferrer"
                  className="text-center p-3 border border-gray-200 rounded-lg text-xs text-[#2d7a3a] hover:border-[#2d7a3a] transition-colors">
                  {b.browser} →
                </a>
              ))}
            </div>
          </section>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <Link href="/gdpr" className="text-xs text-[#2d7a3a] hover:underline">← Politica GDPR</Link>
            <Link href="/termeni" className="text-xs text-[#2d7a3a] hover:underline">Termeni si Conditii →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
