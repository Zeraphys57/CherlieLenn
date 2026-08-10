import Image from "next/image";
import { story } from "@/lib/content";
import { fillCredential } from "@/lib/experience";
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
/**
 * Ukuran angka mengikuti panjangnya, seperti `SIZE_BY_LENGTH` di SealMark.
 *
 * Tanpa ini "3" berenang di tengah kotak sementara "20+" mepet ke tepinya, dan
 * kedua kotak jadi terlihat berbeda bobot padahal ukurannya sama. Yang harus
 * seragam bukan ukuran hurufnya, melainkan seberapa penuh kotaknya terisi.
 */
const FIGURE_SIZE_BY_LENGTH: Record<number, string> = {
  1: "text-5xl sm:text-[3.25rem]",
  2: "text-4xl sm:text-[2.75rem]",
  3: "text-3xl sm:text-[2.25rem]",
};

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

            {/*
              Watermark 米字格 yang dulu ada di sini SENGAJA DILEPAS.
              Sekarang gridnya dipakai betulan sebagai bingkai angka, dan dua
              米字格 dalam satu kartu — satu samar di latar, satu berisi angka —
              membuat keduanya saling melemahkan.
            */}
            <div className="border border-warm-gray/30 bg-paper-mid p-7 sm:p-8">
              <dl className="grid grid-cols-2 gap-6 sm:gap-8">
                {story.credentials.map((credential) => {
                  // Ukurannya ditentukan SETELAH {tahun} diganti: angkanya
                  // bertambah sendiri tiap tahun, jadi "3" hari ini bisa jadi
                  // "12" nanti dan butuh ukuran yang lebih kecil.
                  const figure = fillCredential(credential.figure);
                  const figureSize =
                    FIGURE_SIZE_BY_LENGTH[figure.length] ?? "text-2xl sm:text-3xl";

                  return (
                    // flex-col-reverse: <dd> digambar di atas <dt> tanpa
                    // membalik urutan DOM-nya, sehingga pembaca layar tetap
                    // mendengar "tahun mengajar" lalu "3" — istilah dulu, baru
                    // nilainya, seperti daftar definisi yang benar.
                    <div key={credential.caption} className="flex flex-col-reverse gap-3">
                      <dt>
                        <span className="flex items-baseline gap-2">
                          <span className="hanzi text-base leading-none text-jade" lang="zh-Hans">
                            {credential.hanzi}
                          </span>
                          <span className="pinyin text-xs tracking-wide text-muted">
                            {credential.pinyin}
                          </span>
                        </span>
                        <span className="mt-1.5 block text-sm leading-snug text-ink/80">
                          {credential.caption}
                        </span>
                      </dt>

                      {/* Angka di dalam kotak latihan — menggemakan 你好 di hero,
                          di mana huruf juga duduk di dalam 米字格. */}
                      <dd className="relative aspect-square w-full max-w-[6.5rem]">
                        <MizigeGrid className="absolute inset-0 h-full w-full text-warm-gray/45" />
                        <span
                          className={`absolute inset-0 flex items-center justify-center font-display leading-none text-ink ${figureSize}`}
                        >
                          {figure}
                        </span>
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
