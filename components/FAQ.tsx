import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const items: FaqItem[] = [
  {
    id: "prix",
    question: "C’est combien, un site vitrine avec Nexten Studio ?",
    answer:
      "Nos sites vitrine démarrent à 600€. Le prix final dépend du nombre de pages, des fonctionnalités souhaitées (formulaire de contact, galerie, prise de rendez-vous…) et du niveau de personnalisation. Vous recevez un devis détaillé et gratuit sous 24h après notre premier échange.",
  },
  {
    id: "delai",
    question: "Combien de temps pour avoir mon site en ligne ?",
    answer:
      "En moyenne 2 semaines entre notre premier échange et la mise en ligne. Le délai peut varier selon la rapidité à nous fournir les contenus (textes, photos) et le nombre d'allers-retours sur la maquette.",
  },
  {
    id: "demarrage",
    question: "Je dois vous fournir quoi pour démarrer ?",
    answer:
      "L'essentiel : votre logo (ou on peut en créer un), quelques photos de votre activité, et une idée de ce que vous voulez dire sur votre site. Pour le reste — textes, structure, mise en page — on s'en occupe avec vous. Pas besoin d'être à l'aise avec l'informatique.",
  },
  {
    id: "google",
    question: "Mon site sera visible sur Google ?",
    answer:
      "Oui, le référencement local (SEO) est inclus dans chaque site. On configure votre fiche Google My Business, on optimise les textes pour vos mots-clés locaux et on s'assure que votre site charge rapidement — trois facteurs essentiels pour apparaître sur Google dans votre zone.",
  },
  {
    id: "modifs",
    question: "Est-ce que je pourrai modifier mon site moi-même ?",
    answer:
      "Oui, on remet une interface simple pour modifier vos textes, photos ou horaires sans toucher au code. Une courte session de prise en main est incluse à la livraison.",
  },
  {
    id: "apres",
    question: "Que se passe-t-il après la livraison ?",
    answer:
      "Vous repartez avec votre site, votre nom de domaine et votre hébergement configurés. On propose aussi une maintenance mensuelle optionnelle pour les mises à jour de sécurité et les petites modifications. Aucune obligation — vous êtes libre.",
  },
  {
    id: "zone",
    question: "Vous travaillez uniquement à Honfleur ?",
    answer:
      "On est basés à Honfleur mais on travaille avec des clients partout en Normandie et au-delà. Tout se fait à distance si besoin — visio, email, téléphone. La plupart de nos échanges se font en ligne sans que ça pose le moindre problème.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-foreground/70">
            FAQ
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/85">
            Tout ce que vous voulez savoir avant de nous contacter.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto mt-8 max-w-3xl sm:mt-10"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline sm:text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-6 text-foreground/75">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
