import { createClient } from 'redis'
import { HomePageClient } from './HomePage'
import { ANSAMBLURI_ACTIVE } from '@/data/ansambluri'

async function getSortedSlugs() {
  try {
    const slugs = ANSAMBLURI_ACTIVE.map(a => a.slug)
    if (slugs.length === 0) return slugs

    const redis = await createClient({ url: process.env.REDIS_URL }).connect()

    // Citim toate timestamp-urile intr-un singur pipeline
    const pipeline = redis.multi()
    slugs.forEach(s => pipeline.get(`view:${s}`))
    const values = await pipeline.exec()

    await redis.quit()

    const tsMap = {}
    slugs.forEach((slug, i) => {
      tsMap[slug] = values[i] ? parseInt(String(values[i])) : -1
    })

    // Vizitate recent primele, nevizitate la coada in ordinea originala
    const visited = slugs.filter(s => tsMap[s] > 0).sort((a, b) => tsMap[b] - tsMap[a])
    const unvisited = slugs.filter(s => tsMap[s] === -1)

    return [...visited, ...unvisited]
  } catch {
    return ANSAMBLURI_ACTIVE.map(a => a.slug)
  }
}

export default async function Page() {
  const sortedSlugs = await getSortedSlugs()
  return <HomePageClient sortedSlugs={sortedSlugs} />
}
