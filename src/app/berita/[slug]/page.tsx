import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { getAllNews, getNewsBySlug } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function DetailBeritaPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getNewsBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const related = (await getAllNews({ limit: 4 })).filter(
    (item) => item.slug !== article.slug
  );

  return (
    <div className="py-12 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        href="/berita"
        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Daftar Berita
      </Link>

      <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="relative h-64 sm:h-96 bg-slate-100">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              {article.author}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>

          <div className="mt-6 space-y-4 text-slate-700 leading-relaxed text-base whitespace-pre-line">
            {article.content}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-extrabold text-slate-900 mb-5">
            Berita & Pengumuman Lainnya
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 shadow-sm transition-all block"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  {item.category}
                </span>
                <h3 className="mt-1 font-bold text-slate-900 line-clamp-2 text-sm">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
