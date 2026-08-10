import { finalCta } from "@/lib/content";
import WhatsAppIcon from "./WhatsAppIcon";
import WhatsAppLink from "./WhatsAppLink";
import MizigeGrid from "./MizigeGrid";
import Reveal from "./Reveal";

/**
 * Ajakan penutup — kesempatan terakhir sebelum halaman habis.
 *
 * Satu-satunya bagian berlatar gelap. Setelah sekian layar berwarna kertas,
 * pergantian ke tinta membuat bagian ini berhenti sendiri di mata tanpa perlu
 * dibuat berwarna mencolok.
 *
 * Atribut `data-hide-floating-cta` bukan sekadar penanda: tombol WhatsApp
 * melayang mengawasinya dan menyembunyikan diri selama bagian ini terlihat,
 * supaya dua ajakan yang sama tidak saling menimpa. Bagian lain yang punya
 * tombol WhatsApp besar cukup memakai atribut yang sama.
 */
export default function FinalCta() {
  return (
    <section
      id="cta-akhir"
      data-hide-floating-cta
      className="relative overflow-hidden bg-ink px-5 py-24 sm:px-8 lg:py-28"
    >
      {/* Kertas latihan samar — motif yang sama, kali ini di atas tinta. */}
      <MizigeGrid
        cells={3}
        className="pointer-events-none absolute -top-10 -right-16 w-[26rem] text-paper/10"
        border={false}
      />

      <Reveal className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span
            className="hanzi-display text-3xl text-paper/45"
            lang="zh-Hans"
            aria-hidden="true"
          >
            {finalCta.hanzi}
          </span>

          <h2 className="mt-5 font-display text-3xl leading-[1.15] font-normal text-balance text-paper sm:text-4xl lg:text-[2.6rem]">
            {finalCta.headline}
          </h2>

          <p className="mt-5 max-w-prose text-base leading-relaxed text-paper/70 sm:text-lg">
            {finalCta.body}
          </p>

          <WhatsAppLink
            message={finalCta.ctaMessage}
            source="cta-akhir"
            className="mt-9 inline-flex items-center justify-center gap-2.5 rounded-full bg-paper px-7 py-4 font-medium text-ink transition-opacity duration-200 hover:opacity-90"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {finalCta.ctaLabel}
          </WhatsAppLink>
        </div>
      </Reveal>
    </section>
  );
}
