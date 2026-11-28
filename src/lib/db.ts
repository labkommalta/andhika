import fs from "fs";
import path from "path";
import {
  DataStore,
  NewsItem,
  GalleryItem,
  ContactMessage,
  NewsCategory,
  GalleryCategory,
} from "./types";
import {
  SCHOOL_PROFILE,
  INITIAL_NEWS,
  INITIAL_GALLERY,
  INITIAL_MESSAGES,
} from "./seed-data";

/**
 * Mode Penyimpanan Hybrid untuk Vercel & Lokal:
 * 1. Jika SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY tersedia di Environment Variables,
 *    maka seluruh operasi baca/tulis menggunakan PostgreSQL Supabase secara permanen.
 * 2. Jika belum diatur, aplikasi berjalan mulus tanpa error menggunakan penyimpanan
 *    lokal (.data/store.json saat dev) atau /tmp/malta-store.json + memori di Vercel Serverless.
 */

const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, "");
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export function getStorageMode(): "supabase" | "hybrid-serverless" {
  return isSupabaseConfigured() ? "supabase" : "hybrid-serverless";
}

// Global memory cache agar cepat dan tetap bertahan selama instance serverless hangat
declare global {
  // eslint-disable-next-line no-var
  var __maltaStore: DataStore | undefined;
}

function getLocalFilePath(): string {
  if (process.env.VERCEL) {
    return path.join("/tmp", "malta-store.json");
  }
  return path.join(process.cwd(), ".data", "store.json");
}

function loadHybridStore(): DataStore {
  const filePath = getLocalFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw) as DataStore;
      global.__maltaStore = parsed;
      return parsed;
    }
  } catch {
    // Abaikan jika filesystem tidak dapat dibaca, gunakan memori/seed
  }

  if (global.__maltaStore) {
    return global.__maltaStore;
  }

  const initial: DataStore = {
    news: [...INITIAL_NEWS],
    gallery: [...INITIAL_GALLERY],
    messages: [...INITIAL_MESSAGES],
  };
  saveHybridStore(initial);
  return initial;
}

function saveHybridStore(store: DataStore): void {
  global.__maltaStore = store;
  const filePath = getLocalFilePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(store, null, 2), "utf8");
  } catch {
    // Pada environment read-only ekstrem, global.__maltaStore tetap menyimpan data di memori
  }
}

async function supabaseFetch<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY!,
    "Content-Type": "application/json",
    Prefer: "return=representation",
    ...((init?.headers as Record<string, string>) || {}),
  };

  // Kunci baru Supabase (sb_secret_...) adalah opaque API key, hanya dipasang di header 'apikey'.
  // Jika kunci adalah format lama JWT (eyJ...), sertakan juga header Authorization Bearer.
  if (
    SUPABASE_KEY &&
    !SUPABASE_KEY.startsWith("sb_secret_") &&
    !SUPABASE_KEY.startsWith("sb_publishable_")
  ) {
    headers["Authorization"] = `Bearer ${SUPABASE_KEY}`;
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase error (${res.status}): ${errText}`);
  }
  return res.json() as Promise<T>;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

// ==================== PROFILE ====================

export async function getSchoolProfile() {
  return SCHOOL_PROFILE;
}

// ==================== NEWS ====================

interface SupabaseNewsRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  image_url: string;
  author: string;
  published_at: string;
  is_featured: boolean;
}

export async function getAllNews(options?: {
  category?: string;
  q?: string;
  limit?: number;
}): Promise<NewsItem[]> {
  let items: NewsItem[] = [];

  if (isSupabaseConfigured()) {
    try {
      const rows = await supabaseFetch<SupabaseNewsRow[]>(
        "malta_news?select=*&order=published_at.desc"
      );
      items =
        rows.length > 0
          ? rows.map((r) => ({
              id: r.id,
              slug: r.slug,
              title: r.title,
              excerpt: r.excerpt,
              content: r.content,
              category: r.category,
              imageUrl: r.image_url,
              author: r.author,
              publishedAt: r.published_at,
              isFeatured: r.is_featured,
            }))
          : [...INITIAL_NEWS];
    } catch {
      items = loadHybridStore().news;
    }
  } else {
    items = [...loadHybridStore().news].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  if (options?.category && options.category !== "Semua") {
    items = items.filter((n) => n.category.toLowerCase() === options.category!.toLowerCase());
  }

  if (options?.q) {
    const query = options.q.toLowerCase();
    items = items.filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        n.excerpt.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query)
    );
  }

  if (options?.limit && options.limit > 0) {
    items = items.slice(0, options.limit);
  }

  return items;
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const all = await getAllNews();
  return all.find((n) => n.slug === slug || n.id === slug) || null;
}

export async function createNews(input: {
  title: string;
  excerpt?: string;
  content: string;
  category: NewsCategory;
  imageUrl?: string;
  author?: string;
  isFeatured?: boolean;
}): Promise<NewsItem> {
  const id = `news-${Date.now()}`;
  const baseSlug = slugify(input.title) || id;
  const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
  const publishedAt = new Date().toISOString();
  const excerpt =
    input.excerpt?.trim() ||
    input.content.replace(/\s+/g, " ").trim().slice(0, 160) + "...";

  const newItem: NewsItem = {
    id,
    slug,
    title: input.title.trim(),
    excerpt,
    content: input.content.trim(),
    category: input.category || "Kegiatan",
    imageUrl:
      input.imageUrl?.trim() ||
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    author: input.author?.trim() || "Tim Humas MALTA",
    publishedAt,
    isFeatured: Boolean(input.isFeatured),
  };

  if (isSupabaseConfigured()) {
    await supabaseFetch("malta_news", {
      method: "POST",
      body: JSON.stringify({
        id: newItem.id,
        slug: newItem.slug,
        title: newItem.title,
        excerpt: newItem.excerpt,
        content: newItem.content,
        category: newItem.category,
        image_url: newItem.imageUrl,
        author: newItem.author,
        published_at: newItem.publishedAt,
        is_featured: newItem.isFeatured,
      }),
    });
    return newItem;
  }

  const store = loadHybridStore();
  store.news.unshift(newItem);
  saveHybridStore(store);
  return newItem;
}

export async function deleteNews(slugOrId: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    await supabaseFetch(
      `malta_news?or=(slug.eq.${encodeURIComponent(slugOrId)},id.eq.${encodeURIComponent(slugOrId)})`,
      { method: "DELETE" }
    );
    return true;
  }

  const store = loadHybridStore();
  const prevLen = store.news.length;
  store.news = store.news.filter((n) => n.slug !== slugOrId && n.id !== slugOrId);
  saveHybridStore(store);
  return store.news.length < prevLen;
}

// ==================== GALLERY ====================

interface SupabaseGalleryRow {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  image_url: string;
  instagram_url: string;
  taken_at: string;
}

export async function getAllGallery(category?: string): Promise<GalleryItem[]> {
  let items: GalleryItem[] = [];

  if (isSupabaseConfigured()) {
    try {
      const rows = await supabaseFetch<SupabaseGalleryRow[]>(
        "malta_gallery?select=*&order=taken_at.desc"
      );
      items =
        rows.length > 0
          ? rows.map((r) => ({
              id: r.id,
              title: r.title,
              caption: r.caption,
              category: r.category,
              imageUrl: r.image_url,
              instagramUrl: r.instagram_url || SCHOOL_PROFILE.links.instagram,
              takenAt: r.taken_at,
            }))
          : [...INITIAL_GALLERY];
    } catch {
      items = loadHybridStore().gallery;
    }
  } else {
    items = [...loadHybridStore().gallery].sort(
      (a, b) => new Date(b.takenAt).getTime() - new Date(a.takenAt).getTime()
    );
  }

  if (category && category !== "Semua") {
    items = items.filter((g) => g.category.toLowerCase() === category.toLowerCase());
  }

  return items;
}

export async function createGalleryItem(input: {
  title: string;
  caption: string;
  category: GalleryCategory;
  imageUrl: string;
  instagramUrl?: string;
  takenAt?: string;
}): Promise<GalleryItem> {
  const newItem: GalleryItem = {
    id: `gal-${Date.now()}`,
    title: input.title.trim(),
    caption: input.caption.trim(),
    category: input.category || "Kegiatan Madrasah",
    imageUrl: input.imageUrl.trim(),
    instagramUrl: input.instagramUrl?.trim() || SCHOOL_PROFILE.links.instagram,
    takenAt: input.takenAt || new Date().toISOString().slice(0, 10),
  };

  if (isSupabaseConfigured()) {
    await supabaseFetch("malta_gallery", {
      method: "POST",
      body: JSON.stringify({
        id: newItem.id,
        title: newItem.title,
        caption: newItem.caption,
        category: newItem.category,
        image_url: newItem.imageUrl,
        instagram_url: newItem.instagramUrl,
        taken_at: newItem.takenAt,
      }),
    });
    return newItem;
  }

  const store = loadHybridStore();
  store.gallery.unshift(newItem);
  saveHybridStore(store);
  return newItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    await supabaseFetch(`malta_gallery?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return true;
  }

  const store = loadHybridStore();
  const prevLen = store.gallery.length;
  store.gallery = store.gallery.filter((g) => g.id !== id);
  saveHybridStore(store);
  return store.gallery.length < prevLen;
}

// ==================== CONTACT / PPDB INQUIRIES ====================

interface SupabaseMessageRow {
  id: string;
  name: string;
  phone: string;
  email?: string;
  topic: string;
  message: string;
  created_at: string;
}

export async function getAllMessages(): Promise<ContactMessage[]> {
  if (isSupabaseConfigured()) {
    try {
      const rows = await supabaseFetch<SupabaseMessageRow[]>(
        "malta_messages?select=*&order=created_at.desc"
      );
      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        phone: r.phone,
        email: r.email,
        topic: r.topic,
        message: r.message,
        createdAt: r.created_at,
      }));
    } catch {
      return loadHybridStore().messages;
    }
  }

  return [...loadHybridStore().messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createMessage(input: {
  name: string;
  phone: string;
  email?: string;
  topic: string;
  message: string;
}): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}`,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || "",
    topic: input.topic?.trim() || "Informasi Umum",
    message: input.message.trim(),
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    await supabaseFetch("malta_messages", {
      method: "POST",
      body: JSON.stringify({
        id: newMsg.id,
        name: newMsg.name,
        phone: newMsg.phone,
        email: newMsg.email,
        topic: newMsg.topic,
        message: newMsg.message,
        created_at: newMsg.createdAt,
      }),
    });
    return newMsg;
  }

  const store = loadHybridStore();
  store.messages.unshift(newMsg);
  saveHybridStore(store);
  return newMsg;
}

export async function deleteMessage(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    await supabaseFetch(`malta_messages?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return true;
  }

  const store = loadHybridStore();
  const prevLen = store.messages.length;
  store.messages = store.messages.filter((m) => m.id !== id);
  saveHybridStore(store);
  return store.messages.length < prevLen;
}
