/**
 * Judul bagian dengan pola yang sama di seluruh halaman:
 *
 *   [汉字] LABEL KECIL
 *   Judul besar dalam Fraunces
 *
 * Hanzi-nya kecil dan berwarna jade — penanda kategori, bukan hiasan. Selalu
 * diberi lang="zh-Hans" supaya pembaca layar berpindah ke suara Mandarin dan
 * tidak mencoba mengeja huruf Tionghoa dengan lafal Indonesia.
 */

type Props = {
  eyebrow: string;
  hanzi: string;
  headline: string;
  /** Kalimat pengantar opsional di bawah judul. */
  intro?: string;
  className?: string;
  /** Naikkan ke h1 hanya kalau bagian ini jadi judul utama halaman. */
  as?: "h2" | "h3";
};

export default function SectionHeading({
  eyebrow,
  hanzi,
  headline,
  intro,
  className = "",
  as: Heading = "h2",
}: Props) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3">
        <span className="hanzi text-lg leading-none text-jade" lang="zh-Hans" aria-hidden="true">
          {hanzi}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
          {eyebrow}
        </span>
      </p>

      <Heading className="mt-5 max-w-[20ch] font-display text-3xl leading-[1.15] font-normal text-balance sm:text-4xl lg:text-[2.6rem]">
        {headline}
      </Heading>

      {intro && (
        <p className="mt-5 max-w-prose text-base leading-relaxed text-ink/75">{intro}</p>
      )}
    </div>
  );
}
