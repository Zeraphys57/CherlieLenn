/**
 * Cap stempel (印章 yìnzhāng).
 *
 * Di dunia tulis-menulis Tionghoa, cap merah dibubuhkan sebagai tanda tangan
 * atau tanda persetujuan — pas untuk menutup bagian testimoni.
 *
 * Dipakai SEKALI di satu halaman. Ini satu-satunya tempat --seal muncul
 * sebagai bidang penuh, dan justru itu yang membuatnya bekerja: kalau warna
 * ini dipakai jadi latar lebar di mana-mana, seluruh halaman langsung jatuh ke
 * klise merah-emas yang dihindari desain ini.
 *
 * Hurufnya ditulis menurun, seperti cap sungguhan.
 */

type Props = {
  hanzi: string;
  className?: string;
};

/**
 * Ukuran huruf mengikuti banyaknya karakter, supaya cap tetap terisi rapi baik
 * untuk nama dua huruf maupun empat. Tanpa ini, nama tiga huruf seperti 吳佩蓉
 * akan meluber keluar dari kotaknya.
 */
const SIZE_BY_LENGTH: Record<number, string> = {
  1: "text-3xl sm:text-4xl",
  2: "text-xl sm:text-2xl",
  3: "text-base sm:text-lg",
  4: "text-sm sm:text-base",
};

export default function SealMark({ hanzi, className = "" }: Props) {
  const characters = Array.from(hanzi);
  const size = SIZE_BY_LENGTH[characters.length] ?? "text-sm";

  return (
    <span
      // Sedikit miring supaya terbaca sebagai cap yang dibubuhkan tangan,
      // bukan kotak yang ditempel lurus oleh mesin.
      className={`inline-flex aspect-square w-16 -rotate-6 items-center justify-center rounded-[3px] bg-seal sm:w-[4.5rem] ${className}`}
      aria-hidden="true"
    >
      <span
        className={`hanzi-display leading-tight font-medium tracking-[0.08em] text-paper ${size}`}
        lang="zh-Hant"
        style={{ writingMode: "vertical-rl" }}
      >
        {hanzi}
      </span>
    </span>
  );
}
