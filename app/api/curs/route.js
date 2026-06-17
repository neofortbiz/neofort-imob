import { NextResponse } from 'next/server'

// Cache 4 ore — BNR actualizează zilnic la ~13:00
export const revalidate = 14400

export async function GET() {
  try {
    // BNR XML — cursul oficial al zilei
    const res = await fetch('https://www.bnr.ro/nbrfxrates.xml', {
      next: { revalidate: 14400 },
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    if (!res.ok) throw new Error('BNR fetch failed')

    const xml = await res.text()
    // Extragem EUR din XML
    const match = xml.match(/<Rate currency="EUR">([0-9.]+)<\/Rate>/)
    if (!match) throw new Error('EUR not found in BNR XML')

    const rate = parseFloat(match[1])
    const dateMatch = xml.match(/date="([^"]+)"/)
    const date = dateMatch ? dateMatch[1] : new Date().toISOString().slice(0, 10)

    return NextResponse.json(
      { rate, date, source: 'BNR' },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=14400, stale-while-revalidate=3600',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (err) {
    // Fallback la frankfurter.app
    try {
      const res2 = await fetch('https://api.frankfurter.app/latest?from=EUR&to=RON')
      const data = await res2.json()
      if (data?.rates?.RON) {
        return NextResponse.json(
          { rate: data.rates.RON, date: data.date, source: 'ECB' },
          { headers: { 'Cache-Control': 'public, s-maxage=3600' } }
        )
      }
    } catch {}

    return NextResponse.json(
      { rate: 4.97, date: null, source: 'fallback' },
      { status: 200 }
    )
  }
}
