import type { MetadataRoute } from "next";
import { CONTENT_LAST_UPDATED } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

/**
 * sitemap.xml
 *
 * Website ini satu halaman penuh, jadi isinya memang hanya satu entri. Bagian
 * seperti #kelas dan #harga sengaja TIDAK didaftarkan: fragment (#) bukan
 * halaman terpisah, dan mendaftarkannya justru dianggap duplikat oleh mesin
 * pencari.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      // Diambil dari CONTENT_LAST_UPDATED, bukan tanggal build — lihat
      // penjelasannya di lib/content.ts.
      lastModified: new Date(CONTENT_LAST_UPDATED),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
