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
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // va.vercel-scripts.com = Vercel Analytics & Speed Insights
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
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
