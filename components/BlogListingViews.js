'use client'
import { useState, useEffect, useRef } from 'react'

// Cache global in memorie — un singur fetch batch per pagina
// Toate instantele BlogListingViews de pe pagina trimit un singur request
const cache = { data: null, pending: null, callbacks: [] }

function fetchBatch(slugs) {
  if (cache.data) return Promise.resolve(cache.data)

  if (!cache.pending) {
    cache.pending = fetch(`/api/views?slugs=${slugs.join(',')}`)
      .then(r => r.json())
      .then(data => {
        cache.data = data
        cache.pending = null
        cache.callbacks.forEach(cb => cb(data))
        cache.callbacks = []
        return data
      })
      .catch(() => {
        cache.pending = null
        return {}
      })
  }

  return new Promise(resolve => {
    cache.callbacks.push(resolve)
  })
}

// Colecteaza toate slug-urile din pagina intr-un singur batch
let batchSlugs = new Set()
let batchTimer = null

function scheduleBatch(slug, onResult) {
  batchSlugs.add(slug)
  if (batchTimer) clearTimeout(batchTimer)
  batchTimer = setTimeout(() => {
    const slugs = [...batchSlugs]
    batchSlugs = new Set()
    batchTimer = null
    fetchBatch(slugs).then(data => onResult(data))
  }, 50) // asteapta 50ms ca toate componentele sa se monteze
}

export default function BlogListingViews({ slug, inline }) {
  const [views, setViews] = useState(null)

  useEffect(() => {
    if (cache.data) {
      const v = cache.data[slug] || 0
      if (v > 0) setViews(v)
      return
    }
    scheduleBatch(slug, (data) => {
      const v = data[slug] || 0
      if (v > 0) setViews(v)
    })
  }, [slug])

  if (!views) return null

  if (inline) {
    return (
      <span className="inline-flex items-center gap-1">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        {views.toLocaleString('ro-RO')}
      </span>
    )
  }

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
