'use client'
// WebMCP (v453): inregistreaza in pagina cele 6 unelte DOAR CITIRE ale serverului MCP
// (search_apartments, get_project, list_projects, search_articles, get_contact, calculate_mortgage).
// Definitiile si raspunsurile vin de la /api/mcp — pagina nu are o copie de date. In browserele fara
// WebMCP (aproape toate azi) nu face nimic: nici macar cererea catre server nu pleaca.
// Unealta request_viewing (completeaza formularul, nu-l trimite) e in components/FormularRapid.js,
// pentru ca exista doar pe paginile de ansamblu.
import { useEffect } from 'react'
import { modelContext, inregistreaza, apelMcp } from '@/lib/webmcp'

export default function WebMCP() {
  useEffect(() => {
    const mc = modelContext()
    if (!mc) return
    const ctrl = new AbortController()
    apelMcp('tools/list')
      .then(({ tools }) => {
        if (ctrl.signal.aborted) return
        for (const t of tools || []) {
          inregistreaza(mc, {
            name: t.name,
            title: t.title,
            description: t.description,
            inputSchema: t.inputSchema,
            annotations: t.annotations,
            execute: async input => {
              try {
                const r = await apelMcp('tools/call', { name: t.name, arguments: input || {} })
                return r?.content?.[0]?.text ?? JSON.stringify(r?.structuredContent ?? {})
              } catch (e) {
                return JSON.stringify({ ok: false, eroare: `Serverul nu a răspuns: ${e.message}. Încearcă din nou sau folosește https://www.neofort.ro/contact.` })
              }
            },
          }, ctrl.signal)
        }
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return null
}
