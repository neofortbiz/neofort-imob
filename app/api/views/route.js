import { createClient } from 'redis'

let client = null

async function getClient() {
  if (!client) {
    client = createClient({ url: process.env.REDIS_URL })
    client.on('error', () => { client = null })
    await client.connect()
  }
  return client
}

// GET /api/views?slug=xxx — un singur slug
// GET /api/views?slugs=slug1,slug2,... — batch pentru mai multe sluguri
// POST /api/views?slug=xxx — incrementeaza si returneaza
export async function GET(request) {
  const { searchParams } = new URL(request.url)

  // Lista globala "recent accesate" — ZSET, cel mai recent primul.
  // GET /api/views?recent=blog  |  GET /api/views?recent=ansambluri
  const recentScope = searchParams.get('recent')
  if (recentScope) {
    if (recentScope !== 'blog' && recentScope !== 'ansambluri') {
      return Response.json({ recent: [] })
    }
    const limit = Math.min(parseInt(searchParams.get('limit') || '12'), 50)
    try {
      const redis = await getClient()
      const slugs = await redis.zRange(`recent:${recentScope}`, 0, limit - 1, { REV: true })
      return Response.json({ recent: slugs || [] })
    } catch {
      return Response.json({ recent: [] })
    }
  }

  // Batch request
  const slugsParam = searchParams.get('slugs')
  if (slugsParam) {
    const slugs = slugsParam.split(',').filter(Boolean).slice(0, 50) // max 50
    try {
      const redis = await getClient()
      const keys = slugs.map(s => `views:${s}`)
      const values = await redis.mGet(keys)
      const result = {}
      slugs.forEach((s, i) => {
        result[s] = parseInt(values[i] || '0')
      })
      return Response.json(result)
    } catch {
      const result = {}
      slugs.forEach(s => { result[s] = 0 })
      return Response.json(result)
    }
  }

  // Single slug
  const slug = searchParams.get('slug')
  if (!slug) return Response.json({ views: 0 })

  try {
    const redis = await getClient()
    const views = await redis.get(`views:${slug}`)
    return Response.json({ views: parseInt(views || '0') })
  } catch {
    return Response.json({ views: 0 })
  }
}

// Boti/crawleri: nu incrementeaza contorul si nu ating Redis.
// Motiv: crawlerii care executa JS (Google, Bing, boti AI) declansau BlogViews,
// consumand invocari + CPU + scrieri Redis si umfland fals statisticile.
// NU blocheaza si NU restrictioneaza crawl-ul in niciun fel — doar nu ii numara.
const BOT_UA = /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|headless|lighthouse|pagespeed|gtmetrix|pingdom|monitor|preview|fetch|curl|wget|python-requests|axios|node-fetch|go-http|java\/|okhttp|scrapy|ahrefs|semrush|dataforseo|mj12|dotbot|petal|yandex|baidu|sogou|bytespider|gptbot|claudebot|anthropic|perplexity|ccbot|amazonbot|applebot|meta-external/i

function isBot(request) {
  const ua = request.headers.get('user-agent') || ''
  if (!ua) return true                 // fara user-agent = aproape sigur bot/script
  return BOT_UA.test(ua)
}

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  if (!slug) return Response.json({ views: 0 })

  // scope=ansambluri -> marcheaza DOAR accesul recent (proiectele nu au contor de vizualizari).
  // Fara scope (implicit 'blog') -> incrementeaza contorul SI marcheaza accesul recent.
  const scope = searchParams.get('scope') === 'ansambluri' ? 'ansambluri' : 'blog'

  // Bot -> nu scrie nimic in Redis (nici contor, nici "recent accesat").
  // Altfel crawlerii ar decide ce apare ca "Recent accesat" pe site.
  if (isBot(request)) {
    if (scope === 'ansambluri') return Response.json({ ok: true })
    try {
      const redis = await getClient()
      const views = await redis.get(`views:${slug}`)
      return Response.json({ views: parseInt(views || '0') })
    } catch {
      return Response.json({ views: 0 })
    }
  }

  try {
    const redis = await getClient()
    // Marcheaza accesul recent (scor = timestamp; ZADD suprascrie scorul daca slug-ul exista)
    await redis.zAdd(`recent:${scope}`, [{ score: Date.now(), value: slug }])
    if (scope === 'ansambluri') return Response.json({ ok: true })
    const views = await redis.incr(`views:${slug}`)
    return Response.json({ views })
  } catch {
    return Response.json(scope === 'ansambluri' ? { ok: false } : { views: 0 })
  }
}
