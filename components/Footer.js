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
            <p className="text-xs leading-relaxed mb-4" style={{ color: '#666' }}>
              Dezvoltator și agenție imobiliară din București. Din 2009 livrăm ansambluri rezidențiale de calitate în toate sectoarele capitalei.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {['f', 'in', 'yt', 'ig'].map(s => (
                <div key={s} className="w-7 h-7 rounded-md flex items-center justify-center text-xs cursor-pointer hover:border-gray-500 transition-colors" style={{ border: '0.5px solid #333', color: '#666' }}>
                  {s}
                </div>
              ))}
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
              <Link key={l.href} href={l.href} className="block text-xs mb-1.5 hover:text-gray-300 transition-colors" style={{ color: '#777' }}>
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
              <Link key={l.href} href={l.href} className="block text-xs mb-1.5 hover:text-gray-300 transition-colors" style={{ color: '#777' }}>
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
              <Link key={l.href} href={l.href} className="block text-xs mb-1.5 hover:text-gray-300 transition-colors" style={{ color: '#777' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="flex justify-center gap-4 pb-6" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
          <a href="https://www.facebook.com/profile.php?id=100063782524105" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity" aria-label="Facebook Neofort IMO">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#4267B2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.instagram.com/neofortimobiliare/" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity" aria-label="Instagram Neofort IMO">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="url(#ig)">
              <defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/><stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/user/neofortbizimobiliare" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity" aria-label="YouTube Neofort IMO">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
          </a>
          <a href="https://x.com/NeofortIMO" target="_blank" rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity" aria-label="X / Twitter Neofort IMO">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-5 gap-2" style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
          <p className="text-[10px]" style={{ color: '#444' }}>
            © 2026 Neofort IMO® — Marcă înregistrată · București, România
          </p>
          <div className="flex gap-4">
            {[
              { href: '/gdpr', label: 'GDPR' },
              { href: '/cookies', label: 'Cookies' },
              { href: '/termeni', label: 'Termeni' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-[10px] hover:text-gray-400 transition-colors" style={{ color: '#444' }}>
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
