import { faq } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * FAQ — akordeon.
 *
 * KENAPA <details>/<summary>, BUKAN AKORDEON BUATAN SENDIRI
 * ---------------------------------------------------------
 * Elemen bawaan HTML ini sudah membawa semuanya tanpa satu baris JavaScript:
 * bisa dibuka dengan Enter atau Spasi, masuk urutan Tab dengan benar, statusnya
 * dibacakan pembaca layar sebagai "expanded/collapsed", dan isinya bisa
 * ditemukan oleh Ctrl+F di browser modern.
 *
 * Akordeon buatan sendiri berarti menulis ulang semua itu dengan aria-expanded,
 * penanganan tombol, dan pengelolaan fokus — dan biasanya ada saja yang
 * terlewat. Untuk website yang hanya butuh buka-tutup, itu pekerjaan sia-sia
 * yang justru menurunkan aksesibilitas.
 *
 * Atribut `name` membuat hanya satu jawaban terbuka pada satu waktu. Di browser
 * lama yang belum mendukungnya, beberapa jawaban bisa terbuka bersamaan — tidak
 * ideal, tapi sama sekali tidak merusak. Itulah bentuk peningkatan bertahap
 * yang benar.
 */
export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-paper-mid px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={faq.eyebrow} hanzi={faq.hanzi} headline={faq.headline} />
        </Reveal>

        <Reveal stagger className="mt-12 border-t border-warm-gray/30">
          {faq.items.map((item) => (
            <details key={item.question} name="faq" className="faq-item border-b border-warm-gray/30">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
                <span className="font-display text-lg leading-snug text-ink sm:text-xl">
                  {item.question}
                </span>

                {/* Penanda buka-tutup: garis mendatar yang bertambah garis
                    tegak saat tertutup, membentuk tanda tambah. */}
                <span
                  aria-hidden="true"
                  className="relative mt-2 block h-4 w-4 shrink-0 text-muted"
                >
                  <span className="absolute top-1/2 left-0 block h-px w-4 bg-current" />
                  <span className="faq-plus absolute top-0 left-1/2 block h-4 w-px bg-current" />
                </span>
              </summary>

              <div className="faq-answer pb-7">
                <p className="max-w-prose text-base leading-relaxed text-ink/75">{item.answer}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
