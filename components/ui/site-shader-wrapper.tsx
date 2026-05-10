"use client";

import dynamic from "next/dynamic";

const SiteShader = dynamic(
  () => import("./site-shader").then((m) => ({ default: m.SiteShader })),
  { ssr: false }
);

export function SiteShaderWrapper() {
  return <SiteShader />;
}
