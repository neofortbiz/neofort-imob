import Link from 'next/link'

const TEL = '0743250029'
const TEL_DISPLAY = '0743 250 029'
const WA_LINK = `https://wa.me/40${TEL.substring(1)}`

export default function Footer() {
  return (
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
              { href: '/zona/titan-pallady', label: 'Titan-Pallady' },
              { href: '/zona/piata-muncii', label: 'Piața Muncii' },
              { href: '/zona/militari', label: 'Militari' },
              { href: '/zona/herastrau-aviatiei', label: 'Herăstrău' },
              { href: '/zona/colentina-fundeni', label: 'Colentina' },
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

      {/* MOBILE STICKY BAR */}
      <div className="md:hidden sticky bottom-0 z-50" style={{ background: '#ffffff', borderTop: '2px solid #c8922a' }}>
        <div className="flex gap-2 p-3">
          <a
            href={`tel:${TEL}`}
            className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-white"
            style={{ background: '#2d7a3a' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.8 19.79 19.79 0 01.86 2.18 2 2 0 012.83 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.98-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            {TEL_DISPLAY}
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-white"
            style={{ background: '#25a244' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  )
}
