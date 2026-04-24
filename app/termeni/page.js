import Header from '@/components/Header'
import Footer from '@/components/Footer'
export const metadata = { title: 'Termeni și Condiții — Neofort IMO' }
export default function TermeniPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-medium text-gray-900 mb-6">Termeni și Condiții</h1>
          <p className="text-sm text-gray-600">În curând.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
