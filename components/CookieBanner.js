'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setVisible(true)
    } else if (consent === 'accepted') {
      grantConsent()
    }
  }, [])

  function grantConsent() {
    if (typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'consent_update',
      analytics_storage: 'granted',
      ad_storage: 'denied',
    })
    // Trigger pentru GTM
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
    })
  }

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    grantConsent()
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4"
      style={{ background: 'rgba(8,16,12,0.95)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-white text-sm leading-relaxed">
            Folosim cookie-uri de analiză (Google Analytics) pentru a înțelege cum este utilizat site-ul și a îmbunătăți experiența. Puteți refuza fără nicio consecință.{' '}
            <a href="/cookies" className="underline" style={{ color: '#e8b44e' }}>Politica cookies</a>
            {' · '}
            <a href="/gdpr" className="underline" style={{ color: '#e8b44e' }}>GDPR</a>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button onClick={decline}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)' }}>
            Refuz
          </button>
          <button onClick={accept}
            className="px-5 py-2 text-sm font-medium rounded-lg text-white transition-colors"
            style={{ background: '#2d7a3a' }}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
