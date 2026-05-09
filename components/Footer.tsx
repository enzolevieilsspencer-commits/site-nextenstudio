import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Brand glyphs are inlined: lucide-react no longer ships brand icons
// (trademark concerns) so importing them would 404.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

const serviceLinks = [
  { href: "/#services", label: "Sites vitrine" },
  { href: "/#services", label: "Refonte de site" },
  { href: "/#services", label: "SEO local" },
  { href: "/#services", label: "Applications web" },
  { href: "/#services", label: "Maintenance & suivi" },
] as const;

const socialLinks = [
  {
    href: "https://www.instagram.com/nextenstudio_/",
    label: "Instagram",
    icon: InstagramIcon,
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/85 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        {/* Top: 4-column layout */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-4">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
              aria-label="Nexten Studio — Accueil"
            >
              <span className="relative block h-8 w-[150px] overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="Nexten Studio"
                  fill
                  sizes="150px"
                  className="object-contain object-left"
                />
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-foreground/70">
              Agence web à Honfleur — sites vitrine, refontes et applications
              web livrés clé en main pour les artisans, commerçants et TPE.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-foreground/70 transition-colors hover:border-blue-300/30 hover:bg-blue-500/10 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
              Navigation
            </p>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground/75 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
              Nos services
            </p>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground/75 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
              Contact
            </p>
            <ul className="space-y-3 text-sm text-foreground/75">
              <li className="flex items-start gap-3">
                <Mail
                  className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40"
                  aria-hidden="true"
                />
                <a
                  href="mailto:nexten.studio@gmail.com"
                  className="transition-colors hover:text-foreground"
                >
                  nexten.studio@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-foreground/40"
                  aria-hidden="true"
                />
                <a
                  href="tel:+33762025898"
                  className="transition-colors hover:text-foreground"
                >
                  07 62 02 58 98
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-foreground/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Nexten Studio
            <span className="mx-2 text-foreground/30">·</span>
            <span className="text-foreground/45">SIREN 944 178 037</span>
          </p>

          <div className="flex items-center gap-3">
            <span className="text-foreground/55">
              Conçu et développé par Nexten Studio
            </span>
            <span className="flex items-center gap-1.5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={`bottom-${s.label}`}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-6 w-6 items-center justify-center rounded text-foreground/55 transition-colors hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                );
              })}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/mentions-legales"
              className="transition-colors hover:text-foreground"
            >
              Mentions légales
            </Link>
            <Link
              href="/confidentialite"
              className="transition-colors hover:text-foreground"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
