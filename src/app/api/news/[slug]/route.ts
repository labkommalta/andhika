import { NextRequest, NextResponse } from "next/server";
import { deleteNews, getNewsBySlug } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const item = await getNewsBySlug(params.slug);
  if (!item) {
    return NextResponse.json({ ok: false, error: "Berita tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: item });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Akses ditolak." }, { status: 401 });
  }

  try {
    await deleteNews(params.slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
