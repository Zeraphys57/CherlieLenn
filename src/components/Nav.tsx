"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/content";
import WhatsAppIcon from "./WhatsAppIcon";
import WhatsAppLink from "./WhatsAppLink";

/**
 * Navigasi sticky.
 *
 * Di puncak halaman navbar dibiarkan menyatu dengan hero — tanpa latar, tanpa
 * garis — supaya momen 你好 tidak terpotong oleh batang horizontal. Begitu
 * pengunjung mulai menggulir, barulah latar kertas dan garis tipisnya muncul
 * agar teks navbar tetap terbaca di atas konten apa pun.
 *
 * Bagian yang sedang dibaca ikut ditandai di navbar. Untuk website satu halaman
 * yang panjang, penanda ini yang memberi tahu pengunjung "saya ada di mana" —
 * tanpa itu, navbar-nya cuma daftar tautan yang tidak pernah berubah.
 *
 * Menu mobile berperilaku seperti dialog semestinya: Escape menutup, gulir latar
 * dikunci, fokus keyboard terkurung di dalam panel selama terbuka, lalu
 * dikembalikan ke tombol pembuka saat ditutup.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const wordmark = site.teacherShortName || site.teacherName;

  /* Ganti tampilan navbar setelah pengunjung menggulir sedikit. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Tandai bagian yang sedang dibaca. */
  useEffect(() => {
    const sections = nav.links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Pita tipis di sepertiga atas layar. Bagian yang sedang melintasi pita
    // itulah yang dianggap sedang dibaca — jauh lebih stabil daripada menebak
    // dari angka scrollY, yang harus disetel ulang tiap kali tinggi bagian
    // berubah.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -70% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    // Saat hero kembali terlihat, tidak ada bagian yang perlu ditandai.
    const hero = document.getElementById("top");
    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveId(null);
          },
          { threshold: 0.5 },
        )
      : null;
    if (hero && heroObserver) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver?.disconnect();
    };
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  /* Perilaku saat menu mobile terbuka. */
  useEffect(() => {
    if (!menuOpen) return;

    const panel = panelRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      // Kurung fokus di dalam panel. Tanpa ini, Tab akan menembus keluar ke
      // konten halaman yang tertutup di belakangnya — pengguna keyboard jadi
      // "hilang" di balik panel yang sedang terbuka.
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || current === toggleRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Kunci gulir latar selama panel terbuka.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    panel?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-warm-gray/25 bg-paper/95 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
      style={{ height: "var(--nav-height)" }}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Wordmark — di website personal branding, namanya sendiri yang jadi logo. */}
        <a
          href="#top"
          className="group flex items-baseline gap-2 font-display text-lg leading-none tracking-tight text-ink sm:text-xl"
        >
          <span>{wordmark}</span>
          {site.teacherNameHanzi && (
            <span
              // Nama Mandarin guru. aria-hidden karena pembaca layar sudah
              // menyebut namanya dalam huruf latin tepat sebelum ini —
              // mengulanginya dalam bahasa lain justru membingungkan.
              className="hanzi hidden text-sm text-muted transition-colors duration-200 group-hover:text-jade sm:inline"
              lang="zh-Hant"
              aria-hidden="true"
            >
              {site.teacherNameHanzi}
            </span>
          )}
        </a>

        {/* Tautan desktop */}
        <ul className="hidden items-center gap-7 lg:flex">
          {nav.links.map((link) => {
            const active = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  className={`relative py-1 text-sm transition-colors duration-200 hover:text-ink ${
                    active ? "text-ink" : "text-ink/70"
                  }`}
                >
                  {link.label}
                  {/* Garis penanda — tumbuh dari kiri, bukan muncul tiba-tiba. */}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-0.5 left-0 block h-px bg-seal transition-[width] duration-300 ease-[var(--ease-quiet)] ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <WhatsAppLink
            message={nav.ctaMessage}
            source="navbar"
            className="hidden items-center gap-2 rounded-full bg-seal px-5 py-2.5 text-sm font-medium text-paper transition-opacity duration-200 hover:opacity-90 sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {nav.ctaLabel}
          </WhatsAppLink>

          {/* Tombol hamburger — hanya sampai breakpoint lg. */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          >
            <span className="sr-only">{menuOpen ? "Tutup menu" : "Buka menu"}</span>
            <span aria-hidden="true" className="relative block h-4 w-5">
              {/* Tiga garis yang berubah jadi tanda silang saat terbuka. */}
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 block h-px w-5 bg-current transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-300 ${
                  menuOpen ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Panel menu mobile */}
      <div
        id="menu-mobile"
        ref={panelRef}
        // `hidden` saat tertutup memastikan tautannya benar-benar keluar dari
        // urutan Tab, bukan sekadar tidak terlihat.
        hidden={!menuOpen}
        className="border-t border-warm-gray/20 bg-paper lg:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
          {nav.links.map((link) => {
            const active = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-warm-gray/15 py-4 font-display text-xl ${
                    active ? "text-seal" : "text-ink"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-seal" />
                  )}
                </a>
              </li>
            );
          })}
          <li className="pt-5 pb-2">
            <span onClick={closeMenu}>
              <WhatsAppLink
                message={nav.ctaMessage}
                source="menu-mobile"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-seal px-6 py-3.5 font-medium text-paper"
              >
                <WhatsAppIcon className="h-5 w-5" />
                {nav.ctaLabel}
              </WhatsAppLink>
            </span>
          </li>
        </ul>
      </div>
    </header>
  );
}
