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


    </footer>
  )
}
