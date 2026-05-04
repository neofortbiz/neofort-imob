const BASE = 'https://www.neofort.ro'

export const metadata = {
  title: 'Harta Ansambluri Rezidențiale București — Neofort IMO',
  description: 'Hartă interactivă cu toate ansamblurile rezidențiale Neofort IMO din București. 12 proiecte active + 33 din portofoliu pe OpenStreetMap.',
  alternates: { canonical: `${BASE}/harta-ansambluri` },
  openGraph: {
    title: 'Harta Ansambluri Neofort IMO — București',
    description: '45 de ansambluri rezidențiale pe hartă interactivă OpenStreetMap.',
    url: `${BASE}/harta-ansambluri`,
    type: 'website',
    locale: 'ro_RO',
    images: [{ url: `${BASE}/og-harta.jpg`, width: 1200, height: 630, alt: 'Harta Ansambluri Neofort IMO' }],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE}/og-harta.jpg`] },
}

export default function HartaLayout({ children }) {
  return children
}
