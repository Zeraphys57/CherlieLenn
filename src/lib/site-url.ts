import { site } from "./content";

/**
 * Menentukan alamat website yang dipakai metadata, Open Graph, sitemap, dan
 * JSON-LD.
 *
 * KENAPA TIDAK LANGSUNG MEMAKAI site.url
 * --------------------------------------
 * Selama belum diisi, `site.url` masih berbunyi "[PLACEHOLDER: ...]". Nilai itu
 * bukan URL yang sah, dan `new URL()` di dalam metadataBase akan melempar error
 * sehingga BUILD GAGAL TOTAL. Jadi nilainya harus disaring lebih dulu.
 *
 * Urutan sumber alamat, dari yang paling diutamakan:
 *   1. site.url di lib/content.ts — kalau sudah diisi alamat sungguhan
 *   2. NEXT_PUBLIC_SITE_URL — environment variable, berguna untuk staging
 *   3. Alamat produksi bawaan Vercel — terisi otomatis saat deploy
 *   4. Alamat cadangan, supaya build tetap jalan di komputer sendiri
 */

const FALLBACK_URL = "https://example.com";

/** True selama alamat aslinya belum diisi di lib/content.ts. */
export const siteUrlIsPlaceholder = site.url.trim().startsWith("[PLACEHOLDER");

function resolveSiteUrl(): string {
  if (!siteUrlIsPlaceholder) return site.url.trim().replace(/\/+$/, "");

  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");

  const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (fromVercel) return `https://${fromVercel.replace(/\/+$/, "")}`;

  return FALLBACK_URL;
}

export const siteUrl = resolveSiteUrl();
