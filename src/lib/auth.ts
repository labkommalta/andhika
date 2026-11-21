import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "malta_admin_session";

function getSecret(): string {
  return process.env.AUTH_SECRET || "malta-tawangsari-trowulan-secret-key-2026";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "malta20584241";
}

export function createSessionToken(): string {
  const payload = `admin:${Date.now()}`;
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(":");
    if (parts.length !== 3) return false;
    const [role, ts, sig] = parts;
    if (role !== "admin") return false;
    const expected = crypto
      .createHmac("sha256", getSecret())
      .update(`${role}:${ts}`)
      .digest("hex");
    if (sig !== expected) return false;
    // Masa berlaku sesi 7 hari
    const ageMs = Date.now() - Number(ts);
    return ageMs >= 0 && ageMs < 7 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
