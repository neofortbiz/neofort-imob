export default function robots() {
  return {
    rules: [
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
