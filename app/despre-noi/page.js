import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  title: 'Despre Neofort IMO — 17 Ani de Imobiliare în București',
  description: 'Neofort IMO este o companie de imobiliare din București fondată în 2009. 85+ ansambluri rezidențiale livrate, 4.000+ familii, 17 ani experiență. Direct de la sursă, fără comision.',
  alternates: { canonical: `${BASE}/despre-noi` },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'RealEstateAgent'],
  '@id': `${BASE}/#localbusiness`,
  name: 'Neofort IMO',
  description: 'Companie specializată în comercializarea ansamblurilor rezidențiale noi în București. Direct de la sursă, fără comision de agenție.',
  url: BASE,
  telephone: '+40758090904',
  email: 'info@neofort-biz.ro',
  foundingDate: '2009',
  logo: `${BASE}/logo.avif`,
  image: `${BASE}/logo.avif`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Str. Theodor Aman Pictor nr. 11',
    addressLocality: 'București',
    addressRegion: 'Sector 1',
    postalCode: '010776',
    addressCountry: 'RO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 44.4474,
    longitude: 26.0935,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '10:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday','Sunday'], opens: '00:00', closes: '00:00' },
  ],
  vatID: 'RO53874087',
  legalName: 'Neofort IMO SRL',
  areaServed: { '@type': 'City', name: 'București' },
}

export default function DespreNoiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Header activePath="/despre-noi" />
      <main>

        {/* HERO */}
        <section className="py-14 px-6 text-center border-b border-gray-100">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#2d7a3a' }}>
            Din 2009 — Rebranding 2026
          </p>
          <h1 className="text-2xl md:text-4xl font-medium text-gray-900 mb-5 max-w-2xl mx-auto leading-tight">
            Neofort IMO — Imobiliare București
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
            Companie de imobiliare specializată în ansambluri rezidențiale noi. Direct de la sursă, fără comision de agenție.
          </p>
        </section>

        {/* CIFRE CHEIE */}
        <section className="py-12 px-6 border-b border-gray-100">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '85+', lbl: 'Ansambluri livrate' },
              { val: '4.000+', lbl: 'Familii fericite' },
              { val: '17 ani', lbl: 'Experiență' },
              { val: '12', lbl: 'Active acum' },
            ].map(s => (
              <div key={s.lbl} className="p-4 rounded-xl border border-gray-100">
                <div className="text-2xl font-semibold mb-1" style={{ color: '#2d7a3a' }}>{s.val}</div>
                <div className="text-xs text-gray-500">{s.lbl}</div>
              </div>
            ))}
          </div>
        </section>

        {/* POVESTEA */}
        <section className="py-12 px-6 border-b border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Povestea noastră</h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                Neofort IMO a luat naștere în 2009, într-un moment în care piața imobiliară din București era în plin proces de transformare. Fondatorii companiei au identificat o nevoie clară: cumpărătorii de locuințe noi aveau nevoie de un partener de încredere care să îi ghideze direct la sursă, fără comisioane suplimentare și fără intermediari inutili.
              </p>
              <p>
                De-a lungul celor 17 ani de activitate, Neofort IMO a livrat peste 85 de ansambluri rezidențiale în toate sectoarele Capitalei. Am asistat mii de familii să își găsească locuința potrivită — de la prima garsonieră până la penthouse-ul cu vedere panoramică.
              </p>
              <p>
                În 2026 am trecut printr-un proces de rebranding complet — identitate vizuală nouă, prezență digitală modernă și o echipă consolidată de șase reprezentanți specializați pe zone geografice specifice din București. Rămânem fideli principiului fondator: transparență totală, prețuri directe de la dezvoltator și consultanță personalizată.
              </p>
              <p>
                Astăzi, cu 12 ansambluri active în Sectoarele 2, 3 și 6, Neofort IMO continuă să fie una dintre companiile de referință în domeniul comercializării locuințelor noi din București.
              </p>
            </div>
          </div>
        </section>

        {/* VALORI */}
        <section className="py-12 px-6 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-8 text-center">Cum lucrăm</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '🏗️',
                  titlu: 'Direct de la sursă',
                  desc: 'Comercializăm exclusiv apartamente în ansambluri proprii sau partenere. Prețurile sunt cele ale dezvoltatorului — fără comision de agenție adăugat.',
                },
                {
                  icon: '🤝',
                  desc: 'Fiecare client lucrează cu un singur reprezentant dedicat, specializat pe zona de interes. Cunoaște fiecare ansamblu în detaliu.',
                  titlu: 'Un broker, un client',
                },
                {
                  icon: '📋',
                  titlu: 'Transparență contractuală',
                  desc: 'Toate documentele, antecontractele și actele de vânzare sunt verificate juridic. Niciun cost ascuns, nicio surpriză la semnare.',
                },
              ].map(v => (
                <div key={v.titlu} className="p-6 rounded-xl border border-gray-100">
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">{v.titlu}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DATE COMPANIE */}
        <section className="py-12 px-6 border-b border-gray-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Date companie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[
                { lbl: 'Denumire', val: 'Neofort IMO SRL' },
                { lbl: 'CUI', val: 'RO 53874087' },
                { lbl: 'Nr. Registru Comerțului', val: 'J2026008972000' },
                { lbl: 'Fondată', val: '2009 (rebranding 2026)' },
                { lbl: 'Adresă', val: 'Str. Theodor Aman Pictor nr. 11, Sector 1, București 010776' },
                { lbl: 'Program', val: 'Luni–Vineri 10:00–18:00' },
                { lbl: 'Telefon', val: '0758 090 904' },
                { lbl: 'Email', val: 'info@neofort-biz.ro' },
              ].map(r => (
                <div key={r.lbl} className="flex gap-3 py-3 border-b border-gray-50">
                  <span className="text-gray-400 w-40 flex-shrink-0">{r.lbl}</span>
                  <span className="text-gray-800 font-medium">{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Vrei să lucrezi cu noi?</h2>
          <p className="text-sm text-gray-500 mb-6">Contactează direct brokerul potrivit pentru zona ta sau vizitează biroul nostru.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/echipa"
              className="px-6 py-3 rounded-xl text-sm font-medium text-white"
              style={{ background: '#2d7a3a' }}>
              Cunoaște echipa
            </Link>
            <Link href="/contact"
              className="px-6 py-3 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50">
              Contact & locație
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
