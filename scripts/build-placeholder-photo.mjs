/**
 * build-placeholder-photo.mjs
 * ----------------------------------------------------------------------------
 * Membuat foto sementara di public/images/guru.png supaya tata letak hero bisa
 * dikerjakan dan diperiksa sebelum foto asli tersedia.
 *
 * Gambarnya sengaja dibuat jelas-jelas sebagai penanda kosong: memakai warna
 * kertas dari palet, bergaris 米字格, dan bertuliskan "FOTO GURU". Tidak
 * mungkin tertukar dengan foto sungguhan kalau sampai lupa diganti.
 *
 * FOTO ASLINYA SUDAH TERPASANG, jadi skrip ini sekarang menganggur.
 * `hero.photo` menunjuk ke berkas lain (lihat src/lib/content.ts), dan itu
 * disengaja: selama namanya berbeda, menjalankan skrip ini tidak mungkin
 * menimpa foto guru yang sebenarnya. Berkas yang dihasilkannya hanya terpakai
 * kalau `hero.photo` sengaja diarahkan balik ke sini.
 *
 * Dulu keduanya nyaris bertabrakan dengan cara lain: skrip menulis .jpg
 * sementara situsnya membaca .png, sehingga skrip terlihat berhasil tapi tidak
 * mengubah apa pun di layar. Kalau nanti OUT_NAME diubah, pastikan tetap TIDAK
 * sama dengan `hero.photo`.
 *
 * CARA PAKAI:
 *   npm run placeholder:photo
 *
 * MENGGANTI FOTO GURU:
 *   Timpa berkas yang ditunjuk `hero.photo` — rasio potret, minimal
 *   800×1000px. Tidak ada kode yang perlu diubah.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 800;
const HEIGHT = 1000;

/** Harus cocok dengan `hero.photo` di src/lib/content.ts. */
const OUT_NAME = "guru.png";

// Warna diambil dari palet di src/app/globals.css.
const PAPER_MID = "#E3DCC9";
const WARM_GRAY = "#8A8271";
const INK = "#211E1A";

/** Satu kotak 米字格: tepi, salib tengah, dan dua diagonal. */
function mizige(x, y, size) {
  const right = x + size;
  const bottom = y + size;
  const midX = x + size / 2;
  const midY = y + size / 2;
  const dashed = `stroke="${WARM_GRAY}" stroke-width="1.5" stroke-dasharray="7 8" opacity="0.55"`;

  return `
    <rect x="${x}" y="${y}" width="${size}" height="${size}"
          fill="none" stroke="${WARM_GRAY}" stroke-width="1.5" opacity="0.55"/>
    <line x1="${x}" y1="${midY}" x2="${right}" y2="${midY}" ${dashed}/>
    <line x1="${midX}" y1="${y}" x2="${midX}" y2="${bottom}" ${dashed}/>
    <line x1="${x}" y1="${y}" x2="${right}" y2="${bottom}" ${dashed}/>
    <line x1="${right}" y1="${y}" x2="${x}" y2="${bottom}" ${dashed}/>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PAPER_MID}"/>
  ${mizige(WIDTH / 2 - 150, HEIGHT / 2 - 210, 300)}
  <text x="${WIDTH / 2}" y="${HEIGHT / 2 + 150}" text-anchor="middle"
        font-family="Georgia, serif" font-size="46" fill="${INK}" opacity="0.75">FOTO GURU</text>
  <text x="${WIDTH / 2}" y="${HEIGHT / 2 + 200}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="23" fill="${WARM_GRAY}"
        letter-spacing="1.5">masih placeholder — ganti sebelum go-live</text>
  <text x="${WIDTH / 2}" y="${HEIGHT - 45}" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${WARM_GRAY}"
        letter-spacing="1">potret 4:5 · minimal ${WIDTH}×${HEIGHT}px</text>
</svg>`;

async function main() {
  // sharp sudah ikut terpasang bersama Next.js untuk optimasi gambar,
  // jadi tidak perlu menambah dependency baru hanya untuk ini.
  const sharp = require("sharp");

  const outDir = path.join(ROOT, "public", "images");
  await mkdir(outDir, { recursive: true });

  // PNG berpalet, bukan JPEG. Gambarnya cuma bidang warna rata, garis, dan
  // teks — persis kasus yang ditangani PNG jauh lebih baik: tidak ada dengung
  // di sekitar huruf, dan berkasnya justru lebih kecil. `palette: true`
  // menguncinya ke ≤256 warna, yang untuk gambar ini tidak terlihat bedanya.
  const png = await sharp(Buffer.from(svg))
    .png({ palette: true, compressionLevel: 9 })
    .toBuffer();
  const outFile = path.join(outDir, OUT_NAME);
  await writeFile(outFile, png);

  console.log(`  ✓ public/images/${OUT_NAME}  ${WIDTH}×${HEIGHT}  ${(png.length / 1024).toFixed(1)} KB`);
  console.log("\nIni gambar sementara. Timpa dengan foto asli (potret 4:5) sebelum go-live.");
}

main().catch((error) => {
  console.error(`\nGagal membuat foto placeholder: ${error.message}`);
  process.exit(1);
});
