import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ANSAMBLURI_PORTOFOLIU } from '@/data/portofoliu'
import { ANSAMBLURI_ACTIVE, formatPret } from '@/data/ansambluri'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  title: 'Portofoliu Ansambluri Vândute — Neofort IMO | 85+ Proiecte Livrate',
  description: 'Portofoliul complet al ansamblurilor rezidențiale Neofort IMO finalizate și vândute în București. 85+ proiecte livrate din 2009 în toate sectoarele capitalei.',
  alternates: { canonical: `${BASE}/portofoliu` },
}

const ZONE_LABEL = {
  'Herăstrău-Aviației': 'Sector 1',
  'Titan-Pallady': 'Sector 3',
  'Morarilor-Pantelimon': 'Sector 2',
  'Parcul Carol-Unirii': 'Sector 5',
  'Popa Nan-Călărașilor': 'Sector 2',
  'Petricani-Plumbuita': 'Sector 2',
  'Andronache-Petricani': 'Sector 2',
  'Șișești-Băneasa': 'Sector 1',
}

export default function PortofoliuPage() {
  return (
    <>
      <Header activePath="/portofoliu" />
      <main>

        {/* HERO */}
        <section className="py-12 px-6 text-center border-b border-gray-100"
          style={{ background: '#081c12' }}>
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#c8922a' }}>
            Din 2009
          </p>
          <h1 className="text-2xl md:text-3xl font-medium text-white mb-4">
            Portofoliu Neofort IMO
          </h1>
          <p className="text-sm max-w-xl mx-auto mb-6" style={{ color: '#9ca3af' }}>
            85+ ansambluri rezidențiale livrate în București. Fiecare proiect reflectă angajamentul nostru față de calitate, locație și finisaje superioare.
          </p>
          <div className="inline-flex gap-8 text-center">
            {[
              { val: '85+', lbl: 'Ansambluri livrate' },
              { val: '17 ani', lbl: 'Experiență' },
              { val: '4.000+', lbl: 'Familii' },
            ].map(s => (
              <div key={s.lbl}>
                <div className="text-xl font-semibold" style={{ color: '#c8922a' }}>{s.val}</div>
                <div className="text-xs" style={{ color: '#9ca3af' }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ANSAMBLURI ACTIVE */}
        <section className="py-12 px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Ansambluri active la vânzare</h2>
            <p className="text-sm text-gray-500 mb-6">12 ansambluri disponibile în prezent.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ANSAMBLURI_ACTIVE.map(a => (
                <Link key={a.slug} href={`/ansamblu-rezidential/${a.slug}`}
                  className="p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all text-xs">
                  <div className="font-medium text-gray-900 mb-0.5">{a.nume}</div>
                  <div className="text-gray-500">{a.zona} · {a.sector}</div>
                  <div className="mt-1 font-medium" style={{ color: '#2d7a3a' }}>
                    De la {formatPret(a.pretDeLa)}€
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PORTOFOLIU VANDUT */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Ansambluri finalizate și vândute</h2>
            <p className="text-sm text-gray-500 mb-8">O selecție din proiectele livrate de Neofort IMO de-a lungul anilor.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ANSAMBLURI_PORTOFOLIU.map(a => (
                <Link key={a.slug} href={`/portofoliu/${a.slug}`}
                  className="group border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
                  <div className="bg-gray-50 flex items-center justify-center px-4 py-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-200 mb-1">#{a.numar}</div>
                      <div className="text-xs font-medium text-gray-500">{a.etaje}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        Vândut
                      </span>
                      <span className="text-[10px] text-gray-400">{a.sector}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                      {a.nume}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{a.zona}</p>
                    <div className="flex flex-wrap gap-1">
                      {a.tipuri.slice(0, 3).map(t => (
                        <span key={t} className="text-[9px] px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-gray-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 px-6 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">Interesați de un ansamblu activ sau vreți să aflați mai multe?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/ansambluri-rezidentiale"
              className="px-6 py-3 rounded-xl text-sm font-medium text-white"
              style={{ background: '#2d7a3a' }}>
              Ansambluri disponibile
            </Link>
            <Link href="/contact"
              className="px-6 py-3 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50">
              Contactează-ne
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
