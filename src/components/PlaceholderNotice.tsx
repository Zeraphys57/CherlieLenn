import {
  hero,
  PRICES_ARE_PLACEHOLDER,
  WHATSAPP_NUMBER,
  WHATSAPP_NUMBER_IS_PLACEHOLDER,
} from "@/lib/content";
import { siteUrlIsPlaceholder } from "@/lib/site-url";
import { findPlaceholders } from "@/lib/placeholders";

/**
 * Daftar periksa sebelum go-live, HANYA muncul saat menjalankan `npm run dev`.
 *
 * Tujuannya mencegah website terpublikasi dengan data contoh. Isinya dihitung
 * langsung dari lib/content.ts setiap kali halaman dirender, jadi angkanya
 * selalu jujur — tidak ada daftar manual yang bisa ketinggalan diperbarui.
 *
 * Tidak pernah ikut ter-render di build production, jadi pengunjung website
 * tidak akan pernah melihatnya.
 */
export default function PlaceholderNotice() {
  if (process.env.NODE_ENV === "production") return null;

  const hits = findPlaceholders();

  // Dibaca dari penanda tegas di content.ts, bukan ditebak dari nama berkas.
  // Tebakan lamanya membandingkan hero.photo dengan "/images/guru.jpg" — dan
  // karena situsnya sejak awal menunjuk ke .png, syarat itu tidak pernah
  // terpenuhi: peringatannya diam-diam tidak pernah muncul sekali pun.
  const photoIsPlaceholder = hero.photoIsPlaceholder;

  const outstanding =
    hits.length +
    (WHATSAPP_NUMBER_IS_PLACEHOLDER ? 1 : 0) +
    (siteUrlIsPlaceholder ? 1 : 0) +
    (photoIsPlaceholder ? 1 : 0) +
    (PRICES_ARE_PLACEHOLDER ? 1 : 0);

  if (outstanding === 0) return null;

  return (
    <details
      // z-index di atas tombol WhatsApp melayang, dan di pojok berlawanan
      // supaya keduanya tidak pernah bertabrakan.
      className="fixed bottom-0 left-0 z-60 m-3 max-w-sm rounded border-2 border-dashed border-seal bg-paper text-xs leading-relaxed shadow-lg"
    >
      <summary className="cursor-pointer list-none p-3 font-medium text-seal">
        Belum siap go-live — {outstanding} hal perlu diisi
        <span className="ml-1 font-normal text-muted">(klik untuk rincian)</span>
      </summary>

      <div className="max-h-72 space-y-3 overflow-y-auto border-t border-warm-gray/30 p-3">
        {WHATSAPP_NUMBER_IS_PLACEHOLDER && (
          <p className="text-ink">
            <strong className="block">Nomor WhatsApp masih contoh</strong>
            <span className="text-muted">
              Sekarang <code className="font-mono">{WHATSAPP_NUMBER}</code>. Ganti di{" "}
              <code className="font-mono">content.ts</code>, lalu set{" "}
              <code className="font-mono">WHATSAPP_NUMBER_IS_PLACEHOLDER = false</code>.
            </span>
          </p>
        )}

        {siteUrlIsPlaceholder && (
          <p className="text-ink">
            <strong className="block">Alamat website belum diisi</strong>
            <span className="text-muted">
              <code className="font-mono">site.url</code> dipakai untuk Open Graph, sitemap, dan
              JSON-LD.
            </span>
          </p>
        )}

        {PRICES_ARE_PLACEHOLDER && (
          <p className="text-ink">
            <strong className="block">Harga paket masih angka contoh</strong>
            <span className="text-muted">
              Nominal di <code className="font-mono">pricing.packages</code> bukan tarif asli dan
              sekarang TERLIHAT pengunjung. Ganti, lalu set{" "}
              <code className="font-mono">PRICES_ARE_PLACEHOLDER = false</code>.
            </span>
          </p>
        )}

        {photoIsPlaceholder && (
          <p className="text-ink">
            <strong className="block">Foto guru masih gambar sementara</strong>
            <span className="text-muted">
              Timpa <code className="font-mono">public/images/guru.png</code> dengan foto asli
              (potret 4:5), lalu set <code className="font-mono">hero.photoIsPlaceholder = false</code>.
            </span>
          </p>
        )}

        {hits.length > 0 && (
          <div>
            <strong className="block text-ink">{hits.length} teks masih placeholder</strong>
            <ul className="mt-1 space-y-1">
              {hits.map((hit) => (
                <li key={hit.path} className="font-mono text-[11px] text-muted">
                  {hit.path}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </details>
  );
}
