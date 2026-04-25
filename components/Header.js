'use client'
import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Acasă' },
  { href: '/ansambluri-rezidentiale', label: 'Ansambluri' },
  { href: '/zona', label: 'Zone' },
  { href: '/harta-ansambluri', label: 'Hartă' },
  { href: '/portofoliu', label: 'Portofoliu' },
  { href: '/blog', label: 'Blog' },
  { href: '/echipa', label: 'Echipă' },
  { href: '/contact', label: 'Contact' },
]

const TEL = '0743250029'
const TEL_DISPLAY = '0743 250 029'
const WA_LINK = `https://wa.me/40${TEL.substring(1)}`

export default function Header({ activePath = '/' }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">

      {/* ===== DESKTOP — un singur rand: logo | nav | contact ===== */}
      <div className="hidden md:flex items-center max-w-7xl mx-auto px-6 h-16 gap-6">

        {/* LOGO */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/logo.avif"
            alt="Neofort IMO — Imobiliare București"
            className="h-12 w-auto"
          />
        </Link>

        {/* NAV — centrat, ocupa spatiul ramas */}
        <nav className="flex-1 flex items-center justify-center overflow-x-auto nav-scroll">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs px-3 py-2 whitespace-nowrap border-b-2 transition-colors ${
                activePath === link.href
                  ? 'text-gray-900 border-[#2d7a3a] font-medium'
                  : 'text-gray-500 border-transparent hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CONTACT ICONS */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href={`tel:${TEL}`}
            className="w-9 h-9 rounded-lg border border-blue-100 bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
            title={`Sună la ${TEL_DISPLAY}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.8 19.79 19.79 0 01.86 2.18 2 2 0 012.83 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.98-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-green-100 bg-green-50 flex items-center justify-center hover:bg-green-100 transition-colors"
            title="WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25a244">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <a href="mailto:lead.neo@neofort-biz.ro"
            className="w-9 h-9 rounded-lg border border-yellow-100 bg-yellow-50 flex items-center justify-center hover:bg-yellow-100 transition-colors"
            title="Trimite email">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8922a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ===== MOBIL — layout existent nemodificat ===== */}
      <div className="md:hidden">
        <div className="px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/logo.avif"
              alt="Neofort IMO — Imobiliare București"
              className="h-14 w-auto"
            />
          </Link>

          {/* CONTACT + HAMBURGER */}
          <div className="flex items-center gap-2">
            <a href={`tel:${TEL}`}
              className="w-9 h-9 rounded-lg border border-blue-100 bg-blue-50 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.9 10.8 19.79 19.79 0 01.86 2.18 2 2 0 012.83 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.98-.97a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </a>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg border border-green-100 bg-green-50 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25a244">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="mailto:lead.neo@neofort-biz.ro"
              className="w-9 h-9 rounded-lg border border-yellow-100 bg-yellow-50 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8922a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
            <button
              className="ml-1 w-9 h-9 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Meniu">
              {menuOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* MENIU MOBIL DROPDOWN */}
        {menuOpen && (
          <div className="border-t border-gray-100 bg-white">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-6 py-3 text-sm text-gray-700 border-b border-gray-50 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

    </header>
  )
}
