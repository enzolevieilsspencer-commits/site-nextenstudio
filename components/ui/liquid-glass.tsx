"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type GlassEffectProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  glow?: "blue" | "none";
  glowOrigin?: "br" | "bl" | "bc";
  blur?: boolean;
};

export function LiquidGlassFilter() {
  return (
    <svg style={{ display: "none" }}>
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="200"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

export function LiquidGlass({
  children,
  className,
  style,
  href,
  target = "_blank",
  glow = "blue",
  glowOrigin = "br",
  blur = true,
}: GlassEffectProps) {
  const glassStyle: React.CSSProperties = {
    boxShadow: "0 10px 30px rgba(0,0,0,0.35), 0 0 22px rgba(0,0,0,0.18)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl cursor-default border border-white/10 bg-black/35 transition-all duration-700 supports-[backdrop-filter]:bg-black/25",
        className,
      )}
      style={glassStyle}
    >
      {/* Reliable blur */}
      {blur ? <div className="absolute inset-0 -z-10 backdrop-blur-xl" /> : null}

      {/* Localized corner glow (bottom-right) */}
      {glow === "blue" ? (
        <>
          <div
            className={cn(
              "pointer-events-none absolute h-56 w-56 rounded-full bg-blue-500/22 blur-2xl",
              glowOrigin === "br" ? "-bottom-16 -right-16" : "",
              glowOrigin === "bl" ? "-bottom-16 -left-16" : "",
              glowOrigin === "bc" ? "-bottom-16 left-1/2 -translate-x-1/2" : "",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0",
              glowOrigin === "br"
                ? "bg-[radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.18),transparent_60%)]"
                : "",
              glowOrigin === "bl"
                ? "bg-[radial-gradient(circle_at_15%_85%,rgba(59,130,246,0.18),transparent_60%)]"
                : "",
              glowOrigin === "bc"
                ? "bg-[radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.18),transparent_62%)]"
                : "",
            )}
          />
        </>
      ) : null}

      {/* Soft highlight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/4 to-transparent" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]" />

      <div className="relative text-foreground">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
}

