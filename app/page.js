import HomePageClient from './HomePage'

const BASE = 'https://neofort-imob.vercel.app'

export const metadata = {
  alternates: { canonical: BASE },
}

export default function Page() {
  return <HomePageClient />
}
