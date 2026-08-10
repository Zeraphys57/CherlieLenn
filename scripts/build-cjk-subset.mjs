/**
 * build-cjk-subset.mjs
 * ----------------------------------------------------------------------------
 * Membuat file font Mandarin (Hanzi) yang berisi HANYA huruf yang benar-benar
 * dipakai di website ini.
 *
 * KENAPA PERLU:
 *   Font Noto Sans SC / Noto Serif SC yang utuh berukuran ~8 MB karena memuat
 *   puluhan ribu Hanzi. `next/font/google` tidak bisa mengambil bagian Hanzi-nya
 *   (Google hanya menyediakan subset latin/cyrillic/vietnamese lewat jalur itu),
 *   sehingga Hanzi akan muncul sebagai kotak kosong (tofu).
 *
 *   Skrip ini memindai seluruh kode di src/, mengumpulkan setiap Hanzi yang
 *   dipakai, lalu meminta Google Fonts mengirim font yang sudah dipotong pas
 *   sebesar kebutuhan itu saja — hasilnya beberapa KB, bukan megabyte.
 *
 * CARA PAKAI:
 *   npm run fonts:cjk
 *
 * KAPAN HARUS DIJALANKAN ULANG:
 *   Setiap kali menambah teks Hanzi BARU di src/lib/content.ts atau di komponen.
 *   Kalau lupa, huruf yang baru ditambahkan akan tampil sebagai kotak kosong.
 */

import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "src");
const OUT_DIR = path.join(ROOT, "src", "fonts");

/** Huruf yang selalu disertakan, walau belum tentu ada di src/ saat ini. */
const ALWAYS_INCLUDE = [
  "你好", // sapaan hero
  "中文汉语", // "bahasa Mandarin"
  "老师学生课", // guru / murid / kelas
  "，。、·？！：；「」（）", // tanda baca CJK
  "〇一二三四五六七八九十", // angka
].join("");

/**
 * Rentang huruf latin beraksen: Latin Extended-A/B, IPA, diakritik, dan
 * Latin Extended Additional. Di website ini isinya praktis hanya tanda nada
 * pinyin — ā ǎ ǐ ǒ ǔ ǚ é ì ó ù.
 */
const LATIN_EXT_RE = /[Ā-˿Ḁ-ỿ]/gu;

/**
 * Font yang dipotong.
 *
 * Semuanya diperlakukan sama: kumpulkan huruf yang benar-benar dipakai, lalu
 * minta Google mengirim font sebesar itu saja.
 *
 * KENAPA INTER IKUT DIPOTONG DI SINI
 * ----------------------------------
 * Subset `latin-ext` bawaan Google untuk Inter berukuran 83 KB, sementara yang
 * benar-benar dibutuhkan dari sana cuma belasan huruf bertanda nada pinyin.
 * Memuat seluruh blok itu lewat next/font berarti mengirim 83 KB demi dua label
 * berukuran 14px — lebih berat daripada seluruh CSS website ini.
 *
 * Dengan dipotong sendiri, berkasnya tinggal beberapa KB. Huruf latin biasa
 * tetap datang dari Inter versi next/font; browser memilih per karakter lewat
 * susunan font di kelas `.pinyin` (lihat globals.css).
 */
const FONTS = [
  { family: "Noto Serif SC", slug: "NotoSerifSC", weights: [400, 600], charset: "cjk" },
  { family: "Noto Sans SC", slug: "NotoSansSC", weights: [400, 500], charset: "cjk" },
  { family: "Inter", slug: "Inter-latin-ext", weights: [400, 500], charset: "latinExt" },
];

/**
 * Rentang Unicode yang dianggap "huruf CJK".
 * Mencakup Hanzi umum, ekstensi A, tanda baca CJK, dan bentuk fullwidth.
 */
const CJK_RE = /[　-〿㐀-䶿一-鿿豈-﫿＀-￯]/gu;

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".md"]);

/** Kumpulkan semua file sumber di src/ secara rekursif. */
async function collectSourceFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Jangan pindai folder font itu sendiri (berisi binary).
        if (entry.name === "fonts") return [];
        return collectSourceFiles(full);
      }
      return SOURCE_EXTENSIONS.has(path.extname(entry.name)) ? [full] : [];
    }),
  );
  return files.flat();
}

/**
 * Ambil setiap karakter unik dari seluruh kode sumber, dipisahkan menurut
 * jenisnya: Hanzi untuk font Mandarin, huruf beraksen untuk Inter.
 */
async function collectCharacters() {
  const files = await collectSourceFiles(SRC_DIR);
  const cjk = new Set(Array.from(ALWAYS_INCLUDE));
  const latinExt = new Set();

  for (const file of files) {
    const contents = await readFile(file, "utf8");
    for (const match of contents.match(CJK_RE) ?? []) cjk.add(match);
    for (const match of contents.match(LATIN_EXT_RE) ?? []) latinExt.add(match);
  }

  // Urutkan agar hasilnya deterministik: build ulang tanpa perubahan teks
  // menghasilkan file yang identik.
  return {
    cjk: Array.from(cjk).sort().join(""),
    latinExt: Array.from(latinExt).sort().join(""),
  };
}

/**
 * Minta Google Fonts mengirim CSS berisi font yang sudah dipotong ke `text`.
 * User-Agent Chrome wajib, kalau tidak Google mengirim format ttf lawas.
 */
async function fetchSubsetCss(family, weights, text) {
  const url =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, "+")}` +
    `:wght@${weights.join(";")}` +
    `&text=${encodeURIComponent(text)}` +
    `&display=swap`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`Google Fonts menolak permintaan untuk "${family}" (HTTP ${response.status})`);
  }
  return response.text();
}

/**
 * Pasangkan tiap font-weight di CSS dengan URL font-nya.
 *
 * Catatan: URL hasil pemotongan Google berbentuk `/l/font?kit=...` tanpa
 * akhiran `.woff2`, jadi jangan mencocokkan berdasarkan ekstensi file.
 */
function parseFaces(css) {
  const faces = [];
  for (const block of css.split("@font-face").slice(1)) {
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
    const url = block.match(/url\((https:\/\/[^)\s]+)\)/)?.[1];
    if (weight && url) faces.push({ weight: Number(weight), url });
  }
  return faces;
}

async function main() {
  const charsets = await collectCharacters();

  if (!charsets.cjk) {
    console.error("Tidak ada karakter Hanzi yang ditemukan di src/. Tidak ada yang dibuat.");
    process.exit(1);
  }

  console.log(`CJK      (${Array.from(charsets.cjk).length}): ${charsets.cjk}`);
  console.log(`Latin-ext (${Array.from(charsets.latinExt).length}): ${charsets.latinExt}\n`);
  await mkdir(OUT_DIR, { recursive: true });

  const manifest = [];

  for (const { family, slug, weights, charset } of FONTS) {
    const text = charsets[charset];
    if (!text) {
      console.log(`  – ${family}: tidak ada karakter yang perlu dipotong, dilewati`);
      continue;
    }

    const css = await fetchSubsetCss(family, weights, text);
    const faces = parseFaces(css);

    const missing = weights.filter((w) => !faces.some((f) => f.weight === w));
    if (missing.length) {
      throw new Error(`${family}: bobot ${missing.join(", ")} tidak dikirim Google Fonts.`);
    }

    // Google kadang mengirim file yang sama persis untuk beberapa bobot.
    // Simpan sekali saja, lalu pakai ulang file itu untuk bobot berikutnya.
    const downloaded = new Map();

    for (const weight of weights) {
      const { url } = faces.find((f) => f.weight === weight);

      if (downloaded.has(url)) {
        const existing = downloaded.get(url);
        console.log(`  ✓ ${String(weight).padEnd(5)} memakai ulang ${existing.filename}`);
        manifest.push({ family, weight, ...existing });
        continue;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Gagal mengunduh ${family} ${weight} (HTTP ${response.status})`);
      }

      const bytes = Buffer.from(await response.arrayBuffer());
      const filename = `${slug}-subset-${weight}.woff2`;
      await writeFile(path.join(OUT_DIR, filename), bytes);

      const kb = (bytes.length / 1024).toFixed(1);
      console.log(`  ✓ ${filename.padEnd(32)} ${kb.padStart(6)} KB`);

      const record = { filename, bytes: bytes.length };
      downloaded.set(url, record);
      manifest.push({ family, weight, charset, ...record });
    }
  }

  await writeFile(
    path.join(OUT_DIR, "subset-manifest.json"),
    JSON.stringify(
      {
        generatedBy: "scripts/build-cjk-subset.mjs",
        latinExtCharacters: charsets.latinExt,
        characters: charsets.cjk,
        characterCount: Array.from(charsets.cjk).length,
        files: manifest,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  // File yang sama dipakai untuk beberapa bobot — hitung sekali saja.
  const unique = new Map(manifest.map((f) => [f.filename, f.bytes]));
  const total = Array.from(unique.values()).reduce((sum, bytes) => sum + bytes, 0);
  console.log(`\nSelesai. Total ${(total / 1024).toFixed(1)} KB untuk ${unique.size} berkas.`);
}

main().catch((error) => {
  console.error(`\nGagal membuat subset font: ${error.message}`);
  process.exit(1);
});
