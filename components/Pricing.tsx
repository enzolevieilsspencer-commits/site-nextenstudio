import { Check, Minus } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { LiquidGlass } from "@/components/ui/liquid-glass";

type Feature = { label: string; included: boolean };

type Tier = {
  id: string;
  name: string;
  description: string;
  price: { amount: string; suffix?: string };
  features: Feature[];
  cta: { label: string; href: string };
  badge?: string;
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    description: "Pour lancer votre présence en ligne rapidement.",
    price: { amount: "800€", suffix: "à partir de" },
    features: [
      { label: "Site vitrine 3–5 pages", included: true },
      { label: "Design responsive mobile", included: true },
      { label: "Formulaire de contact", included: true },
      { label: "SEO local de base", included: true },
      { label: "Google My Business", included: true },
      { label: "Livraison en 2 semaines", included: true },
      { label: "Prise de RDV en ligne", included: false },
    ],
    cta: { label: "Demander un devis", href: "/contact" },
  },
  {
    id: "pro",
    name: "Pro",
    description: "Pour un site complet qui génère des contacts.",
    price: { amount: "1 200€", suffix: "à partir de" },
    features: [
      { label: "Site vitrine 5–8 pages", included: true },
      { label: "Design responsive mobile", included: true },
      { label: "Formulaire de contact", included: true },
      { label: "SEO local complet", included: true },
      { label: "Google My Business", included: true },
      { label: "Livraison en 2 semaines", included: true },
      { label: "Prise de RDV en ligne", included: false },
    ],
    cta: { label: "Demander un devis", href: "/contact" },
    highlighted: true,
    badge: "Le plus choisi",
  },
  {
    id: "sur-mesure",
    name: "Sur-mesure",
    description: "Pour un projet spécifique avec des fonctionnalités avancées.",
    price: { amount: "Sur devis" },
    features: [
      { label: "Pages illimitées", included: true },
      { label: "Design responsive mobile", included: true },
      { label: "Formulaire de contact", included: true },
      { label: "SEO local complet", included: true },
      { label: "Google My Business", included: true },
      { label: "Livraison en 2–4 semaines", included: true },
      { label: "Prise de RDV en ligne", included: true },
    ],
    cta: { label: "Discuter du projet", href: "/contact" },
  },
];

export function Pricing() {
  return (
    <section id="tarifs" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center sm:gap-4">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-foreground/70">
            Nos tarifs
          </div>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Nos tarifs
          </h2>
          <p className="text-sm text-white/85 sm:text-base">
            Des offres claires, sans mauvaise surprise. Devis gratuit sous 24h.
          </p>
        </div>

        <div className="mt-8 grid items-stretch gap-4 sm:mt-10 sm:gap-6 md:grid-cols-3">
          {tiers.map((tier) => {
            const isCustom = tier.price.amount === "Sur devis";
            return (
              <div
                key={tier.id}
                className="group h-full [perspective:1200px]"
              >
                <div
                  className={`relative h-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-10deg)_rotateX(5deg)_translateY(-10px)_scale(1.03)] ${
                    tier.highlighted
                      ? "rounded-3xl ring-2 ring-blue-500/70 shadow-[0_25px_60px_-15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_35px_80px_-15px_rgba(59,130,246,0.55)]"
                      : "group-hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]"
                  }`}
                >
                {tier.badge ? (
                  <span className="absolute -top-9 left-1/2 z-10 inline-flex -translate-x-1/2 items-center rounded-full bg-gradient-to-b from-blue-400 to-blue-600 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-[0_8px_20px_-4px_rgba(59,130,246,0.5)] ring-1 ring-blue-300/40">
                    {tier.badge}
                  </span>
                ) : null}
                <LiquidGlass
                  className="flex h-full flex-col p-6"
                  glow={tier.highlighted ? "blue" : "none"}
                  glowOrigin="bc"
                >
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    {tier.description}
                  </p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      {tier.price.amount}
                    </span>
                    {tier.price.suffix ? (
                      <span className="text-sm text-foreground/60">
                        {tier.price.suffix}
                      </span>
                    ) : null}
                  </div>

                  <div className="my-5 h-px w-full bg-white/10" />

                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-3">
                        {f.included ? (
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <Minus
                            className="mt-0.5 h-4 w-4 shrink-0 text-foreground/30"
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={
                            f.included
                              ? "text-sm text-foreground/85"
                              : "text-sm text-foreground/40"
                          }
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {tier.highlighted ? (
                    <GlassButton
                      href={tier.cta.href}
                      className="mt-6 h-11 px-5 text-sm font-medium"
                      aria-label={`${tier.cta.label} — offre ${tier.name}${isCustom ? "" : ` à ${tier.price.amount}`}`}
                    >
                      {tier.cta.label}
                    </GlassButton>
                  ) : (
                    <a
                      href={tier.cta.href}
                      className="btn-secondary mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium text-foreground transition"
                      aria-label={`${tier.cta.label} — offre ${tier.name}${isCustom ? "" : ` à ${tier.price.amount}`}`}
                    >
                      {tier.cta.label}
                    </a>
                  )}
                </LiquidGlass>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-white/60 sm:mt-10 sm:text-sm">
          Tous les tarifs sont HT · Hébergement et nom de domaine non inclus
          (~15€/mois) · Aucun engagement de durée
        </p>
      </div>
    </section>
  );
}
