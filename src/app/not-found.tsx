import type { Metadata } from "next";
import Link from "next/link";
import { nav, site } from "@/lib/content";
import { waLink } from "@/lib/whatsapp";
import MizigeGrid from "@/components/MizigeGrid";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import Arrow from "@/components/Arrow";

/**
 * Halaman 404.
 *
 * Halaman 404 bawaan Next.js berupa teks hitam-putih tanpa gaya sama sekali —
 * pengunjung yang salah ketik alamat akan mengira website-nya rusak atau salah
 * alamat. Halaman ini memakai bahasa dan tampilan yang sama dengan sisa website,
 * lalu mengarahkan kembali ke jalur yang benar.
 *
 * 迷路 (mílù) artinya "tersesat" — dipilih karena masih menyambung dengan gagasan
 * belajar menulis, bukan sekadar angka 404 raksasa.
 */
export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  // Halaman kesalahan tidak layak muncul di hasil pencarian.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="konten"
      className="relative flex min-h-screen items-center overflow-hidden px-5 py-24 sm:px-8"
    >
      <MizigeGrid
        cells={2}
        className="pointer-events-none absolute -top-16 -right-24 w-[30rem] text-warm-gray/25"
        border={false}
      />

      <div className="relative mx-auto w-full max-w-2xl">
        <p className="flex items-center gap-3">
          <span className="hanzi text-lg leading-none text-jade" lang="zh-Hans" aria-hidden="true">
            迷路
          </span>
          <span className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            404
          </span>
        </p>

        <h1 className="mt-5 font-display text-4xl leading-[1.15] font-normal text-balance sm:text-5xl">
          Halaman ini tidak ada.
        </h1>

        <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/75 sm:text-lg">
          Mungkin alamatnya salah ketik, atau halamannya sudah dipindahkan. Semua informasi soal
          kelas, jadwal, dan biaya ada di halaman utama.
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-seal px-7 py-4 font-medium text-paper transition-opacity duration-200 hover:opacity-90"
          >
            Kembali ke halaman utama
            <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href={waLink(nav.ctaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2 text-ink underline decoration-warm-gray/50 underline-offset-[6px] transition-colors duration-200 hover:decoration-ink"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Tanya langsung ke {site.teacherName}
          </a>
        </div>
      </div>
    </main>
  );
}
