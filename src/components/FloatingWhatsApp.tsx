"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import WhatsAppIcon from "./WhatsAppIcon";
import WhatsAppLink from "./WhatsAppLink";

/**
 * Tombol WhatsApp melayang di pojok kanan bawah.
 *
 * Dua aturan tampil, keduanya memakai IntersectionObserver dan bukan
 * perhitungan posisi gulir — mengukur elemen langsung jauh lebih tahan banting
 * daripada menebak-nebak angka piksel yang berubah di tiap ukuran layar.
 *
 *   1. Selama hero masih terlihat, tombol ini SEMBUNYI. Di sana sudah ada
 *      tombol WhatsApp yang jauh lebih besar; dua ajakan sekaligus di layar
 *      pertama hanya membuat berisik.
 *
 *   2. Begitu bagian mana pun yang sudah punya ajakan WhatsApp sendiri masuk
 *      layar, tombol ini SEMBUNYI lagi — kalau tidak, ia akan menutupi tombol
 *      besar di bagian itu.
 *
 * Bagian yang dimaksud menandai dirinya sendiri dengan atribut
 * `data-hide-floating-cta`, bukan didaftar satu per satu di sini. Jadi menambah
 * bagian baru yang punya tombol WhatsApp besar — footer, misalnya — cukup
 * dengan menempelkan atribut itu, tanpa menyentuh file ini sama sekali.
 *
 * Kalau elemen acuannya tidak ditemukan, tombol tetap berperilaku masuk akal
 * dan tidak pernah hilang selamanya.
 */
export default function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [inQuietZone, setInQuietZone] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const observers: IntersectionObserver[] = [];

    // Tanpa hero, anggap saja pengunjung sudah melewatinya.
    if (!hero) {
      setPastHero(true);
    } else {
      const heroObserver = new IntersectionObserver(
        ([entry]) => setPastHero(!entry.isIntersecting),
        // Hero dianggap "lewat" begitu tersisa sedikit sekali di layar.
        { threshold: 0.12 },
      );
      heroObserver.observe(hero);
      observers.push(heroObserver);
    }

    const quietZones = document.querySelectorAll("[data-hide-floating-cta]");

    if (quietZones.length > 0) {
      // Beberapa bagian bisa terlihat bersamaan di layar tinggi, jadi yang
      // dilacak adalah himpunan — tombol baru muncul lagi setelah TIDAK ADA
      // satu pun bagian itu yang terlihat.
      const visibleZones = new Set<Element>();

      const zoneObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visibleZones.add(entry.target);
            else visibleZones.delete(entry.target);
          }
          setInQuietZone(visibleZones.size > 0);
        },
        // Sembunyikan sedikit lebih awal, sebelum benar-benar bertumpuk.
        { rootMargin: "0px 0px -80px 0px" },
      );

      quietZones.forEach((zone) => zoneObserver.observe(zone));
      observers.push(zoneObserver);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const visible = pastHero && !inQuietZone;

  return (
    <WhatsAppLink
      message={nav.floatingCtaMessage}
      source="tombol-melayang"
      // Saat tersembunyi, tombol dikeluarkan dari urutan Tab dan dari pembaca
      // layar — kalau hanya dibuat transparan, pengguna keyboard tetap
      // menabraknya sebagai tautan tak terlihat.
      tabIndex={visible ? undefined : -1}
      ariaHidden={visible ? undefined : true}
      // sm:hidden — mulai lebar 640px, tombol WhatsApp di navbar sudah selalu
      // terlihat dan ikut menempel saat digulir. Menampilkan tombol melayang di
      // situ berarti dua tombol persis sama menempel di layar sekaligus.
      // Tombol ini hanya bertugas di layar sempit, tempat tombol navbar
      // disembunyikan.
      className={`fixed right-4 bottom-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-seal text-paper shadow-lg transition-[opacity,transform] duration-300 ease-[var(--ease-quiet)] sm:hidden ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-3 scale-95 opacity-0"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="sr-only">Chat via WhatsApp</span>
    </WhatsAppLink>
  );
}
