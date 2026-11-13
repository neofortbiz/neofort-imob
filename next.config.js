/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
  },
  // Versiunile Markdown pentru agenti AI (v449): aceeasi adresa + ".md".
  // beforeFiles: altfel ruta dinamica /blog/[slug] ar primi "slug.md" ca slug.
  // Regex-ul accepta doar sluguri [a-z0-9-], deci nu prinde imagini sau alte fisiere.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/blog/:slug([a-z0-9-]+)\\.md', destination: '/api/md/blog/:slug' },
        { source: '/ansamblu-rezidential/:slug([a-z0-9-]+)\\.md', destination: '/api/md/ansamblu/:slug' },
      ],
    }
  },
  async headers() {
    return [
      {
        // Plasa de siguranta pentru .md: noindex chiar daca ruta si-ar pierde antetele.
        // Pagina HTML ramane singura indexabila (canonical-ul ei nu se schimba).
        source: '/:dir(blog|ansamblu-rezidential)/:slug([a-z0-9-]+)\\.md',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        // Blocheaza indexarea pe orice domeniu care nu e www.neofort.ro
        source: '/(.*)',
        has: [{ type: 'host', value: '(?!www\\.neofort\\.ro).*' }],
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        source: '/portofoliu/(.*)\\.avif',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/ansambluri/(.*)\\.avif',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/brokeri/(.*)\\.avif',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/blog/(.*)\\.avif',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Imaginile .jpg din blog nu erau acoperite de nicio regula de cache
        // (regula de mai sus prinde doar .avif) -> se re-transfereau de la origine.
        source: '/blog/(.*)\\.jpg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/og-(.*)\\.jpg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, immutable' },
        ],
      },
      {
        source: '/og-ansambluri/(.*)\\.jpg',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, immutable' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
