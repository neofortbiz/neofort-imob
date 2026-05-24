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

export async function POST(request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  if (!slug) return Response.json({ views: 0 })

  try {
    const redis = await getClient()
    const views = await redis.incr(`views:${slug}`)
    return Response.json({ views })
  } catch {
    return Response.json({ views: 0 })
  }
}
