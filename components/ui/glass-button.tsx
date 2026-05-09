"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const baseClasses =
  "relative inline-flex items-center justify-center overflow-hidden rounded-full border border-blue-300/30 bg-blue-500/10 text-white transition-colors hover:bg-blue-500/15 disabled:cursor-not-allowed disabled:opacity-50";

function GlowLayers() {
  return (
    <>
      {/* Bottom blob — clipped by overflow-hidden, shows as a glow rising
          from below the button. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-28 -translate-x-1/2 rounded-full bg-blue-500/55 blur-xl"
      />
      {/* Radial gradient anchored just below the button, gives the
          subtle bottom-up gradient of color. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_115%,rgba(59,130,246,0.5),transparent_70%)]"
      />
      {/* Glassy top highlight (1px white inset). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
      />
    </>
  );
}

type GlassButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-current"?: React.AriaAttributes["aria-current"];
};

/**
 * Drop-in replacement for the previous `btn-primary` solid blue button.
 * Renders an `<a>` when `href` is provided, otherwise a `<button>`. The text
 * is wrapped in a `relative` span so it sits above the absolute glow layers.
 */
export function GlassButton({
  children,
  className,
  href,
  target,
  rel,
  onClick,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: GlassButtonProps) {
  const cls = cn(baseClasses, className);
  const inner = (
    <>
      <GlowLayers />
      <span className="relative">{children}</span>
    </>
  );

  if (href !== undefined) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        className={cls}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      className={cls}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}
