import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // If there are redirects, remove or adjust them:
  async redirects() {
    return [];
  },
};

export default nextConfig;
