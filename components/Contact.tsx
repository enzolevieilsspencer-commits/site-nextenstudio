"use client";

import { Calendar, Mail, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import { LiquidGlass } from "@/components/ui/liquid-glass";

type ContactFields = {
  name: string;
  email: string;
  message: string;
};

const defaultFields: ContactFields = {
  name: "",
  email: "",
  message: "",
};

export function Contact() {
  const [fields, setFields] = useState<ContactFields>(defaultFields);
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "loading" }
    | { state: "success" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";
  const calendlyIsExternal = calendlyUrl.startsWith("http");

  const canSubmit = useMemo(() => {
    return (
      fields.name.trim().length >= 2 &&
      fields.email.includes("@") &&
      fields.message.trim().length >= 10
    );
  }, [fields.email, fields.message, fields.name]);

  async function onSubmit() {
    if (!canSubmit || status.state === "loading") return;

    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Impossible d’envoyer le message.");
      }

      setStatus({ state: "success" });
      setFields(defaultFields);
    } catch (e) {
      setStatus({
        state: "error",
        message:
          e instanceof Error ? e.message : "Erreur inconnue, réessaie plus tard.",
      });
    }
  }

  return (
    <section id="contact" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header — same pattern as other pages */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center sm:gap-4">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-foreground/70">
            Contact
          </div>
          <h1 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            Parlons de votre projet
          </h1>
          <p className="text-sm text-white/85 sm:text-base">
            Réponse sous 24–48h. Donnez le contexte, les objectifs, le délai et
            le budget si vous en avez un.
          </p>
        </div>

        {/* Two columns: form (primary, 7/12) + contact methods (secondary, 5/12) */}
        <div className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-12">
          {/* FORM */}
          <form
            className="lg:col-span-7"
            onSubmit={(e) => {
              e.preventDefault();
              void onSubmit();
            }}
          >
            <LiquidGlass glow="none" className="p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium">Nom</span>
                  <input
                    value={fields.name}
                    onChange={(e) =>
                      setFields((p) => ({ ...p, name: e.target.value }))
                    }
                    className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-blue-300/40"
                    placeholder="Votre nom"
                    autoComplete="name"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    type="email"
                    value={fields.email}
                    onChange={(e) =>
                      setFields((p) => ({ ...p, email: e.target.value }))
                    }
                    className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-blue-300/40"
                    placeholder="vous@entreprise.com"
                    autoComplete="email"
                  />
                </label>
              </div>

              <label className="mt-4 block space-y-2">
                <span className="text-sm font-medium">Message</span>
                <textarea
                  value={fields.message}
                  onChange={(e) =>
                    setFields((p) => ({ ...p, message: e.target.value }))
                  }
                  className="min-h-36 w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-blue-300/40"
                  placeholder="Décrivez votre projet : type de site, fonctionnalités souhaitées, délai, contenus déjà disponibles…"
                />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-xs text-foreground/55">
                  <p>
                    Envoi via API sécurisée — vos données ne sont pas stockées.
                  </p>
                  {status.state === "success" ? (
                    <p className="text-emerald-300">
                      Message envoyé. Réponse dans les 24–48h.
                    </p>
                  ) : null}
                  {status.state === "error" ? (
                    <p className="text-red-300">{status.message}</p>
                  ) : null}
                </div>

                <GlassButton
                  type="submit"
                  disabled={!canSubmit || status.state === "loading"}
                  className="h-11 px-6 text-sm font-medium"
                >
                  {status.state === "loading" ? "Envoi…" : "Envoyer"}
                </GlassButton>
              </div>
            </LiquidGlass>
          </form>

          {/* SIDE CONTACT METHODS */}
          <aside className="flex flex-col gap-4 lg:col-span-5">
            <ContactCard
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              label="Email"
              value="nexten.studio@gmail.com"
              href="mailto:nexten.studio@gmail.com"
              hint="Réponse sous 24–48h."
            />
            <ContactCard
              icon={<Phone className="h-4 w-4" aria-hidden="true" />}
              label="Téléphone"
              value="07 62 02 58 98"
              href="tel:+33762025898"
              hint="Du lundi au vendredi, 9h–18h."
            />
            <ContactCard
              icon={<Calendar className="h-4 w-4" aria-hidden="true" />}
              label="Réserver un appel"
              value="30 min, gratuit"
              href={calendlyUrl || "mailto:nexten.studio@gmail.com"}
              external={calendlyIsExternal}
              hint="On repart avec un plan clair."
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

type ContactCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  hint?: string;
  external?: boolean;
};

function ContactCard({
  icon,
  label,
  value,
  href,
  hint,
  external,
}: ContactCardProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block transition-transform duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,2.2)] hover:-translate-y-0.5"
    >
      <LiquidGlass glow="none" className="p-5">
        <div className="flex items-start gap-4">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground/70">
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.18em] text-foreground/50">
              {label}
            </p>
            <p className="mt-1 truncate text-sm font-medium text-foreground">
              {value}
            </p>
            {hint ? (
              <p className="mt-1 text-xs text-foreground/55">{hint}</p>
            ) : null}
          </div>
        </div>
      </LiquidGlass>
    </a>
  );
}
