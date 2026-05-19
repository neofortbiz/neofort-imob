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

// GET /api/views?slug=xxx — returneaza numarul de vizualizari
// POST /api/views?slug=xxx — incrementeaza si returneaza
export async function GET(request) {
  const { searchParams } = new URL(request.url)
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
