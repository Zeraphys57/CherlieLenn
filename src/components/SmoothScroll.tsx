"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

/**
 * Smooth scroll tipis memakai Lenis — hanya untuk memperhalus rasa gulir.
 * Tidak ada scroll-jacking, tidak ada pinning: gulir tetap sepenuhnya
 * dikendalikan pengguna.
 *
 * KENAPA LENIS DAN SCROLLTRIGGER HARUS DIJAHIT DI SINI
 * ----------------------------------------------------
 * Lenis menggulir halaman dengan caranya sendiri. Kalau ScrollTrigger tidak
 * diberi tahu, ia tetap membaca posisi gulir bawaan browser dan animasinya
 * terpicu di titik yang meleset — biasanya terasa "telat" atau malah muncul
 * sebelum bagiannya terlihat.
 *
 * Maka dua hal dijahit di bawah:
 *   1. setiap kali Lenis bergerak, ScrollTrigger ikut diperbarui
 *   2. Lenis dijalankan oleh ticker milik GSAP, bukan requestAnimationFrame
 *      sendiri — supaya keduanya berdetak di frame yang sama persis
 *
 * Saat pengguna meminta pengurangan gerak, Lenis tidak dinyalakan sama sekali
 * dan browser memakai gulir bawaannya. ScrollTrigger tetap bekerja normal di
 * atas gulir bawaan itu.
 */
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Posisi bagian bisa bergeser setelah font dan gambar selesai dimuat.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    }

    const lenis = new Lenis({
      duration: 1.05,
      // Kurva peluruhan lembut, berhenti tanpa memantul.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // GSAP memberi waktu dalam detik, Lenis meminta milidetik.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    // Tanpa ini, GSAP "menahan" waktu setelah frame yang berat dan gulirnya
    // terasa tersendat.
    gsap.ticker.lagSmoothing(0);

    // Klik pada anchor (#kelas, #harga, …) digulirkan oleh Lenis agar
    // gerakannya seragam dengan gulir manual.
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        // Sisakan ruang setinggi navbar sticky di atas judul bagian.
        offset: -(parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.5),
      });
      history.pushState(null, "", href);
    };

    document.addEventListener("click", onAnchorClick);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("load", onLoad);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
