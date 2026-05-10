import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { LiquidGlassFilter } from "@/components/ui/liquid-glass";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexten Studio — Agence web à Honfleur (sites, SEO, PWA)",
  description:
    "Nexten Studio est une agence web à Honfleur. Création de site vitrine, refonte, SEO local et PWA. Design premium, performance et mise en ligne.",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LiquidGlassFilter />
        <div
          id="top"
          className="flex min-h-full flex-col bg-[var(--background)] text-foreground"
        >
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
