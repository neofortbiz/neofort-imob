'use client'
import { useState, useEffect } from 'react'

export default function BlogViews({ slug }) {
  const [views, setViews] = useState(null)

  useEffect(() => {
    try {
      const key = 'neofort_views_' + slug
      const current = parseInt(localStorage.getItem(key) || '0')
      const newVal = current + 1
      localStorage.setItem(key, newVal)
      setViews(newVal)
    } catch {}
  }, [slug])

  if (!views) return null
  return (
    <>
      <span>·</span>
      <span>{views} {views === 1 ? 'vizualizare' : 'vizualizări'}</span>
    </>
  )
}
