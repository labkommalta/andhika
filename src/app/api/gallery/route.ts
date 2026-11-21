import { NextRequest, NextResponse } from "next/server";
import { createGalleryItem, getAllGallery } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";
import { GalleryCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const data = await getAllGallery(category);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Gagal memuat galeri" },
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
    if (!body.title || !body.imageUrl) {
      return NextResponse.json(
        { ok: false, error: "Judul foto dan URL gambar wajib diisi." },
        { status: 400 }
      );
    }

    const created = await createGalleryItem({
      title: String(body.title),
      caption: body.caption ? String(body.caption) : String(body.title),
      category: (body.category as GalleryCategory) || "Kegiatan Madrasah",
      imageUrl: String(body.imageUrl),
      instagramUrl: body.instagramUrl ? String(body.instagramUrl) : undefined,
      takenAt: body.takenAt ? String(body.takenAt) : undefined,
    });

    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Gagal menambahkan galeri" },
      { status: 500 }
    );
  }
}
