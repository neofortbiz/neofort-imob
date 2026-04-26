import { ANSAMBLURI, ANSAMBLURI_ACTIVE } from '@/data/ansambluri'

const BASE = 'https://neofort-imob.vercel.app'

export default function sitemap() {
  const staticPages = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/ansambluri-rezidentiale`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/zona`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/harta-ansambluri`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/portofoliu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/promotii`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/echipa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/despre-noi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Toate ansamblurile active - prioritate maxima
  const ansambluriActive = ANSAMBLURI_ACTIVE.map(a => ({
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  }))

  // Zone generate dinamic din date - nu hardcodate
  const zoneSluguri = [...new Set(
    ANSAMBLURI_ACTIVE.flatMap(a => a.zone || [])
  )]
  const zonePages = zoneSluguri.map(slug => ({
    url: `${BASE}/zona/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [...staticPages, ...ansambluriActive, ...zonePages]
}
