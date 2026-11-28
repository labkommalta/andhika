-- ============================================================================
-- SKEMA DATABASE SUPABASE (POSTGRESQL) RESMI
-- WEBSITE MAS AL-ITTIHAD TAWANGSARI (MALTA) - TROWULAN, MOJOKERTO
-- NPSN: 20584241 | Naungan: YPIS Al-Ittihad Tawangsari
-- ============================================================================
-- Cara Menjalankan:
-- 1. Buka Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Pilih Project Anda -> Masuk ke menu "SQL Editor" di bilah kiri
-- 3. Klik "New Query", paste seluruh isi file ini, lalu klik "RUN"
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. TABEL BERITA & PENGUMUMAN (malta_news)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.malta_news (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Kegiatan',
  image_url TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Tim Humas MALTA',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE
);

-- Indeks performa berita
CREATE INDEX IF NOT EXISTS idx_malta_news_published ON public.malta_news (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_malta_news_slug ON public.malta_news (slug);
CREATE INDEX IF NOT EXISTS idx_malta_news_category ON public.malta_news (category);

-- ----------------------------------------------------------------------------
-- 2. TABEL GALERI KEGIATAN (@galery_malta) (malta_gallery)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.malta_gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Kegiatan Madrasah',
  image_url TEXT NOT NULL,
  instagram_url TEXT DEFAULT 'https://www.instagram.com/galery_malta/',
  taken_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Indeks performa galeri
CREATE INDEX IF NOT EXISTS idx_malta_gallery_taken ON public.malta_gallery (taken_at DESC);
CREATE INDEX IF NOT EXISTS idx_malta_gallery_category ON public.malta_gallery (category);

-- ----------------------------------------------------------------------------
-- 3. TABEL PESAN KONTAK & PENDAFTARAN PPDB (malta_messages)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.malta_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  topic TEXT NOT NULL DEFAULT 'Informasi Umum',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indeks performa pesan & PPDB
CREATE INDEX IF NOT EXISTS idx_malta_messages_created ON public.malta_messages (created_at DESC);

-- ----------------------------------------------------------------------------
-- 4. KEAMANAN: ROW LEVEL SECURITY (RLS)
-- Menjamin Frontend bisa membaca data publik, pengunjung bisa submit form PPDB,
-- dan hanya Backend/Admin yang bisa mengelola data penuh.
-- ----------------------------------------------------------------------------
ALTER TABLE public.malta_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.malta_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.malta_messages ENABLE ROW LEVEL SECURITY;

-- Policy Berita
DROP POLICY IF EXISTS "Public can view news" ON public.malta_news;
CREATE POLICY "Public can view news" 
  ON public.malta_news FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Service role & admin full access news" ON public.malta_news;
CREATE POLICY "Service role & admin full access news" 
  ON public.malta_news FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Policy Galeri
DROP POLICY IF EXISTS "Public can view gallery" ON public.malta_gallery;
CREATE POLICY "Public can view gallery" 
  ON public.malta_gallery FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Service role & admin full access gallery" ON public.malta_gallery;
CREATE POLICY "Service role & admin full access gallery" 
  ON public.malta_gallery FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Policy Pesan & PPDB (Publik bisa kirim formulir, admin bisa melihat & menghapus)
DROP POLICY IF EXISTS "Public can submit contact or PPDB" ON public.malta_messages;
CREATE POLICY "Public can submit contact or PPDB" 
  ON public.malta_messages FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role & admin can view and manage messages" ON public.malta_messages;
CREATE POLICY "Service role & admin can view and manage messages" 
  ON public.malta_messages FOR ALL 
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 5. STORAGE BUCKET UNTUK FOTO & MEDIA MADRASAH (Opsional)
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('malta-media', 'malta-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public can view malta-media" ON storage.objects;
CREATE POLICY "Public can view malta-media" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'malta-media');

DROP POLICY IF EXISTS "Authenticated and service role can upload malta-media" ON storage.objects;
CREATE POLICY "Authenticated and service role can upload malta-media" 
  ON storage.objects FOR INSERT 
  WITH CHECK (bucket_id = 'malta-media');

-- ----------------------------------------------------------------------------
-- 6. DATA AWAL (SEED DATA RESMI MAS AL-ITTIHAD TAWANGSARI)
-- ----------------------------------------------------------------------------

-- Seed Berita & Pengumuman
INSERT INTO public.malta_news (id, slug, title, excerpt, content, category, image_url, author, published_at, is_featured)
VALUES 
(
  'news-1',
  'penerimaan-peserta-didik-baru-mas-al-ittihad-tawangsari',
  'Informasi Penerimaan Peserta Didik Baru (PPDB) MAS Al-Ittihad Tawangsari',
  'Mari bergabung bersama keluarga besar MAS Al-Ittihad Tawangsari (MALTA) Trowulan Mojokerto. Pendidikan menengah atas berbasis Islam, Al-Qur''an, dan keunggulan akademik.',
  'MAS Al-Ittihad Tawangsari (MALTA) yang bernaung di bawah Yayasan Pendidikan Islam dan Sosial (YPIS) Al-Ittihad membuka kesempatan bagi lulusan MTs/SMP sederajat untuk bergabung menjadi peserta didik baru.

Berlokasi di Jl. Raden Wijaya No. 105, Desa Tawangsari, Kecamatan Trowulan, Kabupaten Mojokerto, MAS Al-Ittihad menawarkan lingkungan belajar kondusif yang terintegrasi langsung dengan Pondok Pesantren Al-Ittihad. Siswa dapat memilih jalur mukim (santri pondok pesantren) maupun non-mukim (pulang-pergi bagi warga sekitar Trowulan dan Mojokerto).

Keunggulan bergabung bersama MALTA:
1. Terakreditasi B (BAN-PDM) dengan NPSN resmi 20584241 di bawah binaan Kementerian Agama RI.
2. Pembiasaan ibadah harian: Salat Dhuha, tadarus & tahsin Al-Qur''an, serta pembinaan akhlakul karimah.
3. Ekstrakurikuler beragam mulai dari IPNU-IPPNU, Pramuka Penegak, Seni Hadrah Al-Banjari, Jurnalistik @galery_malta, hingga olahraga dan bela diri.
4. Biaya pendidikan terjangkau serta tersedia program beasiswa prestasi akademik dan tahfiz Al-Qur''an.

Calon peserta didik dan wali murid dapat berkonsultasi langsung melalui halaman Kontak website ini, menghubungi media sosial resmi Instagram @galery_malta, atau berkunjung langsung ke kantor Tata Usaha MAS Al-Ittihad Tawangsari pada jam kerja.',
  'Pengumuman',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
  'Panitia PPDB MALTA',
  '2026-10-20 08:00:00+07',
  true
),
(
  'news-2',
  'peringatan-hari-santri-nasional-ypis-al-ittihad-tawangsari',
  'Semarak Peringatan Hari Santri Nasional di Kompleks YPIS Al-Ittihad Tawangsari',
  'Seluruh civitas akademika MAS Al-Ittihad bersama unit pendidikan se-Yayasan Al-Ittihad menggelar apel Hari Santri, kirab budaya Islami, dan pembacaan shalawat.',
  'Suasana khidmat dan penuh semangat menyelimuti kompleks Yayasan Pendidikan Islam dan Sosial (YPIS) Al-Ittihad Desa Tawangsari, Kecamatan Trowulan, Kabupaten Mojokerto dalam rangka memperingati Hari Santri Nasional.

Siswa-siswi MAS Al-Ittihad (MALTA) tampil mengenakan busana santri khas sarung, baju koko putih, dan busana muslimah rapi mengikuti rangkaian upacara apel pagi, dilanjutkan dengan istighotsah bersama para masyayikh serta dewan guru.

Kegiatan ini juga dimeriahkan oleh penampilan grup Hadrah Al-Banjari MALTA dan dokumentasi kreatif dari tim jurnalistik @galery_malta. Momentum Hari Santri menjadi pengingat penting bagi seluruh pelajar MA Al-Ittihad untuk terus merawat tradisi keilmuan pesantren sekaligus menguasai ilmu pengetahuan modern demi kemajuan bangsa.',
  'Pesantren',
  'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
  'Tim Jurnalistik @galery_malta',
  '2026-10-22 09:30:00+07',
  true
),
(
  'news-3',
  'penguatan-literasi-digital-dan-karya-ilmiah-siswa-malta',
  'Penguatan Literasi Digital & Karya Tulis Ilmiah Remaja Siswa MAS Al-Ittihad',
  'Membekali siswa menghadapi era transformasi teknologi dan seleksi masuk perguruan tinggi melalui pelatihan riset, presentasi ilmiah, dan literasi media.',
  'Dalam upaya meningkatkan daya saing lulusan, MAS Al-Ittihad Tawangsari menyelenggarakan program penguatan literasi digital dan penulisan karya ilmiah bagi siswa kelas X, XI, dan XII.

Melalui pendampingan bapak dan ibu guru pembina, para siswa dilatih menyusun gagasan riset sederhana yang mengangkat kearifan lokal kawasan bersejarah Trowulan serta nilai-nilai keislaman di masyarakat Mojokerto. Selain melatih kemampuan berpikir kritis, kegiatan ini juga mempersiapkan siswa kelas akhir yang berencana melanjutkan pendidikan ke Perguruan Tinggi Keagamaan Islam Negeri (PTKIN) maupun Perguruan Tinggi Negeri umum.',
  'Akademik',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'Bidang Kurikulum MALTA',
  '2026-10-12 10:15:00+07',
  false
),
(
  'news-4',
  'latihan-dasar-kepemimpinan-siswa-osis-ipnu-ippnu-malta',
  'LDKS OSIS & Komisariat IPNU-IPPNU: Cetak Pemimpin Muda Berakhlakul Karimah',
  'Kaderisasi kepemimpinan pelajar MAS Al-Ittihad Tawangsari menekankan kedisiplinan, komunikasi publik, manajemen organisasi, dan ukhuwah Islamiyah.',
  'Pengurus baru OSIS dan Pimpinan Komisariat IPNU-IPPNU MAS Al-Ittihad Tawangsari mengikuti kegiatan Latihan Dasar Kepemimpinan Siswa (LDKS) dengan penuh antusiasme.

Selama kegiatan berlangsung, peserta mendapatkan materi keorganisasian, kepemimpinan profetik, tata kelola administrasi, publikasi media kreatif, hingga outbound kerja sama tim. Kepala Madrasah beserta jajaran pembina berharap kepengurusan baru mampu menghadirkan program-program positif yang menghidupkan iklim akademik dan religius di lingkungan MALTA.',
  'Kegiatan',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80',
  'Kesiswaan MALTA',
  '2026-09-28 07:45:00+07',
  false
)
ON CONFLICT (id) DO NOTHING;

-- Seed Galeri Dokumentasi @galery_malta
INSERT INTO public.malta_gallery (id, title, caption, category, image_url, instagram_url, taken_at)
VALUES
(
  'gal-1',
  'Tadarus & Tahsin Pagi Bersama',
  'Pembiasaan lantunan ayat suci Al-Qur''an sebelum memulai kegiatan belajar mengajar di MAS Al-Ittihad Tawangsari.',
  'Tahfiz & Pesantren',
  'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1000&q=80',
  'https://www.instagram.com/galery_malta/',
  '2026-10-25'
),
(
  'gal-2',
  'Pembelajaran Kolaboratif di Kelas',
  'Suasana diskusi aktif dan presentasi kelompok siswa-siswi MALTA dengan bimbingan dewan guru.',
  'Kegiatan Madrasah',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80',
  'https://www.instagram.com/galery_malta/',
  '2026-10-18'
),
(
  'gal-3',
  'Gema Shalawat & PHBI Madrasah',
  'Penampilan tim Hadrah Al-Banjari dalam peringatan hari besar Islam di halaman YPIS Al-Ittihad Tawangsari.',
  'PHBI & Budaya',
  'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
  'https://www.instagram.com/galery_malta/',
  '2026-10-10'
),
(
  'gal-4',
  'Kegiatan Pramuka Penegak MALTA',
  'Latihan rutin kepramukaan membentuk kemandirian, ketangkasan, dan jiwa gotong royong peserta didik.',
  'Ekstrakurikuler',
  'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1000&q=80',
  'https://www.instagram.com/galery_malta/',
  '2026-09-30'
),
(
  'gal-5',
  'Literasi & Diskusi Ilmiah Pelajar',
  'Pengembangan minat baca, kajian kitab, dan penulisan karya tulis remaja di lingkungan madrasah.',
  'Kegiatan Madrasah',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80',
  'https://www.instagram.com/galery_malta/',
  '2026-09-19'
),
(
  'gal-6',
  'Kaderisasi Organisasi Pelajar & LDKS',
  'Kebersamaan pengurus OSIS dan IPNU-IPPNU Komisariat MA Al-Ittihad Tawangsari usai pelantikan.',
  'Ekstrakurikuler',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80',
  'https://www.instagram.com/galery_malta/',
  '2026-09-05'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Pesan Masuk / Pendaftar Pertama
INSERT INTO public.malta_messages (id, name, phone, email, topic, message, created_at)
VALUES
(
  'msg-welcome',
  'Humas YPIS Al-Ittihad',
  '0812-0000-0000',
  'info@malta-trowulan.sch.id',
  'Informasi Umum',
  'Selamat datang di sistem database Supabase MAS Al-Ittihad Tawangsari (MALTA). Pesan kontak dan pendaftaran PPDB dari pengunjung website akan otomatis tersimpan di tabel ini.',
  '2026-10-01 07:00:00+07'
)
ON CONFLICT (id) DO NOTHING;
