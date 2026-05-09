"use client";

import { motion } from "motion/react";

import type { Testimonial } from "@/components/ui/testimonials-columns-1";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials: Testimonial[] = [
  {
    text: "Site vitrine livré vite, propre, et surtout performant. On a gagné en crédibilité dès la mise en ligne.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Camille R.",
    role: "Artisane • Services",
  },
  {
    text: "Excellent sens produit. Les micro-interactions et l’UI glass donnent un rendu premium sans sacrifier la vitesse.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Nassim A.",
    role: "Fondateur • SaaS",
  },
  {
    text: "Communication claire et itérations rapides. On a eu un plan et des livraisons chaque semaine.",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Julie M.",
    role: "PM • Startup",
  },
  {
    text: "Stack nickel, code maintenable. Déploiement + suivi analytics en place dès le jour 1.",
    image:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Thomas L.",
    role: "CTO • SaaS",
  },
  {
    text: "On sent l’expérience : SEO technique, accessibilité, et un rendu visuel très pro.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Sarah K.",
    role: "Marketing • PME",
  },
  {
    text: "PWA fluide et fiable. Le design futuriste inspire confiance et colle parfaitement à notre image.",
    image:
      "https://images.unsplash.com/photo-1541647376583-8934aaf3448a?auto=format&fit=crop&w=160&h=160&q=80",
    name: "Mehdi B.",
    role: "CEO • Produit",
  },
] as const;

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);

export function Testimonials() {
  return (
    <section id="testimonials">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-[620px] flex-col items-center justify-center text-center"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-foreground/70">
            Avis
          </div>

          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Ce que disent nos clients
          </h2>
          <p className="mt-4 text-pretty text-foreground/70">
            Quelques retours sur la qualité, la vitesse d’exécution et le rendu
            final.
          </p>
        </motion.div>

        <div className="mt-10 flex justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] max-h-[740px]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}

