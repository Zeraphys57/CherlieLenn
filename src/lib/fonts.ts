/**
 * Pemuatan font terpusat.
 *
 * Empat peran, sesuai arahan desain:
 *   Display (judul latin)  -> Fraunces
 *   Body / UI (teks ID)    -> Inter
 *   Hanzi besar            -> Noto Serif SC
 *   Hanzi ukuran UI        -> Noto Sans SC
 *
 * CATATAN PENTING SOAL FONT MANDARIN
 * ----------------------------------
 * Noto Sans SC / Noto Serif SC TIDAK dimuat lewat `next/font/google`. Jalur
 * Google hanya menyediakan subset latin/cyrillic/vietnamese untuk kedua font
 * itu — bagian Hanzi-nya tidak ikut, sehingga huruf Mandarin akan tampil
 * sebagai kotak kosong (tofu).
 *
 * Sebagai gantinya, `scripts/build-cjk-subset.mjs` sudah membuat file font
 * berisi tepat 58 huruf Hanzi yang dipakai website ini (~34 KB, bukan ~8 MB),
 * dan file itu dimuat di sini lewat `next/font/local`.
 *
 * ➜ Menambah teks Hanzi baru? Jalankan `npm run fonts:cjk`.
 */

import { Fraunces, Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * Judul latin. Bobot 400 tegak saja — memang cuma itu yang dipakai.
 *
 * TIDAK ADA gaya miring di sini, dan itu disengaja. Sebelumnya pinyin ditulis
 * dengan Fraunces miring, yang memaksa dua berkas tambahan seberat ±43 KB
 * hanya demi dua label berukuran 14px. Selain boros, itu juga melanggar arahan
 * desainnya sendiri: Fraunces ditetapkan "hanya untuk ukuran besar". Pinyin
 * sekarang memakai Inter, tempatnya yang semestinya.
 *
 * Sumbu `opsz` juga sudah dilepas — sempat dimuat, tapi tidak pernah sekali pun
 * disetel, jadi yang terkirim hanya berat file tanpa manfaat.
 *
 * latin-ext tetap didaftarkan sebagai jaring pengaman kalau suatu saat ada nama
 * atau judul bertanda diakritik. Mendaftarkannya TIDAK menambah beban: berkas
 * subset hanya diunduh browser kalau halamannya benar-benar memuat huruf dari
 * rentang itu.
 */
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/**
 * Teks isi dan seluruh elemen UI berbahasa Indonesia.
 *
 * Hanya subset `latin`. Huruf beraksen yang lazim seperti é ì ó ù sudah
 * termasuk di dalamnya (rentang Latin-1), jadi tidak ada yang hilang.
 */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
});

/**
 * Inter khusus tanda nada pinyin: ā ǎ ǐ ǒ ǔ ǚ.
 *
 * KENAPA TIDAK MEMAKAI subsets: ["latin-ext"] SAJA
 * ------------------------------------------------
 * Karena blok `latin-ext` bawaan Google untuk Inter berukuran **83 KB**,
 * sementara yang benar-benar dipakai website ini cuma ENAM huruf. Memuatnya
 * lewat next/font berarti mengirim 83 KB demi dua label berukuran 14px —
 * lebih berat daripada seluruh CSS website ini.
 *
 * Berkas ini dipotong oleh `npm run fonts:cjk` dan berisi tepat enam huruf itu:
 * **4 KB**, alias 20× lebih ringan.
 *
 * Dipakai lewat kelas `.pinyin` di globals.css, yang menaruh font ini di depan
 * Inter biasa. Browser memilih per karakter: huruf bertanda nada diambil dari
 * sini, sisanya dari Inter — dan karena keduanya Inter, sambungannya tidak
 * terlihat sama sekali.
 */
export const interLatinExt = localFont({
  src: [
    { path: "../fonts/Inter-latin-ext-subset-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Inter-latin-ext-subset-400.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-inter-ext",
  display: "swap",
});

/** Hanzi untuk momen besar/tanda tangan (hero, cap stempel). */
export const notoSerifSC = localFont({
  src: [
    { path: "../fonts/NotoSerifSC-subset-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/NotoSerifSC-subset-400.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-noto-serif-sc",
  display: "swap",
  fallback: ["Noto Serif SC", "Songti SC", "SimSun", "serif"],
});

/** Hanzi berukuran kecil di dalam UI (label program, eyebrow seksi). */
export const notoSansSC = localFont({
  src: [
    { path: "../fonts/NotoSansSC-subset-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/NotoSansSC-subset-400.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-noto-sans-sc",
  display: "swap",
  fallback: ["Noto Sans SC", "PingFang SC", "Microsoft YaHei", "sans-serif"],
});

/** Digabung sekali, dipakai di <html> pada layout root. */
export const fontVariables = [
  fraunces.variable,
  inter.variable,
  interLatinExt.variable,
  notoSerifSC.variable,
  notoSansSC.variable,
].join(" ");
