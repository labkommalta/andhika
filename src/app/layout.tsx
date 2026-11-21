import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SCHOOL_PROFILE } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: {
    default: "MAS Al-Ittihad Tawangsari (MALTA) | Trowulan, Mojokerto",
    template: "%s | MAS Al-Ittihad Tawangsari",
  },
  description: SCHOOL_PROFILE.description,
  keywords: [
    "MA Al-Ittihad Tawangsari",
    "MAS Al-Ittihad",
    "MALTA Mojokerto",
    "galery_malta",
    "NPSN 20584241",
    "Madrasah Aliyah Trowulan",
    "Pondok Pesantren Al-Ittihad Tawangsari",
    "YPIS Al-Ittihad",
  ],
  icons: {
    icon: "/logo-malta.svg",
  },
  openGraph: {
    title: "MAS Al-Ittihad Tawangsari (MALTA) - Trowulan, Mojokerto",
    description: SCHOOL_PROFILE.tagline,
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
