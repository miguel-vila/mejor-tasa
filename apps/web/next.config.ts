import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Transpile workspace packages for standalone build
  transpilePackages: ["@mejor-tasa/core"],
};

export default nextConfig;
