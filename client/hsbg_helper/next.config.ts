import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // If there are redirects, remove or adjust them:
  async redirects() {
    return [];
  },
};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5328/:path*', // Proxy to Flask backend
      },
    ];
  },
};

export default nextConfig;
