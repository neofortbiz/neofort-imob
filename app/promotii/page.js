import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ANSAMBLURI_ACTIVE, formatPret } from '@/data/ansambluri'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  title: 'Promoții Apartamente Noi București | Neofort IMO',
  description: 'Oferte și promoții active la apartamentele noi Neofort IMO în București. Prețuri reduse, avantaje exclusive, disponibilitate limitată.',
  alternates: { canonical: `${BASE}/promotii` },
}

export default function PromotiiPage() {
  const promotii = ANSAMBLURI_ACTIVE.filter(a => a.status === 'promotie')
  const constructie = ANSAMBLURI_ACTIVE.filter(a => a.status === 'constructie')

  return (
    <>
      <Header activePath="/promotii" />
      <main>

        <section className="py-12 px-6 text-center border-b border-gray-100"
          style={{ background: '#081c12' }}>
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#c8922a' }}>
            Oferte active
          </p>
          <h1 className="text-2xl md:text-3xl font-medium text-white mb-4">
            Promoții Apartamente Noi
          </h1>
          <p className="text-sm max-w-xl mx-auto" style={{ color: '#9ca3af' }}>
            Prețuri directe de la sursă, fără comision. Ofertele sunt valabile pentru un număr limitat de unități.
          </p>
        </section>

        {promotii.length > 0 && (
          <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Promoții active</h2>
              <p className="text-sm text-gray-500 mb-8">Ansambluri finalizate cu prețuri promoționale pentru ultimele unități disponibile.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {promotii.map(a => (
                  <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                    className="group border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                      <span className="text-xs text-gray-400">Foto</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ background: '#fff3e0', color: '#c8922a' }}>Promoție</span>
                        <span className="text-[10px] text-gray-400">{a.zona}</span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{a.nume}</h3>
                      <p className="text-xs text-gray-500 mb-3">{a.sector} · {a.etaje}</p>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-gray-400">De la</span>
                        <span className="text-sm font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(a.pretDeLa)}€</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {constructie.length > 0 && (
          <section className="py-12 px-6 border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-lg font-medium text-gray-900 mb-2">În construcție</h2>
              <p className="text-sm text-gray-500 mb-8">Rezervă acum la prețul de lansare — cel mai avantajos moment pentru achiziție.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {constructie.map(a => (
                  <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                    className="group border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                    <div className="bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                      <span className="text-xs text-gray-400">Foto</span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{ background: '#e8f5e9', color: '#2d7a3a' }}>În construcție</span>
                        <span className="text-[10px] text-gray-400">{a.zona}</span>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">{a.nume}</h3>
                      <p className="text-xs text-gray-500 mb-3">{a.sector} · Predare {a.dataPredare}</p>
                      <div className="flex items-baseline justify-between">
                        <span className="text-xs text-gray-400">De la</span>
                        <span className="text-sm font-semibold" style={{ color: '#2d7a3a' }}>{formatPret(a.pretDeLa)}€</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 px-6 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">Vezi toate ansamblurile sau contactează un reprezentant direct.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/ansambluri-rezidentiale"
              className="px-6 py-3 rounded-xl text-sm font-medium text-white"
              style={{ background: '#2d7a3a' }}>
              Toate ansamblurile
            </Link>
            <Link href="/echipa"
              className="px-6 py-3 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50">
              Contactează un broker
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
