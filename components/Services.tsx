import { LiquidGlass } from "@/components/ui/liquid-glass";

const services = [
  {
    title: "Votre vitrine sur internet",
    description:
      "Un site professionnel qui donne envie de vous appeler. Visible sur Google, adapté au mobile, livré clé en main.",
    bullets: ["Visible sur Google", "Mobile rapide", "Clé en main"],
  },
  {
    title: "Prise de RDV & boutique en ligne",
    description:
      "Ajoutez un système de réservation, un formulaire de devis ou une boutique directement sur votre site.",
    bullets: ["Réservation en ligne", "Formulaire devis", "Boutique"],
  },
  {
    title: "Moderniser votre site actuel",
    description:
      "Votre site existe déjà mais il vieillit mal ? On le remet à neuf : design, rapidité, affichage mobile et référencement.",
    bullets: ["Design modernisé", "Plus rapide", "Mieux référencé"],
  },
] as const;

export function Services() {
  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 sm:pt-12 sm:pb-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:gap-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Nos prestations à Honfleur
            </h2>
            <p className="text-sm sm:text-base text-white/85">
              Un site professionnel, visible sur Google, livré rapidement.
            </p>
          </div>
          <a
            href="/contact"
            className="btn-secondary inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-foreground transition"
          >
            Discuter de vos besoins
          </a>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-3 sm:gap-6 md:grid-cols-3">
          {services.map((s, idx) => (
            <div
              key={s.title}
              className="mx-6 md:mx-0 transition-all duration-700 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)] hover:-translate-y-1"
            >
              <LiquidGlass
                className="p-4 sm:p-6 text-center sm:text-left"
                glowOrigin={idx === 0 ? "bl" : idx === 1 ? "bc" : "br"}
              >
                <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  {s.description}
                </p>
                <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  {s.bullets.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/70"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </LiquidGlass>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

