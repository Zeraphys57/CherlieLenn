import { howItWorks } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * Cara Belajar — tiga langkah berurutan.
 *
 * SENGAJA TANPA TOMBOL WHATSAPP DI SINI — lihat catatan di howItWorks
 * (src/lib/content.ts) untuk alasannya.
 *
 * DI SINI PENOMORAN MEMANG BENAR.
 * Berbeda dengan kartu kelas, ketiga langkah ini betul-betul berurutan:
 * ngobrol dulu, baru trial, baru belajar rutin. Nomornya menyampaikan
 * informasi nyata — bahwa tidak ada yang perlu dibayar atau diputuskan
 * sebelum mencoba.
 *
 * Angkanya dibuat besar dalam Fraunces dan diikat garis tipis, supaya terbaca
 * sebagai urutan waktu, bukan sekadar hiasan angka.
 */
export default function HowItWorks() {
  return (
    <section id="cara-belajar" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow={howItWorks.eyebrow}
            hanzi={howItWorks.hanzi}
            headline={howItWorks.headline}
          />
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl leading-none text-jade" aria-hidden="true">
                  {/* Ditulis 01, 02, 03 — dua digit terbaca lebih tenang
                      daripada satu digit yang menggantung sendirian. */}
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Garis penghubung antar langkah, hanya di layar lebar.
                    Langkah terakhir tidak diberi garis supaya urutannya
                    terasa benar-benar selesai. */}
                {index < howItWorks.steps.length - 1 && (
                  <span aria-hidden="true" className="hidden h-px flex-1 bg-warm-gray/35 md:block" />
                )}
              </div>

              <h3 className="mt-5 font-display text-xl leading-tight font-normal">{step.title}</h3>

              <p className="mt-3 max-w-prose text-base leading-relaxed text-ink/75">
                {step.description}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
