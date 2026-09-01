import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Emits a self-contained server with only the dependencies actually reached,
     which is what the container copies instead of the whole node_modules. */
  output: "standalone",
};

export default nextConfig;
