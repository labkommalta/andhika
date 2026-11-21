"use client";

import React, { useState } from "react";
import { GalleryItem } from "@/lib/types";
import { Instagram, Calendar, X, ZoomIn } from "lucide-react";

const CATEGORIES = [
  "Semua",
  "Kegiatan Madrasah",
  "Tahfiz & Pesantren",
  "Ekstrakurikuler",
  "PHBI & Budaya",
];

export default function GalleryGrid({
  items,
  showFilter = true,
}: {
  items: GalleryItem[];
  showFilter?: boolean;
}) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const filtered =
    selectedCategory === "Semua"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div>
      {showFilter && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500">Belum ada dokumentasi pada kategori ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span className="text-white text-xs font-medium inline-flex items-center gap-1.5">
                    <ZoomIn className="w-4 h-4 text-amber-300" />
                    Klik untuk perbesar
                  </span>
                </div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-amber-300 backdrop-blur-sm">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {item.takenAt}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <Instagram className="w-3.5 h-3.5" />
                    @galery_malta
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-slate-900 max-h-[65vh] flex items-center justify-center">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[65vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Tutup pratinjau"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-500">{activePhoto.takenAt}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{activePhoto.title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                {activePhoto.caption}
              </p>
              <div className="mt-5 flex justify-end">
                <a
                  href={activePhoto.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-amber-500 text-white text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
                >
                  <Instagram className="w-4 h-4" />
                  Lihat di Instagram @galery_malta
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
