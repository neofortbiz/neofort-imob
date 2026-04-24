import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Despre Neofort IMO — Dezvoltator Imobiliar București',
  description: 'Neofort IMO, dezvoltator și agenție imobiliară din București. 17 ani de experiență, 85+ ansambluri rezidențiale livrate.',
}

export default function DespreNoiPage() {
  return (
    <>
      <Header activePath="/despre-noi" />
      <main className="min-h-screen">
        <div className="bg-gray-50 border-b border-gray-100 py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#2d7a3a]">Acasă</Link>
              <span>›</span>
              <span className="text-gray-900">Despre noi</span>
            </nav>
            <h1 className="text-2xl font-medium text-gray-900">Despre Neofort IMO</h1>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-sm text-gray-600 leading-relaxed">
            Neofort IMO este o companie cu 17 ani de experiență în dezvoltarea și comercializarea ansamblurilor rezidențiale în București. Din 2009, am livrat 85+ ansambluri în toate sectoarele capitalei, oferind apartamente noi direct de la dezvoltator, fără comision de agenție.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
