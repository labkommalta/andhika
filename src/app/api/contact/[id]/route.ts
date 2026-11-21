import { NextRequest, NextResponse } from "next/server";
import { deleteMessage } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Akses ditolak." }, { status: 401 });
  }

  try {
    await deleteMessage(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Gagal menghapus pesan" },
      { status: 500 }
    );
  }
}
