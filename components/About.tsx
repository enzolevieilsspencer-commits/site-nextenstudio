import { LiquidGlass } from "@/components/ui/liquid-glass";

export function About() {
  return (
    <section id="about">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">À propos</h2>
            <p className="text-sm sm:text-base text-foreground/70">
              Nexten Studio est une agence web à Honfleur (Normandie), orientée
              produit. On privilégie les choix simples, une communication claire
              et une exécution rapide.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Ce qu’on vise",
                  text: "Un produit utile, performant et maintenable, avec une expérience utilisateur propre et accessible.",
                },
                {
                  title: "Ce qu’on évite",
                  text: "Les surcouches inutiles, la complexité gratuite et les livraisons “big bang”.",
                },
                {
                  title: "Collaboration",
                  text: "Itérations courtes, points réguliers, priorités partagées et décisions documentées.",
                },
                {
                  title: "Livrables",
                  text: "Un repo propre, un déploiement, des métriques, et une passation simple (ou un suivi si tu veux).",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="transition-all duration-700 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)] hover:-translate-y-1"
                >
                  <LiquidGlass glow="none" className="p-5 sm:p-6">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-foreground/70">
                      {item.text}
                    </p>
                  </LiquidGlass>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

