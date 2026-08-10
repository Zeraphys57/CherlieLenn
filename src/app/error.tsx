"use client";

import { useEffect } from "react";
import { nav, site } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

/**
 * Batas penangkap galat (error boundary).
 *
 * Kalau ada komponen yang gagal saat berjalan di browser, tanpa berkas ini
 * pengunjung akan melihat layar galat mentah bawaan Next.js — latar putih,
 * teks hitam, dan sama sekali tidak terlihat seperti website ini. Untuk calon
 * murid, itu terbaca sebagai "website-nya rusak" dan mereka langsung pergi.
 *
 * Di sini yang tampil tetap memakai bahasa dan tampilan yang sama, dan yang
 * terpenting: jalur ke WhatsApp tetap terbuka. Sekalipun halamannya bermasalah,
 * calon murid masih bisa menghubungi Cherlie — dan itulah satu-satunya tugas
 * website ini.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Tercatat di log runtime Vercel, lengkap dengan `digest` untuk penelusuran.
    console.error("Terjadi galat saat merender halaman:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center px-5 py-24 sm:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
          Ada yang tidak beres
        </p>

        <h1 className="mt-5 font-display text-4xl leading-[1.15] font-normal text-balance sm:text-5xl">
          Maaf, halamannya gagal dimuat.
        </h1>

        <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/75 sm:text-lg">
          Coba muat ulang sebentar. Kalau masih bermasalah, kamu tetap bisa langsung menghubungi{" "}
          {site.teacherName} lewat WhatsApp — pertanyaan apa pun soal kelas bisa dijawab di sana.
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-seal px-7 py-4 font-medium text-paper transition-opacity duration-200 hover:opacity-90"
          >
            Coba muat ulang
          </button>

          <a
            href={waLink(nav.ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2 text-ink underline decoration-warm-gray/50 underline-offset-[6px] transition-colors duration-200 hover:decoration-ink"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
