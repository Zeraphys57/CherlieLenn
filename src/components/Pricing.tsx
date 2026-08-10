import { pricing, trust } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import WhatsAppIcon from "./WhatsAppIcon";
import WhatsAppLink from "./WhatsAppLink";
import Arrow from "./Arrow";
import Reveal from "./Reveal";

/**
 * Harga / Paket.
 *
 * Mendukung dua pola sekaligus, diatur oleh SATU baris di src/lib/content.ts:
 *
 *   pricing.showPrices = false  ->  harga disembunyikan, diganti
 *                                   "Hubungi untuk harga" (keadaan sekarang)
 *   pricing.showPrices = true   ->  angka di field `price` ditampilkan terbuka
 *
 * Tata letaknya tidak berubah di antara keduanya — hanya isi baris harganya.
 * Jadi guru bisa berpindah pola kapan saja tanpa perlu ada yang mengubah kode.
 *
 * Semua angka harga saat ini masih "[PLACEHOLDER: Rp ___]". Selama
 * showPrices masih false, angka itu tidak terlihat pengunjung — tapi tetap
 * WAJIB diisi sebelum pernah menyalakan showPrices.
 */
export default function Pricing() {
  return (
    <section id="harga" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow={pricing.eyebrow}
            hanzi={pricing.hanzi}
            headline={pricing.headline}
          />
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 md:grid-cols-3 lg:gap-6">
          {pricing.packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`flex flex-col p-7 sm:p-8 ${
                pkg.highlighted
                  ? // Paket yang paling sering diambil ditandai dengan garis
                    // tepi seal — penekanan tipis, bukan blok warna penuh.
                    "border-2 border-seal bg-paper-mid"
                  : "border border-warm-gray/30 bg-paper-mid"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl leading-tight font-normal">{pkg.name}</h3>
                <span className="hanzi text-base leading-none text-jade" lang="zh-Hans">
                  {pkg.hanzi}
                </span>
              </div>

              {/* Baris harga — satu-satunya bagian yang berubah antara kedua pola.
                  `alwaysShowPrice` membuat satu paket bisa membuka harganya
                  sendiri walau yang lain masih tertutup. */}
              <p className="mt-5 border-y border-warm-gray/25 py-5">
                {pricing.showPrices || pkg.alwaysShowPrice ? (
                  <>
                    <span className="font-display text-3xl text-ink">{pkg.price}</span>
                    <span className="mt-1 block text-sm text-muted">{pkg.unit}</span>
                  </>
                ) : (
                  <span className="font-display text-xl text-ink">{pricing.hiddenPriceLabel}</span>
                )}
              </p>

              <p className="mt-5 text-base leading-relaxed text-ink/75">{pkg.description}</p>

              <ul className="mt-6 space-y-2.5">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-jade" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/*
                HANYA PAKET UNGGULAN YANG MEMAKAI TOMBOL ISI.
                Dua paket lain turun jadi tautan teks. Pilihannya tetap
                terbuka — tapi tiga tombol sejajar dengan bobot yang sama
                membuat mata tidak punya pegangan, dan satu-satunya cara
                menyarankan sesuatu adalah dengan menahan yang lain.

                Pembungkus mt-auto pt-8 menjaga tombol rata bawah walau isi
                kartunya berbeda panjang, tanpa menempelkan padding besar ke
                badan tombolnya sendiri.
              */}
              <div className="mt-auto pt-8">
                <WhatsAppLink
                  message={pkg.waMessage}
                  source={`harga:${pkg.id}`}
                  className={
                    pkg.highlighted
                      ? "inline-flex items-center justify-center gap-2.5 rounded-full bg-seal px-6 py-3.5 text-sm font-medium text-paper transition-opacity duration-200 hover:opacity-90"
                      : "group inline-flex items-center gap-2 text-sm font-medium text-seal transition-opacity duration-200 hover:opacity-75"
                  }
                >
                  {pkg.highlighted ? (
                    <>
                      <WhatsAppIcon className="h-4 w-4" />
                      {pkg.ctaLabel}
                    </>
                  ) : (
                    <>
                      {pkg.ctaLabel}
                      <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </WhatsAppLink>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal delay={0.08}>
          {trust.responseTime && (
            <p className="mt-10 inline-flex items-center gap-2 text-sm text-muted">
              <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-jade" />
              {trust.responseTime}
            </p>
          )}
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{pricing.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
