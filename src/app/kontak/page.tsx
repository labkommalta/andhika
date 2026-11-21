import React from "react";
import type { Metadata } from "next";
import {
  Clock,
  Facebook,
  GraduationCap,
  Instagram,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { getSchoolProfile } from "@/lib/db";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontak & Pendaftaran PPDB",
  description:
    "Hubungi Tata Usaha MAS Al-Ittihad Tawangsari Trowulan Mojokerto atau kirim formulir pendaftaran peserta didik baru (PPDB) secara online.",
};

export default async function KontakPage() {
  const profile = await getSchoolProfile();

  return (
    <div className="pb-20">
      <section className="bg-emerald-950 text-white py-16 islamic-pattern border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            <GraduationCap className="w-4 h-4" />
            Layanan Informasi & PPDB Online
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            Hubungi Kami & Pendaftaran Siswa Baru
          </h1>
          <p className="mt-3 text-emerald-100/90 max-w-2xl text-sm sm:text-base">
            Silakan isi formulir di bawah ini untuk pendaftaran minat Peserta Didik Baru (PPDB)
            maupun pertanyaan seputar MAS Al-Ittihad & Pondok Pesantren Al-Ittihad Tawangsari.
          </p>
        </div>
      </section>

      <div id="ppdb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact & PPDB Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-9 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Formulir Pendaftaran Minat PPDB & Pesan
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 mb-6">
              Data yang Anda kirimkan langsung tersimpan di sistem Tata Usaha / Panitia PPDB
              MAS Al-Ittihad Tawangsari.
            </p>
            <ContactForm />
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-lg font-extrabold text-slate-900">
                Kantor Layanan Madrasah
              </h3>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Alamat Kampus</p>
                  <p className="mt-0.5 text-slate-600">{profile.address.full}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <Clock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Jam Pelayanan Tata Usaha</p>
                  <p className="mt-0.5 text-slate-600">
                    Sabtu – Kamis: 07.00 – 14.00 WIB (Jumat Libur Madrasah)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-slate-700">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Identitas Resmi</p>
                  <p className="mt-0.5 text-slate-600">
                    NPSN {profile.npsn} • SK {profile.skOperational} • Akreditasi {profile.accreditation}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Media Sosial Resmi
                </p>
                <a
                  href={profile.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-900 text-sm font-semibold transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram {profile.links.instagramHandle}</span>
                </a>
                <a
                  href={profile.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-sm font-semibold transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-600" />
                  <span>{profile.links.facebookName}</span>
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-72">
              <iframe
                title="Lokasi MAS Al-Ittihad Tawangsari"
                src="https://www.openstreetmap.org/export/embed.html?bbox=112.3740%2C-7.5219%2C112.3940%2C-7.5019&layer=mapnik&marker=-7.5119%2C112.3840"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
