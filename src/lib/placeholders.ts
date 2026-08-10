import * as content from "./content";

/**
 * Menelusuri seluruh isi lib/content.ts dan mengumpulkan setiap teks yang
 * masih berupa "[PLACEHOLDER: ...]".
 *
 * Gate terakhir sebelum go-live mensyaratkan tidak ada satu pun placeholder
 * yang tersisa. Mencarinya dengan mata satu per satu di file sepanjang itu
 * gampang meleset — apalagi yang tersembunyi di dalam array fitur paket harga
 * atau jawaban FAQ. Fungsi ini yang menghitungnya, bukan ingatan.
 *
 * Hanya dipakai oleh peringatan mode development. Tidak pernah ikut ke build
 * production.
 */

export type PlaceholderHit = {
  /** Letaknya di dalam content.ts, mis. "pricing.packages[1].unit" */
  path: string;
  value: string;
};

const MARKER = "[PLACEHOLDER";

export function findPlaceholders(): PlaceholderHit[] {
  const hits: PlaceholderHit[] = [];

  const walk = (value: unknown, path: string) => {
    if (typeof value === "string") {
      if (value.includes(MARKER)) hits.push({ path, value });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }

    if (value && typeof value === "object") {
      for (const [key, nested] of Object.entries(value)) {
        walk(nested, path ? `${path}.${key}` : key);
      }
    }
  };

  for (const [key, value] of Object.entries(content)) {
    if (typeof value === "function") continue;
    walk(value, key);
  }

  return hits;
}
