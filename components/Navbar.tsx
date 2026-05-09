"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/realisations", label: "Nos réalisations" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "/contact";
  const calendlyIsExternal = calendlyUrl.startsWith("http");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open. We capture the previous
  // value so we don't clobber whatever the page may have set itself (e.g. the
  // Process section's own scroll-jacking lock).
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  // Close on Escape for keyboard accessibility.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  const headerClasses = useMemo(() => {
    const base =
      "fixed top-0 left-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/40";
    const border =
      isScrolled || isMenuOpen ? "border-white/10" : "border-white/5";
    return `${base} ${border}`;
  }, [isScrolled, isMenuOpen]);

  return (
    <>
      <header className={headerClasses}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="relative h-8 w-[150px] overflow-hidden">
              <Image
                src="/logo.svg"
                alt="Nexten Studio"
                fill
                sizes="150px"
                className="object-contain"
                priority
              />
            </span>
            <span className="sr-only">Nexten Studio — Accueil</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? "text-sm text-foreground transition-colors"
                      : "text-sm text-foreground/70 transition-colors hover:text-foreground"
                  }
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Desktop CTA */}
            <GlassButton
              href={calendlyUrl}
              target={calendlyIsExternal ? "_blank" : undefined}
              rel={calendlyIsExternal ? "noreferrer" : undefined}
              className="hidden h-10 px-4 text-sm font-medium md:inline-flex"
            >
              Réserver un appel
            </GlassButton>

            {/* Mobile burger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((o) => !o)}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="relative inline-flex h-10 w-10 items-center justify-center text-foreground transition-opacity hover:opacity-80 md:hidden"
            >
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out ${
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ease-out ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out ${
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bottom hairline */}
        <div
          aria-hidden="true"
          className="pointer-events-none h-px w-full bg-white/10"
        />
      </header>

      {/* Mobile menu — full screen below the navbar */}
      <div
        id="mobile-menu"
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-x-0 bottom-0 top-16 z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" />
        <nav className="relative mx-auto flex h-full max-w-6xl flex-col gap-2 px-4 pb-8 pt-6 sm:px-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-base font-medium transition-colors ${
                  isActive
                    ? "border-white/15 bg-white/[0.08] text-foreground"
                    : "border-white/[0.06] bg-white/[0.03] text-foreground/75 hover:bg-white/[0.06] hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 opacity-60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </Link>
            );
          })}

          <GlassButton
            href={calendlyUrl}
            target={calendlyIsExternal ? "_blank" : undefined}
            rel={calendlyIsExternal ? "noreferrer" : undefined}
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 h-12 px-5 text-sm font-medium"
          >
            Réserver un appel
          </GlassButton>
        </nav>
      </div>
    </>
  );
}
