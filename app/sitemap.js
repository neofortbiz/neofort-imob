import { ANSAMBLURI_ACTIVE } from '@/data/ansambluri'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'
import { ARTICOLE_LIST } from '@/data/blog'

const BASE = 'https://www.neofort.ro'

export default function sitemap() {
  // Pagini statice cu date fixe (continut rar schimbat)
  const staticPages = [
    { url: `${BASE}/`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/ansambluri-rezidentiale`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/zona`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/harta-ansambluri`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/portofoliu`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE}/blog`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE}/promotii`, lastModified: new Date('2026-05-11'), changeFrequency: 'weekly', priority: 0.80 },
    { url: `${BASE}/echipa`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.50 },
    { url: `${BASE}/despre-noi`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE}/contact`, lastModified: new Date('2026-05-11'), changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE}/gdpr`, lastModified: new Date('2026-05-11'), changeFrequency: 'yearly', priority: 0.20 },
    { url: `${BASE}/cookies`, lastModified: new Date('2026-05-11'), changeFrequency: 'yearly', priority: 0.20 },
    { url: `${BASE}/termeni`, lastModified: new Date('2026-05-11'), changeFrequency: 'yearly', priority: 0.20 },
  ]

  // Ansambluri active - prioritate maxima, se actualizeaza frecvent
  const ansambluriActive = ANSAMBLURI_ACTIVE.map(a => ({
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    lastModified: new Date('2026-05-11'),
    changeFrequency: 'weekly',
    priority: 0.95,
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
