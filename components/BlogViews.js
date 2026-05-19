'use client'
import { useState, useEffect } from 'react'

// Afiseaza si incrementeaza vizualizarile pe pagina articolului
export default function BlogViews({ slug }) {
  const [views, setViews] = useState(null)

  useEffect(() => {
    // POST — incrementeaza la intrarea pe pagina
    fetch(`/api/views?slug=${slug}`, { method: 'POST' })
      .then(r => r.json())
      .then(d => setViews(d.views))
      .catch(() => {})
  }, [slug])

  if (!views) return null
  return (
    <>
      <span>·</span>
      <span>{views.toLocaleString('ro-RO')} {views === 1 ? 'vizualizare' : 'vizualizări'}</span>
    </>
  )
}
