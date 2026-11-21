import { NextRequest, NextResponse } from "next/server";
import { createMessage, getAllMessages } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false, error: "Akses ditolak." }, { status: 401 });
  }

  try {
    const data = await getAllMessages();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Gagal memuat pesan" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Nama lengkap, nomor WhatsApp/Telepon, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    const created = await createMessage({
      name: String(body.name),
      phone: String(body.phone),
      email: body.email ? String(body.email) : "",
      topic: body.topic ? String(body.topic) : "Informasi Umum",
      message: String(body.message),
    });

    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}
