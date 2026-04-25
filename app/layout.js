import './globals.css'

export const metadata = {
  icons: {
    icon: '/logo.avif',
    apple: '/logo.avif',
  },
  title: {
    default: 'Neofort IMO — Ansambluri Rezidențiale București',
    template: '%s | Neofort IMO',
  },
  description: 'Ansambluri rezidențiale noi în București. Apartamente de la dezvoltator, fără comision. 17 ani experiență, 85+ ansambluri livrate.',
  keywords: ['ansambluri rezidentiale bucuresti', 'apartamente noi bucuresti', 'bloc nou bucuresti', 'neofort imobiliare'],
  metadataBase: new URL('https://neofort-imob.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    siteName: 'Neofort IMO',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  )
}
