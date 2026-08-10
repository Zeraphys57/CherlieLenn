"use client";

import { useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { heroCharacters, STROKE_TRANSFORM, STROKE_VIEWBOX_SIZE } from "@/lib/stroke-data";
import { MizigeCell } from "./MizigeGrid";

/**
 * 你好 yang menulis dirinya sendiri, goresan demi goresan, di dalam 米字格.
 *
 * CARA KERJANYA
 * -------------
 * Tiap goresan punya dua bentuk: `outline` (bentuk luar goresan, sudah setebal
 * kuas) dan `median` (garis tengah, yaitu jalur yang dilewati ujung kuas).
 *
 * Yang terlihat adalah outline-nya. Yang dianimasikan adalah median-nya:
 * median dipasang sebagai <mask> berupa garis sangat tebal, lalu panjangnya
 * ditumbuhkan dari nol memakai stroke-dasharray/stroke-dashoffset. Selama mask
 * memanjang, bagian outline yang tersingkap ikut bertambah.
 *
 * Hasilnya goresan tampak ditulis lengkap dengan bentuk kuas yang benar —
 * ujungnya meruncing, badannya menebal — bukan sekadar garis tipis seragam
 * seperti kalau outline-nya sendiri yang di-dash.
 *
 * Semua ini memakai GSAP core. Plugin DrawSVG yang berbayar tidak diperlukan.
 *
 * SOAL AKSESIBILITAS DAN KEADAAN AWAL
 * -----------------------------------
 * Saat dirender di server, huruf sudah dalam keadaan TERGAMBAR PENUH. Baru
 * setelah JavaScript jalan — dan hanya kalau pengguna tidak meminta pengurangan
 * gerak — huruf disembunyikan lalu digambar. Penyembunyian itu dilakukan di
 * useLayoutEffect, jadi terjadi sebelum browser sempat melukis frame pertama
 * dan tidak ada kedipan.
 *
 * Akibatnya, tanpa JavaScript atau dengan "kurangi gerak" menyala, yang tampil
 * tetap 你好 yang utuh dan terbaca — bukan area kosong.
 */

type Props = {
  className?: string;
  /** Jeda sebelum goresan pertama dimulai, dalam detik. */
  delay?: number;
};

/** Ruang lebih di tepi viewBox agar garis tepi grid tidak terpotong separuh. */
const GRID_PAD = 6;

export default function NiHaoStroke({ className, delay = 0.35 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  // useId menjaga id mask tetap unik walau komponen ini dipakai lebih dari
  // sekali di satu halaman.
  const uid = useId().replace(/:/g, "");

  useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Hormati preferensi sistem: biarkan huruf dalam keadaan tergambar penuh.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const maskPaths = Array.from(
      svg.querySelectorAll<SVGPathElement>("[data-stroke-mask]"),
    );
    if (maskPaths.length === 0) return;

    const lengths = maskPaths.map((path) => path.getTotalLength());

    // Sembunyikan semua goresan sebelum frame pertama dilukis.
    //
    // Kelebihan 1 unit itu penting, bukan sekadar jaga-jaga.
    // getTotalLength() mengembalikan bilangan pecahan. Kalau dashoffset diisi
    // panjang yang persis sama, pembulatan di dalam browser kadang menyisakan
    // potongan garis yang teramat kecil di titik awal. Karena mask ini memakai
    // ujung membulat selebar 220 unit, potongan sekecil apa pun itu tetap
    // digambar sebagai satu ujung bulat penuh — muncul sebagai TITIK yang
    // menclok di layar sebelum goresannya sempat ditulis.
    //
    // Menambah satu unit membuat titik awal jatuh aman di dalam bagian
    // kosong pola dash, sehingga tidak ada yang tersisa untuk digambar.
    maskPaths.forEach((path, index) => {
      const hidden = lengths[index] + 1;
      path.style.strokeDasharray = `${hidden}`;
      path.style.strokeDashoffset = `${hidden}`;
    });

    const timeline = gsap.timeline({ delay });

    maskPaths.forEach((path, index) => {
      // Goresan panjang wajar memakan waktu lebih lama daripada titik pendek —
      // durasi seragam justru membuat titik terasa lambat dan sapuan panjang
      // terasa terburu-buru.
      const duration = gsap.utils.clamp(0.18, 0.42, lengths[index] / 900);

      timeline.to(
        path,
        { strokeDashoffset: 0, duration, ease: "power1.inOut" },
        // Sedikit tumpang tindih dengan goresan sebelumnya, meniru tangan yang
        // sudah bergerak ke goresan berikutnya sebelum yang ini benar-benar
        // selesai.
        index === 0 ? 0 : "-=0.05",
      );
    });

    return () => {
      timeline.kill();
    };
  }, [delay]);

  const size = STROKE_VIEWBOX_SIZE;

  return (
    <svg
      ref={svgRef}
      // Padding kecil di viewBox supaya garis tepi grid tidak terpotong
      // separuh oleh batas SVG — garis digambar tepat di atas batas, jadi
      // tanpa ruang lebih, separuh ketebalannya hilang.
      viewBox={`${-GRID_PAD} ${-GRID_PAD} ${size * heroCharacters.length + GRID_PAD * 2} ${size + GRID_PAD * 2}`}
      className={className}
      role="img"
      // Pembaca layar mendapat arti tulisannya, bukan penjelasan animasinya.
      aria-label="你好 — nǐ hǎo, artinya halo"
      focusable="false"
    >
      <defs>
        {heroCharacters.map((character, charIndex) =>
          character.strokes.map((stroke, strokeIndex) => (
            <mask
              key={`${charIndex}-${strokeIndex}`}
              id={`stroke-${uid}-${charIndex}-${strokeIndex}`}
            >
              {/*
                Mask sengaja TIDAK diberi maskUnits maupun transform sendiri.

                Bawaan SVG sudah tepat untuk kasus ini: isi mask dibaca dalam
                ruang koordinat elemen yang memakainya (maskContentUnits =
                userSpaceOnUse), yaitu <g> huruf yang sudah membawa transform di
                bawah — sehingga koordinat median mentah otomatis sejajar dengan
                outline-nya. Sementara area mask-nya mengikuti kotak batas
                goresan itu sendiri plus margin, yang justru pas.

                (Menulis maskUnits="userSpaceOnUse" malah mengubah satuan AREA
                mask, bukan isinya — dan tanpa x/y/width/height eksplisit,
                hasilnya goresan bisa terpotong.)

                Lebar 220 sengaja jauh lebih tebal daripada goresan mana pun.
                Kelebihannya tidak jadi masalah karena mask hanya berlaku pada
                outline goresan itu sendiri.
              */}
              <path
                data-stroke-mask
                d={stroke.median}
                stroke="#fff"
                strokeWidth={220}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>
          )),
        )}
      </defs>

      {/* Kertas latihan di belakang huruf — satu kotak untuk satu huruf. */}
      <g className="text-warm-gray/45">
        {heroCharacters.map((_, charIndex) => (
          <MizigeCell key={charIndex} x={charIndex * size} size={size} />
        ))}
      </g>

      {heroCharacters.map((character, charIndex) => (
        <g
          key={character.char}
          transform={`translate(${charIndex * size}, 0) ${STROKE_TRANSFORM}`}
        >
          {character.strokes.map((stroke, strokeIndex) => (
            <path
              key={strokeIndex}
              d={stroke.outline}
              fill="currentColor"
              mask={`url(#stroke-${uid}-${charIndex}-${strokeIndex})`}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
