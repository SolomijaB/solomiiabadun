import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  devIndicators: false,
  experimental: {
    globalNotFound: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/opengraph-image",
        headers: [{ key: "Content-Type", value: "image/png" }],
      },
    ];
  },
};

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());

export default nextConfig;
