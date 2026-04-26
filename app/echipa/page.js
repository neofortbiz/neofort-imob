import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ECHIPA } from '@/data/echipa'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  title: 'Echipa Neofort IMO — Reprezentanți Vânzări București',
  description: 'Cunoaște echipa Neofort IMO — 6 reprezentanți de vânzări cu experiență în imobiliare București. Contactează direct brokerul potrivit pentru zona ta.',
  alternates: { canonical: `${BASE}/echipa` },
}

const ecnipaSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Echipa Neofort IMO',
  itemListElement: ECHIPA.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Person',
      name: b.nume,
      jobTitle: b.rol,
      telephone: b.tel,
      worksFor: { '@type': 'Organization', name: 'Neofort IMO' },
      image: `${BASE}${b.foto}`,
    },
  })),
}

export default function EchipaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ecnipaSchema) }} />
      <Header activePath="/echipa" />
      <main>

        {/* HERO */}
        <section className="py-12 px-6 text-center border-b border-gray-100">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#2d7a3a' }}>
            Echipa noastră
          </p>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
            Reprezentanți Vânzări Neofort IMO
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Fiecare ansamblu rezidențial Neofort are desemnat un reprezentant de vânzări dedicat, cu experiență în zona și proiectul respectiv.
          </p>
        </section>

        {/* GRID BROKERI */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {ECHIPA.map(b => (
              <div key={b.id} className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                {/* POZA */}
                <div className="mx-auto mb-4 rounded-full overflow-hidden border-2 border-gray-100"
                  style={{ width: 100, height: 100 }}>
                  <img
                    src={b.foto}
                    alt={b.nume}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* INFO */}
                <h2 className="text-sm font-semibold text-gray-900 mb-1">{b.nume}</h2>
                <p className="text-xs text-gray-500 mb-1">{b.rol}</p>
                <div className="flex justify-center gap-3 text-xs text-gray-400 mb-4">
                  <span>{b.experienta} ani experiență</span>
                  <span>·</span>
                  <span>{b.vechimeNeofort} ani Neofort</span>
                </div>
                {/* CONTACT */}
                <div className="flex gap-2 justify-center">
                  <a href={`tel:${b.tel}`}
                    className="flex-1 py-2 rounded-lg text-xs font-medium text-center border border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">
                    Sună
                  </a>
                  <a href={`https://wa.me/${b.tel.replace('+', '')}?text=${encodeURIComponent(`Bună ziua! Sunt interesat de apartamentele Neofort IMO.`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-lg text-xs font-medium text-center border border-green-100 bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
