// ============================================================
// scripts/generate-agent-files.mjs — fisierele pentru agenti AI (v452), la prebuild.
//
// Genereaza, din date si din SKILL.md:
//   public/.well-known/agent-skills/index.json  — indexul Agent Skills (schema 0.2.0)
//   public/.well-known/ard.json                 — manifestul ARD (Agentic Resource Discovery,
//                                                 cautat de Lighthouse / PageSpeed)
// SKILL.md se scrie DE MANA (public/.well-known/agent-skills/neofort-imo-residential/SKILL.md);
// aici doar i se normalizeaza capetele de linie la LF si i se calculeaza digestul.
//
// DE CE GENERAT, nu scris de mana:
//   - digestul SHA-256 trebuie recalculat la ORICE modificare a SKILL.md; scris de mana, ramane
//     gresit la prima corectura. Se calculeaza pe varianta LF (cea servita de Vercel); pe Windows
//     git scrie local CRLF si un digest calculat acolo ar fi diferit.
//   - lista de unelte si schemele lor vin din lib/mcpUnelte.js (aceeasi lista pe care o
//     serveste /api/mcp), etichetele de zona din ansamblurile active.
// Orice esec = log + iesire cu cod 0 (fisierele existente raman), ca la celelalte generatoare.
// ============================================================

import fs from 'fs'
import { createHash } from 'crypto'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const BASE = 'https://www.neofort.ro'
const WK = resolve(ROOT, 'public/.well-known')

export const SKILL_NUME = 'neofort-imo-residential'
export const SKILL_CALE = `/.well-known/agent-skills/${SKILL_NUME}/SKILL.md`

// Intrebarile tip din ard.json (aprobate de Dan, v452). 2–5 pe intrare, altfel Lighthouse avertizeaza.
const INTREBARI_MCP = [
  'ansambluri rezidențiale noi Titan Pallady Sector 3',
  'ansamblu rezidențial nou Colentina, Militari sau Piața Muncii',
  'apartament 2 camere finalizat mutare imediată București dezvoltator',
  'Neofort ansambluri rezidențiale prețuri și disponibilitate',
  'new build apartments Bucharest from developer, prices excluding VAT',
]
const INTREBARI_SKILL = [
  'apartament nou direct de la dezvoltator, fără comision, București',
  'preț apartament nou cu TVA 21% și rata lunară la credit',
  'vizionare ansamblu rezidențial nou Neofort',
]

export const sha256 = text => createHash('sha256').update(text, 'utf8').digest('hex')
export const faraCR = text => text.replace(/\r\n?/g, '\n')

// Frontmatter-ul SKILL.md: name + description (o linie fiecare).
export function citesteFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) return null
  const camp = k => (m[1].match(new RegExp(`^${k}:\\s*(.+)$`, 'm')) || [])[1]?.trim()
  return { name: camp('name'), description: camp('description') }
}

export async function construieste() {
  const { ANSAMBLURI_ACTIVE } = await import('../data/ansambluri/index.js')
  const { UNELTE, FIRMA } = await import('../lib/mcpUnelte.js')
  const { VERSIUNI_MODERNE, VERSIUNI_VECHI, SERVER_INFO } = await import('../lib/mcpServer.js')
  let DATA_SITE = null
  try { ({ DATA_SITE } = await import('../data/contact-map.js')) } catch {}

  // 1. SKILL.md: LF + digest
  const caleSkill = resolve(ROOT, 'public' + SKILL_CALE)
  const brut = fs.readFileSync(caleSkill, 'utf8')
  const skill = faraCR(brut)
  const fm = citesteFrontmatter(skill)
  if (!fm?.name || !fm?.description) throw new Error('SKILL.md fara name/description in frontmatter')
  if (fm.name !== SKILL_NUME) throw new Error(`SKILL.md: name „${fm.name}" ≠ directorul „${SKILL_NUME}"`)
  const digest = `sha256:${sha256(skill)}`

  // 2. index.json
  const index = {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [{ name: SKILL_NUME, type: 'skill-md', description: fm.description, url: SKILL_CALE, digest }],
  }

  // 3. ard.json — etichetele de zona si sector vin din ansamblurile active: zonele sunt exact
  //    paginile /zona/<slug> care exista (slugurile din `zone[]`), cu eticheta din lib/zoneLabel.js
  //    (aceeasi ca titlul paginii, cu diacritice), nu campul `zona` al proiectului.
  const { zonaLabel } = await import('../lib/zoneLabel.js')
  const zone = [...new Set(ANSAMBLURI_ACTIVE.flatMap(a => (a.zone || []).filter(z => !z.startsWith('sector-')).map(z => zonaLabel(z, a.zona))))]
    .sort((x, y) => x.localeCompare(y, 'ro'))
  const sectoare = [...new Set(ANSAMBLURI_ACTIVE.map(a => a.sector))].sort()
  const tags = ['ansambluri rezidențiale', 'apartamente noi', 'București', 'dezvoltator imobiliar', ...sectoare, ...zone]
  // ARD cere `updatedAt` in format JSON Schema „date-time" (RFC 3339 complet, cu ora si fusul):
  // „2026-11-11" singur e respins de Lighthouse (eroare reala, v454). Data vine din hash-ul de continut,
  // deci un redeploy fara modificari nu o misca.
  const actualizat = `${DATA_SITE || new Date().toISOString().slice(0, 10)}T00:00:00Z`
  const metadata = {
    '@type': 'Organization',
    name: 'Neofort IMO',
    legalName: 'Neofort IMO SRL',
    website: BASE,
    telephone: FIRMA.telefonInternational,
    email: FIRMA.email,
    address: FIRMA.adresa,
    openingHours: FIRMA.program,
    areaServed: 'București, România',
    llms: `${BASE}/llms.txt`,
  }
  const ard = {
    specVersion: '0.91',
    entries: [
      {
        identifier: 'urn:air:neofort.ro:mcp:ansambluri-rezidentiale',
        displayName: 'Neofort IMO — ansambluri rezidențiale București (MCP)',
        type: 'application/mcp-server-card+json',
        description: 'Read-only MCP server with the residential projects and apartments for sale by Neofort IMO in Bucharest: availability, prices in EUR excluding VAT, project details, blog articles, contact and mortgage estimates.',
        tags,
        capabilities: UNELTE.map(u => u.name),
        representativeQueries: INTREBARI_MCP,
        version: SERVER_INFO.version,
        updatedAt: actualizat,
        metadata,
        data: {
          name: SERVER_INFO.name,
          title: SERVER_INFO.title,
          version: SERVER_INFO.version,
          description: 'Read-only. Prices in EUR excluding 21% VAT. Cannot send requests; get_contact returns the broker.',
          websiteUrl: BASE,
          remotes: [{ type: 'streamable-http', url: `${BASE}/api/mcp` }],
          supportedProtocolVersions: [...VERSIUNI_MODERNE, ...VERSIUNI_VECHI],
          authentication: 'none',
          tools: UNELTE.map(u => ({ name: u.name, title: u.title, description: u.description, inputSchema: u.inputSchema, annotations: u.annotations })),
        },
      },
      {
        identifier: `urn:air:neofort.ro:skill:${SKILL_NUME}`,
        displayName: 'Neofort IMO — how to work with Neofort (Agent Skill)',
        type: 'application/agent-skills+md',
        description: fm.description,
        tags,
        capabilities: ['quote-prices-excluding-vat', 'arrange-viewing-via-broker', 'mortgage-estimate'],
        representativeQueries: INTREBARI_SKILL,
        version: '1.0.0',
        updatedAt: actualizat,
        metadata,
        url: `${BASE}${SKILL_CALE}`,
      },
    ],
  }
  return { skill, brut, caleSkill, index, ard, digest }
}

// Rulare directa (prebuild)
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { skill, brut, caleSkill, index, ard, digest } = await construieste()
    if (brut !== skill) fs.writeFileSync(caleSkill, skill) // servit cu LF, ca digestul sa fie al fisierului servit
    fs.mkdirSync(resolve(WK, 'agent-skills'), { recursive: true })
    fs.writeFileSync(resolve(WK, 'agent-skills/index.json'), JSON.stringify(index, null, 2) + '\n')
    fs.writeFileSync(resolve(WK, 'ard.json'), JSON.stringify(ard, null, 2) + '\n')
    console.log(`[agent-files] OK — SKILL.md ${digest.slice(0, 19)}…, ard.json ${ard.entries.length} intrari`)
  } catch (err) {
    console.log(`[agent-files] EROARE, fisierele existente raman neschimbate: ${err.message}`)
  }
  process.exit(0)
}
