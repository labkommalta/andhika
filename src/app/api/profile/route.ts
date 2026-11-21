import { NextResponse } from "next/server";
import { getSchoolProfile } from "@/lib/db";

export async function GET() {
  const profile = await getSchoolProfile();
  return NextResponse.json({ ok: true, data: profile });
}
