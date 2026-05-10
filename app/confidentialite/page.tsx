import type { Metadata } from "next";
import { SiteStarsBackground } from "../../components/ui/site-stars-background";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Nexten Studio",
  description:
    "Comment Nexten Studio collecte, utilise et protège vos données personnelles dans le respect du RGPD.",
  robots: { index: true, follow: false },
};

export default function ConfidentialitePage() {
  return (
    <SiteStarsBackground>
    <section className="relative">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-10 text-center sm:mb-14">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-foreground/70">
            RGPD
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            Politique de confidentialité
          </h1>
          <p className="mt-3 text-sm text-foreground/60">
            Dernière mise à jour : 10 mai 2026
          </p>
        </header>

        <article className="space-y-10 text-sm leading-7 text-foreground/80">
          <section className="space-y-3">
            <p>
              Nexten Studio respecte votre vie privée. Cette page décrit
              quelles données nous collectons, à quelle fin, combien de temps
              nous les conservons, et comment vous pouvez exercer vos droits
              au titre du Règlement Général sur la Protection des Données
              (RGPD).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Responsable du traitement
            </h2>
            <p>
              Le responsable du traitement des données est Nexten Studio (Enzo
              Levieils-Spencer, entreprise individuelle, SIREN 944 178 037),
              joignable à{" "}
              <a
                href="mailto:nexten.studio@gmail.com"
                className="text-blue-400 transition-colors hover:text-blue-300"
              >
                nexten.studio@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Données collectées
            </h2>
            <p>
              Nous ne collectons que les données strictement nécessaires.
              Concrètement, lorsque vous remplissez le formulaire de contact :
            </p>
            <ul className="ml-5 list-disc space-y-1.5 text-foreground/75">
              <li>votre nom</li>
              <li>votre adresse email</li>
              <li>le contenu de votre message</li>
            </ul>
            <p>
              Nous ne collectons aucune donnée par défaut lors de la simple
              navigation. Aucune information n’est transmise à des tiers à des
              fins commerciales ou publicitaires.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Finalité du traitement
            </h2>
            <p>
              Les données du formulaire sont utilisées uniquement pour
              répondre à votre demande (devis, prise de contact, question
              technique) et, si nous concluons un projet ensemble, pour la
              bonne exécution du contrat.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Base légale
            </h2>
            <p>
              Le traitement repose sur votre consentement explicite (envoi
              volontaire du formulaire) ainsi que sur l’exécution de mesures
              précontractuelles à votre demande, conformément à l’article 6
              du RGPD.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Durée de conservation
            </h2>
            <p>
              Les messages reçus via le formulaire sont conservés pendant
              douze (12) mois maximum à compter du dernier échange, puis
              supprimés. En cas de signature d’un contrat, vos coordonnées
              sont conservées le temps de la prestation puis archivées
              conformément aux obligations légales (notamment comptables :
              dix ans).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Vos droits
            </h2>
            <p>
              Conformément à la réglementation, vous disposez des droits
              suivants sur vos données personnelles :
            </p>
            <ul className="ml-5 list-disc space-y-1.5 text-foreground/75">
              <li>droit d’accès et de copie</li>
              <li>droit de rectification</li>
              <li>droit à l’effacement (« droit à l’oubli »)</li>
              <li>droit à la limitation du traitement</li>
              <li>droit d’opposition</li>
              <li>droit à la portabilité</li>
            </ul>
            <p>
              Pour exercer l’un de ces droits, écrivez à{" "}
              <a
                href="mailto:nexten.studio@gmail.com"
                className="text-blue-400 transition-colors hover:text-blue-300"
              >
                nexten.studio@gmail.com
              </a>
              . Nous répondons sous trente (30) jours maximum.
            </p>
            <p>
              Vous pouvez également introduire une réclamation auprès de la
              CNIL :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 transition-colors hover:text-blue-300"
              >
                cnil.fr
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Cookies
            </h2>
            <p>
              Le site n’utilise aucun cookie publicitaire ni outil de
              tracking comportemental. Seuls des cookies techniques
              strictement nécessaires au bon fonctionnement du site peuvent
              être déposés (session, préférences d’affichage). Aucun
              consentement préalable n’est requis pour ces cookies dits
              « essentiels ».
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Hébergement et transferts
            </h2>
            <p>
              Le site est hébergé par Vercel Inc. (États-Unis). Les données
              transitent via leurs serveurs ; Vercel adhère au cadre Data
              Privacy Framework (DPF), garantissant un niveau de protection
              équivalent au RGPD pour les transferts hors Union européenne.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-white sm:text-lg">
              Modifications
            </h2>
            <p>
              Cette politique peut être mise à jour pour refléter les
              évolutions du site ou de la réglementation. La date en tête de
              page indique la dernière version en vigueur.
            </p>
          </section>
        </article>
      </div>
    </section>
    </SiteStarsBackground>
  );
}
