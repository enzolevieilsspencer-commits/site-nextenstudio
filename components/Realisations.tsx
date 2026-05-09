import { LiquidGlass } from "@/components/ui/liquid-glass";
import Image from "next/image";

type Project = {
  title: string;
  category: string;
  subtitle: string;
  description: string;
  tags: string[];
  url?: { label: string; href: string };
  accent: "emerald" | "amber";
  icon: React.ReactNode;
  image: { src: string; alt: string };
};

const LeafIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-12 w-12"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 13-9 0 8-4 13-9 13a4 4 0 0 1-3-1" />
    <path d="M5 19c4-4 7-6 11-7" />
  </svg>
);

const HouseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-12 w-12"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </svg>
);

const projects: Project[] = [
  {
    title: "Jardyzen",
    category: "Artisan paysagiste",
    subtitle: "Paysagiste — Provence",
    description:
      "Site vitrine pour un paysagiste expert en création de jardins, terrasses et arrosage automatique. Référencement local ciblé sur les Alpilles et la Provence, formulaire de devis intégré.",
    tags: ["Site vitrine", "SEO local", "Devis en ligne", "Mobile-first"],
    url: { label: "jardyzen.fr", href: "https://jardyzen.fr" },
    accent: "emerald",
    icon: <LeafIcon />,
    image: {
      src: "/realisations/jardyzen-hero.png",
      alt: "Aperçu du hero du site Jardyzen",
    },
  },
  {
    title: "Villa Loulou",
    category: "Location haut de gamme",
    subtitle: "Villa de luxe — Marrakech",
    description:
      "Site de présentation pour une villa haut de gamme à Marrakech : piscine chauffée, jardin de 2600 m², vue sur l’Atlas. Design élégant, version multilingue et formulaire de contact optimisé pour la réservation.",
    tags: ["Site vitrine", "Hôtellerie", "Multilingue", "Réservation"],
    url: { label: "villa-loulou.com", href: "https://villa-loulou.com" },
    accent: "amber",
    icon: <HouseIcon />,
    image: {
      src: "/realisations/villa-loulou-hero.png",
      alt: "Aperçu du hero du site Villa Loulou",
    },
  },
];

const accentClasses = {
  emerald: {
    preview:
      "bg-[radial-gradient(circle_at_30%_25%,rgba(16,185,129,0.32),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.18),transparent_60%)]",
    icon: "text-emerald-200/85",
    badge:
      "border-emerald-300/20 bg-emerald-500/15 text-emerald-100",
  },
  amber: {
    preview:
      "bg-[radial-gradient(circle_at_30%_25%,rgba(245,158,11,0.32),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.18),transparent_60%)]",
    icon: "text-amber-200/85",
    badge: "border-amber-300/20 bg-amber-500/15 text-amber-100",
  },
} as const;

export function Realisations() {
  return (
    <section id="realisations" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:gap-4 text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-foreground/70">
            Nos réalisations
          </div>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Quelques projets livrés
          </h2>
          <p className="text-sm sm:text-base text-white/85">
            Deux exemples concrets de sites livrés clé en main pour des
            professionnels.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid items-stretch gap-4 sm:gap-6 md:grid-cols-2">
          {projects.map((p) => {
            const a = accentClasses[p.accent];
            return (
              <div
                key={p.title}
                className="h-full transition-all duration-700 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)] hover:-translate-y-1"
              >
                <LiquidGlass
                  className="flex h-full flex-col overflow-hidden p-0"
                  glow="none"
                >
                  {/* Preview header */}
                  <div
                    className="relative h-40 sm:h-56 overflow-hidden border-b border-white/10"
                  >
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      priority={p.title === "Jardyzen"}
                    />
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-md ${a.badge}`}
                      >
                        {p.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-foreground/60 line-clamp-1">
                      {p.subtitle}
                    </p>
                    <p className="mt-3 sm:mt-4 text-sm leading-6 text-foreground/80">
                      {p.description}
                    </p>

                    <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {p.url ? (
                      <a
                        href={p.url.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                      >
                        <ArrowIcon />
                        {p.url.label}
                      </a>
                    ) : null}
                  </div>
                </LiquidGlass>
              </div>
            );
          })}
        </div>

        <p className="mt-8 sm:mt-10 text-center text-xs sm:text-sm text-white/60">
          Votre projet peut devenir la prochaine réalisation —{" "}
          <a
            href="/contact"
            className="text-blue-400 transition-colors hover:text-blue-300"
          >
            devis gratuit en 24h
          </a>
        </p>
      </div>
    </section>
  );
}
