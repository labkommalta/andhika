"use client";

import React, { useEffect, useState } from "react";
import {
  Database,
  Image as ImageIcon,
  Lock,
  LogOut,
  Mail,
  Newspaper,
  PlusCircle,
  Trash2,
} from "lucide-react";
import {
  ContactMessage,
  GalleryCategory,
  GalleryItem,
  NewsCategory,
  NewsItem,
} from "@/lib/types";

export default function AdminDashboardPage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [storageMode, setStorageMode] = useState<string>("hybrid-serverless");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"news" | "gallery" | "messages">("news");
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [feedback, setFeedback] = useState<string>("");

  // Form Berita
  const [newsTitle, setNewsTitle] = useState("");
  const [newsCategory, setNewsCategory] = useState<NewsCategory>("Kegiatan");
  const [newsImage, setNewsImage] = useState("");
  const [newsAuthor, setNewsAuthor] = useState("Tim Humas MALTA");
  const [newsContent, setNewsContent] = useState("");

  // Form Galeri
  const [galTitle, setGalTitle] = useState("");
  const [galCategory, setGalCategory] = useState<GalleryCategory>("Kegiatan Madrasah");
  const [galImage, setGalImage] = useState("");
  const [galCaption, setGalCaption] = useState("");
  const [galIgUrl, setGalIgUrl] = useState("https://www.instagram.com/galery_malta/");

  async function checkSession() {
    setCheckingAuth(true);
    try {
      const res = await fetch("/api/auth/me");
      const json = await res.json();
      setAuthenticated(Boolean(json.authenticated));
      setStorageMode(json.storageMode || "hybrid-serverless");
      if (json.authenticated) {
        await loadAllData();
      }
    } finally {
      setCheckingAuth(false);
    }
  }

  async function loadAllData() {
    const [nRes, gRes, mRes] = await Promise.all([
      fetch("/api/news"),
      fetch("/api/gallery"),
      fetch("/api/contact"),
    ]);
    const [nJson, gJson, mJson] = await Promise.all([
      nRes.json(),
      gRes.json(),
      mRes.json(),
    ]);
    if (nJson.ok) setNewsList(nJson.data);
    if (gJson.ok) setGalleryList(gJson.data);
    if (mJson.ok) setMessagesList(mJson.data);
  }

  useEffect(() => {
    checkSession();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const json = await res.json();
    if (!res.ok || !json.ok) {
      setLoginError(json.error || "Gagal masuk.");
      return;
    }
    setPassword("");
    setAuthenticated(true);
    await loadAllData();
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
  }

  async function handleCreateNews(e: React.FormEvent) {
    e.preventDefault();
    setFeedback("");
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newsTitle,
        category: newsCategory,
        imageUrl: newsImage,
        author: newsAuthor,
        content: newsContent,
      }),
    });
    const json = await res.json();
    if (json.ok) {
      setNewsTitle("");
      setNewsImage("");
      setNewsContent("");
      setFeedback("Berita berhasil diterbitkan!");
      await loadAllData();
    } else {
      setFeedback(json.error || "Gagal menerbitkan berita.");
    }
  }

  async function handleDeleteNews(slug: string) {
    await fetch(`/api/news/${encodeURIComponent(slug)}`, { method: "DELETE" });
    await loadAllData();
  }

  async function handleCreateGallery(e: React.FormEvent) {
    e.preventDefault();
    setFeedback("");
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: galTitle,
        category: galCategory,
        imageUrl: galImage,
        caption: galCaption,
        instagramUrl: galIgUrl,
      }),
    });
    const json = await res.json();
    if (json.ok) {
      setGalTitle("");
      setGalImage("");
      setGalCaption("");
      setFeedback("Foto galeri berhasil ditambahkan!");
      await loadAllData();
    } else {
      setFeedback(json.error || "Gagal menambah galeri.");
    }
  }

  async function handleDeleteGallery(id: string) {
    await fetch(`/api/gallery/${encodeURIComponent(id)}`, { method: "DELETE" });
    await loadAllData();
  }

  async function handleDeleteMessage(id: string) {
    await fetch(`/api/contact/${encodeURIComponent(id)}`, { method: "DELETE" });
    await loadAllData();
  }

  if (checkingAuth) {
    return (
      <div className="py-24 text-center text-slate-500 font-medium">
        Memeriksa sesi Admin...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="py-20 px-4 max-w-md mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Login Admin MALTA
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Kelola berita, dokumentasi @galery_malta, dan pesan pendaftaran PPDB.
          </p>

          {loginError && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Password Admin
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <p className="mt-2 text-[11px] text-slate-400">
                Default awal (jika belum diatur di Environment Variable Vercel{" "}
                <code>ADMIN_PASSWORD</code>): <code>malta20584241</code>
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-colors"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Bar */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>
              Mode Backend:{" "}
              {storageMode === "supabase"
                ? "Supabase PostgreSQL (Permanen)"
                : "Hybrid Serverless (Otomatis)"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Dashboard Admin MAS Al-Ittihad
          </h1>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>

      {feedback && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-medium">
          {feedback}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("news")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "news"
              ? "bg-emerald-700 text-white shadow"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          Berita & Pengumuman ({newsList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("gallery")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "gallery"
              ? "bg-emerald-700 text-white shadow"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Galeri @galery_malta ({galleryList.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("messages")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "messages"
              ? "bg-emerald-700 text-white shadow"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          <Mail className="w-4 h-4" />
          Kotak Masuk & PPDB ({messagesList.length})
        </button>
      </div>

      {/* TAB BERITA */}
      {activeTab === "news" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-fit">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-emerald-700" />
              Tambah Berita / Pengumuman
            </h2>
            <form onSubmit={handleCreateNews} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Artikel *
                </label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  placeholder="Judul berita atau pengumuman..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value as NewsCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pesantren">Pesantren</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Prestasi">Prestasi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Penulis
                  </label>
                  <input
                    type="text"
                    value={newsAuthor}
                    onChange={(e) => setNewsAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL Foto Sampul (Opsional)
                </label>
                <input
                  type="url"
                  value={newsImage}
                  onChange={(e) => setNewsImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Isi Lengkap Berita *
                </label>
                <textarea
                  rows={5}
                  required
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                  placeholder="Tuliskan isi berita..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm"
              >
                Terbitkan Berita
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {newsList.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-xs font-bold text-emerald-700">{n.category}</span>
                  <h3 className="font-bold text-slate-900">{n.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{n.excerpt}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteNews(n.slug)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 shrink-0"
                  title="Hapus berita"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB GALERI */}
      {activeTab === "gallery" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-fit">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-emerald-700" />
              Tambah Dokumentasi Galeri
            </h2>
            <form onSubmit={handleCreateGallery} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Judul Kegiatan *
                </label>
                <input
                  type="text"
                  required
                  value={galTitle}
                  onChange={(e) => setGalTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  placeholder="Contoh: Wisuda Tahfiz MAS Al-Ittihad"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Galeri
                </label>
                <select
                  value={galCategory}
                  onChange={(e) => setGalCategory(e.target.value as GalleryCategory)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="Kegiatan Madrasah">Kegiatan Madrasah</option>
                  <option value="Tahfiz & Pesantren">Tahfiz & Pesantren</option>
                  <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                  <option value="PHBI & Budaya">PHBI & Budaya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  URL Gambar Foto *
                </label>
                <input
                  type="url"
                  required
                  value={galImage}
                  onChange={(e) => setGalImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Keterangan / Caption *
                </label>
                <textarea
                  rows={3}
                  required
                  value={galCaption}
                  onChange={(e) => setGalCaption(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tautan Postingan Instagram
                </label>
                <input
                  type="url"
                  value={galIgUrl}
                  onChange={(e) => setGalIgUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm"
              >
                Simpan ke Galeri
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit">
            {galleryList.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col"
              >
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4 flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700">
                      {g.category}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900">{g.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteGallery(g.id)}
                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB PESAN & PPDB */}
      {activeTab === "messages" && (
        <div className="space-y-4">
          {messagesList.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500">
              Belum ada pesan masuk.
            </div>
          ) : (
            messagesList.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                      {m.topic}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(m.createdAt).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900">
                    {m.name} • <span className="text-emerald-700">{m.phone}</span>
                    {m.email ? ` (${m.email})` : ""}
                  </h3>
                  <p className="text-sm text-slate-700 whitespace-pre-line">{m.message}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteMessage(m.id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 self-end sm:self-start"
                  title="Hapus pesan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
