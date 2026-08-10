/**
 * build-og-image.mjs
 * ----------------------------------------------------------------------------
 * Membuat public/og.jpg — gambar yang muncul saat link website dibagikan di
 * WhatsApp, Instagram, atau Facebook.
 *
 * CARA PAKAI:
 *   npm run og                    (tanpa nama guru)
 *   npm run og -- "Nama Guru"     (nama guru ikut tercetak di gambar)
 *
 * KENAPA 你好 DIGAMBAR DARI DATA GORESAN, BUKAN DIKETIK SEBAGAI TEKS
 * ------------------------------------------------------------------
 * Kalau Hanzi ditulis sebagai teks biasa, hasilnya bergantung pada font
 * Mandarin yang kebetulan terpasang di komputer yang menjalankan skrip ini.
 * Di komputer tanpa font itu, gambar OG-nya jadi berisi kotak-kotak kosong —
 * dan baru ketahuan setelah ada yang membagikan linknya.
 *
 * Dengan memakai bentuk goresan yang sama seperti animasi hero, huruf 你好 di
 * sini murni berupa bentuk geometris. Hasilnya identik di komputer mana pun,
 * tanpa perlu font apa pun.
 *
 * Teks latinnya sendiri memakai font sistem biasa, yang aman di mana saja.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;

const PAPER = "#EFE8DA";
const INK = "#211E1A";
const WARM_GRAY = "#8A8271";
const MUTED = "#676055";
const SEAL = "#A63B2A";

/** Sistem koordinat Make Me a Hanzi: kotak 1024, sumbu Y terbalik, dasar 900. */
const GLYPH_BOX = 1024;
const GLYPH_TRANSFORM = "scale(1, -1) translate(0, -900)";

const CELL = 232; // sisi satu kotak 米字格
const GRID_X = 96;
const GRID_Y = 150;

/**
 * Isi cap nama di pojok — samakan dengan `site.teacherNameHanzi` di
 * src/lib/content.ts. Setiap hurufnya harus ada di paket hanzi-writer-data,
 * karena digambar dari data goresan dan bukan diketik sebagai teks.
 */
const SEAL_TEXT = "吳佩蓉";

/** Satu kotak 米字格. */
function mizige(x, y, size) {
  const r = x + size;
  const b = y + size;
  const mx = x + size / 2;
  const my = y + size / 2;
  const dashed = `stroke="${WARM_GRAY}" stroke-width="1.5" stroke-dasharray="6 7" opacity="0.6"`;

  return `
    <rect x="${x}" y="${y}" width="${size}" height="${size}" fill="none"
          stroke="${WARM_GRAY}" stroke-width="1.5" opacity="0.6"/>
    <line x1="${x}" y1="${my}" x2="${r}" y2="${my}" ${dashed}/>
    <line x1="${mx}" y1="${y}" x2="${mx}" y2="${b}" ${dashed}/>
    <line x1="${x}" y1="${y}" x2="${r}" y2="${b}" ${dashed}/>
    <line x1="${r}" y1="${y}" x2="${x}" y2="${b}" ${dashed}/>`;
}

/** Satu huruf, digambar dari bentuk luar tiap goresannya. */
function glyph(char, x, y, size, fill = INK) {
  const data = require(`hanzi-writer-data/${char}.json`);
  const scale = size / GLYPH_BOX;
  const paths = data.strokes.map((d) => `<path d="${d}" fill="${fill}"/>`).join("");
  return `<g transform="translate(${x}, ${y}) scale(${scale}) ${GLYPH_TRANSFORM}">${paths}</g>`;
}

/**
 * Huruf yang dipusatkan pada titik (0,0) grup induknya.
 *
 * Bentuk huruf tidak mengisi penuh kotak 1024 — ada ruang kosong di tepinya, dan
 * ruang itu tidak simetris. Jadi menaruh huruf di tengah kotak TIDAK membuatnya
 * terlihat di tengah. Titik tengah yang benar dihitung dari kotak batas bentuk
 * hurufnya sendiri.
 */
function glyphCentered(char, size, fill) {
  const data = require(`hanzi-writer-data/${char}.json`);
  const scale = size / GLYPH_BOX;

  // Titik tengah bentuk huruf, diambil dari garis tengah goresannya.
  const points = data.medians.flat();
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const midX = (Math.min(...xs) + Math.max(...xs)) / 2;
  // Sumbu Y terbalik: 900 - y mengembalikannya ke orientasi normal.
  const midY = 900 - (Math.min(...ys) + Math.max(...ys)) / 2;

  return glyph(char, -midX * scale, -midY * scale, size, fill);
}

function buildSvg(teacherName) {
  const chars = ["你", "好"];

  const grids = chars.map((_, i) => mizige(GRID_X + i * CELL, GRID_Y, CELL)).join("");
  const glyphs = chars.map((c, i) => glyph(c, GRID_X + i * CELL, GRID_Y, CELL)).join("");

  const textX = GRID_X;
  const nameLine = teacherName
    ? `<text x="${textX}" y="${GRID_Y + CELL + 168}" font-family="Georgia, 'Times New Roman', serif"
             font-size="34" fill="${MUTED}">${escapeXml(teacherName)}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PAPER}"/>

  ${grids}
  ${glyphs}

  <text x="${textX}" y="${GRID_Y + CELL + 76}" font-family="Arial, Helvetica, sans-serif"
        font-size="21" letter-spacing="3.4" fill="${MUTED}">LES MANDARIN PRIVAT</text>

  <text x="${textX}" y="${GRID_Y + CELL + 132}" font-family="Georgia, 'Times New Roman', serif"
        font-size="46" fill="${INK}">Anak · Dewasa · HSK · Bisnis</text>

  ${nameLine}

  ${seal(WIDTH - 122, HEIGHT - 116)}
</svg>`;
}

/**
 * Cap nama (印章) di pojok — huruf tersusun menurun, seperti cap sungguhan.
 *
 * Kotak dan hurufnya berada dalam satu grup supaya keduanya ikut miring
 * bersama-sama; kalau dipisah, hurufnya melenceng keluar dari kotak.
 */
function seal(x, y) {
  const chars = Array.from(SEAL_TEXT);
  const box = 96;
  const padding = 11;
  const slot = (box - padding * 2) / chars.length;
  // Sedikit lebih kecil dari jatah barisnya, supaya antar huruf tetap bernapas.
  const glyphSize = slot * 0.86;
  const top = -box / 2 + padding + slot / 2;

  const stacked = chars
    .map((c, i) => `<g transform="translate(0, ${top + i * slot})">${glyphCentered(c, glyphSize, PAPER)}</g>`)
    .join("");

  return `<g transform="translate(${x}, ${y}) rotate(-6)">
    <rect x="${-box / 2}" y="${-box / 2}" width="${box}" height="${box}" rx="4" fill="${SEAL}"/>
    ${stacked}
  </g>`;
}

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c],
  );
}

/**
 * Ikon tab browser: cap merah berisi 你.
 *
 * Ditulis sebagai SVG (bukan .ico) karena ukurannya hanya beberapa KB dan tetap
 * tajam di layar kepadatan tinggi. Favicon bawaan Next.js berukuran 26 KB —
 * lebih berat daripada seluruh CSS website ini.
 *
 * Hurufnya tetap digambar dari data goresan, jadi tidak bergantung pada font
 * Mandarin apa pun.
 */
function buildIconSvg() {
  const size = 64;
  const glyph = glyphCentered("你", 46, PAPER);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="10" fill="${SEAL}"/>
  <g transform="translate(${size / 2}, ${size / 2})">${glyph}</g>
</svg>
`;
}

async function main() {
  // Gabungkan semua argumen: npm melepas tanda kutip, jadi nama yang terdiri
  // dari dua kata masuk sebagai dua argumen terpisah.
  const teacherName = process.argv.slice(2).join(" ").trim();
  const sharp = require("sharp");

  const svg = buildSvg(teacherName);
  const outDir = path.join(ROOT, "public");
  await mkdir(outDir, { recursive: true });

  const jpeg = await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer();
  await writeFile(path.join(outDir, "og.jpg"), jpeg);
  console.log(`  ✓ public/og.jpg  ${WIDTH}×${HEIGHT}  ${(jpeg.length / 1024).toFixed(1)} KB`);

  // Next.js App Router otomatis memasang file bernama icon.svg di src/app/
  // sebagai favicon — tidak perlu menulis <link rel="icon"> sendiri.
  const icon = buildIconSvg();
  await writeFile(path.join(ROOT, "src", "app", "icon.svg"), icon, "utf8");
  console.log(`  ✓ src/app/icon.svg  ${(Buffer.byteLength(icon) / 1024).toFixed(1)} KB`);

  // iOS mengabaikan favicon SVG saat halaman disimpan ke layar utama, dan
  // menggantinya dengan tangkapan layar halaman kalau tidak ada apple-icon.
  // Berkas PNG 180×180 ini yang dipakai iOS.
  const appleIcon = await sharp(Buffer.from(icon)).resize(180, 180).png().toBuffer();
  await writeFile(path.join(ROOT, "src", "app", "apple-icon.png"), appleIcon);
  console.log(`  ✓ src/app/apple-icon.png  180×180  ${(appleIcon.length / 1024).toFixed(1)} KB`);

  if (!teacherName) {
    console.log('\n  Nama guru belum ikut tercetak. Jalankan: npm run og -- "Nama Guru"');
  }
}

main().catch((error) => {
  console.error(`\nGagal membuat gambar OG: ${error.message}`);
  process.exit(1);
});
