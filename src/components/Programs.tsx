import { programs, programsSection } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Arrow from "./Arrow";
import Reveal from "./Reveal";

/**
 * Kelas yang diajarkan — empat jalur yang bisa dipilih.
 *
 * TAUTANNYA KE #harga, BUKAN KE WHATSAPP.
 * Pengunjung yang baru membaca kartu kelas belum tahu biayanya, jadi mengajak
 * mereka chat di titik ini memaksa keputusan yang datanya belum lengkap.
 * Menurunkan mereka ke bagian Harga membuat urutannya wajar: pilih jalur,
 * lihat paket, baru chat dari sana.
 *
 * TANPA PENOMORAN 01/02/03.
 * Keempatnya bukan urutan — murid memilih satu yang paling dekat dengan
 * tujuannya, bukan menjalani semuanya berurutan. Memberi nomor akan
 * menyiratkan tahapan yang tidak ada. (Penomoran justru dipakai di bagian
 * "Cara Belajar", karena di sana urutannya memang nyata.)
 */
export default function Programs() {
  return (
    <section id="kelas" className="scroll-mt-24 bg-paper-mid px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow={programsSection.eyebrow}
            hanzi={programsSection.hanzi}
            headline={programsSection.headline}
            intro={programsSection.intro}
          />
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {programs.map((program) => (
            <article
              key={program.id}
              className="flex flex-col border border-warm-gray/30 bg-paper p-7 sm:p-8"
            >
              {/* Penanda kategori dalam Hanzi + pinyin */}
              <p className="flex items-baseline gap-2.5">
                <span className="hanzi text-xl leading-none text-jade" lang="zh-Hans">
                  {program.hanzi}
                </span>
                <span className="pinyin text-sm tracking-wide text-muted">{program.pinyin}</span>
              </p>

              <h3 className="mt-4 font-display text-2xl leading-tight font-normal">
                {program.name}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-ink/75">{program.description}</p>

              <ul className="mt-6 space-y-2.5 border-t border-warm-gray/25 pt-6">
                {program.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    {/* Penanda butir berbentuk goresan pendek, bukan bulatan —
                        meminjam bentuk goresan héng (一). */}
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3 shrink-0 bg-jade"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              {/* mt-auto menjaga tautan tetap rata bawah walau isi kartunya
                  berbeda panjang. */}
              <a
                href="#harga"
                className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-seal transition-opacity duration-200 hover:opacity-75"
              >
                {/* Nama kelasnya ikut dibacakan pembaca layar, supaya keempat
                    tautan ini tidak terdengar sebagai empat "Lihat paket &
                    harga" yang identik tanpa konteks. */}
                <span className="sr-only">{program.name} — </span>
                {programsSection.ctaLabel}
                <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
