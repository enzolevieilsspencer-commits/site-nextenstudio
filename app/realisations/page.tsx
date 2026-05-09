import type { Metadata } from "next";
import { Realisations } from "../../components/Realisations";

export const metadata: Metadata = {
  title: "Nos réalisations — Nexten Studio",
  description:
    "Quelques projets livrés clé en main par Nexten Studio : sites vitrine, sites multilingues, SEO local et formulaires de contact optimisés.",
};

export default function RealisationsPage() {
  return <Realisations />;
}
