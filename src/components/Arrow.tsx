/**
 * Panah kecil pendamping tautan.
 *
 * Digambar sebagai SVG, bukan diketik sebagai karakter → atau ↓.
 *
 * ALASANNYA: karakter panah berada di rentang Unicode U+2190–21FF, yang TIDAK
 * termasuk subset `latin` maupun `latin-ext` milik Inter. Jadi kalau diketik
 * sebagai teks, panahnya tidak pernah dirender oleh Inter — melainkan oleh font
 * cadangan bawaan perangkat. Akibatnya bentuk, ketebalan, dan posisi vertikalnya
 * berbeda-beda antara Android, iOS, dan Windows.
 *
 * Sebagai SVG, bentuknya sama persis di semua perangkat dan mengikuti
 * `currentColor` seperti teks di sebelahnya.
 */

type Props = {
  /** Arah panah. */
  direction?: "right" | "down";
  className?: string;
};

export default function Arrow({ direction = "right", className }: Props) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      // Panah menempel pada teks, jadi ukurannya ikut ukuran huruf induknya.
      width="1em"
      height="1em"
      style={{ transform: direction === "down" ? "rotate(90deg)" : undefined }}
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}
