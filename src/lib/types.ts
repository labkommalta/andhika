export interface SchoolProfile {
  name: string;
  shortName: string;
  officialName: string;
  npsn: string;
  accreditation: string;
  status: string;
  educationForm: string;
  educationLevel: string;
  ministry: string;
  foundation: string;
  foundedYear: number;
  founderNote: string;
  skOperational: string;
  tmtOperational: string;
  operatorName: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    village: string;
    district: string;
    regency: string;
    province: string;
    postalCode: string;
    full: string;
    lat: number;
    lng: number;
  };
  links: {
    instagram: string;
    instagramHandle: string;
    facebook: string;
    facebookName: string;
    kemendikdasmen: string;
    banPdm: string;
  };
  vision: string;
  missions: string[];
  programs: {
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
  }[];
  ecosystem: {
    name: string;
    level: string;
    description: string;
  }[];
  extracurriculars: {
    name: string;
    category: string;
    description: string;
  }[];
}

export type NewsCategory = "Pengumuman" | "Kegiatan" | "Prestasi" | "Pesantren" | "Akademik";

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  imageUrl: string;
  author: string;
  publishedAt: string;
  isFeatured: boolean;
}

export type GalleryCategory = "Kegiatan Madrasah" | "Tahfiz & Pesantren" | "Ekstrakurikuler" | "PHBI & Budaya";

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategory;
  imageUrl: string;
  instagramUrl: string;
  takenAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  topic: string;
  message: string;
  createdAt: string;
}

export interface DataStore {
  news: NewsItem[];
  gallery: GalleryItem[];
  messages: ContactMessage[];
}
