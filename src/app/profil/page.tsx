import React from "react";
import type { Metadata } from "next";
import {
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Compass,
  ExternalLink,
  FileCheck2,
  History,
  Sparkles,
} from "lucide-react";
import { getSchoolProfile } from "@/lib/db";

export const metadata: Metadata = {
  title: "Profil, Sejarah & Identitas Resmi",
  description:
    "Profil lengkap MAS Al-Ittihad Tawangsari (NPSN 20584241), sejarah pendirian tahun 2000, visi misi, dan data perizinan resmi Kementerian Agama & Kemendikdasmen.",
};

export default async function ProfilPage() {
  const profile = await getSchoolProfile();

  const identityRows = [
    { label: "Nama Resmi Satuan Pendidikan", value: profile.officialName },
    { label: "Nama Populer / Akronim", value: `${profile.name} (${profile.shortName})` },
    { label: "NPSN (Nomor Pokok Sekolah Nasional)", value: profile.npsn },
    { label: "Bentuk & Jenjang Pendidikan", value: `${profile.educationForm} — ${profile.educationLevel}` },
    { label: "Status Sekolah", value: profile.status },
    { label: "Kementerian Pembina", value: profile.ministry },
    { label: "Yayasan Penyelenggara", value: profile.foundation },
    { label: "Nomor SK Izin Operasional", value: profile.skOperational },
    { label: "TMT SK Operasional", value: profile.tmtOperational },
    { label: "Peringkat Akreditasi", value: `Terakreditasi ${profile.accreditation} (BAN-PDM)` },
    { label: "Operator Data Pendidikan", value: profile.operatorName },
    { label: "Alamat Lengkap", value: profile.address.full },
    { label: "Koordinat Geografis", value: `Lintang ${profile.address.lat}, Bujur ${profile.address.lng}` },
  ];

  return (
    <div className="pb-20">
      {/* Header Banner */}
      <section className="bg-emerald-950 text-white py-16 islamic-pattern border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Building2 className="w-4 h-4" />
            Tentang Madrasah Kami
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            Profil MAS Al-Ittihad Tawangsari
          </h1>
          <p className="mt-3 text-emerald-100/90 max-w-3xl text-sm sm:text-base leading-relaxed">
            Mengenal sejarah perjuangan pendirian, visi misi keislaman, ekosistem kepesantrenan,
            serta identitas hukum resmi MAS Al-Ittihad (NPSN {profile.npsn}) di Kecamatan Trowulan,
            Kabupaten Mojokerto.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Sejarah & Gambaran Umum */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <History className="w-5 h-5 text-amber-600" />
              <span>Sejarah & Latar Belakang</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Berdiri Sejak Tahun {profile.foundedYear} di Bumi Majapahit Trowulan
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {profile.description}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {profile.founderNote}
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Berada dalam satu kompleks terpadu dengan <strong>Pondok Pesantren Al-Ittihad</strong>,
              peserta didik mendapatkan atmosfer religius yang kental dengan tradisi Al-Qur&apos;an
              (tahsin &amp; tahfiz), kajian kitab kuning, serta pembinaan akhlakul karimah tanpa
              meninggalkan penguasaan sains dan teknologi modern.
            </p>
          </div>

          {/* Visi & Misi */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-2xl p-7 sm:p-9 shadow-lg space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Visi Madrasah</span>
              </div>
              <p className="mt-2 text-base sm:text-lg font-semibold leading-relaxed text-emerald-50">
                &ldquo;{profile.vision}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/15">
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                <Sparkles className="w-4 h-4" />
                <span>Misi Pendidikan</span>
              </div>
              <ul className="space-y-3">
                {profile.missions.map((m, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tabel Identitas Resmi Kemendikdasmen & Kemenag */}
        <section id="identitas" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Data Referensi Pusdatin & Kemenag</span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                Identitas Resmi & Dokumen Perizinan
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={profile.links.kemendikdasmen}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors"
              >
                <span>Verifikasi Kemendikdasmen</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={profile.links.banPdm}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-colors"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Sertifikat BAN-PDM</span>
              </a>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {identityRows.map((row) => (
              <div
                key={row.label}
                className="px-6 sm:px-8 py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 hover:bg-slate-50/80 transition-colors text-sm"
              >
                <dt className="sm:col-span-4 font-semibold text-slate-600">{row.label}</dt>
                <dd className="sm:col-span-8 font-bold text-slate-900">{row.value}</dd>
              </div>
            ))}
          </div>
        </section>

        {/* Ekstrakurikuler & Pengembangan Diri */}
        <section>
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Bakat & Kepemimpinan
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Ekstrakurikuler & Organisasi Pelajar MALTA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.extracurriculars.map((eks) => (
              <div
                key={eks.name}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-300 transition-all"
              >
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  {eks.category}
                </span>
                <h3 className="mt-1.5 text-lg font-bold text-slate-900">{eks.name}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {eks.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
