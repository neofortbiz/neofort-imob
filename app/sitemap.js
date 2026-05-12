import { ANSAMBLURI_ACTIVE } from '@/data/ansambluri'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'
import { ARTICOLE_LIST } from '@/data/blog'

const BASE = 'https://www.neofort.ro'

export default function sitemap() {
  // Pagini statice cu date fixe (continut rar schimbat)
  const staticPages = [
    { url: `${BASE}/`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/ansambluri-rezidentiale`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/zona`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/harta-ansambluri`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/portofoliu`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/promotii`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/echipa`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/despre-noi`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Ansambluri active - prioritate maxima, se actualizeaza frecvent
  const ansambluriActive = ANSAMBLURI_ACTIVE.map(a => ({
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    lastModified: new Date('2026-05-11'),
    changeFrequency: 'weekly',
    priority: 1.0,
  }))

  // Zone generate dinamic din date
  const zoneSluguri = [...new Set(
    ANSAMBLURI_ACTIVE.flatMap(a => a.zone || [])
  )]
  const zonePages = zoneSluguri.map(slug => ({
    url: `${BASE}/zona/${slug}`,
    lastModified: new Date('2026-05-11'),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  // Blog - generat dinamic din ARTICOLE_LIST (sursa unica in data/blog.js)
  // La adaugarea unui articol nou, sitemap-ul se actualizeaza automat
  const blogPages = ARTICOLE_LIST.map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.dataISO),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Portofoliu - TOATE_PORTOFOLIU include ambele arrays (72 total)
  // Continut permanent
  const portofoliuPages = TOATE_PORTOFOLIU.map(a => ({
    url: `${BASE}/portofoliu/${a.slug}`,
    lastModified: new Date('2026-05-11'),
    changeFrequency: 'never',
    priority: 0.6,
  }))

  return [...staticPages, ...ansambluriActive, ...zonePages, ...blogPages, ...portofoliuPages]
}
