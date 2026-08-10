"use client";

import { useState } from "react";
import { pricing, trust } from "@/lib/content";
import { packagePriceLabel, packageUnit } from "@/lib/pricing";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * Harga / Paket.
 *
 * TIGA BARIS TOMBOL PILIHAN DI ATAS, HARGA DI KETIGA KARTU IKUT BERUBAH.
 * Bentuk ini dipilih daripada memberi tiap paket daftar variannya sendiri,
 * karena ketiga paket dibedakan oleh sumbu yang sama persis. Kalau tiap kartu
 * memuat daftarnya sendiri, pengunjung harus membaca kombinasi yang sama tiga
 * kali dan tetap tidak bisa membandingkan — sementara satu baris tombol di atas
 * menjaga ketiga kartu tetap sejajar dan sebanding.
 *
 * Harganya DIHITUNG, bukan didaftar: lihat src/lib/pricing.ts. Komponen ini
 * tidak pernah mengalikan apa pun sendiri.
 *
 * Kalau `pricing.showPrices` dimatikan, baris tombolnya ikut hilang — memilih
 * kombinasi jadi tidak ada gunanya kalau angkanya toh disembunyikan.
 *
 * ⚠️ Angka harganya masih contoh. Lihat PRICES_ARE_PLACEHOLDER di content.ts.
 */
export default function Pricing() {
  const { axes } = pricing;

  // Pilihan awal = opsi pertama tiap sumbu. Jangan dibiarkan kosong: kartu
  // tanpa harga di pemuatan pertama membuat bagian ini terlihat rusak.
  const [selection, setSelection] = useState({
    jenisKelas: axes.jenisKelas.options[0].id,
    durasi: axes.durasi.options[0].id,
    format: axes.format.options[0].id,
  });

  const rows = [
    { key: "jenisKelas" as const, axis: axes.jenisKelas },
    { key: "durasi" as const, axis: axes.durasi },
    { key: "format" as const, axis: axes.format },
  ];

  return (
    <section id="harga" className="scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow={pricing.eyebrow}
            hanzi={pricing.hanzi}
            headline={pricing.headline}
          />
        </Reveal>

        {pricing.showPrices && (
          <Reveal className="mt-12 space-y-4">
            {rows.map(({ key, axis }) => (
              /*
               * `role="radiogroup"` — bukan sekadar deretan tombol.
               * Pilihannya saling meniadakan persis seperti tombol radio, dan
               * pembaca layar perlu mendengar "1 dari 4", bukan empat tombol
               * lepas yang tidak jelas hubungannya.
               */
              <div
                key={key}
                role="radiogroup"
                aria-label={axis.label}
                className="flex flex-wrap items-center gap-x-3 gap-y-2"
              >
                <span className="w-full text-xs font-medium uppercase tracking-[0.16em] text-muted sm:w-28">
                  {axis.label}
                </span>

                {axis.options.map((option) => {
                  const active = selection[key] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelection((prev) => ({ ...prev, [key]: option.id }))}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                        active
                          ? "border-seal bg-seal text-paper"
                          : "border-warm-gray/40 text-ink hover:border-ink/50"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </Reveal>
        )}

        <Reveal stagger className="mt-10 grid gap-5 md:grid-cols-3 lg:gap-6">
          {pricing.packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`flex flex-col p-7 sm:p-8 ${
                pkg.highlighted
                  ? // Paket yang paling sering diambil ditandai dengan garis
                    // tepi seal — penekanan tipis, bukan blok warna penuh.
                    "border-2 border-seal bg-paper-mid"
                  : "border border-warm-gray/30 bg-paper-mid"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl leading-tight font-normal">{pkg.name}</h3>
                <span className="hanzi text-base leading-none text-jade" lang="zh-Hans">
                  {pkg.hanzi}
                </span>
              </div>

              {/*
                aria-live="polite" — angkanya berubah tanpa halaman berpindah.
                Tanpa ini, pengguna pembaca layar menekan tombol pilihan lalu
                tidak mendengar apa pun; satu-satunya yang berubah ada jauh di
                bawah fokusnya.
              */}
              <p className="mt-5 border-y border-warm-gray/25 py-5" aria-live="polite">
                {pricing.showPrices ? (
                  <>
                    <span className="font-display text-3xl text-ink">
                      {packagePriceLabel(pkg, selection)}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{packageUnit(pkg)}</span>
                  </>
                ) : (
                  <span className="font-display text-xl text-ink">{pricing.hiddenPriceLabel}</span>
                )}
              </p>

              <p className="mt-5 text-base leading-relaxed text-ink/75">{pkg.description}</p>

              <ul className="mt-6 space-y-2.5">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-jade" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>

        <Reveal delay={0.08}>
          {trust.responseTime && (
            <p className="mt-10 inline-flex items-center gap-2 text-sm text-muted">
              <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-jade" />
              {trust.responseTime}
            </p>
          )}
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{pricing.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
