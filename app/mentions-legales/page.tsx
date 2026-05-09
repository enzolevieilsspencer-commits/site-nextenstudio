import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Nexten Studio",
  description:
    "Mentions légales du site Nexten Studio : éditeur, hébergeur, propriété intellectuelle.",
  robots: { index: true, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-10 text-center sm:mb-14">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-foreground/70">
            Informations légales
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            Mentions légales
          </h1>
          <p className="mt-3 text-sm text-foreground/60">
            Dernière mise à jour : 10 mai 2026
          </p>
        </header>

        <article className="space-y-10 text-sm leading-7 text-foreground/80">
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Éditeur du site
            </h2>
            <p>
              Le site{" "}
              <a
                href="/"
                className="text-blue-400 transition-colors hover:text-blue-300"
              >
                nexten.studio
              </a>{" "}
              est édité par Nexten Studio, nom commercial de l’entreprise
              individuelle :
            </p>
            <ul className="space-y-1.5 text-foreground/75">
              <li>
                <span className="text-foreground/55">Dirigeant :</span> Enzo
                Levieils-Spencer
              </li>
              <li>
                <span className="text-foreground/55">Forme juridique :</span>{" "}
                Entrepreneur individuel
              </li>
              <li>
                <span className="text-foreground/55">SIREN :</span> 944 178 037
              </li>
              <li>
                <span className="text-foreground/55">Code APE :</span> 6201Z —
                Programmation informatique
              </li>
              <li>
                <span className="text-foreground/55">Siège social :</span> 10
                rue du Clos de Meindray, 13520 Paradou, France
              </li>
              <li>
                <span className="text-foreground/55">Email :</span>{" "}
                <a
                  href="mailto:nexten.studio@gmail.com"
                  className="hover:text-foreground"
                >
                  nexten.studio@gmail.com
                </a>
              </li>
              <li>
                <span className="text-foreground/55">Téléphone :</span>{" "}
                <a
                  href="tel:+33762025898"
                  className="hover:text-foreground"
                >
                  07 62 02 58 98
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Directeur de la publication
            </h2>
            <p>
              Enzo Levieils-Spencer, en qualité de dirigeant de Nexten Studio.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Hébergement
            </h2>
            <p>Le site est hébergé par :</p>
            <ul className="space-y-1.5 text-foreground/75">
              <li>Vercel Inc.</li>
              <li>440 N Barranca Avenue #4133</li>
              <li>Covina, CA 91723, États-Unis</li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  vercel.com
                </a>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Propriété intellectuelle
            </h2>
            <p>
              L’ensemble des contenus présents sur ce site (textes,
              illustrations, logos, code source, charte graphique) est la
              propriété exclusive de Nexten Studio, sauf mention contraire.
              Toute reproduction, représentation, modification, publication,
              adaptation ou exploitation, totale ou partielle, par quelque
              procédé et sur quelque support que ce soit, est interdite sans
              autorisation écrite préalable.
            </p>
            <p>
              Les visuels présentés dans la section « Réalisations » sont
              affichés à titre d’exemples avec l’accord des clients
              concernés ; ils restent la propriété de leurs détenteurs
              respectifs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Liens hypertextes
            </h2>
            <p>
              Ce site peut contenir des liens vers des sites tiers. Nexten
              Studio n’exerce aucun contrôle sur ces sites et décline toute
              responsabilité quant à leur contenu, leur disponibilité ou les
              traitements de données qu’ils peuvent opérer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Droit applicable
            </h2>
            <p>
              Le présent site et ses mentions légales sont soumis au droit
              français. En cas de litige, et après tentative de résolution
              amiable, les tribunaux français sont seuls compétents.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Contact
            </h2>
            <p>
              Pour toute question relative aux présentes mentions légales,
              vous pouvez nous écrire à{" "}
              <a
                href="mailto:nexten.studio@gmail.com"
                className="text-blue-400 transition-colors hover:text-blue-300"
              >
                nexten.studio@gmail.com
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </section>
  );
}
