import Header from '@/components/Header'
import Footer from '@/components/Footer'
export const metadata = { title: 'Politica Cookies — Neofort IMO' }
export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-medium text-gray-900 mb-6">Politica Cookies</h1>
          <p className="text-sm text-gray-600">În curând.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
