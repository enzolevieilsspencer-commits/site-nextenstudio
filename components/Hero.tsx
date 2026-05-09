import { GlassButton } from "@/components/ui/glass-button";
import { LiquidGlass } from "@/components/ui/liquid-glass";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-10 sm:px-6 sm:pt-20 sm:pb-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] sm:text-xs text-white/85">
            Devis gratuit • Site livré rapidement • Honfleur & Calvados
          </p>

          <h1 className="mt-5 sm:mt-6 text-balance text-3xl font-semibold tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl">
            Votre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-300">
              site vitrine professionnel
            </span>{" "}
            à Honfleur
          </h1>

          <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-pretty text-base sm:text-lg leading-7 sm:leading-8 text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
            Nexten Studio conçoit des sites vitrine clairs et efficaces pour les
            artisans, commerçants et TPE de Honfleur et du Calvados. Un site qui
            vous ressemble, visible sur Google, livré rapidement.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <GlassButton
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || "/contact"}
              target={
                (process.env.NEXT_PUBLIC_CALENDLY_URL || "").startsWith("http")
                  ? "_blank"
                  : undefined
              }
              rel={
                (process.env.NEXT_PUBLIC_CALENDLY_URL || "").startsWith("http")
                  ? "noreferrer"
                  : undefined
              }
              className="h-11 px-5 text-sm font-medium sm:h-12 sm:px-6"
            >
              Demander un devis gratuit
            </GlassButton>
            <a
              href="#services"
              className="btn-secondary inline-flex h-11 sm:h-12 items-center justify-center rounded-full px-5 sm:px-6 text-sm font-medium text-foreground transition"
            >
              Voir les services
            </a>
          </div>

          <p className="mt-4 text-[11px] sm:text-xs text-white/75 [text-shadow:0_1px_10px_rgba(0,0,0,0.55)]">
            Sites livrés en Normandie • Réponse sous 24–48h • Devis gratuit
          </p>

          <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 sm:grid-cols-3">
            {[
              {
                title: "Rapide sur mobile",
                text: "Un site fluide qui charge vite et donne envie de vous contacter.",
              },
              {
                title: "Design moderne & pro",
                text: "Une identité claire, rassurante et alignée avec votre activité.",
              },
              {
                title: "En ligne rapidement",
                text: "Mise en ligne, pages essentielles, et visibilité Google pour démarrer.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="transition-all duration-700 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)] hover:-translate-y-1"
              >
                <LiquidGlass glow="none" className="px-4 py-3 sm:px-5 sm:py-4 text-left">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs sm:text-sm text-foreground/70">{item.text}</p>
                </LiquidGlass>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

