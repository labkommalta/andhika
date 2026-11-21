import { NextResponse } from "next/server";
import { getStorageMode, isSupabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "MAS Al-Ittihad Tawangsari (MALTA) Backend API",
    npsn: "20584241",
    storageMode: getStorageMode(),
    supabaseConnected: isSupabaseConfigured(),
    timestamp: new Date().toISOString(),
  });
}
