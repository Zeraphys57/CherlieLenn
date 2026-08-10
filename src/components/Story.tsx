import Image from "next/image";
import { story } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import MizigeGrid from "./MizigeGrid";
import Reveal from "./Reveal";

/**
 * Cerita Saya — bagian yang menjelaskan kenapa orang ini layak dipercaya
 * mengajar, bukan sekadar daftar gelar.
 *
 * Foto kedua sifatnya opsional (`story.photo` boleh null). Kalau tidak ada,
 * kolom kanannya tetap berisi kredensial dan tidak terlihat bolong — kartu
 * kredensialnya sendiri yang jadi jangkar visual, dengan 米字格 samar sebagai
 * latarnya.
 */
export default function Story() {
  return (
    <section id="cerita" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow={story.eyebrow}
            hanzi={story.hanzi}
            headline={story.headline}
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Bio */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="space-y-5">
              {story.bio.map((paragraph, index) => (
                <p key={index} className="max-w-prose text-base leading-relaxed text-ink/80 sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/*
              SENGAJA TANPA TOMBOL WHATSAPP DI SINI.

              Orang yang sedang membaca cerita guru belum berada di titik
              memutuskan — mereka masih menimbang, dan tombol utama sudah ada
              satu layar di atas. Menaruh ajakan di sini cuma menambah tombol
              yang mirip, bukan menambah percakapan. Ajakannya menunggu sampai
              pengunjung melihat kelas dan harganya.
            */}
          </Reveal>

          {/* Foto opsional + kredensial */}
          <Reveal className="lg:col-span-5" delay={0.12}>
            {story.photo && (
              <figure className="relative mb-8">
                <MizigeGrid className="absolute -top-4 -right-4 w-1/2 text-warm-gray/50" />
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-mid">
                  <Image
                    src={story.photo}
                    alt={story.photoAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            )}

            <div className="relative overflow-hidden border border-warm-gray/30 bg-paper-mid p-7 sm:p-8">
              {/* Watermark 米字格 — sangat samar, sekadar mengingatkan kertas latihan. */}
              <MizigeGrid
                className="pointer-events-none absolute -right-8 -bottom-10 w-40 text-warm-gray/25"
                border={false}
              />

              <dl className="relative space-y-5">
                {story.credentials.map((credential) => (
                  <div key={credential.label}>
                    <dt className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                      {credential.label}
                    </dt>
                    <dd className="mt-1.5 text-base leading-snug text-ink">{credential.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
