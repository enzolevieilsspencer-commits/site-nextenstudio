import dynamic from "next/dynamic";
import { Hero } from "../components/Hero";

// Lazy-load everything below the fold — cuts initial JS bundle significantly
const Services = dynamic(() =>
  import("../components/Services").then((m) => ({ default: m.Services }))
);
const Process = dynamic(() =>
  import("../components/Process").then((m) => ({ default: m.Process }))
);
const Pricing = dynamic(() =>
  import("../components/Pricing").then((m) => ({ default: m.Pricing }))
);
const TrustMarquee = dynamic(() =>
  import("../components/TrustMarquee").then((m) => ({ default: m.TrustMarquee }))
);
const FAQ = dynamic(() =>
  import("../components/FAQ").then((m) => ({ default: m.FAQ }))
);
import { SiteShaderWrapper } from "../components/ui/site-shader-wrapper";

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
      <SiteShaderWrapper />
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
