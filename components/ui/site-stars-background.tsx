"use client";

import * as React from "react";
import { StarsBackground } from "@/components/ui/stars";

export function SiteStarsBackground({ children }: { children: React.ReactNode }) {
  return (
    <StarsBackground
      className="min-h-full w-full"
      starColor="rgba(255,255,255,0.75)"
      speed={75}
      factor={0.03}
    >
      {children}
    </StarsBackground>
  );
}

