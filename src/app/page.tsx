import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Instagram,
  Facebook,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { getAllGallery, getAllNews, getSchoolProfile } from "@/lib/db";
import GalleryGrid from "@/components/GalleryGrid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, latestNews, galleryItems] = await Promise.all([
    getSchoolProfile(),
    getAllNews({ limit: 3 }),
    getAllGallery(),
  ]);

  const featuredAnnouncement =
    latestNews.find((n) => n.category === "Pengumuman") || latestNews[0];

  return (
    <div>
      {/* Announcement Bar */}
      {featuredAnnouncement && (
        <div className="bg-amber-50 border-b border-amber-200/80 py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-amber-950">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[11px] uppercase tracking-wider">
                Info Terkini
              </span>
              <span className="font-medium line-clamp-1">
                {featuredAnnouncement.title}
              </span>
            </div>
            <Link
              href={`/berita/${featuredAnnouncement.slug}`}
              className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950 shrink-0"
            >
              Selengkapnya
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 text-white islamic-pattern">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-amber-300 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>YPIS Al-Ittihad • Kementerian Agama RI</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-tight tracking-tight">
                Madrasah Aliyah{" "}
                <span className="text-amber-400">Al-Ittihad Tawangsari</span>{" "}
                Trowulan Mojokerto
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                {profile.tagline}. Memadukan keunggulan akademik pendidikan menengah atas,
                tradisi keilmuan Pondok Pesantren Al-Ittihad, dan pembinaan Tahfiz Al-Qur&apos;an
                di jantung kawasan bersejarah Trowulan.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/kontak#ppdb"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 transition-all"
                >
                  <span>Pendaftaran Siswa Baru (PPDB)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm sm:text-base backdrop-blur-sm transition-all"
                >
                  <span>Profil & Identitas Resmi</span>
                </Link>
              </div>

              {/* Quick Trust Pills */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-emerald-200">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  NPSN Resmi: <strong className="text-white">{profile.npsn}</strong>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Status: <strong className="text-white">Terakreditasi {profile.accreditation}</strong>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  Berdiri Sejak <strong className="text-white">{profile.foundedYear}</strong>
                </span>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                    alt="Kegiatan Belajar MAS Al-Ittihad Tawangsari"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent flex flex-col justify-end p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Let&apos;s Join With Us • @galery_malta
                    </span>
                    <p className="text-white font-bold text-lg mt-0.5">
                      MAS Al-Ittihad (MALTA)
                    </p>
                    <p className="text-emerald-200 text-xs mt-1">
                      Jl. Raden Wijaya No. 105, Tawangsari, Trowulan, Mojokerto
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                  <div className="bg-emerald-950/60 rounded-xl p-3 border border-white/10">
                    <p className="text-amber-400 font-extrabold text-xl">2000</p>
                    <p className="text-[11px] text-emerald-200">Tahun Berdiri</p>
                  </div>
                  <div className="bg-emerald-950/60 rounded-xl p-3 border border-white/10">
                    <p className="text-amber-400 font-extrabold text-xl">B</p>
                    <p className="text-[11px] text-emerald-200">Akreditasi BAN-PDM</p>
                  </div>
                  <div className="bg-emerald-950/60 rounded-xl p-3 border border-white/10">
                    <p className="text-amber-400 font-extrabold text-xl">6+</p>
                    <p className="text-[11px] text-emerald-200">Unit YPIS Terpadu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan & Program Inti */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
            Pilar Pendidikan MALTA
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Pendidikan Menengah Atas Berlandaskan Agama Islam
          </h2>
          <p className="mt-3 text-slate-600">
            Menyiapkan lulusan yang kokoh dalam akidah Ahlussunnah wal Jama&apos;ah, fasih membaca &
            menghafal Al-Qur&apos;an, serta cakap menghadapi tantangan akademik masa depan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profile.programs.map((prog, idx) => {
            const icons = [BookOpen, GraduationCap, Users];
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={prog.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  {prog.subtitle}
                </span>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{prog.title}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {prog.description}
                </p>
                <ul className="mt-5 pt-5 border-t border-slate-100 space-y-2.5 flex-1">
                  {prog.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Identitas Singkat & Ekosistem YPIS Al-Ittihad */}
      <section className="py-16 bg-emerald-950 text-white islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
                <Building2 className="w-4 h-4" />
                Ekosistem Pendidikan Terpadu
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                Naungan Yayasan Pendidikan Islam & Sosial (YPIS) Al-Ittihad
              </h2>
              <p className="text-emerald-100/85 text-sm sm:text-base leading-relaxed">
                {profile.founderNote}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/profil"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm transition-colors"
                >
                  Baca Sejarah & Visi Misi
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={profile.links.kemendikdasmen}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-colors"
                >
                  Cek NPSN {profile.npsn}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.ecosystem.map((unit) => (
                <div
                  key={unit.name}
                  className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm transition-all"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {unit.level}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{unit.name}</h3>
                  <p className="text-xs text-emerald-200/85 mt-1.5 leading-relaxed">
                    {unit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Berita & Pengumuman Terbaru */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full">
              Kabar Madrasah
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              Berita & Pengumuman Terbaru
            </h2>
          </div>
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900"
          >
            Lihat Semua Berita
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {latestNews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <Link href={`/berita/${item.slug}`} className="relative h-52 overflow-hidden bg-slate-100 block">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-800 text-white">
                  {item.category}
                </span>
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <Link href={`/berita/${item.slug}`}>
                  <h3 className="text-lg font-bold text-slate-900 hover:text-emerald-800 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3 flex-1">
                  {item.excerpt}
                </p>
                <Link
                  href={`/berita/${item.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  Baca Artikel
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Galeri MALTA (@galery_malta) */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-pink-700 bg-pink-50 border border-pink-200 px-3.5 py-1.5 rounded-full">
                <Instagram className="w-3.5 h-3.5" />
                {profile.links.instagramHandle}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                Galeri Kegiatan MAS Al-Ittihad
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Dokumentasi momen belajar, kepesantrenan, dan prestasi siswa-siswi MALTA.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={profile.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 text-white text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                Ikuti @galery_malta
              </a>
              <Link
                href="/galeri"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 text-sm font-semibold"
              >
                Buka Galeri Penuh
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <GalleryGrid items={galleryItems.slice(0, 6)} showFilter={false} />
        </div>
      </section>

      {/* Lokasi & Jejaring Sosial CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl overflow-hidden shadow-xl border border-emerald-800 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 p-8 sm:p-12 text-white flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                <MapPin className="w-4 h-4" />
                Kunjungi Kampus Madrasah Kami
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                Siap Bergabung Bersama Keluarga Besar MALTA?
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
                Kami menyambut hangat kehadiran calon siswa-siswi baru serta orang tua/wali
                di kampus MAS Al-Ittihad Tawangsari, Kecamatan Trowulan, Kabupaten Mojokerto.
              </p>
              <div className="pt-2 space-y-2 text-sm text-emerald-200">
                <p>
                  <strong className="text-white">Alamat:</strong> {profile.address.full}
                </p>
                <p>
                  <strong className="text-white">SK Operasional:</strong> {profile.skOperational} (TMT {profile.tmtOperational})
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-sm transition-colors"
              >
                Hubungi Kami / Daftar Online
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={profile.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook Resmi
              </a>
              <a
                href={profile.links.banPdm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors"
              >
                <Award className="w-4 h-4 text-amber-400" />
                BAN-PDM
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 min-h-[340px] bg-slate-200">
            <iframe
              title="Peta Lokasi MAS Al-Ittihad Tawangsari Trowulan Mojokerto"
              src="https://www.openstreetmap.org/export/embed.html?bbox=112.3740%2C-7.5219%2C112.3940%2C-7.5019&layer=mapnik&marker=-7.5119%2C112.3840"
              className="w-full h-full min-h-[340px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
