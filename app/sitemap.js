import { ANSAMBLURI_ACTIVE } from '@/data/ansambluri'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'
import { ARTICOLE_LIST } from '@/data/blog'

const TODAY = new Date()
const LAST_WEEK = new Date(TODAY - 7 * 24 * 60 * 60 * 1000)

const BASE = 'https://www.neofort.ro'

export default function sitemap() {
  // Pagini statice cu date fixe (continut rar schimbat)
  const staticPages = [
    { url: `${BASE}/`, lastModified: TODAY, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/ansambluri-rezidentiale`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/zona`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/harta-ansambluri`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/portofoliu`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE}/blog`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE}/promotii`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.80 },
    { url: `${BASE}/echipa`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.50 },
    { url: `${BASE}/despre-noi`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE}/contact`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE}/gdpr`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.20 },
    { url: `${BASE}/cookies`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.20 },
    { url: `${BASE}/termeni`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.20 },
  ]

  // Pagini tip apartamente — SEO pentru query-uri de tip proprietate
  const TIP_SLUGURI = [
    'garsoniere-bucuresti',
    'apartamente-2-camere-bucuresti',
    'apartamente-3-camere-bucuresti',
    'apartamente-4-camere-bucuresti',
    'apartamente-noi-cu-metrou-bucuresti',
    'apartamente-noi-finalizate-bucuresti',
  ]
  const tipPages = TIP_SLUGURI.map(tip => ({
    url: `${BASE}/apartamente/${tip}`,
    lastModified: TODAY,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Ansambluri active - prioritate maxima, se actualizeaza frecvent
  const ansambluriActive = ANSAMBLURI_ACTIVE.map(a => ({
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    lastModified: TODAY,
    changeFrequency: 'weekly',
    priority: 0.95,
  }))

  // Zone generate dinamic din date
  const zoneSluguri = [...new Set(
    ANSAMBLURI_ACTIVE.flatMap(a => a.zone || [])
  )]
  const zonePages = zoneSluguri.map(slug => ({
    url: `${BASE}/zona/${slug}`,
    lastModified: LAST_WEEK,
    changeFrequency: 'monthly',
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
    lastModified: new Date('2026-01-01'),
    changeFrequency: 'never',
    priority: 0.6,
  }))

  return [...staticPages, ...tipPages, ...ansambluriActive, ...zonePages, ...blogPages, ...portofoliuPages]
}
