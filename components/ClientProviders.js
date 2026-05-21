'use client'
import WAFloat from './WAFloat'
import MobileBar from './MobileBar'
import CookieBanner from './CookieBanner'

export default function ClientProviders() {
  return (
    <>
      <WAFloat />
      <MobileBar />
      <CookieBanner />
    </>
  )
}
