// Datele articolelor de blog, afisate in format numeric zz.ll.aaaa.
//
// DE CE numeric: pe cardurile de blog randul de sub titlu e plin (autor, data,
// timp de citire, vizualizari). „22.04.2026" are 10 caractere, „22 Aprilie 2026"
// are 15 — diferenta face loc pentru data actualizarii fara sa rupa randul.
//
// SEO: motoarele si asistentii AI citesc data din atributul `dateTime` al
// elementului <time> (format ISO) si din schema BlogPosting, nu din textul
// vizibil. Textul vizibil poate fi numeric fara niciun efect asupra indexarii.
//
// `dataModificata` traieste DOAR in ARTICOLE (data/blog.js), nu in
// ARTICOLE_LIST — vezi comentariul din app/sitemap.js. Se afiseaza numai acolo
// unde exista; un articol nemodificat de la publicare arata doar data publicarii.
export const dataNumerica = iso => (iso ? String(iso).split('-').reverse().join('.') : '')
