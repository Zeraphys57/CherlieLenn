import { WHATSAPP_NUMBER } from "./content";

/**
 * Membuat link WhatsApp berisi pesan yang sudah terisi otomatis.
 *
 * Seluruh tombol WhatsApp di website memakai fungsi ini, sehingga nomor
 * tujuan hanya ditulis di satu tempat (WHATSAPP_NUMBER di lib/content.ts).
 *
 * @param message Teks yang sudah tertulis di kolom chat saat WhatsApp terbuka.
 *                Beri pesan yang berbeda per konteks (hero, tiap kartu program,
 *                tiap paket harga) supaya guru langsung tahu asal chat-nya.
 */
export function waLink(message: string): string {
  // Nomor harus hanya angka: wa.me menolak spasi, tanda "+", dan tanda hubung.
  const number = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
