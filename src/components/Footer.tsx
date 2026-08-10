import { nav, site } from "@/lib/content";

/**
 * Footer.
 *
 * Latarnya tinta, menyambung langsung dari ajakan penutup di atasnya sehingga
 * keduanya terbaca sebagai satu blok penutup, bukan dua pita gelap terpisah.
 *
 * TANPA `data-hide-floating-cta`.
 * Atribut itu dulu ada karena footer punya tautan WhatsApp sendiri. Setelah
 * tautan itu dilepas, footer justru jadi satu-satunya tempat di halaman yang
 * sama sekali tidak punya jalan ke WhatsApp — kalau atributnya dibiarkan,
 * pengunjung mobile yang sudah sampai paling bawah tidak punya cara menghubungi
 * sama sekali. Jadi tombol melayang sengaja dibiarkan muncul di sini.
 */
export default function Footer() {
  const wordmark = site.teacherShortName || site.teacherName;
  const year = new Date().getFullYear();

  // Placeholder ditampilkan apa adanya supaya ketahuan kalau lupa diganti,
  // tapi jangan sampai dibungkus <a href="mailto:[PLACEHOLDER..."> yang rusak.
  const emailReady = !site.email.startsWith("[PLACEHOLDER");
  const instagramReady = !site.instagram.startsWith("[PLACEHOLDER");
  const cityReady = site.city.length > 0 && !site.city.startsWith("[PLACEHOLDER");

  return (
    <footer className="bg-ink px-5 pt-16 pb-10 text-paper sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 border-t border-paper/15 pt-12 md:grid-cols-12 md:gap-8">
          {/* Identitas */}
          <div className="md:col-span-5">
            <p className="flex items-baseline gap-2 font-display text-xl">
              {wordmark}
              {site.teacherNameHanzi && (
                <span className="hanzi text-sm text-paper/60" lang="zh-Hant" aria-hidden="true">
                  {site.teacherNameHanzi}
                </span>
              )}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">{site.tagline}</p>
          </div>

          {/* Tautan halaman */}
          <nav aria-label="Navigasi footer" className="md:col-span-3">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-paper/60">
              Halaman
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-paper/80 transition-colors duration-200 hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div className="md:col-span-4">
            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-paper/60">
              Kontak
            </h2>

            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                {emailReady ? (
                  <a
                    href={`mailto:${site.email}`}
                    className="text-paper/80 transition-colors duration-200 hover:text-paper"
                  >
                    {site.email}
                  </a>
                ) : (
                  <span className="text-paper/60">{site.email}</span>
                )}
              </li>

              <li>
                {instagramReady ? (
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/80 transition-colors duration-200 hover:text-paper"
                  >
                    Instagram
                  </a>
                ) : (
                  <span className="text-paper/60">{site.instagram}</span>
                )}
              </li>

              {cityReady && <li className="text-paper/60">{site.city}</li>}
            </ul>

            {/*
              SENGAJA TANPA WHATSAPP SAMA SEKALI DI SINI.

              Tepat di atas footer sudah ada ajakan penutup berlatar tinta
              dengan permintaan yang persis sama. Dua ajakan dengan tulisan
              sama dalam satu layar tidak menggandakan peluang — malah membuat
              keduanya terasa seperti iklan. Daftar kontak di atas cukup berisi
              email dan Instagram; jalur WhatsApp sudah dipegang tombol penutup
              dan tombol melayang.
            */}
          </div>
        </div>

        <div className="mt-14 border-t border-paper/15 pt-6">
          <p className="text-xs text-paper/60">
            © {year} {wordmark}. Seluruh hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
