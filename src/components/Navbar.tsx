"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Instagram, ShieldCheck, MapPin, ExternalLink } from "lucide-react";
import { SCHOOL_PROFILE } from "@/lib/seed-data";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Madrasah" },
  { href: "/berita", label: "Berita & Pengumuman" },
  { href: "/galeri", label: "Galeri MALTA" },
  { href: "/kontak", label: "Kontak & PPDB" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Bar Resmi */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-medium text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              NPSN: {SCHOOL_PROFILE.npsn} • Terakreditasi {SCHOOL_PROFILE.accreditation}
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-emerald-200/90">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Jl. Raden Wijaya No. 105, Tawangsari, Trowulan, Mojokerto
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SCHOOL_PROFILE.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>{SCHOOL_PROFILE.links.instagramHandle}</span>
            </a>
            <a
              href={SCHOOL_PROFILE.links.kemendikdasmen}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <span>Data Kemendikdasmen</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              href="/admin"
              className="text-emerald-300 hover:text-amber-300 font-medium transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3.5 group">
              <img
                src="/logo-malta.svg"
                alt="Logo MAS Al-Ittihad Tawangsari"
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-105"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-emerald-950">
                    MA AL-ITTIHAD
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 rounded-full">
                    MALTA
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Tawangsari • Trowulan • Mojokerto
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      active
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-600 hover:text-emerald-800 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/kontak#ppdb"
                className="ml-3 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-sm hover:shadow transition-all"
              >
                Daftar PPDB
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Buka menu navigasi"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold ${
                    active
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/kontak#ppdb"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-xl bg-emerald-700 text-white text-sm font-semibold shadow-sm"
              >
                Daftar Peserta Didik Baru (PPDB)
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
