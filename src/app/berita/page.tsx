import React from "react";
import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { getAllNews } from "@/lib/db";
import NewsExplorer from "@/components/NewsExplorer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita & Pengumuman",
  description:
    "Kabar terbaru, agenda kegiatan, prestasi siswa, dan informasi pengumuman resmi MAS Al-Ittihad Tawangsari (MALTA) Trowulan Mojokerto.",
};

export default async function BeritaPage() {
  const news = await getAllNews();

  return (
    <div className="pb-20">
      <section className="bg-emerald-950 text-white py-16 islamic-pattern border-b border-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400">
            <Newspaper className="w-4 h-4" />
            Warta & Informasi Resmi
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold">
            Berita & Pengumuman Madrasah
          </h1>
          <p className="mt-3 text-emerald-100/90 max-w-2xl text-sm sm:text-base">
            Ikuti perkembangan kegiatan akademik, kepesantrenan, ekstrakurikuler, serta
            pengumuman resmi dari MAS Al-Ittihad Tawangsari.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <NewsExplorer initialNews={news} />
      </div>
    </div>
  );
}
