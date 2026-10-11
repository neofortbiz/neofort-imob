// ── Vechimi calculate ────────────────────────────────────────
// La fel ca in data/blog.js: anii NU se scriu ca cifre fixe, ca sa nu
// se invecheasca la 1 ianuarie. Anii de start s-au dedus scazand din
// 2026 valorile scrise manual in octombrie 2026.
//
// ATENTIE: aceleasi vechimi apar si in AUTORI din data/blog.js (titlu +
// bio). Cele doua surse trebuie sa spuna acelasi lucru — pana la v407 nu
// o faceau: Svetlana avea 18 ani Neofort aici si 17 in blog, Raluca 2
// aici si deloc in blog. scripts/audit-continut.mjs le compara acum la
// fiecare build.
//
// Fisierul nu importa nimic (nici alias `@/`), ca sa ramana citibil si de
// scripturile de prebuild — de aceea calculul e local.
const AN_CURENT = new Date().getFullYear()
const ani = de => AN_CURENT - de
const INFIINTARE = 2009

export const ECHIPA = [
  {
    id: 'adriana-veselu',
    nume: 'Adriana VESELU',
    rol: 'Reprezentant vânzări zona CENTRALĂ',
    experienta: ani(2010),
    vechimeNeofort: ani(2012),
    tel: '+40752443437',
    telDisplay: '0752 443 437',
    zona: 'CENTRALĂ',
    foto: '/brokeri/adriana-veselu.avif',
  },
  {
    id: 'ramona-baicu',
    nume: 'Ramona BAICU',
    rol: 'Reprezentant vânzări zona SUD-VEST',
    experienta: ani(2009),
    vechimeNeofort: ani(2015),
    tel: '+40759030367',
    telDisplay: '0759 030 367',
    zona: 'SUD-VEST',
    foto: '/brokeri/ramona-baicu.avif',
  },
  {
    id: 'igor-calutu',
    nume: 'Igor CALUTU',
    rol: 'Reprezentant vânzări zona VEST',
    experienta: ani(2004),
    vechimeNeofort: ani(2015),
    tel: '+40759030366',
    telDisplay: '0759 030 366',
    zona: 'VEST',
    foto: '/brokeri/igor-calutu.avif',
  },
  {
    id: 'svetlana-calutu',
    nume: 'Svetlana CALUTU',
    rol: 'Reprezentant vânzări zona CENTRALĂ',
    experienta: ani(2005),
    vechimeNeofort: ani(INFIINTARE),
    tel: '+40752443434',
    telDisplay: '0752 443 434',
    zona: 'CENTRALĂ',
    foto: '/brokeri/svetlana-calutu.avif',
  },
  {
    id: 'adrian-pintilie',
    nume: 'Adrian PINTILIE',
    rol: 'Reprezentant vânzări zona SUD-EST',
    experienta: ani(2011),
    vechimeNeofort: ani(2012),
    tel: '+40752443436',
    telDisplay: '0752 443 436',
    zona: 'SUD-EST',
    foto: '/brokeri/adrian-pintilie.avif',
  },
  {
    id: 'sasha-calutu',
    nume: 'Sasha CALUTU',
    rol: 'Reprezentant vânzări zona CENTRALĂ',
    experienta: ani(INFIINTARE),
    vechimeNeofort: ani(INFIINTARE),
    tel: '+40757077057',
    telDisplay: '0757 077 057',
    zona: 'CENTRALĂ',
    foto: '/brokeri/sasha-calutu.avif',
  },
  {
    id: 'raluca-nistor',
    nume: 'Raluca NISTOR',
    rol: 'Reprezentant vânzări zona EST',
    experienta: ani(2016),
    vechimeNeofort: ani(2023),
    tel: '+40743250029',
    telDisplay: '0743 250 029',
    zona: 'EST',
    foto: '/brokeri/raluca-nistor.avif',
  },
  {
    id: 'info-neofort',
    nume: 'Info Neofort',
    rol: 'Birou Informații Neofort',
    tel: '+40758090904',
    telDisplay: '0758 090 904',
    zona: 'GENERAL',
    foto: '/brokeri/info-neofort.avif',
  },
]