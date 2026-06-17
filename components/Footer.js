import Link from 'next/link'
import FormularCalificat from '@/components/FormularCalificat'
import { ANSAMBLURI_LITE } from '@/data/ansambluri'

const TEL = '0758090904'
const TEL_DISPLAY = '0758 090 904'
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
        {/* GRID 4 COLOANE — desktop: 5 col, mobile: 2x2 + brand full width */}
        <div className="grid grid-cols-2 md:grid-cols-[1.8fr_1fr_1fr_1fr_1.2fr] gap-x-3 gap-y-6 mb-8">

          {/* COL 1 — BRAND */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#aaa' }}>
              Dezvoltator și agenție imobiliară din București. Din 2009 livrăm ansambluri rezidențiale de calitate în toate sectoarele capitalei.
            </p>
            {/* Social */}
            <div className="flex gap-2 mb-5">
              <a href="https://www.facebook.com/profile.php?id=100063782524105" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>f</a>
              <a href="https://www.instagram.com/neofortimobiliare/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>in</a>
              <a href="https://www.youtube.com/user/neofortbizimobiliare" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>yt</a>
              <a href="https://x.com/NeofortIMO" target="_blank" rel="noopener noreferrer" aria-label="X"
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>x</a>
              <a href="https://maps.app.goo.gl/QMGwUsh9Rc9cjwWr7" target="_blank" rel="noopener noreferrer" aria-label="Google Maps"
                className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #555', color: '#aaa' }}>gm</a>
            </div>
            {/* Tipuri apartamente */}
            <div>
              <p className="text-[10px] uppercase tracking-wider mb-2 font-medium" style={{ color: '#666' }}>Tipuri</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {[
                  { href: '/apartamente/garsoniere-bucuresti', label: 'Garsoniere' },
                  { href: '/apartamente/apartamente-2-camere-bucuresti', label: '2 camere' },
                  { href: '/apartamente/apartamente-3-camere-bucuresti', label: '3 camere' },
                  { href: '/apartamente/apartamente-4-camere-bucuresti', label: '4 camere' },
                ].map(l => (
                  <Link key={l.href} href={l.href} className="text-[11px] hover:text-gray-300 transition-colors" style={{ color: '#bbb' }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* COL 2 — ANSAMBLURI */}
          <div className="pl-2 md:pl-0">
            <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#e0e0e0' }}>Ansambluri</h3>
            {[
              { href: '/ansambluri-rezidentiale', label: 'La vânzare' },
              { href: '/ansambluri-rezidentiale?status=constructie', label: 'În construcție' },
              { href: '/portofoliu', label: 'Portofoliu' },
              { href: '/ansambluri-rezidentiale?status=promotie', label: 'Promoție' },
              { href: '/harta-ansambluri', label: 'Hartă' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="block text-xs py-1 mb-0.5 hover:text-gray-300 transition-colors" style={{ color: '#bbb' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* COL 3 — ZONE */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#e0e0e0' }}>Zone</h3>
            {[
  ...(() => {
                const count = {}
                ANSAMBLURI_LITE.forEach(a =>
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
              <Link key={l.href} href={l.href} className="block text-xs py-1 mb-0.5 hover:text-gray-300 transition-colors" style={{ color: '#bbb' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* COL 4 — COMPANIE */}
          <div className="pl-2 md:pl-0">
            <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#e0e0e0' }}>Companie</h3>
            {[
              { href: '/despre-noi', label: 'Despre noi' },
              { href: '/echipa', label: 'Echipă' },
              { href: '/blog', label: 'Blog' },
              { href: '/contact', label: 'Contact' },
              { href: '/gdpr', label: 'Politica GDPR' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="block text-xs py-1 mb-0.5 hover:text-gray-300 transition-colors" style={{ color: '#bbb' }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* COL 5 — DATE FIRMA — acelasi font/spatiere ca celelalte coloane */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: '#e0e0e0' }}>Neofort IMO SRL</h3>
            {[
              'CUI: RO53874087',
              'J40/8972/2026',
              'Str. Aman Pictor nr. 11',
              'Sector 1, Buc. 010776',
              'L–V 10:00–18:00',
            ].map(line => (
              line.startsWith('0') ?
                <a key={line} href={`tel:${line.replace(/\s/g, '')}`} className="block text-xs py-1 mb-0.5 hover:text-white transition-colors" style={{ color: '#bbb' }}>{line}</a> :
                <div key={line} className="block text-xs py-1 mb-0.5" style={{ color: '#bbb' }}>{line}</div>
            ))}
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
