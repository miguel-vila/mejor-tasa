import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // For Railway deployment
  experimental: {
    // Enable if you want to use server actions
  },
};

export default nextConfig;
