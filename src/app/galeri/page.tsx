import React from "react";
import type { Metadata } from "next";
import { Instagram, Facebook } from "lucide-react";
import { getAllGallery, getSchoolProfile } from "@/lib/db";
import GalleryGrid from "@/components/GalleryGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri Kegiatan (@galery_malta)",
  description:
    "Dokumentasi foto kegiatan akademik, tahfiz Al-Qur'an, ekstrakurikuler, dan PHBI MAS Al-Ittihad Tawangsari (@galery_malta).",
};

export default async function GaleriPage() {
  const [gallery, profile] = await Promise.all([
    getAllGallery(),
    getSchoolProfile(),
  ]);

  return (
    <div className="pb-20">
      <section className="bg-emerald-950 text-white py-16 islamic-pattern border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
              <Instagram className="w-4 h-4" />
              Official Social Showcase • {profile.links.instagramHandle}
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
              Galeri Kegiatan MALTA
            </h1>
            <p className="mt-3 text-emerald-100/90 max-w-2xl text-sm sm:text-base">
              Potret semangat belajar, tradisi kepesantrenan, kepramukaan, seni shalawat,
              dan kebersamaan keluarga besar MAS Al-Ittihad Tawangsari, Trowulan, Mojokerto.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={profile.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 text-white font-bold text-sm shadow-lg"
            >
              <Instagram className="w-4 h-4" />
              Instagram @galery_malta
            </a>
            <a
              href={profile.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Facebook Resmi
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <GalleryGrid items={gallery} showFilter={true} />
      </div>
    </div>
  );
}
