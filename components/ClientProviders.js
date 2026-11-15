'use client'
import WAFloat from './WAFloat'
import MobileBar from './MobileBar'
import CookieBanner from './CookieBanner'
import WebMCP from './WebMCP'

export default function ClientProviders() {
  return (
    <>
      <WAFloat />
      <MobileBar />
      <CookieBanner />
      <WebMCP />
    </>
  )
}
