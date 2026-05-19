'use client'
import { useState, useEffect } from 'react'

// Badge vizualizari pe cardurile din listing blog — citeste din Redis (global)
export default function BlogListingViews({ slug }) {
  const [views, setViews] = useState(null)

  useEffect(() => {
    // GET — doar citeste, nu incrementeaza
    fetch(`/api/views?slug=${slug}`)
      .then(r => r.json())
      .then(d => { if (d.views > 0) setViews(d.views) })
      .catch(() => {})
  }, [slug])

  if (!views) return null

  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white px-2 py-0.5 rounded-full"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      {views.toLocaleString('ro-RO')}
    </span>
  )
}
