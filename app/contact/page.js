import Header from '@/components/Header'
import Footer from '@/components/Footer'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  title: 'Contact Neofort IMO — Program & Adresă București',
  description: 'Contactează Neofort IMO: Str. Theodor Aman Pictor nr. 11, Sector 1, București. Program L-V 10:00-18:00. Tel: 0758 090 904.',
  alternates: { canonical: `${BASE}/contact` },
}

export default function ContactPage() {
  return (
    <>
      <Header activePath="/contact" />
      <main>

        <section className="py-12 px-6 text-center border-b border-gray-100">
          <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: '#2d7a3a' }}>Contact</p>
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-3">Vino la noi sau sună acum</h1>
          <p className="text-sm text-gray-500">Suntem disponibili luni–vineri între 10:00 și 18:00.</p>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* DATE CONTACT */}
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-4">Date de contact</h2>
                <div className="space-y-3 text-sm">
                  {[
                    { lbl: 'Adresă', val: 'Str. Theodor Aman Pictor nr. 11\nSector 1, București 010776' },
                    { lbl: 'Telefon', val: '0758 090 904' },
                    { lbl: 'Email', val: 'info@neofort-biz.ro' },
                    { lbl: 'Email lead-uri', val: 'lead.neo@neofort-biz.ro' },
                  ].map(r => (
                    <div key={r.lbl} className="flex gap-3 py-2.5 border-b border-gray-50">
                      <span className="text-gray-400 w-28 flex-shrink-0 text-xs">{r.lbl}</span>
                      <span className="text-gray-800 text-xs whitespace-pre-line">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-4">Program</h2>
                <div className="space-y-1.5 text-xs">
                  {[
                    { zi: 'Luni – Vineri', ore: '10:00 – 18:00', deschis: true },
                    { zi: 'Sâmbătă', ore: 'Închis', deschis: false },
                    { zi: 'Duminică', ore: 'Închis', deschis: false },
                  ].map(p => (
                    <div key={p.zi} className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-600">{p.zi}</span>
                      <span className={p.deschis ? 'font-medium text-gray-900' : 'text-gray-400'}>{p.ore}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a href="tel:+40758090904"
                  className="flex-1 py-3 rounded-xl text-xs font-medium text-center text-white"
                  style={{ background: '#2d7a3a' }}>
                  Sună acum
                </a>
                <a href="https://wa.me/40758090904?text=Bun%C4%83%20ziua!%20Sunt%20interesat%20de%20apartamentele%20Neofort%20IMO."
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl text-xs font-medium text-center text-white"
                  style={{ background: '#25a244' }}>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* HARTA */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Locație birou</h2>
              <div className="rounded-xl overflow-hidden border border-gray-100" style={{ height: 320 }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.5!2d26.0935!3d44.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI2JzUwLjYiTiAyNsKwMDUnMzYuNiJF!5e0!3m2!1sro!2sro!4v1"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Locație birou Neofort IMO"
                />
              </div>
              <a href="https://share.google/VDMVczJMz2QNsTEjc"
                target="_blank" rel="noopener noreferrer"
                className="block mt-3 text-xs text-center py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                Deschide în Google Maps →
              </a>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
