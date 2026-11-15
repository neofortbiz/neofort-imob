// MCP Server Card (v460) — SEP-2127 (Final), schema oficiala v1:
// https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json
// O SINGURA SURSA pentru:
//   - GET https://www.neofort.ro/api/mcp/server-card (adresa rezervata: URL-ul streamable-http + /server-card)
//   - cardul inclus in /.well-known/ard.json (scripts/generate-agent-files.mjs)
// Numele e cel publicat in registrul oficial MCP (15.11.2026): ro.neofort.www/… — domeniul verificat
// e www.neofort.ro, pentru ca neofort.ro face redirect 301 si registrul nu urmeaza redirecturi.
// Cardul NU contine unelte (SEP-2127 le exclude intentionat: se afla la rulare, prin tools/list).
// Fara importuri `@/`, ca sa poata fi citit si de scripturile de prebuild.

import { SERVER_INFO, VERSIUNI_MODERNE, VERSIUNI_VECHI } from './mcpServer.js'

export const NUME_REGISTRU = 'ro.neofort.www/ansambluri-rezidentiale'
export const URL_MCP = 'https://www.neofort.ro/api/mcp'
export const URL_CARD = `${URL_MCP}/server-card`
export const TIP_CARD = 'application/mcp-server-card+json'

export function serverCard() {
  return {
    $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
    name: NUME_REGISTRU,
    version: SERVER_INFO.version,
    description: 'New-build apartments for sale in Bucharest by Neofort IMO: availability, prices excl. VAT, contact.',
    title: 'Neofort IMO — ansambluri rezidențiale București',
    websiteUrl: SERVER_INFO.websiteUrl,
    remotes: [
      { type: 'streamable-http', url: URL_MCP, supportedProtocolVersions: [...VERSIUNI_MODERNE, ...VERSIUNI_VECHI] },
    ],
  }
}
