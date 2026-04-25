import { NextResponse } from 'next/server'
import { createClient } from 'redis'

export async function POST(request) {
  try {
    const { slug } = await request.json()
    if (!slug) return NextResponse.json({ error: 'No slug' }, { status: 400 })

    const redis = await createClient({ url: process.env.REDIS_URL }).connect()
    await redis.set(`view:${slug}`, Date.now())
    await redis.quit()

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Track view error:', err)
    return NextResponse.json({ ok: false })
  }
}
