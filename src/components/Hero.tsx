import Image from "next/image";
import { hero, site, trust } from "@/lib/content";
import NiHaoStroke from "./NiHaoStroke";
import MizigeGrid from "./MizigeGrid";
import WhatsAppIcon from "./WhatsAppIcon";
import WhatsAppLink from "./WhatsAppLink";
import Arrow from "./Arrow";

/**
 * Hero — gurunya yang menyapa lebih dulu.
 *
 * Urutan DOM-nya sengaja: 你好 → foto → teks. Di layar kecil urutan itu
 * ditumpuk apa adanya, sehingga wajah gurunya muncul lebih awal — hal yang
 * penting untuk website personal branding. Di layar lebar, grid CSS memindah
 * foto ke kolom kanan tanpa perlu mengubah urutan DOM, jadi pembaca layar dan
 * pengguna keyboard tetap menemui isinya dalam urutan yang masuk akal.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 sm:px-8 lg:pb-28"
      style={{ paddingTop: "calc(var(--nav-height) + 2.5rem)" }}
    >
      <div className="mx-auto grid max-w-6xl gap-x-12 lg:grid-cols-12">
        {/* --- Momen tanda tangan: 你好 yang menulis dirinya sendiri --- */}
        <div className="lg:col-span-7 lg:row-start-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            {hero.eyebrow}
          </p>

          <NiHaoStroke className="mt-6 w-[min(100%,20rem)] text-ink sm:w-[24rem] lg:w-[27rem]" />

          {/* Pinyin memakai Inter, bukan Fraunces — Fraunces disediakan untuk
              ukuran besar saja, dan gaya miringnya berbiaya ±43 KB. */}
          <p className="pinyin mt-3 text-sm tracking-wide text-muted">{hero.pinyin}</p>
        </div>

        {/* --- Foto guru, diletakkan di atas kertas latihan --- */}
        <figure className="relative mt-12 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center">
          {/* 米字格 yang mengintip di belakang foto — bingkai, bukan hiasan
              tempelan. Dibiarkan persegi supaya diagonalnya tetap 45°. */}
          <MizigeGrid className="absolute -bottom-5 -left-5 w-2/3 text-warm-gray/50 sm:-bottom-7 sm:-left-7" />

          {/* Bingkai persegi, mengikuti foto aslinya yang 1:1 — sekaligus
              menggemakan bentuk kotak 米字格 di belakangnya. Kalau foto diganti
              dengan potret 4:5, ubah ke aspect-[4/5] agar tidak terpotong. */}
          <div className="relative aspect-square w-full overflow-hidden bg-paper-mid">
            <Image
              src={hero.photo}
              alt={hero.photoAlt}
              fill
              // Foto ini hampir pasti elemen terbesar yang pertama terlihat,
              // jadi jangan sampai ditunda pemuatannya.
              priority
              // `sizes` harus memperhitungkan padding halaman. Menulis 100vw
              // begitu saja membuat browser meminta berkas satu tingkat lebih
              // besar daripada yang benar-benar ditampilkan.
              sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) calc(100vw - 4rem), 40vw"
              // Foto potret pada ukuran tampil segini masih bersih di 72;
              // bawaannya 75 dan selisih berkasnya terasa untuk elemen LCP.
              quality={72}
              className="object-cover"
            />
          </div>
        </figure>

        {/* --- Perkenalan dan ajakan --- */}
        <div className="lg:col-span-7 lg:row-start-2 lg:self-start">
          <p className="mt-12 text-base text-muted lg:mt-10">
            {hero.greeting}{" "}
            <span className="font-medium text-ink">{site.teacherName}</span>
            {hero.showNameHanzi && site.teacherNameHanzi && (
              <>
                {" "}
                <span className="hanzi text-ink/70" lang="zh-Hant">
                  {site.teacherNameHanzi}
                </span>
              </>
            )}
            , {hero.role}.
          </p>

          <h1 className="mt-4 max-w-[19ch] font-display text-4xl leading-[1.1] font-normal text-balance sm:text-5xl lg:text-[3.4rem]">
            {hero.headline}
          </h1>

          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink/75 sm:text-lg">
            {hero.subheadline}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5">
            <WhatsAppLink
              message={hero.ctaMessage}
              source="hero"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-seal px-7 py-4 font-medium text-paper transition-opacity duration-200 hover:opacity-90"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {hero.ctaLabel}
            </WhatsAppLink>

            <a
              href={hero.secondaryCtaHref}
              className="group inline-flex items-center justify-center gap-2 py-2 text-ink underline decoration-warm-gray/50 underline-offset-[6px] transition-colors duration-200 hover:decoration-ink"
            >
              {hero.secondaryCtaLabel}
              <Arrow
                direction="down"
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </a>
          </div>

          {/* Penenang keraguan, tepat di bawah tombol — bukan di FAQ paling
              bawah yang mungkin tidak pernah dibaca.

              KEDUANYA MEMAKAI TITIK JADE, bukan cuma yang pertama.
              Ini dua keterangan yang berdiri sendiri, bukan satu kalimat yang
              disambung. Tanpa penanda di butir kedua, keduanya menempel jadi
              "Biasanya dibalas di bawah 1 jam Kelas trial gratis" — jarak 1rem
              saja tidak cukup memberi tahu mata di mana yang satu berakhir. */}
          {(trust.responseTime || trust.trialNote) && (
            <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-muted">
              {[trust.responseTime, trust.trialNote]
                .filter(Boolean)
                .map((note) => (
                  <span key={note} className="inline-flex items-center gap-2">
                    <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-jade" />
                    {note}
                  </span>
                ))}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
