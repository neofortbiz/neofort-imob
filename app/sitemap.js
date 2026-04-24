import { ANSAMBLURI } from '@/data/ansambluri'

const BASE = 'https://neofort-imob.vercel.app'

export default function sitemap() {
  const staticPages = [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/ansambluri-rezidentiale`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/harta-ansambluri`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portofoliu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/echipa`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/despre-noi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const ansambluriPages = ANSAMBLURI.map(a => ({
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const zonePages = [
    'titan-pallady', 'piata-muncii', 'militari',
    'herastrau-aviatiei', 'colentina-fundeni', 'unirii-dristor',
  ].map(slug => ({
    url: `${BASE}/zona/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...ansambluriPages, ...zonePages]
}
