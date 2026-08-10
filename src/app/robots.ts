import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/**
 * robots.txt
 *
 * Semua mesin pencari dipersilakan mengindeks. `/_next/` diblokir karena isinya
 * hanya berkas build — tidak ada gunanya diindeks.
 *
 * CATATAN: file ini TIDAK otomatis memblokir pengindeksan selama isi website
 * masih placeholder. Itu disengaja — pemblokiran diam-diam justru berisiko
 * terbawa sampai setelah go-live dan bikin bingung kenapa website tidak
 * muncul di Google. Pengingat placeholder ditangani oleh kotak peringatan di
 * mode development.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/_next/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
