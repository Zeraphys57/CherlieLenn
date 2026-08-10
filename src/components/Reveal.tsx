"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Pemunculan halus saat bagian tergulir masuk layar: naik sedikit sambil
 * memudar masuk, sekali saja.
 *
 * Sengaja dibuat tenang. Tidak ada scrub, tidak ada pin, tidak ada parallax —
 * ini website konversi, bukan pertunjukan. Gerakannya hanya bertugas menuntun
 * mata ke bawah.
 *
 * KEADAAN AWAL DAN NO-JS
 * ----------------------
 * Sama seperti animasi 你好: hasil render server sudah TERLIHAT PENUH.
 * Penyembunyian baru dilakukan oleh `gsap.from()` di dalam useLayoutEffect,
 * yaitu sebelum browser sempat melukis frame pertama.
 *
 * Jadi kalau JavaScript gagal dimuat, atau pengguna meminta pengurangan gerak,
 * seluruh isi halaman tetap terbaca — bukan halaman kosong yang menunggu
 * animasi yang tidak akan pernah datang. Ini kesalahan paling sering pada pola
 * reveal, dan paling mahal akibatnya.
 */

type Props = {
  children: React.ReactNode;
  className?: string;
  /**
   * Munculkan anak-anak langsung satu per satu, bukan seluruh pembungkusnya
   * sekaligus. Dipakai untuk grid kartu.
   */
  stagger?: boolean;
  /** Jeda sebelum mulai, dalam detik. */
  delay?: number;
};

export default function Reveal({ children, className, stagger = false, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Hormati preferensi sistem: biarkan semuanya terlihat, tanpa gerak.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const targets = stagger ? Array.from(element.children) : element;
    if (Array.isArray(targets) && targets.length === 0) return;

    // gsap.context menampung semua tween di dalamnya, sehingga satu panggilan
    // revert() saat unmount sudah membersihkan tween sekaligus ScrollTrigger-nya.
    const context = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        delay,
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: element,
          // Mulai sedikit sebelum bagiannya benar-benar sampai tengah layar.
          start: "top 85%",
          // Sekali muncul, selesai. Tidak diulang saat digulir naik lagi.
          once: true,
        },
      });
    }, element);

    return () => context.revert();
  }, [stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
