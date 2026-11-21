import React from "react";
import Link from "next/link";
import { MapPin, Instagram, Facebook, ExternalLink, Award, Building2 } from "lucide-react";
import { SCHOOL_PROFILE } from "@/lib/seed-data";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-malta.svg"
                alt="Logo MAS Al-Ittihad"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-lg font-bold text-white">MAS AL-ITTIHAD</h3>
                <p className="text-xs text-amber-400 font-medium">
                  Tawangsari • Trowulan • Mojokerto
                </p>
              </div>
            </div>
            <p className="text-sm text-emerald-200/85 leading-relaxed">
              Lembaga pendidikan menengah atas berciri khas agama Islam di bawah naungan{" "}
              <strong className="text-white">YPIS Al-Ittihad Tawangsari</strong> dan Kementerian Agama RI.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/80 border border-emerald-800 text-xs text-amber-300">
              <Award className="w-4 h-4" />
              <span>NPSN {SCHOOL_PROFILE.npsn} • Akreditasi {SCHOOL_PROFILE.accreditation}</span>
            </div>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
              Navigasi Utama
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/profil" className="hover:text-amber-300 transition-colors">
                  Profil, Sejarah & Visi Misi
                </Link>
              </li>
              <li>
                <Link href="/profil#identitas" className="hover:text-amber-300 transition-colors">
                  Identitas Resmi & Perizinan SK
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-amber-300 transition-colors">
                  Berita & Pengumuman Madrasah
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-amber-300 transition-colors">
                  Galeri Kegiatan (@galery_malta)
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-amber-300 transition-colors">
                  Hubungi Kami & Pendaftaran PPDB
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition-colors">
                  Portal Admin Madrasah
                </Link>
              </li>
            </ul>
          </div>

          {/* Referensi Resmi */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
              Jejaring & Verifikasi Resmi
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={SCHOOL_PROFILE.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Instagram {SCHOOL_PROFILE.links.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={SCHOOL_PROFILE.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>FB MA Al-Ittihad Tawangsari</span>
                </a>
              </li>
              <li>
                <a
                  href={SCHOOL_PROFILE.links.kemendikdasmen}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Referensi Kemendikdasmen</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
              <li>
                <a
                  href={SCHOOL_PROFILE.links.banPdm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-amber-300 transition-colors"
                >
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Sertifikasi BAN-PDM (20584241)</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </li>
            </ul>
          </div>

          {/* Alamat */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
              Lokasi Madrasah
            </h4>
            <div className="space-y-3 text-sm text-emerald-200/90">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>{SCHOOL_PROFILE.address.full}</span>
              </p>
              <p className="text-xs text-emerald-300/80 pl-6">
                Kompleks Pondok Pesantren Al-Ittihad Tawangsari • Koordinat:{" "}
                {SCHOOL_PROFILE.address.lat}, {SCHOOL_PROFILE.address.lng}
              </p>
              <p className="text-xs text-emerald-300/80 pl-6">
                SK Operasional: {SCHOOL_PROFILE.skOperational}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/80">
          <p>
            © {new Date().getFullYear()} MAS Al-Ittihad Tawangsari (MALTA) • YPIS Al-Ittihad Trowulan Mojokerto.
          </p>
          <p>NPSN 20584241 • Kementerian Agama Republik Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
