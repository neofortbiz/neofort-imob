'use client'
// WebMCP (v453): inregistreaza in pagina cele 6 unelte DOAR CITIRE ale serverului MCP
// (search_apartments, get_project, list_projects, search_articles, get_contact, calculate_mortgage).
// Definitiile si datele vin de la /api/mcp — pagina nu are o copie de date. In browserele fara
// WebMCP (aproape toate azi) nu face nimic: nici macar cererea catre server nu pleaca.
// v461: raspunsurile sunt scurtate pentru agentul din browser (lib/webmcp.js → raspunsScurt, max ~1.500
// caractere, linkuri interne fara UTM) si uneltele se inregistreaza ca lot (toate sau niciuna).
// Uneltele legate de o pagina anume stau in componenta paginii: request_viewing (FormularRapid),
// show_apartments + open_apartment_contact (ApartamenteTable), set_mortgage_calculator +
// fill_credit_request (CalculatorClient), filter_projects (AnsambluriClient).
import { useEffect } from 'react'
import { modelContext, inregistreazaToate, apelMcp, raspunsScurt } from '@/lib/webmcp'

export default function WebMCP() {
  useEffect(() => {
    const mc = modelContext()
    if (!mc) return
    const ctrl = new AbortController()
    apelMcp('tools/list')
      .then(({ tools }) => {
        if (ctrl.signal.aborted || !tools?.length) return
        inregistreazaToate(mc, tools.map(t => ({
          name: t.name,
          title: t.title,
          description: t.description,
          inputSchema: t.inputSchema,
          annotations: t.annotations,
          execute: async input => {
            try {
              return raspunsScurt(t.name, await apelMcp('tools/call', { name: t.name, arguments: input || {} }))
            } catch (e) {
              return JSON.stringify({ ok: false, eroare: `Serverul nu a răspuns: ${e.message}. Încearcă din nou sau folosește /contact.` })
            }
          },
        })), ctrl.signal)
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return null
}
