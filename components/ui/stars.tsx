"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function generateStars(count: number, color: string): string {
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000) - 1000;
    const y = Math.floor(Math.random() * 2000) - 1000;
    out.push(`${x}px ${y}px ${color}`);
  }
  return out.join(",");
}

type StarLayerProps = {
  count: number;
  size: number;
  duration: number;
  color: string;
};

function StarLayer({ count, size, duration, color }: StarLayerProps) {
  const [shadow, setShadow] = React.useState("");

  React.useEffect(() => {
    setShadow(generateStars(count, color));
  }, [count, color]);

  if (!shadow) return null;

  const dotStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    boxShadow: shadow,
    animation: `starScroll ${duration}s linear infinite`,
  };

  return (
    <div className="absolute left-0 top-0 h-[2000px] w-full">
      <div className="absolute rounded-full bg-transparent" style={dotStyle} />
      {/* duplicate offset by 2000px for seamless loop */}
      <div
        className="absolute top-[2000px] rounded-full bg-transparent"
        style={dotStyle}
      />
    </div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  starColor?: string;
  overlay?: React.ReactNode;
};

export function StarsBackground({
  children,
  className,
  starColor = "rgba(255,255,255,0.8)",
  overlay,
  ...props
}: StarsBackgroundProps) {
  return (
    <div
      data-slot="stars-background"
      className={cn(
        "relative size-full overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#0b1220_0%,_#000_100%)]",
        className,
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {/* 150 + 50 + 20 = 220 stars total (vs 1600 before) */}
        <StarLayer count={150} size={1} duration={90} color={starColor} />
        <StarLayer count={50} size={2} duration={150} color={starColor} />
        <StarLayer count={20} size={3} duration={210} color={starColor} />
      </div>

      {overlay}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
