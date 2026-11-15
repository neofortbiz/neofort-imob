// Grupul de firme Neofort si adresele de e-mail @neofort-biz.ro — SURSA UNICA (v462, v463).
//
// De ce exista: raportul de audit agentic (15.11.2026) a observat ca Neofort IMO SRL foloseste adrese
// @neofort-biz.ro, iar un agent AI care incearca sa stabileasca identitatea firmei nu gaseste nicaieri
// legatura. Faptele sunt formulate de Dan (v462):
//   - Neofort IMO, Neofort BIZ si Neofort New Homes sunt firme separate, cu activitati distincte, din
//     acelasi grup de firme Neofort;
//   - Neofort IMO vinde ansambluri dezvoltate in grup (de Neofort New Homes) si de dezvoltatori parteneri;
//   - toate firmele grupului folosesc e-mail @neofort-biz.ro, mostenit de la prima firma a grupului.
// Unde apare: sectiunea „Grupul Neofort" din /despre-noi (FIRME_GRUP + EMAIL_GRUP — v463: mutata de pe
// /contact, unde arata ca un paragraf lipit langa butonul de e-mail), llms.txt si get_contact (MCP)
// prin GRUP_NEOFORT, iar in engleza SKILL.md (GRUP_NEOFORT_EN; auditul 28 verifica toate locurile).
// Fisierul nu importa nimic, ca sa poata fi folosit si din scripturile de build (node).

export const GRUP_NEOFORT = 'Neofort IMO SRL este o firmă separată de Neofort BIZ, cu activitate distinctă. Ambele fac parte din grupul de firme Neofort: Neofort IMO (consultanță, promovare și vânzări imobiliare), Neofort BIZ (furnizare și montaj pereți cortină, tâmplărie PVC și aluminiu) și Neofort New Homes (dezvoltare imobiliară). Toate firmele grupului folosesc adrese de e-mail @neofort-biz.ro, moștenite de la prima firmă a grupului.'

export const GRUP_NEOFORT_EN = 'Neofort IMO SRL is a separate company from Neofort BIZ, with a distinct activity. Both belong to the Neofort group of companies: Neofort IMO (real estate consultancy, marketing and sales), Neofort BIZ (supply and installation of curtain walls, PVC and aluminium joinery) and Neofort New Homes (real estate development). All companies in the group use e-mail addresses on @neofort-biz.ro, inherited from the group\'s first company.'

// Pentru sectiunea „Grupul Neofort" din /despre-noi. `activitate` = exact formularea lui Dan.
export const FIRME_GRUP = [
  {
    nume: 'Neofort IMO',
    activitate: 'Consultanță, promovare și vânzări imobiliare',
    text: 'Firma care operează neofort.ro. Comercializează apartamente noi în ansambluri rezidențiale din București — dezvoltate în cadrul grupului de Neofort New Homes sau de dezvoltatori parteneri — la prețul dezvoltatorului, fără comision de agenție pentru cumpărător.',
    acest: true,
  },
  {
    nume: 'Neofort New Homes',
    activitate: 'Dezvoltare imobiliară',
    text: 'Firma de dezvoltare imobiliară a grupului. O parte dintre ansamblurile rezidențiale prezentate pe neofort.ro sunt dezvoltate de Neofort New Homes; celelalte aparțin dezvoltatorilor parteneri.',
  },
  {
    nume: 'Neofort BIZ',
    activitate: 'Furnizare și montaj pereți cortină, tâmplărie PVC și aluminiu',
    text: 'Firmă separată, cu activitate distinctă de cea imobiliară: furnizează și montează pereți cortină și tâmplărie din PVC și aluminiu.',
    site: 'https://www.neofort-biz.ro',
  },
]

// v465: fara lead.neo@ — e adresa interna de redirectionare a cererilor catre brokeri, nu se afiseaza ca text.
export const EMAIL_GRUP = 'Toate firmele grupului folosesc adrese de e-mail @neofort-biz.ro, moștenite de la prima firmă a grupului. Adresa de contact a Neofort IMO SRL este info@neofort-biz.ro.'
