export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://neofort-imob.vercel.app/sitemap.xml',
  }
}
