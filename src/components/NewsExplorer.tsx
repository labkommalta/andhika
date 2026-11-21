"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NewsItem } from "@/lib/types";
import { Search, Calendar, User, ArrowRight } from "lucide-react";

const CATEGORIES = ["Semua", "Pengumuman", "Kegiatan", "Pesantren", "Akademik", "Prestasi"];

export default function NewsExplorer({ initialNews }: { initialNews: NewsItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [query, setQuery] = useState("");

  const filtered = initialNews.filter((item) => {
    const matchCat =
      selectedCategory === "Semua" || item.category === selectedCategory;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.content.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div>
      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berita atau pengumuman..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="text-slate-500 font-medium">
            Tidak ditemukan berita yang sesuai dengan pencarian Anda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Link href={`/berita/${item.slug}`} className="relative h-52 overflow-hidden bg-slate-100 block">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-800 text-white shadow">
                  {item.category}
                </span>
              </Link>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {new Date(item.publishedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1 truncate">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    {item.author}
                  </span>
                </div>
                <Link href={`/berita/${item.slug}`}>
                  <h2 className="text-lg font-bold text-slate-900 hover:text-emerald-800 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                </Link>
                <p className="mt-2.5 text-sm text-slate-600 line-clamp-3 flex-1">
                  {item.excerpt}
                </p>
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <Link
                    href={`/berita/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
