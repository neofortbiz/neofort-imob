import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Termeni si Conditii — Neofort IMO | Conditii de Utilizare',
  description: 'Termenii si conditiile de utilizare a site-ului www.neofort.ro. Informatii despre serviciile Neofort IMO, limitari de raspundere si proprietate intelectuala.',
  alternates: { canonical: `${BASE}/termeni` },
  openGraph: {
    title: 'Termeni si Conditii — Neofort IMO',
    url: `${BASE}/termeni`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${BASE}/og-contact.jpg`, width: 1200, height: 630, alt: 'Termeni Neofort IMO' }],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE}/og-contact.jpg`] },
}

const SECTIUNI = [
  { id: 't1', titlu: '1. Acceptarea Termenilor', continut: 'Prin accesarea si utilizarea site-ului www.neofort.ro, acceptati in mod tacit prezentii Termeni si Conditii. Daca nu sunteti de acord cu oricare dintre acesti termeni, va rugam sa nu utilizati site-ul. Neofort IMO isi rezerva dreptul de a modifica acesti termeni oricand, modificarile devenind efective la publicarea lor pe site.' },
  { id: 't2', titlu: '2. Descrierea Serviciilor', continut: 'Neofort IMO este o companie de dezvoltare si intermediere imobiliara din Bucuresti, activa din 2009. Prin intermediul site-ului www.neofort.ro, oferim: prezentarea proiectelor rezidentiale proprii si din portofoliu, informatii despre preturile si disponibilitatea apartamentelor, posibilitatea de a contacta consultantii nostri, articole informative despre piata imobiliara. Informatiile prezentate au caracter orientativ si nu constituie oferta ferma de vanzare.' },
  { id: 't3', titlu: '3. Proprietate Intelectuala', continut: 'Toate continuturile site-ului www.neofort.ro — inclusiv texte, imagini, fotografii, grafice, logo-uri, design, cod sursa — sunt proprietatea exclusiva a Neofort IMO sau sunt utilizate cu acordul titularilor de drepturi. Reproducerea, copierea, distribuirea sau utilizarea in orice scop comercial fara acordul scris al Neofort IMO este strict interzisa si se pedepseste conform legii.' },
  { id: 't4', titlu: '4. Exactitatea Informatiilor', continut: 'Depunem eforturi pentru acuratetea informatiilor publicate, insa nu garantam completitudinea sau actualitatea acestora in orice moment. Preturile, disponibilitatea unitatilor si specificatiile tehnice ale proiectelor se pot modifica. Va recomandam sa confirmati toate detaliile cu consultantii nostri inainte de luarea oricarei decizii de cumparare.' },
  { id: 't5', titlu: '5. Limitarea Raspunderii', continut: 'Neofort IMO nu poate fi tinuta raspunzatoare pentru: daunele directe sau indirecte cauzate de utilizarea sau imposibilitatea utilizarii site-ului, erorile sau omisiunile din continut, accesul neautorizat al tertilor la datele transmise prin site, intreruperi tehnice ale serviciului. Raspunderea totala a Neofort IMO nu poate depasi suma de 100 EUR.' },
  { id: 't6', titlu: '6. Link-uri catre Site-uri Terte', continut: 'Site-ul poate contine link-uri catre site-uri externe. Neofort IMO nu controleaza si nu este responsabila pentru continutul, politicile de confidentialitate sau practicile acestor site-uri terte. Accesarea lor se face pe propriul risc al utilizatorului.' },
  { id: 't7', titlu: '7. Legea Aplicabila', continut: 'Prezentii Termeni si Conditii sunt guvernati de legislatia romana. Orice disputa care nu poate fi solutionata amiabil va fi supusa instantelor judecatoresti competente din Bucuresti, Romania. Inainte de orice actiune legala, partile se angajeaza sa incerce solutionarea amiabila a disputei.' },
  { id: 't8', titlu: '8. Contact', continut: 'Pentru orice intrebari legate de acesti Termeni si Conditii: info@neofort-biz.ro | Tel: 0758 090 904 | Str. Theodor Aman Pictor nr. 11, Sector 1, Bucuresti. Program: Luni-Vineri 10:00-18:00. Ultima actualizare: Mai 2026.' },
]

export default function TermeniPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="border-b border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasa</Link>
              <span>›</span>
              <span className="text-gray-700">Termeni si Conditii</span>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Termeni si Conditii de Utilizare</h1>
            <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
              Conditiile care guverneaza utilizarea site-ului www.neofort.ro si a serviciilor Neofort IMO.
            </p>
            <p className="text-xs text-gray-500 mt-3">Ultima actualizare: Mai 2026 · Versiunea 1.0</p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10">
            <article>
              {SECTIUNI.map(s => (
                <section key={s.id} id={s.id} className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">{s.titlu}</h2>
                  <p className="text-sm text-gray-600 leading-7">{s.continut}</p>
                </section>
              ))}
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <Link href="/gdpr" className="text-xs text-[#2d7a3a] hover:underline">← Politica GDPR</Link>
                <Link href="/cookies" className="text-xs text-[#2d7a3a] hover:underline">Politica Cookies →</Link>
              </div>
            </article>
            <aside>
              <div className="border border-gray-200 rounded-xl p-4 sticky top-6">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Cuprins</h3>
                <nav className="space-y-1.5">
                  {SECTIUNI.map(s => (
                    <a key={s.id} href={`#${s.id}`} className="block text-xs text-gray-500 hover:text-[#2d7a3a] transition-colors leading-tight py-0.5">
                      {s.titlu.split('. ').slice(1).join('. ')}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
