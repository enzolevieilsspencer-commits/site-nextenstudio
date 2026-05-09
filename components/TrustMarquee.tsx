import { Check, Clock, MapPin, Shield, Smartphone, Zap } from "lucide-react";

const items = [
  { icon: Check, label: "Devis gratuit en 24h" },
  { icon: Clock, label: "Livraison en 2 semaines" },
  { icon: Smartphone, label: "Mobile-first" },
  { icon: Zap, label: "SEO local inclus" },
  { icon: MapPin, label: "Honfleur & Calvados" },
  { icon: Shield, label: "Sans engagement" },
];

export function TrustMarquee() {
  return (
    <section
      aria-label="Points clés"
      className="relative border-y border-white/10 bg-white/[0.02]"
    >
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Track: items duplicated AND each carries its own trailing margin
            (mr-10) instead of flex `gap`. With the trailing margin included
            on every item — including the last — the inner width is exactly
            2 × (one copy + its gap), so animating to -50% lands on a frame
            visually identical to 0%: the loop is seamless, no visible reset. */}
        <div className="flex w-max animate-[marquee_40s_linear_infinite] py-4 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...items, ...items].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="mr-10 flex shrink-0 items-center gap-2.5 text-sm text-foreground/70"
                aria-hidden={i >= items.length}
              >
                <Icon
                  className="h-4 w-4 text-blue-400/80"
                  aria-hidden="true"
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
