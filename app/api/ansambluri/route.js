import { NextResponse } from 'next/server'
import { ANSAMBLURI_ACTIVE } from '@/data/ansambluri'

export async function GET() {
  const data = ANSAMBLURI_ACTIVE.map(a => ({
    id: a.numar,
    slug: a.slug,
    nume: a.nume,
    zona: a.zona,
    sector: a.sector,
    adresa: a.adresa,
    status: a.status,
    dataPredare: a.dataPredare,
    pretDeLa: a.pretDeLa,
    moneda: 'EUR',
    tva: 'exclus',
    etaje: a.etaje,
    tipuri: a.tipuri,
    coordonate: a.coordonate,
    contact: {
      broker: a.broker,
      telefon: a.brokerTel,
      whatsapp: `https://wa.me/40${a.brokerTel?.replace(/\s/g, '').substring(1)}`,
    },
    url: `https://neofort-imob.vercel.app/ansamblu-rezidential/${a.slug}`,
  }))

  return NextResponse.json({
    companie: 'Neofort IMO',
    descriere: 'Ansambluri rezidențiale noi în București — direct de la sursă',
    website: 'https://neofort-imob.vercel.app',
    telefon: '0743 250 029',
    totalActive: data.length,
    ansambluri: data,
    generatLa: new Date().toISOString(),
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    }
  })
}
