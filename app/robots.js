export default function robots() {
  return {
    rules: [
      // Blocheaza tot pe domeniile de preview/staging
      {
        userAgent: '*',
        disallow: '/',
        // Aplicat pe neofort-imob.vercel.app si orice alt domeniu non-production
        // via next.config.js X-Robots-Tag header
      },
      // Reguli pentru www.neofort.ro
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/portofoliu/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
    sitemap: 'https://www.neofort.ro/sitemap.xml',
  }
}
