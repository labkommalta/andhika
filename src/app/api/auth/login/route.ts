import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, createSessionToken, getAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = String(body.password || "");

    if (password !== getAdminPassword()) {
      return NextResponse.json(
        { ok: false, error: "Password Admin tidak sesuai." },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Permintaan login tidak valid." }, { status: 400 });
  }
}
