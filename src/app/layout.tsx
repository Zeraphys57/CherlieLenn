import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "@/components/SmoothScroll";
import PlaceholderNotice from "@/components/PlaceholderNotice";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const description =
  "Les Mandarin privat untuk anak, remaja, dewasa, persiapan HSK, dan kebutuhan kerja. " +
  "Materi disusun mengikuti level dan tujuan belajar kamu.";

const title = `${site.teacherName} — ${site.tagline}`;

export const metadata: Metadata = {
  // metadataBase membuat semua path relatif di bawah (og:image, canonical)
  // berubah jadi alamat lengkap secara otomatis.
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${site.teacherName}`,
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.teacherName,
    title,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.teacherName} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  // Warna bilah browser di ponsel, disamakan dengan latar kertas.
  themeColor: "#EFE8DA",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang="id" — isi website berbahasa Indonesia. Penting untuk pembaca layar
    // dan untuk mesin pencari. Potongan Hanzi diberi lang="zh-Hans" per elemen.
    <html lang="id" className={fontVariables}>
      <body className="bg-paper text-ink antialiased">
        <a href="#konten" className="skip-link bg-ink px-4 py-2 text-paper">
          Lewati ke konten utama
        </a>
        <SmoothScroll />
        {children}
        <JsonLd />
        <PlaceholderNotice />

        {/*
          Pengukuran — hanya dipasang saat berjalan di Vercel.

          Analytics    — jumlah pengunjung + event `wa_click` dari tiap tombol
                         WhatsApp (lihat WhatsAppLink.tsx).
          SpeedInsights — Core Web Vitals dari pengunjung sungguhan. Penting,
                         karena angka Lighthouse selama ini hasil simulasi;
                         yang benar-benar menentukan adalah pengalaman pengguna
                         nyata di jaringan Indonesia.

          Keduanya tanpa cookie dan tanpa data pribadi, jadi tidak memerlukan
          banner persetujuan.

          KENAPA DIPAGARI process.env.VERCEL
          ----------------------------------
          Skrip keduanya disajikan oleh Vercel dari /_vercel/... — alamat yang
          tidak ada di komputer sendiri. Kalau tetap dipasang saat menjalankan
          `npm start` di lokal, hasilnya dua permintaan 404 dan error di konsol
          yang menurunkan skor Lighthouse Best Practices ke 96, padahal tidak
          ada yang rusak. Dipagari begini, hasil pengukuran lokal jujur dan di
          Vercel keduanya menyala otomatis.
        */}
        {process.env.VERCEL === "1" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
