# Website Les Mandarin

Website **personal branding** seorang guru les Mandarin privat. Gurunya sendiri
yang jadi brand — bukan profil lembaga kursus. Tujuan tunggalnya: mengubah
pengunjung menjadi percakapan WhatsApp. Tidak ada database dan tidak ada backend —
seluruh jalur konversi berupa link `wa.me`.

## Suara penulisan — tolong dijaga

Semua teks ditulis sebagai **orang pertama** ("saya"), seolah gurunya berbicara
langsung ke calon murid. Bukan "kami", bukan "tim kami". Ini bukan preferensi
gaya semata: begitu berubah jadi "kami", website-nya langsung terasa seperti
kursus generik dan seluruh nilai personal branding-nya hilang.

Nadanya **santai tapi tetap "saya"** — kalimat pendek, kata sehari-hari
("ngobrol", "nyobain", "nggak"), tanpa jatuh ke "aku". Batas itu disengaja:
"saya" tetap terasa meyakinkan buat orang tua murid anak-anak dan calon murid
kelas bisnis, sementara "aku" berisiko terdengar terlalu kasual untuk keduanya.

Patokan singkat saat mengedit:

| Hindari                       | Pakai                       |
| ----------------------------- | --------------------------- |
| "Ceritakan tujuan belajarmu"  | "Cerita aja mau belajar apa" |
| "tidak ada biaya"             | "nggak dipungut biaya"       |
| "mengukur", "menyesuaikan"    | "ngukur", "nyesuaikan"       |
| "Hubungi untuk harga"         | "Tanya lewat chat"           |

Urutan halaman juga mengikuti logika itu — gurunya muncul di hero, bukan di
bagian "tentang" yang terkubur di tengah:

```
Nav → Hero (foto + nama + 你好) → Cerita Saya → Yang Saya Ajarkan
    → Cara Belajar → Testimoni → Harga → FAQ → Footer
```

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
```

Perintah lain:

| Perintah                    | Kegunaan                                          |
| --------------------------- | ------------------------------------------------- |
| `npm run build`             | Build production                                   |
| `npm run lint`              | ESLint                                             |
| `npm run fonts:cjk`         | Membuat ulang font Mandarin (baca bagian di bawah) |
| `npm run strokes`           | Membuat ulang data urutan goresan untuk hero       |
| `npm run og`                | Membuat ulang gambar share (og.jpg) + ikon tab     |
| `npm run placeholder:photo` | Membuat ulang foto sementara guru                  |

Keempat perintah terakhir hasilnya sudah ikut di-commit, jadi tidak perlu
dijalankan untuk sekadar menjalankan website. Jalankan hanya kalau isinya
berubah.

## Daftar periksa sebelum go-live

Selama masih ada yang belum beres, akan muncul kotak peringatan di pojok kiri
bawah saat `npm run dev` — lengkap dengan hitungan dan daftar tepat bagian mana
yang masih placeholder. Kotak itu tidak pernah tampil di build production.

Sudah beres: nama guru (**Cherlie Lenn** / **吳佩蓉**) dan foto guru.

Yang masih perlu diisi:

1. **Nomor WhatsApp** — isi `WHATSAPP_NUMBER` di `src/lib/content.ts` (format
   `62…`, bukan `08…`), lalu set `WHATSAPP_NUMBER_IS_PLACEHOLDER = false`.
2. **Alamat website** — `site.url`. Dipakai Open Graph, sitemap, dan JSON-LD.
3. **Testimoni** — ganti SELURUH isi array `testimonials` dengan testimoni asli
   beserta izin pemakaian nama.
4. **Harga** — isi angka di `pricing.packages`. Kalau ingin harga tampil
   terbuka, ubah `pricing.showPrices` menjadi `true`.
5. **Penenang keraguan** (`trust` di `content.ts`) — dua kalimat pendek yang
   tampil tepat di samping tombol chat, dan termasuk yang paling berpengaruh
   pada keputusan menekan tombol:
   - `responseTime` — mis. "Biasanya dibalas < 1 jam". Isi sesuai kenyataan;
     janji yang tidak ditepati lebih merugikan daripada tidak menulis apa pun.
   - `trialNote` — kelas trial gratis atau berbayar. Ini pertanyaan yang paling
     sering menahan orang tepat sebelum chat.
6. **Sisa placeholder** — kredensial, bio, jawaban FAQ, email, Instagram, kota.
   Bio (`story.bio`) yang paling penting: di website personal branding, paragraf
   itulah yang paling menentukan orang percaya atau tidak.
7. **`CONTENT_LAST_UPDATED`** — perbarui tanggalnya saat isi website berubah.

### Kalau nama Mandarin berubah

`site.teacherNameHanzi` dipakai di navbar, hero, cap stempel, footer, dan
JSON-LD. Setelah mengubahnya, jalankan **dua** perintah:

```bash
npm run fonts:cjk              # supaya hurufnya ikut ter-render
npm run og -- "Cherlie Lenn"   # gambar share ikut memuat cap namanya
```

Untuk gambar share, setiap huruf nama juga harus ada di paket
`hanzi-writer-data`, karena cap di `og.jpg` digambar dari data goresan dan bukan
diketik sebagai teks. Ubah `SEAL_TEXT` di `scripts/build-og-image.mjs` agar
sesuai.

### Kalau foto guru diganti

Timpa `public/images/guru.png`. Foto sekarang berbentuk **persegi (1:1)** dan
bingkai hero mengikuti bentuk itu — sekaligus menggemakan kotak 米字格 di
belakangnya. Kalau foto penggantinya berupa potret 4:5, ubah `aspect-square`
menjadi `aspect-[4/5]` di `src/components/Hero.tsx`, kalau tidak sisi kiri-kanan
akan terpotong.

## Mengganti foto guru

Timpa `public/images/guru.jpg` dengan foto asli — **potret rasio 4:5**, minimal
800×1000px. Tidak ada kode yang perlu diubah.

Gambar yang ada sekarang adalah penanda kosong bertuliskan "FOTO GURU", dibuat
oleh `npm run placeholder:photo`. Kalau tulisan itu masih terlihat di website,
berarti fotonya belum diganti.

## Mengubah isi website

Semua teks, harga, testimoni, dan kontak ada di satu file:

```
src/lib/content.ts
```

Tidak perlu menyentuh file komponen untuk mengganti isi. Nomor WhatsApp juga
ditulis satu kali saja di file itu (`WHATSAPP_NUMBER`), lalu dipakai ulang oleh
seluruh tombol lewat `src/lib/whatsapp.ts`.

Setiap bagian yang masih perlu data asli ditandai `[PLACEHOLDER: ...]`.
Selama `WHATSAPP_NUMBER_IS_PLACEHOLDER` masih `true`, akan muncul kotak
peringatan di pojok kiri bawah saat `npm run dev` — kotak itu tidak pernah
tampil di build production.

## Font Mandarin — baca sebelum menambah teks Hanzi

Ini bagian yang paling mudah salah, jadi tolong dibaca sekali.

**Masalahnya:** `next/font/google` tidak bisa memuat bagian Hanzi dari Noto Sans SC
maupun Noto Serif SC. Lewat jalur itu Google hanya menyediakan subset
`latin`, `latin-ext`, `cyrillic`, dan `vietnamese` — tidak ada
`chinese-simplified`. Kalau font dimuat dengan cara biasa, semua huruf Mandarin
akan tampil sebagai kotak kosong (tofu). Font utuhnya sendiri ±8 MB, terlalu
berat untuk dikirim seluruhnya.

**Solusinya:** `scripts/build-cjk-subset.mjs` memindai seluruh `src/`,
mengumpulkan setiap huruf Hanzi yang benar-benar dipakai, lalu mengunduh font
yang sudah dipotong pas sebesar kebutuhan itu ke `src/fonts/`. Saat ini 58 huruf
= **34 KB** untuk kedua font. File-file itu di-commit ke repo dan dimuat lewat
`next/font/local` di `src/lib/fonts.ts`.

**Yang harus dilakukan:** setiap kali menambah teks Hanzi **baru** — entah di
`content.ts` atau langsung di komponen — jalankan:

```bash
npm run fonts:cjk
```

Kalau lupa, huruf yang baru ditambahkan akan muncul sebagai kotak kosong
sementara huruf lama tetap normal. `src/fonts/subset-manifest.json` mencatat
huruf apa saja yang sedang tercakup.

### Tanda nada pinyin juga dipotong sendiri

Perintah yang sama juga membuat `Inter-latin-ext-subset-400.woff2`, dan alasannya
mirip.

Tanda nada pinyin (`ā ǎ ǐ ǒ ǔ ǚ`) berada di subset `latin-ext`. Blok `latin-ext`
bawaan Google untuk Inter berukuran **83 KB** — sementara seluruh website ini
cuma memakai **enam huruf** dari sana, untuk dua label berukuran 14px. Memuatnya
lewat `next/font` berarti mengirim 83 KB yang 99%-nya tidak pernah tampil, lebih
berat daripada seluruh CSS website ini.

Versi potongnya **4 KB**. Huruf latin biasa tetap datang dari Inter versi
`next/font`; browser memilih per karakter lewat susunan font di kelas `.pinyin`
(lihat `globals.css`). Karena keduanya sama-sama Inter, sambungannya tidak
terlihat.

Huruf beraksen yang lazim seperti `é ì ó ù` tidak termasuk di sini — semuanya
sudah ada di subset `latin` biasa.

## Struktur

```
src/
  app/
    layout.tsx        # font, metadata, skip-link, wrapper Lenis
    globals.css       # token desain (@theme Tailwind v4) + dasar aksesibilitas
    page.tsx          # halaman verifikasi Fase 0 — diganti Hero pada Fase 1
  components/
    SmoothScroll.tsx      # Lenis, mati otomatis saat prefers-reduced-motion
    PlaceholderNotice.tsx # pengingat khusus mode development
  lib/
    content.ts        # SEMUA isi website
    fonts.ts          # pemuatan 4 font
    whatsapp.ts       # pembuat link wa.me
  fonts/              # font Mandarin hasil potong (di-commit, jangan dihapus)
scripts/
  build-cjk-subset.mjs
```

## Token desain

Didefinisikan di `src/app/globals.css` dalam blok `@theme`, sehingga otomatis
tersedia sebagai CSS variable **dan** sebagai utility Tailwind
(`bg-paper`, `text-ink`, `border-seal`, …).

| Token         | Nilai     | Pemakaian                               |
| ------------- | --------- | --------------------------------------- |
| `--ink`       | `#211E1A` | Teks utama                              |
| `--paper`     | `#EFE8DA` | Latar utama                             |
| `--paper-mid` | `#E3DCC9` | Latar kartu dan seksi                   |
| `--seal`      | `#A63B2A` | **Hanya aksen kecil** — tombol CTA, cap |
| `--jade`      | `#56705F` | Aksen sekunder — tag program            |
| `--warm-gray` | `#8A8271` | Teks sekunder, garis, pembatas          |

`--seal` sengaja tidak pernah dipakai sebagai latar lebar — satu-satunya
pengecualian adalah cap stempel kecil di bagian testimoni. Begitu dipakai
sebagai blok besar, tampilannya langsung jatuh ke klise merah-emas yang justru
dihindari desain ini.

### Dua warna menyimpang dari brief — dan kenapa

Brief meminta dua hal yang ternyata bertabrakan: nilai warna yang pasti, DAN
kontras WCAG AA. Setelah diukur, dua warna aslinya tidak lolos untuk teks
berukuran normal (butuh 4.5:1), padahal keduanya justru ditugaskan untuk teks:

| Token         | Nilai brief | Kontras di paper / paper-mid | Hasil    |
| ------------- | ----------- | ---------------------------- | -------- |
| `--jade`      | `#56705F`   | 4.44 / 3.96                  | **gagal** |
| `--warm-gray` | `#8A8271`   | 3.12 / 2.78                  | **gagal** |

Penyelesaiannya:

- **`--jade` digelapkan** ke `#4B6353` (5.37 / 4.78). Ini pergeseran terkecil
  yang lolos di kedua latar; nuansa celadon teredamnya tidak berubah.
- **`--warm-gray` dipertahankan persis** seperti brief, tapi pemakaiannya
  dipersempit hanya untuk garis, pembatas, dan grid hiasan — yang memang tidak
  terikat aturan kontras.
- **`--muted` (`#676055`) ditambahkan** untuk teks sekunder: nada warna yang
  sama, hanya lebih gelap (5.09 / 4.54).

➜ Aturan praktisnya: **jangan pakai `text-warm-gray` untuk teks. Pakai
`text-muted`.**

## Pengukuran (analytics)

Website ini punya satu tugas: mengubah pengunjung jadi percakapan WhatsApp.
Tanpa pengukuran, tidak ada yang bisa menjawab apakah tugas itu tercapai — dan
setiap keputusan berikutnya cuma tebakan.

Yang terpasang:

- **Vercel Analytics** — jumlah pengunjung, plus event `wa_click` setiap kali
  tombol WhatsApp diklik.
- **Vercel Speed Insights** — Core Web Vitals dari pengunjung sungguhan. Penting,
  karena angka Lighthouse di bawah semuanya hasil simulasi; yang menentukan
  adalah pengalaman nyata di jaringan Indonesia.

Keduanya tanpa cookie dan tanpa data pribadi, jadi **tidak perlu banner
persetujuan**. Keduanya hanya aktif saat berjalan di Vercel (dipagari
`process.env.VERCEL`), supaya pengukuran di komputer sendiri tetap bersih.

### Tombol mana yang diklik

Setiap klik membawa penanda `source`, jadi bukan cuma "ada yang chat" tapi
"chat-nya datang dari mana":

| `source`                | Letak                                     |
| ----------------------- | ----------------------------------------- |
| `hero`                  | Tombol utama di layar pertama             |
| `cerita`                | Tautan di bagian Cerita Saya              |
| `kelas:anak` dst.       | Kartu kelas — satu penanda per kelas      |
| `cara-belajar`          | Tombol di bagian Cara Belajar             |
| `harga:reguler` dst.    | Kartu paket harga — satu penanda per paket |
| `cta-akhir`             | Ajakan penutup berlatar tinta             |
| `navbar` / `menu-mobile`| Tombol di navigasi                        |
| `footer:tombol`         | Tombol di footer                          |
| `tombol-melayang`       | Tombol bulat di pojok kanan bawah         |

Pertanyaan yang jadi bisa dijawab: kelas mana yang paling diminati, apakah orang
chat sebelum atau sesudah melihat harga, dan apakah tombol melayang benar-benar
menghasilkan percakapan — kalau angkanya nol, tombol itu sebaiknya dihapus.

Semua tombol WhatsApp dibuat lewat satu komponen,
`src/components/WhatsAppLink.tsx`. Jangan menulis `<a href={waLink(...)}>`
sendiri — kliknya tidak akan terhitung.

### Aturan penempatan tombol — jangan asal tambah

Tombol ajakan hanya dipasang di **titik keputusan**, bukan di setiap bagian.
Menambah tombol tidak menambah percakapan; yang terjadi justru semuanya terbaca
seperti iklan dan tidak ada yang menonjol.

Yang ada sekarang, dan alasannya:

| Letak                 | Jumlah | Kenapa                                            |
| --------------------- | ------ | ------------------------------------------------- |
| Hero                  | 1      | Pengunjung baru tertarik                          |
| Kartu kelas           | 4      | Tiap kartu bawa konteks kelasnya sendiri          |
| Cara Belajar          | 1      | Langkah pertamanya memang "chat"                  |
| Kartu harga           | 3      | Tiap kartu bawa konteks paketnya sendiri          |
| Ajakan penutup        | 1      | Kesempatan terakhir                               |
| Navbar / menu mobile  | 1      | Selalu terjangkau                                 |
| Footer                | 1      | Sebagai info kontak, sejajar email & Instagram    |

Yang **sengaja tidak ada**:

- **Cerita Saya** — pembacanya belum di titik memutuskan, dan tombol utama baru
  saja lewat satu layar di atas.
- **Tombol besar di footer** — ajakan penutup persis di atasnya sudah meminta
  hal yang sama. Dua tombol bertulisan sama dalam satu layar bukan dua peluang.
- **Tombol melayang di layar lebar** (`sm:hidden`) — mulai 640px tombol WhatsApp
  di navbar sudah selalu menempel di layar. Menampilkan keduanya berarti dua
  tombol identik menempel bersamaan.

Angka 4 dan 3 di kartu kelas/harga terlihat banyak, tapi bukan pengulangan:
masing-masing mengirim pesan WhatsApp yang berbeda, sehingga Cherlie langsung
tahu kelas atau paket mana yang ditanyakan tanpa perlu bertanya balik.

Kalau nanti analytics menunjukkan salah satu tidak pernah diklik — misalnya
`tombol-melayang` — hapus saja. Itu gunanya pengukuran.

## Keamanan

`next.config.ts` memasang Content-Security-Policy, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, dan HSTS.

CSP-nya masih memakai `'unsafe-inline'` untuk script, karena Next.js menyisipkan
data hidrasi sebagai skrip inline. Menghapusnya memerlukan nonce per permintaan,
yang berarti halaman tidak bisa lagi disajikan sebagai berkas statis — harga
yang tidak sepadan untuk website tanpa masukan pengguna seperti ini.

Kalau menambah layanan pihak ketiga (mis. pixel iklan atau embed video),
domainnya **wajib** didaftarkan di CSP, kalau tidak akan diblokir diam-diam.
Cek konsol browser setelah menambah apa pun.

## Halaman galat

- `src/app/not-found.tsx` — 404 dengan tampilan dan bahasa yang sama seperti
  sisa website, `noindex`.
- `src/app/error.tsx` — jaring pengaman kalau ada komponen yang gagal. Yang
  penting: tombol WhatsApp tetap ada di sana. Sekalipun halamannya bermasalah,
  calon murid masih bisa menghubungi Cherlie.

## SEO & metadata

Sudah terpasang: title/description, Open Graph + Twitter card, `og.jpg`
(1200×630), JSON-LD `EducationalOrganization` dengan keempat kelas sebagai
`hasCourse`, `sitemap.xml`, `robots.txt`, dan ikon tab.

`og.jpg` maupun ikon tab dibuat oleh `npm run og`. Huruf 你好 di dalamnya
digambar dari data goresan yang sama seperti animasi hero — bukan diketik
sebagai teks — supaya hasilnya tidak bergantung pada font Mandarin yang
kebetulan terpasang di komputer pembuatnya. Tanpa itu, gambar share bisa berisi
kotak kosong dan baru ketahuan setelah ada yang membagikan linknya.

Satu hal yang sengaja BELUM diisi: `hasCourseInstance` (berisi `courseMode`
online/offline dan durasi) pada tiap Course. Google butuh itu untuk rich result,
tapi format kelas yang sebenarnya masih placeholder — mengarangnya berarti
mengirim keterangan palsu ke mesin pencari. Cara menambahkannya sudah ditulis
di `src/components/JsonLd.tsx`.

## Hasil Lighthouse

Diukur pada build production lokal (`npm run build && npm start`):

| Kategori       | Mobile | Desktop |
| -------------- | ------ | ------- |
| Performance    | 98     | 100     |
| Accessibility  | 100    | 100     |
| Best Practices | 100    | 100     |
| SEO            | 100    | 100     |

| Metrik | Mobile | Desktop | Target  |
| ------ | ------ | ------- | ------- |
| LCP    | 2,2 s  | 0,6 s   | < 2,5 s |
| CLS    | 0      | 0       | < 0,1   |
| FCP    | 1,0 s  | 0,5 s   | —       |
| TBT    | 57 ms  | 0 ms    | —       |

Angka mobile adalah **median dari tiga kali pengukuran dengan cache gambar yang
sudah hangat**. Pengukuran pertama setelah build selalu lebih lambat (LCP ±3,3 s)
karena foto guru baru di-encode ke AVIF saat itu juga. Di Vercel, hasil encode
disimpan di CDN, jadi hanya permintaan pertama yang menanggungnya — pengunjung
berikutnya mendapat versi yang sudah jadi.

Kalau mengukur sendiri, panggil halamannya sekali dulu sebelum menjalankan
Lighthouse, kalau tidak yang terukur adalah biaya encode sekali seumur hidup.

Perlu diingat, angka mobile ini hasil simulasi: jaringan 4G lambat plus CPU
diperlambat 4×, terhadap server Node lokal tanpa CDN dan tanpa Brotli. Ukur
ulang terhadap URL production setelah deploy.

Sisa yang bisa dikejar kalau suatu saat perlu: **JavaScript ±165 KB**, sekitar
60 KB di antaranya GSAP + ScrollTrigger + Lenis. Bisa dipindahkan keluar dari
jalur kritis dengan pemuatan dinamis, tapi butuh penanganan hati-hati agar
bagian yang disembunyikan sebelum animasi tidak ikut tertahan bila pemuatannya
gagal. Dengan skor sekarang, ini belum diperlukan.

## Animasi 你好 di hero

Momen tanda tangan website ini: 你好 yang menulis dirinya sendiri, goresan demi
goresan, di dalam kotak 米字格.

Tiap goresan punya dua bentuk — `outline` (bentuk kuas yang terlihat) dan
`median` (garis tengah, jalur yang dilewati ujung kuas). Yang terlihat adalah
outline-nya; yang dianimasikan adalah median-nya, dipasang sebagai `<mask>`
berupa garis sangat tebal yang panjangnya ditumbuhkan lewat
`stroke-dasharray`/`stroke-dashoffset`. Selama mask memanjang, bagian outline
yang tersingkap ikut bertambah — jadi goresannya tampak ditulis lengkap dengan
bentuk kuas yang benar, bukan sekadar garis tipis seragam.

Semuanya memakai **GSAP core**. Plugin DrawSVG yang berbayar tidak dipakai dan
tidak diperlukan.

Tanpa JavaScript, atau saat pengguna menyalakan "kurangi gerak" di sistemnya,
huruf tetap tampil **utuh dan terbaca** — bukan area kosong. Animasi hanya
berjalan sekali saat halaman dimuat, dan tidak pernah terulang saat digulir.

### Atribusi data goresan

Data urutan goresan berasal dari proyek **Make Me a Hanzi**, lewat paket npm
[`hanzi-writer-data`](https://github.com/chanind/hanzi-writer-data).

Copyright © 1999 Arphic Technology Co., Ltd. — dilisensikan di bawah **Arphic
Public License**, salinannya ada di [`LICENSE-hanzi-data.txt`](./LICENSE-hanzi-data.txt).

Paketnya hanya devDependency: `npm run strokes` mengekstrak dua huruf yang
dipakai (你 dan 好) ke `src/lib/stroke-data.ts`, sehingga data puluhan ribu huruf
lainnya tidak ikut terkirim ke pengunjung.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · GSAP (core gratis, tanpa
plugin berbayar) · Lenis · `next/font` · deploy ke Vercel.
