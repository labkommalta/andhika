-- ============================================================================
-- SKEMA DATABASE SUPABASE (POSTGRESQL) UNTUK WEBSITE MAS AL-ITTIHAD TAWANGSARI
-- Opsional: Jalankan di Supabase -> SQL Editor jika ingin penyimpanan permanen
-- ============================================================================

CREATE TABLE IF NOT EXISTS malta_news (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Kegiatan',
  image_url TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Tim Humas MALTA',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS malta_gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  caption TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Kegiatan',
  image_url TEXT NOT NULL,
  instagram_url TEXT DEFAULT 'https://www.instagram.com/galery_malta/',
  taken_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS malta_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  topic TEXT NOT NULL DEFAULT 'Informasi Umum',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indeks pencarian & pengurutan
CREATE INDEX IF NOT EXISTS idx_malta_news_published ON malta_news (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_malta_gallery_taken ON malta_gallery (taken_at DESC);
CREATE INDEX IF NOT EXISTS idx_malta_messages_created ON malta_messages (created_at DESC);
