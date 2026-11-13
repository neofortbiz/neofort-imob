// Intrebarile frecvente ale unui ansamblu ACTIV — o singura sursa pentru:
//   - FAQ-ul vizibil + schema FAQPage din app/ansamblu-rezidential/[slug]/page.js
//   - versiunea Markdown a paginii (lib/markdownPagini.js, ruta /ansamblu-rezidential/<slug>.md)
// Mutat din page.js la v449 FARA nicio schimbare de text: returneaza exact `mainEntity`
// de dinainte (verificat obiect cu obiect pe toate ansamblurile active).
// Import relativ (nu `@/`), ca sa poata fi folosit si de scripturile de test/prebuild.

import { frazaSuprafete } from './oferteSchema.js'

const TEL_DISPLAY = '0758 090 904'
const nf = n => new Intl.NumberFormat('ro-RO').format(n)

export function faqAnsamblu(a) {
  return [
    {
      '@type': 'Question',
      name: `Care sunt prețurile apartamentelor din ${a.nume}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Prețurile apartamentelor din ${a.nume} încep de la ${nf(a.pretDeLa)}€ + TVA. Sunt disponibile ${a.tipuri.join(', ')}, ${frazaSuprafete(a.apartamente)}.`,
      },
    },
    {
      '@type': 'Question',
      name: `Când este predarea apartamentelor la ${a.nume}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a.dataPredare === 'Finalizat' ? `${a.nume} este un ansamblu finalizat, apartamentele sunt disponibile imediat.` : `Termenul de predare pentru ${a.nume} este ${a.dataPredare}.`,
      },
    },
    {
      '@type': 'Question',
      name: `Ce dotări sunt incluse la apartamentele ${a.nume}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Apartamentele din ${a.nume} includ: ${a.dotari.slice(0, 6).join(', ')}.`,
      },
    },
    {
      '@type': 'Question',
      name: `Există locuri de parcare la ${a.nume}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: (() => {
          const p = a.parcare
          const opts = []
          if (p.exterior?.disponibil) opts.push(`parcare exterioară de la ${nf(p.exterior.pret)}€`)
          if (p.interior?.disponibil) opts.push(`parcare interioară de la ${nf(p.interior.pret)}€`)
          if (p.subteran?.disponibil && p.subteran.pret) opts.push(`parcare subterană de la ${nf(p.subteran.pret)}€`)
          return opts.length > 0 ? `Da, la ${a.nume} sunt disponibile: ${opts.join(', ')}.` : `Contactați-ne pentru disponibilitatea locurilor de parcare la ${a.nume}.`
        })(),
      },
    },
    {
      '@type': 'Question',
      name: `Cum fac o rezervare pentru un apartament din ${a.nume}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Pentru a rezerva un apartament în ${a.nume} contactați-ne la ${a.brokerTel || TEL_DISPLAY} sau pe WhatsApp. Procesul de rezervare este simplu și transparent, conform noilor reglementări legislative în vigoare.`,
      },
    },
    // Daca ansamblul are metrou in puncteInteres, raspundem despre metrou.
    // Daca NU are, intrebarea despre metrou nu are sens — o inlocuim cu una
    // despre transportul public real din date (STB, tramvai), in loc de
    // raspunsul generic „Contactati-ne", care nu ajuta nici userul nici LLM-ul.
    (() => {
      const metrouri = a.puncteInteres.filter(p => p.tip === 'metrou')
      if (metrouri.length > 0) {
        const lista = metrouri.slice(0, 3).map(p => `${p.nume} la ${p.distanta}`).join(', ')
        return {
          '@type': 'Question',
          name: `Cât este distanța de la ${a.nume} la metrou?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `De la ${a.nume} până la ${metrouri[0].nume} distanța este de ${metrouri[0].distanta}.${metrouri.length > 1 ? ` Stații de metrou în apropiere: ${lista}.` : ''}`,
          },
        }
      }
      const transport = a.puncteInteres.filter(p => p.tip === 'transport')
      return {
        '@type': 'Question',
        name: `Ce mijloace de transport în comun sunt aproape de ${a.nume}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: transport.length > 0
            ? `${a.nume} este deservit de ${transport.slice(0, 3).map(p => `${p.nume} (${p.distanta})`).join(', ')}. Ansamblul se află în zona ${a.zona}, ${a.sector}.`
            : `${a.nume} se află în zona ${a.zona}, ${a.sector}. Pentru detalii despre legăturile de transport public din zonă, contactați-ne la ${a.brokerTel || TEL_DISPLAY}.`,
        },
      }
    })(),
  ]
}
