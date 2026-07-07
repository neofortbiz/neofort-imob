export default function robots() {
  return {
    rules: [
      // Reguli principale pentru www.neofort.ro
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // LLM crawlers — acces complet pentru indexare AI
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
    ],
    // Domeniile de staging sunt blocate prin X-Robots-Tag header în next.config.js
    // nu prin robots.txt (robots.txt nu suportă condiții de host)
    sitemap: 'https://www.neofort.ro/sitemap.xml',
  }
}
