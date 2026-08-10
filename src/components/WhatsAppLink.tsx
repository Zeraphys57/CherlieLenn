"use client";

import { track } from "@vercel/analytics";
import { waLink } from "@/lib/whatsapp";

/**
 * Satu-satunya cara membuat tombol/tautan WhatsApp di website ini.
 *
 * KENAPA HARUS LEWAT SATU KOMPONEN
 * --------------------------------
 * Ada belasan ajakan WhatsApp yang tersebar di halaman. Kalau masing-masing
 * ditulis sebagai <a> sendiri, tiga hal gampang meleset: `rel="noopener"` lupa
 * dipasang, pesan otomatisnya salah tempel, dan — yang paling merugikan —
 * kliknya tidak terhitung.
 *
 * PENGUKURAN
 * ----------
 * Setiap klik dikirim sebagai event `wa_click` beserta `source`, yaitu penanda
 * tombol mana yang diklik: "hero", "kartu-kelas:hsk", "harga:reguler",
 * "tombol-melayang", dan seterusnya.
 *
 * Tanpa ini, yang bisa diketahui cuma "ada X pengunjung". Dengan ini, bisa
 * dijawab pertanyaan yang benar-benar menentukan: ajakan mana yang menghasilkan
 * percakapan, dan mana yang cuma memenuhi layar. Tombol melayang, misalnya,
 * hanya layak dipertahankan kalau memang ada yang mengkliknya.
 *
 * Vercel Analytics tidak memakai cookie dan tidak menyimpan data pribadi, jadi
 * tidak perlu banner persetujuan.
 */

type Props = {
  /** Pesan yang sudah terisi otomatis di WhatsApp. */
  message: string;
  /**
   * Penanda asal klik untuk laporan analytics.
   * Pakai penamaan yang konsisten: "hero", "kelas:hsk", "harga:reguler".
   */
  source: string;
  className?: string;
  children: React.ReactNode;
  /** Dipakai tombol melayang untuk keluar dari urutan Tab saat tersembunyi. */
  tabIndex?: number;
  ariaHidden?: boolean;
};

export default function WhatsAppLink({
  message,
  source,
  className,
  children,
  tabIndex,
  ariaHidden,
}: Props) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("wa_click", { source })}
      className={className}
      tabIndex={tabIndex}
      aria-hidden={ariaHidden}
    >
      {children}
    </a>
  );
}
