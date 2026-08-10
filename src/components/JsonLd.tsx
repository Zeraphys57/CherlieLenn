import { programs, site } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

/**
 * Structured data (JSON-LD) untuk mesin pencari.
 *
 * Menggambarkan guru sebagai EducationalOrganization, dengan keempat kelas
 * sebagai `hasCourse`. Ini yang memungkinkan Google memahami bahwa halaman ini
 * menawarkan kursus tertentu, bukan sekadar halaman profil.
 *
 * CATATAN SOAL `hasCourseInstance`
 * --------------------------------
 * Google baru menampilkan rich result untuk Course kalau setiap kelas punya
 * `hasCourseInstance` berisi `courseMode` (online/offline) dan beban waktunya.
 * Data itu sengaja BELUM diisi, karena format kelas yang sebenarnya masih
 * placeholder di content.ts — mengarangnya berarti mengirim keterangan palsu ke
 * mesin pencari.
 *
 * Setelah format kelas dipastikan, tambahkan pada tiap Course:
 *
 *   hasCourseInstance: {
 *     "@type": "CourseInstance",
 *     courseMode: "online",              // atau "onsite" / "blended"
 *     courseWorkload: "PT1H",            // durasi satu sesi, format ISO 8601
 *   }
 */
export default function JsonLd() {
  const provider = {
    "@type": "EducationalOrganization",
    "@id": `${siteUrl}/#organisasi`,
    name: site.teacherName,
    url: siteUrl,
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...provider,
        description: site.tagline,
        image: `${siteUrl}/og.jpg`,
        // Nama guru sekaligus nama brand — ini website personal branding.
        founder: {
          "@type": "Person",
          name: site.teacherName,
          // Nama Mandarin membantu mesin pencari mengenali orang yang sama
          // saat namanya ditulis dalam aksara Tionghoa.
          ...(site.teacherNameHanzi ? { alternateName: site.teacherNameHanzi } : {}),
          jobTitle: "Guru Bahasa Mandarin",
        },
        knowsLanguage: ["zh-Hans", "id"],
        ...(site.city.startsWith("[PLACEHOLDER") ? {} : { areaServed: site.city }),
        ...(site.instagram.startsWith("[PLACEHOLDER") ? {} : { sameAs: [site.instagram] }),
        hasCourse: programs.map((program) => ({
          "@type": "Course",
          name: `${program.name} — Les Mandarin`,
          description: program.description,
          inLanguage: "id",
          teaches: "Bahasa Mandarin",
          provider: { "@id": provider["@id"] },
          url: `${siteUrl}/#kelas`,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.teacherName,
        inLanguage: "id",
        publisher: { "@id": provider["@id"] },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify sudah menghasilkan JSON yang sah; ganti "<" supaya
      // tidak ada isi yang bisa menutup tag <script> lebih awal.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
