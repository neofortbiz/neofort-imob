import { NextResponse } from 'next/server'

const DEST_EMAIL = 'lead.neo@neofort-biz.ro'

export async function POST(request) {
  try {
    const data = await request.json()
    const { nume, telefon, email, mesaj, finantare, tipImobil, camere, buget, zona, ansamblu, tip } = data

    if (!nume || !telefon) {
      return NextResponse.json({ error: 'Câmpuri obligatorii lipsă' }, { status: 400 })
    }

    // Construim corpul emailului
    const subject = tip === 'rapid'
      ? `Lead rapid — ${ansamblu || 'Site'} — ${nume}`
      : `Lead calificat — ${nume}`

    const body = tip === 'rapid'
      ? `
LEAD RAPID — NEOFORT IMO
========================
Ansamblu: ${ansamblu || 'N/A'}
Nume: ${nume}
Telefon: ${telefon}
Email: ${email || 'N/A'}
Mesaj: ${mesaj || 'N/A'}
Data: ${new Date().toLocaleString('ro-RO')}
      `.trim()
      : `
LEAD CALIFICAT — NEOFORT IMO
=============================
Nume: ${nume}
Telefon: ${telefon}
Email: ${email || 'N/A'}
Finanțare: ${finantare || 'N/A'}
Tip imobil: ${tipImobil || 'N/A'}
Camere: ${camere || 'N/A'}
Buget: ${buget || 'N/A'}
Zonă: ${zona || 'N/A'}
Mesaj: ${mesaj || 'N/A'}
Data: ${new Date().toLocaleString('ro-RO')}
      `.trim()

    // Trimitere via Resend (dacă e configurat) sau fallback
    if (process.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@neofort-imob.ro',
          to: DEST_EMAIL,
          subject,
          text: body,
        }),
      })
      if (!res.ok) {
        console.error('Resend error:', await res.text())
        return NextResponse.json({ error: 'Email error' }, { status: 500 })
      }
    } else {
      // Log în development dacă nu e Resend configurat
      console.log('--- EMAIL LEAD ---')
      console.log('To:', DEST_EMAIL)
      console.log('Subject:', subject)
      console.log('Body:', body)
      console.log('------------------')
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
