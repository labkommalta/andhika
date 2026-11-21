import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getStorageMode, isSupabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    authenticated: isAdminAuthenticated(),
    storageMode: getStorageMode(),
    supabaseConnected: isSupabaseConfigured(),
  });
}
