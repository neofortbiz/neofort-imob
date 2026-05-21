import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Politica de Confidentialitate GDPR — Neofort IMO | Protectia Datelor',
  description: 'Politica de confidentialitate Neofort IMO conform GDPR (Regulamentul UE 2016/679). Aflati cum colectam, procesam si protejam datele dumneavoastra personale.',
  alternates: { canonical: `${BASE}/gdpr` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Politica GDPR — Neofort IMO',
    description: 'Politica de confidentialitate si protectia datelor personale conform GDPR.',
    url: `${BASE}/gdpr`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${BASE}/og-contact.jpg`, width: 1200, height: 630, alt: 'GDPR Neofort IMO' }],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE}/og-contact.jpg`] },
}

const SECTIUNI = [
  { id: '1', titlu: '1. Identitatea Operatorului de Date', continut: `Neofort IMO, denumita in continuare Operatorul, cu sediul social in Str. Theodor Aman Pictor nr. 11, Sector 1, Bucuresti 010776, Romania, inregistrata la Registrul Comertului sub nr. J2026008972000, CUI RO53874087, este operatorul datelor dumneavoastra cu caracter personal in sensul Regulamentului (UE) 2016/679 al Parlamentului European si al Consiliului (GDPR). Contact: info@neofort-biz.ro | Tel: 0758 090 904 | Web: www.neofort.ro` },
  { id: '2', titlu: '2. Ce Date Personale Colectam', continut: `Colectam urmatoarele categorii de date personale:\n\nDate furnizate direct de dumneavoastra: nume si prenume, numar de telefon, adresa de e-mail, preferinte imobiliare (tip proprietate, buget, zona), mesaje transmise prin formulare.\n\nDate colectate automat: adresa IP (anonimizata dupa 24h), tipul de browser, paginile vizitate, sursa de trafic.\n\nDate colectate prin cookies: consultati Politica Cookies pentru detalii.` },
  { id: '3', titlu: '3. Scopurile si Temeiul Legal al Prelucrarii', continut: `Prelucrarea datelor se face in baza: executarii unui contract (raspuns la solicitari, programare vizionari), interesului legitim (imbunatatirea serviciilor prin date analitice anonimizate), consimtamantului (marketing direct - retractabil oricand) si obligatiilor legale (contabilitate, raspuns autoritati).` },
  { id: '4', titlu: '4. Durata Pastrarii Datelor', continut: `Date de contact: 3 ani de la ultima interactiune. Date analitice: maxim 14 luni. Corespondenta email: 3 ani. Date contabile: 5 ani conform legii. La expirarea perioadei, datele sunt sterse sau anonimizate.` },
  { id: '5', titlu: '5. Drepturile Dumneavoastra', continut: `Conform GDPR aveti: dreptul de acces (Art. 15), dreptul la rectificare (Art. 16), dreptul la stergere (Art. 17), dreptul la restrictionarea prelucrarii (Art. 18), dreptul la portabilitate (Art. 20), dreptul la opozitie (Art. 21). Puteti depune plangere la ANSPDCP (www.dataprotection.ro). Trimiteti solicitari la info@neofort-biz.ro - raspundem in 30 de zile.` },
  { id: '6', titlu: '6. Destinatarii Datelor', continut: `Datele dumneavoastra pot fi transmise catre:

Google LLC (Google Analytics 4) — servicii de analiza web, exclusiv daca ati acordat consimtamantul prin bannerul de cookie-uri. Datele sunt anonimizate. Optare afara: tools.google.com/dlpage/gaoptout.

Vercel Inc. — hosting si operare tehnica a site-ului.

Resend — serviciu trimitere email pentru formularele de contact.

Autoritati publice — exclusiv la solicitare legala.

Nu vindem sau transferam datele catre terte parti in scopuri comerciale.` },
  { id: '7', titlu: '7. Securitatea Datelor', continut: `Implementam: conexiuni HTTPS/TLS, acces restrictionat pe baza need-to-know, politici de securitate interna, monitorizare pentru detectarea breselor, formare continua a personalului. In cazul unei brese, notificam ANSPDCP in 72h si utilizatorii afectati.` },
  { id: '8', titlu: '8. Modificari ale Politicii', continut: `Aceasta politica poate fi actualizata periodic. Data ultimei actualizari este indicata mai jos. Continuarea utilizarii site-ului constituie acceptarea politicii actualizate.\n\nUltima actualizare: Mai 2026` },
]

export default function GdprPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasa</Link>
              <span>›</span>
              <span className="text-gray-700">Politica GDPR</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Politica de Confidentialitate</h1>
            <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
              Neofort IMO respecta confidentialitatea datelor dumneavoastra personale conform Regulamentului (UE) 2016/679 (GDPR).
            </p>
            <p className="text-xs text-gray-500 mt-3">Ultima actualizare: Mai 2026 · Versiunea 2.0</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10">
            <article>
              {SECTIUNI.map(s => (
                <section key={s.id} id={`sectiunea-${s.id}`} className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">{s.titlu}</h2>
                  <p className="text-sm text-gray-600 leading-7 whitespace-pre-line">{s.continut}</p>
                </section>
              ))}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
                <h2 className="text-base font-semibold text-gray-900 mb-3">Contact pentru Protectia Datelor</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>Email: <a href="mailto:info@neofort-biz.ro" className="text-[#2d7a3a] hover:underline">info@neofort-biz.ro</a></p>
                  <p>Tel: <a href="tel:0758090904" className="text-[#2d7a3a] hover:underline">0758 090 904</a></p>
                  <p>Adresa: Str. Theodor Aman Pictor nr. 11, Sector 1, Bucuresti</p>
                </div>
              </div>
            </article>
            <aside className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4 sticky top-6">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Cuprins</h3>
                <nav className="space-y-1.5">
                  {SECTIUNI.map(s => (
                    <a key={s.id} href={`#sectiunea-${s.id}`} className="block text-xs text-gray-500 hover:text-[#2d7a3a] transition-colors leading-tight py-0.5">
                      {s.titlu.split('. ').slice(1).join('. ')}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="text-xs font-semibold text-gray-900 mb-3">Documente conexe</h3>
                <div className="space-y-2">
                  <Link href="/cookies" className="block text-xs text-[#2d7a3a] hover:underline">Politica Cookies →</Link>
                  <Link href="/termeni" className="block text-xs text-[#2d7a3a] hover:underline">Termeni si Conditii →</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
