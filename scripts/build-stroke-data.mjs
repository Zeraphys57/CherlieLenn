/**
 * build-stroke-data.mjs
 * ----------------------------------------------------------------------------
 * Mengambil data urutan goresan (笔顺 bǐshùn) untuk huruf yang dianimasikan di
 * hero — saat ini 你 dan 好 — lalu menuliskannya sebagai file TypeScript kecil
 * di src/lib/stroke-data.ts.
 *
 * KENAPA DIEKSTRAK, BUKAN DI-IMPORT LANGSUNG:
 *   Paket `hanzi-writer-data` memuat data untuk puluhan ribu huruf. Kita hanya
 *   butuh dua. Dengan mengekstrak lebih dulu, paket itu cukup jadi
 *   devDependency dan tidak ada satu byte pun data huruf lain yang ikut
 *   terkirim ke pengunjung.
 *
 * CARA PAKAI:
 *   npm run strokes
 *
 * Setiap huruf memberi dua hal:
 *   strokes  — bentuk luar (outline) tiap goresan, sudah berupa path SVG
 *   medians  — garis tengah tiap goresan, yaitu jalur yang dilalui ujung kuas
 *
 * Animasi menulisnya memakai keduanya: garis tengah dipakai sebagai mask yang
 * memanjang, dan mask itu menyingkap bentuk luar goresan sedikit demi sedikit.
 * Hasilnya goresan tampak ditulis dengan bentuk kuas yang benar, bukan sekadar
 * garis tipis seragam.
 */

import { readFile, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Huruf yang dianimasikan di hero. */
const CHARACTERS = ["你", "好"];

/**
 * Data memakai sistem koordinat Make Me a Hanzi: kotak 1024×1024 dengan sumbu Y
 * terbalik dan garis dasar pada 900. Transform inilah yang membalikkannya ke
 * orientasi SVG yang normal.
 */
const TRANSFORM = "scale(1, -1) translate(0, -900)";

/** Ubah daftar titik garis tengah menjadi satu path SVG. */
function medianToPath(median) {
  return median
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
}

async function main() {
  const characters = CHARACTERS.map((char) => {
    const data = require(`hanzi-writer-data/${char}.json`);

    if (data.strokes.length !== data.medians.length) {
      throw new Error(`${char}: jumlah outline dan garis tengah tidak sama.`);
    }

    return {
      char,
      strokes: data.strokes.map((outline, index) => ({
        outline,
        median: medianToPath(data.medians[index]),
      })),
    };
  });

  const totalStrokes = characters.reduce((sum, c) => sum + c.strokes.length, 0);

  const file = `/**
 * ============================================================================
 *  DIBUAT OTOMATIS — JANGAN DIEDIT MANUAL
 * ============================================================================
 *  Dihasilkan oleh: scripts/build-stroke-data.mjs
 *  Perbarui dengan: npm run strokes
 *
 *  ATRIBUSI
 *  --------
 *  Data goresan berasal dari proyek Make Me a Hanzi, disalurkan lewat paket
 *  npm \`hanzi-writer-data\` (https://github.com/chanind/hanzi-writer-data).
 *
 *  Copyright (C) 1999 Arphic Technology Co., Ltd.
 *  Dilisensikan di bawah Arphic Public License. Salinan lengkap lisensinya ada
 *  di LICENSE-hanzi-data.txt pada akar repo ini.
 *
 *  Perubahan terhadap data aslinya: hanya dua huruf (${CHARACTERS.join(", ")}) yang
 *  diambil, dan daftar titik garis tengahnya diubah bentuk menjadi string path
 *  SVG. Nilai koordinatnya sendiri tidak diubah sama sekali.
 */

export type Stroke = {
  /** Bentuk luar goresan — dipakai sebagai bentuk yang terlihat. */
  outline: string;
  /** Garis tengah goresan — jalur ujung kuas, dipakai sebagai mask. */
  median: string;
};

export type CharacterStrokes = {
  char: string;
  strokes: Stroke[];
};

/**
 * Transform yang membawa koordinat Make Me a Hanzi ke orientasi SVG normal.
 * Wajib dipasang di elemen <g> yang membungkus path-path di bawah.
 */
export const STROKE_TRANSFORM = ${JSON.stringify(TRANSFORM)};

/** Panjang sisi kotak koordinat satu huruf. */
export const STROKE_VIEWBOX_SIZE = 1024;

/** Total ${totalStrokes} goresan untuk ${characters.length} huruf. */
export const heroCharacters: CharacterStrokes[] = ${JSON.stringify(characters, null, 2)};
`;

  await writeFile(path.join(ROOT, "src", "lib", "stroke-data.ts"), file, "utf8");

  // Lisensi Arphic mewajibkan salinannya ikut disertakan saat data diedarkan.
  await copyFile(
    path.join(ROOT, "node_modules", "hanzi-writer-data", "ARPHICPL.TXT"),
    path.join(ROOT, "LICENSE-hanzi-data.txt"),
  );

  const size = (await readFile(path.join(ROOT, "src", "lib", "stroke-data.ts"))).length;

  for (const c of characters) {
    console.log(`  ✓ ${c.char}  ${c.strokes.length} goresan`);
  }
  console.log(`\nDitulis ke src/lib/stroke-data.ts (${(size / 1024).toFixed(1)} KB)`);
  console.log("Lisensi disalin ke LICENSE-hanzi-data.txt");
}

main().catch((error) => {
  console.error(`\nGagal membuat data goresan: ${error.message}`);
  process.exit(1);
});
