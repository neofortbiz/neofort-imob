'use client'
import { useEffect } from 'react'

// Marcheaza accesul la o pagina de ansamblu in lista globala "recent accesate"
// (Redis ZSET recent:ansambluri). Nu afiseaza nimic — nu randeaza niciun element.
//
// De ce e nevoie: pana acum ordinea de pe homepage se marca DOAR la click pe card
// (localStorage), deci intrarile directe din Google/social nu erau inregistrate.
//
// Botii sunt filtrati server-side, in app/api/views/route.js.
export default function MarcheazaAcces({ slug }) {
  useEffect(() => {
    if (!slug) return
    fetch(`/api/views?slug=${encodeURIComponent(slug)}&scope=ansambluri`, { method: 'POST' })
      .catch(() => {})
  }, [slug])

  return null
}
