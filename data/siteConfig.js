// ============================================================
// data/siteConfig.js — SURSA UNICA pentru cifrele dinamice Neofort IMO
//
// Toate paginile importa cifrele de aici.
// Cand se adauga un proiect nou sau se schimba un status,
// cifrele se actualizeaza automat in tot site-ul.
// ANI_EXPERIENTA devine 18 in 2027 fara nicio modificare manuala.
// ============================================================

import { ANSAMBLURI_ACTIVE } from '@/data/ansambluri'
import { TOATE_PORTOFOLIU } from '@/data/portofoliu'

// ── Constante fixe ──────────────────────────────────────────
export const FOUNDING_YEAR = 2009

// ── Calcul dinamic la build ──────────────────────────────────
export const ANI_EXPERIENTA = new Date().getFullYear() - FOUNDING_YEAR

// Numarul de ansambluri active (in constructie + finalizate la vanzare)
export const NR_ACTIVE = ANSAMBLURI_ACTIVE.length

// Numarul de ansambluri din portofoliu (vandute integral)
export const NR_PORTOFOLIU = TOATE_PORTOFOLIU.length

// Numarul de ansambluri finalizate (status 'activ') — livrate dar inca la vanzare
export const NR_FINALIZATE = ANSAMBLURI_ACTIVE.filter(a => a.dataPredare === 'Finalizat').length

// Total proiecte livrate = portofoliu complet vandut + cele finalizate in vanzare
// NU include proiectele in constructie
export const NR_LIVRATE = NR_PORTOFOLIU + NR_FINALIZATE

// Familii ajutate (valoare estimata, actualizata manual cand e cazul)
export const NR_FAMILII = '4.000+'

// ── Siruri gata formate pentru UI ───────────────────────────
export const STR_ANI = `${ANI_EXPERIENTA} ani`
export const STR_LIVRATE = `${NR_LIVRATE}+`
export const STR_ACTIVE = `${NR_ACTIVE}`
