import Link from 'next/link'
import FormularCalificat from '@/components/FormularCalificat'
import { ANSAMBLURI_ACTIVE } from '@/data/ansambluri'

const TEL = '0743250029'
const TEL_DISPLAY = '0743 250 029'
const WA_LINK = `https://wa.me/40${TEL.substring(1)}`

export default function Footer() {
  return (
    <>
      {/* FORMULAR CALIFICAT */}
      <section style={{ background: '#081c12' }} className="py-12 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl font-medium text-white mb-2">
            Solicită o ofertă <span style={{ color: '#e8b44e' }}>personalizată</span>
          </h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Completează formularul și un consultant Neofort IMO te contactează în cel mult 2 ore cu o ofertă adaptată nevoilor tale.
          </p>
          <FormularCalificat />
        </div>
      </section>

      <footer style={{ background: '#050f09' }}>
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        {/* GRID 4 COLOANE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* COL 1 — BRAND */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <div style={{ background: 'white', borderRadius: 8, padding: '6px 10px', display: 'inline-block' }}><img src="/logo.avif" alt="Neofort IMO" className="h-12 w-auto" /></div>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#aaa' }}>
              Dezvoltator și agenție imobiliară din București. Din 2009 livrăm ansambluri rezidențiale de calitate în toate sectoarele capitalei.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              <a href="https://www.facebook.com/profile.php?id=100063782524105" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>f</a>
              <a href="https://www.instagram.com/neofortimobiliare/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>in</a>
              <a href="https://www.youtube.com/user/neofortbizimobiliare" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>yt</a>
              <a href="https://x.com/NeofortIMO" target="_blank" rel="noopener noreferrer" aria-label="X"
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>x</a>
            </div>
          </div>

          {/* COL 2 — ANSAMBLURI */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#e0e0e0' }}>Ansambluri</h4>
            {[
              { href: '/ansambluri-rezidentiale', label: 'La vânzare' },
              { href: '/ansambluri-rezidentiale?status=constructie', label: 'În construcție' },
              { href: '/portofoliu', label: 'Portofoliu' },
              { href: '/ansambluri-rezidentiale?status=promotie', label: 'Promoție' },
              { href: '/harta-ansambluri', label: 'Hartă' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="block text-xs mb-1.5 hover:text-gray-300 transition-colors" style={{ color: '#bbb' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* COL 3 — ZONE */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#e0e0e0' }}>Zone</h4>
            {[
  ...(() => {
                // Zone dinamice din date — top 5 dupa numar ansambluri, fara sectoare
                const count = {}
                ANSAMBLURI_ACTIVE.forEach(a =>
                  (a.zone || [])
                    .filter(z => !z.startsWith('sector-'))
                    .forEach(z => { count[z] = (count[z] || 0) + 1 })
                )
                const label = z => z
                  .split('-')
                  .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                  .join('-')
                  .replace('Mosilor', 'Moșilor')
                  .replace('Eminescu', 'Eminescu')
                  .replace('Viitorului', 'Viitorului')
                  .replace('Militari', 'Militari')
                  .replace('Piata', 'Piața')
                  .replace('Muncii', 'Muncii')
                  .replace('Tepes', 'Țepeș')
                  .replace('Voda', 'Vodă')
                  .replace('Pallady', 'Pallady')
                return Object.entries(count)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([z]) => ({ href: `/zona/${z}`, label: label(z) }))
              })(),
            ].map(l => (
              <Link key={l.href} href={l.href} className="block text-xs mb-1.5 hover:text-gray-300 transition-colors" style={{ color: '#bbb' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* COL 4 — COMPANIE */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#e0e0e0' }}>Companie</h4>
            {[
              { href: '/despre-noi', label: 'Despre noi' },
              { href: '/echipa', label: 'Echipă' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
              { href: '/gdpr', label: 'Politica GDPR' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="block text-xs mb-1.5 hover:text-gray-300 transition-colors" style={{ color: '#bbb' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* DATE FIRMA */}
        <div className="py-5 mb-2" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px]" style={{ color: '#888' }}>
            <span>Neofort IMO SRL</span>
            <span>CUI: RO53874087</span>
            <span>Nr. Reg. Com.: J40/8972/2026</span>
            <span>Str. Theodor Aman Pictor nr. 11, Sector 1, București 010776</span>
            <span>Program: L–V 10:00–18:00</span>
            <a href="https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7" target="_blank" rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors">Google Maps ↗</a>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-2">
          <p className="text-[10px]" style={{ color: '#888' }}>
            © 2026 Neofort IMO® — Marcă înregistrată · București, România
          </p>
          <div className="flex gap-4">
            {[
              { href: '/gdpr', label: 'GDPR' },
              { href: '/cookies', label: 'Cookies' },
              { href: '/termeni', label: 'Termeni' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-[10px] hover:text-gray-400 transition-colors" style={{ color: '#888' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>


    </footer>
    </>
  )
}
