import { story } from "./content";

/**
 * Lama mengajar dalam tahun, dihitung dari `story.teachingSince`.
 *
 * KENAPA DIHITUNG, BUKAN DITULIS
 * ------------------------------
 * Angka pengalaman adalah satu-satunya klaim di website ini yang berubah
 * sendiri seiring waktu. Kalau ditulis tangan, ia mulai berbohong persis satu
 * tahun setelah ditulis — dan berbohongnya ke bawah, mengecilkan pengalaman
 * yang sudah dimiliki.
 *
 * KAPAN ANGKANYA IKUT BERUBAH DI LAYAR
 * ------------------------------------
 * Halaman ini dirender di server, jadi nilainya ditentukan saat halaman
 * dibangun ulang — bukan saat pengunjung membukanya. Supaya tidak menunggu
 * sampai ada yang kebetulan men-deploy, halaman utama memasang `revalidate`
 * harian (lihat src/app/page.tsx). Jadi paling lambat sehari setelah pergantian
 * tahun, angkanya sudah benar tanpa siapa pun menyentuh apa pun.
 */
export function teachingYears(): number {
  const years = new Date().getFullYear() - story.teachingSince;

  // Jaga-jaga kalau `teachingSince` salah ketik jadi tahun depan: lebih baik
  // menampilkan 1 daripada 0 atau angka negatif di kartu kredensial.
  return Math.max(1, years);
}

/** Mengganti token `{tahun}` pada teks kredensial dengan angka sebenarnya. */
export function fillCredential(value: string): string {
  return value.replace("{tahun}", String(teachingYears()));
}
