# Website Resmi MAS Al-Ittihad Tawangsari (MALTA) — Trowulan, Mojokerto

Website Full-Stack (**Frontend + Backend API**) untuk **MAS Al-Ittihad Tawangsari** (`NPSN: 20584241`, Terakreditasi **B**), Desa Tawangsari, Kecamatan Trowulan, Kabupaten Mojokerto, Jawa Timur.

Dibangun menggunakan **Next.js 14 App Router (TypeScript + Tailwind CSS)** yang dirancang khusus agar **1-klik siap di-publish ke GitHub dan Vercel**.

---

## Fitur Utama

### Frontend (Antarmuka Pengunjung)
- **Beranda (`/`)**: Banner pengumuman dinamis, Hero profil madrasah, pilar kurikulum terpadu Kemenag & Pondok Pesantren Al-Ittihad, ekosistem YPIS Al-Ittihad, berita terbaru, sorotan `@galery_malta`, dan peta interaktif koordinat resmi (`-7.5119, 112.3840`).
- **Profil Madrasah (`/profil`)**: Sejarah pendirian tahun 2000, Visi & Misi Aswaja, tabel identitas resmi Kemendikdasmen & Kementerian Agama (`NPSN 20584241`, `SK MAS/16.0033/2017`), tautan verifikasi langsung Kemendikdasmen & BAN-PDM, serta daftar ekstrakurikuler.
- **Berita & Pengumuman (`/berita` & `/berita/[slug]`)**: Filter kategori dan pencarian artikel secara instan.
- **Galeri MALTA (`/galeri`)**: Showcase kegiatan terintegrasi dengan akun resmi Instagram [`@galery_malta`](https://www.instagram.com/galery_malta/) dan Facebook [`MA Al-Ittihad Tawangsari Trowulan | Mojokerto`](https://www.facebook.com/p/MA-Al-Ittihad-Tawangsari-Trowulan-100063801349621/?locale=id_ID) lengkap dengan fitur *Lightbox Zoom*.
- **Kontak & PPDB Online (`/kontak`)**: Formulir pendaftaran minat Peserta Didik Baru (PPDB) & layanan pesan Tata Usaha.
- **Dashboard Admin (`/admin`)**: Halaman CMS untuk menambah/menghapus berita, menambah/menghapus foto galeri, serta membaca pesan/pendaftar PPDB.

### Backend (Next.js Serverless REST API)
- `GET /api/health` — Cek status server & mode penyimpanan aktif.
- `GET /api/profile` — Data identitas resmi madrasah.
- `GET / POST /api/news` & `GET / DELETE /api/news/[slug]` — CRUD Berita & Pengumuman.
- `GET / POST /api/gallery` & `DELETE /api/gallery/[id]` — CRUD Galeri Kegiatan.
- `GET / POST /api/contact` & `DELETE /api/contact/[id]` — Layanan Kotak Masuk & PPDB.
- `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` — Autentikasi sesi Admin berbasis *HTTP-Only Signed Cookie*.

---

## Cara Publish ke GitHub & Vercel

### Langkah 1: Upload ke GitHub
1. Buat repository baru di [GitHub](https://github.com/new), misalnya `web-malta-tawangsari`.
2. Jalankan perintah berikut di terminal folder proyek ini (atau upload isi folder ke GitHub):
   ```bash
   git init
   git add .
   git commit -m "Initial commit website MAS Al-Ittihad Tawangsari"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/web-malta-tawangsari.git
   git push -u origin main
   ```

### Langkah 2: Deploy ke Vercel
1. Buka [Vercel Dashboard](https://vercel.com/new) dan login menggunakan akun GitHub Anda.
2. Pilih repository `web-malta-tawangsari` lalu klik **Import**.
3. (Opsional tapi disarankan) Pada bagian **Environment Variables**, tambahkan:
   - `ADMIN_PASSWORD` = *(password pilihan Anda untuk login `/admin`, default: `malta20584241`)*
   - `AUTH_SECRET` = *(teks acak rahasia untuk keamanan cookie login)*
4. Klik **Deploy** — website langsung aktif tanpa konfigurasi tambahan!

---

## Opsional: Mengaktifkan Database Permanen Gratis (Supabase)
Secara bawaan (*Mode Hybrid*), website langsung berjalan otomatis saat pertama kali di-deploy ke Vercel. Jika Anda ingin berita/galeri/pesan yang diinput dari `/admin` tersimpan permanen selamanya di cloud database:

1. Buat proyek gratis di [Supabase](https://supabase.com).
2. Buka menu **SQL Editor** di Supabase, salin seluruh isi file [`supabase-schema.sql`](./supabase-schema.sql), lalu klik **Run**.
3. Salin **Project URL** dan **service_role secret key** dari menu *Project Settings -> API* di Supabase.
4. Masukkan ke **Environment Variables** di Vercel:
   - `SUPABASE_URL` = `https://xxxx.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY` = `eyJhbGci...`
5. Klik **Redeploy** di Vercel. Sistem backend otomatis beralih ke mode **Supabase PostgreSQL (Permanen)**!
