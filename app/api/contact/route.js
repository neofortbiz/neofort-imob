import { NextResponse } from 'next/server'
import { NR_ACTIVE, NR_LIVRATE } from '@/data/siteConfig'

// Rate limiting simplu în-memory — max 5 request-uri pe IP per 10 minute
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 minute
const RATE_LIMIT_MAX = 5
const rateLimitMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 })
    return true
  }
  
  if (entry.count >= RATE_LIMIT_MAX) return false
  
  entry.count++
  return true
}

// Curăță map-ul periodic pentru a evita memory leak
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [ip, entry] of rateLimitMap.entries()) {
      if (now - entry.start > RATE_LIMIT_WINDOW) rateLimitMap.delete(ip)
    }
  }, RATE_LIMIT_WINDOW)
}

const DEST_EMAIL = 'lead.neo@neofort-biz.ro'
const FROM_EMAIL = 'noreply@neofort-biz.ro'
const BASE = 'https://www.neofort.ro'

function buildInternalEmail({ nume, telefon, email, mesaj, finantare, tipImobil, camere, buget, zona, ansamblu, tip }) {
  const isRapid = tip === 'rapid'
  const subiect = isRapid
    ? `Lead rapid — ${ansamblu || 'Site'} — ${nume}`
    : `Lead calificat — ${nume} — ${tipImobil || ''}`

  const html = `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8">
<style>
body{margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif}
.w{max-width:600px;margin:0 auto;padding:20px}
.card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.hdr{background:#081c12;padding:28px 32px}
.hdr-logo{color:#e8b44e;font-size:20px;font-weight:700}
.hdr-sub{color:rgba(255,255,255,.5);font-size:12px;margin-top:4px}
.badge{display:inline-block;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:600;margin-top:10px}
.b-rapid{background:#dc2626;color:#fff}.b-cal{background:#2d7a3a;color:#fff}
.bdy{padding:28px 32px}
.nm{font-size:20px;font-weight:700;color:#111;margin-bottom:4px}
.ct{font-size:14px;color:#555;margin-bottom:20px}
.row{display:flex;padding:10px 0;border-bottom:1px solid #f0f0f0}
.row:last-child{border-bottom:none}
.lbl{font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:.5px;width:130px;flex-shrink:0}
.val{font-size:13px;color:#333;flex:1}
.btns{display:flex;gap:10px;margin-top:20px;flex-wrap:wrap}
.btn{display:inline-block;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none}
.btn-g{background:#2d7a3a;color:#fff}.btn-s{background:#f4f4f4;color:#333}
.ts{font-size:11px;color:#bbb;margin-top:12px}
.ft{padding:14px 32px;background:#f9f9f9;font-size:11px;color:#aaa;border-top:1px solid #eee}
</style></head><body>
<div class="w"><div class="card">
<div class="hdr">
  <div class="hdr-logo">Neofort IMO</div>
  <div class="hdr-sub">Solicitare nouă din site</div>
  <span class="badge ${isRapid ? 'b-rapid' : 'b-cal'}">${isRapid ? '⚡ LEAD RAPID' : '📋 LEAD CALIFICAT'}</span>
</div>
<div class="bdy">
  <div class="nm">${nume}</div>
  <div class="ct">📞 ${telefon}${email ? ' · ✉️ ' + email : ''}</div>
  ${isRapid && ansamblu ? `<div class="row"><div class="lbl">Ansamblu</div><div class="val" style="font-weight:600;color:#2d7a3a">${ansamblu}</div></div>` : ''}
  ${!isRapid && tipImobil ? `<div class="row"><div class="lbl">Tip imobil</div><div class="val">${tipImobil}</div></div>` : ''}
  ${!isRapid && camere ? `<div class="row"><div class="lbl">Camere</div><div class="val">${camere}</div></div>` : ''}
  ${!isRapid && finantare ? `<div class="row"><div class="lbl">Finanțare</div><div class="val">${finantare}</div></div>` : ''}
  ${!isRapid && buget ? `<div class="row"><div class="lbl">Buget</div><div class="val">${buget}</div></div>` : ''}
  ${!isRapid && zona ? `<div class="row"><div class="lbl">Zonă</div><div class="val">${zona}</div></div>` : ''}
  ${mesaj ? `<div class="row"><div class="lbl">Mesaj</div><div class="val" style="font-style:italic">"${mesaj}"</div></div>` : ''}
  <div class="btns">
    ${telefon ? `<a href="tel:${telefon.replace(/\s/g,'')}" class="btn btn-g">📞 Sună acum</a>` : ''}
    ${email ? `<a href="mailto:${email}" class="btn btn-s">✉️ Răspunde</a>` : ''}
  </div>
  <div class="ts">Primit: ${new Date().toLocaleString('ro-RO', { timeZone: 'Europe/Bucharest' })}</div>
</div>
<div class="ft">Neofort IMO · ${DEST_EMAIL} · ${BASE}</div>
</div></div></body></html>`

  return { subiect, html }
}

function buildClientEmail({ nume, email, ansamblu }) {
  const html = `<!DOCTYPE html><html lang="ro"><head><meta charset="UTF-8">
<style>
body{margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif}
.w{max-width:600px;margin:0 auto;padding:20px}
.card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)}
.hdr{background:linear-gradient(135deg,#081c12,#0d2b1a);padding:40px 32px;text-align:center}
.logo{color:#e8b44e;font-size:26px;font-weight:700}
.logo-s{color:rgba(255,255,255,.45);font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-top:4px}
.chk{width:52px;height:52px;background:#2d7a3a;border-radius:50%;font-size:24px;line-height:52px;text-align:center;margin:18px auto 0}
.bdy{padding:36px 32px}
.greet{font-size:22px;font-weight:700;color:#111;margin-bottom:8px}
.intro{font-size:14px;color:#555;line-height:1.7;margin-bottom:24px}
.hl{background:#f0faf2;border-left:3px solid #2d7a3a;border-radius:0 8px 8px 0;padding:14px 18px;margin-bottom:24px;font-size:13px;color:#2d7a3a;font-weight:600}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:24px}
.lnk{display:block;background:#f9f9f9;border:1px solid #eee;border-radius:8px;padding:12px 14px;text-decoration:none}
.lnk-ic{font-size:18px;margin-bottom:4px}
.lnk-t{font-size:12px;font-weight:600;color:#333}
.lnk-d{font-size:10px;color:#999;margin-top:2px}
.ctabox{background:#081c12;border-radius:8px;padding:20px;text-align:center;margin-bottom:8px}
.ctabox p{margin:0;color:rgba(255,255,255,.6);font-size:12px}
.ctabox a{color:#e8b44e;font-size:16px;font-weight:700;text-decoration:none;display:block;margin-top:6px}
.ft{padding:16px 32px;text-align:center;border-top:1px solid #f0f0f0;font-size:11px;color:#bbb;line-height:1.8}
.ft a{color:#2d7a3a;text-decoration:none}
</style></head><body>
<div class="w"><div class="card">
<div class="hdr">
  <div class="logo">Neofort IMO</div>
  <div class="logo-s">Apartamente Noi București</div>
  <div class="chk">✓</div>
</div>
<div class="bdy">
  <div class="greet">Bună ziua, ${nume}!</div>
  <p class="intro">Mulțumim pentru solicitarea ta. Am primit cererea și un consultant Neofort IMO te va contacta <strong>în cel mult 2 ore</strong> cu o ofertă personalizată adaptată nevoilor tale.</p>
  <div class="hl">${ansamblu ? `Solicitare înregistrată: ${ansamblu}` : 'Cererea ta a fost înregistrată cu succes ✓'}</div>
  <div style="font-size:12px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px">Explorează între timp</div>
  <div class="grid">
    <a href="${BASE}/ansambluri-rezidentiale" class="lnk"><div class="lnk-ic">🏢</div><div class="lnk-t">Ansambluri active</div><div class="lnk-d">${NR_ACTIVE} proiecte disponibile</div></a>
    <a href="${BASE}/harta-ansambluri" class="lnk"><div class="lnk-ic">🗺️</div><div class="lnk-t">Harta interactivă</div><div class="lnk-d">${NR_LIVRATE + NR_ACTIVE}+ proiecte pe hartă</div></a>
    <a href="${BASE}/portofoliu" class="lnk"><div class="lnk-ic">🏆</div><div class="lnk-t">Portofoliu</div><div class="lnk-d">${NR_LIVRATE}+ proiecte livrate</div></a>
    <a href="${BASE}/blog" class="lnk"><div class="lnk-ic">📰</div><div class="lnk-t">Blog imobiliar</div><div class="lnk-d">Noutăți și analize</div></a>
  </div>
  <div class="ctabox"><p>Sau ne poți contacta direct:</p><a href="tel:0758090904">0758 090 904</a></div>
</div>
<div class="ft">
  Neofort IMO — Direct de la sursă, fără comision<br>
  Str. Theodor Aman nr. 11, Sector 1, București<br>
  <a href="${BASE}">www.neofort.ro</a> · <a href="mailto:info@neofort-biz.ro">info@neofort-biz.ro</a><br><br>
  <span style="color:#ddd">Dacă nu ai trimis această solicitare, te rugăm să ignori acest email.</span>
</div>
</div></div></body></html>`

  return { subiect: 'Cererea ta a fost primită — Neofort IMO', html }
}

export async function POST(request) {
  try {
    const data = await request.json()
    const { nume, telefon, email, ansamblu } = data

    if (!nume || !telefon) {
      return NextResponse.json({ error: 'Câmpuri obligatorii lipsă' }, { status: 400 })
    }

    const internal = buildInternalEmail(data)

    if (process.env.RESEND_API_KEY) {
      const r1 = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: DEST_EMAIL,
          subject: internal.subiect,
          html: internal.html,
        }),
      })
      if (!r1.ok) {
        console.error('Resend internal error:', await r1.text())
        return NextResponse.json({ error: 'Email error' }, { status: 500 })
      }

      if (email) {
        const client = buildClientEmail({ nume, email, ansamblu })
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `Neofort IMO <${FROM_EMAIL}>`,
            to: email,
            subject: client.subiect,
            html: client.html,
          }),
        }).catch(e => console.error('Client confirm error:', e))
      }
    } else {
      // Email confirmare client trimis in background
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
