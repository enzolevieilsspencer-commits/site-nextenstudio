import type { Metadata } from "next";
import { Contact } from "../../components/Contact";

export const metadata: Metadata = {
  title: "Contact — Nexten Studio",
  description:
    "Contactez Nexten Studio pour votre projet web. Réponse sous 24-48h, devis gratuit.",
};

export default function ContactPage() {
  return <Contact />;
}
