/**
 * ============================================================================
 *  SUMBER KEBENARAN TUNGGAL (single source of truth) UNTUK SEMUA ISI WEBSITE
 * ============================================================================
 *
 *  Semua teks, harga, testimoni, dan kontak yang tampil di website diatur
 *  dari file ini. Untuk mengubah isi website, cukup edit file ini — tidak
 *  perlu menyentuh kode komponen sama sekali.
 *
 *  SUARA PENULISAN
 *  ---------------
 *  Website ini adalah personal branding seorang guru, bukan profil lembaga.
 *  Jadi semua teks ditulis sebagai ORANG PERTAMA ("saya"), bukan "kami".
 *  Guru-nya yang berbicara langsung ke calon murid. Tolong jaga suara ini
 *  saat mengedit — sekali berubah jadi "kami", rasanya langsung berubah
 *  jadi website kursus biasa.
 *
 *  ⚠️  SEMUA yang ditandai `[PLACEHOLDER: ...]` WAJIB diganti dengan data
 *      asli sebelum website dipublikasikan (go-live).
 *
 *  ⚠️  Kalau kamu menambah teks berbahasa Mandarin (Hanzi) baru di file ini,
 *      jalankan `npm run fonts:cjk` supaya huruf barunya ikut ter-render.
 *      Kalau tidak, huruf baru akan muncul sebagai kotak kosong (tofu).
 */

/* -------------------------------------------------------------------------- */
/*  KONTAK & IDENTITAS                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Nomor WhatsApp bisnis — SATU-SATUNYA tempat nomor ini ditulis.
 * Semua tombol WhatsApp di website mengambil nomor dari sini.
 *
 * Format WAJIB: kode negara tanpa tanda "+" dan tanpa "0" di depan.
 *   0812-3456-7890    ->  "6281234567890"   ✅
 *   +62 812 3456 7890 ->  "6281234567890"   ✅
 *   "081234567890"    ->  SALAH ❌ (wa.me tidak akan bekerja)
 */
export const WHATSAPP_NUMBER = "+6281253587353";

/**
 * Set ke `false` setelah WHATSAPP_NUMBER di atas diganti nomor asli.
 * Selama masih `true`, akan muncul peringatan di layar saat mode development
 * supaya nomor palsu tidak ikut terpublikasi tanpa sengaja.
 */
export const WHATSAPP_NUMBER_IS_PLACEHOLDER = false;

/**
 * Tanggal isi website terakhir diubah, format YYYY-MM-DD.
 *
 * Dipakai sebagai `lastModified` di sitemap.xml. Perbarui saat mengubah isi
 * yang berarti — mis. menambah kelas, mengubah harga, menambah testimoni.
 *
 * Sengaja ditulis manual dan tidak memakai tanggal build. Kalau memakai
 * tanggal build, sitemap akan mengaku "baru diperbarui" setiap kali di-deploy
 * walau tidak ada satu kata pun yang berubah — dan mesin pencari lama-lama
 * berhenti mempercayai tanggalnya.
 */
export const CONTENT_LAST_UPDATED = "2026-07-25";

/**
 * Penenang keraguan tepat di samping tombol ajakan.
 *
 * Dua hal yang paling sering menghentikan orang tepat sebelum menekan tombol
 * chat: "nanti dibalasnya kapan?" dan "kelas trial-nya bayar atau tidak?".
 * Menjawabnya di tempat tombolnya berada jauh lebih berpengaruh daripada
 * menaruhnya di FAQ paling bawah.
 *
 * Kosongkan ("") kalau tidak ingin ditampilkan — barisnya otomatis hilang.
 */
export const trust = {
  /*
   * Ditulis sebagai rentang waktu, bukan kata sifat.
   *
   * "Dibalas sangat cepat" tidak bisa ditagih dan tidak menenangkan siapa pun —
   * cepat menurut siapa? Angka membuat janjinya bisa diukur, dan justru itu
   * yang membuatnya dipercaya. Pasang angka yang masih sanggup ditepati di hari
   * tersibuk, bukan di hari terbaik: satu balasan telat lebih merugikan
   * daripada janji yang lebih longgar.
   */
  responseTime: "Biasanya dibalas di bawah 1 jam",
  trialNote: "Kelas trial gratis",
} as const;

/**
 * Identitas guru. Karena ini website personal branding, nama guru sekaligus
 * berfungsi sebagai nama brand — dipakai di navbar, hero, dan footer.
 */
export const site = {
  /** Nama yang tampil di navbar, hero, dan footer. */
  teacherName: "Cherlie Lenn",
  /**
   * Versi pendek untuk navbar kalau nama lengkapnya panjang.
   * Kosongkan ("") kalau nama lengkap sudah cukup pendek.
   */
  teacherShortName: "",
  /**
   * Nama Mandarin guru. Ditulis dengan aksara tradisional, persis seperti yang
   * dipakai pemiliknya — jangan disederhanakan jadi 吴佩蓉.
   *
   * Dipakai di navbar, hero, footer, dan sebagai cap stempel di bagian
   * testimoni. Cap merah Tionghoa memang lazimnya berisi NAMA pemiliknya
   * (印章), jadi memakai nama asli di situ justru bentuk yang benar — bukan
   * kata umum seperti 好评.
   *
   * Kosongkan ("") kalau tidak ingin ditampilkan.
   */
  teacherNameHanzi: "吳佩蓉",
  /** Dipakai di <title> dan hasil pencarian Google. */
  tagline: "Guru Les Mandarin Privat — Anak, Dewasa, HSK & Bisnis",
  /** Domain final saat sudah live (untuk metadata & sitemap). */
  url: "[PLACEHOLDER: https://domain-anda.com]",
  /** Kota. Kosongkan ("") kalau kelas 100% online. */
  city: "[PLACEHOLDER: Kota]",
  email: "[PLACEHOLDER: email@domain.com]",
  instagram: "[PLACEHOLDER: https://instagram.com/username]",
} as const;

/* -------------------------------------------------------------------------- */
/*  HERO — guru memperkenalkan diri                                           */
/* -------------------------------------------------------------------------- */

export const hero = {
  /** Hanzi yang digambar goresan demi goresan di hero. */
  hanzi: "你好",
  pinyin: "nǐ hǎo",

  /** Label kecil di atas 你好 — menjelaskan layanannya, bukan orangnya. */
  eyebrow: "Les Mandarin Privat",

  /**
   * Baris perkenalan: "{greeting} {nama}, {role}."
   * Nama diambil otomatis dari `site.teacherName`, jadi cukup diganti di satu
   * tempat. `role` sengaja berbeda dari `eyebrow` di atas — kalau keduanya
   * sama, pengunjung membaca kalimat yang sama dua kali dalam satu layar.
   */
  greeting: "Saya",
  role: "guru Mandarin privat",

  /**
   * Tampilkan nama Mandarin guru di samping namanya di hero.
   * Untuk guru bahasa Mandarin, ini bukan hiasan — nama Tionghoa sendiri
   * langsung menyampaikan kedekatan dengan bahasanya.
   */
  showNameHanzi: true,

  /** Kalimat utama. Ditulis dari sudut pandang guru. */
  headline: "Saya ajar Mandarin sampai kamu berani ngomong, bukan cuma hafal.",

  subheadline:
    "Kelas privat buat anak, remaja, dewasa, persiapan HSK, sampai kebutuhan kerja. " +
    "Materinya saya sesuaikan sama level dan tujuan kamu — bukan ngejar buku sampai habis.",

  /** Foto utama guru. WAJIB ada — ini wajah dari seluruh website. */
  photo: "/images/guru.png",
  photoAlt: "Cherlie Lenn, guru les Mandarin privat",
  /**
   * Set `false` setelah `photo` di atas diganti foto guru yang sebenarnya.
   *
   * Dulu status ini ditebak dari nama berkasnya (".jpg" berarti masih buatan
   * skrip). Cara itu berhenti bekerja begitu skrip placeholder ikut menulis
   * .png — nama berkas yang sama tidak bisa lagi membedakan gambar sementara
   * dari foto asli. Jadi penandanya ditulis terang-terangan di sini.
   */
  photoIsPlaceholder: true,

  ctaLabel: "Chat soal kelas trial",
  /*
   * Sengaja TIDAK menanyakan biaya, karena tepat di sebelah tombol ini sudah
   * tertulis kelas trial-nya gratis. Menyuruh pengunjung membuka chat dengan
   * pertanyaan yang jawabannya baru saja mereka baca membuat janji "gratis"
   * di atasnya terdengar tidak sungguh-sungguh.
   */
  ctaMessage:
    "Halo, saya lihat websitenya. Saya tertarik ikut kelas trial Mandarin. Boleh minta info jadwal yang masih kosong?",

  /** Tautan kedua di hero — mengarah ke daftar kelas, bukan ke WhatsApp. */
  secondaryCtaLabel: "Lihat kelas yang saya ajar",
  secondaryCtaHref: "#kelas",
} as const;

/* -------------------------------------------------------------------------- */
/*  CERITA SAYA                                                               */
/* -------------------------------------------------------------------------- */

export const story = {
  eyebrow: "Cerita Saya",
  hanzi: "关于",
  headline: "Kenapa saya ngajar Mandarin.",

  /** Bio orang pertama. Satu paragraf per elemen array. */
  bio: [
    "[PLACEHOLDER: Paragraf 1 — gimana saya mulai belajar Mandarin, dan kenapa akhirnya milih ngajar. Tulis kayak lagi cerita ke orang, bukan kayak CV.]",
    "[PLACEHOLDER: Paragraf 2 — cara saya ngajar. Mis. materi disesuaikan sama tujuan tiap murid, dan murid didorong ngomong dari sesi pertama walau masih belepotan.]",
  ],

  /**
   * Foto kedua — opsional, suasana mengajar atau foto kasual.
   * Set ke `null` kalau hanya punya satu foto; bagiannya otomatis tampil
   * tanpa foto dan tetap rapi.
   */
  photo: null as string | null, // [OPSIONAL: foto kedua, mis. suasana kelas]
  photoAlt: "",

  /** Kredensial. WAJIB diisi data asli — jangan mengarang. */
  credentials: [
    { label: "Pendidikan", value: "[PLACEHOLDER: mis. S1 Sastra Tionghoa, Universitas X]" },
    { label: "Sertifikasi", value: "[PLACEHOLDER: mis. HSK 6 / sertifikat pengajar]" },
    { label: "Pengalaman", value: "[PLACEHOLDER: X tahun mengajar]" },
    { label: "Jumlah murid", value: "[PLACEHOLDER: mis. 100+ murid]" },
  ],

  /*
   * Bagian ini sengaja TIDAK punya tombol WhatsApp.
   *
   * Pembaca cerita guru belum di titik memutuskan, dan tombol utama sudah ada
   * satu layar di atas. Ajakannya menunggu sampai pengunjung melihat kelas dan
   * harganya — di situ barulah tombolnya berarti.
   */
} as const;

/* -------------------------------------------------------------------------- */
/*  KELAS YANG SAYA AJARKAN                                                   */
/* -------------------------------------------------------------------------- */

export type Program = {
  /** Dipakai untuk anchor link & key React. Jangan diubah sembarangan. */
  id: string;
  name: string;
  /** Label Hanzi pendek. Tambah huruf baru -> jalankan `npm run fonts:cjk`. */
  hanzi: string;
  pinyin: string;
  description: string;
  /** 3 poin isi kelas. */
  points: readonly string[];
};

export const programs: readonly Program[] = [
  {
    id: "anak",
    name: "Anak-anak",
    hanzi: "儿童",
    pinyin: "értóng",
    description:
      "Saya kenalkan Mandarin lewat cara yang seru — lagu, gambar, dan permainan. Anak dibiasakan dengar dan menirukan dulu, baru masuk ke tulisan.",
    points: [
      "Pinyin & pengucapan dasar",
      "Kosakata harian dan angka",
      "Nulis Hanzi dengan urutan goresan yang benar",
    ],
  },
  {
    id: "remaja-dewasa",
    name: "Remaja & Dewasa",
    hanzi: "成人",
    pinyin: "chéngrén",
    description:
      "Dari nol sampai lancar ngobrol. Cocok kalau kamu belajar buat kebutuhan pribadi, kuliah, atau sekadar penasaran.",
    points: [
      "Percakapan sehari-hari",
      "Tata bahasa yang naik bertahap",
      "Latihan ngomong tiap sesi",
    ],
  },
  {
    id: "hsk",
    name: "Persiapan HSK",
    hanzi: "考试",
    pinyin: "kǎoshì",
    description:
      "Buat kamu yang lagi ngejar target skor. Materinya saya susun mundur dari tanggal ujian, lengkap sama latihan soal dan simulasi.",
    points: [
      "Target level HSK 1–6",
      "Latihan soal & pembahasan",
      "Simulasi ujian sebelum hari-H",
    ],
  },
  {
    id: "bisnis",
    name: "Bisnis & Profesional",
    hanzi: "商务",
    pinyin: "shāngwù",
    description:
      "Mandarin buat dunia kerja — rapat, negosiasi, email, sampai basa-basi sama rekan atau klien dari Tiongkok.",
    points: [
      "Kosakata sesuai bidang kerja kamu",
      "Email & chat formal",
      "Cara komunikasi yang pas di dunia kerja Tiongkok",
    ],
  },
] as const;

export const programsSection = {
  eyebrow: "Kelas",
  hanzi: "课程",
  headline: "Yang saya ajarkan.",
  intro:
    "Tiap murid mulai dari titik yang beda. Pilih yang paling dekat sama tujuan kamu — " +
    "nanti tetap saya sesuaikan lagi setelah kelas trial.",

  /**
   * Satu label untuk keempat kartu, karena tujuannya sekarang sama: turun ke
   * bagian Harga. Dulu tiap kartu punya tombol WhatsApp sendiri dengan pesan
   * berbeda — lihat catatan di bawah kalau mau dikembalikan.
   */
  ctaLabel: "Lihat paket & harga",
} as const;

/*
 * ARSIP — pesan WhatsApp per kartu kelas.
 *
 * Sampai sebelumnya tiap kartu di atas punya tombol WhatsApp sendiri dengan
 * pesan yang sudah terisi, jadi guru langsung tahu chat-nya datang dari kartu
 * mana. Tombol itu diganti tautan ke #harga supaya ajakan WhatsApp di halaman
 * ini tidak menumpuk.
 *
 * Teksnya disimpan di sini — bukan di riwayat Git — supaya tidak hilang kalau
 * suatu saat polanya mau dikembalikan:
 *
 *   anak:
 *     "Halo, saya mau tanya soal kelas Mandarin untuk anak. Anak saya berusia
 *      ___ tahun. Boleh minta info jadwal dan biayanya?"
 *   remaja-dewasa:
 *     "Halo, saya mau tanya soal kelas Mandarin reguler untuk remaja/dewasa.
 *      Saat ini level saya ___ (pemula/pernah belajar). Boleh minta info jadwal
 *      dan biayanya?"
 *   hsk:
 *     "Halo, saya mau tanya soal kelas persiapan HSK. Saya menargetkan HSK
 *      level ___ dan rencana ujian sekitar ___. Boleh minta info jadwal dan
 *      biayanya?"
 *   bisnis:
 *     "Halo, saya mau tanya soal kelas Mandarin untuk kebutuhan
 *      bisnis/profesional. Bidang kerja saya ___. Boleh minta info jadwal dan
 *      biayanya?"
 */

/* -------------------------------------------------------------------------- */
/*  CARA BELAJAR (urutan proses — penomoran memang disengaja di sini)         */
/* -------------------------------------------------------------------------- */

export const howItWorks = {
  eyebrow: "Cara Belajar",
  hanzi: "流程",
  headline: "Mulai dari satu chat.",
  steps: [
    {
      title: "Kita ngobrol dulu",
      description:
        "Cerita aja mau belajar buat apa, sekarang levelnya gimana, dan kira-kira bisanya jadwal kapan. Dari situ saya sarankan kelas yang paling pas.",
    },
    {
      title: "Ambil kelas trial",
      description:
        "Satu sesi buat saya ngukur level kamu, sekaligus buat kamu nyobain cara saya ngajar. Nggak ada kewajiban lanjut.",
    },
    {
      title: "Belajar rutin",
      description:
        "Jadwal tetap tiap minggu, materinya saya siapkan khusus buat kamu. Tiap beberapa sesi saya kasih catatan perkembangan.",
    },
  ],

  /*
   * SENGAJA TANPA TOMBOL WHATSAPP DI SINI.
   *
   * Bagian ini cuma menjelaskan alurnya. Satu layar di bawah sudah ada bagian
   * Harga dengan tombolnya sendiri, dan ajakan penutup setelah FAQ — tombol di
   * sini cuma jadi pengulangan ketiga dengan permintaan yang sama.
   *
   * Teks lamanya, kalau suatu saat mau dipasang lagi:
   *   ctaLabel:   "Mulai dari ngobrol dulu"
   *   ctaMessage: "Halo, saya mau nanya-nanya dulu soal les Mandarin. Tujuan
   *                belajar saya ___ dan level saya sekarang ___. Boleh
   *                dibantu?"
   */
} as const;

/* -------------------------------------------------------------------------- */
/*  TESTIMONI                                                                 */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  name: string;
  /** Konteks singkat: "Orang tua murid", "Murid HSK 4", dst. */
  role: string;
};

/**
 * ⚠️⚠️  SEMUA TESTIMONI DI BAWAH INI ADALAH CONTOH TATA LETAK, BUKAN ASLI. ⚠️⚠️
 *
 * TODO: replace with real testimonial — ganti seluruh isi array ini dengan
 * testimoni asli dari murid, dan pastikan sudah ada izin untuk memakai
 * nama/inisial mereka. JANGAN publikasikan website dengan teks contoh ini.
 */
export const testimonials: readonly Testimonial[] = [
  {
    // TODO: replace with real testimonial
    quote:
      "[PLACEHOLDER: testimoni asli murid — 1 sampai 2 kalimat tentang hasil yang mereka rasakan setelah belajar.]",
    name: "[PLACEHOLDER: Nama / Inisial]",
    role: "[PLACEHOLDER: mis. Murid kelas dewasa]",
  },
  {
    // TODO: replace with real testimonial
    quote:
      "[PLACEHOLDER: testimoni asli murid — sebutkan hal spesifik, mis. berhasil lolos HSK 4 atau anak jadi berani bicara.]",
    name: "[PLACEHOLDER: Nama / Inisial]",
    role: "[PLACEHOLDER: mis. Orang tua murid]",
  },
  {
    // TODO: replace with real testimonial
    quote:
      "[PLACEHOLDER: testimoni asli murid — boleh soal cara mengajar, fleksibilitas jadwal, atau materi yang dipakai.]",
    name: "[PLACEHOLDER: Nama / Inisial]",
    role: "[PLACEHOLDER: mis. Murid persiapan HSK]",
  },
  {
    // TODO: replace with real testimonial
    quote:
      "[PLACEHOLDER: testimoni asli murid — mis. dari murid kelas bisnis soal penggunaan Mandarin di pekerjaan.]",
    name: "[PLACEHOLDER: Nama / Inisial]",
    role: "[PLACEHOLDER: mis. Murid kelas bisnis]",
  },
] as const;

export const testimonialsSection = {
  eyebrow: "Testimoni",
  hanzi: "评价",
  headline: "Kata murid saya.",
  /**
   * Cap stempel merah memakai `site.teacherNameHanzi` — cap Tionghoa (印章)
   * memang berisi nama pemiliknya, jadi tidak ada teks terpisah di sini.
   */
} as const;

/* -------------------------------------------------------------------------- */
/*  HARGA / PAKET                                                             */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️  SEMUA ANGKA HARGA DI BAWAH INI CONTOH — WAJIB DIGANTI SEBELUM GO-LIVE.
 *
 * Nominalnya ditulis berbentuk wajar supaya tata letaknya bisa diperiksa dengan
 * angka sungguhan, BUKAN karena angkanya benar. Tidak satu pun berasal dari
 * tarif nyata.
 *
 * Sakelar ini ada karena angka yang terlihat masuk akal tidak lagi tertangkap
 * pemeriksa "[PLACEHOLDER: ...]" — dan harga yang salah justru jenis kesalahan
 * yang paling mahal kalau lolos ke publik. Set `false` HANYA setelah seluruh
 * harga diganti tarif yang sebenarnya.
 */
export const PRICES_ARE_PLACEHOLDER = true;

/**
 * HARGA DIHITUNG, TIDAK DIDAFTAR SATU-SATU.
 *
 * Harganya bergantung pada tiga hal sekaligus: jenis kelas, durasi sesi, dan
 * format. Kalau tiap kombinasi ditulis manual, jumlahnya 4 × 2 × 2 × 2 paket
 * berbayar = 32 angka yang semuanya harus dijaga tetap konsisten — dan begitu
 * tarifnya naik sekali saja, tiga puluh dua-duanya harus disunting.
 *
 * Jadi yang ditulis cuma HARGA DASAR per jenis kelas (durasi 60 menit, online).
 * Durasi dan format bekerja sebagai pengali di atasnya. Sepuluh angka, bukan
 * tiga puluh dua. Ini juga cara tarif les biasanya disusun: 90 menit tidak
 * dihitung ulang dari nol, tapi sekian persen dari 60 menit.
 *
 * CARA MENGUBAH TARIF:
 *   - Naik/turun untuk satu jenis kelas  -> ubah satu baris di `basePrices`
 *   - Selisih 90 menit terlalu mahal     -> ubah `multiplier` di axes.durasi
 *   - Offline tidak jadi lebih mahal     -> set multiplier-nya 1
 *
 * Kalau suatu kombinasi ternyata perlu harga khusus yang tidak mengikuti rumus,
 * tambahkan penanganannya di src/lib/pricing.ts — jangan memaksakan pengali.
 */
export const pricing = {
  eyebrow: "Harga",
  hanzi: "学费",
  headline: "Pilih paket yang pas sama ritme belajarmu.",

  showPrices: true,
  hiddenPriceLabel: "Tanya lewat chat",

  /*
   * Sengaja hanya menyatakan hal yang sudah benar menurut isi situs ini
   * (hero menyebut kelas privat), supaya tidak ada janji baru yang belum tentu
   * bisa ditepati.
   *
   * Yang pantas ditambahkan di sini kalau ketentuannya sudah pasti: apakah
   * materi sudah termasuk, cara dan waktu pembayaran, serta aturan penjadwalan
   * ulang. Ketiganya pertanyaan yang paling sering muncul setelah orang melihat
   * angka — dijawab di sini, tidak perlu ditanyakan lewat chat.
   */
  note: "Harga berlaku untuk kelas privat 1-on-1.",

  /*
   * Pintu keluar untuk yang tidak cocok dengan satu pun kartu di atas.
   *
   * Daftar harga apa pun pasti meninggalkan sebagian orang: jadwal yang aneh,
   * jumlah sesi di antara dua paket, dua anak sekaligus. Tanpa kalimat ini
   * mereka menyimpulkan sendiri bahwa kebutuhannya tidak dilayani, lalu pergi
   * tanpa pernah bertanya.
   *
   * Tautan teks, bukan tombol. Bagian ini sudah sengaja dibersihkan dari
   * tombol supaya kartunya menjawab alih-alih meminta — dan orang yang sampai
   * membaca kalimat ini memang sedang mencari jalan bertanya, jadi tautannya
   * tidak perlu berteriak untuk ditemukan.
   *
   * Kalimatnya dipecah tiga supaya seluruh teksnya tetap di berkas ini, bukan
   * separuh di sini dan separuh tertanam di dalam komponen.
   */
  customNote: {
    before: "Untuk harga atau kebutuhan custom, silakan ",
    linkLabel: "hubungi langsung",
    after: ".",
    /** Sengaja beda dari pesan lain, supaya ketahuan datang dari bagian Harga. */
    waMessage:
      "Halo, kebutuhan saya kayaknya beda dari paket yang ada di website. Boleh tanya-tanya dulu?",
  },

  /**
   * Tiga sumbu pilihan. Urutannya = urutan tampil di layar, dan yang pertama
   * dianggap paling penting: itu yang paling mengubah angka.
   *
   * `id` pada jenisKelas SENGAJA sama dengan `id` di `programs` di atas,
   * sehingga kartu kelas dan harga berbicara tentang hal yang sama.
   */
  axes: {
    jenisKelas: {
      label: "Jenis kelas",
      options: [
        { id: "anak", label: "Anak" },
        { id: "remaja-dewasa", label: "Remaja & Dewasa" },
        { id: "hsk", label: "Persiapan HSK" },
        { id: "bisnis", label: "Bisnis" },
      ],
    },
    durasi: {
      label: "Durasi sesi",
      options: [
        { id: "60", label: "60 menit", multiplier: 1 },
        // 1.4, bukan 1.5 — 90 menit memang lebih lama, tapi persiapan dan
        // pembukaan kelasnya sama saja, jadi tidak adil menagih 1,5 kali penuh.
        { id: "90", label: "90 menit", multiplier: 1.4 },
      ],
    },
    format: {
      label: "Format",
      options: [
        { id: "online", label: "Online", multiplier: 1 },
        // Selisihnya menutup waktu dan ongkos perjalanan.
        { id: "offline", label: "Offline", multiplier: 1.15 },
      ],
    },
  },

  /**
   * Harga dasar: durasi 60 menit, format online.
   * Kunci luar = id jenis kelas, kunci dalam = id paket berbayar.
   *
   * Intensif sengaja lebih murah per sesi daripada Reguler — paket besar harus
   * punya alasan untuk dipilih. Kalau angkanya diganti, jaga hubungan itu.
   */
  basePrices: {
    "anak": { reguler: 1200000, intensif: 2240000 },
    "remaja-dewasa": { reguler: 1400000, intensif: 2600000 },
    "hsk": { reguler: 1600000, intensif: 3000000 },
    "bisnis": { reguler: 1800000, intensif: 3400000 },
  },

  packages: [
    {
      id: "coba",
      name: "Kelas Trial",
      hanzi: "试听",
      /** Gratis di semua kombinasi, jadi tidak punya baris di `basePrices`. */
      free: true,
      sessions: 1,
      description: "Satu sesi buat ngukur level kamu sekaligus nyobain cara saya ngajar.",
      features: ["Cek level awal", "Saran jalur belajar", "Tanpa kewajiban lanjut"],
      highlighted: false,
    },
    {
      id: "reguler",
      name: "Paket Reguler",
      hanzi: "常规",
      free: false,
      sessions: 8,
      description: "Paling banyak diambil murid saya buat belajar rutin tiap minggu.",
      features: [
        "Materi disusun sesuai tujuan kamu",
        "Catatan perkembangan rutin",
        "Bebas nanya di luar jam kelas",
      ],
      highlighted: true,
    },
    {
      id: "intensif",
      name: "Paket Intensif",
      hanzi: "强化",
      free: false,
      sessions: 16,
      description: "Buat yang lagi ngejar tenggat — ujian HSK atau penempatan kerja, misalnya.",
      features: [
        "Lebih sering ketemu tiap minggu",
        "Latihan soal & simulasi ujian",
        "Evaluasi target tiap bulan",
      ],
      highlighted: false,
    },
  ],

  /*
   * SENGAJA TANPA TOMBOL DI KARTU MANA PUN.
   *
   * Sekarang harganya terbuka, jadi kartu-kartu ini tugasnya menjawab, bukan
   * meminta. Ajakan penutup setelah FAQ yang memegang aksinya — di situ
   * pengunjung sudah membaca harga, cara belajar, dan jawaban keraguannya.
   *
   * Teks tombol lamanya, kalau suatu saat mau dipasang lagi:
   *   coba:     "Ambil kelas trial"    — "Halo, saya mau ambil kelas trial
   *                                      Mandarin. Boleh dibantu info jadwal
   *                                      yang masih kosong?"
   *   reguler:  "Tanya paket reguler"  — "Halo, saya mau tanya detail Paket
   *                                      Reguler les Mandarin — jumlah sesi,
   *                                      jadwal, dan biayanya. Terima kasih!"
   *   intensif: "Tanya paket intensif" — "Halo, saya mau tanya detail Paket
   *                                      Intensif les Mandarin. Target saya ___
   *                                      dengan tenggat sekitar ___. Boleh minta
   *                                      info biayanya?"
   */
} as const;

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

export const faq = {
  eyebrow: "Pertanyaan Umum",
  hanzi: "问答",
  headline: "Yang sering ditanyain.",
  items: [
    {
      question: "Kelasnya online atau offline?",
      answer:
        "[PLACEHOLDER: jelaskan format yang benar-benar ditawarkan — online saja, atau online dan offline. Kalau ada offline, sebutkan area/kota jangkauannya.]",
    },
    {
      question: "Satu sesi berapa lama?",
      answer:
        "[PLACEHOLDER: mis. 60 menit per sesi buat dewasa, 45 menit buat anak-anak.] Frekuensinya nanti nyesuaikan jadwal kamu, biasanya kita tentukan bareng setelah kelas trial.",
    },
    {
      question: "Saya belum pernah belajar Mandarin sama sekali, bisa ikut?",
      answer:
        "Bisa banget. Saya mulai dari pinyin dan cara ngucapinnya, jadi kamu nggak perlu bekal apa-apa. Kelas trial saya pakai buat mastiin titik mulainya pas.",
    },
    {
      question: "Materinya pakai buku apa?",
      answer:
        "[PLACEHOLDER: sebutkan buku/materi yang dipakai, mis. HSK Standard Course, Boya Chinese, atau materi susunan sendiri.] Materi tambahannya saya sesuaikan sama tujuan tiap murid.",
    },
    {
      question: "Bayarnya gimana?",
      answer:
        "[PLACEHOLDER: jelaskan metode pembayaran — transfer bank / e-wallet, dibayar di muka per paket atau per bulan.]",
    },
    {
      question: "Kalau saya berhalangan, bisa reschedule?",
      answer:
        "[PLACEHOLDER: jelaskan aturan reschedule — mis. bisa dijadwal ulang kalau ngabarin minimal X jam sebelum kelas, maksimal X kali per paket.]",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  CTA PENUTUP & FOOTER                                                      */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  hanzi: "开始",
  headline: "Siap mulai belajar Mandarin?",
  body:
    "Cerita aja dulu mau belajar buat apa. Biasanya saya nggak lama balas, " +
    "dan nanya-nanya nggak dipungut biaya.",
  ctaLabel: "Chat sekarang",
  ctaMessage:
    "Halo, saya mau mulai les Mandarin. Boleh minta info jadwal, paket, dan biayanya?",
} as const;

export const nav = {
  ctaLabel: "Chat via WhatsApp",
  ctaMessage: "Halo, saya mau tanya soal les Mandarin.",
  /** Pesan untuk tombol WhatsApp melayang di pojok kanan bawah. */
  floatingCtaMessage: "Halo, saya mau tanya soal les Mandarin.",
  links: [
    { label: "Cerita Saya", href: "#cerita" },
    { label: "Kelas", href: "#kelas" },
    { label: "Cara Belajar", href: "#cara-belajar" },
    { label: "Harga", href: "#harga" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;
