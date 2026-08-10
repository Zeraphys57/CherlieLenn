/**
 * 米字格 (mǐzìgé) — kotak latihan menulis Hanzi.
 *
 * Kotak bergaris silang dan diagonal yang dipakai setiap murid untuk berlatih
 * menempatkan goresan. Di website ini bentuk itu dipakai sebagai satu motif
 * yang berulang dengan tenang: bingkai animasi 你好 di hero, bingkai foto guru,
 * dan sesekali sebagai watermark latar.
 *
 * Dipakai secukupnya. Begitu ditempel di mana-mana, maknanya hilang dan
 * berubah jadi hiasan.
 *
 * Komponen ini murni tampilan — selalu `aria-hidden`, tidak pernah membawa
 * informasi yang perlu dibacakan pembaca layar.
 */

type MizigeCellProps = {
  /** Sudut kiri-atas kotak, dalam satuan koordinat SVG induknya. */
  x?: number;
  y?: number;
  /** Panjang sisi kotak. */
  size?: number;
  /** Tampilkan garis tepi kotak. */
  border?: boolean;
  /** Pola putus-putus garis dalam. Beri "" untuk garis utuh. */
  dash?: string;
};

/**
 * Satu kotak 米字格, dikembalikan sebagai <g> supaya bisa ditanam di dalam SVG
 * lain — misalnya SVG yang sama dengan animasi goresan, agar keduanya benar-
 * benar sejajar tanpa perlu menyamakan posisi dua elemen terpisah.
 *
 * Warna garis mengikuti `currentColor`, jadi cukup atur `text-*` di induknya.
 */
export function MizigeCell({
  x = 0,
  y = 0,
  size = 1024,
  border = true,
  dash = "6 7",
}: MizigeCellProps) {
  const right = x + size;
  const bottom = y + size;
  const midX = x + size / 2;
  const midY = y + size / 2;

  // non-scaling-stroke menjaga garis tetap setipis rambut berapa pun SVG
  // diperbesar — ini yang membuat gridnya terbaca sebagai kertas latihan,
  // bukan sebagai kotak tebal yang ikut membesar.
  const line = {
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke" as const,
  };

  return (
    <g aria-hidden="true">
      {border && <rect x={x} y={y} width={size} height={size} fill="none" {...line} />}

      {/* Salib tengah */}
      <line x1={x} y1={midY} x2={right} y2={midY} strokeDasharray={dash} {...line} />
      <line x1={midX} y1={y} x2={midX} y2={bottom} strokeDasharray={dash} {...line} />

      {/* Dua diagonal — inilah yang membuat polanya menyerupai huruf 米 */}
      <line x1={x} y1={y} x2={right} y2={bottom} strokeDasharray={dash} {...line} />
      <line x1={right} y1={y} x2={x} y2={bottom} strokeDasharray={dash} {...line} />
    </g>
  );
}

type MizigeGridProps = {
  /** Banyaknya kotak berjajar mendatar. */
  cells?: number;
  className?: string;
  border?: boolean;
  dash?: string;
};

/**
 * Versi berdiri sendiri: satu <svg> utuh berisi satu baris kotak 米字格.
 * Dipakai untuk bingkai foto dan watermark latar. Untuk hero, gridnya ditanam
 * langsung di SVG animasi lewat <MizigeCell> agar posisinya persis.
 */
export default function MizigeGrid({
  cells = 1,
  className,
  border = true,
  dash = "6 7",
}: MizigeGridProps) {
  const size = 100;
  // Ruang lebih di tepi supaya garis tepi tidak terpotong separuh oleh batas
  // SVG — garisnya digambar tepat di atas batas kotak.
  const pad = 2;

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${size * cells + pad * 2} ${size + pad * 2}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      {Array.from({ length: cells }, (_, index) => (
        <MizigeCell key={index} x={index * size} size={size} border={border} dash={dash} />
      ))}
    </svg>
  );
}
