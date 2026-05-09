import { FAQ } from "../components/FAQ";
import { Hero } from "../components/Hero";
import { Pricing } from "../components/Pricing";
import { Process } from "../components/Process";
import { Services } from "../components/Services";
import { TrustMarquee } from "../components/TrustMarquee";
import { SiteShader } from "../components/ui/site-shader";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nexten Studio",
    url: "https://nexten.studio",
    image: "https://nexten.studio/logo.svg",
    areaServed: [
      { "@type": "City", name: "Honfleur" },
      { "@type": "AdministrativeArea", name: "Calvados" },
      { "@type": "AdministrativeArea", name: "Normandie" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Honfleur",
      addressRegion: "Normandie",
      addressCountry: "FR",
    },
    serviceType: [
      "Création de site vitrine",
      "Refonte de site",
      "SEO local",
      "Développement PWA",
      "Développement application web",
    ],
  };

  return (
    <>
      <SiteShader />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <Process />
      <Pricing />
      <TrustMarquee />
      <FAQ />
    </>
  );
}
