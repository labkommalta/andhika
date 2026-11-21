import { NextRequest, NextResponse } from "next/server";
import { createNews, getAllNews } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { NewsCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const q = searchParams.get("q") || undefined;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;

    const data = await getAllNews({ category, q, limit });
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Gagal memuat berita" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Akses ditolak. Silakan login sebagai Admin." }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.content) {
      return NextResponse.json(
        { ok: false, error: "Judul dan isi berita wajib diisi." },
        { status: 400 }
      );
    }

    const created = await createNews({
      title: String(body.title),
      excerpt: body.excerpt ? String(body.excerpt) : undefined,
      content: String(body.content),
      category: (body.category as NewsCategory) || "Kegiatan",
      imageUrl: body.imageUrl ? String(body.imageUrl) : undefined,
      author: body.author ? String(body.author) : undefined,
      isFeatured: Boolean(body.isFeatured),
    });

    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Gagal menyimpan berita" },
      { status: 500 }
    );
  }
}
