import { site, testimonials, testimonialsSection } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import SealMark from "./SealMark";
import Reveal from "./Reveal";

/**
 * ⚠️⚠️  BAGIAN INI MASIH MEMAKAI TESTIMONI CONTOH  ⚠️⚠️
 *
 * TODO: replace with real testimonial — isi array `testimonials` di
 * src/lib/content.ts masih berupa teks contoh untuk menguji tata letak.
 * Semuanya WAJIB diganti testimoni asli dari murid, lengkap dengan izin
 * memakai nama atau inisial mereka, SEBELUM website dipublikasikan.
 *
 * Teks contohnya sengaja ditulis sebagai "[PLACEHOLDER: ...]" dan bukan
 * kalimat pujian yang terdengar meyakinkan. Kalau lupa diganti, yang terlihat
 * di layar adalah tanda kurung siku yang mencolok — bukan testimoni palsu yang
 * diam-diam lolos ke publik dan menipu calon murid.
 */
export default function Testimonials() {
  return (
    <section className="bg-paper-mid px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-start justify-between gap-6">
            <SectionHeading
              eyebrow={testimonialsSection.eyebrow}
              hanzi={testimonialsSection.hanzi}
              headline={testimonialsSection.headline}
            />
            {/* Cap merah — satu-satunya di halaman ini, berisi nama Mandarin
                guru, persis seperti cap nama Tionghoa sungguhan. */}
            {site.teacherNameHanzi && (
              <SealMark hanzi={site.teacherNameHanzi} className="mt-1 shrink-0" />
            )}
          </div>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <figure
              key={index}
              className="flex flex-col border border-warm-gray/30 bg-paper p-7 sm:p-8"
            >
              <blockquote className="flex-1">
                {/* Tanda kutip pembuka sebagai penanda visual, bukan huruf yang
                    perlu dibacakan pembaca layar. */}
                <span
                  aria-hidden="true"
                  className="block font-display text-4xl leading-none text-jade/50"
                >
                  &ldquo;
                </span>
                <p className="mt-3 text-base leading-relaxed text-ink/85">{testimonial.quote}</p>
              </blockquote>

              <figcaption className="mt-7 border-t border-warm-gray/25 pt-5">
                <span className="block text-sm font-medium text-ink">{testimonial.name}</span>
                <span className="mt-0.5 block text-sm text-muted">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
