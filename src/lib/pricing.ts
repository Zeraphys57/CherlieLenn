import { pricing } from "./content";

/**
 * Menghitung harga satu paket untuk kombinasi pilihan yang sedang aktif.
 *
 * Rumusnya sengaja tinggal satu baris dan hanya ada di sini. Harga muncul di
 * tiga kartu sekaligus dan ikut berubah tiap kali pengunjung menekan tombol
 * pilihan — kalau perkaliannya ditulis ulang di komponen, cukup satu tempat
 * ketinggalan diperbarui untuk membuat halaman ini menampilkan dua harga
 * berbeda untuk paket yang sama.
 *
 * Angka dasarnya ada di `pricing.basePrices` (src/lib/content.ts), pengalinya
 * di `pricing.axes`. Tidak ada angka yang ditulis di berkas ini.
 */

type AxisId = { jenisKelas: string; durasi: string; format: string };

/** Kunci `basePrices` yang sah — mis. "anak" | "hsk". */
type KelasId = keyof typeof pricing.basePrices;
/** Kunci paket berbayar di dalamnya — mis. "reguler" | "intensif". */
type PaidPackageId = keyof (typeof pricing.basePrices)[KelasId];

const multiplierOf = (
  options: readonly { id: string; multiplier: number }[],
  id: string,
): number => options.find((option) => option.id === id)?.multiplier ?? 1;

/**
 * Rupiah tanpa desimal: "Rp 1.200.000".
 *
 * Memakai Intl, bukan penyisipan titik buatan sendiri, supaya pemisah ribuannya
 * mengikuti kaidah id-ID dan tidak perlu diurus manual.
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    // Intl menempelkan "Rp1.200.000"; satu spasi jauh lebih enak dibaca.
    .replace(/^Rp\s?/, "Rp ");
}

/**
 * Harga akhir sebuah paket, sudah dibulatkan.
 *
 * Mengembalikan `null` kalau paketnya tidak punya harga dasar — itu berarti
 * paket gratis, dan pemanggilnya yang memutuskan mau menulis "Gratis" atau apa.
 */
export function packagePrice(packageId: string, selection: AxisId): number | null {
  const base = pricing.basePrices[selection.jenisKelas as KelasId]?.[packageId as PaidPackageId];
  if (typeof base !== "number") return null;

  const factor =
    multiplierOf(pricing.axes.durasi.options, selection.durasi) *
    multiplierOf(pricing.axes.format.options, selection.format);

  // Dibulatkan ke puluhan ribu terdekat. Hasil perkalian pengali gampang
  // melahirkan angka seperti Rp 1.932.000 yang terbaca seperti salah hitung;
  // tarif les selalu disebut dalam angka bulat.
  return Math.round((base * factor) / 10_000) * 10_000;
}

/** Label harga siap tampil: "Gratis" untuk paket gratis, selain itu rupiah. */
export function packagePriceLabel(
  pkg: { id: string; free: boolean },
  selection: AxisId,
): string {
  if (pkg.free) return "Gratis";
  const amount = packagePrice(pkg.id, selection);
  return amount === null ? pricing.hiddenPriceLabel : formatRupiah(amount);
}

/** Satuan di bawah harga: "sekali sesi" atau "per 8 sesi". */
export function packageUnit(pkg: { sessions: number }): string {
  return pkg.sessions === 1 ? "sekali sesi" : `per ${pkg.sessions} sesi`;
}
