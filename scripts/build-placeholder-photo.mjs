/**
 * build-placeholder-photo.mjs
 * ----------------------------------------------------------------------------
 * Membuat foto sementara di public/images/guru.jpg supaya tata letak hero bisa
 * dikerjakan dan diperiksa sebelum foto asli tersedia.
 *
 * Gambarnya sengaja dibuat jelas-jelas sebagai penanda kosong: memakai warna
 * kertas dari palet, bergaris 米字格, dan bertuliskan "FOTO GURU". Tidak
 * mungkin tertukar dengan foto sungguhan kalau sampai lupa diganti.
 *
 * CARA PAKAI:
 *   npm run placeholder:photo
 *
 * MENGGANTI DENGAN FOTO ASLI:
 *   Timpa saja public/images/guru.jpg dengan foto aslinya — rasio potret 4:5,
 *   minimal 800×1000px. Tidak ada kode yang perlu diubah.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 800;
const HEIGHT = 1000;

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

  const jpeg = await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toBuffer();
  const outFile = path.join(outDir, "guru.jpg");
  await writeFile(outFile, jpeg);

  console.log(`  ✓ public/images/guru.jpg  ${WIDTH}×${HEIGHT}  ${(jpeg.length / 1024).toFixed(1)} KB`);
  console.log("\nIni gambar sementara. Timpa dengan foto asli (potret 4:5) sebelum go-live.");
}

main().catch((error) => {
  console.error(`\nGagal membuat foto placeholder: ${error.message}`);
  process.exit(1);
});
