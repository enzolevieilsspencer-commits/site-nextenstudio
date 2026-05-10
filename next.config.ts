import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  // Allow local network device(s) to use dev assets (HMR) during development.
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
  allowedDevOrigins: ["192.168.1.31"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
