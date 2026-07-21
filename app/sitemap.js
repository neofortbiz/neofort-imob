import { ANSAMBLURI_ACTIVE } from '@/data/ansambluri'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'
import { ARTICOLE_LIST } from '@/data/blog'
import { DATA_ANSAMBLURI } from '@/data/contact-map'

// lastmod REAL: data ultimei modificari efective a datelor de ansambluri
// (generata la build prin hash de continut). Inainte era `new Date()`, ceea ce
// declara la fiecare deploy ca totul s-a schimbat "azi" — semnal pe care Google
// il invata sa-l ignore daca e inexact.
const DATA_DATE = new Date(DATA_ANSAMBLURI)
const BUILD_REF = new Date()
const LAST_WEEK = new Date(BUILD_REF - 7 * 24 * 60 * 60 * 1000)
// Listarea de blog: data celui mai recent articol (nu data ansamblurilor)
const DATA_BLOG = ARTICOLE_LIST.length
  ? new Date(ARTICOLE_LIST.map(a => a.dataISO).sort().reverse()[0])
  : DATA_DATE

const BASE = 'https://www.neofort.ro'

export default function sitemap() {
  // Pagini statice cu date fixe (continut rar schimbat)
  const staticPages = [
    { url: `${BASE}/`, lastModified: DATA_DATE, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/ansambluri-rezidentiale`, lastModified: DATA_DATE, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE}/zona`, lastModified: DATA_DATE, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/harta-ansambluri`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/portofoliu`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE}/blog`, lastModified: DATA_BLOG, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${BASE}/promotii`, lastModified: DATA_DATE, changeFrequency: 'weekly', priority: 0.80 },
    { url: `${BASE}/echipa`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.50 },
    { url: `${BASE}/despre-noi`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE}/contact`, lastModified: LAST_WEEK, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE}/gdpr`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.20 },
    { url: `${BASE}/cookies`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.20 },
    { url: `${BASE}/termeni`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.20 },
  ]

  // Calculator credit
  const calculatorPage = [{
    url: `${BASE}/calculator-credit`,
    lastModified: DATA_DATE,
    changeFrequency: 'monthly',
    priority: 0.85,
  }]

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
    lastModified: DATA_DATE,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  // Ansambluri active - prioritate maxima, se actualizeaza frecvent
  const ansambluriActive = ANSAMBLURI_ACTIVE.map(a => ({
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    lastModified: DATA_DATE,
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

  // Portofoliu (vandute) - servite canonic la /ansamblu-rezidential/<slug>.
  // /portofoliu/<slug> redirectioneaza 301 catre acestea, deci nu se mai listeaza.
  const portofoliuCanonic = TOATE_PORTOFOLIU.map(a => ({
    url: `${BASE}/ansamblu-rezidential/${a.slug}`,
    lastModified: new Date('2026-01-01'),
    changeFrequency: 'never',
    priority: 0.6,
  }))

  return [...staticPages, ...calculatorPage, ...tipPages, ...ansambluriActive, ...zonePages, ...blogPages, ...portofoliuCanonic]
}
