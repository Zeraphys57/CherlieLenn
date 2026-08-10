import type { NextConfig } from "next";

/**
 * Header keamanan.
 *
 * Website ini statis dan tidak menerima masukan dari pengunjung, jadi
 * risikonya memang kecil — tapi header di bawah gratis dan menutup beberapa
 * celah yang nyata: penyisipan skrip dari domain lain, penyematan halaman ini
 * di dalam iframe milik orang lain (clickjacking), dan kebocoran alamat
 * halaman ke situs pihak ketiga.
 *
 * Catatan soal CSP: `'unsafe-inline'` pada script-src masih diperlukan karena
 * Next.js menyisipkan data hidrasi sebagai skrip inline. Menghapusnya butuh
 * nonce per permintaan, yang berarti halaman tidak bisa lagi disajikan sebagai
 * berkas statis — harga yang tidak sepadan untuk website semacam ini.
 *
 * `'unsafe-eval'` HANYA DI MODE DEV — JANGAN pernah dibawa ke produksi.
 * Hot reload Next.js (react-refresh) mengevaluasi kode sebagai string. Tanpa
 * izin ini, berkasnya gagal dimuat dan React tidak pernah menghidrasi halaman:
 * seluruh isi tetap terlihat karena sudah dirender server, tapi TIDAK ADA satu
 * pun tombol yang bereaksi. Gejalanya menyesatkan — halaman tampak sehat, cuma
 * mati total saat diklik — jadi jangan buang-buang waktu mencurigai komponennya
 * kalau ini terjadi lagi. Build produksi tidak memakai react-refresh, jadi
 * kebijakannya di sana tetap ketat.
 */
const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  // va.vercel-scripts.com = Vercel Analytics & Speed Insights
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // ws: hanya di dev — saluran hot reload Next.js. Produksi tidak memakainya.
  `connect-src 'self'${isDev ? " ws:" : ""} https://va.vercel-scripts.com https://vitals.vercel-insights.com`,
  // Semua tombol WhatsApp membuka wa.me di tab baru.
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Jangan biarkan browser menebak-nebak tipe berkas.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Jangan bocorkan alamat lengkap halaman ke situs lain.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Tidak ada fitur perangkat yang dibutuhkan website ini.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Selalu paksa HTTPS setelah kunjungan pertama.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  images: {
    /**
     * Tawarkan AVIF lebih dulu, WebP sebagai cadangan.
     *
     * Foto guru adalah elemen LCP di halaman ini, jadi setiap kilobyte-nya
     * langsung terasa di angka LCP. AVIF biasanya 20–30% lebih kecil daripada
     * WebP pada kualitas yang setara. Browser yang belum mendukungnya otomatis
     * menerima WebP, jadi tidak ada yang dirugikan.
     *
     * Konsekuensinya: proses encode pertama lebih lambat. Di Vercel hasilnya
     * disimpan di cache, jadi hanya pengunjung pertama yang menunggu.
     */
    formats: ["image/avif", "image/webp"],

    /**
     * Daftar putih nilai `quality` yang boleh dipakai komponen <Image>.
     *
     * Sejak Next.js 16 ini wajib — nilai yang tidak terdaftar akan ditolak.
     * 72 dipakai foto guru di hero (lihat Hero.tsx); 75 adalah bawaan Next
     * untuk gambar lain yang mungkin ditambahkan nanti.
     */
    qualities: [72, 75],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
